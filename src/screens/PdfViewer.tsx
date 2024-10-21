// PdfViewer.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Pdf from 'react-native-pdf'; // Importando o componente PDF

// Definindo os parâmetros da rota
type PdfViewerRouteParams = {
  pdfUrl: string; // Aqui você pode adicionar outros parâmetros se necessário
};

// Definindo os tipos das props
type PdfViewerProps = {
  route: RouteProp<{ params: PdfViewerRouteParams }, 'PdfViewer'>; // Use o tipo definido
  navigation: StackNavigationProp<any>; // Você pode ser mais específico aqui
};

const PdfViewer: React.FC<PdfViewerProps> = ({ route, navigation }) => {
  const { pdfUrl } = route.params; // Extraindo a URL do PDF

  return (
    <View style={styles.container}>
      <Pdf
        source={{ uri: pdfUrl, cache: true }} // Passando a URL do PDF
        style={styles.pdf} // Estilos do PDF
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Número de páginas: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Página: ${page} de ${numberOfPages}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
        onPressLink={(uri) => {
          console.log(`Link pressionado: ${uri}`);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default PdfViewer;
