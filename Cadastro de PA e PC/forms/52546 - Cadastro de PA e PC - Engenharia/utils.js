// ADICIONA LINHA NA TABELA DO PLANO DE CORTE CADASTRO
function addPlanoCorteCadastro(){
	
	var row = wdkAddChild('PLANOCORTE')
	 
	return row
	
}

// ADICIONA LINHA NA TABELA DO PLANO DE CORTE EDIÇÃO
function addPlanoCorteEdicao(){
	
	var row = wdkAddChild('PLANOCORTEED')
	 
	return row
	
}

// ADICIONA LINHA NA TABELA DOS FILTROS PARA A TABELA DO CADASTRO
function addFiltroCadastro(){
	
	var row = wdkAddChild('PLANOCORTE_INFO')
	 
	return row
	
}

// ADICIONA LINHA NA TABELA DOS FILTROS PARA A TABELA DE EDIÇÃO
function addFiltroEdicao(){
	
	var row = wdkAddChild('PLANOCORTEED_INFO')
	 
	return row
	
}

// CALCULA A QUANTIDADE MP
function calculaMP(obj){
	
	formataValorPonto(obj);

	//verificaQtdeSucataCAD();

	var qtdeRetalho = $(obj).val()
	console.log(qtdeRetalho);
	
	// SE A QUANTIDADE DE RETALHO NÃO É NULO OU VAZIO
	if(qtdeRetalho!="" && qtdeRetalho!=null && qtdeRetalho!=undefined && isNaN(qtdeRetalho)!=true){
		
		qtdeRetalho = qtdeRetalho.toString()
		
		if(qtdeRetalho.includes(",")){
			
			qtdeRetalho = qtdeRetalho.replace(",",".")
			
		}
		
		qtdeRetalho = parseFloat(qtdeRetalho)

		if (qtdeRetalho < 0) {

			$("#QTDEMPCAD").val("");
			$(obj).val("")
			$("#QTDESUCATAPLANCAD").val("")
			//$("#QTDESUCATAPLANCAD").prop("disabled",true)
			
			$("#SALDODISPONIVELCAD").val($("#SALDOAUXCAD").val());
			Swal.fire({
				icon: 'error',
				title: 'A quantidade informada não é válida',
				text: 'Não é permitido um retalho negativo.'
		  })

		}
		else{

			formataValorPonto($("#SALDOAUXCAD"))
			var saldoLote = $("#SALDOAUXCAD").val()
			formataValorVirgula($("#SALDOAUXCAD"))
			console.log(saldoLote)
			
			saldoLote = parseFloat(saldoLote)
			console.log(saldoLote)
			
			var qtdeMP = saldoLote - qtdeRetalho
			qtdeMP=parseFloat(qtdeMP)
			
			// SE A QTDE DA MP FOR MENOR OU IGUAL A 0
			if(qtdeMP <= 0){
				
				// LIMPA A QUANTIDADE DE MP
				$("#QTDEMPCAD").val("")
				$("#QTDRETALHOCAD").val("")
				$("#QTDESUCATAPLANCAD").val("")
				//$("#QTDESUCATAPLANCAD").prop("disabled",true)
				$("#SALDODISPONIVELCAD").val($("#SALDOAUXCAD").val());
				
				// EXIBE ALERTA
				Swal.fire({
					icon: 'error',
					title: 'A quantidade informada ultrapassou o saldo do lote',
					text: 'Verifique as quantidades e tente novamente; \n Verifique também planos cadastrados com esse lote.'
				})
				
			} else {
				// SE NÃO
				
				// SALVA A QUANTIDADE DE MP
				$("#QTDEMPCAD").val(qtdeMP)
				$("#SALDODISPONIVELCAD").val(qtdeRetalho);
				formataValorVirgula($("#SALDODISPONIVELCAD"));
				formataValorVirgula($("#QTDEMPCAD"));
				formataValorVirgula(obj);
				//$("#QTDESUCATAPLANCAD").prop("disabled",false)
				//$("#SALDODISPONIVELCAD").val(qtdeRetalho)
					
			}

		}
		
		
	}
	else{

		$("#QTDEMPCAD").val("");
		$("#QTDESUCATAPLANCAD").val("")
		$("#QTDRETALHOCAD").val("")
		//$("#QTDESUCATAPLANCAD").prop("disabled",true)
		$("#SALDODISPONIVELCAD").val($("#SALDOAUXCAD").val());
		Swal.fire({
			icon: 'warning',
			title: 'Quantidade inválida',
			text: 'A quantidade de retalho precisa ser informada'
		})
		

	}
	$("#QTDEPECASPLANCAD").val("");
	$("#QTDESUCATAPLANCAD").val("");
	AtualizaPesoArt("CAD")
	
}

// CALCULA A QUANTIDADE MP EDIÇÃO
function calculaMPED(obj){
	
	formataValorPonto(obj);

	//verificaQtdeSucataED();

	$("#QTDESUCATAPLANED").val("")

	var qtdeRetalho = $(obj).val()
	
	console.log("vou calcular MPED")
	
	// SE A QUANTIDADE DE RETALHO NÃO É NULO OU VAZIO
	if(qtdeRetalho!="" && qtdeRetalho!=null && qtdeRetalho!=undefined && isNaN(qtdeRetalho)!=true){
		
		qtdeRetalho = qtdeRetalho.toString()
		
		if(qtdeRetalho.includes(",")){
			
			qtdeRetalho = qtdeRetalho.replace(",",".")
			
		}
		
		qtdeRetalho = parseFloat(qtdeRetalho)

		if (qtdeRetalho < 0) {

			var qtdeMP=$("#QTDEMPEDORIGINAL").val()

			$("#QTDEMPED").val(qtdeMP)
			formataValorVirgula($("#QTDEMPED"));
			$(obj).val("")
			$("#QTDESUCATAPLANED").val("")
			$("#QTDESUCATAPLANED").prop("disabled",true)
			CalculaSaldoDisponivelED("");
			Swal.fire({
				icon: 'error',
				title: 'A quantidade informada não é válida',
				text: 'Não é permitido um retalho negativo.'
		  })

		}
		else{

			formataValorPonto($("#SALDOAUXED"))
			var saldoLote = $("#SALDOAUXED").val()


			saldoLote = parseFloat(saldoLote)
			
			formataValorPonto($("#QTDEMPED"))
			var qtdeMP = $("#QTDEMPED").val()

			qtdeMP = parseFloat(qtdeMP)

			
			qtdeMP=(saldoLote+qtdeMP)-(qtdeRetalho)

			qtdeMP= parseFloat(qtdeMP).toFixed(4)
			
			console.log("qtdeMP: "+qtdeMP)
			
			// SE A QTDE DA MP FOR MENOR OU IGUAL A 0
			if(qtdeMP <= 0){
				
				var qtdeMP=$("#QTDEMPEDORIGINAL").val()

				$("#QTDEMPED").val(qtdeMP)
				formataValorVirgula($("#QTDEMPED"));
				// LIMPA A QUANTIDADE DO RETALHO
				$(obj).val("")
				$("#QTDESUCATAPLANED").val("")
				$("#QTDESUCATAPLANED").prop("disabled",true)
				CalculaSaldoDisponivelED("");
				
				// EXIBE ALERTA
				Swal.fire({
					icon: 'error',
					title: 'A quantidade informada ultrapassou o saldo do lote',
					text: 'Verifique as quantidades e tente novamente; \n Verifique também planos cadastrados com esse lote.'
				})
				
			} else {
				// SE NÃO
				
				// SALVA A QUANTIDADE DE MP
				$("#QTDEMPED").val(qtdeMP)
				$("#SALDODISPONIVELED").val(qtdeRetalho)
				formataValorVirgula($("#SALDODISPONIVELED"));
				formataValorVirgula($("#QTDEMPED"));
				formataValorVirgula(obj);
				$("#QTDESUCATAPLANED").prop("disabled",false)
				$("#SALDOAUXED").val(qtdeRetalho)
					
			}
		
		}
		
	}
	else{

		var qtdeMP=$("#QTDEMPEDORIGINAL").val()

		$("#QTDEMPED").val(qtdeMP)
		formataValorVirgula($("#QTDEMPED"));
		// LIMPA A QUANTIDADE DO RETALHO
		$(obj).val("")
		$("#QTDESUCATAPLANED").val("")
		$("#QTDESUCATAPLANED").prop("disabled",true)
		CalculaSaldoDisponivelED("");

		Swal.fire({
			icon: 'warning',
			title: 'Quantidade inválida',
			text: 'A quantidade de retalho precisa ser informada'
		})

	}

	AtualizaPesoArt("ED")
	
}

// FORMATA VALORES TROCANDO PONTO POR VÍRGULA
function formataValorVirgula(obj){
	
	var valor = $(obj).val()
	console.log("valor: "+valor)
	
	var campo = $(obj).attr("id")
	console.log("campo: "+campo)
	valor = valor.replace(",",".")
	// SE VALOR NÃO É NÚMERO
	if(isNaN(valor)){
		
		$(obj).val("0.0000")
		
		// EXIBE ALERTA 
		var Toast = Swal.mixin({
			toast: true,
			position: 'center',
			showConfirmButton: false,
			timer: 4000,
			timerProgressBar: true,
		})
	
		Toast.fire({
			icon: 'warning',
			title: 'Digite um valor correto!\n Use apenas vírgulas e números para expressar as quantidades',			
			stopOnFocus: true,
		})
		
	} else if(valor!="" && valor!=undefined && valor!==null) {

		valor=parseFloat(valor).toFixed(4)
		valor = valor.replace(".",",")
		console.log("novo valor: "+valor)
		$(obj).val(valor);
		
	}
	
}

function formataValorPonto(obj){
	
	var valor = $(obj).val()
	console.log("valor: "+valor)
	
	var campo = $(obj).attr("id")
	console.log("campo: "+campo)
	valor = valor.replace(",",".")
	
	// SE VALOR NÃO É NÚMERO
	if(isNaN(valor)){
		
		$(obj).val("0.0000")
		
		// EXIBE ALERTA 
		var Toast = Swal.mixin({
			toast: true,
			position: 'center',
			showConfirmButton: false,
			timer: 4000,
			timerProgressBar: true,
		})
	
		Toast.fire({
			icon: 'warning',
			title: 'Digite um valor correto!\n Use apenas vírgulas e números para expressar as quantidades',			
			stopOnFocus: true,
		})
		
	} else {

		valor=parseFloat(valor).toFixed(4)
		console.log("novo valor: "+valor)
		$(obj).val(valor);
		
	}
	
}

function limpaLogModalED(){

	$("#LOG_CRIACAO_ED").text("")
	$("#LOG_EDICOES_ED_ADD").empty()


}

function addLinhaLogEdicaoED(){

	var seq = $("a[id^='SEQ_LOG_ED___']")
	seq = Number(seq.length) + 1

	var str = "<a class='list-group-item' id='SEQ_LOG_ED___"+seq+"' name='SEQ_LOG_ED___"+seq+"'></a>"

	$("#LOG_EDICOES_ED_ADD").append(str)

	return seq;

}

function carregaLogED(obj){

	var seq = $(obj).attr("id").split("___")[1]

	var dataoriginal = $("#DATAORIGINALED___"+seq).val().split(" ")[0].split("-")
	dataoriginal = dataoriginal[2]+"/"+dataoriginal[1]+"/"+dataoriginal[0]

	$("#LOG_CRIACAO_ED").text("Necessidade criada dia "+dataoriginal+" pelo usuário "+ $("#USUARIOORIGINALED___"+seq).val() +" ")

	$("#LOG_OBS_PCP_ED").text($("#COMPLEMENTOANTIGOED___"+seq).val()=="" ? "Sem observações do PCP" : $("#COMPLEMENTOANTIGOED___"+seq).val())
	$("#LOG_OBS_ENG_ED").text($("#OBSERVACAOANTIGAED___"+seq).val()=="" ? "Sem observações da Engenharia" : $("#OBSERVACAOANTIGAED___"+seq).val())

	var histlog = $("#LOGORIGINALED___"+seq).val()

	if(histlog!=null && histlog!=undefined && histlog!="" && histlog!="null"){

		histlog = histlog.split(";")

		for(var i=0; i < histlog.length - 1 ; i++){
	
			var seq2 = addLinhaLogEdicaoED()
	
			$("#SEQ_LOG_ED___"+seq2).text(histlog[i])
	
		}
	}
	else{

		var seq2 = addLinhaLogEdicaoED()
	
		$("#SEQ_LOG_ED___"+seq2).text("Esta necessidade ainda não sofreu alterações")

	}


}

function limpaLogModalCAD(){

	$("#LOG_CRIACAO_CAD").text("")
	$("#LOG_EDICOES_CAD_ADD").empty()


}

function addLinhaLogEdicaoCAD(){

	var seq = $("a[id^='SEQ_LOG_CAD___']")
	seq = Number(seq.length) + 1

	var str = "<a class='list-group-item' id='SEQ_LOG_CAD___"+seq+"' name='SEQ_LOG_CAD___"+seq+"'></a>"

	$("#LOG_EDICOES_CAD_ADD").append(str)

	return seq;

}

function carregaLogCAD(obj){

	var seq = $(obj).attr("id").split("___")[1]

	var dataoriginal = $("#DATAORIGINALCAD___"+seq).val().split(" ")[0].split("-")
	dataoriginal = dataoriginal[2]+"/"+dataoriginal[1]+"/"+dataoriginal[0]

	$("#LOG_CRIACAO_CAD").text("Necessidade criada dia "+dataoriginal+" pelo usuário "+ $("#USUARIOORIGINALCAD___"+seq).val() +" ")

	$("#LOG_OBS_PCP_CAD").text($("#COMPLEMENTOANTIGOCAD___"+seq).val()=="" ? "Sem observações do PCP" : $("#COMPLEMENTOANTIGOCAD___"+seq).val())
	$("#LOG_OBS_ENG_CAD").text($("#OBSERVACAOANTIGACAD___"+seq).val()=="" ? "Sem observações da Engenharia" : $("#OBSERVACAOANTIGACAD___"+seq).val())

	var histlog = $("#LOGORIGINALCAD___"+seq).val()

	if(histlog!=null && histlog!=undefined && histlog!="" && histlog!="null"){

		histlog = histlog.split(";")

		for(var i=0; i < histlog.length - 1 ; i++){
	
			var seq2 = addLinhaLogEdicaoCAD()
	
			$("#SEQ_LOG_CAD___"+seq2).text(histlog[i])
	
		}
	}
	else{

		var seq2 = addLinhaLogEdicaoCAD()
	
		$("#SEQ_LOG_CAD___"+seq2).text("Esta necessidade ainda não sofreu alterações")

	}


}


// VERIFICA SE A QUANTIDADE INFORMADA É SUPERIOR AO SALDO NA TABELA DE CADASTRO
function verificaQtdePlanoCad(obj){
	
	console.log("entrei para verificar a quantidade do plano")
	
	var seq = $(obj).attr("id").split("___")[1]
	console.log("seq: "+seq)
	
	var saldo = $("#SALDOCADORIGINAL___"+seq).val()
	saldo = parseInt(saldo)
	
	console.log("saldo: "+saldo)
	
	var qtdePlano = $("#QTDEPLANOCAD___"+seq).val()
	
	console.log("qtdePlano: "+qtdePlano)
	
	
	if(qtdePlano!=null && qtdePlano!="" && qtdePlano!=undefined){

		qtdePlano = parseInt(qtdePlano)
		// SE A QUANTIDADE DO PLANO FOR MAIOR QUE O SALDO DISPONÍVEL
		if(qtdePlano<1){

			console.log("qtdePlano não é permitido")
			
			$("#SALDOCAD___"+seq).val(Number(parseInt($("#SALDOCADORIGINAL___"+seq).val())))
			$("#QTDEPLANOCAD___"+seq).val("")
			
			// EXIBE ALERTA
			Swal.fire({
				icon: 'error',
				title: 'A quantidade informada não é válida',
				text: 'Se não for fabricar quantidades nesta OP, desmarque a mesma.'
			})

		}
		else if(qtdePlano>saldo){
			
			console.log("qtdePlano é maior que o saldo")
			
			$("#QTDEPLANOCAD___"+seq).val("")
			$("#SALDOCAD___"+seq).val(parseInt($("#SALDOCADORIGINAL___"+seq).val()))
			
			// EXIBE ALERTA
			Swal.fire({
				icon: 'error',
				title: 'A quantidade informada ultrapassou o saldo disponível',
				text: 'Verifique e tente novamente.'
			})
			
		} else {
			
			$("#SALDOCAD___"+seq).val(parseInt($("#SALDOCADORIGINAL___"+seq).val())-qtdePlano)
			$("#QTDEPLANOCAD___"+seq).val(qtdePlano)
			var qtdeprevista=$("#QTDEPREVISTACAD___"+seq).val()
			var qtderealoriginal=$("#QTDREALORIGINALCAD___"+seq).val()
			var qtdreal=(Number(qtderealoriginal))*(Number(qtdePlano)/Number(qtdeprevista))
			$("#QTDREALCAD___"+seq).val(qtdreal)
		}
	}
	else{

		$("#SALDOCAD___"+seq).val(Number(parseInt($("#SALDOCADORIGINAL___"+seq).val())))
		$("#QTDREALCAD___"+seq).val("")

	}
	AtualizaPesoArt("CAD")
	
}

// VERIFICA SE A QUANTIDADE INFORMADA É SUPERIOR AO SALDO NA TABELA DE EDIÇÃO
function verificaQtdePlanoEd(obj){
	
	console.log("entrei para verificar a quantidade do plano")
	
	var seq = $(obj).attr("id").split("___")[1]
	console.log("seq: "+seq)
	
	var saldo = $("#SALDOED___"+seq).val() 
	saldo = parseInt(saldo)
	
	console.log("saldo: "+saldo)

	var qtdePrev = $("#QTDEPREVISTAED___"+seq).val()
	qtdePrev = parseInt(qtdePrev)
	
	console.log("previsto: "+saldo)
	
	var qtdePlano = $("#QTDEPLANOED___"+seq).val()
	
	console.log("qtdePlano: "+qtdePlano)
	
	if(qtdePlano!=null && qtdePlano!="" && qtdePlano!=undefined){

		qtdePlano = parseInt(qtdePlano)
		// SE A QUANTIDADE DO PLANO FOR MAIOR QUE O SALDO DISPONÍVEL
		//if(qtdePlano>saldo){

		if(qtdePlano<1){
			console.log("qtdePlano não é permitido")
			
			$("#SALDOED___"+seq).val(parseInt(parseInt($("#SALDOEDORIGINAL___"+seq).val())+parseInt($("#QTDEPLANOEDORIGINAL___"+seq).val())))
			$("#QTDEPLANOED___"+seq).val("")
			
			// EXIBE ALERTA
			Swal.fire({
				icon: 'error',
				title: 'A quantidade informada não é válida',
				text: 'Se não for fabricar quantidades nesta OP, desmarque a mesma.'
			})
		}
		else if(qtdePlano>qtdePrev){
			
			console.log("qtdePlano é maior que o saldo")
			
			$("#SALDOED___"+seq).val(parseInt(parseInt($("#SALDOEDORIGINAL___"+seq).val())+parseInt($("#QTDEPLANOEDORIGINAL___"+seq).val())))
			$("#QTDEPLANOED___"+seq).val("")
			
			// EXIBE ALERTA
			Swal.fire({
				icon: 'error',
				title: 'A quantidade informada ultrapassou a quantidade prevista',
				text: 'Verifique e tente novamente.'
			})
			
		} else {
			
			$("#SALDOED___"+seq).val((parseInt($("#SALDOEDORIGINAL___"+seq).val())+parseInt($("#QTDEPLANOEDORIGINAL___"+seq).val())-qtdePlano))
			$("#QTDEPLANOED___"+seq).val(qtdePlano)
			var qtdeprevista=$("#QTDEPREVISTAED___"+seq).val()
			var qtderealoriginal=$("#QTDREALORIGINALED___"+seq).val()
			var qtdreal=(Number(qtderealoriginal))*(Number(qtdePlano)/Number(qtdeprevista))
			$("#QTDREALED___"+seq).val(qtdreal)
			
		}

	}
	else{

		console.log("saldo e plano:")
		console.log($("#SALDOEDORIGINAL___"+seq).val())
		console.log($("#QTDEPLANOEDORIGINAL___"+seq).val())
		$("#SALDOED___"+seq).val(parseInt(parseInt($("#SALDOEDORIGINAL___"+seq).val())+parseInt($("#QTDEPLANOEDORIGINAL___"+seq).val())))
		$("#QTDREALED___"+seq).val("")

	}
	AtualizaPesoArt("ED")
	
}

// HABILITA O CAMPO DO NÚMERO DO PLANO
function habilitaNumPlano(){
	
	$("#NUMPLANOED").prop("readonly",false)
	
}

// SE PLANO DE CORTE JÁ FOI PROGRAMADO
function planoProgramado(numPlano){
	
	console.log("vou verificar se plano de corte já teve ordens programadas")
	
	// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
	var a1 = DatasetFactory.createConstraint("NUMPLANOCORTE",numPlano,numPlano,ConstraintType.MUST)
	
	var constraints = new Array(a1)
	
	var dataset = DatasetFactory.getDataset("dsProgPAPC",null,constraints,null)
	var row = dataset.values
	
	console.log("row")
	console.log(row)
	
	var ret = false
	
	// SE RETORNO NÃO É NULO OU VAZIO
	if(!(row=="" || row==undefined || row==null)){
		
		var count = row.length
		
		// PERCORRE OS REGISTROS 
		for(var i=0; i<count; i++){
			
			var rep = row[i]
			
			// SE ORDEM FOI ALOCADA
			if(!(rep["ORDEM_ALOC"]=="" || rep["ORDEM_ALOC"]==null || rep["ORDEM_ALOC"]==undefined || rep["ORDEM_ALOC"]=="NULL" || rep["ORDEM_ALOC"]=="null")){
				
				ret = true
				
			}
			
		}
		//ret = true
		
	}
	
	console.log("tem ordens programadas? "+ret)
	
	return ret
	
}

// SE PLANO DE CORTE JÁ FOI PROGRAMADO
function RaDoPlanoGerada(numPlano){
	
	console.log("vou verificar se plano de corte já teve ordens programadas")

	var codfilial = $("#CODFILIALED").val()
	
	// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
	var a1 = DatasetFactory.createConstraint("NUMPLANOCORTE",numPlano,numPlano,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("CODFILIAL",codfilial,codfilial,ConstraintType.MUST)

	
	var constraints = new Array(a1,a2)
	
	var dataset = DatasetFactory.getDataset("dsConsultaRaPAPC",null,constraints,null)
	var row = dataset.values
	
	console.log("row")
	console.log(row)
	
	var ret = false
	
	// SE RETORNO NÃO É NULO OU VAZIO
	if(!(row=="" || row==undefined || row==null)){
		
		var count = row.length
		
		// PERCORRE OS REGISTROS 
		for(var i=0; i<count; i++){
			
			var rep = row[i]
			
			// SE RA FOI GERADA
			if(rep["STATUS"]!="C"){
				
				ret = true
				
			}
			
		}
		//ret = true
		
	}
	
	console.log("tem ra gerada? "+ret)
	
	return ret
	
}

// VERIFICA SE O NÚMERO DO PLANO DE CORTE JÁ FOI CADASTRADO
function verificaNumPlanoEd(){
	
	var numPlano = $("#NUMPLANOED").val()
	var codFilial = $("#CODFILIALED").val()
	
	console.log("o número do plano de edição "+numPlano+" e filial "+codFilial)

	if (codFilial=="" || codFilial==null || codFilial==undefined) {

		$("#PLANOCORTEED>option").remove();
		$("#NUMPLANOED").val("");

		Swal.fire({
			icon: 'error',
			title: 'Código da filial não está preenchido',
			text: 'Selecione o código da filial.'
	  })

	}
	// SE FILIAL E O NÚMERO DO PLANO FORAM PREENCHIDOS
	else if(!(numPlano=="" || numPlano==null || numPlano==undefined)){
		
		numPlano = numPlano.toUpperCase()
		$("#NUMPLANOED").val(numPlano)
		
		// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
		var a1 = DatasetFactory.createConstraint("NUMPLANOCORTE",numPlano,numPlano,ConstraintType.MUST)
		var a2 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
		
		var constraints = new Array(a1,a2)
		
		var dataset = DatasetFactory.getDataset("dsVerificaNumPlanoCorteEdicao",null,constraints,null)
		var row = dataset.values
		
		// SE RETORNO É VAZIO OU NULO
		if(row=="" || row==null || row==undefined){
			
			// LIMPA O NÚMERO DO PLANO DE CORTE
			$("#NUMPLANOED").val("")
			$("#NUMPLANOED").focus()
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'O número informado do Plano de Corte não foi cadastrado',
				  text: 'Verifique e tente novamente.'
			})
			$("#PROJETOED").val("")
			$("#CODPRJPLANED").val("")
			$("#ATIVIDADEPLANED").val("")
			//$("#CODATIVIDADEPLANED").val("")
			//$("#DSCCODATIVIDADEPLANED").val("")
			$("#MATERIALPLANED").val("")
			$("#DSCMATERIALPLANED").val("")
			$("#DESENHOED").val("")
			$("#DSCNUMDESENHOED").val("")
			$("#CODMATERIALED").val("")
			$("#QTDEMPED").val("")
			$("#CODSUCATAED").val("")
			$("#QTDESUCATAPLANED").val("")
			
		} else {
			// SE NÃO 
			
			var rep = row[0]
			
			$("#LOTEED").prop("disabled",false)
			$("#CODMPED").prop("disabled",false)
			$("#QTDRETALHOED").prop("disabled",false)
			$("#RETALHOED").prop("disabled",false)
			$("#PROJETOED").val(rep["OS"])
			$("#CODPRJPLANED").val(rep["OS"])
			//$("#ATIVIDADEPLANED").val(rep["DSCATIVIDADE"])
			//$("#CODATIVIDADEPLANED").val(rep["CODATIVIDADE"])
			//$("#DSCCODATIVIDADEPLANED").val(rep["DSCATIVIDADE"])
			//$("#MATERIALPLANED").val(rep["MATERIAL"])
			//$("#DSCMATERIALPLANED").val(rep["MATERIAL"])
			//$("#DESENHOED").val(rep["NUMDESENHO"])
			//$("#DSCNUMDESENHOED").val(rep["NUMDESENHO"])
			
			
			if(!(rep["RETALHO"]=="" || rep["RETALHO"]==null || rep["RETALHO"]==undefined)){
				
				$("#RETALHOED").val(rep["RETALHO"])
				
			}
			
			if(!(rep["CODIGOMP"]=="" || rep["CODIGOMP"]==null || rep["CODIGOMP"]==undefined)){
				
				$("#CODMATERIALED").val(rep["CODIGOMP"])
				
			}
			
			if(!(rep["QTDEMP"]=="" || rep["QTDEMP"]==null || rep["QTDEMP"]==undefined)){
				
				$("#QTDEMPED").val(rep["QTDEMP"])
				$("#QTDEMPEDORIGINAL").val(rep["QTDEMP"])
				var qtdeMP=rep["QTDEMP"];
				formataValorVirgula($("#QTDEMPED"))
				
			}
			
			if(!(rep["QTDESUCATA"]=="" || rep["QTDESUCATA"]==null || rep["QTDESUCATA"]==undefined)){
				
				$("#QTDESUCATAPLANED").val(rep["QTDESUCATA"])
				
			}
			
			if(!(rep["CODSUCATA"]=="" || rep["CODSUCATA"]==null || rep["CODSUCATA"]==undefined)){
				
				window["SUCATAED"].setValue(rep["CODSUCATA"])
				$("#CODSUCATAED").val(rep["CODSUCATA"])
				
			}
			
			if(!(rep["CODIGOMP"]=="" || rep["CODIGOMP"]==null || rep["CODIGOMP"]==undefined)){
				
				window["CODMPED"].setValue(rep["CODIGOMP"])	
				$("#IDMATERIALED").val(rep["IDPRD"])
				
			}
			
			if(!(rep["NUMLOTE"]=="" || rep["NUMLOTE"]==null || rep["NUMLOTE"]==undefined)){
				
				window["LOTEED"].setValue(rep["NUMLOTE"])
				$("#NUMLOTEED").val(rep["NUMLOTE"])
				$("#IDLOTEED").val(rep["IDLOTE"])
				$("#SALDOLOTEED").val(rep['SALDOFISICO2'])
				
			}

			var planocorte = ""
			var codfilial = $("#CODFILIALED").val();
			var os = $("#CODPRJPLANED").val();
			var numlote = $("#NUMLOTEED").val();
			var idprd = rep["CODIGOMP"].split(".")[2];
			idprd = parseInt(idprd);
			$("#IDMATERIALED").val(idprd);
			console.log(rep["CODIGOMP"])
			console.log(idprd)

			var versao = $("#VERSAOCONTROLESALDO").val()

			var a1 = DatasetFactory.createConstraint("PLANOCORTEED",planocorte,planocorte,ConstraintType.MUST)
			var a2 = DatasetFactory.createConstraint("CODFILIAL",codfilial,codfilial,ConstraintType.MUST)
			var a3 = DatasetFactory.createConstraint("OS",os,os,ConstraintType.MUST)
			var a4 = DatasetFactory.createConstraint("NUMLOTE",numlote,numlote,ConstraintType.MUST)
			var a5 = DatasetFactory.createConstraint("IDPRD",idprd,idprd,ConstraintType.MUST)
			var a6 = DatasetFactory.createConstraint("VERSAO",versao,versao,ConstraintType.MUST)
			

			var constraints = new Array(a1,a2,a3,a4,a5,a6)

			console.log("Vou rodar o dataset dsBuscaSaldoPAPC");

			var dataset = DatasetFactory.getDataset("dsBuscaSaldoPAPC",null,constraints,null)

			var row=dataset.values
			console.log(row)
			var retorno = row[0];
			
			$("#SALDODISPONIVELED").val(parseFloat(retorno["SALDODISPONIVEL"]).toFixed(4))
			formataValorVirgula($("#SALDODISPONIVELED"))
			$("#SALDOAUXED").val(parseFloat(retorno["SALDODISPONIVEL"]).toFixed(4))
			formataValorVirgula($("#QTDESUCATAPLANED"))

			carregaModalPlanosPendED()


		}
		
	} else {
		
		// LIMPA CABEÇALHO DA EDIÇÃO
		limpaCabecalhoEdicao()
		
		// LIMPA TABELA DE EDIÇÃO
		limparTabelaEdicao()
		
		// VERIFICA SE VAI EXIBIR/ESCONDE TABELAS
		verificaTabelas()
		
	}
	
}

function AtualizaQtdPlano(){

	var myLoading2 = FLUIGC.loading(window);
	myLoading2.show();
	var numPlano = $("#NUMPLANOED").val()
	var codFilial = $("#CODFILIALED").val()
	
	console.log("o número do plano de edição "+numPlano+" e filial "+codFilial)

	if (codFilial=="" || codFilial==null || codFilial==undefined) {

		$("#PLANOCORTEED>option").remove();
		$("#NUMPLANOED").val("");

		Swal.fire({
			icon: 'error',
			title: 'Código da filial não está preenchido',
			text: 'Selecione o código da filial.'
	  })

	}
	// SE FILIAL E O NÚMERO DO PLANO FORAM PREENCHIDOS
	else if(!(numPlano=="" || numPlano==null || numPlano==undefined)){
		
		numPlano = numPlano.toUpperCase()
		$("#NUMPLANOED").val(numPlano)
		
		// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
		var a1 = DatasetFactory.createConstraint("NUMPLANOCORTE",numPlano,numPlano,ConstraintType.MUST)
		var a2 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
		
		var constraints = new Array(a1,a2)
		
		var dataset = DatasetFactory.getDataset("dsVerificaNumPlanoCorteEdicao",null,constraints,null)
		var row = dataset.values
		
		// SE RETORNO É VAZIO OU NULO
		if(row=="" || row==null || row==undefined){
			
			// LIMPA O NÚMERO DO PLANO DE CORTE
			$("#NUMPLANOED").val("")
			$("#NUMPLANOED").focus()
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'O número informado do Plano de Corte não foi cadastrado',
				  text: 'Verifique e tente novamente.'
			})
			$("#PROJETOED").val("")
			$("#CODPRJPLANED").val("")
			$("#ATIVIDADEPLANED").val("")
			//$("#CODATIVIDADEPLANED").val("")
			//$("#DSCCODATIVIDADEPLANED").val("")
			$("#MATERIALPLANED").val("")
			$("#DSCMATERIALPLANED").val("")
			$("#DESENHOED").val("")
			$("#DSCNUMDESENHOED").val("")
			$("#CODMATERIALED").val("")
			$("#QTDEMPED").val("")
			$("#QTDEMPEDORIGINAL").val("")
			$("#CODSUCATAED").val("")
			$("#QTDESUCATAPLANED").val("")
			
		} else {
			// SE NÃO 
			
			var rep = row[0]
			
			if(!(rep["QTDEMP"]=="" || rep["QTDEMP"]==null || rep["QTDEMP"]==undefined)){
				
				$("#QTDEMPED").val(rep["QTDEMP"])
				$("#QTDEMPEDORIGINAL").val(rep["QTDEMP"])
				var qtdeMP=rep["QTDEMP"];
				formataValorVirgula($("#QTDEMPED"))
				
			}
		}
	} else {
		
		// LIMPA CABEÇALHO DA EDIÇÃO
		limpaCabecalhoEdicao()
		
		// LIMPA TABELA DE EDIÇÃO
		limparTabelaEdicao()
		
		// VERIFICA SE VAI EXIBIR/ESCONDE TABELAS
		verificaTabelas()
		
	}

	myLoading2.hide();

}

// VERIFICA SE O NÚMERO DO PLANO DE CORTE JÁ FOI CADASTRADO
function verificaNumPlanoCad(){
	
	var numPlano = $("#NUMPLANO").val()
	
	console.log("o número do plano de edição "+numPlano)
	
	// SE O NÚMERO DO PLANO FOI PREENCHIDO
	if(!(numPlano=="" || numPlano==null || numPlano==undefined)){
		
		numPlano = numPlano.toUpperCase()
		$("#NUMPLANO").val(numPlano)
		
		// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
		var a1 = DatasetFactory.createConstraint("NUMPLANOCORTE",numPlano,numPlano,ConstraintType.MUST)
		
		var constraints = new Array(a1)
		
		var dataset = DatasetFactory.getDataset("dsVerificaNumPlanoCorte",null,constraints,null)
		var row = dataset.values
		
		// SE RETORNO É VAZIO OU NULO
		if(!(row=="" || row==null || row==undefined)){
			
			// LIMPA O NÚMERO DO PLANO DE CORTE
			$("#NUMPLANO").val("")
			$("#NUMPLANO").focus()
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'O número informado do Plano de Corte já foi cadastrado',
				  text: 'Verifique e tente novamente.'
			})
			
		}
		
	} else {
		// SE NÃO
		
		// LIMPA CABEÇALHO DO CADASTRO
		limpaCabecalhoCadastro()
		
		// HABILITA OS CAMPOS
		$("#ATIVIDADEPLANCAD").prop("disabled",false)
		$("#MATERIALPLANCAD").prop("disabled",false)
		
		// LIMPA TABELA DE CADASTRO
		limparTabelaCadastro()
		
		// VERIFICA SE VAI EXIBIR/ESCONDE TABELAS
		verificaTabelas()
		
	}
	
}

// CARREGA A O PLANO DE CORTE
function buscarPlano(){

	var myLoading2 = FLUIGC.loading(window);
	
	myLoading2.show();
	
	console.log("vou buscar o plano de corte")

	var view = Number($("#VISUALIZAR").val())
	
	// INICIA A OPERAÇÃO DEPOIS DE CARREGAR O LOAD
	setTimeout(function(){
		
		// SE ABA DO CADASTRO ESTÁ ATIVA
		if($("#ABACAD").hasClass("active")){
			
			console.log("Aba do cadastro está ativa. VOU CADASTRAR")
			
			var numPlano = $("#NUMPLANO").val()
			var os = $("#CODPRJPLANCAD").val()
			var filial = $("#CODFILIAL").val()
			var material = $("#DSCMATERIALPLANCAD").val()
			var codSucata = $("#CODPRDSUCATACAD").val()
			var qtdeSucata = $("#QTDESUCATAPLANCAD").val()
			//var codAtividade = $("#CODATIVIDADEPLANCAD").val()
			var dscAtividade = $("#DSCCODATIVIDADEPLANCAD").val()
			var numDesenho = $("#DSCNUMDESENHOCAD").val()
			var dscAtividade = $("#DSCCODATIVIDADEPLANCAD").val()
			var order = $("#ORDENARPORCAD").val()
			var retalho = $("#RETALHOCAD").val()
			var qtdeMP = $("#QTDEMPCAD").val()
			var codMaterial = $("#CODMATERIALCAD").val()
			var numLote = $("#NUMLOTECAD").val()
			var idLote = $("#IDLOTECAD").val()
			
			// SE CAMPOS OBRIGATÓRIOS FORAM INFORMADOS
			//if(!((numPlano=="" || numPlano==null || numPlano==undefined) || (os=="" || os==null || os==undefined) || 
					//(filial=="" || filial==null || filial==undefined) 
					//|| (codSucata=="" || codSucata==null || codSucata==undefined)
					//|| (qtdeSucata=="" || qtdeSucata==null || qtdeSucata==undefined) || (retalho=="" || retalho==null || retalho==undefined)
					//|| (qtdeMP=="" || qtdeMP==null || qtdeMP==undefined) || (codMaterial=="" || codMaterial==null || codMaterial==undefined)
					//|| (numLote=="" || numLote==null || numLote==undefined) || (idLote=="" || idLote==null || idLote==undefined)
					//)){
				
				// LIMPA CONTEÚDO DA TABELA DE CADASTRO
				limpaTabelaCadastro()
				
				// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
				var a1 = DatasetFactory.createConstraint("OS",os,os,ConstraintType.MUST)
				var a2 = DatasetFactory.createConstraint("MATERIAL",material,material,ConstraintType.MUST)
				var a3 = DatasetFactory.createConstraint("CODATIVIDADE",dscAtividade,dscAtividade,ConstraintType.MUST)
				var a4 = DatasetFactory.createConstraint("NUMDESENHO",numDesenho,numDesenho,ConstraintType.MUST)
				var a5 = DatasetFactory.createConstraint("DSCATIVIDADE",dscAtividade,dscAtividade,ConstraintType.MUST)
				var a6 = DatasetFactory.createConstraint("CODFILIAL",filial,filial,ConstraintType.MUST)
				var a7 = DatasetFactory.createConstraint("STATUS",2,2,ConstraintType.MUST)
				
				var constraints
				
				// SE ORDER BY FOI PREENCHIDO
				if(!(order=="" || order==null || order==undefined)){
					
					console.log("order: "+order)
					
					var a8 = DatasetFactory.createConstraint("ORDER",order,order,ConstraintType.MUST)
					constraints = new Array(a1,a2,a3,a4,a5,a6,a7,a8)
					
				}else{
					// SE NÃO
					
					constraints = new Array(a1,a2,a3,a4,a5,a6,a7)
					
				}
				
				var dataset = DatasetFactory.getDataset("dsBuscaNecessidadeEdicao",null,constraints,null)
				var row = dataset.values
				
				console.log("row")
				console.log(row)
				
				// SE RETORNO NÃO É VAZIO OU NULO
				if(!(row=="" || row==null || row==undefined)){
					
					var count = dataset.values.length
					
					console.log("count: "+count)
					
					// PERCORRE TODOS OS REGISTROS
					for(var i=0; i<count; i++){
						
						var rep = row[i]
						
						var seq = addPlanoCorteCadastro()

						var status = {REPROGRAMADO : '<span class="card-list-item card-list-item-icons REPROGRAMADO_ICON" title="Reprogramado"> '+
							' <i class="bi bi-calendar-plus-fill" style="color:#dbbd08"></i> '+
							' </span>',
							CONCLUIDO: '<span class="card-list-item card-list-item-icons CONCLUIDO_ICON" title="Concluído"> '+
							' <i class="bi bi-check-all"  style="color:#22bc00"></i> '+
							' </span>',
							PENDENCIA: '<span class="card-list-item card-list-item-icons PENDENCIA_ICON" title="Aguardando Pendencia"> '+
							' <i class="bi bi-exclamation-diamond-fill"  style="color:#b92113"></i> '+
							' </span>',
							PARCIAL: '<span class="card-list-item card-list-item-icons PARCIAL_ICON" title="Parcialmente Atendido"> '+
							' <i class="bi bi-check"  style="color:#0a8ce8"></i> '+
							' </span>',
							RETRABALHO: '<span class="card-list-item card-list-item-icons RETRABALHO_ICON" title="Retrabalho"> '+
							' <i class="bi bi-arrow-repeat"  style="color:#852f07"></i> '+
							' </span>',									
						}
						
						$("#OSCAD___"+seq).val(rep["OS"])
						$("#NUMDESENHOCAD___"+seq).val(rep["NUMDESENHO"])
						$("#CODESTRUTURACAD___"+seq).val(rep["CODESTRUTURA"])
						$("#CODORDEMCAD___"+seq).val(rep["OP"])
						$("#EXECUCAOCAD___"+seq).val(rep["EXECUCAO"])
						$("#ATIVIDADECAD___"+seq).val(rep["DSCATIVIDADE"])
						$("#CODATIVIDADECAD___"+seq).val(rep["CODATIVIDADE"])
						$("#IDATIVIDADECAD___"+seq).val(rep["IDATVORDEM"])
						$("#POSICAOCAD___"+seq).val(rep["POSICAO"])
						$("#POSICAOCAD___"+seq).attr("title","Peso bruto: "+rep["PESOBRUTO"]+"\n Peso líquido: "+rep["PESOLIQUIDO"])
						$("#QTDEPREVISTACAD___"+seq).val(parseInt(rep["QTDEPLANEJADA"]).toFixed(0))
						$("#ITEMCAD___"+seq).val(rep["ITEM"])
						$("#MATERIALCAD___"+seq).val(rep["MATERIAL"])
						$("#BITOLACAD___"+seq).val(rep["BITOLA"])
						$("#PAPCCAD___"+seq).val(rep["PAPC"])
						$("#USUARIOORIGINALCAD___"+seq).val(rep["RECCREATEDBY"])
						$("#DATAORIGINALCAD___"+seq).val(rep["RECCREATEDON"])
						$("#QTDATENDIDAORIGINALCAD___"+seq).val(rep["QTDATENDIDA"]=="null" ? "" : rep["QTDATENDIDA"])

						if(rep["SEMANAREPROGRAMACAO"]=="null"){

							$("#CELSEMANANECESSIDADECAD___"+seq).val(rep["SEMANANECESSIDADE"])
							$("#CELSEMANAREPROGORIGINALCAD___"+seq).val("")

							$("#CELDATAREPROGRAMACAOCAD___"+seq).val("")
							$("#VALDATAREPROGRAMACAOCAD___"+seq).val("")

							$("#CELDATANECESSIDADEGERALCAD___"+seq).val(rep["DATANECESSIDADE"])

						}
						else{

							$("#CELSEMANAREPROGORIGINALCAD___"+seq).val(rep["SEMANAREPROGRAMACAO"])
							$("#CELSEMANANECESSIDADECAD___"+seq).val(rep["SEMANAREPROGRAMACAO"])

							$("#CELDATAREPROGRAMACAOCAD___"+seq).val(rep["DATAREPROGRAMACAO"])
							$("#VALDATAREPROGRAMACAOCAD___"+seq).val(formataDataBanco(rep["DATAREPROGRAMACAO"]))

							$("#CELDATANECESSIDADEGERALCAD___"+seq).val(rep["DATAREPROGRAMACAO"])

						}

						$("#STATUSCAD___"+seq).val(rep["STATUSNECESSIDADE"])

						$("#LOGORIGINALCAD___"+seq).val(rep["LOGNECESSIDADE"]!="null" ? rep["LOGNECESSIDADE"] : "")

						$("#QTDENECESSIDADECADORIGINAL___"+seq).val(rep["QTDORIGINAL"])

						$("#CELDATANECESSIDADECAD___"+seq).val(rep["DATANECESSIDADE"])
						$("#VALDATANECESSIDADECAD___"+seq).val(formataDataBanco(rep["DATANECESSIDADE"]))

						$("#CELSEMANAORIGINALCAD___"+seq).val(rep["SEMANANECESSIDADE"])

						$("#COMPLEMENTOANTIGOCAD___"+seq).val(rep["COMPLEMENTO"].toLowerCase() == "null" ? "" : rep["COMPLEMENTO"])
						$("#CODCOLIGADACAD___"+seq).val(rep["CODCOLIGADA"])
						$("#CODFILIALCAD___"+seq).val(rep["CODFILIAL"])

						var obs = rep["OBS"]
						if(obs != null && obs!=undefined && obs!="null" && obs!=""){
							$("#OBSERVACAOANTIGACAD___"+seq).val(rep["OBS"])
						}
						else{
							$("#OBSERVACAOANTIGACAD___"+seq).val("")
						}


						var prioridade = Number(rep["PRIORIDADE"])

						$("#VALPRIORIDADEORIGINALCAD___"+seq).val(prioridade)
						if(rep["PRIORIDADEREPROGRAMACAO"]!="null"){

							prioridade = Number(rep["PRIORIDADEREPROGRAMACAO"])
							$("#VALPRIORIDADEREPROGRAMACAOCAD___"+seq).val(prioridade)

						}else{
							$("#VALPRIORIDADEREPROGRAMACAOCAD___"+seq).val("")
						}

					
						switch (prioridade) {
							case 0:
								$("#CELPRIORIDADECAD___"+seq).val("Baixa");
								break;
							case 1:
								$("#CELPRIORIDADECAD___"+seq).val("Média");
								break;
							case 2:
								$("#CELPRIORIDADECAD___"+seq).val("Alta");
								break;
						}


						$("#VALPRIORIDADECAD___"+seq).val(prioridade)

						$("#SALDOCAD___"+seq).val(rep["SALDO"])
						$("#SALDOCADORIGINAL___"+seq).val(rep["SALDO"])

						if($("#CELSEMANANECESSIDADECAD___"+seq).val() == retornaSemanaDoAno($("#DATAORIGINALCAD___"+seq).val().split(" ")[0]) +"/"+ $("#DATAORIGINALCAD___"+seq).val().split("-")[0]){

							colocaExtra(seq,1)

						}

						$("#NSEQPEDIDOCAD___"+seq).val(rep["NSEQPEDIDO"])

						if(rep["QTDATENDIDA"] == rep["QTDORIGINAL"]){

							$("#STATUSICONCAD___"+seq).parent().append(status.CONCLUIDO)
							$("#STATUSICONCAD___"+seq).parent().addClass('icons-bag')

							$("#STATUSICONCAD___"+seq).parents("tr").first().addClass("CONCLUIDO")

							$("#CONCLUIDO").text( Number($("#CONCLUIDO").text()) + 1)

						}
						else if(rep["QTDATENDIDA"] > 0){

							$("#STATUSICONCAD___"+seq).parent().append(status.PARCIAL)
							$("#STATUSICONCAD___"+seq).parent().addClass('icons-bag')

							$("#STATUSICONCAD___"+seq).parents("tr").first().addClass("PARCIAL")

							$("#PARCIAL").text( Number($("#PARCIAL").text()) + 1)

						}

						if(rep["SEMANAREPROGRAMACAO"]!="" && rep["SEMANAREPROGRAMACAO"]!=null && rep["SEMANAREPROGRAMACAO"]!=undefined && rep["SEMANAREPROGRAMACAO"]!="null"){

							$("#STATUSICONCAD___"+seq).parent().append(status.REPROGRAMADO)
							$("#STATUSICONCAD___"+seq).parent().addClass('icons-bag')

							$("#STATUSICONCAD___"+seq).parents("tr").first().addClass("REPROGRAMADO")

							$("#REPROGRAMADO").text( Number($("#REPROGRAMADO").text()) + 1)

						} 

						if(rep["RETRABALHO"]==1){

							$("#STATUSICONCAD___"+seq).parent().append(status.RETRABALHO)
							$("#STATUSICONCAD___"+seq).parent().addClass('icons-bag')

							$("#RETRABALHO").text( Number($("#RETRABALHO").text()) + 1)

							$("#STATUSICONCAD___"+seq).parents("tr").first().addClass("RETRABALHO")

						}

						if(rep["PENDENCIA"]==1){

							$("#STATUSICONCAD___"+seq).parent().append(status.PENDENCIA)
							$("#STATUSICONCAD___"+seq).parent().addClass('icons-bag')

							$("#PENDENCIA").text( Number($("#PENDENCIA").text()) + 1)

							$("#STATUSICONCAD___"+seq).parents("tr").first().addClass("PENDENCIA")

						}

						$("#TODOS").text( Number($("#TODOS").text()) + 1)
						
					}
					
					// VERIFICA SE VAI EXIBIR/ESCONDE TABELAS
					verificaTabelas()
					
					// SE TABELA DOS FILTROS PARA A TABELA DE CADASTRO NÃO FOI CRIADA
					if(!(temTabelaFiltros())){

						// ADICIONA LINHA PARA O FILTRO DA TELA DO CADASTRO
						addFiltroCadastro()
		
					} else {
						// SE NÃO
						
						// LIMPA OS FILTROS
						limpaFiltros()
						
					}
					
					// CONSTRÓI FILTROS PARA A TABELA DO CADASTRO DO PLANO DE CORTE
					constroiFiltros()
					reconstroiFiltros()

					$("[alvo='GERAL']").find(".ativo").removeClass("ativo")
					
				} else {
					
					// EXIBE ALERTA
					Swal.fire({
						  icon: 'error',
						  title: 'Busca para os filtros informados não obteve retorno',
						  message: 'Verifique e tente novamente.'
					})
					
				}
				
			//} else {
				// SE NÃO
				
				// EXIBE ALERTA
				//Swal.fire({
				//	  icon: 'error',
				//	  title: 'Há filtros obrigatórios que não foram informados',
				//	  text: 'Verifique e tente novamente.'
				//})
				
			//}
			
		}
		
		// SE ABA EDIÇÃO ESTÁ ATIVA
		if($("#ABAED").hasClass("active")){
			
			console.log("Aba da edição está ativa. VOU EDITAR")
			
			var numPlano = $("#NUMPLANOED").val()
			var codFilial = $("#CODFILIALED").val()
			var os = $("#CODPRJPLANED").val()
			var material = $("#DSCMATERIALPLANED").val()
			//var codAtividade = $("#CODATIVIDADEPLANED").val()
			//var dscAtividade = $("#DSCCODATIVIDADEPLANED").val()
			var order = $("#ORDENARPORED").val()
			
			// SE PLANO DE CORTE JÁ FOI PROGRAMADO
			if(planoProgramado($("#NUMPLANOED").val())){

				$("#ALTERARED").hide()
				$("#EXCLUIRPLANO").hide()
				
			} else {
				// SE NÃO

				$("#ALTERARED").show()
				$("#EXCLUIRPLANO").show()
				
			}
			
			// SE CAMPOS OBRIGATÓRIOS FORAM INFORMADOS
			if(!((numPlano=="" || numPlano==null || numPlano==undefined) || (os=="" || os==null || os==undefined))){

				// LIMPA CONTEÚDO DA TABELA DE EDIÇÃO
				limpaTabelaEdicao()
				
				console.log("Vou buscar para numPlano: "+numPlano+", os: "+os+", material: "+material)
				
				// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
				var a1 = DatasetFactory.createConstraint("OS",os,os,ConstraintType.MUST)
				//var a2 = DatasetFactory.createConstraint("MATERIAL",material,material,ConstraintType.MUST)
				var a3 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
				var a4 = DatasetFactory.createConstraint("NUMPLANOCORTE",numPlano,numPlano,ConstraintType.MUST)
				//var a5 = DatasetFactory.createConstraint("DSCATIVIDADE",dscAtividade,dscAtividade,ConstraintType.MUST)
				
				var constraints
				
				// SE ORDER BY FOI PREENCHIDO
				if(!(order=="" || order==null || order==undefined)){
					
					console.log("order: "+order)
					
					var a6 = DatasetFactory.createConstraint("ORDER",order,order,ConstraintType.MUST)
					constraints = new Array(a1,a3,a4,a6)
					
				}else{
					// SE NÃO
					
					constraints = new Array(a1,a3,a4)
					
				}
				
				var dataset = DatasetFactory.getDataset("dsBuscaPlanoCorteEdicao",null,constraints,null)
				var row = dataset.values
				
				console.log("row")
				console.log(row)
				
				// SE RETORNO NÃO É VAZIO OU NULO
				if(!(row=="" || row==null || row==undefined)){
				
					var count = dataset.values.length
					
					// PERCORRE TODOS OS REGISTROS
					for(var i=0; i<count; i++){
						
						var rep = row[i]
						
						var seq = addPlanoCorteEdicao()
						
						$("#OSED___"+seq).val(rep["OS"])
						$("#NUMDESENHOED___"+seq).val(rep["NUMDESENHO"])
						$("#CODESTRUTURAED___"+seq).val(rep["CODESTRUTURA"])
						$("#EXECUCAOED___"+seq).val(rep["EXECUCAO"])
						$("#CODORDEMED___"+seq).val(rep["OP"])
						$("#ATIVIDADEED___"+seq).val(rep["DSCATIVIDADE"])
						$("#CODATIVIDADEED___"+seq).val(rep["CODATIVIDADE"])
						$("#IDATIVIDADEED___"+seq).val(rep["IDATVORDEM"])
						$("#POSICAOED___"+seq).val(rep["POSICAODESENHO"])
						$("#POSICAOED___"+seq).attr("title","Peso bruto: "+rep["PESOBRUTO"]+"\n Peso líquido: "+rep["PESOLIQUIDO"])
						$("#ITEMED___"+seq).val(rep["ITEM"])
						$("#MATERIALED___"+seq).val(rep["MATERIAL"])
						$("#QTDEPREVISTAED___"+seq).val(parseInt(rep["QTDEPLANEJADA"]).toFixed(0))
						$("#BITOLAED___"+seq).val(rep["BITOLA"])
						if(rep["NUMPLANOCORTE"]==numPlano){
							$("#QTDEPLANOED___"+seq).val(rep["QUANTIDADE"])
						}
						$("#QTDEPLANOEDORIGINAL___"+seq).val(rep["QUANTIDADE"])
						$("#USUARIOORIGINALED___"+seq).val(rep["RECCREATEDBY"])
						$("#DATAORIGINALED___"+seq).val(rep["RECCREATEDON"])

						$("#QTDATENDIDAORIGINALED___"+seq).val(rep["QTDATENDIDA"]=="null" ? "" : rep["QTDATENDIDA"])

						$("#LOGORIGINALED___"+seq).val(rep["LOGNECESSIDADE"]!="null" ? rep["LOGNECESSIDADE"] : "")

						$("#PAPCED___"+seq).val(rep["PAPC"])

						$("#CELDATANECESSIDADEED___"+seq).val(rep["DATANECESSIDADE"])
						$("#VALDATANECESSIDADEED___"+seq).val(formataDataBanco(rep["DATANECESSIDADE"]))
						//$("#COMPLEMENTOANTIGOED___"+seq).val(rep["COMPLEMENTO"])
						$("#CODCOLIGADAED___"+seq).val(rep["CODCOLIGADA"])
						$("#NUMPLANOCORTEED___"+seq).val(rep["NUMPLANOCORTE"])
						$("#CODFILIALEDS___"+seq).val(rep["CODFILIAL"])

						$("#QTDENECESSIDADEEDORIGINAL___"+seq).val(rep["QTDORIGINAL"])

						if(rep["SEMANAREPROGRAMACAO"]=="null"){

							$("#CELSEMANANECESSIDADEED___"+seq).val(rep["SEMANANECESSIDADE"])
							$("#CELSEMANAREPROGORIGINALED___"+seq).val("")

							$("#CELDATAREPROGRAMACAOED___"+seq).val("")
							$("#VALDATAREPROGRAMACAOED___"+seq).val("")

							$("#CELDATANECESSIDADEGERALED___"+seq).val(rep["DATANECESSIDADE"])

						}
						else{

							$("#CELSEMANAREPROGORIGINALED___"+seq).val(rep["SEMANAREPROGRAMACAO"])
							$("#CELSEMANANECESSIDADEED___"+seq).val(rep["SEMANAREPROGRAMACAO"])

							$("#CELDATAREPROGRAMACAOED___"+seq).val(rep["DATAREPROGRAMACAO"])
							$("#VALDATAREPROGRAMACAOED___"+seq).val(formataDataBanco(rep["DATAREPROGRAMACAO"]))

							$("#CELDATANECESSIDADEGERALED___"+seq).val(rep["DATAREPROGRAMACAO"])

						}

						$("#STATUSED___"+seq).val(rep["STATUSNECESSIDADE"])

						$("#LOGORIGINALED___"+seq).val(rep["LOGNECESSIDADE"])

						$("#CELDATANECESSIDADEED___"+seq).val(rep["DATANECESSIDADE"])
						$("#VALDATANECESSIDADEED___"+seq).val(formataDataBanco(rep["DATANECESSIDADE"]))

						$("#CELSEMANAORIGINALED___"+seq).val(rep["SEMANANECESSIDADE"])

						$("#COMPLEMENTOANTIGOED___"+seq).val(rep["COMPLEMENTO"].toLowerCase() == "null" ? "" : rep["COMPLEMENTO"])
						$("#CODCOLIGADAED___"+seq).val(rep["CODCOLIGADA"])

						var obs = rep["OBS"]
						if(obs != null && obs!=undefined && obs!="null" && obs!=""){
							$("#OBSERVACAOANTIGAED___"+seq).val(rep["OBS"])
						}
						else{
							$("#OBSERVACAOANTIGAED___"+seq).val("")
						}


						var prioridade = Number(rep["PRIORIDADE"])

						$("#VALPRIORIDADEORIGINALED___"+seq).val(prioridade)
						if(rep["PRIORIDADEREPROGRAMACAO"]!="null"){

							prioridade = Number(rep["PRIORIDADEREPROGRAMACAO"])
							$("#VALPRIORIDADEREPROGRAMACAOED___"+seq).val(prioridade)

						}else{
							$("#VALPRIORIDADEREPROGRAMACAOED___"+seq).val("")
						}

					
						switch (prioridade) {
							case 0:
								$("#CELPRIORIDADEED___"+seq).val("Baixa");
								break;
							case 1:
								$("#CELPRIORIDADEED___"+seq).val("Média");
								break;
							case 2:
								$("#CELPRIORIDADEED___"+seq).val("Alta");
								break;
						}


						$("#VALPRIORIDADEED___"+seq).val(prioridade)
						
						// SE ITEM JÁ TEM PLANO DE CORTE CADASTRADO
						if(!(rep["SALDO"]=="" || rep["SALDO"]=="null" || rep["SALDO"]==null || rep["SALDO"]==undefined)){
							
							$("#SALDOED___"+seq).val(parseInt(rep["SALDO"]).toFixed(0))
							$("#SALDOEDORIGINAL___"+seq).val(parseInt(rep["SALDO"]).toFixed(0))
							
						} else {
							
							$("#SALDOED___"+seq).val(parseInt(rep["QTDEPLANEJADA"]).toFixed(0))
							$("#SALDOEDORIGINAL___"+seq).val(parseInt(rep["QTDEPLANEJADA"]).toFixed(0))
							
							
						}
						
						// SE NÚMERO DO PLANO CORTE NÃO FOI VINCULADO
						if(rep["NUMPLANOCORTE"]==numPlano){
							
							// MARCA OS ITENS QUE JÁ FORAM INCLUÍDOS NO PLANO DE CORTE
							$("#INCLUIRED___"+seq).prop("checked",true)
							$("#LINHAED___"+seq).addClass("selecionado")
							$("#QTDEPLANOED___"+seq).prop("readonly",false)
							
						}
						else{

							if( view==1 ){

								$("#INCLUIRED___"+seq).prop("checked",false)
								$("#LINHAED___"+seq).css("display","none")
								$("#QTDEPLANOED___"+seq).prop("readonly",true)

							}

						}

						if($("#CELSEMANANECESSIDADEED___"+seq).val() == (retornaSemanaDoAno($("#DATAORIGINALED___"+seq).val().split(" ")[0]) +"/"+ $("#DATAORIGINALED___"+seq).val().split("-")[0])){

							colocaExtra(seq,2)

						}

						$("#NSEQPEDIDOED___"+seq).val(rep["NSEQPEDIDO"])
						
					}
					
					// VERIFICA SE VAI EXIBIR/ESCONDE TABELAS
					verificaTabelas()
					
					// SE TABELA DOS FILTROS PARA A TABELA DE EDIÇÃO NÃO FOI CRIADA
					if(!(temTabelaFiltrosEd())){
						
						// ADICIONA LINHA PARA O FILTRO DA TELA DE EDIÇÃO
						addFiltroEdicao()
						
					} else {
						// SE NÃO
						
						// LIMPA OS FILTROS
						limpaFiltrosEd()
						reconstroiFiltrosEd()

					}
					
					// CONSTRÓI FILTROS PARA A TABELA DE EDIÇÃO DO PLANO DE CORTE
					constroiFiltrosEd()

					//CALCULA QUANTIDADES BASEADO NO PREVISTO DA ORDEM PARA CALCULO DE MEDIA PONDERADA
					calculaQuantidadesED();
					
				}  else {
					
					// EXIBE ALERTA
					Swal.fire({
						  icon: 'error',
						  title: 'Busca para os filtros informados não obteve retorno',
						  message: 'Verifique e tente novamente.'
					})
					
				}
		
			} else {
				
				// EXIBE ALERTA
				Swal.fire({
					  icon: 'error',
					  title: 'Há filtros obrigatórios que não foram informados',
					  text: 'Verifique e tente novamente.'
				})
				
			}
			
		}
			
	},500)
		
	// DESATIVA O LOAD
	setTimeout(function(){
		
		myLoading2.hide();
		$("#ICONREDUZIR").click()
		
	},500)
	
}



function FiltraItens(obj) {

	$("#PLANOCORTE").find("tr[id^='LINHACAD___']").hide()

	$(obj).find(".bi").toggleClass('ativo')

	console.log(obj)

	var str = ""

	var i =0
	
	$("[alvo='GERAL']").find(".ativo").each(function(){

		i++;

		var alvo = $(this).attr("alvo")

		if(alvo!="TODOS"){

			str+= ( i >1 ? "," : "" ) + "tr."+$(this).attr("alvo")

		}
		else{

			str += ( i >1 ? "," : "" ) + "tr[id^='LINHACAD___']"

		}

	})

	if(i==0){

		$("#PLANOCORTE").find("tr[id^='LINHACAD___']").show()

	}
	else{

		$("#PLANOCORTE").find(str).show()

	}

	console.log(str)

	// if(op==1){

	// 	$("#PLANOCORTEED").find("tr.REPROGRAMADO").show()

	// }
	// else if(op==2){

	// 	$("#PLANOCORTEED").find("tr.CONCLUIDO").show()

	// }
	// else if(op==3){

	// 	$("#PLANOCORTEED").find("tr.PENDENCIA").show()

	// }
	// else if(op==4){

	// 	$("#PLANOCORTEED").find("tr.PARCIAL").show()

	// }
	// else if(op==5){

	// 	$("#PLANOCORTEED").find("tr[id^='LINHAED___']").show()

	// }

	// LIMPA OS FILTROS
	limpaFiltros()
	constroiFiltros()

	
}

// LIMPAR A TABELA DE PLANO DE CORTE DA ATIVIDADE
function limpaPlanoCorteAtv(){
	
	// LIMPA CONTEÚDO DA TABELA DE PLANO DE CORTE
	$("input[id^='NUMPLANOCORTEATV___']").each(function(){
	
		$(this).parents("tr").remove();
		
	})
	
}

// ADICIONA LINHA NA TABELA DE PLANO DE CORTE
function addModalPlanoCorte(){
	
	var row = wdkAddChild('PLANOCORTEATV')
	 
	return row
	
}

function MarcaPendencia(obj){

	var status = {REPROGRAMADO : '<span class="card-list-item card-list-item-icons REPROGRAMADO_ICON" title="Reprogramado"> '+
			' <i class="bi bi-calendar-plus-fill" style="color:#dbbd08"></i> '+
			' </span>',
		CONCLUIDO: '<span class="card-list-item card-list-item-icons CONCLUIDO_ICON" title="Concluído"> '+
		' <i class="bi bi-check-all"  style="color:#22bc00"></i> '+
		' </span>',
		PENDENCIA: '<span class="card-list-item card-list-item-icons PENDENCIA_ICON" title="Aguardando Pendencia"> '+
		' <i class="bi bi-exclamation-diamond-fill"  style="color:#b92113"></i> '+
		' </span>',
		PARCIAL: '<span class="card-list-item card-list-item-icons PARCIAL_ICON" title="Parcialmente Atendido"> '+
		' <i class="bi bi-check"  style="color:#0a8ce8"></i> '+
		' </span>',
		RETRABALHO: '<span class="card-list-item card-list-item-icons RETRABALHO_ICON" title="Retrabalho"> '+
		' <i class="bi bi-arrow-repeat"  style="color:#852f07"></i> '+
		' </span>',									
		}

	var seq = $(obj).parents('tr').first().attr("id").split("___")[1]

	var nseqpedido = $("#NSEQPEDIDOCAD___"+seq).val()
	var pendencia = $("#LINHACAD___"+seq).hasClass("PENDENCIA") ? 0 : 1;
	var log = $("#LOGORIGINALCAD___"+seq).val()

	var usuario2  = $("#USUARIOATUAL").val()
	var usuario2 = getUser(usuario2)

	if(pendencia == 0){

		log += " Desmarcado como pendêndia por "+ usuario2 +" no dia "+ new Date().toLocaleDateString()+";"
		
	}
	else{

		log += " Marcado como pendêndia por "+ usuario2 +" no dia "+ new Date().toLocaleDateString()+";"


	}

	// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
	var a1 = DatasetFactory.createConstraint("NSEQPEDIDO",nseqpedido,nseqpedido,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("PENDENCIA",pendencia,pendencia,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("LOGNECESSIDADE",log,log,ConstraintType.MUST)
	var a4 = DatasetFactory.createConstraint("USER",usuario2,usuario2,ConstraintType.MUST)

	var constraints = new Array(a1,a2,a3)
	
	var dataset = DatasetFactory.getDataset("dsAtualizaPendenciaNecessidade",null,constraints,null)

	if(pendencia==0){

		$("#STATUSICONCAD___"+seq).parent().find(".PENDENCIA_ICON").remove()
		$("#PENDENCIA").text( Number($("#PENDENCIA").text()) - 1)

		if(!$("#STATUSICONCAD___"+seq).parent().children().length > 1){

			$("#STATUSICONCAD___"+seq).parent().removeClass('icons-bag')

		}

		$("#STATUSICONCAD___"+seq).parents("tr").first().removeClass("PENDENCIA")

	}
	else{

		$("#STATUSICONCAD___"+seq).parent().append(status.PENDENCIA).fadeIn(1000)
		$("#STATUSICONCAD___"+seq).parent().addClass('icons-bag').fadeIn(1000)

		$("#PENDENCIA").text( Number($("#PENDENCIA").text()) + 1)

		$("#STATUSICONCAD___"+seq).parents("tr").first().addClass("PENDENCIA").fadeIn(1000)

	}


}

// CARREGA O PLANO DE CORTE DA ATIVIDADE
function carregaPlanoCorte(obj){
	
	console.log("vou carregar os planos de corte")
	
	var myLoading2 = FLUIGC.loading(window);
	
	myLoading2.show();
	
	// INICIA A OPERAÇÃO DEPOIS DE CARREGAR O LOAD
	setTimeout(function(){
		
		var seq = $(obj).attr("id").split("___")[1]
		
		var coligada = $("#CODCOLIGADACAD___"+seq).val()
		var codfilial = $("#CODFILIALCAD___"+seq).val()
		var codestrutura = $("#CODESTRUTURACAD___"+seq).val()
		var idAtividade = $("#IDATIVIDADECAD___"+seq).val()
		var codOrdem = $("#CODORDEMCAD___"+seq).val()
		
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


function colocaExtra(seq,op){

	if(op==1){

		$("#OSCAD___"+seq).addClass("extra")
		$("#NUMDESENHOCAD___"+seq).addClass("extra")
		$("#EXECUCAOCAD___"+seq).addClass("extra")
		$("#CODORDEMCAD___"+seq).addClass("extra")
		$("#PAPCCAD___"+seq).addClass("extra")
		$("#ATIVIDADECAD___"+seq).addClass("extra")
		$("#POSICAOCAD___"+seq).addClass("extra")
		$("#BITOLACAD___"+seq).addClass("extra")
		$("#QTDEPREVISTACAD___"+seq).addClass("extra")
		$("#SALDOCAD___"+seq).addClass("extra")
		$("#QTDEPLANOCAD___"+seq).addClass("extra")
		$("#CELDATANECESSIDADEGERALCAD___"+seq).addClass("extra")
		$("#CELSEMANANECESSIDADECAD___"+seq).addClass("extra")
		$("#ITEMCAD___"+seq).addClass("extra")
		$("#MATERIALCAD___"+seq).addClass("extra")
		$("#LOGCAD___"+seq).addClass("extra")
		$("#PLANOCORTEATVCAD___"+seq).addClass("extra")

	}
	else if(op==2){

		$("#OSED___"+seq).addClass("extra")
		$("#NUMDESENHOED___"+seq).addClass("extra")
		$("#EXECUCAOED___"+seq).addClass("extra")
		$("#CODORDEMED___"+seq).addClass("extra")
		$("#PAPCED___"+seq).addClass("extra")
		$("#ATIVIDADEED___"+seq).addClass("extra")
		$("#POSICAOED___"+seq).addClass("extra")
		$("#BITOLAED___"+seq).addClass("extra")
		$("#QTDEPREVISTAED___"+seq).addClass("extra")
		$("#SALDOED___"+seq).addClass("extra")
		$("#QTDEPLANOED___"+seq).addClass("extra")
		$("#CELDATANECESSIDADEGERALED___"+seq).addClass("extra")
		$("#CELDATANECESSIDADEED___"+seq).addClass("extra")
		$("#CELSEMANANECESSIDADEED___"+seq).addClass("extra")
		$("#ITEMED___"+seq).addClass("extra")
		$("#MATERIALED___"+seq).addClass("extra")
		$("#LOGED___"+seq).addClass("extra")

	}


}

// FUNÇÃO QUE DESABILITA TODOS OS CAMPOS QUANDO O PLANO JÁ ESTÁ PROGRAMADO E NÃO PODE SER ALTERADO
function desabilitaCamposEd(){

	$("#FILIALED").prop("disabled",true)
	//$("#PLANOCORTEED").prop("disabled",true)
	$("#PROJETOED").prop("disabled",true)
	$("#CODMPED").prop("disabled",true)
	$("#QTDEMPED").prop("disabled",true)
	$("#LOTEED").prop("disabled",true)
	$("#SALDODISPONIVELED").prop("disabled",true)
	$("#SUCATAED").prop("disabled",true)
	$("#QTDESUCATAPLANED").prop("disabled",true)
	$("#RETALHOED").prop("disabled",true)
	$("#QTDRETALHOED").prop("disabled",true)
	$("#INCLUIRED").prop("disabled",true)
	$("#QTDEPLANOED").prop("disabled",true)

}

// FUNÇÃO QUE HABILITA TODOS OS CAMPOS 
function habilitaCamposEd(){

	$("#FILIALED").prop("disabled",false)
	//$("#PLANOCORTEED").prop("disabled",false)
	$("#PROJETOED").prop("disabled",false)
	$("#CODMPED").prop("disabled",false)
	$("#QTDEMPED").prop("disabled",false)
	$("#LOTEED").prop("disabled",false)
	$("#SALDODISPONIVELED").prop("disabled",false)
	$("#SUCATAED").prop("disabled",false)
	$("#QTDESUCATAPLANED").prop("disabled",false)
	$("#RETALHOED").prop("disabled",false)
	$("#QTDRETALHOED").prop("disabled",false)
	$("#INCLUIRED").prop("disabled",false)
	$("#QTDEPLANOED").prop("disabled",false)

}

function calculaQuantidadesED(){

	$("input[id^='OSED___']").each(function(){

		var seq = $(this).attr("id").split("___")[1]
			
		console.log(seq)

		if($("#INCLUIRED___"+seq).is(":checked")){

			verificaMPCheckBox(this,"LINHAED")

		}

	})

	AtualizaPesoArt("ED");

}

// LIMPA OS FILTROS DA TABELA DE CADASTRO
function limpaFiltros(){
	
	$('#INFOOSCAD___1').children('option:not(:first)').remove();
	$('#INFONUMDESENHOCAD___1').children('option:not(:first)').remove();
	$('#INFOEXECUCAOCAD___1').children('option:not(:first)').remove();
	$('#INFOCODORDEMCAD___1').children('option:not(:first)').remove();
	$('#INFOPAPCCAD___1').children('option:not(:first)').remove();
	$('#INFOATIVIDADECAD___1').children('option:not(:first)').remove();
	$('#INFOPOSICAOCAD___1').children('option:not(:first)').remove();
	$('#INFOQTDEPREVISTACAD___1').children('option:not(:first)').remove();
	$('#INFOSALDOCAD___1').children('option:not(:first)').remove();
	$('#INFOQTDEPLANOCAD___1').children('option:not(:first)').remove();
	$('#INFOPRIORIDADECAD___1').children('option:not(:first)').remove();
	$('#INFODATANECESSIDADECAD___1').children('option:not(:first)').remove();
	$('#INFOITEMCAD___1').children('option:not(:first)').remove();
	$('#INFOMATERIALCAD___1').children('option:not(:first)').remove();
	$('#INFOBITOLACAD___1').children('option:not(:first)').remove();
	
	
}

// LIMPA OS FILTROS DA TABELA DE EDIÇÃO
function limpaFiltrosEd(){
	
	$('#INFOOSED___1').children('option:not(:first)').remove();
	$('#INFONUMDESENHOED___1').children('option:not(:first)').remove();
	$('#INFOEXECUCAOED___1').children('option:not(:first)').remove();
	$('#INFOCODORDEMED___1').children('option:not(:first)').remove();
	$('#INFOATIVIDADEED___1').children('option:not(:first)').remove();
	$('#INFOPOSICAOED___1').children('option:not(:first)').remove();
	$('#INFOQTDEPREVISTAED___1').children('option:not(:first)').remove();
	$('#INFOSALDOED___1').children('option:not(:first)').remove();
	$('#INFOQTDEPLANOED___1').children('option:not(:first)').remove();
	$('#INFOITEMED___1').children('option:not(:first)').remove();
	$('#INFOMATERIALED___1').children('option:not(:first)').remove();
	$('#INFOBITOLAED___1').children('option:not(:first)').remove();
	$('#INFOPRIORIDADEED___1').children('option:not(:first)').remove();
	$('#INFODATANECESSIDADEED___1').children('option:not(:first)').remove();
	$('#INFOPAPCED___1').children('option:not(:first)').remove();
	
}

// SE TABELA DOS FILTROS PARA A TABELA DE CADASTRO NÃO FOI CRIADA
function temTabelaFiltros(){
	
	var tem = false
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("select[id^='INFOOSCAD___']").each(function(){
		
		tem = true
		
	})
	
	return tem
	
}

// SE TABELA DOS FILTROS PARA A TABELA DE EDIÇÃO NÃO FOI CRIADA
function temTabelaFiltrosEd(){
	
	var tem = false
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("select[id^='INFOOSED___']").each(function(){
		
		tem = true
		
	})
	
	return tem
	
}

// CONSTRÓI FILTROS PARA A TABELA DO CADASTRO DO PLANO DE CORTE
function constroiFiltros(){

	console.log("entrei para construir filtros")
	
	var numOS = $("#NUM_OS").val()
	
	var osCad = $("#INFOOSCAD___1").val()
	var numDesenho = $("#INFONUMDESENHOCAD___1").val()
	var codOrdem = $("#INFOCODORDEMCAD___1").val()
	var execucao = $("#INFOEXECUCAOCAD___1").val()
	var atividadeCad = $("#INFOATIVIDADECAD___1").val()
	var posicaoCad = $("#INFOPOSICAOCAD___1").val()
	var qtdePrevista = $("#INFOQTDEPREVISTACAD___1").val()
	var saldo = $("#INFOSALDOCAD___1").val()
	var qtdePlano = $("#INFOQTDEPLANOCAD___1").val()
	var itemCad = $("#INFOITEMCAD___1").val()
	var materialCad = $("#INFOMATERIALCAD___1").val()
	var bitolaCad = $("#INFOBITOLACAD___1").val()
	var prioridade = $("#INFOPRIORIDADECAD___1").val()
	var datanecessidade = $("#INFODATANECESSIDADEED___1").val()
	
	console.log("numOS: "+numOS+", osCad: "+osCad+", numDesenho: "+numDesenho+", execucao: "+execucao+", codOrdem: "+codOrdem+", atividadeCad: "+atividadeCad+", posicaoCad: "+posicaoCad+
			", qtdePrevista: "+qtdePrevista+", saldo: "+saldo+", qtdePlano: "+qtdePlano+", itemCad: "+itemCad+", materialCad: "+materialCad+", bitolaCad: "+bitolaCad)

	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#INFOOSCAD___1").val()=="" || $("#INFOOSCAD___1").val()==null){
		
		constroiSelectOsCad()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#INFONUMDESENHOCAD___1").val()=="" || $("#INFONUMDESENHOCAD___1").val()==null){
		
		constroiSelectNumDesenhoCad()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#INFOCODORDEMCAD___1").val()=="" || $("#INFOCODORDEMCAD___1").val()==null){
		
		constroiSelectCodOrdemCad()
		
	}

	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#INFOPAPCCAD___1").val()=="" || $("#INFOPAPCCAD___1").val()==null){

		constroiSelectPAPCCad()
		
	}
	
	// SE FILTRO EXECUÇÃO ESTÁ PREENCHIDO
	if($("#INFOEXECUCAOCAD___1").val()=="" || $("#INFOEXECUCAOCAD___1").val()==null){
		
		constroiSelectExecucaoCad()
		
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#INFOATIVIDADECAD___1").val()=="" || $("#INFOATIVIDADECAD___1").val()==null){
	
		constroiSelectAtividadeCad()
		
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#INFOPOSICAOCAD___1").val()=="" || $("#INFOPOSICAOCAD___1").val()==null){
	
		constroiSelectPosicaoCad()
		
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#INFOQTDEPREVISTACAD___1").val()=="" || $("#INFOQTDEPREVISTACAD___1").val()==null){
	
		constroiSelectQtdePrevistaCad()
		
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#INFOSALDOCAD___1").val()=="" || $("#INFOSALDOCAD___1").val()==null){
	
		constroiSelectSaldoCad()
		
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#INFOQTDEPLANOCAD___1").val()=="" || $("#INFOQTDEPLANOCAD___1").val()==null){
	
		constroiSelectQtdePlanoCad()
	
	}

	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#INFOPRIORIDADECAD___1").val()=="" || $("#INFOPRIORIDADECAD___1").val()==null){

		constroiSelectPrioridadeCad()
	
	}

	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#INFODATANECESSIDADECAD___1").val()=="" || $("#INFODATANECESSIDADECAD___1").val()==null){

		constroiSelectNecessidadeCad()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#INFOITEMCAD___1").val()=="" || $("#INFOITEMCAD___1").val()==null){
	
		constroiSelectItemCad()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#INFOMATERIALCAD___1").val()==""  || $("#INFOMATERIALCAD___1").val()==null){
	
		constroiSelectMaterialCad()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#INFOBITOLACAD___1").val()=="" || $("#INFOBITOLACAD___1").val()==null){
	
		constroiSelectBitolaCad()
	
	}
	
	console.log("terminei de construir filtros")
	
}

// CONSTRÓI FILTROS PARA A TABELA DO CADASTRO DO PLANO DE CORTE
function constroiFiltrosEd(){

	console.log("entrei para construir filtros")
	
	var numOS = $("#NUM_OS").val()
	
	var osCad = $("#INFOOSED___1").val()
	var numDesenho = $("#INFONUMDESENHOED___1").val()
	var execucao = $("#INFOEXECUCAOED___1").val()
	var codOrdem = $("#INFOCODORDEMED___1").val()
	var atividadeCad = $("#INFOATIVIDADEED___1").val()
	var posicaoCad = $("#INFOPOSICAOED___1").val()
	var qtdePrevista = $("#INFOQTDEPREVISTAED___1").val()
	var saldo = $("#INFOSALDOED___1").val()
	var qtdePlano = $("#INFOQTDEPLANOED___1").val()
	var itemCad = $("#INFOITEMED___1").val()
	var materialCad = $("#INFOMATERIALED___1").val()
	var bitolaCad = $("#INFOBITOLAED___1").val()
	
	console.log("numOS: "+numOS+", osCad: "+osCad+", numDesenho: "+numDesenho+", execucao: "+execucao+", codOrdem: "+codOrdem+", atividadeCad: "+atividadeCad+", posicaoCad: "+posicaoCad+
			", qtdePrevista: "+qtdePrevista+", saldo: "+saldo+", qtdePlano: "+qtdePlano+", itemCad: "+itemCad+", materialCad: "+materialCad+", bitolaCad: "+bitolaCad)

	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#INFOOSED___1").val()=="" || $("#INFOOSED___1").val()==null){
		
		constroiSelectOsEd()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#INFONUMDESENHOED___1").val()=="" || $("#INFONUMDESENHOED___1").val()==null){
		
		constroiSelectNumDesenhoEd()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#INFOEXECUCAOED___1").val()=="" || $("#INFOEXECUCAOED___1").val()==null){
		
		constroiSelectExecucaoEd()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#INFOCODORDEMED___1").val()=="" || $("#INFOCODORDEMED___1").val()==null){
		
		constroiSelectCodOrdemEd()
		
	}

	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#INFOPAPCED___1").val()=="" || $("#INFOPAPCED___1").val()==null){

		constroiSelectPAPCEd()
		
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#INFOATIVIDADEED___1").val()=="" || $("#INFOATIVIDADEED___1").val()==null){
	
		constroiSelectAtividadeEd()
		
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#INFOPOSICAOED___1").val()=="" || $("#INFOPOSICAOED___1").val()==null){
	
		constroiSelectPosicaoEd()
		
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#INFOQTDEPREVISTAED___1").val()=="" || $("#INFOQTDEPREVISTAED___1").val()==null){
	
		constroiSelectQtdePrevistaEd()
		
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#INFOSALDOED___1").val()=="" || $("#INFOSALDOED___1").val()==null){
	
		constroiSelectSaldoEd()
		
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#INFOQTDEPLANOED___1").val()=="" || $("#INFOQTDEPLANOED___1").val()==null){
	
		constroiSelectQtdePlanoEd()
	
	}

	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#INFOPRIORIDADEED___1").val()=="" || $("#INFOPRIORIDADEED___1").val()==null){

		constroiSelectPrioridadeEd()
	
	}

	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#INFODATANECESSIDADEED___1").val()=="" || $("#INFODATANECESSIDADEED___1").val()==null){

		constroiSelectNecessidadeEd()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#INFOITEMED___1").val()=="" || $("#INFOITEMED___1").val()==null){
	
		constroiSelectItemEd()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#INFOMATERIALED___1").val()==""  || $("#INFOMATERIALED___1").val()==null){
	
		constroiSelectMaterialEd()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if($("#INFOBITOLAED___1").val()=="" || $("#INFOBITOLAED___1").val()==null){
	
		constroiSelectBitolaEd()
	
	}
	
	console.log("terminei de construir filtros")
	
}

function constroiSelectPAPCCad(){

	console.log("vou construir select codOrdem")
	var arrayCodOrdem = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='PAPCCAD___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var codOrdem = $("#PAPCCAD___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHACAD___"+seq).hasClass("invisivel"))){
		
			// SE NUMDESENHO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayCodOrdem.includes(codOrdem)) && !(codOrdem=="")){
				
				arrayCodOrdem.push(codOrdem)
				
			}
			
		}
		
	})
	
	arrayCodOrdem = arrayCodOrdem.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayCodOrdem.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOPAPCCAD___1').append($("<option class='info'></option>").attr("value", arrayCodOrdem[i]).text(arrayCodOrdem[i]));
		
	}

}

function constroiSelectPAPCEd(){

	console.log("vou construir select codOrdem")
	var arrayCodOrdem = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='PAPCED___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var codOrdem = $("#PAPCED___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHAED___"+seq).hasClass("invisivel"))){
		
			// SE NUMDESENHO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayCodOrdem.includes(codOrdem)) && !(codOrdem=="")){
				
				arrayCodOrdem.push(codOrdem)
				
			}
			
		}
		
	})
	
	arrayCodOrdem = arrayCodOrdem.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayCodOrdem.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOPAPCED___1').append($("<option class='info'></option>").attr("value", arrayCodOrdem[i]).text(arrayCodOrdem[i]));
		
	}

}

// CONSTRÓI SELECT DA OS
function constroiSelectOsCad(){
	
	console.log("vou construir select da OS")
	var arrayOs = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSCAD___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var osCad = $("#OSCAD___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHACAD___"+seq).hasClass("invisivel"))){
		
			// SE NUMDESENHO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayOs.includes(osCad)) && !(osCad=="")){
				
				arrayOs.push(osCad)
				
			}
			
		}
		
	})
	
	arrayOs = arrayOs.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayOs.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOOSCAD___1').append($("<option class='info'></option>").attr("value", arrayOs[i]).text(arrayOs[i]));
		
	}
	
}

// CONSTRÓI SELECT DA OS
function constroiSelectOsEd(){
	
	console.log("vou construir select da OS")
	var arrayOs = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSED___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var osCad = $("#OSED___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHAED___"+seq).hasClass("invisivel"))){
		
			// SE NUMDESENHO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayOs.includes(osCad)) && !(osCad=="")){
				
				arrayOs.push(osCad)
				
			}
			
		}
		
	})
	
	arrayOs = arrayOs.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayOs.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOOSED___1').append($("<option class='info'></option>").attr("value", arrayOs[i]).text(arrayOs[i]));
		
	}
	
}

// CONSTRÓI SELECT DO NUMDESENHO
function constroiSelectNumDesenhoCad(){
	
	console.log("vou construir select numDesenho")
	var arrayNumDesenho = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHOCAD___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var numDesenho = $("#NUMDESENHOCAD___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHACAD___"+seq).hasClass("invisivel"))){
		
			// SE NUMDESENHO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayNumDesenho.includes(numDesenho)) && !(numDesenho=="")){
				
				arrayNumDesenho.push(numDesenho)
				
			}
			
		}
		
	})
	
	arrayNumDesenho = arrayNumDesenho.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayNumDesenho.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFONUMDESENHOCAD___1').append($("<option class='info'></option>").attr("value", arrayNumDesenho[i]).text(arrayNumDesenho[i]));
		
	}
	
}

// CONSTRÓI SELECT DO NUMDESENHO
function constroiSelectNumDesenhoEd(){
	
	console.log("vou construir select numDesenho")
	var arrayNumDesenho = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='NUMDESENHOED___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var numDesenho = $("#NUMDESENHOED___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHAED___"+seq).hasClass("invisivel"))){
		
			// SE NUMDESENHO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayNumDesenho.includes(numDesenho)) && !(numDesenho=="")){
				
				arrayNumDesenho.push(numDesenho)
				
			}
			
		}
		
	})
	
	arrayNumDesenho = arrayNumDesenho.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayNumDesenho.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFONUMDESENHOED___1').append($("<option class='info'></option>").attr("value", arrayNumDesenho[i]).text(arrayNumDesenho[i]));
		
	}
	
}



// CONSTRÓI SELECT DO NUMDESENHO
function constroiSelectExecucaoEd(){
	
	console.log("vou construir select execucao")
	var arrayExecucao = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='EXECUCAOED___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var execucao = $("#EXECUCAOED___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHAED___"+seq).hasClass("invisivel"))){
		
			// SE NUMDESENHO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayExecucao.includes(execucao)) && !(execucao=="")){
				
				arrayExecucao.push(execucao)
				
			}
			
		}
		
	})
	
	// COMPARA NÚMEROS
	/*var compara = function comparaNumeros(a,b){ 
		
		if (a == b) return 0 
		
		if (a < b) return -1 
		
		if (a > b) return 1
		
	}*/
	
	arrayExecucao = arrayExecucao.sort(function(a,b){
    
	    if(parseInt(a) > parseInt(b)) return 1
	    
	    if(parseInt(a) < parseInt(b))  return -1
	    
	    return 0
	    
	})
	
	//arrayExecucao = arrayExecucao.sort()
	
	//arrayExecucao = arrayExecucao.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayExecucao.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOEXECUCAOED___1').append($("<option class='info'></option>").attr("value", arrayExecucao[i]).text(arrayExecucao[i]));
		
	}
	
}

// CONSTRÓI SELECT DO EXECUCAO
function constroiSelectExecucaoCad(){
	
	console.log("vou construir select execucao")
	var arrayExecucao = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='CODORDEMCAD___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var execucao = $("#EXECUCAOCAD___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHACAD___"+seq).hasClass("invisivel"))){
		
			// SE NUMDESENHO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayExecucao.includes(execucao)) && !(execucao=="")){
				
				arrayExecucao.push(execucao)
				
			}
			
		}
		
	})
	
	arrayExecucao = arrayExecucao.sort(function(a,b){
    
	    if(parseInt(a) > parseInt(b)) return 1
	    
	    if(parseInt(a) < parseInt(b))  return -1
	    
	    return 0
	    
	})
	
	//arrayExecucao = arrayExecucao.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayExecucao.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOEXECUCAOCAD___1').append($("<option class='info'></option>").attr("value", arrayExecucao[i]).text(arrayExecucao[i]));
		
	}
	
}

// CONSTRÓI SELECT DO COD ORDEM
function constroiSelectCodOrdemCad(){
	
	console.log("vou construir select codOrdem")
	var arrayCodOrdem = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='CODORDEMCAD___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var codOrdem = $("#CODORDEMCAD___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHACAD___"+seq).hasClass("invisivel"))){
		
			// SE NUMDESENHO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayCodOrdem.includes(codOrdem)) && !(codOrdem=="")){
				
				arrayCodOrdem.push(codOrdem)
				
			}
			
		}
		
	})
	
	arrayCodOrdem = arrayCodOrdem.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayCodOrdem.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOCODORDEMCAD___1').append($("<option class='info'></option>").attr("value", arrayCodOrdem[i]).text(arrayCodOrdem[i]));
		
	}
	
}

// CONSTRÓI SELECT DO COD ORDEM
function constroiSelectCodOrdemEd(){
	
	console.log("vou construir select codOrdem")
	var arrayCodOrdem = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='CODORDEMED___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var codOrdem = $("#CODORDEMED___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHAED___"+seq).hasClass("invisivel"))){
		
			// SE NUMDESENHO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayCodOrdem.includes(codOrdem)) && !(codOrdem=="")){
				
				arrayCodOrdem.push(codOrdem)
				
			}
			
		}
		
	})
	
	arrayCodOrdem = arrayCodOrdem.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayCodOrdem.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOCODORDEMED___1').append($("<option class='info'></option>").attr("value", arrayCodOrdem[i]).text(arrayCodOrdem[i]));
		
	}
	
}

// CONSTRÓI SELECT DA ATIVIDADE
function constroiSelectAtividadeCad(){
	
	console.log("vou construir select atividade")
	var arrayAtividade = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='ATIVIDADECAD___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var atividade = $("#ATIVIDADECAD___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHACAD___"+seq).hasClass("invisivel"))){
		
			// SE NUMDESENHO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayAtividade.includes(atividade)) && !(atividade=="")){
				
				arrayAtividade.push(atividade)
				
			}
			
		}
		
	})
	
	arrayAtividade = arrayAtividade.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayAtividade.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOATIVIDADECAD___1').append($("<option class='info'></option>").attr("value", arrayAtividade[i]).text(arrayAtividade[i]));
		
	}
	
}

// CONSTRÓI SELECT DA ATIVIDADE
function constroiSelectAtividadeEd(){
	
	console.log("vou construir select atividade")
	var arrayAtividade = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='ATIVIDADEED___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var atividade = $("#ATIVIDADEED___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHAED___"+seq).hasClass("invisivel"))){
		
			// SE NUMDESENHO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayAtividade.includes(atividade)) && !(atividade=="")){
				
				arrayAtividade.push(atividade)
				
			}
			
		}
		
	})
	
	arrayAtividade = arrayAtividade.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayAtividade.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOATIVIDADEED___1').append($("<option class='info'></option>").attr("value", arrayAtividade[i]).text(arrayAtividade[i]));
		
	}
	
}

// CONSTRÓI SELECT DA POSIÇÃO
function constroiSelectPosicaoCad(){
	
	console.log("vou construir select posição")
	var arrayPosicao = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='POSICAOCAD___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var posicao = $("#POSICAOCAD___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHACAD___"+seq).hasClass("invisivel"))){
		
			// SE NUMDESENHO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayPosicao.includes(posicao)) && !(posicao=="")){
				
				arrayPosicao.push(posicao)
				
			}
			
		}
		
	})
	
	arrayPosicao = arrayPosicao.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayPosicao.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOPOSICAOCAD___1').append($("<option class='info'></option>").attr("value", arrayPosicao[i]).text(arrayPosicao[i]));
		
	}
	
}

// CONSTRÓI SELECT DA POSIÇÃO
function constroiSelectPosicaoEd(){
	
	console.log("vou construir select posição")
	var arrayPosicao = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='POSICAOED___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var posicao = $("#POSICAOED___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHAED___"+seq).hasClass("invisivel"))){
		
			// SE NUMDESENHO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayPosicao.includes(posicao)) && !(posicao=="")){
				
				arrayPosicao.push(posicao)
				
			}
			
		}
		
	})
	
	arrayPosicao = arrayPosicao.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayPosicao.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOPOSICAOED___1').append($("<option class='info'></option>").attr("value", arrayPosicao[i]).text(arrayPosicao[i]));
		
	}
	
}

// CONSTRÓI SELECT DA QTDE PREVISTA
function constroiSelectQtdePrevistaCad(){
	
	console.log("vou construir select qtde prevista")
	var arrayQtdePrevista = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='QTDEPREVISTACAD___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var qtdePrevista = $("#QTDEPREVISTACAD___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHACAD___"+seq).hasClass("invisivel"))){
		
			// SE NUMDESENHO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayQtdePrevista.includes(qtdePrevista)) && !(qtdePrevista=="")){
				
				arrayQtdePrevista.push(qtdePrevista)
				
			}
			
		}
		
	})
	
	arrayQtdePrevista = arrayQtdePrevista.sort(function(a,b){
    
	    if(parseInt(a) > parseInt(b)) return 1
	    
	    if(parseInt(a) < parseInt(b))  return -1
	    
	    return 0
	    
	})
	
	//arrayQtdePrevista = arrayQtdePrevista.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayQtdePrevista.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOQTDEPREVISTACAD___1').append($("<option class='info'></option>").attr("value", arrayQtdePrevista[i]).text(arrayQtdePrevista[i]));
		
	}
	
}

// CONSTRÓI SELECT DA QTDE PREVISTA
function constroiSelectQtdePrevistaEd(){
	
	console.log("vou construir select qtde prevista")
	var arrayQtdePrevista = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='QTDEPREVISTAED___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var qtdePrevista = $("#QTDEPREVISTAED___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHAED___"+seq).hasClass("invisivel"))){
		
			// SE NUMDESENHO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayQtdePrevista.includes(qtdePrevista)) && !(qtdePrevista=="")){
				
				arrayQtdePrevista.push(qtdePrevista)
				
			}
			
		}
		
	})
	
	arrayQtdePrevista = arrayQtdePrevista.sort(function(a,b){
    
	    if(parseInt(a) > parseInt(b)) return 1
	    
	    if(parseInt(a) < parseInt(b))  return -1
	    
	    return 0
	    
	})
	
	//arrayQtdePrevista = arrayQtdePrevista.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayQtdePrevista.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOQTDEPREVISTAED___1').append($("<option class='info'></option>").attr("value", arrayQtdePrevista[i]).text(arrayQtdePrevista[i]));
		
	}
	
}

// CONSTRÓI SELECT DO SALDO
function constroiSelectSaldoCad(){
	
	console.log("vou construir select saldo")
	var arraySaldo = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='SALDOCAD___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var saldo = $("#SALDOCAD___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHACAD___"+seq).hasClass("invisivel"))){
		
			// SE NUMDESENHO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arraySaldo.includes(saldo)) && !(saldo=="")){
				
				arraySaldo.push(saldo)
				
			}
			
		}
		
	})
	
	arraySaldo = arraySaldo.sort(function(a,b){
    
	    if(parseInt(a) > parseInt(b)) return 1
	    
	    if(parseInt(a) < parseInt(b))  return -1
	    
	    return 0
	    
	})
	
	//arraySaldo = arraySaldo.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arraySaldo.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOSALDOCAD___1').append($("<option class='info'></option>").attr("value", arraySaldo[i]).text(arraySaldo[i]));
		
	}
	
}

// CONSTRÓI SELECT DO SALDO
function constroiSelectSaldoEd(){
	
	console.log("vou construir select saldo")
	var arraySaldo = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='SALDOED___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var saldo = $("#SALDOED___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHAED___"+seq).hasClass("invisivel"))){
		
			// SE NUMDESENHO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arraySaldo.includes(saldo)) && !(saldo=="")){
				
				arraySaldo.push(saldo)
				
			}
			
		}
		
	})
	
	arraySaldo = arraySaldo.sort(function(a,b){
    
	    if(parseInt(a) > parseInt(b)) return 1
	    
	    if(parseInt(a) < parseInt(b))  return -1
	    
	    return 0
	    
	})
	
	//arraySaldo = arraySaldo.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arraySaldo.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOSALDOED___1').append($("<option class='info'></option>").attr("value", arraySaldo[i]).text(arraySaldo[i]));
		
	}
	
}

// CONSTRÓI SELECT DO QTDE PLANO
function constroiSelectQtdePlanoCad(){
	
	console.log("vou construir select qtde plano")
	var arrayQtdePlano = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='QTDEPLANOCAD___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var qtdePlano = $("#QTDEPLANOCAD___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHACAD___"+seq).hasClass("invisivel"))){
		
			// SE NUMDESENHO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayQtdePlano.includes(qtdePlano)) && !(qtdePlano=="")){
				
				arrayQtdePlano.push(qtdePlano)
				
			}
			
		}
		
	})
	
	arrayQtdePlano = arrayQtdePlano.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayQtdePlano.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOQTDEPLANOCAD___1').append($("<option class='info'></option>").attr("value", arrayQtdePlano[i]).text(arrayQtdePlano[i]));
		
	}
	
}

// CONSTRÓI SELECT DO ITEM
function constroiSelectPrioridadeCad(){
	
	console.log("vou construir select item")
	var arrayItem = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='CELDATANECESSIDADEGERALCAD___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var item = $("#CELDATANECESSIDADEGERALCAD___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHACAD___"+seq).hasClass("invisivel"))){
		
			// SE NUMDESENHO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayItem.includes(item)) && !(item=="")){
				
				arrayItem.push(item)
				
			}
			
		}
		
	})
	
	arrayItem = arrayItem.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayItem.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOPRIORIDADECAD___1').append($("<option class='info'></option>").attr("value", arrayItem[i]).text(arrayItem[i]));
		
	}
	
}

// CONSTRÓI SELECT DO ITEM
function constroiSelectPrioridadeEd(){
	
	console.log("vou construir select item")
	var arrayItem = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='CELDATANECESSIDADEGERALED___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var item = $("#CELDATANECESSIDADEGERALED___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHAED___"+seq).hasClass("invisivel"))){
		
			// SE NUMDESENHO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayItem.includes(item)) && !(item=="")){
				
				arrayItem.push(item)
				
			}
			
		}
		
	})
	
	arrayItem = arrayItem.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayItem.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOPRIORIDADEED___1').append($("<option class='info'></option>").attr("value", arrayItem[i]).text(arrayItem[i]));
		
	}
	
}

// CONSTRÓI SELECT DO ITEM
function constroiSelectNecessidadeCad(){
	
	console.log("vou construir select item")
	var arrayItem = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='CELSEMANANECESSIDADECAD___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var item = $("#CELSEMANANECESSIDADECAD___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHACAD___"+seq).hasClass("invisivel"))){
		
			// SE NUMDESENHO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayItem.includes(item)) && !(item=="")){
				
				arrayItem.push(item)
				
			}
			
		}
		
	})
	
	arrayItem = arrayItem.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayItem.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFODATANECESSIDADECAD___1').append($("<option class='info'></option>").attr("value", arrayItem[i]).text(arrayItem[i]));
		
	}
	
}

// CONSTRÓI SELECT DO ITEM
function constroiSelectNecessidadeEd(){
	
	console.log("vou construir select item")
	var arrayItem = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='CELSEMANANECESSIDADEED___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var item = $("#CELSEMANANECESSIDADEED___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHAED___"+seq).hasClass("invisivel"))){
		
			// SE NUMDESENHO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayItem.includes(item)) && !(item=="")){
				
				arrayItem.push(item)
				
			}
			
		}
		
	})
	
	arrayItem = arrayItem.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayItem.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFODATANECESSIDADEED___1').append($("<option class='info'></option>").attr("value", arrayItem[i]).text(arrayItem[i]));
		
	}
	
}

// CONSTRÓI SELECT DO QTDE PLANO
function constroiSelectQtdePlanoEd(){
	
	console.log("vou construir select qtde plano")
	var arrayQtdePlano = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='QTDEPLANOED___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var qtdePlano = $("#QTDEPLANOED___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHAED___"+seq).hasClass("invisivel"))){
		
			// SE NUMDESENHO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayQtdePlano.includes(qtdePlano)) && !(qtdePlano=="")){
				
				arrayQtdePlano.push(qtdePlano)
				
			}
			
		}
		
	})
	
	arrayQtdePlano = arrayQtdePlano.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayQtdePlano.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOQTDEPLANOED___1').append($("<option class='info'></option>").attr("value", arrayQtdePlano[i]).text(arrayQtdePlano[i]));
		
	}
	
}

// CONSTRÓI SELECT DO ITEM
function constroiSelectItemCad(){
	
	console.log("vou construir select item")
	var arrayItem = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='ITEMCAD___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var item = $("#ITEMCAD___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHACAD___"+seq).hasClass("invisivel"))){
		
			// SE NUMDESENHO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayItem.includes(item)) && !(item=="")){
				
				arrayItem.push(item)
				
			}
			
		}
		
	})
	
	arrayItem = arrayItem.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayItem.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOITEMCAD___1').append($("<option class='info'></option>").attr("value", arrayItem[i]).text(arrayItem[i]));
		
	}
	
}

// CONSTRÓI SELECT DO ITEM
function constroiSelectItemEd(){
	
	console.log("vou construir select item")
	var arrayItem = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='ITEMED___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var item = $("#ITEMED___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHAED___"+seq).hasClass("invisivel"))){
		
			// SE NUMDESENHO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayItem.includes(item)) && !(item=="")){
				
				arrayItem.push(item)
				
			}
			
		}
		
	})
	
	arrayItem = arrayItem.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayItem.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOITEMED___1').append($("<option class='info'></option>").attr("value", arrayItem[i]).text(arrayItem[i]));
		
	}
	
}

// CONSTRÓI SELECT DO MATERIAL
function constroiSelectMaterialCad(){
	
	console.log("vou construir select material")
	var arrayMaterial = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='MATERIALCAD___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var material = $("#MATERIALCAD___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHACAD___"+seq).hasClass("invisivel"))){
		
			// SE NUMDESENHO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayMaterial.includes(material)) && !(material=="")){
				
				arrayMaterial.push(material)
				
			}
			
		}
		
	})
	
	arrayMaterial = arrayMaterial.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayMaterial.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOMATERIALCAD___1').append($("<option class='info'></option>").attr("value", arrayMaterial[i]).text(arrayMaterial[i]));
		
	}
	
}

// CONSTRÓI SELECT DO MATERIAL
function constroiSelectMaterialEd(){
	
	console.log("vou construir select material")
	var arrayMaterial = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='MATERIALED___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var material = $("#MATERIALED___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHAED___"+seq).hasClass("invisivel"))){
		
			// SE NUMDESENHO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayMaterial.includes(material)) && !(material=="")){
				
				arrayMaterial.push(material)
				
			}
			
		}
		
	})
	
	arrayMaterial = arrayMaterial.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayMaterial.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOMATERIALED___1').append($("<option class='info'></option>").attr("value", arrayMaterial[i]).text(arrayMaterial[i]));
		
	}
	
}

// CONSTRÓI SELECT DA BITOLA
function constroiSelectBitolaCad(){
	
	console.log("vou construir select bitola")
	var arrayBitola = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='BITOLACAD___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var bitola = $("#BITOLACAD___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHACAD___"+seq).hasClass("invisivel"))){
		
			// SE NUMDESENHO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayBitola.includes(bitola)) && !(bitola=="")){
				
				arrayBitola.push(bitola)
				
			}
			
		}
		
	})
	
	arrayBitola = arrayBitola.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayBitola.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOBITOLACAD___1').append($("<option class='info'></option>").attr("value", arrayBitola[i]).text(arrayBitola[i]));
		
	}
	
}

// CONSTRÓI SELECT DA BITOLA
function constroiSelectBitolaEd(){
	
	console.log("vou construir select bitola")
	var arrayBitola = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='BITOLAED___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var bitola = $("#BITOLAED___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHAED___"+seq).hasClass("invisivel"))){
		
			// SE NUMDESENHO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayBitola.includes(bitola)) && !(bitola=="")){
				
				arrayBitola.push(bitola)
				
			}
			
		}
		
	})
	
	arrayBitola = arrayBitola.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayBitola.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOBITOLAED___1').append($("<option class='info'></option>").attr("value", arrayBitola[i]).text(arrayBitola[i]));
		
	}
	
}

// RECONSTRÓI TODOS OS FILTROS
function reconstroiFiltros(){
		
	var myLoading2 = FLUIGC.loading(window);
	
	myLoading2.show();
	
	// TIMEOUT PARA EXECUÇÃO DA FUNÇÃO
	setTimeout(function (){
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOOSCAD___1").val()=="" || $("#INFOOSCAD___1").val()==null){
			
			console.log("filtro OSCAD está vazio")
			
			$('#INFOOSCAD___1').children('option:not(:first)').remove();
			$("#INFOOSCAD___1").css("border-color","#d1d3d4")
			$("#INFOOSCAD___1").css("background-color","#fff")
			
		} else {
			
			console.log("filtro OSCAD não está vazio")
			
			$("#INFOOSCAD___1").css("border-color","#b92113")
			$("#INFOOSCAD___1").css("background-color","#f2dede")
			
		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFONUMDESENHOCAD___1").val()=="" || $("#INFONUMDESENHOCAD___1").val()==null){
			
			console.log("filtro NUMDESENHO está vazio")
			
			$('#INFONUMDESENHOCAD___1').children('option:not(:first)').remove();
			$("#INFONUMDESENHOCAD___1").css("border-color","#d1d3d4")
			$("#INFONUMDESENHOCAD___1").css("background-color","#fff")

		} else {
			
			console.log("filtro NUMDESENHO não está vazio")
			
			$("#INFONUMDESENHOCAD___1").css("border-color","#b92113")
			$("#INFONUMDESENHOCAD___1").css("background-color","#f2dede")
			
		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOEXECUCAOCAD___1").val()=="" || $("#INFOEXECUCAOCAD___1").val()==null){
			
			console.log("filtro EXECUCAO está vazio")
			
			$('#INFOEXECUCAOCAD___1').children('option:not(:first)').remove();
			$("#INFOEXECUCAOCAD___1").css("border-color","#d1d3d4")
			$("#INFOEXECUCAOCAD___1").css("background-color","#fff")
			
		} else {
			
			console.log("filtro EXECUCAO não está vazio")
			
			$("#INFOEXECUCAOCAD___1").css("border-color","#b92113")
			$("#INFOEXECUCAOCAD___1").css("background-color","#f2dede")

		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOCODORDEMCAD___1").val()=="" || $("#INFOCODORDEMCAD___1").val()==null){
			
			console.log("filtro CODORDEM está vazio")
			
			$('#INFOCODORDEMCAD___1').children('option:not(:first)').remove();
			$("#INFOCODORDEMCAD___1").css("border-color","#d1d3d4")
			$("#INFOCODORDEMCAD___1").css("background-color","#fff")
			
		} else {
			
			console.log("filtro CODORDEM não está vazio")
			
			$("#INFOCODORDEMCAD___1").css("border-color","#b92113")
			$("#INFOCODORDEMCAD___1").css("background-color","#f2dede")

		}

		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOPAPCCAD___1").val()=="" || $("#INFOPAPCCAD___1").val()==null){
	
			console.log("filtro PAPC está vazio")
			
			$('#INFOPAPCCAD___1').children('option:not(:first)').remove();
			$("#INFOPAPCCAD___1").css("border-color","#d1d3d4")
			$("#INFOPAPCCAD___1").css("background-color","#fff")
			
		} else {
			
			console.log("filtro PAPC não está vazio")
			
			$("#INFOPAPCCAD___1").css("border-color","#b92113")
			$("#INFOPAPCCAD___1").css("background-color","#f2dede")

		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOATIVIDADECAD___1").val()=="" || $("#INFOATIVIDADECAD___1").val()==null){
			
			console.log("filtro ATIVIDADE está vazio")
			
			$('#INFOATIVIDADECAD___1').children('option:not(:first)').remove();
			$("#INFOATIVIDADECAD___1").css("border-color","#d1d3d4")
			$("#INFOATIVIDADECAD___1").css("background-color","#fff")
			
		} else {
			
			console.log("filtro ATIVIDADE não está vazio")
			
			$("#INFOATIVIDADECAD___1").css("border-color","#b92113")
			$("#INFOATIVIDADECAD___1").css("background-color","#f2dede")
			
		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOPOSICAOCAD___1").val()=="" || $("#INFOPOSICAOCAD___1").val()==null){
			
			console.log("filtro POSICAO está vazio")
			
			$('#INFOPOSICAOCAD___1').children('option:not(:first)').remove();
			$("#INFOPOSICAOCAD___1").css("border-color","#d1d3d4")
			$("#INFOPOSICAOCAD___1").css("background-color","#fff")
			
		} else {
			
			console.log("filtro POSICAO não está vazio")
			
			$("#INFOPOSICAOCAD___1").css("border-color","#b92113")
			$("#INFOPOSICAOCAD___1").css("background-color","#f2dede")

		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOQTDEPREVISTACAD___1").val()=="" || $("#INFOQTDEPREVISTACAD___1").val()==null){
			
			console.log("filtro QTDEPREVISTA está vazio")
			
			$('#INFOQTDEPREVISTACAD___1').children('option:not(:first)').remove();
			$("#INFOQTDEPREVISTACAD___1").css("border-color","#d1d3d4")
			$("#INFOQTDEPREVISTACAD___1").css("background-color","#fff")
			
		} else {
			
			console.log("filtro QTDEPREVISTA não está vazio")
			
			$("#INFOQTDEPREVISTACAD___1").css("border-color","#b92113")
			$("#INFOQTDEPREVISTACAD___1").css("background-color","#f2dede")

		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOSALDOCAD___1").val()=="" || $("#INFOSALDOCAD___1").val()==null){
		
			console.log("filtro SALDO está vazio")
			
			$('#INFOSALDOCAD___1').children('option:not(:first)').remove();
			$("#INFOSALDOCAD___1").css("border-color","#d1d3d4")
			$("#INFOSALDOCAD___1").css("background-color","#fff")

		} else {
			
			console.log("filtro SALDO não está vazio")
			
			$("#INFOSALDOCAD___1").css("border-color","#b92113")
			$("#INFOSALDOCAD___1").css("background-color","#f2dede")

		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOQTDEPLANOCAD___1").val()=="" || $("#INFOQTDEPLANOCAD___1").val()==null){
			
			console.log("filtro QTDEPLANO está vazio")
			
			$('#INFOQTDEPLANOCAD___1').children('option:not(:first)').remove();
			$("#INFOQTDEPLANOCAD___1").css("border-color","#d1d3d4")
			$("#INFOQTDEPLANOCAD___1").css("background-color","#fff")
			
		} else {
			
			console.log("filtro QTDEPLANO não está vazio")
			
			$("#INFOQTDEPLANOCAD___1").css("border-color","#b92113")
			$("#INFOQTDEPLANOCAD___1").css("background-color","#f2dede")
			
		}

		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOPRIORIDADECAD___1").val()=="" || $("#INFOPRIORIDADECAD___1").val()==null){
	
			console.log("filtro PRIORIDADE está vazio")
			
			$('#INFOPRIORIDADECAD___1').children('option:not(:first)').remove();
			$("#INFOPRIORIDADECAD___1").css("border-color","#d1d3d4")
			$("#INFOPRIORIDADECAD___1").css("background-color","#fff")
			
		} else {
			
			console.log("filtro PRIORIDADE não está vazio")
			
			$("#INFOPRIORIDADECAD___1").css("border-color","#b92113")
			$("#INFOPRIORIDADECAD___1").css("background-color","#f2dede")
			
		}

		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFODATANECESSIDADECAD___1").val()=="" || $("#INFODATANECESSIDADECAD___1").val()==null){
			
			console.log("filtro DATANECESSIDADE está vazio")
			
			$('#INFODATANECESSIDADECAD___1').children('option:not(:first)').remove();
			$("#INFODATANECESSIDADECAD___1").css("border-color","#d1d3d4")
			$("#INFODATANECESSIDADECAD___1").css("background-color","#fff")
			
		} else {
			
			console.log("filtro DATANECESSIDADE não está vazio")
			
			$("#INFODATANECESSIDADECAD___1").css("border-color","#b92113")
			$("#INFODATANECESSIDADECAD___1").css("background-color","#f2dede")
			
		}

		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOITEMCAD___1").val()=="" || $("#INFOITEMCAD___1").val()==null){
			
			console.log("filtro ITEM está vazio")
			
			$('#INFOITEMCAD___1').children('option:not(:first)').remove();
			$("#INFOITEMCAD___1").css("border-color","#d1d3d4")
			$("#INFOITEMCAD___1").css("background-color","#fff")
			
		} else {
			
			console.log("filtro ITEM não está vazio")
			
			$("#INFOITEMCAD___1").css("border-color","#b92113")
			$("#INFOITEMCAD___1").css("background-color","#f2dede")
			
		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOMATERIALCAD___1").val()=="" || $("#INFOMATERIALCAD___1").val()==null){
			
			console.log("filtro MATERIAL está vazio")
			
			$('#INFOMATERIALCAD___1').children('option:not(:first)').remove();
			$("#INFOMATERIALCAD___1").css("border-color","#d1d3d4")
			$("#INFOMATERIALCAD___1").css("background-color","#fff")
				
		} else {
			
			console.log("filtro MATERIAL não está vazio")
			
			$("#INFOMATERIALCAD___1").css("border-color","#b92113")
			$("#INFOMATERIALCAD___1").css("background-color","#f2dede")

		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOBITOLACAD___1").val()=="" || $("#INFOBITOLACAD___1").val()==null){
			
			console.log("filtro BITOLA está vazio")
			
			$('#INFOBITOLACAD___1').children('option:not(:first)').remove();
			$("#INFOBITOLACAD___1").css("border-color","#d1d3d4")
			$("#INFOBITOLACAD___1").css("background-color","#fff")
				
		} else {
			
			console.log("filtro BITOLA não está vazio")
			
			$("#INFOBITOLACAD___1").css("border-color","#b92113")
			$("#INFOBITOLACAD___1").css("background-color","#f2dede")

		}
		
		// APAGA A LISTA ATUAL
		//apagaLista()
		
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

