# 🤖 RoboCore Ranking Scraper

Dashboard criado para visualizar e acompanhar o desempenho das equipes na RoboCore, com foco em pódios conquistados.

## Funcionalidades

- **Scraper Automatizado**: Coleta dados em tempo real do site oficial da RoboCore.
- **Ranking de Pódios**: Contagem precisa de 1º, 2º e 3º lugares.
- **Interface Moderna**: Dashboard responsivo construído com React + Tailwind.

## Tecnologias

### Frontend
- **React 19**
- **Vite**
- **Tailwind CSS 4**
- **Lucide Icons**

### Backend
- **Node.js**
- **Express**
- **Cheerio** (Web Scraping)
- **TypeScript**

## Como Rodar o Projeto

1. **Instale as dependências** no diretório raiz:
   ```bash
   npm install
   ```

2. **Configure o seu .env**
   ```bash
   cp .env.example .env
   ```
   > Insira o endereço do backend. O endereço padrão é `http://localhost:3001`.

3. **Inicie o projeto** (Frontend + Backend):
   ```bash
   npm run dev
   ```
   - O Frontend estará disponível em: `http://localhost:5173`
   - O Backend (API) estará disponível em: `http://localhost:3001`

## Estrutura do Projeto

- `/frontend`: Aplicação React com a interface do dashboard.
- `/backend`: Scripts de scraping e servidor Express para servir os dados.
- `/backend/src/scrapers`: Lógica específica de extração de dados da Robocore.
