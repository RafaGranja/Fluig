// SE ITEM É REMOVIDO DO CAMPO ZOOM
function setSelectedZoomItem(selectedItem) {        
	
	var input = selectedItem.inputId;

	//console.log("setSelectedZoomItem",selectedItem);
	//CRM.validaCampo($('#' + input));
	
	//console.log("entrei no setSelectedZoomItem")
	
	if(!(selectedItem.inputId==undefined)){
		
		//console.log("zoom selecionado",selectedItem.inputId)

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

				//console.log("NUM OS: "+selectedItem['CODPRJ']+", DESCRIÇÃO: "+selectedItem["DESCRICAO"]+", IDPRJ: "+selectedItem["IDPRJ"])
				
				// HABILITA O CÓDIGO DA TAREFA
				$("#CODTRFPAI").prop("disabled",false)
				
				// RELOAD ZOOM NO CAMPO DAS EXECUÇÕES
				//reloadZoomFilterValues("EXECUCOES_OS","OS,"+selectedItem['CODPRJ']+",CODCOLIGADA,"+selectedItem['CODCOLIGADA']+",CODFILIAL,"+selectedItem['CODFILIAL'])
				reloadZoomFilterValues("CODTRFPAI","OS,"+$("#NUM_OS").val())

				$("#OS_INFOREV").val(selectedItem['CODPRJ'] +" - "+ selectedItem['DESCRICAO'])
				$("#NUM_OSREV").val(selectedItem['CODPRJ'])
				$("#DESCRICAO_OS_INFOREV").val(selectedItem['DESCRICAO'])
				$("#IDPRJ_OSREV").val(selectedItem['IDPRJ'])
				$("#CODCOLIGADAREV").val(selectedItem['CODCOLIGADA'])
				$("#CODFILIALREV").val(selectedItem['CODFILIAL'])
				
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
			$("select[id^='CAMPOFILTROZOOM___']").each(function(){

				var seq = $(this).attr("id").split("___")[1]

				var principal = +$("#ESTRUTURAPRINCIPAL").prop("checked")
				// RELOAD ZOOM NO CAMPO DAS EXECUÇÕES
				reloadZoomFilterValues("VALORFILTROZOOM___"+seq, "OS,"+$("#NUM_OS").val()+",CAMPO,"+$("#CAMPOFILTRO___"+seq).val()+",CODTRFPAI,"+
				$("#CODTRFEX").val()+",PRINCIPAL,"+principal+",EXECUCAO,"+$("#EXECUCAO_INFO").val()+",TABELA,"+$("#TABELAFILTRO___"+seq).val()+",WHERE,"+retornaWhere(seq));

			})
			
		}
		
		// SE A EXECUÇÃO FOI SELECIONADA
		if(selectedItem.inputId.indexOf("EXECUCOES_OS")!="-1"){
			
			validaExecucao(selectedItem["NUMEXEC"])
			
			
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

			$("#CODTRFPAIREV").val(selectedItem['CODTRFPAI'])
			$("#CODTRFEXREV").val(selectedItem['CODTRFPAI'])
			$("#INDICEPAIREV").val(selectedItem['INDICE'])
			
			$("select[id^='CAMPOFILTROZOOM___']").each(function(){

				var seq = $(this).attr("id").split("___")[1]

				var principal = +$("#ESTRUTURAPRINCIPAL").prop("checked")
				// RELOAD ZOOM NO CAMPO DAS EXECUÇÕES
				reloadZoomFilterValues("VALORFILTROZOOM___"+seq, "OS,"+$("#NUM_OS").val()+",CAMPO,"+$("#CAMPOFILTRO___"+seq).val()
				+",CODTRFPAI,"+$("#CODTRFEX").val()+",PRINCIPAL,"+principal+",EXECUCAO,"+$("#EXECUCAO_INFO").val()+",TABELA,"+$("#TABELAFILTRO___"+seq).val()+",WHERE,"+retornaWhere(seq));

			})
			
		}

		if(selectedItem.inputId.indexOf("CAMPO")!="-1" && selectedItem.inputId.indexOf("CAMPOFILTROZOOM___")=="-1"){

			
			$("#CODCAMPO").val(selectedItem["NOMECOLUNA"])

			$("#CODGRUPO").val(selectedItem["GRUPO"])

			$("#CODTABELA").val(selectedItem["TABELA"])

			$("#CONVERTERCAMPO").val(selectedItem["CONVERTER"])

			$("#INSEREHTML").empty()

			$("#INSEREHTML").append(selectedItem["HTML"])

			$("#LABELCOMPLETE").text(selectedItem["COMPLETE"] + " " + selectedItem["DESCRICAO"])

			$("#VALOR").attr("obrigatorio",true)

			if(selectedItem["NOMECOLUNA"]=="CODIGOPRDCOMPONENTES"){

				
				$("#VIEWPRODUTOCOMPONENTES").attr("name","VIEWPRODUTOCOMPONENTES___VALOR1")
				$("#PRODUTOCOMPONENTES").attr("name","PRODUTOCOMPONENTES___VALOR1")
				$("#VIEWIDPRDCOMPONENTES").attr("name","VIEWIDPRDCOMPONENTES___VALOR1")
				$("#VIEWCODIGOPRDCOMPONENTES").attr("name","VIEWCODIGOPRDCOMPONENTES___VALOR1")
				$("#VIEWCODUNDCOMPONENTES").attr("name","VIEWCODUNDCOMPONENTES___VALOR1")
				$("#LIMPARZOOM").attr("name","LIMPARZOOM___VALOR1")

				$("#VIEWPRODUTOCOMPONENTES").attr("obrigatorio",true)
				$("#PRODUTOCOMPONENTES").attr("obrigatorio",true)
				$("#VIEWIDPRDCOMPONENTES").attr("obrigatorio",true)
				$("#VIEWCODIGOPRDCOMPONENTES").attr("obrigatorio",true)
				$("#VIEWCODUNDCOMPONENTES").attr("obrigatorio",true)

				$("#VIEWPRODUTOCOMPONENTES").attr("id","VIEWPRODUTOCOMPONENTES___VALOR1")
				$("#PRODUTOCOMPONENTES").attr("id","PRODUTOCOMPONENTES___VALOR1")
				$("#VIEWIDPRDCOMPONENTES").attr("id","VIEWIDPRDCOMPONENTES___VALOR1")
				$("#VIEWCODIGOPRDCOMPONENTES").attr("id","VIEWCODIGOPRDCOMPONENTES___VALOR1")
				$("#VIEWCODUNDCOMPONENTES").attr("id","VIEWCODUNDCOMPONENTES___VALOR1")
				$("#LIMPARZOOM").attr("id","LIMPARZOOM___VALOR1")

			}
			else if(selectedItem["NOMECOLUNA"]=="SUBSTITUTOCOMPONENTES"){

				$("#VIEWPRODUTOCOMPONENTES").attr("name","VIEWPRODUTOCOMPONENTES___VALOR2")
				$("#PRODUTOCOMPONENTES").attr("name","PRODUTOCOMPONENTES___VALOR2")
				$("#VIEWIDPRDCOMPONENTES").attr("name","VIEWIDPRDCOMPONENTES___VALOR2")
				$("#VIEWCODIGOPRDCOMPONENTES").attr("name","VIEWCODIGOPRDCOMPONENTES___VALOR2")
				$("#VIEWCODUNDCOMPONENTES").attr("name","VIEWCODUNDCOMPONENTES___VALOR2")
				$("#LIMPARZOOM").attr("name","LIMPARZOOM___VALOR2")

				$("#VIEWPRODUTOCOMPONENTES").attr("obrigatorio",true)
				$("#PRODUTOCOMPONENTES").attr("obrigatorio",true)
				$("#VIEWIDPRDCOMPONENTES").attr("obrigatorio",true)
				$("#VIEWCODIGOPRDCOMPONENTES").attr("obrigatorio",true)
				$("#VIEWCODUNDCOMPONENTES").attr("obrigatorio",true)

				$("#VIEWPRODUTOCOMPONENTES").attr("id","VIEWPRODUTOCOMPONENTES___VALOR2")
				$("#PRODUTOCOMPONENTES").attr("id","PRODUTOCOMPONENTES___VALOR2")
				$("#VIEWIDPRDCOMPONENTES").attr("id","VIEWIDPRDCOMPONENTES___VALOR2")
				$("#VIEWCODIGOPRDCOMPONENTES").attr("id","VIEWCODIGOPRDCOMPONENTES___VALOR2")
				$("#VIEWCODUNDCOMPONENTES").attr("id","VIEWCODUNDCOMPONENTES___VALOR2")
				$("#LIMPARZOOM").attr("id","LIMPARZOOM___VALOR2")

			}
		
			$("#CAMPOREV").val(selectedItem["DESCRICAO"])


			var dataset = DatasetFactory.getDataset("dsGruposAtualizacaoEmMassa",null,null,null)
			var row = dataset.values

			for (var i = 0; i < row.length; i++) {

				var rep = row[i]

				if(rep["GRUPO"]==$("#CODGRUPO").val()){

					var texto = rep["CAMPOSDESCRICAO"]

					texto = texto.replace(/;/g,' , ')

					$("#ALERTAFILTROSTEXTO").text("Filtros obrigatórios para o campo informado : "  + texto)
					$("#FILTROSOBRIGATORIOS").val(rep["CAMPOS"])

				}
				
			}

			insereFiltrosObrigatorios()

			$("#ALERTAFILTROS").show("slow")
			$("#BOTAOVIEWFILTRO").hide("slow")

			$("select[id^='CAMPOFILTROZOOM___']").each(function(){

				var seq = $(this).attr("id").split("___")[1]

				var principal = +$("#ESTRUTURAPRINCIPAL").prop("checked")
				// RELOAD ZOOM NO CAMPO DAS EXECUÇÕES
				reloadZoomFilterValues("VALORFILTROZOOM___"+seq, "OS,"+$("#NUM_OS").val()+",CAMPO,"+$("#CAMPOFILTRO___"+seq).val()+",CODTRFPAI,"+$("#CODTRFEX").val()
				+",PRINCIPAL,"+principal+",EXECUCAO,"+$("#EXECUCAO_INFO").val()+",TABELA,"+$("#TABELAFILTRO___"+seq).val()+",WHERE,"+retornaWhere(seq));

			})

		}

		if(selectedItem.inputId.indexOf("CAMPOFILTROZOOM___")!="-1"){

			var seq = selectedItem.inputId.split("___")[1]

			$("#CAMPOFILTRO___"+seq).val(selectedItem["NOMECOLUNA"])
			$("#TABELAFILTRO___"+seq).val(selectedItem["TABELA"])

			if(!verificaCampoFiltroZoom(seq)){
				
				var principal = +$("#ESTRUTURAPRINCIPAL").prop("checked")

				$("select[id^='CAMPOFILTROZOOM___']").each(function(){

					var seq2 = $(this).attr("id").split("___")[1]
		
					var principal = +$("#ESTRUTURAPRINCIPAL").prop("checked")
					// RELOAD ZOOM NO CAMPO DAS EXECUÇÕES
					reloadZoomFilterValues("VALORFILTROZOOM___"+seq2, "OS,"+$("#NUM_OS").val()+",CAMPO,"+$("#CAMPOFILTRO___"+seq2).val()+",CODTRFPAI,"+$("#CODTRFEX").val()+
					",PRINCIPAL,"+principal+",EXECUCAO,"+$("#EXECUCAO_INFO").val()+",TABELA,"+$("#TABELAFILTRO___"+seq2).val()+",TABELA,"+$("#TABELAFILTRO___"+seq2).val()+",WHERE,"+retornaWhere(seq2));
		
				})

				$("#CAMPOFILTROREV___"+seq).val(selectedItem["NOMECOLUNA"])
				setZoomData("CAMPOFILTROZOOMREV___"+seq,selectedItem["DESCRICAO"])

			}
			else{

				$("#CAMPOFILTRO___"+seq).val("")
				$("#TABELAFILTRO___"+seq).val("")
				$("#CAMPOFILTROZOOM___"+seq+">option").remove()

				// EXIBE ALERTA
				var Toast = Swal.mixin({
					toast: true,
					position: 'center',
					showConfirmButton: false,
					timer: 2000,
					timerProgressBar: true,
				})

				Toast.fire({
					icon: 'error',
					title: 'Filtro já selecionado previamente'
				})

			}

		}

		if(selectedItem.inputId.indexOf("VALORFILTROZOOM___")!="-1"){

			var seq = selectedItem.inputId.split("___")[1]

			$("#VALORFILTRO___"+seq).val(selectedItem["VALOR"])

			$("#VALORFILTROREV___"+seq).val(selectedItem["VALOR"])
			
			setZoomData("VALORFILTROZOOMREV___"+seq,selectedItem["VALOR"])

			var principal = +$("#ESTRUTURAPRINCIPAL").prop("checked")

			$("select[id^='CAMPOFILTROZOOM___']").each(function(){

				var seq2 = $(this).attr("id").split("___")[1]
	
				var principal = +$("#ESTRUTURAPRINCIPAL").prop("checked")
				// RELOAD ZOOM NO CAMPO DAS EXECUÇÕES
				reloadZoomFilterValues("VALORFILTROZOOM___"+seq2, "OS,"+$("#NUM_OS").val()+",CAMPO,"+$("#CAMPOFILTRO___"+seq2).val()+",CODTRFPAI,"+$("#CODTRFEX").val()+
				",PRINCIPAL,"+principal+",EXECUCAO,"+$("#EXECUCAO_INFO").val()+",TABELA,"+$("#TABELAFILTRO___"+seq2).val()+",TABELA,"+$("#TABELAFILTRO___"+seq2).val()+",WHERE,"+retornaWhere(seq2));
	
			})

		}
		
	}

	// VERIFICA O TYPE DA FUNÇÃO ZOOM
	if(selectedItem.type == "componentes") {
	
		//console.log("entrei na seleção dos componentes")
		
		var seq = $(".selecionadoZoom").attr("id").split("___")[1];
		
		// VARIÁVEL PARA ÍNDICE DO ITEM DA TABELA
		//console.log("seq: "+seq)
		
		var produto = selectedItem.PRODUTO.toString().replace(/[',"]/g," ")
		
		$("#VIEWPRODUTOCOMPONENTES___" + seq).val(produto)
		$("#PRODUTOCOMPONENTES___" + seq).prop("readonly",true)
		$("#VIEWIDPRDCOMPONENTES___" + seq).val(selectedItem.IDPRD)
		$("#VIEWCODIGOPRDCOMPONENTES___" + seq).val(selectedItem.CODIGOPRD)
		$("#VIEWCODUNDCOMPONENTES___" + seq).val(selectedItem.CODUNDCONTROLE)
	
		$("#VIEWPRODUTOCOMPONENTES___" + seq).removeClass("selecionadoZoom")

		$("#INSEREHTMLREV").empty()
		$("#INSEREHTMLREV").append($("#INSEREHTML").html())
		$("#INSEREHTMLREV").children().children().each(function(){

			var id = $(this).attr("id")
			var name = $(this).attr("name")
			if(id!=null && id!="" && id!=undefined){
				$(this).attr("id",id+"REV")
				$(this).attr("name",name+"REV")
			}
	
		})

		$("#VIEWPRODUTOCOMPONENTES___" + seq + "REV").val(produto)
		$("#PRODUTOCOMPONENTES___" + seq + "REV").prop("readonly",true)
		$("#VIEWIDPRDCOMPONENTES___" + seq + "REV").val(selectedItem.IDPRD)
		$("#VIEWCODIGOPRDCOMPONENTES___" + seq + "REV").val(selectedItem.CODIGOPRD)
		$("#VIEWCODUNDCOMPONENTES___" + seq + "REV").val(selectedItem.CODUNDCONTROLE)


		$("#INSEREHTMLREV").children().children().attr("onclick", null)

	}

	// VERIFICA O TYPE DA FUNÇÃO ZOOM
	if(selectedItem.type == "posto") {
		
		console.log("entrei na seleção do posto")
	
		
		$("#VIEWPOSTO").val(""+selectedItem.CODPOSTO+" - "+selectedItem.DSCPOSTO.toString().replace(/[',"]/g," "))
		$("#VIEWCODPOSTO").val(selectedItem.CODPOSTO)
		$("#VIEWDESCPOSTO").val(selectedItem.DSCPOSTO.toString().replace(/[',"]/g," "))

		$("#INSEREHTMLREV").empty()
		$("#INSEREHTMLREV").append($("#INSEREHTML").html())
		$("#INSEREHTMLREV").children().children().each(function(){

			var id = $(this).attr("id")
			var name = $(this).attr("name")
			if(id!=null && id!="" && id!=undefined){
				$(this).attr("id",id+"REV")
				$(this).attr("name",name+"REV")
			}
	
		})

		$("#VIEWPOSTOREV").val(""+selectedItem.CODPOSTO+" - "+selectedItem.DSCPOSTO.toString().replace(/[',"]/g," "))
		$("#VIEWPOSTOREV").prop("readonly",true)
		$("#VIEWCODPOSTOREV").val(selectedItem.CODPOSTO)
		$("#VIEWDESCPOSTOREV").val(selectedItem.DSCPOSTO.toString().replace(/[',"]/g," "))
		$("#INSEREHTMLREV").children().children().attr("onclick", null)

		
	}

	if(selectedItem.type == "atividade") {
		
		$("#VIEWATIVIDADE").val(""+selectedItem.CODATIVIDADE+" - "+selectedItem.DSCATIVIDADE.toString().replace(/[',"]/g," "))
		$("#VIEWCODATIVIDADE").val(selectedItem.CODATIVIDADE)
		$("#VIEWDESCATIVIDADE").val(selectedItem.DSCATIVIDADE.toString().replace(/[',"]/g," "))
		
		//console.log("codHabilidade: "+selectedItem.CODHABILIDADE)
		
		if(!(selectedItem.CODHABILIDADE==null || selectedItem.CODHABILIDADE=="" || selectedItem.CODHABILIDADE=="null")){
			
			$("#VIEWHABILIDADEREQUERIDA").val(""+selectedItem.CODHABILIDADE+" - "+selectedItem.DESCRICAOHABIL.toString().replace(/[',"]/g," "))
			$("#VIEWCODHABILIDADE").val(selectedItem.CODHABILIDADE)
			//console.log("Cod atividade: "+selectedItem.CODATIVIDADE+", Descrição atv: "+selectedItem.DSCATIVIDADE.toString().replace(/[',"]/g," "))
			
		} else {
			
			$("#VIEWHABILIDADEREQUERIDA").val(" - ")
			
		}

		$("#INSEREHTMLREV").empty()
		$("#INSEREHTMLREV").append($("#INSEREHTML").html())
		$("#INSEREHTMLREV").children().children().each(function(){

			var id = $(this).attr("id")
			var name = $(this).attr("name")
			if(id!=null && id!="" && id!=undefined){
				$(this).attr("id",id+"REV")
				$(this).attr("name",name+"REV")
			}
	
		})

		$("#VIEWATIVIDADEREV").val(""+selectedItem.CODATIVIDADE+" - "+selectedItem.DSCATIVIDADE.toString().replace(/[',"]/g," "))
		$("#VIEWATIVIDADEREV").prop("readonly",true)
		$("#VIEWCODATIVIDADEREV").val(selectedItem.CODATIVIDADE)
		$("#VIEWDESCATIVIDADEREV").val(selectedItem.DSCATIVIDADE.toString().replace(/[',"]/g," "))
		
		$("#VIEWHABILIDADEREQUERIDAREV").val(""+selectedItem.CODHABILIDADE+" - "+selectedItem.DESCRICAOHABIL.toString().replace(/[',"]/g," "))
		$("#VIEWCODHABILIDADEREV").val(selectedItem.CODHABILIDADE)

		$("#INSEREHTMLREV").children().children().attr("onclick", null)

	}

	atualizaQuadro()

}

// SE ITEM É REMOVIDO DO CAMPO ZOOM
function removedZoomItem(removedItem){

	//console.log("zoom removido",removedItem)

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

		$("#ESTRUTURAPRINCIPAL").prop("checked",false) 
		$("#ESTRUTURAPRINCIPALREV").prop("checked",false) 

		$("#OS_INFOREV").val("")
		$("#NUM_OSREV").val("")
		$("#DESCRICAO_OS_INFOREV").val("")
		$("#IDPRJ_OSREV").val("")
		$("#CODCOLIGADAREV").val("")
		$("#CODFILIALREV").val("")

		// LIMPA A SELEÇÃO DO CAMPO EXECUÇÕES
		$("#EXECUCOES_OS>option").remove()
		$("#EXECUCOES_OSREV").val("")
		$("#CODTRFPAI>option").remove()

		$("select[id^='CAMPOFILTROZOOM___']").each(function(){

			var seq = $(this).attr("id").split("___")[1]

			var principal = +$("#ESTRUTURAPRINCIPAL").prop("checked")
			// RELOAD ZOOM NO CAMPO DAS EXECUÇÕES
			reloadZoomFilterValues("VALORFILTROZOOM___"+seq, "OS,"+$("#NUM_OS").val()+",CAMPO,"+$("#CAMPOFILTRO___"+seq).val()+",CODTRFPAI,"+$("#CODTRFEX").val()
			+",PRINCIPAL,"+principal+",EXECUCAO,"+$("#EXECUCAO_INFO").val()+",TABELA,"+$("#TABELAFILTRO___"+seq).val()+",WHERE,"+retornaWhere(seq));

		})

	
	}

	// SE A EXECUÇÃO É REMOVIDA
	if(removedItem.inputId.indexOf("EXECUCOES_OS")!="-1"){	

		//console.log(removedItem)

		// SALVA A EXECUÇÃO
		var array = $("#EXECUCAO_INFO").val().split(";")

		array = array.filter(function(ex){return ex!=removedItem["NUMEXEC"] && ex!="" && ex!=" " })
		array = array.toString().replace(/,/g,";")

		$("#EXECUCAO_INFO").val(array)

		var array2 = ""

		$("#EXECUCOES_OS>option").each(function(){
			array2 += $(this).val() + " ; "
		})

		$("#EXECUCAO_INFO").val(array)

		$("#EXECUCOES_OSREV").val(array2)

		$("select[id^='CAMPOFILTROZOOM___']").each(function(){

			var seq = $(this).attr("id").split("___")[1]

			var principal = +$("#ESTRUTURAPRINCIPAL").prop("checked")
			// RELOAD ZOOM NO CAMPO DAS EXECUÇÕES
			reloadZoomFilterValues("VALORFILTROZOOM___"+seq, "OS,"+$("#NUM_OS").val()+",CAMPO,"+$("#CAMPOFILTRO___"+seq).val()+",CODTRFPAI,"+$("#CODTRFEX").val()+
			",PRINCIPAL,"+principal+",EXECUCAO,"+$("#EXECUCAO_INFO").val()+",TABELA,"+$("#TABELAFILTRO___"+seq).val()+",WHERE,"+retornaWhere(seq));

		})
		
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
		$("#EXECUCOES_OSREV").val("")

		$("#CODTRFEXREV").val("")
		$("#CODTRFPAIREV").val("")

		$("select[id^='CAMPOFILTROZOOM___']").each(function(){

			var seq = $(this).attr("id").split("___")[1]

			var principal = +$("#ESTRUTURAPRINCIPAL").prop("checked")
			// RELOAD ZOOM NO CAMPO DAS EXECUÇÕES
			reloadZoomFilterValues("VALORFILTROZOOM___"+seq, "OS,"+$("#NUM_OS").val()+",CAMPO,"+$("#CAMPOFILTRO___"+seq).val()+",CODTRFPAI,"+$("#CODTRFEX").val()
			+",PRINCIPAL,"+principal+",EXECUCAO,"+$("#EXECUCAO_INFO").val()+",TABELA,"+$("#TABELAFILTRO___"+seq).val()+",WHERE,"+retornaWhere(seq));

		})

		
	}

	if(removedItem.inputId.indexOf("CAMPO")!="-1" && removedItem.inputId.indexOf("CAMPOFILTROZOOM___")=="-1"){


		$("#CODCAMPO").val("")
		$("#CODGRUPO").val("")

		$("#INSEREHTML").empty()

		$("#INSEREHTMLREV").empty()

		$("#LABELCOMPLETE").text("Novo Valor")

		$("#ALERTAFILTROS").hide("slow")
		$("#BOTAOVIEWFILTRO").show("slow")

		$("select[id^='CAMPOFILTROZOOM___']").each(function(){

			var seq = $(this).attr("id").split("___")[1]

			var principal = +$("#ESTRUTURAPRINCIPAL").prop("checked")
			// RELOAD ZOOM NO CAMPO DAS EXECUÇÕES
			reloadZoomFilterValues("VALORFILTROZOOM___"+seq, "OS,"+$("#NUM_OS").val()+",CAMPO,"+$("#CAMPOFILTRO___"+seq).val()+",CODTRFPAI,"+$("#CODTRFEX").val()+",PRINCIPAL,"+
			principal+",EXECUCAO,"+$("#EXECUCAO_INFO").val()+",TABELA,"+$("#TABELAFILTRO___"+seq).val()+",WHERE,"+retornaWhere(seq));

		})

	}

	if(removedItem.inputId.indexOf("CAMPOFILTROZOOM___")!="-1"){

		var seq = removedItem.inputId.split("___")[1]

		$("#CAMPOFILTRO___"+seq).val("")
		$("#TABELAFILTRO___"+seq).val("")

		$("#VALORFILTRO___"+seq).val("")
		$("#VALORFILTROZOOM___"+seq+">option").remove()
		
		$("#CAMPOFILTROREV___"+seq).val("")
		$("#CAMPOFILTROZOOMREV___"+seq+">option").remove()
		$("#VALORFILTROREV___"+seq).val("")
		$("#VALORFILTROZOOMREV___"+seq+">option").remove()
		$("#VALORFILTROZOOMREV___"+seq).val("")

		$("select[id^='CAMPOFILTROZOOM___']").each(function(){

			var seq = $(this).attr("id").split("___")[1]

			var principal = +$("#ESTRUTURAPRINCIPAL").prop("checked")
			// RELOAD ZOOM NO CAMPO DAS EXECUÇÕES
			reloadZoomFilterValues("VALORFILTROZOOM___"+seq, "OS,"+$("#NUM_OS").val()+",CAMPO,"+$("#CAMPOFILTRO___"+seq).val()+",CODTRFPAI,"+$("#CODTRFEX").val()+
			",PRINCIPAL,"+principal+",EXECUCAO,"+$("#EXECUCAO_INFO").val()+",TABELA,"+$("#TABELAFILTRO___"+seq).val()+",TABELA,"+$("#TABELAFILTRO___"+seq).val()+",WHERE,"+retornaWhere(seq));

		})

	}

	if(removedItem.inputId.indexOf("VALORFILTROZOOM___")!="-1"){

		var seq = removedItem.inputId.split("___")[1]

		$("#VALORFILTRO___"+seq).val("")
		$("#VALORFILTROREV___"+seq).val("")
		$("#VALORFILTROZOOMREV___"+seq+">option").remove()
		$("#VALORFILTROZOOMREV___"+seq).val("")

		var principal = +$("#ESTRUTURAPRINCIPAL").prop("checked")

		$("select[id^='CAMPOFILTROZOOM___']").each(function(){

			var seq2 = $(this).attr("id").split("___")[1]

			var principal = +$("#ESTRUTURAPRINCIPAL").prop("checked")
			// RELOAD ZOOM NO CAMPO DAS EXECUÇÕES
			reloadZoomFilterValues("VALORFILTROZOOM___"+seq2, "OS,"+$("#NUM_OS").val()+",CAMPO,"+$("#CAMPOFILTRO___"+seq2).val()+",CODTRFPAI,"+$("#CODTRFEX").val()+
			",PRINCIPAL,"+principal+",EXECUCAO,"+$("#EXECUCAO_INFO").val()+",TABELA,"+$("#TABELAFILTRO___"+seq2).val()+",TABELA,"+$("#TABELAFILTRO___"+seq2).val()+",WHERE,"+retornaWhere(seq2));

		})

		
	}

	atualizaQuadro()

}

// SETAR UM VALOR NO ZOOM
function setZoomData(instance, value){ 
	
	window[instance].setValue(value); 
	
}

// CRIA UM ZOOM EXTERNO BASEADO EM UM DATASET
function zoomDataSet(titulo, dataset, campos, resultFields, filterValues, type) {
	
	//console.log("entrei na zoomDataSet")
	// 600, 350
	window.open("/webdesk/zoom.jsp?datasetId="+dataset+"&dataFields="+campos+"&resultFields="+resultFields+"&filterValues="+filterValues+"&type="+type+"&title="+titulo, "zoom" , "status , scrollbars=no ,width=800, height=400");
	
	//console.log("finalizei a zoomDataSet")
	
}

// FUNÇÃO PARA CONSTRUIR O ZOOM COMPONENTE
function zoomComponentes(componente,objeto) {
	
	var id = $(objeto).attr("id")//.split("___")[1]

	$("#"+id).addClass("selecionadoZoom")
	
	// PASSAGEM DE PARÂMETROS PARA FUNÇÃO ZOOM DATASET: Titulo, dataset, campos, type
	zoomDataSet('Material', 'dsMaterial', 'PRODUTO,Produto,CODUNDCONTROLE,Und','PRODUTO,IDPRD,CODIGOPRD,CODUNDCONTROLE', "", componente);
	
	//console.log("finalizei o zoomComponente")
	
}

// FUNÇÃO PARA CONSTRUIR O ZOOM POSTO
function zoomPosto(posto,objeto){
	
	var id = $(objeto).attr("id")//.split("___")[1]
	
	$("#"+id).addClass("selecionadoZoom")
	
	// PASSAGEM DE PARÂMETROS PARA FUNÇÃO ZOOM DATASET: Titulo, dataset, campos, type
	//zoomDataSet('Posto', 'dsPosto', 'CODPOSTO,Cód. Posto,DSCPOSTO,Descrição','CODPOSTO,DSCPOSTO', "CODPRJ,"+numOS+"", posto);
	
	zoomDataSet('Posto', 'dsPosto', 'POSTO,Cód. Posto - Descrição','POSTO,CODPOSTO,DSCPOSTO', "", posto);
	
	//"CODPRJ,"+numOS+""
	console.log("finalizei o zoomPosto")
	
}

// FUNÇÃO PARA CONSTRUIR O ZOOM ATIVIDADE
function zoomAtividade(atividade,objeto){
	
	console.log("entrei no zoomAtividade")
	
		
	zoomDataSet('Atividade', 'dsAtividade', 'ATIVIDADE,Cód. Atividade - Descrição','ATIVIDADE,CODATIVIDADE,DSCATIVIDADE,CODHABILIDADE,DESCRICAOHABIL',"", atividade);

	$("#VIEWATIVIDADE").addClass("selecionadoZoom")
	
	// PASSAGEM DE PARÂMETROS PARA FUNÇÃO ZOOM DATASET: Titulo, dataset, campos, type
	//zoomDataSet('Atividade', 'dsAtividade', 'CODATIVIDADE,Cód. Atividade,DSCATIVIDADE,Descrição','CODATIVIDADE,DSCATIVIDADE,CODHABILIDADE,DESCRICAOHABIL',"", atividade);
	
	console.log("finalizei o zoomAtividade")
	
}


async function validaExecucao(exe){

	var verifica = await verificaExOS(exe)

	if(verifica.VER){

		// SALVA A EXECUÇÃO
		var array = $("#EXECUCAO_INFO").val().split(";")

		array.push(exe)
		array = array.filter(function(ex){return ex!="" & ex!=" " })
		array = array.toString().replace(/,/g,";")

		var array2 = ""

		$("#EXECUCOES_OS>option").each(function(){
			array2 += $(this).val() + " ; "
		})

		$("#EXECUCAO_INFO").val(array)

		$("#EXECUCOES_OSREV").val(array2)
		
		// RELOAD ZOOM NO CAMPO DOS CÓDIGOS DE TAREFAS
		//reloadZoomFilterValues("CODTRFPAI","OS,"+$("#NUM_OS").val()+",EXECUCAO,"+selectedItem['NUMEXEC'])
		
		$("select[id^='CAMPOFILTROZOOM___']").each(function(){

			var seq = $(this).attr("id").split("___")[1]

			var principal = +$("#ESTRUTURAPRINCIPAL").prop("checked")
			// RELOAD ZOOM NO CAMPO DAS EXECUÇÕES
			reloadZoomFilterValues("VALORFILTROZOOM___"+seq, "OS,"+$("#NUM_OS").val()+",CAMPO,"+$("#CAMPOFILTRO___"+seq).val()+",CODTRFPAI,"+$("#CODTRFEX").val()+
			",PRINCIPAL,"+principal+",EXECUCAO,"+$("#EXECUCAO_INFO").val()+",TABELA,"+$("#TABELAFILTRO___"+seq).val()+",WHERE,"+retornaWhere(seq));

		})

	}
	else{

		window["EXECUCOES_OS"].setValues($("#EXECUCOES_OS").val().filter(function(a,b,c){return b!=$("#EXECUCOES_OS").val().length-1}))
		// EXIBE ALERTA
		Swal.fire({
			icon: 'error',
			title: 'A execução selecionada já está sendo editada!', 
			footer: '<span class="solicitacoes">Solicitação: &nbsp;<a href="'+window.parent.window.location.href.split('portal')[0]+'portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID='+verifica.SOLICITACAO+'" target="_blank">'+verifica.SOLICITACAO+' </a></span> ',
			allowOutsideClick : false,
			allowEscapeKey : false
		})
	}

}

