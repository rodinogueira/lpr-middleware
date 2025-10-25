# ----------------------------
# BUILD STAGE
# ----------------------------
FROM node:18-alpine AS builder

WORKDIR /app

# Install required build dependencies
RUN apk add --no-cache openssl

# Copy dependency files first (for better layer caching)
COPY package*.json ./
COPY prisma ./prisma/

# Install all dependencies (including dev)
RUN npm ci

# Copy the rest of the source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build


# ----------------------------
# PRODUCTION STAGE
# ----------------------------
FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache openssl

# Copy only production dependencies
COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci --omit=dev

# Copy build output from builder
COPY --from=builder /app/dist ./dist

# Copy assets if they exist
RUN mkdir -p dist/assets && \
    if [ -d "/app/src/assets" ]; then \
    cp -r /app/src/assets/* ./dist/assets/ || true; \
    fi

# Copy certificates if required
RUN mkdir -p src/certs && \
    touch src/certs/certificate.pem src/certs/private-key.pem src/certs/ca-cert.pem

# Environment setup
ENV NODE_ENV=production
ENV PORT=5000

# Generate Prisma client
RUN npx prisma generate

# Expose port
EXPOSE 5000

# Run app
CMD ["node", "dist/main.js"]