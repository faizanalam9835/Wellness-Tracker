 import React, { useState, useEffect } from "react";


// Dummy icons
const Sparkles = () => "✨";
const TrendingUp = () => "📈";
const Plus = () => "➕";
const Trash2 = () => "🗑️";
const Check = () => "✔️";
const Flame = () => "🔥";

// Simple toast
function toastSuccess(msg) { alert("✅ " + msg); }
function toastError(msg) { alert("❌ " + msg); }

// Simple UI components
const Button = ({ children, onClick, disabled, type = "button" }) => (
  <button onClick={onClick} disabled={disabled} type={type} style={{ padding: "8px 12px", margin: "4px", borderRadius: "5px", cursor: "pointer" }}>
    {children}
  </button>
);
const Card = ({ children }) => <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "12px", marginBottom: "10px" }}>{children}</div>;
const Badge = ({ children, style }) => <span style={{ padding: "4px 8px", borderRadius: "4px", fontSize: "12px", ...style }}>{children}</span>;
const Input = (props) => <input {...props} style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }} />;
const Label = ({ children }) => <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>{children}</label>;

// Simulated API
const api = {
  getHabits: async () => {
    const res = await fetch("/api/habits", { credentials: "include" });
    return res.json();
  },
  createHabit: async (data) => {
    const res = await fetch("/api/habits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });
    return res.json();
  },
  completeHabit: async (id) => {
    const res = await fetch(`/api/habits/${id}/complete`, { method: "POST", credentials: "include" });
    return res.json();
  },
  deleteHabit: async (id) => {
    await fetch(`/api/habits/${id}`, { method: "DELETE", credentials: "include" });
  },
};

const categories = ["Health", "Productivity", "Mindfulness", "Learning", "Fitness", "Social", "Finance", "Creativity"];

const categoryColors = {
  health: { background: "#d1fae5", color: "#065f46" },
  productivity: { background: "#dbeafe", color: "#1e3a8a" },
  mindfulness: { background: "#ede9fe", color: "#5b21b6" },
  learning: { background: "#fef3c7", color: "#92400e" },
  fitness: { background: "#fee2e2", color: "#991b1b" },
  social: { background: "#fce7f3", color: "#9d174d" },
  finance: { background: "#d1fae5", color: "#065f46" },
  creativity: { background: "#ffedd5", color: "#9a3412" },
};

export default function Habits() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", category: "", frequency: "Daily", timesPerDay: 1, reminderTime: "" });

  const fetchHabits = async () => {
    try {
      setLoading(true);
      const data = await api.getHabits();
      setHabits(data);
    } catch (err) {
      toastError("Failed to fetch habits");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchHabits(); }, []);

  const handleCreateHabit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.category) {
      toastError("Please fill out all required fields");
      return;
    }
    try {
      const response = await api.createHabit(formData);
      if (response.ok && response.habit) {
        setHabits([response.habit, ...habits]);
        setDialogOpen(false);
        setFormData({ name: "", category: "", frequency: "Daily", timesPerDay: 1, reminderTime: "" });
        toastSuccess("Habit created successfully!");
      }
    } catch (error) {
      console.error(error);
      toastError("Failed to create habit");
    }
  };

  const handleCompleteHabit = async (id) => {
    try {
      const res = await api.completeHabit(id);
      setHabits(habits.map(h => h._id === id ? { ...h, streak: res.streak, longestStreak: Math.max(res.streak, h.longestStreak), lastCompleted: new Date() } : h));
      toastSuccess(`Nice! ${res.streak}-day streak 🔥`);
    } catch (err) {
      console.error(err);
      toastError("Failed to mark habit complete");
    }
  };

  const handleDeleteHabit = async (id) => {
    try {
      await api.deleteHabit(id);
      setHabits(habits.filter(h => h._id !== id));
      toastSuccess("Habit deleted");
    } catch (err) {
      console.error(err);
      toastError("Failed to delete habit");
    }
  };

  const isCompletedToday = (habit) => {
    if (!habit.lastCompleted) return false;
    const d1 = new Date(habit.lastCompleted).toDateString();
    const d2 = new Date().toDateString();
    return d1 === d2;
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>✨ My Habits</h1>
        <Button onClick={() => setDialogOpen(!dialogOpen)}><Plus /> New Habit</Button>
      </div>

      {dialogOpen && (
        <form onSubmit={handleCreateHabit} style={{ marginTop: "20px" }}>
          <Label>Name</Label>
          <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          <Label>Category</Label>
          <select onChange={(e) => setFormData({ ...formData, category: e.target.value })} value={formData.category} style={{ width: "100%", padding: "8px" }}>
            <option value="">Select category</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <Button type="submit" style={{ marginTop: "10px" }}>Create</Button>
        </form>
      )}

      {loading ? (
        <p>Loading habits...</p>
      ) : (
        <div style={{ display: "grid", gap: "10px", marginTop: "20px" }}>
          {habits.map(habit => (
            <Card key={habit._id}>
              <h2>{habit.name}</h2>
              <Badge style={categoryColors[habit.category?.toLowerCase()] || {}}>{habit.category}</Badge>
              <p>Streak: {habit.streak} 🔥</p>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button onClick={() => handleCompleteHabit(habit._id)} disabled={isCompletedToday(habit)}>
                  <Check /> {isCompletedToday(habit) ? "Done" : "Complete"}
                </Button>
                <Button onClick={() => handleDeleteHabit(habit._id)}><Trash2 /> Delete</Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
