console.log("entrei no utils")

// ADICIONA LINHA NA TABELA DO PLANEJAMENTO
/*function addPlanAtividades(){
	
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
	
}*/

// ADICIONA LINHA NA TABELA DE RECURSOS APTOS DISPONÍVEIS PARA A ATIVIDADE
function addModalRecAptoDisp(){
	
	var row = wdkAddChild('RECAPTOSDISPATV')
	 
	return row
	
}

// ADICIONA LINHA NA TABELA DA OP
function addTabelaOP(){
	
	var row = wdkAddChild('TABELAOP')
	 
	return row
	
}

// ADICIONA LINHA NA TABELA DE RECURSOS APTOS DISPONÍVEIS PARA A ATIVIDADE
function addRAD(){
	
	var row = wdkAddChild('RECAPTODISP')
	 
	console.log("Criei a linha da RECAPTODISP: "+row)
	
	return row
	
}

// ADICIONA LINHA NA TABELA DE RECURSOS APTOS DISPONÍVEIS PARA A ATIVIDADE
function addRADDesp(){
	
	var row = wdkAddChild('RECAPTODISPDESP')
	 
	console.log("Criei a linha da RECAPTODISPDESP: "+row)
	
	return row
	
}

// ADICIONA LINHA NA TABELA DE CABEÇALHO DE RECURSOS APTOS DISPONÍVEIS PARA A ATIVIDADE
function addRADCab(){
	
	var row = wdkAddChild('RECAPTODISPCAB')
	 
	console.log("Criei a linha da RECAPTODISPCAB: "+row)
	
	return row
	
}

// ADICIONA LINHA NA TABELA DE CABEÇALHO DE RECURSOS APTOS DISPONÍVEIS PARA A ATIVIDADE
function addRADCabDesp(){
	
	var row = wdkAddChild('RECAPTODISPCABDESP')
	 
	console.log("Criei a linha da RECAPTODISPCABDESP: "+row)
	
	return row
	
}

// ADICIONA LINHA NA TABELA SOMA DE TEMPOS
/*function addSomaAloc(){
	
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
	
}*/

// SELEÇÃO DO DIA
/*function selecaoDia(obj){
	
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
	
	var atvTemPC = atvTemPlanoCorte(codcoligada,codfilial,codOrdem,idAtvOrdem,codEstrutura)
	
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
			
		} 
		else if(atvTemPC){
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
			
		}
		
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
			if(atvTemPC){
				
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
				
			} else {
				// SE NÃO 
				
				console.log("atividade não tem plano")
				
				$(instance).val("")
				$(instance).prop("readonly",false)
				
			}
			
		}
		
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
		
		var seq = $(obj).attr("id").split("___")[1]
		
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
		
		console.log("filtros. coligada: "+coligada+", codfilial: "+codfilial+", codestrutura: "+codestrutura+", codatividade: "+codatividade)
		
		// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
		var a1 = DatasetFactory.createConstraint("CODCOLIGADA",coligada,coligada,ConstraintType.MUST)
		var a2 = DatasetFactory.createConstraint("CODFILIAL",codfilial,codfilial,ConstraintType.MUST)
		var a3 = DatasetFactory.createConstraint("CODESTRUTURA",codestrutura,codestrutura,ConstraintType.MUST)
		var a4 = DatasetFactory.createConstraint("CODATIVIDADE",codatividade,codatividade,ConstraintType.MUST)

		constraints = new Array(a1,a2,a3,a4)
		
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
		
		console.log("filtros. coligada: "+coligada+", codfilial: "+codfilial+", codestrutura: "+codestrutura+", codatividade: "+codatividade)
		
		// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
		var a1 = DatasetFactory.createConstraint("CODCOLIGADA",coligada,coligada,ConstraintType.MUST)
		var a2 = DatasetFactory.createConstraint("CODFILIAL",codfilial,codfilial,ConstraintType.MUST)
		var a3 = DatasetFactory.createConstraint("CODESTRUTURA",codestrutura,codestrutura,ConstraintType.MUST)
		var a4 = DatasetFactory.createConstraint("CODATIVIDADE",codatividade,codatividade,ConstraintType.MUST)

		constraints = new Array(a1,a2,a3,a4)
		
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
		
		// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
		var a1 = DatasetFactory.createConstraint("CODCOLIGADA",coligada,coligada,ConstraintType.MUST)
		var a2 = DatasetFactory.createConstraint("CODFILIAL",codfilial,codfilial,ConstraintType.MUST)
		var a3 = DatasetFactory.createConstraint("CODESTRUTURA",codestrutura,codestrutura,ConstraintType.MUST)
		var a4 = DatasetFactory.createConstraint("CODATIVIDADE",codatividade,codatividade,ConstraintType.MUST)
		var a5 = DatasetFactory.createConstraint("CODORDEM",codordem,codordem,ConstraintType.MUST)
		
		constraints = new Array(a1,a2,a3,a4,a5)
		
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
	
}*/

// EXIBE/ESCONDE O FILTRO
/*function filtros(obj){
	
	// SE ABA É DO PLANEJAMENTO
	if(obj==1){
	
		//$(".filtros").show()
		$(".filtros").hide()
		$(".filtrosDesp").hide()
		$(".expansor1").show()
		$(".expansor2").hide()
		$("#ICONREDUZIR").hide()
		$("#ICONEXPANDIR").show()
		
		// SE TABELA DE PLANEJAMENTO TEM ITENS
		if(tabelaProgItens()){
			
			console.log("tabela de planejamento tem itens, vou reduzir os filtros")
			
			// REDUZ O FILTRO
			$("#ICONREDUZIR").click()
			
			// MOSTRA O CONTEÚDO DA TABELA
			$(".RAD").show()
			
		} else {
			// SE NÃO
			
			console.log("tabela de planejamento não tem itens, vou expandir os filtros")
			
			// EXPANDE O FILTRO
			$("#ICONEXPANDIR").click()
			
			// ESCONDE O CONTEÚDO DA TABELA
			$(".RAD").hide()
			
		}
		
	}
	
	// SE ABA É DO RESUMO DA ALOCAÇÃO
	if(obj==2){
		
		$(".filtros").hide()
		//$(".filtrosResAloc").show()
		$(".filtrosDesp").hide()
		$(".expansor1").hide()
		$(".expansor2").show()
		$("#ICONREDUZIR2").hide()
		$("#ICONEXPANDIR2").show()
		
		// SE TABELA DE RESUMO TEM ITENS
		if(tabelaDespTemItens()){
			
			console.log("tabela de alocação tem itens, vou reduzir os filtros")
			
			// REDUZ O FILTRO
			$("#ICONREDUZIR2").click()
			
			// MOSTRA O CONTEÚDO DA TABELA
			$(".RADDESP").show()
			
		} else {
			// SE NÃO
			
			console.log("tabela de alocação não tem itens, vou expandir os filtros")
			
			// EXPANDE O FILTRO
			$("#ICONEXPANDIR2").click()
			
			// ESCONDE O CONTEÚDO DA TABELA
			$(".RADDESP").hide()
			
		}
		
	}
	
}*/

// EXPANDE O CONTEÚDO DO DETALHAMENTO DO ITEM
function expandir2(e) {
	
    // ESCONDE/MOSTRA OS ÍCONES
    $("#ICONEXPANDIR2").hide();
    $("#ICONREDUZIR2").show();
    
    // EXIBE A ABA DOS ITENS
    $(".filtrosDesp").show()

}

// REDUZ O CONTEÚDO DO DETA  LHAMENTO DO ITEM
function reduzir2(e) {
    
    // ESCONDE/MOSTRA OS ÍCONES
    $("#ICONEXPANDIR2").show();
    $("#ICONREDUZIR2").hide();
    
    // ESCONDE A ABA DOS ITENS
    $(".filtrosDesp").hide()
    
}

// CARREGA AS INFORMAÇÕES DO RECURSO ALOCADO NA ATIVIDADE
/*function carregaRecAlocadoAtv(obj){
	
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
						
					} 
					
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
					
					} 
					
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
					
					} 
					
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
					
					} 
					
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
					
					} 
					
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
					
					} 
					
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
					
					} 
					
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
					
					} 
					
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
					
					} 
					
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
					
					} 
					
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
	
}*/

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
/*function calculaSomaAlocacao(row){
	
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
	
}*/

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
/*function contemChapaRAA(chapa){

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
	
}*/

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

// VERIFICA SE JÁ CONTÉM A CHAPA
function contemChapaRADDesp(chapa){

	var ret = false
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OPERADORRADDESP__']").each(function(){
	
		var seq = $(this).attr("id").split("___")[1]
		
		// SE CHAPA JÁ EXISTE
		if($("#CHAPARADDESP___"+seq).val()==chapa){
			
			ret = true
			
		}
		
	})
	
	return ret
	
}

// BUSCA O SEQ DO OPERADOR
/*function buscaSeqChapa(chapa){
	
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
	
}*/

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

// BUSCA O SEQ DO OPERADOR
function buscaSeqChapaRADDesp(chapa){
	
	var seqRet
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OPERADORRADDESP___']").each(function(){
	
		var seq = $(this).attr("id").split("___")[1]
		
		// SE CHAPA JÁ EXISTE
		if($("#CHAPARADDESP___"+seq).val()==chapa){
			
			seqRet = seq
			
		}
		
	})
	
	return seqRet
	
}

// CARREGA AS INFORMAÇÕES DO RECURSO APTO DISPONIVEL PARA A ATIVIDADE
/*function carregaRecAptoDispAtv(obj){
	
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
						
					} 
					
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
					
					}
					
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
					
					} 
					
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
					
					} 
					
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
					
					} 
					
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
					
					}
					
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
					
					} 
					
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
					
					} 
					
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
					
					} 
					
				}
				
				// SE DIA10 É IGUAL A DATA DE DISPONIBILIDADE
				if(dia10==dataDisp){
					
					var saldoDisp = rep["SALDO"]
					
					if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
						
						saldoDisp = parseFloat(saldoDisp)
						saldoDisp = saldoDisp.toFixed(2)
						saldoDisp = saldoDisp.toString()
						
						if(saldoDisp.includes(".")){
							
							saldoDisp = saldoDisp.replace(".",",")
							
						}
						
						$("#DIA10RECAPTOSDISPATV___"+seqModal).val(saldoDisp)
					
					} 
					
				}
				
			} else {
			// SE NÃO 
			
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
						
					} 
					
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
					
					}
					
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
					
					} 
					
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
					
					} 
					
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
					
					} 
					
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
					
					} 
					
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
					
					} 
					
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
					
					} 
					
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
					
					} 
					
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
	
}*/

// VERIFICA SE TEM ALGUM ITEM PARA SER DESPROGRAMADO
function temDesprogramar(){
	
	var ret = false
	
	// PERCORRE TODOS OS DIAS POSSÍVEIS
	for(var i=1;i<=10;i++){
		
		var d = i
		
		// PERCORRE TODOS OS REGISTROS DA TABELA
		$("td[id^='RAD"+d+"DESP___']").each(function(){
			
			var seq = $(this).attr("id").split("___")[1]
			
			// SE DIA FOI SELECIONADO PARA DESPROGRAMAR
			if($("#RAD"+d+"DESP___"+seq).hasClass("desprogramar")){
				
				ret = true
				
			}
			
		})
		
	}
	
	console.log("tem itens para desprogramar? "+ret)
	
	return ret
	
}

/*
// DESPROGRAMAR ALOCAÇÃO
function desprogramar(){
	
	console.log("vou desprogramar")
	
	var codInterno = $("#CODINTERNO").val()
	
	// SE TEM ALGUM ITEM PARA SER DESPROGRAMADO
	if(temDesprogramar() && !(codInterno=="" || codInterno==null || codInterno==undefined) ){
		
		var myLoading2 = FLUIGC.loading(window);
		
		myLoading2.show();
		
		setTimeout(function(){
			
			// PERCORRE TODOS OS DIAS POSSÍVEIS
			for(var i=1;i<=10;i++){
				
				var d = i
				
				console.log("vou buscar o input #DIA"+d+"RADDESP___")
				
				// PERCORRE TODOS OS ITENS DA TABELA E PROCURA OS DIAS SELECIONADOS
				$("input[id^='DIA"+d+"RADDESP___']").each(function(){
					
					var seq = $(this).attr("id").split("___")[1]
					
					console.log("vou buscar o input #DIA"+d+"RADDESP___"+seq)
					
					var codmo = $("#CHAPARADDESP___"+seq).val()
					var codColigada = $("#CODCOLIGADADESP").val()
					var codFilial = $("#CODFILIALDESP").val()
					//var codAtividade = $("#CODATIVIDADERECALOCATV___"+seq).val()
					var planoCorte = $("#NUMPLANOCORTEREALDESP").val()
					
					console.log("valores. Seq: "+seq+", codMo: "+codmo+", codColigada: "+codColigada+", codFilial: "+codFilial+", codAtividade: "+codAtividade+
							", planoCorte: "+planoCorte)
					
					// SE DIA FOI SELECIONADO PARA SER DESPROGRAMADO
					if($("#RAD"+d+"DESP___"+seq).hasClass("desprogramar")){
						
						var dia1 = $("#DIA"+d+"RADREALDESP___"+seq).val()
						
						console.log("achei o dia "+dia1+" para desprogramar")
						
						var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST)
			        	var a2 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
			        	var a3 = DatasetFactory.createConstraint("NUMPLANOCORTE",planoCorte,planoCorte,ConstraintType.MUST)
			        	
			        	var constraints = new Array(a1,a2,a3)
			        	
			        	var dataset = DatasetFactory.getDataset("dsBuscaAtvPlanoCorteOS",null,constraints,null)
			        	var row = dataset.values
			        	var count = dataset.values.length
			        	
			        	console.log("row")
			        	console.log(row)
			        	
			        	console.log("count: "+count)
			        	
			        	// PERCORRE TODOS OS REGISTROS DO TE
			        	for(var k=0;k<count;k++){
			        		
			        		var rep = row[k]

			        		var codEstrutura = rep["CODESTRUTURA"]
			        		var idAtvOrdem = rep["IDATVORDEM"]
			        		var codAtividade = rep["CODATIVIDADE"]
			        		var codOrdem = rep["CODORDEM"]
			        		
			        		console.log("vou desprogramar para o codColigada: "+codColigada+", codFilial: "+codFilial+", codmo: "+codmo+", codOrdem: "+codOrdem+", " +
			        				"codEstrutura: "+codEstrutura+", idAtvOrdem: "+idAtvOrdem+", codAtividade: "+codAtividade+", dia1: "+dia1)
			        		
							// EXECUTA A PROCEDURE PARA DESPROGRAMAR
							execProcedureDesprogramar(codColigada,codFilial,codmo,codOrdem,codEstrutura,idAtvOrdem,codAtividade,dia1,planoCorte,codInterno)
			        		
			        	}
						
					}
					
				})
				
			}
			
			// BUSCA AS INFORMAÇÕES PARA A DESPROGRAMAÇÃO
			buscarDesprogramacao(1)
			
			// DESATIVA O LOAD
			setTimeout(function(){
				
				myLoading2.hide();
				
			}, 600)
			
		},500)
		
	} else {
		// SE NÃO
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'Não há dia selecionado para desprogramar e/ou o motivo não foi selecionado',
			  text: 'Verifique e tente novamente.'
		})
		
	}
	    
}
*/

// VERIFICA SE O SALDO INFORMADO ULTRAPASSOU O SALDO DISPONÍVEL E O A PROGRAMAR
function verificaSaldoProg(obj){
	
	var seq = $(obj).attr("id").split("___")[1]
	var saldo = $(obj).val()
	
	console.log("entrei na verifica Saldo")
	
	// SE SALDO É VAZIO OU NULO
	if(saldo=="" || saldo==null || saldo==undefined){
		
		console.log("o saldo é vazio")
		
		// ATUALIZA O SALDO A PROGRAMAR
		atualizaAprogramar()
		
		$(obj).val("")
		
	} else {
		// SE NÃO
		
		console.log("o saldo não é vazio")
		
		// SE SALDO ESTÁ COM ","
		if(saldo.includes(",")){
			
			saldo = saldo.replace(",",".")
			
		}
		
		saldo = parseFloat(saldo)
		
		var saldoCalc = saldo * 60
		var resto = (saldoCalc.toFixed(2))%3
		console.log("saldoCalc: "+saldoCalc)
		console.log("resto: "+resto)
		
		var input = $(obj).attr("id").split("___")[0]
		
		input = input.replace("PROG","REAL")
		var dia = $("#"+input+"___"+seq).val()
			
		var codColigada = $("#CODCOLIGADA").val()
		var numPlano = $("#NUMPLANOCORTEREAL").val()
		var codFilial = $("#CODFILIAL").val()
		var codmo = $("#CHAPARAD___"+seq).val()
		var codAtividade = buscaCodAtv(codColigada,numPlano)

		// SE O OPERADOR ESTARÁ EM FÉRIAS PARA A DATA SELECIONADA
		if(verificaFeriasOperador(dia,codColigada,codFilial,codmo)){
			
			$(obj).val("")
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'O(s) Recurso(s) (N3) selecionado não pode ser alocado pois estará em férias no dia selecionado',
				  text: 'Verifique e tente novamente.'
			})
			
		}
		
		// SE SALDO INFORMADO NÃO É MÚLTIPLO DE 3
		else if(!((saldoCalc.toFixed(2))%3==0)){
			
			$(obj).val("")
			
			console.log("o saldo não é multiplo de 3")
			
			// ATUALIZA O SALDO A PROGRAMAR
			atualizaAprogramar()
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'O valor informado não é múltiplo de 3',
				  text: 'Verifique e tente novamente.'
			})
			
		} else {
		// SE É
			
			console.log("o saldo é multiplo de 3")
			
			var instance = $(obj).attr("id").split("___")[0] 
			instance = instance.replace("PROG","")
			
			var disponivel = $("#"+instance+"___"+seq).val()
			
			// SE DISPONÍVEL ESTÁ COM ","
			if(disponivel.includes(",")){
				
				disponivel = disponivel.replace(",",".")
				
			}
			
			disponivel = parseFloat(disponivel)
			
			$(obj).val(saldo.toFixed(2).toString().replace(".",","))
			
			console.log("disponivel: "+disponivel+", saldo: "+saldo)
			
			// FAZER BUSCA E PREENCHER A TABELA
			var a1 = DatasetFactory.createConstraint("CODMO", codmo, codmo, ConstraintType.MUST);
			var a2 = DatasetFactory.createConstraint("DATA_DE", dia, dia, ConstraintType.MUST);
			var a3 = DatasetFactory.createConstraint("CODATIVIDADE", codAtividade, codAtividade, ConstraintType.MUST);
			var a4 = DatasetFactory.createConstraint("DATA_ATE", dia, dia, ConstraintType.MUST);
			var a5 = DatasetFactory.createConstraint("CODFILIAL", codFilial, codFilial, ConstraintType.MUST);
			
			var constraint = new Array(a1,a2,a3,a4,a5);
			
			var dataset = DatasetFactory.getDataset("dsRadReprogDesprog", null, constraint, null);
			var row = dataset.values
			
			console.log("row")
			console.log(row)
			
			var alocado = 0
			
			// SE RETORNO É NULO OU VAZIO
			if(!(row=="" || row==null || row==undefined)){
		
				var rep = row[0]
				
				alocado = parseFloat(rep["ALOCADO"])
					
			}
			
			var saldoAux = alocado + saldo
			
			console.log("saldoAux: "+saldoAux)
			
			// SE SALDO É MENOR QUE 3 HORAS
			if(saldoAux>12){
				
				$(obj).val("")
								
				// ATUALIZA O SALDO A PROGRAMAR
				atualizaAprogramar()
				
				// EXIBE ALERTA
				Swal.fire({
					  icon: 'error',
					  title: 'O valor informado ultrapassa o saldo máximo de 12 horas diárias',
					  text: 'Verifique e tente novamente.'
				})
				
			} else{
				// SE NÃO
				
				// SE O SALDO ULTRAPASSA O SALDO DISPONÍVEL
				/*if(saldo>disponivel){
					
					$(obj).val("")
					
					console.log("o saldo disponível é maior que o saldo")
					
					// ATUALIZA O SALDO A PROGRAMAR
					atualizaAprogramar()
					
					// EXIBE ALERTA
					Swal.fire({
						  icon: 'error',
						  title: 'O valor informado ultrapassa o saldo disponível',
						  text: 'Verifique e tente novamente.'
					})
					
				} else {*/
				
					// SE NÃO
					
					console.log("o saldo disponível é maior que o saldo")
					
					// SALDO É MAIOR QUE O A PROGRAMAR
					/*if(calculaAprogramar()){
						
						console.log("o saldo é maior que o a programar")
						
						$(obj).val("")
						
						// ATUALIZA O SALDO A PROGRAMAR
						atualizaAprogramar()
						
						// EXIBE ALERTA
						Swal.fire({
							  icon: 'error',
							  title: 'O valor informado ultrapassa o saldo a programar',
							  text: 'Verifique e tente novamente.'
						})
						
					} else {*/
						// SE NÃO, SALDO PODE SER PROGRAMADO
						
						console.log("o saldo é menor que o a programar")
						
						// ATUALIZA O SALDO A PROGRAMAR
						atualizaAprogramar()
						
						$(obj).val(saldo.toFixed(2).toString().replace(".",","))
						
					//}
					
				//}
				
			}

		}
		
	}
		
}

// SE O OPERADOR ESTARÁ EM FÉRIAS PARA A DATA SELECIONADA
function verificaFeriasOperador(dia,codColigada,codFilial,codmo){
	
	console.log("vou verificar a disponibilidade do operador em relação ao período das férias")
	
	console.log("dia: "+dia+",codColigada: "+codColigada+", codFilial: "+codFilial+", codmo: "+codmo)
	
	// MONTA O ARRAY DAS CONSTRAINTS
	var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
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

// CALCULA O VALOR A PROGRAMAR
function calculaAprogramar(){
	
	console.log("vou calcular o a programar")
	
	var aprogramarReal = $("#APROGRAMARREAL").val()
	
	$("#SALDOCALC").val("")
	
	// SE A PROGRAMAR REAL CONTÉM ","
	if(aprogramarReal.includes(",")){
		
		aprogramarReal = aprogramarReal.replace(",",".")
		
	}
	
	aprogramarReal = parseFloat(aprogramarReal).toFixed(2)
	
	var saldoCalc = new Array()
	
	// PERCORRE TODAS AS COLUNAS DOS DIAS
	for(var i=1;i<=10;i++){
		
		// PERCORRE TODOS OS REGISTROS DA TABELA
		$("input[id^='DIA"+i+"RADPROG___']").each(function(){
			
			var seq = $(this).attr("id").split("___")[1]
			
			var saldoCalc = 0
			
			var saldo = $("#DIA"+i+"RADPROG___"+seq).val()
			
			// SE SALDO NÃO É NULO OU VAZIO
			if(!(saldo=="" || saldo==null || saldo==undefined)){
				
				// SE SALDO CONTÉM ","
				if(saldo.includes(",")){
					
					saldo = saldo.replace(",",".")
					
				}
				
				saldo = parseFloat(saldo).toFixed(2)
				
				console.log("saldo: "+saldo)
				
				//saldoCalc.push(saldo)
				
				saldoCalc = $("#SALDOCALC").val()
				
				if(saldoCalc=="" || saldoCalc==undefined || saldoCalc==null){
					
					saldoCalc = 0
					
				}
				
				saldoCalc = parseFloat(saldoCalc).toFixed(2)
				
				console.log("saldoCalc: "+saldoCalc)
				
				
				saldoCalc = parseFloat(saldoCalc) + parseFloat(saldo)
				
				console.log("saldoCalc após soma: "+saldoCalc)
				
				$("#SALDOCALC").val(saldoCalc)
				
			}
			
		})
		
	}
	
	/*var saldoTot = 0
	
	for(var i=0;i<saldoCal.length;i++){
		
		saldoTot = saldoTot + parseFloat(saldoCalc[i])
		
	}*/
	
	var saldoCalc = $("#SALDOCALC").val()
	
	saldoCalc = parseFloat(saldoCalc)
	
	console.log("saldoCalc: "+saldoCalc+", aprogramaReal: "+aprogramarReal)
	
	// SE O SALDO CALCULADO É MAIOR QUE O A PROGRAMAR
	if(saldoCalc>aprogramarReal){
		
		console.log("o saldoCalc é maior que o aprogramar")
		
		return true
		
	} else {
		// SE NÃO
		
		console.log("o saldoCalc é menor que o aprogramar")
		
		return false
		
	}
	
}

// PERCORRE A TABELA DE PROGRAMAÇÃO E ATUALIZA O SALDO A PROGRAMAR
function atualizaAprogramar(){
	
	//var saldoCalc = 0
	//var saldoCalc = new Array()
	
	$("#SALDOCALC").val("")
	
	console.log("vou atualizar o programar")
	
	// PERCORRE TODAS AS COLUNAS DOS DIAS
	for(var i=1;i<=10;i++){
		
		// PERCORRE TODOS OS REGISTROS DA TABELA
		$("input[id^='DIA"+i+"RADPROG___']").each(function(){
			
			var seq = $(this).attr("id").split("___")[1]
			
			var saldo = $("#DIA"+i+"RADPROG___"+seq).val()
			var saldoCalc = 0
			
			console.log("vou somar")
			
			// SE SALDO CONTÉM ","
			if(saldo.includes(",")){
				
				saldo = saldo.replace(",",".")
				
			}
			
			saldo = parseFloat(saldo).toFixed(2)
			
			console.log("saldo: "+saldo)
			
			// SE SALDO NÃO É NULO OU VAZIO
			if(!(saldo=="" || saldo==null || saldo==undefined || isNaN(saldo))){
				
				console.log("saldo: "+saldo)
				
				saldoCalc =$("#SALDOCALC").val()
				
				if(saldoCalc=="" || saldoCalc==undefined || saldoCalc==null){
					
					saldoCalc = 0
					
				}
				
				saldoCalc = parseFloat(saldoCalc).toFixed(2)
				
				console.log("saldoCalc: "+saldoCalc)
				
				//saldoCalc = parseFloat(saldoCalc).toFixed(2)
				
				saldoCalc = parseFloat(saldoCalc) + parseFloat(saldo)
				
				console.log("saldoCalc após soma: "+saldoCalc)
				
				$("#SALDOCALC").val(saldoCalc)
				
			}
			
		})
		
	}
	
	var saldoCalc = $("#SALDOCALC").val()
	
	if(!(saldoCalc=="" || saldoCalc==null || saldoCalc==undefined || isNaN(saldoCalc))){

		saldoCalc = parseFloat(saldoCalc).toFixed(2)
		
	} else {
		
		saldoCalc = 0
		
	}
	
	console.log("saldoCalc fora if: "+saldoCalc)
	
	var aprogramar = $("#APROGRAMARREAL").val()
	
	// SE A PROGRAMAR CONTÉM ","
	if(aprogramar.includes(",")){
		
		aprogramar = aprogramar.replace(",",".")
		
	} 
	
	console.log("aprogramar: "+aprogramar)
	
	aprogramar = parseFloat(aprogramar).toFixed(2)
	aprogramar = aprogramar - parseFloat(saldoCalc).toFixed(2)
	
	console.log("aprogramar: "+aprogramar)
	
	$("#APROGRAMAR").val(aprogramar.toFixed(2).toString().replace(".",","))
	
}

// ATUALIZA OS RECURSOS ALOCADOS PARA A ATIVIDADE
/*function atualizaRecAlocadoAtv(){
	
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
						
					} 
					
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
					
					}
					
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
					
					} 
					
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
					
					} 
					
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
					
					} 
					
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
					
					} 
					
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
					
					}
					
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
					
					} 
					
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
					
					} 
					
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
					
					} 
					
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
	
}*/

// EXECUTA A PROCEDURE PARA DESPROGRAMAR
function execProcedureDesprogramar(codColigada,codFilial,codMo,codOrdem,codEstrutura,idAtvOrdem,codAtividade,dia,planoCorte,codInterno){
	
	console.log("vou executar a procedure para desprogramar")
	console.log("codColigada: "+codColigada+", codFilial: "+codFilial+", codMo: "+codMo+", codOrdem: "+codOrdem+", codEstrutura: "+codEstrutura+", idAtvOrdem: "+idAtvOrdem+
			", codAtividade: "+codAtividade+", dia: "+dia+", planoCorte: "+planoCorte)
	
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
	var a11 = DatasetFactory.createConstraint("CODINTERNO",codInterno,codInterno,ConstraintType.MUST)
	var usuario = $("#USUARIOATUAL").val()
	var a12 = DatasetFactory.createConstraint("USUARIOATUAL", usuario, usuario, ConstraintType.MUST);

	var constraints2 = new Array(a1,a2,a3,a4,a5,a6,a7,a9,a10,a11,a12)
	
	var dataset2 = DatasetFactory.getDataset("dsDeleteProgramacao",null,constraints2,null)
	
	console.log("deletei a programação")
	
}

/*
// SELECIONA O DIA PARA REALIZAR A DESPROGRAMAÇÃO
function selecionaDia(obj){
	
	var seq = $(obj).attr("id").split("___")[1]
	
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
			
		} else {
			// SE NÃO
				
			console.log("saldo é diferente de 0")
			
			// COLOCA A SELEÇÃO
			$(obj).addClass("desprogramar")
			
		}
		
	}
	
}*/

// SE JÁ TEM ALGUM DIA SELECIONADO
function temDiaSelecionado(){
	
	console.log("já tem um dia selecionado")

	var ret = false
	
	// PERCORRE TODOS OS REGISTROS
	$("input[id^='OPERADORRADDESP___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		// PERCORRE TODOS OS DIAS
		for(var i=1; i<11; i++){
			
			// SE LINHA TEM A CLASSE DA SELEÇÃO
			if($("#RAD"+i+"DESP___"+seq).hasClass("desprogramar")){
				
				console.log("achei")
				
				ret = true 
				
			}
			
		}
		
	})
	
	return ret
	
}

// BUSCA O SEQ DO SELECIONADO
/*function buscaSeqSelecionado(){
	
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
	
}*/

// LIMPA O CABEÇALHO DA TABELA RAD
function limpaRADCab(){
	
	console.log("entrei para limpar o cabeçalho da tabela RAD")
	
	$("#THDIA1RADCAB").html("")
	$("#THDIA2RADCAB").html("")
	$("#THDIA3RADCAB").html("")
	$("#THDIA4RADCAB").html("")
	$("#THDIA5RADCAB").html("")
	$("#THDIA6RADCAB").html("")
	$("#THDIA7RADCAB").html("")
	$("#THDIA8RADCAB").html("")
	$("#THDIA9RADCAB").html("")
	$("#THDIA10RADCAB").html("")
	
	$("#THDIA1RADCAB").removeClass("visivel")
	$("#THDIA2RADCAB").removeClass("visivel")
	$("#THDIA3RADCAB").removeClass("visivel")
	$("#THDIA4RADCAB").removeClass("visivel")
	$("#THDIA5RADCAB").removeClass("visivel")
	$("#THDIA6RADCAB").removeClass("visivel")
	$("#THDIA7RADCAB").removeClass("visivel")
	$("#THDIA8RADCAB").removeClass("visivel")
	$("#THDIA9RADCAB").removeClass("visivel")
	$("#THDIA10RADCAB").removeClass("visivel")
	
}	

