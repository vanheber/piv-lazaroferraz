---
name: PIVdigital - Brand Identity Manual Generator
description: Skill para criar e configurar novos projetos de manual de identidade visual usando o template PIVdigital
---

# PIVdigital - Brand Identity Manual Generator

## Visão Geral

Esta skill permite criar e configurar novos projetos de manual de identidade visual baseados no template PIVdigital. O sistema usa **EJS** para templates e **brand_config.json** para centralizar as informações da marca, permitindo gerar sites para diferentes clientes apenas alterando a configuração e os ativos de imagem.

## Pré-requisitos

- Node.js instalado (v14+ recomendado)
- MAMP (opcional, para deploy local)
- Git para controle de versão

## Como Usar Esta Skill

### Método 1: Scaffolding Automatizado (Recomendado)

O template PIVdigital inclui um script automatizado que facilita a criação de novos projetos.

```bash
# 1. Clone o repositório template
git clone https://github.com/vanheber/pivdigital.git nome-do-cliente
cd nome-do-cliente

# 2. Instale as dependências
npm install

# 3. Execute o script de scaffolding
npm run new-client nome-do-cliente
```

O script irá:
- ✅ Criar backup do `brand_config.json` existente (se houver)
- ✅ Copiar template para novo `brand_config.json` com placeholders
- ✅ Configurar `CLIENT_SLUG` no `deploy_mamp.js`
- ✅ Gerar checklist personalizado de setup
- ✅ Verificar estrutura de pastas de ativos
- ✅ Exibir próximos passos detalhados

### Método 2: Setup Manual

Se preferir configurar manualmente (ou não tiver acesso ao script):

```bash
# 1. Clone o repositório template
git clone https://github.com/vanheber/pivdigital.git nome-do-cliente

# 2. Entre na pasta do projeto
cd nome-do-cliente

# 3. Instale as dependências
npm install

# 4. Remova o remote origin do template
git remote remove origin

# 5. Adicione o remote do novo repositório do cliente
git remote add origin https://github.com/seu-usuario/nome-do-cliente.git
```

---

## Geração de Conteúdo com Agente GEM

**IMPORTANTE**: O conteúdo textual do manual (missão, visão, valores, tom de voz, defesa do conceito) deve ser gerado com auxílio do **agente GEM (Gerador de Estratégia de Marca) do cliente**.

### Por que usar o GEM?

- **Alinhamento estratégico**: O GEM conhece a identidade profunda da marca
- **Consistência de tom**: Garante copywriting alinhado com a personalidade da marca
- **Arquétipos corretos**: Sugere arquétipos baseados no posicionamento da marca
- **Copywriting profissional**: Gera textos técnicos, não publicitários

### Como usar o GEM

#### 1. Localize o prompt para GEM
```
.agent/prompts/PROMPT_GEM_BRAND_CONTENT.md
```

#### 2. Prepare o briefing do cliente
Reúna informações:
- Nome da marca
- Segmento de atuação
- Público-alvo
- Valores e diferenciais
- Personalidade da marca
- Cores e fontes escolhidas
- Referências visuais

#### 3. Execute o prompt
- Abra o arquivo `PROMPT_GEM_BRAND_CONTENT.md`
- Substitua `[NOME_DA_MARCA]` e `[INSERIR AQUI AS INFORMAÇÕES...]` com o briefing
- Envie o prompt completo ao agente GEM do cliente
- O GEM retornará um JSON completo pronto para uso

#### 4. Integre o conteúdo gerado
Copie o JSON gerado pelo GEM e cole no `brand_config.json`, substituindo os placeholders.

**Exemplo de uso**:
```bash
# Após executar npm run new-client empresa-xyz:

# 1. Abra .agent/prompts/PROMPT_GEM_BRAND_CONTENT.md
# 2. Preencha o briefing do cliente
# 3. Envie ao agente GEM
# 4. Copie o JSON retornado para brand_config.json
# 5. Continue com ativos visuais
```

---

### 1. Criar Novo Projeto para Cliente

```bash
# 1. Clone o repositório template
git clone https://github.com/vanheber/pivdigital.git nome-do-cliente

# 2. Entre na pasta do projeto
cd nome-do-cliente

# 3. Instale as dependências
npm install

# 4. Remova o remote origin do template
git remote remove origin

# 5. Adicione o remote do novo repositório do cliente
git remote add origin https://github.com/seu-usuario/nome-do-cliente.git
```

### 2. Configurar a Marca

#### 2.1. Editar `brand_config.json`

