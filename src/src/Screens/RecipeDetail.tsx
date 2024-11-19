// src/screens/RecipeDetail.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackParamList } from './router'; // Impor dari router.ts

type RecipeDetailRouteProp = RouteProp<StackParamList, 'RecipeDetail'>;

type Props = {
  route: RecipeDetailRouteProp;
};

const RecipeDetail: React.FC<Props> = ({ route }) => {
  const { title, image, ingredients, instructions } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      
      <Text style={styles.sectionTitle}>Bahan-Bahan</Text>
      {ingredients.map((ingredient, index) => (
        <Text key={index} style={styles.content}>- {ingredient}</Text>
      ))}
      
      <Text style={styles.sectionTitle}>Cara Membuat</Text>
      {instructions.map((instruction, index) => (
        <Text key={index} style={styles.content}>{index + 1}. {instruction}</Text>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10 },
  image: { width: '100%', height: 200, borderRadius: 10 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
  content: { fontSize: 16, lineHeight: 24 },
});

export default RecipeDetail;