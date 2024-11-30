import { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { authState } from "../store/auth";
import { supabase } from "../utils/supabase";
import { getUser } from "../api/getUser";
import { userState } from "../store/user";

export const useSession = () => {
  const setUser = useSetRecoilState(userState);
  const setAuth = useSetRecoilState(authState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        if (!user) throw new Error(error?.message);
        setAuth(user);
        getUser(user.id).then((res) => {
          setUser({ id: user.id, name: res });
        });
      } catch (error) {
        console.error(error);
        setAuth(null);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [setAuth, setUser]);

  return { loading };
};
