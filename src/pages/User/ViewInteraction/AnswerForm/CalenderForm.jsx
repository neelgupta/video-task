import React from "react";
import { useDispatch } from "react-redux";

function CalenderForm({ node }) {
  const { answer_type, answer_format } = node;
  const dispatch = useDispatch();
  return (
    <div className="CalenderForm">
      <iframe
        src={answer_format?.scheduling_link || ""} // Replace with your desired URL
        style={{ width: "100%", height: "100%", border: "none" }}
        title="External Website"
      ></iframe>
    </div>
  );
}

export default CalenderForm;
{
  /* <iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/bJg7bVeYYII?si=9eO-zeGby1SADkGi"
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen
></iframe>; */
}
