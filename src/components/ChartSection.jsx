import { BarChart3, TrendingUp } from 'lucide-react'

function ChartSection() {
  const chartData = [
    { day: 'Mon', viewers: 1200, earnings: 45 },
    { day: 'Tue', viewers: 1800, earnings: 62 },
    { day: 'Wed', viewers: 1500, earnings: 38 },
    { day: 'Thu', viewers: 2200, earnings: 89 },
    { day: 'Fri', viewers: 2800, earnings: 124 },
    { day: 'Sat', viewers: 3200, earnings: 156 },
    { day: 'Sun', viewers: 2900, earnings: 142 }
  ]

  const maxViewers = Math.max(...chartData.map(d => d.viewers))
  const maxEarnings = Math.max(...chartData.map(d => d.earnings))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Viewers Chart */}
      <div className="bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Weekly Viewers</h3>
          <BarChart3 className="h-5 w-5 text-purple-400" />
        </div>
        
        <div className="flex items-end justify-between h-40 space-x-2">
          {chartData.map((data, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div 
                className="w-full bg-gradient-to-t from-blue-500/80 to-blue-400/60 rounded-t-md transition-all duration-500 hover:from-blue-400 hover:to-blue-300"
                style={{ height: `${(data.viewers / maxViewers) * 100}%` }}
              ></div>
              <span className="text-gray-400 text-xs mt-2">{data.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Earnings Chart */}
      <div className="bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Weekly Earnings</h3>
          <TrendingUp className="h-5 w-5 text-green-400" />
        </div>
        
        <div className="flex items-end justify-between h-40 space-x-2">
          {chartData.map((data, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div 
                className="w-full bg-gradient-to-t from-green-500/80 to-green-400/60 rounded-t-md transition-all duration-500 hover:from-green-400 hover:to-green-300"
                style={{ height: `${(data.earnings / maxEarnings) * 100}%` }}
              ></div>
              <span className="text-gray-400 text-xs mt-2">{data.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ChartSection