import React, { useEffect, useState } from "react";

export default function Habits() {
  const [habits, setHabits] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  // ✅ Fetch all habits
  const fetchHabits = async () => {
    try {
      const res = await fetch("http://localhost:4300/habits", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setHabits(data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Create new habit
  const createHabit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("http://localhost:4300/habits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, category, frequency, timesPerDay: 1 }),
      });

      if (res.ok) {
        setName("");
        setCategory("");
        setMessage("✅ Habit added successfully!");
        fetchHabits();
      } else {
        setMessage("❌ Failed to create habit.");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Server error");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Mark habit complete
  const completeHabit = async (id) => {
    try {
      await fetch(`http://localhost:4300/habits/${id}/complete`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchHabits();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Delete habit
  const deleteHabit = async (id) => {
    try {
      await fetch(`http://localhost:4300/habits/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchHabits();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0b6f5] to-[#c79fe0] p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl p-8 mt-10">
        <h1 className="text-4xl font-bold text-center text-[#6b1bbf] mb-8">
          Habit Tracker
        </h1>

        {/* Habit Creation Form */}
        <form
          onSubmit={createHabit}
          className="flex flex-col md:flex-row gap-4 justify-center mb-6"
        >
          <input
            type="text"
            placeholder="Habit name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border border-gray-300 rounded-lg px-4 py-3 flex-1 focus:outline-none focus:ring-2 focus:ring-[#e0b6f5]"
          />
          <input
            type="text"
            placeholder="Category (e.g., Health)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="border border-gray-300 rounded-lg px-4 py-3 flex-1 focus:outline-none focus:ring-2 focus:ring-[#e0b6f5]"
          />
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e0b6f5]"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
          <button
            type="submit"
            disabled={loading}
            className="bg-[#e0b6f5] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#c79fe0] transition disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </form>

        {/* Message */}
        {message && (
          <p className="text-center text-sm text-gray-700 mb-6">{message}</p>
        )}

        {/* Habit List */}
        {habits.length === 0 ? (
          <p className="text-center text-gray-500">No habits added yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {habits.map((habit) => (
              <div
                key={habit._id}
                className="border border-gray-200 rounded-2xl p-5 shadow-md bg-white flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {habit.name}
                  </h3>
                  <p className="text-sm text-gray-500">{habit.category}</p>
                  <p className="text-sm mt-2 text-gray-600">
                    🔥 Streak:{" "}
                    <strong>{habit.streak ? habit.streak : 0}</strong>
                  </p>
                </div>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => completeHabit(habit._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                  >
                    Complete
                  </button>
                  <button
                    onClick={() => deleteHabit(habit._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
