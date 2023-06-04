// TRANSFORMA CONTEÚDO DO IMPUT EM CAIXA ALTA
function caixaAlta(obj){
	
	// SALVA O CONTEÚDO DO INPUT
	var cx = $(obj).val()
	
	// TRANSFORMA EM CAIXA ALTA
	var cx = cx.toUpperCase()
	
	// SALVA O CONTEÚDO EM CAIXA ALTA NO CAMPO INPUT
	$(obj).val(cx)
	
}

// SE OS CAMPOS OBRIGATÓRIOS FORAM PREENCHIDOS
function camposObrigatorios(){
	
	console.log("verifica se todos os campos obrigatórios foram preenchidos")
	
	var obg = true
	var proc = true
	
	var radio2 = $("#VALOR_RADIO2").val()
	var qtde = $("#F_DESQTDE").val()
	
	// SE CAMPOS OBRIGATÓRIOS DO FORMULÁRIO NÃO FORAM PREENCHIDOS
	if((radio2==null || radio2=="" || radio2==undefined) || (qtde=="" || qtde==null || qtde==undefined)){
		
		console.log("campo radio2 ou qtde não foram preenchidos")
		
		obg = false
		
	}
	
	// PERCORRE A TABELA DOS COMPONENTES
	$("input[id^='VIEWPRODUTOCOMPONENTES___']").each(function(){

		var seq = $(this).attr("id").split("___")[1]
		
		console.log("tabela dos componentes linha "+seq)
		
		var produto = $("#VIEWPRODUTOCOMPONENTES___"+seq).val()
		var prioridadeAtv = $("#VIEWPRIORIDADEATVCOMPONENTES___"+seq).val()
		//var qtdeUnit = $("#VIEWQTDEUNCOMPONENTES___"+seq).val()
		//var qtdeTotal = $("#VIEWQTDETOTALCOMPONENTES___"+seq).val()
		
		// SE CAMPOS OBRIGATÓRIOS NÃO FORAM PREENCHIDOS
		if((produto=="" || produto==null || produto==undefined) || (prioridadeAtv=="" || prioridadeAtv==null || prioridadeAtv==undefined)){ 
				//|| (qtdeUnit=="" || qtdeUnit==null || qtdeUnit==undefined) || (qtdeTotal=="" || qtdeTotal==null || qtdeTotal==undefined)){
			
			console.log("achei campos obrigatórios que não foram preenchidos")
			
			obg = false 
			
		}
		
	})
	
	// PERCORRE A TABELA DOS PROCESSOS
	$("input[id^='VIEWPRIORIDADE___']").each(function(){
		
		proc = false
		
		var seq = $(this).attr("id").split("___")[1]
		
		console.log("tabela dos processos linha "+seq)
		
		var prioridade = $("#VIEWPRIORIDADE___"+seq).val()
		var atividade = $("#VIEWATIVIDADE___"+seq).val()
		var habilidade = $("#VIEWHABILIDADEREQUERIDA___"+seq).val()
		var posto = $("#VIEWPOSTO___"+seq).val()
		var minutos = $("#VIEWMINUTOSGASTOS___"+seq).val()
		var descProcesso = $("#VIEWDESCPROCESSO___"+seq).val()

		// SE CAMPOS OBRIGATÓRIOS NÃO FORAM PREENCHIDOS
		if((prioridade=="" || prioridade==null || prioridade==undefined) || (atividade=="" || atividade==null || atividade==undefined) ||
				(habilidade=="" || habilidade==null || habilidade==undefined) || (posto=="" || posto==null || posto==undefined)
				|| (minutos=="" || minutos==null || minutos==undefined) || (descProcesso=="" || descProcesso==null || descProcesso==undefined)){
			
			console.log("achei campos obrigatórios que não foram preenchidos")
			
			obg = false
			
		}
		
	})
	
	// SE PROCESSO FOI INFORMADO
	if(proc){
		
		console.log("processo não foi informado")
		
		return false
		
	} else {
	
		console.log("há campos obrigatórios que não foram preenchidos? "+obg)
		
		return obg
		
		
	}
	
}

// SALVA O VALOR DO RADIO3 (COMPOR LISTA DOS MATERIAIS)
function radio3(){
	
	// SE SIM FOI SELECIONADO
	if($("#RAD3_SIM").is(":checked")){
		
		console.log("Sim foi selecionado")
		
		$("#VALOR_RADIO3").val("SIM")
		
	}
	
	// SE NÃO FOI SELECIONADO
	if($("#RAD3_NAO").is(":checked")){

		console.log("Não foi selecionado")

		$("#VALOR_RADIO3").val("NAO")
		
	}
	
}

// CONFIRMA A OS E A OP QUE SERÃO RETRABALHADAS E CARREGA AS INFORMAÇÕES PERTINENTES NO FORMULÁRIO
function confirmaRetrabalho(){
	
	console.log("entrei para confirmar o retrabalho")
	
	var numOS = $("#NUM_OS").val()
	var codOrdem = $("#CODORDEM").val()
	var codColigada = $("#CODCOLIGADA").val()
	var codFilial = $("#CODFILIAL").val()
	var apontado = $("#QTDEAPONTADA").val()
	
	// SE ORDEM JÁ TEVE SALDO EFETIVADO NO APONTAMENTO 
	/*if(!(apontado=="" || apontado==null || apontado==undefined)){
		
		// EXIBE ALERTA
		Swal.fire({
			
			  title: 'Se o item a ser retrabalhado já tiver saldo em estoque, selecione o checkbox "Item já apontado" antes de prosseguir. Deseja selecionar o checkbox?',
			  icon: 'warning',
			  showCancelButton: true,
			  allowEscapeKey: true,
			  allowOutsideClick: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#F08E8E',
			  confirmButtonText: 'Sim',
			  cancelButtonText: 'Não'

			}).then(function(result){
			
			  // SE SIM
			  if (result.value) {
			      
				  // SETA O CHECKBOX DO ITEM APONTADO
				  $("#F_ITEMAPONTADO").prop("checked",true)
				 
				  // BUSCA AS INFORMAÇÕES DA ORDEM DE RETRABALHO
				  buscaRetrabalho()
			      
			  } else{
				  // SE NÃO

				  // BUSCA AS INFORMAÇÕES DA ORDEM DE RETRABALHO
				  buscaRetrabalho()
				  
			  } 				  
			  
		})
		
	} else {*/
		
		// BUSCA AS INFORMAÇÕES DA ORDEM DE RETRABALHO
		buscaRetrabalho()
		  
	//}
	
}
	
// SALVA O COMPONENTE DA OP
function salvaComponente(componente,idprd,codigoPrd,numOS,codUnd){
	
	console.log("entrei para salvar o componente")
	
	console.log("componente: "+componente+", idprd: "+idprd+", codigoPrd: "+codigoPrd+", numOS: "+numOS+", codUnd: "+codUnd)
	
	var rowNova = addViewComponente()
	
	// SALVA AS INFORMAÇÕES DO COMPONENTE 
	$("#VIEWPRODUTOCOMPONENTES___"+rowNova).val(componente)
	$("#VIEWIDPRDCOMPONENTES___"+rowNova).val(idprd)
	$("#VIEWCODIGOPRDCOMPONENTES___"+rowNova).val(codigoPrd)
	$("#VIEWOSCOMPONENTES___"+rowNova).val(numOS)
	$("#VIEWCODUNDCOMPONENTES___"+rowNova).val(codUnd)
	$("#VIEWQTDEUNCOMPONENTES___"+rowNova).val("1").prop("readonly",true)
	$("#VIEWQTDETOTALCOMPONENTES___"+rowNova).prop("readonly",true)
	
	// ESCONDER BOTÃO DE EXCLUIR
	$("#EXCLUIRCOMP___"+rowNova).parent("td").children("button").hide()
	
	// DESABILITAR CAMPOS QUE NÃO PODERÃO SER USADOSS
	$("#VIEWINSUMOCOMPONENTES___"+rowNova).prop("disabled",true)
	$("#VIEWSUBSTITUTOCOMPONENTES___"+rowNova).prop("disabled",true)
	$("#VIEWPRINCIPALCOMP___"+rowNova).val("SIM")
	//$("#VIEWPRIORIDADEATVCOMPONENTES___"+rowNova).prop("disabled",true)
	
}

// BUSCA AS INFORMAÇÕES DA ORDEM DE RETRABALHO
function buscaRetrabalho(){ 

	console.log("vou buscar as informações da ordem que será retrabalhada")
	
	var numOS = $("#NUM_OS").val()
	var codOrdem = $("#CODORDEM").val()
	var codColigada = $("#CODCOLIGADA").val()
	var codFilial = $("#CODFILIAL").val()
	var apontado = $("#QTDEAPONTADA").val()
	
	// SE A OS OU A ORDEM NÃO FORAM INFORMADOS
	if((numOS=="" || numOS==null || numOS==undefined) || (codOrdem=="" || codOrdem==null || codOrdem==undefined)){
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'É necessário informar a OS do Projeto e a OP que sofrerá retrabalho',
			  text: 'Verifique e tente novamente.'
		})
		
	} else {
		// SE NÃO, SE OS DADOS OBRIGATÓRIOS FORAM INFORMADOS

		// ATIVA O LOAD
		var myLoading2 = FLUIGC.loading(window);
		myLoading2.show();
		
		setTimeout(function(){
			
			var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
			var a2 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
			var a3 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST)
			var a4 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
			
			var constraints = new Array(a1,a2,a3,a4)
			
			var dataset = DatasetFactory.getDataset("dsBuscaRetrabalhoOS",null,constraints,null)
			console.log("dataset: "+dataset)
			console.log(dataset)
			var row = dataset.values
			console.log("row: ")
			console.log(row)
			
			// PREENCHE O FORMULÁRIO COM AS INFORMAÇÕES DO RETORNO DA CONSULTA
			var pf = preencheForm(row)
			
			// SE AS INFORMAÇÕES DO ITEM FORAM ENCONTRADAS
			if(pf){
				
				console.log("preenchimento do formulário foi realizado")
				
				// ATIVA ABA DESENHO COMO PRINCIPAL
				ativaAbaDesenho()
				
				// SE CHECKBOX NÃO FOI MARCADO
				if(!($("#F_ITEMAPONTADO").is(":checked"))){
					
					// APAGA A TABELA DA VIEW DE COMPONENTES
					apagaViewComponentes()
					
				}
				
				// VERIFICA SE A OP DE REFERÊNCIA CONSOME UM SUBCONJUNTO (COMPONENTE "03.23") E O PREENCHE NA ABA DOS COMPONENTES
				preencheCompomente()

				//desabilitaCampos()
				
				// SETA CAMPO PARA CONTROLE DO EXCLUSIVO DO WORKFLOW EM "SIM" 
			    $("#EXCLUSIVO1").val("EDITAR")
				  
		        // SIMULA O CLICK NO BOTÃO ENVIAR DA SOLICITAÇÃO
			    $("#workflowActions > button:first-child", window.parent.document).click()

			}
						
		},500)
	
		// DESATIVA O LOAD
		setTimeout(function(){
			
			myLoading2.hide()
			
		},500)
		
	}
	
}

// VERIFICA SE A OP DE REFERÊNCIA CONSOME UM SUBCONJUNTO (COMPONENTE "03.23") E O PREENCHE NA ABA DOS COMPONENTES
function preencheCompomente(){
	
	console.log("preenche a aba dos componentes")
	
	var codColigada = $("#CODCOLIGADA").val()
	var codFilial =	$("#CODFILIAL").val()
	var codOrdem = $("#CODORDEM").val()
	
	console.log("codColigada: "+codColigada+", codFilial: "+codFilial+", codOrdem: "+codOrdem)
	
	var d1 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST)
	var d2 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
	var d3 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
	
	var constraints2 = new Array(d1,d2,d3)
	var dataset = DatasetFactory.getDataset("dsBuscaCompRetrabalho",null,constraints2,null)

	var row = dataset.values
	
	// SE A OP TEM COMPONENTES DE SUBCONJUNTOS
	if(!(row=="" || row==null || row==undefined)){
		
		var row= addViewComponente()
		console.log("criei item tabela componentes "+row)
		
		// SALVA AS INFORMAÇÕES NA TABELA
		$("#VIEWIDPRDCOMPONENTES___"+row).val(rep["IDPRD"])
		$("#VIEWPRODUTOCOMPONENTES___"+row).val(rep["NOMEFANTASIA"])
		$("#VIEWCODIGOPRDCOMPONENTES___"+row).val(rep["CODIGOPRD"])
		$("#VIEWCODUNDCOMPONENTES___"+row).val(rep["CODUNDCONTROLE"])
		$("#VIEWINSUMOCOMPONENTES___"+row).val(rep["NOMEFANTASIA"])
		
	}
	
}

// APAGA A TABELA DA VIEW DE COMPONENTES
function apagaViewComponentes(){
	
	console.log("vou apagar a view da tabela de componentes")
	
	// SE CHECKBOX DO ITEM APONTADO NÃO FOI SELECIONADO
	if(!($("#F_ITEMAPONTADO").is(":checked"))){
		
		// APAGA TODAS AS LINHAS DA TABELA DE COMPONENTES
		$("input[id^='VIEWPRODUTOCOMPONENTES___']").each(function(){
			
			var seq = $(this).attr("id").split("___")[1]
			
			$("#LINHAVIEWCOMPONENTES___"+seq).remove()
			
		})
		
	}
	
}

// PREENCHE O FORMULÁRIO COM AS INFORMAÇÕES DO RETORNO DA CONSULTA
function preencheForm(row){
	
	var numOS = $("#NUM_OS").val()
	
	// SE O RETORNO NÃO É NULO E NEM VAZIO
	if(!(row=="" || row==null || row==undefined || row=="null")){
		
		console.log("as informações do item foram localizadas")
		
		var rep = row[0]
		
		// PEGA OS DADOS
		var posicaoIndice = rep["POSICAOINDICE"]
		var posicaoDesenho = rep["POSICAODESENHO"]
		var indiceAntigo = rep["INDICEANTIGO"]
		var nivel = rep["NIVEL"]
		var numdbi = rep["NUMDBI"]
		var revisaodbi = rep["REVISAODBI"]
		var numdesenho = rep["NUMDESENHO"]
		var revisaodesenho = rep["REVISAODESENHO"]
		//var desqtde = rep["DESQTDE"]
		//var totalqtde = rep["TOTALQTDE"]
		var descricao = rep["DESCRICAO"]
		var codTarefa = rep["CODTRFOS"]
		var dscTarefa = rep["DSCTRFOS"]
		var comporLista = rep["COMPORLISTA"]
		
		console.log("compor lista: "+comporLista)
		
		var bitola = rep["BITOLA"]
		bitola = bitola.toString()
		bitola = bitola.replace(".",",")
		
		var espessura = rep["ESPESSURA"]
		espessura = espessura.toString()
		espessura = espessura.replace(".",",")
		
		var largura = rep["LARGURA"]
		largura = largura.toString()
		largura = largura.replace(".",",")
		
		var massaLinear = rep["MASSALINEAR"]
		massaLinear = massaLinear.toString()
		massaLinear = massaLinear.replace(".",",")
		
		var esprosca = rep["ESPROSCA"]
		esprosca = esprosca.toString()
		esprosca = esprosca.replace(".",",")
		
		var diametroExterno = rep["DIAMETROEXTERNO"]
		diametroExterno = diametroExterno.toString()
		diametroExterno = diametroExterno.replace(".",",")
		
		var diametroInterno = rep["DIAMETROINTERNO"]
		diametroInterno = diametroInterno.toString()
		diametroInterno = diametroInterno.replace(".",",")
		
		var comprimento = rep["COMPRIMENTO"]
		comprimento = comprimento.toString()
		comprimento = comprimento.replace(".",",")
		
		var dataRevisao = rep["DATAREVISAO"]
		var obsDesenho = rep["OBSERVACOESDESENHO"]
		
		var pesoBruto = rep["PESOBRUTO"]
		pesoBruto = pesoBruto.toString()
		pesoBruto = pesoBruto.replace(".",",")
		
		var pesoLiquido = rep["PESOLIQUIDO"]
		pesoLiquido = pesoLiquido.toString()
		pesoLiquido = pesoLiquido.replace(".",",")
		
		var perimetroCorte = rep["PERIMETROCORTE"]
		perimetroCorte = perimetroCorte.toString()
		perimetroCorte = perimetroCorte.replace(".",",")
		
		var areaPintura = rep["AREAPINTURA"]
		areaPintura = areaPintura.toString()
		areaPintura = areaPintura.replace(".",",")
		
		var obsProcesso = rep["OBSPROCESSO"]
		var obsGeral = rep["OBSGERAL"]
		var tipoDesenho = rep["TIPODESENHO"]
		
		var areaSecao = rep["AREASECAO"]
		areaSecao = areaSecao.toString()
		areaSecao = areaSecao.replace(".",",")
		
		var altura = rep["ALTURA"]
		altura = altura.toString()
		altura = altura.replace(".",",")
		
		var larguraAba = rep["LARGURAABA"]
		larguraAba = larguraAba.toString()
		larguraAba = larguraAba.replace(".",",")
		
		var espAlma = rep["ESPALMA"]
		espAlma = espAlma.toString()
		espAlma = espAlma.replace(".",",")
		
		var espAba = rep["ESPABA"]
		espAba = espAba.toString()
		espAba = espAba.replace(".",",")
		
		var material = rep["MATERIAL"]
		var indice = rep["INDICE"]
		var produtoRM = rep['PRODUTORM']
		var ordem = rep["ORDEM"]
		var undMedida = rep["UNDMEDIDA"]
		var idPrd = rep["IDPRD"]
		var codigoPrd = rep["CODIGOPRD"]
		var integrado = rep["INTEGRADO"]
		var observacoes = rep["OBSERVACOES"]
		var seq = rep["SEQ"]
		var codigoTarefa = rep["CODIGOTAREFADESC"]
		var nomeTrfItem = rep["NOMETRFITEM"]
		var codTrfItem = rep["CODTRFITEM"]
		var idTrfItem = rep["IDTRFITEM"]
		var numDocDelp = rep["NUMDOCDELP"]
		var revisaoDocDelp = rep["REVISAODOCDELP"]
		var diametroExtDisco = rep["DIAMETROEXTERNODISCO"]
		var diametroIntDisco = rep["DIAMETROINTERNODISCO"]
		var codcoligada = rep["CODCOLIGADA"]
		
		var idCriacao = rep["IDCRIACAO"]
		var idCriacaoReal = rep["IDCRIACAO"]
		
		// VERIFICA SE IDCRAÇÃO JÁ FOI USADO EM OUTRA SOLICITAÇÃO DE RETRABALHO E CRIA O NOVO IDCRIACAO
		idCriacao = verificaIdCriacaoRetrabalho(idCriacao)
		
		// SE IDPRD FOI ENCONTRADO
		if(!(idPrd=="" || idPrd==null || idPrd==undefined || idPrd=="null")){
			
			// CONSTRÓI A CONSULTA DO DATASET
			var d1 = DatasetFactory.createConstraint("IDPRD",idPrd,idPrd,ConstraintType.MUST)
			var d2 = DatasetFactory.createConstraint("CODCOLIGADA",codcoligada,codcoligada,ConstraintType.MUST)
			
			var constraints2 = new Array(d1,d2)
			var dataset2 = DatasetFactory.getDataset("dsBuscaProdutoRM",null,constraints2,null)
		
			var row2 = dataset2.values[0]
			
			if(!(row2["PRODUTO"]=="" || row2["PRODUTO"]==null || row2["PRODUTO"]==undefined || row2["PRODUTO"]=="null")){
				$("#F_PRODUTO_RM").val(row2["PRODUTO"])
			}
			
		}
		
		if(!(numDocDelp=="" || numDocDelp==null || numDocDelp==undefined || numDocDelp=="null")){
			$("#F_NUMDOCDELP").val(numDocDelp)
		}
		if(!(revisaoDocDelp=="" || revisaoDocDelp==null || revisaoDocDelp==undefined || revisaoDocDelp=="null")){
			$("#F_REVISAODOCDELP").val(revisaoDocDelp)
		}
		if(!(nivel=="" || nivel==null || nivel==undefined || nivel=="null")){
			$("#F_NIVEL").val(nivel)
		}
		if(!(undMedida=="" || undMedida==null || undMedida==undefined || undMedida=="null")){
			$("#F_UNDMEDIDA").val(undMedida)
		}
		if(!(posicaoIndice=="" || posicaoIndice==null || posicaoIndice==undefined || posicaoIndice=="null")){
			$("#F_POSICAOINDICE").val(posicaoIndice)
		}
		if(!(indiceAntigo=="" || indiceAntigo==null || indiceAntigo==undefined || indiceAntigo=="null")){
			$("#F_INDICEANTIGO").val(indiceAntigo)
		}
		if(!(indice=="" || indice==null || indice==undefined || indice=="null")){
			$("#F_INDICE").val(indice)
		}
		if(!(posicaoDesenho=="" || posicaoDesenho==null || posicaoDesenho==undefined || posicaoDesenho=="null")){
			$("#F_POSICAODESENHO").val(posicaoDesenho)
		}
		if(!(numdbi=="" || numdbi==null || numdbi==undefined || numdbi=="null")){
			$("#F_NUMDBI").val(numdbi)
		}
		if(!(revisaodbi=="" || revisaodbi==null || revisaodbi==undefined || revisaodbi=="null")){
			$("#F_REVISAODBI").val(revisaodbi)
		}
		if(!(numdesenho=="" || numdesenho==null || numdesenho==undefined || numdesenho=="null")){
			$("#F_NUMDESENHO").val(numdesenho)
		}
		if(!(revisaodesenho=="" || revisaodesenho==null || revisaodesenho==undefined || revisaodesenho=="null")){
			$("#F_REVISAODESENHO").val(revisaodesenho)
		}
		/*if(!(desqtde=="" || desqtde==null || desqtde==undefined || desqtde=="null")){
			$("#F_DESQTDE").val(desqtde)
		}
		if(!(totalqtde=="" || totalqtde==null || totalqtde==undefined || totalqtde=="null")){
			$("#F_TOTALQTDE").val(totalqtde)	
		}*/
		if(!(descricao=="" || descricao==null || descricao==undefined || descricao=="null")){
			$("#F_DESCRICAO").val(descricao)	
		}
		if(!(bitola=="" || bitola==null || bitola==undefined || bitola=="null")){
			$("#F_BITOLA").val(bitola)	
		}
		if(!(espessura=="" || espessura==null || espessura==undefined || espessura=="null")){
			$("#F_ESPESSURA").val(espessura)	
		}
		if(!(largura=="" || largura==null || largura==undefined || largura=="null")){
			$("#F_LARGURA").val(largura)	
		}
		if(!(massaLinear=="" || massaLinear==null || massaLinear==undefined || massaLinear=="null")){
			$("#F_MASSALINEAR").val(massaLinear)	
		}
		if(!(esprosca=="" || esprosca==null || esprosca==undefined || esprosca=="null")){
			$("#F_ESPROSCA").val(esprosca)	
		}
		if(!(comprimento=="" || comprimento==null || comprimento==undefined || comprimento=="null")){
			$("#F_COMPRIMENTO").val(comprimento)	
		}
		if(!(material=="" || material==null || material==undefined || material=="null")){
			$("#F_MATERIAL").val(material)	
		}
		/*(if(!(produtoRM=="" || produtoRM==null || produtoRM==undefined || produtoRM=="null")){
			$("#F_PRODUTO_RM").val(produtoRM)	
		}*/
		if(!(idPrd=="" || idPrd==null || idPrd==undefined || idPrd=="null")){
			$("#F_IDPRD").val(idPrd)	
		}
		if(!(codigoPrd=="" || codigoPrd==null || codigoPrd==undefined || codigoPrd=="null")){
			$("#F_CODIGOPRD").val(codigoPrd)	
		}
		if(!(idCriacao=="" || idCriacao==null || idCriacao==undefined || idCriacao=="null")){
			$("#F_IDCRIACAO").val(idCriacao)	
		}
		if(!(idCriacaoReal=="" || idCriacaoReal==null || idCriacaoReal==undefined || idCriacaoReal=="null")){
			$("#F_IDCRIACAOREAL").val(idCriacaoReal)	
		}
		if(!(observacoes=="" || observacoes==null || observacoes==undefined || observacoes=="null")){
			$("#F_OBSERVACOES").val(observacoes)	
		}
		if(!(seq=="" || seq==null || seq==undefined || seq=="null")){
			$("#F_SEQ").val(seq)	
		}
		if(!(numOS=="" || numOS==null || numOS==undefined || numOS=="null")){
			$("#F_OS").val(numOS)	
		}
		if(!(diametroInterno=="" || diametroInterno==null || diametroInterno==undefined || diametroInterno=="null")){
			$("#F_DIAMETROEXTERNO").val(diametroInterno)	
		}
		if(!(diametroExterno=="" || diametroExterno==null || diametroExterno==undefined || diametroExterno=="null")){
			$("#F_DIAMETROINTERNO").val(diametroExterno)	
		}
		if(!(dataRevisao=="" || dataRevisao==null || dataRevisao==undefined || dataRevisao=="null")){
			$("#F_DATAREVISAO").val(dataRevisao)	
		}
		if(!(obsDesenho=="" || obsDesenho==null || obsDesenho==undefined || obsDesenho=="null")){
			$("#F_OBSERVACOESDESENHO").val(obsDesenho)	
		}
		/*if(!(pesoBruto=="" || pesoBruto==null || pesoBruto==undefined || pesoBruto=="null")){
			$("#F_PESOBRUTO").val(pesoBruto)	
		}
		if(!(pesoLiquido=="" || pesoLiquido==null || pesoLiquido==undefined || pesoLiquido=="null")){
			$("#F_PESOLIQUIDO").val(pesoLiquido)	
		}*/
		if(!(perimetroCorte=="" || perimetroCorte==null || perimetroCorte==undefined || perimetroCorte=="null")){
			$("#F_PERIMETROCORTE").val(perimetroCorte)	
		}
		if(!(areaPintura=="" || areaPintura==null || areaPintura==undefined || areaPintura=="null")){
			$("#F_AREAPINTURA").val(areaPintura)	
		}
		if(!(obsProcesso=="" || obsProcesso==null || obsProcesso==undefined || obsProcesso=="null")){
			$("#F_OBSPROCESSO").val(obsProcesso)	
		}
		if(!(obsGeral=="" || obsGeral==null || obsGeral==undefined || obsGeral=="null")){
			$("#F_OBSGERAL").val(obsGeral)	
		}
		if(!(tipoDesenho=="" || tipoDesenho==null || tipoDesenho==undefined || tipoDesenho=="null")){
			$("#VALOR_RADIO2").val(tipoDesenho)
		}
		if(!(areaSecao=="" || areaSecao==null || areaSecao==undefined || areaSecao=="null")){
			$("#F_AREASECAO").val(areaSecao)	
		}
		if(!(altura=="" || altura==null || altura==undefined || altura=="null")){
			$("#F_ALTURA").val(altura)	
		}
		if(!(larguraAba=="" || larguraAba==null || larguraAba==undefined || larguraAba=="null")){
			$("#F_LARGURAABA").val(larguraAba)	
		}
		if(!(espAlma=="" || espAlma==null || espAlma==undefined || espAlma=="null")){
			$("#F_ESPALMA").val(espAlma)	
		}
		if(!(espAba=="" || espAba==null || espAba==undefined || espAba=="null")){
			$("#F_ESPABA").val(espAba)	
		}
		if(!(codigoTarefa=="" || codigoTarefa==null || codigoTarefa==undefined || codigoTarefa=="null")){
			$("#F_CODIGOTAREFA").val(codigoTarefa)	
		}
		if(!(nomeTrfItem=="" || nomeTrfItem==null || nomeTrfItem==undefined || nomeTrfItem=="null")){
			$("#F_NOMETRFITEM").val(nomeTrfItem)	
		}
		if(!(codTrfItem=="" || codTrfItem==null || codTrfItem==undefined || codTrfItem=="null")){
			$("#F_CODTRFITEM").val(codTrfItem)	
		}
		if(!(idTrfItem=="" || idTrfItem==null || idTrfItem==undefined || idTrfItem=="null")){
			$("#F_IDTRFITEM").val(idTrfItem)	
		}
		if(!(diametroExtDisco=="" || diametroExtDisco==null || diametroExtDisco==undefined || diametroExtDisco=="null")){
			$("#F_DIAMETROEXTERNODISCO").val(diametroExtDisco)	
		}
		if(!(diametroIntDisco=="" || diametroIntDisco==null || diametroIntDisco==undefined || diametroIntDisco=="null")){
			$("#F_DIAMETROINTERNODISCO").val(diametroIntDisco)	
		}
		
		/*var comporLista = rep["COMPORLISTA"]
		
		// SE ITEM IRÁ COMPOR A LISTA
		if(comporLista=="SIM"){
			
			 $("#F_COMPORLISTA").prop("checked", true);
			
		} else {
			
			 $("#F_COMPORLISTA").prop("checked", false);
			
		}
		
		$("#F_COMPORLISTA").prop("disabled", true);*/
		$("#RAD2_ACABADO").prop("disabled",true)
		$("#RAD2_SEMI").prop("disabled",true)
		$("#F_UNDMEDIDA").prop("disabled",true)
		
		var tipoDesenho = rep["TIPODESENHO"]
	
		// SE TIPO DO DESENHO FOR ACABADO
		if(tipoDesenho=='ACABADO'){
		
			$("#RAD2_ACABADO").prop("checked",true)
			
		}
		
		// SE TIPO DO DESENHO FOR SEMIACABADO
		if(tipoDesenho=='SEMIACABADO'){
			
			$("#RAD2_SEMI").prop("checked",true)
			
		}
		
		// PREENCHE A TABELA COMPONENTES DO ITEM SELECIONADO QUE ESTÃO NA LISTA DE MATERIAIS
		//preencheTabelaComponentesListaMateriais(idCriacao)
		
		// PREENCHE A TABELA COMPONENTES DO ITEM SELECIONADO
		//preencheTabelaComponentes(idCriacao)
		
		// PREENCHE A TABELA COMPONENTES DO ITEM SELECIONADO
		//preencheTabelaProcessos(idCriacao)
		
		// EXIBE O CONTEÚDO DO FORMULÁRIO
		$(".FORMULARIO").show()
		$("#DIV_INDICECOPIA").hide()
		$(".CABECALHO").hide()
		
		return true
		
	} else {
		// SE NÃO
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'O item não foi encontrado com os dados informados',
			  text: 'Verifique e tente novamente.'
		})
		
		console.log("as informações do item não foram localizadas")
		
		return false
		
	}
	
}

