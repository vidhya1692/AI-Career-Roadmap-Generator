import { useState } from "react";
import CareerForm from "./components/CareerForm.jsx";
import API from "./services/api.js";

function App() {
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async (formData) => {
    try {
      setLoading(true);
      setError("");
      setRoadmap(null);

      const response = await API.post("/roadmaps/generate", formData);

      console.log("API RESPONSE:", response.data);

      setRoadmap(response.data);
    } catch (err) {
      console.error("API ERROR:", err);

      if (err.response) {
        setError(
          err.response.data?.message || "Server error. Please try again.",
        );
      } else if (err.request) {
        setError(
          "Unable to connect to the server. Please check that the backend is running.",
        );
      } else {
        setError("Unable to generate roadmap. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <CareerForm onGenerate={handleGenerate} />

      {loading && (
        <div>
          <p>Generating your career roadmap...</p>
        </div>
      )}

      {error && (
        <div>
          <p>{error}</p>
        </div>
      )}

      {roadmap && (
        <div>
          <h2>Your Career Roadmap</h2>

          <pre>{JSON.stringify(roadmap, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
