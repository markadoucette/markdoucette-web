import { Github, Linkedin, Mail, FileText } from 'lucide-react';



interface SocialLink {
  href: string;
  icon: React.ReactElement;
  label: string;
  className: string;
}

const AboutMe = () => {
  

  const socialLinks: SocialLink[] = [
    {
      href: 'https://github.com/markadoucette',
      icon: <Github size={20} className="mr-2" />,
      label: 'GitHub',
      className: 'flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors'
    },
    {
      href: 'https://linkedin.com/in/markdoucette',
      icon: <Linkedin size={20} className="mr-2" />,
      label: 'LinkedIn',
      className: 'flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
    },
    {
      href: 'mailto:mark.a.doucette@gmail.com.com',
      icon: <Mail size={20} className="mr-2" />,
      label: 'Email',
      className: 'flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors'
    },
    {
      href: '/docs/Mark Doucette Dec 2024.pdf',
      icon: <FileText size={20} className="mr-2" />,
      label: 'Resume',
      className: 'flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors'
    }
  ];


  return (
    <div className="max-w-6xl mx-auto bg-transparent">
      {/* Hero Section */}

      <section className="text-center py-16 ">
        <div className="mb-8">
          <img
            src="/images/Mark Doucette.jpeg"
            alt="Mark Doucette"
            className="w-64 h-64 rounded-full mx-auto mb-6 border-4 border-slate-200 shadow-lg object-cover"
          />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Hi, I'm Mark Doucette
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto">
          Accomplished Data & AI leader who leverages intelligence and insights to shape business strategy and product development. 
          Built high-velocity AI platforms reducing model deployment time 10x while coaching engineering teams and aligning AI initiatives with business goals.
        </p>
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={link.className}
              >
                {link.icon}
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 ">
        <div className="bg-gradient-light rounded-xl shadow-lg p-8 mx-4">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-2 space-y-4">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Me</h2>
              <p className="text-gray-600 mb-4 text-left md:text-justify">
                A Denver native, I found my way to San Antonio in 2011 when I joined Rackspace, and this historic city has become home. My passion for building extends far beyond the digital realm—my wife and I have lovingly restored our 1910 craftsman home, preserving its century-old character while bringing it into the modern era. My latest creation is a unique workshop built from two shipping containers topped with a rooftop deck, where I spend countless hours tinkering and bringing ideas to life.
              </p>
              <p className="text-gray-600 mb-4 text-left md:text-justify">
                When I'm not solving data puzzles or working in my workshop, I'm spending time with my wife and our two energetic boys (4 and 3 years old). Life is a wonderful balance of family, building, and technical innovation.
              </p>
              <p className="text-gray-600 mb-4 text-left md:text-justify">
                I have over 18 years of experience in data and analytics, with expertise spanning sales and marketing, operations, product, and user experience. 
                I am a jack of all trades with a diverse background, and my passion is strategy through the use of data. 
                I enjoy working for smaller companies because of the ability to wear many hats to accomplish the goals at hand.
              </p>
              <p className="text-gray-600 mb-4 text-left md:text-justify">
                An ideal role for me would be one where I am able to use data and technology to solve problems and plan for the future. 
                With all of the companies I have worked for, those are two areas that always need attention.
              </p>
              <p className="text-gray-600 mb-4 text-left md:text-justify">
                On the personal side, I am an avid Bronco fan, have a passion for the outdoors, bikes, food, and good beer. 
                On the weekend you can probably find me riding my old-fashioned penny-farthing throughout downtown San Antonio.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-lg shadow-lg border-l-4 border-blue-600 text-left">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Facts</h3>
              <ul className="space-y-3">

                 <li className="grid grid-cols-[8px_1fr] gap-3 text-gray-600 items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  <span><strong>Location:</strong> San Antonio, TX (Denver native)</span>
                </li>
              
                <li className="grid grid-cols-[8px_1fr] gap-3 text-gray-600 items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2"></span>
                  <span><strong>Experience:</strong> 18+ years in data & analytics</span>
                </li>
                <li className="grid grid-cols-[8px_1fr] gap-3 text-gray-600 items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2"></span>
                  <span><strong>Education:</strong> MS Data Science (IU), BS International Business (CU)</span>
                </li>
                <li className="grid grid-cols-[8px_1fr] gap-3 text-gray-600 items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2"></span>
                  <span><strong>Specialization:</strong> AI/ML & Strategic Analytics</span>
                </li>
                <li className="grid grid-cols-[8px_1fr] gap-3 text-gray-600 items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2"></span>
                  <span><strong>Project:</strong> Restored 1910 craftsman home</span>
                </li>
                <li className="grid grid-cols-[8px_1fr] gap-3 text-gray-600 items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2"></span>
                  <span><strong>Workshop:</strong> Custom shipping container build</span>
                </li>
                <li className="grid grid-cols-[8px_1fr] gap-3 text-gray-600 items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2"></span>
                  <span><strong>Family:</strong> Father to two boys (4 & 3 years old)</span>
                </li>
                <li className="grid grid-cols-[8px_1fr] gap-3 text-gray-600 items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2"></span>
                  <span><strong>Fun Fact:</strong> Rides penny-farthing bike downtown</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

{/* Education & Certifications */}

     <section className="py-16 bg-gradient-light to-blue-50 rounded-xl shadow-lg p-8 mx-4">
        <div className="px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Education & Certifications</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Education */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-lg shadow-lg border-l-4 border-green-600">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Education</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">Master of Science - Data Science</h4>
                  <p className="text-green-600 font-medium">Indiana University</p>
                  <p className="text-gray-600 text-sm">Bloomington, IN</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Bachelor of Science - International Business & Marketing</h4>
                  <p className="text-green-600 font-medium">University of Colorado at Denver</p>
                  <p className="text-gray-600 text-sm">Denver, CO</p>
                </div>
              </div>
            </div>
            
            {/* Certifications */}
            <div className="bg-gradient-to-br from-blue-50 to-sky-100 p-6 rounded-lg shadow-lg border-l-4 border-blue-600">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Certifications</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">Executive Education General Management Certificate</h4>
                  <p className="text-blue-600 font-medium">University of Texas at Austin</p>
                  <p className="text-gray-600 text-sm">Austin, TX</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 ">
        <div className="px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Skills & Technologies</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Machine Learning & AI */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Machine Learning & AI</h3>
              <div className="flex flex-wrap gap-2">
                {['TensorFlow', 'PyTorch', 'MLFlow', 'Databricks', 'NLP', 'Neural Networks', 'LLMs', 'Random Forest', 'Decision Trees', 'Supervised Learning', 'Unsupervised Learning', 'K-Nearest Neighbors', 'SVM', 'AWS SageMaker'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Generative AI Platforms */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Generative AI Platforms</h3>
              <div className="flex flex-wrap gap-2">
                {['OpenAI', 'Anthropic Claude', 'LangChain', 'LlamaFlow', 'Relevant.ai', 'RAG', 'Vector Databases', 'Prompt Engineering', 'Fine-tuning'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Programming & Analytics */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Programming & Analytics</h3>
              <div className="flex flex-wrap gap-2">
                {['Python', 'SQL', 'R', 'LookML', 'Pandas', 'NumPy', 'SciPy', 'scikit-learn', 'Statistical Modeling', 'Natural Language Processing', 'Time Series Analysis', 'A/B Testing'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Data Visualization */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Visualization</h3>
              <div className="flex flex-wrap gap-2">
                {['Looker', 'Tableau', 'Power BI', 'QlikView', 'Matplotlib', 'ggplot2', 'Seaborn', 'Plotly', 'Bokeh'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Cloud & Data Engineering */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Cloud & Data Engineering</h3>
              <div className="flex flex-wrap gap-2">
                {['AWS', 'GCP', 'Snowflake', 'Databricks', 'S3', 'DBT', 'dbt Cloud', 'Fivetran', 'Stitch', 'ETL/ELT', 'CI/CD', 'Git'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Databases */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Databases</h3>
              <div className="flex flex-wrap gap-2">
                {['Snowflake', 'BigQuery', 'Redshift', 'PostgreSQL', 'MySQL', 'MSSQL', 'Azure SQL', 'NoSQL', 'Firebolt'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Web Development */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Web Development</h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Tailwind', 'Node.js', 'PHP'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Business & Marketing Tools */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Business & Marketing Tools</h3>
              <div className="flex flex-wrap gap-2">
                {['Salesforce', 'Adobe Marketing Cloud', 'Coremetrics', 'Salesnet', 'Data Mining', 'Segmentation', 'Financial Modeling', 'Risk Analytics', 'Customer Analytics', 'Marketing Mix Modeling', 'Churn Analysis'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Collaboration & Project Management */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Collaboration & Project Management</h3>
              <div className="flex flex-wrap gap-2">
                {['Jira', 'Confluence', 'Slack', 'Microsoft Teams', 'Trello', 'Agile', 'Scrum', 'Kanban'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Methodologies & Leadership */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Methodologies & Leadership</h3>
              <div className="flex flex-wrap gap-2">
                {['Deep Learning', 'Predictive Analytics', 'Classification', 'Regression', 'Data Governance', 'GDPR', 'PII', 'Data Lineage', 'Data Cataloging', 'MLOps', 'Team Management', 'Strategy Development', 'Project Management', 'Emotional Intelligence', 'Leadership Development'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      


    </div>
  );
};

export default AboutMe;