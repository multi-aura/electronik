import React from 'react';
import CustomInput from '../../Input/CustomInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone, faGlobe, faMapMarkerAlt, faCalendarAlt, faVenusMars } from '@fortawesome/free-solid-svg-icons';

function Step2({ formData, onFormChange, onPrev, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Infomation</h2>

      <CustomInput 
        type="text"
        label="Full Name"
        value={formData.fullname}
        onChange={(e) => onFormChange('fullname', e.target.value)}
        icon={faUser}
      />
      <CustomInput 
        type="text"
        label="Phone"
        value={formData.phone}
        onChange={(e) => onFormChange('phone', e.target.value)}
        icon={faPhone}
      />
      <CustomInput 
        type="date"
        label="birthday"
        value={formData.birthday}
        onChange={(e) => onFormChange('birthday', e.target.value)}
        icon={faCalendarAlt}
      />
      <CustomInput 
        type="text"
        label="Nation"
        value={formData.nation}
        onChange={(e) => onFormChange('nation', e.target.value)}
        icon={faGlobe}
      />
      <CustomInput 
        type="text"
        label="Province"
        value={formData.province}
        onChange={(e) => onFormChange('province', e.target.value)}
        icon={faMapMarkerAlt}
      />
      
      <div className="form-group mb-3">
        <label>Gender</label>
        <div className="d-flex">
          <div className="form-check me-3">
            <input 
              type="radio" 
              value="male" 
              name="gender" 
              checked={formData.gender === 'male'} 
              onChange={() => onFormChange('gender', 'male')} 
            />
            <label>Male</label>
          </div>
          <div className="form-check">
            <input 
              type="radio" 
              value="female" 
              name="gender" 
              checked={formData.gender === 'female'} 
              onChange={() => onFormChange('gender', 'female')} 
            />
            <label>Female</label>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between">
        <button type="button" className="custom-button" onClick={onPrev}>Back</button>
        <button type="submit" className="custom-button">Register</button>
      </div>
    </form>
  );
}

export default Step2;
