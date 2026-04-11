import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Room from "./pages/Room";
import Onboarding from "./pages/Onboarding";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div
      className="h-screen flex flex-wrap gap-4 p-8"
      data-theme="night"
    >
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/signup"
          element={<Signup />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
        <Route
          path="/onboarding"
          element={<Onboarding />}
        />
        <Route
          path="/room/:id"
          element={<Room />}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
