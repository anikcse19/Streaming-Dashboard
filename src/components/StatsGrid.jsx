import { TrendingUp, DollarSign, Eye, Heart } from 'lucide-react'

function StatsGrid({ viewerCount, earnings, isLive }) {
  const stats = [
    {
      title: 'Live Viewers',
      value: viewerCount.toLocaleString(),
      icon: Eye,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      change: '+12%',
      trend: 'up'
    },
    {
      title: 'Total Earnings',
      value: `$${earnings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: DollarSign,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      change: '+8%',
      trend: 'up'
    },
    {
      title: 'Followers',
      value: '24.8K',
      icon: Heart,
      color: 'text-pink-400',
      bgColor: 'bg-pink-500/10',
      borderColor: 'border-pink-500/20',
      change: '+15%',
      trend: 'up'
    },
    {
      title: 'Engagement',
      value: '94.2%',
      icon: TrendingUp,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      change: '+3%',
      trend: 'up'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`${stat.bgColor} ${stat.borderColor} border backdrop-blur-sm rounded-xl p-6 hover:scale-105 transition-all duration-300 animate-fade-in`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
              <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              <div className="flex items-center mt-2">
                <span className={`text-sm font-medium ${stat.color}`}>
                  {stat.change}
                </span>
                <span className="text-gray-500 text-sm ml-1">vs last week</span>
              </div>
            </div>
            <div className={`${stat.color} ${stat.bgColor} p-3 rounded-lg`}>
              <stat.icon className="h-6 w-6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatsGrid