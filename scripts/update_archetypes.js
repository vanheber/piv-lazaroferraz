const https = require('https');
const fs = require('fs');
const path = require('path');

const MARKDOWN_URL = 'https://raw.githubusercontent.com/vanheber/arquetipos/refs/heads/main/arquetipos_descricoes.md';
const OUTPUT_FILE = path.join(__dirname, '../src/template/brandessence.ejs');

const IMAGE_MAP = {
    'Adaptável': 'adaptable',
    'Amante': 'lover',
    'Arquiteto': 'architect',
    'Audacioso': 'audacious',
    'Boêmio': 'Bohemian',
    'Conservador': 'conservative',
    'Criador': 'cardwheel', // Fallback or missing
    'Cuidador': 'caregiver',
    'Delicado': 'delicate',
    'Engraçado': 'funny',
    'Governante': 'ruler',
    'Herói': 'hero',
    'Jogador': 'player',
    'Justo': 'fair',
    'Mítico': 'mystic',
    'Ostentador': 'ostentatious',
    'Pontual': 'punctual',
    'Puro': 'pure',
    'Rebelde': 'rebel',
    'Sábio': 'wise',
    'Simples': 'naive'
};

function fetchMarkdown(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

async function run() {
    try {
        console.log('Fetching markdown...');
        const markdown = await fetchMarkdown(MARKDOWN_URL);
        console.log('Markdown fetched. Length:', markdown.length);

        const archetypes = [];
        const sections = markdown.split(/^# /gm); // Split by H1

        for (const section of sections) {
            if (!section.trim()) continue;

            const lines = section.split('\n').map(l => l.trim());
            const name = lines[0]; // First line is the name

            if (!IMAGE_MAP[name]) {
                continue;
            }

            const imageFilename = IMAGE_MAP[name];
            // Normalize name to create a match key (lowercase, no accents)
            // e.g. "Adaptável" -> "adaptavel", "Sábio" -> "sabio"
            const matchKey = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

            let description = '';
            let positive = [];
            let negative = [];
            let imageUrl = '';

            // Find description and Image
            let descLines = [];
            let startCapturing = false;

            for (let i = 1; i < lines.length; i++) {
                const line = lines[i];

                if (line.startsWith('###')) break; // Stop at subheaders
                if (line.startsWith('---')) break; // Stop at horizontal rule

                // Extract Image URL
                const imgMatch = line.match(/!\[.*?\]\((.*?)\)/);
                if (imgMatch) {
                    imageUrl = imgMatch[1];
                    startCapturing = true; // Start capturing description after image
                    continue;
                }

                // If we haven't seen the image yet, but we see text, it might be description
                if (!startCapturing && line.trim() !== '') {
                    startCapturing = true;
                }

                if (startCapturing && line.trim() !== '') {
                    descLines.push(line.trim());
                }
            }

            // Format description with <p> tags
            // First paragraph gets mb-2, others get standard p
            if (descLines.length > 0) {
                description = descLines.map((line, index) => {
                    // Convert bold
                    const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                    return index === 0 ? `<p class="mb-2">${formattedLine}</p>` : `<p>${formattedLine}</p>`;
                }).join('');
            }

            // Now look for Positive/Negative terms
            const fullText = section;
            const posMatch = fullText.match(/###\s*Termos\s*Positivos\s*([\s\S]*?)(?=\n\n|###|$)/i);
            if (posMatch) {
                positive = posMatch[1].split('\n').map(s => s.replace(/^- /, '').trim()).filter(s => s);
            }

            const negMatch = fullText.match(/###\s*Termos\s*Negativos\s*([\s\S]*?)(?=\n\n|###|$)/i);
            if (negMatch) {
                negative = negMatch[1].split('\n').map(s => s.replace(/^- /, '').trim()).filter(s => s);
            }

            archetypes.push({ name, key: matchKey, imageFilename, description, positive, negative, imageUrl });
        }

        console.log(`Found ${archetypes.length} archetypes.`);

        // Generate HTML
        let html = '';

        archetypes.forEach(arch => {
            // Use extracted image URL or fallback to local if missing (using English filename)
            const imgSource = arch.imageUrl || `assets/img/cardsColor/${arch.imageFilename}.webp`;

            html += `
        <!-- ${arch.name} -->
        <div class="row gy-4 gy-md-0 py-3 <%= brandEssence.archetypes.primary === '${arch.key}' ? 'order-1' : (brandEssence.archetypes.secondary === '${arch.key}' ? 'order-2' : 'order-3 d-none') %>"
            id="${arch.key}">
            <div class="col-md-6">
                <div class="m-xl-5 p-xl-5">
                    <img class="rounded img-fluid fit-cover min-h-300 <%= brandEssence.archetypes.secondary === '${arch.key}' ? 'w-75 mx-auto d-block' : 'w-100' %>"
                        src="${imgSource}" alt="${arch.name} Archetype">
                </div>
            </div>
            <div class="col-md-6 d-md-flex align-items-md-center">
                <div class="mw-350">
                    <div class="mb-2">
                        <% if (brandEssence.archetypes.primary === '${arch.key}') { %>
                            <span class="badge bg-black text-white p-2">PRIMÁRIO</span>
                        <% } %>
                        <% if (brandEssence.archetypes.secondary === '${arch.key}') { %>
                            <span class="badge bg-secondary text-white p-2">SECUNDÁRIO</span>
                        <% } %>
                    </div>
                    <h3>${arch.name}</h3>
                    ${arch.description}
                    
                    ${(arch.positive.length > 0 || arch.negative.length > 0) ? `
                    <div class="row g-3 mt-4">
                        ${arch.positive.length > 0 ? `
                        <div class="col-12 col-xxl-6">
                            <div class="text-white bg-success rounded-4 h-100 p-3">
                                <h4 class="mb-2 h6">Termos positivos</h4>
                                <ul class="list-inline mb-0">
                                    ${arch.positive.map(t => `<li class="list-inline-item text-bg-light list-inline-item list-inline-item badge">${t}</li>`).join('\n                                    ')}
                                </ul>
                            </div>
                        </div>` : ''}
                        ${arch.negative.length > 0 ? `
                        <div class="col-12 col-xxl-6">
                            <div class="text-white bg-danger rounded-4 h-100 p-3">
                                <div class="d-flex justify-content-between align-items-center">
                                    <h4 class="mb-2 h6">Termos negativos</h4>
                                    <span class="badge text-bg-dark">EVITAR</span>
                                </div>
                                <ul class="list-inline mb-0">
                                    ${arch.negative.map(t => `<li class="list-inline-item text-bg-light list-inline-item list-inline-item badge">${t}</li>`).join('\n                                    ')}
                                </ul>
                            </div>
                        </div>` : ''}
                    </div>` : ''}
                </div>
            </div>
        </div>
`;
        });

        // Read template
        let template = fs.readFileSync(OUTPUT_FILE, 'utf8');

        // Replace content
        const regex = /<!-- Archetypes Logic -->([\s\S]*?)<!-- Add other archetypes similarly with the d-none logic based on config -->/;

        if (!regex.test(template)) {
            console.error('Could not find archetypes section in template.');
            return;
        }

        const newContent = `<!-- Archetypes Logic -->
        <!-- Generated from GitHub Source -->
        ${html}
        `;

        const updatedTemplate = template.replace(regex, newContent + '<!-- Add other archetypes similarly with the d-none logic based on config -->');

        fs.writeFileSync(OUTPUT_FILE, updatedTemplate);
        console.log('Template updated successfully.');

    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

if (require.main === module) {
    run();
} else {
    module.exports = run;
}
