const {readFileSync, promises: fsPromises} = require('fs')

// Inicializadores
let tamanhoPlanalto = {minX: 0, minY: 0, maxX: 0, maxY: 0}

// Leitura e tratamento dos dados
// Receber conteudo do arquivo
function pegarDados() {
    const encoding = 'utf-8';
    const caminho = './dados/entradaDados.txt';
    let conteudo = readFileSync(caminho, encoding);
    return conteudo
}
// Converter linhas do conteudo em um array
function converterConteudoLinha() {
    let arrayConteudo = pegarDados().split('\n').map(linha => linha.trim());
    return arrayConteudo
}

/* Manipuladores */
function definirCoordenadaMaxima(comandos) {
    const maxX = Number(comandos.split(' ')[0]);
    const maxY = Number(comandos.split(' ')[1]);
    if(maxX && maxY) {
        tamanhoPlanalto = {...tamanhoPlanalto, maxX, maxY};
    } else {
        throw new Error('Valor de coordenada maxima inválido')
    }
}

function iterarLinhas(linhas) {
    linhas = converterConteudoLinha()
    linhas.forEach((comandos, indexLinha) => {
        if(indexLinha === 0) {
            definirCoordenadaMaxima(comandos);
        }
    })
    return linhas
}



console.log(iterarLinhas())
console.log(tamanhoPlanalto)