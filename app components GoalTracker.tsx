'use client'

import { useState, useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Edit2, Trash2, TrendingUp, Calendar, Bell, CheckCircle } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData, ChartOptions } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

type Goal = {
  id: number;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
  reminderFrequency: 'daily' | 'weekly' | 'monthly';
  isCompleted: boolean;
}

const categories = ['Savings', 'Investment', 'Debt Repayment', 'Education', 'Travel', 'Home', 'Other'];

export default function GoalTracker() {
  const { user } = useAppContext();
  const [goals, setGoals] = useState<Goal[]>([
    { id: 1, title: 'Emergency Fund', targetAmount: 1000, currentAmount: 500, deadline: '2023-12-31', category: 'Savings', reminderFrequency: 'weekly', isCompleted: false },
    { id: 2, title: 'Business Expansion', targetAmount: 5000, currentAmount: 1000, deadline: '2024-06-30', category: 'Investment', reminderFrequency: 'monthly', isCompleted: false }
  ]);
  const [newGoal, setNewGoal] = useState({ title: '', targetAmount: '', currentAmount: '', deadline: '', category: '', reminderFrequency: 'weekly' });
  const [editingGoalId, setEditingGoalId] = useState<number | null>(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const checkGoalProgress = () => {
      goals.forEach(goal => {
        const progress = (goal.currentAmount / goal.targetAmount) * 100;
        if (progress >= 25 && progress < 26) {
          toast.success(`You've reached 25% of your goal: ${goal.title}!`);
        } else if (progress >= 50 && progress < 51) {
          toast.success(`Halfway there! You've reached 50% of your goal: ${goal.title}!`);
        } else if (progress >= 75 && progress < 76) {
          toast.success(`Almost there! You've reached 75% of your goal: ${goal.title}!`);
        } else if (progress >= 100 && !goal.isCompleted) {
          toast.success(`Congratulations! You've achieved your goal: ${goal.title}!`);
          setGoals(goals.map(g => g.id === goal.id ? { ...g, isCompleted: true } : g));
        }
      });
    };

    checkGoalProgress();

    // Simulating reminders
    const interval = setInterval(() => {
      const now = new Date();
      goals.forEach(goal => {
        if (goal.reminderFrequency === 'daily') {
          toast.info(`Daily reminder: Don't forget about your goal "${goal.title}"`);
        } else if (goal.reminderFrequency === 'weekly' && now.getDay() === 1) { // Monday
          toast.info(`Weekly reminder: Keep working on your goal "${goal.title}"`);
        } else if (goal.reminderFrequency === 'monthly' && now.getDate() === 1) {
          toast.info(`Monthly reminder: Check your progress on "${goal.title}"`);
        }
      });
    }, 60000); // Check every minute (in real app, this would be less frequent)

    return () => clearInterval(interval);
  }, [goals]);

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoal.title && newGoal.targetAmount && newGoal.deadline && newGoal.category) {
      setGoals([...goals, {
        id: Date.now(),
        title: newGoal.title,
        targetAmount: parseFloat(newGoal.targetAmount),
        currentAmount: parseFloat(newGoal.currentAmount) || 0,
        deadline: newGoal.deadline,
        category: newGoal.category,
        reminderFrequency: newGoal.reminderFrequency as 'daily' | 'weekly' | 'monthly',
        isCompleted: false
      }]);
      setNewGoal({ title: '', targetAmount: '', currentAmount: '', deadline: '', category: '', reminderFrequency: 'weekly' });
      toast.success('New goal added successfully!');
    }
  };

  const handleEditGoal = (goal: Goal) => {
    setEditingGoalId(goal.id);
    setNewGoal({
      title: goal.title,
      targetAmount: goal.targetAmount.toString(),
      currentAmount: goal.currentAmount.toString(),
      deadline: goal.deadline,
      category: goal.category,
      reminderFrequency: goal.reminderFrequency
    });
  };

  const handleUpdateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingGoalId && newGoal.title && newGoal.targetAmount && newGoal.deadline && newGoal.category) {
      setGoals(goals.map(goal =>
        goal.id === editingGoalId ? {
          ...goal,
          title: newGoal.title,
          targetAmount: parseFloat(newGoal.targetAmount),
          currentAmount: parseFloat(newGoal.currentAmount) || goal.currentAmount,
          deadline: newGoal.deadline,
          category: newGoal.category,
          reminderFrequency: newGoal.reminderFrequency as 'daily' | 'weekly' | 'monthly'
        } : goal
      ));
      setEditingGoalId(null);
      setNewGoal({ title: '', targetAmount: '', currentAmount: '', deadline: '', category: '', reminderFrequency: 'weekly' });
      toast.success('Goal updated successfully!');
    }
  };

  const handleDeleteGoal = (id: number) => {
    setGoals(goals.filter(goal => goal.id !== id));
    toast.success('Goal deleted successfully!');
  };

  const handleProgressUpdate = (id: number, amount: number) => {
    setGoals(goals.map(goal =>
      goal.id === id ? { ...goal, currentAmount: Math.min(goal.currentAmount + amount, goal.targetAmount) } : goal
    ));
    toast.success(`Progress updated for goal: ${goals.find(g => g.id === id)?.title}`);
  };

  const filteredGoals = filter === 'all' ? goals : goals.filter(goal => goal.category === filter);

  const pieChartData: ChartData<'pie'> = {
    labels: categories,
    datasets: [{
      data: categories.map(category =>
        goals.filter(goal => goal.category === category).reduce((sum, goal) => sum + goal.targetAmount, 0)
      ),
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF'
      ]
    }]
  };

  const pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingGoalId ? 'Edit Goal' : 'Set New Goal'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={editingGoalId ? handleUpdateGoal : handleAddGoal} className="space-y-4">
            <input
              type="text"
              placeholder="Goal Title"
              value={newGoal.title}
              onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="number"
              placeholder="Target Amount"
              value={newGoal.targetAmount}
              onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="number"
              placeholder="Current Amount (optional)"
              value={newGoal.currentAmount}
              onChange={(e) => setNewGoal({ ...newGoal, currentAmount: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <input
              type="date"
              placeholder="Deadline"
              value={newGoal.deadline}
              onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <select
              value={newGoal.category}
              onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              value={newGoal.reminderFrequency}
              onChange={(e) => setNewGoal({ ...newGoal, reminderFrequency: e.target.value as 'daily' | 'weekly' | 'monthly' })}
              className="w-full p-2 border rounded"
              required
            >
              <option value="daily">Daily Reminders</option>
              <option value="weekly">Weekly Reminders</option>
              <option value="monthly">Monthly Reminders</option>
            </select>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300">
              {editingGoalId ? 'Update Goal' : 'Add Goal'}
            </button>
          </form>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Goals</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredGoals.map(goal => (
          <Card key={goal.id} className={goal.isCompleted ? 'bg-green-100' : ''}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{goal.title}</span>
                <div className="space-x-2">
                  <button onClick={() => handleEditGoal(goal)} className="text-blue-500 hover:text-blue-600">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDeleteGoal(goal.id)} className="text-red-500 hover:text-red-600">
                    <Trash2 size={18} />
                  </button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">${goal.currentAmount} / ${goal.targetAmount}</p>
              <Progress value={(goal.currentAmount / goal.targetAmount) * 100} className="my-2" />
              <p className="text-sm text-gray-600 flex items-center"><Calendar className="mr-2" size={16} /> Deadline: {new Date(goal.deadline).toLocaleDateString()}</p>
              <p className="text-sm text-gray-600 flex items-center"><TrendingUp className="mr-2" size={16} /> Category: {goal.category}</p>
              <p className="text-sm text-gray-600 flex items-center"><Bell className="mr-2" size={16} /> Reminders: {goal.reminderFrequency}</p>
              {goal.isCompleted && <p className="text-sm text-green-600 flex items-center"><CheckCircle className="mr-2" size={16} /> Completed!</p>}
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleProgressUpdate(goal.id, 10)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-300"
                  disabled={goal.isCompleted}
                >
                  +$10
                </button>
                <button
                  onClick={() => handleProgressUpdate(goal.id, 50)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-300"
                  disabled={goal.isCompleted}
                >
                  +$50
                </button>
                <button
                  onClick={() => handleProgressUpdate(goal.id, 100)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-300"
                  disabled={goal.isCompleted}
                >
                  +$100
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Goal Distribution by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64">
            <Pie data={pieChartData} options={pieChartOptions} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

