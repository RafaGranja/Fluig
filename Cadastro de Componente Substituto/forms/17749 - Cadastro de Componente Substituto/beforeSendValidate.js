/*class COMPSUBSTITUTO{
    constructor(coligada,estrutura,codatividade,prodorigem,produto,qtdusada,codfilial){

        this.codfilial=codfilial;
        this.coligada=coligada;
        this.estrutura=estrutura;
        this.codatividade=codatividade;
        this.prodorigem=prodorigem;
        this.produto=produto;
        this.qtdusada=qtdusada;
    
    }
}*/
//EVENTO DE PROCESSO QUE RODA NO MOMENTO QUE O USUÀRIO CLICA EM ENVIAR
var beforeSendValidate = function (numState, nextState) {

    console.log("Entrei no beforeSendValidate...")

    var qtdprincipais = parseInt($("#CONTADORPRINCIPAIS").val()); 
    
    var card=0;
    var row=0;
    var erro=new Array();

    console.log("Vou remover as linhas de substitutos vazias...")
    removeLinhasVazias();
    console.log("Vou remover os componentes principais vazios...")
    removerCardVazios();
    try{
        for(card=0;card<qtdprincipais;card++){

            //RELAÇÃO DA QUANTIDADES DE ITENS ADICIONADOS E EXCLUIDOS NA TABELA ROW
            var qtdsubstitutos=Number($("#CONTADOR_"+card).val())-Number($("#EXCLUIDOS_"+card).val());

            console.log("principal "+card+" possui "+ qtdsubstitutos + " linhas a serem processadas");

            qtdsubstitutos=Number($("#CONTADOR_"+card).val());

            for(row=1;row<=qtdsubstitutos;row++){

                var prod=$("#VIEWPROD_"+card+"_"+row).val()

                formataValorPonto($("#QTDSUBSTITUTO_"+card+"_"+row))
                var qtdusada=$("#QTDSUBSTITUTO_"+card+"_"+row).val();
                qtdusada=parseFloat(qtdusada)
                formataValorVirgula($("#QTDSUBSTITUTO_"+card+"_"+row))
                
                if(prod!=null && prod!="" && prod!=undefined){
                    if (qtdusada==null || qtdusada=="" || qtdusada==undefined){

                        console.log("entrei no erro de quantidade");
                        var error = "O componente "+ $("#CODPRINCIPAL_"+card).text() + " possui o substituto " + $("#VIEWPROD_"+card+"_"+row).val() + " sem quantidade informada";

                        erro.length=0;
			            erro.push("error","Quantidade Inválida!",error);
			            throw erro;

                    
                    }
                }
            }
        
        }
        console.log("Vou buscar todos os componentes susbtitutos cadastrados...")
        componentes=retornaArrayComponentes();
        console.log(componentes)
        
        if(componentes.length<=0){

            erro.length=0;
			erro.push("error","Não foram selecionados substitutos","Não é possível enviar a um cadastro sem componentes selecionados");
			throw erro;

        }
    }
    
    catch(erro){

		Swal.fire({

			icon: erro[0],
			title: erro[1],
			text: erro[2]

		})
        return 0;

	}

    console.log("Vou construir a tabela auxiliar...")
    constroiTableAux(componentes);
    console.log("Construir a tabela auxiliar")


};

//FUNÇÂO QUE CONSTROI A TABELA AUXILIAR COM INFORMAÇÕES DA SOLICITAÇÃO
function constroiTableAux(componentes){

    $("#QTDROWSAUX").val(componentes.length);
    $("#DATAORIGINAL").val($("#DATACRIACAO").val());

    for(var i=0;i<componentes.length;i++){

        var row=wdkAddChild("TABELAAUX");
        $("#CODFILIALAUX___"+row).val(componentes[i][0]);
        $("#COLIGADAAUX___"+row).val(componentes[i][1]);
        $("#ESTRUTURAAUX___"+row).val(componentes[i][2]);
        $("#CODATIVIDADEAUX___"+row).val(componentes[i][3]);
        $("#PRODORIGEMAUX___"+row).val(componentes[i][4]);
        $("#PRODUTOAUX___"+row).val(componentes[i][5]);
        $("#QTDUSADAAUX___"+row).val(parseFloat(componentes[i][6]));
        $("#UNIDAUX___"+row).val(componentes[i][7]);
        $("#IDPRODORIGEMAUX___"+row).val(componentes[i][8]);
        $("#IDPRODAUX___"+row).val(componentes[i][9]);


    }
}


