import { Button, Stack } from "@mui/material";
import React from "react";
import LinkBtn from "./linkBtn";

const SubTabNavigator = ({ data = [] }) => {
  return (
    <Stack spacing={2} direction="row" paddingBottom={'1rem'}>
      {data.map((ele, index) => {
        return (
          <LinkBtn
            size={"small"}
            label={ele.lable}
            url={ele.url}
            key={index}
            filled={ele?.isFilled || false}
          />
        );
      })}
    </Stack>
  );
};

export default SubTabNavigator;
