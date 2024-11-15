import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
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
    ApiRequest.getRequest('api/v1/categories', {}, (data, success) => {
      if (success) {
        setCategories(data);
        setErrorMessage(null);
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
          justifyContent: 'space-between',
        }}
        contentContainerStyle={{
          paddingHorizontal: 8, // Garante margem lateral
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
    flex: 1, // Faz com que os itens se distribuam igualmente na linha
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    borderRadius: 16,
    margin: 8, // Espaçamento ao redor de cada item
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10, // Adiciona espaço interno
  },
  listImg: {
    width: '100%', // A largura é proporcional ao contêiner
    height: undefined, // Permite ajuste automático da altura
    aspectRatio: 1, // Mantém proporção 1:1 (quadrada)
    resizeMode: 'contain', // Garante que a imagem seja redimensionada sem cortar
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default HomeScreen;
