### instalar depedencias de desarrollo
FROM node:alpine AS dev-deps
# env
ENV NODE_ENV=development
# instalacion modules
WORKDIR /app
COPY package*.json ./
RUN npm i

### fase final de desarrollo
FROM node:alpine AS dev
# env
ENV NODE_ENV=development
ENV PORT=5173
# expone puerto que se va a usar
EXPOSE ${PORT}
# copia los modulos y package.json
WORKDIR /app
COPY --from=dev-deps /app ./
#copia otros archivos del host
COPY vite.config.js ./
COPY index.html ./
# volumen para hot reloading
VOLUME /app/src
VOLUME /app/public
# Default command
CMD ["npm", "run", "dev"]
