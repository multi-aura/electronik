import React from 'react';
import SaleItem from '../SaleItem/SaleItem';
import './SalesList.css';

const SalesList = ({ sales, onEditSale, onSelectProduct }) => {
    return (
        <div className="sales-list">
            {sales.map((sale) => (
                <SaleItem
                    key={sale.id}
                    sale={sale}
                    onEditSale={onEditSale}
                    onSelectProduct={onSelectProduct} // Truyền prop đúng
                />
            ))}
        </div>
    );
};
export default SalesList;
