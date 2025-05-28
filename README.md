# Weather Dashboard

A modern and elegant weather application built with React, TypeScript, and Supabase authentication. Get real-time weather updates, save your search history, and access your weather data from anywhere.

## ✨ Features

- **Real-time Weather Data**: Get current weather information and 5-day forecasts
- **Location Search**: Look up weather by city name
- **Unit Conversion**: Toggle between Celsius and Fahrenheit
- **User Authentication**: Create an account to unlock additional features
- **Search History**: Save and view your previous weather searches
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Beautiful glassmorphic design with elegant animations

## 🛠️ Technologies Used

- **React 19** with TypeScript
- **SWR** for data fetching with caching
- **Styled Components** for styling
- **Supabase** for authentication and data storage
- **React Router** for navigation
- **React Icons** for UI icons
- **OpenWeatherMap API** for weather data
- **Vite** for fast development and optimized builds

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- OpenWeatherMap API key
- Supabase account and project

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Sayan67/weather-dashboard.git
   cd weather-dashboard
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a .env file in the project root and add your API keys:
   ```
   VITE_OPENWEATHERMAP_API_KEY=your_openweathermap_api_key
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open `http://localhost:5173` in your browser

## 📋 Supabase Setup

1. Create a new Supabase project
2. Set up the following tables in your Supabase database:

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Weather Data Table
```sql
CREATE TABLE weather_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  city TEXT NOT NULL,
  temperature TEXT NOT NULL,
  humidity TEXT NOT NULL,
  icon TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

3. Set up Row Level Security (RLS) policies for your tables if needed.

## 📂 Project Structure

```
weather-dashboard/
├── public/
├── src/
│   ├── components/
│   │   ├── Authentication/
│   │   │   ├── Auth.tsx         # Auth container component
│   │   │   ├── Login.tsx        # Login form
│   │   │   ├── Register.tsx     # Registration form
│   │   │   ├── ProtectedRoute.tsx # Route protection for authenticated users
│   │   │   └── PublicRoute.tsx  # Route protection for public routes
│   │   ├── layout/
│   │   │   └── Header.tsx       # Application header with navigation
│   │   ├── Providers/
│   │   │   └── AuthProvider.tsx # Authentication provider
│   │   ├── History.tsx          # Weather search history component
│   │   ├── SearchBar.tsx        # City search component
│   │   ├── WeatherCard.tsx      # Main weather display
│   │   └── WeatherIcons.tsx     # Weather icon components
│   ├── context/
│   │   └── WeatherProvider.tsx  # Weather context provider
│   ├── hooks/
│   │   └── useWeather.ts        # Custom hook for weather data
│   ├── services/
│   │   └── storeHistory.tsx     # Service for managing weather history
│   ├── utils/
│   │   └── supabaseClient.ts    # Supabase client setup
│   ├── App.css
│   ├── App.tsx                  # Main application component
│   ├── main.tsx                 # Entry point
│   └── vite-env.d.ts           # TypeScript environment declarations
├── .env                        # Environment variables (git-ignored)
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## 🔒 Authentication Flow

1. Users can sign up with email, password, and name
2. On successful registration, a user profile is created
3. Users can log in with email and password
4. Authentication state persists across page refreshes
5. Protected routes are only accessible to authenticated users

## 🌤️ Weather Data

The app uses the OpenWeatherMap API to fetch:
- Current weather conditions
- 5-day weather forecast
- Temperature, humidity, and wind information
- Weather icons and descriptions

## 🎨 UI/UX Features

- Glassmorphic card design with backdrop blur effects
- Smooth transitions and hover states
- Responsive layout for all screen sizes
- Toggle switches for unit conversion
- Error handling with user-friendly messages
- Loading states for better UX

## 🚧 Future Improvements

- Add dark/light theme toggle
- Implement geolocation for automatic local weather
- Add weather alerts and notifications
- Add more detailed weather information and charts

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

[Sayan Das](https://github.com/Sayan67)

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for providing the weather API
- [Supabase](https://supabase.io/) for the authentication and database services
- [React Icons](https://react-icons.github.io/react-icons/) for the icon set

---

Made with ❤️ and React
