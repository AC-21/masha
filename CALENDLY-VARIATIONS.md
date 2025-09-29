# Calendly Embed Variations

## Current Implementation: Inline Widget
We're currently using the **Inline Widget** which embeds directly into your page content.

### Pros:
- Always visible to users
- Takes up dedicated space on the page
- Good for conversion as it's immediately accessible
- Can be styled to match your site

### Current Settings:
- Height: 750px (expanded for full viewport)
- Width: 725px
- Position: Right side of "My Work" section

---

## Alternative Calendly Options

### 1. **Popup Widget**
Opens Calendly in a modal overlay when triggered by a button/link.

```jsx
// Implementation example:
<button 
  onClick={() => window.Calendly.initPopupWidget({
    url: 'https://calendly.com/your-url'
  })}
>
  Schedule a Call
</button>
```

**Best for:** Saving space, cleaner design, multiple CTAs across the site

---

### 2. **Popup Text Link**
Simple text link that opens Calendly in a popup.

```jsx
<a href="#" onClick={(e) => {
  e.preventDefault();
  window.Calendly.initPopupWidget({url: 'your-url'});
}}>
  Click here to schedule
</a>
```

**Best for:** Inline text CTAs, minimal visual footprint

---

### 3. **Badge Widget**
Floating button (usually bottom-right corner) that opens Calendly.

```jsx
window.Calendly.initBadgeWidget({
  url: 'your-calendly-url',
  text: 'Schedule time with me',
  color: '#3b5849',
  textColor: '#ffffff',
  branding: false
});
```

**Best for:** Always accessible scheduling without taking page space

---

### 4. **Event Type List**
Shows multiple event types if you offer different session lengths/types.

```jsx
<CalendlyEmbed 
  url="https://calendly.com/your-username" // Without specific event
  height={750}
/>
```

**Best for:** Offering multiple service options (30min, 60min, consultation, etc.)

---

### 5. **Custom Button Styles**
We could create beautifully designed buttons that match your aesthetic:

```jsx
// Styled button that opens Calendly
<button className="bg-[#3b5849] text-white px-8 py-4 rounded-full 
                   hover:bg-[#2a4238] transition-colors
                   font-['Roboto_Mono'] uppercase tracking-wider">
  Book Your Session
</button>
```

---

## Recommendations for Your Site

Given your design aesthetic and user experience goals:

### Option A: Keep Current Inline (with improvements)
- Add a subtle border or background to make it stand out
- Consider adding introductory text above the calendar
- Maybe reduce width slightly to give more room for content on left

### Option B: Hybrid Approach
- Use popup for main CTA button in hero section
- Keep inline widget in "My Work" section
- Add floating badge for constant accessibility

### Option C: Minimalist Approach
- Replace inline widget with beautiful, prominent CTA button
- Opens Calendly in popup for cleaner design
- Add multiple CTAs throughout the page

---

## Technical Considerations

### Current Implementation Benefits:
- SEO friendly (content is on page)
- No additional clicks required
- Works without JavaScript in some cases

### Popup Benefits:
- Faster initial page load
- More design flexibility
- Better mobile experience
- Can track conversions more easily

---

## How to Switch

If you want to try a different variation, just let me know which one and I can implement it quickly. The current setup is modular enough that we can easily swap between different Calendly presentation styles.
