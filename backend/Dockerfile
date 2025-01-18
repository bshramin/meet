# Build stage
FROM node:18-slim AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application (if you have a build step)
RUN npm run build --if-present

# Production stage
FROM node:18-slim

# Set working directory
WORKDIR /app

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs && \
  adduser --system --uid 1001 expressuser && \
  chown -R expressuser:nodejs /app

# Set NODE_ENV
ENV NODE_ENV production

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production && \
  npm cache clean --force

# Copy built application from builder stage
COPY --from=builder --chown=expressuser:nodejs /app/dist ./dist
COPY --from=builder --chown=expressuser:nodejs /app/src ./src

# Switch to non-root user
USER expressuser

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:3000/health || exit 1

# Start the application
CMD ["npm", "start"]
