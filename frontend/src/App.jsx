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

      console.log("========== ROADMAP RESPONSE ==========");
      console.log(response.data);
      console.log("MONTHS:", response.data?.months);
      console.log("SKILL GAP:", response.data?.skillGap);
      console.log("======================================");

      setRoadmap(response.data);
    } catch (err) {
      console.error("API ERROR:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to generate roadmap. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const renderValue = (value) => {
    if (value === null || value === undefined) return "";

    if (typeof value === "string" || typeof value === "number") {
      return value;
    }

    if (Array.isArray(value)) {
      return value.map((item, index) => (
        <span key={index}>
          {typeof item === "object"
            ? item.title || item.name || item.topic || JSON.stringify(item)
            : item}
          {index < value.length - 1 ? ", " : ""}
        </span>
      ));
    }

    return (
      value.title ||
      value.name ||
      value.description ||
      value.topic ||
      JSON.stringify(value)
    );
  };

  return (
    <div className="app">
      {/* HERO */}
      <header className="hero">
        <span className="badge">AI CAREER PLANNER</span>

        <h1>
          Build Your <span>Career Roadmap</span>
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

              <h2>{roadmap.career || "Your Career Roadmap"}</h2>

              <p>
                {roadmap.summary ||
                  "Your personalized career roadmap has been generated."}
              </p>
            </div>

            {/* SKILL GAP */}
            {Array.isArray(roadmap.skillGap) && roadmap.skillGap.length > 0 && (
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
                  {roadmap.skillGap.map((skill, index) => {
                    const skillName =
                      typeof skill === "string"
                        ? skill
                        : skill.skill || skill.name || skill.title || "Skill";

                    return (
                      <div className="skill-card" key={index}>
                        <div className="skill-top">
                          <h4>{skillName}</h4>

                          {typeof skill === "object" && skill.priority && (
                            <span
                              className={`priority ${String(
                                skill.priority,
                              ).toLowerCase()}`}
                            >
                              {skill.priority}
                            </span>
                          )}
                        </div>

                        {typeof skill === "object" && (
                          <div className="skill-levels">
                            <div>
                              <small>Current</small>
                              <strong>
                                {skill.currentLevel || "Not specified"}
                              </strong>
                            </div>

                            <span>→</span>

                            <div>
                              <small>Target</small>
                              <strong>
                                {skill.targetLevel || "Not specified"}
                              </strong>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* MONTHS */}
            {Array.isArray(roadmap.months) &&
              roadmap.months.length > 0 &&
              roadmap.months.map((month, monthIndex) => {
                const project =
                  month?.project &&
                  typeof month.project === "object" &&
                  !Array.isArray(month.project)
                    ? month.project
                    : null;

                return (
                  <section className="month-card" key={monthIndex}>
                    <div className="month-number">
                      {String(monthIndex + 1).padStart(2, "0")}
                    </div>

                    <div className="month-content">
                      {/* MONTH HEADER */}
                      <div className="month-header">
                        <div>
                          <span className="month-label">
                            MONTH {monthIndex + 1}
                          </span>

                          <h3>
                            {month?.title ||
                              month?.name ||
                              `Month ${monthIndex + 1}`}
                          </h3>
                        </div>
                      </div>

                      {/* GOAL */}
                      {month?.goal && (
                        <div className="goal">
                          <strong>🎯 Goal</strong>
                          <p>{renderValue(month.goal)}</p>
                        </div>
                      )}

                      {/* TECHNOLOGIES */}
                      {Array.isArray(month?.technologies) &&
                        month.technologies.length > 0 && (
                          <div className="technologies">
                            {month.technologies.map((tech, index) => (
                              <span key={index}>
                                {typeof tech === "object"
                                  ? tech.name ||
                                    tech.title ||
                                    JSON.stringify(tech)
                                  : tech}
                              </span>
                            ))}
                          </div>
                        )}

                      {/* WEEKS */}
                      {Array.isArray(month?.weeks) &&
                        month.weeks.length > 0 &&
                        month.weeks.map((week, weekIndex) => (
                          <div className="week-card" key={weekIndex}>
                            <div className="week-heading">
                              <span>WEEK {weekIndex + 1}</span>

                              <h4>
                                {week?.title ||
                                  week?.name ||
                                  week?.topics?.[0] ||
                                  "Learning & Practice"}
                              </h4>
                            </div>

                            {/* TOPICS */}
                            {Array.isArray(week?.topics) &&
                              week.topics.length > 0 && (
                                <div className="week-section">
                                  <h5>📚 Topics</h5>

                                  <ul>
                                    {week.topics.map((topic, index) => (
                                      <li key={index}>{renderValue(topic)}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                            {/* PRACTICE */}
                            {Array.isArray(week?.practice) &&
                              week.practice.length > 0 && (
                                <div className="week-section">
                                  <h5>💻 Practice</h5>

                                  <ul>
                                    {week.practice.map((item, index) => (
                                      <li key={index}>{renderValue(item)}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                            {/* RESOURCES */}
                            {Array.isArray(week?.resources) &&
                              week.resources.length > 0 && (
                                <div className="week-section">
                                  <h5>🔗 Resources</h5>

                                  <ul>
                                    {week.resources.map((resource, index) => (
                                      <li key={index}>
                                        {renderValue(resource)}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                            {/* DELIVERABLE */}
                            {week?.deliverable && (
                              <div className="deliverable">
                                <strong>✓ Deliverable</strong>
                                <span>{renderValue(week.deliverable)}</span>
                              </div>
                            )}
                          </div>
                        ))}

                      {/* PROJECT */}
                      {project && (
                        <div className="project-card">
                          <div className="project-label">🚀 MONTH PROJECT</div>

                          <h3>
                            {project.title || project.name || "Monthly Project"}
                          </h3>

                          {project.description && (
                            <p>{renderValue(project.description)}</p>
                          )}

                          {/* PROJECT SKILLS */}
                          {Array.isArray(project.skills) &&
                            project.skills.length > 0 && (
                              <div className="project-row">
                                <strong>Skills</strong>

                                <div>
                                  {project.skills.map((skill, index) => (
                                    <span key={index}>
                                      {renderValue(skill)}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                          {/* PROJECT FEATURES */}
                          {Array.isArray(project.features) &&
                            project.features.length > 0 && (
                              <div className="project-row">
                                <strong>Features</strong>

                                <ul>
                                  {project.features.map((feature, index) => (
                                    <li key={index}>{renderValue(feature)}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                          {/* PROJECT DELIVERABLES */}
                          {Array.isArray(project.deliverables) &&
                            project.deliverables.length > 0 && (
                              <div className="project-row">
                                <strong>Deliverables</strong>

                                <ul>
                                  {project.deliverables.map(
                                    (deliverable, index) => (
                                      <li key={index}>
                                        {renderValue(deliverable)}
                                      </li>
                                    ),
                                  )}
                                </ul>
                              </div>
                            )}
                        </div>
                      )}

                      {/* PROJECT AS STRING */}
                      {typeof month?.project === "string" &&
                        month.project.trim() && (
                          <div className="project-card">
                            <div className="project-label">
                              🚀 MONTH PROJECT
                            </div>

                            <p>{month.project}</p>
                          </div>
                        )}
                    </div>
                  </section>
                );
              })}

            {/* INTERVIEW */}
            {Array.isArray(roadmap.interviewPreparation) &&
              roadmap.interviewPreparation.length > 0 && (
                <section className="section">
                  <div className="section-title">
                    <span>02</span>

                    <div>
                      <h3>Interview Preparation</h3>
                      <p>
                        Prepare for interviews with targeted questions and
                        practice.
                      </p>
                    </div>
                  </div>

                  <div className="skill-grid">
                    {roadmap.interviewPreparation.map((item, index) => (
                      <div className="skill-card" key={index}>
                        {typeof item === "string" ? (
                          <p>{item}</p>
                        ) : (
                          <>
                            <h4>
                              {item.topic ||
                                item.question ||
                                item.title ||
                                "Interview Topic"}
                            </h4>

                            {item.description && <p>{item.description}</p>}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

            {/* FALLBACK */}
            {(!Array.isArray(roadmap.months) ||
              roadmap.months.length === 0) && (
              <div className="error">
                Roadmap was generated, but no monthly roadmap data was returned
                by the API.
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
