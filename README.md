# 🚀 AI Resume Builder

Transform your career with AI-powered resume optimization! This modern web application uses Google's Gemini AI to help you create tailored cover letters, optimize your resume content, and analyze ATS compatibility.

## ✨ Features

- **🤖 AI-Powered Analysis**: Leverages Google Gemini 2.0 Flash model for intelligent resume optimization
- **📝 Tailored Cover Letters**: Generates personalized cover letters based on job descriptions
- **🎯 ATS Optimization**: Provides keyword analysis and ATS score estimation (0-100)
- **💼 Multi-Experience Support**: Works for both fresh graduates and experienced professionals
- **🎨 Modern UI**: Beautiful glassmorphism design with smooth animations
- **📱 Responsive Design**: Works perfectly on desktop and mobile devices

## 🛠️ What This App Does

### 1. **Tailored Cover Letter Generation**
- Creates professional cover letters addressed to specific companies
- Supports multiple tones: Formal, Informal, and Casual
- Highlights relevant skills based on job descriptions

### 2. **Resume Content Optimization**
- Suggests optimized resume summaries and bullet points
- Provides achievement-focused, ATS-friendly content
- Tailors content specifically to job requirements

### 3. **Keyword Match Analysis**
- Extracts important keywords from job descriptions
- Identifies missing keywords in your current resume
- Provides recommendations for keyword optimization

### 4. **ATS Score Estimation**
- Gives a rough ATS compatibility score (0-100)
- Explains scoring rationale
- Identifies potential formatting and content issues

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/poojitha2558/ai-resume-builder.git
   cd ai-resume-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
   
   📝 **Get your Gemini API key:**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy and paste it into your `.env` file

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` to see the application running.

## 📖 How to Use

### Step 1: Fill in the Form
- **Company Name**: Enter the company you're applying to
- **Experience Level**: Select "Fresher" or "Experience"
- **Cover Letter Tone**: Choose your preferred tone
- **Job Description**: Paste the complete job posting
- **Current Resume**: Paste your existing resume content (optional)

### Step 2: Generate AI Analysis
- Click the "🚀 Generate AI Resume" button
- Wait for the AI to process your information

### Step 3: Review Results
The AI will provide:
- ✉️ **Tailored Cover Letter**
- 📄 **Updated Resume Content**
- 🔍 **Keyword Match Analysis**
- 📊 **ATS Score Estimate**

## 🎨 Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: CSS-in-JS with modern glassmorphism design
- **AI Integration**: Google Gemini 2.0 Flash API
- **Build Tool**: Vite for fast development and building
- **Linting**: ESLint for code quality

## 🔧 Project Structure

```
ai-resume-builder/
├── public/
├── src/
│   ├── assets/
│   ├── pages/
│   │   └── Home.jsx          # Main application component
│   ├── App.jsx               # Root component
│   ├── App.css              # Global styles
│   ├── index.css            # Base styles
│   └── main.jsx             # Application entry point
├── .env                     # Environment variables
├── package.json
├── vite.config.js
└── README.md
```

## 🌟 Key Features Breakdown

### Modern UI Design
- **Glassmorphism Effects**: Semi-transparent containers with backdrop blur
- **Gradient Backgrounds**: Beautiful purple-blue gradients
- **Smooth Animations**: Hover effects and transitions
- **Responsive Layout**: Mobile-first design approach

### AI Integration
- **Smart Parsing**: Automatically structures AI responses into readable sections
- **Error Handling**: Robust error handling for API calls
- **Real-time Processing**: Immediate feedback and results

### User Experience
- **Intuitive Interface**: Clean, easy-to-use form layout
- **Visual Feedback**: Loading states and interactive elements
- **Structured Output**: Well-organized results display

## 🔒 Security

- **Environment Variables**: API keys are stored securely in `.env` files
- **No Hardcoded Secrets**: All sensitive data is externalized
- **Client-side Processing**: Form data is processed securely

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Gemini AI for powerful language processing
- Vite team for the amazing build tool
- React community for the robust framework

## 📞 Support

If you have any questions or run into issues:

1. Check the [Issues](https://github.com/poojitha2558/ai-resume-builder/issues) page
2. Create a new issue with detailed information
3. Reach out via the repository discussions

---

**Built with ❤️ using React, Vite, and Google Gemini AI**
