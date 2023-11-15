// Dans Column.jsx
import React from "react";
import { Typography } from "@material-tailwind/react";

const Column = ({ title, children }) => (
  <div className="flex flex-col bg-gray-200 rounded-md">
    <Typography variant="h6" color="blue-gray" className="mb-4 ml-2 mt-2">
      {title}
    </Typography>
    <div className="p-4">{children}</div>
  </div>
);

export default Column;
