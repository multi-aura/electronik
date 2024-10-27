import React from 'react';
import './CategoryGrid.css';
const categories = [
    { name: 'Laptop', imgSrc: 'https://file.hstatic.net/200000636033/file/icon1_ce115f32db874a8e9b5af39517176e96.png', link: '/laptop' },
    { name: 'PC', imgSrc: 'https://file.hstatic.net/200000636033/file/icon3_5c59c1dc52ec4b81a94a3edba293e895.png', link: '/pc' },
    { name: 'Màn hình', imgSrc: 'https://product.hstatic.net/200000722513/product/asus_pg27aqdm_gearvn_53c46bd0ca1f40f1a7abfb0246800081_e341bb95b0724bee845ba8f093678245_master.jpg', link: '/monitor' },
    { name: 'Mainboard', imgSrc: 'https://file.hstatic.net/200000636033/file/icon5_71200675c9e64c32a11730486ba04b32.png', link: '/mainboard' },
    { name: 'CPU', imgSrc: 'https://file.hstatic.net/200000636033/file/icon6_056974287cd84e0d82eac05809b7e5d5.png', link: '/cpu' },
    { name: 'VGA', imgSrc: 'https://file.hstatic.net/200000722513/file/asus-rog-strix-rtx4090-o24g-gaming-03_c948a4c2a9cf4adcbd522319bfcd4846.jpg', link: '/vga' },
    { name: 'RAM', imgSrc: 'https://file.hstatic.net/200000636033/file/icon13_708c31c3ba56430dbec3f4cc7e1b14f0.png', link: '/ram' },
    { name: 'Ổ cứng', imgSrc: 'https://file.hstatic.net/200000636033/file/icon11_2f0ea4c77ae3482f906591cec8f24cea.png', link: '/storage' },
    { name: 'Case', imgSrc: 'https://file.hstatic.net/200000636033/file/icon7_cdd85eba03974cb99a3941d076bf5d1b.png', link: '/case' },
    { name: 'Tản nhiệt', imgSrc: 'https://file.hstatic.net/200000636033/file/icon8_8f7b3fe2e8fb450b805857be9bb14edc.png', link: '/cooling' },
    { name: 'Nguồn', imgSrc: 'https://file.hstatic.net/200000636033/file/icon9_ffd172460eb24c4d8bab6a7cd9a8cc46.png', link: '/power' },
    { name: 'Bàn phím', imgSrc: 'https://file.hstatic.net/200000722513/file/ban_phim_93a4d3cefd8345dfac23829818a3c5d4.jpg', link: '/keyboard' },
    { name: 'Chuột', imgSrc: 'https://file.hstatic.net/200000722513/file/chuot_aa348bf0177b4795a39ab66d51e62ed7.jpg', link: '/mouse' },
    { name: 'Ghế', imgSrc: 'https://file.hstatic.net/200000722513/file/ghe_e1ff4e3493f14aa982676b3c4574135e.jpg', link: '/chair' },
    { name: 'Tai nghe', imgSrc: 'https://file.hstatic.net/200000722513/file/tai_nghe_ed3b4f52172f40929e1d3ab493099b73.jpg', link: '/headphone' },
    { name: 'Loa', imgSrc: 'https://file.hstatic.net/200000636033/file/icon10_bfdf42150dbf45cfbcdf990b26f59691.png', link: '/speaker' },
    { name: 'Console', imgSrc: 'https://file.hstatic.net/200000636033/file/icon18_720958e90b7d4fa7ae803f8f4d2fe56b.png', link: '/console' },
  ];

const CategoryGrid = () => {
  return (
    <div className="category-grid-container p-4 rounded">
      <h4 className="category-title text-danger fw-bold">Danh mục sản phẩm</h4>
      <div className="row mt-3">
        {categories.map((category, index) => (
          <div key={index} className="col-6 col-md-3 col-lg-2 text-center mb-4">
            <a href={category.link} className="category-item">
              <img src={category.imgSrc} alt={category.name} className="category-image mb-2" />
              <p className="category-name">{category.name}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
