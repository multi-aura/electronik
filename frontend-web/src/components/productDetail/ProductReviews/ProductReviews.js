import React, { useState, useRef, useEffect } from 'react';
import { Card, ListGroup, Image } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import './ProductReviews.css';
import ProductRatingInput from '../ProductRatingInput/ProductRatingInput';

const ProductReviews = ({
    initialReviews = [
        {
            id: 1,
            username: 'Trọng Thắng',
            avatar: 'https://i.pinimg.com/564x/ba/cc/a2/bacca2f413feec96e248866fe3078556.jpg',
            content: 'Sản phẩm rất tốt, vượt ngoài mong đợi!',
            rating: 5,
            timeAgo: '4 năm trước',
        },
        {
            id: 2,
            username: 'Huy Hon',
            avatar: 'https://i.pinimg.com/564x/ba/cc/a2/bacca2f413feec96e248866fe3078556.jpg',
            content: 'Chất lượng tốt, giá cả hợp lý. Sẽ quay lại mua lần nữa.',
            rating: 4,
            timeAgo: '5 năm trước',
        },
        {
            id: 3,
            username: 'Minh Hí',
            avatar: 'https://i.pinimg.com/564x/ba/cc/a2/bacca2f413feec96e248866fe3078556.jpg',
            content: 'Giao hàng nhanh chóng, nhân viên nhiệt tình.',
            rating: 3,
            timeAgo: '4 năm trước',
        },
    ],
}) => {
    const [reviews, setReviews] = useState(initialReviews);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const reviewFormRef = useRef(null);

    // Hàm đếm số lượng đánh giá theo mức sao
    const getStarCounts = () => {
        const counts = { 5: 0, 4: 20, 3: 10, 2: 1, 1: 0 };
        reviews.forEach(review => {
            const roundedRating = Math.round(review.rating);
            counts[roundedRating] = (counts[roundedRating] || 0) + 1;
        });
        return counts;
    };

    const starCounts = getStarCounts();

    const handleAddReview = (newReview) => {
        const newReviewData = {
            id: reviews.length + 1,
            username: 'Người dùng mới',
            avatar: 'https://i.pinimg.com/564x/ba/cc/a2/bacca2f413feec96e248866fe3078556.jpg',
            content: newReview.content,
            rating: newReview.rating,
            timeAgo: 'vừa xong',
        };
        setReviews([newReviewData, ...reviews]);
        setShowReviewForm(false);
    };

    // Hàm kiểm tra khi click ra ngoài form
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
                <h4 className="mb-3">Đánh Giá Sản Phẩm (4,5<FaStar className="star-icon" />)</h4>

                <button
                    className="btn btn-primary mb-3"
                    style={{ width: "40%" }}
                    onClick={() => setShowReviewForm(true)}
                >
                    Đánh giá ngay
                </button>
            </div>




            {/* Form đánh giá sản phẩm */}
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


            {/* Danh Sách Đánh Giá */}
            {reviews.length > 0 ? (
                <ListGroup variant="flush">
                    {reviews.map((review) => (
                        <ListGroup.Item key={review.id} className="p-3">
                            <Card className="border-0">
                                <div className="d-flex align-items-start">
                                    <Image
                                        src={review.avatar}
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
                                                    <FaStar key={index} color={index < Math.round(review.rating) ? '#ffc107' : '#e4e5e9'} />
                                                ))}
                                            </span>
                                            <span className="ms-2">{review.rating}</span>
                                        </div>
                                        <small className="text-muted">{review.timeAgo}</small>
                                        <p className="mt-2">{review.content}</p>
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
