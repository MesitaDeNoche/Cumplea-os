# Troubleshooting Guide - Frontend

## Common Issues and Solutions

### Issue: Server won't start

**Symptoms**:
- `npm run dev` fails
- Port 3000 already in use
- Module not found errors

**Solutions**:

1. **Port already in use**:
   ```bash
   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <process_id> /F
   
   # Or use different port
   $env:PORT=3001; npm run dev
   ```

2. **Clean install**:
   ```bash
   rm -rf node_modules
   rm package-lock.json
   npm install
   ```

3. **Clear Next.js cache**:
   ```bash
   rm -rf .next
   npm run dev
   ```

### Issue: TypeScript errors

**Symptoms**:
- Type errors during development
- `tsc` command fails

**Solutions**:

1. **Check tsconfig.json**:
   ```bash
   npx tsc --noEmit
   ```

2. **Restart TypeScript server** (in VS Code):
   - `Ctrl+Shift+P`
   - "TypeScript: Restart TS Server"

3. **Update types**:
   ```bash
   npm install --save-dev @types/react@latest @types/node@latest
   ```

### Issue: Environment variables not loaded

**Symptoms**:
- `process.env.NEXT_PUBLIC_BIRTHDAY_CODE` is undefined
- Authentication fails

**Solutions**:

1. **Check .env.local exists**:
   ```bash
   cat .env.local
   # Should show: NEXT_PUBLIC_BIRTHDAY_CODE=0712
   ```

2. **Restart dev server**:
   - Stop current server (Ctrl+C)
   - Run `npm run dev` again
   - Environment variables are loaded on server start

3. **Verify variable name**:
   - Must start with `NEXT_PUBLIC_` for client-side access
   - Must be in `.env.local` (not `.env`)

### Issue: Module not found

**Symptoms**:
- `Cannot find module '@/...'`
- Import errors

**Solutions**:

1. **Check path aliases in tsconfig.json**:
   ```json
   {
     "compilerOptions": {
       "paths": {
         "@/*": ["./src/*"]
       }
     }
   }
   ```

2. **Verify file exists**:
   ```bash
   ls src/types/auth.ts
   ls src/utils/storage.ts
   ```

3. **Restart dev server**

### Issue: Build fails

**Symptoms**:
- `npm run build` errors
- Static export fails

**Solutions**:

1. **Check for dynamic imports**:
   - Ensure all imports are properly resolved
   - Check for circular dependencies

2. **Review next.config.ts**:
   ```bash
   cat next.config.ts
   ```

3. **Try clean build**:
   ```bash
   rm -rf .next
   npm run build
   ```

### Issue: Styles not loading

**Symptoms**:
- Tailwind classes not working
- No styles applied

**Solutions**:

1. **Check Tailwind configuration**:
   ```bash
   cat tailwind.config.ts
   ```

2. **Verify CSS import**:
   - Check `app/globals.css` imports Tailwind directives
   - Verify `layout.tsx` imports `./globals.css`

3. **Restart dev server with Turbopack**:
   ```bash
   npm run dev
   ```

### Issue: Hot reload not working

**Symptoms**:
- Changes don't reflect in browser
- Need to manually refresh

**Solutions**:

1. **Check file watchers** (Windows):
   ```bash
   # Increase file watcher limit (in admin PowerShell)
   Set-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\Session Manager\Environment" -Name NODE_OPTIONS -Value "--max-old-space-size=4096"
   ```

2. **Restart dev server**

3. **Check browser cache**:
   - Hard refresh: `Ctrl+Shift+R`
   - Clear cache

### Issue: Next.js 16 breaking changes

**Symptoms**:
- Code from tutorials doesn't work
- API differences from documentation

**Solutions**:

1. **Read Next.js 16 docs**:
   ```bash
   cat node_modules/next/dist/docs/index.md
   ```

2. **Check for deprecation warnings**:
   - Look in terminal output
   - Update deprecated APIs

3. **Common changes in Next.js 16**:
   - App Router is default
   - Server Components by default
   - New caching behavior
   - Updated metadata API

### Issue: Security headers not applied

**Symptoms**:
- CSP violations in console
- Security headers missing

**Solutions**:

1. **Verify next.config.ts**:
   ```typescript
   async headers() {
     return [
       {
         source: '/:path*',
         headers: securityHeaders,
       },
     ];
   }
   ```

2. **Check in browser dev tools**:
   - Network tab → Select request → Headers
   - Look for `Content-Security-Policy`, `X-Frame-Options`, etc.

3. **Restart dev server** after config changes

### Issue: localStorage not working

**Symptoms**:
- SecureStorage errors
- Session not persisting

**Solutions**:

1. **Check browser support**:
   ```javascript
   if (typeof window !== 'undefined' && window.localStorage) {
     // localStorage available
   }
   ```

2. **Clear localStorage**:
   ```javascript
   // In browser console
   localStorage.clear()
   ```

3. **Check for quota issues**:
   - localStorage has 5-10MB limit
   - Use `SecureStorage.getStorageSize()` to check usage

### Issue: Authentication fails

**Symptoms**:
- Birthday code not accepted
- Rate limiter blocking

**Solutions**:

1. **Verify birthday code**:
   ```bash
   # Check .env.local
   cat .env.local
   # Should be exactly 4 digits (DDMM format)
   ```

2. **Clear rate limiter**:
   ```javascript
   // In browser console
   localStorage.removeItem('auth_rate_limit')
   ```

3. **Clear session**:
   ```javascript
   // In browser console
   localStorage.removeItem('birthday_auth_session')
   ```

## Debugging Tips

### Enable verbose logging

Add to `next.config.ts`:
```typescript
const nextConfig = {
  // ... other config
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};
```

### Check Next.js version

```bash
npm list next
# Should show: next@16.4.2
```

### View all environment variables

```bash
# In terminal (shows all NEXT_PUBLIC_ vars)
node -e "console.log(process.env)" | grep NEXT_PUBLIC
```

### TypeScript strict mode issues

If you get too many errors, temporarily disable strict mode in `tsconfig.json`:
```json
{
  "compilerOptions": {
    "strict": false
  }
}
```

(Re-enable later for production)

## Getting Help

1. **Check logs**:
   - Terminal output from `npm run dev`
   - Browser console (F12)
   - Network tab for failed requests

2. **Check documentation**:
   - `node_modules/next/dist/docs/`
   - `VERIFICATION_REPORT.md`
   - `IMPLEMENTATION_LOG.md`

3. **Common log locations**:
   - Next.js logs: Terminal where dev server runs
   - Browser logs: F12 → Console
   - Network errors: F12 → Network tab

## Quick Fixes Checklist

When something breaks, try these in order:

- [ ] Restart dev server
- [ ] Clear browser cache (Ctrl+Shift+Del)
- [ ] Clear Next.js cache (`rm -rf .next`)
- [ ] Check environment variables (`.env.local`)
- [ ] Verify file paths and imports
- [ ] Check TypeScript compilation (`npx tsc --noEmit`)
- [ ] Review recent changes in git
- [ ] Clear localStorage (browser console: `localStorage.clear()`)
- [ ] Reinstall dependencies (`rm -rf node_modules && npm install`)

## Still Having Issues?

Please provide:
1. **Exact error message** (copy-paste from terminal or console)
2. **What you were doing** when error occurred
3. **Browser and version** (if relevant)
4. **Steps to reproduce**

---

**Last Updated**: October 21, 2026
