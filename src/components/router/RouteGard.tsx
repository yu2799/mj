import { Outlet } from "react-router";
import { useSession } from "../../hooks/useSession";

export const RouteGuard = () => {
  const { loading } = useSession();

  return !loading && <Outlet />;
};
