# Calendly Inline Widget Display Options

## Current Issue
The Calendly widget is showing scrollbars and not fitting properly. This is because Calendly's content is dynamic and changes based on:
- Number of available dates
- Time slots shown
- User's screen size
- Month being viewed

## Display Options for Inline Widget

### 1. **Fixed Height (Current)**
```jsx
height={750}  // Fixed pixel height
```
- **Pros:** Predictable layout
- **Cons:** May cause scrolling on some views

### 2. **Dynamic Height**
```jsx
height="100vh"  // Full viewport height
// or
height="calc(100vh - 200px)"  // Viewport minus header
```
- **Pros:** Uses available space
- **Cons:** Changes with window size

### 3. **Minimum Height**
```jsx
style={{ 
  minHeight: 700,
  height: "auto"
}}
```
- **Pros:** Grows with content
- **Cons:** Can push page down

### 4. **Aspect Ratio Container**
```jsx
style={{ 
  aspectRatio: "16/9",
  width: "100%"
}}
```
- **Pros:** Maintains proportions
- **Cons:** May not fit all content

## Calendly URL Parameters

You can control the inline widget behavior with URL parameters:

### Hide Elements
```jsx
// Current URL
url = "https://calendly.com/mashamaria/returning-clients-clone"

// With parameters to simplify display
url = "https://calendly.com/mashamaria/returning-clients-clone?hide_event_type_details=1&hide_landing_page_details=1"
```

### Color Customization
```jsx
?primary_color=3b5849  // Your green
&text_color=000000     // Black text
&background_color=FEFEF7  // Your background
```

### Date Range Control
```jsx
&date_range=30  // Show only next 30 days
&min_date=2025-10-01  // Start date
&max_date=2025-12-31  // End date
```

## Recommended Solutions

### Option A: Compact Display
Show only the calendar, hide extra details:
```jsx
<CalendlyEmbed 
  height={600}
  hideDetails={true}  // Hides event description
  url={`${baseUrl}?hide_landing_page_details=1&hide_event_type_details=1`}
/>
```

### Option B: Two-Column Layout
Split calendar and time slots:
```jsx
// This requires Calendly's paid plans for custom CSS
<CalendlyEmbed 
  height={500}
  customCss="https://yoursite.com/calendly-custom.css"
/>
```

### Option C: Modal/Overlay
Instead of inline, open in a modal:
```jsx
// No height constraints - opens in overlay
<button onClick={() => Calendly.initPopupWidget({url})}>
  Schedule Now
</button>
```

## The Root Issue

The main problem is that Calendly's widget is designed to be:
- **Minimum 700px tall** for optimal display
- **Dynamic content** that changes monthly
- **Not fully customizable** without paid plans

## Best Practice Recommendations

1. **Use 700-750px height** as minimum
2. **Accept some scrolling** on busy months
3. **Consider popup for smaller screens**
4. **Use hide parameters** to reduce content
5. **Test different months** to see variation

## Alternative: Split View

Instead of one large widget, consider:
- Small calendar on left (date picker only)
- Available times on right (scrollable list)
- Custom implementation gives full control

Would you like me to implement any of these solutions?
