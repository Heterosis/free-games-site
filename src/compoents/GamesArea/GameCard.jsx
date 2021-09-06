import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LazyLoad from 'react-lazy-load';

import platforms from 'constants/platforms';

import styles from './GamesArea.module.css';

const GameCard = (props) => {
  const { game, onClick } = props;
  const {
    title,
    thumbnail,
    short_description: shortDescription,
    game_url: gameUrl,
    genre,
    platform,
  } = game;

  const platformIcons = () => {
    const icons = [];
    platforms.forEach((eachPlatform) => {
      if (platform.toLowerCase().includes(eachPlatform)) {
        switch (eachPlatform) {
          case 'pc':
            icons.push(<FontAwesomeIcon key={eachPlatform} icon={['fab', 'windows']} className="mx-1" />);
            break;
          case 'browser':
            icons.push(<FontAwesomeIcon key={eachPlatform} icon={['fas', 'window-maximize']} className="mx-1" />);
            break;
          default:
            break;
        }
      }
    });
    return icons;
  };

  return (
    <Card
      bg="dark"
      text="light"
      className={`${styles.GameCard}`}
      onClick={onClick}
    >
      <LazyLoad height={200} offsetVertical={1000}>
        <Card.Img
          loading="lazy"
          variant="top"
          src={thumbnail}
          className={`${styles.GameThumbnail}`}
        />
      </LazyLoad>
      <Card.Body>
        <Card.Title className={`${styles.GameTitle}`}>
          {title}
        </Card.Title>
        <Card.Text className={`${styles.ShortDescription}`}>
          {shortDescription}
        </Card.Text>
        <Card.Text className="d-flex justify-content-between">
          <Card.Link href={gameUrl} target="_blank">
            <FontAwesomeIcon icon={['fas', 'paper-plane']} />
          </Card.Link>
          <span>
            <Badge pill className={`${styles.TagPill}`}>
              {genre}
            </Badge>
            {platformIcons()}
          </span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default GameCard;
