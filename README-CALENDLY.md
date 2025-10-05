# Setting up Calendly Integration

## Local Development

1. Create a `.env` file in the root of the `master` project directory
2. Add your Calendly URL:
   ```
   VITE_CALENDLY_URL=https://calendly.com/YOUR-USERNAME/YOUR-EVENT-TYPE
   ```

## Production (Vercel)

1. Go to your Vercel project settings
2. Navigate to Environment Variables
3. Add a new variable:
   - Name: `VITE_CALENDLY_URL`
   - Value: Your Calendly scheduling link (e.g., `https://calendly.com/your-username/30-minute-meeting`)

## Getting Your Calendly URL

1. Log into your Calendly account
2. Go to Event Types
3. Click on the event you want to embed
4. Copy the booking link
5. Use this link as your `VITE_CALENDLY_URL`

## Testing

After setting up the environment variable:
- For local: Restart your dev server (`npm run dev`). The Calendly widget is used in `src/components/CalendlyEmbed.tsx` and appears on the desktop landscape layout.
- For production: Trigger a new deployment on Vercel

The scheduling widget should now load properly in the bottom right section of the desktop layout.
