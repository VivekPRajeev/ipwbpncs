# React TypeScript Tailwind Project

A modern React application built with TypeScript and styled with Tailwind CSS.

# About the Project

    This is an assignment project built using React for the  purpose of rendering a React component where users can add and remove text based comments.

    Features Include the following :
    - Uses local Database to have an offline first web application that loads a comments section
    - Ability to view all comments
    - Users can reply to  comments and comments of comments in a nested manner
    - Users  can add new comments to  the page
    - User can reply to another users comment
    - User can  delete their own  comment
    - If users deleted  comment does not have any replies , the  data will be removed completely from the  UI
    - If user deleted comment has replies that are  not deleted, the deleted comment is replaced by text informing the deleted status of the comment , preserving the remaining thread.
    - Added isSync to the tables so that local table can be synced to a backend Database for online connectivity (Feature to be implemented in the future)
    - User can preserve comments and intereactions after reload or relaunching the application
    - User comments are preserved between tabs
    - User  can switch  bettwen other users from the nav bar

## Assumptions And Considerations Made

1. For the current project a backend server has not been created yet so there are no REST API calls or Backend Databases to sync data for online use
2. User switch is currently not authenticated. For showcasing multi tab usability with different users, the users are currently not authenticated but can be freely switched in the UI from nav
3. Current User Data is stored in session storage : Since current user need only be preserved for the focused tab, I have decided to store user ID and user Name in the session storage for ease of access. In the event that there is no current data, the first user , Alice is choosen as the current user.
4. A set of users and Comments are preloaded from a seed in the event that the localDB is empty (In the case of initial load or is the DB is deleted) for the purpose of prefilling data for demo purposes. So when the project is loaded for the first time , there will be some preset comments and users.
5. Functionality to add/remove/update users is not yet implemented as it was deemed to be out of scope for this project
6. It is assumed that all comments fall under a product, and hence for demo purposes the product is had coded with a product ID. Ideally there would be an additional product table as well as users and comments table so that multiple project pages can be viewed with its own related comments,however, I have assmumed this to be out of scope for this requirement and have temporarily used a hardcoded product ID within the DB
7. All Data is currently soft-deleted by setting detetedAt to the time of deletion. This is done for a few reasons :
   1. Will allow future extention where users can undo a delete within a limited time
   2. Audit purposed it is essential to keep records for some time before permanently deleted
   3. To sync the deleted contents to the online DB easily for future.
8. Validations for the comment input have not been implemented at the moment

## Future Features that can be added

1. show the first reply for a comment and hide the rest untill user clicks on show all comments
2. Load only few comments initially and load more when user clicks on load more
3. sort comments by ascending and decending order - button to choose how to sort
4. view all of current users comments
5. sync local db with an online DB
6. Auth for users
7. Additional Pages for more products
8. custom User profile picture
9. Additional comment actions like upvoting , downvoating and sharing

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

Install dependencies:

```bash
npm install
```

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

### Without using docker

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
