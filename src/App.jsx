import { Header } from "./ui/components/Header";
import { ReservationsProvider } from "./application/providers/ReservationsProvider";
import { ViewStateProvider } from "./application/providers/ViewStateProvider";
import { useViewState } from "./application/hooks/useViewState";
import { Rooms } from "./pages/rooms";
import { Students } from "./pages/students";
import "./ui/styles/global.scss";
import { InventoryProvider } from "./application/providers/InventoryProvider";
import { Inventory } from "./pages/inventory";

function App() {
  const { viewState } = useViewState();

  const renderViewMatrix = {
    Rooms: () => <Rooms />,
    Students: () => <Students />,
    Inventory: () => <Inventory />,
  };

  const renderView = renderViewMatrix[viewState.view];

  return (
    <>
      <Header />

      {renderView()}
    </>
  );
}

const AppWithProviders = () => (
  <ViewStateProvider>
    <ReservationsProvider>
      <InventoryProvider>
        <App />
      </InventoryProvider>
    </ReservationsProvider>
  </ViewStateProvider>
);

export default AppWithProviders;
