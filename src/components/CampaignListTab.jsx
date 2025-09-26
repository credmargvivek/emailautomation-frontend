import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { Edit3, Trash2 } from "lucide-react";

function CampaignListTab() {
  const { user, loading: userLoading } = useUser();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit modal state
  const [editCampaign, setEditCampaign] = useState(null);
  const [editName, setEditName] = useState("");
  const [editLoading, setEditLoading] = useState(false);

  // Fetch campaigns for this user
  useEffect(() => {
    if (userLoading) return; // Wait until user is loaded
    if (!user?._id) {
      setLoading(false);
      return;
    }

    const fetchCampaigns = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/campaign-list`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user._id }),
        });

        const data = await res.json();

        if (data.success) {
          setCampaigns(data.campaigns || []);
        } else {
          alert("Failed to fetch campaigns: " + data.message);
        }
      } catch (err) {
        console.error("Error fetching campaigns:", err);
        alert("Error fetching campaigns.");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [user, userLoading]);

  // Open edit modal
  const handleEdit = (campaign) => {
    setEditCampaign(campaign);
    setEditName(campaign.name);
  };

  // Delete campaign
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this campaign?")) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/campaign-delete/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.success) {
        setCampaigns((prev) => prev.filter((c) => c._id !== id));
      } else {
        alert("Failed to delete campaign: " + data.message);
      }
    } catch (err) {
      console.error("Error deleting campaign:", err);
      alert("Error deleting campaign.");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-100">
        Campaign List
      </h2>

      {loading ? (
        <p className="text-gray-400">Loading campaigns...</p>
      ) : campaigns.length === 0 ? (
        <p className="text-gray-400">No campaigns found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-600 rounded-lg overflow-hidden">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-4 py-2 border-b border-gray-600 text-left text-gray-300">
                  Campaign Name
                </th>
                <th className="px-4 py-2 border-b border-gray-600 text-gray-300 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign, index) => (
                <tr
                  key={campaign._id}
                  className={index % 2 === 0 ? "bg-gray-700" : "bg-gray-800"}
                >
                  <td className="px-4 py-2 border-b border-gray-600 text-gray-200">
                    {campaign.name}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-600 text-gray-200 text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => handleEdit(campaign)}
                        className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
                        title="Edit Campaign"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(campaign._id)}
                        className="p-2 rounded-full bg-red-600 hover:bg-red-700 text-white"
                        title="Delete Campaign"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Campaign Modal */}
      {editCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-600 w-96">
            <h3 className="text-xl font-semibold mb-4 text-gray-100">
              Edit Campaign
            </h3>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Campaign Name"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setEditCampaign(null)}
                className="px-4 py-2 rounded-lg bg-gray-600 text-gray-200 hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  if (!editName.trim()) {
                    alert("Campaign name cannot be empty.");
                    return;
                  }
                  setEditLoading(true);
                  try {
                    const res = await fetch(
                      `${import.meta.env.VITE_BACKEND_URL}/campaign-edit/${editCampaign._id}`,
                      {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ name: editName.trim() }),
                      }
                    );
                    const data = await res.json();
                    if (data.success) {
                      setCampaigns((prev) =>
                        prev.map((c) =>
                          c._id === editCampaign._id
                            ? { ...c, name: editName }
                            : c
                        )
                      );
                      setEditCampaign(null);
                    } else {
                      alert("Failed to update campaign: " + data.message);
                    }
                  } catch (err) {
                    console.error(err);
                    alert("Error updating campaign.");
                  } finally {
                    setEditLoading(false);
                  }
                }}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
              >
                {editLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CampaignListTab;
