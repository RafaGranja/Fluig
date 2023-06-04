// ADICIONA LINHA NA TABELA DO CABEÇALHO
function addCabecalho(){
	
	console.log("adicionar linha cabeçalho")
	
	var row = wdkAddChild('CABECALHO')
	 
	return row
	
}

// ADICIONA LINHA NA TABELA DE COMPONENTES
function addComponente(){
	
	console.log("adicionar linha componente")

	var row = wdkAddChild('COMPONENTES')
	 
	return row
	
}

// ADICIONA LINHA NA TABELA DAS RA'S
function addTabelaRA(){
	
	console.log("adicionar linha componente")

	var row = wdkAddChild('TABELA_RA')
	 
	return row
	
}

// EXPANDE O CONTEÚDO DO DETALHAMENTO DO ITEM
function expandir(e) {
	
	console.log("expandir")
	
    // ESCONDE/MOSTRA OS ÍCONES
    $("#ICONEXPANDIR").hide();
    $("#ICONREDUZIR").show();
    
    // EXIBE A ABA DOS ITENS
    $(".filtros").show()

}

// REDUZ O CONTEÚDO DO DETALHAMENTO DO ITEM
function reduzir(e) {
    
	console.log("reduzir")
	
    // ESCONDE/MOSTRA OS ÍCONES
    $("#ICONEXPANDIR").show();
    $("#ICONREDUZIR").hide();
    
    // ESCONDE A ABA DOS ITENS
    $(".filtros").hide()
    
}

// LIMPA TABELA DOS COMPONENTES
function limpaTabelaComponentes(){
	
	// PERCORRE OS ITENS DA TABELA E REMOVE O SEU CONTEÚDO
	$("input[id^='COMPONENTEREQ___']").each(function(index, value){
		
		$(this).parents("tr").remove();
		
	});
	
}

function titulo(op){
	
	// SE OPÇÃO É CADASTRAR
	if(op==1){
		
		$("#GERACAOBLANK").show()
		$("#CONSULTABLANK").hide()
		$(".TITULO2").hide()
		$(".TITULO1").show()
		
	} 
	
	// SE OPÇÃO É EDITAR
	if(op==2){
		
		$("#GERACAOBLANK").hide()
		$("#CONSULTABLANK").show()
		$(".TITULO2").show()
		$(".TITULO1").hide()

	}
	
}

// BUSCAR COMPONENTES 
function buscar(){
	
	console.log("vou buscar os componentes")
	
	var codColigada = $("#CODCOLIGADA_FILTRO").val()
	var codFilial = $("#CODFILIAL_FILTRO").val()
	var numOS = $("#CODPRJ").val()
	//var codOrdem = $("#CODORDEM").val()
	var codOrdem = $("#ORDEMPRODUCAO").val()
	//var idprd = $("#IDPRD").val()
	var componente = $("#IDPRD").val()
	
	console.log("codColigada: "+codColigada+", codFilial: "+codFilial+", numOS: "+numOS+", codOrdem: "+codOrdem+", componente: "+componente)
	
	// SE CAMPOS OBRIGATÓRIOS NÃO FORAM PREENCHIDOS
	if( (codFilial=="" || codFilial==null || codFilial==undefined) || (numOS=="" || numOS==null || numOS==undefined)
			|| (codOrdem=="" || codOrdem==null || codOrdem==undefined) ){
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'Há campos obrigatórios que não foram preenchidos',
			  text: 'Verifique o preenchimento dos campos com (*) e tente novamente'
		})
		
		
	} else {
		// SE NÃO
		
		var myLoading2 = FLUIGC.loading(window);

		myLoading2.show();
		
		setTimeout(function(){
			
			codOrdem = codOrdem.toString()
			componente = componente.toString()
			
			console.log("codOrdem: "+codOrdem+", componente: "+componente)
			
			var c1 = DatasetFactory.createConstraint("CODCOLIGADA", codColigada, codColigada, ConstraintType.MUST);
			var c2 = DatasetFactory.createConstraint("CODFILIAL", codFilial, codFilial, ConstraintType.MUST);
		    var c3 = DatasetFactory.createConstraint("CODCCUSTO", numOS, numOS, ConstraintType.MUST);
		    var c4 = DatasetFactory.createConstraint("CODORDEM", codOrdem, codOrdem, ConstraintType.MUST);
		    var c5 = DatasetFactory.createConstraint("IDPRD", componente, componente, ConstraintType.MUST);
		   
			var constraints = new Array(c1,c2,c3,c4,c5);
		    			    
		    var dataset = DatasetFactory.getDataset("dsComponentesRA", null, constraints, null);
		    
		    var row = dataset.values
		    
		    console.log("row")
		    console.log(row)
			
		    // SE NÃO TEVE RETORNO
		    if(row=="" || row==null || row==undefined){
		    	
		    	// EXIBE ALERTA
				Swal.fire({
					  icon: 'error',
					  title: 'Não foram localizados componentes para os filtros informados',
					  text: 'Verifique se a mesma possui PA/PC cadastrado ou se as informações foram preenchidas corretamente e tente novamente'
				})
		    	
		    } else {
		    	// SE NÃO
		    	
		    	// LIMPA TABELA DOS COMPONENTES
		    	limpaTabelaComponentes()
		    	
		    	// PERCORRE TODOS OS REGISTROS
		    	for(var i=0; i<row.length; i++){
		    		
		    		var rep = row[i]
		    		
		    		var seq = addComponente()
		    		
		    		// SALVA AS INFORMAÇÕES NOS CAMPOS DA TABELA
		    		$("#COMPONENTEREQ___"+seq).val(rep["CODIGOPRD"])
		    		$("#IDPRDREQ___"+seq).val(rep["IDPRD"])
		    		$("#IDPRDORIGEMREQ___"+seq).val(rep["IDPRDORIGEM"])
		    		$("#CODCOLIGADAREQ___"+seq).val(rep["CODCOLIGADA"])
		    		$("#CODFILIALREQ___"+seq).val(rep["CODFILIAL"])
		    		$("#OSREQ___"+seq).val(rep["CODCCUSTO"])
		    		$("#UNDREQ___"+seq).val(rep["CODUNDCONTROLE"])
		    		$("#OPREQ___"+seq).val(rep["CODORDEM"])
		    		$("#IDATVREQ___"+seq).val(rep["IDATVORDEM"])
		    		$("#ATIVIDADEREQ___"+seq).val(rep["DSCATIVIDADE"])
		    		$("#CODATIVIDADEREQ___"+seq).val(rep["CODATIVIDADE"])
		    		$("#ESTOQUEREQ___"+seq).val(rep["ESTOQUE_ATUAL"])
		    		$("#QTDEPREVREQ___"+seq).val(rep["CONSUMO_PLANEJADO"])
		    		$("#SALDOREQUISITADOREQ___"+seq).val(rep["SALDO_REQ"])
		    		$("#SALDOREQ___"+seq).val(rep["SALDO_REQUISITADO"])
		    		$("#SALDOBAIXADOREQ___"+seq).val(rep["CONSUMO_SALDO"])
		    		$("#DESCRICAOREQ___"+seq).val(rep["DESCRICAO"])
		    		$("#CUSTOMEDIOREQ___"+seq).val(rep["CUSTOMEDIO"])
		    		$("#CODLOCREQ___"+seq).val(rep["CODLOC"])
		    		
		    		console.log("idprdOrigem: "+rep["IDPRDORIGEM"])
		    		
		    		// SE É UM SUBSTITUTO
		    		if( ! (rep["IDPRDORIGEM"]=="" || rep["IDPRDORIGEM"]==null || rep["IDPRDORIGEM"]==undefined || rep["IDPRDORIGEM"]=="NULL" || rep["IDPRDORIGEM"]=="null" ) ){
		    			
		    			console.log("vou colocar o fundo substituto")
		    			
		    			$("#LINHA___"+seq).addClass("substituto")
		
		    		} 
		    		
		    	}
		    	
		    	// SE TABELA DOS FILTROS PARA A TABELA DE CADASTRO NÃO FOI CRIADA
				if(!(temTabelaFiltros())){
					
					console.log("vou incluir linha dos filtros")
					
					// ADICIONA LINHA PARA O FILTRO DA TELA DO CADASTRO
					addCabecalho()

				} else {
					// SE NÃO
					
					// LIMPA OS FILTROS
					limpaFiltros()
					
				}
				
		    	// CONSTRÓI FILTROS PARA A TABELA
		    	constroiFiltros()
		    	
		    	// EXIBE TABELAS
				$(".TABELAS").show()

		    }

			myLoading2.hide()
			
		},1000)
			
		
	}
	
}

//RETORNA ARRAY DE ORDENS SELECIONADAS
function arrayOrdens(){
	
	console.log("vou gerar string Ordem")
	
	var ordens = $("#ORDEMPRODUCAO").val()
	var strOrdem = ""
	
	console.log("ordens:")
	console.log(ordens)
	
	if(ordens.length==0){
		
		strOrdem = ""
		
	} else if(ordens.length==1){
		
		console.log("só um item selecionado")
		strOrdem = ordens[0]
		
	} else {
		
		console.log("mais de um item selecionado")
		
		
		for(var i=0; i<ordens.length;i++){
			
			if(i+1==ordens.length){
				
				strOrdem = strOrdem+""+ordens[i]+""
				
			} else {
				
				strOrdem = strOrdem+""+ordens[i]+";"
			}
			
		}
		
	}
	
	console.log("ordens: "+strOrdem)
	
	return strOrdem
	
}

// SELECIONA TODOS OS COMPONENTES
function selecionaComponentes(){
	
	console.log("seleciona todos os componentes")
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='COMPONENTEREQ___']").each(function(){
	
		var seq = $(this).attr("id").split("___")[1]
		
		var idprdOrigem = $("#IDPRDORIGEMREQ___"+seq).val()
		
		console.log("idprdOrigem: "+idprdOrigem)
		
		// SE NÃO ESTÁ SELECIONADO
		if( ! ($("#REQUISITANDO___"+seq).is(":checked") ) ){
			
			console.log("não está selecionado")
			
			// SE É UM PRODUTO PRINCIPAL
			if(idprdOrigem=="" || idprdOrigem==null || idprdOrigem=="null" || idprdOrigem=="NULL" || idprdOrigem==undefined){
				
				console.log("é um principal")
				
				// VERIFICA SE O COMPONENTE ESTÁ LIBERADO PARA SER SELECIONADO
				if(componenteLiberado(seq,1)){
					
					console.log("está liberado, vou selecionar")
					
					// COLOCA A SELEÇÃO
					$("#REQUISITANDO___"+seq).prop('checked',true)
					$("#REQUISITANDO___"+seq).val("1")
					//$("#QTDEREQ___"+seq).val($("#SALDOREQ___"+seq).val())
					colocaSelecao($("#REQUISITANDO___"+seq))

				}
				
			}
			
		}
		else{

			$("#REQUISITANDO___"+seq).prop('checked',false)
			colocaSelecao($("#REQUISITANDO___"+seq))
		}
		
	})
	
}

