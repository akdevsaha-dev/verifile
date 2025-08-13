"use client";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Navbar } from "@workspace/ui/components/navbar";
import { NonAuthNavbar } from "@workspace/ui/components/nonAuthNav";
export default function page() {
  const authUser = useAuthStore((state) => state.authUser);
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const router = useRouter();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <div>checking auth...</div>;
  }
  return (
    <div>
      {authUser ? <Navbar email={authUser.email} /> : <NonAuthNavbar />}
    </div>
  );
}
