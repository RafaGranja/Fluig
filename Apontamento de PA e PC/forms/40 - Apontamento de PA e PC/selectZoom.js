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
	
	console.log("entrei no zoomTipo1")
	
	var seq = $(objeto).attr("id").split("___")[1]
	
	console.log("seq: "+seq)
	
	$("#TIPO2___"+seq).addClass("selecionadoZoom")
	
	// PASSAGEM DE PARÂMETROS PARA FUNÇÃO ZOOM DATASET: Titulo, dataset, campos, type
	zoomDataSet('Tipo', 'dsTipoHorasImprodutivas', 'TIPO,Tipo - Descrição','TIPO,CODRAZAO,DSCRAZAO', "", tipo);
	
	console.log("finalizei o zoomTipo1")
	
}

// FUNÇÃO PARA CONSTRUIR O ZOOM TIPO 3
function zoomTipo3(tipo,objeto){
	
	console.log("entrei no zoomTipo1")
	
	var seq = $(objeto).attr("id").split("___")[1]
	
	console.log("seq: "+seq)
	
	$("#TIPO3___"+seq).addClass("selecionadoZoom")
	
	// PASSAGEM DE PARÂMETROS PARA FUNÇÃO ZOOM DATASET: Titulo, dataset, campos, type
	zoomDataSet('Tipo', 'dsTipoHorasImprodutivas', 'TIPO,Tipo - Descrição','TIPO,CODRAZAO,DSCRAZAO', "", tipo);
	
	console.log("finalizei o zoomTipo1")
	
}

// FUNÇÃO PARA CONSTRUIR O ZOOM TIPO 4
function zoomTipo4(tipo,objeto){
	
	console.log("entrei no zoomTipo1")
	
	var seq = $(objeto).attr("id").split("___")[1]
	
	console.log("seq: "+seq)
	
	$("#TIPO4___"+seq).addClass("selecionadoZoom")
	
	// PASSAGEM DE PARÂMETROS PARA FUNÇÃO ZOOM DATASET: Titulo, dataset, campos, type
	zoomDataSet('Tipo', 'dsTipoHorasImprodutivas', 'TIPO,Tipo - Descrição','TIPO,CODRAZAO,DSCRAZAO', "", tipo);
	
	console.log("finalizei o zoomTipo1")
	
}

