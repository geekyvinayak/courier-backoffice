import React from "react";
import { Link, Navigate } from "react-router-dom";
import PriceListGrid from "./priceListGrid";
import LinkBtn from "../../../components/linkBtn";
import SubTabNavigator from "../../../components/subTabNavigator";

const PriceList = () => {
  return (
    <div>
      <div>
        <SubTabNavigator />
      </div>
      <div className="ml-4">
        <LinkBtn label="New Price List" url={"/pricelist/create"} />
      </div>
      <div>
        <PriceListGrid />
      </div>
    </div>
  );
};

export default PriceList;
