import React, { useEffect, useState } from 'react';
import { View, Button, FlatList, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import ApiRequest from '../service/ApiRequest';
import { API_BASE_URL } from '../service/apiConfig';

interface Category {
  id: string;
  name: string;
  route: string;
  file: {
    url: string;
  };
}

interface Props {
  navigation: NavigationStackProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // Usando ApiRequest para fazer a requisição
    ApiRequest.getRequest('api/v1/categories', {}, (data, success) => {
      if (success) {
        console.log(data)
        setCategories(data); // Atualiza o estado com os dados recebidos
      } else {
        console.log('Erro ao buscar categorias:', data);
      }
    });
  }, []);

  return (
    <View>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate(item.route)}
            style={styles.listMenu}
          >
            <Image
              source={{ uri: `${API_BASE_URL}${item.file.url}` }}
              style={styles.listImg}
            />
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
        showsVerticalScrollIndicator={false}
      />
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Button
            title={item.name}
            onPress={() => navigation.navigate(item.route)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listMenu: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    borderRadius: 16,
    marginVertical: 8,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  listImg: { 
    width: 150, 
    height: 150, 
    resizeMode: "center" 
  },
});

export default HomeScreen;
