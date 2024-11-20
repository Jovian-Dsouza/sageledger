"use client";
import Link from "next/link";
import Logo from "./landing/Logo";

export function Footer() {
  return (
    <footer className="pb-3 rounded-lg">
      <div className="w-full mx-auto max-w-screen-xl p-4 flex-col md:flex-row flex items-center justify-center  md:justify-between">
        <div className="w-full flex items-center justify-center md:block md:w-fit">
          <Logo />
        </div>
        <div className="pb-3 md:py-0"></div>
        <span className="text-sm text-gray-500 text-center">
          © 2024{" "}
          <Link
            href="https://sageledger.vercel.app/"
            className="hover:underline"
          >
            SageLedger
          </Link>
          . All Rights Reserved.
        </span>
        <ul className="flex justify-center flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0">
          <li>
            <Link href="#" className="hover:underline me-4 md:me-6">
              About
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:underline me-4 md:me-6">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:underline me-4 md:me-6">
              Licensing
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:underline">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
