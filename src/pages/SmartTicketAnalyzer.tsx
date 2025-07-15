import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Copy, Check, AlertCircle } from 'lucide-react';

// Types
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
    prompt: string;
    response: string;
    implementation: string;
  };
  isExecuting: boolean;
  results: {
    stackOverflow?: StackOverflowResponse;
    github?: any;
    aiAnalysis?: any;
  } | null;
}

// Components
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
  console.log('🚀 CodeBlock RENDER:', { title, codeLength: code?.length, language });

  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple highlighting - NO complex regex patterns
  const highlightCode = (text: string) => {
    if (language === 'javascript') {
      // Add fire emoji marker
      let highlighted = '/* 🔥 HIGHLIGHTING ACTIVE 🔥 */\n' + text;
      
      // Simple word-based highlighting using split/join (safer than regex)
      const keywords = ['const', 'let', 'var', 'function', 'async', 'await', 'return', 'if', 'else', 'for', 'while', 'try', 'catch', 'throw', 'new'];
      
      keywords.forEach(keyword => {
        const regex = new RegExp('\\b' + keyword + '\\b', 'g');
        highlighted = highlighted.replace(regex, `<span style="color: #569cd6; font-weight: bold;">${keyword}</span>`);
      });
      
      return highlighted;
    }
    return text;
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
        <div
          style={{
            color: '#d4d4d4',
            whiteSpace: 'pre-wrap',
            textAlign: 'left'
          }}
          dangerouslySetInnerHTML={{ __html: highlightCode(code) }}
        />
      </div>
    </div>
  );
};

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

