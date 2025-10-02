const SESSION_USER_KEY = "currentUser";

interface User {
  id: string;
  name: string;
}

// Get user from sessionStorage or default to first user
const getCurrentUser = (): User => {
  const stored = sessionStorage.getItem(SESSION_USER_KEY);
  if (stored) return JSON.parse(stored);
  return { id: "u1", name: "Alice" }; // Default user added temporarily for testing;
};

// Save user to sessionStorage
const setCurrentUser = (user: User) => {
  sessionStorage.setItem(SESSION_USER_KEY, JSON.stringify(user));
};
export { getCurrentUser, setCurrentUser };
