// CRIA UM ZOOM EXTERNO BASEADO EM UM DATASET
function zoomDataSet(titulo, dataset, campos, resultFields, filterValues, type) {
	
	console.log("entrei na zoomDataSet")
	
	// 600, 350
	window.open("/webdesk/zoom.jsp?datasetId="+dataset+"&dataFields="+campos+"&resultFields="+resultFields+"&filterValues="+filterValues+"&type="+type+"&title="+titulo, "zoom" , "status , scrollbars=no ,left=200,width=800, height=600");
	
	console.log("finalizei a zoomDataSet")
	
}

// FUNÇÃO PARA CONSTRUIR O ZOOM POSTO
function zoomPosto(posto){
	
	console.log("entrei no zoomPosto")
	
	var seqAtual = $("#SEQATUAL").val()
	
	var codColigada = $("#CODCOLIGADA___"+seqAtual).val()
	var codFilial = $("#CODFILIAL___"+seqAtual).val()
	
	console.log("codColigada: "+codColigada+", codFilial: "+codFilial)

	// PASSAGEM DE PARÂMETROS PARA FUNÇÃO ZOOM DATASET: Titulo, dataset, campos, type
	//zoomDataSet('Posto', 'dsPosto', 'CODPOSTO,Cód. Posto,DSCPOSTO,Descrição','CODPOSTO,DSCPOSTO', "CODPRJ,"+numOS+"", posto);
	
	zoomDataSet('Posto', 'dsPostosUsinagem', 'POSTO,Cód. Posto - Descrição','POSTO,CODPOSTO,DSCPOSTO', "CODCOLIGADA,"+codColigada+",CODFILIAL,"+codFilial+"", posto);
	
	console.log("finalizei o zoomPosto")
	
}