// LIMPA O CABEÇALHO DA TABELA RAD
function limpaRADCabDesp(){
	
	console.log("entrei para limpar o cabeçalho da tabela RAD")
	
	$("#THDIA1RADCABDESP").html("")
	$("#THDIA2RADCABDESP").html("")
	$("#THDIA3RADCABDESP").html("")
	$("#THDIA4RADCABDESP").html("")
	$("#THDIA5RADCABDESP").html("")
	$("#THDIA6RADCABDESP").html("")
	$("#THDIA7RADCABDESP").html("")
	$("#THDIA8RADCABDESP").html("")
	$("#THDIA9RADCABDESP").html("")
	$("#THDIA10RADCABDESP").html("")
	
	$("#THDIA1RADCABDESP").removeClass("visivel")
	$("#THDIA2RADCABDESP").removeClass("visivel")
	$("#THDIA3RADCABDESP").removeClass("visivel")
	$("#THDIA4RADCABDESP").removeClass("visivel")
	$("#THDIA5RADCABDESP").removeClass("visivel")
	$("#THDIA6RADCABDESP").removeClass("visivel")
	$("#THDIA7RADCABDESP").removeClass("visivel")
	$("#THDIA8RADCABDESP").removeClass("visivel")
	$("#THDIA9RADCABDESP").removeClass("visivel")
	$("#THDIA10RADCABDESP").removeClass("visivel")

}	

// LIMPA A TABELA RAD
function limpaRAD(){
	
	console.log("entrei para limpar a tabela RAD")
	
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

// LIMPA A TABELA RAD
function limpaRADDesp(){
	
	console.log("entrei para limpar a tabela RAD")
	
	// LIMPA CONTEÚDO DA TABELA
	$("input[id^='OPERADORRADDESP___']").each(function(){
	
		$(this).parents("tr").remove();
		
	})
	
	$("#THDIA1RADDESP").html("")
	$("#THDIA2RADDESP").html("")
	$("#THDIA3RADDESP").html("")
	$("#THDIA4RADDESP").html("")
	$("#THDIA5RADDESP").html("")
	$("#THDIA6RADDESP").html("")
	$("#THDIA7RADDESP").html("")
	$("#THDIA8RADDESP").html("")
	$("#THDIA9RADDESP").html("")
	$("#THDIA10RADDESP").html("")
	
	$("#THDIA1RADDESP").removeClass("visivel")
	$("#THDIA2RADDESP").removeClass("visivel")
	$("#THDIA3RADDESP").removeClass("visivel")
	$("#THDIA4RADDESP").removeClass("visivel")
	$("#THDIA5RADDESP").removeClass("visivel")
	$("#THDIA6RADDESP").removeClass("visivel")
	$("#THDIA7RADDESP").removeClass("visivel")
	$("#THDIA8RADDESP").removeClass("visivel")
	$("#THDIA9RADDESP").removeClass("visivel")
	$("#THDIA10RADDESP").removeClass("visivel")
	
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
function carregaRADcompleta(codAtividade,myLoading2){
	
	console.log("vou carregar a RAD completa para o codAtividade "+codAtividade)
	
	//var myLoading2 = FLUIGC.loading(window);
	
	var dataDe = $("#DATA_DE").val()
	var dataAte = $("#ATE").val()
	
	dataDe = formataDataBanco(dataDe)
	dataAte = formataDataBanco(dataAte)
	
	console.log("dataDe: "+dataDe)
	console.log("dataAte: "+dataAte)
	
	myLoading2.show();
	
	var dia1 = $("#THDIA1RADCAB").children().children().text()
	console.log("dia1: "+dia1)
	if(!(dia1=="")){
		dia1 = formataDataBanco(dia1)	
		console.log("dia1: "+dia1)
	}
	
	var dia2 = $("#THDIA2RADCAB").children().children().text()
	console.log("dia2: "+dia2)
	if(!(dia2=="")){
		dia2 = formataDataBanco(dia2)	
		console.log("dia2: "+dia2)
	}
	
	var dia3 = $("#THDIA3RADCAB").children().children().text()
	console.log("dia3: "+dia3)
	if(!(dia3=="")){
		dia3 = formataDataBanco(dia3)	
		console.log("dia3: "+dia3)
	}
	
	var dia4 = $("#THDIA4RADCAB").children().children().text()
	console.log("dia4: "+dia4)
	if(!(dia4=="")){
		dia4 = formataDataBanco(dia4)	
		console.log("dia4: "+dia4)
	}
	
	var dia5 = $("#THDIA5RADCAB").children().children().text()
	console.log("dia5: "+dia5)
	if(!(dia5=="")){
		dia5 = formataDataBanco(dia5)
		console.log("dia5: "+dia5)
	}
	
	var dia6 = $("#THDIA6RADCAB").children().children().text()
	console.log("dia6: "+dia6)
	if(!(dia6=="")){
		dia6 = formataDataBanco(dia6)	
		console.log("dia6: "+dia6)
	}
	
	var dia7 = $("#THDIA7RADCAB").children().children().text()
	console.log("dia7: "+dia7)
	if(!(dia7=="")){
		dia7 = formataDataBanco(dia7)	
		console.log("dia7: "+dia7)
	}
	
	var dia8 = $("#THDIA8RADCAB").children().children().text()
	console.log("dia8: "+dia8)
	if(!(dia8=="")){
		dia8 = formataDataBanco(dia8)	
		console.log("dia8: "+dia8)
	}
	
	var dia9 = $("#THDIA9RADCAB").children().children().text()
	console.log("dia9: "+dia9)
	if(!(dia9=="")){
		dia9 = formataDataBanco(dia9)	
		console.log("dia9: "+dia9)
	}
	
	var dia10 = $("#THDIA10RADCAB").children().children().text()
	console.log("dia10: "+dia10)
	if(!(dia10=="")){
		dia10 = formataDataBanco(dia10)	
		console.log("dia10: "+dia10)
	}
	
	// INICIA A OPERAÇÃO DEPOIS DE CARREGAR O LOAD
	setTimeout(function(){

		var a1 = DatasetFactory.createConstraint("CODATIVIDADE",codAtividade,codAtividade,ConstraintType.MUST)
		var a2 = DatasetFactory.createConstraint("DATA_DE",dataDe,dataDe,ConstraintType.MUST)
		var a3 = DatasetFactory.createConstraint("DATA_ATE",dataAte,dataAte,ConstraintType.MUST)
		
		var constraints = new Array(a1,a2,a3)
		
		var dataset = DatasetFactory.getDataset("dsRecAptoDispOS",null,constraints,null)
		var row = dataset.values
		
		console.log("retorno do dsRecAptoDispOS ")
		console.log(row)
		
		// SE RETORNO NÃO É VAZIO OU NULO
		if(!(row=="" || row==null || row==undefined)){
			
			var count = row.length
			
			// PERCORRE TODOS OS REGISTROS
			for(var i=0; i<count; i++){

				var rep = row[i]
				
				// SE CHAPA NÃO É NULA OU VAZIA
				if(!(rep["CHAPA"]==null || rep["CHAPA"]=="null" || rep["CHAPA"]==undefined)){
					
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
							
							var saldoDisp = parseFloat(rep["SALDO"])
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
								
								$("#DIA1RAD___"+seqTabela).val(saldoDisp.toFixed(2).toString().replace(".",","))
								
							} 
							
						}
						
						// SE DIA2 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia2==dataDisp){

							var saldoDisp = parseFloat(rep["SALDO"])
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
								$("#DIA2RAD___"+seqTabela).val(saldoDisp.toFixed(2).toString().replace(".",","))
							
							} 
							
						}
						
						// SE DIA3 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia3==dataDisp){
							
							var saldoDisp = parseFloat(rep["SALDO"])
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
								$("#DIA3RAD___"+seqTabela).val(saldoDisp.toFixed(2).toString().replace(".",","))
							
							} 
							
						}
						
						// SE DIA4 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia4==dataDisp){
							
							var saldoDisp = parseFloat(rep["SALDO"])
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
								$("#DIA4RAD___"+seqTabela).val(saldoDisp.toFixed(2).toString().replace(".",","))
							
							} 
							
						}
						
						// SE DIA5 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia5==dataDisp){
							
							var saldoDisp = parseFloat(rep["SALDO"])
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
								$("#DIA5RAD___"+seqTabela).val(saldoDisp.toFixed(2).toString().replace(".",","))
							
							} 
							
						}
						
						// SE DIA6 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia6==dataDisp){
							
							var saldoDisp = parseFloat(rep["SALDO"])
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
								$("#DIA6RAD___"+seqTabela).val(saldoDisp.toFixed(2).toString().replace(".",","))
							
							} 
							
						}
						
						// SE DIA7 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia7==dataDisp){
							
							var saldoDisp = parseFloat(rep["SALDO"])
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
								$("#DIA7RAD___"+seqTabela).val(saldoDisp.toFixed(2).toString().replace(".",","))
							
							} 
							
						}
						
						// SE DIA8 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia8==dataDisp){
							
							var saldoDisp = parseFloat(rep["SALDO"])
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
								$("#DIA8RAD___"+seqTabela).val(saldoDisp.toFixed(2).toString().replace(".",","))
							
							}
							
						}
						
						// SE DIA9 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia9==dataDisp){
							
							var saldoDisp = parseFloat(rep["SALDO"])
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
								$("#DIA9RAD___"+seqTabela).val(saldoDisp.toFixed(2).toString().replace(".",","))
							
							}
							
						}
						
						// SE DIA10 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia10==dataDisp){
							
							var saldoDisp = parseFloat(rep["SALDO"])
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
								$("#DIA10RAD___"+seqTabela).val(saldoDisp.toFixed(2).toString().replace(".",","))
							
							} 
							
						}
						
					} else {
					// SE NÃO 
					
						var seqTabela = addRAD()
						
						$("#OPERADORRAD___"+seqTabela).val(rep["NOME"])
						$("#CHAPARAD___"+seqTabela).val(rep["CHAPA"])
						$("#TURNOOPERADORRAD___"+seqTabela).val(rep["TURNO"])
						
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
						
						var dataDisp = rep["DATADISPONIBILIDADE"]
						dataDisp = dataDisp.split(" ")
						dataDisp = dataDisp[0]
						
						console.log("dia1: "+dia1+", dia2: "+dia2+", dia3: "+dia3+", dia4: "+dia4+", dia5: "+dia5+", dia6: "+dia6+
								", dia7: "+dia7+", dia8: "+dia8+", dia9: "+dia9+", dia10: "+dia10)
						
						console.log("dataDisp: "+dataDisp)
						
						// SE DIA1 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia1==dataDisp){
							
							console.log("dia1 está na tabela")
							
							var saldoDisp= parseFloat(rep["SALDO"])
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
								
								$("#DIA1RAD___"+seqTabela).val(saldoDisp.toFixed(2).toString().replace(".",","))
								
							} 
							
						}
						
						// SE DIA2 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia2==dataDisp){
							
							console.log("dia2 está na tabela")
							
							var saldoDisp = parseFloat(rep["SALDO"])
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
								$("#DIA2RAD___"+seqTabela).val(saldoDisp.toFixed(2).toString().replace(".",","))
							
							} 
							
						}
						
						// SE DIA3 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia3==dataDisp){
							
							console.log("dia3 está na tabela")
							
							var saldoDisp = parseFloat(rep["SALDO"])
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
								$("#DIA3RAD___"+seqTabela).val(saldoDisp.toFixed(2).toString().replace(".",","))
							
							} 
							
						}
						
						// SE DIA4 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia4==dataDisp){
							
							console.log("dia4 está na tabela")
							
							var saldoDisp = parseFloat(rep["SALDO"])
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
								$("#DIA4RAD___"+seqTabela).val(saldoDisp.toFixed(2).toString().replace(".",","))
							
							} 
							
						}
						
						// SE DIA5 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia5==dataDisp){
							
							console.log("dia5 está na tabela")
							
							var saldoDisp = parseFloat(rep["SALDO"])
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
								$("#DIA5RAD___"+seqTabela).val(saldoDisp.toFixed(2).toString().replace(".",","))
							
							} 
							
						}
						
						// SE DIA6 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia6==dataDisp){
							
							console.log("dia6 está na tabela")
							
							var saldoDisp = parseFloat(rep["SALDO"])
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
								$("#DIA6RAD___"+seqTabela).val(saldoDisp.toFixed(2).toString().replace(".",","))
							
							} 
							
						}
						
						// SE DIA7 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia7==dataDisp){
							
							console.log("dia7 está na tabela")
							
							var saldoDisp = parseFloat(rep["SALDO"])
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
								$("#DIA7RAD___"+seqTabela).val(saldoDisp.toFixed(2).toString().replace(".",","))
							
							} 
							
						}
						
						// SE DIA8 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia8==dataDisp){
							
							console.log("dia8 está na tabela")
							
							var saldoDisp = parseFloat(rep["SALDO"])
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
								$("#DIA8RAD___"+seqTabela).val(saldoDisp.toFixed(2).toString().replace(".",","))
							
							} 
							
						}
						
						// SE DIA9 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia9==dataDisp){
							
							console.log("dia9 está na tabela")
							
							var saldoDisp = parseFloat(rep["SALDO"])
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
								$("#DIA9RAD___"+seqTabela).val(saldoDisp.toFixed(2).toString().replace(".",","))
							
							} 
							
						}
						
						// SE DIA10 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia10==dataDisp){
							
							console.log("dia10 está na tabela")
							
							var saldoDisp = parseFloat(rep["SALDO"])
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
								$("#DIA10RAD___"+seqTabela).val(saldoDisp.toFixed(2).toString().replace(".",","))
							
							} 
							
						}
						
					}
			
					
				}
									
				// CALCULA SOMA DOS RECURSOS ALOCADOS
				//calculaSomaRecAptosDisp(rowSoma)
				
			}
				
			//$(".RAD").hide()
			
			// BUSCA O TOTAL DE TEMPO DO PLANO E DO QUE FOI ALOCADO
			buscaTotalPlanAloc()
			
			$(".PLANEJAMENTO").show()
			$(".PROGRAMACAO").show()
			//$(".RAD").show()
			$(".TOTALIZADOR").show()
			
			// REDUZ O CONTEÚDO DO DETALHAMENTO DO ITEM
			reduzir()
			
			myLoading2.hide();
			
		}  else {
			
			myLoading2.hide();
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'Não foram encontrados registros para os filtros informados',
				  text: 'Verifique e tente novamente.'
			})
			
		}
		
	}, 500)

}

// BUSCA O TOTAL DE TEMPO DO PLANO E DO QUE FOI ALOCADO
function buscaTotalPlanAlocDesp(){

	console.log("vou buscar o total do tempo do plano e do que foi alocado")
	
	var codColigada = $("#CODCOLIGADADESP").val()
	var codFilial = $("#CODFILIALDESP").val()
	var numPlano = $("#NUMPLANOCORTEREALDESP").val()
	
	var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("NUMPLANOCORTE",numPlano,numPlano,ConstraintType.MUST)
	
	var constraints = new Array(a1,a2,a3)
	
	var dataset = DatasetFactory.getDataset("dsBuscaTotalProgAlocOS",null,constraints,null)
	var row = dataset.values
	
	console.log("row")
	console.log(row)
	
	// SE RETORNO NÃO É NULO OU VAZIO
	if(!(row=="" || row==null || row==undefined)){
		
		var rep = row[0]
		
		// SE SALDO ALOCADO NÃO É NULO OU VAZIO
		if(!(rep["SALDO_ALOCADO"]=="" || rep["SALDO_ALOCADO"]==null || rep["SALDO_ALOCADO"]==undefined || rep["SALDO_ALOCADO"]=="null")){
			
			var alocado = parseFloat(rep["SALDO_ALOCADO"]).toFixed(2)
			var total = parseFloat(rep["TEMPO_TOTAL"]).toFixed(2)
			
			console.log("alocado: "+alocado+", total: "+total)
			
			var aprogramar = total - alocado
			
			console.log("aprogramar: "+aprogramar)
			
			$("#TOTALHORASPAPCDESP").val(total.toString().replace(".",","))
			$("#APROGRAMARDESP").val(aprogramar.toFixed(2).toString().replace(".",","))
			$("#APROGRAMARDESPREAL").val(aprogramar.toFixed(2).toString().replace(".",","))
			
		} else {
			// SE NÃO
			
			var alocado = 0
			var total = parseFloat(rep["TEMPO_TOTAL"]).toFixed(2)
			
			console.log("alocado: "+alocado+", total: "+total)

			var aprogramar = total - alocado
			
			console.log("aprogramar: "+aprogramar)
			
			$("#TOTALHORASPAPCDESP").val(total.toString().replace(".",","))
			$("#APROGRAMARDESP").val(aprogramar.toFixed(2).toString().replace(".",","))
			$("#APROGRAMARDESPREAL").val(aprogramar.toFixed(2).toString().replace(".",","))
			
		}
		
	}
	
}

// BUSCA O TOTAL DE TEMPO DO PLANO E DO QUE FOI ALOCADO
function buscaTotalPlanAloc(){

	console.log("vou buscar o total do tempo do plano e do que foi alocado")
	
	var codColigada = $("#CODCOLIGADA").val()
	var codFilial = $("#CODFILIAL").val()
	var numPlano = $("#NUMPLANOCORTEREAL").val()
	
	var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("NUMPLANOCORTE",numPlano,numPlano,ConstraintType.MUST)
	
	var constraints = new Array(a1,a2,a3)
	
	var dataset = DatasetFactory.getDataset("dsBuscaTotalProgAlocOS",null,constraints,null)
	var row = dataset.values
	
	console.log("row")
	console.log(row)
	
	// SE RETORNO NÃO É NULO OU VAZIO
	if(!(row=="" || row==null || row==undefined)){
		
		var rep = row[0]
		
		// SE SALDO ALOCADO NÃO É NULO OU VAZIO
		if(!(rep["SALDO_ALOCADO"]=="" || rep["SALDO_ALOCADO"]==null || rep["SALDO_ALOCADO"]==undefined || rep["SALDO_ALOCADO"]=="null")){
			
			var alocado = parseFloat(rep["SALDO_ALOCADO"])
			var total = parseFloat(rep["TEMPO_TOTAL"])
			
			alocado = alocado.toFixed(2)
			total = total.toFixed(2)
			
			console.log("alocado: "+alocado)
			console.log("total: "+total)
			
			var aprogramar = total - alocado
			
			console.log("aprogramar: "+aprogramar)
			
			$("#TOTALHORASPAPC").val(total.toString().replace(".",","))
			$("#APROGRAMAR").val(aprogramar.toFixed(2).toString().replace(".",","))
			$("#APROGRAMARREAL").val(aprogramar.toFixed(2).toString().replace(".",","))
			
		} else {
			// SE NÃO
			
			var alocado = 0
			var total = parseFloat(rep["TEMPO_TOTAL"])
			
			total = total.toFixed(2)
			
			var aprogramar = total - alocado
			
			$("#TOTALHORASPAPC").val(total.toString().replace(".",","))
			$("#APROGRAMAR").val(aprogramar.toFixed(2).toString().replace(".",","))
			$("#APROGRAMARREAL").val(aprogramar.toFixed(2).toString().replace(".",","))
			
		}
		
	}
	
}

// CARREGA A TABELA RAD GERAL PARA A ATIVIDADE SELECIONADA
function carregaRADcompletaDesp(codAtividade,numPlano,myLoading2){
	
	console.log("vou carregar a RAD completa para desprogramar para o codAtividade "+codAtividade+" e numPlano "+numPlano)
	
	//var myLoading2 = FLUIGC.loading(window);
	
	var dataDe = $("#DATA_DE_DESP").val()
	var dataAte = $("#ATE_DESP").val()
	
	dataDe = formataDataBanco(dataDe)
	dataAte = formataDataBanco(dataAte)
	
	console.log("dataDe: "+dataDe)
	console.log("dataAte: "+dataAte)
	
	myLoading2.show();
	
	var dia1 = $("#THDIA1RADCABDESP").children().children().text()
	console.log("dia1: "+dia1)
	if(!(dia1=="")){
		dia1 = formataDataBanco(dia1)	
		console.log("dia1: "+dia1)
	}
	
	var dia2 = $("#THDIA2RADCABDESP").children().children().text()
	console.log("dia2: "+dia2)
	if(!(dia2=="")){
		dia2 = formataDataBanco(dia2)	
		console.log("dia2: "+dia2)
	}
	
	var dia3 = $("#THDIA3RADCABDESP").children().children().text()
	console.log("dia3: "+dia3)
	if(!(dia3=="")){
		dia3 = formataDataBanco(dia3)	
		console.log("dia3: "+dia3)
	}
	
	var dia4 = $("#THDIA4RADCABDESP").children().children().text()
	console.log("dia4: "+dia4)
	if(!(dia4=="")){
		dia4 = formataDataBanco(dia4)	
		console.log("dia4: "+dia4)
	}
	
	var dia5 = $("#THDIA5RADCABDESP").children().children().text()
	console.log("dia5: "+dia5)
	if(!(dia5=="")){
		dia5 = formataDataBanco(dia5)
		console.log("dia5: "+dia5)
	}
	
	var dia6 = $("#THDIA6RADCABDESP").children().children().text()
	console.log("dia6: "+dia6)
	if(!(dia6=="")){
		dia6 = formataDataBanco(dia6)	
		console.log("dia6: "+dia6)
	}
	
	var dia7 = $("#THDIA7RADCABDESP").children().children().text()
	console.log("dia7: "+dia7)
	if(!(dia7=="")){
		dia7 = formataDataBanco(dia7)	
		console.log("dia7: "+dia7)
	}
	
	var dia8 = $("#THDIA8RADCABDESP").children().children().text()
	console.log("dia8: "+dia8)
	if(!(dia8=="")){
		dia8 = formataDataBanco(dia8)	
		console.log("dia8: "+dia8)
	}
	
	var dia9 = $("#THDIA9RADCABDESP").children().children().text()
	console.log("dia9: "+dia9)
	if(!(dia9=="")){
		dia9 = formataDataBanco(dia9)	
		console.log("dia9: "+dia9)
	}
	
	var dia10 = $("#THDIA10RADCABDESP").children().children().text()
	console.log("dia10: "+dia10)
	if(!(dia10=="")){
		dia10 = formataDataBanco(dia10)	
		console.log("dia10: "+dia10)
	}
	
	// INICIA A OPERAÇÃO DEPOIS DE CARREGAR O LOAD
	setTimeout(function(){

		var a1 = DatasetFactory.createConstraint("CODATIVIDADE",codAtividade,codAtividade,ConstraintType.MUST)
		var a2 = DatasetFactory.createConstraint("NUMPLANOCORTE",numPlano,numPlano,ConstraintType.MUST)
		var a3 = DatasetFactory.createConstraint("DTHRINICIAL",dataDe,dataDe,ConstraintType.MUST)
		var a4 = DatasetFactory.createConstraint("DTHRFINAL",dataAte,dataAte,ConstraintType.MUST)
		
		var constraints = new Array(a1,a2,a3,a4)
		
		var dataset = DatasetFactory.getDataset("dsBuscaRecAlocPlanoCorteOS",null,constraints,null)
		var row = dataset.values
		
		console.log("retorno do dsBuscaRecAlocPlanoCorteOS ")
		console.log(row)
		
		// SE RETORNO NÃO É VAZIO OU NULO
		if(!(row=="" || row==null || row==undefined)){
			
			var count = row.length
			
			// PERCORRE TODOS OS REGISTROS
			for(var i=0; i<count; i++){

				var rep = row[i]
				
				// SE CHAPA NÃO É NULA OU VAZIA
				if(!(rep["CODMO"]==null || rep["CODMO"]=="null" || rep["CODMO"]==undefined)){
					
					// SE JÁ CONTÉM A CHAPA	
					if(contemChapaRADDesp(rep["CODMO"])){
						
						console.log("registro "+i+" já está na tabela")
						
						// BUSCA O SEQ DO OPERADOR
						var seqTabela = buscaSeqChapaRADDesp(rep["CODMO"])
						
						/*$("#CODORDEMDESP___"+seqTabela).val($("#CODORDEMDESP___"+seqTabela).val()+","+rep["CODORDEM"])
						$("#CODESTRUTURADESP___"+seqTabela).val($("#CODESTRUTURADESP___"+seqTabela).val()+","+rep["CODESTRUTURA"])
						$("#CODATIVIDADEDESP___"+seqTabela).val($("#CODATIVIDADEDESP___"+seqTabela).val()+","+rep["CODATIVIDADE"])
						$("#IDATVORDEMDESP___"+seqTabela).val($("#IDATVORDEMDESP___"+seqTabela).val()+","+rep["IDATVORDEM"])*/
						
						//var dataDisp = rep["DTHRFINAL"]
						var dataDisp = rep["DTHRINICIAL"]
						dataDisp = dataDisp.split(" ")
						dataDisp = dataDisp[0]
						
						console.log("dia1: "+dia1+", dia2: "+dia2+", dia3: "+dia3+", dia4: "+dia4+", dia5: "+dia5+", dia6: "+dia6+
								", dia7: "+dia7+", dia8: "+dia8+", dia9: "+dia9+", dia10: "+dia10)
						
						console.log("dataDisp: "+dataDisp)
						
						// SE DIA1 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia1==dataDisp){
							
							var saldoDisp = parseFloat(rep["SALDO_ALOCADO"])
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
								
								var saldoAtual = $("#DIA1RADDESP___"+seqTabela).val()
								saldoAtual = parseFloat(saldoAtual.replace(",","."))
								
								saldoDisp = saldoAtual + saldoDisp
								
								$("#DIA1RADDESP___"+seqTabela).val(saldoDisp.toFixed(2).toString().replace(".",","))
								
							} 
							
						}
						
						// SE DIA2 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia2==dataDisp){
							
							console.log("dia2 "+dia2+" é igual ao dia "+dataDisp)
							
							var saldoDisp = parseFloat(rep["SALDO_ALOCADO"])
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
								var saldoAtual = $("#DIA2RADDESP___"+seqTabela).val()
								saldoAtual = parseFloat(saldoAtual.replace(",","."))
								console.log("saldoAtual: "+saldoAtual)
								console.log("saldoDisp: "+saldoDisp)
								saldoDisp = saldoAtual + saldoDisp
								console.log("saldoDisp após a soma: "+saldoDisp)
								
								$("#DIA2RADDESP___"+seqTabela).val(saldoDisp.toFixed(2).toString().replace(".",","))
							
							} 
							
						}
						
						// SE DIA3 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia3==dataDisp){
							
							var saldoDisp = parseFloat(rep["SALDO_ALOCADO"])
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
								
								var saldoAtual = $("#DIA3RADDESP___"+seqTabela).val()
								saldoAtual = parseFloat(saldoAtual.replace(",","."))
								
								saldoDisp = saldoAtual + saldoDisp
								
								$("#DIA3RADDESP___"+seqTabela).val(saldoDisp.toFixed(2).toString().replace(".",","))
							
							} 
							
						}
						
						// SE DIA4 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia4==dataDisp){
							
							var saldoDisp = parseFloat(rep["SALDO_ALOCADO"])
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
								
								var saldoAtual = $("#DIA4RADDESP___"+seqTabela).val()
								saldoAtual = parseFloat(saldoAtual.replace(",","."))
								
								saldoDisp = saldoAtual + saldoDisp
								
								$("#DIA4RADDESP___"+seqTabela).val(saldoDisp.toFixed(2).toString().replace(".",","))
							
							} 
							
						}
						
						// SE DIA5 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia5==dataDisp){
							
							var saldoDisp = parseFloat(rep["SALDO_ALOCADO"])
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
								
								var saldoAtual = $("#DIA5RADDESP___"+seqTabela).val()
								saldoAtual = parseFloat(saldoAtual.replace(",","."))
								
								saldoDisp = saldoAtual + saldoDisp
								
								$("#DIA5RADDESP___"+seqTabela).val(saldoDisp.toFixed(2).toString().replace(".",","))
							
							}
							
						}
						
						// SE DIA6 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia6==dataDisp){
							
							var saldoDisp = parseFloat(rep["SALDO_ALOCADO"])
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
								
								var saldoAtual = $("#DIA6RADDESP___"+seqTabela).val()
								saldoAtual = parseFloat(saldoAtual.replace(",","."))
								
								saldoDisp = saldoAtual + saldoDisp
								
								$("#DIA6RADDESP___"+seqTabela).val(saldoDisp.toFixed(2).toString().replace(".",","))
							
							}
							
						}
						
						// SE DIA7 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia7==dataDisp){
							
							var saldoDisp = parseFloat(rep["SALDO_ALOCADO"])
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
								
								var saldoAtual = $("#DIA7RADDESP___"+seqTabela).val()
								saldoAtual = parseFloat(saldoAtual.replace(",","."))
								
								saldoDisp = saldoAtual + saldoDisp
								
								$("#DIA7RADDESP___"+seqTabela).val(saldoDisp.toFixed(2).toString().replace(".",","))
							
							} 
							
						}
						
						// SE DIA8 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia8==dataDisp){
							
							var saldoDisp = parseFloat(rep["SALDO_ALOCADO"])
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
								
								var saldoAtual = $("#DIA8RADDESP___"+seqTabela).val()
								saldoAtual = parseFloat(saldoAtual.replace(",","."))
								
								saldoDisp = saldoAtual + saldoDisp
								
								$("#DIA8RADDESP___"+seqTabela).val(saldoDisp.toFixed(2).toString().replace(".",","))
							
							} 
							
						}
						
						// SE DIA9 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia9==dataDisp){
							
							var saldoDisp = parseFloat(rep["SALDO_ALOCADO"])
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
								
								var saldoAtual = $("#DIA9RADDESP___"+seqTabela).val()
								saldoAtual = parseFloat(saldoAtual.replace(",","."))
								
								saldoDisp = saldoAtual + saldoDisp
								
								$("#DIA9RADDESP___"+seqTabela).val(saldoDisp.toFixed(2).toString().replace(".",","))
							
							} 
							
						}
						
						// SE DIA10 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia10==dataDisp){
							
							var saldoDisp = parseFloat(rep["SALDO_ALOCADO"])
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
								
								var saldoAtual = $("#DIA10RADDESP___"+seqTabela).val()
								saldoAtual = parseFloat(saldoAtual.replace(",","."))
								
								saldoDisp = saldoAtual + saldoDisp
								
								$("#DIA10RADDESP___"+seqTabela).val(saldoDisp.toFixed(2).toString().replace(".",","))
							
							} 
							
						}
						
					} else {
					// SE NÃO 
					
						var seqTabela = addRADDesp()
						
						$("#OPERADORRADDESP___"+seqTabela).val(rep["NOME"])
						$("#CHAPARADDESP___"+seqTabela).val(rep["CODMO"])
						$("#TURNOOPERADORRADDESP___"+seqTabela).val(rep["TURNO"])
						$("#CODORDEMDESP___"+seqTabela).val(rep["CODORDEM"])
						$("#IDATVORDEMDESP___"+seqTabela).val(rep["IDATVORDEM"])
						$("#CODATIVIDADEDESP___"+seqTabela).val(rep["CODATIVIDADE"])
						$("#CODESTRUTURADESP___"+seqTabela).val(rep["CODESTRUTURA"])
						
						$("#DIA1RADREALDESP___"+seqTabela).val(dia1)
						$("#DIA2RADREALDESP___"+seqTabela).val(dia2)
						$("#DIA3RADREALDESP___"+seqTabela).val(dia3)
						$("#DIA4RADREALDESP___"+seqTabela).val(dia4)
						$("#DIA5RADREALDESP___"+seqTabela).val(dia5)
						$("#DIA6RADREALDESP___"+seqTabela).val(dia6)
						$("#DIA7RADREALDESP___"+seqTabela).val(dia7)
						$("#DIA8RADREALDESP___"+seqTabela).val(dia8)
						$("#DIA9RADREALDESP___"+seqTabela).val(dia9)
						$("#DIA10RADREALDESP___"+seqTabela).val(dia10)
						
						$("#DIA1RADDESP___"+seqTabela).val(0)
						$("#DIA2RADDESP___"+seqTabela).val(0)
						$("#DIA3RADDESP___"+seqTabela).val(0)
						$("#DIA4RADDESP___"+seqTabela).val(0)
						$("#DIA5RADDESP___"+seqTabela).val(0)
						$("#DIA6RADDESP___"+seqTabela).val(0)
						$("#DIA7RADDESP___"+seqTabela).val(0)
						$("#DIA8RADDESP___"+seqTabela).val(0)
						$("#DIA9RADDESP___"+seqTabela).val(0)
						$("#DIA10RADDESP___"+seqTabela).val(0)
						
						//var dataDisp = rep["DTHRFINAL"]
						var dataDisp = rep["DTHRINICIAL"]
						dataDisp = dataDisp.split(" ")
						dataDisp = dataDisp[0]
						
						console.log("dia1: "+dia1+", dia2: "+dia2+", dia3: "+dia3+", dia4: "+dia4+", dia5: "+dia5+", dia6: "+dia6+
								", dia7: "+dia7+", dia8: "+dia8+", dia9: "+dia9+", dia10: "+dia10)
						
						console.log("dataDisp: "+dataDisp)
						
						// SE DIA1 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia1==dataDisp){
							
							console.log("dia1 está na tabela")
							
							var saldoDisp= parseFloat(rep["SALDO_ALOCADO"])
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
								
								var saldoAtual = $("#DIA1RADDESP___"+seqTabela).val()
								saldoAtual = parseFloat(saldoAtual.replace(",","."))
								
								saldoDisp = saldoAtual + saldoDisp
								
								$("#DIA1RADDESP___"+seqTabela).val(saldoDisp.toFixed(2).toString().replace(".",","))
								
							} 
							
						}
						
						// SE DIA2 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia2==dataDisp){
							
							console.log("dia2 está na tabela")
							
							var saldoDisp = parseFloat(rep["SALDO_ALOCADO"])
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
								
								var saldoAtual = $("#DIA2RADDESP___"+seqTabela).val()
								saldoAtual = parseFloat(saldoAtual.replace(",","."))
								
								saldoDisp = saldoAtual + saldoDisp
								
								$("#DIA2RADDESP___"+seqTabela).val(saldoDisp.toFixed(2).toString().replace(".",","))
							
							} 
							
						}
						
						// SE DIA3 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia3==dataDisp){
							
							console.log("dia3 está na tabela")
							
							var saldoDisp = parseFloat(rep["SALDO_ALOCADO"])
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
								
								var saldoAtual = $("#DIA3RADDESP___"+seqTabela).val()
								saldoAtual = parseFloat(saldoAtual.replace(",","."))
								
								saldoDisp = saldoAtual + saldoDisp
								
								$("#DIA3RADDESP___"+seqTabela).val(saldoDisp.toFixed(2).toString().replace(".",","))
							
							} 
							
						}
						
						// SE DIA4 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia4==dataDisp){
							
							console.log("dia4 está na tabela")
							
							var saldoDisp = parseFloat(rep["SALDO_ALOCADO"])
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
								
								var saldoAtual = $("#DIA4RADDESP___"+seqTabela).val()
								saldoAtual = parseFloat(saldoAtual.replace(",","."))
								
								saldoDisp = saldoAtual + saldoDisp
								
								$("#DIA4RADDESP___"+seqTabela).val(saldoDisp.toFixed(2).toString().replace(".",","))
							
							} 
							
						}
						
						// SE DIA5 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia5==dataDisp){
							
							console.log("dia5 está na tabela")
							
							var saldoDisp = parseFloat(rep["SALDO_ALOCADO"])
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
								
								var saldoAtual = $("#DIA5RADDESP___"+seqTabela).val()
								saldoAtual = parseFloat(saldoAtual.replace(",","."))
								
								saldoDisp = saldoAtual + saldoDisp
								
								$("#DIA5RADDESP___"+seqTabela).val(saldoDisp.toFixed(2).toString().replace(".",","))
							
							} 
							
						}
						
						// SE DIA6 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia6==dataDisp){
							
							console.log("dia6 está na tabela")
							
							var saldoDisp = parseFloat(rep["SALDO_ALOCADO"])
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
								
								var saldoAtual = $("#DIA6RADDESP___"+seqTabela).val()
								saldoAtual = parseFloat(saldoAtual.replace(",","."))
								
								saldoDisp = saldoAtual + saldoDisp
								
								$("#DIA6RADDESP___"+seqTabela).val(saldoDisp.toFixed(2).toString().replace(".",","))
							
							} 
							
						}
						
						// SE DIA7 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia7==dataDisp){
							
							console.log("dia7 está na tabela")
							
							var saldoDisp = parseFloat(rep["SALDO_ALOCADO"])
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
								
								var saldoAtual = $("#DIA7RADDESP___"+seqTabela).val()
								saldoAtual = parseFloat(saldoAtual.replace(",","."))
								
								saldoDisp = saldoAtual + saldoDisp
								
								$("#DIA7RADDESP___"+seqTabela).val(saldoDisp.toFixed(2).toString().replace(".",","))
							
							} 
							
						}
						
						// SE DIA8 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia8==dataDisp){
							
							console.log("dia8 está na tabela")
							
							var saldoDisp = parseFloat(rep["SALDO_ALOCADO"])
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
								
								var saldoAtual = $("#DIA8RADDESP___"+seqTabela).val()
								saldoAtual = parseFloat(saldoAtual.replace(",","."))
								
								saldoDisp = saldoAtual + saldoDisp
								
								$("#DIA8RADDESP___"+seqTabela).val(saldoDisp.toFixed(2).toString().replace(".",","))
							
							} 
							
						}
						
						// SE DIA9 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia9==dataDisp){
							
							console.log("dia9 está na tabela")
							
							var saldoDisp = parseFloat(rep["SALDO_ALOCADO"])
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
								
								var saldoAtual = $("#DIA9RADDESP___"+seqTabela).val()
								saldoAtual = parseFloat(saldoAtual.replace(",","."))
								
								saldoDisp = saldoAtual + saldoDisp
								
								$("#DIA9RADDESP___"+seqTabela).val(saldoDisp.toFixed(2).toString().replace(".",","))
							
							} 
							
						}
						
						// SE DIA10 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia10==dataDisp){
							
							console.log("dia10 está na tabela")
							
							var saldoDisp = parseFloat(rep["SALDO_ALOCADO"])
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
								
								var saldoAtual = $("#DIA10RADDESP___"+seqTabela).val()
								saldoAtual = parseFloat(saldoAtual.replace(",","."))
								
								saldoDisp = saldoAtual + saldoDisp
								
								$("#DIA10RADDESP___"+seqTabela).val(saldoDisp.toFixed(2).toString().replace(".",","))
							
							} 
							
						}
						
					}
								
					// CALCULA SOMA DOS RECURSOS ALOCADOS
					//calculaSomaRecAptosDisp(rowSoma)
					
				}
					
				//$(".RAD").hide()
			
				
			}
			
			// BUSCA O TOTAL DE TEMPO DO PLANO E DO QUE FOI ALOCADO
			buscaTotalPlanAlocDesp()
			
			$(".PLANEJAMENTO").show()
			$(".DESPROGRAMACAO").show()
			$(".RADDESP").show()
			$(".TOTALIZADORDESP").show()
			
			// REDUZ O CONTEÚDO DO DETALHAMENTO DO ITEM
			reduzir2()
			
			myLoading2.hide();
					
		} else {
			
			//$(".PLANEJAMENTO").hide()
			$(".DESPROGRAMACAO").hide()
			$(".RADDESP").hide()
			$(".TOTALIZADORDESP").hide()
			
			// EXPANDE O FILTRO
			expandir2()
			
			myLoading2.hide();
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'Não foram encontrados registros para os filtros informados',
				  text: 'Verifique e tente novamente.'
			})
			
		}
		
	}, 500)
	
}

