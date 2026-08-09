# 🌐 Muviz Watch - How to Deploy Live for Everyone to Use

This document details how to publish your **Muviz Watch** 3D & 4K streaming platform live on the internet for public access.

---

## 🚀 Option 1: Deploy Live for Free on Vercel (Recommended - Takes 2 Minutes)

1. Create a free account on [Vercel.com](https://vercel.com).
2. Install the Vercel CLI or connect your GitHub repository:
   ```bash
   npm install -g vercel
   vercel
   ```
3. Follow the prompts. Vercel will build `npm run build` and output directory `dist`.
4. Your platform will immediately be live on a public URL like:  
   `https://muviz-watch.vercel.app`

---

## ⚡ Option 2: Deploy Live for Free on Netlify

1. Create a free account on [Netlify.com](https://netlify.com).
2. Drag and drop the `dist/` folder directly onto the Netlify Dashboard, or link your GitHub repo.
3. Your platform will be live instantly on a custom URL like:  
   `https://muviz-watch.netlify.app`

---

## 🔑 TMDB Live Global Movie Database API Integration

Muviz Watch includes real-time integration with TMDB (The Movie Database). To fetch live real-time movie releases from all countries and languages:

1. Register for a free API key at [themoviedb.org](https://www.themoviedb.org/documentation/api).
2. Add your environment variable to Vercel/Netlify or `.env` file:
   ```env
   VITE_TMDB_API_KEY=your_api_key_here
   ```

---

## 🎥 Custom Live Video Stream Links & Video Servers

Muviz Watch features a **Custom Stream URL** input inside the video player:
- Paste any `.mp4`, `.m3u8` (HLS), Cloudflare Stream, or video link into the `Custom Stream URL` box in the player toolbar to stream custom full-length films live in 4K & Stereoscopic 3D.
