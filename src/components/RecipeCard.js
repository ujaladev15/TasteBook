import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';

export default function RecipeCard({ recipe, onPress }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(recipe.id);

  return (
    <Pressable style={styles.card} onPress={onPress} android_ripple={{ color: '#eee' }}>
      <Image source={{ uri: recipe.image }} style={styles.image} />
      <Pressable
        style={styles.heart}
        onPress={() => toggleFavorite(recipe.id)}
        hitSlop={10}
      >
        <Ionicons
          name={favorite ? 'heart' : 'heart-outline'}
          size={22}
          color={favorite ? '#FF6B4A' : '#fff'}
        />
      </Pressable>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{recipe.title}</Text>
        <View style={styles.metaRow}>
          <Ionicons name="time-outline" size={14} color="#8A8A8A" />
          <Text style={styles.metaText}>{recipe.cookTime}</Text>
          <View style={styles.dot} />
          <Text style={styles.metaText}>{recipe.difficulty}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: '100%',
    height: 110,
    backgroundColor: '#eee',
  },
  heart: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 20,
    padding: 6,
  },
  info: {
    padding: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2B2118',
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: '#8A8A8A',
    marginLeft: 4,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#ccc',
    marginHorizontal: 6,
  },
});
