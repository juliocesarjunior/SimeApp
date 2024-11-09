import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { NavigationStackProp } from 'react-navigation-stack';
import ApiRequest from '../service/ApiRequest';

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
  const [phalanges, setPhalanges] = useState<Item[]>([]);

  useEffect(() => {
    // Usando ApiRequest para fazer a requisição
    ApiRequest.getRequest('api/v1/phalanges', {}, (data, success) => {
      if (success) {
        setPhalanges(data);
      } else {
        console.log('Erro ao buscar categorias:', data);
      }
    });
  }, []);

  const navigateToDetails = (id: number) => {
    navigation.navigate('PhalangeDetails', { id });
  };

  return (
    <View style={styles.container}>
    <FlatList
      data={phalanges}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => navigateToDetails(item.id)}>
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
