import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useUser } from "../context/UserContext";

function GmailConnect() {
  const [status, setStatus] = useState("idle"); 
  const { user } = useUser();
  // Check if redirected back from Google with code
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      setStatus("connecting");
      fetch(`${import.meta.env.VITE_BACKEND_URL}/oauth2callback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, userId: user._id}),
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) setStatus("success");
          else setStatus("error");
        })
        .catch(() => setStatus("error"));
    }
  }, []);

  const handleConnect = () => {
     window.location.href=`${import.meta.env.VITE_BACKEND_URL}/auth`
  };

  return (
    <div className="min-h-screen bg-gray-700 flex items-center justify-center p-8 text-gray-200">
        <Navbar/>
      <div className="bg-gray-800 shadow rounded-lg p-8 border border-gray-700 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-gray-100">Connect Gmail</h1>
        < p className="mb-4 text-gray-300">
          Connect your Gmail account to enable automatic email warmup and management.
        </p>

        <button
          onClick={handleConnect}
          className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white font-medium transition-colors duration-200"
        >
          Connect Gmail
        </button>

        <div className="mt-6">
          {status === "idle" && <p className="text-gray-400">Click the button to connect your Gmail.</p>}
          {status === "connecting" && <p className="text-yellow-400">Connecting to Gmail...</p>}
          {status === "success" && <p className="text-green-400">Gmail connected successfully!</p>}
          {status === "error" && <p className="text-red-400">Error connecting Gmail. Try again.</p>}
        </div>
      </div>
    </div>
  );
}

export default GmailConnect;
