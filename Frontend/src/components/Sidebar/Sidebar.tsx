import { BookCheck, Calendar, CalendarClock, Menu, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../utils/utils";



const Sidebar = () => {

  const routes = useMemo(
    () => [
      {
        id: 1,
        path: "/app/all",
        label: "All Tasks",
        icon: <BookCheck />
      },
      {
        id: 2,
        path: "/app/today",
        label: "Today",
        icon: <Calendar />
      },
      {
        id: 3,
        path: "/app/yesterday",
        label: "Yesterday",
        icon: <CalendarClock />
      },
    ],
    []
  );
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
          "flex-col md:w-[306px] z-50 fixed top-[63px] w-[200px] transition transform md:translate-x-0 -translate-x-full h-screen bg-gray-200",
          isOpen ? "translate-x-0" : ""
        )}
      >
        <div className="flex-1 p-8 overflow-y-auto relative">
          <div className="absolute right-2 top-2 flex md:hidden">
            <X
              onClick={handleCloseClick}
              className="text-gray-900 cursor-pointer"
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
                    <div className="flex gap-2 items-center">
                      {route.icon}
                      <span>{route.label}</span>
                    </div>
                  
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