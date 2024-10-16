import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [fullname, setFullname] = useState('');
  const [user, setNewUser] = useState(null);

  async function register() {
    if (!username || !password || !fullname || !password2) {
      Alert.alert('Thông tin không hợp lệ');
    } else if (password != password2) {
      Alert.alert('Mật khẩu không khớp');
    } else {
      const newUser = {
        username,
        password,
        fullname,
      };

      try {
        const response = await fetch('http://10.0.2.2:3000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        });

        const responseText = await response.text();
        Alert.alert(responseText);
        if (responseText == 'Tạo tài khoản thành công!') {
          setNewUser(newUser);
          navigation.navigate('Home', {user: user});
          setFullname('');
          setPassword('');
          setPassword2('');
          setUsername('');
        }
      } catch (error) {
        console.error('Lỗi ' + error);
        Alert.alert('Lỗi ' + error);
      }
    }
  }

  return (
    <View
      style={{
        padding: 20,
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <Text
        style={{
          fontSize: 25,
          fontWeight: 'bold',
          color: 'black',
          marginBottom: 70,
        }}>
        ĐĂNG KÝ
      </Text>
      <TextInput
        placeholder="Nhập tên đăng nhập"
        style={styles.editText}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Nhập mật khẩu"
        style={styles.editText}
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        placeholder="Nhập lại mật khẩu"
        style={styles.editText}
        secureTextEntry={true}
        value={password2}
        onChangeText={setPassword2}
      />
      <TextInput
        placeholder="Nhập họ tên"
        style={[styles.editText, {marginBottom: 30}]}
        value={fullname}
        onChangeText={setFullname}
      />
      <Pressable style={styles.button} onPress={register}>
        <Text style={{color: 'white', fontSize: 14, fontWeight: 'bold'}}>
          Tạo tài khoản
        </Text>
      </Pressable>
      <View style={{flexDirection: 'row', gap: 5, marginTop: 30}}>
        <Text>Đã có tài khoản rồi?</Text>
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={{fontWeight: 'bold', color: '#ff914d'}}>Đăng nhập</Text>
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
