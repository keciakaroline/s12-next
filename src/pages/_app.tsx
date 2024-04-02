import type { AppProps } from "next/app";
import { Header } from "./ui/components/Header";
import { InventoryProvider } from "./ui/context/inventory";
import { ReservationsProvider } from "./ui/context/reservations";
import { ViewStateProvider } from "./ui/context/viewState";
import "./ui/styles/global.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ViewStateProvider>
      <ReservationsProvider>
        <InventoryProvider>
          <Header />
          <Component {...pageProps} />
        </InventoryProvider>
      </ReservationsProvider>
    </ViewStateProvider>
  );
}
