// CRIA UM ZOOM EXTERNO BASEADO EM UM DATASET
function zoomDataSet(titulo, dataset, campos, resultFields, type) {
	
	console.log("entrei na zoomDataSet")
	// 600, 350
	// width=800, height=600
	window.open("/webdesk/zoom.jsp?datasetId="+dataset+"&dataFields="+campos+"&resultFields="+resultFields+"&type="+type+"&title="+titulo, "zoom" , "status , scrollbars=no, width=600, height=800");
	
	console.log("finalizei a zoomDataSet")
	
}

// FUNÇÃO PARA CONSTRUIR O ZOOM EXTERNO
function zoomMaterial(componente,campo) {
		
	console.log("entrei na zoomMaterial RÁ")

	if(campo!=null){

		var seq = $(campo).parent().parent().parent().attr("id").split("___")[1]

		if($("#LINHASALVOS___"+seq).hasClass("linha_selecionada")){
	
			// PASSAGEM DE PARÂMETROS PARA FUNÇÃO ZOOM DATASET: Titulo, dataset, campos, type
			zoomDataSet('Material', 'dsMaterial', 'PRODUTO,Produto,SALDO,Saldo','PRODUTO,IDPRD,CODIGOPRD,CODUNDCONTROLE' ,"material___"+componente+"___"+seq);
	
		}

	}
	else{

		zoomDataSet('Material', 'dsMaterial', 'PRODUTO,Produto,SALDO,Saldo','PRODUTO,IDPRD,CODIGOPRD,CODUNDCONTROLE',componente);

	}
	
	console.log("finalizei a zoomMaterial")
}

