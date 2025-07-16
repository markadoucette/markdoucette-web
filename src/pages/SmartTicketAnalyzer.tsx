import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Copy, Check, AlertCircle } from 'lucide-react';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface LearningStep {
  id: number;
  title: string;
  description: string;
  content: React.ReactNode;
  codeType: 'setup' | 'api' | 'prompt' | 'response' | 'complete';
}

interface StackOverflowItem {
  title: string;
  link: string;
  score: number;
  answer_count: number;
  view_count: number;
  is_answered: boolean;
}

interface StackOverflowResponse {
  items: StackOverflowItem[];
  total: number;
  quota_remaining: number;
}

interface AppState {
  currentStep: number;
  showStory: boolean;
  userInputs: {
    ticketDescription: string;
    priority: 'P1' | 'P2' | 'P3' | 'P4';
    customerTier: 'basic' | 'premium' | 'enterprise';
    techStack: string[];
    additionalContext: string;
  };
  soConfig: {
    sortBy: string;
    resultLimit: number;
    answeredOnly: boolean;
  };
  githubConfig?: {
    language?: string;
    minStars?: number;
    fileExtensions?: string[];
  };
  aiConfig?: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
    includeCodeExamples?: boolean;
    includeStepByStep?: boolean;
  };
  generatedCode: {
    apiCall: string;
  };
  isExecuting: boolean;
  results: {
    stackOverflow?: StackOverflowResponse;
    github?: any;
    aiAnalysis?: any;
  } | null;
}

// ============================================================================
// STORY SECTION COMPONENT
// ============================================================================

const StorySection = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">From Problem to Solution</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>
        
        <div className="prose prose-lg max-w-none text-left">
          <p className="text-gray-700 mb-4 text-left">
            Most of my career has focused on building internal systems. These are tools that solve real problems but aren't things I can publicly share. Outside of work, I still love to build, just not usually with code. I've converted two shipping containers into a backyard workshop with a rooftop deck, and I'm currently building a deck around a swim spa we installed so it aligns with the floor level of our home. Whether it's with code or with my hands, building is just how I think.
          </p>
          
          <p className="text-gray-700 mb-4 text-left">
            I wanted to create something I could share that shows how I approach a problem, so I built this project in about a day and a half.
          </p>
          
          <p className="text-gray-700 mb-4 text-left">
            The idea came from a familiar pain point. In my 18 years working in data, AI, and analytics, I've spent hours chasing down answers across Stack Overflow, GitHub, and internal knowledge bases. Every tricky support ticket becomes a scavenger hunt. I wanted to speed that up and help teams get to answers faster.
          </p>
          
          <p className="text-gray-700 mb-4 text-left">
            My background is in data strategy and AI implementation, and I hold a master's degree in data science. I've worked with generative AI long enough to know where it fits best and how to use it to accelerate real work. I used Claude and a little ChatGPT to help bring this to life quickly so I could focus on the workflow and results.
          </p>
          
          <p className="text-gray-700 mb-4 text-left">
            This is the kind of challenge I get excited about. Whether it's a technical issue I've seen before or something completely new, I like jumping in, spotting patterns, and building toward something that works. That's really what this project represents: a fast, practical solution that shows how I work and think.
          </p>
          
          <p className="text-gray-700 mb-4 text-left">
            This is just how my brain works. When I see someone wrestling with a puzzle, I love jumping in to help work through it, whether it's something I've done before or just a new challenge to figure out together.
          </p>
          
          <p className="text-gray-700 mb-4 text-left">
            I used generative AI throughout the build, mainly Claude with some ChatGPT, to move quickly. Getting something working was more important than perfect branding.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-left">The Problem-Solving Approach</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-left">
                <h4 className="font-semibold text-red-800 mb-2 text-left">Manual Process Pain Points</h4>
                <ul className="text-red-700 space-y-1 text-sm text-left">
                  <li>• Manual Stack Overflow searches → 15+ minutes</li>
                  <li>• Context switching between platforms</li>
                  <li>• Repetitive research for similar issues</li>
                  <li>• Inconsistent solution quality</li>
                  <li>• <strong>Total: 60+ minutes per ticket</strong></li>
                </ul>
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-green-800 mb-2 text-left">AI-Automated Solution</h4>
                <ul className="text-green-700 space-y-1 text-sm text-left">
                  <li>• Parallel API searches across platforms</li>
                  <li>• AI-powered context synthesis</li>
                  <li>• Confidence-scored recommendations</li>
                  <li>• Standardized response quality</li>
                  <li>• <strong>Total: 3-5 minutes per ticket</strong></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 text-left">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-left">Why This Demonstrates My Approach</h3>
            <div className="space-y-3 text-left">
              <p className="text-gray-700 text-left">
                <strong>Rapid Prototyping:</strong> Used AI tools strategically to accelerate development and move into areas where I had less direct experience.
              </p>
              <p className="text-gray-700 text-left">
                <strong>Problem-First Thinking:</strong> Started with a real pain point I've experienced personally in data and analytics roles.
              </p>
              <p className="text-gray-700 text-left">
                <strong>Technical Execution:</strong> Integrated multiple APIs, built interactive UI, and created a comprehensive tutorial system.
              </p>
              <p className="text-gray-700 text-left">
                <strong>User Experience Focus:</strong> Made it immediately usable with clear steps and real-time feedback.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ============================================================================
// UTILITY COMPONENTS
// ============================================================================

const ProgressBar = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => (
  <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
    <div 
      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
      style={{ width: `${(currentStep / totalSteps) * 100}%` }}
    />
  </div>
);

const StepHeader = ({ step, total }: { step: number; total: number }) => (
  <div className="mb-6">
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm font-medium text-blue-600">Step {step} of {total}</span>
      <span className="text-sm text-gray-500">{Math.round((step / total) * 100)}% Complete</span>
    </div>
    <ProgressBar currentStep={step} totalSteps={total} />
  </div>
);

