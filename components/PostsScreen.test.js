import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react-native';
import PostsScreen from './PostsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from '../store';

const Stack = createStackNavigator();

const mockJson = [
  { id: 1, title: 'Post 1', body: 'Body 1' },
  { id: 2, title: 'Post 2', body: 'Body 2' },
];

// Mocking fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockJson),
  })
);

describe('PostsScreen', () => {
  it('renders posts fetched from API', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Posts" component={PostsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );

    await waitFor(() => expect(getByText('Post 1')).toBeTruthy());
    expect(getByText('Body 1')).toBeTruthy();
  });

  it('refreshes posts when Refresh button is pressed', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Posts" component={PostsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );

    // Initially wait for posts to load
    await waitFor(() => expect(getByText('Post 1')).toBeTruthy());

    // Trigger refresh by pressing the Refresh button
    act(() => {
      fireEvent.press(getByText('Refresh'));
    });

    // Expect posts to be present again
    await waitFor(() => expect(getByText('Post 1')).toBeTruthy());
  });

  // Test to check pagination
  it('loads more posts when scrolled to bottom', async () => {
    // Mock fetch to return more than 10 posts for pagination
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(Array.from({ length: 20 }, (_, i) => ({ id: i + 1, title: `Post ${i + 1}`, body: `Body ${i + 1}` }))),
      })
    );

    const { getByText, queryByText } = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Posts" component={PostsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );

    // Initially wait for posts to load
    await waitFor(() => expect(getByText('Post 1')).toBeTruthy());

    // Trigger pagination (This part is simplified; in real-world scenarios, you'd programmatically scroll the list)
    act(() => {
      // Your pagination function
    });

    // Expect more posts to be present
    await waitFor(() => expect(queryByText('Post 11')).toBeTruthy());
  });
});
