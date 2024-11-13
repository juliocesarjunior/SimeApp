import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, Modal, Image, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import ApiRequest from '../service/ApiRequest';
import { API_BASE_URL } from '../service/apiConfig';

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

const { width, height } = Dimensions.get('window'); // Obtenha as dimensões da tela

const CallScreen: React.FC<Props> = ({ navigation }) => {
  const [phalanges, setPhalanges] = useState<Item[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  useEffect(() => {
    ApiRequest.getRequest('api/v1/phalanges', {}, (data, success) => {
      if (success) {
        setPhalanges(data);
      } else {
        console.log('Erro ao buscar categorias:', data);
      }
    });
  }, []);

  const openModal = (item: Item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={phalanges}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => openModal(item)}>
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
      />
      
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedItem && (
              <>
                <Image
                  source={{ uri: `${API_BASE_URL}${selectedItem.image.url}` }}
                  style={[
                    styles.image,
                    { width: width * 0.8, height: height * 0.4 }, // Ajuste proporcional ao tamanho da tela
                  ]}
                />
                <Text style={styles.modalText}>{selectedItem.name}</Text>
                <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                  <Text style={styles.closeButtonText}>Fechar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  image: {
    borderRadius: 10,
    marginBottom: 15,
    resizeMode: 'contain', // Mantém a proporção da imagem
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  closeButton: {
    backgroundColor: '#493bd0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CallScreen;
