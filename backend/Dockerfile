# Build stage
FROM node:18-slim AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (using regular install instead of ci)
RUN npm install

# Copy source code
COPY . .

# Build the application (if you have a build step)
RUN npm run build --if-present

# Production stage
FROM node:18-slim

WORKDIR /app

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs && \
  adduser --system --uid 1001 expressuser && \
  chown -R expressuser:nodejs /app

# Set NODE_ENV
ENV NODE_ENV production

# Copy package files
COPY package*.json ./

# Install production dependencies
RUN npm install --only=production && \
  npm cache clean --force

# Copy built application from builder stage
COPY --from=builder --chown=expressuser:nodejs /app/dist ./dist
COPY --from=builder --chown=expressuser:nodejs /app/src ./src

# Switch to non-root user
USER expressuser

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
