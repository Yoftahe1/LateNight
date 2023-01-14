import React, { useState } from "react";

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p
      style={{
        display: "inline",
        width: "100%",
      }}
    >
      {isReadMore ? text.length > 150 && text.slice(0, 150) : text}
      {children && children.length > 150 && (
        <span
          onClick={toggleReadMore}
          style={{
            cursor: "pointer",
            wordBreak: "normal",
            color: "rgb(26, 92, 235,.7)",
            fontWeight: "bold",
            fontSize: "25",
          }}
        >
          {isReadMore ? " ...read-more" : " show-less"}
        </span>
      )}
    </p>
  );
};
export default ReadMore;
