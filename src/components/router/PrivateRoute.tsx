import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import { authState } from "../../store/auth";
import { Footer } from "../Footer";

export const PrivateRoute = () => {
  const auth = useRecoilValue(authState);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      navigate("/login");
      return;
    }
    setLoading(false);
  }, [navigate, auth]);

  return (
    !loading && (
      <>
        <Outlet />
        <Footer />
      </>
    )
  );
};
