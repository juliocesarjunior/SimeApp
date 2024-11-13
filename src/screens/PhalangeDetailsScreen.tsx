import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import ApiRequest from '../service/ApiRequest';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import HTMLView from 'react-native-htmlview';
import { API_BASE_URL } from '../service/apiConfig';

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

const { width, height } = Dimensions.get('window');

const PhalangeDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { id } = route.params;
  const [itemDetails, setItemDetails] = useState<ItemDetails | null>(null);

  useEffect(() => {
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
      <Image
        source={{ uri: `${API_BASE_URL}${itemDetails.image.url}` }}
        style={[styles.image, { width: width * 0.8, height: height * 0.4 }]}
      />
      <HTMLView value={itemDetails.description} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  image: {
    borderRadius: 10,
    marginVertical: 20,
    resizeMode: 'contain',
  },
});

export default PhalangeDetailsScreen;
