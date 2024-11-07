// PdfViewer.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Pdf from 'react-native-pdf'; // Importando o componente PDF

type PdfViewerRouteParams = {
  pdfUrl: string;
};

type PdfViewerProps = {
  route: RouteProp<{ params: PdfViewerRouteParams }, 'PdfViewer'>;
  navigation: StackNavigationProp<any>;
};

const PdfViewer: React.FC<PdfViewerProps> = ({ route, navigation }) => {
  const { pdfUrl } = route.params;
  //console.log(pdfUrl)
  return (
    <View style={styles.container}>
      <Pdf
      trustAllCerts={false}
        source={{ uri: pdfUrl, cache: true }}
        style={styles.pdf}
        onLoadComplete={(numberOfPages, filePath) => {
          //console.log(`Número de páginas: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          //console.log(`Página: ${page} de ${numberOfPages}`);
        }}
        onError={(error) => {
          //console.log(error);
        }}
        onPressLink={(uri) => {
          //console.log(`Link pressionado: ${uri}`);
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
