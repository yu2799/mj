import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import { authState } from "../../store/auth";

export const PublicRoute = () => {
  const auth = useRecoilValue(authState);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate("/input");
      return;
    }
  }, [auth, navigate]);

  return <Outlet />;
};
