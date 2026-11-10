# AZARI TRADE AI — production image
# Builds the React dashboard and runs the Express server (with engines) under tsx.
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci || npm install
COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev || npm install --omit=dev
# Runtime still needs tsx + typescript for the server (tsx is in devDeps in some setups):
RUN npm install tsx@^4.23.15
COPY --from=build /app/dist ./dist
COPY migrations ./migrations
COPY server ./server
COPY tsconfig.server.json ./
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/health || exit 1
CMD ["node_modules/.bin/tsx", "server/index.ts"]
