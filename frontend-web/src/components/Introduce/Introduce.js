import React from 'react';
import './Introduce.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEdit } from '@fortawesome/free-solid-svg-icons';

const Introducedetail = ({ userData }) => {
  if (!userData) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="introduce-container">
      <div className="section-header">
        <h2>Contact Information</h2>
        <FontAwesomeIcon icon={faEdit} className="edit-icon" />
      </div>
      <div className="introduce-section">
        <div className="info-item">
          <p><strong>Phone Number:</strong> {userData.phone}</p>
          <FontAwesomeIcon icon={faLock} className="lock-icon" />
        </div>
        <div className="info-item">
          <p><strong>Email:</strong> {userData.email}</p>
          <FontAwesomeIcon icon={faLock} className="lock-icon" />
        </div>
        <div className="info-item">
          <p><strong>Address:</strong> {userData.province}, {userData.nation}</p>
        </div>
      </div>

      {/* User Information */}
      <div className="section-header">
        <h2>User Information</h2>
        <FontAwesomeIcon icon={faEdit} className="edit-icon" />
      </div>
      <div className="introduce-section">
        <div className="info-item">
          <p><strong>Full Name:</strong> {userData.fullname}</p>
        </div>
        <div className="info-item">
          <p><strong>Gender:</strong> {userData.gender}</p>
        </div>
        <div className="info-item">
          <p><strong>Date of Birth:</strong> {new Date(userData.birthday).toLocaleDateString()}</p>
        </div>
        <div className="info-item">
          <p><strong>Hometown:</strong> {userData.province}, {userData.nation}</p>
        </div>
      </div>

      {/* About Account */}
      <div className="section-header">
        <h2>About Account</h2>
        <FontAwesomeIcon icon={faEdit} className="edit-icon" />
      </div>
      <div className="introduce-section">
        <div className="info-item">
          <p><strong>Create at:</strong> {new Date(userData.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Introducedetail;
