import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./infoBox.css";

const InfoBox = ({ title, cases, active, total, isRed, isGrey, ...props }) => {
  return (
    <Card
      className={`infoBox ${active && "infoBox--selected"} ${
        isRed && "infoBox--red"
      } ${isGrey && "infoBox--grey"}`}
      onClick={props.onClick}
    >
      <CardContent>
        {/* Title */}
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>

        {/* Number of cases */}
        <h2
          className={`infoBox__cases ${
            !isRed && !isGrey && "infoBox__cases--green"
          }`}
        >
          {cases}
        </h2>

        {/* Total */}
        <Typography className="infoBox__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
