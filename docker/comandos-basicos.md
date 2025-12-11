# Comandos Docker - Lista Completa

## Build

### docker build
```bash
docker build -t nome-imagem:tag .
```
- Constrói uma imagem a partir do Dockerfile
- `-t` → dá um nome e versão (tag) para a imagem
- `.` → procura Dockerfile no diretório atual

**Exemplo:**
```bash
docker build -t meu-app:1.0 .
docker build -t backend:latest --build-arg NODE_ENV=production .
```

---

## Run (criar e rodar container)

### docker run
```bash
docker run -p 3000:3000 -v ./src:/app/src --name meu-container -d nome-imagem:tag
```
- Cria e inicia um novo container
- `-p` → mapeia portas (local:container). Ex: `-p 3000:3000` = acessa localhost:3000
- `-v` → monta volume (pasta local ligada ao container). Ex: `-v ./src:/app/src` = mudanças no código recarregam
- `--name` → dá um nome ao container
- `-d` → roda em background (detached, não prende o terminal)
- `-it` → roda em modo interativo (terminal, útil para bash)
- `-e` → define variável de ambiente. Ex: `-e NODE_ENV=production`

**Exemplos:**
```bash
docker run -p 3000:3000 -d meu-app:1.0
docker run -it ubuntu bash
docker run -v ./dados:/app/data -e POSTGRES_PASSWORD=senha123 postgres:15
```

---

## PS (listar containers)

### docker ps
```bash
docker ps           # mostra containers rodando agora
docker ps -a        # mostra todos (rodando + parados)
docker ps -q        # mostra só os IDs
```

---

## Stop, Start, Rm (gerenciar containers)

### docker stop
```bash
docker stop nome-container
docker stop ID-container
```
Para um container sem deletar.

### docker start
```bash
docker start nome-container
```
Inicia um container que estava parado.

### docker rm
```bash
docker rm nome-container
docker rm -f nome-container     # força remover mesmo rodando
```
Deleta um container.

### docker rmi (remover imagem)
```bash
docker rmi nome-imagem:tag
docker rmi -f nome-imagem       # força remover
```
Deleta uma imagem.

---

## Logs

### docker logs
```bash
docker logs nome-container          # mostra log completo
docker logs -f nome-container       # segue em tempo real (Ctrl+C para sair)
docker logs --tail 50 nome-container  # mostra últimas 50 linhas
```

---

## Exec (executar comando dentro do container)

### docker exec
```bash
docker exec -it nome-container bash
docker exec nome-container npm test
```
- Roda um comando dentro de um container que está rodando
- `-it` → modo interativo com terminal (útil para bash)

---

## Images (listar imagens)

### docker images
```bash
docker images           # lista todas as imagens locais
docker images -q        # lista só os IDs
```

---

## Docker Compose

### docker compose up
```bash
docker compose up           # sobe os serviços definidos no docker-compose.yml
docker compose up -d        # sobe em background
docker compose up --build   # reconstrói as imagens antes de subir
```

### docker compose down
```bash
docker compose down         # para todos os containers e remove
docker compose down -v      # também remove os volumes (cuidado!)
```

### docker compose logs
```bash
docker compose logs         # mostra logs de todos os serviços
docker compose logs -f      # segue em tempo real
docker compose logs app     # mostra logs só do serviço "app"
```

### docker compose ps
```bash
docker compose ps           # lista os containers do compose em execução
```

---

## Limpeza

### docker system prune
```bash
docker system prune          # remove containers e imagens não usados
docker system prune -a       # remove TUDO não usado (cuidado!)
docker system prune -a --volumes  # inclui volumes também
```

### docker system df
```bash
docker system df            # mostra quanto de espaço Docker está usando
```

---

## Dicas rápidas

| Comando | O que faz |
|---------|-----------|
| `docker build -t app:1.0 .` | Constrói uma imagem |
| `docker run -d -p 3000:3000 app:1.0` | Roda um container |
| `docker ps` | Lista containers rodando |
| `docker logs -f container` | Vê logs em tempo real |
| `docker stop container` | Para um container |
| `docker rm container` | Deleta um container |
| `docker images` | Lista imagens locais |
| `docker compose up -d` | Sobe serviços do compose |
| `docker compose down` | Para serviços do compose |
| `docker system prune` | Limpa espaço em disco |
