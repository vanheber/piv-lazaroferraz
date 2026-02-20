const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'src/assets/img');

const renames = [
    { old: 'logotipo-projeto-de-desenho-grafico.webp', new: 'moodheader.webp' },
    { old: 'navegador.webp', new: 'moodsite.webp' },
    { old: 'freelancer-de-designer-grafico-de-mulher-asiatica-trabalhando-horas-extras-a-noite-usando-tablet-para-desenhar-trabalho-de-arte-conceito-de-casa.webp', new: 'moodimg01.webp' },
    { old: 'um-estrategista-de-marca-projetando-um-logotipo-em-um-tablet-grafico-em-um-escritorio-moderno.webp', new: 'moodimg02.webp' },
    { old: 'homem-barbudo-cruzou-os-bracos.webp', new: 'moodimg03.webp' },
    { old: 'homem-curtindo-um-jogo-de-sudoku-no-papel.webp', new: 'moodimg04.webp' },
    { old: 'homem-sorridente-de-copia-espaco.webp', new: 'moodimg05.webp' },
    { old: 'jovem-designer-grafico-trabalhando-no-escritorio.webp', new: 'moodimg06.webp' },
    { old: 'jovem-escrevendo-em-sua-agenda-na-praia.webp', new: 'moodimg07.webp' },
    { old: 'mao-de-homem-barbudo-no-queixo.webp', new: 'moodimg08.webp' },
    { old: 'retrato-de-confiante-homem-jovem-com-headphone-ao-redor-seu-pescoco-ficar-com-seu-bracos-cruzaram-contra-branca-parede.webp', new: 'moodimg09.webp' },
    { old: 'varios-esbocos-de-produtos.webp', new: 'moodimg10.webp' },
    { old: 'assinatura.webp', new: 'moodimg11.webp' }
];

renames.forEach(item => {
    const oldPath = path.join(imgDir, item.old);
    const newPath = path.join(imgDir, item.new);
    if (fs.existsSync(oldPath)) {
        fs.renameSync(oldPath, newPath);
        console.log(`Renamed: ${item.old} -> ${item.new}`);
    } else {
        console.log(`File not found: ${item.old}`);
    }
});
