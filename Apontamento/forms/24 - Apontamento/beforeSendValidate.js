// FAZ A VALIDAÇÃO DO FORMULÁRIO ANTES DE ENVIAR PARA A PRÓXIMA ATIVIDADE
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
    	
    	// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'Atenção, a data de fechamento do estoque está incorreta',
			  text: 'Consultar Financeiro/TI '
		})
		
		return false
    	
    } else {
    	// SE NÃO
    	
    	// SE ATIVIDADE INICIAL, OU INICIAL SALVA OU DE EDITAR ESTRUTURA
    	if(atv==0 || atv==3 || atv==4 || atv==7) {
    		
    		/*var radio3 = $("#VALOR_RADIO3").val()
    		console.log("radio3: "+radio3)*/
    		
    		var finaliza = false
    		var validaCampos = true
    		
    		// VARIÁVEL PARA CONTROLE DO EXCLUSIVO
    		var exclusivo1 = $("#EXCLUSIVO1").val()
    		console.log("exclusivo1: "+exclusivo1)
    		
    		// SE EXCLUSIVO AINDA NÃO FOI SETADO
    		//if(exclusivo1==null || exclusivo1==undefined || exclusivo1==""){
    			
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
    				
    				e.preventDefault();
    				
    		        console.log("entrei na seleção de finalizar")
    		        
    		         finaliza = true
    		         
    		         // SETA CAMPO PARA CONTROLE DO EXCLUSIVO DO WORKFLOW
    			      $("#EXCLUSIVO1").val("FINALIZAR");
    		        
    			      // SIMULA O CLICK NO BOTÃO ENVIAR DA SOLICITAÇÃO
    			      $("#workflowActions > button:first-child", window.parent.document).click();
    			    	
    			      // SE CAMPOS OBRIGATÓRIOS PARA APONTAR FORAM PREENCHIDOS
    			      if(camposApontamento()){
    			    	  
    			    	  // VERIFICA SE TODOS OS APONTAMENTOS ATENDEM AS REGRAS
    				      if(verificaApontamentos()){
    				    	  
    					      return true
    					  	
    				      } else {
    				    	  
    				    	  return false
    				    	  
    				      }
    			    	  
    			      } else {
    			    	  
    			    	  return false
    			    	  
    			      }
    			      
    	
    			});*/
    			
    			//console.log("não cliquei no botão, não vou finalizar")
    			
    			//return false
    			
    		//}
    		//else {
    		
    		// SE NÃO, SE EXCLUSIVO AINDA NÃO FOI PREENCHIDO
    		if(exclusivo1=="" || exclusivo1==null || exclusivo1==undefined){
    		
    			/*var alertaSubirSaldo = $("#ALERTASUBIRSALDO").val()
    			
    			// SE ALERTA NÃO FOI INFORMADO
    			if(temAtvSemSaldo() && (alertaSubirSaldo=="" || alertaSubirSaldo==undefined || alertaSubirSaldo==null)){
    				
    				console.log("tem ultima atividade da OP sem saldo e alerta ainda não foi exibido")
    				
    				$("#ALERTASUBIRSALDO").val("SIM")
    				
    				// EXIBE ALERTA
    				Swal.fire({
    					  icon: 'error',
    					  title: 'Este lote não está liberado ou o saldo do estoque é 0',
    					  text: 'Verifique e tente novamente'
    				})
    				
    			} else {*/
    				// SE NÃO 
    				
    				// SE NÃO EXISTEM APONTAMENTOS QUE JÁ FORAM APONTADOS (DUPLICIDADE)
    				if(!duplicidadeApontamento()){
    					  
    					// VERIFICA SALDO DE TODOS OS LOTES QUE SERÃO CONSUMIDOS
    					var lotes = verificaSaldoLotes()
    					  
    					// SE NÃO TEM LOTES QUE NÃO PODEM SER BAIXADOS
    					if(lotes=="" || lotes==null || lotes==undefined){
    						
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
    								
    								// SE CAMPOS OBRIGATÓRIOS PARA APONTAR FORAM PREENCHIDOS
                				    if(camposObrigatorios()){
                				    	  
                				    	var ops = ""//verificaApontamentos()
                				    		  
                				    	  // SE OPS FORAM PREENCHIDAS 
                				    	if(!(ops=="" || ops==null || ops==undefined)){
                				    				
                			    				// EXIBE ALERTA
                			    				/*Swal.fire({
                			    					
                			    					  title: 'Há componentes sem apontamento da(s) atividade(s) - Op(s): '+ops+' ',
                			    					  text: 'O que deseja fazer?',
                			    					  icon: 'warning',
                			    					  showCancelButton: true,
                			    					  allowEscapeKey: true,
                			    					  allowOutsideClick: true,
                			    					  confirmButtonColor: '#3085d6',
                			    					  cancelButtonColor: '#3085d6',
                			    					  confirmButtonText: 'Integrar',
                			    					  cancelButtonText: 'Corrigir',

                			    				}).then(function(result){
                			    					
                								  // SE FOR CORRIGIR
                								  if(result.value) {
                									  
                									  $("#EXCLUSIVO1").val("FINALIZAR");
                								      
                									  // SIMULA O CLICK NO BOTÃO ENVIAR DA SOLICITAÇÃO
                									  $("#workflowActions > button:first-child", window.parent.document).click();
                									
                								      return true
                									   
                								  } 			  
                			    					  
                			    			   })*/
                				    		  
                				    		// EXIBE ALERTA
            				    			/*Swal.fire({
            				    				  icon: 'error',
            				    				  title: 'Há componentes sem apontamento da(s) atividade(s) - Op(s): '+ops+'',
            				    				  text: "Verifique e tente novamente" 
            				    			})*/
                				    		  
                				    		// EXIBE ALERTA
              				    			Swal.fire({
              				    				  icon: 'error',
              				    				  title: 'Há componentes que precisam ser apontados da(s) atividade(s) - Op(s): '+ops+'',
              				    				  text: 'Verifique e tente novamente' 
              				    			})
                				    		
            				    			return false
                			    				
                			    		    }else {
                					    	 	// SE NÃO
                			    			
                			    			  	$("#EXCLUSIVO1").val("FINALIZAR");
                			    			  
                			    			  	// SIMULA O CLICK NO BOTÃO ENVIAR DA SOLICITAÇÃO
            								  	$("#workflowActions > button:first-child", window.parent.document).click();
            								
                					    	  	return true
                					    	  
                					      	}
                				    	  
                				    	  	return false
                				    	  
                				      	}else{
                				    	  	// SE NÃO
                				    	  
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
    						
    						    						  
    					  }else{
    						  	// SE NÃO

								//alert("Existem horas preenchidas incompletas, verifique e tente novamente")
    						  
    						  	return false
    						  
    					  	}
    					  
    				  	} else {
    					 	// SE NÃO 
    					  
    						return false
    					  
    				  	}
    				
    					//return true
    					
    				//}
    				
    			//}
    		
    		}else{
    		  	// SE NÃO, SE EXCLUSIVO JÁ FOI PREENCHIDO
    			
    			return true
    			
    		}
    		
    	}
    
    }
	
    console.log("final do before")
    
}