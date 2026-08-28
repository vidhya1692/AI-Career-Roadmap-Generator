const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

async function generateCareerRoadmap(data) {
  const prompt = `
You are an expert career mentor, curriculum designer, and technical hiring advisor.

Create a personalized career roadmap for the following user.

USER INFORMATION:
Name: ${data.name || ""}
Education: ${data.education || ""}
Current Role: ${data.currentRole || ""}
Target Career: ${data.targetCareer || ""}
Current Skills: ${data.skills || ""}
Experience Level: ${data.experience || ""}
Hours Per Day: ${data.hoursPerDay || ""}
Timeline: ${data.timeline || ""}

IMPORTANT REQUIREMENTS:

1. The roadmap MUST contain EXACTLY 6 months.
2. Each month MUST contain EXACTLY 4 weeks.
3. Therefore, the roadmap MUST contain EXACTLY 24 weeks.
4. Every week MUST contain:
   - topics
   - practice
   - resources
   - deliverable
5. Every month MUST contain:
   - month
   - title
   - goal
   - technologies
   - weeks
   - project
6. Adapt the difficulty to the user's current skills and experience.
7. Adapt the workload to the user's available hours per day.
8. Do not give generic advice.
9. Make the roadmap practical and job-oriented.
10. Include realistic projects that progressively increase in difficulty.
11. The final month must include:
    - deployment
    - testing
    - Git/GitHub
    - resume preparation
    - interview preparation
    - portfolio preparation
    - job application preparation
12. Do not recommend obsolete platforms or technologies when modern alternatives are available.
13. Keep resources concise. Use well-known resources such as official documentation, MDN, freeCodeCamp, official framework documentation, etc.
14. Do not include markdown.
15. Do not include explanations outside the JSON.
16. Return ONLY valid JSON.

REQUIRED JSON STRUCTURE:

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
    },

    {
      "month": 2,
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
    },

    {
      "month": 3,
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
    },

    {
      "month": 4,
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
    },

    {
      "month": 5,
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
    },

    {
      "month": 6,
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

FINAL VALIDATION BEFORE RESPONDING:

- months.length MUST equal 6.
- months[0].month MUST equal 1.
- months[1].month MUST equal 2.
- months[2].month MUST equal 3.
- months[3].month MUST equal 4.
- months[4].month MUST equal 5.
- months[5].month MUST equal 6.
- Every months[i].weeks.length MUST equal 4.
- Every week must contain topics, practice, resources and deliverable.
- Return valid JSON only.
`;

  try {
    const response = await client.chat.completions.create({
      model: "openai/gpt-oss-120b",

      messages: [
        {
          role: "system",
          content:
            "You are a strict JSON API. Return ONLY valid JSON. Never return markdown, code fences, comments, or explanatory text.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.4,

      response_format: {
        type: "json_object",
      },
    });

    const content = response.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("AI returned an empty response");
    }

    const roadmap = JSON.parse(content);

    // Server-side validation
    if (!Array.isArray(roadmap.months)) {
      throw new Error("AI response does not contain months");
    }

    if (roadmap.months.length !== 6) {
      throw new Error(
        `AI generated ${roadmap.months.length} months instead of 6`,
      );
    }

    for (let i = 0; i < 6; i++) {
      const month = roadmap.months[i];

      if (month.month !== i + 1) {
        throw new Error(`Invalid month number at position ${i + 1}`);
      }

      if (!Array.isArray(month.weeks) || month.weeks.length !== 4) {
        throw new Error(`Month ${i + 1} must contain exactly 4 weeks`);
      }

      for (let j = 0; j < 4; j++) {
        const week = month.weeks[j];

        if (
          !Array.isArray(week.topics) ||
          !Array.isArray(week.practice) ||
          !Array.isArray(week.resources) ||
          typeof week.deliverable !== "string"
        ) {
          throw new Error(
            `Month ${i + 1}, Week ${j + 1} has an invalid structure`,
          );
        }
      }
    }

    return roadmap;
  } catch (error) {
    console.error("AI ERROR:", error);

    throw new Error(
      "Failed to generate a complete career roadmap. Please try again.",
    );
  }
}

module.exports = {
  generateCareerRoadmap,
};
