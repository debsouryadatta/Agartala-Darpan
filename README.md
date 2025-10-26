# আগরতলা দৰ্পণ (Agartala Darpan) - Bengali Daily Newspaper

A minimal, beautiful single-page website for **Agartala Darpan** (আগরতলা দৰ্পণ), a Bengali daily newspaper published from Kunjaban Colony, Agartala, West Tripura, India.

## 🎨 Features

- **Elegant Bengali Typography** - Beautiful Noto Serif Bengali and Hind Siliguri fonts
- **E-Paper Viewer** - Interactive PDF viewer with navigation controls
- **Contact Form** - Fully functional contact form with validation
- **Admin Dashboard** - Secure admin panel for managing e-paper publications
- **Responsive Design** - Mobile-first, works perfectly on all devices
- **Sophisticated Color Scheme** - Deep burgundy (#8B1538) and cream (#FFFBF5) palette

## 📋 Official Information

- **Newspaper Name:** Agartala Darpan (আগরতলা দৰ্পণ)
- **Type:** Bengali Daily Newspaper
- **Published From:** Kunjaban Colony, P.O-Abhoynagar, Agartala, West Tripura, PIN-799005
- **Email:** agtdarpan16@gmail.com
- **Mobile:** +91 9774842294
- **Landline:** 0381 359 6723

## 🚀 Tech Stack

- **Framework:** Next.js 15+ with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Components:** Shadcn/ui
- **PDF Viewer:** react-pdf
- **Authentication:** Better Auth
- **Database:** PostgreSQL (via Prisma)
- **Animations:** Framer Motion

## 📦 Installation

### 1️⃣ Clone and Install

```bash
git clone <your-repo-url>
cd Janatar-Bhasha
bun install
```

### 2️⃣ Set Up Environment Variables

Create a `.env` file:

```bash
BETTER_AUTH_SECRET=<your_better_auth_secret>
BETTER_AUTH_URL=http://localhost:3000
DATABASE_URL="file:./local.db"
```

### 3️⃣ Set up the Database

```bash
bunx prisma generate
bunx prisma migrate dev
```

### 4️⃣ Add a Sample PDF

Place a sample newspaper PDF as `public/sample-epaper.pdf`

You can:
- Open `public/create-sample-pdf.html` in browser and print as PDF
- Or use any existing PDF file

### 5️⃣ Start Development Server

```bash
bun dev
```

Navigate to [http://localhost:3000](http://localhost:3000)

## 📂 Project Structure

```
Agartala-Darpan/
├── app/
│   ├── (root)/page.tsx           # Main landing page
│   ├── (admin)/dashboard/        # Admin dashboard
│   ├── (auth)/                   # Auth pages
│   ├── api/                      # API routes
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── components/
│   ├── newspaper-header.tsx      # Header with masthead
│   ├── epaper-section.tsx        # E-paper viewer
│   ├── contact-section.tsx       # Contact form
│   ├── newspaper-footer.tsx      # Footer
│   ├── pdf-viewer.tsx            # PDF viewer
│   ├── pdf-management.tsx        # Admin PDF management
│   └── ui/                       # Shadcn UI components
├── lib/                          # Utilities
├── public/                       # Static files
└── prisma/                       # Database schema
```

## 🎨 Design Philosophy

### Color Palette
- **Primary:** Deep burgundy (#8B1538)
- **Background:** Warm cream (#FFFBF5)
- **Text:** Charcoal (#2C2C2C)
- **Borders:** Light taupe (#E8E3D8)

### Typography
- **Bengali Headlines:** Noto Serif Bengali
- **Bengali Body:** Hind Siliguri
- **English:** Inter

## 🔐 Admin Access

1. Click "Admin" button in header
2. Sign in with credentials
3. Manage e-papers from dashboard

## 📱 Responsive Design

Works beautifully on Desktop, Tablet, and Mobile devices.

## 🌐 Deployment

Deploy to Vercel, Netlify, or any Next.js hosting platform.

## 📞 Support

- **Email:** agtdarpan16@gmail.com
- **Mobile:** +91 9774842294
- **Landline:** 0381 359 6723

---

**আগরতলা দৰ্পণ** - Made with ❤️ for the people of Agartala, Tripura

