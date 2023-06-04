// CRIA UM ZOOM EXTERNO BASEADO EM UM DATASET
function zoomDataSet(titulo, dataset, campos, resultFields, filterValues, type) {
	
	console.log("entrei na zoomDataSet")
	// 600, 350
	window.open("/webdesk/zoom.jsp?datasetId="+dataset+"&dataFields="+campos+"&resultFields="+resultFields+"&filterValues="+filterValues+"&type="+type+"&title="+titulo, "zoom" , "status , scrollbars=no ,width=800, height=600");
	
	console.log("finalizei a zoomDataSet")
	
}

// FUNÇÃO PARA CONSTRUIR O ZOOM EXTERNO
function zoomTarefa(componente) {
	
	console.log("entrei na zoomTarefa")
	
	var idprj = $("#IDPRJ_OS").val()
	
	// PASSAGEM DE PARÂMETROS PARA FUNÇÃO ZOOM DATASET: Titulo, dataset, campos, type
	zoomDataSet('Tarefa', 'dsCodTarefa', 'TAREFA,Tarefa','IDTRF,CODTRF,NOME','IDPRJ,'+idprj+'',componente);
	
	console.log("finalizei a zoomTarefa")
}

// FUNÇÃO PARA CONSTRUIR O ZOOM EXTERNO
function zoomMaterial(componente) {
	
	console.log("entrei na zoomMaterial")
	
	// PASSAGEM DE PARÂMETROS PARA FUNÇÃO ZOOM DATASET: Titulo, dataset, campos, type
	zoomDataSet('Material', 'dsMaterial', 'PRODUTO,Produto,SALDO,Saldo','PRODUTO,IDPRD,CODIGOPRD' ,'',componente);
	
	console.log("finalizei a zoomMaterial")
}

// FUNÇÃO PARA CONSTRUIR O ZOOM COMPONENTE
function zoomComponentes(componente,objeto) {
	
	console.log("entrei no zoomComponente")
	
	var seq = $(objeto).attr("id").split("___")[1]
	
	console.log("seq: "+seq)
	$("#VIEWPRODUTOCOMPONENTES___"+seq).addClass("selecionadoZoom")
	
	// PASSAGEM DE PARÂMETROS PARA FUNÇÃO ZOOM DATASET: Titulo, dataset, campos, type
	zoomDataSet('Material', 'dsMaterial', 'PRODUTO,Produto,CODUNDCONTROLE,Und','PRODUTO,IDPRD,CODIGOPRD,CODUNDCONTROLE', "", componente);
	
	console.log("finalizei o zoomComponente")
	
}

// FUNÇÃO PARA CONSTRUIR O ZOOM ATIVIDADE
function zoomAtividade(atividade,objeto){
	
	console.log("entrei no zoomAtividade")
	
	var seq = $(objeto).attr("id").split("___")[1]
	
	// BUSCA TODOS OS CÓDIGOS DAS ATIVIDADES INSERIDAS NO PROCESSO
	var atividades = buscaCodAtvsProc()
	
	// SE ATIVIDADES AINDA NÃO FORAM INFORMADAS
	if(atividades==""){
		
		console.log("atividades: "+atividades)
		
		zoomDataSet('Atividade', 'dsAtividade', 'ATIVIDADE,Cód. Atividade - Descrição','ATIVIDADE,CODATIVIDADE,DSCATIVIDADE,CODHABILIDADE,DESCRICAOHABIL',"", atividade);
		
	} else {
		// SE NÃO
		
		console.log("atividades: "+atividades)
		
		zoomDataSet('Atividade', 'dsAtividade', 'ATIVIDADE,Cód. Atividade - Descrição','ATIVIDADE,CODATIVIDADE,DSCATIVIDADE,CODHABILIDADE,DESCRICAOHABIL','ATIVIDADES,'+atividades+'', atividade);
		
	}
	
	console.log("seq: "+seq)
	$("#VIEWATIVIDADE___"+seq).addClass("selecionadoZoom")
	
	// PASSAGEM DE PARÂMETROS PARA FUNÇÃO ZOOM DATASET: Titulo, dataset, campos, type
	//zoomDataSet('Atividade', 'dsAtividade', 'CODATIVIDADE,Cód. Atividade,DSCATIVIDADE,Descrição','CODATIVIDADE,DSCATIVIDADE,CODHABILIDADE,DESCRICAOHABIL',"", atividade);
	
	console.log("finalizei o zoomAtividade")
	
}

