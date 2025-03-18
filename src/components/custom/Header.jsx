import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

function Header() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        setUser(response.data);
        setOpenDialog(false);
      });
  };

  useEffect(() => {
    const handleUserUpdate = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };

    window.addEventListener("userLoggedIn", handleUserUpdate);

    return () => {
      window.removeEventListener("userLoggedIn", handleUserUpdate);
    };
  }, []);


  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    setUser(null);
    window.location.href = "/";
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-white/50 backdrop-blur-md shadow-lg border-b border-gray-200 z-50 h-16">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-full px-6">
          <a href="/" className="flex items-center gap-2">
            <img src="/logo.svg" className="h-10 w-auto" alt="Logo" />
            <span className="text-xl font-bold text-gray-800">
              Tripsync
            </span>
          </a>

          <div className="flex items-center gap-4">
            {user && (
              <>
                <a href="/create-trip">
                  <Button
                    variant="outline"
                    className="rounded-full hover:bg-gray-100 transition"
                  >
                    Create Trip
                  </Button>
                </a>
                <a href="/my-trips">
                  <Button
                    variant="outline"
                    className="rounded-full hover:bg-gray-100 transition"
                  >
                    My Trips
                  </Button>
                </a>
              </>
            )}

            {user ? (
              <Popover>
                <PopoverTrigger>
                  <img
                    src={user?.picture}
                    className="rounded-full w-10 h-10 border border-gray-300 cursor-pointer hover:scale-105 transition-transform"
                    alt="Profile"
                  />
                </PopoverTrigger>
                <PopoverContent className="p-4 text-center rounded-lg shadow-lg bg-white border">
                  <h2 className="text-sm font-medium text-gray-700">
                    {user?.name}
                  </h2>
                  <Button
                    variant="destructive"
                    className="mt-2 w-full"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </PopoverContent>
              </Popover>
            ) : (
              <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
            )}
          </div>
        </div>
      </header>

      <div className="h-16"></div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="rounded-2xl max-w-md bg-white shadow-xl">
          <DialogHeader className="flex flex-col items-center space-y-4">
            <img src="/logo.svg" className="h-12" alt="App Logo" />

            <DialogTitle className="font-bold text-xl text-gray-800">
              Sign In With Google
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-center">
              Securely sign in to the app using Google Authentication.
            </DialogDescription>

            <Button
              onClick={login}
              className="w-full py-3 mt-4 flex items-center gap-4 justify-center border border-gray-300 bg-gray-100 hover:bg-gray-200 transition rounded-lg"
            >
              <FcGoogle className="h-7 w-7" />
              <span className="font-medium text-gray-800">
                Continue with Google
              </span>
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Header;
