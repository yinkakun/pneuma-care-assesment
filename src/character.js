import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Typography, Table } from 'antd';
const { Title } = Typography;

const useFetchData = (characterName) => {
  const [data, setData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://swapi.dev/api/people?search=${characterName}`
        );
        const data = await response.json();
        setData(data);
        setIsFetching(false);
      } catch (error) {
        setError(error);
        setIsFetching(false);
      }
    }
    fetchData();
  }, [characterName]);

  return [data, error, isFetching];
};

const characterDetails = (data) => {
  const detail = data.results[0];

  const {
    name,
    gender,
    height,
    mass,
    birth_year: birthYear,
    eye_color: eyeColor,
    skin_color: skinColor,
  } = detail;

  const tableColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Height',
      dataIndex: 'height',
      key: 'height',
    },
    {
      title: 'Mass',
      dataIndex: 'mass',
      key: 'mass',
    },
    {
      title: 'Birth Year',
      dataIndex: 'birthYear',
      key: 'birthyear',
    },
    {
      title: 'Eye Color',
      dataIndex: 'eyeColor',
      key: 'eyeColor',
    },
    {
      title: 'Skin Color',
      dataIndex: 'skinColor',
      key: 'skinColor',
    },
  ];

  const tableDataSource = [
    {
      key: '1',
      name,
      gender,
      height,
      mass,
      birthYear,
      eyeColor,
      skinColor,
    },
  ];

  return (
    <div style={{ marginTop: '3rem', textTransform: 'capitalize' }}>
      <Title>{detail.name}</Title>
      <Table
        dataSource={tableDataSource}
        columns={tableColumns}
        pagination={false}
      />
      ;
    </div>
  );
};

const Character = () => {
  const { character } = useParams();
  const [data, error, isFetching] = useFetchData(character);

  return (
    <div className="container">
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

        {!isFetching && !error && <div>{data && characterDetails(data)}</div>}
      </main>
    </div>
  );
};

export default Character;