// SELECIONA O DIA PARA REALIZAR A DESPROGRAMAÇÃO
function selecionaDia(obj){
	
	//var seq = $(obj).attr("id").split("___")[1]
	
	// SE DIA JÁ FOI SELECIONADO PARA DESPROGRAMAR
	if($(obj).hasClass("desprogramar")){
		
		console.log("vou desprogramar")
			
		// REMOVE A SELEÇÃO
		$(obj).removeClass("desprogramar")
		
	} else {
		// SE NÃO FOI 
		
		console.log("vou programar")
		
		/*var instance = $(obj).attr("id").split("___")[0]
		console.log("instance: "+instance)
		
		instance = instance.replace("RECAD","")
		
		console.log("instance do dia: "+instance)
		
		var saldo = $("#DIA"+instance+"RECALOC___"+seq).val()*/
		
		var saldo = $(obj).children("input[type='text']").val()
		
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
			
		} else {
			// SE NÃO
			
			// SE JÁ TEM ALGUM DIA SELECIONADO
			if(temDiaSelecionado()){
				
				console.log("já tem um dia selecionado")
				
				// EXIBE ALERTA
				Swal.fire({
					  icon: 'error',
					  title: 'Já existe um dia selecionado',
					  text: 'Verifique e tente novamente.'
				})
				
			} else {
				// SE NÃO
				
				console.log("saldo é diferente de 0")
				
				// COLOCA A SELEÇÃO
				$(obj).addClass("desprogramar")
			
			}
			
		}
		
	}
	
}

// CARREGA A(S) OP(S) REFERENTES AO PLANO DE CORTE DA DESPROGRAMAÇÃO
function carregaOPDesp(){
	
	console.log("carrega OP Desp")
	
	var codColigada = $("#CODCOLIGADADESP").val()
	var numPlano = $("#NUMPLANOCORTEREALDESP").val()
	
	var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("NUMPLANOCORTE",numPlano,numPlano,ConstraintType.MUST)
	
	var constraints = new Array(a1,a2)
	
	var dataset = DatasetFactory.getDataset("dsBuscaAtvPlanoCorteOS",null,constraints,null)
	var row = dataset.values
	
	console.log("row")
	console.log(row)
	
	var myLoading2 = FLUIGC.loading(window);
	
	myLoading2.show();
	
	setTimeout(function(){
		
		// SE RETORNO NÃO É NULO OU VAZIO
		if(!(row=="" || row==null || row==undefined)){
			
			var count = dataset.values.length
			
			// PERCORRE TODOS OS REGISTROS DO RETORNO
			for(var i=0; i<count; i++){
				
				var seq = addTabelaOP()
				
				var rep = row[i]
				
				$("#OPPAPC___"+seq).val(rep["CODORDEM"])
				$("#ATIVIDADEOP___"+seq).val(rep["DSCATIVIDADE"])
				
				var tempo = parseFloat(rep["TEMPO"])
				
				$("#HORASATV___"+seq).val(tempo.toFixed(2).toString().replace(".",","))
				
			}
			
		}
		
	},500)
	
	// DESATIVA O LOAD
	setTimeout(function(){
		
		myLoading2.hide();
		$("#ICONREDUZIR").click()
		
	}, 500)
	
}

// CARREGA A(S) OP(S) REFERENTES AO PLANO DE CORTE
function carregaOP(){
	
	console.log("carrega OP")
	
	var codColigada = $("#CODCOLIGADA").val()
	var numPlano = $("#NUMPLANOCORTEREAL").val()
	
	var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("NUMPLANOCORTE",numPlano,numPlano,ConstraintType.MUST)
	
	var constraints = new Array(a1,a2)
	
	var dataset = DatasetFactory.getDataset("dsBuscaAtvPlanoCorteOS",null,constraints,null)
	var row = dataset.values
	
	console.log("row")
	console.log(row)
	
	var myLoading2 = FLUIGC.loading(window);
	
	myLoading2.show();
	
	setTimeout(function(){
		
		// SE RETORNO NÃO É NULO OU VAZIO
		if(!(row=="" || row==null || row==undefined)){
			
			var count = dataset.values.length
			
			// PERCORRE TODOS OS REGISTROS DO RETORNO
			for(var i=0; i<count; i++){
				
				var seq = addTabelaOP()
				
				var rep = row[i]
				
				$("#OPPAPC___"+seq).val(rep["CODORDEM"])
				$("#ATIVIDADEOP___"+seq).val(rep["DSCATIVIDADE"])
				
				var tempo = parseFloat(rep["TEMPO"])
				
				$("#HORASATV___"+seq).val(tempo.toFixed(2).toString().replace(".",","))
				
			}
			
		}
		
	},500)
	
	// DESATIVA O LOAD
	setTimeout(function(){
		
		myLoading2.hide();
		$("#ICONREDUZIR").click()
		
	}, 500)
	
}

// LIMPA TABELA OP
function limpaTabelaOP(){
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OPPAPC___']").each(function(){
	
		$(this).parents("tr").remove()
		
	})
	
}

// PERCORRE A TABELA RAD E EXIBE APENAS A CHAPA INFORMADA
/*function exibeChapaRAD(chapas){
	
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
	
}*/

// CARREGA AS INFORMAÇÕES DO RECURSO APTO DISPONIVEL PARA A ATIVIDADE
/*function carregaRAD(chapa){
	
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
						
						if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
							saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

							$("#DIA1RAD___"+seqTabela).val(saldoDisp)
							
						} 
						
					}
					
					// SE DIA2 É IGUAL A DATA DE DISPONIBILIDADE
					if(dia2==dataDisp){

						var saldoDisp = rep["SALDO"]
						
						if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
							saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

							$("#DIA2RAD___"+seqTabela).val(saldoDisp)
						
						} 
						
					}
					
					// SE DIA3 É IGUAL A DATA DE DISPONIBILIDADE
					if(dia3==dataDisp){
						
						var saldoDisp = rep["SALDO"]
						
						if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
							saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

							$("#DIA3RAD___"+seqTabela).val(saldoDisp)
						
						} 
						
					}
					
					// SE DIA4 É IGUAL A DATA DE DISPONIBILIDADE
					if(dia4==dataDisp){
						
						var saldoDisp = rep["SALDO"]
						
						if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
						
							saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

							$("#DIA4RAD___"+seqTabela).val(saldoDisp)
						
						} 
						
					}
					
					// SE DIA5 É IGUAL A DATA DE DISPONIBILIDADE
					if(dia5==dataDisp){
						
						var saldoDisp = rep["SALDO"]
						
						if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
							saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

							$("#DIA5RAD___"+seqTabela).val(saldoDisp)
						
						} 
						
					}
					
					// SE DIA6 É IGUAL A DATA DE DISPONIBILIDADE
					if(dia6==dataDisp){
						
						var saldoDisp = rep["SALDO"]
						
						if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
							saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

							$("#DIA6RAD___"+seqTabela).val(saldoDisp)
						
						} 
						
					}
					
					// SE DIA7 É IGUAL A DATA DE DISPONIBILIDADE
					if(dia7==dataDisp){
						
						var saldoDisp = rep["SALDO"]
						
						if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
							saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

							$("#DIA7RAD___"+seqTabela).val(saldoDisp)
						
						} 
						
					}
					
					// SE DIA8 É IGUAL A DATA DE DISPONIBILIDADE
					if(dia8==dataDisp){
						
						var saldoDisp = rep["SALDO"]
						
						if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
							saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

							$("#DIA8RAD___"+seqTabela).val(saldoDisp)
						
						} 
						
					}
					
					// SE DIA9 É IGUAL A DATA DE DISPONIBILIDADE
					if(dia9==dataDisp){
						
						var saldoDisp = rep["SALDO"]
						
						if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
							saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

							$("#DIA9RAD___"+seqTabela).val(saldoDisp)
						
						} 
						
					}
					
					// SE DIA10 É IGUAL A DATA DE DISPONIBILIDADE
					if(dia10==dataDisp){
						
						var saldoDisp = rep["SALDO"]
						
						if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
							saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

							$("#DIA10RAD___"+seqTabela).val(saldoDisp)
						
						} 
						
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
						
						var dataDisp = rep["DATADISPONIBILIDADE"]
						dataDisp = dataDisp.split(" ")
						dataDisp = dataDisp[0]
						
						console.log("dia1: "+dia1+", dia2: "+dia2+", dia3: "+dia3+", dia4: "+dia4+", dia5: "+dia5+", dia6: "+dia6+
								", dia7: "+dia7+", dia8: "+dia8+", dia9: "+dia9+", dia10: "+dia10)
						
						console.log("dataDisp: "+dataDisp)
						
						// SE DIA1 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia1==dataDisp){
							
							var saldoDisp= rep["SALDO"]
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
									
								saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

								$("#DIA1RAD___"+seqTabela).val(saldoDisp)
								
							} 
							
						}
						
						// SE DIA2 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia2==dataDisp){
	
							var saldoDisp = rep["SALDO"]
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
								
								saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

								$("#DIA2RAD___"+seqTabela).val(saldoDisp)
							
							} 
							
						}
						
						// SE DIA3 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia3==dataDisp){
							
							var saldoDisp = rep["SALDO"]
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
								
								saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

								$("#DIA3RAD___"+seqTabela).val(saldoDisp)
							
							} 
							
						}
						
						// SE DIA4 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia4==dataDisp){
							
							var saldoDisp = rep["SALDO"]
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
								
								saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

								$("#DIA4RAD___"+seqTabela).val(saldoDisp)
							
							} 
							
						}
						
						// SE DIA5 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia5==dataDisp){
							
							var saldoDisp = rep["SALDO"]
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
								
								saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

								$("#DIA5RAD___"+seqTabela).val(saldoDisp)
							
							} 
							
						}
						
						// SE DIA6 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia6==dataDisp){
							
							var saldoDisp = rep["SALDO"]
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
								
								saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

								$("#DIA6RAD___"+seqTabela).val(saldoDisp)
							
							} 
							
						}
						
						// SE DIA7 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia7==dataDisp){
							
							var saldoDisp = rep["SALDO"]
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
								
								saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

								$("#DIA7RAD___"+seqTabela).val(saldoDisp)
							
							} 
							
						}
						
						// SE DIA8 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia8==dataDisp){
							
							var saldoDisp = rep["SALDO"]
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
								
								saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

								$("#DIA8RAD___"+seqTabela).val(saldoDisp)
							
							} 
							
						}
						
						// SE DIA9 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia9==dataDisp){
							
							var saldoDisp = rep["SALDO"]
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
							
								saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")
								
								$("#DIA9RAD___"+seqTabela).val(saldoDisp)
							
							}
							
						}
						
						// SE DIA10 É IGUAL A DATA DE DISPONIBILIDADE
						if(dia10==dataDisp){
							
							var saldoDisp = rep["SALDO"]
							
							if(!(saldoDisp=="" || saldoDisp==null || saldoDisp==undefined || saldoDisp=="null")){
								
								saldoDisp = parseFloat(saldoDisp).toFixed(2).toString().replace(".",",")

								$("#DIA10RAD___"+seqTabela).val(saldoDisp)
							
							} 
							
						}
						
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
	$("input[id^='OSATV___']").each(function(index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		// SE LINHA ESTÁ SELECIONADA
		if($("#PROGRAMANDO___"+seq).is(":checked")){
			
		
		}
	
	})
	
	return ret
	
}*/

// LIMPA A SELEÇÃO DE TODOS OS ITENS DA TABELA COM EXCEÇÃO DO ATUAL
/*function limpaSelecaoTabela(e){
	
	var seqAtual = $(e).attr("id").split("___")[1]
	
	//PERCORRE TODOS OS ITENS
	$("input[id^='OSATV___']").each(function(index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		// SE NÃO É O ITEM ATUAL
		if(!(seq==seqAtual)){
			
			// SE LINHA ESTÁ SELECIONADA
			if($("#PROGRAMANDO___"+seq).is(":checked")){
				
				// REMOVE A CLASSE "SELECIONADO"
				$("#LINHAPLAN___"+seq).removeClass("selecionado")
				$("#PROGRAMANDO___"+seq).attr("checked",false)
				
				$(".GRUPORECURSON3").hide()
				$("#GRUPORECURSON3>option").remove(); 
				
				// LIMPA RAD
				limpaRAD()
				
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
	
}*/

// SELECIONA TODAS PROGRAMAÇÕES DA LINHA
/*function colocaSelecaoProgramados(obj){

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
	
	
		
		// LIMPA A SELEÇÃO DE TODOS OS ITENS DA TABELA
		limpaSelecaoTabela(e)
		
		// RELOAD FILTER VALUES NO GRUPORECURSON3
		reloadZoomFilterValues("GRUPORECURSON3","CODATIVIDADE,"+codAtividade)
		
		
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
			
		} else {
			// SE NÃO, COLOCA SELEÇÃO
			
			// SE A ATIVIDADE ESTÁ COM O FAROL VERMELHO OU AMARELO
			if($("#FAROLATV___"+seq).parent("div").hasClass("FAROLAMARELO") || $("#FAROLATV___"+seq).parent("div").hasClass("FAROLVERMELHO")){
				
				// EXIBE ALERTA
				Swal.fire({
					  icon: 'error',
					  title: 'Essa atividade não pode ser programada',
					  text: 'Verifique se as ordens precedentes foram programadas ou se a ordem dessa atividade foi paralisada.'
				})
				
				$("#PROGRAMANDO___"+seq).removeAttr("checked")
				
			} else {
				// SE NÃO, ESTÁ LIBERADA PARA PROGRAMAR
				
				console.log("item não estava selecionado, vou colocar a seleção")
				
				//$(e).addClass("selecionado")
				$("#LINHAPLAN___"+seq).addClass("selecionado")
				
				// SE ALOCAÇÃO JÁ ESTÁ COMPLETA
				if($("#LINHAPLAN___"+seq).hasClass("alocado")){
					
					$(".GRUPORECURSON3").hide()
					$(".PLANOCORTE").hide()
					$(".INTEGRAR").hide()
					
				} else {
					
					$(".GRUPORECURSON3").show()
					$(".INTEGRAR").show()
					
					// SE ATIVIDADE TEM PLANO DE CORTE
					if(atvTemPlanoCorte(codcoligada,codfilial,codOrdem,idAtvOrdem,codEstrutura)){
						
						$(".PLANOCORTE").show()
						
						reloadZoomFilterValues("PLANOCORTE","CODCOLIGADA,"+codcoligada+",CODFILIAL,"+codfilial+",CODORDEM,"+codOrdem+",IDATVORDEM,"+idAtvOrdem+",CODESTRUTURA,"+codEstrutura+"")
						
					} else {
						// SE NÃO
						
						$(".PLANOCORTE").hide()
						
					}
					
				}
				
				// ESCONDE ITENS QUE NÃO ESTÃO SELECIONADOS
				escondeItemNaoselecionado()
				
				// CARREGA A TABELA RAD
				//carregaRADcompleta()
				
			}

		}
		
	//}
	
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
	
}*/

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
    $(".filtrosDesp").show()

}

// REDUZ O CONTEÚDO DO DETA  LHAMENTO DO ITEM
function reduzir2(e) {
    
    // ESCONDE/MOSTRA OS ÍCONES
    $("#ICONEXPANDIR2").show();
    $("#ICONREDUZIR2").hide();
    
    // ESCONDE A ABA DOS ITENS
    $(".filtrosDesp").hide()
    
}

// EXPANDE O CONTEÚDO DE ADICIONAR HABILIDADE
function expandir3(e) {
	
    // ESCONDE/MOSTRA OS ÍCONES
    $("#ICONEXPANDIR3").hide();
    $("#ICONREDUZIR3").show();
    
    // EXIBE A ABA DOS ITENS
    $(".filtrosHab").show()

}

// REDUZ O CONTEÚDO DE ADICIONAR HABILIDADE
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

// VERIFICAR SE SALDO ALOCAR É O "0" E ALTERA A COR
function verificaSaldoAlocar(){
	
	console.log("vou verificar o saldo alocar e alterar a cor")
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='SALDOAALOCARATV___']").each(function(){
	
		var seq = $(this).attr("id").split("___")[1]
			
		var saldoAlocar = $("#SALDOAALOCARATV___"+seq).val()
		
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
			
		}
		
	})
	
}

// BUSCAR INFORMAÇÕES DO RESUMO DA ALOCAÇÃO
/*function buscarResumoAloc(){
	
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
				var a5 = DatasetFactory.createConstraint("RECURSO_EQUIP",recursoEquip,recursoEquip,ConstraintType.MUST)
				
				constraints = new Array(a1,a2,a3,a4,a5)
				
				var dataset = DatasetFactory.getDataset("dsResumoAlocacaoRecursoOS",null,constraints,null)
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
						
						// SE RECURSO PARA A OP E ATIVIDADE JÁ FOI INCLUÍDO NA TABELA
						if(temRecursoOPAtv(rep["OS"],rep["OP"],rep["CODPOSTO"],rep["CODCOLIGADA"],rep["CODESTRUTURA"],rep["CODIGOPRD"],rep["CODMO"],rep["CODEQUIPAMENTO"])){
							
							console.log("Já foi incluído")
							
							var seq = buscaSeqResumoAloc(rep["OS"],rep["OP"],rep["CODPOSTO"],rep["CODCOLIGADA"],rep["CODESTRUTURA"],rep["CODIGOPRD"],rep["CODMO"],rep["CODEQUIPAMENTO"])
							
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
							$("#PRIORIDADEALOC___"+seq).val(rep["PRIORIDADE"])
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
	
}*/

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
			//mySimpleCalendar2.setDate(""+dia+"/"+mes+"/"+ano+"");
			
			//mySimpleCalendar.setMinDate(dataMin);
			//mySimpleCalendar.setMaxDate(dataMax)
			
			var dataForm = formataDataDate(dataMax)
			
			console.log("dataForm: "+dataForm)
			
			mySimpleCalendar2.setDate(dataForm);
			
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
function habilitaDataAteDesp(){
	
	var dataDe = $("#DATA_DE_DESP").val()
	
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
			$("#ATE_DESP").remove()
			$("#SPANATEDESP").remove()
			$("#PERIODO2DESP").append("<input type='text' class='form-control' id='ATE_DESP' name='ATE_DESP' onchange='limpaDataAteDesp()' readonly><span class='input-group-addon' id='SPANATEDESP' name='SPANATEDESP'><span class='fluigicon fluigicon-calendar'></span></span>")
		//}
		
		var mySimpleCalendar2 = FLUIGC.calendar("#ATE_DESP", { language: 'pt-br', minDate: dataMin, maxDate: dataMax, pickDate: true, pickTime: false });
		//mySimpleCalendar2.setDate(""+dia+"/"+mes+"/"+ano+"");
		
		//mySimpleCalendar.setMinDate(dataMin);
		//mySimpleCalendar.setMaxDate(dataMax)
		
		var dataForm = formataDataDate(dataMax)
		
		console.log("dataForm: "+dataForm)
		
		mySimpleCalendar2.setDate(dataForm);
		
	}
	
}

// LIMPA O CAMPO DA DATA "ATÉ"
function limpaDataAteDesp(){
	
	console.log("VOU LIMPAR A DATA ATÉ")
	
	var dataAte = $("#ATE_DESP").val()
	var dataMin = $("#DATA_DE_DESP").val()
	
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
			
			$("#ATE_DESP").val("")
			
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
		
		$("#ATE_DESP").val("")
		$("#DATA_DE_DESP").val("")
		
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
/*function limpaClasseVisivelAlocacao(){
	
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
	
}*/

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

// LIMPA A CLASSE VISÍVEL PARA TODOS OS DIAS DO CABEÇALHO DA TABELA DE DESPROGRAMAÇÃO
function limpaClasseVisivelRADDesp(){
	
	// REMOVE A CLASSE VISÍVEL DE TODO O CABEÇALHO
	$("#THDIA1RADDESP").removeClass("visivel")
	$("#THDIA2RADDESP").removeClass("visivel")
	$("#THDIA3RADDESP").removeClass("visivel")
	$("#THDIA4RADDESP").removeClass("visivel")
	$("#THDIA5RADDESP").removeClass("visivel")
	$("#THDIA6RADDESP").removeClass("visivel")
	$("#THDIA7RADDESP").removeClass("visivel")
	$("#THDIA8RADDESP").removeClass("visivel")
	$("#THDIA9RADDESP").removeClass("visivel")
	$("#THDIA10RADDESP").removeClass("visivel")
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OPERADORRADDESP___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		$("#RAD1DESP___"+seq).removeClass("visivel")
		$("#RAD2DESP___"+seq).removeClass("visivel")
		$("#RAD3DESP___"+seq).removeClass("visivel")
		$("#RAD4DESP___"+seq).removeClass("visivel")
		$("#RAD5DESP___"+seq).removeClass("visivel")
		$("#RAD6DESP___"+seq).removeClass("visivel")
		$("#RAD7DESP___"+seq).removeClass("visivel")
		$("#RAD8DESP___"+seq).removeClass("visivel")
		$("#RAD9DESP___"+seq).removeClass("visivel")
		$("#RAD10DESP___"+seq).removeClass("visivel")
		
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
/*function limpaClasseVisivelRecAloc(){
	
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
	
}*/

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
/*function preencheDiasCabecalhoRecAptoDisp(){
	
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
	
}*/

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
		
		$("#THDIA"+d+"RADCAB").html("<label class='info'><strong>"+dataForm+"</strong></label>")
		$("#THDIA"+d+"RAD").addClass("visivel")
		$("#THDIA"+d+"RADCAB").addClass("visivel")
		$("#THDIA"+d+"RADDISP___1").addClass("visivel")
		$("#THDIA"+d+"RADPROG___1").addClass("visivel")
		
		d += 1
		
		dataDe.setDate(dataDe.getDate() + 1)
		
	}
	
	// SE SÃO APENAS 3 DIAS
	if(d<6){
		
		// REDUZ O TAMANHO DA TABELA
		reduzTamanhoTabelas()
		
	}
	
	// PERCORRE TODAS AS COLUNAS E ESCONDE AS COLUNAS QUE NÃO SERÃO USADAS
	for(var i=1; i<=10; i++){
		
		var val = $("#THDIA"+i+"RADCAB").hasClass("visivel")
		
		console.log("THDIA"+i+"RADCAB tem classe visível: "+val)
		
		// SE TH POSSUI A CLASSE "VISIVEL"
		if(!($("#THDIA"+i+"RADCAB").hasClass("visivel"))){
			
			console.log("vou esconder o dia "+i)
			
			$("#THDIA"+i+"RAD").hide()
			$("#THDIA"+i+"RADCAB").hide()
			$("#RAD"+i).hide()
			$("#RAD"+i+"PROG").hide()
			$("#THDIA"+i+"RADDISP___1").hide()
			$("#THDIA"+i+"RADPROG___1").hide()
			$(".dia"+i).hide()
			
		} else {
			// SE NÃO
			
			console.log("vou exibir o dia "+i)
			
			$("#THDIA"+i+"RAD").show()
			$("#THDIA"+i+"RADCAB").show()
			$("#RAD"+i).show()
			$("#RAD"+i+"PROG").show()
			$("#THDIA"+i+"RADDISP___1").show()
			$("#THDIA"+i+"RADPROG___1").show()
			$(".dia"+i).show()
			
		}
		
	}
	
}

