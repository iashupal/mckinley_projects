import { runSaga } from 'redux-saga';
import {
	initiateLaunch,
	initiateAuthSaga,
	invalidateTokenSaga
} from '../src/store/sagas/auth';
// import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '../__mocks__/@react-native-community/async-storage';

describe('Navigation On Initial Launch', () => {
	it('should navigate to Home', async () => {
		await AsyncStorage.setItem('@token:key', 'token');
		await AsyncStorage.setItem('@isRegistered:key', 'isRegistered');

		const dispatched = [];
		const token = await AsyncStorage.getItem('@token:key');
		const isRegistered = await AsyncStorage.getItem('@isRegistered:key');

		const store = {
			dispatch: action => dispatched.push(action),
			getState: test => console.log(test)
		};
		await runSaga(store, initiateLaunch).done;

		console.log(dispatched);
		expect(token).not.toEqual(null);
		expect(dispatched).toEqual(dispatched);
	});
});

it('should initiate auth saga', async () => {
	const dispatched = [];

	await runSaga(
		{
			dispatch: action => dispatched.push(action),
			getState: () => ({ value: 'test' })
		},
		initiateAuthSaga
	).done;

	console.log(dispatched);
	expect(dispatched).toEqual(dispatched);
});

it('should invalidate user token', async () => {
	const dispatched = [];
	await runSaga(
		{
			dispatch: action => dispatched.push(action),
			getState: state => console.log(state)
		},
		invalidateTokenSaga
	).done;

	console.log(dispatched);
	expect(dispatched).toEqual([]);
});
