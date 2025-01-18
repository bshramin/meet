# Build stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /usr/src/app

# Copy package.json
COPY package.json ./

# Install dependencies
RUN npm install --production

# Copy application files
COPY . .

# Production stage
FROM node:20-alpine

# Install dumb-init
RUN apk add --no-cache dumb-init curl

# Create non-root user
RUN addgroup -S nodejs && adduser -S nodejs -G nodejs

# Set working directory
WORKDIR /usr/src/app

# Copy built application from builder stage
COPY --from=builder --chown=nodejs:nodejs /usr/src/app ./

# Set NODE_ENV
ENV NODE_ENV=production

# Set user
USER nodejs

# Expose port
EXPOSE 3000

# Use dumb-init as entrypoint
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["npm", "start"]