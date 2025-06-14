# Remwaste Code Challenge

## Prerequisites

- [Bun package manager](https://bun.sh/) - Faster Alternative to Node.js with TypeScript support out of the box
- [Node.js runtime](https://nodejs.org) - You can use node.js instead of bun if you prefer
 
## Getting Started

1. Install dependencies:
```bash
bun install
```

2. Start the development server:
```bash
bun dev
```

## Project Structure

### Directory (./src)

- `app/`: Routes
  - `page`: Main page
  - `layout`: Main layout

- `components/`: Reusable React components
  - `BottomDrawer`: Bottom drawer for showing selected skips
  - `SkipCard`: Component for displaying a single skip

- `lib/`: Utilities
  - `services/`: Contains services for interacting with external APIs
  - `types`: TypeScript type definitions
  - `utils`: Utility functions

### Key Features

- TypeScript for strong typing
- Styling with TailwindCSS