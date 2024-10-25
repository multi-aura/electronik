import React, { useState, useEffect } from 'react';
import PeopleList from '../../People/PeopleList/PeopleList';
import LoadMoreButton from '../../Button/LoadMoreButton';

const PeopleSearchResult = ({ suggestedUsers }) => {
  const [people, setPeople] = useState(suggestedUsers);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchMorePeople = () => {
    if (loading) return;
    setLoading(true);

    setTimeout(() => {
      setPeople(prev => [...prev, ...suggestedUsers]);
      setPage(prevPage => prevPage + 1);
      setLoading(false);
      setHasMore(false); 
    }, 1000); 
  };

  useEffect(() => {
    setPeople(suggestedUsers);
  }, [suggestedUsers]);

  return (
    <div className="people-search-result">
      <PeopleList people={people} />
      <LoadMoreButton onClick={fetchMorePeople} hasMore={hasMore} loading={loading} />
    </div>
  );
};

export default PeopleSearchResult;
