import { useState } from "react";
import { setCurrentUser } from "../../utils/session";

interface User {
  id: string;
  name: string;
}

const users: User[] = [
  { id: "u1", name: "Alice" },
  { id: "u2", name: "Bob" },
  { id: "u3", name: "Charlie" },
];

export const Nav = () => {
  const [currentUserState, setCurrentUserState] = useState<User>(users[0]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleSwitchUser = (user: User) => {
    setCurrentUserState(user);
    setCurrentUser(user);
    setShowDropdown(false);
  };

  return (
    <nav className="bg-gray-800 text-white flex justify-between items-center px-6 py-3 relative">
      <div className="text-lg font-bold">App</div>

      {/* User menu */}
      <div
        className="relative"
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
      >
        <button className="px-4 py-2 rounded-md hover:bg-gray-700">
          {currentUserState.name}
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-md shadow-lg z-10">
            {users
              .filter((user) => user.id !== currentUserState.id)
              .map((user) => (
                <button
                  key={user.id}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  onClick={() => handleSwitchUser(user)}
                >
                  {user.name}
                </button>
              ))}
          </div>
        )}
      </div>
    </nav>
  );
};
