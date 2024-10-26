import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptop, faDesktop, faMemory, faKeyboard, faMouse, faHeadphones, faGamepad } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const Sidebar = () => {
  const categories = [
    {
      icon: faLaptop,
      label: 'Laptop',
      subcategories: ['Laptop Gaming', 'PC GVN', 'Main, CPU, VGA'],
    },
    {
      icon: faDesktop,
      label: 'PC GVN',
      subcategories: ['Case, Nguồn, Tản', 'Ổ cứng, RAM, Thẻ nhớ'],
    },
    {
      icon: faMemory,
      label: 'Main, CPU, VGA',
      subcategories: ['Bàn phím', 'Chuột', 'Tai Nghe'],
    },
    {
      icon: faKeyboard,
      label: 'Bàn phím',
      subcategories: ['Gaming Gear', 'Wireless Keyboards'],
    },
    {
      icon: faMouse,
      label: 'Chuột',
      subcategories: ['Gaming Mice', 'Office Mice'],
    },
    {
      icon: faHeadphones,
      label: 'Tai Nghe',
      subcategories: ['Over-ear', 'In-ear'],
    },
    {
      icon: faGamepad,
      label: 'Console',
      subcategories: ['PlayStation', 'Xbox', 'Nintendo'],
    },
  ];

  return (
    <aside className="sidebar">
      <ul className="list-unstyled">
        {categories.map((category, index) => (
          <li key={index} className="category-item">
            <div className="d-flex align-items-center category-header">
              <FontAwesomeIcon icon={category.icon} className="sidebar-icon me-2" />
              <span>{category.label}</span>
            </div>
            <ul className="submenu list-unstyled">
              {category.subcategories.map((subcategory, subIndex) => (
                <li key={subIndex} className="submenu-item">
                  {subcategory}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
