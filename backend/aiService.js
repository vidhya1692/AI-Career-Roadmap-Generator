const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

async function generateCareerRoadmap(data) {
  const prompt = `
You are an expert career mentor and curriculum designer.

Create a highly personalized and detailed career roadmap.

USER INFORMATION:

Name: ${data.name}
Education: ${data.education}
Current Role: ${data.currentRole}
Target Career: ${data.targetCareer}
Current Skills: ${data.skills}
Experience Level: ${data.experience}
Hours Per Day: ${data.hoursPerDay}
Timeline: ${data.timeline}

Create a practical roadmap based specifically on this user's
current skills, experience, available time, target career and timeline.

The roadmap must include:

1. Career overview
2. Current skill assessment
3. Skill gap analysis
4. Month-by-month roadmap
5. Weekly breakdown
6. Topics to learn
7. Practice tasks
8. Technologies and tools
9. Projects
10. Project features
11. Project deliverables
12. Interview preparation
13. Final portfolio projects
14. Job preparation

Make the roadmap realistic.

Do not give generic advice.

Adapt the difficulty to the user's experience level.

Adapt the amount of work to the user's available hours per day.

Return ONLY valid JSON.

Use this exact structure:

{
  "career": "",
  "summary": "",

  "skillGap": [
    {
      "skill": "",
      "currentLevel": "",
      "targetLevel": "",
      "priority": ""
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
`;

  const response = await client.chat.completions.create({
    model: "openai/gpt-oss-120b",

    messages: [
      {
        role: "system",
        content:
          "You are an expert career roadmap generator. Return only valid JSON.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],

    temperature: 0.7,

    response_format: {
      type: "json_object",
    },
  });

  const content = response.choices[0].message.content;

  return JSON.parse(content);
}

module.exports = {
  generateCareerRoadmap,
};