// SE ITEM É REMOVIDO DO CAMPO ZOOM
function setSelectedZoomItem(selectedItem) {        
	
	console.log("entrei na setSelectedZoomItem")
	console.log(selectedItem)
	
	var input = selectedItem.inputId;
	//CRM.validaCampo($('#' + input));
	
	if(!(selectedItem.inputId==undefined)){
	
		// SE A OS É SELECIONADA
		if(selectedItem.inputId.indexOf("OS_INFO")!="-1"){
			
			ativaSpinner()
			
			// TIMEOUT PARA EXECUTAR O LOAD
			setTimeout(function (index,value){
				
				// VERIFICA SE OS ESTÁ LIBERADA PARA A LISTA
				if(verificaOS(selectedItem['CODPRJ'])){
					
					// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
					$("#NUM_OS").val(selectedItem['CODPRJ'])
					$("#CODCOLIGADA").val(selectedItem['CODCOLIGADA'])
					$("#DESCRICAO_OS").val(selectedItem['DESCRICAO'].toString().replace(/[',"]/g," "))
				
					// BUSCA OS MATERIAIS REFERENTES A OS SELECIONADA
					//if(buscaMateriaisOS()){
						
						// SE TABELA AINDA NÃO FOI PREENCHIDA
						// if($("#TABELA").val()==""){
							
						// 	console.log("tabela não foi usada")
							
						// 	//
						// 	childAdd2()
							
						// 	//
						// 	console.log("vou chamar a função de somar agora")
						// 	childAdd4()
							
						// }
						
						// // CONSTRÓI TODOS OS FILTROS
						// constroiFiltros()
						
						// // CALCULA O TOTA DO COMPRIMENTO E DO PESO
						// calculaComprimento(0)
						// calculaPeso(0)
						
						// MOSTRA CAMPOS DA TABELA
						$(".table-responsive").show()
						$(".ABAS_GERAL").show()
						$(".CONTEUDO_ABAS").show()
						$(".SALVOS").show()
						
						// COLOCA O FOCO NO INÍCIO
						$("#NUMDESENHOINFO___1").focus()
						
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
						reconstroiFiltrosSalvos()
						
					//}
					
				} else {
					// SE NÃO ESTÁ LIBERADA
					
					// EXIBE ALERTA
					Swal.fire({
						  icon: 'error',
						  title: 'A OS selecionada já tem uma lista de materiais!',
						  text: 'Verifique e tente novamente'
					})	
					
					// LIMPA A SELEÇÃO DO CAMPO ZOOM DO PRODUTO
					$("#OS_INFO>option").remove()
					$("#OS_INFO").val("")
					$(".CONTEUDO_ABAS").hide()
				} 

				desativaSpinner()
				
			},500)
				 
		}
		
		
	}
	
	// SE A OS É SELECIONADA
	/*if(selectedItem.inputId.indexOf("PRODUTO_RM1")!="-1"){
	
		$("#IDPRD1").val(selectedItem['IDPRD'])
		$("#CODIGOPRD1").val(selectedItem['CODIGOPRD'])
	
	}
	
	// SE A OS É SELECIONADA
	if(selectedItem.inputId.indexOf("PRODUTO_RM2")!="-1"){
	
		$("#IDPRD2").val(selectedItem['IDPRD'])
		$("#CODIGOPRD2").val(selectedItem['CODIGOPRD'])
	
	}
	
	// SE A OS É SELECIONADA
	if(selectedItem.inputId.indexOf("PRODUTO_RM3")!="-1"){
	
		$("#IDPRD3").val(selectedItem['IDPRD'])
		$("#CODIGOPRD3").val(selectedItem['CODIGOPRD'])
	
	}
	
	// SE A OS É SELECIONADA
	if(selectedItem.inputId.indexOf("PRODUTO_RM4")!="-1"){
	
		$("#IDPRD4").val(selectedItem['IDPRD'])
		$("#CODIGOPRD4").val(selectedItem['CODIGOPRD'])
	
	}
	
	// SE A OS É SELECIONADA
	if(selectedItem.inputId.indexOf("PRODUTO_RM5")!="-1"){
	
		$("#IDPRD5").val(selectedItem['IDPRD'])
		$("#CODIGOPRD5").val(selectedItem['CODIGOPRD'])
	
	}
	
	// SE A OS É SELECIONADA
	if(selectedItem.inputId.indexOf("PRODUTO_RM6")!="-1"){
	
		$("#IDPRD6").val(selectedItem['IDPRD'])
		$("#CODIGOPRD6").val(selectedItem['CODIGOPRD'])
	
	}*/
		
	//verifica o type da função zoomFichario (cadastro)
	if(selectedItem.type.split('___')[0] == "material") {

		var seq = selectedItem.type.split('___')[2]
		var op = selectedItem.type.split('___')[1]
		
		// SE PRODUTO JÁ FOI SELECIONADO
		if(prdDuplicado(selectedItem.CODIGOPRD,selectedItem.type)){
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'Esse produto já foi selecionado!',
				  text: 'Verifique e tente novamente'
			})	
			
		} else {
		// SE NÃO

			$("#PRODUTORM"+op+"SALVOS___"+seq).val(selectedItem.PRODUTO.toString().replace(/[',"]/g," "))
			//$("#PRODUTORM"+op+"SALVOS___"+seq).prop("disabled",true)
			$("#IDPRD"+op+"SALVOS___"+seq).val(selectedItem.IDPRD)
			$("#CODIGOPRD"+op+"SALVOS___"+seq).val(selectedItem.CODIGOPRD)
			$("#UNDPRD"+op+"SALVOS___"+seq).val(selectedItem.CODUNDCONTROLE)
			
		}
		
	}
	else if(selectedItem.type.search("material")!=-1){

		if(prdDuplicado(selectedItem.CODIGOPRD,selectedItem.type)){
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'Esse produto já foi selecionado!',
				  text: 'Verifique e tente novamente'
			})	
			
		} else {
		// SE NÃO

			var op = selectedItem.type.split("material")[1]

			$("#PRODUTO_RM"+op).val(selectedItem.PRODUTO.toString().replace(/[',"]/g," "))
			//$("#PRODUTO_RM2").prop("readonly",true)
			$("#IDPRD"+op).val(selectedItem.IDPRD)
			$("#CODIGOPRD"+op).val(selectedItem.CODIGOPRD)
			$("#UNDPRD"+op).val(selectedItem.CODUNDCONTROLE)
			
		}

	}
	
	// if(selectedItem.type == "material2") {
		
	// 	// SE PRODUTO JÁ FOI SELECIONADO
	// 	if(prdDuplicado(selectedItem.CODIGOPRD,selectedItem.type)){
			
	// 		// EXIBE ALERTA
	// 		Swal.fire({
	// 			  icon: 'error',
	// 			  title: 'Esse produto já foi selecionado!',
	// 			  text: 'Verifique e tente novamente'
	// 		})	
			
	// 	} else {
	// 	// SE NÃO
		
	// 		$("#PRODUTO_RM2").val(selectedItem.PRODUTO.toString().replace(/[',"]/g," "))
	// 		$("#PRODUTO_RM2").prop("readonly",true)
	// 		$("#IDPRD2").val(selectedItem.IDPRD)
	// 		$("#CODIGOPRD2").val(selectedItem.CODIGOPRD)
	// 		$("#UNDPRD2").val(selectedItem.CODUNDCONTROLE)
	
	// 	}
	
	// }
	
	// if(selectedItem.type == "material3") {
		
	// 	// SE PRODUTO JÁ FOI SELECIONADO
	// 	if(prdDuplicado(selectedItem.CODIGOPRD,selectedItem.type)){
			
	// 		// EXIBE ALERTA
	// 		Swal.fire({
	// 			  icon: 'error',
	// 			  title: 'Esse produto já foi selecionado!',
	// 			  text: 'Verifique e tente novamente'
	// 		})	
			
	// 	} else {
	// 	// SE NÃO
			
	// 		$("#PRODUTO_RM3").val(selectedItem.PRODUTO.toString().replace(/[',"]/g," "))
	// 		$("#PRODUTO_RM3").prop("readonly",true)
	// 		$("#IDPRD3").val(selectedItem.IDPRD)
	// 		$("#CODIGOPRD3").val(selectedItem.CODIGOPRD)
	// 		$("#UNDPRD3").val(selectedItem.CODUNDCONTROLE)
		
	// 	}
		
	// }

	// if(selectedItem.type == "material4") {
		
	// 	// SE PRODUTO JÁ FOI SELECIONADO
	// 	if(prdDuplicado(selectedItem.CODIGOPRD,selectedItem.type)){
			
	// 		// EXIBE ALERTA
	// 		Swal.fire({
	// 			  icon: 'error',
	// 			  title: 'Esse produto já foi selecionado!',
	// 			  text: 'Verifique e tente novamente'
	// 		})	
			
	// 	} else {
	// 	// SE NÃO
			
	// 		$("#PRODUTO_RM4").val(selectedItem.PRODUTO.toString().replace(/[',"]/g," "))
	// 		$("#PRODUTO_RM4").prop("readonly",true)
	// 		$("#IDPRD4").val(selectedItem.IDPRD)
	// 		$("#CODIGOPRD4").val(selectedItem.CODIGOPRD)
	// 		$("#UNDPRD4").val(selectedItem.CODUNDCONTROLE)
	
	// 	}
		
	// }

	// if(selectedItem.type == "material5") {
		
	// 	// SE PRODUTO JÁ FOI SELECIONADO
	// 	if(prdDuplicado(selectedItem.CODIGOPRD,selectedItem.type)){
			
	// 		// EXIBE ALERTA
	// 		Swal.fire({
	// 			  icon: 'error',
	// 			  title: 'Esse produto já foi selecionado!',
	// 			  text: 'Verifique e tente novamente'
	// 		})	
			
	// 	} else {
	// 	// SE NÃO
			
	// 		$("#PRODUTO_RM5").val(selectedItem.PRODUTO.toString().replace(/[',"]/g," "))
	// 		$("#PRODUTO_RM5").prop("readonly",true)
	// 		$("#IDPRD5").val(selectedItem.IDPRD)
	// 		$("#CODIGOPRD5").val(selectedItem.CODIGOPRD)
	// 		$("#UNDPRD5").val(selectedItem.CODUNDCONTROLE)
		
	// 	}
		
	// }

	// if(selectedItem.type == "material6") {
		
	// 	// SE PRODUTO JÁ FOI SELECIONADO
	// 	if(prdDuplicado(selectedItem.CODIGOPRD,selectedItem.type)){
			
	// 		// EXIBE ALERTA
	// 		Swal.fire({
	// 			  icon: 'error',
	// 			  title: 'Esse produto já foi selecionado!',
	// 			  text: 'Verifique e tente novamente'
	// 		})	
			
	// 	} else {
	// 	// SE NÃO
			
	// 		$("#PRODUTO_RM6").val(selectedItem.PRODUTO.toString().replace(/[',"]/g," "))
	// 		$("#PRODUTO_RM6").prop("readonly",true)
	// 		$("#IDPRD6").val(selectedItem.IDPRD)
	// 		$("#CODIGOPRD6").val(selectedItem.CODIGOPRD)
	// 		$("#UNDPRD6").val(selectedItem.CODUNDCONTROLE)
		
	// 	}
	
	// }

	// SE O PRODUTORM1 É SELECIONADO
	/*if(selectedItem.inputId.indexOf("PRODUTO_RM1")!="-1"){
	
		$("#IDPRD1").val(selectedItem['IDPRD'])
		$("#CODIGOPRD1").val(selectedItem['CODIGOPRD'])
	
	}
	
	// SE O PRODUTORM2 É SELECIONADO
	if(selectedItem.inputId.indexOf("PRODUTO_RM2")!="-1"){
	
		$("#IDPRD2").val(selectedItem['IDPRD'])
		$("#CODIGOPRD2").val(selectedItem['CODIGOPRD'])
	
	}
	
	// SE O PRODUTORM3 É SELECIONADO
	if(selectedItem.inputId.indexOf("PRODUTO_RM3")!="-1"){
	
		$("#IDPRD3").val(selectedItem['IDPRD'])
		$("#CODIGOPRD3").val(selectedItem['CODIGOPRD'])
	
	}
	
	// SE O PRODUTORM4 É SELECIONADO
	if(selectedItem.inputId.indexOf("PRODUTO_RM4")!="-1"){
	
		$("#IDPRD4").val(selectedItem['IDPRD'])
		$("#CODIGOPRD4").val(selectedItem['CODIGOPRD'])
	
	}
	
	// SE O PRODUTORM5 É SELECIONADO
	if(selectedItem.inputId.indexOf("PRODUTO_RM5")!="-1"){
	
		$("#IDPRD5").val(selectedItem['IDPRD'])
		$("#CODIGOPRD5").val(selectedItem['CODIGOPRD'])
	
	}
	
	// SE O PRODUTORM6 É SELECIONADO
	if(selectedItem.inputId.indexOf("PRODUTO_RM6")!="-1"){
	
		$("#IDPRD6").val(selectedItem['IDPRD'])
		$("#CODIGOPRD6").val(selectedItem['CODIGOPRD'])
	
	}*/
	
	// DESATIVA O SPINNER
	desativaSpinner()
	
	//formataCampos();
	
}

// SE ITEM É REMOVIDO DO CAMPO ZOOM
function removedZoomItem(removedItem)
{
	var input = removedItem.inputId;
	CRM.validaCampo($('#' + input));
		
	// SE A OS É REMOVIDA
	if(removedItem.inputId.indexOf("OS_INFO")!="-1")
	{
	
		// ATIVA O LOADING
		ativaSpinner()
		
		// LIMPA OS CAMPOS AUTOMATICAMENTE A PARTIR DA OS REMOVIDA
		$("#NUM_OS").val("")
		$("#DESCRICAO_OS").val("")
		
		// LIMPA O CONTEÚDO DA TABELA DOS MATERIAIS
		apagaLista()
		
		// LIMPA O CONTEÚDO DA TABELA DOS FILTROS
		apagaListaFiltros()
		reconstroiFiltros()
		apagaListaSalvos()
		apagaListaFiltrosSalvos()
		
		// MOSTRA CAMPOS DO FORMULÁRIO
		$(".PRODUTO_RM").hide()
		
		// LIMPA A SELEÇÃO DO CAMPO ZOOM DO PRODUTO
		$("#PRODUTO_RM1>option").remove()
		$("#PRODUTO_RM2>option").remove()
		$("#PRODUTO_RM3>option").remove()
		$("#PRODUTO_RM4>option").remove()
		$("#PRODUTO_RM5>option").remove()
		$("#PRODUTO_RM6>option").remove()
		
		// ESCONDE CAMPOS DA TABELA
		$(".CONTEUDO_ABAS").hide()
		$(".table-responsive").hide()
		$(".ABAS_GERAL").hide()
		
	}
	
	// SE O PRODUTORM1 É REMOVIDO
	/*if(removedItem.inputId.indexOf("PRODUTO_RM1")!="-1"){
	
		$("#IDPRD1").val("")
		$("#CODIGOPRD1").val("")
	
	}
	
	// SE O PRODUTORM2 É REMOVIDO
	if(removedItem.inputId.indexOf("PRODUTO_RM2")!="-1"){
	
		$("#IDPRD2").val("")
		$("#CODIGOPRD2").val("")
	
	}
	
	// SE O PRODUTORM3 É REMOVIDO
	if(removedItem.inputId.indexOf("PRODUTO_RM3")!="-1"){
	
		$("#IDPRD3").val("")
		$("#CODIGOPRD3").val("")
	
	}
	
	// SE O PRODUTORM4 É REMOVIDO
	if(removedItem.inputId.indexOf("PRODUTO_RM4")!="-1"){
	
		$("#IDPRD4").val("")
		$("#CODIGOPRD4").val("")
	
	}
	
	// SE O PRODUTORM5 É REMOVIDO
	if(removedItem.inputId.indexOf("PRODUTO_RM5")!="-1"){
	
		$("#IDPRD5").val("")
		$("#CODIGOPRD5").val("")
	
	}
	
	// SE O PRODUTORM6 É REMOVIDO
	if(removedItem.inputId.indexOf("PRODUTO_RM6")!="-1"){
	
		$("#IDPRD6").val("")
		$("#CODIGOPRD6").val("")
	
	}*/
	
	// DESATIVA O SPINNER
	desativaSpinner()
	
	// FORMATA CAMPOS
	//formataCampos();
	
}

// SETAR UM VALOR NO ZOOM
function setZoomData(instance, value){ 
	
	window[instance].setValue(value); 
	
}