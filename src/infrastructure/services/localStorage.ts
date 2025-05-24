class LocalStorage {
  getToken() {
    return localStorage.getItem('token');
  };

  setToken(token:string) {
    localStorage.setItem('token', token);
  };

  clearToken() {
    localStorage.removeItem('token');
  };
};

export const localStorageService = new LocalStorage();
