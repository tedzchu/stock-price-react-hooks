import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './App.css';
import './components/InfoBox/InfoBox';
import InfoBox from './components/InfoBox/InfoBox';
import LineChart from './components/LineChart/LineChart';
import ToolTip from './components/ToolTip/ToolTip';

function App() {
  const [fetchingData, setFetchingData] = useState(true);
  const [data, setData] = useState(null);
  const [hoverLoc, setHoverLoc] = useState(null);
  const [activePoint, setActivePoint] = useState(null);
  const handleChartHover = (hoverLoc, activePoint) => {
    setHoverLoc(hoverLoc);
    setActivePoint(activePoint);
  };
  useEffect(() => {
    const getData = () => {
      const url =
        'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=TSLA&apikey=[YOUR_KEY_HERE]';
      fetch(url)
        .then(r => r.json())
        .then(stockData => {
          const sortedData = [];
          let count = 29;
          for (let date in stockData['Time Series (Daily)']) {
            sortedData.unshift({
              d: moment(date).format('MMM DD'),
              p: stockData['Time Series (Daily)'][date][
                '4. close'
              ].toLocaleString('us-EN', { style: 'currency', currency: 'USD' }),
              x: count, //previous days
              y: Number(
                stockData['Time Series (Daily)'][date]['4. close']
              ).toFixed(2) // numerical price
            });
            count -= 1;
            if (count < 0) {
              break;
            }
          }
          setData(sortedData);
          setFetchingData(false);
        })
        .catch(e => {
          console.log(e);
        });
    };
    getData();
  }, []);
  return (
    <div className='container'>
      <div className='row'>
        <h1>30 (Trading) Day TSLA Price Chart</h1>
      </div>
      <div className='row'>
        {!fetchingData ? <InfoBox data={data} /> : null}
      </div>
      <div className='row'>
        <div className='popup'>
          {hoverLoc ? (
            <ToolTip hoverLoc={hoverLoc} activePoint={activePoint} />
          ) : null}
        </div>
      </div>
      <div className='row'>
        <div className='chart'>
          {!fetchingData ? (
            <LineChart
              data={data}
              onChartHover={(a, b) => handleChartHover(a, b)}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
