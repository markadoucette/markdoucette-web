import { Wrench, Code, Lightbulb } from 'lucide-react';

interface AppIdea {
  title: string;
  description: string;
}

interface SocialLink {
  href: string;
  label: string;
  className: string;
}

const MyApp = (): JSX.Element => {
  const appIdeas: AppIdea[] = [
    {
      title: "Task Manager Pro",
      description: "A sophisticated task management application with team collaboration features, real-time updates, and advanced project tracking capabilities."
    },
    {
      title: "Weather Analytics",
      description: "An interactive weather dashboard with historical data visualization, location-based forecasts, and climate trend analysis."
    },
    {
      title: "Portfolio Tracker",
      description: "A financial portfolio management tool with real-time stock prices, performance analytics, and investment tracking features."
    },
    {
      title: "Learning Platform",
      description: "An interactive learning management system with progress tracking, quizzes, and personalized study recommendations."
    }
  ];

  const technologies: string[] = ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'MongoDB'];

  const socialLinks: SocialLink[] = [
    {
      href: "https://github.com/yourusername",
      label: "Follow on GitHub",
      className: "px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
    },
    {
      href: "https://linkedin.com/in/yourprofile",
      label: "Connect on LinkedIn",
      className: "px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition-colors font-medium"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <section className="text-center py-16">
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Code size={40} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            My App
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Something awesome is coming soon! This will be the home of my featured application.
          </p>
        </div>
      </section>

      {/* Coming Soon Card */}
      <section className="py-16">
        <div className="bg-white rounded-lg shadow-xl p-8 border-l-4 border-blue-600">
          <div className="flex items-center mb-6">
            <Wrench className="text-blue-600 mr-3" size={32} />
            <h2 className="text-2xl font-bold text-gray-900">Under Construction</h2>
          </div>
          <p className="text-gray-600 mb-6">
            I'm currently working on an exciting new application that will showcase my development skills. 
            This space will feature a fully functional app that demonstrates my expertise in modern web technologies.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">What to Expect</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Interactive user interface</li>
                <li>• Real-time functionality</li>
                <li>• Responsive design</li>
                <li>• Modern tech stack</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ideas Section */}
      <section className="py-16">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-8">
          <div className="flex items-center mb-6">
            <Lightbulb className="text-purple-600 mr-3" size={32} />
            <h2 className="text-2xl font-bold text-gray-900">App Ideas I'm Considering</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {appIdeas.map((idea, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="font-semibold text-gray-900 mb-2">{idea.title}</h3>
                <p className="text-gray-600">{idea.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stay Updated */}
      <section className="py-16 text-center">
        <div className="bg-blue-600 text-white rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-6">
            Want to be notified when my app launches? Follow my progress and get updates!
          </p>
          <div className="flex justify-center space-x-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={link.className}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyApp;