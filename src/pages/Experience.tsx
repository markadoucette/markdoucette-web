import { Download, Calendar, MapPin, ExternalLink } from 'lucide-react';

interface Experience {
  title: string;
  company: string;
  location: string;
  duration: string;
  description: string[];
  technologies: string[];
}

interface Education {
  degree: string;
  school: string;
  location: string;
  duration: string;
  details: string;
}

interface Project {
  name: string;
  description: string;
  technologies: string[];
  link: string;
}

const Experience = (): React.JSX.Element => {
  const handleDownloadResume = (): void => {
    // Replace with your actual resume file path
    const resumeUrl = '/path-to-your-resume.pdf';
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Your-Name-Resume.pdf';
    link.click();
  };

  const experiences: Experience[] = [
    {
      title: "Senior Frontend Developer",
      company: "Tech Company Inc.",
      location: "New York, NY",
      duration: "2022 - Present",
      description: [
        "Led development of responsive web applications using React and TypeScript",
        "Collaborated with design team to implement pixel-perfect UI components",
        "Mentored junior developers and established coding best practices",
        "Improved application performance by 40% through optimization techniques"
      ],
      technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js"]
    },
    {
      title: "Frontend Developer",
      company: "Digital Solutions LLC",
      location: "Remote",
      duration: "2020 - 2022",
      description: [
        "Developed and maintained multiple client-facing web applications",
        "Implemented responsive designs and ensured cross-browser compatibility",
        "Worked closely with backend developers to integrate APIs",
        "Participated in agile development process and code reviews"
      ],
      technologies: ["JavaScript", "Vue.js", "SCSS", "Git"]
    },
    {
      title: "Junior Web Developer",
      company: "StartupXYZ",
      location: "San Francisco, CA",
      duration: "2019 - 2020",
      description: [
        "Built interactive user interfaces using modern JavaScript frameworks",
        "Collaborated with UX/UI designers to create engaging user experiences",
        "Implemented testing strategies and maintained code quality",
        "Contributed to the company's design system and component library"
      ],
      technologies: ["HTML", "CSS", "JavaScript", "React"]
    }
  ];

  const education: Education[] = [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "University of Technology",
      location: "Boston, MA",
      duration: "2015 - 2019",
      details: "Relevant coursework: Data Structures, Algorithms, Web Development, Database Systems"
    }
  ];

  const projects: Project[] = [
    {
      name: "E-commerce Platform",
      description: "Full-stack e-commerce solution with React frontend and Node.js backend",
      technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
      link: "https://github.com/yourusername/ecommerce-platform"
    },
    {
      name: "Task Management App",
      description: "Collaborative task management tool with real-time updates",
      technologies: ["Vue.js", "Firebase", "Tailwind CSS"],
      link: "https://github.com/yourusername/task-manager"
    },
    {
      name: "Weather Dashboard",
      description: "Responsive weather application with location-based forecasts",
      technologies: ["JavaScript", "OpenWeather API", "Chart.js"],
      link: "https://github.com/yourusername/weather-dashboard"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header with Download Button */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Experience</h1>
          <p className="text-gray-600">My professional journey and background</p>
        </div>
        <button
          onClick={handleDownloadResume}
          className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
          aria-label="Download resume"
        >
          <Download size={20} className="mr-2" />
          Download Resume
        </button>
      </div>

      {/* Professional Experience */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Calendar className="mr-2 text-blue-600" size={24} />
          Professional Experience
        </h2>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{exp.title}</h3>
                  <p className="text-lg text-blue-600 font-medium">{exp.company}</p>
                </div>
                <div className="text-right mt-2 md:mt-0">
                  <p className="text-gray-600 flex items-center md:justify-end">
                    <Calendar size={16} className="mr-1" />
                    {exp.duration}
                  </p>
                  <p className="text-gray-600 flex items-center md:justify-end">
                    <MapPin size={16} className="mr-1" />
                    {exp.location}
                  </p>
                </div>
              </div>
              <ul className="space-y-2 mb-4">
                {exp.description.map((item, idx) => (
                  <li key={idx} className="text-gray-700 flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech, idx) => (
                  <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Education</h2>
        <div className="space-y-6">
          {education.map((edu, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{edu.degree}</h3>
                  <p className="text-lg text-green-600 font-medium">{edu.school}</p>
                </div>
                <div className="text-right mt-2 md:mt-0">
                  <p className="text-gray-600 flex items-center md:justify-end">
                    <Calendar size={16} className="mr-1" />
                    {edu.duration}
                  </p>
                  <p className="text-gray-600 flex items-center md:justify-end">
                    <MapPin size={16} className="mr-1" />
                    {edu.location}
                  </p>
                </div>
              </div>
              <p className="text-gray-700">{edu.details}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-600">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-800 transition-colors"
                  aria-label={`View ${project.name} project`}
                >
                  <ExternalLink size={20} />
                </a>
              </div>
              <p className="text-gray-700 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Experience;