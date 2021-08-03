import React, { useState, useEffect } from "react";

export default function TableHeadSort(props) {
  const { tableHeaderObj, handleSort, restart } = props;
  const [curSort, setCurSort] = useState();

  useEffect(() => {
    if (restart === true) {
      setCurSort(null);
    }
  }, [restart]);

  const tableHeader = tableHeaderObj?.map((obj, index) => {
    const bgColor = curSort === obj.value ? "rgba(82, 168, 236, 0.6)" : "white";
    return (
      <th
        width={obj.width}
        style={{ backgroundColor: bgColor }}
        key={index}
        onClick={(e) => {
          if (obj.value !== "") {
            e.target.style.backgroundColor = bgColor;
            setCurSort(obj.value);
            handleSort(obj.value, -1);
          }
        }}
        onMouseEnter={(e) => {
          if (curSort !== obj.value && obj.value !== "") {
            e.target.style.backgroundColor = "gray";
          }
        }}
        onMouseLeave={(e) => {
          if (curSort !== obj.value && obj.value !== "") {
            e.target.style.backgroundColor = "white";
          }
        }}>
        {obj.title}
      </th>
    );
  });

  return (
    <thead>
      <tr>{tableHeader}</tr>
    </thead>
  );
}
