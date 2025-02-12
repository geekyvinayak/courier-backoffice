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
        "/pricelist/vehiclestype/create",
        "/pricelist/vehicleequivalencies/create",
        "/pricelist/vehicleequivalency/edit/",
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
      childPaths: [
        "/pricelist/discounts-surcharges",
        "/pricelist/discounts-surcharges/create",
      ],
    },
    {
      id: 7,
      name: "Pricing Zones",
      link: "/pricelist/pricingzones",
      childPaths: ["/pricelist/pricingzones", "/pricelist/pricingzoneslayout"],
    },
  ],
  "/dashboard": [
    {
      id: 1,
      name: "Dashboard",
      link: "/dashboard",
      childPaths: ["/dashboard"],
    },
  ],
};

// Component to display items based on the current route
const TabNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname.split("/")[1]; // Get the base route (e.g., "price" or "dashboard")
  const items = itemsData[`/${currentPath}`] || []; // Get items based on the current route
// const isActive = item?.childPaths?.some(path => {
//   const regex = new RegExp(`^${path}(/\\d+)?$`); // Allows optional "/id" at the end
//   return regex.test(location?.pathname);
// });
  return (
    <ul className="flex w-[55%] justify-between">
      {items.map((item) => (
        <li
          key={item.id}
          className={`block p-2 text-center flex-1 transition-colors max-w-[165px] focus:outline-none font-semibold focus:ring-2 focus:ring-blue-500
          ${
           item?.childPaths?.some(path => {
  const regex = new RegExp(`^${path}(/\\d+)?$`) // Allows optional "/id" at the end
  return regex.test(location?.pathname)
})
              ? " text-black border-b-4 border-[#494fb5] font-bold rounded"
              : "text-white-700"
          }`}
        >
          <Link to={item.link}>{item.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default TabNavigation;
