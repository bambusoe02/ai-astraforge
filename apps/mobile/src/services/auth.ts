import * as SecureStore from 'expo-secure-store';

export const tokenCache = {
  getToken: async (key: string) => {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  saveToken: (key: string, token: string) => {
    try {
      return SecureStore.setItemAsync(key, token);
    } catch (err) {
      return;
    }
  },
};
