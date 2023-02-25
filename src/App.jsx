import { Header } from "./components/Header";
import { CourseTakersProvider } from "./context/CourseTakersProvider";
import { ViewStateProvider } from "./context/ViewStateProvider";
import { useViewState } from "./hooks/useViewState";
import { Rooms } from "./pages/Rooms";
import { Students } from "./pages/Students";
import "./styles/global.scss";

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
    <CourseTakersProvider>
      <App />
    </CourseTakersProvider>
  </ViewStateProvider>
);

export default AppWithProviders;
