import { CurrentUser } from 'src/model/CurrentUser';
import * as Auth from './auth.actions';

export interface AuthState {
  currentUser: CurrentUser;
  error: string;
  isLoading: boolean;
}

const initialState: AuthState = {
  currentUser: null,
  error: null,
  isLoading: false,
};

export const authReducer = (state = initialState, action: Auth.AuthActions) => {
  switch (action.type) {
    case Auth.LOGIN_START:
      return {
        ...state,
        error: null,
        isLoading: true,
      };

    case Auth.LOGIN:
      const { email, fullName, userId, token, expTime } = action.payload;
      const newUser = new CurrentUser(email, fullName, userId, token, expTime);
      return {
        ...state,
        currentUser: newUser,
        error: null,
        isLoading: false,
      };
    case Auth.SIGNUP_START:
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case Auth.SIGNUP_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
      };
    case Auth.AUTH_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case Auth.LOGOUT:
      return {
        ...state,
        currentUser: null,
        error: null,
      };
    default:
      return state;
  }
};
