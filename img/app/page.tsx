"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

export default function GameStart() {
  const [isLoading, setIsLoading] = useState(false)

  const handleStartGame = () => {
    setIsLoading(true)
    // Aquí iría la lógica para iniciar el juego
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-red-500 mb-8"
      >
        Cyber Nexus
      </motion.div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="w-64 h-64 rounded-full bg-gradient-to-br from-red-900 to-red-600 flex items-center justify-center mb-8"
      >
        <div className="w-60 h-60 rounded-full bg-black flex items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="px-8 py-3 bg-gradient-to-r from-red-700 to-red-500 text-white font-bold rounded-full text-xl shadow-neon-red"
            onClick={handleStartGame}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "INICIAR"}
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-red-500 text-sm"
      >
        Presiona INICIAR para comenzar tu aventura
      </motion.div>
    </div>
  )
}

