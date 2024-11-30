import {
  Box,
  Button,
  Card,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../../../utils/supabase";

import styles from "./Login.module.scss";
import { useSetRecoilState } from "recoil";
import { authState } from "../../../store/auth";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const setAuth = useSetRecoilState(authState);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const {
        data: { session },
        error: signInError,
      } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) throw signInError;
      setAuth(session);

      navigate("/home");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <Box component="main" className={styles.main}>
      <Card className={styles.inner}>
        <Typography variant="h4">login</Typography>
        <form className={styles.form} onSubmit={onSubmit}>
          <FormControl className={styles.form__inner}>
            <FormLabel>email</FormLabel>
            <TextField
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl className={styles.form__inner}>
            <FormLabel>password</FormLabel>
            <TextField
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            className={styles.form__btn}
          >
            ログイン
          </Button>
        </form>
      </Card>
    </Box>
  );
};
