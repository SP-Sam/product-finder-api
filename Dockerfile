FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      nodejs \
      yarn

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser \
    PORT=3000 \
    ENVIRONMENT=production \
    DATABASE_URL=postgresql://postgres:sPeg1UkamAzgmUB1@db.frnlqmpdcmiuetfnhbwi.supabase.co:5432/postgres

RUN addgroup -S pptruser && adduser -S -G pptruser pptruser \
    && mkdir -p /home/pptruser/Downloads /app \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /app

COPY . /app

RUN npm install

RUN npm run build

EXPOSE 3000

USER pptruser

CMD ["npm", "start"]
