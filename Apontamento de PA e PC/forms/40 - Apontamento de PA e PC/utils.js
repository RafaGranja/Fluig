// ADICIONA UMA LINHA NA TABELA DE ATIVIDADES
function addAtv(){
	
	var row = wdkAddChild('ATIVIDADES')
	 
	// MOSTRA/ESCONDE ÍCONES DE EXPANDIR E REDUZIR
	$("#ICON___"+row).show()
	$("#ICONR___"+row).hide()
	$("#ABAS_ATVS___"+row).hide()
	
	$("#SEQ___"+row).val(row)
	
	$("#LINHAATV___"+row).addClass("linhaVermelha")
	
	$("#EXCLUIRATV___"+row).hide()
	
	$("#HORAINICIOATV___"+row).prop("readonly",true)
	$("#HORAFIMATV___"+row).prop("readonly",true)
	
	//var mySimpleCalendar1 = FLUIGC.calendar('#DATAAPONTAMENTO___'+row);
	
	/*var mySimpleCalendar2 = FLUIGC.calendar('#HORAINICIOATV___'+row, {
		pickDate: false,
	    pickTime: true
	})
	var mySimpleCalendar3 = FLUIGC.calendar('#HORAFIMATV___'+row, {
		pickDate: false,
	    pickTime: true
	})
	$("#HORAINICIOATV___"+row).prop("disabled",true)
	$("#HORAFIMATV___"+row).prop("disabled",true)
	
	var mySimpleCalendar4 = FLUIGC.calendar('#HORAINICIOIMPRO1___'+row, {
		pickDate: false,
	    pickTime: true
	})
	var mySimpleCalendar5 = FLUIGC.calendar('#HORAFIMIMPRO1___'+row, {
		pickDate: false,
	    pickTime: true
	})
	$("#HORAINICIOIMPRO1___"+row).prop("disabled",true)
	$("#HORAFIMIMPRO1___"+row).prop("disabled",true)
	
	var mySimpleCalendar6 = FLUIGC.calendar('#HORAINICIOIMPRO2___'+row, {
		pickDate: false,
	    pickTime: true
	})
	var mySimpleCalendar7 = FLUIGC.calendar('#HORAFIMIMPRO2___'+row, {
		pickDate: false,
	    pickTime: true
	})
	$("#HORAINICIOIMPRO2___"+row).prop("disabled",true)
	$("#HORAFIMIMPRO2___"+row).prop("disabled",true)
	
	var mySimpleCalendar8 = FLUIGC.calendar('#HORAINICIOIMPRO3___'+row, {
		pickDate: false,
	    pickTime: true
	})
	var mySimpleCalendar9 = FLUIGC.calendar('#HORAFIMIMPRO3___'+row, {
		pickDate: false,
	    pickTime: true
	})
	$("#HORAINICIOIMPRO3___"+row).prop("disabled",true)
	$("#HORAFIMIMPRO3___"+row).prop("disabled",true)
	
	var mySimpleCalendar10 = FLUIGC.calendar('#HORAINICIOIMPRO4___'+row, {
		pickDate: false,
	    pickTime: true
	})
	var mySimpleCalendar11 = FLUIGC.calendar('#HORAFIMIMPRO4___'+row, {
		pickDate: false,
	    pickTime: true
	})
	$("#HORAINICIOIMPRO4___"+row).prop("disabled",true)
	$("#HORAFIMIMPRO4___"+row).prop("disabled",true)
	
	var mySimpleCalendar12 = FLUIGC.calendar('#HORAINICIOIMPRO5___'+row, {
		pickDate: false,
	    pickTime: true
	})
	var mySimpleCalendar13 = FLUIGC.calendar('#HORAFIMIMPRO5___'+row, {
		pickDate: false,
	    pickTime: true
	})
	$("#HORAINICIOIMPRO5___"+row).prop("disabled",true)
	$("#HORAFIMIMPRO5___"+row).prop("disabled",true)*/
	
	return row
	
}

// ADICIONA UMA LINHA NA TABELA DO MODAL
function addModal(){
	
	var row = wdkAddChild('MODAL_OPS')
	
	return row
	
}

// PREENCHE A HORA INICIO DA PRÓXIMA HORA PRODUTIVA/IMPRODUTIVA
function preencheHoraInicio(row){
	
	var horaFim = ""
	var achei = true
	
	var hoje = new Date()
	hoje = geraDataBanco(hoje)
	
	//var seq = $(obj).attr("id").split("___")[1]
	var seq = row
	seq = parseInt(seq)
	
	while(achei && seq>0){
		
		seq = seq - 1
		
		horaFim = $("#HORAFIMAPONT___"+seq).val()
		
		if(!(horaFim=="" || horaFim==undefined || horaFim==null)){
			
			achei = false
			
		}
		
	}
	
	// SE HORA FIM NÃO É NULO OU VAZIO
	if(!(horaFim=="" || horaFim==null || horaFim==undefined)){
		
		var d1 = new Date(hoje+" "+horaFim)
		d1.setMinutes(d1.getMinutes()+1) 

		console.log("#resultado: " + " " + d1)

		var str = d1.toString().split(" ")

		var horaFim = str[4]
		horaFim = str[4].split(":")
		horaFim = horaFim[0]+":"+horaFim[1]

		console.log("horaFim: "+horaFim)
		
		$("#HORAINICIOAPONT___"+row).val(horaFim)	
		
		console.log("habilita a hora fim apontamento")
	
		var horaInicio = $("#HORAINICIOAPONT___"+row).val()
	
		// SE HORA INÍCIO FOI INFORMADA
		if(!(horaInicio=="" || horaInicio==null || horaInicio==undefined)){
			
			console.log("vou habilitar a hora fim")
			
			$("#HORAFIMAPONT___"+row).prop("disabled",false)	
			
		} else {
			
			console.log("vou desabilitar a hora fim")
			
			$("#HORAFIMAPONT___"+row).val("")
			$("#HORAFIMAPONT___"+row).prop("disabled",true)
			
		}
		
	}
	
}

// HABILITA TODOS OS CAMPOS DA TABELA DE ATIVIDADES
function habilitaCamposAtv(){
	
	// PERCORRE TODOS OS REGISTROS DAS ATIVIDADES
	$("input[id^='CODIGOPRD___']").each(function(){
	
		var seq = $(this).attr("id").split("____")[1]
		
		$("#HORAINICIOATV___"+seq).prop("disabled",false)
		$("#HORAFIMATV___"+seq).prop("disabled",false)
		
	})
	
}

// DESABILITA TODOS OS CAMPOS DA TABELA DE ATIVIDADES
function desabilitaCamposAtv(){
	
	// PERCORRE TODOS OS REGISTROS DAS ATIVIDADES
	$("input[id^='CODIGOPRD___']").each(function(){
	
		var seq = $(this).attr("id").split("____")[1]
		
		$("#HORAINICIOATV___"+seq).prop("disabled",true)
		$("#HORAFIMATV___"+seq).prop("disabled",true)
		
	})
	
}

// ADICIONA UMA LINHA NA TABELA DE APONTAMENTO
function addApont(){

	var row = wdkAddChild('APONTAMENTOPAPC')
	
	var mySimpleCalendar1 = FLUIGC.calendar('#HORAINICIOAPONT___'+row, {
		pickDate: false,
	    pickTime: true
	})
	var mySimpleCalendar2 = FLUIGC.calendar('#HORAFIMAPONT___'+row, {
		pickDate: false,
	    pickTime: true
	})
	$("#HORAFIMAPONT___"+row).prop("disabled",true)
	
	// PREENCHE A HORA INICIO DA PRÓXIMA HORA PRODUTIVA/IMPRODUTIVA
	preencheHoraInicio(row)
	
	return row
	
}

// EXCLUI UMA LINHA NA TABELA DE APONTAMENTO
function excluirApont(oElement){

	 // APAGA O ITEM DA VIEW DA TABELA COMPONENTES
    fnWdkRemoveChild(oElement)
	
}

// ADICIONA UMA LINHA NA TABELA DE ATIVIDADES
function addAtvCopia(){
	
	var row = wdkAddChild('ATIVIDADES')
	 
	// MOSTRA/ESCONDE ÍCONES DE EXPANDIR E REDUZIR
	$("#ICON___"+row).show()
	$("#ICONR___"+row).hide()
	$("#ABAS_ATVS___"+row).hide()
	
	$("#SEQ___"+row).val(row)
	
	$("#LINHAATV___"+row).addClass("linhaVermelha")
	
	$("#EXCLUIRATV___"+row).hide()
	
	return row
	
}

// ADICIONA UMA LINHA NA TABELA DE COMPONENTES GERAL OCULTA
function addComp(){
	
	var row = wdkAddChild('COMPONENTESGERAL')
	
	//$("#SEQCOMPGERAL___"+row).val(row)
	
	return row
	
}

// ADICIONA UMA LINHA NA TABELA DE HORAS IMPRODUTIVAS DO DIA 1
function addHoraImprD1(){
	
	var row = wdkAddChild('HORASIMPRODUTIVASDIA1')
	
	return row
	
}

// ADICIONA UMA LINHA NA TABELA DE HORAS IMPRODUTIVAS DO DIA 2
function addHoraImprD2(){
	
	var row = wdkAddChild('HORASIMPRODUTIVASDIA2')
	
	return row
	
}

// ADICIONA UMA LINHA NA TABELA DE HORAS IMPRODUTIVAS DO DIA 3
function addHoraImprD3(){
	
	var row = wdkAddChild('HORASIMPRODUTIVASDIA3')
	
	return row
	
}

// EXCLUIR ATIVIDADE
function excluirAtv(obj){
	
	fnWdkRemoveChild(obj)
	
}

// BUSCA QTDE DAS ATIVIDADES
function buscaQtdeAtvs(){
	
	var count = 0
	var qtde = 0
	
	// PERCORRE TODOS OS REGISTROS DA TABELA DOS MODAIS
	$("input[id^='OP_MODAL___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		var qtdeFabricada = $("#QTDEFABRICADA_MODAL___"+seq).val()
		qtdeFabricada = parseFloat(qtdeFabricada)
		
		// SE A QTDE FABRICADA 
		if(qtdeFabricada>0){
			
			qtde = qtde + 1
			
		}
		
	})
	
	// PERCORRE TODOS OS REGISTROS DA TABELA DAS ATIVIDADES
	/*$("input[id^='CODIGOPRD___']").each(function(){
		
		count = count + 1
		
	})*/
	
	// PERCORRE TODOS AS HORAS PRODUTIVAS
	$("input[id^='CODAPONTAMENTO___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var codApontamento = $("#CODAPONTAMENTO___"+seq).val()
		
		// SE É UMA HORA PRODUTIVA
		if(codApontamento=="" || codApontamento==null || codApontamento==undefined){
			
			count = count + 1
			
		}
		
	})
	
	//count = count * qtde
	
	//console.log("count: "+count)
	
	return qtde
	
}

// BUSCA O CUSTO MÉDIO DA SUCATA 
function buscaCustoMedioSucata(seq,codColigada,codFilial){
	
	var codigoPrd = $("#CODSUCATA___"+seq).val()
	
	// MONTA AS CONSTRAINTS
	var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("CODIGOPRD",codigoPrd,codigoPrd,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
	
	var constraints = new Array(a1,a2,a3)
	
	var dataset = DatasetFactory.getDataset("dsBuscaCustoMedioPrd",null,constraints,null)
	var row = dataset.values
	
	// SE RETORNO NÃO É NULO OU VAZIO
	if(!(row=="" || row==null || row==undefined)){
		
		var rep = row[0]
		
		$("#CUSTOSUCATA___"+seq).val(rep["CUSTOMEDIO"])
		$("#IDPRDSUCATA___"+seq).val(rep["IDPRD"])
		
	} 
	
}

// BUSCA E SALVA O SEQ ATV NA TABELA DO MODAL
function salvaSeqAtv(){
	
	console.log("salva o seq da atv no modal das OP's")
	
	// PERCORRE TODOS OS REGISTROS DA TABELA DO MODAL
	$("input[id^='OP_MODAL___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var codOrdem = $("#OP_MODAL___"+seq).val()
		var idAtvOrdem = $("#IDATV_MODAL___"+seq).val()
		
		console.log("codOrdem: "+codOrdem+", idAtvOrdem: "+idAtvOrdem)
		
		// BUSCA O SEQ DA ATIVIDADE DA OP
		var seqAtv = buscaSeq(codOrdem,idAtvOrdem)
		
		// BUSCA O SALDO TRABALHADO PARA A ATV DA OP
		var saldo = buscaSaldoTrabalhado(codOrdem,idAtvOrdem)
		
		$("#SEQATV_MODAL___"+seq).val(seqAtv)
		$("#SALDOTRABALHADO_MODAL___"+seq).val(saldo)
	
	})
	
}

// BUSCA O SALDO TRABALHADO PARA A ATV DA OP
function buscaSaldoTrabalhado(codOrdem,idAtvOrdem){
	
	console.log("vou buscar o saldo Trabalhado total")
	
	console.log("codOrdem: "+codOrdem+", idAtvOrdem: "+idAtvOrdem)
	
	var saldoTotal = 0
	
	// PERCORRE TODOS AS ATIVIDADES APONTADAS
	$("input[id^='CODIGOPRD___']").each(function(){
	
		var seq = $(this).attr("id").split("___")[1]
		
		var codOrdemAux = $("#OP___"+seq).val()
		var idAtvOrdemAux = $("#IDATIVIDADE___"+seq).val()
		
		var saldo = $("#SALDOTRABALHADO___"+seq).val()
		
		// SE É A MESMA OP E ATIVIDADE
		if(codOrdem==codOrdemAux && idAtvOrdem==idAtvOrdemAux){
			
			// SE SALDO NÃO É NULO OU VAZIO
			if(!(saldo=="" || saldo==null || saldo==undefined)){
				
				saldo = parseFloat(saldo)
				
				console.log("achei saldo trabalhado, saldo: "+saldo)
				
				console.log("saldoTotal: "+saldoTotal)
				
				saldoTotal = parseFloat(saldoTotal) + parseFloat(saldo)
			
				console.log("saldoTotal após soma: "+saldoTotal)
				
			}
			
		}
		
	})
	
	console.log("saldoTotal final: "+saldoTotal)
	
	return saldoTotal
		
}

// BUSCA O SEQ DA ATIVIDADE DA OP
function buscaSeq(codOrdemAux,idAtvOrdemAux){

	var achei = ""
	
	console.log("vou buscar o seq")	
	
	console.log("codOrdemAux: "+codOrdemAux+", idAtvOrdemAux: "+idAtvOrdemAux)
	
	// PERCORRE TODOS AS ATIVIDADES APONTADAS
	$("input[id^='CODIGOPRD___']").each(function(){
	
		var seq = $(this).attr("id").split("___")[1]
		
		var codOrdem = $("#OP___"+seq).val()
		var idAtvOrdem = $("#IDATIVIDADE___"+seq).val()
		var seqAux = $("#SEQ___"+seq).val()
		
		console.log("codOrdem: "+codOrdem+", idAtvOrdem: "+idAtvOrdem)
		
		// SE NÃO ACHOU AINDA
		if(achei=="" || achei==undefined || achei==null){
			
			// SE É A MESMA ATIVIDADE DA OP
			if(codOrdem==codOrdemAux && idAtvOrdem==idAtvOrdemAux){
				
				achei = seqAux
				
			}
		
		}
		
	})
	
	console.log("achei o seq: "+achei)
	
	return achei
	
}

// PREENCHE A TABELA DE COMPONENTES
function preencheComponentes(){
	
	// LIMPA TABELA DOS COMPONENTES
	limpaComps()
	
	console.log("vou preencher a tabela de componentes")
	
	var soma = 0
	
	var codmo = $("#CODMO").val()
	var codFilial = $("#CODFILIAL").val()
	var dataDe = $("#DATA_DE").val()
	var numPlanoCorte = $("#NUMPLANOCORTE").val()
	
	// FORMATA A DATA PREENCHIDA NO PADRÃO PARA O BANCO
	dataDe = formataDataBanco(dataDe)

	console.log("codmo: "+codmo+", codFilial: "+codFilial+", dataDe: "+dataDe+", numPlanoCorte: "+numPlanoCorte)
	
	/*
	
	// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
	var a1 = DatasetFactory.createConstraint("CODMO",codmo,codmo,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("NUMPLANOCORTE",numPlanoCorte,numPlanoCorte,ConstraintType.MUST)
	var a4 = DatasetFactory.createConstraint("DATA_DE",dataDe,dataDe,ConstraintType.MUST)
	
	var constraints = new Array(a1,a2,a3,a4)
	
	var dataset = DatasetFactory.getDataset("dsBuscaHistAtvProgOpePAPC",null,constraints,null)
	var row3 = dataset.values
	
	console.log("row")
	console.log(row3)
	
	// SE RETORNO NÃO É NULO OU VAZIO
	if(!(row3=="" || row3==null || row3==undefined || row3=="null")){
		
		var count3 = row3.length
		
		// PERCORRE TODOS OS REGISTROS DO RETORNO DA CONSULTA
		for(var k=0; k<count3; k++){*/

	var k = 0
	var count3 = 0
	
	$("input[id^='OP_MODAL___']").each(function(){
		
		var seqModal = $(this).attr("id").split("___")[1]
		
		var qtdeFabricada = $("#QTDEFABRICADA_MODAL___"+seqModal).val()
		
		// SE QTDEFABRICADA FOI INFORMADA
		if(!(qtdeFabricada=="" || qtdeFabricada==null || qtdeFabricada==undefined || qtdeFabricada==0 || qtdeFabricada=="0" )){
		
			count3 = count3 + 1
			
		}
		
	})
	
	console.log("count3: "+count3)
	
	$("input[id^='OP_MODAL___']").each(function(){
	
		var seqModal = $(this).attr("id").split("___")[1]
		
			/*
			console.log("k: "+k)
			
			var rep3 = row3[k]
			
			console.log(row3[k])
			
			var codOrdemAux = rep3["OP"]
			var idAtvOrdemAux = rep3["IDATVORDEM"]
			*/
	
			var codOrdemAux = $("#OP_MODAL___"+seqModal).val()
			var idAtvOrdemAux = $("#IDATV_MODAL___"+seqModal).val()
			var qtdeFabricada = $("#QTDEFABRICADA_MODAL___"+seqModal).val()
			
			console.log("codOrdemAux: "+codOrdemAux+", idAtvOrdemAux: "+idAtvOrdemAux+", qtdeFabricada: "+qtdeFabricada)
			
			// SE QTDEFABRICADA FOI INFORMADA
			if(!(qtdeFabricada=="" || qtdeFabricada==null || qtdeFabricada==undefined || qtdeFabricada==0 || qtdeFabricada=="0")){
				
				
				// BUSCA O SEQ DA ATIVIDADE DA OP
				var seq = buscaSeq(codOrdemAux,idAtvOrdemAux)
					
				console.log("seq: "+seq)
				
				//var copia = $("#COPIA___"+seq).val()
				//var codOrdemAux = $("#OP___"+seq).val()
				//var idAtvOrdemAux = $("#IDATIVIDADE___"+seq).val()
				
				//console.log("rep")
				//console.log(rep)
				
				// SE NÃO É UMA CÓPIA DA ATIVIDADE E É A MESMA ATIVIDADE DA ORDEM
				//if(!(copia=="S")){
				
				var rowComp = addComp()
				
				console.log("vou inserir componente para a atividade seq "+seq)
				
				var codColigada = $("#CODCOLIGADA").val()
				var codFilial = $("#CODFILIAL").val()
				var numPlanoCorte = $("#NUMPLANOCORTE").val()
				var idLote = $("#IDLOTE").val()
				
				// MONTA AS CONSTRAINTS
				var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST)
				var a2 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
				var a3 = DatasetFactory.createConstraint("NUMPLANOCORTE",numPlanoCorte,numPlanoCorte,ConstraintType.MUST)
				var a4 = DatasetFactory.createConstraint("IDLOTE",idLote,idLote,ConstraintType.MUST)
				
				var constraints = new Array(a1,a2,a3,a4)
				
				var dataset = DatasetFactory.getDataset("dsBuscaCompPAPC",null,constraints,null)
				var row = dataset.values
				
				console.log("row")
				console.log(row)
				
				// SE RETORNO NÃO É NULO OU VAZIO
				if(!(row=="" || row==null || row==undefined)){
				
					var count = row.length
					
					console.log("count: "+count)
					
					// PERCORRE TODOS OS COMPONENTES
					for(var i=0; i<count; i++){
					
						var qtdeMPCalc = 0
						var rep = row[i]
						
						//var idAtv = rep["IDATVORDEM"]
						//var codOrdem = rep["CODORDEM"]
						var sucata = true
						
						console.log("rep")
						console.log(rep)
						
						console.log("codColigada: "+codColigada+", codFilial: "+codFilial+", numPlanoCorte: "+numPlanoCorte+", codOrdemAux: "+codOrdemAux+", idAtvOrdemAux: "+idAtvOrdemAux+",idLote: "+idLote)
						
						/*
						// MONTA AS CONSTRAINTS
						var c1 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST)
						var c2 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
						var c3 = DatasetFactory.createConstraint("NUMPLANOCORTE",numPlanoCorte,numPlanoCorte,ConstraintType.MUST)
						var c4 = DatasetFactory.createConstraint("CODORDEM",codOrdemAux,codOrdemAux,ConstraintType.MUST)
						var c5 = DatasetFactory.createConstraint("IDATVORDEM",idAtvOrdemAux,idAtvOrdemAux,ConstraintType.MUST)
						var c6 = DatasetFactory.createConstraint("IDLOTE",idLote,idLote,ConstraintType.MUST)
						
						var constraints2 = new Array(c1,c2,c3,c4,c5,c6)
						
						var dataset2 = DatasetFactory.getDataset("dsBuscaPercentualMPPAPC",null,constraints2,null)
						var row2 = dataset2.values
						var rep2 = row2[0]
						
						console.log("row2")
						console.log(row2)
						
						console.log("percentual")
						console.log(rep2["PERCENTUAL"])
						
						*/
						
						// BUSCA O PERCENTUAL DA ATIVIDADE NO PLANO
						var percentual = buscaPercentualMP(codOrdemAux,idAtvOrdemAux)
						
						// CALCULA A QUANTIDADE A SER BAIXADA
						var qtdeMP = $("#QTDEMP").val()
						
						console.log("qtdeMP: "+qtdeMP)
						
						if(qtdeMP.includes(",")){
							
							qtdeMP = qtdeMP.replace(",",".")
							
						}
						
						qtdeMP = parseFloat(qtdeMP)
						
						var p = k + 1
						k = k + 1
						
						console.log("k: "+k)
						console.log("p: "+p)
						console.log("count: "+count3)
						
						// SE É O ÚLTIMO
						if(p==count3){
							
							console.log("p igual ao count3")
							
							qtdeMPCalc = parseFloat(qtdeMP) - parseFloat(soma)
							
							qtdeMPCalc = qtdeMPCalc.toFixed(4)
							
							console.log("qtdeMPCalc: "+qtdeMPCalc)
							
						} else {
							// SE NÃO
							
							console.log("p é diferente de count3")
							
							//qtdeMPCalc = qtdeMP * parseFloat(rep2["PERCENTUAL"])
							qtdeMPCalc = (qtdeMP * parseFloat(percentual)) / 100
							
							qtdeMPCalc = qtdeMPCalc.toFixed(4)
							
							console.log("qtdeMPCalc: "+qtdeMPCalc)
							
							soma = parseFloat(soma) + parseFloat(qtdeMPCalc)
							
							console.log("soma: "+soma)
							
						}
						
						$("input[id^='BAOP___']").each(function(){
			

							var seq = $(this).attr("id").split("___")[1]
							
							var op = $(this).val();
							var idatividade = $("#BAIDATV___"+seq).val()

							if(op==codOrdemAux && idatividade==idAtvOrdemAux){

								qtdeMPCalc = $("#BAQTDUNIT___"+seq).val()

							}

						})


						console.log("soma: "+soma)
						console.log("qtde componente: "+qtdeMPCalc)
						console.log("qtdeMP: "+qtdeMP)

						//
						
						$("#DESCRICAOCOMPG___"+rowComp).val(rep["DESCRICAO"])
						$("#CODIGOCOMPG___"+rowComp).val(rep["CODIGOPRD"])
						$("#IDPRDCOMPG___"+rowComp).val(rep["IDPRD"])
						$("#IDLOTECOMPG___"+rowComp).val($("#IDLOTE").val())
						$("#NUMLOTECOMPG___"+rowComp).val($("#NUMLOTE").val())
						$("#QTDECOMPG___"+rowComp).val(qtdeMP)
						//$("#QTDEUTG___"+rowComp).val(rep2["TOTAL_PLANO"])
						$("#QTDEUTG___"+rowComp).val(qtdeMPCalc)
						$("#UNDCOMPG___"+rowComp).val(rep["CODUNDCONTROLE"])
						$("#ESTOOQUEATUALCOMPG___"+rowComp).val(rep["ESTOQUE_ATUAL"])
						$("#CODLOCCOMPG___"+rowComp).val(rep["CODLOC"])
						$("#CUSTOMEDIOCOMPG___"+rowComp).val(rep["CUSTOMEDIO"])
						
						console.log("vou salvar o seq "+seq)
						$("#SEQATV___"+rowComp).val(seq)
						
						/*var consumoPrev = parseFloat(rep["CONSUMO_PLANEJADO"])
						
						var total = $("#QTDEMP").val()
						
						if(total.includes(",")){
							
							total = total.replace(",",".")
							
						}
						
						total = parseFloat(total)
						
						console.log("total: "+total)
						console.log("consumoPrev: "+consumoPrev)
						
						var percentual = consumoPrev / total
						var totalSucata = $("#TOTALSUCATA___"+seq).val()
						
						console.log("percentual calc: "+percentual)
						
						if(totalSucata.includes(",")){
							
							totalSucata = totalSucata.replace(",",".")
							
						}
						
						totalSucata = parseFloat(totalSucata)
						
						percentual = totalSucata * percentual
						
						$("#QTDESUCATA___"+seq).val(percentual)*/
						
						// SE SUCATA AINDA NÃO FOI LANÇADA
						if(sucata){
							
							// MONTA AS CONSTRAINTS
							/*var c1 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST)
							var c2 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
							var c3 = DatasetFactory.createConstraint("NUMPLANOCORTE",numPlanoCorte,numPlanoCorte,ConstraintType.MUST)
							
							var constraints = new Array(c1,c2,c3)
							
							var dataset = DatasetFactory.getDataset("dsBuscaTotalPlanoMP",null,constraints,null)
							var row = dataset.values
							var rep = row[0]
							
							console.log("row sucata")
							console.log(row)
							
							$("#QTDESUCATA___"+seq).val(rep["TOTAL_PLANO"])*/
							
							//$("#QTDESUCATA___"+seq).val(rep["TOTAL_PLANO"])
							
							// BUSCA O CUSTO MÉDIO DA SUCATA 
							buscaCustoMedioSucata(seq,codColigada,codFilial)
							
							sucata = false
							
						}
						
					}
					
				}
				
			}
			
		
		//}
		
	
	})
	
	//}
	//})
	
}

// BUSCA O PERCENTUAL DA ATIVIDADE NO PLANO
function buscaPercentualMP(codOrdemAux,idAtvOrdemAux){
	 
	console.log("busca o percentual MP para a OP "+codOrdemAux+" e idAtv "+idAtvOrdemAux)
	
	var percentual = 0	
	
	var soma = 0
	
	// PERCORRE OS REGISTROS DO MODAL DAS QUANTIDADES FABRICADAS
	$("input[id^='OP_MODAL___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var qtdeFabricada = $("#QTDEFABRICADA_MODAL___"+seq).val()
		var qtdePlano = $("#QTDEPLANO_MODAL___"+seq).val()
		
		console.log("qtdeFabricada: "+qtdeFabricada)
		
		// SE QTDEFABRICADA FOI INFORMADA
		if(!(qtdeFabricada=="" || qtdeFabricada==null || qtdeFabricada==undefined || qtdeFabricada==0 || qtdeFabricada=="0")){
			
			qtdePlano = parseInt(qtdePlano)
			
			soma = soma + qtdePlano
			
		}
		
	})
	
	console.log("total: "+soma)
	
	// PERCORRE OS REGISTROS DO MODAL DAS QUANTIDADES FABRICADAS
	$("input[id^='OP_MODAL___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var codOrdem = $("#OP_MODAL___"+seq).val()
		var idAtvOrdem = $("#IDATV_MODAL___"+seq).val()
		var qtdePlano = $("#QTDEPLANO_MODAL___"+seq).val()
		
		qtdePlano = parseInt(qtdePlano)
		
		console.log("codOrdem: "+codOrdem+", idAtvOrdem: "+idAtvOrdem)
		
		// SE OP E IDATV SÃO IGUAIS
		if(codOrdem==codOrdemAux && idAtvOrdem==idAtvOrdemAux){
			
			console.log("qtdePlano: "+qtdePlano)
			
			percentual = (qtdePlano * 100) / parseInt(soma)
			
		}
		
	})
	
	percentual = parseFloat(percentual).toFixed(2)
	
	console.log("vou retornar o percentual: "+percentual)
	
	return percentual

}

// PREENCHE TODAS AS ATIVIDADES COM AS HORAS LANÇADAS
function preencheAtividadesHoras(){
	
	console.log("vou preencher as atividades e realizar os cálculos das horas apontadas")
	
	var count = 0
	
	// FAZ A COPIA DAS ATIVIDADES QUE TIVERAM MAIS DE UMA HORA PRODUTIVA APONTADAS
	//copiaAtvApontHoras()
	
	var dia = $("#DATA_DE").val()
	
	dia = formataDataBanco(dia)
	
	var qtdeAtvs = buscaQtdeAtvs()
	
	console.log("qtdeAtvs: "+qtdeAtvs)
	
	// PERCORRE TODOS OS APONTAMENTOS PRODUTIVOS
	$("input[id^='CODAPONTAMENTO___']").each(function(){
	
		var seq = $(this).attr("id").split("___")[1]
		
		var codApont = $("#CODAPONTAMENTO___"+seq).val()
		
		console.log("codApont: "+codApont)
		
		var totalHoras = $("#TOTALHORAS___"+seq).val()
			
		totalHoras = parseFloat(totalHoras)
		
		var horaInicio = $("#HORAINICIOAPONT___"+seq).val()
		var horaFimReal = $("#HORAFIMAPONT___"+seq).val()
		
		horaInicio = horaInicio+":00"
		horaFimReal = horaFimReal+":00"
			
		// SE NÃO É A PRIMEIRA HORA PRODUTIVA 
		if(count>0 && (codApont=="" || codApont==null || codApont==undefined) && !(totalHoras=="" || totalHoras==null || totalHoras==undefined)){
			
			console.log("não é a primeira hora produtiva")
			
			var qtdeAux = 0
			var soma = new Array()
			
			// PERCORRE TODOS OS REGISTROS DA TABELA DAS ATIVIDADES
			$("input[id^='CODIGOPRD___']").each(function(){
				
				var seq2 = $(this).attr("id").split("___")[1]
				
				console.log("seq2: "+seq2)
				
				var codOrdem = $("#OP___"+seq2).val()
				var idAtvOrdem = $("#IDATIVIDADE___"+seq2).val()
				
				console.log("codOrdem: "+codOrdem+", idAtvOrdem: "+idAtvOrdem)
				
				var copia = $("#COPIA___"+seq2).val()
				
				if(!(copia=="S")){
					
					// SE TEM QTDE FABRICADA PARA A ATIVIDADE DA OP
					if(temQtdeFabricada(codOrdem,idAtvOrdem)){
						
						qtdeAux = qtdeAux + 1
						
						// FAZ A CÓPIA DA ATIVIDADE
						//$("#COPIARATV___"+seq).click()
						var row = addAtvCopia()
						
						// FAZ O REPLACE DA ATIVIDADE QUE FOI CRIADA
						replaceAtv(row,seq2)
						
						/*var percentual = $("#PERCENTUALPLANO___"+row).val()
						
						var percentual = 
						
						percentual = parseFloat(percentual) / 100*/
						
						// BUSCA O PERCENTUAL DENTRO DAS ATIVIDADES COM QUANTIDADES FABRICADAS
						//var percentual = buscaPercentual(codOrdem,idAtvOrdem)
						
						
						//var horas = percentual * totalHoras
						var horasTotal = totalHoras / qtdeAtvs 
						
						console.log("horasTotal: "+horasTotal)
						
						var segundos = Math.abs(horasTotal)
						segundos = segundos - Math.floor(segundos);
						
						//horas = horas.toFixed(0)
						var horas = Math.floor(horasTotal)
						segundos = segundos * 60
						
						//horas = parseInt(horas)
						segundos = Math.floor(segundos)
						
						console.log("horas: "+horas+", segundos: "+segundos)

						// SE É O ÚLTIMA ATIVIDADE DO PLANO
						if(qtdeAux==qtdeAtvs){
							
							var total = 0
							
							for(var j=0; j<soma.length; j++){
								
								total = total + soma[j]
								
							}
							
							horasTotal = totalHoras - total
							
						}
						
						soma.push(horasTotal)
						
						console.log("totalHoras: "+totalHoras+", dia: "+dia+", horaInicio: "+horaInicio+", horas: "+horas+", horasTotal: "+horasTotal)
						
						var d1 = new Date(dia+" "+horaInicio)
						d1.setMinutes(d1.getMinutes()+horas) 
						d1.setSeconds(d1.getSeconds()+segundos)
						
						console.log("#resultado: " + " " + d1)
						
						var str = d1.toString().split(" ")
						
						var horaFim = str[4]
						horaFim = str[4].split(":")
						
						// SE A HORA FIM É "00:00"
						if(horaFim[0]=="00" && horaFim[1]=="00"){
						
							console.log("horaFim[0]: "+horaFim[0]+", horaFim[1]: "+horaFim[1]+", horaFim[2]: "+horaFim[2])
							
							horaFim[0]="23"
							horaFim[1]="59"
							horaFim[2]="59"
							
						}
						
						horaFim = horaFim[0]+":"+horaFim[1]+":"+horaFim[2]
						

						// SE É O ÚLTIMA ATIVIDADE DO PLANO
						if(qtdeAux==qtdeAtvs){
							
							horaFim = horaFimReal
							
						}
						
						$("#HORAINICIOATV___"+row).val(horaInicio)
						$("#HORAFIMATV___"+row).val(horaFim)
						
						var data1 = new Date(dia+' '+horaInicio)
						var data2 = new Date(dia+' '+horaFim)
						
						console.log("data1: "+data1+", data2: "+data2)
						
						var diff = Math.abs(data1.getTime() - data2.getTime())/3600000
						
						console.log("diff: "+diff)
						
						$("#SALDOTRABALHADO___"+row).val(diff)
						
						console.log("horaInicio: "+horaInicio+", horaFim: "+horaFim)
						
						horaInicio = horaFim
						
					}
					
				}
				
			})
			
		}
		
		// É A PRIMEIRA HORA PRODUTIVA 
		if(count==0 && (codApont=="" || codApont==null || codApont==undefined) && !(totalHoras=="" || totalHoras==null || totalHoras==undefined)){
			
			console.log("é a primeira hora produtiva")
			
			var qtdeAux = 0
			var soma = new Array()
			
			// PERCORRE TODOS OS REGISTROS DA TABELA DAS ATIVIDADES
			$("input[id^='CODIGOPRD___']").each(function(){
				
				var seq2 = $(this).attr("id").split("___")[1]
				
				console.log("seq2: "+seq2)
				
				var codOrdem = $("#OP___"+seq2).val()
				var idAtvOrdem = $("#IDATIVIDADE___"+seq2).val()
				
				console.log("codOrdem: "+codOrdem+", idAtvOrdem: "+idAtvOrdem)
				
				// SE TEM QTDE FABRICADA PARA A ATIVIDADE DA OP
				if(temQtdeFabricada(codOrdem,idAtvOrdem)){
					
					qtdeAux = qtdeAux + 1
					
					/*var percentual = $("#PERCENTUALPLANO___"+seq2).val()
					
					percentual = parseFloat(percentual) / 100*/
					
					// BUSCA O PERCENTUAL DENTRO DAS ATIVIDADES COM QUANTIDADES FABRICADAS
					//var percentual = buscaPercentual(codOrdem,idAtvOrdem)
					
					//percentual = percentual.toFixed(4)
					
					//console.log("percentual: "+percentual+", totalHoras: "+totalHoras)
					
					//var horas = percentual * totalHoras
					var horasTotal = totalHoras / qtdeAtvs 
					
					console.log("horasTotal: "+horasTotal)
					
					var segundos = Math.abs(horasTotal)
					segundos = segundos - Math.floor(segundos);
					
					//horas = horas.toFixed(0)
					var horas = Math.floor(horasTotal)
					segundos = segundos * 60
					
					//horas = parseInt(horas)
					segundos = Math.floor(segundos)
					
					console.log("horas: "+horas+", segundos: "+segundos)

					// SE É O ÚLTIMA ATIVIDADE DO PLANO
					if(qtdeAux==qtdeAtvs){
						
						console.log("é a última atividade para calcular as horas produtivas")
						
						var total = 0
						
						for(var j=0; j<soma.length; j++){
							
							total = total + soma[j]
							
						}
						
						console.log("totalHoras: "+totalHoras+", total: "+total)
						
						horas = totalHoras - total
						
						console.log("horas após cálculo de arredondamento: "+horas)
						
					}
					
					soma.push(horasTotal)
					
					console.log("totalHoras: "+totalHoras+", dia: "+dia+", horaInicio: "+horaInicio+", horas: "+horas+", horasTotal: "+horasTotal)
					
					var d1 = new Date(dia+" "+horaInicio)
					d1.setMinutes(d1.getMinutes()+horas) 
					d1.setSeconds(d1.getSeconds()+segundos)
					
					console.log("#resultado: " + " " + d1)
					
					var str = d1.toString().split(" ")
					
					var horaFim = str[4]
					horaFim = str[4].split(":")
					
					// SE A HORA FIM É "00:00"
					if(horaFim[0]=="00" && horaFim[1]=="00"){
					
						console.log("horaFim[0]: "+horaFim[0]+", horaFim[1]: "+horaFim[1]+", horaFim[2]: "+horaFim[2])
						
						horaFim[0]="23"
						horaFim[1]="59"
						horaFim[2]="59"
						
					}
					
					horaFim = horaFim[0]+":"+horaFim[1]+":"+horaFim[2]
					
					// SE É O ÚLTIMA ATIVIDADE DO PLANO
					if(qtdeAux==qtdeAtvs){
						
						horaFim = horaFimReal
						
					}
					
					$("#HORAINICIOATV___"+seq2).val(horaInicio)
					$("#HORAFIMATV___"+seq2).val(horaFim)
					
					var data1 = new Date(dia+' '+horaInicio)
					var data2 = new Date(dia+' '+horaFim)
					
					console.log("data1: "+data1+", data2: "+data2)
					
					var diff = Math.abs(data1.getTime() - data2.getTime())/3600000
					
					console.log("diff: "+diff)
					
					$("#SALDOTRABALHADO___"+seq2).val(diff)
		
					console.log("horaInicio: "+horaInicio+", horaFim: "+horaFim)
					
					horaInicio = horaFim
					
				}
				
			})
			
			count = count + 1
			
		}
		
	})
	
}

// SE TEM QTDE FABRICADA PARA A ATIVIDADE DA OP
function temQtdeFabricada(codOrdem,idAtvOrdem){
	
	console.log("vou verificar se OP "+codOrdem+" e idAtvOrdem "+idAtvOrdem+" tem qtde fabricada")
	
	var ret = false
	
	// PERCORRE TODOS OS REGISTROS DO MODAL
	$("input[id^='OP_MODAL___']").each(function(){
	
		var seq = $(this).attr("id").split("___")[1]
		
		var codOrdemAux = $("#OP_MODAL___"+seq).val()
		var idAtvOrdemAux = $("#IDATV_MODAL___"+seq).val()
		var qtdeFabricada = $("#QTDEFABRICADA_MODAL___"+seq).val()
		
		//qtdeFabricada = parseInt(qtdeFabricada)
		qtdeFabricada = parseFloat(qtdeFabricada)
		
		// SE É A MESMA OP E IDATVORDEM E QTDE MAIOR QUE 0
		if(codOrdem==codOrdemAux && idAtvOrdem==idAtvOrdemAux && qtdeFabricada>0){

			console.log("achei qtde fabricada")
			
			ret = true
			
		}
		
	})
	
	console.log("ret: "+ret)
	
	return ret
	
}

// BUSCA O PERCENTUAL DENTRO DAS ATIVIDADES COM QUANTIDADES FABRICADAS
function buscaPercentual(codOrdem,idAtvOrdem){
	
	console.log("vou calcular o percentual da OP "+codOrdem+" e idAtvOrdem "+idAtvOrdem)
	
	var percentual = 0
	var soma = 0
	var count = 0
	
	// PERCORRE TODOS OS REGISTROS DO MODAL
	$("input[id^='OP_MODAL___']").each(function(){
	
		var seq = $(this).attr("id").split("___")[1]
		
		var codOrdemAux = $("#OP_MODAL___"+seq).val()
		var idAtvOrdemAux = $("#IDATV_MODAL___"+seq).val()
		var qtdeFabricada = $("#QTDEFABRICADA_MODAL___"+seq).val()
		var qtdePlano = $("#QTDEPLANO_MODAL___"+seq).val() 
		
		qtdePlano = parseInt(qtdePlano)
		//qtdeFabricada = parseInt(qtdeFabricada)
		qtdeFabricada = parseFloat(qtdeFabricada)
		
		// SE TEM QTDE FABRICADA
		if(qtdeFabricada>0){

			soma = soma + qtdePlano
			
			count = count + 1
			
		}
		
	})
	
	// PERCORRE TODOS OS REGISTROS DO MODAL
	$("input[id^='OP_MODAL___']").each(function(){
	
		var seq = $(this).attr("id").split("___")[1]
		
		var codOrdemAux = $("#OP_MODAL___"+seq).val()
		var idAtvOrdemAux = $("#IDATV_MODAL___"+seq).val()
		var qtdeFabricada = $("#QTDEFABRICADA_MODAL___"+seq).val()
		var qtdePlano = $("#QTDEPLANO_MODAL___"+seq).val() 

		qtdePlano = parseInt(qtdePlano)
		//qtdeFabricada = parseInt(qtdeFabricada)
		qtdeFabricada = parseFloat(qtdeFabricada)
		
		// SE É A MESMA OP E IDATVORDEM E QTDE MAIOR QUE 0
		if(codOrdem==codOrdemAux && idAtvOrdem==idAtvOrdemAux && qtdeFabricada>0){
			
			percentual = parseFloat(qtdePlano / soma)
			
		}
		
	})
	
	console.log("percentual calculado: "+percentual)
	
	return percentual
	
}
	
// FAZ A COPIA DAS ATIVIDADES QUE TIVERAM MAIS DE UMA HORA PRODUTIVA APONTADAS
function copiaAtvApontHoras(){
	
	console.log("vou fazer a cópia das atividades que tiveram mais de uma hora produtiva apontada")
	
	var count = 0
	
	// PERCORRE TODOS OS APONTAMENTOS PRODUTIVOS
	$("input[id^='CODAPONTAMENTO___']").each(function(){
	
		var seq = $(this).attr("id").split("___")[1]
		
		var codApont = $("#CODAPONTAMENTO___"+seq).val()
		
		// É UMA APONTAMENTO PRODUTIVO
		if(codApont=="" || codApont==null || codApont==undefined){
			
			count = count + 1
			
		}
		
	})
	
	// SE TEM MAIS DE UMA HORA PRODUTIVA APONTADA
	if(count>1){
		
		// PERCORRE TODAS AS CÓPIAS QUE SERÃO NECESSÁRIAS
		for(var i=0; i<count-1;i++){
			
			// PERCORRE TODOS OS APONTAMENTOS PRODUTIVOS
			$("input[id^='CODIGOPRD___']").each(function(){
			
				var seq = $(this).attr("id").split("___")[1]
				
				// FAZ A CÓPIA DA ATIVIDADE
				$("#COPIARATV___"+seq).click()
				
			})
			
		}
		
	}
	
}

// FAZ O REPLACE DA ATIVIDADE QUE FOI CRIADA
function replaceAtv(row,seq){
	
	var strHTML = "<tr style='display: table-row;' id='LINHAATV___"+row+"' detail='true' detailname='ATIVIDADES' class='linhaVermelha'> "
	
	strHTML = strHTML + $("#LINHAATV___"+row).html() + " </tr>"
	
	$("#LINHAATV___"+row).remove()
	$("#LINHAATV___"+seq).after(strHTML)
	
	/*var mySimpleCalendar2 = FLUIGC.calendar('#HORAINICIOATV___'+row, {
		pickDate: false,
	    pickTime: true
	})
	
	var mySimpleCalendar3 = FLUIGC.calendar('#HORAFIMATV___'+row, {
		pickDate: false,
	    pickTime: true
	})*/
	$("#HORAINICIOATV___"+row).prop("readonly",true)
	$("#HORAFIMATV___"+row).prop("readonly",true)
	
	$("#DESCRICAO___"+row).val($("#DESCRICAO___"+seq).val())
	$("#CODIGOPRD___"+row).val($("#CODIGOPRD___"+seq).val())
	$("#IDPRD___"+row).val($("#IDPRD___"+seq).val())
	$("#CODCOLIGADAATV___"+row).val($("#CODCOLIGADAATV___"+seq).val())
	$("#CODFILIALATV___"+row).val($("#CODFILIALATV___"+seq).val())
	$("#CODESTRUTURAATV___"+row).val($("#CODESTRUTURAATV___"+seq).val())
	$("#OSATV___"+row).val($("#OSATV___"+seq).val())
	$("#IDPRJATV___"+row).val($("#IDPRJATV___"+seq).val())
	$("#QTDOP___"+row).val($("#QTDOP___"+seq).val())
	$("#QTDSALDO___"+row).val($("#QTDSALDO___"+seq).val())
	$("#QTDREALIZADA___"+row).val($("#QTDREALIZADA___"+seq).val())
	$("#CUSTOPOSTO___"+row).val($("#CUSTOPOSTO___"+seq).val())
	$("#ULTIMAATVOP___"+row).val($("#ULTIMAATVOP___"+seq).val())
	$("#UNDOP___"+row).val($("#UNDOP___"+seq).val())
	$("#ATVANTERIOR___"+row).val($("#ATVANTERIOR___"+seq).val())
	$("#OP___"+row).val($("#OP___"+seq).val())
	$("#OPERACAO___"+row).val($("#OPERACAO___"+seq).val())
	$("#DSCATIVIDADE___"+row).val($("#DSCATIVIDADE___"+seq).val())
	$("#CODATIVIDADE___"+row).val($("#CODATIVIDADE___"+seq).val())
	$("#IDATIVIDADE___"+row).val($("#IDATIVIDADE___"+seq).val())
	$("#CELULA___"+row).val($("#CELULA___"+seq).val())
	$("#DATAPROGRAMADA___"+row).val($("#DATAPROGRAMADA___"+seq).val())
	$("#HORASAPONTADAS___"+row).val($("#HORASAPONTADAS___"+seq).val())
	$("#AVANCOREALIZADO___"+row).val($("#AVANCOREALIZADO___"+seq).val())
	$("#PROCESSO___"+row).val($("#PROCESSO___"+seq).val())
	$("#COMP___"+row).val($("#COMP___"+seq).val())
	$("#PERCENTUALPLANO___"+row).val($("#PERCENTUALPLANO___"+seq).val())
	$("#COPIA___"+row).val("S")
	$("#AVANCO___"+row).val($("#AVANCO___"+seq).val())
	$("#SALDOPROGRAMADO___"+row).val($("#SALDOPROGRAMADO___"+seq).val())
	$("#CODSUCATA___"+row).val($("#CODSUCATA___"+seq).val())
	$("#TOTALSUCATA___"+row).val($("#TOTALSUCATA___"+seq).val())

	var cod1 = $("#CODTIPO1___"+seq).val()
	var cod2 = $("#CODTIPO2___"+seq).val()
	var cod3 = $("#CODTIPO3___"+seq).val()
	var cod4 = $("#CODTIPO4___"+seq).val()
	var cod5 = $("#CODTIPO5___"+seq).val()
	
	var mySimpleCalendar4 = FLUIGC.calendar('#HORAINICIOIMPRO1___'+row, {
		pickDate: false,
	    pickTime: true
	})
	var mySimpleCalendar5 = FLUIGC.calendar('#HORAFIMIMPRO1___'+row, {
		pickDate: false,
	    pickTime: true
	})
	$("#HORAINICIOIMPRO1___"+row).prop("disabled",true)
	$("#HORAFIMIMPRO1___"+row).prop("disabled",true)
	
	var mySimpleCalendar6 = FLUIGC.calendar('#HORAINICIOIMPRO2___'+row, {
		pickDate: false,
	    pickTime: true
	})
	var mySimpleCalendar7 = FLUIGC.calendar('#HORAFIMIMPRO2___'+row, {
		pickDate: false,
	    pickTime: true
	})
	$("#HORAINICIOIMPRO2___"+row).prop("disabled",true)
	$("#HORAFIMIMPRO2___"+row).prop("disabled",true)
	
	var mySimpleCalendar8 = FLUIGC.calendar('#HORAINICIOIMPRO3___'+row, {
		pickDate: false,
	    pickTime: true
	})
	var mySimpleCalendar9 = FLUIGC.calendar('#HORAFIMIMPRO3___'+row, {
		pickDate: false,
	    pickTime: true
	})
	$("#HORAINICIOIMPRO3___"+row).prop("disabled",true)
	$("#HORAFIMIMPRO3___"+row).prop("disabled",true)
	
	var mySimpleCalendar10 = FLUIGC.calendar('#HORAINICIOIMPRO4___'+row, {
		pickDate: false,
	    pickTime: true
	})
	var mySimpleCalendar11 = FLUIGC.calendar('#HORAFIMIMPRO4___'+row, {
		pickDate: false,
	    pickTime: true
	})
	$("#HORAINICIOIMPRO4___"+row).prop("disabled",true)
	$("#HORAFIMIMPRO4___"+row).prop("disabled",true)
	
	var mySimpleCalendar12 = FLUIGC.calendar('#HORAINICIOIMPRO5___'+row, {
		pickDate: false,
	    pickTime: true
	})
	var mySimpleCalendar13 = FLUIGC.calendar('#HORAFIMIMPRO5___'+row, {
		pickDate: false,
	    pickTime: true
	})
	$("#HORAINICIOIMPRO5___"+row).prop("disabled",true)
	$("#HORAFIMIMPRO5___"+row).prop("disabled",true)
	
	// SE É ÚLTIMA ATV DA ORDEM, HABILITA O CAMPO QTDEREALIZADA
	if($("#ULTIMAATVOP___"+seq).val()=="SIM"){
		
		$("#QTDREALIZADA___"+row).prop("readonly",false)
		
	} else {
		// SE NÃO, DESABILITA O CAMPO QTDEREALIZADA E ESCONDE O CHECKBOX
		
		$("#OPCONCLUIDA___"+row).parent("div").hide()
		$("#QTDREALIZADA___"+row).prop("readonly",true)
		
	}
	
	// ESCONDE O BOTÃO DE EXCLUIR
	$("#EXCLUIRATV___"+row).show()
	

}

// FAZ A CÓPIA DA ATIVIDADE
function copiarAtv(obj){
	
	var seq = $(obj).attr("id").split("___")[1]
	
	var row = addAtvCopia()
	
	var strHTML = "<tr style='display: table-row;' id='LINHAATV___"+row+"' detail='true' detailname='ATIVIDADES' class='linhaVermelha'> "
	
	strHTML = strHTML + $("#LINHAATV___"+row).html() + " </tr>"
	
	$("#LINHAATV___"+row).remove()
	$("#LINHAATV___"+seq).after(strHTML)
	
	/*var mySimpleCalendar2 = FLUIGC.calendar('#HORAINICIOATV___'+row, {
		pickDate: false,
	    pickTime: true
	})
	
	var mySimpleCalendar3 = FLUIGC.calendar('#HORAFIMATV___'+row, {
		pickDate: false,
	    pickTime: true
	})*/
	$("#HORAFIMATV___"+row).prop("readonly",true)
	
	$("#DESCRICAO___"+row).val($("#DESCRICAO___"+seq).val())
	$("#CODIGOPRD___"+row).val($("#CODIGOPRD___"+seq).val())
	$("#IDPRD___"+row).val($("#IDPRD___"+seq).val())
	$("#CODCOLIGADAATV___"+row).val($("#CODCOLIGADAATV___"+seq).val())
	$("#CODFILIALATV___"+row).val($("#CODFILIALATV___"+seq).val())
	$("#CODESTRUTURAATV___"+row).val($("#CODESTRUTURAATV___"+seq).val())
	$("#OSATV___"+row).val($("#OSATV___"+seq).val())
	$("#IDPRJATV___"+row).val($("#IDPRJATV___"+seq).val())
	$("#QTDOP___"+row).val($("#QTDOP___"+seq).val())
	$("#QTDSALDO___"+row).val($("#QTDSALDO___"+seq).val())
	$("#QTDREALIZADA___"+row).val($("#QTDREALIZADA___"+seq).val())
	$("#CUSTOPOSTO___"+row).val($("#CUSTOPOSTO___"+seq).val())
	$("#ULTIMAATVOP___"+row).val($("#ULTIMAATVOP___"+seq).val())
	$("#UNDOP___"+row).val($("#UNDOP___"+seq).val())
	$("#ATVANTERIOR___"+row).val($("#ATVANTERIOR___"+seq).val())
	$("#OP___"+row).val($("#OP___"+seq).val())
	$("#OPERACAO___"+row).val($("#OPERACAO___"+seq).val())
	$("#DSCATIVIDADE___"+row).val($("#DSCATIVIDADE___"+seq).val())
	$("#CODATIVIDADE___"+row).val($("#CODATIVIDADE___"+seq).val())
	$("#IDATIVIDADE___"+row).val($("#IDATIVIDADE___"+seq).val())
	$("#CELULA___"+row).val($("#CELULA___"+seq).val())
	$("#DATAPROGRAMADA___"+row).val($("#DATAPROGRAMADA___"+seq).val())
	$("#HORASAPONTADAS___"+row).val($("#HORASAPONTADAS___"+seq).val())
	$("#AVANCOREALIZADO___"+row).val($("#AVANCOREALIZADO___"+seq).val())
	$("#PROCESSO___"+row).val($("#PROCESSO___"+seq).val())
	$("#COMP___"+row).val($("#COMP___"+seq).val())
	$("#PERCENTUALPLANO___"+row).val($("#PERCENTUALPLANO___"+seq).val())
	$("#COPIA___"+row).val("S")
	
	console.log("percentual salvo: "+$("#PERCENTUALPLANO___"+row).val())
	
	var cod1 = $("#CODTIPO1___"+seq).val()
	var cod2 = $("#CODTIPO2___"+seq).val()
	var cod3 = $("#CODTIPO3___"+seq).val()
	var cod4 = $("#CODTIPO4___"+seq).val()
	var cod5 = $("#CODTIPO5___"+seq).val()
	
	var mySimpleCalendar4 = FLUIGC.calendar('#HORAINICIOIMPRO1___'+row, {
		pickDate: false,
	    pickTime: true
	})
	var mySimpleCalendar5 = FLUIGC.calendar('#HORAFIMIMPRO1___'+row, {
		pickDate: false,
	    pickTime: true
	})
	$("#HORAINICIOIMPRO1___"+row).prop("disabled",true)
	$("#HORAFIMIMPRO1___"+row).prop("disabled",true)
	
	var mySimpleCalendar6 = FLUIGC.calendar('#HORAINICIOIMPRO2___'+row, {
		pickDate: false,
	    pickTime: true
	})
	var mySimpleCalendar7 = FLUIGC.calendar('#HORAFIMIMPRO2___'+row, {
		pickDate: false,
	    pickTime: true
	})
	$("#HORAINICIOIMPRO2___"+row).prop("disabled",true)
	$("#HORAFIMIMPRO2___"+row).prop("disabled",true)
	
	var mySimpleCalendar8 = FLUIGC.calendar('#HORAINICIOIMPRO3___'+row, {
		pickDate: false,
	    pickTime: true
	})
	var mySimpleCalendar9 = FLUIGC.calendar('#HORAFIMIMPRO3___'+row, {
		pickDate: false,
	    pickTime: true
	})
	$("#HORAINICIOIMPRO3___"+row).prop("disabled",true)
	$("#HORAFIMIMPRO3___"+row).prop("disabled",true)
	
	var mySimpleCalendar10 = FLUIGC.calendar('#HORAINICIOIMPRO4___'+row, {
		pickDate: false,
	    pickTime: true
	})
	var mySimpleCalendar11 = FLUIGC.calendar('#HORAFIMIMPRO4___'+row, {
		pickDate: false,
	    pickTime: true
	})
	$("#HORAINICIOIMPRO4___"+row).prop("disabled",true)
	$("#HORAFIMIMPRO4___"+row).prop("disabled",true)
	
	var mySimpleCalendar12 = FLUIGC.calendar('#HORAINICIOIMPRO5___'+row, {
		pickDate: false,
	    pickTime: true
	})
	var mySimpleCalendar13 = FLUIGC.calendar('#HORAFIMIMPRO5___'+row, {
		pickDate: false,
	    pickTime: true
	})
	$("#HORAINICIOIMPRO5___"+row).prop("disabled",true)
	$("#HORAFIMIMPRO5___"+row).prop("disabled",true)
	
	/*if(!(cod1=="" || cod1==null || cod1==undefined)){
		
		$("#TIPO1___"+row).val($("#TIPO1___"+seq).val())
		$("#CODTIPO1___"+row).val($("#CODTIPO1___"+seq).val())
		$("#DESCRICAOTIPO1___"+row).val($("#DESCRICAOTIPO1___"+seq).val())
		$("#HORAINICIOIMPRO1___"+row).val($("#HORAINICIOIMPRO1___"+seq).val())
		$("#HORAFIMIMPRO1___"+row).val($("#HORAFIMIMPRO1___"+seq).val())
		
	}
	
	if(!(cod2=="" || cod2==null || cod2==undefined)){
	
		$("#TIPO2___"+row).val($("#TIPO2___"+seq).val())
		$("#CODTIPO2___"+row).val($("#CODTIPO2___"+seq).val())
		$("#DESCRICAOTIPO2___"+row).val($("#DESCRICAOTIPO2___"+seq).val())
		$("#HORAINICIOIMPRO2___"+row).val($("#HORAINICIOIMPRO2___"+seq).val())
		$("#HORAFIMIMPRO2___"+row).val($("#HORAFIMIMPRO2___"+seq).val())
		
	}
	
	if(!(cod3=="" || cod3==null || cod3==undefined)){
	
		$("#TIPO3___"+row).val($("#TIPO3___"+seq).val())
		$("#CODTIPO3___"+row).val($("#CODTIPO3___"+seq).val())
		$("#DESCRICAOTIPO3___"+row).val($("#DESCRICAOTIPO3___"+seq).val())
		$("#HORAINICIOIMPRO3___"+row).val($("#HORAINICIOIMPRO3___"+seq).val())
		$("#HORAFIMIMPRO3___"+row).val($("#HORAFIMIMPRO3___"+seq).val())
		
	}
	
	if(!(cod4=="" || cod4==null || cod4==undefined)){
		
		$("#TIPO4___"+row).val($("#TIPO4___"+seq).val())
		$("#CODTIPO4___"+row).val($("#CODTIPO4___"+seq).val())
		$("#DESCRICAOTIPO4___"+row).val($("#DESCRICAOTIPO4___"+seq).val())
		$("#HORAINICIOIMPRO4___"+row).val($("#HORAINICIOIMPRO4___"+seq).val())
		$("#HORAFIMIMPRO4___"+row).val($("#HORAFIMIMPRO4___"+seq).val())
		
	}
	
	if(!(cod5=="" || cod5==null || cod5==undefined)){
		
		$("#TIPO5___"+row).val($("#TIPO5___"+seq).val())
		$("#CODTIPO5___"+row).val($("#CODTIPO5___"+seq).val())
		$("#DESCRICAOTIPO5___"+row).val($("#DESCRICAOTIPO5___"+seq).val())
		$("#HORAINICIOIMPRO5___"+row).val($("#HORAINICIOIMPRO5___"+seq).val())
		$("#HORAFIMIMPRO5___"+row).val($("#HORAFIMIMPRO5___"+seq).val())
		
	}*/
	
	// SE É ÚLTIMA ATV DA ORDEM, HABILITA O CAMPO QTDEREALIZADA
	if($("#ULTIMAATVOP___"+seq).val()=="SIM"){
		
		$("#QTDREALIZADA___"+row).prop("readonly",false)
		
	} else {
		// SE NÃO, DESABILITA O CAMPO QTDEREALIZADA E ESCONDE O CHECKBOX
		
		$("#OPCONCLUIDA___"+row).parent("div").hide()
		$("#QTDREALIZADA___"+row).prop("readonly",true)
		
	}
	
	// ESCONDE O BOTÃO DE EXCLUIR
	$("#EXCLUIRATV___"+row).show()
	
	// COPIA OS COMPONENTES DA ATIVIDADE
	//copiaComponentes($("#SEQ___"+seq).val(),row)
	
}

// COPIA OS COMPONENTES DA ATIVIDADE
function copiaComponentes(seqAtv,novoSeqAtv){
	
	console.log("vou copiar os componentes da atividade de seq "+seqAtv)
	
	// PERCORRE A TABELA DE COMPONENTES
	$("input[id^='CODIGOCOMPG___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		var seqAtvComp = $("#SEQATV___"+seq).val()
		
		// SE COMPONENTE PERTENCE A MESMA ATIVIDADE
		if(seqAtvComp==seqAtv){
			
			console.log("vou copiar os componentes seqAtvComp "+seqAtvComp+" que pretence a seqAtv "+seqAtv)
			
			var row = addComp()
			
			// COPIA AS INFORMAÇÕES
			$("#CODIGOCOMPG___"+row).val($("#CODIGOCOMPG___"+seq).val())
			$("#DESCRICAOCOMPG___"+row).val($("#DESCRICAOCOMPG___"+seq).val())
			$("#IDPRDCOMPG___"+row).val($("#IDPRDCOMPG___"+seq).val())
			//$("#IDMOVBAIXA___"+row).val($("#IDMOVBAIXA___"+seq).val())
			$("#IDLOTECOMPG___"+row).val($("#IDLOTECOMPG___"+seq).val())
			$("#NUMLOTECOMPG___"+row).val($("#NUMLOTECOMPG___"+seq).val())
			$("#QTDECOMPG___"+row).val($("#QTDECOMPG___"+seq).val())
			$("#UNDCOMPG___"+row).val($("#UNDCOMPG___"+seq).val())
			$("#SEQATV___"+row).val(novoSeqAtv)
			$("#SEQCOMP___"+row).val($("#SEQCOMP___"+seq).val())
			$("#ESTOOQUEATUALCOMPG___"+row).val($("#ESTOOQUEATUALCOMPG___"+seq).val())
			$("#CODLOCCOMPG___"+row).val($("#CODLOCCOMPG___"+seq).val())
			$("#CUSTOMEDIOCOMPG___"+row).val($("#CUSTOMEDIOCOMPG___"+seq).val())
			
		}
		
	})
	
}

// VERIFICA  SE O AVANÇO CALCULADO É IGUAL A 100%
function verificaAvancoCalc(){
	
	// SE CHECKBOX FOI MARCADO
	if($("#PCCONCLUIDO").is(":checked")){
		
		var avancoCalc = $("#AVANCOCALCULADO").val()
		avancoCalc = parseFloat(avancoCalc)
		
		// SE O AVANÇO É MENOR QUE 100%
		if(avancoCalc<100){
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'Atenção, o avanço ainda não atingiu toda a quantidade prevista para que o PA/PC seja concluído!',
				  text: 'Verifique os apontamentos anteriores.'
			})
			
			/*FLUIGC.message.alert({
			    message: 'Atenção, o avanço ainda não atingiu toda a quantidade prevista para que o PA/PC seja concluído!',
			    title: 'Verifique os apontamentos anteriores.',
			    label: 'OK'
			});*/
			
		}
		
	}
	
}

// CALCULA O AVANCO PERCENTUAL EM RELAÇÃO A QUANTIDADE TOTAL DO PLANO
function calculaAvanco(){
	
	console.log("vou calcular o avanço")
	
	var codColigada = $("#CODCOLIGADA").val()
	var codFilial = $("#CODFILIAL").val()
	var planoCorte = $("#NUMPLANOCORTE").val()
	
	var avanco = $("#AVANCOPLANO").val()
	
	console.log("codColigada: "+codColigada+", codFilial: "+codFilial+", planoCorte: "+planoCorte)
	
	if(avanco.includes(",")){
		
		avanco = avanco.replace(",",".")
		
	}
	
	avanco = parseFloat(avanco)
	
	// SE NÃO É UM VALOR NUMÉRICO
	if(isNaN(avanco)){
		
		$("#AVANCOPLANO").val("")
		$("#AVANCOCALCULADO").val("")
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'Este não é um valor válido!',
			  text: 'Verifique e tente novamente.'
		})
		
		/*FLUIGC.message.alert({
		    message: 'Este não é um valor válido!',
		    title: 'Verifique e tente novamente.',
		    label: 'OK'
		});*/
		
	} else {
		// SE NÃO 
		
		//var saldoPlano = buscaQtdePlano(codColigada,codFilial,planoCorte)
		var saldoPlano = buscaSaldoPlano(codColigada,codFilial,planoCorte)
		
		var saldoApontado = buscaSaldoApontado(codColigada,codFilial,planoCorte)

		var avancoCalc = ( (avanco / parseFloat(saldoPlano)) * 100) + parseFloat(saldoApontado) 
		
		console.log("avancoCalc: "+avancoCalc)
		
		if((avancoCalc=="" || avancoCalc==null || avancoCalc==undefined) || isNaN(avancoCalc)){
			
			avancoCalc = 0
			
		} /*else if(avancoCalc>1){
			
			avancoCalc = 100
			
		}*/ else {
			
			//avancoCalc = avancoCalc * 100
		
		}
		
		avancoCalc = avancoCalc.toFixed(2)
		
		$("#AVANCOCALCULADO").val(avancoCalc)
		
		// DESABILITA O CHECKBOX
		$("#PCCONCLUIDO").prop("disabled",false)
		
	}
	
}

// BUSCA SALDO APONTADO
function buscaSaldoApontado(codColigada,codFilial,planoCorte){
	
	console.log("vou buscar o saldo apontado")
	
	// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
	var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("NUMPLANOCORTE",planoCorte,planoCorte,ConstraintType.MUST)

	var constraints = new Array(a1,a2,a3)
	
	//var dataset = DatasetFactory.getDataset("dsBuscaPercentualAtvOP",null,constraints,null)
	var dataset = DatasetFactory.getDataset("dsPercentualApontPAPC",null,constraints,null)
	
	var row = dataset.values
	
	var percentual = 0
	
	console.log("row")
	console.log(row)
	
	// SE RETORNO NÃO É NULO OU VAZIO 
	if(!(row=="" || row==null || row==undefined)){
		
		var rep = row[0]
		
		percentual = rep["PERCENTUAL"]
		
	}
	
	if(percentual=="" || percentual==null || percentual==undefined){
		
		percentual = 0
		
	}
	
	console.log("percentual apontado: "+rep["PERCENTUAL"])
	
	return percentual
	
}

// BUSCA QUANTIDADE DO PLANO
function buscaQtdePlano(codColigada,codFilial,planoCorte){
	
	console.log("vou buscar QtdePlano")
	
	console.log("codColigada: "+codColigada+", codFilial: "+codFilial+", planoCorte: "+planoCorte)
	
	// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
	var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("NUMPLANOCORTE",planoCorte,planoCorte,ConstraintType.MUST)

	var constraints = new Array(a1,a2,a3)
	
	var dataset = DatasetFactory.getDataset("dsPlanoCorteMP",null,constraints,null)
	var row = dataset.values
	
	console.log("row")
	console.log(row)
	
	// SE RETORNO É NULO OU VAZIO
	if(row=="" || row==undefined || row==null){
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'O Lote cadastrado no plano de corte não está disponível ou com estoque igual a 0',
			  text: 'Verifique e tente novamente.'
		})
		
		return 0
		
	} else {
		
		var rep = row[0]
		
		console.log("QtdeMP do Plano: "+rep["QTDEMP"])
		
		return rep["QTDEMP"]
			
	}
	
}

// BUSCA INFORMAÇÕES DO PLANO
function buscaInfoPlano(numPlanoCorte,dataDe,idLote,codFilial,saldoPlano){
	
	// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
	var a1 = DatasetFactory.createConstraint("NUMPLANOCORTE",numPlanoCorte,numPlanoCorte,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("DATA_DE",dataDe,dataDe,ConstraintType.MUST)
	
	var constraints = new Array(a1,a2)
	
	var dataset = DatasetFactory.getDataset("dsOperadoresPlanoCorte",null,constraints,null)
	var row = dataset.values
	
	console.log("row")
	console.log(row)
	
	// SE RETORNO NÃO É VAZIO OU NULO
	if(!(row=="" || row==undefined || row==null)){
		
		// FAZ UM RELOAD NOS LOTES DE ACORDO COM A FILIAL SELECIONADA
		reloadZoomFilterValues("LOTEMP","CODFILIAL,"+$("#CODFILIAL").val()+",CODCOLIGADA,"+$("#CODCOLIGADA").val()+",NUMPLANOCORTE,"+numPlanoCorte+",SALDOPLANO,"+saldoPlano+",IDLOTE,"+idLote)
		
		// FAZ UM RELOAD NOS RECURSOS COM A FILIAL E O PLANO SELECIONADO
		reloadZoomFilterValues("MATRICULA","NUMPLANOCORTE,"+numPlanoCorte+",DATA_DE,"+dataDe)
		
		// HABILITA O CAMPO DO LOTE DA MP
		$("#LOTEMP").prop("disabled",false)
		$("#MATRICULA").prop("disabled",false)
		
		// CARREGA O MODAL DO PLANO DE CORTE
		carregaModal(numPlanoCorte,codFilial)
		
		// SE AS ATIVIDADES DO PLANO DE CORTE JÁ TEVE APONTAMENTO
		if(temApont()){
			
			$("#TEMAPONTAMENTO").val("S")
			
			//DESABILITA O CAMPO DO LOTE DA MP
		    //$("#LOTEMP").prop("disabled",true)
			
		}
		
	} else {
		// SE NÃO
		$("#PLANOCORTE>option").remove()
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'Não há programação para a data e o plano informados',
			  text: 'Verifique e tente novamente'
		})
		
	}

}

// BUSCA SALDO DO PLANO
function buscaSaldoPlano(codColigada,codFilial,planoCorte){
	
	console.log("codColigada: "+codColigada+", codFilial: "+codFilial+", planoCorte: "+planoCorte)
	
	// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
	var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("NUMPLANOCORTE",planoCorte,planoCorte,ConstraintType.MUST)

	var constraints = new Array(a1,a2,a3)
	
	var dataset = DatasetFactory.getDataset("dsPlanoCorteMP",null,constraints,null)
	var row = dataset.values
	
	console.log("row")
	console.log(row)
	
	// SE RETORNO É NULO OU VAZIO
	if(row=="" || row==undefined || row==null){
		
		return 0
		
	} else {
		
		var rep = row[0]
		
		return rep["TOTAL_PLANO"]
			
	}
	
}

// GERA A DATA ATÉ
function geraDataAte(dataMax){
	
	console.log("dataMax: "+dataMax)
	
	dataMax = dataMax.toString().split(" ")
	
	dia = dataMax[2]
	mes = dataMax[1]
	ano = dataMax[3]
	
	if(mes=="Jan"){
		mes="01"
	}
	if(mes=="Feb"){
		mes="02"
	}
	if(mes=="Mar"){
		mes="03"
	}
	if(mes=="Apr"){
		mes="04"
	}
	if(mes=="May"){
		mes="05"
	}
	if(mes=="Jun"){
		mes="06"
	}
	if(mes=="Jul"){
		mes="07"
	}
	if(mes=="Aug"){
		mes="08"
	}
	if(mes=="Sep"){
		mes="09"
	}
	if(mes=="Oct"){
		mes="10"
	}
	if(mes=="Nov"){
		mes="11"
	}
	if(mes=="Dec"){
		mes="12"
	}
	
	var dataAte = ""+dia+"/"+mes+"/"+ano
	
	return dataAte
	
}

// GERA UMA DATA NO FORMATO DE BANCO
function geraDataBanco(str){
	
	console.log("data: "+str)
	
	str = str.toString().split(" ")
	
	dia = str[2]
	mes = str[1]
	ano = str[3]
	
	if(mes=="Jan"){
		mes="01"
	}
	if(mes=="Feb"){
		mes="02"
	}
	if(mes=="Mar"){
		mes="03"
	}
	if(mes=="Apr"){
		mes="04"
	}
	if(mes=="May"){
		mes="05"
	}
	if(mes=="Jun"){
		mes="06"
	}
	if(mes=="Jul"){
		mes="07"
	}
	if(mes=="Aug"){
		mes="08"
	}
	if(mes=="Sep"){
		mes="09"
	}
	if(mes=="Oct"){
		mes="10"
	}
	if(mes=="Nov"){
		mes="11"
	}
	if(mes=="Dec"){
		mes="12"
	}
	
	var dataNova = ""+ano+"-"+mes+"-"+dia
	
	return dataNova
	
}

// VERIFICA SE A TABELA DE APONTAMENTO TEM PELO MENOS UM INTERVALO PRODUTIVO PREENCHIDO
function temApontamento(){
	
	console.log("vou verificar se a tabela de apontamento tem pelo menos uma hora produtiva informada")
	
	var ret = false
	
	// PERCORRE OS REGISTROS DA TABELA DE APONTAMENTO DAS HORAS
	$("input[id^='CODAPONTAMENTO___']").each(function(){
	
		var seq = $(this).attr("id").split("___")[1]
		
		var horaInicio = $("#HORAINICIOAPONT___"+seq).val()
		var horaFim = $("#HORAFIMAPONT___"+seq).val()
		var codApont = $("#CODAPONTAMENTO___"+seq).val()
		
		// SE É UMA HORA PRODUTIVA
		if(codApont=="" || codApont==null || codApont==undefined){
			
			console.log("tem hora produtiva")
			
			// SE HORA INÍCIO E FIM FORAM INFORMADAS
			if(!(horaInicio=="" || horaInicio==null || horaInicio==undefined) && !(horaFim=="" || horaFim==null || horaFim==undefined)){
			
				console.log("tem horaInicio e Fim preenchidas")
				
				ret = true
				
			}
			
		}
		
	})
	
	console.log("tem  apontamento? "+ret)
	
	return ret
	
}

// SE TEM HORAS INCOMPLETAS
function temHorasIncompletas(){
	
	console.log("se todas as horas informadas estão completas")
	
	var ret = true
	
	var completas = 0
	var horas = 0
	
	// PERCORRE OS REGISTROS DA TABELA DE APONTAMENTO DAS HORAS
	$("input[id^='CODIGOAPONTAMENTO___']").each(function(){
	
		var seq = $(this).attr("id").split("___")[1]
		
		horas = horas + 1
		
		var horaInicio = $("#HORAINICIOAPONT___"+seq).val()
		var horaFim = $("#HORAFIMAPONT___"+seq).val()
		var codApont = $("#CODAPONTAMENTO___"+seq).val()
		
		// SE HORA INÍCIO E FIM FORAM INFORMADAS
		if(!(horaInicio=="" || horaInicio==null || horaInicio==undefined) && !(horaFim=="" || horaFim==null || horaFim==undefined)){
		
			completas = completas + 1
			
		}
		
	})
	
	// SE TODAS AS HORAS INFORMADAS ESTÃO COMPLETAS
	if(horas==completas){
		
		ret = false
		
	}

	console.log("tem horas incompletas? "+ret)
	
	return ret
	
}

// LIMPA TABELA DAS ATIVIDADES
function limpaAtvs(){
	
	// PERCORRE A TABELA DAS ATIVIDADES
	$("input[id^='CODIGOPRD___']").each(function(){
	
		$(this).parents("tr").remove()
		
	})
	
}

// LIMPA TABELA DOS COMPONENTES
function limpaComps(){
	
	// PERCORRE A TABELA DAS ATIVIDADES
	$("input[id^='CODIGOCOMPG___']").each(function(){
	
		$(this).parents("tr").remove()
		
	})
	
}

// REALIZA A BUSCA DO HISTÓRICO DAS ATIVIDADES PROGRAMADAS PARA O OPERADOR SELECIONADO
function buscar(){
	
	console.log("Entrei para buscar o histórico das atividades programadas para o operador selecionado")
	
		var dias = new Array()
		var codmo = $("#CODMO").val()
		//var codOrdem = $("#CODORDEM").val()
		var codFilial = $("#CODFILIAL").val()
		var dataDe = $("#DATA_DE").val()
		var dataAte = ""
		var numPlanoCorte = $("#NUMPLANOCORTE").val()
		var idLote = $("#IDLOTE").val()
		//var avanco = $("#AVANCOPLANO").val()
		var temApont = $("#TEMAPONTAMENTO").val()
		
		console.log("codmo: "+codmo+", codFilial: "+codFilial+", datade: "+dataDe+", numPlanoCorte: "+numPlanoCorte+", idLote: "+idLote+", temApont: "+temApont)
		
		var dataAux = dataDe.split("/")
		var dia = dataAux[0]
		var mes = dataAux[1]
		var ano = dataAux[2]
		
		console.log("dia: "+dia+", mes: "+mes+", ano: "+ano)
		
		var dataMax = new Date(ano,mes-1,dia)
		
		dataMax.setDate(dataMax.getDate() + 2)
		
		dataAte = geraDataAte(dataMax)
		
		// LIMPA TABELA DAS ATIVIDADES
		limpaAtvs()
		
		var myLoading2 = FLUIGC.loading(window);
	
		myLoading2.show();
		
		// ATIVA O LOAD
		setTimeout(function(){

		var entraHoras = $("#ENTRADAHORAS").val()
							
		
		// SE NÃO TEM HORAS INCOMPLETAS
		if(!(temHorasIncompletas())){

			
			console.log("todas as horas estão completas")
			
			console.log("temApont: "+temApont)
			
			var temApont = $("#TEMAPONTAMENTO").val()
			
			console.log("temApont: "+temApont)
			
			// SE JÁ TEVE APONTAMENTO 
			if(temApont=="S"){
				
				console.log("já teve apontamento")
				
				// SE CAMPOS OBRIGATÓRIOS FORAM PREENCHIDOS E TEM HORAS APONTADAS NA TABELA
				if( !( (codmo=="" || codmo==null || codmo==undefined) || (codFilial=="" || codFilial==null || codFilial==undefined)
						|| (dataDe=="" || dataDe==null || dataDe==undefined) || (numPlanoCorte=="" || numPlanoCorte==null || numPlanoCorte==undefined)
						/*|| (avanco=="" || avanco==null || avanco==undefined)*/ ) /*&& temApontamento()*/ ){
				
					console.log("campos obrigatórios preenchidos")
					
					// FORMATA A DATA PREENCHIDA NO PADRÃO PARA O BANCO
					dataDe = formataDataBanco(dataDe)
					dataAte = formataDataBanco(dataAte)
		
					console.log("codmo: "+codmo+", codFilial: "+codFilial+", dataDe: "+dataDe+", dataAte: "+dataAte+", numPlanoCorte: "+numPlanoCorte+", idLote: "+idLote)
					
					//var myLoading2 = FLUIGC.loading(window);
				
						// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
						var a1 = DatasetFactory.createConstraint("CODMO",codmo,codmo,ConstraintType.MUST)
						var a2 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
						var a3 = DatasetFactory.createConstraint("NUMPLANOCORTE",numPlanoCorte,numPlanoCorte,ConstraintType.MUST)
						var a4 = DatasetFactory.createConstraint("DATA_DE",dataDe,dataDe,ConstraintType.MUST)
						//var a5 = DatasetFactory.createConstraint("DATA_ATE",dataAte,dataAte,ConstraintType.MUST)
						
						var constraints = new Array(a1,a2,a3,a4)
						
						var dataset = DatasetFactory.getDataset("dsBuscaHistAtvProgOpePAPC",null,constraints,null)
						var row = dataset.values
						
						console.log("row")
						console.log(row)
						
						// SE RETORNO NÃO É NULO OU VAZIO
						if(!(row=="" || row==null || row==undefined || row=="null")){
							
							var count = row.length
							
							// PERCORRE TODOS OS REGISTROS DO RETORNO DA CONSULTA
							for(var i=0; i<count; i++){
							
								var rep = row[i]
								
								var codOrdem = rep["OP"]
								var idAtvOrdem = rep["IDATVORDEM"]
								
								// SE TEM QTDE FABRICADA PARA A ATIVIDADE DA OP
								if(temQtdeFabricada(codOrdem,idAtvOrdem)){
									
									// ADICIONA UMA LINHA NA TABELA DE ATIVIDADES
									var seq = addAtv()
									
									// SALVA OS REGISTROS NOS CAMPOS DA TABELA 
									$("#CODCOLIGADAATV___"+seq).val(rep["CODCOLIGADA"])
									$("#CODFILIALATV___"+seq).val(rep["CODFILIAL"])
									$("#CODESTRUTURAATV___"+seq).val(rep["CODESTRUTURA"])
									$("#OSATV___"+seq).val(rep["OS"])
									$("#SEQ___"+seq).val(seq)
									$("#IDPRJATV___"+seq).val(rep["IDPRJ"])
									$("#DESCRICAO___"+seq).val(rep["DSCITEM"])
									$("#CODIGOPRD___"+seq).val(rep["CODIGOPRD"])
									$("#IDPRD___"+seq).val(rep["IDPRD"])
									$("#UNDOP___"+seq).val(rep["CODUNDCONTROLE"])
									$("#OP___"+seq).val(rep["OP"])
									$("#OPERACAO___"+seq).val(rep["PRIORIDADE"])
									$("#DSCATIVIDADE___"+seq).val(rep["DSCATIVIDADE"])
									$("#CODATIVIDADE___"+seq).val(rep["CODATIVIDADE"])
									$("#CELULA___"+seq).val(rep["CELULA"])
									//$("#DATAPROGRAMADA___"+seq).val(formataData(rep["DATA_PROGRAMADA"]))
									$("#PROCESSO___"+seq).val(rep["DETALHE"])
									$("#IDATIVIDADE___"+seq).val(rep["IDATVORDEM"])
									$("#AVANCOREALIZADO___"+seq).val(rep["AVANCO_REALIZADO"])
									$("#CUSTOPOSTO___"+seq).val(rep["CUSTO_POSTO"])
									$("#CODSUCATA___"+seq).val(rep["CODSUCATA"])
									$("#TOTALSUCATA___"+seq).val(rep["QTDESUCATA"])
									$("#QTDESUCATA___"+seq).val(rep["QTDESUCATA"])
									$("#IDATVORDEMPROGRAMACAO___"+seq).val(rep["IDATVORDEMPROGRAMACAO"])
									
									// BUSCA O AVANCO CALCULADO
									var avanco = buscaAvancoAtvOp(rep["OP"],rep["IDATVORDEM"])
									
									//$("#AVANCO___"+seq).val($("#AVANCOCALCULADO").val())
									$("#AVANCO___"+seq).val(avanco)
									
									if(!(rep["TEM_APONTAMENTO"]=="" || rep["TEM_APONTAMENTO"]==null || rep["TEM_APONTAMENTO"]==undefined || rep["TEM_APONTAMENTO"]=="null")){
										$("#HORASAPONTADAS___"+seq).val(rep["TEM_APONTAMENTO"].toString().replace(".",","))	
									}
									
									if(!(rep["QTDEPLANEJADA"]=="" || rep["QTDEPLANEJADA"]==null || rep["QTDEPLANEJADA"]==undefined || rep["QTDEPLANEJADA"]=="null")){
										$("#QTDOP___"+seq).val(rep["QTDEPLANEJADA"].toString().replace(".",","))
									}
									
									/*if(!(rep["ALOCADO"]=="" || rep["ALOCADO"]==null || rep["ALOCADO"]==undefined || rep["ALOCADO"]=="null")){
										$("#SALDOPROGRAMADO___"+seq).val(rep["ALOCADO"].toString().replace(".",","))
									}
									
									if(!(rep["SALDO"]=="" || rep["SALDO"]==null || rep["SALDO"]==undefined || rep["SALDO"]=="null")){
										$("#QTDSALDO___"+seq).val(rep["SALDO"].toString().replace(".",","))
									}*/
									
									// SE EXISTE PRIORIDADE ANTERIOR
									$("#ATVANTERIOR___"+seq).val(rep["ATV_ANTERIOR"])
									
									/*if(!(rep["PRIORIDADE_ANTERIOR"]=="" || rep["PRIORIDADE_ANTERIOR"]==null || rep["PRIORIDADE_ANTERIOR"]==undefined || rep["PRIORIDADE_ANTERIOR"]==0)){
										
										$("#ATVANTERIOR___"+seq).val(rep["PRIORIDADE_ANTERIOR"])
										
									} else {
										// SE NÃO 
										
										$("#ATVANTERIOR___"+seq).val(" - ")
										
									}*/
									
									// SE FORNPARA FOI PREENCHIDO
									if(!(rep["FORNPARA"]=="" || rep["FORNPARA"]==null || rep["FORNPARA"]==undefined)){
										
										$("#FORNPARA___"+seq).val(rep["FORNPARA"])
										
									} else {
										// SE NÃO
										
										$("#FORNPARA___"+seq).val(" - ")
										
									}
									
									// SE É A ULTIMA ATIVIDADE DA OP, MOSTRA O CHECKBOX E DESABILITA A QTD REALIZADA
									if(rep["ATV_POSTERIOR"]=="ULTIMA"){
										
										$("#OPCONCLUIDA___"+seq).parent("div").show()
										$("#QTDREALIZADA___"+seq).prop("readonly",false)
										$("#ULTIMAATVOP___"+seq).val("SIM")
										
									} else {
										// SE NÃO É A ULTIMA ATIVIDADE DA OP, ESCONDE O CHECKBOX E DESABILITA O CAMPO DA QTDE REALIZADA
										
										console.log("não é a ultima atividade da ordem, vou esconder checkbox")
										
										$("#OPCONCLUIDA___"+seq).parent("div").hide()
										$("#QTDREALIZADA___"+seq).prop("readonly",true)
										
										// SE APONTAMENTO JÁ FOI REALIZADO
										if(!(rep["APONTADO"]=="" || rep["APONTADO"]==null || rep["APONTADO"]==undefined || rep["APONTADO"]=="null")){
											
											console.log("tem apontamento, vou preencher as horas apontadas: "+rep["APONTADO"])
											
											var apontamento = rep["APONTADO"].toString().replace(".",",")
											
											console.log("após replace: "+apontamento+" e seq "+seq)
											
											$("#QTDREALIZADA___"+seq).val(apontamento)
											
										}
										
									}
									
									// SE DIA AINDA NÃO FOI SALVO
									/*if(!(dias.includes(rep["DATA_PROGRAMADA"]))){
										dias.push(rep["DATA_PROGRAMADA"])
									}*/
									
									var avancoRealizado = rep["AVANCO_REALIZADO"]
									
									// SE ATIVIDADE JÁ FOI APONTADA NESSE DIA PARA ESSE RECURSO
									/*if(avancoRealizado>0){
										
										
										
									}else{
										
										
									}*/
									
									// BUSCA COMPONENTES DA ATIVIDADE
									//buscaComponentesAtv(seq)
									
									// VERIFICA SE JÁ HOUVE APONTAMENTO PARA AS ATIVIDADES PROGRAMADAS
									verificaApontAtv(seq,rep["TEM_APONTAMENTO"])
									
									// VERIFICA SE TODOS OS COMPONENTES VINCULADOS NA ATIVIDADE TEM SALDO
									//verificaComponentes(seq)

									
								}
																
							}
							
							// ESCONDE CAMPOS DOS FILTROS
							$(".filtros").hide()
							reduzirFiltro()
							
							// MOSTRA OS CAMPOS DA TABELA
							$(".ITENS_INFO").show()
							
							console.log("dias")
							console.log(dias)
						
							// LIMPA A ABA DOS DIAS
							limpaAbasDias()
							
							// CONSTRÓI OS DIAS PARA SEREM SELECIONADOS COMO ABAS
							constroiAbasDias()
							
							// PREENCHE PERCENTUAL DAS ATIVIDADES
							preenchePercentual()
							
							var temApont = $("#TEMAPONTAMENTO").val()
							    
						    // SE VAI BAIXAR MATERIAL
						    if(Number(entraHoras)==0){
						    	
						    	// PREENCHE A TABELA DE COMPONENTES
								preencheComponentes()
								
						    }
							
							// PREENCHE TODAS AS ATIVIDADES COM AS HORAS LANÇADAS
						    preencheAtividadesHoras()
						    
							// SE EXISTEM APONTAMENTOS QUE JÁ FORAM APONTADOS (DUPLICIDADE)
							if(duplicidadeApontamento()){
								
								// APAGA AS TABELAS
								apagaTabelaAtividades()
								apagaTabelaComponentes()
								limpaAbasDias()
								
								// MOSTRA CAMPOS DOS FILTROS
								$(".filtros").show()
								expandirFiltro()
							
								// ESCONDE OS CAMPOS DA TABELA
								$(".ITENS_INFO").hide()

								if(Number(entraHoras)==1){

									desfazSimulacaoOPs()
						
								}
								
								return false
								
							} else {
								// SE NÃO 
								
								console.log("VOU RETORNAR true")
								
								// BUSCA E SALVA O SEQ ATV NA TABELA DO MODAL
								salvaSeqAtv()
								
								// SETA CAMPO PARA CONTROLE DO EXCLUSIVO DO WORKFLOW
								$("#EXCLUSIVO1").val("FINALIZAR");
								
								// HABILITA O CAMPO DO LOTE DA MP
								$("#LOTEMP").prop("disabled",false)
								$("#MATRICULA").prop("disabled",false)
								$("#AVANCOPLANO").prop("disabled",false)
								$("#PCCONCLUIDO").prop("disabled",false)

								if(Number(entraHoras)==1){

									desfazSimulacaoOPs()
						
								}

								
								console.log("VOU MOVIMENTAR A SOLICITAÇÃO NOVAMENTE")
								
								
								// SIMULA O CLICK NO BOTÃO ENVIAR DA SOLICITAÇÃO
							    $("#workflowActions > button:first-child", window.parent.document).click();
								
								myLoading2.hide();
								
								myLoading2.hide();
								
								return true
								
							}
							
						} else {
						// SE NÃO

							if(Number(entraHoras)==1){

								desfazSimulacaoOPs()
					
							}
							
							myLoading2.hide();
							
							// EXIBE ALERTA
							Swal.fire({
								  icon: 'error',
								  title: 'Não foram localizados registros para serem apontados',
								  text: 'Verifique os filtros preenchidos e tente novamente.'
							})
							
							/*FLUIGC.message.alert({
							    message: 'Não foram localizados registros para serem apontados',
							    title: 'Verifique os filtros preenchidos e tente novamente.',
							    label: 'OK'
							});*/
							
							return false
							
						}
						
					//},500)
					
				} else {
					// SE NÃO

					if(Number(entraHoras)==1){

						desfazSimulacaoOPs()
			
					}
					
					myLoading2.hide()
					
					// EXIBE ALERTA
					Swal.fire({
						  icon: 'error',
						  title: 'Os campos obrigatórios não foram preenchidos',
						  text: 'Verifique e tente novamente.'
					})
		
					/*FLUIGC.message.alert({
					    message: 'Os campos obrigatórios não foram preenchidos',
					    title: 'Verifique e tente novamente.',
					    label: 'OK'
					});*/
					
					return false
					
				}
				
			} else {
				// SE NÃO
				
				console.log("não teve apontamento ainda")
				
				// SE CAMPOS OBRIGATÓRIOS FORAM PREENCHIDOS E TEM HORAS APONTADAS NA TABELA
				if( !( (codmo=="" || codmo==null || codmo==undefined) || (codFilial=="" || codFilial==null || codFilial==undefined)
						|| (dataDe=="" || dataDe==null || dataDe==undefined) || (numPlanoCorte=="" || numPlanoCorte==null || numPlanoCorte==undefined)
						|| (idLote=="" || idLote==null || idLote==undefined) /*|| (avanco=="" || avanco==null || avanco==undefined)*/ ) /*&& temApontamento()*/ ){
					
					
					console.log("campos obrigatórios preenchidos")
					
					// FORMATA A DATA PREENCHIDA NO PADRÃO PARA O BANCO
					dataDe = formataDataBanco(dataDe)
					dataAte = formataDataBanco(dataAte)
		
					console.log("codmo: "+codmo+", codFilial: "+codFilial+", dataDe: "+dataDe+", dataAte: "+dataAte+", numPlanoCorte: "+numPlanoCorte+", idLote: "+idLote)
					
					//var myLoading2 = FLUIGC.loading(window);
				
						// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
						var a1 = DatasetFactory.createConstraint("CODMO",codmo,codmo,ConstraintType.MUST)
						var a2 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
						var a3 = DatasetFactory.createConstraint("NUMPLANOCORTE",numPlanoCorte,numPlanoCorte,ConstraintType.MUST)
						var a4 = DatasetFactory.createConstraint("DATA_DE",dataDe,dataDe,ConstraintType.MUST)
						//var a5 = DatasetFactory.createConstraint("DATA_ATE",dataAte,dataAte,ConstraintType.MUST)
						
						var constraints = new Array(a1,a2,a3,a4)
						
						var dataset = DatasetFactory.getDataset("dsBuscaHistAtvProgOpePAPC",null,constraints,null)
						var row = dataset.values
						
						console.log("row")
						console.log(row)
						
						// SE RETORNO NÃO É NULO OU VAZIO
						if(!(row=="" || row==null || row==undefined || row=="null")){
							
							var count = row.length
							
							// PERCORRE TODOS OS REGISTROS DO RETORNO DA CONSULTA
							for(var i=0; i<count; i++){
							
								var rep = row[i]
								
								var codOrdem = rep["OP"]
								var idAtvOrdem = rep["IDATVORDEM"]
								
								// SE TEM QTDE FABRICADA PARA A ATIVIDADE DA OP
								if(temQtdeFabricada(codOrdem,idAtvOrdem)){
									
									// ADICIONA UMA LINHA NA TABELA DE ATIVIDADES
									var seq = addAtv()
									
									// SALVA OS REGISTROS NOS CAMPOS DA TABELA 
									$("#CODCOLIGADAATV___"+seq).val(rep["CODCOLIGADA"])
									$("#CODFILIALATV___"+seq).val(rep["CODFILIAL"])
									$("#CODESTRUTURAATV___"+seq).val(rep["CODESTRUTURA"])
									$("#OSATV___"+seq).val(rep["OS"])
									$("#SEQ___"+seq).val(seq)
									$("#IDPRJATV___"+seq).val(rep["IDPRJ"])
									$("#DESCRICAO___"+seq).val(rep["DSCITEM"])
									$("#CODIGOPRD___"+seq).val(rep["CODIGOPRD"])
									$("#IDPRD___"+seq).val(rep["IDPRD"])
									$("#UNDOP___"+seq).val(rep["CODUNDCONTROLE"])
									$("#OP___"+seq).val(rep["OP"])
									$("#OPERACAO___"+seq).val(rep["PRIORIDADE"])
									$("#DSCATIVIDADE___"+seq).val(rep["DSCATIVIDADE"])
									$("#CODATIVIDADE___"+seq).val(rep["CODATIVIDADE"])
									$("#CELULA___"+seq).val(rep["CELULA"])
									//$("#DATAPROGRAMADA___"+seq).val(formataData(rep["DATA_PROGRAMADA"]))
									$("#PROCESSO___"+seq).val(rep["DETALHE"])
									$("#IDATIVIDADE___"+seq).val(rep["IDATVORDEM"])
									$("#AVANCOREALIZADO___"+seq).val(rep["AVANCO_REALIZADO"])
									$("#CUSTOPOSTO___"+seq).val(rep["CUSTO_POSTO"])
									$("#CODSUCATA___"+seq).val(rep["CODSUCATA"])
									$("#TOTALSUCATA___"+seq).val(rep["QTDESUCATA"])
									$("#QTDESUCATA___"+seq).val(rep["QTDESUCATA"])
									$("#IDATVORDEMPROGRAMACAO___"+seq).val(rep["IDATVORDEMPROGRAMACAO"])
									
									// BUSCA O AVANCO CALCULADO
									var avanco = buscaAvancoAtvOp(rep["OP"],rep["IDATVORDEM"])
									
									//$("#AVANCO___"+seq).val($("#AVANCOCALCULADO").val())
									$("#AVANCO___"+seq).val(avanco)
									
									if(!(rep["TEM_APONTAMENTO"]=="" || rep["TEM_APONTAMENTO"]==null || rep["TEM_APONTAMENTO"]==undefined || rep["TEM_APONTAMENTO"]=="null")){
										$("#HORASAPONTADAS___"+seq).val(rep["TEM_APONTAMENTO"].toString().replace(".",","))	
									}
									
									if(!(rep["QTDEPLANEJADA"]=="" || rep["QTDEPLANEJADA"]==null || rep["QTDEPLANEJADA"]==undefined || rep["QTDEPLANEJADA"]=="null")){
										$("#QTDOP___"+seq).val(rep["QTDEPLANEJADA"].toString().replace(".",","))
									}
									
									/*if(!(rep["ALOCADO"]=="" || rep["ALOCADO"]==null || rep["ALOCADO"]==undefined || rep["ALOCADO"]=="null")){
										$("#SALDOPROGRAMADO___"+seq).val(rep["ALOCADO"].toString().replace(".",","))
									}
									
									if(!(rep["SALDO"]=="" || rep["SALDO"]==null || rep["SALDO"]==undefined || rep["SALDO"]=="null")){
										$("#QTDSALDO___"+seq).val(rep["SALDO"].toString().replace(".",","))
									}*/
									
									// SE EXISTE PRIORIDADE ANTERIOR
									$("#ATVANTERIOR___"+seq).val(rep["ATV_ANTERIOR"])
									
									/*if(!(rep["PRIORIDADE_ANTERIOR"]=="" || rep["PRIORIDADE_ANTERIOR"]==null || rep["PRIORIDADE_ANTERIOR"]==undefined || rep["PRIORIDADE_ANTERIOR"]==0)){
										
										$("#ATVANTERIOR___"+seq).val(rep["PRIORIDADE_ANTERIOR"])
										
									} else {
										
										// SE NÃO 
										$("#ATVANTERIOR___"+seq).val(" - ")
										
									}*/
									
									// SE FORNPARA FOI PREENCHIDO
									if(!(rep["FORNPARA"]=="" || rep["FORNPARA"]==null || rep["FORNPARA"]==undefined)){
										
										$("#FORNPARA___"+seq).val(rep["FORNPARA"])
										
									} else {

										// SE NÃO
										$("#FORNPARA___"+seq).val(" - ")
										
									}
									
									// SE É A ULTIMA ATIVIDADE DA OP, MOSTRA O CHECKBOX E DESABILITA A QTD REALIZADA
									if(rep["ATV_POSTERIOR"]=="ULTIMA"){
										
										$("#OPCONCLUIDA___"+seq).parent("div").show()
										$("#QTDREALIZADA___"+seq).prop("readonly",false)
										$("#ULTIMAATVOP___"+seq).val("SIM")
										
									} else {
										// SE NÃO É A ULTIMA ATIVIDADE DA OP, ESCONDE O CHECKBOX E DESABILITA O CAMPO DA QTDE REALIZADA
										
										console.log("não é a ultima atividade da ordem, vou esconder checkbox")
										
										$("#OPCONCLUIDA___"+seq).parent("div").hide()
										$("#QTDREALIZADA___"+seq).prop("readonly",true)
										
										// SE APONTAMENTO JÁ FOI REALIZADO
										if(!(rep["APONTADO"]=="" || rep["APONTADO"]==null || rep["APONTADO"]==undefined || rep["APONTADO"]=="null")){
											
											console.log("tem apontamento, vou preencher as horas apontadas: "+rep["APONTADO"])
											
											var apontamento = rep["APONTADO"].toString().replace(".",",")
											
											console.log("após replace: "+apontamento+" e seq "+seq)
											
											$("#QTDREALIZADA___"+seq).val(apontamento)
											
										}
										
									}
									
									// SE DIA AINDA NÃO FOI SALVO
									/*if(!(dias.includes(rep["DATA_PROGRAMADA"]))){
										dias.push(rep["DATA_PROGRAMADA"])
									}*/
									
									var avancoRealizado = rep["AVANCO_REALIZADO"]
									
									// SE ATIVIDADE JÁ FOI APONTADA NESSE DIA PARA ESSE RECURSO
									/*if(avancoRealizado>0){
										
										
										
									}else{
										
										
									}*/
									
									// BUSCA COMPONENTES DA ATIVIDADE
									//buscaComponentesAtv(seq)
									
									// VERIFICA SE JÁ HOUVE APONTAMENTO PARA AS ATIVIDADES PROGRAMADAS
									verificaApontAtv(seq,rep["TEM_APONTAMENTO"])
									
									// VERIFICA SE TODOS OS COMPONENTES VINCULADOS NA ATIVIDADE TEM SALDO
									//verificaComponentes(seq)
							
								}
										
							}
							
							// ESCONDE CAMPOS DOS FILTROS
							$(".filtros").hide()
							reduzirFiltro()
							
							// MOSTRA OS CAMPOS DA TABELA
							$(".ITENS_INFO").show()
							
							console.log("dias")
							console.log(dias)
						
							// LIMPA A ABA DOS DIAS
							limpaAbasDias()
							
							// CONSTRÓI OS DIAS PARA SEREM SELECIONADOS COMO ABAS
							constroiAbasDias()
							
							// PREENCHE PERCENTUAL DAS ATIVIDADES
							preenchePercentual()
							
							var temApont = $("#TEMAPONTAMENTO").val()
							    
						    // SE VAI BAIXAR MATERIAL
						    if(Number(entraHoras)==0){
						    	
						    	// PREENCHE A TABELA DE COMPONENTES
								preencheComponentes()
								
						    }
							
							// PREENCHE TODAS AS ATIVIDADES COM AS HORAS LANÇADAS
						    preencheAtividadesHoras()
						  
							// SE EXISTEM APONTAMENTOS QUE JÁ FORAM APONTADOS (DUPLICIDADE)
							if(duplicidadeApontamento()){
								
								// APAGA AS TABELAS
								apagaTabelaAtividades()
								apagaTabelaComponentes()
								limpaAbasDias()
								
								// MOSTRA CAMPOS DOS FILTROS
								$(".filtros").show()
								expandirFiltro()
							
								// ESCONDE OS CAMPOS DA TABELA
								$(".ITENS_INFO").hide()
								
								return false
								
							} else {
								// SE NÃO 
								
								console.log("VOU RETORNAR true")
												
								// BUSCA E SALVA O SEQ ATV NA TABELA DO MODAL
								salvaSeqAtv()
								
								// SETA CAMPO PARA CONTROLE DO EXCLUSIVO DO WORKFLOW
								$("#EXCLUSIVO1").val("FINALIZAR");
								
								// HABILITA O CAMPO DO LOTE DA MP
								$("#LOTEMP").prop("disabled",false)
								$("#MATRICULA").prop("disabled",false)
								$("#AVANCOPLANO").prop("disabled",false)
								$("#PCCONCLUIDO").prop("disabled",false)
								
								console.log("VOU MOVIMENTAR A SOLICITAÇÃO NOVAMENTE")

								if(Number(entraHoras)==1){

									desfazSimulacaoOPs()
						
								}
								
								myLoading2.hide();
								
								// SIMULA O CLICK NO BOTÃO ENVIAR DA SOLICITAÇÃO
							    $("#workflowActions > button:first-child", window.parent.document).click();
								
								myLoading2.hide();
								
								return true
								
							}
							
						} else {
						// SE NÃO
							
							if(Number(entraHoras)==1){

								desfazSimulacaoOPs()
					
							}

							myLoading2.hide();
							
							// EXIBE ALERTA
							Swal.fire({
								  icon: 'error',
								  title: 'Não foram localizados registros para serem apontados',
								  text: 'Verifique os filtros preenchidos e tente novamente.'
							})
							
							/*FLUIGC.message.alert({
							    message: 'Não foram localizados registros para serem apontados',
							    title: 'Verifique os filtros preenchidos e tente novamente.',
							    label: 'OK'
							});*/
							
							return false
							
						}
						
					//},500)
					
				} else {
					// SE NÃO

					if(Number(entraHoras)==1){

						desfazSimulacaoOPs()
			
					}
					
					myLoading2.hide()
					
					// EXIBE ALERTA
					Swal.fire({
						  icon: 'error',
						  title: 'Os campos obrigatórios não foram preenchidos',
						  text: 'Verifique e tente novamente.'
					})
		
					/*FLUIGC.message.alert({
					    message: 'Os campos obrigatórios não foram preenchidos',
					    title: 'Verifique e tente novamente.',
					    label: 'OK'
					});*/
					
					return false
					
				}
				
			}
			
		} else {
			// SE NÃO

			if(Number(entraHoras)==1){

				desfazSimulacaoOPs()
	
			}
			
			myLoading2.hide()
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'Há campos obrigatórios não preenchidos na tabela de Horas Apontadas',
				  text: 'Verifique e tente novamente.'
			})
			
			/*FLUIGC.message.alert({
			    message: 'Há campos obrigatórios não preenchidos na tabela de Horas Apontadas',
			    title: 'Verifique e tente novamente.',
			    label: 'OK'
			});*/
			
			return false
			
		}
		
		},500)
		
		// DESATIVA O LOAD
		/*setTimeout(function(){
			
			myLoading2.hide()
			
		},500)*/
		
	//},200)
	
}

// APAGA A TABELA DAS ATIVIDADES
function apagaTabelaAtividades(){
	
	// PERCORRE TODAS OS REGISTROS DA TABELA DAS ATIVIDADES
	$("input[id^='CODIGOPRD___']").each(function(){
		
		$(this).parents("tr").remove()
		
	})
	
}

// APAGA A TABELA DOS COMPONENTES
function apagaTabelaComponentes(){
	
	// PERCORRE TODAS OS REGISTROS DA TABELA DAS ATIVIDADES
	$("input[id^='CODIGOCOMPG___']").each(function(){
		
		$(this).parents("tr").remove()
		
	})
	
}

// VERIFICA SE AS ATIVIDADES DO PLANO DE CORTE JÁ TEVE APONTAMENTO
function temApont(){
	
	var ret = false
	
	var numPlanoCorte = $("#NUMPLANOCORTE").val()
	
	var a1 = DatasetFactory.createConstraint("NUMPLANOCORTE",numPlanoCorte,numPlanoCorte,ConstraintType.MUST)
	
	var constraints = new Array(a1)
	
	var dataset = DatasetFactory.getDataset("dsTemApontPAPC",null,constraints,null)
	var row = dataset.values
	
	// SE RETORNO NÃO É NULO OU VAZIO
	if(!(row=="" || row==null || row==undefined)){
		
		ret = true
		
	}
	
	return ret
		
}

// VERIFICA SE O PLANO DE CORTE JÀ FOI TOTALMENTE APONTADO
function PlanoConcluido(){
	
	var ret = false
	
	var numPlanoCorte = $("#NUMPLANOCORTE").val()
	
	var a1 = DatasetFactory.createConstraint("NUMPLANOCORTE",numPlanoCorte,numPlanoCorte,ConstraintType.MUST)
	
	var constraints = new Array(a1)
	
	var dataset = DatasetFactory.getDataset("dsConcluidoPAPC",null,constraints,null)
	var row = dataset.values
	
	// SE RETORNO É NULO OU VAZIO
	if(row=="" || row==null || row==undefined){
		
		ret = true
		
	}
	
	return ret
		
}

function PlanoComOpsAbertas(){
	
	var ret = false
	
	var numPlanoCorte = $("#NUMPLANOCORTE").val()
	
	var a1 = DatasetFactory.createConstraint("NUMPLANOCORTE",numPlanoCorte,numPlanoCorte,ConstraintType.MUST)
	
	var constraints = new Array(a1)
	
	var dataset = DatasetFactory.getDataset("dsOpsConcluidasPAPC",null,constraints,null)
	var row = dataset.values
	
	// SE RETORNO NÃO É NULO OU VAZIO
	if(row!="" && row!=null && row!=undefined){
		
		ret = true
		
	}
	
	return ret
		
}

// PREENCHE PERCENTUAL DAS ATIVIDADES
function preenchePercentual(){
	
	console.log("preenche percentual")
	
	var numPlanoCorte = $("#NUMPLANOCORTE").val()
	
	var a1 = DatasetFactory.createConstraint("NUMPLANOCORTE",numPlanoCorte,numPlanoCorte,ConstraintType.MUST)
	
	var constraints = new Array(a1)
	
	var dataset = DatasetFactory.getDataset("dsPercentualAtvPAPC",null,constraints,null)
	var row = dataset.values
	
	var percentual = new Array()
	
	// PERCORRE TODOS OS REGISTROS DO DATASET
	for(var i=0; i<row.length; i++){
		
		var rep = row[i]
		
		// PREENCHE O PERCENTUAL DAS ATIVIDADES  
		$("input[id^='CODIGOPRD___']").each(function(){
			
			var seq = $(this).attr("id").split("___")[1]
			
			// SE É A MESMA ATIVIDADE E OP
			if(rep["IDATVORDEM"]==$("#IDATIVIDADE___"+seq).val() && rep["CODORDEM"]==$("#OP___"+seq).val()){
				
				// SE É O ÚLTIMO ITEM DO RETORNO
				if(i+1==row.length){
					
					var soma = 0
					
					for(var j=0; j<percentual.length; j++){
						
						soma = soma + parseFloat(percentual[j])
						
					}
					
					console.log("soma: "+soma)
					
					var total = 100 - soma
					
					console.log("percentual da linha "+i+" é "+total)
					
					// SALVA O PERCENTUAL
					$("#PERCENTUALPLANO___"+seq).val(total)
					
				} else{
					
					// SALVA O PERCENTUAL
					$("#PERCENTUALPLANO___"+seq).val(rep["PERCENTUAL"])
					
					console.log("percentual da linha "+i+" é "+rep["PERCENTUAL"])
					
					percentual.push(parseFloat(rep["PERCENTUAL"]))
					
				}
				
			}			
			
		})
		
	}
	
}

// VERIFICA SE JÁ HOUVE APONTAMENTO PARA AS ATIVIDADES PROGRAMADAS
function verificaApontAtv(seq,temApontamento){
	
	// SE TEVE APONTAMENTO
	if(!(temApontamento==0)){
		
		$("#QTDREALIZADA___"+seq).prop("readonly",true)
		$("#SALDOTRABALHADO___"+seq).prop("readonly",true)
		$("#AVANCO___"+seq).prop("readonly",true)
		
		$("#COMP___"+seq).val("D")
		
		$("#EXPANSOR___"+seq).parent("div").append("<span class='MSG'>&emsp;Esta atividade já foi apontada neste dia. Verifique a necessidade de reprogramação.</span>")
		
	}
	
}

// VERIFICA SE O AVANCO É MENOR QUE O AVANÇO REALIZADO
function verificaAvanco(obj){
	
	var seq = $(this).attr("id").split("___")[1]
	
	var avanco = $("#AVANCO___"+seq).val()
	
	avanco = parseInt(avanco)
	
	var avancoRealizado = $("#AVANCOREALIZADO___"+seq).val()
	
	if(avancoRealizado=="" || avancoRealizado==undefined || avancoRealizado==null){
		
		avancoRealizado = 0
		
	} else {
		
		avancoRealizado = parseFloat(avancoRealizado)
		
	}
	
	console.log("avanco: "+avanco+", avancoRealizado: "+avancoRealizado)
	
	if(avanco<=avancoRealizado){
		
		console.log("avanco preenchido é menor ou igual que o realizado")
		
		$(obj).val("")
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'O valor do avanço não pode ser menor ou igual ao avanço realizado',
			  text: 'Verifique e tente novamente.'
		})
		
		/*FLUIGC.message.alert({
		    message: 'O valor do avanço não pode ser menor ou igual ao avanço realizado',
		    title: 'Verifique e tente novamente.',
		    label: 'OK'
		})*/
	
	}
	
}

// VERIFICA A QUANTIDADE REALIZADA, FORMATA O VALOR E VERIFICA SE ULTRAPASSOU O SALDO
function verificaQtdRalizada(obj){
	
	var qtdReal = $(obj).val()
	var seq = $(obj).attr("id").split("___")[1]
	
	// SE QTDE REAL TEM ","
	if(qtdReal.includes(",")){
		
		qtdReal = qtdReal.replace(",",".")
		
	}
	
	console.log("qtdReal: "+qtdReal)
	
	// SE NÃO É UM VALOR NUMÉRICO VÁLIDO
	if(isNaN(qtdReal)){

		console.log("Não é um valor válido")
		
		$(obj).val("")
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'O valor informado não é um valor válido',
			  text: 'Verifique e tente novamente.'
		})
		
		/*FLUIGC.message.alert({
		    message: 'O valor informado não é um valor válido',
		    title: 'Verifique e tente novamente.',
		    label: 'OK'
		});*/
	
	} else{
		
		console.log("é um valor válido")
		
		qtdReal = parseFloat(qtdReal)
		
		var qtdSaldo = $("#QTDSALDO___"+seq).val()
		
		// SE QTD SALDO TEM ","
		if(qtdSaldo.includes(",")){
			
			qtdSaldo = qtdSaldo.replace(",",".")
			
		}
		
		qtdSaldo = parseFloat(qtdSaldo)
		
		// SE QTD REAL É MAIOR QUE O SALDO
		if(qtdReal>qtdSaldo){
			
			console.log("qtdReal é maior que o saldo")
			
			$(obj).val("")
		
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'A quantidade informada ultrapassou o saldo',
				  text: 'Verifique e tente novamente.'
			})
			
			/*FLUIGC.message.alert({
			    message: 'A quantidade informada ultrapassou o saldo',
			    title: 'Verifique e tente novamente.',
			    label: 'OK'
			});*/
			
		} else {
			// SE NÃO
			
			console.log("qtdReal não é maior que o saldo")
			
			qtdReal = qtdReal.toString().replace(".",",")
			
			$(obj).val(qtdReal)
			
		}
		
	}
		
}

// PEGA A DATA DO FORMULÁRIO E SALVA EM FORMATO PARA BANCO
function formataDataBanco(strData) {
    
	console.log("vou formatar a data no padrão banco")
	
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

// EXIBE O CONTEÚDO DA ABA QUANTIDADES
function exibeQtdes(obj){
	
	console.log("entrei para exibir a aba qtdes")
	
	var seq = $(obj).parent().parent().parent().parent().parent().attr("id").split("___")[1]
	
	$("#LINHAATV___"+seq).children().children("div[ABAS_ATVS]").children("div").children("div[QTDESBLANK]").show()
	$("#LINHAATV___"+seq).children().children("div[ABAS_ATVS]").children("div").children("div[PROCESSOBLANK]").hide()
	$("#LINHAATV___"+seq).children().children("div[ABAS_ATVS]").children("div").children("div[COMPONENTESBLANK]").hide()
	$("#LINHAATV___"+seq).children().children("div[ABAS_ATVS]").children("div").children("div[IMPRODUTIVOBLANK]").hide()

	/*$("#QTDESBLANK___"+seq).show()
	$("#PROCESSOBLANK___"+seq).hide()
	$("#COMPONENTESBLANK___"+seq).hide()*/

}

// EXIBE O CONTEÚDO DA ABA PROCESSO
function exibeProcesso(obj){
	
	console.log("entrei para exibir a aba processo")
	
	//var seq = $(obj).attr("id").split("___")[1]
	
	var seq = $(obj).parent().parent().parent().parent().parent().attr("id").split("___")[1]
	
	$("#LINHAATV___"+seq).children().children("div[ABAS_ATVS]").children("div").children("div[QTDESBLANK]").hide()
	$("#LINHAATV___"+seq).children().children("div[ABAS_ATVS]").children("div").children("div[PROCESSOBLANK]").show()
	$("#LINHAATV___"+seq).children().children("div[ABAS_ATVS]").children("div").children("div[COMPONENTESBLANK]").hide()
	$("#LINHAATV___"+seq).children().children("div[ABAS_ATVS]").children("div").children("div[IMPRODUTIVOBLANK]").hide()
	
	/*$("#QTDESBLANK___"+seq).hide()
	$("#PROCESSOBLANK___"+seq).show()
	$("#COMPONENTESBLANK___"+seq).hide()*/

}

// BUSCA COMPONENTES DA ATIVIDADE
function buscaComponentesAtv(seq){
	
	console.log("vou buscar os componentes da atv seq "+seq)
	
	var codColigada = $("#CODCOLIGADAATV___"+seq).val()
	var codFilial = $("#CODFILIALATV___"+seq).val()
	var codEstrutura = $("#CODESTRUTURAATV___"+seq).val()
	var codAtividade = $("#CODATIVIDADE___"+seq).val()
	var codOrdem = $("#OP___"+seq).val()
	var idAtvOrdem = $("#IDATIVIDADE___"+seq).val()
	
	//codEstrutura = "03.023.0133521"
	//codOrdem = "27908/21"
		
	console.log("codColigada: "+codColigada+", codFilial: "+codFilial+", codEstrutura: "+codEstrutura+", codAtividade: "+codAtividade+", codOrdem: "+codOrdem)
	
	// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
	var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("CODESTRUTURA",codEstrutura,codEstrutura,ConstraintType.MUST)
	var a4 = DatasetFactory.createConstraint("CODATIVIDADE",codAtividade,codAtividade,ConstraintType.MUST)
	var a5 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
	var a6 = DatasetFactory.createConstraint("IDATVORDEM",idAtvOrdem,idAtvOrdem,ConstraintType.MUST)
	
	var constraints = new Array(a1,a2,a3,a4,a5,a6)
	
	var dataset = DatasetFactory.getDataset("dsComponentesApontamento",null,constraints,null)
	var row = dataset.values
	
	console.log("row")
	console.log(row)

	// SE RETORNO NÃO É NULO OU VAZIO
	if(!(row=="" || row==null || row==undefined)){
		
		var count = row.length
		
		// PERCORRE TODOS OS REGISTROS
		for(var i=0; i<count; i++){
			
			var rep = row[i]
			var seqComp = addComp()
				
			$("#DESCRICAOCOMPG___"+seqComp).val(rep["DESCRICAO"])
			$("#IDPRDCOMPG___"+seqComp).val(rep["IDPRD"])
			$("#CODIGOCOMPG___"+seqComp).val(rep["CODIGOPRD"])
			$("#UNDCOMPG___"+seqComp).val(rep["CODUNDCONTROLE"])
			//$("#QTDEUTG___"+seqComp).val()
			$("#SEQATV___"+seqComp).val(seq)
			$("#SEQCOMP___"+seqComp).val(i+1)
			$("#NUMLOTECOMPG___"+seqComp).val(rep["NUMLOTE"])
			$("#IDLOTECOMPG___"+seqComp).val(rep["IDLOTE"])
			$("#CUSTOMEDIOCOMPG___"+seqComp).val(rep["CUSTOMEDIO"])
			
			/*if(!(rep["ESTOQUE_ALOCADO"]=="" || rep["ESTOQUE_ALOCADO"]==null || rep["ESTOQUE_ALOCADO"]==undefined || rep["ESTOQUE_ALOCADO"]=="null")){
				
				$("#QTDECOMPG___"+seqComp).val(rep["ESTOQUE_ALOCADO"].toString().replace(".",","))
			
			}*/
			
			if(!(rep["CONSUMO_PLANEJADO"]=="" || rep["CONSUMO_PLANEJADO"]==null || rep["CONSUMO_PLANEJADO"]==undefined || rep["CONSUMO_PLANEJADO"]=="null")){
				
				$("#QTDECOMPG___"+seqComp).val(rep["CONSUMO_PLANEJADO"].toString().replace(".",","))
			
			}
			
			if(!(rep["ESTOQUE_ATUAL"]=="" || rep["ESTOQUE_ATUAL"]==null || rep["ESTOQUE_ATUAL"]==undefined || rep["ESTOQUE_ATUAL"]=="null")){
				
				$("#ESTOOQUEATUALCOMPG___"+seqComp).val(rep["ESTOQUE_ATUAL"].toString().replace(".",","))
			
			}
			
			if(!(rep["CODLOC"]=="" || rep["CODLOC"]==null || rep["CODLOC"]==undefined || rep["CODLOC"]=="null")){
				
				$("#CODLOCCOMPG___"+seqComp).val(rep["CODLOC"])
			
			}
			
		}
		
	}
	
}

// VERIFICA SE AS HORAS ULTRAPASSARAM AS HORAS PROGRAMADAS
function verificaEncerrar(obj){
	
	console.log("vou verificar se devo encerrar ou não a ordem")
	
	var seq = $(obj).attr("id").split("___")[1]
	
	var saldoAp = $("#SALDOTRABALHADO___"+seq).val()
	var saldoProg = $("#SALDOPROGRAMADO___"+seq).val()
	
	if(saldoAp.indexOf(",")!=-1){
		
		saldoAp = saldoAp.toString().replace(",",".")
		
	}
	
	if(saldoProg.indexOf(",")!=-1){
		
		saldoProg = saldoProg.toString().replace(",",".")
		
	}
	
	saldoProg = parseFloat(saldoProg)
	saldoAp = parseFloat(saldoAp)
	
	console.log("saldoProg: "+saldoProg+", saldoAp: "+saldoAp)
	
	// SE SALDO APONTADO É MAIOR OU IGUAL AO SALDO PROGRAMADO
	if(saldoAp>=saldoProg){
		
		console.log("vou encerrar")
		
		$("#ENCERRA___"+seq).val("S")
		
	}else{
	// SE NÃO 
		
		console.log("não vou encerrar")
		
		$("#ENCERRA___"+seq).val("")
		
	}
	
}

// FAZ O AJUSTE DA TABELA DAS ATIVIDADES
function ajustaTabelaAtv(){
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='CODIGOPRD___']").each(function(){
	
		var seq = $(this).attr("id").split("___")[1]
		
		$("#ACESSOICON___"+seq).parent("span").prop("id","ICON___"+seq)
		$("#ACESSOICON___"+seq).parent("span").prop("name","ICON___"+seq)
		
		$("#ACESSOICONR___"+seq).parent("span").prop("id","ICONR___"+seq)
		$("#ACESSOICONR___"+seq).parent("span").prop("name","ICONR___"+seq)
		
		$("#ACESSOQTDES___"+seq).parent("a").prop("id","ABAQTDES___"+seq)
		$("#ACESSOQTDES___"+seq).parent("a").prop("href","QTDESBLANK___"+seq)
		
		$("#ACESSOPROC___"+seq).parent("a").prop("id","ABAPROCESSO___"+seq)
		$("#ACESSOPROC___"+seq).parent("a").prop("href","PROCESSOBLANK___"+seq)
		
		$("#ACESSOCOMP___"+seq).parent("a").prop("id","ABACOMPONENTES___"+seq)
		$("#ACESSOCOMP___"+seq).parent("a").prop("href","COMPONENTESBLANK___"+seq)
		
		$("#DSCATIVIDADE___"+seq).parent("div").parent("div").parent("div").parent("div").prop("id","QTDESBLANK___"+seq)
		$("#DSCATIVIDADE___"+seq).parent("div").parent("div").parent("div").parent("div").prop("name","QTDESBLANK___"+seq)
		
		$("#PROCESSO___"+seq).parent("div").parent("div").parent("div").prop("id","PROCESSOBLANK___"+seq)
		$("#PROCESSO___"+seq).parent("div").parent("div").parent("div").prop("name","PROCESSOBLANK___"+seq)
		
		$("#COMP___"+seq).parent("div").parent("div").prop("id","COMPONENTESBLANK___"+seq)
		$("#COMP___"+seq).parent("div").parent("div").prop("name","COMPONENTESBLANK___"+seq)
		
		$("#ICONR___"+seq).click()
		
		$("#LINHAATV___"+seq).addClass("linhaVermelha")
		
		var ultimaAtv = $("#ULTIMAATVOP___"+seq).val()
		
		// SE É A ULTIMA ATIVIDADE DA OP, MOSTRA O CHECKBOX E DESABILITA A QTD REALIZADA
		if(ultimaAtv=="SIM"){
			
			$("#OPCONCLUIDA___"+seq).parent("div").show()
			$("#QTDREALIZADA___"+seq).prop("readonly",false)
			
		} else {
			// SE NÃO É A ULTIMA ATIVIDADE DA OP, ESCONDE O CHECKBOX E DESABILITA O CAMPO DA QTDE REALIZADA
			
			console.log("não é a ultima atividade da ordem, vou esconder checkbox")
			
			$("#OPCONCLUIDA___"+seq).parent("div").hide()
			$("#QTDREALIZADA___"+seq).prop("readonly",true)
			
		}

	})
	
}

// EXIBE O CONTEÚDO DA ABA COMPONENTES
function exibeComponentes(obj){
	
	console.log("entrei para exibir a aba componentes")
	
	//var seq = $(obj).attr("id").split("___")[1]
	var seq = $(obj).parent().parent().parent().parent().parent().attr("id").split("___")[1]

	console.log("seq: "+seq)
	
	$("#LINHAATV___"+seq).children().children("div[ABAS_ATVS]").children("div").children("div[QTDESBLANK]").hide()
	$("#LINHAATV___"+seq).children().children("div[ABAS_ATVS]").children("div").children("div[PROCESSOBLANK]").hide()
	$("#LINHAATV___"+seq).children().children("div[ABAS_ATVS]").children("div").children("div[COMPONENTESBLANK]").show()
	$("#LINHAATV___"+seq).children().children("div[ABAS_ATVS]").children("div").children("div[IMPRODUTIVOBLANK]").hide()

	/*$("#QTDESBLANK___"+seq).hide()
	$("#PROCESSOBLANK___"+seq).hide()
	$("#COMPONENTESBLANK___"+seq).show()*/
	
	var table = $("#COMPONENTESBLANK___"+seq).children("div").children("table")[0]
	
	console.log("table: "+table)
	
	// SE TABELA AINDA NÃO FOI CRIADA
	if(table==undefined || table==null || table==""){
	
		console.log("não tem tabela: vou incluir")
		
		// CARREGA COMPONENTES DO ITEM
		carregaComponentes(seq)
		
	}/*else{
		
		// ATUALIZA A TABELA COMPONENTES
		atualizaComponentes(seq)
		
	}*/
	
}

// EXIBE O CONTEÚDO DA ABA IMPRODUTIVO
function exibeImprodutivo(obj){
	
	console.log("entrei para exibir a aba improdutivo")
	
	//var seq = $(obj).attr("id").split("___")[1]
	var seq = $(obj).parent().parent().parent().parent().parent().attr("id").split("___")[1]

	console.log("seq: "+seq)
	
	$("#LINHAATV___"+seq).children().children("div[ABAS_ATVS]").children("div").children("div[QTDESBLANK]").hide()
	$("#LINHAATV___"+seq).children().children("div[ABAS_ATVS]").children("div").children("div[PROCESSOBLANK]").hide()
	$("#LINHAATV___"+seq).children().children("div[ABAS_ATVS]").children("div").children("div[COMPONENTESBLANK]").hide()
	$("#LINHAATV___"+seq).children().children("div[ABAS_ATVS]").children("div").children("div[IMPRODUTIVOBLANK]").show()

	/*$("#QTDESBLANK___"+seq).hide()
	$("#PROCESSOBLANK___"+seq).hide()
	$("#COMPONENTESBLANK___"+seq).show()*/	
	
}

// EXPANDE O CONTEÚDO DO DETALHAMENTO DA ATIVIDADE
function expandir(e) {
	
	console.log("vou expandir")
	
	//var id = $(e).attr("id").split("___")[1];
    var id = $(e).parent().children("input").attr("id").split("___")[1]
	console.log("id: "+id)

    /*var idCampo = id.replace("ICONR", "");
    console.log("idCampo: "+idCampo)*/
    
    // ESCONDE/MOSTRA OS ÍCONES
    $("#EXPANSOR___"+id).parent().children("span[ICON]").hide()
    $("#EXPANSOR___"+id).parent().children("span[ICONR]").show()
	/*$("#ICON___" + id).hide();
    $("#ICONR___" + id).show();*/
    
    $("#LINHAATV___"+id).children().children("div[ABAS_ATVS]").children("div").children("div[QTDESBLANK]").addClass("active")
    $("#LINHAATV___"+id).children().children("div[ABAS_ATVS]").children("div").children("div[PROCESSOBLANK]").removeClass("active")
    $("#LINHAATV___"+id).children().children("div[ABAS_ATVS]").children("div").children("div[COMPONENTESBLANK]").removeClass("active")
    $("#LINHAATV___"+id).children().children("div[ABAS_ATVS]").children("div").children("div[IMPRODUTIVOBLANK]").removeClass("active")
  
    /*$("#QTDESBLANK___"+id).addClass("active")
    $("#PROCESSOBLANK___"+id).removeClass("active")
    $("#COMPONENTESBLANK___"+id).removeClass("active")*/
    
    // EXIBE A ABA DOS ITENS
    //$("#ABAS_ATVS___"+id).show()
    $("#EXPANSOR___"+id).parent().parent().children("div[ABAS_ATVS]").show()
    //$("#LINHAATV___"+id).children().children("div[class='ABAS_ATVS']").show()
	
}

// REDUZ O CONTEÚDO DO DETALHAMENTO DO ITEM
function reduzir(e) {

	console.log("vou reduzir")

	//var id = $(e).attr("id").split("___")[1];
	var id = $(e).parent().children("input").attr("id").split("___")[1]
    console.log("id: "+id)
    
    /*var idCampo = id.replace("ICONR", "");
    console.log("idCampo: "+idCampo)*/
    
    // ESCONDE/MOSTRA OS ÍCONES
    $("#EXPANSOR___"+id).parent().children("span[ICON]").show()
    $("#EXPANSOR___"+id).parent().children("span[ICONR]").hide()
    /*$("#ICON___" + id).show();
    $("#ICONR___" + id).hide();*/
    
    // ESCONDE A ABA DOS ITENS
    //$("#ABAS_ATVS___"+id).hide()
    $("#EXPANSOR___"+id).parent().parent().children("div[ABAS_ATVS]").hide()
    //$("#LINHAATV___"+id).children().children("div[class='ABAS_ATVS']").hide()
    
}

// CARREGA COMPONENTES DO ITEM
function carregaComponentes(seq){
	
	console.log("Entrei para carregar os componentes")
	
	var myLoading2 = FLUIGC.loading(window);
	
	myLoading2.show();
	
	// INICIA A OPERAÇÃO DEPOIS DE CARREGAR O LOAD
	setTimeout(function(){
			
		console.log("seq: "+seq)
		
		/*var codColigada = $("#CODCOLIGADAATV___"+seq).val()
		var codFilial = $("#CODFILIALATV___"+seq).val()
		var codEstrutura = $("#CODESTRUTURAATV___"+seq).val()
		var codAtividade = $("#CODATIVIDADE___"+seq).val()
		var codOrdem = $("#OP___"+seq).val()
		
		codEstrutura = "03.023.0133521"
		codOrdem = "27908/21"
			
		console.log("codColigada: "+codColigada+", codFilial: "+codFilial+", codEstrutura: "+codEstrutura+", codAtividade: "+codAtividade+", codOrdem: "+codOrdem)
		
		// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
		var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST)
		var a2 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
		var a3 = DatasetFactory.createConstraint("CODESTRUTURA",codEstrutura,codEstrutura,ConstraintType.MUST)
		var a4 = DatasetFactory.createConstraint("CODATIVIDADE",codAtividade,codAtividade,ConstraintType.MUST)
		var a5 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
		
		var constraints = new Array(a1,a2,a3,a4,a5)
		
		var dataset = DatasetFactory.getDataset("dsComponentesOS",null,constraints,null)
		var row = dataset.values
		
		console.log("row")
		console.log(row)*/
		
		var strHTML = ""
		var achei = false
		
		// PERCORRE TODOS OS REGISTROS DA TABELA DE COMPONENTES GERAL
		$("input[id^='CODIGOCOMPG___']").each(function(){
			
			var seqComp = $(this).attr("id").split("___")[1]
			//var seqComp = 0
			
			var seqAtv = $("#SEQATV___"+seqComp).val()
			var seqCompR = $("#SEQCOMP___"+seqComp).val()
			
			console.log("seqAtv: "+seqAtv+" e seq: "+seq)
			
			// SE É A MESMA ATIVIDADE
			if(seq==seqAtv && achei){
				
				console.log("mesma atv e achei")
				
				//seqComp = seqComp + 1
				
				// CONSTROI O CORPO DA TABELA
				strAux = constroiCorpoTabela(seqComp,seqCompR,seq)

				strHTML = strHTML + strAux
				
			}
			
			// SE É A MESMA ATIVIDADE
			if(seq==seqAtv && !achei){
				
				console.log("mesma atv e não achei")
				
				//seqComp = seqComp + 1
				
				// CONSTROI O CABEÇALHO DA TABELA
				strHTML = constroiCabecalhoTabela()
				
				// CONSTROI O CORPO DA TABELA
				strAux = constroiCorpoTabela(seqComp,seqCompR,seq)
				
				strHTML = strHTML + strAux
				
				achei = true
				
			} 
			
		})
		
		// SE HÁ REGISTROS NA TABELA
		if(achei){

			// TERMINA O FINAL DA TABELA
			strAux = constroiFinalTabela()
			strHTML = strHTML + strAux
			
		}
		
		console.log("strHTML:")
		console.log(strHTML)
		
		$("#COMP___"+seq).parent().append(strHTML)
		
	}, 500)
	
	// DESATIVA O LOAD
	setTimeout(function(){
		
		myLoading2.hide();
		$("#ICONREDUZIR").click()
		
	}, 500)
	
}

// CONSTROI O CABEÇALHO DA TABELA
function constroiCabecalhoTabela(){
	
	var strHTML = "<table tablename='COMPONENTES' id='COMPONENTES' name='COMPONENTES' style='border:0' class='table table-bordered' nodeletebutton='true' noaddbutton='true'> "+
				  "	    <thead> "+
				  "	        <tr> "+
				  "				<th class='form-group col-md-2'><label class='info'><strong>Descrição</strong></label></th> "+
				  "				<th class='form-group col-md-1'><label class='info'><strong>Lote</strong></label></th> "+
				  "				<th class='form-group col-md-1'><label class='info'><strong>Cód.</strong></label></th> "+
				  "				<th class='form-group col-md-1'><label class='info'><strong>Codloc</strong></label></th> "+
				  "				<th class='form-group col-md-2'><label class='info'><strong>Est. Atual</strong></label></th> "+
				  "				<th class='form-group col-md-2'><label class='info'><strong>Qtde</strong></label></th> "+
				  "				<th class='form-group col-md-1'><label class='info'><strong>Und</strong></label></th> "+
				  "				<th class='form-group col-md-2'><label class='info'><strong>Qtde Util.</strong></label></th> "+
				  "	        </tr> "+
				  "	    </thead> "+
				  "	    <tbody> "
	
	return strHTML
				  
}

// CONSTROI O CORPO DA TABELA
function constroiCorpoTabela(seqComp,seqLinha,seq){
//function constroiCorpoTabela(row,count,seq){
	
	var strHTML = ""
	
	var comp = $("#COMP___"+seq).val()	
		
	console.log("comp: "+comp)
	
	// PERCORRE TODOS OS REGISTROS
	/*for(var i=0; i < count; i++){
		
		var rep = row[i]
		
		var seqLinha = i+1*/
	
	// SE COMPONENTES PRECISAM ESTAR DESABILITADOS
	if(comp=="D"){
		
		strHTML = strHTML +   "  <tr id='LINHAATV_"+seq+"___"+seqLinha+"'> "+
		  "	    <td> "+
		  "		   <input type='text' class='form-control' id='DESCRICAOCOMP_"+seq+"___"+seqLinha+"' name='DESCRICAO_"+seq+"___"+seqLinha+"' value='"+$("#DESCRICAOCOMPG___"+seqComp).val()+"' readonly> "+
		  "		</td> "+
		  "		<td> "+
		  "		   <input type='text' class='form-control' id='LOTECOMP_"+seq+"___"+seqLinha+"' name='LOTECOMP_"+seq+"___"+seqLinha+"' value='"+$("#NUMLOTECOMPG___"+seqComp).val()+"' readonly> "+
		  "		</td> "+
		  "		<td> "+
		  "		   <input type='text' class='form-control' id='CODIGOCOMP_"+seq+"___"+seqLinha+"' name='CODIGOCOMP_"+seq+"___"+seqLinha+"' value='"+$("#CODIGOCOMPG___"+seqComp).val()+"' readonly> "+
		  "		</td> "+
		  "		<td> "+
		  "		   <input type='text' class='form-control' id='CODLOCCOMP_"+seq+"___"+seqLinha+"' name='CODLOCCOMP_"+seq+"___"+seqLinha+"' value='"+$("#CODLOCCOMPG___"+seqComp).val()+"' readonly> "+
		  "		</td> "+
		  "		<td> "+
		  "		   <input type='text' class='form-control' id='ESTOQUEATUALCOMP_"+seq+"___"+seqLinha+"' name='ESTOQUEATUALCOMP_"+seq+"___"+seqLinha+"' value='"+$("#ESTOOQUEATUALCOMPG___"+seqComp).val()+"' readonly> "+
		  "		</td> "+
		  "		<td> "+
		  "		   <input type='text' class='form-control' id='QTDECOMP_"+seq+"___"+seqLinha+"' name='QTDECOMP_"+seq+"___"+seqLinha+"' value='"+$("#QTDECOMPG___"+seqComp).val()+"' readonly> "+
		  "		</td> "+
		  "		<td> "+
		  "		   <input type='text' class='form-control' id='UNDCOMP_"+seq+"___"+seqLinha+"' name='UNDCOMP_"+seq+"___"+seqLinha+"' value='"+$("#UNDCOMPG___"+seqComp).val()+"' readonly> "+
		  "		</td> "+
		  "		<td> "+
		  "		   <input type='text' class='form-control' id='QTDEUTILCOMP_"+seq+"___"+seqLinha+"' name='QTDEUTILCOMP_"+seq+"___"+seqLinha+"' value='"+$("#QTDEUTG___"+seqComp).val()+"' onchange='salvaQtdeUtilComp(this)' readonly> "+
		  "	    </td> "+
		  "	 </tr> "
		
	}else{
		// SE NÃO, PODEM SER LANÇADOS
		
		strHTML = strHTML +   "  <tr id='LINHAATV_"+seq+"___"+seqLinha+"'> "+
		  "	    <td> "+
		  "		   <input type='text' class='form-control' id='DESCRICAOCOMP_"+seq+"___"+seqLinha+"' name='DESCRICAO_"+seq+"___"+seqLinha+"' value='"+$("#DESCRICAOCOMPG___"+seqComp).val()+"' readonly> "+
		  "		</td> "+
		  "		<td> "+
		  "		   <input type='text' class='form-control' id='LOTECOMP_"+seq+"___"+seqLinha+"' name='LOTECOMP_"+seq+"___"+seqLinha+"' value='"+$("#NUMLOTECOMPG___"+seqComp).val()+"' readonly> "+
		  "		</td> "+
		  "		<td> "+
		  "		   <input type='text' class='form-control' id='CODIGOCOMP_"+seq+"___"+seqLinha+"' name='CODIGOCOMP_"+seq+"___"+seqLinha+"' value='"+$("#CODIGOCOMPG___"+seqComp).val()+"' readonly> "+
		  "		</td> "+
		  "		<td> "+
		  "		   <input type='text' class='form-control' id='CODLOCCOMP_"+seq+"___"+seqLinha+"' name='CODLOCCOMP_"+seq+"___"+seqLinha+"' value='"+$("#CODLOCCOMPG___"+seqComp).val()+"' readonly> "+
		  "		</td> "+
		  "		<td> "+
		  "		   <input type='text' class='form-control' id='ESTOQUEATUALCOMP_"+seq+"___"+seqLinha+"' name='ESTOQUEATUALCOMP_"+seq+"___"+seqLinha+"' value='"+$("#ESTOOQUEATUALCOMPG___"+seqComp).val()+"' readonly> "+
		  "		</td> "+
		  "		<td> "+
		  "		   <input type='text' class='form-control' id='QTDECOMP_"+seq+"___"+seqLinha+"' name='QTDECOMP_"+seq+"___"+seqLinha+"' value='"+$("#QTDECOMPG___"+seqComp).val()+"' readonly> "+
		  "		</td> "+
		  "		<td> "+
		  "		   <input type='text' class='form-control' id='UNDCOMP_"+seq+"___"+seqLinha+"' name='UNDCOMP_"+seq+"___"+seqLinha+"' value='"+$("#UNDCOMPG___"+seqComp).val()+"' readonly> "+
		  "		</td> "+
		  "		<td> "+
		  "		   <input type='text' class='form-control' id='QTDEUTILCOMP_"+seq+"___"+seqLinha+"' name='QTDEUTILCOMP_"+seq+"___"+seqLinha+"' value='"+$("#QTDEUTG___"+seqComp).val()+"' onchange='salvaQtdeUtilComp(this)'> "+
		  "	    </td> "+
		  "	 </tr> "
		
	}
	
	//}
	
    return strHTML
    
}


// TERMINA O FINAL DA TABELA
function constroiFinalTabela(){
	
	var strHTML = "	    </tbody> "+
				  " </table> "
	
	return strHTML
	
}

// VERIFICA SE TODOS OS COMPONENTES VINCULADOS NA ATIVIDADE TEM SALDO
function verificaComponentes(seq){
	
	console.log("vou verificar se todos os componentes da atividade possuem saldo para serem apontados")
	
	var compApont = new Array()
	var tamApont = 0
	var tamCount = 0
	
	var codOrdem = $("#OP___"+seq).val()
	var idAtvOrdem = $("#IDATIVIDADE___"+seq).val()
	var codAtividade = $("#CODATIVIDADE___"+seq).val()
	var codEstrutura = $("#CODESTRUTURAATV___"+seq).val()
	var codColigada = $("#CODCOLIGADAATV___"+seq).val()
	var codFilial = $("#CODFILIALATV___"+seq).val()
	var descAtv = $("#DSCATIVIDADE___"+seq).val()
	
	var a1 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST);
 	var a2 = DatasetFactory.createConstraint("IDATVORDEM",idAtvOrdem,idAtvOrdem,ConstraintType.MUST);
 	var a3 = DatasetFactory.createConstraint("CODATIVIDADE",codAtividade,codAtividade,ConstraintType.MUST);
 	var a4 = DatasetFactory.createConstraint("CODESTRUTURA",codEstrutura,codEstrutura,ConstraintType.MUST);
 	var a5 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST);
 	var a6 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST);
 	
 	var constraints = new Array(a1,a2,a3,a4,a5,a6);
 	var dataset = DatasetFactory.getDataset("dsComponentesAtvOS",null,constraints,null);
 	var row = dataset.values
 	
 	console.log("row: "+row)
 	
 	// SE RETORNO NÃO É NULO OU VAZIO
 	if(!(row=="" || row==null || row==undefined)){
 	
 		var count = dataset.values.length
 		tamCount = count
 		
 		// PERCORRE TODOS OS REGISTROS DO DATASET
 		for(var i=0;i<count;i++){
 			
 			var rep = row[i]
 			
 			var codigoPrd = rep["CODIGOPRD"]
 			
 			// PERCORRE A TABELA DE TODOS OS COMPONENTES
 			$("input[id^='CODIGOCOMPG___']").each(function(){
 				
 				var seqComp = $(this).attr("id").split("___")[1]
 				
 				var seqAtv = $("#SEQATV___"+seqComp).val()
 				var codigoComp = $("#CODIGOCOMPG___"+seqComp).val()
 				var qtdeUt = $("#QTDEUTG___"+seqComp).val()
 				
 				// SE CÓDIGO DO COMPONENTE É IGUAL AO CÓDIGO DO PRODUTO E PERTENCE A MESMA ATIVIDADE E FOI APONTADO
 				if(codigoComp==codigoPrd && seq==seqAtv){
 					
 					// SALVA O COMPONENTE QUE FOI APONTADO E AINDA NÃO FOI INCLUÍDO NO ARRAY
 					if(!(compApont.includes(codigoPrd))){

	 					compApont.push(codigoPrd)	
 						
 					}
 					
 				}
 				
 			})
 			
 		}
 		
 	}
 	
 	tamApont = compApont.length
	
 	console.log("tamApont: "+tamApont+", tamCount: "+tamCount)
 	
	// SE TAMANHO DO ARRAY É O MESMO DO DATASET 
	if(!(tamApont==tamCount)){
		
		console.log("falta componentes com saldo de estoque")
		
		// DESABILITA OS CAMPOS E EXIBE MENSAGEM
		$("#QTDREALIZADA___"+seq).prop("readonly",true)
		$("#SALDOTRABALHADO___"+seq).prop("readonly",true)
		$("#AVANCO___"+seq).prop("readonly",true)
		$("#COMP___"+seq).val("D")
		
		$("#EXPANSOR___"+seq).parent("div").append("<span class='MSG'>&emsp;Esta atividade tem componentes que estão sem saldo de estoque, por isso não pode ser apontado.</span>")
		
	}
	
}

// VERIFICA SE TODOS OS APONTAMENTOS ATENDEM AS REGRAS
function verificaApontamentos(){
	
	console.log("verifica se todos os apontamentos que foram lançados atendem as regras")
	
	var compApont = new Array()
	var ret = true
	
	// PERCORRE TODAS AS ATIVIDADES
	$("input[id^='CODIGOPRD___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var saldoTrab = $("#SALDOTRABALHADO___"+seq).val()
		var avanco = $("#AVANCO___"+seq).val()
		
		// SE SALDO TRABALHADO OU AVANCO FORAM INFORMADOS
		if(!((saldoTrab=="" || saldoTrab==null || saldoTrab==undefined) || (avanco=="" || avanco==null || avanco==undefined))){
			 
			console.log("atividade seq "+seq+" foi apontada, vou verificar se os componentes foram lançados")
			
			var codOrdem = $("#OP___"+seq).val()
			var idAtvOrdem = $("#IDATIVIDADE___"+seq).val()
			var codAtividade = $("#CODATIVIDADE___"+seq).val()
			var codEstrutura = $("#CODESTRUTURAATV___"+seq).val()
			var codColigada = $("#CODCOLIGADAATV___"+seq).val()
			var codFilial = $("#CODFILIALATV___"+seq).val()
			var descAtv = $("#DSCATIVIDADE___"+seq).val()
			
			var a1 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST);
		 	var a2 = DatasetFactory.createConstraint("IDATVORDEM",idAtvOrdem,idAtvOrdem,ConstraintType.MUST);
		 	var a3 = DatasetFactory.createConstraint("CODATIVIDADE",codAtividade,codAtividade,ConstraintType.MUST);
		 	var a4 = DatasetFactory.createConstraint("CODESTRUTURA",codEstrutura,codEstrutura,ConstraintType.MUST);
		 	var a5 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST);
		 	var a6 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST);
		 	
		 	var constraints = new Array(a1,a2,a3,a4,a5,a6);
		 	var dataset = DatasetFactory.getDataset("dsComponentesAtvOS",null,constraints,null);
		 	var row = dataset.values
		 	
		 	console.log("row: "+row)
		 	
		 	// SE RETORNO NÃO É NULO OU VAZIO
		 	if(!(row=="" || row==null || row==undefined)){
		 		
		 		var count = row.length
		 		
		 		// PERCORRE TODOS OS COMPONENTES DA ATIVIDADE
		 		for(var i=0;i<count;i++){
		 			
		 			var rep = row[i]
		 			
		 			var codigoPrd = rep["CODIGOPRD"]
			 		
		 			// PERCORRE A TABELA DE TODOS OS COMPONENTES
		 			$("input[id^='CODIGOCOMPG___']").each(function(){
		 				
		 				var seqComp = $(this).attr("id").split("___")[1]
		 				var seqAtv = $("#SEQATV___"+seqComp).val()
		 				var codigoComp = $("#CODIGOCOMPG___"+seqComp).val()
		 				var qtdeUt = $("#QTDEUTG___"+seqComp).val()
		 				
		 				// SE CÓDIGO DO COMPONENTE É IGUAL AO CÓDIGO DO PRODUTO E PERTENCE A MESMA ATIVIDADE E FOI APONTADO
		 				if(codigoComp==codigoPrd && seq==seqAtv && (qtdeUt=="" || qtdeUt==null || qtdeUt==undefined)){
		 					
		 					// SALVA O COMPONENTE QUE FOI APONTADO E AINDA NÃO FOI INCLUÍDO NO ARRAY
		 					if(!(compApont.includes(codigoPrd))){

			 					compApont.push(codigoPrd)	
		 						
		 					}
		 					
		 				}
		 				
		 			})
		 			
		 		}
		 		
		 		// SE A QUANTIDADE DE COMPONENTES DA ATIVIDADE É MAIOR DO QUE OS COMPONENTES QUE FORAM APONTADOS
		 		if(count>compApont.length){
		 			
		 			console.log("Há componentes sem apontamento da atividade "+descAtv+" da Ordem "+codOrdem)
		 			
		 			// EXIBE ALERTA
					Swal.fire({
						  icon: 'error',
						  title: 'Há componentes sem apontamento da atividade '+descAtv+" da Ordem "+codOrdem,
						  text: 'Verifique e tente novamente.'
					})
		 			
		 			/*FLUIGC.message.alert({
					    message: 'Há componentes sem apontamento da atividade '+descAtv+" da Ordem "+codOrdem,
					    title: 'Verifique e tente novamente.',
					    label: 'OK'
					});*/
		 			
					ret = false
					
		 		} 
		 		
		 	}
		 	
		}
		
	})

	return ret
	
}

// SE CAMPOS OBRIGATÓRIOS FORAM PREENCHIDOS
function camposObrigatorios(){
	
	
	
}

// EXPANDE O CONTEÚDO DO DETALHAMENTO DO ITEM
function expandirFiltro() {
	
    // ESCONDE/MOSTRA OS ÍCONES
    $("#ICONEXPANDIR").hide();
    $("#ICONREDUZIR").show();
    
    // EXIBE A ABA DOS ITENS
    $(".filtros").show()

}

// REDUZ O CONTEÚDO DO DETALHAMENTO DO ITEM
function reduzirFiltro() {
    
    // ESCONDE/MOSTRA OS ÍCONES
    $("#ICONEXPANDIR").show();
    $("#ICONREDUZIR").hide();
    
    // ESCONDE A ABA DOS ITENS
    $(".filtros").hide()
    
}

// SALVA A QUANTIDADE UTILIZADA DO COMPONENTE
function salvaQtdeUtilComp(obj){

	console.log("vou verificar se a qtde pode ser consumida e salvá-la")
	
	var qtdeUt = $(obj).val()
	console.log("qtdeUt: "+qtdeUt)
	
	var seqAtv = $(obj).attr("id").split("_")[1]
	var seqComp = $(obj).attr("id").split("___")[1]
	console.log("seqAtv: "+seqAtv+", seqComp: "+seqComp)
	
	var estoqueLote = $("#ESTOQUEATUALCOMP_"+seqAtv+"___"+seqComp).val()
	
	if(estoqueLote.includes(",")){
		
		estoqueLote = estoqueLote.replace(",",".")
		
	}
	
	estoqueLote = parseFloat(estoqueLote)
	
	// SE VALOR É VAZIO OU NULO
	if(qtdeUt=="" || qtdeUt==null || qtdeUt==undefined){
		
		// PERCORRE TODOS OS REGISTROS
		$("input[id^='CODIGOCOMPG___']").each(function(){
			
			var seq = $(this).attr("id").split("___")[1]
			
			var seqAtvLinha = $("#SEQATV___"+seq).val()
			var seqCompLinha = $("#SEQCOMP___"+seq).val()
			
			// SE É O MESMO REGISTRO
			if(seqAtv==seqAtvLinha && seqComp==seqCompLinha){
				
				console.log("achei o componente da atividade")
				
				$("#QTDEUTG___"+seq).val("")
				
			}
			
		})
		
	} else {
		// SE NÃO, SE FOI PREENCHIDO
		
		// SE QTDE CONTÉM ","
		if(qtdeUt.includes(",")){
			
			qtdeUt = qtdeUt.replace(",",".")
			
		}	
		
		qtdeUt = parseFloat(qtdeUt)
		
		// SE QUANTIDE UTILIZADA INFORMADA NÃO É UM VALOR VÁLIDO
		if(isNaN(qtdeUt)){
			
			// LIMPA O CAMPO
			$(obj).val("")
			
			// PERCORRE TODOS OS REGISTROS
			$("input[id^='CODIGOCOMPG___']").each(function(){
				
				var seq = $(this).attr("id").split("___")[1]
				
				var seqAtvLinha = $("#SEQATV___"+seq).val()
				var seqCompLinha = $("#SEQCOMP___"+seq).val()
				
				// SE É O MESMO REGISTRO
				if(seqAtv==seqAtvLinha && seqComp==seqCompLinha){
					
					console.log("achei o componente da atividade")
					
					$("#QTDEUTG___"+seq).val("")
					
				}
				
			})
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'A quantidade informada não é um valor válido',
				  text: 'Verifique e tente novamente.'
			})
			
			/*FLUIGC.message.alert({
			    message: 'A quantidade informada não é um valor válido',
			    title: 'Verifique e tente novamente.',
			    label: 'OK'
			});*/
			
		}else if(qtdeUt>estoqueLote){
			// SE NÃO, SE QUANTIDADE É MAIOR DO QUE O ESTOQUE DO LOTE
			
			// LIMPA O CAMPO
			$(obj).val("")
			
			// PERCORRE TODOS OS REGISTROS
			$("input[id^='CODIGOCOMPG___']").each(function(){
				
				var seq = $(this).attr("id").split("___")[1]
				
				var seqAtvLinha = $("#SEQATV___"+seq).val()
				var seqCompLinha = $("#SEQCOMP___"+seq).val()
				
				// SE É O MESMO REGISTRO
				if(seqAtv==seqAtvLinha && seqComp==seqCompLinha){
					
					console.log("achei o componente da atividade")
					
					$("#QTDEUTG___"+seq).val("")
					
				}
				
			})
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'A quantidade informada é maior que o estoque do lote!',
				  text: 'Verifique e tente novamente.'
			})
			
			/*FLUIGC.message.alert({
			    message: 'A quantidade informada é maior que o estoque do lote!',
			    title: 'Verifique e tente novamente.',
			    label: 'OK'
			});*/
			
		}else {
			// SE NÃO, SE É UM VALOR VÁLIDO E NÃO É MAIOR QUE O ESTOQUE DO LOTE
			
			qtdeUt = parseFloat(qtdeUt)
			
			var seqAtv = $(obj).attr("id").split("_")[1]
			
			var seqComp = $(obj).attr("id").split("___")[1]
			console.log("seqAtv: "+seqAtv+", seqComp: "+seqComp)
			
			// PERCORRE TODOS OS REGISTROS
			$("input[id^='CODIGOCOMPG___']").each(function(){
				
				var seq = $(this).attr("id").split("___")[1]
				
				console.log("vou percorrer tabela dos componentes, na linha "+seq)
				
				var seqAtvLinha = $("#SEQATV___"+seq).val()
				var seqCompLinha = $("#SEQCOMP___"+seq).val()
				
				console.log("seqAtv: "+seqAtv+", seqAtvLinha: "+seqAtvLinha+", seqCompLinha: "+seqCompLinha+", seqComp: "+seqComp)
				
				// SE É O MESMO REGISTRO
				if(seqAtv==seqAtvLinha && seqComp==seqCompLinha){
					
					console.log("achei o componente da atividade, vou salvar "+qtdeUt)
					
					$("#QTDEUTG___"+seq).val(qtdeUt)
					
				}
				
			})

		}

	}
			
}


// FAZ O AJUSTE DOS ID'S DA TABELA E EXPANSORES
function ajustaTabela(){
	
	console.log("entrei para ajustar a tabela")
	
	var achei = false
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='CODIGOPRD___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		$("#LINHAATV___"+seq).children().children("div[EXPANSOR]").children("span[ICON]").attr("id","ICON___"+seq)
		$("#LINHAATV___"+seq).children().children("div[EXPANSOR]").children("span[ICONR]").attr("id","ICONR___"+seq)
		
		$("#ICONR___"+seq).click()
		
		achei = true
		
	})
	
	// SE HÁ ITENS NA TABELA
	if(achei){
		
		$("#ABA0").parent("span").click()
		
		// MOSTRA/ESCONDE CAMPOS DO FORMULÁRIO
		$(".HORASIMPRODUTIVASDIA1").show()
		$(".HORASIMPRODUTIVASDIA2").hide()
		$(".HORASIMPRODUTIVASDIA3").hide()
		
	}
	
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

// LIMPA A ABA DOS DIAS
function limpaAbasDias(){
	
	$("#DIAS").empty()
	
}

// CONSTRÓI OS DIAS PARA SEREM SELECIONADOS COMO ABAS
function constroiAbasDias(){
	
	console.log("vou construir as abas")
	
	var dia = ""
		
	var data1 = $("#DATA_DE").val()
	
	/*var dataAte = ""
		
	var dataAux = data1.split("/")
	var dia = dataAux[0]
	var mes = dataAux[1]
	var ano = dataAux[2]
	
	console.log("dia: "+dia+", mes: "+mes+", ano: "+ano)
	
	var dataMax = new Date(ano,mes-1,dia)
	dataMax.setDate(dataMax.getDate() + 1)
	var data2 = geraDataAte(dataMax)
	console.log("data2 gerada: "+data2)
	//data2 = formataData(data2)

	dataMax = new Date(ano,mes-1,dia)
	dataMax.setDate(dataMax.getDate() + 2)
	var data3 = geraDataAte(dataMax)
	console.log("data3 gerada: "+data3)
	//data3 = formataData(data3)
	
	console.log("data1: "+data1+", data2: "+data2+", data3: "+data3)*/
	
	var dias = new Array(data1)
	
	console.log("dias:")
	console.log(dias)
	
	var strHTML = "<div class='row  form-group col-md-12'> "+
				  "		<ul class='nav nav-tabs clearfix mb-20' role='tablist'> "
	
	// PERCORRE TODOS OS DIAS QUE FORAM SALVOS
	for(var i=0;i<dias.length;i++){
		
		if(i==0){
			
			strHTML = strHTML + "<li class='active aba' onclick='selecionaDia(this)'><a href='' role='tab' data-toggle='tab'><span class='dias'><input type='hidden' id='ABA"+i+"' name='ABA"+i+"' value='"+dias[i]+"'>"+dias[i]+"</span></a></li> "
			
		} else {
			
			strHTML = strHTML + "<li class='aba' onclick='selecionaDia(this)'><a href='' role='tab' data-toggle='tab'><span class='dias'><input type='hidden' id='ABA"+i+"' name='ABA"+i+"' value='"+dias[i]+"'>"+dias[i]+"</span></a></li> "
			
		}
	
		/*strHTML = strHTML + " <li class='aba' id='ABA"+i+"'><span class='dias' onclick='selecionaDia(this)' onmouseover='mudaCor(this)' value='"+formataData(dias[i])+"'>"+formataData(dias[i])+"</span> "+*/
		
	}
	
	strHTML = strHTML + "</ul></div>"
	
	$("#DIAS").append(strHTML)
	$("#ABA0").click()
	
}

// SELECIONA O DIA
function selecionaDia(obj){
	
	console.log(obj)
	
	var dia = $(obj).children("a").children("span").children("input").val()
	
	var d = $(obj).children("a").children("span").children("input").attr("id").toString().replace("ABA","")
	//var d = $(obj).children("input").attr("id").toString().replace("ABA","")
	
	console.log("vou exibir dia: "+dia)
	
	// ESCONDE/MOSTRA A LINHA DE ACORDO COM A DATA
	$("input[id^='DATAPROGRAMADA___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		// SE A DATA É IGUAL AO DO DIA SELECIONADO
		/*if($("#DATAPROGRAMADA___"+seq).val()==dia){
			
			console.log("achei dia igual ao da primeira aba")
			
			// MOSTRA A LINHA
			$("#LINHAATV___"+seq).show()
			
		}else {
			// SE NÃO
			
			console.log("vou esconder")
			
			// ESCONDE A LINHA
			$("#LINHAATV___"+seq).hide()
			
		}*/
		
	})
	
	/*if(d=="0"){
		
		$(".HORASIMPRODUTIVASDIA1").show()
		$(".HORASIMPRODUTIVASDIA2").hide()
		$(".HORASIMPRODUTIVASDIA3").hide()
		
	}
	
	if(d=="1"){
		
		$(".HORASIMPRODUTIVASDIA1").hide()
		$(".HORASIMPRODUTIVASDIA2").show()
		$(".HORASIMPRODUTIVASDIA3").hide()
		
	}
	
	if(d=="2"){
		
		$(".HORASIMPRODUTIVASDIA1").hide()
		$(".HORASIMPRODUTIVASDIA2").hide()
		$(".HORASIMPRODUTIVASDIA3").show()
		
	}*/
	
}

// PREENCHE O DEFAULT DAS HORAS IMPRODUTIVAS
function preencheHorasImprodutivas(){
	
	// LINHA 1
	var row11 = addHoraImprD1()
	//var row21 = addHoraImprD2()
	//var row31 = addHoraImprD3()
	
	var row12 = addHoraImprD1()
	//var row22 = addHoraImprD2()
	//var row32 = addHoraImprD3()
	
	var row13 = addHoraImprD1()
	//var row23 = addHoraImprD2()
	//var row33 = addHoraImprD3()
	
	var row14 = addHoraImprD1()
	//var row24 = addHoraImprD2()
	//var row34 = addHoraImprD3()
	
	var row15 = addHoraImprD1()
	//var row25 = addHoraImprD2()
	//var row35 = addHoraImprD3()
	
	var row16 = addHoraImprD1()
	//var row26 = addHoraImprD2()
	//var row36 = addHoraImprD3()
	
	var row17 = addHoraImprD1()
	//var row27 = addHoraImprD2()
	//var row37 = addHoraImprD3()
	
	var row18 = addHoraImprD1()
	//var row28 = addHoraImprD2()
	//var row38 = addHoraImprD3()
	
	var row19 = addHoraImprD1()
	//var row29 = addHoraImprD2()
	//var row39 = addHoraImprD3()
	
	setTimeout(function(){
		
	window['TIPOD1___'+row11].setValue("ACQ - AGUARDANDO INSPEÇÃO")
	$("#CODTIPOD1___"+row11).val("ACQ")
	$("#DESCRICAOTIPOD1___"+row11).val("AGUARDANDO INSPEÇÃO")
	
	/*window["TIPOD2___"+row21].setValue("ACQ - AGUARDANDO INSPEÇÃO")
	$("#CODTIPOD2___"+row21).val("ACQ")
	$("#DESCRICAOTIPOD2___"+row21).val("AGUARDANDO INSPEÇÃO")
	
	window["TIPOD3___"+row31].setValue("ACQ - AGUARDANDO INSPEÇÃO")
	$("#CODTIPOD3___"+row31).val("ACQ")
	$("#DESCRICAOTIPOD3___"+row31).val("AGUARDANDO INSPEÇÃO")*/
	
	// LINHA 2
	
	window["TIPOD1___"+row12].setValue("ADM - COLABORADOR DIRETO EM SERVIÇO ADMINISTRATIVO")
	$("#CODTIPOD1___"+row12).val("ADM")
	$("#DESCRICAOTIPOD1___"+row12).val("COLABORADOR DIRETO EM SERVIÇO ADMINISTRATIVO")
	
	/*window["TIPOD2___"+row22].setValue("ADM - COLABORADOR DIRETO EM SERVIÇO ADMINISTRATIVO")
	$("#CODTIPOD2___"+row22).val("ADM")
	$("#DESCRICAOTIPOD2___"+row22).val("COLABORADOR DIRETO EM SERVIÇO ADMINISTRATIVO")
	
	window["TIPOD3___"+row32].setValue("ADM - COLABORADOR DIRETO EM SERVIÇO ADMINISTRATIVO")
	$("#CODTIPOD3___"+row32).val("ADM")
	$("#DESCRICAOTIPOD3___"+row32).val("COLABORADOR DIRETO EM SERVIÇO ADMINISTRATIVO")*/
	
	// LINHA 3
	
	window["TIPOD1___"+row13].setValue("AGM - AGUARDANDO MOVIMENTAÇÃO POR PONTE OU EMPILHADEIRA")
	$("#CODTIPOD1___"+row13).val("AGM")
	$("#DESCRICAOTIPOD1___"+row13).val("AGUARDANDO MOVIMENTAÇÃO POR PONTE OU EMPILHADEIRA")
	
	/*window["TIPOD2___"+row23].setValue("AGM - AGUARDANDO MOVIMENTAÇÃO POR PONTE OU EMPILHADEIRA")
	$("#CODTIPOD2___"+row23).val("AGM")
	$("#DESCRICAOTIPOD2___"+row23).val("AGUARDANDO MOVIMENTAÇÃO POR PONTE OU EMPILHADEIRA")
	
	window["TIPOD3___"+row33].setValue("AGM - AGUARDANDO MOVIMENTAÇÃO POR PONTE OU EMPILHADEIRA")
	$("#CODTIPOD3___"+row33).val("AGM")
	$("#DESCRICAOTIPOD3___"+row33).val("AGUARDANDO MOVIMENTAÇÃO POR PONTE OU EMPILHADEIRA")*/
	
	// LINHA 4
	
	window["TIPOD1___"+row14].setValue("AIT - AGUARDANDO INFORMAÇÕES TÉCNICAS")
	$("#CODTIPOD1___"+row14).val("AIT")
	$("#DESCRICAOTIPOD1___"+row14).val("AGUARDANDO INFORMAÇÕES TÉCNICAS")
	
	/*window["TIPOD2___"+row24].setValue("AIT - AGUARDANDO INFORMAÇÕES TÉCNICAS")
	$("#CODTIPOD2___"+row24).val("AIT")
	$("#DESCRICAOTIPOD2___"+row24).val("AGUARDANDO INFORMAÇÕES TÉCNICAS")
	
	window["TIPOD3___"+row34].setValue("AIT - AGUARDANDO INFORMAÇÕES TÉCNICAS")
	$("#CODTIPOD3___"+row34).val("AIT")
	$("#DESCRICAOTIPOD3___"+row34).val("AGUARDANDO INFORMAÇÕES TÉCNICAS")*/
	
	// LINHA 5
	
	window["TIPOD1___"+row15].setValue("AMN - AGUARDANDO MANUTENÇÃO EM EQUIPAMENTOS")
	$("#CODTIPOD1___"+row15).val("AMN")
	$("#DESCRICAOTIPOD1___"+row15).val("AGUARDANDO MANUTENÇÃO EM EQUIPAMENTOS")
	
	/*window["TIPOD2___"+row25].setValue("AMN - AGUARDANDO MANUTENÇÃO EM EQUIPAMENTOS")
	$("#CODTIPOD2___"+row25).val("AMN")
	$("#DESCRICAOTIPOD2___"+row25).val("AGUARDANDO MANUTENÇÃO EM EQUIPAMENTOS")
	
	window["TIPOD3___"+row35].setValue("AMN - AGUARDANDO MANUTENÇÃO EM EQUIPAMENTOS")
	$("#CODTIPOD3___"+row35).val("AMN")
	$("#DESCRICAOTIPOD3___"+row35).val("AGUARDANDO MANUTENÇÃO EM EQUIPAMENTOS")*/

	// LINHA 6
	
	window["TIPOD1___"+row16].setValue("AQF - AFIACAO OU QUEBRA DE FERRAMENTAS")
	$("#CODTIPOD1___"+row16).val("AQF")
	$("#DESCRICAOTIPOD1___"+row16).val("AFIACAO OU QUEBRA DE FERRAMENTAS")
	
	/*window["TIPOD2___"+row26].setValue("AQF - AFIACAO OU QUEBRA DE FERRAMENTAS")
	$("#CODTIPOD2___"+row26).val("AQF")
	$("#DESCRICAOTIPOD2___"+row26).val("AFIACAO OU QUEBRA DE FERRAMENTAS")
	
	window["TIPOD3___"+row36].setValue("AQF - AFIACAO OU QUEBRA DE FERRAMENTAS")
	$("#CODTIPOD3___"+row36).val("AQF")
	$("#DESCRICAOTIPOD3___"+row36).val("AFIACAO OU QUEBRA DE FERRAMENTAS")*/

	// LINHA 7
	
	window["TIPOD1___"+row17].setValue("FTC - FALTA DE CONSUMIVEIS PARA EXECUÇÃO DE ATIVIDADES")
	$("#CODTIPOD1___"+row17).val("FTC")
	$("#DESCRICAOTIPOD1___"+row17).val("FALTA DE CONSUMIVEIS PARA EXECUÇÃO DE ATIVIDADES")
	
	/*window["TIPOD2___"+row27].setValue("FTC - FALTA DE CONSUMIVEIS PARA EXECUÇÃO DE ATIVIDADES")
	$("#CODTIPOD2___"+row27).val("FTC")
	$("#DESCRICAOTIPOD2___"+row27).val("FALTA DE CONSUMIVEIS PARA EXECUÇÃO DE ATIVIDADES")
	
	window["TIPOD3___"+row37].setValue("FTC - FALTA DE CONSUMIVEIS PARA EXECUÇÃO DE ATIVIDADES")
	$("#CODTIPOD3___"+row37).val("FTC")
	$("#DESCRICAOTIPOD3___"+row37).val("FALTA DE CONSUMIVEIS PARA EXECUÇÃO DE ATIVIDADES")*/

	// LINHA 8
	
	window["TIPOD1___"+row18].setValue("SRM - AMBULATORIO, RH, SESMT, CIPA")
	$("#CODTIPOD1___"+row18).val("SRM")
	$("#DESCRICAOTIPOD1___"+row18).val("AMBULATORIO, RH, SESMT, CIPA")
	
	/*window["TIPOD2___"+row28].setValue("SRM - AMBULATORIO, RH, SESMT, CIPA")
	$("#CODTIPOD2___"+row28).val("SRM")
	$("#DESCRICAOTIPOD2___"+row28).val("AMBULATORIO, RH, SESMT, CIPA")
	
	window["TIPOD3___"+row38].setValue("SRM - AMBULATORIO, RH, SESMT, CIPA")
	$("#CODTIPOD3___"+row38).val("SRM")
	$("#DESCRICAOTIPOD3___"+row38).val("AMBULATORIO, RH, SESMT, CIPA")*/
	
	// LINHA 9
	
	window["TIPOD1___"+row19].setValue("TRE - TREINAMENTO DO COLABORADOR DIRETO")
	$("#CODTIPOD1___"+row19).val("TRE")
	$("#DESCRICAOTIPOD1___"+row19).val("TREINAMENTO DO COLABORADOR DIRETO")
	
	/*window["TIPOD2___"+row29].setValue("TRE - TREINAMENTO DO COLABORADOR DIRETO")
	$("#CODTIPOD2___"+row29).val("TRE")
	$("#DESCRICAOTIPOD2___"+row29).val("TREINAMENTO DO COLABORADOR DIRETO")
	
	window["TIPOD3___"+row39].setValue("TRE - TREINAMENTO DO COLABORADOR DIRETO")
	$("#CODTIPOD3___"+row39).val("TRE")
	$("#DESCRICAOTIPOD3___"+row39).val("TREINAMENTO DO COLABORADOR DIRETO")*/

	},500)
	
}

// SALVA A DATA DE APONTAMENTO REAL EM FORMATO PARA O BANCO
function salvaDataApontReal(obj){
	
	var dataApont = $(obj).val()
	
	var seq = $(obj).attr("id").split("___")[1]
	
	console.log("data informada: "+dataReal)
	
	var dataReal = formataDataBanco(dataApont)
	
	console.log("vou salvar a data: "+dataReal)
	
	// SALVA A DATA REAL NO FORMATO BANCO QUE FOI APONTADA
	$("#DATAAPONTREAL___"+seq).val(dataReal)
	
}

// ATUALIZA A TABELA COMPONENTES
/*function atualizaComponentes(seq){
	
	
	
}*/

////////////////////////////////////////////////////////////////


// REALIZA O APONTAMENTO
function apontar(colleagueId,nextSequenceId,userList){
		
	//log.info("beforeTaskSave - PROCESSO DE APONTAMENTO");
	console.log("PROCESSO DE APONTAMENTO");
	
	/*var ativAtual = getValue("WKNumState");
	var numProcess = getValue("WKNumProces");
	var WKUser = getValue("WKUser");*/
	
	var ativAtual = $("#ATIVIDADE").val();
	var numProcess = $("#NUMPROCESSO").val();
	var WKUser = $("#USUARIOATUAL").val();

	//var indexes = hAPI.getChildrenIndexes("ATIVIDADES");
	
	/*log.info("vou percorrer todos os itens da tabela de atividades")
	
	log.info("a tabela tem "+indexes.length+" itens")*/
	
	console.log("vou percorrer todos os itens da tabela de atividades")
	
	//console.log("a tabela tem "+indexes.length+" itens")
	
	// PERCORRE TODOS OS REGISTROS DA TABELA DE APONTAMENTO
	//for (var i = 0; i < indexes.length; i++) {
	$("input[id^='CODIGOPRD___']").each(function(){
		  
		//log.info("estou no item "+(i+1))
		
		var seq = $(this).attr("id").split("___")[1]
		
		console.log("estou no item "+seq)
		
		var idmovbx = ""
		var idmov = ""
		var saldo = $("#SALDOTRABALHADO___" + seq).val()
		var avanco = $("#AVANCO___" + seq).val()
		var idAtv = $("#IDATIVIDADE___" + seq).val()
		var codColigada = $("#CODCOLIGADAATV___" + seq).val()
		var codFilial = $("#CODFILIALATV___" + seq).val()
		var seqAtv = seq
		var codigoPrd = $("#CODIGOPRD___" + seq).val()
		var idprd = $("#IDPRD___" + seq).val()
		var idAtv = $("#IDATIVIDADE___" + seq).val()
		var codOrdem = $("#OP___" + seq).val()
		var codEstrutura = $("#CODESTRUTURAATV___" + seq).val()
		
		console.log("codigoPrd: "+codigoPrd)
		var codAux = codigoPrd.toString().substr(0,1)	
		
		
		var codloc = codAux
		
		//log.info("coloc: "+codloc)
		console.log("codloc: "+codloc)

		// SE SALDO E AVANCO FORAM PREENCHIDOS
		if(!(saldo=="" || saldo==null || saldo==undefined || avanco=="" || avanco==null || avanco==undefined)){
			
			log.info("o item "+(i+1)+" tem saldo e avanço")
			
			log.info("vou gerar o movimento de baixa dos componentes do item "+(i+1))
			
			console.log("o item "+seq+" tem saldo e avanço")
			
			console.log("vou gerar o movimento de baixa dos componentes do item "+seq)
			
			// GERA O MOVIMENTO DE BAIXA DO ESTOQUE
			idmovbx = geraMovBaixa(numProcess, codColigada, codFilial, codloc, WKUser, idAtv, seqAtv);
			
		}

		/*$("input[id^='SSOP___']").each(function(){

			var row1 = $(this).attr("id").split("___")[1]
			var op1 = $(this).val()

			if( codOrdem == op1 ){

				/*log.info("o item "+(i+1)+" tem saldo e avanço")
			
				log.info("vou gerar o movimento de baixa dos componentes do item "+(i+1))
				
				//log.info("vou gerar o movimento de entrada do item "+(i+1))
				console.log("vou verificar o movimento de entrada do item "+seq)
				saldo = parseInt($("#SSQTDSUBIRSALDO___"+row1).val())

				if(saldo>=1){

					console.log("vou subir "+saldo+" de saldo")
					// GERA O MOVIMENTO DE ENTRADA DO ESTOQUE
					idmov = geraMovEntrada(numProcess, codColigada, codFilial, codloc, WKUser, codOrdem, idprd, saldo);

				}
			}

		})*/

		/*$("input[id^='BAOP___']").each(function(){

			var row2 = $(this).attr("id").split("___")[1]
			var op2 = $(this).val()
			var idAtvOrdem = $("#BAIDATV___"+row2).val()

			if( codOrdem == op2 && idAtvOrdem == idAtv){

				console.log("vou gerar o movimento de baixa dos componentes do item "+seq)
						
				// GERA O MOVIMENTO DE BAIXA DO ESTOQUE
				idmovbx = geraMovBaixa(numProcess, codColigada, codFilial, codloc, WKUser, idAtv, seqAtv);
			
			}
		
		})*/
		
		
		// SE IDMOV E IDMOVBX FORAM GERADOS
		if(!(idmovbx==""||idmovbx==null || idmovbx==undefined) && !(idmov=="" || idmov==null || idmov==undefined)){
			
			//log.info("gerei o idmovbx "+idmovbx+" e o idmov "+idmov)
			console.log("gerei o idmovbx "+idmovbx+" e o idmov "+idmov)
			
			idmov   = idmov.split(";")[1];
			idmovbx = idmovbx.split(";")[1];
			
			var encerra  = $("#ENCERRA___" + seq);
			
			if (encerra == ""){ 
				
				encerra = "N"
				
			} else {
				
				encerra = "S"
				
			}
			
			/*log.info("a baixa é completa? "+encerra)
			
			log.info("vou executar a procedure do apontamento")*/
			
			console.log("a baixa é completa? "+encerra)
			
			console.log("vou executar a procedure do apontamento")
			
		 	var a1 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST);
		 	var a2 = DatasetFactory.createConstraint("IDMOV",idmov,idmov,ConstraintType.MUST);
		 	var a3 = DatasetFactory.createConstraint("IDMOVBAIXA",idmovbx,idmovbx,ConstraintType.MUST);
		 	var a4 = DatasetFactory.createConstraint("ENCERRA",encerra,encerra,ConstraintType.MUST);
		 	var a5 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST);
		 	var a6 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST);
		 	var a7 = DatasetFactory.createConstraint("CODESTRUTURA",codEstrutura,codEstrutura,ConstraintType.MUST);
		 	var a8 = DatasetFactory.createConstraint("DATAAPONTAMENTO",dataAtualFormatada(),dataAtualFormatada(),ConstraintType.MUST);
		 	var a9 = DatasetFactory.createConstraint("CODESTRUTURA",codEstrutura,codEstrutura,ConstraintType.MUST);

		 	var constraints = new Array(a1,a2,a3,a4,a5,a6,a7,a8,a9);
		 	var dataset = DatasetFactory.getDataset("dsProcedureApontamento",null,constraints,null);
		
		 	//log.info("executei a procedure do apontamento")
		 	console.log("executei a procedure do apontamento")
		 	
		}

	})

}

// GERA O MOVIMENTO DE BAIXA DO ESTOQUE
function geraMovBaixa(numProcess, codColigada, codFilial, codloc, WKUser, idAtv, seqAtv){
	
	/*log.info("MOVIMENTO DE BAIXA DO ESTOQUE")
	
	log.info("Parâmetros: numProcess: "+numProcess+", codColigada: "+codColigada+", codFilial: "+codFilial+", codloc: "+codloc+", WKUser: "+WKUser+", idAtv: "+idAtv+", seqAtv: "+seqAtv)
	*/
	
	console.log("MOVIMENTO DE BAIXA DO ESTOQUE")
	
	console.log("Parâmetros: numProcess: "+numProcess+", codColigada: "+codColigada+", codFilial: "+codFilial+", codloc: "+codloc+", WKUser: "+WKUser+", idAtv: "+idAtv+", seqAtv: "+seqAtv)
	
	var NOME_DATASERVER = "MovMovimentoTBCData" 
	var usuario = "luiz.lunardi" 
    var senha = "@Pg24221717"  		   
	var authService = getWebService(usuario, senha) 
	var context = "CodUsuario=luiz.lunardi;CodSistema=T;CodColigada="+codColigada
	var nseq = 0
	var ret  = ""
		
	var XML =
		    "<MovMovimento >" +   
			"  <TMOV>" +   
			"    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" +   
			"    <IDMOV>-1</IDMOV>" +   
			"    <CODFILIAL>" + codFilial + "</CODFILIAL>" +   
			"    <CODLOC>" + codloc + "</CODLOC>" +   
			"    <CODLOCENTREGA>" + codloc + "</CODLOCENTREGA>" +   
			"    <CODLOCDESTINO>" + codloc + "</CODLOCDESTINO>" +   
			"    <CODTMV>2.2.46</CODTMV>" +   
			"    <TIPO>A</TIPO>" +   
			"    <DATAEMISSAO>"+dataAtualFormatada()+"</DATAEMISSAO>" +   
			"    <DATABASEMOV>"+dataAtualFormatada()+"</DATABASEMOV>" +   
			"    <DATAMOVIMENTO>"+dataAtualFormatada()+"</DATAMOVIMENTO>" +   
			"    <CODFILIALDESTINO>" + codFilial + "</CODFILIALDESTINO>" +   
			"    <DATALANCAMENTO>"+dataAtualFormatada()+"</DATALANCAMENTO>" +   
			"  </TMOV>" +  
			
			"  <TNFE>" +   
			"    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" +   
			"    <IDMOV>-1</IDMOV>" +   
			"  </TNFE>" +   
			"  <TMOVFISCAL>" +   
			"    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" +   
			"    <IDMOV>-1</IDMOV>" +   
			"  </TMOVFISCAL>" 

	//var indexes = hAPI.getChildrenIndexes("COMPONENTESGERAL")
	
	/*log.info("vou percorrer todos os itens da tabela de componentes")
	
	log.info("a tabela tem "+indexes.length+" itens")*/
	
	console.log("vou percorrer todos os itens da tabela de componentes")
	
	//console.log("a tabela tem "+indexes.length+" itens")
	
	var produtosLote = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA DE COMPONENTES GERAL
	//for (var i = 0; i < indexes.length; i++){
	$("input[id^='CODIGOCOMPG___']").each(function(){
	
		var seq = $(this).attr("id").split("___")[1]
	
		//log.info("vou buscar todos os componentes")
		console.log("vou buscar todos os componentes")
		
		//var qtde = hAPI.getCardValue("QTDEUTG___" + indexes[i])
		
		// SE QUANTIDADE DO COMPONENTE FOI INFORMADA
		if(!(qtde=="" || qtde==null || qtde==undefined)){
	  		      
			/*var idprd = hAPI.getCardValue("IDPRDCOMPG___"+indexes[i])
			var seqAtvComp = hAPI.getCardValue("SEQATV___" + indexes[i])*/
			
			var idprd = $("#IDPRDCOMPG___"+seq).val()
			var seqAtvComp = $("#SEQATV___" + seq).val()
			
			// SE ITEM PERTENCE A ATIVIDADE QUE ESTÁ SENDO APONTADA
			if(seqAtv==seqAtvComp){
				
				//log.info("achei componente do item na tabela de componentes gerais")
				
				console.log("achei componente do item na tabela de componentes gerais")
				
				// VERIFICA SE COMPONENTE JÁ NÃO FOI INCLUIDO
				if(!(produtosLote.includes(idprd))){
					
					//log.info("idprd: "+idprd+" ainda não foi dado baixa")
					
					console.log("idprd: "+idprd+" ainda não foi dado baixa")
					
					// BUSCA O TOTAL DA QUANTIDADE DO COMPONENTE QUE ESTÁ SENDO APONTADO
					var qtde = buscaQtdeTotal(idprd, seqAtv) 
					
					nseq = nseq + 1
					
		    		XML = XML +    
					"  <TITMMOV>" +   
					"    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" +   
					"    <IDMOV>-1</IDMOV>" +   
					"    <NSEQITMMOV>"+nseq+"</NSEQITMMOV>" +   
					"    <CODFILIAL>" + codFilial + "</CODFILIAL>" +   
					"    <NUMEROSEQUENCIAL>"+nseq+"</NUMEROSEQUENCIAL>" +   
					"    <IDPRD>" + idprd + "</IDPRD>" +
					"    <QUANTIDADE>" + qtde + "</QUANTIDADE>" +   
					"    <PRECOUNITARIO>1</PRECOUNITARIO>" +   
					"    <DATAEMISSAO>"+dataAtualFormatada()+"</DATAEMISSAO>" +   
					"    <CODLOC>" + codloc + "</CODLOC>" +   
					"  </TITMMOV>"
				
					// BUSCA TODOS OS LOTES DO PRODUTO E QUANTIDADES CONSUMIDAS
					XML = XML + montarXmlLotes(idprd, codColigada, nseq, seqAtv)
					
					XML = XML +   
					"  <TITMMOVCOMPL>"+
					"    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" +   
					"    <IDMOV>-1</IDMOV>" +  
					"    <NSEQITMMOV>"+nseq+"</NSEQITMMOV>" +   
					"    <IDATIVIDADE>"+idAtv+"</IDATIVIDADE>"+
					"  </TITMMOVCOMPL>"
					
					// INCLUI O IDPRD NO ARRAY DOS PRODUTOS
					produtosLote.push(idprd)
					
				}
				    		
			}
			
		}

	})
	
	XML = XML +    
	   "  <TMOVCOMPL>" +   
	   "    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" +      
	   "    <IDMOV>-1</IDMOV>" +   
	   "    <NUMFLUIG>"+numProcess+"</NUMFLUIG>" +
	   "    <USERFLUIG>"+WKUser+"</USERFLUIG>" +		   
	   "  </TMOVCOMPL>"+   
	   "</MovMovimento>"
	   
	/*log.info( "Fluig "+numProcess+" Gerar Movimento Baixa Atualizada.")
	log.info( "Contexto do movimento: "+context)	
	log.info( "XML do movimento de BAIXA é "+XML)*/

	console.log( "Fluig "+numProcess+" Gerar Movimento Baixa Atualizada.")
	console.log( "Contexto do movimento: "+context)	
	console.log( "XML do movimento de BAIXA é "+XML)   
	 
	try{
		
		var result = new String(authService.saveRecord(NOME_DATASERVER, XML, context))
		//log.info("Fluig "+numProcess+". Integração com RM - BAIXA DE MATERIAL - resultado "+result)
		console.log("Fluig "+numProcess+". Integração com RM - BAIXA DE MATERIAL - resultado "+result)
		ret = result
		//log.info("result da baixa: "+result)
		console.log("result da baixa: "+result)
		//hAPI.setCardValue("IDMOVBAIXA",result);
		
	   	if (result.length > 50){
	   		
	   		var mensagemErro = result
	   		throw mensagemErro
	   		
	   	}
	   	
    } catch (e){  
    	
        if (e == null)  e = "Erro desconhecido!"  
        var mensagemErro = "Ocorreu um erro ao salvar dados no RM (geraMovBaixa coligada "+codcol+" ): " + e  
        
        throw mensagemErro;  
        
    }
 
    return ret
  
}

// VERIFICA SE O LOTE TEM SALDO SUFICIENTE
function verificaSaldoLote(idLote){
	
	
	
}

// BUSCA TODOS OS LOTES DOS COMPONENTES E QUANTIDADES CONSUMIDAS
function montarXmlLotes(idprd, codColigada, nseq, seqAtv){
	
	var XML = ""
	
	//log.info("Vou monntar XML para os lotes")
		
	console.log("Vou monntar XML para os lotes")
		
	// PERCORRE TODOS OS REGISTROS DA TABELA DE COMPONENTES
	//for(var i=0; i<indexesTam; i++){
	
	$("input[id^='CODIGOCOMPG___']").each(function(){
	
		var seq = $(this).attr("id").split("___")[1]
		
		/*var idLote = hAPI.getCardValue("IDLOTECOMPG___" + indexesTam[i])
		var qtde = hAPI.getCardValue("QTDEUTG___" + indexesTam[i])
		var idPrdComp = hAPI.getCardValue("IDPRDCOMPG___" + indexesTam[i]) 
		var seqAtvComp = hAPI.getCardValue("SEQATV___" + indexes[i])*/

		var idLote = $("#IDLOTECOMPG___" + seq).val()
		var qtde = $("#QTDEUTG___" + seq).val()
		var idPrdComp = $("#IDPRDCOMPG___" + seq).val() 
		var seqAtvComp = $("#SEQATV___" + seq).val()
		
		// SE ITEM PERTENCE A ATIVIDADE QUE ESTÁ SENDO APONTADA
		if(seqAtv==seqAtvComp){
		
			// SE É O MESMO PRODUTO E QUANTIDADE FOI CONSUMIDA
			if(idprd==idPrdComp && !(qtde=="" || qtde==null || qtde==undefined)){
				
				// SE QUANTIDADE TEM VÍRGULA
				if(qtde.indexOf(",")!=-1){
					
					qtde = qtde.toString().replace(",",".")
					
				}
				
				qtde = parseFloat(qtde)
				
				XML = XML +
			      "  <TITMLOTEPRD>" + 
			      "    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" + 
			      "    <IDMOV>-1</IDMOV>" +   
			      "    <NSEQITMMOV>"+nseq+"</NSEQITMMOV>" +
			      "    <IDLOTE>"+idLote+"</IDLOTE>" +    
			      "	 <QUANTIDADE2>"+qtde+"</QUANTIDADE2>" + 
			      "  </TITMLOTEPRD>"
				
			}
			
		}
			
	})	
	
	/*log.info("XML após para os lotes: ")
	log.info(XML)*/
	
	console.log("XML após para os lotes: ")
	console.log(XML)
	
	return XML
	
}

// BUSCA O TOTAL DA QUANTIDADE DO COMPONENTE QUE ESTÁ SENDO APONTADO
function buscaQtdeTotal(idprd, seqAtv){
	
	var qtdeTotal = 0
	
	//log.info("Vou buscar a qtdeTotal do item idprd: "+idprd)
	console.log("Vou buscar a qtdeTotal do item idprd: "+idprd)
	
	// PERCORRE TODOS OS REGISTROS DA TABELA DE COMPONENTES
	//for(var i=0; i<indexesTam; i++){
	
	$("input[id^='CODIGOCOMPG___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		/*var idprdComp = hAPI.getCardValue("IDPRDCOMPG___" + indexes[i])
		var qtdeComp = hAPI.getCardValue("QTDEUTG___" + indexes[i])
		var seqAtvComp = hAPI.getCardValue("SEQATV___" + indexes[i])*/

		var idprdComp = $("#IDPRDCOMPG___" + seq).val()
		var qtdeComp = $("#QTDEUTG___" + seq).val()
		var seqAtvComp = $("#SEQATV___" + seq).val()
		
		// SE ITEM PERTENCE A ATIVIDADE QUE ESTÁ SENDO APONTADA
		if(seqAtv==seqAtvComp){
			
			// SE IDPRD DO ITEM É O MESMO DO PARÂMETRO E QUANTIDADE FOI CONSUMIDA
			if(idprdComp==idprd && !(qtdeComp=="" || qtdeComp==null || qtdeComp==undefined)){
				
				// SE QUANTIDADE TEM VÍRGULA
				if(qtdeComp.indexOf(",")!=-1){
					
					qtdeComp = qtdeComp.toString().replace(",",".")
					
				}
				
				qtdeComp = parseFloat(qtdeComp)
				
				qtdeTotal = qtdeTotal + qtdeComp  
				
			}
			
		}

	})	
	
	//log.info("a qtdeTotal de idprd: "+idprd+" é "+qtdeTotal)
	console.log("a qtdeTotal de idprd: "+idprd+" é "+qtdeTotal)
	
	return qtdeTotal
	
} 

// GERA O MOVIMENTO DE ENTRADA DE ESTOQUE
function geraMovEntrada(numProcess, codColigada, codFilial, codloc, WKUser, codOrdem, idprd, qtde){
	
	/*log.info("MOVIMENTO DE ENTRADA DO ESTOQUE")
	
	log.info("Parâmetros: numProcess: "+numProcess+", codColigada: "+codColigada+", codFilial: "+codFilial+", codloc: "+codloc+", WKUser: "+WKUser+
			", codOrdem: "+codOrdem+", idprd: "+idprd+", qtde: "+qtde)*/
	
	console.log("MOVIMENTO DE ENTRADA DO ESTOQUE")
	
	console.log("Parâmetros: numProcess: "+numProcess+", codColigada: "+codColigada+", codFilial: "+codFilial+", codloc: "+codloc+", WKUser: "+WKUser+
			", codOrdem: "+codOrdem+", idprd: "+idprd+", qtde: "+qtde)
	
	var NOME_DATASERVER = "MovMovimentoTBCData"  
	var usuario = "luiz.lunardi" 
    var senha = "@Pg24221717"  		   
	var authService = getWebService(usuario, senha) 
	var context = "CodUsuario=luiz.lunardi;CodSistema=T;CodColigada="+codColigada
	var nseq = 0
	var ret  = ""
	
	var XML = 
		    "<MovMovimento >" +   
			"  <TMOV>" +   
			"    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" +   
			"    <IDMOV>-1</IDMOV>" +   
			"    <CODFILIAL>" + codFilial + "</CODFILIAL>" +   
			"    <CODLOC>" + codloc + "</CODLOC>" +   
			"    <CODLOCENTREGA>" + codloc + "</CODLOCENTREGA>" +   
			"    <CODLOCDESTINO>" + codloc + "</CODLOCDESTINO>" +   
			"    <CODTMV>1.2.37</CODTMV>" +   
			"    <TIPO>A</TIPO>" +   
			"    <DATAEMISSAO>"+dataAtualFormatada()+"</DATAEMISSAO>" +   
			"    <DATABASEMOV>"+dataAtualFormatada()+"</DATABASEMOV>" +   
			"    <DATAMOVIMENTO>"+dataAtualFormatada()+"</DATAMOVIMENTO>" +   
			"    <CODFILIALDESTINO>" + codFilial + "</CODFILIALDESTINO>" +   
			"    <DATALANCAMENTO>"+dataAtualFormatada()+"</DATALANCAMENTO>" +   
			"  </TMOV>" +  
			
			"  <TNFE>" +   
			"    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" +   
			"    <IDMOV>-1</IDMOV>" +   
			"  </TNFE>" +   
			"  <TMOVFISCAL>" +   
			"    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" +   
			"    <IDMOV>-1</IDMOV>" +   
			"  </TMOVFISCAL>" 
	
		XML = XML +    
			"  <TITMMOV>" +   
			"    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" +   
			"    <IDMOV>-1</IDMOV>" +   
			"    <NSEQITMMOV>1</NSEQITMMOV>" +   
			"    <CODFILIAL>" + codFilial + "</CODFILIAL>" +   
			"    <NUMEROSEQUENCIAL>1</NUMEROSEQUENCIAL>" +   
			"    <IDPRD>"+idprd+"</IDPRD>" +
			"    <QUANTIDADE>"+qtde+"</QUANTIDADE>" +   
			"    <PRECOUNITARIO>1</PRECOUNITARIO>" +   
			"    <DATAEMISSAO>"+dataAtualFormatada()+"</DATAEMISSAO>" +   
			"    <CODLOC>" + codloc + "</CODLOC>" +   
			"  </TITMMOV>"
	
			// GERAR LOTE
			var idLote = geraLote(codColigada, idprd, codOrdem)
			
			// APONTAR A ENTRADA NO LOTE
			XML = XML +
		      "  <TITMLOTEPRD>" + 
		      "    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" + 
		      "    <IDMOV>-1</IDMOV>" +   
		      "    <NSEQITMMOV>1</NSEQITMMOV>" +
		      "    <IDLOTE>"+idLote+"</IDLOTE>" +    
		      "	 <QUANTIDADE2>"+qtde+"</QUANTIDADE2>" + 
		      "  </TITMLOTEPRD>"
		      
			XML = XML +    
			   "  <TMOVCOMPL>" +   
			   "    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" +      
			   "    <IDMOV>-1</IDMOV>" +   
			   "    <NUMFLUIG>"+numProcess+"</NUMFLUIG>" +
			   "    <USERFLUIG>"+WKUser+"</USERFLUIG>" +		   
			   "  </TMOVCOMPL>"+   
			   "</MovMovimento>"
			  
		    console.log("Fluig "+numProcess+" Gerar Movimento.")
			console.log("Contexto do movimento: "+context)	
			
		    console.log("XML do movimnto é "+XML)
			   
			/*log.info("Fluig "+numProcess+" Gerar Movimento.")
			log.info("Contexto do movimento: "+context)	
			
		    log.info("XML do movimnto é "+XML)*/
		   
	   try{
		   
		   var result = new String(authService.saveRecord(NOME_DATASERVER, XML, context))
	
		   //log.info("Fluig "+numProcess+".integracao com RM resultado "+result)
		   
		   console.log("Fluig "+numProcess+".integracao com RM resultado "+result)
		   
		   //hAPI.setCardValue("IDMOV",result)
		   
		   ret = result
		   
		   //hAPI.setCardValue("NUMPROCESSO",numProcess)
	
		   if (result.length > 50){
			   
			 var mensagemErro = result 
			 throw mensagemErro
			 
		   }
		   
	    }catch(e){
	    	
	        if (e == null)  e = "Erro desconhecido!" 
	        
	        var mensagemErro = "Ocorreu um erro ao salvar dados no RM (geraMovEntrada - coligada "+codcol+" ): " + e
	        
	        throw mensagemErro  
	    
	    }	
	   
    return ret

}

// GERAR LOTE
function geraLote(codColigada, idprd, codOrdem){

	var NOME_DATASERVER = "EstPrdLoteData";
	//var numProcess = getValue("WKNumProces");
	var numProcess = $("#NUMPROCESSO").val()
	var usuario = "luiz.lunardi" 
    var senha = "@Pg24221717"  		   
	var authService = getWebService(usuario, senha) 
	var context = "CodUsuario=luiz.lunardi;CodSistema=T;CodColigada="+codColigada
	var XML	= "";
    
	XML = 	"<EstPrdLote> ";
	        
    XML = XML +
        	"    <TLotePrd>  " +
            "      <CODCOLIGADA>"+codcoligada+"</CODCOLIGADA>  " +
            "      <IDLOTE>-1</IDLOTE>  " +
            "      <IDSTATUS>2</IDSTATUS>  " +
            "      <IDPRD>"+idprd+"</IDPRD>  " +
            "      <NUMLOTE>"+codOrdem+"</NUMLOTE>  " +
            "      <DATAFABRICACAO>"+dataAtualFormatada()+"</DATAFABRICACAO>  " +
            "      <DATAENTRADA>"+dataAtualFormatada()+"</DATAENTRADA>  " +
            "      <DATAVALIDADE></DATAVALIDADE>  " +
            "    </TLotePrd>  " ;
            
    //log.info("*** CRM *** Passei pela criação do Lote.");

    console.log("*** CRM *** Passei pela criação do Lote.");
    
   	XML = XML + "  </EstPrdLote> ";
    
    //log.info("*** CRM *** contexto "+context+" - Nome dataserver "+NOME_DATASERVER);
   	console.log("*** CRM *** contexto "+context+" - Nome dataserver "+NOME_DATASERVER);
   	
    //log.info("*** CRM *** Lote será criado com esse XML "+XML);
   	console.log("*** CRM *** Lote será criado com esse XML "+XML);
   	
    var result = new String(authService.saveRecord(NOME_DATASERVER, XML, context));
    
    result = result.split(";")[1]
    
    console.log("idLote: "+idLote)
    
    return result

}

function getWebService(Usuario, Senha){

	var Nome_Servico = "WSRM";
	var Caminho_Servico = "com.totvs.WsDataServer";
	 
	var dataServerService = ServiceManager.getServiceInstance(Nome_Servico);
	if(dataServerService == null){
		throw "Servico nao encontrado: " + Nome_Servico;
	}
	
	var serviceLocator = dataServerService.instantiate(Caminho_Servico);
	if(serviceLocator == null){
		throw "Instancia do servico nao encontrada: " + Nome_Servico + " - " + Caminho_Servico;
	}

	var service = serviceLocator.getRMIwsDataServer();	
	if(service == null){
		throw "Instancia do dataserver do invalida: " + Nome_Servico + " - " + Caminho_Servico;
	}

	var serviceHelper = dataServerService.getBean();
	if(serviceHelper == null){
		throw "Instancia do service helper invalida: " + Nome_Servico + " - " + Caminho_Servico;
	}

	var authService = serviceHelper.getBasicAuthenticatedClient(service, "com.totvs.IwsDataServer", Usuario, Senha);	  
	if(serviceHelper == null){
		throw "Instancia do auth service invalida: " + Nome_Servico + " - " + Caminho_Servico;
	}
	
	return authService;
	
}

function dcReadView(dataservername, context, usuario, senha, filtro){	 
   // carrega o webservice...
	  var authService = getWebService(usuario, senha);
	  
   // lê os dados da visão respeitando o filtro passado
	  var viewData = new String(authService.readView(dataservername, filtro, context));

	  return viewData;
	  
}

function dcReadRecord(dataservername, context, usuario, senha, primaryKey){	 
   // carrega o webservice...
	  var authService = getWebService(usuario, senha);

   // lê os dados do registro respeitando a pk passada
	  try
	  {
		var recordData = new String(authService.readRecord(dataservername, primaryKey, context));
	  }
	  catch (e) 
	  {
		  var recordData = new String(authService.getSchema(dataservername, context));
	  }
	  
	  return recordData;
	  
}


function dcSaveRecord(dataservername, context, usuario, senha, xml){	 
   // carrega o webservice...
	  var authService = getWebService(usuario, senha);

   // salva o registro de acordo com o xml passado
	  var pk = new String(authService.readRecord(dataservername, xml, context));
	  	  
	  return pk;
	  
}


// Transforma o conceito de constraints do Fluig para o Filtro do TBC.
function parseConstraints(constraints, filterRequired){
	
	// inicializa o resultado...
	var result = [];
	result.context = "";
	
	// inicializa o filtro...
	var filter = "";
	
	// varre as contraints...
	 for	(con in constraints) {
	 	var fieldName = con.getFieldName().toUpperCase();
	 	if (fieldName == "RMSCONTEXT")
	 	{
	 		result.context = con.getInitialValue();
	 		continue;
	 	}
	 	
	 	filter += "(";
	 	
	 	if (fieldName == "RMSFILTER")
			{
	 		filter += con.getInitialValue();
			}
	 	else
			{
	 		if (con.getInitialValue() == con.getFinalValue() || isEmpty(con.getFinalValue()))
				{
					filter += con.getFieldName();
					var isLike = false;
					switch(con.getConstraintType())
					{
						case ConstraintType.MUST:
							filter += " = ";
						break;
						case ConstraintType.MUST_NOT:
							filter += " = ";
						break;
						case ConstraintType.SHOULD:
							filter += " LIKE ";
							isLike = true;
						break;
						case ConstraintType.SHOULD_NOT:
							filter += " NOT LIKE ";
							isLike = true;
						break;
					}
					filter += getFormattedValue(con.getInitialValue(), isLike);
				}
	 		else
				{
	 			filter += con.getFieldName();
	 			filter += " BETWEEN ";
	 			filter += getFormattedValue(con.getInitialValue(), false);
	 			filter += " AND ";
	 			filter += getFormattedValue(con.getFinalValue(), false);
				}
			}
	 	
			filter += ") AND ";
		}
	 
	 if (filter.length == 0)
	 {
	 	if(filterRequired){
	 	  filter = "1=1";
	 	}
	 	else{
	   	  filter = "1=1";
	 	}
	 }
	 else
	 	filter = filter.substring(0, filter.length-5);
	 
	 // guarda o filtro...
	 result.filter = filter;
	 
	 // retorna o resultado...
	 return result;
 
}

function isEmpty(str){
	
	return (!str || 0 === str.length);
 
}

function getFormattedValue(value, isLike){
	
	if(isLike){
	  return "'%" + value + "%'";
	}
	else{
	  return "'" + value + "'";
	}
	
}

function getXMLFromString(xmlString){
	
	var factory = javax.xml.parsers.DocumentBuilderFactory.newInstance();
	var parser = factory.newDocumentBuilder();
	var is = new org.xml.sax.InputSource();
	is.setCharacterStream(new java.io.StringReader(xmlString));
	return parser.parse(is);
	
}


function abrirPesquisa(DATASET_ID, dataFields, resultFields, type, title){	
	
	window.open("/webdesk/zoom.jsp" +
	"?datasetId=" +
	DATASET_ID +
	"&dataFields=" +
	dataFields +
	"&resultFields=" +
	resultFields +
	"&type=" +
	type+
	"&title=" +
	title 	
	, "zoom", "status,scroolbars=no,width=600,height=350,top=0,left=0");
	
}

function checkIsPK(result, qtd){
	
	var lines = result.split('\r');
	
	if(lines.length == 1){
		var pk = result.split(';');
		if(pk.length == qtd)
			return;
	}
		throw result;
	
}

function ChekExist(result){
	
	 var lines = result.split('\r');
	if(lines.length > 1)
		return true
	else
		return false;
	
}

function replaceValue(text, columnName, newValue){
	
	if ((newValue != null) && (newValue.trim() != ""))
	{
		var regex = new RegExp("<" + columnName + ">(.*?)<\\/" + columnName + ">", "g");
		var replaceText = "<" + columnName + ">" + newValue + "</" + columnName + ">";
		
		return text.replace(regex, replaceText);
	}
	else
		return text;

}

function isEmpty(str){

	return (!str || 0 === str.length);

}
	
function GetXml(){
	
	 return "<MovMovimento >" +   
	"  <TMOV>" +   
	"    <CODCOLIGADA>1</CODCOLIGADA>" +   
	"    <IDMOV>0</IDMOV>" +   
	"    <CODFILIAL>1</CODFILIAL>" +   
	"    <CODLOC>001</CODLOC>" +   
	"    <CODLOCENTREGA>001</CODLOCENTREGA>" +   
	"    <CODLOCDESTINO>001</CODLOCDESTINO>" +   
	"    <CODTMV>1.1.15</CODTMV>" +   
	"    <TIPO>A</TIPO>" +   
	"    <DATAEMISSAO>2017-12-22T00:00:00</DATAEMISSAO>" +   
	"    <VALORBRUTO>6500.0000</VALORBRUTO>" +   
	"    <VALORLIQUIDO>6500.0000</VALORLIQUIDO>" +   
	"    <DATABASEMOV>2017-12-22T00:00:00</DATABASEMOV>" +   
	"    <DATAMOVIMENTO>2017-12-22T00:00:00</DATAMOVIMENTO>" +   
	"    <CODFILIALDESTINO>1</CODFILIALDESTINO>" +   
	"    <CAMPOLIVRE1> ADM <CAMPOLIVRE1 />" +   
	"    <HORULTIMAALTERACAO>2017-12-22T11:04:44</HORULTIMAALTERACAO>" +   
	"    <DATALANCAMENTO>2017-12-22T00:00:00</DATALANCAMENTO>" +   
	"  </TMOV>" +   
	"  <TNFE>" +   
	"    <CODCOLIGADA>1</CODCOLIGADA>" +   
	"    <IDMOV>0</IDMOV>" +   
	"  </TNFE>" +   
	"  <TMOVFISCAL>" +   
	"    <CODCOLIGADA>1</CODCOLIGADA>" +   
	"    <IDMOV>0</IDMOV>" +   
	"  </TMOVFISCAL>" +   
	"  <TITMMOV>" +   
	"    <CODCOLIGADA>1</CODCOLIGADA>" +   
	"    <IDMOV>0</IDMOV>" +   
	"    <NSEQITMMOV>1</NSEQITMMOV>" +   
	"    <CODFILIAL>1</CODFILIAL>" +   
	"    <NUMEROSEQUENCIAL>1</NUMEROSEQUENCIAL>" +   
	"    <CODIGOPRD>01.02.03.0050</CODIGOPRD>" +   
	"    <NOMEFANTASIA>PERFILADO 19X38 3MTS</NOMEFANTASIA>" +   
	"    <QUANTIDADE>10.0000</QUANTIDADE>" +   
	"    <PRECOUNITARIO>630.0000000000</PRECOUNITARIO>" +   
	"    <DATAEMISSAO>2017-12-22T00:00:00</DATAEMISSAO>" +   
	"    <CODUND>UN</CODUND>" +   
	"    <CODLOC>001</CODLOC>" +   
	"    <NSEQITMMOV1>1</NSEQITMMOV1>" +   
	"  </TITMMOV>"+   
	"  <TMOVCOMPL>" +   
	"    <CODCOLIGADA>1</CODCOLIGADA>" +   
	"    <IDMOV>0</IDMOV>" +   
	"  </TMOVCOMPL>"+   
	"</MovMovimento>";  
   
}  

// GERA A DATA ATUAL FORMATADA PARA O XML
function dataAtualFormatada(){
		
    var data = new Date();
    
    var dia = data.getDate();
    
    if (dia.toString().length == 1)
      dia = "0"+dia;
    
    var mes = data.getMonth()+1;
    
    if (mes.toString().length == 1)
      mes = "0"+mes;
    
    var ano = data.getFullYear();  
    
    return ano+"-"+mes+"-"+dia;
    
}

// BUSCA QUAL O ITEM DA TABELA FOI SELECIONADO
function buscaSeqZoomTipo1(){
	
	var seqRet = ""
	
	console.log("vou buscar o zoom selecionado")
	
	// PERCORRE A TABELA E COLETA TODOS OS ITENS
	$('input[id^="TIPO1___"]').each(function(index, value){
		
		// VARIÁVEL PARA O ÍNDICE DA TABELA
		var seq = $(this).attr("id").split("___")[1]
		
		// SE O ZOOM É O SELECIONADO
		if($("#TIPO1___"+seq).hasClass("selecionadoZoom")){
			
			seqRet = seq
			
		}
		
	})
	
	console.log("seq selecionado: "+seqRet)
	return seqRet
	
}

// BUSCA QUAL O ITEM DA TABELA FOI SELECIONADO
function buscaSeqZoomTipo2(){
	
	var seqRet = ""
	
	console.log("vou buscar o zoom selecionado")
	
	// PERCORRE A TABELA E COLETA TODOS OS ITENS
	$('input[id^="TIPO2___"]').each(function(index, value){
		
		// VARIÁVEL PARA O ÍNDICE DA TABELA
		var seq = $(this).attr("id").split("___")[1]
		
		// SE O ZOOM É O SELECIONADO
		if($("#TIPO2___"+seq).hasClass("selecionadoZoom")){
			
			seqRet = seq
			
		}
		
	})
	
	console.log("seq selecionado: "+seqRet)
	return seqRet
	
}

// BUSCA QUAL O ITEM DA TABELA FOI SELECIONADO
function buscaSeqZoomTipo3(){
	
	var seqRet = ""
	
	console.log("vou buscar o zoom selecionado")
	
	// PERCORRE A TABELA E COLETA TODOS OS ITENS
	$('input[id^="TIPO3___"]').each(function(index, value){
		
		// VARIÁVEL PARA O ÍNDICE DA TABELA
		var seq = $(this).attr("id").split("___")[1]
		
		// SE O ZOOM É O SELECIONADO
		if($("#TIPO3___"+seq).hasClass("selecionadoZoom")){
			
			seqRet = seq
			
		}
		
	})
	
	console.log("seq selecionado: "+seqRet)
	return seqRet
	
}

// BUSCA QUAL O ITEM DA TABELA FOI SELECIONADO
function buscaSeqZoomTipo4(){
	
	var seqRet = ""
	
	console.log("vou buscar o zoom selecionado")
	
	// PERCORRE A TABELA E COLETA TODOS OS ITENS
	$('input[id^="TIPO4___"]').each(function(index, value){
		
		// VARIÁVEL PARA O ÍNDICE DA TABELA
		var seq = $(this).attr("id").split("___")[1]
		
		// SE O ZOOM É O SELECIONADO
		if($("#TIPO4___"+seq).hasClass("selecionadoZoom")){
			
			seqRet = seq
			
		}
		
	})
	
	console.log("seq selecionado: "+seqRet)
	return seqRet
	
}

// BUSCA QUAL O ITEM DA TABELA FOI SELECIONADO
function buscaSeqZoomTipo5(){
	
	var seqRet = ""
	
	console.log("vou buscar o zoom selecionado")
	
	// PERCORRE A TABELA E COLETA TODOS OS ITENS
	$('input[id^="TIPO5___"]').each(function(index, value){
		
		// VARIÁVEL PARA O ÍNDICE DA TABELA
		var seq = $(this).attr("id").split("___")[1]
		
		// SE O ZOOM É O SELECIONADO
		if($("#TIPO5___"+seq).hasClass("selecionadoZoom")){
			
			seqRet = seq
			
		}
		
	})
	
	console.log("seq selecionado: "+seqRet)
	return seqRet
	
}

// LIMPA O CONTEÚDO DO ZOOM
function limparZoomTipo1(obj){

	console.log("vou limpar o zoom")
	console.log(obj)
	
	var seq = $(obj).attr("id").split("___")[1]
		
	$("#CODTIPO1___"+seq).val("")
	$("#DESCRICAOTIPO1___"+seq).val("")
	$("#TIPO1___"+seq).val("")
	
	$("#HORAINICIOIMPRO1___"+seq).val("").prop("disabled",true)
	$("#HORAFIMIMPRO1___"+seq).val("").prop("disabled",true)

}

// LIMPA O CONTEÚDO DO ZOOM
function limparZoomTipo2(obj){

	console.log("vou limpar o zoom")
	console.log(obj)
	
	var seq = $(obj).attr("id").split("___")[1]
		
	$("#CODTIPO2___"+seq).val("")
	$("#DESCRICAOTIPO2___"+seq).val("")
	$("#TIPO2___"+seq).val("")

	$("#HORAINICIOIMPRO2___"+seq).val("").prop("disabled",true)
	$("#HORAFIMIMPRO2___"+seq).val("").prop("disabled",true)
	
}

// LIMPA O CONTEÚDO DO ZOOM
function limparZoomTipo3(obj){

	console.log("vou limpar o zoom")
	console.log(obj)
	
	var seq = $(obj).attr("id").split("___")[1]
		
	$("#CODTIPO3___"+seq).val("")
	$("#DESCRICAOTIPO3___"+seq).val("")
	$("#TIPO3___"+seq).val("")
	
	$("#HORAINICIOIMPRO3___"+seq).val("").prop("disabled",true)
	$("#HORAFIMIMPRO3___"+seq).val("").prop("disabled",true)
	
}

// LIMPA O CONTEÚDO DO ZOOM
function limparZoomTipo4(obj){

	console.log("vou limpar o zoom")
	console.log(obj)
	
	var seq = $(obj).attr("id").split("___")[1]
		
	$("#CODTIPO4___"+seq).val("")
	$("#DESCRICAOTIPO4___"+seq).val("")
	$("#TIPO4___"+seq).val("")

	$("#HORAINICIOIMPRO4___"+seq).val("").prop("disabled",true)
	$("#HORAFIMIMPRO4___"+seq).val("").prop("disabled",true)
	
}

// LIMPA O CONTEÚDO DO ZOOM
function limparZoomTipo5(obj){

	console.log("vou limpar o zoom")
	console.log(obj)
	
	var seq = $(obj).attr("id").split("___")[1]
		
	$("#CODTIPO5___"+seq).val("")
	$("#DESCRICAOTIPO5___"+seq).val("")
	$("#TIPO5___"+seq).val("")
	
	$("#HORAINICIOIMPRO5___"+seq).val("").prop("disabled",true)
	$("#HORAFIMIMPRO5___"+seq).val("").prop("disabled",true)

}

// HABILITA O CAMPO HORA FIM APONTAMENTO
function habilitaHoraFimApont(obj){
	
	console.log("habilita a hora fim apontamento")
	
	var seq = $(obj).attr("id").split("___")[1]
	
	var horaInicio = $("#HORAINICIOAPONT___"+seq).val()
	
	// SE HORA INÍCIO FOI INFORMADA
	if(!(horaInicio=="" || horaInicio==null || horaInicio==undefined)){
		
		console.log("vou habilitar a hora fim")
		
		$("#HORAFIMAPONT___"+seq).prop("disabled",false)	
		
	} else {
		
		console.log("vou desabilitar a hora fim")
		
		$("#HORAFIMAPONT___"+seq).val("")
		$("#HORAFIMAPONT___"+seq).prop("disabled",true)
		
	}
	
}

// FAZ A VALIDAÇÃO DA HORA FIM DO APONTAMENTO
function limpaHoraFimApont(obj){
	
	var seq = $(obj).attr("id").split("___")[1]
	
	var hoje = new Date()
	var horaInicio = $("#HORAINICIOAPONT___"+seq).val()
	var horaFim = $("#HORAFIMAPONT___"+seq).val()
	var hoje = new Date()

	// GERA UMA DATA NO FORMATO DE BANCO
	hoje = geraDataBanco(hoje)
	
	console.log("horaInicio: "+horaInicio+", horaFim: "+horaFim+", hoje: "+hoje)
	
	// SE HORA FIM FOI INFORMADA
	if(!(horaFim=="" || horaFim==null || horaFim==undefined)){
		
		// GERA UMA DATA NO FORMATO DE BANCO
		//hoje = geraDataBanco(hoje)
		
		horaInicio = new Date(hoje+' '+horaInicio)
		horaFim = new Date(hoje+' '+horaFim)
		
		// SE HORA DO FIM É MENOR QUE A HORA DE INÍCIO
		if(horaFim<=horaInicio){
			
			console.log("horaFim é menor que a hora início")
			
			$("#HORAFIMAPONT___"+seq).val("")
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'A hora Fim não pode ser menor ou igual que a hora início',
				  text: 'Verifique os campos preenchidos e tente novamente.'
			})
			
			/*FLUIGC.message.alert({
			    message: 'A hora Fim não pode ser menor ou igual que a hora início',
			    title: 'Verifique os campos preenchidos e tente novamente.',
			    label: 'OK'
			});*/
		
		}
		
		// VERIFICA SE HORAS INFORMADAS ESTÃO EM CONFLITOS COM OUTRAS
		else if(horasApont(horaInicio,horaFim,seq)){
			
			console.log("horas estão em conflito com outras da mesma atividade")
			
			$("#HORAFIMAPONT___"+seq).val("").prop("disabled",true)
			$("#HORAINICIOAPONT___"+seq).val("")
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'O intervalo de horas informado está em conflito com as horas já lançadas',
				  text: 'Verifique os campos preenchidos e tente novamente.'
			})
			
			/*FLUIGC.message.alert({
			    message: 'O intervalo de horas informado está em conflito com as horas já lançadas',
			    title: 'Verifique os campos preenchidos e tente novamente.',
			    label: 'OK'
			});*/
			
		}
		// SE NÃO, SE HORAS INFORMADAS SÃO VÁLIDAS 
		else {
			 
			console.log("horas são válidas")
			
			horaInicio = $("#HORAINICIOAPONT___"+seq).val()
			horaFim = $("#HORAFIMAPONT___"+seq).val()
			
			console.log("horaInicio: "+horaInicio+", horaFim: "+horaFim+", hoje: "+hoje)
			
			var data1 = new Date(hoje+' '+horaInicio)
			var data2 = new Date(hoje+' '+horaFim)
			
			console.log("data1: "+data1+", data2: "+data2)
			
			var diff = Math.abs(data1.getTime() - data2.getTime())/60000
			
			console.log("diff: "+diff)
			
			$("#TOTALHORAS___"+seq).val(diff)
			
		}
		
	}
	
}

// HABILITA O CAMPO HORA FIM ATIVIDADE
function habilitaHoraFimAtv(obj){
	
	console.log("habilita a hora fim")
	
	var seq = $(obj).attr("id").split("___")[1]
	
	var horaInicio = $("#HORAINICIOATV___"+seq).val()
	var op = $("#OP___"+seq).val()
	var idAtv = $("#IDATIVIDADE___"+seq).val()
	
	// SE HORA INÍCIO FOI PREENCHIDO
	if(!(horaInicio=="" || horaInicio==null || horaInicio==undefined)){
		
		console.log("hora início foi preenchido")
		
		// VERIFICA SE HORAS INFORMADAS ESTÃO EM CONFLITOS COM OUTRAS DA MESMA ATIVIDADEp@12
		/*if(horasInicioAtividade(op,idAtv,horaInicio,seq)){
			
			console.log("horas estão em conflito com outras da mesma atividade")
			
			$("#HORAFIMATV___"+seq).prop("disabled",true)	
			$("#HORAINICIOATV___"+seq).val("")
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'O intervalo de horas informado está em conflito com as horas já lançadas da mesma atividade',
				  text: 'Verifique os campos preenchidos e tente novamente.'
			})
			
		}*/
		
		$("#HORAFIMATV___"+seq).prop("readonly",false)
		//$("#HORAFIMATV___"+seq).val("00:00")
		
	} else {
		// SE HORA INÍCIO NÃO FOI PREENCHIDA
		
		$("#HORAFIMATV___"+seq).val("").prop("readonly",true)
		
	}
	
}

// HABILITA O CAMPO HORA FIM IMPRODUTIVA 1
function habilitaHoraFimImpr1(obj){
	
	console.log("habilita a hora fim 1")
	
	var seq = $(obj).attr("id").split("___")[1]
	
	var horaInicio = $("#HORAINICIOIMPRO1___"+seq).val()
	
	if(!(horaInicio=="" || horaInicio==null || horaInicio==undefined)){
		
		$("#HORAFIMIMPRO1___"+seq).prop("disabled",false)	
		
	} else {
		
		$("#HORAFIMIMPRO1___"+seq).val("")
		$("#HORAFIMIMPRO1___"+seq).prop("disabled",true)
		
	}
	
	/*var minDate = new Date()
	minDate.setDate(minDate.getDate())
	
	var mySimpleCalendar1 = FLUIGC.calendar('#HORAFIMIMPRO1___'+seq, {
		pickDate: false,
	    pickTime: true,
	    minDate: minDate
	})
		
	var hoje = new Date()
	
	// GERA UMA DATA NO FORMATO DE BANCO
	hoje = geraDataBanco(hoje)
	hoje = hoje.split("-")*/
	
	//mySimpleCalendar1.setMinDate(new Date(hoje[0],hoje[1],hoje[2],horaInicio))
	
}

// HABILITA O CAMPO HORA FIM IMPRODUTIVA 2
function habilitaHoraFimImpr2(obj){
	
	console.log("habilita a hora fim 1")
	
	var seq = $(obj).attr("id").split("___")[1]
	
	var horaInicio = $("#HORAINICIOIMPRO2___"+seq).val()
	
	if(!(horaInicio=="" || horaInicio==null || horaInicio==undefined)){
		
		$("#HORAFIMIMPRO2___"+seq).prop("disabled",false)	
		
	} else {
		
		$("#HORAFIMIMPRO2___"+seq).val("")
		$("#HORAFIMIMPRO2___"+seq).prop("disabled",true)
		
	}
	
}

// HABILITA O CAMPO HORA FIM IMPRODUTIVA 3
function habilitaHoraFimImpr3(obj){
	
	console.log("habilita a hora fim 1")
	
	var seq = $(obj).attr("id").split("___")[1]
	
	var horaInicio = $("#HORAINICIOIMPRO3___"+seq).val()
	
	if(!(horaInicio=="" || horaInicio==null || horaInicio==undefined)){
		
		$("#HORAFIMIMPRO3___"+seq).prop("disabled",false)	
		
	} else {
		
		$("#HORAFIMIMPRO3___"+seq).val("")
		$("#HORAFIMIMPRO3___"+seq).prop("disabled",true)
		
	}
	
}

// HABILITA O CAMPO HORA FIM IMPRODUTIVA 4
function habilitaHoraFimImpr4(obj){
	
	console.log("habilita a hora fim 1")
	
	var seq = $(obj).attr("id").split("___")[1]
	
	var horaInicio = $("#HORAINICIOIMPRO4___"+seq).val()
	
	if(!(horaInicio=="" || horaInicio==null || horaInicio==undefined)){
		
		$("#HORAFIMIMPRO4___"+seq).prop("disabled",false)	
		
	} else {
		
		$("#HORAFIMIMPRO4___"+seq).val("")
		$("#HORAFIMIMPRO4___"+seq).prop("disabled",true)
		
	}
	
}

// HABILITA O CAMPO HORA FIM IMPRODUTIVA 5
function habilitaHoraFimImpr5(obj){
	
	console.log("habilita a hora fim 1")
	
	var seq = $(obj).attr("id").split("___")[1]
	
	var horaInicio = $("#HORAINICIOIMPRO5___"+seq).val()
	
	if(!(horaInicio=="" || horaInicio==null || horaInicio==undefined)){
		
		$("#HORAFIMIMPRO5___"+seq).prop("disabled",false)	
		
	} else {
		
		$("#HORAFIMIMPRO5___"+seq).val("")
		$("#HORAFIMIMPRO5___"+seq).prop("disabled",true)
		
	}
	
}

// FAZ A VALIDAÇÃO DA HORA FIM IMPRODUTIVA DO TIPO 1
function limpaHoraFimImpr1(obj){
	
	var seq = $(obj).attr("id").split("___")[1]
	
	var hoje = new Date()
	var horaInicio = $("#HORAINICIOIMPRO1___"+seq).val()
	var horaFim = $("#HORAFIMIMPRO1___"+seq).val()
	var idAtv = $("#IDATIVIDADE___"+seq).val()
	var op = $("#OP___"+seq).val()
	var dataProg = $("#DATAPROGRAMADA___"+seq).val()
	
	console.log("horaInicio: "+horaInicio)
	
	// SE HORA FIM FOI INFORMADA
	if(!(horaFim=="" || horaFim==null || horaFim==undefined)){
		
		// GERA UMA DATA NO FORMATO DE BANCO
		hoje = geraDataBanco(hoje)
		
		horaInicio = new Date(hoje+' '+horaInicio)
		horaFim = new Date(hoje+' '+horaFim)
		
		// SE HORA DO FIM É MENOR QUE A HORA DE INÍCIO
		if(horaFim<=horaInicio){
			
			console.log("horaFim é menor que a hora início")
			
			$("#HORAFIMIMPRO1___"+seq).val("")
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'A hora Fim não pode ser menor ou igual que a hora início',
				  text: 'Verifique os campos preenchidos e tente novamente.'
			})
			
			/*FLUIGC.message.alert({
			    message: 'A hora Fim não pode ser menor ou igual que a hora início',
			    title: 'Verifique os campos preenchidos e tente novamente.',
			    label: 'OK'
			});*/
		
		}
		
		// VERIFICA SE HORAS INFORMADAS ESTÃO EM CONFLITOS COM OUTRAS DA MESMA ATIVIDADEp@12
		if(horasImpr1(op,idAtv,horaInicio,horaFim,seq)){
			
			console.log("horas estão em conflito com outras da mesma atividade")
			
			$("#HORAFIMIMPRO1___"+seq).val("").prop("disabled",true)
			$("#HORAINICIOIMPRO1___"+seq).val("")
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'O intervalo de horas informado está em conflito com as horas já lançadas da mesma atividade',
				  text: 'Verifique os campos preenchidos e tente novamente.'
			})
			
			/*FLUIGC.message.alert({
			    message: 'O intervalo de horas informado está em conflito com as horas já lançadas da mesma atividade',
			    title: 'Verifique os campos preenchidos e tente novamente.',
			    label: 'OK'
			});*/
			
		}
		
	}
	
}

// FAZ A VALIDAÇÃO DA HORA FIM IMPRODUTIVA DO TIPO 2
function limpaHoraFimImpr2(obj){
	
	var seq = $(obj).attr("id").split("___")[1]
	
	var hoje = new Date()
	var horaInicio = $("#HORAINICIOIMPRO2___"+seq).val()
	var horaFim = $("#HORAFIMIMPRO2___"+seq).val()
	var idAtv = $("#IDATIVIDADE___"+seq).val()
	var op = $("#OP___"+seq).val()
	var dataProg = $("#DATAPROGRAMADA___"+seq).val()
	
	// SE HORA FIM FOI INFORMADA
	if(!(horaFim=="" || horaFim==null || horaFim==undefined)){
		
		// GERA UMA DATA NO FORMATO DE BANCO
		hoje = geraDataBanco(hoje)
		
		horaInicio = new Date(hoje+' '+horaInicio)
		horaFim = new Date(hoje+' '+horaFim)
		
		// SE HORA DO FIM É MENOR QUE A HORA DE INÍCIO
		if(horaFim<=horaInicio){
			
			console.log("horaFim é menor que a hora início")
			
			$("#HORAFIMIMPRO2___"+seq).val("")
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'A hora Fim não pode ser menor ou igual que a hora início',
				  text: 'Verifique os campos preenchidos e tente novamente.'
			})
			
			/*FLUIGC.message.alert({
			    message: 'A hora Fim não pode ser menor ou igual que a hora início',
			    title: 'Verifique os campos preenchidos e tente novamente.',
			    label: 'OK'
			});*/
		
		}
		
		// VERIFICA SE HORAS INFORMADAS ESTÃO EM CONFLITOS COM OUTRAS DA MESMA ATIVIDADEp@12
		if(horasImpr2(op,idAtv,horaInicio,horaFim,seq)){
			
			console.log("horas estão em conflito com outras da mesma atividade")
			
			$("#HORAFIMIMPRO2___"+seq).val("").prop("disabled",true)
			$("#HORAINICIOIMPRO2___"+seq).val("")
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'O intervalo de horas informado está em conflito com as horas já lançadas da mesma atividade',
				  text: 'Verifique os campos preenchidos e tente novamente.'
			})
			
			/*FLUIGC.message.alert({
			    message: 'O intervalo de horas informado está em conflito com as horas já lançadas da mesma atividade',
			    title: 'Verifique os campos preenchidos e tente novamente.',
			    label: 'OK'
			});*/
			
		}
		
	}
	
}

// FAZ A VALIDAÇÃO DA HORA FIM IMPRODUTIVA DO TIPO 3
function limpaHoraFimImpr3(obj){
	
	var seq = $(obj).attr("id").split("___")[1]
	
	var hoje = new Date()
	var horaInicio = $("#HORAINICIOIMPRO3___"+seq).val()
	var horaFim = $("#HORAFIMIMPRO3___"+seq).val()
	var idAtv = $("#IDATIVIDADE___"+seq).val()
	var op = $("#OP___"+seq).val()
	var dataProg = $("#DATAPROGRAMADA___"+seq).val()
	
	// SE HORA FIM FOI INFORMADA
	if(!(horaFim=="" || horaFim==null || horaFim==undefined)){
		
		// GERA UMA DATA NO FORMATO DE BANCO
		hoje = geraDataBanco(hoje)
		
		horaInicio = new Date(hoje+' '+horaInicio)
		horaFim = new Date(hoje+' '+horaFim)
		
		// SE HORA DO FIM É MENOR QUE A HORA DE INÍCIO
		if(horaFim<=horaInicio){
			
			console.log("horaFim é menor que a hora início")
			
			$("#HORAFIMIMPRO3___"+seq).val("")
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'A hora Fim não pode ser menor ou igual que a hora início',
				  text: 'Verifique os campos preenchidos e tente novamente.'
			})
			
			/*FLUIGC.message.alert({
			    message: 'A hora Fim não pode ser menor ou igual que a hora início',
			    title: 'Verifique os campos preenchidos e tente novamente.',
			    label: 'OK'
			});*/
		
		}
		
		// VERIFICA SE HORAS INFORMADAS ESTÃO EM CONFLITOS COM OUTRAS DA MESMA ATIVIDADEp@12
		if(horasImpr3(op,idAtv,horaInicio,horaFim,seq)){
			
			console.log("horas estão em conflito com outras da mesma atividade")
			
			$("#HORAFIMIMPRO3___"+seq).val("").prop("disabled",true)
			$("#HORAINICIOIMPRO3___"+seq).val("")
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'O intervalo de horas informado está em conflito com as horas já lançadas da mesma atividade',
				  text: 'Verifique os campos preenchidos e tente novamente.'
			})
			
			/*FLUIGC.message.alert({
			    message: 'O intervalo de horas informado está em conflito com as horas já lançadas da mesma atividade',
			    title: 'Verifique os campos preenchidos e tente novamente.',
			    label: 'OK'
			});*/
			
		}
		
	}
	
}

// FAZ A VALIDAÇÃO DA HORA FIM IMPRODUTIVA DO TIPO 4
function limpaHoraFimImpr4(obj){
	
	var seq = $(obj).attr("id").split("___")[1]
	
	var hoje = new Date()
	var horaInicio = $("#HORAINICIOIMPRO4___"+seq).val()
	var horaFim = $("#HORAFIMIMPRO4___"+seq).val()
	var idAtv = $("#IDATIVIDADE___"+seq).val()
	var op = $("#OP___"+seq).val()
	var dataProg = $("#DATAPROGRAMADA___"+seq).val()
	
	// SE HORA FIM FOI INFORMADA
	if(!(horaFim=="" || horaFim==null || horaFim==undefined)){
		
		// GERA UMA DATA NO FORMATO DE BANCO
		hoje = geraDataBanco(hoje)
		
		horaInicio = new Date(hoje+' '+horaInicio)
		horaFim = new Date(hoje+' '+horaFim)
		
		// SE HORA DO FIM É MENOR QUE A HORA DE INÍCIO
		if(horaFim<=horaInicio){
			
			console.log("horaFim é menor que a hora início")
			
			$("#HORAFIMIMPRO4___"+seq).val("")
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'A hora Fim não pode ser menor ou igual que a hora início',
				  text: 'Verifique os campos preenchidos e tente novamente.'
			})
			
			/*FLUIGC.message.alert({
			    message: 'A hora Fim não pode ser menor ou igual que a hora início',
			    title: 'Verifique os campos preenchidos e tente novamente.',
			    label: 'OK'
			});*/
		
		}
		
		// VERIFICA SE HORAS INFORMADAS ESTÃO EM CONFLITOS COM OUTRAS DA MESMA ATIVIDADE
		if(horasImpr4(op,idAtv,horaInicio,horaFim,seq)){
			
			console.log("horas estão em conflito com outras da mesma atividade")
			
			$("#HORAFIMIMPRO4___"+seq).val("").prop("disabled",true)
			$("#HORAINICIOIMPRO4___"+seq).val("")
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'O intervalo de horas informado está em conflito com as horas já lançadas da mesma atividade',
				  text: 'Verifique os campos preenchidos e tente novamente.'
			})
			
			/*FLUIGC.message.alert({
			    message: 'O intervalo de horas informado está em conflito com as horas já lançadas da mesma atividade',
			    title: 'Verifique os campos preenchidos e tente novamente.',
			    label: 'OK'
			});*/
			
		}
		
	}
	
}

// FAZ A VALIDAÇÃO DA HORA FIM IMPRODUTIVA DO TIPO 5
function limpaHoraFimImpr5(obj){
	
	var seq = $(obj).attr("id").split("___")[1]
	
	var hoje = new Date()
	var horaInicio = $("#HORAINICIOIMPRO5___"+seq).val()
	var horaFim = $("#HORAFIMIMPRO5___"+seq).val()
	var idAtv = $("#IDATIVIDADE___"+seq).val()
	var op = $("#OP___"+seq).val()
	var dataProg = $("#DATAPROGRAMADA___"+seq).val()
	
	// SE HORA FIM FOI INFORMADA
	if(!(horaFim=="" || horaFim==null || horaFim==undefined)){
		
		// GERA UMA DATA NO FORMATO DE BANCO
		hoje = geraDataBanco(hoje)
		
		horaInicio = new Date(hoje+' '+horaInicio)
		horaFim = new Date(hoje+' '+horaFim)
		
		// SE HORA DO FIM É MENOR QUE A HORA DE INÍCIO
		if(horaFim<=horaInicio){
			
			console.log("horaFim é menor que a hora início")
			
			$("#HORAFIMIMPRO5___"+seq).val("")
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'A hora Fim não pode ser menor ou igual que a hora início',
				  text: 'Verifique os campos preenchidos e tente novamente.'
			})
			
			/*FLUIGC.message.alert({
			    message: 'A hora Fim não pode ser menor ou igual que a hora início',
			    title: 'Verifique os campos preenchidos e tente novamente.',
			    label: 'OK'
			});*/
		
		}
		
		// VERIFICA SE HORAS INFORMADAS ESTÃO EM CONFLITOS COM OUTRAS DA MESMA ATIVIDADE
		if(horasImpr5(op,idAtv,horaInicio,horaFim,seq)){
			
			console.log("horas estão em conflito com outras da mesma atividade")
			
			$("#HORAFIMIMPRO5___"+seq).val("").prop("disabled",true)
			$("#HORAINICIOIMPRO5___"+seq).val("")
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'O intervalo de horas informado está em conflito com as horas já lançadas da mesma atividade',
				  text: 'Verifique os campos preenchidos e tente novamente.'
			})
			
			/*FLUIGC.message.alert({
			    message: 'O intervalo de horas informado está em conflito com as horas já lançadas da mesma atividade',
			    title: 'Verifique os campos preenchidos e tente novamente.',
			    label: 'OK'
			});*/
			
		} 
		
	}
	
}

// FAZ A VALIDAÇÃO DA HORA FIM DA ATIVIDADE
function limpaHoraFimAtv(obj){
	
	var seq = $(obj).attr("id").split("___")[1]
	
	var hoje = new Date()
	var horaInicio = $("#HORAINICIOATV___"+seq).val()
	var horaFim = $("#HORAFIMATV___"+seq).val()
	var idAtv = $("#IDATIVIDADE___"+seq).val()
	var op = $("#OP___"+seq).val()
	var dataProg = $("#DATAPROGRAMADA___"+seq).val()
	
	console.log("horaInicio: "+horaInicio)
	
	// SE HORA FIM FOI INFORMADA
	if(!(horaFim=="" || horaFim==null || horaFim==undefined)){
		
		// GERA UMA DATA NO FORMATO DE BANCO
		hoje = geraDataBanco(hoje)
		
		horaInicio = new Date(hoje+' '+horaInicio)
		horaFim = new Date(hoje+' '+horaFim)
		
		// SE HORA DO FIM É MENOR QUE A HORA DE INÍCIO
		if(horaFim<=horaInicio){
			
			console.log("horaFim é menor que a hora início")
			
			$("#HORAFIMATV___"+seq).val("")
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'A hora Fim não pode ser menor ou igual que a hora início',
				  text: 'Verifique os campos preenchidos e tente novamente.'
			})
			
			/*FLUIGC.message.alert({
			    message: 'A hora Fim não pode ser menor ou igual que a hora início',
			    title: 'Verifique os campos preenchidos e tente novamente.',
			    label: 'OK'
			});*/
		
		}
		
		// VERIFICA SE HORAS INFORMADAS ESTÃO EM CONFLITOS COM OUTRAS DA MESMA ATIVIDADEp@12
		else if(horasAtividade(op,idAtv,horaInicio,horaFim,seq)){
			
			console.log("horas estão em conflito com outras da mesma atividade")
			
			$("#HORAFIMATV___"+seq).val("").prop("disabled",true)
			$("#HORAINICIOATV___"+seq).val("")
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'O intervalo de horas informado está em conflito com as horas já lançadas da mesma atividade',
				  text: 'Verifique os campos preenchidos e tente novamente.'
			})
			
			/*FLUIGC.message.alert({
			    message: 'O intervalo de horas informado está em conflito com as horas já lançadas da mesma atividade',
			    title: 'Verifique os campos preenchidos e tente novamente.',
			    label: 'OK'
			});*/
			
		}
		else {
			// SE NÃO, HORAS ESTÃO APROVADAS
			
			horaInicio = $("#HORAINICIOATV___"+seq).val()
			horaFim = $("#HORAFIMATV___"+seq).val()
			
			console.log("hoje: "+hoje)
			console.log("horaInicio: "+horaInicio)
			console.log("horaFim: "+horaFim)
			
			var data1 = new Date(hoje+' '+horaInicio)
			var data2 = new Date(hoje+' '+horaFim)
			
			console.log("data1: "+data1+", data2: "+data2)
			
			var diff = Math.abs(data1.getTime() - data2.getTime())/3600000
			
			console.log("diff: "+diff)
			
			$("#SALDOTRABALHADO___"+seq).val(diff)
			
		}
		
	}
	
}

// VERIFICA SE HORAS INFORMADAS ESTÃO EM CONFLITOS COM OUTRAS DA MESMA ATIVIDADE
function horasInicioAtividade(op,idAtv,horaInicio,seqAtv){
	
	console.log("op: "+op+", idAtv: "+idAtv+", horaInicio: "+horaInicio+", seq: "+seqAtv)
	
	var ret = false
	
	// PERCORRE TODOS OS REGISTROS DA TABELA DE ATIVIDADES
	$("input[id^='CODIGOPRD___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var idAtvAux = $("#IDATIVIDADE___"+seq).val()
		var opAux = $("#OP___"+seq).val()
		var dataProgAux = $("#DATAPROGRAMADA___"+seq).val()
		var horaInicioAux = $("#HORAINICIOATV___"+seq).val()
		var horaFimAux = $("#HORAFIMATV___"+seq).val()
		var seqAux = $("#SEQ___"+seq).val()	
		
		console.log("vou buscar atividade cópia")
		
		// SE NÃO É A MESMA ATIVIDADE E OP E MESMA DATA E NÃO É A ATIVIDADE PRINCIPAL
		if(!(seqAtv==seqAux)){
			// idAtv==idAtvAux && op==opAux &&
			
			//console.log("encontrei a mesma atividade e OP e não é o mesmo item")
			
			console.log("não é a mesma atividade")
			
			var hoje = new Date()
			hoje = geraDataBanco(hoje)
			
			// SE HORA INÍCIO FOI INFORMADA
			if(!(horaInicioAux=="" || horaInicioAux==null || horaInicioAux==undefined)){
				
				horaInicioAux = new Date(hoje+" "+horaInicioAux)
				horaFimAux = new Date(hoje+" "+horaFimAux)
				horaInicio = new Date(hoje+' '+horaInicio)
				
				console.log("horaInicio: "+horaInicio+", horaInicioAux: "+horaInicioAux+", horaFimAux: "+horaFimAux)
				
				// SE HORAS INÍCIO E FIM NÃO ESTÃO EM CONFLITO COM OUTRAS DA MESMA ATIVIDADE
				if(horaInicio<horaInicioAux || horaInicio>horaFimAux){
					
					console.log("horas não são conflitantes")
					
					ret = false
					
				} else {
					// SE NÃO, HORAS SÃO CONFLITANTES
					
					console.log("horas são conflitantes")
					
					ret = true
					
				}
				
			}
			
		}
		
	})
	
	return ret
	
}

// VERIFICA SE HORAS INFORMADAS ESTÃO EM CONFLITOS COM OUTRAS HORAS
function horasApont(horaInicio,horaFim,seqAtv){
	
	console.log("horaInicio: "+horaInicio+", horaFim: "+horaFim+", seq: "+seqAtv)
	
	var ret = false
	
	// PERCORRE TODOS OS REGISTROS DA TABELA DE ATIVIDADES
	$("input[id^='CODAPONTAMENTO___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]

		var horaInicioAux1 = $("#HORAINICIOAPONT___"+seq).val()
		var horaFimAux1 = $("#HORAFIMAPONT___"+seq).val()
		
		// SE HORA INÍCIO E FIM FORAM PREENCHIDAS
		if(!(horaInicioAux1=="" || horaInicioAux1==null || horaInicioAux1==undefined) && !(horaFimAux1=="" || horaFimAux1==null || horaFimAux1==undefined)){
			
			// SE NÃO É A MESMA ATIVIDADE
			if(!(seqAtv==seq)){
				
				var hoje = new Date()
				hoje = geraDataBanco(hoje)
				
				horaInicioAux1 = new Date(hoje+" "+horaInicioAux1)
				horaFimAux1 = new Date(hoje+" "+horaFimAux1)
				
				console.log("horaInicio: "+horaInicio+", horaFim: "+horaFim+", horaInicioAux: "+horaInicioAux1+", horaFimAux: "+horaFimAux1)
				
				// SE HORAS INÍCIO E FIM NÃO ESTÃO EM CONFLITO COM OUTRAS DA MESMA ATIVIDADE
				if((horaInicio<horaInicioAux1 && horaFim<horaInicioAux1) || (horaInicio>horaFimAux1 && horaFim>horaFimAux1)){
					
					console.log("horas não são conflitantes")
					
					//ret = false
					
				} else {
					// SE NÃO, HORAS SÃO CONFLITANTES
					
					console.log("horas são conflitantes")
					
					ret = true
					
				}
				
			}
			
		}
	
	})
	
	return ret
	
}


// VERIFICA SE HORAS INFORMADAS ESTÃO EM CONFLITOS COM OUTRAS HORAS IMPRODUTIVAS DA ATUAL E DE OUTRAS ATIVIDADES
function horasImpr1(op,idAtv,horaInicio,horaFim,seqAtv){
	
	console.log("op: "+op+", idAtv: "+idAtv+", horaInicio: "+horaInicio+", horaFim: "+horaFim+", seq: "+seqAtv)
	
	var ret = false
	
	// PERCORRE TODOS OS REGISTROS DA TABELA DE ATIVIDADES
	$("input[id^='CODIGOPRD___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var idAtvAux = $("#IDATIVIDADE___"+seq).val()
		var opAux = $("#OP___"+seq).val()
		var dataProgAux = $("#DATAPROGRAMADA___"+seq).val()
		var seqAux = $("#SEQ___"+seq).val()	

		var horaInicioAux1 = $("#HORAINICIOIMPRO1___"+seq).val()
		var horaFimAux1 = $("#HORAFIMIMPRO1___"+seq).val()
		
		// SE HORA INÍCIO E FIM FORAM PREENCHIDAS
		if(!(horaInicioAux1=="" || horaInicioAux1==null || horaInicioAux1==undefined) && !(horaFimAux1=="" || horaFimAux1==null || horaFimAux1==undefined)){
			
			// SE NÃO É A MESMA ATIVIDADE
			if(!(seqAtv==seqAux)){
				
				var hoje = new Date()
				hoje = geraDataBanco(hoje)
				
				horaInicioAux1 = new Date(hoje+" "+horaInicioAux1)
				horaFimAux1 = new Date(hoje+" "+horaFimAux1)
				
				console.log("horaInicio: "+horaInicio+", horaFim: "+horaFim+", horaInicioAux: "+horaInicioAux1+", horaFimAux: "+horaFimAux1)
				
				// SE HORAS INÍCIO E FIM NÃO ESTÃO EM CONFLITO COM OUTRAS DA MESMA ATIVIDADE
				if((horaInicio<horaInicioAux1 && horaFim<horaInicioAux1) || (horaInicio>horaFimAux1 && horaFim>horaFimAux1)){
					
					console.log("horas não são conflitantes")
					
					//ret = false
					
				} else {
					// SE NÃO, HORAS SÃO CONFLITANTES
					
					console.log("horas são conflitantes")
					
					ret = true
					
				}
				
			}
			
		}
		
		if(!ret){
			
			var horaInicioAux2 = $("#HORAINICIOIMPRO2___"+seq).val()
			var horaFimAux2 = $("#HORAFIMIMPRO2___"+seq).val()
			
			// SE HORA INÍCIO E FIM FORAM PREENCHIDAS
			if(!(horaInicioAux2=="" || horaInicioAux2==null || horaInicioAux2==undefined) && !(horaFimAux2=="" || horaFimAux2==null || horaFimAux2==undefined)){
				
				var hoje = new Date()
				hoje = geraDataBanco(hoje)
				
				horaInicioAux2 = new Date(hoje+" "+horaInicioAux2)
				horaFimAux2 = new Date(hoje+" "+horaFimAux2)
				
				console.log("horaInicio: "+horaInicio+", horaFim: "+horaFim+", horaInicioAux: "+horaInicioAux2+", horaFimAux: "+horaFimAux2)
				
				// SE HORAS INÍCIO E FIM NÃO ESTÃO EM CONFLITO COM OUTRAS DA MESMA ATIVIDADE
				if((horaInicio<horaInicioAux2 && horaFim<horaInicioAux2) || (horaInicio>horaFimAux2 && horaFim>horaFimAux2)){
					
					console.log("horas não são conflitantes")
					
					//ret = false
					
				} else {
					// SE NÃO, HORAS SÃO CONFLITANTES
					
					console.log("horas são conflitantes")
					
					ret = true
					
				}
				
			}
			
		}
		
		if(!ret){
			
			var horaInicioAux3 = $("#HORAINICIOIMPRO3___"+seq).val()
			var horaFimAux3 = $("#HORAFIMIMPRO3___"+seq).val()
			
			// SE HORA INÍCIO E FIM FORAM PREENCHIDAS
			if(!(horaInicioAux3=="" || horaInicioAux3==null || horaInicioAux3==undefined) && !(horaFimAux3=="" || horaFimAux3==null || horaFimAux3==undefined)){
				
				var hoje = new Date()
				hoje = geraDataBanco(hoje)
				
				horaInicioAux3 = new Date(hoje+" "+horaInicioAux3)
				horaFimAux3 = new Date(hoje+" "+horaFimAux3)
				
				console.log("horaInicio: "+horaInicio+", horaFim: "+horaFim+", horaInicioAux: "+horaInicioAux3+", horaFimAux: "+horaFimAux3)
				
				// SE HORAS INÍCIO E FIM NÃO ESTÃO EM CONFLITO COM OUTRAS DA MESMA ATIVIDADE
				if((horaInicio<horaInicioAux3 && horaFim<horaInicioAux3) || (horaInicio>horaFimAux3 && horaFim>horaFimAux3)){
					
					console.log("horas não são conflitantes")
					
					//ret = false
					
				} else {
					// SE NÃO, HORAS SÃO CONFLITANTES
					
					console.log("horas são conflitantes")
					
					ret = true
					
				}
				
			}
			
		}
		
		if(!ret){
			
			var horaInicioAux4 = $("#HORAINICIOIMPRO4___"+seq).val()
			var horaFimAux4 = $("#HORAFIMIMPRO4___"+seq).val()
			
			// SE HORA INÍCIO E FIM FORAM PREENCHIDAS
			if(!(horaInicioAux4=="" || horaInicioAux4==null || horaInicioAux4==undefined) && !(horaFimAux4=="" || horaFimAux4==null || horaFimAux4==undefined)){
				
				var hoje = new Date()
				hoje = geraDataBanco(hoje)
				
				horaInicioAux4 = new Date(hoje+" "+horaInicioAux4)
				horaFimAux4 = new Date(hoje+" "+horaFimAux4)
				
				console.log("horaInicio: "+horaInicio+", horaFim: "+horaFim+", horaInicioAux: "+horaInicioAux4+", horaFimAux: "+horaFimAux4)
				
				// SE HORAS INÍCIO E FIM NÃO ESTÃO EM CONFLITO COM OUTRAS DA MESMA ATIVIDADE
				if((horaInicio<horaInicioAux4 && horaFim<horaInicioAux4) || (horaInicio>horaFimAux4 && horaFim>horaFimAux4)){
					
					console.log("horas não são conflitantes")
					
					//ret = false
					
				} else {
					// SE NÃO, HORAS SÃO CONFLITANTES
					
					console.log("horas são conflitantes")
					
					ret = true
					
				}
				
			}
			
		}
		
		if(!ret){
			
			var horaInicioAux5 = $("#HORAINICIOIMPRO5___"+seq).val()
			var horaFimAux5 = $("#HORAFIMIMPRO5___"+seq).val()
			
			// SE HORA INÍCIO E FIM FORAM PREENCHIDAS
			if(!(horaInicioAux5=="" || horaInicioAux5==null || horaInicioAux5==undefined) && !(horaFimAux5=="" || horaFimAux5==null || horaFimAux5==undefined)){
				
				var hoje = new Date()
				hoje = geraDataBanco(hoje)
				
				horaInicioAux5 = new Date(hoje+" "+horaInicioAux5)
				horaFimAux5 = new Date(hoje+" "+horaFimAux5)
				
				console.log("horaInicio: "+horaInicio+", horaFim: "+horaFim+", horaInicioAux: "+horaInicioAux5+", horaFimAux: "+horaFimAux5)
				
				// SE HORAS INÍCIO E FIM NÃO ESTÃO EM CONFLITO COM OUTRAS DA MESMA ATIVIDADE
				if((horaInicio<horaInicioAux5 && horaFim<horaInicioAux5) || (horaInicio>horaFimAux5 && horaFim>horaFimAux5)){
					
					console.log("horas não são conflitantes")
					
					//ret = false
					
				} else {
					// SE NÃO, HORAS SÃO CONFLITANTES
					
					console.log("horas são conflitantes")
					
					ret = true
					
				}
				
			}
			
		}
		
	})
	
	return ret
	
}

// VERIFICA SE HORAS INFORMADAS ESTÃO EM CONFLITOS COM OUTRAS HORAS IMPRODUTIVAS DA ATUAL E DE OUTRAS ATIVIDADES
function horasImpr2(op,idAtv,horaInicio,horaFim,seqAtv){
	
	console.log("op: "+op+", idAtv: "+idAtv+", horaInicio: "+horaInicio+", horaFim: "+horaFim+", seq: "+seqAtv)
	
	var ret = false
	
	// PERCORRE TODOS OS REGISTROS DA TABELA DE ATIVIDADES
	$("input[id^='CODIGOPRD___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var idAtvAux = $("#IDATIVIDADE___"+seq).val()
		var opAux = $("#OP___"+seq).val()
		var dataProgAux = $("#DATAPROGRAMADA___"+seq).val()
		var seqAux = $("#SEQ___"+seq).val()	

		var horaInicioAux1 = $("#HORAINICIOIMPRO1___"+seq).val()
		var horaFimAux1 = $("#HORAFIMIMPRO1___"+seq).val()
		
		// SE HORA INÍCIO E FIM FORAM PREENCHIDAS
		if(!(horaInicioAux1=="" || horaInicioAux1==null || horaInicioAux1==undefined) && !(horaFimAux1=="" || horaFimAux1==null || horaFimAux1==undefined)){
			
			var hoje = new Date()
			hoje = geraDataBanco(hoje)
			
			horaInicioAux1 = new Date(hoje+" "+horaInicioAux1)
			horaFimAux1 = new Date(hoje+" "+horaFimAux1)
			
			console.log("horaInicio: "+horaInicio+", horaFim: "+horaFim+", horaInicioAux: "+horaInicioAux1+", horaFimAux: "+horaFimAux1)
			
			// SE HORAS INÍCIO E FIM NÃO ESTÃO EM CONFLITO COM OUTRAS DA MESMA ATIVIDADE
			if((horaInicio<horaInicioAux1 && horaFim<horaInicioAux1) || (horaInicio>horaFimAux1 && horaFim>horaFimAux1)){
				
				console.log("horas não são conflitantes")
				
				//ret = false
				
			} else {
				// SE NÃO, HORAS SÃO CONFLITANTES
				
				console.log("horas são conflitantes")
				
				ret = true
				
			}
			
		}
		
		if(!ret){
			
			var horaInicioAux2 = $("#HORAINICIOIMPRO2___"+seq).val()
			var horaFimAux2 = $("#HORAFIMIMPRO2___"+seq).val()
			
			// SE HORA INÍCIO E FIM FORAM PREENCHIDAS
			if(!(horaInicioAux2=="" || horaInicioAux2==null || horaInicioAux2==undefined) && !(horaFimAux2=="" || horaFimAux2==null || horaFimAux2==undefined)){
				
				// SE NÃO É A MESMA ATIVIDADE
				if(!(seqAtv==seqAux)){
					
					var hoje = new Date()
					hoje = geraDataBanco(hoje)
					
					horaInicioAux2 = new Date(hoje+" "+horaInicioAux2)
					horaFimAux2 = new Date(hoje+" "+horaFimAux2)
					
					console.log("horaInicio: "+horaInicio+", horaFim: "+horaFim+", horaInicioAux: "+horaInicioAux2+", horaFimAux: "+horaFimAux2)
					
					// SE HORAS INÍCIO E FIM NÃO ESTÃO EM CONFLITO COM OUTRAS DA MESMA ATIVIDADE
					if((horaInicio<horaInicioAux2 && horaFim<horaInicioAux2) || (horaInicio>horaFimAux2 && horaFim>horaFimAux2)){
						
						console.log("horas não são conflitantes")
						
						//ret = false
						
					} else {
						// SE NÃO, HORAS SÃO CONFLITANTES
						
						console.log("horas são conflitantes")
						
						ret = true
						
					}
					
				}
				
			}
			
		}
		
		if(!ret){
			
			var horaInicioAux3 = $("#HORAINICIOIMPRO3___"+seq).val()
			var horaFimAux3 = $("#HORAFIMIMPRO3___"+seq).val()
			
			// SE HORA INÍCIO E FIM FORAM PREENCHIDAS
			if(!(horaInicioAux3=="" || horaInicioAux3==null || horaInicioAux3==undefined) && !(horaFimAux3=="" || horaFimAux3==null || horaFimAux3==undefined)){
				
				var hoje = new Date()
				hoje = geraDataBanco(hoje)
				
				horaInicioAux3 = new Date(hoje+" "+horaInicioAux3)
				horaFimAux3 = new Date(hoje+" "+horaFimAux3)
				
				console.log("horaInicio: "+horaInicio+", horaFim: "+horaFim+", horaInicioAux: "+horaInicioAux3+", horaFimAux: "+horaFimAux3)
				
				// SE HORAS INÍCIO E FIM NÃO ESTÃO EM CONFLITO COM OUTRAS DA MESMA ATIVIDADE
				if((horaInicio<horaInicioAux3 && horaFim<horaInicioAux3) || (horaInicio>horaFimAux3 && horaFim>horaFimAux3)){
					
					console.log("horas não são conflitantes")
					
					//ret = false
					
				} else {
					// SE NÃO, HORAS SÃO CONFLITANTES
					
					console.log("horas são conflitantes")
					
					ret = true
					
				}
				
			}
			
		}
		
		if(!ret){
			
			var horaInicioAux4 = $("#HORAINICIOIMPRO4___"+seq).val()
			var horaFimAux4 = $("#HORAFIMIMPRO4___"+seq).val()
			
			// SE HORA INÍCIO E FIM FORAM PREENCHIDAS
			if(!(horaInicioAux4=="" || horaInicioAux4==null || horaInicioAux4==undefined) && !(horaFimAux4=="" || horaFimAux4==null || horaFimAux4==undefined)){
				
				var hoje = new Date()
				hoje = geraDataBanco(hoje)
				
				horaInicioAux4 = new Date(hoje+" "+horaInicioAux4)
				horaFimAux4 = new Date(hoje+" "+horaFimAux4)
				
				console.log("horaInicio: "+horaInicio+", horaFim: "+horaFim+", horaInicioAux: "+horaInicioAux4+", horaFimAux: "+horaFimAux4)
				
				// SE HORAS INÍCIO E FIM NÃO ESTÃO EM CONFLITO COM OUTRAS DA MESMA ATIVIDADE
				if((horaInicio<horaInicioAux4 && horaFim<horaInicioAux4) || (horaInicio>horaFimAux4 && horaFim>horaFimAux4)){
					
					console.log("horas não são conflitantes")
					
					//ret = false
					
				} else {
					// SE NÃO, HORAS SÃO CONFLITANTES
					
					console.log("horas são conflitantes")
					
					ret = true
					
				}
				
			}
			
		}
		
		if(!ret){
			
			var horaInicioAux5 = $("#HORAINICIOIMPRO5___"+seq).val()
			var horaFimAux5 = $("#HORAFIMIMPRO5___"+seq).val()
			
			// SE HORA INÍCIO E FIM FORAM PREENCHIDAS
			if(!(horaInicioAux5=="" || horaInicioAux5==null || horaInicioAux5==undefined) && !(horaFimAux5=="" || horaFimAux5==null || horaFimAux5==undefined)){
				
				var hoje = new Date()
				hoje = geraDataBanco(hoje)
				
				horaInicioAux5 = new Date(hoje+" "+horaInicioAux5)
				horaFimAux5 = new Date(hoje+" "+horaFimAux5)
				
				console.log("horaInicio: "+horaInicio+", horaFim: "+horaFim+", horaInicioAux: "+horaInicioAux5+", horaFimAux: "+horaFimAux5)
				
				// SE HORAS INÍCIO E FIM NÃO ESTÃO EM CONFLITO COM OUTRAS DA MESMA ATIVIDADE
				if((horaInicio<horaInicioAux5 && horaFim<horaInicioAux5) || (horaInicio>horaFimAux5 && horaFim>horaFimAux5)){
					
					console.log("horas não são conflitantes")
					
					//ret = false
					
				} else {
					// SE NÃO, HORAS SÃO CONFLITANTES
					
					console.log("horas são conflitantes")
					
					ret = true
					
				}
				
			}
			
		}
		
	})
	
	return ret
	
}

// VERIFICA SE HORAS INFORMADAS ESTÃO EM CONFLITOS COM OUTRAS HORAS IMPRODUTIVAS DA ATUAL E DE OUTRAS ATIVIDADES
function horasImpr3(op,idAtv,horaInicio,horaFim,seqAtv){
	
	console.log("op: "+op+", idAtv: "+idAtv+", horaInicio: "+horaInicio+", horaFim: "+horaFim+", seq: "+seqAtv)
	
	var ret = false
	
	// PERCORRE TODOS OS REGISTROS DA TABELA DE ATIVIDADES
	$("input[id^='CODIGOPRD___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var idAtvAux = $("#IDATIVIDADE___"+seq).val()
		var opAux = $("#OP___"+seq).val()
		var dataProgAux = $("#DATAPROGRAMADA___"+seq).val()
		var seqAux = $("#SEQ___"+seq).val()	

		var horaInicioAux1 = $("#HORAINICIOIMPRO1___"+seq).val()
		var horaFimAux1 = $("#HORAFIMIMPRO1___"+seq).val()
		
		// SE HORA INÍCIO E FIM FORAM PREENCHIDAS
		if(!(horaInicioAux1=="" || horaInicioAux1==null || horaInicioAux1==undefined) && !(horaFimAux1=="" || horaFimAux1==null || horaFimAux1==undefined)){
			
			var hoje = new Date()
			hoje = geraDataBanco(hoje)
			
			horaInicioAux1 = new Date(hoje+" "+horaInicioAux1)
			horaFimAux1 = new Date(hoje+" "+horaFimAux1)
			
			console.log("horaInicio: "+horaInicio+", horaFim: "+horaFim+", horaInicioAux: "+horaInicioAux1+", horaFimAux: "+horaFimAux1)
			
			// SE HORAS INÍCIO E FIM NÃO ESTÃO EM CONFLITO COM OUTRAS DA MESMA ATIVIDADE
			if((horaInicio<horaInicioAux1 && horaFim<horaInicioAux1) || (horaInicio>horaFimAux1 && horaFim>horaFimAux1)){
				
				console.log("horas não são conflitantes")
				
				//ret = false
				
			} else {
				// SE NÃO, HORAS SÃO CONFLITANTES
				
				console.log("horas são conflitantes")
				
				ret = true
				
			}
			
		}
		
		if(!ret){
			
			var horaInicioAux2 = $("#HORAINICIOIMPRO2___"+seq).val()
			var horaFimAux2 = $("#HORAFIMIMPRO2___"+seq).val()
			
			// SE HORA INÍCIO E FIM FORAM PREENCHIDAS
			if(!(horaInicioAux2=="" || horaInicioAux2==null || horaInicioAux2==undefined) && !(horaFimAux2=="" || horaFimAux2==null || horaFimAux2==undefined)){
				
				var hoje = new Date()
				hoje = geraDataBanco(hoje)
				
				horaInicioAux2 = new Date(hoje+" "+horaInicioAux2)
				horaFimAux2 = new Date(hoje+" "+horaFimAux2)
				
				console.log("horaInicio: "+horaInicio+", horaFim: "+horaFim+", horaInicioAux: "+horaInicioAux2+", horaFimAux: "+horaFimAux2)
				
				// SE HORAS INÍCIO E FIM NÃO ESTÃO EM CONFLITO COM OUTRAS DA MESMA ATIVIDADE
				if((horaInicio<horaInicioAux2 && horaFim<horaInicioAux2) || (horaInicio>horaFimAux2 && horaFim>horaFimAux2)){
					
					console.log("horas não são conflitantes")
					
					//ret = false
					
				} else {
					// SE NÃO, HORAS SÃO CONFLITANTES
					
					console.log("horas são conflitantes")
					
					ret = true
					
				}
				
			}
			
		}
		
		if(!ret){
			
			var horaInicioAux3 = $("#HORAINICIOIMPRO3___"+seq).val()
			var horaFimAux3 = $("#HORAFIMIMPRO3___"+seq).val()
			
			// SE HORA INÍCIO E FIM FORAM PREENCHIDAS
			if(!(horaInicioAux3=="" || horaInicioAux3==null || horaInicioAux3==undefined) && !(horaFimAux3=="" || horaFimAux3==null || horaFimAux3==undefined)){
				
				// SE NÃO É A MESMA ATIVIDADE
				if(!(seqAtv==seqAux)){
				
					var hoje = new Date()
					hoje = geraDataBanco(hoje)
					
					horaInicioAux3 = new Date(hoje+" "+horaInicioAux3)
					horaFimAux3 = new Date(hoje+" "+horaFimAux3)
					
					console.log("horaInicio: "+horaInicio+", horaFim: "+horaFim+", horaInicioAux: "+horaInicioAux3+", horaFimAux: "+horaFimAux3)
					
					// SE HORAS INÍCIO E FIM NÃO ESTÃO EM CONFLITO COM OUTRAS DA MESMA ATIVIDADE
					if((horaInicio<horaInicioAux3 && horaFim<horaInicioAux3) || (horaInicio>horaFimAux3 && horaFim>horaFimAux3)){
						
						console.log("horas não são conflitantes")
						
					//	ret = false
						
					} else {
						// SE NÃO, HORAS SÃO CONFLITANTES
						
						console.log("horas são conflitantes")
						
						ret = true
						
					}
					
				}
					
			}
			
		}
		
		if(!ret){
			
			var horaInicioAux4 = $("#HORAINICIOIMPRO4___"+seq).val()
			var horaFimAux4 = $("#HORAFIMIMPRO4___"+seq).val()
			
			// SE HORA INÍCIO E FIM FORAM PREENCHIDAS
			if(!(horaInicioAux4=="" || horaInicioAux4==null || horaInicioAux4==undefined) && !(horaFimAux4=="" || horaFimAux4==null || horaFimAux4==undefined)){
				
				var hoje = new Date()
				hoje = geraDataBanco(hoje)
				
				horaInicioAux4 = new Date(hoje+" "+horaInicioAux4)
				horaFimAux4 = new Date(hoje+" "+horaFimAux4)
				
				console.log("horaInicio: "+horaInicio+", horaFim: "+horaFim+", horaInicioAux: "+horaInicioAux4+", horaFimAux: "+horaFimAux4)
				
				// SE HORAS INÍCIO E FIM NÃO ESTÃO EM CONFLITO COM OUTRAS DA MESMA ATIVIDADE
				if((horaInicio<horaInicioAux4 && horaFim<horaInicioAux4) || (horaInicio>horaFimAux4 && horaFim>horaFimAux4)){
					
					console.log("horas não são conflitantes")
					
					//ret = false
					
				} else {
					// SE NÃO, HORAS SÃO CONFLITANTES
					
					console.log("horas são conflitantes")
					
					ret = true
					
				}
				
			}
			
		}
		
		if(!ret){
			
			var horaInicioAux5 = $("#HORAINICIOIMPRO5___"+seq).val()
			var horaFimAux5 = $("#HORAFIMIMPRO5___"+seq).val()
			
			// SE HORA INÍCIO E FIM FORAM PREENCHIDAS
			if(!(horaInicioAux5=="" || horaInicioAux5==null || horaInicioAux5==undefined) && !(horaFimAux5=="" || horaFimAux5==null || horaFimAux5==undefined)){
				
				var hoje = new Date()
				hoje = geraDataBanco(hoje)
				
				horaInicioAux5 = new Date(hoje+" "+horaInicioAux5)
				horaFimAux5 = new Date(hoje+" "+horaFimAux5)
				
				console.log("horaInicio: "+horaInicio+", horaFim: "+horaFim+", horaInicioAux: "+horaInicioAux5+", horaFimAux: "+horaFimAux5)
				
				// SE HORAS INÍCIO E FIM NÃO ESTÃO EM CONFLITO COM OUTRAS DA MESMA ATIVIDADE
				if((horaInicio<horaInicioAux5 && horaFim<horaInicioAux5) || (horaInicio>horaFimAux5 && horaFim>horaFimAux5)){
					
					console.log("horas não são conflitantes")
					
					//ret = false
					
				} else {
					// SE NÃO, HORAS SÃO CONFLITANTES
					
					console.log("horas são conflitantes")
					
					ret = true
					
				}
				
			}
			
		}
		
	})
	
	return ret
	
}

// VERIFICA SE HORAS INFORMADAS ESTÃO EM CONFLITOS COM OUTRAS HORAS IMPRODUTIVAS DA ATUAL E DE OUTRAS ATIVIDADES
function horasImpr4(op,idAtv,horaInicio,horaFim,seqAtv){
	
	console.log("op: "+op+", idAtv: "+idAtv+", horaInicio: "+horaInicio+", horaFim: "+horaFim+", seq: "+seqAtv)
	
	var ret = false
	
	// PERCORRE TODOS OS REGISTROS DA TABELA DE ATIVIDADES
	$("input[id^='CODIGOPRD___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var idAtvAux = $("#IDATIVIDADE___"+seq).val()
		var opAux = $("#OP___"+seq).val()
		var dataProgAux = $("#DATAPROGRAMADA___"+seq).val()
		var seqAux = $("#SEQ___"+seq).val()	

		var horaInicioAux1 = $("#HORAINICIOIMPRO1___"+seq).val()
		var horaFimAux1 = $("#HORAFIMIMPRO1___"+seq).val()
		
		// SE HORA INÍCIO E FIM FORAM PREENCHIDAS
		if(!(horaInicioAux1=="" || horaInicioAux1==null || horaInicioAux1==undefined) && !(horaFimAux1=="" || horaFimAux1==null || horaFimAux1==undefined)){
			
			var hoje = new Date()
			hoje = geraDataBanco(hoje)
			
			horaInicioAux1 = new Date(hoje+" "+horaInicioAux1)
			horaFimAux1 = new Date(hoje+" "+horaFimAux1)
			
			console.log("horaInicio: "+horaInicio+", horaFim: "+horaFim+", horaInicioAux: "+horaInicioAux1+", horaFimAux: "+horaFimAux1)
			
			// SE HORAS INÍCIO E FIM NÃO ESTÃO EM CONFLITO COM OUTRAS DA MESMA ATIVIDADE
			if((horaInicio<horaInicioAux1 && horaFim<horaInicioAux1) || (horaInicio>horaFimAux1 && horaFim>horaFimAux1)){
				
				console.log("horas não são conflitantes")
				
				//ret = false
				
			} else {
				// SE NÃO, HORAS SÃO CONFLITANTES
				
				console.log("horas são conflitantes")
				
				ret = true
				
			}
			
		}
		
		if(!ret){
			
			var horaInicioAux2 = $("#HORAINICIOIMPRO2___"+seq).val()
			var horaFimAux2 = $("#HORAFIMIMPRO2___"+seq).val()
			
			// SE HORA INÍCIO E FIM FORAM PREENCHIDAS
			if(!(horaInicioAux2=="" || horaInicioAux2==null || horaInicioAux2==undefined) && !(horaFimAux2=="" || horaFimAux2==null || horaFimAux2==undefined)){
				
				var hoje = new Date()
				hoje = geraDataBanco(hoje)
				
				horaInicioAux2 = new Date(hoje+" "+horaInicioAux2)
				horaFimAux2 = new Date(hoje+" "+horaFimAux2)
				
				console.log("horaInicio: "+horaInicio+", horaFim: "+horaFim+", horaInicioAux: "+horaInicioAux2+", horaFimAux: "+horaFimAux2)
				
				// SE HORAS INÍCIO E FIM NÃO ESTÃO EM CONFLITO COM OUTRAS DA MESMA ATIVIDADE
				if((horaInicio<horaInicioAux2 && horaFim<horaInicioAux2) || (horaInicio>horaFimAux2 && horaFim>horaFimAux2)){
					
					console.log("horas não são conflitantes")
					
					//ret = false
					
				} else {
					// SE NÃO, HORAS SÃO CONFLITANTES
					
					console.log("horas são conflitantes")
					
					ret = true
					
				}
				
			}
			
		}
		
		if(!ret){
			
			var horaInicioAux3 = $("#HORAINICIOIMPRO3___"+seq).val()
			var horaFimAux3 = $("#HORAFIMIMPRO3___"+seq).val()
			
			// SE HORA INÍCIO E FIM FORAM PREENCHIDAS
			if(!(horaInicioAux3=="" || horaInicioAux3==null || horaInicioAux3==undefined) && !(horaFimAux3=="" || horaFimAux3==null || horaFimAux3==undefined)){
				
				var hoje = new Date()
				hoje = geraDataBanco(hoje)
				
				horaInicioAux3 = new Date(hoje+" "+horaInicioAux3)
				horaFimAux3 = new Date(hoje+" "+horaFimAux3)
				
				console.log("horaInicio: "+horaInicio+", horaFim: "+horaFim+", horaInicioAux: "+horaInicioAux3+", horaFimAux: "+horaFimAux3)
				
				// SE HORAS INÍCIO E FIM NÃO ESTÃO EM CONFLITO COM OUTRAS DA MESMA ATIVIDADE
				if((horaInicio<horaInicioAux3 && horaFim<horaInicioAux3) || (horaInicio>horaFimAux3 && horaFim>horaFimAux3)){
					
					console.log("horas não são conflitantes")
					
					//ret = false
					
				} else {
					// SE NÃO, HORAS SÃO CONFLITANTES
					
					console.log("horas são conflitantes")
					
					ret = true
					
				}
					
			}
			
		}
		
		if(!ret){
			
			var horaInicioAux4 = $("#HORAINICIOIMPRO4___"+seq).val()
			var horaFimAux4 = $("#HORAFIMIMPRO4___"+seq).val()
			
			// SE HORA INÍCIO E FIM FORAM PREENCHIDAS
			if(!(horaInicioAux4=="" || horaInicioAux4==null || horaInicioAux4==undefined) && !(horaFimAux4=="" || horaFimAux4==null || horaFimAux4==undefined)){
				
				// SE NÃO É A MESMA ATIVIDADE
				if(!(seqAtv==seqAux)){
				
					var hoje = new Date()
					hoje = geraDataBanco(hoje)
					
					horaInicioAux4 = new Date(hoje+" "+horaInicioAux4)
					horaFimAux4 = new Date(hoje+" "+horaFimAux4)
					
					console.log("horaInicio: "+horaInicio+", horaFim: "+horaFim+", horaInicioAux: "+horaInicioAux4+", horaFimAux: "+horaFimAux4)
					
					// SE HORAS INÍCIO E FIM NÃO ESTÃO EM CONFLITO COM OUTRAS DA MESMA ATIVIDADE
					if((horaInicio<horaInicioAux4 && horaFim<horaInicioAux4) || (horaInicio>horaFimAux4 && horaFim>horaFimAux4)){
						
						console.log("horas não são conflitantes")
						
						//ret = false
						
					} else {
						// SE NÃO, HORAS SÃO CONFLITANTES
						
						console.log("horas são conflitantes")
						
						ret = true
						
					}
					
				}
				
			}
			
		}
		
		if(!ret){
		
			var horaInicioAux5 = $("#HORAINICIOIMPRO5___"+seq).val()
			var horaFimAux5 = $("#HORAFIMIMPRO5___"+seq).val()
			
			// SE HORA INÍCIO E FIM FORAM PREENCHIDAS
			if(!(horaInicioAux5=="" || horaInicioAux5==null || horaInicioAux5==undefined) && !(horaFimAux5=="" || horaFimAux5==null || horaFimAux5==undefined)){
				
				var hoje = new Date()
				hoje = geraDataBanco(hoje)
				
				horaInicioAux5 = new Date(hoje+" "+horaInicioAux5)
				horaFimAux5 = new Date(hoje+" "+horaFimAux5)
				
				console.log("horaInicio: "+horaInicio+", horaFim: "+horaFim+", horaInicioAux: "+horaInicioAux5+", horaFimAux: "+horaFimAux5)
				
				// SE HORAS INÍCIO E FIM NÃO ESTÃO EM CONFLITO COM OUTRAS DA MESMA ATIVIDADE
				if((horaInicio<horaInicioAux5 && horaFim<horaInicioAux5) || (horaInicio>horaFimAux5 && horaFim>horaFimAux5)){
					
					console.log("horas não são conflitantes")
					
					//ret = false
					
				} else {
					// SE NÃO, HORAS SÃO CONFLITANTES
					
					console.log("horas são conflitantes")
					
					ret = true
					
				}
				
			}
		
		}
			
	})
	
	return ret
	
}

//VERIFICA SE HORAS INFORMADAS ESTÃO EM CONFLITOS COM OUTRAS HORAS IMPRODUTIVAS DA ATUAL E DE OUTRAS ATIVIDADES
function horasImpr5(op,idAtv,horaInicio,horaFim,seqAtv){
	
	console.log("op: "+op+", idAtv: "+idAtv+", horaInicio: "+horaInicio+", horaFim: "+horaFim+", seq: "+seqAtv)
	
	var ret = false
	
	// PERCORRE TODOS OS REGISTROS DA TABELA DE ATIVIDADES
	$("input[id^='CODIGOPRD___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var idAtvAux = $("#IDATIVIDADE___"+seq).val()
		var opAux = $("#OP___"+seq).val()
		var dataProgAux = $("#DATAPROGRAMADA___"+seq).val()
		var seqAux = $("#SEQ___"+seq).val()	

		var horaInicioAux1 = $("#HORAINICIOIMPRO1___"+seq).val()
		var horaFimAux1 = $("#HORAFIMIMPRO1___"+seq).val()
		
		// SE HORA INÍCIO E FIM FORAM PREENCHIDAS
		if(!(horaInicioAux1=="" || horaInicioAux1==null || horaInicioAux1==undefined) && !(horaFimAux1=="" || horaFimAux1==null || horaFimAux1==undefined)){
			
			var hoje = new Date()
			hoje = geraDataBanco(hoje)
			
			horaInicioAux1 = new Date(hoje+" "+horaInicioAux1)
			horaFimAux1 = new Date(hoje+" "+horaFimAux1)
			
			console.log("horaInicio: "+horaInicio+", horaFim: "+horaFim+", horaInicioAux: "+horaInicioAux1+", horaFimAux: "+horaFimAux1)
			
			// SE HORAS INÍCIO E FIM NÃO ESTÃO EM CONFLITO COM OUTRAS DA MESMA ATIVIDADE
			if((horaInicio<horaInicioAux1 && horaFim<horaInicioAux1) || (horaInicio>horaFimAux1 && horaFim>horaFimAux1)){
				
				console.log("horas não são conflitantes")
				
				//ret = false
				
			} else {
				// SE NÃO, HORAS SÃO CONFLITANTES
				
				console.log("horas são conflitantes")
				
				ret = true
				
			}
			
		}
		
		if(!ret){
			
			var horaInicioAux2 = $("#HORAINICIOIMPRO2___"+seq).val()
			var horaFimAux2 = $("#HORAFIMIMPRO2___"+seq).val()
			
			// SE HORA INÍCIO E FIM FORAM PREENCHIDAS
			if(!(horaInicioAux2=="" || horaInicioAux2==null || horaInicioAux2==undefined) && !(horaFimAux2=="" || horaFimAux2==null || horaFimAux2==undefined)){
				
				var hoje = new Date()
				hoje = geraDataBanco(hoje)
				
				horaInicioAux2 = new Date(hoje+" "+horaInicioAux2)
				horaFimAux2 = new Date(hoje+" "+horaFimAux2)
				
				console.log("horaInicio: "+horaInicio+", horaFim: "+horaFim+", horaInicioAux: "+horaInicioAux2+", horaFimAux: "+horaFimAux2)
				
				// SE HORAS INÍCIO E FIM NÃO ESTÃO EM CONFLITO COM OUTRAS DA MESMA ATIVIDADE
				if((horaInicio<horaInicioAux2 && horaFim<horaInicioAux2) || (horaInicio>horaFimAux2 && horaFim>horaFimAux2)){
					
					console.log("horas não são conflitantes")
					
					//ret = false
					
				} else {
					// SE NÃO, HORAS SÃO CONFLITANTES
					
					console.log("horas são conflitantes")
					
					ret = true
					
				}
				
			}
			
		}
		
		if(!ret){
			
			var horaInicioAux3 = $("#HORAINICIOIMPRO3___"+seq).val()
			var horaFimAux3 = $("#HORAFIMIMPRO3___"+seq).val()
			
			// SE HORA INÍCIO E FIM FORAM PREENCHIDAS
			if(!(horaInicioAux3=="" || horaInicioAux3==null || horaInicioAux3==undefined) && !(horaFimAux3=="" || horaFimAux3==null || horaFimAux3==undefined)){
				
				var hoje = new Date()
				hoje = geraDataBanco(hoje)
				
				horaInicioAux3 = new Date(hoje+" "+horaInicioAux3)
				horaFimAux3 = new Date(hoje+" "+horaFimAux3)
				
				console.log("horaInicio: "+horaInicio+", horaFim: "+horaFim+", horaInicioAux: "+horaInicioAux3+", horaFimAux: "+horaFimAux3)
				
				// SE HORAS INÍCIO E FIM NÃO ESTÃO EM CONFLITO COM OUTRAS DA MESMA ATIVIDADE
				if((horaInicio<horaInicioAux3 && horaFim<horaInicioAux3) || (horaInicio>horaFimAux3 && horaFim>horaFimAux3)){
					
					console.log("horas não são conflitantes")
					
					//ret = false
					
				} else {
					// SE NÃO, HORAS SÃO CONFLITANTES
					
					console.log("horas são conflitantes")
					
					ret = true
					
				}
					
			}
			
		}
		
		if(!ret){
			
			var horaInicioAux4 = $("#HORAINICIOIMPRO4___"+seq).val()
			var horaFimAux4 = $("#HORAFIMIMPRO4___"+seq).val()
			
			// SE HORA INÍCIO E FIM FORAM PREENCHIDAS
			if(!(horaInicioAux4=="" || horaInicioAux4==null || horaInicioAux4==undefined) && !(horaFimAux4=="" || horaFimAux4==null || horaFimAux4==undefined)){
				
				var hoje = new Date()
				hoje = geraDataBanco(hoje)
				
				horaInicioAux4 = new Date(hoje+" "+horaInicioAux4)
				horaFimAux4 = new Date(hoje+" "+horaFimAux4)
				
				console.log("horaInicio: "+horaInicio+", horaFim: "+horaFim+", horaInicioAux: "+horaInicioAux4+", horaFimAux: "+horaFimAux4)
				
				// SE HORAS INÍCIO E FIM NÃO ESTÃO EM CONFLITO COM OUTRAS DA MESMA ATIVIDADE
				if((horaInicio<horaInicioAux4 && horaFim<horaInicioAux4) || (horaInicio>horaFimAux4 && horaFim>horaFimAux4)){
					
					console.log("horas não são conflitantes")
					
					//ret = false
					
				} else {
					// SE NÃO, HORAS SÃO CONFLITANTES
					
					console.log("horas são conflitantes")
					
					ret = true
					
				}
				
			}
			
		}
		
		if(!ret){
			
			var horaInicioAux5 = $("#HORAINICIOIMPRO5___"+seq).val()
			var horaFimAux5 = $("#HORAFIMIMPRO5___"+seq).val()
			
			// SE HORA INÍCIO E FIM FORAM PREENCHIDAS
			if(!(horaInicioAux5=="" || horaInicioAux5==null || horaInicioAux5==undefined) && !(horaFimAux5=="" || horaFimAux5==null || horaFimAux5==undefined)){
				
				// SE NÃO É A MESMA ATIVIDADE
				if(!(seqAtv==seqAux)){
				
					var hoje = new Date()
					hoje = geraDataBanco(hoje)
					
					horaInicioAux5 = new Date(hoje+" "+horaInicioAux5)
					horaFimAux5 = new Date(hoje+" "+horaFimAux5)
					
					console.log("horaInicio: "+horaInicio+", horaFim: "+horaFim+", horaInicioAux: "+horaInicioAux5+", horaFimAux: "+horaFimAux5)
					
					// SE HORAS INÍCIO E FIM NÃO ESTÃO EM CONFLITO COM OUTRAS DA MESMA ATIVIDADE
					if((horaInicio<horaInicioAux5 && horaFim<horaInicioAux5) || (horaInicio>horaFimAux5 && horaFim>horaFimAux5)){
						
						console.log("horas não são conflitantes")
						
						//ret = false
						
					} else {
						// SE NÃO, HORAS SÃO CONFLITANTES
						
						console.log("horas são conflitantes")
						
						ret = true
						
					}
				
				}
					
			}
			
		}
		
	})
	
	return ret
	
}

// VERIFICA SE EXISTEM APONTAMENTOS QUE JÁ FORAM APONTADOS (DUPLICIDADE)
function duplicidadeApontamento(){
	
	console.log("verifica se existem apontamentos duplicados")
	
	var apontamentos = ""
	
	// PERCORRE TODOS OS REGISTROS DA TABELA DAS ATIVIDADES
	$("input[id^='CODIGOPRD___']").each(function(){
	
		var seq = $(this).attr("id").split("___")[1]
		
		var codColigada = $("#CODCOLIGADAATV___"+seq).val()
		var codFilial = $("#CODFILIALATV___"+seq).val()
		var codEstrutura = $("#CODESTRUTURAATV___"+seq).val()
		var codOrdem = $("#OP___"+seq).val()
		var idAtvOrdem = $("#IDATIVIDADE___"+seq).val()
		var codmo = $("#CODMO___"+seq).val()
		var descAtividade = $("#DSCATIVIDADE___"+seq).val()
		var descAp = " a OP "+codOrdem+" e ID "+idAtvOrdem+" "
		
		console.log("codColigada: "+codColigada+", codFilial: "+codFilial+", codEstrutura: "+codEstrutura+", codOrdem: "+codOrdem+", codmo: "+codmo)
		
		// PERCORRE TODOS OS REGISTROS DA TABELA DAS HORAS APONTADAS
		$("input[id^='CODAPONTAMENTO___']").each(function(){
		
			var seqAux = $(this).attr("id").split("___")[1]
			
			// HORAS PRODUTIVAS
			var dataInicial = $("#HORAINICIOAPONT___"+seqAux).val()
			var dataFinal = $("#HORAFIMAPONT___"+seqAux).val()
			var saldo = $("#TOTALHORAS___"+seqAux).val()
			var tipo = $("#CODAPONTAMENTO___"+seqAux).val()
			
			console.log("dataInicial: "+dataInicial+", dataFinal: "+dataFinal+", saldo: "+saldo+", tipo: "+tipo)
			
			// SE É UMA HORA PRODUTIVA COM HORAS LANÇADAS
			if((tipo=="" || tipo==null || tipo==undefined) && !(saldo=="" || saldo==null || saldo==undefined)){
				
				// BUSCA SE JÁ EXISTE APONTAMENTO
				if(buscaDupliciadeApont(codColigada,codFilial,codOrdem,codEstrutura,codmo,dataInicial,dataFinal)){
					
					// SE AINDA NÃO TEM APONTAMENTOS DUPLICADOS
					if(apontamentos=="" || apontamentos==null || apontamentos==undefined){
						
						apontamentos = descAp
						
					} else {
						// SE TEVE
						
						// SE ATIVIDADE DA OP AINDA NÃO FOI SALVA
						if(!apontamentos.includes(descAp)){
							
							apontamentos = apontamentos+","+descAp
							
						}
						
					}
					
				}
				
			}
			
		})
		
	})
	
	console.log("finalizei a busca dos apontamentos duplicados")
	
	console.log("apontamentos: "+apontamentos)
	
	// SE NÃO HÁ APONTAMENTOS DUPLICADOS
	if(apontamentos=="" || apontamentos==null || apontamentos==undefined){
		
		return false
		
	} else {
		// SE NÃO 
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: ''+apontamentos+", já tem apontamento integrado para mesma data e hora",
			  text: 'Verifique e tente novamente'
		})
		
		return true
		
	}
	
}

// BUSCA APONTAMENTOS QUE FORAM DUPLICADOS
function buscaDupliciadeApont(codColigada,codFilial,codOrdem,codEstrutura,codmo,dataInicial,dataFinal){

	console.log("vou buscar os apontamentos que foram duplicados")
	
	var apontamentos = ""
	
	// MONTA O ARRAY DAS CONSTRAINTS
	var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
	var a4 = DatasetFactory.createConstraint("CODESTRUTURA",codEstrutura,codEstrutura,ConstraintType.MUST)
	var a5 = DatasetFactory.createConstraint("CODMO",codmo,codmo,ConstraintType.MUST)
	var a6 = DatasetFactory.createConstraint("DTHRINICIAL",dataInicial,dataInicial,ConstraintType.MUST)
	var a7 = DatasetFactory.createConstraint("DTHRFINAL",dataFinal,dataFinal,ConstraintType.MUST)

	var constraints = new Array(a1,a2,a3,a4,a5,a6,a7)
	
	var dataset = DatasetFactory.getDataset("dsDuplicidadeApontamento",null,constraints,null)
	var row = dataset.values
	
	console.log("row")
	console.log(row)
	
	// SE RETORNO NÃO É NULO OU VAZIO
	if(!(row=="" || row==null || row==undefined)){
		
		return true
		
	} else {
		// SE NÃO
		
		return false
		
	}
	
}

// HABILITA O CAMPO DO PLANO DE CORTE
function habilitaPlano(){

	var dataApont = $("#DATA_DE").val()
	dataApont = dataApont.toString() + " ;"
	console.log("data: "+dataApont)
	
	dataApont = formataDataBanco(dataApont)
	
	var dataAtual = new Date()
	dataAtual = geraDataBanco(dataAtual)
	
	var dataMax = new Date(dataAtual)
	var dataAux = new Date(dataApont)
	
	// SE A DATA SELECIONADA NÃO É MAIOR QUE A DATA ATUAL
	if(!(dataAux>dataMax)){
		
		$("#PLANOCORTE").prop("disabled",false)
		
		// REMOVE A SELEÇÃO
		$("#PLANOCORTE>option").remove()
		$("#NUMPLANOCORTE").val("")
		$("#CODCOLIGADA").val("")
		
		// LIMPA TODOS OS CAMPOS PREENCHIDOS
		limpaCampos()
		
	}
	
}

// LIMPA TODOS OS CAMPOS PREENCHIDOS
function limpaCampos(){
	
	console.log("limpa os campos")
	
	// REMOVE A SELEÇÃO
	$("#PLANOCORTE>option").remove()
	$("#NUMPLANOCORTE").val("")
	$("#CODCOLIGADA").val("")
	$("#MATRICULA>option").remove()
	$("#CODMO").val("")
	$("#TURNO").val("")
	$("#LOTEMP").val("")
	$("#IDLOTE").val("")
	$("#NUMLOTE").val("")
	$("#CODIGOPRDMP").val("")
	$("#QTDEMP").val("")
	$("#MATRICULA").prop("disabled",true)
	
	apagaModal()
	limpaComps()
	limpaAtvs()
	
}

// VERIFICA SE A DATA SELECIONADA É MENOR OU IGUAL A DATA ATUAL
function verificaData(){
	
	console.log("vou verificar a data selecionada")
	
	var dataApont = $("#DATA_DE").val()
	dataApont = dataApont.toString() + " ;"
	console.log("data: "+dataApont)
	
	dataApont = formataDataBanco(dataApont)
	
	var dataAtual = new Date()
	dataAtual = geraDataBanco(dataAtual)
	
	var dataMax = new Date(dataAtual)
	var dataAux = new Date(dataApont)
	
	// SE A DATA SELECIONADA É MAIOR QUE A DATA ATUAL
	if(dataAux>dataMax){
		
		console.log("a data selecionada é maior que a atual")
		
		// LIMPA O CAMPO DA DATA SELECIONADA
		$("#DATA_DE").val("")
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'A data selecionada é maior que a data atual',
			  text: 'Verifique e tente novamente'
		})
		
	} /*else {
		// SE NÃO
		
		$("#PLANOCORTE").prop("disabled",false)
		
		// REMOVE A SELEÇÃO
		$("#PLANOCORTE>option").remove()
		$("#NUMPLANOCORTE").val("")
		$("#CODCOLIGADA").val("")
		
	}*/
	
}

// VERIFICA SE PLANO JÁ FOI SELECIONADO
function verificaModal(){
	
	var ret = false
	
	// PERCORRE A TABELA DO MODAL
	$("input[id^='OP_MODAL___']").each(function(){
		
		ret = true
		
	})
	
	// SE NÃO HÁ REGISTROS NA TABELA DO MODAL
	if(!ret){
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'O Plano de Corte não foi selecionado',
			  text: 'Verifique e tente novamente'
		})
		
	}
	
}

// CARREGA O MODAL DO PLANO DE CORTE
function carregaModal(numPlano,codFilial){
	
	console.log("vou carregar o modal")
		
	var codmo = $("#CODMO").val()
	var dataDe = $("#DATA_DE").val()
	
	// FORMATA A DATA PREENCHIDA NO PADRÃO PARA O BANCO
	dataDe = formataDataBanco(dataDe)

	console.log("codmo: "+codmo+", codFilial: "+codFilial+", dataDe: "+dataDe+", numPlano: "+numPlano)
	
	//var myLoading2 = FLUIGC.loading(window);

	/*
	// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
	var a1 = DatasetFactory.createConstraint("CODMO",codmo,codmo,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("NUMPLANOCORTE",numPlano,numPlano,ConstraintType.MUST)
	var a4 = DatasetFactory.createConstraint("DATA_DE",dataDe,dataDe,ConstraintType.MUST)
	//var a5 = DatasetFactory.createConstraint("DATA_ATE",dataAte,dataAte,ConstraintType.MUST)
	
	var constraints = new Array(a1,a2,a3,a4)
	 */
	
	// MONTA O ARRAY DAS CONSTRAINTS
	var a1 = DatasetFactory.createConstraint("NUMPLANOCORTE",numPlano,numPlano,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)

	var constraints = new Array(a1,a2)
	
	var dataset = DatasetFactory.getDataset("dsBuscaHistAtvProgOpePAPC",null,constraints,null)
	var row = dataset.values
	
	console.log("row")
	console.log(row)
	
	// SE RETORNO É NULO OU VAZIO
	if(!(row=="" || row==null || row==undefined)){
		
		var count = row.length
		
		// PERCORRE OS REGISTROS
		for(var i=0; i<count; i++){
			
			var seq = addModal()
			
			var rep = row[i]
			
			var ultimaAtv = ""
			
			// SE É A ÚLTIMA ATV
			if(rep["ATV_POSTERIOR"]=="ULTIMA"){
				
				ultimaAtv = rep["ATV_POSTERIOR"]
				
			}
				
			var op = rep["OP"]
			var idAtvOrdem = rep["IDATVORDEM"]
			//var qtdePlano = rep["QTDEPLANEJADA"]
			var qtdePlano = Number(rep["QTDEPLANO"])
			var qtdePrevistaOP = rep["QTDEPLANEJADA"]
			var qtdeApontada = Number(rep["APONTADO"])
			var codColigada = rep["CODCOLIGADA"]
			var codFilial = rep["CODFILIAL"]
			var numOS = rep["OS"]
			var idprd = rep["IDPRD"]
			var codigoprd = rep["CODIGOPRD"]
			var codEstrutura = rep["CODESTRUTURA"]
			var custoPosto = rep["CUSTO_POSTO"]
			var qtdeApontadaPlano =rep["QTDEAPONTADA"]
			var qtdmpfinal= rep["QTDMPFINAL"]
			
			// SALVA AS INFORMAÇÕES NO MODAL
			$("#OP_MODAL___"+seq).val(op)
			$("#CODCOLIGADA_MODAL___"+seq).val(codColigada)
			$("#CODFILIAL_MODAL___"+seq).val(codFilial)
			$("#ULTIMAATV_MODAL___"+seq).val(ultimaAtv)
			$("#IDATV_MODAL___"+seq).val(idAtvOrdem)
			$("#QTDEPLANO_MODAL___"+seq).val(qtdePlano)
			$("#QTDEPREVOP_MODAL___"+seq).val(qtdePrevistaOP)
			$("#QTDEAPONTADA_MODAL___"+seq).val(qtdeApontada)
			$("#OS_MODAL___"+seq).val(numOS)
			$("#IDPRD_MODAL___"+seq).val(idprd)
			$("#CODIGOPRD_MODAL___"+seq).val(codigoprd)
			$("#CODESTRUTURA_MODAL___"+seq).val(codEstrutura)
			$("#CUSTOPOSTO_MODAL___"+seq).val(custoPosto)
			$("#QTDMPFINAL_MODAL___"+seq).val(qtdmpfinal)
			
			// SE QUANTIDADE APONTADA DO PLANO NÃO É VAZIA OU NULA
			if(!(qtdeApontadaPlano=="" || qtdeApontadaPlano==null || qtdeApontadaPlano==undefined || qtdeApontadaPlano=="null" )){
				
				$("#QTDEAPONTADAPLANO_MODAL___"+seq).val(qtdeApontadaPlano)
				
			}else{
				// SE NÃO, ATRIUI VALOR '0'
				
				$("#QTDEAPONTADAPLANO_MODAL___"+seq).val(0)
				qtdeApontada = 0
				
			}

			qtdeApontadaPlano = Number(qtdeApontadaPlano)

			var verde = "linear-gradient(0deg, #96c3aa, #ddfde5, #96c3aa)";
			var amarelo = "linear-gradient(0deg, #f9fab2, #fff8e2, #f9fab2)";

			if(  qtdePlano==qtdeApontadaPlano  ){

				$("#OP_MODAL___"+seq).parent().parent().css("background-image",verde)
				// $("#IDATV_MODAL___"+seq).parent.css("background-image",verde)
				// $("#QTDEPLANO_MODAL___"+seq).parent().css("background-image",verde)
				// $("#QTDEAPONTADAPLANO_MODAL___"+seq).parent().css("background-image",verde)
				// $("#QTDEFABRICADA_MODAL___"+seq).parent().css("background-image",verde)
				$("#QTDEFABRICADA_MODAL___"+seq).val(0);

			}
			else{


				$("#OP_MODAL___"+seq).parent().parent().css("background-image",amarelo)
				// $("#IDATV_MODAL___"+seq).parent().css("background-image",amarelo)
				// $("#QTDEPLANO_MODAL___"+seq).parent().css("background-image",amarelo)
				// $("#QTDEAPONTADAPLANO_MODAL___"+seq).parent().css("background-image",amarelo)
				// $("#QTDEFABRICADA_MODAL___"+seq).parent().css("background-image",amarelo)
				
			}

		}

		//COLOCA O LINK NO MODAL
		$("#LINK_MODAL").parent().children("a").attr("href","#abrirModal")
		
	}
	
}

// COLOCA O LINK NO MODAL E DESABILITA O CAMPO DAS QUANTIDADES
function ajustaModal(){
	
	// COLOCA O LINK PARA O MODAL
	$("#LINK_MODAL").parent().children("a").attr("href","#abrirModal")

	// PERCORRE A TABELA DO MODAL
	$("input[id^='OP_MODAL___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		// DESABILITA OS CAMPOS DA QUANTIDADE FABRICADA
		$("#QTDEFABRICADA_MODAL___"+seq).prop("readonly",true)
		
	})
	
}

// APAGA A TABELA DO MODAL
function apagaModal(){
	
	// PERCORRE A TABELA DO MODAL
	$("input[id^='OP_MODAL___']").each(function(){
		
		$(this).parents("tr").remove()
		
	})
	
}

// VERIFICA A QUANTIDADE FABRICADA INFORMADA E CALCULA O AVANCO
function verificaQtdeModal(obj){

	var qtde = parseFloat($(obj).val()).toFixed(1)
	var seq = $(obj).attr("id").split("___")[1]
	var entraHoras = $("#ENTRADAHORAS").val()
	
	// SE A QUANTIDADE INFORMADA NÃO É NULA OU VAZIA OU ZERO
	if(!((qtde=="" || qtde==null || qtde==undefined) && qtde==0 )){
		
		var qtdePrevista = $("#QTDEPLANO_MODAL___"+seq).val()
		var qtdeApontada = $("#QTDEAPONTADA_MODAL___"+seq).val()
		var qtdeApontadaPlano = $("#QTDEAPONTADAPLANO_MODAL___"+seq).val()
		var qtdePrevistaOP = $("#QTDEPREVOP_MODAL___"+seq).val()
		
		qtde = parseFloat(qtde)
		qtdePrevista = parseFloat(qtdePrevista)
		qtdePrevistaOP = parseFloat(qtdePrevistaOP)
		qtdeApontada = parseFloat(qtdeApontada)
		qtdeApontadaPlano = parseFloat(qtdeApontadaPlano)

		console.log("qtde: "+qtde+", qtdePrevista: "+qtdePrevista+", qtdeApontada: "+qtdeApontada+", qtdeApontadaPlano: "+qtdeApontadaPlano)
		
		// A QUANTIDADE INFORMADA SOMADA A APONTADA ULTRAPASSOU A PREVISTA
		//if((qtde+qtdeApontada)>qtdePrevista){
		if((qtde+qtdeApontadaPlano)>qtdePrevista && Number(entraHoras)==0){
			
			// LIMPA OS CAMPOS
			$(obj).val("")
			$("#AVANCOATV_MODAL___"+seq).val("")
			
			$("#fecharModal")[0].click()
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'A quantidade informada, somada a que já foi apontada, ultrapassou a prevista',
				  text: 'Verifique e tente novamente'
					  
			}).then(function(result){
				 
			  if (result.value) {
				  
				  console.log("confirmei")
				  $("#QTDE_LINK")[0].click()
				
			  }
				
			})
			
		} else {
			// SE NÃO
		
			var avanco = ( (qtde+qtdeApontada)/qtdePrevistaOP ) * 100

			if( Number(avanco) > 100 ){
				avanco=100
			}

			avanco = avanco.toFixed(2)

			qtd = parseFloat(qtde.toString().replace(",","."))

			$(obj).val(qtde)

			console.log("avanço calculado: "+avanco)
			
			$("#AVANCOATV_MODAL___"+seq).val(avanco)
			
		}
		
	}
	
}

// BUSCA O AVANCO CALCULADO
function buscaAvancoAtvOp(codOrdem,idAtvOrdem){
	
	var avanco = ""
	
	console.log("vou buscar o avanco da OP: "+codOrdem+", e atividade de id: "+idAtvOrdem)
		
	// PERCORRE A TABELA DO MODAL
	$("input[id^='OP_MODAL___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var codOrdemAux = $("#OP_MODAL___"+seq).val()
		var idAtvOrdemAux = $("#IDATV_MODAL___"+seq).val()
		
		// SE É A MESMA OP E MESMA ATIVIDADE
		if(codOrdemAux==codOrdem && idAtvOrdemAux==idAtvOrdem){
			
			avanco = $("#AVANCOATV_MODAL___"+seq).val()
			
		}
		
	})
	
	console.log("avanco encontrado: "+avanco)
	
	return avanco
	
}

// CONFIRMA AS QTDES FABRICADAS DAS OP'S E FECHA O MODAL 
function confirmaQtdeOPS(){
	 
	console.log("confirmei")
	var myLoading2 = FLUIGC.loading(window);
	myLoading2.show();
	var atv = $("#ATIVIDADE").val();

	if(Number(atv)==6){
		
		setTimeout(function () {

			$("#fecharModal")[0].click()

			myLoading2.hide();
		},1000);

	}else{

		setTimeout(function () {
			
		
		
			// SE TEM QUANTIDADES INFORMADAS
			if(tabelaModalPreenchida()){
				
				$("#fecharModal")[0].click()

				//PREENCHE PREVISÕES DE BAIXAS
				preencheTabelaBaixas();
				//PREENCHE PREVISÕES DE ENTRADA
				preencheTabelaSaldo();
				//PREENCHE TABELA DOS COMPONENTES
				preencheComponentes();
				
			} else {
				// SE NÃO
				
				$("#fecharModal")[0].click()

				//LIMPA PREVISÕES DE BAIXAS
				limpaPrevBaixas();
				//LIMPA PREVISÕES DE ENTRADA
				limpaPrevSaldo();
				// LIMPA TABELA DOS COMPONENTES
				limpaComps();
				
				// EXIBE ALERTA
				Swal.fire({
					
					icon: 'error',
					title: 'A(s) quantidade(s) fabricada(s) não pode(m) ser vazia(s). Também é preciso que ao menos uma OP tenha quantidade fabricada maior que 0.',
					text: 'Em caso de não fabricação é necessário colocar o valor 0. Verifique e tente novamente'
						
				}).then(function(result){
					
				if (result.value) {
					
					$("#QTDE_LINK")[0].click()
					
				}
					
				})	
				
			}

			myLoading2.hide();

		}, 1000);

	}
	
}

// FECHA O MODAL
function fecharModal(){
	
	console.log("fechar o modal")

	var myLoading2 = FLUIGC.loading(window);
	myLoading2.show();
	var atv = $("#ATIVIDADE").val();
	
	if(Number(atv)==6){

		$("#fecharModal")[0].click()

	}else{
		// SE TEM QUANTIDADES INFORMADAS
		if(tabelaModalPreenchida()){
			
			$("#fecharModal")[0].click()
			//PREENCHE PREVISÕES DE BAIXAS
			preencheTabelaBaixas();
			//PREENCHE PREVISÕES DE ENTRADA
			preencheTabelaSaldo();
			//PREENCHE TABELA DOS COMPONENTES
			preencheComponentes();
			
		} else {
			// SE NÃO

			//LIMPA PREVISÕES DE BAIXAS
			limpaPrevBaixas();
			//LIMPA PREVISÕES DE ENTRADA
			limpaPrevSaldo();
			// LIMPA AS QUANTIDADES DO MODAL
			limpaQtdesModal();
			// LIMPA TABELA DOS COMPONENTES
			limpaComps();
			
		}
	}

	myLoading2.hide();
}

//LIMPA TABELA QUE IRÁ ALIMENTAR AS QUANTIDADES NA GERAÇÃO DOS MOVIMENTOS DE BAIXA DE MATERIAL
function limpaPrevBaixas(){
	
	// PERCORRE A TABELA DAS ATIVIDADES
	$("input[id^='BAOP___']").each(function(){
	
		$(this).parents("tr").remove()
		
	})
	
}

//PREENCHE TABELA QUE IRÁ ALIMENTAR AS QUANTIDADES NA GERAÇÃO DOS MOVIMENTOS DE BAIXA DE MATERIAL
function preencheTabelaBaixas(){

	limpaPrevBaixas();
	var qtdprevtotal = 0
	var qtdapontadatotal =  0
	var qtdmptotalapontada = 0

	var ultima = UltimaParaConsumirLote()
	console.log("ultima atividade = "+ultima)

	$("input[id^='OP_MODAL___']").each(function(){
			

		var seq = $(this).attr("id").split("___")[1]
		
		var qtdplano = $("#QTDEPLANO_MODAL___"+seq).val()
		var qtdapontada = $("#QTDEAPONTADAPLANO_MODAL___"+seq).val()
		var qtdfabricada = $("#QTDEFABRICADA_MODAL___"+seq).val()

		qtdprevtotal += Number(qtdplano)
		qtdapontadatotal +=  Number(qtdapontada) +  Number(qtdfabricada)

		console.log("qtdprevtotal: "+qtdprevtotal)
		console.log("qtdapontadatotal: "+qtdapontadatotal)
		console.log("qtdmpapontadatotal: "+qtdmptotalapontada)

	})

	$("input[id^='OP_MODAL___']").each(function(){
			

		var seq = $(this).attr("id").split("___")[1]
		
		var op = $("#OP_MODAL___"+seq).val()
		var idatv = $("#IDATV_MODAL___"+seq).val()
		var qtdplano = $("#QTDEPLANO_MODAL___"+seq).val()
		var qtdapontada = $("#QTDEAPONTADAPLANO_MODAL___"+seq).val()
		var qtdfabricada = $("#QTDEFABRICADA_MODAL___"+seq).val()
		var qtdmpfinal = $("#QTDMPFINAL_MODAL___"+seq).val()

		//SE ATIVIDADE ESTÁ SENDO APONTADA
		if( Number(qtdfabricada) > 0){
			
			row=wdkAddChild('TABLEBAIXASPAPC');
			$("#BAOP___"+row).val(op)
			$("#BAIDATV___"+row).val(idatv)
			$("#BAQTDTOTAL___"+row).val(qtdmpfinal)
			$("#BAPLANEJADO___"+row).val(qtdplano)
			$("#BAAPONTADO___"+row).val(qtdapontada)
			$("#BAEFETIVADO___"+row).val(qtdfabricada)

			var codColigada = $("#CODCOLIGADA").val()
			var codfilial = $("#CODFILIAL").val();
			var codigomp = $("#CODIGOPRDMP").val()
			var numPlanoCorte = $("#NUMPLANOCORTE").val()
			var idlote = $("#IDLOTE").val()
	
			var a1 = DatasetFactory.createConstraint("CODORDEM",op,op,ConstraintType.MUST);
			var a2 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST);
			var a3 = DatasetFactory.createConstraint("CODPRD",codigomp,codigomp,ConstraintType.MUST);
			var a4 = DatasetFactory.createConstraint("IDATVORDEM",idatv,idatv,ConstraintType.MUST);
			var a5 = DatasetFactory.createConstraint("CODFILIAL",codfilial,codfilial,ConstraintType.MUST);
			var a6 = DatasetFactory.createConstraint("NUMPLANO",numPlanoCorte,numPlanoCorte,ConstraintType.MUST);
			var a7 = DatasetFactory.createConstraint("IDLOTE",idlote,idlote,ConstraintType.MUST);

			var constraints = new Array(a1,a2,a3,a4,a5,a6,a7);
			
			var dataset = DatasetFactory.getDataset("dsQuantidadeApontada",null,constraints,null);

			rep=dataset.values

			var qtdamppontada= Math.floor(Number(rep[0]["QUANTIDADE"]*10000))/10000

			// SE A ATIVIDADE ESTÁ SENDO CONCLUIDA
			if((Number(qtdfabricada)+Number(qtdapontada))==qtdplano){

				// SE A ATIVIDADE É A ULTIMA DO PLANO QUE IRÁ CONCLUÍ-LO
				if( seq == ultima  && (qtdprevtotal==qtdapontadatotal)){

					var qtdmppapc = $("#QTDEMP").val()
					qtdunit = Number(qtdmppapc) - Number(qtdmptotalapontada) 

					qtdunit = parseFloat(qtdunit)
					qtdunit = Math.round(qtdunit*10000)/10000
					console.log(row)
					console.log(qtdunit)

					$("#BAQTDUNIT___"+row).val(qtdunit)
					$("#BAQTDAPONT___"+row).val(qtdamppontada)
					qtdmptotalapontada += Number(qtdunit) 

				}
				//SE NÃO
				else{

					qtdunit = Number(qtdmpfinal) - Number(qtdamppontada)
					qtdunit = parseFloat(qtdunit)
					qtdunit = Math.round(qtdunit*10000)/10000
					console.log(row)
					console.log(qtdunit)

					$("#BAQTDUNIT___"+row).val(qtdunit)
					$("#BAQTDAPONT___"+row).val(qtdamppontada)
					qtdmptotalapontada += Number(qtdunit) 
				}

			}
			//SE NÃO
			else{

				var coeficiente = (Number(qtdfabricada)/Number(qtdplano))
				console.log(coeficiente)
				var qtdunit = Number(qtdmpfinal)*coeficiente
				qtdunit = parseFloat(qtdunit)
				qtdunit = Math.round(qtdunit*10000)/10000
				console.log(row)
				console.log(qtdunit)
				$("#BAQTDUNIT___"+row).val(qtdunit)
				$("#BAQTDAPONT___"+row).val(qtdamppontada)
				qtdmptotalapontada += Number(qtdunit)

			}
		}	
		
	})

	row=wdkAddChild('TABLEBAIXASPAPC');

	var qtdetotalsoma = 0
	var planejadosoma = 0
	var apontadosoma = 0
	var efetivadosoma = 0
	var qtdeunitsoma = 0 
	var qtdeapontadasoma = 0
	var seq = 0

	$("input[id^='BAQTDTOTAL___']").each(function(){

		seq = $(this).attr("id").split("___")[1]
		qtdetotalsoma += Number($("#BAQTDTOTAL___"+seq).val())
		planejadosoma += Number($("#BAPLANEJADO___"+seq).val())
		apontadosoma += Number($("#BAAPONTADO___"+seq).val())
		efetivadosoma += Number($("#BAEFETIVADO___"+seq).val())
		qtdeunitsoma += Number($("#BAQTDUNIT___"+seq).val())
		qtdeapontadasoma += Number($("#BAQTDAPONT___"+seq).val())

	})


	qtdetotalsoma = Math.round(qtdetotalsoma*10000)/10000
	planejadosoma = Math.round(planejadosoma*10000)/10000
	apontadosoma = Math.round(apontadosoma*10000)/10000
	efetivadosoma = Math.round(efetivadosoma*10000)/10000
	qtdeunitsoma = Math.round(qtdeunitsoma*10000)/10000
	qtdeapontadasoma = Math.round(qtdeapontadasoma*10000)/10000

	$("#BAOP___"+row).val("Soma :")
	$("#BAQTDTOTAL___"+row).val(qtdetotalsoma)
	$("#BAPLANEJADO___"+row).val(planejadosoma)
	$("#BAAPONTADO___"+row).val(apontadosoma)
	$("#BAEFETIVADO___"+row).val(efetivadosoma)
	$("#BAQTDUNIT___"+row).val(qtdeunitsoma)
	$("#BAQTDAPONT___"+row).val(qtdeapontadasoma)

}

//VERIFICA SE A ATIVIDADE É A ÚLTIMA QUE ESTÁ SENDO APONTADA DO PLANO E DEVE ZERAR O LOTE 
function UltimaParaConsumirLote(){

	var retorno = 0

	$("input[id^='OP_MODAL___']").each(function(){

		var seq = $(this).attr("id").split("___")[1]

		var planejado = $("#QTDEPLANO_MODAL___"+seq).val()
		var apontado = $("#QTDEAPONTADAPLANO_MODAL___"+seq).val()
		var efetivado = $("#QTDEFABRICADA_MODAL___"+seq).val()	

		if(( Number(planejado) == Number(apontado) + Number(efetivado)) && Number(seq)>Number(retorno) && Number(efetivado)>0){
			retorno = seq;
		}

	})

	return retorno;
}


//BUSCA QUANTIDADE DE MATERIA PRIMA QUE JÁ FOI APONTADA ANTERIORMENTE DAQUELE PLANO
function QtdApontPrev(codigoprd,idlote){

	var qtdapontada = 0
	$("input[id^='OP_MODAL___']").each(function(){
			

		var seq = $(this).attr("id").split("___")[1]
		
		var op = $("#OP_MODAL___"+seq).val()
		var idatv = $("#IDATV_MODAL___"+seq).val()
		var codColigada = $("#CODCOLIGADA").val()
		var codfilial = $("#CODFILIAL").val();
		var numPlanoCorte = $("#NUMPLANOCORTE").val()
		var a1 = DatasetFactory.createConstraint("CODORDEM",op,op,ConstraintType.MUST);
		var a2 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST);
		var a3 = DatasetFactory.createConstraint("CODPRD",codigoprd,codigoprd,ConstraintType.MUST);
		var a4 = DatasetFactory.createConstraint("IDATVORDEM",idatv,idatv,ConstraintType.MUST);
		var a5 = DatasetFactory.createConstraint("CODFILIAL",codfilial,codfilial,ConstraintType.MUST);
		var a6 = DatasetFactory.createConstraint("IDLOTE",idlote,idlote,ConstraintType.MUST);
		var a7 = DatasetFactory.createConstraint("NUMPLANO",numPlanoCorte,numPlanoCorte,ConstraintType.MUST);

		var constraints = new Array(a1,a2,a3,a4,a5,a6,a7);
		
		var dataset = DatasetFactory.getDataset("dsQuantidadeApontada",null,constraints,null);

		rep=dataset.values

		qtdapontada +=Number(rep[0]["QUANTIDADE"])
		
	})
	console.log("qtdapontada : "+qtdapontada)
	return Math.floor(Number(qtdapontada*10000))/10000;

}

//LIMPA A TABELA DE CALCULOS DAS QUANTIDADES PARA GERAÇÂO DE MOVIMENTO DE ENTRADA
function limpaPrevSaldo(){
	
	// PERCORRE A TABELA DOS SALDOS
	$("input[id^='SSOP___']").each(function(){
	
		$(this).parents("tr").remove()
		
	})
	
}

//VERIFICA SE A OP É UMA OP DE ATIVIDADE UNICA
function ultimaAtvOrderm(seq){

	var codColigada = $("#CODCOLIGADA").val()
	var codfilial = $("#CODFILIAL").val()
	var op = $("#OP_MODAL___"+seq).val()

	var a1 = DatasetFactory.createConstraint("CODORDEM",op,op,ConstraintType.MUST);
	var a2 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST);
	var a3 = DatasetFactory.createConstraint("CODFILIAL",codfilial,codfilial,ConstraintType.MUST);

	var constraints = new Array(a1,a2,a3);
	
	var dataset = DatasetFactory.getDataset("dsVerificaOpUnica",null,constraints,null);

	rep=dataset.values
	
	row=rep[0]

	var qtd =Number(row["QUANTIDADE"])

	console.log("qtd de atv: "+qtd)

	return qtd;
}


//PREENCHE TABELA QUE IRÁ ALIMENTAR MOVIMENTO DE ENTRADA DE ESTOQUE 
function preencheTabelaSaldo(){


	limpaPrevSaldo();
	var qtdprevtotal = 0
	var qtdapontadatotal =  0
	var qtdmptotalapontada = 0
	var codColigada = $("#CODCOLIGADA").val()
	var codfilial = $("#CODFILIAL").val()

	$("input[id^='OP_MODAL___']").each(function(){
			

		var seq = $(this).attr("id").split("___")[1]
		
		var op = $("#OP_MODAL___"+seq).val()
		var qtdplano = $("#QTDEPLANO_MODAL___"+seq).val()
		var qtdapontada = $("#QTDEAPONTADAPLANO_MODAL___"+seq).val()
		var qtdfabricada = $("#QTDEFABRICADA_MODAL___"+seq).val()

		qtdprevtotal += Number(qtdplano)
		qtdapontadatotal +=  Number(qtdapontada) +  Number(qtdfabricada)

		console.log("qtdprevtotal: "+qtdprevtotal)
		console.log("qtdapontadatotal: "+qtdapontada)
		console.log("qtdmpapontadatotal: "+qtdmptotalapontada)

		// SE QUANTIDADE FABRICADA É MAIOR QUE 0 E É A ULTIMA OU ÚNICA ATIVIDADE NA ORDEM
		if( ( Number(qtdfabricada) > 0) && ultimaAtvOrderm(seq)==1 ){
			
			if( parseInt(Number(qtdfabricada)+Number(qtdapontada)) - parseInt(Number(qtdapontada)) > 0 ) {

				row=wdkAddChild('TABLESOBESALDOPAPC');

				$("#SSCODCOLIGADA___"+row).val(codColigada)
				$("#SSCODFILIAL___"+row).val(codfilial)
				$("#SSOP___"+row).val(op)
				$("#SSPLANEJADO___"+row).val(qtdplano)
				$("#SSAPONTADO___"+row).val(qtdapontada)
				$("#SSEFETIVADO___"+row).val(qtdfabricada)

				var qtdsubirsaldo = ( parseInt( Number(qtdfabricada)+Number(qtdapontada) ) ) - parseInt(Number(qtdapontada))
				var qtdfinal = ( parseInt( Number(qtdfabricada)+Number(qtdapontada) ) )
				//var qtdfinal = ( Number(qtdapontada) + Number(qtdfabricada) ) - ( ( Number(qtdapontada) + Number(qtdfabricada) )%1 )

				$("#SSQTDSUBIRSALDO___"+row).val(qtdsubirsaldo)
				$("#SSQTDFINAL___"+row).val(qtdfinal)	

			}

		}
	})

}

// LIMPA AS QUANTIDADES DO MODAL
function limpaQtdesModal(){
	
	console.log("vou limpar as quantidades fabricadas informadas")

	var verifica=0

	$("input[id^='QTDEFABRICADA_MODAL___']").each(function(){

		
		var qtd = $(this).val()
		if(qtd>0){
			verifica=1
		}
		
	})
	if (verifica == 1){
		
		$("input[id^='OP_MODAL___']").each(function(){
		
			var seq = $(this).attr("id").split("___")[1]
			
			// LIMPA AS QUANTIDADES PREENCHIDAS
			if( Number($("#QTDEFABRICADA_MODAL___"+seq).val()) != 0){
	
				$("#QTDEFABRICADA_MODAL___"+seq).val("")
	
			}
			
		})


	}
	else{

		$("input[id^='OP_MODAL___']").each(function(){
		
			var seq = $(this).attr("id").split("___")[1]
			
			$("#QTDEFABRICADA_MODAL___"+seq).val("")
			
		})

	}
	
	
}

// SE O MODAL COM AS QUANTIDADES FABRICADAS FORAM PREENCHIDAS
function tabelaModalPreenchida(){
	
	console.log("vou verificar as quantidades fabricadas no Modal")
	
	var retTabela = false
	var retQtde = true
	var qtdeMaiorZero = false
	
	// PERCORRE A TABELA DO MODAL
	$("input[id^='OP_MODAL___']").each(function(){
		
		retTabela = true
		
		console.log("achei registro, tabela existe")
		
		var seq = $(this).attr("id").split("___")[1]
		
		var qtdeModal = $("#QTDEFABRICADA_MODAL___"+seq).val()
		
		console.log("qtdeModal: "+qtdeModal)
		
		// SE QUANTIDADE NÃO FOI INFORMADA
		if(qtdeModal=="" || qtdeModal==null || qtdeModal==undefined){
			
			retQtde = false
		
		} else {
			// SE NÃO
			
			//qtdeModal = parseInt(qtdeModal)
			qtdeModal = parseFloat(qtdeModal)
			
			// SE A QUANTIDADE DO MODAL É MAIOR QUE 0
			if(qtdeModal>0){
				
				qtdeMaiorZero = true
				
			}
			
		}
			
	})
	
	console.log("retTabela: "+retTabela+", retQtde: "+retQtde+", qtdeMaiorZero: "+qtdeMaiorZero)
	
	// SE TEM TABELA PREENCHIDA E QUANTIDADES INFORMADAS E PELO MENOS UMA QUANTIDADE MAIOR QUE O
	if(retTabela && retQtde && qtdeMaiorZero){
		
		return true
		
	} else {
		// SE NÃO, SE AS INFORMAÇÕES NÃO FORAM TODAS PREENCHIDAS
		
		return false
		
	}
	
}

// VERIFICA SE HORAS INFORMADAS ESTÃO EM CONFLITOS COM OUTRAS DA MESMA ATIVIDADE
function horasAtividade(op,idAtv,horaInicio,horaFim,seqAtv){
	
	console.log("op: "+op+", idAtv: "+idAtv+", horaInicio: "+horaInicio+", horaFim: "+horaFim+", seq: "+seqAtv)
	
	var ret = false
	
	// PERCORRE TODOS OS REGISTROS DA TABELA DE ATIVIDADES
	$("input[id^='CODIGOPRD___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var idAtvAux = $("#IDATIVIDADE___"+seq).val()
		var opAux = $("#OP___"+seq).val()
		var dataProgAux = $("#DATAPROGRAMADA___"+seq).val()
		var horaInicioAux = $("#HORAINICIOATV___"+seq).val()
		var horaFimAux = $("#HORAFIMATV___"+seq).val()
		var seqAux = $("#SEQ___"+seq).val()	
		
		// SE HORA INÍCIO E FIM FORAM PREENCHIDAS
		if(!(horaInicioAux=="" || horaInicioAux==null || horaInicioAux==undefined) && !(horaFimAux=="" || horaFimAux==null || horaFimAux==undefined)){
			
			// SE É A MESMA ATIVIDADE E OP E MESMA DATA E NÃO É A ATIVIDADE PRINCIPAL
			if(!(seqAtv==seqAux)){
				
				//idAtv==idAtvAux && op==opAux &&
				//console.log("encontrei a mesma atividade e OP e não é o mesmo item")
				
				console.log("encontrei atividade diferente e que teve hora informada")
				
				var hoje = new Date()
				hoje = geraDataBanco(hoje)
				
				horaInicioAux = new Date(hoje+" "+horaInicioAux)
				horaFimAux = new Date(hoje+" "+horaFimAux)
				
				console.log("horaInicio: "+horaInicio+", horaFim: "+horaFim+", horaInicioAux: "+horaInicioAux+", horaFimAux: "+horaFimAux)
				
				// SE HORAS INÍCIO E FIM NÃO ESTÃO EM CONFLITO COM OUTRAS DA MESMA ATIVIDADE
				if((horaInicio<horaInicioAux && horaFim<horaInicioAux) || (horaInicio>horaFimAux && horaFim>horaFimAux)){
					
					console.log("horas não são conflitantes")
					
					ret = false
					
				} else {
					// SE NÃO, HORAS SÃO CONFLITANTES
					
					console.log("horas são conflitantes")
					
					ret = true
					
				}
				
			}
			
		}
		
	})
	
	return ret
	
}

// VERIFICA SE O FUNCIONÁRIO SELECIONADO ESTÁ EM PERÍODO DE FÉRIAS NA DATA PROGRAMADA 
function verificaFerias(codColigada,codFilial,codmo,dataApont){
	
	console.log("verifica se o operador selecionado está em período de férias na data programada")
	
	console.log("codmo: "+codmo+", dataApont: "+dataApont+", codFilial: "+codFilial+", codColigada: "+codColigada)

	// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
	var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("DIA",dataApont,dataApont,ConstraintType.MUST)
	var a4 = DatasetFactory.createConstraint("CODMO",codmo,codmo,ConstraintType.MUST)
	
	var constraints = new Array(a1,a2,a3,a4)
	
	var dataset = DatasetFactory.getDataset("dsVerificaPeriodoFerias",null,constraints,null)
	var row = dataset.values
	
	console.log("row")
	console.log(row)
	
	// SE RETORNO NÃO É NULO OU VAZIO
	if(!(row=="" || row==null || row==undefined)){
		
		console.log("o operador selecionado está em período de férias na data informada")
		
		return false
		
	} else {
		
		console.log("o operador selecionado não está em período de férias na data informada")
		
		return true
		
	}
	
}

// VERIFICA SE A REGERAÇÃO DE SALDOS E CUSTOS ESTÁ SENDO FEITA
function regSaldosCustos(){

	console.log("vou verificar se a regeração de saldos e custos está sendo feita")

	var hoje = new Date()
	
	console.log("dia: "+hoje)
	
	hoje = hoje.toString()
	
	hoje = formataDataBanco(hoje)
	
	console.log("dia: "+hoje)
	
	// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
	var a1 = DatasetFactory.createConstraint("DIA",hoje,hoje,ConstraintType.MUST)
	
	var constraints = new Array(a1)
	
	var dataset = DatasetFactory.getDataset("dsVerificaRegSaldosCustos",null,constraints,null)
	var row = dataset.values
	
	// SE RETORNO NÃO É NULO OU VAZIO
	if(!(row=="" || row==null || row==undefined)){
		
		return true
		
	} else {
		// SE NÃO	
		
		return false
		
	}
	
}

// FUNÇÃO PARA ESCONDER A OPÇÃO DE INICIAR SOLICITAÇÃO COM BASE NA ATUAL
parent.$('.wcm-all-content').bind('DOMNodeInserted', function(e){
	
   // QUANDO APARECER A TELA DE "SOLICITAÇÃO INICIADA COM SUCESSO" IRÁ ENTRAR NESSE IF
   if (e.target.id == 'message-page') {
	  
    // ESCONDE A OPÇÃO DE "INICIAR SOLICITAÇÃO COM BASE NESTA"
    parent.$('[data-reset-process-instance-id]').hide()
    
  }	
  
})



//HABILITA E DESABILITA CALCULADORA
function Calculadora(){

	var calculadora=document.getElementById("calculadora");

	if($("#TEMCALCULADORA").val()==0){
		calculadora.style.display='block';
		$("#TEMCALCULADORA").val(1)
	}
	else if($("#TEMCALCULADORA").val()==1) {
    	calculadora.style.display='none';
		$("#TEMCALCULADORA").val(0)
	}

}

// SCRIPT DA CALCULADORA
function insert(num)
{
    var numero = document.getElementById('resultado').innerHTML;
    document.getElementById('resultado').innerHTML = numero + num;
	console.log((document.getElementById('resultado').length))
}
function clean()
{
    document.getElementById('resultado').innerHTML = "";
}
function back()
{
    var resultado = document.getElementById('resultado').innerHTML;
    document.getElementById('resultado').innerHTML = resultado.substring(0, resultado.length -1);
}
function calcular()
{
    var resultado = document.getElementById('resultado').innerHTML;
    if(resultado)
    {
        document.getElementById('resultado').innerHTML = eval(resultado);
    }
    else
    {
        document.getElementById('resultado').innerHTML = "Nada..."
    }
}


function verificaRA(){
		console.log("ENTREI NO VERIFICA RA")

	var codcoligada = $("#CODCOLIGADA").val()
	var codfilial = $("#CODFILIAL").val()
	var numPlanoCorte = $("#NUMPLANOCORTE").val()
	var status = ""
	var ret= ret = {STATUS:"Atenção, a RA deste plano ainda não foi gerada ",TEXT:"Verifique com o programador do plano",VERIFICA:false};

	var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codcoligada,codcoligada,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("CODFILIAL",codfilial,codfilial,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("NUMPLANOCORTE",numPlanoCorte,numPlanoCorte,ConstraintType.MUST)


	var constraints = new Array(a1,a2,a3)

	var dataset = DatasetFactory.getDataset("dsConsultaRaPAPC",null,constraints,null)
	var rep = dataset.values

	if(!(rep=="" || rep==null || rep==undefined)){
			
		var row = rep[0]		
		var st = row["STATUS"]
		var ret = true;

		switch (st) {

			case 'A':

				status="A Faturar"
				break;

			case 'C':
				status="Cancelado"
				break;

			case 'F':
				status="Faturado"
				break;

			default:
				status="Em Faturamento"
				break;

		}

		var status = "Atenção, a RA deste plano ainda não foi atendida, está em status de " + status
		var text = "Verifique a RA gerada, número "+ row["NUMEROMOV"]

		if(st!='F'){

			ret = {STATUS:status,TEXT:text,VERIFICA:false};

		}
		else{
			ret = {STATUS:status,TEXT:text,VERIFICA:true};
		}
	}

	return ret;

}


function simulaQuantidadesOPs(){

	var numPlanoCorte = $("#NUMPLANOCORTE").val()
	
	var a1 = DatasetFactory.createConstraint("NUMPLANOCORTE",numPlanoCorte,numPlanoCorte,ConstraintType.MUST)
	
	var constraints = new Array(a1)
	
	var dataset = DatasetFactory.getDataset("dsOpsConcluidasPAPC",null,constraints,null)
	var row = dataset.values
	var opsAbertas = new Array()
	var qtdprev;

	for(var i=0; i<row.length; i++){

		opsAbertas.push(row[i]["CODORDEM"])

	}

	$("input[id^='OP_MODAL___'").each(function(){

		var seq = $(this).attr("id").split("___")[1]
		var op = $(this).val()

		if(opsAbertas.includes(op)){
			
			qtdprev = $("#QTDEPLANO_MODAL___"+seq).val()
			$("#QTDEAPONTADAPLANO_MODAL___"+seq).val(0)
			$("#QTDEFABRICADA_MODAL___"+seq).val(qtdprev)


		}
		

	});

}

function desfazSimulacaoOPs(){

	$("input[id^='OP_MODAL___'").each(function(){

		var seq = $(this).attr("id").split("___")[1]
		qtdprev = $("#QTDEPLANO_MODAL___"+seq).val()
		$("#QTDEFABRICADA_MODAL___"+seq).val(0)
		$("#QTDEAPONTADAPLANO_MODAL___"+seq).val(qtdprev)


	});

}

// HORAS QUE JÁ FORAM APONTADAS
function horasApontadas(){
	
	console.log("horasApontadas")
	
	var codmo = $("#CODMO").val()
	var dia = $("#DATA_DE").val()
	var codColigada = "1"
	var codFilial = $("#CODFILIAL").val()
		
	var horas = 0
	
	dia = formataDataBanco(dia)
	
	console.log("codmo: "+codmo+", dia: "+dia)
	
	// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
	var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("CODMO",codmo,codmo,ConstraintType.MUST)
	var a4 = DatasetFactory.createConstraint("DIA",dia,dia,ConstraintType.MUST)
	
	var constraints = new Array(a1,a2,a3,a4)
	
	var dataset = DatasetFactory.getDataset("dsHorasApontadasOperadorData",null,constraints,null)
	var row = dataset.values
	
	// SE TEVE RETORNO
	if(!(row=="" || row==null || row==undefined)){
		
		horas = parseFloat(row[0]["HORAS"])
		
	}
	
	console.log("horas: "+horas)
	
	return horas
	
}

// VERIFICA SE O LIMITE DE 12 HORAS FOI ATINGIDO EM ALGUM APONTAMENTO
function verificaLimiteHoras(){
	
	console.log("verifica se o limite de 12 horas foi atingido em algum apontamento")
	
	var ret = false

	var horas = horasApontadas()
	
	console.log("horasApontadas já integradas: "+horas)
	
	var soma = 0
	
	// PERCORRE TODOS OS INTERVALOS
	$("input[id^='TOTALHORAS___']").each(function(){
	
		var seq = $(this).attr('id').split("___")[1]

		horainicio = $("#HORAINICIOAPONT___"+seq).val()
		console.log(horainicio)
		horafim = $("#HORAFIMAPONT___"+seq).val()
		console.log(horafim)

		var hora1 = (horainicio=="" || horainicio==" " || horainicio==null || horainicio==undefined)
		var hora2 = (horafim=="" || horafim==" " || horafim==null || horafim==undefined)
		
		console.log(hora1)
		console.log(hora2)
		
		// SE HORA INÍCIO E FIM FORAM INFORMADADS
		if( (!hora1 && !hora2)){

			var saldo = $("#TOTALHORAS___"+seq).val()
			
			saldo = parseFloat(saldo)
			
			console.log("saldo: "+saldo)
			
			saldo = saldo/60
			saldo = saldo.toFixed(2)
			
			console.log("vou somar: "+saldo)
			
			//soma = parseFloat(soma)
			soma = parseFloat(parseFloat(soma) + parseFloat(saldo))
			
			console.log("acumulado: "+soma)

		}
		
	})
	
	console.log("soma lançada: "+soma)
	
	soma = soma + horas
	
	console.log("soma total: "+soma)

	// SE ULTRAPASSOU AS 12 HORAS
	if(soma>12){
		
		ret = true
		
	}
	
	console.log("apontamentos ultrapassou 12 horas? "+ret)
	
	return ret
	
}

// VERIFICA SE ESTÁ SEM HORAS VAZIAS
function semHorasVazias(){
	
	console.log("vou verificar se está sem horas vazias")
	
	var ret = true

	// PERCORRE OS HORÁRIOS PRODUTIVOS
	$("input[id^='HORAINICIOAPONT___']").each(function(){
		
		var seq = $(this).attr('id').split("___")[1]
		console.log(seq)
		horainicio = $("#HORAINICIOAPONT___"+seq).val()
		console.log(horainicio)
		horafim = $("#HORAFIMAPONT___"+seq).val()
		console.log(horafim)

		var hora1 = (horainicio=="" || horainicio==" " || horainicio==null || horainicio==undefined)
		var hora2 = (horafim=="" || horafim==" " || horafim==null || horafim==undefined)
		
		console.log(hora1)
		console.log(hora2)
		
		if( (hora1 && !hora2) || (!hora1 && hora2 )){

			ret = false;

		}

	})

	console.log("sem horas vazias? "+ret)
	
	return ret;

}