// SE ITEM É SELECIONADO NO CAMPO ZOOM
function setSelectedZoomItem(selectedItem) {        
	
	var input = selectedItem.inputId;
	
	console.log("entrei no setSelectedZoomItem")
	
	// SE NÃO É UM ZOOM EXTERNO
	if(!(selectedItem.inputId==undefined)){
		
		// SE A CÉLULA É SELECIONADA
		if(selectedItem.inputId.indexOf("CELULA")!="-1"){
			
			// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
			$("#CODCELULA").val(selectedItem['CODCLIENTE'])
			
			// RELOAD ZOOM FILTER VALUES NAS OP'S DO PROJETO
			reloadZoomFilterValues("ORDEMPRODUCAO","CELULA,"+selectedItem['CODCLIENTE'])
					
		}
		
		// SE A FILIAL É SELECIONADA
		if(selectedItem.inputId.indexOf("FILIAL")!="-1"){
			
			// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
			$("#CODFILIAL_FILTRO").val(selectedItem['CODFILIAL'])
			
			// RELOAD ZOOM NO CAMPO DOS RECURSOS
			//reloadZoomFilterValues("GRUPORECURSON3","CODFILIAL,"+selectedItem['CODFILIAL'])
					
		}

		// SE O DESENHO É SELECIONADA
		if(selectedItem.inputId.indexOf("DESENHO")!="-1"){
	
			// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
			$("#NUMDESENHO").val(selectedItem["NUMDESENHO"])
			
			console.log("NUMDESENHO: "+selectedItem['NUMDESENHO'])
		
			// RELOAD ZOOM FILTER VALUES NAS OP'S DO PROJETO
			reloadZoomFilterValues("ORDEMPRODUCAO","CODCCUSTO,"+selectedItem['OS']+",CELULA,"+$("#CODCELULA").val()+",DESENHO,"+selectedItem["NUMDESENHO"])
			
		}
		
		// SE A OP É SELECIONADA
		if(selectedItem.inputId.indexOf("PROJETO")!="-1"){
			
			// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
			$("#CODPRJ").val(selectedItem['CODPRJ'])
			$("#DESCRICAOIDPRJ").val(selectedItem['DESCRICAO'])
			$("#IDPRJ").val(selectedItem['IDPRJ'])
			
			console.log("NUM OS: "+selectedItem['CODPRJ']+", DESCRIÇÃO: "+selectedItem["DESCRICAO"]+", IDPRJ: "+selectedItem["IDPRJ"])
		
			// RELOAD ZOOM FILTER VALUES NAS OP'S DO PROJETO
			reloadZoomFilterValues("ORDEMPRODUCAO","CODCCUSTO,"+selectedItem['CODPRJ']+",CELULA,"+$("#CODCELULA").val())
			
			// RELOAD ZOOM FILTER VALUES NOS COMPONENTES DO PROJETO
			reloadZoomFilterValues("COMPONENTE","CODCCUSTO,"+selectedItem['CODPRJ'])

			// RELOAD ZOOM FILTER VALUES NOS DESENHOS DO PROJETO
			reloadZoomFilterValues("DESENHO","OS,"+selectedItem['CODPRJ'])
			
		}
		
		// SE A ORDEM DE PRODUÇÃO É SELECIONADA
		if(selectedItem.inputId.indexOf("ORDEMPRODUCAO")!="-1"){
			
			// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
			$("#CODORDEM").val(selectedItem['CODORDEM'])
			$("#INDICE_PRD").val(selectedItem['INDICE_FLUIG'])
			$("#NIVEL_PRD").val(selectedItem['NIVEL_FLUIG'])
			$("#NIVELESTR_DE").val("")
			$("#NIVELESTR_ATE").val("")
			
			// HABILITA CAMPOS
			$("#INFERIOROP").prop("disabled",false)
			$("#NIVELESTR_DE").prop("readonly",true)
			$("#NIVELESTR_ATE").prop("readonly",true)
			
			$("#COMPONENTE>option").remove()
			$("#IDPRD").val("")
			$("#CODIGOPRD").val("")
			
			console.log("vou dar um reload zoom nas atividades com a ordem "+selectedItem["CODORDEM"])
			
			// RELOAD ZOOM FILTER VALUES NAS ATIVIDADES DA OP
			//reloadZoomFilterValues("ATIVIDADEOS","CODORDEM,"+selectedItem["CODORDEM"])
			
		}
		
		// SE O STATUS DA OP É SELECIONADA
		if(selectedItem.inputId.indexOf("STATUSOP")!="-1"){
			
			// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
			$("#CODSTATUSOP").val(selectedItem['CODSTATUS'])
					
		}
		
		// SE O PLANO DE CORTE FOR SELECIONADO
		if(selectedItem.inputId.indexOf("PLANOCORTE")!="-1"){
			
			// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
			$("#NUMPLANOCORTEREAL").val(selectedItem['NUMPLANOCORTE'])
					
		}
		
		// SE O GRUPO DE RECURSO N2 É SELECIONADO
		if(selectedItem.inputId.indexOf("GRUPORECURSON2")!="-1"){
			
			// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
			$("#CODPOSTO").val(selectedItem['CODPOSTO'])
			$("#DSCPOSTO").val(selectedItem['DSCPOSTO'])
			$("#CODRECURSON2").val(selectedItem['CODPOSTO'])
			$("#RECURSON2").val(selectedItem['DSCPOSTO'])
					
		}
		
		// SE O GRUPO DE RECURSO N3 É SELECIONADO PESSOA
		if(selectedItem.inputId.indexOf("ALOCRECURSON3RESUMOPES")!="-1"){
			
			// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
			$("#CODRECURSON3RESUMOPES").val(selectedItem['CODMO'])
			$("#RECURSON3RESUMOPES").val(selectedItem['NOME'])
					
		}
		
		// SE O GRUPO DE RECURSO N3 É SELECIONADO EQUIPAMENTO
		if(selectedItem.inputId.indexOf("ALOCRECURSON3RESUMOEQ")!="-1"){
			
			// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
			$("#CODRECURSON3RESUMOEQ").val(selectedItem['CODEQUIPAMENTO'])
			$("#RECURSON3RESUMOEQ").val(selectedItem['DSCEQUIPAMENTO'])
					
		}
		
		// SE O COMPONENTE É SELECIONADO
		if(selectedItem.inputId.indexOf("COMPONENTE")!="-1"){
			
			var idprd = $("#IDPRD").val()
			var codigoprd = $("#CODIGOPRD").val()
			
			if(idprd==""){
				
				$("#IDPRD").val(selectedItem['IDPRD'])
				
			} else {
				
				$("#IDPRD").val(idprd+","+selectedItem['IDPRD'])

			}
			
			if(codigoprd==""){
				
				$("#CODIGOPRD").val(selectedItem['CODIGOPRD'])

			} else {
				
				$("#CODIGOPRD").val(codigoprd+","+selectedItem['CODIGOPRD'])

			}
			
			// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
			
			
			$("#ORDEMPRODUCAO>option").remove()
			$("#CODORDEM").val("")
			$("#INDICE_PRD").val("")
			$("#NIVEL_PRD").val("")
					
		}
		
		// SE O POSTO É SELECIONADO
		if(selectedItem.inputId=="POSTO_ALTERAR"){
			
			// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
			$("#CODPOSTO_ALTERAR").val(selectedItem['CODPOSTO'])
			$("#DESCPOSTO_ALTERAR").val(selectedItem['DSCPOSTO'])
					
		}
		
		// SE O MOTIVO DA DESPROGRAMAÇÃO É SELECIONADO
		if(selectedItem.inputId=="MOTDESPROG"){
			
			// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
			$("#CODINTERNO").val(selectedItem['CODINTERNO'])
					
		}
		
		// SE O RECURSON3 É SELECIONADO
		if(selectedItem.inputId.indexOf("GRUPORECURSON3")!="-1"){
			
			// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
			
			var codRecurso = $("#CODRECURSON3").val()
			
			// SE É O PRIMEIRO RECURSO SELECIONADO
			if(codRecurso=="" || codRecurso==null || codRecurso==undefined){
				
				codRecurso = selectedItem['CODMO']+";"
				
			} else {
				// SE NÃO
				
				codRecurso = codRecurso+selectedItem['CODMO']+";"
				
			}
			
			$("#CODRECURSON3").val(codRecurso)
			
			if(selectedItem["FUNCIONARIO"]==0){
				
				$("#RECPJ").val("0")
				
			}
			
			var codChapa = $("#CODCHAPARECURSON3").val()
			
			// SE É A PRIMEIRA CHAPA SELECIONADA
			if(codChapa=="" || codChapa==null || codChapa==undefined){
				
				codChapa = selectedItem['CODIGO']+";"
				
			} else {
				// SE NÃO
				
				codChapa = codChapa+selectedItem['CODIGO']+";"
				
			}
			
			// SALVA AS CHAPAS SELECIONADAS
			$("#CODCHAPARECURSON3").val(codChapa)
			
			//$("#RECURSON3").val(selectedItem['PESSOA'])
			
			// LIMPA A TABELA RAD
			//limpaRAD()
					
			// CARREGA TABELA RAD
			//carregaRAD(codRecurso)
			
			carregaRADChapa(selectedItem['CODMO'])
			console.log("vou atualizar o alocado das datas")
			atualizaSaldosAlocado(selectedItem['CODMO'])
			
			// PERCORRE A TABELA RAD E EXIBE APENAS A CHAPA INFORMADA
			//exibeChapaRAD(codRecurso)
			
			$(".select2-container--below").attr("onclick","alteraMsg()")
			
		}
		
	}
	
	//FUNÇÃO HABILITA CAMPO DE OPERADOR SE O CAMPO FILIAL FOR PREENCHIDO - ADRIELLY
	if(selectedItem.inputId == "filialprog"){

		$("#filial_cod").val(selectedItem['CODFILIAL'])
		$("#registro").prop("disabled",false)
	}
	
	//SE O OPERADOR É SELECIONADO
	if(selectedItem.inputId == "registro"){

		$("#CODregistro").val(selectedItem['CODMO'])

	}

	//SE UMA HABILIDADE É SELECIONADA - ADRIELLY
	if(selectedItem.inputId.split("___")[0]=="novaTABELA"){

		var seq = selectedItem.inputId.split("___")[1]
		console.log(seq)
		var a = verificaHabilidade(selectedItem['CODHABILIDADE'])
		console.log(a)

		if(a==0){

			console.log("remove")
			$("#novaTABELA___"+String(seq)+">option").remove()

			// EXIBE ALERTA
			Swal.fire({

				icon: 'error',
				title: 'Habilidade já selecionada'

			})

		}else{

			$("#CODHAB___"+seq).val(selectedItem['CODHABILIDADE'])

		}

	}


	// VERIFICA O TYPE DA FUNÇÃO ZOOM
	if(selectedItem.type == "posto") {
		
		$("#VIEWPOSTO").val(selectedItem.POSTO)
		$("#CODPOSTO_ALTERAR").val(selectedItem.CODPOSTO)
		$("#DESCPOSTO_ALTERAR").val(selectedItem.DSCPOSTO)
	
	}
	
}


