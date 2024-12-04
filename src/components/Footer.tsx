import { SyntheticEvent, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ListIcon from "@mui/icons-material/List";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";

export const Footer = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  const getValueFromPath = (path: string): number => {
    switch (path) {
      case "/results":
        return 0;
      case "/ranking":
        return 1;
      case "/input":
        return 2;
      default:
        return 0;
    }
  };

  const [value, setValue] = useState<number>(
    getValueFromPath(location.pathname),
  );

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (newValue === 1) {
      navigate("/ranking");
    } else if (newValue === 2) {
      navigate("/input");
    } else {
      navigate("/results");
    }
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      showLabels
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "56px",
        zIndex: 10,
      }}
    >
      <BottomNavigationAction label="履歴" icon={<ListIcon />} />
      <BottomNavigationAction label="ランキング" icon={<LeaderboardIcon />} />
      <BottomNavigationAction label="スコア入力" icon={<EditIcon />} />
    </BottomNavigation>
  );
};
