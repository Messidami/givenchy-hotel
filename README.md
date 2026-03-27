# 🏨 Givenchy Luxury Hotel and Suites
## React Frontend — Complete Setup Guide

---

## 📁 PROJECT STRUCTURE

```
givenchy-hotel/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx          ← Entry point
    ├── App.jsx           ← Main app + routing
    ├── index.css         ← All global styles
    ├── components/
    │   ├── index.jsx     ← FadeIn, Footer, SectionHeader, WhatsApp, etc.
    │   ├── Navbar.jsx    ← Top navigation
    │   ├── Topbar.jsx    ← Info bar (phone, address)
    │   ├── BookingModal.jsx ← Booking popup form
    │   ├── PageLoader.jsx   ← Intro animation
    │   └── WhatsApp.jsx     ← WhatsApp float button
    └── pages/
        ├── HomePage.jsx      ← Full homepage
        ├── RoomsPage.jsx     ← Rooms page
        ├── AboutPage.jsx     ← About page
        ├── DiningPage.jsx    ← Dining page
        ├── AmenitiesPage.jsx ← Amenities page
        ├── EventsPage.jsx    ← Events page
        ├── GalleryPage.jsx   ← Gallery page
        ├── ContactPage.jsx   ← Contact page
        └── OtherPages.jsx    ← All pages source
```

---

## 🚀 STEP-BY-STEP SETUP IN VS CODE

### STEP 1 — Install Node.js
1. Go to https://nodejs.org
2. Download **LTS version** (recommended)
3. Install it — click Next, Next, Finish
4. Open **Command Prompt** and type:
   ```
   node --version
   ```
   You should see something like `v20.11.0`

---

### STEP 2 — Install VS Code
1. Go to https://code.visualstudio.com
2. Download and install it
3. Open VS Code

---

### STEP 3 — Create the Project Folder
1. On your Desktop or Documents, create a new folder called: `givenchy-hotel`
2. Open **VS Code**
3. Click **File → Open Folder**
4. Select the `givenchy-hotel` folder you just created

---

### STEP 4 — Open the Terminal in VS Code
- Press **Ctrl + ` ** (backtick key, top-left of keyboard)
- OR click **Terminal → New Terminal**

---

### STEP 5 — Set Up the Project
In the VS Code terminal, run these commands ONE BY ONE:

```bash
npm create vite@latest . -- --template react
```
(When asked "Current directory is not empty", press **y** then Enter)
(When asked framework, choose **React**)
(When asked variant, choose **JavaScript**)

Then install all packages:
```bash
npm install
npm install framer-motion react-intersection-observer react-hook-form react-hot-toast swiper lucide-react
```

---

### STEP 6 — Replace the Generated Files
Delete ALL files inside the `src/` folder that Vite created, then copy in our files:

**Files to copy into your project:**

| Our File | Where to Put It |
|---|---|
| `src/main.jsx` | `src/main.jsx` (replace) |
| `src/App.jsx` | `src/App.jsx` (replace) |
| `src/index.css` | `src/index.css` (replace) |
| `src/components/index.jsx` | Create `src/components/` folder, add file |
| `src/components/Navbar.jsx` | `src/components/Navbar.jsx` |
| `src/components/Topbar.jsx` | `src/components/Topbar.jsx` |
| `src/components/BookingModal.jsx` | `src/components/BookingModal.jsx` |
| `src/components/PageLoader.jsx` | `src/components/PageLoader.jsx` |
| `src/components/WhatsApp.jsx` | `src/components/WhatsApp.jsx` |
| `src/pages/HomePage.jsx` | Create `src/pages/` folder, add file |
| `src/pages/OtherPages.jsx` | `src/pages/OtherPages.jsx` |
| `src/pages/RoomsPage.jsx` | `src/pages/RoomsPage.jsx` |
| `src/pages/AboutPage.jsx` | `src/pages/AboutPage.jsx` |
| `src/pages/DiningPage.jsx` | `src/pages/DiningPage.jsx` |
| `src/pages/AmenitiesPage.jsx` | `src/pages/AmenitiesPage.jsx` |
| `src/pages/EventsPage.jsx` | `src/pages/EventsPage.jsx` |
| `src/pages/GalleryPage.jsx` | `src/pages/GalleryPage.jsx` |
| `src/pages/ContactPage.jsx` | `src/pages/ContactPage.jsx` |

---

### STEP 7 — Run the Website
In the VS Code terminal:
```bash
npm run dev
```

You should see:
```
VITE v5.x  ready in 300ms
➜  Local:   http://localhost:5173/
```

**Open your browser and go to: http://localhost:5173**

🎉 Your hotel website is running!

---

### STEP 8 — Stop the Server
Press **Ctrl + C** in the terminal to stop.

---

## 🔧 RECOMMENDED VS CODE EXTENSIONS
Install these from the VS Code Extensions panel (Ctrl+Shift+X):
1. **ES7+ React/Redux/React-Native snippets**
2. **Prettier - Code formatter**
3. **Auto Rename Tag**
4. **Tailwind CSS IntelliSense** (for future use)
5. **GitLens**

---

## 📦 BUILD FOR PRODUCTION (When Ready to Deploy)
```bash
npm run build
```
This creates a `dist/` folder — upload this to your hosting (Vercel, Hostinger, etc.)

---

## 🌐 DEPLOY TO VERCEL (FREE)
1. Go to https://vercel.com
2. Create a free account
3. Click **New Project**
4. Upload your project folder
5. Click **Deploy**
6. Your site is live in 60 seconds!

---

## 📞 NEXT STEPS (Laravel Backend)
Once frontend is confirmed working:
1. Set up Laravel API
2. Connect booking form to `/api/bookings`
3. Connect contact form to `/api/contact`
4. Add Paystack payment
5. Build admin dashboard

---

**Hotel:** Givenchy Luxury Hotel and Suites  
**Location:** Nise/Agulu Road, Amawbia, Awka, Anambra State  
**Phone:** 0814 480 0460
