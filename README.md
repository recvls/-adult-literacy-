# 📚 Adult Literacy PWA

A modern, progressive web app for adult literacy learners with **speech recognition**, **text-to-speech**, **dark blue theme**, **gamification features**, and improved offline caching.

## 🌟 Features

### Core Learning
- ✅ **Text-to-Speech**: Questions are read aloud automatically with repeat support
- 🎤 **Speech Recognition**: Answer questions using your voice when supported
- 📖 **Structured Lessons**: 4 lesson modules with 20+ questions and progress highlights
- 💾 **Improved Offline Support**: PWA-ready caching keeps the app available even without a network
- 📊 **Progress Tracking**: Auto-saves progress, streaks, XP, and achievements locally

### Gamification
- ⭐ **XP System**: Earn experience points for completing lessons
- 🔥 **Streak Counter**: Track your daily learning streak
- 🏆 **Achievements**: Unlock 6+ achievements by hitting milestones
- 📈 **Dashboard**: View statistics and progress at a glance

### UI/UX
- 🎨 **Dark Blue Theme**: Easy on the eyes with professional design
- 📱 **Responsive Design**: Works on mobile, tablet, and desktop
- ⚡ **Fast Performance**: Built with React + Vite, < 160KB bundle
- 🎯 **Intuitive Navigation**: Multi-page layout with bottom nav
- ☁️ **Backend Sync**: Optional Express API support for user progress and lesson delivery

## 🎯 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Navbar.tsx       # Top navigation with user info
│   ├── LessonEngine.tsx # Main lesson + speech engine
│   ├── LessonCard.tsx   # Lesson selection card
│   ├── StreakCounter.tsx # Streak display
│   ├── XPTracker.tsx    # XP progress bar
│   ├── Achievement.tsx  # Achievement badges
│   └── Onboarding.tsx   # Initial setup screen
├── pages/               # Full page screens
│   ├── Dashboard.tsx    # Home screen with stats
│   ├── Learn.tsx        # Lesson list
│   └── Profile.tsx      # User profile & achievements
├── context/             # State management
│   └── UserContext.tsx  # Global user state with XP/streak
├── hooks/               # Custom React hooks
│   └── useUser.ts       # User context hook
├── utils/               # Utilities
│   ├── api.ts           # Backend API client
│   └── speechService.ts # Speech API wrapper
├── data/                # Shared lesson content
│   ├── lessons.json     # Lesson definitions used by frontend and backend
│   └── lessons.ts       # Typed lesson export for React
├── server/              # Optional backend API server
│   ├── index.js         # Express server for lessons and progress
│   └── data/
│       └── users.json   # Local user progress store
├── App.tsx              # Main app with routing
├── main.tsx             # Entry point
└── styles.css           # Dark blue theme + responsive design
```

## 🚀 Getting Started

### Installation
This repository does not track `node_modules`; install dependencies locally.
```bash
cd adult-literacy-pwa
npm install
npm run dev
```
Visit `http://localhost:5173/`

### Backend Server
Run the backend in one terminal:
```bash
npm run server
```
Then run the frontend in another terminal:
```bash
npm run dev
```
The backend runs on `http://localhost:4000` and the Vite dev server proxies `/api` requests there.

### Building for Production
```bash
npm run build
npm run preview
```

## 🎓 How It Works

1. **Onboarding**: Enter your name to start
2. **Dashboard**: View your stats and achievements
3. **Learn**: Select a lesson from the list
4. **Lesson**: 
   - Question is auto-read aloud
   - Click 🔊 to repeat the question
   - Click 🎤 to answer with your voice
   - Type answer or select multiple choice
   - Click ✓ Submit
5. **Repeat**: Continue through all lessons and unlock achievements

## 🎨 Dark Blue Theme

- **Primary**: `#1f90ff` (Accent blue)
- **Background**: `#0a1929` (Deep blue)
- **Card**: `#1a2f4f` (Blue-gray)
- **Text**: `#e3f2fd` (Light blue)

All colors are CSS variables for easy customization in `src/styles.css`

## 🔊 Speech Features

### Text-to-Speech
- Questions are automatically spoken on load
- Click "🔊 Repeat" to hear again
- Supports all modern browsers

### Speech Recognition
- Click "🎤 Listen" to answer with your voice
- Requires microphone permission
- Works on Chrome, Firefox, Safari, Edge

## 📊 Data Storage

All user data is stored locally in browser:
- User profile & name
- XP and streak count
- Completed lessons
- Unlocked achievements

No server required! Data stays on your device.

## 📚 Lesson Content

### Lesson 1: Letters A-E
5 questions covering letter recognition and phonetic sounds

### Lesson 2: Letters F-J
5 questions on letters F through J

### Lesson 3: Simple Words
5 questions on basic words (cat, dog, apple, sun)

### Lesson 4: Common Words
5 questions on frequently used words

**Total: 20 questions, 4 lessons**

## 🏆 Achievements

| Achievement | Condition |
|---|---|
| 👣 First Step | Complete first lesson |
| 📖 Learning Path | Complete 5 lessons |
| 🔥 Fire! | Maintain 7-day streak |
| ⭐ XP Collector | Earn 100 XP |
| 🔤 Letter Master | Complete all letter lessons |
| 📚 Word Wizard | Complete all word lessons |

## ⚡ Performance

- Build size: **162 KB** (51 KB gzip)
- Load time: < 500ms
- Zero dependencies except React & Vite
- Fully offline capable

## 🔧 Technology Stack

- **React 18**: UI framework
- **TypeScript**: Type safety
- **Vite 5**: Fast build tool
- **Speech API**: Browser native
- **CSS**: Custom dark theme

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

Speech recognition is not available in all browsers. The app gracefully handles unsupported features.

## 🤝 Contributing

Feel free to add more lessons, achievements, or features!

## 📝 License

MIT License

---

**Built with 🤍 for adult literacy learners**
**Built by Suhan Kintali, Joseph, Sanjeev, and Vihaan Bhhat**
