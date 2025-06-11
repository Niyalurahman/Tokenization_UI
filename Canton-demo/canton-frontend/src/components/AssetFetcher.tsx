import { useState } from "react";

export default function AssetFetcher() {
  const [templateId, setTemplateId] = useState("");
  const [contractId, setContractId] = useState("");
  const [payload, setPayload] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expandedField, setExpandedField] = useState<string | null>(null);

  const handleFetch = async () => {
    if (!templateId.trim() || !contractId.trim()) {
      setError("Please fill in both Template ID and Contract ID");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/assets/fetch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          templateId,
          contractId,
        }),
      });
      const data = await res.json();
      setPayload(data.result.payload);
    } catch (err) {
      console.error("Error fetching asset:", err);
      setError("Failed to fetch asset. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const truncateString = (str: string, maxLength: number = 20) => {
    if (!str) return "";
    return str.length > maxLength ? `${str.substring(0, maxLength)}...` : str;
  };

  const toggleExpand = (fieldName: string) => {
    setExpandedField(expandedField === fieldName ? null : fieldName);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-t-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Asset Fetcher</h2>
        <p className="text-blue-100">Retrieve asset information using Template and Contract IDs</p>
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-b-xl shadow-lg p-6 border-t-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Template ID
            </label>
            <input
              placeholder="Enter template identifier"
              value={templateId}
              onChange={(e) => setTemplateId(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contract ID
            </label>
            <input
              placeholder="Enter contract identifier"
              value={contractId}
              onChange={(e) => setContractId(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <button
          onClick={handleFetch}
          disabled={loading}
          className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg"
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Fetching...
            </span>
          ) : (
            "Fetch Asset"
          )}
        </button>
      </div>

      {/* Results Section */}
      {payload && (
        <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4">
            <h3 className="text-xl font-bold text-white flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Asset Information
            </h3>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Asset Name</label>
                  <p className="text-lg font-medium text-gray-900 mt-1">{payload.name || "N/A"}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Instrument ID</label>
                  <p className="text-lg font-medium text-gray-900 mt-1 font-mono">{payload.instrumentId || "N/A"}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Supply</label>
                  <p className="text-lg font-medium text-gray-900 mt-1">{payload.totalSupply?.toLocaleString() || "N/A"}</p>
                </div>
              </div>

              {/* Financial Information */}
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Price</label>
                  <p className="text-lg font-medium text-gray-900 mt-1">{payload.price || "N/A"}</p>
                </div>
                
                {/* Issuer Field with Expand/Collapse */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Issuer</label>
                    {payload.issuer && payload.issuer.length > 20 && (
                      <button
                        onClick={() => toggleExpand('issuer')}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                      >
                        {expandedField === 'issuer' ? 'Show Less' : 'Show More'}
                      </button>
                    )}
                  </div>
                  <p className="text-lg font-medium text-gray-900 font-mono break-all">
                    {expandedField === 'issuer' 
                      ? payload.issuer 
                      : truncateString(payload.issuer) || "N/A"
                    }
                  </p>
                </div>
                
                {/* Investor Field with Expand/Collapse */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Investor</label>
                    {payload.investor && payload.investor.length > 20 && (
                      <button
                        onClick={() => toggleExpand('investor')}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                      >
                        {expandedField === 'investor' ? 'Show Less' : 'Show More'}
                      </button>
                    )}
                  </div>
                  <p className="text-lg font-medium text-gray-900 font-mono break-all">
                    {expandedField === 'investor' 
                      ? payload.investor 
                      : truncateString(payload.investor) || "N/A"
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}