// RECONSTRÓI TODOS OS FILTROS
function reconstroiFiltrosEd(){
		
	var myLoading2 = FLUIGC.loading(window);
	
	myLoading2.show();
	
	// TIMEOUT PARA EXECUÇÃO DA FUNÇÃO
	setTimeout(function (){
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOOSED___1").val()=="" || $("#INFOOSED___1").val()==null){
			
			console.log("filtro OSED está vazio")
			
			$('#INFOOSED___1').children('option:not(:first)').remove();
			$("#INFOOSED___1").css("border-color","#d1d3d4")
			$("#INFOOSED___1").css("background-color","#fff")
			
		} else {
			
			console.log("filtro OSED não está vazio")
			
			$("#INFOOSED___1").css("border-color","#b92113")
			$("#INFOOSED___1").css("background-color","#f2dede")
			
		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFONUMDESENHOED___1").val()=="" || $("#INFONUMDESENHOED___1").val()==null){
			
			console.log("filtro NUMDESENHO está vazio")
			
			$('#INFONUMDESENHOED___1').children('option:not(:first)').remove();
			$("#INFONUMDESENHOED___1").css("border-color","#d1d3d4")
			$("#INFONUMDESENHOED___1").css("background-color","#fff")

		} else {
			
			console.log("filtro NUMDESENHO não está vazio")
			
			$("#INFONUMDESENHOED___1").css("border-color","#b92113")
			$("#INFONUMDESENHOED___1").css("background-color","#f2dede")
			
		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOEXECUCAOED___1").val()=="" || $("#INFOEXECUCAOED___1").val()==null){
			
			console.log("filtro EXECUCAO está vazio")
			
			$('#INFOEXECUCAOED___1').children('option:not(:first)').remove();
			$("#INFOEXECUCAOED___1").css("border-color","#d1d3d4")
			$("#INFOEXECUCAOED___1").css("background-color","#fff")
			
		} else {
			
			console.log("filtro EXECUCAO não está vazio")
			
			$("#INFOEXECUCAOED___1").css("border-color","#b92113")
			$("#INFOEXECUCAOED___1").css("background-color","#f2dede")

		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOCODORDEMED___1").val()=="" || $("#INFOCODORDEMED___1").val()==null){
			
			console.log("filtro CODORDEM está vazio")
			
			$('#INFOCODORDEMED___1').children('option:not(:first)').remove();
			$("#INFOCODORDEMED___1").css("border-color","#d1d3d4")
			$("#INFOCODORDEMED___1").css("background-color","#fff")
			
		} else {
			
			console.log("filtro CODORDEM não está vazio")
			
			$("#INFOCODORDEMED___1").css("border-color","#b92113")
			$("#INFOCODORDEMED___1").css("background-color","#f2dede")

		}

		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOPAPCED___1").val()=="" || $("#INFOPAPCED___1").val()==null){
	
			console.log("filtro PAPC está vazio")
			
			$('#INFOPAPCED___1').children('option:not(:first)').remove();
			$("#INFOPAPCED___1").css("border-color","#d1d3d4")
			$("#INFOPAPCED___1").css("background-color","#fff")
			
		} else {
			
			console.log("filtro PAPC não está vazio")
			
			$("#INFOPAPCED___1").css("border-color","#b92113")
			$("#INFOPAPCED___1").css("background-color","#f2dede")

		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOATIVIDADEED___1").val()=="" || $("#INFOATIVIDADEED___1").val()==null){
			
			console.log("filtro ATIVIDADE está vazio")
			
			$('#INFOATIVIDADEED___1').children('option:not(:first)').remove();
			$("#INFOATIVIDADEED___1").css("border-color","#d1d3d4")
			$("#INFOATIVIDADEED___1").css("background-color","#fff")
			
		} else {
			
			console.log("filtro ATIVIDADE não está vazio")
			
			$("#INFOATIVIDADEED___1").css("border-color","#b92113")
			$("#INFOATIVIDADEED___1").css("background-color","#f2dede")
			
		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOPOSICAOED___1").val()=="" || $("#INFOPOSICAOED___1").val()==null){
			
			console.log("filtro POSICAO está vazio")
			
			$('#INFOPOSICAOED___1').children('option:not(:first)').remove();
			$("#INFOPOSICAOED___1").css("border-color","#d1d3d4")
			$("#INFOPOSICAOED___1").css("background-color","#fff")
			
		} else {
			
			console.log("filtro POSICAO não está vazio")
			
			$("#INFOPOSICAOED___1").css("border-color","#b92113")
			$("#INFOPOSICAOED___1").css("background-color","#f2dede")

		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOQTDEPREVISTAED___1").val()=="" || $("#INFOQTDEPREVISTAED___1").val()==null){
			
			console.log("filtro QTDEPREVISTA está vazio")
			
			$('#INFOQTDEPREVISTAED___1').children('option:not(:first)').remove();
			$("#INFOQTDEPREVISTAED___1").css("border-color","#d1d3d4")
			$("#INFOQTDEPREVISTAED___1").css("background-color","#fff")
			
		} else {
			
			console.log("filtro QTDEPREVISTA não está vazio")
			
			$("#INFOQTDEPREVISTAED___1").css("border-color","#b92113")
			$("#INFOQTDEPREVISTAED___1").css("background-color","#f2dede")

		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOSALDOED___1").val()=="" || $("#INFOSALDOED___1").val()==null){
		
			console.log("filtro SALDO está vazio")
			
			$('#INFOSALDOED___1').children('option:not(:first)').remove();
			$("#INFOSALDOED___1").css("border-color","#d1d3d4")
			$("#INFOSALDOED___1").css("background-color","#fff")

		} else {
			
			console.log("filtro SALDO não está vazio")
			
			$("#INFOSALDOED___1").css("border-color","#b92113")
			$("#INFOSALDOED___1").css("background-color","#f2dede")

		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOQTDEPLANOED___1").val()=="" || $("#INFOQTDEPLANOED___1").val()==null){
			
			console.log("filtro QTDEPLANO está vazio")
			
			$('#INFOQTDEPLANOED___1').children('option:not(:first)').remove();
			$("#INFOQTDEPLANOED___1").css("border-color","#d1d3d4")
			$("#INFOQTDEPLANOED___1").css("background-color","#fff")
			
		} else {
			
			console.log("filtro QTDEPLANO não está vazio")
			
			$("#INFOQTDEPLANOED___1").css("border-color","#b92113")
			$("#INFOQTDEPLANOED___1").css("background-color","#f2dede")
			
		}

		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOPRIORIDADEED___1").val()=="" || $("#INFOPRIORIDADEED___1").val()==null){
	
			console.log("filtro PRIORIDADE está vazio")
			
			$('#INFOPRIORIDADEED___1').children('option:not(:first)').remove();
			$("#INFOPRIORIDADEED___1").css("border-color","#d1d3d4")
			$("#INFOPRIORIDADEED___1").css("background-color","#fff")
			
		} else {
			
			console.log("filtro PRIORIDADE não está vazio")
			
			$("#INFOPRIORIDADEED___1").css("border-color","#b92113")
			$("#INFOPRIORIDADEED___1").css("background-color","#f2dede")
			
		}

		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFODATANECESSIDADEED___1").val()=="" || $("#INFODATANECESSIDADEED___1").val()==null){
			
			console.log("filtro DATANECESSIDADE está vazio")
			
			$('#INFODATANECESSIDADEED___1').children('option:not(:first)').remove();
			$("#INFODATANECESSIDADEED___1").css("border-color","#d1d3d4")
			$("#INFODATANECESSIDADEED___1").css("background-color","#fff")
			
		} else {
			
			console.log("filtro DATANECESSIDADE não está vazio")
			
			$("#INFODATANECESSIDADEED___1").css("border-color","#b92113")
			$("#INFODATANECESSIDADEED___1").css("background-color","#f2dede")
			
		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOITEMED___1").val()=="" || $("#INFOITEMED___1").val()==null){
			
			console.log("filtro ITEM está vazio")
			
			$('#INFOITEMED___1').children('option:not(:first)').remove();
			$("#INFOITEMED___1").css("border-color","#d1d3d4")
			$("#INFOITEMED___1").css("background-color","#fff")
			
		} else {
			
			console.log("filtro ITEM não está vazio")
			
			$("#INFOITEMED___1").css("border-color","#b92113")
			$("#INFOITEMED___1").css("background-color","#f2dede")
			
		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOMATERIALED___1").val()=="" || $("#INFOMATERIALED___1").val()==null){
			
			console.log("filtro MATERIAL está vazio")
			
			$('#INFOMATERIALED___1').children('option:not(:first)').remove();
			$("#INFOMATERIALED___1").css("border-color","#d1d3d4")
			$("#INFOMATERIALED___1").css("background-color","#fff")
				
		} else {
			
			console.log("filtro MATERIAL não está vazio")
			
			$("#INFOMATERIALED___1").css("border-color","#b92113")
			$("#INFOMATERIALED___1").css("background-color","#f2dede")

		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOBITOLAED___1").val()=="" || $("#INFOBITOLAED___1").val()==null){
			
			console.log("filtro BITOLA está vazio")
			
			$('#INFOBITOLAED___1').children('option:not(:first)').remove();
			$("#INFOBITOLAED___1").css("border-color","#d1d3d4")
			$("#INFOBITOLAED___1").css("background-color","#fff")
				
		} else {
			
			console.log("filtro BITOLA não está vazio")
			
			$("#INFOBITOLAED___1").css("border-color","#b92113")
			$("#INFOBITOLAED___1").css("background-color","#f2dede")

		}
		
		// APAGA A LISTA ATUAL
		//apagaLista()
		
		// CARREGA UMA NOVA LISTA
		carregaListaEd()
		
		// CONSTRÓI OS FILTROS
		constroiFiltrosEd()
		
	},1000)
		
	// DESATIVA O LOAD
	setTimeout(function(){
		
		myLoading2.hide();
		
	},500)
	
}

function verificaSelecaoTabelaCadastro(){

	var ret = false
	
	// PERCORRE TODOS OS REGISTROS DA TATBELA DE CADASTRO DE PLANO DE CORTE
	$("input[id^='OSCAD___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		// SE A OPÇÃO INCLUIR FOI SELECIONADO
		if($("#INCLUIRCAD___"+seq).is(":checked")){
			
			ret = true
			
		}
		
	})
	
	return ret

}

// VERIFICA SE NA TABELA DE EDIÇÃO EXISTEM ITENS SELECIONADOS
function verificaOpsConcluidasCadastro(){
	
	var ret=0
	// PERCORRE TODOS OS REGISTROS DA TATBELA DE CADASTRO DE PLANO DE CORTE
	$("input[id^='OSCAD___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		// SE A OPÇÃO INCLUIR FOI SELECIONADO
		if($("#INCLUIRCAD___"+seq).is(":checked")){
			
			if(!verificaOpConcluida(this,"LINHACAD")){

				ret = seq
				console.log("OP CONCLUIDA "+ret);

			}

		}
		
	})

	return ret;
	
}

function PreVisualizar(){

	var myLoading2 = FLUIGC.loading(window)

	myLoading2.show();

	if($("#PRE_VISUALIZAR___1").hasClass("botao-pre-visualizar")){

		$("input[id^='OSCAD___']").each(function(){
							
			var seq = $(this).attr("id").split("___")[1]
			
			console.log("linha "+seq)
			
			$("#LINHACAD___"+seq).show()
			$("#LINHACAD___"+seq).removeClass("invisivel")

		})

		limpaFiltros()
		constroiFiltros()

		$("#PRE_VISUALIZAR___1").removeClass("botao-pre-visualizar")
	
	}
	else{

		$("input[id^='OSCAD___']").each(function(){
							
			var seq = $(this).attr("id").split("___")[1]
			
			console.log("linha "+seq)
			
			// SE A OPÇÃO INCLUIR FOI SELECIONADO
			if($("#INCLUIRCAD___"+seq).is(":checked")){

				$("#LINHACAD___"+seq).show()
				$("#LINHACAD___"+seq).removeClass("invisivel")

			}
			else{

				$("#LINHACAD___"+seq).hide()
				$("#LINHACAD___"+seq).addClass("invisivel")

			}

		})

		limpaFiltros()
		constroiFiltros()

		$("#PRE_VISUALIZAR___1").addClass("botao-pre-visualizar")

	}

	myLoading2.hide();

}

//VERIFICA SE ALGUMA NECESSIDADE QUE ESTÁ TENTANDO SER RETORNADA JÁ FOI ATENDIDA
function verificaNecessidadeNaoAtendida(){

	var ret = {VER:true,OP:null,ATV:null }

	$("input[id^='OSCAD___']").each(function(){
					
		var seq = $(this).attr("id").split("___")[1]

		// SE A OPÇÃO INCLUIR FOI SELECIONADO
		if($("#INCLUIRCAD___"+seq).is(":checked")){

			console.log("linnha : ",seq)

			var qtdatendida = $("#QTDATENDIDAORIGINALCAD___"+seq).val(); 

			if(qtdatendida!="" && qtdatendida!=null && qtdatendida!="null" && qtdatendida!=undefined){

				ret.VER=false;
				ret.OP=$("#CODORDEMCAD___"+seq).val()
				ret.ATV=$("#ATIVIDADECAD___"+seq).val()

			}

		}
	
	})

	return ret;

}

function alteraStatusNecessidade(nseqpedido,log,user){


	var a1 = DatasetFactory.createConstraint("NSEQPEDIDO",nseqpedido,nseqpedido, ConstraintType.MUST);
	var a2 = DatasetFactory.createConstraint("LOGNECESSIDADE",log,log, ConstraintType.MUST);
	var a3 = DatasetFactory.createConstraint("USER",user,user, ConstraintType.MUST);

	var constraints = new Array(a1,a2,a3);

	var dataset = DatasetFactory.getDataset("dsAtualizaStatusNecessidadePAPC",null,constraints,null)


}

// RETORNA O STATUS DA NECESSIDADE PARA O PROGRAMADOR
function retornarNecessidade(){

	var myLoading2 = FLUIGC.loading(window);
	
	myLoading2.show();
	
	console.log("VOU COMEÇAR A EDITAR A NECESSIDADE")
	

	var usuario2  = $("#USUARIOATUAL").val()
	var usuario2 = getUser(usuario2)

	// VERIFICA SE NA TABELA DE EDIÇÃO EXISTEM ITENS SELECIONADOS
	if(verificaSelecaoTabelaCadastro()){

		var ret = verificaNecessidadeNaoAtendida()

		if(ret.VER){

			$("input[id^='OSCAD___']").each(function(){
						
				var seq = $(this).attr("id").split("___")[1]

				// SE A OPÇÃO INCLUIR FOI SELECIONADO
				if($("#INCLUIRCAD___"+seq).is(":checked")){

					console.log("linnha : ",seq)

					var log = $("#LOGORIGINALCAD___"+seq).val()

					if(log=="" || log==null || log==undefined || log=="null"){

						log=""
	
					}

					log += "Necessidade retornada para o PCP por "+ usuario2 +" no dia "+ new Date().toLocaleDateString()+";"

					alteraStatusNecessidade($("#NSEQPEDIDOCAD___"+seq).val(),log,window.parent.window.WCMAPI.userLogin);
					
					$("#STATUSCAD___"+seq).val(0);

				}
			
			})


			myLoading2.hide();
		
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
				title: 'Necessidade retornada'
			})

		}else{

			myLoading2.hide();

			// EXIBE ALERTA
			Swal.fire({
				icon: 'error',
				title: 'Item selecionado com plano já cadastrado',
				text: 'Não é possível retornar esta necessidade, OP: '+ret.OP+', atividade: '+ret.ATV+' , verifique e tente novamente.'
			})

		}

	} else {
			
		myLoading2.hide();
		
		// EXIBE ALERTA
		Swal.fire({
				icon: 'error',
				title: 'Não há itens selecionados para retornar',
				text: 'Verifique e tente novamente.'
		})
		
	}




}

// EDITAR/ALTERAR O PLANO DE CORTE
function alterarNecessidade(){
	
	var myLoading2 = FLUIGC.loading(window);
	
	myLoading2.show();
	
	var selecionado = false
	var faltaQtde = false
	
	console.log("VOU COMEÇAR A EDITAR A NECESSIDADE")
	

	var usuario2  = $("#USUARIOATUAL").val()
	var usuario2 = getUser(usuario2)
	// var prioridade = FLUIGC.slider.getValue('#SLIDERPRIORIDADECAD')
	var prioridade = $("#SLIDERPRIORIDADECAD").val()
	var observacao = $("#COMPLEMENTOCAD").val()
	var datanecessidadeinsert = $("#DATA_NECESSIDADECAD").val()	
	var semana_necessidade = $("#SEMANA_NECESSIDADECAD").val()
	var papc
	if($("#PAPCSWITCHCAD").is(':checked')){

		papc = "PA"

	}
	else{

		papc = "PC"

	}

	console.log(usuario2)
	console.log(datanecessidadeinsert)
	
	// SE NÚMERO DO PLANO FOI INFORMADO
	if(!((usuario2=="" || usuario2==null || usuario2==undefined) ||
			(semana_necessidade=="" || semana_necessidade==null || semana_necessidade==undefined) ||
			(datanecessidadeinsert=="" || datanecessidadeinsert==null || datanecessidadeinsert==undefined))){
		
			
		// VERIFICA SE NA TABELA DE EDIÇÃO EXISTEM ITENS SELECIONADOS
		if(verificaSelecaoTabelaCadastro()){

			var op = verificaOpsConcluidasCadastro();
			if(op==0){ 
					
						
				// PERCORRE TODOS OS REGISTROS DA TATBELA DE CADASTRO DE PLANO DE CORTE
				
				datanecessidadeinsert = formataDataBanco(datanecessidadeinsert)	

				$("input[id^='OSCAD___']").each(function(){
					
					var seq = $(this).attr("id").split("___")[1]
					
					console.log("linha "+seq)
					
					// SE A OPÇÃO INCLUIR FOI SELECIONADO
					if($("#INCLUIRCAD___"+seq).is(":checked")){

						console.log("VOU DELETAR A NECESSIDADE DA LINHA "+seq)

						var codColigadaseq = $("#CODCOLIGADACAD___"+seq).val()
						var codfilialseq = $("#CODFILIALCAD___"+seq).val()
						var codOrdemseq = $("#CODORDEMCAD___"+seq).val()
						var codEstruturaseq = $("#CODESTRUTURACAD___"+seq).val()
						var idatvordemseq = $("#IDATIVIDADECAD___"+seq).val()
						var codatividadeseq = $("#CODATIVIDADECAD___"+seq).val()
						var datanecessidade = $("#VALDATANECESSIDADECAD___"+seq).val()
						var semananecessidadeseq = $("#CELSEMANAORIGINALCAD___"+seq).val()
						var papcseq = $("#PAPCCAD___"+seq).val()
						var prioridadereprog = $("#VALPRIORIDADEREPROGRAMACAOCAD___"+seq).val()
						var semanareprog = $("#VALDATAREPROGRAMACAOCAD___"+seq).val()
						var datareprog = $("#VALDIAREPROGRAMACAOCAD___"+seq).val()
						var nseqpedido = $("#NSEQPEDIDOCAD___"+seq).val()
						
						execDeleteNecessidade(//codColigadaseq,codfilialseq,codOrdemseq,codEstruturaseq,idatvordemseq,codatividadeseq,datanecessidade,semananecessidadeseq,papcseq,prioridadereprog,semanareprog,datareprog,
							nseqpedido)

						selecionado = true
						
						console.log("VOU INSERIR O PLANO DA LINHA "+seq)

						var codColigada = $("#CODCOLIGADACAD___"+seq).val()
						var codfilial = $("#CODFILIALCAD___"+seq).val()
						var codOrdem = $("#CODORDEMCAD___"+seq).val()
						var codEstrutura = $("#CODESTRUTURACAD___"+seq).val()
						var idatvordem = $("#IDATIVIDADECAD___"+seq).val()
						var codatividade = $("#CODATIVIDADECAD___"+seq).val()
						var quantidade = $("#SALDOCADORIGINAL___"+seq).val()
						var complemento = $("#COMPLEMENTOANTIGOCAD___"+seq).val()
						var usuario1 = $("#USUARIOORIGINALCAD___"+seq).val()
						var dataoriginal = $("#DATAORIGINALCAD___"+seq).val()
						var datanecessidadeoriginal = $("#VALDATANECESSIDADECAD___"+seq).val()
						var prioridadeoriginal = $("#VALPRIORIDADEORIGINALCAD___"+seq).val()
						var semananecessidade = $("#CELSEMANAORIGINALCAD___"+seq).val()
						var lognecessidade = $("#LOGORIGINALCAD___"+seq).val()
						var status = $("#STATUSCAD___"+seq).val()
						var qtdatendida = $("#QTDATENDIDAORIGINALCAD___"+seq).val()
						var prioridadenome
						var datanecessidadeseq = $("#CELDATANECESSIDADEGERALCAD___"+seq).val()

						switch (prioridade) {
							case 0:
								prioridadenome = "Baixa"
								break;
							case 1:
								prioridadenome = "Média"
								break;
							case 2:
								prioridadenome = "Alta"
								break;
						}

						if(lognecessidade=="" || lognecessidade==null || lognecessidade==undefined || lognecessidade=="null"){

							lognecessidade=""
		
						}

						if($("QTDEPLANOCADORIGINAL___"+seq).val() != $("QTDEPLANOCAD___"+seq).val()){

							lognecessidade += "Quantidade reprogramada de "+$("QTDEPLANOEDORIGINAL___"+seq).val()+" para "+ $("QTDEPLANOED___"+seq).val()+" por "+ usuario2 +" no dia "+ new Date().toLocaleDateString()+";"

						}


						// if($("#VALPRIORIDADECAD___"+seq).val() != prioridade){

						// 	lognecessidade += "Prioridade reprogramada de "+$("#CELPRIORIDADECAD___"+seq).val()+" para "+prioridadenome+" por "+usuario2+" dia "+new Date().toLocaleDateString()+";"

						// }

						if($("#DATA_NECESSIDADECAD").val() != datanecessidadeseq){

							var status = {REPROGRAMADO : '<span class="card-list-item card-list-item-icons REPROGRAMADO_ICON" title="Reprogramado"> '+
								' <i class="bi bi-calendar-plus-fill" style="color:#dbbd08"></i> '+
								' </span>',
								CONCLUIDO: '<span class="card-list-item card-list-item-icons CONCLUIDO_ICON" title="Concluído"> '+
								' <i class="bi bi-check-all"  style="color:#22bc00"></i> '+
								' </span>',
								PENDENCIA: '<span class="card-list-item card-list-item-icons PENDENCIA_ICON" title="Aguardando Pendencia"> '+
								' <i class="bi bi-exclamation-diamond-fill"  style="color:#b92113"></i> '+
								' </span>',
								PARCIAL: '<span class="card-list-item card-list-item-icons PARCIAL_ICON" title="Parcialmente Atendido"> '+
								' <i class="bi bi-check"  style="color:#0a8ce8"></i> '+
								' </span>',
								RETRABALHO: '<span class="card-list-item card-list-item-icons RETRABALHO_ICON" title="Retrabalho"> '+
								' <i class="bi bi-arrow-repeat"  style="color:#852f07"></i> '+
								' </span>',									
							}


							lognecessidade += "Data necessidade reprogramada de "+datanecessidadeseq+" para "+$("#DATA_NECESSIDADECAD").val()+" por "+usuario2+" dia "+new Date().toLocaleDateString()+";"

							$("#STATUSICONCAD___"+seq).parent().append(status.REPROGRAMADO).fadeIn(1000);
							$("#STATUSICONCAD___"+seq).parent().addClass('icons-bag').fadeIn(1000);

							$("#STATUSICONCAD___"+seq).parents("tr").first().addClass("REPROGRAMADO").fadeIn(1000);

							$("#REPROGRAMADO").text( Number($("#REPROGRAMADO").text()) + 1)


						}


						if($("#CELSEMANANECESSIDADECAD___"+seq).val() != semana_necessidade){

							lognecessidade += "Semana reprogramada de "+$("#CELSEMANANECESSIDADECAD___"+seq).val()+" para "+semana_necessidade+" por "+usuario2+" dia "+new Date().toLocaleDateString()+";"

						}


						if($("#PAPCCAD___"+seq).val() != papc){

							lognecessidade += "Tipo alterado de "+$("#PAPCCAD___"+seq).val()+" para "+papc+" por "+usuario2+" dia "+new Date().toLocaleDateString()+";"

						}
						
						// EXECUTA A PROCEDURE PARA INSERIR UMA NECESSIDADE
						execInsertNecessidade(codColigada,codfilial,codOrdem,codEstrutura,idatvordem,codatividade,quantidade,usuario1,usuario2,prioridadeoriginal,
							complemento,datanecessidadeoriginal,papc,1,observacao,dataoriginal,datanecessidadeinsert,semananecessidade,semana_necessidade,prioridade,lognecessidade,qtdatendida)
						
					}
					
				})
				
				buscarPlano()
				limpaSectionCad()
				mostraSectionCAD()
				
				myLoading2.hide();

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
					title: 'Necessidade alterada com sucesso!'
				})
					
			}
			else{

				var vermelho = "linear-gradient(0deg, #f09c9c, #fd6666, #f09c9c) !important";

				// EXIBE ALERTA
				myLoading2.hide();
				var codop = $("#CODORDEMED___"+op).val()
				console.log("🚀 ~ file: utils.js ~ line 4938 ~ alterarPlano ~ codop", codop)
				console.log("OP CONCLUIDA "+codop)
				Swal.fire({
					icon: 'error',
					title: "A necessidade não pode ser editada",
					text: 'Verifique se a OP:'+codop+' já foi concluída',
				}).then(function(result){
					setTimeout(function(){
						if(seq > 10){
							var id = Number(seq) - 10
						}
						else{
							var id = 1
						}
						var string = "#QTDEPLANOED___"+id
						console.log( "focar no :"+string)
						window.location.href = string
						document.getElementById("QTDEPLANOED___"+id).scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
					},100);
				})
			}
			
					
		} else {
			
			myLoading2.hide();
			
			// EXIBE ALERTA
			Swal.fire({
					icon: 'error',
					title: 'Não há itens selecionados para alterar',
					text: 'Verifique e tente novamente.'
			})
			
		}
			

			
	} else {
		// SE NÃO
		
		myLoading2.hide();
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'Há campos obrigatórios que não foram preenchidos!',
			  text: 'Verifique e tente novamente.'
		})
		
	}
	
	// DESATIVA O LOAD
	setTimeout(function(){
		
		myLoading2.hide();
		
	},500)
	
}

/**
 * Retorna o nome do usuário logado atualmente
 * @param cod O código do usuário
 * @returns O nome do usuário logado que está cadastrado no Fluig
 */
function getUser(cod){

    var usuario;
	var c1 = DatasetFactory.createConstraint("CODIGO", cod, cod, ConstraintType.MUST);
	var constraints = new Array(c1);
	var dataset = DatasetFactory.getDataset("dsLoginUsuario", null, constraints, null);
	usuario = dataset.values[0]
	usuario = usuario['LOGIN']
	return usuario;

}

function execDeleteNecessidade(//codColigada,codfilial,codOrdem,codEstrutura,idatvordem,codatividade,datanecessidade,semananecessidade,papc,prioridadereprog,semanareprog,datareprog,
	nseqpedido){

	// var c1 = DatasetFactory.createConstraint("COLIGADA",codColigada,codColigada,ConstraintType.MUST);
    // var c2 = DatasetFactory.createConstraint("FILIAL",codfilial,codfilial,ConstraintType.MUST);
    // var c3 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST);
    // var c4 = DatasetFactory.createConstraint("CODESTRUTURA",codEstrutura,codEstrutura,ConstraintType.MUST);
    // var c5 = DatasetFactory.createConstraint("IDATVORDEM",idatvordem,idatvordem,ConstraintType.MUST);
    // var c6 = DatasetFactory.createConstraint("CODATIVIDADE",codatividade,codatividade,ConstraintType.MUST);
    // var c7 = DatasetFactory.createConstraint("DATANECESSIDADE",datanecessidade,datanecessidade,ConstraintType.MUST);
    // var c8 = DatasetFactory.createConstraint("NECESSIDADE",semananecessidade,semananecessidade,ConstraintType.MUST);
	// var c9 = DatasetFactory.createConstraint("PAPC",papc,papc,ConstraintType.MUST);

	
	// var constraints = new Array(c1,c2,c3,c4,c5,c6,c7,c8,c9);

	// if(prioridadereprog!="" && prioridadereprog!=null && prioridadereprog!=undefined){

	// 	var c10 = DatasetFactory.createConstraint("PRIORIDADEREPROG",prioridadereprog,prioridadereprog,ConstraintType.MUST);
	// 	constraints.push(c10);

	// }
	
	// if(semanareprog!="" && semanareprog!=null && semanareprog!=undefined){

	// 	var c11 = DatasetFactory.createConstraint("SEMANAREPROG",semanareprog,semanareprog,ConstraintType.MUST);
	// 	constraints.push(c11);

	// }

	// if(semanareprog!="" && semanareprog!=null && semanareprog!=undefined){

	// 	var c12 = DatasetFactory.createConstraint("DATAREPROGRAMACAO",datareprog,datareprog,ConstraintType.MUST);
	// 	constraints.push(c12);

	// }

	var c1 = DatasetFactory.createConstraint("NSEQPEDIDO",nseqpedido,nseqpedido,ConstraintType.MUST);

	var constraints = new Array(c1);
  
    console.log("Vou executar o dataset do DELETE DA NECESSIDADE DO PLANO DE CORTE")
    
    var dataset = DatasetFactory.getDataset("dsDeleteNecessidadePAPC",null,constraints,null);

    console.log("Executei o dataset do DELETE DA NECESSIDADE DO PLANO DE CORTE")

}

function execInsertNecessidade(codColigada,codfilial,codOrdem,codEstrutura,idatvordem,codatividade,
	quantidade,usuario1,usuario2,prioridade,complemento,datanecessidade,papc,status,observacao,dataoriginal,datareprog,semananecessidade,semanareprog,prioridadereprog,lognecessidade,qtdatendida){

    var c1 = DatasetFactory.createConstraint("COLIGADA",codColigada,codColigada,ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("FILIAL",codfilial,codfilial,ConstraintType.MUST);
    var c3 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST);
    var c4 = DatasetFactory.createConstraint("CODESTRUTURA",codEstrutura,codEstrutura,ConstraintType.MUST);
    var c5 = DatasetFactory.createConstraint("IDATVORDEM",idatvordem,idatvordem,ConstraintType.MUST);
    var c6 = DatasetFactory.createConstraint("CODATIVIDADE",codatividade,codatividade,ConstraintType.MUST);
    var c7 = DatasetFactory.createConstraint("QUANTIDADE",quantidade,quantidade,ConstraintType.MUST);
    var c8 = DatasetFactory.createConstraint("USUARIO",usuario1,usuario2,ConstraintType.MUST);
    var c9 = DatasetFactory.createConstraint("PRIORIDADE",prioridade,prioridade,ConstraintType.MUST);
    var c11 = DatasetFactory.createConstraint("NECESSIDADE",datanecessidade,datanecessidade,ConstraintType.MUST);
	var c12 = DatasetFactory.createConstraint("PAPC",papc,papc,ConstraintType.MUST);
	var c13 = DatasetFactory.createConstraint("STATUS",status,status,ConstraintType.MUST);

	var constraints = new Array(c1,c2,c3,c4,c5,c6,c7,c8,c9,c11,c12,c13)

	prioridadereprog= prioridadereprog.toString();

	if(complemento!="" && complemento!=null && complemento!=undefined && complemento!="null"){

		var c10 = DatasetFactory.createConstraint("COMPLEMENTO",complemento,complemento,ConstraintType.MUST);
		constraints.push(c10);

	}

	if(observacao!="" && observacao!=null && observacao!=undefined && observacao!="null"){

		var c14 = DatasetFactory.createConstraint("OBSERVACAO",observacao,observacao,ConstraintType.MUST);
		constraints.push(c14);

	}

	if(dataoriginal!="" && dataoriginal!=null && dataoriginal!=undefined){

		var c15 = DatasetFactory.createConstraint("DATAORIGINAL",dataoriginal,dataoriginal,ConstraintType.MUST);
		constraints.push(c15);

	}

	if(datareprog!="" && datareprog!=null && datareprog!=undefined){

		var c16 = DatasetFactory.createConstraint("DATAREPROGRAMACAO",datareprog,datareprog,ConstraintType.MUST);
		constraints.push(c16);

	}

	if(semananecessidade!="" && semananecessidade!=null && semananecessidade!=undefined){

		var c17 = DatasetFactory.createConstraint("SEMANANECESSIDADE",semananecessidade,semananecessidade,ConstraintType.MUST);
		constraints.push(c17);

	}
	if(semanareprog!="" && semanareprog!=null && semanareprog!=undefined){

		var c18 = DatasetFactory.createConstraint("SEMANAREPROGRAMACAO",semanareprog,semanareprog,ConstraintType.MUST);
		constraints.push(c18);

	}
	if(prioridadereprog!="" && prioridadereprog!=null && prioridadereprog!=undefined){

		var c19 = DatasetFactory.createConstraint("PRIORIDADEREPROGRAMACAO",Number(prioridadereprog),Number(prioridadereprog),ConstraintType.MUST);
		constraints.push(c19);

	}
	if(lognecessidade!="" && lognecessidade!=null && lognecessidade!=undefined){

		var c20 = DatasetFactory.createConstraint("LOG",lognecessidade,lognecessidade,ConstraintType.MUST);
		constraints.push(c20);

	}
	if(qtdatendida!="" && qtdatendida!=null && qtdatendida!=undefined){

		var c21 = DatasetFactory.createConstraint("QTDATENDIDA",qtdatendida,qtdatendida,ConstraintType.MUST);
		constraints.push(c21);

	}
    
    console.log("Vou executar o dataset do INSERT DA NECESSIDADE DO PLANO DE CORTE")
    
    var dataset = DatasetFactory.getDataset("dsInsertNecessidadePAPC",null,constraints,null);

    console.log("Executei o dataset do INSERT DA NECESSIDADE DO PLANO DE CORTE")

}

function execUpdateNecessidade(obj){

	var constraints = new Array()

	if(obj.codColigada!="" && obj.codColigada!=null && obj.codColigada!=undefined){

		var c1 = DatasetFactory.createConstraint("NUMBER","CODCOLIGADA",obj.codColigada,ConstraintType.MUST);
		constraints.push(c1);

	}
	if(obj.codfilial!="" && obj.codfilial!=null && obj.codfilial!=undefined){

		var c2 = DatasetFactory.createConstraint("NUMBER","CODFILIAL",obj.codfilial,ConstraintType.MUST);
		constraints.push(c2);

	}
	if(obj.codOrdem!="" && obj.codOrdem!=null && obj.codOrdem!=undefined){

		var c3 = DatasetFactory.createConstraint("VALUE","CODORDEM",obj.codOrdem,ConstraintType.MUST);
		constraints.push(c3);

	}
	if(obj.codEstrutura!="" && obj.codEstrutura!=null && obj.codEstrutura!=undefined){

		var c4 = DatasetFactory.createConstraint("VALUE","CODESTRUTURA",obj.codEstrutura,ConstraintType.MUST);
		constraints.push(c4);

	}
	if(obj.idatvordem!="" && obj.idatvordem!=null && obj.idatvordem!=undefined){

		var c5 = DatasetFactory.createConstraint("NUMBER","IDATVORDEM",obj.idatvordem,ConstraintType.MUST);
		constraints.push(c5);

	}
	if(obj.codatividade!="" && obj.codatividade!=null && obj.codatividade!=undefined){

		var c6 = DatasetFactory.createConstraint("VALUE","CODATIVIDADE",obj.codatividade,ConstraintType.MUST);
		constraints.push(c6);

	}
	if(obj.quantidade!="" && obj.quantidade!=null && obj.quantidade!=undefined){

		var c7 = DatasetFactory.createConstraint("NUMBER","QUANTIDADE",obj.quantidade,ConstraintType.MUST);
		constraints.push(c7);

	}
	if(obj.usuario1!="" && obj.usuario1!=null && obj.usuario1!=undefined){

		var c8 = DatasetFactory.createConstraint("VALUE","RECCREATEDBY",obj.usuario1,ConstraintType.MUST);
		constraints.push(c8);

	}
	if(obj.usuario2!="" && obj.usuario2!=null && obj.usuario2!=undefined){

		var c9 = DatasetFactory.createConstraint("VALUE","RECCREATEDON",obj.usuario2,ConstraintType.MUST);
		constraints.push(c9);

	}
	if(obj.prioridade!="" && obj.prioridade!=null && obj.prioridade!=undefined){

		var c10 = DatasetFactory.createConstraint("NUMBER","PRIORIDADE",obj.prioridade,ConstraintType.MUST);
		constraints.push(c10);

	}
	if(obj.complemento!="" && obj.complemento!=null && obj.complemento!=undefined){

		var c11 = DatasetFactory.createConstraint("VALUE","COMPLEMENTO",obj.complemento,ConstraintType.MUST);
		constraints.push(c11);

	}
	if(obj.datanecessidade!="" && obj.datanecessidade!=null && obj.datanecessidade!=undefined){

		var c12 = DatasetFactory.createConstraint("VALUE","DATANECESSIDADE",obj.datanecessidade,ConstraintType.MUST);
		constraints.push(c12);

	}
	if(obj.papc!="" && obj.papc!=null && obj.papc!=undefined){

		var c13 = DatasetFactory.createConstraint("VALUE","PAPC",obj.papc,ConstraintType.MUST);
		constraints.push(c13);

	}
	if(obj.status!="" && obj.status!=null && obj.status!=undefined){

		var c14 = DatasetFactory.createConstraint("NUMBER","STATUS",obj.status,ConstraintType.MUST);
		constraints.push(c14);

	}

	if(obj.observacao!="" && obj.observacao!=null && obj.observacao!=undefined){

		var c15 = DatasetFactory.createConstraint("VALUE","OBS",obj.observacao,ConstraintType.MUST);
		constraints.push(c15);

	}

	if(obj.dataoriginal!="" && obj.dataoriginal!=null && obj.dataoriginal!=undefined){

		var c16 = DatasetFactory.createConstraint("VALUE","RECCREATEDON",obj.dataoriginal,ConstraintType.MUST);
		constraints.push(c16);

	}

	if(obj.where!="" && obj.where!=null && obj.where!=undefined){

		var c17 = DatasetFactory.createConstraint("WHERE",obj.where,obj.where,ConstraintType.MUST);
		constraints.push(c17);

	}


    
    console.log("Vou executar o dataset do INSERT DA NECESSIDADE DO PLANO DE CORTE")
    
    var dataset = DatasetFactory.getDataset("dsUpdateNecessidadePAPC",null,constraints,null);

    console.log("Executei o dataset do INSERT DA NECESSIDADE DO PLANO DE CORTE")

}

