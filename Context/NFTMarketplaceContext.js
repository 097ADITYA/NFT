import React, { useState, useEffect, useContext } from "react";
import Wenb3Modal from "web3modal";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import axios from "axios";
import { create as ipfsHttpClient } from "ipfs-http-client";

//const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");


const auth = `Basic ${Buffer.from(`${projectId}:${projectSecretKey}`).toString(
  "base64"
)}`;

const subdomain = "https://krypt.infura-ipfs.io"
//https://krypt.infura-ipfs.io

const client = ipfsHttpClient({
  host: "infura-ipfs.io",
  port: 5001,
  protocol: "https",
  headers: {
   authorization: auth,
  },
});

//INTERNAL  IMPORT
import { NFTMarketplaceAddress, NFTMarketplaceABI } from "./constants";

//---FETCHING SMART CONTRACT
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(
    NFTMarketplaceAddress,
    NFTMarketplaceABI,
    signerOrProvider
  );

//---CONNECTING WITH SMART CONTRACT

const connectingWithSmartContract = async () => {
  try {
    const web3Modal = new Wenb3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);
    return contract;
  } catch (error) {
    console.log("Something went wrong while connecting with contract");
  }
};

export const NFTMarketplaceContext = React.createContext();

export const NFTMarketplaceProvider = ({ children }) => {
  const titleData = "Discover,collect, and sell NFTs";

  //------USESTAT
  const [error, setError] = useState("");
  const [openError, setOpenError] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const router = useRouter();

  //---CHECK IF WALLET IS CONNECTD
  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum)
        return console.log("Install MetaMask");

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No Account Found");
        
      }
      //console.log(currentAccount);
    } catch (error) {
      console.log("Something wrong while connecting to wallet");
      
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  //---CONNET WALLET FUNCTION
  const connectWallet = async () => {
    try {
      if (!window.ethereum) return console.log("Install MetaMask");
      //----REQUEST WALLET
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      //setBlockchain(window.ethereum.networkVersion);
    } catch (error) {
      console.log("Error While Connecting Wallet");
      
    }
  };

  //---UPLOAD TO IPFS FUNCTION
  const uploadToIPFS = async (file) => {
    try {
      const added = await client.add({ content: file });
      const url = `${subdomain}/ipfs/${added.path}`;
      return url;
    } catch (error) {
      console.log("Error Uploading to IPFS", error );
    }
  };

  //---CREATENFT FUNCTION
  const createNFT = async (name, price, image, description) => {
    if (!name || !description || !price || !image)
      return console.log("Data Is Missing")

    const data = JSON.stringify({ name, description, image });

    try {
      const added = await client.add(data);

      const url = `https://infura-ipfs.io/ipfs/${added.path}`;

      await createSale(url, price);
      //router.push("/searchPage");
    } catch (error) {
      console.log(error);
      
    }
  };

  //--- createSale FUNCTION
  const createSale = async (url, formInputPrice, isReselling, id) => {
    try {
      
      const price = ethers.utils.parseUnits(formInputPrice, "ether");

      const contract = await connectingWithSmartContract();

      const listingPrice = await contract.getListingPrice();

      const transaction = !isReselling
        ? await contract.createToken(price, {
            value: listingPrice.toString(),
          })
        : await contract.resellToken(url, price, {
            value: listingPrice.toString(),
          });

      await transaction.wait();
      console.log(transaction);
      //router.push('/searchPage')
    } catch (error) {
      console.log("error while creating sale");
      
    }
  };

  //--FETCHNFTS FUNCTION

  const fetchNFTs = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);

      const data = await contract.fetchMarketItems();
      //console.log(data);

      const items = await Promise.all(
        data.map(
          async ({ tokenId, seller, owner, price: unformattedPrice }) => {
            const tokenURI = await contract.tokenURI(tokenId);

            const {
              data: { image, name, description },
            } = await axios.get(tokenURI);
            const price = ethers.utils.formatUnits(
              unformattedPrice.toString(),
              "ether"
            );

            return {
              price,
              tokenId: tokenId.toNumber(),
              seller,
              owner,
              image,
              name,
              description,
              tokenURI,
            };
          }
        )
      );

      // console.log(items);
      return items;
    } catch (error) {
      console.log("Error while fetching NFTS");
      
    }
  };

  

  //--FETCHING MY NFT OR LISTED NFTs
  const fetchMyNFTsOrListedNFTs = async (type) => {
    try {
      const contract = await connectingWithSmartContract();

      const data =
        type == "fetchItemsListed"
          ? await contract.fetchItemsListed()
          : await contract.fetchMyNFTs();

      const items = await Promise.all(
        data.map(
          async ({ tokenId, seller, owner, price: unformattedPrice }) => {
            const tokenURI = await contract.tokenURI(tokenId);
            const {
              data: { image, name, description },
            } = await axios.get(tokenURI);
            const price = ethers.utils.formatUnits(
              unformattedPrice.toString(),
              "ether"
            );

            return {
              price,
              tokenId: tokenId.toNumber(),
              seller,
              owner,
              image,
              name,
              description,
              tokenURI,
            };
          }
        )
      );
      return items;
    } catch (error) {
      console.log("Error while fetching listed NFTs");
      
    }
  };

  

  //---BUY NFTs FUNCTION
  const buyNFT = async (nft) => {
    try {
      const contract = await connectingWithSmartContract();
      const price = ethers.utils.parseUnits(nft.price.toString(), "ether");

      const transaction = await contract.createMarketSale(nft.tokenId, {
        value: price,
      });

      await transaction.wait();
      //router.push("/author");
    } catch (error) {
      console.log("Error While buying NFT");
      
    }
  };

  return (
    <NFTMarketplaceContext.Provider
      value={{
        checkIfWalletConnected,
        buyNFT,
        fetchMyNFTsOrListedNFTs,
        fetchNFTs,
        uploadToIPFS,
        connectWallet,
        createNFT,
        currentAccount,
        titleData,
      }}
    >
      {children}
    </NFTMarketplaceContext.Provider>
  );
}; 
