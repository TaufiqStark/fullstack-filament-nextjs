# # proyek-fullstack/client-app/Dockerfile

# # --- Tahap 1: Dependensi & Builder ---
# FROM node:18-alpine AS deps

# WORKDIR /app

# # Salin package.json dan lock file
# COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# # Install dependensi berdasarkan lock file
# RUN \
#   if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
#   elif [ -f package-lock.json ]; then npm ci; \
#   elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
#   else echo "Lockfile not found." && exit 1; \
#   fi

# # --- Tahap 2: Builder ---
# FROM node:18-alpine AS builder
# WORKDIR /app

# # Terima build arg untuk NEXT_PUBLIC_API_URL dan set sebagai ENV
# # Nilai ARG ini akan diberikan oleh GitHub Actions saat CI
# ARG NEXT_PUBLIC_API_URL_ARG
# ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL_ARG}

# COPY --from=deps /app/node_modules ./node_modules
# COPY . .

# # Jalankan build Next.js
# # NEXT_PUBLIC_API_URL akan digunakan oleh build process
# RUN npm run build

# # --- Tahap 3: Runner (Produksi) ---
# FROM node:18-alpine AS runner
# WORKDIR /app

# ENV NODE_ENV production

# # (Opsional) Buat user non-root untuk keamanan
# # RUN addgroup --system --gid 1001 nodejs
# # RUN adduser --system --uid 1001 nextjs

# # Salin artefak build dari builder stage
# # Menggunakan output 'standalone' dari next.config.js
# COPY --from=builder /app/public ./public
# COPY --from=builder --chown=node:node /app/.next/standalone ./ 
# COPY --from=builder --chown=node:node /app/.next/static ./.next/static

# # USER nextjs # Jika menggunakan user non-root
# EXPOSE 3000
# ENV PORT 3000 
# # Next.js akan berjalan di port ini di dalam kontainer

# # Jalankan aplikasi Next.js (menggunakan output standalone)
# CMD ["node", "server.js"]


# proyek-fullstack/client-app/Dockerfile
# --- Tahap 1: Base Node untuk dependensi & builder ---
FROM node:18-alpine AS base
WORKDIR /app

# --- Tahap 2: Dependensi ---
FROM base AS deps
# Salin package.json dan lock file
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
# Install dependensi
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else npm install; \
  fi

# --- Tahap 3: Builder ---
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Terima build arg untuk NEXT_PUBLIC_API_URL
# Nilai ini akan diberikan oleh docker-compose.yml saat build
ARG NEXT_PUBLIC_API_URL_ARG
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL_ARG}

RUN echo "Building Next.js with NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}"
RUN npm run build

# --- Tahap 4: Runner (Produksi/Deployable) ---
FROM base AS runner
ENV NODE_ENV=production
# Output standalone memerlukan Next.js 12+ dan `output: 'standalone'` di next.config.js
COPY --from=builder /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

# Jalankan sebagai user non-root
# USER node 
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]