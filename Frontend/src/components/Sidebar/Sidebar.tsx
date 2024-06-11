import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../utils/utils";

const routes = useMemo(
  () => [
    {
      id: 1,
      path: "/app/all",
      label: "All Tasks",
    },
    {
      id: 2,
      path: "/app/today",
      label: "Home",
    },
    {
      id: 3,
      path: "/app/yesterday",
      label: "About",
    },
  ],
  []
);

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const path = useLocation().pathname;

  const handleMenuClick = useCallback(() => setIsOpen(true), []);
  const handleCloseClick = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className={`${isOpen && "hidden"} p-5`}>
        <Menu
          onClick={handleMenuClick}
          className={"text-gray-900 cursor-pointer"}
          size={24}
        />
      </div>
      <div
        className={cn(
          "flex-col md:w-[306px] fixed top-[63px] w-[200px] transition transform md:translate-x-0 -translate-x-full h-screen bg-gray-200",
          isOpen ? "translate-x-0" : ""
        )}
      >
        <div className="flex-1 p-8 overflow-y-auto relative">
          <div className="absolute right-2 top-2 flex md:hidden">
            <X
              onClick={handleCloseClick}
              className="text-white cursor-pointer"
              size={24}
            />
          </div>
          <ul className="space-y-2">
            {routes.map((route) => {
              const isActive = path === route.path;
              return (
                <li key={route.id}>
                  <Link
                    to={route.path}
                    className={cn(
                      "flex justify-between items-center text-Primary hover:text-Primary hover:bg-gray-200 p-2 rounded",
                      isActive ? "text-Primary" : "text-gray-900"
                    )}
                  >
                    {route.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;