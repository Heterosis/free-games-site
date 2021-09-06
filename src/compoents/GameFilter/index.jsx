import React from 'react';
import {
  Row, Col, DropdownButton, Dropdown, Form,
} from 'react-bootstrap';
import _ from 'lodash';

import platforms from 'constants/platforms';
import sorts from 'constants/sorts';
import tags from 'constants/tags';

import styles from './GameFilter.module.css';

const GameFilter = (props) => {
  const {
    selectedTags, setSelectedTags, selectedPlatform, setSelectedPlatform, sort, setSort,
  } = props;

  const handleChangePlatform = (platform) => {
    setSelectedPlatform(platform);
  };

  const handleChangeTag = (tag) => {
    if (selectedTags.has(tag)) {
      setSelectedTags((prev) => new Set([...prev].filter((x) => x !== tag)));
    } else {
      setSelectedTags((prev) => new Set(prev.add(tag)));
    }
  };

  const handleChangeSort = (newSort) => {
    setSort(newSort);
  };

  return (
    <Row xs={3} className="mb-4">
      <Col>
        <DropdownButton
          variant="secondary"
          title="Platform"
          className="mt-2"
        >
          <div className={`${styles.DropdownMenu}`}>
            {platforms.map((platform) => (
              <Form.Check
                key={platform}
                type="radio"
                label={`${_.capitalize(platform)}`}
                checked={selectedPlatform === platform}
                onChange={() => { handleChangePlatform(platform); }}
              />
            ))}
            <Form.Check
              type="radio"
              label="All"
              checked={selectedPlatform === ''}
              onChange={() => { handleChangePlatform(''); }}
            />
          </div>
        </DropdownButton>
      </Col>
      <Col className="d-flex">
        <DropdownButton
          variant="secondary"
          title="Tag Filter"
          className="mt-2"
        >
          <div className={`${styles.DropdownMenu}`}>
            {tags.map((tag) => (
              <Form.Check
                key={tag}
                type="checkbox"
                label={`${_.capitalize(tag)}`}
                checked={selectedTags.has(tag)}
                onChange={() => { handleChangeTag(tag); }}
              />
            ))}
          </div>
        </DropdownButton>
        <div className={`${styles.FilterText}`}>
          {[...selectedTags].join(', ')}
        </div>
      </Col>
      <Col>
        <DropdownButton
          variant="secondary"
          title={`Sort By ${_.capitalize(sort)}`}
          className="mt-2"
        >
          {sorts.map((eachSort) => (
            <Dropdown.Item
              key={eachSort}
              active={eachSort === sort}
              onClick={() => { handleChangeSort(eachSort); }}
              className="text-light"
            >
              {_.capitalize(eachSort)}
            </Dropdown.Item>
          ))}

        </DropdownButton>
      </Col>
    </Row>
  );
};

export default GameFilter;
