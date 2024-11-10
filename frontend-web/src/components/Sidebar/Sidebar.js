// src/components/Sidebar/Sidebar.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptop, faDesktop, faMemory, faKeyboard, faMouse, faHeadphones, faGamepad } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const Sidebar = ({ categories }) => {
  const icons = [faLaptop, faDesktop, faMemory, faKeyboard, faMouse, faHeadphones, faGamepad]; // Adjust or add icons as needed

  return (
    <aside className="sidebar">
      <ul className="list-unstyled">
        {categories.map((category, index) => (
          <li key={index} className="category-item">
            <div className="d-flex align-items-center category-header">
              <FontAwesomeIcon icon={icons[index % icons.length]} className="sidebar-icon me-2" />
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
