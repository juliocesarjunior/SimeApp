import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
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

  return (
    <View>
      <Text>Itens da Phalange:</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>{item.name}</Text> // Exibe apenas o nome do item
        )}
      />
    </View>
  );
};

export default PhalangeScreen;
