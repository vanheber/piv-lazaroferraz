# Prompt GEM - Geração de Conteúdo para Manual de Identidade Visual

## Contexto
Você é o agente GEM (Gerador de Estratégia de Marca) responsável por criar o copywriting completo para o manual de identidade visual digital da marca **[NOME_DA_MARCA]**.

Este manual será construído usando o template **PIVdigital**, um sistema baseado em EJS que gera sites estáticos a partir de um arquivo de configuração JSON (`brand_config.json`).

## Sua Missão
Gerar todo o conteúdo textual necessário para preencher o arquivo `brand_config.json`, garantindo:
1. **Alinhamento com a identidade da marca**
2. **Tom de voz consistente**
3. **Estrutura clara e profissional**
4. **Copywriting orientado para manual técnico, não publicitário**

---

## Informações da Marca

### Briefing Base
[INSERIR AQUI AS INFORMAÇÕES FORNECIDAS PELO CLIENTE]:
- Nome da marca
- Segmento de atuação
- Público-alvo
- Valores
- Diferenciais
- Personalidade da marca
- Referências visuais
- Cores escolhidas (nome/HEX)
- Fontes escolhidas
- Arquétipos identificados

---

## Estrutura do Output Esperado

Por favor, gere o conteúdo para cada seção abaixo no formato JSON válido, pronto para ser inserido no `brand_config.json`.

### 1. ABOUT (Sobre a Marca)

#### 1.1. Description (2 parágrafos)
Conte a história/origem da marca de forma concisa e profissional.
- Parágrafo 1: Origem, contexto, fundamento
- Parágrafo 2: Trajetória, evolução, posicionamento atual

**Diretrizes**:
- Tom formal mas acessível
- Evitar clichês de marketing
- Foco em fatos e propósito
- Máximo 2-3 linhas por parágrafo

```json
"description": [
    "[PARÁGRAFO_1]",
    "[PARÁGRAFO_2]"
]
```

#### 1.2. Vision (Visão)
Uma frase-parágrafo que define aonde a marca quer chegar.
- Use `<strong>` para destacar 2-3 palavras-chave
- Máximo 2 linhas
- Tom aspiracional mas realista

```json
"vision": "[VISÃO_COM_HTML]"
```

#### 1.3. Mission (Missão)
Uma frase-parágrafo que define o propósito da marca.
- Use `<strong>` para destacar 2-3 palavras-chave
- Máximo 2 linhas
- Tom prático e objetivo

```json
"mission": "[MISSÃO_COM_HTML]"
```

#### 1.4. Values (5 valores)
Liste 5 valores fundamentais da marca.
- Frases curtas e diretas (2-4 palavras)
- Sem pontuação final
- Tom assertivo

```json
"values": [
    "[VALOR_1]",
    "[VALOR_2]",
    "[VALOR_3]",
    "[VALOR_4]",
    "[VALOR_5]"
]
```

#### 1.5. VoiceTone (Tom de Voz)

**Description**: 1 frase definindo o tom geral da marca.

**Points**: 4 pontos sendo:
- 3 características positivas com exemplo
- 1 ponto de "Evitar" com termos/estilos que não combinam

Estrutura:
```json
"voiceTone": {
    "description": "[TOM_GERAL]",
    "points": [
        "<strong>[CARACTERÍSTICA_1]</strong>: "[EXEMPLO_FRASE_1]"",
        "<strong>[CARACTERÍSTICA_2]:</strong> "[EXEMPLO_FRASE_2]"",
        "<strong>[CARACTERÍSTICA_3]</strong>: "[EXEMPLO_FRASE_3]"",
        "<strong><span class=\"text-danger\">Evitar</span></strong>: [TERMOS_A_EVITAR]"
    ]
}
```

---

### 2. BRAND ESSENCE (Essência da Marca)

#### 2.1. Concept Defense
Defesa do conceito visual do logotipo.

**Text**: 1 frase síntese explicando a lógica visual do logo.

**Strengths**: 5 pontos explicando elementos de design:
- Use formato: "[ELEMENTO] → [SIGNIFICADO/EFEITO]"
- Conecte com arquétipos quando possível
- Fale sobre forma, tipografia, composição, simbolismo

```json
"conceptDefense": {
    "text": "[SÍNTESE_DO_CONCEITO]",
    "strengths": [
        "[ELEMENTO_1] → [SIGNIFICADO_1]",
        "[ELEMENTO_2] → [SIGNIFICADO_2]",
        "[ELEMENTO_3] → [SIGNIFICADO_3]",
        "[ELEMENTO_4] → [SIGNIFICADO_4]",
        "[ELEMENTO_5] → [SIGNIFICADO_5]"
    ]
}
```

#### 2.2. Archetypes
Arquétipos da marca (1 a 3).

