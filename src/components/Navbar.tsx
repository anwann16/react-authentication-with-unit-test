import { useAuth } from "../context/AuthContext";
import { Avatar, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Navbar = () => {
  const { user, handleLogout } = useAuth();
  return (
    <header className="shadow-sm">
      <nav className="container flex justify-between items-center py-5">
        <h1 className="text-primary font-bold text-xl">Admin Dashboard</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src={user?.image} />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-5">
            <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuLabel
              onClick={handleLogout}
              className="cursor-pointer"
            >
              Logout
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  );
};

export default Navbar;
