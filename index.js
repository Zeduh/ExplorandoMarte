const {readFileSync, promises: fsPromises} = require('fs')

/* Receber conteudo do arquivo */
function pegarDados() {
    const encoding = 'utf-8';
    const caminho = './dados/entradaDados.txt';
    const conteudo = readFileSync(caminho, encoding);
    return conteudo
}

function converterConteudoLinha() {
    let linhas = pegarDados().split('\n').map(linha => linha.trim());
    return linhas
}

console.log(converterConteudoLinha())