// VERIFICA SE IDCRAÇÃO JÁ FOI USADO EM OUTRA SOLICITAÇÃO DE RETRABALHO E CRIA O NOVO IDCRIACAO
function verificaIdCriacaoRetrabalho(idCriacao){
	
	console.log("vou buscar e gerar o idCriacao de Retrabalho")
	
	var tem = true
	
	var numOS = $("#NUM_OS").val()
	
	// ENQUANTO IDCRIACAO DE RETRABALHO JÁ TIVER SIDO UTILIZADO
	while(tem){
		
		idCriacao = idCriacao+"R"
		
		var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
		var c2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
		
		var constraints = new Array(c1,c2)
		var dataset = DatasetFactory.getDataset("dsVerificaIdCriacaoRetrabalho",null,constraints,null)
		var row = dataset.values
		
		// SE RETORNO É VAZIO OU NULO
		if(row=="" || row==null || row==undefined){
			
			tem = false
			
		}
		
	}
	
	console.log("idCriacao: "+idCriacao)
	
	return idCriacao
	
}

// CANCELA E RETORNA PARA A TELA INICIAL DA BUSCA
function cancelar(){
	
	// EXIBE ALERTA
	Swal.fire({
	
		  title: 'Tem certeza que cancelar esse retrabalho?',
		  text: "Atenção, todas as informações não serão salvas e integradas.",
		  icon: 'warning',
		  showCancelButton: true,
		  allowEscapeKey: true,
		  allowOutsideClick: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Sim',
		  cancelButtonText: 'Cancelar',
		
	}).then(function(result){
		
		  // SE SIM
		  if (result.value) {
			
			// LIMPA O CONTEÚDO DO FORMULÁRIO
			limpaForm()
			  
			// LIMPA TODOS OS CAMPOS ZOOM
			$("#OS_INFO>option").remove()
			$("#OP_INFO>option").remove()
			
			// DESABILITA O CAMPO OP
			$("#OP_INFO").prop("disabled",true)
			
			// LIMPA OS CAMPOS OCULTOS
			$("#NUM_OS").val("")
			$("#CODCOLIGADA").val("")
			$("#CODFILIAL").val("")
			$("#CODORDEM").val("")
			
			// ESCONDE/EXIBE OS CAMPOS NECESSÁRIOS
			$(".FORMULARIO").hide()
			$(".DIV_INDICECOPIA").hide()
			$(".CABECALHO").show()
			  
		  }
		  
	})
	
}

// LIMPA O CONTEÚDO DO FORMULÁRIO
function limpaForm(){
	
	$("#F_NUMDOCDELP").val("")
	$("#F_REVISAODOCDELP").val("")
	$("#F_NIVEL").val("")
	$("#F_UNDMEDIDA").val("")
	$("#F_POSICAOINDICE").val("")
	$("#F_INDICEANTIGO").val("")
	$("#F_INDICE").val("")
	$("#F_POSICAODESENHO").val("")
	$("#F_NUMDBI").val("")
	$("#F_REVISAODBI").val("")
	$("#F_NUMDESENHO").val("")
	$("#F_REVISAODESENHO").val("")
	$("#F_DESQTDE").val("")
	$("#F_TOTALQTDE").val("")
	$("#F_DESCRICAO").val("")	
	$("#F_BITOLA").val("")	
	$("#F_ESPESSURA").val("")	
	$("#F_LARGURA").val("")	
	$("#F_MASSALINEAR").val("")	
	$("#F_ESPROSCA").val("")	
	$("#F_COMPRIMENTO").val("")	
	$("#F_MATERIAL").val("")	
	$("#F_PRODUTO_RM").val("")	
	$("#F_IDPRD").val("")	
	$("#F_CODIGOPRD").val("")	
	$("#F_IDCRIACAO").val("")	
	$("#F_OBSERVACOES").val("")	
	$("#F_SEQ").val("")	
	$("#F_OS").val("")	
	$("#F_DIAMETROEXTERNO").val("")	
	$("#F_DIAMETROINTERNO").val("")	
	$("#F_DATAREVISAO").val("")	
	$("#F_OBSERVACOESDESENHO").val("")	
	$("#F_PESOBRUTO").val("")	
	$("#F_PESOLIQUIDO").val("")	
	$("#F_PERIMETROCORTE").val("")	
	$("#F_AREAPINTURA").val("")	
	$("#F_OBSPROCESSO").val("")	
	$("#F_OBSGERAL").val("")	
	$("#VALOR_RADIO2").val("")
	$("#F_AREASECAO").val("")	
	$("#F_ALTURA").val("")	
	$("#F_LARGURAABA").val("")	
	$("#F_ESPALMA").val("")	
	$("#F_ESPABA").val("")	
	$("#F_CODIGOTAREFA").val("")	
	$("#F_NOMETRFITEM").val("")	
	$("#F_CODTRFITEM").val("")	
	$("#F_IDTRFITEM").val("")	
	$("#F_DIAMETROEXTERNODISCO").val("")	
	$("#F_DIAMETROINTERNODISCO").val("")	
	$("#F_COMPORLISTA").prop("checked", false);	
	$("#RAD2_ACABADO").prop("checked",false)
	$("#RAD2_SEMI").prop("checked",false)
	$("#VALOR_RADIO2").val("")

	// LIMPA A TABELA DE COMPONENTES
	limparTabelaComponentes()
	
	// LIMPA TODO O CONTEÚDO DA TABELA DE COMPONENTES
	limparTabelaProcessos()
	
}

// PREENCHE A TABELA COMPONENTES DO ITEM SELECIONADO QUE ESTÃO NA LISTA DE MATERIAIS
function preencheTabelaComponentesListaMateriais(idCriacao){
	
	console.log("entrei para preencher a VIEW de componentes")
	
	var numOS = $("#NUM_OS").val()
	
	console.log("vou buscar os materiais que foram salvos na lista")	
	
	var c1 = DatasetFactory.createConstraint("NUMOSSALVOS",numOS,numOS,ConstraintType.MUST)
	var c2 = DatasetFactory.createConstraint("IDCRIACAOSALVOS",idCriacao,idCriacao,ConstraintType.MUST)
	
	var constraints = new Array(c1,c2)
	var dataset = DatasetFactory.getDataset("dsBuscaComponentesListaOS",null,constraints,null)
	var row = dataset.values
	console.log("row "+row)
	
	// SE RETORNO DA CONSULTA NÃO É VAZIO
	if(!(row==null || row=="" || row==undefined || row=="null")){
		
		console.log("ENCONTREI")
		
		var count = dataset.values.length
		
		// PERCORRE TODOS OS REGISTROS ENCONTRADOS
		for(var i=0; i<count; i++){
			
			var rep = row[i]
			
			console.log(rep)
			
			var idprd1 = ""
			var idprd2 = ""
			var idprd3 = ""
			var idprd4 = ""
			var idprd5 = ""
			var idprd6 = ""
			
			// SE INFORMAÇÕES FORAM PREENCHIDAS NA LISTA, SALVA NAS VARIÁVEIS
				
			if(!(rep["IDPRD1SALVOS"]=="" || rep["IDPRD1SALVOS"]==null || rep["IDPRD1SALVOS"]==undefined)){
				idprd1 = rep["IDPRD1SALVOS"]
			}
			
			if(!(rep["IDPRD2SALVOS"]=="" || rep["IDPRD2SALVOS"]==null || rep["IDPRD2SALVOS"]==undefined)){
				idprd2 = rep["IDPRD2SALVOS"]
			}
			
			if(!(rep["IDPRD3SALVOS"]=="" || rep["IDPRD3SALVOS"]==null || rep["IDPRD3SALVOS"]==undefined)){
				idprd3 = rep["IDPRD3SALVOS"]
			}
			
			if(!(rep["IDPRD4SALVOS"]=="" || rep["IDPRD4SALVOS"]==null || rep["IDPRD4SALVOS"]==undefined)){
				idprd4 = rep["IDPRD4SALVOS"]
			}
			
			if(!(rep["IDPRD5SALVOS"]=="" || rep["IDPRD5SALVOS"]==null || rep["IDPRD5SALVOS"]==undefined)){
				idprd5 = rep["IDPRD5SALVOS"]
			}
			
			if(!(rep["IDPRD6SALVOS"]=="" || rep["IDPRD6SALVOS"]==null || rep["IDPRD6SALVOS"]==undefined)){
				idprd6 = rep["IDPRD62SALVOS"]
			}
			
			console.log("idprd1: "+idprd1+", idprd2: "+idprd2+", idprd3: "+idprd3+", idprd4: "+idprd4+
					", idprd5: "+idprd5+", idprd6: "+idprd6)
			
			// SE INFORMAÇÃO FOI PREENCHIDA
			if(!(idprd1=="" || idprd1==null || idprd1=="null")){
				
				//var rowNova = addComponente(rep["IDCRIACAOSALVOS"])
				var rowNova = addViewComponente()
				console.log("criei item tabela componentes "+rowNova)
				
				// SALVA AS INFORMAÇÕES NA TABELA
				$("#VIEWIDPRDCOMPONENTES___"+rowNova).val(idprd1)
				$("#VIEWPRODUTOCOMPONENTES___"+rowNova).val(rep["PRODUTORM1SALVOS"])
				$("#VIEWCODIGOPRDCOMPONENTES___"+rowNova).val(rep["CODIGOPRD1SALVOS"])
				$("#VIEWCODUNDCOMPONENTES___"+rowNova).val(rep["UNDPRD1SALVOS"])
				$("#VIEWIDCRIACAOCOMPONENTES___"+rowNova).val(rep["IDCRIACAOSALVOS"])
				console.log("insumo: "+rep["DESCRICAOSALVOS"]+" "+rep["MATERIALSALVOS"]+" "+rep["BITOLASALVOS"])
				var insumo = ""+rep["DESCRICAOSALVOS"]+" "+rep["MATERIALSALVOS"]+" "+rep["BITOLASALVOS"]+""
				$("#VIEWINSUMOCOMPONENTES___"+rowNova).val(insumo)
				$("#VIEWLISTACOMPONENTES___"+rowNova).val("L")
				
				// BUSCA QUANTIDADES DOS COMPONENTES
				buscaQtdeComponentes(rep["IDCRIACAOSALVOS"], rowNova)
				
			}
			
			// SE INFORMAÇÃO FOI PREENCHIDA
			if(!(idprd2=="" || idprd2==null || idprd2=="null")){
				
				//var rowNova = addComponente(rep["IDCRIACAOSALVOS"])
				var rowNova = addViewComponente()
				console.log("criei item tabela componentes "+rowNova)
				
				console.log("idprd2: "+idprd2+", produtorm2salvos: "+rep["PRODUTORM2SALVOS"]+", codigoprd2salvos: "+rep["CODIGOPRD2SALVOS"]+", undprd2salvos: "+rep["UNDPRD2SALVOS"]+", idcriacaosalvos: "+
					rep["IDCRIACAOSALVOS"]+", descricaosalvos: "+rep["DESCRICAOSALVOS"]+", materialsalvos: "+rep["MATERIALSALVOS"]+", bitolasalvos: "+rep["BITOLASALVOS"]+", insumo: "+
					insumo+", substituto: "+rep["CODIGOPRD1SALVOS"])
				
				$("#VIEWIDPRDCOMPONENTES___"+rowNova).val(idprd2)
				$("#VIEWPRODUTOCOMPONENTES___"+rowNova).val(rep["PRODUTORM2SALVOS"])
				$("#VIEWCODIGOPRDCOMPONENTES___"+rowNova).val(rep["CODIGOPRD2SALVOS"])
				$("#VIEWCODUNDCOMPONENTES___"+rowNova).val(rep["UNDPRD2SALVOS"])
				$("#VIEWIDCRIACAOCOMPONENTES___"+rowNova).val(rep["IDCRIACAOSALVOS"])
				console.log("insumo: "+rep["DESCRICAOSALVOS"]+" "+rep["MATERIALSALVOS"]+" "+rep["BITOLASALVOS"])
				var insumo = ""+rep["DESCRICAOSALVOS"]+" "+rep["MATERIALSALVOS"]+" "+rep["BITOLASALVOS"]+""
				$("#VIEWINSUMOCOMPONENTES___"+rowNova).val(insumo)
				$("#VIEWLISTACOMPONENTES___"+rowNova).val("L")
				
				// PREENCHE O SELECT COM OS DADOS
				$('#VIEWSUBSTITUTOCOMPONENTES___'+rowNova).append($("<option class='info'>"+rep["CODIGOPRD1SALVOS"]+"</option>").attr("value", rep["CODIGOPRD1SALVOS"]));
				
				$("#VIEWSUBSTITUTOCOMPONENTES___"+rowNova).val(rep["CODIGOPRD1SALVOS"])
								
			}
			
			// SE INFORMAÇÃO FOI PREENCHIDA
			if(!(idprd3=="" || idprd3==null || idprd3=="null")){
				
				//var rowNova = addComponente(rep["IDCRIACAOSALVOS"])
				var rowNova = addViewComponente()
				console.log("criei item tabela componentes "+rowNova)
				
				$("#VIEWIDPRDCOMPONENTES___"+rowNova).val(idprd3)
				$("#VIEWPRODUTOCOMPONENTES___"+rowNova).val(rep["PRODUTORM3SALVOS"])
				$("#VIEWCODIGOPRDCOMPONENTES___"+rowNova).val(rep["CODIGOPRD3SALVOS"])
				$("#VIEWCODUNDCOMPONENTES___"+rowNova).val(rep["UNDPRD3SALVOS"])
				$("#VIEWIDCRIACAOCOMPONENTES___"+rowNova).val(rep["IDCRIACAOSALVOS"])
				console.log("insumo: "+rep["DESCRICAOSALVOS"]+" "+rep["MATERIALSALVOS"]+" "+rep["BITOLASALVOS"])
				var insumo = ""+rep["DESCRICAOSALVOS"]+" "+rep["MATERIALSALVOS"]+" "+rep["BITOLASALVOS"]+""
				$("#VIEWINSUMOCOMPONENTES___"+rowNova).val(insumo)
				$("#VIEWLISTACOMPONENTES___"+rowNova).val("L")
				
				// PREENCHE O SELECT COM OS DADOS
				$('#VIEWSUBSTITUTOCOMPONENTES___'+rowNova).append($("<option class='info'>"+rep["CODIGOPRD1SALVOS"]+"</option>").attr("value", rep["CODIGOPRD1SALVOS"]));
				
				$("#VIEWSUBSTITUTOCOMPONENTES___"+rowNova).val(rep["CODIGOPRD1SALVOS"])
							
			}
			
			// SE INFORMAÇÃO FOI PREENCHIDA
			if(!(idprd4=="" || idprd4==null || idprd4=="null")){
				
				//var rowNova = addComponente(rep["IDCRIACAOSALVOS"])
				var rowNova = addViewComponente()
				console.log("criei item tabela componentes "+rowNova)
				
				$("#VIEWIDPRDCOMPONENTES___"+rowNova).val(idprd4)
				$("#VIEWPRODUTOCOMPONENTES___"+rowNova).val(rep["PRODUTORM4SALVOS"])
				$("#VIEWCODIGOPRDCOMPONENTES___"+rowNova).val(rep["CODIGOPRD4SALVOS"])
				$("#VIEWCODUNDCOMPONENTES___"+rowNova).val(rep["UNDPRD4SALVOS"])
				$("#VIEWIDCRIACAOCOMPONENTES___"+rowNova).val(rep["IDCRIACAOSALVOS"])
				console.log("insumo: "+rep["DESCRICAOSALVOS"]+" "+rep["MATERIALSALVOS"]+" "+rep["BITOLASALVOS"])
				var insumo = ""+rep["DESCRICAOSALVOS"]+" "+rep["MATERIALSALVOS"]+" "+rep["BITOLASALVOS"]+""
				$("#VIEWINSUMOCOMPONENTES___"+rowNova).val(insumo)
				$("#VIEWLISTACOMPONENTES___"+rowNova).val("L")
				
				// PREENCHE O SELECT COM OS DADOS
				$('#VIEWSUBSTITUTOCOMPONENTES___'+rowNova).append($("<option class='info'>"+rep["CODIGOPRD1SALVOS"]+"</option>").attr("value", rep["CODIGOPRD1SALVOS"]));
				
				$("#VIEWSUBSTITUTOCOMPONENTES___"+rowNova).val(rep["CODIGOPRD1SALVOS"])
								
			}
			
			// SE INFORMAÇÃO FOI PREENCHIDA
			if(!(idprd5=="" || idprd5==null || idprd5=="null")){
				
				//var rowNova = addComponente(rep["IDCRIACAOSALVOS"])
				var rowNova = addViewComponente()
				console.log("criei item tabela componentes "+rowNova)
				
				$("#VIEWIDPRDCOMPONENTES___"+rowNova).val(idprd5)
				$("#VIEWPRODUTOCOMPONENTES___"+rowNova).val(rep["PRODUTORM5SALVOS"])
				$("#VIEWCODIGOPRDCOMPONENTES___"+rowNova).val(rep["CODIGOPRD5SALVOS"])
				$("#VIEWCODUNDCOMPONENTES___"+rowNova).val(rep["UNDPRD5SALVOS"])
				$("#VIEWIDCRIACAOCOMPONENTES___"+rowNova).val(rep["IDCRIACAOSALVOS"])
				console.log("insumo: "+rep["DESCRICAOSALVOS"]+" "+rep["MATERIALSALVOS"]+" "+rep["BITOLASALVOS"])
				var insumo = ""+rep["DESCRICAOSALVOS"]+" "+rep["MATERIALSALVOS"]+" "+rep["BITOLASALVOS"]+""
				$("#VIEWINSUMOCOMPONENTES___"+rowNova).val(insumo)
				$("#VIEWLISTACOMPONENTES___"+rowNova).val("L")
				
				// PREENCHE O SELECT COM OS DADOS
				$('#VIEWSUBSTITUTOCOMPONENTES___'+rowNova).append($("<option class='info'>"+rep["CODIGOPRD1SALVOS"]+"</option>").attr("value", rep["CODIGOPRD1SALVOS"]));
				
				$("#VIEWSUBSTITUTOCOMPONENTES___"+rowNova).val(rep["CODIGOPRD1SALVOS"])
								
			}
			
			// SE INFORMAÇÃO FOI PREENCHIDA
			if(!(idprd6=="" || idprd6==null || idprd6=="null")){
				
				//var rowNova = addComponente(rep["IDCRIACAOSALVOS"])
				var rowNova = addViewComponente()
				console.log("criei item tabela componentes "+rowNova)
				
				$("#VIEWIDPRDCOMPONENTES___"+rowNova).val(idprd6)
				$("#VIEWPRODUTOCOMPONENTES___"+rowNova).val(rep["PRODUTORM6SALVOS"])
				$("#VIEWCODIGOPRDCOMPONENTES___"+rowNova).val(rep["CODIGOPRD6SALVOS"])
				$("#VIEWCODUNDCOMPONENTES___"+rowNova).val(rep["UNDPRD6SALVOS"])
				$("#VIEWIDCRIACAOCOMPONENTES___"+rowNova).val(rep["IDCRIACAOSALVOS"])
				console.log("insumo: "+rep["DESCRICAOSALVOS"]+" "+rep["MATERIALSALVOS"]+" "+rep["BITOLASALVOS"])
				var insumo = ""+rep["DESCRICAOSALVOS"]+" "+rep["MATERIALSALVOS"]+" "+rep["BITOLASALVOS"]+""
				$("#VIEWINSUMOCOMPONENTES___"+rowNova).val(insumo)
				$("#VIEWLISTACOMPONENTES___"+rowNova).val("L")
				
				// PREENCHE O SELECT COM OS DADOS
				$('#VIEWSUBSTITUTOCOMPONENTES___'+rowNova).append($("<option class='info'>"+rep["CODIGOPRD1SALVOS"]+"</option>").attr("value", rep["CODIGOPRD1SALVOS"]));
				
				$("#VIEWSUBSTITUTOCOMPONENTES___"+rowNova).val(rep["CODIGOPRD1SALVOS"])
								
			}
			
		}
	
	}
	
}

