import React from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router";
import { dummyData } from "../../data/dammyData";
import { GameResult } from "../../types/types";

const ResultList = () => {
  const navigate = useNavigate();

  const dataList: GameResult[] = dummyData;

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center">
        結果一覧
      </Typography>
      <List>
        {dataList.map((data, index) => (
          <React.Fragment key={index}>
            <ListItem component="button" onClick={() => navigate(`/results/${index}`)}>
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
