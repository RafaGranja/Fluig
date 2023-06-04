console.log("entrei no utils")

// ADICIONA LINHA NA TABELA DO PLANEJAMENTO
function addPlanAtividades(){
	
	var row = wdkAddChild('ATIVIDADES')
	 
	return row
	
}

// ADICIONA LINHA NA TABELA DE PROGRAMAÇÃO
function addModalProgramacao(){
	
	var row = wdkAddChild('PROGRAMCAOATV')
	 
	return row
	
}

// ADICIONA LINHA NA TABELA DE COMPONENTES
function addModalComponentes(){
	
	var row = wdkAddChild('COMPONENTESATV')
	 
	return row
	
}

// ADICIONA LINHA NA TABELA DE PLANO DE CORTE
function addModalPlanoCorte(){
	
	var row = wdkAddChild('PLANOCORTEATV')
	 
	return row
	
}

// ADICIONA LINHA NA TABELA DE APONTAMENTOS
function addModalApontamentos(){
	
	var row = wdkAddChild('APONTAMENTOSATV')
	 
	return row
	
}

// ADICIONA LINHA NA TABELA DE ALOCAÇÃO
function addAlocacao(){
	
	var row = wdkAddChild('ALOCACAO')
	 
	return row
	
}

// ADICIONA LINHA NA TABELA DE RECURSOS ALOCADO NA ATIVIDADE
function addModalRecAlocado(){
	
	var row = wdkAddChild('RECALOCADOATV')
	 
	return row
	
}

// ADICIONA LINHA NA TABELA DE RECURSOS APTOS DISPONÍVEIS PARA A ATIVIDADE
function addModalRecAptoDisp(){
	
	var row = wdkAddChild('RECAPTOSDISPATV')
	 
	return row
	
}

// ADICIONA LINHA NA TABELA DE RECURSOS APTOS DISPONÍVEIS PARA A ATIVIDADE
function addRAD(){
	
	var row = wdkAddChild('RECAPTODISP')
	 
	return row
	
}

// ADICIONA LINHA NA TABELA SOMA DE TEMPOS
function addSomaAloc(){
	
	var row = wdkAddChild('SOMA_ALOCACAO')
	 
	return row
	
}

// ADICIONA LINHA NA TABELA SOMA DE APONTAMENTOS
function addSomaApont(){
	
	var row = wdkAddChild('SOMA_APONTAMENTOSATV')
	 
	return row
	
}

// ADICIONA LINHA NA TABELA SOMA DE RECURSOS ALOCADOS
function addSomaRecAloc(){
	
	var row = wdkAddChild('SOMA_RECALOCADOATV')
	 
	return row
	
}

// ADICIONA LINHA NA TABELA SOMA DE RECURSOS APTOS DISPONÍVEIS
function addSomaRecAptoDisp(){
	
	var row = wdkAddChild('SOMA_RECAPTOSDISPATV')
	 
	return row
	
}

// ADICIONA LINHA NA TABELA SOMA DE RECURSOS APTOS DISPONÍVEIS
function addSelecionadosN3(){
	
	var row = wdkAddChild('SELECIONADOSN3')
	 
	return row
	
}

// ADICIONA LINHA NA TABELA PROGRAMAÇÃO QUE FOI SALVA
function addProgramacaoSalva(){
	
	var row = wdkAddChild('PROGRAMACAOSALVA')
	 
	return row
	
}

// ADICIONA LINHA NA TABELA DOS FILTROS PARA A TABELA
function addFiltro(){
	
	var row = wdkAddChild('CABECALHO_PLAN')
	 
	return row
	
}


// ADICIONA LINHA NA TABELA DE HABILIDADES
function addHabilidadesSelec(){
	
	var row = wdkAddChild('Habilidades_Adicionadas')
	 
	return row
	
}

// CONSTRÓI FILTROS PARA A TABELA
function constroiFiltros(){

	console.log("entrei para construir filtros")
	
	var os = $("#INFOOS___1").val()
	var op = $("#INFOOP___1").val()
	var tag = $("#INFOTAG___1").val()
	var folga = $("#INFOFOLGA___1").val()
	var inicio = $("#INFOINICIO___1").val()
	var fim = $("#INFOFIM___1").val()
	var statusOp = $("#INFOSTATUSOP___1").val()
	var item = $("#INFOITEM___1").val()
	var atv = $("#INFOATIVIDADE___1").val()
	var idAtv = $("#INFOIDATV___1").val()
	var prioridade = $("#INFOPRIORIDADE___1").val()
	var statusAtv = $("#INFOSTATUSATV___1").val()
	var posto = $("#INFOPOSTO___1").val()
	var plano = $("#INFOPLANO___1").val()
	var cargaPrev = $("#INFOCARGAPREV___1").val()
	var cargaReal = $("#INFOCARGAREALIZADA___1").val()
	var saldoAtv = $("#INFOSALDOREV___1").val()
	var saldoAloc = $("#INFOSALDOALOC___1").val()
	var saldoAlocar = $("#INFOSALDOAALOCAR___1").val()
	var avanco = $("#INFOAVANCO___1").val()
	var recPrev = $("#INFORECPREV___1").val()
	var execucao = $("#INFOEXECUCAO___1").val()
	
	console.log("os: "+os+", op: "+op+", folga: "+folga+", inicio: "+inicio+", fim: "+fim+", statusOp: "+statusOp+
			", item: "+item+", atv: "+atv+", idAtv: "+idAtv+", prioridade: "+prioridade+", statusAtv: "+statusAtv+", posto: "+posto+", plano: "+plano+
			", cargaPrev: "+cargaPrev+", cargaReal: "+cargaReal+", saldoAtv: "+saldoAtv+", saldoAloc: "+saldoAloc+", saldoAlocar: "+saldoAlocar+
			", avanco: "+avanco+", recPrev: "+recPrev+", execucao: "+execucao+", tag: "+tag)

	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if(os=="" || os==null || os==undefined){
		
		constroiSelectOs()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if(op=="" || op==null || op==undefined){
		
		constroiSelectOp()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if(tag=="" || tag==null || tag==undefined){
		
		constroiSelectTag()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if(execucao=="" || execucao==null || execucao==undefined){
		
		constroiSelectExecucao()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if(folga=="" || folga==null || folga==undefined){
		
		constroiSelectFolga()
		
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if(inicio=="" || inicio==null || inicio==undefined){
	
		constroiSelectInicio()
		
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if(fim=="" || fim==null || fim==undefined){
	
		constroiSelectFim()
		
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if(statusOp=="" || statusOp==null || statusOp==undefined){
	
		constroiSelectStatusOp()
		
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if(item=="" || item==null || item==undefined){
	
		constroiSelectItem()
		
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if(atv=="" || atv==null || atv==undefined){
	
		constroiSelectAtv()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if(prioridade=="" || prioridade==null || prioridade==undefined){
	
		constroiSelectPrioridade()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if(idAtv=="" || idAtv==null || idAtv==undefined){
	
		constroiSelectIdAtv()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if(statusAtv=="" || statusAtv==null || statusAtv==undefined){
	
		constroiSelectStatusAtv()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if(posto=="" || posto==null || posto==undefined){
	
		constroiSelectPosto()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if(plano=="" || plano==null || plano==undefined){
	
		constroiSelectPlano()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if(cargaPrev=="" || cargaPrev==null || cargaPrev==undefined){
	
		constroiSelectCargaPrev()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if(cargaReal=="" || cargaReal==null || cargaReal==undefined){
	
		constroiSelectCargaReal()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if(saldoAtv=="" || saldoAtv==null || saldoAtv==undefined){
	
		constroiSelectSaldoAtv()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if(saldoAloc=="" || saldoAloc==null || saldoAloc==undefined){
	
		constroiSelectSaldoAloc()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if(saldoAlocar=="" || saldoAlocar==null || saldoAlocar==undefined){
	
		constroiSelectSaldoAlocar()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if(avanco=="" || avanco==null || avanco==undefined){
	
		constroiSelectAvanco()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if(recPrev=="" || recPrev==null || recPrev==undefined){
	
		constroiSelectRecPrev()
	
	}
	
	console.log("terminei de construir filtros")
	
}

// CONSTRÓI SELECT DA OS
function constroiSelectOs(){
	
	console.log("vou construir select da OS")
	var arrayOs = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='FOLGAATV___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		console.log("osatv, seq "+seq)
		
		var os = $("#OSATV___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHAPLAN___"+seq).hasClass("invisivel"))){
		
			console.log("linha não está invisível")
			
			// SE OS NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayOs.includes(os)) && !(os=="")){
				
				console.log("vou incluir os "+os)
				
				arrayOs.push(os)
				
			}
			
		}
		
	})
	
	console.log("arrayOs")
	console.log(arrayOs)
	
	arrayOs = arrayOs.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayOs.length; i++){
		
		console.log("vou incluir opção "+arrayOs[i])
		
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOOS___1').append($("<option class='info'></option>").attr("value", arrayOs[i]).text(arrayOs[i]));
		
	}
	
}

// CONSTRÓI SELECT DA OP
function constroiSelectOp(){
	
	console.log("vou construir select da OP")
	var arrayOp = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSATV___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var op = $("#OPATV___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHAPLAN___"+seq).hasClass("invisivel"))){
		
			// SE OP NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayOp.includes(op)) && !(op=="")){
				
				arrayOp.push(op)
				
			}
			
		}
		
	})
	
	arrayOp = arrayOp.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayOp.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOOP___1').append($("<option class='info'></option>").attr("value", arrayOp[i]).text(arrayOp[i]));
 
	}
	
}

// CONSTRÓI SELECT DA TAG
function constroiSelectTag(){
	
	console.log("vou construir select da Tag")
	var arrayTag = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSATV___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var tag = $("#TAGATV___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHAPLAN___"+seq).hasClass("invisivel"))){
		
			// SE OP NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayTag.includes(tag)) && !(tag=="")){
				
				arrayTag.push(tag)
				
			}
			
		}
		
	})
	
	arrayTag = arrayTag.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayTag.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOTAG___1').append($("<option class='info'></option>").attr("value", arrayTag[i]).text(arrayTag[i]));
 
	}
	
}

// CONSTRÓI SELECT DA EXECUCAO
function constroiSelectExecucao(){
	
	console.log("vou construir select da Execução")
	var arrayExecucao = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSATV___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var execucao = $("#EXECUCAOATV___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHAPLAN___"+seq).hasClass("invisivel"))){
		
			// SE OP NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayExecucao.includes(execucao)) && !(execucao=="")){
				
				arrayExecucao.push(execucao)
				
			}
			
		}
		
	})
	
	arrayExecucao = arrayExecucao.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayExecucao.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOEXECUCAO___1').append($("<option class='info'></option>").attr("value", arrayExecucao[i]).text(arrayExecucao[i]));
 
	}
	
}

// CONSTRÓI SELECT DA FOLGA
function constroiSelectFolga(){
	
	console.log("vou construir select da Folga")
	var arrayFolga = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSATV___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var folga = $("#FOLGAATV___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHAPLAN___"+seq).hasClass("invisivel"))){
		
			// SE FOLGA NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayFolga.includes(folga)) && !(folga=="")){
				
				arrayFolga.push(folga)
				
			}
			
		}
		
	})
	
	arrayFolga = arrayFolga.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayFolga.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOFOLGA___1').append($("<option class='info'></option>").attr("value", arrayFolga[i]).text(arrayFolga[i]));
 
	}
	
}

// CONSTRÓI SELECT DO INICIO
function constroiSelectInicio(){
	
	console.log("vou construir select da Inicio")
	var arrayInicio = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSATV___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var inicio = $("#INICIOPLANATV___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHAPLAN___"+seq).hasClass("invisivel"))){
		
			// SE INICIO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayInicio.includes(inicio)) && !(inicio=="")){
				
				arrayInicio.push(inicio)
				
			}
			
		}
		
	})
	
	arrayInicio = arrayInicio.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayInicio.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOINICIO___1').append($("<option class='info'></option>").attr("value", arrayInicio[i]).text(arrayInicio[i]));
 
	}
	
}

// CONSTRÓI SELECT DO FIM
function constroiSelectFim(){
	
	console.log("vou construir select do Fim")
	var arrayFim = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSATV___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var fim = $("#FIMPLANATV___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHAPLAN___"+seq).hasClass("invisivel"))){
		
			// SE FIM NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayFim.includes(fim)) && !(fim=="")){
				
				arrayFim.push(fim)
				
			}
			
		}
		
	})
	
	arrayFim = arrayFim.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayFim.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOFIM___1').append($("<option class='info'></option>").attr("value", arrayFim[i]).text(arrayFim[i]));
 
	}
	
}

// CONSTRÓI SELECT DO STATUS ITEM
function constroiSelectItem(){
	
	console.log("vou construir select do Item")
	var arrayItem = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSATV___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var item = $("#ITEMATV___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHAPLAN___"+seq).hasClass("invisivel"))){
		
			// SE ITEM NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayItem.includes(item)) && !(item=="")){
				
				arrayItem.push(item)
				
			}
			
		}
		
	})
	
	arrayItem = arrayItem.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayItem.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOITEM___1').append($("<option class='info'></option>").attr("value", arrayItem[i]).text(arrayItem[i]));
 
	}
	
}

// CONSTRÓI SELECT DA ATIVIDADE
function constroiSelectAtv(){
	
	console.log("vou construir select da Atividade")
	var arrayAtv = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSATV___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var atv = $("#ATIVIDADEATV___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHAPLAN___"+seq).hasClass("invisivel"))){
		
			// SE ATIVIDADE NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayAtv.includes(atv)) && !(atv=="")){
				
				arrayAtv.push(atv)
				
			}
			
		}
		
	})
	
	arrayAtv = arrayAtv.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayAtv.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOATIVIDADE___1').append($("<option class='info'></option>").attr("value", arrayAtv[i]).text(arrayAtv[i]));
 
	}
	
}

// CONSTRÓI SELECT DA PRIORIDADE
function constroiSelectPrioridade(){
	
	console.log("vou construir select da Prioridade")
	var arrayPrioridade = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSATV___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var prioridade = $("#PRIORIDADEATV___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHAPLAN___"+seq).hasClass("invisivel"))){
		
			// SE PRIORIDADE NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayPrioridade.includes(prioridade)) && !(prioridade=="")){
				
				arrayPrioridade.push(prioridade)
				
			}
			
		}
		
	})
	
	arrayPrioridade = arrayPrioridade.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayPrioridade.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOPRIORIDADE___1').append($("<option class='info'></option>").attr("value", arrayPrioridade[i]).text(arrayPrioridade[i]));
 
	}
	
}

// CONSTRÓI SELECT DO IDATV
function constroiSelectIdAtv(){
	
	console.log("vou construir select da idAtv")
	var arrayIdAtv = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSATV___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var idAtv = $("#IDATIVIDADEATV___"+seq).val()
		
		idAtv = parseInt(idAtv)
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHAPLAN___"+seq).hasClass("invisivel"))){
		
			// SE PRIORIDADE NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayIdAtv.includes(idAtv)) && !(idAtv=="")){
				
				arrayIdAtv.push(idAtv)
				
			}
			
		}
		
	})
	
	arrayIdAtv = arrayIdAtv.sort(function(a,b){ if(a>b) return 1; if(a<b) return -1; return 0; })
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayIdAtv.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOIDATV___1').append($("<option class='info'></option>").attr("value", arrayIdAtv[i]).text(arrayIdAtv[i]));
 
	}
	
}

// CONSTRÓI SELECT DO STATUS ATV
function constroiSelectStatusAtv(){
	
	console.log("vou construir select da Status Atv")
	var arrayStatusAtv = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSATV___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var statusAtv = $("#STATUSATV___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHAPLAN___"+seq).hasClass("invisivel"))){
		
			// SE STATUS ATV NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayStatusAtv.includes(statusAtv)) && !(statusAtv=="")){
				
				arrayStatusAtv.push(statusAtv)
				
			}
			
		}
		
	})
	
	arrayStatusAtv = arrayStatusAtv.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayStatusAtv.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOSTATUSATV___1').append($("<option class='info'></option>").attr("value", arrayStatusAtv[i]).text(arrayStatusAtv[i]));
 
	}
	
}

// CONSTRÓI SELECT DO STATUS OP
function constroiSelectStatusOp(){
	
	console.log("vou construir select da Status OP")
	var arrayStatusOp = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSATV___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var statusOp = $("#STATUSOPATV___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHAPLAN___"+seq).hasClass("invisivel"))){
		
			// SE STATUS OP NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayStatusOp.includes(statusOp)) && !(statusOp=="")){
				
				arrayStatusOp.push(statusOp)
				
			}
			
		}
		
	})
	
	arrayStatusOp = arrayStatusOp.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayStatusOp.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOSTATUSOP___1').append($("<option class='info'></option>").attr("value", arrayStatusOp[i]).text(arrayStatusOp[i]));
 
	}
	
}

// CONSTRÓI SELECT DO POSTO ATV
function constroiSelectPosto(){
	
	console.log("vou construir select da Posto Atv")
	var arrayPostoAtv = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSATV___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var postoAtv = $("#POSTOATV___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHAPLAN___"+seq).hasClass("invisivel"))){
		
			// SE POSTO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayPostoAtv.includes(postoAtv)) && !(postoAtv=="")){
				
				arrayPostoAtv.push(postoAtv)
				
			}
			
		}
		
	})
	
	arrayPostoAtv = arrayPostoAtv.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayPostoAtv.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOPOSTO___1').append($("<option class='info'></option>").attr("value", arrayPostoAtv[i]).text(arrayPostoAtv[i]));
 
	}
	
}

// CONSTRÓI SELECT DO PLANO
function constroiSelectPlano(){
	
	console.log("vou construir select da Posto Atv")
	var arrayPlano = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSATV___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var plano = $("#PLANOCORTEATV___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHAPLAN___"+seq).hasClass("invisivel"))){
		
			// SE PLANO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayPlano.includes(plano)) && !(plano=="")){
				
				arrayPlano.push(plano)
				
			}
			
		}
		
	})
	
	arrayPlano = arrayPlano.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayPlano.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOPLANO___1').append($("<option class='info'></option>").attr("value", arrayPlano[i]).text(arrayPlano[i]));
 
	}
	
}

// CONSTRÓI SELECT DA CARGA PREV
function constroiSelectCargaPrev(){
	
	console.log("vou construir select da CARGA PREV")
	var arrayCargaPrev = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSATV___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var cargaPrev = $("#CARGAPREVATV___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHAPLAN___"+seq).hasClass("invisivel"))){
		
			// SE CARGA PREV NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayCargaPrev.includes(cargaPrev)) && !(cargaPrev=="")){
				
				arrayCargaPrev.push(cargaPrev)
				
			}
			
		}
		
	})
	
	arrayCargaPrev = arrayCargaPrev.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayCargaPrev.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOCARGAPREV___1').append($("<option class='info'></option>").attr("value", arrayCargaPrev[i]).text(arrayCargaPrev[i]));
 
	}
	
}

// CONSTRÓI SELECT DA CARGA REAL
function constroiSelectCargaReal(){
	
	console.log("vou construir select da CARGA REAL")
	var arrayCargaReal = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSATV___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var cargaReal = $("#CARGAREALATV___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHAPLAN___"+seq).hasClass("invisivel"))){
		
			// SE CARGA REAL NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayCargaReal.includes(cargaReal)) && !(cargaReal=="")){
				
				arrayCargaReal.push(cargaReal)
				
			}
			
		}
		
	})
	
	arrayCargaReal = arrayCargaReal.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayCargaReal.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOCARGAREALIZADA___1').append($("<option class='info'></option>").attr("value", arrayCargaReal[i]).text(arrayCargaReal[i]));
 
	}
	
}

// CONSTRÓI SELECT DO SALDO REV
function constroiSelectSaldoRev(){
	
	console.log("vou construir select da SALDO REV")
	var arraySaldoRev = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSATV___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var saldoRev = $("#SALDOREVATV___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHAPLAN___"+seq).hasClass("invisivel"))){
		
			// SE CARGA REAL NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arraySaldoRev.includes(saldoRev)) && !(saldoRev=="")){
				
				arraySaldoRev.push(saldoRev)
				
			}
			
		}
		
	})
	
	arraySaldoRev = arraySaldoRev.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arraySaldoRev.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOSALDOREV___1').append($("<option class='info'></option>").attr("value", arraySaldoRev[i]).text(arraySaldoRev[i]));
 
	}
	
}

// CONSTRÓI SELECT DO SALDO ALOC
function constroiSelectSaldoAloc(){
	
	console.log("vou construir select da SALDO ALOC")
	var arraySaldoAloc = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSATV___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var saldoAloc = $("#SALDOALOCADOATV___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHAPLAN___"+seq).hasClass("invisivel"))){
		
			// SE SALDO ALOC NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arraySaldoAloc.includes(saldoAloc)) && !(saldoAloc=="")){
				
				arraySaldoAloc.push(saldoAloc)
				
			}
			
		}
		
	})
	
	arraySaldoAloc = arraySaldoAloc.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arraySaldoAloc.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOSALDOALOC___1').append($("<option class='info'></option>").attr("value", arraySaldoAloc[i]).text(arraySaldoAloc[i]));
 
	}
	
}

// CONSTRÓI SELECT DO SALDO ALOCAR
function constroiSelectSaldoAlocar(){
	
	console.log("vou construir select da SALDO ALOCAR")
	var arraySaldoAlocar = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSATV___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var saldoAlocar = $("#SALDOAALOCARATV___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHAPLAN___"+seq).hasClass("invisivel"))){
		
			// SE SALDO ALOCAR NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arraySaldoAlocar.includes(saldoAlocar)) && !(saldoAlocar=="")){
				
				arraySaldoAlocar.push(saldoAlocar)
				
			}
			
		}
		
	})
	
	arraySaldoAlocar = arraySaldoAlocar.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arraySaldoAlocar.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOSALDOAALOCAR___1').append($("<option class='info'></option>").attr("value", arraySaldoAlocar[i]).text(arraySaldoAlocar[i]));
 
	}
	
}

// CONSTRÓI SELECT DO SALDO ATV
function constroiSelectSaldoAtv(){
	
	console.log("vou construir select da SALDO ATV")
	var arraySaldoAtv = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSATV___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var saldoAtv = $("#SALDOREVATV___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#SALDOREVATV___"+seq).hasClass("invisivel"))){
		
			// SE SALDO ALOCAR NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arraySaldoAtv.includes(saldoAtv)) && !(saldoAtv=="")){
				
				arraySaldoAtv.push(saldoAtv)
				
			}
			
		}
		
	})
	
	arraySaldoAtv = arraySaldoAtv.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arraySaldoAtv.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOSALDOREV___1').append($("<option class='info'></option>").attr("value", arraySaldoAtv[i]).text(arraySaldoAtv[i]));
 
	}
	
}

// CONSTRÓI SELECT DO AVANCO
function constroiSelectAvanco(){
	
	console.log("vou construir select do AVANCO")
	var arrayAvanco = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSATV___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var avanco = $("#AVANCOATV___"+seq).val()
		
		if( !(avanco=="" || avanco==null || avanco==undefined) ){
			
			console.log("avanco: "+avanco)
			
			// SE LINHA NÃO ESTÁ INVISÍVEL
			if(!($("#LINHAPLAN___"+seq).hasClass("invisivel"))){
			
				// SE AVANCO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
				if(!(arrayAvanco.includes(avanco)) && !(avanco=="")){
					
					arrayAvanco.push(avanco)
					
				}
				
			}
			
		}
		
	})
	
	//arrayAvanco = arrayAvanco.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayAvanco.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOAVANCO___1').append($("<option class='info'></option>").attr("value", arrayAvanco[i]).text(arrayAvanco[i]));
 
	}
	
}

// CONSTRÓI SELECT DO RECURSOS PREVISTO
function constroiSelectRecPrev(){
	
	console.log("vou construir select do REC PREV")
	var arrayRecPrev = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSATV___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var recPrev = $("#RECPREVATV___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHAPLAN___"+seq).hasClass("invisivel"))){
		
			// SE AVANCO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayRecPrev.includes(recPrev)) && !(recPrev=="")){
				
				arrayRecPrev.push(recPrev)
				
			}
			
		}
		
	})
	
	arrayRecPrev = arrayRecPrev.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayRecPrev.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFORECPREV___1').append($("<option class='info'></option>").attr("value", arrayRecPrev[i]).text(arrayRecPrev[i]));
 
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
		if($("#INFOOS___1").val()=="" || $("#INFOOS___1").val()==null){
			
			console.log("filtro OS está vazio")
			
			$('#INFOOS___1').children('option:not(:first)').remove();
			$("#INFOOS___1").css("border-color","#d1d3d4")
			$("#INFOOS___1").css("background-color","#fff")
			
		} else {
			
			console.log("filtro OS não está vazio")
			
			$("#INFOOS___1").css("border-color","#b92113")
			$("#INFOOS___1").css("background-color","#f2dede")
			
		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOOP___1").val()=="" || $("#INFOOP___1").val()==null){
			
			console.log("filtro OP está vazio")
			
			$('#INFOOP___1').children('option:not(:first)').remove();
			$("#INFOOP___1").css("border-color","#d1d3d4")
			$("#INFOOP___1").css("background-color","#fff")

		} else {
			
			console.log("filtro OP não está vazio")
			
			$("#INFOOP___1").css("border-color","#b92113")
			$("#INFOOP___1").css("background-color","#f2dede")
			
		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOTAG___1").val()=="" || $("#INFOTAG___1").val()==null){
			
			console.log("filtro OP está vazio")
			
			$('#INFOTAG___1').children('option:not(:first)').remove();
			$("#INFOTAG___1").css("border-color","#d1d3d4")
			$("#INFOTAG___1").css("background-color","#fff")

		} else {
			
			console.log("filtro TAG não está vazio")
			
			$("#INFOTAG___1").css("border-color","#b92113")
			$("#INFOTAG___1").css("background-color","#f2dede")
			
		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOEXECUCAO___1").val()=="" || $("#INFOEXECUCAO___1").val()==null){
			
			console.log("filtro Execução está vazio")
			
			$('#INFOEXECUCAO___1').children('option:not(:first)').remove();
			$("#INFOEXECUCAO___1").css("border-color","#d1d3d4")
			$("#INFOEXECUCAO___1").css("background-color","#fff")

		} else {
			
			console.log("filtro Execução não está vazio")
			
			$("#INFOEXECUCAO___1").css("border-color","#b92113")
			$("#INFOEXECUCAO___1").css("background-color","#f2dede")
			
		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOFOLGA___1").val()=="" || $("#INFOFOLGA___1").val()==null){
			
			console.log("filtro FOLGA está vazio")
			
			$('#INFOFOLGA___1').children('option:not(:first)').remove();
			$("#INFOFOLGA___1").css("border-color","#d1d3d4")
			$("#INFOFOLGA___1").css("background-color","#fff")
			
		} else {
			
			console.log("filtro FOLGA não está vazio")
			
			$("#INFOFOLGA___1").css("border-color","#b92113")
			$("#INFOFOLGA___1").css("background-color","#f2dede")

		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOINICIO___1").val()=="" || $("#INFOINICIO___1").val()==null){
			
			console.log("filtro INICIO está vazio")
			
			$('#INFOINICIO___1').children('option:not(:first)').remove();
			$("#INFOINICIO___1").css("border-color","#d1d3d4")
			$("#INFOINICIO___1").css("background-color","#fff")
			
		} else {
			
			console.log("filtro INICIO não está vazio")
			
			$("#INFOINICIO___1").css("border-color","#b92113")
			$("#INFOINICIO___1").css("background-color","#f2dede")
			
		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOFIM___1").val()=="" || $("#INFOFIM___1").val()==null){
			
			console.log("filtro POSICAO está vazio")
			
			$('#INFOFIM___1').children('option:not(:first)').remove();
			$("#INFOFIM___1").css("border-color","#d1d3d4")
			$("#INFOFIM___1").css("background-color","#fff")
			
		} else {
			
			console.log("filtro FIM não está vazio")
			
			$("#INFOFIM___1").css("border-color","#b92113")
			$("#INFOFIM___1").css("background-color","#f2dede")

		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOSTATUSOP___1").val()=="" || $("#INFOSTATUSOP___1").val()==null){
			
			console.log("filtro STATUS OP está vazio")
			
			$('#INFOSTATUSOP___1').children('option:not(:first)').remove();
			$("#INFOSTATUSOP___1").css("border-color","#d1d3d4")
			$("#INFOSTATUSOP___1").css("background-color","#fff")
			
		} else {
			
			console.log("filtro STATUS OP não está vazio")
			
			$("#INFOSTATUSOP___1").css("border-color","#b92113")
			$("#INFOSTATUSOP___1").css("background-color","#f2dede")

		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOITEM___1").val()=="" || $("#INFOITEM___1").val()==null){
		
			console.log("filtro ITEM está vazio")
			
			$('#INFOITEM___1').children('option:not(:first)').remove();
			$("#INFOITEM___1").css("border-color","#d1d3d4")
			$("#INFOITEM___1").css("background-color","#fff")

		} else {
			
			console.log("filtro ITEM não está vazio")
			
			$("#INFOITEM___1").css("border-color","#b92113")
			$("#INFOITEM___1").css("background-color","#f2dede")

		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOATIVIDADE___1").val()=="" || $("#INFOATIVIDADE___1").val()==null){
			
			console.log("filtro ATIVIDADE está vazio")
			
			$('#INFOATIVIDADE___1').children('option:not(:first)').remove();
			$("#INFOATIVIDADE___1").css("border-color","#d1d3d4")
			$("#INFOATIVIDADE___1").css("background-color","#fff")
			
		} else {
			
			console.log("filtro ATIVIDADE não está vazio")
			
			$("#INFOATIVIDADE___1").css("border-color","#b92113")
			$("#INFOATIVIDADE___1").css("background-color","#f2dede")
			
		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOPRIORIDADE___1").val()=="" || $("#INFOPRIORIDADE___1").val()==null){
			
			console.log("filtro PRIORIDADE está vazio")
			
			$('#INFOPRIORIDADE___1').children('option:not(:first)').remove();
			$("#INFOPRIORIDADE___1").css("border-color","#d1d3d4")
			$("#INFOPRIORIDADE___1").css("background-color","#fff")
			
		} else {
			
			console.log("filtro PRIORIDADE não está vazio")
			
			$("#INFOPRIORIDADE___1").css("border-color","#b92113")
			$("#INFOPRIORIDADE___1").css("background-color","#f2dede")
			
		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOIDATV___1").val()=="" || $("#INFOIDATV___1").val()==null){
			
			console.log("filtro IDATV está vazio")
			
			$('#INFOIDATV___1').children('option:not(:first)').remove();
			$("#INFOIDATV___1").css("border-color","#d1d3d4")
			$("#INFOIDATV___1").css("background-color","#fff")
			
		} else {
			
			console.log("filtro IDATV não está vazio")
			
			$("#INFOIDATV___1").css("border-color","#b92113")
			$("#INFOIDATV___1").css("background-color","#f2dede")
			
		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOSTATUSATV___1").val()=="" || $("#INFOSTATUSATV___1").val()==null){
			
			console.log("filtro STATUS ATV está vazio")
			
			$('#INFOSTATUSATV___1').children('option:not(:first)').remove();
			$("#INFOSTATUSATV___1").css("border-color","#d1d3d4")
			$("#INFOSTATUSATV___1").css("background-color","#fff")
				
		} else {
			
			console.log("filtro STATUS ATV não está vazio")
			
			$("#INFOSTATUSATV___1").css("border-color","#b92113")
			$("#INFOSTATUSATV___1").css("background-color","#f2dede")

		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOPOSTO___1").val()=="" || $("#INFOPOSTO___1").val()==null){
			
			console.log("filtro POSTO está vazio")
			
			$('#INFOPOSTO___1').children('option:not(:first)').remove();
			$("#INFOPOSTO___1").css("border-color","#d1d3d4")
			$("#INFOPOSTO___1").css("background-color","#fff")
				
		} else {
			
			console.log("filtro POSTO não está vazio")
			
			$("#INFOPOSTO___1").css("border-color","#b92113")
			$("#INFOPOSTO___1").css("background-color","#f2dede")

		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOPLANO___1").val()=="" || $("#INFOPLANO___1").val()==null){
			
			console.log("filtro PLANO está vazio")
			
			$('#INFOPLANO___1').children('option:not(:first)').remove();
			$("#INFOPLANO___1").css("border-color","#d1d3d4")
			$("#INFOPLANO___1").css("background-color","#fff")
				
		} else {
			
			console.log("filtro PLANO não está vazio")
			
			$("#INFOPLANO___1").css("border-color","#b92113")
			$("#INFOPLANO___1").css("background-color","#f2dede")

		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOCARGAPREV___1").val()=="" || $("#INFOCARGAPREV___1").val()==null){
			
			console.log("filtro CARGAPREV está vazio")
			
			$('#INFOCARGAPREV___1').children('option:not(:first)').remove();
			$("#INFOCARGAPREV___1").css("border-color","#d1d3d4")
			$("#INFOCARGAPREV___1").css("background-color","#fff")
				
		} else {
			
			console.log("filtro CARGAPREV não está vazio")
			
			$("#INFOCARGAPREV___1").css("border-color","#b92113")
			$("#INFOCARGAPREV___1").css("background-color","#f2dede")

		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOCARGAREALIZADA___1").val()=="" || $("#INFOCARGAREALIZADA___1").val()==null){
			
			console.log("filtro CARGAREALIZADA está vazio")
			
			$('#INFOCARGAREALIZADA___1').children('option:not(:first)').remove();
			$("#INFOCARGAREALIZADA___1").css("border-color","#d1d3d4")
			$("#INFOCARGAREALIZADA___1").css("background-color","#fff")
				
		} else {
			
			console.log("filtro CARGAREALIZADA não está vazio")
			
			$("#INFOCARGAREALIZADA___1").css("border-color","#b92113")
			$("#INFOCARGAREALIZADA___1").css("background-color","#f2dede")

		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOSALDOREV___1").val()=="" || $("#INFOSALDOREV___1").val()==null){
			
			console.log("filtro INFOSALDOREV está vazio")
			
			$('#INFOSALDOREV___1').children('option:not(:first)').remove();
			$("#INFOSALDOREV___1").css("border-color","#d1d3d4")
			$("#INFOSALDOREV___1").css("background-color","#fff")
				
		} else {
			
			console.log("filtro INFOSALDOREV não está vazio")
			
			$("#INFOSALDOREV___1").css("border-color","#b92113")
			$("#INFOSALDOREV___1").css("background-color","#f2dede")

		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOSALDOALOC___1").val()=="" || $("#INFOSALDOALOC___1").val()==null){
			
			console.log("filtro INFOSALDOREV está vazio")
			
			$('#INFOSALDOALOC___1').children('option:not(:first)').remove();
			$("#INFOSALDOALOC___1").css("border-color","#d1d3d4")
			$("#INFOSALDOALOC___1").css("background-color","#fff")
				
		} else {
			
			console.log("filtro INFOSALDOALOC não está vazio")
			
			$("#INFOSALDOALOC___1").css("border-color","#b92113")
			$("#INFOSALDOALOC___1").css("background-color","#f2dede")

		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOSALDOAALOCAR___1").val()=="" || $("#INFOSALDOAALOCAR___1").val()==null){
			
			console.log("filtro INFOSALDOAALOCAR está vazio")
			
			$('#INFOSALDOAALOCAR___1').children('option:not(:first)').remove();
			$("#INFOSALDOAALOCAR___1").css("border-color","#d1d3d4")
			$("#INFOSALDOAALOCAR___1").css("background-color","#fff")
				
		} else {
			
			console.log("filtro INFOSALDOAALOCAR não está vazio")
			
			$("#INFOSALDOAALOCAR___1").css("border-color","#b92113")
			$("#INFOSALDOAALOCAR___1").css("background-color","#f2dede")

		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOAVANCO___1").val()=="" || $("#INFOAVANCO___1").val()==null){
			
			console.log("filtro INFOAVANCO está vazio")
			
			$('#INFOAVANCO___1').children('option:not(:first)').remove();
			$("#INFOAVANCO___1").css("border-color","#d1d3d4")
			$("#INFOAVANCO___1").css("background-color","#fff")
				
		} else {
			
			console.log("filtro INFOAVANCO não está vazio")
			
			$("#INFOAVANCO___1").css("border-color","#b92113")
			$("#INFOAVANCO___1").css("background-color","#f2dede")

		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFORECPREV___1").val()=="" || $("#INFORECPREV___1").val()==null){
			
			console.log("filtro INFOAVANCO está vazio")
			
			$('#INFORECPREV___1').children('option:not(:first)').remove();
			$("#INFORECPREV___1").css("border-color","#d1d3d4")
			$("#INFORECPREV___1").css("background-color","#fff")
				
		} else {
			
			console.log("filtro INFORECPREV não está vazio")
			
			$("#INFORECPREV___1").css("border-color","#b92113")
			$("#INFORECPREV___1").css("background-color","#f2dede")

		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFORECPREV___1").val()=="" || $("#INFORECPREV___1").val()==null){
			
			console.log("filtro INFOAVANCO está vazio")
			
			$('#INFORECPREV___1').children('option:not(:first)').remove();
			$("#INFORECPREV___1").css("border-color","#d1d3d4")
			$("#INFORECPREV___1").css("background-color","#fff")
				
		} else {
			
			console.log("filtro INFORECPREV não está vazio")
			
			$("#INFORECPREV___1").css("border-color","#b92113")
			$("#INFORECPREV___1").css("background-color","#f2dede")

		}
		
		// APAGA A LISTA ATUAL
		//apagaLista()
		
		// CARREGA UMA NOVA LISTA
		carregaLista()
		
		// CONSTRÓI OS FILTROS
		constroiFiltros()
		
		// SE TEM ITEM SELECIONADO
		/*if(temItemSelecionado()){
			
			// ESCONDE ITENS QUE NÃO ESTÃO SELECIONADOS
			escondeItemNaoselecionado()
			
		}*/
		
	},1000)
		
	// DESATIVA O LOAD
	setTimeout(function(){
		
		myLoading2.hide();
		
	},500)
	
}

// SE TEM ITEM SELECIONADO
function temItemSelecionado(){
	
	console.log("tem item selecionado")
	
	var ret = false
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSATV___']").each(function (){
		
		var seq = $(this).attr("id").split("___")[1]
		
		// SE TEM ALGUM ITEM QUE FOI SELECIONADO
		if($("#PROGRAMANDO___"+seq).is(":checked")){
			
			ret = true
			
		}
		
	})
	
	console.log("tem item selecionado? "+ret)
	
	return ret
	
}

 // CARREGA A LISTA DE ACORDO COM OS FILTROS PREENCHIDOS
function carregaLista(){
	
	console.log("entrei para carregar lista")

	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSATV___']").each(function (){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var os = $("#INFOOS___1").val()
		var op = $("#INFOOP___1").val()
		var tag = $("#INFOTAG___1").val()
		var folga = $("#INFOFOLGA___1").val()
		var inicio = $("#INFOINICIO___1").val()
		var fim = $("#INFOFIM___1").val()
		var statusOp = $("#INFOSTATUSOP___1").val()
		var item = $("#INFOITEM___1").val()
		var atv = $("#INFOATIVIDADE___1").val()
		var prioridade = $("#INFOPRIORIDADE___1").val()
		var idAtv = $("#INFOIDATV___1").val()
		var statusAtv = $("#INFOSTATUSATV___1").val()
		var posto = $("#INFOPOSTO___1").val()
		var plano = $("#INFOPLANO___1").val()
		var cargaPrev = $("#INFOCARGAPREV___1").val()
		var cargaReal = $("#INFOCARGAREALIZADA___1").val()
		var saldoAtv = $("#INFOSALDOREV___1").val()
		var saldoAloc = $("#INFOSALDOALOC___1").val()
		var saldoAlocar = $("#INFOSALDOAALOCAR___1").val()
		var avanco = $("#INFOAVANCO___1").val()
		var recPrev = $("#INFORECPREV___1").val()
		var execucao = $("#INFOEXECUCAO___1").val()
		
		var osLista = $("#OSATV___"+seq).val()
		var opLista = $("#OPATV___"+seq).val()
		var tagLista = $("#TAGATV___"+seq).val()
		var folgaLista = $("#FOLGAATV___"+seq).val()
		var inicioLista = $("#INICIOPLANATV___"+seq).val()
		var fimLista = $("#FIMPLANATV___"+seq).val()
		var statusOpLista = $("#STATUSOPATV___"+seq).val()
		var itemLista = $("#ITEMATV___"+seq).val()
		var atvLista = $("#ATIVIDADEATV___"+seq).val()
		var prioridadeLista = $("#PRIORIDADEATV___"+seq).val()
		var idAtvLista = $("#IDATIVIDADEATV___"+seq).val()
		var statusAtvLista = $("#STATUSATV___"+seq).val()
		var postoLista = $("#POSTOATV___"+seq).val()
		var planoLista = $("#PLANOCORTEATV___"+seq).val()
		var cargaPrevLista = $("#CARGAPREVATV___"+seq).val()
		var cargaRealLista = $("#CARGAREALATV___"+seq).val()
		var saldoAtvLista = $("#SALDOREVATV___"+seq).val()
		var saldoAlocLista = $("#SALDOALOCADOATV___"+seq).val()
		var saldoAlocarLista = $("#SALDOAALOCARATV___"+seq).val()
		var avancoLista = $("#AVANCOATV___"+seq).val()
		var recPrevLista = $("#RECPREVATV___"+seq).val()
		var execucaoLista = $("#EXECUCAOATV___"+seq).val()
		
		console.log("os: "+os+", op: "+op+", folga: "+folga+", inicio: "+
				inicio+", fim: "+fim+", statusOp: "+statusOp+", item: "+item+", atv: "+
				atv+", prioridade: "+prioridade+", idAtv: "+idAtv+", statusAtv: "+statusAtv+", posto: "+posto+", plano: "+plano+", cargaPrev: "+cargaPrev
				+", cargaReal: "+cargaReal+", saldoAtv: "+saldoAtv+", saldoAloc: "+saldoAloc+", saldoAlocar: "+saldoAlocar+", avanco: "+avanco
				+", recPrev: "+recPrev+", execucao: "+execucao+", tagLista: "+tagLista)
		
		if(os=="" || os==null){
			console.log("filtro os esta vazio")
			os = osLista
		}
		if(op=="" || op==null){
			console.log("filtro op esta vazio")
			op = opLista
		}
		if(tag=="" || tag==null){
			console.log("filtro tag esta vazio")
			tag = tagLista
		}
		if(execucao=="" || execucao==null){
			console.log("filtro execucao esta vazio")
			execucao = execucaoLista
		}
		if(inicio=="" || inicio==null){  
			console.log("filtro inicio esta vazio")
			inicio = inicioLista
		}
		if(fim=="" || fim==null){
			console.log("filtro fim esta vazio")
			fim = fimLista
		}
		if(statusOp=="" || statusOp==null){
			console.log("filtro statusOp esta vazio")
			statusOp = statusOpLista
		}
		if(item=="" || item==null){
			console.log("filtro item esta vazio")
			item = itemLista
		}
		if(atv=="" || atv==null){
			console.log("filtro atv esta vazio")
			atv = atvLista
		}
		if(prioridade=="" || prioridade==null){
			console.log("filtro prioridade esta vazio")
			prioridade = prioridadeLista
		}
		if(idAtv=="" || idAtv==null){
			console.log("filtro idAtv esta vazio")
			idAtv = idAtvLista
		}
		if(statusAtv=="" || statusAtv==null){
			console.log("filtro statusAtv esta vazio")
			statusAtv = statusAtvLista
		}
		if(posto=="" || posto==null){
			console.log("filtro posto esta vazio")
			posto = postoLista
		}
		if(plano=="" || plano==null){
			console.log("filtro plano esta vazio")
			plano = planoLista
		}
		if(cargaPrev=="" || cargaPrev==null){
			console.log("filtro cargaPrev esta vazio")
			cargaPrev = cargaPrevLista
		}
		if(cargaReal=="" || cargaReal==null){
			console.log("filtro cargaReal esta vazio")
			cargaReal = cargaRealLista
		}
		if(saldoAtv=="" || saldoAtv==null){
			console.log("filtro saldoAtv esta vazio")
			saldoAtv = saldoAtvLista
		}
		if(saldoAloc=="" || saldoAloc==null){
			console.log("filtro saldoAloc esta vazio")
			saldoAloc = saldoAlocLista
		}
		if(saldoAlocar=="" || saldoAlocar==null){
			console.log("filtro saldoAlocar esta vazio")
			saldoAlocar = saldoAlocarLista
		}
		if(avanco=="" || avanco==null){
			console.log("filtro avanco esta vazio")
			avanco = avancoLista
		}
		if(recPrev=="" || recPrev==null){
			console.log("filtro recPrev esta vazio")
			recPrev = recPrevLista
		}
		
		// SE FILTROS NÃO COINCIDE COM TODOS OS CAMPOS DO ITEM
		if(!(os==osLista && op==opLista && tag==tagLista && execucao==execucaoLista && inicio==inicioLista &&
				fim==fimLista && statusOp==statusOpLista && item==itemLista && 
				atv==atvLista && prioridade==prioridadeLista  && idAtv==idAtvLista && statusAtv==statusAtvLista &&
				posto==postoLista && plano==planoLista && plano==planoLista && cargaPrev==cargaPrevLista && 
				cargaReal==cargaRealLista && saldoAtv==saldoAtvLista && saldoAloc==saldoAlocLista && saldoAlocar==saldoAlocarLista
				&& avanco==avancoLista && recPrev==recPrevLista)){
		
			console.log("vou esconder LINHAPLAN___"+seq)
			
			$("#LINHAPLAN___"+seq).hide()
			$("#LINHAPLAN___"+seq).addClass("invisivel")
			
		} else {
			
			console.log("vou exibir LINHAPLAN___"+seq)
			
			$("#LINHAPLAN___"+seq).show()
			$("#LINHAPLAN___"+seq).removeClass("invisivel")
			
		}
		
	})
	
	console.log("terminei de carregar lista")
	
} 

// SELEÇÃO DO DIA
function selecaoDia(obj){
	
	console.log("entrei na seleção dia")
	
	var input = $(obj).attr("id").split("___")[0]
	var seq = $(obj).attr("id").split("___")[1]
	
	var codAtividade = $("#CODATIVIDADEATV___"+seq).val()
	var codcoligada = $("#CODCOLIGADA___"+seq).val()
	var codfilial = $("#CODFILIAL___"+seq).val()
	var codOrdem = $("#OPATV___"+seq).val()
	var idAtvOrdem = $("#IDATIVIDADEATV___"+seq).val()
	var codEstrutura = $("#CODESTRUTURAATV___"+seq).val()
	var planoCorte = $("#NUMPLANOCORTEREAL").val()
	var info = true
	
	//var atvTemPC = atvTemPlanoCorte(codcoligada,codfilial,codOrdem,idAtvOrdem,codEstrutura)
	
	// SE LINHA NÃO FOI SELECIONADA
	if(!($("#PROGRAMANDO___"+seq).is(":checked"))){
		
		info = false
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'É necessário selecionar a atividade',
			  text: 'Verifique e tente novamente.'
		})
		
	} else {
		// SE NÃO, SE LINHA ESTÁ SELECIONADA
		
		// SE RECURSOS NÃO FORAM INFORMADOS
		if($("#GRUPORECURSON3").val()=="" || $("#GRUPORECURSON3").val()==null || $("#GRUPORECURSON3").val()==undefined){
			
			info = false
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'É necessário informar o(s) Recurso(s) (N3) antes de realizar a alocação',
				  text: 'Verifique e tente novamente.'
			})
			
		} else {
			
			input = input.replace("D","")
			var instance = "#DIA"+input+"ATVREAL___"+seq	
			var dia = $(instance).val()
			var codmo = $("#CODRECURSON3").val()
			codmo = codmo.replace(";","")
				
			// SE O OPERADOR ESTARÁ EM FÉRIAS PARA A DATA SELECIONADA
			if(verificaFeriasOperador(dia,codcoligada,codfilial,codmo)){
				
				info = false
				
				// EXIBE ALERTA
				Swal.fire({
					  icon: 'error',
					  title: 'O(s) Recurso(s) (N3) selecionado não pode ser alocado pois estará em férias no dia selecionado',
					  text: 'Verifique e tente novamente.'
				})
				
			}
			
		}
		
		/*else if(atvTemPC){
			// SE NÃO, SE ATIVIDADE TEM PLANO DE CORTE	
			
			if($("#PLANOCORTE").val()=="" || $("#PLANOCORTE").val()==null || $("#PLANOCORTE").val()==undefined){
			// SE PLANO DE CORTE NÃO FOI INFORMADO
				
				info = false
				
				// EXIBE ALERTA
				Swal.fire({
					  icon: 'error',
					  title: 'É necessário informar o Plano de Corte',
					  text: 'Verifique e tente novamente.'
				})
				
			}
			
		}*/
		
	}
	
	// SE AS INFORMAÇÕES NECESSÁRIAS FORAM INFORMADOS
	if(info){
		
		console.log("input: "+input)
		console.log("seq: "+seq)
			
		input = input.replace("D","")
		console.log("input sem D: "+input)

		// SE O ITEM JÁ ESTAVA SELECIONADO
		if($(obj).hasClass("diaSelecionado")){
			
			$(obj).removeClass("diaSelecionado")
			
			var instance = "#DIA"+input+"ATV___"+seq
			console.log("instance: "+instance)
			$(instance).prop("readonly",true)
			$(instance).val("")
			
			
		} else {
			// SE NÃO COLOCA A SELEÇÃO
			
			$(obj).addClass("diaSelecionado")
			
			var instance = "#DIA"+input+"ATV___"+seq
			console.log("instance: "+instance)
			
			// SE ATIVIDADE TEM PLANO DE CORTE
			/*if(atvTemPC){
				
				console.log("atv tem plano de corte")
				
				var saldo = buscaSaldoProgramarAtvPC(codcoligada,codfilial,codOrdem,idAtvOrdem,codEstrutura,planoCorte)
				
				console.log("saldo retornado: "+saldo)
				
				saldo = parseFloat(saldo).toFixed(2)
				saldo = saldo.toString()
				saldo = saldo.replace(".",",")
				
				console.log("saldo calculado: "+saldo)
				
				// LIMPA OS DIAS JÁ ALOCADOS PARA O PLANO
				limpaDiasAlocadosPC(input,seq)
				
				$(instance).val(saldo)
				
			} else {*/
				// SE NÃO 
				
				console.log("atividade não tem plano")
				
				$(instance).val("")
				$(instance).prop("readonly",false)
				
			//}
			
		}
		
	}
		
}

// SE O OPERADOR ESTARÁ EM FÉRIAS PARA A DATA SELECIONADA
function verificaFeriasOperador(dia,codcoligada,codfilial,codmo){
	
	console.log("vou verificar a disponibilidade do operador em relação ao período das férias")
	
	console.log("dia: "+dia+", codcoligada: "+codcoligada+", codfilial: "+codfilial+", codmo: "+codmo)
	
	// MONTA O ARRAY DAS CONSTRAINTS
	var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codcoligada,codcoligada,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("CODFILIAL",codfilial,codfilial,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("CODMO",codmo,codmo,ConstraintType.MUST)
	var a4 = DatasetFactory.createConstraint("DIA",dia,dia,ConstraintType.MUST)
	
	var constraints = new Array(a1,a2,a3,a4)
	
	var dataset = DatasetFactory.getDataset("dsVerificaFeriasOperador",null,constraints,null)
	var row = dataset.values
	
	console.log("row")
	console.log(row)
	
	// SE RETORNO É NULO OU VAZIO, NÃO ESTÁ EM FÉRIAS NESSA DATA
	if(row=="" || row==null || row==undefined){
		
		return false
		
	} else {
		// SE NÃO
		
		return true
		
	}
	
}

// LIMPA OS DIAS JÁ ALOCADOS PARA O PLANO
function limpaDiasAlocadosPC(digito,seq){
	
	console.log("entrei para limpar dias alocados")
	
	var input = 1
	var dig
	
	console.log("digito: "+digito)
	
	// PERCORRE TODOS OS REGISTROS DOS DIAS
	for(var i=0; i<10;i++){
		
		console.log("input "+input)
		
		dig = input.toString()
		var instance = "#DIA"+dig+"ATV___"+seq
		
		if(!(input==digito)){
			
			console.log("vou limpar a instance: "+instance)
			
			$(instance).val("")
			$(instance).prop("readonly",true)
			
		}
		
		input = input + 1
		
	}
	
}

// BUSCA O SALDO PARA PROGRAMAR DA ATIVIDADE COM PLANO DE CORTE
function buscaSaldoProgramarAtvPC(codcoligada,codfilial,codOrdem,idAtvOrdem,codEstrutura,planoCorte){

	console.log("entrei para buscar o saldo programar da atv do PC")
	
	var saldo = 0
	
	console.log("codcoligada: "+codcoligada+", codfilial: "+codfilial+", codOrdem: "+codOrdem+
			", idAtvOrdem: "+idAtvOrdem+", codEstrutura: "+codEstrutura+", planoCorte: "+planoCorte)
	
	// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
	var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codcoligada,codcoligada,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("CODFILIAL",codfilial,codfilial,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("CODESTRUTURA",codEstrutura,codEstrutura,ConstraintType.MUST)
	var a4 = DatasetFactory.createConstraint("IDATVORDEM",idAtvOrdem,idAtvOrdem,ConstraintType.MUST)
	var a5 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
	var a6 = DatasetFactory.createConstraint("PLANOCORTE",planoCorte,planoCorte,ConstraintType.MUST)

	var constraints = new Array(a1,a2,a3,a4,a5,a6)
	
	var dataset = DatasetFactory.getDataset("dsSaldoProgramarAtvPC",null,constraints,null)
	var row = dataset.values
	console.log("row")
	console.log(row)
	var rep
	
	if(!(row=="" || row==null || row==undefined || row=="null")){
		
		rep = row[0]
		
		saldo = rep["SALDO"]
		
	}
	
	return saldo
	
}

// CARREGA O PLANO DE CORTE DA ATIVIDADE
function carregaPlanoCorte(obj){
	
	console.log("vou carregar os planos de corte")
	
	var myLoading2 = FLUIGC.loading(window);
	
	myLoading2.show();
	
	// INICIA A OPERAÇÃO DEPOIS DE CARREGAR O LOAD
	setTimeout(function(){
		
		var seq = $(obj).children("input").attr("id").split("___")[1]
		
		var coligada = $("#CODCOLIGADA___"+seq).val()
		var codfilial = $("#CODFILIAL___"+seq).val()
		var codestrutura = $("#CODESTRUTURAATV___"+seq).val()
		var idAtividade = $("#IDATIVIDADEATV___"+seq).val()
		var codOrdem = $("#OPATV___"+seq).val()
		
		console.log("filtros. coligada: "+coligada+", codfilial: "+codfilial+", codestrutura: "+codestrutura+", idAtividade: "+idAtividade+", codOrdem: "+codOrdem)
		
		// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
		var a1 = DatasetFactory.createConstraint("CODCOLIGADA",coligada,coligada,ConstraintType.MUST)
		var a2 = DatasetFactory.createConstraint("CODFILIAL",codfilial,codfilial,ConstraintType.MUST)
		var a3 = DatasetFactory.createConstraint("CODESTRUTURA",codestrutura,codestrutura,ConstraintType.MUST)
		var a4 = DatasetFactory.createConstraint("IDATVORDEM",idAtividade,idAtividade,ConstraintType.MUST)
		var a5 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)

		var constraints = new Array(a1,a2,a3,a4,a5)
		
		var dataset = DatasetFactory.getDataset("dsBuscaPlanoCorteAtvOS",null,constraints,null)
		var row = dataset.values
		
		console.log("retorno row: "+row)
		
		// SE RETORNO NÃO É VAZIO OU NULO
		if(!(row=="" || row==null || row==undefined)){
		
			var count = dataset.values.length
			
			// PERCORRE TODOS OS REGISTROS
			for(var i=0;i<count;i++){
				
				var rep = row[i]
				
				var seq2 = addModalPlanoCorte()
				
			    $("#NUMPLANOCORTEATV___"+seq2).val(rep["NUMPLANOCORTE"])
			    $("#DATACRIACAOATV___"+seq2).val(formataData(rep["RECCREATEDON"]))
			    $("#QUANTIDADEATV___"+seq2).val(rep["QUANTIDADE"])
				
			}
			
		}
		
	},500)
		
	// DESATIVA O LOAD
	setTimeout(function(){
		
		myLoading2.hide();
		$("#ICONREDUZIR").click()
		
	},500)
	
}

// CARREGA O PLANO DE CORTE DA ATIVIDADE
function carregaPlanoCorteAloc(obj){
	
	console.log("vou carregar os planos de corte")
	
	var myLoading2 = FLUIGC.loading(window);
	
	myLoading2.show();
	
	// INICIA A OPERAÇÃO DEPOIS DE CARREGAR O LOAD
	setTimeout(function(){
		
		var seq = $(obj).attr("id").split("___")[1]
		
		var coligada = $("#CODCOLIGADAALOC___"+seq).val()
		var codfilial = $("#CODFILIALALOC___"+seq).val()
		var codestrutura = $("#CODESTRUTURAALOC___"+seq).val()
		var idAtividade = $("#IDATIVIDADEALOC___"+seq).val()
		var codOrdem = $("#OPALOC___"+seq).val()
		
		console.log("filtros. coligada: "+coligada+", codfilial: "+codfilial+", codestrutura: "+codestrutura+", idAtividade: "+idAtividade+", codOrdem: "+codOrdem)
		
		// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
		var a1 = DatasetFactory.createConstraint("CODCOLIGADA",coligada,coligada,ConstraintType.MUST)
		var a2 = DatasetFactory.createConstraint("CODFILIAL",codfilial,codfilial,ConstraintType.MUST)
		var a3 = DatasetFactory.createConstraint("CODESTRUTURA",codestrutura,codestrutura,ConstraintType.MUST)
		var a4 = DatasetFactory.createConstraint("IDATVORDEM",idAtividade,idAtividade,ConstraintType.MUST)
		var a5 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)

		var constraints = new Array(a1,a2,a3,a4,a5)
		
		var dataset = DatasetFactory.getDataset("dsBuscaPlanoCorteAtvOS",null,constraints,null)
		var row = dataset.values
		
		console.log("retorno row: "+row)
		
		// SE RETORNO NÃO É VAZIO OU NULO
		if(!(row=="" || row==null || row==undefined)){
			
			var count = dataset.values.length
			
			// PERCORRE TODOS OS REGISTROS
			for(var i=0;i<count;i++){
				
				var rep = row[i]
				
				var seq2 = addModalPlanoCorte()
				
			    $("#NUMPLANOCORTEATV___"+seq2).val(rep["NUMPLANOCORTE"])
			    $("#DATACRIACAOATV___"+seq2).val(formataData(rep["RECCREATEDON"]))
			    $("#QUANTIDADEATV___"+seq2).val(rep["QUANTIDADE"])
				
			}
			
		}
		
	},500)
		
	// DESATIVA O LOAD
	setTimeout(function(){
		
		myLoading2.hide();
		$("#ICONREDUZIR").click()
		
	},500)
	
}

// CARREGA A DESCRIÇÃO DO PROCESSO DA ATIVIDADE
function carregaProcesso(obj){

	console.log("vou carregar o processo ATUALIZADA")
	
	var myLoading2 = FLUIGC.loading(window);
	
	myLoading2.show();
	
	// INICIA A OPERAÇÃO DEPOIS DE CARREGAR O LOAD
	setTimeout(function(){
		
		var seq = $(obj).attr("id").split("___")[1]
		
		var coligada = $("#CODCOLIGADA___"+seq).val()
		var codfilial = $("#CODFILIAL___"+seq).val()
		var codestrutura = $("#CODESTRUTURAATV___"+seq).val()
		var codatividade = $("#CODATIVIDADEATV___"+seq).val()
		var codordem = $("#OPATV___"+seq).val()
		var execucao = $("#EXECUCAOATV___"+seq).val()
		var idAtvOrdem = $("#IDATIVIDADEATV___"+seq).val()
		
		console.log("filtros. coligada: "+coligada+", codfilial: "+codfilial+", codestrutura: "+codestrutura+", codatividade: "+codatividade)
		
		// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
		var a1 = DatasetFactory.createConstraint("CODCOLIGADA",coligada,coligada,ConstraintType.MUST)
		var a2 = DatasetFactory.createConstraint("CODFILIAL",codfilial,codfilial,ConstraintType.MUST)
		var a3 = DatasetFactory.createConstraint("CODESTRUTURA",codestrutura,codestrutura,ConstraintType.MUST)
		var a4 = DatasetFactory.createConstraint("CODATIVIDADE",codatividade,codatividade,ConstraintType.MUST)
		var a5 = DatasetFactory.createConstraint("CODORDEM",codordem,codordem,ConstraintType.MUST)
		var a6 = DatasetFactory.createConstraint("EXECUCAO",execucao,execucao,ConstraintType.MUST)
		var a7 = DatasetFactory.createConstraint("IDATVORDEM",idAtvOrdem,idAtvOrdem,ConstraintType.MUST)

		var constraints = new Array(a1,a2,a3,a4,a5,a6,a7)
		
		var dataset = DatasetFactory.getDataset("dsProcessoOS",null,constraints,null)
		var row = dataset.values
		
		console.log("retorno row: "+row)
		
		// SE RETORNO NÃO É VAZIO OU NULO
		if(!(row=="" || row==null || row==undefined)){
			
			var rep = row[0]
			
		    $("#DESCPROCESSO").val(rep["DETALHE"])
			
		} else {
			
			$("#DESCPROCESSO").val("")
			
		}
		
	},500)
		
	// DESATIVA O LOAD
	setTimeout(function(){
		
		myLoading2.hide();
		$("#ICONREDUZIR").click()
		
	},500)
	
}

//CARREGA A DESCRIÇÃO DO PROCESSO DA ATIVIDADE
function carregaProcessoAloc(obj){

	console.log("vou carregar o processo")
	
	var myLoading2 = FLUIGC.loading(window);
	
	myLoading2.show();
	
	// INICIA A OPERAÇÃO DEPOIS DE CARREGAR O LOAD
	setTimeout(function(){
		
		var seq = $(obj).attr("id").split("___")[1]
		
		var coligada = $("#CODCOLIGADAALOC___"+seq).val()
		var codfilial = $("#CODFILIALALOC___"+seq).val()
		var codestrutura = $("#CODESTRUTURAALOC___"+seq).val()
		var codatividade = $("#CODATIVIDADEALOC___"+seq).val()
		var codordem = $("#OPATV___"+seq).val()
		
		console.log("filtros. coligada: "+coligada+", codfilial: "+codfilial+", codestrutura: "+codestrutura+", codatividade: "+codatividade)
		
		// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
		var a1 = DatasetFactory.createConstraint("CODCOLIGADA",coligada,coligada,ConstraintType.MUST)
		var a2 = DatasetFactory.createConstraint("CODFILIAL",codfilial,codfilial,ConstraintType.MUST)
		var a3 = DatasetFactory.createConstraint("CODESTRUTURA",codestrutura,codestrutura,ConstraintType.MUST)
		var a4 = DatasetFactory.createConstraint("CODATIVIDADE",codatividade,codatividade,ConstraintType.MUST)
		var a5 = DatasetFactory.createConstraint("CODORDEM",codordem,codordem,ConstraintType.MUST)

		var constraints = new Array(a1,a2,a3,a4,a5)
		
		var dataset = DatasetFactory.getDataset("dsProcessoOS",null,constraints,null)
		var row = dataset.values
		
		console.log("retorno row: "+row)
		
		// SE RETORNO NÃO É VAZIO OU NULO
		if(!(row=="" || row==null || row==undefined)){
			
			var rep = row[0]
			
			$("#DESCPROCESSO").val(rep["DETALHE"])
			
		}
		
	},500)
		
	// DESATIVA O LOAD
	setTimeout(function(){
		
		myLoading2.hide();
		$("#ICONREDUZIR").click()
		
	},500)
	
}

// CARREGA O QUE FOI PROGRAMADO PARA A ATIVIDADE
function carregaProgramado(obj){
	
	var myLoading2 = FLUIGC.loading(window);
	
	var dataDe = $("#DATA_DE").val()
	var dataAte = $("#ATE").val()
	
	console.log("dataAte: "+dataAte)
	console.log("dataDe: "+dataDe)
	
	dataDe = formataDataBanco(dataDe)
	dataAte = formataDataBanco(dataAte)
	
	console.log("dataAte: "+dataAte)
	console.log("dataDe: "+dataDe)
	
	myLoading2.show();
	
	// INICIA A OPERAÇÃO DEPOIS DE CARREGAR O LOAD
	setTimeout(function(){
	
		var seq = $(obj).attr("id").split("___")[1]
		
		var coligada = $("#CODCOLIGADA___"+seq).val()
		var codfilial = $("#CODFILIAL___"+seq).val()
		var codEstrutura = $("#CODESTRUTURAATV___"+seq).val()
		var codAtividade = $("#CODATIVIDADEATV___"+seq).val()
		var codOrdem = $("#OPATV___"+seq).val()
		
		// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
		var a1 = DatasetFactory.createConstraint("CODCOLIGADA",coligada,coligada,ConstraintType.MUST)
		var a2 = DatasetFactory.createConstraint("CODFILIAL",codfilial,codfilial,ConstraintType.MUST)
		var a3 = DatasetFactory.createConstraint("CODESTRUTURA",codEstrutura,codEstrutura,ConstraintType.MUST)
		var a4 = DatasetFactory.createConstraint("CODATIVIDADE",codAtividade,codAtividade,ConstraintType.MUST)
		var a5 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
		var a6 = DatasetFactory.createConstraint("DTHRINICIAL",dataDe,dataDe,ConstraintType.MUST)
		var a7 = DatasetFactory.createConstraint("DTHRFINAL",dataAte,dataAte,ConstraintType.MUST)
	
		constraints = new Array(a1,a2,a3,a4,a5,a6,a7)
		
		var dataset = DatasetFactory.getDataset("dsRecursoProgramadoOS",null,constraints,null)
		var row = dataset.values
		
		console.log("row")
		console.log(row)
		
		// SE RETORNO NÃO É VAZIO OU NULO
		if(!(row=="" || row==null || row==undefined)){
			
			var count = dataset.values.length
			
			// PERCORRE TODOS OS REGISTROS
			for(var i=0; i < count; i++){
				
				var rep = row[i]
				
				var seq = addModalProgramacao()
				
				$("#RECURSOALOCADO___"+seq).val(rep["NOME"])
				
				if(!(rep["DTHRINICIAL"]=="" || rep["DTHRINICIAL"]==null || rep["DTHRINICIAL"]==undefined || rep["DTHRINICIAL"]=="null")){
					
					var diaAlocado = formataData(rep["DTHRINICIAL"])
					
					$("#DIAALOCADO___"+seq).val(diaAlocado)
					
				} 
				
				if(!(rep["SALDO_ALOCADO"]=="" || rep["SALDO_ALOCADO"]==null || rep["SALDO_ALOCADO"]==undefined || rep["SALDO_ALOCADO"]=="null")){
					
					var saldoAlocado = rep["SALDO_ALOCADO"]/60
					saldoAlocado = saldoAlocado.toFixed(2)
					
					$("#SALDOALOCADO___"+seq).val(saldoAlocado)
					
				}
				
			}
			
		}
		
	}, 500)
	
	// DESATIVA O LOAD
	setTimeout(function(){
		
		myLoading2.hide();
		$("#ICONREDUZIR").click()
		
	}, 500)
	
}

// CARREGA OS COMPONENTES DA ATIVIDADE
function carregaComponentes(obj){
	
	var myLoading2 = FLUIGC.loading(window);
	
	myLoading2.show();
	
	// INICIA A OPERAÇÃO DEPOIS DE CARREGAR O LOAD
	setTimeout(function(){
	
		var seq = $(obj).attr("id").split("___")[1]
		
		var coligada = $("#CODCOLIGADA___"+seq).val()
		var codfilial = $("#CODFILIAL___"+seq).val()
		var codestrutura = $("#CODESTRUTURAATV___"+seq).val()
		var codatividade = $("#CODATIVIDADEATV___"+seq).val()
		var codordem = $("#OPATV___"+seq).val()
		var idAtvOrdem = $("#IDATIVIDADEATV___"+seq).val()
		
		// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
		var a1 = DatasetFactory.createConstraint("CODCOLIGADA",coligada,coligada,ConstraintType.MUST)
		var a2 = DatasetFactory.createConstraint("CODFILIAL",codfilial,codfilial,ConstraintType.MUST)
		var a3 = DatasetFactory.createConstraint("CODESTRUTURA",codestrutura,codestrutura,ConstraintType.MUST)
		var a4 = DatasetFactory.createConstraint("CODATIVIDADE",codatividade,codatividade,ConstraintType.MUST)
		var a5 = DatasetFactory.createConstraint("CODORDEM",codordem,codordem,ConstraintType.MUST)
		var a6 = DatasetFactory.createConstraint("IDATVORDEM",idAtvOrdem,idAtvOrdem,ConstraintType.MUST)

		constraints = new Array(a1,a2,a3,a4,a5,a6)
		
		var dataset = DatasetFactory.getDataset("dsComponentesOS",null,constraints,null)
		var row = dataset.values
		var count = dataset.values.length
		
		console.log("row")
		console.log(row)
		
		// SE RETORNO NÃO É VAZIO OU NULO
		if(!(row=="" || row==null || row==undefined)){
			
			// PERCORRE TODOS OS REGISTROS
			for(var i=0; i < count; i++){
				
				var rep = row[i]
				
				var seq = addModalComponentes()
				
				$("#CODIGO___"+seq).val(rep["CODIGOPRD"])
				$("#DESCRICAO___"+seq).val(rep["DESCRICAO"])
				$("#ESTLOCAL___"+seq).val(rep["CODLOC"])
				
				if(!(rep["CONSUMO_PLANEJADO"]=="" || rep["CONSUMO_PLANEJADO"]==null || rep["CONSUMO_PLANEJADO"]==undefined || rep["CONSUMO_PLANEJADO"]=="null")){
					
					var consumoPlan = rep["CONSUMO_PLANEJADO"]
					consumoPlan = parseFloat(consumoPlan)
					console.log("consumoPlan após o parseFloat: "+consumoPlan)
					consumoPlan = consumoPlan.toFixed(4)
					console.log("consumoPlan após o toFixed(4): "+consumoPlan)
					consumoPlan = consumoPlan.toString()
					console.log("consumoPlan após o toSTring(): "+consumoPlan)
					
					if(consumoPlan.includes(".")){
						
						console.log("consumoPlan tem '.' "+consumoPlan)
						consumoPlan = consumoPlan.replace(".",",")
						
						console.log("consumoPlan após o replace "+consumoPlan)
						
					}
					
					$("#CONSPLAN___"+seq).val(consumoPlan)
					
				}
				
				if(!(rep["CONSUMO_APONTADO"]=="" || rep["CONSUMO_APONTADO"]==null || rep["CONSUMO_APONTADO"]==undefined || rep["CONSUMO_APONTADO"]=="null")){
					
					var consumoApontado = rep["CONSUMO_APONTADO"]
					consumoApontado = parseFloat(consumoApontado)
					consumoApontado = consumoApontado.toFixed(4)
					consumoApontado = consumoApontado.toString()
					
					console.log("consumoApontado: "+consumoApontado)
					
					if(consumoApontado.includes(".")){
						
						console.log("consumoApontado tem '.' "+consumoApontado)
						consumoApontado = consumoApontado.replace(".",",")
						
						console.log("consumoApontado após o replace "+consumoApontado)
						
					}
					
					$("#CONSAPONTADO___"+seq).val(consumoApontado)
					
				}
				
				if(!(rep["CONSUMO_SALDO"]=="" || rep["CONSUMO_SALDO"]==null || rep["CONSUMO_SALDO"]==undefined || rep["CONSUMO_SALDO"]=="null")){
					
					var consumoSaldo = rep["CONSUMO_SALDO"]
					consumoSaldo = parseFloat(consumoSaldo)
					consumoSaldo = consumoSaldo.toFixed(4)
					consumoSaldo = consumoSaldo.toString()
					
					console.log("consumoSaldo: "+consumoSaldo)
					
					if(consumoSaldo.includes(".")){
						
						console.log("consumoSaldo tem '.' "+consumoSaldo)
						consumoSaldo = consumoSaldo.replace(".",",")
						
						console.log("consumoSaldo após o replace "+consumoSaldo)
						
					}
					
					$("#CONSSALDO___"+seq).val(consumoSaldo)
					
				}
				
				if(!(rep["ESTOQUE_ATUAL"]=="" || rep["ESTOQUE_ATUAL"]==null || rep["ESTOQUE_ATUAL"]==undefined || rep["ESTOQUE_ATUAL"]=="null")){
					
					var estoqueAtual = rep["ESTOQUE_ATUAL"]
					estoqueAtual = parseFloat(estoqueAtual)
					estoqueAtual = estoqueAtual.toFixed(4)
					estoqueAtual = estoqueAtual.toString()
					
					if(estoqueAtual.includes(".")){
						
						estoqueAtual = estoqueAtual.replace(".",",")
						
					}
					
					$("#ESTATUAL___"+seq).val(estoqueAtual)
					
				}
				
				if(!(rep["ESTOQUE_ALOCADO"]=="" || rep["ESTOQUE_ALOCADO"]==null || rep["ESTOQUE_ALOCADO"]==undefined || rep["ESTOQUE_ALOCADO"]=="null")){
					
					var estoqueAlocado = rep["ESTOQUE_ALOCADO"]
					estoqueAlocado = parseFloat(estoqueAlocado)
					estoqueAlocado = estoqueAlocado.toFixed(4)
					estoqueAlocado = estoqueAlocado.toString()
					
					if(estoqueAlocado.includes(".")){
						
						estoqueAlocado = estoqueAlocado.replace(".",",")
						
					}
					
					$("#ESTALOCADO___"+seq).val(estoqueAlocado)
					
				}
				
				if(!(rep["ESTOQUE_SALDO"]=="" || rep["ESTOQUE_SALDO"]==null || rep["ESTOQUE_SALDO"]==undefined || rep["ESTOQUE_SALDO"]=="null")){
					
					var estoqueSaldo = rep["ESTOQUE_SALDO"]
					estoqueSaldo = parseFloat(estoqueSaldo)
					estoqueSaldo = estoqueSaldo.toFixed(4)
					estoqueSaldo = estoqueSaldo.toString()
					
					if(estoqueSaldo.includes(".")){
						
						estoqueSaldo = estoqueSaldo.replace(".",",")
						
					}
					
					$("#ESTSALDO___"+seq).val(estoqueSaldo)
					
				}
				
			}
			
		}
		
	}, 500)
	
	// DESATIVA O LOAD
	setTimeout(function(){
		
		myLoading2.hide();
		$("#ICONREDUZIR").click()
		
	}, 500)
	
}

function temApont(){
	
	var ret = false
	
	$("input[id^='OPERADORAPONT___']").each(function(){
		
		ret = true
		
	})
	
	return ret
	
}

// BUSCA O SEQ DO ITEM JÁ INSERIDO
function operadorAtvDiaAdicionado(dia,codmo){
	
	console.log("operadorAtvDiaAdicionado")
	
	console.log("dia: "+dia+", codmo: "+codmo)
	
	var seqRetorno = ""
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OPERADORAPONT___']").each(function(){
	
		var seq = $(this).attr("id").split("___")[1]
		
		var diaTabela = $("#DATAAPONTREAL___"+seq).val()
		var codmoTabela = $("#CODMOAPONT___"+seq).val()
		
		// SE DIA E CODMO JÁ FOI INCLUÍDO NA TABELA
		if(diaTabela==dia && codmoTabela==codmo){
			
			seqRetorno = seq
			
		}
		
	})
	
	return seqRetorno
	
}

// CARREGA AS INFORMAÇÕES DOS APONTAMENTOS DA ATIVIDADE
function carregaApontamentos(obj){
	
	console.log("VOU CARREGAR A TABELA DE APONTAMENTOS")
	
	var myLoading2 = FLUIGC.loading(window);
	
	myLoading2.show();
	
	// INICIA A OPERAÇÃO DEPOIS DE CARREGAR O LOAD
	setTimeout(function(){
		
		var seq = $(obj).attr("id").split("___")[1]
		
		var codAtividade = $("#CODATIVIDADEATV___"+seq).val()
		var codOrdem = $("#OPATV___"+seq).val()
		
		var a1 = DatasetFactory.createConstraint("CODATIVIDADE",codAtividade,codAtividade,ConstraintType.MUST)
		var a2 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
		
		constraints = new Array(a1,a2)
		
		var dataset = DatasetFactory.getDataset("dsApontAlocOS",null,constraints,null)
		var row = dataset.values
		
		console.log("row: ")
		console.log(row)
		
		// SE RETORNO NÃO É VAZIO OU NULO
		if(!(row=="" || row==undefined || row==null || row=="null")){
			
			var count = dataset.values.length
			
			// PERCORRE TODOS OS REGISTROS
			for(var i=0; i<count; i++){

				var rep = row[i]
				
				// SE OPERADOR JÁ FOI ADICIONADO NA TABELA NO MESMO DIA
				if(!(operadorAtvDiaAdicionado(rep["DTHRFINAL"].split(" ")[0],rep["CODMO"])=="")){
					
					var seq = operadorAtvDiaAdicionado(rep["DTHRFINAL"].split(" ")[0],rep["CODMO"])
					
					var apont = $("#HORASPREVAPONT___"+seq).val()
					var aloc = $("#SALDOALOCADOAPONT___"+seq).val()
					
					if(apont==0 && !(rep["APONTADO"]=="" || rep["APONTADO"]==null || rep["APONTADO"]==undefined || rep["APONTADO"]=="null")){
						
						var apontado = rep["APONTADO"]
						apontado = parseFloat(apontado)
						apontado = apontado.toFixed(2)
						apontado = apontado.toString()
						
						if(apontado.includes(".")){
							
							apontado = apontado.replace(".",",")
							
						}
						
						$("#HORASPREVAPONT___"+seq).val(apontado)
						
					} else {
						
						var apontado = rep["APONTADO"]
						apontado = parseFloat(apontado)
						apontado = apontado.toFixed(2)
						
						apont = apont.replace(",",".")
						apont = parseFloat(apont).toFixed(2)
						
						apontado = parseFloat( parseFloat(apontado) + parseFloat(apont) )
						
						apontado = apontado.toString()
						
						if(apontado.includes(".")){
							
							apontado = apontado.replace(".",",")
							
						}
						
						$("#HORASPREVAPONT___"+seq).val(apontado)
						
					}
					
					if(aloc==0 && !(rep["ALOCADO"]=="" || rep["ALOCADO"]==null || rep["ALOCADO"]==undefined || rep["ALOCADO"]=="null")){
						
						var alocado = rep["ALOCADO"]
						alocado = parseFloat(alocado)
						alocado = alocado.toFixed(2)
						alocado = alocado.toString()
						
						if(alocado.includes(".")){
							
							alocado = alocado.replace(".",",")
							
						}
						
						$("#SALDOALOCADOAPONT___"+seq).val(alocado)
						
					} else {
						
						var alocado = rep["ALOCADO"]
						alocado = parseFloat(alocado)
						alocado = alocado.toFixed(2)
						
						aloc = aloc.replace(",",".")
						aloc = parseFloat(aloc).toFixed(2)
						
						alocado = parseFloat( parseFloat(alocado) + parseFloat(aloc) )
						
						alocado = alocado.toString()
						
						if(alocado.includes(".")){
							
							alocado = alocado.replace(".",",")
							
						}
						
						$("#SALDOALOCADOAPONT___"+seq).val(alocado)
						
					}

				} else {
					// SE NÃO
					
					var seq = addModalApontamentos()
					
					var data = rep["DTHRFINAL"]
					data = formataData(data)
					
					$("#DATAAPONTREAL___"+seq).val(rep["DTHRFINAL"].split(" ")[0])
					$("#DATAAPONT___"+seq).val(data)
					$("#OPERADORAPONT___"+seq).val(rep["NOME"])
					$("#CODMOAPONT___"+seq).val(rep["CODMO"])
					
					// SE APONTADO NÃO É VAZIO OU NULO
					if(!(rep["APONTADO"]=="" || rep["APONTADO"]==null || rep["APONTADO"]==undefined || rep["APONTADO"]=="null")){
						
						var apontado = rep["APONTADO"]
						apontado = parseFloat(apontado)
						apontado = apontado.toFixed(2)
						apontado = apontado.toString()
						
						if(apontado.includes(".")){
							
							apontado = apontado.replace(".",",")
							
						}
						
						$("#HORASPREVAPONT___"+seq).val(apontado)
						
					} else {
						// SE NÃO
						
						$("#HORASPREVAPONT___"+seq).val(0)
						
					}
					
					// SE ALOCADO NÃO É VAZIO OU NULO
					if(!(rep["ALOCADO"]=="" || rep["ALOCADO"]==null || rep["ALOCADO"]==undefined || rep["ALOCADO"]=="null")){
						
						var alocado = rep["ALOCADO"]
						alocado = parseFloat(alocado)
						alocado = alocado.toFixed(2)
						alocado = alocado.toString()
						
						if(alocado.includes(".")){
							
							alocado = alocado.replace(".",",")
							
						}
						
						$("#SALDOALOCADOAPONT___"+seq).val(alocado)
						
					} else {
						// SE NÃO
						
						$("#SALDOALOCADOAPONT___"+seq).val(0)
						
					}
					
				}
								
			}

		}
		
	},500)
	
	// DESATIVA O LOAD
	setTimeout(function(){
		
		myLoading2.hide();
		$("#ICONREDUZIR").click()
		
	}, 500)
	
}

// CARREGA AS INFORMAÇÕES DO RECURSO ALOCADO NA ATIVIDADE
function carregaRecAlocadoAtv(obj){
	
	console.log("VOU CARREGAR A TABELA DE RECURSOS ALOCADOS")
	
	var myLoading2 = FLUIGC.loading(window);
	
	var dataDe = $("#DATADE_PROG").val()
	var dataAte = $("#DATAATE_PROG").val()
	
	console.log("dataAte: "+dataAte)
	
	dataDe = formataDataBanco(dataDe)
	dataAte = formataDataBanco(dataAte)
	
	console.log("dataDe: "+dataDe)
	console.log("dataAte: "+dataAte)
	
	myLoading2.show();
	
	// PREENCHE OS DIAS DA JANELA DE PLANEJAMENTO
	preencheDiasCabecalhoRecAloc()
	
	// ADICIONA LINHA PARA O RESULTADO DA SOMA DOS RECURSOS ALOCADOS
	var rowSoma = addSomaRecAloc()
	
	// PREENCHE DIAS DA SOMA ALOCAÇÃO
	preencheDiasSomaRecAloc()

	var dia1 = $("#THDIA1RECALOC").text()
	if(!(dia1=="")){
		dia1 = formataDataBanco(dia1)	
	}
	
	var dia2 = $("#THDIA2RECALOC").text()
	if(!(dia2=="")){
		dia2 = formataDataBanco(dia2)	
	}
	
	var dia3 = $("#THDIA3RECALOC").text()
	if(!(dia3=="")){
		dia3 = formataDataBanco(dia3)	
	}
	
	var dia4 = $("#THDIA4RECALOC").text()
	if(!(dia4=="")){
		dia4 = formataDataBanco(dia4)	
	}
	
	var dia5 = $("#THDIA5RECALOC").text()
	if(!(dia5=="")){
		dia5 = formataDataBanco(dia5)	
	}
	
	var dia6 = $("#THDIA6RECALOC").text()
	if(!(dia6=="")){
		dia6 = formataDataBanco(dia6)	
	}
	
	var dia7 = $("#THDIA7RECALOC").text()
	if(!(dia7=="")){
		dia7 = formataDataBanco(dia7)	
	}
	
	var dia8 = $("#THDIA8RECALOC").text()
	if(!(dia8=="")){
		dia8 = formataDataBanco(dia8)	
	}
	
	var dia9 = $("#THDIA9RECALOC").text()
	if(!(dia9=="")){
		dia9 = formataDataBanco(dia9)	
	}
	
	var dia10 = $("#THDIA10RECALOC").text()
	if(!(dia10=="")){
		dia10 = formataDataBanco(dia10)	
	}
	
	// INICIA A OPERAÇÃO DEPOIS DE CARREGAR O LOAD
	setTimeout(function(){
		
		var seq = $(obj).attr("id").split("___")[1]
		
		$("#SEQATUAL").val(seq)
		
		var codAtividade = $("#CODATIVIDADEATV___"+seq).val()
		var codOrdem = $("#OPATV___"+seq).val()
		
		var a1 = DatasetFactory.createConstraint("CODATIVIDADE",codAtividade,codAtividade,ConstraintType.MUST)
		var a2 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
		var a3 = DatasetFactory.createConstraint("DTHRINICIAL",dataDe,dataDe,ConstraintType.MUST)
		var a4 = DatasetFactory.createConstraint("DTHRFINAL",dataAte,dataAte,ConstraintType.MUST)
		
		constraints = new Array(a1,a2,a3,a4)
		
		var dataset = DatasetFactory.getDataset("dsRecAlocadoAtv",null,constraints,null)
		var row = dataset.values
		var count = dataset.values.length
		
		// PERCORRE TODOS OS REGISTROS
		for(var i=0; i<count; i++){

			var rep = row[i]
			
			// SE OPERADOR JÁ FOI INCLUÍDO NA TABELA
			if(contemChapaRAA(rep["CODIGO"])){
				
				console.log("Operador "+rep["CODIGO"]+" já está na tabela")
				
				// BUSCA O SEQ DO OPERADOR
				var seqModal = buscaSeqChapaRAA(rep["CODIGO"])
				
				var dataDisp = rep["DTHRFINAL"]
				dataDisp = dataDisp.split(" ")
				dataDisp = dataDisp[0]
				
				console.log("dia1: "+dia1+", dia2: "+dia2+", dia3: "+dia3+", dia4: "+dia4+", dia5: "+dia5+", dia6: "+dia6+
						", dia7: "+dia7+", dia8: "+dia8+", dia9: "+dia9+", dia10: "+dia10)
				
				console.log("dataDisp: "+dataDisp)
				
				// SE DIA1 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia1==dataDisp){
					
					var saldoAloc= rep["SALDO_ALOCADO"]
					console.log("saldoAlocado "+saldoAlocado)
					
					if(!(saldoAloc=="" || saldoAloc==null || saldoAloc==undefined || saldoAloc=="null")){
						
						var saldo = $("#DIA1RECALOC___"+seqModal).val()
						
						console.log("saldo antes do replace "+saldo)
						saldo = saldo.replace(",",".")
						console.log("saldo depois do replace "+saldo)
						saldo = parseFloat(saldo)
						saldoAloc = parseFloat(saldoAloc)
						console.log("vou somar saldo "+saldo+" e saldoAlocado "+saldoAloc)
						
						var saldoSoma = saldo + saldoAloc
						
						console.log("saldo depois da soma "+saldoSoma)
						
						saldoSoma = parseFloat(saldoSoma).toFixed(2)
						saldoSoma = saldoSoma.toString()
						
						if(saldoSoma.includes(".")){
							
							saldoSoma = saldoSoma.replace(".",",")
							
						}
						
						$("#DIA1RECALOC___"+seqModal).val(saldoSoma)
						
					} /*else {
						
						$("#DIA1RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA1RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
				// SE DIA2 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia2==dataDisp){

					var saldoAloc = rep["SALDO_ALOCADO"]
					
					if(!(saldoAloc=="" || saldoAloc==null || saldoAloc==undefined || saldoAloc=="null")){
					
						var saldo = $("#DIA2RECALOC___"+seqModal).val()
						console.log("saldo antes do replace "+saldo)
						saldo = saldo.replace(",",".")
						console.log("saldo depois do replace "+saldo)
						saldo = parseFloat(saldo)
						saldoAloc = parseFloat(saldoAloc)
						console.log("vou somar saldo "+saldo+" e saldoAlocado "+saldoAloc)
						
						var saldoSoma = saldo + saldoAloc
						console.log("saldo depois da soma "+saldoSoma)
						
						saldoSoma = parseFloat(saldoSoma).toFixed(2)
						saldoSoma = saldoSoma.toString()
						
						if(saldoSoma.includes(".")){
							
							saldoSoma = saldoSoma.replace(".",",")
							
						}
						
						$("#DIA2RECALOC___"+seqModal).val(saldoSoma)
					
					} /*else {
						
						$("#DIA2RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA2RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
				// SE DIA3 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia3==dataDisp){
					
					var saldoAloc = rep["SALDO_ALOCADO"]
					
					if(!(saldoAloc=="" || saldoAloc==null || saldoAloc==undefined || saldoAloc=="null")){
					
						var saldo = $("#DIA3RECALOC___"+seqModal).val()
						console.log("saldo antes do replace "+saldo)
						saldo = saldo.replace(",",".")
						console.log("saldo depois do replace "+saldo)
						saldo = parseFloat(saldo)
						saldoAloc = parseFloat(saldoAloc)
						console.log("vou somar saldo "+saldo+" e saldoAlocado "+saldoAloc)
						
						var saldoSoma = saldo + saldoAloc
						console.log("saldo depois da soma "+saldoSoma)
						
						saldoSoma = parseFloat(saldoSoma).toFixed(2)
						saldoSoma = saldoSoma.toString()
						
						if(saldoSoma.includes(".")){
							
							saldoSoma = saldoSoma.replace(".",",")
							
						}
						
						$("#DIA3RECALOC___"+seqModal).val(saldoSoma)
					
					} /*else {
						
						$("#DIA3RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA3RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
				// SE DIA4 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia4==dataDisp){
					
					var saldoAloc = rep["SALDO_ALOCADO"]
					
					if(!(saldoAloc=="" || saldoAloc==null || saldoAloc==undefined || saldoAloc=="null")){
					
						var saldo = $("#DIA4RECALOC___"+seqModal).val()
						console.log("saldo antes do replace "+saldo)
						saldo = saldo.replace(",",".")
						console.log("saldo depois do replace "+saldo)
						saldo = parseFloat(saldo)
						saldoAloc = parseFloat(saldoAloc)
						console.log("vou somar saldo "+saldo+" e saldoAlocado "+saldoAloc)
						
						var saldoSoma = saldo + saldoAloc
						console.log("saldo depois da soma "+saldoSoma)
						
						saldoSoma = parseFloat(saldoSoma).toFixed(2)
						saldoSoma = saldoSoma.toString()
						
						if(saldoSoma.includes(".")){
							
							saldoSoma = saldoSoma.replace(".",",")
							
						}
						
						$("#DIA4RECALOC___"+seqModal).val(saldoSoma)
					
					} /*else {
						
						$("#DIA4RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA4RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
				// SE DIA5 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia5==dataDisp){
					
					var saldoAloc = rep["SALDO_ALOCADO"]
					
					if(!(saldoAloc=="" || saldoAloc==null || saldoAloc==undefined || saldoAloc=="null")){
					
						var saldo = $("#DIA5RECALOC___"+seqModal).val()
						console.log("saldo antes do replace "+saldo)
						saldo = saldo.replace(",",".")
						console.log("saldo depois do replace "+saldo)
						saldo = parseFloat(saldo)
						saldoAloc = parseFloat(saldoAloc)
						console.log("vou somar saldo "+saldo+" e saldoAlocado "+saldoAloc)
						
						var saldoSoma = saldo + saldoAloc
						console.log("saldo depois da soma "+saldoSoma)
						
						saldoSoma = parseFloat(saldoSoma).toFixed(2)
						saldoSoma = saldoSoma.toString()
						
						if(saldoSoma.includes(".")){
							
							saldoSoma = saldoSoma.replace(".",",")
							
						}
						
						$("#DIA5RECALOC___"+seqModal).val(saldoSoma)
					
					} /*else {
						
						$("#DIA5RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA5RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
				// SE DIA6 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia6==dataDisp){
					
					var saldoAloc = rep["SALDO_ALOCADO"]
					
					if(!(saldoAloc=="" || saldoAloc==null || saldoAloc==undefined || saldoAloc=="null")){
					
						var saldo = $("#DIA6RECALOC___"+seqModal).val()
						console.log("saldo antes do replace "+saldo)
						saldo = saldo.replace(",",".")
						console.log("saldo depois do replace "+saldo)
						saldo = parseFloat(saldo)
						saldoAloc = parseFloat(saldoAloc)
						console.log("vou somar saldo "+saldo+" e saldoAlocado "+saldoAloc)
						
						var saldoSoma = saldo + saldoAloc
						console.log("saldo depois da soma "+saldoSoma)
						
						saldoSoma = parseFloat(saldoSoma).toFixed(2)
						saldoSoma = saldoSoma.toString()
						
						if(saldoSoma.includes(".")){
							
							saldoSoma = saldoSoma.replace(".",",")
							
						}
						
						$("#DIA6RECALOC___"+seqModal).val(saldoSoma)
					
					} /*else {
						
						$("#DIA6RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA6RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
				// SE DIA7 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia7==dataDisp){
					
					var saldoAloc = rep["SALDO_ALOCADO"]
					
					if(!(saldoAloc=="" || saldoAloc==null || saldoAloc==undefined || saldoAloc=="null")){
					
						var saldo = $("#DIA7RECALOC___"+seqModal).val()
						console.log("saldo antes do replace "+saldo)
						saldo = saldo.replace(",",".")
						console.log("saldo depois do replace "+saldo)
						saldo = parseFloat(saldo)
						saldoAloc = parseFloat(saldoAloc)
						console.log("vou somar saldo "+saldo+" e saldoAlocado "+saldoAloc)
						
						var saldoSoma = saldo + saldoAloc
						console.log("saldo depois da soma "+saldoSoma)
						
						saldoSoma = parseFloat(saldoSoma).toFixed(2)
						saldoSoma = saldoSoma.toString()
						
						if(saldoSoma.includes(".")){
							
							saldoSoma = saldoSoma.replace(".",",")
							
						}
						
						$("#DIA7RECALOC___"+seqModal).val(saldoSoma)
					
					} /*else {
						
						$("#DIA7RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA7RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
				// SE DIA8 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia8==dataDisp){
					
					var saldoAloc = rep["SALDO_ALOCADO"]
					
					if(!(saldoAloc=="" || saldoAloc==null || saldoAloc==undefined || saldoAloc=="null")){
					
						var saldo = $("#DIA8RECALOC___"+seqModal).val()
						console.log("saldo antes do replace "+saldo)
						saldo = saldo.replace(",",".")
						console.log("saldo depois do replace "+saldo)
						saldo = parseFloat(saldo)
						saldoAloc = parseFloat(saldoAloc)
						console.log("vou somar saldo "+saldo+" e saldoAlocado "+saldoAloc)
						
						var saldoSoma = saldo + saldoAloc
						console.log("saldo depois da soma "+saldoSoma)
						
						saldoSoma = parseFloat(saldoSoma).toFixed(2)
						saldoSoma = saldoSoma.toString()
						
						if(saldoSoma.includes(".")){
							
							saldoSoma = saldoSoma.replace(".",",")
							
						}
						
						$("#DIA8RECALOC___"+seqModal).val(saldoSoma)
					
					} /*else {
						
						$("#DIA8RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA8RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
				// SE DIA9 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia9==dataDisp){
					
					var saldoAloc = rep["SALDO_ALOCADO"]
					
					if(!(saldoAloc=="" || saldoAloc==null || saldoAloc==undefined || saldoAloc=="null")){
					
						var saldo = $("#DIA9RECALOC___"+seqModal).val()
						console.log("saldo antes do replace "+saldo)
						saldo = saldo.replace(",",".")
						console.log("saldo depois do replace "+saldo)
						saldo = parseFloat(saldo)
						saldoAloc = parseFloat(saldoAloc)
						console.log("vou somar saldo "+saldo+" e saldoAlocado "+saldoAloc)
						
						var saldoSoma = saldo + saldoAloc
						console.log("saldo depois da soma "+saldoSoma)
						
						saldoSoma = parseFloat(saldoSoma).toFixed(2)
						saldoSoma = saldoSoma.toString()
						
						if(saldoSoma.includes(".")){
							
							saldoSoma = saldoSoma.replace(".",",")
							
						}
						
						$("#DIA9RECALOC___"+seqModal).val(saldoSoma)
					
					} /*else {
						
						$("#DIA9RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA9RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
				// SE DIA10 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia10==dataDisp){
					
					var saldoAloc = rep["SALDO_ALOCADO"]
					
					if(!(saldoAloc=="" || saldoAloc==null || saldoAloc==undefined || saldoAloc=="null")){
					
						var saldo = $("#DIA10RECALOC___"+seqModal).val()
						console.log("saldo antes do replace "+saldo)
						saldo = saldo.replace(",",".")
						console.log("saldo depois do replace "+saldo)
						saldo = parseFloat(saldo)
						saldoAloc = parseFloat(saldoAloc)
						console.log("vou somar saldo "+saldo+" e saldoAlocado "+saldoAloc)
						
						var saldoSoma = saldo + saldoAloc
						console.log("saldo depois da soma "+saldoSoma)
						
						saldoSoma = parseFloat(saldoSoma).toFixed(2)
						saldoSoma = saldoSoma.toString()
						
						if(saldoSoma.includes(".")){
							
							saldoSoma = saldoSoma.replace(".",",")
							
						}
						
						$("#DIA10RECALOC___"+seqModal).val(saldoSoma)
					
					} /*else {
						
						$("#DIA10RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA10RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
			} else {
				// SE NÃO
				
				console.log("Operador "+rep["CODIGO"]+" não está na tabela")
				
				var seqModal = addModalRecAlocado()
				
				console.log("Achei o operador no seq "+seqModal)
				
				$("#OPERADORRECALOCATV___"+seqModal).val(rep["NOME"])
				$("#CHAPAOPRAA___"+seqModal).val(rep["CODIGO"])
				$("#CODCOLIGADAALOCATV___"+seqModal).val(rep["CODCOLIGADA"])
				$("#CODFILIALALOCATV___"+seqModal).val(rep["CODFILIAL"])
				$("#CODMORECALOCATV___"+seqModal).val(rep["CODMO"])
				$("#CODORDEMRECALOCATV___"+seqModal).val(rep["CODORDEM"])
				$("#IDATVORDEMRECALOCATV___"+seqModal).val(rep["IDATVORDEM"])
				$("#CODESTRUTURARECALOCATV___"+seqModal).val(rep["CODESTRUTURA"])
				$("#CODATIVIDADERECALOCATV___"+seqModal).val(rep["CODATIVIDADE"])
				
				// SE TEM PLANO DE CORTE
				if(!(rep["NUMPLANOCORTE"]=="null" || rep["NUMPLANOCORTE"]==null || rep["NUMPLANOCORTE"]==undefined || rep["NUMPLANOCORTE"]=="")){
					
					$("#PLANOCORTECALOCATV___"+seqModal).val(rep["NUMPLANOCORTE"])
					
				} else {
					// SE NÃO 
					
					$("#PLANOCORTECALOCATV___"+seqModal).val(" - ")
					
				}
				
				$("#DIA1RECALOCATV___"+seqModal).val(dia1)
				$("#DIA2RECALOCATV___"+seqModal).val(dia2)
				$("#DIA3RECALOCATV___"+seqModal).val(dia3)
				$("#DIA4RECALOCATV___"+seqModal).val(dia4)
				$("#DIA5RECALOCATV___"+seqModal).val(dia5)
				$("#DIA6RECALOCATV___"+seqModal).val(dia6)
				$("#DIA7RECALOCATV___"+seqModal).val(dia7)
				$("#DIA8RECALOCATV___"+seqModal).val(dia8)
				$("#DIA9RECALOCATV___"+seqModal).val(dia9)
				$("#DIA10RECALOCATV___"+seqModal).val(dia10)
				
				var dataProg = rep["DTHRINICIAL"]
				dataProg = dataProg.split(" ")
				dataProg = dataProg[0]
				
				console.log("dia1: "+dia1+", dia2: "+dia2+", dia3: "+dia3+", dia4: "+dia4+", dia5: "+dia5+", dia6: "+dia6+
						", dia7: "+dia7+", dia8: "+dia8+", dia9: "+dia9+", dia10: "+dia10)
				
				console.log("dataProg: "+dataProg)
				
				// SE DIA1 É IGUAL A DATA PROGRAMADA
				if(dia1==dataProg){
					
					var saldoAlocado = rep["SALDO_ALOCADO"]
					
					if(!(saldoAlocado=="" || saldoAlocado==null || saldoAlocado==undefined || saldoAlocado=="null")){
						
						saldoAlocado = parseFloat(saldoAlocado)
						saldoAlocado = saldoAlocado.toFixed(2)
						saldoAlocado = saldoAlocado.toString()
						
						if(saldoAlocado.includes(".")){
							
							saldoAlocado = saldoAlocado.replace(".",",")
							
						}
	
						console.log("saldoAlocado principal: "+saldoAlocado)
						
						$("#DIA1RECALOC___"+seqModal).val(saldoAlocado)
						
					} else {
		
						console.log("saldoAlocado do 0: "+saldoAlocado)
							
						$("#DIA1RECALOC___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA1RECALOC___"+seqModal).val(0)
					
				}
				
				// SE DIA2 É IGUAL A DATA PROGRAMADA
				if(dia2==dataProg){

					var saldoAlocado = rep["SALDO_ALOCADO"]
					
					if(!(saldoAlocado=="" || saldoAlocado==null || saldoAlocado==undefined || saldoAlocado=="null")){
						
						saldoAlocado = parseFloat(saldoAlocado)
						saldoAlocado = saldoAlocado.toFixed(2)
						saldoAlocado = saldoAlocado.toString()
						
						if(saldoAlocado.includes(".")){
							
							saldoAlocado = saldoAlocado.replace(".",",")
							
						}
						
						console.log("saldoAlocado: "+saldoAlocado)
						
						$("#DIA2RECALOC___"+seqModal).val(saldoAlocado)
					
					} else {
						
						console.log("saldoAlocado: "+saldoAlocado)
						
						$("#DIA2RECALOC___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA2RECALOC___"+seqModal).val(0)
					
				}
				
				// SE DIA3 É IGUAL A DATA PROGRAMADA
				if(dia3==dataProg){
					
					var saldoAlocado = rep["SALDO_ALOCADO"]
					
					if(!(saldoAlocado=="" || saldoAlocado==null || saldoAlocado==undefined || saldoAlocado=="null")){
						
						saldoAlocado = parseFloat(saldoAlocado)
						saldoAlocado = saldoAlocado.toFixed(2)
						saldoAlocado = saldoAlocado.toString()
						
						if(saldoAlocado.includes(".")){
							
							saldoAlocado = saldoAlocado.replace(".",",")
							
						}
						
						console.log("saldoAlocado: "+saldoAlocado)
						
						$("#DIA3RECALOC___"+seqModal).val(saldoAlocado)
					
					} else {
						
						console.log("saldoAlocado: "+saldoAlocado)
						
						$("#DIA3RECALOC___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA3RECALOC___"+seqModal).val(0)
					
				}
				
				// SE DIA4 É IGUAL A DATA PROGRAMADA
				if(dia4==dataProg){
					
					var saldoAlocado = rep["SALDO_ALOCADO"]
					
					if(!(saldoAlocado=="" || saldoAlocado==null || saldoAlocado==undefined || saldoAlocado=="null")){
					
						saldoAlocado = parseFloat(saldoAlocado)
						saldoAlocado = saldoAlocado.toFixed(2)
						saldoAlocado = saldoAlocado.toString()
						
						if(saldoAlocado.includes(".")){
							
							saldoAlocado = saldoAlocado.replace(".",",")
							
						}
						
						console.log("saldoAlocado: "+saldoAlocado)
						
						$("#DIA4RECALOC___"+seqModal).val(saldoAlocado)
					
					} else {
						
						console.log("saldoAlocado: "+saldoAlocado)
						
						$("#DIA4RECALOC___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA4RECALOC___"+seqModal).val(0)
					
				}
				
				// SE DIA5 É IGUAL A DATA PROGRAMADA
				if(dia5==dataProg){
					
					var saldoAlocado = rep["SALDO_ALOCADO"]
					
					if(!(saldoAlocado=="" || saldoAlocado==null || saldoAlocado==undefined || saldoAlocado=="null")){
						
						saldoAlocado = parseFloat(saldoAlocado)
						saldoAlocado = saldoAlocado.toFixed(2)
						saldoAlocado = saldoAlocado.toString()
						
						if(saldoAlocado.includes(".")){
							
							saldoAlocado = saldoAlocado.replace(".",",")
							
						}

						console.log("saldoAlocado: "+saldoAlocado)
						
						$("#DIA5RECALOC___"+seqModal).val(saldoAlocado)
					
					} else {
						
						console.log("saldoAlocado: "+saldoAlocado)
						
						$("#DIA5RECALOC___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA5RECALOC___"+seqModal).val(0)
					
				}
				
				// SE DIA6 É IGUAL A DATA PROGRAMADA
				if(dia6==dataProg){
					
					var saldoAlocado = rep["SALDO_ALOCADO"]
					
					if(!(saldoAlocado=="" || saldoAlocado==null || saldoAlocado==undefined || saldoAlocado=="null")){
						
						saldoAlocado = parseFloat(saldoAlocado)
						saldoAlocado = saldoAlocado.toFixed(2)
						saldoAlocado = saldoAlocado.toString()
						
						if(saldoAlocado.includes(".")){
							
							saldoAlocado = saldoAlocado.replace(".",",")
							
						}
						
						console.log("saldoAlocado: "+saldoAlocado)
						
						$("#DIA6RECALOC___"+seqModal).val(saldoAlocado)
					
					} else {
						
						console.log("saldoAlocado: "+saldoAlocado)
						
						$("#DIA6RECALOC___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA6RECALOC___"+seqModal).val(0)
					
				}
				
				// SE DIA7 É IGUAL A DATA PROGRAMADA
				if(dia7==dataProg){
					
					var saldoAlocado = rep["SALDO_ALOCADO"]
					
					if(!(saldoAlocado=="" || saldoAlocado==null || saldoAlocado==undefined || saldoAlocado=="null")){
						
						saldoAlocado = parseFloat(saldoAlocado)
						saldoAlocado = saldoAlocado.toFixed(2)
						saldoAlocado = saldoAlocado.toString()
						
						if(saldoAlocado.includes(".")){
							
							saldoAlocado = saldoAlocado.replace(".",",")
							
						}
						
						console.log("saldoAlocado: "+saldoAlocado)
						
						$("#DIA7RECALOC___"+seqModal).val(saldoAlocado)
					
					} else {
						
						console.log("saldoAlocado: "+saldoAlocado)
						
						$("#DIA7RECALOC___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA7RECALOC___"+seqModal).val(0)
					
				}
				
				// SE DIA8 É IGUAL A DATA PROGRAMADA
				if(dia8==dataProg){
					
					var saldoAlocado = rep["SALDO_ALOCADO"]
					
					if(!(saldoAlocado=="" || saldoAlocado==null || saldoAlocado==undefined || saldoAlocado=="null")){
					
						saldoAlocado = parseFloat(saldoAlocado)
						saldoAlocado = saldoAlocado.toFixed(2)
						saldoAlocado = saldoAlocado.toString()
						
						if(saldoAlocado.includes(".")){
							
							saldoAlocado = saldoAlocado.replace(".",",")
							
						}
						
						console.log("saldoAlocado principal: "+saldoAlocado)
						
						$("#DIA8RECALOC___"+seqModal).val(saldoAlocado)
					
					} else {
						
						console.log("saldoAlocado do 0: "+saldoAlocado)
						
						$("#DIA8RECALOC___"+seqModal).val(0)
						
					}
					
				} else {
				
					console.log("saldoAlocado: "+saldoAlocado)
					
					$("#DIA8RECALOC___"+seqModal).val(0)
					
				}
				
				// SE DIA9 É IGUAL A DATA PROGRAMADA
				if(dia9==dataProg){
					
					var saldoAlocado = rep["SALDO_ALOCADO"]
					
					if(!(saldoAlocado=="" || saldoAlocado==null || saldoAlocado==undefined || saldoAlocado=="null")){
						
						saldoAlocado = parseFloat(saldoAlocado)
						saldoAlocado = saldoAlocado.toFixed(2)
						saldoAlocado = saldoAlocado.toString()
						
						if(saldoAlocado.includes(".")){
							
							saldoAlocado = saldoAlocado.replace(".",",")
							
						}
						
						$("#DIA9RECALOC___"+seqModal).val(saldoAlocado)
					
					} else {
						
						$("#DIA9RECALOC___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA9RECALOC___"+seqModal).val(0)
					
				}
				
				// SE DIA10 É IGUAL A DATA PROGRAMADA
				if(dia10==dataProg){
					
					var saldoAlocado = rep["SALDO_ALOCADO"]
					
					if(!(saldoAlocado=="" || saldoAlocado==null || saldoAlocado==undefined || saldoAlocado=="null")){
						
						saldoAlocado = parseFloat(saldoAlocado)
						saldoAlocado = saldoAlocado.toFixed(2)
						saldoAlocado = saldoAlocado.toString()
						
						if(saldoAlocado.includes(".")){
							
							saldoAlocado = saldoAlocado.replace(".",",")
							
						}
						
						$("#DIA10RECALOC___"+seqModal).val(saldoAlocado)
					
					} else {
						
						$("#DIA10RECALOC___"+seqModal).val(0)
						
					} 
					
				} else {
					
					$("#DIA10RECALOC___"+seqModal).val(0)
					
				}
				
			}
			
		}
		
		// CALCULA SOMA DOS RECURSOS ALOCADOS
		calculaSomaRecAlocAtv(rowSoma)
		
		// EXIBE CLASSE VISÍVEL DOS RECURSOS ALOCADOS
		exibeClasseVisivelRecAloc()
		
	},500)
	
	// DESATIVA O LOAD
	setTimeout(function(){
		
		myLoading2.hide();
		$("#ICONREDUZIR").click()
		
	}, 500)
	
}

// COLOCA A CLASSE VISIVEL DA TABELA DE SOMA DE ACORDO COM A TABELA DE RECURSO ALOCADO
function classeVisivelSomaRecAlocAtv(row){
	
	// PERCORRE TODOS OS REGISTROS DA TABELA DE RECURSOS ALOCADOS A ATIVIDADE
	//$("input[id^='OPERADORRECALOCATV___']").each(function(index,value){
	
		//var seq = $(this).attr("id").split("___")[1]
	
		if($("#THDIA1RECALOC").hasClass("visivel")){
			
			$("#SOMARECAD1___"+row).addClass("visivel")
			
		} 
		if($("#THDIA2RECALOC").hasClass("visivel")){
			
			$("#SOMARECAD2___"+row).addClass("visivel")
			
		}
		if($("#THDIA3RECALOC").hasClass("visivel")){
			
			$("#SOMARECAD3___"+row).addClass("visivel")
			
		}
		if($("#THDIA4RECALOC").hasClass("visivel")){
			
			$("#SOMARECAD4___"+row).addClass("visivel")
			
		}
		if($("#THDIA5RECALOC").hasClass("visivel")){
			
			$("#SOMARECAD5___"+row).addClass("visivel")
			
		}
		if($("#THDIA6RECALOC").hasClass("visivel")){
			
			$("#SOMARECAD6___"+row).addClass("visivel")
			
		}
		if($("#THDIA7RECALOC").hasClass("visivel")){
			
			$("#SOMARECAD7___"+row).addClass("visivel")
			
		}
		if($("#THDIA8RECALOC").hasClass("visivel")){
			
			$("#SOMARECAD8___"+row).addClass("visivel")
			
		}
		if($("#THDIA9RECALOC").hasClass("visivel")){
			
			$("#SOMARECAD9___"+row).addClass("visivel")
			
		}
		if($("#THDIA10RECALOC").hasClass("visivel")){
			
			$("#SOMARECAD10___"+row).addClass("visivel")
			
		}
		
	//})
	
}

// COLOCA A CLASSE VISIVEL DA TABELA DE SOMA DE ACORDO COM A TABELA DE RECURSO ALOCADO
function classeVisivelSomaRecAptoDisp(row){
	
	// PERCORRE TODOS OS REGISTROS DA TABELA DE RECURSOS ALOCADOS A ATIVIDADE
	//$("input[id^='OPERADORRECAPTOSDISPATV___']").each(function(index,value){
	
	//	var seq = $(this).attr("id").split("___")[1]
	
		if($("#THDIA1RECAPTDISP").hasClass("visivel")){
			
			$("#SOMARECAPDISPD1___"+row).addClass("visivel")
			
		}
		if($("#THDIA2RECAPTDISP").hasClass("visivel")){
			
			$("#SOMARECAPDISPD2___"+row).addClass("visivel")
			
		}
		if($("#THDIA3RECAPTDISP").hasClass("visivel")){
			
			$("#SOMARECAPDISPD3___"+row).addClass("visivel")
			
		}
		if($("#THDIA4RECAPTDISP").hasClass("visivel")){
			
			$("#SOMARECAPDISPD4___"+row).addClass("visivel")
			
		}
		if($("#THDIA5RECAPTDISP").hasClass("visivel")){
			
			$("#SOMARECAPDISPD5___"+row).addClass("visivel")
			
		}
		if($("#THDIA6RECAPTDISP").hasClass("visivel")){
			
			$("#SOMARECAPDISPD6___"+row).addClass("visivel")
			
		}
		if($("#THDIA7RECAPTDISP").hasClass("visivel")){
			
			$("#SOMARECAPDISPD7___"+row).addClass("visivel")
			
		}
		if($("#THDIA8RECAPTDISP").hasClass("visivel")){
			
			$("#SOMARECAPDISPD8___"+row).addClass("visivel")
			
		}
		if($("#THDIA9RECAPTDISP").hasClass("visivel")){
			
			$("#SOMARECAPDISPD9___"+row).addClass("visivel")
			
		}
		if($("#THDIA10RECAPTDISP").hasClass("visivel")){
			
			$("#SOMARECAPDISPD10___"+row).addClass("visivel")
			
		}
		
	//})
	
}

// COLOCA A CLASSE VISIVEL DA TABELA DE SOMA DE ACORDO COM A TABELA DE RECURSO ALOCADO
function classeVisivelSomaAlocacao(row){
	
	// PERCORRE TODOS OS REGISTROS DA TABELA DE RECURSOS ALOCADOS A ATIVIDADE
	//$("input[id^='OSALOC___']").each(function(index,value){
	
		//var seq = $(this).attr("id").split("___")[1]
	
		if($("#THDIA1ALOC").hasClass("visivel")){
			
			$("#SOMAALOCD1___"+row).addClass("visivel")
			
		}
		if($("#THDIA2ALOC").hasClass("visivel")){
			
			$("#SOMAALOCD2___"+row).addClass("visivel")
			
		}
		if($("#THDIA3ALOC").hasClass("visivel")){
			
			$("#SOMAALOCD3___"+row).addClass("visivel")
			
		}
		if($("#THDIA4ALOC").hasClass("visivel")){
			
			$("#SOMAALOCD4___"+row).addClass("visivel")
			
		}
		if($("#THDIA5ALOC").hasClass("visivel")){
			
			$("#SOMAALOCD5___"+row).addClass("visivel")
			
		}
		if($("#THDIA6ALOC").hasClass("visivel")){
			
			$("#SOMAALOCD6___"+row).addClass("visivel")
			
		}
		if($("#THDIA7ALOC").hasClass("visivel")){
			
			$("#SOMAALOCD7___"+row).addClass("visivel")
			
		}
		if($("#THDIA8ALOC").hasClass("visivel")){
			
			$("#SOMAALOCD8___"+row).addClass("visivel")
			
		}
		if($("#THDIA9ALOC").hasClass("visivel")){
			
			$("#SOMAALOCD9___"+row).addClass("visivel")
			
		}
		if($("#THDIA10ALOC").hasClass("visivel")){
			
			$("#SOMAALOCD10___"+row).addClass("visivel")
			
		}
		
	//})
	
}

// CALCULA SOMA DOS RECURSOS ALOCADOS A ATIVIDADE
function calculaSomaRecAlocAtv(row){
	
	var somaDia1 = 0, dia1
	var somaDia2 = 0, dia2
	var somaDia3 = 0, dia3
	var somaDia4 = 0, dia4
	var somaDia5 = 0, dia5
	var somaDia6 = 0, dia6
	var somaDia7 = 0, dia7
	var somaDia8 = 0, dia8
	var somaDia9 = 0, dia9
	var somaDia10 = 0, dia10
	
	// COLOCA A CLASSE VISIVEL DA TABELA DE SOMA DE ACORDO COM A TABELA DE RECURSO ALOCADO
	classeVisivelSomaRecAlocAtv(row)
	
	// PERCORRE TODOS OS REGISTROS DA TABELA DE RECURSOS ALOCADOS A ATIVIDADE
	$("input[id^='OPERADORRECALOCATV___']").each(function(index,value){
	
		var seq = $(this).attr("id").split("___")[1]
		
		dia1 = $("#DIA1RECALOC___"+seq).val()
	
		// SE VALOR NÃO É NULO OU VAZIO
		if(!(dia1=="" || dia1==null || dia1==undefined)){
			
			dia1 = dia1.replace(",",".")
			
			dia1 = parseFloat(dia1)
						
		} else {
			
			dia1 = 0

		}
		somaDia1 = somaDia1 + dia1
		
		dia2 = $("#DIA2RECALOC___"+seq).val()
		
		// SE VALOR NÃO É NULO OU VAZIO
		if(!(dia2=="" || dia2==null || dia2==undefined)){
			
			dia2 = dia2.replace(",",".")
			dia2 = parseFloat(dia2)
			
		} else {
			
			dia2 = 0
			
		}
		somaDia2 = somaDia2 + dia2

		dia3 = $("#DIA3RECALOC___"+seq).val()
		
		// SE VALOR NÃO É NULO OU VAZIO
		if(!(dia3=="" || dia3==null || dia3==undefined)){
			
			dia3 = dia3.replace(",",".")
			dia3 = parseFloat(dia3)
			
		} else {
			
			dia3 = 0
			
		}
		somaDia3 = somaDia3 + dia3
		
		dia4 = $("#DIA4RECALOC___"+seq).val()
		
		// SE VALOR NÃO É NULO OU VAZIO
		if(!(dia4=="" || dia4==null || dia4==undefined)){
			
			dia4 = dia4.replace(",",".")
			dia4 = parseFloat(dia4)
			
		} else {
			
			dia4 = 0
			
		}
		somaDia4 = somaDia4 + dia4
		
		dia5 = $("#DIA5RECALOC___"+seq).val()
		
		// SE VALOR NÃO É NULO OU VAZIO
		if(!(dia5=="" || dia5==null || dia5==undefined)){
			
			dia5 = dia5.replace(",",".")
			dia5 = parseFloat(dia5)
			
		} else {
			
			dia5 = 0
			
		}
		somaDia5 = somaDia5 + dia5
		
		dia6 = $("#DIA6RECALOC___"+seq).val()
		
		// SE VALOR NÃO É NULO OU VAZIO
		if(!(dia6=="" || dia6==null || dia6==undefined)){
			
			dia6 = dia6.replace(",",".")
			dia6 = parseFloat(dia6)
			
		} else {
			
			dia6 = 0
			
		}
		somaDia6 = somaDia6 + dia6
		
		dia7 = $("#DIA7RECALOC___"+seq).val()
		
		// SE VALOR NÃO É NULO OU VAZIO
		if(!(dia7=="" || dia7==null || dia7==undefined)){
			
			dia7 = dia7.replace(",",".")
			dia7 = parseFloat(dia7)	
			
		} else {
			
			dia7 = 0
			
		}
		somaDia7 = somaDia7 + dia7
		
		dia8 = $("#DIA8RECALOC___"+seq).val()
		
		// SE VALOR NÃO É NULO OU VAZIO
		if(!(dia8=="" || dia8==null || dia8==undefined)){
			
			dia8 = dia8.replace(",",".")
			dia8 = parseFloat(dia8)
			
		} else {
			
			dia8 = 0
			
		}
		somaDia8 = somaDia8 + dia8
		
		dia9 = $("#DIA9RECALOC___"+seq).val()
		
		// SE VALOR NÃO É NULO OU VAZIO
		if(!(dia9=="" || dia9==null || dia9==undefined)){
			
			dia9 = dia9.replace(",",".")
			dia9 = parseFloat(dia9)
			
		} else {
			
			dia9 = 0
			
		}
		somaDia9 = somaDia9 + dia9
		
		dia10 = $("#DIA10RECALOC___"+seq).val()
		
		// SE VALOR NÃO É NULO OU VAZIO
		if(!(dia10=="" || dia10==null || dia10==undefined)){
			
			dia10 = dia10.replace(",",".")
			dia10 = parseFloat(dia10)	
			
		} else {
			
			dia10 = 0
			
		}
		somaDia10 = somaDia10 + dia10
		
	})
	
	// ADICIONA LINHA PARA O RESULTADO DA SOMA DOS RECURSOS ALOCADOS
	//var row = addSomaRecAloc()
	
	somaDia1 = somaDia1.toFixed(2).toString().replace(".",",")
	somaDia2 = somaDia2.toFixed(2).toString().replace(".",",")
	somaDia3 = somaDia3.toFixed(2).toString().replace(".",",")
	somaDia4 = somaDia4.toFixed(2).toString().replace(".",",")
	somaDia5 = somaDia5.toFixed(2).toString().replace(".",",")
	somaDia6 = somaDia6.toFixed(2).toString().replace(".",",")
	somaDia7 = somaDia7.toFixed(2).toString().replace(".",",")
	somaDia8 = somaDia8.toFixed(2).toString().replace(".",",")
	somaDia9 = somaDia9.toFixed(2).toString().replace(".",",")
	somaDia10 = somaDia10.toFixed(2).toString().replace(".",",")

	// SALVA OS VALORES DAS SOMAS
	$("#SOMADIA1RECALOCATV___"+row).val(somaDia1)
	$("#SOMADIA2RECALOCATV___"+row).val(somaDia2)
	$("#SOMADIA3RECALOCATV___"+row).val(somaDia3)
	$("#SOMADIA4RECALOCATV___"+row).val(somaDia4)
	$("#SOMADIA5RECALOCATV___"+row).val(somaDia5)
	$("#SOMADIA6RECALOCATV___"+row).val(somaDia6)
	$("#SOMADIA7RECALOCATV___"+row).val(somaDia7)
	$("#SOMADIA8RECALOCATV___"+row).val(somaDia8)
	$("#SOMADIA9RECALOCATV___"+row).val(somaDia9)
	$("#SOMADIA10RECALOCATV___"+row).val(somaDia10)
	
	// EXIBE A CLASSE VISIVEL E ESCONDE OS DEMAIS 
	exibeClasseVisivelSomaRecAloc(row)
	
}

// CALCULA SOMA DOS SALDOS DOS RECURSOS APTOS DISPONÍVEIS A ATIVIDADE
function calculaSomaRecAptosDisp(row){
	
	console.log("vou calcular a soma dos recursos aptos disponíveis")
	
	var somaDia1 = 0, dia1
	var somaDia2 = 0, dia2
	var somaDia3 = 0, dia3
	var somaDia4 = 0, dia4
	var somaDia5 = 0, dia5
	var somaDia6 = 0, dia6
	var somaDia7 = 0, dia7
	var somaDia8 = 0, dia8
	var somaDia9 = 0, dia9
	var somaDia10 = 0, dia10
	
	// COLOCA A CLASSE VISIVEL DA TABELA DE SOMA DE ACORDO COM A TABELA DE RECURSO ALOCADO
	classeVisivelSomaRecAptoDisp(row)
	
	// PERCORRE TODOS OS REGISTROS DA TABELA DE RECURSOS ALOCADOS A ATIVIDADE
	$("input[id^='OPERADORRECAPTOSDISPATV___']").each(function(index,value){
	
		var seq = $(this).attr("id").split("___")[1]
		
		dia1 = $("#DIA1RECAPTOSDISPATV___"+seq).val()
		console.log("dia1: "+dia1)
		
		// SE VALOR NÃO É NULO OU VAZIO
		if(!(dia1=="" || dia1==null || dia1==undefined)){
			
			if(dia1.includes(",")){
				
				dia1 = dia1.replace(",",".")	
				
			}
			
			dia1 = parseFloat(dia1)
						
		} else {
			
			dia1 = 0

		}
		somaDia1 = somaDia1 + dia1
		
		dia2 = $("#DIA2RECAPTOSDISPATV___"+seq).val()
		console.log("dia2: "+dia2)
		
		// SE VALOR NÃO É NULO OU VAZIO
		if(!(dia2=="" || dia2==null || dia2==undefined)){
			
			if(dia2.includes(",")){
				
				dia2 = dia2.replace(",",".")	
				
			}

			dia2 = parseFloat(dia2)
			
		} else {
			
			dia2 = 0
			
		}
		somaDia2 = somaDia2 + dia2

		dia3 = $("#DIA3RECAPTOSDISPATV___"+seq).val()
		console.log("dia3: "+dia3)
		
		// SE VALOR NÃO É NULO OU VAZIO
		if(!(dia3=="" || dia3==null || dia3==undefined)){
			
			if(dia3.includes(",")){
				
				dia3 = dia3.replace(",",".")	
				
			}

			dia3 = parseFloat(dia3)
			
		} else {
			
			dia3 = 0
			
		}
		somaDia3 = somaDia3 + dia3
		
		dia4 = $("#DIA4RECAPTOSDISPATV___"+seq).val()
		console.log("dia4: "+dia4)
		
		// SE VALOR NÃO É NULO OU VAZIO
		if(!(dia4=="" || dia4==null || dia4==undefined)){
			
			if(dia4.includes(",")){
				
				dia4 = dia4.replace(",",".")	
				
			}

			dia4 = parseFloat(dia4)
			
		} else {
			
			dia4 = 0
			
		}
		somaDia4 = somaDia4 + dia4
		
		dia5 = $("#DIA5RECAPTOSDISPATV___"+seq).val()
		console.log("dia5: "+dia5)
		
		// SE VALOR NÃO É NULO OU VAZIO
		if(!(dia5=="" || dia5==null || dia5==undefined)){
			
			if(dia5.includes(",")){
				
				dia5 = dia5.replace(",",".")	
				
			}

			dia5 = parseFloat(dia5)
			
		} else {
			
			dia5 = 0
			
		}
		somaDia5 = somaDia5 + dia5
		
		dia6 = $("#DIA6RECAPTOSDISPATV___"+seq).val()
		console.log("dia6: "+dia6)
		
		// SE VALOR NÃO É NULO OU VAZIO
		if(!(dia6=="" || dia6==null || dia6==undefined)){
			
			if(dia6.includes(",")){
				
				dia6 = dia6.replace(",",".")	
				
			}

			dia6 = parseFloat(dia6)
			
		} else {
			
			dia6 = 0
			
		}
		somaDia6 = somaDia6 + dia6
		
		dia7 = $("#DIA7RECAPTOSDISPATV___"+seq).val()
		console.log("dia7: "+dia7)
		
		// SE VALOR NÃO É NULO OU VAZIO
		if(!(dia7=="" || dia7==null || dia7==undefined)){
			
			if(dia7.includes(",")){
				
				dia7 = dia7.replace(",",".")	
				
			}

			dia7 = parseFloat(dia7)	
			
		} else {
			
			dia7 = 0
			
		}
		somaDia7 = somaDia7 + dia7
		
		dia8 = $("#DIA8RECAPTOSDISPATV___"+seq).val()
		console.log("dia8: "+dia8)
		
		// SE VALOR NÃO É NULO OU VAZIO
		if(!(dia8=="" || dia8==null || dia8==undefined)){
			
			if(dia8.includes(",")){
				
				dia8 = dia8.replace(",",".")	
				
			}

			dia8 = parseFloat(dia8)
			
		} else {
			
			dia8 = 0
			
		}
		somaDia8 = somaDia8 + dia8
		
		dia9 = $("#DIA9RECAPTOSDISPATV___"+seq).val()
		console.log("dia9: "+dia9)
		
		// SE VALOR NÃO É NULO OU VAZIO
		if(!(dia9=="" || dia9==null || dia9==undefined)){
			
			if(dia9.includes(",")){
				
				dia9 = dia9.replace(",",".")	
				
			}

			dia9 = parseFloat(dia9)
			
		} else {
			
			dia9 = 0
			
		}
		somaDia9 = somaDia9 + dia9
		
		dia10 = $("#DIA10RECAPTOSDISPATV___"+seq).val()
		console.log("dia10: "+dia10)
		
		// SE VALOR NÃO É NULO OU VAZIO
		if(!(dia10=="" || dia10==null || dia10==undefined)){
			
			if(dia10.includes(",")){
				
				dia10 = dia10.replace(",",".")	
				
			}

			dia10 = parseFloat(dia10)	
			
		} else {
			
			dia10 = 0
			
		}
		somaDia10 = somaDia10 + dia10
		
	})
	
	// ADICIONA LINHA PARA O RESULTADO DA SOMA DOS RECURSOS ALOCADOS
	//var row = addSomaRecAloc()
	
	somaDia1 = somaDia1.toFixed(2).toString().replace(".",",")
	somaDia2 = somaDia2.toFixed(2).toString().replace(".",",")
	somaDia3 = somaDia3.toFixed(2).toString().replace(".",",")
	somaDia4 = somaDia4.toFixed(2).toString().replace(".",",")
	somaDia5 = somaDia5.toFixed(2).toString().replace(".",",")
	somaDia6 = somaDia6.toFixed(2).toString().replace(".",",")
	somaDia7 = somaDia7.toFixed(2).toString().replace(".",",")
	somaDia8 = somaDia8.toFixed(2).toString().replace(".",",")
	somaDia9 = somaDia9.toFixed(2).toString().replace(".",",")
	somaDia10 = somaDia10.toFixed(2).toString().replace(".",",")
	
	// SALVA OS VALORES DAS SOMAS
	$("#SOMADIA1RECAPTOSDISPATV___"+row).val(somaDia1)
	$("#SOMADIA2RECAPTOSDISPATV___"+row).val(somaDia2)
	$("#SOMADIA3RECAPTOSDISPATV___"+row).val(somaDia3)
	$("#SOMADIA4RECAPTOSDISPATV___"+row).val(somaDia4)
	$("#SOMADIA5RECAPTOSDISPATV___"+row).val(somaDia5)
	$("#SOMADIA6RECAPTOSDISPATV___"+row).val(somaDia6)
	$("#SOMADIA7RECAPTOSDISPATV___"+row).val(somaDia7)
	$("#SOMADIA8RECAPTOSDISPATV___"+row).val(somaDia8)
	$("#SOMADIA9RECAPTOSDISPATV___"+row).val(somaDia9)
	$("#SOMADIA10RECAPTOSDISPATV___"+row).val(somaDia10)
	
	// EXIBE A CLASSE VISIVEL E ESCONDE OS DEMAIS 
	exibeClasseVisivelSomaRecAptoDisp(row)
	
}

// CALCULA SOMA DOS SALDOS DOS RECURSOS APTOS DISPONÍVEIS A ATIVIDADE
/*function calculaRAD(row){
	
	console.log("vou calcular a soma dos recursos aptos disponíveis")
	
	var somaDia1 = 0, dia1
	var somaDia2 = 0, dia2
	var somaDia3 = 0, dia3
	var somaDia4 = 0, dia4
	var somaDia5 = 0, dia5
	var somaDia6 = 0, dia6
	var somaDia7 = 0, dia7
	var somaDia8 = 0, dia8
	var somaDia9 = 0, dia9
	var somaDia10 = 0, dia10
	
	// PERCORRE TODOS OS REGISTROS DA TABELA DE RECURSOS ALOCADOS A ATIVIDADE
	$("input[id^='OPERADORRAD___']").each(function(index,value){
	
		var seq = $(this).attr("id").split("___")[1]
		
		dia1 = $("#DIA1RAD___"+seq).val()
		console.log("dia1: "+dia1)
		
		// SE VALOR NÃO É NULO OU VAZIO
		if(!(dia1=="" || dia1==null || dia1==undefined)){
			
			dia1 = parseFloat(dia1)
						
		} else {
			
			dia1 = 0

		}
		somaDia1 = somaDia1 + dia1
		
		dia2 = $("#DIA2RAD___"+seq).val()
		console.log("dia2: "+dia2)
		
		// SE VALOR NÃO É NULO OU VAZIO
		if(!(dia2=="" || dia2==null || dia2==undefined)){
			
			dia2 = parseFloat(dia2)
			
		} else {
			
			dia2 = 0
			
		}
		somaDia2 = somaDia2 + dia2

		dia3 = $("#DIA3RAD___"+seq).val()
		console.log("dia3: "+dia3)
		
		// SE VALOR NÃO É NULO OU VAZIO
		if(!(dia3=="" || dia3==null || dia3==undefined)){
			
			dia3 = parseFloat(dia3)
			
		} else {
			
			dia3 = 0
			
		}
		somaDia3 = somaDia3 + dia3
		
		dia4 = $("#DIA4RAD___"+seq).val()
		console.log("dia4: "+dia4)
		
		// SE VALOR NÃO É NULO OU VAZIO
		if(!(dia4=="" || dia4==null || dia4==undefined)){
			
			dia4 = parseFloat(dia4)
			
		} else {
			
			dia4 = 0
			
		}
		somaDia4 = somaDia4 + dia4
		
		dia5 = $("#DIA5RAD___"+seq).val()
		console.log("dia5: "+dia5)
		
		// SE VALOR NÃO É NULO OU VAZIO
		if(!(dia5=="" || dia5==null || dia5==undefined)){
			
			dia5 = parseFloat(dia5)
			
		} else {
			
			dia5 = 0
			
		}
		somaDia5 = somaDia5 + dia5
		
		dia6 = $("#DIA6RAD___"+seq).val()
		console.log("dia6: "+dia6)
		
		// SE VALOR NÃO É NULO OU VAZIO
		if(!(dia6=="" || dia6==null || dia6==undefined)){
			
			dia6 = parseFloat(dia6)
			
		} else {
			
			dia6 = 0
			
		}
		somaDia6 = somaDia6 + dia6
		
		dia7 = $("#DIA7RAD___"+seq).val()
		console.log("dia7: "+dia7)
		
		// SE VALOR NÃO É NULO OU VAZIO
		if(!(dia7=="" || dia7==null || dia7==undefined)){
			
			dia7 = parseFloat(dia7)	
			
		} else {
			
			dia7 = 0
			
		}
		somaDia7 = somaDia7 + dia7
		
		dia8 = $("#DIA8RAD___"+seq).val()
		console.log("dia8: "+dia8)
		
		// SE VALOR NÃO É NULO OU VAZIO
		if(!(dia8=="" || dia8==null || dia8==undefined)){
			
			dia8 = parseFloat(dia8)
			
		} else {
			
			dia8 = 0
			
		}
		somaDia8 = somaDia8 + dia8
		
		dia9 = $("#DIA9RAD___"+seq).val()
		console.log("dia9: "+dia9)
		
		// SE VALOR NÃO É NULO OU VAZIO
		if(!(dia9=="" || dia9==null || dia9==undefined)){
			
			dia9 = parseFloat(dia9)
			
		} else {
			
			dia9 = 0
			
		}
		somaDia9 = somaDia9 + dia9
		
		dia10 = $("#DIA10RAD___"+seq).val()
		console.log("dia10: "+dia10)
		
		// SE VALOR NÃO É NULO OU VAZIO
		if(!(dia10=="" || dia10==null || dia10==undefined)){
			
			dia10 = parseFloat(dia10)	
			
		} else {
			
			dia10 = 0
			
		}
		somaDia10 = somaDia10 + dia10
		
	})
	
	// SALVA OS VALORES DAS SOMAS
	$("#SOMADIA1RECAPTOSDISPATV___"+row).val(somaDia1)
	$("#SOMADIA2RECAPTOSDISPATV___"+row).val(somaDia2)
	$("#SOMADIA3RECAPTOSDISPATV___"+row).val(somaDia3)
	$("#SOMADIA4RECAPTOSDISPATV___"+row).val(somaDia4)
	$("#SOMADIA5RECAPTOSDISPATV___"+row).val(somaDia5)
	$("#SOMADIA6RECAPTOSDISPATV___"+row).val(somaDia6)
	$("#SOMADIA7RECAPTOSDISPATV___"+row).val(somaDia7)
	$("#SOMADIA8RECAPTOSDISPATV___"+row).val(somaDia8)
	$("#SOMADIA9RECAPTOSDISPATV___"+row).val(somaDia9)
	$("#SOMADIA10RECAPTOSDISPATV___"+row).val(somaDia10)
	
}*/

// CALCULA SOMA DOS SALDOS ALOCADOS
function calculaSomaAlocacao(row){
	
	var somaDia1 = 0, dia1
	var somaDia2 = 0, dia2
	var somaDia3 = 0, dia3
	var somaDia4 = 0, dia4
	var somaDia5 = 0, dia5
	var somaDia6 = 0, dia6
	var somaDia7 = 0, dia7
	var somaDia8 = 0, dia8
	var somaDia9 = 0, dia9
	var somaDia10 = 0, dia10
	
	// COLOCA A CLASSE VISIVEL DA TABELA DE SOMA DE ACORDO COM A TABELA DE RECURSO ALOCADO
	classeVisivelSomaAlocacao(row)
	
	// PERCORRE TODOS OS REGISTROS DA TABELA DE RECURSOS ALOCADOS A ATIVIDADE
	$("input[id^='OSALOC___']").each(function(index,value){
	
		var seq = $(this).attr("id").split("___")[1]
		
		dia1 = $("#DIA1ALOC___"+seq).val()
	
		// SE VALOR NÃO É NULO OU VAZIO
		if(!(dia1=="" || dia1==null || dia1==undefined)){
			
			if(dia1.includes(",")){
				
				dia1 = dia1.replace(",",".")
				
			}
			
			dia1 = parseFloat(dia1)
						
		} else {
			
			dia1 = 0

		}
		
		somaDia1 = somaDia1 + dia1
		console.log("dia1: "+dia1+", somaDia1: "+somaDia1)
		
		dia2 = $("#DIA2ALOC___"+seq).val()
		
		// SE VALOR NÃO É NULO OU VAZIO
		if(!(dia2=="" || dia2==null || dia2==undefined)){
			
			if(dia2.includes(",")){
				
				dia2 = dia2.replace(",",".")
				
			}

			dia2 = parseFloat(dia2)
			
		} else {
			
			dia2 = 0
			
		}
		
		somaDia2 = somaDia2 + dia2
		console.log("dia2: "+dia2+", somaDia2: "+somaDia2)
		
		dia3 = $("#DIA3ALOC___"+seq).val()
		
		// SE VALOR NÃO É NULO OU VAZIO
		if(!(dia3=="" || dia3==null || dia3==undefined)){
			
			if(dia3.includes(",")){
				
				dia3 = dia3.replace(",",".")
				
			}

			dia3 = parseFloat(dia3)
			
		} else {
			
			dia3 = 0
			
		}
		
		somaDia3 = somaDia3 + dia3
		console.log("dia3: "+dia3+", somaDia3: "+somaDia3)
		
		dia4 = $("#DIA4ALOC___"+seq).val()
		
		// SE VALOR NÃO É NULO OU VAZIO
		if(!(dia4=="" || dia4==null || dia4==undefined)){
			
			if(dia4.includes(",")){
				
				dia4 = dia4.replace(",",".")
				
			}

			dia4 = parseFloat(dia4)
			
		} else {
			
			dia4 = 0
			
		}
		
		somaDia4 = somaDia4 + dia4
		console.log("dia4: "+dia4+", somaDia4: "+somaDia4)
		
		dia5 = $("#DIA5ALOC___"+seq).val()
		
		// SE VALOR NÃO É NULO OU VAZIO
		if(!(dia5=="" || dia5==null || dia5==undefined)){
			
			if(dia5.includes(",")){
				
				dia5 = dia5.replace(",",".")
				
			}

			dia5 = parseFloat(dia5)
			
		} else {
			
			dia5 = 0
			
		}
		
		somaDia5 = somaDia5 + dia5
		console.log("dia5: "+dia5+", somaDia5: "+somaDia5)
		
		dia6 = $("#DIA6ALOC___"+seq).val()
		
		// SE VALOR NÃO É NULO OU VAZIO
		if(!(dia6=="" || dia6==null || dia6==undefined)){
			
			if(dia6.includes(",")){
				
				dia6 = dia6.replace(",",".")
				
			}

			dia6 = parseFloat(dia6)
			
		} else {
			
			dia6 = 0
			
		}
		
		somaDia6 = somaDia6 + dia6
		console.log("dia6: "+dia6+", somaDia6: "+somaDia6)
		
		dia7 = $("#DIA7ALOC___"+seq).val()
		
		// SE VALOR NÃO É NULO OU VAZIO
		if(!(dia7=="" || dia7==null || dia7==undefined)){
			
			if(dia7.includes(",")){
				
				dia7 = dia7.replace(",",".")
				
			}

			dia7 = parseFloat(dia7)	
			
		} else {
			
			dia7 = 0
			
		}
		
		somaDia7 = somaDia7 + dia7
		console.log("dia7: "+dia7+", somaDia7: "+somaDia7)
		
		dia8 = $("#DIA8ALOC___"+seq).val()
		
		// SE VALOR NÃO É NULO OU VAZIO
		if(!(dia8=="" || dia8==null || dia8==undefined)){
			
			if(dia8.includes(",")){
				
				dia8 = dia8.replace(",",".")
				
			}

			dia8 = parseFloat(dia8)
			
		} else {
			
			dia8 = 0
			
		}
		
		somaDia8 = somaDia8 + dia8
		console.log("dia8: "+dia8+", somaDia8: "+somaDia8)
		
		dia9 = $("#DIA9ALOC___"+seq).val()
		
		// SE VALOR NÃO É NULO OU VAZIO
		if(!(dia9=="" || dia9==null || dia9==undefined)){
			
			if(dia9.includes(",")){
	
				dia9 = dia9.replace(",",".")
				
			}

			dia9 = parseFloat(dia9)
			
		} else {
			
			dia9 = 0
			
		}
		
		somaDia9 = somaDia9 + dia9
		console.log("dia9: "+dia9+", somaDia9: "+somaDia9)
		
		dia10 = $("#DIA10ALOC___"+seq).val()
		
		// SE VALOR NÃO É NULO OU VAZIO
		if(!(dia10=="" || dia10==null || dia10==undefined)){
			
			if(dia10.includes(",")){
				
				dia10 = dia10.replace(",",".")
				
			}

			dia10 = parseFloat(dia10)	
			
		} else {
			
			dia10 = 0
			
		}
		
		somaDia10 = somaDia10 + dia10
		console.log("dia10: "+dia10+", somaDia10: "+somaDia10)
		
	})
	
	// ADICIONA LINHA PARA O RESULTADO DA SOMA DOS RECURSOS ALOCADOS
	//var row = addSomaRecAloc()
	
	somaDia1 = somaDia1.toFixed(2).toString().replace(".",",")
	somaDia2 = somaDia2.toFixed(2).toString().replace(".",",")
	somaDia3 = somaDia3.toFixed(2).toString().replace(".",",")
	somaDia4 = somaDia4.toFixed(2).toString().replace(".",",")
	somaDia5 = somaDia5.toFixed(2).toString().replace(".",",")
	somaDia6 = somaDia6.toFixed(2).toString().replace(".",",")
	somaDia7 = somaDia7.toFixed(2).toString().replace(".",",")
	somaDia8 = somaDia8.toFixed(2).toString().replace(".",",")
	somaDia9 = somaDia9.toFixed(2).toString().replace(".",",")
	somaDia10 = somaDia10.toFixed(2).toString().replace(".",",")
	
	// SALVA OS VALORES DAS SOMAS
	$("#DIA1SOMAALOC___"+row).val(somaDia1)
	$("#DIA2SOMAALOC___"+row).val(somaDia2)
	$("#DIA3SOMAALOC___"+row).val(somaDia3)
	$("#DIA4SOMAALOC___"+row).val(somaDia4)
	$("#DIA5SOMAALOC___"+row).val(somaDia5)
	$("#DIA6SOMAALOC___"+row).val(somaDia6)
	$("#DIA7SOMAALOC___"+row).val(somaDia7)
	$("#DIA8SOMAALOC___"+row).val(somaDia8)
	$("#DIA9SOMAALOC___"+row).val(somaDia9)
	$("#DIA10SOMAALOC___"+row).val(somaDia10)
	
	// EXIBE A CLASSE VISIVEL E ESCONDE OS DEMAIS 
	exibeClasseVisivelSomaAlocacao(row)
	
}

// EXIBE A CLASSE VISIVEL E ESCONDE OS DEMAIS 
function exibeClasseVisivelSomaAlocacao(seq){
	
	for(var i=1; i<=10;i++){
		
		// PERCORRE TODOS OS REGISTROS DA TABELA
		//$("input[id^='DIA1SOMAALOC___']").each(function(){
			
			//var seq = $(this).attr("id").split("___")[1]
			
			if($("#SOMAALOCD"+i+"___"+seq).hasClass("visivel")){
				
				$("#SOMAALOCD"+i+"___"+seq).show()
				
			} else {
				
				$("#SOMAALOCD"+i+"___"+seq).hide()
				
			}
			
		//})
		
	}
	
}

// EXIBE CLASSE VISÍVEL DOS RECURSOS ALOCADOS
function exibeClasseVisivelRecAptoDisp(){
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OPERADORRECAPTOSDISPATV___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		if($("#THDIA1RECAPTDISP").hasClass("visivel")){
			
			$("#RECAPDISPD1___"+seq).show()
			
		} else {
			
			$("#RECAPDISPD1___"+seq).hide()
			
		}
		if($("#THDIA2RECAPTDISP").hasClass("visivel")){
			
			$("#RECAPDISPD2___"+seq).show()
			
		} else {
			
			$("#RECAPDISPD2___"+seq).hide()
			
		}
		if($("#THDIA3RECAPTDISP").hasClass("visivel")){
			
			$("#RECAPDISPD3___"+seq).show()
			
		} else {
			
			$("#RECAPDISPD3___"+seq).hide()
			
		}
		if($("#THDIA4RECAPTDISP").hasClass("visivel")){
			
			$("#RECAPDISPD4___"+seq).show()
			
		} else {
			
			$("#RECAPDISPD4___"+seq).hide()
			
		}
		if($("#THDIA5RECAPTDISP").hasClass("visivel")){
			
			$("#RECAPDISPD5___"+seq).show()
			
		} else {
			
			$("#RECAPDISPD5___"+seq).hide()
			
		}
		if($("#THDIA6RECAPTDISP").hasClass("visivel")){
			
			$("#RECAPDISPD6___"+seq).show()
			
		} else {
			
			$("#RECAPDISPD6___"+seq).hide()
			
		}
		if($("#THDIA7RECAPTDISP").hasClass("visivel")){
			
			$("#RECAPDISPD7___"+seq).show()
			
		} else {
			
			$("#RECAPDISPD7___"+seq).hide()
			
		}
		if($("#THDIA8RECAPTDISP").hasClass("visivel")){
			
			$("#RECAPDISPD8___"+seq).show()
			
		} else {
			
			$("#RECAPDISPD8___"+seq).hide()
			
		}
		if($("#THDIA9RECAPTDISP").hasClass("visivel")){
			
			$("#RECAPDISPD9___"+seq).show()
			
		} else {
			
			$("#RECAPDISPD9___"+seq).hide()
			
		}
		if($("#THDIA10RECAPTDISP").hasClass("visivel")){
			
			$("#RECAPDISPD10___"+seq).show()
			
		} else {
			
			$("#RECAPDISPD10___"+seq).hide()
			
		}
		
	})
	
}

// EXIBE CLASSE VISÍVEL DOS RECURSOS ALOCADOS
function exibeClasseVisivelAlocacao(){
	
	console.log("VOU EXIBIR E ESCONDER SOMENTE OS DE CLASSE VISÍVEL ALOCAÇÃO")
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSALOC___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		console.log("vou percorrer a linha "+seq)
		
		if($("#THDIA1ALOCCAB").hasClass("visivel")){
			
			console.log("THDIA1ALOCCAB é visível")
			
			$("#AD1___"+seq).show()
			
		} else {
			
			console.log("THDIA1ALOCCAB não é visível")
			
			$("#AD1___"+seq).hide()
			
		}
		if($("#THDIA2ALOCCAB").hasClass("visivel")){
			
			console.log("THDIA2ALOCCAB é visível")
			
			$("#AD2___"+seq).show()
			
		} else {
			
			console.log("THDIA2ALOCCAB não é visível")
			
			$("#AD2___"+seq).hide()
			
		}
		if($("#THDIA3ALOCCAB").hasClass("visivel")){
			
			console.log("THDIA3ALOCCAB é visível")
			
			$("#AD3___"+seq).show()
			
		} else {
			
			console.log("THDIA3ALOCCAB não é visível")
			
			$("#AD3___"+seq).hide()
			
		}
		if($("#THDIA4ALOCCAB").hasClass("visivel")){
			
			console.log("THDIA4ALOCCAB é visível")
			
			$("#AD4___"+seq).show()
			
		} else {
			
			console.log("THDIA4ALOCCAB não é visível")
			
			$("#AD4___"+seq).hide()
			
		}
		if($("#THDIA5ALOCCAB").hasClass("visivel")){
			
			console.log("THDIA5ALOCCAB é visível")
			
			$("#AD5___"+seq).show()
			
		} else {
			
			console.log("THDIA5ALOCCAB não é visível")
			
			$("#AD5___"+seq).hide()
			
		}
		if($("#THDIA6ALOCCAB").hasClass("visivel")){
			
			console.log("THDIA6ALOCCAB é visível")
			
			$("#AD6___"+seq).show()
			
		} else {
			
			console.log("THDIA6ALOCCAB não é visível")
			
			$("#AD6___"+seq).hide()
			
		}
		if($("#THDIA7ALOCCAB").hasClass("visivel")){
			
			console.log("THDIA7ALOCCAB é visível")
			
			$("#AD7___"+seq).show()
			
		} else {
			
			console.log("THDIA7ALOCCAB não é visível")
			
			$("#AD7___"+seq).hide()
			
		}
		if($("#THDIA8ALOCCAB").hasClass("visivel")){
			
			console.log("THDIA8ALOCCAB é visível")
			
			$("#AD8___"+seq).show()
			
		} else {
			
			console.log("THDIA8ALOCCAB não é visível")
			
			$("#AD8___"+seq).hide()
			
		}
		if($("#THDIA9ALOCCAB").hasClass("visivel")){
			
			console.log("THDIA9ALOCCAB é visível")
			
			$("#AD9___"+seq).show()
			
		} else {
			
			console.log("THDIA9ALOCCAB não é visível")
			
			$("#AD9___"+seq).hide()
			
		}
		if($("#THDIA10ALOCCAB").hasClass("visivel")){
			
			console.log("THDIA10ALOCCAB é visível")
			
			$("#AD10___"+seq).show()
			
		} else {
			
			console.log("THDIA10ALOCCAB não é visível")
			
			$("#AD10___"+seq).hide()
			
		}
		
	})
	
}

// EXIBE CLASSE VISÍVEL DOS RECURSOS ALOCADOS
function exibeClasseVisivelRecAloc(){
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OPERADORRECALOCATV___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		if($("#THDIA1RECALOC").hasClass("visivel")){
			
			$("#RECAD1___"+seq).show()
			
		} else {
			
			$("#RECAD1___"+seq).hide()
			
		}
		if($("#THDIA2RECALOC").hasClass("visivel")){
			
			$("#RECAD2___"+seq).show()
			
		} else {
			
			$("#RECAD2___"+seq).hide()
			
		}
		if($("#THDIA3RECALOC").hasClass("visivel")){
			
			$("#RECAD3___"+seq).show()
			
		} else {
			
			$("#RECAD3___"+seq).hide()
			
		}
		if($("#THDIA4RECALOC").hasClass("visivel")){
			
			$("#RECAD4___"+seq).show()
			
		} else {
			
			$("#RECAD4___"+seq).hide()
			
		}
		if($("#THDIA5RECALOC").hasClass("visivel")){
			
			$("#RECAD5___"+seq).show()
			
		} else {
			
			$("#RECAD5___"+seq).hide()
			
		}
		if($("#THDIA6RECALOC").hasClass("visivel")){
			
			$("#RECAD6___"+seq).show()
			
		} else {
			
			$("#RECAD6___"+seq).hide()
			
		}
		if($("#THDIA7RECALOC").hasClass("visivel")){
			
			$("#RECAD7___"+seq).show()
			
		} else {
			
			$("#RECAD7___"+seq).hide()
			
		}
		if($("#THDIA8RECALOC").hasClass("visivel")){
			
			$("#RECAD8___"+seq).show()
			
		} else {
			
			$("#RECAD8___"+seq).hide()
			
		}
		if($("#THDIA9RECALOC").hasClass("visivel")){
			
			$("#RECAD9___"+seq).show()
			
		} else {
			
			$("#RECAD9___"+seq).hide()
			
		}
		if($("#THDIA10RECALOC").hasClass("visivel")){
			
			$("#RECAD10___"+seq).show()
			
		} else {
			
			$("#RECAD10___"+seq).hide()
			
		}
		
	})
	
}

// EXIBE A CLASSE VISIVEL E ESCONDE OS DEMAIS 
function exibeClasseVisivelSomaRecAloc(seq){
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	//$("input[id^='SOMADIA1RECALOCATV___']").each(function(){
		
	for(var i=1; i<=10;i++){
			
		//var seq = $(this).attr("id").split("___")[1]
		
		if($("#SOMARECAD"+i+"___"+seq).hasClass("visivel")){
			
			$("#SOMARECAD"+i+"___"+seq).show()
			
		} else {
			
			$("#SOMARECAD"+i+"___"+seq).hide()
			
		}
			
	}
		
	//})
	
}

// EXIBE A CLASSE VISIVEL E ESCONDE OS DEMAIS 
function exibeClasseVisivelSomaRecAptoDisp(seq){
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	//$("input[id^='SOMADIA1RECAPTOSDISPATV___']").each(function(){
	
	for(var i=1;i<=10;i++){
	
		//var seq = $(this).attr("id").split("___")[1]
		
		if($("#SOMARECAPDISPD"+i+"___"+seq).hasClass("visivel")){
			
			$("#SOMARECAPDISPD"+i+"___"+seq).show()
			
		} else {
			
			$("#SOMARECAPDISPD"+i+"___"+seq).hide()
			
		}
		
	}
	
	//})
	
}

// VERIFICA SE JÁ CONTÉM A CHAPA
function contemChapa(chapa){

	var ret = false
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OPERADORRECAPTOSDISPATV___']").each(function(){
	
		var seq = $(this).attr("id").split("___")[1]
		
		// SE CHAPA JÁ EXISTE
		if($("#CHAPAOPERADOR___"+seq).val()==chapa){
			
			ret = true
			
		}
		
	})
	
	return ret
	
}

// VERIFICA SE JÁ CONTÉM A CHAPA
function contemChapaRAA(chapa){

	var ret = false
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OPERADORRECALOCATV___']").each(function(){
	
		var seq = $(this).attr("id").split("___")[1]
		
		// SE CHAPA JÁ EXISTE
		if($("#CHAPAOPRAA___"+seq).val()==chapa){
			
			ret = true
			
		}
		
	})
	
	return ret
	
}

// VERIFICA SE JÁ CONTÉM A CHAPA
function contemChapaRAD(chapa){

	var ret = false
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OPERADORRAD__']").each(function(){
	
		var seq = $(this).attr("id").split("___")[1]
		
		// SE CHAPA JÁ EXISTE
		if($("#CHAPARAD___"+seq).val()==chapa){
			
			ret = true
			
		}
		
	})
	
	return ret
	
}

// BUSCA O SEQ DO OPERADOR
function buscaSeqChapa(chapa){
	
	var seqRet
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OPERADORRECAPTOSDISPATV___']").each(function(){
	
		var seq = $(this).attr("id").split("___")[1]
		
		// SE CHAPA JÁ EXISTE
		if($("#CHAPAOPERADOR___"+seq).val()==chapa){
			
			seqRet = seq
			
		}
		
	})
	
	return seqRet
	
}

// BUSCA O SEQ DO OPERADOR
function buscaSeqChapaRAA(chapa){
	
	var seqRet
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OPERADORRECALOCATV___']").each(function(){
	
		var seq = $(this).attr("id").split("___")[1]
		
		// SE CHAPA JÁ EXISTE
		if($("#CHAPAOPRAA___"+seq).val()==chapa){
			
			seqRet = seq
			
		}
		
	})
	
	return seqRet
	
}

// BUSCA O SEQ DO OPERADOR
function buscaSeqChapaRAD(chapa){
	
	var seqRet
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OPERADORRAD___']").each(function(){
	
		var seq = $(this).attr("id").split("___")[1]
		
		// SE CHAPA JÁ EXISTE
		if($("#CHAPARAD___"+seq).val()==chapa){
			
			seqRet = seq
			
		}
		
	})
	
	return seqRet
	
}

// CARREGA AS INFORMAÇÕES DO RECURSO APTO DISPONIVEL PARA A ATIVIDADE
function carregaRecAptoDispAtv(obj){
	
	var myLoading2 = FLUIGC.loading(window);
	
	//var dataDe = $("#DATA_DE").val()
	//var dataAte = $("#ATE").val()
	
	var dataDe = $("#DATADE_PROG").val()
	var dataAte = $("#DATAATE_PROG").val()
	
	dataDe = formataDataBanco(dataDe)
	dataAte = formataDataBanco(dataAte)
	
	console.log("dataDe: "+dataDe)
	console.log("dataAte: "+dataAte)
	
	myLoading2.show();
	
	// PREENCHE OS DIAS DA JANELA DE PLANEJAMENTO
	preencheDiasCabecalhoRecAptoDisp()
	
	var rowSoma = addSomaRecAptoDisp()
	
	// PREENCHE OS DIAS DA JANELA DE PLANEJAMENTO
	preencheDiasSomaRecAptoDisp()
	
	var dia1 = $("#THDIA1RECAPTDISP").text()
	if(!(dia1=="")){
		dia1 = formataDataBanco(dia1)	
	}
	
	var dia2 = $("#THDIA2RECAPTDISP").text()
	if(!(dia2=="")){
		dia2 = formataDataBanco(dia2)	
	}
	
	var dia3 = $("#THDIA3RECAPTDISP").text()
	if(!(dia3=="")){
		dia3 = formataDataBanco(dia3)	
	}
	
	var dia4 = $("#THDIA4RECAPTDISP").text()
	if(!(dia4=="")){
		dia4 = formataDataBanco(dia4)	
	}
	
	var dia5 = $("#THDIA5RECAPTDISP").text()
	if(!(dia5=="")){
		dia5 = formataDataBanco(dia5)	
	}
	
	var dia6 = $("#THDIA6RECAPTDISP").text()
	if(!(dia6=="")){
		dia6 = formataDataBanco(dia6)	
	}
	
	var dia7 = $("#THDIA7RECAPTDISP").text()
	if(!(dia7=="")){
		dia7 = formataDataBanco(dia7)	
	}
	
	var dia8 = $("#THDIA8RECAPTDISP").text()
	if(!(dia8=="")){
		dia8 = formataDataBanco(dia8)	
	}
	
	var dia9 = $("#THDIA9RECAPTDISP").text()
	if(!(dia9=="")){
		dia9 = formataDataBanco(dia9)	
	}
	
	var dia10 = $("#THDIA10RECAPTDISP").text()
	if(!(dia10=="")){
		dia10 = formataDataBanco(dia10)	
	}
	
	// INICIA A OPERAÇÃO DEPOIS DE CARREGAR O LOAD
	setTimeout(function(){
		
		var seq = $(obj).attr("id").split("___")[1]
		
		var codAtividade = $("#CODATIVIDADEATV___"+seq).val()
		var codOrdem = $("#OPATV___"+seq).val()
		
		var a1 = DatasetFactory.createConstraint("CODATIVIDADE",codAtividade,codAtividade,ConstraintType.MUST)
		var a2 = DatasetFactory.createConstraint("DATA_DE",dataDe,dataDe,ConstraintType.MUST)
		var a3 = DatasetFactory.createConstraint("DATA_ATE",dataAte,dataAte,ConstraintType.MUST)
		
		constraints = new Array(a1,a2,a3)
		
		var dataset = DatasetFactory.getDataset("dsRecAptoDispOS",null,constraints,null)
		row = dataset.values
		var count = dataset.values.length
		
		console.log("row: ")
		console.log(row)
		
		// PERCORRE TODOS OS REGISTROS
		for(var i=0; i<count; i++){

			var rep = row[i]
			
			// SE JÁ CONTÉM A CHAPA	
			if(contemChapa(rep["CHAPA"])){
			
				// BUSCA O SEQ DO OPERADOR
				var seqModal = buscaSeqChapa(rep["CHAPA"])
				
				var dataDisp = rep["DATADISPONIBILIDADE"]
				dataDisp = dataDisp.split(" ")
				dataDisp = dataDisp[0]
				
				console.log("dia1: "+dia1+", dia2: "+dia2+", dia3: "+dia3+", dia4: "+dia4+", dia5: "+dia5+", dia6: "+dia6+
						", dia7: "+dia7+", dia8: "+dia8+", dia9: "+dia9+", dia10: "+dia10)
				
				console.log("dataDisp: "+dataDisp)
				
				// SE DIA1 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia1==dataDisp){
					
					var saldoDisp= rep["DISPONIBILIDADE"]
					var saldoDisp= rep["SALDO"]
					
					if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
						
						saldoDisp = parseFloat(saldoDisp)
						saldoDisp = saldoDisp.toFixed(2)
						saldoDisp = saldoDisp.toString()
						
						if(saldoDisp.includes(".")){
							
							saldoDisp = saldoDisp.replace(".",",")
							
						}
						
						$("#DIA1RECAPTOSDISPATV___"+seqModal).val(saldoDisp)
						
					} /*else {
						
						$("#DIA1RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA1RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
				// SE DIA2 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia2==dataDisp){

					//var saldoDisp = rep["DISPONIBILIDADE"]
					var saldoDisp = rep["SALDO"]
					
					if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
						
						saldoDisp = parseFloat(saldoDisp)
						saldoDisp = saldoDisp.toFixed(2)
						saldoDisp = saldoDisp.toString()
						
						if(saldoDisp.includes(".")){
							
							saldoDisp = saldoDisp.replace(".",",")
							
						}
						
						$("#DIA2RECAPTOSDISPATV___"+seqModal).val(saldoDisp)
					
					} /*else {
						
						$("#DIA2RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA2RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
				// SE DIA3 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia3==dataDisp){
					
					//var saldoDisp = rep["DISPONIBILIDADE"]
					var saldoDisp = rep["SALDO"]
					
					if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
						
						saldoDisp = parseFloat(saldoDisp)
						saldoDisp = saldoDisp.toFixed(2)
						saldoDisp = saldoDisp.toString()
						
						if(saldoDisp.includes(".")){
							
							saldoDisp = saldoDisp.replace(".",",")
							
						}
						
						$("#DIA3RECAPTOSDISPATV___"+seqModal).val(saldoDisp)
					
					} /*else {
						
						$("#DIA3RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA3RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
				// SE DIA4 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia4==dataDisp){
					
					//var saldoDisp = rep["DISPONIBILIDADE"]
					var saldoDisp = rep["SALDO"]
					
					if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
						
						saldoDisp = parseFloat(saldoDisp)
						saldoDisp = saldoDisp.toFixed(2)
						saldoDisp = saldoDisp.toString()
						
						if(saldoDisp.includes(".")){
							
							saldoDisp = saldoDisp.replace(".",",")
							
						}
						
						$("#DIA4RECAPTOSDISPATV___"+seqModal).val(saldoDisp)
					
					} /*else {
						
						$("#DIA4RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA4RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
				// SE DIA5 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia5==dataDisp){
					
					//var saldoDisp = rep["DISPONIBILIDADE"]
					var saldoDisp = rep["SALDO"]
					
					if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
					
						saldoDisp = parseFloat(saldoDisp)
						saldoDisp = saldoDisp.toFixed(2)
						saldoDisp = saldoDisp.toString()
						
						if(saldoDisp.includes(".")){
							
							saldoDisp = saldoDisp.replace(".",",")
							
						}
						
						$("#DIA5RECAPTOSDISPATV___"+seqModal).val(saldoDisp)
					
					} /*else {
						
						$("#DIA5RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA5RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
				// SE DIA6 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia6==dataDisp){
					
					//var saldoDisp = rep["DISPONIBILIDADE"]
					var saldoDisp = rep["SALDO"]
					
					if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
					
						saldoDisp = parseFloat(saldoDisp)
						saldoDisp = saldoDisp.toFixed(2)
						saldoDisp = saldoDisp.toString()
						
						if(saldoDisp.includes(".")){
							
							saldoDisp = saldoDisp.replace(".",",")
							
						}
						
						$("#DIA6RECAPTOSDISPATV___"+seqModal).val(saldoDisp)
					
					} /*else {
						
						$("#DIA6RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA6RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
				// SE DIA7 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia7==dataDisp){
					
					//var saldoDisp = rep["DISPONIBILIDADE"]
					var saldoDisp = rep["SALDO"]
					
					if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
						
						saldoDisp = parseFloat(saldoDisp)
						saldoDisp = saldoDisp.toFixed(2)
						saldoDisp = saldoDisp.toString()
						
						if(saldoDisp.includes(".")){
							
							saldoDisp = saldoDisp.replace(".",",")
							
						}
						
						$("#DIA7RECAPTOSDISPATV___"+seqModal).val(saldoDisp)
					
					} /*else {
						
						$("#DIA7RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA7RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
				// SE DIA8 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia8==dataDisp){
					
					//var saldoDisp = rep["DISPONIBILIDADE"]
					var saldoDisp = rep["SALDO"]
					
					if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
						
						saldoDisp = parseFloat(saldoDisp)
						saldoDisp = saldoDisp.toFixed(2)
						saldoDisp = saldoDisp.toString()
						
						if(saldoDisp.includes(".")){
							
							saldoDisp = saldoDisp.replace(".",",")
							
						}
						
						$("#DIA8RECAPTOSDISPATV___"+seqModal).val(saldoDisp)
					
					} /*else {
						
						$("#DIA8RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA8RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
				// SE DIA9 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia9==dataDisp){
					
					//var saldoDisp = rep["DISPONIBILIDADE"]
					var saldoDisp = rep["SALDO"]
					
					if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
						
						saldoDisp = parseFloat(saldoDisp)
						saldoDisp = saldoDisp.toFixed(2)
						saldoDisp = saldoDisp.toString()
						
						if(saldoDisp.includes(".")){
							
							saldoDisp = saldoDisp.replace(".",",")
							
						}
						
						$("#DIA9RECAPTOSDISPATV___"+seqModal).val(saldoDisp)
					
					} /*else {
						
						$("#DIA9RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA9RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
				// SE DIA10 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia10==dataDisp){
					
					//var saldoDisp = rep["DISPONIBILIDADE"]
					var saldoDisp = rep["SALDO"]
					
					if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
						
						saldoDisp = parseFloat(saldoDisp)
						saldoDisp = saldoDisp.toFixed(2)
						saldoDisp = saldoDisp.toString()
						
						if(saldoDisp.includes(".")){
							
							saldoDisp = saldoDisp.replace(".",",")
							
						}
						
						$("#DIA10RECAPTOSDISPATV___"+seqModal).val(saldoDisp)
					
					} /*else {
						
						$("#DIA10RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA10RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
			} else {
			// SE NÃO 
				
				// SE CHAPA NÃO É NULA OU VAZIA
				if(!(rep["CHAPA"]=="" || rep["CHAPA"]=="null" || rep["CHAPA"]==undefined || rep["CHAPA"]==null)){
					
					var seqModal = addModalRecAptoDisp()
					
					$("#OPERADORRECAPTOSDISPATV___"+seqModal).val(rep["NOME"])
					$("#CHAPAOPERADOR___"+seqModal).val(rep["CHAPA"])
					
					$("#DIA1REALAPTOSDISPATV___"+seqModal).val(dia1)
					$("#DIA2REALAPTOSDISPATV___"+seqModal).val(dia2)
					$("#DIA3REALAPTOSDISPATV___"+seqModal).val(dia3)
					$("#DIA4REALAPTOSDISPATV___"+seqModal).val(dia4)
					$("#DIA5REALAPTOSDISPATV___"+seqModal).val(dia5)
					$("#DIA6REALAPTOSDISPATV___"+seqModal).val(dia6)
					$("#DIA7REALAPTOSDISPATV___"+seqModal).val(dia7)
					$("#DIA8REALAPTOSDISPATV___"+seqModal).val(dia8)
					$("#DIA9REALAPTOSDISPATV___"+seqModal).val(dia9)
					$("#DIA10REALAPTOSDISPATV___"+seqModal).val(dia10)
					
					$("#DIA1RECAPTOSDISPATV___"+seqModal).val(0)
					$("#DIA2RECAPTOSDISPATV___"+seqModal).val(0)
					$("#DIA3RECAPTOSDISPATV___"+seqModal).val(0)
					$("#DIA4RECAPTOSDISPATV___"+seqModal).val(0)
					$("#DIA5RECAPTOSDISPATV___"+seqModal).val(0)
					$("#DIA6RECAPTOSDISPATV___"+seqModal).val(0)
					$("#DIA7RECAPTOSDISPATV___"+seqModal).val(0)
					$("#DIA8RECAPTOSDISPATV___"+seqModal).val(0)
					$("#DIA9RECAPTOSDISPATV___"+seqModal).val(0)
					$("#DIA10RECAPTOSDISPATV___"+seqModal).val(0)
					
					var dataDisp = rep["DATADISPONIBILIDADE"]
					dataDisp = dataDisp.split(" ")
					dataDisp = dataDisp[0]
					
					console.log("dia1: "+dia1+", dia2: "+dia2+", dia3: "+dia3+", dia4: "+dia4+", dia5: "+dia5+", dia6: "+dia6+
							", dia7: "+dia7+", dia8: "+dia8+", dia9: "+dia9+", dia10: "+dia10)
					
					console.log("dataDisp: "+dataDisp)
					
					// SE DIA1 É IGUAL A DATA DE DISPONIBILIDADE
					if(dia1==dataDisp){
						
						//var saldoDisp= rep["DISPONIBILIDADE"]
						var saldoDisp= rep["SALDO"]
						
						if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
							saldoDisp = parseFloat(saldoDisp)
							saldoDisp = saldoDisp.toFixed(2)
							saldoDisp = saldoDisp.toString()
							
							if(saldoDisp.includes(".")){
								
								saldoDisp = saldoDisp.replace(".",",")
								
							}
							
							$("#DIA1RECAPTOSDISPATV___"+seqModal).val(saldoDisp)
							
						} /*else {
							
							$("#DIA1RECAPTOSDISPATV___"+seqModal).val(0)
							
						}
						
					} else {
						
						$("#DIA1RECAPTOSDISPATV___"+seqModal).val(0)*/
						
					}
					
					// SE DIA2 É IGUAL A DATA DE DISPONIBILIDADE
					if(dia2==dataDisp){

						//var saldoDisp = rep["DISPONIBILIDADE"]
						var saldoDisp = rep["SALDO"]
						
						if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
							saldoDisp = parseFloat(saldoDisp)
							saldoDisp = saldoDisp.toFixed(2)
							saldoDisp = saldoDisp.toString()
							
							if(saldoDisp.includes(".")){
								
								saldoDisp = saldoDisp.replace(".",",")
								
							}
							
							$("#DIA2RECAPTOSDISPATV___"+seqModal).val(saldoDisp)
						
						} /*else {
							
							$("#DIA2RECAPTOSDISPATV___"+seqModal).val(0)
							
						}
						
					} else {
						
						$("#DIA2RECAPTOSDISPATV___"+seqModal).val(0)*/
						
					}
					
					// SE DIA3 É IGUAL A DATA DE DISPONIBILIDADE
					if(dia3==dataDisp){
						
						//var saldoDisp = rep["DISPONIBILIDADE"]
						var saldoDisp = rep["SALDO"]
						
						if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
							saldoDisp = parseFloat(saldoDisp)
							saldoDisp = saldoDisp.toFixed(2)
							saldoDisp = saldoDisp.toString()
							
							if(saldoDisp.includes(".")){
								
								saldoDisp = saldoDisp.replace(".",",")
								
							}
							
							$("#DIA3RECAPTOSDISPATV___"+seqModal).val(saldoDisp)
						
						} /*else {
							
							$("#DIA3RECAPTOSDISPATV___"+seqModal).val(0)
							
						}
						
					} else {
						
						$("#DIA3RECAPTOSDISPATV___"+seqModal).val(0)*/
						
					}
					
					// SE DIA4 É IGUAL A DATA DE DISPONIBILIDADE
					if(dia4==dataDisp){
						
						//var saldoDisp = rep["DISPONIBILIDADE"]
						var saldoDisp = rep["SALDO"]
						
						if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
							saldoDisp = parseFloat(saldoDisp)
							saldoDisp = saldoDisp.toFixed(2)
							saldoDisp = saldoDisp.toString()
							
							if(saldoDisp.includes(".")){
								
								saldoDisp = saldoDisp.replace(".",",")
								
							}
							
							$("#DIA4RECAPTOSDISPATV___"+seqModal).val(saldoDisp)
						
						} /*else {
							
							$("#DIA4RECAPTOSDISPATV___"+seqModal).val(0)
							
						}
						
					} else {
						
						$("#DIA4RECAPTOSDISPATV___"+seqModal).val(0)*/
						
					}
					
					// SE DIA5 É IGUAL A DATA DE DISPONIBILIDADE
					if(dia5==dataDisp){
						
						//var saldoDisp = rep["DISPONIBILIDADE"]
						var saldoDisp = rep["SALDO"]
						
						if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
							saldoDisp = parseFloat(saldoDisp)
							saldoDisp = saldoDisp.toFixed(2)
							saldoDisp = saldoDisp.toString()
							
							if(saldoDisp.includes(".")){
								
								saldoDisp = saldoDisp.replace(".",",")
								
							}
							
							$("#DIA5RECAPTOSDISPATV___"+seqModal).val(saldoDisp)
						
						} /*else {
							
							$("#DIA5RECAPTOSDISPATV___"+seqModal).val(0)
							
						}
						
					} else {
						
						$("#DIA5RECAPTOSDISPATV___"+seqModal).val(0)*/
						
					}
					
					// SE DIA6 É IGUAL A DATA DE DISPONIBILIDADE
					if(dia6==dataDisp){
						
						//var saldoDisp = rep["DISPONIBILIDADE"]
						var saldoDisp = rep["SALDO"]
						
						if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
							saldoDisp = parseFloat(saldoDisp)
							saldoDisp = saldoDisp.toFixed(2)
							saldoDisp = saldoDisp.toString()
							
							if(saldoDisp.includes(".")){
								
								saldoDisp = saldoDisp.replace(".",",")
								
							}
							
							$("#DIA6RECAPTOSDISPATV___"+seqModal).val(saldoDisp)
						
						} /*else {
							
							$("#DIA6RECAPTOSDISPATV___"+seqModal).val(0)
							
						}
						
					} else {
						
						$("#DIA6RECAPTOSDISPATV___"+seqModal).val(0)*/
						
					}
					
					// SE DIA7 É IGUAL A DATA DE DISPONIBILIDADE
					if(dia7==dataDisp){
						
						//var saldoDisp = rep["DISPONIBILIDADE"]
						var saldoDisp = rep["SALDO"]
						
						if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
							saldoDisp = parseFloat(saldoDisp)
							saldoDisp = saldoDisp.toFixed(2)
							saldoDisp = saldoDisp.toString()
							
							if(saldoDisp.includes(".")){
								
								saldoDisp = saldoDisp.replace(".",",")
								
							}
							
							$("#DIA7RECAPTOSDISPATV___"+seqModal).val(saldoDisp)
						
						} /*else {
							
							$("#DIA7RECAPTOSDISPATV___"+seqModal).val(0)
							
						}
						
					} else {
						
						$("#DIA7RECAPTOSDISPATV___"+seqModal).val(0)*/
						
					}
					
					// SE DIA8 É IGUAL A DATA DE DISPONIBILIDADE
					if(dia8==dataDisp){
						
						//var saldoDisp = rep["DISPONIBILIDADE"]
						var saldoDisp = rep["SALDO"]
						
						if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
							saldoDisp = parseFloat(saldoDisp)
							saldoDisp = saldoDisp.toFixed(2)
							saldoDisp = saldoDisp.toString()
							
							if(saldoDisp.includes(".")){
								
								saldoDisp = saldoDisp.replace(".",",")
								
							}
							
							$("#DIA8RECAPTOSDISPATV___"+seqModal).val(saldoDisp)
						
						} /*else {
							
							$("#DIA8RECAPTOSDISPATV___"+seqModal).val(0)
							
						}
						
					} else {
						
						$("#DIA8RECAPTOSDISPATV___"+seqModal).val(0)*/
						
					}
					
					// SE DIA9 É IGUAL A DATA DE DISPONIBILIDADE
					if(dia9==dataDisp){
						
						//var saldoDisp = rep["DISPONIBILIDADE"]
						var saldoDisp = rep["SALDO"]
						
						if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
							saldoDisp = parseFloat(saldoDisp)
							saldoDisp = saldoDisp.toFixed(2)
							saldoDisp = saldoDisp.toString()
							
							if(saldoDisp.includes(".")){
								
								saldoDisp = saldoDisp.replace(".",",")
								
							}
							
							$("#DIA9RECAPTOSDISPATV___"+seqModal).val(saldoDisp)
						
						} /*else {
							
							$("#DIA9RECAPTOSDISPATV___"+seqModal).val(0)
							
						}
						
					} else {
						
						$("#DIA9RECAPTOSDISPATV___"+seqModal).val(0)*/
						
					}
					
					// SE DIA10 É IGUAL A DATA DE DISPONIBILIDADE
					if(dia10==dataDisp){
						
						//var saldoDisp = rep["DISPONIBILIDADE"]
						var saldoDisp = rep["SALDO"]
						
						if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
							saldoDisp = parseFloat(saldoDisp)
							saldoDisp = saldoDisp.toFixed(2)
							saldoDisp = saldoDisp.toString()
							
							if(saldoDisp.includes(".")){
								
								saldoDisp = saldoDisp.replace(".",",")
								
							}
							
							$("#DIA10RECAPTOSDISPATV___"+seqModal).val(saldoDisp)
						
						} /*else {
							
							$("#DIA10RECAPTOSDISPATV___"+seqModal).val(0)
							
						}
						
					} else {
						
						$("#DIA10RECAPTOSDISPATV___"+seqModal).val(0)*/
						
					}
					
				}
				
			}
			
		}
	
		// CALCULA SOMA DOS RECURSOS ALOCADOS
		calculaSomaRecAptosDisp(rowSoma)
		
		// EXIBE CLASSE VISÍVEL DOS RECURSOS ALOCADOS
		exibeClasseVisivelRecAptoDisp()
		
	},500)
	
	// DESATIVA O LOAD
	setTimeout(function(){
		
		myLoading2.hide();
		$("#ICONREDUZIR").click()
		
	}, 500)
	
	// PREENCHE OS DIAS DA JANELA DE PLANEJAMENTO
	/*preencheDiasCabecalhoRecAptoDisp()
	
	addModalRecAptoDisp()
	addModalRecAptoDisp()
	addModalRecAptoDisp()
	addModalRecAptoDisp()
	
	addSomaRecAptoDisp()*/
	
}

// VERIFICA SE TEM ALGUM ITEM PARA SER DESPROGRAMADO
function temDesprogramar(){
	
	var ret = false
	var retCod = false 
	var codInterno = $("#CODINTERNO").val()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OPERADORRECALOCATV___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		if($("#RECAD1___"+seq).hasClass("desprogramar")){
			
			ret = true
			
		}
		if($("#RECAD2___"+seq).hasClass("desprogramar")){
			
			ret = true
			
		}
		if($("#RECAD3___"+seq).hasClass("desprogramar")){
			
			ret = true
			
		}
		if($("#RECAD4___"+seq).hasClass("desprogramar")){
			
			ret = true
			
		}
		if($("#RECAD5___"+seq).hasClass("desprogramar")){
			
			ret = true
			
		}
		if($("#RECAD6___"+seq).hasClass("desprogramar")){
			
			ret = true
			
		}
		if($("#RECAD7___"+seq).hasClass("desprogramar")){
			
			ret = true
			
		}
		if($("#RECAD8___"+seq).hasClass("desprogramar")){
			
			ret = true
			
		}
		if($("#RECAD9___"+seq).hasClass("desprogramar")){
			
			ret = true
			
		}
		if($("#RECAD10___"+seq).hasClass("desprogramar")){
			
			ret = true
			
		}
		
	})
	
	// SE CÓDIGO INTERNO FOI INFORMADO
	if(!(codInterno=="" || codInterno==null || codInterno==undefined)){
		
		retCod = true
		
	}
	
	if(ret && retCod){
		
		ret = true
		
	}else {
		
		ret = false
		
	}
	
	console.log("tem itens para desprogramar? "+ret)
	
	return ret
	
}

$(".select2-container--open").click(function(){

	console.log("entrei para alterar a msg do campo zoom")
	
	$(".select2-results__message").text("Você só pode selecionar 5 itens")
	
	
})

// ALTERA A MENSAGEM DO CAMPO ZOOM
function alteraMsg(){
	
	console.log("entrei para alterar a msg do campo zoom")
	
	$(".select2-results__message").text("Você só pode selecionar 5 itens")
	
}

// DESPROGRAMAR ALOCAÇÃO
function desprogramar(){
	
	console.log("vou desprogramar")
	
	// SE TEM ALGUM ITEM PARA SER DESPROGRAMADO
	if(temDesprogramar()){
		
		var myLoading2 = FLUIGC.loading(window);
		
		myLoading2.show();
		
		setTimeout(function(){
			
			// PERCORRE TODOS OS ITENS DA TABELA E PROCURA OS DIAS SELECIONADOS
			$("input[id^='OPERADORRECALOCATV___']").each(function(){
				
				var seq = $(this).attr("id").split("___")[1]
				
				var codMo = $("#CODMORECALOCATV___"+seq).val()
				var codOrdem = $("#CODORDEMRECALOCATV___"+seq).val()
				var codEstrutura = $("#CODESTRUTURARECALOCATV___"+seq).val()
				var idAtvOrdem = $("#IDATVORDEMRECALOCATV___"+seq).val()
				var codColigada = $("#CODCOLIGADAALOCATV___"+seq).val()
				var codFilial = $("#CODFILIALALOCATV___"+seq).val()
				var codAtividade = $("#CODATIVIDADERECALOCATV___"+seq).val()
				var planoCorte = $("#PLANOCORTECALOCATV___"+seq).val()
				var usuario = $("#USUARIOATUAL").val()
				var codInterno = $("#CODINTERNO").val()
				
				console.log("valores. Seq: "+seq+", codMo: "+codMo+", codEstrutura: "+codEstrutura+", idAtvOrdem: "+idAtvOrdem+", codColigada: "+codColigada+", codFilial: "+codFilial+", codAtividade: "+codAtividade+
						", planoCorte: "+planoCorte+", usuario: "+usuario+", codInterno: "+codInterno)
				
				// SE DIA FOI SELECIONADO PARA SER DESPROGRAMADO
				if($("#RECAD1___"+seq).hasClass("desprogramar")){
					
					var dia1 = $("#DIA1RECALOCATV___"+seq).val()
					
					console.log("achei o dia "+dia1+" para desprogramar")
					
					// EXECUTA A PROCEDURE PARA DESPROGRAMAR
					execProcedureDesprogramar(codColigada,codFilial,codMo,codOrdem,codEstrutura,idAtvOrdem,codAtividade,dia1,planoCorte,usuario,codInterno)
					
				}
				
				// SE DIA FOI SELECIONADO PARA SER DESPROGRAMADO
				if($("#RECAD2___"+seq).hasClass("desprogramar")){
					
					var dia2 = $("#DIA2RECALOCATV___"+seq).val()
					
					console.log("achei o dia "+dia2+" para desprogramar")
					
					// EXECUTA A PROCEDURE PARA DESPROGRAMAR
					execProcedureDesprogramar(codColigada,codFilial,codMo,codOrdem,codEstrutura,idAtvOrdem,codAtividade,dia2,planoCorte,usuario,codInterno)
					
				}
				
				// SE DIA FOI SELECIONADO PARA SER DESPROGRAMADO
				if($("#RECAD3___"+seq).hasClass("desprogramar")){
					
					var dia3 = $("#DIA3RECALOCATV___"+seq).val()
					
					console.log("achei o dia "+dia3+" para desprogramar")
					
					// EXECUTA A PROCEDURE PARA DESPROGRAMAR
					execProcedureDesprogramar(codColigada,codFilial,codMo,codOrdem,codEstrutura,idAtvOrdem,codAtividade,dia3,planoCorte,usuario,codInterno)
					
				}
				
				// SE DIA FOI SELECIONADO PARA SER DESPROGRAMADO
				if($("#RECAD4___"+seq).hasClass("desprogramar")){
					
					var dia4 = $("#DIA4RECALOCATV___"+seq).val()
					
					console.log("achei o dia "+dia4+" para desprogramar")
					
					// EXECUTA A PROCEDURE PARA DESPROGRAMAR
					execProcedureDesprogramar(codColigada,codFilial,codMo,codOrdem,codEstrutura,idAtvOrdem,codAtividade,dia4,planoCorte,usuario,codInterno)
					
				}
				
				// SE DIA FOI SELECIONADO PARA SER DESPROGRAMADO
				if($("#RECAD5___"+seq).hasClass("desprogramar")){
					
					var dia5 = $("#DIA5RECALOCATV___"+seq).val()
					
					console.log("achei o dia "+dia5+" para desprogramar")
					
					// EXECUTA A PROCEDURE PARA DESPROGRAMAR
					execProcedureDesprogramar(codColigada,codFilial,codMo,codOrdem,codEstrutura,idAtvOrdem,codAtividade,dia5,planoCorte,usuario,codInterno)
					
				}
				
				// SE DIA FOI SELECIONADO PARA SER DESPROGRAMADO
				if($("#RECAD6___"+seq).hasClass("desprogramar")){
					
					var dia6 = $("#DIA6RECALOCATV___"+seq).val()
					
					console.log("achei o dia "+dia6+" para desprogramar")
					
					// EXECUTA A PROCEDURE PARA DESPROGRAMAR
					execProcedureDesprogramar(codColigada,codFilial,codMo,codOrdem,codEstrutura,idAtvOrdem,codAtividade,dia6,planoCorte,usuario,codInterno)
					
				}
				
				// SE DIA FOI SELECIONADO PARA SER DESPROGRAMADO
				if($("#RECAD7___"+seq).hasClass("desprogramar")){
					
					var dia7 = $("#DIA7RECALOCATV___"+seq).val()
					
					console.log("achei o dia "+dia7+" para desprogramar")
					
					// EXECUTA A PROCEDURE PARA DESPROGRAMAR
					execProcedureDesprogramar(codColigada,codFilial,codMo,codOrdem,codEstrutura,idAtvOrdem,codAtividade,dia7,planoCorte,usuario,codInterno)
					
				}
				
				// SE DIA FOI SELECIONADO PARA SER DESPROGRAMADO
				if($("#RECAD8___"+seq).hasClass("desprogramar")){
					
					var dia8 = $("#DIA8RECALOCATV___"+seq).val()
					
					console.log("achei o dia "+dia8+" para desprogramar")
					
					// EXECUTA A PROCEDURE PARA DESPROGRAMAR
					execProcedureDesprogramar(codColigada,codFilial,codMo,codOrdem,codEstrutura,idAtvOrdem,codAtividade,dia8,planoCorte,usuario,codInterno)
					
				}
				
				// SE DIA FOI SELECIONADO PARA SER DESPROGRAMADO
				if($("#RECAD9___"+seq).hasClass("desprogramar")){
					
					var dia9 = $("#DIA9RECALOCATV___"+seq).val()
					
					console.log("achei o dia "+dia9+" para desprogramar")
					
					// EXECUTA A PROCEDURE PARA DESPROGRAMAR
					execProcedureDesprogramar(codColigada,codFilial,codMo,codOrdem,codEstrutura,idAtvOrdem,codAtividade,dia9,planoCorte,usuario,codInterno)
					
				}
				
				// SE DIA FOI SELECIONADO PARA SER DESPROGRAMADO
				if($("#RECAD10___"+seq).hasClass("desprogramar")){
					
					var dia10 = $("#DIA10RECALOCATV___"+seq).val()
					
					console.log("achei o dia "+dia10+" para desprogramar")
					
					// EXECUTA A PROCEDURE PARA DESPROGRAMAR
					execProcedureDesprogramar(codColigada,codFilial,codMo,codOrdem,codEstrutura,idAtvOrdem,codAtividade,dia10,planoCorte,usuario,codInterno)
					
				}
				
			})
			
			// LIMPA OS RECURSOS ALOCADOS PARA A ATIVIDADE
			limpaRecAlocAtv()
			
			// ATUALIZA OS RECURSOS ALOCADOS PARA A ATIVIDADE
			atualizaRecAlocadoAtv()
			
			var seq = $("#SEQATUAL").val()
			
			var codcoligada = $("#CODCOLIGADA___"+seq).val()
			var codfilial = $("#CODFILIAL___"+seq).val()
			var codOrdem = $("#OPATV___"+seq).val()
			var codAtividade = $("#CODATIVIDADEATV___"+seq).val()
			var celula = $("#CELULAATV___"+seq).val()
			var codigoPrd = $("#CODIGOPRDATV___"+seq).val()
			var idprd = $("#IDPRDATV___"+seq).val()
			var codPosto = $("#POSTOATV___"+seq).val()
			var codPrj = $("#OSATV___"+seq).val()
			var idAtvOrdem = $("#IDATIVIDADEATV___"+seq).val()
			var dataDe = $("#DATADE_PROG").val()
		    var dataAte = $("#DATAATE_PROG").val()
		    dataDe = formataDataBanco(dataDe)
		    dataAte = formataDataBanco(dataAte)	

			// ATUALIZA OS DADOS DA ATIVIDADE PROGRAMADA
		    atualizaProgAtv(codcoligada, codfilial, codOrdem, codAtividade, celula, codigoPrd, idprd, codPosto, codPrj, dataDe, dataAte, seq)
		    
		    // ATUALIZA OS SALDOS ALOCADOS POR DIAS
		    atualizaSaldosDiasLinha(codcoligada,codfilial,codOrdem,idAtvOrdem,dataDe,dataAte,seq)
		    
		    // VERIFICA SALDO ALOCAR
			//verificaSaldoAlocar()
			verificaStatusAtv()
			
			// LIMPA A SELEÇÃO DO CAMPO ZOOM
			$("#MOTDESPROG>option").remove()
			$("#CODINTERNO").val("")
			
			// DESATIVA O LOAD
			setTimeout(function(){
				
				myLoading2.hide();
				
			}, 600)
			
		},500)
		
	} else {
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'Não há dia selecionado para desprogramar ou o motivo não foi informado',
			  text: 'Verifique e tente novamente.'
		})
		
	}
	    
}

// ATUALIZA OS RECURSOS ALOCADOS PARA A ATIVIDADE
function atualizaRecAlocadoAtv(){
	
	console.log("VOU CARREGAR A TABELA DE RECURSOS ALOCADOS")
	
	var myLoading2 = FLUIGC.loading(window);
	
	//var dataDe = $("#DATA_DE").val()
	//var dataAte = $("#ATE").val()
	
	var dataDe = $("#DATADE_PROG").val()
	var dataAte = $("#DATAATE_PROG").val()
	
	console.log("dataAte: "+dataAte)
	
	dataDe = formataDataBanco(dataDe)
	dataAte = formataDataBanco(dataAte)
	
	console.log("dataDe: "+dataDe)
	console.log("dataAte: "+dataAte)
	
	myLoading2.show();
	
	// PREENCHE OS DIAS DA JANELA DE PLANEJAMENTO
	preencheDiasCabecalhoRecAloc()
	
	// ADICIONA LINHA PARA O RESULTADO DA SOMA DOS RECURSOS ALOCADOS
	var rowSoma = addSomaRecAloc()
	
	// PREENCHE DIAS DA SOMA ALOCAÇÃO
	preencheDiasSomaRecAloc()

	var dia1 = $("#THDIA1RECALOC").text()
	if(!(dia1=="")){
		dia1 = formataDataBanco(dia1)	
	}
	
	var dia2 = $("#THDIA2RECALOC").text()
	if(!(dia2=="")){
		dia2 = formataDataBanco(dia2)	
	}
	
	var dia3 = $("#THDIA3RECALOC").text()
	if(!(dia3=="")){
		dia3 = formataDataBanco(dia3)	
	}
	
	var dia4 = $("#THDIA4RECALOC").text()
	if(!(dia4=="")){
		dia4 = formataDataBanco(dia4)	
	}
	
	var dia5 = $("#THDIA5RECALOC").text()
	if(!(dia5=="")){
		dia5 = formataDataBanco(dia5)	
	}
	
	var dia6 = $("#THDIA6RECALOC").text()
	if(!(dia6=="")){
		dia6 = formataDataBanco(dia6)	
	}
	
	var dia7 = $("#THDIA7RECALOC").text()
	if(!(dia7=="")){
		dia7 = formataDataBanco(dia7)	
	}
	
	var dia8 = $("#THDIA8RECALOC").text()
	if(!(dia8=="")){
		dia8 = formataDataBanco(dia8)	
	}
	
	var dia9 = $("#THDIA9RECALOC").text()
	if(!(dia9=="")){
		dia9 = formataDataBanco(dia9)	
	}
	
	var dia10 = $("#THDIA10RECALOC").text()
	if(!(dia10=="")){
		dia10 = formataDataBanco(dia10)	
	}
	
	// INICIA A OPERAÇÃO DEPOIS DE CARREGAR O LOAD
	setTimeout(function(){
		
		var seq = $("#SEQATUAL").val()
		 
		var codAtividade = $("#CODATIVIDADEATV___"+seq).val()
		var codOrdem = $("#OPATV___"+seq).val()
		
		var a1 = DatasetFactory.createConstraint("CODATIVIDADE",codAtividade,codAtividade,ConstraintType.MUST)
		var a2 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
		var a3 = DatasetFactory.createConstraint("DTHRINICIAL",dataDe,dataDe,ConstraintType.MUST)
		var a4 = DatasetFactory.createConstraint("DTHRFINAL",dataAte,dataAte,ConstraintType.MUST)
		
		constraints = new Array(a1,a2,a3,a4)
		
		var dataset = DatasetFactory.getDataset("dsRecAlocadoAtv",null,constraints,null)
		var row = dataset.values
		var count = dataset.values.length
		
		// PERCORRE TODOS OS REGISTROS
		for(var i=0; i<count; i++){

			var rep = row[i]
			
			// SE OPERADOR JÁ FOI INCLUÍDO NA TABELA
			if(contemChapaRAA(rep["CODIGO"])){
				
				console.log("Operador "+rep["CODIGO"]+" já está na tabela")
				
				// BUSCA O SEQ DO OPERADOR
				var seqModal = buscaSeqChapaRAA(rep["CODIGO"])
				
				var dataDisp = rep["DTHRFINAL"]
				dataDisp = dataDisp.split(" ")
				dataDisp = dataDisp[0]
				
				console.log("dia1: "+dia1+", dia2: "+dia2+", dia3: "+dia3+", dia4: "+dia4+", dia5: "+dia5+", dia6: "+dia6+
						", dia7: "+dia7+", dia8: "+dia8+", dia9: "+dia9+", dia10: "+dia10)
				
				console.log("dataDisp: "+dataDisp)
				
				// SE DIA1 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia1==dataDisp){
					
					var saldoAloc= rep["SALDO_ALOCADO"]
					console.log("saldoAlocado "+saldoAlocado)
					
					if(!(saldoAloc=="" || saldoAloc==null || saldoAloc==undefined || saldoAloc=="null")){
						
						var saldo = $("#DIA1RECALOC___"+seqModal).val()
						
						console.log("saldo antes do replace "+saldo)
						saldo = saldo.replace(",",".")
						console.log("saldo depois do replace "+saldo)
						saldo = parseFloat(saldo)
						saldoAloc = parseFloat(saldoAloc)
						console.log("vou somar saldo "+saldo+" e saldoAlocado "+saldoAloc)
						
						var saldoSoma = saldo + saldoAloc
						
						console.log("saldo depois da soma "+saldoSoma)
						
						saldoSoma = saldoSoma.toString()
						
						if(saldoSoma.includes(".")){
							
							saldoSoma = saldoSoma.replace(".",",")
							
						}
						
						$("#DIA1RECALOC___"+seqModal).val(saldoSoma)
						
					} /*else {
						
						$("#DIA1RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA1RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
				// SE DIA2 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia2==dataDisp){

					var saldoAloc = rep["SALDO_ALOCADO"]
					
					if(!(saldoAloc=="" || saldoAloc==null || saldoAloc==undefined || saldoAloc=="null")){
					
						var saldo = $("#DIA2RECALOC___"+seqModal).val()
						console.log("saldo antes do replace "+saldo)
						saldo = saldo.replace(",",".")
						console.log("saldo depois do replace "+saldo)
						saldo = parseFloat(saldo)
						saldoAloc = parseFloat(saldoAloc)
						console.log("vou somar saldo "+saldo+" e saldoAlocado "+saldoAloc)
						
						var saldoSoma = saldo + saldoAloc
						console.log("saldo depois da soma "+saldoSoma)
						
						saldoSoma = saldoSoma.toString()
						
						if(saldoSoma.includes(".")){
							
							saldoSoma = saldoSoma.replace(".",",")
							
						}
						
						$("#DIA2RECALOC___"+seqModal).val(saldoSoma)
					
					} /*else {
						
						$("#DIA2RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA2RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
				// SE DIA3 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia3==dataDisp){
					
					var saldoAloc = rep["SALDO_ALOCADO"]
					
					if(!(saldoAloc=="" || saldoAloc==null || saldoAloc==undefined || saldoAloc=="null")){
					
						var saldo = $("#DIA3RECALOC___"+seqModal).val()
						console.log("saldo antes do replace "+saldo)
						saldo = saldo.replace(",",".")
						console.log("saldo depois do replace "+saldo)
						saldo = parseFloat(saldo)
						saldoAloc = parseFloat(saldoAloc)
						console.log("vou somar saldo "+saldo+" e saldoAlocado "+saldoAloc)
						
						var saldoSoma = saldo + saldoAloc
						console.log("saldo depois da soma "+saldoSoma)
						
						saldoSoma = saldoSoma.toString()
						
						if(saldoSoma.includes(".")){
							
							saldoSoma = saldoSoma.replace(".",",")
							
						}
						
						$("#DIA3RECALOC___"+seqModal).val(saldoSoma)
					
					} /*else {
						
						$("#DIA3RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA3RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
				// SE DIA4 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia4==dataDisp){
					
					var saldoAloc = rep["SALDO_ALOCADO"]
					
					if(!(saldoAloc=="" || saldoAloc==null || saldoAloc==undefined || saldoAloc=="null")){
					
						var saldo = $("#DIA4RECALOC___"+seqModal).val()
						console.log("saldo antes do replace "+saldo)
						saldo = saldo.replace(",",".")
						console.log("saldo depois do replace "+saldo)
						saldo = parseFloat(saldo)
						saldoAloc = parseFloat(saldoAloc)
						console.log("vou somar saldo "+saldo+" e saldoAlocado "+saldoAloc)
						
						var saldoSoma = saldo + saldoAloc
						console.log("saldo depois da soma "+saldoSoma)
						
						saldoSoma = saldoSoma.toString()
						
						if(saldoSoma.includes(".")){
							
							saldoSoma = saldoSoma.replace(".",",")
							
						}
						
						$("#DIA4RECALOC___"+seqModal).val(saldoSoma)
					
					} /*else {
						
						$("#DIA4RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA4RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
				// SE DIA5 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia5==dataDisp){
					
					var saldoAloc = rep["SALDO_ALOCADO"]
					
					if(!(saldoAloc=="" || saldoAloc==null || saldoAloc==undefined || saldoAloc=="null")){
					
						var saldo = $("#DIA5RECALOC___"+seqModal).val()
						console.log("saldo antes do replace "+saldo)
						saldo = saldo.replace(",",".")
						console.log("saldo depois do replace "+saldo)
						saldo = parseFloat(saldo)
						saldoAloc = parseFloat(saldoAloc)
						console.log("vou somar saldo "+saldo+" e saldoAlocado "+saldoAloc)
						
						var saldoSoma = saldo + saldoAloc
						console.log("saldo depois da soma "+saldoSoma)
						
						saldoSoma = saldoSoma.toString()
						
						if(saldoSoma.includes(".")){
							
							saldoSoma = saldoSoma.replace(".",",")
							
						}
						
						$("#DIA5RECALOC___"+seqModal).val(saldoSoma)
					
					} /*else {
						
						$("#DIA5RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA5RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
				// SE DIA6 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia6==dataDisp){
					
					var saldoAloc = rep["SALDO_ALOCADO"]
					
					if(!(saldoAloc=="" || saldoAloc==null || saldoAloc==undefined || saldoAloc=="null")){
					
						var saldo = $("#DIA6RECALOC___"+seqModal).val()
						console.log("saldo antes do replace "+saldo)
						saldo = saldo.replace(",",".")
						console.log("saldo depois do replace "+saldo)
						saldo = parseFloat(saldo)
						saldoAloc = parseFloat(saldoAloc)
						console.log("vou somar saldo "+saldo+" e saldoAlocado "+saldoAloc)
						
						var saldoSoma = saldo + saldoAloc
						console.log("saldo depois da soma "+saldoSoma)
						
						saldoSoma = saldoSoma.toString()
						
						if(saldoSoma.includes(".")){
							
							saldoSoma = saldoSoma.replace(".",",")
							
						}
						
						$("#DIA6RECALOC___"+seqModal).val(saldoSoma)
					
					} /*else {
						
						$("#DIA6RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA6RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
				// SE DIA7 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia7==dataDisp){
					
					var saldoAloc = rep["SALDO_ALOCADO"]
					
					if(!(saldoAloc=="" || saldoAloc==null || saldoAloc==undefined || saldoAloc=="null")){
					
						var saldo = $("#DIA7RECALOC___"+seqModal).val()
						console.log("saldo antes do replace "+saldo)
						saldo = saldo.replace(",",".")
						console.log("saldo depois do replace "+saldo)
						saldo = parseFloat(saldo)
						saldoAloc = parseFloat(saldoAloc)
						console.log("vou somar saldo "+saldo+" e saldoAlocado "+saldoAloc)
						
						var saldoSoma = saldo + saldoAloc
						console.log("saldo depois da soma "+saldoSoma)
						
						saldoSoma = saldoSoma.toString()
						
						if(saldoSoma.includes(".")){
							
							saldoSoma = saldoSoma.replace(".",",")
							
						}
						
						$("#DIA7RECALOC___"+seqModal).val(saldoSoma)
					
					} /*else {
						
						$("#DIA7RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA7RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
				// SE DIA8 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia8==dataDisp){
					
					var saldoAloc = rep["SALDO_ALOCADO"]
					
					if(!(saldoAloc=="" || saldoAloc==null || saldoAloc==undefined || saldoAloc=="null")){
					
						var saldo = $("#DIA8RECALOC___"+seqModal).val()
						console.log("saldo antes do replace "+saldo)
						saldo = saldo.replace(",",".")
						console.log("saldo depois do replace "+saldo)
						saldo = parseFloat(saldo)
						saldoAloc = parseFloat(saldoAloc)
						console.log("vou somar saldo "+saldo+" e saldoAlocado "+saldoAloc)
						
						var saldoSoma = saldo + saldoAloc
						console.log("saldo depois da soma "+saldoSoma)
						
						saldoSoma = saldoSoma.toString()
						
						if(saldoSoma.includes(".")){
							
							saldoSoma = saldoSoma.replace(".",",")
							
						}
						
						$("#DIA8RECALOC___"+seqModal).val(saldoSoma)
					
					} /*else {
						
						$("#DIA8RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA8RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
				// SE DIA9 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia9==dataDisp){
					
					var saldoAloc = rep["SALDO_ALOCADO"]
					
					if(!(saldoAloc=="" || saldoAloc==null || saldoAloc==undefined || saldoAloc=="null")){
					
						var saldo = $("#DIA9RECALOC___"+seqModal).val()
						console.log("saldo antes do replace "+saldo)
						saldo = saldo.replace(",",".")
						console.log("saldo depois do replace "+saldo)
						saldo = parseFloat(saldo)
						saldoAloc = parseFloat(saldoAloc)
						console.log("vou somar saldo "+saldo+" e saldoAlocado "+saldoAloc)
						
						var saldoSoma = saldo + saldoAloc
						console.log("saldo depois da soma "+saldoSoma)
						
						saldoSoma = saldoSoma.toString()
						
						if(saldoSoma.includes(".")){
							
							saldoSoma = saldoSoma.replace(".",",")
							
						}
						
						$("#DIA9RECALOC___"+seqModal).val(saldoSoma)
					
					} /*else {
						
						$("#DIA9RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA9RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
				// SE DIA10 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia10==dataDisp){
					
					var saldoAloc = rep["SALDO_ALOCADO"]
					
					if(!(saldoAloc=="" || saldoAloc==null || saldoAloc==undefined || saldoAloc=="null")){
					
						var saldo = $("#DIA10RECALOC___"+seqModal).val()
						console.log("saldo antes do replace "+saldo)
						saldo = saldo.replace(",",".")
						console.log("saldo depois do replace "+saldo)
						saldo = parseFloat(saldo)
						saldoAloc = parseFloat(saldoAloc)
						console.log("vou somar saldo "+saldo+" e saldoAlocado "+saldoAloc)
						
						var saldoSoma = saldo + saldoAloc
						console.log("saldo depois da soma "+saldoSoma)
						
						saldoSoma = saldoSoma.toString()
						
						if(saldoSoma.includes(".")){
							
							saldoSoma = saldoSoma.replace(".",",")
							
						}
						
						$("#DIA10RECALOC___"+seqModal).val(saldoSoma)
					
					} /*else {
						
						$("#DIA10RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA10RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
			} else {
				// SE NÃO
				
				console.log("Operador "+rep["CODIGO"]+" não está na tabela")
				
				var seqModal = addModalRecAlocado()
				
				console.log("Achei o operador no seq "+seqModal)
				
				$("#OPERADORRECALOCATV___"+seqModal).val(rep["NOME"])
				$("#CHAPAOPRAA___"+seqModal).val(rep["CODIGO"])
				$("#CODCOLIGADAALOCATV___"+seqModal).val(rep["CODCOLIGADA"])
				$("#CODFILIALALOCATV___"+seqModal).val(rep["CODFILIAL"])
				$("#CODMORECALOCATV___"+seqModal).val(rep["CODMO"])
				$("#CODORDEMRECALOCATV___"+seqModal).val(rep["CODORDEM"])
				$("#IDATVORDEMRECALOCATV___"+seqModal).val(rep["IDATVORDEM"])
				$("#CODESTRUTURARECALOCATV___"+seqModal).val(rep["CODESTRUTURA"])
				$("#CODATIVIDADERECALOCATV___"+seqModal).val(rep["CODATIVIDADE"])
				
				$("#DIA1RECALOCATV___"+seqModal).val(dia1)
				$("#DIA2RECALOCATV___"+seqModal).val(dia2)
				$("#DIA3RECALOCATV___"+seqModal).val(dia3)
				$("#DIA4RECALOCATV___"+seqModal).val(dia4)
				$("#DIA5RECALOCATV___"+seqModal).val(dia5)
				$("#DIA6RECALOCATV___"+seqModal).val(dia6)
				$("#DIA7RECALOCATV___"+seqModal).val(dia7)
				$("#DIA8RECALOCATV___"+seqModal).val(dia8)
				$("#DIA9RECALOCATV___"+seqModal).val(dia9)
				$("#DIA10RECALOCATV___"+seqModal).val(dia10)
				
				var dataProg = rep["DTHRINICIAL"]
				dataProg = dataProg.split(" ")
				dataProg = dataProg[0]
				
				console.log("dia1: "+dia1+", dia2: "+dia2+", dia3: "+dia3+", dia4: "+dia4+", dia5: "+dia5+", dia6: "+dia6+
						", dia7: "+dia7+", dia8: "+dia8+", dia9: "+dia9+", dia10: "+dia10)
				
				console.log("dataProg: "+dataProg)
				
				// SE DIA1 É IGUAL A DATA PROGRAMADA
				if(dia1==dataProg){
					
					var saldoAlocado = rep["SALDO_ALOCADO"]
					
					if(!(saldoAlocado=="" || saldoAlocado==null || saldoAlocado==undefined || saldoAlocado=="null")){
						
						saldoAlocado = parseFloat(saldoAlocado)
						saldoAlocado = saldoAlocado.toFixed(2)
						saldoAlocado = saldoAlocado.toString()
						
						if(saldoAlocado.includes(".")){
							
							saldoAlocado = saldoAlocado.replace(".",",")
							
						}
						
						$("#DIA1RECALOC___"+seqModal).val(saldoAlocado)
						
					} else {
						
						$("#DIA1RECALOC___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA1RECALOC___"+seqModal).val(0)
					
				}
				
				// SE DIA2 É IGUAL A DATA PROGRAMADA
				if(dia2==dataProg){

					var saldoAlocado = rep["SALDO_ALOCADO"]
					
					if(!(saldoAlocado=="" || saldoAlocado==null || saldoAlocado==undefined || saldoAlocado=="null")){
						
						saldoAlocado = parseFloat(saldoAlocado)
						saldoAlocado = saldoAlocado.toFixed(2)
						saldoAlocado = saldoAlocado.toString()
						
						if(saldoAlocado.includes(".")){
							
							saldoAlocado = saldoAlocado.replace(".",",")
							
						}
						
						$("#DIA2RECALOC___"+seqModal).val(saldoAlocado)
					
					} else {
						
						$("#DIA2RECALOC___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA2RECALOC___"+seqModal).val(0)
					
				}
				
				// SE DIA3 É IGUAL A DATA PROGRAMADA
				if(dia3==dataProg){
					
					var saldoAlocado = rep["SALDO_ALOCADO"]
					
					if(!(saldoAlocado=="" || saldoAlocado==null || saldoAlocado==undefined || saldoAlocado=="null")){
						
						saldoAlocado = parseFloat(saldoAlocado)
						saldoAlocado = saldoAlocado.toFixed(2)
						saldoAlocado = saldoAlocado.toString()
						
						if(saldoAlocado.includes(".")){
							
							saldoAlocado = saldoAlocado.replace(".",",")
							
						}
						
						$("#DIA3RECALOC___"+seqModal).val(saldoAlocado)
					
					} else {
						
						$("#DIA3RECALOC___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA3RECALOC___"+seqModal).val(0)
					
				}
				
				// SE DIA4 É IGUAL A DATA PROGRAMADA
				if(dia4==dataProg){
					
					var saldoAlocado = rep["SALDO_ALOCADO"]
					
					if(!(saldoAlocado=="" || saldoAlocado==null || saldoAlocado==undefined || saldoAlocado=="null")){
					
						saldoAlocado = parseFloat(saldoAlocado)
						saldoAlocado = saldoAlocado.toFixed(2)
						saldoAlocado = saldoAlocado.toString()
						
						if(saldoAlocado.includes(".")){
							
							saldoAlocado = saldoAlocado.replace(".",",")
							
						}
						
						$("#DIA4RECALOC___"+seqModal).val(saldoAlocado)
					
					} else {
						
						$("#DIA4RECALOC___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA4RECALOC___"+seqModal).val(0)
					
				}
				
				// SE DIA5 É IGUAL A DATA PROGRAMADA
				if(dia5==dataProg){
					
					var saldoAlocado = rep["SALDO_ALOCADO"]
					
					if(!(saldoAlocado=="" || saldoAlocado==null || saldoAlocado==undefined || saldoAlocado=="null")){
						
						saldoAlocado = parseFloat(saldoAlocado)
						saldoAlocado = saldoAlocado.toFixed(2)
						saldoAlocado = saldoAlocado.toString()
						
						if(saldoAlocado.includes(".")){
							
							saldoAlocado = saldoAlocado.replace(".",",")
							
						}
						
						$("#DIA5RECALOC___"+seqModal).val(saldoAlocado)
					
					} else {
						
						$("#DIA5RECALOC___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA5RECALOC___"+seqModal).val(0)
					
				}
				
				// SE DIA6 É IGUAL A DATA PROGRAMADA
				if(dia6==dataProg){
					
					var saldoAlocado = rep["SALDO_ALOCADO"]
					
					if(!(saldoAlocado=="" || saldoAlocado==null || saldoAlocado==undefined || saldoAlocado=="null")){
						
						saldoAlocado = parseFloat(saldoAlocado)
						saldoAlocado = saldoAlocado.toFixed(2)
						saldoAlocado = saldoAlocado.toString()
						
						if(saldoAlocado.includes(".")){
							
							saldoAlocado = saldoAlocado.replace(".",",")
							
						}
						
						$("#DIA6RECALOC___"+seqModal).val(saldoAlocado)
					
					} else {
						
						$("#DIA6RECALOC___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA6RECALOC___"+seqModal).val(0)
					
				}
				
				// SE DIA7 É IGUAL A DATA PROGRAMADA
				if(dia7==dataProg){
					
					var saldoAlocado = rep["SALDO_ALOCADO"]
					
					if(!(saldoAlocado=="" || saldoAlocado==null || saldoAlocado==undefined || saldoAlocado=="null")){
						
						saldoAlocado = parseFloat(saldoAlocado)
						saldoAlocado = saldoAlocado.toFixed(2)
						saldoAlocado = saldoAlocado.toString()
						
						if(saldoAlocado.includes(".")){
							
							saldoAlocado = saldoAlocado.replace(".",",")
							
						}
						
						$("#DIA7RECALOC___"+seqModal).val(saldoAlocado)
					
					} else {
						
						$("#DIA7RECALOC___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA7RECALOC___"+seqModal).val(0)
					
				}
				
				// SE DIA8 É IGUAL A DATA PROGRAMADA
				if(dia8==dataProg){
					
					var saldoAlocado = rep["SALDO_ALOCADO"]
					
					if(!(saldoAlocado=="" || saldoAlocado==null || saldoAlocado==undefined || saldoAlocado=="null")){
					
						saldoAlocado = parseFloat(saldoAlocado)
						saldoAlocado = saldoAlocado.toFixed(2)
						saldoAlocado = saldoAlocado.toString()
						
						if(saldoAlocado.includes(".")){
							
							saldoAlocado = saldoAlocado.replace(".",",")
							
						}
						
						$("#DIA8RECALOC___"+seqModal).val(saldoAlocado)
					
					} else {
						
						$("#DIA8RECALOC___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA8RECALOC___"+seqModal).val(0)
					
				}
				
				// SE DIA9 É IGUAL A DATA PROGRAMADA
				if(dia9==dataProg){
					
					var saldoAlocado = rep["SALDO_ALOCADO"]
					
					if(!(saldoAlocado=="" || saldoAlocado==null || saldoAlocado==undefined || saldoAlocado=="null")){
						
						saldoAlocado = parseFloat(saldoAlocado)
						saldoAlocado = saldoAlocado.toFixed(2)
						saldoAlocado = saldoAlocado.toString()
						
						if(saldoAlocado.includes(".")){
							
							saldoAlocado = saldoAlocado.replace(".",",")
							
						}
						
						$("#DIA9RECALOC___"+seqModal).val(saldoAlocado)
					
					} else {
						
						$("#DIA9RECALOC___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA9RECALOC___"+seqModal).val(0)
					
				}
				
				// SE DIA10 É IGUAL A DATA PROGRAMADA
				if(dia10==dataProg){
					
					var saldoAlocado = rep["SALDO_ALOCADO"]
					
					if(!(saldoAlocado=="" || saldoAlocado==null || saldoAlocado==undefined || saldoAlocado=="null")){
						
						saldoAlocado = parseFloat(saldoAlocado)
						saldoAlocado = saldoAlocado.toFixed(2)
						saldoAlocado = saldoAlocado.toString()
						
						if(saldoAlocado.includes(".")){
							
							saldoAlocado = saldoAlocado.replace(".",",")
							
						}
						
						$("#DIA10RECALOC___"+seqModal).val(saldoAlocado)
					
					} else {
						
						$("#DIA10RECALOC___"+seqModal).val(0)
						
					} 
					
				} else {
					
					$("#DIA10RECALOC___"+seqModal).val(0)
					
				}
				
			}
			
		}
		
		// CALCULA SOMA DOS RECURSOS ALOCADOS
		calculaSomaRecAlocAtv(rowSoma)
		
		// EXIBE SOMENTE AS CLASSES VÍSIVEIS
		exibeClasseVisivelRecAloc()
		
	},500)
	
	// DESATIVA O LOAD
	setTimeout(function(){
		
		myLoading2.hide();
		$("#ICONREDUZIR").click()
		
	}, 500)
	
}

// EXECUTA A PROCEDURE PARA DESPROGRAMAR
function execProcedureDesprogramar(codColigada,codFilial,codMo,codOrdem,codEstrutura,idAtvOrdem,codAtividade,dia,planoCorte,usuario,codInterno){
	
	console.log("vou executar a procedure para desprogramar")
	console.log("codColigada: "+codColigada+", codFilial: "+codFilial+", codMo: "+codMo+", codOrdem: "+codOrdem+", codEstrutura: "+codEstrutura+", idAtvOrdem: "+idAtvOrdem+
			", codAtividade: "+codAtividade+", dia: "+dia+", planoCorte: "+planoCorte+", usuario: "+usuario+", codInterno: "+codInterno)
	
    var dataAte = ""
	
	// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
	/*var b1 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST)
	var b2 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
	var b3 = DatasetFactory.createConstraint("CODMO",codMo,codMo,ConstraintType.MUST)
	var b4 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
	var b5 = DatasetFactory.createConstraint("CODESTRUTURA",codEstrutura,codEstrutura,ConstraintType.MUST)
	var b6 = DatasetFactory.createConstraint("IDATVORDEM",idAtvOrdem,idAtvOrdem,ConstraintType.MUST)
	var b7 = DatasetFactory.createConstraint("DATA_ATE",dia,dia,ConstraintType.MUST)
	
	var constraints = new Array(b1,b2,b3,b4,b5,b6,b7)
	
	var dataset = DatasetFactory.getDataset("dsBuscaIndiceProcesso",null,constraints,null)
	var row = dataset.values
	var rep = row[0]
	
	var indiceProcesso = rep["INDICEPROCESSO"]
	
	console.log("indiceProcesso: "+indiceProcesso)*/
	
	// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
	var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("CODESTRUTURA",codEstrutura,codEstrutura,ConstraintType.MUST)
	var a4 = DatasetFactory.createConstraint("IDATVORDEM",idAtvOrdem,idAtvOrdem,ConstraintType.MUST)
	var a5 = DatasetFactory.createConstraint("CODMO",codMo,codMo,ConstraintType.MUST)
	var a6 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
	var a7 = DatasetFactory.createConstraint("DIA",dia,dia,ConstraintType.MUST)
	//var a8 = DatasetFactory.createConstraint("INDICEPROCESSO",indiceProcesso,indiceProcesso,ConstraintType.MUST)
	var a9 = DatasetFactory.createConstraint("CODATIVIDADE",codAtividade,codAtividade,ConstraintType.MUST)
	var a10 = DatasetFactory.createConstraint("PLANOCORTE",planoCorte,planoCorte,ConstraintType.MUST)
	var a11 = DatasetFactory.createConstraint("USUARIOATUAL",usuario,usuario,ConstraintType.MUST)
	var a12 = DatasetFactory.createConstraint("CODINTERNO",codInterno,codInterno,ConstraintType.MUST)
	
	var constraints2 = new Array(a1,a2,a3,a4,a5,a6,a7,a9,a10,a11,a12)
	
	var dataset2 = DatasetFactory.getDataset("dsDeleteProgramacao",null,constraints2,null)
	
	console.log("deletei a programação")
	
}

// SELECIONA O DIA PARA REALIZAR A DESPROGRAMAÇÃO
function selecionaDia(obj){
	
	var seq = $(obj).attr("id").split("___")[1]
	
	var dia = $(obj).children("input").last().val()
	
	// SE DIA JÁ FOI SELECIONADO PARA DESPROGRAMAR
	if($(obj).hasClass("desprogramar")){
		
		console.log("vou desprogramar")
			
		// REMOVE A SELEÇÃO
		$(obj).removeClass("desprogramar")
		
	} else {
		// SE NÃO FOI 
		
		console.log("vou programar")
		
		var instance = $(obj).attr("id").split("___")[0]
		console.log("instance: "+instance)
		instance = instance.replace("RECAD","")
		console.log("instance do dia: "+instance)
		var saldo = $("#DIA"+instance+"RECALOC___"+seq).val()
		console.log("saldo: "+saldo)
		saldo = saldo.replace(",",".")
		saldo = parseFloat(saldo)
		console.log("saldo após o float: "+saldo)
		
		// SE SALDO
		if(saldo==0){
			
			console.log("saldo é igual a 0")
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'Não há saldo para ser desprogramado',
				  text: 'Verifique e tente novamente.'
			})
			
		} else if(saldoApontado(seq,dia)){
		// SE NÃO, SE SALDO ALOCADO JÁ FOI APONTADO
			
			
			
		} else {
			// SE NÃO
			
			console.log("saldo é diferente de 0")
			
			// COLOCA A SELEÇÃO
			$(obj).addClass("desprogramar")
		
		}
		
	}
	
}

// VERIFICA SE SALDO ALOCADO JÁ FOI APONTADO PARA A ATIVIDADE
function saldoApontado(seq,dia){
	
	console.log("vou verificar se saldo alocado para a tividade já foi apontado")

	var codMo = $("#CODMORECALOCATV___"+seq).val()
	var codOrdem = $("#CODORDEMRECALOCATV___"+seq).val()
	var codEstrutura = $("#CODESTRUTURARECALOCATV___"+seq).val()
	var idAtvOrdem = $("#IDATVORDEMRECALOCATV___"+seq).val()
	var codColigada = $("#CODCOLIGADAALOCATV___"+seq).val()
	var codFilial = $("#CODFILIALALOCATV___"+seq).val()
	var codAtividade = $("#CODATIVIDADERECALOCATV___"+seq).val()

	console.log("valores. Seq: "+seq+", codMo: "+codMo+", codEstrutura: "+codEstrutura+", idAtvOrdem: "+idAtvOrdem+", codColigada: "+codColigada+", codFilial: "+codFilial+", codAtividade: "+codAtividade+
			", dia: "+dia)
			
	var a1 = DatasetFactory.createConstraint("CODATIVIDADE",codAtividade,codAtividade,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("CODESTRUTURA",codEstrutura,codEstrutura,ConstraintType.MUST)
	var a4 = DatasetFactory.createConstraint("IDATVORDEM",idAtvOrdem,idAtvOrdem,ConstraintType.MUST)
	var a5 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST)
	var a6 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
	var a7 = DatasetFactory.createConstraint("CODMO",codMo,codMo,ConstraintType.MUST)
		
	var constraints = new Array(a1,a2,a3,a4,a5,a6,a7)
	
	var dataset = DatasetFactory.getDataset("dsVerificaApontamento",null,constraints,null)
	var row = dataset.values
	
	// SE RETORNO É NULO OU VAZIO
	if(row=="" || row==null || row==undefined){
		
		console.log("não houve apontamento")
		
		return false
		
	} else {
		// SE NÃO, Á HOUVE APONTAMENTO
		
		console.log("houve apontamento")
		
		return true
		
	}
	
}
	
// BUSCA O SEQ DO SELECIONADO
function buscaSeqSelecionado(){
	
	var seqRet = 0
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSATV___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		//if($("#LINHAPLAN___"+seq).hasClass("selecionado")){
		if($("#PROGRAMANDO___"+seq).is(":checked")){
			
			seqRet = seq
			
		}
		
	})
	
	return seqRet
	
}

// LIMPA A TABELA RAD
function limpaRAD(){
	
	// LIMPA CONTEÚDO DA TABELA
	$("input[id^='OPERADORRAD___']").each(function(){
	
		$(this).parents("tr").remove();
		
	})
	
	$("#THDIA1RAD").html("")
	$("#THDIA2RAD").html("")
	$("#THDIA3RAD").html("")
	$("#THDIA4RAD").html("")
	$("#THDIA5RAD").html("")
	$("#THDIA6RAD").html("")
	$("#THDIA7RAD").html("")
	$("#THDIA8RAD").html("")
	$("#THDIA9RAD").html("")
	$("#THDIA10RAD").html("")
	
	$("#THDIA1RAD").removeClass("visivel")
	$("#THDIA2RAD").removeClass("visivel")
	$("#THDIA3RAD").removeClass("visivel")
	$("#THDIA4RAD").removeClass("visivel")
	$("#THDIA5RAD").removeClass("visivel")
	$("#THDIA6RAD").removeClass("visivel")
	$("#THDIA7RAD").removeClass("visivel")
	$("#THDIA8RAD").removeClass("visivel")
	$("#THDIA9RAD").removeClass("visivel")
	$("#THDIA10RAD").removeClass("visivel")
	
}	

// CONSTRÓI ARRAY DAS CHAPAS SELECIONADAS
function chapasSelecionadas(chapa){
	
	var chapas = new Array()
	
	chapa = chapa.split(";")
	
	for(var i=0; i<chapa.length; i++){
		
		if(!(chapa[i]=="" || chapa[i]==null || chapa[i]==undefined)){
			
			chapas.push(chapa[i])
			
		}
		
	}
	
	console.log("chapas:")
	console.log(chapas)
	
	return chapas
	
}

// CARREGA A TABELA RAD GERAL PARA A ATIVIDADE SELECIONADA
function carregaRADcompleta(){
	
	var myLoading2 = FLUIGC.loading(window);
	
	var dataDe = $("#DATA_DE").val()
	var dataAte = $("#ATE").val()
	
	dataDe = formataDataBanco(dataDe)
	dataAte = formataDataBanco(dataAte)
	
	console.log("dataDe: "+dataDe)
	console.log("dataAte: "+dataAte)
	
	myLoading2.show();
	
	// PREENCHE OS DIAS DA JANELA DE PLANEJAMENTO
	preencheDiasCabecalhoRAD()
	
	// BUSCA O SEQ DO SELECIONADO
	var seq = buscaSeqSelecionado()
	
	var dia1 = $("#THDIA1RAD").text()
	if(!(dia1=="")){
		dia1 = formataDataBanco(dia1)	
	}
	
	var dia2 = $("#THDIA2RAD").text()
	if(!(dia2=="")){
		dia2 = formataDataBanco(dia2)	
	}
	
	var dia3 = $("#THDIA3RAD").text()
	if(!(dia3=="")){
		dia3 = formataDataBanco(dia3)	
	}
	
	var dia4 = $("#THDIA4RAD").text()
	if(!(dia4=="")){
		dia4 = formataDataBanco(dia4)	
	}
	
	var dia5 = $("#THDIA5RAD").text()
	if(!(dia5=="")){
		dia5 = formataDataBanco(dia5)	
	}
	
	var dia6 = $("#THDIA6RAD").text()
	if(!(dia6=="")){
		dia6 = formataDataBanco(dia6)	
	}
	
	var dia7 = $("#THDIA7RAD").text()
	if(!(dia7=="")){
		dia7 = formataDataBanco(dia7)	
	}
	
	var dia8 = $("#THDIA8RAD").text()
	if(!(dia8=="")){
		dia8 = formataDataBanco(dia8)	
	}
	
	var dia9 = $("#THDIA9RAD").text()
	if(!(dia9=="")){
		dia9 = formataDataBanco(dia9)	
	}
	
	var dia10 = $("#THDIA10RAD").text()
	if(!(dia10=="")){
		dia10 = formataDataBanco(dia10)	
	}
	
	// INICIA A OPERAÇÃO DEPOIS DE CARREGAR O LOAD
	setTimeout(function(){
		
		console.log("vou incluir a chapa "+chapas[k])
		
		var codAtividade = $("#CODATIVIDADEATV___"+seq).val()
		var codOrdem = $("#OPATV___"+seq).val()
		
		var a1 = DatasetFactory.createConstraint("CODATIVIDADE",codAtividade,codAtividade,ConstraintType.MUST)
		var a2 = DatasetFactory.createConstraint("DATA_DE",dataDe,dataDe,ConstraintType.MUST)
		var a3 = DatasetFactory.createConstraint("DATA_ATE",dataAte,dataAte,ConstraintType.MUST)
		
		constraints = new Array(a1,a2,a3)
		
		var dataset = DatasetFactory.getDataset("dsRecAptoDispOS",null,constraints,null)
		row = dataset.values
		var count = dataset.values.length
		
		console.log("row: ")
		console.log(row)
		
		// PERCORRE TODOS OS REGISTROS
		for(var i=0; i<count; i++){

			var rep = row[i]
			
			// SE JÁ CONTÉM A CHAPA	
			if(contemChapaRAD(rep["CHAPA"])){
			
				// BUSCA O SEQ DO OPERADOR
				var seqTabela = buscaSeqChapaRAD(rep["CHAPA"])
				
				var dataDisp = rep["DATADISPONIBILIDADE"]
				dataDisp = dataDisp.split(" ")
				dataDisp = dataDisp[0]
				
				console.log("dia1: "+dia1+", dia2: "+dia2+", dia3: "+dia3+", dia4: "+dia4+", dia5: "+dia5+", dia6: "+dia6+
						", dia7: "+dia7+", dia8: "+dia8+", dia9: "+dia9+", dia10: "+dia10)
				
				console.log("dataDisp: "+dataDisp)
				
				// SE DIA1 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia1==dataDisp){
					
					var saldoDisp= rep["DISPONIBILIDADE"]
					var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
					$("#DIA1RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
					
					if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
						
						$("#DIA1RAD___"+seqTabela).val(saldoDisp)
						
						
					} /*else {
						
						$("#DIA1RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA1RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
				// SE DIA2 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia2==dataDisp){

					var saldoDisp = rep["DISPONIBILIDADE"]
					var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
					$("#DIA2RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
					
					if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
					
						$("#DIA2RAD___"+seqTabela).val(saldoDisp)
						
					
					} /*else {
						
						$("#DIA2RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA2RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
				// SE DIA3 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia3==dataDisp){
					
					var saldoDisp = rep["DISPONIBILIDADE"]
					var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
					$("#DIA3RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
					
					if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
					
						$("#DIA3RAD___"+seqTabela).val(saldoDisp)
						
					
					} /*else {
						
						$("#DIA3RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA3RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
				// SE DIA4 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia4==dataDisp){
					
					var saldoDisp = rep["DISPONIBILIDADE"]
					var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
					$("#DIA4RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
					
					if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
					
						$("#DIA4RAD___"+seqTabela).val(saldoDisp)
						
					
					} /*else {
						
						$("#DIA4RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA4RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
				// SE DIA5 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia5==dataDisp){
					
					var saldoDisp = rep["DISPONIBILIDADE"]
					var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
					$("#DIA5RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
					
					if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
					
						$("#DIA5RAD___"+seqTabela).val(saldoDisp)
						
					
					} /*else {
						
						$("#DIA5RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA5RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
				// SE DIA6 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia6==dataDisp){
					
					var saldoDisp = rep["DISPONIBILIDADE"]
					var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
					$("#DIA6RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
					
					if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
					
						$("#DIA6RAD___"+seqTabela).val(saldoDisp)
						
					
					} /*else {
						
						$("#DIA6RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA6RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
				// SE DIA7 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia7==dataDisp){
					
					var saldoDisp = rep["DISPONIBILIDADE"]
					var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
					$("#DIA7RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
					
					if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
					
						$("#DIA7RAD___"+seqTabela).val(saldoDisp)
						
					
					} /*else {
						
						$("#DIA7RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA7RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
				// SE DIA8 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia8==dataDisp){
					
					var saldoDisp = rep["DISPONIBILIDADE"]
					var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
					$("#DIA8RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
					
					if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
					
						$("#DIA8RAD___"+seqTabela).val(saldoDisp)
						
					
					} /*else {
						
						$("#DIA8RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA8RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
				// SE DIA9 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia9==dataDisp){
					
					var saldoDisp = rep["DISPONIBILIDADE"]
					var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
					$("#DIA9RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
					
					if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
					
						$("#DIA9RAD___"+seqTabela).val(saldoDisp)
						
						
					
					} /*else {
						
						$("#DIA9RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA9RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
				// SE DIA10 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia10==dataDisp){
					
					var saldoDisp = rep["DISPONIBILIDADE"]
					var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
					$("#DIA10RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
					
					if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
					
						$("#DIA10RAD___"+seqTabela).val(saldoDisp)

					
					} /*else {
						
						$("#DIA10RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA10RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
			} else {
			// SE NÃO 
			
				var seqTabela = addRAD()
				
				$("#OPERADORRAD___"+seqTabela).val(rep["NOME"])
				$("#CHAPARAD___"+seqTabela).val(rep["CHAPA"])
				
				$("#DIA1RADREAL___"+seqTabela).val(dia1)
				$("#DIA2RADREAL___"+seqTabela).val(dia2)
				$("#DIA3RADREAL___"+seqTabela).val(dia3)
				$("#DIA4RADREAL___"+seqTabela).val(dia4)
				$("#DIA5RADREAL___"+seqTabela).val(dia5)
				$("#DIA6RADREAL___"+seqTabela).val(dia6)
				$("#DIA7RADREAL___"+seqTabela).val(dia7)
				$("#DIA8RADREAL___"+seqTabela).val(dia8)
				$("#DIA9RADREAL___"+seqTabela).val(dia9)
				$("#DIA10RADREAL___"+seqTabela).val(dia10)
				
				$("#DIA1RAD___"+seqTabela).val(0)
				$("#DIA2RAD___"+seqTabela).val(0)
				$("#DIA3RAD___"+seqTabela).val(0)
				$("#DIA4RAD___"+seqTabela).val(0)
				$("#DIA5RAD___"+seqTabela).val(0)
				$("#DIA6RAD___"+seqTabela).val(0)
				$("#DIA7RAD___"+seqTabela).val(0)
				$("#DIA8RAD___"+seqTabela).val(0)
				$("#DIA9RAD___"+seqTabela).val(0)
				$("#DIA10RAD___"+seqTabela).val(0)

				$("#DIA1RADALOC___"+seqTabela).val(0)
				$("#DIA2RADALOC___"+seqTabela).val(0)
				$("#DIA3RADALOC___"+seqTabela).val(0)
				$("#DIA4RADALOC___"+seqTabela).val(0)
				$("#DIA5RADALOC___"+seqTabela).val(0)
				$("#DIA6RADALOC___"+seqTabela).val(0)
				$("#DIA7RADALOC___"+seqTabela).val(0)
				$("#DIA8RADALOC___"+seqTabela).val(0)
				$("#DIA9RADALOC___"+seqTabela).val(0)
				$("#DIA10RADALOC___"+seqTabela).val(0)
				
				var dataDisp = rep["DATADISPONIBILIDADE"]
				dataDisp = dataDisp.split(" ")
				dataDisp = dataDisp[0]
				
				console.log("dia1: "+dia1+", dia2: "+dia2+", dia3: "+dia3+", dia4: "+dia4+", dia5: "+dia5+", dia6: "+dia6+
						", dia7: "+dia7+", dia8: "+dia8+", dia9: "+dia9+", dia10: "+dia10)
				
				console.log("dataDisp: "+dataDisp)
				
				// SE DIA1 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia1==dataDisp){
					
					var saldoDisp= rep["DISPONIBILIDADE"]
					var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
					
					if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
						
						$("#DIA1RAD___"+seqTabela).val(saldoDisp)
						$("#DIA1RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
						
					} /*else {
						
						$("#DIA1RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA1RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
				// SE DIA2 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia2==dataDisp){

					var saldoDisp = rep["DISPONIBILIDADE"]
					var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
					$("#DIA2RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
					
					if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
					
						$("#DIA2RAD___"+seqTabela).val(saldoDisp)
					
					} /*else {
						
						$("#DIA2RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA2RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
				// SE DIA3 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia3==dataDisp){
					
					var saldoDisp = rep["DISPONIBILIDADE"]
					var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
					$("#DIA3RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
					
					if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
					
						$("#DIA3RAD___"+seqTabela).val(saldoDisp)
					
					} /*else {
						
						$("#DIA3RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA3RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
				// SE DIA4 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia4==dataDisp){
					
					var saldoDisp = rep["DISPONIBILIDADE"]
					var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
					$("#DIA4RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
					
					if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
					
						$("#DIA4RAD___"+seqTabela).val(saldoDisp)
					
					} /*else {
						
						$("#DIA4RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA4RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
				// SE DIA5 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia5==dataDisp){
					
					var saldoDisp = rep["DISPONIBILIDADE"]
					var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
					$("#DIA5RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
					
					if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
					
						$("#DIA5RAD___"+seqTabela).val(saldoDisp)
					
					} /*else {
						
						$("#DIA5RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA5RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
				// SE DIA6 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia6==dataDisp){
					
					var saldoDisp = rep["DISPONIBILIDADE"]
					var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
					$("#DIA6RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
					
					if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
					
						$("#DIA6RAD___"+seqTabela).val(saldoDisp)
					
					} /*else {
						
						$("#DIA6RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA6RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
				// SE DIA7 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia7==dataDisp){
					
					var saldoDisp = rep["DISPONIBILIDADE"]
					var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
					$("#DIA7RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
					
					if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
					
						$("#DIA7RAD___"+seqTabela).val(saldoDisp)
					
					} /*else {
						
						$("#DIA7RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA7RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
				// SE DIA8 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia8==dataDisp){
					
					var saldoDisp = rep["DISPONIBILIDADE"]
					var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
					$("#DIA8RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
					
					if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
					
						$("#DIA8RAD___"+seqTabela).val(saldoDisp)
					
					} /*else {
						
						$("#DIA8RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA8RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
				// SE DIA9 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia9==dataDisp){
					
					var saldoDisp = rep["DISPONIBILIDADE"]
					var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
					$("#DIA9RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
					
					if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
					
						$("#DIA9RAD___"+seqTabela).val(saldoDisp)	
					
					} /*else {
						
						$("#DIA9RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA9RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
				// SE DIA10 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia10==dataDisp){
					
					var saldoDisp = rep["DISPONIBILIDADE"]
					var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
					$("#DIA10RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
					
					if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
					
						$("#DIA10RAD___"+seqTabela).val(saldoDisp)
					
					} /*else {
						
						$("#DIA10RECAPTOSDISPATV___"+seqModal).val(0)
						
					}
					
				} else {
					
					$("#DIA10RECAPTOSDISPATV___"+seqModal).val(0)*/
					
				}
				
			}
						
			// CALCULA SOMA DOS RECURSOS ALOCADOS
			//calculaSomaRecAptosDisp(rowSoma)
			
		}
			
		$(".RAD").hide()
		
				
	},500)
	
	// DESATIVA O LOAD
	setTimeout(function(){
		
		myLoading2.hide();
		$("#ICONREDUZIR").click()
		
	}, 500)

}

// PERCORRE A TABELA RAD E EXIBE APENAS A CHAPA INFORMADA
function exibeChapaRAD(chapas){
	
	// PERCORRE TABELA
	$("input[id^='CHAPARAD___']").each(function(){
	
		var seq = $(this).attr("id").split("___")[1]
		
		var chapaTabela = $("#CHAPARAD___"+seq).val()
		
		var ret = false
		
		// PERCORRE TODAS AS CHAPAS
		for(var i=0; i< chapas.length; i++){
			
			// SE É A MESMA CHAPA
			if(chapaTabela==chapas[i]){
				
				$("#LINHARAD___"+seq).show()
				ret = true
				
			}
			
		}
		
		// SE CHAPA NÃO FOI SELECIONADA
		if(ret){
			
			$("#LINHARAD___"+seq).hide()
			
		}
		
	})
	
}

// CARREGA RAD DA CHAPA
function carregaRADChapa(chapa){
		
		var myLoading2 = FLUIGC.loading(window);
		
		var dataDe = $("#DATA_DE").val()
		var dataAte = $("#ATE").val()
		
		dataDe = formataDataBanco(dataDe)
		dataAte = formataDataBanco(dataAte)
		
		console.log("dataDe: "+dataDe)
		console.log("dataAte: "+dataAte)
		
		myLoading2.show();
		
		// PREENCHE OS DIAS DA JANELA DE PLANEJAMENTO
		preencheDiasCabecalhoRAD()
		
		// BUSCA O SEQ DO SELECIONADO
		var seq = buscaSeqSelecionado()
				
		//var rowSoma = addSomaRecAptoDisp()
		
		// PREENCHE OS DIAS DA JANELA DE PLANEJAMENTO
		//preencheDiasSomaRecAptoDisp()
		
		var dia1 = $("#THDIA1RAD").text()
		if(!(dia1=="")){
			dia1 = formataDataBanco(dia1)	
		}
		
		var dia2 = $("#THDIA2RAD").text()
		if(!(dia2=="")){
			dia2 = formataDataBanco(dia2)	
		}
		
		var dia3 = $("#THDIA3RAD").text()
		if(!(dia3=="")){
			dia3 = formataDataBanco(dia3)	
		}
		
		var dia4 = $("#THDIA4RAD").text()
		if(!(dia4=="")){
			dia4 = formataDataBanco(dia4)	
		}
		
		var dia5 = $("#THDIA5RAD").text()
		if(!(dia5=="")){
			dia5 = formataDataBanco(dia5)	
		}
		
		var dia6 = $("#THDIA6RAD").text()
		if(!(dia6=="")){
			dia6 = formataDataBanco(dia6)	
		}
		
		var dia7 = $("#THDIA7RAD").text()
		if(!(dia7=="")){
			dia7 = formataDataBanco(dia7)	
		}
		
		var dia8 = $("#THDIA8RAD").text()
		if(!(dia8=="")){
			dia8 = formataDataBanco(dia8)	
		}
		
		var dia9 = $("#THDIA9RAD").text()
		if(!(dia9=="")){
			dia9 = formataDataBanco(dia9)	
		}
		
		var dia10 = $("#THDIA10RAD").text()
		if(!(dia10=="")){
			dia10 = formataDataBanco(dia10)	
		}
		
		// INICIA A OPERAÇÃO DEPOIS DE CARREGAR O LOAD
		setTimeout(function(){
			
			// PERCORRE TODAS AS CHAPAS SELECIONADAS
			//for(var k=0; k<chapas.length; k++){
				
				//console.log("vou incluir a chapa "+chapas[k])
				
				var codAtividade = $("#CODATIVIDADEATV___"+seq).val()
				var codOrdem = $("#OPATV___"+seq).val()
				
				console.log("codAtividade: "+codAtividade+", dataDe: "+dataDe+", dataAte: "+dataAte+", chapa: "+chapa)
				
				var a1 = DatasetFactory.createConstraint("CODATIVIDADE",codAtividade,codAtividade,ConstraintType.MUST)
				var a2 = DatasetFactory.createConstraint("DATA_DE",dataDe,dataDe,ConstraintType.MUST)
				var a3 = DatasetFactory.createConstraint("DATA_ATE",dataAte,dataAte,ConstraintType.MUST)
				var a4 = DatasetFactory.createConstraint("CHAPA",chapa,chapa,ConstraintType.MUST)
				
				var constraints = new Array(a1,a2,a3,a4)
				
				var dataset = DatasetFactory.getDataset("dsRadOS",null,constraints,null)
				var row = dataset.values
				var count = dataset.values.length
				
				console.log("row: ")
				console.log(row)
				
				// PERCORRE TODOS OS REGISTROS
				for(var i=0; i<count; i++){

					var rep = row[i]
					
					// SE JÁ CONTÉM A CHAPA	
					if(contemChapaRAD(rep["CHAPA"]) && !(rep["CHAPA"]=="" || rep["CHAPA"]=="null" || rep["CHAPA"]=="NULL" || rep["CHAPA"]==null || rep["CHAPA"]==undefined)){
					
						// BUSCA O SEQ DO OPERADOR
						var seqTabela = buscaSeqChapaRAD(rep["CHAPA"])
						
						var dataDisp = rep["DATADISPONIBILIDADE"]
						dataDisp = dataDisp.split(" ")
						dataDisp = dataDisp[0]
						
						console.log("dia1: "+dia1+", dia2: "+dia2+", dia3: "+dia3+", dia4: "+dia4+", dia5: "+dia5+", dia6: "+dia6+
								", dia7: "+dia7+", dia8: "+dia8+", dia9: "+dia9+", dia10: "+dia10)
						
						console.log("dataDisp: "+dataDisp)
						
						// SE DIA1 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia1==dataDisp){
							
							var saldoDisp= rep["SALDO"]
							var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
							$("#DIA1RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
								
								saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

								$("#DIA1RAD___"+seqTabela).val(saldoDisp)
								
								
							} /*else {
								
								$("#DIA1RECAPTOSDISPATV___"+seqModal).val(0)
								
							}
							
						} else {
							
							$("#DIA1RECAPTOSDISPATV___"+seqModal).val(0)*/
							
						}
						
						// SE DIA2 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia2==dataDisp){

							var saldoDisp = rep["SALDO"]
							var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
							$("#DIA2RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
								
								saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

								$("#DIA2RAD___"+seqTabela).val(saldoDisp)
								
							
							} /*else {
								
								$("#DIA2RECAPTOSDISPATV___"+seqModal).val(0)
								
							}
							
						} else {
							
							$("#DIA2RECAPTOSDISPATV___"+seqModal).val(0)*/
							
						}
						
						// SE DIA3 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia3==dataDisp){
							
							var saldoDisp = rep["SALDO"]
							var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
							$("#DIA3RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
								
								saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

								$("#DIA3RAD___"+seqTabela).val(saldoDisp)
								
							
							} /*else {
								
								$("#DIA3RECAPTOSDISPATV___"+seqModal).val(0)
								
							}
							
						} else {
							
							$("#DIA3RECAPTOSDISPATV___"+seqModal).val(0)*/
							
						}
						
						// SE DIA4 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia4==dataDisp){
							
							var saldoDisp = rep["SALDO"]
							var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
							$("#DIA4RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
								saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

								$("#DIA4RAD___"+seqTabela).val(saldoDisp)
								
							
							} /*else {
								
								$("#DIA4RECAPTOSDISPATV___"+seqModal).val(0)
								
							}
							
						} else {
							
							$("#DIA4RECAPTOSDISPATV___"+seqModal).val(0)*/
							
						}
						
						// SE DIA5 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia5==dataDisp){
							
							var saldoDisp = rep["SALDO"]
							var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
							$("#DIA5RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))

							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
								
								saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

								$("#DIA5RAD___"+seqTabela).val(saldoDisp)
								
							
							} /*else {
								
								$("#DIA5RECAPTOSDISPATV___"+seqModal).val(0)
								
							}
							
						} else {
							
							$("#DIA5RECAPTOSDISPATV___"+seqModal).val(0)*/
							
						}
						
						// SE DIA6 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia6==dataDisp){
							
							var saldoDisp = rep["SALDO"]
							var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
							$("#DIA6RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
								
								saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

								$("#DIA6RAD___"+seqTabela).val(saldoDisp)
								
							
							} /*else {
								
								$("#DIA6RECAPTOSDISPATV___"+seqModal).val(0)
								
							}
							
						} else {
							
							$("#DIA6RECAPTOSDISPATV___"+seqModal).val(0)*/
							
						}
						
						// SE DIA7 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia7==dataDisp){
							
							var saldoDisp = rep["SALDO"]
							var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
							$("#DIA7RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
								
								saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

								$("#DIA7RAD___"+seqTabela).val(saldoDisp)
								
							
							} /*else {
								
								$("#DIA7RECAPTOSDISPATV___"+seqModal).val(0)
								
							}
							
						} else {
							
							$("#DIA7RECAPTOSDISPATV___"+seqModal).val(0)*/
							
						}
						
						// SE DIA8 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia8==dataDisp){
							
							var saldoDisp = rep["SALDO"]
							var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
							$("#DIA8RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
								
								saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

								$("#DIA8RAD___"+seqTabela).val(saldoDisp)
								
							
							} /*else {
								
								$("#DIA8RECAPTOSDISPATV___"+seqModal).val(0)
								
							}
							
						} else {
							
							$("#DIA8RECAPTOSDISPATV___"+seqModal).val(0)*/
							
						}
						
						// SE DIA9 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia9==dataDisp){
							
							var saldoDisp = rep["SALDO"]
							var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
							$("#DIA9RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
								
								saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

								$("#DIA9RAD___"+seqTabela).val(saldoDisp)
								
							
							} /*else {
								
								$("#DIA9RECAPTOSDISPATV___"+seqModal).val(0)
								
							}
							
						} else {
							
							$("#DIA9RECAPTOSDISPATV___"+seqModal).val(0)*/
							
						}
						
						// SE DIA10 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia10==dataDisp){
							
							var saldoDisp = rep["SALDO"]
							var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
							$("#DIA10RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
								
								saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

								$("#DIA10RAD___"+seqTabela).val(saldoDisp)
								
							
							} /*else {
								
								$("#DIA10RECAPTOSDISPATV___"+seqModal).val(0)
								
							}
							
						} else {
							
							$("#DIA10RECAPTOSDISPATV___"+seqModal).val(0)*/
							
						}
						
					} else {
					// SE NÃO 
					
						if(!(rep["CHAPA"]=="" || rep["CHAPA"]=="null" || rep["CHAPA"]=="NULL" || rep["CHAPA"]==null || rep["CHAPA"]==undefined)){
							
							var seqTabela = addRAD()
							
							$("#OPERADORRAD___"+seqTabela).val(rep["NOME"])
							$("#CHAPARAD___"+seqTabela).val(rep["CHAPA"])
							
							$("#DIA1RADREAL___"+seqTabela).val(dia1)
							$("#DIA2RADREAL___"+seqTabela).val(dia2)
							$("#DIA3RADREAL___"+seqTabela).val(dia3)
							$("#DIA4RADREAL___"+seqTabela).val(dia4)
							$("#DIA5RADREAL___"+seqTabela).val(dia5)
							$("#DIA6RADREAL___"+seqTabela).val(dia6)
							$("#DIA7RADREAL___"+seqTabela).val(dia7)
							$("#DIA8RADREAL___"+seqTabela).val(dia8)
							$("#DIA9RADREAL___"+seqTabela).val(dia9)
							$("#DIA10RADREAL___"+seqTabela).val(dia10)
							
							$("#DIA1RAD___"+seqTabela).val(0)
							$("#DIA2RAD___"+seqTabela).val(0)
							$("#DIA3RAD___"+seqTabela).val(0)
							$("#DIA4RAD___"+seqTabela).val(0)
							$("#DIA5RAD___"+seqTabela).val(0)
							$("#DIA6RAD___"+seqTabela).val(0)
							$("#DIA7RAD___"+seqTabela).val(0)
							$("#DIA8RAD___"+seqTabela).val(0)
							$("#DIA9RAD___"+seqTabela).val(0)
							$("#DIA10RAD___"+seqTabela).val(0)

							$("#DIA1RADALOC___"+seqTabela).val(0)
							$("#DIA2RADALOC___"+seqTabela).val(0)
							$("#DIA3RADALOC___"+seqTabela).val(0)
							$("#DIA4RADALOC___"+seqTabela).val(0)
							$("#DIA5RADALOC___"+seqTabela).val(0)
							$("#DIA6RADALOC___"+seqTabela).val(0)
							$("#DIA7RADALOC___"+seqTabela).val(0)
							$("#DIA8RADALOC___"+seqTabela).val(0)
							$("#DIA9RADALOC___"+seqTabela).val(0)
							$("#DIA10RADALOC___"+seqTabela).val(0)

							
							var dataDisp = rep["DATADISPONIBILIDADE"]
							dataDisp = dataDisp.split(" ")
							dataDisp = dataDisp[0]
							
							console.log("dia1: "+dia1+", dia2: "+dia2+", dia3: "+dia3+", dia4: "+dia4+", dia5: "+dia5+", dia6: "+dia6+
									", dia7: "+dia7+", dia8: "+dia8+", dia9: "+dia9+", dia10: "+dia10)
							
							console.log("dataDisp: "+dataDisp)
							
							// SE DIA1 É IGUAL A DATA DE DISPONIBILIDADE
							if(dia1==dataDisp){
								
								var saldoDisp= rep["SALDO"]
								var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
								
								if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
										
									saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

									$("#DIA1RAD___"+seqTabela).val(saldoDisp)
									$("#DIA1RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
									
								} /*else {
									
									$("#DIA1RECAPTOSDISPATV___"+seqModal).val(0)
									
								}
								
							} else {
								
								$("#DIA1RECAPTOSDISPATV___"+seqModal).val(0)*/
								
							}
							
							// SE DIA2 É IGUAL A DATA DE DISPONIBILIDADE
							if(dia2==dataDisp){
		
								var saldoDisp = rep["SALDO"]
								var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
								$("#DIA2RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))

								if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
									
									saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

									$("#DIA2RAD___"+seqTabela).val(saldoDisp)
								
								} /*else {
									
									$("#DIA2RECAPTOSDISPATV___"+seqModal).val(0)
									
								}
								
							} else {
								
								$("#DIA2RECAPTOSDISPATV___"+seqModal).val(0)*/
								
							}
							
							// SE DIA3 É IGUAL A DATA DE DISPONIBILIDADE
							if(dia3==dataDisp){
								
								var saldoDisp = rep["SALDO"]
								var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
								$("#DIA3RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
								
								if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
									
									saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

									$("#DIA3RAD___"+seqTabela).val(saldoDisp)
									
								
								} /*else {
									
									$("#DIA3RECAPTOSDISPATV___"+seqModal).val(0)
									
								}
								
							} else {
								
								$("#DIA3RECAPTOSDISPATV___"+seqModal).val(0)*/
								
							}
							
							// SE DIA4 É IGUAL A DATA DE DISPONIBILIDADE
							if(dia4==dataDisp){
								
								var saldoDisp = rep["SALDO"]
								var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
								$("#DIA4RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
								
								if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
									
									saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

									$("#DIA4RAD___"+seqTabela).val(saldoDisp)
									
								
								} /*else {
									
									$("#DIA4RECAPTOSDISPATV___"+seqModal).val(0)
									
								}
								
							} else {
								
								$("#DIA4RECAPTOSDISPATV___"+seqModal).val(0)*/
								
							}
							
							// SE DIA5 É IGUAL A DATA DE DISPONIBILIDADE
							if(dia5==dataDisp){
								
								var saldoDisp = rep["SALDO"]
								var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
								$("#DIA5RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
								
								if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
									
									saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

									$("#DIA5RAD___"+seqTabela).val(saldoDisp)
									
								
								} /*else {
									
									$("#DIA5RECAPTOSDISPATV___"+seqModal).val(0)
									
								}
								
							} else {
								
								$("#DIA5RECAPTOSDISPATV___"+seqModal).val(0)*/
								
							}
							
							// SE DIA6 É IGUAL A DATA DE DISPONIBILIDADE
							if(dia6==dataDisp){
								
								var saldoDisp = rep["SALDO"]
								var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
								$("#DIA6RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
								
								if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
									
									saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

									$("#DIA6RAD___"+seqTabela).val(saldoDisp)
									
								
								} /*else {
									
									$("#DIA6RECAPTOSDISPATV___"+seqModal).val(0)
									
								}
								
							} else {
								
								$("#DIA6RECAPTOSDISPATV___"+seqModal).val(0)*/
								
							}
							
							// SE DIA7 É IGUAL A DATA DE DISPONIBILIDADE
							if(dia7==dataDisp){
								
								var saldoDisp = rep["SALDO"]
								var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
								$("#DIA7RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
								
								if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
									
									saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

									$("#DIA7RAD___"+seqTabela).val(saldoDisp)
									
								
								} /*else {
									
									$("#DIA7RECAPTOSDISPATV___"+seqModal).val(0)
									
								}
								
							} else {
								
								$("#DIA7RECAPTOSDISPATV___"+seqModal).val(0)*/
								
							}
							
							// SE DIA8 É IGUAL A DATA DE DISPONIBILIDADE
							if(dia8==dataDisp){
								
								var saldoDisp = rep["SALDO"]
								var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
								$("#DIA8RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
								
								if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
									
									saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

									$("#DIA8RAD___"+seqTabela).val(saldoDisp)

								
								} /*else {
									
									$("#DIA8RECAPTOSDISPATV___"+seqModal).val(0)
									
								}
								
							} else {
								
								$("#DIA8RECAPTOSDISPATV___"+seqModal).val(0)*/
								
							}
							
							// SE DIA9 É IGUAL A DATA DE DISPONIBILIDADE
							if(dia9==dataDisp){
								
								var saldoDisp = rep["SALDO"]
								var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
								$("#DIA9RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
								
								if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
								
									saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")
									
									$("#DIA9RAD___"+seqTabela).val(saldoDisp)
								
								} /*else {
									
									$("#DIA9RECAPTOSDISPATV___"+seqModal).val(0)
									
								}
								
							} else {
								
								$("#DIA9RECAPTOSDISPATV___"+seqModal).val(0)*/
								
							}
							
							// SE DIA10 É IGUAL A DATA DE DISPONIBILIDADE
							if(dia10==dataDisp){
								
								var saldoDisp = rep["SALDO"]
								var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
								$("#DIA10RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
								
								if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
									
									saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

									$("#DIA10RAD___"+seqTabela).val(saldoDisp)
								
								} /*else {
									
									$("#DIA10RECAPTOSDISPATV___"+seqModal).val(0)
									
								}
								
							} else {
								
								$("#DIA10RECAPTOSDISPATV___"+seqModal).val(0)*/
								
							}
							
						}
						
					}
					
				}
				
			//}
			
			// SE A TABELA RAD TEM ITENS
			if(radTemItens()){
				
				$(".RAD").show()
				
			} else {
				// SE NÃO
				
				$(".RAD").hide()
			
			}
					
		},500)
		
		// DESATIVA O LOAD
		setTimeout(function(){
			
			myLoading2.hide();
			$("#ICONREDUZIR").click()
			
		}, 500)
	
	
}

// CARREGA AS INFORMAÇÕES DO RECURSO APTO DISPONIVEL PARA A ATIVIDADE
function carregaRAD(chapa){
	
	var myLoading2 = FLUIGC.loading(window);
	
	var dataDe = $("#DATA_DE").val()
	var dataAte = $("#ATE").val()
	
	dataDe = formataDataBanco(dataDe)
	dataAte = formataDataBanco(dataAte)
	
	console.log("dataDe: "+dataDe)
	console.log("dataAte: "+dataAte)
	
	myLoading2.show();
	
	// PREENCHE OS DIAS DA JANELA DE PLANEJAMENTO
	preencheDiasCabecalhoRAD()
	
	// BUSCA O SEQ DO SELECIONADO
	var seq = buscaSeqSelecionado()
	
	var chapas = chapasSelecionadas(chapa)
	
	//var rowSoma = addSomaRecAptoDisp()
	
	// PREENCHE OS DIAS DA JANELA DE PLANEJAMENTO
	//preencheDiasSomaRecAptoDisp()
	
	var dia1 = $("#THDIA1RAD").text()
	if(!(dia1=="")){
		dia1 = formataDataBanco(dia1)	
	}
	
	var dia2 = $("#THDIA2RAD").text()
	if(!(dia2=="")){
		dia2 = formataDataBanco(dia2)	
	}
	
	var dia3 = $("#THDIA3RAD").text()
	if(!(dia3=="")){
		dia3 = formataDataBanco(dia3)	
	}
	
	var dia4 = $("#THDIA4RAD").text()
	if(!(dia4=="")){
		dia4 = formataDataBanco(dia4)	
	}
	
	var dia5 = $("#THDIA5RAD").text()
	if(!(dia5=="")){
		dia5 = formataDataBanco(dia5)	
	}
	
	var dia6 = $("#THDIA6RAD").text()
	if(!(dia6=="")){
		dia6 = formataDataBanco(dia6)	
	}
	
	var dia7 = $("#THDIA7RAD").text()
	if(!(dia7=="")){
		dia7 = formataDataBanco(dia7)	
	}
	
	var dia8 = $("#THDIA8RAD").text()
	if(!(dia8=="")){
		dia8 = formataDataBanco(dia8)	
	}
	
	var dia9 = $("#THDIA9RAD").text()
	if(!(dia9=="")){
		dia9 = formataDataBanco(dia9)	
	}
	
	var dia10 = $("#THDIA10RAD").text()
	if(!(dia10=="")){
		dia10 = formataDataBanco(dia10)	
	}
	
	// INICIA A OPERAÇÃO DEPOIS DE CARREGAR O LOAD
	setTimeout(function(){
		
		// PERCORRE TODAS AS CHAPAS SELECIONADAS
		for(var k=0; k<chapas.length; k++){
			
			console.log("vou incluir a chapa "+chapas[k])
			
			var codAtividade = $("#CODATIVIDADEATV___"+seq).val()
			var codOrdem = $("#OPATV___"+seq).val()
			
			console.log("codAtividade: "+codAtividade+", dataDe: "+dataDe+", dataAte: "+dataAte+", chapa: "+chapas[k])
			
			var a1 = DatasetFactory.createConstraint("CODATIVIDADE",codAtividade,codAtividade,ConstraintType.MUST)
			var a2 = DatasetFactory.createConstraint("DATA_DE",dataDe,dataDe,ConstraintType.MUST)
			var a3 = DatasetFactory.createConstraint("DATA_ATE",dataAte,dataAte,ConstraintType.MUST)
			var a4 = DatasetFactory.createConstraint("CHAPA",chapas[k],chapas[k],ConstraintType.MUST)
			
			constraints = new Array(a1,a2,a3,a4)
			
			var dataset = DatasetFactory.getDataset("dsRadOS",null,constraints,null)
			row = dataset.values
			var count = dataset.values.length
			
			console.log("row: ")
			console.log(row)
			
			// PERCORRE TODOS OS REGISTROS
			for(var i=0; i<count; i++){

				var rep = row[i]
				
				// SE JÁ CONTÉM A CHAPA	
				if(contemChapaRAD(rep["CHAPA"]) && !(rep["CHAPA"]=="" || rep["CHAPA"]=="null" || rep["CHAPA"]=="NULL" || rep["CHAPA"]==null || rep["CHAPA"]==undefined)){
				
					// BUSCA O SEQ DO OPERADOR
					var seqTabela = buscaSeqChapaRAD(rep["CHAPA"])
					
					var dataDisp = rep["DATADISPONIBILIDADE"]
					dataDisp = dataDisp.split(" ")
					dataDisp = dataDisp[0]
					
					console.log("dia1: "+dia1+", dia2: "+dia2+", dia3: "+dia3+", dia4: "+dia4+", dia5: "+dia5+", dia6: "+dia6+
							", dia7: "+dia7+", dia8: "+dia8+", dia9: "+dia9+", dia10: "+dia10)
					
					console.log("dataDisp: "+dataDisp)
					
					// SE DIA1 É IGUAL A DATA DE DISPONIBILIDADE
					if(dia1==dataDisp){
						
						var saldoDisp= rep["SALDO"]

						var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
						$("#DIA1RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
						
						if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
							saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

							$("#DIA1RAD___"+seqTabela).val(saldoDisp)
							
							
						} /*else {
							
							$("#DIA1RECAPTOSDISPATV___"+seqModal).val(0)
							
						}
						
					} else {
						
						$("#DIA1RECAPTOSDISPATV___"+seqModal).val(0)*/
						
					}
					
					// SE DIA2 É IGUAL A DATA DE DISPONIBILIDADE
					if(dia2==dataDisp){

						var saldoDisp = rep["SALDO"]
						var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
						$("#DIA2RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
						
						if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
							saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

							$("#DIA2RAD___"+seqTabela).val(saldoDisp)
							
						
						} /*else {
							
							$("#DIA2RECAPTOSDISPATV___"+seqModal).val(0)
							
						}
						
					} else {
						
						$("#DIA2RECAPTOSDISPATV___"+seqModal).val(0)*/
						
					}
					
					// SE DIA3 É IGUAL A DATA DE DISPONIBILIDADE
					if(dia3==dataDisp){
						
						var saldoDisp = rep["SALDO"]
						var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
						$("#DIA3RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
						
						if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
							saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

							$("#DIA3RAD___"+seqTabela).val(saldoDisp)
							
							
						} /*else {
							
							$("#DIA3RECAPTOSDISPATV___"+seqModal).val(0)
							
						}
						
					} else {
						
						$("#DIA3RECAPTOSDISPATV___"+seqModal).val(0)*/
						
					}
					
					// SE DIA4 É IGUAL A DATA DE DISPONIBILIDADE
					if(dia4==dataDisp){
						
						var saldoDisp = rep["SALDO"]
						var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
						$("#DIA4RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
						
						if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
						
							saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

							$("#DIA4RAD___"+seqTabela).val(saldoDisp)
							
						
						} /*else {
							
							$("#DIA4RECAPTOSDISPATV___"+seqModal).val(0)
							
						}
						
					} else {
						
						$("#DIA4RECAPTOSDISPATV___"+seqModal).val(0)*/
						
					}
					
					// SE DIA5 É IGUAL A DATA DE DISPONIBILIDADE
					if(dia5==dataDisp){
						
						var saldoDisp = rep["SALDO"]
						var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
						$("#DIA5RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
						
						if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
							saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

							$("#DIA5RAD___"+seqTabela).val(saldoDisp)
							

						} /*else {
							
							$("#DIA5RECAPTOSDISPATV___"+seqModal).val(0)
							
						}
						
					} else {
						
						$("#DIA5RECAPTOSDISPATV___"+seqModal).val(0)*/
						
					}
					
					// SE DIA6 É IGUAL A DATA DE DISPONIBILIDADE
					if(dia6==dataDisp){
						
						var saldoDisp = rep["SALDO"]
						var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
						$("#DIA6RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
						
						if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
							saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

							$("#DIA6RAD___"+seqTabela).val(saldoDisp)
							
						
						} /*else {
							
							$("#DIA6RECAPTOSDISPATV___"+seqModal).val(0)
							
						}
						
					} else {
						
						$("#DIA6RECAPTOSDISPATV___"+seqModal).val(0)*/
						
					}
					
					// SE DIA7 É IGUAL A DATA DE DISPONIBILIDADE
					if(dia7==dataDisp){
						
						var saldoDisp = rep["SALDO"]
						var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
						$("#DIA7RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
						
						if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
							saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

							$("#DIA7RAD___"+seqTabela).val(saldoDisp)
							
						
						} /*else {
							
							$("#DIA7RECAPTOSDISPATV___"+seqModal).val(0)
							
						}
						
					} else {
						
						$("#DIA7RECAPTOSDISPATV___"+seqModal).val(0)*/
						
					}
					
					// SE DIA8 É IGUAL A DATA DE DISPONIBILIDADE
					if(dia8==dataDisp){
						
						var saldoDisp = rep["SALDO"]
						var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
						$("#DIA8RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))

						
						if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
							saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

							$("#DIA8RAD___"+seqTabela).val(saldoDisp)
							
						
						} /*else {
							
							$("#DIA8RECAPTOSDISPATV___"+seqModal).val(0)
							
						}
						
					} else {
						
						$("#DIA8RECAPTOSDISPATV___"+seqModal).val(0)*/
						
					}
					
					// SE DIA9 É IGUAL A DATA DE DISPONIBILIDADE
					if(dia9==dataDisp){
						
						var saldoDisp = rep["SALDO"]
						var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
						$("#DIA9RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
						
						if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
							saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

							$("#DIA9RAD___"+seqTabela).val(saldoDisp)
							
						
						} /*else {
							
							$("#DIA9RECAPTOSDISPATV___"+seqModal).val(0)
							
						}
						
					} else {
						
						$("#DIA9RECAPTOSDISPATV___"+seqModal).val(0)*/
						
					}
					
					// SE DIA10 É IGUAL A DATA DE DISPONIBILIDADE
					if(dia10==dataDisp){
						
						var saldoDisp = rep["SALDO"]
						var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
						$("#DIA10RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
						
						if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
							saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

							$("#DIA10RAD___"+seqTabela).val(saldoDisp)
							
						
						} /*else {
							
							$("#DIA10RECAPTOSDISPATV___"+seqModal).val(0)
							
						}
						
					} else {
						
						$("#DIA10RECAPTOSDISPATV___"+seqModal).val(0)*/
						
					}
					
				} else {
				// SE NÃO 
				
				
						
					var seqTabela = addRAD()
					
					$("#OPERADORRAD___"+seqTabela).val(rep["NOME"])
					$("#CHAPARAD___"+seqTabela).val(rep["CHAPA"])
					
					$("#DIA1RADREAL___"+seqTabela).val(dia1)
					$("#DIA2RADREAL___"+seqTabela).val(dia2)
					$("#DIA3RADREAL___"+seqTabela).val(dia3)
					$("#DIA4RADREAL___"+seqTabela).val(dia4)
					$("#DIA5RADREAL___"+seqTabela).val(dia5)
					$("#DIA6RADREAL___"+seqTabela).val(dia6)
					$("#DIA7RADREAL___"+seqTabela).val(dia7)
					$("#DIA8RADREAL___"+seqTabela).val(dia8)
					$("#DIA9RADREAL___"+seqTabela).val(dia9)
					$("#DIA10RADREAL___"+seqTabela).val(dia10)

					var dataDisp = rep["DATADISPONIBILIDADE"]
					dataDisp = dataDisp.split(" ")
					dataDisp = dataDisp[0]
					
					console.log("dia1: "+dia1+", dia2: "+dia2+", dia3: "+dia3+", dia4: "+dia4+", dia5: "+dia5+", dia6: "+dia6+
							", dia7: "+dia7+", dia8: "+dia8+", dia9: "+dia9+", dia10: "+dia10)
					
					console.log("dataDisp: "+dataDisp)
					
					// SE DIA1 É IGUAL A DATA DE DISPONIBILIDADE
					if(dia1==dataDisp){
						
						var saldoDisp= rep["SALDO"]
						var saldoAloc = rep["SALDO_DISPONIBILIDADE"]

						$("#DIA1RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
					
						if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
								
							saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

							$("#DIA1RAD___"+seqTabela).val(saldoDisp)
							
						} /*else {
							
							$("#DIA1RECAPTOSDISPATV___"+seqModal).val(0)
							
						}
						
					} else {
						
						$("#DIA1RECAPTOSDISPATV___"+seqModal).val(0)*/
						
					}
					
					// SE DIA2 É IGUAL A DATA DE DISPONIBILIDADE
					if(dia2==dataDisp){

						var saldoDisp = rep["SALDO"]
						var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
						$("#DIA2RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
					
						if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
							saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

							$("#DIA2RAD___"+seqTabela).val(saldoDisp)
						
						} /*else {
							
							$("#DIA2RECAPTOSDISPATV___"+seqModal).val(0)
							
						}
						
					} else {
						
						$("#DIA2RECAPTOSDISPATV___"+seqModal).val(0)*/
						
					}
					
					// SE DIA3 É IGUAL A DATA DE DISPONIBILIDADE
					if(dia3==dataDisp){
						
						var saldoDisp = rep["SALDO"]
						var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
						$("#DIA3RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
					
						if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
							saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

							$("#DIA3RAD___"+seqTabela).val(saldoDisp)
						
						} /*else {
							
							$("#DIA3RECAPTOSDISPATV___"+seqModal).val(0)
							
						}
						
					} else {
						
						$("#DIA3RECAPTOSDISPATV___"+seqModal).val(0)*/
						
					}
					
					// SE DIA4 É IGUAL A DATA DE DISPONIBILIDADE
					if(dia4==dataDisp){
						
						var saldoDisp = rep["SALDO"]
						var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
						$("#DIA4RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
					
						if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
							saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

							$("#DIA4RAD___"+seqTabela).val(saldoDisp)
						
						} /*else {
							
							$("#DIA4RECAPTOSDISPATV___"+seqModal).val(0)
							
						}
						
					} else {
						
						$("#DIA4RECAPTOSDISPATV___"+seqModal).val(0)*/
						
					}
					
					// SE DIA5 É IGUAL A DATA DE DISPONIBILIDADE
					if(dia5==dataDisp){
						
						var saldoDisp = rep["SALDO"]
						var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
						$("#DIA5RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
					
						if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
							saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

							$("#DIA5RAD___"+seqTabela).val(saldoDisp)
						
						} /*else {
							
							$("#DIA5RECAPTOSDISPATV___"+seqModal).val(0)
							
						}
						
					} else {
						
						$("#DIA5RECAPTOSDISPATV___"+seqModal).val(0)*/
						
					}
					
					// SE DIA6 É IGUAL A DATA DE DISPONIBILIDADE
					if(dia6==dataDisp){
						
						var saldoDisp = rep["SALDO"]
						var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
						$("#DIA6RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
					
						if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
							saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

							$("#DIA6RAD___"+seqTabela).val(saldoDisp)
						
						} /*else {
							
							$("#DIA6RECAPTOSDISPATV___"+seqModal).val(0)
							
						}
						
					} else {
						
						$("#DIA6RECAPTOSDISPATV___"+seqModal).val(0)*/
						
					}
					
					// SE DIA7 É IGUAL A DATA DE DISPONIBILIDADE
					if(dia7==dataDisp){
						
						var saldoDisp = rep["SALDO"]
						var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
						$("#DIA7RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
					
						if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
							saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

							$("#DIA7RAD___"+seqTabela).val(saldoDisp)
						
						} /*else {
							
							$("#DIA7RECAPTOSDISPATV___"+seqModal).val(0)
							
						}
						
					} else {
						
						$("#DIA7RECAPTOSDISPATV___"+seqModal).val(0)*/
						
					}
					
					// SE DIA8 É IGUAL A DATA DE DISPONIBILIDADE
					if(dia8==dataDisp){
						
						var saldoDisp = rep["SALDO"]
						var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
						$("#DIA8RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
					
						if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
							saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

							$("#DIA8RAD___"+seqTabela).val(saldoDisp)
						
						} /*else {
							
							$("#DIA8RECAPTOSDISPATV___"+seqModal).val(0)
							
						}
						
					} else {
						
						$("#DIA8RECAPTOSDISPATV___"+seqModal).val(0)*/
						
					}
					
					// SE DIA9 É IGUAL A DATA DE DISPONIBILIDADE
					if(dia9==dataDisp){
						
						var saldoDisp = rep["SALDO"]
						var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
						$("#DIA9RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
					
						if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
						
							saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")
							
							$("#DIA9RAD___"+seqTabela).val(saldoDisp)
						
						} /*else {
							
							$("#DIA9RECAPTOSDISPATV___"+seqModal).val(0)
							
						}
						
					} else {
						
						$("#DIA9RECAPTOSDISPATV___"+seqModal).val(0)*/
						
					}
					
					// SE DIA10 É IGUAL A DATA DE DISPONIBILIDADE
					if(dia10==dataDisp){
						
						var saldoDisp = rep["SALDO"]
						var saldoAloc = rep["SALDO_DISPONIBILIDADE"]
						$("#DIA10RADALOC___"+seqTabela).val(parseFloat(saldoAloc).toFixed(2).toString().replace(".",","))
					
						if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
							saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

							$("#DIA10RAD___"+seqTabela).val(saldoDisp)
						
						} /*else {
							
							$("#DIA10RECAPTOSDISPATV___"+seqModal).val(0)
							
						}
						
					} else {
						
						$("#DIA10RECAPTOSDISPATV___"+seqModal).val(0)*/
						
					}
					
				}
				
			}
		
			// CALCULA SOMA DOS RECURSOS ALOCADOS
			//calculaSomaRecAptosDisp(rowSoma)
			
		}
		
		// SE A TABELA RAD TEM ITENS
		if(radTemItens()){
			
			$(".RAD").show()
			
		} else {
			// SE NÃO
			
			$(".RAD").hide()
		
		}
				
	},500)
	
	// DESATIVA O LOAD
	setTimeout(function(){
		
		myLoading2.hide();
		$("#ICONREDUZIR").click()
		
	}, 500)
	
	// PREENCHE OS DIAS DA JANELA DE PLANEJAMENTO
	/*preencheDiasCabecalhoRecAptoDisp()
	
	addModalRecAptoDisp()
	addModalRecAptoDisp()
	addModalRecAptoDisp()
	addModalRecAptoDisp()
	
	addSomaRecAptoDisp()*/
	
}

// SE A TABELA RAD TEM ITENS
function radTemItens(){

	var temItens = false
	
	// PERCORRE OS REGISTROS DA TABELA
	$("input[id^='OPERADORRAD___']").each(function(){
	
		temItens = true
		
	})
	
	return temItens
	
}

// ONMOUSEOVER DO ITEM DA TABELA
function sobreLinhaTabela(e){
	
	console.log("estou sobre a linha")
	
	//$(e).prop("style", "background-color: #E8E8E8;");
	//$(e).prop("style", "cursor:pointer;")
	
	$(e).addClass("onmouseover")
	
}

// ONMOUSEOUT DO ITEM DA TABELA
function foraLinhaTabela(e){
	
	console.log("estou fora da linha")
	
	//$(e).prop("style", "background-color: #F9F9F9 !important;");
	//$(e).prop("style", "cursor:default;")

	$(e).removeClass("onmouseover")
	
}

// VERIFICA SE TEM ALGUMA LINHA DA TABELA DE PROGRAMAÇÃO SELECIONADA
function verificaSelecaoLinha(){

	var ret = false
	
	//PERCORRE TODOS OS ITENS
	/*$("input[id^='OSATV___']").each(function(index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		// SE LINHA ESTÁ SELECIONADA
		if($("#LINHAPLAN___"+seq).hasClass("selecionado")){
			
			var dia1 = $("#DIA1ATV___"+seq).val()
			var dia2 = $("#DIA2ATV___"+seq).val()
			var dia3 = $("#DIA3ATV___"+seq).val()
			var dia4 = $("#DIA4ATV___"+seq).val()
			var dia5 = $("#DIA5ATV___"+seq).val()
			var dia6 = $("#DIA6ATV___"+seq).val()
			var dia7 = $("#DIA7ATV___"+seq).val()
			var dia8 = $("#DIA8ATV___"+seq).val()
			var dia9 = $("#DIA9ATV___"+seq).val()
			var dia10 = $("#DIA10ATV___"+seq).val()
			
			// SE HORAS FORAM INFORMADAS
			if(!(dia1=="" && dia2=="" && dia3=="" && dia4=="" && dia5==""
				&& dia6=="" && dia7=="" && dia8=="" && dia9=="" &&
				dia10=="")){
				
				ret = true
				
			}
			
		}
	
	})*/
	
	//PERCORRE TODOS OS ITENS
	$("input[id^='OSATV___']").each(function(index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		// SE LINHA ESTÁ SELECIONADA
		if($("#PROGRAMANDO___"+seq).is(":checked")){
			
			/*var dia1 = $("#DIA1ATV___"+seq).val()
			var dia2 = $("#DIA2ATV___"+seq).val()
			var dia3 = $("#DIA3ATV___"+seq).val()
			var dia4 = $("#DIA4ATV___"+seq).val()
			var dia5 = $("#DIA5ATV___"+seq).val()
			var dia6 = $("#DIA6ATV___"+seq).val()
			var dia7 = $("#DIA7ATV___"+seq).val()
			var dia8 = $("#DIA8ATV___"+seq).val()
			var dia9 = $("#DIA9ATV___"+seq).val()
			var dia10 = $("#DIA10ATV___"+seq).val()
			
			// SE HORAS FORAM INFORMADAS
			if(!(dia1=="" && dia2=="" && dia3=="" && dia4=="" && dia5==""
				&& dia6=="" && dia7=="" && dia8=="" && dia9=="" &&
				dia10=="")){
				
				ret = true
				
			}*/
			
		}
	
	})
	
	return ret
	
}

// LIMPA A SELEÇÃO DE TODOS OS ITENS DA TABELA COM EXCEÇÃO DO ATUAL
function limpaSelecaoTabela(e){
	
	var seqAtual = $(e).attr("id").split("___")[1]
	
	//PERCORRE TODOS OS ITENS
	$("input[id^='OSATV___']").each(function(index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		// SE NÃO É O ITEM ATUAL
		if(!(seq==seqAtual)){
			
			// SE LINHA ESTÁ SELECIONADA
			/*if($("#LINHAPLAN___"+seq).hasClass("selecionado")){
				
				// REMOVE A CLASSE "SELECIONADO"
				$("#LINHAPLAN___"+seq).removeClass("selecionado")
				
				$(".GRUPORECURSON3").hide()
				$("#GRUPORECURSON3>option").remove(); 
				
				$("#DIA1ATV___"+seq).prop("readonly",true)
				$("#DIA2ATV___"+seq).prop("readonly",true)
				$("#DIA3ATV___"+seq).prop("readonly",true)
				$("#DIA4ATV___"+seq).prop("readonly",true)
				$("#DIA5ATV___"+seq).prop("readonly",true)
				$("#DIA6ATV___"+seq).prop("readonly",true)
				$("#DIA7ATV___"+seq).prop("readonly",true)
				$("#DIA8ATV___"+seq).prop("readonly",true)
				$("#DIA9ATV___"+seq).prop("readonly",true)
				$("#DIA10ATV___"+seq).prop("readonly",true)
				
			}*/
			
			// SE LINHA ESTÁ SELECIONADA
			if($("#PROGRAMANDO___"+seq).is(":checked")){
				
				// REMOVE A CLASSE "SELECIONADO"
				$("#LINHAPLAN___"+seq).removeClass("selecionado")
				$("#PROGRAMANDO___"+seq).attr("checked",false)
				
				$(".GRUPORECURSON3").hide()
				$("#GRUPORECURSON3>option").remove(); 
				
				// LIMPA RAD
				limpaRAD()
				
				/*$("#DIA1ATV___"+seq).prop("readonly",true)
				$("#DIA2ATV___"+seq).prop("readonly",true)
				$("#DIA3ATV___"+seq).prop("readonly",true)
				$("#DIA4ATV___"+seq).prop("readonly",true)
				$("#DIA5ATV___"+seq).prop("readonly",true)
				$("#DIA6ATV___"+seq).prop("readonly",true)
				$("#DIA7ATV___"+seq).prop("readonly",true)
				$("#DIA8ATV___"+seq).prop("readonly",true)
				$("#DIA9ATV___"+seq).prop("readonly",true)
				$("#DIA10ATV___"+seq).prop("readonly",true)*/
				
			}
			
		}
	
	})
	
}

// LIMPA A SELEÇÃO DE TODOS OS ITENS DA TABELA
function limpaSelecaoTodosTabela(){
	
	// PERCORRE TODOS OS ITENS
	$("input[id^='OSATV___']").each(function(index,value){
		
		var seq = $(this).attr("id").split("___")[1]
			
		// SE LINHA ESTÁ SELECIONADA
		//if($("#LINHAPLAN___"+seq).hasClass("selecionado")){
		if($("#PROGRAMANDO___"+seq).is(":checked")){
			
			// REMOVE A CLASSE "SELECIONADO"
			$("#LINHAPLAN___"+seq).removeClass("selecionado")
			
			$(".GRUPORECURSON3").hide()
			$("#GRUPORECURSON3>option").remove(); 
			
			$("#DIA1ATV___"+seq).prop("readonly",true)
			$("#DIA2ATV___"+seq).prop("readonly",true)
			$("#DIA3ATV___"+seq).prop("readonly",true)
			$("#DIA4ATV___"+seq).prop("readonly",true)
			$("#DIA5ATV___"+seq).prop("readonly",true)
			$("#DIA6ATV___"+seq).prop("readonly",true)
			$("#DIA7ATV___"+seq).prop("readonly",true)
			$("#DIA8ATV___"+seq).prop("readonly",true)
			$("#DIA9ATV___"+seq).prop("readonly",true)
			$("#DIA10ATV___"+seq).prop("readonly",true)
			
		}
	
	})
	
}

// SELECIONA TODAS PROGRAMAÇÕES DA LINHA
function colocaSelecaoProgramados(obj){

	var seq = $(obj).attr("id").split("___")[1]
	
	// SE DESPROGRAMAR É SELECIONADO
	if($("#DESPROGRAMAR___"+seq).is(":checked")){
		
		console.log("está selecionado, vou desprogramar os saldos diferentes")
			
		// SE SALDO É DIFERENTE DE 0
		if(!($("#DIA1RECALOC___"+seq).val()=="0")){
			
			console.log("vou desprogramar dia1")
			
			$("#RECAD1___"+seq).addClass("desprogramar")
			
		}
		
		if(!($("#DIA2RECALOC___"+seq).val()=="0")){
			
			console.log("vou desprogramar dia2")
			
			$("#RECAD2___"+seq).addClass("desprogramar")
			
		}
		
		if(!($("#DIA3RECALOC___"+seq).val()=="0")){
		
			console.log("vou desprogramar dia3")
		
			$("#RECAD3___"+seq).addClass("desprogramar")
			
		}
		
		if(!($("#DIA4RECALOC___"+seq).val()=="0")){
		
			console.log("vou desprogramar dia4")
		
			$("#RECAD4___"+seq).addClass("desprogramar")
			
		}
	
		if(!($("#DIA5RECALOC___"+seq).val()=="0")){
		
			console.log("vou desprogramar dia5")
			
			$("#RECAD5___"+seq).addClass("desprogramar")
			
		}
		
		if(!($("#DIA6RECALOC___"+seq).val()=="0")){
		
			console.log("vou desprogramar dia6")
		
			$("#RECAD6___"+seq).addClass("desprogramar")
			
		}
		
		if(!($("#DIA7RECALOC___"+seq).val()=="0")){
		
			console.log("vou desprogramar dia7")
		
			$("#RECAD7___"+seq).addClass("desprogramar")
			
		}
		
		if(!($("#DIA8RECALOC___"+seq).val()=="0")){
		
			console.log("vou desprogramar dia8")
		
			$("#RECAD8___"+seq).addClass("desprogramar")
			
		}
		
		if(!($("#DIA9RECALOC___"+seq).val()=="0")){
		
			console.log("vou desprogramar dia9")
		
			$("#RECAD9___"+seq).addClass("desprogramar")
			
		}
		
		if(!($("#DIA10RECALOC___"+seq).val()=="0")){
		
			console.log("vou desprogramar dia10")
		
			$("#RECAD10___"+seq).addClass("desprogramar")
			
		}
	
	} else {
		// SE NÃO ESTÁ SELECIONADO
		
		console.log("não está selecionado, vou os selecionados")
		
		$("#RECAD1___"+seq).removeClass("desprogramar")
		$("#RECAD2___"+seq).removeClass("desprogramar")
		$("#RECAD3___"+seq).removeClass("desprogramar")
		$("#RECAD4___"+seq).removeClass("desprogramar")
		$("#RECAD5___"+seq).removeClass("desprogramar")
		$("#RECAD6___"+seq).removeClass("desprogramar")
		$("#RECAD7___"+seq).removeClass("desprogramar")
		$("#RECAD8___"+seq).removeClass("desprogramar")
		$("#RECAD9___"+seq).removeClass("desprogramar")
		$("#RECAD10___"+seq).removeClass("desprogramar")
		
	}
		
}

// ONDBLCLICK DO ITEM DA TABELA
/*function colocaSelecao(e){
	
	console.log("cliquei na linha")
	
	var ret = verificaSelecaoLinha()
	
	var seq = $(e).attr("id").split("___")[1]
	
	var codAtividade = $("#CODATIVIDADEATV___"+seq).val()
	
	var codcoligada = $("#CODCOLIGADA___"+seq).val()
	var codfilial = $("#CODFILIAL___"+seq).val()
	var codOrdem = $("#OPATV___"+seq).val()
	var idAtvOrdem = $("#IDATIVIDADEATV___"+seq).val()
	var codEstrutura = $("#CODESTRUTURAATV___"+seq).val()
	var statusOP = $("#CODSTATUSOPATV___"+seq).val()
	
	console.log("statusOP: "+statusOP)
		
	// SE O STATUS DA OP FOR CONCLUÍDA OU CANCELADA (5 OU 6)
	if(statusOP=="5" || statusOP=="6"){
		
		// REMOVE A SELEÇÃO
		$("#PROGRAMANDO___"+seq).removeAttr("checked")
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'Essa OP não pode ser programada pois já foi concluída ou cancelada',
			  text: 'Verifique e tente novamente.'
		})
		
	} else {
		// SE NÃO, PODE SER PROGRAMADA
		
		//$(e).prop("style", "background-color: #F9F9F9 !important;");
		//$(e).prop("style", "background-color: red !important;");
		
		var myLoading2 = FLUIGC.loading(window);
		myLoading2.show();
		
		// ATIVA O LOAD
		setTimeout(function(){
		
			// LIMPA A SELEÇÃO DE TODOS OS ITENS DA TABELA
			limpaSelecaoTabela(e)
			
			var codFilial = $("#CODFILIAL_FILTRO").val()
			
			// RELOAD FILTER VALUES NO GRUPORECURSON3
			reloadZoomFilterValues("GRUPORECURSON3","CODATIVIDADE,"+codAtividade+",CODFILIAL,"+codFilial)
			
			// SE ITEM ESTÁ SELECIONADO
			//if($(e).hasClass("selecionado")){
			if($("#LINHAPLAN___"+seq).hasClass("selecionado")){
			//if($("#PROGRAMANDO___"+seq).is(":checked")){
				
				console.log("item estava selecionado, vou remover a seleção")
				
				//$(e).removeClass("selecionado")
				$("#LINHAPLAN___"+seq).removeClass("selecionado")
				$(".GRUPORECURSON3").hide()
				$("#GRUPORECURSON3>option").remove(); 
				$("#CODRECURSON3").val("")
				$("#CODCHAPARECURSON3").val("")
				$("#RECURSON3").val("")
				$(".PLANOCORTE").hide()
				$("#PLANOCORTE>option").remove()
				$("#NUMPLANOCORTEREAL").val()
				
				
				//var dataDe = $("#DATA_DE").val()
				//var dataAte = $("#ATE").val()
				var dataDe = $("#DATADE_PROG").val()
				var dataAte = $("#DATAATE_PROG").val()
				
				dataDe = formataDataBanco(dataDe)
				dataAte = formataDataBanco(dataAte)
				
				// ATUALIZA OS SALDOS ALOCADOS POR DIAS
		        atualizaSaldosDias(codcoligada,codfilial,codOrdem,idAtvOrdem,dataDe,dataAte,seq)
				
				// LIMPA A TABELA DE RECURSOS APTOS DISPONÍVEIS
				limpaRAD()
				
				// ESCONDE CAMPOS
				$(".RAD").hide()
				
				// MOSTRA ITENS QUE NÃO ESTÃO SELECIONADOS
				mostraItemNaoselecionado()
				
				// RECONSTROI OS FILTROS DE ACORDO COM A SELEÇÃO ATUAL
				reconstroiFiltros()
				
			} else {
				// SE NÃO, COLOCA SELEÇÃO
				
				// SE A ATIVIDADE TEM PLANO DE CORTE CADASTRADO
				if(atvTemPlanoCorte(codcoligada,codfilial,codOrdem,idAtvOrdem,codEstrutura)){
					
					$("#PROGRAMANDO___"+seq).removeAttr("checked")
					
					// EXIBE ALERTA
					Swal.fire({
						  icon: 'error',
						  title: 'Essa atividade não pode ser programada pois possui plano de corte cadastrado',
						  text: 'Para programar essa atividade é necessário utilizar o processo de Programação de PA/PC'
					})
					
				} else {
				
					// SE A ATIVIDADE ESTÁ COM O FAROL VERMELHO OU AMARELO, OU TEM PLANO DE CORTE
					if($("#FAROLATV___"+seq).parent("div").hasClass("FAROLAMARELO") || $("#FAROLATV___"+seq).parent("div").hasClass("FAROLVERMELHO") ){
						//|| atvTemPlanoCorte(codcoligada,codfilial,codOrdem,idAtvOrdem,codEstrutura)
						
						// EXIBE ALERTA
						Swal.fire({
							  icon: 'error',
							  title: 'Essa atividade não pode ser programada',
							  text: 'Verifique se as ordens precedentes foram programadas, se a ordem dessa atividade foi paralisada ou se possui plano de corte.'
						})
						
						$("#PROGRAMANDO___"+seq).removeAttr("checked")
						
					} else {
						// SE NÃO, ESTÁ LIBERADA PARA PROGRAMAR
						
						console.log("item não estava selecionado, vou colocar a seleção")
						
						//$(e).addClass("selecionado")
						$("#LINHAPLAN___"+seq).addClass("selecionado")
						
						
							
							$(".GRUPORECURSON3").show()
							$(".INTEGRAR").show()
							
							
								
								$(".PLANOCORTE").hide()
								
							//}
							
						//}
							
						// ESCONDE ITENS QUE NÃO ESTÃO SELECIONADOS
						escondeItemNaoselecionado()
						
						
						// CARREGA A TABELA RAD
						//carregaRADcompleta()
						
					}
				
				}

			}
			
		//}
		},500)
		
		// DESATIVA O LOAD
		setTimeout(function(){
			
			myLoading2.hide();
			
		},500)
		
	}
		
}
*/

// ONDBLCLICK DO ITEM DA TABELA
function colocaSelecao(e){
	
	console.log("cliquei na linha")
	
	var ret = verificaSelecaoLinha()
	
	var seq = $(e).attr("id").split("___")[1]
	
	var codAtividade = $("#CODATIVIDADEATV___"+seq).val()
	
	var codcoligada = $("#CODCOLIGADA___"+seq).val()
	var codfilial = $("#CODFILIAL___"+seq).val()
	var codOrdem = $("#OPATV___"+seq).val()
	var idAtvOrdem = $("#IDATIVIDADEATV___"+seq).val()
	var codEstrutura = $("#CODESTRUTURAATV___"+seq).val()
	var statusOP = $("#CODSTATUSOPATV___"+seq).val()
	var habilidadeAtual = $("#HABILIDADEATUAL").val()
	var codHabilidade = $("#CODHABILIDADEATV___"+seq).val()
	
	console.log("statusOP: "+statusOP)
			
	// SE O STATUS DA OP FOR CONCLUÍDA OU CANCELADA (5 OU 6)
	if(statusOP=="5" || statusOP=="6"){
		
		// REMOVE A SELEÇÃO
		$("#PROGRAMANDO___"+seq).removeAttr("checked")
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'Essa OP não pode ser programada pois já foi concluída ou cancelada',
			  text: 'Verifique e tente novamente.'
		})
		
	} else {
		// SE NÃO, PODE SER PROGRAMADA
		
		var myLoading2 = FLUIGC.loading(window);
		myLoading2.show();
		
		// ATIVA O LOAD
		setTimeout(function(){
		
			var codFilial = $("#CODFILIAL_FILTRO").val()
			
			// SE ITEM ESTÁ SELECIONADO
			if($("#LINHAPLAN___"+seq).hasClass("selecionado")){
				
				console.log("item estava selecionado, vou remover a seleção")
				
				//$(e).removeClass("selecionado")
				$("#LINHAPLAN___"+seq).removeClass("selecionado")
				$("#LINHAPLAN___"+seq).removeClass("selecaoAlocacao")
				
				// SE NÃO TEM ATIVIDADES SELECIONADAS
				if(!temAtvsSelecionadas()){
					
					//$(".GRUPORECURSON3").hide()
					$("#GRUPORECURSON3>option").remove(); 
					$("#CODRECURSON3").val("")
					$("#CODCHAPARECURSON3").val("")
					$("#RECURSON3").val("")
					$(".PLANOCORTE").hide()
					$("#PLANOCORTE>option").remove()
					$("#NUMPLANOCORTEREAL").val()
					$("#CODHABILIDADEATUAL").val("")
					
					//var dataDe = $("#DATA_DE").val()
					//var dataAte = $("#ATE").val()
					var dataDe = $("#DATADE_PROG").val()
					var dataAte = $("#DATAATE_PROG").val()
					
					dataDe = formataDataBanco(dataDe)
					dataAte = formataDataBanco(dataAte)
					
					// ATUALIZA OS SALDOS ALOCADOS POR DIAS
			        atualizaSaldosDiasLinha(codcoligada,codfilial,codOrdem,idAtvOrdem,dataDe,dataAte,seq)
					
					// LIMPA A TABELA DE RECURSOS APTOS DISPONÍVEIS
					limpaRAD()
					
					// ESCONDE CAMPOS
					$(".RAD").hide()
					
					filtraHabilidades()
					
					$("#SELECAOATVS___1").parents("td").children("strong").remove()
					
					//$("#SELECAOATVS___1").parents("td").attr("onclick","removeAtvSelecionadas()").append("<strong style='cursor: pointer !important;'>X</strong>")

				}
								
				// MOSTRA ITENS QUE NÃO ESTÃO SELECIONADOS
				//mostraItemNaoselecionado()
				
				// RECONSTROI OS FILTROS DE ACORDO COM A SELEÇÃO ATUAL
				//reconstroiFiltros()
				
			} else {
				// SE NÃO, COLOCA SELEÇÃO
				
				// SE A ATIVIDADE TEM PLANO DE CORTE CADASTRADO
				if(atvTemPlanoCorte(codcoligada,codfilial,codOrdem,idAtvOrdem,codEstrutura)){
					
					$("#PROGRAMANDO___"+seq).removeAttr("checked")
					$("#LINHAPLAN___"+seq).removeClass("selecaoAlocacao")

					// EXIBE ALERTA
					Swal.fire({
						  icon: 'error',
						  title: 'Essa atividade não pode ser programada pois possui plano de corte cadastrado',
						  text: 'Para programar essa atividade é necessário utilizar o processo de Programação de PA/PC'
					})
					
				} else {
				
					// SE A ATIVIDADE ESTÁ COM O FAROL VERMELHO OU AMARELO, OU TEM PLANO DE CORTE
					if($("#FAROLATV___"+seq).parent("div").hasClass("FAROLAMARELO") || $("#FAROLATV___"+seq).parent("div").hasClass("FAROLVERMELHO") /*|| atvTemPlanoCorte(codcoligada,codfilial,codOrdem,idAtvOrdem,codEstrutura)*/){
						
						// EXIBE ALERTA
						Swal.fire({
							  icon: 'error',
							  title: 'Essa atividade não pode ser programada',
							  text: 'Verifique se as ordens precedentes foram programadas, se a ordem dessa atividade foi paralisada ou se possui plano de corte.'
						})
						
						$("#PROGRAMANDO___"+seq).removeAttr("checked")
						$("#LINHAPLAN___"+seq).removeClass("selecaoAlocacao")
						
					} else {
						// SE NÃO, ESTÁ LIBERADA PARA PROGRAMAR
						
						console.log("item não estava selecionado, vou colocar a seleção")
						
						if(habilidadeAtual=="" || habilidadeAtual==undefined || habilidadeAtual==null){
							
							habilidadeAtual = codHabilidade
							
						}
						
						if(habilidadeAtual==codHabilidade){

							//$(e).addClass("selecionado")
							$("#LINHAPLAN___"+seq).addClass("selecionado")
							$("#LINHAPLAN___"+seq).addClass("selecaoAlocacao")
							
								$(".GRUPORECURSON3").show()
								$(".INTEGRAR").show()
								
									$(".PLANOCORTE").hide()
									
								//}
								
							//}
								
							// ESCONDE ITENS QUE NÃO ESTÃO SELECIONADOS
							//escondeItemNaoselecionado()
							
							
							filtraHabilidades()
							
							$("#SELECAOATVS___1").parents("td").children("strong").remove()
							$("#SELECAOATVS___1").parents("td").append("<strong style='cursor: pointer !important;'>X</strong>")
							$("#SELECAOATVS___1").parents("td").children("strong").attr("onclick","removeAtvSelecionadas()")
							
							// CARREGA A TABELA RAD
							//carregaRADcompleta()
							
						} else {
							
							// EXIBE ALERTA
							Swal.fire({
								  icon: 'error',
								  title: 'A habilidade dessa atividade é diferente da atividade que já foi selecionada',
								  text: 'É necessários que as atividades a serem programadas tenham a mesma habilidade para a seleção do operador'
							})
							
							$("#PROGRAMANDO___"+seq).removeAttr("checked")
							$("#LINHAPLAN___"+seq).removeClass("selecaoAlocacao")
							
						}
												
					}
				
				}

			}
			
		//}
		},500)
		
		// DESATIVA O LOAD
		setTimeout(function(){
			
			myLoading2.hide();
			
		},500)
		
	}
		
}

// REMOVE TODAS AS SELEÇÕES DAS ATIVIDADES
function removeAtvSelecionadas(){
	
	var ret = false
	
	console.log("removeAtvSelecionadas")
	
	// PERCORRE TODAS AS ATIVIDADES
	$("input[id^='ITEMATV___']").each(function(){
	
		var seq = $(this).attr("id").split("___")[1]
		
		// SE CHECKBOX DA SELEÇÃO FOI MARCADO
		if($("#PROGRAMANDO___"+seq).is(":checked")){
		
			console.log("achei item selecionado")
			
			//$(e).removeClass("selecionado")
			$("#LINHAPLAN___"+seq).removeClass("selecionado")
			$("#LINHAPLAN___"+seq).removeClass("selecaoAlocacao")

			// REMOVE A SELEÇÃO
			$("#PROGRAMANDO___"+seq).removeAttr("checked")
		
			// SE NÃO TEM ATIVIDADES SELECIONADAS
			if(!temAtvsSelecionadas()){
				
				var codcoligada = $("#CODCOLIGADA___"+seq).val()
				var codfilial = $("#CODFILIAL___"+seq).val()
				var codOrdem = $("#OPATV___"+seq).val()
				var codAtividade = $("#CODATIVIDADEATV___"+seq).val()
				var celula = $("#CELULAATV___"+seq).val()
				var codigoPrd = $("#CODIGOPRDATV___"+seq).val()
				var idprd = $("#IDPRDATV___"+seq).val()
				var codPosto = $("#POSTOATV___"+seq).val()
				var codPrj = $("#OSATV___"+seq).val()
				var idAtvOrdem = $("#IDATIVIDADEATV___"+seq).val()
				var dataDe = $("#DATADE_PROG").val()
			    var dataAte = $("#DATAATE_PROG").val()
			    dataDe = formataDataBanco(dataDe)
			    dataAte = formataDataBanco(dataAte)
				
				//$(".GRUPORECURSON3").hide()
				$("#GRUPORECURSON3>option").remove(); 
				$("#CODRECURSON3").val("")
				$("#CODCHAPARECURSON3").val("")
				$("#RECURSON3").val("")
				$(".PLANOCORTE").hide()
				$("#PLANOCORTE>option").remove()
				$("#NUMPLANOCORTEREAL").val()
				$("#CODHABILIDADEATUAL").val("")
				
				//var dataDe = $("#DATA_DE").val()
				//var dataAte = $("#ATE").val()
				var dataDe = $("#DATADE_PROG").val()
				var dataAte = $("#DATAATE_PROG").val()
				
				dataDe = formataDataBanco(dataDe)
				dataAte = formataDataBanco(dataAte)
				
				// ATUALIZA OS SALDOS ALOCADOS POR DIAS
		        atualizaSaldosDiasLinha(codcoligada,codfilial,codOrdem,idAtvOrdem,dataDe,dataAte,seq)
				
				// LIMPA A TABELA DE RECURSOS APTOS DISPONÍVEIS
				limpaRAD()
				
				// ESCONDE CAMPOS
				$(".RAD").hide()
				
				filtraHabilidades()
				
				$("#SELECAOATVS___1").parents("td").children("strong").remove()
				
			}

			
		}
		
	})
	
}

// SE NÃO TEM ATIVIDADES SELECIONADAS
function temAtvsSelecionadas(){
	
	var ret = false
	
	console.log("temAtvsSelecionadas")
	
	// PERCORRE TODAS AS ATIVIDADES
	$("input[id^='ITEMATV___']").each(function(){
	
		var seq = $(this).attr("id").split("___")[1]
		
		// SE CHECKBOX DA SELEÇÃO FOI MARCADO
		if($("#PROGRAMANDO___"+seq).is(":checked")){
			
			ret = true
			
		}
		
	})
	
	console.log("ret: "+ret)
	
	return ret
	
}

// FILTRA AS HABILIDADES DE ACORDO COM AS ATIVIDADES SELECIONADAS
function filtraHabilidades(){
	
	var codAtividades = new Array()
	var codFilial = $("#CODFILIAL_FILTRO").val()
	var codHabilidade = ""
		
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='ITEMATV___']").each(function(index,value){
	
		var seq = $(this).attr("id").split("___")[1]
		
		console.log("entrei na linha "+seq)
		
		// SE A LINHA NÃO FOI SELECIONADA
		//if(!($("#PROGRAMANDO___"+seq).is(":checked"))){
		if($("#LINHAPLAN___"+seq).hasClass("selecionado")){	
		
			var codAtividade = $("#CODATIVIDADEATV___"+seq).val()
			
			codAtividades.push(codAtividade)
			
			codHabilidade = $("#CODHABILIDADEATV___"+seq).val()
			
		}
		
	})
	
	console.log("codAtividades: "+codAtividades)
	
	console.log("tam codAtividades: "+codAtividades.length)
	
	console.log("codHabilidade: "+codHabilidade)
	
	// SE TEM ATIVIDADES SELCIONADAS
	if(codAtividades.length>0){

		console.log("vou enviar: "+codAtividades)
		
		codAtividades = codAtividades.toString()
		
		codAtividades = codAtividades.replaceAll(",","@")
		
		console.log("vou fazer o relod zoom filter values")
		
		console.log("codAtividades: "+codAtividades+", codFilial: "+codFilial+",codHabilidade: "+codHabilidade)
		
		// RELOAD FILTER VALUES NO GRUPORECURSON3
		reloadZoomFilterValues("GRUPORECURSON3","CODHABILIDADE,"+codHabilidade+",CODFILIAL,"+codFilial)
		//reloadZoomFilterValues("GRUPORECURSON3","CODATIVIDADE,"+codAtividades+",CODFILIAL,"+codFilial)
		
		// MOSTRA A DIV DA PROGRAMAÇÃO
		$(".PROGRAMACAO").show()
		
		$("#HABILIDADEATUAL").val(codHabilidade)
		
	} else {
		// SE NÃO
		
		// ESCONDE A DIV DA PROGRAMAÇÃO
		$(".PROGRAMACAO").hide()
		$("#HABILIDADEATUAL").val("")
		
	}
	
}

// SE ATIVIDADE TEM PLANO DE CORTE
function atvTemPlanoCorte(codcoligada,codfilial,codOrdem,idAtvOrdem,codEstrutura){
	
	// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
	var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codcoligada,codcoligada,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("CODFILIAL",codfilial,codfilial,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("CODESTRUTURA",codEstrutura,codEstrutura,ConstraintType.MUST)
	var a4 = DatasetFactory.createConstraint("IDATVORDEM",idAtvOrdem,idAtvOrdem,ConstraintType.MUST)
	var a5 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)

	var constraints = new Array(a1,a2,a3,a4,a5)
	
	var dataset = DatasetFactory.getDataset("dsBuscaPlanoCorteAtvOS",null,constraints,null)
	var row = dataset.values
	
	// SE RETORNO É VAZIO OU NULO
	if(row=="" || row==null || row==undefined || row=="null"){
		
		return false
		
	} else {
		// SE NÃO
		
		return true
		
	}
	
}

// PERCORRE TODOS OS ITENS DA TABELA DE PROGRAMAÇÃO E ESCONDE AS LINHAS QUE NÃO ESTÃO SELECIONADAS
function escondeItemNaoselecionado(){
	
	console.log("vou esconder as linhas que não foram selecionadas")
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='ITEMATV___']").each(function(index,value){
	
		var seq = $(this).attr("id").split("___")[1]
		
		console.log("entrei na linha "+seq)
		
		// SE A LINHA NÃO FOI SELECIONADA
		//if(!($("#LINHAPLAN___"+seq).hasClass("selecionado"))){
		if(!($("#PROGRAMANDO___"+seq).is(":checked"))){
			
			console.log("A linha LINHAPLAN___"+seq+" não tem a classe selecionado, vou esconder")
			
			$("#LINHAPLAN___"+seq).hide()
			
		}
		
	})
	
}

// PERCORRE TODOS OS ITENS DA TABELA DE PROGRAMAÇÃO E EXIBE AS LINHAS QUE NÃO ESTÃO SELECIONADAS
function mostraItemNaoselecionado(){
	
	console.log("vou exibir as linhas que não foram selecionadas")
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='ITEMATV___']").each(function(index,value){
	
		var seq = $(this).attr("id").split("___")[1]
		
		console.log("entrei na linha "+seq)
		
		// SE A LINHA NÃO FOI SELECIONADA
		//if(!($("#LINHAPLAN___"+seq).hasClass("selecionado"))){
		if(!($("#PROGRAMANDO___"+seq).is(":checked"))){
			
			console.log("A linha LINHAPLAN___"+seq+" não tem a classe selecionado, vou exibir")
			
			$("#LINHAPLAN___"+seq).show()
			
		}
		
	})
	
}

// EXIBE O CAMPO ZOOM DO RECURSO CONFORME SELEÇÃO
function exibeZoomRec(){
	
	var tipoRecurso = $("#TIPORECURSO").val()
	
	// SE SELEÇÃO DO TIPO DE RECURSOS FOR VAZIO
	if(tipoRecurso==""){
		
		$(".ALOCRECURSON3RESUMOPES").hide()
		$(".ALOCRECURSON3RESUMOEQ").hide()
		
	}
	
	// SE SELEÇÃO DO TIPO DE RECURSOS FOR PESSOAS
	if(tipoRecurso=="PESSOAS"){
		
		$(".ALOCRECURSON3RESUMOPES").show()
		$(".ALOCRECURSON3RESUMOEQ").hide()
		
	}
	
	// SE SELEÇÃO DO TIPO DE RECURSOS FOR EQUIPAMENTOS
	if(tipoRecurso=="EQUIPAMENTOS"){
		
		$(".ALOCRECURSON3RESUMOPES").hide()
		$(".ALOCRECURSON3RESUMOEQ").show()
		
	}
	
}

// EXPANDE O CONTEÚDO DO DETALHAMENTO DO ITEM
function expandir(e) {
	
    // ESCONDE/MOSTRA OS ÍCONES
    $("#ICONEXPANDIR").hide();
    $("#ICONREDUZIR").show();
    
    // EXIBE A ABA DOS ITENS
    $(".filtros").show()

}

// REDUZ O CONTEÚDO DO DETALHAMENTO DO ITEM
function reduzir(e) {
    
    // ESCONDE/MOSTRA OS ÍCONES
    $("#ICONEXPANDIR").show();
    $("#ICONREDUZIR").hide();
    
    // ESCONDE A ABA DOS ITENS
    $(".filtros").hide()
    
}

// EXPANDE O CONTEÚDO DO DETALHAMENTO DO ITEM
function expandir2(e) {
	
    // ESCONDE/MOSTRA OS ÍCONES
    $("#ICONEXPANDIR2").hide();
    $("#ICONREDUZIR2").show();
    
    // EXIBE A ABA DOS ITENS
    $(".filtrosResAloc").show()

}

// REDUZ O CONTEÚDO DO DETA  LHAMENTO DO ITEM
function reduzir2(e) {
    
    // ESCONDE/MOSTRA OS ÍCONES
    $("#ICONEXPANDIR2").show();
    $("#ICONREDUZIR2").hide();
    
    // ESCONDE A ABA DOS ITENS
    $(".filtrosResAloc").hide()
    
}

// EXPANDE O CONTEÚDO DO DETALHAMENTO DO ITEM
function expandir3(e) {
	
    // ESCONDE/MOSTRA OS ÍCONES
    $("#ICONEXPANDIR3").hide();
    $("#ICONREDUZIR3").show();
    
    // EXIBE A ABA DOS ITENS
    $(".filtrosHab").show()

}

// REDUZ O CONTEÚDO DO DETA  LHAMENTO DO ITEM
function reduzir3(e) {
    
    // ESCONDE/MOSTRA OS ÍCONES
    $("#ICONEXPANDIR3").show();
    $("#ICONREDUZIR3").hide();
    
    // ESCONDE A ABA DOS ITENS
    $(".filtrosHab").hide()
    
}

// BUSCAR INFORMAÇÕES DO PLANEJAMENTO
/*function buscarPlanejamento(){
	
	// MOSTRA TABELAS
	$("#ABAS").show()
	
}*/

// BUSCAR INFORMAÇÕES DO PLANEJAMENTO
/*function buscarPlanejamento(){
	
	// MOSTRA TABELAS
	$("#ABAS").show()
	
}*/

// CARREGA AS INFORMAÇÕES DO AVANÇO ATUAL
function carregaAvanco(obj){
	
	//var seq = $(obj).parent("a").parent("td").children("input").attr("id").split("___")[1]

	//console.log("seq: "+seq)
	
	// SE TEM ALGUN AVANÇO SELECIONADO
	if(temAvancoSelecionado()){
		
		// COLOCA O LINK E SIMULA O CLICK
		$("#SPANAVANCOATVTITULO").parent("a").attr("href","#AVANCOBLANK")
		$("#SPANAVANCOATVTITULO").parent("a").click()[0]
		
		// SALVA O SEQ E O AVANÇO ATUAL
		//$("#SEQAVANCO").val(seq)
		//$("#AVANCOATUAL").val($("#AVANCOATV___"+seq).val())
		
	} else {
		// SE NÃO
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'Não há atividades com o avanço selecionado',
			  text: 'Verifique e tente novamente.'
		})
		
	}
		
}

// SE TEM ALGUN AVANÇO SELECIONADO
function temAvancoSelecionado(){
	
	console.log("verifica se tem algum avanço selecionado")
	
	var ret = false
	
	// PERCORRE TODOS OS REGISTROS DAS ATIVIDADES
	$("input[id^='OSATV___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		// SE AVANÇO FOI SELECIONADO
		if($("#AVANCOATV___"+seq).parent("td").hasClass("avancoSelecionado")){
			
			ret = true
			
		}
		
	})
	
	console.log("tem algum avanço selecionado? "+ret)
	
	return ret
	
}

// VALIDA E ATUALIZA O AVANCO
function atualizaAvanco(){
	
	console.log("vou validar e atualizar o avanço")
	
	var avanco = $("#NOVOAVANCO").val()
	
	console.log("avanco: "+avanco)
	
	// SE O AVANÇO NÃO FOI INFORMADO
	if(avanco=="" || avanco==null || avanco==undefined){
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'O novo avanço precisa ser preenchido',
			  text: 'Verifique e tente novamente.'
		})
		
	} else {
		// SE NÃO
		
		// PERCORRE TODOS OS REGISTROS DAS ATIVIDADES
		$("input[id^='OSATV___']").each(function(){
		
			var seq = $(this).attr("id").split("___")[1]
			
			// SE AVANÇO FOI SELECIONADO
			if($("#AVANCOATV___"+seq).parent("td").hasClass("avancoSelecionado")){
				
				var codOrdem = $("#OPATV___"+seq).val()
				var idAtvOrdem = $("#IDATIVIDADEATV___"+seq).val()
				var codColigada = $("#CODCOLIGADA___"+seq).val()
				var codFilial = $("#CODFILIAL___"+seq).val()
				var codEstrutura = $("#CODESTRUTURAATV___"+seq).val()
				var codAtividade = $("#CODATIVIDADEATV___"+seq).val()
				var celula = $("#CELULAATV___"+seq).val()
				var codigoPrd = $("#CODIGOPRDATV___"+seq).val()
				var idPrd = $("#IDPRDATV___"+seq).val()
				var codPosto = $("#POSTOATV___"+seq).val()
				var codPrj = $("#OSATV___"+seq).val()
				var dataDe = $("#DATADE_PROG").val()
			    var dataAte = $("#DATAATE_PROG").val()
			    dataDe = formataDataBanco(dataDe)
			    dataAte = formataDataBanco(dataAte)	
				
				console.log("codOrdem: "+codOrdem+", idAtvOrdem: "+idAtvOrdem+", codColigada: "+codColigada+", codFilial: "+codFilial+", codEstrutura: "+codEstrutura+
						", avanco: "+avanco+", codAtividade: "+codAtividade+", celula: "+celula+", codigoPrd: "+codigoPrd+", idPrd: "+idPrd+", codPosto: "+codPosto+
						", codPrj: "+codPrj+", dataDe: "+dataDe+", dataAte: "+dataAte+", seq: "+seq)
				
				// SE TODAS AS INFORMAÇÕES FORAM PREENCHIDAS
				if ( !( (codOrdem=="" || codOrdem==null || codOrdem==undefined) || (idAtvOrdem=="" || idAtvOrdem==null || idAtvOrdem==undefined) || 
				(codColigada=="" || codColigada==null || codColigada==undefined) || (codFilial=="" || codFilial==null || codFilial==undefined) ||
				(codEstrutura=="" || codEstrutura==null || codEstrutura==undefined) || (avanco=="" || avanco==null || avanco==undefined) ) ){
					
					// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
					var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST)
					var a2 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
					var a3 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
					var a4 = DatasetFactory.createConstraint("IDATVORDEM",idAtvOrdem,idAtvOrdem,ConstraintType.MUST)
					var a5 = DatasetFactory.createConstraint("CODESTRUTURA",codEstrutura,codEstrutura,ConstraintType.MUST)
					var a6 = DatasetFactory.createConstraint("AVANCO",avanco,avanco,ConstraintType.MUST)
					
					constraints = new Array(a1,a2,a3,a4,a5,a6)
					
					var dataset = DatasetFactory.getDataset("dsAtualizaAvancoOP",null,constraints,null)
					
					// LIMPA OS CAMPOS DO MODAL
					$("#AVANCOATUAL").val("")
					$("#SEQAVANCO").val("")
					$("#NOVOAVANCO").val("")
					
					// ATUALIZA AS INFORMAÇÕES DA ATIVIDADE DA OP
					atualizaProgAtv(codColigada, codFilial, codOrdem, codAtividade, celula, codigoPrd, idPrd, codPosto, codPrj, dataDe, dataAte, seq)
					
					// RETIRA O LINK
					$("#SPANAVANCOATVTITULO").parent("a").removeAttr("href")
					
				} else {
					// SE NÃO
					
					// EXIBE ALERTA
					Swal.fire({
						  icon: 'error',
						  title: 'A atualização não pode ser realizada',
						  text: 'Verifique as informações dessa atividade'
					})
					
				}
				
			}
			
		})
		
		// REMOVE A SELEÇÃO DO AVANÇO
		removeSelecaoAvanco()
		
		// FECHA O MODAL
		$("#fechar")[0].click()
		
	}
	
}

// REMOVE A SELEÇÃO DO AVANÇO
function removeSelecaoAvanco(){
	
	console.log("vou remover a seleção do avanço")
	
	// PERCORRE TODOS OS REGISTROS DAS ATIVIDADES
	$("input[id^='OSATV___']").each(function(){
	
		var seq = $(this).attr("id").split("___")[1]
		
		// SE AVANÇO FOI SELECIONADO
		if($("#AVANCOATV___"+seq).parent("td").hasClass("avancoSelecionado")){

			// REMOVE A SELEÇÃO
			$("#AVANCOATV___"+seq).parent("td").removeClass("avancoSelecionado")
			
		}
		
	})
}

// LIMPA OS CAMPOS DO MODAL DO AVANÇO
function limpaAvanco(){
	
	// RETIRA O LINK
	$("#SPANAVANCOATVTITULO").parent("a").removeAttr("href")
	
	// LIMPA OS CAMPOS DO MODAL
	$("#AVANCOATUAL").val("")
	$("#SEQAVANCO").val("")
	$("#NOVOAVANCO").val("")

}

// VERIFICAR O STATUS DA ATIVIDADE E ALTERA A COR
function verificaStatusAtv(){
	
	console.log("vou verificar o saldo alocar e alterar a cor")
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='SALDOAALOCARATV___']").each(function(){
	
		var seq = $(this).attr("id").split("___")[1]
			
		var statusAtv = $("#CODSTATUSATV___"+seq).val()
		
		/*var saldoAlocar = $("#SALDOAALOCARATV___"+seq).val()
		
		console.log("saldoAlocar: "+saldoAlocar)
		
		// SE SALDO ALOCAR CONTÉM ","
		if(saldoAlocar.includes(",")){
			
			// TROCAR POR "."
			saldoAlocar = saldoAlocar.replace(",",".")
			
		}
		
		// FAZ O PARSE FLOAT DO VALOR
		saldoAlocar = parseFloat(saldoAlocar)
		
		// SE SALDO ALOCAR É 0
		if(saldoAlocar==0){
			
			$("#LINHAPLAN___"+seq).addClass("alocado")
			
			// SE É A ATIVIDADE QUE ESTÁ SENDO PROGRAMADA
			if($("#PROGRAMANDO___"+seq).is(":checked")){
				
				$(".GRUPORECURSON3").hide()
				
			}
			
		} else {
			// SE NÃO
			
			$("#LINHAPLAN___"+seq).removeClass("alocado")
			
		}*/
		
		if(statusAtv=="2"){
			
			console.log("o status da atividade é programada")
			
			$("#LINHAPLAN___"+seq).removeClass("alocado")
			$("#LINHAPLAN___"+seq).removeClass("parcialApontada")
			$("#LINHAPLAN___"+seq).removeClass("apontada")
			
			$("#LINHAPLAN___"+seq).addClass("alocado")
			
		}
		
		else if(statusAtv=="3"){
			
			console.log("o status da atividade é parcialmente apontada")
			
			$("#LINHAPLAN___"+seq).removeClass("alocado")
			$("#LINHAPLAN___"+seq).removeClass("parcialApontada")
			$("#LINHAPLAN___"+seq).removeClass("apontada")
			
			$("#LINHAPLAN___"+seq).addClass("parcialApontada")
			
		}
		
		// SE STATUS DA ATIVIDADE É PARCIALMENTE APONTADA    
		else if(statusAtv=="5"){
		
			console.log("o status da atividade é apontada")
			
			$("#LINHAPLAN___"+seq).removeClass("alocado")
			$("#LINHAPLAN___"+seq).removeClass("parcialApontada")
			$("#LINHAPLAN___"+seq).removeClass("apontada")
			
			$("#LINHAPLAN___"+seq).addClass("apontada")
			
		}
		
		else {
			
			$("#LINHAPLAN___"+seq).removeClass("alocado")
			$("#LINHAPLAN___"+seq).removeClass("parcialApontada")
			$("#LINHAPLAN___"+seq).removeClass("apontada")
						
		}
		
	})
	
}

// BUSCAR INFORMAÇÕES DO RESUMO DA ALOCAÇÃO
function buscarResumoAloc(){
	
	var myLoading2 = FLUIGC.loading(window);
	
	//$(".TABELARESUMO").show()
	
	var recurso = false
	
	var tipoRecurso = $("#TIPORECURSO").val()
	var dataDe = $("#DATA_DE_RESALOC").val()
	var dataAte = $("#ATE_RESALOC").val()
	
	// SE CAMPOS OBRIGATÓRIOS NÃO FORAM INFORMADOS
	if((dataDe=="" || dataDe==null || dataDe==undefined) || (dataAte=="" || 
				dataAte==null || dataAte==undefined) || (tipoRecurso=="" || 
						tipoRecurso==null || tipoRecurso==undefined)){
				
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'Há filtros obrigatórios que não foram informados',
			  text: 'Verifique e tente novamente.'
		})
		
		// ESCONDE A TABELA DO RESUMO
		$(".TABELARESUMO").hide()
		
	} else {
	// SE NÃO, SE FORAM 
		
		// SE TIPO DE RECURSO É PESSOAS
		if(tipoRecurso=="PESSOAS"){
			
			var recPessoa = $("#ALOCRECURSON3RESUMOPES").val() 
			
			// SE RECURSO PESSOA NÃO FOI SELECIONADO
			if(recPessoa=="" || recPessoa==null || recPessoa==undefined){
				
				recurso = true
				
			}
			
		}
		
		// SE TIPO DE RECURSO É EQUIPAMENTOS
		if(tipoRecurso=="EQUIPAMENTOS"){
			
			var recEquipamento = $("#ALOCRECURSON3RESUMOEQ").val() 
			
			// SE RECURSO EQUIPAMENTO NÃO FOI SELECIONADO
			if(recEquipamento=="" || recEquipamento==null || recEquipamento==undefined){
				
				recurso = true
				
			}
			
		}
		
		// SE RECURSO NÃO FOI INFORMADO
		if(recurso){
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'É necessário informar o recurso a ser buscado',
				  text: 'Verifique e tente novamente.'
			})
			
			// ESCONDE A TABELA DO RESUMO
			$(".TABELARESUMO").hide()
			
		} else {
			// SE TODOS OS CAMPOS FORAM INFORMADOS

			// LIMPA CONTEÚDO DA TABELA RESUMO DE ALOCAÇÃO
			limpaAlocacao()
			
			// LIMPA A SOMA DA TABELA DE ALOCAÇÃO
			limpaSomaAlocacao()
			
			// ADICIONA LINHA PARA O RESULTADO DA SOMA DOS RECURSOS ALOCADOS
			var rowSoma = addSomaAloc()
			
			// SALVA AS DATAS INFORMADAS
			$("#DATADE_ALOC").val(dataDe)
			$("#DATAATE_ALOC").val(dataAte)
			
			// SE 
			myLoading2.show();
			
			setTimeout(function(){
				
				var recursoPessoa = ""
				var recursoEquip = ""
				
				// VARIÁVEIS PARA OS CAMPOS DO FILTRO DA CONSULTA
				
				// SE TIPO DE RECURSO SELECIONADO FOI PESSOAS
				if(tipoRecurso=="PESSOAS"){
					
					recursoPessoa = $("#CODRECURSON3RESUMOPES").val()
					
				}
				
				// SE TIPO DE RECURSO SELECIONADO FOI EQUIPAMENTOS
				if(tipoRecurso=="EQUIPAMENTOS"){
					
					recursoEquip = $("#CODRECURSON3RESUMOEQ").val()
					
				}
				
				var ordenarPor = $("#ORDENARPOR").val()
				
				// FORMATA A DATA 
				if(!(dataDe==undefined || dataDe=="")){
					
					console.log("dataDe antes de formatar: "+dataDe)
					dataDe = formataDataBanco(dataDe)
					console.log("dataDe formatada: "+dataDe)
					
				} else {
					
					dataDe = ""
					
				}
				
				if(!(dataAte==undefined || dataAte=="")){
					console.log("dataAte antes de formatar: "+dataAte)
					dataAte = formataDataBanco(dataAte)	
					console.log("dataAte formatada: "+dataAte)
					
				} else {
					
					dataAte = ""
					
				}
				
				console.log("dataDe: "+dataDe+", dataAte: "+dataAte+", ordenarPor: "+ordenarPor+", recursoPessoa: "+
						recursoPessoa+", recursoEquip: "+recursoEquip)
				
				// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
				var a1 = DatasetFactory.createConstraint("DATA_DE",dataDe,dataDe,ConstraintType.MUST)
				var a2 = DatasetFactory.createConstraint("DATA_ATE",dataAte,dataAte,ConstraintType.MUST)
				var a3 = DatasetFactory.createConstraint("ORDENAR_POR",ordenarPor,ordenarPor,ConstraintType.MUST)
				var a4 = DatasetFactory.createConstraint("RECURSO_PESSOA",recursoPessoa,recursoPessoa,ConstraintType.MUST)
				//var a4 = DatasetFactory.createConstraint("CODMO",recursoPessoa,recursoPessoa,ConstraintType.MUST)
				var a5 = DatasetFactory.createConstraint("RECURSO_EQUIP",recursoEquip,recursoEquip,ConstraintType.MUST)
				
				constraints = new Array(a1,a2,a3,a4,a5)
				
				var dataset = DatasetFactory.getDataset("dsResumoAlocacaoRecursoOS",null,constraints,null)
				//var dataset = DatasetFactory.getDataset("dsBuscaHistAtvProgOperador",null,constraints,null)
				
				row = dataset.values
				console.log("row")
				console.log(row)
				
				// SE RETORNO É VAZIO OU NULO
				if(!(row=="" || row==null || row==undefined)){
					
					var count = dataset.values.length
					
					// PREENCHE DIAS DE CABEÇALHO
					preencheDiasCabecalhoAlocacao()
					
					// PREENCHE DIAS DA SOMA ALOCAÇÃO
					preencheDiasSomaAlocacao()
					
					var dia1 = $("#THDIA1ALOC").text()
					if(!(dia1=="")){
						dia1 = formataDataBanco(dia1)	
					}
					
					var dia2 = $("#THDIA2ALOC").text()
					if(!(dia2=="")){
						dia2 = formataDataBanco(dia2)	
					}
					
					var dia3 = $("#THDIA3ALOC").text()
					if(!(dia3=="")){
						dia3 = formataDataBanco(dia3)	
					}
					
					var dia4 = $("#THDIA4ALOC").text()
					if(!(dia4=="")){
						dia4 = formataDataBanco(dia4)	
					}
					
					var dia5 = $("#THDIA5ALOC").text()
					if(!(dia5=="")){
						dia5 = formataDataBanco(dia5)	
					}
					
					var dia6 = $("#THDIA6ALOC").text()
					if(!(dia6=="")){
						dia6 = formataDataBanco(dia6)	
					}
					
					var dia7 = $("#THDIA7ALOC").text()
					if(!(dia7=="")){
						dia7 = formataDataBanco(dia7)	
					}
					
					var dia8 = $("#THDIA8ALOC").text()
					if(!(dia8=="")){
						dia8 = formataDataBanco(dia8)	
					}
					
					var dia9 = $("#THDIA9ALOC").text()
					if(!(dia9=="")){
						dia9 = formataDataBanco(dia9)	
					}
					
					var dia10 = $("#THDIA10ALOC").text()
					if(!(dia10=="")){
						dia10 = formataDataBanco(dia10)	
					}
					
					console.log("count: "+count)
					
					// EXIBE A TABELA DO RESUMO
					$(".TABELARESUMO").show()
					
					// PERCORRE TODOS OS REGISTROS
					for(var i=0; i < count; i++){
						
						var rep = row[i]
						
						var codPosto = rep["CODPOSTO"]
						
						// SE É UMA OP DE RETRABALHO
						/*if(rep["RETRABALHO"]=="1"){
							
							codPosto = rep["VIEWCODPOSTO"]
							
						}*/
						
						// SE RECURSO PARA A OP E ATIVIDADE JÁ FOI INCLUÍDO NA TABELA
						if(temRecursoOPAtv(rep["OS"],rep["OP"],codPosto,rep["CODCOLIGADA"],rep["CODESTRUTURA"],rep["CODIGOPRD"],rep["CODMO"],rep["CODEQUIPAMENTO"],rep["RETRABALHO"])){
							
							console.log("Já foi incluído")
							
							var seq = buscaSeqResumoAloc(rep["OS"],rep["OP"],codPosto,rep["CODCOLIGADA"],rep["CODESTRUTURA"],rep["CODIGOPRD"],rep["CODMO"],rep["CODEQUIPAMENTO"],rep["RETRABALHO"])
							
							console.log("seq da linha encontrada "+seq)
							
							var dataProg = rep["DTHRINICIAL"]
							dataProg = dataProg.split(" ")
							dataProg = dataProg[0]
							
							console.log("dia1: "+dia1+", dia2: "+dia2+", dia3: "+dia3+", dia4: "+dia4+", dia5: "+dia5+", dia6: "+dia6+
									", dia7: "+dia7+", dia8: "+dia8+", dia9: "+dia9+", dia10: "+dia10)
							
							console.log("dataProg: "+dataProg)
							
							// SE DIA1 É IGUAL A DATA PROGRAMADA
							if(dia1==dataProg){
								
								console.log("achei "+dataProg+", o dia que vou somar no dia1")
								
								var alocado = rep["ALOCADO"]
								
								if(!(alocado=="" || alocado==null || alocado==undefined || alocado=="null")){
									
									var saldo = $("#DIA1ALOC___"+seq).val()
									console.log("saldo: "+saldo)
									
									if(!(saldo==null || saldo==undefined || saldo=="")){
										
										saldo = saldo.replace(",",".")
										
									} else {
										
										saldo = 0
										
									}
									
									console.log("saldo depois: "+saldo)
									saldo = parseFloat(saldo)
									alocado = parseFloat(alocado)
									
									console.log("vou somar saldo: "+saldo+" + alocado: "+alocado)
									
									var somaAloc = saldo + alocado
									
									somaAloc = somaAloc.toString()
									
									if(somaAloc.includes(".")){
										
										somaAloc = somaAloc.replace(".",",")	
										
									}
									
									$("#DIA1ALOC___"+seq).val(somaAloc)
									
								} 
								
							}
							
							// SE DIA2 É IGUAL A DATA PROGRAMADA
							if(dia2==dataProg){
								
								console.log("achei "+dataProg+", o dia que vou somar no dia2")
								
								var alocado = rep["ALOCADO"]
								
								if(!(alocado=="" || alocado==null || alocado==undefined || alocado=="null")){
									
									var saldo = $("#DIA2ALOC___"+seq).val()
									console.log("saldo: "+saldo)
									
									if(!(saldo==null || saldo==undefined || saldo=="")){
										
										saldo = saldo.replace(",",".")
										
									} else {
										
										saldo = 0
										
									}
									
									console.log("saldo depois: "+saldo)
									saldo = parseFloat(saldo)
									alocado = parseFloat(alocado)
									
									console.log("vou somar saldo: "+saldo+" + alocado: "+alocado)
									
									var somaAloc = saldo + alocado
									
									somaAloc = somaAloc.toString()
									
									if(somaAloc.includes(".")){
										
										somaAloc = somaAloc.replace(".",",")	
										
									}
									
									$("#DIA2ALOC___"+seq).val(somaAloc)
									
								} 
								
							}
							
							// SE DIA3 É IGUAL A DATA PROGRAMADA
							if(dia3==dataProg){
								
								console.log("achei "+dataProg+", o dia que vou somar no dia3")
								
								var alocado = rep["ALOCADO"]
								
								if(!(alocado=="" || alocado==null || alocado==undefined || alocado=="null")){
									
									var saldo = $("#DIA3ALOC___"+seq).val()
									console.log("saldo: "+saldo)
									if(!(saldo==null || saldo==undefined || saldo=="")){
										saldo = saldo.replace(",",".")
									} else {
										saldo = 0
									}
									console.log("saldo depois: "+saldo)
									saldo = parseFloat(saldo)
									alocado = parseFloat(alocado)
									
									console.log("vou somar saldo: "+saldo+" + alocado: "+alocado)
									
									var somaAloc = saldo + alocado
									
									somaAloc = somaAloc.toString()
									
									if(somaAloc.includes(".")){
										
										somaAloc = somaAloc.replace(".",",")	
										
									}
									
									$("#DIA3ALOC___"+seq).val(somaAloc)
									
								} 
								
							}
							
							// SE DIA4 É IGUAL A DATA PROGRAMADA
							if(dia4==dataProg){
								
								console.log("achei "+dataProg+", o dia que vou somar")
								
								var alocado = rep["ALOCADO"]
								
								if(!(alocado=="" || alocado==null || alocado==undefined || alocado=="null")){
									
									var saldo = $("#DIA4ALOC___"+seq).val()
									console.log("saldo: "+saldo)
									
									if(!(saldo==null || saldo==undefined || saldo=="")){
										
										saldo = saldo.replace(",",".")
										
									} else {
										
										saldo = 0
										
									}
									
									console.log("saldo depois: "+saldo)
									saldo = parseFloat(saldo)
									alocado = parseFloat(alocado)
									
									console.log("vou somar saldo: "+saldo+" + alocado: "+alocado)
									
									var somaAloc = saldo + alocado
									
									somaAloc = somaAloc.toString()
									
									if(somaAloc.includes(".")){
										
										somaAloc = somaAloc.replace(".",",")	
										
									}
									
									$("#DIA4ALOC___"+seq).val(somaAloc)
									
								} 
								
							}
							
							// SE DIA5 É IGUAL A DATA PROGRAMADA
							if(dia5==dataProg){
								
								console.log("achei "+dataProg+", o dia que vou somar")
								
								var alocado = rep["ALOCADO"]
								
								if(!(alocado=="" || alocado==null || alocado==undefined || alocado=="null")){
									
									var saldo = $("#DIA5ALOC___"+seq).val()
									console.log("saldo: "+saldo)
									
									if(!(saldo==null || saldo==undefined || saldo=="")){
										
										saldo = saldo.replace(",",".")
										
									} else {
										
										saldo = 0
										
									}
									
									console.log("saldo depois: "+saldo)
									saldo = parseFloat(saldo)
									alocado = parseFloat(alocado)
									
									console.log("vou somar saldo: "+saldo+" + alocado: "+alocado)
									
									var somaAloc = saldo + alocado
									
									somaAloc = somaAloc.toString()
									
									if(somaAloc.includes(".")){
										
										somaAloc = somaAloc.replace(".",",")	
										
									}
									
									$("#DIA5ALOC___"+seq).val(somaAloc)
									
								} 
								
							}
							
							// SE DIA6 É IGUAL A DATA PROGRAMADA
							if(dia6==dataProg){
								
								console.log("achei "+dataProg+", o dia que vou somar")
								
								var alocado = rep["ALOCADO"]
								
								if(!(alocado=="" || alocado==null || alocado==undefined || alocado=="null")){
									
									var saldo = $("#DIA6ALOC___"+seq).val()
									
									console.log("saldo: "+saldo)
									
									if(!(saldo==null || saldo==undefined || saldo=="")){
										
										saldo = saldo.replace(",",".")
										
									} else {
										
										saldo = 0
										
									}
									
									console.log("saldo depois: "+saldo)
									saldo = parseFloat(saldo)
									alocado = parseFloat(alocado)
									
									console.log("vou somar saldo: "+saldo+" + alocado: "+alocado)
									
									var somaAloc = saldo + alocado
									
									somaAloc = somaAloc.toString()
									
									if(somaAloc.includes(".")){
										
										somaAloc = somaAloc.replace(".",",")	
										
									}
									
									$("#DIA6ALOC___"+seq).val(somaAloc)
									
								} 
								
							}
							
							// SE DIA7 É IGUAL A DATA PROGRAMADA
							if(dia7==dataProg){
								
								console.log("achei "+dataProg+", o dia que vou somar")
								
								var alocado = rep["ALOCADO"]
								
								if(!(alocado=="" || alocado==null || alocado==undefined || alocado=="null")){
									
									var saldo = $("#DIA7ALOC___"+seq).val()
									console.log("saldo: "+saldo)
									
									if(!(saldo==null || saldo==undefined || saldo=="")){
										
										saldo = saldo.replace(",",".")
										
									} else {
										
										saldo = 0
										
									}
									
									console.log("saldo depois: "+saldo)
									saldo = parseFloat(saldo)
									alocado = parseFloat(alocado)
									
									console.log("vou somar saldo: "+saldo+" + alocado: "+alocado)
									
									var somaAloc = saldo + alocado
									
									somaAloc = somaAloc.toString()
									
									if(somaAloc.includes(".")){
										
										somaAloc = somaAloc.replace(".",",")	
										
									}
									
									$("#DIA7ALOC___"+seq).val(somaAloc)
									
								} 
								
							}
							
							// SE DIA8 É IGUAL A DATA PROGRAMADA
							if(dia8==dataProg){
								
								console.log("achei "+dataProg+", o dia que vou somar")
								
								var alocado = rep["ALOCADO"]
								
								if(!(alocado=="" || alocado==null || alocado==undefined || alocado=="null")){
									
									var saldo = $("#DIA8ALOC___"+seq).val()
									console.log("saldo: "+saldo)
									
									if(!(saldo==null || saldo==undefined || saldo=="")){
										
										saldo = saldo.replace(",",".")
										
									} else {
										
										saldo = 0
										
									}
									
									console.log("saldo depois: "+saldo)
									saldo = parseFloat(saldo)
									alocado = parseFloat(alocado)
									
									console.log("vou somar saldo: "+saldo+" + alocado: "+alocado)
									
									var somaAloc = saldo + alocado
									
									somaAloc = somaAloc.toString()
									
									if(somaAloc.includes(".")){
										
										somaAloc = somaAloc.replace(".",",")	
										
									}
									
									$("#DIA8ALOC___"+seq).val(somaAloc)
									
								} 
								
							}
							
							// SE DIA9 É IGUAL A DATA PROGRAMADA
							if(dia9==dataProg){
								
								console.log("achei "+dataProg+", o dia que vou somar")
								
								var alocado = rep["ALOCADO"]
								
								if(!(alocado=="" || alocado==null || alocado==undefined || alocado=="null")){
									
									var saldo = $("#DIA9ALOC___"+seq).val()
									console.log("saldo: "+saldo)
									
									if(!(saldo==null || saldo==undefined || saldo=="")){
										
										saldo = saldo.replace(",",".")
										
									} else {
										
										saldo = 0
										
									}
									
									console.log("saldo depois: "+saldo)
									saldo = parseFloat(saldo)
									alocado = parseFloat(alocado)
									
									console.log("vou somar saldo: "+saldo+" + alocado: "+alocado)
									
									var somaAloc = saldo + alocado
									
									somaAloc = somaAloc.toString()
									
									if(somaAloc.includes(".")){
										
										somaAloc = somaAloc.replace(".",",")	
										
									}
									
									$("#DIA9ALOC___"+seq).val(somaAloc)
									
								} 
								
							}
							
							// SE DIA10 É IGUAL A DATA PROGRAMADA
							if(dia10==dataProg){
								
								console.log("achei "+dataProg+", o dia que vou somar")
								
								var alocado = rep["ALOCADO"]
								
								if(!(alocado=="" || alocado==null || alocado==undefined || alocado=="null")){
									
									var saldo = $("#DIA10ALOC___"+seq).val()
									console.log("saldo: "+saldo)
									
									if(!(saldo==null || saldo==undefined || saldo=="")){
										
										saldo = saldo.replace(",",".")
										
									} else {
										
										saldo = 0
										
									}
									
									console.log("depois saldo: "+saldo)
									saldo = parseFloat(saldo)
									alocado = parseFloat(alocado)
									
									console.log("vou somar saldo: "+saldo+" + alocado: "+alocado)
									
									var somaAloc = saldo + alocado
									
									somaAloc = somaAloc.toString()
									
									if(somaAloc.includes(".")){
										
										somaAloc = somaAloc.replace(".",",")	
										
									}
									
									$("#DIA10ALOC___"+seq).val(somaAloc)
									
								} 

							}
							
						} else {
							// SE NÃO
							
							console.log("não tem linha, vou adicionar")
							
							var seq = addAlocacao()
							
							$("#OSALOC___"+seq).val(rep["OS"])
							$("#CELULAALOC___"+seq).val(rep["CELULA"])
							$("#OPALOC___"+seq).val(rep["OP"])
							$("#ITEMALOC___"+seq).val(rep["DSCITEM"])
							$("#POSTOALOC___"+seq).val(rep["CODPOSTO"])
							$("#ATIVIDADEALOC___"+seq).val(rep["DSCATIVIDADE"])
							$("#CODATIVIDADEALOC___"+seq).val(rep["CODATIVIDADE"])
							$("#CODCOLIGADAALOC___"+seq).val(rep["CODCOLIGADA"])
							$("#CODFILIALALOC___"+seq).val(rep["CODFILIAL"])
							$("#CODESTRUTURAALOC___"+seq).val(rep["CODESTRUTURA"])
							$("#CODPOSTOALOC___"+seq).val(rep["CODPOSTO"])
							$("#CODIGOPRDALOC___"+seq).val(rep["CODIGOPRD"])
							$("#CODMOALOC___"+seq).val(rep["CODMO"])
							$("#CODEQUIPAMENTOALOC___"+seq).val(rep["CODEQUIPAMENTO"])
							$("#PRIORIDADEALOC___"+seq).val(rep["PRIORIDADE"])
							$("#CODPOSTOALOC___"+seq).val(rep["CODPOSTO"])
								
							// SE É UMA OP DE RETRABALHO
							/*if(rep["RETRABALHO"]=="1"){
							
								$("#PRIORIDADEALOC___"+seq).val(rep["VIEWPRIORIDADE"])
								$("#CODPOSTOALOC___"+seq).val(rep["VIEWCODPOSTO"])
								
							} else {
								// SE NÃO
								
								$("#PRIORIDADEALOC___"+seq).val(rep["PRIORIDADE"])
								$("#CODPOSTOALOC___"+seq).val(rep["CODPOSTO"])
								
							}*/
							
							// SE NÚMERO DO PLANO DE CORTE FOI PREENCHUDO
							if(!(rep["NUMPLANOCORTE"]=="" || rep["NUMPLANOCORTE"]=="null" || rep["NUMPLANOCORTE"]==null || rep["NUMPLANOCORTE"]==undefined)){
								
								$("#PLANOCORTEALOC___"+seq).val(rep["NUMPLANOCORTE"])
								
							}
							
							$("#DIA1ALOCREAL___"+seq).val(dia1)
							$("#DIA2ALOCREAL___"+seq).val(dia2)
							$("#DIA3ALOCREAL___"+seq).val(dia3)
							$("#DIA4ALOCREAL___"+seq).val(dia4)
							$("#DIA5ALOCREAL___"+seq).val(dia5)
							$("#DIA6ALOCREAL___"+seq).val(dia6)
							$("#DIA7ALOCREAL___"+seq).val(dia7)
							$("#DIA8ALOCREAL___"+seq).val(dia8)
							$("#DIA9ALOCREAL___"+seq).val(dia9)
							$("#DIA10ALOCREAL___"+seq).val(dia10)
							
							var dataProg = rep["DTHRINICIAL"]
							dataProg = dataProg.split(" ")
							dataProg = dataProg[0]
							
							console.log("dia1: "+dia1+", dia2: "+dia2+", dia3: "+dia3+", dia4: "+dia4+", dia5: "+dia5+", dia6: "+dia6+
									", dia7: "+dia7+", dia8: "+dia8+", dia9: "+dia9+", dia10: "+dia10)
							
							console.log("dataProg: "+dataProg)
							
							// SE DIA1 É IGUAL A DATA PROGRAMADA
							if(dia1==dataProg){
								
								var alocado = rep["ALOCADO"]
								
								if(!(alocado=="" || alocado==null || alocado==undefined || alocado=="null")){
									
									alocado = parseFloat(alocado)
									alocado = alocado.toFixed(2)
									alocado = alocado.toString()
									
									if(alocado.includes(".")){
										
										alocado = alocado.replace(".",",")
										
									}
									
									$("#DIA1ALOC___"+seq).val(alocado)
									
								} else {
									
									$("#DIA1ALOC___"+seq).val(0)
									
								}
								
							} else {
								
								$("#DIA1ALOC___"+seq).val(0)
								
							}
							
							// SE DIA2 É IGUAL A DATA PROGRAMADA
							if(dia2==dataProg){
								
								var alocado = rep["ALOCADO"]
								
								if(!(alocado=="" || alocado==null || alocado==undefined || alocado=="null")){
									
									alocado = parseFloat(alocado)
									alocado = alocado.toFixed(2)
									alocado = alocado.toString()
									
									if(alocado.includes(".")){
										
										alocado = alocado.replace(".",",")
										
									}
									
									$("#DIA2ALOC___"+seq).val(alocado)
									
								} else {
									
									$("#DIA2ALOC___"+seq).val(0)
									
								}
								
							} else {
								
								$("#DIA2ALOC___"+seq).val(0)
								
							}
							
							// SE DIA3 É IGUAL A DATA PROGRAMADA
							if(dia3==dataProg){
								
								var alocado = rep["ALOCADO"]
								
								if(!(alocado=="" || alocado==null || alocado==undefined || alocado=="null")){
									
									alocado = parseFloat(alocado)
									alocado = alocado.toFixed(2)
									alocado = alocado.toString()
									
									if(alocado.includes(".")){
										
										alocado = alocado.replace(".",",")
										
									}
									
									$("#DIA3ALOC___"+seq).val(alocado)
									
								} else {
									
									$("#DIA3ALOC___"+seq).val(0)
									
								}
								
							} else {
								
								$("#DIA3ALOC___"+seq).val(0)
								
							}
							
							// SE DIA4 É IGUAL A DATA PROGRAMADA
							if(dia4==dataProg){
								
								var alocado = rep["ALOCADO"]
								
								if(!(alocado=="" || alocado==null || alocado==undefined || alocado=="null")){
									
									alocado = parseFloat(alocado)
									alocado = alocado.toFixed(2)
									alocado = alocado.toString()
									
									if(alocado.includes(".")){
										
										alocado = alocado.replace(".",",")
										
									}
									
									$("#DIA4ALOC___"+seq).val(alocado)
									
								} else {
									
									$("#DIA4ALOC___"+seq).val(0)
									
								}
								
							} else {
								
								$("#DIA4ALOC___"+seq).val(0)
								
							}
							
							// SE DIA5 É IGUAL A DATA PROGRAMADA
							if(dia5==dataProg){
								
								var alocado = rep["ALOCADO"]
								
								if(!(alocado=="" || alocado==null || alocado==undefined || alocado=="null")){
									
									alocado = parseFloat(alocado)
									alocado = alocado.toFixed(2)
									alocado = alocado.toString()
									
									if(alocado.includes(".")){
										
										alocado = alocado.replace(".",",")
										
									}
									
									$("#DIA5ALOC___"+seq).val(alocado)
									
								} else {
									
									$("#DIA5ALOC___"+seq).val(0)
									
								}
								
							} else {
								
								$("#DIA5ALOC___"+seq).val(0)
								
							}
							
							// SE DIA6 É IGUAL A DATA PROGRAMADA
							if(dia6==dataProg){
								
								var alocado = rep["ALOCADO"]
								
								if(!(alocado=="" || alocado==null || alocado==undefined || alocado=="null")){
									
									alocado = parseFloat(alocado)
									alocado = alocado.toFixed(2)
									alocado = alocado.toString()
									
									if(alocado.includes(".")){
										
										alocado = alocado.replace(".",",")
										
									}
									
									$("#DIA6ALOC___"+seq).val(alocado)
									
								} else {
									
									$("#DIA6ALOC___"+seq).val(0)
									
								}
								
							} else {
								
								$("#DIA6ALOC___"+seq).val(0)
								
							}
							
							// SE DIA7 É IGUAL A DATA PROGRAMADA
							if(dia7==dataProg){
								
								var alocado = rep["ALOCADO"]
								
								if(!(alocado=="" || alocado==null || alocado==undefined || alocado=="null")){
									
									alocado = parseFloat(alocado)
									alocado = alocado.toFixed(2)
									alocado = alocado.toString()
									
									if(alocado.includes(".")){
										
										alocado = alocado.replace(".",",")
										
									}
									
									$("#DIA7ALOC___"+seq).val(alocado)
									
								} else {
									
									$("#DIA7ALOC___"+seq).val(0)
									
								}
								
							} else {
								
								$("#DIA7ALOC___"+seq).val(0)
								
							}
							
							// SE DIA8 É IGUAL A DATA PROGRAMADA
							if(dia8==dataProg){
								
								var alocado = rep["ALOCADO"]
								
								if(!(alocado=="" || alocado==null || alocado==undefined || alocado=="null")){
									
									alocado = parseFloat(alocado)
									alocado = alocado.toFixed(2)
									alocado = alocado.toString()
									
									if(alocado.includes(".")){
										
										alocado = alocado.replace(".",",")
										
									}
									
									$("#DIA8ALOC___"+seq).val(alocado)
									
								} else {
									
									$("#DIA8ALOC___"+seq).val(0)
									
								}
								
							} else {
								
								$("#DIA8ALOC___"+seq).val(0)
								
							}
							
							// SE DIA9 É IGUAL A DATA PROGRAMADA
							if(dia9==dataProg){
								
								var alocado = rep["ALOCADO"]
								
								if(!(alocado=="" || alocado==null || alocado==undefined || alocado=="null")){
									
									alocado = parseFloat(alocado)
									alocado = alocado.toFixed(2)
									alocado = alocado.toString()
									
									if(alocado.includes(".")){
										
										alocado = alocado.replace(".",",")
										
									}
									
									$("#DIA9ALOC___"+seq).val(alocado)
									
								} else {
									
									$("#DIA9ALOC___"+seq).val(0)
									
								}
								
							} else {
								
								$("#DIA9ALOC___"+seq).val(0)
								
							}
							
							// SE DIA10 É IGUAL A DATA PROGRAMADA
							if(dia10==dataProg){
								
								var alocado = rep["ALOCADO"]

								if(!(alocado=="" || alocado==null || alocado==undefined || alocado=="null")){
									
									alocado = parseFloat(alocado)
									alocado = alocado.toFixed(2)
									alocado = alocado.toString()
									
									if(alocado.includes(".")){
										
										alocado = alocado.replace(".",",")
										
									}
									
									$("#DIA10ALOC___"+seq).val(alocado)
									
								} else {
									
									$("#DIA10ALOC___"+seq).val(0)
									
								}
								
							} else {
								
								$("#DIA10ALOC___"+seq).val(0)
								
							}
							
						}
						
					}
					
					$("#ICONREDUZIR").click()
					
					// CALCULA A SOMA DOS ITENS DA ALOCAÇÃO
					calculaSomaAlocacao(rowSoma)
					
					// EXIBE CLASSE VISÍVEL DOS RECURSOS ALOCADOS
					exibeClasseVisivelAlocacao()
					
				} else {
					// SE NÃO, A CONSULTA NÃO OBTEVE RETORNO 
					
					// EXIBE OS CAMPOS
					//$("#ABAS").hide()
					$(".TABELARESUMO").hide()
					$("#ICONEXPANDIR2").click()
					
					// EXIBE ALERTA
					Swal.fire({
						  icon: 'error',
						  title: 'Busca para os filtros informados não obteve retorno',
						  message: 'Verifique e tente novamente.'
					})
					
				}
				
			},500)
			
			// DESATIVA O LOAD
			setTimeout(function(){
				
				myLoading2.hide();
				
			},500)
			
		}
		
	}
					
}

// BUSCA O SEQ DA TABELA COM OS ITENS
function buscaSeqResumoAloc(os,op,codPosto,codcoligada,codEstrutura,codigoPrd,codMo,codEquipamento){
	
	var seqRet 
	
	console.log("entrei para buscar o seq da linha já incluída")
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSALOC___']").each(function(){
	
		var seq = $(this).attr("id").split("___")[1]
		
		var osAloc = $("#OSALOC___"+seq).val()
		var opAloc = $("#OPALOC___"+seq).val()
		var codPostoAloc = $("#CODPOSTOALOC___"+seq).val()
		var codcoligadaAloc = $("#CODCOLIGADAALOC___"+seq).val()
		var codEstruturaAloc = $("#CODESTRUTURAALOC___"+seq).val()
		var codigoPrdAloc = $("#CODIGOPRDALOC___"+seq).val()
		var codMoAloc = $("#CODMOALOC___"+seq).val()
		var codEquipamentoAloc = $("#CODEQUIPAMENTOALOC___"+seq).val()
		
		// SE ITEM EXISTE
		if(os==osAloc && op==opAloc && codPosto==codPostoAloc && codcoligada==codcoligadaAloc && codEstrutura==codEstruturaAloc && 
				codigoPrd==codigoPrdAloc && codMo==codMoAloc && codEquipamento==codEquipamentoAloc){
			
			console.log("ACHEI O SEQ!!")
			
			seqRet = seq
			
		}
		
	})
	
	return seqRet
	
}

// VERIFICA SE RECURSO PARA A OP E A ATIVIDADE JÁ FOI INCLUÍDO NA TABELA
function temRecursoOPAtv(os,op,codPosto,codcoligada,codEstrutura,codigoPrd,codMo,codEquipamento){
	
	console.log("vou verificar se já tem uma linha para a atividade em questão")
	console.log("Os: "+os+", op: "+op+", codPosto: "+codPosto+", codColigada: "+codcoligada+", codEstrutura: "+
			codEstrutura+", codigoPrd: "+codigoPrd+", codMo: "+codMo+", codEquipamento: "+codEquipamento)
	
	var ret = false
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSALOC___']").each(function(){
	
		var seq = $(this).attr("id").split("___")[1]
		
		var osAloc = $("#OSALOC___"+seq).val()
		var opAloc = $("#OPALOC___"+seq).val()
		var codPostoAloc = $("#CODPOSTOALOC___"+seq).val()
		var codcoligadaAloc = $("#CODCOLIGADAALOC___"+seq).val()
		var codEstruturaAloc = $("#CODESTRUTURAALOC___"+seq).val()
		var codigoPrdAloc = $("#CODIGOPRDALOC___"+seq).val()
		var codMoAloc = $("#CODMOALOC___"+seq).val()
		var codEquipamentoAloc = $("#CODEQUIPAMENTOALOC___"+seq).val()
		
		// SE ITEM EXISTE
		if(os==osAloc && op==opAloc && codPosto==codPostoAloc && codcoligada==codcoligadaAloc && codEstrutura==codEstruturaAloc && 
				codigoPrd==codigoPrdAloc && codMo==codMoAloc && codEquipamento==codEquipamentoAloc){
			
			console.log("achei!!!")
			
			ret = true
			
		}
		
	})
	
	return ret
	
}

// LIMPA A TABELA DE RESUMO DE ALOCAÇÃO
function limpaAlocacao(){
	
	// LIMPA CONTEÚDO DA TABELA RESUMO DE ALOCAÇÃO
	$("input[id^='OSALOC___']").each(function(){
	
		$(this).parents("tr").remove();
		
	})
	
	// LIMPA OS DIAS
	$("#THDIA1ALOC").html("")
	$("#THDIA2ALOC").html("")
	$("#THDIA3ALOC").html("")
	$("#THDIA4ALOC").html("")
	$("#THDIA5ALOC").html("")
	$("#THDIA6ALOC").html("")
	$("#THDIA7ALOC").html("")
	$("#THDIA8ALOC").html("")
	$("#THDIA9ALOC").html("")
	$("#THDIA10ALOC").html("")
	
	$("#THDIA1ALOC").removeClass("visivel")
	$("#THDIA2ALOC").removeClass("visivel")
	$("#THDIA3ALOC").removeClass("visivel")
	$("#THDIA4ALOC").removeClass("visivel")
	$("#THDIA5ALOC").removeClass("visivel")
	$("#THDIA6ALOC").removeClass("visivel")
	$("#THDIA7ALOC").removeClass("visivel")
	$("#THDIA8ALOC").removeClass("visivel")
	$("#THDIA9ALOC").removeClass("visivel")
	$("#THDIA10ALOC").removeClass("visivel")

	$("#THDIA1ALOCCAB").removeClass("visivel")
	$("#THDIA2ALOCCAB").removeClass("visivel")
	$("#THDIA3ALOCCAB").removeClass("visivel")
	$("#THDIA4ALOCCAB").removeClass("visivel")
	$("#THDIA5ALOCCAB").removeClass("visivel")
	$("#THDIA6ALOCCAB").removeClass("visivel")
	$("#THDIA7ALOCCAB").removeClass("visivel")
	$("#THDIA8ALOCCAB").removeClass("visivel")
	$("#THDIA9ALOCCAB").removeClass("visivel")
	$("#THDIA10ALOCCAB").removeClass("visivel")

}

// LIMPA A SOMA DA TABELA DE ALOCAÇÃO
function limpaSomaAlocacao(){
	
	// LIMPA CONTEÚDO DA TABELA RESUMO DE ALOCAÇÃO
	$("input[id^='DIA1SOMAALOC___']").each(function(){
	
		$(this).parents("tr").remove();
		
	})
	
	$("#THDIA1SOMAALOC").removeClass("visivel")
	$("#THDIA2SOMAALOC").removeClass("visivel")
	$("#THDIA3SOMAALOC").removeClass("visivel")
	$("#THDIA4SOMAALOC").removeClass("visivel")
	$("#THDIA5SOMAALOC").removeClass("visivel")
	$("#THDIA6SOMAALOC").removeClass("visivel")
	$("#THDIA7SOMAALOC").removeClass("visivel")
	$("#THDIA8SOMAALOC").removeClass("visivel")
	$("#THDIA9SOMAALOC").removeClass("visivel")
	$("#THDIA10SOMAALOC").removeClass("visivel")
	
}

// LIMPAR A CAIXA DE TEXTO DO PROCESSO 
function limpaProcesso(){
	
	$("#DESCPROCESSO").val("")
	
}

// LIMPAR A TABELA DE APONTAMENTOS DA ATIVIDADE
function limpaApontamentosAtv(){
	
	// LIMPA CONTEÚDO DA TABELA RESUMO DE ALOCAÇÃO
	$("input[id^='DATAAPONT___']").each(function(){
	
		$(this).parents("tr").remove();
		
	})
	
}

// LIMPAR A TABELA DE PLANO DE CORTE DA ATIVIDADE
function limpaPlanoCorteAtv(){
	
	// LIMPA CONTEÚDO DA TABELA DE PLANO DE CORTE
	$("input[id^='NUMPLANOCORTEATV___']").each(function(){
	
		$(this).parents("tr").remove();
		
	})
	
}

// LIMPAR A TABELA DE RECURSOS ALOCADOS DE ATIVIDADE
function limpaRecAlocAtv(){
	
	// PERCORRE OS ITENS DA TABELA E REMOVE O SEU CONTEÚDO
	$("input[id^='OPERADORRECALOCATV___']").each(function(index, value){
		
		$(this).parents("tr").remove();
		
	});
	
	// PERCORRE OS ITENS DA TABELA E REMOVE O SEU CONTEÚDO
	$("input[id^='SOMADIA1RECALOCATV___']").each(function(index, value){
		
		$(this).parents("tr").remove();
		
	});
	
	// REMOVE CONTEÚDO DIAS
	$("#THDIA1RECALOC").html("")
	$("#THDIA2RECALOC").html("")
	$("#THDIA3RECALOC").html("")
	$("#THDIA4RECALOC").html("")
	$("#THDIA5RECALOC").html("")
	$("#THDIA6RECALOC").html("")
	$("#THDIA7RECALOC").html("")
	$("#THDIA8RECALOC").html("")
	$("#THDIA9RECALOC").html("")
	$("#THDIA10RECALOC").html("")
	
	$("#THDIA1RECALOC").removeClass("visivel")
	$("#THDIA2RECALOC").removeClass("visivel")
	$("#THDIA3RECALOC").removeClass("visivel")
	$("#THDIA4RECALOC").removeClass("visivel")
	$("#THDIA5RECALOC").removeClass("visivel")
	$("#THDIA6RECALOC").removeClass("visivel")
	$("#THDIA7RECALOC").removeClass("visivel")
	$("#THDIA8RECALOC").removeClass("visivel")
	$("#THDIA9RECALOC").removeClass("visivel")
	$("#THDIA10RECALOC").removeClass("visivel")
	
	$("#THDIA1SOMARECALOC").removeClass("visivel")
	$("#THDIA2SOMARECALOC").removeClass("visivel")
	$("#THDIA3SOMARECALOC").removeClass("visivel")
	$("#THDIA4SOMARECALOC").removeClass("visivel")
	$("#THDIA5SOMARECALOC").removeClass("visivel")
	$("#THDIA6SOMARECALOC").removeClass("visivel")
	$("#THDIA7SOMARECALOC").removeClass("visivel")
	$("#THDIA8SOMARECALOC").removeClass("visivel")
	$("#THDIA9SOMARECALOC").removeClass("visivel")
	$("#THDIA10SOMARECALOC").removeClass("visivel")
	
	// LIMPA A SELEÇÃO DO CAMPO ZOOM
	$("#MOTDESPROG>option").remove()
	$("#CODINTERNO").val("")
	
}

// LIMPAR A TABELA DE RECURSOS APTOS DISPONÍVEIS
function limpaRecAptoDispAtv(){
	
	// PERCORRE OS ITENS DA TABELA E REMOVE O SEU CONTEÚDO
	$("input[id^='OPERADORRECAPTOSDISPATV___']").each(function(index, value){
		
		$(this).parents("tr").remove();
		
	});
	
	// PERCORRE OS ITENS DA TABELA E REMOVE O SEU CONTEÚDO
	$("input[id^='SOMADIA1RECAPTOSDISPATV___']").each(function(index, value){
		
		$(this).parents("tr").remove();
		
	});
	
	// REMOVE CONTEÚDO DIAS
	$("#THDIA1RECAPTDISP").html("")
	$("#THDIA2RECAPTDISP").html("")
	$("#THDIA3RECAPTDISP").html("")
	$("#THDIA4RECAPTDISP").html("")
	$("#THDIA5RECAPTDISP").html("")
	$("#THDIA6RECAPTDISP").html("")
	$("#THDIA7RECAPTDISP").html("")
	$("#THDIA8RECAPTDISP").html("")
	$("#THDIA9RECAPTDISP").html("")
	$("#THDIA10RECAPTDISP").html("")
	
	$("#THDIA1RECAPTDISP").removeClass("visivel")
	$("#THDIA2RECAPTDISP").removeClass("visivel")
	$("#THDIA3RECAPTDISP").removeClass("visivel")
	$("#THDIA4RECAPTDISP").removeClass("visivel")
	$("#THDIA5RECAPTDISP").removeClass("visivel")
	$("#THDIA6RECAPTDISP").removeClass("visivel")
	$("#THDIA7RECAPTDISP").removeClass("visivel")
	$("#THDIA8RECAPTDISP").removeClass("visivel")
	$("#THDIA9RECAPTDISP").removeClass("visivel")
	$("#THDIA10RECAPTDISP").removeClass("visivel")

	$("#THDIA1SOMARECAPDISP").removeClass("visivel")
	$("#THDIA2SOMARECAPDISP").removeClass("visivel")
	$("#THDIA3SOMARECAPDISP").removeClass("visivel")
	$("#THDIA4SOMARECAPDISP").removeClass("visivel")
	$("#THDIA5SOMARECAPDISP").removeClass("visivel")
	$("#THDIA6SOMARECAPDISP").removeClass("visivel")
	$("#THDIA7SOMARECAPDISP").removeClass("visivel")
	$("#THDIA8SOMARECAPDISP").removeClass("visivel")
	$("#THDIA9SOMARECAPDISP").removeClass("visivel")
	$("#THDIA10SOMARECAPDISP").removeClass("visivel")
	
}

// LIMPAR A TABELA DO MODAL DO PROGRAMADO
function limpaProgramadoAtv(){
	
	// PERCORRE OS ITENS DA TABELA E REMOVE O SEU CONTEÚDO
	$("input[id^='DIAALOCADO___']").each(function(index, value){
		
		$(this).parents("tr").remove();
		
	});
	
}

// FIXA A COLUNA ITEM
function fixaColuna(obj){
	
	var instance = $(obj).attr("id")
	console.log("instance: "+instance)
	
	// SE A CLASSE TD ESTÁ SELECIONADA
	if($("#"+instance).hasClass("fixo")){
		
		// REMOVE A CLASSE DE FIXAR A COLUNA
		$("#"+instance).removeClass("fixo")
		$("#"+instance).removeClass("corSelecao")
		
	} else {
		// SE NÃO ESTÁ SELECIONADA
		
		// COLOCA A CLASSE DE FIXAR A COLUNA
		$("#"+instance).addClass("fixo")
		$("#"+instance).addClass("corSelecao")
		
	}
	
	instance = instance.replace("TH","")
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='"+instance+"___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		console.log("estou no item "+seq)
		
		var ancestral = $("#"+instance+"___"+seq).closest("td")
		
		// SE A CLASSE TD ESTÁ SELECIONADA
		if($(ancestral).hasClass("fixo")){
			
			console.log("item "+seq+" tem classe fixo, vou remover")
			
			// REMOVE A CLASSE DE FIXAR A COLUNA
			$(ancestral).removeClass("fixo")
			$(ancestral).removeClass("corSelecao")
			
		} else {
			// SE NÃO ESTÁ SELECIONADA
			console.log("item "+seq+" tem classe fixo, vou colocar")
			
			// COLOCA A CLASSE DE FIXAR A COLUNA
			$(ancestral).addClass("fixo")
			$(ancestral).addClass("corSelecao")
			
		}
		
	})
	
}

// HABILITA O CALENDÁRIO "ATÉ" PARA A SELEÇÃO DE ATÉ 10 DIAS DA DATA SELECIONADA NO CAMPO "DE"
function habilitaDataAte(){
	
	var dataDe = $("#DATA_DE").val()
	
	console.log("VOU COLOCAR DATA NO 'ATÉ'")
	
	// SE DATA É VÁLIDA
	//if(dataDe.length==10){
		
		// SE DATA FOI INFORMADA
		if(!(dataDe=="" || dataDe==null || dataDe==undefined)){
			
			console.log("dataDe: "+dataDe)
			dataDe = dataDe.split("/")
			console.log("dataDe: "+dataDe)
			
			var dia = dataDe[0]
			var mes = dataDe[1]
			var ano = dataDe[2]
			
			console.log("dia: "+dia+", mes: "+mes+", ano: "+ano)
			
			//$("#DATA_ATE").prop("readonly",false)
			
			//var mySimpleCalendar = FLUIGC.calendar('#DATA_ATE');
			console.log("dataDe: "+dataDe)
			
			var dataMin = new Date(ano,mes-1,dia)
			//var dataMin = new Date(dataDe[2],dataDe[1],dataDe[0])
			//var dataMin = new Date()
			
			var dataMax = new Date(ano,mes-1,dia)
			//var dataMax = new Date(dataDe[2],dataDe[1],dataDe[0])
			//var dataMax = new Date()
			
			dataMax.setDate(dataMin.getDate() + 9)
			
			console.log("dataMin: "+dataMin+", dataMax: "+dataMax)
			
			//mySimpleCalendar.setMinDate(new Date(dataMin[1]+" "+dataMin[0]+", "+dataMin[2]));
			//mySimpleCalendar.setMaxDate(new Date(dataMax[1]+" "+dataMax[0]+", "+dataMax[2]));
			
			//if(!($("#ATE").val()=="" || $("#ATE").val()==null || $("#ATE").val()==undefined)){
				console.log("vou remover o ATE")
				$("#ATE").remove()
				$("#SPANATE").remove()
				$("#PERIODO2").append("<input type='text' class='form-control' id='ATE' name='ATE' onchange='limpaDataAte()' readonly><span class='input-group-addon' id='SPANATE' name='SPANATE'><span class='fluigicon fluigicon-calendar'></span></span>")
			//}
			
			var mySimpleCalendar2 = FLUIGC.calendar("#ATE", { language: 'pt-br', minDate: dataMin, maxDate: dataMax, pickDate: true, pickTime: false });
			
			var dataForm = formataDataDate(dataMax)
			
			console.log("dataForm: "+dataForm)
			
			mySimpleCalendar2.setDate(dataForm);
			
			//mySimpleCalendar2.setDate(""+dia+"/"+mes+"/"+ano+"");
			
			
			//mySimpleCalendar.setMinDate(dataMin);
			//mySimpleCalendar.setMaxDate(dataMax)
			
		}
		
	/*} else {
		// SE NÃO
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'É necessário informar a data no padrão correto',
			  text: 'Verifique e tente novamente.'
		})
		
		$("#DATA_DE").val("")
		$("#ATE").val("")
		
	}*/
		
}

// HABILITA O CALENDÁRIO "ATÉ" PARA A SELEÇÃO DE ATÉ 10 DIAS DA DATA SELECIONADA NO CAMPO "DE"
function habilitaDataAteAloc(){
	
	var dataDe = $("#DATA_DE_RESALOC").val()
	
	console.log("VOU COLOCAR DATA NO 'ATÉ'")
	
	// SE DATA FOI INFORMADA
	if(!(dataDe=="" || dataDe==null || dataDe==undefined)){
		
		console.log("dataDe: "+dataDe)
		dataDe = dataDe.split("/")
		console.log("dataDe: "+dataDe)
		
		var dia = dataDe[0]
		var mes = dataDe[1]
		var ano = dataDe[2]
		
		console.log("dia: "+dia+", mes: "+mes+", ano: "+ano)
		
		//$("#DATA_ATE").prop("readonly",false)
		
		//var mySimpleCalendar = FLUIGC.calendar('#DATA_ATE');
		console.log("dataDe: "+dataDe)
		
		var dataMin = new Date(ano,mes-1,dia)
		//var dataMin = new Date(dataDe[2],dataDe[1],dataDe[0])
		//var dataMin = new Date()
		
		var dataMax = new Date(ano,mes-1,dia)
		//var dataMax = new Date(dataDe[2],dataDe[1],dataDe[0])
		//var dataMax = new Date()
		
		dataMax.setDate(dataMin.getDate() + 9)
		
		console.log("dataMin: "+dataMin+", dataMax: "+dataMax)
		
		//mySimpleCalendar.setMinDate(new Date(dataMin[1]+" "+dataMin[0]+", "+dataMin[2]));
		//mySimpleCalendar.setMaxDate(new Date(dataMax[1]+" "+dataMax[0]+", "+dataMax[2]));
		
		//if(!($("#ATE").val()=="" || $("#ATE").val()==null || $("#ATE").val()==undefined)){
			console.log("vou remover o ATE")
			$("#ATE_RESALOC").remove()
			$("#SPANATE_RESALOC").remove()
			$("#PERIODO4").append("<input type='text' class='form-control' id='ATE_RESALOC' name='ATE_RESALOC' onchange='limpaDataAteAloc()' readonly><span class='input-group-addon' id='SPANATE_RESALOC' name='SPANATE_RESALOC'><span class='fluigicon fluigicon-calendar'></span></span>")
		//}
		
		var mySimpleCalendar2 = FLUIGC.calendar("#ATE_RESALOC", { language: 'pt-br', minDate: dataMin, maxDate: dataMax, pickDate: true, pickTime: false });
		mySimpleCalendar2.setDate(""+dia+"/"+mes+"/"+ano+"");
		
		//mySimpleCalendar.setMinDate(dataMin);
		//mySimpleCalendar.setMaxDate(dataMax)
		
	}
	
}

// LIMPA O CAMPO DA DATA "ATÉ"
function limpaDataAteAloc(){
	
	console.log("VOU LIMPAR A DATA ATÉ")
	
	var dataAte = $("#ATE_RESALOC").val()
	var dataMin = $("#DATA_DE_RESALOC").val()
	
	// SE DATA INFORMADA É VÁLIDA
	if(dataMin.length==10){
		
		dataMin = dataMin.split("/")
		var diaMin = dataMin[0]
		var mesMin = dataMin[1]
		var anoMin = dataMin[2]
		
		dataAte = dataAte.split("/")
		var dia = dataAte[0]
		var mes = dataAte[1]
		var ano = dataAte[2]
		
		var dataAte = new Date(ano,mes-1,dia)
		var dataMin = new Date(anoMin,mesMin-1,diaMin)
		var dataMax = new Date(ano,mes-1,dia)
		dataMax.setDate(dataMin.getDate() + 9)
		
		console.log("dataAte: "+dataAte+", dataMin: "+dataMin+", dataMax: "+dataMax)
		
		if(dataAte<dataMin || dataAte>dataMax){
			
			$("#ATE_RESALOC").val("")
			
			/*$("#ATE").remove()
			$("#SPANATE").remove()
			$("#PERIODO2").append("<input type='text' class='form-control' id='ATE' name='ATE' readonly><span class='input-group-addon' id='SPANATE' name='SPANATE'><span class='fluigicon fluigicon-calendar'></span></span>")
			
			var mySimpleCalendar2 = FLUIGC.calendar("#ATE", { language: 'pt-br', minDate: dataMin, maxDate: dataMax, pickDate: true, pickTime: false });*/
			
		}
		
	} else {
		// SE NÃO
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'É necessário informar a data no padrão correto',
			  text: 'Verifique e tente novamente.'
		})
		
		$("#ATE_RESALOC").val("")
		$("#DATA_DE_RESALOC").val("")
		
	}
	
}

// LIMPA O CAMPO DA DATA "ATÉ"
function limpaDataAte(){
	
	console.log("VOU LIMPAR A DATA ATÉ")
	
	var dataAte = $("#ATE").val()
	var dataMin = $("#DATA_DE").val()
	
	console.log("click na data de")
	
	// SE DATA INFORMADA É VÁLIDA
	if(dataMin.length==10){
		
		console.log("dataAte: "+dataAte+", dataMin: "+dataMin)
		
		dataMin = dataMin.split("/")
		var diaMin = dataMin[0]
		var mesMin = dataMin[1]
		var anoMin = dataMin[2]
		
		dataAte = dataAte.split("/")
		var dia = dataAte[0]
		var mes = dataAte[1]
		var ano = dataAte[2]
		
		var dataAte = new Date(ano,mes-1,dia)
		var dataMin = new Date(anoMin,mesMin-1,diaMin)
		var dataMax = new Date(ano,mes-1,dia)
		
		console.log("dataAte: "+dataAte+", dataMin: "+dataMin+", dataMax: "+dataMax)
		
		dataMax.setDate(dataMin.getDate() + 9)
		
		console.log("dataAte: "+dataAte+", dataMin: "+dataMin+", dataMax: "+dataMax)
		
		if(dataAte<dataMin || dataAte>dataMax){
			
			/*$("#ATE").val("")
			
			$("#ATE").remove()
			$("#SPANATE").remove()
			$("#PERIODO2").append("<input type='text' class='form-control' id='ATE' name='ATE' readonly><span class='input-group-addon' id='SPANATE' name='SPANATE'><span class='fluigicon fluigicon-calendar'></span></span>")
			
			var mySimpleCalendar2 = FLUIGC.calendar("#ATE", { language: 'pt-br', minDate: dataMin, maxDate: dataMax, pickDate: true, pickTime: false });*/
			
		}
		
		console.log("vou clicar no de")
		//$("#DATA_DE").focus()
		//$("#DATA_DE")[0].click()
		
	} else {
		// SE NÃO
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'É necessário informar a data no padrão correto',
			  text: 'Verifique e tente novamente.'
		})
		
		$("#DATA_DE").val("")
		$("#ATE").val("")
		
	}
	
}

// LIMPA A CLASSE VISÍVEL PARA TODOS OS DIAS DO CABEÇALHO
function limpaClasseVisivel(){
	
	// REMOVE A CLASSE VISÍVEL DE TODO O CABEÇALHO
	$("#THDIA1ATVCAB").removeClass("visivel")
	$("#THDIA2ATVCAB").removeClass("visivel")
	$("#THDIA3ATVCAB").removeClass("visivel")
	$("#THDIA4ATVCAB").removeClass("visivel")
	$("#THDIA5ATVCAB").removeClass("visivel")
	$("#THDIA6ATVCAB").removeClass("visivel")
	$("#THDIA7ATVCAB").removeClass("visivel")
	$("#THDIA8ATVCAB").removeClass("visivel")
	$("#THDIA9ATVCAB").removeClass("visivel")
	$("#THDIA10ATVCAB").removeClass("visivel")
	
	$("#THDIA1ATV").removeClass("visivel")
	$("#THDIA2ATV").removeClass("visivel")
	$("#THDIA3ATV").removeClass("visivel")
	$("#THDIA4ATV").removeClass("visivel")
	$("#THDIA5ATV").removeClass("visivel")
	$("#THDIA6ATV").removeClass("visivel")
	$("#THDIA7ATV").removeClass("visivel")
	$("#THDIA8ATV").removeClass("visivel")
	$("#THDIA9ATV").removeClass("visivel")
	$("#THDIA10ATV").removeClass("visivel")
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSATV___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		$("#D1___"+seq).removeClass("visivel")
		$("#D2___"+seq).removeClass("visivel")
		$("#D3___"+seq).removeClass("visivel")
		$("#D4___"+seq).removeClass("visivel")
		$("#D5___"+seq).removeClass("visivel")
		$("#D6___"+seq).removeClass("visivel")
		$("#D7___"+seq).removeClass("visivel")
		$("#D8___"+seq).removeClass("visivel")
		$("#D9___"+seq).removeClass("visivel")
		$("#D10___"+seq).removeClass("visivel")
		
	})
	
}

// LIMPA A CLASSE VISÍVEL PARA TODOS OS DIAS DO CABEÇALHO
function limpaClasseVisivelAlocacao(){
	
	// REMOVE A CLASSE VISÍVEL DE TODO O CABEÇALHO
	$("#THDIA1ALOC").removeClass("visivel")
	$("#THDIA2ALOC").removeClass("visivel")
	$("#THDIA3ALOC").removeClass("visivel")
	$("#THDIA4ALOC").removeClass("visivel")
	$("#THDIA5ALOC").removeClass("visivel")
	$("#THDIA6ALOC").removeClass("visivel")
	$("#THDIA7ALOC").removeClass("visivel")
	$("#THDIA8ALOC").removeClass("visivel")
	$("#THDIA9ALOC").removeClass("visivel")
	$("#THDIA10ALOC").removeClass("visivel")
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSALOC___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		$("#AD1___"+seq).removeClass("visivel")
		$("#AD2___"+seq).removeClass("visivel")
		$("#AD3___"+seq).removeClass("visivel")
		$("#AD4___"+seq).removeClass("visivel")
		$("#AD5___"+seq).removeClass("visivel")
		$("#AD6___"+seq).removeClass("visivel")
		$("#AD7___"+seq).removeClass("visivel")
		$("#AD8___"+seq).removeClass("visivel")
		$("#AD9___"+seq).removeClass("visivel")
		$("#AD10___"+seq).removeClass("visivel")
		
	})
	
}

// LIMPA A CLASSE VISÍVEL PARA TODOS OS DIAS DO CABEÇALHO
function limpaClasseVisivelRAD(){
	
	// REMOVE A CLASSE VISÍVEL DE TODO O CABEÇALHO
	$("#THDIA1RAD").removeClass("visivel")
	$("#THDIA2RAD").removeClass("visivel")
	$("#THDIA3RAD").removeClass("visivel")
	$("#THDIA4RAD").removeClass("visivel")
	$("#THDIA5RAD").removeClass("visivel")
	$("#THDIA6RAD").removeClass("visivel")
	$("#THDIA7RAD").removeClass("visivel")
	$("#THDIA8RAD").removeClass("visivel")
	$("#THDIA9RAD").removeClass("visivel")
	$("#THDIA10RAD").removeClass("visivel")
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OPERADORRAD___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		$("#RAD1___"+seq).removeClass("visivel")
		$("#RAD2___"+seq).removeClass("visivel")
		$("#RAD3___"+seq).removeClass("visivel")
		$("#RAD4___"+seq).removeClass("visivel")
		$("#RAD5___"+seq).removeClass("visivel")
		$("#RAD6___"+seq).removeClass("visivel")
		$("#RAD7___"+seq).removeClass("visivel")
		$("#RAD8___"+seq).removeClass("visivel")
		$("#RAD9___"+seq).removeClass("visivel")
		$("#RAD10___"+seq).removeClass("visivel")
		
	})
	
}

// LIMPA A CLASSE VISÍVEL PARA TODOS OS DIAS DO CABEÇALHO
function limpaClasseVisivelRecAptoDisp(){
	
	// REMOVE A CLASSE VISÍVEL DE TODO O CABEÇALHO
	$("#THDIA1RECAPTDISP").removeClass("visivel")
	$("#THDIA2RECAPTDISP").removeClass("visivel")
	$("#THDIA3RECAPTDISP").removeClass("visivel")
	$("#THDIA4RECAPTDISP").removeClass("visivel")
	$("#THDIA5RECAPTDISP").removeClass("visivel")
	$("#THDIA6RECAPTDISP").removeClass("visivel")
	$("#THDIA7RECAPTDISP").removeClass("visivel")
	$("#THDIA8RECAPTDISP").removeClass("visivel")
	$("#THDIA9RECAPTDISP").removeClass("visivel")
	$("#THDIA10RECAPTDISP").removeClass("visivel")
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OPERADORRECAPTOSDISPATV___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		$("#RECAPDISPD1___"+seq).removeClass("visivel")
		$("#RECAPDISPD2___"+seq).removeClass("visivel")
		$("#RECAPDISPD3___"+seq).removeClass("visivel")
		$("#RECAPDISPD4___"+seq).removeClass("visivel")
		$("#RECAPDISPD5___"+seq).removeClass("visivel")
		$("#RECAPDISPD6___"+seq).removeClass("visivel")
		$("#RECAPDISPD7___"+seq).removeClass("visivel")
		$("#RECAPDISPD8___"+seq).removeClass("visivel")
		$("#RECAPDISPD9___"+seq).removeClass("visivel")
		$("#RECAPDISPD10___"+seq).removeClass("visivel")
		
	})
	
}

// LIMPA A CLASSE VISÍVEL PARA TODOS OS DIAS DO CABEÇALHO
function limpaClasseVisivelRecAloc(){
	
	// REMOVE A CLASSE VISÍVEL DE TODO O CABEÇALHO
	$("#THDIA1RECALOC").removeClass("visivel")
	$("#THDIA2RECALOC").removeClass("visivel")
	$("#THDIA3RECALOC").removeClass("visivel")
	$("#THDIA4RECALOC").removeClass("visivel")
	$("#THDIA5RECALOC").removeClass("visivel")
	$("#THDIA6RECALOC").removeClass("visivel")
	$("#THDIA7RECALOC").removeClass("visivel")
	$("#THDIA8RECALOC").removeClass("visivel")
	$("#THDIA9RECALOC").removeClass("visivel")
	$("#THDIA10RECALOC").removeClass("visivel")
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OPERADORRECALOCATV___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		$("#RECAD1___"+seq).removeClass("visivel")
		$("#RECAD2___"+seq).removeClass("visivel")
		$("#RECAD3___"+seq).removeClass("visivel")
		$("#RECAD4___"+seq).removeClass("visivel")
		$("#RECAD5___"+seq).removeClass("visivel")
		$("#RECAD6___"+seq).removeClass("visivel")
		$("#RECAD7___"+seq).removeClass("visivel")
		$("#RECAD8___"+seq).removeClass("visivel")
		$("#RECAD9___"+seq).removeClass("visivel")
		$("#RECAD10___"+seq).removeClass("visivel")
		
	})
	
}

// PREENCHE O CABEÇALHO DA TABELA COM OS DIAS DA JANELA DE PLANEJAMENTO
function preencheDiasCabecalhoRecAloc(){
	
	//var dataAte = $("#ATE").val()
	//var dataDe = $("#DATA_DE").val()
	
	var dataAte = $("#DATAATE_PROG").val()
	var dataDe = $("#DATADE_PROG").val()
	
	var dataForm = ""
	
	dataDe = dataDe.split("/")
	var diaMin = dataDe[0]
	var mesMin = dataDe[1]
	var anoMin = dataDe[2]
	
	dataAte = dataAte.split("/")
	var dia = dataAte[0]
	var mes = dataAte[1]
	var ano = dataAte[2]
	
	var dataAte = new Date(ano,mes-1,dia)
	var dataDe = new Date(anoMin,mesMin-1,diaMin)
	var d = 1
	
	// LIMPA A CLASSE VISÍVEL PARA TODOS OS DIAS DO CABEÇALHO
	limpaClasseVisivelRecAloc()
	
	// ENQUANTO DATA ATÉ NÃO FOI ATINGIDA
	while(dataDe<=dataAte){
		
		//d += 1
		
		//dataDe.setDate(dataDe.getDate() + 1)
		
		// FORMATA A DATA DE UM DATE PARA PADRÃO FORMULÁRIO
		dataForm = formataDataDate(dataDe)
		
		console.log("dataDe: "+dataDe+", dataAte: "+dataAte+", dataForm: "+dataForm)
		
		$("#THDIA"+d+"RECALOC").html("<label class='info'><strong>"+dataForm+"</strong></label>")
		$("#THDIA"+d+"RECALOC").addClass("visivel")
		
		d += 1
		
		dataDe.setDate(dataDe.getDate() + 1)
		
	}
	
	// PERCORRE TODAS AS COLUNAS E ESCONDE AS COLUNAS QUE NÃO SERÃO USADAS
	for(var i=1; i<=10; i++){
		
		var val = $("#THDIA"+i+"RECALOC").hasClass("visivel")
		
		console.log("THDIA"+i+"RECALOC tem classe visível: "+val)
		
		// SE TH POSSUI A CLASSE "VISIVEL"
		if(!($("#THDIA"+i+"RECALOC").hasClass("visivel"))){
			
			$("#THDIA"+i+"RECALOC").hide()
			//$("#RECAD"+i).hide()
			$(".RECAD"+i).hide()
			
		} else {
			
			$("#THDIA"+i+"RECALOC").show()
			//$("#RECAD"+i).show()
			$(".RECAD"+i).show()
			
		}
		
	}
	
}

// PREENCHE O CABEÇALHO DA TABELA COM OS DIAS DA JANELA DE PLANEJAMENTO
function preencheDiasCabecalhoRecAptoDisp(){
	
	//var dataAte = $("#ATE").val()
	//var dataDe = $("#DATA_DE").val()
	
	var dataAte = $("#DATAATE_PROG").val()
	var dataDe = $("#DATADE_PROG").val()
	
	var dataForm = ""
	
	dataDe = dataDe.split("/")
	var diaMin = dataDe[0]
	var mesMin = dataDe[1]
	var anoMin = dataDe[2]
	
	dataAte = dataAte.split("/")
	var dia = dataAte[0]
	var mes = dataAte[1]
	var ano = dataAte[2]
	
	var dataAte = new Date(ano,mes-1,dia)
	var dataDe = new Date(anoMin,mesMin-1,diaMin)
	var d = 1
	
	// LIMPA A CLASSE VISÍVEL PARA TODOS OS DIAS DO CABEÇALHO
	limpaClasseVisivelRecAptoDisp()
	
	// ENQUANTO DATA ATÉ NÃO FOI ATINGIDA
	while(dataDe<=dataAte){
		
		//d += 1
		
		//dataDe.setDate(dataDe.getDate() + 1)
		
		// FORMATA A DATA DE UM DATE PARA PADRÃO FORMULÁRIO
		dataForm = formataDataDate(dataDe)
		
		console.log("dataDe: "+dataDe+", dataAte: "+dataAte+", dataForm: "+dataForm)
		
		$("#THDIA"+d+"RECAPTDISP").html("<label class='info'><strong>"+dataForm+"</strong></label>")
		$("#THDIA"+d+"RECAPTDISP").addClass("visivel")
		
		d += 1
		
		dataDe.setDate(dataDe.getDate() + 1)
		
	}
	
	// PERCORRE TODAS AS COLUNAS E ESCONDE AS COLUNAS QUE NÃO SERÃO USADAS
	for(var i=1; i<=10; i++){
		
		var val = $("#THDIA"+i+"RECAPTDISP").hasClass("visivel")
		
		console.log("THDIA"+i+"RECAPTDISP tem classe visível: "+val)
		
		// SE TH POSSUI A CLASSE "VISIVEL"
		if(!($("#THDIA"+i+"RECAPTDISP").hasClass("visivel"))){
			
			$("#THDIA"+i+"RECAPTDISP").hide()
			$("#RECAPDISPD"+i).hide()
			
		} else {
			
			$("#THDIA"+i+"RECAPTDISP").show()
			$("#RECAPDISPD"+i).show()
			
		}
		
	}
	
}

// PREENCHE O CABEÇALHO DA TABELA COM OS DIAS DA JANELA DE PLANEJAMENTO
function preencheDiasCabecalhoRAD(){
	
	//var dataAte = $("#ATE").val()
	//var dataDe = $("#DATA_DE").val()
	
	var dataAte = $("#DATAATE_PROG").val()
	var dataDe = $("#DATADE_PROG").val()
	
	var dataForm = ""
	
	dataDe = dataDe.split("/")
	var diaMin = dataDe[0]
	var mesMin = dataDe[1]
	var anoMin = dataDe[2]
	
	dataAte = dataAte.split("/")
	var dia = dataAte[0]
	var mes = dataAte[1]
	var ano = dataAte[2]
	
	var dataAte = new Date(ano,mes-1,dia)
	var dataDe = new Date(anoMin,mesMin-1,diaMin)
	var d = 1
	
	// LIMPA A CLASSE VISÍVEL PARA TODOS OS DIAS DO CABEÇALHO
	limpaClasseVisivelRAD()
	
	// ENQUANTO DATA ATÉ NÃO FOI ATINGIDA
	while(dataDe<=dataAte){
		
		//d += 1
		
		//dataDe.setDate(dataDe.getDate() + 1)
		
		// FORMATA A DATA DE UM DATE PARA PADRÃO FORMULÁRIO
		dataForm = formataDataDate(dataDe)
		
		console.log("dataDe: "+dataDe+", dataAte: "+dataAte+", dataForm: "+dataForm)
		
		$("#THDIA"+d+"RAD").html("<label class='info'><strong>"+dataForm+"</strong></label>")
		$("#THDIA"+d+"RAD").addClass("visivel")
		
		d += 1
		
		dataDe.setDate(dataDe.getDate() + 1)
		
	}
	
	// PERCORRE TODAS AS COLUNAS E ESCONDE AS COLUNAS QUE NÃO SERÃO USADAS
	for(var i=1; i<=10; i++){
		
		var val = $("#THDIA"+i+"RAD").hasClass("visivel")
		
		console.log("THDIA"+i+"RAD tem classe visível: "+val)
		
		// SE TH POSSUI A CLASSE "VISIVEL"
		if(!($("#THDIA"+i+"RAD").hasClass("visivel"))){
			
			$("#THDIA"+i+"RAD").hide()
			$("#RAD"+i).hide()
			
		} else {
			
			$("#THDIA"+i+"RAD").show()
			$("#RAD"+i).show()
			
		}
		
	}
	
}

// PREENCHE O CABEÇALHO DA TABELA COM OS DIAS DA JANELA DE PLANEJAMENTO
function preencheDiasCabecalhoAlocacao(){
	
	var dataAte = $("#ATE_RESALOC").val()
	var dataDe = $("#DATA_DE_RESALOC").val()
	
	var dataAte = $("#DATAATE_ALOC").val()
	var dataDe = $("#DATADE_ALOC").val()
	
	var dataForm = ""
	
	dataDe = dataDe.split("/")
	var diaMin = dataDe[0]
	var mesMin = dataDe[1]
	var anoMin = dataDe[2]
	
	dataAte = dataAte.split("/")
	var dia = dataAte[0]
	var mes = dataAte[1]
	var ano = dataAte[2]
	
	var dataAte = new Date(ano,mes-1,dia)
	var dataDe = new Date(anoMin,mesMin-1,diaMin)
	var d = 1
	
	// LIMPA A CLASSE VISÍVEL PARA TODOS OS DIAS DO CABEÇALHO
	limpaClasseVisivelAlocacao()
	
	// ENQUANTO DATA ATÉ NÃO FOI ATINGIDA
	while(dataDe<=dataAte){
		
		//d += 1
		
		//dataDe.setDate(dataDe.getDate() + 1)
		
		// FORMATA A DATA DE UM DATE PARA PADRÃO FORMULÁRIO
		dataForm = formataDataDate(dataDe)
		
		console.log("dataDe: "+dataDe+", dataAte: "+dataAte+", dataForm: "+dataForm)
		
		$("#THDIA"+d+"ALOC").html("<label class='info'><strong>"+dataForm+"</strong></label>")
		$("#THDIA"+d+"ALOC").addClass("visivel")
		$("#THDIA"+d+"ALOCCAB").html("<label class='info'><strong>"+dataForm+"</strong></label>")
		$("#THDIA"+d+"ALOCCAB").addClass("visivel")
		
		d += 1
		
		dataDe.setDate(dataDe.getDate() + 1)
		
	}
	
	// PERCORRE TODAS AS COLUNAS E ESCONDE AS COLUNAS QUE NÃO SERÃO USADAS
	for(var i=1; i<=10; i++){
		
		var val = $("#THDIA"+i+"ALOC").hasClass("visivel")
		
		console.log("THDIA"+i+"ALOC tem classe visível: "+val)
		
		// SE TH POSSUI A CLASSE "VISIVEL"
		if(!($("#THDIA"+i+"ALOC").hasClass("visivel"))){
			
			$("#THDIA"+i+"ALOC").hide()
			$("#THDIA"+i+"ALOCCAB").hide()
			$("#AD"+i).hide()
			
		} else {
			
			$("#THDIA"+i+"ALOC").show()
			$("#THDIA"+i+"ALOCCAB").show()
			$("#AD"+i).show()
			
		}
		
	}
	
}

// PREENCHE TABELA DE SOMA COM OS DIAS DA JANELA DE PLANEJAMENTO
function preencheDiasSomaAlocacao(){
	
	var dataAte = $("#ATE_RESALOC").val()
	var dataDe = $("#DATA_DE_RESALOC").val()
	var dataForm = ""
	
	dataDe = dataDe.split("/")
	var diaMin = dataDe[0]
	var mesMin = dataDe[1]
	var anoMin = dataDe[2]
	
	dataAte = dataAte.split("/")
	var dia = dataAte[0]
	var mes = dataAte[1]
	var ano = dataAte[2]
	
	var dataAte = new Date(ano,mes-1,dia)
	var dataDe = new Date(anoMin,mesMin-1,diaMin)
	var d = 1
	
	// ENQUANTO DATA ATÉ NÃO FOI ATINGIDA
	while(dataDe<=dataAte){
		
		//d += 1
		
		//dataDe.setDate(dataDe.getDate() + 1)
		
		// FORMATA A DATA DE UM DATE PARA PADRÃO FORMULÁRIO
		dataForm = formataDataDate(dataDe)
		
		console.log("dataDe: "+dataDe+", dataAte: "+dataAte+", dataForm: "+dataForm)
		
		$("#THDIA"+d+"SOMAALOC").html("<label class='info'><strong>"+dataForm+"</strong></label>")
		$("#THDIA"+d+"SOMAALOC").addClass("visivel")
		
		d += 1
		
		dataDe.setDate(dataDe.getDate() + 1)
		
	}
	
	// PERCORRE TODOS OS REGISTROS DA TABELA	
	$("input[id^='DIA1SOMAALOC___']").each(function(){

		var seq = $(this).attr("id").split("___")[1]
		
		console.log("vou percorrer os dias item "+seq)
		
		if($("#THDIA1SOMAALOC").hasClass("visivel")){
			
			console.log("THDIA1SOMAALOC é visível")
			
			$("#THDIA1SOMAALOC").show()
			$("#SOMAALOCD1___"+seq).show()
			
		} else {
			
			console.log("THDIA1SOMAALOC não é visível")
			
			$("#THDIA1SOMAALOC").hide()
			$("#SOMAALOCD1___"+seq).hide()
			
		}
		if($("#THDIA2SOMAALOC").hasClass("visivel")){
			
			console.log("THDIA2SOMAALOC é visível")
			
			$("#THDIA2SOMAALOC").show()
			$("#SOMAALOCD2___"+seq).show()
			
		} else {
			
			console.log("THDIA2SOMAALOC não é visível")
			
			$("#THDIA2SOMAALOC").hide()
			$("#SOMAALOCD2___"+seq).hide()
			
		}
		if($("#THDIA3SOMAALOC").hasClass("visivel")){
			
			console.log("THDIA3SOMAALOC é visível")
			
			$("#THDIA3SOMAALOC").show()
			$("#SOMAALOCD3___"+seq).show()
			
		} else {
			
			console.log("THDIA3SOMAALOC não é visível")
			
			$("#THDIA3SOMAALOC").hide()
			$("#SOMAALOCD3___"+seq).hide()
			
		}
		if($("#THDIA4SOMAALOC").hasClass("visivel")){
			
			console.log("THDIA4SOMAALOC é visível")
			
			$("#THDIA4SOMAALOC").show()
			$("#SOMAALOCD4___"+seq).show()
			
		} else {
			
			console.log("THDIA4SOMAALOC não é visível")
			
			$("#THDIA4SOMAALOC").hide()
			$("#SOMAALOCD4___"+seq).hide()
			
		}
		if($("#THDIA5SOMAALOC").hasClass("visivel")){
			
			console.log("THDIA5SOMAALOC é visível")
			
			$("#THDIA5SOMAALOC").show()
			$("#SOMAALOCD5___"+seq).show()
			
		} else {
			
			console.log("THDIA5SOMAALOC não é visível")
			
			$("#THDIA5SOMAALOC").hide()
			$("#SOMAALOCD5___"+seq).hide()
			
		}
		if($("#THDIA6SOMAALOC").hasClass("visivel")){
			
			console.log("THDIA6SOMAALOC é visível")
			
			$("#THDIA6SOMAALOC").show()
			$("#SOMAALOCD6___"+seq).show()
			
		} else {
			
			console.log("THDIA6SOMAALOC não é visível")
			
			$("#THDIA6SOMAALOC").hide()
			$("#SOMAALOCD6___"+seq).hide()
			
		}
		if($("#THDIA7SOMAALOC").hasClass("visivel")){
			
			console.log("THDIA7SOMAALOC é visível")
			
			$("#THDIA7SOMAALOC").show()
			$("#SOMAALOCD7___"+seq).show()
			
		} else {
			
			console.log("THDIA7SOMAALOC não é visível")
			
			$("#THDIA7SOMAALOC").hide()
			$("#SOMAALOCD7___"+seq).hide()
			
		}
		if($("#THDIA8SOMAALOC").hasClass("visivel")){
			
			console.log("THDIA8SOMAALOC é visível")
			
			$("#THDIA8SOMAALOC").show()
			$("#SOMAALOCD8___"+seq).show()
			
		} else {
			
			console.log("THDIA8SOMAALOC não é visível")
			
			$("#THDIA8SOMAALOC").hide()
			$("#SOMAALOCD8___"+seq).hide()
			
		}
		if($("#THDIA9SOMAALOC").hasClass("visivel")){
			
			console.log("THDIA9SOMAALOC é visível")
			
			$("#THDIA9SOMAALOC").show()
			$("#SOMAALOCD9___"+seq).show()
			
		} else {
			
			console.log("THDIA9SOMAALOC não é visível")
			
			$("#THDIA9SOMAALOC").hide()
			$("#SOMAALOCD9___"+seq).hide()
			
		}
		if($("#THDIA10SOMAALOC").hasClass("visivel")){
			
			console.log("THDIA102SOMAALOC é visível")
			
			$("#THDIA10SOMAALOC").show()
			$("#SOMAALOCD10___"+seq).show()
			
		} else {
			
			console.log("THDIA10SOMAALOC não é visível")
			
			$("#THDIA10SOMAALOC").hide()
			$("#SOMAALOCD10___"+seq).hide()
			
		}
		
	})
	
	// PERCORRE TODAS AS COLUNAS E ESCONDE AS COLUNAS QUE NÃO SERÃO USADAS
	/*for(var i=1; i<=10; i++){

		var val = $("#THDIA"+i+"SOMAALOC").hasClass("visivel")
		
		console.log("THDIA"+i+"SOMAALOC tem classe visível: "+val)
		
		// SE TH POSSUI A CLASSE "VISIVEL"
		if(!($("#THDIA"+i+"SOMAALOC").hasClass("visivel"))){
			
			$("#THDIA"+i+"SOMAALOC").hide()
			$(".SOMAALOCD"+i).hide()
			
		} else {
			
			$("#THDIA"+i+"SOMAALOC").show()
			$(".SOMAALOCD"+i).show()
			
		}
		
	}*/
	
}

// PREENCHE TABELA COM OS DIAS DA JANELA DE PLANEJAMENTO
function preencheDiasSomaRecAloc(){
	
	var dataAte = $("#ATE").val()
	var dataDe = $("#DATA_DE").val()
	var dataForm = ""
	
	dataDe = dataDe.split("/")
	var diaMin = dataDe[0]
	var mesMin = dataDe[1]
	var anoMin = dataDe[2]
	
	dataAte = dataAte.split("/")
	var dia = dataAte[0]
	var mes = dataAte[1]
	var ano = dataAte[2]
	
	var dataAte = new Date(ano,mes-1,dia)
	var dataDe = new Date(anoMin,mesMin-1,diaMin)
	var d = 1
	
	// ENQUANTO DATA ATÉ NÃO FOI ATINGIDA
	while(dataDe<=dataAte){
		
		//d += 1
		
		//dataDe.setDate(dataDe.getDate() + 1)
		
		// FORMATA A DATA DE UM DATE PARA PADRÃO FORMULÁRIO
		dataForm = formataDataDate(dataDe)
		
		console.log("dataDe: "+dataDe+", dataAte: "+dataAte+", dataForm: "+dataForm)
		
		$("#THDIA"+d+"SOMARECALOC").html("<label class='info'><strong>"+dataForm+"</strong></label>")
		$("#THDIA"+d+"SOMARECALOC").addClass("visivel")
		
		d += 1
		
		dataDe.setDate(dataDe.getDate() + 1)
		
	}
	
	// PERCORRE TODAS AS COLUNAS E ESCONDE AS COLUNAS QUE NÃO SERÃO USADAS
	for(var i=1; i<=10; i++){
		
		var val = $("#THDIA"+i+"SOMARECALOC").hasClass("visivel")
		
		console.log("THDIA"+i+"SOMARECALOC tem classe visível: "+val)
		
		// SE TH POSSUI A CLASSE "VISIVEL"
		if(!($("#THDIA"+i+"SOMARECALOC").hasClass("visivel"))){
			
			$("#THDIA"+i+"SOMARECALOC").hide()
			$(".SOMARECAD"+i).hide()
			
		} else {
			
			$("#THDIA"+i+"SOMARECALOC").show()
			$(".SOMARECAD"+i).show()
			
		}
		
	}
	
	// PERCORRE TODOS OS REGISTROS DA TABELA	
	/*$("input[id^='SOMADIA1RECALOCATV___']").each(function(){

		var seq = $(this).attr("id").split("___")[1]
		
		console.log("vou percorrer os dias item "+seq)
		
		if($("#THDIA1SOMARECALOC").hasClass("visivel")){
			
			console.log("THDIA1SOMARECALOC é visível")
			
			$("#THDIA1SOMARECALOC").show()
			$("#SOMARECAD1___"+seq).show()
			
		} else {
			
			console.log("THDIA1SOMARECALOC não é visível")
			
			$("#THDIA1SOMARECALOC").hide()
			$("#SOMARECAD1___"+seq).hide()
			
		}
		if($("#THDIA2SOMARECALOC").hasClass("visivel")){
			
			console.log("THDIA2SOMARECALOC é visível")
			
			$("#THDIA2SOMARECALOC").show()
			$("#SOMARECAD2___"+seq).show()
			
		} else {
			
			console.log("THDIA2SOMARECALOC não é visível")
			
			$("#THDIA2SOMARECALOC").hide()
			$("#SOMARECAD2___"+seq).hide()
			
		}
		if($("#THDIA3SOMARECALOC").hasClass("visivel")){
			
			console.log("THDIA3SOMARECALOC é visível")
			
			$("#THDIA3SOMARECALOC").show()
			$("#SOMARECAD3___"+seq).show()
			
		} else {
			
			console.log("THDIA3SOMARECALOC não é visível")
			
			$("#THDIA3SOMARECALOC").hide()
			$("#SOMARECAD3___"+seq).hide()
			
		}
		if($("#THDIA4SOMARECALOC").hasClass("visivel")){
			
			console.log("THDIA4SOMARECALOC é visível")
			
			$("#THDIA4SOMARECALOC").show()
			$("#SOMARECAD4___"+seq).show()
			
		} else {
			
			console.log("THDIA4SOMARECALOC não é visível")
			
			$("#THDIA4SOMARECALOC").hide()
			$("#SOMARECAD4___"+seq).hide()
			
		}
		if($("#THDIA5SOMARECALOC").hasClass("visivel")){
			
			console.log("THDIA5SOMARECALOC é visível")
			
			$("#THDIA5SOMARECALOC").show()
			$("#SOMARECAD5___"+seq).show()
			
		} else {
			
			console.log("THDIA5SOMARECALOC não é visível")
			
			$("#THDIA5SOMARECALOC").hide()
			$("#SOMARECAD5___"+seq).hide()
			
		}
		if($("#THDIA6SOMARECALOC").hasClass("visivel")){
			
			console.log("THDIA6SOMARECALOC é visível")
			
			$("#THDIA6SOMARECALOC").show()
			$("#SOMARECAD6___"+seq).show()
			
		} else {
			
			console.log("THDIA6SOMARECALOC não é visível")
			
			$("#THDIA6SOMARECALOC").hide()
			$("#SOMARECAD6___"+seq).hide()
			
		}
		if($("#THDIA7SOMARECALOC").hasClass("visivel")){
			
			console.log("THDIA7SOMARECALOC é visível")
			
			$("#THDIA7SOMARECALOC").show()
			$("#SOMARECAD7___"+seq).show()
			
		} else {
			
			console.log("THDIA7SOMARECALOC não é visível")
			
			$("#THDIA7SOMARECALOC").hide()
			$("#SOMARECAD7___"+seq).hide()
			
		}
		if($("#THDIA8SOMARECALOC").hasClass("visivel")){
			
			console.log("THDIA8SOMARECALOC é visível")
			
			$("#THDIA6SOMARECALOC").show()
			$("#SOMARECAD8___"+seq).show()
			
		} else {
			
			console.log("THDIA8SOMARECALOC não é visível")
			
			$("#THDIA8SOMARECALOC").hide()
			$("#SOMARECAD8___"+seq).hide()
			
		}
		if($("#THDIA9SOMARECALOC").hasClass("visivel")){
			
			console.log("THDIA9SOMARECALOC é visível")
			
			$("#THDIA9SOMARECALOC").show()
			$("#SOMARECAD9___"+seq).show()
			
		} else {
			
			console.log("THDIA9SOMARECALOC não é visível")
			
			$("#THDIA9SOMARECALOC").hide()
			$("#SOMARECAD9___"+seq).hide()
			
		}
		if($("#THDIA10SOMARECALOC").hasClass("visivel")){
			
			console.log("THDIA10SOMARECALOC é visível")
			
			$("#THDIA10SOMARECALOC").show()
			$("#SOMARECAD10___"+seq).show()
			
		} else {
			
			console.log("THDIA10SOMARECALOC não é visível")
			
			$("#THDIA10SOMARECALOC").hide()
			$("#SOMARECAD10___"+seq).hide()
			
		}
		
	})*/
	
}

// PREENCHE TABELA COM OS DIAS DA JANELA DE PLANEJAMENTO
function preencheDiasSomaRecAptoDisp(){
	
	var dataAte = $("#ATE").val()
	var dataDe = $("#DATA_DE").val()
	var dataForm = ""
	
	dataDe = dataDe.split("/")
	var diaMin = dataDe[0]
	var mesMin = dataDe[1]
	var anoMin = dataDe[2]
	
	dataAte = dataAte.split("/")
	var dia = dataAte[0]
	var mes = dataAte[1]
	var ano = dataAte[2]
	
	var dataAte = new Date(ano,mes-1,dia)
	var dataDe = new Date(anoMin,mesMin-1,diaMin)
	var d = 1
	
	// ENQUANTO DATA ATÉ NÃO FOI ATINGIDA
	while(dataDe<=dataAte){
		
		//d += 1
		
		//dataDe.setDate(dataDe.getDate() + 1)
		
		// FORMATA A DATA DE UM DATE PARA PADRÃO FORMULÁRIO
		dataForm = formataDataDate(dataDe)
		
		console.log("dataDe: "+dataDe+", dataAte: "+dataAte+", dataForm: "+dataForm)
		
		$("#THDIA"+d+"SOMARECAPDISP").html("<label class='info'><strong>"+dataForm+"</strong></label>")
		$("#THDIA"+d+"SOMARECAPDISP").addClass("visivel")
		
		d += 1
		
		dataDe.setDate(dataDe.getDate() + 1)
		
	}
	
	// PERCORRE TODAS AS COLUNAS E ESCONDE AS COLUNAS QUE NÃO SERÃO USADAS
	for(var i=1; i<=10; i++){
		
		var val = $("#THDIA"+i+"SOMARECAPDISP").hasClass("visivel")
		
		console.log("THDIA"+i+"SOMARECAPDISP tem classe visível: "+val)
		
		// SE TH POSSUI A CLASSE "VISIVEL"
		if(!($("#THDIA"+i+"SOMARECAPDISP").hasClass("visivel"))){
			
			$("#THDIA"+i+"SOMARECAPDISP").hide()
			$(".SOMARECAPDISPD"+i).hide()
			
		} else {
			
			$("#THDIA"+i+"SOMARECAPDISP").show()
			$(".SOMARECAPDISPD"+i).show()
			
		}
		
	}
	
}

// PREENCHE O CABEÇALHO DA TABELA COM OS DIAS DA JANELA DE PLANEJAMENTO
function preencheDiasCabecalho(){
	
	//var dataAte = $("#ATE").val()
	//var dataDe = $("#DATA_DE").val()
	
	var dataAte = $("#DATAATE_PROG").val()
	var dataDe = $("#DATADE_PROG").val()
	
	var dataForm = ""
	
	dataDe = dataDe.split("/")
	var diaMin = dataDe[0]
	var mesMin = dataDe[1]
	var anoMin = dataDe[2]
	
	dataAte = dataAte.split("/")
	var dia = dataAte[0]
	var mes = dataAte[1]
	var ano = dataAte[2]
	
	var dataAte = new Date(ano,mes-1,dia)
	var dataDe = new Date(anoMin,mesMin-1,diaMin)
	
	console.log("dataAte: "+dataAte)
	console.log("dataDe: "+dataDe)
	
	// LIMPA A CLASSE VISÍVEL PARA TODOS OS DIAS DO CABEÇALHO
	limpaClasseVisivel()
	
	// FORMATA A DATA DE UM DATE PARA PADRÃO FORMULÁRIO
	/*dataForm = formataDataDate(dataDe)
	
	$("#THDIA1ATV").html("<label class='info'><strong>"+dataForm+"</strong></label>")
	$("#THDIA"+d+"ATV").val(1)
	
	console.log("dataDe: "+dataDe+", dataAte: "+dataAte+", dataForm: "+dataForm)
	*/
	var d = 1
	
	// ENQUANTO DATA ATÉ NÃO FOI ATINGIDA
	while(dataDe<=dataAte){
		
		//d += 1
		
		//dataDe.setDate(dataDe.getDate() + 1)
		
		// FORMATA A DATA DE UM DATE PARA PADRÃO FORMULÁRIO
		dataForm = formataDataDate(dataDe)
		
		console.log("dataDe: "+dataDe+", dataAte: "+dataAte+", dataForm: "+dataForm)
		
		$("#THDIA"+d+"ATV").html("<label class='info'><strong>"+dataForm+"</strong></label>")
		$("#THDIA"+d+"ATV").addClass("visivel")
		$("#THDIA"+d+"ATVCAB").html("<label class='info'><strong>"+dataForm+"</strong></label>")
		$("#THDIA"+d+"ATVCAB").addClass("visivel")
		
		d += 1
		
		dataDe.setDate(dataDe.getDate() + 1)
		
	}
	
	// PERCORRE TODAS AS COLUNAS E ESCONDE AS COLUNAS QUE NÃO SERÃO USADAS
	for(var i=1; i<=10; i++){
		
		var val = $("#THDIA"+i+"ATV").hasClass("visivel")
		
		console.log("THDIA"+i+"ATV tem classe visível: "+val)
		
		// SE TH POSSUI A CLASSE "VISIVEL"
		if(!($("#THDIA"+i+"ATV").hasClass("visivel"))){
			
			$("#THDIA"+i+"ATV").hide()
			$("#THDIA"+i+"ATVCAB").hide()
			$("#D"+i).hide()
			
		} else {
			
			$("#THDIA"+i+"ATV").show()
			$("#THDIA"+i+"ATVCAB").show()
			$("#D"+i).show()
			
		}
		
	}
	
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

// SALVA OS IDPRD'S
function arrayIdprd(){
	
	console.log("vou gerar string Idprd")
	
	var idprd = $("#IDPRD").val()
	var strIdprd = ""
	
	idprd = idprd.split(",")
		
	console.log("idprd:")
	console.log(idprd)
	
	if(idprd.length==0){
		
		strIdprd = ""
		
	} else if(idprd.length==1){
		
		console.log("só um item selecionado")
		strIdprd = idprd[0]
		
	} else {
		
		console.log("mais de um item selecionado")
		
		
		for(var i=0; i<idprd.length;i++){
			
			if(i+1==idprd.length){
				
				strIdprd = strIdprd+""+idprd[i]+""
				
			} else {
				
				strIdprd = strIdprd+""+idprd[i]+";"
				
			}
			
		}
		
	}
	
	console.log("idprds: "+strIdprd)
	
	return strIdprd
	
}

// SALVA AS ORDENS
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

// SE TABELA DOS FILTROS PARA A TABELA NÃO FOI CRIADA
function temTabelaFiltros(){
	
	var tem = false
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("select[id^='INFOOS___']").each(function(){
		
		tem = true
		
	})
	
	return tem
	
}

// LIMPA OS FILTROS DA TABELA DE CADASTRO
function limpaFiltros(){
	
	$('#INFOOS___1').children('option:not(:first)').remove();
	$('#INFOOP___1').children('option:not(:first)').remove();
	$('#INFOFOLGA___1').children('option:not(:first)').remove();
	$('#INFOINICIO___1').children('option:not(:first)').remove();
	$('#INFOFIM___1').children('option:not(:first)').remove();
	$('#INFOSTATUSOP___1').children('option:not(:first)').remove();
	$('#INFOITEM___1').children('option:not(:first)').remove();
	$('#INFOATIVIDADE___1').children('option:not(:first)').remove();
	$('#INFOITEMCAD___1').children('option:not(:first)').remove();
	$('#INFOPRIORIDADE___1').children('option:not(:first)').remove();
	$('#INFOSTATUSATV___1').children('option:not(:first)').remove();
	$('#INFOPOSTO___1').children('option:not(:first)').remove();
	$('#INFOPLANO___1').children('option:not(:first)').remove();
	$('#INFOCARGAPREV___1').children('option:not(:first)').remove();
	$('#INFOCARGAREALIZADA___1').children('option:not(:first)').remove();
	$('#INFOSALDOREV___1').children('option:not(:first)').remove();
	$('#INFOSALDOALOC___1').children('option:not(:first)').remove();
	$('#INFOSALDOAALOCAR___1').children('option:not(:first)').remove();
	$('#INFOSALDOAALOCAR___1').children('option:not(:first)').remove();
	$('#INFOAVANCO___1').children('option:not(:first)').remove();
	$('#INFORECPREV___1').children('option:not(:first)').remove();
	
}

// BUSCA O PLANEJAMENTO CONFORME OS DADOS PREENCHIDOS NO CABEÇALHO DO FILTRO
function buscarPlanejamento(){
	
	var myLoading2 = FLUIGC.loading(window);
	var row
	
	var celula = $("#CELULA").val()
	var filial = $("#CODFILIAL_FILTRO").val()
	var dataDe = $("#DATA_DE").val()
	var dataAte = $("#ATE").val()
	//var inferior = $("#INFERIOROP").val()
	//var codOrdem = $("#CODORDEM").val()
	var codOrdem = $("#ORDEMPRODUCAO").val()
	var item = $("#IDPRD").val()
	//var busca = false
	
	// APAGA OS RECURSOS
	$("#GRUPORECURSON3>option").remove()
	$("#CODRECURSON3").val("")
	$("#CODCHAPARECURSON3").val("")
	$("#RECURSON3").val("")
	$(".GRUPORECURSON3").hide()
	$("#HABILIDADEATUAL").val("")
	
	// LIMPA A TABELA DE RECURSOS APTOS DISPONÍVEIS
	limpaRAD()
	$(".RAD").hide()
	
	// SE CAMPOS OBRIGATÓRIOS NÃO FORAM INFORMADOS
	if( ( (codOrdem=="" || codOrdem==null || codOrdem==undefined) && (item=="" || item==null || item==undefined) ) || (dataDe==""
		|| dataDe==null || dataDe==undefined) || (dataAte=="" || 
		dataAte==null || dataAte==undefined) || (filial=="" || filial==null || filial==undefined) ){
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'Há filtros obrigatórios que não foram informados',
			  text: 'Verifique os campos com a marcação (*) e se ao menos a OP ou o item foram selecionados.'
		})
	
	} else {
		// SE NÃO, BUSCA ESTÁ LIBERADA
		

		// SE INFERIOR FOI SELECIONADO EM "SIM"
		/*if(!(inferior=="SIM")){
			
			// SE CAMPOS OBRIGATÓRIOS NÃO FORAM INFORMADOS
			if((celula=="" || celula==null || celula==undefined) || (dataDe==""
				|| dataDe==null || dataDe==undefined) || (dataAte=="" || 
				dataAte==null || dataAte==undefined) || (filial=="" || filial==null || filial==undefined)){
				
				// EXIBE ALERTA
				Swal.fire({
					  icon: 'error',
					  title: 'Há filtros obrigatórios que não foram informados',
					  text: 'Verifique os campos com a marcação * e tente novamente.'
				})
			
			} else {
				// SE NÃO, BUSCA ESTÁ LIBERADA
				
				busca = true
				
			}
		
		} else {
			// SE INFERIOR NÃO FOI SELECIONADO OU FOI SELECIONADO EM "NÃO"
			
			// SE CAMPOS OBRIGATÓRIOS NÃO FORAM INFORMADOS
			if((codOrdem=="" || codOrdem==null || codOrdem==undefined) || (dataDe==""
				|| dataDe==null || dataDe==undefined) || (dataAte=="" || 
				dataAte==null || dataAte==undefined)){
				
				// EXIBE ALERTA
				Swal.fire({
					  icon: 'error',
					  title: 'Há filtros obrigatórios que não foram informados',
					  text: 'Verifique os campos com a marcação * e tente novamente.'
				})
			
			} else {
				// SE NÃO, BUSCA ESTÁ LIBERADA
				
				busca = true
				
			}
			
		}*/
		
		// SE PODE BUSCAR
		//if(busca) {
			// SE NÃO, TODOS OS CAMPOS OBRIGATÓRIOS FORAM PREENCHIDOS
			
			myLoading2.show();
			
			setTimeout(function(){
				
				// LIMPA A TABELA DE PLANEJAMENTO
				limpaTabelaPlanejamento()
				
				// VARIÁVEIS PARA OS CAMPOS DO FILTRO DA CONSULTA
				var celula = $("#CODCELULA").val()
				var filial = $("#CODFILIAL_FILTRO").val()
				var numOS = $("#CODPRJ").val()
				//var idprj = $("#IDPRJ").val()
				//var codStatus = $("#CODSTATUSOP").val()
				//var alocacao = $("#ALOCACAO").val()
				//var codPosto = $("#CODPOSTO").val()
				//var folgaDe = $("#FOLGA_DE").val()
				//var folgaAte = $("#FOLGA_ATE").val()
				//var nivelDe = $("#NIVELESTR_DE").val()
				//var nivelAte = $("#NIVELESTR_ATE").val()
				var idprd = $("#IDPRD").val()
				//var codigoPrd = $("#CODIGOPRD").val()
				var codigoPrd = ""
				var dataDe = $("#DATA_DE").val()
				var dataAte = $("#ATE").val()
				var ordenarPor = $("#ORDENARPOR").val()
				//var ordenarPor2 = ""
				var inicioPlan = ""
				var fimPlan = ""
				
				var ordens = $("#ORDEMPRODUCAO").val()
				
				// SE ORDENS FORAM INFORMADAS
				if(!(ordens=="" || ordens==null || ordens==undefined)){
					
					// SALVA AS ORDENS
					codOrdem = arrayOrdens()
					
				} else {
					
					codOrdem = ""
				
				}
				
				if(!(idprd=="" || idprd==null || idprd==undefined)){
					
					// SALVA OS IDPRD'S
					idprd = arrayIdprd()
					
					
				} else {
					
					idprd = ""
					
				}
				
				// SALVA AS DATAS INFORMADAS
				$("#DATADE_PROG").val(dataDe)
				$("#DATAATE_PROG").val(dataAte)
				
				/*if(ordenarPor.includes("-")){
					
					ordenarPor = ordenarPor.split("-")
					ordenarPor = ordenarPor[0]
					ordenarPor2 = ordenarPor[1]
					
				}*/
				
				// FORMATA A DATA 
				if(!(dataDe==undefined || dataDe=="")){
					
					console.log("dataDe antes de formatar: "+dataDe)
					dataDe = formataDataBanco(dataDe)
					console.log("dataDe formatada: "+dataDe)
					
				} else {
					
					dataDe = ""
					
				}
				
				if(!(dataAte==undefined || dataAte=="")){
					console.log("dataAte antes de formatar: "+dataAte)
					dataAte = formataDataBanco(dataAte)	
					console.log("dataAte formatada: "+dataAte)
					
				} else {
					
					dataAte = ""
					
				}
				
				/*console.log("numOS: "+numOS+", filial: "+filial+", celula: "+celula+", codOrdem: "+codOrdem+", inferior: "+inferior
						+", codStatus: "+codStatus+", alocacao: "+alocacao+", codPosto: "+codPosto+", folgaDe: "+folgaDe
						+", folgaAte: "+folgaAte+", nivelDe: "+nivelDe+", nivelAte: "+nivelAte+", idprd: "+idprd+", codigoPrd: "+codigoPrd
						+", dataDe: "+dataDe+", dataAte: "+dataAte+", ordenarPor: "+ordenarPor)*/
				
				console.log("numOS: "+numOS+", filial: "+filial+", celula: "+celula+", codOrdem: "+codOrdem+", idprd: "+idprd+", codigoPrd: "+codigoPrd
						+", dataDe: "+dataDe+", dataAte: "+dataAte+", ordenarPor: "+ordenarPor)
						
				var dataDe = dataDe+";"+dataAte
				console.log("dataDe concatenada: "+dataDe)
						
				// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
				var a1 = DatasetFactory.createConstraint("CELULA",celula,celula,ConstraintType.MUST)
				var a2 = DatasetFactory.createConstraint("CODPRJ",numOS,numOS,ConstraintType.MUST)
				var a3 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
				//var a4 = DatasetFactory.createConstraint("CODSTATUS",codStatus,codStatus,ConstraintType.MUST)
				//var a5 = DatasetFactory.createConstraint("ALOCACAO",alocacao,alocacao,ConstraintType.MUST)
				//var a6 = DatasetFactory.createConstraint("CODPOSTO",codPosto,codPosto,ConstraintType.MUST)
				//var a7 = DatasetFactory.createConstraint("FOLGADE",folgaDe,folgaDe,ConstraintType.MUST)
				//var a8 = DatasetFactory.createConstraint("FOLGAATE",folgaAte,folgaAte,ConstraintType.MUST)
				//var a9 = DatasetFactory.createConstraint("NIVELDE",nivelDe,nivelDe,ConstraintType.MUST)
				//var a10 = DatasetFactory.createConstraint("NIVELATE",nivelAte,nivelAte,ConstraintType.MUST)
				var a11 = DatasetFactory.createConstraint("IDPRD",idprd,idprd,ConstraintType.MUST)
				var a12 = DatasetFactory.createConstraint("CODIGOPRD",codigoPrd,codigoPrd,ConstraintType.MUST)
				//var a13 = DatasetFactory.createConstraint("DTHRINICIALPREV",dataDe,dataDe,ConstraintType.MUST)
				//var a14 = DatasetFactory.createConstraint("DTHRFINALPREV",dataAte,dataAte,ConstraintType.MUST)
				var a15 = DatasetFactory.createConstraint("ORDERBY",ordenarPor,ordenarPor,ConstraintType.MUST)
				var a16 = DatasetFactory.createConstraint("FILIAL",filial,filial,ConstraintType.MUST)
				//var a17 = DatasetFactory.createConstraint("ORDERBY2",ordenarPor2,ordenarPor2,ConstraintType.MUST)
				
				/*
				// SE NÍVEL INFERIOR FOI SELECIONADO
				if(inferior=="SIM"){
					
					console.log("inferior foi selecionado")
					
					inferior = $("#INDICE_PRD").val()
					var a17 = DatasetFactory.createConstraint("INFERIOR",inferior,inferior,ConstraintType.MUST)

					constraints = new Array(a2,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a15,a16,a17)
					
				} else {
					
					console.log("inferior não foi selecionado")
					
					constraints = new Array(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a15,a16)
					
				}*/
				
				constraints = new Array(a1,a2,a3,a11,a12,a15,a16)
				
				var dataset = DatasetFactory.getDataset("dsPlanejamentoGeralOS",null,constraints,null)
				row = dataset.values
				console.log("row")
				console.log(row)
				
				// SE RETORNO É VAZIO OU NULO
				if(!(row=="" || row==null || row==undefined)){
					
					var count = dataset.values.length
					
					// PREENCHE DIAS DE CABEÇALHO
					preencheDiasCabecalho()
					
					console.log("count: "+count)
				
					// PERCORRE TODOS OS REGISTROS
					for(var i=0; i < count; i++){
						
						var seq = addPlanAtividades()
						
						var rep = row[i]
						
						$("#OPATV___"+seq).val(rep["OP"])
						$("#OSATV___"+seq).val(rep["OS"])
						$("#PARALISADOATV___"+seq).val(rep["PARALISADO"])
						$("#CODCOLIGADA___"+seq).val(rep["CODCOLIGADA"])
						$("#CODFILIAL___"+seq).val(rep["CODFILIAL"])
						
						// SE É RETRABALHO
						if(rep["REPROCESSAMENTO"]==1){
							
							$("#ITEMATV___"+seq).val("Retrabalho: "+rep["DSCITEM"])
							
						} else {
							
							$("#ITEMATV___"+seq).val(rep["DSCITEM"])
							
						}
						
						$("#CODIGOPRDATV___"+seq).val(rep["CODIGOPRD"])
						$("#IDPRDATV___"+seq).val(rep["IDPRD"])
						$("#ATIVIDADEATV___"+seq).val(rep["DSCATIVIDADE"])
						$("#CODATIVIDADEATV___"+seq).val(rep["CODATIVIDADE"])
						$("#IDATIVIDADEATV___"+seq).val(rep["IDATVORDEM"])
						$("#CODESTRUTURAATV___"+seq).val(rep["CODESTRUTURA"])
						$("#PRIORIDADEATV___"+seq).val(rep["PRIORIDADE"])
						$("#POSTOATV___"+seq).val(rep["CODPOSTO"])
						$("#IDPRJATV___"+seq).val(rep["IDPRJ"])
						$("#IDTRFATV___"+seq).val(rep["IDTRF"])
						$("#STATUSOPATV___"+seq).val(rep["STATUS_OP"])
						$("#STATUSATV___"+seq).val(rep["STATUS_ATV"])
						$("#CELULAATV___"+seq).val(rep["CELULA"])
						$("#CODHABILIDADEATV___"+seq).val(rep["CODHABILIDADE"])
						
						// SE CÉLULA É A USINAGEM
						if(rep["CELULA"]=="11"){
							
							$("#ALTERARPOSTO___"+seq).parent().attr("href","#ALTERARPOSTOBLANK")
							
						}
						
						$("#CODSTATUSATV___"+seq).val(rep["STATUS"])
						//$("#CODSTATUSOPATV___"+seq).val(rep["STATUS_OP"])
						$("#CODSTATUSOPATV___"+seq).val(rep["CODSTATUS"])
						$("#EXECUCAOATV___"+seq).val(rep["EXECUCAO"])
						
						if(rep["ATV_POSTERIOR"]=="ULTIMA"){
							
							$("#ULTIMAATVOP___"+seq).val("ULTIMA")
							
						}
						
						// SE TEM PLANO DE CORTE
						if(!(rep["NUMPLANOCORTE"]=="" || rep["NUMPLANOCORTE"]==null || rep["NUMPLANOCORTE"]=="null" || rep["NUMPLANOCORTE"]==undefined)){
							
							$("#PLANOCORTEATV___"+seq).parent().append("Sim")
							$("#PLANOCORTEATV___"+seq).val("Sim")
							
						} else {
							// SE NÃO
							
							$("#PLANOCORTEATV___"+seq).parent().append("Não")
							$("#PLANOCORTEATV___"+seq).val("Não")
							
						}
						
						// SE RECURSO PREVISTO FOI INFORMADO
						if(!(rep["REC_PREV"]=="" || rep["REC_PREV"]==null || rep["REC_PREV"]==undefined || rep["REC_PREV"]=="null")){
				
							$("#RECPREVATV___"+seq).val(rep["REC_PREV"])
							
						} else {
							// SE NÃO 
							
							$("#RECPREVATV___"+seq).val(0)
							
						}
						
						// SE TAG FOI PREENCHIDA
						if(!(rep["TAG"]=="" || rep["TAG"]==undefined || rep["TAG"]==null || rep["TAG"]=="null")){
							
							$("#TAGATV___"+seq).val(rep["TAG"])
							
						}else{
							
							$("#TAGATV___"+seq).val("")
							
						}
			
						// SE NÚMERO DO PLANO DE CORTE FOI INFORMADO
						/*if(!(rep["NUMPLANOCORTE"]=="" || rep["NUMPLANOCORTE"]==null || rep["NUMPLANOCORTE"]=="null" || rep["NUMPLANOCORTE"]==undefined)){

							$("#PLANOCORTEATV___"+seq).val(rep["NUMPLANOCORTE"])
							
						}*/
						
						var cargaPrev = rep["CARGA_PREV"] / 60
						
						console.log("cargaPrev: "+cargaPrev)
						
						cargaPrev = cargaPrev.toFixed(2)
						cargaPrev = cargaPrev.replace(".",",")
						
						console.log("cargaPrev após o replace: "+cargaPrev)
						
						$("#CARGAPREVATV___"+seq).val(cargaPrev)
						//$("#CARGAREALATV___"+seq).val(rep[""])
						//$("#SALDOREVATV___"+seq).val(rep[""])
						//$("#SALDOALOCADOATV___"+seq).val(rep[""])
						//$("#SALDOAALOCARATV___"+seq).val(rep[""])
						
						
						// SE FOLGA NÃO É NULO OU VAZIO
						if(!(rep["FOLGA"]=="" || rep["FOLGA"]==null || rep["FOLGA"]==undefined || rep["FOLGA"]=="null")){
							
							var folga = rep["FOLGA"]
							folga = parseInt(folga)
							/*folga = folga.toFixed(2)
							folga = folga.toString()
							
							if(folga.includes(".")){
								
								folga = folga.replace(".",",")	
							
							}*/
							
							$("#FOLGAATV___"+seq).val(folga)
							
						} else {
							
							$("#FOLGAATV___"+seq).val(0)
							
						}
						
						var dia1 = $("#THDIA1ATV").text()
						if(!(dia1=="")){
							dia1 = formataDataBanco(dia1)	
						}
						
						var dia2 = $("#THDIA2ATV").text()
						if(!(dia2=="")){
							dia2 = formataDataBanco(dia2)	
						}
						
						var dia3 = $("#THDIA3ATV").text()
						if(!(dia3=="")){
							dia3 = formataDataBanco(dia3)	
						}
						
						var dia4 = $("#THDIA4ATV").text()
						if(!(dia4=="")){
							dia4 = formataDataBanco(dia4)	
						}
						
						var dia5 = $("#THDIA5ATV").text()
						if(!(dia5=="")){
							dia5 = formataDataBanco(dia5)	
						}
						
						var dia6 = $("#THDIA6ATV").text()
						if(!(dia6=="")){
							dia6 = formataDataBanco(dia6)	
						}
						
						var dia7 = $("#THDIA7ATV").text()
						if(!(dia7=="")){
							dia7 = formataDataBanco(dia7)	
						}
						
						var dia8 = $("#THDIA8ATV").text()
						if(!(dia8=="")){
							dia8 = formataDataBanco(dia8)	
						}
						
						var dia9 = $("#THDIA9ATV").text()
						if(!(dia9=="")){
							dia9 = formataDataBanco(dia9)	
						}
						
						var dia10 = $("#THDIA10ATV").text()
						if(!(dia10=="")){
							dia10 = formataDataBanco(dia10)	
						}
						
						$("#DIA1ATVREAL___"+seq).val(dia1)
						$("#DIA2ATVREAL___"+seq).val(dia2)
						$("#DIA3ATVREAL___"+seq).val(dia3)
						$("#DIA4ATVREAL___"+seq).val(dia4)
						$("#DIA5ATVREAL___"+seq).val(dia5)
						$("#DIA6ATVREAL___"+seq).val(dia6)
						$("#DIA7ATVREAL___"+seq).val(dia7)
						$("#DIA8ATVREAL___"+seq).val(dia8)
						$("#DIA9ATVREAL___"+seq).val(dia9)
						$("#DIA10ATVREAL___"+seq).val(dia10)
						
						inicioPlan = rep["INICIO_PLANEJADO"]
						fimPlan = rep["FINAL_PLANEJADO"]
						
						inicioPlan = inicioPlan.split(" ")[0]
						fimPlan = fimPlan.split(" ")[0]
						
						$("#INICIOPLANATVREAL___"+seq).val(inicioPlan)
						$("#FIMPLANATVREAL___"+seq).val(fimPlan)
						
						inicioPlan = formataDataFinalAno(inicioPlan)
						fimPlan = formataDataFinalAno(fimPlan)
						
						$("#INICIOPLANATV___"+seq).val(inicioPlan)
						$("#FIMPLANATV___"+seq).val(fimPlan)
						
						// EXIBE OS CAMPOS
						$("#ABAS").show()
						$(".TABELARESUMO").show()
						
						/*console.log("vou buscar o saldo a alocar para OP "+rep["OP"]+" e ATV "+rep["CODATIVIDADE"])
						
						var a1 = DatasetFactory.createConstraint("CODATIVIDADE",rep["CODATIVIDADE"],rep["CODATIVIDADE"],ConstraintType.MUST)
						var a2 = DatasetFactory.createConstraint("CODORDEM",rep["OP"],rep["OP"],ConstraintType.MUST)
						
						constraints = new Array(a1,a2)
						
						var dataset = DatasetFactory.getDataset("dsSaldoAlocarAtv",null,constraints,null)
						row2 = dataset.values
						var rep2 = row2[0]
						var saldoAlocado = 0
						
						// SE TOTAL NÃO É VAZIO OU NULO
						if(!(rep2["TOTAL"]=="" || rep2["TOTAL"]=="null" || rep2["TOTAL"]==null || rep2["TOTAL"]==undefined)){
							
							saldoAlocado = rep2["TOTAL"]
							
							$("#SALDOALOCADOATV___"+seq).val(saldoAlocado)
							
						} else {
							// SE NÃO
							
							$("#SALDOALOCADOATV___"+seq).val(saldoAlocado)
							
						}*/
						
						var saldoAlocado = 0
						var saldoAlocadoStr = ""
						var saldoRevisado = 0
						var saldoAlocar = 0
						var cargaRealizada = 0
						//var avanco = 0 
						//var apontado = 0
						//var apontado = rep["APONTADO"]
						
						var cargaPrev = rep["CARGA_PREV"] / 60
						console.log("cargaPrev: "+cargaPrev)
						
						cargaPrev = cargaPrev.toFixed(2)
						console.log("após o fixed(4) cargaPrev: "+cargaPrev)
						
						var apontado = rep["APONTADO"]
						cargaRealizada = apontado
						
						//apontado = apontado.toFixed(2)
						
						// SE SALDO ALOCADO NÃO É NULO E NEM VAZIO
						if(!(rep["ALOCADO"]=="" || rep["ALOCADO"]=="null" || rep["ALOCADO"]==null || rep["ALOCADO"]==undefined)){
							
							//saldoAlocado = rep["ALOCADO"] / 60
							saldoAlocado = rep["ALOCADO"]
							//saldoAlocadoStr = rep["ALOCADO"]
							
							console.log("saldoAlocado: "+saldoAlocado)
							
							/*if(saldoAlocado.includes(".")){
								
								saldoAlocadoStr = saldoAlocado.replace(".",",")
								
								//saldoAlocado = saldoAlocado.toFixed(2)
								
							}*/
							
							console.log("saldoAlocado: "+saldoAlocado)
							console.log("saldoAlocadoStr: "+saldoAlocadoStr)
							
							saldoAlocado = parseFloat(saldoAlocado)
							//saldoAlocadoStr = parseFloat(saldoAlocadoStr)
							//saldoAlocado = saldoAlocado.toString()
							saldoAlocado = saldoAlocado.toFixed(2)
							//saldoAlocadoStr = saldoAlocadoStr.toFixed(2)
							
							// SE APONTADO NÃO É NULO OU VAZIO
							if(!(apontado=="" || apontado==null || apontado==undefined || apontado=="null")){
								
								apontado = parseFloat(apontado)
								apontado = apontado.toFixed(2)
								
								saldoAlocado = saldoAlocado - apontado
								
								saldoAlocado = parseFloat(saldoAlocado).toFixed(2)
								
							}
							
							//saldoAlocado = saldoAlocado.toString()
							saldoAlocadoStr = saldoAlocado
							saldoAlocadoStr = saldoAlocadoStr.toString()
							
							if(saldoAlocadoStr.includes(".")){
								
								saldoAlocadoStr = saldoAlocadoStr.replace(".",",")
								
							}
							
							console.log("saldoAlocado: "+saldoAlocado)
							console.log("apontado: "+apontado)
							console.log("saldoAlocadoStr: "+saldoAlocadoStr)
							
							//$("#SALDOALOCADOATV___"+seq).val(saldoAlocado)
							$("#SALDOALOCADOATV___"+seq).val(saldoAlocadoStr)
							
						} else {
							// SE NÃO
							
							$("#SALDOALOCADOATV___"+seq).val(saldoAlocado)
							
						}
						
						// PRECISARÁ TRAZER NA CONSULTA O SALDO REVISADO (QUE É A CRAGAPREV - APONTADO)
						// SE NADA FOI APONTADO
						if(!(apontado==0 || apontado=="" || apontado==null || apontado=="null" || apontado==undefined)){
							
							saldoRevisado = cargaPrev - apontado	
					
							console.log("saldo revisado: "+saldoRevisado)
							
						} else {
							
							apontado = 0
							
						}
						
						// SE O SALDO REVISADO É 0
						if(saldoRevisado==0){
							
							saldoAlocado = saldoAlocado.toString()
							saldoAlocado = saldoAlocado.replace(",",".")
							saldoAlocado = parseFloat(saldoAlocado)
							
							if(!(apontado==0) && !(apontado==cargaPrev)){
								
								console.log("saldo revisado é igual a 0")
								console.log("cargaPrev: "+cargaPrev+", saldoAlocado: "+saldoAlocado+", apontado: "+apontado)
								saldoAlocar = cargaPrev - (saldoAlocado + apontado)
								console.log("saldoAlocar: "+saldoAlocar)
								
							}
							
							if(!(apontado==0) && apontado==cargaPrev){
								
								saldoAlocar = 0
								
							}
							if(apontado==0) {
								
								console.log("saldo revisado é igual a 0")
								saldoAlocar = cargaPrev - saldoAlocado
								console.log("saldoAlocar: "+saldoAlocar)
								
							}
							
						} else {
							// SE NÃO
							console.log("saldoRevisado é diferenre de 0")
							console.log("saldoRevisaodo: "+saldoRevisado+", saldoAlocado: "+saldoAlocado)
							saldoAlocar = parseFloat(saldoRevisado).toFixed(2) - parseFloat(saldoAlocado).toFixed(2) 
							console.log("saldoAlocar: "+saldoAlocar)
							
						}
						
						console.log("apontado: "+apontado)
						console.log("cargaPrev: "+cargaPrev)
						console.log("saldoAlocar: "+saldoAlocar)

						// SE NÃO ESTÁ PROGRAMADO OU PARCIALMENTE APONTADO
						/*if(!(rep["STATUS"]==2 || rep["STATUS"]==3 || rep["STATUS"]==5) || rep["ATV_POSTERIOR"]=="ULTIMA"){
							
							$("#AVANCOATV___"+seq).parent("td").children("a").removeAttr("href")
							
						}*/
						
						// SE AVANCO REALIZADO FOI LANÇADO
						if(!(rep["AVANCO_REALIZADO"]=="" || rep["AVANCO_REALIZADO"]=="null" || rep["AVANCO_REALIZADO"]==null || rep["AVANCO_REALIZADO"]==undefined)){
							
							$("#AVANCOATV___"+seq).val(rep["AVANCO_REALIZADO"].toString().replace(".",",")+" %")
							//$("#AVANCOATV___"+seq).parent("td").children("a").children("span").text(rep["AVANCO_REALIZADO"].toString().replace(".",",")+" %")
							$("#AVANCOATV___"+seq).parent("td").children("span").text(rep["AVANCO_REALIZADO"].toString().replace(".",",")+" %")
							
						} else {
							
							$("#AVANCOATV___"+seq).val("0 %")
							//$("#AVANCOATV___"+seq).parent("td").children("a").children("span").text("0 %")
							$("#AVANCOATV___"+seq).parent("td").children("span").text("0 %")
							
						}
						
						// SE APONTADO NÃO É NULO OU VAZIO
						/*if(!(apontado=="" || apontado=="null" || apontado==0 || apontado==null || apontado==undefined)){
				
							avanco = (apontado / cargaPrev)*100
							avanco = avanco.toFixed(0)
							
							avanco = avanco.toString()
							
							if(avanco.includes(".")){
								
								avanco = avanco.replace(".",",")
								
							}
							
							$("#AVANCOATV___"+seq).val(avanco+" %")
							
						} else {
							
							avanco = 0
							
							$("#AVANCOATV___"+seq).val(avanco+" %")
							
						}*/
						
						//var saldoAlocar = cargaPrev - saldoAlocado
						
						// SE O SALDO A ALOCAR É NULO OU VAZIO
						if(!(saldoAlocar=="" || saldoAlocar==null || saldoAlocar==undefined || saldoAlocar=="null")){
							
							console.log("saldoAlocar: "+saldoAlocar)
							saldoAlocar = saldoAlocar.toFixed(2)
							console.log("após o fixed(4) saldoAlocar: "+saldoAlocar)
							
							saldoAlocar = saldoAlocar.toString()
							
							if(saldoAlocar.includes(".")){
								
								saldoAlocar = saldoAlocar.replace(".",",")
								
							}
							
							console.log("após o replace saldoAlocar: "+saldoAlocar)
							
							$("#SALDOAALOCARATV___"+seq).val(saldoAlocar)
							
						} else {
							
							$("#SALDOAALOCARATV___"+seq).val(0)
							
						}
						
						// SE O SALDO REVISADO É NULO OU VAZIO
						/*if(!(saldoRevisado=="" || saldoRevisado==null || saldoRevisado==undefined || saldoRevisado=="null")){
							
							saldoRevisado = saldoRevisado.toFixed(2)
							saldoRevisado = saldoRevisado.toString()
							
							if(saldoRevisado.includes(".")){
								
								saldoRevisado = saldoRevisado.replace(".",",")
								
							}
							
							$("#SALDOREVATV___"+seq).val(saldoRevisado)
							
						} else {
							
							$("#SALDOREVATV___"+seq).val(0)
							
						}*/
						
						// SE A CARGA REALIZADA É NULO OU VAZIO
						if(!(cargaRealizada=="" || cargaRealizada==null || cargaRealizada==undefined || cargaRealizada=="null")){
							
							cargaRealizada = parseFloat(cargaRealizada)
							cargaRealizada = cargaRealizada.toFixed(2)
							
							cargaRealizada = cargaRealizada.toString()
							
							if(cargaRealizada.includes(".")){
								
								cargaRealizada = cargaRealizada.replace(".",",")	
								
							}
							
							$("#CARGAREALATV___"+seq).val(cargaRealizada)
							
						} else {
							
							$("#CARGAREALATV___"+seq).val(0)
							
						}
						
						//var avanco = 0
						
						// PREENCHE OS SALDOS ALOCADOS POR DIAS DA TABELA DE ALOCAÇÃO
						preencheSaldosAlocados(rep["CODCOLIGADA"],rep["CODFILIAL"],rep["OP"],rep["IDATVORDEM"],dataDe,dataAte,seq)
						
					}
					
					// VERIFICA FILTRO ALOCAÇÃO E ESCONDE AS LINHAS QUE FOREM NECESSÁRIAS
					verificaAlocacaoTabela()
					
					// SE O SALDO A ALOCAR FOR "0", MUDA A COR DA LINHA DA ATIVIDADE
					verificaStatusAtv()
					
					// BUSCA A SITUAÇÃO DO FAROL PARA CADA ATIVIDADE
					farol()
					
					// SE TABELA DOS FILTROS PARA A TABELA DE CADASTRO NÃO FOI CRIADA
					if(!(temTabelaFiltros())){
						
						console.log("vou incluir linha dos filtros")
						
						// ADICIONA LINHA PARA O FILTRO DA TELA DO CADASTRO
						addFiltro()

					} else {
						// SE NÃO
						
						// LIMPA OS FILTROS
						limpaFiltros()
						
					}
					
					// CONSTRÓI FILTROS PARA A TABELA PRINCIPAL
					constroiFiltros()
					
					$("#ICONREDUZIR").click()
					
					$(".PLANEJAMENTO").show()
					
				} else {
					// SE NÃO, A CONSULTA NÃO OBTEVE RETORNO 
					
					// EXIBE OS CAMPOS
					//$("#ABAS").hide()
					$(".TABELARESUMO").hide()
					$("#ICONEXPANDIR").click()
					
					// EXIBE ALERTA
					Swal.fire({
						  icon: 'error',
						  title: 'Busca para os filtros informados não obteve retorno',
						  message: 'Verifique e tente novamente.'
					})
					
				}
				
			},500)
			
			// DESATIVA O LOAD
			setTimeout(function(){
				
				myLoading2.hide();
				
			},500)
		
	}
			
	//}
	
}

// PERCORRE A TABELA E SE O FILTRO DA ALOCAÇÃO FOI PREENCHIDO, FAZ A TRATATIVA
function verificaAlocacaoTabela(){
	
	var alocacao = $("#ALOCACAO").val()
	
	// SE ALOCAÇÃO FOI INFORMADA
	if(!(alocacao=="" || alocacao==undefined || alocacao==null)){
		
		// PERCORRE A TABELA E VERIFICA O SALDO A ALOCAR
		$("input[id^='SALDOAALOCARATV___']").each(function(){
			
			var seq = $(this).attr("id").split("___")[1]
			
			var saldoAlocar = $("#SALDOAALOCARATV___"+seq).val()
			saldoAlocar = saldoAlocar.replace(",",'.')
			saldoAlocar = parseFloat(saldoAlocar)
			
			console.log("saldoAlocar: "+saldoAlocar)
			
			// SE ALOCAÇÃO É COMPLETA
			if(alocacao=="COMPLETA"){
				
				if(saldoAlocar>0){
					
					$("#LINHAPLAN___"+seq).hide()
					
				}
				
			}
			
			// SE ALOCAÇÃO É INCOMPLETA
			if(alocacao=="INCOMPLETA"){
				
				// SE O SALDO A ALOCAR É 0
				if(saldoAlocar==0){
					
					$("#LINHAPLAN___"+seq).hide()
					
				}
				
			}
			
		})
		
	}
		
}

// PEGA A DATA DO FORMULÁRIO E SALVA EM FORMATO PARA BANCO
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

// PEGA A DATA DO FORMULÁRIO E SALVA EM FORMATO PARA BANCO
function formataDataFinalAno(strData) {
    
	// ARRAY PARA PEGAR A STRING APENAS DO VALOR DA DATA
	var arrayString = strData.split(" ")
	console.log("data[0]: "+arrayString[0]+", data[1]: "+arrayString[1])
	
	// ARRAY PARA OS VALORES DE DIA/MÊS/ANO
	var arrayData = arrayString[0].split("-")
	
	var ano = arrayData[0]
	var mes = arrayData[1]
	var dia = arrayData[2]
	
	ano = ano.substr(2,3)
	
	// MONTA A DATA NO PADRÃO BRASILEIRO
	var novaData = dia + '/' + mes + '/' + ano;
    	
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

// PREENCHE A DATA "DE" COM A DATA ATUAL E LIMITA A SELEÇÃO DO DIA
function preencheDeLimitaSelecao(){
	
	 var dataCorrente = new Date().toLocaleString()
	 var dataDe = dataCorrente.split(" ")[0]
	 console.log("dataDe: "+dataDe)
	 
	 dataDe = dataDe.split("/")
	 console.log("dataDe: "+dataDe)
	
	 var dia = dataDe[0]
	 var mes = dataDe[1]
	 var ano = dataDe[2]
	
	 mes = mes.replace("0","")
	
	 console.log("dia: "+dia+", mes: "+mes+", ano: "+ano)
	 
	 var dataMin = new Date(ano,mes-1,dia)
		
	 var dataMax = new Date(ano,mes-1,dia)
	 
	console.log("dataMin: "+dataMin+", dataMax: "+dataMax)
	
	 dataMax.setDate(dataMin.getDate() + 4)
		
	 console.log("dataMin: "+dataMin+", dataMax: "+dataMax)
	
	 console.log("vou remover o DATA_DE")
	$("#DATA_DE").remove()
	$("#SPANDE").remove()
	$("#PERIODO1").append("<input type='text' class='form-control' id='DATA_DE' name='DATA_DE' onchange='limpaDataAte()'><span class='input-group-addon' id='SPANDE' name='SPANDE'><span class='fluigicon fluigicon-calendar'></span></span>")
	 
	 var mySimpleCalendar1 = FLUIGC.calendar("#DATA_DE", { language: 'pt-br', minDate: dataMin, maxDate: dataMax, pickDate: true, pickTime: false });
	 mySimpleCalendar1.setDate(""+dia+"/"+mes+"/"+ano+"");
	 //FLUIGC.calendar("#DATA_DE", { language: 'pt-br', minDate: dataMin, maxDate: dataMax, pickDate: true, pickTime: false });
	 
	 dataMax = new Date(ano,mes-1,dia)
	 dataMax.setDate(dataMin.getDate() + 10)
	 
	 //$("#SEDT")
	 
	var mySimpleCalendar2 = FLUIGC.calendar("#ATE", { language: 'pt-br', minDate: dataMin, maxDate: dataMax, pickDate: true, pickTime: false });
	mySimpleCalendar2.setDate(""+dia+"/"+mes+"/"+ano+"");
	 
}

// LIMPA TABELA DE PLANEJAMENTO
function limpaTabelaPlanejamento(){
	
	// PERCORRE OS ITENS DA TABELA E REMOVE O SEU CONTEÚDO
	$("input[id^='OSATV___']").each(function(index, value){
		
		$(this).parents("tr").remove();
		
	});
	
	$("#THDIA1ATVCAB").removeClass("visivel").html("")
	$("#THDIA2ATVCAB").removeClass("visivel").html("")
	$("#THDIA3ATVCAB").removeClass("visivel").html("")
	$("#THDIA4ATVCAB").removeClass("visivel").html("")
	$("#THDIA5ATVCAB").removeClass("visivel").html("")
	$("#THDIA6ATVCAB").removeClass("visivel").html("")
	$("#THDIA7ATVCAB").removeClass("visivel").html("")
	$("#THDIA8ATVCAB").removeClass("visivel").html("")
	$("#THDIA9ATVCAB").removeClass("visivel").html("")
	$("#THDIA10ATVCAB").removeClass("visivel").html("")
	
	
	$("#THDIA1ATV").removeClass("visivel").html("")
	$("#THDIA2ATV").removeClass("visivel").html("")
	$("#THDIA3ATV").removeClass("visivel").html("")
	$("#THDIA4ATV").removeClass("visivel").html("")
	$("#THDIA5ATV").removeClass("visivel").html("")
	$("#THDIA6ATV").removeClass("visivel").html("")
	$("#THDIA7ATV").removeClass("visivel").html("")
	$("#THDIA8ATV").removeClass("visivel").html("")
	$("#THDIA9ATV").removeClass("visivel").html("")
	$("#THDIA10ATV").removeClass("visivel").html("")
	
}

// COLOCA A SELEÇÃO NO CAMPO AVANÇO
function colocaSelecaoAvanco(obj){
	
	console.log("coloca seleção no avanço")
	
	var seq = $(obj).parent("tr").attr("id").split("___")[1]
	
	var codcoligada = $("#CODCOLIGADA___"+seq).val()
	var codfilial = $("#CODFILIAL___"+seq).val()
	var codOrdem = $("#OPATV___"+seq).val()
	var idAtvOrdem = $("#IDATIVIDADEATV___"+seq).val()
	var codEstrutura = $("#CODESTRUTURAATV___"+seq).val()
	var codStatus = $("#CODSTATUSATV___"+seq).val()
	var ultimaAtv = $("#ULTIMAATVOP___"+seq).val()
	var avanco = $("#AVANCOATV___"+seq).val()

	console.log("codStatus: "+codStatus+", ultimaAtv: "+ultimaAtv+", avanco: "+avanco+", codcoligada: "+codcoligada+", codfilial: "+codfilial+", codOrdem: "+codOrdem+
			", idAtvOrdem: "+idAtvOrdem+", codEstrutura: "+codEstrutura)

	// SE O AVANÇO JÁ FOI SELECIONADO
	if($(obj).hasClass("avancoSelecionado")){
		
		// TIRA A SELEÇÃO
		$(obj).removeClass("avancoSelecionado")
		
	} else {
		// SE NÃO
		
		// SE ATIVIDADE TEM PLANO DE CORTE CADASTRADO
		if(atvTemPlanoCorte(codcoligada,codfilial,codOrdem,idAtvOrdem,codEstrutura)){
		
			Swal.fire({
				  icon: 'warning',
				  title: 'Essa atividade não pode ter avanço alterado, pois pertence a um plano de corte!',
				  text: "Verifique e tente novamente"
			})
			
			// TIRA A SELEÇÃO
			$(obj).removeClass("avancoSelecionado")
			
		}
		
		// SE NÃO ESTÁ PROGRAMADO OU PARCIALMENTE APONTADO
		else if(!(codStatus==2 || codStatus==3 || codStatus==5) || ultimaAtv=="ULTIMA"){
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'warning',
				  title: 'Essa atividade não pode ter avanço alterado',
				  text: "Verifique e tente novamente"
			})
			
			// TIRA A SELEÇÃO
			$(obj).removeClass("avancoSelecionado")
			
		} else if(ultimaAtv=="ULTIMA"){
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'O avanço da última atividade da OP deve ser feito ao subir saldo no processo de Apontamento',
				  text: 'Verifique e tente novamente.'
			})
			
			// TIRA A SELEÇÃO
			$(obj).removeClass("avancoSelecionado")
			
		} else {
			// SE NÃO
			
			// COLOCA A SELEÇÃO
			$(obj).addClass("avancoSelecionado")
			
		}
		
	}
	
}

// LIMPA TABELA DE COMPONENTES
function limpaComponentesAtv(){
	
	// PERCORRE OS ITENS DA TABELA E REMOVE O SEU CONTEÚDO
	$("input[id^='CODIGO___']").each(function(index, value){
		
		$(this).parents("tr").remove();
		
	});
	
}

// LIMPA TABELA DE RECURSO N3
function limparTabelaRecursoN3(){
	
	console.log("VOU LIMPAR OS RECURSOS SELECIONADOS N3")
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='CODMON3___']").each(function(index,value){
	
		$(this).parents("tr").remove();
		
	})
	
	// LIMPA OS DIAS DA TABELA, OS RECURSOS SELECIONADOS E DESABILITA OS CAMPOS
	//limpaProgramacaoSalva()

	// LIMPA A SELEÇÃO DE TODOS OS ITENS DA TABELA
	//limpaSelecaoTodosTabela()
	
}

// VERIFICA SE A ALOCAÇÃO ESTÁ DISPONÍVEL PARA SER ALOCADA DISPONIBILIDADE PROGRAMAÇÃO PODE SER REALIZADA
function verificaDispDiaAlocacao(codcoligada,codfilial,os,codOrdem,idprj,idtrf,dataProgramada){
	
	/*ret = true
	// ret = false
	
	console.log("vou verificar a disponibilidade do dia alocado")
	
	var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codcoligada,codcoligada,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("IDPRJ",idprj,idprj,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("IDTRF",idtrf,idtrf,ConstraintType.MUST)
	var a4 = DatasetFactory.createConstraint("DIA_PROG",dataProgramada,dataProgramada,ConstraintType.MUST)
	
	var constraints = new Array(a1,a2,a3,a4)
	
	console.log("codColigada: "+codcoligada+", IDPRJ: "+idprj+", IDTRF: "+idtrf+", dia: "+dataProgramada)
	
	var dataset = DatasetFactory.getDataset("dsVerificaAtvProgOS",null,constraints,null)
	var row = dataset.values
	
	console.log("row")
	console.log(row)
	
	// SE RETORNO NÃO É NULO OU VAZIO, OU SEJA, EXISTEM OP'S PRECEDENTES
	if(!(row=="" || row==null || row==undefined || row=="null")){
		
		var count = dataset.values.length
		
		// PERCORRE TODOS OS REGISTROS DAS OP'S PRECEDENTES
		for(var i=0; i<count; i++){
			
			var rep = row[i]
			
			// SE EXISTE PELO MENOS UMA ORDEM PRECEDENTE QUE NÃO TENHA SIDO PROGRAMADA
			if((rep["CODORDEM"]=="" || rep["CODORDEM"]==null || rep["CODORDEM"]==undefined || rep["CODORDEM"]=="null")){
			// SE EXISTE PELO MENOS UMA ORDEM PRECEDENTE QUE TENHA SIDO PROGRAMADA
			//if(!(rep["CODORDEM"]=="" || rep["CODORDEM"]==null || rep["CODORDEM"]==undefined || rep["CODORDEM"]=="null")){
				
				ret = false
				// ret = true
				
				console.log("a "+dataProgramada+" não pode ser alocada porque não tem OP precedente programada")
				
			}
			
		}
		
		
	} else {
		// SE NÃO
		
		ret = true
		
	}*/
	
	var ret = true
	// ret = false
	
	console.log("vou verificar a disponibilidade do dia alocado")
	
	var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codcoligada,codcoligada,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("CODFILIAL",codfilial,codfilial,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("OS",os,os,ConstraintType.MUST)
	var a4 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
	
	var constraints = new Array(a1,a2,a3,a4)
	
	var dataset = DatasetFactory.getDataset("dsVerificaCompAtvOP",null,constraints,null)
	var row = dataset.values
	
	console.log("row")
	console.log(row)
	
	// SE RETORNO NÃO É NULO OU VAZIO, OU SEJA, EXISTEM OP'S PRECEDENTES
	if(!(row=="" || row==null || row==undefined || row=="null")){
	
		ret = false
		
	}
	
	return ret
	
}

// BUSCA A SITUAÇÃO DO FAROL PARA CADA ATIVIDADE
function farol(){
	
	console.log("entrei para configurar o farol")
	
	// PERCORRE TODOS OS ITENS DA TABELA
	$("input[id^='OSATV___']").each(function(index,value){
	
		var seq = $(this).attr("id").split("___")[1]
		var ret = false
		
		var paralisado = $("#PARALISADOATV___"+seq).val()
		
		// SE ITEM NÃO FOI PARALISADO
		if(paralisado=="" || paralisado==undefined || paralisado=="null" || paralisado==null){
			
			var codcoligada = $("#CODCOLIGADA___"+seq).val()
			var codfilial = $("#CODFILIAL___"+seq).val()
			var os = $("#OSATV___"+seq).val()
			var op = $("#OPATV___"+seq).val()
			var idprj = $("#IDPRJATV___"+seq).val()
			var idtrf = $("#IDTRFATV___"+seq).val()
			
			var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codcoligada,codcoligada,ConstraintType.MUST)
			var a2 = DatasetFactory.createConstraint("CODFILIAL",codfilial,codfilial,ConstraintType.MUST)
			var a3 = DatasetFactory.createConstraint("OS",os,os,ConstraintType.MUST)
			var a4 = DatasetFactory.createConstraint("CODORDEM",op,op,ConstraintType.MUST)
			
			var constraints = new Array(a1,a2,a3,a4)
			
			//var dataset = DatasetFactory.getDataset("dsInfoFarolOS",null,constraints,null)
			var dataset = DatasetFactory.getDataset("dsVerificaCompAtvOP",null,constraints,null)
			var row = dataset.values
		
			// SE RETORNO NÃO É NULO OU VAZIO, OU SEJA, EXISTEM OP'S PRECEDENTES
			if(!(row=="" || row==null || row==undefined || row=="null")){
				
				/*console.log("não foi paralisado e tem OP precedentes")
				
				var count = dataset.values.length
				
				// PERCORRE TODOS OS REGISTROS DAS OP'S PRECEDENTES
				for(var i=0; i<count; i++){
					
					var rep = row[i]
					
					// SE EXISTE PELO MENOS UMA ORDEM PRECEDENTE QUE TENHA SIDO PROGRAMADA
					if(rep["CODORDEM"]=="" || rep["CODORDEM"]==null || rep["CODORDEM"]==undefined || rep["CODORDEM"]=="null"){
						
						ret = true
						
					}
					
				}
				
				// TEM ATIVIDADES QUE NÃO FORAM PROGRAMADAS
				if(ret){
					
					console.log("não foi paralisado, tem OP precedente e tem atividades não programadas")
					
					$("#FAROLATV___"+seq).parent("div").addClass("FAROLAMARELO")
					
				} else {
					// SE NÃO, TODAS AS ATIVIDADES DA ORDEM FORAM PROGRAMADAS
					
					console.log("não foi paralisado, tem OP precedente e e todas as atividades foram programadas")
					
					$("#FAROLATV___"+seq).parent("div").addClass("FAROLVERDE")
					
				}*/
				
				console.log("não foi paralisado, tem OP precedente e tem atividades não programadas")
				
				$("#FAROLATV___"+seq).parent("div").addClass("FAROLAMARELO")
								
			} else {
				// SE NÃO HÁ PRECEDENTES
				
				console.log("não foi paralisado e não tem OP precedentes")
				
				$("#FAROLATV___"+seq).parent("div").addClass("FAROLVERDE")
				
			}
			
		} else {
			// SE NÃO, ITEM FOI PARALISADO
			
			console.log("item paralisado")
			
			$("#FAROLATV___"+seq).parent("div").addClass("FAROLVERMELHO")
			
		}
				
	})
	
}


// VERIFICA SE SALDO FOI INFORMADO PARA ALOCAR
function saldoInformado(){
	
	var retGeral = true
	var retGeralSaldo = true
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSATV___']").each(function(){
	
		var seq = $(this).attr("id").split("___")[1]
		var ret = false
		
		// SE ATIVIDADE ESTÁ SENDO PROGRAMADA
		if($("#PROGRAMANDO___"+seq).is(":checked")){
			
			retGeral = true
			
			var dia1 = $("#DIA1ATV___"+seq).val()
			var dia2 = $("#DIA2ATV___"+seq).val()
			var dia3 = $("#DIA3ATV___"+seq).val()
			var dia4 = $("#DIA4ATV___"+seq).val()
			var dia5 = $("#DIA5ATV___"+seq).val()
			var dia6 = $("#DIA6ATV___"+seq).val()
			var dia7 = $("#DIA7ATV___"+seq).val()
			var dia8 = $("#DIA8ATV___"+seq).val()
			var dia9 = $("#DIA9ATV___"+seq).val()
			var dia10 = $("#DIA10ATV___"+seq).val()
			
			// SE AO MENOS UM DIA FOI SELECIONADO E INFORMADO SALDO PARA ALOCAR
			
			if(!(dia1=="" || dia1==null || dia1==undefined) && $("#D1___"+seq).hasClass("diaSelecionado")){
				
				ret = true
				
			}
			
			if(!(dia2=="" || dia2==null || dia2==undefined) && $("#D2___"+seq).hasClass("diaSelecionado")){
				
				ret = true
				
			}

			if(!(dia3=="" || dia3==null || dia3==undefined) && $("#D3___"+seq).hasClass("diaSelecionado")){
				
				ret = true
				
			}
			
			if(!(dia4=="" || dia4==null || dia4==undefined) && $("#D4___"+seq).hasClass("diaSelecionado")){
				
				ret = true
				
			}
			
			if(!(dia5=="" || dia5==null || dia5==undefined) && $("#D5___"+seq).hasClass("diaSelecionado")){
				
				ret = true
				
			}

			if(!(dia6=="" || dia6==null || dia6==undefined) && $("#D6___"+seq).hasClass("diaSelecionado")){
				
				ret = true
				
			}
			
			if(!(dia7=="" || dia7==null || dia7==undefined) && $("#D7___"+seq).hasClass("diaSelecionado")){
				
				ret = true
				
			}

			if(!(dia8=="" || dia8==null || dia8==undefined) && $("#D8___"+seq).hasClass("diaSelecionado")){
				
				ret = true
				
			}
			
			if(!(dia9=="" || dia9==null || dia9==undefined) && $("#D9___"+seq).hasClass("diaSelecionado")){
				
				ret = true
				
			}

			if(!(dia10=="" || dia10==null || dia10==undefined) && $("#D10___"+seq).hasClass("diaSelecionado")){
				
				ret = true
				
			}
			
			if(!ret){
				
				retGeralSaldo = false
				
			}
			
		}
		
	})
	
	console.log("retGeralSado: "+retGeralSaldo+", retGeral: "+retGeral)
	
	if(retGeral && retGeralSaldo){
		
		return true
		
	} else {
		
		return false
		
	}
	
	//return ret
	
}

// VERIFICA SE OS DADOS OBRIGATÓRIOS PARA A PROGRAMÇÃO FORAM INFORMADOS E ENVIA A SOLICITAÇÃO
function integrar(){
	
	console.log("vou integrar a alocação")
	
	var seq2 
	var progNegada = new Array()
	var messageRet 
	var recursos = $("#GRUPORECURSON3").val()
	var planoCorte = $("#NUMPLANOCORTEREAL").val()
	
	// SE RECURSOS FORAM SELECIONADOS
	if(!(recursos=="" || recursos==undefined || recursos==null)){
		
		// VERIFICA SE SALDO FOI INFORMADO PARA ALOCAR
		if(saldoInformado()){
		
			var myLoading2 = FLUIGC.loading(window);
			myLoading2.show();
			
			setTimeout(function(){
				
				var codcoligada = ""
			    var codfilial = ""
			    var codOrdem = ""
			    var codAtividade = ""
			    var codPessoa = ""
			    var dataDe = ""
			    var dataAte = ""
			    var celula = ""
			    var codPosto = ""
			    var codPrj = ""
			    var idtrf = ""
			    var idprd = ""
			    var idprj = ""
			    var codigoPrd = ""
			    var dataProgramada = ""
			    var horasProgramadas = "" 
			    var idAtvOrdem = ""
			    var os = ""
			    var codEstrutura = ""
			    	
				console.log("Recursos selecionados")
				console.log(recursos)
				
				// PERCORRE TODOS OS RECURSOS N3 SELECIONADOS
				for(var i=0; i<recursos.length; i++){
					
					var rec = recursos[i]
					
					var codmo = rec.split(" - ")[0]
					var nome = rec.split(" - ")[1]
					
					var seqRec = addSelecionadosN3()
					
					console.log("vou adicionar recurso: "+codmo)
					
					$("#CODMON3___"+seqRec).val(codmo)
					$("#NOMEN3___"+seqRec).val(nome)
					
				}
				   	
				// PERCORRE TODOS OS REGISTROS DA TABELA DE SELECIONADOS N3
				$("input[id^='CODIGON3___']").each(function(index,value){
					
					var seq = $(this).attr("id").split("___")[1]
					
					var codmo = $("#CODMON3___"+seq).val()
					
					console.log("VOU PROGRAMAR O RECURSO: "+codmo)
					
					// PERCORRE TODOS OS REGISTROS DA TABELA DE PROGRAMAÇÃO
					$("input[id^='OSATV___']").each(function(index,value){
					
						seq2 = $(this).attr("id").split("___")[1]
						
						console.log("seq2: "+seq2)
						
						// SE ATIVIDADE FOI SELECIONADA PARA PROGRAMAR
						if($("#LINHAPLAN___"+seq2).hasClass("selecionado")){
							
							console.log("linha foi selecionada")
							
							codcoligada = $("#CODCOLIGADA___"+seq2).val()
					        codfilial = $("#CODFILIAL___"+seq2).val()
					        codOrdem = $("#OPATV___"+seq2).val()
					        codAtividade = $("#CODATIVIDADEATV___"+seq2).val()
					        //dataDe = $("#DATA_DE").val()
						    //dataAte = $("#ATE").val()
						    dataDe = $("#DATADE_PROG").val()
						    dataAte = $("#DATAATE_PROG").val()
					        dataDe = formataDataBanco(dataDe)
						    dataAte = formataDataBanco(dataAte)
						    
						    celula = $("#CELULAATV___"+seq2).val()
						    codPosto = $("#POSTOATV___"+seq2).val()
						    codPrj = $("#OSATV___"+seq2).val()
						    idprj = $("#IDPRJATV___"+seq2).val()
						    idprd = $("#IDPRDATV___"+seq2).val()
						    idtrf = $("#IDTRFATV___"+seq2).val()
						    idAtvOrdem = $("#IDATIVIDADEATV___"+seq2).val()
						    codigoPrd = $("#CODIGOPRDATV___"+seq2).val()
					        os = $("#OSATV___"+seq2).val()
					        codEstrutura = $("#CODESTRUTURAATV___"+seq2).val()
						    
					        // SE DIA FOI PREENCHIDO E HABILITADO
				        	if(!($("#DIA1ATV___"+seq2).val()=="" || $("#DIA1ATV___"+seq2)==null || $("#DIA1ATV___"+seq2)==undefined) && $("#D1___"+seq2).hasClass("diaSelecionado")){	
				        		
				        		console.log("dia 1 "+horasProgramadas)
				        		
				        		dataProgramada = $("#DIA1ATVREAL___"+seq2).val()
					            horasProgramadas = $("#DIA1ATV___"+seq2).val()
					        	
					            console.log("vou tentar programar "+dataProgramada)
					            
					            console.log("horasProgramadas.toString: "+horasProgramadas)
					            horasProgramadas = horasProgramadas.replace(",",'.')
					            console.log("horasProgramadas.replace: "+horasProgramadas)
					            horasProgramadas = parseFloat(horasProgramadas)
					            horasProgramadas = horasProgramadas.toFixed(2)
					            console.log("horasProgramadas.toFixed(2): "+horasProgramadas)
					            
					            // VERIFICA SE A ALOCAÇÃO ESTÁ DISPONÍVEL PARA SER ALOCADA DISPONIBILIDADE PROGRAMAÇÃO PODE SER REALIZADA
					            //if(verificaDispDiaAlocacao(codcoligada,idprj,idtrf,dataProgramada)){
					            if(verificaDispDiaAlocacao(codcoligada,codfilial,os,codOrdem,idprj,idtrf,dataProgramada)){
					
					            	console.log("Alocação pode ser feita")
					            	
					            	// VERIFICA SE JÁ TEM MOVIMENTO DE TRANSFERÊNCIA, SE NÃO TEM, GERA
					            	//movimentoTransferencia(os,codcoligada,codfilial,codOrdem,idAtvOrdem,codEstrutura)
					            	
					            	// EXECUTA A PROCEDURE DE INTEGRACAO
						            var retornoInt = execProcedure(codcoligada,codfilial,codOrdem,codAtividade,codmo,dataProgramada,horasProgramadas,planoCorte)
						            
						            if(retornoInt){
						            	
						            	// ATUALIZA OS DADOS DA ATIVIDADE PROGRAMADA
							            //atualizaProgAtv(codcoligada, codfilial, codOrdem, codAtividade, celula, codigoPrd, idprd, codPosto, codPrj, dataDe, dataAte, seq2)
					
							            console.log("integração foi realizada")
							            
							            // SALVA DADOS DA PROGRAMAÇÃO NA TABELA
							            var row = addProgramacaoSalva()
											
										$("#CODCOLIGADAPROG___"+row).val(codcoligada)
										$("#CODFILIALPROG___"+row).val(codfilial)
										$("#CODORDEMPROG___"+row).val(codOrdem)
										$("#CODATIVIDADEPROG___"+row).val(codAtividade)
										$("#CODPESSOAPROG___"+row).val(codmo)
										$("#DATAPROGRAMADAPROG___"+row).val(dataProgramada)
										$("#HORASPROGRAMADASPROG___"+row).val(horasProgramadas)
					 	
						            } else {
						            	// SE NÃO INTEGROU
						            	
						            	console.log("Alocação foi negada")
						            	
						            	// FORMATA DATA PROGRAMADA
						            	dataProgramada = formataDataPadrao(dataProgramada)
						            	
						            	// SALVA AS DATAS QUE FORAM NEGADAS
						            	progNegada.push(dataProgramada)
						            	
						            	// LIMPA E DESABILITA O CAMPO ALOCADO
						            	$("#DIA1ATV___"+seq2).val("")
						            	$("#DIA1ATV___"+seq2).prop("readonly",true)
					            	
						            }
						            
					           } else {
					            	// SE NÃO ESTÁ DISPONÍVEL
					            	
					            	console.log("Alocação foi negada")
					            	
					            	// FORMATA DATA PROGRAMADA
					            	dataProgramada = formataDataPadrao(dataProgramada)
					            	
					            	// SALVA AS DATAS QUE FORAM NEGADAS
					            	progNegada.push(dataProgramada)
					            	
					            	// LIMPA E DESABILITA O CAMPO ALOCADO
					            	$("#DIA1ATV___"+seq2).val("")
					            	$("#DIA1ATV___"+seq2).prop("readonly",true)
					            	
					            }
					            
					        }
					    	// SE DIA FOI PREENCHIDO E HABILITADO
					        if(!($("#DIA2ATV___"+seq2).val()=="" || $("#DIA2ATV___"+seq2).val()==null || $("#DIA2ATV___"+seq2).val()==undefined) && $("#D2___"+seq2).hasClass("diaSelecionado")){
					        	
					        	console.log("dia 1 "+horasProgramadas)
					        	
					        	dataProgramada = $("#DIA2ATVREAL___"+seq2).val()
					            horasProgramadas = $("#DIA2ATV___"+seq2).val()
					        	
					            console.log("vou tentar programar "+dataProgramada)
					            
					            console.log("horasProgramadas.toString: "+horasProgramadas)
					            horasProgramadas = horasProgramadas.replace(",",'.')
					            console.log("horasProgramadas.replace: "+horasProgramadas)
					            horasProgramadas = parseFloat(horasProgramadas)
					            horasProgramadas = horasProgramadas.toFixed(2)
					            console.log("horasProgramadas.toFixed(2): "+horasProgramadas)
					            
					            // VERIFICA SE A ALOCAÇÃO ESTÁ DISPONÍVEL PARA SER ALOCADA DISPONIBILIDADE PROGRAMAÇÃO PODE SER REALIZADA
					            //if(verificaDispDiaAlocacao(codcoligada,idprj,idtrf,dataProgramada)){
					            if(verificaDispDiaAlocacao(codcoligada,codfilial,os,codOrdem,idprj,idtrf,dataProgramada)){
					            	
					            	console.log("Alocação pode ser feita")
					            	
					            	// VERIFICA SE JÁ TEM MOVIMENTO DE TRANSFERÊNCIA, SE NÃO TEM, GERA
					            	//movimentoTransferencia(os,codcoligada,codfilial,codOrdem,idAtvOrdem,codEstrutura)
					            	
					            	 // EXECUTA A PROCEDURE DE INTEGRACAO
						            var retornoInt = execProcedure(codcoligada,codfilial,codOrdem,codAtividade,codmo,dataProgramada,horasProgramadas,planoCorte)
						            
						            // SE INTEGRAÇÃO FOI REALIZADA
						            if(retornoInt){
						            	
						            	console.log("integração foi realizada")
							            
							            // ATUALIZA OS DADOS DA ATIVIDADE PROGRAMADA
							            //atualizaProgAtv(codcoligada, codfilial, codOrdem, codAtividade, celula, codigoPrd, idprd, codPosto, codPrj, dataDe, dataAte, seq2)
					
							            // SALVA DADOS DA PROGRAMAÇÃO NA TABELA
							            var row = addProgramacaoSalva()
											
										$("#CODCOLIGADAPROG___"+row).val(codcoligada)
										$("#CODFILIALPROG___"+row).val(codfilial)
										$("#CODORDEMPROG___"+row).val(codOrdem)
										$("#CODATIVIDADEPROG___"+row).val(codAtividade)
										$("#CODPESSOAPROG___"+row).val(codmo)
										$("#DATAPROGRAMADAPROG___"+row).val(dataProgramada)
										$("#HORASPROGRAMADASPROG___"+row).val(horasProgramadas)
						            	
						            } else {
						            	// SE NÃO INTEGROU
						            	
						            	console.log("Alocação foi negada")
						            	
						            	// FORMATA DATA PROGRAMADA
						            	dataProgramada = formataDataPadrao(dataProgramada)
						            	
						            	// SALVA AS DATAS QUE FORAM NEGADAS
						            	progNegada.push(dataProgramada)
						            	
						            	// LIMPA E DESABILITA O CAMPO ALOCADO
						            	$("#DIA2ATV___"+seq2).val("")
						            	$("#DIA2ATV___"+seq2).prop("readonly",true)
						            	
						            }
						        
					            } else {
					            	// SE NÃO ESTÁ DISPONÍVEL
					            	
					            	console.log("Alocação foi negada")
					            	
					            	// FORMATA DATA PROGRAMADA
					            	dataProgramada = formataDataPadrao(dataProgramada)
					            	
					            	// SALVA AS DATAS QUE FORAM NEGADAS
					            	progNegada.push(dataProgramada)
					            	
					            	// LIMPA E DESABILITA O CAMPO ALOCADO
					            	$("#DIA2ATV___"+seq2).val("")
					            	$("#DIA2ATV___"+seq2).prop("readonly",true)
					            	
					            }
					           
					        }
					        // SE DIA FOI PREENCHIDO E HABILITADO
					        if(!($("#DIA3ATV___"+seq2).val()=="" || $("#DIA3ATV___"+seq2).val()==null || $("#DIA3ATV___"+seq2).val()==undefined) && $("#D3___"+seq2).hasClass("diaSelecionado")){
					        	
					        	console.log("dia 1 "+horasProgramadas)
					        	
					        	dataProgramada = $("#DIA3ATVREAL___"+seq2).val()
					            horasProgramadas = $("#DIA3ATV___"+seq2).val()
					        	
					            console.log("vou tentar programar "+dataProgramada)
					            
					            console.log("horasProgramadas.toString: "+horasProgramadas)
					            horasProgramadas = horasProgramadas.replace(",",'.')
					            console.log("horasProgramadas.replace: "+horasProgramadas)
					            horasProgramadas = parseFloat(horasProgramadas)
					            horasProgramadas = horasProgramadas.toFixed(2)
					            console.log("horasProgramadas.toFixed(2): "+horasProgramadas)
					            
					            // VERIFICA SE A ALOCAÇÃO ESTÁ DISPONÍVEL PARA SER ALOCADA DISPONIBILIDADE PROGRAMAÇÃO PODE SER REALIZADA
					            //if(verificaDispDiaAlocacao(codcoligada,idprj,idtrf,dataProgramada)){
					            if(verificaDispDiaAlocacao(codcoligada,codfilial,os,codOrdem,idprj,idtrf,dataProgramada)){
					            		
					            	console.log("Alocação pode ser feita")
					            	
					            	// VERIFICA SE JÁ TEM MOVIMENTO DE TRANSFERÊNCIA, SE NÃO TEM, GERA
					            	//movimentoTransferencia(os,codcoligada,codfilial,codOrdem,idAtvOrdem,codEstrutura)
					            	
					            	// EXECUTA A PROCEDURE DE INTEGRACAO
						            var retornoInt = execProcedure(codcoligada,codfilial,codOrdem,codAtividade,codmo,dataProgramada,horasProgramadas,planoCorte)
						            
						            // SE INTEGRAÇÃO FOI REALIZADA
						            if(retornoInt){
						            	
						            	console.log("integração foi realizada")
							            
							            // SALVA DADOS DA PROGRAMAÇÃO NA TABELA
							            var row = addProgramacaoSalva()
											
										$("#CODCOLIGADAPROG___"+row).val(codcoligada)
										$("#CODFILIALPROG___"+row).val(codfilial)
										$("#CODORDEMPROG___"+row).val(codOrdem)
										$("#CODATIVIDADEPROG___"+row).val(codAtividade)
										$("#CODPESSOAPROG___"+row).val(codmo)
										$("#DATAPROGRAMADAPROG___"+row).val(dataProgramada)
										$("#HORASPROGRAMADASPROG___"+row).val(horasProgramadas)
						            	
						            } else {
						            	// SE NÃO INTEGROU
						            	
						            	console.log("Alocação foi negada")
						            	
						            	// FORMATA DATA PROGRAMADA
						            	dataProgramada = formataDataPadrao(dataProgramada)
						            	
						            	// SALVA AS DATAS QUE FORAM NEGADAS
						            	progNegada.push(dataProgramada)
						            	
						            	// LIMPA E DESABILITA O CAMPO ALOCADO
						            	$("#DIA3ATV___"+seq2).val("")
						            	$("#DIA3ATV___"+seq2).prop("readonly",true)
						            	
						            }
					        	    	
					            } else {
					            	// SE NÃO ESTÁ DISPONÍVEL
					            	
					            	console.log("Alocação foi negada")
					            	
					            	// FORMATA DATA PROGRAMADA
					            	dataProgramada = formataDataPadrao(dataProgramada)
					            	
					            	// SALVA AS DATAS QUE FORAM NEGADAS
					            	progNegada.push(dataProgramada)
					            	
					            	// LIMPA E DESABILITA O CAMPO ALOCADO
					            	$("#DIA3ATV___"+seq2).val("")
					            	$("#DIA3ATV___"+seq2).prop("readonly",true)
					            	
					            }
					            
					        }
					        // SE DIA FOI PREENCHIDO E HABILITADO
					        if(!($("#DIA4ATV___"+seq2).val()=="" || $("#DIA4ATV___"+seq2).val()==null || $("#DIA4ATV___"+seq2).val()==undefined) && $("#D4___"+seq2).hasClass("diaSelecionado")){
					        	
					        	console.log("dia 1 "+horasProgramadas)
					        	
					        	dataProgramada = $("#DIA4ATVREAL___"+seq2).val()
					            horasProgramadas = $("#DIA4ATV___"+seq2).val()
					        	
					            console.log("vou tentar programar "+dataProgramada)
					            
					            console.log("horasProgramadas.toString: "+horasProgramadas)
					            horasProgramadas = horasProgramadas.replace(",",'.')
					            console.log("horasProgramadas.replace: "+horasProgramadas)
					            horasProgramadas = parseFloat(horasProgramadas)
					            horasProgramadas = horasProgramadas.toFixed(2)
					            console.log("horasProgramadas.toFixed(2): "+horasProgramadas)
					            
					            // VERIFICA SE A ALOCAÇÃO ESTÁ DISPONÍVEL PARA SER ALOCADA DISPONIBILIDADE PROGRAMAÇÃO PODE SER REALIZADA
					            //if(verificaDispDiaAlocacao(codcoligada,idprj,idtrf,dataProgramada)){
					            if(verificaDispDiaAlocacao(codcoligada,codfilial,os,codOrdem,idprj,idtrf,dataProgramada)){
					            	
					            	console.log("Alocação pode ser feita")
					            	
					            	// VERIFICA SE JÁ TEM MOVIMENTO DE TRANSFERÊNCIA, SE NÃO TEM, GERA
					            	//movimentoTransferencia(os,codcoligada,codfilial,codOrdem,idAtvOrdem,codEstrutura)
					            	
					            	// EXECUTA A PROCEDURE DE INTEGRACAO
						            var retornoInt = execProcedure(codcoligada,codfilial,codOrdem,codAtividade,codmo,dataProgramada,horasProgramadas,planoCorte)
						            
						            // SE INTEGRAÇÃO FOI REALIZADA
						            if(retornoInt){
						            	
							            console.log("integração foi realizada")
							            
							            // SALVA DADOS DA PROGRAMAÇÃO NA TABELA
							            var row = addProgramacaoSalva()
											
										$("#CODCOLIGADAPROG___"+row).val(codcoligada)
										$("#CODFILIALPROG___"+row).val(codfilial)
										$("#CODORDEMPROG___"+row).val(codOrdem)
										$("#CODATIVIDADEPROG___"+row).val(codAtividade)
										$("#CODPESSOAPROG___"+row).val(codmo)
										$("#DATAPROGRAMADAPROG___"+row).val(dataProgramada)
										$("#HORASPROGRAMADASPROG___"+row).val(horasProgramadas)

						            } else {
						            	// SE NÃO INTEGROU
						            	
						            	console.log("Alocação foi negada")
						            	
						            	// FORMATA DATA PROGRAMADA
						            	dataProgramada = formataDataPadrao(dataProgramada)
						            	
						            	// SALVA AS DATAS QUE FORAM NEGADAS
						            	progNegada.push(dataProgramada)
						            	
						            	// LIMPA E DESABILITA O CAMPO ALOCADO
						            	$("#DIA4ATV___"+seq2).val("")
						            	$("#DIA4ATV___"+seq2).prop("readonly",true)
						            	
						            }
						        	
					            } else {
					            	// SE NÃO ESTÁ DISPONÍVEL
					            	
					            	console.log("Alocação foi negada")
					            	
					            	// FORMATA DATA PROGRAMADA
					            	dataProgramada = formataDataPadrao(dataProgramada)
					            	
					            	// SALVA AS DATAS QUE FORAM NEGADAS
					            	progNegada.push(dataProgramada)
					            
					            	// LIMPA E DESABILITA O CAMPO ALOCADO
					            	$("#DIA4ATV___"+seq2).val("")
					            	$("#DIA4ATV___"+seq2).prop("readonly",true)
					            	
					            }
					        	    
					        }
					        // SE DIA FOI PREENCHIDO E HABILITADO
					        if(!($("#DIA5ATV___"+seq2).val()=="" || $("#DIA5ATV___"+seq2).val()==null || $("#DIA5ATV___"+seq2).val()==undefined) && $("#D5___"+seq2).hasClass("diaSelecionado")){
					        	
					        	console.log("dia 1 "+horasProgramadas)
					        	
					        	dataProgramada = $("#DIA5ATVREAL___"+seq2).val()
					            horasProgramadas = $("#DIA5ATV___"+seq2).val()
					        	
					            console.log("vou tentar programar "+dataProgramada)
					            
					            console.log("horasProgramadas.toString: "+horasProgramadas)
					            horasProgramadas = horasProgramadas.replace(",",'.')
					            console.log("horasProgramadas.replace: "+horasProgramadas)
					            horasProgramadas = parseFloat(horasProgramadas)
					            horasProgramadas = horasProgramadas.toFixed(2)
					            console.log("horasProgramadas.toFixed(2): "+horasProgramadas)
					            
					            // VERIFICA SE A ALOCAÇÃO ESTÁ DISPONÍVEL PARA SER ALOCADA DISPONIBILIDADE PROGRAMAÇÃO PODE SER REALIZADA
					            //if(verificaDispDiaAlocacao(codcoligada,idprj,idtrf,dataProgramada)){
					            if(verificaDispDiaAlocacao(codcoligada,codfilial,os,codOrdem,idprj,idtrf,dataProgramada)){
					            	
					            	console.log("Alocação pode ser feita")
					            	
					            	// VERIFICA SE JÁ TEM MOVIMENTO DE TRANSFERÊNCIA, SE NÃO TEM, GERA
					            	//movimentoTransferencia(os,codcoligada,codfilial,codOrdem,idAtvOrdem,codEstrutura)
					            	
					            	// EXECUTA A PROCEDURE DE INTEGRACAO
						            var retornoInt = execProcedure(codcoligada,codfilial,codOrdem,codAtividade,codmo,dataProgramada,horasProgramadas,planoCorte)
						            
						            // SE INTEGRAÇÃO FOI REALIZADA
						            if(retornoInt){
						            	
						            	console.log("integração foi realizada")
							            
							            // SALVA DADOS DA PROGRAMAÇÃO NA TABELA
							            var row = addProgramacaoSalva()
											
										$("#CODCOLIGADAPROG___"+row).val(codcoligada)
										$("#CODFILIALPROG___"+row).val(codfilial)
										$("#CODORDEMPROG___"+row).val(codOrdem)
										$("#CODATIVIDADEPROG___"+row).val(codAtividade)
										$("#CODPESSOAPROG___"+row).val(codmo)
										$("#DATAPROGRAMADAPROG___"+row).val(dataProgramada)
										$("#HORASPROGRAMADASPROG___"+row).val(horasProgramadas)
							        	
						            } else {
						            	// SE NÃO INTEGROU
						            	
						            	console.log("Alocação foi negada")
						            	
						            	// FORMATA DATA PROGRAMADA
						            	dataProgramada = formataDataPadrao(dataProgramada)
						            	
						            	// SALVA AS DATAS QUE FORAM NEGADAS
						            	progNegada.push(dataProgramada)
						            	
						            	// LIMPA E DESABILITA O CAMPO ALOCADO
						            	$("#DIA5ATV___"+seq2).val("")
						            	$("#DIA5ATV___"+seq2).prop("readonly",true)
						            	
						            }
						            
					            } else {
					            	// SE NÃO ESTÁ DISPONÍVEL
					            	
					            	console.log("Alocação foi negada")
					            	
					            	// FORMATA DATA PROGRAMADA
					            	dataProgramada = formataDataPadrao(dataProgramada)
					            	
					            	// SALVA AS DATAS QUE FORAM NEGADAS
					            	progNegada.push(dataProgramada)
					            	
					            	// LIMPA E DESABILITA O CAMPO ALOCADO
					            	$("#DIA5ATV___"+seq2).val("")
					            	$("#DIA5ATV___"+seq2).prop("readonly",true)
					            	
					            }
					                
					        }
					        // SE DIA FOI PREENCHIDO E HABILITADO
					        if(!($("#DIA6ATV___"+seq2).val()=="" || $("#DIA6ATV___"+seq2).val()==null || $("#DIA6ATV___"+seq2).val()==undefined) && $("#D6___"+seq2).hasClass("diaSelecionado")){
					        	
					        	console.log("dia 1 "+horasProgramadas)
					        	
					        	dataProgramada = $("#DIA6ATVREAL___"+seq2).val()
					            horasProgramadas = $("#DIA6ATV___"+seq2).val()
					        	
					            console.log("vou tentar programar "+dataProgramada)
					            
					            console.log("horasProgramadas.toString: "+horasProgramadas)
					            horasProgramadas = horasProgramadas.replace(",",'.')
					            console.log("horasProgramadas.replace: "+horasProgramadas)
					            horasProgramadas = parseFloat(horasProgramadas)
					            horasProgramadas = horasProgramadas.toFixed(2)
					            console.log("horasProgramadas.toFixed(2): "+horasProgramadas)
					            
					            // VERIFICA SE A ALOCAÇÃO ESTÁ DISPONÍVEL PARA SER ALOCADA DISPONIBILIDADE PROGRAMAÇÃO PODE SER REALIZADA
					            //if(verificaDispDiaAlocacao(codcoligada,idprj,idtrf,dataProgramada)){
					            if(verificaDispDiaAlocacao(codcoligada,codfilial,os,codOrdem,idprj,idtrf,dataProgramada)){
					            	
					            	console.log("Alocação pode ser feita")
					            	
					            	// VERIFICA SE JÁ TEM MOVIMENTO DE TRANSFERÊNCIA, SE NÃO TEM, GERA
					            	//movimentoTransferencia(os,codcoligada,codfilial,codOrdem,idAtvOrdem,codEstrutura)
					            	
						            // EXECUTA A PROCEDURE DE INTEGRACAO
						            var retornoInt = execProcedure(codcoligada,codfilial,codOrdem,codAtividade,codmo,dataProgramada,horasProgramadas,planoCorte)
						            
						            // SE INTEGRAÇÃO FOI REALIZADA
						            if(retornoInt){
						            	
						            	console.log("integração foi realizada")
							            
							            // SALVA DADOS DA PROGRAMAÇÃO NA TABELA
							            var row = addProgramacaoSalva()
											
										$("#CODCOLIGADAPROG___"+row).val(codcoligada)
										$("#CODFILIALPROG___"+row).val(codfilial)
										$("#CODORDEMPROG___"+row).val(codOrdem)
										$("#CODATIVIDADEPROG___"+row).val(codAtividade)
										$("#CODPESSOAPROG___"+row).val(codmo)
										$("#DATAPROGRAMADAPROG___"+row).val(dataProgramada)
										$("#HORASPROGRAMADASPROG___"+row).val(horasProgramadas)
						            	
						            }  else {
						            	// SE NÃO INTEGROU
						            	
						            	console.log("Alocação foi negada")
						            	
						            	// FORMATA DATA PROGRAMADA
						            	dataProgramada = formataDataPadrao(dataProgramada)
						            	
						            	// SALVA AS DATAS QUE FORAM NEGADAS
						            	progNegada.push(dataProgramada)
						            
						            	// LIMPA E DESABILITA O CAMPO ALOCADO
						            	$("#DIA6ATV___"+seq2).val("")
						            	$("#DIA6ATV___"+seq2).prop("readonly",true)
					            	
						            }
					        	
					            } else {
					            	// SE NÃO ESTÁ DISPONÍVEL
					            	
					            	console.log("Alocação foi negada")
					            	
					            	// FORMATA DATA PROGRAMADA
					            	dataProgramada = formataDataPadrao(dataProgramada)
					            	
					            	// SALVA AS DATAS QUE FORAM NEGADAS
					            	progNegada.push(dataProgramada)
					            	
					            	// LIMPA E DESABILITA O CAMPO ALOCADO
					            	$("#DIA6ATV___"+seq2).val("")
					            	$("#DIA6ATV___"+seq2).prop("readonly",true)
					            	
					            }
					                
					        }
					        // SE DIA FOI PREENCHIDO E HABILITADO
					        if(!($("#DIA7ATV___"+seq2).val()=="" || $("#DIA7ATV___"+seq2).val()==null || $("#DIA7ATV___"+seq2).val()==undefined) && $("#D7___"+seq2).hasClass("diaSelecionado")){
					        	
					        	console.log("dia 1 "+horasProgramadas)
					        	
					        	dataProgramada = $("#DIA7ATVREAL___"+seq2).val()
					            horasProgramadas = $("#DIA7ATV___"+seq2).val()
					        	
					            console.log("vou tentar programar "+dataProgramada)
					            
					            console.log("horasProgramadas.toString: "+horasProgramadas)
					            horasProgramadas = horasProgramadas.replace(",",'.')
					            console.log("horasProgramadas.replace: "+horasProgramadas)
					            horasProgramadas = parseFloat(horasProgramadas)
					            horasProgramadas = horasProgramadas.toFixed(2)
					            console.log("horasProgramadas.toFixed(2): "+horasProgramadas)
					            
					            // VERIFICA SE A ALOCAÇÃO ESTÁ DISPONÍVEL PARA SER ALOCADA DISPONIBILIDADE PROGRAMAÇÃO PODE SER REALIZADA
					            //if(verificaDispDiaAlocacao(codcoligada,idprj,idtrf,dataProgramada)){
					            if(verificaDispDiaAlocacao(codcoligada,codfilial,os,codOrdem,idprj,idtrf,dataProgramada)){
					            	
					            	console.log("Alocação pode ser feita")
					            	
					            	// VERIFICA SE JÁ TEM MOVIMENTO DE TRANSFERÊNCIA, SE NÃO TEM, GERA
					            	//movimentoTransferencia(os,codcoligada,codfilial,codOrdem,idAtvOrdem,codEstrutura)
					            	
					            	// EXECUTA A PROCEDURE DE INTEGRACAO
						            var retornoInt = execProcedure(codcoligada,codfilial,codOrdem,codAtividade,codmo,dataProgramada,horasProgramadas,planoCorte)
						            
						            // SE INTEGRAÇÃO FOI REALIZADA
						            if(retornoInt){
						            	
						            	console.log("integração foi realizada")
							            
							            // SALVA DADOS DA PROGRAMAÇÃO NA TABELA
							            var row = addProgramacaoSalva()
											
										$("#CODCOLIGADAPROG___"+row).val(codcoligada)
										$("#CODFILIALPROG___"+row).val(codfilial)
										$("#CODORDEMPROG___"+row).val(codOrdem)
										$("#CODATIVIDADEPROG___"+row).val(codAtividade)
										$("#CODPESSOAPROG___"+row).val(codmo)
										$("#DATAPROGRAMADAPROG___"+row).val(dataProgramada)
										$("#HORASPROGRAMADASPROG___"+row).val(horasProgramadas)
							        	
						            } else {
						            	// SE NÃO INTEGROU
						            	
						            	console.log("Alocação foi negada")
						            	
						            	// FORMATA DATA PROGRAMADA
						            	dataProgramada = formataDataPadrao(dataProgramada)
						            	
						            	// SALVA AS DATAS QUE FORAM NEGADAS
						            	progNegada.push(dataProgramada)
						            	
						            	// LIMPA E DESABILITA O CAMPO ALOCADO
						            	$("#DIA7ATV___"+seq2).val("")
						            	$("#DIA7ATV___"+seq2).prop("readonly",true)
					            	
						            }
					        	
					            } else {
					            	// SE NÃO ESTÁ DISPONÍVEL
					            	
					            	console.log("Alocação foi negada")
					            	
					            	// FORMATA DATA PROGRAMADA
					            	dataProgramada = formataDataPadrao(dataProgramada)
					            	
					            	// SALVA AS DATAS QUE FORAM NEGADAS
					            	progNegada.push(dataProgramada)
					            
					            	// LIMPA E DESABILITA O CAMPO ALOCADO
					            	$("#DIA7ATV___"+seq2).val("")
					            	$("#DIA7ATV___"+seq2).prop("readonly",true)
					            	
					            }
					                
					        }
					        // SE DIA FOI PREENCHIDO E HABILITADO
					        if(!($("#DIA8ATV___"+seq2).val()=="" || $("#DIA8ATV___"+seq2).val()==null || $("#DIA8ATV___"+seq2).val()==undefined) && $("#D8___"+seq2).hasClass("diaSelecionado")){
					        	
					        	console.log("dia 1 "+horasProgramadas)
					        	
					        	dataProgramada = $("#DIA8ATVREAL___"+seq2).val()
					            horasProgramadas = $("#DIA8ATV___"+seq2).val()
					        	
					            console.log("vou tentar programar "+dataProgramada)
					            
					            console.log("horasProgramadas.toString: "+horasProgramadas)
					            horasProgramadas = horasProgramadas.replace(",",'.')
					            console.log("horasProgramadas.replace: "+horasProgramadas)
					            horasProgramadas = parseFloat(horasProgramadas)
					            horasProgramadas = horasProgramadas.toFixed(2)
					            console.log("horasProgramadas.toFixed(2): "+horasProgramadas)
					            
					            // VERIFICA SE A ALOCAÇÃO ESTÁ DISPONÍVEL PARA SER ALOCADA DISPONIBILIDADE PROGRAMAÇÃO PODE SER REALIZADA
					            //if(verificaDispDiaAlocacao(codcoligada,idprj,idtrf,dataProgramada)){
					            if(verificaDispDiaAlocacao(codcoligada,codfilial,os,codOrdem,idprj,idtrf,dataProgramada)){
					            	
					            	console.log("Alocação pode ser feita")
					            	
					            	// VERIFICA SE JÁ TEM MOVIMENTO DE TRANSFERÊNCIA, SE NÃO TEM, GERA
					            	//movimentoTransferencia(os,codcoligada,codfilial,codOrdem,idAtvOrdem,codEstrutura)
					            	
					            	// EXECUTA A PROCEDURE DE INTEGRACAO
						            var retornoInt = execProcedure(codcoligada,codfilial,codOrdem,codAtividade,codmo,dataProgramada,horasProgramadas,planoCorte)
						            
						            // SE INTEGRAÇÃO FOI REALIZADA
						            if(retornoInt){
						            	
						            	console.log("integração foi realizada")
							            
							            // SALVA DADOS DA PROGRAMAÇÃO NA TABELA
							            var row = addProgramacaoSalva()
											
										$("#CODCOLIGADAPROG___"+row).val(codcoligada)
										$("#CODFILIALPROG___"+row).val(codfilial)
										$("#CODORDEMPROG___"+row).val(codOrdem)
										$("#CODATIVIDADEPROG___"+row).val(codAtividade)
										$("#CODPESSOAPROG___"+row).val(codmo)
										$("#DATAPROGRAMADAPROG___"+row).val(dataProgramada)
										$("#HORASPROGRAMADASPROG___"+row).val(horasProgramadas)
						            	
						            } else {
						            	// SE NÃO INTEGROU
						            	
						            	console.log("Alocação foi negada")
						            	
						            	// FORMATA DATA PROGRAMADA
						            	dataProgramada = formataDataPadrao(dataProgramada)
						            	
						            	// SALVA AS DATAS QUE FORAM NEGADAS
						            	progNegada.push(dataProgramada)
						            	
						            	// LIMPA E DESABILITA O CAMPO ALOCADO
						            	$("#DIA8ATV___"+seq2).val("")
						            	$("#DIA8ATV___"+seq2).prop("readonly",true)
						            	
						            }
					        	    
					            } else {
					            	// SE NÃO ESTÁ DISPONÍVEL
					            	
					            	console.log("Alocação foi negada")
					            	
					            	// FORMATA DATA PROGRAMADA
					            	dataProgramada = formataDataPadrao(dataProgramada)
					            	
					            	// SALVA AS DATAS QUE FORAM NEGADAS
					            	progNegada.push(dataProgramada)
					            	
					            	// LIMPA E DESABILITA O CAMPO ALOCADO
					            	$("#DIA8ATV___"+seq2).val("")
					            	$("#DIA8ATV___"+seq2).prop("readonly",true)
					            	
					            }
					            
					        }
					        // SE DIA FOI PREENCHIDO E HABILITADO
					        if(!($("#DIA9ATV___"+seq2).val()=="" || $("#DIA9ATV___"+seq2).val()==null || $("#DIA9ATV___"+seq2).val()==undefined) && $("#D9___"+seq2).hasClass("diaSelecionado")){
					        	
					        	console.log("dia 1 "+horasProgramadas)
					        	
					        	dataProgramada = $("#DIA9ATVREAL___"+seq2).val()
					            horasProgramadas = $("#DIA9ATV___"+seq2).val()
					        	
					            console.log("vou tentar programar "+dataProgramada)
					            
					            console.log("horasProgramadas.toString: "+horasProgramadas)
					            horasProgramadas = horasProgramadas.replace(",",'.')
					            console.log("horasProgramadas.replace: "+horasProgramadas)
					            horasProgramadas = parseFloat(horasProgramadas)
					            horasProgramadas = horasProgramadas.toFixed(2)
					            console.log("horasProgramadas.toFixed(2): "+horasProgramadas)
					            
					            // VERIFICA SE A ALOCAÇÃO ESTÁ DISPONÍVEL PARA SER ALOCADA DISPONIBILIDADE PROGRAMAÇÃO PODE SER REALIZADA
					            //if(verificaDispDiaAlocacao(codcoligada,idprj,idtrf,dataProgramada)){
					            if(verificaDispDiaAlocacao(codcoligada,codfilial,os,codOrdem,idprj,idtrf,dataProgramada)){
					            	
					            	console.log("Alocação pode ser feita")
					            	
					            	// VERIFICA SE JÁ TEM MOVIMENTO DE TRANSFERÊNCIA, SE NÃO TEM, GERA
					            	//movimentoTransferencia(os,codcoligada,codfilial,codOrdem,idAtvOrdem,codEstrutura)
					            	
					            	// EXECUTA A PROCEDURE DE INTEGRACAO
						            var retornoInt = execProcedure(codcoligada,codfilial,codOrdem,codAtividade,codmo,dataProgramada,horasProgramadas,planoCorte)
						            
						            // SE INTEGROU
						            if(retornoInt){
						            	
						            	console.log("integração foi realizada")
							            
							            // SALVA DADOS DA PROGRAMAÇÃO NA TABELA
							            var row = addProgramacaoSalva()
											
										$("#CODCOLIGADAPROG___"+row).val(codcoligada)
										$("#CODFILIALPROG___"+row).val(codfilial)
										$("#CODORDEMPROG___"+row).val(codOrdem)
										$("#CODATIVIDADEPROG___"+row).val(codAtividade)
										$("#CODPESSOAPROG___"+row).val(codmo)
										$("#DATAPROGRAMADAPROG___"+row).val(dataProgramada)
										$("#HORASPROGRAMADASPROG___"+row).val(horasProgramadas)
							        	
						            } else {
						            	// SE NÃO INTEGROU
						            	
						            	console.log("Alocação foi negada")
						            	
						            	// FORMATA DATA PROGRAMADA
						            	dataProgramada = formataDataPadrao(dataProgramada)
						            	
						            	// SALVA AS DATAS QUE FORAM NEGADAS
						            	progNegada.push(dataProgramada)
						            	
						            	// LIMPA E DESABILITA O CAMPO ALOCADO
						            	$("#DIA9ATV___"+seq2).val("")
						            	$("#DIA9ATV___"+seq2).prop("readonly",true)
					            	
						            }
						            
					           } else {
					            	// SE NÃO ESTÁ DISPONÍVEL
					            	
					            	console.log("Alocação foi negada")
					            	
					            	// FORMATA DATA PROGRAMADA
					            	dataProgramada = formataDataPadrao(dataProgramada)
					            	
					            	// SALVA AS DATAS QUE FORAM NEGADAS
					            	progNegada.push(dataProgramada)
					            	
					            	// LIMPA E DESABILITA O CAMPO ALOCADO
					            	$("#DIA9ATV___"+seq2).val("")
					            	$("#DIA9ATV___"+seq2).prop("readonly",true)
					            	
					            }
					        	    
					        }
					        
					        // SE DIA FOI PREENCHIDO E HABILITADO
					        if(!($("#DIA10ATV___"+seq2).val()=="" || $("#DIA10ATV___"+seq2).val()==null || $("#DIA10ATV___"+seq2).val()==undefined) && $("#D10___"+seq2).hasClass("diaSelecionado")){
					        	
					        	console.log("dia 1 "+horasProgramadas)
					        	
					        	dataProgramada = $("#DIA10ATVREAL___"+seq2).val()
					            horasProgramadas = $("#DIA10ATV___"+seq2).val()
					            
					        	console.log("vou tentar programar "+dataProgramada)
					            
					            console.log("horasProgramadas.toString: "+horasProgramadas)
					            horasProgramadas = horasProgramadas.replace(",",'.')
					            console.log("horasProgramadas.replace: "+horasProgramadas)
					            horasProgramadas = parseFloat(horasProgramadas)
					            horasProgramadas = horasProgramadas.toFixed(2)
					            console.log("horasProgramadas.toFixed(2): "+horasProgramadas)
					            
					            // VERIFICA SE A ALOCAÇÃO ESTÁ DISPONÍVEL PARA SER ALOCADA DISPONIBILIDADE PROGRAMAÇÃO PODE SER REALIZADA
					            //if(verificaDispDiaAlocacao(codcoligada,idprj,idtrf,dataProgramada)){
					            if(verificaDispDiaAlocacao(codcoligada,codfilial,os,codOrdem,idprj,idtrf,dataProgramada)){
					            		
					            	console.log("Alocação pode ser feita")
					            	
					            	// VERIFICA SE JÁ TEM MOVIMENTO DE TRANSFERÊNCIA, SE NÃO TEM, GERA
					            	//movimentoTransferencia(os,codcoligada,codfilial,codOrdem,idAtvOrdem,codEstrutura)
					            	
					            	// EXECUTA A PROCEDURE DE INTEGRACAO
						            var retornoInt = execProcedure(codcoligada,codfilial,codOrdem,codAtividade,codmo,dataProgramada,horasProgramadas,planoCorte)
						            
						            // SE INTEGROU
						            if(retornoInt){

							            console.log("integração foi realizada")
							            
							            // SALVA DADOS DA PROGRAMAÇÃO NA TABELA
							            var row = addProgramacaoSalva()
											
										$("#CODCOLIGADAPROG___"+row).val(codcoligada)
										$("#CODFILIALPROG___"+row).val(codfilial)
										$("#CODORDEMPROG___"+row).val(codOrdem)
										$("#CODATIVIDADEPROG___"+row).val(codAtividade)
										$("#CODPESSOAPROG___"+row).val(codmo)
										$("#DATAPROGRAMADAPROG___"+row).val(dataProgramada)
										$("#HORASPROGRAMADASPROG___"+row).val(horasProgramadas)
						            	
						            } else {
						            	// SE NÃO INTEGROU
						            	
						            	console.log("Alocação foi negada")
						            	
						            	// FORMATA DATA PROGRAMADA
						            	dataProgramada = formataDataPadrao(dataProgramada)
						            	
						            	// SALVA AS DATAS QUE FORAM NEGADAS
						            	progNegada.push(dataProgramada)
						            	
						            	// LIMPA E DESABILITA O CAMPO ALOCADO
						            	$("#DIA10ATV___"+seq2).val("")
						            	$("#DIA10ATV___"+seq2).prop("readonly",true)
					            	
						            }
					        	
					            } else {
					            	// SE NÃO ESTÁ DISPONÍVEL
					            	
					            	console.log("Alocação foi negada")
					            	
					            	// FORMATA DATA PROGRAMADA
					            	dataProgramada = formataDataPadrao(dataProgramada)
					            	
					            	// SALVA AS DATAS QUE FORAM NEGADAS
					            	progNegada.push(dataProgramada)
					            
					            	// LIMPA E DESABILITA O CAMPO ALOCADO
					            	$("#DIA10ATV___"+seq2).val("")
					            	$("#DIA10ATV___"+seq2).prop("readonly",true)
					            	
					            }
					        	
					        }
							
					        // ATUALIZA OS DADOS DA ATIVIDADE PROGRAMADA
				            atualizaProgAtv(codcoligada, codfilial, codOrdem, codAtividade, celula, codigoPrd, idprd, codPosto, codPrj, dataDe, dataAte, seq2)
					        
						}
						
				    })
					
				})
				
				// LIMPA OS RECURSOS SELECIONADOS
				$("#CODRECURSON3").val("")
				$("#CODCHAPARECURSON3").val("")
				$("#RECURSON3").val("")
				$("#GRUPORECURSON3>option").remove()
				//$(".GRUPORECURSON3").hide()
				
				// LIMPA TODOS OS RECURSOS SALVOS 
				limparTabelaRecursoN3()
				
				// ATUALIZA OS SALDOS ALOCADOS POR DIAS
	            atualizaSaldosDias(codcoligada,codfilial,codOrdem,idAtvOrdem,dataDe,dataAte,seq2)
				
				// LIMPA RAD
				limpaRAD()
				$(".RAD").hide()
				
				$("#PLANOCORTE>option").remove()
				$("#NUMPLANOCORTEREAL").val("")
				
				// VERIFICA SALDO ALOCAR
				//verificaSaldoAlocar()
				verificaStatusAtv()
				
				// LIMPA TODOS OS DADOS PROGRAMADOS E CARREGA NOVAMENTE
				//buscarPlanejamento()
				
			}, 500)
			
			// DESATIVA O LOAD
			setTimeout(function(){
			
				myLoading2.hide();
				
				// SE EXISTEM PROGRAMAÇÕES QUE FORAM NEGADAS
				if(progNegada.length>0){
					
					var negadas = ""
						
					console.log("Existem programações que foram negadas")
						
					// PERCORRE TODAS AS PROGRAMAÇÕES QUE FORAM NEGADAS
					for(var i=0; i<progNegada.length; i++){
						
						// SE É O ÚLTIMO ITEM 
						if(i+1==progNegada.length){
						
							negadas = negadas + progNegada[i]
							
						} else {
							// SE NÃO
							
							negadas = negadas + progNegada[i] + ", "
							
						}
						
					}
					
					// EXIBE ALERTA
					Swal.fire({
						  icon: 'warning',
						  title: 'Não foi possível alocar para os dias: '+negadas+'',
						  text: "Verifique se as OP's precedentes já foram programadas ou se a data que está tantando programar é menor do que a data programada das OP's precedentes"
					})
					
				} else {
					// SE NÃO
					
					// EXIBE ALERTA
					var Toast = Swal.mixin({
						  toast: true,
						  position: 'center',
						  showConfirmButton: false,
						  timer: 2000,
						  timerProgressBar: true,
					})
				
					Toast.fire({
						  icon: 'success',
						  title: 'Programação realizada com sucesso!'
					})
					
				}
			
			},500)
			
		} else {
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'warning',
				  title: 'Verifique se existem atividades selecionadas e se todas possuem ao menos uma alocação para programar!',
				  text: "Verifique e tente novamente"
			})
			
		}
				
	} else {
		// SE NÃO
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'warning',
			  title: 'É necessário informar os recursos para poder programar',
			  text: "Verifique e tente novamente"
		})
		
	}

}

// VERIFICA SE JÁ TEM MOVIMENTO DE TRANSFERÊNCIA, SE NÃO TEM, GERA
function movimentoTransferencia(numOS,codColigada,codFilial,codOrdem,idAtvOrdem,codEstrutura){
	
	console.log("vou verificar o movimento de transferência")
	
	console.log("codcoligada: "+codColigada+", codfilial: "+codFilial+", codOrdem: "+codOrdem+", idAtvOrdem: "+idAtvOrdem+", codEstrutura: "+codEstrutura)
	
	// SE MOVIMENTO DE TRANSFERÊNCIA AINDA NÃO FOI GERADO PARA A ATIVIDADE DA OP
	//if( !(temMovTransferencia(codColigada,codFilial,codOrdem,idAtvOrdem) ) ){
		
	console.log("vou criar o movimento de transferência")
	
	// CONSTRAINTS PARA BUSCAR OS COMPONENTES 
	var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
	var a4 = DatasetFactory.createConstraint("IDATVORDEM",idAtvOrdem,idAtvOrdem,ConstraintType.MUST)
	//var a5 = DatasetFactory.createConstraint("CODESTRUTURA",codEstrutura,codEstrutura,ConstraintType.MUST)

	var constraints = new Array(a1,a2,a3,a4)
	
	// CRIAR CONSULTA E DATASET
	var dataset = DatasetFactory.getDataset("dsComponentesAtvTransf",null,constraints,null)
	var row = dataset.values
	
	console.log("row")
	console.log(row)
				
	// SE RETORNO NÃO É NULO OU VAZIO
	if( !(row=="" || row==null || row==undefined) ){
		
		console.log("tem componentes para transferir")
		
		var NOME_DATASERVER = "MovMovimentoTBCData" 	  
		var usuario = "fluig"
		var usuarioAtual = $("#USUARIOATUAL").val()
		var senha = "zaq12wsxZAQ!@WSX" 
		//var authService = getWebService(usuario, senha) 
		var context = "CodUsuario=fluig;CodSistema=T;CodColigada="+codColigada
		//var nseq = 0
		var ret  = ""
		
		var count = row.length
		
		// PERCORRE TODOS OS REGISTROS DA TABELA DAS ATIVIDADES
		for (var i = 0; i < count; i++){
			
			var rep = row[i]
			
			var idprd = rep["IDPRD"]
			var codigoPrd = rep["CODIGOPRD"]
			//var qtde = rep["QTDE"]
			var qtde = rep["CONSUMO_PLANEJADO"]
			var precoUnit = rep["CUSTOMEDIO"]
			//var valorTotal = rep["VALORTOTAL"]
			var codloc = rep["CODLOC"]
			
			//qtde = parseFloat(rep["CONSUMO_PLANEJADO"]).toFixed(4)
			
			console.log("idprd: "+idprd+", qtde: "+qtde)
			
			// SE MOVIMENTO DE TRANSFERÊNCIA AINDA NÃO FOI GERADO PARA O COMPONENTE PARA A ATIVIDADE DA OP
			if( !(temMovTransferencia(codColigada,codFilial,codOrdem,idAtvOrdem,idprd) ) ){
	
				// SE QUANTIDADE DO CONSUMO PLANEJADO NÃO É NULO
				if( !( (qtde=="" || qtde==null || qtde==undefined || qtde=="null") && (precoUnit=="" || precoUnit==null || precoUnit==undefined || precoUnit=="null") ) ){
					
					// SE QTDE TEM PONTO
					if(qtde.indexOf(".")!=-1){
						
						qtde = qtde.replace(".",",")
						
					}
					
					// SE QTDE TEM PONTO
					if(precoUnit.indexOf(".")!=-1){
						
						precoUnit = precoUnit.replace(".",",")
						
					}
					
					// SE CODLOC É NULO OU VAZIO
					if(codloc=="" || codloc==null || codloc==undefined || codloc=="null"){
						
						codloc = "22"
						
					}
					
					console.log("idprd: "+idprd+", qtde: "+qtde)
					
					var codlocDestino = "23" 
					//var codloc = "22"
						
					var XML = "<MovMovimento >" +   
						"  <TMOV>" +   
						"	 <CODUSUARIO>" + usuario + "</CODUSUARIO>" +
						"    <CODCOLIGADA>" + codColigada + "</CODCOLIGADA>" +   
						"    <IDMOV>-1</IDMOV>" +   
						"    <CODFILIAL>" + codFilial + "</CODFILIAL>" +   
						"    <CODLOC>" + codloc + "</CODLOC>" +   
						"    <CODLOCENTREGA>" + codloc + "</CODLOCENTREGA>" +   
						"    <CODLOCDESTINO>" + codlocDestino + "</CODLOCDESTINO>" +   
						"    <CODTMV>1.1.05</CODTMV>" +   
						"    <TIPO>A</TIPO>" +   
						"    <DATAEMISSAO>" + dataAtualFormatada() + "</DATAEMISSAO>" +   
						"    <DATABASEMOV>" + dataAtualFormatada() + "</DATABASEMOV>" +   
						"    <DATAMOVIMENTO>" + dataAtualFormatada() + "</DATAMOVIMENTO>" +   
						"    <CODFILIALDESTINO>" + codFilial + "</CODFILIALDESTINO>" +   
						"    <DATALANCAMENTO>" + dataAtualFormatada() + "</DATALANCAMENTO>" +
						"	 <CODCCUSTO>" + numOS + "</CODCCUSTO>" +
						"	 <CAMPOLIVRE1>" + codOrdem + "</CAMPOLIVRE1>" +
						"	 <CAMPOLIVRE2>" + idAtvOrdem + "</CAMPOLIVRE2>" +
						"  </TMOV>" +
						"  <TNFE>" +   
						"    <CODCOLIGADA>" + codColigada + "</CODCOLIGADA>" +   
						"    <IDMOV>-1</IDMOV>" +   
						"  </TNFE>" +   
						"  <TMOVFISCAL>" +   
						"    <CODCOLIGADA>" + codColigada + "</CODCOLIGADA>" +   
						"    <IDMOV>-1</IDMOV>" +   
						"  </TMOVFISCAL>" 
				
					XML = XML +    
						"  <TITMMOV>" +   
						"    <CODCOLIGADA>" + codColigada + "</CODCOLIGADA>" +   
						"    <IDMOV>-1</IDMOV>" +   
						"    <NSEQITMMOV>" + (i+1) + "</NSEQITMMOV>" +   
						"    <CODFILIAL>" + codFilial + "</CODFILIAL>" +   
						"    <NUMEROSEQUENCIAL>" + (i+1) + "</NUMEROSEQUENCIAL>" +   
						"    <IDPRD>" + idprd + "</IDPRD>" +
						"    <QUANTIDADE>" + qtde + "</QUANTIDADE>" +   
						"    <PRECOUNITARIO>" + precoUnit + "</PRECOUNITARIO>" +   
						"    <DATAEMISSAO>" + dataAtualFormatada() + "</DATAEMISSAO>" +   
						"    <CODLOC>" + codloc + "</CODLOC>" +
						//"	 <VALORTOTALITEM>" + valorTotal + "</VALORTOTALITEM> "+
						"	 <CODCCUSTO>" + numOS + "</CODCCUSTO> "+
						"  </TITMMOV>"
						
					XML = XML +    
					   "  <TMOVCOMPL>" +   
					   "    <CODCOLIGADA>" + codColigada + "</CODCOLIGADA>" +      
					   "    <IDMOV>-1</IDMOV>" +   
					   //"    <NUMFLUIG>" + numProcess + "</NUMFLUIG>" +
					   "    <USERFLUIG>" + usuarioAtual + "</USERFLUIG>" +		   
					   "  </TMOVCOMPL>"+   
					   "</MovMovimento>"
							   
						console.log("Vou Gerar Movimento de Entrada de Sucata")
						console.log("Contexto do movimento: "+context)	
						
					    console.log("XML do movimnto é "+XML)
						
					    // RETORNA DADOS DOS CLIENTES A PARTIR DA DATA DE MONTAGEM FILTRADA
						var a1 = DatasetFactory.createConstraint("XML", XML, XML, ConstraintType.MUST);
						
						var constraint = new Array(a1);
						
						var dataset = DatasetFactory.getDataset("dsGeraMovTransferencia", null, constraint, null);
						
						var retorno = dataset
						
						console.log("retorno: ")
						console.log(retorno)
					
				}
				
			}
			
		}
		
	}
	
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
    
    console.log("data atual formatada: "+ano+"-"+mes+"-"+dia)
    
    return ano+"-"+mes+"-"+dia;
    
}

// VERIFICA SE MOVIMENTO DE TRANSFERÊNCIA AINDA NÃO FOI GERADO PARA A ATIVIDADE DA OP
function temMovTransferencia(codcoligada,codfilial,codOrdem,idAtvOrdem,idprd){
	
	console.log("vou verificar se já existe o movimento de transferência")
	
	console.log("codcoligada: "+codcoligada+", codfilial: "+codfilial+", codOrdem: "+codOrdem+", idAtvOrdem: "+idAtvOrdem+", idprd: "+idprd)
	
	var ret = false
	
	var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codcoligada,codcoligada,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("CODFILIAL",codfilial,codfilial,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
	var a4 = DatasetFactory.createConstraint("IDATVORDEM",idAtvOrdem,idAtvOrdem,ConstraintType.MUST)
	var a5 = DatasetFactory.createConstraint("IDPRD",idprd,idprd,ConstraintType.MUST)

	var constraints = new Array(a1,a2,a3,a4,a5)
	
	var dataset = DatasetFactory.getDataset("dsBuscaMovTransferencia",null,constraints,null)
	var row = dataset.values
	
	console.log("row")
	console.log(row)
	
	// SE RETORNO NÃO É NULO OU VAZIO
	if( !(row=="" || row==null || row==undefined) ){
		
		ret = true 
		
	}
	
	console.log("retorno: "+ret)
	
	return ret
	
}

// PREENCHE OS SALDOS ALOCADOS POR DIAS DA TABELA DE ALOCAÇÃO
function preencheSaldosAlocados(codcoligada,codfilial,codOrdem,idAtvOrdem,dataDe,dataAte,seq2){
	
	dataDe = dataDe.split(";")[0]
	
	console.log("vou preencher os saldos. codcoligada: "+codcoligada+", codfilial: "+codfilial+", codOrdem: "+codOrdem+", idAtvOrdem: "+idAtvOrdem+", dataDe: "+dataDe+", dataAte: "+dataAte)
	
	var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codcoligada,codcoligada,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("CODFILIAL",codfilial,codfilial,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
	var a4 = DatasetFactory.createConstraint("IDATVORDEM",idAtvOrdem,idAtvOrdem,ConstraintType.MUST)
	var a5 = DatasetFactory.createConstraint("DTHRINICIAL",dataDe,dataDe,ConstraintType.MUST)
	var a6 = DatasetFactory.createConstraint("DTHRFINAL",dataAte,dataAte,ConstraintType.MUST)

	var constraints = new Array(a1,a2,a3,a4,a5,a6)
	
	var dataset = DatasetFactory.getDataset("dsAtualizaDiasAlocadosOS",null,constraints,null)
	var row = dataset.values
	var count = dataset.values.length
	
	console.log("row")
	console.log(row)
	
	// SE RETORNO NÃO É NULO OU VAZIO
	if(!(row=="" || row==null || row=="null" || row==undefined)){
		
		// PERCORRE TODOS OS REGISTROS
		for(var i=0; i<count; i++){
			
			var rep = row[i]
			
			if($("#DIA1ATVREAL___"+seq2).val()==rep["DIA"]){
				
				var alocado = rep["ALOCADO"]
				alocado = parseFloat(alocado)
				alocado = alocado.toFixed(2).toString().replace(".",",")
				
				$("#DIA1ATV___"+seq2).val(alocado)
				//$("#DIA1RADALOC___"+seq2).val(alocado)
				$("#DIA1ATV___"+seq2).prop("readonly",true)
				
				var dia = rep["DIA"]
				dia = dia.split("-")
				dia = new Date(dia[0],dia[1]-1,dia[2],23,59).getTime()
				console.log("dia: "+dia)
				var hoje = new Date().getTime()
				
				console.log("hoje: "+hoje)
				
				// SE O APONTAMENTO ESTÁ ATRASADO
				if(hoje>dia){
				
					console.log("atv está atrasada")
					
					$("#LINHAPLAN___"+seq2).removeClass("alocado")
					$("#LINHAPLAN___"+seq2).removeClass("parcialApontada")
					$("#LINHAPLAN___"+seq2).removeClass("apontada")
					
					$("#LINHAPLAN___"+seq2).addClass("parcialApontada")
					
				}
				
				//$("#D1___"+seq2).removeClass("diaSelecionado")
				
			}
			
			if($("#DIA2ATVREAL___"+seq2).val()==rep["DIA"]){
				
				var alocado = rep["ALOCADO"]
				alocado = parseFloat(alocado)
				alocado = alocado.toFixed(2).toString().replace(".",",")
				
				$("#DIA2ATV___"+seq2).val(alocado)
				//$("#DIA2RADALOC___"+seq2).val(alocado)
				$("#DIA2ATV___"+seq2).prop("readonly",true)
				//$("#D2___"+seq2).removeClass("diaSelecionado")
				
				var dia = rep["DIA"]
				dia = dia.split("-")
				dia = new Date(dia[0],dia[1]-1,dia[2],23,59).getTime()
				console.log("dia: "+dia)
				var hoje = new Date().getTime()
				
				console.log("hoje: "+hoje)
				
				// SE O APONTAMENTO ESTÁ ATRASADO
				if(hoje>dia){
				
					console.log("atv está atrasada")
					
					$("#LINHAPLAN___"+seq2).removeClass("alocado")
					$("#LINHAPLAN___"+seq2).removeClass("parcialApontada")
					$("#LINHAPLAN___"+seq2).removeClass("apontada")
					
					$("#LINHAPLAN___"+seq2).addClass("parcialApontada")
					
				}
				
			}
			
			if($("#DIA3ATVREAL___"+seq2).val()==rep["DIA"]){
				
				var alocado = rep["ALOCADO"]
				alocado = parseFloat(alocado)
				alocado = alocado.toFixed(2).toString().replace(".",",")
				
				$("#DIA3ATV___"+seq2).val(alocado)
				//$("#DIA3RADALOC___"+seq2).val(alocado)
				$("#DIA3ATV___"+seq2).prop("readonly",true)
				//$("#D3___"+seq2).removeClass("diaSelecionado")
				
				var dia = rep["DIA"]
				dia = dia.split("-")
				dia = new Date(dia[0],dia[1]-1,dia[2],23,59).getTime()
				console.log("dia: "+dia)
				var hoje = new Date().getTime()
				
				console.log("hoje: "+hoje)
				
				// SE O APONTAMENTO ESTÁ ATRASADO
				if(hoje>dia){
				
					console.log("atv está atrasada")
					
					$("#LINHAPLAN___"+seq2).removeClass("alocado")
					$("#LINHAPLAN___"+seq2).removeClass("parcialApontada")
					$("#LINHAPLAN___"+seq2).removeClass("apontada")
					
					$("#LINHAPLAN___"+seq2).addClass("parcialApontada")
					
				}
				
			}
			
			if($("#DIA4ATVREAL___"+seq2).val()==rep["DIA"]){
				
				var alocado = rep["ALOCADO"]
				alocado = parseFloat(alocado)
				alocado = alocado.toFixed(2).toString().replace(".",",")
				
				$("#DIA4ATV___"+seq2).val(alocado)
				//$("#DIA4RADALOC___"+seq2).val(alocado)
				$("#DIA4ATV___"+seq2).prop("readonly",true)
				//$("#D4___"+seq2).removeClass("diaSelecionado")
				
				var dia = rep["DIA"]
				dia = dia.split("-")
				dia = new Date(dia[0],dia[1]-1,dia[2],23,59).getTime()
				console.log("dia: "+dia)
				var hoje = new Date().getTime()
				
				console.log("hoje: "+hoje)
				
				// SE O APONTAMENTO ESTÁ ATRASADO
				if(hoje>dia){
				
					console.log("atv está atrasada")
					
					$("#LINHAPLAN___"+seq2).removeClass("alocado")
					$("#LINHAPLAN___"+seq2).removeClass("parcialApontada")
					$("#LINHAPLAN___"+seq2).removeClass("apontada")
					
					$("#LINHAPLAN___"+seq2).addClass("parcialApontada")
					
				}
				
			}
			
			if($("#DIA5ATVREAL___"+seq2).val()==rep["DIA"]){
				
				var alocado = rep["ALOCADO"]
				alocado = parseFloat(alocado)
				alocado = alocado.toFixed(2).toString().replace(".",",")
				
				$("#DIA5ATV___"+seq2).val(alocado)
				//$("#DIA5RADALOC___"+seq2).val(alocado)
				$("#DIA5ATV___"+seq2).prop("readonly",true)
				//$("#D5___"+seq2).removeClass("diaSelecionado")
				
				var dia = rep["DIA"]
				dia = dia.split("-")
				dia = new Date(dia[0],dia[1]-1,dia[2],23,59).getTime()
				console.log("dia: "+dia)
				var hoje = new Date().getTime()
				
				console.log("hoje: "+hoje)
				
				// SE O APONTAMENTO ESTÁ ATRASADO
				if(hoje>dia){
				
					console.log("atv está atrasada")
					
					$("#LINHAPLAN___"+seq2).removeClass("alocado")
					$("#LINHAPLAN___"+seq2).removeClass("parcialApontada")
					$("#LINHAPLAN___"+seq2).removeClass("apontada")
					
					$("#LINHAPLAN___"+seq2).addClass("parcialApontada")
					
				}
				
			}
			
			if($("#DIA6ATVREAL___"+seq2).val()==rep["DIA"]){
				
				var alocado = rep["ALOCADO"]
				alocado = parseFloat(alocado)
				alocado = alocado.toFixed(2).toString().replace(".",",")
				
				$("#DIA6ATV___"+seq2).val(alocado)
				//$("#DIA6RADALOC___"+seq2).val(alocado)
				$("#DIA6ATV___"+seq2).prop("readonly",true)
				//$("#D6___"+seq2).removeClass("diaSelecionado")
				
				var dia = rep["DIA"]
				dia = dia.split("-")
				dia = new Date(dia[0],dia[1]-1,dia[2],23,59).getTime()
				console.log("dia: "+dia)
				var hoje = new Date().getTime()
				
				console.log("hoje: "+hoje)
				
				// SE O APONTAMENTO ESTÁ ATRASADO
				if(hoje>dia){
				
					console.log("atv está atrasada")
					
					$("#LINHAPLAN___"+seq2).removeClass("alocado")
					$("#LINHAPLAN___"+seq2).removeClass("parcialApontada")
					$("#LINHAPLAN___"+seq2).removeClass("apontada")
					
					$("#LINHAPLAN___"+seq2).addClass("parcialApontada")
					
				}
				
			}
			
			if($("#DIA7ATVREAL___"+seq2).val()==rep["DIA"]){
				
				var alocado = rep["ALOCADO"]
				alocado = parseFloat(alocado)
				alocado = alocado.toFixed(2).toString().replace(".",",")
				
				$("#DIA7ATV___"+seq2).val(alocado)
				//$("#DIA7RADALOC___"+seq2).val(alocado)
				$("#DIA7ATV___"+seq2).prop("readonly",true)
				//$("#D7___"+seq2).removeClass("diaSelecionado")
				
				var dia = rep["DIA"]
				dia = dia.split("-")
				dia = new Date(dia[0],dia[1]-1,dia[2],23,59).getTime()
				console.log("dia: "+dia)
				var hoje = new Date().getTime()
				
				console.log("hoje: "+hoje)
				
				// SE O APONTAMENTO ESTÁ ATRASADO
				if(hoje>dia){
				
					console.log("atv está atrasada")
					
					$("#LINHAPLAN___"+seq2).removeClass("alocado")
					$("#LINHAPLAN___"+seq2).removeClass("parcialApontada")
					$("#LINHAPLAN___"+seq2).removeClass("apontada")
					
					$("#LINHAPLAN___"+seq2).addClass("parcialApontada")
					
				}
				
			}
			
			if($("#DIA8ATVREAL___"+seq2).val()==rep["DIA"]){
				
				var alocado = rep["ALOCADO"]
				alocado = parseFloat(alocado)
				alocado = alocado.toFixed(2).toString().replace(".",",")
				
				$("#DIA8ATV___"+seq2).val(alocado)
				$("#DIA8RADALOC___"+seq2).val(alocado)
				$("#DIA8ATV___"+seq2).prop("readonly",true)
				//$("#D8___"+seq2).removeClass("diaSelecionado")
				
				var dia = rep["DIA"]
				dia = dia.split("-")
				dia = new Date(dia[0],dia[1]-1,dia[2],23,59).getTime()
				console.log("dia: "+dia)
				var hoje = new Date().getTime()
				
				console.log("hoje: "+hoje)
				
				// SE O APONTAMENTO ESTÁ ATRASADO
				if(hoje>dia){
				
					console.log("atv está atrasada")
					
					$("#LINHAPLAN___"+seq2).removeClass("alocado")
					$("#LINHAPLAN___"+seq2).removeClass("parcialApontada")
					$("#LINHAPLAN___"+seq2).removeClass("apontada")
					
					$("#LINHAPLAN___"+seq2).addClass("parcialApontada")
					
				}
				
			}
			
			if($("#DIA9ATVREAL___"+seq2).val()==rep["DIA"]){
				
				var alocado = rep["ALOCADO"]
				alocado = parseFloat(alocado)
				alocado = alocado.toFixed(2).toString().replace(".",",")
				
				$("#DIA9ATV___"+seq2).val(alocado)
				//$("#DIA9RADALOC___"+seq2).val(alocado)
				$("#DIA9ATV___"+seq2).prop("readonly",true)
				//$("#D9___"+seq2).removeClass("diaSelecionado")
				
				var dia = rep["DIA"]
				dia = dia.split("-")
				dia = new Date(dia[0],dia[1]-1,dia[2],23,59).getTime()
				console.log("dia: "+dia)
				var hoje = new Date().getTime()
				
				console.log("hoje: "+hoje)
				
				// SE O APONTAMENTO ESTÁ ATRASADO
				if(hoje>dia){
				
					console.log("atv está atrasada")
					
					$("#LINHAPLAN___"+seq2).removeClass("alocado")
					$("#LINHAPLAN___"+seq2).removeClass("parcialApontada")
					$("#LINHAPLAN___"+seq2).removeClass("apontada")
					
					$("#LINHAPLAN___"+seq2).addClass("parcialApontada")
					
				}
				
			}
			
			if($("#DIA10ATVREAL___"+seq2).val()==rep["DIA"]){
				
				var alocado = rep["ALOCADO"]
				alocado = parseFloat(alocado)
				alocado = alocado.toFixed(2).toString().replace(".",",")
				
				$("#DIA10ATV___"+seq2).val(alocado)
				//$("#DIA10RADALOC___"+seq2).val(alocado)
				$("#DIA10ATV___"+seq2).prop("readonly",true)
				//$("#D10___"+seq2).removeClass("diaSelecionado")
				
				var dia = rep["DIA"]
				dia = dia.split("-")
				dia = new Date(dia[0],dia[1]-1,dia[2],23,59).getTime()
				console.log("dia: "+dia)
				var hoje = new Date().getTime()
				
				console.log("hoje: "+hoje)
				
				// SE O APONTAMENTO ESTÁ ATRASADO
				if(hoje>dia){
				
					console.log("atv está atrasada")
					
					$("#LINHAPLAN___"+seq2).removeClass("alocado")
					$("#LINHAPLAN___"+seq2).removeClass("parcialApontada")
					$("#LINHAPLAN___"+seq2).removeClass("apontada")
					
					$("#LINHAPLAN___"+seq2).addClass("parcialApontada")
					
				}
				
			}
			
		}
	
	} else {
		// SE NÃO
		
		$("#DIA1ATV___"+seq2).val("")
		$("#DIA1ATV___"+seq2).prop("readonly",true)
		//$("#D1___"+seq2).removeClass("diaSelecionado")
		
		$("#DIA2ATV___"+seq2).val("")
		$("#DIA2ATV___"+seq2).prop("readonly",true)
		//$("#D2___"+seq2).removeClass("diaSelecionado")
		
		$("#DIA3ATV___"+seq2).val("")
		$("#DIA3ATV___"+seq2).prop("readonly",true)
		//$("#D3___"+seq2).removeClass("diaSelecionado")
		
		$("#DIA4ATV___"+seq2).val("")
		$("#DIA4ATV___"+seq2).prop("readonly",true)
		//$("#D4___"+seq2).removeClass("diaSelecionado")
		
		$("#DIA5ATV___"+seq2).val("")
		$("#DIA5ATV___"+seq2).prop("readonly",true)
		//$("#D5___"+seq2).removeClass("diaSelecionado")
		
		$("#DIA6ATV___"+seq2).val("")
		$("#DIA6ATV___"+seq2).prop("readonly",true)
		//$("#D6___"+seq2).removeClass("diaSelecionado")
		
		$("#DIA7ATV___"+seq2).val("")
		$("#DIA7ATV___"+seq2).prop("readonly",true)
		//$("#D7___"+seq2).removeClass("diaSelecionado")
		
		$("#DIA8ATV___"+seq2).val("")
		$("#DIA8ATV___"+seq2).prop("readonly",true)
		//$("#D8___"+seq2).removeClass("diaSelecionado")
		
		$("#DIA9ATV___"+seq2).val("")
		$("#DIA9ATV___"+seq2).prop("readonly",true)
		//$("#D9___"+seq2).removeClass("diaSelecionado")
		
		$("#DIA10ATV___"+seq2).val("")
		$("#DIA10ATV___"+seq2).prop("readonly",true)
		//$("#D10___"+seq2).removeClass("diaSelecionado")
	
	}
	
}

// ATUALIZA OS SALDOS ALOCADOS POR DIAS
function atualizaSaldosDiasLinha(codcoligada,codfilial,codOrdem,idAtvOrdem,dataDe,dataAte,seq2){
	
	console.log("vou atualizar os saldos. codcoligada: "+codcoligada+", codfilial: "+codfilial+", codOrdem: "+codOrdem+", idAtvOrdem: "+idAtvOrdem+", dataDe: "+dataDe+", dataAte: "+dataAte)
	
	var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codcoligada,codcoligada,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("CODFILIAL",codfilial,codfilial,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
	var a4 = DatasetFactory.createConstraint("IDATVORDEM",idAtvOrdem,idAtvOrdem,ConstraintType.MUST)
	var a5 = DatasetFactory.createConstraint("DTHRINICIAL",dataDe,dataDe,ConstraintType.MUST)
	var a6 = DatasetFactory.createConstraint("DTHRFINAL",dataAte,dataAte,ConstraintType.MUST)

	constraints = new Array(a1,a2,a3,a4,a5,a6)
	
	var dataset = DatasetFactory.getDataset("dsAtualizaDiasAlocadosOS",null,constraints,null)
	var row = dataset.values
	var count = dataset.values.length
	
	console.log("row")
	console.log(row)
	
	// SE RETORNO NÃO É NULO OU VAZIO
	if(!(row=="" || row==null || row=="null" || row==undefined)){
		
		// PERCORRE TODOS OS REGISTROS
		for(var i=0; i<count; i++){
			
			var rep = row[i]
			
			if($("#DIA1ATVREAL___"+seq2).val()==rep["DIA"]){
				
				var alocado = rep["ALOCADO"]
				alocado = parseFloat(alocado)
				alocado = alocado.toFixed(2).toString().replace(".",",")
				
				$("#DIA1ATV___"+seq2).val(alocado)
				//$("#DIA1RADALOC___"+seq2).val(alocado)
				$("#DIA1ATV___"+seq2).prop("readonly",true)
				$("#D1___"+seq2).removeClass("diaSelecionado")
				
			}
			
			if($("#DIA2ATVREAL___"+seq2).val()==rep["DIA"]){
				
				var alocado = rep["ALOCADO"]
				alocado = parseFloat(alocado)
				alocado = alocado.toFixed(2).toString().replace(".",",")
				
				$("#DIA2ATV___"+seq2).val(alocado)
				//$("#DIA2RADALOC___"+seq2).val(alocado)
				$("#DIA2ATV___"+seq2).prop("readonly",true)
				$("#D2___"+seq2).removeClass("diaSelecionado")
				
			}
			
			if($("#DIA3ATVREAL___"+seq2).val()==rep["DIA"]){
				
				var alocado = rep["ALOCADO"]
				alocado = parseFloat(alocado)
				alocado = alocado.toFixed(2).toString().replace(".",",")
				
				$("#DIA3ATV___"+seq2).val(alocado)
				//$("#DIA3RADALOC___"+seq2).val(alocado)
				$("#DIA3ATV___"+seq2).prop("readonly",true)
				$("#D3___"+seq2).removeClass("diaSelecionado")
				
			}
			
			if($("#DIA4ATVREAL___"+seq2).val()==rep["DIA"]){
				
				var alocado = rep["ALOCADO"]
				alocado = parseFloat(alocado)
				alocado = alocado.toFixed(2).toString().replace(".",",")
				
				$("#DIA4ATV___"+seq2).val(alocado)
				//$("#DIA4RADALOC___"+seq2).val(alocado)
				$("#DIA4ATV___"+seq2).prop("readonly",true)
				$("#D4___"+seq2).removeClass("diaSelecionado")
				
			}
			
			if($("#DIA5ATVREAL___"+seq2).val()==rep["DIA"]){
				
				var alocado = rep["ALOCADO"]
				alocado = parseFloat(alocado)
				alocado = alocado.toFixed(2).toString().replace(".",",")
				
				$("#DIA5ATV___"+seq2).val(alocado)
				//$("#DIA5RADALOC___"+seq2).val(alocado)
				$("#DIA5ATV___"+seq2).prop("readonly",true)
				$("#D5___"+seq2).removeClass("diaSelecionado")
				
			}
			
			if($("#DIA6ATVREAL___"+seq2).val()==rep["DIA"]){
				
				var alocado = rep["ALOCADO"]
				alocado = parseFloat(alocado)
				alocado = alocado.toFixed(2).toString().replace(".",",")
				
				$("#DIA6ATV___"+seq2).val(alocado)
				//$("#DIA6RADALOC___"+seq2).val(alocado)
				$("#DIA6ATV___"+seq2).prop("readonly",true)
				$("#D6___"+seq2).removeClass("diaSelecionado")
				
			} 
			
			if($("#DIA7ATVREAL___"+seq2).val()==rep["DIA"]){
				
				var alocado = rep["ALOCADO"]
				alocado = parseFloat(alocado)
				alocado = alocado.toFixed(2).toString().replace(".",",")
				
				$("#DIA7ATV___"+seq2).val(alocado)
				//$("#DIA7RADALOC___"+seq2).val(alocado)
				$("#DIA7ATV___"+seq2).prop("readonly",true)
				$("#D7___"+seq2).removeClass("diaSelecionado")
				
			} 
			
			if($("#DIA8ATVREAL___"+seq2).val()==rep["DIA"]){
				
				var alocado = rep["ALOCADO"]
				alocado = parseFloat(alocado)
				alocado = alocado.toFixed(2).toString().replace(".",",")
				
				$("#DIA8ATV___"+seq2).val(alocado)
				$("#DIA8RADALOC___"+seq2).val(alocado)
				$("#DIA8ATV___"+seq2).prop("readonly",true)
				$("#D8___"+seq2).removeClass("diaSelecionado")
				
			}
			
			if($("#DIA9ATVREAL___"+seq2).val()==rep["DIA"]){
				
				var alocado = rep["ALOCADO"]
				alocado = parseFloat(alocado)
				alocado = alocado.toFixed(2).toString().replace(".",",")
				
				$("#DIA9ATV___"+seq2).val(alocado)
				//$("#DIA9RADALOC___"+seq2).val(alocado)
				$("#DIA9ATV___"+seq2).prop("readonly",true)
				$("#D9___"+seq2).removeClass("diaSelecionado")
				
			} 
			
			if($("#DIA10ATVREAL___"+seq2).val()==rep["DIA"]){
				
				var alocado = rep["ALOCADO"]
				alocado = parseFloat(alocado)
				alocado = alocado.toFixed(2).toString().replace(".",",")
				
				$("#DIA10ATV___"+seq2).val(alocado)
				//$("#DIA10RADALOC___"+seq2).val(alocado)
				$("#DIA10ATV___"+seq2).prop("readonly",true)
				$("#D10___"+seq2).removeClass("diaSelecionado")
				
			}
			
		}
		
		// PERCORRE TODOS OS DIAS 
		for(var k=1;k<11;k++){
			
			var achei = false
			
			var dia = $("#DIA"+k+"ATVREAL___"+seq2).val()
			
			// PERCORRE OS DIAS ALOCADOS
			for(var h=0;h<count;h++){
				
				var rep = row[h]
				
				// SE ENCONTROU DIA ALOCADO 
				if(rep["DIA"]==dia){
					
					achei = true
					
				}
				
			}
			
			// SE NÃO ENCONTROU
			if(!achei){
				
				// LIMPA O CAMPO
				$("#DIA"+k+"ATV___"+seq2).val("")
				$("#DIA"+k+"ATV___"+seq2).prop("readonly",true)
				$("#D"+k+"___"+seq2).removeClass("diaSelecionado")
				
			}
			
		}
	
	} else {
		// SE NÃO
		
		$("#DIA1ATV___"+seq2).val("")
		$("#DIA1ATV___"+seq2).prop("readonly",true)
		$("#D1___"+seq2).removeClass("diaSelecionado")
		
		$("#DIA2ATV___"+seq2).val("")
		$("#DIA2ATV___"+seq2).prop("readonly",true)
		$("#D2___"+seq2).removeClass("diaSelecionado")
		
		$("#DIA3ATV___"+seq2).val("")
		$("#DIA3ATV___"+seq2).prop("readonly",true)
		$("#D3___"+seq2).removeClass("diaSelecionado")
		
		$("#DIA4ATV___"+seq2).val("")
		$("#DIA4ATV___"+seq2).prop("readonly",true)
		$("#D4___"+seq2).removeClass("diaSelecionado")
		
		$("#DIA5ATV___"+seq2).val("")
		$("#DIA5ATV___"+seq2).prop("readonly",true)
		$("#D5___"+seq2).removeClass("diaSelecionado")
		
		$("#DIA6ATV___"+seq2).val("")
		$("#DIA6ATV___"+seq2).prop("readonly",true)
		$("#D6___"+seq2).removeClass("diaSelecionado")
		
		$("#DIA7ATV___"+seq2).val("")
		$("#DIA7ATV___"+seq2).prop("readonly",true)
		$("#D7___"+seq2).removeClass("diaSelecionado")
		
		$("#DIA8ATV___"+seq2).val("")
		$("#DIA8ATV___"+seq2).prop("readonly",true)
		$("#D8___"+seq2).removeClass("diaSelecionado")
		
		$("#DIA9ATV___"+seq2).val("")
		$("#DIA9ATV___"+seq2).prop("readonly",true)
		$("#D9___"+seq2).removeClass("diaSelecionado")
		
		$("#DIA10ATV___"+seq2).val("")
		$("#DIA10ATV___"+seq2).prop("readonly",true)
		$("#D10___"+seq2).removeClass("diaSelecionado")
	
	}
		
}

// ATUALIZA OS SALDOS ALOCADOS POR DIAS
function atualizaSaldosDias(){
//function atualizaSaldosDias(codcoligada,codfilial,codOrdem,idAtvOrdem,dataDe,dataAte,seq2){
	
	// PERCORRE TODAS AS LINHAS DAS ATIVIDADES
	$("input[id^='OPATV___']").each(function(){
		
		var seq2 = $(this).attr("id").split("___")[1]
		
		// SE ATIVIDADE ESTÁ SELECIONADA
		if($("#PROGRAMANDO___"+seq2).is(":checked")){
			
			var codcoligada = $("#CODCOLIGADA___"+seq2).val()
			var codfilial = $("#CODFILIAL___"+seq2).val()
			var codOrdem = $("#OPATV___"+seq2).val()
			var idAtvOrdem = $("#IDATIVIDADEATV___"+seq2).val()
			var dataDe = $("#DATADE_PROG").val()
		    var dataAte = $("#DATAATE_PROG").val()
		    dataDe = formataDataBanco(dataDe)
		    dataAte = formataDataBanco(dataAte)
			
			console.log("vou atualizar os saldos. codcoligada: "+codcoligada+", codfilial: "+codfilial+", codOrdem: "+codOrdem+", idAtvOrdem: "+idAtvOrdem+", dataDe: "+dataDe+", dataAte: "+dataAte)
			
			var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codcoligada,codcoligada,ConstraintType.MUST)
			var a2 = DatasetFactory.createConstraint("CODFILIAL",codfilial,codfilial,ConstraintType.MUST)
			var a3 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
			var a4 = DatasetFactory.createConstraint("IDATVORDEM",idAtvOrdem,idAtvOrdem,ConstraintType.MUST)
			var a5 = DatasetFactory.createConstraint("DTHRINICIAL",dataDe,dataDe,ConstraintType.MUST)
			var a6 = DatasetFactory.createConstraint("DTHRFINAL",dataAte,dataAte,ConstraintType.MUST)

			var constraints = new Array(a1,a2,a3,a4,a5,a6)
			
			var dataset = DatasetFactory.getDataset("dsAtualizaDiasAlocadosOS",null,constraints,null)
			var row = dataset.values
			
			console.log("row")
			console.log(row)
			
			// SE RETORNO NÃO É NULO OU VAZIO
			if(!(row=="" || row==null || row=="null" || row==undefined)){
				
				var count = dataset.values.length

				// PERCORRE TODOS OS REGISTROS
				for(var i=0; i<count; i++){
					
					var rep = row[i]
					
					if($("#DIA1ATVREAL___"+seq2).val()==rep["DIA"]){
						
						var alocado = rep["ALOCADO"]
						alocado = parseFloat(alocado)
						alocado = alocado.toFixed(2).toString().replace(".",",")
						
						$("#DIA1ATV___"+seq2).val(alocado)
						//$("#DIA1RADALOC___"+seq2).val(alocado)
						$("#DIA1ATV___"+seq2).prop("readonly",true)
						$("#D1___"+seq2).removeClass("diaSelecionado")
						
					}
					
					if($("#DIA2ATVREAL___"+seq2).val()==rep["DIA"]){
						
						var alocado = rep["ALOCADO"]
						alocado = parseFloat(alocado)
						alocado = alocado.toFixed(2).toString().replace(".",",")
						
						$("#DIA2ATV___"+seq2).val(alocado)
						//$("#DIA2RADALOC___"+seq2).val(alocado)
						$("#DIA2ATV___"+seq2).prop("readonly",true)
						$("#D2___"+seq2).removeClass("diaSelecionado")
						
					}
					
					if($("#DIA3ATVREAL___"+seq2).val()==rep["DIA"]){
						
						var alocado = rep["ALOCADO"]
						alocado = parseFloat(alocado)
						alocado = alocado.toFixed(2).toString().replace(".",",")
						
						$("#DIA3ATV___"+seq2).val(alocado)
						//$("#DIA3RADALOC___"+seq2).val(alocado)
						$("#DIA3ATV___"+seq2).prop("readonly",true)
						$("#D3___"+seq2).removeClass("diaSelecionado")
						
					}
					
					if($("#DIA4ATVREAL___"+seq2).val()==rep["DIA"]){
						
						var alocado = rep["ALOCADO"]
						alocado = parseFloat(alocado)
						alocado = alocado.toFixed(2).toString().replace(".",",")
						
						$("#DIA4ATV___"+seq2).val(alocado)
						//$("#DIA4RADALOC___"+seq2).val(alocado)
						$("#DIA4ATV___"+seq2).prop("readonly",true)
						$("#D4___"+seq2).removeClass("diaSelecionado")
						
					}
					
					if($("#DIA5ATVREAL___"+seq2).val()==rep["DIA"]){
						
						var alocado = rep["ALOCADO"]
						alocado = parseFloat(alocado)
						alocado = alocado.toFixed(2).toString().replace(".",",")
						
						$("#DIA5ATV___"+seq2).val(alocado)
						//$("#DIA5RADALOC___"+seq2).val(alocado)
						$("#DIA5ATV___"+seq2).prop("readonly",true)
						$("#D5___"+seq2).removeClass("diaSelecionado")
						
					}
					
					if($("#DIA6ATVREAL___"+seq2).val()==rep["DIA"]){
						
						var alocado = rep["ALOCADO"]
						alocado = parseFloat(alocado)
						alocado = alocado.toFixed(2).toString().replace(".",",")
						
						$("#DIA6ATV___"+seq2).val(alocado)
						//$("#DIA6RADALOC___"+seq2).val(alocado)
						$("#DIA6ATV___"+seq2).prop("readonly",true)
						$("#D6___"+seq2).removeClass("diaSelecionado")
						
					} 
					
					if($("#DIA7ATVREAL___"+seq2).val()==rep["DIA"]){
						
						var alocado = rep["ALOCADO"]
						alocado = parseFloat(alocado)
						alocado = alocado.toFixed(2).toString().replace(".",",")
						
						$("#DIA7ATV___"+seq2).val(alocado)
						//$("#DIA7RADALOC___"+seq2).val(alocado)
						$("#DIA7ATV___"+seq2).prop("readonly",true)
						$("#D7___"+seq2).removeClass("diaSelecionado")
						
					} 
					
					if($("#DIA8ATVREAL___"+seq2).val()==rep["DIA"]){
						
						var alocado = rep["ALOCADO"]
						alocado = parseFloat(alocado)
						alocado = alocado.toFixed(2).toString().replace(".",",")
						
						$("#DIA8ATV___"+seq2).val(alocado)
						$("#DIA8RADALOC___"+seq2).val(alocado)
						$("#DIA8ATV___"+seq2).prop("readonly",true)
						$("#D8___"+seq2).removeClass("diaSelecionado")
						
					}
					
					if($("#DIA9ATVREAL___"+seq2).val()==rep["DIA"]){
						
						var alocado = rep["ALOCADO"]
						alocado = parseFloat(alocado)
						alocado = alocado.toFixed(2).toString().replace(".",",")
						
						$("#DIA9ATV___"+seq2).val(alocado)
						//$("#DIA9RADALOC___"+seq2).val(alocado)
						$("#DIA9ATV___"+seq2).prop("readonly",true)
						$("#D9___"+seq2).removeClass("diaSelecionado")
						
					} 
					
					if($("#DIA10ATVREAL___"+seq2).val()==rep["DIA"]){
						
						var alocado = rep["ALOCADO"]
						alocado = parseFloat(alocado)
						alocado = alocado.toFixed(2).toString().replace(".",",")
						
						$("#DIA10ATV___"+seq2).val(alocado)
						//$("#DIA10RADALOC___"+seq2).val(alocado)
						$("#DIA10ATV___"+seq2).prop("readonly",true)
						$("#D10___"+seq2).removeClass("diaSelecionado")
						
					}
					
				}
				
				// PERCORRE TODOS OS DIAS 
				for(var k=1;k<11;k++){
					
					var achei = false
					
					var dia = $("#DIA"+k+"ATVREAL___"+seq2).val()
					
					// PERCORRE OS DIAS ALOCADOS
					for(var h=0;h<count;h++){
						
						var rep = row[h]
						
						// SE ENCONTROU DIA ALOCADO 
						if(rep["DIA"]==dia){
							
							achei = true
							
						}
						
					}
					
					// SE NÃO ENCONTROU
					if(!achei){
						
						// LIMPA O CAMPO
						$("#DIA"+k+"ATV___"+seq2).val("")
						$("#DIA"+k+"ATV___"+seq2).prop("readonly",true)
						$("#D"+k+"___"+seq2).removeClass("diaSelecionado")
						
					}
					
				}
				
			} else {
				// SE NÃO
				
				$("#DIA1ATV___"+seq2).val("")
				$("#DIA1ATV___"+seq2).prop("readonly",true)
				$("#D1___"+seq2).removeClass("diaSelecionado")
				
				$("#DIA2ATV___"+seq2).val("")
				$("#DIA2ATV___"+seq2).prop("readonly",true)
				$("#D2___"+seq2).removeClass("diaSelecionado")
				
				$("#DIA3ATV___"+seq2).val("")
				$("#DIA3ATV___"+seq2).prop("readonly",true)
				$("#D3___"+seq2).removeClass("diaSelecionado")
				
				$("#DIA4ATV___"+seq2).val("")
				$("#DIA4ATV___"+seq2).prop("readonly",true)
				$("#D4___"+seq2).removeClass("diaSelecionado")
				
				$("#DIA5ATV___"+seq2).val("")
				$("#DIA5ATV___"+seq2).prop("readonly",true)
				$("#D5___"+seq2).removeClass("diaSelecionado")
				
				$("#DIA6ATV___"+seq2).val("")
				$("#DIA6ATV___"+seq2).prop("readonly",true)
				$("#D6___"+seq2).removeClass("diaSelecionado")
				
				$("#DIA7ATV___"+seq2).val("")
				$("#DIA7ATV___"+seq2).prop("readonly",true)
				$("#D7___"+seq2).removeClass("diaSelecionado")
				
				$("#DIA8ATV___"+seq2).val("")
				$("#DIA8ATV___"+seq2).prop("readonly",true)
				$("#D8___"+seq2).removeClass("diaSelecionado")
				
				$("#DIA9ATV___"+seq2).val("")
				$("#DIA9ATV___"+seq2).prop("readonly",true)
				$("#D9___"+seq2).removeClass("diaSelecionado")
				
				$("#DIA10ATV___"+seq2).val("")
				$("#DIA10ATV___"+seq2).prop("readonly",true)
				$("#D10___"+seq2).removeClass("diaSelecionado")
			
			}
				
		}
			
	})
		
}

function atualizaSaldosAlocado(chapa){

	var myLoading2 =  FLUIGC.loading(window)

	myLoading2.show()

	setTimeout(function(){

		$("input[id^='CHAPARAD___']").each(function(){

			var codmo = $(this).val()
			var seq = $(this).attr("id").split("___")[1]

			console.log("Chapa para atualizar: "+ codmo)

			if(codmo==chapa){

				var dataDe = $("#DATADE_PROG").val()
				var dataAte = $("#DATAATE_PROG").val()
				dataDe = formataDataBanco(dataDe)
				dataAte = formataDataBanco(dataAte)
				
				//console.log("vou atualizar os saldos. codcoligada: "+codcoligada+", codfilial: "+codfilial+", codOrdem: "+codOrdem+", idAtvOrdem: "+idAtvOrdem+", dataDe: "+dataDe+", dataAte: "+dataAte)
				
				var a1 = DatasetFactory.createConstraint("CODMO",chapa,chapa,ConstraintType.MUST)
				var a2 = DatasetFactory.createConstraint("DATA_DE",dataDe,dataDe,ConstraintType.MUST)
				var a3 = DatasetFactory.createConstraint("DATA_ATE",dataAte,dataAte,ConstraintType.MUST)

				var constraints = new Array(a1,a2,a3)
				
				var dataset = DatasetFactory.getDataset("dsSomaAlocadoData",null,constraints,null)
				var row = dataset.values
				
				console.log("row")
				console.log(row)

				if(row.length > 0){

					for (var i = 0; i < row.length; i++) {

						var rep = row[i]
						
						var data = rep["DATA"]

						for(var j = 1; j < 11; j++){

							if(data==$("#DIA"+j+"RADREAL___"+seq).val()){

								$("#DIA"+j+"RADALOC___"+seq).val(rep["TOTAL"])

							}

						}
						
					}

				}

			}

		})

		myLoading2.hide()
	},500)

}

function verificaAvanco(obj){
	
	console.log("verifica se o avanço informado é válido")
	
	var avanco = $(obj).val()
	
	console.log("avanco: "+avanco)
	
	// SE O AVANÇO É UM DECIMAL
	if(avanco.includes(",") || avanco.includes(".")){
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'O avanço não pode ser um valor decimal',
			  text: 'Verifique e tente novamente'
		})
		
		// LIMPA O CAMPO
		$(obj).val("")
		
	}else{
		// SE NÃO
		
		console.log("type avanco "+typeof(avanco))
		
		// SE É UM VALOR NÃO NUMÉRICO
		if(isNaN(avanco)){
			
			console.log("é um NaN")
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'O avanço informado não é um valor válido',
				  text: 'Verifique e tente novamente'
			})
			
			// LIMPA O CAMPO
			$(obj).val("")
			
		} else {
			// SE NÃO
			
			console.log("é um valor válido")
			
			avanco = parseInt(avanco)
			
			// SE AVANÇO É MENOR QUE 0 OU MAIOR QUE 100
			if(avanco<0 || avanco>100){
				
				// EXIBE ALERTA
				Swal.fire({
					  icon: 'error',
					  title: 'O valor do avanço não pode ser menor que 0 e maior que 100',
					  text: 'Verifique e tente novamente'
				})
				
				// LIMPA O CAMPO
				$(obj).val("")
				
			} else {
				
				if(avanco.toString().includes("-")){
					
					avanco = avanco.toString().replace("-","")
					
				}
				
				$(obj).val(avanco)
				
			}
			
		}
		
	}
	
}

// ATUALIZA OS DADOS DA ATIVIDADE PROGRAMADA
function atualizaProgAtv(codcoligada, codfilial, codOrdem, codAtividade, celula, codigoPrd, idPrd, codPosto, codPrj, dataDe, dataAte, seq2){
	
	console.log("vou atualizar os dados da atividade que foi alocada")
	console.log("codcoligada: "+codcoligada+", codfilial: "+codfilial+", codOrdem: "+codOrdem+", codAtividade: "+codAtividade+", celula: "+celula+", codigoPrd: "+codigoPrd+", idPrd: "+idPrd+", codPosto: "+codPosto+", codPrj: "+codPrj+", dataDe: "+dataDe+", dataAte: "+dataAte+", seq2: "+seq2)
	
	//var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codcoligada,codcoligada,ConstraintType.MUST)
	//var a2 = DatasetFactory.createConstraint("CODFILIAL",codfilial,codfilial,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("FILIAL",codfilial,codfilial,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
	var a4 = DatasetFactory.createConstraint("CODATIVIDADE",codAtividade,codAtividade,ConstraintType.MUST)
	var a5 = DatasetFactory.createConstraint("CELULA",celula,celula,ConstraintType.MUST)
	var a6 = DatasetFactory.createConstraint("CODIGOPRD",codigoPrd,codigoPrd,ConstraintType.MUST)
	var a7 = DatasetFactory.createConstraint("IDPRD",idPrd,idPrd,ConstraintType.MUST)
	//var a8 = DatasetFactory.createConstraint("CODPOSTO",codPosto,codPosto,ConstraintType.MUST)
	var a9 = DatasetFactory.createConstraint("CODPRJ",codPrj,codPrj,ConstraintType.MUST)
	var a10 = DatasetFactory.createConstraint("DATA_DE",dataDe,dataDe,ConstraintType.MUST)
	var a11 = DatasetFactory.createConstraint("DATA_ATE",dataAte,dataAte,ConstraintType.MUST)
	
	var constraints = new Array(a2,a3,a4,a5,a6,a7,a9,a10,a11)
	
	//var dataset = DatasetFactory.getDataset("dsAtualizaDadosAtvOS",null,constraints,null)
	var dataset = DatasetFactory.getDataset("dsPlanejamentoGeralOS",null,constraints,null)
	
	var row = dataset.values
	console.log("row")
	console.log(row)
	
	// SE RETORNO NÃO É NULO OU VAZIO
	if(!(row=="" || row==null || row=="null" || row==undefined)){
	
		var rep = row[0]
		var saldoAlocado = 0
		var apontado = 0
		var cargaPrev = 0
		var saldoAlocar = 0
		
		if(!(rep["ALOCADO"]=="" || rep["ALOCADO"]==null || rep["ALOCADO"]==undefined || rep["ALOCADO"]=="null")){
			
			saldoAlocado = parseFloat(rep["ALOCADO"]).toFixed(2)
			
		}
		if(!(rep["APONTADO"]=="" || rep["APONTADO"]==null || rep["APONTADO"]==undefined || rep["APONTADO"]=="null")){
		
			apontado = rep["APONTADO"]
			
			apontado = parseFloat(apontado).toFixed(2)
			saldoAlocado = parseFloat(saldoAlocado).toFixed(2)
			
			saldoAlocado = saldoAlocado - apontado
			
		}
		if(!(rep["CARGA_PREV"]=="" || rep["CARGA_PREV"]==null || rep["CARGA_PREV"]==undefined || rep["CARGA_PREV"]=="null")){
			
			cargaPrev = rep["CARGA_PREV"]/60
			cargaPrev = cargaPrev.toFixed(2)
			
		}
		
		var saldoRevisado = 0
		//var avanco = 0
		var avanco = rep["AVANCO_REALIZADO"]
		
		//var dscStatus = rep["DSCSTATUS"]
		var dscStatus = rep["STATUS_OP"]
		var statusAtv = rep["STATUS_ATV"]
		var codStatus = rep["STATUS"]
		
		console.log("saldoAlocado: "+saldoAlocado)
		console.log("apontado: "+apontado)
		console.log("cargaPrev: "+cargaPrev)
		console.log("dscStatus: "+dscStatus)
		console.log("avanco: "+avanco)
		console.log("statusAtv: "+statusAtv)
		console.log("saldoRevisado: "+saldoRevisado)
		
		// SE NADA FOI APONTADO
		if(apontado==0){
			
			saldoRevisado = 0
			
		} else {
			// SE NÃO
			
			saldoRevisado = cargaPrev - apontado
			
		}
		
		// SE SALDO REVISADO É 0
		if(saldoRevisado==0){
			
			saldoAlocar = cargaPrev - saldoAlocado
			
		} else {
			// SE NÃO
			
			saldoAlocar = saldoRevisado - saldoAlocado
			
		}
		
		// CÁLCULO DO AVANÇO DA EXECUÇÃO DA ATIVIDADE, SE APONTADO É 0
		/*if(apontado==0){
			
			avanco = 0
			
		} else {
			// SE NÃO
			
			avanco = (apontado / cargaPrev) *100
			
		}
		
		avanco = avanco.toFixed(0)*/
		
		// SE SALDO ALOCAR É DIFERENTE DE 0
		if(!(saldoAlocar==0)){
			
			saldoAlocar = saldoAlocar.toFixed(2)
		
		}
		
		saldoAlocado = saldoAlocado.toString()
		apontado = apontado.toString()
		cargaPrev = cargaPrev.toString()
		//avanco = avanco.toString()
		saldoAlocar = saldoAlocar.toString()
		
		if(saldoAlocado.includes(".")){
			
			saldoAlocado = saldoAlocado.replace(".",",")
			
		}
		
		if(apontado.includes(".")){
			
			apontado = apontado.replace(".",",")
			
		}
		
		if(cargaPrev.includes(".")){
			
			cargaPrev = cargaPrev.replace(".",",")
			
		}
		
		/*if(avanco.includes(".")){
			
			avanco = avanco.replace(".",",")
			
		}*/
		
		if(saldoAlocar.includes(".")){
			
			saldoAlocar = saldoAlocar.replace(".",",")
			
		}
		
		if(saldoAlocar==0){
			
			saldoAlocar
			
		}
		
		console.log("saldoAlocado: "+saldoAlocado)
		console.log("apontado: "+apontado)
		console.log("cargaPrev: "+cargaPrev)
		console.log("dscStatus: "+dscStatus)
		console.log("avanco: "+avanco)
		console.log("saldoRevisado: "+saldoRevisado)
		console.log("saldoAlocar: "+saldoAlocar)
		console.log("statusAtv: "+statusAtv)

		//apontado = apontado.toString()
		
		$("#STATUSOPATV___"+seq2).val(dscStatus)
		$("#STATUSATV___"+seq2).val(statusAtv)
		$("#CODSTATUSATV___"+seq2).val(codStatus)
		$("#CARGAPREVATV___"+seq2).val(cargaPrev)
		$("#CARGAREALATV___"+seq2).val(apontado)
		$("#SALDOREVATV___"+seq2).val(saldoRevisado)
		$("#SALDOALOCADOATV___"+seq2).val(saldoAlocado)
		$("#SALDOAALOCARATV___"+seq2).val(saldoAlocar)
		$("#AVANCOATV___"+seq2).val(avanco+" %")
		//$("#AVANCOATV___"+seq2).parent("td").children("a").children("span").text(avanco+" %")
		$("#AVANCOATV___"+seq2).parent("td").children("span").text(avanco+" %")
		/*$("#INICIOPLANATV___"+seq2).val(formataDataPadrao(rep["INICIO_PLANEJADO"]))
		$("#INICIOPLANATVREAL___"+seq2).val(rep["INICIO_PLANEJADO"])
		$("#FIMPLANATV___"+seq2).val(formataDataPadrao(rep["INICIO_PLANEJADO"]))
		$("#FIMPLANATVREAL___"+seq2).val(rep["INICIO_PLANEJADO"])*/
		
		// SE NÃO ESTÁ PROGRAMADO OU PARCIALMENTE APONTADO
		/*if(!(codStatus==2 || codStatus==3 || codStatus==5) || rep["ATV_POSTERIOR"]=="ULTIMA"){
			
			$("#AVANCOATV___"+seq2).parent("td").children("a").removeAttr("href")
			
		} else {
			
			$("#AVANCOATV___"+seq2).parent("td").children("a").attr("href","#AVANCOBLANK")
			
		}*/
		
		// RECONSTRÓI TODOS OS FILTROS
		//reconstroiFiltros()
		
		// ESCONDE ITENS QUE NÃO ESTÃO SELECIONADOS
		//escondeItemNaoselecionado()
		
	}
		
}

// EXIBE/ESCONDE O FILTRO
function filtros(obj){
	
	// SE ABA É DO PLANEJAMENTO
	if(obj==1){
	
		//$(".filtros").show()
		$(".filtros").hide()
		$(".filtrosResAloc").hide()
		$(".expansor1").show()
		$(".expansor2").hide()
		$("#ICONREDUZIR").hide()
		$("#ICONEXPANDIR").show()

		$(".filtrosHab").hide()
		$(".expansor3").hide()
		$("#ICONREDUZIR3").hide()
		$("#ICONEXPANDIR3").hide()
		
		// SE TABELA DE PLANEJAMENTO TEM ITENS
		if(tabelaPlanTemItens()){
			
			console.log("tabela de planejamento tem itens, vou reduzir os filtros")
			
			// REDUZ O FILTRO
			$("#ICONREDUZIR").click()
			
			// MOSTRA O CONTEÚDO DA TABELA
			$(".PLANEJAMENTO").show()
			
		} else {
			// SE NÃO
			
			console.log("tabela de planejamento não tem itens, vou expandir os filtros")
			
			// EXPANDE O FILTRO
			$("#ICONEXPANDIR").click()
			
			// ESCONDE O CONTEÚDO DA TABELA
			$(".PLANEJAMENTO").hide()
			
		}
		
	}
	
	// SE ABA É DO RESUMO DA ALOCAÇÃO
	if(obj==2){
		
		$(".filtros").hide()
		//$(".filtrosResAloc").show()
		$(".filtrosResAloc").hide()
		$(".expansor1").hide()
		$(".expansor2").show()
		$("#ICONREDUZIR2").hide()
		$("#ICONEXPANDIR2").show()

		$(".filtrosHab").hide()
		$(".expansor3").hide()
		$("#ICONREDUZIR3").hide()
		$("#ICONEXPANDIR3").hide()
		
		// SE TABELA DE RESUMO TEM ITENS
		if(tabelaResumoTemItens()){
			
			console.log("tabela de alocação tem itens, vou reduzir os filtros")
			
			// REDUZ O FILTRO
			$("#ICONREDUZIR2").click()
			
			// MOSTRA O CONTEÚDO DA TABELA
			$(".TABELARESUMO").show()
			
		} else {
			// SE NÃO
			
			console.log("tabela de alocação não tem itens, vou expandir os filtros")
			
			// EXPANDE O FILTRO
			$("#ICONEXPANDIR2").click()
			
			// ESCONDE O CONTEÚDO DA TABELA
			$(".TABELARESUMO").hide()
			
		}
		
	}
	// SE ABA É DA EDIÇÃO DE HABILIDADE
	if(obj==3){
		
		$(".filtros").hide()
		//$(".filtrosResAloc").show()
		$(".filtrosResAloc").hide()
		$(".filtrosHab").show()
		$(".expansor1").hide()
		$(".expansor2").hide()
		$(".expansor3").show()

		$("#ICONREDUZIR").hide()
		$("#ICONEXPANDIR").hide()
		$("#ICONREDUZIR2").hide()
		$("#ICONEXPANDIR2").hide()

		$("#ICONREDUZIR3").show()
		$("#ICONEXPANDIR3").hide()
		
		
	}
	
	
}

// VERIFICA SE TABELA DE PLANEJAMENTO TEM ITENS
function tabelaPlanTemItens(){
	
	var temItens = 0
	
	// PERCORRE TODOS OS REGISTROS
	$("input[id^='OSATV___']").each(function(){
		
		temItens++
		
	})
	
	console.log("itens: "+temItens)
	
	if(temItens>1){
		
		temItens = true
	} else {
		
		temItens = false
		
	}
	
	return temItens
	
}

// VERIFICA SE TABELA DE RESUMO TEM ITENS
function tabelaResumoTemItens(){
	
	var temItens = 0
	
	// PERCORRE TODOS OS REGISTROS
	$("input[id^='OSALOC___']").each(function(){
		
		temItens++
		
	})
	
	console.log("itens: "+temItens)
	
	if(temItens>1){
		
		temItens = true
	} else {
		
		temItens = false
		
	}
	
	return temItens
	
}

// LIMPA TODOS OS DADOS PROGRAMADOS
function limpaProgramacaoSalva(){
	
	console.log("vou limpar a programação salva")
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSATV___']").each(function(index,value){
	
		var seq = $(this).attr("id").split("___")[1]
		
		//$("#LINHAPLAN___"+seq).removeClass("selecionado")
		
		$("#DIA1ATV___"+seq).val("")
		$("#DIA1ATV___"+seq).prop("readonly",true)
		$("#DIA2ATV___"+seq).val("")
		$("#DIA2ATV___"+seq).prop("readonly",true)
		$("#DIA3ATV___"+seq).val("")
		$("#DIA3ATV___"+seq).prop("readonly",true)
		$("#DIA4ATV___"+seq).val("")
		$("#DIA4ATV___"+seq).prop("readonly",true)
		$("#DIA5ATV___"+seq).val("")
		$("#DIA5ATV___"+seq).prop("readonly",true)
		$("#DIA6ATV___"+seq).val("")
		$("#DIA6ATV___"+seq).prop("readonly",true)
		$("#DIA7ATV___"+seq).val("")
		$("#DIA7ATV___"+seq).prop("readonly",true)
		$("#DIA8ATV___"+seq).val("")
		$("#DIA8ATV___"+seq).prop("readonly",true)
		$("#DIA9ATV___"+seq).val("")
		$("#DIA9ATV___"+seq).prop("readonly",true)
		$("#DIA10ATV___"+seq).val("")
		$("#DIA10ATV___"+seq).prop("readonly",true)
		
	})
	
	// REMOVE OS RECURSOS SELECIONADOS
	//$(".GRUPORECURSON3").hide()
	$("#GRUPORECURSON3>option").remove() 
	
}

// CALCULA TODAS AS HORAS ALOCADAS PARA ATIVIDADE
function calculaHorasAlocadas(seq){
	
	var horas = 0
	
	var dia1 = $("#DIA1ATV___"+seq).val()
	var dia2 = $("#DIA2ATV___"+seq).val()
	var dia3 = $("#DIA3ATV___"+seq).val()
	var dia4 = $("#DIA4ATV___"+seq).val()
	var dia5 = $("#DIA5ATV___"+seq).val()
	var dia6 = $("#DIA6ATV___"+seq).val()
	var dia7 = $("#DIA7ATV___"+seq).val()
	var dia8 = $("#DIA8ATV___"+seq).val()
	var dia9 = $("#DIA9ATV___"+seq).val()
	var dia10 = $("#DIA10ATV___"+seq).val()
	
	console.log("dia1: "+dia1+", dia2: "+dia2+", dia3: "+dia3+", dia4: "+dia4+", dia5: "+dia5+", dia6: "+dia6+", dia7: "+dia7+", dia8: "+dia8+", dia9: "+dia9+", dia10: "+dia10)
	
	if(!(dia1=="" || dia1==null || dia1==undefined) && $("#D1___"+seq).hasClass("diaSelecionado")){
		dia1 = dia1.replace(",",".")
		dia1 = parseFloat(dia1)	
	}else{
		dia1 = 0
	}
	if(!(dia2=="" || dia2==null || dia2==undefined) && $("#D2___"+seq).hasClass("diaSelecionado")){
		dia2 = dia2.replace(",",".")
		dia2 = parseFloat(dia2)	
	} else {
		dia2 = 0
	}
	if(!(dia3=="" || dia3==null || dia3==undefined) && $("#D3___"+seq).hasClass("diaSelecionado")){
		dia3 = dia3.replace(",",".")
		dia3 = parseFloat(dia3)	
	} else {
		dia3 = 0
	}
	if(!(dia4=="" || dia4==null || dia4==undefined) && $("#D4___"+seq).hasClass("diaSelecionado")){
		dia4 = dia4.replace(",",".")
		dia4 = parseFloat(dia4)	
	} else {
		dia4 = 0
	}
	if(!(dia5=="" || dia5==null || dia5==undefined) && $("#D5___"+seq).hasClass("diaSelecionado")){
		dia5 = dia5.replace(",",".")
		dia5 = parseFloat(dia5)	
	} else {
		dia5 = 0
	}
	if(!(dia6=="" || dia6==null || dia6==undefined) && $("#D6___"+seq).hasClass("diaSelecionado")){
		dia6 = dia6.replace(",",".")
		dia6 = parseFloat(dia6)	
	} else {
		dia6 = 0
	}
	if(!(dia7=="" || dia7==null || dia7==undefined) && $("#D7___"+seq).hasClass("diaSelecionado")){
		dia7 = dia7.replace(",",".")
		dia7 = parseFloat(dia7)	
	} else {
		dia7 = 0
	}
	if(!(dia8=="" || dia8==null || dia8==undefined) && $("#D8___"+seq).hasClass("diaSelecionado")){
		dia8 = dia8.replace(",",".")
		dia8 = parseFloat(dia8)	
	} else {
		dia8 = 0
	}
	if(!(dia9=="" || dia9==null || dia9==undefined) && $("#D9___"+seq).hasClass("diaSelecionado")){
		dia9 = dia9.replace(",",".")
		dia9 = parseFloat(dia9)	
	} else {
		dia9 = 0
	}
	if(!(dia10=="" || dia10==null || dia10==undefined) && $("#D10___"+seq).hasClass("diaSelecionado")){
		dia10 = dia10.replace(",",".")
		dia10 = parseFloat(dia10)	
	} else {
		dia10 = 0
	}
	
	console.log("dia1: "+dia1+", dia2: "+dia2+", dia3: "+dia3+", dia4: "+dia4+", dia5: "+dia5+", dia6: "+dia6+", dia7: "+dia7+", dia8: "+dia8+", dia9: "+dia9+", dia10: "+dia10)
	
	horas = dia1 + dia2 + dia3 + dia4 + dia5 + dia6 + dia7 + dia8 + dia9 + dia10
	
	console.log("horas calculadas: "+horas)
	
	return horas
	
}

// VERIFICA DIA ALOCADO
function verificaDiaAlocado(seq,instance){
	
	console.log("vou verificar o dia que está sendo alocado")
	
	var inicio = $("#INICIOPLANATVREAL___"+seq).val()
	var fim = $("#FIMPLANATVREAL___"+seq).val()
	
	console.log("fim: "+fim+", inicio: "+inicio)
	
	var dia = $("#"+instance+"REAL___"+seq).val()
	
	console.log("dia: "+dia)
	
	var ret = false
	
	// SE O DIA QUE ESTARÁ SENDO ALOCADO
	if(dia>=inicio && dia<=fim){
		
		console.log("dia alocado está dentro do intervalo")
		
		ret = true
		
	}
	
	return ret
	
}

// SE A QUANTIDADE HORAS INFORMADAS ULTRAPASSOU O SALDO A ALOCAR OU A DISPONIBILIDADE DO OPERADOR
function dispRad(obj){
	
	console.log("entrei para verificar se o operador tem disponibilidade de horas nesse dia")
	
	var seq = $(obj).attr("id").split("___")[1]
	console.log("seq: "+seq)
	
	var instance = $(obj).attr("id").toString().replace("ATV___"+seq,"")
	
	console.log("instance: "+instance)

	var saldoAloc
	
	var saldoDisp
	
	$("input[id^='"+instance+"RAD___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		console.log("encontrei o saldo")
		
		saldoDisp = $(this).val()
		
		console.log("saldoDisp: "+saldoDisp)

		saldoAloc = $("#"+instance+"RADALOC___"+seq).val()

		console.log("saldoAloc: "+saldoAloc)
		
	})

	saldoAloc = saldoAloc.toString().replace(",",".")
	saldoAloc = Number(saldoAloc)
	
	saldoDisp = saldoDisp.toString().replace(",",".")
	saldoDisp = Number(saldoDisp)
	
	console.log("saldoDisp: "+saldoDisp)
	
	var saldo = $(obj).val()
	saldo = saldo.toString().replace(",",".")
	saldo = Number(saldo)
	
	console.log("saldo: "+saldo)

	
	// SE O SALDO ALOCADO É MENOR OU IGUAL AO SALDO DISPONÍVEL
	if(saldo<=saldoDisp){
		
		console.log("tem disponibilidade")
		
		return false
		
	}
	// SE SALDO ALOCADO É MAIOR QUE O SALDO DISPONÍVEL
	if(saldo>saldoDisp){
		
		if(saldo + saldoAloc > 12){

					
			console.log("não tem disponibilidade")
			
			return true

		}
		else{

			console.log("tem disponibilidade")
		
			return false

		}
		
	}

	// // SE O SALDO ALOCADO É MENOR OU IGUAL AO SALDO DISPONÍVEL
	// if(saldo<=saldoDisp){
		
	// 	console.log("tem disponibilidade")
		
	// 	return false
		
	// }
	
	// // SE SALDO ALOCADO É MAIOR QUE O SALDO DISPONÍVEL
	// if(saldo>saldoDisp){
		
	// 	saldoDisp = (24 - 9) - saldo
		
	// 	if(saldoDisp>=0){
			
	// 		console.log("tem disponibilidade")
			
	// 		return false
			
	// 	}else {
			
	// 		console.log("não tem disponibilidade")
			
	// 		return true
			
	// 	}
		
	// }
	
}

// VERIFICA SE A QUANTIDADE DE HORAS ESTÁ DENTRO DO SALDO A ALOCAR E DA DISPONIBILIDADE DO RECURSO 
function verificaHoras(obj){
	
	var seq = $(obj).attr("id").split("___")[1]
	console.log("seq: "+seq)
	
	var instance = $(obj).attr("id").split("___")[0]
	console.log("instance: "+instance+"___"+seq)
	
	// SE DIA ALOCADO FOR FORA DO PERÍODO DO PLANEJAMENTO
	//if(verificaDiaAlocado(seq,instance)){
		
		var horas = $("#"+instance+"___"+seq).val()
		var saldo = $("#SALDOAALOCARATV___"+seq).val()
		
		saldo = saldo.replace(",",".")
		saldo = Number(saldo)
		
		var recurso = $("#GRUPORECURSON3").val()
		var nomes = new Array()
			
		console.log("Recursos selecionados")
		console.log(recurso)
		
		var pj = $("#RECPJ").val()
		console.log("PJ: "+pj)
		
		// CALCULA TODAS AS HORAS ALOCADAS PARA ATIVIDADE
		/*var horas = calculaHorasAlocadas(seq)
		
		console.log("horas alocadas: "+horas+", saldoAlocar: "+saldo)
		
		// SE A QUANTIDADE HORAS INFORMADAS ULTRAPASSOU O SALDO A ALOCAR OU A DISPONIBILIDADE DO OPERADOR
		if(horas>saldo || dispRad(obj)){
		*/
		
		// SE NÃO É UM PJ
		if(pj=="" || pj==undefined || pj==null || pj=="null"){
			
			// SE A QUANTIDADE HORAS INFORMADAS ULTRAPASSOU A DISPONIBILIDADE DO OPERADOR
			if(dispRad(obj)){
			
				// LIMPA O CAMPO 
				$("#"+instance+"___"+seq).val("")
				$("#"+instance+"___"+seq).prop("readonly",true)
				
				// EXIBE ALERTA
				Swal.fire({
					  icon: 'error',
					  title: 'A quantidade de horas informada ultrapassou a disponibilidade do operador na data',
					  text: 'Verifique e tente novamente'
				})
				
			} 
				/*else {
				// SE NÃO
				
				for(var i=0; i<recurso.length; i++){
					
					var rec = recurso[i]
					
					var codmo = rec.split(" - ")[0]
					var nome = rec.split(" - ")[1]
					var dia = $("#"+instance+"REAL___"+seq).val()
					
					var a1 = DatasetFactory.createConstraint("CODMO",codmo,codmo,ConstraintType.MUST)
					var a2 = DatasetFactory.createConstraint("",dia,dia,ConstraintType.MUST)
					
					constraints = new Array(a1,a2)
					
					var dataset = DatasetFactory.getDataset("dsVerificaSaldoMO",null,constraints,null)
					row = dataset.values
					var rep = row[0]
					
					// SE O SALDO SUBTRAÍDO AS HORAS INFORMADAS É MENOR QUE 0
					if(rep["SALDO"] - horas < 0){
						
						nomes.push(nome)
						
					}
					
				}
				
				// SE EXISTEM RECURSOS INDISPONÍVEIS
				if(nomes.length>0){
					
					var pessoas = ""
					
					// LIMPA O CAMPO DAS HORAS
					$(obj).val("")
						
					// PERCORRE TODOS OS NOMES
					for(var i=0; i < nomes.length; i++){
						
						if(i+1==nomes.length){
							
							pessoas = pessoas+" e "+nomes[i]
							
						} else {
							
							pessoas = pessoas+""+nomes[i]+","
							
						}
						
					}
					
					// EXIBE ALERTA
					Swal.fire({
						  icon: 'error',
						  title: 'Os recursos: '+pessoas+" não possuem saldo para a quantidade de horas informada",
						  text: 'Verifique e tente novamente'
					})
					
				}
				
			}*/
			
		/*} else {
			// SE NÃO
			
			// LIMPA O CAMPO ALOCADO E DESABILITA
			$("#"+instance+"___"+seq).val("")
			$("#"+instance+"___"+seq).prop("readonly",true)
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'O dia alocado está fora da janela de planejamento',
				  text: 'Verifique e tente novamente'
			})
			
		}*/
			
		}
		
}

// HABILITA O CAMPO DA OP AO INFORMAR A OPÇÃO DO CAMPO INFERIOR
function inferiorOP(){
	
	console.log("entrei na função inferiorOP")
	
	// SE CAMPO INFERIOR FOI SELECIONADO
	if(!($("#INFERIOROP").val()=="")){
		
		$("#ORDEMPRODUCAO").prop("disabled",false)
		
		// SE INFERIOR FOI SELECIONADO EM "SIM"
		if($("#INFERIOROP").val()=="SIM"){
			
			console.log("INFERIOR É SIM, vou mudar o label")
			
			$("#LABELOP").html("OP *")
			
		} else {
			
			$("#LABELOP").html("OP")
			
		}
		
	} else {
		
		$("#ORDEMPRODUCAO").prop("disabled",true)
		$("#ORDEMPRODUCAO>option").remove()
		$("#CODORDEM").val("")
		$("#INDICE_PRD").val("")
		$("#NIVEL_PRD").val("")
		$("#LABELOP").html("OP")
		
	}
	
}

// SALVA O SEQ ATUAL
function carregaPosto(obj){
	
	console.log("carrega o posto")
	
	var seq = $(obj).attr("id").split("___")[1]
	var celula = $("#CELULAATV___"+seq).val()
		
	// SE NÃO É CÉLULA DA USINAGEM
	if(!(celula=="11")){
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'Não é possível alterar o posto para uma atividade que não pertence a célula de Usinagem',
			  text: 'Verifique e tente novamente.'
		})
		
	} else{
		// SE NÃO
		
		$("#SEQATUAL").val(seq)
		
		console.log("seq: "+seq)
		
		var codColigada = $("#CODCOLIGADA___"+seq).val()
		var codFilial = $("#CODFILIAL___"+seq).val()
		
		console.log("Vou fazer o reload com codColigada: "+codColigada+", codFilial: "+codFilial)
		
		// RELOAD ZOOM NO CAMPO POSTO ALTERAR
		//reloadZoomFilterValues("POSTO_ALTERAR","CODCOLIGADA,"+codColigada+",CODFILIAL,"+codFilial)
		
	}
	
}

// LIMPA O CONTEÚDO DO ZOOM DO POSTO
function limparZoomPosto(){

	console.log("vou limpar o zoom do posto")
	
	$("#VIEWPOSTO").val("")
	$("#CODPOSTO_ALTERAR").val("")
	$("#DESCPOSTO_ALTERAR").val("")

}

// LIMPA O CONTEÚDO DO MODAL PARA ALTERAR O POSTO
function limpaPosto(){

	console.log("vou limpar o conteúdo do modal do posto")
	
	// LIMPA O CONTEÚDO DO ZOOM DO POSTO
	limparZoomPosto()
	
	// LIMPA O CAMPO DO SEQ ATUAL
	$("#SEQATUAL").val("")

}

// CONFIRMA E SALVA O POSTO SELECIONADO
function confirmarPosto(){
	
	console.log("vou confirmar e atualizar o posto da atividade da OP")
	
	var seq = $("#SEQATUAL").val()
	
	console.log("seq: "+seq)
	
	var codColigada = $("#CODCOLIGADA___"+seq).val()
	var codFilial = $("#CODFILIAL___"+seq).val()
	var codOrdem = $("#OPATV___"+seq).val()
	var idAtvOrdem = $("#IDATIVIDADEATV___"+seq).val()
	var os = $("#OSATV___"+seq).val()
	var idprd = $("#IDPRDATV___"+seq).val()
	var execucao = $("#EXECUCAOATV___"+seq).val()
	var codAtividade = $("#CODATIVIDADEATV___"+seq).val()
	var codPosto = $("#CODPOSTO_ALTERAR").val()
	var descPosto = $("#DESCPOSTO_ALTERAR").val()
	
	console.log("codColigada: "+codColigada+", codFilial: "+codFilial+", codOrdem: "+codOrdem+", idAtvOrdem: "+idAtvOrdem+", os: "+os+", idprd: "+idprd+", execucao: "+execucao+", codAtividade: "+codAtividade+", codPosto: "+codPosto+", descPosto: "+descPosto)
	
	// SE POSTO FOI SELECIONADO
	if( ! (codPosto=="" || codPosto==null || codPosto==undefined) ){
		
		// ATUALIZA A INFORMAÇÃO DO POSTO PARA A TABELA PRINCIPAL E PARA O FILTRO
		atualizaPostoAtv(codColigada,codFilial,codOrdem,idAtvOrdem,os,idprd,execucao,codAtividade,codPosto,descPosto,seq)
		
		// LIMPA AS INFORMAÇÕES DO POSTO PREENCHIDAS NO MODAL
		limpaPosto()
		
	} else {
		// SE NÃO
		
		// FECHA O MODAL DE ALTERAÇÃO DO POSTO
		$("#fechar")[0].click()
		
		// EXIBE ALERTA
		Swal.fire({
			
			  icon: 'error',
			  title: 'É necessário selecionar algum posto',
			  text: 'Verifique e tente novamente'
				  
		}).then(function(result){
			
			  // SE CONFIRMAR
			  if (result.value) {
			      
				  // ABRE O MODAL DE ALTERAÇÃO DO POSTO
			      $("#ALTERARPOSTOBLANK")[0].click()
			      
			  } 				  
			  
		})
		
	}
	
}

// ATUALIZA A INFORMAÇÃO DO POSTO PARA A TABELA PRINCIPAL E PARA O FILTRO
function atualizaPostoAtv(codColigada,codFilial,codOrdem,idAtvOrdem,os,idprd,execucao,codAtividade,codPosto,descPosto,seq){
	
	var myLoading2 = FLUIGC.loading(window);
	
	myLoading2.show();
	
	// SET TIME OUT PARA O LOAD
	setTimeout(function(){
		
		console.log("vou executar a procedure")
		
		// CONSTRAINTS DA PROCEDURE DE ATUALIZAR O POSTO
		var c1 = DatasetFactory.createConstraint("CODCOLIGADA", codColigada, codColigada, ConstraintType.MUST);
	    var c2 = DatasetFactory.createConstraint("CODFILIAL", codFilial, codFilial, ConstraintType.MUST);
	    var c3 = DatasetFactory.createConstraint("CODORDEM", codOrdem, codOrdem, ConstraintType.MUST);
	    var c4 = DatasetFactory.createConstraint("IDATVORDEM", idAtvOrdem, idAtvOrdem, ConstraintType.MUST);
	    var c5 = DatasetFactory.createConstraint("OS", os, os, ConstraintType.MUST);
	    var c6 = DatasetFactory.createConstraint("IDPRD", idprd, idprd, ConstraintType.MUST);
	    var c7 = DatasetFactory.createConstraint("EXECUCAO", execucao, execucao, ConstraintType.MUST);
	    var c8 = DatasetFactory.createConstraint("CODATIVIDADE", codAtividade, codAtividade, ConstraintType.MUST);
	    var c9 = DatasetFactory.createConstraint("CODPOSTO", codPosto, codPosto, ConstraintType.MUST);
	    var c10 = DatasetFactory.createConstraint("DESCPOSTO", descPosto, descPosto, ConstraintType.MUST);
	    
		var constraints = new Array(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10);
	    
	    var dataset = DatasetFactory.getDataset("dsProcedureAtualizarPosto", null, constraints, null);
	    
		var constraints2 = new Array(c1,c2,c3,c4);
	    
		console.log("vou atualizar o posto")
		
	    var dataset2 = DatasetFactory.getDataset("dsBuscaPostoAtvOP", null, constraints2, null);
		var row = dataset2.values
		
		var rep = row[0]
	    
		// SALVAR OS VALORES
		$("#POSTOATV___"+seq).val(rep["CODPOSTO"])
		
		// RECONSTROI OS FILTROS
		reconstroiFiltros()
		
		// FECHA O MODAL DE ALTERAÇÃO DO POSTO
		$("#fechar")[0].click()
		
		// LIMPA O SEQ ATUAL
		$("#SEQATUAL").val()
		
		// EXIBE ALERTA
		var Toast = Swal.mixin({
			  toast: true,
			  position: 'center',
			  showConfirmButton: false,
			  timer: 2000,
			  timerProgressBar: true,
		})

		Toast.fire({
			  icon: 'success',
			  title: 'Posto da atividade alterado com sucesso!'
		})
		
	},500)
	
	// DESATIVA O LOAD
	setTimeout(function(){
		
		myLoading2.hide();
		
	},500)
	
}

// EXECUTA A PROCEDURE
function execProcedure(coligada,filial,codOrdem,codAtividade,codmo,dataProgramada,horasProgramadas,planoCorte){
	
	console.log("beforeTaskSave - Vou executar a Procedure");
	console.log("coligada: "+coligada+", filial: "+filial+", codOrdem: "+
			codOrdem+", codAtividade: "+codAtividade+", codmo: "+codmo+
			", dataProgramada: "+dataProgramada+", horasProgramadas: "+horasProgramadas+", planoCorte: "+planoCorte);
	
	var constraints
	
    //var c1 = DatasetFactory.createConstraint("NUMPROCESSO", numProcess, numProcess, ConstraintType.MUST);
    var c1 = DatasetFactory.createConstraint("CODCOLIGADA", coligada, coligada, ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("CODFILIAL", filial, filial, ConstraintType.MUST);
    var c3 = DatasetFactory.createConstraint("CODORDEM", codOrdem, codOrdem, ConstraintType.MUST);
    var c4 = DatasetFactory.createConstraint("CODATIVIDADE", codAtividade, codAtividade, ConstraintType.MUST);
    var c5 = DatasetFactory.createConstraint("CODPESSOA", codmo, codmo, ConstraintType.MUST);
    var c6 = DatasetFactory.createConstraint("DATAPROGRAMADA", dataProgramada, dataProgramada, ConstraintType.MUST);
    var c7 = DatasetFactory.createConstraint("HORASPROGRAMADAS", horasProgramadas, horasProgramadas, ConstraintType.MUST);
	var usuario = $("#USUARIOATUAL").val()
	var c8 = DatasetFactory.createConstraint("USUARIOATUAL", usuario, usuario, ConstraintType.MUST);
    
    if(planoCorte=="" || planoCorte==undefined || planoCorte==null){
    	
    	constraints = new Array(c1,c2,c3,c4,c5,c6,c7,c8);
    	
    } else {
    	
    	var c9 = DatasetFactory.createConstraint("PLANOCORTE",planoCorte,planoCorte,ConstraintType.MUST);
    	constraints = new Array(c1,c2,c3,c4,c5,c6,c7,c8,c9);
    	
    }
    console.log("Vou executar o dataset da PROCEDURE DA PROGRAMAÇÃO")
    
    var dataset = DatasetFactory.getDataset("dsProcedureProgramacao", null, constraints, null);
    
    console.log("retorno do dataset integração: ")
    console.log(dataset)
    
    var row = dataset.values
    
    var rep = row[0]
    
    var retorno = rep["RETORNO"]
    
    console.log("RETORNO: "+rep["RETORNO"])
    
    console.log("Executei o dataset da PROCEDURE")
    
    // SE A INTEGRAÇÃO FOI REALIZADA
    if(retorno=="SUCESSO"){
    	
    	return true
    	
    } else {
    	// SE NÃO 
    	
    	//return rep["RETORNO"]
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

// QUANDO O SCROLL É MOVIMENTADO
/*$('.ScrollWrapper').on('scroll', function(){
	
	console.log("entrei na função scroll")
	
	  var _left = $(this).scrollLeft();
		
	  console.log("scrol left: "+_left)
	
	  $('.ScrollWrapper').scrollLeft(_left)
	  
	  
	  
})*/

// QUANDO O SCROLL É MOVIMENTADO
$('.scrollPrincipal').on('scroll', function(){
	
	console.log("entrei na função scroll principal")
	
	var _left = $(this).scrollLeft();
		
	console.log("scrol left: "+_left)
	
	$('.scrollPrincipal').scrollLeft(_left)
	  
})

// QUANDO O SCROLL É MOVIMENTADO
$('.scrollAlocacao').on('scroll', function(){
	
	console.log("entrei na função scroll alocação")
	
	var _left = $(this).scrollLeft();
		
	console.log("scrol left: "+_left)
	
	$('.scrollAlocacao').scrollLeft(_left)
	  
})


// ONDE ROLA O SCROLL
/*$(window).on("scroll load", function(){
	
	console.log("entrei no scroll")
   var tabela_top = $(".TABELAATV table").offset().top;
   var window_top = $(this).scrollTop();

   $(".TABELAATV table thead th").css({
      'top': tabela_top-window_top <= 0 ? window_top-tabela_top+'px' : '0',
      'z-index':'9',
      'padding':'10px 0'
   });
   
});*/


// MÉTODOS DA INTEGRAÇÃO

function getWebService(Usuario, Senha){

	var Nome_Servico = "WSRM";
	var Caminho_Servico = "br.com.totvs.WsDataServer";
	 
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

	var authService = serviceHelper.getBasicAuthenticatedClient(service, "br.com.totvs.IwsDataServer", Usuario, Senha);	  
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

function buscatabela(){
	
	var filial;
	var codmo;

	filial = $("#filial_cod").val()

	codmo = $("#CODregistro").val()

	if( filial == "" || filial==null || filial==undefined || codmo == "" || codmo==null || codmo==undefined ){

		// EXIBE ALERTA
		Swal.fire({
			icon: 'error',
			title: 'Campos Obrigatórios não preenchidos',
			text: 'Verifique os campos obrigatórios(*)'
		})
	}
	else{

		limparTabelaHab()
		carregarHabAnteriores(filial,codmo)
		$("#TABELAADDHAB").show()
		
	}
    
}

//FUNÇÃO SALVAR
function salvarTabela(){

	var myLoading = FLUIGC.loading(window)
	myLoading.show();
	
	var filial;
	var codmo;
	var habilidades;

	codmo = $("#CODregistro").val()
	filial = $("#filial_cod").val()

	setTimeout(function(){

		RemoverHabilidadesOperador(codmo, filial)

		$("input[id^='CODHAB___']").each(function(){

			var seq = $(this).attr("id").split("___")[1]

			if($(this).val() == null || $(this).val() == "" || $(this).val() == undefined ){

				$(this).parent().parent().remove();

			}
			else {

				AddHabilidadesOperador(codmo, $(this).val())

			}

		})

		myLoading.hide();

		// EXIBE ALERTA
		var Toast = Swal.mixin({
			toast: true,
			position: 'center',
			showConfirmButton: false,
			timer: 2000,
			timerProgressBar: true,
		})

		Toast.fire({
			icon: 'success',
			title: 'Habilidades salvas com sucesso!'
		})

	},1000)	
    
}


//CARREGAR HABILIDADES ANTERIORES
function carregarHabAnteriores(filial, codmo){


	var a4 = DatasetFactory.createConstraint("CODFILIAL",filial,filial,ConstraintType.MUST)
	var a5 = DatasetFactory.createConstraint("CODregistro",codmo,codmo,ConstraintType.MUST)
	
	var constraints = new Array(a4,a5)
	var dataset = DatasetFactory.getDataset("dsHabilidadesOperador",null,constraints,null)


	var row = dataset.values
	
	console.log("Retorno do dsHabilidadesOperador")
	console.log(row)

	var i;
	var ret;
	var seq;

	if(row!="" && row!=undefined && row!=null){

		for(i=0;i<row.length;i++){

			ret = row[i];

			seq=addHabilidadesSelec()

			setZoomData("novaTABELA___"+seq,ret['DESCRICAOHABIL'])
			$("#CODHAB___"+seq).val(ret['CODHABILIDADE'])

		}

	}



}

//REVOMER AS HABILIDADES DO OPERADOR

function RemoverHabilidadesOperador(codmo, filial){

	
	var a4 = DatasetFactory.createConstraint("CODregistro",codmo,codmo,ConstraintType.MUST)
	var a5 = DatasetFactory.createConstraint("filial_cod",filial,filial,ConstraintType.MUST)

	var constraints = new Array(a4, a5)
	var dataset = DatasetFactory.getDataset("dsRemoverHabilidadesOperador",null,constraints,null)
	
}

//ADICIONAR AS HABILIDADES DO OPERADOR 

function AddHabilidadesOperador(codmo,habilidades){

	
	var a6 = DatasetFactory.createConstraint("CODregistro",codmo,codmo,ConstraintType.MUST)
	var a7 = DatasetFactory.createConstraint("CODHAB",habilidades,habilidades,ConstraintType.MUST)

	var constraints = new Array(a6,a7)
	var dataset = DatasetFactory.getDataset("dsAddHabilidadesOperador",null,constraints,null)
	
}





//VERIFICA SE JÁ EXISTE A HABILIDADE 
function verificaHabilidade(valor){

	var ret = 1

	$("input[id^='CODHAB___']").each(function(){

		console.log($(this).val()+" e "+valor)

		if($(this).val()==valor){

			ret = 0;

		}

	})


	return ret;

}


function limparTabelaHab(){

	$("span[id^='REMOVEHAB___']").each( function(){

			$(this).parent().parent().remove();

		}
	)

	$("#TABELAADDHAB").hide()

}

console.log("terminei o utils")

