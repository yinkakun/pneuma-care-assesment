import React from 'react';
import { useEffect, useState } from 'react';
import './homepage.css';
import 'antd/dist/antd.css';
import { Alert, Card, Row, Col, Typography } from 'antd';
import { Link } from 'react-router-dom';

const useFetchData = (apiUrl) => {
  const [data, setData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setData(data);
        setIsFetching(false);
      } catch (error) {
        setError(error);
        setIsFetching(false);
      }
    }
    fetchData();
  }, [apiUrl]);

  return [data, error, isFetching];
};

const peopleGrid = (people) => {
  return people.map((person) => (
    <Col className="gutter-row " span={6} key={person.name}>
      <Link to={`/character/${person.name}`} component={Typography.Link}>
        <Card title={person.name} className="card">
          <div className="info">
            <p>Year of Birth: {person.birth_year}</p>
            <p>
              Gender:{' '}
              {person.gender === 'n/a'
                ? 'A bot has no gender 😏'
                : person.gender}
            </p>
          </div>
        </Card>
      </Link>
    </Col>
  ));
};

const API_URL = `https://swapi.dev/api/people/`;

function HomePage() {
  const [data, error, isFetching] = useFetchData(API_URL);
  const people = data ? data.results : [];

  console.log(people);

  return (
    <div className="container">
      <header>
        <h1>People From StarWars</h1>
        <p>Powered by the SWAPI API</p>
      </header>

      <main>
        {isFetching && (
          <div className="loading">
            <Alert message="Loading" type="info" />
          </div>
        )}

        {!isFetching && error && (
          <div className="error">
            <Alert
              message="An Error Occured While Fetching"
              description={error.message}
              type="error"
            />
          </div>
        )}

        {!isFetching && !error && (
          <div className="people">
            <Row gutter={[16, 24]}>{people && peopleGrid(people)}</Row>
          </div>
        )}
      </main>
    </div>
  );
}

export default HomePage;
