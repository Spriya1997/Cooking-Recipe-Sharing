import React from 'react';
import '../css/Home.css';
import {BsStarHalf, BsStarFill,BsStar} from "react-icons/bs";

const StarRating = ({ initialRating }) => {
  const orangeStar = <BsStarFill style ={{color : 'orange' }}/>;
  const halfStar = <BsStarHalf style ={{color : 'orange' }}/>;
  const greyStar = <BsStar style ={{color : 'grey' }}/>;

  // Calculate the number of full stars and whether to show a half star
  const fullStars = Math.floor(initialRating);
  const showHalfStar = initialRating - fullStars >= 0.5;

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        let starIcon = greyStar;

        if (starValue <= fullStars) {
          starIcon = orangeStar;
        } else if (showHalfStar && starValue === fullStars + 1) {
          starIcon = halfStar;
        }

        return (
          <span
            key={starValue}
            style={{ fontSize: "20px" }}
          >
          {starIcon}{''}
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
