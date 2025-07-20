# Build the applicaiton
FROM node:20-alpine AS builder
WORKDIR /build-stage
COPY package*.json ./
RUN npm ci --ignore-scripts
COPY . ./
RUN npm run build

# Install Producation depeandncy 
FROM node:20-alpine AS production-depandancy
WORKDIR /dependancy-stage
COPY package*.json .
RUN npm ci --omit=dev --ignore-scripts

# Prepare production image
FROM node:20-slim AS production 
WORKDIR /app
COPY --from=production-depandancy --chown=node:node /dependancy-stage/node_modules ./node_modules 
COPY --from=builder --chown=node:node /build-stage/dist ./dist
USER  node 
ENTRYPOINT ["node", "dist/src/main.js"]