// FUNÇÃO PARA CONSTRUIR O ZOOM TIPO 5
function zoomTipo5(tipo,objeto){
	
	console.log("entrei no zoomTipo1")
	
	var seq = $(objeto).attr("id").split("___")[1]
	
	console.log("seq: "+seq)
	
	$("#TIPO5___"+seq).addClass("selecionadoZoom")
	
	// PASSAGEM DE PARÂMETROS PARA FUNÇÃO ZOOM DATASET: Titulo, dataset, campos, type
	zoomDataSet('Tipo', 'dsTipoHorasImprodutivas', 'TIPO,Tipo - Descrição','TIPO,CODRAZAO,DSCRAZAO', "", tipo);
	
	console.log("finalizei o zoomTipo1")
	
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
			
			$("#DATA_DE").prop("disabled",false)
			
			console.log("vou dar um reloadZoom com codFilial: "+selectedItem["CODFILIAL"])
			
			// FAZ UM RELOAD NAS ORDENS DE ACORDO COM A FILIAL SELECIONADA
			reloadZoomFilterValues("PLANOCORTE","CODFILIAL,"+selectedItem["CODFILIAL"])
			
		}
		
		// SE O NÚMERO DO PLANO DE CORTE É SELECIONADO
		if(selectedItem.inputId =="PLANOCORTE"){
		
			console.log("entrei no selectZoom PLANOCORTE")
			
			var codFilial = $("#CODFILIAL").val()
			var dataDe = $("#DATA_DE").val()
			
			// SE A FILIAL OU A DATA NÃO FORAM INFORMADAS
			if((codFilial=="" || codFilial==null || codFilial==undefined) || (dataDe=="" || dataDe==null || dataDe==undefined)){
				
				// REMOVE A SELEÇÃO
				$("#PLANOCORTE>option").remove()
				
				// EXIBE ALERTA
				Swal.fire({
					  icon: 'error',
					  title: 'A Filial e/ou a data não foram informadas',
					  text: 'Verifique e tente novamente'
				})
				
			} else {
				// SE NÃO
				
				// SALVA OS DADOS NECESSÁRIOS
				$("#NUMPLANOCORTE").val(selectedItem["NUMPLANOCORTE"])
				$("#CODCOLIGADA").val(selectedItem["CODCOLIGADA"])

				dataDe = formataDataBanco(dataDe)
				
				var myLoading2 = FLUIGC.loading(window);
		
				myLoading2.show();
				
				setTimeout(function(){
					
					var saldoPlano
					
					if(!PlanoConcluido()){
						// SE AS ATIVIDADES DO PLANO DE CORTE JÁ TEVE APONTAMENTO
						console.log("PLANO NÃO ESTÁ CONCLUÍDO")
						//if(temApont()){
							
							//buscaInfoPlano(selectedItem['NUMPLANOCORTE'],dataDe,selectedItem['IDLOTE'],codFilial,saldoPlano)
							
						//} else {
							//// SE NÃO
							var ret_ra = verificaRA();
							console.log("retorno da ra:",ret_ra);
							if(ret_ra.VERIFICA==true){

								saldoPlano = buscaSaldoPlano(selectedItem["CODCOLIGADA"],$("#CODFILIAL").val(),selectedItem['NUMPLANOCORTE'])
							
								// SE TEM LOTE DISPONÍVEL
								if(!(saldoPlano==0)){
									
									buscaInfoPlano(selectedItem['NUMPLANOCORTE'],dataDe,selectedItem['IDLOTE'],codFilial,saldoPlano)
									$("#ENTRADAHORAS").val(0)
									
								}
								else{

									$("#PLANOCORTE>option").remove()
									
									// EXIBE ALERTA
									Swal.fire({
										  icon: 'error',
										  title: 'O Lote cadastrado no plano de corte não está disponível ou com estoque igual a 0',
										  text: 'Verifique e tente novamente.'
									})

								}

							}
							else{

								$("#PLANOCORTE>option").remove()
								Swal.fire({
									icon: 'error',
									title: ret_ra.STATUS,
									text: ret_ra.TEXT
								})

							}
							
						//}
					}
					else if(PlanoComOpsAbertas()){

						console.log("PLANO ESTÁ CONCLUÍDO, TEM OPS ABERTAS")
						buscaInfoPlano(selectedItem['NUMPLANOCORTE'],dataDe,selectedItem['IDLOTE'],codFilial,saldoPlano)
						$("#LOTEMP").prop("disabled",true)
						$("#ENTRADAHORAS").val(1)

					}
					else{

						console.log("PLANO ESTÁ CONCLUÍDO, NÃO TEM OPS ABERTAS")
						$("#PLANOCORTE>option").remove()
						// EXIBE ALERTA
						Swal.fire({
							icon: 'error',
							title: "Este Plano já está concluído e não possui OP's em aberto",
							text: 'Verifique e tente novamente'
						})

					}
					
				},500)
			
				// DESATIVA O LOAD
				setTimeout(function(){
					
					myLoading2.hide();
					
				}, 500)
				
			}
			
		}
		
		// SE O LOTE FOI SELECIONADO
		if(selectedItem.inputId =="LOTEMP"){
			
			var qtdapontprev = QtdApontPrev(selectedItem["CODIGOPRD"],selectedItem["IDLOTE"])
			var totalConsumo = (Number(selectedItem["QTDEMP"])-Number(qtdapontprev)).toFixed(4)

			console.log("entrei no selectZoom do lote")
			
			console.log("total a ser consumido do plano: "+totalConsumo+", estoque do lote: "+selectedItem["ESTOQUE_ATUAL"])
			
			//var totalConsumo = parseFloat(selectedItem["CONSUMO_PLANEJADO_TsOTAL"])
			var estoqueLote = Number(selectedItem["ESTOQUE_ATUAL"])
			
			// VERIFICA SE O LOTE TEM SALDO SUFICIENTE
			if( Number(totalConsumo) <= Number(estoqueLote) && Number(totalConsumo) > 0){
				
				// SALVA OS DADOS NECESSÁRIOS
				$("#IDLOTE").val(selectedItem["IDLOTE"])
				$("#NUMLOTE").val(selectedItem["NUMLOTE"])
				$("#CODIGOPRDMP").val(selectedItem["CODIGOPRD"])
				
				//$("#QTDEMP").val(selectedItem["CONSUMO_PLANEJADO_TOTAL"])
				$("#QTDEMP").val(totalConsumo)
				$("#QTDE_LINK").css("display","block");
				
			} else {
				// SE NÃO, EXIBE ALERTA
				$("#LOTEMP>option").remove()
				$("#QTDE_LINK").css("display","none");
				// EXIBE ALERTA
				Swal.fire({
					  icon: 'error',
					  title: 'Atenção',
					  text: 'O lote selecionado não tem saldo suficiente para o apontamento desse PA/PC ou existem incongruências nas quantidades do plano'
				})
				
			}
			
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
			
			var dataApont = $("#DATA_DE").val()
			var codFilial = $("#CODFILIAL").val()
			var codColigada = 1
			
			// SE A DATA DO APOTAMENTO INFORMADA AINDA NÃO FOI INFORMADA
			if(!(dataApont=="" || dataApont==null || dataApont==undefined)){
				
				dataApont = formataDataBanco(dataApont)
				
				console.log("dataApont: "+dataApont+", codmo: "+selectedItem["CODMO"]+", codFilial: "+codFilial+", codColigada: "+codColigada)
				
				// VERIFICA SE O FUNCIONÁRIO SELECIONADO ESTÁ EM PERÍODO DE FÉRIAS NA DATA PROGRAMADA 
				if(verificaFerias(codColigada,codFilial,selectedItem["CODMO"],dataApont)){
					
					// SALVA OS DADOS NECESSÁRIOS
					$("#CODMO").val(selectedItem["CODMO"])
					$("#TURNO").val(selectedItem["TURNO"])
					
				} else {
					// SE NÃO
					
					// LIMPA A MATRÍCULA SELECIONADA
					$("#MATRICULA>option").remove()
					
					// EXIBE ALERTA
					Swal.fire({
						  icon: 'error',
						  title: 'O funcionário selecionado está em período de férias na data informada',
						  text: 'Verifique e tente novamente'
					})
					
				}
				
			} else {
				// SE NÃO
				
				// LIMPA A MATRÍCULA SELECIONADA
				$("#MATRICULA>option").remove()
				
				// EXIBE ALERTA
				Swal.fire({
					  icon: 'error',
					  title: 'É necessário informar a data antes de selecionar o operador!',
					  text: 'Verifique e tente novamente'
				})
				
			}
			
		}
		
		// SE O CÓDIGO DE APONTAMENTO FOI SELECIONADO
		if(selectedItem.inputId.indexOf("CODIGOAPONTAMENTO___")!=-1){
		
			// VARIÁVEL PARA ÍNDICE DO ITEM DA TABELA
			var seq = selectedItem.inputId.split("___")[1];
			
			$("#CODAPONTAMENTO___"+seq).val(selectedItem["CODRAZAO"])
			
		}
		
		// SE O TIPO1 É SELECIONADO
		if(selectedItem.inputId.indexOf("TIPO1___")!=-1){
		
			// VARIÁVEL PARA ÍNDICE DO ITEM DA TABELA
			var seq = selectedItem.inputId.split("___")[1];
			
			$("#CODTIPO1___"+seq).val(selectedItem["CODRAZAO"])
			$("#DESCRICAOTIPO1___"+seq).val(selectedItem["DSCRAZAO"])
			
		}
		
		// SE O TIPO2 É SELECIONADO
		if(selectedItem.inputId.indexOf("TIPO2___")!=-1){
		
			// VARIÁVEL PARA ÍNDICE DO ITEM DA TABELA
			var seq = selectedItem.inputId.split("___")[1];
			
			$("#CODTIPO2___"+seq).val(selectedItem["CODRAZAO"])
			$("#DESCRICAOTIPO2___"+seq).val(selectedItem["DSCRAZAO"])
			
		}
		
		// SE O TIPO3 É SELECIONADO
		if(selectedItem.inputId.indexOf("TIPO3___")!=-1){
		
			// VARIÁVEL PARA ÍNDICE DO ITEM DA TABELA
			var seq = selectedItem.inputId.split("___")[1];
			
			$("#CODTIPO3___"+seq).val(selectedItem["CODRAZAO"])
			$("#DESCRICAOTIPO3___"+seq).val(selectedItem["DSCRAZAO"])
			
		}
		
		// SE O TIPO4 É SELECIONADO
		if(selectedItem.inputId.indexOf("TIPO4___")!=-1){
		
			// VARIÁVEL PARA ÍNDICE DO ITEM DA TABELA
			var seq = selectedItem.inputId.split("___")[1];
			
			$("#CODTIPO4___"+seq).val(selectedItem["CODRAZAO"])
			$("#DESCRICAOTIPO4___"+seq).val(selectedItem["DSCRAZAO"])
			
		}
		
		// SE O TIPO5 É SELECIONADO
		if(selectedItem.inputId.indexOf("TIPO5___")!=-1){
		
			// VARIÁVEL PARA ÍNDICE DO ITEM DA TABELA
			var seq = selectedItem.inputId.split("___")[1];
			
			$("#CODTIPO5___"+seq).val(selectedItem["CODRAZAO"])
			$("#DESCRICAOTIPO5___"+seq).val(selectedItem["DSCRAZAO"])
			
		}
		
	}
	
	// VERIFICA O TYPE DA FUNÇÃO ZOOM
	if(selectedItem.type == "tipo1") {
		
		console.log("entrei no tipo1")
		
		var seq = buscaSeqZoomTipo1()
		
		$("#TIPO1___"+seq).removeClass("selecionadoZoom")
		
		$("#CODTIPO1___"+seq).val(selectedItem.CODRAZAO)
		$("#DESCRICAOTIPO1___"+seq).val(selectedItem.DSCRAZAO)
		$("#TIPO1___"+seq).val(selectedItem.TIPO)
		
		$("#HORAINICIOIMPRO1___"+seq).prop("disabled",false)
		
	}
	
	// VERIFICA O TYPE DA FUNÇÃO ZOOM
	if(selectedItem.type == "tipo2") {
		
		console.log("entrei no tipo2")
		
		var seq = buscaSeqZoomTipo2()
		
		$("#TIPO2___"+seq).removeClass("selecionadoZoom")
		
		$("#CODTIPO2___"+seq).val(selectedItem.CODRAZAO)
		$("#DESCRICAOTIPO2___"+seq).val(selectedItem.DSCRAZAO)
		$("#TIPO2___"+seq).val(selectedItem.TIPO)
		
		$("#HORAINICIOIMPRO2___"+seq).prop("disabled",false)
		
	}
	
	// VERIFICA O TYPE DA FUNÇÃO ZOOM
	if(selectedItem.type == "tipo3") {
		
		console.log("entrei no tipo3")
		
		var seq = buscaSeqZoomTipo3()
		
		$("#TIPO3___"+seq).removeClass("selecionadoZoom")
		
		$("#CODTIPO3___"+seq).val(selectedItem.CODRAZAO)
		$("#DESCRICAOTIPO3___"+seq).val(selectedItem.DSCRAZAO)
		$("#TIPO3___"+seq).val(selectedItem.TIPO)
		
		$("#HORAINICIOIMPRO3___"+seq).prop("disabled",false)
		
	}
	
	// VERIFICA O TYPE DA FUNÇÃO ZOOM
	if(selectedItem.type == "tipo4") {
		
		console.log("entrei no tipo4")
		
		var seq = buscaSeqZoomTipo4()
		
		$("#TIPO4___"+seq).removeClass("selecionadoZoom")
		
		$("#CODTIPO4___"+seq).val(selectedItem.CODRAZAO)
		$("#DESCRICAOTIPO4___"+seq).val(selectedItem.DSCRAZAO)
		$("#TIPO4___"+seq).val(selectedItem.TIPO)
		
		$("#HORAINICIOIMPRO4___"+seq).prop("disabled",false)
		
	}
	
	// VERIFICA O TYPE DA FUNÇÃO ZOOM
	if(selectedItem.type == "tipo5") {
		
		console.log("entrei no tipo5")
		
		var seq = buscaSeqZoomTipo5()
		
		$("#TIPO5___"+seq).removeClass("selecionadoZoom")
		
		$("#CODTIPO5___"+seq).val(selectedItem.CODRAZAO)
		$("#DESCRICAOTIPO5___"+seq).val(selectedItem.DSCRAZAO)
		$("#TIPO5___"+seq).val(selectedItem.TIPO)
		
		$("#HORAINICIOIMPRO5___"+seq).prop("disabled",false)
		
	}
		
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
		$("#PLANOCORTE>option").remove()
		$("#NUMPLANOCORTE").val("")
		$("#CODCOLIGADA").val("")
		$("#TEMAPONTAMENTO").val("")
		$("#DATA_DE").val("")
		$("#QTDEMP").val("")
		$("TURNO").val("")

		$("#LOTEMP>option").remove()
		$("#MATRICULA>option").remove()

		$("#PLANOCORTE").prop("disabled",true)
		$("#DATA_DE").prop("disabled",true)
		$("#LOTEMP").prop("disabled",true)
		$("#MATRICULA").prop("disabled",true)

		$("#QTDE_LINK").css("display","none");
		
		// APAGA A TABELA DO MODAL
		apagaModal()
		//LIMPA PREVISÕES DE BAIXAS
		limpaPrevBaixas();
		limpaPrevSaldo();
		limpaComps();
		
	}
	
	// SE A OP É REMOVIDA
	if(removedItem.inputId == "ORDEMPRODUCAO"){
	
		console.log("removi a OP")
		
		// LIMPA OS CAMPOS AUTOMATICAMENTE
		$("#CODORDEM").val("")
		
	}
	
	// SE O NÚMERO DO PLANO DE CORTE É REMOVIDO
	if(removedItem.inputId =="PLANOCORTE"){
	
		console.log("vou remover o PLANOCORTE")
		
		// SALVA OS DADOS NECESSÁRIOS
		$("#NUMPLANOCORTE").val("")
		$("#CODCOLIGADA").val("")
		$("#TEMAPONTAMENTO").val("")
		$("#QTDEMP").val("")
		$("TURNO").val("")

		$("#LOTEMP>option").remove()
		$("#MATRICULA>option").remove()
		
		// DESABILITA O CAMPO DO LOTE DA MP
		$("#LOTEMP").prop("disabled",true)
		$("#MATRICULA").prop("disabled",true)
		
		// REMOVE O LINK NO MODAL
		$("#LINK_MODAL").parent().children("a").removeAttr("href")
		$("#QTDE_LINK").css("display","none");
		
		// APAGA A TABELA DO MODAL
		apagaModal()

		//LIMPA PREVISÕES DE BAIXAS
		limpaPrevBaixas();
		limpaPrevSaldo();
		limpaComps();
		
	}
	
	// SE A MATRÍCULA É REMOVIDA
	if(removedItem.inputId == "MATRICULA"){
		
		console.log("removi a Matricula")
		
		// LIMPA OS CAMPOS AUTOMATICAMENTE
		$("#CODMO").val("")
		$("#TURNO").val("")
		
	}
	
	// SE O LOTE FOI REMOVIDO
	if(removedItem.inputId =="LOTEMP"){
	
		console.log("entrei no removedZoom do lote")
		
		// SALVA OS DADOS NECESSÁRIOS
		$("#IDLOTE").val("")
		$("#NUMLOTE").val("")
		$("#CODIGOPRDMP").val("")
		$("#QTDEMP").val("")
		
	}
	
	// SE O CÓDIGO DE APONTAMENTO FOI REMOVIDO
	if(removedItem.inputId.indexOf("CODIGOAPONTAMENTO___")!=-1){
	
		// VARIÁVEL PARA ÍNDICE DO ITEM DA TABELA
		var seq = removedItem.inputId.split("___")[1];
		
		$("#CODAPONTAMENTO___"+seq).val("")
		
	}
	
	// SE O TIPO1 É REMOVIDO
	if(removedItem.inputId.indexOf("TIPO1___")!=-1){
	
		// VARIÁVEL PARA ÍNDICE DO ITEM DA TABELA
		var seq = removedItem.inputId.split("___")[1];
		
		$("#CODTIPO1___"+seq).val(selectedItem["CODRAZAO"])
		$("#DESCRICAOTIPO1___"+seq).val(selectedItem["DSCRAZAO"])
		
	}
	
	// SE O TIPO2 É REMOVIDO
	if(removedItem.inputId.indexOf("TIPO2___")!=-1){
	
		// VARIÁVEL PARA ÍNDICE DO ITEM DA TABELA
		var seq = removedItem.inputId.split("___")[1];
		
		$("#CODTIPO2___"+seq).val("")
		$("#DESCRICAOTIPO2___"+seq).val("")
		
	}
	
	// SE O TIPO3 É REMOVIDO
	if(removedItem.inputId.indexOf("TIPO3___")!=-1){
	
		// VARIÁVEL PARA ÍNDICE DO ITEM DA TABELA
		var seq = removedItem.inputId.split("___")[1];
		
		$("#CODTIPO3___"+seq).val("")
		$("#DESCRICAOTIPO3___"+seq).val("")
		
	}
	
	// SE O TIPO4 É REMOVIDO
	if(removedItem.inputId.indexOf("TIPO4___")!=-1){
	
		// VARIÁVEL PARA ÍNDICE DO ITEM DA TABELA
		var seq = removedItem.inputId.split("___")[1];
		
		$("#CODTIPO4___"+seq).val("")
		$("#DESCRICAOTIPO4___"+seq).val("")
		
	}
	
	// SE O TIPO5 É REMOVIDO
	if(removedItem.inputId.indexOf("TIPO5___")!=-1){
	
		// VARIÁVEL PARA ÍNDICE DO ITEM DA TABELA
		var seq = removedItem.inputId.split("___")[1];
		
		$("#CODTIPO5___"+seq).val("")
		$("#DESCRICAOTIPO5___"+seq).val("")
		
	}
	
	//formataCampos();
	
}

// SETAR UM VALOR NO ZOOM
function setZoomData(instance, value){ 
	
	window[instance].setValue(value); 
	
}