// VERIFICA QTDE INFORMADA
function verificaQtde(obj){
	
	console.log("verifica qtde")
	
	var seq = $(obj).attr("id").split("___")[1]

	var qtde = $(obj).val()
	var codigoPrd = $("#COMPONENTEREQ___"+seq).val()
	var idprd = $("#IDPRDREQ___"+seq).val()
	var idprdOrigem = $("#IDPRDORIGEMREQ___"+seq).val()
	var saldo = $("#SALDOREQ___"+seq).val()
	var codOrdem = $("#OPREQ___"+seq).val()
	var idAtvOrdem = $("#IDATVREQ___"+seq).val()
	var saldoReq = $("#SALDOREQUISITADOREQ___"+seq).val()
	var undMedida = $("#UNDREQ___"+seq).val()
	var pont = qtde.split(".").length - 1
	var virg = qtde.split(",").length - 1
	var estoque = $("#ESTOQUEREQ___"+seq).val()

	// SE QUANTIDADE TEM VÍRGULA E PONTO
	if(pont + virg > 1){
		
		// LIMPA O VALOR
		$(obj).val("")
			
		// EXIBE ALERTA
		Swal.fire({
			icon: 'error',
			title: 'A quantidade informada não é um valor válido',
			text: 'Utilize apenas ponto ou virgula para expressar as quantidades'
		})
		
	}
	
	// SE QUANTIDADE TEM VÍRGULA
	if(qtde.includes(",")){
			
		qtde = qtde.replace(",",".")
		var tam = qtde.split('.')[1].length
		console.log("tam :"+ tam)
		
		if(Number(tam)>4){

			// LIMPA O VALOR
			$(obj).val("")
			
			// EXIBE ALERTA
			Swal.fire({
				icon: 'error',
				title: 'A quantidade informada não é um valor válido',
				text: 'Utilize apenas 4 casas após a vírgula'
			})

		}
	}
	
	qtde = parseFloat(qtde)
	
	console.log("qtde: "+qtde)
	
	var qtdePrev = $("#QTDEPREVREQ___"+seq).val()
	
	// SE QUANTIDADE
	if(qtdePrev.includes(",")){
		
		qtdePrev = qtdePrev.replace(",",".")
		
	}
	
	qtdePrev =  parseFloat(qtdePrev)
	
	// SE QUANTIDADE
	if(saldo.includes(",")){
		
		saldo = saldo.replace(",",".")
		
	}
	
	saldo =  parseFloat(saldo)
	
	// SE QUANTIDADE
	if(saldoReq.includes(",")){
		
		saldoReq = saldoReq.replace(",",".")
		
	}
	
	saldoReq =  parseFloat(saldoReq)
	
	// SE QUANTIDADE
	if(estoque.includes(",")){
		
		estoque = estoque.replace(",",".")
		
	}
	
	estoque =  parseFloat(estoque)
	
	estoque = parseFloat(estoque - buscaEstoque(idprd, seq)).toFixed(4)
	
	var qtdeReqAcum
	
	if(idprdOrigem==null || idprdOrigem=="NULL" || idprdOrigem==undefined || idprdOrigem=="null" || idprdOrigem==""){
		
		console.log("é o principal")
		
		qtdeReqAcum = buscaQtdeReqAcum(idprd,codOrdem,idAtvOrdem,seq)
		
	} else {
		
		console.log("é o substituto")
		
		qtdeReqAcum = buscaQtdeReqAcum(idprdOrigem,codOrdem,idAtvOrdem,seq)
		
	}
	
	console.log("codOrdem: "+codOrdem+", idAtvOrdem: "+idAtvOrdem+", qtdePrev: "+qtdePrev+", qtde: "+qtde+", saldo: "+saldo+", qtdeReqAcum: "+qtdeReqAcum+", saldoReq: "+saldoReq+", estoque: "+estoque)
	
	var saldoAtual = qtdePrev - (qtdeReqAcum + saldoReq) 
	
	console.log("saldoAtual: "+saldoAtual)
	
	// SE QUANTIDADE NÃO É UM VALOR NUMÉRICO
	if(isNaN(qtde) || qtde==0){
		
		// LIMPA O VALOR
		$(obj).val("")
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'A quantidade informada não é um valor válido',
			  text: 'Verifique e tente novamente'
		})
		
		if(idprdOrigem==null || idprdOrigem=="NULL" || idprdOrigem==undefined || idprdOrigem=="null" || idprdOrigem==""){
			
			console.log("é o principal")
			
			qtdeReqAcum = buscaQtdeReqAcum(idprd,codOrdem,idAtvOrdem,seq)
			
		} else {
			
			console.log("é o substituto")
			
			qtdeReqAcum = buscaQtdeReqAcum(idprdOrigem,codOrdem,idAtvOrdem,seq)
			
		}
		
		console.log("codOrdem: "+codOrdem+", idAtvOrdem: "+idAtvOrdem+", qtdePrev: "+qtdePrev+", qtde: "+qtde+", saldo: "+saldo+", qtdeReqAcum: "+qtdeReqAcum+", saldoReq: "+saldoReq)
		
		saldoAtual = qtdePrev - (qtdeReqAcum + saldoReq) 
		
		console.log("saldoAtual: "+saldoAtual)
		
		// SE É O PRINCIPAL
		if(idprdOrigem==null || idprdOrigem=="NULL" || idprdOrigem==undefined || idprdOrigem=="null" || idprdOrigem==""){
			
			// ATUALIZA O SALDO DE TODOS OS PRODUTOS E SUBSTITUTOS
			atualizaSaldo(codOrdem,idAtvOrdem,idprd,saldoAtual,seq)
				
		} else {
			// SE NÃO
			
			// ATUALIZA O SALDO DE TODOS OS PRODUTOS E SUBSTITUTOS
			atualizaSaldo(codOrdem,idAtvOrdem,idprdOrigem,saldoAtual,seq)
			
		}
		
	} else {
		// SE NÃO
		var qtde = $(obj).val()

		if(qtde.includes(",")){
			
			qtde = qtde.replace(",",".")
			var tam= qtde.split('.')[1].length
			console.log("tam :"+ tam)
			
		}
		
		// SE QUANTIDADE TEM VÍRGULA
		if(Number(tam)>0){
			
			// SE É KILO
			if(undMedida.toUpperCase()=="KG" || undMedida.toUpperCase()=="LI" || undMedida.toUpperCase()=="LT" || undMedida.toUpperCase()=="L"){
				
				qtde = qtde.replace(",",".")
				
				qtde = parseFloat(qtde)
				
				// SE SALDO APÓS O CÁLCULO É MENOR QUE 0
				if(saldoAtual<0){
					
					// LIMPA O VALOR
					$(obj).val("")
					
					// EXIBE ALERTA
					Swal.fire({
						  icon: 'error',
						  title: 'A quantidade informada ultrapassa a prevista, verifique o saldo a requisitar',
						  text: 'Verifique e tente novamente'
					})
					
					if(idprdOrigem==null || idprdOrigem=="NULL" || idprdOrigem==undefined || idprdOrigem=="null" || idprdOrigem==""){
						
						console.log("é o principal")
						
						qtdeReqAcum = buscaQtdeReqAcum(idprd,codOrdem,idAtvOrdem,seq)
						
					} else {
						
						console.log("é o substituto")
						
						qtdeReqAcum = buscaQtdeReqAcum(idprdOrigem,codOrdem,idAtvOrdem,seq)
						
					}
					
					console.log("codOrdem: "+codOrdem+", idAtvOrdem: "+idAtvOrdem+", qtdePrev: "+qtdePrev+", qtde: "+qtde+", saldo: "+saldo+", qtdeReqAcum: "+qtdeReqAcum+", saldoReq: "+saldoReq)
					
					saldoAtual = qtdePrev - (qtdeReqAcum + saldoReq) 

					console.log("saldoAtual: "+saldoAtual)

					// SE É O PRINCIPAL
					if(idprdOrigem==null || idprdOrigem=="NULL" || idprdOrigem==undefined || idprdOrigem=="null" || idprdOrigem==""){
						
						// ATUALIZA O SALDO DE TODOS OS PRODUTOS E SUBSTITUTOS
						atualizaSaldo(codOrdem,idAtvOrdem,idprd,saldoAtual,seq)
							
					} else {
						// SE NÃO
						
						// ATUALIZA O SALDO DE TODOS OS PRODUTOS E SUBSTITUTOS
						atualizaSaldo(codOrdem,idAtvOrdem,idprdOrigem,saldoAtual,seq)
						
					}
					
				} else {
					// SE NÃO
					
					console.log("SE NÃO 1, qtde: "+qtde+", estoque: "+estoque)

					// SE A QUANTIDADE INFORMADA É MAIOR QUE O ESTOQUE 22
					if(parseFloat(qtde)>parseFloat(estoque)){
						
						// LIMPA O VALOR
						$(obj).val("")
						
						// EXIBE ALERTA
						Swal.fire({
							  icon: 'error',
							  title: 'A quantidade informada ultrapassa o saldo disponível no estoque 22',
							  text: 'Verifique e tente novamente'
						})
						
						if(idprdOrigem==null || idprdOrigem=="NULL" || idprdOrigem==undefined || idprdOrigem=="null" || idprdOrigem==""){
							
							console.log("é o principal")
							
							qtdeReqAcum = buscaQtdeReqAcum(idprd,codOrdem,idAtvOrdem,seq)
							
						} else {
							
							console.log("é o substituto")
							
							qtdeReqAcum = buscaQtdeReqAcum(idprdOrigem,codOrdem,idAtvOrdem,seq)
							
						}
						
						console.log("codOrdem: "+codOrdem+", idAtvOrdem: "+idAtvOrdem+", qtdePrev: "+qtdePrev+", qtde: "+qtde+", saldo: "+saldo+", qtdeReqAcum: "+qtdeReqAcum+", saldoReq: "+saldoReq)
						
						saldoAtual = qtdePrev - (qtdeReqAcum + saldoReq) 

						console.log("saldoAtual: "+saldoAtual)

						// SE É O PRINCIPAL
						if(idprdOrigem==null || idprdOrigem=="NULL" || idprdOrigem==undefined || idprdOrigem=="null" || idprdOrigem==""){
							
							// ATUALIZA O SALDO DE TODOS OS PRODUTOS E SUBSTITUTOS
							atualizaSaldo(codOrdem,idAtvOrdem,idprd,saldoAtual,seq)
								
						} else {
							// SE NÃO
							
							// ATUALIZA O SALDO DE TODOS OS PRODUTOS E SUBSTITUTOS
							atualizaSaldo(codOrdem,idAtvOrdem,idprdOrigem,saldoAtual,seq)
							
						}

					} else {
						// SE NÃO
						
						// SE É O PRINCIPAL
						if(idprdOrigem==null || idprdOrigem=="NULL" || idprdOrigem==undefined || idprdOrigem=="null" || idprdOrigem==""){
							
							// ATUALIZA O SALDO DE TODOS OS PRODUTOS E SUBSTITUTOS
							atualizaSaldo(codOrdem,idAtvOrdem,idprd,saldoAtual,seq)
								
						} else {
							// SE NÃO
							
							// ATUALIZA O SALDO DE TODOS OS PRODUTOS E SUBSTITUTOS
							atualizaSaldo(codOrdem,idAtvOrdem,idprdOrigem,saldoAtual,seq)
							
						}
						
					}
					
				}
				
			} else {
				
				// LIMPA O VALOR
				$(obj).val("")
				
				// EXIBE ALERTA
				Swal.fire({
					  icon: 'error',
					  title: 'Para a unidade de medida desse componente a quantidade não pode ser um valor decimal',
					  text: 'Verifique e tente novamente'
				})
				
				if(idprdOrigem==null || idprdOrigem=="NULL" || idprdOrigem==undefined || idprdOrigem=="null" || idprdOrigem==""){
					
					console.log("é o principal")
					
					qtdeReqAcum = buscaQtdeReqAcum(idprd,codOrdem,idAtvOrdem,seq)
					
				} else {
					
					console.log("é o substituto")
					
					qtdeReqAcum = buscaQtdeReqAcum(idprdOrigem,codOrdem,idAtvOrdem,seq)
					
				}
				
				console.log("codOrdem: "+codOrdem+", idAtvOrdem: "+idAtvOrdem+", qtdePrev: "+qtdePrev+", qtde: "+qtde+", saldo: "+saldo+", qtdeReqAcum: "+qtdeReqAcum+", saldoReq: "+saldoReq)
				
				saldoAtual = qtdePrev - (qtdeReqAcum + saldoReq) 
				
				console.log("saldoAtual: "+saldoAtual)
				
				// SE É O PRINCIPAL
				if(idprdOrigem==null || idprdOrigem=="NULL" || idprdOrigem==undefined || idprdOrigem=="null" || idprdOrigem==""){
					
					// ATUALIZA O SALDO DE TODOS OS PRODUTOS E SUBSTITUTOS
					atualizaSaldo(codOrdem,idAtvOrdem,idprd,saldoAtual,seq)
						
				} else {
					// SE NÃO
					
					// ATUALIZA O SALDO DE TODOS OS PRODUTOS E SUBSTITUTOS
					atualizaSaldo(codOrdem,idAtvOrdem,idprdOrigem,saldoAtual,seq)
					
				}
				
			}
			
		} else {
			
			// SE SALDO APÓS O CÁLCULO É MENOR QUE 0
			if(saldoAtual<0){
				
				// LIMPA O VALOR
				$(obj).val("")
				
				// EXIBE ALERTA
				Swal.fire({
					  icon: 'error',
					  title: 'A quantidade informada ultrapassa a prevista, verifique o saldo a requisitar',
					  text: 'Verifique e tente novamente'
				})
				
				if(idprdOrigem==null || idprdOrigem=="NULL" || idprdOrigem==undefined || idprdOrigem=="null" || idprdOrigem==""){
					
					console.log("é o principal")
					
					qtdeReqAcum = buscaQtdeReqAcum(idprd,codOrdem,idAtvOrdem,seq)
					
				} else {
					
					console.log("é o substituto")
					
					qtdeReqAcum = buscaQtdeReqAcum(idprdOrigem,codOrdem,idAtvOrdem,seq)
					
				}
				
				console.log("codOrdem: "+codOrdem+", idAtvOrdem: "+idAtvOrdem+", qtdePrev: "+qtdePrev+", qtde: "+qtde+", saldo: "+saldo+", qtdeReqAcum: "+qtdeReqAcum+", saldoReq: "+saldoReq)
				
				saldoAtual = qtdePrev - (qtdeReqAcum + saldoReq) 

				console.log("saldoAtual: "+saldoAtual)

				// SE É O PRINCIPAL
				if(idprdOrigem==null || idprdOrigem=="NULL" || idprdOrigem==undefined || idprdOrigem=="null" || idprdOrigem==""){
					
					// ATUALIZA O SALDO DE TODOS OS PRODUTOS E SUBSTITUTOS
					atualizaSaldo(codOrdem,idAtvOrdem,idprd,saldoAtual,seq)
						
				} else {
					// SE NÃO
					
					// ATUALIZA O SALDO DE TODOS OS PRODUTOS E SUBSTITUTOS
					atualizaSaldo(codOrdem,idAtvOrdem,idprdOrigem,saldoAtual,seq)
					
				}
				
			} else {
				// SE NÃO
				
				console.log("SE NÃO, qtde: "+qtde+", estoque: "+estoque)
				
				// SE A QUANTIDADE INFORMADA ULTRAPASSA O SALDO DISPONÍVEL NO ESTOQUE 22
				if(parseFloat(qtde)>parseFloat(estoque)){
					
					// LIMPA O VALOR
					$(obj).val("")
					
					// EXIBE ALERTA
					Swal.fire({
						  icon: 'error',
						  title: 'A quantidade informada ultrapassa o saldo disponível no estoque 22',
						  text: 'Verifique e tente novamente'
					})
					
					if(idprdOrigem==null || idprdOrigem=="NULL" || idprdOrigem==undefined || idprdOrigem=="null" || idprdOrigem==""){
						
						console.log("é o principal")
						
						qtdeReqAcum = buscaQtdeReqAcum(idprd,codOrdem,idAtvOrdem,seq)
						
					} else {
						
						console.log("é o substituto")
						
						qtdeReqAcum = buscaQtdeReqAcum(idprdOrigem,codOrdem,idAtvOrdem,seq)
						
					}
					
					console.log("codOrdem: "+codOrdem+", idAtvOrdem: "+idAtvOrdem+", qtdePrev: "+qtdePrev+", qtde: "+qtde+", saldo: "+saldo+", qtdeReqAcum: "+qtdeReqAcum+", saldoReq: "+saldoReq)
					
					saldoAtual = qtdePrev - (qtdeReqAcum + saldoReq) 

					console.log("saldoAtual: "+saldoAtual)

					// SE É O PRINCIPAL
					if(idprdOrigem==null || idprdOrigem=="NULL" || idprdOrigem==undefined || idprdOrigem=="null" || idprdOrigem==""){
						
						// ATUALIZA O SALDO DE TODOS OS PRODUTOS E SUBSTITUTOS
						atualizaSaldo(codOrdem,idAtvOrdem,idprd,saldoAtual,seq)
							
					} else {
						// SE NÃO
						
						// ATUALIZA O SALDO DE TODOS OS PRODUTOS E SUBSTITUTOS
						atualizaSaldo(codOrdem,idAtvOrdem,idprdOrigem,saldoAtual,seq)
						
					}

					
					
				} else {
					// SE NÃO
					
					if(idprdOrigem==null || idprdOrigem=="NULL" || idprdOrigem==undefined || idprdOrigem=="null" || idprdOrigem==""){
						
						console.log("é o principal")
						
						qtdeReqAcum = buscaQtdeReqAcum(idprd,codOrdem,idAtvOrdem,seq)
						
					} else {
						
						console.log("é o substituto")
						
						qtdeReqAcum = buscaQtdeReqAcum(idprdOrigem,codOrdem,idAtvOrdem,seq)
						
					}
					
					console.log("codOrdem: "+codOrdem+", idAtvOrdem: "+idAtvOrdem+", qtdePrev: "+qtdePrev+", qtde: "+qtde+", saldo: "+saldo+", qtdeReqAcum: "+qtdeReqAcum+", saldoReq: "+saldoReq)
					
					saldoAtual = qtdePrev - (qtdeReqAcum + saldoReq) 

					console.log("saldoAtual: "+saldoAtual)

					// SE É O PRINCIPAL
					if(idprdOrigem==null || idprdOrigem=="NULL" || idprdOrigem==undefined || idprdOrigem=="null" || idprdOrigem==""){
						
						// ATUALIZA O SALDO DE TODOS OS PRODUTOS E SUBSTITUTOS
						atualizaSaldo(codOrdem,idAtvOrdem,idprd,saldoAtual,seq)
							
					} else {
						// SE NÃO
						
						// ATUALIZA O SALDO DE TODOS OS PRODUTOS E SUBSTITUTOS
						atualizaSaldo(codOrdem,idAtvOrdem,idprdOrigem,saldoAtual,seq)
						
					}
					
				}
								
			}
			
		}
				
	}
	
}

