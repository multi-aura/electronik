import React, { useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import PaginationControls from '../PaginationControls/PaginationControls';
import './BestSellingProducts.css';

const BestSellingProducts = () => {
  const defaultImage = 'https://product.hstatic.net/200000722513/product/ava1_fa4a852e3b5b40978022459ce8d8562a_medium.png';

  const products = [
    { name: 'PC GVN Intel i5-12400F/ VGA RTX 4060', price: '17.690.000₫', discount: '-1%', imgSrc: defaultImage, specs: ['i5 12400F', 'RTX 4060', 'B760', '16GB', '500GB'], gift: 'RAM 8 GB' },
    { name: 'PC GVN Intel i3-12100F/ VGA RX 6500XT', price: '9.990.000₫', discount: '-1%', imgSrc: defaultImage, specs: ['i3 12100F', 'RX 6500XT', 'H610', '8GB', '250GB'], gift: 'RAM 8 GB' },
    { name: 'PC GVN x Corsair iCUE (Intel i5-14600KF/ VGA RTX 4060 Ti)', price: '32.990.000₫', discount: '-1%', imgSrc: defaultImage, specs: ['i5 14600KF', 'RTX 4060 Ti', 'Z790', '32GB', '500GB'], gift: '5 TRIỆU' },
    { name: 'PC GVN x MSI Dragon ACE (Intel i9-14900K/ VGA RTX 4080)', price: '93.990.000₫', discount: '-0%', imgSrc: defaultImage, specs: ['i9 14900K', 'RTX 4080', 'Z790', '64GB', '1TB'], gift: '5 TRIỆU' },
    { name: 'PC GVN x ASUS Back to Future (Intel i7-14700K/ VGA RTX 4070)', price: '62.590.000₫', discount: '-12%', imgSrc: defaultImage, specs: ['i7 14700K', 'RTX 4070', 'Z790', '32GB', '1TB'], gift: '5 TRIỆU' },
    { name: 'PC GVN x ASUS Back to Future (Intel i7-14700K/ VGA RTX 4070)', price: '62.590.000₫', discount: '-12%', imgSrc: defaultImage, specs: ['i7 14700K', 'RTX 4070', 'Z790', '32GB', '1TB'], gift: '5 TRIỆU' },
    { name: 'PC GVN x ASUS Back to Future (Intel i7-14700K/ VGA RTX 4070)', price: '62.590.000₫', discount: '-12%', imgSrc: defaultImage, specs: ['i7 14700K', 'RTX 4070', 'Z790', '32GB', '1TB'], gift: '5 TRIỆU' },

];

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentItems = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage > totalPages ? 1 : newPage < 1 ? totalPages : newPage);
  };

  return (
    <div className="best-selling-container p-4 bg-light rounded">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold">Sản phẩm bán chạy</h4>
      </div>
      <div className="row">
        {currentItems.map((product, index) => (
          <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-2">
            <ProductCard product={product} defaultImage={defaultImage} />
          </div>
        ))}
      </div>
      <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default BestSellingProducts;
