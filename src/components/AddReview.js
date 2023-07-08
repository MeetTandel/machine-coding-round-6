import React, { useEffect, useState } from "react";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import "./AddReview.css";
import { randomAvatar } from "../Data";
import { useFoods } from "../context/FoodContext";

export const AddReview = ({ handleClose, item }) => {
  const [review, setReview] = useState({
    revName: "",
    rating: "0",
    comment: "",
  });
  const { addReview } = useFoods()

  const [error, setError] = useState("");

  useEffect(() => {
    if (
      review.revName.length > 0 &&
      review.rating.length > 0 &&
      review.comment.length > 0
    ) {
      setError("");
    }
  }, [review]);

  return (
    <div className="add__review__container">
      <div className="close__button">
        <CancelOutlinedIcon onClick={handleClose} />
      </div>

      <h1>Add Your Review</h1>

      <div className="input__field">
        <span>Name: </span>
        <input
          type="text"
          onChange={(e) =>
            setReview((prev) => ({ ...prev, revName: e.target.value }))
          }
        />
      </div>

      <div className="input__field">
        <span>Rating: </span>
        <select
          id="selectbox1"
          onChange={(e) =>
            setReview((prev) => ({ ...prev, rating: e.target.value }))
          }
        >
          <option value="">&#10003; Select Rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>

      <div className="input__field">
        <span>Comment: </span>
        <input
          type="text"
          onChange={(e) =>
            setReview((prev) => ({ ...prev, comment: e.target.value }))
          }
        />
      </div>

      {error.length > 0 && (
        <div className="error">Please fill all the fields</div>
      )}

      <button
        className="submit"
        onClick={() => {
          if (
            review.revName.length > 0 &&
            review.rating.length > 0 &&
            review.comment.length > 0
          ) {
            const reviewData = {
              ...review,
              pp: randomAvatar(),
            };

            addReview(reviewData, item.id);
            handleClose();
          } else {
            setError("error");
          }
        }}
      >
        Submit
      </button>
    </div>
  );
};
