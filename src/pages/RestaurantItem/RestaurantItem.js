import React, { useState } from "react";
import { Popover } from "@material-ui/core";
import { NavLink, useParams } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import StarOutlineOutlinedIcon from "@material-ui/icons/StarOutlineOutlined";
import "./RestaurantItem.css";
import { useFoods } from "../../context/FoodContext";
import { AddReview } from "../../components/AddReview";

export const RestaurantItem = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { category } = useParams();
  const { restaurantsData, setFilterTypeId } = useFoods();
  const restaurantItem = restaurantsData.find(
    (item) => item.name === category.split("-").join(" ")
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="restaurant__item__container">
      <div className="back__button__container">
        <NavLink
          to="/"
          style={{
            textDecoration: "none",
            color: "#000",
          }}
          onClick={() => setFilterTypeId(0)}
        >
          <ArrowBackIcon />
        </NavLink>
      </div>
      <div className="restaurant__item">
        <h1>{restaurantItem.name}</h1>

        <div className="restaurant__content">
          <div className="restaurant__detail">
            <p>{restaurantItem.menu.map((item) => item.name).join(", ")}</p>
            <p>{restaurantItem.address}</p>
            <p>Average Rating: {restaurantItem.averageRating}</p>
          </div>
          <button onClick={handleClick}>Add Review</button>
        </div>

        {restaurantItem.ratings.length > 0 && (
          <div className="restaurant__review">
            <h1>Reviews</h1>
            {restaurantItem.ratings.map((rating) => (
              <div className="review">
                <div className="review_detail">
                  <div className="review__profile">
                    <img src={rating.pp} alt={"avatarImage"} />
                    <p>{rating.revName}</p>
                  </div>
                  <div className="rating">
                    <span>{rating.rating}</span>
                    <StarOutlineOutlinedIcon
                      style={{ fontSize: "1rem", marginTop: "2px" }}
                    />
                  </div>
                </div>

                <p>{rating.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <Popover
        style={{
          overflow: "hidden",
          backgroundColor: "rgba(0,0,0,0.6)",
          height: "100vh",
          width: "100vw",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        id={id}
        data-testid="popover"
        className="modal"
        MenuProps={{
          disableScrollLock: true,
        }}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <AddReview handleClose={handleClose} item={restaurantItem} />
      </Popover>
    </div>
  );
};