// FUNÇÃO PARA CONSTRUIR O ZOOM POSTO
function zoomPosto(posto,objeto){
	
	console.log("entrei no zoomPosto")
	
	var seq = $(objeto).attr("id").split("___")[1]
	var numOS = $("#NUM_OS").val()

	console.log("numOS: "+numOS)
	
	console.log("seq: "+seq)
	
	$("#VIEWPOSTO___"+seq).addClass("selecionadoZoom")
	
	// PASSAGEM DE PARÂMETROS PARA FUNÇÃO ZOOM DATASET: Titulo, dataset, campos, type
	//zoomDataSet('Posto', 'dsPosto', 'CODPOSTO,Cód. Posto,DSCPOSTO,Descrição','CODPOSTO,DSCPOSTO', "CODPRJ,"+numOS+"", posto);
	
	zoomDataSet('Posto', 'dsPosto', 'POSTO,Cód. Posto - Descrição','POSTO,CODPOSTO,DSCPOSTO', "", posto);
	
	//"CODPRJ,"+numOS+""
	console.log("finalizei o zoomPosto")
	
}

// SE ITEM É SELECIONADO NO CAMPO ZOOM
function setSelectedZoomItem(selectedItem) {        
	
	var input = selectedItem.inputId;
	
	console.log("entrei no setSelectedZoomItem")
	
	if(!(selectedItem.inputId==undefined)){
		
		// SE A OS É SELECIONADA
		if(selectedItem.inputId.indexOf("OS_INFO")!="-1"){
			
			// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
			$("#NUM_OS").val(selectedItem['CODPRJ'])
			$("#CODCOLIGADA").val(selectedItem['CODCOLIGADA'])
			$("#CODFILIAL").val(selectedItem['CODFILIAL'])

			// RELOAD ZOOM FILTER VALUES NAS OP'S DO PROJETO
			reloadZoomFilterValues("OP_INFO","CODCCUSTO,"+selectedItem['CODPRJ'])
			
			// DESABILITA CAMPO ZOOM DA OP
			$("#OP_INFO").prop("disabled",false)
				
		}
		
		// SE A OP É SELECIONADA
		if(selectedItem.inputId.indexOf("OP_INFO")!="-1"){
			
			// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
			$("#CODORDEM").val(selectedItem['CODORDEM'])
			
			if(!(selectedItem['QTDEPLANEJADA']=="" || selectedItem['QTDEPLANEJADA']==undefined || selectedItem['QTDEPLANEJADA']=="null" || selectedItem['QTDEPLANEJADA']==null)){
				$("#QTDEPREVISTA").val(selectedItem['QTDEPLANEJADA'])
			} else {
				$("#QTDEPREVISTA").val(0.0000)
			}
			
			if(!(selectedItem['QTDEEFETIVADA']=="" || selectedItem['QTDEEFETIVADA']==undefined || selectedItem['QTDEEFETIVADA']=="null" || selectedItem['QTDEEFETIVADA']==null)){
				$("#QTDEAPONTADA").val(selectedItem['QTDEEFETIVADA'])	
			}else {
				$("#QTDEAPONTADA").val(0.0000)
			}
			
			if(!(selectedItem['SALDO']=="" || selectedItem['SALDO']==undefined || selectedItem['SALDO']=="null" || selectedItem['SALDO']==null)){
				$("#SALDO").val(selectedItem['SALDO'])	
			} else {
				$("#SALDO").val(0.0000)
			}
			
			// SALVA O COMPONENTE DA OP
			salvaComponente(selectedItem['COMPONENTE'],selectedItem['IDPRD'],selectedItem['CODIGOPRD'],selectedItem['CODCCUSTO'],selectedItem['CODUNDCONTROLE'])
			
		}
		
		// SE O CAUSADOR É SELECIONADO
		if(selectedItem.inputId.indexOf("CAUSADOR___")!="-1"){
			
			var seq = selectedItem.inputId.split("___")[1]
			
			// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
			$("#CODCLIENTECAUSADOR___"+seq).val(selectedItem['CODCLIENTE'])
			$("#DESCCAUSADOR___"+seq).val(selectedItem['DESCRICAO'])

			RepeteCampos($("#CAUSADOR___"+seq))
			
		}
		
		// SE A CAUSA É SELECIONADA
		if(selectedItem.inputId.indexOf("CAUSA___")!="-1"){
			
			var seq = selectedItem.inputId.split("___")[1]
			
			// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
			$("#CODCLIENTECAUSA___"+seq).val(selectedItem['CODCLIENTE'])
			$("#DESCCAUSA___"+seq).val(selectedItem['DESCRICAO'])

			RepeteCampos($("#CAUSA___"+seq))
			
		}
		
		// SE RNCRR É SELECIONADO
		if(selectedItem.inputId.indexOf("RNCRR___")!="-1"){
			
			var seq = selectedItem.inputId.split("___")[1]
			
			// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
			$("#CODCLIENTERNCRR___"+seq).val(selectedItem['CODCLIENTE'])
			$("#DESCRNCRR___"+seq).val(selectedItem['DESCRICAO'])

			RepeteCampos($("#RNCRR___"+seq))
			
		}
		
	}
	
	// VERIFICA O TYPE DA FUNÇÃO ZOOM
	if(selectedItem.type == "material") {
		
		$("#F_PRODUTO_RM").val(selectedItem.PRODUTO)
		//$("#F_PRODUTO_RM").prop("readonly",true)
		console.log("PRODUTO: "+selectedItem.PRODUTO+", IDPRD: "+selectedItem.IDPRD+", CODIGOPRD: "+selectedItem.CODIGOPRD)
		$("#F_IDPRD").val(selectedItem.IDPRD)
		$("#F_CODIGOPRD").val(selectedItem.CODIGOPRD)
	
	}
	
	// VERIFICA O TYPE DA FUNÇÃO ZOOM
	if(selectedItem.type == "tarefa") {
		
		$("#F_CODIGOTAREFA").val(selectedItem.CODTRF+" - "+selectedItem.NOME)
		//$("#F_PRODUTO_RM").prop("readonly",true)
		console.log("TAREFA: "+selectedItem.TAREFA+", IDTRF: "+selectedItem.IDTRF+", CODTRF: "+selectedItem.CODTRF+", NOMETRF: "+selectedItem.NOME)
		$("#F_CODTRFITEM").val(selectedItem.CODTRF)
		$("#F_IDTRFITEM").val(selectedItem.IDTRF)
		$("#F_NOMETRFITEM").val(selectedItem.NOME)
	
	}
	
	// VERIFICA O TYPE DA FUNÇÃO ZOOM
	if(selectedItem.type == "atividade") {
		
		console.log("entrei na seleção da atividade")
		
		// SE A ATIVIDADE ESTÁ LIBERADA 
		if(verificaAtividade(selectedItem.CODATIVIDADE)){
			
			var seq = buscaSeqZoomAtividade()
			
			$("#VIEWATIVIDADE___"+seq).val(""+selectedItem.CODATIVIDADE+" - "+selectedItem.DSCATIVIDADE)
			$("#VIEWCODATIVIDADE___"+seq).val(selectedItem.CODATIVIDADE)
			$("#VIEWDESCATIVIDADE___"+seq).val(selectedItem.DSCATIVIDADE)
			
			console.log("codHabilidade: "+selectedItem.CODHABILIDADE)
			
			if(!(selectedItem.CODHABILIDADE==null || selectedItem.CODHABILIDADE=="" || selectedItem.CODHABILIDADE=="null")){
				
				$("#VIEWHABILIDADEREQUERIDA___"+seq).val(""+selectedItem.CODHABILIDADE+" - "+selectedItem.DESCRICAOHABIL)
				$("#VIEWCODHABILIDADE___"+seq).val(selectedItem.CODHABILIDADE)
				console.log("Cod atividade: "+selectedItem.CODATIVIDADE+", Descrição atv: "+selectedItem.DSCATIVIDADE)
				
			} else {
				
				$("#VIEWHABILIDADEREQUERIDA___"+seq).val(" - ")
				
			}
			
			removeSelecaoAtividade()
			
		} else {
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'A atividade selecionada já foi utilizada!',
				  text: 'Verifique e tente novamente'
			})
			
		}
				
	}
	
	// VERIFICA O TYPE DA FUNÇÃO ZOOM
	if(selectedItem.type == "posto") {
		
		console.log("entrei na seleção do posto")
		
		var seq = buscaSeqZoomPosto()
		
		$("#VIEWPOSTO___"+seq).val(""+selectedItem.CODPOSTO+" - "+selectedItem.DSCPOSTO)
		$("#VIEWCODPOSTO___"+seq).val(selectedItem.CODPOSTO)
		$("#VIEWDESCPOSTO___"+seq).val(selectedItem.DSCPOSTO)
		console.log("Cod Posto: "+selectedItem.CODPOSTO+", Descrição posto: "+selectedItem.DSCPOSTO)
		
		removeSelecaoPosto()
		
	}
	
	// VERIFICA O TYPE DA FUNÇÃO ZOOM
	if(selectedItem.type == "componentes") {
		
		console.log("entrei na seleção dos componentes")
		
		var seq = buscaSelecionadoZoom()
		
		// VARIÁVEL PARA ÍNDICE DO ITEM DA TABELA
		//var seq = selectedItem.obj
		
		console.log("seq: "+seq)
		
		$("#VIEWPRODUTOCOMPONENTES___" + seq).val(selectedItem.PRODUTO)
		$("#PRODUTOCOMPONENTES___" + seq).prop("readonly",true)
		$("#VIEWIDPRDCOMPONENTES___" + seq).val(selectedItem.IDPRD)
		$("#VIEWCODIGOPRDCOMPONENTES___" + seq).val(selectedItem.CODIGOPRD)
		$("#VIEWCODUNDCOMPONENTES___" + seq).val(selectedItem.CODUNDCONTROLE)
	
		$("#VIEWPRODUTOCOMPONENTES___" + seq).removeClass("selecionadoZoom")
		
		var substitutos = salvaArraySubstitutos()
		
		apagaSubstitutos()
		carregaSubstitutos()
		
		// PREENCHE OS SUBSTITUTOS JÁ SALVOS
		preencheSubstitutos(substitutos)
		
	}
		
}

