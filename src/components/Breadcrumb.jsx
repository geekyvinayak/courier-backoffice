import React from "react";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import { Link } from "react-router-dom";
const Breadcrumb = ({ items = [] }) => {
  const lastIndex = items.length - 1;

  return (
    <nav className="flex items-center space-x-2">
      {items.map((item, index) => (
        <React.Fragment key={item.id}>
          <Link
            to={item.href}
            className={`hover:underline ${
              index === lastIndex
                ? "text-gray-600 cursor-default pointer-events-none"
                : "text-blue-500"
            }`}
            onClick={(e) => {
              if (index === lastIndex) {
                e.preventDefault();
              }
              if (item.onClick) {
                item.onClick(e, item);
              }
            }}
          >
            {item.label}
          </Link>
          {index < lastIndex && (
            <NavigateNextOutlinedIcon className="w-4 h-4 text-gray-400" />
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
