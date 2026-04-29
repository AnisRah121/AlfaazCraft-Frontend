import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/edit/:id" element={<EditPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;