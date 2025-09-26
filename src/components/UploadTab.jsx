import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";

function UploadTab() {
  const { user } = useUser();
  const [campaignType, setCampaignType] = useState(null);
  const [campaignName, setCampaignName] = useState("");
  const [showNameModal, setShowNameModal] = useState(false);
  const [tempName, setTempName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [createdCampaignId, setCreatedCampaignId] = useState(null);
  const [fetchedCampaign, setFetchedCampaign] = useState(null);

  // New state for existing campaigns
  const [showCampaignListModal, setShowCampaignListModal] = useState(false);
  const [campaignList, setCampaignList] = useState([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "text/csv") {
      setSelectedFile(file);
    } else {
      alert("Please upload a valid CSV file.");
      setSelectedFile(null);
    }
  };

  const handlesend = async () => {

    

     try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/send-mail`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            userId: user._id,
            campaignId: createdCampaignId, 
            // subject: "Welcome to our campaign!",
            // body: "Hello, this is a test email from the campaign system.",
            fromEmail: "kay@ovam.dev"
          }),
          credentials: 'include'
        });

        const data = await res.json();

        if (data.success) {
          // setFetchedCampaign(data.campaign);
        } else {
          alert("Failed to fetch campaign data: " + data.message);
        }
      } catch (err) {
        console.error(err);
        alert("Error fetching campaign data.");
      }

  }

  const handleNewCampaignClick = () => {
    setCampaignType("new");
    setShowNameModal(true);
  };

  const handleExistingCampaignClick = async () => {
    setCampaignType("existing");
    setShowCampaignListModal(true);

    try {
      setLoadingCampaigns(true);
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/campaign-list`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id }),
      });

      const data = await res.json();
      if (data.success) {
        setCampaignList(data.campaigns);
      } else {
        alert("Failed to fetch campaigns: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching campaigns.");
    } finally {
      setLoadingCampaigns(false);
    }
  };

  const handleNameSubmit = () => {
    if (!tempName.trim()) {
      alert("Please enter a campaign name.");
      return;
    }
    setCampaignName(tempName.trim());
    setShowNameModal(false);
  };

  const handleSelectExistingCampaign = (campaign) => {
    setCampaignName(campaign.name);
    setCreatedCampaignId(campaign._id); // set the selected campaign ID
    setShowCampaignListModal(false);
  };

