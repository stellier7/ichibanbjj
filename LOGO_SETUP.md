# Logo Integration - Setup Instructions

The website code has been updated to use your Ichiban Jiu Jitsu circular logo in multiple places. Follow these steps to complete the setup:

## 📁 Required File Placement

### 1. Main Logo
Place your circular logo file here:
```
/public/images/ichiban-logo.png
```

**Specifications:**
- Format: PNG (with transparent or black background)
- Minimum size: 512x512 pixels
- Shape: Circular/round
- File name: `ichiban-logo.png` (exactly)

### 2. Favicon (Browser Tab Icon)
The same logo file will be used as the favicon automatically.

## 🎨 Where the Logo Appears

### Navigation Bar
- **Location**: Top left corner
- **Size**: 48x48px (3rem)
- **Behavior**: Clickable, returns to homepage
- **Fallback**: Shows "ICHIBAN" text if image fails to load

### Footer
- **Location**: Left column, brand section
- **Size**: 64x64px (4rem)
- **Display**: Next to "ICHIBAN" text

### Favicon
- **Location**: Browser tab
- **Sizes**: Auto-generated for all devices
- **Usage**: Desktop browsers, mobile home screen icons

### Open Graph (Social Sharing)
- **Usage**: When sharing site on social media
- **Preview**: Logo will appear in link previews

## 🚀 Testing

After placing the logo file:

1. Refresh the website
2. Check navigation bar (logo should appear)
3. Check footer (logo should appear)
4. Check browser tab (icon should appear)
5. Test on mobile devices

## 🔧 Troubleshooting

**Logo not appearing?**
- Verify file path: `/public/images/ichiban-logo.png`
- Check file name (exact match, case-sensitive)
- Clear browser cache and reload
- Check browser console for errors

**Logo quality issues?**
- Use minimum 512x512px resolution
- Export as PNG with transparency
- Ensure clean edges (no pixelation)

## 📝 Alternative File Names

If you prefer to use a different file name, update these files:
- `/components/Navigation.tsx` (line with img src)
- `/components/Footer.tsx` (line with img src)
- `/app/layout.tsx` (metadata icons section)

---

**Current Status**: Code is ready, waiting for logo file placement! ✅