//FUNÇÂO QUE RETORNA TODOS OS COMPONENTES CADASTRADOS QUE POSSUEM QUANTIDADE INFORMADA
function retornaArrayComponentes(){
    var componentes = new Array();
    var qtdprincipais = Number(($("#CONTADORPRINCIPAIS").val())); 
    var qtdsubstitutos = 0

    var card=0;
    var row=0;

    for(card=0;card<qtdprincipais;card++){


        //RELAÇÃO DA QUANTIDADES DE ITENS ADICIONADOS E EXCLUIDOS NA TABELA ROW
        var qtdsubstitutos=Number($("#CONTADOR_"+card).val())-Number($("#EXCLUIDOS_"+card).val());

        console.log("principal "+card+" possui "+ qtdsubstitutos + " linhas a serem processadas")

        qtdsubstitutos=$("#CONTADOR_"+card).val();
        console.log("qtdesubstitutos "+qtdsubstitutos);

        for(row=1;row<=qtdsubstitutos;row++){

            var prod=$("#VIEWPROD_"+card+"_"+row).val()
            console.log(prod)

            if(prod!=null && prod!="" && prod!=undefined){

                var codfilial=$("#CODFILIAL").val();
                var coligada=$("#CODCOLIGADA").val();
                var estrutura=$("#CODESTRUTURA_"+card).text();
                var codatividade=$("#CODATVPRINCIPAL_"+card).val();
                var idprodorigem=$("#IDPRDORIGEM_"+card).val();
                var qtdusada=$("#QTDSUBSTITUTONUM_"+card+"_"+row).val();
                var idproduto=$("#IDPRD_"+card+"_"+row).val();
                var prodorigem=$("#CODPRINCIPAL_"+card).text();
                var produto=$("#VIEWPROD_"+card+"_"+row).val();
                var unidade=$("#UNDSUBSTITUTO_"+card+"_"+row).val();

                if (qtdusada==null || qtdusada=="" || qtdusada==undefined){

                    console.log("chequei quantidade");
                    var error = "O componente "+ $("#CODPRINCIPAL_"+card).text() + " possui o substituto " + $("#VIEWPROD_"+card+"_"+row).val() + " sem quantidade informada";
                    console.log(error);
                
                }
                else{

                    componentes.push(new Array(codfilial, coligada, estrutura, codatividade, prodorigem, produto, qtdusada, unidade, idprodorigem, idproduto));
                
                }
            }
            
        }
    
    }

    return componentes;

}


//FUNÇÂO QUE REMOVE LINHAS DE COMPONENTES PRINCIPAIS QUE NÂO POSSUEM COMPONENTES SUBSTITUTOS CADASTRADOS
function removeLinhasVazias(){
    var qtdprincipais = parseInt($("#CONTADORPRINCIPAIS").val());
    var card=0;
    var row=0;
    var temsubstituto = 0;

    //PERCORRE TODOS OS COMPONENTES PRINCIPAIS
    for(card=0;card<qtdprincipais;card++){

        qtdsubstitutos=$("#CONTADOR_"+card).val();

        temsubstituto=0;
        //PERCORRE TODOS OS COMPONENTES SUBSTITUTOS
        for(row=1;row<=qtdsubstitutos;row++){

            var check = $("#VIEWPROD_"+card+"_"+row).val();
            
            //CHECA SE ELES POSSUEM COMPONENTE CADASTRADO
            if(check == "" || check == null || check == undefined){

                //CASO NÃO TENHAM 
                removeSubstituto($("#REMOVERCOMPONENTE_"+card+"_"+row),card); 
                
            }
            else{
                temsubstituto=1;
            }

        }



    }
}


//FUNÇÂO QUE REMOVE COMPONENTES PRINCIPAIS QUE NÂO POSSUEM COMPONENTES SUBSTITUTOS CADASTRADOS
function removerCardVazios(){
    var qtdprincipais = parseInt($("#CONTADORPRINCIPAIS").val());
    var card=0;
    var row=0;
    var temsubstituto = 0;


    for(card=0;card<qtdprincipais;card++){
        
        qtdsubstitutos=$("#CONTADOR_"+card).val();

        temsubstituto=0;

        for(row=1;row<=qtdsubstitutos;row++){

            var check = $("#VIEWPROD_"+card+"_"+row).val();
            
            if(check != "" && check != null && check != undefined){

                temsubstituto=1; 
                
            }

        }
        if (temsubstituto==0) {
            removePrincipal(card);
        }

    }

    if($("#CONTADORPRINCIPAIS").val()<=0){

        var tabela=document.getElementById("TABLECOMPONENTES");

        tabela.style.display='none';
        
    }
}