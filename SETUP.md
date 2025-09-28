# Setup Instructions

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Add Your Images**
   - Replace `public/placeholder-portrait.jpg` with your portrait photo
   - Replace `public/placeholder-schedule.jpg` with your scheduling interface screenshot
   - Ensure images maintain similar aspect ratios for best results

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **View Your Site**
   - Open http://localhost:5173 in your browser

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options

**Netlify (Recommended)**
1. Build the project: `npm run build`
2. Drag the `dist` folder to Netlify's deploy page
3. Your site is live!

**Vercel**
1. Connect your Git repository to Vercel
2. Vercel will automatically build and deploy

**Other Static Hosts**
1. Build the project: `npm run build`
2. Upload the contents of the `dist` folder to your hosting provider

## Customization

### Content Changes
Edit `src/components/Group6.tsx` to update:
- Personal narrative text
- Service descriptions
- Contact information
- Practitioner initials

### Design Changes
Edit `src/styles/globals.css` for:
- Color scheme adjustments
- Font modifications
- Layout tweaks

### Image Requirements
- **Portrait**: 581x775px (recommended)
- **Schedule**: 755x570px (recommended)
- Format: JPG or PNG
- Optimized for web (< 500KB each)

## Font Dependencies

This project uses Google Fonts (loaded automatically):
- Inter (body text)
- Caveat (decorative elements)
- Roboto Mono (headings)

No additional font installation required.

## Development Notes

- Built with Vite for fast development
- Uses Tailwind CSS v4 for styling
- TypeScript for type safety
- Absolute positioning for pixel-perfect layout
- Responsive design principles applied

## Troubleshooting

**Images not showing?**
- Ensure image files are in the `public` directory
- Check file names match exactly: `placeholder-portrait.jpg` and `placeholder-schedule.jpg`
- Verify image formats are supported (JPG, PNG, WebP)

**Fonts not loading?**
- Check internet connection (fonts load from Google Fonts)
- Verify font names in CSS match Google Fonts specification

**Build errors?**
- Run `npm install` to ensure all dependencies are installed
- Check Node.js version (16+ required)
- Clear cache: `rm -rf node_modules package-lock.json && npm install`