import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import ApiRequest from '../service/ApiRequest';
import { NavigationStackProp } from 'react-navigation-stack';
import { API_BASE_URL } from '../service/apiConfig';

interface Item {
  id: number;
  year: string;
  status: string;
  file: {
    url: string;
  };
}

interface Props {
  navigation: NavigationStackProp;
}

const CalendarScreen: React.FC<Props> = ({ navigation }) => {
  const [calendars, setCalendars] = useState<Item[]>([]);

  useEffect(() => {
    // Usando ApiRequest para fazer a requisição
    ApiRequest.getRequest('api/v1/calendars', {}, (data, success) => {
      if (success) {
        setCalendars(data);
      } else {
        console.log('Erro ao buscar categorias:', data);
      }
    });
  }, []);

  const handleLibraryPress = (fileUrl: string) => {
    navigation.navigate('PdfViewer', { pdfUrl: fileUrl });
  };

  return (
    <View style={styles.container}>
    <FlatList
      data={calendars}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => handleLibraryPress(`${API_BASE_URL}${item.file.url}`)}>
          <Text style={styles.itemText}>{item.year}</Text>
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

export default CalendarScreen;
