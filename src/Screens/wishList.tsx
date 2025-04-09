import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useWishlist} from '../component/wishListData';

interface WishlistItem {
  id: number;
  title: string;
  image: string;
  price: number;
}

const WishlistScreen: React.FC = () => {
  const {wishlist, removeFromWishlist} = useWishlist();
  const navigation = useNavigation();

  const renderItem = ({item}: {item: WishlistItem}) => (
    <View style={styles.card}>
      <Image source={{uri: item.image}} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>₹{item.price}</Text>

      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeFromWishlist(item)}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.header}>My Wishlist</Text>

      {wishlist.length === 0 ? (
        <Text style={styles.empty}>No items in wishlist.</Text>
      ) : (
        <FlatList
          data={wishlist}
          keyExtractor={(item: WishlistItem) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default WishlistScreen;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 10, backgroundColor: '#fff'},
  backButton: {
    marginBottom: 10,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  backText: {
    fontSize: 16,
    color: '#333',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
  },
  empty: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
  },
  card: {
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 5,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  price: {
    fontSize: 15,
    color: '#2e7d32',
    marginBottom: 8,
  },
  removeButton: {
    backgroundColor: '#ff5252',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginTop: 6,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
