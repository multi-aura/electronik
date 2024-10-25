import React from 'react';
import PersonItem from '../PersonItem/PersonItem'; 

const PeopleList = ({ people }) => {
  if (!people || people.length === 0) {
    return <div>No users found.</div>;
  }

  return (
    <ul className="people-list">
      {people.map((person, index) => (
        <PersonItem key={index} person={person} />
      ))}
    </ul>
  );
};

export default PeopleList;
