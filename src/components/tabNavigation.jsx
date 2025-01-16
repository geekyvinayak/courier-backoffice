import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";

// JSON Data
const itemsData = {
  "/pricelist": [
    { id: 1, name: "Price List", link: "/pricelist" },
    { id: 2, name: "Vehicles", link: "/pricelist/vehicles" },
    { id: 3, name: "Service Levels", link: "/pricelist/servicelevels" },
    { id: 4, name: "Fuel Surcharges", link: "/pricelist/fuelsurcharges" },
    { id: 5, name: "Extra Fees", link: "/pricelist/extrafees" },
    { id: 6, name: "Discounts/Surcharges", link: "/pricelist/discounts-surcharges" },
    { id: 7, name: "Pricing Zones", link: "/pricelist/pricingzones" },
  ],
  "/dashboard": [
    { id: 1, name: "Dashboard", link: "/dashboard" },
  ],
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
          <li key={item.id}  className={`text-left block p-2  transition-colors font-medium focus:outline-none  focus:ring-2 focus:ring-blue-500
          ${location?.pathname === item.link
      ? ' text-blue-600 border-b-2 border-blue-600' 
      : 'text-gray-700'}`}
          >
            <Link to={item.link}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TabNavigation;
