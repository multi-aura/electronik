import React from 'react';
import SaleItem from '../SaleItem/SaleItem';
import './SalesList.css';

const SalesList = ({ sales, onEditSale, onSelectProduct,setIdDelete }) => {
    return (
        <div className="sales-list">
            {sales.map((sale) => (
                <SaleItem
                    key={sale.id}
                    sale={sale}
                    onEditSale={onEditSale}
                    onSelectProduct={onSelectProduct} // Truyền prop đúng
                    setIdDelete={setIdDelete}


                />
            ))}
        </div>
    );
};
export default SalesList;
