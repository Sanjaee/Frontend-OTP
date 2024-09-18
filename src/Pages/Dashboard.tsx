import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { DrawerDemo } from "@/components/Chart/DrawerDemo";
import { DropdownMenuDemo } from "@/components/Menu/DropDown";
import { useLogin } from "../useLogin";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

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

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="flex flex-col gap-6 items-center h-[1000px]">
      <h1 className="text-3xl font-bold mt-10">Dashboard</h1>
      <div className="flex items-center gap-4">
        <DrawerDemo />
        <DropdownMenuDemo />
        <Button onClick={handleLogout}>Logout</Button>
      </div>{" "}
      <blockquote
        data-testid="tiktok-embed"
        className="tiktok-embed p-4"
        cite="https://www.tiktok.com/@ahmadafriza25"
        data-unique-id="ahmadafriza25"
        data-embed-type="creator"
        style={{ maxWidth: "780px", minWidth: "288px" }}
      >
        <section>
          <a target="_blank" href="https://www.tiktok.com/@ahmadafriza25">
            @ahmadafriza25.com
          </a>
        </section>
      </blockquote>
    </div>
  );
};

export default Dashboard;
