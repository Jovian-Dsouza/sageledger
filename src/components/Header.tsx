"use client";
import Link from "next/link";
import { menuLinks } from "@/data/constants";
import { useContext, useEffect, useState } from "react";
import Container from "./Container";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import OktoWalletContainer from "./oktoWallet/OktoWalletContainer";
import Image from "next/image";
import { WalletButton } from "./solana/solana-provider";
import Logo from "@/components/landing/Logo"

function NavLinks() {
  const pathname = usePathname();
  return (
    <div className="hidden md:flex">
      <div className="w-auto">
        <ul className="tracking-wide text-sm flex space-x-10 text-[#F1F5F9] font-semibold">
          {menuLinks.map((link, index) => (
            <li key={index}>
              <Link
                href={link.href}
                className={`${pathname === link.href ? "border-b-2 pb-1" : ""}`}
              >
                <span>{link.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}



function SelectWallet() {
  // const { data: session } = useSession();
  // const [showWallet, setShowWallet] = useState(false);

  // function handleButtonClick() {
  //   if (session) {
  //     setShowWallet(true);
  //   } else {
  //     signIn();
  //   }
  // }
  return (
    <div className="hidden md:block">
      <WalletButton />
    </div>
  );
}

function LandingHeader() {
  return (
    <nav className="absolute z-10 top-5 w-full ">
      <Container>
        <div className="relative flex items-center justify-center md:justify-between header-bg-border">
          <Logo />
          <NavLinks />
          <SelectWallet />
        </div>
      </Container>
    </nav>
  );
}

function ChatHeader() {
  return (
    <nav className="absolute z-10 top-5 w-full ">
      <Container>
        <div className="flex items-center justify-between bg-transparent">
          <div className="header-bg-border">
            <Logo />
          </div>

          <SelectWallet />
        </div>
      </Container>
    </nav>
  );
}

function Header() {
  const pathname = usePathname();
  if (pathname === "/chat") {
    return <ChatHeader />;
  }
  return <LandingHeader />;
}

export default Header;
