# Birthday Web App - Frontend

Next.js 14+ application with TypeScript for a personalized birthday web experience.

## 🚀 Quick Start

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

### Type Check

```bash
npm run lint
npx tsc --noEmit
```

---

## 📁 Project Structure

```
apps/frontend/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # React components
│   │   ├── auth/         # Authentication components
│   │   └── layout/       # Layout components (Navigation, etc.)
│   ├── lib/              # Core libraries
│   │   └── auth/         # Auth utilities (SessionManager, RateLimiter, etc.)
│   ├── contexts/         # React contexts (AuthContext)
│   ├── types/            # TypeScript type definitions
│   ├── hooks/            # Custom React hooks
│   └── utils/            # Utility functions (storage, time, etc.)
├── public/               # Static assets
├── .env.local            # Environment variables (gitignored)
├── .env.local.example    # Environment template
└── vercel.json           # Vercel deployment config
```

---

## 🔧 Environment Variables

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_BIRTHDAY_CODE=0712
```

See [ENV_SETUP.md](./ENV_SETUP.md) for details.

---

## 📚 Documentation

- **[ENV_SETUP.md](./ENV_SETUP.md)** - Environment variables configuration
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Full deployment guide (Vercel, GitHub Pages, Oracle Cloud)
- **[VERCEL_SETUP.md](./VERCEL_SETUP.md)** - Quick Vercel setup (fix for pnpm error)
- **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Common issues and solutions
- **[IMPLEMENTATION_LOG.md](./IMPLEMENTATION_LOG.md)** - Development progress log
- **[VERIFICATION_REPORT.md](./VERIFICATION_REPORT.md)** - Test results and verification

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Configure:
   - Root Directory: `apps/frontend`
   - Build Command: `npm run build`
   - Install Command: `npm install`
4. Add environment variable: `NEXT_PUBLIC_BIRTHDAY_CODE`
5. Deploy!

See [VERCEL_SETUP.md](./VERCEL_SETUP.md) for step-by-step guide.

### GitHub Pages

For static export to GitHub Pages, see [DEPLOYMENT.md](./DEPLOYMENT.md#alternative-github-pages-static-export).

---

## 🎯 Features Implemented

### Phase 1: Setup & Infrastructure ✅ COMPLETED

- [x] Next.js 14+ with TypeScript
- [x] Tailwind CSS 4 configured
- [x] TypeScript interfaces defined (12 types)
- [x] Environment variables setup
- [x] SecureStorage utility (localStorage wrapper)
- [x] Time utilities (15+ functions)
- [x] Security headers (CSP, HSTS, X-Frame-Options, etc.)
- [x] Authentication constants centralized

**Status**: 8/8 tasks completed (100%)

### Phase 2: Core Utilities ⏳ PENDING

- [ ] BirthdayCodeValidator
- [ ] SessionManager
- [ ] RateLimiter
- [ ] Unit tests

**Status**: 0/10 tasks (0%)

### Phase 3: Authentication Context ⏳ PENDING

- [ ] AuthContext provider
- [ ] useAuth hook
- [ ] Login/logout methods
- [ ] Session monitoring

**Status**: 0/10 tasks (0%)

### Phase 4: UI Components ⏳ PENDING

- [ ] LoginScreen
- [ ] ProtectedRoute
- [ ] UnlockAnimation
- [ ] Navigation

**Status**: 0/18 tasks (0%)

**Overall Progress**: 8/60 tasks (13%)

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16.4.2
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Bundler**: Turbopack
- **Linting**: ESLint 9
- **Package Manager**: npm (Vercel compatible)

---

## 🔒 Security

- ✅ Content Security Policy (CSP)
- ✅ HTTP Strict Transport Security (HSTS)
- ✅ X-Frame-Options (clickjacking protection)
- ✅ X-Content-Type-Options (MIME sniffing protection)
- ✅ Referrer Policy configured
- ✅ Environment variables for sensitive data

See security headers in `next.config.ts`.

---

## 📊 Performance

- **Build time**: ~20s (cold), ~10s (cached)
- **Dev server startup**: ~2.6s
- **Hot reload**: ~100-300ms (Turbopack)
- **Target bundle size**: <200KB gzipped

---

## 🧪 Testing

### Type Check
```bash
npx tsc --noEmit
```

### Lint
```bash
npm run lint
```

### Build Test
```bash
npm run build
```

All tests pass ✅ (see [VERIFICATION_REPORT.md](./VERIFICATION_REPORT.md))

---

## 🐛 Troubleshooting

Having issues? Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for common problems and solutions.

Common issues:
- Port 3000 already in use
- Environment variables not loaded
- TypeScript errors
- Module not found errors
- Vercel deployment fails

---

## 🤝 Contributing

### Development Workflow

1. Create a feature branch
2. Make changes
3. Run tests: `npm run lint` && `npx tsc --noEmit`
4. Build test: `npm run build`
5. Commit and push
6. Create pull request

### Code Style

- TypeScript strict mode enabled
- ESLint configured
- Prettier recommended
- JSDoc comments on public APIs

---

## 📄 License

Private project - Birthday gift

---

## 🎉 Credits

Built with ❤️ using:
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/)

---

## 📞 Support

- **Documentation**: Check `*.md` files in this directory
- **Issues**: Review [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- **Deployment**: See [VERCEL_SETUP.md](./VERCEL_SETUP.md)

---

**Last Updated**: October 21, 2026  
**Status**: Phase 1 Complete, Ready for Phase 2
