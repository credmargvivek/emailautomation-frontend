import { useState } from 'react';
import Navbar from '../components/Navbar';

// Dummy data
const dummyEmails = ["test@ovam.ai"];
const dummyFromEmails = ["sender@ovam.ai"];

function EmailManagement() {
  const [emails, setEmails] = useState(dummyEmails);
  const [fromEmails, setFromEmails] = useState(dummyFromEmails);
  const [generateInput, setGenerateInput] = useState({ url: "", name: "", company: "", domain: "" });
  const [verifyEmail, setVerifyEmail] = useState("");
  const [verifyResult, setVerifyResult] = useState(null);

  const handleGenerate = async () => {
    console.log("Generate emails with:", generateInput);
  };

  const handleVerify = async () => {
    console.log("Verify email:", verifyEmail);
  };

  const handleCsvUpload = (file, type) => {
    console.log(`Upload ${type} CSV:`, file.name);
    if (type === "emails") setEmails([...emails, "new@ovam.ai"]);
    else setFromEmails([...fromEmails, "new-sender@ovam.ai"]);
  };

  return (
    <div className="flex bg-gray-700 min-h-screen text-gray-100">
      {/* Sidebar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6">
        <h1 className="text-3xl font-extrabold text-gray-100 mb-6 tracking-tight max-w-7xl mx-auto">
          Email Management
        </h1>

        {/* Generate Emails */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-7xl mx-auto mb-6">
          <div className="flex items-center mb-4">
            <svg className="w-6 h-6 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h-3m3 0h3"></path>
            </svg>
            <h2 className="text-xl font-semibold text-gray-100">Generate Emails</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["url","name","company","domain"].map((field) => (
              <input
                key={field}
                type="text"
                value={generateInput[field]}
                onChange={(e) => setGenerateInput({ ...generateInput, [field]: e.target.value })}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="border border-gray-600 bg-gray-700 text-gray-100 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              />
            ))}
          </div>
          <button
            onClick={handleGenerate}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h-3m3 0h3"></path>
            </svg>
            Generate Emails
          </button>
        </div>

        {/* Verify Email */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-7xl mx-auto mb-6">
          <div className="flex items-center mb-4">
            <svg className="w-6 h-6 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <h2 className="text-xl font-semibold text-gray-100">Verify Email</h2>
          </div>
          <input
            type="text"
            value={verifyEmail}
            onChange={(e) => setVerifyEmail(e.target.value)}
            placeholder="Enter email to verify"
            className="border border-gray-600 bg-gray-700 text-gray-100 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />
          <button
            onClick={handleVerify}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Verify Email
          </button>
          {verifyResult && (
            <p className="mt-2 text-gray-300">
              Status:{" "}
              <span className={verifyResult.status === 'valid' ? 'text-green-400' : 'text-red-400'}>
                {verifyResult.status}
              </span>
              , Reason: {verifyResult.reason || "N/A"}
            </p>
          )}
        </div>

        {/* Manage CSVs */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-7xl mx-auto">
          <div className="flex items-center mb-4">
            <svg className="w-6 h-6 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 0115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            <h2 className="text-xl font-semibold text-gray-100">Manage CSVs</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-300 mb-2">Emails CSV:</p>
              <input
                type="file"
                accept=".csv"
                onChange={(e) => handleCsvUpload(e.target.files[0], "emails")}
                className="border border-gray-600 bg-gray-700 text-gray-100 p-2 rounded-lg w-full"
              />
              <ul className="mt-2 text-gray-300">
                {emails.map((email, index) => (
                  <li key={index} className="py-1">{email}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-gray-300 mb-2">From Emails CSV:</p>
              <input
                type="file"
                accept=".csv"
                onChange={(e) => handleCsvUpload(e.target.files[0], "from_emails")}
                className="border border-gray-600 bg-gray-700 text-gray-100 p-2 rounded-lg w-full"
              />
              <ul className="mt-2 text-gray-300">
                {fromEmails.map((email, index) => (
                  <li key={index} className="py-1">{email}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default EmailManagement;
