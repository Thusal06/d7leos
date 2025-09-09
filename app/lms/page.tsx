"use client";
import { useEffect, useMemo, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { trackEvent } from '@/lib/analytics';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  thumbnail: string;
  modules: CourseModule[];
  quiz: QuizQuestion[];
}

interface CourseModule {
  id: string;
  title: string;
  type: 'pdf';
  url: string;
  description: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface UserProgress {
  courseId: string;
  completedModules: string[];
  quizScore?: number;
  completed: boolean;
  startedAt: Date;
  completedAt?: Date;
}

const dummyCourses: Course[] = [
  {
    id: 'leadership-fundamentals',
    title: 'Leadership Fundamentals',
    description: 'Master the core principles of effective leadership in Leo clubs and community service.',
    category: 'Leadership',
    duration: '2 hours',
    difficulty: 'Beginner',
    thumbnail: '/images/courses/leadership.jpg',
    modules: [
      {
        id: 'mod1',
        title: 'Introduction to Leadership',
        type: 'pdf',
        url: '/pdfs/leadership-intro.pdf',
        description: 'Understanding the basics of leadership and its importance in Leo clubs.'
      },
      {
        id: 'mod2',
        title: 'Leadership Styles',
        type: 'pdf',
        url: '/pdfs/leadership-styles.pdf',
        description: 'Exploring different leadership approaches and when to use them.'
      },
      {
        id: 'mod3',
        title: 'Team Building',
        type: 'pdf',
        url: '/pdfs/team-building.pdf',
        description: 'Strategies for building and maintaining effective teams.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'What is the most important quality of a good leader?',
        options: ['Authority', 'Communication', 'Intelligence', 'Charisma'],
        correctAnswer: 1
      },
      {
        id: 'q2',
        question: 'Which leadership style is most effective in crisis situations?',
        options: ['Democratic', 'Autocratic', 'Laissez-faire', 'Transformational'],
        correctAnswer: 1
      },
      {
        id: 'q3',
        question: 'What is the primary goal of team building?',
        options: ['Competition', 'Individual growth', 'Collaboration', 'Hierarchy'],
        correctAnswer: 2
      },
      {
        id: 'q4',
        question: 'How often should a leader communicate with their team?',
        options: ['Weekly', 'Monthly', 'Regularly', 'Only when needed'],
        correctAnswer: 2
      },
      {
        id: 'q5',
        question: 'What is emotional intelligence in leadership?',
        options: ['IQ level', 'Understanding emotions', 'Technical skills', 'Experience'],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 'project-management',
    title: 'Project Management for Leo Clubs',
    description: 'Learn how to plan, execute, and manage successful community service projects.',
    category: 'Management',
    duration: '3 hours',
    difficulty: 'Intermediate',
    thumbnail: '/images/courses/project-management.jpg',
    modules: [
      {
        id: 'mod1',
        title: 'Project Planning Basics',
        type: 'pdf',
        url: '/pdfs/project-planning.pdf',
        description: 'Fundamentals of planning successful community service projects.'
      },
      {
        id: 'mod2',
        title: 'Resource Management',
        type: 'pdf',
        url: '/pdfs/resource-management.pdf',
        description: 'Managing volunteers, budget, and materials effectively.'
      },
      {
        id: 'mod3',
        title: 'Risk Assessment',
        type: 'pdf',
        url: '/pdfs/risk-assessment.pdf',
        description: 'Identifying and mitigating potential project risks.'
      },
      {
        id: 'mod4',
        title: 'Project Evaluation',
        type: 'pdf',
        url: '/pdfs/project-evaluation.pdf',
        description: 'Measuring project success and impact assessment.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'What is the first step in project planning?',
        options: ['Budget allocation', 'Goal definition', 'Team assembly', 'Timeline creation'],
        correctAnswer: 1
      },
      {
        id: 'q2',
        question: 'Which tool is most effective for project timeline management?',
        options: ['Spreadsheet', 'Gantt chart', 'Calendar', 'Notebook'],
        correctAnswer: 1
      },
      {
        id: 'q3',
        question: 'What percentage of project budget should be reserved for contingencies?',
        options: ['5%', '10-15%', '25%', '50%'],
        correctAnswer: 1
      },
      {
        id: 'q4',
        question: 'How should project risks be prioritized?',
        options: ['By cost', 'By probability and impact', 'By timeline', 'By team preference'],
        correctAnswer: 1
      },
      {
        id: 'q5',
        question: 'What is the key metric for project success?',
        options: ['Budget adherence', 'Timeline completion', 'Goal achievement', 'Team satisfaction'],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 'community-service',
    title: 'Community Service Excellence',
    description: 'Develop skills to create meaningful impact through community service initiatives.',
    category: 'Service',
    duration: '2.5 hours',
    difficulty: 'Beginner',
    thumbnail: '/images/courses/community-service.jpg',
    modules: [
      {
        id: 'mod1',
        title: 'Understanding Community Needs',
        type: 'pdf',
        url: '/pdfs/community-needs.pdf',
        description: 'Identifying and assessing community needs effectively.'
      },
      {
        id: 'mod2',
        title: 'Service Project Design',
        type: 'pdf',
        url: '/pdfs/service-design.pdf',
        description: 'Creating impactful and sustainable service projects.'
      },
      {
        id: 'mod3',
        title: 'Volunteer Engagement',
        type: 'pdf',
        url: '/pdfs/volunteer-engagement.pdf',
        description: 'Recruiting, training, and retaining volunteers.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'What is the most important factor in community service?',
        options: ['Funding', 'Community input', 'Media coverage', 'Club recognition'],
        correctAnswer: 1
      },
      {
        id: 'q2',
        question: 'How should community needs be assessed?',
        options: ['Assumptions', 'Surveys and interviews', 'Internet research', 'Past projects'],
        correctAnswer: 1
      },
      {
        id: 'q3',
        question: 'What makes a service project sustainable?',
        options: ['Large budget', 'Community ownership', 'Media attention', 'Club involvement'],
        correctAnswer: 1
      },
      {
        id: 'q4',
        question: 'How can volunteer retention be improved?',
        options: ['Higher pay', 'Recognition and appreciation', 'Strict rules', 'Competition'],
        correctAnswer: 1
      },
      {
        id: 'q5',
        question: 'What is the best way to measure service impact?',
        options: ['Hours volunteered', 'Money raised', 'Lives improved', 'Media mentions'],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing for Leo Clubs',
    description: 'Master social media and digital marketing strategies to promote your Leo club.',
    category: 'Marketing',
    duration: '4 hours',
    difficulty: 'Advanced',
    thumbnail: '/images/courses/digital-marketing.jpg',
    modules: [
      {
        id: 'mod1',
        title: 'Social Media Strategy',
        type: 'pdf',
        url: '/pdfs/social-media-strategy.pdf',
        description: 'Developing effective social media presence for Leo clubs.'
      },
      {
        id: 'mod2',
        title: 'Content Creation',
        type: 'pdf',
        url: '/pdfs/content-creation.pdf',
        description: 'Creating engaging content that resonates with your audience.'
      },
      {
        id: 'mod3',
        title: 'Brand Management',
        type: 'pdf',
        url: '/pdfs/brand-management.pdf',
        description: 'Building and maintaining a strong club brand identity.'
      },
      {
        id: 'mod4',
        title: 'Analytics and Measurement',
        type: 'pdf',
        url: '/pdfs/analytics.pdf',
        description: 'Tracking and measuring digital marketing effectiveness.'
      },
      {
        id: 'mod5',
        title: 'Crisis Communication',
        type: 'pdf',
        url: '/pdfs/crisis-communication.pdf',
        description: 'Managing communication during challenging situations.'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'What is the most important aspect of social media strategy?',
        options: ['Posting frequency', 'Audience engagement', 'Follower count', 'Platform variety'],
        correctAnswer: 1
      },
      {
        id: 'q2',
        question: 'Which type of content performs best on social media?',
        options: ['Text only', 'Visual content', 'Links', 'Advertisements'],
        correctAnswer: 1
      },
      {
        id: 'q3',
        question: 'How often should a Leo club post on social media?',
        options: ['Daily', 'Consistently', 'Weekly', 'Monthly'],
        correctAnswer: 1
      },
      {
        id: 'q4',
        question: 'What is the key to effective brand management?',
        options: ['Expensive design', 'Consistency', 'Frequent changes', 'Complex messaging'],
        correctAnswer: 1
      },
      {
        id: 'q5',
        question: 'Which metric is most important for measuring engagement?',
        options: ['Likes', 'Shares and comments', 'Followers', 'Views'],
        correctAnswer: 1
      }
    ]
  }
];

export default function LMSPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => { setUser(u); setLoading(false); });
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/20 rounded-2xl p-6">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-maroon mx-auto"></div>
        <p className="mt-4 text-center">Loading LMS...</p>
      </div>
    </div>
  );
  
  if (!user) return <AuthCard isLogin={isLogin} setIsLogin={setIsLogin} />;

  return <Dashboard user={user} />;
}

function AuthCard({ isLogin, setIsLogin }: { isLogin: boolean; setIsLogin: (v: boolean) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [myLCI, setMyLCI] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        trackEvent('login', { method: 'password' });
      } else {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        trackEvent('signup', { method: 'password' });
        await setDoc(doc(db, 'users', cred.user.uid), {
          firstName,
          surname,
          email,
          myLCI,
          role: 'member',
          createdAt: serverTimestamp(),
          progress: {}
        });
      }
    } catch (e: any) {
      setError(e.message || 'Authentication error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/20 rounded-2xl p-6"
      >
        <div className="text-center mb-6">
          <h1 className="heading-serif text-3xl font-bold text-maroon">Leo LMS</h1>
          <p className="text-sm opacity-70 mt-2">Learning Management System</p>
        </div>
        
        <h2 className="heading-serif text-2xl font-semibold mb-4">{isLogin ? 'Welcome Back' : 'Join Leo LMS'}</h2>
        
        <form onSubmit={submit} className="space-y-4">
          {!isLogin && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <input 
                  value={firstName} 
                  onChange={(e) => setFirstName(e.target.value)} 
                  required 
                  placeholder="First Name" 
                  className="px-4 py-3 rounded-lg bg-white/20 dark:bg-white/10 border border-white/30 dark:border-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-maroon/50 transition-all" 
                />
                <input 
                  value={surname} 
                  onChange={(e) => setSurname(e.target.value)} 
                  required 
                  placeholder="Surname" 
                  className="px-4 py-3 rounded-lg bg-white/20 dark:bg-white/10 border border-white/30 dark:border-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-maroon/50 transition-all" 
                />
              </div>
              <input 
                value={myLCI} 
                onChange={(e) => setMyLCI(e.target.value)} 
                required 
                placeholder="MyLCI Number" 
                className="w-full px-4 py-3 rounded-lg bg-white/20 dark:bg-white/10 border border-white/30 dark:border-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-maroon/50 transition-all" 
              />
            </>
          )}
          <input 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            type="email" 
            placeholder="Email Address" 
            className="w-full px-4 py-3 rounded-lg bg-white/20 dark:bg-white/10 border border-white/30 dark:border-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-maroon/50 transition-all" 
          />
          <input 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            type="password" 
            placeholder="Password" 
            className="w-full px-4 py-3 rounded-lg bg-white/20 dark:bg-white/10 border border-white/30 dark:border-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-maroon/50 transition-all" 
          />
          
          {error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3"
            >
              {error}
            </motion.div>
          )}
          
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-lg bg-maroon text-white hover:bg-maroon/80 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>}
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>
        
        <button 
          onClick={() => setIsLogin(!isLogin)} 
          className="mt-4 w-full text-sm opacity-80 hover:opacity-100 transition-opacity"
        >
          {isLogin ? 'Need an account? Sign up here' : 'Already have an account? Sign in'}
        </button>
      </motion.div>
    </div>
  );
}

function Dashboard({ user }: { user: any }) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [userProgress, setUserProgress] = useState<{ [courseId: string]: UserProgress }>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Leadership', 'Management', 'Service', 'Marketing'];

