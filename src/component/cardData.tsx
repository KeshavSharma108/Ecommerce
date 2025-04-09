import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useWishlist} from './wishListData';

const CardData = ({
  uri,
  title,
  price,
  onPress,
  description,
  wishlistIcon,
  item,
}) => {
  const {addToWishlist, removeFromWishlist, isInWishlist} = useWishlist();

  const toggleHeart = () => {
    if (isInWishlist(item)) {
      removeFromWishlist(item);
    } else {
      addToWishlist(item);
    }
  };

  const liked = isInWishlist(item);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.header}>
        {wishlistIcon && (
          <TouchableOpacity
            onPress={toggleHeart}
            style={styles.avatarPlaceholder}>
            <Text style={styles.heart}>{liked ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>

      <Image source={{uri: uri}} style={styles.image} />

      <View style={styles.details}>
        <Text style={styles.label}>Price:</Text>
        <Text style={styles.value}>₹{price}</Text>

        {description ? (
          <>
            <Text style={styles.label}>Description:</Text>
            <Text style={styles.description}>{description}</Text>
          </>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default CardData;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 4},
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarPlaceholder: {
    marginRight: 10,

    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 12,
  },
  details: {
    marginTop: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
  },
  value: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2e7d32',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  heart: {
    fontSize: 20,
  },
});