// BUSCA A DATA MÍNIMA PROGRAMADA PARA O PLANO DE CORTE
function buscaDataDeProg(){
	
	console.log("VOU BUSCAR A DATA DE")
	
	var numPlano = $("#NUMPLANOCORTEREALDESP").val()
	var codColigada = $("#CODCOLIGADADESP").val()
	var codFilial = $("#CODFILIALDESP").val()
	
	console.log("numPlano: "+numPlano+", codColigada: "+codColigada+", codFilial: "+codFilial)
	
	var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("NUMPLANOCORTE",numPlano,numPlano,ConstraintType.MUST)
	
	var constraints = new Array(a1,a2,a3)
	
	var dataset = DatasetFactory.getDataset("dsBuscaDataDeProgPC",null,constraints,null)
	var row = dataset.values[0]
	
	var dataDe = row["DATA_DE"]
	
	console.log("dataDe: "+dataDe)
	
	return dataDe
	
}

// PREENCHE O CABEÇALHO DA TABELA DE DESPROGRAMAÇÃO COM OS DIAS DA JANELA DE PLANEJAMENTO 
function preencheDiasCabecalhoRADDesp(){
	
	//var dataAte = $("#ATE").val()
	//var dataDe = $("#DATA_DE").val()
	
	console.log("vou preencher os dias do cabeçalho RAD")
	
	var dataAte = $("#DATAATE_DESP").val()
	var dataDe = $("#DATADE_DESP").val()
	
	console.log("dataAte: "+dataAte+", dataDe: "+dataDe)
	
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
	limpaClasseVisivelRADDesp()
	
	// ENQUANTO DATA ATÉ NÃO FOI ATINGIDA
	while(dataDe<=dataAte){
		
		//d += 1
		
		//dataDe.setDate(dataDe.getDate() + 1)
		
		// FORMATA A DATA DE UM DATE PARA PADRÃO FORMULÁRIO
		dataForm = formataDataDate(dataDe)
		
		console.log("dataDe: "+dataDe+", dataAte: "+dataAte+", dataForm: "+dataForm)
		
		$("#THDIA"+d+"RADCABDESP").html("<label class='info'><strong>"+dataForm+"</strong></label>")
		$("#THDIA"+d+"RADDESP").addClass("visivel")
		$("#THDIA"+d+"RADCABDESP").addClass("visivel")
		$("#THDIA"+d+"RADDISPDESP___1").addClass("visivel")
		$("#THDIA"+d+"RADPROGDESP___1").addClass("visivel")
		
		d += 1
		
		dataDe.setDate(dataDe.getDate() + 1)
		
	}
	
	// SE SÃO APENAS 3 DIAS
	if(d<6){
		
		// REDUZ O TAMANHO DA TABELA
		reduzTamanhoTabelasDesp()
		
	}
	
	// PERCORRE TODAS AS COLUNAS E ESCONDE AS COLUNAS QUE NÃO SERÃO USADAS
	for(var i=1; i<=10; i++){
		
		var val = $("#THDIA"+i+"RADCABDESP").hasClass("visivel")
		
		console.log("THDIA"+i+"RADCABDESP tem classe visível: "+val)
		
		// SE TH POSSUI A CLASSE "VISIVEL"
		if(!($("#THDIA"+i+"RADCABDESP").hasClass("visivel"))){
			
			console.log("vou esconder o dia "+i)
			
			$("#THDIA"+i+"RADDESP").hide()
			$("#THDIA"+i+"RADCABDESP").hide()
			$("#RAD"+i+"DESP").hide()
			$("#RAD"+i+"PROGDESP").hide()
			//$("#THDIA"+i+"RADDISPDESP___1").hide()
			//$("#THDIA"+i+"RADPROGDESP___1").hide()
			$(".dia"+i+"DESP").hide()
			
		} else {
			// SE NÃO
			
			console.log("vou exibir o dia "+i)
			
			$("#THDIA"+i+"RADDESP").show()
			$("#THDIA"+i+"RADCABDESP").show()
			$("#RAD"+i+"DESP").show()
			$("#RAD"+i+"PROGDESP").show()
			//$("#THDIA"+i+"RADDISPDESP___1").show()
			//$("#THDIA"+i+"RADPROGDESP___1").show()
			$(".dia"+i+"DESP").show()
			
		}
		
	}
	
}

// LIMPA O STYLE DOS ITENS DA TABELA
function limpaStyleTabelas(){
	
	$("#RECAPTODISPCAB").parent().removeAttr("style")

	$("#RECAPTODISP").parent().removeAttr("style")
	
}

// LIMPA O STYLE DOS ITENS DA TABELA
function limpaStyleTabelasDesp(){
	
	$("#RECAPTODISPCABDESP").parent().removeAttr("style")

	$("#RECAPTODISPDESP").parent().removeAttr("style")
	
}

// REDUZ O TAMANHO DA TABELA
function reduzTamanhoTabelasDesp(){
	
	console.log("vou reduzir tamanhos das tabelas")
	
	// LIMPA O STYLE DOS ITENS DA TABELA
	limpaStyleTabelas()
	
	$("#RECAPTODISPCABDESP").parent().attr("style","width:94%")
	
	$("#RECAPTODISPDESP").parent().attr("style","width:94%")
	
}

// REDUZ O TAMANHO DA TABELA
function reduzTamanhoTabelas(){
	
	console.log("vou reduzir tamanhos das tabelas")
	
	// LIMPA O STYLE DOS ITENS DA TABELA
	limpaStyleTabelas()
	
	$("#RECAPTODISPCAB").parent().attr("style","width:94%")
	
	$("#RECAPTODISP").parent().attr("style","width:94%")
	
}

// AJUSTA O TAMANHO DA TABELA
function ajustaTamanhoTabelasDesp(){
	
	console.log("vou ajustar tamanhos das tabelas")
	
	// LIMPA O STYLE DOS ITENS DA TABELA
	limpaStyleTabelasDesp()
	
	$("#RECAPTODISPCABDESP").parent().attr("style","width:160%")
	
	$("#RECAPTODISPDESP").parent().attr("style","width:160%")
	
}

// AJUSTA O TAMANHO DA TABELA
function ajustaTamanhoTabelas(){
	
	console.log("vou ajustar tamanhos das tabelas")
	
	// LIMPA O STYLE DOS ITENS DA TABELA
	limpaStyleTabelas()
	
	$("#RECAPTODISPCAB").parent().attr("style","width:160%")
	
	$("#RECAPTODISP").parent().attr("style","width:160%")
	
}

// PREENCHE O CABEÇALHO DA TABELA COM OS DIAS DA JANELA DE PLANEJAMENTO
/*function preencheDiasCabecalhoAlocacao(){
	
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
	
	
}*/

// PREENCHE TABELA COM OS DIAS DA JANELA DE PLANEJAMENTO
/*function preencheDiasSomaRecAloc(){
	
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
	$("input[id^='SOMADIA1RECALOCATV___']").each(function(){

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
		
	})
	
}*/

// PREENCHE TABELA COM OS DIAS DA JANELA DE PLANEJAMENTO
/*function preencheDiasSomaRecAptoDisp(){
	
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
	
}*/

// PREENCHE O CABEÇALHO DA TABELA COM OS DIAS DA JANELA DE PLANEJAMENTO
/*function preencheDiasCabecalho(){
	
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
	
}*/

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

// BUSCA AS INFORMAÇÕES PARA A PROGRAMAÇÃO
function buscarProgramacao(op){
	
	var myLoading2 = FLUIGC.loading(window);
	var row
	
	//myLoading2.show();
	
	var projeto = $("#PROJETO").val()
	var numPlano = $("#PLANOCORTE").val()
	var codColigada = $("#CODCOLIGADA").val()
	var dataDe = $("#DATA_DE").val()
	var dataAte = $("#ATE").val()

	// SE NÃO É ATUALIZAÇÃO
	if(op==""){
		
		//$(".PLANEJAMENTO").hide()
		$(".PROGRAMACAO").hide()
		$(".RAD").hide()
		$(".TOTALIZADOR").hide()
		
	}
	
	// LIMPA A TABELA RAD
	limpaRAD()
	
	// LIMPA O CABEÇALHO DA TABELA RAD
	limpaRADCab()
	
	// AJUSTA O TAMANHO DA TABELA
	ajustaTamanhoTabelas()
	
	// SE CAMPOS OBRIGATÓRIOS NÃO FORAM INFORMADOS
	if((dataDe=="" || dataDe==null || dataDe==undefined) || (dataAte=="" || 
		dataAte==null || dataAte==undefined) || (numPlano=="" || numPlano==null || numPlano==undefined)){
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'Há filtros obrigatórios que não foram informados',
			  text: 'Verifique os campos com a marcação * e tente novamente.'
		})
	
	} else {
		// SE NÃO, BUSCA ESTÁ LIBERADA
		
		myLoading2.show();
		
		setTimeout(function(){
			
			// LIMPA A TABELA DE PLANEJAMENTO
			//limpaTabelaPlanejamento()
			
			// VARIÁVEIS PARA OS CAMPOS DO FILTRO DA CONSULTA
			var codprj = $("#CODPRJ").val()
			var idprj = $("#IDPRJ").val()
			var codColigada = $("#CODCOLIGADA").val()
			var codFilial = $("#CODFILIAL").val()
			var numPlano = $("#NUMPLANOCORTEREAL").val()
			
			// SALVA AS DATAS INFORMADAS
			$("#DATADE_PROG").val(dataDe)
			$("#DATAATE_PROG").val(dataAte)
		
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
			
			console.log("codprj: "+codprj+", idprj: "+idprj+", codColigada: "+codColigada+", codFilial: "+codFilial+", numPlano: "+numPlano)
			
			// SE AINDA NÃO CRIOU UMA LINHA NO CABEÇALHO DA TABELA RAD
			if(!(temRadCab())){
				
				console.log("não tem linha no cabeçalho, vou criar")
				
				addRADCab()
				
			}
			
			// PREENCHE O CABEÇALHO DA TABELA COM OS DIAS DA JANELA DE PLANEJAMENTO
			preencheDiasCabecalhoRAD()
			
			// BUSCA O CÓDIGO DA ATIVIDADE
			var codAtividade = buscaCodAtv(codColigada,numPlano)
			
			// BUSCA OS RECURSOS DISPONÍVEIS PARA A ATIVIDADE E CARREGA A TABELA
			carregaRADcompleta(codAtividade,myLoading2)
			
			// CARREGA OS RECURSOS QUE PODEM SER ALOCADOS PARA O PLANO DE CORTE
			reloadZoomFilterValues("RECURSO","CODATIVIDADE,"+codAtividade+",RECURSO,RECURSO,NUMPLANOCORTE,"+numPlano)
			
			console.log("vou esconder RAD")
			
			$(".RAD").hide()
			
			//myLoading2.hide();
			
		},500)
			
		
	}
	
	
}

// FILTRA RECURSO NA TABELA RAD
function filtraRecursoRAD(){
	
	console.log("filtraRecursoRAD")
	
	//var recursos = $("#RECURSO").val()
	var recursos = $("#CODMORECURSO").val()
	
	console.log("recursos")
	console.log(recursos)
	
	if(recursos=="" || recursos==null || recursos==undefined){
		
		$(".RAD").hide()
		
	} else {
		// SE NÃO
		
		recursos = recursos.split(",")
		
		$(".RAD").show()
		
		// PERCORRE TODOS OS RECURSOS SELECIONADOS
		for(var i=0; i<recursos.length; i++){
			
			var codmo = recursos[i]
			
			$("input[id^='OPERADORRAD___']").each(function(){
			
				var seq = $(this).attr("id").split("___")[1]
				
				var codmoRad = $("#CHAPARAD___"+seq).val()
				
				if(codmoRad==codmo){
					
					$("#LINHARAD___"+seq).show()
					
				} else {
					
					if(!(recursos.includes(codmoRad))){
						
						$("#LINHARAD___"+seq).hide()
						
					}
					
				}
				
			})
			
		}
		
	}
	
}

// BUSCA AS INFORMAÇÕES PARA A DESPROGRAMAÇÃO
function buscarDesprogramacao(op){
	
	var myLoading2 = FLUIGC.loading(window);
	var row
	
	myLoading2.show();
	
	var projeto = $("#PROJETODESP").val()
	var numPlano = $("#PLANOCORTEDESP").val()
	var codColigada = $("#CODCOLIGADADESP").val()
	var dataDe = $("#DATA_DE_DESP").val()
	var dataAte = $("#ATE_DESP").val()

	// SE NÃO É ATUALIZAÇÃO
	if(op==""){
		
		//$(".PLANEJAMENTO").hide()
		$(".DESPROGRAMACAO").hide()
		$(".RADDESP").hide()
		$(".TOTALIZADORDESP").hide()
		
	}
	
	// LIMPA A SELEÇÃO DO MOTIVO
	$("#CODINTERNO").val("")
	$("#MOTDESPROG>option").remove()
	
	// LIMPA A TABELA RAD
	limpaRADDesp()
	
	// LIMPA O CABEÇALHO DA TABELA RAD
	limpaRADCabDesp()
	
	// AJUSTA O TAMANHO DA TABELA
	ajustaTamanhoTabelasDesp()
	
	// SE CAMPOS OBRIGATÓRIOS NÃO FORAM INFORMADOS
	if(/*(projeto=="" || projeto==null || projeto==undefined) 
			|| (dataDe==""
		|| dataDe==null || dataDe==undefined) || (dataAte=="" || 
		dataAte==null || dataAte==undefined) || */
		 (numPlano=="" || numPlano==null || numPlano==undefined)){
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'Há filtros obrigatórios que não foram informados',
			  text: 'Verifique os campos com a marcação * e tente novamente.'
		})
	
	} else {
		// SE NÃO, BUSCA ESTÁ LIBERADA
		
		var dataAux = buscaDataDeProg()
		
		// SE NÃO EXISTE ALOCAÇÃO PARA O PLANO
		if(dataAux=="null" || dataAux==null){
			
			//$(".PLANEJAMENTO").hide()
			$(".DESPROGRAMACAO").hide()
			$(".RADDESP").hide()
			$(".TOTALIZADORDESP").hide()
			
			// EXPANDE O FILTRO
			expandir2()
			
			myLoading2.hide();
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'Não foram encontrados registros para os filtros informados',
				  text: 'Verifique e tente novamente.'
			})
			
		} else {
			// SE NÃO
			
			//myLoading2.show();
			
			//setTimeout(function(){
				
			// LIMPA A TABELA DE PLANEJAMENTO
			//limpaTabelaPlanejamento()
			
			// VARIÁVEIS PARA OS CAMPOS DO FILTRO DA CONSULTA
			var codprj = $("#CODPRJDESP").val()
			var idprj = $("#IDPRJDESP").val()
			var codColigada = $("#CODCOLIGADADESP").val()
			var codFilial = $("#CODFILIALDESP").val()
			var numPlano = $("#NUMPLANOCORTEREALDESP").val()
			
			// SE DATAS NÃO FORAM INFORMADAS
			if((dataAte=="" || dataAte==undefined) || (dataDe=="" || dataDe==undefined)){
				
				// BUSCA A DATA MÍNIMA PROGRAMADA PARA O PLANO DE CORTE
				dataDe = dataAux
				dataDe = formataData(dataDe)
				
				console.log("dataDe: "+dataDe)
				var dataDeAux = dataDe.split("/")
				console.log("dataDe: "+dataDeAux)
				
				var dia = dataDeAux[0]
				var mes = dataDeAux[1]
				var ano = dataDeAux[2]
				
				console.log("dia: "+dia+", mes: "+mes+", ano: "+ano)
				
				console.log("dataDe: "+dataDeAux)
				
				var dataMin = new Date(ano,mes-1,dia)
				var dataMax = new Date(ano,mes-1,dia)
				
				dataMax.setDate(dataMin.getDate() + 9)
				
				console.log("dataMin: "+dataMin+", dataMax: "+dataMax)
				
				dataAte = formataDataDate(dataMax)
				
				console.log("dataAte: "+dataAte)
				
				// SALVA AS DATAS
				$("#DATA_DE_DESP").val(dataDe)
				$("#ATE_DESP").val(dataAte)
				
				$("#DATADE_DESP").val(dataDe)
				$("#DATAATE_DESP").val(dataAte)
				
			} else {
				
				// SALVA AS DATAS INFORMADAS
				$("#DATADE_DESP").val(dataDe)
				$("#DATAATE_DESP").val(dataAte)
			
			}
			
			// FORMATA A DATA 
			/*if(!(dataDe==undefined || dataDe=="")){
				
				console.log("dataDe antes de formatar: "+dataDe)
				dataDe = formataDataBanco(dataDe)
				console.log("dataDe formatada: "+dataDe)
				
			} else {
				// SE NÃO
				
				dataDe = ""
				
			}
			// SE DATA ATÉ FOI INFORMADA
			if(!(dataAte==undefined || dataAte=="")){
				
				console.log("dataAte antes de formatar: "+dataAte)
				dataAte = formataDataBanco(dataAte)	
				console.log("dataAte formatada: "+dataAte)
				
			} else {
				// SE NÃO
				
				dataAte = ""
				
			}*/
			
			console.log("codprj: "+codprj+", idprj: "+idprj+", codColigada: "+codColigada+", codFilial: "+codFilial+", numPlano: "+numPlano)
			
			// SE AINDA NÃO CRIOU UMA LINHA NO CABEÇALHO DA TABELA RAD
			if(!(temRadCabDesp())){
				
				console.log("não tem linha no cabeçalho, vou criar")
				
				addRADCabDesp()
				
			}
			
			// PREENCHE O CABEÇALHO DA TABELA COM OS DIAS DA JANELA DE PLANEJAMENTO
			preencheDiasCabecalhoRADDesp()
			
			// BUSCA O CÓDIGO DA ATIVIDADE
			var codAtividade = buscaCodAtv(codColigada,numPlano)
			
			// BUSCA OS RECURSOS DISPONÍVEIS PARA A ATIVIDADE E CARREGA A TABELA
			carregaRADcompletaDesp(codAtividade,numPlano,myLoading2)
			
			console.log("vou fazer o reload, codAtividade: "+codAtividade)
			
			// RELOAD ZOOM FILTER VALUES
			reloadZoomFilterValues("NOVA_MATRICULA","CODATIVIDADE,"+codAtividade+",NUMPLANOCORTE,"+numPlano+",RECURSO,RECURSO")
			reloadZoomFilterValues("NOVA_MATRICULA2","CODATIVIDADE,"+codAtividade+",NUMPLANOCORTE,"+numPlano+",RECURSO,RECURSO")
			
			// LIMPA TODOS OS CAMPOS DAS ABAS
			$("#NOVA_MATRICULA>option").remove()
			$("#CODMO_NOVO").val("")
			$("#HORAS_DISPONIVEIS").val("")
			$("#SALDO").val("")
			$("#MOTDESPROG1>option").remove()
			$("#CODINTERNO1").val("")
			$("#NOVA_DATA").val("")
			$("#NOVA_DATA_REAL").val("")
			$("#MOTDESPROG2>option").remove()
			$("#CODINTERNO2").val("")
			$("#NOVA_DATA2").val("")
			$("#NOVA_DATA_REAL2").val("")
			$("#MOTDESPROG3>option").remove()
			$("#CODINTERNO3").val("")
			$("#NOVA_MATRICULA2>option").remove()
			$("#CODMO_NOVO2").val("")
			$("#HORAS_DISPONIVEIS2").val("")
			$("#SALDO2").val("")
			$("#MOTDESPROG4>option").remove()
			$("#CODINTERNO4").val("")

			// REMOVE TODAS AS CLASSES ATIVAS DAS ABAS
			$(".TROCARFUNC").removeClass("active")
			$(".TROCDATA").removeClass("active")
			$(".TROCFUNCDATA").removeClass("active")
			$(".DESPROG").removeClass("active")
		
			// COLA A ABA PRINCIPAL COMO ATIVA
			$("#TROCARFUNCIONARIO").removeClass("active")
			$("#TROCARDATA").removeClass("active")
			$("#TROCARFUNCDATA").removeClass("active")
			$("#DESPROGRAMARBLANK").removeClass("active")
			
			$(".TROCARFUNC").addClass("active")
			$("#TROCARFUNCIONARIO").addClass("active")

			
		}
		
	}
	
}

// LIMPA A TABELA RAD DE PROGRAMAÇÃO E ESCONDE OS CAMPOS 
function limpaEscondeRAD(){
	
	// LIMPA A TABELA RAD
	limpaRAD()
	
	// LIMPA O CABEÇALHO DA TABELA RAD
	limpaRADCab()
	
	// AJUSTA O TAMANHO DA TABELA
	ajustaTamanhoTabelas()
	
	// ESCONDE CAMPOS
	$(".PROGRAMACAO").hide()
	$(".RAD").hide()
	$(".TOTALIZADOR").hide()
	
}

// LIMPA A TABELA RAD DE DESPROGRAMAÇÃO E ESCONDE OS CAMPOS 
function limpaEscondeRADDesp(){
	
	// LIMPA A TABELA RAD
	limpaRADDesp()
	
	// LIMPA O CABEÇALHO DA TABELA RAD
	limpaRADCabDesp()
	
	// AJUSTA O TAMANHO DA TABELA
	ajustaTamanhoTabelasDesp()
	
	// ESCONDE CAMPOS
	$(".DESPROGRAMACAO").hide()
	$(".RADDESP").hide()
	$(".TOTALIZADORDESP").hide()
	
}

// BUSCA O CÓDIGO DA ATIVIDADE
function buscaCodAtv(codColigada,numPlano){
	
	console.log("vou buscar o codAtividade")
	
	var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("NUMPLANOCORTE",numPlano,numPlano,ConstraintType.MUST)
	
	var constraints = new Array(a1,a2)
	
	var dataset = DatasetFactory.getDataset("dsBuscaAtvPlanoCorteOS",null,constraints,null)
	var row = dataset.values[0]
	
	console.log("Achei o codAtividade: "+row["CODATIVIDADE"])
	
	return row["CODATIVIDADE"]
	
}

// SE AINDA NÃO CRIOU UMA LINHA NO CABEÇALHO DA TABELA RAD
function temRadCab(){
	
	console.log("vou buscar linha da tabela CAB RAD")
	
	var ret = false
	
	// PERCORRE AS LINHAS
	$("th[id^='THDIA1RADDISP___1']").each(function(){
	
		console.log("achei")
		
		ret = true
	
	})

	return ret
	
}

// SE AINDA NÃO CRIOU UMA LINHA NO CABEÇALHO DA TABELA RAD
function temRadCabDesp(){
	
	console.log("vou buscar linha da tabela CAB RAD")
	
	var ret = false
	
	// PERCORRE AS LINHAS
	$("th[id^='THDIA1RADDISPDESP___1']").each(function(){
	
		console.log("achei")
		
		ret = true
	
	})

	return ret
	
}

// PERCORRE A TABELA E SE O FILTRO DA ALOCAÇÃO FOI PREENCHIDO, FAZ A TRATATIVA
/*function verificaAlocacaoTabela(){
	
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
		
}*/

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
/*function limpaTabelaPlanejamento(){
	
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

// LIMPA TABELA DE COMPONENTES
function limpaComponentesAtv(){
	
	// PERCORRE OS ITENS DA TABELA E REMOVE O SEU CONTEÚDO
	$("input[id^='CODIGO___']").each(function(index, value){
		
		$(this).parents("tr").remove();
		
	});
	
}

// LIMPA TABELA DE RECURSO N3
function limparTabelaRecursoN3(){
	
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
function verificaDispDiaAlocacao(codcoligada,idprj,idtrf,dataProgramada){
	
	ret = true
	// ret = false
	
	var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codcoligada,codcoligada,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("IDPRJ",idprj,idprj,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("IDTRF",idtrf,idtrf,ConstraintType.MUST)
	var a4 = DatasetFactory.createConstraint("DIA_PROG",dataProgramada,dataProgramada,ConstraintType.MUST)
	
	var constraints = new Array(a1,a2,a3,a4)
	
	var dataset = DatasetFactory.getDataset("dsVerificaAtvProgOS",null,constraints,null)
	var row = dataset.values
	
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
				
			}
			
		}
		
		console.log("a "+dataProgramada+" não pode ser alocada porque não tem OP precedente programada")
		
	} else {
		// SE NÃO
		
		ret = true
		
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
			var idprj = $("#IDPRJATV___"+seq).val()
			var idtrf = $("#IDTRFATV___"+seq).val()
			
			var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codcoligada,codcoligada,ConstraintType.MUST)
			var a2 = DatasetFactory.createConstraint("IDPRJ",idprj,idprj,ConstraintType.MUST)
			var a3 = DatasetFactory.createConstraint("IDTRF",idtrf,idtrf,ConstraintType.MUST)
			
			var constraints = new Array(a1,a2,a3)
			
			var dataset = DatasetFactory.getDataset("dsInfoFarolOS",null,constraints,null)
			var row = dataset.values
		
			// SE RETORNO NÃO É NULO OU VAZIO, OU SEJA, EXISTEM OP'S PRECEDENTES
			if(!(row=="" || row==null || row==undefined || row=="null")){
				
				console.log("não foi paralisado e tem OP precedentes")
				
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
					
				}
								
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
	
}*/


// VERIFICA SE SALDO FOI INFORMADO PARA ALOCAR
function saldoInformado(){
	
	var ret = false
	
	// PERCORRE TODAS AS COLUNAS DOS DIAS
	for(var i=1;i<=10;i++){
		
		// PERCORRE TODOS OS REGISTROS DA TABELA
		$("input[id^='DIA"+i+"RADPROG___']").each(function(){
			
			var seq = $(this).attr("id").split("___")[1]
			
			var saldo = $("#DIA"+i+"RADPROG___"+seq).val()
			
			// SE SALDO NÃO É NULO OU VAZIO
			if(!(saldo=="" || saldo==null || saldo==undefined)){
				
				ret = true
				
			}
			
		})
		
	}
	
	
	console.log("encontrei ao menos um dia selecionado e com saldo para alocar? "+ret)
	
	return ret
	
}

// VERIFICA SE A MP A SER TRANSFERIDA TEM SALDO
function temSaldoMP(codColigada,codFilial,planoCorte){
	
	console.log("verifica se a MP a ser transferida tem saldo")
	
	console.log("vou criar o movimento de transferência")
	
	// CONSTRAINTS PARA BUSCAR OS COMPONENTES 
	var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("PLANOCORTE",planoCorte,planoCorte,ConstraintType.MUST)

	var constraints = new Array(a1,a2,a3)
	
	// CRIAR CONSULTA E DATASET
	var dataset = DatasetFactory.getDataset("dsComponentePAPC",null,constraints,null)
	var row = dataset.values
	
	console.log("row")
	console.log(row)
				
	// SE RETORNO NÃO É NULO OU VAZIO
	if( !(row=="" || row==null || row==undefined) ){
	
		return true
		
	} else{
		// SE NÃO
		
		return false
		
	}
	
}

