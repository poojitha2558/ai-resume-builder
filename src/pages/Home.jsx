import React from "react";
import { useState } from "react";

// Component to display formatted Gemini response
const ResponseDisplay = ({ response }) => {
  if (!response) return null;

  // Parse the response into sections
  const sections = response.split(/\d+\./g).filter(section => section.trim());
  
  const parseSection = (text, index) => {
    const trimmed = text.trim();
    const lines = trimmed.split('\n').filter(line => line.trim());
    const title = lines[0] || `Section ${index + 1}`;
    const content = lines.slice(1).join('\n');
    
    return { title: title.trim(), content: content.trim() };
  };

  const parsedSections = sections.map(parseSection);

  return (
    <div className="response-container mt-4">
      <h2 className="mb-4">Generated Resume Analysis</h2>
      
      {parsedSections.map((section, index) => (
        <div key={index} className="card mb-4">
          <div className="card-header">
            <h4 className="mb-0">{section.title}</h4>
          </div>
          <div className="card-body">
            <div className="response-content">
              {section.content.split('\n').map((line, lineIndex) => (
                <p key={lineIndex} className={line.trim() ? 'mb-2' : 'mb-1'}>
                  {line.trim() || '\u00A0'}
                </p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
const Home = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    applyingAsA: "Experience",
    coverLetterTone: "Formal",
    jobDescription: "",
    currentResume: "",
  });
  const [geminiResponse, setGeminiResponse] = useState("");
  async function handleGenerateResume() {
    console.log("Generating resume with data:", formData);
    const prompt =  ` You are a professional career coach and resume optimization expert. 
Your task is to generate a personalized cover letter, improve the resume content, 
and provide an ATS (Applicant Tracking System) analysis.

Inputs:
Company Name: ${formData.companyName}
Experience Level: ${formData.applyingAsA}  (Fresher / Experienced)
Job Description: ${formData.jobDescription}
Current Resume: ${formData.currentResume} (If empty, assume no resume exists and create a draft)
Preferred Tone: ${formData.coverLetterTone}

Output (format clearly in sections):

1. Tailored Cover Letter  
Write a professional cover letter addressed to ${formData.companyName}.  
Use the specified tone: ${formData.coverLetterTone}.  
Highlight relevant skills and experiences based on the job description.  

2. Updated Resume Content  
Suggest optimized resume summary, bullet points, and skills tailored to ${formData.jobDescription}.  
Ensure the content is concise, achievement-focused, and ATS-friendly.  

3. Keyword Match Analysis  
Extract the most important keywords from the job description.  
Check if they exist in the provided resume (if given).  
List missing keywords that should be added.  

4. ATS Score Estimate (0–100)  
Provide a rough ATS match score for the current resume against the job description.  
Explain the reasoning briefly (e.g., missing keywords, formatting issues, irrelevant content).  

Ensure the response is structured, clear, and easy to display in a React app. 
        `
    const url =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-goog-api-key": import.meta.env.VITE_GEMINI_API_KEY,
      },
      body: `{"contents":[{"parts":[{"text":"${prompt}"}]}]}`,
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log('Generated gemini data: ',data.candidates[0].content.parts[0].text);
      setGeminiResponse(data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="container">
      <div className="hero-section">
        <h1 className="main-title">AI Resume Builder</h1>
        <p className="subtitle">Transform your career with AI-powered resume optimization</p>
      </div>
      <form className="resume-form">
        <div className="form-group">
          <label className="form-label-custom">
            <i className="icon">🏢</i>
            Company Name
          </label>
          <input
            type="text"
            className="form-control-custom"
            placeholder="Enter the company name..."
            value={formData.companyName}
            onChange={(e) =>
              setFormData({ ...FormData, companyName: e.target.value })
            }
          />
          <div className="help-text">
            Enter the company you're applying to
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="experienceLevel" className="form-label-custom">
            <i className="icon">👨‍💼</i>
            Experience Level
          </label>
          <select
            className="form-select-custom"
            id="applyingAsA"
            value={formData.applyingAsA}
            onChange={(e) =>
              setFormData({ ...formData, applyingAsA: e.target.value })
            }
          >
            <option value="Fresher">Fresher</option>
            <option value="Experience">Experience</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="experienceLevel" className="form-label-custom">
            <i className="icon">💼</i>
            Cover Letter Tone
          </label>
          <select
            className="form-select-custom"
            id="coverLetterTone"
            value={formData.coverLetterTone}
            onChange={(e) =>
              setFormData({ ...formData, coverLetterTone: e.target.value })
            }
          >
            <option value="Formal">Formal</option>
            <option value="Informal">Informal</option>
            <option value="casual">Casual</option>
          </select>
          <div className="help-text">
            Choose the tone for your cover letter
          </div>
        </div>
        <div className="form-group">
          <label className="form-label-custom" htmlFor="jobDescription">
            <i className="icon">📋</i>
            Job Description
          </label>
          <textarea
            name="jobDescription"
            id="jobDescription"
            className="textarea-custom"
            rows="6"
            placeholder="Paste the job description here..."
            value={formData.jobDescription}
            onChange={(e) =>
              setFormData({ ...formData, jobDescription: e.target.value })
            }
          ></textarea>
        </div>
        <div className="form-group">
          <label className="form-label-custom" htmlFor="currentResume">
            <i className="icon">📄</i>
            Current Resume
          </label>
          <textarea
            name="currentResume"
            id="currentResume"
            className="textarea-custom"
            rows="6"
            placeholder="Paste your current resume content here..."
            value={formData.currentResume}
            onChange={(e) =>
              setFormData({ ...formData, currentResume: e.target.value })
            }
          ></textarea>
        </div>
        <button
          type="button"
          className="generate-btn"
          onClick={handleGenerateResume}
        >
          <i className="btn-icon">🚀</i>
          Generate AI Resume
        </button>
      </form>
      
      {geminiResponse && <ResponseDisplay response={geminiResponse} />}
      
      <style jsx>{`
        .container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 2rem;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .hero-section {
          text-align: center;
          margin-bottom: 3rem;
          padding: 2rem 0;
        }

        .main-title {
          font-size: 3.5rem;
          font-weight: 800;
          background: linear-gradient(45deg, #fff, #f0f9ff);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 1rem;
          text-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .subtitle {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 0;
        }

        .resume-form {
          max-width: 800px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 3rem;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .form-group {
          margin-bottom: 2rem;
        }

        .form-label-custom {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.75rem;
        }

        .icon {
          font-size: 1.25rem;
        }

        .form-control-custom, 
        .form-select-custom, 
        .textarea-custom {
          width: 100%;
          padding: 1rem 1.25rem;
          font-size: 1rem;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          background: #ffffff;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-family: inherit;
        }

        .form-control-custom:focus, 
        .form-select-custom:focus, 
        .textarea-custom:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
          transform: translateY(-1px);
        }

        .textarea-custom {
          resize: vertical;
          min-height: 120px;
        }

        .help-text {
          font-size: 0.875rem;
          color: #6b7280;
          margin-top: 0.5rem;
        }

        .generate-btn {
          width: 100%;
          padding: 1.25rem 2rem;
          font-size: 1.125rem;
          font-weight: 600;
          color: white;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
          margin-top: 1rem;
        }

        .generate-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
        }

        .generate-btn:active {
          transform: translateY(0);
        }

        .btn-icon {
          font-size: 1.25rem;
        }

        .response-container {
          max-width: 1200px;
          margin: 3rem auto 0;
          padding: 0 1rem;
        }

        .response-container h2 {
          text-align: center;
          color: white;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 2rem;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
          margin-bottom: 2rem;
          overflow: hidden;
          transition: transform 0.3s ease;
        }

        .card:hover {
          transform: translateY(-5px);
        }

        .card-header {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border-bottom: 1px solid rgba(226, 232, 240, 0.8);
          padding: 1.5rem 2rem;
        }

        .card-header h4 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
        }

        .card-body {
          padding: 2rem;
        }

        .response-content {
          line-height: 1.7;
          color: #374151;
          font-size: 1rem;
        }

        .response-content p {
          margin-bottom: 1rem;
        }

        @media (max-width: 768px) {
          .container {
            padding: 1rem;
          }

          .main-title {
            font-size: 2.5rem;
          }

          .resume-form {
            padding: 2rem;
          }

          .response-container {
            padding: 0 0.5rem;
          }

          .card-body {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
