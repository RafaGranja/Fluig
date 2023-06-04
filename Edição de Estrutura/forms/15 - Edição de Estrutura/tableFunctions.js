// INCLUI UM NOVO ITEM NA TABELA DE CRACHÁ
function childAdd(){
	
	console.log("Entrei para adicionar um item na tabela")
	
	var row = wdkAddChild('ESTRUTURA')
	 
	// SETA CAMPO TABELA PARA SIM, INFORMANDO QUE JÁ TEM PELO MENOS UM ITEM ADICIONADO
	$("#TABELA").val("SIM")
	
	$("#COMPORLISTA___"+row).val("SIM")
	
	//formataCampos()
	 
	return row
	 
}

// BUSCA MAIOR ITEM DA TABELA
function buscaMaiorItem(){
	
	var maior = 0
	
	// PERCORRE A TABELA E COLETA TODOS OS REGISTROS
	$('input[id^="VIEWPRODUTOCOMPONENTES___"]').each(function(index, value){
		
		var seq = $(this).attr("id").split("___")[1]	
		var item = $("#VIEWITEM___"+seq).val()
		
		item = parseInt(item)
		
		if(item>maior){
			
			maior = item
			
		}
		
	})
	
	return maior
	
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
	
	/*var item = buscaMaiorItem()
	item = parseInt(item)
	
	item += 1
	
	$("#VIEWITEM___"+row).val(item)*/
	//apagaSubstitutos()
	//carregaSubstitutos()
	
	//formataCampos()
	 
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
	
	// VERIFICA SE TEM REGISTROS PARA LIBERAR OU NÃO FUNCIONALIDADE DE CÓPIA
	verificaItensCopia()
		
	return row
	 
}

// VERIFICA SE TEM REGISTROS PARA LIBERAR OU NÃO FUNCIONALIDADE DE CÓPIA
function verificaItensCopia(){
	
	var tem = false
	
	// PERCORRE REGISTROS DA TABELA DE PROCESSOS
	$("input[id^='VIEWPRIORIDADE___']").each(function(){
	
		tem = true
		
	})
	
	// SE TEM 
	if(tem){
		
		console.log("tem processos")
		
		$("#SPAN_DIV_INDICECOPIA").hide()
		$("#DIV_INDICECOPIA").hide()
		$("#DIV_INDICECOPIA").parent("div").hide()
		
	}else {
		
		console.log("não tem processos")
		
		$("#SPAN_DIV_INDICECOPIA").show()
		$("#DIV_INDICECOPIA").show()
		$("#DIV_INDICECOPIA").parent("div").show()	
		
	}
	
}

// INCLUI UM NOVO ITEM NA TABELA DE PROCESSOS
function addProcesso(){
	
	console.log("Entrei para adicionar um item na tabela de PROCESSOS")
	
	var row = wdkAddChild('TABELAPROCESSO')
	
	return row
	 
}


//EXCLUI UM ITEM DA VIEW DA TABELA DE PROCESSO
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
			  
			  var myLoading2 = FLUIGC.loading(window);
				
			  myLoading2.show();
			  	
			  // INICIA A OPERAÇÃO DEPOIS DE CARREGAR O LOAD
			  setTimeout(function(){

				    var seq = $(oElement).attr("id").split("___")[1]
				    
				    var idCriacao = $("#VIEWIDCRIACAOPROCESSO___"+seq).val()
				    var idProcesso = $("#VIEWIDPROCESSO___"+seq).val()
				
				    // APAGA O ITEM DA TABELA PROCESSO
				    apagaItemProcesso(idCriacao,idProcesso)
				  
				    // APAGA O ITEM DA VIEW DA TABELA COMPONENTES
				    fnWdkRemoveChild(oElement)
				    
			    	// VERIFICA SE TEM REGISTROS PARA LIBERAR OU NÃO FUNCIONALIDADE DE CÓPIA
				    verificaItensCopia()
				
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
					
			}, 500)
		    
		  } 
	  
	})
	
}

// INCLUI UM NOVO ITEM NA TABELA COMPONENTES
function addComponente(idCriacao){
	
	console.log("Entrei para adicionar um item na tabela Componentes")
	
	//var idCriacao = ("F_IDCRIACAO").val()
	
	var idComponentes = buscaIdComponentes(idCriacao)
	var numOS = $("#NUM_OS").val()
	
	var row = wdkAddChild('TABELACOMPONENTES')
	
	$("#OSCOMPONENTES___"+row).val(numOS)
	$("#IDCOMPONENTES___"+row).val(idComponentes)
	
	//formataCampos()
	 
	return row
	 
}

