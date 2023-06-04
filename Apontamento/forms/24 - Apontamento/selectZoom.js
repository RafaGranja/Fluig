// CRIA UM ZOOM EXTERNO BASEADO EM UM DATASET
function zoomDataSet(titulo, dataset, campos, resultFields, filterValues, type) {
	
	console.log("entrei na zoomDataSet")
	
	// 600, 350
	window.open("/webdesk/zoom.jsp?datasetId="+dataset+"&dataFields="+campos+"&resultFields="+resultFields+"&filterValues="+filterValues+"&type="+type+"&title="+titulo, "zoom" , "status , scrollbars=no ,left=200,width=800, height=600");
	
	console.log("finalizei a zoomDataSet")
	
}

// FUNÇÃO PARA CONSTRUIR O ZOOM TIPO 1
function zoomTipo1(tipo,objeto){
	
	console.log("entrei no zoomTipo1")
	
	var seq = $(objeto).attr("id").split("___")[1]
	
	console.log("seq: "+seq)
	
	$("#TIPO1___"+seq).addClass("selecionadoZoom")
	
	// PASSAGEM DE PARÂMETROS PARA FUNÇÃO ZOOM DATASET: Titulo, dataset, campos, type
	zoomDataSet('Tipo', 'dsTipoHorasImprodutivas', 'TIPO,Tipo - Descrição','TIPO,CODRAZAO,DSCRAZAO', "", tipo);
	
	console.log("finalizei o zoomTipo1")
	
}

// FUNÇÃO PARA CONSTRUIR O ZOOM TIPO 2
function zoomTipo2(tipo,objeto){
	
	console.log("entrei no zoomTipo2")
	
	var seq = $(objeto).attr("id").split("___")[1]
	
	console.log("seq: "+seq)
	
	$("#TIPO2___"+seq).addClass("selecionadoZoom")
	
	// PASSAGEM DE PARÂMETROS PARA FUNÇÃO ZOOM DATASET: Titulo, dataset, campos, type
	zoomDataSet('Tipo', 'dsTipoHorasImprodutivas', 'TIPO,Tipo - Descrição','TIPO,CODRAZAO,DSCRAZAO', "", tipo);
	
	console.log("finalizei o zoomTipo2")
	
}

// FUNÇÃO PARA CONSTRUIR O ZOOM TIPO 3
function zoomTipo3(tipo,objeto){
	
	console.log("entrei no zoomTipo3")
	
	var seq = $(objeto).attr("id").split("___")[1]
	
	console.log("seq: "+seq)
	
	$("#TIPO3___"+seq).addClass("selecionadoZoom")
	
	// PASSAGEM DE PARÂMETROS PARA FUNÇÃO ZOOM DATASET: Titulo, dataset, campos, type
	zoomDataSet('Tipo', 'dsTipoHorasImprodutivas', 'TIPO,Tipo - Descrição','TIPO,CODRAZAO,DSCRAZAO', "", tipo);
	
	console.log("finalizei o zoomTipo3")
	
}

// FUNÇÃO PARA CONSTRUIR O ZOOM TIPO 4
function zoomTipo4(tipo,objeto){
	
	console.log("entrei no zoomTipo4")
	
	var seq = $(objeto).attr("id").split("___")[1]
	
	console.log("seq: "+seq)
	
	$("#TIPO4___"+seq).addClass("selecionadoZoom")
	
	// PASSAGEM DE PARÂMETROS PARA FUNÇÃO ZOOM DATASET: Titulo, dataset, campos, type
	zoomDataSet('Tipo', 'dsTipoHorasImprodutivas', 'TIPO,Tipo - Descrição','TIPO,CODRAZAO,DSCRAZAO', "", tipo);
	
	console.log("finalizei o zoomTipo4")
	
}

