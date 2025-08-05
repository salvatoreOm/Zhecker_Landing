# Zhecker - AI-Powered Subjective Handwritten Answer Evaluation

A beautiful, modern landing page for Zhecker, an AI-powered educational software that evaluates subjective handwritten answers for educational institutions. Features dual theme support with a clean light theme and stunning blue/black neon dark theme, along with advanced scroll animations and interactive letter effects.

![Zhecker Landing Page](https://img.shields.io/badge/Status-Live-brightgreen)
![React](https://img.shields.io/badge/React-18.0.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0.0-38B2AC)

## ✨ Features

- **🎨 Dual Theme Support**: Clean light theme and stunning blue neon dark theme
- **📱 Responsive Design**: Mobile-first approach with seamless adaptation across devices  
- **🎭 Advanced Animations**: 
  - Right-to-left scroll animations that trigger repeatedly
  - Dramatic letter bounce animations across full screen
  - Smooth page transitions with Framer Motion
- **🔥 Interactive Elements**:
  - Logo and icon hover effects with themed glow
  - Subscription form with real-time validation
  - Staggered feature card animations
- **⚡ Performance Optimized**: Built with Vite for lightning-fast development and production builds
- **🛡️ Type Safety**: Full TypeScript implementation with end-to-end type safety

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Static type checking and enhanced developer experience
- **Tailwind CSS** - Utility-first CSS framework with custom theming
- **Framer Motion** - Smooth animations and page transitions
- **Wouter** - Lightweight client-side routing
- **shadcn/ui** - Modern component library built on Radix UI

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **TypeScript** - Server-side type safety

### Database & ORM
- **Drizzle ORM** - Type-safe ORM for PostgreSQL
- **PostgreSQL** - Production database (Neon Database)
- **In-memory storage** - Development fallback

### Development Tools
- **Vite** - Next-generation frontend build tool
- **ESBuild** - Fast JavaScript bundler for server code
- **React Hook Form** - Performant form handling
- **Zod** - Runtime type validation

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **Git** for cloning the repository

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/zhecker-landing-page.git
cd zhecker-landing-page
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration (Optional)

For production database features, create a `.env` file in the root directory:

```env
# Database Configuration (Optional - uses in-memory storage by default)
DATABASE_URL=your_postgresql_connection_string

# Development
NODE_ENV=development
```

**Note**: The project works out of the box with in-memory storage - no database setup required for development!

## 🚀 Running the Project

### Development Mode

Start the development server with hot reload:

```bash
npm run dev
```

The application will be available at:
- **Frontend & Backend**: http://localhost:5000

### Production Build

Build the project for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

### Production Preview

Preview the production build locally:

```bash
npm run preview
```

## 📁 Project Structure

```
zhecker-landing-page/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/           # Utility libraries
│   │   ├── pages/         # Page components
│   │   ├── App.tsx        # Main application component
│   │   └── main.tsx       # Application entry point
│   └── index.html         # HTML template
├── server/                # Backend Express application
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Data storage layer
│   └── vite.ts           # Vite integration
├── shared/               # Shared types and schemas
│   └── schema.ts         # Database schemas and types
├── attached_assets/      # Static assets and images
├── package.json          # Dependencies and scripts
├── tailwind.config.ts    # Tailwind CSS configuration
├── vite.config.ts        # Vite configuration
└── tsconfig.json         # TypeScript configuration
```

## 🎨 Customization

### Themes

The project supports dual themes out of the box:

- **Light Theme**: Clean, professional appearance
- **Dark Theme**: Blue neon cyberpunk aesthetic

Themes are configured in `client/src/index.css` with CSS custom properties.

### Colors

Main theme colors can be customized in `tailwind.config.ts`:

```typescript
colors: {
  'neon-blue': 'hsl(200, 100%, 50%)',
  'neon-cyan': 'hsl(180, 100%, 50%)',
  // Add your custom colors
}
```

### Animations

Scroll animations and letter effects can be modified in:
- `client/src/hooks/use-scroll-animation.tsx` - Page scroll animations
- `client/src/hooks/use-brick-animation.tsx` - Letter bounce effects
- `client/src/index.css` - CSS keyframe animations

## 📱 Mobile Responsiveness

The application is built with a mobile-first approach:

- Responsive breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- Touch-friendly interactions
- Optimized animations for mobile devices
- Adaptive typography and spacing

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

## 🌐 Deployment

### Replit Deployment (Recommended)

This project is optimized for Replit deployment:

1. Import the project to Replit
2. The project will automatically install dependencies
3. Click "Deploy" in the Replit interface
4. Your app will be live at `your-repl-name.replit.app`

### Manual Deployment

For other platforms:

1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting provider
3. Ensure your server serves the API routes and frontend files

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **Framer Motion** for smooth animations
- **Tailwind CSS** for the utility-first styling approach
- **Drizzle ORM** for type-safe database operations

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-username/zhecker-landing-page/issues) page
2. Create a new issue if your problem isn't already reported
3. Provide detailed information about your environment and the issue

---

**Made with ❤️ for educational technology**