import { Navigate, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Room from "./pages/Room";
import Onboarding from "./pages/Onboarding";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./libs/axiosInstance";

const App = () => {
  const {
    data: authUser,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["get-authenticated-user"],
    queryFn: () => axiosInstance.get("/auth/me").then((res) => res.data),
    retry: false,
  });

  const isAuthenticatedUser = authUser?.user;

  return (
    <div
      className="h-screen flex flex-wrap"
      data-theme="forest"
    >
      <Routes>
        <Route
          path="/"
          element={isAuthenticatedUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={isAuthenticatedUser ? <Navigate to="/" /> : <Signup />}
        />
        <Route
          path="/login"
          element={isAuthenticatedUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticatedUser ? <Dashboard /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/onboarding"
          element={
            isAuthenticatedUser ? <Onboarding /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/room/:id"
          element={isAuthenticatedUser ? <Room /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
