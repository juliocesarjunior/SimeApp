import React from 'react';
import { View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, NativeStackNavigationProp } from '@react-navigation/native';
import { API_BASE_URL } from '../service/apiConfig';
import { theme } from '../theme'; // Certifique-se de importar o tema corretamente

const InfoScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackPramslist>>();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.empty}>
        <Image
          alt=""
          source={{ uri: `${API_BASE_URL}/assets/logos/LogoDevasSiMe.png` }}
          style={styles.emptyImg} />

        <Text style={styles.emptyTitle}>Salve Deus!</Text>

        <Text style={styles.emptyDescription}>
          Visando em facilitar o atendimento do mestrado, criamos o sistema mediúnico SIME-APP, desenvolvido para alcance de todos os templos, seja de 1°, 2° ou 3° estagio.
        </Text>

        <View style={styles.emptyFooter}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>Voltar ao Início</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  emptyImg: {
    width: 150,
    height: 150,
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 27,
    fontWeight: '700',
    color: '#000',  // Supondo que o tema tenha essa propriedade
    marginBottom: 14,
  },
  emptyDescription: {
    marginBottom: 24,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '500',
    color: '#000',  // Supondo que o tema tenha essa propriedade
    textAlign: 'center',
  },
  emptyFooter: {
    marginTop: 'auto',
    alignSelf: 'stretch',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#493bd0',  // Supondo que o tema tenha essa propriedade
    borderColor: '#493bd0',     // Supondo que o tema tenha essa propriedade
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',  // Supondo que o tema tenha essa propriedade
  },
});

export default InfoScreen;