function removedZoomItem(removedItem){
	var input = removedItem.inputId;

	// SE A CÉLULA É REMOVIDA
	if(removedItem.inputId.indexOf("CELULA")!="-1"){
		
		// LIMPA OS CAMPOS NECESSÁRIOS DE ACORDO COM A REMOÇÃO
		$("#CODCELULA").val("")
		
		// RELOAD ZOOM FILTER VALUES NAS OP'S DO PROJETO
		reloadZoomFilterValues("ORDEMPRODUCAO","")
				
	}
	
	// SE A habilidade É REMOVIDA
	if(removedItem.inputId.split("___")[0]=="novaTABELA"){

		var seq = removedItem.inputId.split("___")[1]
		
		// LIMPA O VALOR DO CAMPO DE ACORDO COM A REMOÇÃO
		$("#CODHAB___"+seq).val("")
				
	}

	// FUNÇÃO DESABILITADA TABELA QUANDO O CAMPO OPERADOR É RETIRADO - ADRIELLY
	if(removedItem.inputId == "registro"){

		$("#novaTABELA").val("")
		$("#ADICIONAHAB>option").remove()
		$("#CODregistro").val("")

		limparTabelaHab()
		
	}


	// FUNÇÃO DESABILITADA OPERADOR QUANDO O CAMPO FILIAL É RETIRADO - ADRIELLY
	if(removedItem.inputId == "filialprog"){
		
		// LIMPA OS CAMPOS NECESSÁRIOS DE ACORDO COM A REMOÇÃO
		$("#registro").prop("disabled",true)
		$("#filial_cod").val("")
		$("#registro>option").remove()

		limparTabelaHab()
				
	}

	
	// SE A OS É REMOVIDA
	if(removedItem.inputId.indexOf("PROJETO")!="-1"){
		
		// LIMPA OS CAMPOS NECESSÁRIOS DE ACORDO COM A REMOÇÃO
		$("#CODPRJ").val("")
		$("#DESCRICAOIDPRJ").val("")
		$("#IDPRJ").val("")
				
		// RELOAD ZOOM FILTER VALUES NAS OP'S DO PROJETO
		reloadZoomFilterValues("ORDEMPRODUCAO","DESENHO,"+$("#NUMDESENHO").val())
		
		// RELOAD ZOOM FILTER VALUES NOS COMPONENTES DO PROJETO
		reloadZoomFilterValues("COMPONENTE","")

		reloadZoomFilterValues("DESENHO","")
		
	}

	// SE O DESENHO É SELECIONADA
	if(removedItem.inputId.indexOf("DESENHO")!="-1"){

		// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
		$("#NUMDESENHO").val("")
		
		/// RELOAD ZOOM FILTER VALUES NAS OP'S DO PROJETO
		reloadZoomFilterValues("ORDEMPRODUCAO","CODCCUSTO,"+$("#CODPRJ").val()+",CELULA,"+$("#CODCELULA").val())

	}
	
	// SE A ORDEM DE PRODUÇÃO É REMOVIDA
	if(removedItem.inputId.indexOf("ORDEMPRODUCAO")!="-1"){
		
		// LIMPA OS CAMPOS NECESSÁRIOS DE ACORDO COM A REMOÇÃO		
		$("#CODORDEM").val("")
		$("#INDICE_PRD").val("")
		$("#NIVEL_PRD").val("")
		$("#INFERIOROP").val("")
		
		// DESABILITA CAMPOS
		//$("#INFERIOROP").prop("disabled",true)
		
		var inferior = $("#INFERIOROP").val()
		
		// SE INFERIOR NÃO FOI INFORMADO
		/*if(inferior=="" || inferior==null || inferior==undefined){
			
			$("#ORDEMPRODUCAO").prop("disabled",true)
			$("#NIVELESTR_DE").prop("readonly",false)
			$("#NIVELESTR_ATE").prop("readonly",false)
			
		}*/ 
		
		// RELOAD ZOOM FILTER VALUES NAS ATIVIDADES DA OP
		reloadZoomFilterValues("ATIVIDADEOS","CODORDEM,0")
		
	}
	
	// SE O STATUS DA OP É REMOVIDO
	if(removedItem.inputId.indexOf("STATUSOP")!="-1"){
		
		// LIMPA OS CAMPOS NECESSÁRIOS DE ACORDO COM A REMOÇÃO
		$("#CODSTATUSOP").val("")
				
	}
	
	// SE O GRUPO DE RECURSO N2 É REMOVIDO
	if(removedItem.inputId.indexOf("GRUPORECURSON2")!="-1"){
		
		// LIMPA OS CAMPOS NECESSÁRIOS DE ACORDO COM A REMOÇÃO
		$("#CODPOSTO").val("")
		$("#DSCPOSTO").val("")
		$("#CODRECURSON2").val("")
		$("#RECURSON2").val("")
				
	}
	
	// SE O PLANO DE CORTE É REMOVIDO
	if(removedItem.inputId.indexOf("PLANOCORTE")!="-1"){
		
		// LIMPA OS CAMPOS NECESSÁRIOS DE ACORDO COM A REMOÇÃO
		$("#NUMPLANOCORTEREAL").val("")
				
	}
	
	// SE O MOTIVO DA DESPROGRAMAÇÃO É REMOVIDO
	if(removedItem.inputId=="MOTDESPROG"){
		
		// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
		$("#CODINTERNO").val("")
				
	}
	
	// SE O GRUPO DE RECURSO N3 É REMOVIDO PARA PESSOA
	if(removedItem.inputId.indexOf("ALOCRECURSON3RESUMOPES")!="-1"){
		
		// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
		$("#CODRECURSON3RESUMOPES").val("")
		$("#RECURSON3RESUMOPES").val("")
				
	}
	
	// SE O GRUPO DE RECURSO N3 É REMOVIDO PARA PESSOA
	if(removedItem.inputId.indexOf("ALOCRECURSON3RESUMOEQ")!="-1"){
		
		// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
		$("#CODRECURSON3RESUMOEQ").val("")
		$("#RECURSON3RESUMOEQ").val("")
				
	}
	
	// SE O COMPONENTE É REMOVIDO
	if(removedItem.inputId.indexOf("COMPONENTE")!="-1"){
		
		var idprd = $("#IDPRD").val()
		idprd = idprd.split(",")
		var codigoprd = $("#CODIGOPRD").val()
		codigoprd = codigoprd.split(",")
		
		console.log("idprd: ")
		console.log(idprd)
		
		console.log("codigoprd: ")
		console.log(codigoprd)
		
		for(var i=0; i<idprd.length; i++){
			
			if(idprd[i]==removedItem['IDPRD']){
			
				console.log("vou remover o idprd: "+idprd[i])
				
				idprd.splice(idprd.indexOf(idprd[i]),1)
				
			}
			
		}
		
		for(var i=0; i<codigoprd.length; i++){
			
			if(codigoprd[i]==removedItem['CODIGOPRD']){
			
				console.log("vou remover o codigoprd: "+codigoprd[i])
				
				codigoprd.splice(codigoprd.indexOf(codigoprd[i]),1)
				
			}
			
		}
		
		idprd = idprd.toString()
		codigoprd = codigoprd.toString()

		console.log("idprd: "+idprd)
		console.log("codigoprd: "+codigoprd)

		// LIMPA OS CAMPOS NECESSÁRIOS DE ACORDO COM A REMOÇÃO
		$("#IDPRD").val(idprd)
		$("#CODIGOPRD").val(codigoprd)
				
	}
	
	// SE O POSTO É REMOVIDO
	if(removedItem.inputId=="POSTO_ALTERAR"){
		
		// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
		$("#CODPOSTO_ALTERAR").val("")
		$("#DESCPOSTO_ALTERAR").val("")
				
	}
	
	// SE O RECURSON3 É REMOVIDO
	if(removedItem.inputId.indexOf("GRUPORECURSON3")!="-1"){
		
		// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
		var codRecurso = $("#CODRECURSON3").val()
		$("#RECPJ").val("")
		codRecurso = codRecurso.replace(removedItem['CODMO']+";","")
		$("#CODRECURSON3").val(codRecurso)
		
		console.log("codRecurso: "+codRecurso)
		
		var codChapa = $("#CODCHAPARECURSON3").val()
		codChapa = codChapa.replace(removedItem['CODIGO']+";","")
		$("#CODCHAPARECURSON3").val(codChapa)
		//$("#RECURSON3").val(selectedItem['PESSOA'])

		console.log("codChapa: "+codChapa)
		
		// LIMPA A TABELA RAD
		limpaRAD()
				
		// CARREGA TABELA RAD
		carregaRAD(codRecurso)
		
	}

	if(removedItem.inputId.split("___")[0]=="novaTABELA"){

		$("#CODHAB___"+selectedItem.inputId.split("___")[1]).val("")

	}
	
}

// SETAR UM VALOR NO ZOOM
function setZoomData(instance, value){ 
	
	window[instance].setValue(value); 
	
}