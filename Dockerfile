FROM debian:11.6-slim as builder

WORKDIR /app

RUN apt update \
  && apt install curl unzip -y

# install bun at a given version
ARG VERSION=0.6.3
RUN curl https://bun.sh/install | bash -s bun-v${VERSION}

COPY package.json .
COPY bun.lockb .

RUN /root/.bun/bin/bun install --production

# app
FROM gcr.io/distroless/base

WORKDIR /app

COPY --from=builder /root/.bun/bin/bun bun
COPY --from=builder /app/node_modules node_modules

COPY lib lib
COPY src src
COPY tsconfig.json .

ENV ENV production
CMD ["./bun", "src/index.ts"]

EXPOSE 3000