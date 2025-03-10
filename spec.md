# Breakout Room Background Generator - Specification

## Overview
A single-page Next.js application that uses AI to generate background information for class breakout room scenarios. The application will specifically generate objections and background details for sales training scenarios.

## Tech Stack
- **Frontend Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **AI Integration**: OpenRouter API
- **State Management**: React Context API
- **Deployment**: Vercel

## Features

### Core Functionality
1. **AI-Generated Content**:
   - Generate 3 objections for a sales training scenario
   - Generate 3 background details for each objection
   - Present the information in a visually appealing, easy-to-parse UI

2. **User Interface**:
   - Clean, modern design with Tailwind CSS
   - Responsive layout that works on desktop and mobile devices
   - Visual separation between objections and their background details
   - Loading states while AI is generating content

3. **Interaction**:
   - Generate button to trigger AI content generation
   - Option to regenerate specific objections
   - Copy to clipboard functionality for each objection or the entire scenario

## Technical Implementation

### API Integration
- Use OpenRouter API to access advanced LLMs
- Implement structured output format to ensure consistent response formatting
- Handle API rate limiting and error states gracefully

### Data Structure
The AI will return data in the following JSON structure:
```json
{
  "objections": [
    {
      "objection": "String describing the objection",
      "background": [
        "Background detail 1",
        "Background detail 2",
        "Background detail 3"
      ]
    },
    // Two more objection objects with the same structure
  ]
}
```

### UI Components
1. **Header**:
   - Title
   - Brief description of the application

2. **Generation Controls**:
   - Generate button
   - Loading indicator

3. **Results Display**:
   - Card-based layout for each objection
   - Visual hierarchy to distinguish objections from background details
   - Copy buttons for individual sections

4. **Footer**:
   - Attribution
   - Links to source code (if public)

## User Flow
1. User lands on the page
2. User clicks "Generate" button
3. Loading state is displayed
4. AI-generated content appears in the UI
5. User can copy content or regenerate as needed

## OpenRouter Implementation
- Use the OpenRouter API to access models like Claude 3 Opus or GPT-4
- Structure the prompt to ensure consistent output formatting
- Implement JSON mode/structured output to get properly formatted responses

## Prompt Engineering
The core prompt will be based on the provided example, structured to ensure the AI returns properly formatted JSON:

```
Brainstorm 3 objections for this sales training scenario, not limited to current listed objections. Add 3 bullet points for each on specific private reasons that only the customer would know that the sales person has to reveal through objection handling.

Return the response as a JSON object with the following structure:
{
  "objections": [
    {
      "objection": "String describing the objection",
      "background": [
        "Background detail 1",
        "Background detail 2",
        "Background detail 3"
      ]
    },
    // Two more objection objects with the same structure
  ]
}

Scenario context:
[SCENARIO DESCRIPTION FROM USER INPUT]
```

## Development Phases
1. **Setup**: Initialize Next.js project with Tailwind CSS
2. **API Integration**: Set up OpenRouter API connection
3. **UI Development**: Create responsive UI components
4. **Integration**: Connect UI to API
5. **Testing & Refinement**: Test with various scenarios
6. **Deployment**: Deploy to Vercel

## Cursor Rules
- All components should follow the structure defined in this spec
- Use Tailwind CSS for all styling, no custom CSS files
- Implement proper error handling for API calls
- Ensure responsive design works on all screen sizes
- Follow Next.js best practices for API routes and component structure
- Use TypeScript for type safety
- Implement loading states for all asynchronous operations
- Ensure accessibility compliance (WCAG 2.1 AA)
- Document all components and functions
- Optimize for performance (minimize re-renders, use proper memoization) 