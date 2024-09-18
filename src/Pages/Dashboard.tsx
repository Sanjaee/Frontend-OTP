import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { ChartComponent } from "@/components/Chart/ChartComponent";
import { DrawerDemo } from "@/components/Chart/DrawerDemo";
import { DropdownMenuDemo } from "@/components/Menu/DropDown";
import { useLogin } from "../useLogin";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  useLogin();
  const navigate = useNavigate();
  const { toast } = useToast();
  const handleLogout = () => {
    Cookies.remove("jwt");
    navigate("/");
    window.location.reload();
    toast({
      title: "Logout Success",
      description: "You have successfully logged out",
      variant: "success",
    });
  };

  useLogin();

  return (
    <div className="flex flex-col gap-6 items-center h-[1000px]">
      <h1 className="text-3xl font-bold mt-10">Dashboard</h1>
      <div className="flex items-center gap-4">
        <DrawerDemo />
        <DropdownMenuDemo />
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      <div className="w-full max-w-[600px]">
        <ChartComponent />
      </div>
    </div>
  );
};

export default Dashboard;
