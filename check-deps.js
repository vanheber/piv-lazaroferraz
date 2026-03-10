const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

function checkDependencies() {
    const nodeModulesPath = path.join(__dirname, 'node_modules');
    const packageJsonPath = path.join(__dirname, 'package.json');

    // Se a pasta node_modules não existir, precisamos instalar
    if (!fs.existsSync(nodeModulesPath)) {
        console.log('🔄 Dependências não encontradas. Instalando (npm install)...');
        console.log('Isso pode levar alguns instantes na primeira execução.');
        
        try {
            // Executa npm install bloqueando o processo até finalizar e mostrando o progresso no terminal
            execSync('npm install', { stdio: 'inherit' });
            console.log('✅ Dependências instaladas com sucesso!\n');
        } catch (error) {
            console.error('❌ Erro ao instalar dependências. Por favor, execute "npm install" manualmente.');
            process.exit(1);
        }
    }
}

checkDependencies();
