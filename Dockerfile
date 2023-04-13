FROM ghcr.io/puppeteer/puppeteer:19.8.5

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable \
    PORT=3000 \
    ENVIRONMENT=production \
    DATABASE_URL=postgresql://postgres:sPeg1UkamAzgmUB1@db.frnlqmpdcmiuetfnhbwi.supabase.co:5432/postgres

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
ENTRYPOINT ["npm", "start"]
