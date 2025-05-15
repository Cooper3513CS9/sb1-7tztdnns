# NEStore Energy Advisor

An interactive web application that helps users calculate and visualize their potential savings with NEStore thermal battery solutions.

## Features

- Multi-step intake process for gathering user data
- Real-time calculations and recommendations
- Interactive comparisons with alternative solutions
- Detailed savings analysis including saldering impact
- Responsive design with modern UI components
- Built with React, TypeScript, and Tailwind CSS
- Drag-and-drop priority management
- Comprehensive energy savings calculations
- PDF report generation
- Multi-language support (Dutch)

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/         # React components
│   ├── common/        # Shared components (Card, InfoBox, etc.)
│   ├── inputs/        # Form input components
│   ├── layout/        # Layout components (Header, Footer)
│   └── steps/         # Step-specific components
├── config/            # Configuration files
│   ├── formOptions.ts # Form configuration and options
│   ├── productData.ts # Product specifications and comparison data
│   └── theme.ts       # Theme configuration
├── context/           # React context providers
│   └── UserDataContext.tsx # Global state management
└── main.tsx          # Application entry point
```

## Key Components

### Step Components
- `Step1Household`: Initial user data collection
- `Step2Shower`: Water usage patterns
- `Step3Housing`: Housing information
- `Step4HeatingSystem`: Current heating setup
- `Step5Solar`: Solar panel configuration
- `Step6Priorities`: Customizable user priorities
- `Step7Summary`: Data review
- `Step8InteractiveComparisonPage`: Product comparison
- `Step9SalderingImpactPage`: Financial impact analysis
- `Step10ContactFormPage`: User contact information
- `Step11ResultsPage`: Final recommendations

### Common Components
- `Card`: Main container component
- `InfoBox`: Information display
- `LoadingOverlay`: Loading state indicator
- `StepNavigation`: Step navigation controls
- `StepProgress`: Progress indicator

## Technologies Used

- React 18
- TypeScript
- Tailwind CSS
- Lucide React (icons)
- Hello Pangea DnD (drag and drop)
- Vite (build tool)

## Development Guidelines

### Code Style
- Use TypeScript for all new components
- Follow React hooks best practices
- Maintain consistent component structure
- Use Tailwind CSS for styling

### State Management
- Use UserDataContext for global state
- Implement local state for component-specific data
- Follow immutable state update patterns

## Environment Variables

No environment variables are required for basic development. The application uses default energy rates that can be customized through the UI.

## Testing

Run tests using:

```bash
npm run test
```

## Contributing

This is a private project. Please contact the project maintainers for contribution guidelines.

## Deployment

The application can be deployed to any static hosting service. Build the project using:

```bash
npm run build
```

The built files will be available in the `dist` directory.

## License

Proprietary - All rights reserved

## Support

For support or inquiries, please contact the development team.