  const filteredCourses = useMemo(() => {
    return dummyCourses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  useEffect(() => {
    loadUserProgress();
  }, [user]);

  const loadUserProgress = async () => {
    if (!user) return;
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserProgress(userData.progress || {});
      }
    } catch (error) {
      console.error('Error loading user progress:', error);
    }
  };

  const updateUserProgress = async (courseId: string, progress: UserProgress) => {
    if (!user) return;
    try {
      const newProgress = { ...userProgress, [courseId]: progress };
      setUserProgress(newProgress);
      await updateDoc(doc(db, 'users', user.uid), {
        progress: newProgress
      });
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const getOverallProgress = () => {
    const totalCourses = dummyCourses.length;
    const completedCourses = Object.values(userProgress).filter(p => p.completed).length;
    return totalCourses > 0 ? Math.round((completedCourses / totalCourses) * 100) : 0;
  };

  const getCompletedCoursesCount = () => {
    return Object.values(userProgress).filter(p => p.completed).length;
  };

  if (selectedCourse) {
    return (
      <CourseViewer 
        course={selectedCourse} 
        onBack={() => setSelectedCourse(null)}
        userProgress={userProgress[selectedCourse.id]}
        onProgressUpdate={(progress) => updateUserProgress(selectedCourse.id, progress)}
      />
    );
  }

  return (
    <div className="min-h-screen p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="heading-serif text-3xl font-bold">Leo LMS Dashboard</h1>
          <p className="text-sm opacity-70 mt-1">Welcome back, {user.displayName || user.email}</p>
        </div>
        <button 
          onClick={() => signOut(auth)} 
          className="px-4 py-2 rounded-lg bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/20 hover:bg-white/20 dark:hover:bg-white/15 transition-all"
        >
          Sign Out
        </button>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/20 rounded-2xl p-6">
          <div className="text-sm opacity-70 mb-2">Overall Progress</div>
          <div className="text-3xl font-bold text-maroon mb-3">{getOverallProgress()}%</div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-maroon to-gold transition-all duration-500" 
              style={{ width: `${getOverallProgress()}%` }} 
            />
          </div>
        </div>
        
        <div className="bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/20 rounded-2xl p-6">
          <div className="text-sm opacity-70 mb-2">Completed Courses</div>
          <div className="text-3xl font-bold text-gold">{getCompletedCoursesCount()}</div>
          <div className="text-sm opacity-60">out of {dummyCourses.length} courses</div>
        </div>
        
        <div className="bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/20 rounded-2xl p-6">
          <div className="text-sm opacity-70 mb-2">Learning Streak</div>
          <div className="text-3xl font-bold text-green-400">7</div>
          <div className="text-sm opacity-60">days in a row</div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/20 focus:outline-none focus:ring-2 focus:ring-maroon/50 transition-all"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-maroon text-white'
                  : 'bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/20 hover:bg-white/20 dark:hover:bg-white/15'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredCourses.map((course) => (
            <CourseCard 
              key={course.id} 
              course={course} 
              progress={userProgress[course.id]}
              onSelect={() => setSelectedCourse(course)}
            />
          ))}
        </AnimatePresence>
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl opacity-20 mb-4">📚</div>
          <h3 className="text-xl font-semibold mb-2">No courses found</h3>
          <p className="opacity-70">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}

function CourseCard({ course, progress, onSelect }: { 
  course: Course; 
  progress?: UserProgress; 
  onSelect: () => void; 
}) {
  const getProgressPercentage = () => {
    if (!progress) return 0;
    return Math.round((progress.completedModules.length / course.modules.length) * 100);
  };

  const getDifficultyColor = () => {
    switch (course.difficulty) {
      case 'Beginner': return 'text-green-400';
      case 'Intermediate': return 'text-yellow-400';
      case 'Advanced': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/20 rounded-2xl overflow-hidden hover:bg-white/15 dark:hover:bg-white/15 transition-all duration-300 group cursor-pointer"
      onClick={onSelect}
    >
      <div className="relative h-48 bg-gradient-to-br from-maroon/20 to-gold/20 flex items-center justify-center">
        <div className="text-6xl opacity-30">📚</div>
        {progress?.completed && (
          <div className="absolute top-3 right-3 bg-green-500 text-white rounded-full p-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs px-2 py-1 rounded-full bg-maroon/20 text-maroon">
            {course.category}
          </span>
          <span className={`text-xs ${getDifficultyColor()}`}>
            {course.difficulty}
          </span>
        </div>
        
        <h3 className="font-bold text-lg mb-2 group-hover:text-maroon transition-colors">
          {course.title}
        </h3>
        
        <p className="text-sm opacity-70 mb-4 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
          {course.description}
        </p>
        
        <div className="flex items-center justify-between text-xs opacity-60 mb-4">
          <span>{course.duration}</span>
          <span>{course.modules.length} modules</span>
        </div>
        
        {progress && (
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1">
              <span>Progress</span>
              <span>{getProgressPercentage()}%</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-maroon to-gold transition-all duration-500" 
                style={{ width: `${getProgressPercentage()}%` }} 
              />
            </div>
          </div>
        )}
        
        <button className="w-full px-4 py-2 rounded-lg bg-maroon text-white hover:bg-maroon/80 transition-all font-semibold">
          {progress ? (progress.completed ? 'Review Course' : 'Continue Learning') : 'Start Course'}
        </button>
      </div>
    </motion.div>
  );
}

function CourseViewer({ course, onBack, userProgress, onProgressUpdate }: {
  course: Course;
  onBack: () => void;
  userProgress?: UserProgress;
  onProgressUpdate: (progress: UserProgress) => void;
}) {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<{ [questionId: string]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const currentModule = course.modules[currentModuleIndex];
  const isLastModule = currentModuleIndex === course.modules.length - 1;
  const isModuleCompleted = userProgress?.completedModules.includes(currentModule.id) || false;

  useEffect(() => {
    if (!userProgress) {
      // Initialize progress when starting course
      const initialProgress: UserProgress = {
        courseId: course.id,
        completedModules: [],
        completed: false,
        startedAt: new Date()
      };
      onProgressUpdate(initialProgress);
    }
  }, [course.id, userProgress, onProgressUpdate]);

  const markModuleComplete = () => {
    if (!userProgress || isModuleCompleted) return;

    const updatedProgress: UserProgress = {
      ...userProgress,
      completedModules: [...userProgress.completedModules, currentModule.id]
    };

    onProgressUpdate(updatedProgress);

    if (isLastModule) {
      setShowSummary(true);
    }
  };

  const nextModule = () => {
    if (currentModuleIndex < course.modules.length - 1) {
      setCurrentModuleIndex(currentModuleIndex + 1);
    }
  };

  const prevModule = () => {
    if (currentModuleIndex > 0) {
      setCurrentModuleIndex(currentModuleIndex - 1);
    }
  };

  const startQuiz = () => {
    setShowSummary(false);
    setShowQuiz(true);
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  const submitQuiz = () => {
    const correctAnswers = course.quiz.filter(q => quizAnswers[q.id] === q.correctAnswer).length;
    const passed = correctAnswers >= 3;

    const updatedProgress: UserProgress = {
      ...userProgress!,
      quizScore: correctAnswers,
      completed: passed,
      completedAt: passed ? new Date() : undefined
    };

    onProgressUpdate(updatedProgress);
    setQuizSubmitted(true);
  };

  const getProgressPercentage = () => {
    if (!userProgress) return 0;
    const moduleProgress = (userProgress.completedModules.length / course.modules.length) * 80;
    const quizProgress = userProgress.completed ? 20 : 0;
    return Math.round(moduleProgress + quizProgress);
  };

  if (showQuiz) {
    return (
      <QuizComponent
        course={course}
        answers={quizAnswers}
        onAnswerChange={setQuizAnswers}
        onSubmit={submitQuiz}
        submitted={quizSubmitted}
        onBack={() => setShowQuiz(false)}
        userProgress={userProgress}
      />
    );
  }

  if (showSummary) {
    return (
      <CourseSummary
        course={course}
        userProgress={userProgress!}
        onStartQuiz={startQuiz}
        onBack={onBack}
      />
    );
  }

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/20 hover:bg-white/20 dark:hover:bg-white/15 transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline">Back to Courses</span>
          <span className="sm:hidden">Back</span>
        </button>
        
        <div className="text-left sm:text-right">
          <h1 className="heading-serif text-xl sm:text-2xl font-bold">{course.title}</h1>
          <p className="text-sm opacity-70">Module {currentModuleIndex + 1} of {course.modules.length}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/20 rounded-2xl p-6 mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span>Course Progress</span>
          <span>{getProgressPercentage()}%</span>
        </div>
        <div className="h-3 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-maroon to-gold transition-all duration-500" 
            style={{ width: `${getProgressPercentage()}%` }} 
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Module Navigation */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <div className="bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/20 rounded-2xl p-4 sm:p-6">
            <h3 className="font-semibold mb-4">Course Modules</h3>
            <div className="space-y-2">
              {course.modules.map((module, index) => (
                <button
                  key={module.id}
                  onClick={() => setCurrentModuleIndex(index)}
                  className={`w-full text-left p-2 sm:p-3 rounded-lg transition-all ${
                    index === currentModuleIndex
                      ? 'bg-maroon text-white'
                      : userProgress?.completedModules.includes(module.id)
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {userProgress?.completedModules.includes(module.id) && (
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                    <span className="text-xs sm:text-sm font-medium truncate">{module.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Module Content */}
        <div className="lg:col-span-3 order-1 lg:order-2">
          <div className="bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/20 rounded-2xl p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl font-bold mb-2">{currentModule.title}</h2>
                <p className="opacity-70 text-sm sm:text-base">{currentModule.description}</p>
              </div>
              {isModuleCompleted && (
                <div className="bg-green-500 text-white rounded-full p-2 flex-shrink-0 self-start sm:self-center">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>

            {/* PDF Viewer */}
            <div className="bg-white/5 rounded-lg p-4 sm:p-8 text-center mb-6">
              <div className="text-4xl sm:text-6xl mb-4">📄</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">PDF Content</h3>
              <p className="opacity-70 mb-4 text-sm sm:text-base">
                In a real implementation, this would display the PDF content using a PDF viewer library.
              </p>
              <a
                href={currentModule.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-maroon text-white rounded-lg hover:bg-maroon/80 transition-all text-sm sm:text-base"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Open PDF
              </a>
            </div>

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <button
                onClick={prevModule}
                disabled={currentModuleIndex === 0}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>

              <div className="flex flex-col sm:flex-row gap-3">
                {!isModuleCompleted && (
                  <button
                    onClick={markModuleComplete}
                    className="px-4 sm:px-6 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-all text-sm sm:text-base"
                  >
                    Mark Complete
                  </button>
                )}

                {!isLastModule ? (
                  <button
                    onClick={nextModule}
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-maroon text-white hover:bg-maroon/80 transition-all text-sm sm:text-base"
                  >
                    Next
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ) : (
                  userProgress?.completedModules.length === course.modules.length && (
                    <button
                      onClick={() => setShowSummary(true)}
                      className="px-4 sm:px-6 py-2 rounded-lg bg-gold text-black hover:bg-gold/80 transition-all font-semibold text-sm sm:text-base"
                    >
                      Course Summary
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CourseSummary({ course, userProgress, onStartQuiz, onBack }: {
  course: Course;
  userProgress: UserProgress;
  onStartQuiz: () => void;
  onBack: () => void;
}) {
  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <div className="text-4xl sm:text-6xl mb-4">🎉</div>
          <h1 className="heading-serif text-2xl sm:text-3xl font-bold mb-2">Congratulations!</h1>
          <p className="text-base sm:text-lg opacity-70">You've completed all modules in {course.title}</p>
        </div>

        <div className="bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/20 rounded-2xl p-4 sm:p-8 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Course Summary</h2>
          
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div>
              <h3 className="font-semibold mb-3">What You've Learned</h3>
              <ul className="space-y-2">
                {course.modules.map((module, index) => (
                  <li key={module.id} className="flex items-center gap-2">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs sm:text-sm">{module.title}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Course Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-xs sm:text-sm opacity-70">Modules Completed</span>
                  <span className="font-semibold text-sm">{userProgress.completedModules.length}/{course.modules.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs sm:text-sm opacity-70">Time Invested</span>
                  <span className="font-semibold text-sm">{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs sm:text-sm opacity-70">Difficulty Level</span>
                  <span className="font-semibold text-sm">{course.difficulty}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">Ready for the Final Quiz?</h3>
            <p className="opacity-70 mb-6 text-sm sm:text-base">
              Test your knowledge with 5 questions. You need to answer at least 3 correctly to complete the course.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onBack}
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all text-sm sm:text-base"
              >
                Back to Dashboard
              </button>
              <button
                onClick={onStartQuiz}
                className="w-full sm:w-auto px-8 py-3 rounded-lg bg-maroon text-white hover:bg-maroon/80 transition-all font-semibold text-sm sm:text-base"
              >
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuizComponent({ course, answers, onAnswerChange, onSubmit, submitted, onBack, userProgress }: {
  course: Course;
  answers: { [questionId: string]: number };
  onAnswerChange: (answers: { [questionId: string]: number }) => void;
  onSubmit: () => void;
  submitted: boolean;
  onBack: () => void;
  userProgress?: UserProgress;
}) {
  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    if (submitted) return;
    onAnswerChange({ ...answers, [questionId]: answerIndex });
  };

  const getScore = () => {
    return course.quiz.filter(q => answers[q.id] === q.correctAnswer).length;
  };

  const canSubmit = () => {
    return course.quiz.every(q => answers[q.id] !== undefined);
  };

  const isPassed = () => {
    return getScore() >= 3;
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/20 hover:bg-white/20 dark:hover:bg-white/15 transition-all text-sm sm:text-base"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          
          <div className="text-center flex-1 sm:flex-none">
            <h1 className="heading-serif text-xl sm:text-2xl font-bold">{course.title} Quiz</h1>
            <p className="text-xs sm:text-sm opacity-70">Answer at least 3 out of 5 questions correctly</p>
          </div>
          
          <div className="hidden sm:block w-20"></div>
        </div>

        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 sm:p-6 rounded-2xl text-center ${
              isPassed() 
                ? 'bg-green-500/20 border border-green-500/30' 
                : 'bg-red-500/20 border border-red-500/30'
            }`}
          >
            <div className="text-3xl sm:text-4xl mb-2">{isPassed() ? '🎉' : '😔'}</div>
            <h2 className="text-lg sm:text-xl font-bold mb-2">
              {isPassed() ? 'Congratulations!' : 'Not Quite There'}
            </h2>
            <p className="mb-4 text-sm sm:text-base">
              You scored {getScore()} out of {course.quiz.length} questions correctly.
            </p>
            {isPassed() ? (
              <p className="text-green-400 text-sm sm:text-base">You have successfully completed the course!</p>
            ) : (
              <p className="text-red-400 text-sm sm:text-base">You need at least 3 correct answers to pass. Please review the materials and try again.</p>
            )}
          </motion.div>
        )}

        <div className="space-y-6">
          {course.quiz.map((question, index) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/20 rounded-2xl p-4 sm:p-6"
            >
              <h3 className="text-base sm:text-lg font-semibold mb-4">
                {index + 1}. {question.question}
              </h3>
              
              <div className="space-y-3">
                {question.options.map((option, optionIndex) => (
                  <button
                    key={optionIndex}
                    onClick={() => handleAnswerSelect(question.id, optionIndex)}
                    disabled={submitted}
                    className={`w-full text-left p-3 sm:p-4 rounded-lg transition-all ${
                      answers[question.id] === optionIndex
                        ? submitted
                          ? optionIndex === question.correctAnswer
                            ? 'bg-green-500/30 border border-green-500/50'
                            : 'bg-red-500/30 border border-red-500/50'
                          : 'bg-maroon/30 border border-maroon/50'
                        : submitted && optionIndex === question.correctAnswer
                        ? 'bg-green-500/20 border border-green-500/30'
                        : 'bg-white/5 hover:bg-white/10 border border-white/20'
                    } ${submitted ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        answers[question.id] === optionIndex
                          ? 'border-current'
                          : 'border-white/40'
                      }`}>
                        {answers[question.id] === optionIndex && (
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-current"></div>
                        )}
                      </div>
                      <span className="text-sm sm:text-base flex-1">{option}</span>
                      {submitted && optionIndex === question.correctAnswer && (
                        <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {!submitted && (
          <div className="text-center mt-8">
            <button
              onClick={onSubmit}
              disabled={!canSubmit()}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-lg bg-maroon text-white hover:bg-maroon/80 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              Submit Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}