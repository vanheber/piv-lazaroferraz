# Manual de Operação - PIV Digital

Este manual descreve como manter, configurar e expandir o site PIV Digital.

## 1. Visão Geral
O site utiliza **EJS** para templates e um arquivo `brand_config.json` para centralizar as informações da marca. Isso permite gerar sites para diferentes clientes apenas alterando a configuração e os ativos de imagem.

## 2. Geração de Conteúdo com Agente GEM

**IMPORTANTE**: Antes de preencher o `brand_config.json`, o conteúdo textual (missão, visão, valores, tom de voz, defesa do conceito) deve ser gerado com auxílio do **agente GEM (Gerador de Estratégia de Marca) do cliente**.

### Por que usar o GEM?
- **Alinhamento estratégico**: O GEM conhece a identidade profunda da marca
- **Consistência de tom**: Garante copywriting alinhado com a personalidade da marca
- **Arquétipos corretos**: Sugere arquétipos baseados no posicionamento
- **Copywriting profissional**: Gera textos técnicos, não publicitários

### Como usar
1. Localize o prompt: `.agent/prompts/PROMPT_GEM_BRAND_CONTENT.md`
2. Preencha o briefing do cliente no prompt
3. Envie o prompt completo ao agente GEM do cliente
4. Copie o JSON retornado e cole no `brand_config.json`

**Veja o arquivo de prompt para instruções detalhadas.**

## 3. Configuração da Marca (`brand_config.json`)
Este é o coração do sistema. Nele você define:

- **Theme**:
  - **Colors**: Hex codes para `primary`, `secondary`, etc. O sistema gera automaticamente o CSS.
  - **Fonts**: URLs e nomes de fontes do Google Fonts.
- **Content**:
  - Textos para as seções "Sobre", "Visão", "Missão", "Valores".
  - Defesa do conceito da marca e arquétipos.
- **Links**:
  - O sistema gera automaticamente um **ZIP** com todos os ativos da pasta `assets/files`.
  - Link de download de papelaria pode ser configurado se for externo, ou usar o zip geral.
  - Número e mensagem do WhatsApp.

**Nota**: Campos comuns (como títulos de seções padrão) são fixos nos templates e não precisam estar no JSON.

### Arquétipos
Os arquétipos da marca são definidos no `brand_config.json` na seção `archetypes`. Durante o build, o sistema busca automaticamente as descrições, termos e imagens de cada arquétipo da **fonte oficial**:

