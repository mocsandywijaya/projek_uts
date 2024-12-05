import axios from 'axios';
import { NavigationProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Alert } from 'react-native';
import { StackParamList } from './router';

type LoginScreenProps = {
  navigation: NavigationProp<StackParamList, 'GetStarted'>;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Fetch user data from API
      const response = await axios.get('https://67510e9869dc1669ec1cfadb.mockapi.io/Users');
      const user = response.data.find(
        (u: { email: string; password: string }) => u.email === email && u.password === password
      );

      if (user) {
        // Successful login
        Alert.alert('Login Berhasil', `Selamat datang, ${user.email}!`);
        navigation.navigate('Home', { userId: user.id }); // Pass userId to Home screen
      } else {
        // Login failed
        Alert.alert('Login Gagal', 'Email atau password salah');
      }
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Kesalahan', 'Terjadi kesalahan saat mencoba login.');
    }
  };

  const handleSignUpNavigation = () => {
    navigation.navigate('SignUp');
  };

  return (
    <ImageBackground
      source={require('../assets/img/Background.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Masuk</Text>
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
        <Button title="Masuk" onPress={handleLogin} />
        <Text style={styles.signUpText} onPress={handleSignUpNavigation}>
          Belum punya akun? Daftar di sini
        </Text>
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
  signUpText: {
    marginTop: 20,
    color: '#fff',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
