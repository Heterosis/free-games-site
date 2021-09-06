import React, { useEffect, useState } from 'react';
import {
  Button, Modal, Row, Col, Image,
} from 'react-bootstrap';
import axios from 'axios';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Loading from 'compoents/Loading';

const GameModal = (props) => {
  const { gameId, show, handleClose } = props;
  const [gamaDetail, setGameDetail] = useState({});
  const [isModalLoading, setIsModalLoading] = useState(true);

  const getDetailData = async () => {
    setIsModalLoading(true);

    try {
      const response = await axios.get('https://free-to-play-games-database.p.rapidapi.com/api/game', {
        params: {
          id: gameId,
        },
        headers: {
          'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
          'x-rapidapi-key': '91664f646fmsh431ef755caaf5bfp12ddc6jsn21996b420ce1',
        },
      });

      setGameDetail(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsModalLoading(false);
    }
  };

  useEffect(() => { getDetailData(); }, [gameId]);

  return (
    <Modal size="lg" show={show} onHide={handleClose} contentClassName="bg-dark text-light">
      {isModalLoading ? <Loading /> : (
        <>
          {!_.isEmpty(gamaDetail) && (
          <>
            <Modal.Header>
              <Modal.Title>{gamaDetail.title}</Modal.Title>
              <Button variant="dark" onClick={handleClose}>
                ×
              </Button>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col xs={12} lg={4}>
                  <Image src={gamaDetail.thumbnail} rounded fluid />
                </Col>
                <Col xs={12} lg={8}>
                  {gamaDetail.short_description}
                  <a href={gamaDetail.game_url} target="_blank" rel="noreferrer" className="ms-1">
                    <FontAwesomeIcon icon={['fas', 'paper-plane']} />
                  </a>
                </Col>
              </Row>
              <Row className="mt-5">
                <Col xs={0} lg={4} />
                <Col xs={12} lg={8}>
                  <h4>Additional Information</h4>
                </Col>
              </Row>
              <Row>
                <Col xs={0} lg={4} />
                <Col xs={12} lg={8}>
                  <Row xs={1} lg={3}>
                    <Col>
                      <div className="text-secondary">Title</div>
                      <div className="text-light">{gamaDetail.title}</div>
                    </Col>
                    <Col>
                      <div className="text-secondary">Developer</div>
                      <div className="text-light">{gamaDetail.developer}</div>
                    </Col>
                    <Col>
                      <div className="text-secondary">Publisher</div>
                      <div className="text-light">{gamaDetail.publisher}</div>
                    </Col>
                  </Row>
                  <Row xs={1} lg={3}>
                    <Col>
                      <div className="text-secondary">Release Date</div>
                      <div className="text-light">{gamaDetail.release_date}</div>
                    </Col>
                    <Col>
                      <div className="text-secondary">Genre</div>
                      <div className="text-light">{gamaDetail.genre}</div>
                    </Col>
                    <Col>
                      <div className="text-secondary">Platform</div>
                      <div className="text-light">{gamaDetail.platform}</div>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className="mt-5">
                <Col xs={0} lg={4} />
                <Col xs={12} lg={8}>
                  <h4>Screenshots</h4>
                </Col>
              </Row>
              <Row>
                <Col xs={0} lg={4} />
                <Col xs={12} lg={8}>
                  <Row xs={1} lg={2}>
                    {gamaDetail.screenshots.map((screenshot) => (
                      <Col key={screenshot.id} className="mb-2">
                        <a href={screenshot.image} target="_blank" rel="noreferrer">
                          <Image src={screenshot.image} rounded fluid />
                        </a>
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
              <Row className="mt-5">
                <Col xs={0} lg={4} />
                <Col xs={12} lg={8}>
                  <h4>Minimum System Requirements</h4>
                </Col>
              </Row>
              <Row>
                <Col xs={0} lg={4} />
                <Col xs={12} lg={8}>
                  <Row xs={1}>
                    {_.map(gamaDetail.minimum_system_requirements, (value, key) => (
                      <Col>
                        <div className="text-secondary">{_.capitalize(key)}</div>
                        <div className="text-light">{value}</div>
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            </Modal.Body>
          </>
          )}
        </>
      )}
    </Modal>
  );
};

export default GameModal;
