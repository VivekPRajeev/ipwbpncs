import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faReply } from "@fortawesome/free-solid-svg-icons";

export const Comment = () => {
  return (
    <div className="flex gap-3 relative">
      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
        <FontAwesomeIcon icon={faUser} className="text-blue-500 text-sm" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-bold text-gray-900">John Doe</span>
          <span className="text-sm text-gray-500">2 days ago</span>
        </div>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam
        </p>
        <div className="flex justify-end mt-2">
          <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600">
            <FontAwesomeIcon icon={faReply} />
            Reply
          </button>
        </div>
        // more comments here later
      </div>
    </div>
  );
};
