
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  ChevronDown, 
  ChevronRight, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  Plus,
  Link
} from 'lucide-react';

const SyllabusMapping = () => {
  const [openUnits, setOpenUnits] = useState<number[]>([1]);

  const syllabusData = {
    subject: "Data Structures & Algorithms",
    code: "CS301",
    totalUnits: 6,
    units: [
      {
        id: 1,
        title: "Introduction to Data Structures",
        progress: 100,
        status: "completed",
        estimatedHours: 12,
        actualHours: 14,
        subtopics: [
          { id: 1, title: "Basic Concepts", status: "completed", prerequisite: null, lectureCount: 2 },
          { id: 2, title: "Abstract Data Types", status: "completed", prerequisite: 1, lectureCount: 3 },
          { id: 3, title: "Algorithm Analysis", status: "completed", prerequisite: 2, lectureCount: 4 },
        ]
      },
      {
        id: 2,
        title: "Linear Data Structures",
        progress: 85,
        status: "in-progress",
        estimatedHours: 18,
        actualHours: 16,
        subtopics: [
          { id: 4, title: "Arrays and Strings", status: "completed", prerequisite: 3, lectureCount: 4 },
          { id: 5, title: "Linked Lists", status: "completed", prerequisite: 4, lectureCount: 5 },
          { id: 6, title: "Stacks and Queues", status: "in-progress", prerequisite: 5, lectureCount: 3 },
          { id: 7, title: "Applications", status: "pending", prerequisite: 6, lectureCount: 0 },
        ]
      },
      {
        id: 3,
        title: "Non-Linear Data Structures",
        progress: 45,
        status: "in-progress",
        estimatedHours: 20,
        actualHours: 8,
        subtopics: [
          { id: 8, title: "Trees - Introduction", status: "completed", prerequisite: 6, lectureCount: 3 },
          { id: 9, title: "Binary Trees", status: "in-progress", prerequisite: 8, lectureCount: 2 },
          { id: 10, title: "Tree Traversals", status: "pending", prerequisite: 9, lectureCount: 0 },
          { id: 11, title: "Binary Search Trees", status: "pending", prerequisite: 10, lectureCount: 0 },
        ]
      },
      {
        id: 4,
        title: "Advanced Trees",
        progress: 0,
        status: "pending",
        estimatedHours: 16,
        actualHours: 0,
        subtopics: [
          { id: 12, title: "AVL Trees", status: "blocked", prerequisite: 11, lectureCount: 0 },
          { id: 13, title: "B-Trees", status: "blocked", prerequisite: 12, lectureCount: 0 },
          { id: 14, title: "Red-Black Trees", status: "blocked", prerequisite: 13, lectureCount: 0 },
        ]
      }
    ]
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'in-progress': return <Clock className="h-4 w-4 text-blue-600" />;
      case 'pending': return <div className="h-4 w-4 rounded-full border-2 border-gray-300" />;
      case 'blocked': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
      case 'in-progress': return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">In Progress</Badge>;
      case 'pending': return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Pending</Badge>;
      case 'blocked': return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Blocked</Badge>;
      default: return null;
    }
  };

  const toggleUnit = (unitId: number) => {
    setOpenUnits(prev => 
      prev.includes(unitId) 
        ? prev.filter(id => id !== unitId)
        : [...prev, unitId]
    );
  };

  const getPrerequisiteAlert = (subtopic: any, allSubtopics: any[]) => {
    if (!subtopic.prerequisite) return null;
    
    const prerequisite = allSubtopics.find(s => s.id === subtopic.prerequisite);
    if (prerequisite && prerequisite.status !== 'completed' && subtopic.status !== 'blocked') {
      return (
        <div className="flex items-center gap-2 text-xs text-red-600 mt-1">
          <AlertTriangle className="h-3 w-3" />
          Prerequisite "{prerequisite.title}" not completed
        </div>
      );
    }
    return null;
  };

  const allSubtopics = syllabusData.units.flatMap(unit => unit.subtopics);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Smart Syllabus Mapping
              </CardTitle>
              <CardDescription>
                {syllabusData.subject} ({syllabusData.code}) - Unit-Topic Breakdown
              </CardDescription>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Topic
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{syllabusData.totalUnits}</div>
              <div className="text-sm text-muted-foreground">Total Units</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {Math.round(syllabusData.units.reduce((sum, unit) => sum + unit.progress, 0) / syllabusData.units.length)}%
              </div>
              <div className="text-sm text-muted-foreground">Overall Progress</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {syllabusData.units.reduce((sum, unit) => sum + unit.actualHours, 0)}h
              </div>
              <div className="text-sm text-muted-foreground">Hours Logged</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Units */}
      {syllabusData.units.map((unit) => (
        <Card key={unit.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <Collapsible open={openUnits.includes(unit.id)} onOpenChange={() => toggleUnit(unit.id)}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {openUnits.includes(unit.id) ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                    <div>
                      <CardTitle className="text-lg">Unit {unit.id}: {unit.title}</CardTitle>
                      <CardDescription>
                        {unit.actualHours}h / {unit.estimatedHours}h • {unit.subtopics.length} topics
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(unit.status)}
                    <div className="text-right">
                      <div className="text-lg font-bold">{unit.progress}%</div>
                      <Progress value={unit.progress} className="w-20 h-2" />
                    </div>
                  </div>
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {unit.subtopics.map((subtopic) => (
                    <div key={subtopic.id} className="border rounded-lg p-4 hover:bg-gray-50/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(subtopic.status)}
                          <div>
                            <h4 className="font-medium">{subtopic.title}</h4>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <span>{subtopic.lectureCount} lectures logged</span>
                              {subtopic.prerequisite && (
                                <div className="flex items-center gap-1">
                                  <Link className="h-3 w-3" />
                                  <span>Depends on Topic {subtopic.prerequisite}</span>
                                </div>
                              )}
                            </div>
                            {getPrerequisiteAlert(subtopic, allSubtopics)}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(subtopic.status)}
                          <Button variant="outline" size="sm">
                            Log Lecture
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      ))}
    </div>
  );
};

export default SyllabusMapping;
