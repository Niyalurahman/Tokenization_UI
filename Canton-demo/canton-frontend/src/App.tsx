import AssetForm from "./components/AssetForm";
import AssetFetcher from "./components/AssetFetcher";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Canton Asset Portal</h1>
      <div className="max-w-2xl mx-auto space-y-8">
        <AssetForm />
        <AssetFetcher />
      </div>
    </div>
  );
}

export default App;