// PREENCHE A TABELA COMPONENTES DO ITEM EM QUESTÃO
function preencheTabelaComponentes(idCriacao){
	
	console.log("entrei para preencher a VIEW de componentes")
	
	var numOS = $("#NUM_OS").val()
	console.log("numOS "+numOS+", idCriacao "+idCriacao)
		
	var c1 = DatasetFactory.createConstraint("OSCOMPONENTES",numOS,numOS,ConstraintType.MUST)
	var c2 = DatasetFactory.createConstraint("IDCRIACAOCOMPONENTES",idCriacao,idCriacao,ConstraintType.MUST)
	
	var constraints = new Array(c1,c2)
	var dataset = DatasetFactory.getDataset("dsItensComponentesOS",null,constraints,null)
	var row = dataset.values
	
	console.log("row "+row)
	
	// SE RETORNO NÃO É NULO E NEM VAZIO
	if(!(row=="" || row==null || row==undefined || row=="null")){
		
		var count = row.length
		
		// PERCORRE TODOS OS REGISTROS
		for(var i=0; i < count; i++){
			
			var rep = row[i]
			   
			var seq = addViewComponente()
			
			console.log("vou carregar o i tem "+seq)
			
			// SALVA AS INFORMAÇÕES NA TABELA
			$("#VIEWPRODUTOCOMPONENTES___"+seq).val(rep["PRODUTOCOMPONENTES"])
			$("#VIEWIDPRDCOMPONENTES___"+seq).val(rep["IDPRDCOMPONENTES"])
			$("#VIEWCODIGOPRDCOMPONENTES___"+seq).val(rep["CODIGOPRDCOMPONENTES"])
			$("#VIEWCODUNDCOMPONENTES___"+seq).val(rep["CODUNDCOMPONENTES"])
			$("#VIEWIDCRIACAOCOMPONENTES___"+seq).val(rep["IDCRIACAOCOMPONENTES"])
			$("#VIEWQTDEUNCOMPONENTES___"+seq).val(rep["QTDEUNCOMPONENTES"])
			$("#VIEWQTDETOTALCOMPONENTES___"+seq).val(rep["QTDETOTALCOMPONENTES"])
			$("#VIEWINSUMOCOMPONENTES___"+seq).val(rep["INSUMOCOMPONENTES"])
			$("#VIEWLISTACOMPONENTES___"+seq).val(rep["LISTACOMPONENTES"])
			$("#VIEWOSCOMPONENTES___"+seq).val(rep["OSCOMPONENTES"])
			$("#VIEWINCLUIDOCOMPONENTES___"+seq).val(rep["INCLUIDOCOMPONENTES"])
			$("#VIEWEDITADOCOMPONENTES___"+seq).val(rep["EDITADOCOMPONENTES"])
			$("#VIEWINTEGRADOCOMPONENTES___"+seq).val(rep["INTEGRADOCOMPONENTES"])
			$("#VIEWSUBSTITUTOCOMPONENTES___"+seq).val(rep["SUBSTITUTOCOMPONENTES"])
			$("#VIEWPRIORIDADEATVCOMPONENTES___"+seq).val(rep["PRIORIDADEATVCOMPONENTES"])
			
		}
		
		// CARREGA CONTEÚDO DO SELECT DOS SUBSTITUTOS
		//apagaSubstitutosGeral()
		carregaSubstitutosGeral()
		
	}
	
	// CALCULA AS QUANTIDADES DOS COMPONENTES
	calculaQtdesComponentes(idCriacao)
	
}

// CARREGA SELECT DOS SUBSTITUTOS
function carregaSubstitutosGeral(){
	
	var arraySubstitutos = new Array()
	var arraySubLista = new Array()
	
	console.log("entrei para carregar substitutos")
	
	// PERCORRE A TABELA E COLETA TODOS OS REGISTROS
	$('input[id^="VIEWPRODUTOCOMPONENTES___"]').each(function(index, value){
		
		var seq = $(this).attr("id").split("___")[1]	
		
		var produto = $("#VIEWCODIGOPRDCOMPONENTES___"+seq).val()
		var lista = $("#VIEWLISTACOMPONENTES___"+seq).val()
		//var substituto = $("#VIEWSUBSTITUTOCOMPONENTES___"+seq).val()
		
		//console.log("substituto "+substituto)
		
		if(!(lista=="L")){

			arraySubstitutos.push(produto)
			
		} else {
			
			arraySubLista.push(produto)
			
		}
		
	})
	
	console.log("Substitutos: "+arraySubstitutos)
	console.log("Substitutos dos itens da Lista: "+arraySubLista)
	
	// PERCORRE A TABELA E COLETA TODOS OS REGISTROS
	$('input[id^="VIEWPRODUTOCOMPONENTES___"]').each(function(index, value){
		
		var seq = $(this).attr("id").split("___")[1]	
		var produto = $("#VIEWCODIGOPRDCOMPONENTES___"+seq).val()
		var lista = $("#VIEWLISTACOMPONENTES___"+seq).val()
		//var substituto = $("#VIEWSUBSTITUTOCOMPONENTES___"+seq).val()
		
		//console.log("vou apendar o "+substituto)
		
		//if(!(lista=="L")){
			
		if(!(lista=="L")){
			
			// PERCORRE TODOS OS ITENS DO ARRAY
			for(var i=0; i<arraySubstitutos.length; i++){
	
				if(!(produto==arraySubstitutos[i])){
					
					// PREENCHE O SELECT COM OS DADOS
					$('#VIEWSUBSTITUTOCOMPONENTES___'+seq).append($("<option class='info'></option>").attr("value", arraySubstitutos[i]).text(arraySubstitutos[i]));
					
				}
				
			}
		
		}
		
		if(lista=="L"){
		
			// PERCORRE TODOS OS ITENS DO ARRAY
			for(var i=0; i<arraySubLista.length; i++){
				
				if(!(produto==arraySubLista[i])){
					
					// PREENCHE O SELECT COM OS DADOS
					$('#VIEWSUBSTITUTOCOMPONENTES___'+seq).append($("<option class='info'></option>").attr("value", arraySubLista[i]).text(arraySubLista[i]));
					
				}
				
			}
		
		}
		
	})
	
}

// CALCULA A QUANTIDADE DA TABELA DE COMPONENTES
function calculaQtdesComponentes(idCriacao){
	
	console.log("entrei para calcular as quantidades dos componentes")
	
	var pesoBruto = $("#F_PESOBRUTO").val()
	console.log("PESOBRUTO: "+pesoBruto)
	var totalQtde = $("#F_TOTALQTDE").val()
	console.log("PESOBRUTO: "+pesoBruto)
	
	totalQtde = parseInt(totalQtde)
	console.log("TOTALQTDE: "+totalQtde)
	pesoBruto = pesoBruto.replace(",",".")
	//pesoBruto = parseFloat(pesoBruto)
	console.log("PESOBRUTO: "+pesoBruto)
	
	var qtdeUnit = pesoBruto/totalQtde
	console.log("QTDEUNIT "+qtdeUnit)
	//qtdeUnit = parseFloat(qtdeUnit)
	qtdeUnit = qtdeUnit.toFixed(4)
	console.log("QTDEUNIT "+qtdeUnit)
	qtdeUnit = qtdeUnit.toString()
	qtdeUnit = qtdeUnit.replace(".",",")
	var qtdeTotal = pesoBruto

	if(qtdeTotal=="NaN" || qtdeTotal==NaN){
		
		qtdeTotal = ""
		
	}
	
	if(qtdeUnit=="NaN" || qtdeUnit==NaN){
		
		qtdeUnit = ""
		
	}
	
	// PERCORRE A TABELA E COLETA TODOS OS REGISTROS
	$('input[id^="VIEWPRODUTOCOMPONENTES___"]').each(function(index, value){
		
		console.log("ENTREI PARA PERCORRER A TABELA")
		
		var seq = $(this).attr("id").split("___")[1]	
		
		var substituto = $("#VIEWSUBSTITUTOCOMPONENTES___"+seq).val()
		var lista = $("#VIEWLISTACOMPONENTES___"+seq).val()
		
		if(!(substituto=="" || substituto==null || substituto==undefined) && !(lista=="L")){
			
			console.log("SUBSTITUTO NÃO ESTÁ VAZIO E NÃO VEIO DA LISTA")
			
			$("#VIEWQTDEUNCOMPONENTES___"+seq).val("")
			$("#VIEWQTDETOTALCOMPONENTES___"+seq).val("")
			$("#VIEWQTDEUNCOMPONENTES___"+seq).prop("readonly",true)
			$("#VIEWQTDETOTALCOMPONENTES___"+seq).prop("readonly",true)
			
		}
		
		if((substituto=="" || substituto==null || substituto==undefined) && !(lista=="L")){
			
			console.log("SUBSTITUTO VAZIO E NÃO VEIO DA LISTA")
			
			$("#VIEWQTDEUNCOMPONENTES___"+seq).prop("readonly",false)
			$("#VIEWQTDETOTALCOMPONENTES___"+seq).prop("readonly",false)
			
		}
		
		// SE SUBSTITUTO NÃO FOI SELECIONADO E VEIO DA LISTA
		if((substituto=="" || substituto==null || substituto==undefined) && (lista=="L")){
		
			console.log("SUBSTITUTO VAZIO E VEIO DA LISTA")
			console.log("VOU INCLUIR QTDEUNIT "+qtdeUnit+" E QTDETOTAL "+qtdeTotal)
			$("#VIEWQTDEUNCOMPONENTES___"+seq).val(qtdeUnit)
			$("#VIEWQTDETOTALCOMPONENTES___"+seq).val(qtdeTotal)
		
		}
		
	})

}

//BUSCA OS VALORES DAS QUANTIDADES DOS ITENS E FAZ OS CALCULOS
function buscaQtdeComponentes(idCriacao,row){
	
	var numOS = $("#NUM_OS").val()
	
	var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
	var a2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST);
	
	var constraints = new Array(a1,a2);
	
	dataset = DatasetFactory.getDataset("dsBuscaQtdeItemOS",null,constraints,null);
	
	var valor = dataset.values
	
	var rep = valor[0]
	
	pesoBruto = rep["PESOBRUTO"]
	totalQtde = rep["TOTALQTDE"]
	
	totalQtde = parseInt(totalQtde)
	pesoBruto = parseFloat(pesoBruto)
	pesoBruto = pesoBruto.toFixed(4)
	
	qtdeUnit = pesoBruto/totalQtde
	qtdeUnit = parseFloat(qtdeUnit)
	qtdeUnit = qtdeUnit.toFixed(4)
	qtdeUnit = qtdeUnit.toString()
	qtdeUnit = qtdeUnit.replace(".",",")
	qtdeTotal = pesoBruto
	
	$("#VIEWQTDEUNCOMPONENTES___"+row).val(qtdeUnit)
	$("#VIEWQTDETOTALCOMPONENTES___"+row).val(qtdeTotal)
	
}

// INCLUI UM NOVO ITEM NA TABELA VIEW DE COMPONENTES
function addViewComponente(){
	
	console.log("Entrei para adicionar um item na tabela VIEW de Componentes")
	
	var row = wdkAddChild('VIEWTABELACOMPONENTES')
	
	var idCriacao = $("#F_IDCRIACAO").val()
	var numOS = $("#NUM_OS").val()
	var idComponentes = buscaIdComponentes(idCriacao)
	
	console.log("VOU SALVAR A OS "+numOS+" NA TABELA VIEW COMPONENTES")
	
	$("#VIEWIDCRIACAOCOMPONENTES___"+row).val(idCriacao)
	$("#VIEWOSCOMPONENTES___"+row).val(numOS)
	$("#VIEWIDCOMPONENTES___"+row).val(idComponentes)
	
	return row
	 
}

// INCLUI UM NOVO ITEM NA TABELA VIEW DE PROCESSOS
function addViewProcesso(){
	
	console.log("Entrei para adicionar um item na tabela VIEW de PROCESSOS")
	
	var row = wdkAddChild('VIEWTABELAPROCESSO')
	var idCriacao = $("#F_IDCRIACAO").val()
	var numOS = $("#NUM_OS").val()
	var idProcesso = buscaIdProcesso(idCriacao)
	
	console.log("VOU SALVAR A OS "+numOS+" NA TABELA VIEW PROCESSOS")
	
	$("#VIEWIDCRIACAOPROCESSO___"+row).val(idCriacao)
	$("#VIEWOSPROCESSO___"+row).val(numOS)
	$("#VIEWIDPROCESSO___"+row).val(idProcesso)
	$("#EXPANDIR___"+row).hide()

	$("#VIEWPRIORIDADE___"+row).focus()

	var qtdprocess = $("tr[id^='LINHAVIEWPROCESSO___']").length
	if(qtdprocess > 1){


		$("#NUMRNC___"+row).val($(".VIEWTABELAPROCESSO").find("input[id^='NUMRNC___']")[0].value)

		// RNC OU RR *
		var codcliente = $(".VIEWTABELAPROCESSO").find("input[id^='CODCLIENTERNCRR___']")[0].value;

		if(codcliente!=null && codcliente!="" && codcliente!=undefined){

			$("#CODCLIENTERNCRR___"+row).val(codcliente)
			var desccliente = $(".VIEWTABELAPROCESSO").find("input[id^='DESCRNCRR___']")[0].value;
			$("#DESCRNCRR___"+row).val(desccliente)
			window["RNCRR___"+row].setValue(codcliente + " - " + desccliente);

		}

		// CAUSADOR
		codcliente = $(".VIEWTABELAPROCESSO").find("input[id^='CODCLIENTECAUSADOR___']")[0].value;

		if(codcliente!=null && codcliente!="" && codcliente!=undefined){
		
			$("#CODCLIENTECAUSADOR___"+row).val(codcliente)
			desccliente = $(".VIEWTABELAPROCESSO").find("input[id^='DESCCAUSADOR___']")[0].value;
			$("#DESCCAUSADOR___"+row).val(desccliente)
			window["CAUSADOR___"+row].setValue(codcliente + " - " + desccliente);

		}

		// CODIGO DA CAUSA
		codcliente = $(".VIEWTABELAPROCESSO").find("input[id^='CODCLIENTECAUSA___']")[0].value;

		if(codcliente!=null && codcliente!="" && codcliente!=undefined){
			
			$("#CODCLIENTECAUSA___"+row).val(codcliente)
			desccliente = $(".VIEWTABELAPROCESSO").find("input[id^='DESCCAUSA___']")[0].value;
			$("#DESCCAUSA___"+row).val(desccliente)
			window["CAUSA___"+row].setValue(codcliente + " - " + desccliente);

		}


	}
	
	return row
	 
}

function RepeteCampos(obj){

	var qtdprocess = $("tr[id^='LINHAVIEWPROCESSO___']").length

	var row = $(obj).attr("id").split("___")[1]

	if(qtdprocess > 1){

		$("tr[id^='LINHAVIEWPROCESSO___']").each(function(){

			var seq = $(this).attr("id").split("___")[1]

			$("#NUMRNC___"+seq).val($("#NUMRNC___"+row).val())

			// RNC OU RR *
			var codcliente = $("#CODCLIENTERNCRR___"+row).val()

			if(codcliente!=null && codcliente!="" && codcliente!=undefined){

				$("#CODCLIENTERNCRR___"+seq).val(codcliente)
				var desccliente = $("#DESCRNCRR___"+row).val()
				$("#DESCRNCRR___"+seq).val(desccliente)
				window["RNCRR___"+seq].setValue(codcliente + " - " + desccliente);

			}

			// CAUSADOR
			codcliente = $("#CODCLIENTECAUSADOR___"+row).val()

			if(codcliente!=null && codcliente!="" && codcliente!=undefined){
			
				$("#CODCLIENTECAUSADOR___"+seq).val(codcliente)
				desccliente = $("#DESCCAUSADOR___"+row).val()
				$("#DESCCAUSADOR___"+seq).val(desccliente)
				window["CAUSADOR___"+seq].setValue(codcliente + " - " + desccliente);

			}

			// CODIGO DA CAUSA
			codcliente = $("#CODCLIENTECAUSA___"+row).val()

			if(codcliente!=null && codcliente!="" && codcliente!=undefined){
				
				$("#CODCLIENTECAUSA___"+seq).val(codcliente)
				desccliente = $("#DESCCAUSA___"+row).val()
				$("#DESCCAUSA___"+seq).val(desccliente)
				window["CAUSA___"+seq].setValue(codcliente + " - " + desccliente);

			}

		})

	}

}

// PREENCHE A TABELA PROCESSOS DO ITEM EM QUESTÃO
function preencheTabelaProcessos(idCriacao){
	
	console.log("entrei para preencher a VIEW de processos")
	
	var numOS = $("#NUM_OS").val()
		
	var c1 = DatasetFactory.createConstraint("OSPROCESSO",numOS,numOS,ConstraintType.MUST)
	var c2 = DatasetFactory.createConstraint("IDCRIACAOPROCESSO",idCriacao,idCriacao,ConstraintType.MUST)
	
	var constraints = new Array(c1,c2)
	var dataset = DatasetFactory.getDataset("dsItensProcessoOS",null,constraints,null)
	var row = dataset.values
	
	// SE RETORNO NÃO É NULO E NEM VAZIO
	if(!(row=="" || row==null || row==undefined || row=="null")){
		
		var count = row.length
		
		// PERCORRE TODOS OS REGISTROS
		for(var i=0; i < count; i++){
			
			var rep = row[i]
			
			var seq = addViewProcesso()
			
			console.log("vou carregar o i tem "+seq)
			
			// SALVA AS INFORMAÇÕES DO PROCESSO NA TABELA DE VISUALIZAÇÃO
			$("#VIEWOSPROCESSO___"+seq).val(rep["OSPROCESSO"])
			$("#VIEWPRIORIDADE___"+seq).val(rep["PRIORIDADE"])
			$("#VIEWIDCRIACAOPROCESSO___"+seq).val(rep["IDCRIACAOPROCESSO"])
			$("#VIEWATIVIDADE___"+seq).val(rep["CODATIVIDADE"]+" - "+rep["DESCATIVIDADE"])
			$("#VIEWCODATIVIDADE___"+seq).val(rep["CODATIVIDADE"])
			$("#VIEWDESCATIVIDADE___"+seq).val(rep["DESCATIVIDADE"])
			$("#VIEWHABILIDADEREQUERIDA___"+seq).val(rep["HABILIDADEREQUERIDA"])
			$("#VIEWCODHABILIDADE___"+seq).val(rep["CODHABILIDADE"])
			$("#VIEWPOSTO___"+seq).val(""+rep["CODPOSTO"]+" - "+rep["DESCPOSTO"])
			$("#VIEWCODPOSTO___"+seq).val(rep["CODPOSTO"])
			$("#VIEWDESCPOSTO___"+seq).val(rep["DESCPOSTO"])
			$("#VIEWFILA___"+seq).val(rep["FILA"])
			$("#VIEWCONFIGURACAO___"+seq).val(rep["CONFIGURACAO"])
			$("#VIEWPROCESSAMENTO___"+seq).val(rep["PROCESSAMENTO"])
			$("#VIEWDESAGREGACAO___"+seq).val(rep["DESAGREGACAO"])
			$("#VIEWESPERA___"+seq).val(rep["ESPERA"])
			$("#VIEWMOVIMENTACAO___"+seq).val(rep["MOVIMENTACAO"])
			$("#VIEWMINUTOSGASTOS___"+seq).val(rep["MINUTOSGASTOS"])
			$("#VIEWDESCPROCESSO___"+seq).val(rep["DESCPROCESSO"])
			$("#VIEWDOCAPOIOATV1___"+seq).val(rep["DOCAPOIOATV1"])
			$("#VIEWDOCAPOIOATV2___"+seq).val(rep["DOCAPOIOATV2"])
			$("#VIEWDOCAPOIOATV3___"+seq).val(rep["DOCAPOIOATV3"])
			$("#VIEWDOCAPOIOATV4___"+seq).val(rep["DOCAPOIOATV4"])
			$("#VIEWFORNPARA___"+seq).val(rep["FORNPARA"])
			$("#VIEWEDITADOPROCESSO___"+seq).val(rep["EDITADOPROCESSO"])
			$("#VIEWINCLUIDOPROCESSO___"+seq).val(rep["INCLUIDOPROCESSO"])
			$("#VIEWINTEGRADOPROCESSO___"+seq).val(rep["INTEGRADOPROCESSO"])
			
		    // ESCONDE/MOSTRA OS ÍCONES
		    $("#EXPANDIR___" + seq).show();
		    $("#REDUZIR___" + seq).hide();
		    
		    // EXIBE A ABA DOS ITENS
		    //$("#LINHA1___"+id).hide()
		    $("#LINHA2___"+seq).hide()
		    $("#LINHA3___"+seq).hide()
		    $("#LINHA4___"+seq).hide()
			
		}
		
	}
	
}

