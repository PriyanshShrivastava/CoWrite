import React from "react";
import Avatar from "react-avatar";

const ClientBox = ({ username }) => {
  const colArr = ["#ff9999", "#99ff99", "#6666ff", "#9aa2fe", "#fd9768"];
  const randomColor = colArr[Math.floor(Math.random() * 5)];
  return (
    <div className="flex flex-col space-y-2">
      <Avatar
        name={username}
        color={`${randomColor}`}
        size={50}
        round="10px"
        fgColor="black"
      />
      <h2 className="text-md font-josefin text-white ">{`${
        username.split(" ")[0]
      } ${username.split(" ")[1]?.charAt(0) || ""}`}</h2>
    </div>
  );
};

export default ClientBox;
