import React from "react";
import { Avatar, Button, Typography } from "@material-tailwind/react";

const Task = ({ title, date, collaborators, status, onStatusChange }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <Typography variant="h6" color="blue-gray" className="mb-2">
        {title}
      </Typography>
      <Typography variant="body2" color="gray">
        Date: {date}
      </Typography>
      <div className="flex items-center space-x-2 mt-2">
        {collaborators.map((collaborator) => (
          <Avatar
            key={collaborator.id}
            src={collaborator.avatar}
            alt={collaborator.name}
            size="sm"
          />
        ))}
      </div>
      <div className="flex justify-end mt-4">
        <Button
          color="blue"
          onClick={onStatusChange}
          ripple="light"
          className="rounded-full"
        >
          State
        </Button>
      </div>
    </div>
  );
};

export default Task;
