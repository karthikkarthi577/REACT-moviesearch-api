import React from "react";

const Paginate = ({ data, page }) => {
  let number = [];
  for (let i = 1; i < Math.ceil(data.length / 4); i++) {
    number.push(i);
  }
  return (
    <center>
      <div>
        {number.map(num => (
          <button
            onClick={() => {
              page(num);
            }}
            className="paginateNumber"
          >
            {num}
          </button>
        ))}
      </div>
    </center>
  );
};

export default Paginate;
