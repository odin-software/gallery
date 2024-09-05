FROM golang:1.22

WORKDIR /app

COPY . ./

ENV NODE_VERSION=18.19.0
RUN apt install -y curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
ENV NVM_DIR="/root/.nvm"
RUN . "$NVM_DIR/nvm.sh" && nvm install $NODE_VERSION
RUN . "$NVM_DIR/nvm.sh" && nvm use v$NODE_VERSION
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v$NODE_VERSION
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"

RUN node --version
RUN npm --version


RUN npm install -g pnpm rollup

RUN pnpm install
RUN rollup -c

RUN go build -o ./tmp/main .

EXPOSE 9110

CMD ["./tmp/main"]
