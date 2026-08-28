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

      console.log("Roadmap received:", response.data);

      setRoadmap(response.data);
    } catch (err) {
      console.error("API ERROR:", err);
      setError(
        err.response?.data?.message ||
          "Unable to generate roadmap. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      {/* HERO */}
      <header className="hero">
        <span className="badge">AI CAREER PLANNER</span>

        <h1>
          Build Your
          <span> Career Roadmap</span>
        </h1>

        <p>
          Get a personalized, step-by-step career plan based on your experience,
          skills, goals and available time.
        </p>
      </header>

      <main>
        {/* FORM */}
        <CareerForm onGenerate={handleGenerate} />

        {/* LOADING */}
        {loading && (
          <div className="status">
            <div className="loader"></div>
            <h2>Creating your roadmap...</h2>
            <p>AI is analyzing your skills and building your learning path.</p>
          </div>
        )}

        {/* ERROR */}
        {error && <div className="error">{error}</div>}

        {/* ROADMAP */}
        {roadmap && !loading && (
          <section className="roadmap">
            {/* HEADER */}
            <div className="roadmap-header">
              <span className="badge">YOUR PERSONALIZED ROADMAP</span>

              <h2>{roadmap.career}</h2>

              <p>{roadmap.summary}</p>
            </div>

            {/* SKILL GAP */}
            {roadmap.skillGap && roadmap.skillGap.length > 0 && (
              <section className="section">
                <div className="section-title">
                  <span>01</span>
                  <div>
                    <h3>Skill Gap Analysis</h3>
                    <p>
                      Skills you need to develop to reach your target career.
                    </p>
                  </div>
                </div>

                <div className="skill-grid">
                  {roadmap.skillGap.map((skill, index) => (
                    <div className="skill-card" key={index}>
                      <div className="skill-top">
                        <h4>{skill.skill}</h4>

                        <span
                          className={`priority ${skill.priority?.toLowerCase()}`}
                        >
                          {skill.priority}
                        </span>
                      </div>

                      <div className="skill-levels">
                        <div>
                          <small>Current</small>
                          <strong>{skill.currentLevel}</strong>
                        </div>

                        <span>→</span>

                        <div>
                          <small>Target</small>
                          <strong>{skill.targetLevel}</strong>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* MONTHS */}
            {roadmap.months?.map((month, monthIndex) => (
              <section className="month-card" key={monthIndex}>
                <div className="month-number">
                  {String(monthIndex + 1).padStart(2, "0")}
                </div>

                <div className="month-content">
                  <div className="month-header">
                    <div>
                      <span className="month-label">
                        MONTH {monthIndex + 1}
                      </span>

                      <h3>{month.title}</h3>
                    </div>
                  </div>

                  {month.goal && (
                    <div className="goal">
                      <strong>🎯 Goal</strong>
                      <p>{month.goal}</p>
                    </div>
                  )}

                  {/* TECHNOLOGIES */}
                  {month.technologies?.length > 0 && (
                    <div className="technologies">
                      {month.technologies.map((tech, index) => (
                        <span key={index}>{tech}</span>
                      ))}
                    </div>
                  )}

                  {/* WEEKS */}
                  {month.weeks?.map((week, weekIndex) => (
                    <div className="week-card" key={weekIndex}>
                      <div className="week-heading">
                        <span>WEEK {weekIndex + 1}</span>
                        <h4>{week.topics?.[0] || "Learning & Practice"}</h4>
                      </div>

                      {/* TOPICS */}
                      {week.topics?.length > 0 && (
                        <div className="week-section">
                          <h5>📚 Topics</h5>

                          <ul>
                            {week.topics.map((topic, index) => (
                              <li key={index}>{topic}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* PRACTICE */}
                      {week.practice?.length > 0 && (
                        <div className="week-section">
                          <h5>💻 Practice</h5>

                          <ul>
                            {week.practice.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* RESOURCES */}
                      {week.resources?.length > 0 && (
                        <div className="week-section">
                          <h5>🔗 Resources</h5>

                          <ul>
                            {week.resources.map((resource, index) => (
                              <li key={index}>{resource}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* DELIVERABLE */}
                      {week.deliverable && (
                        <div className="deliverable">
                          <strong>✓ Deliverable</strong>
                          <span>{week.deliverable}</span>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* PROJECT */}
                  {month.project && (
                    <div className="project-card">
                      <div className="project-label">🚀 MONTH PROJECT</div>

                      <h3>{month.project.title}</h3>

                      <p>{month.project.description}</p>

                      {month.project.skills?.length > 0 && (
                        <div className="project-row">
                          <strong>Skills</strong>

                          <div>
                            {month.project.skills.map((skill, index) => (
                              <span key={index}>{skill}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      {month.project.features?.length > 0 && (
                        <div className="project-row">
                          <strong>Features</strong>

                          <ul>
                            {month.project.features.map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {month.project.deliverables?.length > 0 && (
                        <div className="project-row">
                          <strong>Deliverables</strong>

                          <ul>
                            {month.project.deliverables.map(
                              (deliverable, index) => (
                                <li key={index}>{deliverable}</li>
                              ),
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </section>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
