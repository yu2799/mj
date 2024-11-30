import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import { authState } from "../../store/auth";

export const PublicRoute = () => {
  const auth = useRecoilValue(authState);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth) {
      navigate("/input");
      return;
    }
    setLoading(false);
  }, [auth, navigate]);

  return !loading && <Outlet />;
};
