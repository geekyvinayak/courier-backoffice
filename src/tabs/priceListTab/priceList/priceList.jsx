import React from "react";
import { Link, Navigate } from "react-router-dom";
import PriceListGrid from "./priceListGrid";
import LinkBtn from "../../../components/linkBtn";

const PriceList = () => {
  return (
    <div className="wraper-container">
      <div>
        <LinkBtn label="New Price List" url={"/pricelist/create"} />
      </div>
      <div>
        <PriceListGrid />
      </div>
    </div>
  );
};

export default PriceList;
