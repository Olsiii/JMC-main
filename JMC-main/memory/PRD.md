# JMC Law Firm Website - PRD

## Original Problem Statement
Build a full-stack, multipage law firm website for "JMC" using ReactJS with clean, scalable architecture that can be downloaded and edited in VSCode.

## Project Overview
- **Firm Name:** JMC (Justice & Management Consulting)
- **Location:** Rr. Qamil Hoxha nr.8, Prishtina 10000, Kosovo
- **Website Type:** Static marketing/law firm website

## User Personas
1. **Potential Clients** - Individuals seeking legal services in Kosovo
2. **Business Clients** - Companies needing corporate legal representation
3. **Site Administrators** - JMC staff updating content

## Core Requirements (Static)

### Design Requirements
- **Color Palette:**
  - Header/Navbar: Dark Grey (#2B2B2B)
  - Body: Light Cream (#F8F5F0)
  - Footer: Dark Navy (#0B1C2D)
  - Accent: Gold (#D4AF37)
- **Typography:**
  - Headings: Playfair Display (serif)
  - Body: Lato (sans-serif)
- **Style:** Professional, Minimal, Elegant

### Pages
1. **Home** - Hero with Prizren image, Practice Areas preview (8 areas)
2. **About** - Hero with Kala image, Interactive tabs (Mission/Vision/Values/Why Choose Us)
3. **Practice Areas** - Hero with Dukagjini image, Expandable practice area cards
4. **Contact** - Gradient hero, Split layout with contact info & Google Maps

### Technical Stack
- React (Create React App)
- React Router DOM
- Tailwind CSS
- Framer Motion (animations)
- Lucide React (icons)
- Shadcn UI components

## What's Been Implemented (2026-01-03)

### Completed Features
- [x] 4-page responsive website (Home, About, Practice Areas, Contact)
- [x] Dark grey navbar with JMC logo
- [x] Mobile hamburger menu (slides from right, transparent background)
- [x] Full-height hero sections with user-provided images
- [x] 8 Practice Area cards with icons and descriptions
- [x] Interactive tabs on About page (Mission, Vision, Values, Why Choose Us)
- [x] Expandable practice area cards on Practice Areas page
- [x] Contact page with split layout (no form)
- [x] Google Maps integration (footer + contact page)
- [x] Dark navy footer with contact info
- [x] Subtle fade-in animations using Framer Motion
- [x] Fully responsive (mobile-first design)
- [x] Gold accent color for CTAs and highlights

### File Structure
```
/app/frontend/src/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Hero.jsx
│   └── PracticeCard.jsx
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   ├── PracticeAreas.jsx
│   └── Contact.jsx
├── App.js
├── App.css
└── index.css
```

## Prioritized Backlog

### P0 - Core (Completed)
- [x] All 4 pages functional
- [x] Navigation working
- [x] Responsive design
- [x] User-provided images integrated

### P1 - Enhancements (Future)
- [ ] Add team member profiles section
- [ ] Add testimonials/case studies
- [ ] Add blog/news section
- [ ] Multi-language support (Albanian/English)

### P2 - Nice to Have
- [ ] Client portal integration
- [ ] Appointment booking system
- [ ] Live chat integration
- [ ] Analytics dashboard

## Next Tasks
1. Review and provide feedback on current implementation
2. Add real content (attorney bios, detailed practice area content)
3. Consider adding testimonials section
4. Set up custom domain
5. Configure SEO metadata
