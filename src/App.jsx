import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { FaMoneyBillWave, FaChartPie, FaBell } from 'react-icons/fa';

ChartJS.register(ArcElement, Tooltip, Legend);

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState(2000);
  const [spent, setSpent] = useState(0);
  const [alert, setAlert] = useState('');

  useEffect(() => {
    const total = transactions.reduce((sum, t) => sum + t.amount, 0);
    setSpent(total);
    if (total > budget * 0.9) {
      setAlert('Warning: You\'ve spent over 90% of your budget!');
    }
  }, [transactions, budget]);

  const addTransaction = (amount, category) => {
    setTransactions([...transactions, {
      id: Date.now(),
      amount: Number(amount),
      category,
      date: new Date().toLocaleDateString()
    }]);
  };

  const chartData = {
    labels: transactions.map(t => t.category),
    datasets: [{
      label: 'Spending',
      data: transactions.map(t => t.amount),
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF'
      ],
      hoverOffset: 4
    }]
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Personal Finance Manager</h1>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Budget</h2>
            <p className="text-2xl">${budget}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Spent</h2>
            <p className={`text-2xl ${spent > budget ? 'text-red-500' : 'text-green-500'}`}>
              ${spent}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Remaining</h2>
            <p className="text-2xl">${budget - spent}</p>
          </div>
        </div>

        {alert && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-8">
            <FaBell className="inline-block mr-2" />
            {alert}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const amount = e.target.amount.value;
              const category = e.target.category.value;
              addTransaction(amount, category);
              e.target.reset();
            }}>
              <div className="mb-4">
                <label className="block mb-2">Amount</label>
                <input
                  type="number"
                  name="amount"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Category</label>
                <select
                  name="category"
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="Food">Food</option>
                  <option value="Transport">Transport</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add Transaction
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Spending Breakdown</h2>
            <div className="h-64">
              <Doughnut data={chartData} />
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Date</th>
                <th className="text-left">Category</th>
                <th className="text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(t => (
                <tr key={t.id} className="border-t">
                  <td className="py-2">{t.date}</td>
                  <td>{t.category}</td>
                  <td className={t.amount > 0 ? 'text-green-500' : 'text-red-500'}>
                    ${t.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
