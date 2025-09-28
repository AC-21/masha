# Wellness Practitioner Website

A pixel-perfect wellness/therapy practitioner website built with React and Tailwind CSS. This is a static website showcasing a wellness practitioner's personal narrative, work modalities, and scheduling interface.

## Features

- **Pixel-perfect design** based on Figma mockup
- **Responsive layout** with absolute positioning for precise control
- **Multiple font families**: Inter, Caveat, and Roboto Mono
- **Cream background theme** (#fefef7)
- **Personal narrative section** with heartfelt storytelling
- **Services showcase** including Movement, Laughter, Parts work, and Deep Connection
- **Integrated scheduling interface**
- **Custom decorative elements** including precisely positioned dash lines

## Technologies Used

- **React 18** - Component-based UI framework
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS v4** - Utility-first CSS framework with custom design tokens
- **Vite** - Fast build tool and development server

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone or download this project
2. Install dependencies:
   ```bash
   npm install
   ```

3. Replace placeholder images:
   - Add your portrait image as `public/placeholder-portrait.jpg`
   - Add your scheduling interface screenshot as `public/placeholder-schedule.jpg`

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

### Build for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## Customization

### Images
Replace the placeholder images in the `public` directory:
- `placeholder-portrait.jpg` - Main portrait photo
- `placeholder-schedule.jpg` - Scheduling interface screenshot

### Content
Edit the text content in `src/components/Group6.tsx`:
- Personal narrative text
- Service descriptions
- Practitioner initials (currently "MM")
- Section headings and descriptions

### Styling
The design uses Tailwind CSS with custom design tokens defined in `src/styles/globals.css`. Key design elements:
- Background color: `#fefef7` (cream)
- Font families: Inter, Caveat, Roboto Mono
- Precise absolute positioning for pixel-perfect layout
- Custom color variables for consistent theming

### Typography
The project uses three main font families:
- **Inter**: For body text and descriptions
- **Caveat**: For decorative elements (initials)
- **Roboto Mono**: For headings and labels

## Project Structure

```
src/
├── components/
│   └── Group6.tsx          # Main website component
├── styles/
│   └── globals.css         # Global styles and design tokens
├── App.tsx                 # Root application component
└── main.tsx               # Application entry point
```

## Font Loading

Fonts are loaded via Google Fonts in the HTML head. The following fonts are included:
- Inter (weights: 400, 500, 600, 700)
- Caveat (weights: 400, 500, 600, 700)
- Roboto Mono (weights: 400, 500, 600, 700)

## Deployment

This is a static website that can be deployed to any static hosting service:

- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect your Git repository
- **GitHub Pages**: Upload the `dist` folder contents
- **AWS S3**: Upload to an S3 bucket with static website hosting

## Browser Support

This website works in all modern browsers that support:
- ES2020 features
- CSS Grid and Flexbox
- CSS Custom Properties (variables)

## License

This project is provided as-is for personal or commercial use. Please replace placeholder content and images with your own.

## Support

For technical issues or questions about implementation, please refer to the documentation of the underlying technologies:
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/)