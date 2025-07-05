function criarImagem() {
    /*
     <img 
        alt="Pico de Blumenau" 
        src="https://media-cdn.tripadvisor.com/media/photo-s/0e/34/4c/c1/vista-do-spitzkopf.jpg">
    */
    // Criando uma tag img para depois adicionarmos na página
    const imagem = document.createElement("img");
    // Definir o alt da imagem(texto descritivo da imagem)
    imagem.setAttribute("alt", "Pico de Blumenau");

    imagem.setAttribute("src", "https://media-cdn.tripadvisor.com/media/photo-s/0e/34/4c/c1/vista-do-spitzkopf.jpg");

    // Pegar o body da página
    const body = document.querySelector("body");

    // Adicionar a imagem na página
    body.appendChild(imagem);
}

function criarCurso() {
    // Pegar o campo por id utilizando query selector
    // const campoCurso = document.querySelector("#campo-curso");

    // Pegar o elemento por id utilizando getElementById
    const campoCurso = document.getElementById("campo-curso");

    // Pegar o valor que o usuário digitou no curso
    const curso = campoCurso.value;

    // Criar um elemento de ul (lista não ordenada)
    // <ul>
    //     <li>JS</li>
    // </ul>

    // Pega todos os elementos <ul> (listas não ordenadas) da página.
    // Isso retorna uma coleção(lista) de elementos, mesmo que só exista um <ul>.
    const listaNaoOrdenada = document.getElementsByTagName("ul");

    let ul = undefined;

    // Verifica se não foi encontrado nenhum <ul> na página
    if (listaNaoOrdenada.length === 0) {
        // Se não existe nenhum <ul>, cria um novo elemento <ul>
        ul = document.createElement("ul");
    } else { // senão
        // Se já existe ao menos um <ul>, pega o primeiro da lista
        ul = listaNaoOrdenada[0];
    }

    // Cria um novo elemento <li> (item da lista)
    const li = document.createElement("li");

    // Define o conteúdo HTML do <li> com o valor da variável `curso`
    li.innerHTML = curso;

    // Adiciona o <li> como filho do <ul>, ou seja, coloca o item na lista
    ul.appendChild(li);

    // Obtém o elemento <body> da página (usando índice [0] pois getElementsByTagName retorna uma coleção)
    const body = document.getElementsByTagName("body")[0];

    // Adiciona o <ul> ao <body> da página, caso ainda não esteja presente
    body.appendChild(ul);
}

let mercado = [
    "Abacate",
    "Morango",
    "Banana",
    "Abacaxi",
    "Café",
    "X-Calabresa",
    "X-Tudo",
    "Toddy",
    "Frango",
    "Trigo",
    "Pão",
    "Leite",
    "Queijo",
    "Presunto",
    "Ovos",
    "Arroz",
    "Feijão",
    "Macarrão",
    "Molho de tomate",
    "Óleo",
    "Açúcar",
    "Sal",
    "Farinha de mandioca",
    "Manteiga",
    "Refrigerante",
    "Água mineral",
    "Sabonete",
    "Shampoo",
    "Papel higiênico",
    "Detergente",
    "Amaciante",
    "Desinfetante",
    "Biscoito",
    "Iogurte",
    "Carne moída",
    "Linguiça"
];

// Inicializa a variável que armazena o número da página atual, começando na primeira (0)
let pagina = 0;

// Inicializa a variável que armazenará a quantidade de itens por página
let quantidade = 0;

// Inicializa a variável que armazenará o total de páginas disponíveis
let quantidadePaginas = 0;

function voltarPrimeiraPagina(){
    // Reseta a página para a primeira página (índice 0)
    pagina = 0;

    // Atualiza a quantidade total de páginas com base na quantidade atual de itens por página
    preencherQuantidadePaginaAtual();

    // Carrega os itens correspondentes à página atual
    carregarItens();

    // Atualiza o texto que indica qual página está sendo exibida
    preencherPagina();
}

function proximaPagina() {
    // Atualiza a quantidade total de páginas
    preencherQuantidadePaginaAtual();

    // Pausa a execução para depuração (debugger)
    

    // Verifica se a próxima página ultrapassaria o total de páginas disponíveis; se sim, interrompe
    if (pagina + 1 >= quantidadePaginas){
        return;
    }

    // Incrementa o número da página para avançar para a próxima página
    pagina = pagina + 1;

    // Carrega os itens da nova página
    carregarItens();

    // Atualiza o texto que indica a página atual
    preencherPagina();
}

function voltarPagina() {
    // Atualiza a quantidade total de páginas
    preencherQuantidadePaginaAtual();

    // Verifica se é possível voltar para a página anterior (não pode ser menor que 0)
    if (pagina - 1 >= 0) {
        // Decrementa o número da página para voltar uma página
        pagina = pagina - 1;

        // Carrega os itens da página anterior
        carregarItens();

        // Atualiza o texto que indica a página atual
        preencherPagina();
    }
}

function preencherQuantidadePaginaAtual() {
    // Obtém o valor digitado no campo que indica a quantidade desejada de itens por página
    quantidade = document.getElementById("campo-quantidade-desejada").value;

    // Calcula a quantidade total de páginas necessárias, arredondando para cima
    quantidadePaginas = Math.ceil(mercado.length / quantidade);
}

function preencherPagina() {
    // Seleciona o elemento onde será exibido o texto da página atual
    let span = document.getElementById("texto-pagina");

    // Atualiza o texto para mostrar a página atual (1-based) e o total de páginas
    span.innerText = `Página ${pagina + 1} de ${quantidadePaginas} itens`;
}

function carregarItens() {
    // Seleciona a tabela onde os produtos serão exibidos
    let tabela = document.getElementById("mercadinho");

    // Seleciona o corpo da tabela (tbody) para inserir as linhas dos produtos
    let tbody = tabela.getElementsByTagName("tbody")[0];

    // Calcula o índice inicial do produto a ser exibido na página atual
    let inidiceInicial = quantidade * pagina;

    // Limpa o conteúdo anterior do corpo da tabela para evitar duplicação
    tbody.innerHTML = "";

    // Loop para adicionar os itens da página atual à tabela
    for (let i = 0; i < quantidade; i = i + 1) {
        // Calcula o índice do item no array original de produtos
        let indiceAtual = inidiceInicial + i;

        // Se o índice ultrapassar o tamanho da lista de produtos, interrompe o loop
        if (indiceAtual >= mercado.length)
            break;

        // Adiciona uma nova linha com o nome do produto na tabela
        tbody.innerHTML += `<tr><td>${mercado[indiceAtual]}</td></tr>`;
    }
}

// Inicializa a quantidade de páginas e carrega os itens da primeira página ao carregar o script
preencherQuantidadePaginaAtual();
carregarItens();
preencherPagina();
