var beforeSendValidate = function(numState,nextState){
	
	console.log("Entrei no before")
	
	// VARIÁVEL PARA ATIVIDADE
    var atv = numState
    
    // VARIÁVEL PARA USUÁRIO ATUAL
    var usuario = $("#USUARIOATUAL").val()
    
    console.log("atv: "+atv)
    console.log("usuario: "+usuario)
    
	// SE ATIVIDADE INICIAL, OU INICIAL SALVA OU DE EDITAR ESTRUTURA
	if(atv==0 || atv==4 || atv==11) {
		
		var radio3 = $("#VALOR_RADIO3").val()
		console.log("radio3: "+radio3)
		
		var finaliza = false
		var validaCampos = true
		
		// SE RADIO3 NÃO FOI PREENCHIDO
		/*if(radio3=="" || radio3==null || radio3==undefined){
			
			validaCampos = false
			
		}
		
		// SE CAMPO DA PRÓXIMA ATIVIDADE NÃO FOI INFORMADO
		if(!validaCampos){
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'É necessário informar qual será a próxima atividade!',
				  text: 'Verifique e tente novamente'
			})
			
			return false;
			
		}*/
		
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
				  footer: '<button type="button" role="button" tabindex="0" class="APROVAR" id="FINALIZAR">' + 'Finalizar e atualizar estrutura principal' + '</button>'

				}).then(function(result){
				
				  // SE PRÓXIMA ATIVIDADE FOR A DE EDITAR
				  if (result.value) {
				      
				      // SETA CAMPO PARA CONTROLE DO EXCLUSIVO DO WORKFLOW EM "SIM" 
				      $("#EXCLUSIVO1").val("EDITAR");
					
				      // ATUALIZA OS SEQ's
				      //atualizaSeq()
				      
				      // LIMPA OS ITENS DA LISTA DA TABELA COMPONENTES
				      //limpaItensComponentesLista()
				      
				      console.log("entrei na seleção de editar")
				      
				      finaliza = true
				      
				      $("#workflowActions > button:first-child", window.parent.document).click();
				      
				      return true
				      
				  } 				  
				  
			})
			
			// SE BOTÃO PARA APROVAÇÃO FOI SELECIONADO
			$(document).on('click', '#FINALIZAR', function(e) {
				
				e.preventDefault();
				
				// SE NÃO, SE FOR A DE FINALIZAR
				  
				  var numOS = $("#NUM_OS").val()
				  var processoPai = $("#PROCESSOPAI").val()
				  var numProcesso = $("#NUMPROCESSO").val()
				 
			      // ATUALIZA OS CAMPOS DETALHADOS
			      liberaDetalhadosOS()
			      
			      // ATUALIZA OS SEQ's
			      //atualizaSeq()
			      
			      // LIMPA OS ITENS DA LISTA DA TABELA COMPONENTES
			      //limpaItensComponentesLista()
				     
			      var usuarioAtual = $("#USUARIOATUAL").val()
				          
			      $("#USUARIOCALDERARIA").val(usuarioAtual)
			      $("#USUARIOUSINAGEM").val(usuarioAtual)
			      
			      var camposOb = camposObrigatorios()
			      
			      // SE TODOS OS CAMPOS OBRIGATÓRIOS FORAM PREENCHIDOS
			      if(camposOb=="" || camposOb==null || camposOb==undefined){
			    	  
			    	  var itensNaoManuf = ""//verificaNaoManufaturados()
			    	  
			    	  // VERIFICA SE OS ITENS NÃO MANUFATURADOS ATENDEM AS REGRAS
			    	  if(itensNaoManuf=="" || itensNaoManuf==null || itensNaoManuf==undefined){
			    		  
			    		  console.log("entrei na seleção de aprovar")
			    		  
			    		  // ATUALIZA STATUS DA SOLICITAÇÃO NA TABELA AUXILIAR
			    		  atualizaSolicitacaoTabelaAuxiliar(processoPai,numProcesso,numOS)
			    		  
			    		  // SETA CAMPO PARA CONTROLE DO EXCLUSIVO DO WORKFLOW EM "NÃO" 
			    		  $("#EXCLUSIVO1").val("FINALIZAR");
			    		  
					      $("#workflowActions > button:first-child", window.parent.document).click();
					      
					      finaliza = true
							
					      return true

					      console.log('Some action triggered.');
			    		  
			    	  } else {
			    		// SE NÃO
				    	  
				    	  // EXIBE ALERTA
						  Swal.fire({
								  icon: 'error',
								  title: 'Há itens não manufaturados que precisam ter ao menos um componente vinculado',
								  text: 'Verifique os índices: '+itensNaoManuf
						  })
							
				    	  finaliza = false
							
					      return false  
			    		  
			    	  }
			    	 
			    	  
			      } else {
			    	  // SE NÃO
			    	  
			    	  // EXIBE ALERTA
					  Swal.fire({
							  icon: 'error',
							  title: 'Há itens na estrutura que têm campos obrigatórios que não foram preenchidos!',
							  text: 'Verifique os índices: '+camposOb
					  })
						
			    	  finaliza = false
						
				      return false
			    	  
			      }
			   
			});
			 
			
			console.log("não cliquei no botão, não vou finalizar")
			return false
			
		}
		else {
			
			return true
			
		}
		
	}
	
	// SE ATIVIDADE DE APROVAR ESTRUTURA
	if(atv==14) {
		
		console.log("entrei no before da atv "+atv)
		
		var radio3 = $("#VALOR_RADIO3").val()
		console.log("o radio 3 é "+radio3)
		
		var validaCampos = true
		
		var mensagem = verificaProcessoItens() 
		
		// SE EXISTEM ITENS SEM CADASTRO DE PROCESSO
		if(!(mensagem=="")){
			
			// EXIBE ALERTA
			Swal.fire({
					  icon: 'error',
					  title: 'Há itens na estrutura que não possuem cadastro de atividades na aba Processos!',
					  text: 'Verifique os índices: '+mensagem
			})
			
			validaCampos = false
			
			return false
			
		}
		
		// SE RADIO3 NÃO FOI PREENCHIDO
		if(radio3=="" || radio3==null || radio3==undefined){
			
			console.log("radio3 sem preencher")
			validaCampos = false
			
		}
		
		// SE RADIO3 FOI SELECIONADO EM ALTERAR OU NÃO
		if(radio3=="ALTERAR" || radio3=="NAO"){
			
			console.log("radio3 alterar ou não")
			var motivo = $("#MOTIVO").val()
			
			// SE MOTIVO NÃO FOI PREENCHIDO
			if(motivo=="" || motivo==null || motivo==undefined){
				
				console.log("motivo sem preencher")
				
				// EXIBE ALERTA
				Swal.fire({
					  icon: 'error',
					  title: 'É necessário informar o motivo da recusa ou alteração!',
					  text: 'Verifique e tente novamente'
				})
				
				return false;
				
			}else {
				
				// SE ALTERAR FOI SELECIONADO
				if(radio3=="ALTERAR"){
					
					  // ATUALIZA OS SEQ's
				      atualizaSeq()
				      
				      // SETA CAMPO PARA CONTROLE DO EXCLUSIVO DO WORKFLOW EM "SIM" 
				      $("#EXCLUSIVO1").val("EDITAR");
				      
				      // LIMPA OS ITENS DA LISTA DA TABELA COMPONENTES
				      //limpaItensComponentesLista()
					
				}
				
			}
			
		}
		
		// SE ESTRUTURA FOI APROVADA
		if(radio3=="SIM"){
			
			var codTarefa = $("#CODIGOTAREFA").val()
			var usuarioAtual = $("#USUARIOATUAL").val()
			
			// SE A TAREFA NÃO FOI INFORMADA
			if(codTarefa=="" || codTarefa==null || codTarefa==undefined){
				
				// EXIBE ALERTA
				Swal.fire({
					  icon: 'error',
					  title: 'É necessário incluir a tarefa antes da integração!',
					  text: 'Verifique e tente novamente'
				})
				
				return false;
				
			} else {
				// SE NÃO
				
				// SALVA O USUÁRIO QUE REALIZOU A APROVAÇÃO
				$("#USUARIOAPROVADOR").val(usuarioAtual)
				
				// SALVA O NÚMERO DA SOLICITAÇÃO DENTRO DAS TABELAS
				salvaSolicitacaoEstrutura()
				salvaSolicitacaoProcesso()
				salvaSolicitacaoComponentes()
				
			}
			
		}
		
		// SE CAMPO DA PRÓXIMA ATIVIDADE NÃO FOI INFORMADO
		if(!validaCampos){
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'É necessário informar se o cadastro foi aprovado!',
				  text: 'Verifique e tente novamente'
			})
			
			return false;
			
		} else {
			
		
			
			// LIMPA OS ITENS DA LISTA DA TABELA COMPONENTES
		    //limpaItensComponentesLista()
		      
		}
		
	}
		
    console.log("final do before")
    
}