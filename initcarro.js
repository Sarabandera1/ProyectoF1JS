"use client"

import { useEffect, useRef, useState } from "react"
import { Application } from "@splinetool/runtime"
import { Button } from "@/components/ui/button"

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const app = new Application(canvas)
      app
        .load("https://prod.spline.design/Ho3KHrFGsRy2Wy8F/scene.splinecode")
        .then(() => setIsLoading(false))
        .catch(console.error)
    }
  }, [])

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black">
      {}
      <div className="absolute inset-0 grid grid-cols-12 gap-4 opacity-20">
        {Array.from({ length: 144 }).map((_, i) => (
          <div key={i} className="aspect-square border border-red-900/20" />
        ))}
      </div>


      <canvas ref={canvasRef} className="relative w-full h-full z-10" />

    
      <div className="absolute top-0 left-0 w-full h-16 flex items-center">
        <div className="w-32 h-1 bg-red-600 shadow-[0_0_10px_rgba(255,0,0,0.7)]" />
        <div className="w-4 h-4 border-l-2 border-t-2 border-red-600 -ml-0.5 shadow-[0_0_10px_rgba(255,0,0,0.7)]" />
        <div className="flex-1" />
        <div className="w-4 h-4 border-r-2 border-t-2 border-red-600 shadow-[0_0_10px_rgba(255,0,0,0.7)]" />
        <div className="w-32 h-1 bg-red-600 shadow-[0_0_10px_rgba(255,0,0,0.7)]" />
      </div>

      
      <div className="absolute bottom-0 left-0 w-full h-16 flex items-center">
        <div className="w-32 h-1 bg-red-600 shadow-[0_0_10px_rgba(255,0,0,0.7)]" />
        <div className="w-4 h-4 border-l-2 border-b-2 border-red-600 -ml-0.5 shadow-[0_0_10px_rgba(255,0,0,0.7)]" />
        <div className="flex-1" />
        <div className="w-4 h-4 border-r-2 border-b-2 border-red-600 shadow-[0_0_10px_rgba(255,0,0,0.7)]" />
        <div className="w-32 h-1 bg-red-600 shadow-[0_0_10px_rgba(255,0,0,0.7)]" />
      </div>

      
      <div className="absolute left-8 top-16 bottom-16 w-1 flex flex-col">
        <div className="h-32 bg-red-600 shadow-[0_0_10px_rgba(255,0,0,0.7)]" />
        <div className="flex-1" />
        <div className="h-32 bg-red-600 shadow-[0_0_10px_rgba(255,0,0,0.7)]" />
      </div>
      <div className="absolute right-8 top-16 bottom-16 w-1 flex flex-col">
        <div className="h-32 bg-red-600 shadow-[0_0_10px_rgba(255,0,0,0.7)]" />
        <div className="flex-1" />
        <div className="h-32 bg-red-600 shadow-[0_0_10px_rgba(255,0,0,0.7)]" />
      </div>

  
      <div className="absolute top-4 right-44 flex space-x-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="w-4 h-4 border-t-2 border-r-2 border-red-600 transform rotate-45 animate-pulse"
            style={{
              animationDelay: `${i * 0.2}s`,
              boxShadow: "0 0 10px rgba(255,0,0,0.7)",
            }}
          />
        ))}
      </div>

  
      {!isLoading && (
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2">
          <Button
            className="
              px-12 py-6 
              text-3xl font-bold 
              bg-transparent 
              border-2 border-red-500 
              text-red-500
              rounded-none
              hover:bg-red-500/10
              transition-all duration-300
              shadow-[0_0_20px_rgba(255,0,0,0.4)]
              hover:shadow-[0_0_30px_rgba(255,0,0,0.7)]
              relative
              overflow-hidden
              group
            "
          >
            <span className="relative z-10">INICIO</span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-transparent animate-pulse" />
            </div>
          </Button>
        </div>
      )}

  
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-50">
          <div className="text-2xl text-red-500 font-bold animate-pulse">CARGANDO...</div>
        </div>
      )}
    </main>
  )
}

