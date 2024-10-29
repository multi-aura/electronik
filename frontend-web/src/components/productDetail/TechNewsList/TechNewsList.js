import React from 'react';
import './TechNewsList.css';

// Dữ liệu mẫu cho các bài viết
const articles = [
    {
        id: 1,
        image: 'https://file.hstatic.net/200000722513/article/gearvn-cach-xem-mat-khau-facebook_9b2f80924b2b452aaf6d2dacbe095a9d_grande.jpg',
        title: 'Hướng dẫn cách tạo Header trong Word đơn giản, dễ thực hiện',
    },
    {
        id: 2,
        image: 'https://file.hstatic.net/200000722513/article/tao-header-trong-word-thumbnail_93ff17993d1d4429a93261d047627180_grande.jpg',

        title: 'Tải video chất lượng với ứng dụng Snaptube tiện lợi, nhanh chóng',
    },
    {
        id: 3,
        image: 'https://file.hstatic.net/200000722513/article/gearvn-cach-xem-mat-khau-facebook_9b2f80924b2b452aaf6d2dacbe095a9d_grande.jpg',

        title: 'FULL bộ code Anime Dimensions Simulator mới nhất, cập nhật liên tục',
    },
    {
        id: 4,
        image: 'https://file.hstatic.net/200000722513/article/tao-header-trong-word-thumbnail_93ff17993d1d4429a93261d047627180_grande.jpg',


        title: 'Cách xem mật khẩu Facebook trên điện thoại, máy tính',
    },
    {
        id: 5,
        image: 'https://file.hstatic.net/200000722513/article/gearvn-cach-xem-mat-khau-facebook_9b2f80924b2b452aaf6d2dacbe095a9d_grande.jpg',

        title: 'Tổng hợp full code Hành Trình AFK mới nhất 2024',
    },
];

const TechNewsList = () => {
    return (
        <div className="tech-news-list">
            <h2>Tin tức về công nghệ</h2>
            {articles.map((article) => (
                <div className="news-item" key={article.id}>
                    <img src={article.image} alt={article.title} className="news-image" />
                    <div className="news-info">
                        <p className="news-title">{article.title}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TechNewsList;
