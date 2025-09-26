import { useState } from 'react';
import Navbar from '../components/Navbar';

const dummySendResult = {
  success: true,
  total: 2,
  successCount: 1,
  failCount: 1,
  results: [
    { to: "test1@ovam.ai", from: "sender@ovam.ai", status: "sent", messageId: "abc123" },
    { to: "test2@ovam.ai", from: "sender@ovam.ai", status: "failed", error: "Invalid email" },
  ],
};

function Dashboard() {
  const [status, setStatus] = useState({
    lastScrape: "2025-09-15 01:00 AM",
    scrapeEmails: 2,
    lastSend: "2025-09-15 01:10 AM",
    sendSuccess: 1,
    sendTotal: 2,
  });

  const handleScrape = async () => {
    console.log("Trigger scrape");
  };

  const handleSend = async () => {
    console.log("Trigger send emails");
  };

  return (
    <>
      <Navbar />
      <div className="ml-64 min-h-screen bg-gray-700 p-6 text-gray-200">
        <h1 className="text-3xl font-extrabold text-white mb-6 tracking-tight">
          Email Outreach Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {/* Scrape Status Card */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
            <div className="flex items-center mb-4">
              <svg className="w-6 h-6 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h2 className="text-xl font-semibold text-gray-100">Scrape Status</h2>
            </div>
            <p className="text-gray-300">Last Scrape: {status.lastScrape}</p>
            <p className="text-gray-300">Emails Extracted: {status.scrapeEmails}</p>
            <button
              onClick={handleScrape}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
            >
              Start Scraping
            </button>
          </div>

          {/* Send Status Card */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
            <div className="flex items-center mb-4">
              <svg className="w-6 h-6 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h2 className="text-xl font-semibold text-gray-100">Send Status</h2>
            </div>
            <p className="text-gray-300">Last Send: {status.lastSend}</p>
            <p className="text-gray-300">
              Emails Sent: {status.sendSuccess}/{status.sendTotal}
            </p>
            <div className="mt-2">
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-green-500 h-2.5 rounded-full"
                  style={{ width: `${(status.sendSuccess / status.sendTotal) * 100}%` }}
                ></div>
              </div>
            </div>
            <button
              onClick={handleSend}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center"
            >
              Send Emails
            </button>
          </div>
        </div>

        {/* Recent Emails Table */}
        <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg max-w-7xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-100 mb-4">Recent Emails</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-700">
                  <th className="border border-gray-600 p-3 text-left text-gray-200">Email</th>
                  <th className="border border-gray-600 p-3 text-left text-gray-200">Status</th>
                </tr>
              </thead>
              <tbody>
                {dummySendResult.results.map((result, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'} hover:bg-gray-700`}
                  >
                    <td className="border border-gray-700 p-3">{result.to}</td>
                    <td className="border border-gray-700 p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          result.status === 'sent'
                            ? 'bg-green-900 text-green-300'
                            : 'bg-red-900 text-red-300'
                        }`}
                      >
                        {result.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </>
  );
}

export default Dashboard;
