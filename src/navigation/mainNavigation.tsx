import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import product from '../Screens/product';
import productDetails from '../Screens/productDetails';
import wishList from '../Screens/wishList';
import {WishlistProvider} from '../component/wishListData';

const Stack = createNativeStackNavigator();

export default function NavigationWrapper() {
  return (
    <WishlistProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Product" component={product} />
          <Stack.Screen name="Details" component={productDetails} />
          <Stack.Screen name="WishList" component={wishList} />
        </Stack.Navigator>
      </NavigationContainer>
    </WishlistProvider>
  );
}
