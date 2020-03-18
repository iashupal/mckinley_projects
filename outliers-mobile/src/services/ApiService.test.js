import api from './AuthApiService';
import AsyncStorage from '../../__mocks__/@react-native-community/async-storage';

describe('User authentication tests', () => {
	it('should login the user and receive a bearer token', async () => {
		const payload = {
			email: 'test@test.com',
			password: 'test1234'
		};
		const response = await api.login(payload);
		const body = response.data.Body;
		expect(body.substring(0, 6)).toBe('Bearer');
	});

	it('should not login the user and return an error', async () => {
		const payload = {
			email: '',
			password: ''
		};
		const response = await api.login(payload);
		const body = response.data.Body;
		expect(body.email).toBe('EMAIL_REQUIRED');
		expect(body.password).toBe('PASSWORD_REQUIRED');
	});

	it('should validate token and return verification status', async () => {
		// Retreive saved token
		const payload = {
			email: 'test@test.com',
			password: 'test1234'
		};
		const loginResponse = await api.login(payload);
		const loginToken = loginResponse.data.Body;
		await AsyncStorage.setItem('@token:key', loginToken);

		// Validate the saved token
		const token = await AsyncStorage.getItem('@token:key');
		const response = await api.validateToken(token);
		const body = response.data.Body;
		expect(typeof body.isRegistered).toBe('boolean');
		expect(typeof body.phoneVerified).toBe('boolean');
	});

	it('should not validate token and return an error', async () => {
		const response = await api.validateToken(null);
		const body = response.data.Body;
		expect(body).toBe('UNABLE_TO_AUTHENTICATE');
	});

	it('should update user and return the response', async () => {
		// Retreive saved token
		const loginPayload = {
			email: 'test@test.com',
			password: 'test1234'
		};
		const loginResponse = await api.login(loginPayload);
		const loginToken = loginResponse.data.Body;

		// Update user
		const payload = {};
		const response = await api.updateUser(loginToken, payload);
		const body = response.data.Body;
		expect(body).toBe('UPDATE_SUCCESS');
	});
});
