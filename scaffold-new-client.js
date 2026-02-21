/**
 * PIVdigital - Script de Scaffolding para Novo Cliente
 * 
 * Este script automatiza a criação de um novo projeto PIVdigital para um cliente.
 * 
 * Uso:
 *   node scaffold-new-client.js nome-do-cliente
 * 
 * O script irá:
 * 1. Criar estrutura de pastas para o novo cliente
 * 2. Copiar template brand_config.json
 * 3. Criar arquivo .env com slug do cliente
 * 4. Gerar checklist de setup
 * 5. Exibir instruções para próximos passos
 */

const fs = require('fs-extra');
const path = require('path');

// Cores para console
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
    red: '\x1b[31m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function getClientSlug(args) {
    if (args.length < 3) {
        log('❌ Erro: Nome do cliente não fornecido', 'red');
        log('\nUso: node scaffold-new-client.js nome-do-cliente', 'yellow');
        log('Exemplo: node scaffold-new-client.js empresa-xyz\n', 'cyan');
        process.exit(1);
    }
    
    const slug = args[2]
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove acentos
        .replace(/[^a-z0-9]+/g, '-')      // Substitui não alfanuméricos por -
        .replace(/^-+|-+$/g, '');          // Remove - do início e fim
    
    return slug;
}