O arquivo `brand_config.json` é o coração do sistema. Configure:

**Tema (`theme`)**:
```json
{
  "theme": {
    "colors": {
      "primary": "#HEX",
      "secondary": "#HEX",
      "tertiary": "#HEX",
      "quaternary": "#HEX"
    },
    "fonts": {
      "url": "https://fonts.googleapis.com/css2?family=...",
      "primary": "Nome da Fonte",
      "secondary": "Nome da Fonte Secundária"
    }
  }
}
```

**Conteúdo (`content`)**:
```json
{
  "content": {
    "about": {
      "mission": "Texto da missão",
      "vision": "Texto da visão",
      "values": "Texto dos valores",
      "description": "Descrição sobre a marca"
    },
    "brand_defense": {
      "title": "Defesa da Marca",
      "description": "Conceito e posicionamento"
    }
  }
}
```

**Arquétipos (`archetypes`)**:

Os arquétipos disponíveis são carregados automaticamente da **fonte oficial**:
- **Fonte**: [vanheber/arquetipos](https://github.com/vanheber/arquetipos/blob/113c4860307d67305dbec3e711ea3e1c44c42696/arquetipos_descricoes.md)

Arquétipos disponíveis:
- Adaptável
- Amante
- Arquiteto
- Audacioso
- Boêmio
- Conservador
- Criador
- Cuidador
- Delicado
- Engraçado
- Governante
- Herói
- Jogador
- Justo
- Mítico
- Ostentador
- Pontual
- Puro
- Rebelde
- Sábio
- Simples

Configure no JSON (escolha até 3 arquétipos):
```json
{
  "archetypes": {
    "primary": "criador",
    "secondary": "sabio",
    "tertiary": "heroi"
  }
}
```

Durante o build, o sistema:
1. Busca as descrições literais da fonte oficial
2. Carrega as imagens do CDN (`https://img.agenciaquadri.com.br/cardscolor/`)
3. Injeta os dados no template automaticamente

**Links (`links`)**:
```json
{
  "links": {
    "whatsapp": {
      "number": "5511999999999",
      "message": "Olá! Vim através do manual de marca."
    },
    "logo_download": "auto",
    "stationery_download": "auto"
  }
}
```

### 3. Adicionar Ativos da Marca

Substitua os arquivos mantendo **exatamente** os mesmos nomes:

#### 3.1. Logos Horizontais (`src/assets/files/horizontal/`)
- `lg-hz-color.webp` - Logo horizontal colorida
- `lg-hz-color-white.webp` - Logo horizontal colorida (fundo escuro)
- `lg-hz-bw.webp` - Logo horizontal preto e branco

#### 3.2. Logos Verticais (`src/assets/files/vertical/`)
- `lg-vt-color.webp` - Logo vertical colorida
- `lg-vt-color-white.webp` - Logo vertical colorida (fundo escuro)
- `lg-vt-bw.webp` - Logo vertical preto e branco

#### 3.3. Símbolos (`src/assets/files/symbol/`)
- `sy-color.webp` - Símbolo colorido
- `sy-color-white.webp` - Símbolo colorido (fundo escuro)

#### 3.4. Favicons (`src/assets/files/favicon/`)
- `favicon-light.png` - Favicon para tema claro
- `favicon-dark.png` - Favicon para tema escuro

#### 3.5. Papelaria (`src/assets/img/stationery/`)
- `business-card-front.webp` - Frente do cartão de visita
- `business-card-back.webp` - Verso do cartão de visita
- `letterhead.webp` - Papel timbrado
- `envelope-dl-front.webp` - Frente do envelope DL
- `envelope-dl-back.webp` - Verso do envelope DL
- `envelope-c4-front.webp` - Frente do envelope C4
- `envelope-c4-back.webp` - Verso do envelope C4

#### 3.6. Mood e Imagens Gerais (`src/assets/img/`)
- `moodheader.webp` - Imagem principal no topo da página Mood
- `moodsite.webp` - Imagem secundária de destaque
- `moodimg01.webp`, `moodimg02.webp`, etc. - Galeria de mood (numeração sequencial)

### 4. Build e Deploy

#### 4.1. Construir o Site
```bash
npm run build
```

Isso irá:
- Processar os templates EJS
- Gerar `theme.css` com as cores e fontes do `brand_config.json`
- Buscar os arquétipos da fonte oficial
- Criar o ZIP com os logos
- Gerar todos os arquivos finais em `/public`

#### 4.2. Deploy Local (MAMP)

**Configurar o destino**:
1. Abra `deploy_mamp.js`
2. Edite a constante `CLIENT_SLUG`:
```javascript
const CLIENT_SLUG = 'nome-do-cliente'; // Ex: 'empresa-xyz'
```

**Executar deploy**:
```bash
npm run deploy:mamp
```

O site ficará disponível em: `http://localhost:8888/PIV/nome-do-cliente`

### 5. Customização Avançada

#### 5.1. Adicionar Nova Página

1. Crie `src/template/nova-pagina.ejs`:
```ejs
<%- include('partials/header', { title: 'Título da Página' }) %>
<div class="container">
    <!-- Seu conteúdo aqui -->
    <%# Acesse dados do config: %>
    <h1><%= brand.content.about.mission %></h1>
</div>
<%- include('partials/footer') %>
```

2. Adicione ao menu em `src/partials/header.ejs`

3. Rebuild:
```bash
npm run build
```

#### 5.2. Customizar Estilos

**CSS Automático** (`assets/css/theme.css`):
- Gerado automaticamente a cada build
- Define variáveis CSS baseadas em `brand_config.json`
- **NÃO EDITE MANUALMENTE**

**CSS Manual** (`src/assets/css/custom.css`):
- Para ajustes finos que não dependem da marca
- Layout, espaçamentos, animações customizadas
- **PROIBIDO usar style inline nos projetos**

**Bootstrap**:
- Continue usando classes utilitárias do Bootstrap 5.3
- Exemplos: `text-center`, `p-4`, `d-flex`, `container`, etc.

### 6. Estrutura do Projeto

```
pivdigital/
├── .agent/
│   └── skills/
│       └── pivdigital-setup/
│           └── SKILL.md (este arquivo)
├── src/
│   ├── assets/
│   │   ├── css/
│   │   │   ├── custom.css (estilos manuais)
│   │   │   └── theme.css (gerado automaticamente)
│   │   ├── files/
│   │   │   ├── horizontal/ (logos horizontais)
│   │   │   ├── vertical/ (logos verticais)
│   │   │   ├── symbol/ (símbolos)
│   │   │   └── favicon/ (favicons)
│   │   └── img/
│   │       ├── stationery/ (papelaria)
│   │       ├── moodheader.webp
│   │       ├── moodsite.webp
│   │       └── moodimg*.webp
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   └── template/
│       ├── index.ejs
│       ├── mood.ejs
│       └── ... (outras páginas)
├── public/ (gerado, não editar)
├── brand_config.json (configuração principal)
├── build.js (script de build)
├── deploy_mamp.js (script de deploy)
├── package.json
├── MANUAL.md (documentação operacional)
└── README.md
```

## Checklist - Novo Cliente

Use este checklist ao criar um novo projeto:

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

## Troubleshooting

### Build Falha

**Problema**: Erro ao executar `npm run build`

**Soluções**:
- Verifique se o `brand_config.json` está com sintaxe JSON válida
- Confirme que todas as pastas de ativos existem
- Execute `npm install` novamente

### Imagens Não Aparecem

**Problema**: Imagens não carregam no site gerado

**Soluções**:
- Verifique se os nomes dos arquivos estão **exatamente** como especificado
- Confirme que as imagens estão no formato `.webp` (exceto favicons)
- Execute `npm run build` novamente
- Limpe o cache do navegador

### Arquétipos Não Carregam

**Problema**: Descrições dos arquétipos não aparecem

**Soluções**:
- Verifique a conexão com internet (busca fonte externa)
- Confirme que os nomes dos arquétipos no JSON estão em **minúsculas**
- Verifique se os nomes correspondem aos disponíveis na fonte oficial

### Deploy MAMP Falha

**Problema**: `npm run deploy:mamp` não funciona

**Soluções**:
- Verifique se o MAMP está instalado em `C:\MAMP`
- Confirme que executou `npm run build` antes
- Verifique permissões de escrita na pasta do MAMP
- Confira o `CLIENT_SLUG` em `deploy_mamp.js`

## Referências

- **Repositório Template**: [vanheber/pivdigital](https://github.com/vanheber/pivdigital)
- **Fonte de Arquétipos**: [vanheber/arquetipos](https://github.com/vanheber/arquetipos/blob/113c4860307d67305dbec3e711ea3e1c44c42696/arquetipos_descricoes.md)
- **CDN de Imagens**: `https://img.agenciaquadri.com.br/cardscolor/`
- **Documentação Completa**: Ver `MANUAL.md` no projeto
