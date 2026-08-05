import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { FavoritesProvider } from './src/context/FavoritesContext';
import HomeScreen from './src/screens/HomeScreen';
import RecipeDetailScreen from './src/screens/RecipeDetailScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const FavStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeList" component={HomeScreen} />
      <HomeStack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
    </HomeStack.Navigator>
  );
}

function FavStackScreen() {
  return (
    <FavStack.Navigator screenOptions={{ headerShown: false }}>
      <FavStack.Screen name="FavoritesList" component={FavoritesScreen} />
      <FavStack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
    </FavStack.Navigator>
  );
}

export default function App() {
  return (
    <FavoritesProvider>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: '#FF6B4A',
            tabBarInactiveTintColor: '#B3A99C',
            tabBarStyle: { paddingBottom: 6, paddingTop: 6, height: 60 },
            tabBarIcon: ({ color, size }) => {
              const icon =
                route.name === 'Home'
                  ? 'home'
                  : route.name === 'Favorites'
                  ? 'heart'
                  : 'ellipse';
              return <Ionicons name={icon} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="Favorites" component={FavStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}
