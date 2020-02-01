import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './InfoBox.css';

const InfoBox = props => {
  const [data, setData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [info, setInfo] = useState({
  //   currentPrice: null,
  //   monthChangeD: null,
  //   monthChangeP: null,
  //   updatedAt: null
  // });

  // const generateInfo = () => {
  //   const prices = data;
  //   const price = prices[0].y;
  //   const change = price - prices[prices.length - 1].y;
  //   const changeP = (change / prices[prices.length - 1].y) * 100;

  //   setInfo({
  //     currentPrice: price,
  //     monthChangeD: change.toLocaleString('us-EN', {
  //       style: 'currency',
  //       currency: 'USD'
  //     }),
  //     monthChangeP: changeP.toFixed(2) + '%',
  //     updatedAt: new moment()
  //   });
  // };

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  return data[0] ? (
    <div id='data-container'>
      <div id='left' className='box'>
        <div className='heading'>
          {Number(data[0].y).toLocaleString('us-EN', {
            style: 'currency',
            currency: 'USD'
          })}
        </div>
        <div className='subtext'>
          {'Updated ' + moment(new moment()).fromNow()}
        </div>
      </div>
      <div id='middle' className='box'>
        <div className='heading'>
          {Number(data[0].y - data[data.length - 1].y).toLocaleString('us-EN', {
            style: 'currency',
            currency: 'USD'
          })}
        </div>
        <div className='subtext'>Change Since Last Month (USD)</div>
      </div>
      <div id='right' className='box'>
        <div className='heading'>
          {(
            ((data[0].y - data[data.length - 1].y) / data[data.length - 1].y) *
            100
          ).toFixed(2) + '%'}
        </div>
        <div className='subtext'>Change Since Last Month (%)</div>
      </div>
    </div>
  ) : null;
};

export default InfoBox;
