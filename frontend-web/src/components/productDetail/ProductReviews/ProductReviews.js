import React from 'react';

const ProductReviews = ({ reviews }) => (
  <div className="product-reviews">
    {reviews.map((review, index) => (
      <div key={index} className="review">
        <strong>{review.username}</strong>
        <p>{review.content_rated}</p>
        <span>Rating: {review.number_star}/5</span>
      </div>
    ))}
  </div>
);

export default ProductReviews;
