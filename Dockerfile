FROM node:lts-alpine

WORKDIR /app

RUN apk update && apk add --no-cache nmap && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk update && \
    apk add --no-cache \
      chromium \
      harfbuzz \
      "freetype>2.8" \
      ttf-freefont \
      nss

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PORT=3000 \
    ENVIRONMENT=production \
    DATABASE_URL=postgresql://postgres:sPeg1UkamAzgmUB1@db.frnlqmpdcmiuetfnhbwi.supabase.co:5432/postgres

COPY . /app

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
