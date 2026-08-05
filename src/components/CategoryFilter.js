import React from 'react';
import { ScrollView, Text, Pressable, StyleSheet } from 'react-native';

export default function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {categories.map((cat) => {
        const active = cat === selected;
        return (
          <Pressable
            key={cat}
            onPress={() => onSelect(cat)}
            style={[styles.chip, active && styles.chipActive]}
          >
            <Text style={[styles.chipText, active && styles.chipTextActive]}>{cat}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: 4,
    paddingRight: 12,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1EAE3',
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: '#FF6B4A',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B5B4E',
  },
  chipTextActive: {
    color: '#fff',
  },
});
