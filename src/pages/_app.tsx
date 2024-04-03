import type { AppProps } from "next/app";
import { Header } from "../ui/components/Header";
import { InventoryProvider } from "../application/providers/InventoryProvider";
import { ReservationsProvider } from "../application/providers/ReservationsProvider";
import "../ui/styles/global.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReservationsProvider>
      <InventoryProvider>
        <Header />
        <Component {...pageProps} />
      </InventoryProvider>
    </ReservationsProvider>
  );
}
