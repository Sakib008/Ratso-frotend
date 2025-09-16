import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import VerifyToken from "./pages/Auth/VerifyToken";
import Profile from "./pages/Profile/profile";
import Stores from "./pages/Stores/Stores";
import SingleStore from "./pages/Stores/SingleStore";
import ProtectedRoutes from "./components/protectedRoutes";
function App() {
  return (
    <div className="App">
      <Routes>
        // Auth routes
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-token" element={<VerifyToken email="mohammad@mohammadsakib.me" />} />
        // Pages routes
        <Route path="/" element={<Home />} />
        <Route
          path="/profile/:id"
          element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          }
        />
        <Route path="/stores" element={<Stores />} />
        <Route
          path="/store/:id"
          element={
            <ProtectedRoutes>
              <SingleStore />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
