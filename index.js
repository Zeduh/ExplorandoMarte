/* Inicializadores */
const {readFileSync, promises: fsPromises} = require('fs')
let tamanhoPlanalto = {minX: 0, minY: 0, maxX: 0, maxY: 0}
let listaSondas = []
const direcoesValidas = ['N', 'E', 'S', 'W'];
const comandosMovimentoValidos = ['L', 'R', 'M', 'P'];

/*Leitura, tratamento e iteração dos dados. */
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
// Iteracao para definir tamanho da area, sondas e suas instruções
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
        // console.log(`Sonda criada em ${coordenadaX} ${coordenadaY} ${direcao}`) /* TESTE */
        } else {
            throw new Error('Dados de inicialização de sonda inválidos');
    }
}

// Recebe comandos e realiza instruções 
// Envia erro em caso de dados inválidos
function realizarInstrucoesSonda(comandos) {
    const listaComandos = comandos.split('');
    const indexSondaAtual = listaSondas.length - 1;
    listaComandos.map((comando) => comando.toUpperCase()).forEach((comando) => {
        if(comandosMovimentoValidos.includes(comando)) {
            switch(comando) {
                case 'L':
                case 'R':
                    // console.log('Virando Sonda') /* TESTE */
                    virarSonda(comando, indexSondaAtual)
                    break;
                case 'M':
                    // console.log('Movendo Sonda') /* TESTE */
                    moverSonda(indexSondaAtual)
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

// Realiza ação de virar a sonda 
// Envia erro em caso de sonda não encontrada
function virarSonda(direcao, indexSonda) {
    const sonda = listaSondas[indexSonda];
    const virarDirecao = direcao === 'L' ? -1: 1;
    if(sonda) {
        const indexDirecaoSondaAtual = direcoesValidas.findIndex((direcao) => direcao === sonda.direcao);

        let indexNovaDirecao = indexDirecaoSondaAtual + virarDirecao;
        if(indexNovaDirecao < 0) {
            indexNovaDirecao = direcoesValidas.length-1;
        } else if(indexNovaDirecao === direcoesValidas.length){
            indexNovaDirecao = 0;
        }
        listaSondas[indexSonda].direcao = direcoesValidas[indexNovaDirecao];
        // console.log(`Virando sonda para ${sonda.direcao}`) /* TESTE */
        // console.log(listaSondas) /* TESTE */
    } else {
        throw new Error('Sonda não encontrada');
    }
}

// Realiza a ação de mover a sonda verificando o espaço disponível.
function moverSonda (indexSonda) {
    const sonda = listaSondas[indexSonda];
    if(sonda) {
        switch(sonda.direcao) {
            case 'N':
                listaSondas[indexSonda].coordenadaY = Math.min(listaSondas[indexSonda].coordenadaY+1, tamanhoPlanalto.maxY);
                break;
            case 'E':
                listaSondas[indexSonda].coordenadaX = Math.min(listaSondas[indexSonda].coordenadaX+1, tamanhoPlanalto.maxX);
                break;
            case 'S':
                listaSondas[indexSonda].coordenadaY = Math.min(listaSondas[indexSonda].coordenadaY-1, tamanhoPlanalto.maxY);
                break;
            case 'W':
                listaSondas[indexSonda].coordenadaX = Math.min(listaSondas[indexSonda].coordenadaX-1, tamanhoPlanalto.maxX);
                break;
        }
        // console.log('Sonda movida') /* TESTE */
    } else {
        throw new Error('Sonda não encontrada')
    }
}

/* Utils */
// Verifica se a variável é um numero
function isNumber (valor) {
    return !isNaN(Number(valor)) && isFinite(valor);
}

//Retorna a saida com as posições x e y das sonda junto com a direção
function saidaSondas () {
    listaSondas.forEach((sonda) => console.log(`${sonda.coordenadaX} ${sonda.coordenadaY} ${sonda.direcao}`))
}

iterarLinhas()
// console.log(tamanhoPlanalto) /* TESTE */
// console.log(listaSondas) /* TESTE */