// BUSCA ESTOQUE
function buscaEstoque(idprd,seqAux){
	
	console.log("Busca estoque "+idprd+", seq: "+seqAux)
	
	var qtde = 0
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='COMPONENTEREQ___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var idprdAux = $("#IDPRDREQ___"+seq).val()
		var qtdeReq = $("#QTDEREQ___"+seq).val()
		
		console.log("idprdAux: "+idprdAux+", qtdeReq: "+qtdeReq+", seq: "+seq)
		
		// SE É O MESMO PRODUTO E NÃO É O MESMO REGISTRO
		if(idprd==idprdAux && !(seq==seqAux)){
			
			console.log("é o mesmo produto")
			
			// SE QTDE FOI INFORMADA
			if(!(qtdeReq=="" || qtdeReq==null || qtdeReq==undefined)){
				
				if(qtdeReq.includes(",")){
					
					qtdeReq = qtdeReq.replace(",",".")
					
				}
				
				qtdeReq = parseFloat(qtdeReq)
				
				qtde = qtde + qtdeReq
				
			}
			
		}
		
	})
	
	console.log("qtde: "+qtde)
	
	return qtde
	
}

// BUSCA SALDO ACUMULADO
function buscaQtdeReqAcum(idprd,codOrdem,idAtvOrdem,seqAux){
	
	console.log("buscaQtdeReq, idprd: "+idprd+", codOrdem: "+codOrdem+", idAtvOrdem: "+idAtvOrdem)
	
	console.log("busca saldo acumulado")
		
	var saldo = 0
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='COMPONENTEREQ___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var idprdAux = $("#IDPRDREQ___"+seq).val()
		var idprdOrigem = $("#IDPRDORIGEMREQ___"+seq).val()
		var qtdeReq = $("#QTDEREQ___"+seq).val()
		var codOrdemAux = $("#OPREQ___"+seq).val()
		var idAtvOrdemAux = $("#IDATVREQ___"+seq).val()
		
		// SE QTDE FOI INFORMADA
		if(!(qtdeReq=="" || qtdeReq==null || qtdeReq==undefined)){
			
			if(qtdeReq.includes(",")){
				
				qtdeReq = qtdeReq.replace(",",".")
				
			}
			
			qtdeReq = parseFloat(qtdeReq)
			
			// SE É UM SUBSTITUTO
			if(codOrdem==codOrdemAux && idAtvOrdem==idAtvOrdemAux && ( (idprd==idprdAux && seq==seqAux) || idprd==idprdOrigem) ){
				
				console.log("vou somar "+qtdeReq)
				
				saldo = saldo + qtdeReq
				
			}
			
		}
		
	})
	
	console.log("total saldo: "+saldo)
	
	return saldo
	
}

