import { useState } from 'react';

/**
 * MODERN FINANCIAL DASHBOARD HOME PAGE
 * 
 * Interview Topics Covered:
 * - Modern dashboard design
 * - Responsive grid layouts
 * - Card-based UI components
 * - Interactive elements
 * - Gradient styling
 * - Financial UI patterns
 */

function Home() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
            Financial Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your performance and analytics
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Side (2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Card 1 - Primary with gradient */}
              <div className="bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-sm opacity-90 mb-2">Total Revenue</div>
                <div className="text-3xl font-bold mb-1">2,100</div>
                <div className="text-sm opacity-90">Customers</div>
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-2xl">↑</span>
                  <span className="text-lg font-semibold">75%</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total Orders</div>
                <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">758</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Orders</div>
                <div className="mt-4 flex items-center gap-2 text-cyan-500">
                  <span className="text-2xl">↑</span>
                  <span className="text-lg font-semibold">25%</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Conversion</div>
                <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">7.25</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Rate</div>
                <div className="mt-4 flex items-center gap-2 text-cyan-500">
                  <span className="text-2xl">↑</span>
                  <span className="text-lg font-semibold">33%</span>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total Sales</div>
                <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">35K</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Sales</div>
                <div className="mt-4 flex items-center gap-2 text-cyan-500">
                  <span className="text-2xl">↑</span>
                  <span className="text-lg font-semibold">68%</span>
                </div>
              </div>
            </div>

            {/* Weekly Summary Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                    Weekly Summary
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    26-27 March, 2019
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedPeriod('week')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedPeriod === 'week'
                        ? 'bg-cyan-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    Week
                  </button>
                  <button
                    onClick={() => setSelectedPeriod('month')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedPeriod === 'month'
                        ? 'bg-cyan-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    Month
                  </button>
                </div>
              </div>
              
              {/* Placeholder for chart - can be replaced with actual chart later */}
              <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">📊</div>
                  <p className="text-gray-600 dark:text-gray-400">Chart visualization area</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                    {selectedPeriod === 'week' ? 'Weekly' : 'Monthly'} data view
                  </p>
                </div>
              </div>
            </div>

            {/* Activity Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Recent Activity
              </h3>
              <div className="space-y-4">
                {[
                  { icon: '💰', title: 'Payment received', amount: '+$2,500', time: '2 hours ago', color: 'text-green-500' },
                  { icon: '🛒', title: 'New order placed', amount: '+$1,200', time: '5 hours ago', color: 'text-blue-500' },
                  { icon: '📤', title: 'Withdrawal processed', amount: '-$500', time: '1 day ago', color: 'text-red-500' },
                  { icon: '💳', title: 'Card payment', amount: '-$150', time: '2 days ago', color: 'text-orange-500' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{activity.icon}</div>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">{activity.title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                      </div>
                    </div>
                    <div className={`text-lg font-bold ${activity.color}`}>
                      {activity.amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Cards */}
          <div className="space-y-6">
            {/* My Cards Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                My Cards
              </h3>
              
              {/* Card 1 - VISA */}
              <div className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl p-6 mb-4 text-white">
                <div className="flex justify-between items-start mb-8">
                  <div className="text-sm opacity-80">VISA</div>
                  <div className="text-2xl">💳</div>
                </div>
                <div className="text-3xl font-bold mb-2">$45,000</div>
                <div className="flex items-center gap-2 text-sm opacity-80">
                  <span>••••</span>
                  <span>••••</span>
                  <span>5457</span>
                </div>
              </div>

              {/* Card 2 - VISA */}
              <div className="bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl p-6 mb-4">
                <div className="flex justify-between items-start mb-8">
                  <div className="text-sm text-gray-600 dark:text-gray-400">VISA</div>
                  <div className="text-2xl">💳</div>
                </div>
                <div className="text-3xl font-bold text-gray-800 dark:text-white mb-2">$45,000</div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>••••</span>
                  <span>••••</span>
                  <span>5157</span>
                </div>
              </div>

              {/* Add Card Button */}
              <button className="w-full py-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:border-cyan-500 hover:text-cyan-500 transition-colors">
                <span className="text-2xl mr-2">+</span>
                <span className="font-medium">Add New Card</span>
              </button>
            </div>

            {/* Balance Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Balanced
                </h3>
                <button className="text-2xl hover:scale-110 transition-transform">+</button>
              </div>
              <div className="text-4xl font-bold text-cyan-500 mb-6">$45,000</div>
              
              {/* Income/Expense */}
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-xl p-4 text-white">
                  <div className="text-sm opacity-90 mb-1">Income</div>
                  <div className="text-2xl font-bold">$1,000</div>
                </div>
                <div className="bg-gradient-to-r from-slate-700 to-slate-800 rounded-xl p-4 text-white">
                  <div className="text-sm opacity-90 mb-1">Expense</div>
                  <div className="text-2xl font-bold">$545</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <button className="w-full py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl flex items-center justify-center text-gray-700 dark:text-gray-300 hover:border-cyan-500 hover:text-cyan-500 transition-colors font-medium">
                  <span className="text-xl mr-2">+</span>
                  Add Fund
                </button>
                <button className="w-full py-3 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-xl text-white font-medium hover:shadow-lg transition-shadow">
                  WITHDRAW
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

/**
 * INTERVIEW NOTES:
 * 
 * 1. Modern Dashboard Design:
 *    - Card-based layout
 *    - Financial UI patterns
 *    - Gradient backgrounds
 *    - Responsive grid system
 * 
 * 2. Component Structure:
 *    - Stat cards with metrics
 *    - Activity feed
 *    - Card management
 *    - Balance tracking
 * 
 * 3. UX Patterns:
 *    - Hover effects
 *    - Smooth transitions
 *    - Clear visual hierarchy
 *    - Action buttons
 * 
 * 4. Responsive Design:
 *    - Mobile-first approach
 *    - Grid adapts to screen size
 *    - Touch-friendly buttons
 */

// Made with Bob