function mostraSectionCAD(){

	$(".sectionCAD").hide();

	var numlote = $("#NUMLOTECAD").val()
	var codigoprd = $("#CODMATERIALCAD").val()
	var qtdretalho = $("#QTDRETALHOCAD").val()
	var retalho = $("#RETALHOCAD").val()
	var qtdpecas = $("#QTDEPECASPLANCAD").val()
	var qtdsucata = $("#QTDESUCATAPLANCAD").val()
	var codsucata = $("#CODPRDSUCATACAD").val()

	$(".INCLUIRPLAN").hide();

	$("input[id^='INCLUIRCAD___']").each(function(){

		if($(this).is(":checked")){

			$(".sectionCAD").show();

			if((numlote!="" && numlote!=undefined && numlote!=null
			&& codigoprd!="" && codigoprd!=undefined && codigoprd!=null
			&& qtdretalho!="" && qtdretalho!=undefined && qtdretalho!=null
			&& retalho!="" && retalho!=undefined && retalho!=null
			&& qtdpecas!="" && qtdpecas!=undefined && qtdpecas!=null
			&& qtdsucata!="" && qtdsucata!=undefined && qtdsucata!=null
			&& codsucata!="" && codsucata!=undefined && codsucata!=null)){

				$(".INCLUIRPLAN").show();

			}

		}

	})

}

function limpaSectionCad(){
	//FLUIGC.slider.setValue('#SLIDERPRIORIDADECAD',0)
	$("#SLIDERPRIORIDADECAD").val(0)
	var datanecessidade = FLUIGC.calendar('#DATA_NECESSIDADECAD')
	datanecessidade.setDate("")
	$("#COMPLEMENTOCAD").val("")
	$(".sectionCAD").hide()
}

function DesmarcaCheckBoxCad(){

	// SE ABA DO CADASTRO ESTÁ ATIVA
	if($("#ABACAD").hasClass("active")){

		var numlote = $("#NUMLOTECAD").val()
		var codigoprd = $("#CODMATERIALCAD").val()
		var qtdretalho = $("#QTDRETALHOCAD").val()
		var retalho = $("#RETALHOCAD").val()
		var qtdpecas = $("#QTDEPECASPLANCAD").val()
		var qtdsucata = $("#QTDESUCATAPLANCAD").val()
		var codsucata = $("#CODPRDSUCATACAD").val()

		if(numlote=="" || numlote==undefined || numlote==null
			|| codigoprd=="" || codigoprd==undefined || codigoprd==null
			|| qtdretalho=="" || qtdretalho==undefined || qtdretalho==null
			|| retalho=="" || retalho==undefined || retalho==null
			|| qtdpecas=="" || qtdpecas==undefined || qtdpecas==null
			|| qtdsucata=="" || qtdsucata==undefined || qtdsucata==null
			|| codsucata=="" || codsucata==undefined || codsucata==null){

			$("input[id^='INCLUIRCAD___']").each(function(){

				var seq = $(this).attr("id").split("___")[1]
								
				if($(this).is(":checked")){
					$(this).prop("checked", false);
					$("#SALDOCAD___"+seq).val($("#SALDOCADORIGINAL___"+seq).val())
					$("#QTDEPLANOCAD___"+seq).val("")
					$("#LINHACAD___"+seq).removeClass("selecionado")
					
				}

			})

			$(".sectionCAD").hide();

			$(".INCLUIRPLAN").hide();

		}
		else{

			$(".INCLUIRPLAN").show();

		}

	}

}

// HABILITA QTDE PLANO NA TABELA
function habilitaQtdePlano(obj){
	
	console.log("entrei para habilitar qtde plano")
	
	var seq = $(obj).attr("id").split("___")[1]
	var linha = $(obj).parents("tr").attr("id").split("___")[0]
	//var linha = $(obj).attr("id").split("___")[0]

	var myLoading2 = FLUIGC.loading(window)
	myLoading2.show();
	
	var numlote = $("#NUMLOTECAD").val()
	var codigoprd = $("#CODMATERIALCAD").val()
	var qtdretalho = $("#QTDRETALHOCAD").val()
	var retalho = $("#RETALHOCAD").val()
	var qtdpecas = $("#QTDEPECASPLANCAD").val()
	var qtdsucata = $("#QTDESUCATAPLANCAD").val()
	var codsucata = $("#CODPRDSUCATACAD").val()

	
	console.log("seq: "+seq+", linha: "+linha)


	// SE ITEM FOI SELECIONADO PARA SER CADASTRADO
	if($(obj).is(":checked")){

		if(linha=="LINHACAD"){
								
			mostraSectionCAD()
			$("#LINHACAD___"+seq).addClass("selecionado")
			
		}

		if((numlote!="" && numlote!=undefined && numlote!=null
		&& codigoprd!="" && codigoprd!=undefined && codigoprd!=null
		&& qtdretalho!="" && qtdretalho!=undefined && qtdretalho!=null
		&& retalho!="" && retalho!=undefined && retalho!=null
		&& qtdpecas!="" && qtdpecas!=undefined && qtdpecas!=null
		&& qtdsucata!="" && qtdsucata!=undefined && qtdsucata!=null
		&& codsucata!="" && codsucata!=undefined && codsucata!=null) ||  linha=="LINHAED"){

			if(($("#OSCAD___"+seq).val() == $("#CODPRJPLANCAD").val()) ||  linha=="LINHAED" ){

				//SE A MATERIA PRIMA ESTÁ CADASTRADA NA ESTRUTURA DESTA OP
				if(verificaMPCheckBox(obj,linha)){

					//SE ATIVIDADE NÃO FOI PROGRAMADA PELO PROCESSO DE PROGRAMAÇÃO NORMAL
					if(verificaProgramacao(obj,linha)){

						if(verificaOpConcluida(obj,linha)){

							console.log("elemento selecionado")
						
							// SE LINHA DE CADASTRO FOI SELECIONADA
							if(linha=="LINHACAD"){
								
								$(".INCLUIRPLAN").show();
								$("#LINHACAD___"+seq).addClass("selecionado")
								$("#QTDEPLANOCAD___"+seq).prop("readonly",false)
								
							}
							
							// SE LINHA DE EDIÇÃO FOI SELECIONADA
							if(linha=="LINHAED"){
								
								$("#LINHAED___"+seq).addClass("selecionado")
								$("#QTDEPLANOED___"+seq).prop("readonly",false)

							}
						}
						else{

							// SE NÃO
							$(obj).prop("checked",false)

							if(linha=="LINHACAD"){
								
								mostraSectionCAD()
								$("#LINHACAD___"+seq).removeClass("selecionado")
								
							}
			
							// EXIBE ALERTA
							Swal.fire({
								icon: 'error',
								title: "A atividade não pode ser cadastrada",
								text: 'Verifique se a OP da mesma já não foi concluída'
							})
			
						}

					}
					else{

						// SE NÃO
						$(obj).prop("checked",false)

						if(linha=="LINHACAD"){
								
							mostraSectionCAD()
							$("#LINHACAD___"+seq).removeClass("selecionado")
							
						}

						// EXIBE ALERTA
						Swal.fire({
							icon: 'error',
							title: "A atividade não pode ser cadastrada",
							text: 'Verifique se a mesma já não foi programada por outro processo'
						})

					}
				}
				else{

					// SE NÃO
					$(obj).prop("checked",false)

					if(linha=="LINHACAD"){
								
						mostraSectionCAD()
						$("#LINHACAD___"+seq).removeClass("selecionado")
						
					}

					// EXIBE ALERTA
					Swal.fire({
						icon: 'error',
						title: "A matéria-prima selecionada não foi cadastrada na estrutura para a OP selecionada!",
						text: 'Verifique se os campos Lote(CR) e Cód.MP estão preenchidos e tente novamente.'
					})

				}

			}
			else{

				// SE NÃO
				$(obj).prop("checked",false)

				if(linha=="LINHACAD"){
								
					mostraSectionCAD()
					$("#LINHACAD___"+seq).removeClass("selecionado")
					
				}

				// EXIBE ALERTA
				Swal.fire({

					icon: 'error',
					title: "A OP selecionada não pertence a OS selecionada!",
					text: 'Verifique e tente novamente.'

				})

			}
		
		}
		else{

			// SE LINHA DE CADASTRO FOI SELECIONADA
			if(linha=="LINHACAD"){
								
				$(".INCLUIRPLAN").hide();
				
			}

		}
		
	} else {
		// SE NÃO

		console.log("elemento não selecionado")

		// SE LINHA DE CADASTRO FOI TIRADA A SELEÇÃO
		if((numlote!="" && numlote!=undefined && numlote!=null
		&& codigoprd!="" && codigoprd!=undefined && codigoprd!=null
		&& qtdretalho!="" && qtdretalho!=undefined && qtdretalho!=null
		&& retalho!="" && retalho!=undefined && retalho!=null
		&& qtdpecas!="" && qtdpecas!=undefined && qtdpecas!=null
		&& qtdsucata!="" && qtdsucata!=undefined && qtdsucata!=null
		&& codsucata!="" && codsucata!=undefined && codsucata!=null) && linha=="LINHACAD"){

			mostraSectionCAD()

			var planoCad = $("#QTDEPLANOCAD___"+seq).val()
		
			$("#LINHACAD___"+seq).removeClass("selecionado")

			$("#QTDEPLANOCAD___"+seq).prop("readonly",true)

			if(planoCad!=null && planoCad!=undefined && planoCad!=""){

				$("#SALDOCAD___"+seq).val( Number(parseInt($("#SALDOCAD___"+seq).val()) + parseInt($("#QTDEPLANOCAD___"+seq).val())))
				
			}
			else{

				$("#SALDOCAD___"+seq).val( Number(parseInt($("#SALDOCAD___"+seq).val())))
				
			}
			$("#QTDEPLANOCAD___"+seq).val("")
			var pesototal = Number($("#PESOTOTALCAD").val())
			var qtdreal = Number($("#QTDREALCAD___"+seq).val())
			$("#QTDREALCAD___"+seq).val("")
			$("#QTDREALORIGINALCAD___"+seq).val("")
			$("#PESOARTCAD___"+seq).val("")
			$("#QTDMPFINALCAD___"+seq).val("")
			console.log(pesototal)
			console.log(qtdreal)
			$("#PESOTOTALCAD").val( pesototal - qtdreal )
			AtualizaPesoArt("CAD")
			
		}
		else if(linha=="LINHACAD"){

			mostraSectionCAD()
			$("#LINHACAD___"+seq).removeClass("selecionado")

		}
		
		// SE LINHA DE EDIÇÃO FOI FOI TIRADA A SELEÇÃO
		if(linha=="LINHAED"){

			var planoEd = $("#QTDEPLANOED___"+seq).val()
		
			$("#LINHAED___"+seq).removeClass("selecionado")
			$("#QTDEPLANOED___"+seq).prop("readonly",true)
			$("#SALDOED___"+seq).val(parseInt(parseInt($("#SALDOEDORIGINAL___"+seq).val())+parseInt($("#QTDEPLANOEDORIGINAL___"+seq).val())))
			$("#QTDEPLANOED___"+seq).val("")
			var pesototal = Number($("#PESOTOTALED").val())
			var qtdreal = Number($("#QTDREALED___"+seq).val())
			$("#QTDREALED___"+seq).val("")
			$("#QTDREALORIGINALED___"+seq).val("")
			$("#PESOARTED___"+seq).val("")
			$("#QTDMPFINALED___"+seq).val("")
			console.log(pesototal)
			console.log(qtdreal)
			$("#PESOTOTALED").val( pesototal - qtdreal)
			AtualizaPesoArt("ED")
			
		}
		
	}
	myLoading2.hide();
		
}

//VERIFICA SE ESTE AS ATIVIDADES SELECIONADAS JÁ NÃO FORAM PROGRAMADAS NO PROCESSO DE PROGRAMAÇÃO NORMAL
function verificaProgramacao(obj,linha){

	console.log("verifica se a atividade foi programada em outro processo")
		
	var seq = $(obj).attr("id").split("___")[1]

	if(linha=="LINHACAD"){

		if($("#INCLUIRCAD___"+seq).is(":checked")){
		
			var osCad = $("#OSCAD___"+seq).val()
			var codFilial = $("#CODFILIAL").val()
			var codEstrutura = $("#CODESTRUTURACAD___"+seq).val()
			var codOrdem = $("#CODORDEMCAD___"+seq).val()
			var idAtividade = $("#IDATIVIDADECAD___"+seq).val()
			var idprd = $("#IDMATERIALCAD").val()
			
			console.log("osCad: "+osCad+", codFilial: "+codFilial+", codEstrutura: "+codEstrutura+", codOrdem: "+codOrdem+", idAtividade: "+idAtividade+", idprd: "+idprd)


			// MONTA O ARRAY DAS CONSTRAINTS
			var a1 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
			var a2 = DatasetFactory.createConstraint("IDATVORDEM",idAtividade,idAtividade,ConstraintType.MUST)
			var a3 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
			
			var constraints = new Array(a1,a2,a3)
			
			var dataset = DatasetFactory.getDataset("dsVerificaAtividadePAPC",null,constraints,null)
			var row = dataset.values
			
			console.log("row")
			console.log(row)
			
			// SE NÃO TEVE RETORNO
			if(row=="" || row==null || row==undefined || row=="null"){

				ret = true;

			}
			else{
				ret = false;
			}
			
			
		}

	}
	else if(linha=="LINHAED"){

		if($("#INCLUIRED___"+seq).is(":checked")){
			
			var osEd = $("#OSED___"+seq).val()
			var codFilial = $("#CODFILIALED").val()
			var codEstrutura = $("#CODESTRUTURAED___"+seq).val()
			var codOrdem = $("#CODORDEMED___"+seq).val()
			var idAtividade = $("#IDATIVIDADEED___"+seq).val()
			var idprd = $("#IDMATERIALED").val()
			
			console.log("osEd: "+osEd+", codFilial: "+codFilial+", codEstrutura: "+codEstrutura+", codOrdem: "+codOrdem+", idAtividade: "+idAtividade+", idprd: "+idprd)

			// MONTA O ARRAY DAS CONSTRAINTS
			var a1 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
			var a2 = DatasetFactory.createConstraint("IDATVORDEM",idAtividade,idAtividade,ConstraintType.MUST)
			var a3 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
			
			var constraints = new Array(a1,a2,a3)
			
			var dataset = DatasetFactory.getDataset("dsVerificaAtividadePAPC",null,constraints,null)
			var row = dataset.values
			
			console.log("row")
			console.log(row)
			
			// SE NÃO TEVE RETORNO
			if(row=="" || row==null || row==undefined || row=="null"){

				ret = true;

			}
			else{
				ret = false;
			}
			
			
		}

	}
	
	console.log("ret: "+ret)

	return ret

}

//VERIFICA SE A LINHA QUE FOI SELECIONADA PODE SER CADASTRADA NAUQLEE PLANO PARA AQUELA MATÉRIA PRIMA
function verificaMPCheckBox(obj,linha){
	
	var ret = true
	
	console.log("verifica se a MP foi cadastrada na estrutura para a op selecionada")
		
	var seq = $(obj).attr("id").split("___")[1]
	
	// SE A OPÇÃO INCLUIR FOI SELECIONADO
	if(linha=="LINHACAD"){
		if($("#INCLUIRCAD___"+seq).is(":checked")){
		
			var osCad = $("#OSCAD___"+seq).val()
			var codFilial = $("#CODFILIAL").val()
			var codEstrutura = $("#CODESTRUTURACAD___"+seq).val()
			var codOrdem = $("#CODORDEMCAD___"+seq).val()
			var idAtividade = $("#IDATIVIDADECAD___"+seq).val()
			var idprd = $("#IDMATERIALCAD").val()
			
			console.log("osCad: "+osCad+", codFilial: "+codFilial+", codEstrutura: "+codEstrutura+", codOrdem: "+codOrdem+", idAtividade: "+idAtividade+", idprd: "+idprd)
			
			// MONTA O ARRAY DAS CONSTRAINTS
			var a1 = DatasetFactory.createConstraint("NUM_OS",osCad,osCad,ConstraintType.MUST)
			var a2 = DatasetFactory.createConstraint("CODESTRUTURA",codEstrutura,codEstrutura,ConstraintType.MUST)
			var a3 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
			var a4 = DatasetFactory.createConstraint("IDATVORDEM",idAtividade,idAtividade,ConstraintType.MUST)
			var a5 = DatasetFactory.createConstraint("IDPRD",idprd,idprd,ConstraintType.MUST)
			var a6 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
			
			var constraints = new Array(a1,a2,a3,a4,a5,a6)
			console.log("filtros para buscar matéria prima : "+constraints);
			
			var dataset = DatasetFactory.getDataset("dsVerificaCompPAPC",null,constraints,null)
			var row = dataset.values
			
			console.log("row")
			console.log(row)
			
			// SE NÃO TEVE RETORNO
			if(row=="" || row==null || row==undefined || row=="null"){
				
				ret = false
				
			}
			else{

				var codFilial = $("#CODFILIAL").val()
				var codEstrutura = $("#CODESTRUTURACAD___"+seq).val()
				var codOrdem = $("#CODORDEMCAD___"+seq).val()
				var codAtividade = $("#CODATIVIDADECAD___"+seq).val()
				var idAtividade = $("#IDATIVIDADECAD___"+seq).val()
				var idprd = $("#IDMATERIALCAD").val()
				var qtdreal = calculaQtdeReal(codFilial,codOrdem,codAtividade,idAtividade,codEstrutura,idprd)
				$("#QTDREALORIGINALCAD___"+seq).val(Number(qtdreal))
				AtualizaPesoArt("CAD")

			}
			
		}
	}
	else if(linha=="LINHAED"){
		if($("#INCLUIRED___"+seq).is(":checked")){
			
			var osEd = $("#OSED___"+seq).val()
			var codFilial = $("#CODFILIALED").val()
			var codEstrutura = $("#CODESTRUTURAED___"+seq).val()
			var codOrdem = $("#CODORDEMED___"+seq).val()
			var idAtividade = $("#IDATIVIDADEED___"+seq).val()
			var idprd = $("#IDMATERIALED").val()
			
			console.log("osEd: "+osEd+", codFilial: "+codFilial+", codEstrutura: "+codEstrutura+", codOrdem: "+codOrdem+", idAtividade: "+idAtividade+", idprd: "+idprd)
			
			// MONTA O ARRAY DAS CONSTRAINTS
			var a1 = DatasetFactory.createConstraint("NUM_OS",osEd,osEd,ConstraintType.MUST)
			var a2 = DatasetFactory.createConstraint("CODESTRUTURA",codEstrutura,codEstrutura,ConstraintType.MUST)
			var a3 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
			var a4 = DatasetFactory.createConstraint("IDATVORDEM",idAtividade,idAtividade,ConstraintType.MUST)
			var a5 = DatasetFactory.createConstraint("IDPRD",idprd,idprd,ConstraintType.MUST)
			var a6 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
			
			var constraints = new Array(a1,a2,a3,a4,a5,a6)
			
			var dataset = DatasetFactory.getDataset("dsVerificaCompPAPC",null,constraints,null)
			var row = dataset.values
			
			console.log("row")
			console.log(row)
			
			// SE NÃO TEVE RETORNO
			if(row=="" || row==null || row==undefined || row=="null"){
				
				ret = false
				
			}
			else{

				var codFilial = $("#CODFILIALED").val()
				var codEstrutura = $("#CODESTRUTURAED___"+seq).val()
				var codOrdem = $("#CODORDEMED___"+seq).val()
				var codAtividade = $("#CODATIVIDADEED___"+seq).val()
				var idAtividade = $("#IDATIVIDADEED___"+seq).val()
				var idprd = $("#IDMATERIALED").val()
				var qtdreal = calculaQtdeReal(codFilial,codOrdem,codAtividade,idAtividade,codEstrutura,idprd)
				console.log(qtdreal)
				$("#QTDREALORIGINALED___"+seq).val(Number(qtdreal))
				AtualizaPesoArt("ED")

			}
			
		}
	}
	
	console.log("ret: "+ret)

	return ret
	
}

function calculaQtdeReal(codFilial,codOrdem,codAtividade,idAtividade,codEstrutura,idprd){

	// MONTA O ARRAY DAS CONSTRAINTS
	var a1 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("CODESTRUTURA",codEstrutura,codEstrutura,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("IDATVORDEM",idAtividade,idAtividade,ConstraintType.MUST)
	var a4 = DatasetFactory.createConstraint("IDPRD",idprd,idprd,ConstraintType.MUST)
	var a5 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
	var a6 = DatasetFactory.createConstraint("CODATIVIDADE",codAtividade,codAtividade,ConstraintType.MUST)
	
	var constraints = new Array(a1,a2,a3,a4,a5,a6)
	
	var dataset = DatasetFactory.getDataset("dsQtdRealPAPC",null,constraints,null)
	var row = dataset.values
	console.log(idprd+" row")
	console.log(row)
	
	return row[0]["QUANTIDADE"];

}

//ATUALIZA A O PESO ARITMÉTICO DOS REGISTROS QUE ESTÃO SFELECIONADOS 
function AtualizaPesoArt(process){

	if(process=="CAD"){
		
		$("#PESOTOTALCAD").val(0);

		$("input[id^='OSCAD___']").each(function(){

			var seq = $(this).attr("id").split("___")[1]
			
			if($("#INCLUIRCAD___"+seq).is(":checked")){

				var pesototal=$("#PESOTOTALCAD").val();
				$("#PESOTOTALCAD").val( Number(pesototal) + Number($("#QTDREALCAD___"+seq).val() ))
			}

		})


		$("input[id^='OSCAD___']").each(function(){
							
			var seq = $(this).attr("id").split("___")[1]
			
			// SE A OPÇÃO INCLUIR FOI SELECIONADO
			if($("#INCLUIRCAD___"+seq).is(":checked")){
		
				//	PESOARTCAD= QTDREALCAD / PESOTOTALCAD
				//  QTDREALCAD = QTDREALCAD * ( QTDPLANO / QTDPREVISTA)
				formataValorPonto($("#QTDEMPCAD"))
				var qtdmpplano = $("#QTDEMPCAD").val()
				formataValorVirgula($("#QTDEMPCAD"))

				var qtdeplano = $("#QTDEPLANOCAD___"+seq).val()

				var qtdeprevista = $("#QTDEPREVISTACAD___"+seq).val()

				var qtdrealanterior=$("#QTDREALCAD___"+seq).val()
				var qtdreal = Number($("#QTDREALORIGINALCAD___"+seq).val()) * (Number(qtdeplano) / Number(qtdeprevista))
				$("#PESOTOTALCAD").val( Number(qtdreal) + ( Number($("#PESOTOTALCAD").val()) - Number(qtdrealanterior)))
				$("#QTDREALCAD___"+seq).val(qtdreal)

				var pesototal = $("#PESOTOTALCAD").val()
				var pesoart = Number(qtdreal)/Number(pesototal)
				$("#PESOARTCAD___"+seq).val(Number(pesoart))
				$("#QTDMPFINALCAD___"+seq).val(Number(pesoart)*Number(qtdmpplano))


			}
		
		})

	}
	else if(process=="ED"){

		$("#PESOTOTALED").val(0);

		$("input[id^='OSED___']").each(function(){

			var seq = $(this).attr("id").split("___")[1]
			
			if($("#INCLUIRED___"+seq).is(":checked")){

				var pesototal=$("#PESOTOTALED").val();
				$("#PESOTOTALED").val( Number(pesototal) + Number($("#QTDREALED___"+seq).val() ))
			}

		})

		$("input[id^='OSED___']").each(function(){
							
			var seq = $(this).attr("id").split("___")[1]
			
			// SE A OPÇÃO INCLUIR FOI SELECIONADO
			if($("#INCLUIRED___"+seq).is(":checked")){
				
				//	PESOARTED = QTDREALED / PESOTOTALED
				formataValorPonto($("#QTDEMPED"))
				var qtdmpplano = $("#QTDEMPED").val()
				formataValorVirgula($("#QTDEMPED"))
			
				var qtdeplano = $("#QTDEPLANOED___"+seq).val()

				var qtdeprevista = $("#QTDEPREVISTAED___"+seq).val()

				var qtdrealanterior=$("#QTDREALED___"+seq).val()
				var qtdreal = Number($("#QTDREALORIGINALED___"+seq).val()) * (Number(qtdeplano) / Number(qtdeprevista))
				$("#PESOTOTALED").val( Number(qtdreal) + ( Number($("#PESOTOTALED").val() - Number(qtdrealanterior))))
				$("#QTDREALED___"+seq).val(qtdreal)

				var pesototal = $("#PESOTOTALED").val()
				var pesoart = Number(qtdreal)/Number(pesototal)
				$("#PESOARTED___"+seq).val(Number(pesoart))
				$("#QTDMPFINALED___"+seq).val(Number(pesoart)*Number(qtdmpplano))
				

			}
		
		})
		
	}

}

// CARREGA A LISTA DE ACORDO COM OS FILTROS PREENCHIDOS
function carregaLista(){
	
	console.log("entrei para carregar lista")

	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSCAD___']").each(function (){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var os = $("#INFOOSCAD___1").val()
		var numDesenho = $("#INFONUMDESENHOCAD___1").val()
		var execucao = $("#INFOEXECUCAOCAD___1").val()
		var codOrdem = $("#INFOCODORDEMCAD___1").val()
		var atividade = $("#INFOATIVIDADECAD___1").val()
		var posicao = $("#INFOPOSICAOCAD___1").val()
		var qtdePrevista = $("#INFOQTDEPREVISTACAD___1").val()

		var saldo = $("#INFOSALDOCAD___1").val()
		var qtdePlano = $("#INFOQTDEPLANOCAD___1").val()
		var item = $("#INFOITEMCAD___1").val()
		var material = $("#INFOMATERIALCAD___1").val()
		var bitola = $("#INFOBITOLACAD___1").val()

		var papc = $("#INFOPAPCCAD___1").val()
		var datanecessidade = $("#INFOPRIORIDADECAD___1").val()
		var semananecessidade = $("#INFODATANECESSIDADECAD___1").val()
		
		console.log("os: "+os+", numDesenho: "+numDesenho+", codOrdem: "+codOrdem+", atividade: "+
				atividade+", posicao: "+posicao+", qtdePrevista: "+qtdePrevista+", saldo: "+saldo+", qtdePlano: "+
				qtdePlano+", item: "+item+", material: "+material+", bitola: "+bitola+", execucao: "+execucao)
		
		var osLista = $("#OSCAD___"+seq).val()
		var numDesenhoLista = $("#NUMDESENHOCAD___"+seq).val()
		var execucaoLista = $("#EXECUCAOCAD___"+seq).val()
		var codOrdemLista = $("#CODORDEMCAD___"+seq).val()
		var atividadeLista = $("#ATIVIDADECAD___"+seq).val()
		var posicaoLista = $("#POSICAOCAD___"+seq).val()
		var qtdePrevistaLista = $("#QTDEPREVISTACAD___"+seq).val()
		var saldoLista = $("#SALDOCAD___"+seq).val()
		var qtdePlanoLista = $("#QTDEPLANOCAD___"+seq).val()
		var itemLista = $("#ITEMCAD___"+seq).val()
		var materialLista = $("#MATERIALCAD___"+seq).val()
		var bitolaLista = $("#BITOLACAD___"+seq).val()
		var papcLista = $("#PAPCCAD___"+seq).val()
		var datanecessidadeLista =  $("#CELDATANECESSIDADEGERALCAD___"+seq).val()
		var semananecessidadeLista = $("#CELSEMANANECESSIDADECAD___"+seq).val()
	
		console.log("osLista: "+osLista+", numDesenhoLista: "+numDesenhoLista+", codOrdemLista: "+codOrdemLista+
				", atividadeLista: "+atividadeLista+", posicaoLista: "+posicaoLista+", qtdePrevistaLista: "+
				qtdePrevistaLista+", saldoLista: "+saldoLista+", qtdePlanoLista: "+qtdePlanoLista+
				", itemLista: "+itemLista+", materialLista: "+materialLista+", bitolaLista: "+
				bitolaLista+", execucaoLista: "+execucaoLista)
	
		if(os=="" || os==null){
			console.log("filtro os esta vazio")
			os = osLista
		}
		if(numDesenho=="" || numDesenho==null){
			console.log("filtro numDesenho esta vazio")
			numDesenho = numDesenhoLista
		}
		if(execucao=="" || execucao==null){  
			console.log("filtro execucao esta vazio")
			execucao = execucaoLista
		}
		if(codOrdem=="" || codOrdem==null){  
			console.log("filtro codOrdem esta vazio")
			codOrdem = codOrdemLista
		}
		if(papc=="" || papc==null){  
			console.log("filtro papc esta vazio")
			papc = papcLista
		}
		if(atividade=="" || atividade==null){
			console.log("filtro atividade esta vazio")
			atividade = atividadeLista
		}
		if(posicao=="" || posicao==null){
			console.log("filtro posicao esta vazio")
			posicao = posicaoLista
		}
		if(qtdePrevista=="" || qtdePrevista==null){
			console.log("filtro qtdePrevista esta vazio")
			qtdePrevista = qtdePrevistaLista
		}
		if(saldo=="" || saldo==null){
			console.log("filtro saldo esta vazio")
			saldo = saldoLista
		}
		if(qtdePlano=="" || qtdePlano==null){
			console.log("filtro qtdePlano esta vazio")
			qtdePlano = qtdePlanoLista
		}
		if(datanecessidade=="" || datanecessidade==null){
			console.log("filtro prioridade esta vazio")
			datanecessidade = datanecessidadeLista
		}
		if(semananecessidade=="" || semananecessidade==null){
			console.log("filtro semananecessidade esta vazio")
			semananecessidade = semananecessidadeLista
		}
		if(item=="" || item==null){
			console.log("filtro itemLista esta vazio")
			item = itemLista
		}
		if(material=="" || material==null){
			console.log("filtro material esta vazio")
			material = materialLista
		}
		if(bitola=="" || bitola==null){
			console.log("filtro bitola esta vazio")
			bitola = bitolaLista
		}

		if($("#PRE_VISUALIZAR___1").hasClass("botao-pre-visualizar")){

			if($("#INCLUIRCAD___"+seq).is(":checked")){

				// SE FILTROS NÃO COINCIDE COM TODOS OS CAMPOS DO ITEM
				if(!(numDesenho==numDesenhoLista && os==osLista && codOrdem==codOrdemLista && execucao==execucaoLista &&
					atividade==atividadeLista && posicao==posicaoLista && qtdePrevista==qtdePrevistaLista && 
					saldo==saldoLista && qtdePlano==qtdePlanoLista && item==itemLista &&
					material==materialLista && bitola==bitolaLista && papc==papcLista && datanecessidade==datanecessidadeLista && semananecessidade == semananecessidadeLista)){
			
				/*if(!(os==osLista && codOrdem==codOrdemLista && qtdePrevista==qtdePrevistaLista &&
						atividade==atividadeLista && posicao==posicaoLista && item==itemLista &&
						material==materialLista && bitola==bitolaLista)){*/
					
					console.log("vou esconder LINHA___"+seq)
					
					console.log("os: "+os+" e osLista: "+osLista+", numDesenho: "+numDesenho+" e numDesenhoLista: "+numDesenhoLista+", execucao: "+execucao+" e execucaoLista: "+execucaoLista+", codOrdem: "+codOrdem+" e codOrdemLista: "+codOrdemLista+", atividade: "+
							atividade+" e atividadeLista: "+atividadeLista+", posicao: "+posicao+" e posicaoLista: "+posicaoLista+", qtdePrevista: "+qtdePrevista+" e qtdePrevistaLista: "+qtdePrevistaLista+", saldo: "+saldo+" e saldoLista: "+saldoLista+", qtdePlano: "+
							qtdePlano+" e qtdePlanoLista: "+qtdePlanoLista+", item: "+item+" e itemLista: "+itemLista+", material: "+material+" e materialLista: "+materialLista+", bitola: "+bitola+" e bitolaLista: "+bitolaLista)
					
					$("#LINHACAD___"+seq).hide()
					$("#LINHACAD___"+seq).addClass("invisivel")
					
				} else {
					
					console.log("vou exibir LINHA___"+seq)
					
					console.log("os: "+os+" e osLista: "+osLista+", numDesenho: "+numDesenho+" e numDesenhoLista: "+numDesenhoLista+", execucao: "+execucao+" e execucaoLista: "+execucaoLista+", codOrdem: "+codOrdem+" e codOrdemLista: "+codOrdemLista+", atividade: "+
							atividade+" e atividadeLista: "+atividadeLista+", posicao: "+posicao+" e posicaoLista: "+posicaoLista+", qtdePrevista: "+qtdePrevista+" e qtdePrevistaLista: "+qtdePrevistaLista+", saldo: "+saldo+" e saldoLista: "+saldoLista+", qtdePlano: "+
							qtdePlano+" e qtdePlanoLista: "+qtdePlanoLista+", item: "+item+" e itemLista: "+itemLista+", material: "+material+" e materialLista: "+materialLista+", bitola: "+bitola+" e bitolaLista: "+bitolaLista)
					
					$("#LINHACAD___"+seq).show()
					$("#LINHACAD___"+seq).removeClass("invisivel")
					
				}


			}

		}
		else{
		
			// SE FILTROS NÃO COINCIDE COM TODOS OS CAMPOS DO ITEM
			if(!(numDesenho==numDesenhoLista && os==osLista && codOrdem==codOrdemLista && execucao==execucaoLista &&
					atividade==atividadeLista && posicao==posicaoLista && qtdePrevista==qtdePrevistaLista && 
					saldo==saldoLista && qtdePlano==qtdePlanoLista && item==itemLista &&
					material==materialLista && bitola==bitolaLista && papc==papcLista && datanecessidade==datanecessidadeLista && semananecessidade == semananecessidadeLista)){
			
			/*if(!(os==osLista && codOrdem==codOrdemLista && qtdePrevista==qtdePrevistaLista &&
					atividade==atividadeLista && posicao==posicaoLista && item==itemLista &&
					material==materialLista && bitola==bitolaLista)){*/
				
				console.log("vou esconder LINHA___"+seq)
				
				console.log("os: "+os+" e osLista: "+osLista+", numDesenho: "+numDesenho+" e numDesenhoLista: "+numDesenhoLista+", execucao: "+execucao+" e execucaoLista: "+execucaoLista+", codOrdem: "+codOrdem+" e codOrdemLista: "+codOrdemLista+", atividade: "+
						atividade+" e atividadeLista: "+atividadeLista+", posicao: "+posicao+" e posicaoLista: "+posicaoLista+", qtdePrevista: "+qtdePrevista+" e qtdePrevistaLista: "+qtdePrevistaLista+", saldo: "+saldo+" e saldoLista: "+saldoLista+", qtdePlano: "+
						qtdePlano+" e qtdePlanoLista: "+qtdePlanoLista+", item: "+item+" e itemLista: "+itemLista+", material: "+material+" e materialLista: "+materialLista+", bitola: "+bitola+" e bitolaLista: "+bitolaLista)
				
				$("#LINHACAD___"+seq).hide()
				$("#LINHACAD___"+seq).addClass("invisivel")
				
			} else {
				
				console.log("vou exibir LINHA___"+seq)
				
				console.log("os: "+os+" e osLista: "+osLista+", numDesenho: "+numDesenho+" e numDesenhoLista: "+numDesenhoLista+", execucao: "+execucao+" e execucaoLista: "+execucaoLista+", codOrdem: "+codOrdem+" e codOrdemLista: "+codOrdemLista+", atividade: "+
						atividade+" e atividadeLista: "+atividadeLista+", posicao: "+posicao+" e posicaoLista: "+posicaoLista+", qtdePrevista: "+qtdePrevista+" e qtdePrevistaLista: "+qtdePrevistaLista+", saldo: "+saldo+" e saldoLista: "+saldoLista+", qtdePlano: "+
						qtdePlano+" e qtdePlanoLista: "+qtdePlanoLista+", item: "+item+" e itemLista: "+itemLista+", material: "+material+" e materialLista: "+materialLista+", bitola: "+bitola+" e bitolaLista: "+bitolaLista)
				
				$("#LINHACAD___"+seq).show()
				$("#LINHACAD___"+seq).removeClass("invisivel")
				
			}

		}
		
	})
	
	console.log("terminei de carregar lista")
	
}

