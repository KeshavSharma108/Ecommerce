import React, {useState} from 'react';
import {FlatList, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import GetData from "../api's/getData";
import CardData from '../component/cardData';
import {useNavigation} from '@react-navigation/native';
import CustomSearchBar from '../component/searchBar';
import FilterComponent from '../component/filter';

const Product = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState(null);
  const [ratingFilter, setRatingFilter] = useState(null);

  const {navigate} = useNavigation();

  const suggestions =
    query.length > 0
      ? data
          .filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase()),
          )
          .slice(0, 5)
      : [];

  // Apply all filters: title, price, and rating
  const filteredData = data.filter(item => {
    const matchTitle = item.title.toLowerCase().includes(query.toLowerCase());
    const matchPrice =
      !priceFilter ||
      (item.price >= priceFilter.min && item.price <= priceFilter.max);
    const matchRating = !ratingFilter || item.rating?.rate >= ratingFilter;

    return matchTitle && matchPrice && matchRating;
  });

  const renderItem = ({item}) => (
    <CardData
      title={item.title}
      price={item.price}
      uri={item.image}
      onPress={() => navigate('Details', {item})}
    />
  );

  const handleSuggestionPress = suggestion => {
    setQuery(suggestion.title);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.productHeader}>Product Items</Text>

      <View style={styles.topHeader}>
        <Text style={styles.heartIcon} onPress={() => navigate('WishList')}>
          ❤️
        </Text>
        <CustomSearchBar value={query} onChangeText={setQuery} />
      </View>

      <GetData setData={setData} />
      <FilterComponent
        onPriceChange={setPriceFilter}
        onRatingChange={setRatingFilter}
      />

      {suggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          {suggestions.map(item => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleSuggestionPress(item)}
              style={styles.suggestionItem}>
              <Text style={styles.suggestionText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <Text style={styles.productHeader}>Product Items</Text>

      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.empty}>No products found.</Text>
        }
        contentContainerStyle={filteredData.length === 0 && styles.centered}
      />
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 10,
    padding: 10,
  },
  suggestionsContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginHorizontal: 10,
    marginBottom: 8,
    elevation: 2,
    zIndex: 1,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
  },
  suggestionText: {
    fontSize: 14,
    color: '#333',
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
  centered: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },

  heartIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  productHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 10,
    color: '#333',
  },
});
