import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { NavigationStackProp } from 'react-navigation-stack';

interface Item {
  id: number;
  name: string;
  status: string;
  order: number;
  image: {
    url: string;
  };
}

interface Props {
  navigation: NavigationStackProp;
}

const PhalangeScreen: React.FC<Props> = ({ navigation }) => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    axios.get('http://10.86.46.56:3000/api/v1/phalanges') // Atualize a URL da API conforme necessário
      .then(response => setItems(response.data)) // Supondo que a resposta já é um array
      .catch(error => console.log(error));
  }, []);

  const showName = (name: string) => {
    Alert.alert('Nome Selecionado', name);
  };

  return (
    <View style={styles.container}>
    <FlatList
      data={items}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => showName(item.name)}>
          <Text style={styles.itemText}>{item.name}</Text>
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.listContainer}
    />
  </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  item: {
    backgroundColor: '#493bd0',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  itemText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default PhalangeScreen;
