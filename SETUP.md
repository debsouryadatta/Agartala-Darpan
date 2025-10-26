# Quick Setup Guide for Agartala Darpan

## ✅ What's Already Done

Your Agartala Darpan newspaper website is ready with:
- ✅ Beautiful Bengali typography
- ✅ Responsive single-page layout
- ✅ E-Paper PDF viewer
- ✅ Contact form
- ✅ Admin dashboard
- ✅ Better Auth integration
- ✅ Tailwind CSS styling

## 🎯 Quick Start (5 Minutes)

### 1️⃣ Clone and Install

```bash
git clone <your-repo-url>
cd Agartala-Darpan
bun install
```

### 1. Add a Sample PDF (IMPORTANT)

The website needs a PDF to display. You have two options:

**Option A: Use the HTML Template (Recommended)**
```bash
# 1. Open in browser
open public/create-sample-pdf.html

# 2. Print the page (Cmd+P or Ctrl+P)
# 3. Save as PDF: public/sample-epaper.pdf
```

**Option B: Use Any PDF**
```bash
# Copy any PDF and rename it
cp /path/to/your/newspaper.pdf public/sample-epaper.pdf
```

### 2. View the Website

The dev server should already be running at:
```
http://localhost:3000
```

If not running:
```bash
bun dev
```

### 3. Test Admin Dashboard

1. Navigate to: `http://localhost:3000`
2. Click "Admin" button in the header
3. Sign up for an account (first time)
4. Access the dashboard to manage e-papers

## 📋 Current Status

✅ **Installed:**
- react-pdf (for PDF viewing)
- framer-motion (for animations)
- Bengali fonts (Noto Serif Bengali, Hind Siliguri)

✅ **Created Components:**
- `newspaper-header.tsx` - Masthead with Bengali typography
- `epaper-section.tsx` - PDF viewer with controls
- `contact-section.tsx` - Contact form
- `newspaper-footer.tsx` - Footer
- `pdf-viewer.tsx` - PDF rendering
- `pdf-management.tsx` - Admin dashboard

✅ **Updated:**
- Root layout with Bengali fonts
- Global CSS with newspaper color scheme
- Main page with all sections

## 🎨 Customization

### Change Newspaper Name
Edit `components/newspaper-header.tsx`:
```tsx
<h1>জনতার ভাষা</h1>  // Change this
```

### Change Colors
Edit `app/globals.css`:
```css
--burgundy: #8B1538;  // Primary color
--cream: #FFFBF5;     // Background
```

### Change Contact Info
Edit `components/contact-section.tsx` and `newspaper-footer.tsx`

## 🔧 Troubleshooting

### PDF Not Loading?
1. Make sure `public/sample-epaper.pdf` exists
2. Check browser console for errors
3. Verify the file is a valid PDF

### Fonts Not Showing?
1. Clear browser cache
2. Restart dev server
3. Check internet connection (fonts load from Google)

### Admin Login Issues?
1. Make sure database is set up: `bunx prisma generate`
2. Check `.env` file has correct settings
3. Sign up for a new account first

## 📱 Next Steps

1. **Add Real Content:**
   - Replace sample PDF with actual newspaper
   - Update contact information
   - Add social media links

2. **Deploy:**
   - Push to GitHub
   - Deploy on Vercel/Netlify
   - Update `BETTER_AUTH_URL` in `.env`

3. **Test:**
   - Test on mobile devices
   - Test PDF upload in admin
   - Test contact form

## 🆘 Need Help?

- Check the main [README.md](README.md)
- Review component files in `/components`
- Check the Better Auth documentation

## 🎉 You're All Set!

Your newspaper website is ready to go. Just add a sample PDF and start customizing!

---

**আগরতলা দৰ্পণ** - Made with ❤️ for Agartala, Tripura