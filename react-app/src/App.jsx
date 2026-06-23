import { BrowserRouter, Routes, Route } from "react-router-dom";
import TestPage from "./pages/TestPage";
import PracticePage from "./pages/PracticePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test/:id" element={<TestPage />} />
        <Route path="/practice/:id" element={<PracticePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;