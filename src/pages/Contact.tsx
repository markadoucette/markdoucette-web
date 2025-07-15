import React from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

interface ContactInfo {
  icon: React.ReactElement;
  title: string;
  content: string;
  link: string | null;
}

interface SocialLink {
  icon: React.ReactElement;
  name: string;
  url: string;
  color: string;
}

const Contact = () => {
  const contactInfo: ContactInfo[] = [
    {
      icon: <Mail size={24} />,
      title: 'Email',
      content: 'mark.a.doucette@gmail.com',
      link: 'mailto:mark.a.doucette@gmail.com'
    },
    {
      icon: <Phone size={24} />,
      title: 'Phone',
      content: '210-284-5852',
      link: 'tel:+12102845852'
    },
    {
      icon: <MapPin size={24} />,
      title: 'Location',
      content: 'San Antonio, TX',
      link: null
    }
  ];

  const socialLinks: SocialLink[] = [
    {
      icon: <Github size={24} />,
      name: 'GitHub',
      url: 'https://github.com/markdoucette',
      color: 'text-gray-700 hover:text-gray-900'
    },
    {
      icon: <Linkedin size={24} />,
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/markdoucette',
      color: 'text-blue-600 hover:text-blue-700'
    },
    {
      icon: <Twitter size={24} />,
      name: 'Twitter',
      url: 'https://twitter.com/yourusername',
      color: 'text-blue-400 hover:text-blue-500'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header - White Background */}
      <section className="py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Get In Touch
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          I'm always interested in new opportunities, collaborations, and interesting projects. 
          Let's connect and discuss how we can work together!
        </p>
      </section>

      {/* Contact Information - Light Slate Background */}
      <section className="py-16 ">
        <div className="bg-gradient-light rounded-xl shadow-lg p-8 mx-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Contact Information</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {contactInfo.map((info, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                  {info.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{info.title}</h3>
                {info.link ? (
                  <a
                    href={info.link}
                    className="text-gray-600 hover:text-blue-600 transition-colors text-lg"
                  >
                    {info.content}
                  </a>
                ) : (
                  <p className="text-gray-600 text-lg">{info.content}</p>
                )}
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Connect With Me</h2>
            <div className="flex justify-center gap-8">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center p-6 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 ${social.color} group`}
                >
                  <div className="mb-3 transform group-hover:scale-110 transition-transform">
                    {social.icon}
                  </div>
                  <span className="font-medium">{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Current Status - White Background */}
      <section className="py-16 text-center">
        <div className="bg-gradient-to-br text-white from-blue-500 to-indigo-500 rounded-xl p-8 mx-4">
          <h2 className="text-2xl font-bold mb-4">Currently</h2>
          <p className="text-lg">
            Available for consulting opportunities and strategic Data & AI leadership roles. 
            Particularly interested in fintech, SaaS, and data-driven organizations.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Contact;