import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RECIPES } from '../data/recipes';
import RecipeCard from '../components/RecipeCard';
import { useFavorites } from '../context/FavoritesContext';

export default function FavoritesScreen({ navigation }) {
  const { favoriteIds } = useFavorites();
  const favorites = RECIPES.filter((r) => favoriteIds.includes(r.id));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Favorites</Text>
      </View>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.column}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="heart-outline" size={40} color="#D8CBBB" />
            <Text style={styles.emptyText}>No favorites yet.{'\n'}Tap the heart on any recipe to save it here.</Text>
          </View>
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
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  title: { fontSize: 22, fontWeight: '800', color: '#2B2118' },
  list: { paddingHorizontal: 20, paddingBottom: 20, flexGrow: 1 },
  column: { justifyContent: 'space-between' },
  empty: { alignItems: 'center', marginTop: 80, paddingHorizontal: 40 },
  emptyText: { textAlign: 'center', color: '#8A8A8A', marginTop: 12, lineHeight: 20 },
});