// VERIFICA SE OS DADOS OBRIGATÓRIOS PARA A PROGRAMAÇÃO FORAM INFORMADOS E ENVIA A SOLICITAÇÃO
function integrar(){
	
	console.log("vou integrar a alocação")
	
	// VARIÁVEIS 
	var seq2 
	var progNegada = new Array()
	var messageRet 
	var mov = true
	var codcoligada = $("#CODCOLIGADA").val()
    var codfilial =$("#CODFILIAL").val()
    var planoCorte = $("#NUMPLANOCORTEREAL").val()
    
    console.log("codcoligada: "+codcoligada+", codfilial: "+codfilial+", planoCorte: "+planoCorte)
    
	// VERIFICA SE ALGUM SALDO FOI INFORMADO PARA ALOCAR
	if(saldoInformado()){
	    
		console.log("tem saldo informado")
		
	    // // SE MOVIMENTO DE TRANSFERÊNCIA AINDA NÃO FOI GERADO DA MP DO PLANO
		// if( !(temMovTransferencia(codcoligada,codfilial,planoCorte) ) ){
		
		// 	console.log("não teve movimento de transferência gerado")
			
		// 	// SE A MP A SER TRANSFERIDA TEM SALDO
		//     if(temSaldoMP(codcoligada,codfilial,planoCorte)){
		    	
		//     	console.log("a MP do plano tem saldo e/ou está no local de estoque correto")
		    	
		//     	mov = true
		    	
		//     } else{
		//       	// SE NÃO
		    	
		//     	console.log("MP do plano não tem saldo e/ou não está no local de estoque correto")
		    	
		//     	mov = false
		    
		//     	// EXIBE ALERTA
		// 		Swal.fire({
		// 			  icon: 'error',
		// 			  title: 'Não é possível fazer a alocação porque a MP do plano de corte está sem saldo ou não está no local correto para transferir',
		// 			  text: 'Verifique e tente novamente'
		// 		})
		    
		//     }

		// }
		
		// console.log("mov: "+mov)
		
		// // SE MOVIMENTO DE TRANSFERÊNCIA AINDA NÃO FOI FEITA OU SALDO/LOCAL INCORRETOS
	    // if(mov){
	    	
	    	var myLoading2 = FLUIGC.loading(window);
			myLoading2.show();
			
			// TIME OUT DA EXECUÇÃO DA FUNÇÃO
			setTimeout(function(){
				
				var codcoligada = $("#CODCOLIGADA").val()
			    var codfilial =$("#CODFILIAL").val()
			    var planoCorte = $("#NUMPLANOCORTEREAL").val()
			    //var codOrdem = ""
			    var codAtividade = ""
			    var codmo = ""
			    var dataDe = ""
			    var dataAte = ""
			    var dataProgramada = ""
			    var horasProgramadas = "" 
			    var mov = true
			    
			    console.log("codcoligada: "+codcoligada+", codfilial: "+codfilial+", planoCorte: "+planoCorte)
			  
				// PERCORRE TODOS OS DIAS POSSÍVEIS
				for(var i=1; i<=10; i++){
					
					console.log("entrei no item "+i+" do laço")
					console.log("DIA"+i+"RADPROG___")
					
					var d = i
					
					var algo = "DIA"+d+"RADPROG___"
					
					// PERCORRE TODOS OS REGISTROS DA TABELA DE PROGRAMAÇÃO
					$("input[id^='"+algo+"']").each(function(index,value){
						
						console.log("algo: "+algo)
						
						seq2 = $(this).attr("id").split("___")[1]
						
						console.log("seq2: "+seq2)
						
						console.log("entrei no #DIA"+d+"RADPROG___"+seq2)

						// SALVA TODAS AS VARIÁVEIS NECESSÁRIAS PARA A INTEGRAÇÃO
						codcoligada = $("#CODCOLIGADA").val()
				        codfilial = $("#CODFILIAL").val()
					    planoCorte = $("#NUMPLANOCORTEREAL").val()
				        //codOrdem = $("#OPATV___"+seq2).val()
					    codAtividade = $("#CODATIVIDADEATV___"+seq2).val()
					    codmo = $("#CHAPARAD___"+seq2).val()
					    dataDe = $("#DATADE_PROG").val()
					    dataAte = $("#DATAATE_PROG").val()
				        dataDe = formataDataBanco(dataDe)
					    dataAte = formataDataBanco(dataAte)
					        
				        // SE DIA FOI PREENCHIDO
			        	if(!($("#DIA"+d+"RADPROG___"+seq2).val()=="" || $("#DIA"+d+"RADPROG___"+seq2).val()==null || $("#DIA"+d+"RADPROG___"+seq2).val()==undefined)){	
			        		
			        		dataProgramada = $("#DIA"+d+"RADREAL___"+seq2).val()
				            horasProgramadas = $("#DIA"+d+"RADPROG___"+seq2).val()
				            
				            console.log("#DIA"+d+"RADPROG___"+seq2+" foi preenchido com "+horasProgramadas)
				            
			        		console.log("dia 1 "+horasProgramadas)
				            console.log("vou tentar programar "+dataProgramada)
				            
				            // console.log("horasProgramadas.toString: "+horasProgramadas)
				            horasProgramadas = horasProgramadas.replace(",",'.')
				            
				            console.log("horasProgramadas.replace: "+horasProgramadas)
				            horasProgramadas = parseFloat(horasProgramadas)
				            horasProgramadas = horasProgramadas.toFixed(2)
				            console.log("horasProgramadas.toFixed(2): "+horasProgramadas)
					        
				            console.log("Alocação pode ser feita")
				            
				            var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codcoligada,codcoligada,ConstraintType.MUST)
				        	var a2 = DatasetFactory.createConstraint("CODFILIAL",codfilial,codfilial,ConstraintType.MUST)
				        	var a3 = DatasetFactory.createConstraint("NUMPLANOCORTE",planoCorte,planoCorte,ConstraintType.MUST)
				        	
				        	var constraints = new Array(a1,a2,a3)
				        	
				        	var dataset = DatasetFactory.getDataset("dsBuscaAtvPlanoCorteOS",null,constraints,null)
				        	var row = dataset.values
				        	var count = dataset.values.length
				        	
				        	console.log("row:")
				        	console.log(row)
				        	
				        	var integrado = 0
				        	var saldosProg = new Array()
				        	
				        	// PERCORRE TODOS OS REGISTROS
				        	for(var k=0;k<count;k++){
				        		
				        		console.log("entrei no for")
				        		
				        		var rep = row[k]
				        		
				        		var tempoTotalPlano = $("#TOTALHORASPAPC").val()
				        		if(tempoTotalPlano.includes(",")){
				        			
				        			tempoTotalPlano = tempoTotalPlano.replace(",",".")
				        			
				        		}
				        		
				        		var tempo = 0
				        		tempoTotalPlano = parseFloat(tempoTotalPlano)
				        		var tempoAtvOrdem = rep["TEMPO"]
				        		tempoAtvOrdem = parseFloat(tempoAtvOrdem).toFixed(2)
				        		var codOrdem = rep["CODORDEM"]
				        		var codAtividade = rep["CODATIVIDADE"]
				        		var idAtvOrdem = rep["IDATVORDEM"]
				        		var codEstrutura = rep["CODESTRUTURA"]
				        		var os = rep["OS"]
				        		var qtdeMP = rep["QTDEMP"]
				        		
				        		console.log("tempoTotalPlano: "+tempoTotalPlano+", tempoAtvOrdem: "+tempoAtvOrdem+", codOrdem: "+codOrdem+", codAtividade: "+codAtividade+
				        				", idAtvOrdem: "+idAtvOrdem+", codEstrutura: "+codEstrutura+", os: "+os+", qtdeMP: "+qtdeMP)
				        		
				        		// SE É A ÚLTIMA ATIVIDADE
				        		if(k+1==count){
				        			
				        			var total = 0
				        			
				        			for(var j=0; j<saldosProg.length;j++){
				        				
				        				console.log("vou somar "+saldosProg[j])
				        				
				        				total = parseFloat(total) + parseFloat(saldosProg[j])
				        			
				        				console.log("total: "+total)
				        				
				        			}
				        			
				        			console.log("total após a soma: "+total)
				        			
				        			//total = parseFloat(total).toFixed(2)
				        			 
				        			console.log("total acumulado antes da última: "+total+" e horasProgramadas: "+horasProgramadas)
				        			 
				        			tempo = horasProgramadas - total
				        			
				        			console.log("tempo apoós o cálculo: "+tempo)
				        			
				        			tempo = tempo.toFixed(2)
				        			
				        			console.log("tempo após arredondamento: "+tempo)
					        		 
				        		} else {
				        			// SE NÃO
				        			
				        			tempo = (((tempoAtvOrdem * 100) / tempoTotalPlano ) / 100) * horasProgramadas
				        			
				        			tempo = tempo.toFixed(1)
				        			
					        		console.log("tempo: "+tempo)
					        		
					        		saldosProg.push(tempo)
					        		
				        		}
				        		
				        		//tempo = tempo.toFixed(2).toString().replace(".",",")
				        		
				        		console.log("para a ordem "+codOrdem+", a atividade "+codAtividade+", vou alocar o tempo "+tempo)
				        		
				        		// EXECUTA A PROCEDURE DE INTEGRACAO
					            var retornoInt = execProcedure(codcoligada,codfilial,codOrdem,codAtividade,codmo,dataProgramada,tempo,planoCorte)
					           
					            // SE PROGRAMAÇÃO FOI REALIZADA
					            if(retornoInt){
					            	
						            console.log("integração foi realizada")
						            
						            integrado = integrado + 1
					
					            } else {
					            	// SE NÃO ESTÁ DISPONÍVEL
						            	
					            	console.log("Alocação foi negada")
					            	
					            	// FORMATA DATA PROGRAMADA
					            	dataProgramada = formataDataPadrao(dataProgramada)
					            	
					            	// SALVA AS DATAS QUE FORAM NEGADAS
					            	progNegada.push(dataProgramada)
					            	
					            	// LIMPA E DESABILITA O CAMPO ALOCADO
					            	$("#DIA"+d+"RADPROG___"+seq2).val("")
					            	
						        }
				        	
				        		console.log("integrado: "+integrado+", count: "+count)
				        		
				        		// SE TODAS AS PROGRAMAÇÕES INTEGRADAS FOR A QUANTIDADE TOTAL DAS ATIVIDADES
				        		if(integrado==count){
				        			
				        			console.log("integrado é igual a count")
				        			
				        			console.log("os: "+os+", codcoligada: "+codcoligada+", codfilial: "+codfilial+", codOrdem: "+codOrdem+", idAtvOrdem: "+idAtvOrdem+", codEstrutura: "+codEstrutura)
				        			
				        			// VERIFICA SE JÁ TEM MOVIMENTO DE TRANSFERÊNCIA, SE NÃO TEM, GERA
					            	//movimentoTransferencia(os,codcoligada,codfilial,codOrdem,idAtvOrdem,codEstrutura,qtdeMP)
					            	//movimentoTransferencia(os,codcoligada,codfilial,codOrdem,idAtvOrdem,codEstrutura,planoCorte,qtdeMP)
					            	
				        		}
				        		
				        	}
			        		
			        	}
					    	
					})
					
				}
				
		        // ATUALIZA OS DADOS
				buscarProgramacao(1)
				
				// LIMPA OS RECURSOS SELECIONADOS
				$("#RECURSO>option").remove()
				$("#CODMORECURSO").val("")
					
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
						  text: "Verifique as informações da alocação"
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
	    	
	   // }
	    
	} else {
		// SE NENHUM SALDO FOI INFORMADO
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'warning',
			  title: 'Nenhum dia foi alocado para programar!',
			  text: "Verifique e tente novamente"
		})
		
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

// VERIFICA SE JÁ TEM MOVIMENTO DE TRANSFERÊNCIA, SE NÃO TEM, GERA
function movimentoTransferencia(numOS,codColigada,codFilial,codOrdem,idAtvOrdem,codEstrutura,planoCorte,qtdeMP){
	
	console.log("vou verificar o movimento de transferência")
	
	console.log("codcoligada: "+codColigada+", codfilial: "+codFilial+", codOrdem: "+codOrdem+", idAtvOrdem: "+idAtvOrdem+", codEstrutura: "+codEstrutura+", qtdeMP: "+qtdeMP+
			", planoCorte: "+planoCorte)
	
	// SE MOVIMENTO DE TRANSFERÊNCIA AINDA NÃO FOI GERADO PARA A ATIVIDADE DA OP
	//if( !(temMovTransferencia(codColigada,codFilial,codOrdem,idAtvOrdem) ) ){
		
	console.log("vou criar o movimento de transferência")
	
	// CONSTRAINTS PARA BUSCAR OS COMPONENTES 
	var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("PLANOCORTE",planoCorte,planoCorte,ConstraintType.MUST)
	//var a3 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
	//var a4 = DatasetFactory.createConstraint("IDATVORDEM",idAtvOrdem,idAtvOrdem,ConstraintType.MUST)
	//var a5 = DatasetFactory.createConstraint("CODESTRUTURA",codEstrutura,codEstrutura,ConstraintType.MUST)

	var constraints = new Array(a1,a2,a3)
	
	// CRIAR CONSULTA E DATASET
	var dataset = DatasetFactory.getDataset("dsComponentePAPC",null,constraints,null)
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
			//var qtde = rep["CONSUMO_PLANEJADO"]
			var precoUnit = rep["CUSTOMEDIO"]
			//var valorTotal = rep["VALORTOTAL"]
			var codloc = rep["CODLOC"]
			
			//qtde = parseFloat(rep["CONSUMO_PLANEJADO"]).toFixed(4)
			
			console.log("idprd: "+idprd+", qtdeMP: "+qtdeMP)
			
			// SE MOVIMENTO DE TRANSFERÊNCIA AINDA NÃO FOI GERADO PARA O COMPONENTE PARA A ATIVIDADE DA OP
			if( !(temMovTransferencia(codColigada,codFilial,planoCorte) ) ){
	
				// SE QUANTIDADE DO CONSUMO PLANEJADO NÃO É NULO
				if( !( (qtdeMP=="" || qtdeMP==null || qtdeMP==undefined || qtdeMP=="null") && (precoUnit=="" || precoUnit==null || precoUnit==undefined || precoUnit=="null") ) ){
					
					// SE QTDE TEM PONTO
					if(qtdeMP.indexOf(".")!=-1){
						
						qtdeMP = qtdeMP.replace(".",",")
						
					}
					
					// SE QTDE TEM PONTO
					if(precoUnit.indexOf(".")!=-1){
						
						precoUnit = precoUnit.replace(".",",")
						
					}
					
					// SE CODLOC É NULO OU VAZIO
					if(codloc=="" || codloc==null || codloc==undefined || codloc=="null"){
						
						codloc = "22"
						
					}
					
					console.log("idprd: "+idprd+", qtdeMP: "+qtdeMP)
					
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
						"	 <CAMPOLIVRE3>" + planoCorte + "</CAMPOLIVRE3>" +
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
						"    <QUANTIDADE>" + qtdeMP + "</QUANTIDADE>" +   
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

// VERIFICA SE MOVIMENTO DE TRANSFERÊNCIA AINDA NÃO FOI GERADO PARA A ATIVIDADE DA OP
//function temMovTransferencia(codcoligada,codfilial,codOrdem,idAtvOrdem,idprd){
function temMovTransferencia(codcoligada,codfilial,planoCorte){
	
	console.log("vou verificar se já existe o movimento de transferência")
	
	console.log("codcoligada: "+codcoligada+", codfilial: "+codfilial+", planoCorte: "+planoCorte)
	
	var ret = false
	
	var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codcoligada,codcoligada,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("CODFILIAL",codfilial,codfilial,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("PLANOCORTE",planoCorte,planoCorte,ConstraintType.MUST)
	
	var constraints = new Array(a1,a2,a3)
	
	var dataset = DatasetFactory.getDataset("dsBuscaMovTransferenciaPAPC",null,constraints,null)
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

// ATUALIZA OS SALDOS ALOCADOS POR DIAS
/*function atualizaSaldosDias(codcoligada,codfilial,codOrdem,idAtvOrdem,dataDe,dataAte,seq2){
	
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
				$("#DIA1ATV___"+seq2).prop("readonly",true)
				$("#D1___"+seq2).removeClass("diaSelecionado")
				
			}
			
			if($("#DIA2ATVREAL___"+seq2).val()==rep["DIA"]){
				
				var alocado = rep["ALOCADO"]
				alocado = parseFloat(alocado)
				alocado = alocado.toFixed(2).toString().replace(".",",")
				
				$("#DIA2ATV___"+seq2).val(alocado)
				$("#DIA2ATV___"+seq2).prop("readonly",true)
				$("#D2___"+seq2).removeClass("diaSelecionado")
				
			}
			
			if($("#DIA3ATVREAL___"+seq2).val()==rep["DIA"]){
				
				var alocado = rep["ALOCADO"]
				alocado = parseFloat(alocado)
				alocado = alocado.toFixed(2).toString().replace(".",",")
				
				$("#DIA3ATV___"+seq2).val(alocado)
				$("#DIA3ATV___"+seq2).prop("readonly",true)
				$("#D3___"+seq2).removeClass("diaSelecionado")
				
			}
			
			if($("#DIA4ATVREAL___"+seq2).val()==rep["DIA"]){
				
				var alocado = rep["ALOCADO"]
				alocado = parseFloat(alocado)
				alocado = alocado.toFixed(2).toString().replace(".",",")
				
				$("#DIA4ATV___"+seq2).val(alocado)
				$("#DIA4ATV___"+seq2).prop("readonly",true)
				$("#D4___"+seq2).removeClass("diaSelecionado")
				
			}
			
			if($("#DIA5ATVREAL___"+seq2).val()==rep["DIA"]){
				
				var alocado = rep["ALOCADO"]
				alocado = parseFloat(alocado)
				alocado = alocado.toFixed(2).toString().replace(".",",")
				
				$("#DIA5ATV___"+seq2).val(alocado)
				$("#DIA5ATV___"+seq2).prop("readonly",true)
				$("#D5___"+seq2).removeClass("diaSelecionado")
				
			}
			
			if($("#DIA6ATVREAL___"+seq2).val()==rep["DIA"]){
				
				var alocado = rep["ALOCADO"]
				alocado = parseFloat(alocado)
				alocado = alocado.toFixed(2).toString().replace(".",",")
				
				$("#DIA6ATV___"+seq2).val(alocado)
				$("#DIA6ATV___"+seq2).prop("readonly",true)
				$("#D6___"+seq2).removeClass("diaSelecionado")
				
			}
			
			if($("#DIA7ATVREAL___"+seq2).val()==rep["DIA"]){
				
				var alocado = rep["ALOCADO"]
				alocado = parseFloat(alocado)
				alocado = alocado.toFixed(2).toString().replace(".",",")
				
				$("#DIA7ATV___"+seq2).val(alocado)
				$("#DIA7ATV___"+seq2).prop("readonly",true)
				$("#D7___"+seq2).removeClass("diaSelecionado")
				
			}
			
			if($("#DIA8ATVREAL___"+seq2).val()==rep["DIA"]){
				
				var alocado = rep["ALOCADO"]
				alocado = parseFloat(alocado)
				alocado = alocado.toFixed(2).toString().replace(".",",")
				
				$("#DIA8ATV___"+seq2).val(alocado)
				$("#DIA8ATV___"+seq2).prop("readonly",true)
				$("#D8___"+seq2).removeClass("diaSelecionado")
				
			}
			
			if($("#DIA9ATVREAL___"+seq2).val()==rep["DIA"]){
				
				var alocado = rep["ALOCADO"]
				alocado = parseFloat(alocado)
				alocado = alocado.toFixed(2).toString().replace(".",",")
				
				$("#DIA9ATV___"+seq2).val(alocado)
				$("#DIA9ATV___"+seq2).prop("readonly",true)
				$("#D9___"+seq2).removeClass("diaSelecionado")
				
			}
			
			if($("#DIA10ATVREAL___"+seq2).val()==rep["DIA"]){
				
				var alocado = rep["ALOCADO"]
				alocado = parseFloat(alocado)
				alocado = alocado.toFixed(2).toString().replace(".",",")
				
				$("#DIA10ATV___"+seq2).val(alocado)
				$("#DIA10ATV___"+seq2).prop("readonly",true)
				$("#D10___"+seq2).removeClass("diaSelecionado")
				
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

// ATUALIZA OS DADOS DA ATIVIDADE PROGRAMADA
function atualizaProgAtv(codcoligada, codfilial, codOrdem, codAtividade, celula, codigoPrd, idPrd, codPosto, codPrj, dataDe, dataAte, seq2){
	
	console.log("vou atualizar os dados da atividade que foi alocada")
	console.log("codcoligada: "+codcoligada+", codfilial: "+codfilial+", codOrdem: "+codOrdem+", codAtividade: "+codAtividade+", celula: "+celula+", codigoPrd: "+codigoPrd+", idPrd: "+idPrd+", codPosto: "+codPosto+", codPrj: "+codPrj+", dataDe: "+dataDe+", dataAte: "+dataAte+", seq2: "+seq2)
	
	var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codcoligada,codcoligada,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("CODFILIAL",codfilial,codfilial,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
	var a4 = DatasetFactory.createConstraint("CODATIVIDADE",codAtividade,codAtividade,ConstraintType.MUST)
	var a5 = DatasetFactory.createConstraint("CELULA",celula,celula,ConstraintType.MUST)
	var a6 = DatasetFactory.createConstraint("CODIGOPRD",codigoPrd,codigoPrd,ConstraintType.MUST)
	var a7 = DatasetFactory.createConstraint("IDPRD",idPrd,idPrd,ConstraintType.MUST)
	var a8 = DatasetFactory.createConstraint("CODPOSTO",codPosto,codPosto,ConstraintType.MUST)
	var a9 = DatasetFactory.createConstraint("CODPRJ",codPrj,codPrj,ConstraintType.MUST)
	var a10 = DatasetFactory.createConstraint("DATA_DE",dataDe,dataDe,ConstraintType.MUST)
	var a11 = DatasetFactory.createConstraint("DATA_ATE",dataAte,dataAte,ConstraintType.MUST)
	
	constraints = new Array(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11)
	
	var dataset = DatasetFactory.getDataset("dsAtualizaDadosAtvOS",null,constraints,null)
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
			
			saldoAlocado = rep["ALOCADO"]
			
		}
		if(!(rep["APONTADO"]=="" || rep["APONTADO"]==null || rep["APONTADO"]==undefined || rep["APONTADO"]=="null")){
		
			apontado = rep["APONTADO"]
			
			apontado = parseFloat(apontado)
			saldoAlocado = parseFloat(saldoAlocado)
			
			saldoAlocado = saldoAlocado - apontado
			
		}
		if(!(rep["CARGA_PREV"]=="" || rep["CARGA_PREV"]==null || rep["CARGA_PREV"]==undefined || rep["CARGA_PREV"]=="null")){
			
			cargaPrev = rep["CARGA_PREV"]/60
			cargaPrev = cargaPrev.toFixed(2)
			
		}
		
		var saldoRevisado = 0
		var avanco = 0
		
		var dscStatus = rep["DSCSTATUS"]
		var statusAtv = rep["STATUS_ATV"]
		
		console.log("saldoAlocado: "+saldoAlocado)
		console.log("apontado: "+apontado)
		console.log("cargaPrev: "+cargaPrev)
		console.log("dscStatus: "+dscStatus)
		console.log("avanco: "+avanco)
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
		if(apontado==0){
			
			avanco = 0
			
		} else {
			// SE NÃO
			
			avanco = (apontado / cargaPrev) *100
			
		}
		
		avanco = avanco.toFixed(0)
		
		// SE SALDO ALOCAR É DIFERENTE DE 0
		if(!(saldoAlocar==0)){
			
			saldoAlocar = saldoAlocar.toFixed(2)
		
		}
		
		saldoAlocado = saldoAlocado.toString()
		apontado = apontado.toString()
		cargaPrev = cargaPrev.toString()
		avanco = avanco.toString()
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
		
		if(avanco.includes(".")){
			
			avanco = avanco.replace(".",",")
			
		}
		
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
		
		//apontado = apontado.toString()
		
		$("#STATUSOPATV___"+seq2).val(dscStatus)
		$("#STATUSATV___"+seq2).val(statusAtv)
		$("#CARGAPREVATV___"+seq2).val(cargaPrev)
		$("#CARGAREALATV___"+seq2).val(apontado)
		$("#SALDOREVATV___"+seq2).val(saldoRevisado)
		$("#SALDOALOCADOATV___"+seq2).val(saldoAlocado)
		$("#SALDOAALOCARATV___"+seq2).val(saldoAlocar)
		$("#AVANCOATV___"+seq2).val(avanco+" %")
		
	}
		
}*/

// EXIBE/ESCONDE O FILTRO
function filtros(obj){
	
	// SE ABA É DO PLANEJAMENTO
	if(obj==1){
	
		//$(".filtros").show()
		$(".filtros").hide()
		$(".filtrosDesp").hide()
		$(".expansor1").show()
		$(".expansor2").hide()
		$("#ICONREDUZIR").hide()
		$("#ICONEXPANDIR").show()

		$(".filtrosHab").hide()
		$(".expansor3").hide()
		$("#ICONREDUZIR3").hide()
		$("#ICONEXPANDIR3").hide()
		
		// SE TABELA DE PLANEJAMENTO TEM ITENS
		if(tabelaProgItens()){
			
			console.log("tabela de planejamento tem itens, vou reduzir os filtros")
			
			// REDUZ O FILTRO
			$("#ICONREDUZIR").click()
			
			// MOSTRA O CONTEÚDO DA TABELA
			//$(".RAD").show()
			$(".PROGRAMACAO").show()
			
		} else {
			// SE NÃO
			
			console.log("tabela de planejamento não tem itens, vou expandir os filtros")
			
			// EXPANDE O FILTRO
			$("#ICONEXPANDIR").click()
			
			// ESCONDE O CONTEÚDO DA TABELA
			//$(".RAD").hide()
			$(".PROGRAMACAO").hide()
			
		}
		
	}
	
	// SE ABA É DO RESUMO DA ALOCAÇÃO
	if(obj==2){
		
		$(".filtros").hide()
		//$(".filtrosResAloc").show()
		$(".filtrosDesp").hide()
		$(".expansor1").hide()
		$(".expansor2").show()
		$("#ICONREDUZIR2").hide()
		$("#ICONEXPANDIR2").show()

		$(".filtrosHab").hide()
		$(".expansor3").hide()
		$("#ICONREDUZIR3").hide()
		$("#ICONEXPANDIR3").hide()
		
		// SE TABELA DE RESUMO TEM ITENS
		if(tabelaDespTemItens()){
			
			console.log("tabela de alocação tem itens, vou reduzir os filtros")
			
			// REDUZ O FILTRO
			$("#ICONREDUZIR2").click()
			
			// MOSTRA O CONTEÚDO DA TABELA
			//$(".RADDESP").show()
			$(".DESPROGRAMACAO").show()
			
		} else {
			// SE NÃO
			
			console.log("tabela de alocação não tem itens, vou expandir os filtros")
			
			// EXPANDE O FILTRO
			$("#ICONEXPANDIR2").click()
			
			// ESCONDE O CONTEÚDO DA TABELA
			//$(".RADDESP").hide()
			$(".PROGRAMACAO").hide()
			
		}
		
	}
	if(obj==3) {

		$(".filtros").hide()
		//$(".filtrosResAloc").show()
		$(".filtrosDesp").hide()
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
function tabelaProgItens(){
	
	var ret = false
	
	// PERCORRE TODOS OS REGISTROS
	$("input[id^='OPERADORRAD___']").each(function(){
		
		ret = true
		
	})
	
	return ret
	
}

// VERIFICA SE TABELA DE RESUMO TEM ITENS
function tabelaDespTemItens(){
	
	var ret = false
	
	// PERCORRE TODOS OS REGISTROS
	$("input[id^='OPERADORRADDESP___']").each(function(){
		
		ret = true
		
	})
	
	return ret
	
}

// LIMPA TODOS OS DADOS PROGRAMADOS
/*function limpaProgramacaoSalva(){
	
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
	
}*/

// CALCULA TODAS AS HORAS ALOCADAS PARA ATIVIDADE
/*function calculaHorasAlocadas(seq){
	
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

// VERIFICA SE A QUANTIDADE DE HORAS ESTÁ DENTRO DO SALDO A ALOCAR E DA DISPONIBILIDADE DO RECURSO 
function verificaHoras(obj){
	
	var seq = $(obj).attr("id").split("___")[1]
	console.log("seq: "+seq)
	
	var instance = $(obj).attr("id").split("___")[0]
	console.log("instance: "+instance+"___"+seq)
	
	// SE DIA ALOCADO FOR FORA DO PERÍODO DO PLANEJAMENTO
	if(verificaDiaAlocado(seq,instance)){
		
		var horas = $("#"+instance+"___"+seq).val()
		var saldo = $("#SALDOAALOCARATV___"+seq).val()
		
		saldo = saldo.replace(",",".")
		saldo = parseFloat(saldo)
		
		var recurso = $("#GRUPORECURSON3").val()
		var nomes = new Array()
			
		console.log("Recursos selecionados")
		console.log(recurso)
		
		// CALCULA TODAS AS HORAS ALOCADAS PARA ATIVIDADE
		var horas = calculaHorasAlocadas(seq)
		
		console.log("horas alocadas: "+horas+", saldoAlocar: "+saldo)
		
		// SE A QUANTIDADE HORAS INFORMADAS ULTRAPASSOU O SALDO A ALOCAR
		if(horas>saldo){
			
			// LIMPA O CAMPO 
			$("#"+instance+"___"+seq).val("")
			$("#"+instance+"___"+seq).prop("readonly",true)
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'A quantidade de horas informada ultrapassou o saldo a alocar',
				  text: 'Verifique e tente novamente'
			})
			
		} 
		
	} else {
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
	
}*/

// EXECUTA A PROCEDURE
function execProcedure(coligada,filial,codOrdem,codAtividade,codmo,dataProgramada,horasProgramadas,planoCorte){
	
	//execProcedure(codcoligada,codfilial/*,codOrdem*/,codAtividade,codmo,dataProgramada,horasProgramadas,planoCorte)
	
	console.log("Vou executar a Procedure")
	
	console.log("coligada: "+coligada+", filial: "+filial+", codOrdem: "+
			codOrdem+", codAtividade: "+codAtividade+", codmo: "+codmo+
			", dataProgramada: "+dataProgramada+", horasProgramadas: "+horasProgramadas)
	
	console.log("planoCorte: "+planoCorte)
			
	var constraints
	
    //var c1 = DatasetFactory.createConstraint("NUMPROCESSO", numProcess, numProcess, ConstraintType.MUST)
    var c1 = DatasetFactory.createConstraint("CODCOLIGADA", coligada, coligada, ConstraintType.MUST)
    var c2 = DatasetFactory.createConstraint("CODFILIAL", filial, filial, ConstraintType.MUST)
    var c3 = DatasetFactory.createConstraint("CODORDEM", codOrdem, codOrdem, ConstraintType.MUST)
    var c4 = DatasetFactory.createConstraint("CODATIVIDADE", codAtividade, codAtividade, ConstraintType.MUST)
    var c5 = DatasetFactory.createConstraint("CODPESSOA", codmo, codmo, ConstraintType.MUST)
    var c6 = DatasetFactory.createConstraint("DATAPROGRAMADA", dataProgramada, dataProgramada, ConstraintType.MUST)
    var c7 = DatasetFactory.createConstraint("HORASPROGRAMADAS", horasProgramadas, horasProgramadas, ConstraintType.MUST)
    var c8 = DatasetFactory.createConstraint("PLANOCORTE", planoCorte, planoCorte, ConstraintType.MUST)
    
	var usuario = $("#USUARIOATUAL").val()
	var c9 = DatasetFactory.createConstraint("USUARIOATUAL", usuario, usuario, ConstraintType.MUST);
    
	var constraints = new Array(c1,c2,c3,c4,c5,c6,c7,c8,c9)
    
    console.log("Vou executar o dataset da PROCEDURE DA PROGRAMAÇÃO")
    
    var dataset = DatasetFactory.getDataset("dsProcedureProgramacao", null, constraints, null)
    
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

///  REPROGRAMAÇÃO

//ADICIONA UMA LINHA NA TABELA DAS ATIVIDADES PROGRAMADAS
function addChild(){
	
	var row = wdkAddChild('REPROGRAMACAO')
	
	//$("#HORASPROGRAMADAS___"+row).prop("disabled",true)
	
	return row
	
}

// ADICIONA UMA LINHA NA TABELA DAS ATIVIDADES QUE TERÃO TROCA DE OP
function addReprog(){
	
	// SE TEM ATIVIDADES SELECIONADAS
	if(verificaSelecaoAtvs()){
		
		var row = wdkAddChild('REPROGTROCAROP')
		
		// DESABILITA CAMPOS
		$("#CODCELULAREPROG___"+row).prop("disabled",true)
		$("#ORDEMREPROG___"+row).prop("disabled",true)
		$("#ATIVIDADEREPROG___"+row).prop("disabled",true)
		$("#PRIORIDADEATVSREPROG___"+row).prop("disabled",true)
		$("#HORASPROGRAMADASREPROG___"+row).prop("disabled",false)

		return row

	} else {
		// SE NÃO
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'Não há atividades selecionadas para realizar a troca de OP',
			  text: 'Verifique e tente novamente'
		})
		
	}
		
}

// EXCLUI UM REGISTRO DA TABELA DE TROCA DE OP
function excluirReprog(oElement){
	
	// APAGA O ITEM
    fnWdkRemoveChild(oElement)
    
}

// FAZ A EXPANSÃO DOS CAMPOS DO FILTRO
function expandirFiltro(){
	
	// EXIBE/ESCONDE OS CAMPOS NECESSÁRIOS	
	$(".filtros").show()
	$("#ICONREDUZIR").show()
	$("#ICONEXPANDIR").hide()
	
}

// FAZ A REDUÇÃO DOS CAMPOS DO FILTRO
function reduzirFiltro(){
	
	// EXIBE/ESCONDE OS CAMPOS NECESSÁRIOS
	$(".filtros").hide()
	$("#ICONEXPANDIR").show()
	$("#ICONREDUZIR").hide()
	
}

// LIMPA TODAS AS HORAS PROGRAMADAS DA TABELA DE TROCAR OP
function limpaHorasAtvsTrocarOP(){

	// PERCORRE TODAS LINHAS DA TABELA PARA TROCAR OP
	$("input[id^='OSREPROG___']").each(function(){
	
		var seq = $(this).attr("id").split("___")[1]
		
		$("#HORASPROGRAMADASREPROG___"+seq).val("")
		
	})
	
}

// VERIFICA SE TEM ATIVIDADES NA TABELA PARA TROCAR OP
function temAtvsTrocarOP(){
	
	var ret = false
	
	// PERCORRE TODAS LINHAS DA TABELA PARA TROCAR OP
	$("input[id^='OSREPROG___']").each(function(){
	
		var seq = $(this).attr("id").split("___")[1]
		
		var horas = $("#HORASPROGRAMADASREPROG___"+seq).val()
		
		// SE HORAS FORAM INFORMADAS
		if(!(horas=="" || horas==null || horas==undefined)){
			
			ret = true
				
		}
		
	})
	
	console.log("temAtvsTrocarOP? "+ret)
	
	return ret
	
}

// HABILITA MATRICULA
function habilitaMatricula(){
	
	var myLoading2 = FLUIGC.loading(window);
	myLoading2.show();
	
	setTimeout(function(){
	
		var dataProg = $("#DATA_PROGRAMADA").val()
		
		console.log("dataProg: "+dataProg)
		
		// FORMATA A DATA NO FORMATO DE BANCO
		dataProg = formataDataBanco(dataProg)
		
		// SALVA A DATA REAL EM FORMATO DE BANCO
		$("#DATA_PROGRAMADA_REAL").val(dataProg)
		
		// FAZ O RELAOD NO CAMPO ZOOM
		reloadZoomFilterValues("MATRICULA","DIA,"+dataProg)
		
		// HABILITA CAMPOS
		$("#MATRICULA").prop("disabled",false)
		
		// LIMPA OS CAMPOS
		$("#MATRICULA>option").remove()
		$("#TURNO_NOVO").val("")
		
		$("#CODMO").val("")
		$("#RECPJ").val("")
		$("#CODCOLIGADA").val("")
		
		// LIMPA A TABELA DE ATIVIDADES
		limpaTabelaAtvs()
		
		// LIMPA TODOS OS CAMPOS DAS ABAS
		limpaCamposAbas()
	
		// ESCONDE AS ABAS 
		$(".ABAS").hide()
		
		
	},500)

	setTimeout(function(){
					
		myLoading2.hide();
				  
    },500)
	
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

// BUSCAR TODAS AS ATIVIDADES
function buscar(){
	
	console.log("vou buscar as atividades de acordo com os filtros preenchidos")
	
	var myLoading2 = FLUIGC.loading(window);
	myLoading2.show();
	
	// LIMPA A TABELA DAS ATIVIDADES
	limpaTabelaAtvs()
	
	// LIMPA TODOS OS CAMPOS DAS ABAS
	limpaCamposAbas()
	
	$(".TABELA_ATIVIDADES").hide()
	$(".ABAS").hide()
	
	// INICIA A OPERAÇÃO DEPOIS DE CARREGAR O LOAD
	setTimeout(function(){
		
		var codColigada = $("#CODCOLIGADA").val()
		var codFilial = $("#CODFILIAL").val()
		var dataProg = $("#DATA_PROGRAMADA_REAL").val()
		var codmo = $("#CODMO").val()
		var ordenarPor = "ord"
		
		console.log("codColigada: "+codColigada+", codFilial: "+codFilial+", dataProg: "+dataProg+", codmo: "+codmo)
		
		// SE CAMPOS OBRIGATÓRIOS NÃO FORAM PREENCHIDOS
		if((codColigada=="" || codColigada==null || codColigada==undefined) || (codFilial=="" || codFilial==null || codFilial==undefined) || (dataProg=="" || 
				dataProg==null || dataProg==undefined) || (codmo=="" || codmo==null || codmo==undefined)){
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'Os campos obrigatórios não foram preenchidos',
				  text: 'Verifique e tente novamente'
			})
			
		} else {
			// SE NÃO
			
			// FAZER BUSCA E PREENCHER A TABELA
			var a1 = DatasetFactory.createConstraint("CODCOLIGADA", codColigada, codColigada, ConstraintType.MUST);
			var a2 = DatasetFactory.createConstraint("CODFILIAL", codFilial, codFilial, ConstraintType.MUST);
			var a3 = DatasetFactory.createConstraint("DATA_DE", dataProg, dataProg, ConstraintType.MUST);
			var a4 = DatasetFactory.createConstraint("CODMO", codmo, codmo, ConstraintType.MUST);
			var a5 = DatasetFactory.createConstraint("ORDENAR_POR", ordenarPor, ordenarPor, ConstraintType.MUST);
			
			var constraint = new Array(a1,a2,a3,a4,a5);
			
			var dataset = DatasetFactory.getDataset("dsBuscaHistAtvProgOperador", null, constraint, null);
			var row = dataset.values;
			
			console.log("row")
			console.log(row)
			
			// SE RETORNO É VAZIO OU NULO
			if(row=="" || row==null || row==undefined){
				
				// EXPANDE OS FILTROS
				expandirFiltro()
				
				// EXIBE/ESCONDE OS CAMPOS NECESSÁRIOS
				$(".TABELA_ATIVIDADES").hide()
				$(".ABAS").hide()
				
				// EXIBE ALERTA
				Swal.fire({
					  icon: 'error',
					  title: 'Não há programações para os filtros informados',
					  text: 'Verifique e tente novamente'
				})
				
			} else{
				// SE NÃO
				
				var count = row.length
				
				console.log("count: "+count+", seq: "+seq)
				
				// PERCORRE TODOS OS REGISTROS
				for(var i=0; i<count; i++){
					
					// ADICIONA REGISTRO
					var seq = addChild()
					
					var rep = row[i]
					
					var os = rep["OS"]
					var codColigada = rep["CODCOLIGADA"]
					var codFilial = rep["CODFILIAL"]
					var codEstrutura = rep["CODESTRUTURA"]
					var idprj = rep["IDPRJ"]
					var op = rep["OP"]
					var idAtividade = rep["IDATVORDEM"]
					var dscAtividade = rep["DSCATIVIDADE"]
					var codAtividade = rep["CODATIVIDADE"]
					var prioridade = rep["PRIORIDADE"]
					var horasProgramadas = rep["ALOCADO"]
					var celula = rep["CELULAR"]
					var idAtvOrdemProg = rep["IDATVORDEMPROGRAMACAO"]
					
					// SALVA AS INFORMAÇÕES
					$("#OSATV___"+seq).val(os)
					$("#CODCOLIGADAATV___"+seq).val(codColigada)
					$("#CODFILIALATV___"+seq).val(codFilial)
					$("#CODESTRUTURA___"+seq).val(codEstrutura)
					$("#IDPRJATV___"+seq).val(idprj)
					$("#IDATVORDEMPROGRAMACAO___"+seq).val(idAtvOrdemProg)
					$("#OPATV___"+seq).val(op)
					$("#IDATIVIDADE___"+seq).val(idAtividade)
					$("#DSCATIVIDADE___"+seq).val(dscAtividade)
					$("#CODATIVIDADE___"+seq).val(codAtividade)
					$("#HORASPROGRAMADASREAL___"+seq).val(horasProgramadas)
					$("#HORASPROGRAMADAS___"+seq).val(horasProgramadas.toString().replace(".",","))
					$("#CELULA___"+seq).val(celula)
					
					// SE É UMA OP DE RETRABALHO
					if(rep["RETRABALHO"]=="1"){
						
						$("#PRIORIDADE___"+seq).val(rep["VIEWPRIORIDADE"])
						
					} else {
						// SE NÃO
						
						$("#PRIORIDADE___"+seq).val(prioridade)
						
					}
					    
				}
				
				// EXIBE OS CAMPOS OCULTOS
				$(".TABELA_ATIVIDADES").show()
				//$(".ABAS").show()
				
				// REDUZ O FILTRO
				reduzirFiltro()
				
			}
			
		}
		
	},500)
	
	// INICIA A OPERAÇÃO DEPOIS DE CARREGAR O LOAD
	setTimeout(function(){
		
		myLoading2.hide();
		
	},500)
	
}

// VERIFICA A ATIVIDADE SELECIONADA
function verificaAtv(obj){
		
	console.log("verifica Atv")
	
	var seq = $(obj).attr("id").split("___")[1]
	
	// SE A SELEÇÃO FOI COLOCADA
	if($("#SELECAO___"+seq).is(":checked")){
		
		$("#HORASPROGRAMADAS___"+seq).prop("disabled",true)
		
		$(".ABAS").show()
		
		// SE TEM ATIVIDADES NA TABELA PARA TROCAR OP
		if( temAtvsTrocarOP() && !(verificaSelecaoAtvs())){
			
			// RETORNA A SELEÇÃO
			$(obj).prop("checked",true)
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'Existem atividades incluídas para trocar OP. É necessário limpar as atividades dessa tabela, ou manter ao menos uma atividade selecionada para a troca.',
				  text: 'Verifique e tente novamente'
			})
			
		} else {
			// SE NÃO
			
			$("#HORASPROGRAMADAS___"+seq).prop("disabled",true)
			
			/*
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'warning',
				  title: 'Para alterar as horas programadas é necessério selecionar a atividade.',
				  text: 'Verifique e tente novamente'
			})
			*/
			
		}
		
	} else {
		// SE NÃO
		
		$("#HORASPROGRAMADAS___"+seq).prop("disabled",false)

		// SE TEM ATIVIDADES COM HORAS PROGRAMADAS NA TABELA DE TROCA DE OP
		if(temAtvsTrocarOP()){
			
			// LIMPA AS HORAS DAS ATIVIDADES
			limpaHorasAtvsTrocarOP()
			
		}
		
		// SE NÃO TEM ATIVIDADES SELECIONADAS
		if(!verificaSelecaoAtvs()){
			
			$(".ABAS").hide()
			
			/*
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'warning',
				  title: 'Para alterar as horas programadas é necessério selecionar a atividade.',
				  text: 'Verifique e tente novamente'
			})
			
			
			*/
			
		}
		
	}
	
}

// LIMPA A TABELA DAS ATIVIDADES
function limpaTabelaAtvs(){
	
	console.log("vou limpar as tabelas das atividades")
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSATV___']").each(function(){
		
		$(this).parents("tr").remove()
	
	})

}

// LIMPA TODOS OS CAMPOS DAS ABAS
function limpaCamposAbas(){
	
	// LIMPA OS CAMPOS DAS ABAS
	$("#NOVA_DATA").val("")
	$("#NOVA_DATA_REAL").val("")
	$("#NOVA_MATRICULA>option").remove()
	$("#CODMO_NOVO").val("")
	$("#HORAS_DISPONIVEIS").val("")
	$("#SALDO").val("")
	$("#MOTDESPROG1>option").remove()
	$("#CODINTERNO1").val("")
	$("#NOVA_DATA").val("")
	$("#NOVA_DATA_REAL").val("")
	$("#MOTDESPROG2>option").remove()
	$("#CODINTERNO2").val("")
	$("#NOVA_DATA2").val("")
	$("#NOVA_DATA_REAL2").val("")
	$("#HORAS_DISPONIVEIS2").val("")
	$("#SALDO2").val("")
	$("#MOTDESPROG3>option").remove()
	$("#CODINTERNO3").val("")
	$("#MOTDESPROG4>option").remove()
	$("#CODINTERNO4").val("")
	$("#HORAS_DISPONIVEIS5").val("")
	$("#SALDO5").val("")
	$("#MOTDESPROG5>option").remove()
	$("#CODINTERNO5").val("")
	
	// LIMPA AS ATIVIDADES DA TABELA DE TROCAR OP
	limpaTabelaTrocaOP()
	
}

// VERIFICA SE O OPERADOR PODE SER ALOCADO PARA AS ATIVIDADES SELECIONADAS
function verificaOperador(codmo){
	
	console.log("verificar se operador tem habilidade para as atividades")
	
	var ret = true
	var atividades = ""
	var dataProg = $("#DATA_PROGRAMADA_REAL").val()
	var codFilial = $("#CODFILIALDESP").val()
	
	console.log("codmo: "+codmo+", dataProg: "+dataProg)
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSATV___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		// SE ATIVIDADE FOI SELECIONADA
		if($("#SELECAO___"+seq).is(":checked")){
			
			var codAtv = $("#CODATIVIDADE___"+seq).val()
			var descAtv = $("#DSCATIVIDADE___"+seq).val()
			
			console.log("dataProg: "+dataProg+", codmo: "+codmo+", codAtv: "+codAtv)
			
			// FAZER BUSCA E PREENCHER A TABELA
			var a1 = DatasetFactory.createConstraint("CODMO", codmo, codmo, ConstraintType.MUST);
			var a2 = DatasetFactory.createConstraint("DATA_DE", dataProg, dataProg, ConstraintType.MUST);
			var a3 = DatasetFactory.createConstraint("CODATIVIDADE", codAtv, codAtv, ConstraintType.MUST);
			var a4 = DatasetFactory.createConstraint("DATA_ATE", dataProg, dataProg, ConstraintType.MUST);
			var a5 = DatasetFactory.createConstraint("CODFILIAL", codFilial, codFilial, ConstraintType.MUST);
			
			var constraint = new Array(a1,a2,a3,a4,a5);
			
			var dataset = DatasetFactory.getDataset("dsRadReprogDesprog", null, constraint, null);
			var row = dataset.values

			console.log("row")
			console.log(row)
			
			// SE CONSULTA NÃO OBETEVE RETORNO
			if(row=="" || row==null || row==undefined){
				
				ret = false
				
				if(atividades==""){
					
					atividades = descAtv
					
				} else {
				
					// SE ATIVIDADE AINDA NÃO FOI SALVA
					if(!(atividades.includes(descAtv))){
						
						atividades = atividades + ", "+descAtv
						
					}
					
				}
				
			}
			
		}
		
	})
	
	// SE EXISTEM ATIVIDADES QUE O OPERADOR NÃO TEM HABILIDADE
	if(!atividades==""){
		
		// LIMPA A SELEÇÃO
		$("#NOVA_MATRICULA>option").remove()
		$("#CODMO_NOVO").val("")
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'O operador selecionado não possui habilidade para a(s) atividade(s): '+atividades,
			  text: 'Verifique e tente novamente'
		})
	
	}
	
	return ret

}

