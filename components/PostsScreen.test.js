import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react-native';
import PostsScreen from './PostsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const mockJson = [
  { id: 1, title: 'Post 1', body: 'Body 1' },
  { id: 2, title: 'Post 2', body: 'Body 2' }
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
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Posts" component={PostsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );

    await waitFor(() => expect(getByText('Post 1')).toBeTruthy());
    expect(getByText('Body 1')).toBeTruthy();
  });

  it('refreshes posts when Refresh button is pressed', async () => {
    const { getByText } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Posts" component={PostsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
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
});
