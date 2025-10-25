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
<<<<<<< HEAD
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
=======
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
      const res = await fetch("http://localhost:4300/habit/create", {
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
>>>>>>> 854ff15c29108cd5ae2cffe32fe6f2ec74dc8789

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getHabits();
      setHabits(data);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to fetch habits";
      setError(errorMsg);
      toast.error(errorMsg);
      console.error("Error fetching habits:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateHabit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error("Please enter a habit name");
      return;
    }
    if (!formData.category) {
      toast.error("Please select a category");
      return;
    }

    try {
      const response = await api.createHabit(formData);
      if (response.ok && response.habit) {
        setHabits([response.habit, ...habits]);
        setFormData({
          name: "",
          category: "",
          frequency: "Daily",
          timesPerDay: 1,
          reminderTime: "",
        });
        setDialogOpen(false);
        toast.success("Habit created successfully! 🎉");
      }
    } catch (error) {
      console.error("Error creating habit:", error);
      toast.error(error instanceof Error ? error.message : "Failed to create habit");
    }
  };

  const handleCompleteHabit = async (id) => {
    try {
      const response = await api.completeHabit(id);
      
      setHabits(habits.map(habit => {
        if (habit._id === id) {
          return {
            ...habit,
            streak: response.streak,
            longestStreak: Math.max(response.streak, habit.longestStreak),
            lastCompleted: new Date(),
          };
        }
        return habit;
      }));
      
      toast.success(`Great job! ${response.streak} day streak! 🔥`);
    } catch (error) {
      console.error("Error completing habit:", error);
      toast.error(error instanceof Error ? error.message : "Failed to mark habit as complete");
    }
  };

  const handleDeleteHabit = async (id) => {
    try {
      await api.deleteHabit(id);
      setHabits(habits.filter(habit => habit._id !== id));
      toast.success("Habit deleted");
    } catch (error) {
      console.error("Error deleting habit:", error);
      toast.error(error instanceof Error ? error.message : "Failed to delete habit");
    }
  };

  const isCompletedToday = (habit) => {
    if (!habit.lastCompleted) return false;
    const lastCompleted = new Date(habit.lastCompleted);
    const today = new Date();
    return lastCompleted.toDateString() === today.toDateString();
  };

  const totalStreak = habits.reduce((sum, habit) => sum + habit.streak, 0);
  const completedToday = habits.filter(
    habit => habit.lastCompleted && 
    new Date(habit.lastCompleted).toDateString() === new Date().toDateString()
  ).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 shadow-soft">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-2">
                <Sparkles className="h-8 w-8 text-primary" />
                Habit Tracker
              </h1>
              <p className="text-muted-foreground">Build better habits, one day at a time</p>
            </div>
            
            {/* Create Habit Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gradient-primary shadow-medium hover:shadow-strong transition-smooth text-primary-foreground font-semibold animate-bounce-in">
                  <Plus className="mr-2 h-5 w-5" />
                  Create Habit
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] gradient-card shadow-strong border-primary/20">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-primary" />
                    Create New Habit
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateHabit} className="space-y-6 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground font-medium">Habit Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Morning Meditation"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="shadow-soft focus:shadow-medium transition-smooth border-border/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-foreground font-medium">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger className="shadow-soft focus:shadow-medium transition-smooth border-border/50">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat.toLowerCase()}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="frequency" className="text-foreground font-medium">Frequency</Label>
                    <Select
                      value={formData.frequency}
                      onValueChange={(value) => setFormData({ ...formData, frequency: value })}
                    >
                      <SelectTrigger className="shadow-soft focus:shadow-medium transition-smooth border-border/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {frequencies.map((freq) => (
                          <SelectItem key={freq} value={freq}>
                            {freq}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timesPerDay" className="text-foreground font-medium">Times Per Day</Label>
                    <Input
                      id="timesPerDay"
                      type="number"
                      min="1"
                      value={formData.timesPerDay}
                      onChange={(e) => setFormData({ ...formData, timesPerDay: parseInt(e.target.value) || 1 })}
                      className="shadow-soft focus:shadow-medium transition-smooth border-border/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reminderTime" className="text-foreground font-medium">Reminder Time (Optional)</Label>
                    <Input
                      id="reminderTime"
                      type="time"
                      value={formData.reminderTime}
                      onChange={(e) => setFormData({ ...formData, reminderTime: e.target.value })}
                      className="shadow-soft focus:shadow-medium transition-smooth border-border/50"
                    />
                  </div>

                  <Button type="submit" className="w-full gradient-primary shadow-medium hover:shadow-strong transition-smooth text-primary-foreground font-semibold">
                    Create Habit
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      {habits.length > 0 && (
        <div className="border-b border-border/50 bg-card/50">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-wrap gap-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full gradient-primary shadow-medium flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{totalStreak}</p>
                  <p className="text-sm text-muted-foreground">Total Streak Days</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-success/20 shadow-medium flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{completedToday}/{habits.length}</p>
                  <p className="text-sm text-muted-foreground">Completed Today</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <div className="w-24 h-24 rounded-full gradient-primary shadow-strong flex items-center justify-center mb-6 animate-pulse-glow">
              <Sparkles className="h-12 w-12 text-primary-foreground animate-spin" />
            </div>
            <p className="text-muted-foreground text-lg">Loading your habits...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <div className="w-24 h-24 rounded-full bg-destructive/20 shadow-strong flex items-center justify-center mb-6">
              <Sparkles className="h-12 w-12 text-destructive" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Connection Error</h2>
            <p className="text-muted-foreground text-center max-w-md mb-8">{error}</p>
            <Button 
              onClick={fetchHabits}
              className="gradient-primary shadow-medium hover:shadow-strong transition-smooth text-primary-foreground font-semibold"
            >
              Try Again
            </Button>
          </div>
        ) : habits.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <div className="w-24 h-24 rounded-full gradient-primary shadow-strong flex items-center justify-center mb-6 animate-pulse-glow">
              <Sparkles className="h-12 w-12 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-3">Start Your Journey</h2>
            <p className="text-muted-foreground text-center max-w-md mb-8">
              Create your first habit and begin building the life you want, one small step at a time.
            </p>
            <Button 
              onClick={() => setDialogOpen(true)}
              className="gradient-primary shadow-medium hover:shadow-strong transition-smooth text-primary-foreground font-semibold animate-bounce-in"
            >
              <Plus className="mr-2 h-5 w-5" />
              Create Your First Habit
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {habits.map((habit, index) => {
              const completed = isCompletedToday(habit);
              
              return (
                <div
                  key={habit._id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Habit Card */}
                  <Card className="gradient-card shadow-medium hover:shadow-strong transition-smooth border-primary/20 overflow-hidden group">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-smooth">
                            {habit.name}
                          </h3>
                          <Badge className={cn("shadow-soft", categoryColors[habit.category.toLowerCase()] || categoryColors.health)}>
                            {habit.category}
                          </Badge>
                        </div>
                        <button
                          onClick={() => handleDeleteHabit(habit._id)}
                          className="text-muted-foreground hover:text-destructive transition-smooth p-2 hover:bg-destructive/10 rounded-lg"
                          aria-label="Delete habit"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Flame className="h-5 w-5 text-orange-500" />
                          <span className="font-semibold text-foreground">{habit.streak || 0}</span>
                          <span>day streak</span>
                          {habit.longestStreak > 0 && (
                            <span className="text-xs">
                              (Best: {habit.longestStreak})
                            </span>
                          )}
                        </div>

                        <Button
                          onClick={() => handleCompleteHabit(habit._id)}
                          disabled={completed}
                          className={cn(
                            "w-full shadow-soft hover:shadow-medium transition-smooth font-semibold",
                            completed
                              ? "bg-success/20 text-success hover:bg-success/20 cursor-not-allowed animate-celebrate"
                              : "gradient-primary text-primary-foreground hover:scale-105"
                          )}
                        >
                          <Check className="mr-2 h-5 w-5" />
                          {completed ? "Completed Today! 🎉" : "Mark Complete"}
                        </Button>

                        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/50">
                          <span>{habit.frequency}</span>
                          {habit.timesPerDay && habit.timesPerDay > 1 && (
                            <span>{habit.timesPerDay}x per day</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Habits;