// VERIFICA SE O OPERADOR PODE SER ALOCADO PARA AS ATIVIDADES SELECIONADAS
function verificaOperador2(codmo){
	
	console.log("verificar se operador tem habilidade para as atividades")
	
	var ret = true
	var atividades = ""
	var dataProg = $("#NOVA_DATA_REAL2").val()
	var codFilial = $("#CODFILIALDESP").val()
	
	console.log("codmo: "+codmo+", dataProg: "+dataProg)
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSATV___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		// SE ATIVIDADE FOI SELECIONADA
		if($("#SELECAO___"+seq).is(":checked")){
			
			var codAtv = $("#CODATIVIDADE___"+seq).val()
			var descAtv = $("#DSCATIVIDADE___"+seq).val()
			
			console.log("dataProg: "+dataProg+", codmo: "+codmo+", codAtv: "+codAtv)
			
			// FAZER BUSCA E PREENCHER A TABELA
			var a1 = DatasetFactory.createConstraint("CODMO", codmo, codmo, ConstraintType.MUST);
			var a2 = DatasetFactory.createConstraint("DATA_DE", dataProg, dataProg, ConstraintType.MUST);
			var a3 = DatasetFactory.createConstraint("CODATIVIDADE", codAtv, codAtv, ConstraintType.MUST);
			var a4 = DatasetFactory.createConstraint("DATA_ATE", dataProg, dataProg, ConstraintType.MUST);
			var a5 = DatasetFactory.createConstraint("CODFILIAL", codFilial, codFilial, ConstraintType.MUST);
			
			var constraint = new Array(a1,a2,a3,a4,a5);
			
			var dataset = DatasetFactory.getDataset("dsRadReprogDesprog", null, constraint, null);
			var row = dataset.values

			console.log("row")
			console.log(row)
			
			// SE CONSULTA NÃO OBETEVE RETORNO
			if(row=="" || row==null || row==undefined){
				
				ret = false
				
				if(atividades==""){
					
					atividades = descAtv
					
				} else {
				
					// SE ATIVIDADE AINDA NÃO FOI SALVA
					if(!(atividades.includes(descAtv))){
						
						atividades = atividades + ", "+descAtv
						
					}
					
				}
				
			}
			
		}
		
	})
	
	// SE EXISTEM ATIVIDADES QUE O OPERADOR NÃO TEM HABILIDADE
	if(!atividades==""){
		
		// LIMPA A SELEÇÃO
		$("#NOVA_MATRICULA2>option").remove()
		$("#CODMO_NOVO2").val("")
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'O operador selecionado não possui habilidade para a(s) atividade(s): '+atividades,
			  text: 'Verifique e tente novamente'
		})
	
	}
	
	return ret

}

// BUSCA E SALVA AS HORAS PROGRAMADAS PARA UM DETERMINADO OPERADOR
function buscaHorasProgramadas(codmo){
	
	console.log("busca se o operador selecionado possui saldo para ser alocado para as atividades")
	
	//var codmoAntigo = $("#CODMO").val()
	var codmoAntigo = buscaCodmoSelecionado()
	var codFilial = $("#CODFILIALDESP").val()
	
	// SE O OPERADOR SELECIONADO NÃO É O MESMO ALOCADO
	if(!(codmo==codmoAntigo)){
		
		var ret = true
		//var dataProg = $("#DATA_PROGRAMADA_REAL").val()
		var dataProg = buscaDataProgramadaSelecionada()
		var soma = 0
		var codColigada = $("#CODCOLIGADADESP").val()
		var numPlano = $("#NUMPLANOCORTEREALDESP").val()
		var codAtividade = buscaCodAtv(codColigada, numPlano)
		
		// PERCORRE TODOS OS REGISTROS DA TABELA
		$("input[id^='OPERADORRADDESP___']").each(function(){
			
			var seq = $(this).attr("id").split("___")[1]
			
			// PERCORRE TODOS OS DIAS
			for(var i=0;i<10;i++){
				
				// SE DIA FOI SELECIONADO
				if($("#RAD"+i+"DESP___"+seq).hasClass("desprogramar")){
					
					var saldo = $("#DIA"+i+"RADDESP___"+seq).val()
					
					if(saldo.includes(",")){
						
						saldo = saldo.replace(",",".")
						
					}
					
					saldo = parseFloat(saldo)
					
					soma = soma + saldo
					
				}	
				
			}
				
		})
		
		console.log("soma: "+soma)
		
		console.log("codmo: "+codmo+", dataProg: "+dataProg+", codAtividade: "+codAtividade)
		
		// FAZER BUSCA E PREENCHER A TABELA
		var a1 = DatasetFactory.createConstraint("CODMO", codmo, codmo, ConstraintType.MUST);
		var a2 = DatasetFactory.createConstraint("DATA_DE", dataProg, dataProg, ConstraintType.MUST);
		var a3 = DatasetFactory.createConstraint("CODATIVIDADE", codAtividade, codAtividade, ConstraintType.MUST);
		var a4 = DatasetFactory.createConstraint("DATA_ATE", dataProg, dataProg, ConstraintType.MUST);
		var a5 = DatasetFactory.createConstraint("CODFILIAL", codFilial, codFilial, ConstraintType.MUST);
		
		var constraint = new Array(a1,a2,a3,a4,a5);
		
		var dataset = DatasetFactory.getDataset("dsRadReprogDesprog", null, constraint, null);
		var row = dataset.values
		
		console.log("row")
		console.log(row)
		
		// SE RETORNO É NULO OU VAZIO
		if(!(row=="" || row==null || row==undefined)){
			
			var rep = row[0]
			
			var saldo = parseFloat(rep["ALOCADO"])
			
			console.log("saldo: "+saldo)
			
			// SE O FUNCIONÁRIO TEM SALDO PARA SER ALOCADO NA DATA SELECIONADA
			//if(saldo>0){
				
				//saldo = parseFloat(rep["SALDO_DISPONIBILIDADE"])
				//saldo = parseFloat(rep["ALOCADO"])
				
				saldo = saldo + soma
				
				console.log("saldo total: "+saldo)
				
				// SE O SALDO DO OPERADOR É MAIOR QUE A SOMA DAS ATIVIDADES SELECIONADAS
				if(saldo<=12){
					
					//var disp = 12 - parseFloat(rep["SALDO_DISPONIBILIDADE"]) 
					var disp = 12 - parseFloat(rep["ALOCADO"])
					
					$("#SALDO").val(disp)
					$("#HORAS_DISPONIVEIS").val(disp.toString().replace(".",","))
					
				} else {
					
					// ALERTA PARA UMA DATA SELECIONADA EM QUE O FUNCIONÁRIO NÃO TEM HORAS DISPONÍVEIS
					alertaData()
					
				}   
				
			/*} else {
				// SE NÃO
				
				// ALERTA PARA UMA DATA SELECIONADA EM QUE O FUNCIONÁRIO NÃO TEM HORAS DISPONÍVEIS
				alertaData()
				
			}*/
			
		} else {
			// SE NÃO
			
			// ALERTA PARA UMA DATA SELECIONADA EM QUE O FUNCIONÁRIO NÃO TEM HORAS DISPONÍVEIS
			alertaData()
			
		}
		
	} else {
		// SE NÃO
		
		// LIMPA OS CAMPOS
		$("#CODMO_NOVO").val("")
		$("#NOVA_MATRICULA>option").remove()
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'O operador selecionado é o mesmo que já está alocado',
			  text: 'Verifique e tente novamente'
		})
		
	}
	
}

// VERIFICA SALDO DO OPERADOR
function verificaSaldo(codmo,dataProg){
	
	var ret = true
	var soma = 0
	var codAtividade = ""
	var codFilial = $("#CODFILIALDESP").val()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSATV___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		// SE ATIVIDADE FOI SELECIONADA
		if($("#SELECAO___"+seq).is(":checked")){
			
			var programada = $("#HORASPROGRAMADASREAL___"+seq).val()
			codAtividade = $("#CODATIVIDADE___"+seq).val()
			
			soma = soma + parseFloat(programada)
			
		}
			
	})
			
	console.log("soma: "+soma)
		
	// FAZER BUSCA E PREENCHER A TABELA
	var a1 = DatasetFactory.createConstraint("CODMO", codmo, codmo, ConstraintType.MUST);
	var a2 = DatasetFactory.createConstraint("DATA_DE", dataProg, dataProg, ConstraintType.MUST);
	var a3 = DatasetFactory.createConstraint("CODATIVIDADE", codAtividade, codAtividade, ConstraintType.MUST);
	var a4 = DatasetFactory.createConstraint("DATA_ATE", dataProg, dataProg, ConstraintType.MUST);
	var a5 = DatasetFactory.createConstraint("CODFILIAL", codFilial, codFilial, ConstraintType.MUST);
	
	var constraint = new Array(a1,a2,a3,a4,a5);
	
	var dataset = DatasetFactory.getDataset("dsRadReprogDesprog", null, constraint, null);
	var row = dataset.values
	
	console.log("row")
	console.log(row)
	
	// SE RETORNO É NULO OU VAZIO
	if(!(row=="" || row==null || row==undefined)){
		
		var rep = row[0]
		
		var saldo = parseFloat(rep["ALOCADO"])
		
		console.log("saldo: "+saldo)

		saldo = saldo + soma
		
		console.log("saldo total: "+saldo)
		
		// SE O SALDO DO OPERADOR É MAIOR QUE A SOMA DAS ATIVIDADES SELECIONADAS
		if(saldo<=12){
			
			return true
			
		} else {
			
			// LIMPA OS CAMPOS
			$("#NOVA_MATRICULA>option").remove()
			$("#CODMO_NOVO").val("")
			$("#HORAS_DISPONIVEIS").val("")
			$("#SALDO").val("")
			$("#NOVA_DATA").val("")
			$("#NOVA_DATA_REAL").val("")
			$("#NOVA_DATA2").val("")
			$("#NOVA_DATA_REAL2").val("")
			$("#NOVA_MATRICULA2>option").remove()
			$("#CODMO_NOVO2").val("")
			$("#HORAS_DISPONIVEIS2").val("")
			$("#SALDO2").val("")
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'As somas das horas alocadas do operador ultrapassa as 12 horas permitidas',
				  text: 'Verifique e tente novamente'
			})
			
			return false
			
		}   
		
	}else {
		// SE NÃO 
		
		// SE A SOMA É MAIOR QUE 12
		if(soma>12){
			
			// LIMPA OS CAMPOS
			$("#NOVA_MATRICULA>option").remove()
			$("#CODMO_NOVO").val("")
			$("#HORAS_DISPONIVEIS").val("")
			$("#SALDO").val("")
			$("#NOVA_DATA").val("")
			$("#NOVA_DATA_REAL").val("")
			$("#NOVA_DATA2").val("")
			$("#NOVA_DATA_REAL2").val("")
			$("#NOVA_MATRICULA2>option").remove()
			$("#CODMO_NOVO2").val("")
			$("#HORAS_DISPONIVEIS2").val("")
			$("#SALDO2").val("")
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'As somas das horas alocadas do operador ultrapassa as 12 horas permitidas',
				  text: 'Verifique e tente novamente'
			})
			
			return false
			
		} else{
			// SE NÃO
			
			return true
			
		}
		
	}
	
}

// BUSCA E SALVA AS HORAS PROGRAMADAS PARA UM DETERMINADO OPERADOR
function buscaHorasProgramadas2(codmo){
	
	console.log("busca se o operador selecionado possui saldo para ser alocado para as atividades")
	
	//var codmoAntigo = $("#CODMO").val()
	var codmoAntigo = buscaCodmoSelecionado()
	var codFilial = $("#CODFILIALDESP").val()
	
	// SE O OPERADOR SELECIONADO NÃO É O MESMO ALOCADO
	if(!(codmo==codmoAntigo)){
		
		var ret = true
		//var dataProg = $("#NOVA_DATA_REAL2").val()
		var dataProg = buscaDataProgramadaSelecionada()
		var soma = 0
		var codColigada = $("#CODCOLIGADADESP").val()
		var numPlano = $("#NUMPLANOCORTEREALDESP").val()
		var codAtividade = buscaCodAtv(codColigada, numPlano)
		
		// PERCORRE TODOS OS REGISTROS DA TABELA
		$("input[id^='OPERADORRADDESP___']").each(function(){
			
			var seq = $(this).attr("id").split("___")[1]
			
			// PERCORRE TODOS OS DIAS
			for(var i=0;i<10;i++){
				
				// SE DIA FOI SELECIONADO
				if($("#RAD"+i+"DESP___"+seq).hasClass("desprogramar")){
					
					var saldo = $("#DIA"+i+"RADDESP___"+seq).val()
					
					if(saldo.includes(",")){
						
						saldo = saldo.replace(",",".")
						
					}
					
					saldo = parseFloat(saldo)
					
					soma = soma + saldo
					
				}	
				
			}
				
		})
			
		console.log("soma: "+soma)
		
		console.log("codmo: "+codmo+", dataProg: "+dataProg+", codAtividade: "+codAtividade)
		
		// FAZER BUSCA E PREENCHER A TABELA
		var a1 = DatasetFactory.createConstraint("CODMO", codmo, codmo, ConstraintType.MUST);
		var a2 = DatasetFactory.createConstraint("DATA_DE", dataProg, dataProg, ConstraintType.MUST);
		var a3 = DatasetFactory.createConstraint("CODATIVIDADE", codAtividade, codAtividade, ConstraintType.MUST);
		var a4 = DatasetFactory.createConstraint("DATA_ATE", dataProg, dataProg, ConstraintType.MUST);
		var a5 = DatasetFactory.createConstraint("CODFILIAL", codFilial, codFilial, ConstraintType.MUST);
		
		var constraint = new Array(a1,a2,a3,a4,a5);
		
		var dataset = DatasetFactory.getDataset("dsRadReprogDesprog", null, constraint, null);
		var row = dataset.values
		
		console.log("row")
		console.log(row)
		
		// SE RETORNO É NULO OU VAZIO
		if(!(row=="" || row==null || row==undefined)){
			
			var rep = row[0]
			
			var saldo = parseFloat(rep["ALOCADO"])
			
			console.log("saldo: "+saldo)
			
			// SE O FUNCIONÁRIO TEM SALDO PARA SER ALOCADO NA DATA SELECIONADA
			//if(saldo>0){
				
				//saldo = parseFloat(rep["SALDO_DISPONIBILIDADE"])
				//saldo = parseFloat(rep["ALOCADO"])
				
				saldo = saldo + soma
				
				console.log("saldo total: "+saldo)
				
				// SE O SALDO DO OPERADOR É MAIOR QUE A SOMA DAS ATIVIDADES SELECIONADAS
				if(saldo<=12){
					
					//var disp = 12 - parseFloat(rep["SALDO_DISPONIBILIDADE"]) 
					var disp = 12 - parseFloat(rep["ALOCADO"])
					
					$("#SALDO2").val(disp)
					$("#HORAS_DISPONIVEIS2").val(disp.toString().replace(".",","))
					
				} else {
					
					// ALERTA PARA UMA DATA SELECIONADA EM QUE O FUNCIONÁRIO NÃO TEM HORAS DISPONÍVEIS
					alertaData2()
					
				}   
				
			/*} else {
				// SE NÃO
				
				// ALERTA PARA UMA DATA SELECIONADA EM QUE O FUNCIONÁRIO NÃO TEM HORAS DISPONÍVEIS
				alertaData()
				
			}*/
			
		} else {
			// SE NÃO
			
			// ALERTA PARA UMA DATA SELECIONADA EM QUE O FUNCIONÁRIO NÃO TEM HORAS DISPONÍVEIS
			alertaData2()
			
		}
		
	} else {
		// SE NÃO
		
		// LIMPA OS CAMPOS
		$("#CODMO_NOVO2").val("")
		$("#NOVA_MATRICULA2>option").remove()
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'O operador selecionado é o mesmo que já está alocado',
			  text: 'Verifique e tente novamente'
		})
		
	}
	
}

// ALERTA PARA UMA DATA SELECIONADA EM QUE O FUNCIONÁRIO NÃO TEM HORAS DISPONÍVEIS
function alertaData(){
	
	// LIMPA A SELEÇÃO
	$("#NOVA_MATRICULA>option").remove()
	$("#CODMO_NOVO").val("")
	$("#SALDO").val("")
	$("#HORAS_DISPONIVEIS").val("")
	
	// EXIBE ALERTA
	Swal.fire({
		  icon: 'error',
		  title: 'O operador não tem horas disponíveis para ser alocado para a(s) atividade(s) selecionada(s) na data informada',
		  text: 'Verifique e tente novamente'
	})
	
}

// ALERTA PARA UMA DATA SELECIONADA EM QUE O FUNCIONÁRIO NÃO TEM HORAS DISPONÍVEIS
function alertaData2(){
	
	// LIMPA A SELEÇÃO
	$("#NOVA_MATRICULA2>option").remove()
	$("#CODMO_NOVO2").val("")
	$("#SALDO2").val("")
	$("#HORAS_DISPONIVEIS2").val("")
	
	// EXIBE ALERTA
	Swal.fire({
		  icon: 'error',
		  title: 'O operador não tem horas disponíveis para ser alocado para a(s) atividade(s) selecionada(s) na data informada',
		  text: 'Verifique e tente novamente'
	})
	
}

