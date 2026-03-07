# 📸 Image Setup Guide - Ichiban Website

## Where to Add Your Pictures

### 🎯 Hero Carousel Images (Daily Ichiban Pictures)

**Location**: `public/images/ichiban-daily/`

**Steps:**
1. Navigate to your project folder: `ichiban/`
2. Go to: `public/images/`
3. Create folder: `ichiban-daily` (if it doesn't exist)
4. Add ALL your daily Ichiban pictures to this folder

**Full Path:**
```
ichiban/
└── public/
    └── images/
        └── ichiban-daily/    ← ADD YOUR PICTURES HERE
            ├── photo1.jpg
            ├── photo2.jpg
            ├── daily-2024-01-15.jpg
            ├── ichiban-training.jpg
            └── ... (all your daily pictures)
```

**Supported Formats:**
- `.jpg` / `.jpeg`
- `.png`
- `.webp`

**Naming:**
- Any filename works! Examples:
  - `ichiban-2024-01-15.jpg`
  - `daily-photo-1.jpg`
  - `training-session.jpg`
  - `IMG_1234.jpg`

**Tips:**
- Optimize images before adding (recommended max 2MB per image)
- The carousel will automatically detect and display ALL images in this folder
- You can add/remove images anytime - the carousel updates automatically
- **Avoid spaces in filenames** – use hyphens instead (e.g. `photo-1.jpg` not `photo 1.jpg`)
- **Images cropped on iPhone:** Export as JPEG, not HEIC. Browsers don't support HEIC. In Photos: Share → Save to Files, or use "Most Compatible" in Settings → Camera → Formats

---

### 🛍️ Product Images

**Location**: `public/images/products/`

**When to add:**
- When adding products in the admin panel, you'll upload images here
- Or manually add product images to this folder

**Example:**
```
public/images/products/
├── gi-1.jpg
├── gi-2.jpg
├── rashguard-1.jpg
├── shorts-1.jpg
└── ...
```

---

### 📚 Course Thumbnails

**Location**: `public/images/courses/`

**When to add:**
- When creating courses in the admin panel, you'll upload thumbnails here
- Or manually add course thumbnail images

**Example:**
```
public/images/courses/
├── beginners-course.jpg
├── guard-passing.jpg
├── close-guard.jpg
└── ...
```

---

## Quick Setup Commands

```bash
# Navigate to project
cd ichiban

# Create image folders
mkdir -p public/images/ichiban-daily
mkdir -p public/images/products
mkdir -p public/images/courses

# Add your pictures to ichiban-daily folder
# (Copy/paste or drag & drop your images)
```

---

## After Adding Pictures

1. **Hero Carousel**: Images will automatically appear in the carousel on the homepage
2. **Admin Panel**: You can also upload images through the admin panel later
3. **No Code Changes Needed**: Just add files to the folder!

---

## Image Optimization Tips

For best performance:
- **Size**: Keep images under 2MB each
- **Format**: Use WebP when possible (better compression)
- **Dimensions**: Recommended 1920x1080 or similar for hero images
- **Tools**: Use tools like TinyPNG or ImageOptim to compress

---

**That's it! Just add your pictures to `public/images/ichiban-daily/` and they'll appear in the hero carousel! 🎉**
