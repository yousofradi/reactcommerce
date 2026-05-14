# React Commerce - Deployment Guide

This repository contains a modern eCommerce platform split into two parts:
1. **Frontend:** A Next.js (React) application.
2. **Backend:** A Node.js (Express) server using TypeScript and Prisma ORM (PostgreSQL).

Follow these instructions to deploy your application to a hosting provider like Render, Vercel, or Heroku without using a pre-configured blueprint.

---

## 1. Prerequisites

Before deploying, ensure you have the following ready:
* A **PostgreSQL** database hosted somewhere (e.g., Supabase, Render PostgreSQL, AWS RDS). You will need the Connection URI (`DATABASE_URL`).
* A **Cloudinary** account (if using image uploads). You need the Cloud Name, API Key, and API Secret.
* Accounts on your chosen hosting providers (e.g., Vercel for Frontend, Render for Backend).

---

## 2. Deploying the Backend (Node.js/Express)

The backend handles your API routes, database connections, and authentication. Render is highly recommended for hosting this.

### Step-by-Step for Render (Web Service):
1. **Connect your Repository:** Go to Render dashboard and create a new **Web Service**. Connect it to your Git repository.
2. **Setup Configurations:**
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install && npx prisma generate && npx tsc`
   - **Start Command:** `npm start` (Make sure your `package.json` has `"start": "node dist/server.js"`)
3. **Environment Variables:** Add the following environment variables under the "Environment" tab:
   - `DATABASE_URL`: Your PostgreSQL connection string.
   - `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name.
   - `CLOUDINARY_API_KEY`: Your Cloudinary API key.
   - `CLOUDINARY_API_SECRET`: Your Cloudinary API secret.
   - `PORT`: `5000` (Render will automatically assign a port, but this is good practice).
   - `NODE_ENV`: `production`
4. **Deploy:** Save and deploy. Once finished, Render will give you a public URL (e.g., `https://your-backend.onrender.com`). **Save this URL.**

### Database Migration:
After your database is connected, you must push the Prisma schema to create the tables.
* If deploying manually via terminal: Run `npx prisma db push` or `npx prisma migrate deploy` locally while `DATABASE_URL` is set to your production database.

---

## 3. Deploying the Frontend (Next.js)

The frontend is the user interface. Vercel is the creator of Next.js and provides the best hosting experience, but Render or Netlify work perfectly too.

### Step-by-Step for Vercel:
1. **Import Project:** Go to Vercel and create a new project. Import your Git repository.
2. **Configure Project:**
   - **Framework Preset:** Next.js
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Install Command:** `npm install`
3. **Environment Variables:** Add the following environment variable:
   - `NEXT_PUBLIC_API_URL`: The URL of your deployed backend from Step 2 (e.g., `https://your-backend.onrender.com/api`). **Do not include a trailing slash.**
4. **Deploy:** Click deploy. Vercel will build and launch your site.

### Step-by-Step for Render (Static Site or Web Service):
If you prefer to keep everything on Render:
1. Create a new **Web Service**.
2. **Root Directory:** `frontend`
3. **Environment:** `Node`
4. **Build Command:** `npm install && npm run build`
5. **Start Command:** `npm run start`
6. **Environment Variables:**
   - `NEXT_PUBLIC_API_URL`: Your backend API URL.
7. **Deploy.**

---

## 4. Post-Deployment Checklist

1. **Test the Storefront:** Visit your frontend URL. Verify that products and collections load correctly.
2. **Test the Admin Dashboard:** Navigate to `/admin` and try creating a product to ensure the backend connection and database are working.
3. **Image Uploads:** Upload an image in the product form to verify Cloudinary integration is active.

## Local Development
To run both servers locally:
1. **Backend:** `cd backend`, `npm install`, set `.env`, then run `npm run dev`.
2. **Frontend:** `cd frontend`, `npm install`, set `.env.local` (`NEXT_PUBLIC_API_URL=http://localhost:5000/api`), then run `npm run dev`.
