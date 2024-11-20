"use client";

import { RecoilRoot } from "recoil";

export function RecoilContextProvider({ children }) {
  return (
    <RecoilRoot>
      {children}
    </RecoilRoot>
  );
}
