import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'testuser' && password === 'password') {
      Alert.alert('Login successful', 'You have successfully logged in!');
      navigation.navigate('Posts');
    } else {
      Alert.alert('Login failed', 'Invalid username or password!');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Username" onChangeText={setUsername} style={styles.input} />
      <TextInput placeholder="Password" onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: { marginVertical: 8, borderBottomWidth: 1 }
});

export default LoginScreen;
