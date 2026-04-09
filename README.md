# AutoPrint Website

Production website built with React, TypeScript, and Vite.

## Features

- Public marketing pages
- Admin login and private admin dashboard
- Contact form stored in database
- SPA routing with redirect support

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
cp .env.example .env
```

3. Add environment values in .env:

- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY

4. Start local server:

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Deploy Live (Netlify)

This project is ready for Netlify deployment.

1. Push code to GitHub.
2. Create a new site in Netlify from that repository.
3. Set build settings:
- Build command: npm run build
- Publish directory: dist
4. Add environment variables in Netlify site settings:
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY
5. Deploy.

The SPA redirect is already configured through public/_redirects.

## Contact Form Storage

The contact form writes submissions to the contact_submissions table. User message details are submitted in request body and are not shown in URL query parameters.
