// PdfViewer.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Pdf from 'react-native-pdf';

interface PdfViewerProps {
  route: {
    params: {
      pdfUrl: string; // URL do PDF passada como parâmetro
    };
  };
}

const PdfViewer: React.FC<PdfViewerProps> = ({ route }) => {
  const { pdfUrl } = route.params;

  return (
    <View style={styles.container}>
      <Pdf
        source={{ uri: pdfUrl, cache: true }} // A URL do PDF
        style={styles.pdf}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`number of pages: ${numberOfPages}`);
        }}
        onError={(error) => {
          console.error(error);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pdf: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default PdfViewer;