// ALERTA PARA UM FUNCIONÁRIO SELECIONADO QUE NÃO TEM HORAS DISPONÍVEIS NA DATA PROGRAMADA
function alertaFuncionario(){
	
	// LIMPA OS CAMPOS PREENCHIDOS
	$("#NOVA_DATA_REAL").val("")
	$("#NOVA_DATA").val("")
	
	// EXIBE ALERTA
	Swal.fire({
		  icon: 'error',
		  title: 'O operador não tem horas disponíveis para ser alocado para a(s) atividade(s) selecionada(s) na data informada',
		  text: 'Verifique e tente novamente'
	})
	
}

// ALERTA PARA UM FUNCIONÁRIO SELECIONADO QUE NÃO TEM HORAS DISPONÍVEIS NA DATA PROGRAMADA
function alertaFuncionario2(){
	
	// LIMPA OS CAMPOS PREENCHIDOS
	$("#NOVA_DATA_REAL2").val("")
	$("#NOVA_DATA2").val("")
	
	// EXIBE ALERTA
	Swal.fire({
		  icon: 'error',
		  title: 'O operador não tem horas disponíveis para ser alocado para a(s) atividade(s) selecionada(s) na data informada',
		  text: 'Verifique e tente novamente'
	})
	
}

// VERIFICA O SALDO NA NOVA DATA SELECIONADA SOMANDO COM AS NOVAS ALOCAÇÕES
function verificaSaldoDia(codmo){
	
	console.log("verifica se o operador selecionado possui saldo para ser alocado para as atividades")
	
	var ret = true
	var dataProg = $("#NOVA_DATA_REAL").val()
	var soma = 0
	var codColigada = $("#CODCOLIGADADESP").val()
	var numPlano = $("#NUMPLANOCORTEREALDESP").val()
	var codAtividade = buscaCodAtv(codColigada, numPlano)
	var codFilial = $("#CODFILIALDESP").val()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OPERADORRADDESP___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		// PERCORRE TODOS OS DIAS
		for(var i=1;i<11;i++){
			
			// SE DIA FOI SELECIONADO
			if($("#RAD"+i+"DESP___"+seq).hasClass("desprogramar")){
				
				var saldo = $("#DIA"+i+"RADDESP___"+seq).val()
				
				if(saldo.includes(",")){
					
					saldo = saldo.replace(",",".")
					
				}
				
				saldo = parseFloat(saldo)
				
				soma = soma + saldo
				
			}	
			
		}
			
	})
		
	console.log("soma: "+soma)
	
	console.log("codmo: "+codmo+", dataProg: "+dataProg+", codAtividade: "+codAtividade+", dataProg: "+dataProg)
	
	// FAZER BUSCA E PREENCHER A TABELA
	var a1 = DatasetFactory.createConstraint("CODMO", codmo, codmo, ConstraintType.MUST);
	var a2 = DatasetFactory.createConstraint("DATA_DE", dataProg, dataProg, ConstraintType.MUST);
	var a3 = DatasetFactory.createConstraint("CODATIVIDADE", codAtividade, codAtividade, ConstraintType.MUST);
	var a4 = DatasetFactory.createConstraint("DATA_ATE", dataProg, dataProg, ConstraintType.MUST);
	var a5 = DatasetFactory.createConstraint("CODFILIAL", codFilial, codFilial, ConstraintType.MUST);
	
	var constraint = new Array(a1,a2,a3,a4,a5);
	
	var dataset = DatasetFactory.getDataset("dsRadReprogDesprog", null, constraint, null);
	var row = dataset.values
	
	console.log("row")
	console.log(row)
	
	// SE RETORNO É NULO OU VAZIO
	if(!(row=="" || row==null || row==undefined)){
		
		var rep = row[0]
		
		//var saldo = parseFloat(rep["SALDO"])
		var saldo = parseFloat(rep["ALOCADO"])
		
		console.log("saldo: "+saldo)
		
		// SE TEM DISPONIBILIDADE NO DIA
		//if(saldo>0){
			
			//saldo = parseFloat(rep["SALDO_DISPONIBILIDADE"])
			
			saldo = saldo + soma
			
			console.log("saldo total: "+saldo)
			
			// SE O SALDO DO OPERADOR É MAIOR QUE A SOMA DAS ATIVIDADES SELECIONADAS
			if(saldo>12){
				
				// ALERTA PARA UM FUNCIONÁRIO SELECIONADO QUE NÃO TEM HORAS DISPONÍVEIS NA DATA PROGRAMADA
				alertaFuncionario()
				
			}
			
		/*} else {
			// SE NÃO
			
			// ALERTA PARA UM FUNCIONÁRIO SELECIONADO QUE NÃO TEM HORAS DISPONÍVEIS NA DATA PROGRAMADA
			alertaFuncionario()
			
		}*/
		
	} else {
		// SE NÃO
		
		// ALERTA PARA UM FUNCIONÁRIO SELECIONADO QUE NÃO TEM HORAS DISPONÍVEIS NA DATA PROGRAMADA
		alertaFuncionario()
		
	}
	
}

// VERIFICA O SALDO NA NOVA DATA SELECIONADA SOMANDO COM AS NOVAS ALOCAÇÕES
function verificaSaldoDia2(codmo){
	
	console.log("verifica se o operador selecionado possui saldo para ser alocado para as atividades")
	
	var ret = true
	var dataProg = $("#NOVA_DATA_REAL2").val()
	var soma = 0
	var codColigada = $("#CODCOLIGADADESP").val()
	var numPlano = $("#NUMPLANOCORTEREALDESP").val()
	var codAtividade = buscaCodAtv(codColigada, numPlano)
	var codFilial = $("#CODFILIALDESP").val()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OPERADORRADDESP___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		// PERCORRE TODOS OS DIAS
		for(var i=0;i<10;i++){
			
			// SE DIA FOI SELECIONADO
			if($("#RAD"+i+"DESP___"+seq).hasClass("desprogramar")){
				
				var saldo = $("#DIA"+i+"RADDESP___"+seq).val()
				
				if(saldo.includes(",")){
					
					saldo = saldo.replace(",",".")
					
				}
				
				saldo = parseFloat(saldo)
				
				soma = soma + saldo
				
			}	
			
		}
			
	})
		
	console.log("soma: "+soma)
	
	console.log("codmo: "+codmo+", dataProg: "+dataProg+", codAtividade: "+codAtividade+", dataProg: "+dataProg)
	
	// FAZER BUSCA E PREENCHER A TABELA
	var a1 = DatasetFactory.createConstraint("CODMO", codmo, codmo, ConstraintType.MUST);
	var a2 = DatasetFactory.createConstraint("DATA_DE", dataProg, dataProg, ConstraintType.MUST);
	var a3 = DatasetFactory.createConstraint("CODATIVIDADE", codAtividade, codAtividade, ConstraintType.MUST);
	var a4 = DatasetFactory.createConstraint("DATA_ATE", dataProg, dataProg, ConstraintType.MUST);
	var a5 = DatasetFactory.createConstraint("CODFILIAL", codFilial, codFilial, ConstraintType.MUST);
	
	var constraint = new Array(a1,a2,a3,a4,a5);
	
	var dataset = DatasetFactory.getDataset("dsRadReprogDesprog", null, constraint, null);
	var row = dataset.values
	
	console.log("row")
	console.log(row)
	
	// SE RETORNO É NULO OU VAZIO
	if(!(row=="" || row==null || row==undefined)){
		
		var rep = row[0]
		
		//var saldo = parseFloat(rep["SALDO"])
		var saldo = parseFloat(rep["ALOCADO"])
		
		console.log("saldo: "+saldo)
		
		// SE TEM DISPONIBILIDADE NO DIA
		//if(saldo>0){
			
			//saldo = parseFloat(rep["SALDO_DISPONIBILIDADE"])
			
			saldo = saldo + soma
			
			console.log("saldo total: "+saldo)
			
			// SE O SALDO DO OPERADOR É MAIOR QUE A SOMA DAS ATIVIDADES SELECIONADAS
			if(saldo>12){
				
				// ALERTA PARA UM FUNCIONÁRIO SELECIONADO QUE NÃO TEM HORAS DISPONÍVEIS NA DATA PROGRAMADA
				alertaFuncionario2()
				
			}
			
		/*} else {
			// SE NÃO
			
			// ALERTA PARA UM FUNCIONÁRIO SELECIONADO QUE NÃO TEM HORAS DISPONÍVEIS NA DATA PROGRAMADA
			alertaFuncionario()
			
		}*/
		
	} else {
		// SE NÃO
		
		// ALERTA PARA UM FUNCIONÁRIO SELECIONADO QUE NÃO TEM HORAS DISPONÍVEIS NA DATA PROGRAMADA
		alertaFuncionario2()
		
	}
	
}

// VERIFICA SE EXISTE PELO MENOS UMA ATIVIDADE SELECIONADA
function verificaSelecaoAtvs(){
	
	console.log("vou verificar se existe pelo menos uma atividade selecionada")
	
	var ret = false
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OPERADORRADDESP___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		console.log("operador "+seq)
		
		// PERCORRE TODOS OS DIAS
		for(var i=1;i<11;i++){
			
			console.log("dia "+i)
			
			// SE DIA FOI SELECIONADO
			if($("#RAD"+i+"DESP___"+seq).hasClass("desprogramar")){
				
				ret = true
				
			}	
			
		}
		
			
	})
	
	console.log("ret: "+ret)
	
	return ret
	
}

// BUSCA O CODMO SELECIONADO
function buscaCodmoSelecionado(){
	
	console.log("buscaCodmoSelecionado")
	
	var codmo = ""
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OPERADORRADDESP___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		// PERCORRE TODOS OS DIAS
		for(var i=1;i<11;i++){
			
			// SE DIA FOI SELECIONADO
			if($("#RAD"+i+"DESP___"+seq).hasClass("desprogramar")){
				
				codmo = $("#CHAPARADDESP___"+seq).val()
				
			}	
			
		}
		
			
	})
	
	console.log("codmo: "+codmo)
	
	return codmo
	
}

// BUSCA A DATA PROGRAMADA QUE FOI SELECIONADA
function buscaDataProgramadaSelecionada(){
	
	console.log("busca a data programada que foi selecionada")

	var dataProg = ""
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OPERADORRADDESP___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		// PERCORRE TODOS OS DIAS
		for(var i=1;i<11;i++){
			
			// SE DIA FOI SELECIONADO
			if($("#RAD"+i+"DESP___"+seq).hasClass("desprogramar")){
				
				dataProg = $("#RAD"+i+"DESP___"+seq).children("#DIA"+i+"RADREALDESP___"+seq).val()
				
			}	
			
		}
		
			
	})
	
	console.log("dataProg: "+dataProg)
	
	return dataProg
	
}

// VERIFICA A DISPONIBILIDADE DO FUNCIONÁRIO NA NOVA DATA SELECIONDA E SALVA A NOVA DATA REAL
function verificaNovaData(){
	
	console.log("vou verificar se o funcionário pode ser alocado na nova data e salvar a nova data real")
	
	var novaData = $("#NOVA_DATA").val()
	//var dataProg = $("#DATA_PROGRAMADA").val()
	var dataProg = buscaDataProgramadaSelecionada()
	var codmo = buscaCodmoSelecionado()
	
	dataProg = formataData(dataProg)
	
	console.log("novaData: "+novaData+", dataProg: "+dataProg+", codmo: "+codmo)
	
	// VERIFICA SE EXISTE PELO MENOS UMA ATIVIDADE SELECIONADA
	if(verificaSelecaoAtvs()){

		// SE A DATA FOI PREENCHIDA
		if(!(novaData=="" || novaData==null || novaData==undefined)){
			
			// SE DATA PROGRAMADA É A MESMA DATA SELECIONADA
			if(novaData==dataProg){
				
				// LIMPA A SELEÇÃO
				$("#NOVA_DATA").val("")
				$("#NOVA_DATA_REAL").val("")
				
				// EXIBE ALERTA
				Swal.fire({
					  icon: 'error',
					  title: 'A data selecionada é a mesma que já está programada',
					  text: 'Verifique e tente novamente'
				})
				
			} else {
				// SE NÃO
				
				var myLoading2 = FLUIGC.loading(window);
				myLoading2.show();
				  
				setTimeout(function(){

					novaData = formataDataBanco(novaData)
					
					console.log("novaData após formatação: "+novaData)
					
					// SALAVA A NOVA DATA REAL
					$("#NOVA_DATA_REAL").val(novaData)
										
					// VERIFICA SE O FUNCIONÁRIO TEM SALDO PARA A NOVA DATA SELECIONADA
					verificaSaldoDia(codmo)
					
				},500)
				
				setTimeout(function(){
							
				   myLoading2.hide();
				  
			   },500)
				
			}
			
		} else {
			
			// LIMPA A SELEÇÃO
			$("#NOVA_DATA").val("")
			$("#NOVA_DATA_REAL").val("")
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'Data inválida',
				  text: 'Verifique e tente novamente'
			})
			
		}
		
	 } else{
		 // SE NÃO
		 
		// LIMPA A SELEÇÃO
		$("#NOVA_DATA").val("")
		$("#NOVA_DATA_REAL").val("")
			
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'Não há atividade(s) selecionada(s) para que a troca de data seja realizada',
			  text: 'Verifique e tente novamente'
		})
		 
	 }
	
}

// VERIFICA A DISPONIBILIDADE DO FUNCIONÁRIO NA NOVA DATA SELECIONDA E SALVA A NOVA DATA REAL
function verificaNovaData2(){
	
	console.log("vou verificar se o funcionário pode ser alocado na nova data e salvar a nova data real")
	
	var novaData = $("#NOVA_DATA2").val()
	var dataProg = $("#DATA_PROGRAMADA").val()
	
	console.log("novaData: "+novaData+", dataProg: "+dataProg)
	
	// VERIFICA SE EXISTE PELO MENOS UMA ATIVIDADE SELECIONADA
	if(verificaSelecaoAtvs()){

		// SE A DATA FOI PREENCHIDA
		if(!(novaData=="" || novaData==null || novaData==undefined)){
			
			// SE DATA PROGRAMADA É A MESMA DATA SELECIONADA
			if(novaData==dataProg){
				
				// LIMPA A SELEÇÃO
				$("#NOVA_DATA2").val("")
				$("#NOVA_DATA_REAL2").val("")
				
				// EXIBE ALERTA
				Swal.fire({
					  icon: 'error',
					  title: 'A data selecionada é a mesma que já está programada',
					  text: 'Verifique e tente novamente'
				})
				
			} else {
				// SE NÃO
				
				var myLoading2 = FLUIGC.loading(window);
				myLoading2.show();
				  
				setTimeout(function(){

					novaData = formataDataBanco(novaData)
					
					console.log("novaData após formatação: "+novaData)
					
					// SALAVA A NOVA DATA REAL
					$("#NOVA_DATA_REAL2").val(novaData)
					
					var codmo = $("#CODMO_NOVO2").val()
					
					//// VERIFICA SE O FUNCIONÁRIO TEM SALDO PARA A NOVA DATA SELECIONADA
					//verificaSaldoDia2(codmo)
					
				},500)
				
				setTimeout(function(){
							
				   myLoading2.hide();
				  
			   },500)
				
			}
			
		} else {
			
			// LIMPA A SELEÇÃO
			$("#NOVA_DATA2").val("")
			$("#NOVA_DATA_REAL2").val("")
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'Data inválida',
				  text: 'Verifique e tente novamente'
			})
			
		}
		
	 } else{
		 // SE NÃO
		 
		// LIMPA A SELEÇÃO
		$("#NOVA_DATA2").val("")
		$("#NOVA_DATA_REAL2").val("")
			
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'Não há atividade(s) selecionada(s) para que a troca de funcionário e data sejam realizadas',
			  text: 'Verifique e tente novamente'
		})
		 
	 }
	
}

// EXECUTA A DESPROGRAMAÇÃO
function desprogramar(){
	
	console.log("vou desprogramar")
	
	var usuario = $("#USUARIOATUAL").val()
	var dia = $("#DATA_PROGRAMADA_REAL").val()
	var codInterno = $("#CODINTERNO4").val()
	
	// VERIFICA SE EXISTE PELO MENOS UMA ATIVIDADE SELECIONADA E O MOTIVO FOI INFORMADO
	if(verificaSelecaoAtvs() && !(codInterno=="" || codInterno==undefined || codInterno==null)){
		
		// EXIBE ALERTA
		Swal.fire({
			
			  title: 'Tem certeza que deseja desprogramar a(s) atividade(s) selecionada(s)?',
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
				  
				  setTimeout(function(){
					  
					  // FAZ A DESPROGRAMAÇÃO DE TODAS AS ATIVIDADES SELECIONADAS
					  desprogramarAtvs(codInterno)
					  
					  // LIMPA A TABELA PRINCIPAL
					  limpaTabela()
					  
					  // ATUALIZA A BUSCA DAS ATIVIDADES
					  buscarDesprogramacao()
					  
				  },500)
				  
				   /*setTimeout(function(){
					
					   myLoading2.hide();
					  
				  },500)*/
				  
			  } 				  
			  
		})
		
	} else {
		// SE NÃO
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'Não há atividade(s) selecionada(s) ou o motivo não foi selecionado para que a desprogramação seja realizada',
			  text: 'Verifique e tente novamente'
		})
		
	}
	
}

// FAZ A DESPROGRAMAÇÃO DE TODAS AS ATIVIDADES SELECIONADAS
function desprogramarAtvs(codInterno){
	
	console.log("vou desprogramar todas as atividades selecionadas")
	
	var planoCorte = $("#NUMPLANOCORTEREALDESP").val()

	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OPERADORRADDESP___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		for(var i=0; i<10; i++){
			
			// SE DATA FOI SELECIONADA 
			if($("#RAD"+i+"DESP___"+seq).hasClass("desprogramar")){
				
				// SE ATIVIDADE FOI SELECIONADA
				//if($("#SELECAO___"+seq).is(":checked")){
					
				var codColigada = $("#CODCOLIGADADESP").val()
				var codFilial = $("#CODFILIALDESP").val()
				var codmo = $("#CHAPARADDESP___"+seq).val()

				/*
				var codEstrutura = $("#CODESTRUTURADESP___"+seq).val()
				var codOrdem = $("#CODORDEMDESP___"+seq).val()
				var idAtvOrdem = $("#IDATVORDEMDESP___"+seq).val()
				var codAtividade = $("#CODATIVIDADEDESP___"+seq).val()
				*/
				
				//var horasProgramadas = $("#DIA"+i+"RADDESP___"+seq).val()
				var dataProgramada = $("#DIA"+i+"RADREALDESP___"+seq).val()
				
				/*
				if(horasProgramadas.includes(",")){
					
					horasProgramadas = horasProgramadas.replace(",",".")
					
				}
				
				horasProgramadas = parseFloat(horasProgramadas)*/
				
				var c1 = DatasetFactory.createConstraint("NUMPLANOCORTE", planoCorte, planoCorte, ConstraintType.MUST);
			    var c2 = DatasetFactory.createConstraint("CODMO", codmo, codmo, ConstraintType.MUST);
			    var c3 = DatasetFactory.createConstraint("DTHRINICIAL", dataProgramada, dataProgramada, ConstraintType.MUST);
			    var c4 = DatasetFactory.createConstraint("RECURSO", "DESPROGRAMACAO", "DESPROGRAMACAO", ConstraintType.MUST);
			   
				var constraints = new Array(c1,c2,c3,c4);
			    			    
			    var dataset = DatasetFactory.getDataset("dsBuscaRecAlocPlanoCorteOS", null, constraints, null);
			    
			    var row = dataset.values
			    
			    console.log("row")
			    console.log(row)
			    
			    // PERCORRE TODOS OS REGISTROS
			    for(var k=0; k<row.length; k++){
			    	
			    	var codEstrutura = row[k]["CODESTRUTURA"]
					var codOrdem = row[k]["CODORDEM"]
					var idAtvOrdem = row[k]["IDATVORDEM"]
					var codAtividade = row[k]["CODATIVIDADE"]
			    	var horasProgramadas = parseFloat(row[k]["SALDO_ALOCADO"])
			    	
			    	console.log("codColigada: "+codColigada+", codFilial: "+codFilial+", codmo: "+codmo+", codOrdem: "+codOrdem+", codEstrutura: "+codEstrutura+
							", idAtvOrdem: "+idAtvOrdem+", codAtividade: "+codAtividade+", dataProgramada: "+dataProgramada+", horasProgramadas: "+horasProgramadas)

					// EXECUTA A PROCEDURE PARA DESPROGRAMAR A ATIVIDADE
					execProcedureDesprogramar(codColigada,codFilial,codmo,codOrdem,codEstrutura,idAtvOrdem,codAtividade,dataProgramada,planoCorte,codInterno)
					
			    }					
				//}
				
			}
			
		}
	
	})
	
}

// EXECUTA A PROCEDURE PARA DESPROGRAMAR
// function execProcedureDesprogramar(codColigada,codFilial,codMo,codOrdem,codEstrutura,idAtvOrdem,codAtividade,dia,usuario,codInterno){
	
// 	console.log("vou executar a procedure para desprogramar")
// 	console.log("codColigada: "+codColigada+", codFilial: "+codFilial+", codMo: "+codMo+", codOrdem: "+codOrdem+", codEstrutura: "+codEstrutura+", idAtvOrdem: "+idAtvOrdem+
// 			", codAtividade: "+codAtividade+", dia: "+dia+", usuario: "+usuario)
	
// 	// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
// 	var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST)
// 	var a2 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
// 	var a3 = DatasetFactory.createConstraint("CODESTRUTURA",codEstrutura,codEstrutura,ConstraintType.MUST)
// 	var a4 = DatasetFactory.createConstraint("IDATVORDEM",idAtvOrdem,idAtvOrdem,ConstraintType.MUST)
// 	var a5 = DatasetFactory.createConstraint("CODMO",codMo,codMo,ConstraintType.MUST)
// 	var a6 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
// 	var a7 = DatasetFactory.createConstraint("DIA",dia,dia,ConstraintType.MUST)
// 	var a8 = DatasetFactory.createConstraint("CODATIVIDADE",codAtividade,codAtividade,ConstraintType.MUST)
// 	var a9 = DatasetFactory.createConstraint("USUARIOATUAL",usuario,usuario,ConstraintType.MUST)
// 	var a10 = DatasetFactory.createConstraint("CODINTERNO",codInterno,codInterno,ConstraintType.MUST)
	
// 	var constraints = new Array(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10)
	
// 	var dataset = DatasetFactory.getDataset("dsDeleteProgramacao",null,constraints,null)
	
// 	console.log("deletei a programação")
	
// }

// CONFIRMA TROCA DO FUNCIONÁRIO
function confirmaTrocaFunc(){
	
	console.log("confirma a troca de funcionário")
	
	var codmo = $("#CODMO_NOVO").val()
	//var dataProg = $("#DATA_PROGRAMADA_REAL").val()
	var dataProg = buscaDataProgramadaSelecionada()
	var saldo = $("#SALDO").val()
	var codInterno = $("#CODINTERNO1").val()
	
	console.log("codmo: "+codmo+", codInterno: "+codInterno+", dataProg: "+dataProg+", saldo: "+saldo)
	
	// SE CAMPOS OBRIGATÓRIOS NÃO FORAM PREENCHIDOS
	if((codmo=="" || codmo==null || codmo==undefined) || (codInterno=="" || codInterno==null || codInterno==undefined)){
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'É necessário informar o motivo e o funcionário que será alocado para a troca',
			  text: 'Verifique e tente novamente'
		})
		
	} else {
		// SE NÃO
		
		// SE AS SOMAS DOS SALDOS DAS HORAS NÃO É SUPERIOR 
		//if(verificaSaldo(codmo,dataProg)){
		if(verificaSelecaoAtvs()){
		
			// EXIBE ALERTA
			Swal.fire({
				
				  title: 'Tem certeza que deseja fazer a troca de funcionário para a(s) atividade(s) selecionada(s)?',
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
				  if(result.value){
				  
					  var myLoading2 = FLUIGC.loading(window);
					  myLoading2.show();
					  
					  setTimeout(function(){
						  							  
						  	// DESPROGRAMAR TODAS AS ATIVIDADES
						  	//desprogramarAtvs(codInterno)
						  
						  	// PROGRAMAR ATIVIDADES SELECIONADAS
						  	programarAtvs(codmo,codInterno)
						  	
						  	// LIMPA A TABELA PRINCIPAL
						  	limpaTabela()

						  	// ATUALIZA A BUSCA
						  	buscarDesprogramacao()
						  	
						  	// LIMPA OS CAMPOS PREENCHIDOS
						  	$("#NOVA_MATRICULA>option").remove()
						  	$("#CODMO_NOVO").val("")
						  	$("#HORAS_DISPONIVEIS").val("")
						  	$("#SALDO").val("")
						  	$("#CODINTERNO1").val("")
						  	$("#MOTDESPROG1>option").remove()

					  },500)
					  
					  /*setTimeout(function(){
						
						myLoading2.hide();
						  
					  },500)*/
					  
				   } 				  
				  
				})
			
		}
		
	}
	
}

// CONFIRMA TROCA DO FUNCIONÁRIO E DA DATA
function confirmaTrocaFuncData(){
	
	console.log("confirma a troca de data e funcionário")
	
	var novaData = $("#NOVA_DATA_REAL2").val()
	var codmo = $("#CODMO_NOVO2").val()
	var codInterno = $("#CODINTERNO3").val()
	
	console.log("novaData: "+novaData)
	
	// SE CAMPOS OBRIGATÓRIOS NÃO FORAM PREENCHIDOS
	if( (novaData=="" || novaData==null || novaData==undefined) || (codmo=="" || codmo==null || codmo==undefined) || (codInterno=="" || codInterno==null || codInterno==undefined) ){
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'É necessário informar o motivo, o funcionário e a nova data em que será feita a alocação',
			  text: 'Verifique e tente novamente'
		})
		
	} else {
		// SE NÃO
		
		// SE OPERADOR TEM SALDO SUFICIENTE
		//if(verificaSaldo(codmo,novaData)){
		if(verificaSelecaoAtvs()){
	
			// EXIBE ALERTA
			Swal.fire({
				
				  title: 'Tem certeza que deseja fazer a troca de funcionário e data da alocação para a(s) atividade(s) selecionada(s)?',
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
				  if(result.value){
				  
					  var myLoading2 = FLUIGC.loading(window);
					  myLoading2.show();
					  
					  setTimeout(function(){
							
						  	// DESPROGRAMAR TODAS AS ATIVIDADES
						  	//desprogramarAtvs(codInterno)
						  
						  	// PROGRAMAR ATIVIDADES SELECIONADAS PARA A NOVA DATA SELECIONADA
						  	programarAtvsNovaDataFunc(codmo,novaData,codInterno)
						  	
						  	// LIMPA A TABELA PRINCIPAL
						  	limpaTabela()
						  	
						  	// ATUALIZA A BUSCA
						  	buscarDesprogramacao()
						  	
						  	// LIMPA OS CAMPOS PREENCHIDOS
						  	$("#NOVA_DATA2").val("")
						  	$("#NOVA_DATA_REAL2").val("")  
						  	$("#CODMO_NOVO2").val("")
						  	$("#NOVA_MATRICULA2>option").remove()
						  	$("#HORAS_DISPONIVEIS2").val("")
						  	$("#SALDO2").val("")
						  	$("#CODINTERNO3").val("")
						  	$("#MOTDESPROG3>option").remove()
						  	
					  },500)
					  
					  /*setTimeout(function(){
						
						myLoading2.hide();
						  
					  },500)*/
					  
				   } 				  
				  
			})
			
		}
		
	}
	
}

// CONFIRMA TROCA DO FUNCIONÁRIO
function confirmaTrocaData(){
	
	console.log("confirma a troca de data")
	
	var novaData = $("#NOVA_DATA_REAL").val()
	var codmo = $("#CODMO").val()
	var codInterno = $("#CODINTERNO2").val()
	
	console.log("novaData: "+novaData)
	
	// SE CAMPOS OBRIGATÓRIOS NÃO FORAM PREENCHIDOS
	if((novaData=="" || novaData==null || novaData==undefined) || (codInterno=="" || codInterno==null || codInterno==undefined)){
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'É necessário informar o motivo e a nova data em que o funcionário será alocado',
			  text: 'Verifique e tente novamente'
		})
		
	} else {
		// SE NÃO

		// SE AS SOMAS DOS SALDOS DAS HORAS NÃO É SUPERIOR 
		if(verificaSaldo(codmo,novaData)){
			
			// EXIBE ALERTA
			Swal.fire({
				
				  title: 'Tem certeza que deseja fazer a troca de data da alocação para a(s) atividade(s) selecionada(s)?',
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
				  if(result.value){
				  
					  var myLoading2 = FLUIGC.loading(window);
					  myLoading2.show();
					  
					  setTimeout(function(){
							
						  	// DESPROGRAMAR TODAS AS ATIVIDADES
						  	//desprogramarAtvs(codInterno)
						  
						  	// PROGRAMAR ATIVIDADES SELECIONADAS PARA A NOVA DATA SELECIONADA
						  	programarAtvsNovaData(novaData,codInterno)
						  	
						  	// LIMPA A TABELA PRINCIPAL
						  	limpaTabela()
						  	
						  	// ATUALIZA A BUSCA
						  	buscarDesprogramacao()
						  	
						  	// LIMPA OS CAMPOS PREENCHIDOS
						  	$("#NOVA_DATA").val("")
						  	$("#NOVA_DATA_REAL").val("")
						  	$("#CODINTERNO2").val("")
						  	$("#MOTDESPROG2>option").remove()
						  
					  },500)
					  
					  /*setTimeout(function(){
						
						myLoading2.hide();
						  
					  },500)*/
					  
				   } 				  
				  
			})
			
		}
		
	}
	
}

