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
				text: 'Se não for fabricar quantidades nesta OP, exclua a necessidade'
			})
		}
		else if(qtdePlano>parseInt(Number(saldo)+Number($("#QTDEPLANOEDORIGINAL___"+seq).val()))){
			
			console.log("qtdePlano é maior que o saldo")
			
			$("#SALDOED___"+seq).val(parseInt(parseInt($("#SALDOEDORIGINAL___"+seq).val())+parseInt($("#QTDEPLANOEDORIGINAL___"+seq).val())))
			$("#QTDEPLANOED___"+seq).val("")
			
			// EXIBE ALERTA
			Swal.fire({
				icon: 'error',
				title: 'A quantidade informada ultrapassou o saldo',
				text: 'Verifique e tente novamente'
			})
			
		} else {
			
			$("#SALDOED___"+seq).val(((Number($("#SALDOEDORIGINAL___"+seq).val())+Number($("#QTDEPLANOEDORIGINAL___"+seq).val()))-qtdePlano))
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

			var a1 = DatasetFactory.createConstraint("PLANOCORTEED",planocorte,planocorte,ConstraintType.MUST)
			var a2 = DatasetFactory.createConstraint("CODFILIAL",codfilial,codfilial,ConstraintType.MUST)
			var a3 = DatasetFactory.createConstraint("OS",os,os,ConstraintType.MUST)
			var a4 = DatasetFactory.createConstraint("NUMLOTE",numlote,numlote,ConstraintType.MUST)
			var a5 = DatasetFactory.createConstraint("IDPRD",idprd,idprd,ConstraintType.MUST)

			var constraints = new Array(a1,a2,a3,a4,a5)

			console.log("Vou rodar o dataset dsBuscaSaldoPAPC");

			var dataset = DatasetFactory.getDataset("dsBuscaSaldoPAPC",null,constraints,null)

			var row=dataset.values
			console.log(row)
			var retorno = row[0];
			
			$("#SALDODISPONIVELED").val(parseFloat(retorno["SALDODISPONIVEL"]).toFixed(4))
			formataValorVirgula($("#SALDODISPONIVELED"))
			$("#SALDOAUXED").val(parseFloat(retorno["SALDODISPONIVEL"]).toFixed(4))
			formataValorVirgula($("#QTDESUCATAPLANED"))


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

function limpaLogModal(){

	$("#LOG_CRIACAO_ED").text("")
	$("#LOG_EDICOES_ED_ADD").empty()


}

function addLinhaLogEdicao(){

	var seq = $("a[id^='SEQ_LOG_ED___']")
	seq = Number(seq.length) + 1

	var str = "<a class='list-group-item' id='SEQ_LOG_ED___"+seq+"' name='SEQ_LOG_ED___"+seq+"'></a>"

	$("#LOG_EDICOES_ED_ADD").append(str)

	return seq;

}

function carregaLog(obj){

	var seq = $(obj).attr("id").split("___")[1]

	var dataoriginal = $("#DATAORIGINALED___"+seq).val().split(" ")[0].split("-")
	dataoriginal = dataoriginal[2]+"/"+dataoriginal[1]+"/"+dataoriginal[0]

	$("#LOG_CRIACAO_ED").text("Necessidade criada dia "+dataoriginal+" pelo usuário "+ $("#USUARIOORIGINALED___"+seq).val() +" ")

	$("#LOG_OBS_PCP_ED").text($("#OBSPCPED___"+seq).val()=="" ? "Sem observações do PCP" : $("#OBSPCPED___"+seq).val())
	$("#LOG_OBS_ENG_ED").text($("#OBSENGED___"+seq).val()=="" ? "Sem observações da Engenharia" : $("#OBSENGED___"+seq).val())

	var histlog = $("#LOGORIGINALED___"+seq).val()

	if(histlog!=null && histlog!=undefined && histlog!="" && histlog!="null"){

		histlog = histlog.split(";")

		for(var i=0; i < histlog.length - 1 ; i++){
	
			var seq2 = addLinhaLogEdicao()
	
			$("#SEQ_LOG_ED___"+seq2).text(histlog[i])
	
		}
	}
	else{

		var seq2 = addLinhaLogEdicao()
	
		$("#SEQ_LOG_ED___"+seq2).text("Esta necessidade ainda não sofreu alterações")

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
			
			var os = $("#CODPRJPLANCAD").val()
			var filial = $("#CODFILIAL").val()
			var material = $("#DSCMATERIALPLANCAD").val()
			var codSucata = $("#CODPRDSUCATACAD").val()
			var qtdeSucata = $("#QTDESUCATAPLANCAD").val()
			//var codAtividade = $("#CODATIVIDADEPLANCAD").val()
			var dscAtividade = $("#DSCCODATIVIDADEPLANCAD").val()
			var numDesenho = $("#DSCNUMDESENHOCAD").val()
			//var dscAtividade = $("#DSCCODATIVIDADEPLANCAD").val()
			var order = $("#ORDENARPORCAD").val()
			//var retalho = $("#RETALHOCAD").val()
			//var qtdeMP = $("#QTDEMPCAD").val()
			//var codMaterial = $("#CODMATERIALCAD").val()
			//var numLote = $("#NUMLOTECAD").val()
			//var idLote = $("#IDLOTECAD").val()
			
			// SE CAMPOS OBRIGATÓRIOS FORAM INFORMADOS
			if(!((os=="" || os==null || os==undefined) || 
				 (filial=="" || filial==null || filial==undefined)
				)){
				
				// LIMPA CONTEÚDO DA TABELA DE CADASTRO
				limpaTabelaCadastro()
				
				// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
				var a1 = DatasetFactory.createConstraint("OS",os,os,ConstraintType.MUST)
				var a2 = DatasetFactory.createConstraint("MATERIAL",material,material,ConstraintType.MUST)
				var a3 = DatasetFactory.createConstraint("CODATIVIDADE",dscAtividade,dscAtividade,ConstraintType.MUST)
				var a4 = DatasetFactory.createConstraint("NUMDESENHO",numDesenho,numDesenho,ConstraintType.MUST)
				var a5 = DatasetFactory.createConstraint("DSCATIVIDADE",dscAtividade,dscAtividade,ConstraintType.MUST)
				var a6 = DatasetFactory.createConstraint("CODFILIAL",filial,filial,ConstraintType.MUST)
				
				var constraints
				
				// SE ORDER BY FOI PREENCHIDO
				if(!(order=="" || order==null || order==undefined)){
					
					console.log("order: "+order)
					
					var a7 = DatasetFactory.createConstraint("ORDER",order,order,ConstraintType.MUST)
					constraints = new Array(a1,a2,a3,a4,a5,a6,a7)
					
				}else{
					// SE NÃO
					
					constraints = new Array(a1,a2,a3,a4,a5,a6)
					
				}
				
				var dataset = DatasetFactory.getDataset("dsBuscaPlanoCortePend",null,constraints,null)
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
						
						$("#OSCAD___"+seq).val(rep["OS"])
						$("#NUMDESENHOCAD___"+seq).val(rep["NUMDESENHO"])
						$("#CODESTRUTURACAD___"+seq).val(rep["CODESTRUTURA"])
						$("#CODORDEMCAD___"+seq).val(rep["OP"])
						$("#EXECUCAOCAD___"+seq).val(rep["EXECUCAO"])
						$("#ATIVIDADECAD___"+seq).val(rep["DSCATIVIDADE"])
						$("#CODATIVIDADECAD___"+seq).val(rep["CODATIVIDADE"])
						$("#IDATIVIDADECAD___"+seq).val(rep["IDATVORDEM"])
						$("#POSICAOCAD___"+seq).val(rep["POSICAO"])
						$("#QTDEPREVISTACAD___"+seq).val(parseInt(rep["QTDEPLANEJADA"]).toFixed(0))
						$("#ITEMCAD___"+seq).val(rep["ITEM"])
						$("#MATERIALCAD___"+seq).val(rep["MATERIAL"])
						$("#BITOLACAD___"+seq).val(rep["BITOLA"])
						$("#CODCOLIGADACAD___"+seq).val(rep["CODCOLIGADA"])
						
						// SE ITEM JÁ TEM PLANO DE CORTE CADASTRADO
						if(!(rep["SALDO"]=="" || rep["SALDO"]=="null" || rep["SALDO"]==null || rep["SALDO"]==undefined)){
							
							$("#SALDOCAD___"+seq).val(parseInt(rep["SALDO"]).toFixed(0))
							$("#SALDOCADORIGINAL___"+seq).val(parseInt(rep["SALDO"]).toFixed(0))
							
						} else {
							
							$("#SALDOCAD___"+seq).val(parseInt(rep["QTDEPLANEJADA"]).toFixed(0))
							$("#SALDOCADORIGINAL___"+seq).val(parseInt(rep["QTDEPLANEJADA"]).toFixed(0))
							
						}
						
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
						reconstroiFiltros()
						
					}
					
					// CONSTRÓI FILTROS PARA A TABELA DO CADASTRO DO PLANO DE CORTE
					constroiFiltros()
					
				} else {
					
					// EXIBE ALERTA
					Swal.fire({
						  icon: 'error',
						  title: 'Busca para os filtros informados não obteve retorno',
						  message: 'Verifique e tente novamente.'
					})
					
				}
				
			} else {
				// SE NÃO
				
				// EXIBE ALERTA
				Swal.fire({
					  icon: 'error',
					  title: 'Há filtros obrigatórios que não foram informados',
					  text: 'Verifique e tente novamente.'
				})
				
			}
			
		}
		
		// SE ABA EDIÇÃO ESTÁ ATIVA
		if($("#ABAED").hasClass("active")){
			
			console.log("Aba da edição está ativa. VOU EDITAR")
			
			var os = $("#CODPRJPLANED").val()
			var material = $("#DSCMATERIALPLANED").val()
			var order = $("#ORDENARPORED").val()
			
			// SE CAMPOS OBRIGATÓRIOS FORAM INFORMADOS
			if(!(os=="" || os==null || os==undefined)){

				// LIMPA CONTEÚDO DA TABELA DE EDIÇÃO
				limpaTabelaEdicao()
				
				console.log("Vou buscar para os: "+os+", material: "+material)
				
				// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
				var a1 = DatasetFactory.createConstraint("OS",os,os,ConstraintType.MUST)
				var a2 = DatasetFactory.createConstraint("STATUS",3,3,ConstraintType.MUST)
				
				var constraints
				
				// SE ORDER BY FOI PREENCHIDO
				if(!(order=="" || order==null || order==undefined)){
					
					console.log("order: "+order)
					
					var a6 = DatasetFactory.createConstraint("ORDER",order,order,ConstraintType.MUST)
					constraints = new Array(a1,a2,a6)
					
				}else{
					// SE NÃO
					
					constraints = new Array(a1,a2)
					
				}
				
				var dataset = DatasetFactory.getDataset("dsBuscaNecessidadeEdicao",null,constraints,null)
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
						
						$("#OSED___"+seq).val(rep["OS"])
						$("#CODCOLIGADAED___"+seq).val(rep["CODCOLIGADA"])
						$("#NUMDESENHOED___"+seq).val(rep["NUMDESENHO"])
						$("#CODESTRUTURAED___"+seq).val(rep["CODESTRUTURA"])
						$("#EXECUCAOED___"+seq).val(rep["EXECUCAO"])
						$("#CODORDEMED___"+seq).val(rep["OP"])
						$("#ATIVIDADEED___"+seq).val(rep["DSCATIVIDADE"])
						$("#CODATIVIDADEED___"+seq).val(rep["CODATIVIDADE"])
						$("#IDATIVIDADEED___"+seq).val(rep["IDATVORDEM"])
						$("#POSICAOED___"+seq).val(rep["POSICAO"])
						var prioridade = Number(rep["PRIORIDADE"])
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
						$("#CELDATANECESSIDADEED___"+seq).val(rep["DATANECESSIDADE"])
						$("#CELSEMANANECESSIDADEED___"+seq).val(rep["SEMANANECESSIDADE"])

						$("#QTDEATENDIDAED___"+seq).val(rep["QTDATENDIDA"]=="null" ? 0 : rep["QTDATENDIDA"])
						
						$("#VALDATANECESSIDADEED___"+seq).val(formataDataBanco(rep["DATANECESSIDADE"]))
						$("#ITEMED___"+seq).val(rep["ITEM"])
						$("#MATERIALED___"+seq).val(rep["MATERIAL"])
						$("#QTDEPREVISTAED___"+seq).val(parseInt(rep["QTDEPLANEJADA"]).toFixed(0))
						$("#BITOLAED___"+seq).val(rep["BITOLA"])
						$("#QTDEPLANOED___"+seq).val(rep["QUANTIDADEED"])
						$("#QTDEPLANOEDORIGINAL___"+seq).val(rep["QUANTIDADEED"])
						$("#PAPCED___"+seq).val(rep["PAPC"])
						$("#USUARIOORIGINALED___"+seq).val(rep["RECCREATEDBY"])
						$("#DATAORIGINALED___"+seq).val(rep["RECCREATEDON"])
						$("#LOGORIGINALED___"+seq).val(rep["LOGNECESSIDADE"])


						$("#OBSPCPED___"+seq).val(rep["COMPLEMENTO"].toLowerCase() == "null" ? "" : rep["COMPLEMENTO"])
						$("#OBSENGED___"+seq).val(rep["OBS"].toLowerCase() == "null" ? "" : rep["OBS"])

						console.log("papc : "+rep["PAPC"])
						
							
						$("#SALDOED___"+seq).val(parseInt(rep["SALDOED"]).toFixed(0))
						$("#SALDOEDORIGINAL___"+seq).val(parseInt(rep["SALDOED"]).toFixed(0))
							
						
						// SE NÚMERO DO PLANO CORTE NÃO FOI VINCULADO
						if(!(rep["NUMPLANOCORTE"]=="" || rep["NUMPLANOCORTE"]==null || rep["NUMPLANOCORTE"]==undefined || rep["NUMPLANOCORTE"]=="null")){
							
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

						if(Number(rep["STATUSNECESSIDADE"])!=0){

							$("#INCLUIRED___"+seq).prop("disabled",true)
							$("#INCLUIRED___"+seq).attr("title","Esta necessidade já está sendo atendida pela engenharia")

						}
						else{

							$("#INCLUIRED___"+seq).attr("title","Necessidade não alterada pela engenharia")

						}

						if(rep["SEMANAREPROGRAMACAO"]=="null"){

							$("#CELDATANECESSIDADEGERALED___"+seq).val(rep["DATANECESSIDADE"])
							$("#CELSEMANANECESSIDADEGERALED___"+seq).val(rep["SEMANANECESSIDADE"])

						}
						else{

							$("#CELDATANECESSIDADEGERALED___"+seq).val(rep["DATAREPROGRAMACAO"])
							$("#CELSEMANANECESSIDADEGERALED___"+seq).val(rep["SEMANAREPROGRAMACAO"])

						}

						$("#NSEQPEDIDOED___"+seq).val(rep["NSEQPEDIDO"])

						if($("#QTDEATENDIDAED___"+seq).val() == $("#QTDEPLANOED___"+seq).val()){

							$("#STATUSED___"+seq).parent().append(status.CONCLUIDO)
							$("#STATUSED___"+seq).parent().addClass('icons-bag')

							$("#STATUSED___"+seq).parents("tr").first().addClass("CONCLUIDO")

							$("#CONCLUIDO").text( Number($("#CONCLUIDO").text()) + 1)

						}
						else if($("#QTDEATENDIDAED___"+seq).val() > 0){

							$("#STATUSED___"+seq).parent().append(status.PARCIAL)
							$("#STATUSED___"+seq).parent().addClass('icons-bag')

							$("#STATUSED___"+seq).parents("tr").first().addClass("PARCIAL")

							$("#PARCIAL").text( Number($("#PARCIAL").text()) + 1)

						}

						if(rep["SEMANAREPROGRAMACAO"]!="" && rep["SEMANAREPROGRAMACAO"]!=null && rep["SEMANAREPROGRAMACAO"]!=undefined && rep["SEMANAREPROGRAMACAO"]!="null"){

							$("#STATUSED___"+seq).parent().append(status.REPROGRAMADO)
							$("#STATUSED___"+seq).parent().addClass('icons-bag')

							$("#STATUSED___"+seq).parents("tr").first().addClass("REPROGRAMADO")

							$("#REPROGRAMADO").text( Number($("#REPROGRAMADO").text()) + 1)

						} 

						if(rep["RETRABALHO"]==1){

							$("#STATUSED___"+seq).parent().append(status.RETRABALHO)
							$("#STATUSED___"+seq).parent().addClass('icons-bag')

							$("#RETRABALHO").text( Number($("#RETRABALHO").text()) + 1)

							$("#STATUSED___"+seq).parents("tr").first().addClass("RETRABALHO")

						}

						if(rep["PENDENCIA"]==1){

							$("#STATUSED___"+seq).parent().append(status.PENDENCIA)
							$("#STATUSED___"+seq).parent().addClass('icons-bag')

							$("#PENDENCIA").text( Number($("#PENDENCIA").text()) + 1)

							$("#STATUSED___"+seq).parents("tr").first().addClass("PENDENCIA")

						}



						$("#TODOS").text( Number($("#TODOS").text()) + 1)

						
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
	$('#INFOATIVIDADECAD___1').children('option:not(:first)').remove();
	$('#INFOPOSICAOCAD___1').children('option:not(:first)').remove();
	$('#INFOQTDEPREVISTACAD___1').children('option:not(:first)').remove();
	$('#INFOSALDOCAD___1').children('option:not(:first)').remove();
	$('#INFOQTDEPLANOCAD___1').children('option:not(:first)').remove();
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
	$('#INFOPRIORIDADEED___1').children('option:not(:first)').remove();
	$('#INFODATANECESSIDADEED___1').children('option:not(:first)').remove();
	$('#INFOITEMED___1').children('option:not(:first)').remove();
	$('#INFOMATERIALED___1').children('option:not(:first)').remove();
	$('#INFOBITOLAED___1').children('option:not(:first)').remove();

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

		console.log("filtro CODORDEM está vazio")
		
		$('#INFOPAPCED___1').children('option:not(:first)').remove();
		$("#INFOPAPCED___1").css("border-color","#d1d3d4")
		$("#INFOPAPCED___1").css("background-color","#fff")
		
	} else {
		
		console.log("filtro CODORDEM não está vazio")
		
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
	if($("#INFOQTDEATENDIDAED___1").val()=="" || $("#INFOQTDEATENDIDAED___1").val()==null){

		console.log("filtro QTDEPLANO está vazio")
		
		$('#INFOQTDEATENDIDAED___1').children('option:not(:first)').remove();
		$("#INFOQTDEATENDIDAED___1").css("border-color","#d1d3d4")
		$("#INFOQTDEATENDIDAED___1").css("background-color","#fff")
		
	} else {
		
		console.log("filtro QTDEPLANO não está vazio")
		
		$("#INFOQTDEATENDIDAED___1").css("border-color","#b92113")
		$("#INFOQTDEATENDIDAED___1").css("background-color","#f2dede")
		
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
	var qtdeAtendida= $("#INFOQTDEATENDIDA___1").val()
	var prioridade = $("#INFOPRIORIDADEED___1").val()
	var datanecessidade = $("#INFODATANECESSIDADEED___1").val()
	var itemCad = $("#INFOITEMED___1").val()
	var materialCad = $("#INFOMATERIALED___1").val()
	var bitolaCad = $("#INFOBITOLAED___1").val()
	
	console.log("numOS: "+numOS+", osCad: "+osCad+", numDesenho: "+numDesenho+", execucao: "+execucao+", codOrdem: "+codOrdem+", atividadeCad: "+atividadeCad+", posicaoCad: "+posicaoCad+
			", qtdePrevista: "+qtdePrevista+", saldo: "+saldo+", qtdePlano: "+qtdePlano+", itemCad: "+itemCad+", materialCad: "+materialCad+", bitolaCad: "+bitolaCad+", data-necessidade: "+datanecessidade+", prioridade: "+prioridade)

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
	if($("#INFOQTDEATENDIDAED___1").val()=="" || $("#INFOQTDEATENDIDAED___1").val()==null){

		constroiSelectQtdeAtendidaEd()
	
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

function constroiSelectQtdeAtendidaEd(){

	console.log("vou construir select qtde plano")
	var arrayQtdeAtendida = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='QTDEATENDIDAED___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var qtdeAtendida = $("#QTDEATENDIDAED___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHAED___"+seq).hasClass("invisivel"))){
		
			// SE NUMDESENHO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayQtdeAtendida.includes(qtdeAtendida)) && !(qtdeAtendida=="")){
				
				arrayQtdeAtendida.push(qtdeAtendida)
				
			}
			
		}
		
	})
	
	arrayQtdeAtendida = arrayQtdeAtendida.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayQtdeAtendida.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOQTDEATENDIDAED___1').append($("<option class='info'></option>").attr("value", arrayQtdeAtendida[i]).text(arrayQtdeAtendida[i]));
		
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
function constroiSelectPrioridadeEd(){
	
	console.log("vou construir select item")
	var arrayItem = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='CELDATANECESSIDADEED___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var item = $("#CELDATANECESSIDADEED___"+seq).val()
		
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
	
			console.log("filtro CODORDEM está vazio")
			
			$('#INFOPAPCED___1').children('option:not(:first)').remove();
			$("#INFOPAPCED___1").css("border-color","#d1d3d4")
			$("#INFOPAPCED___1").css("background-color","#fff")
			
		} else {
			
			console.log("filtro CODORDEM não está vazio")
			
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
		if($("#INFOQTDEATENDIDAED___1").val()=="" || $("#INFOQTDEATENDIDAED___1").val()==null){
	
			console.log("filtro QTDEPLANO está vazio")
			
			$('#INFOQTDEATENDIDAED___1').children('option:not(:first)').remove();
			$("#INFOQTDEATENDIDAED___1").css("border-color","#d1d3d4")
			$("#INFOQTDEATENDIDAED___1").css("background-color","#fff")
			
		} else {
			
			console.log("filtro QTDEPLANO não está vazio")
			
			$("#INFOQTDEATENDIDAED___1").css("border-color","#b92113")
			$("#INFOQTDEATENDIDAED___1").css("background-color","#f2dede")
			
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

	
function mostraSectionCAD(){

	$(".sectionCAD").hide();

	$("input[id^='INCLUIRCAD___']").each(function(){

		if($(this).is(":checked")){

			$(".sectionCAD").show();

		}

	})

}

function mostraSectionED(){

	$(".sectionED").hide();

	$("input[id^='INCLUIRED___']").each(function(){

		if($(this).is(":checked")){

			$(".sectionED").show();

		}

	})

}

// HABILITA QTDE PLANO NA TABELA
function habilitaQtdePlano(obj){
	
	console.log("entrei para habilitar qtde plano")
	
	var seq = $(obj).attr("id").split("___")[1]
	var linha = $(obj).parents("tr").attr("id").split("___")[0]
	//var linha = $(obj).attr("id").split("___")[0]

	var myLoading2 = FLUIGC.loading(window)
	myLoading2.show();


	
	console.log("seq: "+seq+", linha: "+linha)

	// SE ITEM FOI SELECIONADO PARA SER CADASTRADO
	if($(obj).is(":checked")){

		console.log("elemento selecionado")
	
		// SE LINHA DE CADASTRO FOI SELECIONADA
		if(linha=="LINHACAD"){

			mostraSectionCAD()
			$("#LINHACAD___"+seq).addClass("selecionado")
			$("#QTDEPLANOCAD___"+seq).prop("readonly",false)
			
		}
		// SE LINHA DE EDIÇÃO FOI SELECIONADA
		if(linha=="LINHAED"){

			mostraSectionED()
			$("#LINHAED___"+seq).addClass("selecionado")
			$("#QTDEPLANOED___"+seq).prop("readonly",false)

		}
		
	} else {
		// SE NÃO

		console.log("elemento não selecionado")

		// SE LINHA DE CADASTRO FOI TIRADA A SELEÇÃO
		if(linha=="LINHACAD"){

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
			
		}
		
		// SE LINHA DE EDIÇÃO FOI FOI TIRADA A SELEÇÃO
		if(linha=="LINHAED"){

			mostraSectionED()

			var planoEd = $("#QTDEPLANOED___"+seq).val()
		
			$("#LINHAED___"+seq).removeClass("selecionado")
			$("#QTDEPLANOED___"+seq).prop("readonly",true)
			$("#SALDOED___"+seq).val(parseInt($("#SALDOEDORIGINAL___"+seq).val()))
			$("#QTDEPLANOED___"+seq).val(parseInt($("#QTDEPLANOEDORIGINAL___"+seq).val()))

			
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
				material==materialLista && bitola==bitolaLista)){
		
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
		var qtdeAtendida = $("#INFOQTDEATENDIDAED___1").val()
		var prioridade = $("#INFOPRIORIDADEED___1").val()
		var datanecessidade = $("#INFODATANECESSIDADEED___1").val()
		var item = $("#INFOITEMED___1").val()
		var material = $("#INFOMATERIALED___1").val()
		var bitola = $("#INFOBITOLAED___1").val()
		var papc = $("#INFOPAPCED___1").val()
		
		console.log("os: "+os+", numDesenho: "+numDesenho+", codOrdem: "+codOrdem+", execucao: "+execucao+", atividade: "+
				atividade+", posicao: "+posicao+", qtdePrevista: "+qtdePrevista+", saldo: "+saldo+", qtdePlano: "+
				qtdePlano+", item: "+item+", material: "+material+", bitola: "+bitola+", papc: "+papc+",qtdeatendida: "+qtdeAtendida)
		
		var osLista = $("#OSED___"+seq).val()
		var numDesenhoLista = $("#NUMDESENHOED___"+seq).val()
		var execucaoLista = $("#EXECUCAOED___"+seq).val()
		var codOrdemLista = $("#CODORDEMED___"+seq).val()
		var atividadeLista = $("#ATIVIDADEED___"+seq).val()
		var posicaoLista = $("#POSICAOED___"+seq).val()
		var qtdePrevistaLista = $("#QTDEPREVISTAED___"+seq).val()
		var saldoLista = $("#SALDOED___"+seq).val()
		var qtdePlanoLista = $("#QTDEPLANOED___"+seq).val()
		var prioridadeLista =  $("#CELDATANECESSIDADEED___"+seq).val()
		var datanecessidadeLista = $("#CELSEMANANECESSIDADEED___"+seq).val()
		var itemLista = $("#ITEMED___"+seq).val()
		var materialLista = $("#MATERIALED___"+seq).val()
		var bitolaLista = $("#BITOLAED___"+seq).val()
		var papcLista = $("#PAPCED___"+seq).val()
		var qtdeAtendidaLista = $("#QTDEATENDIDAED___"+seq).val()
	
		console.log("osLista: "+osLista+", numDesenhoLista: "+numDesenhoLista+", execucaoLista: "+execucaoLista+", codOrdemLista: "+codOrdemLista+
				", atividadeLista: "+atividadeLista+", posicaoLista: "+posicaoLista+", qtdePrevistaLista: "+
				qtdePrevistaLista+", saldoLista: "+saldoLista+", qtdePlanoLista: "+qtdePlanoLista+
				", itemLista: "+itemLista+", materialLista: "+materialLista+", bitolaLista: "+
				bitolaLista+", prioridade: "+prioridadeLista+", data-necessidade: "+datanecessidadeLista+", papcLista: "+papcLista+", qtdeatendidalista: "+qtdeAtendidaLista)
	
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
		if(qtdeAtendida=="" || qtdeAtendida==null){
			console.log("filtro qtdeAtendida esta vazio")
			qtdeAtendida = qtdeAtendidaLista
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
				material==materialLista && bitola==bitolaLista && prioridade==prioridadeLista && datanecessidade == datanecessidadeLista && papc==papcLista && qtdeAtendida==qtdeAtendidaLista)){
		
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
	
}

// LIMPA O CONTEÚDO DA TABELA DE EDIÇÃO
function limpaTabelaEdicao(){
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSED___']").each(function(){
		
		$(this).parents("tr").remove();
		
	})

	$("#REPROGRAMADO").text(0)
	$("#CONCLUIDO").text(0)
	$("#PENDENCIA").text(0)
	$("#PARCIAL").text(0)
	$("#RETRABALHO").text(0)
	$("#TODOS").text(0)
	
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
		$(".CONSULTA").hide()
		$(".filtrosConsulta").hide()
		AtualizaTabelaCad()
		
	} 
	
	// SE OPÇÃO É EDITAR
	if(op==2){
		
		$(".CADASTRO").hide()
		$(".EDICAO").show()
		$(".filtrosCadastro").hide()
		$(".filtrosEdicao").show()
		$(".CONSULTA").hide()
		$(".filtrosConsulta").hide()
		AtualizaTabelaEd()

	}
	if(op==3){

		$(".CADASTRO").hide()
		$(".EDICAO").hide()
		$(".CONSULTA").show()
		$(".filtrosCadastro").hide()
		$(".filtrosEdicao").hide()
		$(".filtrosConsulta").show()

	}
	
}

function AtualizaTabelaEd(){

	var os = $("#CODPRJPLANED").val()

	if(os != "" && os!=null && os!=undefined){

		buscarPlano();

	}

}

function AtualizaTabelaCad(){

	var os = $("#CODPRJPLANCAD").val()

	if(os != "" && os!=null && os!=undefined){

		buscarPlano();

	}

}

function incluirNecessidade(){

	var myLoading2 = FLUIGC.loading(window);
	
	myLoading2.show();

	var verifica=true;
	var incluido=false;

	var codColigada;
	var codfilial;
	var codOrdem;
	var codEstrutura;
	var idatvordem;
	var codatividade;
	var quantidade;
	var usuario;
	var prioridade;
	var complemento;
	var datanecessidade;
	var papc;
	var semananecessidade;

	setTimeout(function(){

		$("input[id^='INCLUIRCAD___']").each(function(){

			if($(this).is(":checked")){

				var seq = $(this).attr("id").split("___")[1]

				var qtd = $("#QTDEPLANOCAD___"+seq).val()

				if(qtd == "" || qtd==null || qtd==undefined || isNaN(qtd) || qtd == 0){

					verifica = false

					myLoading2.hide();

					// EXIBE ALERTA
					Swal.fire({
						icon: 'error',
						title: 'Há itens marcados sem quantidade preenchida ou com quantidade 0',
						text: 'Verifique e tente novamente.'
					}).then(function(){

						setTimeout(function(){
							if(seq > 10){
								var id = Number(seq) - 10
							}
							else{
								var id = 1
							}
							var string = "#QTDEPLANOCAD___"+id
							console.log( "focar no :"+string)
							window.location.href = string
							document.getElementById("QTDEPLANOCAD___"+id).scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
						},100);

					})


				}

			}
			
		})


		if(verifica){

			codfilial = $("#CODFILIAL").val()
			usuario  = $("#USUARIOATUAL").val()
			usuario = getUser(usuario)
			// prioridade = FLUIGC.slider.getValue('#SLIDERPRIORIDADECAD')
			// prioridade = toString(prioridade)
			prioridade = $("#SLIDERPRIORIDADECAD").val()
			complemento = $("#COMPLEMENTOCAD").val()
			datanecessidade = $("#DATA_NECESSIDADECAD").val()	
			semananecessidade = $("#SEMANA_NECESSIDADECAD").val()

			if($("#PAPCSWITCHCAD").is(':checked')){

				papc = "PA"

			}
			else{

				papc = "PC"

			}

			if((codfilial=="" || codfilial==null || codfilial==undefined) ||
			(usuario=="" || usuario==null || usuario==undefined) ||
			(prioridade=="" || prioridade==null || prioridade==undefined) ||
			(semananecessidade=="" || semananecessidade==null || semananecessidade==undefined) ){

				myLoading2.hide();
		
				// EXIBE ALERTA
				Swal.fire({
					icon: 'error',
					title: 'Existem campos obrigatórios que não foram preenchidos',
					text: 'Verifique e tente novamente.'
				})
				console.log("Existem campos obrigatórios que não foram preenchidos")


			}
			else{

				$("input[id^='OSCAD___']").each(function(){
								
					var seq = $(this).attr("id").split("___")[1]
					
					console.log("linha "+seq)
					
					// SE A OPÇÃO INCLUIR FOI SELECIONADO
					if($("#INCLUIRCAD___"+seq).is(":checked")){
			
						
						console.log("VOU INSERIR O PLANO DA LINHA "+seq)
			
						codColigada = $("#CODCOLIGADACAD___"+seq).val()
						codfilial = $("#CODFILIAL").val()
						codOrdem = $("#CODORDEMCAD___"+seq).val()
						codEstrutura = $("#CODESTRUTURACAD___"+seq).val()
						idatvordem = $("#IDATIVIDADECAD___"+seq).val()
						codatividade = $("#CODATIVIDADECAD___"+seq).val()
						quantidade = $("#QTDEPLANOCAD___"+seq).val()
						usuario  = $("#USUARIOATUAL").val()
						usuario = getUser(usuario)
						// prioridade = FLUIGC.slider.getValue('#SLIDERPRIORIDADECAD')
						prioridade = $("#SLIDERPRIORIDADECAD").val()
						complemento = $("#COMPLEMENTOCAD").val()
						datanecessidade = $("#DATA_NECESSIDADECAD").val()	
			
						datanecessidade = formataDataBanco(datanecessidade)	
						incluido = true

						console.log("codColigada: ")
						console.log(codColigada )
						console.log("codfilial : ")
						console.log(codfilial )
						console.log("codOrdem : ")
						console.log(codOrdem)
						console.log("codEstrutura : ")
						console.log(codEstrutura)
						console.log("idatvordem : ")
						console.log(idatvordem)
						console.log("codatividade : ")
						console.log(codatividade)
						console.log("quantidade : ")
						console.log(quantidade)
						console.log("usuario  : ")
						console.log(usuario)
						console.log("prioridade : ")
						console.log(prioridade)
						console.log("complemento : ")
						console.log(complemento)
						console.log("datanecessidade : ")
						console.log(datanecessidade)
						console.log("semananecessidade : ")
						console.log(semananecessidade)

						execInsertNecessidade(codColigada,codfilial,codOrdem,codEstrutura,idatvordem,codatividade,quantidade,usuario,usuario,prioridade,complemento,datanecessidade,papc,0,null,null,semananecessidade,null)
						
						
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
					
					// DESABILITA OS CAMPOS
					$("#ATIVIDADEPLANCAD").prop("disabled",true)
					$("#MATERIALPLANCAD").prop("disabled",true)
			
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
						title: 'Necessidade enviada para cadastro!'
					})	
					
				}
			}

		}
	
	},500)



}

function execDeleteNecessidade(codColigada,codfilial,codOrdem,codEstrutura,idatvordem,codatividade,prioridade,semananecessidade,papc,nseqpedido){


	// var c1 = DatasetFactory.createConstraint("COLIGADA",codColigada,codColigada,ConstraintType.MUST);
    // var c2 = DatasetFactory.createConstraint("FILIAL",codfilial,codfilial,ConstraintType.MUST);
    // var c3 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST);
    // var c4 = DatasetFactory.createConstraint("CODESTRUTURA",codEstrutura,codEstrutura,ConstraintType.MUST);
    // var c5 = DatasetFactory.createConstraint("IDATVORDEM",idatvordem,idatvordem,ConstraintType.MUST);
    // var c6 = DatasetFactory.createConstraint("CODATIVIDADE",codatividade,codatividade,ConstraintType.MUST);
    // var c7 = DatasetFactory.createConstraint("PRIORIDADE",prioridade,prioridade,ConstraintType.MUST);
    // var c8 = DatasetFactory.createConstraint("NECESSIDADE",semananecessidade,semananecessidade,ConstraintType.MUST);
	// var c9 = DatasetFactory.createConstraint("PAPC",papc,papc,ConstraintType.MUST);

	var c1 = DatasetFactory.createConstraint("NSEQPEDIDO",nseqpedido,nseqpedido,ConstraintType.MUST);

	var constraints = new Array(c1);
  
    console.log("Vou executar o dataset do DELETE DA NECESSIDADE DO PLANO DE CORTE")
    
    var dataset = DatasetFactory.getDataset("dsDeleteNecessidadePAPC",null,constraints,null);

    console.log("Executei o dataset do DELETE DA NECESSIDADE DO PLANO DE CORTE")

}

function execInsertNecessidade(codColigada,codfilial,codOrdem,codEstrutura,idatvordem,codatividade,quantidade,usuario1,usuario2,prioridade,complemento,datanecessidade,papc,status,observacao,dataoriginal,semana,log){

    var c1 = DatasetFactory.createConstraint("COLIGADA",codColigada,codColigada,ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("FILIAL",codfilial,codfilial,ConstraintType.MUST);
    var c3 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST);
    var c4 = DatasetFactory.createConstraint("CODESTRUTURA",codEstrutura,codEstrutura,ConstraintType.MUST);
    var c5 = DatasetFactory.createConstraint("IDATVORDEM",idatvordem,idatvordem,ConstraintType.MUST);
    var c6 = DatasetFactory.createConstraint("CODATIVIDADE",codatividade,codatividade,ConstraintType.MUST);
    var c7 = DatasetFactory.createConstraint("QUANTIDADE",quantidade,quantidade,ConstraintType.MUST);
    var c8 = DatasetFactory.createConstraint("USUARIO",usuario1,usuario2,ConstraintType.MUST);
    var c9 = DatasetFactory.createConstraint("PRIORIDADE",prioridade,prioridade,ConstraintType.MUST);
    var c10 = DatasetFactory.createConstraint("NECESSIDADE",datanecessidade,datanecessidade,ConstraintType.MUST);
	var c11 = DatasetFactory.createConstraint("PAPC",papc,papc,ConstraintType.MUST);
	var c12 = DatasetFactory.createConstraint("STATUS",status,status,ConstraintType.MUST);
	var c13 = DatasetFactory.createConstraint("SEMANANECESSIDADE",semana,semana,ConstraintType.MUST);

	var constraints = new Array(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13)

	if(log!="" && log!=null && log!=undefined){

		var c14 = DatasetFactory.createConstraint("LOG",log,log,ConstraintType.MUST);
		constraints.push(c14);

	}

	if(observacao!="" && observacao!=null && observacao!=undefined){

		var c15 = DatasetFactory.createConstraint("OBSERVACAO",observacao,observacao,ConstraintType.MUST);
		constraints.push(c15);

	}

	if(dataoriginal!="" && dataoriginal!=null && dataoriginal!=undefined){

		var c16 = DatasetFactory.createConstraint("DATAORIGINAL",dataoriginal,dataoriginal,ConstraintType.MUST);
		constraints.push(c16);

	}

	if(complemento!="" && complemento!=null && complemento!=undefined && complemento!="null"){

		var c17 = DatasetFactory.createConstraint("COMPLEMENTO",complemento,complemento,ConstraintType.MUST);
		constraints.push(c17);

	}

    
    console.log("Vou executar o dataset do INSERT DA NECESSIDADE DO PLANO DE CORTE")
    
    var dataset = DatasetFactory.getDataset("dsInsertNecessidadePAPC",null,constraints,null);

    console.log("Executei o dataset do INSERT DA NECESSIDADE DO PLANO DE CORTE")

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
							var quantidade = $("#QTDEPLANOCAD___"+seq).val()
							var qtdempfinal= $("#QTDMPFINALCAD___"+seq).val()
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
	datanecessidade.setDate(new Date().toLocaleDateString())
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
	$("#PROJETOED>option").remove()
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

	//FLUIGC.slider.setValue('#SLIDERPRIORIDADEED',0)
	$("#SLIDERPRIORIDADEED").val(0)
	var datanecessidade = FLUIGC.calendar('#DATA_NECESSIDADEED')
	datanecessidade.setDate(new Date().toLocaleDateString())
	$("#COMPLEMENTOED").val("")
	$(".sectionED").hide()
	
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
					//if(verificaMPED()){
						
						//if(!(verificaQTDFinalED())){

							//myLoading2.hide();

							//var qtdeMPOriginal=$("#QTDEMPEDORIGINAL").val()
					
							// 	// EXIBE ALERTA
							// 	Swal.fire({
							// 		icon: 'error',
							// 		title: 'A quantidade precisa de ser recalculada',
							// 		text: 'Insira novamente o valor do retalho e da sucata'
							// 	})
		
							// $("#QTDRETALHOED").val("");
							// $("#QTDESUCATAPLANED").val("");
							// $("#QTDEMPED").val(qtdeMPOriginal);
							// CalculaSaldoDisponivelED("");
							
						//}
						//else{
						
							
							// PERCORRE TODOS OS REGISTROS DA TATBELA DE CADASTRO DE PLANO DE CORTE
							$("input[id^='OSED___']").each(function(){
								
								var seq = $(this).attr("id").split("___")[1]
								
								console.log("linha "+seq)
								
								// SE A OPÇÃO INCLUIR FOI SELECIONADO
								if($("#INCLUIRED___"+seq).is(":checked")){

									console.log("VOU deletar O PLANO DA LINHA "+seq)
									selecionado = true
									
									console.log("VOU INSERIR O PLANO DA LINHA "+seq)
									
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
								title: 'Necessidade alterada com sucesso!'
							})
						
						//}
						
					// }else{
					// 	// SE NÃO
						
					// 	myLoading2.hide();
						
					// 	// EXIBE ALERTA
					// 	Swal.fire({
					// 		icon: 'error',
					// 		title: "A matéria-prima selecionada não foi cadastrada na estrutura para as OP's selecionadas!",
					// 		text: 'Verifique e tente novamente.'
					// 	})
						
					// }
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

// EDITAR/ALTERAR O PLANO DE CORTE
function excluirNecessidade(){
	
	var myLoading2 = FLUIGC.loading(window);
	
	myLoading2.show();
	
	var selecionado = false
	var faltaQtde = false
	
	console.log("VOU COMEÇAR A EXCLUIR A NECESSIDADE")
	
	
			
	// VERIFICA SE NA TABELA DE EDIÇÃO EXISTEM ITENS SELECIONADOS
	if(verificaSelecaoTabelaEdicao()){

		op = verificaOpsConcluidasEdicao();
		if(op==0){ 

			// SE A MP SELECIONADA FOI CADASTRADA NA ESTRUTURA PARA AS OP'S SELECIONADAS
			//if(verificaMPED()){
				
				//if(!(verificaQTDFinalED())){

					//myLoading2.hide();

					//var qtdeMPOriginal=$("#QTDEMPEDORIGINAL").val()
			
					// 	// EXIBE ALERTA
					// 	Swal.fire({
					// 		icon: 'error',
					// 		title: 'A quantidade precisa de ser recalculada',
					// 		text: 'Insira novamente o valor do retalho e da sucata'
					// 	})

					// $("#QTDRETALHOED").val("");
					// $("#QTDESUCATAPLANED").val("");
					// $("#QTDEMPED").val(qtdeMPOriginal);
					// CalculaSaldoDisponivelED("");
					
				//}
				//else{
				
					
					// PERCORRE TODOS OS REGISTROS DA TATBELA DE CADASTRO DE PLANO DE CORTE

					$("input[id^='OSED___']").each(function(){
						
						var seq = $(this).attr("id").split("___")[1]
						
						console.log("linha "+seq)
						
						// SE A OPÇÃO INCLUIR FOI SELECIONADO
						if($("#INCLUIRED___"+seq).is(":checked")){

							console.log("VOU deletar O PLANO DA LINHA "+seq)

							var codColigadaseq = $("#CODCOLIGADAED___"+seq).val()
							var codfilialseq = $("#CODFILIALED").val()
							var codOrdemseq = $("#CODORDEMED___"+seq).val()
							var codEstruturaseq = $("#CODESTRUTURAED___"+seq).val()
							var idatvordemseq = $("#IDATIVIDADEED___"+seq).val()
							var codatividadeseq = $("#CODATIVIDADEED___"+seq).val()
							var prioridadeseq = $("#VALPRIORIDADEED___"+seq).val()
							var semananecessidadeseq = $("#CELSEMANANECESSIDADEED___"+seq).val()
							var papcseq = $("#PAPCED___"+seq).val()
							var nseqpedido  = $("#NSEQPEDIDOED___"+seq).val()
							
							execDeleteNecessidade(codColigadaseq,codfilialseq,codOrdemseq,codEstruturaseq,idatvordemseq,codatividadeseq,prioridadeseq,semananecessidadeseq,papcseq,nseqpedido)

							selecionado = true
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
						title: 'Necessidade excluída com sucesso!'
					})
				
				//}
				
			// }else{
			// 	// SE NÃO
				
			// 	myLoading2.hide();
				
			// 	// EXIBE ALERTA
			// 	Swal.fire({
			// 		icon: 'error',
			// 		title: "A matéria-prima selecionada não foi cadastrada na estrutura para as OP's selecionadas!",
			// 		text: 'Verifique e tente novamente.'
			// 	})
				
			// }
		}
		else{

			var vermelho = "linear-gradient(0deg, #f09c9c, #fd6666, #f09c9c) !important";

			// EXIBE ALERTA
			myLoading2.hide();
			var codop = $("#CODORDEMED___"+op).val()
			console.log("🚀 ~ file: utils.js ~ line 4938 ~ excluirNecessidade ~ codop", codop)
			console.log("OP CONCLUIDA "+codop)
			Swal.fire({
				icon: 'error',
				title: "A necessidade não pode ser excluida",
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
				title: 'Não há itens selecionados para excluir',
				text: 'Verifique e tente novamente.'
		})
		
	}
	
	// DESATIVA O LOAD
	setTimeout(function(){
		
		myLoading2.hide();
		
	},500)
	
}

// EDITAR/ALTERAR O PLANO DE CORTE
function alterarNecessidade(){
	
	var myLoading2 = FLUIGC.loading(window);
	
	myLoading2.show();
	
	var selecionado = false
	var faltaQtde = false
	
	console.log("VOU COMEÇAR A EDITAR A NECESSIDADE")
	

	var codfilial = $("#CODFILIALED").val()
	var usuario2  = $("#USUARIOATUAL").val()
	var usuario2 = getUser(usuario2)
	// var prioridade = FLUIGC.slider.getValue('#SLIDERPRIORIDADEED')
	var prioridade = $("#SLIDERPRIORIDADEED").val()
	var complemento = $("#COMPLEMENTOED").val()

	var datanecessidade = $("#DATA_NECESSIDADEED").val()	
	var semana = $("#SEMANA_NECESSIDADEED").val()
	var papc
	if($("#PAPCSWITCHED").is(':checked')){

		papc = "PA"

	}
	else{

		papc = "PC"

	}

	console.log(codfilial)
	console.log(usuario2)
	console.log(semana)
	
	// SE NÚMERO DO PLANO FOI INFORMADO
	if(!((codfilial=="" || codfilial==null || codfilial==undefined) ||
			(usuario2=="" || usuario2==null || usuario2==undefined) ||
			(semana=="" || semana==null || semana==undefined) ||
			(datanecessidade=="" || datanecessidade==null || datanecessidade==undefined))){
		
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
					//if(verificaMPED()){
						
						//if(!(verificaQTDFinalED())){

							//myLoading2.hide();

							//var qtdeMPOriginal=$("#QTDEMPEDORIGINAL").val()
					
							// 	// EXIBE ALERTA
							// 	Swal.fire({
							// 		icon: 'error',
							// 		title: 'A quantidade precisa de ser recalculada',
							// 		text: 'Insira novamente o valor do retalho e da sucata'
							// 	})
		
							// $("#QTDRETALHOED").val("");
							// $("#QTDESUCATAPLANED").val("");
							// $("#QTDEMPED").val(qtdeMPOriginal);
							// CalculaSaldoDisponivelED("");
							
						//}
						//else{
						
							
							// PERCORRE TODOS OS REGISTROS DA TATBELA DE CADASTRO DE PLANO DE CORTE
							
							datanecessidade = formataDataBanco(datanecessidade)	

							$("input[id^='OSED___']").each(function(){
								
								var seq = $(this).attr("id").split("___")[1]
								
								console.log("linha "+seq)
								
								// SE A OPÇÃO INCLUIR FOI SELECIONADO
								if($("#INCLUIRED___"+seq).is(":checked")){

									procuraIguaiseExclui(seq)

									console.log("VOU deletar O PLANO DA LINHA "+seq)

									var codColigadaseq = $("#CODCOLIGADAED___"+seq).val()
									var codfilialseq = $("#CODFILIALED").val()
									var codOrdemseq = $("#CODORDEMED___"+seq).val()
									var codEstruturaseq = $("#CODESTRUTURAED___"+seq).val()
									var idatvordemseq = $("#IDATIVIDADEED___"+seq).val()
									var codatividadeseq = $("#CODATIVIDADEED___"+seq).val()
									var prioridadeseq = $("#VALPRIORIDADEED___"+seq).val()
									var semananecessidadeseq = $("#CELSEMANANECESSIDADEED___"+seq).val()
									var papcseq = $("#PAPCED___"+seq).val()
									var nseqpedido  = $("#NSEQPEDIDOED___"+seq).val()
									
									execDeleteNecessidade(codColigadaseq,codfilialseq,codOrdemseq,codEstruturaseq,idatvordemseq,codatividadeseq,prioridadeseq,semananecessidadeseq,papcseq,nseqpedido)

									selecionado = true
									
									console.log("VOU INSERIR O PLANO DA LINHA "+seq)
			
									codColigada = $("#CODCOLIGADAED___"+seq).val()
									codOrdem = $("#CODORDEMED___"+seq).val()
									codEstrutura = $("#CODESTRUTURAED___"+seq).val()
									idatvordem = $("#IDATIVIDADEED___"+seq).val()
									codatividade = $("#CODATIVIDADEED___"+seq).val()
									quantidade = $("#QTDEPLANOED___"+seq).val()
									var usuario1 = $("#USUARIOORIGINALED___"+seq).val()
									var dataoriginal = $("#DATAORIGINALED___"+seq).val()
									var log = $("#LOGORIGINALED___"+seq).val()
									var datanecessidadeseq = $("#CELDATANECESSIDADEED___"+seq).val()
									if(log==null || log==undefined || log=="null"){

										log = "";

									}

									var prioridadenome = Number(prioridade)
									switch (prioridadenome) {
										case 0:
											prioridadenome="Baixa"
											break;
										case 1:
											prioridadenome="Média"
											break;
										case 2:
											prioridadenome="Alta"
											break;
									}

									if($("#QTDEPLANOEDORIGINAL___"+seq).val() != $("#QTDEPLANOED___"+seq).val()){

										log += "Quantidade alterada de "+$("#QTDEPLANOEDORIGINAL___"+seq).val()+" para "+ $("#QTDEPLANOED___"+seq).val()+" por "+ usuario2 +" no dia "+ new Date().toLocaleDateString()+";"

									}
									// if($("#VALPRIORIDADEED___"+seq).val() != prioridade){

									// 	log += "Prioridade alterada de "+$("#CELPRIORIDADEED___"+seq).val()+" para "+prioridadenome+" por "+usuario2+" dia "+new Date().toLocaleDateString()+";"

									// }
									if($("#DATA_NECESSIDADEED").val() != datanecessidadeseq){

										log += "Data necessidade alterada de "+datanecessidadeseq+" para "+$("#DATA_NECESSIDADEED").val()+" por "+usuario2+" dia "+new Date().toLocaleDateString()+";"

									}
									if($("#CELSEMANANECESSIDADEED___"+seq).val() != semana){

										log += "Semana alterada de "+$("#CELSEMANANECESSIDADEED___"+seq).val()+" para "+semana+" por "+usuario2+" dia "+new Date().toLocaleDateString()+";"

									}
									if($("#PAPCED___"+seq).val() != papc){

										log += "Tipo alterado de "+$("#PAPCED___"+seq).val()+" para "+papc+" por "+usuario2+" dia "+new Date().toLocaleDateString()+";"

									}
									
									// EXECUTA A PROCEDURE PARA INSERIR UM PLANO DE CORTE
									execInsertNecessidade(codColigada,codfilial,codOrdem,codEstrutura,idatvordem,codatividade,quantidade,usuario1,usuario2,prioridade,complemento,datanecessidade,papc,0,null,dataoriginal,semana,log)
									
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
								title: 'Necessidade alterada com sucesso!'
							})
						
						//}
						
					// }else{
					// 	// SE NÃO
						
					// 	myLoading2.hide();
						
					// 	// EXIBE ALERTA
					// 	Swal.fire({
					// 		icon: 'error',
					// 		title: "A matéria-prima selecionada não foi cadastrada na estrutura para as OP's selecionadas!",
					// 		text: 'Verifique e tente novamente.'
					// 	})
						
					// }
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

function procuraIguaiseExclui(_seq){
	
	var codColigada = $("#CODCOLIGADAED___"+_seq).val()
	var codfilial = $("#CODFILIALED").val()
	var codOrdem = $("#CODORDEMED___"+_seq).val()
	var codEstrutura = $("#CODESTRUTURAED___"+_seq).val()
	var idatvordem = $("#IDATIVIDADEED___"+_seq).val()
	var codatividade = $("#CODATIVIDADEED___"+_seq).val()

	$("input[id^='OSED___']").each(function(){
									
		var seq = $(this).attr("id").split("___")[1]

		
		console.log("linha "+seq)
		
		// SE A OPÇÃO INCLUIR FOI SELECIONADO
		if($("#INCLUIRED___"+seq).is(":checked") && seq!=_seq){

			var codColigadaseq = $("#CODCOLIGADAED___"+seq).val()
			var codfilialseq = $("#CODFILIALED").val()
			var codOrdemseq = $("#CODORDEMED___"+seq).val()
			var codEstruturaseq = $("#CODESTRUTURAED___"+seq).val()
			var idatvordemseq = $("#IDATIVIDADEED___"+seq).val()
			var codatividadeseq = $("#CODATIVIDADEED___"+seq).val()
			var prioridadeseq = $("#VALPRIORIDADEED___"+seq).val()
			var semananecessidadeseq = $("#CELSEMANANECESSIDADEED___"+seq).val()
			var papcseq = $("#PAPCED___"+seq).val()
			var nseqpedido  = $("#NSEQPEDIDOED___"+seq).val()

			if(codColigadaseq==codColigada && codfilialseq==codfilial && codOrdemseq==codOrdem && codEstruturaseq==codEstrutura && idatvordemseq==idatvordem && codatividadeseq==codatividade){

				console.log("VOU deletar A NECESSIDADE DA LINHA "+seq)
			
				execDeleteNecessidade(codColigadaseq,codfilialseq,codOrdemseq,codEstruturaseq,idatvordemseq,codatividadeseq,prioridadeseq,semananecessidadeseq,papcseq,nseqpedido)


				$("#INCLUIRED___"+seq).prop('checked',false)
			
				var quantidade = Number($("#QTDEPLANOED___"+_seq).val()) + Number($("#QTDEPLANOED___"+seq).val())
	
				$("#QTDEPLANOED___"+_seq).val(quantidade)

			}
			
		}
		
	})
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

	var constraints = new Array(a1,a2,a3,a4,a5)

	console.log("Vou rodar o dataset dsBuscaSaldoPAPC");

	var dataset = DatasetFactory.getDataset("dsBuscaSaldoPAPC",null,constraints,null)

	var row=dataset.values
	console.log(row)
	var retorno = row[0];

	$("#SALDODISPONIVELCAD").val(parseFloat(retorno["SALDODISPONIVEL"]).toFixed(4))
	formataValorVirgula($("#SALDODISPONIVELCAD"))
	$("#SALDOAUXCAD").val(parseFloat(retorno["SALDODISPONIVEL"]).toFixed(4))

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

	var constraints = new Array(a1,a2,a3,a4,a5)

	console.log("Vou rodar o dataset dsBuscaSaldoPAPC");

	var dataset = DatasetFactory.getDataset("dsBuscaSaldoPAPC",null,constraints,null)

	var row=dataset.values
	console.log(row)
	var retorno = row[0];

	$("#SALDODISPONIVELED").val(parseFloat(retorno["SALDODISPONIVEL"]).toFixed(4))
	formataValorVirgula($("#SALDODISPONIVELED"))
	$("#SALDOAUXED").val(parseFloat(retorno["SALDODISPONIVEL"]).toFixed(4))

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

	var constraints = new Array(a1,a2,a3,a4,a5);

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

	var constraints = new Array(a1,a2,a3,a4,a5)

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
			var codColigada = $("#CODCOLIGADACAD___"+seq).val()
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
			var codColigada = $("#CODCOLIGADAED___"+seq).val()
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

function FiltraItens(obj) {

	$("#PLANOCORTEED").find("tr[id^='LINHAED___']").hide()

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

			str += ( i >1 ? "," : "" ) + "tr[id^='LINHAED___']"

		}

	})

	if(i==0){

		$("#PLANOCORTEED").find("tr[id^='LINHAED___']").show()

	}
	else{

		$("#PLANOCORTEED").find(str).show()

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
	limpaFiltrosEd()
	constroiFiltrosEd()

	
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


// CARREGA O PLANO DE CORTE DA ATIVIDADE
function carregaPlanoCorte(obj){
	
	console.log("vou carregar os planos de corte")
	
	var myLoading2 = FLUIGC.loading(window);
	
	myLoading2.show();
	
	// INICIA A OPERAÇÃO DEPOIS DE CARREGAR O LOAD
	setTimeout(function(){
		
		var seq = $(obj).attr("id").split("___")[1]
		
		var coligada = $("#CODCOLIGADAED___"+seq).val()
		var codfilial = $("#CODFILIALED").val()
		var codestrutura = $("#CODESTRUTURAED___"+seq).val()
		var idAtividade = $("#IDATIVIDADEED___"+seq).val()
		var codOrdem = $("#CODORDEMED___"+seq).val()
		
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


// $("#PLANOCORTE").on('mouseover',function(){

// 	var altura = $("#PLANOCORTE").height()

// 	if(altura < 580){
// 		$(".PLANOCORTE_INFO").parent().parent().attr('style','margin-right: 0em !important;')F
// 	}
// 	else{
// 		$(".PLANOCORTE_INFO").parent().parent().attr('style','margin-right: 1.5em !important;')
// 	}

// })

// $("#PLANOCORTEED").on('mouseover',function(){

// 	var altura = $("#PLANOCORTEED").height()

// 	if(altura < 580){
// 		$("#PLANOCORTEED").parent().attr('style','width: 158.4% !important;')
// 	}
// 	else{
// 		$("#PLANOCORTEED").parent().attr('style','width:160% !important')
// 	}

// })


// $("#PLANOCORTE").on('mousemove',function(){

// 	var altura = $("#PLANOCORTE").height()

// 	if(altura < 580){
// 		$(".PLANOCORTE_INFO").parent().parent().attr('style','margin-right: 0em !important;')
// 	}
// 	else{
// 		$(".PLANOCORTE_INFO").parent().parent().attr('style','margin-right: 1.5em !important;')
// 	}

// })

// $("#PLANOCORTEED").on('mousemove',function(){

// 	var altura = $("#PLANOCORTEED").height()

// 	if(altura < 580){
// 		$("#PLANOCORTEED").parent().attr('style','width: 158.4% !important;')
// 	}
// 	else{
// 		$("#PLANOCORTEED").parent().attr('style','width:160% !important')
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

		console.log(e)

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
			InsereDiaSemanaCAD()
	
		}
		else{

			if($("#DATA_NECESSIDADECAD").val()==null || $("#DATA_NECESSIDADECAD").val()==undefined || $("#DATA_NECESSIDADECAD").val()=="null" || $("#DATA_NECESSIDADECAD").val()==""){
			
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

		var week = semana + "/" + ano
		console.log(week)
		$("#SEMANA_NECESSIDADECAD").val(week)
		InsereDiaSemanaCAD()

	})

	$("#incrementYearCAD").on("click",function(){


		var semana = $("#WEEK_PICKERCAD").text()
		var ano = $("#YEAR_PICKERCAD").text()

		$("#YEAR_PICKERCAD").text(Number(ano)+1)

		ano = Number(ano)+1

		var week = semana + "/" + ano
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
		var week = semana + "/" + ano
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

		var week = semana + "/" + ano
		console.log(week)
		$("#SEMANA_NECESSIDADECAD").val(week)

		corrigeSemanaCAD()
		InsereDiaSemanaCAD()

	})

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

		var week = semanamax + "/" + ano
		console.log(week)
		$("#SEMANA_NECESSIDADECAD").val(week)
		$("#WEEK_PICKERCAD").text(Number(semanamax))

	}
	if(semana < semanamin){

		var week = semanamin + "/" + ano
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

function iniciaWeekPickerEd(){

	InsereSemanaED()

	$("#SEMANA_NECESSIDADEED").on("click",function(){

		var week = $("#SEMANA_NECESSIDADEED").val()
		var semana;
		var ano;

		// $("#CLICK_DATA_NECESSIDADEED").parent().on('click', function(){

		// 	$("#DATA_NECESSIDADEED").click()

		// })

		$(".WEEK_PICKERED").show()

		var datanecessidade = FLUIGC.calendar('#DATA_NECESSIDADEED');
	
		if(week=="" || week==null || week==undefined){	

			console.log("weekED vazio vou preencher")
	
			var hoje = new Date()
			hoje = hoje.toLocaleDateString()
			hoje = hoje.split('/')
			hoje = new Date(hoje[2],hoje[1]-1,hoje[0],0,0,0)
			var semana = retornaSemanaDoAno(hoje.toISOString().split("T")[0])
			var ano = new Date().getFullYear()

			console.log(week)
			console.log(semana)
			console.log(ano)

			$("#WEEK_PICKERED").text(Number(semana))
			$("#YEAR_PICKERED").text(Number(ano))
			var week = semana.toString() + "/" + ano.toString()
			console.log(week)
			$("#SEMANA_NECESSIDADEED").val(week)
	
		}
		else{

			if($("#DATA_NECESSIDADEED").val()==null || $("#DATA_NECESSIDADEED").val()==undefined || $("#DATA_NECESSIDADEED").val()=="null" || $("#DATA_NECESSIDADEED").val()==""){

				console.log("weekED preenchido vou preencher")
				console.log(week)
				week = week.split("/")
				semana = week[0]
				ano = week[1]
				console.log(semana)
				console.log(ano)
				$("#WEEK_PICKERED").text(Number(semana))
				$("#YEAR_PICKERED").text(Number(ano))
				var week = semana.toString() + "/" + ano.toString()
				console.log(week)
				$("#SEMANA_NECESSIDADEED").val(week)
				var a = retornaDiaDoAno(Number(semana),Number(ano))
				datanecessidade.setDate(a)
				datanecessidade.setMinDate(new Date(a.split("/")[2],a.split("/")[1]-1,a.split("/")[0]))
				datanecessidade.setMaxDate(new Date(a.split("/")[2],a.split("/")[1]-1,+a.split("/")[0]+5))

			}
			else{

				console.log("weekED preenchido vou preencher")
				console.log(week)
				week = week.split("/")
				semana = week[0]
				ano = week[1]
				console.log(semana)
				console.log(ano)
				$("#WEEK_PICKERED").text(Number(semana))
				$("#YEAR_PICKERED").text(Number(ano))
				var week = semana.toString() + "/" + ano.toString()
				console.log(week)
				$("#SEMANA_NECESSIDADEED").val(week)

			}
	
		}
	
	
	})



	$(document).click(function(e) {
		if($(e.target).is('.WEEKED, .WEEKED *')){
			return;
		}

		console.log(e)

		var week = $("#SEMANA_NECESSIDADEED").val()
		var semana;
		var ano;

		var datanecessidade = FLUIGC.calendar('#DATA_NECESSIDADEED');

		$(".WEEK_PICKERED").hide()


		if(week=="" || week==null || week==undefined){	

			console.log("weekED vazio vou preencher")
			
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

			$("#WEEK_PICKERED").text(Number(semana))
			$("#YEAR_PICKERED").text(Number(ano))
			var week = semana.toString() + "/" + ano.toString()
			console.log(week)
			$("#SEMANA_NECESSIDADEED").val(week)
			InsereDiaSemanaED()
	
		}
		else{

			if($("#DATA_NECESSIDADEED").val()==null || $("#DATA_NECESSIDADEED").val()==undefined || $("#DATA_NECESSIDADEED").val()=="null" || $("#DATA_NECESSIDADEED").val()==""){
			
				console.log("weekED preenchido vou preencher")
				console.log(week)
				semana = $("#WEEK_PICKERED").text()
				ano = $("#YEAR_PICKERED").text()
				var week = semana.toString() + "/" + ano.toString()
				console.log(week)
				$("#SEMANA_NECESSIDADEED").val(week)
				var a = retornaDiaDoAno(Number(semana),Number(ano))
				datanecessidade.setDate(a)
				datanecessidade.setMinDate(new Date(a.split("/")[2],a.split("/")[1]-1,a.split("/")[0]))
				datanecessidade.setMaxDate(new Date(a.split("/")[2],a.split("/")[1]-1,+a.split("/")[0]+5))

			}

	
		}

	});



	$("#incrementWeekED").on("click",function(){

		var semana = $("#WEEK_PICKERED").text()
		var ano = $("#YEAR_PICKERED").text()

		var ultimo = new Date(+ano,11,31)
		ultimo = ultimo.toLocaleDateString()
		ultimo = ultimo.split('/')
		ultimo = new Date(ultimo[2],ultimo[1]-1,ultimo[0],0,0,0)

		var semanamax=retornaSemanaDoAno(ultimo.toISOString().split("T")[0])

		if(+semana < semanamax){

			semana = Number(semana)+1

			$("#WEEK_PICKERED").text(Number(semana))

		}

		var week = semana + "/" + ano
		console.log(week)
		$("#SEMANA_NECESSIDADEED").val(week)
		InsereDiaSemanaED()

	})

	$("#incrementYearED").on("click",function(){


		var semana = $("#WEEK_PICKERED").text()
		var ano = $("#YEAR_PICKERED").text()

		$("#YEAR_PICKERED").text(Number(ano)+1)

		ano = Number(ano)+1

		var week = semana + "/" + ano
		console.log(week)
		$("#SEMANA_NECESSIDADEED").val(week)

		corrigeSemanaED()
		InsereDiaSemanaED()


	})

	$("#decrementWeekED").on("click",function(){


		var semana = $("#WEEK_PICKERED").text()
		var ano = $("#YEAR_PICKERED").text()
		var semanamin = new Date()
		semanamin = semanamin.toLocaleDateString()
		semanamin = semanamin.split('/')
		semanamin = new Date(semanamin[2],semanamin[1]-1,semanamin[0],0,0,0)
		semanamin=retornaSemanaDoAno(semanamin.toISOString().split("T")[0])

		if((+semana > 1 && ano != new Date().getFullYear()) || (+semana > semanamin && ano == new Date().getFullYear())){

			semana = Number(semana)-1
			$("#WEEK_PICKERED").text(Number(semana))

		}
		var week = semana + "/" + ano
		console.log(week)
		$("#SEMANA_NECESSIDADEED").val(week)
		InsereDiaSemanaED()


	})

	$("#decrementYearED").on("click",function(){

		var semana = $("#WEEK_PICKERED").text()
		var ano = $("#YEAR_PICKERED").text()

		var anoatual = new Date()
		anoatual=anoatual.getFullYear()

		if(+ano > anoatual){

			$("#YEAR_PICKERED").text(Number(ano)-1)
			ano = Number(ano)-1

		}

		var week = semana + "/" + ano
		console.log(week)
		$("#SEMANA_NECESSIDADEED").val(week)

		corrigeSemanaED()
		InsereDiaSemanaED()

	})

}

function InsereSemanaED(){

	var week = $("#DATA_NECESSIDADEED").val()

	if(week=="" || week==null || week==undefined){	

		week = $("#SEMANA_NECESSIDADEED").val()

		if(week=="" || week==null || week==undefined){	

			week = $("#SEMANA_NECESSIDADEED").val()
	
			console.log("weekED vazio vou preencher")
			var hoje = new Date()
			hoje = hoje.toLocaleDateString()
			hoje = hoje.split('/')
			hoje = new Date(hoje[2],hoje[1]-1,hoje[0],0,0,0)
			var semana = retornaSemanaDoAno(hoje.toISOString().split("T")[0])
			var ano = new Date().getFullYear()
	
			console.log(week)
			console.log(semana)
			console.log(ano)
	
			$("#WEEK_PICKERED").text(Number(semana))
			$("#YEAR_PICKERED").text(Number(ano))
			var week = semana.toString() + "/" + ano.toString()
			console.log(week)
			$("#SEMANA_NECESSIDADEED").val(week)
	
		}
		else{
			
			console.log("weekED preenchido vou preencher")
			console.log(week)
			week = week.split("/")
			semana = week[0]
			ano = week[1]
			console.log(semana)
			console.log(ano)
			$("#WEEK_PICKERED").text(Number(semana))
			$("#YEAR_PICKERED").text(Number(ano))
			var week = semana.toString() + "/" + ano.toString()
			console.log(week)
			$("#SEMANA_NECESSIDADEED").val(week)
	
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

		$("#WEEK_PICKERED").text(Number(semana))
		$("#YEAR_PICKERED").text(Number(ano))
		var week = semana.toString() + "/" + ano.toString()
		console.log(week)
		$("#SEMANA_NECESSIDADEED").val(week)


	}

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

function InsereDiaSemanaED(){

	var datanecessidade = FLUIGC.calendar('#DATA_NECESSIDADEED');

	var semana = $("#WEEK_PICKERED").text()
	var ano = $("#YEAR_PICKERED").text()
	var week = semana.toString() + "/" + ano.toString()
	console.log(week)
	$("#SEMANA_NECESSIDADEED").val(week)
	var a = retornaDiaDoAno(Number(semana),Number(ano))
	datanecessidade.setDate(a)
	datanecessidade.setMinDate(new Date(a.split("/")[2],a.split("/")[1]-1,a.split("/")[0]))
	datanecessidade.setMaxDate(new Date(a.split("/")[2],a.split("/")[1]-1,+a.split("/")[0]+5))

}

function corrigeSemanaED(){

	var datanecessidade = FLUIGC.calendar('#DATA_NECESSIDADEED');

	var semana = $("#WEEK_PICKERED").text()
	var ano = $("#YEAR_PICKERED").text()

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

		var week =semanamax+"/"+ano
		console.log(week)
		$("#SEMANA_NECESSIDADEED").val(week)
		$("#WEEK_PICKERED").text(Number(semanamax))

	}
	if(semana < semanamin){

		var week = semanamin+"/"+ano
		console.log(week)
		$("#SEMANA_NECESSIDADEED").val(week)
		$("#WEEK_PICKERED").text(Number(semanamin))

	}
	semana = $("#WEEK_PICKERED").text()
	ano = $("#YEAR_PICKERED").text()
	var a = retornaDiaDoAno(Number(semana),Number(ano))
	datanecessidade.setDate(a)
	datanecessidade.setMinDate(new Date(a.split("/")[2],a.split("/")[1]-1,a.split("/")[0]))
	datanecessidade.setMaxDate(new Date(a.split("/")[2],a.split("/")[1]-1,+a.split("/")[0]+5))
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