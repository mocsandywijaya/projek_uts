import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  FlatList, 
  TextInput, 
  ImageBackground, 
  Dimensions, 
  Button, 
  Alert, 
  Modal 
} from 'react-native';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from './router';

type Props = NativeStackScreenProps<StackParamList, 'Home'>;

const { width } = Dimensions.get('window');

// Daftar resep untuk ditampilkan di HomeScreen
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
  // Tambahkan resep lainnya...
];

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [fetchedRecipes, setFetchedRecipes] = useState<any[]>(recipes);
  const [filteredRecipes, setFilteredRecipes] = useState<any[]>(recipes); // Untuk menampung hasil pencarian
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [addRecipeModalVisible, setAddRecipeModalVisible] = useState(false);
  const [newRecipe, setNewRecipe] = useState<any>({
    title: '',
    image: '',
    ingredients: [],
    instructions: [],
  });

  // Fungsi untuk mencari resep berdasarkan query
  const searchRecipe = (query: string) => {
    setSearchQuery(query);
    if (!query) {
      // Jika query kosong, tampilkan semua resep
      setFilteredRecipes(fetchedRecipes);
      return;
    }

    // Filter resep berdasarkan query pencarian (case-insensitive)
    const results = fetchedRecipes.filter(recipe =>
      recipe.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRecipes(results);
  };

  // Fungsi untuk mengedit resep
  const handleEditRecipe = async () => {
    if (!selectedRecipe) return;

    try {
      await axios.put(
        `https://67511a3e69dc1669ec1d19e8.mockapi.io/Resep/${selectedRecipe.id}`,
        selectedRecipe
      );
      setFetchedRecipes((prev) => prev.map((recipe) =>
        recipe.id === selectedRecipe.id ? selectedRecipe : recipe
      ));
      setFilteredRecipes((prev) => prev.map((recipe) =>
        recipe.id === selectedRecipe.id ? selectedRecipe : recipe
      ));
      Alert.alert('Berhasil', 'Resep berhasil diperbarui.');
      setModalVisible(false);
    } catch (error) {
      console.error('Error editing recipe:', error);
      Alert.alert('Kesalahan', 'Gagal memperbarui resep.');
    }
  };

  // Fungsi untuk menambahkan resep baru
  const handleAddRecipe = async () => {
    if (!newRecipe.title || !newRecipe.ingredients.length || !newRecipe.instructions.length) {
      Alert.alert('Error', 'Harap isi semua kolom dengan benar');
      return;
    }
  
    try {
      const response = await axios.post('https://67511a3e69dc1669ec1d19e8.mockapi.io/Resep', newRecipe);
      const addedRecipe = response.data;
  
      console.log('Resep berhasil ditambahkan:', addedRecipe);
  
      setFetchedRecipes((prev) => [...prev, addedRecipe]);
      setFilteredRecipes((prev) => [...prev, addedRecipe]);
      setNewRecipe({ title: '', image: '', ingredients: [], instructions: [] });
      setAddRecipeModalVisible(false);
      Alert.alert('Berhasil', 'Resep berhasil ditambahkan');
    } catch (error) {
      console.error('Error adding recipe:', error);
      Alert.alert('Kesalahan', 'Gagal menambahkan resep');
    }
  };
  

  // Fungsi untuk menghapus resep
  const deleteRecipe = async (id: string) => {
    const recipeToDelete = fetchedRecipes.find(recipe => recipe.id === id);
    if (recipeToDelete?.isFixed) {
      Alert.alert('Resep ini tidak dapat dihapus.');
      return;
    }

    try {
      await axios.delete(`https://67511a3e69dc1669ec1d19e8.mockapi.io/Resep/${id}`);
      setFetchedRecipes((prev) => prev.filter(recipe => recipe.id !== id));
      setFilteredRecipes((prev) => prev.filter(recipe => recipe.id !== id));
    } catch (error) {
      console.error('Error deleting recipe:', error);
      Alert.alert('Kesalahan', 'Gagal menghapus resep');
    }
  };

  // Fungsi untuk membuka modal edit resep
  const handleOpenEditModal = (recipe: any) => {
    setSelectedRecipe(recipe);
    setModalVisible(true);
  };

  useEffect(() => {
    setFilteredRecipes(fetchedRecipes);
  }, [fetchedRecipes]);

  return (
    <ImageBackground
      source={require('../assets/img/Background1.jpg')}
      style={styles.background}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Resep</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Cari resep..."
          value={searchQuery}
          onChangeText={searchRecipe}
        />
      </View>

      <FlatList
  data={filteredRecipes}
  keyExtractor={(item) => item.id.toString()}
  numColumns={2}
  renderItem={({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('RecipeDetail', {
            title: item.title,
            image: typeof item.image === 'string' ? item.image : '', // Pastikan `image` string
            ingredients: item.ingredients || [], // Default ke array kosong jika undefined
            instructions: item.instructions || [], // Default ke array kosong jika undefined
          })
        }
      >
        <Image
          source={typeof item.image === 'string' ? { uri: item.image } : item.image}
          style={styles.image}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{item.title}</Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => handleOpenEditModal(item)}
      >
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteRecipe(item.id)}
      >
        <Text style={styles.deleteButtonText}>Hapus</Text>
      </TouchableOpacity>
    </View>
  )}
  ListEmptyComponent={
    <View style={{ alignItems: 'center', marginTop: 20 }}>
      <Text style={styles.noResultsText}>Resep tidak ditemukan</Text>
    </View>
  }
