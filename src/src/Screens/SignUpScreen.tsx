import { NavigationProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Alert } from 'react-native';
import axios from 'axios';
import { StackParamList } from './router';

type SignUpScreenProps = {
  navigation: NavigationProp<StackParamList, 'SignUp'>;
};

const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await axios.post('https://67510e9869dc1669ec1cfadb.mockapi.io/Register', {
        email,
        password,
      });

      if (response.status === 201) {
        Alert.alert('Sukses', 'Registrasi berhasil!');
        navigation.navigate('GetStarted'); // Navigasi ke Home setelah berhasil registrasi
      }
    } catch (error) {
      console.error('SignUp Error:', error);
      Alert.alert('Kesalahan', 'Terjadi kesalahan saat registrasi.');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/img/Background.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Daftar</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Daftar" onPress={handleSignUp} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    color: '#000',
  },
});

export default SignUpScreen;
