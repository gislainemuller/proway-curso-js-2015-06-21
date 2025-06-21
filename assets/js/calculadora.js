//function para que serve?? contém um trecho de codigo que tem o objetivo de resolver algum problema//
function realizarSoma() {
    let inputNumero1= document.querySelector("#campo-numero1");
    let numero1= parseInt(inputNumero1.value);

    let inputNumero2= document.querySelector("#campo-numero2");
    let numero2= parseInt(inputNumero2.value);


    alert ("Soma: "+ (numero1 + numero2))
    
}



function apresentarVariaveis(){
    let nome = "Pedro";
    let sobrenome = "Carlos";
    let idade = 20;
    let salario = 1800.20;
    let empregado = false; // falso= false, verdadeiro=>true

    //comentário em linha
    /*comentário em bloco (pq pode conter várias linhas)*/
    /*
    Tipos de dados:
    String => armazenar texto
    int=> inteiro
    float => números reais
    boolean => tipo lógico (vdd,falso)
    */


    //Adicionar 15 reais de aumento para o Pedro
    
    let aumento = 15.00
   salario= salario + aumento
    alert("Nome: "+ nome +" Salario: "+ salario)
    // + => concatenar (juntar duas coisas)
    // + => somar (2+2 => 4)
}

function apresentarIdade(){
    let dataNascimento = new Date (2024, 7, 15);
    let anoNascimento = dataNascimento.getFullYear();

    let dataHoraAtual = new Date();
    let anoAtual = dataHoraAtual.getFullYear(); 

    let idade = anoAtual - anoNascimento;
    
    console.log("Idade: "+ idade);

    if (idade <= 17){
        console.log ("Menor de idade")
} else {
    console.log("Adulto");
}
}