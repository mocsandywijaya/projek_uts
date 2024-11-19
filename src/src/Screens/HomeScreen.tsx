import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, TextInput, ImageBackground } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from './router';

type HomeScreenNavigationProp = NativeStackNavigationProp<StackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const recipes = [
  {
    id: '1',
    title: 'ayam-goreng',
    image: require('../assets/img/ayam-goreng.png'),
    ingredients: ['1 kg ayam', '3 siung bawang putih', 'Garam secukupnya'],
    instructions: ['Bersihkan ayam dan baluri dengan bumbu.', 'Panaskan minyak dan goreng ayam hingga matang.'],
  },
  {
    id: '2',
    title: 'bakso',
    image: require('../assets/img/bakso.png'),
    ingredients: ['250 gr daging sapi giling', '2 siung bawang putih', 'Garam dan lada secukupnya'],
    instructions: ['Campur daging dengan bumbu, bentuk menjadi bulatan.', 'Rebus dalam air mendidih hingga mengapung.'],
  },
  {
    id: '3',
    title: 'ayam-bakar',
    image: require('../assets/img/ayam-bakar.png'),
    ingredients: ['1 kg ayam', '3 sdm kecap manis', 'Garam dan lada secukupnya'],
    instructions: ['Bersihkan ayam dan baluri dengan kecap dan bumbu.', 'Panggang ayam hingga matang dan harum.'],
  },
  {
    id: '4',
    title: 'sambal',
    image: require('../assets/img/sambal.png'),
    ingredients: ['10 buah cabai merah', '2 siung bawang putih', 'Garam secukupnya'],
    instructions: ['Haluskan cabai dan bawang.', 'Tumis dengan sedikit minyak hingga harum.'],
  },
  {
    id: '5',
    title: 'juice alpukat',
    image: require('../assets/img/juice_alpukat.png'),
    ingredients: ['2 buah alpukat', '2 sdm susu kental manis', 'Es batu secukupnya'],
    instructions: ['Haluskan alpukat dengan susu dan es batu.', 'Sajikan dalam gelas.'],
  },
  {
    id: '6',
    title: 'es-jeruk',
    image: require('../assets/img/es_jeruk.jpg'),
    ingredients: ['3 buah jeruk', 'Es batu', 'Gula secukupnya'],
    instructions: ['Peras jeruk, tambahkan gula dan es batu.', 'Aduk dan sajikan.'],
  },
  {
    id: '7',
    title: 'nasi-goreng',
    image: require('../assets/img/nasi_goreng.png'),
    ingredients: ['1 porsi nasi', '2 siung bawang putih', 'Kecap dan garam secukupnya'],
    instructions: ['Tumis bawang putih hingga harum.', 'Masukkan nasi dan bumbu, aduk hingga merata.'],
  },
];

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredRecipes(recipes); // Tampilkan semua resep jika pencarian kosong
    } else {
      const filtered = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredRecipes(filtered);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/img/Background1.jpg')} // Ganti dengan path gambar latar belakang
      style={styles.background}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Resep Terbaru</Text>
      </View>

      {/* Form Pencarian */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search for recipes..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {/* Daftar Resep berdasarkan Pencarian */}
      <FlatList
        data={filteredRecipes}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('RecipeDetail', {
                title: item.title,
                image: item.image,
                ingredients: item.ingredients,
                instructions: item.instructions,
              })
            }
          >
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.noResultsText}>No recipes found</Text>}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Menyesuaikan ukuran gambar
  },
  container: { flex: 1, padding: 15 },
  header: {
    backgroundColor: '#E91E63', // Warna pink
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF', // Warna teks putih
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: { marginBottom: 25, paddingHorizontal: 15 },
  input: {
    height: 35,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },
  card: { flex: 1, margin: 5, backgroundColor: '#FFFFFF', borderRadius: 10, padding: 5 },
  image: { width: '100%', height: 100, borderRadius: 10 },
  title: { textAlign: 'center', marginTop: 10 },
  noResultsText: { textAlign: 'center', marginTop: 20, fontStyle: 'italic' },
});

export default HomeScreen;
