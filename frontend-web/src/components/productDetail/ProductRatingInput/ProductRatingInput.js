import React, { useState } from 'react';
import { FaStar, FaCheckCircle, FaUpload, FaPaperPlane } from 'react-icons/fa';
import './ProductRatingInput.css';

const ProductRatingInput = ({ onSubmitReview }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [image, setImage] = useState(null);

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = () => {
    if (reviewText.trim() && rating > 0) {
      onSubmitReview({ rating, reviewText, image });
      setReviewText('');
      setRating(0);
      setImage(null);
    }
  };

  return (
    <div className="product-rating-input">
      <label className="rating-label">Mức độ đánh giá *</label>
      <div className="stars">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            onClick={() => handleStarClick(index)}
            color={index < rating ? '#ffc107' : '#e4e5e9'}
            style={{ cursor: 'pointer', fontSize: '20px' }}
          />
        ))}
      </div>
      <span className="rating-description">
        {rating > 0 ? (rating >= 4 ? 'Tốt' : 'Trung bình') : ''}
      </span>
      {rating > 0 && <FaCheckCircle color="green" />}

      <div className="review-input-container">
        <textarea
          placeholder="Ví dụ: Tôi đã mua sản phẩm cách đây 1 tháng và rất hài lòng về nó..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="review-input"
        />
      </div>

      <div className="image-upload-container">
        <label className="image-upload">
          <FaUpload className="upload-icon" />
          <span>Gửi Ảnh</span>
          <input type="file" onChange={handleFileChange} className="file-input" />
        </label>
        {image && <span className="uploaded-image">{image.name}</span>}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!reviewText.trim() || rating === 0}
        className="submit-button"
      >
        <FaPaperPlane /> Gửi đánh giá
      </button>
    </div>
  );
};

export default ProductRatingInput;