// SE ITEM É REMOVIDO DO CAMPO ZOOM
function removedZoomItem(removedItem){
	
	var input = removedItem.inputId;
	
	// SE A OS É REMOVIDA
	if(removedItem.inputId.indexOf("OS_INFO")!="-1"){
		
		// LIMPA OS CAMPOS NECESSÁRIOS DE ACORDO COM A REMOÇÃO
		$("#NUM_OS").val("")
		$("#CODCOLIGADA").val("")
		$("#CODFILIAL").val("")
		
		// DESABILITA CAMPO ZOOM DA OP
		$("#OP_INFO").prop("disabled",true)
		$("#OP_INFO>option").remove()
		$("#CODORDEM").val("")
		
		// LIMPA OS CAMPOS REFERENTES AO APONTAMENTO
		$("#QTDEPREVISTA").val("")
		$("#QTDEAPONTADA").val("")
		$("#SALDO").val("")
		
		// APAGA A TABELA DA VIEW DE COMPONENTES
		apagaViewComponentes()
			
	}
	
	// SE A OP É REMOVIDA
	if(removedItem.inputId.indexOf("OP_INFO")!="-1"){
		
		// LIMPA OS CAMPOS NECESSÁRIOS DE ACORDO COM A REMOÇÃO
		$("#CODORDEM").val("")
		
		// LIMPA OS CAMPOS REFERENTES AO APONTAMENTO
		$("#QTDEPREVISTA").val("")
		$("#QTDEAPONTADA").val("")
		$("#SALDO").val("")
		
		// APAGA A TABELA DA VIEW DE COMPONENTES
		apagaViewComponentes()
		
	}
	
	// SE O CAUSADOR É REMOVIDO
	if(removedItem.inputId.indexOf("CAUSADOR___")!="-1"){
		
		var seq = removedItem.inputId.split("___")[1]
		
		// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
		$("#CODCLIENTECAUSADOR___"+seq).val("")
		$("#DESCCAUSADOR___"+seq).val("")
		
	}
	
	// SE A CAUSA É REMOVIDO
	if(removedItem.inputId.indexOf("CAUSA___")!="-1"){
		
		var seq = removedItem.inputId.split("___")[1]
		
		// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
		$("#CODCLIENTECAUSA___"+seq).val("")
		$("#DESCCAUSA___"+seq).val("")
		
	}
	
	// SE RNCRR É REMOVIDO
	if(removedItem.inputId.indexOf("RNCRR___")!="-1"){
		
		var seq = removedItem.inputId.split("___")[1]
		
		// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
		$("#CODCLIENTERNCRR___"+seq).val("")
		$("#DESCRNCRR___"+seq).val("")
		
	}
	
}

// SETAR UM VALOR NO ZOOM
function setZoomData(instance, value){ 
	
	window[instance].setValue(value); 
	
}