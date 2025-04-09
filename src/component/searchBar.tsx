import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  ActivityIndicator,
  TextInputProps,
} from 'react-native';

type CustomSearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  debounceTime?: number;
};

const CustomSearchBar: React.FC<CustomSearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search...',
  debounceTime = 500,
}) => {
  const [inputValue, setInputValue] = useState<string>(value);
  const [loading, setLoading] = useState<boolean>(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    setLoading(true);

    debounceRef.current = setTimeout(() => {
      onChangeText(inputValue);
      setLoading(false);
    }, debounceTime);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [inputValue, debounceTime]);

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🔍</Text>
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={setInputValue}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
      />
      {loading && (
        <ActivityIndicator size="small" color="#888" style={styles.loader} />
      )}
    </View>
  );
};

export default CustomSearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    width: '80%',
    margin: 10,
  },
  icon: {
    marginRight: 8,
    fontSize: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  loader: {
    marginLeft: 10,
  },
});
