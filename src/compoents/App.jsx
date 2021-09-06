import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import GameFilter from 'compoents/GameFilter';
import GamesArea from 'compoents/GamesArea';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentData, setCurrentData] = useState([]);
  const [selectedTags, setSelectedTags] = useState(new Set());
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [sort, setSort] = useState('relevance');

  const getData = async () => {
    setIsLoading(true);

    try {
      const requestUrl = selectedTags.size > 0 ? 'https://free-to-play-games-database.p.rapidapi.com/api/filter' : 'https://free-to-play-games-database.p.rapidapi.com/api/games';
      const response = await axios.get(requestUrl, {
        params: {
          'sort-by': sort,
          ...selectedTags.size > 0 ? { tag: [...selectedTags].join('.') } : { },
          ...selectedPlatform === '' ? {} : { platform: selectedPlatform },
        },
        headers: {
          'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
          'x-rapidapi-key': '91664f646fmsh431ef755caaf5bfp12ddc6jsn21996b420ce1',
        },
      });

      setCurrentData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { getData(); }, [selectedTags, selectedPlatform, sort]);

  return (
    <>
      <h1 className="text-center text-light">
        {currentData.length}
        {' '}
        Free Games
      </h1>
      <GameFilter
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        selectedPlatform={selectedPlatform}
        setSelectedPlatform={setSelectedPlatform}
        sort={sort}
        setSort={setSort}
      />
      <GamesArea isLoading={isLoading} games={currentData} />
      <div className="position-fixed top-0 end-0">
        <a href="https://github.com/Heterosis/free-games-site" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={['fab', 'github']} style={{ fontSize: 40 }} />
        </a>
      </div>
    </>
  );
};

export default App;
