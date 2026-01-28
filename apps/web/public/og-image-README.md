# OG Image (Open Graph Image)

## Requirements

- **Dimensions**: 1200x630px (recommended for social media)
- **Format**: PNG or JPG
- **File**: `public/og-image.png`

## Design Guidelines

### Content to Include:

1. **Logo/Branding**
   - AstraForge logo (🌌 emoji or custom logo)
   - "AstraForge" text with gradient (purple-pink)

2. **Main Text**
   - "AI-Powered Monorepo Factory"
   - "Build Full-Stack Apps in 4 Minutes"

3. **Visual Elements**
   - Dashboard screenshot (optional)
   - Gradient background (purple/pink theme)
   - Subtle code snippets or UI elements

4. **Colors**
   - Background: Dark (gray-900 or gradient)
   - Text: White/Light gray
   - Accents: Purple (#8b5cf6) and Pink (#ec4899)

## Tools to Create:

1. **Figma** (Recommended)
   - Create 1200x630px frame
   - Add gradient background
   - Add text and logo
   - Export as PNG

2. **Canva**
   - Use "Open Graph Image" template
   - Customize with brand colors
   - Export as PNG

3. **og-image.dev**
   - Visit: https://og-image.vercel.app/
   - Customize template
   - Download image

4. **Next.js OG Image Generation** (Advanced)
   - Use `@vercel/og` package
   - Generate dynamically

## Quick Template:

```
┌─────────────────────────────────────┐
│  [Background: Dark gradient]         │
│                                       │
│  🌌 AstraForge                       │
│  AI-Powered Monorepo Factory         │
│                                       │
│  Build Full-Stack Apps               │
│  in 4 Minutes                        │
│                                       │
│  [Optional: Dashboard preview]       │
└─────────────────────────────────────┘
```

## Placeholder

Until you create the OG image, the metadata will reference `/og-image.png` but the image won't display. This is fine for development.

## Testing

After creating the image:
1. Test on: https://www.opengraph.xyz/
2. Test on: https://cards-dev.twitter.com/validator
3. Verify in browser DevTools → Network → og-image.png

