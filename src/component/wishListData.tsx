import React, {createContext, useContext, useState, ReactNode, FC} from 'react';

export type WishlistItem = {
  id: number | string;
  [key: string]: any;
};

type WishlistContextType = {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (item: WishlistItem) => void;
  isInWishlist: (item: WishlistItem) => boolean;
};

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined,
);

type WishlistProviderProps = {
  children: ReactNode;
};

export const WishlistProvider: FC<WishlistProviderProps> = ({children}) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  const addToWishlist = (item: WishlistItem) => {
    setWishlist(prev =>
      prev.find(i => i?.id === item?.id) ? prev : [...prev, item],
    );
  };

  const removeFromWishlist = (item: WishlistItem) => {
    setWishlist(prev => prev.filter(i => i.id !== item.id));
  };

  const isInWishlist = (item: WishlistItem) =>
    wishlist.some(i => i?.id === item?.id);

  return (
    <WishlistContext.Provider
      value={{wishlist, addToWishlist, removeFromWishlist, isInWishlist}}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