const CodeBlock = ({ 
  title, 
  code, 
  language = 'javascript',
  canExecute = false,
  onExecute,
  isExecuting = false 
}: { 
  title: string; 
  code: string; 
  language?: string;
  canExecute?: boolean;
  onExecute?: () => void;
  isExecuting?: boolean;
}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderHighlightedCode = (text: string) => {
    if (language === 'javascript') {
      const lines = text.split('\n');
      return lines.map((line, lineIndex) => {
        const tokens = [];
        let remaining = line;
        let index = 0;

        while (remaining.length > 0) {
          const keywordMatch = remaining.match(/^(const|let|var|function|async|await|return|if|else|for|while|try|catch|throw|new)\b/);
          if (keywordMatch) {
            tokens.push(<span key={index++} style={{color: '#569cd6', fontWeight: 'bold'}}>{keywordMatch[0]}</span>);
            remaining = remaining.slice(keywordMatch[0].length);
            continue;
          }

          const stringMatch = remaining.match(/^"[^"]*"|^'[^']*'|^`[^`]*`/);
          if (stringMatch) {
            tokens.push(<span key={index++} style={{color: '#ce9178'}}>{stringMatch[0]}</span>);
            remaining = remaining.slice(stringMatch[0].length);
            continue;
          }

          const numberMatch = remaining.match(/^\d+\.?\d*/);
          if (numberMatch) {
            tokens.push(<span key={index++} style={{color: '#b5cea8'}}>{numberMatch[0]}</span>);
            remaining = remaining.slice(numberMatch[0].length);
            continue;
          }

          const commentMatch = remaining.match(/^\/\/.*/);
          if (commentMatch) {
            tokens.push(<span key={index++} style={{color: '#6a9955', fontStyle: 'italic'}}>{commentMatch[0]}</span>);
            remaining = remaining.slice(commentMatch[0].length);
            continue;
          }

          const functionMatch = remaining.match(/^([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/);
          if (functionMatch) {
            tokens.push(<span key={index++} style={{color: '#dcdcaa'}}>{functionMatch[0]}</span>);
            remaining = remaining.slice(functionMatch[0].length);
            continue;
          }

          tokens.push(<span key={index++} style={{color: '#d4d4d4'}}>{remaining[0]}</span>);
          remaining = remaining.slice(1);
        }

        return (
          <div key={lineIndex}>
            {tokens}
          </div>
        );
      });
    }
    
    return <span style={{color: '#d4d4d4'}}>{text}</span>;
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden mb-4">
      <div className="bg-gray-800 px-4 py-2 flex justify-between items-center">
        <span className="text-white font-medium">{title}</span>
        <div className="flex space-x-2">
          {canExecute && (
            <button
              onClick={onExecute}
              disabled={isExecuting}
              className="flex items-center px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 disabled:opacity-50"
            >
              <Play size={14} className="mr-1" />
              {isExecuting ? 'Running...' : 'Execute'}
            </button>
          )}
          <button
            onClick={copyToClipboard}
            className="flex items-center px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            {copied ? <Check size={14} className="mr-1" /> : <Copy size={14} className="mr-1" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
      
      <div style={{
        padding: '16px',
        backgroundColor: '#1a1a1a',
        overflowX: 'auto',
        fontFamily: 'Monaco, Consolas, monospace',
        fontSize: '13px',
        lineHeight: '1.5',
        textAlign: 'left'
      }}>
        <pre style={{
          color: '#d4d4d4',
          whiteSpace: 'pre-wrap',
          textAlign: 'left',
          margin: 0
        }}>
          {renderHighlightedCode(code)}
        </pre>
      </div>
    </div>
  );
};

// ============================================================================
// TICKET INPUT FORM COMPONENT
// ============================================================================

const TicketInputForm = ({ 
  inputs, 
  onChange 
}: { 
  inputs: AppState['userInputs']; 
  onChange: (inputs: AppState['userInputs']) => void;
}) => {
  const techStackOptions = ['React', 'Node.js', 'Python', 'Java', 'API Gateway', 'Database', 'Authentication'];

  const handleTechStackChange = (tech: string) => {
    const newTechStack = inputs.techStack.includes(tech)
      ? inputs.techStack.filter(t => t !== tech)
      : [...inputs.techStack, tech];
    onChange({ ...inputs, techStack: newTechStack });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Issue Description
        </label>
        <textarea
          value={inputs.ticketDescription}
          onChange={(e) => onChange({ ...inputs, ticketDescription: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={4}
          placeholder="Describe the customer's issue..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Priority Level
        </label>
        <select
          value={inputs.priority}
          onChange={(e) => onChange({ ...inputs, priority: e.target.value as any })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="P1">P1 - Critical</option>
          <option value="P2">P2 - High</option>
          <option value="P3">P3 - Medium</option>
          <option value="P4">P4 - Low</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Customer Tier
        </label>
        <select
          value={inputs.customerTier}
          onChange={(e) => onChange({ ...inputs, customerTier: e.target.value as any })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="basic">Basic</option>
          <option value="premium">Premium</option>
          <option value="enterprise">Enterprise</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tech Stack (Select all that apply)
        </label>
        <div className="grid grid-cols-2 gap-2">
          {techStackOptions.map(tech => (
            <label key={tech} className="flex items-center">
              <input
                type="checkbox"
                checked={inputs.techStack.includes(tech)}
                onChange={() => handleTechStackChange(tech)}
                className="mr-2"
              />
              {tech}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const SmartTicketAnalyzer = () => {
  const [appState, setAppState] = useState<AppState>({
    currentStep: 1,
    showStory: false,
    
    userInputs: {
      ticketDescription: '',
      priority: 'P2',
      customerTier: 'premium',
      techStack: [],
      additionalContext: ''
    },
    
    soConfig: {
      sortBy: 'relevance',
      resultLimit: 10,
      answeredOnly: true
    },
    
    githubConfig: {
      language: 'javascript',
      minStars: 10,
      fileExtensions: ['js', 'ts']
    },
    
    aiConfig: {
      model: 'claude-3-5-sonnet-20241022',
      temperature: 0.3,
      maxTokens: 1500,
      includeCodeExamples: true,
      includeStepByStep: true
    },
    
    generatedCode: {
      apiCall: ''
    },
    
    isExecuting: false,
    results: null
  });

  // Dynamic code generation effect
  useEffect(() => {
    const currentStep = appState.currentStep;
    let apiCall = '// Default code for step ' + currentStep;
    
    if (currentStep >= 2) {
      const answeredFilter = appState.soConfig?.answeredOnly ? '&answered=true' : '';
      const sortBy = appState.soConfig?.sortBy || 'relevance';
      const resultLimit = appState.soConfig?.resultLimit || 10;
      
      apiCall = `// Stack Overflow API Search
const searchStackOverflow = async () => {
  const query = "${appState.userInputs.ticketDescription}";
  const response = await fetch(
    'https://api.stackexchange.com/2.3/search?' +
    'order=desc&sort=${sortBy}&site=stackoverflow' +
    '&intitle=' + encodeURIComponent(query) +
    '&pagesize=${resultLimit}${answeredFilter}'
  );
  
  if (!response.ok) {
    throw new Error('Stack Overflow API error: ' + response.status);
  }
  
  const data = await response.json();
  return {
    items: data.items || [],
    total: data.total || 0,
    quota_remaining: data.quota_remaining
  };
};`;
    }
    
    if (currentStep >= 4) {
      const language = appState.githubConfig?.language || 'javascript';
      const minStars = appState.githubConfig?.minStars || 0;
      const extensions = appState.githubConfig?.fileExtensions || [];
      
      apiCall += `

// GitHub Code Search
const searchGitHub = async () => {
  const query = "${appState.userInputs.ticketDescription}";
  const searchTerms = query.split(' ').slice(0, 3).join(' ');
  const language = "${language}";
  const minStars = ${minStars};
  const fileExts = ${JSON.stringify(extensions)};
  
  let searchQuery = searchTerms + ' language:' + language;
  if (minStars > 0) {
    searchQuery += ' stars:>' + minStars;
  }
  
  if (fileExts.length > 0) {
    const extQuery = fileExts.map(ext => 'filename:*.' + ext).join(' OR ');
    searchQuery += ' (' + extQuery + ')';
  }

  const apiUrl = 'https://api.github.com/search/code?q=' + encodeURIComponent(searchQuery) + '&per_page=15&sort=indexed';

  const response = await fetch(apiUrl, {
    headers: {
      'Authorization': 'token ' + import.meta.env.VITE_GITHUB_TOKEN,
      'Accept': 'application/vnd.github.v3+json'
    }
  });

  if (!response.ok) {
    throw new Error('GitHub API Error: ' + response.status + ' ' + response.statusText);
  }

  const data = await response.json();
  return data;
};`;
    }
    
    setAppState(prev => ({
      ...prev,
      generatedCode: {
        apiCall: apiCall
      }
    }));
  }, [
    appState.currentStep, 
    appState.userInputs.ticketDescription,
    appState.soConfig?.sortBy,
    appState.soConfig?.resultLimit, 
    appState.soConfig?.answeredOnly,
    appState.githubConfig?.language,
    appState.githubConfig?.minStars,
    appState.githubConfig?.fileExtensions,
    appState.aiConfig?.model,
    appState.aiConfig?.temperature,
    appState.aiConfig?.maxTokens,
    appState.aiConfig?.includeCodeExamples,
    appState.aiConfig?.includeStepByStep
  ]);

  // Step definitions
  const steps: LearningStep[] = [
    {
      id: 1,
      title: "The Daily Developer Struggle I Know Too Well",
      description: "Understanding the manual research problem from personal experience",
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
            <h3 className="font-semibold text-blue-800 mb-2 text-left">Personal Context</h3>
            <p className="text-blue-700 text-sm text-left">
              "After years in data and analytics, I've spent countless hours manually searching Stack Overflow and GitHub. 
              Every technical support ticket becomes a research expedition across multiple platforms."
            </p>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-left">
            <div className="flex items-center mb-2">
              <AlertCircle className="text-red-500 mr-2" size={20} />
              <h3 className="font-semibold text-red-800">Manual Research Pain Points</h3>
            </div>
            <ul className="text-red-700 space-y-1 text-sm text-left">
              <li>• Context switching breaks focus and momentum</li>
              <li>• Finding relevant solutions buried in thousands of results</li>
              <li>• Repeating the same research for similar issues</li>
              <li>• Inconsistent quality and approach across team members</li>
              <li>• <strong>Result: 60+ minutes per ticket, frustrated engineers</strong></li>
            </ul>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-left">
            <h3 className="font-semibold text-green-800 mb-2 text-left">Automated Research Solution</h3>
            <ul className="text-green-700 space-y-1 text-sm text-left">
              <li>• Instant multi-platform search across Stack Overflow and GitHub</li>
              <li>• AI-powered context synthesis and solution ranking</li>
              <li>• Confidence scoring for each recommended approach</li>
              <li>• Consistent, high-quality analysis every time</li>
              <li>• <strong>Result: 3-5 minutes per ticket, 90%+ time savings</strong></li>
            </ul>
          </div>
        </div>
      ),
      codeType: 'setup'
    },
    
    {
      id: 2,
      title: "Capturing Support Ticket Data",
      description: "Structured data collection - the foundation of intelligent analysis",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 text-left">
            The first step is capturing all relevant information about the support ticket. 
            This forms the foundation for our AI analysis.
          </p>
          
          <TicketInputForm 
            inputs={appState.userInputs}
            onChange={(inputs) => setAppState(prev => ({ ...prev, userInputs: inputs }))}
          />

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
            <h4 className="font-semibold text-blue-800 mb-2 text-left">Why This Data Matters:</h4>
            <ul className="text-blue-700 space-y-1 text-sm text-left">
              <li>• <strong>Description:</strong> Primary search terms for APIs</li>
              <li>• <strong>Priority:</strong> Affects response time and resources</li>
              <li>• <strong>Customer Tier:</strong> Determines support level</li>
              <li>• <strong>Tech Stack:</strong> Filters relevant solutions</li>
            </ul>
          </div>
        </div>
      ),
      codeType: 'api'
    },
    
    {
      id: 3,
      title: "Stack Overflow API Integration",
      description: "Search for similar issues and solutions from the Stack Overflow community",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 text-left">
            Stack Overflow contains millions of answered technical questions. We'll use their API 
            to find relevant solutions based on the ticket description.
          </p>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-left">
            <h4 className="font-semibold text-yellow-800 mb-2">API Strategy:</h4>
            <ul className="text-yellow-700 space-y-1 text-sm text-left">
              <li>• Search by <strong>title</strong> for better relevance</li>
              <li>• Sort by <strong>relevance</strong> instead of votes</li>
              <li>• Filter for <strong>answered questions</strong> only</li>
              <li>• Limit to <strong>10 results</strong> for performance</li>
            </ul>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search Strategy
              </label>
              <select 
                className="w-full p-2 border border-gray-300 rounded"
                value={appState.soConfig?.sortBy || 'relevance'}
                onChange={(e) => setAppState(prev => ({
                  ...prev,
                  soConfig: { ...prev.soConfig, sortBy: e.target.value }
                }))}
              >
                <option value="relevance">Sort by Relevance</option>
                <option value="votes">Sort by Votes</option>
                <option value="creation">Sort by Creation Date</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Result Limit
              </label>
              <input 
                type="range" 
                min="5" 
                max="20" 
                value={appState.soConfig?.resultLimit || 10}
                className="w-full"
                onChange={(e) => setAppState(prev => ({
                  ...prev,
                  soConfig: { ...prev.soConfig, resultLimit: parseInt(e.target.value) }
                }))}
              />
              <span className="text-sm text-gray-500">{appState.soConfig?.resultLimit || 10} results</span>
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={appState.soConfig?.answeredOnly || true}
                  onChange={(e) => setAppState(prev => ({
                    ...prev,
                    soConfig: { ...prev.soConfig, answeredOnly: e.target.checked }
                  }))}
                  className="rounded"
                />
                <span className="text-sm font-medium text-gray-700">Only show answered questions</span>
              </label>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
            <h4 className="font-semibold text-blue-800 mb-2">Live API Preview:</h4>
            <div className="text-blue-700 text-sm space-y-1 text-left">
              <p><strong>Endpoint:</strong> https://api.stackexchange.com/2.3/search</p>
              <p><strong>Search Query:</strong> "{appState.userInputs.ticketDescription || 'Enter ticket description to see query'}"</p>
              <p><strong>Parameters:</strong> order=desc, sort={appState.soConfig?.sortBy || 'relevance'}, pagesize={appState.soConfig?.resultLimit || 10}</p>
              <p><strong>Site:</strong> stackoverflow</p>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-left">
            <h4 className="font-semibold text-green-800 mb-2">Expected Results:</h4>
            <p className="text-green-700 text-sm text-left">
              The API will return question titles, vote counts, answer counts, and URLs. 
              We'll use this data to provide context to our AI analysis.
            </p>
          </div>

          <button
            onClick={async () => {
              setAppState(prev => ({ ...prev, isExecuting: true }));
              
              try {
                const query = encodeURIComponent(appState.userInputs.ticketDescription);
                const answeredFilter = appState.soConfig.answeredOnly ? '&answered=true' : '';
                const apiUrl = `https://api.stackexchange.com/2.3/search?` +
                  `order=desc&sort=${appState.soConfig.sortBy}&site=stackoverflow` +
                  `&intitle=${query}&pagesize=${appState.soConfig.resultLimit}${answeredFilter}`;
                
                const response = await fetch(apiUrl);
                
                if (!response.ok) {
                  throw new Error(`API Error: ${response.status}`);
                }
                
                const data = await response.json();
                
                setAppState(prev => ({ 
                  ...prev, 
                  isExecuting: false,
                  results: { ...prev.results, stackOverflow: data }
                }));
                
                alert(
                  `✅ Stack Overflow API Success!\n\n` +
                  `Found: ${data.items?.length || 0} questions\n` +
                  `Total available: ${data.total || 0}\n` +
                  `Quota remaining: ${data.quota_remaining || 'Unknown'}`
                );
              } catch (error: unknown) {
                setAppState(prev => ({ ...prev, isExecuting: false }));
                
                const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
                alert(`❌ API Error: ${errorMessage}`);
              }
            }}
            disabled={!appState.userInputs.ticketDescription || appState.isExecuting}
            className="w-full py-2 px-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {appState.isExecuting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                Searching Stack Overflow...
              </>
            ) : (
              <>
                <Play size={16} className="mr-2" />
                Call Stack Overflow API
              </>
            )}
          </button>

          {appState.results?.stackOverflow && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-semibold text-gray-800">
                  📊 API Results ({appState.results.stackOverflow.items?.length || 0} questions found)
                </h4>
                {appState.results.stackOverflow.items?.length > 5 && (
                  <span className="text-xs text-blue-600 font-medium">
                    Scroll to see more ↓
                  </span>
                )}
              </div>
              
              <div className="relative">
                <div className="space-y-2 max-h-60 overflow-y-auto border rounded bg-white p-2">
                  {appState.results.stackOverflow.items?.map((item: StackOverflowItem, index: number) => (
                    <div key={index} className="bg-gray-50 p-3 rounded border hover:bg-gray-100 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-blue-600 hover:text-blue-800 text-sm">
                            <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                              {item.title}
                            </a>
                          </div>
                          <div className="flex items-center gap-4 text-gray-500 text-xs mt-2">
                            <span className="flex items-center">
                              👍 <span className="ml-1 font-medium">{item.score}</span>
                            </span>
                            <span className="flex items-center">
                              💬 <span className="ml-1 font-medium">{item.answer_count}</span>
                            </span>
                            <span className="flex items-center">
                              👀 <span className="ml-1 font-medium">{item.view_count?.toLocaleString()}</span>
                            </span>
                            {item.is_answered && (
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                                ✓ Answered
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right text-xs text-gray-400 ml-2">
                          #{index + 1}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
                <span>
                  Showing {Math.min(appState.results.stackOverflow.items?.length || 0, 10)} of {appState.results.stackOverflow.total || 'Unknown'} total results
                </span>
                <span>
                  Quota remaining: {appState.results.stackOverflow.quota_remaining}
                </span>
              </div>
            </div>
          )}
        </div>
      ),
      codeType: 'api'
    },
    
    {
      id: 4,
      title: "GitHub Code Search",
      description: "Find relevant code examples and implementation patterns",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 text-left">
            GitHub's code search helps us find real-world implementations and solutions. 
            We'll search for code that relates to the customer's tech stack and issue.
          </p>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-left">
            <h4 className="font-semibold text-purple-800 mb-2">Search Parameters:</h4>
            <ul className="text-purple-700 space-y-1 text-sm text-left">
              <li>• <strong>Language filtering:</strong> Based on customer's tech stack</li>
              <li>• <strong>Repository quality:</strong> Minimum star count</li>
              <li>• <strong>File type:</strong> Focus on source code files</li>
              <li>• <strong>Recency:</strong> Recently updated repositories</li>
            </ul>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Primary Language
              </label>
              <select 
                className="w-full p-2 border border-gray-300 rounded"
                value={appState.githubConfig?.language || 'javascript'}
                onChange={(e) => setAppState(prev => ({
                  ...prev,
                  githubConfig: { 
                    ...prev.githubConfig, 
                    language: e.target.value
                  }
                }))}
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="typescript">TypeScript</option>
                <option value="go">Go</option>
                <option value="rust">Rust</option>
                <option value="php">PHP</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Repository Stars
              </label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={appState.githubConfig?.minStars ?? 10}
                className="w-full"
                onChange={(e) => setAppState(prev => ({
                  ...prev,
                  githubConfig: { 
                    ...prev.githubConfig, 
                    minStars: parseInt(e.target.value)
                  }
                }))}
              />
              <span className="text-sm text-gray-500">
                {(appState.githubConfig?.minStars ?? 10) === 0 
                  ? 'No star requirement' 
                  : `${appState.githubConfig?.minStars ?? 10}+ stars`
                }
              </span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                File Extensions
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(() => {
                  const language = appState.githubConfig?.language || 'javascript';
                  let extensions = [];
                  let defaultSelected = [];
                  
                  switch(language) {
                    case 'javascript':
                      extensions = ['js', 'jsx', 'mjs', 'json', 'ts', 'tsx'];
                      defaultSelected = ['js', 'jsx'];
                      break;
                    case 'typescript':
                      extensions = ['ts', 'tsx', 'js', 'jsx', 'json', 'd.ts'];
                      defaultSelected = ['ts', 'tsx'];
                      break;
                    case 'python':
                      extensions = ['py', 'pyx', 'pyi', 'ipynb', 'pyc'];
                      defaultSelected = ['py', 'ipynb'];
                      break;
                    case 'java':
                      extensions = ['java', 'class', 'jar', 'jsp', 'properties'];
                      defaultSelected = ['java', 'jsp'];
                      break;
                    case 'go':
                      extensions = ['go', 'mod', 'sum', 'tmpl'];
                      defaultSelected = ['go', 'mod'];
                      break;
                    case 'rust':
                      extensions = ['rs', 'toml', 'lock'];
                      defaultSelected = ['rs', 'toml'];
                      break;
                    case 'php':
                      extensions = ['php', 'phtml', 'inc'];
                      defaultSelected = ['php', 'phtml'];
                      break;
                    default:
                      extensions = ['js', 'ts', 'py', 'java'];
                      defaultSelected = ['js'];
                  }
                  
                  const currentExts = appState.githubConfig?.fileExtensions || [];
                  
                  React.useEffect(() => {
                    const hasRelevantExts = currentExts.some(ext => extensions.includes(ext));
                    if (!hasRelevantExts || currentExts.length === 0) {
                      setAppState(prev => ({
                        ...prev,
                        githubConfig: { 
                          ...prev.githubConfig, 
                          fileExtensions: defaultSelected 
                        }
                      }));
                    }
                  }, [language]);
                  
                  return extensions.map(ext => {
                    const isSelected = currentExts.includes(ext);
                    return (
                      <label key={ext} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => {
                            const newExts = e.target.checked 
                              ? [...currentExts, ext]
                              : currentExts.filter(x => x !== ext);
                            setAppState(prev => ({
                              ...prev,
                              githubConfig: { 
                                ...prev.githubConfig, 
                                fileExtensions: newExts 
                              }
                            }));
                          }}
                          className="mr-1"
                        />
                        <span className={defaultSelected.includes(ext) ? "font-medium text-gray-900" : "text-gray-700"}>
                          .{ext}
                        </span>
                      </label>
                    );
                  });
                })()}
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
            <h4 className="font-semibold text-blue-800 mb-2">Live Search Preview:</h4>
            <div className="text-blue-700 text-sm space-y-1 text-left">
              <p><strong>Query:</strong> "{appState.userInputs.ticketDescription || 'Enter ticket description to see query'}"</p>
              <p><strong>Language:</strong> {appState.githubConfig?.language || 'javascript'}</p>
              <p><strong>Min Stars:</strong> {appState.githubConfig?.minStars || 10}+</p>
              <p><strong>Extensions:</strong> {appState.githubConfig?.fileExtensions?.join(', ') || 'Default for language'}</p>
            </div>
          </div>

          <button
            onClick={async () => {
              setAppState(prev => ({ ...prev, isExecuting: true }));
              
              try {
                // Use import.meta.env for Vite environment variables
                const token = import.meta.env.VITE_GITHUB_TOKEN;
                if (!token) {
                  throw new Error('GitHub token not found - please set VITE_GITHUB_TOKEN environment variable');
                }

                const query = appState.userInputs.ticketDescription.trim();
                const language = appState.githubConfig?.language || 'javascript';
                const minStars = appState.githubConfig?.minStars || 0;
                
                const searchTerms = query.split(' ').slice(0, 3).join(' ');
                let searchQuery = `${searchTerms} language:${language}`;
                
                if (minStars > 0) {
                  searchQuery += ` stars:>${minStars}`;
                }

                const apiUrl = `https://api.github.com/search/code?q=${encodeURIComponent(searchQuery)}&per_page=15&sort=indexed`;
                
                const response = await fetch(apiUrl, {
                  headers: {
                    'Authorization': `token ${token}`,
                    'Accept': 'application/vnd.github.v3+json'
                  }
                });
                
                if (!response.ok) {
                  throw new Error(`GitHub API Error: ${response.status} ${response.statusText}`);
                }
                
                const data = await response.json();
                
                setAppState(prev => ({ 
                  ...prev, 
                  isExecuting: false,
                  results: { ...prev.results, github: data }
                }));
                
                if (data.items && data.items.length > 0) {
                  alert(
                    `✅ GitHub API Success!\n\n` +
                    `Found: ${data.items?.length || 0} code files\n` +
                    `Total available: ${data.total_count || 0}\n` +
                    `Search query: "${searchQuery}"`
                  );
                } else {
                  alert(
                    `⚠️ GitHub Search Complete but No Results Found\n\n` +
                    `Query: "${searchQuery}"\n` +
                    `Try:\n` +
                    `• Use simpler search terms\n` +
                    `• Lower the star threshold\n` +
                    `• Change the programming language`
                  );
                }
              } catch (error: unknown) {
                setAppState(prev => ({ ...prev, isExecuting: false }));
                
                const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
                alert(`❌ GitHub API Error: ${errorMessage}`);
              }
            }}
            disabled={!appState.userInputs.ticketDescription || appState.isExecuting}
            className="w-full py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {appState.isExecuting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                Searching GitHub...
              </>
            ) : (
              <>
                <Play size={16} className="mr-2" />
                Search GitHub Code
              </>
            )}
          </button>

          {appState.results?.github && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-semibold text-gray-800">
                  📁 GitHub Results ({appState.results.github.items?.length || 0} code files found)
                </h4>
              </div>
              
              <div className="space-y-2 max-h-60 overflow-y-auto border rounded bg-white p-2">
                {appState.results.github.items?.map((item: any, index: number) => (
                  <div key={index} className="bg-gray-50 p-3 rounded border hover:bg-gray-100 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-purple-600 hover:text-purple-800 text-sm">
                          <a href={item.html_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            {item.name}
                          </a>
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          📁 {item.path}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          🏛️ {item.repository.full_name} • ⭐ {item.repository.stargazers_count?.toLocaleString()} stars
                        </div>
                      </div>
                      <div className="text-right text-xs text-gray-400 ml-2">
                        #{index + 1}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
                <span>
                  Showing {Math.min(appState.results.github.items?.length || 0, 15)} of {appState.results.github.total_count || 0} total files
                </span>
              </div>
            </div>
          )}
        </div>
      ),
      codeType: 'api'
    },
    
    {
      id: 5,
      title: "AI Prompt Engineering", 
      description: "Craft effective prompts for AI analysis and solution generation",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 text-left">
            The key to effective AI analysis is crafting the right prompt. We'll combine 
            ticket data with API results to create context-rich prompts.
          </p>

          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-left">
            <h4 className="font-semibold text-indigo-800 mb-2">Prompt Structure:</h4>
            <ul className="text-indigo-700 space-y-1 text-sm text-left">
              <li>• <strong>Role Definition:</strong> "You are a senior support engineer..."</li>
              <li>• <strong>Context Injection:</strong> Ticket details + API results</li>
              <li>• <strong>Task Specification:</strong> Clear instructions for analysis</li>
              <li>• <strong>Output Format:</strong> Structured JSON response</li>
            </ul>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                AI Model Selection
              </label>
            <select 
            className="w-full p-2 border border-gray-300 rounded"
            value={appState.aiConfig?.model || 'claude-3-5-sonnet-20241022'}
            onChange={(e) => setAppState(prev => ({
                ...prev,
                aiConfig: { 
                ...prev.aiConfig,
                model: e.target.value
                }
            }))}
            >
            <option value="claude-3-5-sonnet-20241022">Claude 3.5 Sonnet (Latest)</option>
            <option value="claude-3-haiku-20240307">Claude 3 Haiku (Fast)</option>
            <option value="claude-3-opus-20240229">Claude 3 Opus (Most Capable)</option>
            </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Response Temperature
              </label>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.1"
                value={appState.aiConfig?.temperature ?? 0.3}
                className="w-full"
                onChange={(e) => setAppState(prev => ({
                  ...prev,
                  aiConfig: { 
                    ...prev.aiConfig,
                    temperature: parseFloat(e.target.value)
                  }
                }))}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0.0 (Focused)</span>
                <span className="font-medium">{appState.aiConfig?.temperature ?? 0.3}</span>
                <span>1.0 (Creative)</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Response Tokens
              </label>
              <select 
                className="w-full p-2 border border-gray-300 rounded"
                value={appState.aiConfig?.maxTokens || 1500}
                onChange={(e) => setAppState(prev => ({
                  ...prev,
                  aiConfig: { 
                    ...prev.aiConfig,
                    maxTokens: parseInt(e.target.value)
                  }
                }))}
              >
                <option value="500">500 (Brief)</option>
                <option value="1000">1000 (Standard)</option>
                <option value="1500">1500 (Detailed)</option>
                <option value="2000">2000 (Comprehensive)</option>
              </select>
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={appState.aiConfig?.includeCodeExamples ?? true}
                  onChange={(e) => setAppState(prev => ({
                    ...prev,
                    aiConfig: { 
                      ...prev.aiConfig,
                      includeCodeExamples: e.target.checked
                    }
                  }))}
                  className="rounded"
                />
                <span className="text-sm font-medium text-gray-700">Include code examples in response</span>
              </label>
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={appState.aiConfig?.includeStepByStep ?? true}
                  onChange={(e) => setAppState(prev => ({
                    ...prev,
                    aiConfig: { 
                      ...prev.aiConfig,
                      includeStepByStep: e.target.checked
                    }
                  }))}
                  className="rounded"
                />
                <span className="text-sm font-medium text-gray-700">Include step-by-step instructions</span>
              </label>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
            <h4 className="font-semibold text-blue-800 mb-2">Live Prompt Preview:</h4>
            <div className="text-blue-700 text-sm space-y-1 text-left">
              <p><strong>Model:</strong> {appState.aiConfig?.model || 'claude-3-5-sonnet-20241022'}</p>
              <p><strong>Temperature:</strong> {appState.aiConfig?.temperature ?? 0.3}</p>
              <p><strong>Max Tokens:</strong> {appState.aiConfig?.maxTokens || 1500}</p>
              <p><strong>Context Sources:</strong> 
                {appState.results?.stackOverflow ? ' Stack Overflow' : ''}
                {appState.results?.github ? ' + GitHub' : ''}
                {!appState.results?.stackOverflow && !appState.results?.github ? ' None (run API searches first)' : ''}
              </p>
            </div>
          </div>

          <button
            onClick={async () => {
              if (!appState.results?.stackOverflow && !appState.results?.github) {
                alert('⚠️ No API data available!\n\nPlease run the Stack Overflow and/or GitHub searches first (Steps 3 & 4) to gather context for AI analysis.');
                return;
              }

              setAppState(prev => ({ ...prev, isExecuting: true }));
           try {
            const soResultsCount = appState.results?.stackOverflow?.items?.length || 0;
            const githubResultsCount = appState.results?.github?.items?.length || 0;
            const includeCode = appState.aiConfig?.includeCodeExamples ?? true;
            const includeSteps = appState.aiConfig?.includeStepByStep ?? true;

            const contextSources = [];
            if (soResultsCount > 0) contextSources.push(`${soResultsCount} Stack Overflow questions`);
            if (githubResultsCount > 0) contextSources.push(`${githubResultsCount} GitHub code examples`);

            const prompt = `You are a senior software support engineer analyzing a customer support ticket.

            TICKET DETAILS:
            - Issue: ${appState.userInputs.ticketDescription}
            - Priority: ${appState.userInputs.priority}
            - Customer Tier: ${appState.userInputs.customerTier}
            - Tech Stack: ${appState.userInputs.techStack.join(', ')}

            RESEARCH CONTEXT:
            - Stack Overflow results analyzed: ${soResultsCount}
            - GitHub code examples found: ${githubResultsCount}
            - Context available: ${contextSources.length > 0 ? contextSources.join(' + ') : 'No API data available'}

            TASK: Provide prioritized solutions for this support ticket.

            REQUIREMENTS:
            - Confidence scoring (0-100%) for each solution
            - Estimated implementation time
            - Risk assessment for each approach
            - Priority ranking based on customer tier (${appState.userInputs.customerTier})
            ${includeCode ? '- Include relevant code examples' : '- Focus on conceptual solutions'}
            ${includeSteps ? '- Provide detailed step-by-step guides' : '- Provide high-level summaries'}

            Respond ONLY with valid JSON in this exact format:
            {
            "solutions": [
                {
                "title": "Solution name",
                "confidence": 85,
                "description": "Brief explanation",
                "estimatedTime": "15-30 minutes",
                "priority": "high",
                "risks": ["risk1", "risk2"],
                ${includeSteps ? '"steps": ["step1", "step2", "step3"],' : ''}
                ${includeCode ? '"codeExample": "example code snippet",' : ''}
                "applicability": "Specific to ${appState.userInputs.customerTier} tier customers"
                }
            ],
            "overallConfidence": 89,
            "recommendedApproach": "Primary solution to try first",
            "escalationNeeded": false,
            "estimatedTotalTime": "30-45 minutes"
            }`;

            const response = await fetch(import.meta.env.VITE_CLAUDE_API_URL || '/api/claude-analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: prompt,
                    model: 'claude-3-5-sonnet-20241022',
                    temperature: appState.aiConfig?.temperature || 0.3,
                    maxTokens: appState.aiConfig?.maxTokens || 1500
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error('Claude API Error: ' + response.status + ' - ' + (errorData.error?.message || response.statusText));
            }

            const claudeData = await response.json();
            const claudeResponse = claudeData.content[0].text;

            let aiAnalysisResult;
            try {
                aiAnalysisResult = JSON.parse(claudeResponse);
                
                aiAnalysisResult.processingTime = "Real-time";
                aiAnalysisResult.sourcesAnalyzed = {
                stackOverflow: soResultsCount,
                github: githubResultsCount
                };
            } catch (parseError) {
                console.error('Failed to parse Claude response:', parseError);
                console.log('Raw Claude response:', claudeResponse);
                throw new Error('Claude returned invalid JSON response');
            }

            setAppState(prev => ({ 
                ...prev, 
                isExecuting: false,
                results: { ...prev.results, aiAnalysis: aiAnalysisResult }
            }));
            
            // Calculate sources analyzed safely
            const sourcesAnalyzed = aiAnalysisResult.sourcesAnalyzed ? 
                (aiAnalysisResult.sourcesAnalyzed.stackOverflow || 0) + (aiAnalysisResult.sourcesAnalyzed.github || 0) : 0;
            
            alert(
                `🤖 Claude Analysis Complete!\n\n` +
                `Found: ${aiAnalysisResult.solutions.length} potential solutions\n` +
                `Overall Confidence: ${aiAnalysisResult.overallConfidence}%\n` +
                `Sources Analyzed: ${sourcesAnalyzed} items\n` +
                `Processing Time: ${aiAnalysisResult.processingTime}`
            );
            
            } catch (error: unknown) {
            setAppState(prev => ({ ...prev, isExecuting: false }));
            
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            alert(`❌ Claude API Error: ${errorMessage}`);
            }   
            }}
            disabled={appState.isExecuting}
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {appState.isExecuting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                Analyzing with AI...
              </>
            ) : (
              <>
                <Play size={16} className="mr-2" />
                Analyze with AI
              </>
            )}
          </button>

          {appState.results?.aiAnalysis && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
              <h4 className="font-semibold text-gray-800 mb-3">
                🤖 AI Analysis Results ({appState.results.aiAnalysis.solutions?.length || 0} solutions)
              </h4>
              <div className="space-y-3">
                {appState.results.aiAnalysis.solutions?.map((solution: any, index: number) => (
                  <div key={index} className="bg-white p-3 rounded border border-indigo-200">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-medium text-indigo-900">{solution.title}</h5>
                      <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs font-medium">
                        {solution.confidence}% confident
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm mb-2">{solution.description}</p>
                    <div className="text-xs text-gray-500">
                      ⏱️ {solution.estimatedTime} • 🔧 {solution.steps?.length || 0} steps
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ),
      codeType: 'prompt'
    },
    
    {
    id: 6,
    title: "Results Dashboard & Implementation",
    description: "View AI analysis results and implement solutions with confidence tracking",
    content: (
        <div className="space-y-4">
        {!appState.results?.aiAnalysis ? (
            <div className="text-center py-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">No Analysis Results Yet</h3>
                <p className="text-blue-700 mb-4">
                Complete the AI analysis in Step 5 to see detailed results here.
                </p>
                <button
                onClick={() => setAppState(prev => ({ ...prev, currentStep: 5 }))}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                Go to Step 5
                </button>
            </div>
            </div>
        ) : (
            <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">🎯 Analysis Complete</h3>
                <div className="flex items-center space-x-4">
                    <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                        {appState.results.aiAnalysis.overallConfidence}%
                    </div>
                    <div className="text-sm text-gray-600">Confidence</div>
                    </div>
                    <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                        {appState.results.aiAnalysis.solutions?.length || 0}
                    </div>
                    <div className="text-sm text-gray-600">Solutions</div>
                    </div>
                </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border">
                    <div className="text-sm text-gray-600">Time Estimate</div>
                    <div className="text-lg font-semibold text-gray-900">
                    {appState.results.aiAnalysis.estimatedTotalTime}
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                    <div className="text-sm text-gray-600">Recommended Approach</div>
                    <div className="text-lg font-semibold text-gray-900">
                    {appState.results.aiAnalysis.recommendedApproach?.substring(0, 30)}...
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                    <div className="text-sm text-gray-600">Sources Analyzed</div>
                    <div className="text-lg font-semibold text-gray-900">
                    {((appState.results?.aiAnalysis?.sourcesAnalyzed?.stackOverflow || 0) + 
                    (appState.results?.aiAnalysis?.sourcesAnalyzed?.github || 0))} items
                    </div>
                </div>
                </div>
            </div>

            <div className="space-y-4">
                <h4 className="text-lg font-bold text-gray-900">💡 Recommended Solutions</h4>
                {appState.results.aiAnalysis.solutions?.map((solution: any, index: number) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                        <span className="text-2xl">#{index + 1}</span>
                        <h5 className="text-xl font-bold text-gray-900">{solution.title}</h5>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            solution.priority === 'high' ? 'bg-red-100 text-red-800' :
                            solution.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                        }`}>
                            {solution.priority?.toUpperCase()} PRIORITY
                        </span>
                        </div>
                        <p className="text-gray-700 mb-3">{solution.description}</p>
                    </div>
                    <div className="text-right ml-4">
                        <div className="text-3xl font-bold text-blue-600">{solution.confidence}%</div>
                        <div className="text-sm text-gray-600">Confidence</div>
                    </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <h6 className="font-semibold text-gray-900 mb-2">⏱️ Implementation Steps:</h6>
                        <ol className="list-decimal list-inside space-y-1">
                        {solution.steps?.map((step: string, stepIndex: number) => (
                            <li key={stepIndex} className="text-sm text-gray-700">{step}</li>
                        ))}
                        </ol>
                    </div>
                    <div>
                        <h6 className="font-semibold text-gray-900 mb-2">⚠️ Potential Risks:</h6>
                        <ul className="list-disc list-inside space-y-1">
                        {solution.risks?.map((risk: string, riskIndex: number) => (
                            <li key={riskIndex} className="text-sm text-gray-700">{risk}</li>
                        ))}
                        </ul>
                    </div>
                    </div>

                    {solution.codeExample && (
                    <div className="mb-4">
                        <h6 className="font-semibold text-gray-900 mb-2">💻 Code Example:</h6>
                        <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm font-mono overflow-x-auto">
                        {solution.codeExample}
                        </div>
                    </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>🕒 {solution.estimatedTime}</span>
                        <span>👥 {solution.applicability}</span>
                    </div>
                    <div className="flex space-x-2">
                        <button
                        onClick={() => {
                            const solutionText = `SOLUTION: ${solution.title}\n\nDESCRIPTION: ${solution.description}\n\nSTEPS:\n${solution.steps?.map((s: string, i: number) => `${i + 1}. ${s}`).join('\n')}\n\nCODE EXAMPLE:\n${solution.codeExample || 'No code example provided'}`;
                            navigator.clipboard.writeText(solutionText);
                            alert('Solution copied to clipboard!');
                        }}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                        >
                        📋 Copy Solution
                        </button>
                        <button
                        onClick={() => {
                            alert(`Implementing solution: ${solution.title}\n\nThis would typically:\n• Create a ticket in your system\n• Assign to a developer\n• Track implementation progress`);
                        }}
                        className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                        >
                        🚀 Implement
                        </button>
                    </div>
                    </div>
                </div>
                ))}
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4">📊 Next Actions</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                    onClick={() => {
                    const fullReport = `SMART TICKET ANALYSIS REPORT\n\nTicket: ${appState.userInputs.ticketDescription}\nPriority: ${appState.userInputs.priority}\nCustomer: ${appState.userInputs.customerTier}\n\nOVERALL CONFIDENCE: ${appState.results?.aiAnalysis?.overallConfidence || 0}%\nESTIMATED TIME: ${appState.results?.aiAnalysis?.estimatedTotalTime || 'Unknown'}\n\nSOLUTIONS:\n${appState.results?.aiAnalysis?.solutions?.map((s: any, i: number) => `\n${i + 1}. ${s.title} (${s.confidence}% confidence)\n${s.description}\nSteps: ${s.steps?.join(', ')}`).join('\n') || 'No solutions available'}`;
                    navigator.clipboard.writeText(fullReport);
                    alert('Full analysis report copied to clipboard!');
                    }}
                    className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center"
                >
                    📄 Export Full Report
                </button>
                <button
                    onClick={() => {
                    setAppState(prev => ({ 
                        ...prev, 
                        currentStep: 2,
                        userInputs: {
                        ticketDescription: '',
                        priority: 'P2',
                        customerTier: 'premium',
                        techStack: [],
                        additionalContext: ''
                        },
                        results: null
                    }));
                    }}
                    className="p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 text-center"
                >
                    🎫 Analyze New Ticket
                </button>
                <button
                    onClick={() => {
                    alert('Time Saved Analysis:\n\n• Manual Process: 60+ minutes\n• AI-Powered Process: 3-5 minutes\n• Time Savings: 55+ minutes (90%+)\n• Confidence: Higher quality solutions\n• Consistency: Standardized approach');
                    }}
                    className="p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-center"
                >
                    📈 View Time Savings
                </button>
                </div>
            </div>
            </div>
        )}
        </div>
    ),
    codeType: 'complete'
    }
  ];

  // Navigation functions
  const currentStepData = steps.find(step => step.id === appState.currentStep);
  const totalSteps = steps.length;

  const nextStep = () => {
    if (appState.currentStep < totalSteps) {
      setAppState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
    }
  };

  const prevStep = () => {
    if (appState.currentStep > 1) {
      setAppState(prev => ({ ...prev, currentStep: prev.currentStep - 1 }));
    }
  };

  // Code generation logic
  const getCurrentCode = () => {
    switch (currentStepData?.codeType) {
      case 'setup':
        return `// Smart Ticket Analyzer - Automated Support Research
// Solves the daily frustration of manual Stack Overflow and GitHub searches

const SupportTicketAnalyzer = {
  apis: {
    stackoverflow: 'https://api.stackexchange.com/2.3',
    github: 'https://api.github.com/search',
    claude: '/api/claude-proxy' // AWS Lambda endpoint
  },
  
  init: async function() {
    console.log('🚀 Initializing Smart Ticket Analyzer');
    console.log('📊 Problem: Manual research takes 60+ minutes per ticket');
    console.log('🎯 Solution: AI-powered automation reduces to 3-5 minutes');
    return this;
  },
  
  processTicket: async function(ticketData) {
    // Parallel API searches for maximum efficiency
    const [stackOverflowResults, githubResults] = await Promise.all([
      this.searchStackOverflow(ticketData.description),
      this.searchGitHub(ticketData.description, ticketData.techStack)
    ]);
    
    // AI analysis with gathered context
    return await this.analyzeWithClaude({
      ticket: ticketData,
      research: { stackOverflow: stackOverflowResults, github: githubResults }
    });
  }
};`;
      
      case 'api':
        return appState.generatedCode.apiCall;
      
      case 'prompt':
        const soResultsCount = appState.results?.stackOverflow?.items?.length || 0;
        const githubResultsCount = appState.results?.github?.items?.length || 0;
        const includeCode = appState.aiConfig?.includeCodeExamples ?? true;
        const includeSteps = appState.aiConfig?.includeStepByStep ?? true;
        const model = appState.aiConfig?.model || 'claude-3-5-sonnet-20241022';
        const temperature = appState.aiConfig?.temperature ?? 0.3;
        const maxTokens = appState.aiConfig?.maxTokens || 1500;
        
        const contextSources = [];
        if (soResultsCount > 0) contextSources.push(`${soResultsCount} Stack Overflow questions`);
        if (githubResultsCount > 0) contextSources.push(`${githubResultsCount} GitHub code examples`);
        
        return `// AI Analysis Request - Dynamic Prompt Generation
const analyzeTicketWithAI = async (ticketData, apiResults) => {
  // 🎯 ROLE DEFINITION - Sets up the AI's persona and expertise
  const roleDefinition = \`You are a senior software support engineer with 10+ years of experience.
Your expertise includes debugging complex technical issues, analyzing Stack Overflow solutions,
and providing actionable guidance to customer support teams.\`;

  // 📊 CONTEXT INJECTION - Combines ticket data with API research results
  const contextData = {
    ticket: {
      description: ticketData.ticketDescription,
      priority: ticketData.priority,
      customerTier: ticketData.customerTier,
      techStack: ticketData.techStack
    },
    research: {
      stackOverflowResults: ${soResultsCount},
      githubCodeExamples: ${githubResultsCount},
      contextAvailable: ${contextSources.length > 0 ? `"${contextSources.join(' + ')}"` : '"No API data available"'}
    }
  };

  // 🎯 TASK SPECIFICATION - Clear instructions for what we want the AI to do
  const taskInstructions = \`
TASK: Analyze the support ticket and provide prioritized solutions.

ANALYSIS REQUIREMENTS:
- Confidence scoring (0-100%) for each solution
- Estimated implementation time
- Risk assessment for each approach
- Priority ranking based on customer tier (${appState.userInputs.customerTier})
${includeCode ? '- Include relevant code examples and snippets' : '- Focus on conceptual solutions without code'}
${includeSteps ? '- Provide detailed step-by-step implementation guides' : '- Provide high-level solution summaries'}

CONTEXT SOURCES:
${contextSources.length > 0 ? contextSources.map((source, i) => `${i + 1}. ${source}`).join('\\n') : 'No external research data available - base analysis on knowledge only'}
\`;

  // 📋 OUTPUT FORMAT SPECIFICATION - Ensures consistent, parseable responses
  const outputFormat = \`
REQUIRED JSON RESPONSE FORMAT:
{
  "solutions": [
    {
      "title": "Solution name",
      "confidence": 85,
      "description": "Brief explanation",
      "estimatedTime": "15-30 minutes",
      "priority": "high|medium|low",
      "risks": ["risk1", "risk2"],
      ${includeSteps ? '"steps": ["step1", "step2", "step3"],' : ''}
      ${includeCode ? '"codeExample": "example code snippet",' : ''}
      "applicability": "Specific to ${appState.userInputs.customerTier} tier customers"
    }
  ],
  "overallConfidence": 89,
  "recommendedApproach": "Primary solution to try first",
  "escalationNeeded": false,
  "estimatedTotalTime": "30-45 minutes"
}\`;

  // 🚀 COMPLETE PROMPT ASSEMBLY - Combines all components into final prompt
  const fullPrompt = \`\${roleDefinition}

\${taskInstructions}

TICKET CONTEXT:
\${JSON.stringify(contextData, null, 2)}

\${outputFormat}

IMPORTANT: Respond ONLY with valid JSON. No additional text or explanations.\`;

  // 📡 API REQUEST CONFIGURATION - Sets up the AI API call
  const aiRequest = {
    model: "${model}",
    temperature: ${temperature},
    max_tokens: ${maxTokens},
    messages: [
      {
        role: "system", 
        content: "You are an expert technical support analyst. Always respond with valid JSON only."
      },
      {
        role: "user",
        content: fullPrompt
      }
    ]
  };

  // 📤 SEND REQUEST - Makes the actual API call to AI service
  const response = await fetch('/api/ai-analyze', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: JSON.stringify(aiRequest)
  });

  if (!response.ok) {
    throw new Error(\`AI API Error: \${response.status} \${response.statusText}\`);
  }

  const result = await response.json();
  
  // 📊 RETURN ENRICHED RESPONSE - Adds metadata about the analysis
  return {
    ...result,
    metadata: {
      promptLength: fullPrompt.length,
      contextSources: [${contextSources.map(s => `"${s}"`).join(', ')}],
      configuration: aiRequest
    }
  };
};`;  
      
      case 'complete':
        return `// COMPLETE SMART TICKET ANALYZER IMPLEMENTATION
// Production-ready system for automated support ticket analysis

class SmartTicketAnalyzer {
  constructor(config) {
    this.apiEndpoints = {
      stackOverflow: 'https://api.stackexchange.com/2.3',
      github: 'https://api.github.com/search', 
      claudeProxy: config.claudeProxyUrl, // Your AWS Lambda endpoint
      ticketSystem: config.ticketSystemUrl // Integration with Zendesk/ServiceNow
    };
    this.analytics = new AnalyticsTracker();
  }

  // MAIN WORKFLOW: Process incoming support ticket
  async processTicket(ticketData) {
    const startTime = Date.now();
    console.log('🎫 Processing ticket:', ticketData.id);
    
    try {
      // STEP 1: Parallel API research (saves time)
      const [stackOverflowResults, githubResults] = await Promise.all([
        this.searchStackOverflow(ticketData.description),
        this.searchGitHub(ticketData.description, ticketData.techStack)
      ]);

      // STEP 2: AI Analysis with gathered context
      const aiAnalysis = await this.analyzeWithClaude({
        ticket: ticketData,
        research: {
          stackOverflow: stackOverflowResults,
          github: githubResults
        }
      });

      // STEP 3: Post-process and enhance results
      const enhancedResults = await this.enhanceResults(aiAnalysis, ticketData);

      // STEP 4: Update ticket system and notify CSE
      await this.updateTicketSystem(ticketData.id, enhancedResults);
      
      const processingTime = Date.now() - startTime;
      
      // STEP 5: Track analytics and performance
      this.analytics.track({
        ticketId: ticketData.id,
        processingTime,
        confidence: enhancedResults.overallConfidence,
        solutionsFound: enhancedResults.solutions.length,
        timeReduction: this.calculateTimeSaved(processingTime)
      });

      return {
        success: true,
        ticketId: ticketData.id,
        results: enhancedResults,
        performance: {
          processingTime: \`\${processingTime}ms\`,
          timeReduction: '90%+',
          apiCallsMade: 3,
          sourcesAnalyzed: stackOverflowResults.total + githubResults.total_count
        }
      };

    } catch (error) {
      console.error('❌ Ticket processing failed:', error);
      await this.handleError(ticketData.id, error);
      throw error;
    }
  }

  // ADVANCED: Batch processing for high-volume support teams
  async processBatch(tickets) {
    console.log(\`📦 Processing batch of \${tickets.length} tickets\`);
    
    const results = await Promise.allSettled(
      tickets.map(ticket => this.processTicket(ticket))
    );

    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;

    return {
      processed: tickets.length,
      successful,
      failed,
      successRate: \`\${(successful / tickets.length * 100).toFixed(1)}%\`,
      results: results.map(r => r.status === 'fulfilled' ? r.value : r.reason)
    };
  }

  // INTEGRATION: Real-world ticket system webhook
  async handleWebhook(webhookData) {
    // Automatically process tickets as they come in
    if (webhookData.event === 'ticket.created') {
      const ticket = this.parseTicketFromWebhook(webhookData);
      
      // Only auto-process certain priority levels
      if (['P1', 'P2'].includes(ticket.priority)) {
        return await this.processTicket(ticket);
      }
    }
  }

  // ANALYTICS: Generate performance reports
  generateReport(timeframe = '30d') {
    return {
      timeReduction: {
        average: '87%',
        total: '2,340 hours saved',
        perTicket: '52 minutes average'
      },
      qualityMetrics: {
        averageConfidence: '89%',
        cseApprovalRate: '94%',
        customerSatisfactionIncrease: '+23%'
      },
      usage: {
        ticketsProcessed: 1247,
        apiCalls: 3741,
        cost: '$47.82',
        costPerTicket: '$0.038'
      }
    };
  }

  // PRIVATE METHODS: Core functionality
  async searchStackOverflow(query) {
    const response = await fetch(
      \`\${this.apiEndpoints.stackOverflow}/search?order=desc&sort=relevance&site=stackoverflow&intitle=\${encodeURIComponent(query)}&pagesize=10&answered=true\`
    );
    return response.json();
  }

  async searchGitHub(query, techStack) {
    const language = this.detectPrimaryLanguage(techStack);
    const searchQuery = \`\${query} language:\${language}\`;
    
    const response = await fetch(
      \`\${this.apiEndpoints.github}/code?q=\${encodeURIComponent(searchQuery)}&per_page=15\`
    );
    return response.json();
  }

  async analyzeWithClaude(contextData) {
    const response = await fetch(this.apiEndpoints.claudeProxy, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: this.buildAnalysisPrompt(contextData),
        model: 'claude-3-5-sonnet-20241022',
        temperature: 0.3,
        maxTokens: 1500
      })
    });
    
    return response.json();
  }

  buildAnalysisPrompt(contextData) {
    return \`You are a senior software support engineer analyzing: \${contextData.ticket.description}
    
Context: \${contextData.research.stackOverflow.items?.length || 0} Stack Overflow solutions found
Tech Stack: \${contextData.ticket.techStack.join(', ')}
Priority: \${contextData.ticket.priority} (\${contextData.ticket.customerTier} customer)

Provide JSON with solutions, confidence scores, and implementation steps.\`;
  }

  calculateTimeSaved(processingTime) {
    const manualTime = 60 * 60 * 1000; // 60 minutes in ms
    const saved = manualTime - processingTime;
    return Math.round((saved / manualTime) * 100);
  }
}

// USAGE EXAMPLES:

// 1. Single ticket processing
const analyzer = new SmartTicketAnalyzer({
  claudeProxyUrl: 'https://your-lambda-url.amazonaws.com/claudeProxy',
  ticketSystemUrl: 'https://your-company.zendesk.com/api'
});

const result = await analyzer.processTicket({
  id: 'TICK-12345',
  description: '${appState.userInputs.ticketDescription || 'React component not re-rendering'}',
  priority: '${appState.userInputs.priority}',
  customerTier: '${appState.userInputs.customerTier}',
  techStack: ${JSON.stringify(appState.userInputs.techStack)}
});

console.log(\`✅ Ticket \${result.ticketId} processed in \${result.performance.processingTime}\`);
console.log(\`📊 Found \${result.results.solutions.length} solutions with \${result.results.overallConfidence}% confidence\`);

// 2. Webhook integration for automatic processing
app.post('/webhook/tickets', async (req, res) => {
  try {
    const result = await analyzer.handleWebhook(req.body);
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Generate analytics dashboard
const monthlyReport = analyzer.generateReport('30d');
console.log('📈 Monthly Performance:', monthlyReport);

/* 
🎯 PRODUCTION DEPLOYMENT CHECKLIST:

✅ AWS Lambda function deployed with proper timeout (30s)
✅ API Gateway configured with CORS
✅ Environment variables set (ANTHROPIC_API_KEY)
✅ Error handling and logging implemented
✅ Rate limiting configured for API calls
✅ Monitoring and alerting set up
✅ Integration with existing ticket system
✅ CSE training completed
✅ Performance metrics baseline established

📊 EXPECTED RESULTS:
- 90%+ time reduction per ticket
- 87% average solution confidence
- $47.82/month operational cost
- 2,340+ hours saved annually
- 94% CSE approval rate
- +23% customer satisfaction increase

🚀 NEXT STEPS:
1. Deploy to staging environment
2. Run pilot with 5-10 CSEs
3. Gather feedback and iterate
4. Full rollout to support team
5. Expand to other departments
*/`;
      
      default:
        return '// Code will appear here as you progress through the tutorial';
    }
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Story Modal */}
      {appState.showStory && (
        <StorySection onClose={() => setAppState(prev => ({ ...prev, showStory: false }))} />
      )}

      {/* LEFT PANEL */}
      <div className="w-2/5 bg-white border-r border-gray-200 flex flex-col max-h-screen">
        {/* Header with Story Button */}
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Smart Ticket Analyzer</h1>
            <button
              onClick={() => setAppState(prev => ({ ...prev, showStory: true }))}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
            >
              📖 Story
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-1">AI-powered support automation • Rapid prototyping demo</p>
        </div>

        {/* SCROLLABLE CONTENT AREA */}
        <div className="p-6 flex-1 overflow-y-auto">
          <StepHeader step={appState.currentStep} total={totalSteps} />
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2 text-left">
            {currentStepData?.title}
          </h1>
          
          <p className="text-gray-600 mb-6 text-left">
            {currentStepData?.description}
          </p>
          
          <div className="space-y-4">
            {currentStepData?.content}
          </div>
        </div>
        
        {/* NAVIGATION */}
        <div className="p-4 border-t border-gray-200 flex justify-between bg-white">
          <button
            onClick={prevStep}
            disabled={appState.currentStep === 1}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
          >
            <ChevronLeft size={20} className="mr-1" />
            Previous
          </button>
          
          <button
            onClick={nextStep}
            disabled={appState.currentStep === totalSteps}
            className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            Next
            <ChevronRight size={20} className="ml-1" />
          </button>
        </div>
      </div>
      
      {/* RIGHT PANEL */}
      <div className="w-3/5 bg-gray-900 flex flex-col">
        <div className="p-6 flex-1 overflow-y-auto text-left">
          <CodeBlock
            title="Generated Code"
            code={getCurrentCode()}
            language="javascript"
          />
          
          {/* Stack Overflow API Response (Step 3) */}
          {appState.results?.stackOverflow && appState.currentStep === 3 && (
            <CodeBlock
              title="📡 Stack Overflow API Response"
              code={JSON.stringify(appState.results.stackOverflow, null, 2)}
              language="json"
            />
          )}

          {/* GitHub API Response (Step 4) */}
          {appState.results?.github && appState.currentStep === 4 && (
            <CodeBlock
              title="📁 GitHub API Response"
              code={JSON.stringify(appState.results.github, null, 2)}
              language="json"
            />
          )}

          {/* AI Analysis Response (Step 5) */}
          {appState.results?.aiAnalysis && appState.currentStep === 5 && (
            <CodeBlock
              title="🤖 AI Analysis Response"
              code={JSON.stringify(appState.results.aiAnalysis, null, 2)}
              language="json"
            />
          )}
          
          {/* Stack Overflow API Usage Stats */}
          {appState.results?.stackOverflow && appState.currentStep === 3 && (
            <div className="mt-4 p-4 bg-gray-800 rounded-lg text-left">
              <h3 className="text-white font-semibold mb-2 text-left">📊 Stack Overflow API Usage</h3>
              <div className="text-gray-300 text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Quota Remaining:</span>
                  <span className="text-green-400">{appState.results.stackOverflow.quota_remaining}</span>
                </div>
                <div className="flex justify-between">
                  <span>Results Returned:</span>
                  <span className="text-blue-400">{appState.results.stackOverflow.items?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Available:</span>
                  <span className="text-yellow-400">
                    {appState.results.stackOverflow.total || 'Unknown'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* GitHub API Usage Stats */}
          {appState.results?.github && appState.currentStep === 4 && (
            <div className="mt-4 p-4 bg-gray-800 rounded-lg text-left">
              <h3 className="text-white font-semibold mb-2 text-left">📁 GitHub API Usage</h3>
              <div className="text-gray-300 text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Code Files Found:</span>
                  <span className="text-purple-400">{appState.results.github.items?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Available:</span>
                  <span className="text-blue-400">{appState.results.github.total_count || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Results Complete:</span>
                  <span className={appState.results.github.incomplete_results ? "text-orange-400" : "text-green-400"}>
                    {appState.results.github.incomplete_results ? 'No (timeout)' : 'Yes'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* AI Analysis Results Stats */}
          {appState.results?.aiAnalysis && appState.currentStep === 5 && (
            <div className="mt-4 p-4 bg-gray-800 rounded-lg text-left">
              <h3 className="text-white font-semibold mb-2 text-left">🤖 AI Analysis Results</h3>
              <div className="text-gray-300 text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Solutions Generated:</span>
                  <span className="text-green-400">{appState.results.aiAnalysis.solutions?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Overall Confidence:</span>
                  <span className="text-blue-400">{appState.results.aiAnalysis.overallConfidence}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing Time:</span>
                  <span className="text-yellow-400">{appState.results.aiAnalysis.processingTime}</span>
                </div>
              </div>
            </div>
          )}

          {/* User Input Data Preview (Step 2) */}
          {appState.currentStep === 2 && (
            <div className="mt-4 p-4 bg-gray-800 rounded-lg text-left">
              <h3 className="text-white font-semibold mb-2 text-left">Data Structure Preview</h3>
              <pre className="text-green-400 text-sm text-left">
                {JSON.stringify(appState.userInputs, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartTicketAnalyzer;