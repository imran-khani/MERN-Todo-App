import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex flex-col w-[306px] h-screen bg-gray-800">
      <div className="flex-1 p-8 overflow-y-auto">
        <ul className="space-y-2">
          <li>
            <Link
              to={"/all"}
              className="block text-white hover:bg-gray-700 p-2 rounded"
            >
              All Tasks
            </Link>
          </li>
          <li>
            <Link
              to={"/today"}
              className="block text-white hover:bg-gray-700 p-2 rounded"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to={"/yesterday"}
              className="block text-white hover:bg-gray-700 p-2 rounded"
            >
              About
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
