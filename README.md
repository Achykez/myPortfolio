# Portfolio - Next.js + TypeScript

A modern, clean, and minimalist portfolio website built with Next.js, TypeScript, styled-components, and framer-motion.

## Features

- 🎨 **Light/Dark Mode** - Smooth theme switching with localStorage persistence
- 📱 **Fully Responsive** - Optimized for all device sizes
- ✨ **Modern Animations** - Subtle framer-motion animations throughout
- 📧 **Contact Form** - Integrated with Resend API for email functionality
- 🛡️ **Spam Protection** - Honeypot field and rate limiting
- ⚡ **Performance** - Optimized with Next.js 15 and modern React patterns

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Styled-components
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Email**: Resend API

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd my-portfolio
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
RESEND_API_KEY=re_your_api_key_here
```

Get your Resend API key from [https://resend.com/api-keys](https://resend.com/api-keys)

4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Configuration

### Resend Email Setup

1. Sign up for a free account at [Resend](https://resend.com)
2. Get your API key from the dashboard
3. Add it to your `.env.local` file
4. Update the `from` email in `src/app/api/contact/route.ts` with your verified domain (or use `onboarding@resend.dev` for testing)

### Customization

- **Skills**: Edit `src/data.ts` to update your skills list
- **Social Links**: Update social links in `src/data.ts`
- **Theme Colors**: Modify `src/styles/theme.ts` for custom color schemes
- **Content**: Edit `src/components/PageContent.tsx` to update your bio and content

## Build for Production

```bash
npm run build
npm start
```

## Deployment

### Netlify

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variable `RESEND_API_KEY` in Netlify dashboard
5. Deploy!

### Vercel

1. Import your repository to Vercel
2. Add environment variable `RESEND_API_KEY`
3. Deploy automatically on push

## Project Structure

```
my-portfolio/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts      # Contact form API endpoint
│   │   ├── layout.tsx            # Root layout with ThemeProvider
│   │   ├── page.tsx              # Home page
│   │   └── globals.css           # Global styles
│   ├── components/
│   │   ├── Navigation.tsx        # Navigation component
│   │   ├── PageContent.tsx       # Main page content
│   │   └── ThemeToggle.tsx       # Theme toggle button
│   ├── contexts/
│   │   └── ThemeContext.tsx       # Theme context provider
│   ├── styles/
│   │   └── theme.ts              # Theme configuration
│   ├── types/
│   │   └── theme.ts              # TypeScript theme types
│   ├── data.ts                   # Skills and social links data
│   └── styled.d.ts              # Styled-components type definitions
└── public/                        # Static assets
```

## License

MIT

