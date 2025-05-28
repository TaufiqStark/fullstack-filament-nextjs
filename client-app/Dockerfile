# client-app/Dockerfile

# Tahap 1: Instalasi dependensi dan build aplikasi
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Tahap 2: Produksi - Menjalankan aplikasi
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

# Anda bisa menambahkan user non-root di sini untuk keamanan
# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# USER nextjs # Jika menggunakan user non-root
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
