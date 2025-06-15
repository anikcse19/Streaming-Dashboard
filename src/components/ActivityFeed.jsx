import { MessageCircle, UserPlus, Gift, Star } from 'lucide-react'

function ActivityFeed() {
  const activities = [
    {
      type: 'follow',
      user: 'GamerPro123',
      action: 'started following you',
      time: '2m ago',
      icon: UserPlus,
      color: 'text-blue-400'
    },
    {
      type: 'donation',
      user: 'StreamFan99',
      action: 'donated $25.00',
      message: 'Great stream! Keep it up! 🔥',
      time: '5m ago',
      icon: Gift,
      color: 'text-green-400'
    },
    {
      type: 'chat',
      user: 'ChatMaster',
      action: 'sent a message',
      message: 'This game is amazing!',
      time: '8m ago',
      icon: MessageCircle,
      color: 'text-purple-400'
    },
    {
      type: 'subscriber',
      user: 'NewSubber',
      action: 'subscribed for 3 months',
      time: '12m ago',
      icon: Star,
      color: 'text-yellow-400'
    },
    {
      type: 'follow',
      user: 'RetroGamer',
      action: 'started following you',
      time: '15m ago',
      icon: UserPlus,
      color: 'text-blue-400'
    },
    {
      type: 'chat',
      user: 'Viewer42',
      action: 'sent a message',
      message: 'How do you get so good at this?',
      time: '18m ago',
      icon: MessageCircle,
      color: 'text-purple-400'
    }
  ]

  return (
    <div className="bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-6">Recent Activity</h3>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities.map((activity, index) => (
          <div 
            key={index} 
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={`${activity.color} bg-white/10 p-2 rounded-full flex-shrink-0`}>
              <activity.icon className="h-4 w-4" />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-300">
                <span className="font-medium text-white">{activity.user}</span>
                {' '}
                <span className="text-gray-400">{activity.action}</span>
              </p>
              
              {activity.message && (
                <p className="text-sm text-gray-400 mt-1 italic">
                  "{activity.message}"
                </p>
              )}
              
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 py-2 text-sm text-purple-400 hover:text-purple-300 transition-colors">
        View All Activity
      </button>
    </div>
  )
}

export default ActivityFeed