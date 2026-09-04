const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

async function generateCareerRoadmap(data) {
  const prompt = `
You are an expert career mentor and curriculum designer.

Create a practical, personalized 6-month career roadmap.

USER INFORMATION:
Name: ${data.name || ""}
Education: ${data.education || ""}
Current Role: ${data.currentRole || ""}
Target Career: ${data.targetCareer || ""}
Current Skills: ${data.skills || ""}
Experience Level: ${data.experience || ""}
Hours Per Day: ${data.hoursPerDay || ""}
Timeline: ${data.timeline || ""}

RULES:
- Make the roadmap specific to the target career.
- Consider current skills and experience.
- Respect the user's available hours per day.
- Make the plan realistic.
- Avoid generic advice.
- Keep descriptions concise.
- Return ONLY valid JSON.
- Do NOT use Markdown.
- Do NOT use code fences.

Return exactly this structure:

{
  "career": "",
  "summary": "",
  "skillGap": [
    {
      "skill": "",
      "currentLevel": "",
      "targetLevel": "",
      "priority": "High"
    }
  ],
  "months": [
    {
      "month": 1,
      "title": "",
      "goal": "",
      "technologies": [],
      "weeks": [
        {
          "week": 1,
          "topics": [],
          "practice": [],
          "resources": [],
          "deliverable": ""
        },
        {
          "week": 2,
          "topics": [],
          "practice": [],
          "resources": [],
          "deliverable": ""
        },
        {
          "week": 3,
          "topics": [],
          "practice": [],
          "resources": [],
          "deliverable": ""
        },
        {
          "week": 4,
          "topics": [],
          "practice": [],
          "resources": [],
          "deliverable": ""
        }
      ],
      "project": {
        "title": "",
        "description": "",
        "skills": [],
        "features": [],
        "deliverables": []
      }
    }
  ],
  "interviewPreparation": [
    {
      "topic": "",
      "questions": [],
      "practice": []
    }
  ],
  "finalProjects": [
    {
      "title": "",
      "description": "",
      "technologies": [],
      "features": []
    }
  ]
}

STRICT REQUIREMENTS:
1. months MUST contain exactly 6 months.
2. Each month MUST contain exactly 4 weeks.
3. Each week MUST contain topics, practice, resources and deliverable.
4. Each month MUST contain exactly one project.
5. Include interview preparation.
6. Include final portfolio projects.
7. Keep arrays concise.
8. Do not generate unnecessary text.
9. Return valid JSON only.
`;

  try {
    const response = await client.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "system",
          content:
            "You are an expert career roadmap generator. Return ONLY valid JSON.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
      max_tokens: 5000,
      response_format: {
        type: "json_object",
      },
    });

    const content = response.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("AI returned an empty response.");
    }

    console.log("AI response received successfully.");

    let roadmap;

    try {
      roadmap = JSON.parse(content);
    } catch (parseError) {
      console.error("JSON PARSE ERROR:", parseError);
      console.error("RAW AI RESPONSE:", content);
      throw new Error("AI returned invalid JSON.");
    }

    if (!roadmap || typeof roadmap !== "object") {
      throw new Error("AI response is not a valid object.");
    }

    if (!roadmap.career) {
      roadmap.career = data.targetCareer || "Career Roadmap";
    }

    if (!roadmap.summary) {
      roadmap.summary =
        "A personalized career roadmap based on the user's goals, skills, experience, and available time.";
    }

    if (!Array.isArray(roadmap.skillGap)) {
      roadmap.skillGap = [];
    }

    if (!Array.isArray(roadmap.months)) {
      roadmap.months = [];
    }

    if (!Array.isArray(roadmap.interviewPreparation)) {
      roadmap.interviewPreparation = [];
    }

    if (!Array.isArray(roadmap.finalProjects)) {
      roadmap.finalProjects = [];
    }

    console.log("AI generated months:", roadmap.months.length);

    roadmap.months.forEach((month, index) => {
      console.log(
        `Month ${index + 1} weeks:`,
        Array.isArray(month.weeks) ? month.weeks.length : 0,
      );
    });

    return roadmap;
  } catch (error) {
    console.error("=================================");
    console.error("AI ERROR:");

    if (error.status === 429) {
      console.error("GROQ RATE LIMIT REACHED");
      console.error("Please wait and try again later.");
    }

    console.error(error);
    console.error("=================================");

    throw error;
  }
}

module.exports = {
  generateCareerRoadmap,
};