// EXPANDE O CONTEÚDO DO DETALHAMENTO DO ITEM
function expandirItemProcesso(e) {
	
	console.log("Vou expandir o item")

	//var id = $(e).attr("id").split("___")[1];
    
	
    // ESCONDE/MOSTRA OS ÍCONES
    //$("#EXPANDIR___" + id).hide();
    //$("#REDUZIR___" + id).show();
    
    // EXIBE A ABA DOS ITENS
    //$("#LINHA1___"+id).show()
    
    /*$("#LINHA2___"+id).show()
    $("#LINHA3___"+id).show()
    $("#LINHA4___"+id).show()*/
    
	var id = $("#EXPANDIR").parent().parent().parent().attr("id").split("___")[1]
	
	console.log("id: "+id)
	
	$(e).hide()
	$(e).parent().children("span[id^='REDUZIR']").show()

    $(e).parent().parent().children("div[id^='LINHA2']").show()
    $(e).parent().parent().children("div[id^='LINHA3']").show()
    $(e).parent().parent().children("div[id^='LINHA4']").show()

}

// REDUZ O CONTEÚDO DO DETALHAMENTO DO ITEM
function reduzirItemProcesso(e) {
	
	console.log("Vou reduzir o item")
	
    /*var id = $(e).attr("id").split("___")[1];
    console.log("id: "+id)
    
    // ESCONDE/MOSTRA OS ÍCONES
    $("#EXPANDIR___" + id).show();
    $("#REDUZIR___" + id).hide();
    
    // EXIBE A ABA DOS ITENS
    //$("#LINHA1___"+id).hide()
    $("#LINHA2___"+id).hide()
    $("#LINHA3___"+id).hide()
    $("#LINHA4___"+id).hide()*/
    
    var id = $("#REDUZIR").parent().parent().parent().attr("id").split("___")[1]
	
	console.log("id: "+id)
	
	$(e).hide()
	$(e).parent().children("span[id^='EXPANDIR']").show()

    $(e).parent().parent().children("div[id^='LINHA2']").hide()
    $(e).parent().parent().children("div[id^='LINHA3']").hide()
    $(e).parent().parent().children("div[id^='LINHA4']").hide()
    
}

// AJUSTA OS EXPANSORES DA TABELA DE PROCESSOS
function ajustaExpansoresProc(){
	
	console.log("vou ajustar os expansores da tabela de processos")
	
	// PERCORRE TODOS OS REGISTROS DA TABELA DE PROCESSOS
	$("input[id^='VIEWPRIORIDADE___']").each(function(){
	
		var seq = $(this).attr("id").split("___")[1]
		
		$("#REDHIDDEN___"+seq).parent().click()
		
		//$("#REDHIDDEN___"+seq).parent().parent().parent().children("div[id^='LINHA2']").hide()
		//$("#REDHIDDEN___"+seq).parent().parent().parent().children("div[id^='LINHA3']").hide()
		//$("#REDHIDDEN___"+seq).parent().parent().parent().children("div[id^='LINHA4']").hide()
		
	})
	
}

// BUSCAR INFORMAÇÕES DO CHECKBOX "TIPO" E "COMPOR LISTA" E "UND MEDIDA"
function buscaInfoItem(){
	
	console.log("vou buscar as informações do checkbox")
	
	var numOS = $("#NUM_OS").val()
	var idCriacao = $("#F_IDCRIACAOREAL").val()
	
	console.log("numOS: "+numOS+" e idCriacao: "+idCriacao)
	
	var a1 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	
	var constraints = new Array(a1,a2)
	
	var dataset = DatasetFactory.getDataset("dsBuscaItemEstruturaOS",null,constraints,null)
	
	var row = dataset.values
	
	var rep = row[0]
	
	//var comporLista = rep["COMPORLISTA"]
	var tipoDesenho = rep["TIPODESENHO"]
	var undMedida = rep["UNDMEDIDA"]
	
	// SE ITEM IRÁ COMPOR A LISTA
	/*if(comporLista=="SIM"){
		
		 $("#F_COMPORLISTA").prop("checked", true);
		
	} else {
		
		 $("#F_COMPORLISTA").prop("checked", false);
		
	}*/
	
	// SE TIPO DO DESENHO FOR ACABADO
	if(tipoDesenho=='ACABADO'){
	
		$("#RAD2_ACABADO").prop("checked",true)
		
	}
	
	// SE TIPO DO DESENHO FOR SEMIACABADO
	if(tipoDesenho=='SEMIACABADO'){
		
		$("#RAD2_SEMI").prop("checked",true)
		
	}
	
	// SE UNIDADE DE MEDIDA FOI INFORMADO
	if(!(undMedida=="" || undMedida==null || undMedida==undefined || undMedida=="null")){
		$("#F_UNDMEDIDA").val(undMedida)
	}
	
}

// LIMPA OS CAMPOS DO FORMULÁRIO
function limparForm() {
	
	//console.log("Entrei para limpar formulário")
	
	// LIMPA OS CAMPOS DO FORMULÁRIO
	//$("#F_TITULOITEM").val("")
	//$("#F_MATERIAL_ZOOM>option").remove();
	//$("#F_NOVOMATERIAL").val("")
	//$("#F_IDMATERIAL").val("")
	//$("#F_CODIGOPRD").val("")
	//$("#F_CATEGORIA").val("")
	//$("#F_QUANTIDADEMATERIAL").val("")
	//$("#F_POSICAOCOMPLETA").val("")
	$("#F_NUMDOCDELP").val("")
	$("#F_REVISAODOCDELP").val("")
	$("#F_OS").val("")
	$("#F_DATAREVISAO").val("")
	$("#F_OBSERVACOESDESENHO").val("")
	$("#F_PESOBRUTO").val("")
	$("#F_PESOLIQUIDO").val("")
	$("#F_AREAPINTURA").val("")
	$("#F_PERIMETROCORTE").val("")
	$("#F_OBSPROCESSO").val("")
	$("#F_OBSGERAL").val("")
	$("#F_NIVEL").val("")
	$("#F_UNDMEDIDA").val("")
	$("#F_POSICAOINDICE").val("")
	$("#F_INDICEANTIGO").val("")
	$("#F_POSICAODESENHO").val("")
	$("#F_NUMDBI").val("")
	$("#F_REVISAODBI").val("")
	$("#F_NUMDESENHO").val("")
	$("#F_REVISAODESENHO").val("")
	$("#F_DESQTDE").val("")
	$("#F_TOTALQTDE").val("")
	$("#F_DESCRICAO").val("")
	$("#F_BITOLA").val("")
	$("#F_ESPESSURA").val("")
	$("#F_LARGURA").val("")
	$("#F_MASSALINEAR").val("")
	$("#F_DIAMETROEXTERNO").val("")
	$("#F_DIAMETROINTERNO").val("")
	$("#F_ESPROSCA").val("")
	$("#F_COMPRIMENTO").val("")
	$("#F_MATERIAL").val("")
	$("#F_PRODUTO_RM").val("")
	$("#F_IDPRD").val("")
	$("#F_CODIGOPRD").val("")
	$("#F_IDCRIACAO").val("")
	$("#F_OBSERVACOESDESENHO").val("")
	$("#VALOR_RADIO1").val("")
	$("#VALOR_RADIO2").val("")
	$("#F_SEQ").val("")
	$("#F_AREASECAO").val("")
	$("#F_ALTURA").val("")
	$("#F_LARGURAABA").val("")
	$("#F_ESPALMA").val("")
	$("#F_ESPABA").val("")
	//$("#F_CODIGOTAREFA>option").remove()
	$("#F_CODIGOTAREFA").val("")
	$("#F_CODTRFITEM").val("")
	$("#F_IDTRFITEM").val("")
	$("#F_NOMETRFITEM").val("")
	
	// LIMPA TODO O CONTEÚDO DA TABELA DE COMPONENTES
	limparTabelaComponentes()
	
	// LIMPA TODO O CONTEÚDO DA TABELA DE COMPONENTES
	limparTabelaProcessos()
	
	//$("#F_CHECK_MATERIAL").prop("checked",false)
	
	// TIRA A SELEÇÃO DO CAMPO RADIO 1
	$("#RAD_ACABADO").prop("checked",false)
	$("#RAD_SEMI").prop("checked",false)
	//$("#RAD_MP").prop("checked",false)
	$("#RAD2_ACABADO").prop("checked",false)
	$("#RAD2_SEMI").prop("checked",false)
	//$("#RAD2_MP").prop("checked",false)
	
}

// REMOVE A SELEÇÃO DO ZOOM ATIVIDADE
function removeSelecaoAtividade(){
	
	// PERCORRE A TABELA E COLETA TODOS OS ITENS
	$('input[id^="VIEWATIVIDADE___"]').each(function(index, value){
		
		// VARIÁVEL PARA O ÍNDICE DA TABELA
		var seq = $(this).attr("id").split("___")[1]
		
		// SE O ZOOM É O SELECIONADO
		if($("#VIEWATIVIDADE___"+seq).hasClass("selecionadoZoom")){
			
			$("#VIEWATIVIDADE___"+seq).removeClass("selecionadoZoom")
			
		}
		
	})
	
}

// REMOVE A SELEÇÃO DO ZOOM ATIVIDADE
function removeSelecaoPosto(){
	
	// PERCORRE A TABELA E COLETA TODOS OS ITENS
	$('input[id^="VIEWPOSTO___"]').each(function(index, value){
		
		// VARIÁVEL PARA O ÍNDICE DA TABELA
		var seq = $(this).attr("id").split("___")[1]
		
		// SE O ZOOM É O SELECIONADO
		if($("#VIEWPOSTO___"+seq).hasClass("selecionadoZoom")){
			
			$("#VIEWPOSTO___"+seq).removeClass("selecionadoZoom")
			
		}
		
	})
	
}

// VERIFICA SE PRIORIDADE JÁ FOI PREENCHIDA NA TABELA
function verificaPrioridade(obj){
	
	console.log("entrei para verificar a prioridade")
	
	var seqAux = $(obj).attr("id").split("___")[1]
	
	var substitutoAux = $("#VIEWSUBSTITUTOCOMPONENTES___"+seqAux).val()
	var idprdAux = $("#VIEWIDPRDCOMPONENTES___"+seqAux).val()
	var prioridadeAux = $("#VIEWPRIORIDADEATVCOMPONENTES___"+seqAux).val()
	var tem = false
	
	console.log("substitutoAux: "+substitutoAux+", idprdAux: "+idprdAux+", prioridadeAux: "+prioridadeAux)
	
	// SE PRIORIDADE FOI INFORMADA
	if( !(prioridadeAux=="" || prioridadeAux==null || prioridadeAux==undefined) ){
		
		// PERCORRE A TABELA DA ABA PROCESSO
		$('input[id^="VIEWPRIORIDADE___"]').each(function(index, value){
			
			var seq = $(this).attr("id").split("___")[1]	
		
			var prioridade = $("#VIEWPRIORIDADE___"+seq).val()
			
			// SE PRIORIDADE JÁ FOI CADASTRADA
			if(prioridade==prioridadeAux){
				
				tem = true
				
			}
			
		})
		
		// SE PRIORIDADE JÁ EXISTE
		if(tem){
			
			tem = false
			
			// PERCORRE A TABELA E COLETA TODOS OS REGISTROS
			$('input[id^="VIEWPRODUTOCOMPONENTES___"]').each(function(index, value){
				
				var seq = $(this).attr("id").split("___")[1]	
				
				var substituto = $("#VIEWSUBSTITUTOCOMPONENTES___"+seq).val()
				var idprd = $("#VIEWIDPRDCOMPONENTES___"+seq).val()
				var prioridade = $("#VIEWPRIORIDADEATVCOMPONENTES___"+seq).val()
				
				if(!(seq==seqAux) && idprdAux==idprd && prioridadeAux==prioridade){
					
					tem = true
					
				}
				
			})
			
			// SE TEM PRIORIDADE PARA O MESMO COMPONENTE
			if(tem){
				
				// LIMPA O CAMPO
				$(obj).val("")
				
				// EXIBE ALERTA
				Swal.fire({
					  icon:  'error',
					  title: 'Já existe o mesmo componente vinculado a prioridade informada!',
					  text: 'Verifique e tente novamente'
				})
				
			}
			
		} else {
			// SE NÃO
			
			// LIMPA O CAMPO
			$(obj).val("")
			
			// EXIBE ALERTA
			Swal.fire({
				  icon:  'error',
				  title: 'A prioridade informada ainda não foi cadastrada na aba Processo!',
				  text: 'Verifique e tente novamente'
			})
			
		}
		
	}
	
}

// CONVERTE PRIORIDADE PARA VALOR INTEIRO
function converteInteiro(obj){
	
	console.log("entrei para vonverter inteiro")
	
	var ret = false
	var seq = $(obj).attr("id").split("___")[1]
	
	var prioridade = $("#VIEWPRIORIDADE___"+seq).val() 
	
	$("#VIEWPRIORIDADE___"+seq).val("")
	
	prioridade = parseInt(prioridade)
	console.log("prioridade "+prioridade)
	
	console.log("vou buscar ela")
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$('input[id^="VIEWPRIORIDADE___"]').each(function(index, value){
		
		var seq2 = $(this).attr("id").split("___")[1]
	
		var prioridadeTabela = $("#VIEWPRIORIDADE___"+seq2).val()
		
		prioridadeTabela = parseInt(prioridadeTabela)
		console.log("prioridadeTabela "+prioridadeTabela)
		
		// SE PRIORIDADE QUE ESTÁ SENDO INSERIDA É A MESMA DA LINHA ATUAL
		if(prioridade==prioridadeTabela){
			
			console.log("encontrei")
			ret = true
			
		}
		
	})
	
	// SE PRIORIDADE JÁ FOI INSERIDA NA TABELA
	if(ret){
		
		// EXIBE ALERTA
		Swal.fire({
				  icon: 'error',
				  title: 'Essa prioridade já foi inserida!',
				  text: 'Verifique e tente novamente.'
		})
		
		$("#VIEWPRIORIDADE___"+seq).val("")
		$("#VIEWPRIORIDADE___"+seq).focus()
		
	} else {
		// SE NÃO, SALVA A PRIORIDADE
		
		$("#VIEWPRIORIDADE___"+seq).val(prioridade)
		
	}
	
}

// BUSCA QUAL O ITEM DA TABELA FOI SELECIONADO
function buscaSeqZoomAtividade(){
	
	var seqRet = ""
	
	console.log("vou buscar o zoom selecionado")
	
	// PERCORRE A TABELA E COLETA TODOS OS ITENS
	$('input[id^="VIEWATIVIDADE___"]').each(function(index, value){
		
		// VARIÁVEL PARA O ÍNDICE DA TABELA
		var seq = $(this).attr("id").split("___")[1]
		
		// SE O ZOOM É O SELECIONADO
		if($("#VIEWATIVIDADE___"+seq).hasClass("selecionadoZoom")){
			
			seqRet = seq
			
		}
		
	})
	
	console.log("seq selecionado: "+seqRet)
	return seqRet
	
}

// BUSCA QUAL O ITEM DA TABELA FOI SELECIONADO
function buscaSeqZoomPosto(){
	
	var seqRet = ""
	
	console.log("vou buscar o zoom selecionado")
	
	// PERCORRE A TABELA E COLETA TODOS OS ITENS
	$('input[id^="VIEWPOSTO___"]').each(function(index, value){
		
		// VARIÁVEL PARA O ÍNDICE DA TABELA
		var seq = $(this).attr("id").split("___")[1]
		
		// SE O ZOOM É O SELECIONADO
		if($("#VIEWPOSTO___"+seq).hasClass("selecionadoZoom")){
			
			seqRet = seq
			
		}
		
	})
	
	console.log("seq selecionado: "+seqRet)
	return seqRet
	
}

// APAGA TODOS OS SELECTS DOS SUBSTITUTOS
function apagaSubstitutos(){

	// PERCORRE A TABELA E COLETA TODOS OS REGISTROS
	$('input[id^="VIEWPRODUTOCOMPONENTES___"]').each(function(index, value){
		
		var seq = $(this).attr("id").split("___")[1]	
		var lista = $("#VIEWLISTACOMPONENTES___"+seq).val()
		
		// SE NÃO É UM COMPONENTE QUE VEIO DA LISTA DE MATERIAIS
		if(!(lista=="L")){
			
			$('#VIEWSUBSTITUTOCOMPONENTES___'+seq).children('option:not(:first)').remove();
			
		}
		
	})
	
}

// APAGA TODOS OS SELECTS DOS SUBSTITUTOS
function apagaSubstitutosGeral(){

	// PERCORRE A TABELA E COLETA TODOS OS REGISTROS
	$('input[id^="VIEWPRODUTOCOMPONENTES___"]').each(function(index, value){
		
		var seq = $(this).attr("id").split("___")[1]	
		
		$('#VIEWSUBSTITUTOCOMPONENTES___'+seq).children('option:not(:first)').remove();
		
	})
	
}

// BUSCA OS VALORES DAS QUANTIDADES DOS ITENS E FAZ OS CÁLCULOS PARA SEREM SALVOS NA TABELA DE COMPONENTES
function buscaQtdeComponentesLista(idCriacao){
	
	console.log("vou buscar as quantidades dos componentes")

	var numOS = $("#NUM_OS").val()
	
	var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
	var a2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST);
	
	var constraints = new Array(a1,a2);
	
	dataset = DatasetFactory.getDataset("dsBuscaQtdeItemOS",null,constraints,null);
	
	var valor = dataset.values
	
	console.log("row")
	console.log(valor)
	
	var rep = valor[0]
	
	pesoBruto = rep["PESOBRUTO"]
	totalQtde = rep["TOTALQTDE"]
	
	totalQtde = parseInt(totalQtde)
	pesoBruto = parseFloat(pesoBruto)
	pesoBruto = pesoBruto.toFixed(4)
	
	qtdeUnit = pesoBruto/totalQtde
	qtdeUnit = parseFloat(qtdeUnit)
	qtdeUnit = qtdeUnit.toFixed(4)
	qtdeUnit = qtdeUnit.toString()
	qtdeUnit = qtdeUnit.replace(".",",")
	qtdeTotal = pesoBruto
	
	var qtdes = new Array()
	 
	qtdes.push({QTDEUNIT:qtdeUnit,QTDETOTAL:qtdeTotal})
	
	console.log(qtdes)
	
	console.log("vou retornar qtdes")
	
	return qtdes

}

// CARREGA SELECT DOS SUBSTITUTOS
function carregaSubstitutos(){
	
	var arraySubstitutos = new Array()
	
	console.log("entrei para carregar substitutos")
	
	// PERCORRE A TABELA E COLETA TODOS OS REGISTROS
	$('input[id^="VIEWPRODUTOCOMPONENTES___"]').each(function(index, value){
		
		var seq = $(this).attr("id").split("___")[1]	
		
		var produto = $("#VIEWCODIGOPRDCOMPONENTES___"+seq).val()
		var lista = $("#VIEWLISTACOMPONENTES___"+seq).val()
		var substituto = $("#VIEWSUBSTITUTOCOMPONENTES___"+seq).val()
		
		console.log("substituto "+substituto)
		
		// SE NÃO É UM COMPONENTE DA LISTA DE MATERIAIS
		if(!(lista=="L")){

			arraySubstitutos.push(produto)
			
		} 
		
	})
	
	console.log("Substitutos: "+arraySubstitutos)
	//console.log("Substitutos dos itens da Lista: "+arraySubLista)
	
	// PERCORRE A TABELA E COLETA TODOS OS REGISTROS
	$('input[id^="VIEWPRODUTOCOMPONENTES___"]').each(function(index, value){
		
		var seq = $(this).attr("id").split("___")[1]	
		var produto = $("#VIEWCODIGOPRDCOMPONENTES___"+seq).val()
		var lista = $("#VIEWLISTACOMPONENTES___"+seq).val()
		//var substituto = $("#VIEWSUBSTITUTOCOMPONENTES___"+seq).val()
			
		if(!(lista=="L")){
			
			// PERCORRE TODOS OS ITENS DO ARRAY
			for(var i=0; i<arraySubstitutos.length; i++){
	
				if(!(produto==arraySubstitutos[i])){
					
					// PREENCHE O SELECT COM OS DADOS
					$('#VIEWSUBSTITUTOCOMPONENTES___'+seq).append($("<option class='info'></option>").attr("value", arraySubstitutos[i]).text(arraySubstitutos[i]));
					
				}
				
			}
		
		}
	
	})
	
}

// VERIFICA SE O PROCESSO TEVE PELO MENOS UMA ATIVIDADE INSERIDA
function verificaProcesso(){
	
	console.log("verifica se teve pelo menos uma atividade inserida")
	
	var proc = false
	
	// PERCORRE TODOS OS REGISTROS DA TABELA DE PROCESSOS
	$("input[id^='VIEWPRIORIDADE___']").each(function(){
	
		proc = true
		
	})
	
	return proc
	
}

// VERIFICA SE TODOS OS ITENS POSSUEM AO MENOS UMA ATIVIDADE NA TABELA DE PROCESSOS
function verificaProcessoItens(){
	
	console.log("entrei para verificar os processos de cada item")
	
	var indicesErros = new Array()
	var idCriacaoProcesso = ""
	var mensagem = ""
	
	var numOS = $("#NUM_OS").val()
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OSPROCESSO",numOS,numOS,ConstraintType.MUST)
	var constraints = new Array(c1)
	
	var dataset = DatasetFactory.getDataset("dsVerificaProcessoItemOS",null,constraints,null)
	
	var row = dataset.values
	console.log("ROW: ")
	
	console.log(row)
	
	// SE RETORNO NÃO É VAZIO OU NULO
	if(!(row=="" || row==undefined || row==null || row=="null")){
		
		var count = dataset.values.length
		
		console.log("retorno não é vazio, COUNT: "+count)
		
		// PERCORRE TODOS OS REGISTROS
		for(var i=0; i<count; i++){
			
			var rep = row[i]
			
			if(rep["IDCRIACAOPROCESSO"]=="" || rep["IDCRIACAOPROCESSO"]==undefined || rep["IDCRIACAOPROCESSO"]==null || rep["IDCRIACAOPROCESSO"]=="null"){
		
				indicesErros.push(rep["INDICE"])
				
			}
			
		}
		
	}
	
	// SE ARRAY DE INDICES NÃO ESTÁ VAZIO
	if(indicesErros.length>0){
		
		// PERCORRE O ARRAY E SALVA OS ÍNDICES ENCONTRADOS
		for(var k=0;k<indicesErros.length;k++){
			
			if(k==0){
				
				mensagem = indicesErros[k]
				
			} else {
				
				mensagem = mensagem +", "+indicesErros[k]
				
			}
			
		}
		
	}
	
	return mensagem
	
}

