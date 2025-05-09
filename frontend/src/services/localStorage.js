// Sample user data
const sampleUsers = [
  {
    id: 1,
    name: 'Demo User',
    email: 'demo@example.com',
    password: 'demo123',
    accountType: 'customer',
    phoneNumber: '1234567890'
  }
];

// Initialize localStorage with sample data if empty
if (!localStorage.getItem('users')) {
  localStorage.setItem('users', JSON.stringify(sampleUsers));
}

export const getUsers = () => {
  return JSON.parse(localStorage.getItem('users')) || [];
};

export const addUser = (userData) => {
  const users = getUsers();
  const newUser = {
    ...userData,
    id: Date.now(),
    accountType: 'customer'
  };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  return newUser;
};

export const getCartItems = () => {
  return JSON.parse(localStorage.getItem('cartItems')) || [];
};

export const setCartItems = (items) => {
  localStorage.setItem('cartItems', JSON.stringify(items));
};