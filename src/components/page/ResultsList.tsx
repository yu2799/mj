import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
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
    <Container>
      <Typography variant="h4" gutterBottom align="center">
        結果一覧
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
  );
};

export default ResultList;
