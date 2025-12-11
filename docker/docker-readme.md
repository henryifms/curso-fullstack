# Docker - Guia Completo para Cursos

## O que é Docker?

Docker é uma ferramenta que empacotar sua aplicação junto com todas as dependências (Node, banco de dados, bibliotecas, etc.) em um "container". Esse container é como uma caixa que funciona igual em qualquer computador: Windows, Mac, Linux, servidor na nuvem.

**Sem Docker:** você instala Node localmente, depois o colega instala, configurações diferentes quebram tudo.  
**Com Docker:** você cria uma imagem, passa para o colega, ele roda a mesma coisa.

---

## Conceitos principais

### Imagem
Um "molde" que define como o container deve ser construído. Pensa como um receita (Dockerfile).

### Container
Uma instância rodando da imagem. Você pode ter várias cópias rodando ao mesmo tempo.

### Dockerfile
Arquivo com instruções para construir a imagem (instalar Node, copiar código, rodar npm install, etc.).

### Docker Compose
Ferramenta para orquestrar vários containers (app + banco de dados + cache) com um comando só.

---

## Como os comandos se encaixam

### Fase 1: Construir a imagem
```bash
docker build -t meu-app:1.0 .
```
→ Lê o Dockerfile, executa cada linha, cria uma imagem chamada `meu-app:1.0`.

### Fase 2: Rodar um container dessa imagem
```bash
docker run -p 3000:3000 -d meu-app:1.0
```
→ Cria um container novo a partir da imagem e inicia ele. A app fica rodando.

### Fase 3: Gerenciar containers rodando
```bash
docker ps          # ver o que está rodando
docker logs app    # ver o que está acontecendo
docker stop app    # parar
docker rm app      # deletar
```

### Com Docker Compose (mais fácil)
```bash
docker compose up        # constrói + roda tudo de uma vez
docker compose down      # para tudo
```

---

## Fluxo real de desenvolvimento

1. Você cria um `Dockerfile` que define como construir a imagem
2. Você cria um `docker-compose.yml` que define os serviços (app, banco, etc.)
3. Primeira vez: `docker compose up --build` (constrói + roda)
4. Você muda o código localmente
5. Container detecta a mudança (se tiver volume `-v`) e recarrega
6. Quando acabar: `docker compose down` (para tudo)

---

## Arquivos dessa pasta

- **comandos-basicos.md** → Lista de comandos com explicação de cada um
- **exemplos/Dockerfile** → Exemplo comentado de um Dockerfile Node
- **exemplos/docker-compose.yml** → Exemplo comentado de orquestração app + banco

---

## Dica para aprender

Comece com `docker run` (rodando um container) → depois `docker build` (criando sua própria imagem) → depois `docker compose` (coordenando múltiplos serviços).

Na pasta `exemplos/` você tem um Dockerfile e docker-compose.yml comentados, linha por linha, para entender exatamente o que cada coisa faz.
