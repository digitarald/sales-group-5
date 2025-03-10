# Breakout Room Background Generator

A Next.js application that uses AI to generate background information for class breakout room scenarios, specifically for sales training exercises.

## Features

- AI-generated objections and background details for sales training scenarios
- Clean, responsive UI built with Tailwind CSS
- Integration with OpenRouter API for advanced AI capabilities
- Structured output format for consistent results

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- OpenRouter API key

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd breakout-room-generator
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory with your OpenRouter API key:
```
OPENROUTER_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Environment Variables

- `OPENROUTER_API_KEY`: Your OpenRouter API key
- `OPENROUTER_MODEL`: (Optional) The specific model to use (defaults to "anthropic/claude-3-opus:beta")

## Deployment

This application can be easily deployed to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fbreakout-room-generator)

Remember to set up the environment variables in your Vercel project settings.

## License

MIT 