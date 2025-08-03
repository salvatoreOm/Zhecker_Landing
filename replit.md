# Overview

This is a modern full-stack web application built with React and Express.js - a beautiful landing page for Zhecker, an AI-powered subjective answer evaluation software for educational institutions. The application features dual theme support (clean light theme and blue/black neon dark theme), advanced scroll animations with letter particle effects, and a subscription form for institutions. It uses TypeScript throughout the stack, implements a clean UI with shadcn/ui components, includes comprehensive README documentation, and features dramatic letter bounce animations that respond to scroll direction.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development and building
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming and dark mode support
- **State Management**: TanStack Query (React Query) for server state management
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Animations**: Framer Motion for page animations and scroll-triggered effects

## Backend Architecture
- **Runtime**: Node.js with Express.js server framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API endpoints with proper error handling and logging
- **Data Storage**: In-memory storage implementation with interface for future database integration
- **Validation**: Zod schemas for runtime type validation shared between client and server
- **Development**: Vite integration for hot module replacement in development

## Database Design
- **ORM**: Drizzle ORM configured for PostgreSQL with type-safe schema definitions
- **Schema**: Includes users table for authentication and subscriptions table for institution registrations
- **Migrations**: Drizzle Kit for database migrations management
- **Connection**: Configured for Neon Database serverless PostgreSQL

## Authentication & Security
- **Session Management**: Connect-pg-simple for PostgreSQL session storage (configured but not actively used)
- **Input Validation**: Comprehensive Zod schemas for all user inputs
- **Type Safety**: End-to-end TypeScript for compile-time error prevention

## Development Workflow
- **Build System**: Vite for frontend bundling and esbuild for server compilation
- **Development Server**: Hot reload for both client and server code
- **Code Quality**: TypeScript strict mode enabled with comprehensive type checking
- **Environment**: Replit-optimized with development banner and error overlay

# External Dependencies

## UI and Styling
- **Radix UI**: Comprehensive collection of accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework with PostCSS processing
- **Lucide React**: Icon library for consistent iconography
- **Framer Motion**: Animation library for smooth transitions and interactions

## Data and Forms
- **TanStack Query**: Server state management with caching and synchronization
- **React Hook Form**: Performant form handling with minimal re-renders
- **Zod**: Runtime type validation and schema definition
- **Date-fns**: Date utility library for formatting and manipulation

## Database and Backend
- **Drizzle ORM**: Type-safe ORM for PostgreSQL with schema-first approach
- **Neon Database**: Serverless PostgreSQL database platform
- **Express.js**: Web application framework for Node.js

## Development Tools
- **Vite**: Frontend build tool and development server
- **esbuild**: Fast JavaScript bundler for server-side code
- **TypeScript**: Static type checking and enhanced developer experience
- **Replit Plugins**: Development environment integration and error handling