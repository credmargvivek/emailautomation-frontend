import { useState } from "react";
import Navbar from "../components/Navbar";
import UploadTab from "../components/UploadTab";
import CampaignListTab from "../components/CampaignListTab";

function Home() {
  const [activeTab, setActiveTab] = useState("upload");

  return (
    <div className="flex">
      <Navbar />

      <main className="flex-1 ml-64 min-h-screen bg-gray-700 p-8 text-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-gray-100">Home</h1>

        {/* Tab Switcher */}
        <div className="flex space-x-4 border-b border-gray-600 pb-2">
          <button
            onClick={() => setActiveTab("upload")}
            className={`px-4 py-2 text-lg font-medium rounded-t-lg transition-colors duration-200 ${
              activeTab === "upload"
                ? "bg-gray-800 border border-b-0 border-gray-700 text-indigo-400"
                : "text-gray-400 hover:text-indigo-400"
            }`}
          >
            Upload CSV
          </button>
          <button
            onClick={() => setActiveTab("list")}
            className={`px-4 py-2 text-lg font-medium rounded-t-lg transition-colors duration-200 ${
              activeTab === "list"
                ? "bg-gray-800 border border-b-0 border-gray-700 text-indigo-400"
                : "text-gray-400 hover:text-indigo-400"
            }`}
          >
            Campaign List
          </button>
        </div>

        <div className="h-4"></div>

        {/* Tab Content */}
        <div className="bg-gray-800 shadow rounded-lg p-6 border border-gray-700">
          {activeTab === "upload" && <UploadTab />}
          {activeTab === "list" && <CampaignListTab/>}
        </div>
      </main>
    </div>
  );
}

export default Home;
