import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import { authState } from "../../store/auth";
import { Footer } from "../Footer";

export const PrivateRoute = () => {
  const auth = useRecoilValue(authState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate("/login");
      return;
    }
  }, [navigate, auth]);

  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};
