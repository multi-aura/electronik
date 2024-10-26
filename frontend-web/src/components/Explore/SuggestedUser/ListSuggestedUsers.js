import React from 'react';
import SuggestedUser from './SuggestedUser';
import './ListSuggestedUsers.css';

const ListSuggestedUsers = ({ suggestedUsers }) => {
  return (
    <div className="suggested-users">
      <div className="suggested-header d-flex justify-content-between align-items-center">
        <h5>Suggested for you</h5>
        <a href="#" className="see-all-link">See All</a> 
      </div>
      <ul className="list-group">
        {suggestedUsers && suggestedUsers.map((user) => (
          <SuggestedUser key={user.userID} user={user} /> 
        ))}
      </ul>
    </div>
  );
};

export default ListSuggestedUsers;
