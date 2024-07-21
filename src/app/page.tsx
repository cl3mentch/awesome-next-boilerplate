"use client";
import { Button } from "@/components/ui/button/button";
import Cookies from "js-cookie";
import { useEffect } from "react";

export default function Home() {
  const SetCookie = () => {
    Cookies.set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9", {
      expires: 7,
    });
  };

  const GetCookie = () => {
    alert(Cookies.get("token"));
  };
  useEffect(() => {
    SetCookie();
  }, []);
  return (
    <main className="flex min-h-screen relative flex-col items-center justify-between p-24 bg-black">
      <Button
        onClick={() => {
          GetCookie();
        }}
      >
        click
      </Button>
    </main>
  );
}
