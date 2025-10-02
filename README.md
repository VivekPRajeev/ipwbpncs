# React TypeScript Tailwind Project

A modern React application built with TypeScript and styled with Tailwind CSS.

## Features

- React 19
- TypeScript for type safety
- Tailwind CSS v3 for styling
- Vite for fast development and building
- ESLint for code quality
- Hot Module Replacement (HMR)
- Font Awesome icons integration
- Vitest for test cases
- RxDB + dexie for Local Database management

## Getting Started

### Prerequisites

Make sure you have Node.js (version 16 or higher) installed on your machine.

## Installation

The project can be set up either using Docker or by using npm both methods are explained below

### Using docker

    Deployment using Docker

### Development (with hot reload)

```bash
    npm run docker:dev
```

### Production (optimized build)

```bash
    npm run docker:prod
```

### Run tests

```bash
    npm run docker:test
```

---

1. Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

Build the application for production:

```bash
npm run build
```

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Linting

Run ESLint to check for code quality issues:

```bash
npm run lint
```

## Testing Guide

This project uses **Vitest** with **React Testing Library** for comprehensive testing.

### Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Run tests with UI (interactive)
npm run test:ui

# Run tests with coverage report
npm run test:coverage
```

## Project Structure

```
src/
├── components       # Reusable react components
├── constants        # constant files
├── db               # DB connection helper files
├── hooks            # custom react hooks
├── mocks            # Mockfiles for testing
├── utils            # reusable utility functions
├── App.tsx          # Main App component
├── fontawesome.ts   # Icons
├── main.tsx         # Application entry point
├── index.css        # Global styles with Tailwind directives
├── test/
│   ├── setup.ts     # Global test setup
│   └── utils.tsx    # Test utilities and helpers
```

## Technologies Used

- **React**: A JavaScript library for building user interfaces
- **TypeScript**: JavaScript with static type definitions
- **Tailwind CSS**: A utility-first CSS framework
- **Vite**: Next generation frontend tooling
- **ESLint**: Pluggable linting utility for JavaScript and TypeScript
- **Font Awesome**: The web's most popular icon set and toolkit
- **RxDB**: A fast, local-first, reactive Database for JavaScript Applications
- **Dexie**: A Minimalistic Wrapper for IndexedDB
- **Husky**: Ultra-fast modern native git hooks
- **Vitest**: Next Generation Testing Framework

## Customization

### Tailwind CSS

You can customize Tailwind CSS by editing the `tailwind.config.js` file. Add your custom colors, fonts, and other design tokens in the `theme.extend` section.

### TypeScript

TypeScript configuration can be found in `tsconfig.json`. Adjust compiler options as needed for your project requirements.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

# Known Issues

- when child comment is deleted ,count in parents comment list is not updated if the child comment does not have any children (because of soft delete)
- Scroll to bottom after adding comment does not focus on the latest comment
