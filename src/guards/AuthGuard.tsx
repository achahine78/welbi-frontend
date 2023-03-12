import { ReactElement } from "react";
import LoginPage from "../pages/LoginPage";

type Props = {
  children: ReactElement;
};

const AuthGuard = ({ children }: Props) => {
  const token = localStorage.getItem("token");

  if (token) {
    return children;
  }

  return <LoginPage />;
};

export default AuthGuard;
