import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const PostsScreen = ({ navigation, dispatch, posts }) => {
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const ITEMS_PER_PAGE = 10;

  const fetchPosts = () => {
    setRefreshing(true);
    dispatch({ type: 'FETCH_POSTS_REQUEST' });
    setRefreshing(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLoadMore = () => {
    if (page * ITEMS_PER_PAGE < posts.length) {
      setPage(page + 1);
    }
  };

  const paginatedPosts = posts.slice(0, page * ITEMS_PER_PAGE);

  return (
    <View>
      <Button title="Refresh" onPress={fetchPosts} />
      <FlatList
        data={paginatedPosts}
        keyExtractor={({ id }) => id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => navigation.navigate('PostDetails', { post: item })}
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
  title: { fontWeight: 'bold' },
});

const mapStateToProps = (state) => ({
  posts: state.posts,
});

export default connect(mapStateToProps)(PostsScreen);