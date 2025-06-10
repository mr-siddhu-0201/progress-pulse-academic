
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Clock, 
  Target, 
  AlertTriangle,
  Download,
  Filter,
  Calendar,
  Award
} from 'lucide-react';

const AnalyticsDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('semester');
  const [selectedSubject, setSelectedSubject] = useState('all');

  // Sample data for charts
  const weeklyProgressData = [
    { week: 'Week 1', CS301: 15, CS302: 10, CS303: 20, CS304: 12 },
    { week: 'Week 2', CS301: 28, CS302: 22, CS303: 35, CS304: 25 },
    { week: 'Week 3', CS301: 42, CS302: 35, CS303: 48, CS304: 38 },
    { week: 'Week 4', CS301: 58, CS302: 45, CS303: 62, CS304: 52 },
    { week: 'Week 5', CS301: 72, CS302: 58, CS303: 75, CS304: 65 },
    { week: 'Week 6', CS301: 78, CS302: 65, CS303: 82, CS304: 70 },
  ];

  const subjectCompletionData = [
    { name: 'CS301 - DSA', value: 78, color: '#3B82F6' },
    { name: 'CS302 - DBMS', value: 65, color: '#10B981' },
    { name: 'CS303 - OS', value: 82, color: '#8B5CF6' },
    { name: 'CS304 - Networks', value: 70, color: '#F59E0B' },
  ];

  const teachingVelocityData = [
    { month: 'Jan', planned: 25, actual: 28, efficiency: 112 },
    { month: 'Feb', planned: 30, actual: 27, efficiency: 90 },
    { month: 'Mar', planned: 28, actual: 32, efficiency: 114 },
    { month: 'Apr', planned: 35, actual: 33, efficiency: 94 },
    { month: 'May', planned: 32, actual: 35, efficiency: 109 },
    { month: 'Jun', planned: 25, actual: 22, efficiency: 88 },
  ];

  const examReadinessData = [
    { subject: 'CS301', current: 78, projected: 95, examDate: '2024-07-15', status: 'on-track' },
    { subject: 'CS302', current: 65, projected: 88, examDate: '2024-07-17', status: 'at-risk' },
    { subject: 'CS303', current: 82, projected: 98, examDate: '2024-07-19', status: 'ahead' },
    { subject: 'CS304', current: 70, projected: 92, examDate: '2024-07-21', status: 'on-track' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ahead': return 'text-green-600';
      case 'on-track': return 'text-blue-600';
      case 'at-risk': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ahead': return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Ahead</Badge>;
      case 'on-track': return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">On Track</Badge>;
      case 'at-risk': return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">At Risk</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-blue-600" />
                Live Coverage Analytics
              </CardTitle>
              <CardDescription>
                Comprehensive progress tracking and predictive insights
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="semester">Semester</SelectItem>
                  <SelectItem value="year">Academic Year</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="CS301">CS301 - DSA</SelectItem>
                  <SelectItem value="CS302">CS302 - DBMS</SelectItem>
                  <SelectItem value="CS303">CS303 - OS</SelectItem>
                  <SelectItem value="CS304">CS304 - Networks</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">73.75%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5.2%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Teaching Velocity</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.8 topics/week</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-blue-600">On target</span> for completion
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Exam Readiness</CardTitle>
            <Target className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">93%</div>
            <p className="text-xs text-muted-foreground">
              Projected completion rate
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Subjects</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              CS302 needs attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Progress Trend */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Weekly Progress Trend</CardTitle>
            <CardDescription>Subject-wise completion percentage over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyProgressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="CS301" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="CS302" stroke="#10B981" strokeWidth={2} />
                <Line type="monotone" dataKey="CS303" stroke="#8B5CF6" strokeWidth={2} />
                <Line type="monotone" dataKey="CS304" stroke="#F59E0B" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Subject Completion Distribution */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Subject Completion Distribution</CardTitle>
            <CardDescription>Current completion status across subjects</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={subjectCompletionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {subjectCompletionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {subjectCompletionData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Teaching Velocity */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Teaching Velocity & Efficiency</CardTitle>
            <CardDescription>Planned vs actual teaching progress</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={teachingVelocityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="planned" fill="#E5E7EB" name="Planned" />
                <Bar dataKey="actual" fill="#3B82F6" name="Actual" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Exam Readiness Tracker */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Exam Readiness Tracker</CardTitle>
            <CardDescription>Projected completion by exam dates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {examReadinessData.map((subject) => (
                <div key={subject.subject} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{subject.subject}</span>
                      {getStatusBadge(subject.status)}
                    </div>
                    <span className="text-sm text-muted-foreground">{subject.examDate}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Current: {subject.current}%</span>
                      <span>Projected: {subject.projected}%</span>
                    </div>
                    <Progress value={subject.current} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* NAAC/NBA Compliance */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-purple-600" />
            NAAC/NBA Compliance Report
          </CardTitle>
          <CardDescription>
            Automated accreditation readiness assessment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">92%</div>
              <div className="text-sm text-muted-foreground">Syllabus Coverage</div>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100 mt-2">Compliant</Badge>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">89%</div>
              <div className="text-sm text-muted-foreground">Learning Outcomes</div>
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 mt-2">On Track</Badge>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">76%</div>
              <div className="text-sm text-muted-foreground">Assessment Coverage</div>
              <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 mt-2">Needs Review</Badge>
            </div>
          </div>
          
          <div className="mt-6 flex gap-3">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Download className="h-4 w-4 mr-2" />
              Generate NAAC Report
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              NBA Documentation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
