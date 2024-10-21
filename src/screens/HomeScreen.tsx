import React, { useEffect, useState } from 'react';
import { View, Button, FlatList } from 'react-native';
import axios from 'axios';
import { NavigationStackProp } from 'react-navigation-stack';

interface Category {
  id: string;
  name: string;
  route: string;
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

export default HomeScreen;
