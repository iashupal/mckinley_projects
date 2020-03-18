import { createReducer, createActions } from 'reduxsauce'
import { path } from 'ramda'
// import { creteStore, applyMidleware, compose, createStore } from 'redux'
// import { persiststore,autoRehydrtae } from 'redux-persist'
// import { AsyncStorage } from 'react-native'

const { Types, Creators } = createActions({
  connectionState: ['status'],
  startLoading: null,
  endLoading: null,
  clearError: null,
  initiateCheckOnLaunch: null,
  checkOnLaunch: ['token', 'phoneNumber', 'isRegistered'],
  authUser: ['email', 'password', 'passwordConfirm', 'isRegistration'],
  authSuccess: ['token'],
  setUserInfo: ['data'],
  getUserInfo: null,
  authUserEmail: ['email'],
  authFail: ['error'],
  invalidateToken: null,
  updateUserProfile: ['data', 'uri'],
  requestOtp: ['phoneNumber'],
  setOtpServerCode: ['otpCode'],
  invalidateOtp: null,    
  initiateAddPhone: ['phoneNumber'],
  addPhone: ['phoneNumber'],
  // addDetailUser: null,
  // uploadPhotoUser: null,
  getUserProfile: null,
  deleteUser: null,
  userLevelInfo: null
})

export const AuthTypes = Types
export default Creators

export const INITIAL_STATE = {
  user: {
    token: '',
    phoneNumber: '',
    isRegistered: false,
    otpCode: '',
    email: '',
  },
  loading: false,
  error: null,
  isConnected: false,
}

export const AuthSelectors = {
  user: path(['auth', 'user']),
  token: path(['auth', 'user', 'token']),
  phoneNumber: path(['auth', 'user', 'phoneNumber']),
  isRegistered: path(['auth', 'user', 'isRegistered']),
  otpCode: path(['auth', 'user', 'otpCode']),
  email: path(['auth', 'user', 'email']),
  loading: path(['auth', 'loading']),
  error: path(['auth', 'error']),
  isConnected: path(['auth', 'isConnected']),
}

// export default function configureStore(){
//   const store = createStore(reducers, getInitialState(),compose)(
//     applyMidleware([
//         thunk,
//         localStorageMidleware,
//         logger
//     ]),
//     autoRehydrtae()
//   )
// }
// persiststore(store,{storage: AsyncStorage});
// return store;



const connectionState = (state, { status: isConnected }) => {
  return Object.assign({}, state, {
    isConnected,
  });
}

const startLoading = (state) => ({ ...state, loading: true })

const endLoading = (state) => ({ ...state, loading: false })

const authSuccess = (state, { token }) => ({ ...state, user: { ...state.user, token } })

const setUserInfo = (state, { data }) => ({ ...state, user: { ...state.user, ...data } })

const authUserEmail = (state, { email }) => ({ ...state, user: { ...state.user, email } })

const authFail = (state, { error }) => ({ ...state, user: { ...state.user, token: null }, error })

const setOtpServerCode = (state, { otpCode }) => ({ ...state, user: { ...state.user, otpCode } })

const invalidateOtp = (state) => ({ ...state, user: { ...state.user, otpCode: '' } })

const addPhone = (state, { phoneNumber }) => ({
  ...state,
  user: {
    ...state.user,
    phoneNumber,
  },
})

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CONNECTION_STATE]: connectionState,
  [Types.START_LOADING]: startLoading,
  [Types.END_LOADING]: endLoading,
  [Types.AUTH_SUCCESS]: authSuccess,
  [Types.SET_USER_INFO]: setUserInfo,
  [Types.AUTH_USER_EMAIL]: authUserEmail,
  [Types.AUTH_FAIL]: authFail,
  [Types.SET_OTP_SERVER_CODE]: setOtpServerCode,
  [Types.INVALIDATE_OTP]: invalidateOtp,
  [Types.ADD_PHONE]: addPhone,
})



