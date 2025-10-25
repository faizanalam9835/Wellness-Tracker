// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('habits');
  const [habits, setHabits] = useState([]);
  const [goals, setGoals] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  // Mock data initialization
  useEffect(() => {
    const timer = setTimeout(() => {
      setHabits([
        { id: 1, name: 'Morning Meditation', streak: 15, completed: true, frequency: 'daily', color: 'bg-blue-500' },
        { id: 2, name: 'Exercise', streak: 8, completed: false, frequency: 'daily', color: 'bg-green-500' },
        { id: 3, name: 'Read Book', streak: 22, completed: true, frequency: 'daily', color: 'bg-purple-500' },
        { id: 4, name: 'Drink Water', streak: 5, completed: false, frequency: 'daily', color: 'bg-cyan-500' },
      ]);
      
      setGoals([
        { id: 1, name: 'Run Marathon', progress: 65, target: 100, deadline: '2024-12-31' },
        { id: 2, name: 'Learn Spanish', progress: 30, target: 100, deadline: '2024-10-15' },
        { id: 3, name: 'Save $5000', progress: 45, target: 100, deadline: '2024-11-30' },
      ]);
      
      setStats({
        currentStreak: 15,
        totalHabits: 8,
        completedToday: 6,
        monthlyCompletion: 78
      });
      
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const toggleHabit = (id) => {
    setHabits(habits.map(habit => 
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    ));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const cardHoverVariants = {
    hover: {
      scale: 1.02,
      boxShadow: "0 10px 30px -15px rgba(224, 182, 245, 0.5)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-[#f0d9fa] flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-[#e0b6f5] border-t-transparent rounded-full mx-auto mb-4"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-[#e0b6f5] font-semibold text-lg"
          >
            Loading Your Dashboard...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-[#f0d9fa] p-4 md:p-6">
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Habit Tracker</h1>
            <p className="text-gray-600">Build better habits, achieve your goals</p>
          </div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-4"
          >
            <div className="relative">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-[#e0b6f5] rounded-full flex items-center justify-center text-white"
              >
                <i className="fas fa-bell"></i>
              </motion.button>
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
              ></motion.span>
            </div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3 bg-white p-2 rounded-xl shadow-sm"
            >
              <div className="w-8 h-8 bg-[#e0b6f5] rounded-full flex items-center justify-center text-white font-semibold">
                JD
              </div>
              <span className="font-medium text-gray-700">John Doe</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.header>

      {/* Stats Overview */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {[
          { label: 'Current Streak', value: stats.currentStreak, icon: '🔥', color: 'bg-orange-500' },
          { label: 'Total Habits', value: stats.totalHabits, icon: '📝', color: 'bg-blue-500' },
          { label: 'Completed Today', value: stats.completedToday, icon: '✅', color: 'bg-green-500' },
          { label: 'Monthly Progress', value: `${stats.monthlyCompletion}%`, icon: '📊', color: 'bg-[#e0b6f5]' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            whileHover="hover"
            variants1={cardHoverVariants}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-white text-xl`}
              >
                {stat.icon}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Habits & Goals */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tab Navigation */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-2 shadow-lg"
          >
            <div className="flex space-x-2">
              {['habits', 'goals'].map((tab) => (
                <motion.button
                  key={tab}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-[#e0b6f5] text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tab === 'habits' ? 'My Habits' : 'My Goals'}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              {activeTab === 'habits' ? (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Today's Habits</h3>
                  {habits.map((habit, index) => (
                    <motion.div
                      key={habit.id}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => toggleHabit(habit.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            habit.completed
                              ? 'bg-green-500 border-green-500'
                              : 'border-gray-300'
                          }`}
                        >
                          {habit.completed && (
                            <motion.svg
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-4 h-4 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </motion.svg>
                          )}
                        </motion.button>
                        <div>
                          <h4 className="font-semibold text-gray-900">{habit.name}</h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>🔥 {habit.streak} days</span>
                            <span>•</span>
                            <span>{habit.frequency}</span>
                          </div>
                        </div>
                      </div>
                      <div className={`w-3 h-3 ${habit.color} rounded-full`}></div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">My Goals</h3>
                  {goals.map((goal, index) => (
                    <motion.div
                      key={goal.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover="hover"
                      variants={cardHoverVariants}
                      className="p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-semibold text-gray-900">{goal.name}</h4>
                        <span className="text-sm text-gray-500">Due: {goal.deadline}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${goal.progress}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                          className="bg-[#e0b6f5] h-3 rounded-full shadow-md"
                        ></motion.div>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-gray-600">{goal.progress}% Complete</span>
                        <span className="text-sm font-semibold text-[#e0b6f5]">
                          {goal.progress}/{goal.target}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column - Recent Activity & Quick Actions */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { action: 'Completed Morning Meditation', time: '2 hours ago', icon: '🧘' },
                { action: 'Exercise streak extended to 8 days', time: '4 hours ago', icon: '💪' },
                { action: 'Read Book habit logged', time: '6 hours ago', icon: '📚' },
                { action: 'New goal created: Learn Spanish', time: '1 day ago', icon: '🎯' },
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-[#e0b6f5] bg-opacity-20 rounded-full flex items-center justify-center">
                    <span>{activity.icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Add Habit', icon: '➕', color: 'bg-green-500' },
                { label: 'Set Goal', icon: '🎯', color: 'bg-blue-500' },
                { label: 'View Stats', icon: '📊', color: 'bg-purple-500' },
                { label: 'Settings', icon: '⚙️', color: 'bg-gray-500' },
              ].map((action, index) => (
                <motion.button
                  key={action.label}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-4 rounded-xl ${action.color} bg-opacity-10 hover:bg-opacity-20 transition-all duration-300 border border-transparent hover:border-${action.color.split('-')[1]}-300`}
                >
                  <div className="text-2xl mb-2">{action.icon}</div>
                  <span className="text-sm font-medium text-gray-900">{action.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#e0b6f5] rounded-full shadow-lg flex items-center justify-center text-white text-xl z-50"
      >
        <i className="fas fa-plus"></i>
      </motion.button>
    </div>
  );
};

export default Dashboard;