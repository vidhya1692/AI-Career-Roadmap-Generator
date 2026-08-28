import { useState } from "react";
import CareerForm from "./components/CareerForm.jsx";
import API from "./services/api.js";
import "./App.css";

function App() {
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async (formData) => {
    try {
      setLoading(true);
      setError("");
      setRoadmap(null);

      console.log("Sending data:", formData);

      const response = await API.post("/roadmaps/generate", formData);

      console.log("Backend response:", response.data);

      setRoadmap(response.data);
    } catch (err) {
      console.error("API ERROR:", err);

      if (err.response) {
        console.error("Server response:", err.response.data);
        setError(err.response.data?.error || "Server error. Please try again.");
      } else if (err.request) {
        setError(
          "Cannot connect to the backend. Make sure the Express server is running on port 5000.",
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      {/* HEADER */}
      <header className="app-header">
        <div className="logo">CareerAI</div>

        <div className="header-badge">AI Career Planner</div>
      </header>

      {/* MAIN CONTENT */}
      <main>
        {/* HERO */}
        <section className="hero">
          <p className="hero-label">AI-POWERED CAREER PLANNING</p>

          <h1>
            Build your career.
            <br />
            <span>One roadmap at a time.</span>
          </h1>

          <p className="hero-description">
            Tell us where you are and where you want to go. We'll create a
            personalized career roadmap based on your skills, experience and
            goals.
          </p>
        </section>

        {/* CAREER FORM */}
        <CareerForm onGenerate={handleGenerate} />

        {/* LOADING */}
        {loading && (
          <div className="loading">
            <div className="spinner"></div>

            <p>Creating your personalized roadmap...</p>
          </div>
        )}

        {/* ERROR */}
        {error && <div className="error-message">{error}</div>}

        {/* ROADMAP */}
        {roadmap && !loading && (
          <section className="roadmap-section">
            <div className="roadmap-header">
              <p>YOUR PERSONALIZED ROADMAP</p>

              <h2>{roadmap.targetCareer}</h2>

              <span>
                {roadmap.timeline} • {roadmap.hoursPerDay} hours/day
              </span>
            </div>

            <div className="roadmap-grid">
              {roadmap.months?.map((month, index) => (
                <div className="roadmap-card" key={index}>
                  <div className="month-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <h3>{month.month}</h3>

                  <h4>{month.title}</h4>

                  <ul>
                    {month.topics?.map((topic, topicIndex) => (
                      <li key={topicIndex}>{topic}</li>
                    ))}
                  </ul>

                  <div className="project">
                    <strong>PROJECT</strong>

                    <p>{month.project}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
