import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ImageDescription = ({ name = "", description = "", price = 0, createdBy, _id }) => {
  const auth = useSelector(({ auth }) => auth);

  return (
    <>
      <h4>
        {name}{" "}
        {auth.authUser && createdBy === auth.authUser._id ? (
          <>
            - <Link to={`/product/edit/${_id}`}>Edit</Link>
          </>
        ) : (
          "null"
        )}
      </h4>
      <p>${price}</p>
      <p>{description}</p>
    </>
  );
};

export default ImageDescription;
