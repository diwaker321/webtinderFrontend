import React from "react";
import feedusericon from "../assets/feedusericon.png"

const FeedCard = ({ data }) => {
  // console.log("data: ", data);
  return (
    <>
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure className="bg-amber-100">
          <img
            src={data?.photoURL || feedusericon}
            className="w-70 "
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{`${data?.firstname} ${data?.lastname}`}</h2>
          <p>
          {data.about}
          </p>
          <div className="card-actions justify-center gap-5 flex">
            <button className="btn btn-secondary">Ignored</button>
            <button className="btn btn-primary">Interested</button>

          </div>
        </div>
      </div>
    </>
  );
};

export default FeedCard;
