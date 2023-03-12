import { Route, Routes } from "react-router-dom";
import SideMenu from "./components/SideMenu";
import { SharedDataProvider } from "./context/SharedDataContext";
import AuthGuard from "./guards/AuthGuard";
import ProgramsList from "./pages/ProgramsList";
import ResidentsList from "./pages/ResidentsList";

function App() {
  return (
    <AuthGuard>
      <div style={{ display: "flex" }}>
        <SideMenu />
        <SharedDataProvider>
          <Routes>
            <Route path="/" element={<ResidentsList />} />
            <Route path="/residents" element={<ResidentsList />} />
            <Route path="/programs" element={<ProgramsList />} />
          </Routes>
        </SharedDataProvider>
      </div>
    </AuthGuard>
  );
}

export default App;