// COLOCA A SELEÇÃO
function colocaSelecao(obj){
	
	console.log("coloca a seleção")
	
	var seq = $(obj).attr("id").split("___")[1]
	
	var idprd = $("#IDPRDREQ___"+seq).val()
	var saldo = $("#SALDOREQ___"+seq).val()
	var codOrdem = $("#OPREQ___"+seq).val()
	var idAtvOrdem = $("#IDATVREQ___"+seq).val()
	//var saldoReq = $("#SALDOREQUISITADOREQ___"+seq).val()
	
	var idprdOrigem = $("#IDPRDORIGEMREQ___"+seq).val()
	var saldoReq = $("#SALDOREQUISITADOREQ___"+seq).val()
	var estoque = $("#ESTOQUEREQ___"+seq).val()
	var qtdePrev = $("#QTDEPREVREQ___"+seq).val()
	
	// SE QUANTIDADE
	if(qtdePrev.includes(",")){
		
		qtdePrev = qtdePrev.replace(",",".")
		
	}
	
	qtdePrev =  parseFloat(qtdePrev)
	
	//var saldoReq = $("#SALDOREQ___"+seq).val()
	
	if(saldoReq.includes(",")){
		
		saldoReq = saldoReq.replace(",",".")
		
	}
	
	saldoReq = parseFloat(saldoReq)
	
	if(saldo.includes(",")){
		
		saldo = saldo.replace(",",".")
		
	}
	
	saldo = parseFloat(saldo)
	
	if(estoque.includes(",")){
		
		estoque = estoque.replace(",",".")
		
	}
	
	estoque = parseFloat(estoque)
	
	estoque = parseFloat(estoque - buscaEstoque(idprd, seq)).toFixed(4)
	
	console.log("saldoReq: "+saldoReq+", estoque: "+estoque)
	
	// SE ITEM ESTÁ SELECIONADO
	if($("#REQUISITANDO___"+seq).is(":checked")){
		
		console.log("checkbox está selecionado")
		
		// VERIFICA SE O COMPONENTE ESTÁ LIBERADO PARA SER SELECIONADO
		if(componenteLiberado(seq,0)){
			
			// DESABILITA CAMPO
			$("#QTDEREQ___"+seq).removeAttr("readonly")
			$("#REQUISITANDO___"+seq).val("1")
			
			if(estoque>saldo){
				
				$("#QTDEREQ___"+seq).val(saldo)
					
			} else {
				
				$("#QTDEREQ___"+seq).val(estoque)
				
			}
			
			if(idprdOrigem==null || idprdOrigem=="NULL" || idprdOrigem==undefined || idprdOrigem=="null" || idprdOrigem==""){
				
				console.log("é o principal")
				
				qtdeReqAcum = buscaQtdeReqAcum(idprd,codOrdem,idAtvOrdem,seq)
				
			} else {
				
				console.log("é o substituto")
				
				qtdeReqAcum = buscaQtdeReqAcum(idprdOrigem,codOrdem,idAtvOrdem,seq)
				
			}

			var saldoAtual = qtdePrev - (qtdeReqAcum + saldoReq) 

			console.log("saldoAtual: "+saldoAtual+", qtdePrev: "+qtdePrev+", qtdeReqAcum: "+qtdeReqAcum+", saldoReq: "+saldoReq)
			
			// SE É O PRINCIPAL
			if(idprdOrigem==null || idprdOrigem=="NULL" || idprdOrigem==undefined || idprdOrigem=="null" || idprdOrigem==""){
				
				// ATUALIZA O SALDO DE TODOS OS PRODUTOS E SUBSTITUTOS
				atualizaSaldo(codOrdem,idAtvOrdem,idprd,saldoAtual,seq)
					
			} else {
				// SE NÃO
				
				// ATUALIZA O SALDO DE TODOS OS PRODUTOS E SUBSTITUTOS
				atualizaSaldo(codOrdem,idAtvOrdem,idprdOrigem,saldoAtual,seq)
				
			}
			
		}
		
	} else {
		// SE NÃO

		console.log("checkbox não está selecionado")
		
		// DESABILITA CAMPO
		$("#QTDEREQ___"+seq).attr("readonly",true)
		$("#QTDEREQ___"+seq).val("")
		$("#REQUISITANDO___"+seq).val("0")
		
		console.log("idprdOrigem: "+idprdOrigem)
		
		if(idprdOrigem==null || idprdOrigem=="NULL" || idprdOrigem==undefined || idprdOrigem=="null" || idprdOrigem==""){
			
			console.log("é o principal")
			
			qtdeReqAcum = buscaQtdeReqAcum(idprd,codOrdem,idAtvOrdem,seq)
			
		} else {
			
			console.log("é o substituto")
			
			qtdeReqAcum = buscaQtdeReqAcum(idprdOrigem,codOrdem,idAtvOrdem,seq)
			
		}

		var saldoAtual = qtdePrev - (qtdeReqAcum + saldoReq) 

		console.log("saldoAtual: "+saldoAtual+", qtdePrev: "+qtdePrev+", qtdeReqAcum: "+qtdeReqAcum+", saldoReq: "+saldoReq)
		
		// SE É O PRINCIPAL
		if(idprdOrigem==null || idprdOrigem=="NULL" || idprdOrigem==undefined || idprdOrigem=="null" || idprdOrigem==""){
			
			// ATUALIZA O SALDO DE TODOS OS PRODUTOS E SUBSTITUTOS
			atualizaSaldo(codOrdem,idAtvOrdem,idprd,saldoAtual,seq)
				
		} else {
			// SE NÃO
			
			// ATUALIZA O SALDO DE TODOS OS PRODUTOS E SUBSTITUTOS
			atualizaSaldo(codOrdem,idAtvOrdem,idprdOrigem,saldoAtual,seq)
			
		}
		
	}
	
}

// TEM COMPONENTE SELECIONADO
function temSelecao(){
	
	var ret = false

	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='COMPONENTEREQ___']").each(function(){
	
		var seq = $(this).attr("id").split("___")[1]
		
		// SE LINHA FOI SELECIONADA
		if($("#REQUISITANDO___"+seq).is(":checked")){
			
			ret = true
			
		} 
		
	})
	
	return ret
	
}

// EXIBE APENAS OS COMPONENTES
function preVisualizarRA(){
	
	console.log("exibe apenas os componentes que serão levados para a RA")
	
	var ret = true
	var button = $("#PREVISUALIZARA").val()

	// SE É PRA PRÉ VISUALIZAR
	if(button=="" || button==null || button==undefined){
		
		// TEM COMPONENTE SELECIONADO
		if(temSelecao()){
			
			// PERCORRE TODOS OS REGISTROS DA TABELA
			$("input[id^='COMPONENTEREQ___']").each(function(){
			
				var seq = $(this).attr("id").split("___")[1]
				
				// SE LINHA FOI SELECIONADA
				if($("#REQUISITANDO___"+seq).is(":checked")){
					
					$("#LINHA___"+seq).show()
					
				} else {
					// SE NÃO
					
					$("#LINHA___"+seq).hide()
					
				}
				
			})
			
			$("#PREVISUALIZARA").val(1)
			$("#PREVISUALIZARA").text("Voltar")
				
		} else {
			// SE NÃO
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'Não há componentes selecionados para gerar a RA',
				  text: 'Verifique e tente novamente'
			})
			
		}
		
	} else {
		// SE NÃO
		
		// PERCORRE TODOS OS REGISTROS DA TABELA
		$("input[id^='COMPONENTEREQ___']").each(function(){
		
			var seq = $(this).attr("id").split("___")[1]
				
			$("#LINHA___"+seq).show()
			
		})
		
		$("#PREVISUALIZARA").val("")
		$("#PREVISUALIZARA").text("Pré-visualizar RA")
		
	}
	
}

// SE TODOS OS COMPONENTES SELECIONADOS TÊM QUANTIDADE INFORMADA
function validaComponentes(){
	
	console.log("valida se todos os componentes selecionados têm quantidade informada")
	
	var ret = true
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='COMPONENTEREQ___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var qtde = $("#QTDEREQ___"+seq).val()
		
		// SE COMPONENTE FOI SELECIONADO
		if($("#REQUISITANDO___"+seq).is(":checked")){
			
			// SE NÃO FOI INFORMADA UMA QUANTIDADE VÁLIDA
			if(qtde=="" || qtde==null || qtde==undefined || qtde==0){
				
				ret = false
				
			}
			
		}
		
	})
	
	console.log("ret: "+ret)
	
	return ret
	
}

// VERIFICA SE O COMPONENTE ESTÁ LIBERADO PARA SER SELECIONADO
function componenteLiberado(seq,op){

	console.log("verifica se componente está liberado para ser selecionado")
	
	var estoque = $("#ESTOQUEREQ___"+seq).val()
	var saldoReq = $("#SALDOREQ___"+seq).val()
	
	if(saldoReq.includes(",")){
		
		saldoReq = saldoReq.replace(",",".")
		
	}
	
	saldoReq = parseFloat(saldoReq)
	
	if(estoque.includes(",")){
		
		estoque = estoque.replace(",",".")
		
	}
	
	estoque = parseFloat(estoque)
	
	console.log("saldoReq: "+saldoReq+", estoque: "+estoque)
	
	// SE O TOTAL PREVISTO JÁ ESTÁ SENDO REQUISITADO
	if(saldoReq<=0){
		
		// REMOVE A SELEÇÃO
		$("#REQUISITANDO___"+seq).removeAttr("checked")
		
		if(op==0){
		
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'A quantidade total prevista para esse componente já foi requisitada',
				  text: 'Verifique o saldo a requisitar e tente novamente'
			})
			
		}
		
		return false
		
	} else {
		// SE NÃO
		
		// SE TEM ESTOQUE
		if(estoque<=0){
			
			// REMOVE A SELEÇÃO
			$("#REQUISITANDO___"+seq).removeAttr("checked")
			
			if(op==0){
				
				// EXIBE ALERTA
				Swal.fire({
					  icon: 'error',
					  title: 'Não há saldo no estoque 22 para gerar a RA desse componente',
					  text: 'Verifique e tente novamente'
				})
				
			}
			
			return false
			
		} else {
			// SE NÃO
			
			// HABILITA O CAMPO
			$("#QTDEREQ___"+seq).removeAttr("readonly")
				
			return true
			
		}
		
	}
	
}

// ATUALIZA O SALDO DE TODOS OS PRODUTOS E SUBSTITUTOS
function atualizaSaldo(codOrdem,idAtvOrdem,idprd,qtdePrev,seqAux){
	
	console.log("vou atualizar o saldo do produto "+idprd+" e seus substitutos")
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='COMPONENTEREQ___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var idprdAux = $("#IDPRDREQ___"+seq).val()
		var idAtvOrdemAux = $("#IDATVREQ___"+seq).val()
		var codOrdemAux = $("#OPREQ___"+seq).val()
		var idprdOrigem = $("#IDPRDORIGEMREQ___"+seq).val()
		
		// SE PERTENCE A MESMA OP E ATIVIDADE E É O PRODUTO PRINCIPAL OU SUBSTITUTO
		if(idAtvOrdemAux==idAtvOrdem && codOrdemAux==codOrdem && ((idprdAux==idprd && seq==seqAux) || idprdOrigem==idprd)){
			
			// SALVA O NOVO SALDO
			$("#SALDOREQ___"+seq).val(qtdePrev.toFixed(2))
			
		}
		
	})
	
}

// BUSCA SALDO ACUMULADO
function buscaSaldoAcumulado(idprd){
	
	console.log("busca saldo acumulado")
	
	console.log("idprd: "+idprd)
	
	var saldo = 0
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='COMPONENTEREQ___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var idprdOrigem = $("#IDPRDORIGEMREQ___"+seq).val()
		var saldoAux = $("#SALDOREQ___"+seq).val()
		var qtdeReq = $("#QTDEREQ___"+seq).val()
		
		if(saldoAux.includes(",")){
			
			saldoAux = saldoAux.replace(",",".")
			
		}
		
		saldoAux = parseFloat(saldoAux)
		
		// SE QTDE FOI INFORMADA
		if(!(qtde=="" || qtde==null || qtde==undefined)){
			
			if(qtdeReq.includes(",")){
				
				qtdeReq = qtdeReq.replace(",",".")
				
			}
			
			qtdeReq = parseFloat(qtdeReq)
			
			// SE É UM SUBSTITUTO
			if(idprdOrigem==idprd){
				
				saldo = saldo + saldoAux
				
			}
			
		}
		
	})
	
}

