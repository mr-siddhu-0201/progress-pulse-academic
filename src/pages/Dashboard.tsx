import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  Clock, 
  CheckCircle2,
  LogOut,
  BarChart3,
  Calendar,
  Target
} from 'lucide-react';
import ProgressHeatmap from '@/components/ProgressHeatmap';
import SyllabusMapping from '@/components/SyllabusMapping';
import QuickLogger from '@/components/QuickLogger';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('syllabusSync_user');
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('syllabusSync_user');
    navigate('/login');
  };

  if (!user) return null;

  const subjects = [
    {
      id: 1,
      name: 'Data Structures & Algorithms',
      code: 'CS301',
      progress: 78,
      status: 'on-track',
      totalUnits: 6,
      completedUnits: 4.5,
      nextDeadline: '2024-06-15'
    },
    {
      id: 2,
      name: 'Database Management Systems',
      code: 'CS302',
      progress: 45,
      status: 'behind',
      totalUnits: 5,
      completedUnits: 2.2,
      nextDeadline: '2024-06-12'
    },
    {
      id: 3,
      name: 'Operating Systems',
      code: 'CS303',
      progress: 85,
      status: 'ahead',
      totalUnits: 7,
      completedUnits: 6,
      nextDeadline: '2024-06-18'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ahead': return 'bg-green-500';
      case 'on-track': return 'bg-blue-500';
      case 'behind': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ahead': return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Ahead</Badge>;
      case 'on-track': return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">On Track</Badge>;
      case 'behind': return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Behind</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SyllabusSync
                </h1>
                <p className="text-xs text-muted-foreground">Academic Progress Tracker</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{user.role} • {user.department}</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'syllabus', label: 'Syllabus Mapping', icon: BookOpen },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp },
            { id: 'quick-log', label: 'Quick Logger', icon: Clock },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'outline'}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2"
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Subjects</CardTitle>
                  <BookOpen className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">Across 4 semesters</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">69%</div>
                  <p className="text-xs text-muted-foreground">+5% from last week</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Behind Schedule</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">Need attention</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Exam Readiness</CardTitle>
                  <Target className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">87%</div>
                  <p className="text-xs text-muted-foreground">NAAC compliant</p>
                </CardContent>
              </Card>
            </div>

            {/* Subject Progress */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Subject Progress Overview</CardTitle>
                <CardDescription>Track completion status across all subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {subjects.map((subject) => (
                    <div key={subject.id} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(subject.status)}`} />
                          <div>
                            <h4 className="font-medium">{subject.name}</h4>
                            <p className="text-sm text-muted-foreground">{subject.code}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {getStatusBadge(subject.status)}
                          <span className="text-sm font-medium">{subject.progress}%</span>
                        </div>
                      </div>
                      <Progress value={subject.progress} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Units: {subject.completedUnits}/{subject.totalUnits}</span>
                        <span>Next: {subject.nextDeadline}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Progress Heatmap */}
            <ProgressHeatmap />
          </div>
        )}

        {/* Other Tabs */}
        {activeTab === 'syllabus' && <SyllabusMapping />}
        {activeTab === 'analytics' && <AnalyticsDashboard />}
        {activeTab === 'quick-log' && <QuickLogger />}
      </div>
    </div>
  );
};

export default Dashboard;
