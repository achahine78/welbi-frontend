import { Route, Routes } from "react-router-dom";
import { SharedDataProvider } from "./context/SharedDataContext";
import AuthGuard from "./guards/AuthGuard";

function App() {
  return (
    <AuthGuard>
      <div className="App">
        <SharedDataProvider>
          <Routes>
            <Route path="/" element={<span>base</span>} />
            <Route path="/residents" element={<span>residents</span>} />
            <Route path="/programs" element={<span>programs</span>} />
          </Routes>
        </SharedDataProvider>
      </div>
    </AuthGuard>
  );
}

export default App;
