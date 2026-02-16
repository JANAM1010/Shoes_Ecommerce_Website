import {
  getRegisteredUsers,
  saveRegisteredUsers,
  saveUser,
  removeUser,
  saveSessionTime,
  removeSessionTime,
} from './localStorage';

export const registerUser = (name, email, password) => {
  const users = getRegisteredUsers();
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return { success: false, message: 'Email already registered' };
  }
  const newUser = {
    id: Date.now(), 
    name,
    email,
    password, 
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  saveRegisteredUsers(users);

  return { success: true, message: 'Registration successful!' };
};
export const loginUser = (email, password) => {
  const users = getRegisteredUsers();
  const user = users.find((user) => user.email === email);
  if (!user) {
    return { success: false, message: 'User not found' };
  }
  if (user.password !== password) {
    return { success: false, message: 'Incorrect password' };
  }
  const { password: _, ...userWithoutPassword } = user;
  saveUser(userWithoutPassword);
  saveSessionTime();
  return { success: true, user: userWithoutPassword };
};
export const logoutUser = () => {
  removeUser();
  removeSessionTime();
};
export const updateUserProfile = (userId, updatedData) => {
  const users = getRegisteredUsers();
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex === -1) {
    return { success: false, message: 'User not found' };
  }
  users[userIndex] = { ...users[userIndex], ...updatedData };
  saveRegisteredUsers(users);
  const { password: _, ...userWithoutPassword } = users[userIndex];
  saveUser(userWithoutPassword);
  return { success: true, user: userWithoutPassword };
};