async function scaffoldNewClient(clientSlug) {
    log('\n╔════════════════════════════════════════════════════════╗', 'cyan');
    log('║   PIVdigital - Scaffolding de Novo Cliente            ║', 'cyan');
    log('╚════════════════════════════════════════════════════════╝\n', 'cyan');
    
    log(`📋 Cliente: ${clientSlug}`, 'bright');
    
    const projectRoot = process.cwd();
    const templateConfigPath = path.join(projectRoot, '.agent', 'templates', 'brand_config.template.json');
    const targetConfigPath = path.join(projectRoot, 'brand_config.json');
    const deployScriptPath = path.join(projectRoot, 'deploy_mamp.js');
    const checklistPath = path.join(projectRoot, `CHECKLIST_${clientSlug.toUpperCase()}.md`);
    
    try {
        // 1. Backup do brand_config.json atual (se existir)
        if (fs.existsSync(targetConfigPath)) {
            const backupPath = path.join(projectRoot, `brand_config.backup.${Date.now()}.json`);
            log('\n📦 Fazendo backup do brand_config.json atual...', 'yellow');
            await fs.copy(targetConfigPath, backupPath);
            log(`   ✓ Backup salvo em: ${path.basename(backupPath)}`, 'green');
        }
        
        // 2. Copiar template para brand_config.json
        log('\n📄 Criando brand_config.json a partir do template...', 'blue');
        if (fs.existsSync(templateConfigPath)) {
            const templateContent = await fs.readFile(templateConfigPath, 'utf8');
            const configWithSlug = templateContent.replace('[NOME DA MARCA]', clientSlug.toUpperCase());
            await fs.writeFile(targetConfigPath, configWithSlug, 'utf8');
            log('   ✓ brand_config.json criado', 'green');
        } else {
            log('   ⚠ Template não encontrado, pulando...', 'yellow');
        }
        
        // 3. Atualizar deploy_mamp.js com CLIENT_SLUG
        log('\n🔧 Configurando deploy_mamp.js...', 'blue');
        if (fs.existsSync(deployScriptPath)) {
            let deployContent = await fs.readFile(deployScriptPath, 'utf8');
            
            // Substitui CLIENT_SLUG existente ou adiciona se não existir
            if (deployContent.includes('const CLIENT_SLUG')) {
                deployContent = deployContent.replace(
                    /const CLIENT_SLUG = ['"].*?['"]/,
                    `const CLIENT_SLUG = '${clientSlug}'`
                );
            } else {
                // Adiciona no início do arquivo
                deployContent = `const CLIENT_SLUG = '${clientSlug}';\n\n${deployContent}`;
            }
            
            await fs.writeFile(deployScriptPath, deployContent, 'utf8');
            log(`   ✓ CLIENT_SLUG configurado: '${clientSlug}'`, 'green');
        } else {
            log('   ⚠ deploy_mamp.js não encontrado', 'yellow');
        }
        
        // 4. Criar checklist personalizado
        log('\n📝 Gerando checklist de setup...', 'blue');
        const checklistContent = generateChecklist(clientSlug);
        await fs.writeFile(checklistPath, checklistContent, 'utf8');
        log(`   ✓ Checklist salvo: ${path.basename(checklistPath)}`, 'green');
        
        // 5. Verificar estrutura de pastas de ativos
        log('\n🗂️  Verificando estrutura de ativos...', 'blue');
        const assetsPaths = [
            'src/assets/files/horizontal',
            'src/assets/files/vertical',
            'src/assets/files/symbol',
            'src/assets/files/favicon',
            'src/assets/img/stationery'
        ];
        
        for (const assetPath of assetsPaths) {
            const fullPath = path.join(projectRoot, assetPath);
            if (fs.existsSync(fullPath)) {
                log(`   ✓ ${assetPath}`, 'green');
            } else {
                log(`   ⚠ ${assetPath} não existe`, 'yellow');
            }
        }
        
        // 6. Exibir próximos passos
        displayNextSteps(clientSlug);
        
    } catch (error) {
        log(`\n❌ Erro durante scaffolding: ${error.message}`, 'red');
        process.exit(1);
    }
}

function generateChecklist(clientSlug) {
    return `# Checklist de Setup - ${clientSlug.toUpperCase()}

**Data de criação**: ${new Date().toLocaleDateString('pt-BR')}

## ✅ 1. Preparação Inicial

- [ ] Repositório clonado/forked
- [ ] \`npm install\` executado
- [ ] Dependências instaladas sem erros

## ✅ 2. Configuração da Marca

### 2.1. Consultar Agente GEM
- [ ] Briefing do cliente coletado
- [ ] Prompt GEM executado (ver \`.agent/prompts/PROMPT_GEM_BRAND_CONTENT.md\`)
- [ ] JSON de conteúdo gerado pelo GEM

### 2.2. Editar \`brand_config.json\`

**Tema**:
- [ ] Cores definidas (primary, secondary, tertiary)
- [ ] Códigos CMYK e Pantone adicionados
- [ ] Fontes Google escolhidas (headings e body)
- [ ] URLs das fontes configuradas

**Conteúdo**:
- [ ] \`about.description\` (2 parágrafos)
- [ ] \`about.vision\`
- [ ] \`about.mission\`
- [ ] \`about.values\` (5 valores)
- [ ] \`about.voiceTone\` (description + 4 points)

**Essência da Marca**:
- [ ] \`brandEssence.conceptDefense.text\`
- [ ] \`brandEssence.conceptDefense.strengths\` (5 pontos)
- [ ] \`brandEssence.archetypes\` (primary, secondary, tertiary?)

**Contato**:
- [ ] WhatsApp number e message
- [ ] Links sociais (website, linkedin, instagram, etc)

**Papelaria**:
- [ ] Link de download da papelaria configurado

## ✅ 3. Ativos Visuais

### 3.1. Logos Horizontais (\`src/assets/files/horizontal/\`)
- [ ] \`lg-hz-color.webp\`
- [ ] \`lg-hz-color-inverted.webp\`
- [ ] \`lg-hz-bw.webp\`

### 3.2. Logos Verticais (\`src/assets/files/vertical/\`)
- [ ] \`lg-vt-color.webp\`
- [ ] \`lg-vt-color-inverted.webp\`
- [ ] \`lg-vt-bw.webp\`

### 3.3. Símbolos (\`src/assets/files/symbol/\`)
- [ ] \`sy-color.webp\`
- [ ] \`sy-color-inverted.webp\`

### 3.4. Favicons (\`src/assets/files/favicon/\`)
- [ ] \`favicon-light.png\`
- [ ] \`favicon-dark.png\`

### 3.5. Papelaria (\`src/assets/img/stationery/\`)
- [ ] \`business-card-front.webp\`
- [ ] \`business-card-back.webp\`
- [ ] \`letterhead.webp\`
- [ ] \`envelope-dl-front.webp\`
- [ ] \`envelope-dl-back.webp\`
- [ ] \`envelope-c4-front.webp\`
- [ ] \`envelope-c4-back.webp\`

### 3.6. Mood (\`src/assets/img/\`)
- [ ] \`moodheader.webp\`
- [ ] \`moodsite.webp\`
- [ ] \`moodimg01.webp\`, \`moodimg02.webp\`, etc.

## ✅ 4. Build e Deploy

### 4.1. Build Local
- [ ] Executar \`npm run build\`
- [ ] Verificar pasta \`/public\` gerada
- [ ] Conferir se arquivos HTML foram criados
- [ ] Verificar \`public/assets/css/theme.css\` (cores corretas?)
- [ ] Testar abertura de \`public/index.html\` no navegador

### 4.2. Deploy MAMP
- [ ] \`CLIENT_SLUG\` em \`deploy_mamp.js\` configurado: \`${clientSlug}\`
- [ ] MAMP rodando
- [ ] Executar \`npm run deploy:mamp\`
- [ ] Acessar \`http://localhost:8888/PIV/${clientSlug}\`
- [ ] Testar navegação entre páginas
- [ ] Testar links de download
- [ ] Testar botão WhatsApp

### 4.3. Validação Final
- [ ] Todas as cores aplicadas corretamente
- [ ] Fontes carregando
- [ ] Logos exibindo em todos os contextos
- [ ] Arquétipos carregando da fonte oficial
- [ ] Papelaria disponível para download
- [ ] Responsividade ok (mobile/tablet/desktop)

## ✅ 5. Controle de Versão

- [ ] \`git add .\`
- [ ] \`git commit -m "Setup inicial - ${clientSlug}"\`
- [ ] Remote configurado para repositório do cliente
- [ ] \`git push origin main\`

## ✅ 6. Entrega

- [ ] Link do manual digital enviado ao cliente
- [ ] Manual testado em diferentes dispositivos
- [ ] Instruções de uso enviadas (se aplicável)
- [ ] Feedback inicial coletado

---

**Observações**:

_Adicione notas específicas deste projeto aqui._

---

**Status**: 🔴 Em andamento | 🟡 Aguardando aprovação | 🟢 Concluído
`;
}

function displayNextSteps(clientSlug) {
    log('\n╔════════════════════════════════════════════════════════╗', 'green');
    log('║              ✅ SCAFFOLDING CONCLUÍDO!                 ║', 'green');
    log('╚════════════════════════════════════════════════════════╝\n', 'green');
    
    log('📌 Próximos Passos:\n', 'bright');
    
    log('1️⃣  Consultar o agente GEM do cliente:', 'cyan');
    log('   • Veja o prompt em: .agent/prompts/PROMPT_GEM_BRAND_CONTENT.md', 'cyan');
    log('   • Forneça o briefing do cliente ao GEM', 'cyan');
    log('   • Copie o JSON gerado para brand_config.json\n', 'cyan');
    
    log('2️⃣  Configurar brand_config.json:', 'cyan');
    log('   • Edite: brand_config.json', 'cyan');
    log('   • Preencha todos os campos entre [COLCHETES]', 'cyan');
    log('   • Valide o JSON: https://jsonlint.com\n', 'cyan');
    
    log('3️⃣  Adicionar ativos visuais:', 'cyan');
    log('   • Logos: src/assets/files/horizontal/, vertical/, symbol/', 'cyan');
    log('   • Favicons: src/assets/files/favicon/', 'cyan');
    log('   • Papelaria: src/assets/img/stationery/', 'cyan');
    log('   • Mood: src/assets/img/\n', 'cyan');
    
    log('4️⃣  Build e deploy:', 'cyan');
    log('   • Execute: npm run build', 'cyan');
    log('   • Execute: npm run deploy:mamp', 'cyan');
    log(`   • Acesse: http://localhost:8888/PIV/${clientSlug}\n`, 'cyan');
    
    log('5️⃣  Use o checklist gerado:', 'cyan');
    log(`   • Abra: CHECKLIST_${clientSlug.toUpperCase()}.md`, 'cyan');
    log('   • Siga passo a passo marcando os itens concluídos\n', 'cyan');
    
    log('═══════════════════════════════════════════════════════════\n', 'blue');
    log(`🚀 Projeto ${clientSlug} pronto para configuração!\n`, 'bright');
}

// Executar
const clientSlug = getClientSlug(process.argv);
scaffoldNewClient(clientSlug);