// CALCULA A QUANTIDADE DA TABELA DE COMPONENTES
function calculaQtdesComponentesGeral(idCriacao){
	
	console.log("entrei para calcular as quantidades dos componentes geral do item")
	
	var numOS = $("#NUM_OS").val()
	
	var a1 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("OSCOMPONENTES",numOS,numOS,ConstraintType.MUST)
	
	var constraints = new Array(a1,a2)
	
	var dataset = DatasetFactory.getDataset("dsBuscaComponentesOS",null,constraints,null)
	
	var row = dataset.values
	console.log("row: ")
	
	var b1 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
	var b2 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	
	var constraints2 = new Array(b1,b2)
	
	var dataset2 = DatasetFactory.getDataset("dsBuscaItemEstruturaOS",null,constraints,null)
	
	var row2 = dataset2.values
	console.log("row2: ")
	
	var pesoBruto = rep["PESOBRUTO"]
	console.log("PESOBRUTO: "+pesoBruto)
	
	var totalQtde = rep["TOTALQTDE"]
	console.log("PESOBRUTO: "+pesoBruto)
	
	totalQtde = parseInt(totalQtde)
	console.log("TOTALQTDE: "+totalQtde)
	
	if(pesoBruto.includes(",")){
		
		pesoBruto = pesoBruto.replace(",",".")
		
	}
	
	//
	pesoBruto = parseFloat(pesoBruto)
	console.log("PESOBRUTO: "+pesoBruto)
	
	var qtdeUnit = pesoBruto/totalQtde
	console.log("QTDEUNIT "+qtdeUnit)
	//qtdeUnit = parseFloat(qtdeUnit)
	
	qtdeUnit = qtdeUnit.toFixed(4)
	console.log("QTDEUNIT "+qtdeUnit)
	qtdeUnit = qtdeUnit.toString()
	qtdeUnit = qtdeUnit.replace(".",",")
	var qtdeTotal = pesoBruto

	if(qtdeTotal=="NaN" || qtdeTotal==NaN){
		
		qtdeTotal = ""
		
	}
	
	if(qtdeUnit=="NaN" || qtdeUnit==NaN){
		
		qtdeUnit = ""
		
	}
	
	// SE RETORNO DOS COMPONENTES NÃO É VAZIO OU NULO
	if(!(row=="" || row==null || row==undefined || row=="null")){
			
		var count = row.length
		
		// PERCORRE TODOS OS REGISTROS DO DATASET DOS COMPONENTES
		for(var i=0; i<count; i++){
			
			var substituto = rep["SUBSTITUTOCOMPONENTES"]
			var lista = rep["LISTACOMPONENTES"]
			
			// SE SUBSTITUTO NÃO FOI SELECIONADO E VEIO DA LISTA
			if((substituto=="" || substituto==null || substituto==undefined) && (lista=="L")){
			
				console.log("SUBSTITUTO VAZIO E VEIO DA LISTA")
				console.log("VOU INCLUIR QTDEUNIT "+qtdeUnit+" E QTDETOTAL "+qtdeTotal)
				
				var c1 = DatasetFactory.createConstraint("OSCOMPONENTES",numOS,numOS,ConstraintType.MUST)
				var c2 = DatasetFactory.createConstraint("IDCRIACAOCOMPONENTES",idCriacao,idCriacao,ConstraintType.MUST)
				var c3 = DatasetFactory.createConstraint("QTDEUNCOMPONENTES",qtdeUnit,qtdeUnit,ConstraintType.MUST)
				var c4 = DatasetFactory.createConstraint("QTDETOTALCOMPONENTES",qtdeTotal,qtdeTotal,ConstraintType.MUST)
				
				var constraints = new Array(c1,c2,c3,c4)
				
				var dataset = DatasetFactory.getDataset("dsUpdateQtdeComponentesOS",null,constraints,null)
			
			}
			
		}
		
	}
		
}

// APAGA TODOS OS ITENS DA TABELA COMPONENTES QUE VIERAM DA LISTA
function apagaItensListaComponentes(){
	
	// PERCORRE A TABELA E COLETA TODOS OS REGISTROS
	$('input[id^="PRODUTOCOMPONENTES___"]').each(function(index, value){
		
		var seq = $(this).attr("id").split("___")[1]	
		var lista = $("#LISTACOMPONENTES___"+seq).val()
		
		// SE ITEM VEIO DA LISTA
		if(lista=="L"){
			  
			// APAGA REGISTRO
			$("#LINHACOMPONENTES___"+seq).remove();
			
		}
		
	})
	
}

// LIMPA OS ITENS QUE VIERAM DA LISTA
function limpaItensComponentesLista(){
	
	// PERCORRE A TABELA E COLETA TODOS OS REGISTROS
	$('input[id^="PRODUTOCOMPONENTES___"]').each(function(index, value){
		
		var seq = $(this).attr("id").split("___")[1]	
		var lista = $("#LISTACOMPONENTES___"+seq).val()
		
		// SE ITEM VEIO DA LISTA
		if(lista=="L"){
			
			// APAGA REGISTRO
			$("#LINHACOMPONENTES___"+seq).remove();
			
		}
		
	})
	
}

// LIMPA A TABELA DE COMPONENTES
function limparTabelaComponentes(){
	
	// PERCORRE A TABELA E COLETA TODOS OS NÍVEIS
	$('input[id^="VIEWPRODUTOCOMPONENTES___"]').each(function(index, value){
		
		$(this).parents("tr").remove();
		
	})
	
}

// LIMPA A TABELA DE PROCESSOS
function limparTabelaProcessos(){
	
	// PERCORRE A TABELA E COLETA TODOS OS NÍVEIS
	$('input[id^="VIEWPRIORIDADE___"]').each(function(index, value){
		
		$(this).parents("tr").remove();
		
	})
	
}

// MOSTRA/ESCONDE A DIV DA CÓPIA DO PROCESSO
function mostraDivCopiaProc(){
	
	// SE A DIV TEM A CLASSE VISÍVEL
	if($("#DIV_INDICECOPIA").hasClass("visivel")){
		
		$("#DIV_INDICECOPIA").removeClass("visivel")
		$("#DIV_INDICECOPIA").hide()
		$("#INDICE_PROCESSO").val("")
		
	} else {
		// SE NÃO 
		
		$("#DIV_INDICECOPIA").addClass("visivel")
		$("#DIV_INDICECOPIA").show()
		$("#INDICE_PROCESSO").val("")
		
	}
	
}

// PERCORRE OS CAMPOS DO FORMULÁRIO E DESABILITA-OS
function desabilitaCampos() {
	
	console.log("entrei para desabilitar campos")
	
	// PREENCHE O FORMULÁRIO COM OS DADOS DO ITEM SELECIONADO NA TABELA
	
	//$("#F_TITULOITEM").prop("readonly",true)
	//$("#F_OS").prop("readonly",true)
	//$("#F_POSICAOCOMPLETA").prop("readonly",true)
	//$("#F_QUANTIDADEMATERIAL").prop("readonly",true)
	//$("#F_TOTALQTDE").prop("readonly",true)
	//$("#F_SEQ").prop("readonly",true)
	//var tipo = $("#VALOR_RADIO1").val()
	//$("#F_CATEGORIA").prop("readonly",true)
	$("#F_NIVEL").prop("readonly",true)
	$("#F_DATAREVISAO").prop("readonly",true)
	$("#F_POSICAOINDICE").prop("readonly",true)
	$("#F_INDICEANTIGO").prop("readonly",true)
	$("#F_POSICAODESENHO").prop("readonly",true)
	$("#F_OBSERVACOESDESENHO").prop("readonly",true)
	//$("#F_PESOBRUTO").prop("readonly",true)
	$("#F_PESOLIQUIDO").prop("readonly",true)
	$("#F_PERIMETROCORTE").prop("readonly",true)
	$("#F_AREAPINTURA").prop("readonly",true)
	$("#F_OBSPROCESSO").prop("readonly",true)
	$("#F_OBSGERAL").prop("readonly",true)
	$("#F_NUMDBI").prop("readonly",true)
	$("#F_REVISAODBI").prop("readonly",true)
	$("#F_NUMDESENHO").prop("readonly",true)
	$("#F_REVISAODESENHO").prop("readonly",true)
	//$("#F_DESQTDE").prop("readonly",true)
	$("#F_DESCRICAO").prop("readonly",true)
	$("#F_BITOLA").prop("readonly",true)
	$("#F_ESPESSURA").prop("readonly",true)
	$("#F_LARGURA").prop("readonly",true)
	$("#F_MASSALINEAR").prop("readonly",true)
	$("#F_ESPROSCA").prop("readonly",true)
	$("#F_COMPRIMENTO").prop("readonly",true)
	$("#F_MATERIAL").prop("readonly",true)
	$("#ABRIR_ZOOM").prop("disabled",true)
	$("#LIMPAR_ZOOM").prop("disabled",true)
	$("#F_UNDMEDIDA").prop("disabled",true)
	$("#F_DIAMETROEXTERNO").prop("readonly",true)
	$("#F_DIAMETROINTERNO").prop("readonly",true)
	$("#F_OBSERVACOES").prop("readonly",true)
	$("#F_AREASECAO").prop("readonly",true)
	$("#F_ALTURA").prop("readonly",true)
	$("#F_LARGURAABA").prop("readonly",true)
	$("#F_ESPALMA").prop("readonly",true)
	$("#F_ESPABA").prop("readonly",true)
	$("#F_COMPORLISTA").prop("disabled",true)
	$("#F_NUMDOCDELP").prop("readonly",true)
	$("#F_REVISAODOCDELP").prop("readonly",true)
	$("#F_DIAMETROEXTERNODISCO").prop("readonly",true)
	$("#F_DIAMETROINTERNODISCO").prop("readonly",true)
	$("#F_PESOBRUTO").prop("readonly",true)
	
	$("#F_CODIGOTAREFA").prop("disabled",true)
	$("#F_CODTRFITEM").prop("readonly",true)
	$("#F_IDTRFITEM").prop("readonly",true)
	$("#F_NOMETRFITEM").prop("readonly",true)
	
	var tipoDesenho = $("#VALOR_RADIO2").val()

	//var produtoRM = $("#F_PRODUTO_RM").val()
	
	//if(produtoRM=="" || produtoRM==null){
		
	$("#F_PRODUTO_RM").prop("readonly",true)
	$("#F_PRODUTO_RM").attr("onclick",null)
	$("#ABRIR_ZOOM").attr("onclick",null)
	$("#LIMPAR_ZOOM").attr("onclick",null)
	
	//}
	
	//$("#ADICIONARCOMPONENTE").hide()
	
	// PERCORRE A TABELA COMPONENTES E DESABILITA AS FUNCIONALIDADES  
	/*$("input[id^='VIEWPRODUTOCOMPONENTES___']").each(function(index,value){
	
		var seq = $(this).attr("id").split("___")[1]
		
		$("#VIEWPRODUTOCOMPONENTES___"+seq).attr("onclick",null)
		
		$("#VIEWPRODUTOCOMPONENTES___"+seq).parent("div").find('.LIMPARZOOM').attr("onclick",null)
		$("#VIEWPRODUTOCOMPONENTES___"+seq).parent("div").find('.ABRIRZOOM').attr("onclick",null)
		$("#ICONLIMPAR___"+seq).hide()
		$("#ICONZOOM___"+seq).hide()
		$("#EXCLUIRCOMPONENTE___"+seq).hide()
		$("#VIEWQTDEUNCOMPONENTES___"+seq).prop("readonly",true)
		$("#VIEWQTDETOTALCOMPONENTES___"+seq).prop("readonly",true)
		$("#VIEWSUBSTITUTOCOMPONENTES___"+seq).prop("disabled",true)
		//$("#VIEWPRIORIDADEATVCOMPONENTES___"+seq).prop("readonly",true)
		
		// SE É O COMPONENTE PRINCIPAL
		if($("#VIEWPRINCIPALCOMP___"+seq).val()=="SIM"){
			
			// ESCONDE O BOTÃO EDITAR
			$("#EXCLUIRCOMP___"+seq).parent("td").children("button").hide()
			
		}
		
	})
	
	//$("#ADICIONARPROCESSO").hide()
	
	// PERCORRE A TABELA PROCESSO E DESABILITA AS FUNCIONALIDADES  
	$("input[id^='VIEWPRIORIDADE___']").each(function(index,value){
	
		var seq = $(this).attr("id").split("___")[1]
		
		$("#VIEWATIVIDADE___"+seq).attr("onclick",null)
		$("#ABRIRZOOMATV___"+seq).attr("onclick",null)
		$("#LIMPARZOOMATV___"+seq).attr("onclick",null)
		$("#ICONLIMPARATV___"+seq).hide()
		$("#ICONZOOMATV___"+seq).hide()
		
		$("#VIEWPOSTO___"+seq).attr("onclick",null)
		$("#ABRIRZOOMPOSTO___"+seq).attr("onclick",null)
		$("#LIMPARZOOMPOSTO___"+seq).attr("onclick",null)
		$("#ICONLIMPARPOSTO___"+seq).hide()
		$("#ICONZOOMPOSTO___"+seq).hide()
		
		$("#EXCLUIRPROCESSO___"+seq).hide()
		$("#COPIARPROCESSO___"+seq).hide()
		$("#VIEWPRIORIDADE___"+seq).prop("readonly",true)
		$("#VIEWFILA___"+seq).prop("readonly",true)
		$("#VIEWCONFIGURACAO___"+seq).prop("readonly",true)
		$("#VIEWPROCESSAMENTO___"+seq).prop("readonly",true)
		$("#VIEWDESAGREGACAO___"+seq).prop("readonly",true)
		$("#VIEWESPERA___"+seq).prop("readonly",true)
		$("#VIEWMOVIMENTACAO___"+seq).prop("readonly",true)
		//$("#VIEWMINUTOSGASTOS___"+seq).prop("readonly",true)
		$("#VIEWDESCPROCESSO___"+seq).prop("readonly",true)
		$("#VIEWDOCAPOIOATV1___"+seq).prop("readonly",true)
		$("#VIEWDOCAPOIOATV2___"+seq).prop("readonly",true)
		$("#VIEWDOCAPOIOATV3___"+seq).prop("readonly",true)
		$("#VIEWDOCAPOIOATV4___"+seq).prop("readonly",true)
		$("#VIEWFORNPARA___"+seq).prop("readonly",true)
		
	})*/
	
	// SE TIPO DO DESENHO FOR ACABADO
	if(tipoDesenho=='ACABADO'){
	
		$("#RAD2_ACABADO").prop("checked",true)
		
	}
	
	// SE TIPO DO DESENHO FOR SEMIACABADO
	if(tipoDesenho=='SEMIACABADO'){
		
		$("#RAD2_SEMI").prop("checked",true)
		
	}

	// DESABILITA OS RADIOS
	$("#RAD_ACABADO").prop("disabled",true)
	$("#RAD_SEMI").prop("disabled",true)
	$("#RAD2_NAOMANUF").prop("disabled",true)
	//$("#RAD_MP").prop("disabled",true)
	$("#RAD2_ACABADO").prop("disabled",true)
	$("#RAD2_SEMI").prop("disabled",true)
	$("#RAD2_NAOMANUF").prop("disabled",true)
	//$("#RAD2_MP").prop("disabled",true)
	
}

// PERCORRE OS CAMPOS DO FORMULÁRIO E HABILITA-OS
function habilitaCampos() {
	
	$("#F_NIVEL").prop("readonly",false)
	$("#F_POSICAOINDICE").prop("readonly",false)
	//$("#F_POSICAODESENHO").prop("readonly",false)
	$("#F_INDICEANTIGO").prop("readonly",false)
	$("#F_NUMDBI").prop("readonly",false)
	$("#F_REVISAODBI").prop("readonly",false)
	//$("#F_NUMDESENHO").prop("readonly",false)
	$("#F_REVISAODESENHO").prop("readonly",false)
	//$("#F_DESQTDE").prop("readonly",false)
	//$("#F_DESCRICAO").prop("readonly",false)
	$("#F_ESPESSURA").prop("readonly",false)
	$("#F_BITOLA").prop("readonly",false)
	$("#F_LARGURA").prop("readonly",false)
	$("#F_MASSALINEAR").prop("readonly",false)
	$("#F_ESPROSCA").prop("readonly",false)
	$("#F_DIAMETROEXTERNO").prop("readonly",false)
	$("#F_DIAMETROINTERNO").prop("readonly",false)
	$("#F_COMPRIMENTO").prop("readonly",false)
	$("#F_MATERIAL").prop("readonly",false)
	$("#ABRIR_ZOOM").prop("disabled",false)
	$("#LIMPAR_ZOOM").prop("disabled",false)
	$("#F_UNDMEDIDA").prop("disabled",false)
	$("#F_DATAREVISAO").prop("readonly",false)
	$("#F_OBSERVACOESDESENHO").prop("readonly",false)
	$("#F_PESOBRUTO").prop("readonly",false)
	$("#F_PESOLIQUIDO").prop("readonly",false)
	$("#F_PERIMETROCORTE").prop("readonly",false)
	$("#F_AREAPINTURA").prop("readonly",false)
	$("#F_OBSPROCESSO").prop("readonly",false)
	$("#F_OBSGERAL").prop("readonly",false)
	$("#F_AREASECAO").prop("readonly",false)
	$("#F_ALTURA").prop("readonly",false)
	$("#F_LARGURAABA").prop("readonly",false)
	$("#F_ESPALMA").prop("readonly",false)
	$("#F_ESPABA").prop("readonly",false)
	$("#F_NUMDOCDELP").prop("readonly",false)
	$("#F_REVISAODOCDELP").prop("readonly",false)
	$("#F_COMPORLISTA").prop("disabled",false)
	//$("#F_POSICAOCOMPLETA").prop("readonly",false)
	//$("#F_TOTALQTDE").prop("readonly",false)
	//$("#F_CATEGORIA").prop("readonly",false)
	//$("#F_TITULOITEM").prop("readonly",false)
	//$("#F_QUANTIDADEMATERIAL").prop("readonly",false)
	//$("#F_SEQ").prop("readonly",false)
	//$("#F_OS").prop("readonly",false)
	$("#F_CODIGOTAREFA").prop("disabled",false)
	$("#F_CODTRFITEM").prop("readonly",false)
	$("#F_IDTRFITEM").prop("readonly",false)
	$("#F_NOMETRFITEM").prop("readonly",false)
	$("#F_DIAMETROEXTERNODISCO").prop("readonly",false)
	$("#F_DIAMETROINTERNODISCO").prop("readonly",false)
	
	$("#F_PRODUTO_RM").attr("onclick","zoomMaterial('material');")
	$("#ABRIR_ZOOM").attr("onclick","zoomMaterial('material');")
	$("#LIMPAR_ZOOM").attr("onclick","limparZoomProduto();")
	
	$("#ADICIONARCOMPONENTE").show()
	
	// PERCORRE A TABELA COMPONENTES E DESABILITA AS FUNCIONALIDADES  
	$("input[id^='VIEWPRODUTOCOMPONENTES___']").each(function(index,value){
	
		var seq = $(this).attr("id").split("___")[1]
		var lista = $("#VIEWLISTACOMPONENTES___"+seq).val()
		var substituto = $("#VIEWSUBSTITUTOCOMPONENTES___"+seq).val()
		
		console.log("lista "+lista)
		
		// SE O ITEM NÃO VEIO DA LISTA
		if(!(lista=="L")){
		
			$("#VIEWPRODUTOCOMPONENTES___"+seq).attr("onclick","zoomComponentes('componentes',this);")
			$("#ABRIRZOOM___"+seq).attr("onclick","zoomComponentes('componentes',this);")
			$("#LIMPARZOOM___"+seq).attr("onclick","limparZoom(this);")
			//$("#EXCLUIRCOMPONENTE___"+seq).prop("disabled",false)
			$("#EXCLUIRCOMPONENTE___"+seq).show()
			$("#ICONLIMPAR___"+seq).show()
			$("#ICONZOOM___"+seq).show()
			$("#VIEWSUBSTITUTOCOMPONENTES___"+seq).prop("disabled",false)
			$("#VIEWPRIORIDADEATVCOMPONENTES___"+seq).prop("readonly",false)
			
			if(substituto=="" || substituto==null || substituto==undefined){
				
				$("#VIEWQTDEUNCOMPONENTES___"+seq).prop("readonly",false)
				$("#VIEWQTDETOTALCOMPONENTES___"+seq).prop("readonly",false)
				
			} 
			
		} else {
			
			$("#VIEWPRIORIDADEATVCOMPONENTES___"+seq).prop("readonly",true)
			
		}
	
	})
	
	$("#ADICIONARPROCESSO").show()
	
	// PERCORRE A TABELA PROCESSO E DESABILITA AS FUNCIONALIDADES  
	$("input[id^='VIEWPRIORIDADE___']").each(function(index,value){
	
		var seq = $(this).attr("id").split("___")[1]
		
		$("#VIEWATIVIDADE___"+seq).attr("onclick","zoomAtividade('atividade',this);")
		$("#ABRIRZOOMATV___"+seq).attr("onclick","zoomAtividade('atividade',this);")
		$("#LIMPARZOOMATV___"+seq).attr("onclick","limparZoomAtv(this);")
		$("#ICONLIMPARATV___"+seq).show()
		$("#ICONZOOMATV___"+seq).show()
		
		$("#VIEWPOSTO___"+seq).attr("onclick","zoomPosto('posto',this);")
		$("#ABRIRZOOMPOSTO___"+seq).attr("onclick","zoomPosto('posto',this);")
		$("#LIMPARZOOMPOSTO___"+seq).attr("onclick","limparZoomPosto(this);")
		$("#ICONLIMPARPOSTO___"+seq).show()
		$("#ICONZOOMPOSTO___"+seq).show()
		
		$("#EXCLUIRPROCESSO___"+seq).show()
		$("#COPIARPROCESSO___"+seq).show()
		$("#VIEWPRIORIDADE___"+seq).prop("readonly",false)
		$("#VIEWFILA___"+seq).prop("readonly",false)
		$("#VIEWCONFIGURACAO___"+seq).prop("readonly",false)
		$("#VIEWPROCESSAMENTO___"+seq).prop("readonly",false)
		$("#VIEWDESAGREGACAO___"+seq).prop("readonly",false)
		$("#VIEWESPERA___"+seq).prop("readonly",false)
		$("#VIEWMOVIMENTACAO___"+seq).prop("readonly",false)
		//$("#VIEWMINUTOSGASTOS___"+seq).prop("readonly",false)
		$("#VIEWDESCPROCESSO___"+seq).prop("readonly",false)
		$("#VIEWDOCAPOIOATV1___"+seq).prop("readonly",false)
		$("#VIEWDOCAPOIOATV2___"+seq).prop("readonly",false)
		$("#VIEWDOCAPOIOATV3___"+seq).prop("readonly",false)
		$("#VIEWDOCAPOIOATV4___"+seq).prop("readonly",false)
		$("#VIEWFORNPARA___"+seq).prop("readonly",false)
		
	})
	
	var tipoDesenho = $("#VALOR_RADIO2").val()
	
	// SE TIPO DO DESENHO FOR ACABADO
	if(tipoDesenho=='ACABADO'){
	
		$("#RAD2_ACABADO").prop("checked",true)
		
	}
	
	// SE TIPO DO DESENHO FOR SEMIACABADO
	if(tipoDesenho=='SEMIACABADO'){
		
		$("#RAD2_SEMI").prop("checked",true)
		
	}

	// HABILITA RADIOS
	$("#RAD_ACABADO").prop("disabled",false)
	$("#RAD_SEMI").prop("disabled",false)
	$("#RAD2_NAOMANUF").prop("disabled",false)
	//$("#RAD_MP").prop("disabled",false)
	$("#RAD2_ACABADO").prop("disabled",false)
	$("#RAD2_SEMI").prop("disabled",false)
	$("#RAD2_NAOMANUF").prop("disabled",false)
	//$("#RAD2_MP").prop("disabled",false)
	
}

