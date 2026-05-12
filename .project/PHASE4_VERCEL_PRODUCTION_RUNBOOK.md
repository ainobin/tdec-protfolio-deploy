# Phase 4: Vercel Setup & Deployment (Production Runbook)

Date: May 12, 2026
Project: TDEC (Next.js 16)

This runbook is step-by-step and execution-focused for a production-grade deployment.

## 1. Pre-Deployment Gate (Must Pass)

1. Ensure current branch is clean and pushed.
2. Run local production build:

```bash
npm run build
```

3. If build passes, run production server smoke test:

```bash
npm run start
```

4. Validate key routes quickly in browser:
- /
- /about
- /services
- /doctors
- /gallery
- /admin/login

5. Stop local server.

Exit criteria:
- Build succeeds with zero fatal errors.
- Main pages and admin login load.

## 2. Vercel Project Creation

Option A (recommended): Vercel Dashboard
1. Open https://vercel.com/new.
2. Import your Git repository.
3. Select root directory: project root (where package.json exists).
4. Framework should auto-detect as Next.js.
5. Keep default build command (`next build`) unless Vercel detects a different valid default.

Option B: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

During prompts:
- Link to existing project? choose No (first deploy) or Yes (if already created).
- Project name: choose stable production name.
- Root directory: `.`

## 3. Configure Environment Variables (Production)

Source of truth: .env.production in this repo.

Add these in Vercel:
Vercel Dashboard -> Project -> Settings -> Environment Variables

Required keys:
- MONGODB_URI
- MONGODB_DB_NAME
- ADMIN_USERNAME
- ADMIN_PASSWORD
- JWT_SECRET
- IMAGEKIT_PUBLIC_KEY
- IMAGEKIT_PRIVATE_KEY
- IMAGEKIT_URL_ENDPOINT
- NEXT_PUBLIC_ADMIN_EXPIRE_IN

Recommended additional key:
- NEXT_PUBLIC_APP_URL = your production domain (for example, https://your-domain.com)

Rules:
1. Scope all keys to Production.
2. Also add to Preview if you want preview branches fully functional.
3. Do not commit real secrets in git-tracked files.

## 4. Deployment Configuration Validation

1. Confirm vercel.json exists and is minimal:
- framework: nextjs

2. Confirm image domains in next.config.mjs include:
- ik.imagekit.io
- img.youtube.com
- i.ytimg.com

3. Commit and push latest changes before production deploy.

## 5. Deploy to Production

Dashboard deployment:
1. Go to Project -> Deployments.
2. Click Deploy on main branch commit.
3. Watch build logs in real time.

CLI deployment (alternative):

```bash
vercel --prod
```

Exit criteria:
- Deployment reaches Ready state.
- Vercel provides production URL.

## 6. Post-Deployment Verification (Critical)

Run this checklist against production URL.

1. Public pages:
- Home, About, Services, Doctors, Gallery all load.

2. Admin auth:
- POST /api/admin/login works with configured credentials.
- Admin pages load after login.

3. Data APIs:
- GET /api/services
- GET /api/doctors
- GET /api/gallery
- GET /api/carousel
- GET /api/ads/active

4. Protected API behavior:
- GET /api/ads without token returns 401 (expected).
- With token, returns data.

5. Upload flow:
- POST /api/upload returns success and ImageKit URL.
- Newly uploaded image is visible in gallery.

6. Image delivery:
- No Next image optimizer upstream 400 for ImageKit URLs.

7. Database stability:
- No Mongo timeout/auth errors in Vercel logs.

## 7. Observability and Error Checks

1. Open Vercel Project -> Logs.
2. Check both Build Logs and Runtime Logs.
3. Confirm no recurring errors for:
- JWT secret missing
- Mongo authentication failure
- ImageKit configuration missing

4. If errors appear, fix env values first, then redeploy.

## 8. Rollback Plan (Production Safety)

If deployment is unhealthy:
1. Vercel -> Deployments.
2. Open previous healthy deployment.
3. Promote/Redeploy that version.
4. Keep broken deployment for diagnosis, do not delete immediately.

## 9. Final Sign-Off Checklist

Mark Phase 4 tasks complete only when all are true:
- [ ] Task 4.1 Local build verification done
- [ ] Task 4.2 Vercel project created/linked
- [ ] Task 4.3 Production env vars configured
- [ ] Task 4.4 Production deployment completed
- [ ] Task 4.5 Post-deployment verification passed

## 10. Quick Command Pack

Use this for fast execution from project root:

```bash
npm run build && npm run start
# stop after smoke test

# optional CLI path
vercel login
vercel
vercel --prod
```

## Notes Specific to This Codebase

1. Server ImageKit SDK must stay server-side only.
2. Client gallery now generates transform URLs directly; keep IMAGEKIT_URL_ENDPOINT correct.
3. JWT and admin credentials are runtime-critical for admin/API access.
