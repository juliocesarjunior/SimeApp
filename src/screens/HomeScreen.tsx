import React, { useEffect, useState } from 'react';
import { View, Button, FlatList, StyleSheet, TouchableOpacity, Text, Image, Platform } from 'react-native';
import axios from 'axios';
import { NavigationStackProp } from 'react-navigation-stack';

interface Category {
  id: string;
  name: string;
  route: string;
  image: string;
}

interface Props {
  navigation: NavigationStackProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios.get('http://10.86.46.56:3000/api/v1/categories')
      .then(response => setCategories(response.data.categories))
      .catch(error => console.log(error));
  }, []);

  return (
    <View>
              <FlatList
          data={categories}
          renderItem={({ item }) => (
            <TouchableOpacity
            onPress={() => navigation.navigate(item.route)}
			style={styles.listMenu}
            >
              <Image
                source={{ uri: `http://10.86.46.56:3000${item.image}` }}
                style={styles.listImg}
              />
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
          }}
          showsVerticalScrollIndicator={false}
        />
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Button
            title={item.name}
            onPress={() => navigation.navigate(item.route)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listMenu: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    borderRadius: 16,
    marginVertical: 8,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
},
listImg:{ 
    width: 150, 
    height: 150, 
    resizeMode: "center" 
},
});

export default HomeScreen;
