import { AuthProvider } from "../hooks/useAuth";

const Providers = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default Providers;
