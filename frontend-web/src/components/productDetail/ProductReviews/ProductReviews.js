import React, { useState, useRef, useEffect } from 'react';
import { Card, ListGroup, Image } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import './ProductReviews.css';
import ProductRatingInput from '../ProductRatingInput/ProductRatingInput';

const ProductReviews = ({ reviews }) => {
    // Access the `feedbacks` property
    const feedbacks = reviews.feedbacks || [];

    const [reviewList, setReviewList] = useState(feedbacks);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const reviewFormRef = useRef(null);

    // Function to count the number of reviews by star rating
    const getStarCounts = () => {
        const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        reviewList.forEach(review => {
            const roundedRating = Math.round(review.number_star);
            counts[roundedRating] = (counts[roundedRating] || 0) + 1;
        });
        return counts;
    };

    const starCounts = getStarCounts();

    const handleAddReview = (newReview) => {
        const newReviewData = {
            id: reviewList.length + 1,
            username: 'Người dùng mới',
            avatar: 'https://via.placeholder.com/60', // Placeholder avatar
            content_rated: newReview.content,
            number_star: newReview.rating,
            feedback_date: 'vừa xong',
        };
        setReviewList([newReviewData, ...reviewList]);
        setShowReviewForm(false);
    };

    // Handle clicks outside the review form to close it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (reviewFormRef.current && !reviewFormRef.current.contains(event.target)) {
                setShowReviewForm(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="product-reviews mt-4">
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <h4 className="mb-3">Đánh Giá Sản Phẩm (4.5 <FaStar className="star-icon" />)</h4>
                <button
                    className="btn btn-primary mb-3"
                    style={{ width: "40%" }}
                    onClick={() => setShowReviewForm(true)}
                >
                    Đánh giá ngay
                </button>
            </div>

            {/* Product review form */}
            {showReviewForm && (
                <div ref={reviewFormRef}>
                    <ProductRatingInput onSubmitReview={handleAddReview} />
                </div>
            )}

            <div className="star-filter-buttons">
                {[5, 4, 3, 2, 1].map((star) => (
                    <button
                        key={star}
                        className="star-button"
                    >
                        {star} <FaStar className="star-icon" /> ({starCounts[star]})
                    </button>
                ))}
            </div>

            {/* Review list */}
            {reviewList.length > 0 ? (
                <ListGroup variant="flush">
                    {reviewList.map((review) => (
                        <ListGroup.Item key={review._id} className="p-3">
                            <Card className="border-0">
                                <div className="d-flex align-items-start">
                                    <Image
                                        src={'https://via.placeholder.com/60'} // Placeholder avatar
                                        roundedCircle
                                        width={60}
                                        height={60}
                                        className="me-3"
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <div>
                                        <div className="d-flex align-items-center">
                                            <h5 className="mb-0">{review.username}</h5>
                                            <span className="text-warning ms-2">
                                                {[...Array(5)].map((_, index) => (
                                                    <FaStar key={index} color={index < Math.round(review.number_star) ? '#ffc107' : '#e4e5e9'} />
                                                ))}
                                            </span>
                                        </div>
                                        <small className="text-muted">{review.feedback_date}</small>
                                        <p className="mt-2">{review.content_rated}</p>
                                    </div>
                                </div>
                            </Card>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            ) : (
                <p>Chưa có đánh giá nào. Hãy là người đầu tiên đánh giá sản phẩm này!</p>
            )}
        </div>
    );
};

export default ProductReviews;
