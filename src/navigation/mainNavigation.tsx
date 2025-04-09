import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Product from '../Screens/product';
import ProductDetails from '../Screens/productDetails';
import WishList from '../Screens/wishList';
import {WishlistProvider} from '../component/wishListData';

export type RootStackParamList = {
  Product: undefined;
  Details: {item: any};
  WishList: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const NavigationWrapper: React.FC = () => {
  return (
    <WishlistProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Product" component={Product} />
          <Stack.Screen name="Details" component={ProductDetails} />
          <Stack.Screen name="WishList" component={WishList} />
        </Stack.Navigator>
      </NavigationContainer>
    </WishlistProvider>
  );
};

export default NavigationWrapper;
