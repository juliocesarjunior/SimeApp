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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Usando ApiRequest para fazer a requisição
    ApiRequest.getRequest('api/v1/categories', {}, (data, success) => {
      if (success) {
        setCategories(data); // Atualiza o estado com os dados recebidos
        setErrorMessage(null); // Limpa a mensagem de erro, caso a requisição seja bem-sucedida
      } else {
        console.log('Erro ao buscar categorias:', data);
        setErrorMessage(data.message || 'Erro ao buscar categorias.'); 
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
      
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
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
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
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default HomeScreen;
