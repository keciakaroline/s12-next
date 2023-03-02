import { Header } from "./ui/components/Header";
import { ReservationsProvider } from "./application/providers/ReservationsProvider";
import { ViewStateProvider } from "./application/providers/ViewStateProvider";
import { useViewState } from "./application/hooks/useViewState";
import { Rooms } from "./ui/pages/Rooms";
import { Students } from "./ui/pages/Students";
import "./ui/styles/global.scss";

function App() {
  const { viewState } = useViewState();

  const renderViewMatrix = {
    Rooms: () => <Rooms />,
    Students: () => <Students />,
    Inventory: () => <>Inventory</>,
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
      <App />
    </ReservationsProvider>
  </ViewStateProvider>
);

export default AppWithProviders;
