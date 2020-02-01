import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './App.css';
import './components/InfoBox/InfoBox';
import InfoBox from './components/InfoBox/InfoBox';

const App = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hovering, setHovering] = useState({
    hoverLoc: null,
    activePoint: null
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const url =
        'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=TSLA&apikey=[YOUR_KEY_HERE]';
      const response = await fetch(url);
      let data = await response.json();
      if (data['Time Series (Daily)']) {
        data = data['Time Series (Daily)'];
      } else {
        setData(data);
        return;
      }
      const sortedData = [];
      let count = 0;
      const endDate = moment(Object.keys(data)[0])
        .subtract(1, 'months')
        .format();
      for (let date in data) {
        if (moment(date).isBefore(endDate)) {
          break;
        }
        sortedData.push({
          d: moment(date).format('MMM DD'),
          p: data[date]['4. close'],
          x: count,
          y: data[date]['4. close']
        });
        count += 1;
      }
      setData(sortedData);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <div>Loading</div>
  ) : (
    <div className='container'>
      <div className='row'>
        <h1>30 Day TSLA Price Chart</h1>
      </div>
      <div className='row'>
        {data ? <InfoBox data={data} /> : <div>whoopsie</div>}
      </div>
      <div className='row'>
        <div className='popup'>
          {hovering.hoverLoc ? <div>NICE</div> : <div>SAD</div>}
        </div>
      </div>
      <div className='row'>
        <div className='chart'>
          {data ? <div>very cool</div> : <div>oh no</div>}
        </div>
      </div>
    </div>
  );
};

export default App;
