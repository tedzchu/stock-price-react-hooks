import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './InfoBox.css';

const InfoBox = props => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [info, setInfo] = useState({
    currentPrice: null,
    monthChangeD: null,
    monthChangeP: null,
    updatedAt: null
  });

  useEffect(() => {
    setIsLoading(true);
    const setInfo = () => {
      const prices = props.data;
      const price = prices[0].y;
      const change = price - prices[prices.length - 1].y;
      const changeP = (change / prices[prices.length - 1].y) * 100;

      setInfo({
        currentPrice: price,
        monthChangeD: change.toLocaleString('us-EN', {
          style: 'currency',
          currency: 'USD'
        }),
        monthChangeP: changeP.toFixed(2) + '%',
        updatedAt: new moment()
      });
    };
    setInfo();
    console.log(info);
  }, [props.data]);

  return <div>hi</div>;
};

export default InfoBox;
