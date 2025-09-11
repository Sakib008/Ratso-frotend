import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ChangePassword from "./pages/Auth/ChangePassword";
import VerifyToken from "./pages/Auth/VerifyToken";
import Profile from "./pages/Profile/profile";
import Stores from "./pages/Store/Stores";
import SingleStore from "./pages/Store/SingleStore";
import ProtectedRoutes from "./components/protectedRoutes";
function App() {
  return (
    <div className="App">
      <Routes>
        // Auth routes
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/verify-token" element={<VerifyToken />} />
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
