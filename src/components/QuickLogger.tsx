
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { 
  Clock, 
  Calendar, 
  BookOpen, 
  Users, 
  CheckCircle2, 
  Timer,
  MapPin,
  Plus
} from 'lucide-react';

const QuickLogger = () => {
  const [isLogging, setIsLogging] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    unit: '',
    topic: '',
    duration: '',
    studentsPresent: '',
    room: '',
    notes: '',
    completionLevel: ''
  });

  const subjects = [
    { code: 'CS301', name: 'Data Structures & Algorithms' },
    { code: 'CS302', name: 'Database Management Systems' },
    { code: 'CS303', name: 'Operating Systems' },
    { code: 'CS304', name: 'Computer Networks' }
  ];

  const recentLogs = [
    {
      id: 1,
      subject: 'CS301',
      topic: 'Binary Trees - Traversal Methods',
      duration: 50,
      timestamp: '2024-06-10 10:00',
      studentsPresent: 42,
      completionLevel: 'Fully Covered'
    },
    {
      id: 2,
      subject: 'CS302',
      topic: 'SQL Joins and Subqueries',
      duration: 45,
      timestamp: '2024-06-10 11:00',
      studentsPresent: 38,
      completionLevel: 'Partially Covered'
    },
    {
      id: 3,
      subject: 'CS303',
      topic: 'Process Scheduling Algorithms',
      duration: 60,
      timestamp: '2024-06-09 14:00',
      studentsPresent: 45,
      completionLevel: 'Fully Covered'
    }
  ];

  const handleQuickLog = () => {
    setIsLogging(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Lecture Logged Successfully!",
        description: `${formData.topic} has been recorded in under 30 seconds.`,
      });
      setIsLogging(false);
      
      // Reset form
      setFormData({
        subject: '',
        unit: '',
        topic: '',
        duration: '',
        studentsPresent: '',
        room: '',
        notes: '',
        completionLevel: ''
      });
    }, 1000);
  };

  const getCompletionBadge = (level: string) => {
    switch (level) {
      case 'Fully Covered':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Fully Covered</Badge>;
      case 'Partially Covered':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Partially Covered</Badge>;
      case 'Introduction Only':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Introduction Only</Badge>;
      default:
        return <Badge variant="secondary">{level}</Badge>;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Quick Logger Form */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Timer className="h-5 w-5 text-blue-600" />
            Quick Lecture Logger
          </CardTitle>
          <CardDescription>
            Log your completed lecture in under 30 seconds
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select value={formData.subject} onValueChange={(value) => setFormData({...formData, subject: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.code} value={subject.code}>
                        {subject.code} - {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <Select value={formData.unit} onValueChange={(value) => setFormData({...formData, unit: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unit1">Unit 1: Introduction</SelectItem>
                    <SelectItem value="unit2">Unit 2: Linear Structures</SelectItem>
                    <SelectItem value="unit3">Unit 3: Non-Linear Structures</SelectItem>
                    <SelectItem value="unit4">Unit 4: Advanced Trees</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="topic">Topic Covered</Label>
              <Input
                id="topic"
                placeholder="e.g., Binary Tree Traversal Methods"
                value={formData.topic}
                onChange={(e) => setFormData({...formData, topic: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="50"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="students">Students Present</Label>
                <Input
                  id="students"
                  type="number"
                  placeholder="45"
                  value={formData.studentsPresent}
                  onChange={(e) => setFormData({...formData, studentsPresent: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="room">Room/Location</Label>
                <Input
                  id="room"
                  placeholder="Room 101"
                  value={formData.room}
                  onChange={(e) => setFormData({...formData, room: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="completion">Completion Level</Label>
                <Select value={formData.completionLevel} onValueChange={(value) => setFormData({...formData, completionLevel: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fully Covered">Fully Covered</SelectItem>
                    <SelectItem value="Partially Covered">Partially Covered</SelectItem>
                    <SelectItem value="Introduction Only">Introduction Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Any important observations, student feedback, or next session planning..."
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                rows={3}
              />
            </div>

            <Button 
              onClick={handleQuickLog}
              disabled={isLogging || !formData.subject || !formData.topic}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isLogging ? (
                <>
                  <Timer className="h-4 w-4 mr-2 animate-spin" />
                  Logging...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Log Lecture (30s)
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Logs */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-green-600" />
            Recent Lecture Logs
          </CardTitle>
          <CardDescription>
            Your latest logged teaching sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentLogs.map((log) => (
              <div key={log.id} className="border rounded-lg p-4 hover:bg-gray-50/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium">{log.topic}</h4>
                    <p className="text-sm text-muted-foreground">{log.subject}</p>
                  </div>
                  {getCompletionBadge(log.completionLevel)}
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    {log.timestamp}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    {log.duration} minutes
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-3 w-3" />
                    {log.studentsPresent} students
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3" />
                    Logged via mobile
                  </div>
                </div>
              </div>
            ))}
            
            <Button variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              View All Logs
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickLogger;
