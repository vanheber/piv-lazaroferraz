const fs = require('fs-extra');
const path = require('path');
const ejs = require('ejs');
const archiver = require('archiver');

const srcDir = path.join(__dirname, 'src');
const MAMP_HTDOCS = 'C:\\MAMP\\htdocs';
const AGENCY_DIR = 'PIV';
// CLIENT_SLUG é definido dinamicamente a partir de brand_config.json → slugName
const templateDir = path.join(srcDir, 'template');

async function build() {
    console.log('Starting build...');

    // 1. Load Brand Config (must be first — distDir depends on slugName)
    let brandConfig = {};
    try {
        brandConfig = await fs.readJson(path.join(__dirname, 'brand_config.json'));
        console.log('Loaded brand_config.json');
    } catch (err) {
        console.warn('Warning: brand_config.json not found or invalid. Using empty config.');
    }

    const clientSlug = brandConfig.slugName;
    if (!clientSlug) {
        throw new Error('brand_config.json está sem "slugName". Defina o slug do cliente antes de buildar.');
    }
    const distDir = path.join(MAMP_HTDOCS, AGENCY_DIR, clientSlug);
    console.log(`Build target: ${distDir}`);

    // 2. Clean dist
    await fs.emptyDir(distDir);
    console.log('Cleaned dist directory.');

    // 3. Copy assets
    await fs.copy(path.join(srcDir, 'assets'), path.join(distDir, 'assets'));
    console.log('Copied assets.');

    // 3.1 Generate theme.css
    if (brandConfig.theme && brandConfig.theme.colors) {
        const colors = brandConfig.theme.colors;
        const fonts = brandConfig.theme.fonts;

        let cssContent = ':root {\n';

        // Colors
        for (const [key, value] of Object.entries(colors)) {
            cssContent += `    --bs-${key}: ${value};\n`;
            // Also generate RGB values for Bootstrap transparency utilities
            if (value.startsWith('#')) {
                const r = parseInt(value.slice(1, 3), 16);
                const g = parseInt(value.slice(3, 5), 16);
                const b = parseInt(value.slice(5, 7), 16);
                cssContent += `    --bs-${key}-rgb: ${r}, ${g}, ${b};\n`;
            }
        }

        // Fonts
        if (fonts) {
            if (fonts.headings) cssContent += `    --bs-heading-font-family: ${fonts.headings.family};\n`;
            if (fonts.body) cssContent += `    --bs-body-font-family: ${fonts.body.family};\n`;
        }

        cssContent += '}\n';

        // Add font imports
        let fontImports = '';
        if (fonts) {
            if (fonts.headings && fonts.headings.url) fontImports += `@import url('${fonts.headings.url}');\n`;
            if (fonts.body && fonts.body.url) fontImports += `@import url('${fonts.body.url}');\n`;
        }

        const finalCss = fontImports + cssContent;
        await fs.outputFile(path.join(distDir, 'assets/css/theme.css'), finalCss);
        console.log('Generated theme.css');
    }

    // 3.2 Update Archetypes
    try {
        console.log('Updating archetypes from GitHub...');
        const updateArchetypes = require('./scripts/update_archetypes.js');
        await updateArchetypes();
        console.log('Archetypes updated.');
    } catch (err) {
        console.error('Error updating archetypes:', err);
    }

    // 3.3 Create Zip of contents
    try {
        const filesDir = path.join(distDir, 'assets/files');
        if (await fs.pathExists(filesDir)) {

            // --- files.zip (Exclude stationery) ---
            console.log('Creating assets zip (excluding stationery)...');
            const output = fs.createWriteStream(path.join(distDir, 'assets/files.zip'));
            const archive = archiver('zip', { zlib: { level: 9 } });

            const filesZipPromise = new Promise((resolve, reject) => {
                output.on('close', () => {
                    console.log(archive.pointer() + ' total bytes (files.zip)');
                    console.log('files.zip created successfully.');
                    resolve();
                });
                archive.on('error', reject);
            });

            archive.pipe(output);

            // Add everything from filesDir EXCEPT stationery
            // We use ignore to exclude the stationery folder and its contents
            archive.glob('**/*', {
                cwd: filesDir,
                ignore: ['stationery', 'stationery/**']
            });

            await archive.finalize();
            await filesZipPromise;


            // --- stationery.zip (Only stationery) ---
            const stationeryDir = path.join(filesDir, 'stationery');
            if (await fs.pathExists(stationeryDir)) {
                console.log('Creating stationery zip...');
                const outputSt = fs.createWriteStream(path.join(distDir, 'assets/stationery.zip'));
                const archiveSt = archiver('zip', { zlib: { level: 9 } });

                const stationeryZipPromise = new Promise((resolve, reject) => {
                    outputSt.on('close', () => {
                        console.log(archiveSt.pointer() + ' total bytes (stationery.zip)');
                        console.log('stationery.zip created successfully.');
                        resolve();
                    });
                    archiveSt.on('error', reject);
                });

                archiveSt.pipe(outputSt);
                archiveSt.directory(stationeryDir, false);
                await archiveSt.finalize();
                await stationeryZipPromise;
            } else {
                console.log('No stationery directory found, skipping stationery.zip');
            }

        } else {
            console.warn('assets/files directory not found, skipping zip creation.');
        }

    } catch (err) {
        console.error('Error creating zips:', err);
    }

    // 4. Compile EJS
    const files = await fs.readdir(templateDir);
    for (const file of files) {
        if (path.extname(file) === '.ejs') {
            const filePath = path.join(templateDir, file);
            try {
                // Pass brandConfig and version to the template
                const html = await ejs.renderFile(filePath, { ...brandConfig, version: Date.now(), filename: filePath });
                const outputPath = path.join(distDir, path.basename(file, '.ejs') + '.html');
                await fs.writeFile(outputPath, html);
                console.log(`Compiled ${file} to ${path.basename(outputPath)}`);
            } catch (err) {
                console.error(`Error compiling ${file}:`, err);
            }
        }
    }

    console.log('Build complete!');
}

build().catch(err => console.error(err));