// CARREGA A LISTA DE ACORDO COM OS FILTROS PREENCHIDOS
function carregaListaEd(){
	
	console.log("entrei para carregar lista")

	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSED___']").each(function (){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var os = $("#INFOOSED___1").val()
		var numDesenho = $("#INFONUMDESENHOED___1").val()
		var execucao = $("#INFOEXECUCAOED___1").val()
		var codOrdem = $("#INFOCODORDEMED___1").val()
		var atividade = $("#INFOATIVIDADEED___1").val()
		var posicao = $("#INFOPOSICAOED___1").val()
		var qtdePrevista = $("#INFOQTDEPREVISTAED___1").val()

		var saldo = $("#INFOSALDOED___1").val()
		var qtdePlano = $("#INFOQTDEPLANOED___1").val()
		var item = $("#INFOITEMED___1").val()
		var material = $("#INFOMATERIALED___1").val()
		var bitola = $("#INFOBITOLAED___1").val()

		var papc = $("#INFOPAPCED___1").val()
		var prioridade = $("#INFOPRIORIDADEED___1").val()
		var datanecessidade = $("#INFODATANECESSIDADEED___1").val()
		
		console.log("os: "+os+", numDesenho: "+numDesenho+", codOrdem: "+codOrdem+", execucao: "+execucao+", atividade: "+
				atividade+", posicao: "+posicao+", qtdePrevista: "+qtdePrevista+", saldo: "+saldo+", qtdePlano: "+
				qtdePlano+", item: "+item+", material: "+material+", bitola: "+bitola)
		
		var osLista = $("#OSED___"+seq).val()
		var numDesenhoLista = $("#NUMDESENHOED___"+seq).val()
		var execucaoLista = $("#EXECUCAOED___"+seq).val()
		var codOrdemLista = $("#CODORDEMED___"+seq).val()
		var atividadeLista = $("#ATIVIDADEED___"+seq).val()
		var posicaoLista = $("#POSICAOED___"+seq).val()
		var qtdePrevistaLista = $("#QTDEPREVISTAED___"+seq).val()
		var saldoLista = $("#SALDOED___"+seq).val()
		var qtdePlanoLista = $("#QTDEPLANOED___"+seq).val()
		var itemLista = $("#ITEMED___"+seq).val()
		var materialLista = $("#MATERIALED___"+seq).val()
		var bitolaLista = $("#BITOLAED___"+seq).val()
		var papcLista = $("#PAPCED___"+seq).val()
		var prioridadeLista =  $("#CELDATANECESSIDADEED___"+seq).val()
		var datanecessidadeLista = $("#CELDATANECESSIDADEED___"+seq).val()
	
		console.log("osLista: "+osLista+", numDesenhoLista: "+numDesenhoLista+", execucaoLista: "+execucaoLista+", codOrdemLista: "+codOrdemLista+
				", atividadeLista: "+atividadeLista+", posicaoLista: "+posicaoLista+", qtdePrevistaLista: "+
				qtdePrevistaLista+", saldoLista: "+saldoLista+", qtdePlanoLista: "+qtdePlanoLista+
				", itemLista: "+itemLista+", materialLista: "+materialLista+", bitolaLista: "+
				bitolaLista)
	
		if(os=="" || os==null){
			console.log("filtro os esta vazio")
			os = osLista
		}
		if(numDesenho=="" || numDesenho==null){
			console.log("filtro numDesenho esta vazio")
			numDesenho = numDesenhoLista
		}
		if(execucao=="" || execucao==null){  
			console.log("filtro execucao esta vazio")
			execucao = execucaoLista
		}
		if(codOrdem=="" || codOrdem==null){  
			console.log("filtro codOrdem esta vazio")
			codOrdem = codOrdemLista
		}
		if(papc=="" || papc==null){  
			console.log("filtro papc esta vazio")
			papc = papcLista
		}
		if(atividade=="" || atividade==null){
			console.log("filtro atividade esta vazio")
			atividade = atividadeLista
		}
		if(posicao=="" || posicao==null){
			console.log("filtro posicao esta vazio")
			posicao = posicaoLista
		}
		if(qtdePrevista=="" || qtdePrevista==null){
			console.log("filtro qtdePrevista esta vazio")
			qtdePrevista = qtdePrevistaLista
		}
		if(saldo=="" || saldo==null){
			console.log("filtro saldo esta vazio")
			saldo = saldoLista
		}
		if(qtdePlano=="" || qtdePlano==null){
			console.log("filtro qtdePlano esta vazio")
			qtdePlano = qtdePlanoLista
		}
		if(prioridade=="" || prioridade==null){
			console.log("filtro prioridade esta vazio")
			prioridade = prioridadeLista
		}
		if(datanecessidade=="" || datanecessidade==null){
			console.log("filtro datanecessidade esta vazio")
			datanecessidade = datanecessidadeLista
		}
		if(item=="" || item==null){
			console.log("filtro itemLista esta vazio")
			item = itemLista
		}
		if(material=="" || material==null){
			console.log("filtro material esta vazio")
			material = materialLista
		}
		if(bitola=="" || bitola==null){
			console.log("filtro bitola esta vazio")
			bitola = bitolaLista
		}
		
		// SE FILTROS NÃO COINCIDE COM TODOS OS CAMPOS DO ITEM
		if(!(numDesenho==numDesenhoLista && os==osLista && codOrdem==codOrdemLista && execucao==execucaoLista &&
				atividade==atividadeLista && posicao==posicaoLista && qtdePrevista==qtdePrevistaLista && 
				saldo==saldoLista && qtdePlano==qtdePlanoLista && item==itemLista &&
				material==materialLista && bitola==bitolaLista && papc==papcLista && prioridade==prioridadeLista && datanecessidade == datanecessidadeLista)){
		
		/*if(!(os==osLista && codOrdem==codOrdemLista && qtdePrevista==qtdePrevistaLista &&
				atividade==atividadeLista && posicao==posicaoLista && item==itemLista &&
				material==materialLista && bitola==bitolaLista)){*/
			
			console.log("vou esconder LINHA___"+seq)
			
			console.log("os: "+os+" e osLista: "+osLista+", numDesenho: "+numDesenho+" e numDesenhoLista: "+numDesenhoLista+", execucao: "+execucao+" e execucaoLista: "+execucaoLista+", codOrdem: "+codOrdem+" e codOrdemLista: "+codOrdemLista+", atividade: "+
					atividade+" e atividadeLista: "+atividadeLista+", posicao: "+posicao+" e posicaoLista: "+posicaoLista+", qtdePrevista: "+qtdePrevista+" e qtdePrevistaLista: "+qtdePrevistaLista+", saldo: "+saldo+" e saldoLista: "+saldoLista+", qtdePlano: "+
					qtdePlano+" e qtdePlanoLista: "+qtdePlanoLista+", item: "+item+" e itemLista: "+itemLista+", material: "+material+" e materialLista: "+materialLista+", bitola: "+bitola+" e bitolaLista: "+bitolaLista)
			
			$("#LINHAED___"+seq).hide()
			$("#LINHAED___"+seq).addClass("invisivel")
			
		} else {
			
			console.log("vou exibir LINHA___"+seq)
			
			console.log("os: "+os+" e osLista: "+osLista+", numDesenho: "+numDesenho+" e numDesenhoLista: "+numDesenhoLista+", execucao: "+execucao+" e execucaoLista: "+execucaoLista+", codOrdem: "+codOrdem+" e codOrdemLista: "+codOrdemLista+", atividade: "+
					atividade+" e atividadeLista: "+atividadeLista+", posicao: "+posicao+" e posicaoLista: "+posicaoLista+", qtdePrevista: "+qtdePrevista+" e qtdePrevistaLista: "+qtdePrevistaLista+", saldo: "+saldo+" e saldoLista: "+saldoLista+", qtdePlano: "+
					qtdePlano+" e qtdePlanoLista: "+qtdePlanoLista+", item: "+item+" e itemLista: "+itemLista+", material: "+material+" e materialLista: "+materialLista+", bitola: "+bitola+" e bitolaLista: "+bitolaLista)
			
			$("#LINHAED___"+seq).show()
			$("#LINHAED___"+seq).removeClass("invisivel")
			
		}
		
	})
	
	console.log("terminei de carregar lista")
	
}

// LIMPA O CONTEÚDO DA TABELA DE CADASTRO
function limpaTabelaCadastro(){
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSCAD___']").each(function(){
		
		$(this).parents("tr").remove();
		
	})

	$("#REPROGRAMADO").text(0)
	$("#CONCLUIDO").text(0)
	$("#PENDENCIA").text(0)
	$("#PARCIAL").text(0)
	$("#RETRABALHO").text(0)
	$("#TODOS").text(0)
	
}

// LIMPA O CONTEÚDO DA TABELA DE EDIÇÃO
function limpaTabelaEdicao(){
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSED___']").each(function(){
		
		$(this).parents("tr").remove();
		
	})
	
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

// VERIFICA O CONTEÚDO DAS TABELAS E MOSTRA/ESCONDE
function verificaTabelas(){
	
	// SE TABELA DE CADASTRO TEM ITENS
	if(tabelaCadTemItens()){
		
		$(".CAD").show()
		
	} else {
		// SE NÃO
		
		$(".CAD").hide()
		
	}
	
	// SE TABELA DE EDIÇÃO TEM ITENS
	if(tabelaEdTemItens()){
		
		$(".ED").show()
		
	} else {
		// SE NÃO
		
		$(".ED").hide()
		
	}
	
}

// VERIFICA SE TABELA DE CADASTRO TEM ITENS
function tabelaCadTemItens(){
	
	var ret = false
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSCAD___']").each(function(){
	
		ret = true
		
	})
	
	return ret
	
}

// VERIFICA SE TABELA DE EDIÇÃO TEM ITENS
function tabelaEdTemItens(){
	
	var ret = false
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSED___']").each(function(){
	
		ret = true
		
	})
	
	return ret
	
}

// EXIBE/MOSTRA TÍTULO
function titulo(op){
	
	// SE OPÇÃO É CADASTRAR
	if(op==1){
		
		$(".CADASTRO").show()
		$(".EDICAO").hide()
		$(".filtrosCadastro").show()
		$(".filtrosEdicao").hide()
		AtualizaTabelaCad()
		
	} 
	
	// SE OPÇÃO É EDITAR
	if(op==2){
		
		$(".CADASTRO").hide()
		$(".EDICAO").show()
		$(".filtrosCadastro").hide()
		$(".filtrosEdicao").show()
		AtualizaTabelaEd()
		
	}
	
}

function AtualizaTabelaEd(){

	if($(".ED").is(":visible")){

		buscarPlano();

	}

}

function AtualizaTabelaCad(){

	if($(".CAD").is(":visible")){

		buscarPlano();

	}

}

// INCLUIR/CADASTRAR O PLANO DE CORTE
function incluirPlano(){
	
	var myLoading2 = FLUIGC.loading(window);
	
	myLoading2.show();

	var incluido = false
	var faltaQtde = false
	var numPlano = $("#NUMPLANO").val()
	var dataCriacao = $("#DATACRIACAOBANCO").val()
	var filial = $("#CODFILIAL").val()
	var codSucata = $("#CODPRDSUCATACAD").val()
	var qtdeSucata = $("#QTDESUCATAPLANCAD").val()
	var codMP = $("#CODMATERIALCAD").val()
	var qtdeMP = $("#QTDEMPCAD").val()
	var retalho = $("#RETALHOCAD").val()
	var numLote = $("#NUMLOTECAD").val()
	var idLote = $("#IDLOTECAD").val()

	var usuario2  = $("#USUARIOATUAL").val()
	usuario2 = getUser(usuario2)
			
	console.log("VOU COMEÇAR A INCLUIR O PLANO")
	
	var numPlano = $("#NUMPLANO").val()
	numPlano = numPlano.trim()
	
	// SE NÚMERO DO PLANO FOI INFORMADO
	if(!((numPlano=="" || numPlano==null || numPlano==undefined) || (dataCriacao=="" || dataCriacao==null || dataCriacao==undefined) || 
			(codSucata=="" || codSucata==null || codSucata==undefined) || (qtdeSucata=="" || qtdeSucata==null || qtdeSucata==undefined) 
			|| (codMP=="" || codMP==null || codMP==undefined) || (qtdeMP=="" || qtdeMP==null || qtdeMP==undefined)
			|| (numLote=="" || numLote==null || numLote==undefined) || (idLote=="" || idLote==null || idLote==undefined))){
		
		// VERIFICA SE TODOS OS ITENS QUE SERÃO INCLUÍDOS TEM QUANTIDADE INFORMADA
		faltaQtde = verificaQtdeCad()
		
		// SE FALTA QUANTIDADE
		if(faltaQtde){
			
			myLoading2.hide();
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'Há itens selecionados que não tiveram a quantidade informada',
				  text: 'Verifique e tente novamente.'
			})
			
		} else {
			
			// SE A MP SELECIONADA FOI CADASTRADA NA ESTRUTURA PARA AS OP'S SELECIONADAS
			if(verificaMP()){

				if(verificaFinalNumPlanoCad()==true){

					myLoading2.hide();
					// LIMPA O NÚMERO DO PLANO DE CORTE
					$("#NUMPLANO").val("")
					$("#NUMPLANO").focus()
					
					// EXIBE ALERTA
					Swal.fire({
						  icon: 'error',
						  title: 'O número informado do Plano de Corte já foi cadastrado',
						  text: 'Verifique e tente novamente.'
					})
			
				}
				else if(!(verificaQTDFinalCAD())){

					myLoading2.hide();
			
						// EXIBE ALERTA
						Swal.fire({
							icon: 'error',
							title: 'A quantidade precisa de ser recalculada',
							text: 'Insira novamente o valor do retalho e da sucata'
						})

					$("#QTDRETALHOCAD").val("");
					$("#QTDESUCATAPLANCAD").val("");
					$("#QTDEMPCAD").val("");
					CalculaSaldoDisponivelCAD();
					
				}
				else{
				
					// PERCORRE TODOS OS REGISTROS DA TABELA DE CADASTRO DE PLANO DE CORTE
					$("input[id^='OSCAD___']").each(function(){
						
						var seq = $(this).attr("id").split("___")[1]
						
						console.log("linha "+seq)
						
						// SE A OPÇÃO INCLUIR FOI SELECIONADO
						if($("#INCLUIRCAD___"+seq).is(":checked")){
							
							incluido = true

							procuraIguaiseExcluiCad(seq)

							console.log("VOU DELETAR A NECESSIDADE DA LINHA "+seq)

							var codColigadaseq = $("#CODCOLIGADACAD___"+seq).val()
							var codfilialseq = $("#CODFILIALCAD___"+seq).val()
							var codOrdemseq = $("#CODORDEMCAD___"+seq).val()
							var codEstruturaseq = $("#CODESTRUTURACAD___"+seq).val()
							var idatvordemseq = $("#IDATIVIDADECAD___"+seq).val()
							var codatividadeseq = $("#CODATIVIDADECAD___"+seq).val()
							var prioridadeseq = $("#VALPRIORIDADEORIGINALCAD___"+seq).val()
							var semananecessidadeseq = $("#CELSEMANAORIGINALCAD___"+seq).val()
							var papcseq = $("#PAPCCAD___"+seq).val()
							var prioridadereprog = $("#VALPRIORIDADEREPROGRAMACAOCAD___"+seq).val()
							var semanareprog = $("#VALDATAREPROGRAMACAOCAD___"+seq).val()
							var nseqpedido=$("#NSEQPEDIDOCAD___"+seq).val()
							

							execDeleteNecessidade(//codColigadaseq,codfilialseq,codOrdemseq,codEstruturaseq,idatvordemseq,codatividadeseq,prioridadeseq,semananecessidadeseq,papcseq,prioridadereprog,semanareprog,
								nseqpedido)

							console.log("VOU ATUALIZAR A NECESSIDADE DA LINHA "+seq)

							var quantidadeseq = $("#SALDOCADORIGINAL___"+seq).val()
							var quantidadeoriginal = $("#QTDENECESSIDADECADORIGINAL___"+seq).val()
							var complemento = $("#COMPLEMENTOANTIGOCAD___"+seq).val()

							var quantidade = ( $("#QTDEPLANOCADINSERT___"+seq).val() == null || $("#QTDEPLANOCADINSERT___"+seq).val() == "" || $("#QTDEPLANOCADINSERT___"+seq).val()==undefined ) ? Number($("#QTDENECESSIDADECADORIGINAL___"+seq).val()) - Number($("#SALDOCAD___"+seq).val()) : $("#QTDEPLANOCADINSERT___"+seq).val()

							var observacao = $("#OBSERVACAOANTIGACAD___"+seq).val()

							var usuario1 = $("#USUARIOORIGINALCAD___"+seq).val()
							var dataoriginal = $("#DATAORIGINALCAD___"+seq).val()

							var datanecessidadeoriginal = $("#VALDATANECESSIDADECAD___"+seq).val()
							var prioridadeoriginal = $("#VALPRIORIDADEORIGINALCAD___"+seq).val()
							var semananecessidade = $("#CELSEMANAORIGINALCAD___"+seq).val()
							var lognecessidade = $("#LOGORIGINALCAD___"+seq).val()
							var datanecessidade = $("#VALDATAREPROGRAMACAOCAD___"+seq).val()
							var prioridade = $("#VALPRIORIDADEREPROGRAMACAOCAD___"+seq).val()
							var semanareprogseq = $("#CELSEMANAREPROGORIGINALCAD___"+seq).val()

							if(lognecessidade=="" || lognecessidade==null || lognecessidade==undefined || lognecessidade=="null"){

								lognecessidade=""

							}

							if(quantidade < quantidadeseq){
								
								lognecessidade += "Necessidade parcialmente atendida com o plano "+numPlano+" pelo usuario "+usuario2+" dia "+new Date().toLocaleDateString()+";"

								// EXECUTA A PROCEDURE PARA INSERIR UMA NECESSIDADE
								execInsertNecessidade(codColigadaseq,codfilialseq,codOrdemseq,codEstruturaseq,idatvordemseq,codatividadeseq,quantidadeoriginal,usuario1,usuario2,prioridadeoriginal
									,complemento,datanecessidadeoriginal,papcseq,1,observacao,dataoriginal,datanecessidade,semananecessidade,semanareprogseq,prioridade,lognecessidade,quantidade)

							}
							else if(quantidade >= quantidadeseq){

								lognecessidade += "Necessidade completamente atendida com o plano "+numPlano+" pelo usuario "+usuario2+" dia "+new Date().toLocaleDateString()+";"

								// EXECUTA A PROCEDURE PARA INSERIR UMA NECESSIDADE
								execInsertNecessidade(codColigadaseq,codfilialseq,codOrdemseq,codEstruturaseq,idatvordemseq,codatividadeseq,quantidadeoriginal,usuario1,usuario2,prioridadeoriginal
									,complemento,datanecessidadeoriginal,papcseq,2,observacao,dataoriginal,datanecessidade,semananecessidade,semanareprogseq,prioridade,lognecessidade,quantidade)

							}
							
							console.log("VOU INSERIR O PLANO DA LINHA "+seq)
							
							var osCad = $("#OSCAD___"+seq).val()
							var codEstrutura = $("#CODESTRUTURACAD___"+seq).val()
							var codOrdem = $("#CODORDEMCAD___"+seq).val()
							var codAtividade = $("#CODATIVIDADECAD___"+seq).val()
							var idAtividade = $("#IDATIVIDADECAD___"+seq).val()
							var posicao = $("#POSICAOCAD___"+seq).val()
							var item = $("#ITEMCAD___"+seq).val()
							var material = $("#MATERIALCAD___"+seq).val()
							var bitola = $("#BITOLACAD___"+seq).val()
							var qtdempfinal= $("#QTDMPFINALCAD___"+seq).val()
							var quantidade = $("#QTDEPLANOCAD___"+seq).val()
							//var qtdreal = calculaQtdeReal(codFilial,codOrdem,codAtividade,idAtividade,codEstrutura,idprd)
							//console.log("qtdereal ="+qtdreal)
							
							// EXECUTA A PROCEDURE PARA INSERIR UM PLANO DE CORTE
							execInsertPlanoCorte(codOrdem,codEstrutura,idAtividade,numPlano,quantidade,filial,codSucata,qtdeSucata,codMP,qtdeMP,retalho,numLote,idLote,qtdempfinal,codAtividade)

						}
						
					})
					
					// SE NENHUM ITEM FOI INCLUIDO
					if(!(incluido)){
						
						myLoading2.hide();
						
						// EXIBE ALERTA
						Swal.fire({
							icon: 'error',
							title: 'Não há itens selecionados para incluir',
							text: 'Verifique e tente novamente.'
						})
						
					} else {
						// SE NÃO
						
						// LIMPAR TABELA DO CADASTRO
						limparTabelaCadastro()
						
						// LIMPA OS DADOS DO CABEÇALHO DO CADASTRO
						limpaCabecalhoCadastro()
						
						// VERIFICA SE VAI EXIBIR/ESCONDE TABELAS
						verificaTabelas()
						
						// HABILITA OS CAMPOS
						$("#ATIVIDADEPLANCAD").prop("disabled",true)
						$("#MATERIALPLANCAD").prop("disabled",true)
						
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
							title: 'Plano de corte incluído com sucesso!'
						})	
						
					}
				
				}
			
			} else {
				// SE NÃO
				
				myLoading2.hide();
				
				// EXIBE ALERTA
				Swal.fire({
					  icon: 'error',
					  title: "A matéria-prima selecionada não foi cadastrada na estrutura para as OP's selecionadas!",
					  text: 'Verifique e tente novamente.'
				})
				
			}
				
		}
		
	} else {
		// SE NÃO
		
		myLoading2.hide();
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'Campos obrigatórios não foram preenchidos!',
			  text: 'Verifique e tente novamente.'
		})
		
	}
	
	// DESATIVA O LOAD
	setTimeout(function(){
		
		myLoading2.hide();
		
	},500)
	
}


function enviaNotificacao(){

	$.ajax({

		method:"POST",
		url:"/api/alert/service/sendAlert",
		data:{
			"eventKey" : "NEW_TASK_FROM_TASK_LIST", //REQUIRED String that represents the event who generates the alert
			"loginReceiver" : "rafael.granja", //REQUIRED User login (alias, idpId or userCode) who will receive the alert
			"object" : {
				"alertObjectId" : "1", // the object id
				"alertObjectClass" : "com.fluig.Class", // the object class full name
				"alertObjectTypeDescriptionKey" : "sociable.the.task", // the key for search the object description in I18n
				"alertObjectDescription" : "Cadastro de PA e PC", // the object description showed in the alert
				"alertObjectLink" : "/pageworkflowview?processID=Necessidadede%20Plano%20de%20Corte%20e%20Aproveitamento", // the link to access the object
				"alertObjectDetailKey" : "", //
				"alertObjectNote" : "" // the alert note
			}
		}

	})


}


function procuraIguaiseExcluiCad(_seq){
	
	var codColigada = $("#CODCOLIGADACAD___"+_seq).val()
	var codfilial = $("#CODFILIALCAD___"+_seq).val()
	var codOrdem = $("#CODORDEMCAD___"+_seq).val()
	var codEstrutura = $("#CODESTRUTURACAD___"+_seq).val()
	var idatvordem = $("#IDATIVIDADECAD___"+_seq).val()
	var codatividade = $("#CODATIVIDADECAD___"+_seq).val()

	var numPlano = $("#NUMPLANO").val()
	numPlano = numPlano.trim()

	var usuario2  = $("#USUARIOATUAL").val()
	usuario2 = getUser(usuario2)

	$("input[id^='OSCAD___']").each(function(){
									
		var seq = $(this).attr("id").split("___")[1]

		
		console.log("linha "+seq)
		
		// SE A OPÇÃO INCLUIR FOI SELECIONADO
		if($("#INCLUIRCAD___"+seq).is(":checked") && seq!=_seq){

			var codColigadaseq = $("#CODCOLIGADACAD___"+seq).val()
			var codfilialseq = $("#CODFILIALCAD___"+seq).val()
			var codOrdemseq = $("#CODORDEMCAD___"+seq).val()
			var codEstruturaseq = $("#CODESTRUTURACAD___"+seq).val()
			var idatvordemseq = $("#IDATIVIDADECAD___"+seq).val()
			var codatividadeseq = $("#CODATIVIDADECAD___"+seq).val()
			var prioridadeseq = $("#VALPRIORIDADEORIGINALCAD___"+seq).val()
			var semananecessidadeseq = $("#CELSEMANAORIGINALCAD___"+seq).val()
			var papcseq = $("#PAPCCAD___"+seq).val()
			var prioridadereprog = $("#VALPRIORIDADEREPROGRAMACAOCAD___"+seq).val()
			var semanareprog = $("#VALDATAREPROGRAMACAOCAD___"+seq).val()
			var nseqpedido=$("#NSEQPEDIDOCAD___"+seq).val()

			if(codColigadaseq==codColigada && codfilialseq==codfilial && codOrdemseq==codOrdem && codEstruturaseq==codEstrutura && idatvordemseq==idatvordem && codatividadeseq==codatividade){

				console.log("VOU deletar A NECESSIDADE DA LINHA "+seq)
			
				execDeleteNecessidade(//codColigadaseq,codfilialseq,codOrdemseq,codEstruturaseq,idatvordemseq,codatividadeseq,prioridadeseq,semananecessidadeseq,papcseq,prioridadereprog,semanareprog,
				nseqpedido)

				console.log("VOU ATUALIZAR A NECESSIDADE DA LINHA "+seq)

				var quantidadeseq = $("#QTDENECESSIDADECADORIGINAL___"+seq).val()
				var complemento = $("#COMPLEMENTOANTIGOCAD___"+seq).val()

				//var quantidade = $("#QTDEPLANOCAD___"+seq).val()
				var quantidade = Number($("#QTDENECESSIDADECADORIGINAL___"+seq).val()) - Number($("#SALDOCAD___"+seq).val())

				var observacao = $("#OBSERVACAOANTIGACAD___"+seq).val()

				var usuario1 = $("#USUARIOORIGINALCAD___"+seq).val()
				var dataoriginal = $("#DATAORIGINALCAD___"+seq).val()

				var datanecessidadeoriginal = $("#VALDATANECESSIDADECAD___"+seq).val()
				var prioridadeoriginal = $("#VALPRIORIDADEORIGINALCAD___"+seq).val()
				var semananecessidade = $("#CELSEMANAORIGINALCAD___"+seq).val()
				var lognecessidade = $("#LOGORIGINALCAD___"+seq).val()
				var datanecessidade = $("#VALDATAREPROGRAMACAOCAD___"+seq).val()
				var prioridade = $("#VALPRIORIDADEREPROGRAMACAOCAD___"+seq).val()
				var semanareprogseq = $("#CELSEMANAREPROGORIGINALCAD___"+seq).val()

				if(lognecessidade=="" || lognecessidade==null || lognecessidade==undefined || lognecessidade=="null"){

					lognecessidade=""

				}

				if(quantidade < quantidadeseq){
					
					lognecessidade += "Necessidade parcialmente atendida com o plano "+numPlano+" pelo usuario "+usuario2+" dia "+new Date().toLocaleDateString()+";"

					// EXECUTA A PROCEDURE PARA INSERIR UMA NECESSIDADE
					execInsertNecessidade(codColigadaseq,codfilialseq,codOrdemseq,codEstruturaseq,idatvordemseq,codatividadeseq,quantidadeseq,usuario1,usuario2,prioridadeoriginal
						,complemento,datanecessidadeoriginal,papcseq,1,observacao,dataoriginal,datanecessidade,semananecessidade,semanareprogseq,prioridade,lognecessidade,quantidade)

				}
				else if(quantidade >= quantidadeseq){

					lognecessidade += "Necessidade completamente atendida com o plano "+numPlano+" pelo usuario "+usuario2+" dia "+new Date().toLocaleDateString()+";"

					// EXECUTA A PROCEDURE PARA INSERIR UMA NECESSIDADE
					execInsertNecessidade(codColigadaseq,codfilialseq,codOrdemseq,codEstruturaseq,idatvordemseq,codatividadeseq,quantidadeseq,usuario1,usuario2,prioridadeoriginal
						,complemento,datanecessidadeoriginal,papcseq,2,observacao,dataoriginal,datanecessidade,semananecessidade,semanareprogseq,prioridade,lognecessidade,quantidade)

				}

				$("#QTDEPLANOCADINSERT___"+_seq).val($("#QTDEPLANOCAD___"+_seq).val())
			
				var quantidade = Number($("#QTDEPLANOCAD___"+_seq).val()) + Number($("#QTDEPLANOCAD___"+seq).val())
				var quantidade2 = Number( $("#SALDOCADORIGINAL___"+_seq).val()) + Number($("#SALDOCADORIGINAL___"+seq).val())

				console.log("quantidade corrigida :"+ quantidade)
				console.log("quantidade2 corrigida :"+ quantidade2)

				$("#QTDEPLANOCAD___"+_seq).val(quantidade)
				$("#SALDOCADORIGINAL___"+_seq).val(quantidade2)

				$("#INCLUIRCAD___"+seq).click()

				verificaQtdePlanoCad($("#QTDEPLANOCAD___"+_seq))

			}
			
		}
		
	})
}


function procuraIguaiseExcluiEd(_seq){
	
	var codColigada = $("#CODCOLIGADAED___"+_seq).val()
	var codfilial = $("#CODFILIALEDS___"+_seq).val()
	var codOrdem = $("#CODORDEMED___"+_seq).val()
	var codEstrutura = $("#CODESTRUTURAED___"+_seq).val()
	var idatvordem = $("#IDATIVIDADEED___"+_seq).val()
	var codatividade = $("#CODATIVIDADEED___"+_seq).val()

	var numPlano = $("#NUMPLANO").val()
	numPlano = numPlano.trim()

	var usuario2  = $("#USUARIOATUAL").val()
	usuario2 = getUser(usuario2)

	$("input[id^='OSED___']").each(function(){
									
		var seq = $(this).attr("id").split("___")[1]

		
		console.log("linha "+seq)
		
		// SE A OPÇÃO INCLUIR FOI SELECIONADO
		if($("#INCLUIRED___"+seq).is(":checked") && seq!=_seq){

			var codColigadaseq = $("#CODCOLIGADAED___"+seq).val()
			var codfilialseq = $("#CODFILIALEDS___"+seq).val()
			var codOrdemseq = $("#CODORDEMED___"+seq).val()
			var codEstruturaseq = $("#CODESTRUTURAED___"+seq).val()
			var idatvordemseq = $("#IDATIVIDADEED___"+seq).val()
			var codatividadeseq = $("#CODATIVIDADEED___"+seq).val()
			var prioridadeseq = $("#VALPRIORIDADEORIGINALED___"+seq).val()
			var semananecessidadeseq = $("#CELSEMANAORIGINALED___"+seq).val()
			var papcseq = $("#PAPCED___"+seq).val()
			var prioridadereprog = $("#VALPRIORIDADEREPROGRAMACAOED___"+seq).val()
			var semanareprog = $("#VALDATAREPROGRAMACAOED___"+seq).val()
			var nseqpedido=$("#NSEQPEDIDOED___"+seq).val()

			if(codColigadaseq==codColigada && codfilialseq==codfilial && codOrdemseq==codOrdem && codEstruturaseq==codEstrutura && idatvordemseq==idatvordem && codatividadeseq==codatividade){

				console.log("VOU deletar A NECESSIDADE DA LINHA "+seq)
			
				execDeleteNecessidade(//codColigadaseq,codfilialseq,codOrdemseq,codEstruturaseq,idatvordemseq,codatividadeseq,prioridadeseq,semananecessidadeseq,papcseq,prioridadereprog,semanareprog,
					nseqpedido)

				console.log("VOU ATUALIZAR A NECESSIDADE DA LINHA "+seq)

				var quantidadeseq = $("#QTDENECESSIDADEEDORIGINAL___"+seq).val()
				var complemento = $("#COMPLEMENTOANTIGOED___"+seq).val()

				//var quantidade = $("#QTDEPLANOED___"+seq).val() 
				var quantidade = Number($("#QTDENECESSIDADEEDORIGINAL___"+seq).val() == "null" ? $("#QTDEPLANOEDORIGINAL___"+seq).val() : $("#QTDENECESSIDADEEDORIGINAL___"+seq).val()) - Number($("#SALDOED___"+seq).val())

				var observacao = $("#OBSERVACAOANTIGAED___"+seq).val()

				var usuario1 = $("#USUARIOORIGINALED___"+seq).val()
				var dataoriginal = $("#DATAORIGINALED___"+seq).val()

				var datanecessidadeoriginal = $("#VALDATANECESSIDADEED___"+seq).val()
				var prioridadeoriginal = $("#VALPRIORIDADEORIGINALED___"+seq).val()
				var semananecessidade = $("#CELSEMANAORIGINALED___"+seq).val()
				var lognecessidade = $("#LOGORIGINALED___"+seq).val()
				var datanecessidade = $("#VALDATAREPROGRAMACAOED___"+seq).val()
				var prioridade = $("#VALPRIORIDADEREPROGRAMACAOED___"+seq).val()
				var semanareprogseq = $("#CELSEMANAREPROGORIGINALED___"+seq).val()

				if(lognecessidade=="" || lognecessidade==null || lognecessidade==undefined || lognecessidade=="null"){

					lognecessidade=""

				}

				if(quantidade < quantidadeseq){
					
					lognecessidade += "Necessidade parcialmente atendida com o plano "+numPlano+" pelo usuario "+usuario2+" dia "+new Date().toLocaleDateString()+";"

					// EXECUTA A PROCEDURE PARA INSERIR UMA NECESSIDADE
					execInsertNecessidade(codColigadaseq,codfilialseq,codOrdemseq,codEstruturaseq,idatvordemseq,codatividadeseq,quantidadeseq,usuario1,usuario2,prioridadeoriginal
						,complemento,datanecessidadeoriginal,papcseq,1,observacao,dataoriginal,datanecessidade,semananecessidade,semanareprogseq,prioridade,lognecessidade,quantidade)

				}
				else if(quantidade >= quantidadeseq){

					lognecessidade += "Necessidade completamente atendida com o plano "+numPlano+" pelo usuario "+usuario2+" dia "+new Date().toLocaleDateString()+";"

					// EXECUTA A PROCEDURE PARA INSERIR UMA NECESSIDADE
					execInsertNecessidade(codColigadaseq,codfilialseq,codOrdemseq,codEstruturaseq,idatvordemseq,codatividadeseq,quantidadeseq,usuario1,usuario2,prioridadeoriginal
						,complemento,datanecessidadeoriginal,papcseq,2,observacao,dataoriginal,datanecessidade,semananecessidade,semanareprogseq,prioridade,lognecessidade,quantidade)

				}

				$("#QTDEPLANOEDINSERT___"+_seq).val($("#QTDEPLANOED___"+_seq).val())
			
				var quantidade = Number($("#QTDEPLANOED___"+_seq).val()) + Number($("#QTDEPLANOED___"+seq).val())
				var quantidade2 = Number( $("#SALDOEDORIGINAL___"+_seq).val()) + Number($("#SALDOEDORIGINAL___"+seq).val())

				console.log("quantidade corrigida :"+ quantidade)
				console.log("quantidade2 corrigida :"+ quantidade2)

				$("#QTDEPLANOED___"+_seq).val(quantidade)
				$("#SALDOEDORIGINAL___"+_seq).val(quantidade2)

				$("#INCLUIRED___"+seq).click()

				verificaQtdePlanoEd($("#QTDEPLANOED___"+_seq))

			}
			
		}
		
	})
}

// VERIFICA SE A MP SELECIONADA FOI CADASTRADA NA ESTRUTURA PARA AS OP'S SELECIONADAS
function verificaMPED(){
	
	var ret = true
	
	console.log("verifica se a MP foi cadastrada na estrutura para a ops selecionadas")
	
	// PERCORRE TODOS OS REGISTROS DA TATBELA DE CADASTRO DE PLANO DE CORTE
	$("input[id^='OSED___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		// SE A OPÇÃO INCLUIR FOI SELECIONADO
		if($("#INCLUIRED___"+seq).is(":checked")){
		
			var osEd = $("#OSED___"+seq).val()
			var codFilial = $("#CODFILIALED").val()
			var codEstrutura = $("#CODESTRUTURAED___"+seq).val()
			var codOrdem = $("#CODORDEMED___"+seq).val()
			var idAtividade = $("#IDATIVIDADEED___"+seq).val()
			var idprd = $("#IDMATERIALED").val()
			
			console.log("osEd: "+osEd+", codFilial: "+codFilial+", codEstrutura: "+codEstrutura+", codOrdem: "+codOrdem+", idAtividade: "+idAtividade+", idprd: "+idprd)
			
			// MONTA O ARRAY DAS CONSTRAINTS
			var a1 = DatasetFactory.createConstraint("NUM_OS",osEd,osEd,ConstraintType.MUST)
			var a2 = DatasetFactory.createConstraint("CODESTRUTURA",codEstrutura,codEstrutura,ConstraintType.MUST)
			var a3 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
			var a4 = DatasetFactory.createConstraint("IDATVORDEM",idAtividade,idAtividade,ConstraintType.MUST)
			var a5 = DatasetFactory.createConstraint("IDPRD",idprd,idprd,ConstraintType.MUST)
			var a6 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
			
			var constraints = new Array(a1,a2,a3,a4,a5,a6)
			
			var dataset = DatasetFactory.getDataset("dsVerificaCompPAPC",null,constraints,null)
			var row = dataset.values
			
			console.log("row")
			console.log(row)
			
			// SE NÃO TEVE RETORNO
			if(row=="" || row==null || row==undefined || row=="null"){
				
				ret = false
				
			}
			
		}
		
	})
	
	console.log("ret: "+ret)
	
	return ret
	
}

