import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Button } from 'react-native';
import axios from 'axios';
import { NavigationStackProp } from 'react-navigation-stack';

interface Library {
  id: number;
  name: string;
  description: string;
  status: string;
  file: {
    url: string;
  };
}

interface Meta {
  current_page: number;
  next_page: number | null;
  prev_page: number | null;
  total_pages: number;
  total_count: number;
}

interface Props {
  navigation: NavigationStackProp;
}

const LibraryScreen: React.FC<Props> = ({ navigation }) => {
  const [libraries, setLibraries] = useState<Library[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredLibraries, setFilteredLibraries] = useState<Library[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    fetchLibraries(currentPage);
  }, [currentPage]);

  const fetchLibraries = async (page: number) => {
    try {
      const response = await axios.get(`http://10.86.46.56:3000/api/v1/libraries?page=${page}`);
      setLibraries(response.data.libraries);
      setFilteredLibraries(response.data.libraries);
      setTotalPages(response.data.meta.total_pages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Filtra as bibliotecas conforme o termo de pesquisa
    const filtered = libraries.filter(library =>
      library.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLibraries(filtered);
  }, [searchTerm, libraries]);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar bibliotecas..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <FlatList
        data={filteredLibraries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />
      <View style={styles.pagination}>
        <Button title="Anterior" onPress={goToPrevPage} disabled={currentPage === 1} />
        <Text style={styles.pageIndicator}>{`Página ${currentPage} de ${totalPages}`}</Text>
        <Button title="Próximo" onPress={goToNextPage} disabled={currentPage === totalPages} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  itemContainer: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  pageIndicator: {
    fontSize: 16,
  },
});

export default LibraryScreen;
