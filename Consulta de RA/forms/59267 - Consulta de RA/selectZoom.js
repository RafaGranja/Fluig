// SE ITEM É SELECIONADO NO CAMPO ZOOM
function setSelectedZoomItem(selectedItem) {        
	
	var input = selectedItem.inputId;
	
	console.log("entrei no setSelectedZoomItem")
	
	// SE A OS É SELECIONADA
	if(selectedItem.inputId == "FILIAL"){
			
		console.log("entrei na filial")
		
		$("#CODFILIAL_FILTRO").val(selectedItem['CODFILIAL'])
		
		// RELOAD ZOOM FILTER VALUES NAS OP'S DO PROJETO
		reloadZoomFilterValues("PROJETO","CODFILIAL,"+selectedItem['CODFILIAL'])
		
		// DESABILITA O CAMPO DA OS
		$("#PROJETO").prop("disabled",false)
		
	}
	
	// SE A OS É SELECIONADA
	if(selectedItem.inputId == "PROJETO"){
			
		console.log("entrei no projeto")
		
		// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
		$("#CODPRJ").val(selectedItem['CODPRJ'])
		$("#DESCRICAOPRJ").val(selectedItem['DESCRICAO'])
		$("#IDPRJ").val(selectedItem['IDPRJ'])
		$("#CODCOLIGADA_FILTRO").val(selectedItem['CODCOLIGADA'])
		
		console.log("NUM OS: "+selectedItem['CODPRJ']+", DESCRIÇÃO: "+selectedItem["DESCRICAO"]+", IDPRJ: "+selectedItem["IDPRJ"])
	
		// RELOAD ZOOM FILTER VALUES NAS OP'S DO PROJETO
		//reloadZoomFilterValues("ORDEMPRODUCAO","CODCCUSTO,"+selectedItem['CODPRJ']+",CELULA,"+$("#CODCELULA").val())
		reloadZoomFilterValues("ORDEMPRODUCAO","CODCCUSTO,"+selectedItem['CODPRJ'])
		reloadZoomFilterValues("COMPONENTE","CODCCUSTO,"+selectedItem['CODPRJ'])	
		
		// DESABILITA O CAMPO OP
		$("#ORDEMPRODUCAO").prop("disabled",false)
		
	}
	
	// SE O OP FOR SELECIONADA
	if(selectedItem.inputId == "ORDEMPRODUCAO"){
		
		// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
		var numops;
		var codOrdem = $("#ORDEMPRODUCAO").val()
		
		// SE OP ESTÁ CONCLUÍDA OU CANCELADA
		if(selectedItem["STATUS_OP"]=="5" || selectedItem["STATUS_OP"]=="6"){


			console.log("OP: "+selectedItem['CODORDEM']+"")
			numops = $("#ORDEMPRODUCAO").val().length
			$("#ORDEMPRODUCAO>option").eq(Number(numops)-1).remove()
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'Essa OP não pode ser selecionada pois está com status apontada ou cancelada',
				  text: 'Verifique o status e tente novamente'
			})
			
			
		} else {
			// SE NÃO
			
			console.log("OP: "+selectedItem['CODORDEM']+"")
			numops = $("#ORDEMPRODUCAO").val().length
			console.log("🚀 ~ file: selectZoom.js ~ line 72 ~ setSelectedZoomItem ~ numops", numops)
			if(Number(numops)>0){

				// HABILITA O CAMPO OP
				$("#COMPONENTE").prop("disabled",false)
				

			}

			var ordens = $("#ORDEMPRODUCAO").val()
			// SE ORDENS FORAM INFORMADAS
			if(!(ordens=="" || ordens==null || ordens==undefined)){
				
				// SALVA AS ORDENS
				codOrdem = arrayOrdens()
				
			} else {
				
				codOrdem = ""
			
			}
			reloadZoomFilterValues("COMPONENTE","CODORDEM,"+codOrdem)
			console.log("🚀 ~ file: selectZoom.js ~ line 79 ~ setSelectedZoomItem ~ codOrdem", codOrdem)
		}
		
	}
	
	// SE O COMPONENTE FOR SELECIONADO
	if(selectedItem.inputId == "COMPONENTE"){
		
		// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
		if($("#IDPRD").val()!=""){
			$("#IDPRD").val($("#IDPRD").val()+","+selectedItem['IDPRD'])
		}
		else{
			$("#IDPRD").val(selectedItem['IDPRD'])
		}
		if($("#CODIGOPRD").val()!=""){
			$("#CODIGOPRD").val($("#CODIGOPRD").val()+","+selectedItem['CODIGOPRD'])
		}
		else{
			$("#CODIGOPRD").val(selectedItem['CODIGOPRD'])
		}
		
		
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
		$("#CODPRJ").val("")
		$("#DESCRICAOPRJ").val("")
		$("#IDPRJ").val("")
		$("#CODORDEM").val("")
		$("#IDPRD").val("")
		$("#CODIGOPRD").val("")
		$("#COMPONENTE>option").remove()
		$("#ORDEMPRODUCAO>option").remove()
		$("#PROJETO>option").remove()
		
		// DESABILITA O CAMPO DA OS
		$("#PROJETO").prop("disabled",true)
		$("#ORDEMPRODUCAO").prop("disabled",true)
		$("#COMPONENTE").prop("disabled",true)

		limpaTabelaComponentes();
		$(".TABELAS").hide()
		
	}
	
	// SE A OS É REMOVIDA
	if(removedItem.inputId == "PROJETO"){
			
		console.log("entrei no projeto")
		
		// LIMPA OS CAMPOS PREENCHIDOS
		$("#CODPRJ").val("")
		$("#DESCRICAOPRJ").val("")
		$("#IDPRJ").val("")
		$("#CODORDEM").val("")
		$("#IDPRD").val("")
		$("#CODIGOPRD").val("")
		$("#COMPONENTE>option").remove()
		$("#ORDEMPRODUCAO>option").remove()
		
		// DESABILITA O CAMPO OP
		$("#ORDEMPRODUCAO").prop("disabled",true)
		$("#COMPONENTE").prop("disabled",true)

		limpaTabelaComponentes();
		$(".TABELAS").hide()
		
	}
	
	// SE O OP FOR REMOVIDA
	if(removedItem.inputId == "ORDEMPRODUCAO"){
		
		// LIMPA OS CAMPOS PREENCHIDOS
		$("#CODORDEM").val("")
		$("#IDPRD").val("")
		$("#CODIGOPRD").val("")
		$("#COMPONENTE>option").remove()

		// DESABILITA O CAMPO OP
		var numops = $("#ORDEMPRODUCAO").val().length
		if(Number(numops)<1){

			// DESABILITA O CAMPO OP
			$("#COMPONENTE").prop("disabled",true)

		}
		var codOrdem = $("#ORDEMPRODUCAO").val()
		codOrdem = codOrdem.toString()
		reloadZoomFilterValues("COMPONENTE","CODORDEM,"+codOrdem)

		limpaTabelaComponentes();
		$(".TABELAS").hide()
		
		
	}
	
	// LIMPA OS CAMPOS PREENCHIDOS
	if(removedItem.inputId == "COMPONENTE"){
		
		// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
		var a = $("#IDPRD").val()
		var arrayidprd = a.split(",");
		arrayidprd.pop();
		arrayidprd = arrayidprd.toString();
		$("#IDPRD").val(arrayidprd)

		var b = $("#CODIGOPRD").val()
		var arraycod = b.split(",");
		arraycod.pop();
		arraycod = arraycod.toString();
		$("#CODIGOPRD").val(arraycod)

		limpaTabelaComponentes();
		$(".TABELAS").hide()
		
	}
	
}

// SETAR UM VALOR NO ZOOM
function setZoomData(instance, value){ 
	
	window[instance].setValue(value); 
	
}