// LIMPA OS FILTROS DA TABELA
function limpaFiltros(){
	
	$('#INFOCOMPONENTE___1').children('option:not(:first)').remove();
	$('#INFODESCRICAO___1').children('option:not(:first)').remove();
	$('#INFOUND___1').children('option:not(:first)').remove();
	$('#INFOOP___1').children('option:not(:first)').remove();
	$('#INFOID___1').children('option:not(:first)').remove();
	$('#INFOATIVIDADE___1').children('option:not(:first)').remove();
	$('#INFOESTOQUE___1').children('option:not(:first)').remove();
	$('#INFOQTDEPREV___1').children('option:not(:first)').remove();
	
}
 
// SE TABELA DOS FILTROS PARA A TABELA NÃO FOI CRIADA
function temTabelaFiltros(){
	
	var tem = false
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("select[id^='INFOCOMPONENTE___']").each(function(){
		
		tem = true
		
	})
	
	return tem
	
}

// CONSTRÓI FILTROS PARA A TABELA
function constroiFiltros(){

	console.log("entrei para construir filtros")
	
	var componente = $("#INFOCOMPONENTE___1").val()
	var descricao = $("#INFODESCRICAO___1").val()
	var codUnd = $("#INFOUND___1").val()
	var codOrdem = $("#INFOOP___1").val()
	var idAtv = $("#INFOID___1").val()
	var atividade = $("#INFOATIVIDADE___1").val()
	var estoque = $("#INFOESTOQUE___1").val()
	var qtdePrev = $("#INFOQTDEPREV___1").val()
	
	console.log("componente: "+componente+", descricao: "+descricao+", codUnd: "+codUnd+", codOrdem: "+codOrdem+", idAtv: "+idAtv+", atividade: "+atividade+
			", estoque: "+estoque+", qtdePrev: "+qtdePrev)

	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if(componente=="" || componente==null || componente==undefined){
		
		constroiSelectComponente()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if(descricao=="" || descricao==null || descricao==undefined){
		
		constroiSelectDescricao()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if(codUnd=="" || codUnd==null || codUnd==undefined){
		
		constroiSelectCodUnd()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if(codOrdem=="" || codOrdem==null || codOrdem==undefined){
		
		constroiSelectCodOrdem()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if(idAtv=="" || idAtv==null || idAtv==undefined){
		
		constroiSelectIdAtvOrdem()
		
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if(atividade=="" || atividade==null || atividade==undefined){
	
		constroiSelectAtividade()
		
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if(estoque=="" || estoque==null || estoque==undefined){
	
		constroiSelectEstoque()
		
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if(qtdePrev=="" || qtdePrev==null || qtdePrev==undefined){
	
		constroiSelectQtdePrev()
		
	}
		
	console.log("terminei de construir filtros")
	
}

// CONSTRÓI SELECT DO COMPONENTE
function constroiSelectComponente(){
	
	console.log("vou construir select da componente")
	var arrayComponente = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='COMPONENTEREQ___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		console.log("seq "+seq)
		
		var componente = $("#COMPONENTEREQ___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHA___"+seq).hasClass("invisivel"))){
			
			// SE OS NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayComponente.includes(componente)) && !(componente=="")){
				
				console.log("vou incluir componente "+componente)
				
				arrayComponente.push(componente)
				
			}
			
		}
	
	})
	
	console.log("arrayComponente")
	console.log(arrayComponente)
	
	arrayComponente = arrayComponente.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayComponente.length; i++){
		
		console.log("vou incluir opção "+arrayComponente[i])
		
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOCOMPONENTE___1').append($("<option class='info'></option>").attr("value", arrayComponente[i]).text(arrayComponente[i]));
		
	}
	
}

// CONSTRÓI SELECT DA DESCRICAO
function constroiSelectDescricao(){
	
	console.log("vou construir select da descricao")
	var arrayDescricao = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='COMPONENTEREQ___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		console.log("seq "+seq)
		
		var descricao = $("#DESCRICAOREQ___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHA___"+seq).hasClass("invisivel"))){
			
			// SE OS NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayDescricao.includes(descricao)) && !(descricao=="")){
				
				console.log("vou incluir descricao "+descricao)
				
				arrayDescricao.push(descricao)
				
			}
			
		}
		
	})
	
	console.log("arrayDescricao")
	console.log(arrayDescricao)
	
	arrayDescricao = arrayDescricao.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayDescricao.length; i++){
		
		console.log("vou incluir opção "+arrayDescricao[i])
		
		// PREENCHE O SELECT COM OS DADOS
		$('#INFODESCRICAO___1').append($("<option class='info'></option>").attr("value", arrayDescricao[i]).text(arrayDescricao[i]));
		
	}
	
}

// CONSTRÓI SELECT DO CODUND
function constroiSelectCodUnd(){
	
	console.log("vou construir select da codUnd")
	var arrayCodUnd = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='COMPONENTEREQ___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		console.log("seq "+seq)
		
		var codUnd = $("#UNDREQ___"+seq).val()
			
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHA___"+seq).hasClass("invisivel"))){
			
			// SE OS NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayCodUnd.includes(codUnd)) && !(codUnd=="")){
				
				console.log("vou incluir codUnd "+codUnd)
				
				arrayCodUnd.push(codUnd)
				
			}
			
		}
		
	})
	
	console.log("arrayCodUnd")
	console.log(arrayCodUnd)
	
	arrayCodUnd = arrayCodUnd.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayCodUnd.length; i++){
		
		console.log("vou incluir opção "+arrayCodUnd[i])
		
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOUND___1').append($("<option class='info'></option>").attr("value", arrayCodUnd[i]).text(arrayCodUnd[i]));
		
	}
	
}

// CONSTRÓI SELECT DO CODORDEM
function constroiSelectCodOrdem(){
	
	console.log("vou construir select da codOrdem")
	var arrayCodOrdem = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='COMPONENTEREQ___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		console.log("seq "+seq)
		
		var codOrdem = $("#OPREQ___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHA___"+seq).hasClass("invisivel"))){
			
			// SE OS NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayCodOrdem.includes(codOrdem)) && !(codOrdem=="")){
				
				console.log("vou incluir codOrdem "+codOrdem)
				
				arrayCodOrdem.push(codOrdem)
				
			}
			
		}
		
	})
	
	console.log("arrayCodOrdem")
	console.log(arrayCodOrdem)
	
	arrayCodOrdem = arrayCodOrdem.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayCodOrdem.length; i++){
		
		console.log("vou incluir opção "+arrayCodOrdem[i])
		
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOOP___1').append($("<option class='info'></option>").attr("value", arrayCodOrdem[i]).text(arrayCodOrdem[i]));
		
	}
	
}

// CONSTRÓI SELECT DO IDATVORDEM
function constroiSelectIdAtvOrdem(){
	
	console.log("vou construir select da idAtvOrdem")
	var arrayIdAtvOrdem = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='COMPONENTEREQ___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		console.log("seq "+seq)
		
		var idAtvOrdem = $("#IDATVREQ___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHA___"+seq).hasClass("invisivel"))){

			// SE OS NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayIdAtvOrdem.includes(idAtvOrdem)) && !(idAtvOrdem=="")){
				
				console.log("vou incluir codOrdem "+idAtvOrdem)
				
				arrayIdAtvOrdem.push(idAtvOrdem)
				
			}
			
		}
		
	})
	
	console.log("arrayIdAtvOrdem")
	console.log(arrayIdAtvOrdem)
	
	arrayIdAtvOrdem = arrayIdAtvOrdem.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayIdAtvOrdem.length; i++){
		
		console.log("vou incluir opção "+arrayIdAtvOrdem[i])
		
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOID___1').append($("<option class='info'></option>").attr("value", arrayIdAtvOrdem[i]).text(arrayIdAtvOrdem[i]));
		
	}
	
}

// CONSTRÓI SELECT DA ATIVIDADE
function constroiSelectAtividade(){
	
	console.log("vou construir select da atividade")
	var arrayAtividade = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='COMPONENTEREQ___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		console.log("seq "+seq)
		
		var atividade = $("#ATIVIDADEREQ___"+seq).val()
			
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHA___"+seq).hasClass("invisivel"))){

			// SE OS NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayAtividade.includes(atividade)) && !(atividade=="")){
				
				console.log("vou incluir codOrdem "+atividade)
				
				arrayAtividade.push(atividade)
				
			}
			
		}
		
	})
	
	console.log("arrayAtividade")
	console.log(arrayAtividade)
	
	arrayAtividade = arrayAtividade.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayAtividade.length; i++){
		
		console.log("vou incluir opção "+arrayAtividade[i])
		
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOATIVIDADE___1').append($("<option class='info'></option>").attr("value", arrayAtividade[i]).text(arrayAtividade[i]));
		
	}
	
}

// CONSTRÓI SELECT DO ESTOQUE
function constroiSelectEstoque(){
	
	console.log("vou construir select do estoque")
	var arrayEstoque = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='COMPONENTEREQ___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		console.log("seq "+seq)
		
		var estoque = $("#ESTOQUEREQ___"+seq).val()
			
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHA___"+seq).hasClass("invisivel"))){

			// SE OS NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayEstoque.includes(estoque)) && !(estoque=="")){
				
				console.log("vou incluir "+estoque)
				
				arrayEstoque.push(estoque)
				
			}
			
		}
		
	})
	
	console.log("arrayEstoque")
	console.log(arrayEstoque)
	
	arrayEstoque = arrayEstoque.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayEstoque.length; i++){
		
		console.log("vou incluir opção "+arrayEstoque[i])
		
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOESTOQUE___1').append($("<option class='info'></option>").attr("value", arrayEstoque[i]).text(arrayEstoque[i]));
		
	}
	
}

// CONSTRÓI SELECT DA QTDE PREVISTA
function constroiSelectQtdePrev(){
	
	console.log("vou construir select da qtde prevista")
	var arrayQtdePrev = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='COMPONENTEREQ___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		console.log("seq "+seq)
		
		var qtdePrev = $("#QTDEPREVREQ___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHA___"+seq).hasClass("invisivel"))){

			// SE OS NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayQtdePrev.includes(qtdePrev)) && !(qtdePrev=="")){
				
				console.log("vou incluir "+qtdePrev)
				
				arrayQtdePrev.push(qtdePrev)
				
			}
			
		}
		
	})
	
	console.log("arrayQtdePrev")
	console.log(arrayQtdePrev)
	
	arrayQtdePrev = arrayQtdePrev.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayQtdePrev.length; i++){
		
		console.log("vou incluir opção "+arrayQtdePrev[i])
		
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOQTDEPREV___1').append($("<option class='info'></option>").attr("value", arrayQtdePrev[i]).text(arrayQtdePrev[i]));
		
	}
	
}

