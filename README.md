# PIV Digital - Static Site Generator

Este projeto foi migrado de um template estático Bootstrap Studio para um gerador de site estático customizado baseado em Node.js e EJS, com suporte a configuração dinâmica de marca via JSON.

## Pré-requisitos

- Node.js instalado (v14+ recomendado).

## Instalação

As dependências são automaticamente verificadas e instaladas quando você rodar qualquer script NPM do projeto pela primeira vez (graças ao script `check-deps.js`).

Mas se preferir instalar manualmente na raiz do projeto, execute:
```bash
npm install
```

## Estrutura do Projeto

- `brand_config.json`: Arquivo de configuração principal (Cores, Fontes, Textos, Links).
- `/src`: Código fonte.
  - `/assets`:
    - `/files`:
      - `/horizontal`: Logos horizontais.
      - `/vertical`: Logos verticais.
      - `/symbol`: Símbolos da marca.
      - `/favicon`: Favicons.
    - `/img/stationery`: Arquivos de papelaria (cartões, envelopes, etc).
    - `/img`: Imagens gerais e de mood (moodheader, moodsite, etc).
    - `/css`: Estilos customizados e gerados.
  - `/template`: Arquivos de página `.ejs`.
  - `/partials`: Componentes reutilizáveis (header, footer).
- `/public`: Pasta gerada com o site final (não edite arquivos aqui).
- `build.js`: Script de construção do site.

## Configuração da Marca (`brand_config.json`)

Este arquivo controla a identidade do site. Use-o para definir:
- **Tema**: Cores (primária, secundária, etc.) e Fontes (Google Fonts).
- **Conteúdo**: Textos específicos como Sobre, Visão, Missão, Valores e textos de uso de marca.
- **Links**: Downloads de logo, papelaria e contato WhatsApp.
- **Arquétipos**: Definição dos arquétipos da marca.

> **Nota**: As descrições e imagens dos arquétipos são obtidas dinamicamente de uma fonte externa (`vanheber/arquetipos`) durante o build. As imagens podem ser servidas através de CDN (Cloudflare) conforme definido na fonte.

## Comandos Disponíveis

### New Client (Scaffolding)
Cria automaticamente a estrutura inicial para um novo cliente.
```bash
npm run new-client nome-do-cliente
```

Este comando irá:
- Fazer backup do `brand_config.json` atual
- Criar novo `brand_config.json` a partir do template
- Gerar checklist personalizado de setup
- Exibir próximos passos

**Importante**: Após executar este comando, use o agente GEM para gerar o conteúdo textual do manual (ver `.agent/prompts/PROMPT_GEM_BRAND_CONTENT.md`).

### Build (Construção)
Gera o site estático e publica na pasta `/public` na raiz do projeto.
```bash
npm run build
```

### Publicação Manual (FTP)
O novo fluxo gerará a estrutura limpa e contida na pasta `/public` que deverá ser diretamente upada por FTP pelo desenvolvedor na raiz do domínio do cliente.

## Desenvolvimento

1. **Configuração**: Edite `brand_config.json` para alterar dados do cliente.
2. **Assets**: Substitua as imagens em `src/assets/img/brand`, `src/assets/img/stationery` e `src/assets/img` mantendo os nomes de arquivo padrão (veja MANUAL.md).
3. **Templates**: Edite os arquivos `.ejs` em `src/template` se precisar alterar a estrutura.
4. **Estilos**:
   - `theme.css`: Gerado automaticamente (não edite).
   - `custom.css`: Para estilos manuais adicionais e controle de tema (Dark/Light).
5. Rode `npm run build` e veja os resultados abrindo o `index.html` da pasta `/public` gerada ou via Live Server.
