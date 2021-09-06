import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import LoadingOverlay from 'react-loading-overlay';

import GameCard from './GameCard';
import GameModal from './GameModal';

const GamesArea = (props) => {
  const { isLoading, games } = props;
  const [showModal, setShowModal] = useState(false);
  const [detailGameId, setDetailGameId] = useState('');

  return (
    <LoadingOverlay
      active={isLoading}
      spinner
      text="Loading..."
    >
      <Row>
        {games.map((game) => (
          <Col
            key={game.id}
            xl={3}
            md={4}
            className="mb-3"
          >
            <GameCard
              game={game}
              onClick={() => {
                setDetailGameId(game.id);
                setShowModal(true);
              }}
            />
          </Col>
        ))}
      </Row>
      <GameModal
        gameId={detailGameId}
        show={showModal}
        handleClose={() => { setShowModal(false); }}
      />
    </LoadingOverlay>
  );
};

export default GamesArea;
