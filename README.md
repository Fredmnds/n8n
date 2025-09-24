# 🎲 Random n8n  

Um nó customizado para o **n8n** que gera números aleatórios dentro de um intervalo definido pelo usuário.  

---

## 🚀 Funcionalidades  
- Geração de números aleatórios personalizados.  
- Configuração simples de intervalo (mínimo e máximo).  
- Integração direta com o **n8n** via Docker

---

## 📦 Instalação  

### 1️⃣ Clonar o repositório  
```bash
git clone https://github.com/Fredmnds/n8n.git
```

### 2️⃣ Baixar as dependências
```bash
cd custom-nodes/Random
npm install
```

### 3️⃣ Executar localmente com Docker
Este projeto já inclui um arquivo docker-compose.yml para facilitar a execução.
Na pasta padrão do projeto (onde está o arquivo .yml), execute:
```bash
bash
docker-compose up --build -d
```
Isso irá:

Subir o ambiente do n8n.

Incluir automaticamente o nó customizado no container.

Após a execução, acesse o n8n em:
http://localhost:5678

Após acessar o n8n e fazer o primeiro acesso, o nó personalizado já estará preparado para uso, bastar buscar por "Random"

### 🧪 Testes
Para rodar os testes, execute:

```bash
npm run test
```
