# React TypeScript Tailwind Project

A modern React application built with TypeScript and styled with Tailwind CSS.

## Features

- ⚡️ React 19 (latest version)
- 🏗️ TypeScript for type safety
- 🎨 Tailwind CSS v3 for styling
- 📦 Vite for fast development and building
- 🔧 ESLint for code quality
- 🚀 Hot Module Replacement (HMR)

## Getting Started

### Prerequisites

Make sure you have Node.js (version 16 or higher) installed on your machine.

### Installation

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

## Project Structure

```
src/
├── App.tsx          # Main App component
├── main.tsx         # Application entry point
└── index.css        # Global styles with Tailwind directives
```

## Technologies Used

- **React**: A JavaScript library for building user interfaces
- **TypeScript**: JavaScript with static type definitions
- **Tailwind CSS**: A utility-first CSS framework
- **Vite**: Next generation frontend tooling
- **ESLint**: Pluggable linting utility for JavaScript and TypeScript

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
