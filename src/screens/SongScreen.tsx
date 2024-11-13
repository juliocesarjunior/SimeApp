import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import ApiRequest from '../service/ApiRequest';
import { API_BASE_URL } from '../service/apiConfig';
import { NavigationStackProp } from 'react-navigation-stack';

interface Song {
  id: string;
  name: string;
  archives: Archive[];
}

interface Archive {
  id: string;
  name: string;
  file: string;
}

interface Props {
  navigation: NavigationStackProp;
}

const SongScreen: React.FC<Props> = ({ navigation }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [activeSections, setActiveSections] = useState<number[]>([]);

  useEffect(() => {
    // Usando ApiRequest para fazer a requisição
    ApiRequest.getRequest('api/v1/songs', {}, (data, success) => {
      if (success) {
        setSongs(data);
      } else {
        console.log('Erro ao buscar categorias:', data);
      }
    });
  }, []);

  const handleLibraryPress = (fileUrl: string) => {
    navigation.navigate('PdfViewer', { pdfUrl: fileUrl });
  };

  const renderHeader = (section: Song, _: any, isActive: boolean) => {
    return (
      <View style={[styles.header, isActive && styles.headerActive]}>
        <Text style={styles.headerText}>{section.name}</Text>
      </View>
    );
  };

  const renderContent = (section: Song) => {
    return (
      <View style={styles.content}>
        {section.archives.length > 0 ? (
          section.archives.map((archive) => (
            <TouchableOpacity
              key={archive.id}
              style={styles.item}
              onPress={() => handleLibraryPress(`${API_BASE_URL}${archive.file}`)}
            >
              <Text style={styles.itemText}>{archive.name}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noContentText}>Nenhum arquivo disponível.</Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Accordion
          sections={songs}
          activeSections={activeSections}
          renderHeader={renderHeader}
          renderContent={renderContent}
          onChange={setActiveSections}
          underlayColor="#f0f0f0"
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollViewContainer: {
    paddingBottom: 20, // Para garantir que o conteúdo não fique cortado ao final
  },
  header: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerActive: {
    backgroundColor: '#dcdcdc',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  item: {
    marginBottom: 8,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  noContentText: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default SongScreen;
