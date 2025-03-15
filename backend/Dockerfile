# Build stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /usr/src/app

# Copy package files first to leverage Docker cache
COPY package*.json ./

# Install ALL dependencies (including dev dependencies)
RUN npm install

# Copy application files
COPY . .

# If you have a build step, add it here
RUN npm run build || true

# Production stage
FROM node:20-alpine

# Install dumb-init and security updates
RUN apk add --no-cache dumb-init curl \
  && apk upgrade --no-cache

# Create non-root user
RUN addgroup -S nodejs && adduser -S nodejs -G nodejs

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install production dependencies and tsx globally
RUN npm install --production \
  && npm install -g tsx

# Copy built application from builder stage
COPY --from=builder --chown=nodejs:nodejs /usr/src/app ./

# Set NODE_ENV
ENV NODE_ENV=production

# Set user
USER nodejs

# Health check
# HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
#   CMD curl -f http://localhost:3001/health || exit 1

# Expose port
EXPOSE 3001

# Use dumb-init as entrypoint
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["npm", "start"]