// RECONSTRÓI TODOS OS FILTROS
function reconstroiFiltros(){
		
	console.log("vou reconstruir filtros")
	
	var myLoading2 = FLUIGC.loading(window);
	
	myLoading2.show();
	
	// TIMEOUT PARA EXECUÇÃO DA FUNÇÃO
	setTimeout(function (){
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOCOMPONENTE___1").val()=="" || $("#INFOCOMPONENTE___1").val()==null){
						
			$('#INFOCOMPONENTE___1').children('option:not(:first)').remove();
			$("#INFOCOMPONENTE___1").css("border-color","#d1d3d4")
			$("#INFOCOMPONENTE___1").css("background-color","#fff")
			
		} else {
						
			$("#INFOCOMPONENTE___1").css("border-color","#b92113")
			$("#INFOCOMPONENTE___1").css("background-color","#f2dede")
			
		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFODESCRICAO___1").val()=="" || $("#INFODESCRICAO___1").val()==null){
						
			$('#INFODESCRICAO___1').children('option:not(:first)').remove();
			$("#INFODESCRICAO___1").css("border-color","#d1d3d4")
			$("#INFODESCRICAO___1").css("background-color","#fff")

		} else {
						
			$("#INFODESCRICAO___1").css("border-color","#b92113")
			$("#INFODESCRICAO___1").css("background-color","#f2dede")
			
		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOUND___1").val()=="" || $("#INFOUND___1").val()==null){
						
			$('#INFOUND___1').children('option:not(:first)').remove();
			$("#INFOUND___1").css("border-color","#d1d3d4")
			$("#INFOUND___1").css("background-color","#fff")

		} else {
						
			$("#INFOUND___1").css("border-color","#b92113")
			$("#INFOUND___1").css("background-color","#f2dede")
			
		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOOP___1").val()=="" || $("#INFOOP___1").val()==null){
						
			$('#INFOOP___1').children('option:not(:first)').remove();
			$("#INFOOP___1").css("border-color","#d1d3d4")
			$("#INFOOP___1").css("background-color","#fff")

		} else {
						
			$("#INFOOP___1").css("border-color","#b92113")
			$("#INFOOP___1").css("background-color","#f2dede")
			
		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOID___1").val()=="" || $("#INFOID___1").val()==null){
						
			$('#INFOID___1').children('option:not(:first)').remove();
			$("#INFOID___1").css("border-color","#d1d3d4")
			$("#INFOID___1").css("background-color","#fff")
			
		} else {
						
			$("#INFOID___1").css("border-color","#b92113")
			$("#INFOID___1").css("background-color","#f2dede")

		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOATIVIDADE___1").val()=="" || $("#INFOATIVIDADE___1").val()==null){
						
			$('#INFOATIVIDADE___1').children('option:not(:first)').remove();
			$("#INFOATIVIDADE___1").css("border-color","#d1d3d4")
			$("#INFOATIVIDADE___1").css("background-color","#fff")
			
		} else {
						
			$("#INFOATIVIDADE___1").css("border-color","#b92113")
			$("#INFOATIVIDADE___1").css("background-color","#f2dede")
			
		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOESTOQUE___1").val()=="" || $("#INFOESTOQUE___1").val()==null){
						
			$('#INFOESTOQUE___1').children('option:not(:first)').remove();
			$("#INFOESTOQUE___1").css("border-color","#d1d3d4")
			$("#INFOESTOQUE___1").css("background-color","#fff")
			
		} else {
						
			$("#INFOESTOQUE___1").css("border-color","#b92113")
			$("#INFOESTOQUE___1").css("background-color","#f2dede")

		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOQTDEPREV___1").val()=="" || $("#INFOQTDEPREV___1").val()==null){
						
			$('#INFOQTDEPREV___1').children('option:not(:first)').remove();
			$("#INFOQTDEPREV___1").css("border-color","#d1d3d4")
			$("#INFOQTDEPREV___1").css("background-color","#fff")
			
		} else {
						
			$("#INFOQTDEPREV___1").css("border-color","#b92113")
			$("#INFOQTDEPREV___1").css("background-color","#f2dede")

		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOSALDOREQ___1").val()=="" || $("#INFOSALDOREQ___1").val()==null){
						
			$('#INFOSALDOREQ___1').children('option:not(:first)').remove();
			$("#INFOSALDOREQ___1").css("border-color","#d1d3d4")
			$("#INFOSALDOREQ___1").css("background-color","#fff")
			
		} else {
						
			$("#INFOSALDOREQ___1").css("border-color","#b92113")
			$("#INFOSALDOREQ___1").css("background-color","#f2dede")

		}
				
		// CARREGA UMA NOVA LISTA
		carregaLista()
		
		// CONSTRÓI OS FILTROS
		constroiFiltros()
		
	},1000)
		
	// DESATIVA O LOAD
	setTimeout(function(){
		
		myLoading2.hide();
		
	},500)
	
}

// CARREGA A LISTA DE ACORDO COM OS FILTROS PREENCHIDOS
function carregaLista(){
	
	console.log("entrei para carregar lista")

	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='COMPONENTEREQ___']").each(function (){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var componente = $("#INFOCOMPONENTE___1").val()
		var descricao = $("#INFODESCRICAO___1").val()
		var codUnd = $("#INFOUND___1").val()
		var codOrdem = $("#INFOOP___1").val()
		var idAtividade = $("#INFOID___1").val()
		var atividade = $("#INFOATIVIDADE___1").val()
		var estoque = $("#INFOESTOQUE___1").val()
		var qtdePrev = $("#INFOQTDEPREV___1").val()
		var saldo = $("#INFOSALDO___1").val()

		var componenteLista = $("#COMPONENTEREQ___"+seq).val()
		var descricaoLista = $("#DESCRICAOREQ___"+seq).val()
		var codUndLista = $("#UNDREQ___"+seq).val()
		var codOrdemLista = $("#OPREQ___"+seq).val()
		var idAtividadeLista = $("#IDATVREQ___"+seq).val()
		var atividadeLista = $("#ATIVIDADEREQ___"+seq).val()
		var estoqueLista = $("#ESTOQUEREQ___"+seq).val()
		var qtdePrevLista = $("#QTDEPREVREQ___"+seq).val()
		var saldoLista = $("#SALDOREQ___"+seq).val()
		
		console.log("componente: "+componente+", descricao: "+descricao+", codUnd: "+codUnd+", codOrdem: "+
				codOrdem+", idAtividade: "+idAtividade+", atividade: "+atividade+", estoque: "+estoque+", qtdePrev: "+
				qtdePrev+", saldo: "+saldo)
				
		if(componente=="" || componente==null){
			console.log("filtro os esta vazio")
			componente = componenteLista
		}
		if(descricao=="" || descricao==null){
			console.log("filtro op esta vazio")
			descricao = descricaoLista
		}
		if(codUnd=="" || codUnd==null){
			console.log("filtro tag esta vazio")
			codUnd = codUndLista
		}
		if(codOrdem=="" || codOrdem==null){
			console.log("filtro execucao esta vazio")
			codOrdem = codOrdemLista
		}
		if(idAtividade=="" || idAtividade==null){  
			console.log("filtro inicio esta vazio")
			idAtividade = idAtividadeLista
		}
		if(atividade=="" || atividade==null){
			console.log("filtro fim esta vazio")
			atividade = atividadeLista
		}
		if(estoque=="" || estoque==null){
			console.log("filtro statusOp esta vazio")
			estoque = estoqueLista
		}
		if(qtdePrev=="" || qtdePrev==null){
			console.log("filtro item esta vazio")
			qtdePrev = qtdePrevLista
		}
		if(saldo=="" || saldo==null){
			console.log("filtro item esta vazio")
			saldo = saldoLista
		} else{
			
			saldo = saldo.replace(",",".")
			saldo = parseFloat(saldo)
			
			// SE O SALDO É MAIOR QUE 0
			if(saldo>0){
				
				saldo = saldoLista
				
			} 
			
		}
		
		// SE FILTROS NÃO COINCIDE COM TODOS OS CAMPOS DO ITEM
		if(!(componente==componenteLista && descricao==descricaoLista && codUnd==codUndLista && codOrdem==codOrdemLista && idAtividade==idAtividadeLista &&
				atividade==atividadeLista && estoque==estoqueLista && qtdePrev==qtdePrevLista && saldo==saldoLista)){
		
			console.log("vou esconder LINHAPLAN___"+seq)
			
			$("#LINHA___"+seq).hide()
			$("#LINHA___"+seq).addClass("invisivel")
			
		} else {
			
			console.log("vou exibir LINHAPLAN___"+seq)
			
			$("#LINHA___"+seq).show()
			$("#LINHA___"+seq).removeClass("invisivel")
			
		}
		
	})
	
	console.log("terminei de carregar lista")
	
} 

// EXIBE UM BALÃO COM O TEXTO COMPLETO DO CAMPO AO PASSAR O MOUSE SOBRE ELE
function mouse(e) {
	
	// PEGA O VALOR COMPLETO PREENCHIDO NO CAMPO
	var valCampo = $(e).val()
	
	// SE CAMPO NÃO FOI PREENCHIDO
	if(valCampo == "" || valCampo == null){
		
		return false
		
	}
	// SE CAMPO FOI PREENCHIDO
	else{
		
		// CARREGA EM "TITLE" O VALOR DO CAMPO PREENCHIDO
		$(e).prop("title", valCampo)
		
		return true
		
	}
	
}

// PEGA A DATA DO BANCO E SALVA EM FORMATO PARA O FORMULÁRIO
function formataData(strData) {
    
	// ARRAY PARA PEGAR A STRING APENAS DO VALOR DA DATA
	var arrayString = strData.split(" ")
	console.log("data[0]: "+arrayString[0]+", data[1]: "+arrayString[1])
	
	// ARRAY PARA OS VALORES DE DIA/MÊS/ANO
	var arrayData = arrayString[0].split("-")
	
	var ano = arrayData[0]
	var mes = arrayData[1]
	var dia = arrayData[2]
	
	// MONTA A DATA NO PADRÃO BRASILEIRO
	var novaData = dia + '/' + mes + '/' + ano;
    	
	// RETORNA O VALOR DA NOVA DATA
    return novaData;
    
}

// FORMATA A DATA DO TIPO DATE PARA PADRÃO DE FORMULÁRIO
function formataDataDate(dataDe){
	
	console.log("dataDe: "+dataDe)
	
	var dataForm
	
	dataForm = dataDe.toString()
	dataForm = dataForm.split(" ")
	
	var diaForm = dataForm[2]
	var anoForm = dataForm[3]
	
	var mesForm = dataForm[1]
	
	if(mesForm=="Jan"){
		mesForm="01"
	}
	if(mesForm=="Feb"){
		mesForm="02"
	}
	if(mesForm=="Mar"){
		mesForm="03"
	}
	if(mesForm=="Apr"){
		mesForm="04"
	}
	if(mesForm=="May"){
		mesForm="05"
	}
	if(mesForm=="Jun"){
		mesForm="06"
	}
	if(mesForm=="Jul"){
		mesForm="07"
	}
	if(mesForm=="Aug"){
		mesForm="08"
	}
	if(mesForm=="Sep"){
		mesForm="09"
	}
	if(mesForm=="Oct"){
		mesForm="10"
	}
	if(mesForm=="Nov"){
		mesForm="11"
	}
	if(mesForm=="Dec"){
		mesForm="12"
	}
	
	console.log("diaForm: "+diaForm)
	console.log("anoForm: "+anoForm)
	console.log("mesForm: "+mesForm)
	
	dataForm = diaForm+"/"+mesForm+"/"+anoForm
	
	console.log("dataForm: "+dataForm)
	
	return dataForm 
	
}

// PEGA A DATA DO BANCO E SALVA EM FORMATO PARA O FORMULÁRIO
function formataDataPadrao(strData) {
   
	// ARRAY PARA OS VALORES DE DIA/MÊS/ANO
	var arrayData = strData.split("-")
	
	var ano = arrayData[0]
	var mes = arrayData[1]
	var dia = arrayData[2]
	
	// MONTA A DATA NO PADRÃO BRASILEIRO
	var novaData = dia + '/' + mes + '/' + ano;
    	
	// RETORNA O VALOR DA NOVA DATA
    return novaData;
    
}

