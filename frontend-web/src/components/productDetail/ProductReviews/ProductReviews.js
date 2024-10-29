import React, { useState } from 'react';
import { Card, ListGroup, Image, Button, Form } from 'react-bootstrap';
import { FaStar, FaPaperPlane } from 'react-icons/fa';
import './ProductReviews.css'
const ProductReviews = ({
    initialReviews = [
        {
            id: 1,
            username: 'Trọng Thắng',
            avatar: 'https://i.pinimg.com/564x/ba/cc/a2/bacca2f413feec96e248866fe3078556.jpg',
            content: 'Sản phẩm rất tốt, vượt ngoài mong đợi!',
            rating: 4.7,
            timeAgo: '4 năm trước'
        },
        {
            id: 2,
            username: 'Huy Hon',
            avatar: 'https://i.pinimg.com/564x/ba/cc/a2/bacca2f413feec96e248866fe3078556.jpg',
            content: 'Chất lượng tốt, giá cả hợp lý. Sẽ quay lại mua lần nữa.',
            rating: 4.7,
            timeAgo: '5 năm trước'
        },
        {
            id: 3,
            username: 'Minh Hí',
            avatar: 'https://i.pinimg.com/564x/ba/cc/a2/bacca2f413feec96e248866fe3078556.jpg',
            content: 'Giao hàng nhanh chóng, nhân viên nhiệt tình.',
            rating: 4.7,
            timeAgo: '4 năm trước'
        }
    ]
}) => {
    const [reviews, setReviews] = useState(initialReviews);
    const [newReview, setNewReview] = useState('');

    const handleAddReview = () => {
        const newReviewData = {
            id: reviews.length + 1,
            username: 'Người dùng mới',
            avatar: 'https://i.pinimg.com/564x/ba/cc/a2/bacca2f413feec96e248866fe3078556.jpg',
            content: newReview,
            rating: 5,
            timeAgo: 'vừa xong'
        };
        
        setReviews([newReviewData, ...reviews]);
        setNewReview('');
    };

    return (
        <div className="product-reviews mt-4">
            <h4 className="mb-3">Đánh Giá Sản Phẩm</h4>
            
            {/* Input Đánh Giá */}
            <div className="input-container mb-4">
                <input
                    type="text"
                    placeholder="Nhập đánh giá của bạn ở đây..."
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                />
                <button 
                    className="send-icon"
                    onClick={handleAddReview} 
                    disabled={!newReview.trim()}
                >
                    <FaPaperPlane />
                </button>
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
                                                {[...Array(5)].map((star, index) => (
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
