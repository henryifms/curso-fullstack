version: '3.8'
# versão do compose format
# 3.8 é estável e suporta tudo que você precisa

services:
  app:
    # nome do primeiro serviço (pode ser qualquer coisa)
    
    build: .
    # constrói a imagem a partir do Dockerfile na pasta atual
    # equivalente a: docker build -t projeto_app:latest .
    
    container_name: meu-app-container
    # nome que o container vai ter quando rodar
    # sem isso, Docker gera um nome aleatório
    
    ports:
      - "3000:3000"
    # mapeia porta local para container
    # formato: porta_local:porta_container
    # acessa no navegador: localhost:3000
    
    volumes:
      - ./src:/app/src
      - ./package.json:/app/package.json
    # monta pastas locais dentro do container
    # mudanças no código local recarregam no container (útil desenvolvimento)
    # ./src:/app/src = a pasta "src" local fica sincronizada com /app/src do container
    
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://postgres:senha123@db:5432/meu_banco
      - DB_HOST=db
      - DB_PORT=5432
      - DB_USER=postgres
      - DB_PASSWORD=senha123
      - DB_NAME=meu_banco
    # variáveis de ambiente do container
    # acesso dentro da app: process.env.NODE_ENV, process.env.DATABASE_URL, etc.
    # note: DB_HOST=db = conecta no serviço "db" automaticamente (rede interna Docker)
    
    depends_on:
      - db
    # especifica que este serviço depende do "db"
    # Docker vai tentar iniciar "db" antes de "app"
    
    restart: unless-stopped
    # política de restart:
    # unless-stopped = reinicia o container se parar (exceto se você parar manualmente)
    # outras opções: no, always, on-failure

  db:
    # segundo serviço (banco de dados PostgreSQL)
    
    image: postgres:15
    # usa imagem pronta do Docker Hub (https://hub.docker.com/_/postgres)
    # não precisa de Dockerfile próprio
    # ":15" especifica a versão
    
    container_name: meu-postgres
    # nome do container
    
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=senha123
      - POSTGRES_DB=meu_banco
      - POSTGRES_INITDB_ARGS=--encoding=UTF8
    # variáveis que o PostgreSQL lê para configurar o banco
    # POSTGRES_USER/PASSWORD/DB = credenciais do banco
    # quando o container inicia pela primeira vez, cria o banco com essas configs
    
    ports:
      - "5432:5432"
    # porta do PostgreSQL
    # acesso local: localhost:5432
    # mas no container da app, acessa como "db:5432" (rede interna)
    
    volumes:
      - db-data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    # db-data:/var/lib... = volume nomeado que persiste dados do banco
    #   (sem isso, quando db para, perdem todos os dados)
    # ./init.sql:/docker-entrypoint-initdb.d/init.sql = executa script SQL ao iniciar
    #   (exemplo: criar tabelas padrão)
    
    restart: unless-stopped
    # reinicia o container se parar

volumes:
  db-data:
    # define volume nomeado "db-data"
    # serve para persistir dados do PostgreSQL
    # criada automaticamente na primeira vez
    # pode remover com: docker compose down -v

# --- Como usar este docker-compose.yml ---
#
# 1. Primeira vez (constrói + roda tudo):
#    docker compose up --build
#
# 2. Próximas vezes (roda sem reconstruar):
#    docker compose up
#
# 3. Em background (não prende terminal):
#    docker compose up -d
#
# 4. Ver logs em tempo real:
#    docker compose logs -f
#
# 5. Parar tudo:
#    docker compose down
#
# 6. Parar e deletar volumes (cuidado, perde dados do banco):
#    docker compose down -v
#
# 7. Parar um serviço específico:
#    docker compose stop app
#
# 8. Rodar um comando em um serviço (ex: bash):
#    docker compose exec app bash
#    docker compose exec db psql -U postgres -d meu_banco