// APAGA O ITEM DA TABELA DE COMPONENTES
function apagaItemComponentes(idCriacao,idComponentes){
	
	var ret = false
	
	// PERCORRE A TABELA E BUSCA O MAIOR ID CRIAÇÃO
	$('input[id^="PRODUTOCOMPONENTES___"]').each(function(index, value){
		
		var seq = $(this).attr("id").split("___")[1]
		var idComponentesTab = $("#IDCOMPONENTES___"+seq).val()
		var idCriacaoTab = $("#IDCRIACAOCOMPONENTES___"+seq).val()
		
		if(idCriacao==idCriacaoTab && idComponentesTab==idComponentes){
			
			$("#LINHAPROCESSO___"+seq).remove()
			ret = true
			
		}
		
	})
	
	return ret
	
}

// BUSCA O PROCESSO CADASTRADO PARA O ÍNDICE INFORMADO
function buscarProcessoIndice(){
	
	console.log("entrei para buscar processo")
	
	var indice = $("#INDICE_PROCESSO").val()
	var ret = false
	
	// ATIVA O LOAD
	var myLoading2 = FLUIGC.loading(window);
	myLoading2.show();
	
	setTimeout(function(){
	
		// SE ÍNDICE NÃO FOI INFORMADO
		if(indice=="" || indice==undefined || indice==null){
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'O índice não foi informado!',
				  text: 'Verifique e tente novamente'
			})
			
		} else {
			// SE NÃO, BUSCA PROCESSO DO ÍNDICE INFORMADO
			
			var idCriacao = buscaIdCriacao(indice)
			console.log("idCriacao: "+idCriacao)
			
			// SE IDCRIACAO NÃO É VÁLIDO
			if(idCriacao=="" || idCriacao==null || idCriacao==undefined || idCriacao=="null"){
				
				console.log("idCriacao é nulo")
				
				ret = true
				
			} else {
				// SE NÃO
				
				var numOS = $("#NUM_OS").val()
				
				var b1 = DatasetFactory.createConstraint("IDCRIACAOPROCESSO",idCriacao,idCriacao,ConstraintType.MUST)
				var b2 = DatasetFactory.createConstraint("OSPROCESSO",numOS,numOS,ConstraintType.MUST)
				
				var constraints = new Array(b1,b2)
				
				var dataset = DatasetFactory.getDataset("dsBuscaItensProcessoOS",null,constraints,null)
				
				var row = dataset.values
				
				// SE RETORNO É NULO OU VAZIO
				if(row=="" || row==undefined || row==null || row=="null"){
					
					console.log("retorno dos processos vazio ou nulo")
					
					ret = true
					
				} else {
					// SE NÃO 
					
					console.log("tem processo")
					
					var count = dataset.values.length
					
					// PERCORRE TODOS OS REGISTROS ENCONTRADOS
					for(var i=0; i<count; i++){
						
						var rep = row[i]
						
						// ADICIONA LINHA NO PROCESSO
						var seq = addViewProcesso()
						
						$("#VIEWPRIORIDADE___"+seq).val(rep["PRIORIDADE"])
						$("#VIEWATIVIDADE___"+seq).val(rep["CODATIVIDADE"]+ " - "+rep["DESCATIVIDADE"])
						$("#VIEWCODATIVIDADE___"+seq).val(rep["CODATIVIDADE"])
						$("#VIEWDESCATIVIDADE___"+seq).val(rep["DESCATIVIDADE"])
						$("#VIEWHABILIDADEREQUERIDA___"+seq).val(rep["HABILIDADEREQUERIDA"])
						$("#VIEWCODHABILIDADE___"+seq).val(rep["CODHABILIDADE"])
						$("#VIEWPOSTO___"+seq).val(rep["CODPOSTO"]+" - "+rep["DESCPOSTO"])
						$("#VIEWCODPOSTO___"+seq).val(rep["CODPOSTO"])
						$("#VIEWDESCPOSTO___"+seq).val(rep["DESCPOSTO"])
						$("#VIEWFILA___"+seq).val(rep["FILA"])
						$("#VIEWCONFIGURACAO___"+seq).val(rep["CONFIGURACAO"])
						$("#VIEWPROCESSAMENTO___"+seq).val(rep["PROCESSAMENTO"])
						$("#VIEWDESAGREGACAO___"+seq).val(rep["DESAGREGACAO"])
						$("#VIEWESPERA___"+seq).val(rep["ESPERA"])
						$("#VIEWMOVIMENTACAO___"+seq).val(rep["MOVIMENTACAO"])
						$("#VIEWMINUTOSGASTOS___"+seq).val(rep["MINUTOSGASTOS"])
						$("#VIEWDESCPROCESSO___"+seq).val(rep["DESCPROCESSO"])
						$("#VIEWDOCAPOIOATV1___"+seq).val(rep["DOCAPOIOATV1"])
						$("#VIEWDOCAPOIOATV2___"+seq).val(rep["DOCAPOIOATV2"])
						$("#VIEWDOCAPOIOATV3___"+seq).val(rep["DOCAPOIOATV3"])
						$("#VIEWDOCAPOIOATV4___"+seq).val(rep["DOCAPOIOATV4"])
						$("#VIEWFORNPARA___"+seq).val(rep["FORNPARA"])
	
					    // ESCONDE/MOSTRA OS ÍCONES
					    $("#EXPANDIR___" +seq).show();
					    $("#REDUZIR___" +seq).hide();
					    
					    // EXIBE A ABA DOS ITENS
					    //$("#LINHA1___"+id).hide()
					    $("#LINHA2___"+seq).hide()
					    $("#LINHA3___"+seq).hide()
					    $("#LINHA4___"+seq).hide()
						
					}
					
				}
				
			}
				
		}
		
		// SE NENHUM PROCESSO FOI LOCALIZADO
		if(ret){
			
			// DESATIVA O LOADING
	    	desativaSpinner()
	    	
			console.log("retorno dos processos vazio ou nulo")
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'Não foi localizado processo para o índice informado!',
				  text: 'Verifique e tente novamente'
			})
			
		}
		
		// MOSTRA/ESCONDE A DIV DA CÓPIA DO PROCESSO
		mostraDivCopiaProc()
		
	},500)
	
	// DESATIVA O LOAD
	setTimeout(function(){
		
		myLoading2.hide();
		
	},500)	
	
}

// BUSCA TODOS OS CÓDIGOS DAS ATIVIDADES INSERIDAS NO PROCESSO
function buscaCodAtvsProc(){
	
	var atividades = ""
	
	// PERCORRE TODOS OS REGISTROS DA TABELA DE PROCESSO
	$("input[id^='VIEWPRIORIDADE___']").each(function(index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var codAtv = $("#VIEWCODATIVIDADE___"+seq).val()
		
		if(atividades==""){
			
			atividades = codAtv
		
		} else{
			
			atividades = atividades+";"+codAtv
			
		}
		
	})
	
	var index = atividades.lastIndexOf(";")
	
	atividades = atividades.substr(0,index)
	
	console.log("atividades: "+atividades)
	
	return atividades
	
}

// VERIFICA SE O CÓDIGO DA ATIVIDADE JÁ FOI UTILIZADO NA TABELA
function verificaAtividade(codAtividade){
	
	var ret = true
	
	// PERCORRE A TABELA
	$('input[id^="VIEWPRIORIDADE___"]').each(function(index, value){
		
		var seq = $(this).attr("id").split("___")[1]
	
		var codAtividadeTabela = $("#VIEWCODATIVIDADE___"+seq).val()
		
		if(codAtividade==codAtividadeTabela){
			
			ret = false
			
		}
		
	})
	
	return ret
	
}

//FAZ UMA CÓPIA DO ITEM NA TABELA DE PROCESSOS
function copiarProcesso(obj){
	
	// EXIBE ALERTA
	Swal.fire({
	
		  title: 'Tem certeza que deseja copiar este item?',
		  text: "Atenção, o item copiado será inserido no final da tabela.",
		  icon: 'warning',
		  showCancelButton: true,
		  allowEscapeKey: true,
		  allowOutsideClick: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Sim',
		  cancelButtonText: 'Cancelar',
		
	}).then(function(result){
		
		  // SE SIM
		  if (result.value) {
			  
			// EXIBE ALERTA DA CÓPIA
			var Toast = Swal.mixin({
				  toast: true,
				  position: 'center',
				  showConfirmButton: false,
				  timer: 1000,
				  timerProgressBar: true,
			})
		
			Toast.fire({
				  icon: 'success',
				  title: 'Item copiado!'
			})
	    
		    // ATIVA O LOAD
			var myLoading2 = FLUIGC.loading(window);
			myLoading2.show();
		  
			setTimeout(function(){
			
				var seq = $(obj).attr("id").split("___")[1]
				
				//var atividade = $("#VIEWATIVIDADE___"+seq).val()
				//var codAtividade = $("#VIEWCODATIVIDADE___"+seq).val()
				//var descAtividade = $("#VIEWDESCATIVIDADE___"+seq).val()
				//var habilidade = $("#VIEWHABILIDADEREQUERIDA___"+seq).val()
				//var codHabilidade = $("#VIEWCODHABILIDADE___"+seq).val()
				var posto = $("#VIEWPOSTO___"+seq).val()
				var codPosto = $("#VIEWCODPOSTO___"+seq).val()
				var descPosto = $("#VIEWDESCPOSTO___"+seq).val()
				var fila = $("#VIEWFILA___"+seq).val()
				var configuracao = $("#VIEWCONFIGURACAO___"+seq).val()
				var processamento = $("#VIEWPROCESSAMENTO___"+seq).val()
				var desagregacao = $("#VIEWDESAGREGACAO___"+seq).val()
				var espera = $("#VIEWESPERA___"+seq).val()
				var movimentacao = $("#VIEWMOVIMENTACAO___"+seq).val()
				var minutos = $("#VIEWMINUTOSGASTOS___"+seq).val()
				var descProcesso = $("#VIEWDESCPROCESSO___"+seq).val()
				var docApoioAtv1 = $("#VIEWDOCAPOIOATV1___"+seq).val()
				var docApoioAtv2 = $("#VIEWDOCAPOIOATV2___"+seq).val()
				var docApoioAtv3 = $("#VIEWDOCAPOIOATV3___"+seq).val()
				var docApoioAtv4 = $("#VIEWDOCAPOIOATV4___"+seq).val()
				var fornPara = $("#VIEWFORNPARA___"+seq).val()
				
				var row = addViewProcesso()
				
				//$("#VIEWATIVIDADE___"+row).val(atividade)
				//$("#VIEWCODATIVIDADE___"+row).val(codAtividade)
				//$("#VIEWDESCATIVIDADE___"+row).val(descAtividade)
				//$("#VIEWHABILIDADEREQUERIDA___"+row).val(habilidade)
				//$("#VIEWCODHABILIDADE___"+row).val(codHabilidade)
				$("#VIEWPOSTO___"+row).val(posto)
				$("#VIEWCODPOSTO___"+row).val(codPosto)
				$("#VIEWDESCPOSTO___"+row).val(descPosto)
				$("#VIEWFILA___"+row).val(fila)
				$("#VIEWCONFIGURACAO___"+row).val(configuracao)
				$("#VIEWPROCESSAMENTO___"+row).val(processamento)
				$("#VIEWDESAGREGACAO___"+row).val(desagregacao)
				$("#VIEWESPERA___"+row).val(espera)
				$("#VIEWMOVIMENTACAO___"+row).val(movimentacao)
				$("#VIEWMINUTOSGASTOS___"+row).val(minutos)
				$("#VIEWDESCPROCESSO___"+row).val(descProcesso)
				$("#VIEWDOCAPOIOATV1___"+row).val(docApoioAtv1)
				$("#VIEWDOCAPOIOATV2___"+row).val(docApoioAtv2)
				$("#VIEWDOCAPOIOATV3___"+row).val(docApoioAtv3)
				$("#VIEWDOCAPOIOATV4___"+row).val(docApoioAtv4)
				$("#VIEWFORNPARA___"+row).val(fornPara)

			},500)
					    
		    // DESATIVA O LOAD
			setTimeout(function(){
				
				myLoading2.hide();
				
			},500)
		    
		  }
	  
	})
	
}

// BUSCA O IDCRIACAO DE UM INDICE
function buscaIdCriacao(indice){
	
	var numOS = $("#NUM_OS").val()
	var idCriacao = ""
	
	console.log("vou buscar o idCriacao do indice "+indice)
	
	// CONSTRÓI A CONSTRAINT DO BANCO
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("INDICE",indice,indice,ConstraintType.MUST);
	var constraints = new Array(c1,c2);
	
	dataset = DatasetFactory.getDataset("dsBuscaIdCriacaoItemOS",null,constraints,null);
	
	var row = dataset.values;
	console.log("row")
	console.log(row)
	
	// SE RETORNO NÃO É NULO
	if(!(row=="" || row==undefined || row==null || row=="null")){
		
		var rep = row[0]
		idCriacao = rep["IDCRIACAO"]
		
	}
	
	console.log("O indice "+indice+" tem o idCriacao "+idCriacao)
	
	return idCriacao
	
}

// BUSCA SE O IDCRIACAO DO BANCO
function buscaIdCriacaoTab(){
	
	var maxIdCriacao = 0
	
	var numOS = $("#NUM_OS").val()
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	var constraints = new Array(c1)
	
	dataset = DatasetFactory.getDataset("dsBuscaMaxIdCriacaoEstruturaOS",null,constraints,null)
	
	var row = dataset.values
	var rep = row[0]
	
	maxIdCriacao = rep["IDMAX"]
	console.log("IDMAX do banco: "+maxIdCriacao)
	
	return maxIdCriacao
	
}

// BUSCA O MAIOR ID
function buscaIdComponentes(idCriacao){
	
	console.log("vou buscar o ID Componentes")
	
	var maxIdCriacao = 0
	
	// PERCORRE A TABELA E BUSCA O MAIOR ID COMPONENTES
	$('input[id^="VIEWPRODUTOCOMPONENTES___"]').each(function(index, value){
		
		var seq = $(this).attr("id").split("___")[1]
		var idCriacaoTab = $("#VIEWIDCRIACAOCOMPONENTES___"+seq).val()
		var idCriacaoComp = $("#VIEWIDCOMPONENTES___"+seq).val()
		
		idCriacaoComp = parseInt(idCriacaoComp)
	
		if(idCriacaoTab==idCriacao){
			console.log("achei um item com o mesmo idCriacao")
			if(idCriacaoComp>=maxIdCriacao){
				console.log("o idCriacaoComp "+idCriacaoComp+" é maior ou igual ao maxIdCriacao "+maxIdCriacao)
				maxIdCriacao = idCriacaoComp
				
			}
			
		}
		
	})
	
	console.log("o maxIdCriacao encontrado foi "+maxIdCriacao)
	
	maxIdCriacao += 1
	
	console.log("vou retornar o "+maxIdCriacao)
	
	return maxIdCriacao++
	
}

// BUSCA O MAIOR ID
function buscaIdProcesso(idCriacao){
	
	console.log("vou buscar o ID Processo")

	var maxIdCriacao = 0
	
	// PERCORRE A TABELA E BUSCA O MAIOR ID CRIAÇÃO
	$('input[id^="VIEWPRIORIDADE___"]').each(function(index, value){
		
		var seq = $(this).attr("id").split("___")[1]
		var idCriacaoTab = $("#VIEWIDCRIACAOPROCESSO___"+seq).val()
		var idCriacaoProc = $("#VIEWIDPROCESSO___"+seq).val()
		
		idCriacaoProc = parseInt(idCriacaoProc)
	
		if(idCriacaoTab==idCriacao){
			console.log("achei um item com o mesmo idCriacao")
			if(idCriacaoProc>=maxIdCriacao){
				console.log("o idCriacaoProc "+idCriacaoProc+" é maior ou igual ao maxIdCriacao "+maxIdCriacao)
				maxIdCriacao = idCriacaoProc
				
			}
			
		}
		
	})
	
	console.log("o maxIdCriacao encontrado foi "+maxIdCriacao)
	
	maxIdCriacao += 1
	
	console.log("vou retornar o "+maxIdCriacao)
	
	return maxIdCriacao
	
}

// APAGA O ITEM DA TABELA PROCESSO QUE FOI EXCLUÍDO
function apagaItemProcesso(idCriacao,idProcesso){
	
	var ret = false
	
	// PERCORRE A TABELA E BUSCA O MAIOR ID CRIAÇÃO
	$('input[id^="PRIORIDADE___"]').each(function(index, value){
		
		var seq = $(this).attr("id").split("___")[1]
		var idProcessoTab = $("#IDPROCESSO___"+seq).val()
		var idCriacaoTab = $("#IDCRIACAOPROCESSO___"+seq).val()
		
		if(idCriacao==idCriacaoTab && idProcessoTab==idProcesso){
			
			$("#LINHAPROCESSO___"+seq).remove()
			ret = true
			
		}
		
	})
	
	return ret
	
}


// PERCORRE A TABELA E REFAZ OS CÁLCULOS TOTAIS DA QUANTIDADE
function alteraDesQtdeGeral(){

	console.log("vou alterar a desQtde de todos os itens")

	var numOS = $("#NUM_OS").val()
	var totalQtde 
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
	var constraints = new Array(c1);
	
	//dataset = DatasetFactory.getDataset("dsBuscaEstruturaIntegrada",null,constraints,null);
	dataset = DatasetFactory.getDataset("dsBuscaEstrutura",null,constraints,null);
	
	// QUANTIDADE DE REGISTROS DA CONSULTA
	var row = dataset.values;		
	var count = dataset.values.length
	
	// CRIA E RETORNA UM ARRAY COM AS POSIÇÕES PARA A ESTRUTURA
	var indices = arrayIndices(row,count)
	
	var indicesOrdenados = montarEstrutura(indices)
	
	console.log("INDICES ORDENADOS")
	console.log(indicesOrdenados)
	
	// ORDENA OS IDCRIACAO
	var arrayIdCriacao = criaArrayIdCriacao(indicesOrdenados,row)
	
	// PERCORRE TODOS OS REGISTROS
	for(var i=0; i<indicesOrdenados.length; i++){
		
		//var rep = row[i]
		//var idCriacao = rep["IDCRIACAO"]
		
		var idCriacao = arrayIdCriacao[i]
		console.log("idCriacao: "+idCriacao)
		//var nivel = rep["NIVEL"]
		var nivel = indicesOrdenados[i].substring(0,indicesOrdenados[i].lastIndexOf("."))
	
		var totalPai
		
		// SE NÍVEL NÃO É VAZIO OU NULO
		if(!(nivel=="" || nivel==null || nivel==undefined || nivel=="null")){
		
			console.log("nivel: "+nivel)
			
			// CONSTRÓI A CONSULTA DO DATASET
			var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
			var a2 = DatasetFactory.createConstraint("NIVEL",nivel,nivel,ConstraintType.MUST)
			var constraints = new Array(a1,a2)
			var dataset = DatasetFactory.getDataset("dsBuscaQtdePaiOS",null,constraints,null)
			
			var row = dataset.values
			var rep = row[0]
			totalPai = rep["TOTALQTDE"]
		
		} else {
			// SE NÃO
			
			totalPai = 1
			
		}
		
		// CONSTRÓI A CONSULTA DO DATASET
		var b1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
		var b2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
		var constraints = new Array(b1,b2)
		var dataset = DatasetFactory.getDataset("dsBuscaQtdeItemOS",null,constraints,null)
		
		var row = dataset.values
		var rep2 = row[0]
		
		var desQtde = rep2["DESQTDE"]
		
		if(!(desQtde=="null" || desQtde==null || desQtde==undefined || desQtde==NaN || desQtde=="NaN")){
			
			desQtde = parseInt(desQtde)
			
		} else {
			
			desQtde = 0
			
		}
		
		console.log("desQtde "+desQtde)
		console.log("totalPai "+totalPai)
		console.log("nivel "+nivel)
		console.log("idCriacao "+idCriacao)
		
		// SE TOTAL PAI É VAZIO OU NULO
		if(totalPai=="" || totalPai==undefined || totalPai=="NaN" || totalPai==NaN || totalPai==null){
			
			totalPai = 1
			
		} else{
			// SE NÃO
			
			totalPai = parseInt(totalPai)
			
		}
		
		// SE NÍVEL É VAZIO
		if(nivel=="" || nivel==null || nivel==undefined || nivel=="null"){
			
			totalQtde = desQtde
			
		}
		else{
			// SE NÃO
			
			totalQtde = totalPai * desQtde
			
		}
		
		console.log("Vou atualizar o totalQtde "+totalQtde+", da OS "+numOS+" e idCriacao "+idCriacao)
		
		// SE TOTALQTDE CALCULADO NÃO É INVÁLIDO
		if(!(totalQtde=="" || totalQtde==undefined || totalQtde=="NaN" || totalQtde==NaN || totalQtde==null || totalQtde=="null")){
			
			console.log("entrei para construir as constraints e chamar o dataset")
			
			// CONSTRÓI A CONSULTA DO DATASET
			var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
			var a2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
			var a3 = DatasetFactory.createConstraint("TOTALQTDE",totalQtde,totalQtde,ConstraintType.MUST)
			var constraints = new Array(a1,a2,a3)
			var dataset = DatasetFactory.getDataset("dsUpdateQtdesOS",null,constraints,null)
			
			console.log("calculei "+totalQtde)
			
		}
		
	}
	
}