// PROGRAMAR ATIVIDADES SELECIONADAS PARA A NOVA DATA E FUNCIONÁRIO SELECIONADOS
function programarAtvsNovaDataFunc(codmo,novaData,codInterno){
		
	console.log("vou programar todas as atividades selecionadas para o novo funcionário e a nova data selecionados")
	
	var planoCorte = $("#NUMPLANOCORTEREALDESP").val()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OPERADORRADDESP___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		// PERCORRE TODOS OS DIAS
		for(var i=1; i<11; i++){
			
			// SE DATA FOI SELECIONADA 
			if($("#RAD"+i+"DESP___"+seq).hasClass("desprogramar")){
				
				var codColigada = $("#CODCOLIGADADESP").val()
				var codFilial = $("#CODFILIALDESP").val()
				var codmoAntigo = $("#CHAPARADDESP___"+seq).val()

				/*
				var codEstrutura = $("#CODESTRUTURADESP___"+seq).val()
				var codOrdem = $("#CODORDEMDESP___"+seq).val()
				var idAtvOrdem = $("#IDATVORDEMDESP___"+seq).val()
				var codAtividade = $("#CODATIVIDADEDESP___"+seq).val()
				*/
				
				//var horasProgramadas = $("#DIA"+i+"RADDESP___"+seq).val()
				var dataProgramada = $("#DIA"+i+"RADREALDESP___"+seq).val()
				
				/*
				if(horasProgramadas.includes(",")){
					
					horasProgramadas = horasProgramadas.replace(",",".")
					
				}
				
				horasProgramadas = parseFloat(horasProgramadas)*/
				
				var c1 = DatasetFactory.createConstraint("NUMPLANOCORTE", planoCorte, planoCorte, ConstraintType.MUST);
			    var c2 = DatasetFactory.createConstraint("CODMO", codmoAntigo, codmoAntigo, ConstraintType.MUST);
			    var c3 = DatasetFactory.createConstraint("DTHRINICIAL", dataProgramada, dataProgramada, ConstraintType.MUST);
			    var c4 = DatasetFactory.createConstraint("RECURSO", "DESPROGRAMACAO", "DESPROGRAMACAO", ConstraintType.MUST);
			   
				var constraints = new Array(c1,c2,c3,c4);
			    			    
			    var dataset = DatasetFactory.getDataset("dsBuscaRecAlocPlanoCorteOS", null, constraints, null);
			    
			    var row = dataset.values
			    
			    console.log("row")
			    console.log(row)
			    
			    // PERCORRE TODOS OS REGISTROS
			    for(var k=0; k<row.length; k++){
			    	
			    	var codEstrutura = row[k]["CODESTRUTURA"]
					var codOrdem = row[k]["CODORDEM"]
					var idAtvOrdem = row[k]["IDATVORDEM"]
					var codAtividade = row[k]["CODATIVIDADE"]
			    	var horasProgramadas = parseFloat(row[k]["SALDO_ALOCADO"])
			    	
			    	console.log("codColigada: "+codColigada+", codFilial: "+codFilial+", codmo: "+codmo+", codmoAntigo: "+codmoAntigo+", codOrdem: "+codOrdem+", codEstrutura: "+codEstrutura+
							", idAtvOrdem: "+idAtvOrdem+", codAtividade: "+codAtividade+", dataProgramada: "+dataProgramada+", horasProgramadas: "+horasProgramadas)
					
					// EXECUTA A PROCEDURE PARA DESPROGRAMAR A ATIVIDADE
					execProcedureDesprogramar(codColigada,codFilial,codmoAntigo,codOrdem,codEstrutura,idAtvOrdem,codAtividade,dataProgramada,planoCorte,codInterno)
							
			    	// EXECUTA A PROCEDURE
					execProcedure(codColigada,codFilial,codOrdem,codAtividade,codmo,novaData,horasProgramadas,planoCorte)
							
			    }
			
			}
			
		}
	
	})
	
}

// PROGRAMAR ATIVIDADES SELECIONADAS PARA A NOVA DATA SELECIONADA
function programarAtvsNovaData(novaData,codInterno){
		
	console.log("vou programar todas as atividades selecionadas para a nova data selecionada")
	
	var planoCorte = $("#NUMPLANOCORTEREALDESP").val()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OPERADORRADDESP___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		// PERCORRE TODOS OS DIAS
		for(var i=1; i<11; i++){
			
			// SE DATA FOI SELECIONADA 
			if($("#RAD"+i+"DESP___"+seq).hasClass("desprogramar")){
				
				var codColigada = $("#CODCOLIGADADESP").val()
				var codFilial = $("#CODFILIALDESP").val()
				var codmo = $("#CHAPARADDESP___"+seq).val()

				/*
				var codEstrutura = $("#CODESTRUTURADESP___"+seq).val()
				var codOrdem = $("#CODORDEMDESP___"+seq).val()
				var idAtvOrdem = $("#IDATVORDEMDESP___"+seq).val()
				var codAtividade = $("#CODATIVIDADEDESP___"+seq).val()
				*/
				
				//var horasProgramadas = $("#DIA"+i+"RADDESP___"+seq).val()
				var dataProgramada = $("#DIA"+i+"RADREALDESP___"+seq).val()
				
				/*
				if(horasProgramadas.includes(",")){
					
					horasProgramadas = horasProgramadas.replace(",",".")
					
				}
				
				horasProgramadas = parseFloat(horasProgramadas)*/
				
				var c1 = DatasetFactory.createConstraint("NUMPLANOCORTE", planoCorte, planoCorte, ConstraintType.MUST);
			    var c2 = DatasetFactory.createConstraint("CODMO", codmo, codmo, ConstraintType.MUST);
			    var c3 = DatasetFactory.createConstraint("DTHRINICIAL", dataProgramada, dataProgramada, ConstraintType.MUST);
			    var c4 = DatasetFactory.createConstraint("RECURSO", "DESPROGRAMACAO", "DESPROGRAMACAO", ConstraintType.MUST);
			   
				var constraints = new Array(c1,c2,c3,c4);
			    			    
			    var dataset = DatasetFactory.getDataset("dsBuscaRecAlocPlanoCorteOS", null, constraints, null);
			    
			    var row = dataset.values
			    
			    console.log("row")
			    console.log(row)
			    
			    // PERCORRE TODOS OS REGISTROS
			    for(var k=0; k<row.length; k++){
			    	
			    	var codEstrutura = row[k]["CODESTRUTURA"]
					var codOrdem = row[k]["CODORDEM"]
					var idAtvOrdem = row[k]["IDATVORDEM"]
					var codAtividade = row[k]["CODATIVIDADE"]
			    	var horasProgramadas = parseFloat(row[k]["SALDO_ALOCADO"])
			    	
			    	console.log("codColigada: "+codColigada+", codFilial: "+codFilial+", codmo: "+codmo+", codOrdem: "+codOrdem+", codEstrutura: "+codEstrutura+
							", idAtvOrdem: "+idAtvOrdem+", codAtividade: "+codAtividade+", dataProgramada: "+dataProgramada+", horasProgramadas: "+horasProgramadas)

					// EXECUTA A PROCEDURE PARA DESPROGRAMAR A ATIVIDADE
					execProcedureDesprogramar(codColigada,codFilial,codmo,codOrdem,codEstrutura,idAtvOrdem,codAtividade,dataProgramada,planoCorte,codInterno)
				
			    	// EXECUTA A PROCEDURE
					execProcedure(codColigada,codFilial,codOrdem,codAtividade,codmo,novaData,horasProgramadas,planoCorte)
							
			    }

			
			}
			
		}
	
	})
	
}

// PROGRAMAR ATIVIDADES SELECIONADAS
function programarAtvs(codmo,codInterno){
	
	console.log("vou programar todas as atividades selecionadas")
	
	var planoCorte = $("#NUMPLANOCORTEREALDESP").val()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OPERADORRADDESP___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		// PERCORRE TODOS OS DIAS
		for(var i=1; i<11; i++){
			
			// SE DATA FOI SELECIONADA 
			if($("#RAD"+i+"DESP___"+seq).hasClass("desprogramar")){
				
				var codColigada = $("#CODCOLIGADADESP").val()
				var codFilial = $("#CODFILIALDESP").val()
				var codmoAntigo = $("#CHAPARADDESP___"+seq).val()

				/*
				var codEstrutura = $("#CODESTRUTURADESP___"+seq).val()
				var codOrdem = $("#CODORDEMDESP___"+seq).val()
				var idAtvOrdem = $("#IDATVORDEMDESP___"+seq).val()
				var codAtividade = $("#CODATIVIDADEDESP___"+seq).val()
				*/
				
				//var horasProgramadas = $("#DIA"+i+"RADDESP___"+seq).val()
				var dataProgramada = $("#DIA"+i+"RADREALDESP___"+seq).val()
				
				/*
				if(horasProgramadas.includes(",")){
					
					horasProgramadas = horasProgramadas.replace(",",".")
					
				}
				
				horasProgramadas = parseFloat(horasProgramadas)*/
				
				var c1 = DatasetFactory.createConstraint("NUMPLANOCORTE", planoCorte, planoCorte, ConstraintType.MUST);
			    var c2 = DatasetFactory.createConstraint("CODMO", codmoAntigo, codmoAntigo, ConstraintType.MUST);
			    var c3 = DatasetFactory.createConstraint("DTHRINICIAL", dataProgramada, dataProgramada, ConstraintType.MUST);
			    var c4 = DatasetFactory.createConstraint("RECURSO", "DESPROGRAMACAO", "DESPROGRAMACAO", ConstraintType.MUST);
			   
				var constraints = new Array(c1,c2,c3,c4);
			    			    
			    var dataset = DatasetFactory.getDataset("dsBuscaRecAlocPlanoCorteOS", null, constraints, null);
			    
			    var row = dataset.values
			    
			    console.log("row")
			    console.log(row)
			    
			    // PERCORRE TODOS OS REGISTROS
			    for(var k=0; k<row.length; k++){
			    	
			    	var codEstrutura = row[k]["CODESTRUTURA"]
					var codOrdem = row[k]["CODORDEM"]
					var idAtvOrdem = row[k]["IDATVORDEM"]
					var codAtividade = row[k]["CODATIVIDADE"]
			    	var horasProgramadas = parseFloat(row[k]["SALDO_ALOCADO"])
			    	
			    	console.log("codColigada: "+codColigada+", codFilial: "+codFilial+", codmo: "+codmo+", codmoAntigo: "+codmoAntigo+", codOrdem: "+codOrdem+", codEstrutura: "+codEstrutura+
							", idAtvOrdem: "+idAtvOrdem+", codAtividade: "+codAtividade+", dataProgramada: "+dataProgramada+", horasProgramadas: "+horasProgramadas)
					
					// EXECUTA A PROCEDURE PARA DESPROGRAMAR A ATIVIDADE
					execProcedureDesprogramar(codColigada,codFilial,codmoAntigo,codOrdem,codEstrutura,idAtvOrdem,codAtividade,dataProgramada,planoCorte,codInterno)
							
			    	// EXECUTA A PROCEDURE PARA PROGRAMAR A ATIVIDADE
					execProcedure(codColigada,codFilial,codOrdem,codAtividade,codmo,dataProgramada,horasProgramadas,planoCorte)
							
			    }
				
			}
			
		}
	
	})
	
}

/*
// EXECUTA A PROCEDURE PARA PROGRAMAR
function execProcedure(coligada,filial,codOrdem,codAtividade,codmo,dataProgramada,horasProgramadas){
	
	console.log("beforeTaskSave - Vou executar a Procedure");
	console.log("coligada: "+coligada+", filial: "+filial+", codOrdem: "+
			codOrdem+", codAtividade: "+codAtividade+", codmo: "+codmo+
			", dataProgramada: "+dataProgramada+", horasProgramadas: "+horasProgramadas);
	
    var c1 = DatasetFactory.createConstraint("CODCOLIGADA", coligada, coligada, ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("CODFILIAL", filial, filial, ConstraintType.MUST);
    var c3 = DatasetFactory.createConstraint("CODORDEM", codOrdem, codOrdem, ConstraintType.MUST);
    var c4 = DatasetFactory.createConstraint("CODATIVIDADE", codAtividade, codAtividade, ConstraintType.MUST);
    var c5 = DatasetFactory.createConstraint("CODPESSOA", codmo, codmo, ConstraintType.MUST);
    var c6 = DatasetFactory.createConstraint("DATAPROGRAMADA", dataProgramada, dataProgramada, ConstraintType.MUST);
    var c7 = DatasetFactory.createConstraint("HORASPROGRAMADAS", horasProgramadas, horasProgramadas, ConstraintType.MUST);
   
	var constraints = new Array(c1,c2,c3,c4,c5,c6,c7);
    
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
*/
// LIMPA A TABELA PRINCIPAL
function limpaTabela(){
		
	console.log("vou limpar a tabela principal")	
		
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OPERADORRADDESP___']").each(function(){
		
		$(this).parents("tr").remove()
		
	})
	
}

// ALTERAR HORAS PROGRAMADAS
function alterarHorasProg(obj){
	
	console.log("alterar as horas programadas")
	
	var seq = $(obj).attr("id").split("___")[1]
	
	var idAtvOrdemProg = $("#IDATVORDEMPROGRAMACAO___"+seq).val()
	var horas = $("#HORASPROGRAMADASREAL___"+seq).val()
	  
	console.log("idAtvOrdemProg: "+idAtvOrdemProg+", horas: "+horas)
	
	// SE ATIVIDADE NÃO FOI SELECIONADA
	if(!($("#SELECAO___"+seq).is(":checked"))){
		
		// SE AS HORAS FORAM INFORMADAS
		if(horas=="" || horas==null || horas==undefined){
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'A quantidade de horas programadas precisa ser informada',
				  text: 'Verifique e tente novamente'
			})
			
		} else {
			// SE NÃO
			
			if(horas.includes(",")){
				
				horas = horas.replace(",",".")
				
			}
			
			horas = parseFloat(horas)
			
			// FAZER BUSCA E PREENCHER A TABELA
			var a1 = DatasetFactory.createConstraint("IDATVORDEMPROGRAMACAO", idAtvOrdemProg, idAtvOrdemProg, ConstraintType.MUST);
			var a2 = DatasetFactory.createConstraint("HORAS", horas, horas, ConstraintType.MUST);
			var usuario = $("#USUARIOATUAL").val()
			var c3 = DatasetFactory.createConstraint("USUARIOATUAL", usuario, usuario, ConstraintType.MUST);
			
			var constraint = new Array(a1,a2,c3);
			
			var dataset = DatasetFactory.getDataset("dsAlterarHorasProgramadas", null, constraint, null);
			
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
				  title: 'Programação alterada com sucesso!'
			})
			
		}
		
	} else {
		// SE NÃO
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'Para alterar as horas programadas é necessário remover a seleção da atividade',
			  text: 'Verifique e tente novamente'
		})
		
	}
		
}

// VERIFICA A DUPLICIDADE DA ATIVIDADE DA OP
function verificaDuplicidadeOpAtv(seqAtual){
	
	console.log("verificaDuplicidadeOpAtv")
	
	var numOSAtual = $("#OSREPROG___"+seqAtual).val()
	var codOrdemAtual = $("#OPREPROG___"+seqAtual).val()
	var idAtvOrdemAtual = $("#IDATVREPROG___"+seqAtual).val()
	var prioridadeAtual = $("#PRIORIDADEREPROG___"+seqAtual).val()
	var ret = false
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSREPROG___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var numOS = $("#OSREPROG___"+seq).val()
		var codOrdem = $("#OPREPROG___"+seq).val()
		var idAtvOrdem = $("#IDATVREPROG___"+seq).val()
		var prioridade = $("#PRIORIDADEREPROG___"+seq).val()
		
		// SE É A MESMA OS, OP, IDATVORDEM E PRIORIDADE
		if(numOS==numOSAtual && codOrdem==codOrdemAtual && idAtvOrdem==idAtvOrdemAtual && prioridade==prioridadeAtual && !(seq==seqAtual)){
			
			ret = true
			
		}
		
	})
	
	console.log("ret: "+ret)
	
	return ret
	
}

// BUSCA SALDO DO OPERADOR QUE SERÁ ALOCADO
function buscaSaldoAalocar(seqAtual){
	
	var ret = true
	var soma = 0
	var codAtividade = ""
	
	console.log("buscaSaldoAalocar")
		
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSREPROG___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		var saldo = $("#HORASPROGRAMADASREPROG___"+seq).val()
		
		// SE AS HORAS FORAM INFORMADAS
		if(!(saldo=="" || saldo==null || saldo==undefined) && !(seq==seqAtual) ){
			
			if(saldo.includes(",")){
				
				saldo = saldo.replace(",",".")
			}
			
			soma = parseFloat(soma) + parseFloat(saldo)
			
		}
			
	})
	
	console.log("soma: "+soma)
	
	return soma
	
}

// BUSCA SALDO DO OPERADOR ALOCADO
function buscaSaldo(){

	var ret = true
	var soma = 0
	var codAtividade = ""
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSATV___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		// SE ATIVIDADE NÃO FOI SELECIONADA
		if(!($("#SELECAO___"+seq).is(":checked"))){
			
			var programada = $("#HORASPROGRAMADASREAL___"+seq).val()
			codAtividade = $("#CODATIVIDADE___"+seq).val()
			
			soma = parseFloat(soma) + parseFloat(programada)
			
		}
			
	})

	console.log("soma: "+soma)

	return soma
	
}

// VERIFICA SE A QUANTIDADE DE HORAS ESTÁ DENTRO DO SALDO A ALOCAR E DA DISPONIBILIDADE DO RECURSO 
function verificaHoras(obj){
	
	var seq = $(obj).attr("id").split("___")[1]
	console.log("seq: "+seq)
	
	var codmo = $("#CODMO").val()
	console.log("codmo: "+codmo)
	
	var pj = $("#RECPJ").val()
	console.log("PJ: "+pj)
	
	// BUSCA SALDO ATUAL
	var saldoAtual = $("#HORASPROGRAMADAS___"+seq).val()
	
	if(saldoAtual.includes(",")){
		
		saldoAtual = saldoAtual.replace(",",".")
		
	}

	console.log("saldoAtual: "+saldoAtual)

	saldoAtual = parseFloat(saldoAtual)
	
	// SE NÃO É UM VALOR NUMÉRICO
	if(isNaN(saldoAtual)){
		
		// LIMPA AS HORAS INFORMADAS
		$(obj).val("")
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'A quantidade de horas informada não é um valor válido',
			  text: 'Verifique e tente novamente'
		})
		
	} else {
		// SE NÃO
		
		// SE SALDO É MENOR OU IGUAL A 0
		if(saldoAtual<=0){
			
			// LIMPA AS HORAS INFORMADAS
			$(obj).val("")
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'A quantidade de horas deve ser maior que 0',
				  text: 'Verifique e tente novamente'
			})
			
		} else {
			// SE NÃO
			
			// SALVA AS HORAS REAL
			$("#HORASPROGRAMADASREAL___"+seq).val(saldoAtual)
			
			// BUSCA SALDO ALOCADOS DO OPERADOR
			var saldo = buscaSaldo() + saldoAtual
			//var saldoAalocar = buscaSaldoAalocar(seq)
			
			//saldo = saldo + saldoAtual
			
			console.log("saldo: "+saldo)
			
			saldoAtual = saldoAtual.toString().replace(".",",")
				
			$(obj).val(saldoAtual)

			// SE NÃO É UM PJ
			if(pj=="" || pj==undefined || pj==null || pj=="null"){
				
				// SE NÃO
				if(saldo>12){
					
					// LIMPA AS HORAS INFORMADAS
					$(obj).val("")
				
					// EXIBE ALERTA
					Swal.fire({
						  icon: 'error',
						  title: 'A quantidade de horas informada ultrapassou a disponibilidade de 12 horas do operador na data',
						  text: 'Verifique e tente novamente'
					})
					
				} 
				
			}
			
		}
	
	}
	
}

// VERIFICA SE A QUANTIDADE DE HORAS ESTÁ DENTRO DO SALDO A ALOCAR E DA DISPONIBILIDADE DO RECURSO 
function verificaHorasReprog(obj){
	
	var seq = $(obj).attr("id").split("___")[1]
	console.log("seq: "+seq)
	
	var codmo = $("#CODMO").val()
	console.log("codmo: "+codmo)
	
	var pj = $("#RECPJ").val()
	console.log("PJ: "+pj)
	
	// BUSCA SALDO ATUAL
	var saldoAtual = $("#HORASPROGRAMADASREPROG___"+seq).val()
	
	if(saldoAtual.includes(",")){
		
		saldoAtual = saldoAtual.replace(",",".")
		
	}

	console.log("saldoAtual: "+saldoAtual)

	// VERIFICA SE TEM ATIVIDADES SELECIONADAS
	if(!verificaSelecaoAtvs()){
		
		// LIMPA AS HORAS INFORMADAS
		$(obj).val("")
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'É necessário selecionar ao menos uma atividade para a realizar a troca de OP',
			  text: 'Verifique e tente novamente'
		})
		
	} else {
		// SE NÃO
		
		// SE NÃO É UM VALOR NUMÉRICO
		if(isNaN(saldoAtual)){
			
			// LIMPA AS HORAS INFORMADAS
			$(obj).val("")
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'A quantidade de horas informada não é um valor válido',
				  text: 'Verifique e tente novamente'
			})
			
		} else {
			// SE NÃO
			
			saldoAtual = parseFloat(saldoAtual)
			
			// SE SALDO É MENOR OU IGUAL A 0
			if(saldoAtual<=0){
				
				// LIMPA AS HORAS INFORMADAS
				$(obj).val("")
				
				// EXIBE ALERTA
				Swal.fire({
					  icon: 'error',
					  title: 'A quantidade de horas deve ser maior que 0',
					  text: 'Verifique e tente novamente'
				})
				
			} else {
				// SE NÃO
				
				// SALVA AS HORAS REAL
				$("#HORASPROGRAMADASREALREPROG___"+seq).val(saldoAtual)
				
				// BUSCA SALDO ALOCADOS DO OPERADOR
				var saldo = buscaSaldo()
				var saldoAalocar = buscaSaldoAalocar(seq)
				
				console.log("saldo: "+saldo+", saldoAalocar: "+saldoAalocar)
				
				saldo = saldo + saldoAtual + saldoAalocar
				
				console.log("saldo acumluado: "+saldo)
				
				saldoAtual = saldoAtual.toString().replace(".",",")
					
				$(obj).val(saldoAtual)
				
				// SE NÃO É UM PJ
				if(pj=="" || pj==undefined || pj==null || pj=="null"){
					
					// SE NÃO
					if(saldo>12){
						
						// LIMPA AS HORAS INFORMADAS
						$(obj).val("")
						
						// RECALCULA AS HORAS DISPONÍVEIS
						recalculaHorasDisp5(seq)
						
						// EXIBE ALERTA
						Swal.fire({
							  icon: 'error',
							  title: 'A quantidade de horas informada ultrapassou a disponibilidade de 12 horas do operador na data',
							  text: 'Verifique e tente novamente'
						})
						
					} else {
						// SE NÃO
						
						$("#SALDO5").val(saldo)
						
						var horasDisp = 12 - saldo
						
						console.log("horasDisp: "+horasDisp)
						
						$("#HORAS_DISPONIVEIS5").val(horasDisp)
						
					}
					
				}
				
			}
			
		}
		
	}
		
}

// RECALCULA AS HORAS DISPONÍVEIS
function recalculaHorasDisp5(seq){
	
	// BUSCA SALDO ALOCADOS DO OPERADOR
	var saldo = buscaSaldo()
	var saldoAalocar = buscaSaldoAalocar(seq)
	
	console.log("saldo: "+saldo+", saldoAalocar: "+saldoAalocar)
	
	saldo = saldo + saldoAalocar
	
	$("#SALDO5").val(saldo)

	var horasDisp = 12 - saldo
	
	console.log("horasDisp: "+horasDisp)
	
	$("#HORAS_DISPONIVEIS5").val(horasDisp)
	
}

// CONFIRMA A TROCA DE OP
function confirmaTrocarOP(){
	
	console.log("confirma a troca de OP")

	var motivo = $("#CODINTERNO5").val()
	
	// SE OS CAMPOS OBRIGATÓRIO NÃO FORAM INFORMADOS
	if(verificaCamposObrigReprog() || (motivo=="" || motivo==null || motivo==undefined) ){
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'Há campos obrigatórios para realizar a troca da OP que não foram preenchidos!',
			  text: 'Verifique e tente novamente'
		})
		
	} else {
		
		// VERIFICA SE AO MENOS UMA ATIVIDADE FOI SELECIONADA
		if(!verificaSelecaoAtvs()){
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'Não há atividades selecionadas para realizar a troca de OP',
				  text: 'Verifique e tente novamente'
			})
			
		} else {
			// SE NÃO
			
			var myLoading2 = FLUIGC.loading(window);
			myLoading2.show();
			
			setTimeout(function(){
			
				var codInterno = $("#CODINTERNO5").val()
				
				// FAZ A DESPROGRAMAÇÃO DE TODAS AS ATIVIDADES SELECIONADAS
				desprogramarAtvs(codInterno)
				
				// PERCORRE TODAS AS ATIVIDADES NA TABELA DE TROCA DE OP
				$("input[id^='OSREPROG___']").each(function(){
				
					var seq = $(this).attr("id").split("___")[1]
					
					var horasProgramadas = $("#HORASPROGRAMADASREALREPROG___"+seq).val()
					var codAtividade = $("#CODATIVIDADEREPROG___"+seq).val()
					var codColigada = $("#CODCOLIGADAREPROG___"+seq).val()
					var codFilial = $("#CODFILIALREPROG___"+seq).val()
					var codmo = $("#CODMO").val()
					var dataProgramada = $("#DATA_PROGRAMADA_REAL").val()
					var os = $("#OSREPROG___"+seq).val()
					var celula = $("#CELULAREPROG___"+seq).val()
					var codOrdem = $("#OPREPROG___"+seq).val()
					var idAtvOrdem = $("#IDATVREPROG___"+seq).val()
					var prioridade = $("#PRIORIDADEREPROG___"+seq).val()
				
					console.log("horasProgramadas: "+horasProgramadas+", codAtividade: "+codAtividade+", codColigada: "+codColigada+", codFilial: "+codFilial+", codmo: "+codmo+", dataProgramada: "
							+dataProgramada+", os: "+os+", celula: "+celula+", codOrdem: "+codOrdem+", idAtvOrdem: "+idAtvOrdem+", prioridade: "+prioridade)
					
					// EXECUTA A PROCEDURE
					execProcedure(codColigada,codFilial,codOrdem,codAtividade,codmo,dataProgramada,horasProgramadas)
				
				})		
				
				// LIMPA A TABELA DA TROCA DE OP
				limpaTabelaTrocaOP()
				
				// LIMPA A TABELA PRINCIPAL
				limpaTabela()
				
				// LIMPA OS CAMPOS
				$("#HORAS_DISPONIVEIS5").val("")
				$("#SALDO5").val("")
				$("#CODINTERNO5").val("")
				$("#MOTDESPROG5>option").remove()
				  
				// ATUALIZA A BUSCA DAS ATIVIDADES
				buscar()
				
			},500)
			
			setTimeout(function(){
							
				myLoading2.hide();
						  
		    },500)
			
		}
		
	}
	
}

// LIMPA A TABELA DA TROCA DE OP
function limpaTabelaTrocaOP(){
	
	console.log("vou limpar todos os registros da tabela de troca de OP")
	
	// PERCORRE TODAS AS ATIVIDADES NA TABELA DE TROCA DE OP
	$("input[id^='OSREPROG___']").each(function(){
		
		$(this).parents("tr").remove()
		
	})
	
}

// VERIFICA SE TODAS AS HORAS PARA A REPROGRAMAÇÃO DE TROCA DE OP FORAM INFORMADAS
function verificaCamposObrigReprog(){
	
	console.log("verifica se todos os campos obrigatórios foram preenchidos")
	
	var ret = false
	
	// PERCORRE TODAS AS ATIVIDADES NA TABELA DE TROCA DE OP
	$("input[id^='OSREPROG___']").each(function(){
	
		var seq = $(this).attr("id").split("___")[1]
		var horas = $("#HORASPROGRAMADASREPROG___"+seq).val()
		var os = $("#OSREPROG___"+seq).val()
		//var celula = $("#CELULAREPROG___"+seq).val()
		var op = $("#OPREPROG___"+seq).val()
		var idAtvOrdem = $("#IDATVREPROG___"+seq).val()
		var prioridade = $("#PRIORIDADEREPROG___"+seq).val()
	
		console.log("horas: "+horas+", os: "+os+", op: "+op+", idAtvOrdem: "+idAtvOrdem+", prioridade: "+prioridade)
		
		// SE ALGUM CAMPO OBRIGATÓRIO NÃO FOI PREENCHIDO
		if( (horas=="" || horas==null || horas==undefined) || (os=="" || os==null || os==undefined) 
				|| (op=="" || op==null || op==undefined) || (idAtvOrdem=="" || idAtvOrdem==null || idAtvOrdem==undefined) 
				|| (prioridade=="" || prioridade==null || prioridade==undefined) ){
			
			console.log("tem campos obrigatórios sem preencher")
			
			ret = true
			
		}
		
	})
	
	console.log("ret: "+ret)
	
	return ret
	
}

// SE ATIVIDADE TEM PLANO DE CORTE
function atvTemPlanoCorte(codcoligada,codfilial,codOrdem,idAtvOrdem,codEstrutura){
	
	console.log("atvTemPlanoCorte")
	
	console.log("codcoligada: "+codcoligada+", codfilial: "+codfilial+", codOrdem: "+codOrdem+", idAtvOrdem: "+idAtvOrdem+", codEstrutura: "+codEstrutura)
	
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
		
		console.log("não tem plano de corte")
		
		return false
		
	} else {
		// SE NÃO
		
		console.log("tem plano de corte")
		
		return true
		
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


// FUNÇÃO PARA ESCONDER A OPÇÃO DE INICIAR SOLICITAÇÃO COM BASE NA ATUAL
parent.$('.wcm-all-content').bind('DOMNodeInserted', function(e){
	
   // QUANDO APARECER A TELA DE "SOLICITAÇÃO INICIADA COM SUCESSO" IRÁ ENTRAR NESSE IF
   if (e.target.id == 'message-page') {
	  
    // ESCONDE A OPÇÃO DE "INICIAR SOLICITAÇÃO COM BASE NESTA"
    parent.$('[data-reset-process-instance-id]').hide()
    
  }	
  
})

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
  // BUSCA TABELA DE HABILIDADES - DIEGO E ADRIELLY 
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

		$(".PLANEJAMENTO").show()
     	limparTabelaHab()
		carregarHabAnteriores(filial,codmo)
		$("#TABELAADDHAB").show()
        
    }

}
// ADICIONA LINHA NA TABELA DE HABILIDADES - ADRIELLY E DIEGO

function addHabilidadesSelec(){

    var row = wdkAddChild('Habilidades_Adicionadas')

    return row

}

//CARREGAR HABILIDADES ANTERIORES - ADRIELLY E DIEGO
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

//REVOMER AS HABILIDADES DO OPERADOR -ADRIELLY E DIEGO

function RemoverHabilidadesOperador(codmo, filial){


    var a4 = DatasetFactory.createConstraint("CODregistro",codmo,codmo,ConstraintType.MUST)
    var a5 = DatasetFactory.createConstraint("filial_cod",filial,filial,ConstraintType.MUST)

    var constraints = new Array(a4, a5)
    var dataset = DatasetFactory.getDataset("dsRemoverHabilidadesOperador",null,constraints,null)

   
}

//ADICIONAR AS HABILIDADES DO OPERADOR - ADRIELLY E DIEGO

function AddHabilidadesOperador(codmo,habilidades){

    var a6 = DatasetFactory.createConstraint("CODregistro",codmo,codmo,ConstraintType.MUST)
    var a7 = DatasetFactory.createConstraint("CODHAB",habilidades,habilidades,ConstraintType.MUST)

    var constraints = new Array(a6,a7)
    var dataset = DatasetFactory.getDataset("dsAddHabilidadesOperador",null,constraints,null)


}

//FUNÇÃO SALVAR TABELA NO RM - ADRIELLY E DIEGO

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


//VERIFICA SE JÁ EXISTE A HABILIDADE - ADRIELLY E DIEGO

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

// LIMPA TABELA - ADRIELLY E DIEGO

function limparTabelaHab(){

    $("span[id^='REMOVEHAB___']").each( function(){

            $(this).parent().parent().remove();

        }
    )

    $("#TABELAADDHAB").hide()

}