**Fonte**: [vanheber/arquetipos](https://github.com/vanheber/arquetipos/blob/113c4860307d67305dbec3e711ea3e1c44c42696/arquetipos_descricoes.md)

As descrições são copiadas literalmente e as imagens são servidas via CDN (`https://img.agenciaquadri.com.br/cardscolor/`), garantindo performance e centralização dos ativos.

## 4. Gestão de Ativos (Imagens)
Para trocar a identidade visual, substitua os arquivos nas pastas abaixo mantendo **exatamente** os mesmos nomes de arquivo:

### Logos Horizontais (`src/assets/files/horizontal/`)
- `lg-hz-color.webp` - Logo horizontal colorida
- `lg-hz-color-white.webp` - Logo horizontal colorida (fundo escuro)
- `lg-hz-bw.webp` - Logo horizontal preto e branco

### Logos Verticais (`src/assets/files/vertical/`)
- `lg-vt-color.webp` - Logo vertical colorida
- `lg-vt-color-white.webp` - Logo vertical colorida (fundo escuro)
- `lg-vt-bw.webp` - Logo vertical preto e branco

### Símbolos (`src/assets/files/symbol/`)
- `sy-color.webp` - Símbolo colorido
- `sy-color-white.webp` - Símbolo colorido (fundo escuro)

### Papelaria (`src/assets/img/stationery/`)
- `business-card-front.webp` - Frente do cartão de visita
- `business-card-back.webp` - Verso do cartão de visita
- `letterhead.webp` - Papel timbrado
- `envelope-dl-front.webp` - Frente do envelope DL
- `envelope-dl-back.webp` - Verso do envelope DL
- `envelope-c4-front.webp` - Frente do envelope C4
- `envelope-c4-back.webp` - Verso do envelope C4

### Mood e Imagens Gerais (`src/assets/img/`)
- `moodheader.webp` - Imagem principal no topo da página Mood
- `moodsite.webp` - Imagem secundária de destaque
- `moodimg01.webp`, `moodimg02.webp`, etc. - Galeria de mood (numeração sequencial)

### Favicons (`src/assets/files/favicon/`)
- `favicon-light.png` - Favicon para tema claro
- `favicon-dark.png` - Favicon para tema escuro


## 5. Adicionando Nova Página
1. Crie um novo arquivo `.ejs` na pasta `src/template` (ex: `nova-pagina.ejs`).
2. Use a estrutura base:
   ```ejs
   <%- include('partials/header', { title: 'Título da Página' }) %>
   <div class="container">
       <!-- Seu conteúdo aqui -->
       <%# Use dados do config assim: %>
       <h1><%= brand.content.about.mission %></h1>
   </div>
   <%- include('partials/footer') %>
   ```
3. Se necessário, adicione a página ao menu editando `src/partials/header.ejs`.
4. Execute `npm run build` para gerar a nova página em `/public`.

## 6. Estilos e CSS
- **Automático**: O arquivo `assets/css/theme.css` é gerado a cada build com base no `brand_config.json`. Ele define variáveis como `--bs-primary`, `--bs-font-sans-serif`, etc.
- **Manual**: Para ajustes finos que não dependem da marca (layout, espaçamentos), use `src/assets/css/custom.css`.
- **Bootstrap**: Continue usando as classes utilitárias do Bootstrap 5.3 (`text-center`, `p-4`, `d-flex`, etc.).

## 7. Build e Deploy

**IMPORTANTE**: Sempre execute o build ANTES do deploy.

### Passo 1: Construir o Site
Gera os arquivos finais na pasta `/public` com base no `brand_config.json` e templates EJS.
```bash
npm run build
```

### Passo 2: Publicar no MAMP (Local)
O script de deploy permite a configuração de múltiplos clientes dentro da pasta `PIV`.

**Configuração**:
1. Abra `deploy_mamp.js`.
2. Edite a constante `CLIENT_SLUG` (ex: `'pivdigital'`).
3. O caminho final será `C:\MAMP\htdocs\PIV\[CLIENT_SLUG]`.

**Execução**:
```bash
npm run deploy:mamp
```

**Observações**:
- O script cria a pasta do cliente se não existir
- Sobrescreve arquivos existentes do cliente
- **NÃO** apaga outras pastas de clientes em `\PIV`
- Sempre execute `npm run build` antes do deploy

---

## 8. Checklist - Novo Cliente

Ao criar um novo repositório para um cliente:

- [ ] **1. Preparação**
  - [ ] Clonar/Fork do repositório template PIVdigital
  - [ ] Renomear repositório com nome do cliente
  - [ ] Executar `npm install`

- [ ] **2. Configuração**
  - [ ] Editar `brand_config.json`:
    - [ ] Cores do tema (`theme.colors`)
    - [ ] Fontes (`theme.fonts`)
    - [ ] Conteúdos (about, vision, mission, values)
    - [ ] Arquétipos escolhidos (`archetypes`)
    - [ ] Links (WhatsApp, downloads)

- [ ] **3. Ativos - Logos**
  - [ ] `src/assets/files/horizontal/` (3 arquivos)
  - [ ] `src/assets/files/vertical/` (3 arquivos)
  - [ ] `src/assets/files/symbol/` (2 arquivos)
  - [ ] `src/assets/files/favicon/` (2 arquivos)

- [ ] **4. Ativos - Papelaria**
  - [ ] `src/assets/img/stationery/` (7 arquivos)

- [ ] **5. Ativos - Mood**
  - [ ] `src/assets/img/moodheader.webp`
  - [ ] `src/assets/img/moodsite.webp`
  - [ ] `src/assets/img/moodimg01.webp`, `moodimg02.webp`, etc.

- [ ] **6. Deploy Local**
  - [ ] Configurar `CLIENT_SLUG` em `deploy_mamp.js`
  - [ ] Executar `npm run build`
  - [ ] Verificar pasta `/public` gerada
  - [ ] Executar `npm run deploy:mamp`
  - [ ] Testar site em `http://localhost:8888/PIV/[client-slug]`

- [ ] **7. Controle de Versão**
  - [ ] Commit inicial com configurações do cliente
  - [ ] Push para repositório remoto
