"use client";
import { SigninComp } from "@workspace/ui/components/signinComp";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center min-h-svh">
      <SigninComp onSuccess={() => router.push("/upload")} />
    </div>
  );
}