const handleUpload = async () => {
  if (!selectedFile || !campaignName) {
    alert("Please choose a CSV file and enter a campaign name.");
    return;
  }

  const formData = new FormData();
  formData.append("csv", selectedFile);
  formData.append("campaignName", campaignName);
  formData.append("userId", user._id);

  // If existing, also send campaignId
  if (campaignType === "existing") {
    formData.append("campaignId", createdCampaignId);
  }

  try {
    const endpoint =
      campaignType === "new"
        ? `${import.meta.env.VITE_BACKEND_URL}/campaign-upload`
        : `${import.meta.env.VITE_BACKEND_URL}/campaign-edit`;

    const res = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      alert(
        campaignType === "new"
          ? "Campaign created successfully!"
          : "Campaign updated successfully!"
      );
      setCreatedCampaignId(data.campaignId || createdCampaignId);

      // reset file only, keep campaign selection
      setSelectedFile(null);

      // 🔥 Immediately fetch the updated campaign data after edit
      if (campaignType === "existing") {
        const res2 = await fetch(`${import.meta.env.VITE_BACKEND_URL}/campaign-data`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            campaignId: data.campaignId || createdCampaignId,
          }),
        });
        const data2 = await res2.json();
        if (data2.success) {
          setFetchedCampaign(data2.campaign);
        }
      }
    } else {
      alert("Failed: " + data.message);
    }
  } catch (err) {
    console.error(err);
    alert("Error uploading campaign.");
  }
};


  // Fetch campaign data when created/selected
  useEffect(() => {
    const fetchCampaignData = async () => {
      if (!createdCampaignId) return;

      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/campaign-data`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ campaignId: createdCampaignId }),
        });

        const data = await res.json();
        if (data.success) {
          setFetchedCampaign(data.campaign);
        } else {
          alert("Failed to fetch campaign data: " + data.message);
        }
      } catch (err) {
        console.error(err);
        alert("Error fetching campaign data.");
      }
    };

    fetchCampaignData();
  }, [createdCampaignId]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-gray-100">Upload CSV</h2>

      {/* Campaign Type Selection */}
      <div className="flex space-x-6 mb-8">
        <button
          onClick={handleNewCampaignClick}
          className={`px-6 py-3 rounded-lg text-lg font-medium transition-colors duration-200 ${
            campaignType === "new"
              ? "bg-indigo-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
          }`}
        >
          New Campaign
        </button>
        <button
          onClick={handleExistingCampaignClick}
          className={`px-6 py-3 rounded-lg text-lg font-medium transition-colors duration-200 ${
            campaignType === "existing"
              ? "bg-indigo-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
          }`}
        >
          Existing Campaign
        </button>

         {/* <button
          onClick={handlesend}
          className={`px-6 py-3 rounded-lg text-lg font-medium transition-colors duration-200 bg-indigo-600 text-white`}
         >
          Send Mail
        </button> */}

      </div>

      {/* If new campaign is selected and has name */}
      {campaignType === "new" && campaignName && (
        <div className="mb-6">
          <p className="text-gray-300">
            Selected Campaign Name:{" "}
            <span className="font-semibold text-indigo-400">
              {campaignName}
            </span>
          </p>
        </div>
      )}

      {/* If existing campaign is selected and has name */}
      {campaignType === "existing" && campaignName && (
        <div className="mb-6">
          <p className="text-gray-300">
            Selected Existing Campaign:{" "}
            <span className="font-semibold text-indigo-400">
              {campaignName}
            </span>
          </p>
        </div>
      )}

      {/* CSV Upload section */}
      {campaignType &&
        ((campaignType === "new" && campaignName) ||
          campaignType === "existing") && (
          <div className="mt-6">
            <label className="block w-full p-6 border-2 border-dashed border-gray-600 rounded-lg text-center cursor-pointer hover:border-indigo-500 hover:bg-gray-700 transition">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
              />
              <p className="text-gray-300">
                {selectedFile ? (
                  <>
                    <span className="font-semibold text-indigo-400">
                      {selectedFile.name}
                    </span>{" "}
                    selected
                  </>
                ) : (
                  "Click to choose a CSV file"
                )}
              </p>
            </label>

            {selectedFile && (
              <button
                onClick={handleUpload}
                className="mt-6 px-6 py-3 rounded-lg text-lg font-medium transition-colors duration-200 bg-indigo-600 text-white hover:bg-indigo-700"
              >
                {campaignType === "new"
                  ? "Upload & Create Campaign"
                  : "Upload & Update Campaign"}
              </button>
            )}
          </div>
        )}

      {/* Display created/selected campaign */}
      {fetchedCampaign && (
        <div className="mt-8 p-6 bg-gray-700 rounded-lg border border-gray-600">
          <h3 className="text-xl font-semibold text-indigo-400 mb-4">
            ✅ Campaign Loaded
          </h3>
          <button
          onClick={handlesend}
          className={`px-6 py-3 rounded-lg text-lg font-medium transition-colors duration-200 bg-indigo-600 text-white`}
        >
          Send Mail
        </button>

          <p className="text-gray-300 mb-4">
            <span className="font-semibold">Name:</span>{" "}
            {fetchedCampaign.name}
          </p>

          {fetchedCampaign.data && fetchedCampaign.data.length > 1 ? (
            <div className="overflow-x-auto max-h-80 overflow-y-auto">
              <table className="min-w-full border border-gray-600 rounded-lg overflow-hidden">
                <thead className="bg-gray-800 sticky top-0">
                  <tr>
                    <th className="px-4 py-2 border-b border-gray-600 text-left text-gray-300">
                      First Name
                    </th>
                    <th className="px-4 py-2 border-b border-gray-600 text-left text-gray-300">
                      Last Name
                    </th>
                    <th className="px-4 py-2 border-b border-gray-600 text-left text-gray-300">
                      Full Name
                    </th>
                    <th className="px-4 py-2 border-b border-gray-600 text-left text-gray-300">
                      Email
                    </th>
                    <th className="px-4 py-2 border-b border-gray-600 text-left text-gray-300">
                      Domain
                    </th>
                    <th className="px-4 py-2 border-b border-gray-600 text-left text-gray-300">
                      Company
                    </th>
                    <th className="px-4 py-2 border-b border-gray-600 text-left text-gray-300">
                      isVerified
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {fetchedCampaign.data.slice(1).map((row, index) => (
                    <tr
                      key={index}
                      className={
                        index % 2 === 0 ? "bg-gray-700" : "bg-gray-800"
                      }
                    >
                      <td className="px-4 py-2 border-b border-gray-600 text-gray-200">
                        {row.firstName}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-600 text-gray-200">
                        {row.lastName}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-600 text-gray-200">
                        {row.fullName}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-600 text-gray-200">
                        {row.email}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-600 text-gray-200">
                        {row.domain}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-600 text-gray-200">
                        {row.companyName}
                      </td>
                     <td className="px-4 py-2 border-b border-gray-600 text-gray-200">
                        {row.isVerified ? "true" : "false"}
                     </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-400">No data found in this campaign.</p>
          )}
        </div>
      )}

      {/* Name Modal (New Campaign) */}
      {showNameModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-600 w-96">
            <h3 className="text-xl font-semibold mb-4 text-gray-100">
              Enter Campaign Name
            </h3>
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Campaign Name"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowNameModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-600 text-gray-200 hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleNameSubmit}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Campaign List Modal (Existing Campaigns) */}
      {showCampaignListModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-600 w-96 max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4 text-gray-100">
              Select Existing Campaign
            </h3>

            {loadingCampaigns ? (
              <p className="text-gray-400">Loading campaigns...</p>
            ) : campaignList.length > 0 ? (
              <ul className="space-y-3">
                {campaignList.map((c) => (
                  <li
                    key={c._id}
                    className="px-4 py-2 bg-gray-700 rounded-lg text-gray-200 cursor-pointer hover:bg-indigo-600 hover:text-white transition"
                    onClick={() => handleSelectExistingCampaign(c)}
                  >
                    {c.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No campaigns found.</p>
            )}

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowCampaignListModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-600 text-gray-200 hover:bg-gray-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadTab;