// FUNÇÃO PARA CONSTRUIR O ZOOM TIPO 5
function zoomTipo5(tipo,objeto){
	
	console.log("entrei no zoomTipo5")
	
	var seq = $(objeto).attr("id").split("___")[1]
	
	console.log("seq: "+seq)
	
	$("#TIPO5___"+seq).addClass("selecionadoZoom")
	
	// PASSAGEM DE PARÂMETROS PARA FUNÇÃO ZOOM DATASET: Titulo, dataset, campos, type
	zoomDataSet('Tipo', 'dsTipoHorasImprodutivas', 'TIPO,Tipo - Descrição','TIPO,CODRAZAO,DSCRAZAO', "", tipo);
	
	console.log("finalizei o zoomTipo5")
	
}

// FUNÇÃO PARA CONSTRUIR O ZOOM TIPO 6
function zoomTipo6(tipo,objeto){
	
	console.log("entrei no zoomTipo6")
	
	var seq = $(objeto).attr("id").split("___")[1]
	
	console.log("seq: "+seq)
	
	$("#TIPO6___"+seq).addClass("selecionadoZoom")
	
	// PASSAGEM DE PARÂMETROS PARA FUNÇÃO ZOOM DATASET: Titulo, dataset, campos, type
	zoomDataSet('Tipo', 'dsTipoHorasImprodutivas', 'TIPO,Tipo - Descrição','TIPO,CODRAZAO,DSCRAZAO', "", tipo);
	
	console.log("finalizei o zoomTipo6")
	
}

// FUNÇÃO PARA CONSTRUIR O ZOOM TIPO 7
function zoomTipo7(tipo,objeto){
	
	console.log("entrei no zoomTipo7")
	
	var seq = $(objeto).attr("id").split("___")[1]
	
	console.log("seq: "+seq)
	
	$("#TIPO7___"+seq).addClass("selecionadoZoom")
	
	// PASSAGEM DE PARÂMETROS PARA FUNÇÃO ZOOM DATASET: Titulo, dataset, campos, type
	zoomDataSet('Tipo', 'dsTipoHorasImprodutivas', 'TIPO,Tipo - Descrição','TIPO,CODRAZAO,DSCRAZAO', "", tipo);
	
	console.log("finalizei o zoomTipo7")
	
}

// FUNÇÃO PARA CONSTRUIR O ZOOM TIPO 8
function zoomTipo8(tipo,objeto){
	
	console.log("entrei no zoomTipo8")
	
	var seq = $(objeto).attr("id").split("___")[1]
	
	console.log("seq: "+seq)
	
	$("#TIPO8___"+seq).addClass("selecionadoZoom")
	
	// PASSAGEM DE PARÂMETROS PARA FUNÇÃO ZOOM DATASET: Titulo, dataset, campos, type
	zoomDataSet('Tipo', 'dsTipoHorasImprodutivas', 'TIPO,Tipo - Descrição','TIPO,CODRAZAO,DSCRAZAO', "", tipo);
	
	console.log("finalizei o zoomTipo8")
	
}

// FUNÇÃO PARA CONSTRUIR O ZOOM TIPO 9
function zoomTipo9(tipo,objeto){
	
	console.log("entrei no zoomTipo9")
	
	var seq = $(objeto).attr("id").split("___")[1]
	
	console.log("seq: "+seq)
	
	$("#TIPO9___"+seq).addClass("selecionadoZoom")
	
	// PASSAGEM DE PARÂMETROS PARA FUNÇÃO ZOOM DATASET: Titulo, dataset, campos, type
	zoomDataSet('Tipo', 'dsTipoHorasImprodutivas', 'TIPO,Tipo - Descrição','TIPO,CODRAZAO,DSCRAZAO', "", tipo);
	
	console.log("finalizei o zoomTipo9")
	
}

// FUNÇÃO PARA CONSTRUIR O ZOOM TIPO 10
function zoomTipo10(tipo,objeto){
	
	console.log("entrei no zoomTipo10")
	
	var seq = $(objeto).attr("id").split("___")[1]
	
	console.log("seq: "+seq)
	
	$("#TIPO10___"+seq).addClass("selecionadoZoom")
	
	// PASSAGEM DE PARÂMETROS PARA FUNÇÃO ZOOM DATASET: Titulo, dataset, campos, type
	zoomDataSet('Tipo', 'dsTipoHorasImprodutivas', 'TIPO,Tipo - Descrição','TIPO,CODRAZAO,DSCRAZAO', "", tipo);
	
	console.log("finalizei o zoomTipo10")
	
}

