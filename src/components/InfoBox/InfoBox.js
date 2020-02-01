import React from 'react';
import moment from 'moment';
import './InfoBox.css';

const InfoBox = ({ data }) => {
  return (
    <div id='data-container'>
      <div id='left' className='box'>
        <div className='heading'>
          {Number(data[data.length - 1]?.y).toLocaleString('us-EN', {
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
          {Number(data[data.length - 1]?.y - data[0]?.y).toLocaleString(
            'us-EN',
            {
              style: 'currency',
              currency: 'USD'
            }
          )}
        </div>
        <div className='subtext'>Change Since Last Month (USD)</div>
      </div>
      <div id='right' className='box'>
        <div className='heading'>
          {(
            ((data[data.length - 1]?.y - data[0]?.y) / data[0]?.y) *
            100
          ).toFixed(2) + '%'}
        </div>
        <div className='subtext'>Change Since Last Month (%)</div>
      </div>
    </div>
  );
};

export default InfoBox;