// EXCLUI ITEM NA TABELA DE CRACHÁ
function fnCustomDelete(oElement){
	
    fnWdkRemoveChild(oElement)

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
			  
			  var myLoading2 = FLUIGC.loading(window);
				
			  myLoading2.show();
			  	
			  // INICIA A OPERAÇÃO DEPOIS DE CARREGAR O LOAD
			  setTimeout(function(){

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
				    
			  },500)
		    
		    // DESATIVA O LOAD
			setTimeout(function(){
					
				myLoading2.hide();
					
			}, 500)
		    
		  } 
	  
	})
	
}

// VERIFICA SE A TABELA JÁ TEM ITENS
function tabelaTemItens(){
	
	console.log("vou verificar se já existe um item para a OS informada")
	
	// VARIÁVEL PARA CONTROLE
	var itens = false;
	
	// PERCORRE A TABELA E VERIFICA SE TEM ITENS
	/*$('input[id^="NIVEL___"]').each(function(index, value){
		
		itens = true
		
	})
	
	return itens*/
	
	var numOS = $("#NUM_OS").val()
	
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	
	var constraints = new Array(c1)
	var dataset = DatasetFactory.getDataset("dsExisteEstruturaOS",null,constraints,null)
	var row = dataset.values
	
	// SE RETORNO NÃO É VAZIO OU NULO
	if(!(row=="" || row==null || row==undefined || row=="null")){
		
		itens = true
		
	}
	
	console.log("já existe? "+itens)
	
	return itens
	
}

