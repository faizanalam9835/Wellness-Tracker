import React, { useEffect, useState } from "react";

function GoalsPage() {
  // =========================
  // 🎯 GOAL MANAGEMENT STATES
  // =========================
  const [goals, setGoals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    targetDate: "",
  });

  // Fetch all goals
  const fetchGoals = async () => {
    try {
      const res = await fetch("/api/goals");
      const data = await res.json();
      setGoals(data);
    } catch (err) {
      console.error("Error fetching goals:", err);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  // Add new goal
  const addGoal = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setGoals([data.goal, ...goals]);
      setFormData({ title: "", description: "", targetDate: "" });
      setShowForm(false);
    } catch (err) {
      console.error("Error creating goal:", err);
    }
  };

  // Delete goal
  const deleteGoal = async (id) => {
    try {
      await fetch(`/api/goals/${id}`, { method: "DELETE" });
      setGoals(goals.filter((g) => g._id !== id));
    } catch (err) {
      console.error("Error deleting goal:", err);
    }
  };

  // Mark goal as completed
  const markCompleted = async (id) => {
    try {
      const res = await fetch(`/api/goals/${id}/complete`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setGoals(goals.map((g) => (g._id === id ? data.goal : g)));
    } catch (err) {
      console.error("Error marking completed:", err);
    }
  };

  // =========================
  // 🌸 HABIT CATEGORIES
  // =========================
  const [expanded, setExpanded] = useState(null);
  const toggleSection = (id) => setExpanded(expanded === id ? null : id);

  const sections = [
    {
      id: "organization",
      icon: "🗂️",
      title: "Organization",
      habits: [
        { title: "Make Your Bed", desc: "Start your day tidy by making your bed." },
        { title: "Keep Your Home Tidy", desc: "Clean and declutter regularly." },
        { title: "Organize an Area Each Day", desc: "Tackle one small area daily." },
        { title: "Limit Social Media", desc: "Set time limits to stay productive." },
      ],
    },
    {
      id: "relationships",
      icon: "💞",
      title: "Relationships",
      habits: [
        { title: "Connect with People", desc: "Reach out and nurture friendships." },
        { title: "Spend Time with Each Child", desc: "Create one-on-one moments." },
        { title: "Spend Time with Your Partner", desc: "Schedule regular quality time." },
        { title: "Communicate with Your Partner", desc: "Have open, honest talks." },
        { title: "Compliment Someone", desc: "Brighten someone’s day genuinely." },
      ],
    },
    {
      id: "selfcare",
      icon: "💆‍♀️",
      title: "Self-Care",
      habits: [
        { title: "Meditate", desc: "Take time daily to find calm and focus." },
        { title: "Deep Breathing", desc: "Use breathing to relax the body and mind." },
        { title: "Yoga", desc: "Improve strength and clarity through yoga." },
        { title: "Skincare", desc: "Follow a daily skincare routine." },
        { title: "Relax", desc: "Unwind with calming activities or a bubble bath." },
      ],
    },
    {
      id: "personal",
      icon: "🌱",
      title: "Personal Development",
      habits: [
        { title: "Track Mood", desc: "Monitor your emotions daily." },
        { title: "Positive Affirmations", desc: "Build confidence through affirmations." },
        { title: "Gratitude Log", desc: "Write 3 things you’re grateful for." },
        { title: "Journal Every Day", desc: "Reflect on your thoughts and growth." },
        { title: "Start a New Hobby", desc: "Learn something new and fun." },
      ],
    },
    {
      id: "financial",
      icon: "💰",
      title: "Financial",
      habits: [
        { title: "Limit Spending", desc: "Avoid unnecessary purchases." },
        { title: "Increase Savings", desc: "Set aside a portion of income monthly." },
        { title: "Budgeting", desc: "Track income and expenses consistently." },
        { title: "Debt Management", desc: "Create a plan to pay off debts." },
        { title: "Emergency Fund", desc: "Build 3–6 months of savings." },
      ],
    },
    {
      id: "health",
      icon: "🥦",
      title: "Health",
      habits: [
        { title: "Increase Water Intake", desc: "Drink 8 glasses of water daily." },
        { title: "Sleep More", desc: "Get 7–9 hours of sleep per night." },
        { title: "Exercise 30 Minutes", desc: "Stay active and move daily." },
        { title: "Eat 5 a Day", desc: "Consume 5 servings of fruits & veggies." },
        { title: "Eat Clean", desc: "Choose whole, natural foods." },
      ],
    },
  ];

  return (
    <div
      className="min-h-screen p-8 text-gray-800"
      style={{
        background: "linear-gradient(to bottom right, #f8ecff, #e0b6f5)",
      }}
    >
      {/* 🌟 Header */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-purple-800 drop-shadow-lg mb-2">
          If You Can Dream It, You Can Make It ✨
        </h1>
        <p className="text-gray-700 text-lg">
          Set your goals, build your habits, and make your dreams real 💜
        </p>
      </div>

      {/* ==================== */}
      {/* 🎯 GOALS SECTION */}
      {/* ==================== */}
      <div className="max-w-6xl mx-auto mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-purple-900">My Goals</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-5 py-2 bg-purple-600 hover:bg-purple-700 transition text-white rounded-lg shadow-md"
          >
            {showForm ? "Close" : "➕ New Goal"}
          </button>
        </div>

        {/* Add Goal Form */}
        {showForm && (
          <form
            onSubmit={addGoal}
            className="space-y-3 mb-8 p-6 bg-white/80 rounded-lg shadow-lg border border-purple-200 backdrop-blur-sm"
          >
            <input
              type="text"
              placeholder="Goal Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full border border-purple-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full border border-purple-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="date"
              value={formData.targetDate}
              onChange={(e) =>
                setFormData({ ...formData, targetDate: e.target.value })
              }
              className="w-full border border-purple-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
            <button
              style={{ backgroundColor: "#e0b6f5" }}
              className="px-6 py-2 hover:bg-purple-400 transition text-white font-semibold rounded-lg shadow-md"
            >
             Add Goal
              </button>

          </form>
        )}

        {/* Goal Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => (
            <div
              key={goal._id}
              className="relative p-5 bg-white rounded-xl shadow-lg border border-purple-200 hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              <h3 className="text-2xl font-semibold text-purple-800 mb-2">
                {goal.title}
              </h3>
              <p className="text-gray-700 mb-2">{goal.description}</p>
              <p className="text-sm text-gray-500 mb-1">
                🎯 Due: {new Date(goal.targetDate).toLocaleDateString()}
              </p>
              <p className="text-sm font-medium mb-4">
                Status:{" "}
                <span
                  className={`${
                    goal.completed ? "text-green-600" : "text-yellow-600"
                  } font-semibold`}
                >
                  {goal.completed ? "Completed ✅" : "In Progress ⏳"}
                </span>
              </p>

              <div className="flex gap-2">
                {!goal.completed && (
                  <button
                    onClick={() => markCompleted(goal._id)}
                    className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-sm transition"
                  >
                    Complete
                  </button>
                )}
                <button
                  onClick={() => deleteGoal(goal._id)}
                  className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-sm transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ==================== */}
      {/* 🌿 HABIT CATEGORIES */}
      {/* ==================== */}
      <div className="max-w-6xl mx-auto space-y-6">
        {sections.map((section) => (
          <div
            key={section.id}
            className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 hover:shadow-2xl transition"
          >
            <button
              onClick={() => toggleSection(section.id)}
              className="flex justify-between items-center w-full text-left"
            >
              <h2 className="text-2xl font-bold text-purple-700">
                {section.icon} {section.title}
              </h2>
              <span className="text-purple-600 font-bold text-xl">
                {expanded === section.id ? "−" : "+"}
              </span>
            </button>

            {expanded === section.id && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {section.habits.map((habit, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gradient-to-r from-[#f0d9ff] to-[#e0b6f5] rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
                  >
                    <h4 className="font-semibold text-purple-900 text-lg">
                      {habit.title}
                    </h4>
                    <p className="text-gray-700 text-sm mt-1">{habit.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="text-center mt-16 text-purple-700 text-sm">
        © 2025 Dream Goals Planner — Designed with 💜 to inspire growth & balance.
      </footer>
    </div>
  );
}

export default GoalsPage;


// import React, { useEffect, useState } from "react";

// // const API_BASE = "http://localhost:4300/api/goals";

// const initialGoalsData = [
//   {
//     category: "Organization",
//     items: [
//       "Make Your Bed",
//       "Keep Your Home Tidy",
//       "Organize an Area of Your Home/Life Each Day",
//       "Limit Time on Social Media",
//     ],
//   },
//   {
//     category: "Relationships",
//     items: [
//       "Connect with People",
//       "Spend Time with Each Child",
//       "Spend Time with Your Partner",
//       "Communicate with Your Partner",
//       "Compliment Someone",
//     ],
//   },
//   {
//     category: "Self-Care",
//     items: [
//       "Meditate",
//       "Deep Breathing",
//       "Yoga",
//       "Stretch",
//       "Haircare",
//       "Skincare",
//       "Remove Makeup",
//       "Moisturize",
//       "Relax",
//       "Bubble Bath",
//     ],
//   },
//   {
//     category: "Personal Development",
//     items: [
//       "Track Mood",
//       "Limit Screen Time",
//       "Limit Social Media",
//       "Positive Affirmations",
//       "Gratitude log",
//       "Visualize goals",
//       "Journal Every Day",
//       "Self-Reflection",
//       "Creative Activity",
//       "Start a New Hobby",
//     ],
//   },
//   {
//     category: "Financial",
//     items: [
//       "Limit spending",
//       "Increase savings",
//       "Cook More and Eat Out/Order In Less",
//       "Budgeting",
//       "Tracking Expenses",
//       "Goal Setting",
//       "Debt Management",
//       "Mindful Spending",
//       "Emergency Fund",
//       "Regular Review",
//     ],
//   },
//   {
//     category: "Health",
//     items: [
//       "Increase Water Intake",
//       "Stop Drinking Soda",
//       "Limit Coffee Intake",
//       "Limit Alcohol Intake",
//       "Sleep more",
//       "Exercise 30 Minutes Daily",
//       "10,000 Steps a Day",
//       "Eat More Vegetables",
//       "Eat 5 a Day (Fruit and Veg)",
//       "Eat Clean",
//     ],
//   },
// ];

// function GoalsPage() {
//   const [goals, setGoals] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     targetDate: "",
//   });

//   // Fetch goals from backend
//   const fetchGoals = async () => {
//     try {
//       const res = await fetch(API_BASE, { credentials: "include" });
//       const data = await res.json();
//       setGoals(data);
//     } catch (err) {
//       console.error("Error fetching goals:", err);
//     }
//   };

//   useEffect(() => {
//     fetchGoals();
//   }, []);

//   // Add a new goal
//   const addGoal = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(API_BASE, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//         credentials: "include",
//       });

//       if (!res.ok) {
//         console.error("Failed to create goal", res.status);
//         return;
//       }

//       const data = await res.json();
//       setGoals([data.goal, ...goals]);
//       setFormData({ title: "", description: "", targetDate: "" });
//       setShowForm(false);
//     } catch (err) {
//       console.error("Error creating goal:", err);
//     }
//   };

//   // Delete goal
//   const deleteGoal = async (id) => {
//     try {
//       await fetch(`${API_BASE}/${id}`, { method: "DELETE", credentials: "include" });
//       setGoals(goals.filter((g) => g._id !== id));
//     } catch (err) {
//       console.error("Error deleting goal:", err);
//     }
//   };

//   // Mark goal completed
//   const markCompleted = async (id) => {
//     try {
//       const res = await fetch(`${API_BASE}/${id}/complete`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//       });
//       const data = await res.json();
//       setGoals(goals.map((g) => (g._id === id ? data.goal : g)));
//     } catch (err) {
//       console.error("Error marking completed:", err);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen p-8"
//       style={{
//         background: "linear-gradient(to bottom right, #e0b6f5, #f5e6ff)",
//       }}
//     >
//       {/* Motivational Header */}
//       <div className="text-center mb-10">
//         <h1 className="text-5xl font-extrabold text-purple-800 drop-shadow-lg mb-2">
//           If You Can Dream It, Someone Can Make It ✨
//         </h1>
//         <p className="text-gray-700 text-lg">
//           Set your goals, chase your dreams, and make it happen.
//         </p>
//       </div>

//       {/* Add Goal Button */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-3xl font-bold text-purple-900">My Goals</h2>
//         <button
//           className="px-5 py-2 rounded-lg shadow-md text-white font-semibold transition"
//           style={{ backgroundColor: "#e0b6f5" }}
//           onClick={() => setShowForm(!showForm)}
//         >
//           {showForm ? "Close" : "➕ New Goal"}
//         </button>
//       </div>

//       {/* Add Goal Form */}
//       {showForm && (
//         <form
//           onSubmit={addGoal}
//           className="space-y-3 mb-8 p-6 bg-white/80 rounded-lg shadow-lg border border-purple-200 backdrop-blur-sm"
//         >
//           <input
//             type="text"
//             placeholder="Goal Title"
//             value={formData.title}
//             onChange={(e) =>
//               setFormData({ ...formData, title: e.target.value })
//             }
//             className="w-full border border-purple-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
//             required
//           />
//           <textarea
//             placeholder="Description"
//             value={formData.description}
//             onChange={(e) =>
//               setFormData({ ...formData, description: e.target.value })
//             }
//             className="w-full border border-purple-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
//           />
//           <input
//             type="date"
//             value={formData.targetDate}
//             onChange={(e) =>
//               setFormData({ ...formData, targetDate: e.target.value })
//             }
//             className="w-full border border-purple-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
//             required
//           />
//           <button
//             className="px-6 py-2 text-white font-semibold rounded-lg shadow-md transition"
//             style={{ backgroundColor: "#e0b6f5" }}
//           >
//             Add Goal
//           </button>
//         </form>
//       )}

//       {/* Display all goal categories */}
//       {initialGoalsData.map((category) => (
//         <div key={category.category} className="mb-8">
//           <h3 className="text-2xl font-bold text-purple-800 mb-4">
//             {category.category}
//           </h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {category.items.map((item, idx) => (
//               <div
//                 key={idx}
//                 className="p-4 bg-white rounded-xl shadow hover:shadow-xl transition"
//               >
//                 <p>{item}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}

//       {/* Existing Goals from backend */}
//       <div className="mt-10">
//         <h2 className="text-3xl font-bold text-purple-900 mb-4">
//           Your Custom Goals
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {goals.map((goal) => (
//             <div
//               key={goal._id}
//               className="relative p-5 bg-white rounded-xl shadow-lg border border-purple-200 hover:shadow-2xl transition transform hover:-translate-y-1"
//             >
//               <h3 className="text-2xl font-semibold text-purple-800 mb-2">
//                 {goal.title}
//               </h3>
//               <p className="text-gray-700 mb-2">{goal.description}</p>
//               <p className="text-sm text-gray-500 mb-1">
//                 🎯 Due: {new Date(goal.targetDate).toLocaleDateString()}
//               </p>
//               <p className="text-sm font-medium mb-4">
//                 Status:{" "}
//                 <span
//                   className={`${
//                     goal.completed ? "text-green-600" : "text-yellow-600"
//                   } font-semibold`}
//                 >
//                   {goal.completed ? "Completed ✅" : "In Progress ⏳"}
//                 </span>
//               </p>

//               <div className="flex gap-2">
//                 {!goal.completed && (
//                   <button
//                     onClick={() => markCompleted(goal._id)}
//                     className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-sm transition"
//                   >
//                     Complete
//                   </button>
//                 )}
//                 <button
//                   onClick={() => deleteGoal(goal._id)}
//                   className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-sm transition"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default GoalsPage;
