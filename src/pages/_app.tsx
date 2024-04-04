import type { AppProps } from "next/app";
import { Header } from "../ui/components/Header";
import { InventoryProvider } from "../application/providers/InventoryProvider";

import "../ui/styles/global.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <InventoryProvider>
      <Header />
      <Component {...pageProps} />
    </InventoryProvider>
  );
}
