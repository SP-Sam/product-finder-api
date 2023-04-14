FROM node:18-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache udev ttf-freefont chromium git

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser \
    PORT=3000 \
    ENVIRONMENT=production \
    DATABASE_URL=postgresql://postgres:sPeg1UkamAzgmUB1@db.frnlqmpdcmiuetfnhbwi.supabase.co:5432/postgres

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 3000

RUN npm run build

CMD ["npm", "start"]
