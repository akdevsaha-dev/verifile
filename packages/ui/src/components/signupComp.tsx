"use client";
import { Handshake } from "lucide-react";
import { InputBox } from "@workspace/ui/components/inputBox";
import { useRef, useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { toast } from "react-hot-toast";
import { axiosInstance } from "@workspace/ui/lib/utils";
interface SignupCompProp {
  onSuccess: () => void;
}
export const SignupComp = ({ onSuccess }: SignupCompProp) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const passwordRef = useRef<HTMLInputElement>(null);
  const onClickHandler = async () => {
    if (!email || !password) {
      toast.error("Please fill the credentials", {
        duration: 2000,
      });
    }
    try {
      await axiosInstance.post("/auth/signup", {
        email,
        password,
      });
      onSuccess();
    } catch (error) {
      toast.error("Signup failed");
    }
  };
  return (
    <div className="h-screen w-full flex">
      <div className="md:flex hidden md:flex-1 text-white flex-col bg-orange-600 items-center justify-center ">
        <Handshake size={250} />
        <div className=" text-4xl mt-5 w-[25vw] text-center font-semibold">
          VeriFile: Share files securely
        </div>
        <div className="pt-5 text-md ">
          Effortless, private and secure uplaod.
        </div>
      </div>
      <div className="md:flex-1 h-screen w-full flex flex-col">
        <div className="flex flex-col items-end pr-8 mt-12">
          <div className="text-3xl font-extrabold">Secure</div>
          <div className="">File sharing</div>
        </div>
        <div className=" w-full h-full  flex items-center justify-center">
          <div className="h-[80vh] w-[30vw] ">
            <div className="text-3xl font-semibold mt-14">Sign up</div>
            <InputBox
              type="text"
              label="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") passwordRef.current?.focus();
              }}
              value={email}
              placeholder="user@email.com"
            />

            <InputBox
              ref={passwordRef}
              type="password"
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onClickHandler();
              }}
              value={password}
              placeholder="●●●●●●●"
            />
            <Button text="Sign up" onClick={onClickHandler} />
          </div>
        </div>
      </div>
    </div>
  );
};
