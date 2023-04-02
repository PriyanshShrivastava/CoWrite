import React from "react";
import Avatar from "react-avatar";

const ClientBox = ({ username }) => {
  return (
    <div className="flex flex-col space-y-2">
      <Avatar
        name={username}
        color={Avatar.getRandomColor(["#ff9999", "#99ff99", "#6666ff"])}
        size={50}
        round="10px"
      />
      <h2 className="text-md font-josefin text-white ">{`${
        username.split(" ")[0]
      } ${username.split(" ")[1].charAt(0)}`}</h2>
    </div>
  );
};

export default ClientBox;