// CARREGA A TABELA DAS RA'S GERADAS
function carregaTabelaRA(){
	
	console.log("carrega a tabela das RA's geradas")
	
	// PECORRE TODOS OS REGISTROS DA TABELA DOS COMPONENTES
	$("input[id^='COMPONENTEREQ___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var idmov = $("#IDMOVREQ___"+seq).val()
		var codColigada = $("#CODCOLIGADAREQ___"+seq).val() 
		var codFilial = $("#CODFILIALREQ___"+seq).val()
		var idprd = $("#IDPRDREQ___"+seq).val()
		var codOrdem = $("#OPREQ___"+seq).val()
		var idAtvOrdem = $("#IDATVREQ___"+seq).val()
		var codigoPrd = $("#COMPONENTEREQ___"+seq).val()
		var descricao = $("#DESCRICAOREQ___"+seq).val()
		var qtde = $("#QTDEREQ___"+seq).val()
		var und = $("#UNDREQ___"+seq).val()
		var numOS = $("#OSREQ___"+seq).val()
		var codColigada = $("#CODCOLIGADAREQ___"+seq).val()
		var codFilial = $("#CODFILIALREQ___"+seq).val()	
		var codTmv = "1.1.05"
		
		console.log("idmov: "+idmov+", codigoPrd: "+codigoPrd+", descricao: "+descricao+", qtde: "+qtde+", und: "+und+", numOS: "+numOS+", codColigada: "+codColigada
				+", codFilial: "+codFilial+", codTmv: "+codTmv+", codColigada: "+codColigada+", codFilial: "+codFilial+", idprd: "+idprd+
				", codOrdem: "+codOrdem+", idAtvOrdem: "+idAtvOrdem)
		
		// SE ITEM FOI SELECIONADO	
		if($("#REQUISITANDO___"+seq).is(":checked")){
				
			var seq = addTabelaRA()
				
			// SALVA AS INFORMAÇÕES
			$("#NUMERORA___"+seq).val("")
			$("#CODCOLIGADARA___"+seq).val(codColigada)
			$("#CODFILIALRA___"+seq).val(codFilial)
			$("#CODORDEMRA___"+seq).val(codOrdem)
			$("#IDATVORDEMRA___"+seq).val(idAtvOrdem)
			$("#IDPRDRA___"+seq).val(idprd)
			$("#IDMOVRA___"+seq).val(idmov)
			$("#CODIGOPRDRA___"+seq).val(codigoPrd)
			$("#DESCRICAORA___"+seq).val(descricao)
			$("#QTDERA___"+seq).val(qtde)
			$("#UNDRA___"+seq).val(und)
			$("#CENTROCUSTORA___"+seq).val(numOS)
			
		}
		
		/*
		// SE IDMOV EXISTE
		if(!(idmov=="" || idmov==null || idmov==undefined)){
		
			var c1 = DatasetFactory.createConstraint("CODCOLIGADA", codColigada, codColigada, ConstraintType.MUST);
			var c2 = DatasetFactory.createConstraint("CODFILIAL", codFilial, codFilial, ConstraintType.MUST);
			var c3 = DatasetFactory.createConstraint("IDMOV", idmov, idmov, ConstraintType.MUST);
			var c4 = DatasetFactory.createConstraint("CODTMV", codTmv, codTmv, ConstraintType.MUST);

			var constraints = new Array(c1,c2,c3,c4);
		    			    
		    var dataset = DatasetFactory.getDataset("dsInfoMovimento", null, constraints, null);
		    
		    var row = dataset.values
		    
		    console.log("row")
		    console.log(row)
			
			// SE TEVE RETORNO
			if(!(row=="" || row==null || row==undefined)){
				
				var seq = addTabelaRA()
				
				// SALVA AS INFORMAÇÕES
				$("#NUMERORA___"+seq).val(row[0]["NUMEROMOV"])
				$("#IDMOVRA___"+seq).val(idmov)
				$("#CODIGOPRDRA___"+seq).val(codigoPrd)
				$("#DESCRICAORA___"+seq).val(descricao)
				$("#QTDERA___"+seq).val(qtde)
				$("#UNDRA___"+seq).val(und)
				$("#CENTROCUSTORA___"+seq).val(numOS)
				
			}
			
		}
		*/
		
	})
	
}

// DESABILITA TODOS OS CAMPOS DOS COMPONENTES
function desabilitaCamposComponentes(){
	
	console.log("desabilita todos os campos da tabela")
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='COMPONENTEREQ___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		$("#REQUISITANDO___"+seq).prop("disabled",true)
		$("#QTDEREQ___"+seq).attr("readonly",true)
		
	})
	
}

//PREENCHE O CAMPO DE STATUS DA RA NA CONSULTA DA SOLICITAÇÃO
function preencheStatusRA(){
	
	$("input[id^='NUMERORA___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]

		var numra = $(this).val()
		var codfilial = $("#CODFILIAL_FILTRO").val()
		var codcoligada = $("#CODCOLIGADA_FILTRO").val()
		var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codcoligada,codcoligada,ConstraintType.MUST)
		var a2 = DatasetFactory.createConstraint("CODFILIAL",codfilial,codfilial,ConstraintType.MUST)
		var a3 = DatasetFactory.createConstraint("NUMEROMOV",numra,numra,ConstraintType.MUST)

		var constraints = new Array(a1,a2,a3)

		var dataset = DatasetFactory.getDataset("dsConsultaRaPAPC",null,constraints,null)
		var rep = dataset.values
		console.log(rep)

		if(!(rep=="" || rep==null || rep==undefined)){
				
			var row = rep[0]		
			var st = row["STATUS"]
			var status = ""

			switch (st) {

				case 'A':

					status="Pendente"
					break;

				case 'C':
					status="Cancelado"
					break;

				case 'F':
					status="Recebido"
					break;

				default:
					status="Em Faturamento"
					break;

			}
			$("#STATUSRA___"+seq).val(status)
			console.log("~ file: utils.js ~ line 2166 ~ $ ~ statusra", status)
			
		}

		
	});
}

// QUANDO O SCROLL É MOVIMENTADO
$('.scrollPrincipal').on('scroll', function(){
	
	console.log("entrei na função scroll principal")
	
	var _left = $(this).scrollLeft();
		
	console.log("scrol left: "+_left)
	
	$('.scrollPrincipal').scrollLeft(_left)
	  
})

// FUNÇÃO PARA ESCONDER A OPÇÃO DE INICIAR SOLICITAÇÃO COM BASE NA ATUAL
parent.$('.wcm-all-content').bind('DOMNodeInserted', function(e){
	
   // QUANDO APARECER A TELA DE "SOLICITAÇÃO INICIADA COM SUCESSO" IRÁ ENTRAR NESSE IF
   if (e.target.id == 'message-page') {
	  
    // ESCONDE A OPÇÃO DE "INICIAR SOLICITAÇÃO COM BASE NESTA"
    parent.$('[data-reset-process-instance-id]').hide()
    
  }	
  
})

$(".select2-container--open").click(function(){

	console.log("entrei para alterar a msg do campo zoom")
	
	$(".select2-results__message").text("Você só pode selecionar 5 itens")
	
	
})

// ALTERA A MENSAGEM DO CAMPO ZOOM
function alteraMsg(){
	
	console.log("entrei para alterar a msg do campo zoom")
	
	$(".select2-results__message").text("Você só pode selecionar 5 itens")
	
}

function addTabelaConsulta(){

	return wdkAddChild('CONSULTARA')

}

