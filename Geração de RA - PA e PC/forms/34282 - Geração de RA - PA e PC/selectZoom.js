// SE ITEM É SELECIONADO NO CAMPO ZOOM
function setSelectedZoomItem(selectedItem) {        
	
	var input = selectedItem.inputId;
	
	console.log("entrei no setSelectedZoomItem")
	
	// SE A OS É SELECIONADA
	if(selectedItem.inputId == "FILIAL"){
			
		console.log("entrei na filial")
		
		$("#CODFILIAL_FILTRO").val(selectedItem['CODFILIAL'])
		$("#CODCOLIGADA_FILTRO").val(selectedItem['CODCOLIGADA'])
		
		// RELOAD ZOOM FILTER VALUES NAS OP'S DO PROJETO
		//reloadZoomFilterValues("PROJETO","CODFILIAL,"+selectedItem['CODFILIAL'])
		reloadZoomFilterValues("PLANOCORTE","CODFILIAL,"+selectedItem['CODFILIAL'])
		
		// DESABILITA O CAMPO DO PLANO DE CORTE
		//$("#PROJETO").prop("disabled",false)
		$("#PLANOCORTE").prop("disabled",false)
		
	}
	
	// SE O OP FOR SELECIONADA
	if(selectedItem.inputId == "PLANOCORTE"){
		
		
		verificaRA(selectedItem)
		
		
	}
		
}

// SE ITEM É REMOVIDO DO CAMPO ZOOM
function removedZoomItem(removedItem)
{
	var input = removedItem.inputId;
	
	// SE A OS É REMOVIDA
	if(removedItem.inputId == "FILIAL"){
			
		// LIMPA OS CAMPOS PREENCHIDOS
		$("#CODFILIAL_FILTRO").val("")

		$("#NUMPLANO").val("")
		$("#PLANOCORTE>option").remove()
		
		// DESABILITA O CAMPO DA OS
		$("#PLANOCORTE").prop("disabled",true)
		
	}

	if(removedItem.inputId == "PLANOCORTE"){
		
		limpaTabelaComponentes();
		limpaTabelaPAPC();
		escondeTabelaInfo();
		$("#NUMPLANO").val("")
		
	}
	
}

// SETAR UM VALOR NO ZOOM
function setZoomData(instance, value){ 
	
	window[instance].setValue(value); 
	
}