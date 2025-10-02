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
ENV PORT=3000
# expone puerto que se va a usar
EXPOSE ${PORT}
# copia los modulos y package.json
WORKDIR /app
COPY --from=dev-deps /app ./
# volumen para hot reloading
VOLUME /app/src
# Default command
CMD ["npm", "run", "dev"]
