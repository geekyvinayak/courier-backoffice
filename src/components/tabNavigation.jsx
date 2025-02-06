import React from "react";
import { Link, useLocation } from "react-router-dom";

// JSON Data
const itemsData = {
  "/pricelist": [
    {
      id: 1,
      name: "Price List",
      link: "/pricelist",
      childPaths: ["/pricelist", "/pricelist/create"],
    },
    {
      id: 2,
      name: "Vehicles",
      link: "/pricelist/vehiclestype",
      childPaths: [
        "/pricelist/vehiclestype",
        "/pricelist/vehicleequivalencies",
        "/pricelist/vehiclestype/create/",
        "/pricelist/vehicleequivalency/edit"
      ],
    },
    // { id: 3, name: "Service Levels", link: "/pricelist/servicelevels" },
    // { id: 4, name: "Fuel Surcharges", link: "/pricelist/fuelsurcharges" },
    {
      id: 5,
      name: "Extra Fees",
      link: "/pricelist/extrafeesschedule",
      childPaths: [
        "/pricelist/extrafeesschedule",
        "/pricelist/extrafees",
        "/pricelist/extrafeesschedule/create",
        "/pricelist/extrafees/create",
      ],
    },
    {
      id: 6,
      name: "Discounts/Surcharges",
      link: "/pricelist/discounts-surcharges",
      childPaths: [],
    },
    {
      id: 7,
      name: "Pricing Zones",
      link: "/pricelist/pricingzones",
      childPaths: ["/pricelist/pricingzones", "/pricelist/pricingzoneslayout"],
    },
  ],
  "/dashboard": [{ id: 1, name: "Dashboard", link: "/dashboard" }],
};

// Component to display items based on the current route
const TabNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname.split("/")[1]; // Get the base route (e.g., "price" or "dashboard")
  const items = itemsData[`/${currentPath}`] || []; // Get items based on the current route

  return (
    <div>
      <ul className="flex">
        {items.map((item) => (
          <li
            key={item.id}
            className={`text-left block p-2  transition-colors font-medium focus:outline-none  focus:ring-2 focus:ring-blue-500
          ${
            item?.childPaths?.includes(location?.pathname)
              ? " text-blue-600 border-b-2 border-blue-600"
              : "text-white-700"
          }`}
          >
            <Link to={item.link}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TabNavigation;
