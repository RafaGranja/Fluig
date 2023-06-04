// VALIDAÇÃO DOS DADOS DO FORMULÁRIO
var beforeSendValidate = function(numState,nextState){
	
	console.log("Entrei no before")
	
	// VARIÁVEL PARA ATIVIDADE
    var atv = numState
    
    // VARIÁVEL PARA USUÁRIO ATUAL
    var usuario = $("#USUARIOATUAL").val()
    
    console.log("atv: "+atv)
    console.log("usuario: "+usuario)
      
    // SE ATV É A INICIAL 
    if(atv==0 || atv==4){
    	
		var finaliza = false
		var validaCampos = true
		
		// VARIÁVEL PARA CONTROLE DO EXCLUSIVO
		var exclusivo1 = $("#EXCLUSIVO1").val()
		
		console.log("exclusivo1: "+exclusivo1)
		
		// SE TEM AO MENOS UM COMPONENTE SELECIONADO
		if(temSelecao()){
			
			// SE TODOS OS COMPONENTES SELECIONADOS POSSUEM QUANTIDADE INFORMADA
			//if(validaComponentes()){
				
				// SE EXCLUSIVO AINDA NÃO FOI SETADO
				if(exclusivo1==null || exclusivo1==undefined || exclusivo1==""){
					
					// EXIBE ALERTA
					Swal.fire({
						
						  title: 'O que deseja fazer?',
						  icon: 'warning',
						  showCancelButton: true,
						  allowEscapeKey: true,
						  allowOutsideClick: true,
						  confirmButtonColor: '#3085d6',
						  cancelButtonColor: '#F08E8E',
						  confirmButtonText: 'Gerar RA',
						  cancelButtonText: 'Cancelar',
						  //footer: '<a href="#!" id="APROVAR">Enviar para Aprovação</a>'

						}).then(function(result){
						
						  // SE PRÓXIMA ATIVIDADE FOR A DE EDITAR
						  if (result.value) {
						      
						      // SETA CAMPO PARA CONTROLE DO EXCLUSIVO DO WORKFLOW EM "SIM" 
						      $("#EXCLUSIVO1").val("FINALIZAR");
							
						      finaliza = true
						      
						      // CARREGA A TABELA DAS RA'S GERADAS
							  carregaTabelaRA()
						      
						      // SIMULA O CLICK NO BOTÃO ENVIAR DA SOLICITAÇÃO
						      $("#workflowActions > button:first-child", window.parent.document).click();
						      
						      return true
						      
						  } 				  
						  
					})
					
					console.log("não cliquei no botão, não vou finalizar")
					
					return false
					
				}
				else {
					// SE NÃO, SE EXCLUSIVO JÁ FOI PREENCHIDO
					
					console.log("vou finalizar, exclusivo já preenchido")
					
					return true
					
				}
				
			// } else {
			// 	// SE NÃO
				
			// 	// EXIBE ALERTA
			// 	Swal.fire({
			// 		  icon: 'error',
			// 		  title: 'Há componentes selecionados que não tem quantidade a requisitar informada',
			// 		  text: 'Verifique e tente novamente'
			// 	})
				
			// 	return false
				
			// }
			
		} else {
			// SE NÃO
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'Não há componentes selecionados para gerar a RA',
				  text: 'Verifique e tente novamente'
			})
			
			return false
			
		}
				
	}
    
    console.log("final do before")
    
}