import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RECIPES, CATEGORIES } from '../data/recipes';
import RecipeCard from '../components/RecipeCard';
import CategoryFilter from '../components/CategoryFilter';

export default function HomeScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = useMemo(() => {
    return RECIPES.filter((r) => {
      const matchesCategory = category === 'All' || r.category === category;
      const matchesQuery = r.title.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>What are we cooking today?</Text>
      </View>

      <View style={styles.searchBar}>
        <Ionicons name="search" size={18} color="#8A8A8A" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search recipes..."
          placeholderTextColor="#B3A99C"
          value={query}
          onChangeText={setQuery}
        />
      </View>

      <View style={styles.filterWrap}>
        <CategoryFilter categories={CATEGORIES} selected={category} onSelect={setCategory} />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.column}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>No recipes match your search.</Text>
        }
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F0' },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
  greeting: { fontSize: 22, fontWeight: '800', color: '#2B2118' },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 12,
    elevation: 1,
  },
  searchInput: { marginLeft: 8, flex: 1, fontSize: 14, color: '#2B2118' },
  filterWrap: { paddingLeft: 20, marginBottom: 8 },
  list: { paddingHorizontal: 20, paddingBottom: 20 },
  column: { justifyContent: 'space-between' },
  empty: { textAlign: 'center', marginTop: 40, color: '#8A8A8A' },
});
