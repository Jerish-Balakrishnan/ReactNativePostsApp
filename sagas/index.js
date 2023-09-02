import { put, takeEvery } from 'redux-saga/effects';
import { Alert } from 'react-native';

function* fetchPosts() {
	try {
		const response = yield fetch('https://jsonplaceholder.typicode.com/posts');
		const data = yield response.json();
		yield put({ type: 'FETCH_POSTS_SUCCESS', payload: data });
	} catch (error) {
		// Handle error
		console.error(error);
        Alert.alert(error);
	}
}

export default function* rootSaga() {
	yield takeEvery('FETCH_POSTS_REQUEST', fetchPosts);
}
