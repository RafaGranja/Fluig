// CRIA UM ZOOM EXTERNO BASEADO EM UM DATASET
function zoomDataSet(titulo, dataset, campos, resultFields, filterValues, type) {
	
	console.log("entrei na zoomDataSet")
	// 600, 350
	window.open("/webdesk/zoom.jsp?datasetId="+dataset+"&dataFields="+campos+"&resultFields="+resultFields+"&filterValues="+filterValues+"&type="+type+"&title="+titulo, "zoom" , "status , scrollbars=no ,width=800, height=400");
	
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
function zoomTarefaPai(componente) {
	
	console.log("entrei na zoomTarefaPai")
	
	var idprj = $("#IDPRJ_OS").val()
	
	// PASSAGEM DE PARÂMETROS PARA FUNÇÃO ZOOM DATASET: Titulo, dataset, campos, type
	zoomDataSet('Tarefa', 'dsCodTarefaPai', 'TAREFA,Tarefa','IDTRF,CODTRF,NOME','IDPRJ,'+idprj+'',componente);
	
	console.log("finalizei a zoomTarefaPai")
}

// FUNÇÃO PARA CONSTRUIR O ZOOM EXTERNO
function zoomMaterial(componente) {
	
	console.log("entrei na zoomMaterial")
	
	// PASSAGEM DE PARÂMETROS PARA FUNÇÃO ZOOM DATASET: Titulo, dataset, campos, type
	zoomDataSet('Produto', 'dsProdutoRM', 'PRODUTO,Produto,SALDO,Saldo','PRODUTO,IDPRD,CODIGOPRD' ,'',componente);
	
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

// SE ITEM É REMOVIDO DO CAMPO ZOOM
function setSelectedZoomItem(selectedItem) {        
	
	var input = selectedItem.inputId;
	//CRM.validaCampo($('#' + input));
	
	console.log("entrei no setSelectedZoomItem")
	
	if(!(selectedItem.inputId==undefined)){
		
		// SE A OS É SELECIONADA
		if(selectedItem.inputId.indexOf("OS_INFO")!="-1"){
			
			// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
			$("#NUM_OS").val(selectedItem['OS'])
			$("#DESCRICAO_OS_INFO").val(selectedItem['DESCOS'].toString().replace(/[',"]/g," "))
			$("#IDPRJ_OS").val(selectedItem['IDPRJOS'])
			$("#CODCOLIGADA").val(selectedItem['CODCOLIGADA'])
			$("#CODFILIAL").val(selectedItem['CODFILIAL'])

			// ESCONDE O BOTÃO VOLTAR
			//$(".VOLTAR_OS").hide()
			
			// FAZ UM RELOAD ZOOM NO CAMPO EXECUÇÃO
			//reloadZoomFilterValues("EXECUCOES_OS", "OS,"+selectedItem["OS"]);
			//reloadZoomFilterValues("EXECUCOES_OS", "OS,"+selectedItem["OS"]+",CODCOLIGADA,"+selectedItem["CODCOLIGADA"]+",CODFILIAL,"+selectedItem["CODFILIAL"]);
			reloadZoomFilterValues("CODTRFPAI","OS,"+$("#NUM_OS").val())
			
			// HABILITA O CÓDIGO DA TAREFA
			$("#CODTRFPAI").prop("disabled",false)
			
			//buscaEstruturaOS()
			
		}
		
		// SE A EXECUÇÃO É SELECIONADA
		if(selectedItem.inputId.indexOf("EXECUCOES_OS")!="-1"){
			
			// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
			//$("#EXECUCAO_INFO").val(selectedItem['EXECUCAO'])
			$("#EXECUCAO_INFO").val(selectedItem['NUMEXEC'])
	
			// RELOAD ZOOM FILTER VALUES NOS COMPONENTES DO PROJETO
			//reloadZoomFilterValues("CODTRFPAI","OS,"+$("#NUM_OS").val()+",EXECUCAO,"+selectedItem['EXECUCAO'])
			//reloadZoomFilterValues("CODTRFPAI","OS,"+$("#NUM_OS").val()+",EXECUCAO,"+selectedItem['NUMEXEC'])
			//reloadZoomFilterValues("EXECUCOES_OS", "OS,"+selectedItem["OS"]+",CODCOLIGADA,"+selectedItem["CODCOLIGADA"]+",CODFILIAL,"+selectedItem["CODFILIAL"]);
			
			var solicitacao = verificaOS()
			
			// SE OS JÁ ESTÁ SENDO EDITADA EM OUTRA SOLICITAÇÃO
			if(!(solicitacao=="" || solicitacao==null || solicitacao==undefined)){
				
				// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
				$("#NUM_OS").val("")
				$("#DESCRICAO_OS_INFO").val("")
				$("#IDPRJ_OS").val("")
				$("#CODCOLIGADA").val("")
				$("#CODFILIAL").val("")
				$("#EXECUCAO_INFO").val("")
				$("#CODTRFEX").val("")
				$("#INDICEPAI").val("")
				
				// LIMPA A SELEÇÃO DO CAMPO ZOOM
				$("#OS_INFO>option").remove();
				$("#EXECUCOES_OS>option").remove();
				$("#CODTRFPAI>option").remove();
				
				// DESABILITA O CÓDIGO DA TAREFA
				$("#CODTRFPAI").prop("disabled",true)
				
				// EXIBE ALERTA
				Swal.fire({
					  icon: 'error',
					  title: 'A OS selecionada já está sendo editada!', 
					  footer: '<span class="solicitacoes">Solicitação: &nbsp;<a href="'+parent.window.WCMAPI.serverURL+'/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID='+solicitacao+'" target="_blank">'+solicitacao+' </a></span> ',
				})
			
			}
			
		}
		
		// SE A OS É SELECIONADA
		if(selectedItem.inputId.indexOf("INFOCOPIA")!="-1"){
			
			// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
			$("#OSCOPIA").val(selectedItem['CODPRJ'])
			$("#DESCRICAO_OS_COPIA").val(selectedItem['DESCRICAO'].toString().replace(/[',"]/g," "))
			$("#IDPRJ_OS_COPIA").val(selectedItem['IDPRJ'])
	
		}
		
		// SE O CODTRFPAI É SELECIONADO
		if(selectedItem.inputId.indexOf("CODTRFPAI")!="-1"){
			
			// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
			$("#CODTRFEX").val(selectedItem['CODTRFPAI'])
			$("#INDICEPAI").val(selectedItem['INDICE'])
			
			reloadZoomFilterValues("EXECUCOES_OS", "OS,"+$("#NUM_OS").val()+",CODCOLIGADA,"+$("#CODCOLIGADA").val()+",CODFILIAL,"+$("#CODFILIAL").val()+",CODTRFPAI,"+selectedItem["CODTRFPAI"]);
			
			// HABILITA O CÓDIGO DA TAREFA
			$("#EXECUCOES_OS").prop("disabled",false)
	
		}
		
		// SE A OS É SELECIONADA
		if(selectedItem.inputId.indexOf("INFOCOPIA")!="-1"){
			
			// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
			$("#OSCOPIA").val(selectedItem['CODPRJ'])
			$("#DESCRICAO_OS_COPIA").val(selectedItem['DESCRICAO'].toString().replace(/[',"]/g," "))
			$("#IDPRJ_OS_COPIA").val(selectedItem['IDPRJ'])
	
		}
		
		// SE O CODTAREFA É SELECIONADO
		if(selectedItem.inputId.indexOf("CODIGOTAREFA")!="-1"){
			
			// PREENCHE OS CAMPOS FUNÇÃO E SEÇÃO AUTOMATICAMENTE A PARTIR DA FUNÇÃO SELECIONADA
			$("#CODTRF").val(selectedItem['CODTRF'])
			$("#IDTRF").val(selectedItem['IDTRF'])
			$("#NOMETRF").val(selectedItem['NOME'].toString().replace(/[',"]/g," "))
			
		}
		
		// SE O CODTAREFA É SELECIONADO
		if(selectedItem.inputId.indexOf("F_INDICE_REF")!="-1"){
			
			// PREENCHE OS CAMPOS FUNÇÃO E SEÇÃO AUTOMATICAMENTE A PARTIR DA FUNÇÃO SELECIONADA
			$("#INDICE_REF").val(selectedItem['INDICE'])
			
		}
		
		// SE AS EXECUÇÕES FOREM SELECIONADAS
		if(selectedItem.inputId=="EXECUCOES_INTEGRACAO"){
			
			/*var tags = $("#TAGS_INT").val()
			
			// SE TEM TAGS SALVAS
			if(tags=="" || tags==null || tags==undefined){
				
				tags = selectedItem["TAG"]+";"
				
			} else {
				// SE NÃO
				
				tags = tags + "" +selectedItem["TAG"]+";"
				
			}
			
			// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
			$("#TAGS_INT").val(tags)*/
	
		}
		
		// SE O CODTAREFA É SELECIONADO
		/*if(selectedItem.inputId.indexOf("F_CODIGOTAREFA")!="-1"){
			
			// PREENCHE OS CAMPOS FUNÇÃO E SEÇÃO AUTOMATICAMENTE A PARTIR DA FUNÇÃO SELECIONADA
			$("#F_CODTRF").val(selectedItem['CODTRF'])
			$("#F_IDTRF").val(selectedItem['IDTRF'])
			$("#F_NOMETRF").val(selectedItem['NOME'])
			
		}*/
		
		// SE O SOLICITANTE É SELECIONADO
		if(selectedItem.inputId.indexOf("F_MATERIAL_ZOOM")!="-1"){
			
			// PREENCHE OS CAMPOS FUNÇÃO E SEÇÃO AUTOMATICAMENTE A PARTIR DA FUNÇÃO SELECIONADA
			$("#F_IDMATERIAL").val(selectedItem['IDPRD'])
			$("#F_CODIGOPRD").val(selectedItem['CODIGOPRD'])
			
		}

		
		// SE O ITEM DE RETORNO É SELECIONADO
		if(selectedItem.inputId.indexOf("ITEM_DE_RETORNO")!="-1"){
			
			// PREENCHE OS CAMPOS FUNÇÃO E SEÇÃO AUTOMATICAMENTE A PARTIR DA FUNÇÃO SELECIONADA
			$("#F_ITEMRETORNO").val(selectedItem['IDCRIACAO'])
			
		}
		
	}
	
	// VERIFICA O TYPE DA FUNÇÃO ZOOM
	if(selectedItem.type == "material") {
		
		$("#F_PRODUTO_RM").val(selectedItem.PRODUTO.toString().replace(/[',"]/g," "))
		//$("#F_PRODUTO_RM").prop("readonly",true)
		console.log("PRODUTO: "+selectedItem.PRODUTO+", IDPRD: "+selectedItem.IDPRD+", CODIGOPRD: "+selectedItem.CODIGOPRD)
		$("#F_IDPRD").val(selectedItem.IDPRD)
		$("#F_CODIGOPRD").val(selectedItem.CODIGOPRD)
	
	}
	
	// VERIFICA O TYPE DA FUNÇÃO ZOOM
	if(selectedItem.type == "tarefaPai") {
		
		$("#F_CODIGOTRFPAI").val(selectedItem.CODTRF+" - "+selectedItem.NOME.toString().replace(/[',"]/g," "))
		//$("#F_PRODUTO_RM").prop("readonly",true)
		console.log("TAREFA: "+selectedItem.TAREFA+", IDTRF: "+selectedItem.IDTRF+", CODTRF: "+selectedItem.CODTRF+", NOMETRF: "+selectedItem.NOME)
		$("#F_CODTRFPAI").val(selectedItem.CODTRF)
		$("#F_IDTRFPAI").val(selectedItem.IDTRF)
		$("#F_NOMETRFPAI").val(selectedItem.NOME.toString().replace(/[',"]/g," "))
	
	}
	
	// VERIFICA O TYPE DA FUNÇÃO ZOOM
	if(selectedItem.type == "tarefa") {
		
		$("#F_CODIGOTAREFA").val(selectedItem.CODTRF+" - "+selectedItem.NOME.toString().replace(/[',"]/g," "))
		//$("#F_PRODUTO_RM").prop("readonly",true)
		console.log("TAREFA: "+selectedItem.TAREFA+", IDTRF: "+selectedItem.IDTRF+", CODTRF: "+selectedItem.CODTRF+", NOMETRF: "+selectedItem.NOME)
		$("#F_CODTRFITEM").val(selectedItem.CODTRF)
		$("#F_IDTRFITEM").val(selectedItem.IDTRF)
		$("#F_NOMETRFITEM").val(selectedItem.NOME.toString().replace(/[',"]/g," "))
	
	}
	
	// VERIFICA O TYPE DA FUNÇÃO ZOOM
	if(selectedItem.type == "atividade") {
		
		console.log("entrei na seleção da atividade")
		
		// SE A ATIVIDADE ESTÁ LIBERADA 
		if(verificaAtividade(selectedItem.CODATIVIDADE)){
			
			var seq = buscaSeqZoomAtividade()
			
			$("#VIEWATIVIDADE___"+seq).val(""+selectedItem.CODATIVIDADE+" - "+selectedItem.DSCATIVIDADE.toString().replace(/[',"]/g," "))
			$("#VIEWCODATIVIDADE___"+seq).val(selectedItem.CODATIVIDADE)
			$("#VIEWDESCATIVIDADE___"+seq).val(selectedItem.DSCATIVIDADE.toString().replace(/[',"]/g," "))
			
			console.log("codHabilidade: "+selectedItem.CODHABILIDADE)
			
			if(!(selectedItem.CODHABILIDADE==null || selectedItem.CODHABILIDADE=="" || selectedItem.CODHABILIDADE=="null")){
				
				$("#VIEWHABILIDADEREQUERIDA___"+seq).val(""+selectedItem.CODHABILIDADE+" - "+selectedItem.DESCRICAOHABIL.toString().replace(/[',"]/g," "))
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
		
		$("#VIEWPOSTO___"+seq).val(""+selectedItem.CODPOSTO+" - "+selectedItem.DSCPOSTO.toString().replace(/[',"]/g," "))
		$("#VIEWCODPOSTO___"+seq).val(selectedItem.CODPOSTO)
		$("#VIEWDESCPOSTO___"+seq).val(selectedItem.DSCPOSTO.toString().replace(/[',"]/g," "))
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
		
		var produto = selectedItem.PRODUTO.toString().replace(/[',"]/g," ")
		
		$("#VIEWPRODUTOCOMPONENTES___" + seq).val(produto)
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
	
	//formataCampos();
	
}

// SE ITEM É REMOVIDO DO CAMPO ZOOM
function removedZoomItem(removedItem)
{
	var input = removedItem.inputId;
	//CRM.validaCampo($('#' + input));
	
	// SE O SOLICITANTE É REMOVIDO
	if(removedItem.inputId.indexOf("F_MATERIAL_ZOOM")!="-1")
	{
	
		// LIMPA OS CAMPOS AUTOMATICAMENTE A PARTIR DO SOLICITANTE REMOVIDO
		$("#F_IDMATERIAL").val("")
		$("#F_CODIGOPRD").val("")
	}
	
	// SE A OS É REMOVIDA
	if(removedItem.inputId.indexOf("OS_INFO")!="-1")
	{
	
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
	
	// SE O CODTRFPAI É REMOVIDO
	if(removedItem.inputId.indexOf("CODTRFPAI")!="-1"){
		
		// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
		$("#CODTRFEX").val("")
		$("#INDICEPAI").val("")

		// DESABILITA O CAMPO DAS EXECUÇÕES
		$("#EXECUCOES_OS").prop("disabled",true)
		
		// LIMPA A SELEÇÃO DO CAMPO EXECUÇÕES
		$("#EXECUCOES_OS>option").remove()
		
	}
	
	// SE A EXECUÇÃO É SELECIONADA
	if(removedItem.inputId.indexOf("EXECUCOES_OS")!="-1"){
		
		// LIMPA OS CAMPOS AUTOMATICAMENTE
		$("#EXECUCAO_INFO").val("")
		
	}
	
	// SE A OS É REMOVIDA
	if(removedItem.inputId.indexOf("OS_INFOCOPIA")!="-1")
	{
	
		// LIMPA OS CAMPOS AUTOMATICAMENTE A PARTIR DA OS REMOVIDA
		$("#NUM_OSCOPIA").val("")
		$("#DESCRICAO_OS_COPIA").val("")
	}
	
	// SE O CODTAREFA É REMOVIDO
	if(removedItem.inputId.indexOf("CODIGOTAREFA")!="-1"){
		
		// LIMPA OS CAMPOS AUTOMATICAMENTE A PARTIR DA TAREFA REMOVIDA
		$("#CODTRF").val("")
		$("#IDTRF").val("")
		$("#NOMETRF").val("")
		
	}
	
	// SE O INDICE DE REFERÊNCIA É REMOVIDO
	if(removedItem.inputId.indexOf("F_INDICE_REF")!="-1"){
		
		// LIMPA OS CAMPOS AUTOMATICAMENTE A PARTIR DA TAREFA REMOVIDA
		$("#INDICE_REF").val("")
		
	}

	// SE O ITEM DE RETORNO É SELECIONADO
	if(removedItem.inputId.indexOf("ITEM_DE_RETORNO")!="-1"){

		// PREENCHE OS CAMPOS FUNÇÃO E SEÇÃO AUTOMATICAMENTE A PARTIR DA FUNÇÃO SELECIONADA
		$("#F_ITEMRETORNO").val("")
		
	}
	
	// SE AS EXECUÇÕES FOREM REMOVIDAS
	if(removedItem.inputId=="EXECUCOES_INTEGRACAO"){
		
		var tags = $("#TAGS_INT").val()
		
		console.log("item removido: "+removedItem["TAG"])
		
		// SE TEM TAGS SALVAS
		/*if(!(tags=="" || tags==null || tags==undefined)){
			
			// SE TAG 
			if(tags.includes(removedItem["TAG"])){
				
				console.log("a TAG está salva, vou remover")
				
				var remover = removedItem["TAG"]+";"
				
				tags = tags.replace(remover,"")
				
			}
			
		}
		
		// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
		$("#TAGS_INT").val(tags)*/

	}
	
	// SE O CODTAREFA É SELECIONADO
	/*if(removedItem.inputId.indexOf("F_CODIGOTAREFA")!="-1"){
		
		// PREENCHE OS CAMPOS FUNÇÃO E SEÇÃO AUTOMATICAMENTE A PARTIR DA FUNÇÃO SELECIONADA
		$("#F_CODTRF").val("")
		$("#F_IDTRF").val("")
		$("#F_NOMETRF").val("")
		
	}*/
	
	//formataCampos();
	
}

// SETAR UM VALOR NO ZOOM
function setZoomData(instance, value){ 
	
	window[instance].setValue(value); 
	
}