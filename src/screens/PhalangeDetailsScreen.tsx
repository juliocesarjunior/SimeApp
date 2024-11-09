import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import ApiRequest from '../service/ApiRequest';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import HTMLView from 'react-native-htmlview';

type RootStackParamList = {
  PhalangeDetails: { id: number };
};

type PhalangeDetailsScreenRouteProp = RouteProp<RootStackParamList, 'PhalangeDetails'>;
type PhalangeDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PhalangeDetails'>;

type Props = {
  route: PhalangeDetailsScreenRouteProp;
  navigation: PhalangeDetailsScreenNavigationProp;
};

interface ItemDetails {
  name: string;
  description: string;
  image: {
    url: string;
  };
}

const PhalangeDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { id } = route.params;
  const [itemDetails, setItemDetails] = useState<ItemDetails | null>(null);

  useEffect(() => {
    // Busca os detalhes do item com base no ID
    ApiRequest.getRequest(`api/v1/phalanges/${id}`, {}, (data, success) => {
      if (success) {
        setItemDetails(data);
      } else {
        console.log('Erro ao buscar detalhes da falange:', data);
      }
    });
  }, [id]);

  if (!itemDetails) {
    return <Text>Carregando...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>{itemDetails.name}</Text>
      <Image source={{ uri: `http://192.168.18.6:3000${itemDetails.image.url}` }} style={styles.image} />
      <HTMLView value={itemDetails.description} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // Garante que o conteúdo ocupe a tela inteira
    alignItems: 'center', // Aplica alinhamento no conteúdo do ScrollView
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginVertical: 20,
  },
});

export default PhalangeDetailsScreen;
