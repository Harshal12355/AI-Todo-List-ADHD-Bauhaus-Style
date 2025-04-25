
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Pause, Timer, Check } from "lucide-react";
import MainLayout from "@/components/layouts/MainLayout";

type TimerMode = "focus" | "short-break" | "long-break";

const DEFAULT_FOCUS_MINUTES = 25;
const DEFAULT_SHORT_BREAK_MINUTES = 5;
const DEFAULT_LONG_BREAK_MINUTES = 15;

const Timer = () => {
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

  // Initialize audio (browser needs user interaction first)
  useEffect(() => {
    audioRef.current = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3");
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Reset timer when mode changes
  useEffect(() => {
    let minutes = focusMinutes;
    if (mode === "short-break") minutes = shortBreakMinutes;
    if (mode === "long-break") minutes = longBreakMinutes;
    
    setTimeLeft(minutes * 60);
    setIsRunning(false);
    clearInterval(intervalRef.current || undefined);
    intervalRef.current = null;
  }, [mode, focusMinutes, shortBreakMinutes, longBreakMinutes]);

  // Timer logic
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            // Timer finished
            clearInterval(intervalRef.current || undefined);
            intervalRef.current = null;
            setIsRunning(false);
            
            if (audioRef.current) {
              audioRef.current.play().catch(() => {
                console.log("Audio play prevented by browser - requires user interaction");
              });
            }
            
            // Show notification
            const nextMode = getNextMode();
            toast({
              title: `${formatModeName(mode)} completed!`,
              description: `Time to ${nextMode === "focus" ? "focus" : "take a break"}!`,
            });
            
            // Auto transition to next mode
            if (mode === "focus") {
              const newSessions = sessions + 1;
              setSessions(newSessions);
              // Every 4 sessions, take a long break
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

  return (
    <MainLayout>
      <div className="bauhaus-container">
        <div className="container max-w-3xl">
          <h1 className="bauhaus-header mb-8">Pomodoro Timer</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Card className="bauhaus-card">
                <CardHeader className="pb-0">
                  <CardTitle className="text-center text-xl">
                    {formatModeName(mode)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <div className="relative w-64 h-64 mb-8">
                      {/* Circular progress background */}
                      <div className="absolute inset-0 rounded-full border-8 border-bauhaus-background"></div>
                      
                      {/* Circular progress indicator */}
                      <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          fill="none"
                          stroke={mode === "focus" ? "#ea384c" : mode === "short-break" ? "#1EAEDB" : "#F7DF1E"}
                          strokeWidth="8"
                          strokeDasharray={`${2 * Math.PI * 28}`}
                          strokeDashoffset={`${2 * Math.PI * 28 * (1 - calculateProgress() / 100)}`}
                          strokeLinecap="round"
                          style={{ transformOrigin: "center", transform: "scale(4)" }}
                        />
                      </svg>
                      
                      {/* Timer text */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-5xl font-bold">{formatTime(timeLeft)}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <Button
                        className={`bauhaus-btn ${mode === "focus" ? "bauhaus-btn-primary" : mode === "short-break" ? "bg-bauhaus-blue text-white" : "bg-bauhaus-yellow text-bauhaus-black"}`}
                        onClick={toggleTimer}
                      >
                        {isRunning ? (
                          <>
                            <Pause className="mr-2" size={18} /> Pause
                          </>
                        ) : (
                          <>
                            <Play className="mr-2" size={18} /> Start
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        className="bauhaus-btn border-2"
                        onClick={resetTimer}
                      >
                        Reset
                      </Button>
                    </div>
                    
                    <div className="flex justify-center mt-8 gap-2">
                      <Button
                        variant={mode === "focus" ? "default" : "outline"}
                        className={`rounded-none ${mode === "focus" ? "bg-bauhaus-red text-white" : "border-bauhaus-red text-bauhaus-red"}`}
                        onClick={() => setMode("focus")}
                      >
                        Focus
                      </Button>
                      <Button
                        variant={mode === "short-break" ? "default" : "outline"}
                        className={`rounded-none ${mode === "short-break" ? "bg-bauhaus-blue text-white" : "border-bauhaus-blue text-bauhaus-blue"}`}
                        onClick={() => setMode("short-break")}
                      >
                        Short Break
                      </Button>
                      <Button
                        variant={mode === "long-break" ? "default" : "outline"}
                        className={`rounded-none ${mode === "long-break" ? "bg-bauhaus-yellow text-bauhaus-black" : "border-bauhaus-yellow text-bauhaus-yellow"}`}
                        onClick={() => setMode("long-break")}
                      >
                        Long Break
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-6 text-center">
                <p className="text-bauhaus-gray">
                  <Timer className="inline-block mr-2" size={16} />
                  Sessions completed today: <span className="font-bold">{sessions}</span>
                </p>
              </div>
            </div>
            
            <div>
              <Card className="bauhaus-card">
                <CardHeader>
                  <CardTitle>Timer Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Focus Duration</span>
                      <span className="font-bold">{focusMinutes} min</span>
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
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Short Break Duration</span>
                      <span className="font-bold">{shortBreakMinutes} min</span>
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
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Long Break Duration</span>
                      <span className="font-bold">{longBreakMinutes} min</span>
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
                  
                  <Button
                    className="bauhaus-btn w-full bg-bauhaus-black text-white hover:bg-bauhaus-black/90"
                    onClick={applySettings}
                  >
                    <Check className="mr-2" size={18} /> Apply Settings
                  </Button>
                  
                  <div className="mt-4 pt-4 border-t border-bauhaus-background">
                    <h3 className="font-bold mb-2">Pomodoro Technique</h3>
                    <p className="text-sm text-bauhaus-gray">
                      The Pomodoro Technique is a time management method based on 25-minute stretches of focused work broken by 5-minute breaks. After four pomodoros, take a longer break.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Timer;
