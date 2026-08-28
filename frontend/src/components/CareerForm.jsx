import { useState } from "react";
import "./CareerForm.css";

function CareerForm({ onGenerate }) {
  const [formData, setFormData] = useState({
    name: "",
    education: "",
    currentRole: "",
    targetCareer: "",
    skills: "",
    experience: "Beginner",
    hoursPerDay: "",
    timeline: "6 months",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(formData);
  };

  return (
    <div className="career-form-card">
      <div className="form-header">
        <span className="form-badge">AI POWERED</span>

        <h2>Tell us about your career goal</h2>

        <p>
          Give us a few details and we'll create a personalized roadmap for you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="career-form">
        <div className="form-group">
          <label>Your Name</label>
          <input
            type="text"
            name="name"
            placeholder="e.g. Vidhya Pandey"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Education</label>
            <input
              type="text"
              name="education"
              placeholder="e.g. B.Tech CSE"
              value={formData.education}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Current Role</label>
            <input
              type="text"
              name="currentRole"
              placeholder="e.g. Student"
              value={formData.currentRole}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Target Career</label>
          <input
            type="text"
            name="targetCareer"
            placeholder="e.g. Full Stack Developer"
            value={formData.targetCareer}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Current Skills</label>

          <textarea
            name="skills"
            placeholder="e.g. JavaScript, React, Node.js, SQL"
            value={formData.skills}
            onChange={handleChange}
            required
          />

          <small>Separate multiple skills with commas.</small>
        </div>

        <div className="form-row three-columns">
          <div className="form-group">
            <label>Experience Level</label>

            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div className="form-group">
            <label>Hours / Day</label>

            <input
              type="number"
              name="hoursPerDay"
              placeholder="3"
              value={formData.hoursPerDay}
              onChange={handleChange}
              min="1"
              max="16"
              required
            />
          </div>

          <div className="form-group">
            <label>Timeline</label>

            <select
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
            >
              <option value="3 months">3 Months</option>
              <option value="6 months">6 Months</option>
              <option value="9 months">9 Months</option>
              <option value="12 months">12 Months</option>
            </select>
          </div>
        </div>

        <button type="submit" className="generate-btn">
          <span>✨</span>
          Generate My Career Roadmap
        </button>
      </form>
    </div>
  );
}

export default CareerForm;