// PREENCHER TABELA COM OS DADOS PREENCHIDOS NO FORMULÁRIO
function preencherTabela() {
	
	//console.log("Entrei na função preencherTabela")
	
	var ret = true 
	
	//var tituloitem = $("#F_TITULOITEM").val()
	var posicaoIndice = $("#F_POSICAOINDICE").val()
	//var posicaoCompleta = $("#F_POSICAOCOMPLETA").val()
	var indiceAntigo = $("#F_INDICEANTIGO").val()
	var posicaoDesenho = $("#F_POSICAODESENHO").val()
	var nivel = $("#F_NIVEL").val()
	var undMedida = $("#F_UNDMEDIDA").val()
	var numdbi = $("#F_NUMDBI").val()
	var revisaodbi = $("#F_REVISAODBI").val()
	var numdesenho = $("#F_NUMDESENHO").val()
	var revisaodesenho = $("#F_REVISAODESENHO").val()
	var desqtde = $("#F_DESQTDE").val()
	var totalqtde = $("#F_TOTALQTDE").val()
	var descricao = $("#F_DESCRICAO").val()
	var bitola = $("#F_BITOLA").val()
	var espessura = $("#F_ESPESSURA").val()
	var largura = $("#F_LARGURA").val()
	var massaLinear = $("#F_MASSALINEAR").val()
	var esprosca = $("#F_ESPROSCA").val()
	var diametroInterno = $("#F_DIAMETROINTERNO").val()
	var diametroExterno = $("#F_DIAMETROEXTERNO").val()
	var comprimento = $("#F_COMPRIMENTO").val()
	var material = $("#F_MATERIAL").val()
	var produtoRM = $("F_PRODUTO_RM").val()
	var idprd = $("F_IDPRD").val()
	var codigoprd = $("#F_CODIGOPRD").val()
	//var qtdeMaterial = $("#F_QUANTIDADEMATERIAL").val()
	var observacoes = $("#F_OBSERVACOES").val()
	//var tipo = $("#VALOR_RADIO1").val()
	var tipoDesenho = $("#VALOR_RADIO2").val()
	var os = $("#F_OS").val()
	var dataRevisao = $("#F_DATAREVISAO").val()
	var obsDesenho = $("#F_OBSERVACOESDESENHO").val()
	var pesoBruto = $("#F_PESOBRUTO").val()
	var pesoLiquido = $("#F_PESOLIQUIDO").val()
	var perimetroCorte = $("#F_PERIMETROCORTE").val()
	var areaPintura = $("#F_AREAPINTURA").val()
	var obsProcesso = $("#F_OBSPROCESSO").val()
	var obsGeral = $("#F_OBSGERAL").val()
	//var categoria = $("#F_CATEGORIA").val()
	var areaSecao = $("#F_AREASECAO").val()
	var altura = $("#F_ALTURA").val()
	var larguraAba = $("#F_LARGURAABA").val()
	var espAlma = $("#F_ESPALMA").val()
	var espAba = $("#F_ESPABA").val()
	
	var codigoTarefa = $("#F_CODIGOTAREFA").val()
	var codtrf = $("#F_CODTRFITEM").val()
	var idtrf = $("#F_IDTRFITEM").val()
	var nomeTrf = $("#F_NOMETRFITEM").val()
	
	/*var material = ""
	var materialZoom = ""
	var novoMaterial = ""
	var idMaterial = ""
	var codigoprd = ""
	var checkbox1 = $("#CHECK_MATERIAL").is(':checked')
	console.log("checkbox: "+checkbox1)
	
	if(checkbox1){
		console.log("check habilitado, novo material")
		material = $("#F_MATERIAL").val()
		novoMaterial = $("#F_NOVOMATERIAL").val()
		
	}else {
		console.log("check desabilitado, vou pegar dados do zoom")
		materialZoom = $("#F_MATERIAL_ZOOM").val()
		idMaterial = $("#F_IDMATERIAL").val()
		codigoprd = $("#F_CODIGOPRD").val()
		
	}*/

	// SE TABELA JÁ TEM ITENS
	if(tabelaTemItens()){
		
		// SE OS CAMPOS OBRIGATÓRIOS NÃO FORAM PREENCHIDOS
		if((posicao=="" || posicao==null || posicao==undefined) || 
				(descricao=="" || descricao==null || descricao==undefined) || (numdesenho=="" || numdesenho==null ||
				numdesenho==undefined) || (nivel=="" || nivel==null || nivel==undefined)){
			
			// EXIBE ALERTA
			Swal.fire({
					  icon: 'error',
					  title: 'Há campos obrigatórios que não foram preenchidos!',
					  text: 'Verifique e tente novamente.'
				})
				
				ret = false
			
		} 
		// SE NÃO
		else {
			
			var seq = childAdd()
						
			//$("#TITULOITEM___"+seq).val(tituloitem)
			$("#SEQ___"+seq).val(seq)
			$("#NIVEL___"+seq).val(nivel)
			$("#UNDMEDIDA___"+seq).val(undMedida)
			$("#POSICAOINDICE___"+seq).val(posicaoIndice)
			//$("#POSICAOCOMPLETA___"+seq).val(posicaoCompleta)
			$("#POSICAODESENHO___"+seq).val(posicaoDesenho)
			$("#INDICEANTIGO___"+seq).val(indiceAntigo)
			$("#NUMDBI___"+seq).val(numdbi)
			$("#REVISAODBI___"+seq).val(revisaodbi)
			$("#NUMDESENHO___"+seq).val(numdesenho)
			$("#REVISAODESENHO___"+seq).val(revisaodesenho)
			$("#DESQTDE___"+seq).val(desqtde)
			$("#TOTALQTDE___"+seq).val(totalqtde)
			$("#DESCRICAO___"+seq).val(descricao)
			$("#BITOLA___"+seq).val(bitola)
			$("#ESPESSURA___"+seq).val(espessura)
			$("#LARGURA___"+seq).val(largura)
			$("#MASSALINEAR___"+seq).val(massaLinear)
			$("#ESPROSCA___"+seq).val(esprosca)
			$("#DIAMETROEXTERNO___"+seq).val(diametroExterno)
			$("#DIAMETROINTERNO___"+seq).val(diametroInterno)
			$("#COMPRIMENTO___"+seq).val(comprimento)
			$("#MATERIAL___"+seq).val(material)
			$("#PRODUTORM___"+seq).val(produtoRM)
			$("#IDPRD___"+seq).val(idprd)
			$("#CODIGOPRD___"+seq).val(codigoprd)
			//$("#QUANTIDADEMATERIAL___"+seq).val(qtdeMaterial)
			//$("#TIPO___"+seq).val(tipo)
			$("#OS___"+seq).val(os)
			$("#DATAREVISAO___"+seq).val(dataRevisao)
			$("#OBSERVACOESDESENHO___"+seq).val(obsDesenho)
			$("#PESOBRUTO___"+seq).val(pesoBruto)
			$("#PESOLIQUIDO___"+seq).val(pesoLiquido)
			$("#PERIMETROCORTE___"+seq).val(perimetroCorte)
			$("#AREAPINTURA___"+seq).val(areaPintura)
			$("#OBSPROCESSO___"+seq).val(obsProcesso)
			$("#OBSGERAL___"+seq).val(obsGeral)
			$("#TIPODESENHO___"+seq).val(tipoDesenho)
			//$("#MATERIAL_ZOOM___"+seq).val(materialZoom)
			//$("#NOVOMATERIAL___"+seq).val(novoMaterial)
			//$("#IDMATERIAL___"+seq).val(idMaterial)
			//$("#CODIGOPRD___"+seq).val(codigoprd)
			//$("#CATEGORIA___"+seq).val(categoria)
			$("#AREASECAO___"+seq).val(areaSecao)
			$("#ALTURA___"+seq).val(altura)
			$("#LARGURAABA__"+seq).val(larguraAba)
			$("#ESPALMA___"+seq).val(espAlma)
			$("#ESPABA___"+seq).val(espAba)
			
			$("#CODIGOTAREFADESC___"+seq).val(codigoTarefa)
			$("#CODTRFITEM___"+seq).val(codtrf)
			$("#IDTRFITEM___"+seq).val(idtrf)
			$("#NOMETRFITEM___"+seq).val(nomeTrf)
			
		}

		return ret
		
	} else {
		// SE NÃO, SE TABELA ESTÁ VAZIA (O PAI SERÁ INSERIDO)
		
		// SE OS CAMPOS OBRIGATÓRIOS NÃO FORAM PREENCHIDOS
		if((posicao=="" || posicao==null || posicao==undefined) || 
				(descricao=="" || descricao==null || descricao==undefined) || (numdesenho=="" || numdesenho==null ||
				numdesenho==undefined)){
			
			// EXIBE ALERTA
			Swal.fire({
					  icon: 'error',
					  title: 'Há campos obrigatórios que não foram preenchidos!',
					  text: 'Verifique e tente novamente.'
				})
				
				ret = false
			
		} 
		// SE NÃO
		else {
			
			var seq = childAdd()
			
			//$("#TITULOITEM___"+seq).val(tituloitem)
			//$("#MATERIAL_ZOOM___"+seq).val(materialZoom)
			//$("#NOVOMATERIAL___"+seq).val(novoMaterial)
			//$("#IDMATERIAL___"+seq).val(idMaterial)
			//$("#CODIGOPRD___"+seq).val(codigoprd)
			//$("#CATEGORIA___"+seq).val(categoria)
			//$("#POSICAOCOMPLETA___"+seq).val(posicaoCompleta)
			//$("#QUANTIDADEMATERIAL___"+seq).val(qtdeMaterial)
			//$("#TIPO___"+seq).val(tipo)
			$("#SEQ___"+seq).val(seq)
			$("#NIVEL___"+seq).val(nivel)
			$("#UNDMEDIDA___"+seq).val(undMedida)
			$("#POSICAOINDICE___"+seq).val(posicaoIndice)
			$("#POSICAODESENHO___"+seq).val(posicaoDesenho)
			$("#INDICEANTIGO___"+seq).val(indiceAntigo)
			$("#NUMDBI___"+seq).val(numdbi)
			$("#REVISAODBI___"+seq).val(revisaodbi)
			$("#NUMDESENHO___"+seq).val(numdesenho)
			$("#REVISAODESENHO___"+seq).val(revisaodesenho)
			$("#DESQTDE___"+seq).val(desqtde)
			$("#TOTALQTDE___"+seq).val(totalqtde)
			$("#DESCRICAO___"+seq).val(descricao)
			$("#BITOLA___"+seq).val(bitola)
			$("#ESPESSURA___"+seq).val(espessura)
			$("#LARGURA___"+seq).val(largura)
			$("#MASSALINEAR___"+seq).val(massaLinear)
			$("#ESPROSCA___"+seq).val(esprosca)
			$("#DIAMETROEXTERNO___"+seq).val(diametroExterno)
			$("#DIAMETROINTERNO___"+seq).val(diametroInterno)
			$("#COMPRIMENTO___"+seq).val(comprimento)
			$("#MATERIAL___"+seq).val(material)
			$("#PRODUTORM___"+seq).val(produtoRM)
			$("#IDPRD___"+seq).val(idprd)
			$("#CODIGOPRD___"+seq).val(codigoprd)
			$("#OS___"+seq).val(os)
			$("#DATAREVISAO___"+seq).val(dataRevisao)
			$("#OBSERVACOESDESENHO___"+seq).val(obsDesenho)
			$("#PESOBRUTO___"+seq).val(pesoBruto)
			$("#PESOLIQUIDO___"+seq).val(pesoLiquido)
			$("#PERIMETROCORTE___"+seq).val(perimetroCorte)
			$("#AREAPINTURA___"+seq).val(areaPintura)
			$("#OBSPROCESSO___"+seq).val(obsProcesso)
			$("#OBSGERAL___"+seq).val(obsGeral)
			$("#TIPODESENHO___"+seq).val(tipoDesenho)
			$("#AREASECAO___"+seq).val(areaSecao)
			$("#ALTURA___"+seq).val(altura)
			$("#LARGURAABA___"+seq).val(larguraAba)
			$("#ESPALMA___"+seq).val(espAlma)
			$("#ESPABA___"+seq).val(espAba)
			
		}

		return ret
		
	}
	
}
