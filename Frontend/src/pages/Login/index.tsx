import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../libs/axiosInstance";

const Login = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-authenticated-user"],
    queryFn: () => axiosInstance.get("/auth/me").then((res) => res.data),
    retry: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  return (
    <div>
      <h1>Login</h1>
      <p>{data.email}</p>
    </div>
  );
};

export default Login;