const SmartTicketAnalyzer = () => {
  const [appState, setAppState] = useState<AppState>({
    currentStep: 1,
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
      model: 'gpt-4',
      temperature: 0.3,
      maxTokens: 1500,
      includeCodeExamples: true,
      includeStepByStep: true
    },
    generatedCode: {
      apiCall: '',
      prompt: '',
      response: '',
      implementation: ''
    },
    isExecuting: false,
    results: null
  });

  // Update code when inputs change
  useEffect(() => {
    console.log('🔄 useEffect TRIGGERED - generating code:', {
      currentStep: appState.currentStep,
      ticketDescription: appState.userInputs.ticketDescription.substring(0, 30),
      soConfigSortBy: appState.soConfig?.sortBy,
      soConfigLimit: appState.soConfig?.resultLimit
    });
    
    const currentStep = appState.currentStep;
    let apiCall = '// Default code for step ' + currentStep;
    let promptCode = '// Default prompt code';
    
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
  
  // File extension filtering
  if (fileExts.length > 0) {
    const extQuery = fileExts.map(ext => 'extension:' + ext).join(' OR ');
    searchQuery += ' (' + extQuery + ')';
  }
  
  console.log("Searching GitHub with:", {
    language: language,
    minStars: minStars,
    extensions: fileExts,
    query: searchQuery
  });
  
  return { items: [], total_count: 0 };
};`;
    }
    
    // Generate AI prompt code
    if (currentStep >= 5) {
      console.log('🔄 GENERATING ENHANCED PROMPT CODE with config:', {
        model: appState.aiConfig?.model,
        temperature: appState.aiConfig?.temperature,
        maxTokens: appState.aiConfig?.maxTokens
      });
      
      promptCode = `// AI Analysis Request - Enhanced Version
const analyzeWithAI = async (ticketData, apiResults) => {
  const prompt = \`You are a senior technical support engineer analyzing a customer issue.

Issue Details:
- Description: "\${ticketData.ticketDescription}"
- Priority: \${ticketData.priority}  
- Customer Tier: \${ticketData.customerTier}
- Tech Stack: \${ticketData.techStack.join(', ')}

Context from APIs:
- Stack Overflow Results: \${apiResults.stackOverflow?.items?.length || 0} questions
- GitHub Code Examples: \${apiResults.github?.items?.length || 0} files

Based on the above context, provide solutions as structured JSON.

${appState.aiConfig?.includeCodeExamples ? 'Include code examples where helpful.' : 'Focus on conceptual solutions without code examples.'}
${appState.aiConfig?.includeStepByStep ? 'Provide detailed step-by-step instructions.' : 'Provide high-level guidance only.'}\`;

  console.log('AI Request Configuration:', {
    model: '${appState.aiConfig?.model || 'gpt-4'}',
    temperature: ${appState.aiConfig?.temperature ?? 0.3},
    maxTokens: ${appState.aiConfig?.maxTokens || 1500},
    codeExamples: ${appState.aiConfig?.includeCodeExamples ?? true},
    stepByStep: ${appState.aiConfig?.includeStepByStep ?? true}
  });

  const response = await fetch('/api/ai-analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: '${appState.aiConfig?.model || 'gpt-4'}',
      prompt: prompt,
      temperature: ${appState.aiConfig?.temperature ?? 0.3},
      max_tokens: ${appState.aiConfig?.maxTokens || 1500},
      include_code_examples: ${appState.aiConfig?.includeCodeExamples ?? true},
      include_step_by_step: ${appState.aiConfig?.includeStepByStep ?? true}
    })
  });

  return response.json();
};`;
      
      console.log('🔄 GENERATED PROMPT CODE LENGTH:', promptCode.length);
    }
    
    setAppState(prev => {
      console.log('🔄 UPDATING STATE with new prompt code length:', promptCode.length);
      return {
        ...prev,
        generatedCode: {
          ...prev.generatedCode,
          apiCall: apiCall,
          prompt: promptCode,
          implementation: 'Direct implementation for step ' + currentStep
        }
      };
    });
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

  const steps: LearningStep[] = [
    {
      id: 1,
      title: "Understanding the Problem",
      description: "Learn why manual ticket resolution is inefficient and how AI can help",
      content: (
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-left">
            <div className="flex items-center mb-2">
              <AlertCircle className="text-red-500 mr-2" size={20} />
              <h3 className="font-semibold text-red-800">Current Manual Process</h3>
            </div>
            <ul className="text-red-700 space-y-1 text-sm text-left">
              <li>• CSE receives ticket → 5 minutes</li>
              <li>• Search Stack Overflow manually → 15 minutes</li>
              <li>• Look for code examples → 10 minutes</li>
              <li>• Research similar issues → 20 minutes</li>
              <li>• Write response → 10 minutes</li>
              <li>• <strong>Total: 60+ minutes per ticket</strong></li>
            </ul>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-left">
            <h3 className="font-semibold text-green-800 mb-2">AI-Automated Solution</h3>
            <ul className="text-green-700 space-y-1 text-sm text-left">
              <li>• Instant API searches</li>
              <li>• AI-powered analysis</li>
              <li>• Ranked solutions with confidence</li>
              <li>• <strong>Total: 3-5 minutes per ticket</strong></li>
            </ul>
          </div>

          <p className="text-gray-600">
            In this tutorial, you'll learn to build an intelligent support system that automates 
            the research and analysis process, allowing CSEs to focus on customer relationships 
            instead of repetitive research tasks.
          </p>
        </div>
      ),
      codeType: 'setup'
    },
    {
      id: 2,
      title: "Capturing Support Ticket Data",
      description: "Learn how to structure and validate support ticket inputs",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">
            The first step is capturing all relevant information about the support ticket. 
            This forms the foundation for our AI analysis.
          </p>
          
          <TicketInputForm 
            inputs={appState.userInputs}
            onChange={(inputs) => setAppState(prev => ({ ...prev, userInputs: inputs }))}
          />

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
            <h4 className="font-semibold text-blue-800 mb-2">Why This Data Matters:</h4>
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
          <p className="text-gray-600">
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
                
                console.log('Making API call to:', apiUrl);
                
                const response = await fetch(apiUrl);
                
                if (!response.ok) {
                  throw new Error(`API Error: ${response.status}`);
                }
                
                const data = await response.json();
                console.log('Stack Overflow API Response:', data);
                
                setAppState(prev => ({ 
                  ...prev, 
                  isExecuting: false,
                  results: { ...prev.results, stackOverflow: data }
                }));
                
                alert(
                  `✅ Stack Overflow API Success!\n\n` +
                  `Found: ${data.items?.length || 0} questions\n` +
                  `Total available: ${data.total || 0}\n` +
                  `Quota remaining: ${data.quota_remaining || 'Unknown'}\n\n` +
                  `Check the console for full response data.`
                );
              } catch (error: unknown) {
                console.error('Stack Overflow API Error:', error);
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
          <p className="text-gray-600">
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
                  
                  // Auto-select when language changes
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
                const token = import.meta.env.VITE_GITHUB_TOKEN;
                if (!token) {
                  throw new Error('GitHub token not found');
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
                
                console.log('🔍 GitHub Search Query:', searchQuery);
                console.log('📡 GitHub API URL:', apiUrl);
                
                const response = await fetch(apiUrl, {
                  headers: {
                    'Authorization': `token ${token}`,
                    'Accept': 'application/vnd.github.v3+json'
                  }
                });
                
                console.log('📊 GitHub Response Status:', response.status);
                
                if (!response.ok) {
                  const errorText = await response.text();
                  console.log('❌ GitHub Error Response:', errorText);
                  throw new Error(`GitHub API Error: ${response.status} ${response.statusText}`);
                }
                
                const data = await response.json();
                console.log('✅ GitHub API Response:', data);
                
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
                    `Search query: "${searchQuery}"\n\n` +
                    `Check the console and right panel for full response data.`
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
                console.error('💥 GitHub API Error:', error);
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
          <p className="text-gray-600">
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
                value={appState.aiConfig?.model || 'gpt-4'}
                onChange={(e) => setAppState(prev => ({
                  ...prev,
                  aiConfig: { 
                    ...prev.aiConfig,
                    model: e.target.value
                  }
                }))}
              >
                <option value="gpt-4">GPT-4 (Best Analysis)</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo (Faster)</option>
                <option value="claude-3-sonnet">Claude 3 Sonnet</option>
                <option value="claude-3-haiku">Claude 3 Haiku (Fast)</option>
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
              <p><strong>Model:</strong> {appState.aiConfig?.model || 'gpt-4'}</p>
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
                console.log('🤖 AI Analysis Request:', {
                  model: appState.aiConfig?.model || 'gpt-4',
                  temperature: appState.aiConfig?.temperature ?? 0.3,
                  maxTokens: appState.aiConfig?.maxTokens || 1500,
                  context: {
                    ticket: appState.userInputs,
                    stackOverflow: appState.results?.stackOverflow?.items?.length || 0,
                    github: appState.results?.github?.items?.length || 0
                  }
                });

                // Simulate AI processing time
                await new Promise(resolve => setTimeout(resolve, 3000));

                // Mock AI response
                const mockAIResponse = {
                  solutions: [
                    {
                      title: "State Update Timing Issue",
                      confidence: 92,
                      description: "The component is not re-rendering because state updates are asynchronous",
                      steps: [
                        "Use useEffect to monitor state changes",
                        "Ensure state updates are not batched incorrectly",
                        "Add dependency array to useEffect"
                      ],
                      estimatedTime: "15-30 minutes",
                      risks: ["May need to refactor component logic"],
                      codeExample: "useEffect(() => { console.log(state); }, [state]);"
                    },
                    {
                      title: "Incorrect State Mutation",
                      confidence: 87,
                      description: "Direct state mutation prevents React from detecting changes",
                      steps: [
                        "Use spread operator for object updates",
                        "Use functional updates for arrays",
                        "Avoid direct property assignment"
                      ],
                      estimatedTime: "10-20 minutes",
                      risks: ["Requires testing existing functionality"],
                      codeExample: "setState(prev => ({...prev, newProperty: value}));"
                    }
                  ],
                  overallConfidence: 89,
                  processingTime: "3.2 seconds",
                  sourcesAnalyzed: {
                    stackOverflow: appState.results?.stackOverflow?.items?.length || 0,
                    github: appState.results?.github?.items?.length || 0
                  }
                };

                setAppState(prev => ({ 
                  ...prev, 
                  isExecuting: false,
                  results: { ...prev.results, aiAnalysis: mockAIResponse }
                }));
                
                alert(
                  `🤖 AI Analysis Complete!\n\n` +
                  `Found: ${mockAIResponse.solutions.length} potential solutions\n` +
                  `Overall Confidence: ${mockAIResponse.overallConfidence}%\n` +
                  `Sources Analyzed: ${mockAIResponse.sourcesAnalyzed.stackOverflow + mockAIResponse.sourcesAnalyzed.github} items\n` +
                  `Processing Time: ${mockAIResponse.processingTime}`
                );
                
              } catch (error: unknown) {
                console.error('AI Analysis Error:', error);
                setAppState(prev => ({ ...prev, isExecuting: false }));
                
                const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
                alert(`❌ AI Analysis Error: ${errorMessage}`);
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
                      ⏱️ {solution.estimatedTime} • 🔧 {solution.steps.length} steps
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
      title: "Response Processing & Results",
      description: "Parse AI responses and present actionable solutions to CSE teams",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">
            The final step is processing the AI response and presenting results.
          </p>
        </div>
      ),
      codeType: 'complete'
    }
  ];

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

  const getCurrentCode = () => {
    console.log('🎯 getCurrentCode CALLED:', {
      currentStep: appState.currentStep,
      codeType: currentStepData?.codeType,
      apiCallLength: appState.generatedCode.apiCall.length
    });
    
    switch (currentStepData?.codeType) {
      case 'setup':
        return `// Smart Ticket Analyzer - Initial Setup
const SupportTicketAnalyzer = {
  apis: {
    stackoverflow: 'https://api.stackexchange.com/2.3',
    github: 'https://api.github.com/search',
    aiService: '/api/analyze'
  },
  
  init: async function() {
    console.log('🚀 Starting Smart Ticket Analyzer...');
    console.log('📊 Expected improvement: 90% time reduction');
    return this;
  }
};`;
      
      case 'api':
        return appState.generatedCode.apiCall;
      
      case 'prompt':
        return `// AI Analysis Request
const analyzeWithAI = async (ticketData, apiResults) => {
  const prompt = \`Analyze this support ticket: \${ticketData.ticketDescription}\`;
  
  const response = await fetch('/api/ai-analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, model: 'gpt-4' })
  });

  return response.json();
};`;
      
      case 'complete':
        return `// Complete Implementation
const processTicket = async (ticketData) => {
  const soResults = await searchStackOverflow();
  const githubResults = await searchGitHub();
  const aiAnalysis = await analyzeWithAI(ticketData, { soResults, githubResults });
  
  return {
    success: true,
    solutions: aiAnalysis.solutions,
    timeReduction: '90%'
  };
};`;
      
      default:
        return '// Code will appear here as you progress through the tutorial';
    }
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Left Pane - Instructions */}
      <div className="w-2/5 bg-white border-r border-gray-200 flex flex-col max-h-screen">
        <div className="p-6 flex-1 overflow-y-auto">
          <StepHeader step={appState.currentStep} total={totalSteps} />
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {currentStepData?.title}
          </h1>
          
          <p className="text-gray-600 mb-6">
            {currentStepData?.description}
          </p>
          
          <div className="space-y-4">
            {currentStepData?.content}
          </div>
        </div>
        
        {/* Navigation */}
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
      
      {/* Right Pane - Code Display */}
      <div className="w-3/5 bg-gray-900 flex flex-col">
        <div className="p-6 flex-1 overflow-y-auto text-left">
          <CodeBlock
            title="Generated Code"
            code={getCurrentCode()}
            language="javascript"
          />
          
          {/* Stack Overflow API Response Display */}
          {appState.results?.stackOverflow && appState.currentStep === 3 && (
            <CodeBlock
              title="📡 Stack Overflow API Response"
              code={JSON.stringify(appState.results.stackOverflow, null, 2)}
              language="json"
            />
          )}

          {/* GitHub API Response Display */}
          {appState.results?.github && appState.currentStep === 4 && (
            <CodeBlock
              title="📁 GitHub API Response"
              code={JSON.stringify(appState.results.github, null, 2)}
              language="json"
            />
          )}

          {/* AI Analysis Response Display */}
          {appState.results?.aiAnalysis && appState.currentStep === 5 && (
            <CodeBlock
              title="🤖 AI Analysis Response"
              code={JSON.stringify(appState.results.aiAnalysis, null, 2)}
              language="json"
            />
          )}
          
          {/* API Usage Statistics */}
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

          {/* GitHub API Information */}
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

          {/* AI Analysis Information */}
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