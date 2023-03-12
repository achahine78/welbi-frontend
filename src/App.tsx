import { Route, Routes } from "react-router-dom";
import AuthGuard from "./guards/AuthGuard";

function App() {
  return (
    <AuthGuard>
      <div className="App">
        <Routes>
          <Route path="/" element={<span>base</span>} />
          <Route path="/residents" element={<span>residents</span>} />
          <Route path="/programs" element={<span>programs</span>} />
        </Routes>
      </div>
    </AuthGuard>
  );
}

export default App;
