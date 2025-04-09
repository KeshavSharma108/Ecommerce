import {useEffect, useState} from 'react';
import {Alert} from 'react-native';

const handleData = async setData => {
  try {
    const url = `https://fakestoreapi.com/products`;
    const result = await fetch(url);
    if (!result.ok) throw new Error('Failed to fetch data');
    const jsonResult = await result.json();
    setData(jsonResult);
    console.log('Fetched Data:', jsonResult);
  } catch (error) {
    console.error('Error fetching data:', error);
    Alert.alert('Error', 'Something went wrong while fetching data.');
  }
};

const GetData = ({setData}) => {
  useEffect(() => {
    handleData(setData);
  }, [setData]);

  return null;
};

export default GetData;
