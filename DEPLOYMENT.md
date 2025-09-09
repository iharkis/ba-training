# Deployment Guide

## Vercel Deployment (Recommended)

Vercel is the best platform for this Next.js application as it supports both static pages and API routes.

### Option 1: Deploy with Vercel CLI

1. **Install Vercel CLI globally:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy from your project directory:**
   ```bash
   vercel
   ```
   
3. **Follow the prompts:**
   - Link to existing project or create new? → Create new
   - Project name → Accept default or customize
   - Directory → Accept default (should be `.`)
   - Want to override settings? → No

4. **Your app will be deployed!** The admin dashboard will work fully with API routes.

### Option 2: Deploy via GitHub Integration

1. **Push your code to GitHub** (if not already done)

2. **Visit [vercel.com](https://vercel.com) and sign in**

3. **Import your repository:**
   - Click "New Project"
   - Import from Git
   - Select your repository
   - Deploy!

### Option 3: Deploy via Git Integration (Automatic)

1. **Connect your Git repository to Vercel**
2. **Every push to `main` branch will auto-deploy**

## Environment Variables

If you need environment variables in production, add them in the Vercel dashboard:
- Go to your project settings
- Navigate to Environment Variables
- Add any required variables

## Admin Dashboard

After deployment, the admin dashboard will be available at:
`https://your-app-name.vercel.app/admin`

Default password: `ministry-admin-2025`

## GitHub Pages (Static Only)

If you still want to use GitHub Pages for static deployment (admin won't work):

1. **Create a static build:**
   ```bash
   npm run build:static
   ```

2. **Use the GitHub Actions workflow** already created in `.github/workflows/deploy.yml`

3. **Note:** API routes won't work, so the admin dashboard will show errors.

## Local Development

To run locally with full functionality:
```bash
npm install
npm run dev
```

Visit `http://localhost:3000` - all features including admin will work.

## Vercel Configuration

The `vercel.json` file configures:
- Build command
- API route timeouts
- Deployment regions
- Environment settings

## Troubleshooting

### Admin Dashboard Shows 404 Errors
- **On Vercel:** Should work automatically
- **On GitHub Pages:** Expected - API routes not supported
- **Locally:** Run `npm run dev` instead of serving static files

### Build Errors
- Run `npm run type-check` to check TypeScript
- Run `npm run lint` to check code style
- Check `next.config.js` configuration

### API Issues
- Ensure API routes are in `app/api/` directory
- Check function timeouts in `vercel.json`
- Verify data directory permissions for local file storage