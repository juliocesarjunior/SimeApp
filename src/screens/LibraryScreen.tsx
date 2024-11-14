import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import ApiRequest from '../service/ApiRequest';

interface Library {
  id: number;
  name: string;
  description: string;
  file: { url: string };
}

interface Meta {
  current_page: number;
  total_pages: number;
}

const LibraryScreen: React.FC = () => {
  const [libraries, setLibraries] = useState<Library[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadLibraries = () => {
      setIsLoading(true);
      
      const params = new URLSearchParams();
      params.append('q[name_or_description_cont]', searchQuery);
      params.append('page', currentPage.toString());
  
      ApiRequest.getRequest(
        `api/v1/libraries?${params.toString()}`,
        {},
        (data, success) => {
          if (success) {
            setLibraries(data.libraries);
            setMeta(data.meta);
          } else {
            Alert.alert('Erro', 'Não foi possível carregar as bibliotecas. Tente novamente mais tarde.');
          }
          setIsLoading(false);
        }
      );
    };
  
    loadLibraries();
  }, [searchQuery, currentPage]);
  
  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    setCurrentPage(1); // Reset para a primeira página quando a busca muda
  };

  const clearSearch = () => {
    setSearchQuery('');
    setCurrentPage(1);
  };

  const goToNextPage = () => {
    if (meta && currentPage < meta.total_pages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar bibliotecas..."
          value={searchQuery}
          onChangeText={handleSearchChange}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>X</Text>
          </TouchableOpacity>
        )}
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={libraries}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          )}
        />
      )}
      <View style={styles.pagination}>
        <TouchableOpacity
          onPress={goToPrevPage}
          disabled={currentPage === 1}
          style={[styles.pageButton, currentPage === 1 && styles.disabledButton]}
        >
          <Text style={styles.pageButtonText}>Anterior</Text>
        </TouchableOpacity>
        <Text style={styles.pageIndicator}>{`Página ${currentPage} de ${meta?.total_pages || 1}`}</Text>
        <TouchableOpacity
          onPress={goToNextPage}
          disabled={currentPage === meta?.total_pages}
          style={[styles.pageButton, currentPage === meta?.total_pages && styles.disabledButton]}
        >
          <Text style={styles.pageButtonText}>Próximo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  clearButton: {
    marginLeft: -30,
    marginRight: 10,
    padding: 8,
  },
  clearButtonText: {
    fontSize: 16,
    color: '#888',
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
  pageButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#493bd0',
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  pageButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  pageIndicator: {
    fontSize: 16,
  },
});

export default LibraryScreen;
