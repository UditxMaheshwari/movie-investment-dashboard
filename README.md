# Movie Investment Dashboard

## Overview

The **Movie Investment Dashboard** is a React-based web application designed to empower users to manage and monitor their movie investment portfolios effectively. Leveraging modern UI components and data visualization libraries, the dashboard offers an intuitive interface for tracking investments, managing watchlists, viewing recent trades, and analyzing top-performing assets.

## Features

- **Portfolio Summary**
  - Displays total portfolio value.
  - Shows recent changes in portfolio value with visual indicators for gains or losses.

- **Watchlist Management**
  - List of movies available for investment.
  - Detailed information including price, percentage change, genre, and release date.
  - Interactive selection to view more details and perform investment actions.

- **Interactive Charts**
  - **Portfolio Distribution**: Donut chart illustrating the distribution of investments across different movie genres.
  - **Movie Performance**: 
    - Line chart displaying price trends over time.
    - Bar chart showcasing trading volume trends.

- **Investment Actions**
  - **Buy Shares**: Invest a specified amount in a selected movie.
  - **Sell Shares**: Liquidate a portion of the investment in a selected movie.
  - **Investment Slider**: Adjust the percentage of investment dynamically.

- **Real-time Alerts**
  - Notifications for successful investment actions.
  - Breaking news related to selected movies to keep users informed.

- **Additional Insights**
  - **Recent Trades**: Overview of the latest buy and sell transactions.
  - **Top Performers**: Highlights the best-performing movies based on investment gains.

- **Responsive Design**
  - Optimized for various screen sizes ensuring a seamless experience across devices.

## Technologies Used

- **React**: Front-end library for building user interfaces.
- **TypeScript**: Enhances JavaScript with static typing for better code quality and maintenance.
- **Recharts**: Library for creating responsive and customizable charts.
- **Shadcn UI**: Provides a set of accessible and customizable UI components.
- **Tailwind CSS & clsx**: Utility-first CSS framework combined with class name management for styling.
- **Lucide-React**: Icon library for including scalable vector icons.
- **Next.js**: Framework for server-side rendering and building React applications (implied from the project structure).

## Project Structure

```
src/
├── app/
│   └─��� movie-dash.tsx
├── components/
│   └── ui/
│       ├── card.tsx
│       ├── button.tsx
│       ├── input.tsx
│       ├── tabs.tsx
│       ├── slider.tsx
│       └── alert.tsx
├── styles/
│   └── globals.css
├── utils/
│   └── generateMovieData.ts
└── ...other directories
```

- **app/**: Contains the main application components.
- **components/ui/**: Reusable UI components built using Shadcn UI.
- **styles/**: Global and component-specific styles.
- **utils/**: Utility functions and helpers.

## Key Components

### Sidebar

- **Description**: A collapsible navigation panel providing access to different sections like Dashboard, Watchlist, Trends, Favorites, and Settings.
- **Features**:
  - Expand/Collapse functionality.
  - Iconography for visual navigation cues.
  - Responsive design for adaptability.

### Portfolio Summary

- **Description**: Displays the user's total investment value and recent changes.
- **Features**:
  - Real-time updates based on investment actions.
  - Visual indicators (e.g., arrows) to signify gains or losses.

### Watchlist

- **Description**: Lists movies that the user is interested in investing.
- **Features**:
  - Clickable items to view detailed information.
  - Displays essential details like price, change percentage, genre, and release date.

### Portfolio Distribution

- **Description**: Visual representation of investment distribution across different movie genres.
- **Features**:
  - Donut chart for an easy-to-understand breakdown.
  - Interactive legends for better data interpretation.

### Selected Movie Chart

- **Description**: Detailed performance charts for a selected movie.
- **Features**:
  - Tabs to switch between price and volume views.
  - Line and bar charts to visualize trends over time.

### Investment Controls

- **Description**: Interface for executing buy and sell actions.
- **Features**:
  - Investment slider to adjust the amount dynamically.
  - Buttons to confirm buy or sell actions with real-time portfolio updates.

### Right Sidebar

- **Description**: Complementary information and actions.
- **Features**:
  - Investment action card with slider and buttons.
  - Recent trades list to track transaction history.
  - Top performers list highlighting the best investment gains.

## Setup and Installation

### Prerequisites

- **Node.js** (version 14 or later)
- **npm** or **yarn** package manager

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/movie-investment-dashboard.git
   cd movie-investment-dashboard
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Add Shadcn UI Components**

   Since Shadcn UI components are being used, ensure they are properly set up. For example, to add the `Card` component:

   ```bash
   npx shadcn-ui@latest add card
   ```

4. **Run the Development Server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Access the Application**

   Open your browser and navigate to `http://localhost:3000` to view the dashboard.

## Usage

1. **Navigating the Dashboard**

   - Use the sidebar to access different sections like Dashboard, Watchlist, Trends, Favorites, and Settings.

2. **Managing Investments**

   - **Watchlist**: Click on any movie in the watchlist to view its details and performance charts.
   - **Investment Actions**: Use the slider to choose the percentage of investment and click on "Buy Shares" or "Sell Shares" to execute the action.

3. **Viewing Charts**

   - **Portfolio Distribution**: Understand how your investments are spread across various genres.
   - **Selected Movie Performance**: Switch between price and volume views to analyze trends.

4. **Monitoring Activities**

   - **Recent Trades**: Keep track of your latest buy and sell transactions.
   - **Top Performers**: Identify which movies are yielding the highest returns.

## Troubleshooting

### Common Issue

**Error**:
```
Module '"@/components/ui/card"' has no exported member 'CardTitle'.
```

**Solution**:
Ensure that the `CardTitle` component is correctly imported. If using Shadcn UI, you might need to add it separately:

```typescript
// src/app/movie-dash.tsx

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card-title"; // Ensure correct path
```

If `CardTitle` is part of the `card` module, verify its export in `card.tsx`. You can add or adjust the export as needed.

## Future Enhancements

- **User Authentication**
  - Implement secure login and registration systems.
  - Personalize user experiences based on profiles.

- **Backend Integration**
  - Connect to a database to persist user data and investment information.
  - Implement APIs for real-time data fetching and updates.

- **Advanced Analytics**
  - Incorporate machine learning models to predict investment trends.
  - Provide deeper insights into market dynamics.

- **Enhanced Notifications**
  - Real-time alerts for significant market changes or personal investment milestones.
  - Integration with email or SMS for off-platform notifications.

- **Mobile Optimization**
  - Develop a mobile-specific interface or dedicated app for better accessibility on smartphones and tablets.

## Conclusion

The **Movie Investment Dashboard** offers a comprehensive platform for users to manage their movie-related investments with ease and efficiency. By combining interactive UI components, real-time data visualization, and user-friendly controls, the dashboard ensures an engaging and informative investment experience.
