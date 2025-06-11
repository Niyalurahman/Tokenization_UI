import { useState } from "react";

export default function AssetForm() {
  const [form, setForm] = useState({
    templateId: "",
    issuer: "",
    investor: "",
    name: "",
    instrumentId: "",
    totalSupply: 0,
    price: "",
  });

  const [contractId, setContractId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expandedContract, setExpandedContract] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!form.templateId.trim() || !form.name.trim() || !form.issuer.trim()) {
      setError("Please fill in required fields: Template ID, Name, and Issuer");
      return;
    }

    setLoading(true);
    setError("");
    setContractId("");

    const payload = {
      templateId: form.templateId,
      payload: {
        issuer: form.issuer,
        investor: form.investor,
        name: form.name,
        instrumentId: form.instrumentId,
        totalSupply: Number(form.totalSupply),
        price: form.price,
      },
    };

    try {
      const res = await fetch("http://localhost:5000/api/assets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setContractId(data.contractId);
    } catch (err) {
      console.error("Error creating asset:", err);
      setError("Failed to create asset. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const truncateString = (str: string, maxLength: number = 30) => {
    if (!str) return "";
    return str.length > maxLength ? `${str.substring(0, maxLength)}...` : str;
  };

  const fieldLabels = {
    templateId: "Template ID *",
    issuer: "Issuer *",
    investor: "Investor",
    name: "Asset Name *",
    instrumentId: "Instrument ID",
    totalSupply: "Total Supply",
    price: "Price",
  };

  const fieldPlaceholders = {
    templateId: "Enter template identifier",
    issuer: "Enter issuer address or identifier",
    investor: "Enter investor address or identifier",
    name: "Enter asset name",
    instrumentId: "Enter instrument identifier",
    totalSupply: "Enter total supply amount",
    price: "Enter asset price",
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-t-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Create New Asset</h2>
        <p className="text-purple-100">Fill in the details to create a new digital asset</p>
      </div>

      {/* Form Section */}
      <div className="bg-white rounded-b-xl shadow-lg p-6 border-t-0">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Object.entries(fieldLabels).map(([field, label]) => (
              <div key={field} className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  {label}
                </label>
                <input
                  name={field}
                  type={field === 'totalSupply' ? 'number' : 'text'}
                  placeholder={fieldPlaceholders[field as keyof typeof fieldPlaceholders]}
                  value={form[field as keyof typeof form]}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  min={field === 'totalSupply' ? '0' : undefined}
                />
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Asset...
                </span>
              ) : (
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Create Asset
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Success Result Section */}
      {contractId && (
        <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4">
            <h3 className="text-xl font-bold text-white flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Asset Created Successfully!
            </h3>
          </div>
          
          <div className="p-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Contract ID
                </label>
                {contractId.length > 30 && (
                  <button
                    onClick={() => setExpandedContract(!expandedContract)}
                    className="text-green-600 hover:text-green-800 text-sm font-medium transition-colors"
                  >
                    {expandedContract ? 'Show Less' : 'Show More'}
                  </button>
                )}
              </div>
              <div className="flex items-center space-x-3">
                <code className="text-lg font-medium text-gray-900 font-mono break-all bg-white p-2 rounded border flex-1">
                  {expandedContract ? contractId : truncateString(contractId)}
                </code>
                <button
                  onClick={() => navigator.clipboard.writeText(contractId)}
                  className="bg-green-100 hover:bg-green-200 text-green-700 p-2 rounded-lg transition-colors"
                  title="Copy to clipboard"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Save this Contract ID to fetch your asset later
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}