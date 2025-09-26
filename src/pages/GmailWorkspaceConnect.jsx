// src/components/GmailWorkspaceConnect.jsx
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";


function GmailWorkspaceConnect() {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState("idle"); 
  const { user } = useUser();

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

   useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
  
      if (code) {
        setStatus("connecting");
        fetch(`${import.meta.env.VITE_BACKEND_URL}/googlecallback`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code, userId: user?._id}),
        })
          .then(res => res.json())
          .then(data => {
            if (data.success) setStatus("success");
            else setStatus("error");
          })
          .catch(() => setStatus("error"));
      }
    }, [user]);

  const handleCopy = () => {
    navigator.clipboard.writeText(clientId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // reset after 2s
  };

  const handleLogin = () => {
    // Replace with your actual login redirect
   window.location.href=`${import.meta.env.VITE_BACKEND_URL}/authgoogle`
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Connect Your Google Account</h2>
        <p className="text-gray-600 mb-6">Gmail / G-Suite</p>

        <div className="bg-green-50 text-green-800 text-sm px-3 py-2 rounded mb-6">
          You only need to do this once per domain
        </div>

        <p className="text-gray-700 mb-2">
          Allow the App to access your Google Workspace
        </p>


        <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-6">
          <li>Go to your <a href="https://admin.google.com/u/1/ac/owl/list?tab=configuredApps" target="_blank" className="text-blue-500">Google Workspace Admin Panel</a></li>
          <li>Click "Configure new app"</li>
          <li>
            Use the following Client-ID to search for Instantly:
            <div className="mt-2 flex items-center bg-gray-100 p-2 rounded">
              <span className="text-sm break-all">{clientId}</span>
              <button
                onClick={handleCopy}
                className="ml-auto px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </li>
          <li>Select and approve the App to access your Google Workspace</li>
        </ol>

        <button
          onClick={handleLogin}
          className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors"
        >
          Login &gt;
        </button>
      </div>
    </div>
  );
}

export default GmailWorkspaceConnect;
