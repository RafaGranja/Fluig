// SE ITEM É REMOVIDO DO CAMPO ZOOM
function setSelectedZoomItem(selectedItem) {        
	
	var input = selectedItem.inputId;
	//CRM.validaCampo($('#' + input));
	
	console.log("entrei no setSelectedZoomItem")
	
	if(!(selectedItem.inputId==undefined)){
		
		// SE A OS É SELECIONADA
		if(selectedItem.inputId.indexOf("OS_INFO")!="-1"){
			
			// VEERIFICA SE OS JÁ FOI CADASTRADA
			//if(verificaOS()){
				
				// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
				$("#NUM_OS").val(selectedItem['CODPRJ'])
				$("#DESCRICAO_OS_INFO").val(selectedItem['DESCRICAO'])
				$("#IDPRJ_OS").val(selectedItem['IDPRJ'])
				$("#CODCOLIGADA").val(selectedItem['CODCOLIGADA'])
				$("#CODFILIAL").val(selectedItem['CODFILIAL'])

				console.log("NUM OS: "+selectedItem['CODPRJ']+", DESCRIÇÃO: "+selectedItem["DESCRICAO"]+", IDPRJ: "+selectedItem["IDPRJ"])
				
				// HABILITA O CÓDIGO DA TAREFA
				$("#CODTRFPAI").prop("disabled",false)
				
				// RELOAD ZOOM NO CAMPO DAS EXECUÇÕES
				//reloadZoomFilterValues("EXECUCOES_OS","OS,"+selectedItem['CODPRJ']+",CODCOLIGADA,"+selectedItem['CODCOLIGADA']+",CODFILIAL,"+selectedItem['CODFILIAL'])
				reloadZoomFilterValues("CODTRFPAI","OS,"+$("#NUM_OS").val())
				
			/*}else{
				// SE NÃO
				
				// LIMPA CAMPO ZOOM 
				$("#OS_INFO>option").remove()
				
				// EXIBE ALERTA
				Swal.fire({
					  icon: 'error',
					  title: 'OS ainda não foi cadastrada!',
					  text: 'Verifique e tente novamente.'
				})
				
			}*/
			
		}
		
		// SE A EXECUÇÃO FOI SELECIONADA
		if(selectedItem.inputId.indexOf("EXECUCOES_OS")!="-1"){
		
			// SALVA A EXECUÇÃO
			$("#EXECUCAO_INFO").val(selectedItem['NUMEXEC'])
			
			// RELOAD ZOOM NO CAMPO DOS CÓDIGOS DE TAREFAS
			//reloadZoomFilterValues("CODTRFPAI","OS,"+$("#NUM_OS").val()+",EXECUCAO,"+selectedItem['NUMEXEC'])
			
		}
		
		// SE O CODTRFEX FOI SELECIONADO
		if(selectedItem.inputId.indexOf("CODTRFPAI")!="-1"){
		
			// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
			$("#CODTRFEX").val(selectedItem['CODTRFPAI'])
			$("#INDICEPAI").val(selectedItem['INDICE'])
			
			// RELOAD ZOOM NO CAMPO DAS EXECUÇÕES
			reloadZoomFilterValues("EXECUCOES_OS", "OS,"+$("#NUM_OS").val()+",CODCOLIGADA,"+$("#CODCOLIGADA").val()+",CODFILIAL,"+$("#CODFILIAL").val()+",CODTRFPAI,"+selectedItem["CODTRFPAI"]);
			
			// HABILITA O CÓDIGO DA TAREFA
			$("#EXECUCOES_OS").prop("disabled",false)
	
			
		}
		
	}
	
}

// SE ITEM É REMOVIDO DO CAMPO ZOOM
function removedZoomItem(removedItem){
	
	// SE A OS É REMOVIDA
	if(removedItem.inputId.indexOf("OS_INFO")!="-1"){
	
		// LIMPA OS CAMPOS AUTOMATICAMENTE A PARTIR DA OS REMOVIDA
		$("#NUM_OS").val("")
		$("#DESCRICAO_OS_INFO").val("")
		$("#IDPRJ_OS").val("")
		$("#CODCOLIGADA").val("")
		$("#CODFILIAL").val("")
		
		// DESABILITA O CÓDIGO DA TAREFA
		$("#CODTRFPAI").prop("disabled",true)
		$("#EXECUCOES_OS").prop("disabled",true)

		// LIMPA A SELEÇÃO DO CAMPO EXECUÇÕES
		$("#EXECUCOES_OS>option").remove()
		$("#CODTRFPAI>option").remove()
		
		// ESCONDE O BOTÃO VOLTAR
		$(".VOLTAR_OS").hide()
	
	}

	// SE A EXECUÇÃO É REMOVIDA
	if(removedItem.inputId.indexOf("EXECUCOES_OS")!="-1"){
		
		// LIMPA OS CAMPOS PREENCHIDOS NA SELEÇÃO
		$("#EXECUCAO_INFO").val("")
		
	}
	
	// SE O CODTRFEX É REMOVIDA
	if(removedItem.inputId.indexOf("CODTRFPAI")!="-1"){
		
		// LIMPA OS CAMPOS PREENCHIDOS NA SELEÇÃO
		$("#CODTRFEX").val("")
		$("#INDICEPAI").val("")
		
		// DESABILITA O CAMPO DAS EXECUÇÕES
		$("#EXECUCOES_OS").prop("disabled",true)
		
		// LIMPA A SELEÇÃO DO CAMPO EXECUÇÕES
		$("#EXECUCOES_OS>option").remove()
		
	}
	
}

// SETAR UM VALOR NO ZOOM
function setZoomData(instance, value){ 
	
	window[instance].setValue(value); 
	
}