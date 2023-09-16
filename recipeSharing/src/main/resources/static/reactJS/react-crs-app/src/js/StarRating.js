import React from 'react';
import '../css/Home.css';

const StarRating = ({ initialRating }) => {
  const orangeStar = "\u2605";
  const greyStar = "\u2606";
  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        const filled = starValue <= initialRating;

        return (
          <span
            key={starValue}
            className={filled ? "orange-star" : "grey-star"} style={{fontSize : "24px"}}
          >
            {filled ? orangeStar : greyStar}
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