// VERIFICA SE A MP SELECIONADA FOI CADASTRADA NA ESTRUTURA PARA AS OP'S SELECIONADAS
function verificaMP(){
	
	var ret = true
	
	console.log("verifica se a MP foi cadastrada na estrutura para as ops selecionadas")
	
	// PERCORRE TODOS OS REGISTROS DA TATBELA DE CADASTRO DE PLANO DE CORTE
	$("input[id^='OSCAD___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		// SE A OPÇÃO INCLUIR FOI SELECIONADO
		if($("#INCLUIRCAD___"+seq).is(":checked")){
		
			var osCad = $("#OSCAD___"+seq).val()
			var codFilial = $("#CODFILIAL").val()
			var codEstrutura = $("#CODESTRUTURACAD___"+seq).val()
			var codOrdem = $("#CODORDEMCAD___"+seq).val()
			var idAtividade = $("#IDATIVIDADECAD___"+seq).val()
			var idprd = $("#IDMATERIALCAD").val()
			
			console.log("osCad: "+osCad+", codFilial: "+codFilial+", codEstrutura: "+codEstrutura+", codOrdem: "+codOrdem+", idAtividade: "+idAtividade+", idprd: "+idprd)
			
			// MONTA O ARRAY DAS CONSTRAINTS
			var a1 = DatasetFactory.createConstraint("NUM_OS",osCad,osCad,ConstraintType.MUST)
			var a2 = DatasetFactory.createConstraint("CODESTRUTURA",codEstrutura,codEstrutura,ConstraintType.MUST)
			var a3 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
			var a4 = DatasetFactory.createConstraint("IDATVORDEM",idAtividade,idAtividade,ConstraintType.MUST)
			var a5 = DatasetFactory.createConstraint("IDPRD",idprd,idprd,ConstraintType.MUST)
			var a6 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
			
			var constraints = new Array(a1,a2,a3,a4,a5,a6)
			console.log("filtros para buscar matéria prima : "+constraints);
			
			var dataset = DatasetFactory.getDataset("dsVerificaCompPAPC",null,constraints,null)
			var row = dataset.values
			
			console.log("row")
			console.log(row)
			
			// SE NÃO TEVE RETORNO
			if(row=="" || row==null || row==undefined || row=="null"){
				
				ret = false
				
			}
			
		}
		
	})
	
	console.log("ret: "+ret)
	
	return ret
	
}

// VERIFICA SE TODOS OS ITENS QUE SERÃO INCLUÍDOS NO CADASTRO TEM QUANTIDADE INFORMADA
function verificaQtdeCad(){
	
	var faltaQtde = false
	
	// PERCORRE TODOS OS REGISTROS DA TATBELA DE CADASTRO DE PLANO DE CORTE
	$("input[id^='OSCAD___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		console.log("linha "+seq)
		
		// SE A OPÇÃO INCLUIR FOI SELECIONADO
		if($("#INCLUIRCAD___"+seq).is(":checked")){
			
			var quantidade = $("#QTDEPLANOCAD___"+seq).val()
			
			// SE QUANTIDADE NÃO FOI INFORMADA
			if(quantidade=="" || quantidade==null || quantidade==undefined){
				
				faltaQtde = true
			
			}
			
		}
	
	})
	
	return faltaQtde
	
}

// VERIFICA SE TODOS OS ITENS QUE SERÃO INCLUÍDOS NA EDIÇÃO TEM QUANTIDADE INFORMADA
function verificaQtdeEd(){
	
	var faltaQtde = false
	
	// PERCORRE TODOS OS REGISTROS DA TATBELA DE CADASTRO DE PLANO DE CORTE
	$("input[id^='OSED___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		console.log("linha "+seq)
		
		// SE A OPÇÃO INCLUIR FOI SELECIONADO
		if($("#INCLUIRED___"+seq).is(":checked")){
			
			var quantidade = $("#QTDEPLANOED___"+seq).val()
			
			// SE QUANTIDADE NÃO FOI INFORMADA
			if(quantidade=="" || quantidade==null || quantidade==undefined){
				
				faltaQtde = true
			
			}
			
		}
	
	})
	
	return faltaQtde
	
}

// LIMPA OS DADOS DO CABEÇALHO DO CADASTRO
function limpaCabecalhoCadastro(){
	
	$("#NUMPLANO").val("")
	//$("#PROJETO>option").remove()
	//$("#CODPRJPLANCAD").val("")
	//$("#DESCRICAOPRJPLANCAD").val("")
	//$("#IDPRJPLANCAD").val("")
	$("#QTDEPECASPLANCAD").val("")
	$("#ATIVIDADEPLANCAD>option").remove()
	$("#CODATIVIDADEPLANCAD").val("")
	$("#MATERIALPLANCAD>option").remove()
	$("#DSCMATERIALPLANCAD").val("")
	$("#CODSUCATA>option").remove()
	$("#IDPRDSUCATACAD").val("")
	$("#CODPRDSUCATACAD").val("")
	$("#QTDESUCATAPLANCAD").val("")
	$("#PROJETO>option").remove()
	$("#CODPRJPLANCAD").val("")
	$("#DESCRICAOPRJPLANCAD").val("")
	$("#IDPRJPLANCAD").val("")
	$("#CODFILIAL").val("")
	$("#CODMPCAD>option").remove()
	$("#CODMATERIALCAD").val("")
	$("#IDMATERIALCAD").val("")
	$("#QTDEMPCAD").val("")
	$("#LOTECAD>option").remove()
	$("#NUMLOTECAD").val("")
	$("#IDLOTECAD").val("")
	$("#RETALHOCAD").val("")
	$("#DESENHOCAD>option").remove()
	$("#DSCNUMDESENHOCAD").val("")
	$("#SALDODISPONIVELCAD").val("")
	$("#SALDOAUXCAD").val("")
	$("#QTDRETALHOCAD").val("")
	$("#SALDOLOTEORIGINALCAD").val("")

	
	//$("#QTDESUCATAPLANCAD").prop("disabled",true)
	$("#QTDEPECASPLANCAD").prop("disabled",true)
	$("#ATIVIDADEPLANCAD").prop("disabled",true)
	$("#MATERIALPLANCAD").prop("disabled",true)
	$("#DESENHOCAD").prop("disabled",true)
	$("#LOTECAD").prop("disabled",true)
	$("#CODMPCAD").prop("disabled",true)
	$("#RETALHOCAD").prop("disabled",true)
	$("#QTDRETALHOCAD").prop("disabled",true)
	$("#CODSUCATA").prop("disabled",true)


	//FLUIGC.slider.setValue('#SLIDERPRIORIDADECAD',0)
	$("#SLIDERPRIORIDADECAD").val(0)
	var datanecessidade = FLUIGC.calendar('#DATA_NECESSIDADECAD')
	datanecessidade.setDate("")
	$("#COMPLEMENTOCAD").val("")
	$(".sectionCAD").hide()

	
}

// LIMPA OS DADOS DO CABEÇALHO DE EDIÇÃO
function limpaCabecalhoEdicao(){

	$("#NUMPLANOED").val("")
	//$("#FILIALED>option").remove()
	//$("#CODFILIALED").val("")
	$("#PLANOCORTEED>option").remove()
	$("#PROJETOED").val("")
	$("#CODPRJPLANED").val("")
	$("#DESCRICAOPRJPLANED").val("")
	$("#IDPRJPLANED").val("")
	$("#ATIVIDADEPLANED").val("")
	$("#CODATIVIDADEPLANED").val("")
	$("#MATERIALPLANED").val("")
	$("#DSCMATERIALPLANED").val("")
	$("#CODSUCATAED").val("")
	$("#IDPRDPLANED").val("")
	$("#CODIGOPRDPLANED").val("")
	$("#QTDESUCATAPLANED").val("")
	$("#CODMPED>option").remove()
	$("#CODMATERIALED").val("")
	$("#IDMATERIALED").val("")
	$("#QTDEMPED").val("")
	$("#QTDEMPEDORIGINAL").val("")
	$("#LOTEED>option").remove()
	$("#NUMLOTEED").val("")
	$("#IDLOTEED").val("")
	$("#RETALHOED").val("")
	$("#SUCATAED>option").remove()
	$("#QTDRETALHOED").val("")
	$("#SALDODISPONIVELED").val("")
	$("#SALDOAUXED").val("")
	$("#QTDESUCATAPLANED").prop("disabled",true)
	$("#LOTEED").prop("disabled",true)
	$("#CODMPED").prop("disabled",true)
	
}

function verificaQtdeSucataED(obj){

	formataValorPonto(obj);
	formataValorPonto($("#QTDEMPED"));
	var qtdMP =	$("#QTDEMPED").val()
	qtdMP = parseFloat(qtdMP)
	var sucata = $(obj).val()
	sucata = parseFloat(sucata)

	if((sucata!=null && sucata!="" && sucata!=undefined) || isNaN(sucata)!=true){

		if(sucata>=qtdMP){

			if(sucata<0){

				$(obj).val("")
				//formataValorVirgula(obj);
				Swal.fire({
					icon: 'error',
					title: 'Quantidade inválida para sucata',
					text: 'A sucata não pode ser menor que 0.'
				})

			}
			else{

				$(obj).val("")
				//formataValorVirgula(obj);
				Swal.fire({
					icon: 'error',
					title: 'Quantidade inválida para sucata',
					text: 'Verifique a quantidade do plano, a sucata não pode ser maior ou igual que a quantidade do plano, nem menor que 0.'
				})
			
			}

		}
		else if(isNaN(sucata)==true){
			$(obj).val("")
			//formataValorVirgula(obj);
			Swal.fire({
				icon: 'error',
				title: 'Quantidade inválida para sucata',
				text: 'Quantidade da sucata não pode ser vazia.'
			})
		}
		else if(sucata<0){

			$(obj).val("")
			//formataValorVirgula(obj);
			Swal.fire({
				icon: 'error',
				title: 'Quantidade inválida para sucata',
				text: 'A sucata não pode ser menor que 0.'
			})

		}
		else if(sucata!=0 && sucata<1){

			$(obj).val("")
			//formataValorVirgula(obj);
			Swal.fire({
				icon: 'error',
				title: 'Quantidade inválida para sucata',
				text: 'A sucata não pode ser um numero maior que 0 e menor que 1.'
			})

		}

	}
	else{

		if(isNaN(sucata)){
		
			$(obj).val("")
			//formataValorVirgula(obj);
			// EXIBE ALERTA 
			var Toast = Swal.mixin({
				toast: true,
				position: 'center',
				showConfirmButton: false,
				timer: 4000,
				timerProgressBar: true,
			})
		
			Toast.fire({
				icon: 'warning',
				title: 'Digite um valor correto!\n Use apenas vírgulas e números para expressar as quantidades',			
				stopOnFocus: true,
			})
			
		} else {
			$(obj).val("")
			//formataValorVirgula(obj);
			Swal.fire({
				icon: 'error',
				title: 'Quantidade inválida para sucata',
				text: 'Quantidade da sucata não pode ser vazia.'
			})
		}

	}
	formataValorVirgula(obj)
	formataValorVirgula($("#QTDEMPED"));
}

function calculaSucataCAD(obj){

	var retalho = $("#QTDRETALHOCAD").val();

	if(retalho!=null && retalho!=undefined && retalho !=""){

		formataValorPonto($("#SALDOAUXCAD"));
		formataValorPonto($("#QTDRETALHOCAD"));
		formataValorPonto($(obj));

		var saldodisponivel=$("#SALDOAUXCAD").val();
		var retalho = $("#QTDRETALHOCAD").val();
		var qtdpecas = $(obj).val();
		
		var sucata=(saldodisponivel - retalho) - qtdpecas;
		console.log("sucata = "+sucata);
		$("#QTDESUCATAPLANCAD").val(sucata);

		formataValorVirgula($("#SALDOAUXCAD"));
		formataValorVirgula($("#QTDRETALHOCAD"));
		formataValorVirgula($(obj));

		verificaQtdeSucataCAD($("#QTDESUCATAPLANCAD"))

		$("#QTDESUCATAPLANCAD").prop("readonly",true);

		//setZoomData("CODSUCATA","05.025.0002868 - APARA DE ACO");
		//$("#IDPRDSUCATACAD").val("2868");
		//$("#CODPRDSUCATACAD").val("05.025.0002868");
		
		
	}
	else{

		$(obj).val("")

		Swal.fire({
			icon: 'error',
			title: 'Informações necessárias estão vazias',
			text: 'Favor preencher o retalho do plano primeiramente'
		})

	}
}

function verificaQtdeSucataCAD(obj){
	
	formataValorPonto(obj);
	formataValorPonto($("#QTDEMPCAD"));
	var qtdMP =	$("#QTDEMPCAD").val();
	qtdMP = parseFloat(qtdMP)
	var sucata = $(obj).val()
	sucata = parseFloat(sucata)
	if((sucata!=null && sucata!="" && sucata!=undefined) || isNaN(sucata)!=true){

		if(sucata>=qtdMP){


			if(sucata<0){

				$(obj).val("")
				$("#QTDEPECASPLANCAD").val("")
				//formataValorVirgula(obj);
				Swal.fire({
					icon: 'error',
					title: 'Quantidade inválida para sucata',
					text: 'A sucata não pode ser menor que 0.'
				})

			}

			else{

				$(obj).val("")
				$("#QTDEPECASPLANCAD").val("")
				//formataValorVirgula(obj);
				Swal.fire({
					icon: 'error',
					title: 'Quantidade inválida para sucata',
					text: 'Verifique a quantidade do plano, a sucata não pode ser maior ou igual que a quantidade do plano, nem menor que 0.'
				})
			
			}

		}
		else if(isNaN(sucata)==true){
			$(obj).val("")
			$("#QTDEPECASPLANCAD").val("")
			//formataValorVirgula(obj);
			Swal.fire({
				icon: 'error',
				title: 'Quantidade inválida para sucata',
				text: 'Quantidade da sucata não pode ser vazia.'
			})
		}
		else if(sucata<0){

			$(obj).val("")
			$("#QTDEPECASPLANCAD").val("")
			//formataValorVirgula(obj);
			Swal.fire({
				icon: 'error',
				title: 'Quantidade inválida para sucata',
				text: 'A sucata não pode ser menor que 0.'
			})

		}
		else if(sucata!=0 && sucata<1){

			$(obj).val("")
			$("#QTDEPECASPLANCAD").val("")
			//formataValorVirgula(obj);
			Swal.fire({
				icon: 'error',
				title: 'Quantidade inválida para sucata',
				text: 'A sucata não pode ser um numero maior que 0 e menor que 1.'
			})

		}

	}
	else{

		if(isNaN(sucata)){
		
			$(obj).val("")
			$("#QTDEPECASPLANCAD").val("")
			formataValorVirgula(obj);
			// EXIBE ALERTA 
			var Toast = Swal.mixin({
				toast: true,
				position: 'center',
				showConfirmButton: false,
				timer: 4000,
				timerProgressBar: true,
			})
		
			Toast.fire({
				icon: 'warning',
				title: 'Digite um valor correto!\n Use apenas vírgulas e números para expressar as quantidades',			
				stopOnFocus: true,
			})
			
		} else {
			$(obj).val("")
			$("#QTDEPECASPLANCAD").val("")
			//formataValorVirgula(obj);
			Swal.fire({
				icon: 'error',
				title: 'Quantidade inválida para sucata',
				text: 'Quantidade da sucata não pode ser vazia.'
			})
		}

	}
	formataValorVirgula(obj)
	formataValorVirgula($("#QTDEMPCAD"));
	
}

// DELETA O PLANO DE CORTE QUE VAI SER ALTERADO
function deletePlanoCorte(){
	
	var numPlano = $("#NUMPLANOED").val()
	
    var c1 = DatasetFactory.createConstraint("NUMPLANOCORTE",numPlano,numPlano,ConstraintType.MUST);
    
    var constraints = new Array(c1);
    
    var dataset = DatasetFactory.getDataset("dsDeletePlanoCorte",null,constraints,null);

}

function deletePlanoCorteCAD(numplan){
	
	var numPlano = numplan;
	
    var c1 = DatasetFactory.createConstraint("NUMPLANOCORTE",numPlano,numPlano,ConstraintType.MUST);
    
    var constraints = new Array(c1);
    
    var dataset = DatasetFactory.getDataset("dsDeletePlanoCorte",null,constraints,null);

}

// VERIFICA SE NA TABELA DE EDIÇÃO EXISTEM ITENS SELECIONADOS
function verificaSelecaoTabelaEdicao(){
	
	var ret = false
	
	// PERCORRE TODOS OS REGISTROS DA TATBELA DE CADASTRO DE PLANO DE CORTE
	$("input[id^='OSED___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		// SE A OPÇÃO INCLUIR FOI SELECIONADO
		if($("#INCLUIRED___"+seq).is(":checked")){
			
			ret = true
			
		}
		
	})
	
	return ret
	
}

// VERIFICA SE NA TABELA DE EDIÇÃO EXISTEM ITENS SELECIONADOS
function verificaOpsConcluidasEdicao(){
	
	var ret=0
	// PERCORRE TODOS OS REGISTROS DA TATBELA DE CADASTRO DE PLANO DE CORTE
	$("input[id^='OSED___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		// SE A OPÇÃO INCLUIR FOI SELECIONADO
		if($("#INCLUIRED___"+seq).is(":checked")){
			
			if(!verificaOpConcluida(this,"LINHAED")){

				ret = seq
				console.log("OP CONCLUIDA "+ret);

			}

		}
		
	})

	return ret;
	
}

// EDITAR/ALTERAR O PLANO DE CORTE
function alterarPlano(){
	
	var myLoading2 = FLUIGC.loading(window);
	
	myLoading2.show();
	
	var selecionado = false
	var faltaQtde = false
	
	console.log("VOU COMEÇAR A EDITAR O PLANO")
	
	var numPlano = $("#NUMPLANOED").val()
	var retalho = $("#RETALHOED").val()
	var codMP = $("#CODMATERIALED").val()
	var qtdeMP = $("#QTDEMPED").val()
	var retalho = $("#RETALHOED").val()
	var dataCriacao = $("#DATACRIACAOEDBANCO").val()
	var filial = $("#CODFILIALED").val()
	var codSucata = $("#CODSUCATAED").val()
	var qtdeSucata = $("#QTDESUCATAPLANED").val()
	var numLote = $("#NUMLOTEED").val()
	var idLote = $("#IDLOTEED").val()
	var op;

	var usuario2  = $("#USUARIOATUAL").val()
	usuario2 = getUser(usuario2)
	
	// SE NÚMERO DO PLANO FOI INFORMADO
	if(!((numPlano=="" || numPlano==null || numPlano==undefined) || (codMP=="" || codMP==null || codMP==undefined) || (qtdeMP=="" || qtdeMP==null || qtdeMP==undefined) 
			|| (dataCriacao=="" || dataCriacao==null || dataCriacao==undefined) || (filial=="" || filial==null || filial==undefined) ||
			(codSucata=="" || codSucata==null || codSucata==undefined) || (qtdeSucata=="" || qtdeSucata==null || qtdeSucata==undefined)
			|| (numLote=="" || numLote==null || numLote==undefined) || (idLote=="" || idLote==null || idLote==undefined))){
		
		// VERIFICA SE TODOS OS ITENS QUE SERÃO INCLUÍDOS TEM QUANTIDADE INFORMADA
		faltaQtde = verificaQtdeEd()
		
		// SE FALTA QUANTIDADE
		if(faltaQtde){
			
			myLoading2.hide();
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'Há itens selecionados que não tiveram a quantidade informada',
				  text: 'Verifique e tente novamente.'
			})
			
		} else {
			
			// VERIFICA SE NA TABELA DE EDIÇÃO EXISTEM ITENS SELECIONADOS
			if(verificaSelecaoTabelaEdicao()){

				op = verificaOpsConcluidasEdicao();
				if(op==0){ 

					// SE A MP SELECIONADA FOI CADASTRADA NA ESTRUTURA PARA AS OP'S SELECIONADAS
					if(verificaMPED()){
						
						if(!(verificaQTDFinalED())){

							myLoading2.hide();

							var qtdeMPOriginal=$("#QTDEMPEDORIGINAL").val()
					
								// EXIBE ALERTA
								Swal.fire({
									icon: 'error',
									title: 'A quantidade precisa de ser recalculada',
									text: 'Insira novamente o valor do retalho e da sucata'
								})
		
							$("#QTDRETALHOED").val("");
							$("#QTDESUCATAPLANED").val("");
							$("#QTDEMPED").val(qtdeMPOriginal);
							CalculaSaldoDisponivelED("");
							
						}
						else{
						

							// DELETA O PLANO DE CORTE QUE VAI SER ALTERADO
							deletePlanoCorte()
							
							// PERCORRE TODOS OS REGISTROS DA TATBELA DE CADASTRO DE PLANO DE CORTE
							$("input[id^='OSED___']").each(function(){
								
								var seq = $(this).attr("id").split("___")[1]
								
								console.log("linha "+seq)
								
								// SE A OPÇÃO INCLUIR FOI SELECIONADO
								if($("#INCLUIRED___"+seq).is(":checked")){
									
									selecionado = true
									
									console.log("VOU INSERIR O PLANO DA LINHA "+seq)

									procuraIguaiseExcluiEd()

									console.log("VOU DELETAR A NECESSIDADE DA LINHA "+seq)

									var codColigadaseq = $("#CODCOLIGADAED___"+seq).val()
									var codfilialseq = $("#CODFILIALEDS___"+seq).val()
									var codOrdemseq = $("#CODORDEMED___"+seq).val()
									var codEstruturaseq = $("#CODESTRUTURAED___"+seq).val()
									var idatvordemseq = $("#IDATIVIDADEED___"+seq).val()
									var codatividadeseq = $("#CODATIVIDADEED___"+seq).val()
									var prioridadeseq = $("#VALPRIORIDADEORIGINALED___"+seq).val()
									var semananecessidadeseq = $("#CELSEMANAORIGINALED___"+seq).val()
									var papcseq = $("#PAPCED___"+seq).val()
									var prioridadereprog = $("#VALPRIORIDADEREPROGRAMACAOED___"+seq).val()
									var semanareprog = $("#VALDATAREPROGRAMACAOED___"+seq).val()
									var nseqpedido=$("#NSEQPEDIDOED___"+seq).val()
									
		
									execDeleteNecessidade(//codColigadaseq,codfilialseq,codOrdemseq,codEstruturaseq,idatvordemseq,codatividadeseq,prioridadeseq,semananecessidadeseq,papcseq,prioridadereprog,semanareprog,
										nseqpedido)
		
									console.log("VOU ATUALIZAR A NECESSIDADE DA LINHA "+seq)
		
									var quantidadeseq = $("#SALDOEDORIGINAL___"+seq).val()
									var quantidadeoriginal = $("#QTDENECESSIDADEEDORIGINAL___"+seq).val()
									var complemento = $("#COMPLEMENTOANTIGOED___"+seq).val()
		
									var quantidade = ( $("#QTDEPLANOEDINSERT___"+seq).val() == null || $("#QTDEPLANOEDINSERT___"+seq).val() == "" || $("#QTDEPLANOEDINSERT___"+seq).val()==undefined ) ? Number($("#QTDENECESSIDADEEDORIGINAL___"+seq).val()) - Number($("#SALDOED___"+seq).val()) : $("#QTDEPLANOEDINSERT___"+seq).val()
									var observacao = $("#OBSERVACAOANTIGAED___"+seq).val()
		
									var usuario1 = $("#USUARIOORIGINALED___"+seq).val()
									var dataoriginal = $("#DATAORIGINALED___"+seq).val()
		
									var datanecessidadeoriginal = $("#VALDATANECESSIDADEED___"+seq).val()
									var prioridadeoriginal = $("#VALPRIORIDADEORIGINALED___"+seq).val()
									var semananecessidade = $("#CELSEMANAORIGINALED___"+seq).val()
									var lognecessidade = $("#LOGORIGINALED___"+seq).val()
									var datanecessidade = $("#VALDATAREPROGRAMACAOED___"+seq).val()
									var prioridade = $("#VALPRIORIDADEREPROGRAMACAOED___"+seq).val()
									var semanareprogseq = $("#CELSEMANAREPROGORIGINALED___"+seq).val()
		
									if(lognecessidade=="" || lognecessidade==null || lognecessidade==undefined || lognecessidade=="null"){
		
										lognecessidade=""
		
									}
		
									if(quantidade < quantidadeseq){
										
										lognecessidade += "Necessidade parcialmente atendida na edição do plano "+numPlano+" pelo usuario "+usuario2+" dia "+new Date().toLocaleDateString()+";"
		
										// EXECUTA A PROCEDURE PARA INSERIR UMA NECESSIDADE
										execInsertNecessidade(codColigadaseq,codfilialseq,codOrdemseq,codEstruturaseq,idatvordemseq,codatividadeseq,quantidadeoriginal,usuario1,usuario2,prioridadeoriginal
											,complemento,datanecessidadeoriginal,papcseq,1,observacao,dataoriginal,datanecessidade,semananecessidade,semanareprogseq,prioridade,lognecessidade,quantidade)
		
									}
									else if(quantidade >= quantidadeseq){
		
										lognecessidade += "Necessidade completamente atendida na edição do plano "+numPlano+" pelo usuario "+usuario2+" dia "+new Date().toLocaleDateString()+";"
		
										// EXECUTA A PROCEDURE PARA INSERIR UMA NECESSIDADE
										execInsertNecessidade(codColigadaseq,codfilialseq,codOrdemseq,codEstruturaseq,idatvordemseq,codatividadeseq,quantidadeoriginal,usuario1,usuario2,prioridadeoriginal
											,complemento,datanecessidadeoriginal,papcseq,2,observacao,dataoriginal,datanecessidade,semananecessidade,semanareprogseq,prioridade,lognecessidade,quantidade)
		
									}
									
									//var numPlano = $("#NUMPLANOED").val()
									var osCad = $("#OSED___"+seq).val()
									var codEstrutura = $("#CODESTRUTURAED___"+seq).val()
									var codOrdem = $("#CODORDEMED___"+seq).val()
									var codAtividade = $("#CODATIVIDADEED___"+seq).val()
									var idAtividade = $("#IDATIVIDADEED___"+seq).val()
									var posicao = $("#POSICAOED___"+seq).val()
									var item = $("#ITEMED___"+seq).val()
									var material = $("#MATERIALED___"+seq).val()
									var bitola = $("#BITOLAED___"+seq).val()
									var quantidade = $("#QTDEPLANOED___"+seq).val()
									var qtdempfinal = $("#QTDMPFINALED___"+seq).val()
									
									// EXECUTA A PROCEDURE PARA INSERIR UM PLANO DE CORTE
									execInsertPlanoCorte(codOrdem,codEstrutura,idAtividade,numPlano,quantidade,filial,codSucata,qtdeSucata,codMP,qtdeMP,retalho,numLote,idLote,qtdempfinal,codAtividade)
									
								}
								else if($("#NUMPLANOCORTEED___"+seq).val() == numPlano){

									console.log("VOU DELETAR A NECESSIDADE DA LINHA "+seq)

									var codColigadaseq = $("#CODCOLIGADAED___"+seq).val()
									var codfilialseq = $("#CODFILIALEDS___"+seq).val()
									var codOrdemseq = $("#CODORDEMED___"+seq).val()
									var codEstruturaseq = $("#CODESTRUTURAED___"+seq).val()
									var idatvordemseq = $("#IDATIVIDADEED___"+seq).val()
									var codatividadeseq = $("#CODATIVIDADEED___"+seq).val()
									var prioridadeseq = $("#VALPRIORIDADEORIGINALED___"+seq).val()
									var semananecessidadeseq = $("#CELSEMANAORIGINALED___"+seq).val()
									var papcseq = $("#PAPCED___"+seq).val()
									var prioridadereprog = $("#VALPRIORIDADEREPROGRAMACAOED___"+seq).val()
									var semanareprog = $("#VALDATAREPROGRAMACAOED___"+seq).val()
									var nseqpedido=$("#NSEQPEDIDOED___"+seq).val()
									
		
									execDeleteNecessidade(//codColigadaseq,codfilialseq,codOrdemseq,codEstruturaseq,idatvordemseq,codatividadeseq,prioridadeseq,semananecessidadeseq,papcseq,prioridadereprog,semanareprog,
										nseqpedido)
		
									console.log("VOU ATUALIZAR A NECESSIDADE DA LINHA "+seq)
		
									var quantidadeseq = $("#SALDOEDORIGINAL___"+seq).val()
									var quantidadeoriginal = $("#QTDENECESSIDADEEDORIGINAL___"+seq).val()
									var complemento = $("#COMPLEMENTOANTIGOED___"+seq).val()
		
									var quantidade = $("#QTDEPLANOED___"+seq).val()
									var quantidade = Number($("#QTDENECESSIDADEEDORIGINAL___"+seq).val()) - Number($("#SALDOED___"+seq).val())

									quantidade = quantidade > 0 ? quantidade : null;
		
									var observacao = $("#OBSERVACAOANTIGAED___"+seq).val()
		
									var usuario1 = $("#USUARIOORIGINALED___"+seq).val()
									var dataoriginal = $("#DATAORIGINALED___"+seq).val()
		
									var datanecessidadeoriginal = $("#VALDATANECESSIDADEED___"+seq).val()
									var prioridadeoriginal = $("#VALPRIORIDADEORIGINALED___"+seq).val()
									var semananecessidade = $("#CELSEMANAORIGINALED___"+seq).val()
									var lognecessidade = $("#LOGORIGINALED___"+seq).val()
									var datanecessidade = $("#VALDATAREPROGRAMACAOED___"+seq).val()
									var prioridade = $("#VALPRIORIDADEREPROGRAMACAOED___"+seq).val()
									var semanareprogseq = $("#CELSEMANAREPROGORIGINALED___"+seq).val()
		
									if(lognecessidade=="" || lognecessidade==null || lognecessidade==undefined || lognecessidade=="null"){
		
										lognecessidade=""
		
									}
										
									lognecessidade += "Necessidade retirada do plano "+numPlano+" pelo usuario "+usuario2+" dia "+new Date().toLocaleDateString()+";"
	
									// EXECUTA A PROCEDURE PARA INSERIR UMA NECESSIDADE
									execInsertNecessidade(codColigadaseq,codfilialseq,codOrdemseq,codEstruturaseq,idatvordemseq,codatividadeseq,quantidadeoriginal,usuario1,usuario2,prioridadeoriginal
										,complemento,datanecessidadeoriginal,papcseq,1,observacao,dataoriginal,datanecessidade,semananecessidade,semanareprogseq,prioridade,lognecessidade,quantidade)
									

								}
								
							})
							
							// LIMPAR TABELA DE EDIÇÃO
							limparTabelaEdicao()
							
							// LIMPA OS DADOS DO CABEÇALHO DE EDIÇÃO
							limpaCabecalhoEdicao()
							
							// VERIFICA SE VAI EXIBIR/ESCONDE TABELAS
							verificaTabelas()
							
							myLoading2.hide();

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
								title: 'Plano de corte alterado com sucesso!'
							})
						
						}
						
					}else{
						// SE NÃO
						
						myLoading2.hide();
						
						// EXIBE ALERTA
						Swal.fire({
							icon: 'error',
							title: "A matéria-prima selecionada não foi cadastrada na estrutura para as OP's selecionadas!",
							text: 'Verifique e tente novamente.'
						})
						
					}
				}
				else{

					var vermelho = "linear-gradient(0deg, #f09c9c, #fd6666, #f09c9c) !important";

					// EXIBE ALERTA
					myLoading2.hide();
					var codop = $("#CODORDEMED___"+op).val()
					console.log("🚀 ~ file: utils.js ~ line 4938 ~ alterarPlano ~ codop", codop)
					console.log("OP CONCLUIDA "+codop)
					Swal.fire({
						icon: 'error',
						title: "O plano não pode ser editado",
						text: 'Verifique se a OP:'+codop+' já foi concluída',
					}).then(function(result){
						setTimeout(function(){
							if(seq > 10){
								var id = Number(seq) - 10
							}
							else{
								var id = 1
							}
							var string = "#QTDEPLANOED___"+id
							console.log( "focar no :"+string)
							window.location.href = string
							document.getElementById("QTDEPLANOED___"+id).scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
						},100);
					})
				}
				
						
			} else {
				
				myLoading2.hide();
				
				// EXIBE ALERTA
				Swal.fire({
					  icon: 'error',
					  title: 'Não há itens selecionados para alterar',
					  text: 'Verifique e tente novamente.'
				})
				
			}
			
		}
			
	} else {
		// SE NÃO
		
		myLoading2.hide();
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'Há campos obrigatórios que não foram preenchidos!',
			  text: 'Verifique e tente novamente.'
		})
		
	}
	
	// DESATIVA O LOAD
	setTimeout(function(){
		
		myLoading2.hide();
		
	},500)
	
}

// LIMPAR TABELA DO CADASTRO
function limparTabelaCadastro(){
	
	// PERCORRE TODOS OS REGISTROS DA TABELA E REMOVE CONTEÚDO
	$("input[id^='OSCAD___']").each(function(){
	
		$(this).parents("tr").remove()
		
	})
	
}

// LIMPAR TABELA DE EDIÇÃO
function limparTabelaEdicao(){
	
	// PERCORRE TODOS OS REGISTROS DA TABELA E REMOVE CONTEÚDO
	$("input[id^='OSED___']").each(function(){
	
		$(this).parents("tr").remove()
		
	})
	
}

// EXECUTA A PROCEDURE
function execInsertPlanoCorte(codOrdem,codEstrutura,idAtividade,numPlano,quantidade,filial,codSucata,qtdeSucata,codMP,qtdeMP,retalho,numLote,idLote,qtdempfinal,codAtividade){
	
	if(retalho=="" || retalho==undefined || retalho==null){
		
		retalho = ""  

	} 
  
	if(qtdeSucata.includes(",")){
		
		qtdeSucata = qtdeSucata.replace(",",".")
		
	}
	
	if(qtdeMP.includes(",")){
		
		qtdeMP = qtdeMP.replace(",",".")
		
	}

	if(qtdempfinal.includes(",")){
		
		qtdempfinal = qtdempfinal.replace(",",".")
		
	}
	
	qtdeSucata = parseFloat(qtdeSucata)
	qtdeMP = parseFloat(qtdeMP)
	qtdempfinal = parseFloat(qtdempfinal)
	qtdempfinal = (Math.round(qtdempfinal*10000))/10000
	
    var c1 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("CODESTRUTURA",codEstrutura,codEstrutura,ConstraintType.MUST);
    var c3 = DatasetFactory.createConstraint("IDATIVIDADE",idAtividade,idAtividade,ConstraintType.MUST);
    var c4 = DatasetFactory.createConstraint("NUMPLANOCORTE",numPlano,numPlano,ConstraintType.MUST);
    var c5 = DatasetFactory.createConstraint("QUANTIDADE",quantidade,quantidade,ConstraintType.MUST);
    var c6 = DatasetFactory.createConstraint("CODFILIAL",filial,filial,ConstraintType.MUST);
    var c7 = DatasetFactory.createConstraint("CODSUCATA",codSucata,codSucata,ConstraintType.MUST);
    var c8 = DatasetFactory.createConstraint("QTDESUCATA",qtdeSucata,qtdeSucata,ConstraintType.MUST);
    var c9 = DatasetFactory.createConstraint("CODIGOMP",codMP,codMP,ConstraintType.MUST);
    var c10 = DatasetFactory.createConstraint("QTDEMP",qtdeMP,qtdeMP,ConstraintType.MUST);
    var c11 = DatasetFactory.createConstraint("RETALHO",retalho,retalho,ConstraintType.MUST);
    var c12 = DatasetFactory.createConstraint("NUMLOTE",numLote,numLote,ConstraintType.MUST);
    var c13 = DatasetFactory.createConstraint("IDLOTE",idLote,idLote,ConstraintType.MUST);
	var c14 = DatasetFactory.createConstraint("QTDEMPFINAL",qtdempfinal,qtdempfinal,ConstraintType.MUST);
	var c15 = DatasetFactory.createConstraint("CODATIVIDADE",codAtividade,codAtividade,ConstraintType.MUST);
    
    var constraints = new Array(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c14,c15);
  
    console.log("Vou executar o dataset do INSERT DO PLANO DE CORTE")
    
    var dataset = DatasetFactory.getDataset("dsInsertPlanoCorte",null,constraints,null);

    console.log("Executei o dataset do INSERT DO PLANO")
    
}


