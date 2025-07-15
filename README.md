# Mark Doucette - Personal Portfolio

A modern, responsive portfolio website showcasing my journey as a Data & AI leader. Built with React, TypeScript, and Tailwind CSS, deployed on AWS Amplify.

🌐 **Live Site**: [https://main.dzysy2z9cmttf.amplifyapp.com/](https://main.dzysy2z9cmttf.amplifyapp.com/)

## About This Project

This portfolio was built to showcase my experience in data science, AI leadership, and technical expertise while demonstrating modern web development practices. The site features a clean, professional design with interactive components and responsive layouts.

### Why I Built This

As a data and AI professional with 18+ years of experience, I wanted to create a portfolio that would:

- Showcase my technical background and leadership experience
- Demonstrate my ability to work with modern web technologies
- Provide a platform to share my professional journey
- Serve as a learning resource for others building similar projects

## Tech Stack

### Frontend

- **React 18** - Component-based UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons
- **React Router** - Client-side routing

### Build & Development

- **Vite** - Fast build tool and dev server
- **ESLint** - Code linting
- **PostCSS** - CSS processing

### Deployment & Hosting

- **AWS Amplify** - Hosting and CI/CD
- **GitHub** - Version control and source
- **Custom Domain** - Professional URL

## Features

### 🎨 **Design & UX**

- Responsive design that works on all devices
- Alternating gradient backgrounds for visual depth
- Smooth animations and hover effects
- Professional color scheme with accessibility in mind

### 📱 **Interactive Components**

- **Career Journey Carousel** - Interactive company timeline
- **Skills Grid** - Comprehensive technical skills showcase
- **Professional Recommendations** - LinkedIn testimonials
- **Contact Integration** - Direct email and social links

### ⚡ **Performance**

- Fast loading with Vite optimization
- Efficient React components
- Minimal dependencies
- Global CDN delivery via AWS Amplify

## Project Structure

```
markdoucette-web/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   └── Navbar.tsx    # Navigation component
│   ├── pages/            # Page components
│   │   ├── AboutMe.tsx   # About page with skills & background
│   │   ├── Experience.tsx # Interactive career timeline
│   │   ├── Contact.tsx   # Contact information
│   │   └── MyApp.tsx     # App ideas showcase
│   ├── App.tsx           # Main app component
│   ├── index.css         # Global styles & Tailwind
│   └── main.tsx          # App entry point
├── tailwind.config.js    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

## Key Implementation Details

### Custom Gradient System

Created a reusable gradient system in Tailwind config for consistent theming:

```javascript
// tailwind.config.js
plugins: [
  function ({ addUtilities }) {
    const newUtilities = {
      ".bg-gradient-light": {
        background: "linear-gradient(to right, white, #f9fafb)",
      },
      // Additional custom gradients...
    };
    addUtilities(newUtilities);
  },
];
```

### Interactive Career Timeline

Built a custom carousel component with:

- Mouse drag functionality
- Company selection highlighting
- Detailed accomplishments display
- Responsive navigation

### Type-Safe Development

Comprehensive TypeScript interfaces for:

- Company experience data
- Social links and contact info
- Skills categorization
- Component props

## Getting Started

### Prerequisites

- Node.js 20+ (required for dependencies)
- npm or yarn package manager
- Git for version control

### Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/markadoucette/markdoucette-web.git
   cd markdoucette-web
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment Process

This project uses AWS Amplify for hosting with automatic deployments:

### Initial Setup

1. Push code to GitHub repository
2. Connect repository to AWS Amplify
3. Configure build settings for React/Vite
4. Set Node.js version to 20+ via environment variables

### Continuous Deployment

- Automatic builds triggered on every push to `main` branch
- Build process: `npm ci` → `npm run build` → deploy to CDN
- Typical deployment time: 3-5 minutes

### Custom Domain (Optional)

AWS Amplify supports custom domains with automatic SSL certificates.

## Lessons Learned

### TypeScript Configuration

- Encountered build issues with modern dependencies requiring Node.js 20+
- Solved TypeScript project reference conflicts during deployment
- Importance of cleaning unused imports for production builds

### Responsive Design

- Mobile-first approach with Tailwind breakpoints
- Careful consideration of component sizing across devices
- Balance between visual appeal and readability

### Performance Optimization

- Minimized bundle size by removing unused dependencies
- Efficient component structure to avoid unnecessary re-renders
- Strategic use of images and icons

## Contributing

While this is a personal portfolio, I welcome feedback and suggestions! Feel free to:

- Open issues for bugs or suggestions
- Submit pull requests for improvements
- Use this as inspiration for your own portfolio

## Contact

**Mark Doucette**

- 📧 Email: mark.a.doucette@gmail.com
- 💼 LinkedIn: [linkedin.com/in/markdoucette](https://linkedin.com/in/markdoucette)
- 🐙 GitHub: [github.com/markadoucette](https://github.com/markadoucette)

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ in San Antonio, TX**
