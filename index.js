const {readFileSync, promises: fsPromises} = require('fs')

/* Inicializadores */
let tamanhoPlanalto = {minX: 0, minY: 0, maxX: 0, maxY: 0}
let listaSondas = []
const direcoesValidas = ['N', 'E', 'S', 'W'];
const comandosMovimentoValidos = ['L', 'R', 'M', 'P'];

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

/* Utils */
// Verifica se a variável é um numero
function isNumber (valor) {
    return !isNaN(Number(valor)) && isFinite(valor);
}

//Retorna a saida com as posições x e y das sonda junto com a direção
function saidaSondas () {
    listaSondas.forEach((sonda) => console.log(`${sonda.x} ${sonda.y} ${sonda.direcao}`))
}

/* Manipuladores */
// Recebe primeira linhas de comando para definir as coordenadas maximas do planalto
// Envia erro em caso de dados inválidos
function definirCoordenadaMaxima(comandos) {
    const maxX = Number(comandos.split(' ')[0]);
    const maxY = Number(comandos.split(' ')[1]);
    if(maxX && maxY) {
        tamanhoPlanalto = {...tamanhoPlanalto, maxX, maxY};
    } else {
        throw new Error('Valor de coordenada maxima inválido')
    }
}

// Recebe comando para definir uma nova sonda na lista de sondas
// Envia erro em caso de dados inválidos
function criarNovaSonda(comandos) {
    const coordenadaX = Number(comandos.split(' ')[0]);
    const coordenadaY = Number(comandos.split(' ')[1]);
    const direcao = comandos.split(' ')[2];

    if(isNumber(coordenadaX) && isNumber(coordenadaY) && direcoesValidas.includes(direcao)) {
        listaSondas.push({
            coordenadaX,
            coordenadaY,
            direcao,
        });
        } else {
            throw new Error('Dados de inicialização de sonda inválidos');
    }
}

function realizarInstrucoesSonda(comandos) {
    const listaComandos = comandos.split('');
    const indexSondaAtual = listaSondas.length - 1;
    listaComandos.map((comando) => comando.toUpperCase()).forEach((comando) => {
        if(comandosMovimentoValidos.includes(comando)) {
            switch(comando) {
                case 'L':
                case 'R':
                    console.log('Virando Sonda')
                    // virarSonda(comando, indexSondaAtual)
                    break;
                case 'M':
                    console.log('Movendo Sonda')
                    //moverSonda(indexSondaAtual)
                    break;
                case 'P':
                default:
                    return;
            }
        } else {
            throw new Error('Comandos de movimentação inválidos')
        }
    })
}

function iterarLinhas() {
    let linhas = converterConteudoLinha()
    linhas.forEach((comandos, indexLinha) => {
        if(indexLinha === 0) {
            definirCoordenadaMaxima(comandos);
        } else if(indexLinha % 2 === 1) {
            // linhas pares devem ser coordenadas de posição inicial de uma sonda.
            criarNovaSonda(comandos);
        } else {
            // linhas impares devem ser instruções de movimentação de uma sonda.
            realizarInstrucoesSonda(comandos);
        }
    });
    
    saidaSondas();
}


console.log(iterarLinhas())
// console.log(tamanhoPlanalto)
// console.log(listaSondas)