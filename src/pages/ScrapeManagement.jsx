import { useState } from 'react';
import Navbar from '../components/Navbar';

const dummyScrapeResult = {
  domain: "linkedin.com",
  emails: ["test1@company.com", "test2@company.com"],
};

function ScrapeManagement() {
  const [scrapeData, setScrapeData] = useState(dummyScrapeResult);
  const [query, setQuery] = useState("CEO");
  const [country, setCountry] = useState("USA");
  const [maxProfiles, setMaxProfiles] = useState(20);

  const handleScrape = async () => {
    try {
      console.log("Start scraping with:", { query, country, maxProfiles });
    } catch (err) {
      console.error("Scrape error:", err);
    }
  };

  return (
    <div className="flex bg-gray-700 min-h-screen text-gray-100">
      {/* Sidebar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6">
        <h1 className="text-3xl font-extrabold text-gray-100 mb-6 tracking-tight max-w-7xl mx-auto">
          Scrape Management
        </h1>

        {/* Scrape Config Card */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-7xl mx-auto">
          <div className="flex items-center mb-4">
            <svg
              className="w-6 h-6 text-blue-400 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <h2 className="text-xl font-semibold text-gray-100">Configure Scrape</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search query (e.g., CEO)"
              className="border border-gray-600 bg-gray-700 text-gray-100 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            />
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country (e.g., USA)"
              className="border border-gray-600 bg-gray-700 text-gray-100 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            />
            <input
              type="number"
              value={maxProfiles}
              onChange={(e) => setMaxProfiles(e.target.value)}
              placeholder="Max profiles"
              className="border border-gray-600 bg-gray-700 text-gray-100 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            />
          </div>

          <button
            onClick={handleScrape}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              ></path>
            </svg>
            Start Scraping
          </button>
        </div>

        {/* Results Card */}
        <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg max-w-7xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-100 mb-4">Scrape Results</h2>
          <p className="text-gray-300">Domain: {scrapeData.domain}</p>
          <p className="text-gray-300">Emails: {scrapeData.emails.join(", ")}</p>
          <button
            onClick={() => console.log("Download emails.csv")}
            className="mt-4 bg-gray-700 text-gray-100 px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200 flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              ></path>
            </svg>
            Download emails.csv
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScrapeManagement;
