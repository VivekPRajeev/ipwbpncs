import { useEffect, useState } from "react";
import { getCurrentUser, setCurrentUser } from "../../utils/session";
import { useUsers } from "../../hooks/useUsers";
import { User } from "../../db/schemas";
import { useCurrentUser } from "../../hooks/useCurrentUser";

type CurrentUser = Pick<User, "id" | "name">;

export const Nav = () => {
  const users = useUsers();
  const { currentUser: currentUserState, setCurrentUser: setCurrentUserState } =
    useCurrentUser();
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleSwitchUser = (user: User) => {
    setCurrentUserState(user); // for context
    setCurrentUser(user); // for session storage
    setShowDropdown(false);
  };

  useEffect(() => {
    if (currentUserState) return; // already set

    const sessionUser = getCurrentUser(); // get from session storage
    if (sessionUser) {
      setCurrentUserState(sessionUser);
    } else if (users.length > 0) {
      const defaultUser: CurrentUser = {
        id: users[0].id,
        name: users[0].name,
      };
      setCurrentUserState(defaultUser);
      setCurrentUser(defaultUser);
    } else {
      console.log("No users available to set as current user.");
    }
  }, [currentUserState, users, setCurrentUserState]);

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
          {currentUserState?.name}
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-md shadow-lg z-10">
            {users
              .filter((user) => user.id !== currentUserState?.id)
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
