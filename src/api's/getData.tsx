import {useEffect} from 'react';
import {Alert} from 'react-native';

export interface ProductItem {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const handleData = async (setData: (data: ProductItem[]) => void) => {
  try {
    const url = `https://fakestoreapi.com/products`;
    const result = await fetch(url);
    if (!result.ok) throw new Error('Failed to fetch data');
    const jsonResult: ProductItem[] = await result.json();
    setData(jsonResult);
    console.log('Fetched Data:', jsonResult);
  } catch (error) {
    console.error('Error fetching data:', error);
    Alert.alert('Error', 'Something went wrong while fetching data.');
  }
};

const GetData: React.FC<{setData: (data: ProductItem[]) => void}> = ({
  setData,
}) => {
  useEffect(() => {
    handleData(setData);
  }, [setData]);

  return null;
};

export default GetData;
