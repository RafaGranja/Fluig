//FUNÇÃO QUE É ACINADA NO BOTÃO BUSCAR, PREPARA E ATUALIZA O FORMULÁRIO CONDINZENTE COM OS CARD DE COMPONENTES PRINCIPAIS
function buscar(){
    if($("#TEMTABELA").val()==1){
        Swal.fire({
            title: 'Buscar irá remover os componentes susbtitutos caso tenha adicionado!',
            text: 'Tem certeza que deseja fazer isso?',
            icon: 'warning',
            showCancelButton: true,
            allowEscapeKey: true,
            allowOutsideClick: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#F08E8E',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
        }).then(function(result) {

            if (result.value) {

                construir();
            }
            else {

                console.log("Buscar cancelado")
                return 0;

            }

          })

    }else{

        construir();

    }

}

function construir(){

    console.log("Atividade: "+$("#ATIVIDADE").val());
    console.log("Botão Buscar foi acionado...");
    var tabela=document.getElementById("TABLECOMPONENTES");

    tabela.style.display='none';
    $("[name='FORMCOMPONENTES']").empty();

    
    var verifica=constroiCards()


    if(verifica==1){
        tabela.style.display='block';
        $("#TEMTABELA").val(1);

    }
    else{
        tabela.style.display='none';
        $("#TEMTABELA").val(0);

    }

}


