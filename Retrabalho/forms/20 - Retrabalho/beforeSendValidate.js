// FAZ A VALIDAÇÃO DO FORMULÁRIO ANTES DE ENVIAR PARA A PRÓXIMA ATIVIDADE
var beforeSendValidate = function(numState,nextState){
	
	console.log("Entrei no before")
	
	// VARIÁVEL PARA ATIVIDADE
    var atv = numState
    
    // VARIÁVEL PARA USUÁRIO ATUAL
    var usuario = $("#USUARIOATUAL").val()
    
    console.log("atv: "+atv)
    console.log("usuario: "+usuario)
    
	// SE ATIVIDADE INICIAL, OU INICIAL SALVA OU DE EDITAR ESTRUTURA
	if(atv==11 || atv==4) {
		
		var radio3 = $("#VALOR_RADIO3").val()
		console.log("radio3: "+radio3)
		
		var finaliza = false
		var validaCampos = true
		
		// VARIÁVEL PARA CONTROLE DO EXCLUSIVO
		var exclusivo1 = $("#EXCLUSIVO1").val()
		
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
				  confirmButtonText: 'Salvar e editar depois',
				  cancelButtonText: 'Cancelar',
				  //footer: '<a href="#!" id="APROVAR">Enviar para Aprovação</a>'
				  footer: '<button type="button" role="button" tabindex="0" class="FINALIZAR" id="FINALIZAR">' + 'Finalizar e Integrar' + '</button>'

				}).then(function(result){
				
				  // SE PRÓXIMA ATIVIDADE FOR A DE EDITAR
				  if (result.value) {
				      
				      // SETA CAMPO PARA CONTROLE DO EXCLUSIVO DO WORKFLOW EM "SIM" 
				      $("#EXCLUSIVO1").val("EDITAR");
					
				      console.log("entrei na seleção de editar")
				      
				      finaliza = true
				      
				      // SIMULA O CLICK NO BOTÃO ENVIAR DA SOLICITAÇÃO
				      $("#workflowActions > button:first-child", window.parent.document).click();
				      
				      return true
				      
				  } 				  
				  
			})
			
			// SE BOTÃO PARA FINALIZAR FOI SELECIONADO
			$(document).on('click', '#FINALIZAR', function(e) {
				
				// SE OS CAMPOS OBRIGATÓRIOS FORAM PREENCHIDOS
				if(camposObrigatorios()){
				
					console.log("não tem campos obrigatórios sem preenchimento")
					
					// VERIFICA SE O PROCESSO TEVE PELO MENOS UMA ATIVIDADE INSERIDA
					if(verificaProcesso()){
						
						console.log("tem atividades inseridas")
						
						e.preventDefault();
						
						console.log("não tem item sendo detalhado")
						
					    // SETA CAMPO PARA CONTROLE DO EXCLUSIVO DO WORKFLOW EM "NÃO" 
					    $("#EXCLUSIVO1").val("FINALIZAR");
					     
					    var usuarioAtual = $("#USUARIOATUAL").val()
						      
					    $("#USUARIOCALDERARIA").val(usuarioAtual)
					    $("#USUARIOUSINAGEM").val(usuarioAtual)
					      
					    console.log("entrei na seleção de aprovar")
					    
					    finaliza = true
						
					    // SIMULA O CLICK NO BOTÃO ENVIAR DA SOLICITAÇÃO
					    $("#workflowActions > button:first-child", window.parent.document).click();
			
					    return true
					    
						console.log('Some action triggered.');
						
					} else {
						// SE NÃO
						
						// EXIBE ALERTA
						Swal.fire({
							  icon: 'error',
							  title: 'É necessário incluir ao menos uma atividade na aba Processo',
							  text: 'Verifique e tente novamente.'
						})
						
						return false
					
					}
					
				} else {
					// SE NÃO
					
					console.log("há campos obrigatórios sem preenchimento")
					
					// EXIBE ALERTA
					Swal.fire({
						  icon: 'error',
						  title: 'Há campos obrigatórios que não foram preenchidos ou atividades do processo não foram informadas!',
						  text: 'Verifique todos os campos indicados com (*) e tente novamente.'
					})
					
					return false
					
				}
				
			});
			
			console.log("não cliquei no botão, não vou finalizar")
			
			return false
			
		}
		else {
			// SE NÃO, SE EXCLUSIVO JÁ FOI PREENCHIDO
			
			console.log("vou retornar true")
			
			return true
			
		}
		
	}
		
    console.log("final do before")
	
	return true
    
}