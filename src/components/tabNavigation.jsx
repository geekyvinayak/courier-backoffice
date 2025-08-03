import React from "react";
import { Link, useLocation } from "react-router-dom";

// JSON Data
const itemsData = {
  "/pricelist": [
    {
      id: 1,
      name: "Price List",
      link: "/pricelist",
      childPaths: ["/pricelist", "/pricelist/create", "/pricelist/edit"],
    },
    {
      id: 2,
      name: "Vehicles",
      link: "/pricelist/vehiclestype",
      childPaths: [
        "/pricelist/vehiclestype",
        "/pricelist/vehicleequivalencies",
        "/pricelist/vehiclestype/create",
        "/pricelist/vehiclestype/edit",
        "/pricelist/vehicleequivalencies/create",
        "/pricelist/vehicleequivalency/edit",
      ],
    },
    {
      id: 3,
      name: "Service Levels",
      link: "/pricelist/servicelevelschedule",
      childPaths: [
        "/pricelist/servicelevelschedule",
        "/pricelist/servicelevels",
        "/pricelist/servicelevelschedule/create",
        "/pricelist/servicelevelschedule/edit",
        "/pricelist/servicelevels/create",
        "/pricelist/servicelevels/edit",
      ],
    },
    {
      id: 4,
      name: "Fule Surcharges",
      link: "/pricelist/surcharge-calculator",
      childPaths: [
        "/pricelist/surcharge-calculator",
        "/pricelist/surcharge-calculator/create",
        "/pricelist/surcharge-calculator/edit",
        "/pricelist/fuel-prices",
        "/pricelist/fuel-prices/create",
        "/pricelist/fuel-prices/edit",
      ],
    },
    {
      id: 5,
      name: "Extra Fees",
      link: "/pricelist/extrafeesschedule",
      childPaths: [
        "/pricelist/extrafeesschedule",
        "/pricelist/extrafees",
        "/pricelist/extrafeesschedule/create",
        "/pricelist/extrafeesschedule/edit",
        "/pricelist/extrafees/create",
        "/pricelist/extrafees/edit",
      ],
    },
    {
      id: 6,
      name: "Discounts/Surcharges",
      link: "/pricelist/discounts-surcharges",
      childPaths: [
        "/pricelist/discounts-surcharges",
        "/pricelist/discounts-surcharges/create",
        "/pricelist/discounts-surcharges/edit",
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
  "/accounts": [
    {
      id: 1,
      name: "Accounts",
      link: "/accounts",
      childPaths: ["/accounts"],
    },
    {
      id: 2,
      name: "Master Accounts",
      link: "/accounts/masteraccounts",
      childPaths: ["/accounts/masteraccounts"],
    },
    {
      id: 3,
      name: "Transactions",
      link: "/accounts/transactions",
      childPaths: ["/accounts/transactions"],
    },
    {
      id: 4,
      name: "Profiles",
      link: "/accounts/profiles",
      childPaths: ["/accounts/profiles"],
    },
    {
      id: 5,
      name: "Notifications",
      link: "/accounts/notifications",
      childPaths: ["/accounts/notifications"],
    },
  ],
  "/settings": [
    {
      id: 1,
      name: "Checkpoints",
      link: "/settings/checkpoints",
      childPaths: ["/settings/checkpoints"],
    },
    {
      id: 2,
      name: "Zones",
      link: "/settings/zones",
      childPaths: ["/settings/zones"],
    },
    {
      id: 3,
      name: "Companies",
      link: "/settings/companies",
      childPaths: ["/settings/companies"],
    },
    {
      id: 4,
      name: "Configurations",
      link: "/settings/configurations/order",
      childPaths: [
        "/settings/configurations/order",
        "/settings/configurations/driver",
        "/settings/configurations/account",
        "/settings/configurations/accounting",
        "/settings/configurations/system",
      ],
    },
    {
      id: 5,
      name: "System",
      link: "/settings/system/users",
      childPaths: [
        "/settings/system/*",
        "/settings/system/users",
        "/settings/system/users/create",
        "/settings/system/address",
        "/settings/system/reports",
        "/settings/system/anonymize",
        "/settings/system/application-logs",
        "/settings/system/audit",
        "/settings/system/address/create/NewHub",
        "/settings/system/address/create/NewContact",
        "/settings/system/address/create/NewGlobalAddress",
      ],
    },
  ],
};

// Component to display items based on the current route
const TabNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname.split("/")[1]; // Get base route
  const items = itemsData[`/${currentPath}`] || []; // Get items based on route

  return (
    <ul className="flex w-[60%] justify-start gap-x-4 rounded-lg p-2">
      {items.map((item) => {
        const isActive = item?.childPaths?.some((path) => {
          const regex = new RegExp(`^${path}(/\\d+)?$`); // Allows optional "/id" at the end
          return regex.test(location?.pathname);
        });

        return (
          <li
            key={item.id}
            className={`relative flex-1 text-center max-w-[450px] font-medium transition-all duration-300 ease-in-out 
              ${
                isActive
                  ? "text-black border-b-4 border-[#494fb5] font-bold bg-gray-100 shadow-md rounded-t-md"
                  : "text-gray-700 hover:bg-gray-200 hover:shadow-sm hover:rounded-md"
              }`}
          >
            <Link to={item.link} className="block p-2 w-full">
              {item.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default TabNavigation;