// REALIZA NOVO CÁLCULO DA QUANTIDADE TOTAL, LEVANDO EM CONSIDERAÇÃO O ÍNDICE ATUAL E O NÍVEL
function alteraDesQtde(idCriacao,nivel,totalPai,desQtde){
	
	// SE TOTAL PAI NÃO FOI PREENCHIDO OU INFORMADO
	if(totalPai=="" || totalPai==undefined || totalPai=="NaN" || totalPai==NaN || totalPai==null){
		
		totalPai = 1
		
	} else{
		
		totalPai = parseInt(totalPai)
		
	}
	
	// SE NÍVEL É VAZIO
	if(nivel==""){
		
		totalQtde = desQtde
		
	}
	else{
		// SE NÃO
		
		totalQtde = totalPai * desQtde
		
	}
	
	// SE TOTALQTDE CALCULADO NÃO É INVÁLIDO
	if(!(totalQtde=="" || totalQtde==undefined || totalQtde=="NaN" || totalQtde==NaN || totalQtde==null)){
		
		$("#TOTALQTDE___"+seq).val(totalQtde)
		console.log("calculei "+totalQtde)
		
	}
	
}

// ALTERA A QTDE DE TODOS OS COMPONENTES
function alteraQtdeComponentes(seq,totalQtde,idCriacao){
	
	var idCriacao = $("#IDCRIACAOCOMPONENTES___"+seq).val()
	var pesoBruto = $("#PESOBRUTO___"+seq).val()
	pesoBruto = parseFloat(pesoBruto)
	totalQtde = parseInt(totalQtde)
	
	var qtdeUnit = pesoBruto/totalQtde
	qtdeUnit = qtdeUnit.toFixed(4)
	
	// PERCORRE A TABELA E COLETA TODOS OS ÍNDICES
	$('input[id^="PRODUTOCOMPONENTES___"]').each(function(index, value){
		
		// VARIÁVEL PARA O ÍNDICE DA TABELA
		var seq2 = $(this).attr("id").split("___")[1]
		
		var lista = $("#LISTACOMPONENTES___"+seq2).val()
		var substituto = $("#SUBSTITUTOCOMPONENTES___"+seq2).val() 
		var idCriacaoComp = $("#IDCRIACAOCOMPONENTES___"+seq2).val()
		
		// SE ITEM VEIO DA LISTA OU SUBSTITUTO ESTÁ VAZIO
		if(lista=="L" && idCriacaoComp==idCriacao && (substituto=="" || substituto==null || substituto==undefined)){
			
			$("#QTDETOTALCOMPONENTES___"+seq2).val(pesoBruto)
			$("#QTDEUNCOMPONENTES___"+seq2).val(qtdeUnit)
			
		}
		
	})
	
} 

// FAZ O CÁLCULO DO PESO BRUTO E LÍQUIDO
function calculaPesoBrutoLiquido(){
	
	var desQtde = $("#F_DESQTDE").val()
	var pesoUnit = $("#F_PESOUNITARIO").val()
	var pesoUnitLiq = $("#F_PESOUNLIQUIDO").val()
	
	if(desQtde.includes(",")){
		
		desQtde = desQtde.toString().replace(",",".")
	}
	
	if(pesoUnit.includes(",")){
		
		pesoUnit = pesoUnit.toString().replace(",",".")
	}
	
	if(pesoUnitLiq.includes(",")){
		
		pesoUnitLiq = pesoUnitLiq.toString().replace(",",".")
	}
	
	desQtde = parseFloat(desQtde)
	pesoUnit = parseFloat(pesoUnit)
	pesoUnitLiq = parseFloat(pesoUnitLiq)
	
	var peso = desQtde * pesoUnit
	var pesoUnLiq = desQtde * pesoUnitLiq
	
	$("#F_PESOBRUTO").val(peso)
	$("#F_PESOLIQUIDO").val(pesoUnLiq)
	
}

// ALTERA A QTDE DE TODOS OS COMPONENTES DA LISTA
function alteraQtdeComponentesPeso(){
	
	console.log("vou alterar a qtde peso")
	
	var idCriacao = $("#F_IDCRIACAO").val()
	
	// FAZ O CÁLCULO DO PESO BRUTO E LÍQUIDO
	calculaPesoBrutoLiquido()
	
	var totalQtde = $("#F_TOTALQTDE").val()
	var pesoBruto = $("#F_PESOBRUTO").val()
	
	pesoBruto = parseFloat(pesoBruto)
	totalQtde = parseInt(totalQtde)
	
	var qtdeUnit = pesoBruto/totalQtde
	qtdeUnit = qtdeUnit.toFixed(4)
	
	// PERCORRE A TABELA E COLETA TODOS OS ÍNDICES
	$('input[id^="PRODUTOCOMPONENTES___"]').each(function(index, value){
		
		// VARIÁVEL PARA O ÍNDICE DA TABELA
		var seq = $(this).attr("id").split("___")[1]
		var idCriacaoComp = $("#IDCRIACAOCOMPONENTES___"+seq).val()
		
		var lista = $("#LISTACOMPONENTES___"+seq).val()
		var substituto = $("#SUBSTITUTOCOMPONENTES___"+seq).val() 
		
		// SE ITEM VEIO DA LISTA OU SUBSTITUTO ESTÁ VAZIO
		if(idCriacao==idCriacaoComp && lista=="L" && (substituto=="" || substituto==null || substituto==undefined)){
			
			$("#QTDETOTALCOMPONENTES___"+seq).val(pesoBruto)
			$("#QTDEUNCOMPONENTES___"+seq).val(qtdeUnit)
			
		}
		
	})
	
	// PERCORRE A TABELA E COLETA TODOS OS ÍNDICES
	$('input[id^="VIEWPRODUTOCOMPONENTES___"]').each(function(index, value){
		
		// VARIÁVEL PARA O ÍNDICE DA TABELA
		var seq = $(this).attr("id").split("___")[1]
		var idCriacaoComp = $("#VIEWIDCRIACAOCOMPONENTES___"+seq).val()
		
		var lista = $("#VIEWLISTACOMPONENTES___"+seq).val()
		var substituto = $("#VIEWSUBSTITUTOCOMPONENTES___"+seq).val() 
		
		// SE ITEM VEIO DA LISTA OU SUBSTITUTO ESTÁ VAZIO
		if(idCriacao==idCriacaoComp && lista=="L" && (substituto=="" || substituto==null || substituto==undefined)){
			
			$("#VIEWQTDETOTALCOMPONENTES___"+seq).val(pesoBruto)
			$("#VIEWQTDEUNCOMPONENTES___"+seq).val(qtdeUnit)
			
		}
		
	})
	
} 

// VERIFICA O TEMPO INFORMADO E FORMATA VALOR
function verificaFormataValor(obj){

	var valor = $(obj).val()
	console.log("valor: "+valor)
	
	var campo = $(obj).attr("id")
	console.log("campo: "+campo)
	
	// SE VALOR NÃO É NÚMERO
	if(isNaN(valor)){
		
		$("#"+campo).val("")
		
		// EXIBE ALERTA 
		var Toast = Swal.mixin({
			  toast: true,
			  position: 'center',
			  showConfirmButton: false,
			  timer: 1000,
			  timerProgressBar: true,
		})
	
		Toast.fire({
			  icon: 'warning',
			  title: 'Digite um valor correto!'
		})
		
	} else {

		if(valor.includes(",")){
	
			valor = valor.replace(",",".")
			
		}
		
		valor = parseFloat(valor)
		
		var resto = valor % 3
		
		// SE É UM VALOR VÁLIDO
		if((resto==0)){
		
			valor = valor.toString()
			valor = valor.replace(".",",")
			console.log("novo valor: "+valor)
			$("#"+campo).val(valor)
			
		} else {
		// SE NÃO
		
			$(obj).val("")
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'Esse não é um valor válido!',
				  text: 'Verifique se o valor informado é múltiplo de 3 e tente novamente'
			})
		
		}

	}
	
}

// FORMATA VALORES TROCANDO PONTO POR VÍRGULA
function formataValor(obj){
	
	var valor = $(obj).val()
	console.log("valor: "+valor)
	
	var campo = $(obj).attr("id")
	console.log("campo: "+campo)
	valor = valor.replace(",",".")
	
	// SE VALOR NÃO É NÚMERO
	if(isNaN(valor)){
		
		$("#"+campo).val("")
		
		// EXIBE ALERTA 
		var Toast = Swal.mixin({
			  toast: true,
			  position: 'center',
			  showConfirmButton: false,
			  timer: 1000,
			  timerProgressBar: true,
		})
	
		Toast.fire({
			  icon: 'warning',
			  title: 'Digite um valor correto!'
		})
		
	} else {

		valor = valor.replace(".",",")
		console.log("novo valor: "+valor)
		$("#"+campo).val(valor)
		
	}
	
}

// FORMATA
function formValBanco(campo,valor){
	
	valor = valor.toString()
	
	valor = valor.replace(".",",")
	console.log("novo valor: "+valor)
	$("#"+campo).val(valor)
	
}

// FORMATA A DATA EM PADRÃO BRASILEIRO	
function formataData(data){
	
	var resultado = data.split("-");
	var ano = resultado[0];
	var mes = resultado[1];
	var dia = resultado[2];
	
	var novaData = dia+"/"+mes+"/"+ano;
	
	return novaData;
	
}

// LIMPA O ÍNDICE DO PROCESSO
function limpaIndiceProcesso(){
	
	$("#INDICE_PROCESSO").val("")
	
}

// PEGA VALOR SETADO DO CAMPO RADIO2 (TIPO DO DESENHO)
function pegaTipo2() {
	
	// PEGA O VALOR SELECIONADO DO RADIO2
	var tipo = $("input[name='RADIO2']:checked").val();
	
	// SALVA VALOR DO RADIO2 NO CAMPO OCULTO
	$("#VALOR_RADIO2").val(tipo)
	
}

// VERIFICA SE A OS ESTÁ LIBERADA PARA SER EDITADA
function verificaOS(){
	
	var numOS = $("#NUM_OS").val()
	var ret = true
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("NUM_OS",numOS,numOS,ConstraintType.MUST);
	var constraints = new Array(c1);
	
	dataset = DatasetFactory.getDataset("dsVerificaOS",null,constraints,null);
	
	var row = dataset.values;
	var count = dataset.values.length;
	console.log("row "+row)
	
	console.log("Valor de count "+row);
	
	// SE RETORNO É VAZIO
	if(row=="" || row==undefined || row==null || row=="null"){

		return false
		
	} else {
		// SE NÃO, OS JÁ ESTÁ NO BANCO
		
		return true
	
	}
	
	return ret
	
}

// EXIBE UM BALÃO COM O TEXTO COMPLETO DO CAMPO AO PASSAR O MOUSE SOBRE ELE
function mouse(e){
	
	console.log("entrei para exibir conteúdo")
	
	// PEGA O VALOR COMPLETO PREENCHIDO NO CAMPO
	var valCampo = $(e).val();
	
	console.log("valCampo: "+valCampo)
	
	// SE CAMPO NÃO FOI PREENCHIDO
	if(valCampo == "" || valCampo == null){
		
		return false;
		
	}
	// SE CAMPO FOI PREENCHIDO
	else{
		
		// CARREGA EM "TITLE" O VALOR DO CAMPO PREENCHIDO
		$(e).prop("title", valCampo);
		return true;
		
	}
	
}

// CALCULA A QUANTIDADE TOTAL PARA O CAMPO MODAL
function calculaTotalQtde(){
	
	var indice = $("#INDICE_INFO").val()
	var nivel = indice.substr(0,indice.lastIndexOf("."))
	var idCriacao = buscaIdCriacao(indice)
	
	var numOS = $("#NUM_OS").val()
	
	// CONSTRÓI A CONSULTA DO DATASET
	var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("NIVEL",nivel,nivel,ConstraintType.MUST)
	
	var constraints = new Array(a1,a2)
	
	var dataset = DatasetFactory.getDataset("dsBuscaItemEstruturaOS",null,constraints,null)
	var row = dataset.values
	
	var rep = row[0]
	
	var nivel = rep["NIVEL"]
	
	var totalPai = ""
		
	// SE NÍVEL NÃO É VAZIO OU NULO
	if(!(nivel=="" || nivel==null || nivel==undefined || nivel=="null")){
	
		// CONSTRÓI A CONSULTA DO DATASET
		var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
		var a2 = DatasetFactory.createConstraint("NIVEL",nivel,nivel,ConstraintType.MUST)
		var constraints = new Array(a1,a2)
		var dataset = DatasetFactory.getDataset("dsBuscaQtdePaiOS",null,constraints,null)
		
		var row2 = dataset.values
		var rep2 = row2[0]
		totalPai = rep2["TOTALQTDE"]
		
	} else {
	
		totalPai = 1
		
	}
	
	var desQtde = $("#QTDE_INFO").val()
	var totalQtde = ""
		
	desQtde = parseInt(desQtde)
	
	console.log("desQtde "+desQtde)
	console.log("totalPai "+totalPai)
	
	//
	if(totalPai=="" || totalPai==undefined || totalPai==null || totalPai=="NaN" || totalPai==NaN){
		
		totalPai = 1
		
	} else{
		
		totalPai = parseInt(totalPai)
		
	}
	
	// SE NÍVEL É VAZIO
	if(nivel==""){
		
		totalQtde = desQtde
		
	}
	else{
		// SE NÃO
		
		totalQtde = totalPai * desQtde
		
	}
	
	console.log("calculei "+totalQtde)
	
	// SALVA A QUANTIDADE TOTAL
	$("#QTDETOTAL_INFO").val(totalQtde)
	
	// CALCULA A QUANTIDADE DOS COMPONENTES
	calculaQtdesComponentesGeral(idCriacao)
	
}

// CALCULA A QUANTIDADE TOTAL
function calculaTotal(){
	
	console.log("calcula/recalcula o total dos pesos")
	
	var desQtde = $("#F_DESQTDE").val()
	var totalPesoBruto = 0
	var totalPesoLiquido = 0
	
	var pesoBrutoUn = $("#PESOBRUTOUNIT").val() 
	var pesoLiquidoUn = $("#PESOLIQUIDOUNIT").val()
	
	// SE PESO BRUTO UNITÁRIO OU PESO LÍQUIDO UNITÁRIO NÃO É UM NUMERAL
	if(!(isNaN(pesoBrutoUn) || isNaN(pesoLiquidoUn))){
		
		console.log("peso bruto unitário e peso líquido unitário não é um numeral")
		
		desQtde = parseInt(desQtde)
		pesoBrutoUn = parseFloat(pesoBrutoUn)
		pesoLiquidoUn = parseFloat(pesoLiquidoUn)
		
		// SE PESO BRUTO UNITÁRIO OU PESO LÍQUIDO UNITÁRIO NÃO É IGUAL A 0
		if(!((pesoBrutoUn==0 || pesoBrutoUn==NaN) || (pesoLiquidoUn==0 || pesoLiquidoUn==NaN ))){
			
			console.log("vou calcular os totais do peso bruto e líquido")
			
			totalPesoBruto = pesoBrutoUn * desQtde
			totalPesoLiquido = pesoLiquidoUn * desQtde
			
		}
		
		// SALVA OS NOVOS PESOS TOTAIS 
		$("#F_PESOBRUTO").val(totalPesoBruto) 
		$("#F_PESOLIQUIDO").val(totalPesoLiquido)
		
	}
	
}

// SALVA A QUANTIDADE NA TABELA DE COMPONENTES
function salvaQtdeComp(){
	
	console.log("vou salvar a quantidade na tabela de componentes")
	
	var qtde = $("#F_DESQTDE").val()
	
	// SE NÃO É UM VALOR VÁLIDO OU MENOR QUE 0
	if(isNaN(qtde) || parseInt(qtde)<=0){

		// LIMPA O CAMPO
		$("#F_DESQTDE").val("")
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'A quantidade informada é inválida!',
			  text: 'Verifique e tente novamente'
		})

	} else {
		// SE NÃO
		
		// SE QUNATIDADE É UM VALOR VÁLIDO
		if(!(qtde=="" || qtde==null || qtde==undefined)){
			
			var qtdeCalc = qtde
			
			if(qtdeCalc.includes(",")){
				
				qtdeCalc = qtdeCalc.replace(",",".")
				qtdeCalc = parseFloat(qtdeCalc)
				
			}
			
			if(qtde.includes(".")){
				
				qtde = qtde.replace(".",",")
				
			}
			
			// PERCORRE A TABELA DOS COMPONENTES
			$("input[id^='VIEWPRODUTOCOMPONENTES___']").each(function(){
			
				var seq = $(this).attr("id").split("___")[1]

				// SE PRINCIPAL COMPONENTE
				if($("#VIEWPRINCIPALCOMP___"+seq).val()=="SIM"){
					
					$("#VIEWQTDETOTALCOMPONENTES___"+seq).val(qtde)
					
				}
				
			})
			
			// BUSCA O PESO UNITÁRIO
			var pesoUnit = buscaPesoUnit()
			
			if(pesoUnit.includes(",")){
				
				pesoUnit = pesoUnit.replace(",",".")
				pesoUnit = parseFloat(pesoUnit)
				
			}	
			
			console.log("pesoUnit: "+pesoUnit+", qtdeCalc: "+qtdeCalc)
			
			var pesoTotal = pesoUnit * qtdeCalc
			
			console.log("pesoUnit: "+pesoUnit)
			console.log("pesoTotal: "+pesoTotal)
			
			// SALVA OS PESOS
			$("#F_PESOUNITARIO").val(pesoUnit)
			$("#F_PESOBRUTO").val(pesoTotal)
			$("#F_PESOLIQUIDO").val(pesoTotal)
			
		}
		
	}
		
}


// BUSCA O PESO UNITÁRIO
function buscaPesoUnit(){
	
	var numOS = $("#NUM_OS").val()
	var idCriacao = $("#F_IDCRIACAOREAL").val()
	
	console.log("numOS: "+numOS+" e idCriacao: "+idCriacao)
	
	var a1 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	
	var constraints = new Array(a1,a2)
	
	var dataset = DatasetFactory.getDataset("dsBuscaItemEstruturaOS",null,constraints,null)
	
	var row = dataset.values
	
	console.log("row")
	console.log(row)
	
	var rep = row[0]
	
	var pesoUnit = rep["PESOUNITARIO"]
	
	console.log("pesoUnit: "+pesoUnit)
	
	return pesoUnit
	
}

// LIMPA O CONTEÚDO DO ZOOM
function limparZoomProduto(){
	
	console.log("vou limpar o zoom")
		
	$("#F_PRODUTO_RM").val("")
	$("#F_IDPRD").val("")
	$("#F_CODIGOPRD").val("")
	//$("#F_PRODUTO_RM").prop("readonly",false)
	
}

// LIMPA O CONTEÚDO DO ZOOM
function limparZoom(obj){

	console.log("vou limpar o zoom")
	console.log(obj)
	
	var seq = $(obj).attr("id").split("___")[1]
		
	$("#VIEWPRODUTOCOMPONENTES___"+seq).val("")
	$("#VIEWIDPRDCOMPONENTES___"+seq).val("")
	$("#VIEWCODIGOPRDCOMPONENTES___"+seq).val("")
	$("#VIEWCODUNDCOMPONENTES___"+seq).val("")

}

// LIMPA O CONTEÚDO DO ZOOM
function limparZoomTarefa(){

	console.log("vou limpar o zoom da Tarefa")
	
	$("#F_CODIGOTAREFA").val("")
	$("#F_CODTRFITEM").val("")
	$("#F_IDTRFITEM").val("")
	$("#F_NOMETRFITEM").val("")

}


// LIMPA O CONTEÚDO DO ZOOM DA ATIVIDADE
function limparZoomAtv(obj){

	console.log("vou limpar o zoom da atividade")
	console.log(obj)
	
	var seq = $(obj).attr("id").split("___")[1]
		
	$("#VIEWATIVIDADE___"+seq).val("")
	$("#VIEWCODATIVIDADE___"+seq).val("")
	$("#VIEWDESCATIVIDADE___"+seq).val("")
	$("#VIEWHABILIDADEREQUERIDA___"+seq).val("")

}

// LIMPA O CONTEÚDO DO ZOOM DA ATIVIDADE
function limparZoomPosto(obj){

	console.log("vou limpar o zoom da atividade")
	console.log(obj)
	
	var seq = $(obj).attr("id").split("___")[1]
		
	$("#VIEWPOSTO___"+seq).val("")
	$("#VIEWCODPOSTO___"+seq).val("")
	$("#VIEWDESCPOSTO___"+seq).val("")

}

// CALCULA TOTAL DOS MINUTOS
function calculaTotalMinutos(obj){
	
	// VARIÁVEL PARA O SEQ DA TABELA
	var seq = $(obj).attr("id").split("___")[1]
	
	var fila = $("#VIEWFILA___"+seq).val()
	console.log("fila: "+fila)
	
	// SE FOI PREENCHIDO
	if(fila=="" || fila==null || fila==undefined){
		
		fila = 0
	
	}else{
		// SE NÃO
		
		fila = fila.replace(",",".")
		
		fila = parseFloat(fila)
	
	}
	
	var configuracao = $("#VIEWCONFIGURACAO___"+seq).val()
	console.log("configuracao: "+configuracao)
	
	// SE FOI PREENCHIDO
	if(configuracao=="" || configuracao==null || configuracao==undefined){
		
		configuracao = 0
		
	}else{
		// SE NÃO
		
		configuracao = configuracao.replace(",",".")
		
		configuracao = parseFloat(configuracao)
		
	}
	
	var processamento = $("#VIEWPROCESSAMENTO___"+seq).val()
	console.log("processamento: "+processamento)
	
	// SE FOI PREENCHIDO
	if(processamento=="" || processamento==null || processamento==undefined){
		
		processamento = 0
		
	}else{
		// SE NÃO
		
		processamento = processamento.replace(",",".")
		
		processamento = parseFloat(processamento)
		
	}
	
	var desagregacao = $("#VIEWDESAGREGACAO___"+seq).val()
	console.log("desagregacao: "+desagregacao)
	
	// SE FOI PREENCHIDO
	if(desagregacao=="" || desagregacao==null || desagregacao==undefined){
		
		desagregacao = 0
		
	}else{
		// SE NÃO

		desagregacao = desagregacao.replace(",",".")
		
		desagregacao = parseFloat(desagregacao)
		
	}
	
	var espera = $("#VIEWESPERA___"+seq).val()
	console.log("espera: "+espera)
	
	// SE FOI PREENCHIDO
	if(espera=="" || espera==null || espera==undefined){
		
		espera = 0
		
	}else{
		// SE NÃO
		
		espera = espera.replace(",",".")
		
		espera = parseFloat(espera)
		
	}
	
	var movimentacao = $("#VIEWMOVIMENTACAO___"+seq).val()
	console.log("movimentacao: "+movimentacao)
	
	// SE FOI PREENCHIDO
	if(movimentacao=="" || movimentacao==null || movimentacao==undefined){
		
		movimentacao = 0
		
	}else{
		// SE NÃO
		
		movimentacao = movimentacao.replace(",",".")
		
		movimentacao = parseFloat(movimentacao)
		
	}
	
	var soma = fila + configuracao + processamento + desagregacao + espera + movimentacao
	
	soma = soma.toString()
	
	soma = soma.replace(".",",")
	
	$("#VIEWMINUTOSGASTOS___"+seq).val(soma)
	
}

// BUSCA QUAL O ITEM DA TABELA FOI SELECIONADO
function buscaSelecionadoZoom(){
	
	var seqRet = ""
	
	console.log("vou buscar o zoom selecionado")
	
	// PERCORRE A TABELA E COLETA TODOS OS ITENS
	$('input[id^="VIEWPRODUTOCOMPONENTES___"]').each(function(index, value){
		
		// VARIÁVEL PARA O ÍNDICE DA TABELA
		var seq = $(this).attr("id").split("___")[1]
		
		// SE O ZOOM É O SELECIONADO
		if($("#VIEWPRODUTOCOMPONENTES___"+seq).hasClass("selecionadoZoom")){
			
			seqRet = seq
			
		}
		
	})
	
	console.log("seq selecionado: "+seqRet)
	return seqRet
	
}

