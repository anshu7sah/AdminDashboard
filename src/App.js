import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users/Users";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/admin/dashboard/users" element={<Users />}></Route>
      </Routes>
    </div>
  );
}

export default App;