/>

      {/* Modal untuk edit resep */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Resep</Text>
            <TextInput
              style={styles.input}
              placeholder="Judul Resep"
              value={selectedRecipe?.title}
              onChangeText={(text) => setSelectedRecipe({ ...selectedRecipe, title: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Bahan"
              value={selectedRecipe?.ingredients.join(', ')}
              onChangeText={(text) => setSelectedRecipe({
                ...selectedRecipe, ingredients: text.split(', '),
              })}
            />
            <TextInput
              style={styles.input}
              placeholder="Instruksi"
              value={selectedRecipe?.instructions.join(', ')}
              onChangeText={(text) => setSelectedRecipe({
                ...selectedRecipe, instructions: text.split(', '),
              })}
            />
            <Button title="Simpan" onPress={handleEditRecipe} />
            <Button title="Batal" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* Modal untuk tambah resep */}
<Modal
  visible={addRecipeModalVisible}
  animationType="slide"
  onRequestClose={() => setAddRecipeModalVisible(false)}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Tambah Resep</Text>
      <TextInput
        style={styles.input}
        placeholder="Judul Resep"
        value={newRecipe.title}
        onChangeText={(text) => setNewRecipe({ ...newRecipe, title: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Bahan (pisahkan dengan koma)"
        value={newRecipe.ingredients.join(', ')}
        onChangeText={(text) =>
          setNewRecipe({ ...newRecipe, ingredients: text.split(', ') })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Instruksi (pisahkan dengan koma)"
        value={newRecipe.instructions.join(', ')}
        onChangeText={(text) =>
          setNewRecipe({ ...newRecipe, instructions: text.split(', ') })
        }
      />
      <Button title="Tambahkan" onPress={handleAddRecipe} />
      <Button
        title="Batal"
        color="red"
        onPress={() => setAddRecipeModalVisible(false)}
      />
    </View>
  </View>
</Modal>


      {/* Tombol tambah resep */}
      <Button
        title="Tambah Resep"
        onPress={() => setAddRecipeModalVisible(true)}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-start',
  },
  header: {
    backgroundColor: '#E91E63', // Warna pink
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignItems: 'center',
    borderBottomWidth: 1, // Garis pemisah bawah header
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    height: 40,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  card: {
    width: width / 2 - 30,
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  editButton: {
    marginTop: 10,
    backgroundColor: '#4CAF50',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButton: {
    marginTop: 5,
    backgroundColor: '#F44336',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
  },
  deleteButtonText: {
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    width: '80%',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noResultsText: {
    fontSize: 18,
    color: '#999',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    margin: 20,
    borderRadius: 5,
    alignItems: 'center', // Menambahkan agar tombol terpusat
    justifyContent: 'center', // Menambahkan agar teks dalam tombol terpusat
  },
});


export default HomeScreen;
