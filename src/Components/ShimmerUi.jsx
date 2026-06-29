import React from "react";

const ShimmerUi = () => {
  return (
    <div className="flex flex-wrap gap-6 justify-between p-10 mx-5">
      {Array(10)
        .fill("")
        .map((_, index ) => {
          return (
            <div key={index}>
              <div className="flex w-52 flex-col gap-4">
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ShimmerUi;
