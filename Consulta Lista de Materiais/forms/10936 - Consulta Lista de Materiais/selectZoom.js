// SE ITEM É REMOVIDO DO CAMPO ZOOM
function setSelectedZoomItem(selectedItem) {        
	
	// SE A OS É SELECIONADA
	if(selectedItem.inputId.indexOf("OS_INFO")!="-1"){
		
		var myLoading2 = FLUIGC.loading(window);
		
		myLoading2.show();
		
		// VERIFICA SE OS ESTÁ LIBERADA PARA A LISTA
		setTimeout(function (index,value){
			
			// VERIFICA SE OS JÁ TEM UMA LISTA DE MATERIAIS CADASTRADA
			if(verificaOS(selectedItem['CODPRJ'])){
				
				console.log("tem lista")
				
				// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
				$("#NUM_OS").val(selectedItem['CODPRJ'])
				$("#DESCRICAO_OS").val(selectedItem['DESCRICAO'])
				$("#CODCOLIGADA").val(selectedItem['CODCOLIGADA'])
					

				// SE TABELA AINDA NÃO FOI PREENCHIDA
				if($("#TABELA_SALVOS").val()==""){
	
					console.log("tabela salvos não foi usada")
					
					$("#TABELA_SALVOS").val("SIM")
					
					//
					childAdd5()
					
					//
					console.log("vou chamar a função de somar salvos agora")
					childAdd6()
					
					// EXIBE TABELA
					$(".SALVOS").show()
					
				}

				// ATUALIZA A TABELA SALVOS
				preencheTabelaSalvos()
				//verificaExclusaoTabelaSalvos()
				atualizaTabelaSalvos()

				agrupaTabelaSalvos()

				calculaComprimento(1)
				calculaPeso(1)
				calculaQtdOrigem1()
				calculaQtdOrigem2()
				
				incluiFiltros()

				reconstroiFiltros()
				retiraSelecaoFiltrosSalvos()
				reconstroiFiltrosSalvos()

				// COLOCA O FOCO NO INÍCIO
				$("#NUMDESENHOINFO___1").focus()

				// EXIBE TABELA
				$(".SALVOS").show()
				$(".ABAS_GERAL").show()

			} else {
				// SE NÃO
				
				// EXIBE ALERTA
				Swal.fire({
					  icon: 'error',
					  title: 'A OS selecionada não tem uma lista de materiais',
					  text: 'Verifique e tente novamente'
				})	
				
			}
			
		},500)
		
		// DESATIVA O LOAD
		setTimeout(function(){
			
			myLoading2.hide();
			
		},500)
			 
	}
	
}

// SE ITEM É REMOVIDO DO CAMPO ZOOM
function removedZoomItem(removedItem){
	
	// SE A OS É REMOVIDA
	if(removedItem.inputId.indexOf("OS_INFO")!="-1")
	{
		
		// LIMPA OS CAMPOS AUTOMATICAMENTE A PARTIR DA OS REMOVIDA
		$("#NUM_OS").val("")
		$("#DESCRICAO_OS").val("")
		
		// LIMPA O CONTEÚDO DA TABELA DOS MATERIAIS
		apagaTabelaLista()
		
		// LIMPA O CONTEÚDO DA TABELA DOS FILTROS
		apagaListaFiltros()
		
		// LIMPA A SELEÇÃO DOS FILTROS
		limpaSelecaoFiltros()
		
		// ESCONDE CAMPOS DA TABELA
		$(".table-responsive").hide()
		$(".TABELAS").hide()
		$(".ABAS_GERAL").hide()
		
	}
	
}

// SETAR UM VALOR NO ZOOM
function setZoomData(instance, value){ 
	
	window[instance].setValue(value); 
	
}