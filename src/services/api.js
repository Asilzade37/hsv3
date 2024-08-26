// ... diğer import'lar

const API_URL = 'http://localhost:5000/api';

// Geçici kullanıcı veritabanı
let users = JSON.parse(localStorage.getItem('users')) || [];

const api = {
  register: (userData) => {
    return new Promise((resolve, reject) => {
      const existingUser = users.find(user => user.email === userData.email);
      if (existingUser) {
        reject({ response: { data: { msg: 'Bu e-posta adresi zaten kullanılıyor.' } } });
      } else {
        const newUser = { ...userData, id: Date.now().toString() };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        resolve({ data: { user: newUser, token: `fake-jwt-token.${newUser.id}` } });
      }
    });
  },

  login: (credentials) => {
    return new Promise((resolve, reject) => {
      const user = users.find(u => u.email === credentials.email && u.password === credentials.password);
      if (user) {
        resolve({ data: { user, token: `fake-jwt-token.${user.id}` } });
      } else {
        reject({ response: { data: { msg: 'Geçersiz e-posta veya şifre.' } } });
      }
    });
  },

  getCurrentUser: () => {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem('token');
      if (token) {
        const userId = token.split('.')[1];
        const user = users.find(u => u.id === userId);
        if (user) {
          resolve({ data: user });
        } else {
          reject({ response: { data: { msg: 'Kullanıcı bulunamadı.' } } });
        }
      } else {
        reject({ response: { data: { msg: 'Token bulunamadı.' } } });
      }
    });
  },

  logout: () => {
    localStorage.removeItem('token');
  }
};

export const { register, login, getCurrentUser, logout } = api;
export default api;