import { useState } from "react";
import { useRouter } from "next/router";
import "./page-globals.css";
import { ArrowLeft } from "lucide-react";
import TwoFAPopup from "@/sections/components/Login/TwoFAPopup";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show2FA, setShow2FA] = useState(false);
  const [sessionToken, setSessionToken] = useState(""); // Store token for 2FA verification

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("https://findmysecurity-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }else{
        console.log("Login Success:", data);
        setSessionToken(data.code);
        setShow2FA(true);
      }

    
    } catch (error) {
      console.error("Login failed:", error);
      alert(error);
    }
  };

  const handle2FAVerify = async (code: string) => {
 router.push('/profile')
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <button
        className="absolute top-10 left-10 flex items-center text-gray-700 hover:text-black text-lg"
        onClick={() => router.push("/")}
      >
        <ArrowLeft className="w-6 h-6 mr-2" />
      </button>
      <div className="w-96 p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold">SECURITY GUARD</h1>
        </div>

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label className="block font-semibold">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md bg-gray-200 focus:outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md bg-gray-200 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            Login
          </button>

          <div className="flex justify-between text-sm mt-3">
            <button
              type="button"
              className="text-blue-600 hover:underline"
              onClick={() => router.push("/signup")}
            >
              Create New Account?
            </button>
            <button
              type="button"
              className="text-blue-600 hover:underline"
              onClick={() => router.push("/forgot-password")}
            >
              Forgot Password?
            </button>
          </div>
        </form>
      </div>

      {/* Show 2FA popup after login */}
      {show2FA && <TwoFAPopup code1={sessionToken} onVerify={handle2FAVerify} />}
    </div>
  );
};

export default SignIn;
