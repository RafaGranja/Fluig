// SE ITEM É REMOVIDO DO CAMPO ZOOM
function setSelectedZoomItem(selectedItem) {        
	
	var input = selectedItem.inputId;
	console.log(selectedItem)
	//CRM.validaCampo($('#' + input));
	
	console.log("entrei no setSelectedZoomItem")
	
	// SE A OS É SELECIONADA PARA CADASTRO
	if(selectedItem.inputId.indexOf("PROJETO")!="-1" && selectedItem.inputId.indexOf("PROJETOED")=="-1"){
		
		// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
		$("#CODPRJPLANCAD").val(selectedItem['CODPRJ'])
		$("#DESCRICAOPRJPLANCAD").val(selectedItem['DESCRICAO'])
		$("#IDPRJPLANCAD").val(selectedItem['IDPRJ'])
		$("#CODFILIAL").val(selectedItem['CODFILIAL'])
		
		// HABILITA OS CAMPOS
		$("#ATIVIDADEPLANCAD").prop("disabled",false)
		$("#MATERIALPLANCAD").prop("disabled",false)
		$("#DESENHOCAD").prop("disabled",false)
		$("#LOTECAD").prop("disabled",false)
		$("#CODMPCAD").prop("disabled",false)
		
		console.log("NUM OS: "+selectedItem['CODPRJ']+", DESCRIÇÃO: "+selectedItem["DESCRICAO"]+", IDPRJ: "+selectedItem["IDPRJ"])
	
		// RELOAD ZOOM FILTER VALUES NAS OP'S DO PROJETO
		//reloadZoomFilterValues("MATERIALPLANCAD","OS,"+selectedItem['CODPRJ'])
		
		// RELOAD ZOOM FILTER VALUES NAS MP'S DO PROJETO
		//reloadZoomFilterValues("CODMPCAD","OS,"+selectedItem['CODPRJ'])
		
		// RELOAD ZOOM FILTER VALUES NOS LOTES DO PROJETO
		//reloadZoomFilterValues("LOTECAD","NUM_OS,"+selectedItem['CODPRJ']+",CODFILIAL,"+selectedItem['CODFILIAL'])
		
		// RELOAD ZOOM FILTER VALUES NAS ATIVIDADES DO PROJETO
		//reloadZoomFilterValues("ATIVIDADEPLANCAD","OS,"+selectedItem['CODPRJ'])
		
		// RELOAD ZOOM FILTER VALUES NAS ATIVIDADES DO PROJETO
		//reloadZoomFilterValues("DESENHOCAD","OS,"+selectedItem['CODPRJ'])
		
	}
	
	// SE A OS É SELECIONADA PARA EDIÇÃO
	if(selectedItem.inputId.indexOf("PROJETOED")!="-1"){
		
		// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
		$("#CODPRJPLANED").val(selectedItem['CODPRJ'])
		$("#DESCRICAOPRJPLANED").val(selectedItem['DESCRICAO'])
		$("#IDPRJPLANED").val(selectedItem['IDPRJ'])
		$("#CODFILIALED").val(selectedItem['CODFILIAL'])
		
		console.log("NUM OS: "+selectedItem['CODPRJ']+", DESCRIÇÃO: "+selectedItem["DESCRICAO"]+", IDPRJ: "+selectedItem["IDPRJ"])
	
		// RELOAD ZOOM FILTER VALUES NAS OP'S DO PROJETO
		reloadZoomFilterValues("MATERIALPLANED","OS,"+selectedItem['CODPRJ'])
		
		// RELOAD ZOOM FILTER VALUES NAS ATIVIDADES DO PROJETO
		reloadZoomFilterValues("ATIVIDADEPLANED","OS,"+selectedItem['CODPRJ'])
		
	}
	
	// SE O CODSUCATA É SELECIONADO PARA O CADASTRO
	if(selectedItem.inputId.indexOf("CODSUCATA")!="-1"){
		
		$("#CODPRDSUCATACAD").val(selectedItem['CODIGOPRD'])
		$("#IDPRDSUCATACAD").val(selectedItem['IDPRD'])
		
	}
	
	// SE O CODMPCAD É SELECIONADO PARA O CADASTRO
	if(selectedItem.inputId.indexOf("CODMPCAD")!="-1"){
		
		$("#CODMATERIALCAD").val(selectedItem['CODIGOPRD'])
		$("#IDMATERIALCAD").val(selectedItem['IDPRD'])

		var idprd =selectedItem['CODIGOPRD'].split(".")[2];
		idprd = parseInt(idprd);
		$("#IDMATERIALED").val(idprd);
		console.log("idprd: "+idprd);
		
		var numOS = $("#CODPRJPLANCAD").val()
		
		// DESABILITA O CAMPO ZOOM DO LOTE
		$("#LOTECAD").prop("disabled",false)
		
		// RELOAD ZOOM NO CAMPO DO LOTE
		reloadZoomFilterValues("LOTECAD","IDPRD,"+selectedItem['IDPRD']+",CODFILIAL,"+$("#CODFILIAL").val()+",NUM_OS,"+numOS)

		var lote=$("#NUMLOTECAD").val()

		if (!(lote=="" || lote==null || lote==undefined)) {
			
			$("#CODSUCATA").prop("disabled",false)
			$("#RETALHOCAD").prop("disabled",false)
			$("#QTDRETALHOCAD").prop("disabled",false)
			$("#QTDEPECASPLANCAD").prop("disabled",false)

			CalculaSaldoDisponivelCAD()

		}
		
	}
	
	// SE O LOTE É SELECIONADO PARA O CADASTRO
	if(selectedItem.inputId.indexOf("LOTECAD")!="-1"){
		
		$("#NUMLOTECAD").val(selectedItem['NUMLOTE'])
		$("#IDLOTECAD").val(selectedItem['IDLOTE'])
		$("#SALDOLOTECAD").val(selectedItem['SALDOFISICO2'])

			
		var codMP = $("#CODMATERIALCAD").val()
		var numOS = $("#CODPRJPLANCAD").val()
		
		// SE MP NÃO FOI SELECIONADA E PROJETO JÁ FOI
		if(codMP=="" || codMP==null || codMP==undefined && !(numOS=="" || numOS==null || numOS==undefined)){

			// RELOAD ZOOM NO CAMPO DA MP
			reloadZoomFilterValues("CODMPCAD","NUM_OS,"+numOS+",NUMLOTE,"+selectedItem['NUMLOTE'])

			CalculaSaldoDisponivelCAD()
			
		}
		else if(!(numOS=="" || numOS==null || numOS==undefined)){

			$("#CODSUCATA").prop("disabled",false)
			$("#RETALHOCAD").prop("disabled",false)
			$("#QTDRETALHOCAD").prop("disabled",false)
			$("#QTDEPECASPLANCAD").prop("disabled",false)

			CalculaSaldoDisponivelCAD()

			// RELOAD ZOOM NO CAMPO DA MP
			reloadZoomFilterValues("CODMPCAD","NUM_OS,"+numOS+",NUMLOTE,"+selectedItem['NUMLOTE'])

		}

		
		
	}
	
	// SE O MATERIAL É SELECIONADO PARA O CADASTRO
	if(selectedItem.inputId.indexOf("MATERIALPLANCAD")!="-1"){
		
		console.log("material selecionado: "+selectedItem["MATERIAL"])
		
		$("#DSCMATERIALPLANCAD").val(selectedItem["MATERIAL"])
		
	}
	
	// SE O CODMPED É SELECIONADO PARA O EDIÇÃO
	if(selectedItem.inputId.indexOf("CODMPED")!="-1"){
		
		$("#CODMATERIALED").val(selectedItem['CODIGOPRD'])
		$("#IDMATERIALED").val(selectedItem['IDPRD'])
		var idprd =selectedItem['CODIGOPRD'].split(".")[2];
		idprd = parseInt(idprd);
		$("#IDMATERIALED").val(idprd);
		console.log("idprd: "+idprd);
		
		var numOS = $("#CODPRJPLANED").val()
		
		// RELOAD ZOOM NO CAMPO DO LOTE
		reloadZoomFilterValues("LOTEED","IDPRD,"+idprd+",CODFILIAL,"+$("#CODFILIALED").val()+",NUM_OS,"+numOS)
		
		var lote=$("#IDLOTEED").val()
		if(lote!="" && lote!=null && lote!=undefined){

			$("#RETALHOED").prop("disabled",false);
			$("#QTDRETALHOED").prop("disabled",false);
			$("#SUCATAED").prop("disabled",true)


		}
		
	}
	
	// SE A FILIAL É SELECIONADA PARA A EDIÇÃO
	if(selectedItem.inputId.indexOf("FILIALED")!="-1"){
		
		$("#CODFILIALED").val(selectedItem["CODFILIAL"])
		
		habilitaNumPlano()
		
	}	
	
	// SE O PLANO DE CORTE É SELECIONADO PARA A EDIÇÃO
	if(selectedItem.inputId.indexOf("PLANOCORTEED")!="-1"){
		
		var myLoading2 = FLUIGC.loading(window);
		myLoading2.show();

		setTimeout(function(){

			// SE PLANO DE CORTE NÃO FOI PROGRAMADO
			if(!(planoProgramado(selectedItem["NUMPLANOCORTE"]))){
				
				$("#NUMPLANOED").val(selectedItem["NUMPLANOCORTE"])
				
				$("#VISUALIZAR").val(0)

				verificaNumPlanoEd()

				habilitaCamposEd()
				
				$("#QTDESUCATAPLANED").prop("disabled",false)
				$("#SUCATAED").prop("disabled",false)

				$("#EXCLUIRPLANO").prop("disabled",false)

				$("#ALTERARED").prop("disabled",false)
				
			} else {
				// SE NÃO
				
				$("#NUMPLANOED").val(selectedItem["NUMPLANOCORTE"])

				$("#VISUALIZAR").val(1)

				verificaNumPlanoEd()
				
				desabilitaCamposEd()
				
				Swal.fire({
					icon: 'warning',
					title: 'Esse Plano de Aproveitamento e Corte já foi programado e não pode ser editado',
					text: 'Verifique e tente novamente.'
				})
				

				$("#EXCLUIRPLANO").prop("disabled",true)

				$("#ALTERARED").prop("disabled",true)
				
				
			}

			myLoading2.hide();

		},1000);
		
	}	
	
	// SE A SUCATA É SELECIONADA PARA A EDIÇÃO
	if(selectedItem.inputId.indexOf("SUCATAED")!="-1"){
		
		$("#CODSUCATAED").val(selectedItem['CODIGOPRD'])
		$("#IDPRDPLANED").val(selectedItem['IDPRD'])
		$("#CODIGOPRDPLANED").val(selectedItem['CODIGOPRD'])

		
	}	
	
	// SE O MATERIAL É SELECIONADO PARA EDIÇÃO
	if(selectedItem.inputId.indexOf("MATERIALPLANED")!="-1"){
		
		console.log("material selecionado: "+selectedItem["MATERIAL"])
		
		$("#DSCMATERIALPLANED").val(selectedItem["MATERIAL"])
		
	}
	
	// SE O LOTE É SELECIONADO PARA A EDIÇÃO
	if(selectedItem.inputId.indexOf("LOTEED")!="-1"){
		
		$("#NUMLOTEED").val(selectedItem['NUMLOTE'])
		$("#IDLOTEED").val(selectedItem['IDLOTE'])
		$("#SALDOLOTEED").val(selectedItem['SALDOFISICO2'])
		
		var codMP = $("#CODMATERIALED").val()
		var numOS = $("#CODPRJPLANED").val()
		
		// SE MP NÃO FOI SELECIONADA E PROJETO JÁ FOI
		if(codMP=="" || codMP==null || codMP==undefined && !(numOS=="" || numOS==null || numOS==undefined)){

			// RELOAD ZOOM NO CAMPO DA MP
			reloadZoomFilterValues("CODMPED","NUM_OS,"+numOS+",NUMLOTE,"+selectedItem['NUMLOTE'])
			
		}
		else if(!(codMP=="" || codMP==null || codMP==undefined) && !(numOS=="" || numOS==null || numOS==undefined)){

			$("#QTDESUCATAPLANED").prop("disabled",false)
			$("#RETALHOED").prop("disabled",false)
			$("#QTDRETALHOED").prop("disabled",false)

		}

		CalculaSaldoDisponivelED()
		
	}
	
	// SE O MATERIAL É SELECIONADO PARA ATIVIDADE
	if(selectedItem.inputId.indexOf("ATIVIDADEPLANCAD")!="-1"){
		
		console.log("atividade selecionada: "+selectedItem["CODATIVIDADE"])
		
		$("#CODATIVIDADEPLANCAD").val(selectedItem["CODATIVIDADE"])
		$("#DSCCODATIVIDADEPLANCAD").val(selectedItem["DSCATIVIDADE"])
		
	}
	
	// SE O MATERIAL É SELECIONADO PARA ATIVIDADE
	if(selectedItem.inputId.indexOf("ATIVIDADEPLANED")!="-1"){
		
		console.log("atividade selecionada: "+selectedItem["CODATIVIDADE"])
		
		$("#CODATIVIDADEPLANED").val(selectedItem["CODATIVIDADE"])
		$("#DSCCODATIVIDADEPLANED").val(selectedItem["DSCATIVIDADE"])
		
	}
	
	// SE O DESENHO É SELECIONADO
	if(selectedItem.inputId.indexOf("DESENHOCAD")!="-1"){
		
		console.log("desenho selecionado: "+selectedItem["NUMDESENHO"])
		
		$("#DSCNUMDESENHOCAD").val(selectedItem["NUMDESENHO"])
		
	}
	
	// SE O DESENHO É SELECIONADO
	if(selectedItem.inputId.indexOf("DESENHOED")!="-1"){
		
		console.log("desenho selecionado: "+selectedItem["NUMDESENHO"])
		
		$("#DSCNUMDESENHOED").val(selectedItem["NUMDESENHO"])
		
	}
	
}

