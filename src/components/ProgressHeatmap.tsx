
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, TrendingDown, TrendingUp } from 'lucide-react';

const ProgressHeatmap = () => {
  // Generate sample heatmap data for the last 12 weeks
  const generateHeatmapData = () => {
    const weeks = [];
    const today = new Date();
    
    for (let i = 11; i >= 0; i--) {
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - (i * 7));
      
      const days = [];
      for (let j = 0; j < 7; j++) {
        const day = new Date(weekStart);
        day.setDate(weekStart.getDate() + j);
        
        // Generate realistic progress data
        const progress = Math.random() * 100;
        const intensity = progress > 80 ? 'high' : progress > 50 ? 'medium' : progress > 20 ? 'low' : 'none';
        
        days.push({
          date: day.toISOString().split('T')[0],
          progress: Math.round(progress),
          intensity,
          topics: Math.floor(Math.random() * 5) + 1
        });
      }
      
      weeks.push({
        weekStart: weekStart.toISOString().split('T')[0],
        days
      });
    }
    
    return weeks;
  };

  const heatmapData = generateHeatmapData();
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getIntensityClass = (intensity: string) => {
    switch (intensity) {
      case 'high': return 'bg-green-600 hover:bg-green-700';
      case 'medium': return 'bg-green-400 hover:bg-green-500';
      case 'low': return 'bg-green-200 hover:bg-green-300';
      default: return 'bg-gray-100 hover:bg-gray-200';
    }
  };

  const getWeekProgress = (week: any) => {
    const totalProgress = week.days.reduce((sum: number, day: any) => sum + day.progress, 0);
    return Math.round(totalProgress / 7);
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Progress Heatmap
            </CardTitle>
            <CardDescription>Teaching activity over the last 12 weeks</CardDescription>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-100 rounded-sm" />
              <span>No Activity</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-200 rounded-sm" />
              <span>Low</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-sm" />
              <span>Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-600 rounded-sm" />
              <span>High</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Day labels */}
          <div className="grid grid-cols-8 gap-1 text-xs text-muted-foreground">
            <div></div>
            {dayLabels.map((day) => (
              <div key={day} className="text-center font-medium">
                {day}
              </div>
            ))}
          </div>

          {/* Heatmap grid */}
          <div className="space-y-1">
            {heatmapData.map((week, weekIndex) => (
              <div key={week.weekStart} className="grid grid-cols-8 gap-1 items-center">
                <div className="text-xs text-muted-foreground pr-2">
                  W{12 - weekIndex}
                </div>
                {week.days.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`w-8 h-8 rounded-sm cursor-pointer transition-all duration-200 ${getIntensityClass(day.intensity)} flex items-center justify-center group relative`}
                    title={`${day.date}: ${day.progress}% progress, ${day.topics} topics covered`}
                  >
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none z-10">
                      {day.date}<br/>
                      {day.progress}% • {day.topics} topics
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Weekly summary */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="text-sm font-medium mb-3">Weekly Progress Summary</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {heatmapData.slice(-4).map((week, index) => {
                const weekProgress = getWeekProgress(week);
                const isImproving = index > 0 && weekProgress > getWeekProgress(heatmapData[heatmapData.length - 4 + index - 1]);
                
                return (
                  <div key={week.weekStart} className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold">{weekProgress}%</div>
                    <div className="text-xs text-muted-foreground">Week {12 - 3 + index}</div>
                    <div className="flex items-center justify-center mt-1">
                      {isImproving ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Improving
                        </Badge>
                      ) : (
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                          <TrendingDown className="h-3 w-3 mr-1" />
                          Needs Focus
                        </Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressHeatmap;
