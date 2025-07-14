import React from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Github, Linkedin, Mail } from 'lucide-react';

interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'tools';
}

interface SocialLink {
  href: string;
  icon: React.JSX.Element;
  label: string;
  className: string;
}

const AboutMe = (): React.JSX.Element => {
  const skills: Skill[] = [
    // Frontend
    { name: 'React', category: 'frontend' },
    { name: 'JavaScript', category: 'frontend' },
    { name: 'TypeScript', category: 'frontend' },
    { name: 'HTML', category: 'frontend' },
    { name: 'CSS', category: 'frontend' },
    { name: 'Tailwind', category: 'frontend' },
    // Backend
    { name: 'Node.js', category: 'backend' },
    { name: 'Python', category: 'backend' },
    { name: 'Express', category: 'backend' },
    { name: 'MongoDB', category: 'backend' },
    { name: 'PostgreSQL', category: 'backend' },
    // Tools
    { name: 'Git', category: 'tools' },
    { name: 'Docker', category: 'tools' },
    { name: 'AWS', category: 'tools' },
    { name: 'Figma', category: 'tools' },
    { name: 'VS Code', category: 'tools' }
  ];

  const socialLinks: SocialLink[] = [
    {
      href: 'https://github.com/markdoucette',
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
      href: 'mailto:mark@example.com',
      icon: <Mail size={20} className="mr-2" />,
      label: 'Email',
      className: 'flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors'
    }
  ];

  const getSkillsByCategory = (category: Skill['category']): Skill[] => {
    return skills.filter(skill => skill.category === category);
  };

  const getSkillColorClass = (category: Skill['category']): string => {
    switch (category) {
      case 'frontend':
        return 'px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm';
      case 'backend':
        return 'px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm';
      case 'tools':
        return 'px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm';
      default:
        return 'px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <section className="text-center py-16">
        <div className="mb-8">
          <img
            src="/api/placeholder/200/200"
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white shadow-lg"
          />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Hi, I'm Mark Doucette
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            [Your Title/Role] passionate about [your interests/expertise]
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
                {link.icon}
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About Me</h2>
            <p className="text-gray-600 mb-4">
              Welcome to my portfolio! I'm a [your profession] with a passion for [your interests]. 
              I love creating [what you create] and solving [problems you solve].
            </p>
            <p className="text-gray-600 mb-4">
              With [X years] of experience in [your field], I've had the opportunity to work on 
              [types of projects] and collaborate with [types of people/teams].
            </p>
            <p className="text-gray-600">
              When I'm not [working/coding], you can find me [hobbies/interests]. 
              I believe in [your philosophy/values] and am always excited to take on new challenges.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Facts</h3>
            <ul className="space-y-2 text-gray-600">
              <li><strong>Location:</strong> [Your City, Country]</li>
              <li><strong>Experience:</strong> [X years]</li>
              <li><strong>Specialization:</strong> [Your specialty]</li>
              <li><strong>Education:</strong> [Your degree/school]</li>
              <li><strong>Languages:</strong> [Programming languages/spoken languages]</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 bg-gray-50 rounded-lg">
        <div className="px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Skills & Technologies</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Frontend</h3>
              <div className="flex flex-wrap gap-2">
                {getSkillsByCategory('frontend').map((skill) => (
                  <span key={skill.name} className={getSkillColorClass('frontend')}>
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Backend</h3>
              <div className="flex flex-wrap gap-2">
                {getSkillsByCategory('backend').map((skill) => (
                  <span key={skill.name} className={getSkillColorClass('backend')}>
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Tools</h3>
              <div className="flex flex-wrap gap-2">
                {getSkillsByCategory('tools').map((skill) => (
                  <span key={skill.name} className={getSkillColorClass('tools')}>
                    {skill.name}
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