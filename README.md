# PIV Digital - Static Site Generator

Este projeto foi migrado de um template estático Bootstrap Studio para um gerador de site estático customizado baseado em Node.js e EJS, com suporte a configuração dinâmica de marca via JSON.

## Pré-requisitos

- Node.js instalado (v14+ recomendado).

## Instalação

1. Clone o repositório.
2. Na raiz do projeto, execute:
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
- `deploy_mamp.js`: Script de deploy local para MAMP.

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
- Configurar `CLIENT_SLUG` no `deploy_mamp.js`
- Gerar checklist personalizado de setup
- Exibir próximos passos

**Importante**: Após executar este comando, use o agente GEM para gerar o conteúdo textual do manual (ver `.agent/prompts/PROMPT_GEM_BRAND_CONTENT.md`).

### Build (Construção)
Gera o site estático na pasta `/public`.
```bash
npm run build
```

### Deploy (MAMP)
Copia os arquivos gerados para a pasta do MAMP configurada no script (`C:\MAMP\htdocs\PIV\pivdigital`).
**Importante:** O script é configurado para preservar outras pastas dentro de `C:\MAMP\htdocs\PIV`.
```bash
npm run deploy:mamp
```

## Desenvolvimento

1. **Configuração**: Edite `brand_config.json` para alterar dados do cliente.
2. **Assets**: Substitua as imagens em `src/assets/img/brand`, `src/assets/img/stationery` e `src/assets/img` mantendo os nomes de arquivo padrão (veja MANUAL.md).
3. **Templates**: Edite os arquivos `.ejs` em `src/template` se precisar alterar a estrutura.
4. **Estilos**:
   - `theme.css`: Gerado automaticamente (não edite).
   - `custom.css`: Para estilos manuais adicionais e controle de tema (Dark/Light).
5. Rode `npm run build` e depois `npm run deploy` para ver as alterações no servidor local.
