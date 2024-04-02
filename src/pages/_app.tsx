import type { AppProps } from "next/app";
import { Header } from "../ui/components/Header";
import { InventoryProvider } from "../application/providers/InventoryProvider";
import { ReservationsProvider } from "../application/providers/ReservationsProvider";
import { ViewStateProvider } from "../application/providers/ViewStateProvider";
import "../ui/styles/global.scss";

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
