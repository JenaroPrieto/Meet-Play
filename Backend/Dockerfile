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
WORKDIR /app
# Copia archivos del host
COPY . .
# copia los modulo
COPY --from=dev-deps /app/node_modules ./node_modules
# volumen para hot reloading
VOLUME /app/src
# Default command
CMD ["sh", "./scripts/dev-migrate-run.sh"]
