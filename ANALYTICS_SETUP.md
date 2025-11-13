# Analytics Setup Guide

## Google Analytics 4 Setup

### Step 1: Create Google Analytics Account

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click "Start measuring" or "Admin" → "Create Property"
4. Fill in your property details:
   - **Property name**: "Nasko Terziev Portfolio" (or any name you prefer)
   - **Reporting timezone**: Your timezone
   - **Currency**: Your preferred currency
5. Click "Next" and fill in business information
6. Accept the Terms of Service

### Step 2: Set Up a Data Stream

1. Select "Web" as your platform
2. Enter your website URL: `https://naskoterziev.com`
3. Enter a stream name: "Portfolio Website"
4. Click "Create stream"

### Step 3: Get Your Measurement ID

1. After creating the stream, you'll see your **Measurement ID** (format: `G-XXXXXXXXXX`)
2. Copy this ID

### Step 4: Add Measurement ID to Your Website

Replace `GA_MEASUREMENT_ID` with your actual Measurement ID in **two places**:

1. In `index.html` (lines 20 and 25):
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

2. In `src/lib/analytics.ts` (line 26):
```typescript
export const trackPageView = (path: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-XXXXXXXXXX', {
      page_path: path,
      page_title: title,
    });
  }
};
```

### Step 5: Deploy and Test

1. Build and deploy your site:
   ```bash
   npm run build
   ```

2. After deployment, visit your live site and navigate around

3. Check Google Analytics (Admin → Data Streams → Click your stream → View real-time data)
   - You should see yourself as an active user within a few minutes

## What's Being Tracked

### Automatic Tracking
- **Page views**: Every time someone visits your site
- **User demographics**: Location, device, browser
- **Session duration**: How long users stay on your site
- **Traffic sources**: Where visitors come from (Google, social media, direct, etc.)

### Custom Events
- **scroll_to_section**: When users click "Check out my design playground"
  - Includes section name and interaction method

### Adding More Custom Tracking

You can track any interaction using the `trackEvent` function:

```typescript
import { trackEvent } from './lib/analytics';

// Example: Track button clicks
const handleButtonClick = () => {
  trackEvent('button_click', {
    button_name: 'cta_button',
    location: 'header'
  });
};

// Example: Track outbound links
import { trackOutboundLink } from './lib/analytics';

const handleLinkClick = () => {
  trackOutboundLink('https://linkedin.com/in/yourprofile', 'LinkedIn Profile');
};
```

## Privacy Considerations

- Google Analytics complies with GDPR when configured properly
- Consider adding a privacy policy page to your site
- If you want more privacy-focused analytics, consider alternatives like:
  - **Plausible** (€9/month) - Simple, privacy-focused
  - **Umami** (Free, self-hosted) - Open-source alternative
  - **Fathom** ($14/month) - Privacy-first analytics

## Viewing Your Analytics

### Key Reports to Check

1. **Real-time Report**: See who's on your site right now
   - Reports → Real-time

2. **Acquisition Report**: Where visitors come from
   - Reports → Acquisition → Traffic acquisition

3. **Engagement Report**: What users do on your site
   - Reports → Engagement → Pages and screens

4. **Custom Events**: View your tracked interactions
   - Reports → Engagement → Events

## Troubleshooting

### Analytics Not Working?

1. **Check browser extensions**: Ad blockers may block GA
2. **Verify Measurement ID**: Make sure it's correct in both files
3. **Wait a few minutes**: Data can take 5-10 minutes to appear
4. **Check browser console**: Look for any JavaScript errors

### Testing Locally

Analytics will also work on localhost during development, so you can test before deploying.

---

**Need help?** Check the [Google Analytics documentation](https://support.google.com/analytics) or reach out for assistance.

