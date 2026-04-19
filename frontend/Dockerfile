//install depedenci
FROM node:14-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

//buil app
FROM node:14-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

//runer
FROM node:14-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next/standalone ./ 
COPY --from=builder /app/.next/static ./static

EXPOSE 3000
CMD ["node", "server.js"]

