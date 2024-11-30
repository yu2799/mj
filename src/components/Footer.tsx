import { SyntheticEvent, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ListIcon from "@mui/icons-material/List";

export const Footer = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  const getValueFromPath = (path: string): number => {
    switch (path) {
      case "/results":
        return 0;
      case "/input":
        return 1;
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
        zIndex: 10,
      }}
    >
      <BottomNavigationAction label="結果一覧" icon={<ListIcon />} />
      <BottomNavigationAction label="スコア入力" icon={<EditIcon />} />
    </BottomNavigation>
  );
};
