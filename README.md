# FDA Regulation RAG Chatbot

A sophisticated Retrieval-Augmented Generation (RAG) chatbot designed to help pharmaceutical professionals navigate complex FDA regulations. Instead of manually searching through thousands of pages of FDA Title 21 documents, users can ask questions and receive contextually relevant, accurate answers.

## 🎯 Problem Statement

Pharmaceutical professionals face challenges navigating complex FDA regulations scattered across thousands of pages. This RAG chatbot provides instant, contextually accurate answers to regulatory questions, dramatically reducing research time and improving compliance efficiency.

## 🏗️ Architecture Overview

The application uses a multi-layered architecture with clear separation of concerns:

```
Frontend (HTML/CSS/JS) ↔ Node.js (Orchestration) ↔ Flask (AI Services) ↔ Google Cloud Services
```

### Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Orchestration Layer**: Node.js with Express
- **AI Backend**: Python Flask with Google Vertex AI
- **LLM**: Google Gemini 2.0 Flash
- **Embeddings**: Google text-embedding-005 model
- **Storage**: Google Cloud Storage
- **Styling**: Custom CSS with gradient animations
- **Icons**: Font Awesome, Boxicons
- **Typography**: Google Fonts (Outfit)

## 🚀 Features

### User Experience
- **Professional Chat Interface**: Modern, pharmaceutical industry-appropriate design
- **Typewriter Effect**: AI responses appear with natural typing animation (75ms delay per word)
- **Chat History**: Persistent conversation history with clickable re-run functionality
- **Loading Animations**: Sophisticated loading states with shimmer effects
- **Responsive Design**: Collapsible sidebar and flexible layout
- **Input Sanitization**: XSS protection for all user inputs

### AI Capabilities
- **Semantic Search**: Vector similarity search for finding relevant FDA regulations
- **Context-Aware Responses**: RAG pipeline ensures accurate, regulation-specific answers
- **Professional Tone**: Tuned for formal regulatory communication
- **Real-time Processing**: Optimized for speed during compliance reviews

### Technical Features
- **Modular Architecture**: Organized codebase with clear separation of concerns
- **Memory Optimization**: Embeddings loaded once at startup and cached in Node.js memory
- **Error Handling**: Comprehensive error catching and user-friendly error messages
- **Token Management**: Intelligent chunking with 1024-token limit for optimal context

## 📁 Project Structure

```
rag-chatbot/
├── frontend/
│   ├── css/
│   │   ├── base.css           # Global styles and typography
│   │   ├── layout.css         # Container structure
│   │   ├── sidebar.css        # Navigation panel styling
│   │   ├── chat.css          # Conversation area styling
│   │   ├── input.css         # Input field styling
│   │   └── response.css      # Chat bubbles and animations
│   ├── js/
│   │   ├── api.js            # Backend API communication
│   │   ├── domElements.js    # DOM references
│   │   ├── promptQuestions.js # Pre-built conversation starters
│   │   ├── uiHandlers.js     # User interaction logic
│   │   ├── utils.js          # Utility functions
│   │   └── script.js         # Main JavaScript orchestrator
│   ├── index.html            # Main HTML structure
│   └── style.css             # CSS import orchestrator
├── backend/
│   ├── node/                 # Node.js orchestration layer
│   │   ├── routes/           # API endpoint definitions
│   │   ├── services/         # Business logic layer
│   │   ├── utils/            # External service communications
│   │   └── server.js         # Entry point and configuration
│   └── flask/                # Python AI backend
│       ├── routes/
│       │   ├── embedding_routes.py
│       │   └── llm_routes.py
│       ├── services/
│       │   ├── embedding_service.py
│       │   └── llm_service.py
│       ├── app.py            # Flask entry point
│       └── requirements.txt  # Python dependencies
└── data/
    └── fda_documents/        # Processed FDA Title 21 HTML files
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Google Cloud Vertex AI for enterprise-grade AI services
- BeautifulSoup for robust HTML parsing
- Font Awesome and Boxicons for professional iconography
- Google Fonts for modern typography

## 📞 Support

For questions or support, please open an issue in the GitHub repository.

---

**Built with ❤️ for pharmaceutical professionals navigating FDA regulations**