// APAGA TODOS OS ITENS DA TABELA PROCESSOS REFERENTES AO IDCRIAÇÃO
function apagaItensTabelaProcessos(idCriacao){
	
	var numOS = $("#NUM_OS").val()
	
	var a1 = DatasetFactory.createConstraint("IDCRIACAOPROCESSO",idCriacao,idCriacao,ConstraintType.MUST);
	var a2 = DatasetFactory.createConstraint("OSPROCESSO",numOS,numOS,ConstraintType.MUST);

	var constraints = new Array(a1,a2);
	
	dataset = DatasetFactory.getDataset("dsDeleteItemProcOS",null,constraints,null);
	
}

// APAGA TODOS OS ITENS DA TABELA COMPONENTES REFERENTES AO IDCRIAÇÃO
function apagaItensTabelaComponentes(idCriacao){
	
	var numOS = $("#NUM_OS").val()
	
	var a1 = DatasetFactory.createConstraint("IDCRIACAOCOMPONENTES",idCriacao,idCriacao,ConstraintType.MUST);
	var a2 = DatasetFactory.createConstraint("OSCOMPONENTES",numOS,numOS,ConstraintType.MUST);

	var constraints = new Array(a1,a2);
	
	dataset = DatasetFactory.getDataset("dsDeleteItemCompOS",null,constraints,null);
	
}

// EXCLUI UM ITEM DA VIEW DA TABELA DE PROCESSO
function excluirProcesso(oElement){
	
	// EXIBE ALERTA
	Swal.fire({
	
		  title: 'Tem certeza que deseja remover este item?',
		  text: "Atenção, essa ação não poderá ser desfeita.",
		  icon: 'warning',
		  showCancelButton: true,
		  allowEscapeKey: true,
		  allowOutsideClick: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#F08E8E',
		  confirmButtonText: 'Sim',
		  cancelButtonText: 'Cancelar',
		
	}).then(function(result){
		
		  // SE SIM
		  if (result.value) {
			  
			// ATIVA O LOAD
			var myLoading2 = FLUIGC.loading(window);
			myLoading2.show();
			
			setTimeout(function(){
			
				console.log("vou remover!!!")
				
				var seq = $(oElement).attr("id").split("___")[1]
			    
			    var idCriacao = $("#VIEWIDCRIACAOPROCESSO___"+seq).val()
			    var idProcesso = $("#VIEWIDPROCESSO___"+seq).val()
			    var prioridade = $("#VIEWPRIORIDADE___"+seq).val()
			    
			    console.log("idCriacao: "+idCriacao+", idProcesso: "+idProcesso+", prioridade: "+prioridade)
			    
			    // APAGA O ITEM DA VIEW DA TABELA COMPONENTES
			    fnWdkRemoveChild(oElement)
			    
			    // VERIFICA SE EXISTEM COMPONENTES VINCULADOS A ESSA ATIVIDADE
			    verificaPrioridadeComp(prioridade)
			    
			    // APAGA O ITEM NA TABELA DE COMPONENTES
			    //apagaItemComponentes(idCriacao,idprd)
				
			    // EXIBE ALERTA DA REMOÇÃO 
			    Swal.fire(
			      'Item removido!',
			      'success'
			    )
				
			},500)
				    
		    // DESATIVA O LOAD
			setTimeout(function(){
				
				myLoading2.hide();
				
			},500)
		    
		  } 
	  
	})
	
}

// PERCORRE A VIEW DOS COMPONENTES E LIMPA A INFORMAÇÃO DA PRIORIDADE DESSA ATIVIDADE
function verificaPrioridadeComp(prioridade){
	
	console.log("percorre a view dos componentes e limpa a informação da prioridade da atividade removida com prioridade "+prioridade)
	
	// PERCORRE TODOS OS COMPONENTES
	$("input[id^='VIEWCODUNDCOMPONENTES___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var prioridadeAux = $("#VIEWPRIORIDADEATVCOMPONENTES___"+seq).val()
		var listaComp = $("#VIEWLISTACOMPONENTES___"+seq).val()
		
		console.log("prioridade: "+prioridade+", prioridadeAux: "+prioridadeAux+", listaComp: "+listaComp)
			
		// SE É A MESMA PRIORIDADE
		if(prioridadeAux==prioridade){
			
			// LIMPA A PRIORIDADE
			$("#VIEWPRIORIDADEATVCOMPONENTES___"+seq).val("")
			
		}
		
	})
	
}

// EXCLUI ITEM NA TABELA COMPONENTES
function excluirComponente(oElement){
	
	console.log(oElement)
	
	var seq = $(oElement).attr("id").split("___")[1]
	console.log("seq "+seq)
	var idCriacao = $("#VIEWIDCRIACAOCOMPONENTES___"+seq).val()
	var idprd = $("#VIEWIDPRDCOMPONENTES___"+seq).val()
	
	console.log("idCriacao: "+idCriacao+", idprd: "+idprd)
	
	// EXIBE ALERTA
	Swal.fire({
	
		  title: 'Tem certeza que deseja remover este item?',
		  text: "Atenção, essa ação não poderá ser desfeita.",
		  icon: 'warning',
		  showCancelButton: true,
		  allowEscapeKey: true,
		  allowOutsideClick: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#F08E8E',
		  confirmButtonText: 'Sim',
		  cancelButtonText: 'Cancelar',
		
	}).then(function(result){
		
		  // SE SIM
		  if (result.value) {
			  
			// ATIVA O LOAD
			var myLoading2 = FLUIGC.loading(window);
			myLoading2.show();
		    
		    var seq = $(oElement).attr("id").split("___")[1]
		    
		    var idCriacao = $("#VIEWIDCRIACAOCOMPONENTES__"+seq).val()
		    var idComponentes = $("#VIEWIDCOMPONENTES___"+seq).val()
		
		     // APAGA O ITEM DA VIEW DA TABELA COMPONENTES
		    fnWdkRemoveChild(oElement)
		   
		    // EXIBE ALERTA DA REMOÇÃO 
		    Swal.fire(
		      'Item removido!',
		      'success'
		    )
		    
		    // DESATIVA O LOAD
			setTimeout(function(){
				
				myLoading2.hide();
				
			},500)
		    
		  } 
	  
	})
	
}

// EXCLUI ITEM NA TABELA COMPONENTES
function excluirComponente(oElement){
	
	console.log(oElement)
	
	var seq = $(oElement).attr("id").split("___")[1]
	console.log("seq "+seq)
	var idCriacao = $("#VIEWIDCRIACAOCOMPONENTES___"+seq).val()
	var idprd = $("#VIEWIDPRDCOMPONENTES___"+seq).val()
	
	console.log("idCriacao: "+idCriacao+", idprd: "+idprd)
	
	// EXIBE ALERTA
	Swal.fire({
	
		  title: 'Tem certeza que deseja remover este item?',
		  text: "Atenção, essa ação não poderá ser desfeita.",
		  icon: 'warning',
		  showCancelButton: true,
		  allowEscapeKey: true,
		  allowOutsideClick: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#F08E8E',
		  confirmButtonText: 'Sim',
		  cancelButtonText: 'Cancelar',
		
	}).then(function(result){
		
		  // SE SIM
		  if (result.value) {
			  
			// ATIVA O LOAD
			var myLoading2 = FLUIGC.loading(window);
			myLoading2.show();
		    
		    var seq = $(oElement).attr("id").split("___")[1]
		    
		    var idCriacao = $("#VIEWIDCRIACAOCOMPONENTES__"+seq).val()
		    var idComponentes = $("#VIEWIDCOMPONENTES___"+seq).val()
		
		    // APAGA O ITEM DA TABELA PROCESSO
		    apagaItemComponentes(idCriacao,idComponentes)
		   
		     // APAGA O ITEM DA VIEW DA TABELA COMPONENTES
		    fnWdkRemoveChild(oElement)
		   
		    // APAGA O ITEM NA TABELA DE COMPONENTES
		    //apagaItemComponentes(idCriacao,idprd)
			
		    // EXIBE ALERTA DA REMOÇÃO 
		    Swal.fire(
		      'Item removido!',
		      'success'
		    )
		    
		    // DESATIVA O LOAD
			setTimeout(function(){
				
				myLoading2.hide();
				
			},500)
		    
		  } 
	  
	})
	
}

// ATIVA O LOAD
function ativaSpinner() {
	
	//var myLoading = FLUIGC.loading(window);
	//myLoading.show();
	
	$("#PANEL1").css("opacity","0.2")
	$("#loader").show();
	  
}

// ATIVA ABA DESENHO COMO PRINCIAPL
function ativaAbaDesenho(){
	
	// REMOVE A CLASS ACTIVE DE TODAS AS ABAS
	$("#ABA_DESENHO").removeClass("active")
	$("#ABA_POSICOES").removeClass("active")
	$("#ABA_PROCESSO").removeClass("active")
	$("#ABA_COMPONENTES").removeClass("active")
	$("#DESENHO_BLANK").removeClass("active")
	$("#POSICOES_BLANK").removeClass("active")
	$("#PROCESSO_BLANK").removeClass("active")
	$("#COMPONENTES_BLANK").removeClass("active")
	
	// COLOCA A CLASS ACTIVE NA ABA DESENHO
	$("#ABA_DESENHO").addClass("active")
	$("#DESENHO_BLANK").addClass("active")

}

// SALVA AS ALTERAÇÕES NA TABELA DO ITEM SELECIONADO
function salvar(op) {
	
	console.log("entrei para salvar as alterações do item")
	
	// ATIVA O LOADING
	ativaSpinner()
	
	setTimeout(function(){
	
		var seqTabela = ""
		var indiceAtual = "" 
		var indiceForm = ""
		var indice = $("#F_INDICE").val()
		indice = indice.toString()
		var numOS = $("#NUM_OS").val()
		
		// CONSULTA BANCO
		var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
		var constraints = new Array(c1);
		
		//dataset = DatasetFactory.getDataset("dsBuscaEstruturaIntegrada",null,constraints,null);
		dataset = DatasetFactory.getDataset("dsBuscaEstrutura",null,constraints,null);
		
		// QUANTIDADE DE REGISTROS DA CONSULTA
		var row = dataset.values;
		var countRow = dataset.values.length
			
		var tipoDesenho = $("#VALOR_RADIO2").val()
		var desQtde = $("#F_DESQTDE").val()
		var pesoBruto = $("#F_PESOBRUTO").val()
		var undMedida = $("#F_UNDMEDIDA").val()
		var codTarefa = $("#F_CODIGOTAREFA").val()
		var retComp = false
		var retQtdeComp = false
		var retProc = false
		var prioridadeMil = false
			
		// SE QUANTIDADE OU PESOBRUTO NÃO FORAM PREENCHIDOS
		if( (desQtde=="" || desQtde==null || desQtde==undefined) || (pesoBruto=="" || pesoBruto==null || pesoBruto==undefined) || 
				(undMedida=="" || undMedida==null || undMedida==undefined) || (codTarefa=="" || codTarefa==null || codTarefa==undefined) ||
				(tipoDesenho=="" || tipoDesenho==null || tipoDesenho==undefined) ){
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'Necessário informar o Tipo, Unidade de medida, o Código da tarefa, o Peso Bruto e a Quantidade!',
				  text: 'Verifique e tente novamente'
			})
	
			desativaSpinner()
			
			return false
			
		} else {
			// SE NÃO, SE FORAM PREENCHIDOS
			
			// SE TABELA VIEW DE COMPONENTES FOI CRIADA
			if(tabelaComponentesExiste()){
				
				console.log("TEM ITENS NA TABELA COMPONENTES")
				
				// PERCORRE A TABELA E COLETA TODOS OS REGISTROS
				$('input[id^="VIEWPRODUTOCOMPONENTES___"]').each(function(index, value){
					
					var seq = $(this).attr("id").split("___")[1]
					
					var produtoComp = $("#VIEWPRODUTOCOMPONENTES___"+seq).val()
					var lista = $("#VIEWLISTACOMPONENTES___"+seq).val()
					var prioridadeAtv = $("#VIEWPRIORIDADEATVCOMPONENTES___"+seq).val()
					var qtdeUnComp = $("#VIEWQTDEUNCOMPONENTES___"+seq).val()
					var qtdeTotalComp = $("#VIEWQTDETOTALCOMPONENTES___"+seq).val()
					var substituto = $("#VIEWSUBSTITUTOCOMPONENTES___"+seq).val()
					
					// SE É UM NÃO MANUFATURADO
					if(tipoDesenho=="NAOMANUFATURADO"){
				
						if(produtoComp=="" || produtoComp==null || produtoComp==undefined){
							
							retComp = true
							
						}
						
						if( (substituto=="" || substituto==null || substituto==undefined) && ( (qtdeUnComp=="" || qtdeUnComp==null || qtdeUnComp==undefined) 
								|| (qtdeTotalComp=="" || qtdeTotalComp==null || qtdeTotalComp==undefined) ) ){
							
						
							retQtdeComp = true
							
						}
						
					} else {
						
						if((produtoComp=="" || produtoComp==null || produtoComp==undefined) || (!(lista=="L") && (prioridadeAtv=="" || prioridadeAtv==null || prioridadeAtv==undefined))){
							
							retComp = true
							
						}
						
						if( (substituto=="" || substituto==null || substituto==undefined) && ( (qtdeUnComp=="" || qtdeUnComp==null || qtdeUnComp==undefined) 
								|| (qtdeTotalComp=="" || qtdeTotalComp==null || qtdeTotalComp==undefined) ) ){
							
						
							retQtdeComp = true
							
						}

					}
					
				})
				
				if(retQtdeComp){
					
					// EXIBE ALERTA
					Swal.fire({
						  icon: 'error',
						  title: 'Há campos de quantidade unitária e/ou total de compenentes que não foram preenchidos!',
						  text: 'Verifique e tente novamente'
					})
				
					desativaSpinner()
					
					return false
					
				} else
				
				if(retComp){
					
					console.log("VOU EXIBIR O ALERTA")
					
					// EXIBE ALERTA
					Swal.fire({
						  icon: 'error',
						  title: 'Há campos obrigatórios na tabela de Componentes que não foram preenchidos!',
						  text: 'Verifique e tente novamente'
					})
				
					desativaSpinner()
					
					return false
					
				}
				
			}
			
			//
			if(!retComp && !retQtdeComp){
				
				// SE TABELA VIEW DE PROCESSOS FOI CRIADA
				if(tabelaProcessoExiste()){
				
					var prioridadesErro = new Array()
					
					// PERCORRE A TABELA E COLETA TODOS OS REGISTROS
					$('input[id^="VIEWPRIORIDADE___"]').each(function(index, value){
						
						var seq = $(this).attr("id").split("___")[1]
						
						var prioridade = $("#VIEWPRIORIDADE___"+seq).val()
						var atv = $("#VIEWATIVIDADE___"+seq).val()
						var habilidade = $("#VIEWHABILIDADEREQUERIDA___"+seq).val()
						var posto = $("#VIEWPOSTO___"+seq).val()
						var minutos = $("#VIEWMINUTOSGASTOS___"+seq).val()
						var descProcesso = $("#VIEWDESCPROCESSO___"+seq).val()
						var causador = $("#CODCLIENTECAUSADOR___"+seq).val()
						var causa = $("#CODCLIENTECAUSA___"+seq).val()
						var rncrr = $("#CODCLIENTERNCRR___"+seq).val()
						
						if( (prioridade=="" || prioridade==null || prioridade==undefined) || (atv=="" || atv==null || atv==undefined)
								|| (habilidade=="" || habilidade==null || habilidade==undefined) || (posto=="" || posto==null || posto==undefined)
								|| (minutos=="" || minutos==null || minutos==undefined) || (descProcesso=="" || descProcesso==null || descProcesso==undefined) ||
								(causador=="" || causador==null || causador==undefined) || (causa=="" || causa==null || causa==undefined) ||
								(rncrr=="" || rncrr==null || rncrr==undefined) ){
							
							prioridadesErro.push(prioridade)
							retProc = true
							
						}
						
						if(prioridade==1000){
							console.log("achei a prioridade 1000")
							prioridadeMil=true
							
						}
					
					})
					
					// SE TEM PRIORIDADE DUPLICADA
					if(prioridadeDuplicada()){
						
						// EXIBE ALERTA
						Swal.fire({
							  icon: 'error',
							  title: 'Há atividades com a mesma prioridade!',
							  text: 'Corrija e tente novamente'
						})
						
						desativaSpinner()
						
						return false
						
					}
					
					if(retProc){
						
						var msg = ""
							
						for(var i=0; i<prioridadesErro.length; i++){
							
							if(i==0){
								
								msg = prioridadesErro[i]
								
							} else {
								
								msg = msg +", "+prioridadesErro[i]
								
							}
							
						}
						
						// EXIBE ALERTA
						Swal.fire({
							  icon: 'error',
							  title: 'Há campos obrigatórios na tabela de Processos que não foram preenchidos!',
							  text: 'Verifique a(s) prioridade(s) : '+msg 
						})
						
						desativaSpinner()
						
						return false
						
					} 
								
				}
				
			}
		
			// SE PROCESSO E COMPONENTES FOI CONCLUÍDO
			if(!retProc && !retComp){
				
				console.log("todos os campos foram validados")
				
				// EXIBE ALERTA DA CÓPIA
				var Toast = Swal.mixin({
					  toast: true,
					  position: 'center',
					  showConfirmButton: false,
					  timer: 1000,
					  timerProgressBar: true,
				})
			
				Toast.fire({
					  icon: 'success',
					  title: 'Item validado!'
				})
				
				return true
				
			}
				
		}
		
	},500)
	
	setTimeout(function(){
	
		// DESATIVA O LOADING
		desativaSpinner()
		
	},500)		
	
}

// VERIFICA SE TABELA VIEW DE COMPONENTES FOI CRIADA
function tabelaComponentesExiste(){
	
	console.log("vou verificar se tabela de componentes existe")
	
	var ret = false
	
	// PERCORRE A TABELA DOS COMPONENTES
	$("input[id^='VIEWPRODUTOCOMPONENTES___']").each(function(){

		ret = true
		
	})
	
	return ret
	
}

// VERIFICA SE TABELA VIEW DE PROCESSOS FOI CRIADA
function tabelaProcessoExiste(){
	
	console.log("vou verificar se tabela de processo existe")
	
	var ret = false
	
	// PERCORRE A TABELA DOS COMPONENTES
	$("input[id^='VIEWPRIORIDADE___']").each(function(){

		ret = true
		
	})
	
	return ret
	
}

// SALVA OS SUBSTITUTOS EM UM ARRAY   
function salvaArraySubstitutos(){
	
	var substitutos = new Array()
	
	// PERCORRE A TABELA E COLETA TODOS OS REGISTROS
	$('input[id^="VIEWPRODUTOCOMPONENTES___"]').each(function(index, value){
		
		var seq = $(this).attr("id").split("___")[1]	
		
		var produto = $("#VIEWCODIGOPRDCOMPONENTES___"+seq).val()
		var lista = $("#VIEWLISTACOMPONENTES___"+seq).val()
		var substituto = $("#VIEWSUBSTITUTOCOMPONENTES___"+seq).val()
		var idprd = $("#VIEWIDPRDCOMPONENTES___"+seq).val()
		var prioridade = $("#VIEWPRIORIDADEATVCOMPONENTES___"+seq).val()

		console.log("substituto "+substituto)
		
		if(!(lista=="L") && !(substituto=="" || substituto==null || substituto==undefined)){

			var sub = {IDPRD:idprd,SUBSTITUTO:substituto,PRIORIDADE:prioridade}	
			
			substitutos.push(sub)
			
		} 
		
	})
	
	console.log("substitutos")
	console.log(substitutos)
	
	return substitutos	
	
}

// PREENCHE OS SUBSTITUTOS JÁ SALVOS
function preencheSubstitutos(substitutos){
	
	console.log("preenche os substitutos que já foram salvos")
	
	console.log("tam: "+substitutos.length)
	
	// PERCORRE OS SUBSTITUTOS SALVOS
	for(var i=0; i<substitutos.length; i++) {
     	
      var idprdAux = substitutos[i].IDPRD
      var substituto = substitutos[i].SUBSTITUTO
      var prioridadeAux = substitutos[i].PRIORIDADE
     
      console.log("idprdAux: "+idprdAux+", substituto: "+substituto+", prioridadeAux: "+prioridadeAux)
      
      // PERCORRE OS REGISTROS DOS COMPONENTES
      $("input[id^='VIEWPRODUTOCOMPONENTES___']").each(function(){
    	  
    	  var seq = $(this).attr("id").split("___")[1]
    	  
    	  var produto = $("#VIEWCODIGOPRDCOMPONENTES___"+seq).val()
  		  var lista = $("#VIEWLISTACOMPONENTES___"+seq).val()
  	 	  var idprd = $("#VIEWIDPRDCOMPONENTES___"+seq).val()
  		  var prioridade = $("#VIEWPRIORIDADEATVCOMPONENTES___"+seq).val()
    	  
  		  console.log("lista: "+lista+", idprd: "+idprd+", prioridade: "+prioridade)
  		  
		  // É O PRODUTO VINCULADO A MESMA ATIVIDADE
		  if(idprd==idprdAux && prioridade==prioridadeAux && !(lista=="L")){
  				  
	  		  $("#VIEWSUBSTITUTOCOMPONENTES___"+seq).val(substituto)
  				
  		  }
  		  
      })
      
	}
    
}

// VERIFICA SE TEM PRIORIDADE DUPLICADA
function prioridadeDuplicada(){
	
	console.log("vou verificar se na tabela de processo existe prioridade duplicada")
	
	var ret = false
	var prioridades = new Array()
	
	// PERCORRE A TABELA DOS COMPONENTES
	$("input[id^='VIEWPRIORIDADE___']").each(function(){

		var seq = $(this).attr("id").split("___")[1]
		
		var prioridade = $("#VIEWPRIORIDADE___"+seq).val()
		
		// SE PRIORIDADE JÁ FOI SALVA
		if(prioridades.includes(prioridade)){
			
			ret = true
			
		}
		
		prioridades.push(prioridade)
		
	})
	
	return ret
	
	
}

// FUNÇÃO PARA ESCONDER A OPÇÃO DE INICIAR SOLICITAÇÃO COM BASE NA ATUAL
parent.$('.wcm-all-content').bind('DOMNodeInserted', function(e){
	
   // QUANDO APARECER A TELA DE "SOLICITAÇÃO INICIADA COM SUCESSO" IRÁ ENTRAR NESSE IF
   if (e.target.id == 'message-page') {
	  
    // ESCONDE A OPÇÃO DE "INICIAR SOLICITAÇÃO COM BASE NESTA"
    parent.$('[data-reset-process-instance-id]').hide()
    
  }	
  
})

// DESATIVA O LOAD
function desativaSpinner() {
	
	setTimeout(function(){
		$("#PANEL1").css("opacity","1.0")
		$("#loader").hide();
	},500)
	
	/*setTimeout(function(){
		
		myLoading2.hide();
		
	}, 500)*/
	
}
