import Link from "next/link";
import { FC, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWalletNfts, NftTokenAccount } from "@nfteyez/sol-rayz-react";

import { Loader, SolanaLogo, SelectAndConnectWalletButton } from "components";
import { NftCard } from "./NftCard";
import styles from "./index.module.css";


export const GalleryView: FC = ({}) => {
  const { publicKey } = useWallet();
  var walletPublicKey = "";
  if (publicKey) {
    walletPublicKey=publicKey?.toBase58();
  }
  const [walletToParsePublicKey, setWalletToParsePublicKey] =
    useState<string>(walletPublicKey);


  const { nfts, isLoading, error } = useWalletNfts({
    publicAddress: walletToParsePublicKey,
  });

  //console.log("nfts", nfts);
  //console.log(walletPublicKey)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setWalletToParsePublicKey(value.trim());
  };

  const onUseWalletClick = () => {
    if (publicKey) {
      setWalletToParsePublicKey(publicKey?.toBase58());
    }
  };

  return (
    <div className="container mx-auto max-w-6xl p-8 2xl:px-0">
      <div className={styles.container}>
        <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
          <div className="flex-none">
            <button className="btn btn-square btn-ghost">
              <span className="text-4xl">🦤</span>
            </button>
          </div>
          <div className="flex-1 px-2 mx-2">
            <div className="text-sm breadcrumbs">
              <ul className="text-xl">
                <li>
                  <Link href="/">
                    <a>Options</a>
                  </Link>
                </li>
                <li>
                  <span className="opacity-40">Capys Gallery</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex-none">
            <WalletMultiButton className="btn btn-ghost" />
          </div>
        </div>
        {publicKey ? <>
        <div className="text-center pt-2">
          <div className="hero min-h-16 p-0 pt-10">
            <div className="text-center hero-content w-full">
              <div className="w-full">
                <h1 className="mb-5 text-5xl">
                  Capys Gallery
                </h1>
                <div className="my-10">
                  {error ? (
                    <div>
                      <h1>Error Occures</h1>
                      {(error as any)?.message}
                    </div>
                  ) : null}

                  {!error && isLoading ? (
                    <div>
                      <Loader />
                    </div>
                  ) : (
                    <NftList nfts={nfts} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        </> : null}
      </div>
    </div>
  );
};

type NftListProps = {
  nfts: NftTokenAccount[];
};

const NftList = ({ nfts }: NftListProps) => {
  var filteredNfts = nfts?.filter((nfts)=>nfts.updateAuthority=="7PZBB8Nbskv29FrfUSa6dTuhmEBrrqTadnkR9c6gThmt");
  // console.log(filteredNfts)
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-start">
      {filteredNfts?.map((filteredNfts) => (
        <NftCard key={filteredNfts.mint} details={filteredNfts} onSelect={() => {}} />
      ))}
    </div>
  );
};
