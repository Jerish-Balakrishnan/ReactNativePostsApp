import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const PostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const fetchPosts = () => {
    setRefreshing(true);
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => setPosts(json))
      .catch((error) => {
        console.error(error);
        Alert.alert('An error occurred while fetching the posts.');
      })
      .finally(() => setRefreshing(false));
  };

  const paginatedPosts = posts.slice(0, page * ITEMS_PER_PAGE);

  const handleLoadMore = () => {
    if (page * ITEMS_PER_PAGE < posts.length) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <View>
      <Button title="Refresh" onPress={fetchPosts} />
      <FlatList
        data={paginatedPosts}
        keyExtractor={({ id }) => id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('PostDetails', { post: item })}
            style={styles.listItem}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.body}</Text>
          </TouchableOpacity>
        )}
        refreshing={refreshing}
        onRefresh={fetchPosts}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: { padding: 16, borderBottomWidth: 1 },
  title: { fontWeight: 'bold' }
});

export default PostsScreen;
