import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

type PriceRange = {min: number; max: number} | null;

type FilterComponentProps = {
  onPriceChange: (value: PriceRange) => void;
  onRatingChange: (value: number | null) => void;
};

const priceRanges: {label: string; value: PriceRange}[] = [
  {label: 'All', value: null},
  {label: 'Under $50', value: {min: 0, max: 50}},
  {label: '$50 - $100', value: {min: 50, max: 100}},
  {label: 'Above $100', value: {min: 100, max: Infinity}},
];

const ratingOptions: {label: string; value: number | null}[] = [
  {label: 'All', value: null},
  {label: '4★ & up', value: 4},
  {label: '3★ & up', value: 3},
];

const FilterComponent: React.FC<FilterComponentProps> = ({
  onPriceChange,
  onRatingChange,
}) => {
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [selectedRating, setSelectedRating] = useState<string | null>(null);

  const handlePriceSelect = (value: PriceRange, label: string) => {
    setSelectedPrice(label);
    onPriceChange(value);
  };

  const handleRatingSelect = (value: number | null, label: string) => {
    setSelectedRating(label);
    onRatingChange(value);
  };

  const handleClearFilters = () => {
    setSelectedPrice(null);
    setSelectedRating(null);
    onPriceChange(null);
    onRatingChange(null);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShowFilters(prev => !prev)}>
        <Text style={styles.toggleText}>
          {showFilters ? 'Hide Filters ▲' : 'Show Filters ▼'}
        </Text>
      </TouchableOpacity>

      {showFilters && (
        <>
          <Text style={styles.subheading}>Price</Text>
          <View style={styles.filterRow}>
            {priceRanges.map(option => (
              <TouchableOpacity
                key={option.label}
                onPress={() => handlePriceSelect(option.value, option.label)}
                style={[
                  styles.filterButton,
                  selectedPrice === option.label && styles.selectedButton,
                ]}>
                <Text
                  style={[
                    styles.filterText,
                    selectedPrice === option.label && styles.selectedText,
                  ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.subheading}>Rating</Text>
          <View style={styles.filterRow}>
            {ratingOptions.map(option => (
              <TouchableOpacity
                key={option.label}
                onPress={() => handleRatingSelect(option.value, option.label)}
                style={[
                  styles.filterButton,
                  selectedRating === option.label && styles.selectedButton,
                ]}>
                <Text
                  style={[
                    styles.filterText,
                    selectedRating === option.label && styles.selectedText,
                  ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClearFilters}>
            <Text style={styles.clearButtonText}>Clear Filters</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default FilterComponent;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subheading: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 10,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  filterButton: {
    backgroundColor: '#eee',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 5,
  },
  selectedButton: {
    backgroundColor: '#007BFF',
  },
  filterText: {
    fontSize: 13,
    color: '#333',
  },
  selectedText: {
    color: 'white',
  },
  clearButton: {
    marginTop: 10,
    backgroundColor: '#FF3B30',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  clearButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13,
  },
});