// VERIFICA SE PLANO DE CORTE SELECIONADO PODE SER EXCLUIDO E SE SIM, EXCLUI
function excluirPlano(){
	
	// EXIBE ALERTA
	Swal.fire({
		
		  title: 'Deseja excluir todo o Plano de Corte?',
		  tex: 'Atenção, essa ação não poderá ser desfeita',
		  icon: 'warning',
		  showCancelButton: true,
		  allowEscapeKey: true,
		  allowOutsideClick: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#F08E8E',
		  confirmButtonText: 'Sim',
		  cancelButtonText: 'Não',

		}).then(function(result){
		
		  // SE SIM
		  if (result.value) {
		      
			  var numPlano = $("#NUMPLANOED").val()
				
				var a1 = DatasetFactory.createConstraint("NUMPLANOCORTE",numPlano,numPlano,ConstraintType.MUST);
			 
				var constraints = new Array(a1);
				 
				var dataset = DatasetFactory.getDataset("dsVerificaProgPAPC",null,constraints,null);
				var row = dataset.values
				
				console.log("row")
				console.log(row)
				 
				// SE RETORNO É VAZIO OU NULO
				if(row=="" || row==null || row==undefined || row=="null"){
				 	
					console.log("vou excluir o plano")
					
					// DELETA O PLANO DE CORTE QUE VAI SER ALTERADO
					deletePlanoCorte()

					var usuario2  = $("#USUARIOATUAL").val()
					usuario2 = getUser(usuario2)

					$("input[id^='OSED___']").each(function(){
								
						var seq = $(this).attr("id").split("___")[1]
						
						console.log("linha "+seq)
						
						if($("#NUMPLANOCORTEED___"+seq).val() == numPlano){

							console.log("VOU DELETAR A NECESSIDADE DA LINHA "+seq)

							var codColigadaseq = $("#CODCOLIGADAED___"+seq).val()
							var codfilialseq = $("#CODFILIALEDS___"+seq).val()
							var codOrdemseq = $("#CODORDEMED___"+seq).val()
							var codEstruturaseq = $("#CODESTRUTURAED___"+seq).val()
							var idatvordemseq = $("#IDATIVIDADEED___"+seq).val()
							var codatividadeseq = $("#CODATIVIDADEED___"+seq).val()
							var prioridadeseq = $("#VALPRIORIDADEORIGINALED___"+seq).val()
							var semananecessidadeseq = $("#CELSEMANAORIGINALED___"+seq).val()
							var papcseq = $("#PAPCED___"+seq).val()
							var prioridadereprog = $("#VALPRIORIDADEREPROGRAMACAOED___"+seq).val()
							var semanareprog = $("#VALDATAREPROGRAMACAOED___"+seq).val()
							var nseqpedido=$("#NSEQPEDIDOED___"+seq).val()
							

							execDeleteNecessidade(//codColigadaseq,codfilialseq,codOrdemseq,codEstruturaseq,idatvordemseq,codatividadeseq,prioridadeseq,semananecessidadeseq,papcseq,prioridadereprog,semanareprog,
								nseqpedido)

							console.log("VOU ATUALIZAR A NECESSIDADE DA LINHA "+seq)

							var quantidadeseq = $("#SALDOEDORIGINAL___"+seq).val()
							var quantidadeoriginal = ( $("#QTDENECESSIDADEEDORIGINAL___"+seq).val() == "null" || $("#QTDENECESSIDADEEDORIGINAL___"+seq).val() == "" )? $("#QTDEPLANOEDORIGINAL___"+seq).val() : $("#QTDENECESSIDADEEDORIGINAL___"+seq).val()
							var complemento = $("#COMPLEMENTOANTIGOED___"+seq).val()

							var quantidade = Number($("#QTDATENDIDAORIGINALED___"+seq).val()) - Number($("#QTDEPLANOEDORIGINAL___"+seq).val())

							var observacao = $("#OBSERVACAOANTIGAED___"+seq).val()

							var usuario1 = $("#USUARIOORIGINALED___"+seq).val()
							var dataoriginal = $("#DATAORIGINALED___"+seq).val()

							var datanecessidadeoriginal = $("#VALDATANECESSIDADEED___"+seq).val()
							var prioridadeoriginal = $("#VALPRIORIDADEORIGINALED___"+seq).val()
							var semananecessidade = $("#CELSEMANAORIGINALED___"+seq).val()
							var lognecessidade = $("#LOGORIGINALED___"+seq).val()
							var datanecessidade = $("#VALDATAREPROGRAMACAOED___"+seq).val()
							var prioridade = $("#VALPRIORIDADEREPROGRAMACAOED___"+seq).val()
							var semanareprogseq = $("#CELSEMANAREPROGORIGINALED___"+seq).val()

							if(lognecessidade=="" || lognecessidade==null || lognecessidade==undefined || lognecessidade=="null"){

								lognecessidade=""

							}
								
							lognecessidade += "Necessidade retirada do plano "+numPlano+" pelo usuario "+usuario2+" dia "+new Date().toLocaleDateString()+";"

							// EXECUTA A PROCEDURE PARA INSERIR UMA NECESSIDADE
							execInsertNecessidade(codColigadaseq,codfilialseq,codOrdemseq,codEstruturaseq,idatvordemseq,codatividadeseq,quantidadeoriginal,usuario1,usuario2,prioridadeoriginal
								,complemento,datanecessidadeoriginal,papcseq,1,observacao,dataoriginal,datanecessidade,semananecessidade,semanareprogseq,prioridade,lognecessidade,quantidade)
							

						}
						
					})
					
					// LIMPAR TABELA DE EDIÇÃO
					limparTabelaEdicao()
							
					// LIMPA OS DADOS DO CABEÇALHO DE EDIÇÃO
					limpaCabecalhoEdicao()
					
					// VERIFICA SE VAI EXIBIR/ESCONDE TABELAS
					verificaTabelas()
					
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
						  title: 'Plano de corte excluído com sucesso!'
					})

				}else{
				 // SE NÃO, PLANO NÃO PODE SER EXCLUÍDO
				 	
					console.log("não posso excluir o plano")
					
					var count = row.length
				 	var codOrdem = ""
				 	
				 	// PERCORRE TODOS OS REGISTROS
				 	for(var i=0;i<count;i++){
				 		
				 		var rep = row[i]
				 		
				 		// SE É O PRIMEIRO ITEM
				 		if(i==0){
				 			
				 			codOrdem = rep["CODORDEM"]
				 			
				 		}else{
				 			// SE NÃO
				 			
				 			// SE É O ÚLTIMO ITEM
				 			if(i+1==count){
				 				
				 				codOrdem = codOrdem +" e "+rep["CODORDEM"]
				 				
				 			}else{
				 				
				 				codOrdem= codOrdem+", "+rep["CODORDEM"]
				 				
				 			}
				 		
				 		}
				 		
				 	}
				 	
				 	// EXIBE ALERTA
						Swal.fire({
							  icon: 'error',
							  title: "Esse Plano não pode ser excluído porque existem OP's que já foram programadas",
							  text: "OP's:  "+codOrdem
						})
				 	
				 }
		      
		  } 				  
		  
	})

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

// SCROLL DAS TABELAS
$('.ScrollWrapper').on('scroll', function(){
	
	  var _left = $(this).scrollLeft();
	  $('.ScrollWrapper').scrollLeft(_left)
	  
})

//BUSCA QUAL O SALDO DISPONÍVEL PARA O LOTE QUE ESTÁ SENDO USADO, LEVANDO EM CONTA PLANOS CADASTRADOS COM O MESMO LOTE
function CalculaSaldoDisponivelCAD(){

	var planocorte = $("#NUMPLANO").val();
	var codfilial = $("#CODFILIAL").val();
	var os = $("#CODPRJPLANCAD").val();
	var numlote = $("#NUMLOTECAD").val();
	var idprd = $("#IDMATERIALCAD").val();

	var a1 = DatasetFactory.createConstraint("PLANOCORTEED",planocorte,planocorte,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("CODFILIAL",codfilial,codfilial,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("OS",os,os,ConstraintType.MUST)
	var a4 = DatasetFactory.createConstraint("NUMLOTE",numlote,numlote,ConstraintType.MUST)
	var a5 = DatasetFactory.createConstraint("IDPRD",idprd,idprd,ConstraintType.MUST)
	var versao = $("#VERSAOCONTROLESALDO").val()
	var a6 = DatasetFactory.createConstraint("VERSAO",versao,versao,ConstraintType.MUST)

	var constraints = new Array(a1,a2,a3,a4,a5,a6)

	console.log("Vou rodar o dataset dsBuscaSaldoPAPC");

	var dataset = DatasetFactory.getDataset("dsBuscaSaldoPAPC",null,constraints,null)

	var row=dataset.values
	console.log(row)
	var retorno = row[0];

	$("#SALDODISPONIVELCAD").val(parseFloat(retorno["SALDODISPONIVEL"]).toFixed(4))
	formataValorVirgula($("#SALDODISPONIVELCAD"))
	$("#SALDOAUXCAD").val(parseFloat(retorno["SALDODISPONIVEL"]).toFixed(4))

	carregaModalPlanosPendCAD()

}

// BUSCA QUAL O SALDO DISPONÍVEL PARA O PLANO QUE ESTÀ SENDO EDITADO, LEVANDO EM CONTA PLANOS CADASTRADOS COM O MESMO LOTE, EXCETO O PLANO ATUAL
function CalculaSaldoDisponivelED(numplano){

	var planocorte = numplano
	var codfilial = $("#CODFILIALED").val();
	var os = $("#CODPRJPLANED").val();
	var numlote = $("#NUMLOTEED").val();
	var idprd = $("#IDMATERIALED").val();

	var a1 = DatasetFactory.createConstraint("PLANOCORTEED",planocorte,planocorte,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("CODFILIAL",codfilial,codfilial,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("OS",os,os,ConstraintType.MUST)
	var a4 = DatasetFactory.createConstraint("NUMLOTE",numlote,numlote,ConstraintType.MUST)
	var a5 = DatasetFactory.createConstraint("IDPRD",idprd,idprd,ConstraintType.MUST)
	var versao = $("#VERSAOCONTROLESALDO").val()
	var a6 = DatasetFactory.createConstraint("VERSAO",versao,versao,ConstraintType.MUST)

	var constraints = new Array(a1,a2,a3,a4,a5,a6)

	console.log("Vou rodar o dataset dsBuscaSaldoPAPC");

	var dataset = DatasetFactory.getDataset("dsBuscaSaldoPAPC",null,constraints,null)

	var row=dataset.values
	console.log(row)
	var retorno = row[0];

	$("#SALDODISPONIVELED").val(parseFloat(retorno["SALDODISPONIVEL"]).toFixed(4))
	formataValorVirgula($("#SALDODISPONIVELED"))
	$("#SALDOAUXED").val(parseFloat(retorno["SALDODISPONIVEL"]).toFixed(4))

	carregaModalPlanosPendED()

}

//VERIFIAC SE FOI CADASTRADO OUTRO PLANO DURANTE CADASTRO DESTE E PEDE PARA RECCALCULAR A QTDMP CASO o CADASTRO DESTE PLANO VÁ DEIXAR O LOTE NEGATIVADO
function verificaQTDFinalCAD(){

	//var planocorte = $("#NUMPLANO").val();
	var planocorte = "";
	var codfilial = $("#CODFILIAL").val();
	var os = $("#CODPRJPLANCAD").val();
	var numlote = $("#NUMLOTECAD").val();
	var idprd = $("#IDMATERIALCAD").val();
	var retalho = $("#QTDRETALHOCAD").val();
	retalho = parseFloat(retalho).toFixed(4);
	var qtdMPoriginal = $("#QTDEMPCAD").val();
	qtdMPoriginal = parseFloat(qtdMPoriginal).toFixed(4);

	var a1 = DatasetFactory.createConstraint("PLANOCORTEED",planocorte,planocorte,ConstraintType.MUST);
	var a2 = DatasetFactory.createConstraint("CODFILIAL",codfilial,codfilial,ConstraintType.MUST);
	var a3 = DatasetFactory.createConstraint("OS",os,os,ConstraintType.MUST);
	var a4 = DatasetFactory.createConstraint("NUMLOTE",numlote,numlote,ConstraintType.MUST);
	var a5 = DatasetFactory.createConstraint("IDPRD",idprd,idprd,ConstraintType.MUST);
	var versao = $("#VERSAOCONTROLESALDO").val()
	var a6 = DatasetFactory.createConstraint("VERSAO",versao,versao,ConstraintType.MUST)

	var constraints = new Array(a1,a2,a3,a4,a5,a6);

	console.log("Vou rodar o dataset dsBuscaSaldoPAPC");

	var dataset = DatasetFactory.getDataset("dsBuscaSaldoPAPC",null,constraints,null);

	var row=dataset.values;
	console.log(row);
	var retorno = row[0];
	console.log("calculando MP atual...");
	var loteAtual=parseFloat(retorno["SALDODISPONIVEL"]).toFixed(4);


	var retalho=loteAtual-qtdMPoriginal;

	console.log("calculando MP atual...");
	console.log("mp : "+qtdMPoriginal)
	console.log("retalho : "+retalho)
	console.log("lote atual :"+ loteAtual)

	if(retalho<0){
		return false;
	}
	else{
		return true;
	}

}

//VERIFIAC SE FOI EDITADO OUTRO PLANO DURANTE A EDIÇÂO DESTE E PEDE PARA RECCALCULAR A QTDMP CASO A EDIÇAO DESTE PLANO VÁ DEIXAR O LOTE NEGATIVADO
function verificaQTDFinalED(){

	var planocorte = $("#NUMPLANOED").val();
	var codfilial = $("#CODFILIALED").val();
	var os = $("#CODPRJPLANED").val();
	var numlote = $("#NUMLOTEED").val();
	var idprd = $("#IDMATERIALED").val();
	var retalho = $("#QTDRETALHOED").val();
	console.log(planocorte)
	console.log(codfilial)
	console.log(os)
	console.log(numlote)
	console.log(idprd)
	retalho = parseFloat(retalho).toFixed(4);
	var qtdMPoriginal = $("#QTDEMPED").val();
	qtdMPoriginal = parseFloat(qtdMPoriginal).toFixed(4);

	var a1 = DatasetFactory.createConstraint("PLANOCORTEED",planocorte,planocorte,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("CODFILIAL",codfilial,codfilial,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("OS",os,os,ConstraintType.MUST)
	var a4 = DatasetFactory.createConstraint("NUMLOTE",numlote,numlote,ConstraintType.MUST)
	var a5 = DatasetFactory.createConstraint("IDPRD",idprd,idprd,ConstraintType.MUST)
	var versao = $("#VERSAOCONTROLESALDO").val()
	var a6 = DatasetFactory.createConstraint("VERSAO",versao,versao,ConstraintType.MUST)

	var constraints = new Array(a1,a2,a3,a4,a5,a6)

	console.log("Filtros :"+constraints);

	console.log("Vou rodar o dataset dsBuscaSaldoPAPC");

	var dataset = DatasetFactory.getDataset("dsBuscaSaldoPAPC",null,constraints,null)

	var row=dataset.values
	console.log(row)
	var retorno = row[0];

	var loteAtual=parseFloat(retorno["SALDODISPONIVEL"]).toFixed(4)

	var loteOriginal = parseFloat(qtdMPoriginal) + parseFloat(retalho);

	var retalho=loteAtual-qtdMPoriginal;

	console.log("calculando MP atual...");
	console.log("mp : "+qtdMPoriginal)
	console.log("retalho : "+retalho)
	console.log("lote original :"+ loteOriginal)
	console.log("lote atual :"+ loteAtual)



	if(retalho<0){
		return false;
	}
	else{
		return true;
	}

}

//VERIFICA SE FOI CADASTRADO UM OUTRO PLANO COM O MESMO NOME DURANTE O PROCESSO DO CADASTRO
function verificaFinalNumPlanoCad(){

	var numPlano = $("#NUMPLANO").val()
	numPlano = numPlano.toUpperCase()
	numPlano = numPlano.trim()
	$("#NUMPLANO").val(numPlano)
	
	// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
	var a1 = DatasetFactory.createConstraint("NUMPLANOCORTE",numPlano,numPlano,ConstraintType.MUST)
	
	var constraints = new Array(a1)
	
	var dataset = DatasetFactory.getDataset("dsVerificaNumPlanoCorte",null,constraints,null)
	var row = dataset.values
	
	// SE RETORNO É VAZIO OU NULO
	if(row=="" || row==null || row==undefined){
		
		return false;
		
	}
	else{

		return true;

	}

}


//NÃO ESTÁ SENDO USADA
function verificaFinalNumPlanoEd(){

	var numPlano = $("#NUMPLANOED").val()
	numPlano = numPlano.toUpperCase()
	$("#NUMPLANOED").val(numPlano)
	
	// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
	var a1 = DatasetFactory.createConstraint("NUMPLANOCORTE",numPlano,numPlano,ConstraintType.MUST)
	
	var constraints = new Array(a1)
	
	var dataset = DatasetFactory.getDataset("dsVerificaNumPlanoCorte",null,constraints,null)
	var row = dataset.values
	
	// SE RETORNO É VAZIO OU NULO
	if(row=="" || row==null || row==undefined){
		
		return false;
		
	}
	else{

		return true;

	}
}
			
//VERIFICA SE A OP JÁ ESTÁ CONCLUÍDA
function verificaOpConcluida(obj,linha){

	console.log("verifica se a OP foi concluida")
		
	var seq = $(obj).attr("id").split("___")[1]

	if(linha=="LINHACAD"){

		if($("#INCLUIRCAD___"+seq).is(":checked")){
		
			var codFilial = $("#CODFILIAL").val()
			var codColigada = 1
			var codOrdem = $("#CODORDEMCAD___"+seq).val()
			
			//console.log("osCad: "+osCad+", codFilial: "+codFilial+", codEstrutura: "+codEstrutura+", codOrdem: "+codOrdem+", idAtividade: "+idAtividade+", idprd: "+idprd)


			// MONTA O ARRAY DAS CONSTRAINTS
			var a1 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
			var a2 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST)
			var a3 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
			
			var constraints = new Array(a1,a2,a3)
			
			var dataset = DatasetFactory.getDataset("dsVerificaConclusaoOP",null,constraints,null)
			var row = dataset.values
			
			console.log("row")
			console.log(row)
			
			// SE NÃO TEVE RETORNO
			if(row=="" || row==null || row==undefined || row=="null"){

				ret = true;

			}
			else{
				ret = false;
			}
			
			
		}

	}
	else if(linha=="LINHAED"){

		if($("#INCLUIRED___"+seq).is(":checked")){
			
			var codFilial = $("#CODFILIALED").val()
			var codColigada = 1
			var codOrdem = $("#CODORDEMED___"+seq).val()

			// MONTA O ARRAY DAS CONSTRAINTS
			var a1 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
			var a2 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST)
			var a3 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
			
			var constraints = new Array(a1,a2,a3)
			
			var dataset = DatasetFactory.getDataset("dsVerificaConclusaoOP",null,constraints,null)
			var row = dataset.values
			
			console.log("row")
			console.log(row)
			
			// SE NÃO TEVE RETORNO
			if(row=="" || row==null || row==undefined || row=="null"){

				ret = true;

			}
			else{
				ret = false;
			}
			
			
		}

	}
	
	console.log("ret: "+ret)

	return ret

}


// $("#PLANOCORTE").on('mousemove',function(){

// 	var altura = $("#PLANOCORTE").height()

// 	if(altura < 580){
// 		$("#PLANOCORTE").parent().attr('style','width: 152.4% !important;')
// 	}
// 	else{
// 		$("#PLANOCORTE").parent().attr('style','width:154% !important')
// 	}

// })

// $(".PLANOCORTEED").on('mousemove',function(){

// 	var altura = $(".PLANOCORTEED").height()

// 	if(altura < 580){
// 		$(".PLANOCORTEED").parent().attr('style','width: 152.4% !important;')
// 	}
// 	else{
// 		$(".PLANOCORTEED").parent().attr('style','width:154% !important')
// 	}

// })


function iniciaWeekPickerCad(){

	InsereSemanaCAD()

	$("#SEMANA_NECESSIDADECAD").on("click",function(){

		var week = $("#SEMANA_NECESSIDADECAD").val()
		var semana;
		var ano;

		// $("#CLICK_DATA_NECESSIDADECAD").parent().on('click', function(){

		// 	$("#DATA_NECESSIDADECAD").click()

		// })
	
		$(".WEEK_PICKERCAD").show()

		var datanecessidade = FLUIGC.calendar('#DATA_NECESSIDADECAD');
	
		if(week=="" || week==null || week==undefined){	

			console.log("weekcad vazio vou preencher")
	
			var hoje = new Date()
			hoje = hoje.toLocaleDateString()
			hoje = hoje.split('/')
			hoje = new Date(hoje[2],hoje[1]-1,hoje[0],0,0,0)
			var semana = retornaSemanaDoAno(hoje.toISOString().split("T")[0])
			var ano = new Date().getFullYear()

			console.log(week)
			console.log(semana)
			console.log(ano)

			$("#WEEK_PICKERCAD").text(Number(semana))
			$("#YEAR_PICKERCAD").text(Number(ano))
			var week = semana.toString() + "/" + ano.toString()
			console.log(week)
			$("#SEMANA_NECESSIDADECAD").val(week)
	
		}
		else{
			
			
			if($("#DATA_NECESSIDADECAD").val()==null || $("#DATA_NECESSIDADECAD").val()==undefined || $("#DATA_NECESSIDADECAD").val()=="null" || $("#DATA_NECESSIDADECAD").val()==""){
			
				console.log("weekcad preenchido vou preencher")
				console.log(week)
				week = week.split("/")
				semana = week[0]
				ano = week[1]
				console.log(semana)
				console.log(ano)
				$("#WEEK_PICKERCAD").text(Number(semana))
				$("#YEAR_PICKERCAD").text(Number(ano))
				var week = semana.toString() + "/" + ano.toString()
				console.log(week)
				$("#SEMANA_NECESSIDADECAD").val(week)
				var a = retornaDiaDoAno(Number(semana),Number(ano))
				datanecessidade.setDate(a)
				datanecessidade.setMinDate(new Date(a.split("/")[2],a.split("/")[1]-1,a.split("/")[0]))
				datanecessidade.setMaxDate(new Date(a.split("/")[2],a.split("/")[1]-1,+a.split("/")[0]+5))

			}
			else{

				console.log("weekcad preenchido vou preencher")
				console.log(week)
				week = week.split("/")
				semana = week[0]
				ano = week[1]
				console.log(semana)
				console.log(ano)
				$("#WEEK_PICKERCAD").text(Number(semana))
				$("#YEAR_PICKERCAD").text(Number(ano))
				var week = semana.toString() + "/" + ano.toString()
				console.log(week)
				$("#SEMANA_NECESSIDADECAD").val(week)

			}
	
		}
	
	
	})



	$(document).click(function(e) {
		if($(e.target).is('.WEEKCAD, .WEEKCAD *')){
			return;
		}

		var week = $("#SEMANA_NECESSIDADECAD").val()
		var semana;
		var ano;

		var datanecessidade = FLUIGC.calendar('#DATA_NECESSIDADECAD');

		$(".WEEK_PICKERCAD").hide()


		if(week=="" || week==null || week==undefined){	

			console.log("weekcad vazio vou preencher")
			
			var hoje = new Date()
			hoje = hoje.toLocaleDateString()
			hoje = hoje.split('/')
			hoje = new Date(hoje[2],hoje[1]-1,hoje[0],0,0,0)
			semana = retornaSemanaDoAno(hoje.toISOString().split("T")[0])
			ano = new Date().getFullYear()

			//datanecessidade.setDate(hoje.toLocaleDateString())

			console.log(week)
			console.log(semana)
			console.log(ano)

			$("#WEEK_PICKERCAD").text(Number(semana))
			$("#YEAR_PICKERCAD").text(Number(ano))
			var week = semana.toString() + "/" + ano.toString()
			console.log(week)
			$("#SEMANA_NECESSIDADECAD").val(week)
	
		}
		else{

			if($("#DATA_NECESSIDADEED").val()==null || $("#DATA_NECESSIDADEED").val()==undefined || $("#DATA_NECESSIDADEED").val()=="null" || $("#DATA_NECESSIDADEED").val()==""){
			
				console.log("weekcad preenchido vou preencher")
				console.log(week)
				semana = $("#WEEK_PICKERCAD").text()
				ano = $("#YEAR_PICKERCAD").text()
				var week = semana.toString() + "/" + ano.toString()
				console.log(week)
				$("#SEMANA_NECESSIDADECAD").val(week)
				var a = retornaDiaDoAno(Number(semana),Number(ano))
				datanecessidade.setDate(a)
				datanecessidade.setMinDate(new Date(a.split("/")[2],a.split("/")[1]-1,a.split("/")[0]))
				datanecessidade.setMaxDate(new Date(a.split("/")[2],a.split("/")[1]-1,+a.split("/")[0]+5))

			}

	
		}

	});



	$("#incrementWeekCAD").on("click",function(){

		var semana = $("#WEEK_PICKERCAD").text()
		var ano = $("#YEAR_PICKERCAD").text()

		var ultimo = new Date(+ano,11,31)
		ultimo = ultimo.toLocaleDateString()
		ultimo = ultimo.split('/')
		ultimo = new Date(ultimo[2],ultimo[1]-1,ultimo[0],0,0,0)

		var semanamax=retornaSemanaDoAno(ultimo.toISOString().split("T")[0])

		if(+semana < semanamax){

			semana = Number(semana)+1

			$("#WEEK_PICKERCAD").text(Number(semana))

		}

		var week = semana +"/"+ano
		console.log(week)
		$("#SEMANA_NECESSIDADECAD").val(week)
		InsereDiaSemanaCAD()

	})

	$("#incrementYearCAD").on("click",function(){


		var semana = $("#WEEK_PICKERCAD").text()
		var ano = $("#YEAR_PICKERCAD").text()

		$("#YEAR_PICKERCAD").text(Number(ano)+1)

		ano = Number(ano)+1

		var week = semana +"/"+ano
		console.log(week)
		$("#SEMANA_NECESSIDADECAD").val(week)

		corrigeSemanaCAD()
		InsereDiaSemanaCAD()


	})

	$("#decrementWeekCAD").on("click",function(){


		var semana = $("#WEEK_PICKERCAD").text()
		var ano = $("#YEAR_PICKERCAD").text()
		var semanamin = new Date()
		semanamin = semanamin.toLocaleDateString()
		semanamin = semanamin.split('/')
		semanamin = new Date(semanamin[2],semanamin[1]-1,semanamin[0],0,0,0)
		semanamin=retornaSemanaDoAno(semanamin.toISOString().split("T")[0])

		if((+semana > 1 && ano != new Date().getFullYear()) || (+semana > semanamin && ano == new Date().getFullYear())){

			semana = Number(semana)-1
			$("#WEEK_PICKERCAD").text(Number(semana))

		}
		var week = semana +"/"+ano
		console.log(week)
		$("#SEMANA_NECESSIDADECAD").val(week)
		InsereDiaSemanaCAD()


	})

	$("#decrementYearCAD").on("click",function(){

		var semana = $("#WEEK_PICKERCAD").text()
		var ano = $("#YEAR_PICKERCAD").text()

		var anoatual = new Date()
		anoatual=anoatual.getFullYear()

		if(+ano > anoatual){

			$("#YEAR_PICKERCAD").text(Number(ano)-1)
			ano = Number(ano)-1

		}

		var week = semana +"/"+ano
		console.log(week)
		$("#SEMANA_NECESSIDADECAD").val(week)

		corrigeSemanaCAD()
		InsereDiaSemanaCAD()

	})

}

function InsereDiaSemanaCAD(){

	var datanecessidade = FLUIGC.calendar('#DATA_NECESSIDADECAD');

	var semana = $("#WEEK_PICKERCAD").text()
	var ano = $("#YEAR_PICKERCAD").text()
	var week = semana.toString() + "/" + ano.toString()
	console.log(week)
	$("#SEMANA_NECESSIDADECAD").val(week)
	var a = retornaDiaDoAno(Number(semana),Number(ano))
	datanecessidade.setDate(a)
	datanecessidade.setMinDate(new Date(a.split("/")[2],a.split("/")[1]-1,a.split("/")[0]))
	datanecessidade.setMaxDate(new Date(a.split("/")[2],a.split("/")[1]-1,+a.split("/")[0]+5))

}

function InsereSemanaCAD(){

	var week = $("#DATA_NECESSIDADECAD").val()

	if(week=="" || week==null || week==undefined){	

		week = $("#SEMANA_NECESSIDADECAD").val()

		if(week=="" || week==null || week==undefined){	

			week = $("#SEMANA_NECESSIDADECAD").val()
	
			console.log("weekcad vazio vou preencher")
			var hoje = new Date()
			hoje = hoje.toLocaleDateString()
			hoje = hoje.split('/')
			hoje = new Date(hoje[2],hoje[1]-1,hoje[0],0,0,0)
			var semana = retornaSemanaDoAno(hoje.toISOString().split("T")[0])
			var ano = new Date().getFullYear()
	
			console.log(week)
			console.log(semana)
			console.log(ano)
	
			$("#WEEK_PICKERCAD").text(Number(semana))
			$("#YEAR_PICKERCAD").text(Number(ano))
			var week = semana.toString() + "/" + ano.toString()
			console.log(week)
			$("#SEMANA_NECESSIDADECAD").val(week)
	
		}
		else{
			
			console.log("weekcad preenchido vou preencher")
			console.log(week)
			week = week.split("/")
			semana = week[0]
			ano = week[1]
			console.log(semana)
			console.log(ano)
			$("#WEEK_PICKERCAD").text(Number(semana))
			$("#YEAR_PICKERCAD").text(Number(ano))
			var week = semana.toString() + "/" + ano.toString()
			console.log(week)
			$("#SEMANA_NECESSIDADECAD").val(week)
	
		}
	
	}
	else{
		
		week = week.split('/')
		var ano = week[2]
		week = new Date(week[2],week[1]-1,week[0],0,0,0) 
		var semana = retornaSemanaDoAno(week.toISOString().split("T")[0])

		console.log(week)
		console.log(semana)
		console.log(ano)

		$("#WEEK_PICKERCAD").text(Number(semana))
		$("#YEAR_PICKERCAD").text(Number(ano))
		var week = semana.toString() + "/" + ano.toString()
		console.log(week)
		$("#SEMANA_NECESSIDADECAD").val(week)


	}

}

function corrigeSemanaCAD(){

	var datanecessidade = FLUIGC.calendar('#DATA_NECESSIDADECAD');

	var semana = $("#WEEK_PICKERCAD").text()
	var ano = $("#YEAR_PICKERCAD").text()

	var ultimo = new Date(+ano,11,31)
	ultimo = ultimo.toLocaleDateString()
	ultimo = ultimo.split('/')
	ultimo = new Date(ultimo[2],ultimo[1]-1,ultimo[0],0,0,0)
	var semanamax=retornaSemanaDoAno(ultimo.toISOString().split("T")[0])

	var semanamin = new Date()
	semanamin = semanamin.toLocaleDateString()
	semanamin = semanamin.split('/')
	semanamin = new Date(semanamin[2],semanamin[1]-1,semanamin[0],0,0,0)
	semanamin=retornaSemanaDoAno(semanamin.toISOString().split("T")[0])

	if(semana > semanamax){

		var week = semanamax+"/"+ano
		console.log(week)
		$("#SEMANA_NECESSIDADECAD").val(week)
		$("#WEEK_PICKERCAD").text(Number(semanamax))

	}
	if(semana < semanamin){

		var week = semanamin+"/"+ano
		console.log(week)
		$("#SEMANA_NECESSIDADECAD").val(week)
		$("#WEEK_PICKERCAD").text(Number(semanamin))

	}
	semana = $("#WEEK_PICKERCAD").text()
	ano = $("#YEAR_PICKERCAD").text()
	var a = retornaDiaDoAno(Number(semana),Number(ano))
	datanecessidade.setDate(a)
	datanecessidade.setMinDate(new Date(a.split("/")[2],a.split("/")[1]-1,a.split("/")[0]))
	datanecessidade.setMaxDate(new Date(a.split("/")[2],a.split("/")[1]-1,+a.split("/")[0]+5))

}


function retornaSemanaDoAno(date){

    var data = date.split('-')
    var hoje = new Date(data[0],data[1]-1,data[2],0,0,0)
    var primeiro = new Date(data[0],0,1,0,0,0)
    var ultimo = new Date(data[0],11,31,0,0,0)
    var numerodias = Math.floor(((hoje-primeiro)/(1000 * 60 * 60 * 24))+1)
    var diasano = Math.floor(((ultimo-primeiro)/(1000 * 60 * 60 * 24))+1)
    console.log(numerodias)
    console.log(diasano)
    var diasemanaultimo = ultimo.getUTCDay()
    var diasemanaprimeiro = primeiro.getUTCDay()
    var diasemanahoje = hoje.getUTCDay()
    if(diasemanahoje - diasemanaprimeiro >= 0 && numerodias < 7){

        console.log(1)
        return 1;

    }
    else if(numerodias < 7){

        console.log(2)
        return 2;

    }
    else if(diasano - numerodias < 7 && diasemanaultimo-diasemanahoje > 0){
    
        console.log(3)
        return Math.ceil((numerodias) / 7)+1;

    }
    else if(diasano - numerodias < 7 && diasemanaultimo-diasemanahoje == 0){

        console.log(4)
        return Math.ceil((numerodias) / 7);

    }
    else{

        console.log(5)
        return Math.ceil((numerodias+diasemanaprimeiro) / 7);
    }

}

function retornaDiaDoAno(semana,ano){

	console.log(semana)
	console.log(ano)
	var ret
	if(semana==1){

		var primeiro = new Date(ano,0,1,0,0,0)
		ret = new Date(ano,0,7-primeiro.getUTCDay(),0,0,0).toLocaleDateString()

	}
	else if(semana==2){

		var primeiro = new Date(ano,0,1,0,0,0)
		var diasemanaprimeiro = primeiro.getUTCDay()
		console.log("diasemanaprimeiro:"+diasemanaprimeiro)
		ret = new Date(ano,0,8-primeiro.getUTCDay(),0,0,0)
		if(ret.getUTCDay()==6){

			ret = new Date(ano,0,8-primeiro.getUTCDay()+2,0,0,0)

		}
		else if(ret.getUTCDay()==0){

			ret = new Date(ano,0,8-primeiro.getUTCDay()+1,0,0,0)

		}

		ret=ret.toLocaleDateString()

	}
	else{

		var umDia = 86400000;
		var dia = (semana * 7)-1	
		var dia = ((dia-6) * (1000 * 60 * 60 * 24)) + Number(new Date(ano,0,1,0,0,0))

		if(new Date(dia).getUTCDay()==0){

			ret = new Date(dia+umDia).toLocaleDateString()

		}
		else if(new Date(dia).getUTCDay()==6){

			ret = new Date(dia + (umDia*2)).toLocaleDateString()

		}
		else{

			ret = new Date(dia).toLocaleDateString()

		}

	}

	console.log("dia retornado : "+ret)
	return ret;
	
}

function addLinhaModalPAPCCAD(){


	var seq = Number($(".PLANOS_PENDENTESCAD").children("tbody").children().length) + 1

	var str = '<tr> '+
				' 	<td><input type="text" title="" onmouseover="mouse(this);" class="form-control" id="NUMPLANOCORTEMODALCAD___'+seq+'" name="NUMPLANOCORTEMODALCAD___'+seq+'" readonly></td> '+
				' 	<td><input type="text" title="" onmouseover="mouse(this);" class="form-control" id="QTDEMPMODALCAD___'+seq+'" name="QTDEMPMODALCAD___'+seq+'" readonly></td> '+
			 ' </tr> '

	$(".PLANOS_PENDENTESCAD").children("tbody").append(str)

	return seq;

}


function addLinhaModalPAPCED(){


	var seq = Number($(".PLANOS_PENDENTESED").children("tbody").children().length) + 1

	var str = '<tr> '+
			 ' 	<td><input type="text" title="" onmouseover="mouse(this);" class="form-control" id="NUMPLANOCORTEMODALED___'+seq+'" name="NUMPLANOCORTEMODALED___'+seq+'" readonly></td> '+
			 ' 	<td><input type="text" title="" onmouseover="mouse(this);" class="form-control" id="QTDEMPMODALED___'+seq+'" name="QTDEMPMODALED___'+seq+'" readonly></td> '+
			 ' </tr> '

	$(".PLANOS_PENDENTESED").children("tbody").append(str)

	return seq;

}

function  carregaModalPlanosPendCAD(){

	var numlote = $("#NUMLOTECAD").val()
	var versao = $("#VERSAOCONTROLESALDO").val()
	var codfilial = $("#CODFILIAL").val()

	var a1 = DatasetFactory.createConstraint("CODFILIAL",codfilial,codfilial,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("NUMLOTE",numlote,numlote,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("VERSAO",versao,versao,ConstraintType.MUST)

	var constraints = new Array(a1,a2,a3)

	console.log("Vou rodar o dataset dsPlanosPendentesSaldo");

	var dataset = DatasetFactory.getDataset("dsPlanosPendentesSaldo",null,constraints,null)

	var row=dataset.values
	console.log(row)
	var count = row.length
	console.log("registros : "+count)

	$(".PLANOS_PENDENTESCAD").children("tbody").empty()

	if(count>0){

		var soma = 0 

		for(var i=0;i<count;i++){

			var rep = row[i]

			var seq = addLinhaModalPAPCCAD()

			$("#NUMPLANOCORTEMODALCAD___"+seq).val(rep["NUMPLANOCORTE"])
			$("#QTDEMPMODALCAD___"+seq).val(rep["QTDEMP"])

			soma += Number(rep["QTDEMP"])

		}

		var seq = addLinhaModalPAPCCAD()
		$("#NUMPLANOCORTEMODALCAD___"+seq).val("SOMATÓRIO")
		$("#QTDEMPMODALCAD___"+seq).val(parseFloat(soma).toFixed(4))


	}

}

function  carregaModalPlanosPendED(){

	var numlote = $("#NUMLOTEED").val()
	var versao = $("#VERSAOCONTROLESALDO").val()
	var codfilial = $("#CODFILIALED").val()
	var numplanocorte =$("#NUMPLANOED").val()

	var a1 = DatasetFactory.createConstraint("CODFILIAL",codfilial,codfilial,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("NUMLOTE",numlote,numlote,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("VERSAO",versao,versao,ConstraintType.MUST)
	var a4 = DatasetFactory.createConstraint("PLANOCORTEED",numplanocorte,numplanocorte,ConstraintType.MUST)

	var constraints = new Array(a1,a2,a3)

	console.log("Vou rodar o dataset dsPlanosPendentesSaldo");

	var dataset = DatasetFactory.getDataset("dsPlanosPendentesSaldo",null,constraints,null)

	var row=dataset.values
	console.log(row)
	var count = row.length
	console.log("registros : "+count)

	$(".PLANOS_PENDENTESED").children("tbody").empty()

	if(count>0){

		var soma = 0 

		for(var i=0;i<count;i++){

			var rep = row[i]

			var seq = addLinhaModalPAPCED()

			$("#NUMPLANOCORTEMODALED___"+seq).val(rep["NUMPLANOCORTE"])
			$("#QTDEMPMODALED___"+seq).val(rep["QTDEMP"])

			soma += Number(rep["QTDEMP"])

		}

		var seq = addLinhaModalPAPCED()
		$("#NUMPLANOCORTEMODALED___"+seq).val("SOMATÓRIO")
		$("#QTDEMPMODALED___"+seq).val(parseFloat(soma).toFixed(4))

	}
	
}



function ToogleColuna(obj){


	$(".fixo2cad").toggle()

	if($(".fixo2cad").is(":visible")){

		$("a[alvo='VIEW']").removeClass("bi-eye")
		$("a[alvo='VIEW']").addClass("bi-eye-slash")

		$(".fixo7cad").addClass("fixo3cad")
		$(".fixo7cad").removeClass("fixo7cad")

		$(".fixo8cad").addClass("fixo4cad")
		$(".fixo8cad").removeClass("fixo8cad")

		$(".fixo9cad").addClass("fixo5cad")
		$(".fixo9cad").removeClass("fixo9cad")

		$(".fixo10cad").addClass("fixo6cad")
		$(".fixo10cad").removeClass("fixo10cad")


	}
	else{
		
		$("a[alvo='VIEW']").addClass("bi-eye")
		$("a[alvo='VIEW']").removeClass("bi-eye-slash")

		$(".fixo3cad").addClass("fixo7cad")
		$(".fixo3cad").removeClass("fixo3cad")

		$(".fixo4cad").addClass("fixo8cad")
		$(".fixo4cad").removeClass("fixo4cad")

		$(".fixo5cad").addClass("fixo9cad")
		$(".fixo5cad").removeClass("fixo5cad")

		$(".fixo6cad").addClass("fixo10cad")
		$(".fixo6cad").removeClass("fixo6cad")

	}

}