// SE ITEM É REMOVIDO DO CAMPO ZOOM
function removedZoomItem(removedItem)
{
	console.log("entrei no removed Zoom HAA")
	
	var input = removedItem.inputId;
	//CRM.validaCampo($('#' + input));
	
	console.log("input :"+input)
	
	// SE A OS É REMOVIDA PARA CADASTRO
	if(removedItem.inputId.indexOf("PROJETO")!="-1"){
		
		// LIMPA OS CAMPOS NECESSÁRIOS DE ACORDO COM A REMOÇÃO
		$("#CODPRJPLANCAD").val("")
		$("#DESCRICAOPRJPLANCAD").val("")
		$("#IDPRJPLANCAD").val("")
		$("#CODFILIAL").val("")
		$("#SALDODISPONIVELCAD").val("")
		$("#SALDOLOTEORIGINALCAD").val("")
		$("#QTDESUCATAPLANCAD").val("")
		$("#QTDEPECASPLANCAD").val("")
		$("#CODATIVIDADEPLANCAD").val("")
		$("#DSCMATERIALPLANCAD").val("")
		$("#QTDEMPCAD").val("")
		$("#RETALHOCAD").val("")
		$("#QTDRETALHOCAD").val("")
		
		$("#ATIVIDADEPLANCAD>option").remove()
		$("#MATERIALPLANCAD>option").remove()
		$("#CODMPCAD>option").remove()
		$("#LOTECAD>option").remove()
		$("#CODSUCATA>option").remove()
		
		// DESABILITA OS CAMPOS
		$("#ATIVIDADEPLANCAD").prop("disabled",true)
		$("#MATERIALPLANCAD").prop("disabled",true)
		$("#LOTECAD").prop("disabled",true)
		$("#CODMPCAD").prop("disabled",true)
		$("#RETALHOCAD").prop("disabled",true)
		$("#QTDRETALHOCAD").prop("disabled",true)
		$("#CODSUCATA").prop("disabled",true)
		//$("#QTDESUCATAPLANCAD").prop("disabled",true)
		$("#QTDEPECASPLANCAD").prop("disabled",true)

		limparTabelaCadastro()

		$(".CAD").hide()

		limpaCabecalhoCadastro()
		
	}
	
	// SE A OS É REMOVIDA PARA EDIÇÃO
	if(removedItem.inputId.indexOf("PROJETOED")!="-1"){
		
		// LIMPA OS CAMPOS NECESSÁRIOS DE ACORDO COM A REMOÇÃO
		$("#CODPRJPLANED").val("")
		$("#DESCRICAOPRJPLANED").val("")
		$("#IDPRJPLANED").val("")
		$("#CODFILIAL").val("")
		$("#SALDODISPONIVELCAD").val("")
		$("#SALDOLOTEORIGINALCAD").val("")
		$("#QTDESUCATAPLANED").val("")
		$("#IDMATERIALED").val("")
		$("#CODMATERIALED").val("")
		$("#IDPRDPLANED").val("")
		$("#CODIGOPRDPLANED").val("")
		
		$("#CODMPCAD>option").remove()

		$("#QTDESUCATAPLANED").prop("disabled",true)
		$("#CODSUCATA").prop("disabled",true)
		$("#RETALHOCAD").prop("disabled",true)
		$("#QTDRETALHOCAD").prop("disabled",true)

		limpaTabelaEdicao()

		$(".ED").hide()

		limpaCabecalhoEdicao()
		
				
	}
	
	// SE O CODMP É REMOVIDO PARA O CADASTRO
	if(removedItem.inputId.indexOf("CODMPCAD")!="-1"){
		
		$("#CODMATERIALCAD").val("")
		$("#IDMATERIALCAD").val("")
		
		$("#LOTECAD>option").remove()
		$("#CODSUCATA>option").remove()

		$("#NUMLOTECAD").val("")
		$("#IDLOTECAD").val("")
		$("#SALDOLOTECAD").val("")
		$("#QTDEMPCAD").val("")
		$("#QTDRETALHOCAD").val("")
		$("#RETALHOCAD").val("")
		$("#SALDODISPONIVELCAD").val("")
		$("#SALDOLOTEORIGINALCAD").val("")
		$("#SALDOAUXCAD").val("")
		$("#QTDESUCATAPLANCAD").val("")
		$("#QTDEPECASPLANCAD").val("")


		//$("#QTDESUCATAPLANCAD").prop("disabled",true)
		$("#QTDEPECASPLANCAD").prop("disabled",true)
		$("#CODSUCATA").prop("disabled",true)
		$("#RETALHOCAD").prop("disabled",true)
		$("#QTDRETALHOCAD").prop("disabled",true)
		
		// DESABILITA O CAMPO ZOOM DO LOTE
		//$("#LOTECAD").prop("disabled",true)
		
		// RELOAD ZOOM NO CAMPO DO LOTE
		reloadZoomFilterValues("LOTECAD","NUM_OS,"+$("#CODPRJPLANCAD").val()+",CODFILIAL,"+$("#CODFILIAL").val())
	
		// RELOAD ZOOM NO CAMPO DA MP
		reloadZoomFilterValues("CODMPCAD","OS,"+$("#CODPRJPLANCAD").val())
		
	}
	
	// SE O LOTE É REMOVIDO PARA O CADASTRO
	if(removedItem.inputId.indexOf("LOTECAD")!="-1"){
		
		$("#NUMLOTECAD").val("")
		$("#IDLOTECAD").val("")
		$("#SALDOLOTECAD").val("")
		
		//$("#CODMPCAD>option").remove()
		//$("#CODMATERIALCAD").val("")
		//$("#IDMATERIALCAD").val("")
		$("#QTDEMPCAD").val("")
		$("#QTDRETALHOCAD").val("")
		$("#RETALHOCAD").val("")
		$("#SALDODISPONIVELCAD").val("")
		$("#SALDOLOTEORIGINALCAD").val("")
		$("#SALDOAUXCAD").val("")
		$("#QTDESUCATAPLANCAD").val("")
		$("#QTDEPECASPLANCAD").val("")

		//$("#QTDESUCATAPLANCAD").prop("disabled",true)
		$("#QTDEPECASPLANCAD").prop("disabled",true)
		$("#CODSUCATA").prop("disabled",true)
		$("#RETALHOCAD").prop("disabled",true)
		$("#QTDRETALHOCAD").prop("disabled",true)
		$("#CODSUCATA>option").remove()
		
		// RELOAD ZOOM NO CAMPO DA MP
		reloadZoomFilterValues("CODMPCAD","OS,"+$("#CODPRJPLANCAD").val())
		
		//var os = $("#CODPRJPLANCAD").val()
		//var codmp = $("#CODMATERIALCAD").val()
		// RELOAD ZOOM NO CAMPO DO LOTE
		//if(!(os=="" || os==null || os==undefined) && !(codmp=="" || codmp==null || codmp==undefined)){

		//	reloadZoomFilterValues("LOTECAD","IDPRD"+$("#IDMATERIALCAD").val()+",NUM_OS,"+$("#CODPRJPLANCAD").val()+",CODFILIAL,"+$("#CODFILIAL").val())

		//}
		//else {
		//	reloadZoomFilterValues("LOTECAD","NUM_OS,"+$("#CODPRJPLANCAD").val()+",CODFILIAL,"+$("#CODFILIAL").val())
		//}
		
	}
	
	
	// SE O CODMPED É REMOVIDO PARA A EDIÇÃO
	if(removedItem.inputId.indexOf("CODMPED")!="-1"){
		
		$("#CODMATERIALED").val("")
		$("#IDMATERIALED").val("")
		
		// REMOVE OS CAMPOS PREENCHIDOS
		$("#CODSUCATAED").val("")
		$("#IDPRDPLANED").val("")
		$("#CODIGOPRDPLANED").val("")
		$("#NUMLOTEED").val("")
		$("#IDLOTEED").val("")
		$("#SALDOLOTEED").val("")
		$("#MATERIALPLANED").val("")
		$("#DSCMATERIALPLANED").val("")
		$("#DESENHOED").val("")
		$("#DSCNUMDESENHOED").val("")
		$("#CODSUCATAED").val("")
		$("#QTDESUCATAPLANED").val("")
		$("#RETALHOED").val("")
		$("#QTDRETALHOED").val("")
		$("#SALDODISPONIVELED").val("")
		$("#SALDOAUXED").val("")
		$("#QTDESUCATAPLANED").val("")
		$("#QTDEMPED").val("")
		$("#QTDEMPEDORIGINAL").val("")

		$("#SUCATAED>option").remove()
		$("#LOTEED>option").remove("")

		$("#SUCATAED").prop("disabled",true)
		$("#QTDESUCATAPLANED").prop("disabled",true)
		$("#QTDRETALHOED").prop("disabled",true)
		$("#RETALHOED").prop("disabled",true)
		$("#SUCATAED>option").prop("disabled",true)
	
		// HABILITA O CAMPO ZOOM DO LOTE
		$("#LOTEED").prop("disabled",false)
		
		// RELOAD ZOOM NO CAMPO DO LOTE
		reloadZoomFilterValues("LOTEED","NUM_OS,"+$("#CODPRJPLANED").val()+",CODFILIAL,"+$("#CODFILIALED").val())
	
		// RELOAD ZOOM NO CAMPO DA MP
		reloadZoomFilterValues("CODMPED","OS,"+$("#CODPRJPLANED").val())

		//RELOAD QTD DO PLANO
		AtualizaQtdPlano()
		
	}
	
	// SE O LOTE É REMOVIDO PARA A EDIÇÃO
	if(removedItem.inputId.indexOf("LOTEED")!="-1"){
		
		$("#NUMLOTEED").val("")
		$("#IDLOTEED").val("")
		$("#SALDOLOTEED").val("")
		$("#SALDODISPONIVELED").val("")
		$("#QTDEMPED").val("")
		$("#QTDEMPEDORIGINAL").val("")

		$("#SALDOAUXED").val("")
		$("#QTDESUCATAPLANED").val("")
		$("#CODSUCATAED").val("")
		$("#QTDRETALHOED").val("")
		$("#RETALHOED").val("")

		$("#SUCATAED>option").remove()

		$("#QTDESUCATAPLANED").prop("disabled",true)
		$("#QTDRETALHOED").prop("disabled",true)
		$("#RETALHOED").prop("disabled",true)
		$("#SUCATAED").prop("disabled",true)
		
		// RELOAD ZOOM NO CAMPO DO LOTE
		reloadZoomFilterValues("CODMPED","OS,"+$("#CODPRJPLANED").val())
		
		// RELOAD ZOOM NO CAMPO DO LOTE
		var codMP = $("#CODMATERIALED").val()
		var numOS = $("#CODPRJPLANED").val()
		
		// SE MP FOI SELECIONADA E PROJETO JÁ FOI
		if(!(codMP=="" || codMP==null || codMP==undefined) && !(numOS=="" || numOS==null || numOS==undefined)){

			// RELOAD ZOOM NO CAMPO DA MP
			var idprd = codMP.split(".")[2];
			idprd = parseInt(idprd);
			$("#IDMATERIALED").val(idprd);
			console.log("idprd: "+idprd);
			
			var numOS = $("#CODPRJPLANED").val()
		
			// RELOAD ZOOM NO CAMPO DO LOTE
			reloadZoomFilterValues("LOTEED","IDPRD,"+idprd+",CODFILIAL,"+$("#CODFILIALED").val()+",NUM_OS,"+numOS)
			
		}
		else{

			reloadZoomFilterValues("LOTEED","NUM_OS,"+$("#CODPRJPLANED").val()+",CODFILIAL,"+$("#CODFILIALED").val())

		}

		AtualizaQtdPlano()
		
		
	}
	
	// SE O PLANO DE CORTE É REMOVIDO PARA A EDIÇÃO
	if(removedItem.inputId.indexOf("PLANOCORTEED")!="-1"){
		
		var myLoading2 = FLUIGC.loading(window);
		myLoading2.show();

		setTimeout(function(){
			$("#NUMPLANOED").val("")

			habilitaCamposEd()
			
			// REMOVE OS CAMPOS PREENCHIDOS
			$("#LOTEED>option").remove("")
			$("#CODMPED>option").remove()
			$("#SUCATAED>option").remove()

			$("#CODSUCATAED").val("")
			$("#IDPRDPLANED").val("")
			$("#CODIGOPRDPLANED").val("")
			$("#NUMLOTEED").val("")
			$("#IDLOTEED").val("")
			$("#SALDOLOTEED").val("")
			$("#QTDEMPED").val("")
			$("#QTDEMPEDORIGINAL").val("")
			$("#PROJETOED").val("")
			$("#CODPRJPLANED").val("")
			$("#MATERIALPLANED").val("")
			$("#DSCMATERIALPLANED").val("")
			$("#DESENHOED").val("")
			$("#DSCNUMDESENHOED").val("")
			$("#CODSUCATAED").val("")
			$("#QTDESUCATAPLANED").val("")
			$("#RETALHOED").val("")
			$("#QTDRETALHOED").val("")
			$("#SALDODISPONIVELED").val("")
			$("#SALDOAUXED").val("")
			
			$("#LOTEED").prop("disabled",true)
			$("#CODMPED").prop("disabled",true)
			$("#SUCATAED").prop("disabled",true)
			$("#QTDRETALHOED").prop("disabled",true)
			$("#RETALHOED").prop("disabled",true)
			$("#QTDESUCATAPLANED").prop("disabled",true)

			limpaTabelaEdicao()
			$(".ED").hide()
			
			myLoading2.hide();
		},1000);
		
	}
	
	// SE O CODSUCATA É REMOVIDO PARA O CADASTRO
	if(removedItem.inputId.indexOf("CODSUCATA")!="-1"){
		
		$("#CODPRDSUCATACAD").val("")
		$("#IDPRDSUCATACAD").val("")
		
	}
	
	// SE A SUCATA É REMOVIDA PARA A EDIÇÃO
	if(removedItem.inputId.indexOf("SUCATAED")!="-1"){
		
		$("#CODSUCATAED").val("")
		$("#IDPRDPLANED").val("")
		$("#CODIGOPRDPLANED").val("")
		
	}
	
	// SE A FILIAL É REMOVIDO PARA EDIÇÃO
	if(removedItem.inputId.indexOf("FILIALED")!="-1"){
		
		$("#CODFILIALED").val("")
		$("#NUMPLANOED").val("")
		$("#CODATIVIDADEPLANED")
		$("#DSCCODATIVIDADEPLANED")
		$("#PROJETOED").val("")
		$("#ATIVIDADEPLANED").val("")
		$("#SALDODISPONIVELED").val("")
		$("#SALDOAUXED").val("")
		$("#QTDESUCATAPLANED").val("")
	

		$("#PLANOCORTEED>option").remove()
		$("#ATIVIDADEPLANED>option").remove()

		$("#PLANOCORTEED").prop("readonly",true)
		$("#NUMPLANOED").prop("readonly",true)
		$("#QTDESUCATAPLANED").prop("disabled",true)
		$("#LOTEED").prop("disabled",true)
		$("#CODMPED").prop("disabled",true)
		$("#SUCATAED").prop("disabled",true)
		$("#QTDRETALHOED").prop("disabled",true)
		$("#RETALHOED").prop("disabled",true)
		$("#QTDESUCATAPLANED").prop("disabled",true)

		
		// LIMPA O CONTEÚDO DA TABELA DE EDIÇÃO
		limpaTabelaEdicao()
		$(".ED").hide()
		limpaCabecalhoEdicao()
		
	}
	
	// SE O MATERIAL É REMOVIDO PARA CADASTRO
	if(removedItem.inputId.indexOf("MATERIALPLANCAD")!="-1"){
		
		console.log("vou remover conteudo material")
		
		$("#DSCMATERIALPLANCAD").val("")
		
	}
	
	// SE O MATERIAL É REMOVIDO PARA EDIÇÃO
	if(removedItem.inputId.indexOf("MATERIALED")!="-1"){
		
		$("#DSCMATERIALPLANED").val("")
		
	}
	
	// SE O MATERIAL É REMOVIDO PARA ATIVIDADE
	if(removedItem.inputId.indexOf("ATIVIDADEPLANCAD")!="-1"){
				
		$("#CODATIVIDADEPLANCAD").val("")
		$("#DSCCODATIVIDADEPLANCAD").val("")
		
	}
	
	// SE O MATERIAL É REMOVIDO PARA ATIVIDADE
	if(removedItem.inputId.indexOf("ATIVIDADEPLANED")!="-1"){
				
		$("#CODATIVIDADEPLANED").val("")
		$("#DSCCODATIVIDADEPLANED").val("")
		
	}
	
	// SE O DESENHO É REMOVIDO
	if(removedItem.inputId.indexOf("DESENHOCAD")!="-1"){
		
		$("#DSCNUMDESENHOCAD").val("")
		
	}
	
	// SE O DESENHO É REMOVIDO
	if(removedItem.inputId.indexOf("DESENHOED")!="-1"){
		
		$("#DSCNUMDESENHOED").val("")
		
	}
	
}

// SETAR UM VALOR NO ZOOM
function setZoomData(instance, value){ 
	
	window[instance].setValue(value); 
	
}