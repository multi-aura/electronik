import React from 'react';
import Introducedetail from '../../Introduce/Introduce';
function Introduce({ userData }) {
  if (!userData) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Introducedetail userData={userData} /> 
    </div>
  );
}

export default Introduce;
