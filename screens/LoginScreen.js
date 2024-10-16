import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  async function login() {
    if (!username || !password) {
      Alert.alert('Tên đăng nhập hoặc mật khẩu không đúng');
    } else {
      try {
        const response = await fetch(`http://10.0.2.2:3000/user/${username}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          if (password === userData.password) {
            navigation.navigate('Home', {user: user});
            setUsername('');
            setPassword('');
          } else {
            Alert.alert('Mật khẩu không đúng');
          }
        } else {
          const responseText = await response.text();
          Alert.alert(responseText);
        }
      } catch (error) {
        Alert.alert('Lỗi ' + error);
      }
    }
  }

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
        alignItems: 'center',
        backgroundColor: 'white',
        height: '100%',
      }}>
      <Image
        style={{width: 250, height: 250}}
        source={require('../assets/images/polylib.png')}
      />
      <Text
        style={{
          fontSize: 25,
          fontWeight: 'bold',
          color: 'black',
          marginBottom: 70,
        }}>
        ĐĂNG NHẬP
      </Text>
      <TextInput
        placeholder="Nhập tên đăng nhập"
        style={styles.editText}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Nhập mật khẩu"
        style={[styles.editText, {marginBottom: 30}]}
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <Pressable style={styles.button} onPress={login}>
        <Text style={{color: 'white', fontSize: 14, fontWeight: 'bold'}}>
          Đăng nhập
        </Text>
      </Pressable>
      <View style={{flexDirection: 'row', gap: 5, marginTop: 30}}>
        <Text>Chưa có tài khoản?</Text>
        <Pressable onPress={() => navigation.navigate('Register')}>
          <Text style={{fontWeight: 'bold', color: '#ff914d'}}>Đăng ký</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  editText: {
    width: '100%',
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#ff914d',
    marginBottom: 15,
    alignItems: 'center',
  },
});
