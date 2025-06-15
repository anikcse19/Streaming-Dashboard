import { Play, Square, Mic, MicOff, Video, VideoOff, Settings } from 'lucide-react'
import { useState } from 'react'

function StreamControls({ isLive, setIsLive }) {
  const [micOn, setMicOn] = useState(true)
  const [cameraOn, setCameraOn] = useState(true)

  const handleGoLive = () => {
    setIsLive(!isLive)
  }

  return (
    <div className="bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-6">Stream Controls</h3>
      
      <div className="space-y-6">
        {/* Main Stream Control */}
        <div className="flex items-center justify-center">
          <button
            onClick={handleGoLive}
            className={`${
              isLive 
                ? 'bg-red-500 hover:bg-red-600 animate-pulse-glow' 
                : 'bg-green-500 hover:bg-green-600'
            } text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2`}
          >
            {isLive ? (
              <>
                <Square className="h-5 w-5" />
                <span>Stop Stream</span>
              </>
            ) : (
              <>
                <Play className="h-5 w-5" />
                <span>Go Live</span>
              </>
            )}
          </button>
        </div>

        {/* Control Buttons */}
        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => setMicOn(!micOn)}
            className={`${
              micOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'
            } text-white p-4 rounded-xl transition-all duration-300 flex items-center justify-center`}
          >
            {micOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
          </button>
          
          <button
            onClick={() => setCameraOn(!cameraOn)}
            className={`${
              cameraOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'
            } text-white p-4 rounded-xl transition-all duration-300 flex items-center justify-center`}
          >
            {cameraOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
          </button>
          
          <button className="bg-gray-700 hover:bg-gray-600 text-white p-4 rounded-xl transition-all duration-300 flex items-center justify-center">
            <Settings className="h-5 w-5" />
          </button>
        </div>

        {/* Stream Info */}
        <div className="bg-white/5 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Stream Quality</span>
            <span className="text-white text-sm font-medium">1080p 60fps</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Bitrate</span>
            <span className="text-white text-sm font-medium">6000 kbps</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Server</span>
            <span className="text-green-400 text-sm font-medium">●  US West</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2">
          <h4 className="text-white font-medium">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-2">
            <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-sm transition-colors">
              Start Recording
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm transition-colors">
              Take Screenshot
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StreamControls