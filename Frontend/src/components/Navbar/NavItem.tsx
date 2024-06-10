import { Link } from "react-router-dom";

type NavItemProps = {
     method : any;
     label?: string;
     onClick : any;
    };


const NavItem = ({method}:NavItemProps) => {

  return (
   <button 
    className="text-Primary"
    onClick={method}
   >
        Sign In
   </button>
  );
};

export default NavItem;
