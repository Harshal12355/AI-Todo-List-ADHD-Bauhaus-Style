import { useState, useEffect, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Timer as TimerIcon, Check, Settings, X } from "lucide-react";
import MainLayout from "@/components/layouts/MainLayout";
import BauhausButton from "@/components/ui/bauhaus-button";
import BauhausCard from "@/components/ui/bauhaus-card";
import BauhausPattern from "@/components/ui/bauhaus-patterns";

type TimerMode = "focus" | "short-break" | "long-break";

const DEFAULT_FOCUS_MINUTES = 25;
const DEFAULT_SHORT_BREAK_MINUTES = 5;
const DEFAULT_LONG_BREAK_MINUTES = 15;

const PomodoroTimer = () => {
  const { toast } = useToast();
  const [mode, setMode] = useState<TimerMode>("focus");
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(DEFAULT_FOCUS_MINUTES * 60);
  const [sessions, setSessions] = useState(0);
  
  const [focusMinutes, setFocusMinutes] = useState(DEFAULT_FOCUS_MINUTES);
  const [shortBreakMinutes, setShortBreakMinutes] = useState(DEFAULT_SHORT_BREAK_MINUTES);
  const [longBreakMinutes, setLongBreakMinutes] = useState(DEFAULT_LONG_BREAK_MINUTES);
  
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const intervalRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3");
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    let minutes = focusMinutes;
    if (mode === "short-break") minutes = shortBreakMinutes;
    if (mode === "long-break") minutes = longBreakMinutes;
    
    setTimeLeft(minutes * 60);
    setIsRunning(false);
    clearInterval(intervalRef.current || undefined);
    intervalRef.current = null;
  }, [mode, focusMinutes, shortBreakMinutes, longBreakMinutes]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current || undefined);
            intervalRef.current = null;
            setIsRunning(false);
            
            if (audioRef.current) {
              audioRef.current.play().catch(() => {
                console.log("Audio play prevented by browser - requires user interaction");
              });
            }
            
            const nextMode = getNextMode();
            toast({
              title: `${formatModeName(mode)} completed!`,
              description: `Time to ${nextMode === "focus" ? "focus" : "take a break"}!`,
            });
            
            if (mode === "focus") {
              const newSessions = sessions + 1;
              setSessions(newSessions);
              if (newSessions % 4 === 0) {
                setMode("long-break");
              } else {
                setMode("short-break");
              }
            } else {
              setMode("focus");
            }
            
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current || undefined);
      intervalRef.current = null;
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, mode, toast, sessions]);

  const getNextMode = (): TimerMode => {
    if (mode === "focus") {
      return (sessions + 1) % 4 === 0 ? "long-break" : "short-break";
    }
    return "focus";
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    let minutes = focusMinutes;
    if (mode === "short-break") minutes = shortBreakMinutes;
    if (mode === "long-break") minutes = longBreakMinutes;
    
    setTimeLeft(minutes * 60);
    setIsRunning(false);
    clearInterval(intervalRef.current || undefined);
    intervalRef.current = null;
  };

  const formatModeName = (mode: TimerMode): string => {
    switch (mode) {
      case "focus": return "Focus";
      case "short-break": return "Short Break";
      case "long-break": return "Long Break";
      default: return "Focus";
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const calculateProgress = (): number => {
    let totalTime;
    if (mode === "focus") totalTime = focusMinutes * 60;
    else if (mode === "short-break") totalTime = shortBreakMinutes * 60;
    else totalTime = longBreakMinutes * 60;
    
    return 100 - (timeLeft / totalTime) * 100;
  };

  const applySettings = () => {
    setIsSettingsOpen(false);
    resetTimer();
  };

  // Get colors based on current mode
  const getModeColors = () => {
    switch (mode) {
      case "focus":
        return {
          primary: "bg-bauhaus-red",
          text: "text-bauhaus-red",
          border: "border-bauhaus-red",
          accent: "red"
        };
      case "short-break":
        return {
          primary: "bg-bauhaus-blue",
          text: "text-bauhaus-blue",
          border: "border-bauhaus-blue",
          accent: "blue"
        };
      case "long-break":
        return {
          primary: "bg-bauhaus-yellow",
          text: "text-bauhaus-yellow",
          border: "border-bauhaus-yellow",
          accent: "yellow"
        };
      default:
        return {
          primary: "bg-bauhaus-red",
          text: "text-bauhaus-red",
          border: "border-bauhaus-red",
          accent: "red"
        };
    }
  };

  const colors = getModeColors();

  return (
    <MainLayout showProtectedLinks={true}>
      <div className="relative">
        {/* Bauhaus pattern */}
        <BauhausPattern variant="background" />
        
        <div className="container max-w-5xl py-12 px-4 relative z-10">
          <div className="mb-2 text-blue-600 uppercase tracking-wide font-bold">
            PRODUCTIVITY TOOL
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
            Pomodoro Timer
          </h1>
          
          <div className="md:flex gap-8 items-start">
            {/* Timer */}
            <div className="md:w-1/2 mb-8 md:mb-0">
              <BauhausCard 
                color="white" 
                accent="left" 
                className={colors.border}
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold mb-2">
                    {formatModeName(mode)}
                  </h2>
                  <p className="text-bauhaus-gray">
                    {mode === "focus" 
                      ? "Time to concentrate on your task" 
                      : "Take a moment to refresh your mind"}
                  </p>
                </div>
                
                <div className="relative w-60 h-60 mx-auto mb-8">
                  {/* Timer circle background */}
                  <div className="absolute inset-0 rounded-full border-[16px] border-gray-100"></div>
                  
                  {/* Progress circle */}
                  <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                    <circle
                      cx="120"
                      cy="120"
                      r="102"
                      strokeWidth="16"
                      stroke={
                        mode === "focus" 
                          ? "#e53935" 
                          : mode === "short-break" 
                            ? "#1565c0" 
                            : "#ffc107"
                      }
                      fill="none"
                      strokeDasharray={2 * Math.PI * 102}
                      strokeDashoffset={(2 * Math.PI * 102) * (1 - calculateProgress() / 100)}
                      strokeLinecap="round"
                    />
                  </svg>
                  
                  {/* Time display */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl md:text-6xl font-bold">{formatTime(timeLeft)}</span>
                  </div>
                </div>
                
                <div className="flex justify-center gap-4 mb-8">
                  <BauhausButton
                    variant={mode === "focus" ? "secondary" : mode === "short-break" ? "blue" : "yellow"}
                    onClick={toggleTimer}
                    className="px-6"
                  >
                    {isRunning ? (
                      <>
                        <Pause className="mr-2" size={18} /> PAUSE
                      </>
                    ) : (
                      <>
                        <Play className="mr-2" size={18} /> START
                      </>
                    )}
                  </BauhausButton>
                  
                  <BauhausButton
                    variant="outline"
                    onClick={resetTimer}
                    className="px-6"
                  >
                    RESET
                  </BauhausButton>
                </div>
                
                <div className="flex justify-center gap-4 flex-wrap">
                  <button
                    onClick={() => setMode("focus")}
                    className={`py-2 px-6 rounded-full min-w-20 font-medium transition-colors ${
                      mode === "focus" 
                      ? "bg-bauhaus-red text-white" 
                      : "bg-white text-bauhaus-black hover:bg-gray-100"
                    }`}
                  >
                    Focus
                  </button>
                  
                  <button
                    onClick={() => setMode("short-break")}
                    className={`py-2 px-6 rounded-full min-w-32 font-medium transition-colors ${
                      mode === "short-break" 
                      ? "bg-bauhaus-blue text-white" 
                      : "border-2 border-bauhaus-blue text-bauhaus-blue hover:bg-blue-50"
                    }`}
                  >
                    Short Break
                  </button>
                  
                  <button
                    onClick={() => setMode("long-break")}
                    className={`py-2 px-6 rounded-full min-w-28 font-medium transition-colors ${
                      mode === "long-break" 
                      ? "bg-bauhaus-yellow text-bauhaus-black" 
                      : "border-2 border-bauhaus-yellow text-bauhaus-yellow hover:bg-yellow-50"
                    }`}
                  >
                    Long Break
                  </button>
                </div>
              </BauhausCard>
              
              <div className="mt-6 flex justify-center items-center">
                <TimerIcon className="text-bauhaus-gray mr-2" size={20} />
                <span className="text-bauhaus-gray font-medium">
                  Sessions completed today: <span className="font-bold">{sessions}</span>
                </span>
              </div>
            </div>
            
            {/* Settings */}
            <div className="md:w-1/2">
              <BauhausCard color="white" accent="top" className="border-t-bauhaus-black">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Timer Settings</h2>
                  <Settings size={20} className="text-bauhaus-gray" />
                </div>
                
                <div className="space-y-8">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="font-medium">Focus Duration</label>
                      <span className="font-bold text-bauhaus-red">{focusMinutes} min</span>
                    </div>
                    <Slider
                      value={[focusMinutes]}
                      min={5}
                      max={60}
                      step={5}
                      onValueChange={(value) => setFocusMinutes(value[0])}
                      className="focus:ring-bauhaus-red"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="font-medium">Short Break Duration</label>
                      <span className="font-bold text-bauhaus-blue">{shortBreakMinutes} min</span>
                    </div>
                    <Slider
                      value={[shortBreakMinutes]}
                      min={1}
                      max={15}
                      step={1}
                      onValueChange={(value) => setShortBreakMinutes(value[0])}
                      className="focus:ring-bauhaus-blue"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="font-medium">Long Break Duration</label>
                      <span className="font-bold text-bauhaus-yellow">{longBreakMinutes} min</span>
                    </div>
                    <Slider
                      value={[longBreakMinutes]}
                      min={5}
                      max={30}
                      step={5}
                      onValueChange={(value) => setLongBreakMinutes(value[0])}
                      className="focus:ring-bauhaus-yellow"
                    />
                  </div>
                  
                  <BauhausButton
                    variant="primary"
                    className="w-full"
                    onClick={applySettings}
                  >
                    <Check className="mr-2" size={18} /> APPLY SETTINGS
                  </BauhausButton>
                </div>
                
                <div className="mt-8 pt-8 border-t border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-bauhaus-black flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">?</span>
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">About the Pomodoro Technique</h3>
                      <p className="text-bauhaus-gray text-sm">
                        The Pomodoro Technique is a time management method that uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks. Each interval is known as a pomodoro, from the Italian word for tomato, after the tomato-shaped kitchen timer that inspired the method.
                      </p>
                    </div>
                  </div>
                </div>
              </BauhausCard>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PomodoroTimer;

