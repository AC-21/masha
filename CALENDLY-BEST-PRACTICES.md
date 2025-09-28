# Calendly Embed Best Practices

## Current Implementation

The Calendly embed has been optimized for better visibility and user experience:

### 1. **Container Sizing**
- **Height**: Increased to 650px (from 546px) for full calendar visibility
- **Width**: 725px to accommodate the full scheduling interface
- **Position**: Slightly adjusted to top-[1100px] for better alignment

### 2. **Styling Improvements**
- **Background**: White background for better contrast
- **Border**: Subtle border (1px solid #e5e5e5) for definition
- **Shadow**: Soft shadow for depth (0 2px 8px rgba(0,0,0,0.08))
- **Overflow**: Changed from 'hidden' to 'auto' to allow scrolling if needed
- **Border Radius**: 24px for modern, rounded appearance

### 3. **Color Configuration**
- **Primary Color**: #3b5849 (matches your brand green)
- **Text Color**: #4b5563 (dark gray for better readability instead of white)
- **Show Event Details**: Enabled for better user context

## Recommendations for Further Improvement

### Option 1: Full-Height Embed (Recommended)
If you want no scrolling at all, increase the height to 900px:
```jsx
<CalendlyEmbed height={900} />
```

### Option 2: Responsive Container
For better mobile/tablet experience, consider making the container responsive:
```jsx
<div className="w-full max-w-[725px] h-[650px] md:h-[750px] lg:h-[650px]">
  <CalendlyEmbed height="100%" />
</div>
```

### Option 3: Modal/Popup
For the cleanest experience, consider using Calendly's popup widget:
- Less space on the page
- Full-screen scheduling experience
- Better mobile experience

## Troubleshooting

If the embed is still not visible properly:
1. Clear browser cache
2. Check that the Calendly event is published (not draft)
3. Ensure the event allows embedding
4. Check browser console for any JavaScript errors

## Testing Different Styles

You can test different configurations by modifying these props in LandscapeCanvas.tsx:
- `height`: 650-900 for optimal visibility
- `primaryColor`: Your brand color (hex without #)
- `textColor`: Text color (hex without #)
- `hideDetails`: true/false to show/hide event details
- `rounded`: Corner radius in pixels
