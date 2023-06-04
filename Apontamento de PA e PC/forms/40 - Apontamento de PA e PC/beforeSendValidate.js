// FAZ A VALIDAÇÃO DO FORMULÁRIO ANTES DE ENVIAR PARA A PRÓXIMA ATIVIDADE
var beforeSendValidate = function(numState,nextState){
	
	console.log("Entrei no before")
	
	// VARIÁVEL PARA ATIVIDADE
    var atv = numState
    
    // VARIÁVEL PARA USUÁRIO ATUAL
    var usuario = $("#USUARIOATUAL").val()
    
    console.log("atv: "+atv)
    console.log("usuario: "+usuario)

	//SE AO MENOS UMA QUANTIDADE FOI PREENCHIDA DIFERENTE DE 0
	if(temApontamento()){

		// VERIFICA SE A REGERAÇÃO DE SALDOS E CUSTOS ESTÁ SENDO FEITA
		if(regSaldosCustos()){
			
			// EXIBE ALERTA
			Swal.fire({
				icon: 'error',
				title: 'Atenção, a data de fechamento do estoque está incorreta',
				text: 'Consultar Financeiro/TI '
			})
			
			return false
			
		} else {
			// SE NÃO
		
			// HABILITA TODOS OS CAMPOS DA TABELA DE ATIVIDADES
			$("input[id^='CODIGOPRD___']").each(function(){
			
				console.log("vou habilitar os campos")
				
				var seq = $(this).attr("id").split("____")[1]
				
				$("#HORAINICIOATV___"+seq).prop("readonly",false)
				$("#HORAFIMATV___"+seq).prop("readonly",false)
				
			})
			
			//var myLoading2 = FLUIGC.loading(window);
			
			//myLoading2.show();
			
			// INICIA A OPERAÇÃO DEPOIS DE CARREGAR O LOAD
			//setTimeout(function(){
			
			// SE ATIVIDADE INICIAL, OU INICIAL SALVA OU DE EDITAR ESTRUTURA
			if(atv==0 || atv==3 || atv==4 || atv==7) {
				
				/*var radio3 = $("#VALOR_RADIO3").val()
				console.log("radio3: "+radio3)*/
				
				var finaliza = false
				var validaCampos = true
				var busca = true

				// VARIÁVEL PARA CONTROLE DO EXCLUSIVO
				var exclusivo1 = $("#EXCLUSIVO1").val()
				console.log("exclusivo1: "+exclusivo1)
				
				// SE EXCLUSIVO AINDA NÃO FOI SETADO
				//if(exclusivo1==null || exclusivo1==undefined || exclusivo1==""){
					
					// EXIBE ALERTA
					/*FLUIGC.message.confirm({
						
						message: 'O que deseja fazer?',
						title: 'Atenção',
						labelYes: 'Salvar e editar depois',
						labelNo: 'Cancelar',
						footer: '<button type="button" role="button" tabindex="0" class="FINALIZAR" id="FINALIZAR">' + 'Finalizar' + '</button>'
							
					}, function(result, el, ev) {
						
						console.log("result")
						console.log(result)
						console.log("el")
						console.log(el)
						console.log("ev")
						console.log(ev)
						
						// SE A PRÓXIMA ATIVIDADE FOR A DE EDITAR
						if(result.value){
							
							// SETA CAMPO PARA CONTROLE DO EXCLUSIVO DO WORKFLOW EM "SIM" 
							$("#EXCLUSIVO1").val("EDITAR");
							
							console.log("entrei na seleção de editar")
							
							finaliza = true
							
							// SIMULA O CLICK NO BOTÃO ENVIAR DA SOLICITAÇÃO
							$("#workflowActions > button:first-child", window.parent.document).click();
							
							return true
							
						}  
						
					});*/
					
					// EXIBE ALERTA
					/*Swal.fire({
						
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
						footer: '<button type="button" role="button" tabindex="0" class="FINALIZAR" id="FINALIZAR">' + 'Finalizar' + '</button>'

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
						
					})*/
					
					// SE BOTÃO PARA FINALIZAR FOI SELECIONADO
					/*$(document).on('click', '#FINALIZAR', function(e) {
						
						// REALIZA A BUSCA DO HISTÓRICO DAS ATIVIDADES PROGRAMADAS PARA O OPERADOR SELECIONADO
						if(buscar()){
						
							e.preventDefault();
							
							console.log("entrei na seleção de finalizar")
							
							finaliza = true
							
							// SETA CAMPO PARA CONTROLE DO EXCLUSIVO DO WORKFLOW
							$("#EXCLUSIVO1").val("FINALIZAR");
						
							// SIMULA O CLICK NO BOTÃO ENVIAR DA SOLICITAÇÃO
							$("#workflowActions > button:first-child", window.parent.document).click();
						
						}
			
					});*/
					
					//console.log("não cliquei no botão, não vou finalizar")
					
					//return false
					
				//}
				//else {
					// SE NÃO, SE EXCLUSIVO JÁ FOI PREENCHIDO
					
				//	return true
					
				//}
				
					//var ret = buscar() 
					
					//console.log("ret: "+ret)
				
				// SE AINDA NÃO SALVOU O EXCLUSIVO
				if(exclusivo1=="" || exclusivo1==null || exclusivo1==undefined){
					
					/*var myLoading2 = FLUIGC.loading(window);
					
					myLoading2.show();
					
					// LOAD
					setTimeout(function(){*/

					var entraHoras = $("#ENTRADAHORAS").val()
					
					// SE VAI APENAS ENTRAR COM HORAS
					if(Number(entraHoras)==1){

						simulaQuantidadesOPs()
						
						$("input[id^='QTDEFABRICADA_MODAL___']").each(function(){

							verificaQtdeModal(this);

						});
						

					}
					// SE O MODAL COM AS QUANTIDADES FABRICADAS FORAM PREENCHIDAS
					if(tabelaModalPreenchida()){
						
						// SE ESTÁ SEM HORAS VAZIAS
  						if(semHorasVazias()){
  							
  							// VERIFICA SE O LIMITE DE 12 HORAS FOI ATINGIDO EM ALGUM APONTAMENTO
  							if(verificaLimiteHoras()){
  								
  								// EXIBE ALERTA
    				    			Swal.fire({
    				    				  icon: 'error',
    				    				  title: 'O apontamento ultrapassou as 12 horas permitidas',
    				    				  text: 'Verifique as horas lançadas e as que já foram integradas para o operador e dia selecionados' 
    				    			})
      							
      							return false
  								
  							} else {
  								// SE NÃO
  						
  								// REALIZA A BUSCA DO HISTÓRICO DAS ATIVIDADES PROGRAMADAS PARA O OPERADOR SELECIONADO
  								if(buscar()){
  								
  									console.log("busca foi realizada e dados carregados, vou finalizar")
  									
  									// BUSCA E SALVA O SEQ ATV NA TABELA DO MODAL
  									//salvaSeqAtv()
  									
  									busca = false
  									
  									// SETA CAMPO PARA CONTROLE DO EXCLUSIVO DO WORKFLOW
  									/*$("#EXCLUSIVO1").val("FINALIZAR");
  									
  									// HABILITA O CAMPO DO LOTE DA MP
  									$("#LOTEMP").prop("disabled",false)
  									$("#MATRICULA").prop("disabled",false)
  									$("#AVANCOPLANO").prop("disabled",false)
  									$("#PCCONCLUIDO").prop("disabled",false)
  									
  									console.log("VOU MOVIMENTAR A SOLICITAÇÃO NOVAMENTE")
  									
  									// SIMULA O CLICK NO BOTÃO ENVIAR DA SOLICITAÇÃO
  									$("#workflowActions > button:first-child", window.parent.document).click();*/
  									
  									return true
  									
  								} else {
  									
  									return false
  									
  								}
  								
  							}
  							
  						} else {
  							// SE NÃO
  							
							// EXIBE ALERTA
			    			Swal.fire({
			    				  icon: 'error',
			    				  title: 'Há atividades em que as horas de início e/ou fim não foram informadas',
			    				  text: 'Verifique e tente novamente' 
			    			})
							
							return false
  							
  						}
						
					} else {
						// SE NÃO
					
						console.log("Busca falhou")
						
						// EXIBE ALERTA
						Swal.fire({
							icon: 'error',
							title: 'A(s) quantidade(s) fabricada(s) não pode(m) ser vazia(s). Também é preciso que ao menos uma OP tenha quantidade fabricada maior que 0',
							text: 'Em caso de não fabricação é necessário colocar o valor 0. Verifique e tente novamente'
						})
					
						return false
						
					}
						
					//},200)
					
				} else {
					
					// SE FOR PARA FINALIZAR
					if(exclusivo1=="FINALIZAR"){
						
						console.log("VOU FINALIZAR")
						busca = false
						
						return true
						
					} 
					
				}
				
				if(busca){
					
					return false
					
				}
				//},500)
				
				
			}
			

			//},500)
			
			
		}
	}
	else{
		
		
		Swal.fire({
			icon: 'error',
			title: 'Não foi preenchido horário para ser apontado',
			text: 'Não é possível apontar sem informar no mínimo 1 intervalo de horas'
		})

		return false

	}
		
    console.log("final do before")
    
}