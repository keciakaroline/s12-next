import type { AppProps } from "next/app";
import { Header } from "../ui/components/Header";

import "../ui/styles/global.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
