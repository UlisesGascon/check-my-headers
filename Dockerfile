# Dockerfile for check-my-headers
# License: MIT
# © Ulises Gascon 2020
FROM node:12-alpine
LABEL org.label-schema.name="check-my-headers" \
    org.label-schema.description="check-my-headers Docker image" \
    org.label-schema.url="https://www.npmjs.com/package/check-my-headers" \
    org.label-schema.vcs-url="https://github.com/ulisesgascon/check-my-headers" \
    org.label-schema.maintainer="ulisesgascon" \
    org.label-schema.schema-version="1.0" \
    org.label-schema.docker.cmd="docker run --rm -e SCAN_URL='https://example.com' ulisesgascon/check-my-headers:latest"

# Configure npm
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

# Set SCAN_URL env to satisfy at build and/or container runtime.
ENV SCAN_URL="https://github.com/ulisesgascon/check-my-headers"

RUN mkdir -p /home/node/check-my-headers
WORKDIR /home/node/check-my-headers

# Install from npmjs.com
RUN npm install --only=prod -g check-my-headers

CMD ["sh", "-c", "npx check-my-headers $SCAN_URL"]