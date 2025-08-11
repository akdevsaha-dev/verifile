"use client";
import { SignupComp } from "@workspace/ui/components/signupComp";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center min-h-svh">
      <SignupComp onSuccess={() => router.push("/upload")} />
    </div>
  );
}