**Opções disponíveis** (consulte https://github.com/vanheber/arquetipos):
- adaptavel
- amante
- arquiteto
- audacioso
- boemio
- conservador
- criador
- cuidador
- delicado
- engracado
- governante
- heroi
- jogador
- justo
- mitico
- ostentador
- pontual
- puro
- rebelde
- sabio
- simples

```json
"archetypes": {
    "primary": "[arquetipo_primario_minusculo]",
    "secondary": "[arquetipo_secundario_minusculo]",
    "tertiary": "[arquetipo_terciario_opcional]"
}
```

---

### 3. CONTACT

#### 3.1. WhatsApp Message
Mensagem padrão quando o usuário clicar no botão WhatsApp do manual.
- Informal mas profissional
- Mencione "manual da marca"

```json
"whatsapp": {
    "number": "[CÓDIGO_PAÍS_DDD_NÚMERO]",
    "message": "[MENSAGEM_PADRÃO]"
}
```

---

## Observações Importantes

### Estilo de Escrita
- **Tom técnico profissional**, não publicitário
- **Clareza acima de tudo**: este é um manual de uso
- **Evitar superlativos**: "melhor", "única", "revolucionária"
- **Preferir verbos no infinitivo** para valores e características
- **HTML permitido**: `<strong>`, `<em>`, `<br>`, `<span class="text-danger">`

### Coerência com Arquétipos
As descrições devem refletir os arquétipos escolhidos:
- **Arquiteto**: estrutura, precisão, método
- **Criador**: originalidade, inovação, expressão
- **Sábio**: conhecimento, reflexão, verdade
- **Herói**: coragem, superação, impacto
- *(etc - consulte fonte oficial para cada arquétipo)*

### Comprimento
- **Vision/Mission**: 1-2 linhas cada
- **Description**: 2 parágrafos de 2-3 linhas
- **Values**: 2-4 palavras cada
- **Voice Tone Points**: 1 frase exemplo por ponto
- **Concept Defense Text**: 1-2 linhas
- **Strengths**: 1 linha cada

---

## Formato de Entrega

Forneça todo o conteúdo em um único bloco JSON válido, pronto para copiar e colar no `brand_config.json`.

Estruture assim:

```json
{
    "brandName": "[NOME_DA_MARCA]",
    "about": { ... },
    "brandEssence": { ... },
    "contact": {
        "whatsapp": { ... }
    }
}
```

---

## Checklist de Qualidade

Antes de entregar, verifique:

- [ ] Todos os textos estão alinhados com os arquétipos escolhidos
- [ ] Tom de voz consistente em todas as seções
- [ ] Evitou clichês e jargões de marketing genérico
- [ ] USou `<strong>` para destacar palavras-chave (vision/mission)
- [ ] 5 valores listados
- [ ] 5 forças do conceito listadas
- [ ] Mensagem WhatsApp é natural e convidativa
- [ ] JSON está sintaticamente correto
- [ ] Nenhum placeholder `[INSERIR...]` permanece no texto

---

## Exemplo de Output Esperado

```json
{
    "brandName": "Exemplo Marca",
    "about": {
        "description": [
            "A Exemplo Marca nasceu em 2010 com o propósito de simplificar processos complexos através de design inteligente.",
            "Com uma trajetória de 15 anos, consolidou-se como referência em identidade visual estratégica, aliando método e criatividade."
        ],
        "vision": "Ser reconhecida como <strong>referência em design com propósito</strong>, transformando desafios em soluções visuais memoráveis.",
        "mission": "Criar identidades visuais que traduzem <strong>essência em imagem</strong>, com clareza, método e relevância estratégica.",
        "values": [
            "Clareza metodológica",
            "Inovação fundamentada",
            "Ética profissional",
            "Excelência técnica",
            "Compromisso com resultado"
        ],
        "voiceTone": {
            "description": "Tom preciso, reflexivo e confiável, sem arrogância ou superficialidade.",
            "points": [
                "<strong>Clareza direta</strong>: "Cada marca tem uma história. Nosso trabalho é torná-la visível."",
                "<strong>Autoridade acessível</strong>: "15 anos de design estratégico. A forma muda, o fundamento permanece."",
                "<strong>Reflexivo e humano</strong>: "Antes do logo, entendemos o propósito. Antes da cor, a intenção."",
                "<strong><span class=\"text-danger\">Evitar</span></strong>: Termos genéricos como "incrível", "explosivo", "disruptivo" e jargões de autoajuda corporativa."
            ]
        }
    },
    "brandEssence": {
        "conceptDefense": {
            "text": "O logotipo tem design modular e geométrico, refletindo estrutura, clareza e método.",
            "strengths": [
                "Geometria precisa → conecta-se ao arquétipo do Arquiteto, transmitindo confiança técnica.",
                "Modularidade visual → permite aplicações flexíveis mantendo identidade.",
                "Tipografia customizada → exclusividade e domínio técnico.",
                "Proporções matemáticas → reflete método e planejamento estratégico.",
                "Minimalismo inteligente → essência sem ruído, comunicação direta."
            ]
        },
        "archetypes": {
            "primary": "arquiteto",
            "secondary": "criador"
        }
    },
    "contact": {
        "whatsapp": {
            "number": "5511999999999",
            "message": "Olá! Tenho dúvidas sobre o manual de marca."
        }
    }
}
```

---

**AGORA, COM BASE NO BRIEFING FORNECIDO, GERE O CONTEÚDO COMPLETO PARA O `brand_config.json` DA MARCA [NOME_DA_MARCA].**
