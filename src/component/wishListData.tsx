import React, {createContext, useContext, useState} from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({children}) => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = item => {
    setWishlist(prev =>
      prev.find(i => i?.id === item?.id) ? prev : [...prev, item],
    );
  };

  const removeFromWishlist = item => {
    setWishlist(prev => prev.filter(i => i.id !== item.id));
  };

  const isInWishlist = item => wishlist.some(i => i?.id === item?.id);

  return (
    <WishlistContext.Provider
      value={{wishlist, addToWishlist, removeFromWishlist, isInWishlist}}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
