# Wedding Invitation - Anudas R & Sikhila K

A beautiful, premium wedding invitation website built with React and TypeScript.

## Wedding Details

- **Groom:** Mr. Anudas R
- **Bride:** Mrs. Sikhila K
- **Wedding Ceremony:** 10 February 2027 at Guruvayoor Temple, Guruvayoor, Kerala, India
- **Wedding Reception:** 14 February 2027 at Krishnasree Auditorium, Para, Elappully, Palakkad, Kerala, India

## Technology Stack

- React 18.3.1
- TypeScript
- Vite 5.4.2
- Lucide React (icons)

## Features

- **Mobile-First Responsive Design:** Optimized for all screen sizes from 320px to 1440px
- **Elegant Design:** Premium Indian wedding aesthetics with ivory, cream, sage green, and antique gold color palette
- **Countdown Timer:** Real-time countdown to the wedding ceremony (IST timezone)
- **Google Maps Integration:** Functional "Get Directions" buttons for both venues
- **Smooth Animations:** Subtle fade-in animations with `prefers-reduced-motion` support
- **Accessible:** Semantic HTML, keyboard navigation, and proper contrast ratios
- **Performance Optimized:** Lightweight, fast-loading, and no unnecessary dependencies

## Project Structure

```
wedding-invitation/
├── src/
│   ├── components/
│   │   ├── WeddingHero.tsx          # Opening invitation screen
│   │   ├── CoupleSection.tsx        # Couple names display
│   │   ├── InvitationMessage.tsx    # Invitation message
│   │   ├── WeddingEvent.tsx         # Reusable event card component
│   │   ├── CountdownTimer.tsx       # Countdown timer with IST timezone
│   │   ├── EventTimeline.tsx        # Timeline of wedding events
│   │   └── WeddingFooter.tsx        # Closing footer section
│   ├── weddingConfig.ts             # Centralized wedding configuration
│   ├── App.tsx                      # Main application component
│   ├── main.tsx                     # Application entry point
│   └── index.css                    # Global styles and design tokens
├── index.html                       # HTML template
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
├── vite.config.ts                   # Vite configuration
└── README.md                        # This file
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd wedding-invitation
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:
```bash
npm run dev
```

The website will be available at `http://localhost:5173`

### Production Build

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Configuration

The wedding details are centralized in `src/weddingConfig.ts`. You can easily update:

- Couple names and titles
- Event dates, venues, and locations
- Countdown target time (currently set to 10 February 2027 at 9:00 AM IST)
- Invitation and closing messages
- Google Maps URLs

**Note:** The countdown time is configurable. Update the `countdownTarget` in `weddingConfig.ts` when the exact ceremony time is known.

## Design System

### Color Palette

- **Ivory (#FFFEF7):** Main background
- **Cream (#FDF8F0):** Secondary background
- **Sage Green (#7A8B6E):** Accent color
- **Forest Green (#2D4A3E):** Dark accent and footer
- **Antique Gold (#C9A962):** Borders and ornamental details
- **Dark Brown (#3D3229):** Primary text
- **Charcoal (#2C2C2C):** Secondary text

### Typography

- **Serif (Cormorant Garamond):** Headings and couple names
- **Sans-serif (Lato):** Body text and UI elements

## Responsive Breakpoints

- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px and above

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

The website is optimized for:
- Fast loading on mobile networks
- High Lighthouse performance scores
- Minimal JavaScript bundle size
- Optimized rendering

## License

This project is created for the wedding of Anudas R and Sikhila K.
