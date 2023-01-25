import { environment } from 'src/environments/environment';

export const databseUrl = (node: string) => {
  return `${environment.db_uri}/${node}.json`;
};

export const userDataUrl = (userId: string) => {
  return `${environment.db_uri}/users/${userId}.json`;
};

export const signUpUrl = (apiKey: string) => {
  return `${environment.auth_uri}:signUp?key=${apiKey}`;
};

export const signInUrl = (apiKey: string) => {
  return `${environment.auth_uri}:signInWithPassword?key=${apiKey}`;
};
