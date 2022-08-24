const fs = require('fs')


function pegarDados() {
    const encoding = 'utf-8';
    const path = './dados/entradaDados.txt';
    let entradaDados = fs.readFile(path, encoding, (erro, entradaDados) =>{
        if(erro) {
            console.log(erro)
        }
        console.log(entradaDados);
    });
}

pegarDados()