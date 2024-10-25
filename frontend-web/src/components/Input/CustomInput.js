import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './CustomInput.css';

function CustomInput({ label, type, value, onChange, icon }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="input-group">
        {icon && (
          <span className="input-group-text bg-white">
            <FontAwesomeIcon icon={icon} />
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="form-controlh"
        />
      </div>
    </div>
  );
}

export default CustomInput;
