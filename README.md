# Alber Leandro — Pro Skater & Entrepreneur

Prototype portfolio website **made for Alber Leandro**, a Brazilian professional skateboarder and entrepreneur based between Brazil and Los Angeles. Built with [Astro](https://astro.build) 5 + React 19 + Tailwind CSS 4 by **Pedro Yamada at Industrie Br**.

- 🔗 [Line Embroidery](https://line-embroidery-v7.vercel.app/) — his streetwear brand (also made by Pedro Yamada / Industrie Br)

---

## Overview

This is a bilingual (PT/EN) portfolio prototype showcasing Alber Leandro's dual career as a **Pro Skater** and **Entrepreneur** (founder of the streetwear brand *Line Embroidery*). It includes a photo gallery (using his own images), a contact form, and a privacy policy page — all built with real content provided by him.

## Features

- **Bilingual (PT / EN)** — Language auto-detected from browser, URL param (`?lang=`), or localStorage. Manual switcher in the header.
- **Hero slideshow** — Full-width photo with dark gradient overlay.
- **Pro Skater section** — Action photos, competition highlights, and sponsors.
- **Entrepreneur section** — Brand story and vision for *Line Embroidery*.
- **Contact API** — Server endpoint using **Resend** to deliver email inquiries.
- **Privacy Policy** — Dedicated `/privacidade` route.
- **Dark theme** — Premium black/dark gradient aesthetic.
- **Responsive** — Separate mobile and desktop layouts for optimal control.
- **Smooth animations** — Powered by framer-motion (code-split into its own chunk).
- **SSR on Vercel** — Server-side rendering via `@astrojs/vercel`.

## Commands

| Command               | Action                               |
| :-------------------- | :----------------------------------- |
| `npm install`         | Install dependencies                 |
| `npm run dev`         | Start dev server at `localhost:4321` |
| `npm run build`       | Build production site to `./dist/`   |
| `npm run preview`     | Preview build locally                |
