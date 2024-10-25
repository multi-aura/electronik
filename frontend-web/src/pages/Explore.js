import React, { useState, useEffect } from 'react';
import SearchBar from '../components/Explore/Search/SearchExploreBar';
import TabMenu from '../components/Explore/TabMenu/TabMenu';
import SuggestedUsers from '../components/Explore/SuggestedUser/ListSuggestedUsers';
import ForYou from '../components/Explore/ExploreSubPage/ForYou';
import Trending from '../components/Explore/ExploreSubPage/Trending';
import News from '../components/Explore/ExploreSubPage/News';
import Posts from '../components/Explore/ExploreSubPage/Posts';

import Layout from '../layouts/Layout';
import PeopleSearchResult from '../components/Explore/ExploreSubPage/PeopleSearchResult';
import {getPeopleSuggestions } from '../services/searchService';

import '../assets/css/Explore.css';

function Explore() {
  const [userData, setUserData] = useState(null); 
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('Trending');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user'); 
    if (storedUser) {
      setUserData(JSON.parse(storedUser)); 
    }

    const fetchSuggestedUsers = async () => {
      try {
        const result = await getPeopleSuggestions();
        setSuggestedUsers(result.data);  
        console.log(result.data)
      } catch (error) {
        console.error('Lỗi khi lấy đề xuất người dùng:', error);
      }
    };

    fetchSuggestedUsers();
  }, []); 

  const renderContent = () => {
    switch (activeTab) {
      case 'For you':
        return  <ForYou />;
      case 'Trending':
        return <Trending />;
      case 'News':
        return <News />
      case 'People':
        return <PeopleSearchResult suggestedUsers={suggestedUsers} />;
      case 'Posts':
        return <Posts />
      default:
        return <div><h2>Nội dung mặc định sẽ hiển thị ở đây</h2></div>;
    }
  };
  return (
    <Layout userData={userData}>
      <div className="explore-page container-fluid">
        <div className="row">
          <div className="col-lg-8 col-md-7 col-sm-12 mb-4">
            <SearchBar onSearch={setSearchTerm} />
            <TabMenu activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="post-container">
              {renderContent()}
            </div>
          </div>

          <div className="col-lg-4 col-md-5 col-sm-12 ">
            <div className="suggestions-container p-3 rounded">
              <SuggestedUsers suggestedUsers={suggestedUsers} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Explore;
