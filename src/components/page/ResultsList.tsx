import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router";
import { GameResult } from "../../types/types";

const ResultList = () => {
  const navigate = useNavigate();

  const [dataList, setDataList] = useState<GameResult[]>([]);

  useEffect(() => {
    const existingData = localStorage.getItem("mahjongResults");
    const mahjongResults = existingData ? JSON.parse(existingData) : [];
    setDataList(mahjongResults);
  }, []);

  return (
    <Box
      sx={{
        paddingBottom: "56px",
        overflow: "hidden",
      }}
    >
      <Container>
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{ marginTop: "20px" }}
        >
          履歴
        </Typography>
        <List>
          {dataList.map((data, index) => (
            <React.Fragment key={index}>
              <ListItem
                component="button"
                onClick={() => navigate(`/results/${data.id}`)}
              >
                <ListItemText primary={data.date} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Container>
    </Box>
  );
};

export default ResultList;
