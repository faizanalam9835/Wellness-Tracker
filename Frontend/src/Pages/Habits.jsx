import { useState, useEffect } from "react";
import { Sparkles, TrendingUp, Plus, Trash2, Check, Flame } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import * as api from "@/lib/api";

const categories = [
  "Health", "Productivity", "Mindfulness", "Learning", "Fitness", "Social", "Finance", "Creativity"
];

const frequencies = ["Daily", "Weekly", "Custom"];

const categoryColors = {
  health: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  productivity: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  mindfulness: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  learning: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  fitness: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  social: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
  finance: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  creativity: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
};

const Habits = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    frequency: "Daily",
    timesPerDay: 1,
    reminderTime: "",
  });

  // ✅ Fetch all habits
  const fetchHabits = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getHabits();
      setHabits(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch habits";
      setError(message);
      toast.error(message);
      console.error("Error fetching habits:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  // ✅ Create new habit
  const handleCreateHabit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.category) {
      toast.error("Please fill out all required fields");
      return;
    }
    try {
      const response = await api.createHabit(formData);
      if (response.ok && response.habit) {
        setHabits([response.habit, ...habits]);
        setDialogOpen(false);
        setFormData({
          name: "",
          category: "",
          frequency: "Daily",
          timesPerDay: 1,
          reminderTime: "",
        });
        toast.success("Habit created successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Failed to create habit");
    }
  };

  // ✅ Complete habit
  const handleCompleteHabit = async (id) => {
    try {
      const res = await api.completeHabit(id);
      setHabits(habits.map(h =>
        h._id === id
          ? { ...h, streak: res.streak, longestStreak: Math.max(res.streak, h.longestStreak), lastCompleted: new Date() }
          : h
      ));
      toast.success(`Nice! ${res.streak}-day streak 🔥`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to mark habit complete");
    }
  };

  // ✅ Delete habit
  const handleDeleteHabit = async (id) => {
    try {
      await api.deleteHabit(id);
      setHabits(habits.filter(h => h._id !== id));
      toast.success("Habit deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete habit");
    }
  };

  // ✅ Check if completed today
  const isCompletedToday = (habit) => {
    if (!habit.lastCompleted) return false;
    const d1 = new Date(habit.lastCompleted).toDateString();
    const d2 = new Date().toDateString();
    return d1 === d2;
  };

  // (UI rendering same as yours)
  // ...keep the JSX layout exactly as before...
};

export default Habits;
