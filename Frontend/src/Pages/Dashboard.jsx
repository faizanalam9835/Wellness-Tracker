import React, { useState, useMemo } from "react"

// ------------------- ICONS -------------------

const Icon = {
  Water: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c4 6 6 9 6 12a6 6 0 11-12 0c0-3 2-6 6-12z" />
    </svg>
  ),
  Book: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m0 0a2.5 2.5 0 005 0V6a2.5 2.5 0 00-5 0zm-5 0v12a2.5 2.5 0 005 0V6a2.5 2.5 0 00-5 0z" />
    </svg>
  ),
  Walk: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8l-3-5h-3l-3-5H5l3 5h3l3 5z" />
    </svg>
  ),
  Sleep: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  ),
  Food: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
  ),
  Meditate: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0l-3 3m3-3l3 3m-3-9a9 9 0 11-9 9" />
    </svg>
  ),
  Plus: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  ),
  Minus: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
    </svg>
  ),
  Check: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  Chart: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 3h2v18h-2zM4 15h2v6H4zM18 9h2v12h-2z" />
    </svg>
  ),
  Trophy: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8m-4 0v-4m0 0a8 8 0 008-8V5H4v4a8 8 0 008 8z" />
    </svg>
  ),
  Calendar: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3M4 11h16M4 5h16a2 2 0 012 2v14H2V7a2 2 0 012-2z" />
    </svg>
  ),
  Chat: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h8m-8 4h6m2 7l-4-4H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-3l-4 4z" />
    </svg>
  ),
  Bell: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.4-1.4A2 2 0 0118 14V11a6 6 0 00-4-5.7V5a2 2 0 10-4 0v.3A6 6 0 006 11v3a2 2 0 01-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1" />
    </svg>
  ),
  Profile: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9 9 0 0112 3a9 9 0 016.879 14.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
}

// ------------------- INITIAL DATA -------------------
const initialHabits = [
  { id: 1, name: "Drink Water", icon: <Icon.Water />, goal: 8, current: 0, unit: "glasses" },
  { id: 2, name: "Read Book", icon: <Icon.Book />, goal: 30, current: 0, unit: "minutes" },
  { id: 3, name: "Walk", icon: <Icon.Walk />, goal: 5000, current: 0, unit: "steps" },
  { id: 4, name: "Sleep", icon: <Icon.Sleep />, goal: 8, current: 0, unit: "hours" },
  { id: 5, name: "Eat Healthy", icon: <Icon.Food />, goal: 3, current: 0, unit: "meals" },
  { id: 6, name: "Meditate", icon: <Icon.Meditate />, goal: 1, current: 0, unit: "session" },
]

const quotes = [
  "Small steps every day lead to big changes.",
  "Discipline is stronger than motivation.",
  "Your future is built by what you do today.",
]

// ------------------- APP -------------------
export default function App() {
  const [habits, setHabits] = useState(initialHabits)
  const [showChat, setShowChat] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  })
  const quote = useMemo(() => quotes[Math.floor(Math.random() * quotes.length)], [])

  const updateHabit = (id, diff) => {
    setHabits((prev) =>
      prev.map((h) =>
        h.id === id ? { ...h, current: Math.min(h.goal, Math.max(0, h.current + diff)) } : h
      )
    )
  }

  const completed = habits.filter((h) => h.current >= h.goal).length
  const progress = Math.round((completed / habits.length) * 100)

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 font-inter relative">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Hi Bhavya 👋
          </h1>
          <p className="text-gray-400">{today}</p>
          <p className="italic text-gray-300 mt-2">"{quote}"</p>
        </div>
        <div className="flex space-x-4">
          <button onClick={() => setShowProfile(true)} className="bg-gray-800 p-2 rounded-full hover:bg-gray-700">
            <Icon.Profile />
          </button>
          <button className="bg-gray-800 p-2 rounded-full hover:bg-gray-700">
            <Icon.Bell />
          </button>
        </div>
      </header>

      <section className="bg-gray-800 p-6 rounded-2xl mb-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-3 flex items-center space-x-2">
          <Icon.Chart /> <span>Today's Progress</span>
        </h2>
        <div className="w-full bg-gray-700 h-4 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-right mt-2 font-semibold text-blue-400">{progress}%</p>
      </section>

      <section className="grid md:grid-cols-2 gap-4">
        {habits.map((h) => {
          const percent = Math.min(100, (h.current / h.goal) * 100)
          const done = h.current >= h.goal
          return (
            <div
              key={h.id}
              className={`bg-gray-800 p-4 rounded-2xl transition border ${
                done ? "border-blue-500 bg-opacity-80" : "border-transparent"
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-full ${done ? "bg-blue-600" : "bg-gray-700"}`}>{h.icon}</div>
                  <div>
                    <h3 className={`font-semibold ${done ? "text-gray-400 line-through" : ""}`}>{h.name}</h3>
                    <p className="text-gray-400 text-sm">
                      {h.current}/{h.goal} {h.unit}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {!done && (
                    <>
                      <button
                        onClick={() => updateHabit(h.id, -1)}
                        className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"
                      >
                        <Icon.Minus />
                      </button>
                      <button
                        onClick={() => updateHabit(h.id, 1)}
                        className="p-2 rounded-full bg-blue-600 hover:bg-blue-500"
                      >
                        <Icon.Plus />
                      </button>
                    </>
                  )}
                  {done && <Icon.Check />}
                </div>
              </div>
              <div className="bg-gray-700 h-2 rounded-full">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          )
        })}
      </section>

      <section className="bg-gray-800 mt-8 p-6 rounded-2xl shadow-lg">
        <h2 className="flex items-center space-x-2 text-xl font-semibold mb-4">
          <Icon.Calendar />
          <span>Calendar Overview</span>
        </h2>
        <p className="text-gray-400">Track your habits across days (coming soon)</p>
      </section>

      <section className="bg-gray-800 mt-8 p-6 rounded-2xl shadow-lg">
        <h2 className="flex items-center space-x-2 text-xl font-semibold mb-4">
          <Icon.Trophy />
          <span>Analytics & Achievements</span>
        </h2>
        <p className="text-gray-400">Visual insights & weekly streaks (coming soon)</p>
      </section>

      {/* Chatbot Button */}
      <button
        onClick={() => setShowChat(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-500 p-4 rounded-full shadow-lg"
      >
        <Icon.Chat />
      </button>

      {/* Chatbot Modal */}
      {showChat && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-2xl w-96 relative">
            <button onClick={() => setShowChat(false)} className="absolute top-2 right-2 text-gray-400 hover:text-white">
              ✖
            </button>
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <Icon.Chat />
              <span>Chat Assistant</span>
            </h3>
            <div className="h-60 bg-gray-900 p-3 rounded-xl mb-4 overflow-y-auto text-gray-300">
              <p>Hey Bhavya! How are your habits going today? 😊</p>
            </div>
            <input
              className="w-full bg-gray-700 p-2 rounded-lg outline-none text-gray-200"
              placeholder="Type your message..."
            />
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-2xl w-96 relative">
            <button
              onClick={() => setShowProfile(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              ✖
            </button>
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <Icon.Profile />
              <span>Your Profile</span>
            </h3>
            <p className="text-gray-300 mb-2">👤 Name: Bhavya</p>
            <p className="text-gray-300 mb-2">🔥 Streak: {completed} Days</p>
            <p className="text-gray-300">🏆 Completion: {progress}%</p>
          </div>
        </div>
      )}
    </div>
  )
}
