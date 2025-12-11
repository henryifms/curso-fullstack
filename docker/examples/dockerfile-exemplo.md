# Dockerfile comentado - Exemplo Node.js

FROM node:20
# imagem base: Node.js versão 20 (https://hub.docker.com/_/node)
# toda imagem começa com FROM, que define a base para construir em cima

WORKDIR /app
# define a pasta de trabalho dentro do container
# todos os próximos comandos rodam aqui
# se não existir, Docker cria automaticamente

COPY package*.json ./
# copia package.json e package-lock.json (o * significa "qualquer um")
# do computador local (.) para dentro do container (./)
# precisa estar antes de "npm install" porque a gente vai instalar dependências

RUN npm install
# executa npm install dentro do container
# instala todas as dependências listadas no package.json
# resultado fica na pasta /app/node_modules do container

COPY . .
# copia TODO o resto do código do projeto
# (depois de npm install para aproveitar cache do Docker)

EXPOSE 3000
# expõe a porta 3000
# é só documentação, não mapeia porta automaticamente
# o mapeamento real acontece com "docker run -p 3000:3000"

CMD ["npm", "start"]
# comando que roda quando o container inicia
# neste caso: executa "npm start"
# pode ser também:
#   CMD ["node", "server.js"]
#   CMD ["npm", "run", "dev"]

# --- Como usar este Dockerfile ---
# 
# 1. Construir a imagem:
#    docker build -t meu-app:1.0 .
#
# 2. Rodar um container dessa imagem:
#    docker run -p 3000:3000 meu-app:1.0
#
# 3. Com volume (para reload automático em desenvolvimento):
#    docker run -p 3000:3000 -v ./src:/app/src -d meu-app:1.0