// SE ITEM É REMOVIDO DO CAMPO ZOOM
function setSelectedZoomItem(selectedItem) {        
	
	var input = selectedItem.inputId;
	
	console.log("entrei no setSelectedZoomItem")
	
	// SE ITEM FOI SELECIONADO NO ZOOM CONVENCIONAL
	if(!(selectedItem.inputId==undefined)){
		
		// SE A OS É SELECIONADA
		if(selectedItem.inputId =="FILIAL"){
		
			console.log("entrei no selectZoom Filial")
			
			// SALVA OS DADOS NECESSÁRIOS
			$("#CODFILIAL").val(selectedItem["CODFILIAL"])
			
			console.log("vou dar um reloadZoom com codFilial: "+selectedItem["CODFILIAL"])
			
			console.log("vamos lá")
			
			// FAZ UM RELOAD NAS ORDENS DE ACORDO COM A FILIAL SELECIONADA
			//reloadZoomFilterValues("ORDEMPRODUCAO","CODFILIAL,"+selectedItem["CODFILIAL"])
			
			//setTimeout(function(){
				
				var codFilial = selectedItem["CODFILIAL"]
				
				console.log("vou fazer o reload com filial "+codFilial)
				
				// FAZ UM RELOAD NOS COLABORADORES
				reloadZoomFilterValues("MATRICULA","CODFILIAL,"+codFilial)
				
				// HABILITA O CAMPO DA MATRÍCULA
				$("#MATRICULA").prop("disabled",false)
				
			//},1000)
			
		}
		
		// SE A OP É SELECIONADA
		if(selectedItem.inputId =="ORDEMPRODUCAO"){
		
			console.log("entrei no selectZoom OP")
			
			// SALVA OS DADOS NECESSÁRIOS
			$("#CODORDEM").val(selectedItem["CODORDEM"])
			
		}
		
		// SE A MATRÍCULA É SELECIONADA
		if(selectedItem.inputId =="MATRICULA"){
			
			console.log("entrei no selectZoom Matricula")
			
			// SALVA OS DADOS NECESSÁRIOS
			$("#CODMO").val(selectedItem["CODMO"])
			$("#TURNO").val(selectedItem["TURNO"])
			
		}
		
		// SE O TIPO1 É SELECIONADO
		if(selectedItem.inputId.indexOf("TIPO1___")!=-1){
		
			// VARIÁVEL PARA ÍNDICE DO ITEM DA TABELA
			var seq = selectedItem.inputId.split("___")[1];
			
			$("#CODTIPO1___"+seq).val(selectedItem["CODRAZAO"])
			$("#DESCRICAOTIPO1___"+seq).val(selectedItem["DSCRAZAO"])
			
			// CALCULA E SOMA TODOS OS SALDOS TRABALHADOS
			calculaSomaSaldo(seq)
			
		}
		
		// SE O TIPO2 É SELECIONADO
		if(selectedItem.inputId.indexOf("TIPO2___")!=-1){
		
			// VARIÁVEL PARA ÍNDICE DO ITEM DA TABELA
			var seq = selectedItem.inputId.split("___")[1];
			
			$("#CODTIPO2___"+seq).val(selectedItem["CODRAZAO"])
			$("#DESCRICAOTIPO2___"+seq).val(selectedItem["DSCRAZAO"])
			
			// CALCULA E SOMA TODOS OS SALDOS TRABALHADOS
			calculaSomaSaldo(seq)
			
		}
		
		// SE O TIPO3 É SELECIONADO
		if(selectedItem.inputId.indexOf("TIPO3___")!=-1){
		
			// VARIÁVEL PARA ÍNDICE DO ITEM DA TABELA
			var seq = selectedItem.inputId.split("___")[1];
			
			$("#CODTIPO3___"+seq).val(selectedItem["CODRAZAO"])
			$("#DESCRICAOTIPO3___"+seq).val(selectedItem["DSCRAZAO"])
			
			// CALCULA E SOMA TODOS OS SALDOS TRABALHADOS
			calculaSomaSaldo(seq)
			
		}
		
		// SE O TIPO4 É SELECIONADO
		if(selectedItem.inputId.indexOf("TIPO4___")!=-1){
		
			// VARIÁVEL PARA ÍNDICE DO ITEM DA TABELA
			var seq = selectedItem.inputId.split("___")[1];
			
			$("#CODTIPO4___"+seq).val(selectedItem["CODRAZAO"])
			$("#DESCRICAOTIPO4___"+seq).val(selectedItem["DSCRAZAO"])
			
			// CALCULA E SOMA TODOS OS SALDOS TRABALHADOS
			calculaSomaSaldo(seq)
			
		}
		
		// SE O TIPO5 É SELECIONADO
		if(selectedItem.inputId.indexOf("TIPO5___")!=-1){
		
			// VARIÁVEL PARA ÍNDICE DO ITEM DA TABELA
			var seq = selectedItem.inputId.split("___")[1];
			
			$("#CODTIPO5___"+seq).val(selectedItem["CODRAZAO"])
			$("#DESCRICAOTIPO5___"+seq).val(selectedItem["DSCRAZAO"])
			
			// CALCULA E SOMA TODOS OS SALDOS TRABALHADOS
			calculaSomaSaldo(seq)
			
		}
		
		// SE O TIPO1 É SELECIONADO
		if(selectedItem.inputId.indexOf("TIPO6___")!=-1){
		
			// VARIÁVEL PARA ÍNDICE DO ITEM DA TABELA
			var seq = selectedItem.inputId.split("___")[1];
			
			$("#CODTIPO6___"+seq).val(selectedItem["CODRAZAO"])
			$("#DESCRICAOTIPO6___"+seq).val(selectedItem["DSCRAZAO"])
			
			// CALCULA E SOMA TODOS OS SALDOS TRABALHADOS
			calculaSomaSaldo(seq)
			
		}
		
		// SE O TIPO1 É SELECIONADO
		if(selectedItem.inputId.indexOf("TIPO7___")!=-1){
		
			// VARIÁVEL PARA ÍNDICE DO ITEM DA TABELA
			var seq = selectedItem.inputId.split("___")[1];
			
			$("#CODTIPO7___"+seq).val(selectedItem["CODRAZAO"])
			$("#DESCRICAOTIPO7___"+seq).val(selectedItem["DSCRAZAO"])
			
			// CALCULA E SOMA TODOS OS SALDOS TRABALHADOS
			calculaSomaSaldo(seq)
			
		}
		
		// SE O TIPO1 É SELECIONADO
		if(selectedItem.inputId.indexOf("TIPO8___")!=-1){
		
			// VARIÁVEL PARA ÍNDICE DO ITEM DA TABELA
			var seq = selectedItem.inputId.split("___")[1];
			
			$("#CODTIPO8___"+seq).val(selectedItem["CODRAZAO"])
			$("#DESCRICAOTIPO8___"+seq).val(selectedItem["DSCRAZAO"])
			
			// CALCULA E SOMA TODOS OS SALDOS TRABALHADOS
			calculaSomaSaldo(seq)
			
		}
		
		// SE O TIPO1 É SELECIONADO
		if(selectedItem.inputId.indexOf("TIPO9___")!=-1){
		
			// VARIÁVEL PARA ÍNDICE DO ITEM DA TABELA
			var seq = selectedItem.inputId.split("___")[1];
			
			$("#CODTIPO9___"+seq).val(selectedItem["CODRAZAO"])
			$("#DESCRICAOTIPO9___"+seq).val(selectedItem["DSCRAZAO"])
			
			// CALCULA E SOMA TODOS OS SALDOS TRABALHADOS
			calculaSomaSaldo(seq)
			
		}
		
		// SE O TIPO1 É SELECIONADO
		if(selectedItem.inputId.indexOf("TIPO10___")!=-1){
		
			// VARIÁVEL PARA ÍNDICE DO ITEM DA TABELA
			var seq = selectedItem.inputId.split("___")[1];
			
			$("#CODTIPO10___"+seq).val(selectedItem["CODRAZAO"])
			$("#DESCRICAOTIPO10___"+seq).val(selectedItem["DSCRAZAO"])
			
			// CALCULA E SOMA TODOS OS SALDOS TRABALHADOS
			calculaSomaSaldo(seq)
			
		}
		
	}
	
	// VERIFICA O TYPE DA FUNÇÃO ZOOM
	if(selectedItem.type == "tipo1") {
		
		console.log("entrei no tipo1")
		
		var seq = buscaSeqZoomTipo1()
		
		$("#TIPO1___"+seq).removeClass("selecionadoZoom")
		$("#TIPO1___"+seq).prop("disabled",false)
		
		$("#CODTIPO1___"+seq).val(selectedItem.CODRAZAO)
		$("#DESCRICAOTIPO1___"+seq).val(selectedItem.DSCRAZAO)
		$("#TIPO1___"+seq).val(selectedItem.TIPO)
		
		//$("#HORAINICIOIMPRO1___"+seq).prop("disabled",false)
		
	}
	
	// VERIFICA O TYPE DA FUNÇÃO ZOOM
	if(selectedItem.type == "tipo2") {
		
		console.log("entrei no tipo2")
		
		var seq = buscaSeqZoomTipo2()
		
		$("#TIPO2___"+seq).removeClass("selecionadoZoom")
		$("#TIPO2___"+seq).prop("disabled",false)

		$("#CODTIPO2___"+seq).val(selectedItem.CODRAZAO)
		$("#DESCRICAOTIPO2___"+seq).val(selectedItem.DSCRAZAO)
		$("#TIPO2___"+seq).val(selectedItem.TIPO)
		
		//$("#HORAINICIOIMPRO2___"+seq).prop("disabled",false)
		
	}
	
	// VERIFICA O TYPE DA FUNÇÃO ZOOM
	if(selectedItem.type == "tipo3") {
		
		console.log("entrei no tipo3")
		
		var seq = buscaSeqZoomTipo3()
		
		$("#TIPO3___"+seq).removeClass("selecionadoZoom")
		$("#TIPO3___"+seq).prop("disabled",false)

		$("#CODTIPO3___"+seq).val(selectedItem.CODRAZAO)
		$("#DESCRICAOTIPO3___"+seq).val(selectedItem.DSCRAZAO)
		$("#TIPO3___"+seq).val(selectedItem.TIPO)
		
		//$("#HORAINICIOIMPRO3___"+seq).prop("disabled",false)
		
	}
	
	// VERIFICA O TYPE DA FUNÇÃO ZOOM
	if(selectedItem.type == "tipo4") {
		
		console.log("entrei no tipo4")
		
		var seq = buscaSeqZoomTipo4()
		
		$("#TIPO4___"+seq).removeClass("selecionadoZoom")
		$("#TIPO4___"+seq).prop("disabled",false)

		$("#CODTIPO4___"+seq).val(selectedItem.CODRAZAO)
		$("#DESCRICAOTIPO4___"+seq).val(selectedItem.DSCRAZAO)
		$("#TIPO4___"+seq).val(selectedItem.TIPO)
		
		//$("#HORAINICIOIMPRO4___"+seq).prop("disabled",false)
		
	}
	
	// VERIFICA O TYPE DA FUNÇÃO ZOOM
	if(selectedItem.type == "tipo5") {
		
		console.log("entrei no tipo5")
		
		var seq = buscaSeqZoomTipo5()
		
		$("#TIPO5___"+seq).removeClass("selecionadoZoom")
		$("#TIPO5___"+seq).prop("disabled",false)

		$("#CODTIPO5___"+seq).val(selectedItem.CODRAZAO)
		$("#DESCRICAOTIPO5___"+seq).val(selectedItem.DSCRAZAO)
		$("#TIPO5___"+seq).val(selectedItem.TIPO)
		
		//$("#HORAINICIOIMPRO5___"+seq).prop("disabled",false)
		
	}
	
	// VERIFICA O TYPE DA FUNÇÃO ZOOM
	if(selectedItem.type == "tipo5") {
		
		console.log("entrei no tipo5")
		
		var seq = buscaSeqZoomTipo5()
		
		$("#TIPO5___"+seq).removeClass("selecionadoZoom")
		$("#TIPO5___"+seq).prop("disabled",false)

		$("#CODTIPO5___"+seq).val(selectedItem.CODRAZAO)
		$("#DESCRICAOTIPO5___"+seq).val(selectedItem.DSCRAZAO)
		$("#TIPO5___"+seq).val(selectedItem.TIPO)
		
		//$("#HORAINICIOIMPRO5___"+seq).prop("disabled",false)
		
	}
	
	// VERIFICA O TYPE DA FUNÇÃO ZOOM
	if(selectedItem.type == "tipo6") {
		
		console.log("entrei no tipo6")
		
		var seq = buscaSeqZoomTipo6()
		
		$("#TIPO6___"+seq).removeClass("selecionadoZoom")
		$("#TIPO6___"+seq).prop("disabled",false)

		$("#CODTIPO6___"+seq).val(selectedItem.CODRAZAO)
		$("#DESCRICAOTIPO6___"+seq).val(selectedItem.DSCRAZAO)
		$("#TIPO6___"+seq).val(selectedItem.TIPO)
		
		//$("#HORAINICIOIMPRO6___"+seq).prop("disabled",false)
		
	}
	
	// VERIFICA O TYPE DA FUNÇÃO ZOOM
	if(selectedItem.type == "tipo7") {
		
		console.log("entrei no tipo7")
		
		var seq = buscaSeqZoomTipo7()
		
		$("#TIPO7___"+seq).removeClass("selecionadoZoom")
		$("#TIPO7___"+seq).prop("disabled",false)

		$("#CODTIPO7___"+seq).val(selectedItem.CODRAZAO)
		$("#DESCRICAOTIPO7___"+seq).val(selectedItem.DSCRAZAO)
		$("#TIPO7___"+seq).val(selectedItem.TIPO)
		
		//$("#HORAINICIOIMPRO5___"+seq).prop("disabled",false)
		
	}
	
	// VERIFICA O TYPE DA FUNÇÃO ZOOM
	if(selectedItem.type == "tipo8") {
		
		console.log("entrei no tipo8")
		
		var seq = buscaSeqZoomTipo8()
		
		$("#TIPO8___"+seq).removeClass("selecionadoZoom")
		$("#TIPO8___"+seq).prop("disabled",false)

		$("#CODTIPO8___"+seq).val(selectedItem.CODRAZAO)
		$("#DESCRICAOTIPO8___"+seq).val(selectedItem.DSCRAZAO)
		$("#TIPO8___"+seq).val(selectedItem.TIPO)
		
		//$("#HORAINICIOIMPRO8___"+seq).prop("disabled",false)
		
	}
	
	// VERIFICA O TYPE DA FUNÇÃO ZOOM
	if(selectedItem.type == "tipo9") {
		
		console.log("entrei no tipo9")
		
		var seq = buscaSeqZoomTipo9()
		
		$("#TIPO9___"+seq).removeClass("selecionadoZoom")
		$("#TIPO9___"+seq).prop("disabled",false)

		$("#CODTIPO9___"+seq).val(selectedItem.CODRAZAO)
		$("#DESCRICAOTIPO9___"+seq).val(selectedItem.DSCRAZAO)
		$("#TIPO9___"+seq).val(selectedItem.TIPO)
		
		//$("#HORAINICIOIMPRO9___"+seq).prop("disabled",false)
		
	}
	
	// VERIFICA O TYPE DA FUNÇÃO ZOOM
	if(selectedItem.type == "tipo10") {
		
		console.log("entrei no tipo10")
		
		var seq = buscaSeqZoomTipo10()
		
		$("#TIPO10___"+seq).removeClass("selecionadoZoom")
		$("#TIPO10___"+seq).prop("disabled",false)

		$("#CODTIPO10___"+seq).val(selectedItem.CODRAZAO)
		$("#DESCRICAOTIPO10___"+seq).val(selectedItem.DSCRAZAO)
		$("#TIPO10___"+seq).val(selectedItem.TIPO)
		
		//$("#HORAINICIOIMPRO10___"+seq).prop("disabled",false)
		
	}
		
	console.log("acabei o selected Zoom")
	
	//formataCampos();
	
}