function buscarConsulta(){

	var pesquisa = $("#PESQUISACONSULTA").val()
	var datade = $("#DATA_DE").val()
	if(datade != "" && datade!=null && datade!=undefined && datade!=" "){
		datade = formataDataBanco(datade)
	}
	else{
		datade=""
	}
	var dataate = $("#DATA_ATE").val()
	if(dataate != "" && dataate!=null && dataate!=undefined && dataate!=" "){
		dataate = formataDataBanco(dataate)
	}
	else{
		dataate=""
	}
	var myLoading2 = FLUIGC.loading(window);

	myLoading2.show();

	setTimeout(function(){
		
		$("#CONSULTARA").show()
		$("#CONSULTACABECALHO").removeClass("tableFixHead0")
		$("#CONSULTACABECALHO").addClass("tableFixHead100")

		var c1 = DatasetFactory.createConstraint("OP", pesquisa, pesquisa, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("NUMPLANOCORTE", pesquisa, pesquisa, ConstraintType.MUST);
		var c3 = DatasetFactory.createConstraint("NUMEROMOV", pesquisa, pesquisa, ConstraintType.MUST);
		var c4 = DatasetFactory.createConstraint("SOLICITANTE", pesquisa, pesquisa, ConstraintType.MUST);
		var c5 = DatasetFactory.createConstraint("NUMPROCESSO", pesquisa, pesquisa, ConstraintType.MUST);
		var c6 = DatasetFactory.createConstraint("IDATIVIDADE", pesquisa, pesquisa, ConstraintType.MUST);
		var c7 = DatasetFactory.createConstraint("STATUS", pesquisa, pesquisa, ConstraintType.MUST);
		var c8 = DatasetFactory.createConstraint("CODUND", pesquisa, pesquisa, ConstraintType.MUST);
		var c9 = DatasetFactory.createConstraint("QUANTIDADETOTAL", pesquisa, pesquisa, ConstraintType.MUST);
		var c10 = DatasetFactory.createConstraint("DATACRIACAO", pesquisa, pesquisa, ConstraintType.MUST);
		var c11 = DatasetFactory.createConstraint("DATAALTERACAO", pesquisa, pesquisa, ConstraintType.MUST);
		var c12 = DatasetFactory.createConstraint("CODCCUSTO", pesquisa, pesquisa, ConstraintType.MUST);
		var c13 = DatasetFactory.createConstraint("CODIGOPRD", pesquisa, pesquisa, ConstraintType.MUST);
		var c14 = DatasetFactory.createConstraint("DATADE", datade, datade, ConstraintType.MUST);
		var c15 = DatasetFactory.createConstraint("DATAATE", dataate, dataate, ConstraintType.MUST);

			
		var constraints = new Array(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c14,c15);
								
		var dataset = DatasetFactory.getDataset("dsRelatorioRa", null, constraints, null);
				
		var row = dataset.values

		if(row!=null && row!=undefined && row!=""){

			limpaTabelaConsulta()

			for (var i=0; i<row.length; i++){

				var rep = row[i]

				var seq = addTabelaConsulta();

				$("#NUMRACON___"+seq).val(rep["NUMEROMOV"])
				$("#EMISSORCON___"+seq).val(rep["SOLICITANTE"])
				$("#SOLICITACAOCON___"+seq).val(rep["NUMPROCESSO"])
				$("#LINKRA___"+seq).attr("href","http://delp5013:8080/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID="+rep["NUMPROCESSO"])
				$("#STATUSCON___"+seq).val(rep["STATUS"])
				$("#OPCON___"+seq).val(rep["OP"])
				$("#IDATVCON___"+seq).val(rep["IDATIVIDADE"])
				$("#PAPCCON___"+seq).val(rep["NUMPLANOCORTE"])
				$("#OSCON___"+seq).val(rep["CODCCUSTO"])
				$("#PRODCON___"+seq).val(rep["CODIGOPRD"])
				$("#UNDCON___"+seq).val(rep["CODUND"])
				$("#QTDCON___"+seq).val(rep["QUANTIDADETOTAL"])
				$("#EMISSAOCON___"+seq).val(rep["DATACRIACAO"])
				$("#EDICAOCON___"+seq).val(rep["DATAALTERACAO"])

			}
		}
		else{
			$("#CONSULTARA").hide()
			$("#CONSULTACABECALHO").removeClass("tableFixHead100")
			$("#CONSULTACABECALHO").addClass("tableFixHead0")
			Swal.fire({
				icon: 'error',
				title: 'Sem dados encontrados para busca',
				text: 'Verifique o preenchimento do campo e tente novamente'
		  	})
		}

		myLoading2.hide();

	},500)

}

function formataDataBanco(strData) {
    
	// ARRAY PARA PEGAR A STRING APENAS DO VALOR DA DATA
	var arrayString = strData.split(" ")
	console.log("data[0]: "+arrayString[0]+", data[1]: "+arrayString[1])
	
	console.log("vou formatar a data "+arrayString[0])
	
	// ARRAY PARA OS VALORES DE DIA/MÊS/ANO
	var arrayData = arrayString[0].split("/")
	
	var ano = arrayData[2]
	var mes = arrayData[1]
	var dia = arrayData[0]
	
	// MONTA A DATA NO PADRÃO BRASILEIRO
	var novaData = ano + '-' + mes + '-' + dia;
    
	console.log("data formatada "+novaData)
	
	// RETORNA O VALOR DA NOVA DATA
    return novaData;
    
}


function limpaTabelaConsulta(){

	$("input[id^='NUMRACON___']").each(function(){

		$(this).parents("tr").remove();

	});

}

document.getElementById("PESQUISACONSULTA").addEventListener("keydown", function(event) {

	if (event.key === "Enter") {
		// Cancel the default action, if needed
		event.preventDefault();
		// Trigger the button element with a click
		buscarConsulta()
	}

});

var onlyDate1 = FLUIGC.calendar('#DATA_DE', {
    pickDate: true,
    pickTime: false
});

var onlyDate2 = FLUIGC.calendar('#DATA_ATE', {
    pickDate: true,
    pickTime: false
});


// window.onscroll = function(){

// 	if ($(this).scrollTop() > 500) { 
// 		$("#CONSULTACABECALHO").addClass("tableFixHead")
// 		var $th = $('.tableFixHead').find('thead th')
// 		$('.tableFixHead').on('scroll', function() {
// 			$th.css('transform', 'translateY('+ this.scrollTop +'px)');
// 		});
// 	}
// 	else{ 
// 		$("#CONSULTACABECALHO").removeClass("tableFixHead")
// 	}

// };


function carregaModalCompra(obj){
	
	var seq = $(obj).parent().parent().parent().attr("id").split("___")[1]

	console.log("seq: " + seq)

	var numeromov = $("#NUMRACON___"+seq).val()
	var codtmov = '1.1.05'
	
	var ret = false
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("NUMEROMOV",numeromov,numeromov,ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("CODTMOV",codtmov,codtmov,ConstraintType.MUST);

	var constraints = new Array(c1,c2);
	
	var dataset = DatasetFactory.getDataset("dsRastreabilidadeMovimentos",null,constraints,null);

	var row = dataset.values
	var count = row.length

	var id_pai=0;
	var id1 = 1;
	var parent1 = 0;

	var testDataTemplate =  new Array();

	for(var i=0;i<count;i++){

		var rep = row[i]

		console.log("Mov "+(+count+1)+": " + rep);

		testDataTemplate.push(
			{

			id : rep["IDMOV"],
			nomemov : rep["NOME"], 
			codtmov : rep["CODTMV"], 
			idmov : rep["IDMOV"],
			numeromov: rep["NUMEROMOV"], 
			statusmov: rep["STATUS"], 
			coligada : rep["CODCOLIGADA"],
			parent: i == 0 ? 0 : rep["PAI"]

		}
		)

	}

	console.log("DATA : "+ testDataTemplate);


	var settingsTemplate = {
		data: testDataTemplate,
		template: '.my_template_orgchart'
	}

	var testOrgChartTemplate = FLUIGC.orgChart('.RASTREABILIDADE', settingsTemplate);

	testOrgChartTemplate.on('fluig.orgchart.node.click', function(node){

		console.log(node);
		console.log(node.data.idmov);
		console.log(node.data.codtmov);

		var loading = FLUIGC.loading('.MOVIMENTOS');

		loading.show();

		setTimeout(function(){
			carregaTabela(node.data.idmov,node.data.coligada,node.data.codtmov)

			// Do something

			loading.hide()

		},500)



	});

	if(count>0){

		var rep = row[0]

		console.log(rep["IDMOV"]);
		console.log(rep["CODTMV"]);

		carregaTabela(rep["IDMOV"],rep["CODCOLIGADA"],rep["CODTMV"])

	}

}

function carregaTabela(idmov,codcoligada,codtmv){

	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("IDMOV",idmov,idmov,ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("COLIGADA",codcoligada,codcoligada,ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("CODTMV",codtmv,codtmv,ConstraintType.MUST);

	var constraints = new Array(c1,c2,c3);
	
	var dataset = DatasetFactory.getDataset("dsConsultaMovimento",null,constraints,null);

	var row = dataset.values
	var count = row.length

	if(count > 0){

		limpaTabelaMovimento()

		for(var i=0;i<count;i++) {
			
			var rep = row[i]

			var seq = adicionaLinhaMovimento()

			if (i==0) {
				
				$("#IDENTIFICADOR").val(rep["IDMOV"])
				$("#STATUS").val(rep["STATUS"])
				$("#TIPODOMOVIMENTO").val(rep["CODTMV"])
				$("#DESCRICAODOMOVIMENTO").val(rep["DESCMOV"])
				$("#DATACRIACAO").val(rep["DATAEMISSAO"])
				$("#USUARIO").val(rep["RECCREATEDBY"])
				$("#DATAENTREGA").val(rep["DATAENTREGA"])
				$("#CLASSIFICACAO").val(rep["CLASSIFICACAO"])
				$("#SERIE").val(rep["SERIE"])
				$("#COLIGADA").val(rep["CODCOLIGADA"])
				$("#FILIALMOV").val(rep["CODFILIAL"])
				$("#NUMERO").val(rep["NUMEROMOV"])
				$("#MOEDA").val(rep["CODMOEVALORLIQUIDO"])
				$("#VALORBRUTO").val(rep["VALORBRUTO"])
				$("#VALORLIQUIDO").val(rep["VALORLIQUIDO"])

			}

			$("#IDPRD___"+seq).val(rep["IDPRD"])
			$("#CODIGOPRD___"+seq).val(rep["CODIGOPRD"])
			$("#QUANTIDADETOTAL___"+seq).val(rep["QUANTIDADETOTAL"])
			$("#QUANTIDADEARECEBER___"+seq).val(rep["QUANTIDADEARECEBER"])
			$("#DESCRICAO___"+seq).val(rep["DESCRICAO"])
			$("#CODUND___"+seq).val(rep["CODUND"])
			$("#VALORBRUTOITEM___"+seq).val(parseFloat(rep["VALORBRUTOITEM"]).toFixed(4))
			$("#CODCCUSTO___"+seq).val(rep["CODCCUSTO"])
			$("#DSCCUSTO___"+seq).val(rep["DSCCUSTO"])
			$("#PERCENTUAL___"+seq).val(parseFloat(rep["PERCENTUAL"]).toFixed(2)+'%')
			$("#NOMEITEM___"+seq).val(rep["NOME"])
			$("#OBSPEDIDO___"+seq).val(rep["OBSPEDIDO"])
			$("#OBSITEM___"+seq).val(rep["OBSITEM"])
			$("#NUMLOTE___"+seq).val(rep["NUMLOTE"])
			$("#QTDLOTE___"+seq).val(parseFloat(rep["QUANTIDADE_LOTE"]).toFixed(4))

			
		}
	
	}
	

}

function limpaTabelaMovimento(){

	$(".TABELA_MOVIMENTO").children("tbody").empty()

}

function adicionaLinhaMovimento(){

	var seq = Number($(".TABELA_MOVIMENTO").children("tbody").children().length) + 1

	var str = '<tr> '+
			 ' 	<td><input type="text" title="" onmouseover="mouse(this);" class="form-control" id="IDPRD___'+seq+'" name="IDPRD___'+seq+'" readonly></td> '+
			 ' 	<td><input type="text" title="" onmouseover="mouse(this);" class="form-control" id="CODIGOPRD___'+seq+'" name="CODIGOPRD___'+seq+'" readonly></td> '+
			 ' 	<td><input type="text" title="" onmouseover="mouse(this);" class="form-control" id="QUANTIDADETOTAL___'+seq+'" name="QUANTIDADETOTAL___'+seq+'" readonly></td> '+
			 ' 	<td><input type="text" title="" onmouseover="mouse(this);" class="form-control" id="QUANTIDADEARECEBER___'+seq+'" name="QUANTIDADEARECEBER___'+seq+'" readonly></td> '+ 
			 ' 	<td><input type="text" title="" onmouseover="mouse(this);" class="form-control" id="DESCRICAO___'+seq+'" name="DESCRICAO___'+seq+'" readonly></td> '+
			 ' 	<td><input type="text" title="" onmouseover="mouse(this);" class="form-control" id="CODUND___'+seq+'" name="CODUND___'+seq+'" readonly></td> '+
			 ' 	<td><input type="text" title="" onmouseover="mouse(this);" class="form-control" id="VALORBRUTOITEM___'+seq+'" name="VALORBRUTOITEM___'+seq+'" readonly></td> '+
			 ' 	<td><input type="text" title="" onmouseover="mouse(this);" class="form-control" id="CODCCUSTO___'+seq+'" name="CODCCUSTO___'+seq+'" readonly></td> '+
			 ' 	<td><input type="text" title="" onmouseover="mouse(this);" class="form-control" id="DSCCUSTO___'+seq+'" name="DSCCUSTO___'+seq+'" readonly></td> '+
			 ' 	<td><input type="text" title="" onmouseover="mouse(this);" class="form-control" id="PERCENTUAL___'+seq+'" name="PERCENTUAL___'+seq+'" readonly></td> '+
			 ' 	<td><input type="text" title="" onmouseover="mouse(this);" class="form-control" id="NOMEITEM___'+seq+'" name="NOMEITEM___'+seq+'" readonly></td> '+
			 ' 	<td><input type="text" title="" onmouseover="mouse(this);" class="form-control" id="OBSPEDIDO___'+seq+'" name="OBSPEDIDO___'+seq+'" readonly></td> '+
			 ' 	<td><input type="text" title="" onmouseover="mouse(this);" class="form-control" id="OBSITEM___'+seq+'" name="OBSITEM___'+seq+'" readonly></td> '+
			 ' 	<td><input type="text" title="" onmouseover="mouse(this);" class="form-control" id="NUMLOTE___'+seq+'" name="NUMLOTE___'+seq+'" readonly></td> '+
			 ' 	<td><input type="text" title="" onmouseover="mouse(this);" class="form-control" id="QTDLOTE___'+seq+'" name="QTDLOTE___'+seq+'" readonly></td> '+
			 ' </tr> '

	$(".TABELA_MOVIMENTO").children("tbody").append(str)

	return seq;

}