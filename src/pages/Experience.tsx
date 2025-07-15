import React, { useState, useRef } from 'react';
import { Download, Calendar, ChevronLeft, ChevronRight, Linkedin } from 'lucide-react';

interface CompanyAccomplishment {
  category: 'Business Impact' | 'AI/ML Solutions' | 'Data Strategy' | 'Client Success';
  description: string;
  metrics?: string[];
}

interface CompanyExperience {
  company: string;
  logoUrl: string;
  tagline: string;
  period: string;
  title: string;
  accomplishments: CompanyAccomplishment[];
  technologies: string[];
}

interface Testimonial {
  content: string;
  author: string;
  title: string;
  company: string;
  linkedinUrl?: string;
  date?: string;
  imageUrl?: string;
}

interface CarouselProps {
  companies: CompanyExperience[];
  selectedCompany: CompanyExperience | null;
  onSelectCompany: (company: CompanyExperience) => void;
}

const CompanyCarousel: React.FC<CarouselProps> = ({
  companies,
  selectedCompany,
  onSelectCompany
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const scrollTo = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const cardWidth = 280;
      const currentScroll = carouselRef.current.scrollLeft;
      const newPosition = direction === 'left' 
        ? currentScroll - cardWidth
        : currentScroll + cardWidth;
      
      carouselRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current!.offsetLeft);
    setScrollLeft(carouselRef.current!.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current!.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current!.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="relative">
      {/* Left Navigation Button */}
      <button
        onClick={() => scrollTo('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-50
          p-3 rounded-full bg-white hover:bg-gray-50 shadow-lg border border-gray-200
          transition-all duration-300 transform hover:scale-110
          focus:outline-none focus:ring-2 focus:ring-blue-500"
        style={{ marginLeft: '8px' }}
      >
        <ChevronLeft className="text-gray-700 w-6 h-6" />
      </button>

      {/* Carousel Container */}
      <div 
        ref={carouselRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide py-4 px-16
          cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {companies.map((company, index) => (
          <div
            key={index}
            className={`flex-shrink-0 w-64 transition-all duration-300
              ${selectedCompany?.company === company.company
                ? 'scale-105 shadow-xl z-10'
                : 'opacity-50 hover:opacity-75 scale-95'
              }`}
            onClick={() => onSelectCompany(company)}
          >
            <div className={`h-48 rounded-lg p-6 cursor-pointer transition-all duration-300
              hover:transform hover:translate-y-[-4px] hover:shadow-lg
              active:transform active:translate-y-[-2px] active:shadow-md
              border-2 flex flex-col justify-between ${selectedCompany?.company === company.company
                ? 'bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-500 shadow-lg'
                : 'bg-white border-gray-200'
              }`}>
              
              {/* Company Logo */}
              <div className="h-16 bg-white rounded-lg p-2 mb-3 
                flex items-center justify-center border border-gray-100 flex-shrink-0">
                <img
                  src={company.logoUrl}
                  alt={company.company}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Company Info - Flexible content area */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm leading-tight">
                    {company.company}
                  </h3>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                    {company.tagline}
                  </p>
                </div>
                <p className="text-xs text-blue-600 font-medium mt-auto">
                  {company.period}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Navigation Button */}
      <button
        onClick={() => scrollTo('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-50
          p-3 rounded-full bg-white hover:bg-gray-50 shadow-lg border border-gray-200
          transition-all duration-300 transform hover:scale-110
          focus:outline-none focus:ring-2 focus:ring-blue-500"
        style={{ marginRight: '8px' }}
      >
        <ChevronRight className="text-gray-700 w-6 h-6" />
      </button>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {companies.map((company, index) => (
          <button
            key={index}
            onClick={() => onSelectCompany(company)}
            className={`transition-all duration-300 rounded-full
              ${selectedCompany?.company === company.company
                ? 'w-8 h-2 bg-blue-600'
                : 'w-2 h-2 bg-gray-400 hover:bg-blue-400'
              }`}
            aria-label={`Select ${company.company}`}
          />
        ))}
      </div>
    </div>
  );
};

const AccomplishmentsDisplay: React.FC<{ company: CompanyExperience }> = ({ company }) => {
  return (
    <div className="mt-12">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{company.title}</h3>
        <p className="text-lg text-blue-600 font-medium">{company.company} • {company.period}</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {company.accomplishments.map((accomplishment, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
            <div className="flex items-center mb-4">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-2" />
              <h4 className="font-semibold text-gray-900">{accomplishment.category}</h4>
            </div>
            <p className="text-gray-600 mb-4">{accomplishment.description}</p>
            {accomplishment.metrics && (
              <ul className="space-y-2">
                {accomplishment.metrics.map((metric, metricIndex) => (
                  <li key={metricIndex} className="text-sm text-blue-600">
                    • {metric}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-600 mb-2">Technologies</h4>
        <div className="flex flex-wrap gap-2">
          {company.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 rounded-full text-sm text-blue-600"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Experience = () => {
  const handleDownloadResume = (): void => {
    const resumeUrl = '/docs/Mark Doucette Dec 2024.pdf';
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Mark-Doucette-Resume.pdf';
    link.click();
  };

  const companyExperiences: CompanyExperience[] = [
    {
      company: "nCino",
      logoUrl: "/logos/ncino_inc__logo.jpeg",
      tagline: "Enterprise AI Solutions for Financial Services",
      period: "Dec 2022 - July 2024",
      title: "Senior Manager, Engineering - Data & AI",
      accomplishments: [
        {
          category: "Business Impact",
          description: "Driving Revenue Through AI Innovation",
          metrics: [
            "Generated $900K annual revenue from AI solutions",
            "Reduced ML deployment costs by 90%",
            "Streamlined operations across global teams"
          ]
        },
        {
          category: "AI/ML Solutions",
          description: "Enterprise-Scale AI Implementation",
          metrics: [
            "Built generative AI platform for financial institutions",
            "Developed automated ML model deployment pipeline",
            "Created predictive analytics frameworks"
          ]
        },
        {
          category: "Data Strategy",
          description: "Scalable Data Architecture",
          metrics: [
            "Designed enterprise-wide AI/ML infrastructure",
            "Implemented robust data preprocessing systems",
            "Built production-grade benchmarking analytics"
          ]
        },
        {
          category: "Client Success",
          description: "Strategic Leadership & Delivery",
          metrics: [
            "Led global AI initiatives with C-suite alignment",
            "Managed cross-functional team of 15 engineers",
            "Delivered solutions for multiple business units"
          ]
        }
      ],
      technologies: ["AWS SageMaker", "Databricks", "MLFlow", "LLMs", "Neural Networks"]
    },
    {
      company: "Bytecode IO",
      logoUrl: "/logos/bytecode_io_logo.jpeg",
      tagline: "Data & Analytics Consulting Excellence",
      period: "Jan 2020 - Dec 2022",
      title: "Senior Data & Analytics Consultant Manager",
      accomplishments: [
        {
          category: "Business Impact",
          description: "Revenue Growth & Cost Optimization",
          metrics: [
            "Drove $1.2M revenue through consulting projects",
            "Scaled consulting team from 20 to 65 members",
            "Reduced client reporting costs by 40%"
          ]
        },
        {
          category: "AI/ML Solutions",
          description: "Custom Analytics Solutions",
          metrics: [
            "Built predictive analytics systems for Fortune 100 clients",
            "Developed streaming analytics solutions",
            "Implemented automated data quality frameworks"
          ]
        },
        {
          category: "Data Strategy",
          description: "Enterprise Data Architecture",
          metrics: [
            "Led major data governance initiatives",
            "Designed cloud migration strategies",
            "Built scalable BI infrastructures"
          ]
        },
        {
          category: "Client Success",
          description: "Project Leadership & Delivery",
          metrics: [
            "Managed 80+ enterprise-level projects",
            "Led team of 18 senior consultants",
            "Delivered solutions for Electronic Arts and other major clients"
          ]
        }
      ],
      technologies: ["AWS", "GCP", "Snowflake", "Looker", "Python", "SQL"]
    },
    {
      company: "USAA",
      logoUrl: "/logos/usaa_logo.jpeg",
      tagline: "Enterprise Risk Analytics Innovation",
      period: "May 2019 - Jan 2020",
      title: "Senior Data Consultant",
      accomplishments: [
        {
          category: "Business Impact",
          description: "Risk Management & Efficiency",
          metrics: [
            "Automated tracking for 2M+ vulnerabilities",
            "Reduced assessment time by 60%",
            "Streamlined security patch management"
          ]
        },
        {
          category: "AI/ML Solutions",
          description: "Automated Intelligence Systems",
          metrics: [
            "Built predictive risk assessment models",
            "Developed automated tracking algorithms",
            "Created real-time alert systems"
          ]
        },
        {
          category: "Data Strategy",
          description: "Enterprise Reporting Solutions",
          metrics: [
            "Designed executive analytics dashboards",
            "Implemented cross-platform data integration",
            "Created automated reporting frameworks"
          ]
        },
        {
          category: "Client Success",
          description: "Strategic Implementation",
          metrics: [
            "Delivered insights to executive leadership",
            "Improved technology upgrade planning",
            "Enhanced security communication systems"
          ]
        }
      ],
      technologies: ["Python", "SQL", "Tableau", "Risk Analytics"]
    },
    {
      company: "Earth Class Mail",
      logoUrl: "/logos/earth_class_mail_logo.jpeg",
      tagline: "SaaS Analytics Transformation",
      period: "Oct 2018 - Apr 2019",
      title: "Data and Analytics Director",
      accomplishments: [
        {
          category: "Business Impact",
          description: "Operational Excellence",
          metrics: [
            "Reduced reporting time from 4 days to 2 hours",
            "Improved ROI across multiple brands",
            "Optimized forecasting for 15,000 customers"
          ]
        },
        {
          category: "AI/ML Solutions",
          description: "Predictive Analytics",
          metrics: [
            "Built advanced forecasting models",
            "Implemented customer behavior analytics",
            "Developed automated reporting systems"
          ]
        },
        {
          category: "Data Strategy",
          description: "SaaS Analytics Framework",
          metrics: [
            "Aligned analytics with SaaS metrics",
            "Created executive dashboards",
            "Implemented multi-brand tracking"
          ]
        },
        {
          category: "Client Success",
          description: "Executive Partnership",
          metrics: [
            "Partnered directly with CEO",
            "Led cross-functional analytics initiatives",
            "Delivered actionable business insights"
          ]
        }
      ],
      technologies: ["SaaS Analytics", "Business Intelligence", "Forecasting"]
    },
    {
      company: "Rackspace",
      logoUrl: "/logos/rackspace_technology_logo.jpeg",
      tagline: "Data Science & Analytics Leadership",
      period: "May 2011 - Oct 2018",
      title: "Senior Data Scientist",
      accomplishments: [
        {
          category: "Business Impact",
          description: "Revenue & Efficiency Gains",
          metrics: [
            "Increased sales by 5% through ML recommendations",
            "Spearheaded automation delivering $85K/5-year savings",
            "Reduced customer churn significantly"
          ]
        },
        {
          category: "AI/ML Solutions",
          description: "Advanced ML Implementation",
          metrics: [
            "Built product recommendation system",
            "Developed customer retention prediction model",
            "Created real-time usage analytics"
          ]
        },
        {
          category: "Data Strategy",
          description: "Enterprise Data Solutions",
          metrics: [
            "Built Cloud Sales data warehouse",
            "Designed real-time tracking systems",
            "Implemented predictive forecasting"
          ]
        },
        {
          category: "Client Success",
          description: "Strategic Leadership",
          metrics: [
            "Led data science initiatives",
            "Built and managed data teams",
            "Partnered with Bain for market insights"
          ]
        }
      ],
      technologies: ["Machine Learning", "Random Forest", "Cloud Computing", "Data Warehousing", "QlikView"]
    }
  ];

  const [selectedCompany, setSelectedCompany] = useState<CompanyExperience | null>(
    companyExperiences[0]
  );

  const testimonials: Testimonial[] = [
    {
      content: `Mark and I were peers at ncino managing platform teams for AI and data respectively. This was early days of AI at ncino and Mark was leading/managing the teams that were building out the infrastructure for AI and ML. His meticulous approach, prior experience with consulting and data science helped us develop a world class infrastructure AI/ML platform. In Mark, the team also benefited with a very hands on engineer who loved to build tools and utilities to help out with projects and also a great mentor for junior engineers`,
      author: "Nithin RJ",
      title: "Data & AI Engineering",
      company: "nCino",
      linkedinUrl: "https://www.linkedin.com/in/nithinrj/",
      date: "September 2, 2024",
      imageUrl: "/images/nithin.jpeg"
    },
    {
      content: `I had the pleasure of working with Mark while he served as a Senior Manager of AI Platform at nCino, where he reported directly to me. Mark consistently demonstrated an ability to lead and manage complex AI initiatives with a clear vision and strategic approach.

One of Mark's most impactful contributions was his implementation of the Entrepreneurial Operating System (EOS) within my leadership team. His deep understanding of this management framework not only helped streamline our processes but also dramatically improved our organization's focus and output. Thanks to Mark's efforts, our team became more focused, organized, and our decision-making became significantly more efficient and impactful.

I highly recommend Mark for any future leadership roles, and I would be happy to work with him again.`,
      author: "Justin Norwood",
      title: "Chief Risk Officer",
      company: "Casca",
      linkedinUrl: "https://www.linkedin.com/in/justinnorwood/",
      date: "August 24, 2024",
      imageUrl: "/images/justin.jpeg"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header with Download Button  */}
      <section className="py-16">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Professional Experience</h1>
            <p className="text-gray-600">My journey in data science, AI, and technology leadership</p>
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
      </section>

      {/* Company Experience Section  */}
      <section className="py-16 ">
        <div className="bg-gradient-light rounded-xl shadow-lg p-8 mx-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Calendar className="mr-2 text-blue-600" size={24} />
              Career Journey
            </h2>
            <a 
              href="#recommendations" 
              className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
            >
              View Recommendations
            </a>
          </div>

          {/* Company Carousel */}
          <CompanyCarousel
            companies={companyExperiences}
            selectedCompany={selectedCompany}
            onSelectCompany={setSelectedCompany}
          />

          {/* Accomplishments Display */}
          {selectedCompany && <AccomplishmentsDisplay company={selectedCompany} />}
        </div>
      </section>

      {/* Professional Recommendations Section - White Background */}
      <section id="recommendations" className="py-16">
        <div className="px-8">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">
            Professional Recommendations
          </h2>
          <div className="space-y-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center">
                    {/* Profile Image */}
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border border-gray-200">
                      {testimonial.imageUrl ? (
                        <img 
                          src={testimonial.imageUrl} 
                          alt={testimonial.author}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-xl font-bold text-blue-600">
                            {testimonial.author.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.author}</p>
                      <p className="text-gray-600 text-sm">{testimonial.title}</p>
                      <p className="text-gray-600 text-sm">{testimonial.company}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {testimonial.linkedinUrl && (
                      <a
                        href={testimonial.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 inline-flex items-center mb-2"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {testimonial.date && (
                      <p className="text-gray-600 text-sm">{testimonial.date}</p>
                    )}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6">
                  <p className="text-gray-700 italic leading-relaxed">
                    "{testimonial.content}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Experience;