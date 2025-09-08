import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Progress } from "./ui/progress";
import { CheckCircle, Clock, User } from "lucide-react";
import { projectId, publicAnonKey } from '../utils/supabase/client';

const PLACEMENT_QUESTIONS = [
  {
    id: 1,
    question: "Choose the correct form: 'I _____ to school every day.'",
    options: ["go", "goes", "going", "gone"],
    correctAnswer: 0
  },
  {
    id: 2,
    question: "What is the past tense of 'write'?",
    options: ["writed", "wrote", "written", "writing"],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "Complete the sentence: 'She has _____ finished her homework.'",
    options: ["yet", "already", "still", "never"],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "Choose the correct preposition: 'The book is _____ the table.'",
    options: ["in", "at", "on", "by"],
    correctAnswer: 2
  },
  {
    id: 5,
    question: "Which sentence is grammatically correct?",
    options: [
      "He don't like coffee",
      "He doesn't likes coffee", 
      "He doesn't like coffee",
      "He not like coffee"
    ],
    correctAnswer: 2
  },
  {
    id: 6,
    question: "Choose the correct form: 'If I _____ rich, I would travel the world.'",
    options: ["am", "was", "were", "be"],
    correctAnswer: 2
  },
  {
    id: 7,
    question: "What does 'procrastinate' mean?",
    options: [
      "To finish quickly",
      "To delay or postpone",
      "To work hard",
      "To organize"
    ],
    correctAnswer: 1
  },
  {
    id: 8,
    question: "Complete: 'By next year, I _____ my degree.'",
    options: [
      "will finish",
      "will have finished",
      "am finishing",
      "have finished"
    ],
    correctAnswer: 1
  },
  {
    id: 9,
    question: "Choose the correct form: 'The meeting _____ cancelled due to bad weather.'",
    options: ["has", "have", "has been", "have been"],
    correctAnswer: 2
  },
  {
    id: 10,
    question: "Which sentence uses the subjunctive mood correctly?",
    options: [
      "I wish I was taller",
      "I wish I were taller",
      "I wish I am taller",
      "I wish I will be taller"
    ],
    correctAnswer: 1
  }
];

export function PlacementTest({ onClose }: { onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState('info'); // 'info', 'test', 'result'
  const [userInfo, setUserInfo] = useState({ name: '', email: '', phone: '' });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: number; selectedAnswer: number; isCorrect: boolean }[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [testResult, setTestResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleStartTest = () => {
    if (userInfo.name && userInfo.email) {
      setCurrentStep('test');
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const question = PLACEMENT_QUESTIONS[currentQuestion];
      const newAnswer = {
        questionId: question.id,
        selectedAnswer,
        isCorrect: selectedAnswer === question.correctAnswer
      };
      
      const newAnswers = [...answers, newAnswer];
      setAnswers(newAnswers);
      setSelectedAnswer(null);

      if (currentQuestion < PLACEMENT_QUESTIONS.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        submitTest(newAnswers);
      }
    }
  };

  const submitTest = async (finalAnswers: any[]) => {
    setLoading(true);
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-65e96700/placement-test`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          answers: finalAnswers,
          email: userInfo.email
        })
      });

      const data = await response.json();
      if (data.success) {
        setTestResult(data.result);
        setCurrentStep('result');
      }
    } catch (error) {
      console.error('Error submitting test:', error);
    } finally {
      setLoading(false);
    }
  };

  const progress = ((currentQuestion + 1) / PLACEMENT_QUESTIONS.length) * 100;

  if (currentStep === 'info') {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              English Placement Test
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              This test will help us determine your English level and recommend the best course for you. 
              It takes approximately 10 minutes to complete.
            </p>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone (Optional)</Label>
                <Input
                  id="phone"
                  value={userInfo.phone}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={handleStartTest}
                disabled={!userInfo.name || !userInfo.email}
                className="flex-1"
              >
                <Clock className="h-4 w-4 mr-2" />
                Start Test
              </Button>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentStep === 'test') {
    const question = PLACEMENT_QUESTIONS[currentQuestion];
    
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Question {currentQuestion + 1} of {PLACEMENT_QUESTIONS.length}</CardTitle>
              <Button variant="ghost" size="sm" onClick={onClose}>×</Button>
            </div>
            <Progress value={progress} className="w-full" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">{question.question}</h3>
              
              <RadioGroup
                value={selectedAnswer?.toString()}
                onValueChange={(value) => handleAnswerSelect(parseInt(value))}
              >
                {question.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              <Button 
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null || loading}
              >
                {loading ? 'Submitting...' : currentQuestion === PLACEMENT_QUESTIONS.length - 1 ? 'Finish Test' : 'Next'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentStep === 'result' && testResult) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Test Complete!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">{testResult.percentage}%</div>
              <div className="text-lg font-semibold">Your Level: {testResult.level}</div>
              <div className="text-muted-foreground">
                Score: {testResult.score} out of {PLACEMENT_QUESTIONS.length}
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-primary mb-2">Recommended Course:</h4>
              <p className="text-sm text-muted-foreground">
                Based on your test results, we recommend starting with our{' '}
                <span className="font-semibold">{testResult.level} English</span> course.
              </p>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1" onClick={() => {
                onClose();
                // Could navigate to enrollment page here
              }}>
                View Courses
              </Button>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}