// SE ITEM É REMOVIDO DO CAMPO ZOOM
function removedZoomItem(removedItem){
	
	var input = removedItem.inputId;
	
	console.log("entrei no removedZoomItem")
	
	// SE A FILIAL É REMOVIDA
	if(removedItem.inputId == "FILIAL"){
	
		console.log("removi a Filial")
		
		// LIMPA OS CAMPOS AUTOMATICAMENTE
		$("#CODFILIAL").val("")
		
		var codFilial = $("#CODFILIAL").val()
				
		console.log("vou fazer o reload com filial "+codFilial)
				
		// FAZ UM RELOAD NOS COLABORADORES
		reloadZoomFilterValues("MATRICULA","CODFILIAL,"+codFilial)
		
		// HABILITA O CAMPO DA MATRÍCULA
		$("#MATRICULA").prop("disabled",true)
		
	}
	
	// SE A OP É REMOVIDA
	if(removedItem.inputId == "ORDEMPRODUCAO"){
	
		console.log("removi a OP")
		
		// LIMPA OS CAMPOS AUTOMATICAMENTE
		$("#CODORDEM").val("")
		
	}
	
	// SE A MATRÍCULA É REMOVIDA
	if(removedItem.inputId == "MATRICULA"){
		
		console.log("removi a Matricula")
		
		// LIMPA OS CAMPOS AUTOMATICAMENTE
		$("#CODMO").val("")
		$("#TURNO").val("")
		
	}
	
	// SE O TIPO1 É REMOVIDO
	if(removedItem.inputId.indexOf("TIPO1___")!=-1){
	
		// VARIÁVEL PARA ÍNDICE DO ITEM DA TABELA
		var seq = removedItem.inputId.split("___")[1];
		
		$("#CODTIPO1___"+seq).val("")
		$("#DESCRICAOTIPO1___"+seq).val("")
		
		// CALCULA E SOMA TODOS OS SALDOS TRABALHADOS
		calculaSomaSaldo(seq)
		
	}
	
	// SE O TIPO2 É REMOVIDO
	if(removedItem.inputId.indexOf("TIPO2___")!=-1){
	
		// VARIÁVEL PARA ÍNDICE DO ITEM DA TABELA
		var seq = removedItem.inputId.split("___")[1];
		
		$("#CODTIPO2___"+seq).val("")
		$("#DESCRICAOTIPO2___"+seq).val("")
		
		// CALCULA E SOMA TODOS OS SALDOS TRABALHADOS
		calculaSomaSaldo(seq)
		
	}
	
	// SE O TIPO3 É REMOVIDO
	if(removedItem.inputId.indexOf("TIPO3___")!=-1){
	
		// VARIÁVEL PARA ÍNDICE DO ITEM DA TABELA
		var seq = removedItem.inputId.split("___")[1];
		
		$("#CODTIPO3___"+seq).val("")
		$("#DESCRICAOTIPO3___"+seq).val("")
		
		// CALCULA E SOMA TODOS OS SALDOS TRABALHADOS
		calculaSomaSaldo(seq)
		
	}
	
	// SE O TIPO4 É REMOVIDO
	if(removedItem.inputId.indexOf("TIPO4___")!=-1){
	
		// VARIÁVEL PARA ÍNDICE DO ITEM DA TABELA
		var seq = removedItem.inputId.split("___")[1];
		
		$("#CODTIPO4___"+seq).val("")
		$("#DESCRICAOTIPO4___"+seq).val("")
		
		// CALCULA E SOMA TODOS OS SALDOS TRABALHADOS
		calculaSomaSaldo(seq)
			
	}
	
	// SE O TIPO5 É REMOVIDO
	if(removedItem.inputId.indexOf("TIPO5___")!=-1){
	
		// VARIÁVEL PARA ÍNDICE DO ITEM DA TABELA
		var seq = removedItem.inputId.split("___")[1];
		
		$("#CODTIPO5___"+seq).val("")
		$("#DESCRICAOTIPO5___"+seq).val("")
		
		// CALCULA E SOMA TODOS OS SALDOS TRABALHADOS
		calculaSomaSaldo(seq)
		
	}
	
	// SE O TIPO6 É REMOVIDO
	if(removedItem.inputId.indexOf("TIPO6___")!=-1){
	
		// VARIÁVEL PARA ÍNDICE DO ITEM DA TABELA
		var seq = removedItem.inputId.split("___")[1];
		
		$("#CODTIPO6___"+seq).val("")
		$("#DESCRICAOTIPO6___"+seq).val("")
		
		// CALCULA E SOMA TODOS OS SALDOS TRABALHADOS
		calculaSomaSaldo(seq)
		
	}
	
	// SE O TIPO7 É REMOVIDO
	if(removedItem.inputId.indexOf("TIPO7___")!=-1){
	
		// VARIÁVEL PARA ÍNDICE DO ITEM DA TABELA
		var seq = removedItem.inputId.split("___")[1];
		
		$("#CODTIPO7___"+seq).val("")
		$("#DESCRICAOTIPO7___"+seq).val("")
		
		// CALCULA E SOMA TODOS OS SALDOS TRABALHADOS
		calculaSomaSaldo(seq)
			
	}
	
	// SE O TIPO8 É REMOVIDO
	if(removedItem.inputId.indexOf("TIPO8___")!=-1){
	
		// VARIÁVEL PARA ÍNDICE DO ITEM DA TABELA
		var seq = removedItem.inputId.split("___")[1];
		
		$("#CODTIPO8___"+seq).val("")
		$("#DESCRICAOTIPO8___"+seq).val("")
		
		// CALCULA E SOMA TODOS OS SALDOS TRABALHADOS
		calculaSomaSaldo(seq)
		
	}
	
	// SE O TIPO9 É REMOVIDO
	if(removedItem.inputId.indexOf("TIPO9___")!=-1){
	
		// VARIÁVEL PARA ÍNDICE DO ITEM DA TABELA
		var seq = removedItem.inputId.split("___")[1];
		
		$("#CODTIPO9___"+seq).val("")
		$("#DESCRICAOTIPO9___"+seq).val("")
		
		// CALCULA E SOMA TODOS OS SALDOS TRABALHADOS
		calculaSomaSaldo(seq)
			
	}
	
	// SE O TIPO10 É REMOVIDO
	if(removedItem.inputId.indexOf("TIPO10___")!=-1){
	
		// VARIÁVEL PARA ÍNDICE DO ITEM DA TABELA
		var seq = removedItem.inputId.split("___")[1];
		
		$("#CODTIPO10___"+seq).val("")
		$("#DESCRICAOTIPO10___"+seq).val("")
		
		// CALCULA E SOMA TODOS OS SALDOS TRABALHADOS
		calculaSomaSaldo(seq)
			
	}
	
	//formataCampos();
	
}

// SETAR UM VALOR NO ZOOM
function setZoomData(instance, value){ 
	
	window[instance].setValue(value); 
	
}