import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function EmailCountList() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/countEmail`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setEmails(data.emails);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className=" bg-gradient-to-br from-background via-background to-accent/10">
      <Navbar />
      <div className="container mx-auto px-4 ">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-2 mt-8">
            <p className="text-muted-foreground text-lg">
              Track and monitor your email delivery statistics
            </p>
          </div>

          {/* Main Content Card */}
          <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl shadow-elegant p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-card-foreground">
                Mail Sent Count
              </h2>
              <div className="px-4 py-2 bg-primary/10 rounded-full">
                <span className="text-sm font-medium text-primary">
                  Total Records: {emails.length}
                </span>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <span className="text-muted-foreground">Loading email data...</span>
                </div>
              </div>
            ) : emails.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
                  <div className="text-amber-600 dark:text-amber-400 text-lg font-medium mb-2">
                    No Email Data Found
                  </div>
                  <p className="text-amber-700 dark:text-amber-300 text-sm">
                    No emails have been sent yet or data is not available.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Table Header */}
                <div className="grid grid-cols-2 gap-4 px-6 py-4 bg-muted/30 rounded-lg border border-border/30">
                  <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    Email Address
                  </div>
                  <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide text-center">
                    Send Count
                  </div>
                </div>

                {/* Email List */}
                {emails.map((item, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-2 gap-4 px-6 py-4 bg-card hover:bg-accent/5 rounded-lg border border-border/20 transition-all duration-200 hover:shadow-soft group"
                  >
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3 opacity-60 group-hover:opacity-100 transition-opacity"></div>
                      <span className="text-card-foreground font-medium break-all">
                        {item.email}
                      </span>
                    </div>
                    
                    <div className="flex justify-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-primary/10 text-primary border border-primary/20">
                        {item.countSent}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Summary Footer */}
            {emails.length > 0 && (
              <div className="mt-8 pt-6 border-t border-border/30">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-primary/5 rounded-lg">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {emails.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Emails</div>
                  </div>
                  <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                      {emails.reduce((sum, item) => sum + item.countSent, 0)}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Sent</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                      {emails.filter(item => item.countSent > 0).length}
                    </div>
                    <div className="text-sm text-muted-foreground">Active Emails</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailCountList;