import React from 'react';
import './CategoryGrid.css';

const categories = [
  { name: 'Laptop', imgSrc: 'link_to_laptop_image' },
  { name: 'PC', imgSrc: 'link_to_pc_image' },
  { name: 'Màn hình', imgSrc: 'link_to_monitor_image' },
  { name: 'Mainboard', imgSrc: 'link_to_mainboard_image' },
  { name: 'CPU', imgSrc: 'link_to_cpu_image' },
  { name: 'VGA', imgSrc: 'link_to_vga_image' },
  { name: 'RAM', imgSrc: 'link_to_ram_image' },
  { name: 'Ổ cứng', imgSrc: 'link_to_storage_image' },
  { name: 'Case', imgSrc: 'link_to_case_image' },
  { name: 'Tản nhiệt', imgSrc: 'link_to_cooling_image' },
  { name: 'Nguồn', imgSrc: 'link_to_power_image' },
  { name: 'Bàn phím', imgSrc: 'link_to_keyboard_image' },
  { name: 'Chuột', imgSrc: 'link_to_mouse_image' },
  { name: 'Ghế', imgSrc: 'link_to_chair_image' },
  { name: 'Tai nghe', imgSrc: 'link_to_headphone_image' },
  { name: 'Loa', imgSrc: 'link_to_speaker_image' },
  { name: 'Console', imgSrc: 'link_to_console_image' },
  { name: 'Phụ kiện', imgSrc: 'link_to_accessory_image' },
  { name: 'Thiết bị VP', imgSrc: 'link_to_office_device_image' },
  { name: 'Apple', imgSrc: 'link_to_apple_image' },
];

const CategoryGrid = () => {
  return (
    <div className="category-grid-container p-4 rounded">
      <h4 className="category-title text-danger fw-bold">Danh mục sản phẩm</h4>
      <div className="row mt-3">
        {categories.map((category, index) => (
          <div key={index} className="col-6 col-md-3 col-lg-2 text-center mb-4">
            <div className="category-item">
              <img src={category.imgSrc} alt={category.name} className="category-image mb-2" />
              <p className="category-name">{category.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
