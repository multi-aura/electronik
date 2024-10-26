import React from 'react';
import Logo from '../Logo/Logo';
import SearchBar from '../SearchBar/SearchBar';
import NavigationIcons from '../Navigation/Navigation';
import SubMenu from '../SubMenu/SubMenu';

const Header = () => {
  const handleSearch = (searchTerm) => {
    console.log('Searching for:', searchTerm);
  };

  return (
    <header>
      <div className="d-flex align-items-center py-0 px-3" style={{ backgroundColor: 'black' }}>
        <div className="me-4">
          <Logo />
        </div>
        <div className="flex-grow-1 mx-3">
          <SearchBar onSearch={handleSearch} />
        </div>
        <NavigationIcons />
      </div>
      <SubMenu />
    </header>
  );
};

export default Header;
