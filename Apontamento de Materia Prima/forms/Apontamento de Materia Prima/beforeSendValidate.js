var beforeSendValidate = function(numState,nextState){


    console.log("Entrei no before")
	
	// VARIÁVEL PARA ATIVIDADE
    var atv = numState
    
    // VARIÁVEL PARA USUÁRIO ATUAL
    var usuario = $("#USUARIOATUAL").val()
    
    console.log("atv: "+atv)
    console.log("usuario: "+usuario)

    // VERIFICA SE A REGERAÇÃO DE SALDOS E CUSTOS ESTÁ SENDO FEITA
    if(regSaldosCustos()){
    	
    	console.log("vou exibir alerta")
    	
    	// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: ' Atenção, a data de fechamento do estoque está incorreta ',
			  text: ' Consultar Financeiro/TI ',
              allowEscapeKey: false,
              allowOutsideClick: false,
		})
		
		return false
    	
    } else {
    	// SE NÃO
    
    	console.log("não tem regeração de saldos e custos")

        var numBaixas = $("#LISTABAIXAS").find("tbody").children().length

        if(numBaixas<1){

            console.log("vou exibir alerta")
            console.log("sem baixas")
    	
            // EXIBE ALERTA
            Swal.fire({
                  icon: 'error',
                  title: 'Atenção, formulário não preenchido ',
                  text: ' Não foram selecionados registros para realizar baixas de componentes ',
                  allowEscapeKey: false,
                  allowOutsideClick: false,
            })
            
            return false;

        }
        else{

            var baixasPendentes = $("#LISTABAIXAS").find("tbody").children(".lotependente").length

            if(baixasPendentes>0){

                console.log("vou exibir alerta")
                console.log("baixas pendentes de preenchimento")
            
                // EXIBE ALERTA
                Swal.fire({
                      icon: 'error',
                      title: 'Atenção, formulário pendente de preenchimento',
                      text: ' Existem registros de baixa que não foram preenchidos com lote ',
                      allowEscapeKey: false,
                      allowOutsideClick: false,
                })
                
                return false;
    
            }else{

                return true;

            }

        }

    }

    console.log("final do before")

}
