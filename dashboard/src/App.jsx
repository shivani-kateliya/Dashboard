
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./Components/Dashboard";
import Navbar from "./Components/Navbar";
import UserList from "./Components/Userlist";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user" element = {<UserList />}/>
      </Routes>
    </>
  );
}

export default App;

