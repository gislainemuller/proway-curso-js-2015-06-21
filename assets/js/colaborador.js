let botaoSalvar = document.getElementById("botao-salvar");
let botaoCancelar = document.getElementById("botao-cancelar");
let tabelaCorpo = document.getElementById("colaboradores");

let campoNome = document.getElementById("campo-nome");
let campoSobrenome = document.getElementById("campo-sobrenome");
let campoQuantidadeHoras = document.getElementById("campo-quantidade-horas");
let campoValorHora = document.getElementById("campo-valor-hora");

const modal = new bootstrap.Modal (document.getElementById("exampleModal"));

let colaboradores = [];
let idEditar = undefined;
let idAtual = 1;

function limparCampos(){
 campoNome.value = "";
 campoSobrenome.value = "";
 campoQuantidadeHoras.value = "";
 campoValorHora.value = "";
}

function salvar(){
    if(idEditar === undefined)
        cadastrar();

    else
    editar();
salvarLocalStorage();
limparCampos();
listarColaboradores();
modal.hide();

}
function cadastrar(){
 const nome = campoNome.value;
 const sobrenome = campoSobrenome.value;
 const quantidadeHoras = parseInt (campoQuantidadeHoras.value);
 const valorHora = parseFloat (campoValorHora.value);
 let colaborador ={
    nome: nome,
    id: idAtual++,
    sobrenome: sobrenome,
    quantidadeHoras: quantidadeHoras,
    valorHora: valorHora,
 }
 colaboradores.push(colaborador);
}

function editar(){
    let colaborador = colaboradores.find ((colaborador) => colaborador.id === idEditar);
    colaborador.nome = campoNome.value;
    colaborador.sobrenome = campoSobrenome.value;
    colaborador.quantidadeHoras= campoQuantidadeHoras.value;
    colaborador.valorHora = campoValorHora.value;
}

function listarColaboradores(){
    //Limpar os registros da table
    tabelaCorpo.innerHTML ="";
    colaboradores.forEach ((colaborador) => {
        criarLinha(colaborador);

    })
}
function criarLinha(colaborador){
    const nomeCompleto = `${colaborador.nome} ${colaborador.sobrenome}`
    const salarioBruto = colaborador.quantidadeHoras * colaborador.valorHora;
    let linha=`<tr>
                    <td>${colaborador.id}</td>
                    <td>${nomeCompleto}</td>
                    <td>${colaborador.quantidadeHoras}</td>
                    <td>${colaborador.valorHora}</td>
                    <td>${salarioBruto}</td>
                    <td>
                        <button class="btn btn-primary" onclick="popularCamposParaEditar(${colaborador.id})"><i class="fa-solid fa-pencil"></i>Editar</button>
                        <button class="btn btn-danger" onclick="apagar(${colaborador.id})"><i class="fa-solid fa-trash"></i>Apagar</button>
                    </td>
                </tr>`
    // Adicionar a linha na tabela
    tabelaCorpo.innerHTML += linha;
}

function popularCamposParaEditar(colaboradorId){
    let colaborador = colaboradores.find ((colaborador) => colaborador.id === colaboradorId);
    campoNome.value = colaborador.nome;
    campoSobrenome.value= colaborador.sobrenome;
    campoQuantidadeHoras.value = colaborador.quantidadeHoras;
    campoValorHora.value = colaborador.valorHora;

    //Abrir a modal via JS
    const modal = new bootstrap.Modal (document.getElementById("exampleModal"));
    modal.show();

    idEditar = colaborador.id;

}

function salvarLocalStorage(){
    let colaboradoresString = JSON.stringify(colaboradores);
    localStorage.setItem("colaboradores", colaboradoresString);

}

function carregarDoLocalStorage(){
  let colaboradoresStringJson = localStorage.getItem("colaboradores")
  if (colaboradoresStringJson === null)
     return
    colaboradores = JSON.parse (colaboradoresStringJson);
    listarColaboradores();
    preencherIdAtualComMaiorID();
}

 function preencherIdAtualComMaiorID(){
    if (colaboradores.length === 0)
        return

    let maiorId= 1;
    colaboradores.forEach((colaborador) => {
        if (colaborador.id > maiorId)
            maiorId = colaborador.id;
    })
    idAtual = ++maiorId;
 }

function apagar(colaboradorId) {
    colaboradores = colaboradores.filter(curso => curso.id !== colaboradorId);
    salvarLocalStorage();
    listarColaboradores();
}

function atribuirClique(){
    botaoCancelar.addEventListener("click", limparCampos);
    botaoSalvar.addEventListener("click", salvar);
}

atribuirClique();
carregarDoLocalStorage();