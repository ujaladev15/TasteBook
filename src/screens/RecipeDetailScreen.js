import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';

export default function RecipeDetailScreen({ route, navigation }) {
  const { recipe } = route.params;
  const { isFavorite, toggleFavorite } = useFavorites();
  const [checked, setChecked] = useState({});
  const favorite = isFavorite(recipe.id);

  const toggleCheck = (idx) => {
    setChecked((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <View style={styles.container}>
      <ScrollView bounces={false}>
        <View style={styles.imageWrap}>
          <Image source={{ uri: recipe.image }} style={styles.image} />
          <Pressable style={styles.backBtn} onPress={() => navigation.goBack()} hitSlop={10}>
            <Ionicons name="chevron-back" size={24} color="#2B2118" />
          </Pressable>
          <Pressable
            style={styles.favBtn}
            onPress={() => toggleFavorite(recipe.id)}
            hitSlop={10}
          >
            <Ionicons
              name={favorite ? 'heart' : 'heart-outline'}
              size={22}
              color={favorite ? '#FF6B4A' : '#2B2118'}
            />
          </Pressable>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{recipe.title}</Text>
          <Text style={styles.description}>{recipe.description}</Text>

          <View style={styles.statsRow}>
            <Stat icon="time-outline" label={recipe.cookTime} />
            <Stat icon="people-outline" label={`${recipe.servings} servings`} />
            <Stat icon="speedometer-outline" label={recipe.difficulty} />
          </View>

          <SectionHeader title="Ingredients" />
          {recipe.ingredients.map((ing, idx) => (
            <Pressable
              key={idx}
              style={styles.ingredientRow}
              onPress={() => toggleCheck(idx)}
            >
              <Ionicons
                name={checked[idx] ? 'checkbox' : 'square-outline'}
                size={20}
                color={checked[idx] ? '#FF6B4A' : '#B3A99C'}
              />
              <Text style={[styles.ingredientText, checked[idx] && styles.ingredientChecked]}>
                {ing}
              </Text>
            </Pressable>
          ))}

          <SectionHeader title="Steps" />
          {recipe.steps.map((step, idx) => (
            <View key={idx} style={styles.stepRow}>
              <View style={styles.stepBadge}>
                <Text style={styles.stepBadgeText}>{idx + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function Stat({ icon, label }) {
  return (
    <View style={styles.stat}>
      <Ionicons name={icon} size={16} color="#8A8A8A" />
      <Text style={styles.statText}>{label}</Text>
    </View>
  );
}

function SectionHeader({ title }) {
  return <Text style={styles.sectionHeader}>{title}</Text>;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F0' },
  imageWrap: { width: '100%', height: 260 },
  image: { width: '100%', height: '100%' },
  backBtn: {
    position: 'absolute',
    top: 44,
    left: 16,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    elevation: 3,
  },
  favBtn: {
    position: 'absolute',
    top: 44,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    elevation: 3,
  },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: '800', color: '#2B2118', marginBottom: 6 },
  description: { fontSize: 14, color: '#6B5B4E', lineHeight: 20, marginBottom: 16 },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    justifyContent: 'space-between',
    marginBottom: 20,
    elevation: 1,
  },
  stat: { flexDirection: 'row', alignItems: 'center' },
  statText: { marginLeft: 6, fontSize: 12, color: '#6B5B4E', fontWeight: '600' },
  sectionHeader: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2B2118',
    marginTop: 8,
    marginBottom: 10,
  },
  ingredientRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  ingredientText: { marginLeft: 10, fontSize: 14, color: '#2B2118', flex: 1 },
  ingredientChecked: { textDecorationLine: 'line-through', color: '#B3A99C' },
  stepRow: { flexDirection: 'row', marginBottom: 14, alignItems: 'flex-start' },
  stepBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF6B4A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 1,
  },
  stepBadgeText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  stepText: { flex: 1, fontSize: 14, color: '#2B2118', lineHeight: 20 },
});
