import { NavigationProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, ImageBackground } from 'react-native';
import { StackParamList } from './router';

type LoginScreenProps = {
  navigation: NavigationProp<StackParamList, 'GetStarted'>;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Lakukan logika autentikasi di sini
    navigation.navigate('Home'); // Jika login berhasil, navigasi ke Home
  };

  const handleSignUpNavigation = () => {
    navigation.navigate('SignUp'); // Navigasi ke halaman SignUp
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
        <Button 
          title="Masuk"
          onPress={handleLogin}
        />
        <TouchableOpacity onPress={handleSignUpNavigation}>
          <Text style={styles.signUpText}>Belum punya akun? Daftar di sini</Text>
        </TouchableOpacity>
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
