import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  SafeAreaView,
  Pressable,
} from 'react-native';
import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

export default function HomeScreen({navigation, route}) {
  const [data, setData] = useState([]);
  const {user} = route.params;

  useEffect(() => {
    fetch('http://10.0.2.2:3000/listBooks')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.log(error));
  }, [navigation]);

  const BookItem = ({title, description, genre, releaseDate, imageUrl}) => {
    return (
      <View
        style={{
          margin: 10,
          padding: 10,
          borderWidth: 1,
          borderRadius: 10,
        }}>
        <Image source={{uri: imageUrl}} width={370} height={250} />
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.title}>Title: </Text>
            <Text style={styles.content}>{title}</Text>
          </View>
          <View>
            <Text style={styles.title}>Description: </Text>
            <Text style={styles.content}>{description}</Text>
          </View>
          <View>
            <Text style={styles.title}>Genre: </Text>
            <Text style={styles.content}>{genre}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.title}>Release Date: </Text>
            <Text style={styles.content}>{releaseDate}</Text>
          </View>
        </View>
        <Pressable
          style={styles.button}
          onPress={() => {
            navigation.navigate('Order', {user: user, title: title});
          }}>
          <Text style={{color: 'white', fontSize: 14, fontWeight: 'bold'}}>
            Mượn sách
          </Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View>
      <SafeAreaView>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <BookItem
              title={item.title}
              description={item.description}
              genre={item.genre}
              releaseDate={item.releaseDate}
              imageUrl={item.imageUrl}
            />
          )}
          keyExtractor={item => item.title}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#ff914d',
    marginTop: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 16,
    textAlign: 'justify',
  },
});
