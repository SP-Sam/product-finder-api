FROM ghcr.io/puppeteer/puppeteer:19.8.5

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable \
    PORT=3000 \
    ENVIRONMENT=production \
    DATABASE_URL=postgresql://postgres:F%21oJ%23R05FhaG%21rYM@db.casrubdwslrdkmfdpnsz.supabase.co:5432/postgres

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci
COPY ./prisma prisma
COPY . .
RUN npm run build
CMD ["node", "-r", "dotenv/config", "./dist/src/server.js"]
