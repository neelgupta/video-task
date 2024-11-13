import React from "react";
import { trashItemsData } from "./constants";
import Card from "./Card";

const Trash = () => {
  return (
    <div className="d-flex flex-wrap">
      {trashItemsData.map((item, idx) => {
        return <Card key={item.id} item={item} />;
      })}
    </div>
  );
};

export default Trash;
