# Remote (HTTP) MCP server for company-dossier.
# Build:  docker build -t company-dossier-mcp .
# Run:    docker run -p 8787:8787 company-dossier-mcp
FROM node:20-slim AS build
WORKDIR /app

# Install dependencies first (better layer caching).
COPY package.json package-lock.json ./
RUN npm ci

# Build the bundle (produces dist/mcp-http.js).
COPY tsconfig.json tsup.config.ts ./
COPY src ./src
RUN npm run build

# ---- Runtime image ----
FROM node:20-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8787

# Only production deps + built output are needed at runtime.
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=build /app/dist ./dist

EXPOSE 8787
CMD ["node", "dist/mcp-http.js"]
