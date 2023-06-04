// ADICIONA UMA LINHA NA TABELA DAS ATIVIDADES PROGRAMADAS
function addChild(){
	
	var row = wdkAddChild('REPROGRAMACAO')
	
	//$("#HORASPROGRAMADAS___"+row).prop("disabled",true)
	
	return row
	
}

function titulo(op){
	
	// SE OPÇÃO É CADASTRAR
	if(op==1){
		
		$("#PROGRAMACAOBLANK").show()
		$("#ADDHABBLANK").hide()

		$(".TITULO2").hide()
		$(".TITULO1").show()

		$("#ICONREDUZIR").show()
		$(".filtros").show()
		$("#ICONEXPANDIR").hide()

		$("#ICONREDUZIR2").hide()
		$(".filtros2").hide()
		$("#ICONEXPANDIR2").hide()
		
	} 
	
	// SE OPÇÃO É EDITAR
	if(op==2){
		
		$("#PROGRAMACAOBLANK").hide()
		$("#ADDHABBLANK").show()

		$(".TITULO2").show()
		$(".TITULO1").hide()

		$("#ICONREDUZIR2").show()
		$(".filtros2").show()
		$("#ICONEXPANDIR2").hide()

		$("#ICONREDUZIR").hide()
		$(".filtros").hide()
		$("#ICONEXPANDIR").hide()

	}
	
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
function addHabilidadeSelecionada(){

	var row = wdkAddChild('tabelaHABILIDADES')

	return row 


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

// FAZ A EXPANSÃO DOS CAMPOS DO FILTRO
function expandirFiltro2(){
	
	// EXIBE/ESCONDE OS CAMPOS NECESSÁRIOS	
	$(".filtros2").show()
	$("#ICONREDUZIR2").show()
	$("#ICONEXPANDIR2").hide()



	//BOTAO SALVAR - DIEGO 
}

function salvarHabilidade(){

	var myLoading = FLUIGC.loading(window)
	myLoading.show()

	var filial = $("#CODFILIAL_delp").val();
	var codmo = $("#CODREG").val();


	setTimeout(function(){

		excluiHabilidadesOperador(filial, codmo)

		var seq;

		$("input[id^='CODHABIL___']").each(function(){
			
			seq = $(this).attr("id").split("___")[1]

			if( $(this).val() == null ||  $(this).val() == "" || $(this).val() == undefined ){
				
				$(this).parent().parent().remove();

			}
			else{

				adcHabilidadeOperador(codmo, $(this).val())

			}


			
		})
		myLoading.hide()

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

// REMOVE HABILIDADES EXISTENTES NO DATASET DO OPERADOR - DIEGO

function excluiHabilidadesOperador(filial, codmo){

	var B4 = DatasetFactory.createConstraint("CODREG", codmo, codmo, ConstraintType.MUST); 
	var B5 = DatasetFactory.createConstraint("CODFILIAL_delp", filial, filial, ConstraintType.MUST); 

	var constraints = new Array(B4,B5) 
	var dataset = DatasetFactory.getDataset("dsExcluiHabilidadesOperador", null, constraints, null);


}

// ADICIONA NOVAS HABILIDADDES AO OPERADOR - DIEGO

function adcHabilidadeOperador(codmo,hab){

	var B6 = DatasetFactory.createConstraint("CODREG", codmo, codmo, ConstraintType.MUST); 
	var B7 = DatasetFactory.createConstraint("CODHABIL", hab, hab, ConstraintType.MUST); 

	var constraints = new Array(B6,B7) 
	var dataset = DatasetFactory.getDataset("dsAdcHabilidadesOperador", null, constraints, null);


}


// FAZ A REDUÇÃO DOS CAMPOS DO FILTRO
function reduzirFiltro2(){
	
	// EXIBE/ESCONDE OS CAMPOS NECESSÁRIOS
	$(".filtros2").hide()
	$("#ICONEXPANDIR2").show()
	$("#ICONREDUZIR2").hide()
	
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
			
			var constraint = new Array(a1,a2,a3,a4);
			
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
			
			var constraint = new Array(a1,a2,a3,a4);
			
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
	
	var codmoAntigo = $("#CODMO").val()
	
	// SE O OPERADOR SELECIONADO NÃO É O MESMO ALOCADO
	if(!(codmo==codmoAntigo)){
		
		var ret = true
		var dataProg = $("#DATA_PROGRAMADA_REAL").val()
		var soma = 0
		var codAtividade = ""
		
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
		
		var constraint = new Array(a1,a2,a3,a4);
		
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
	
	var constraint = new Array(a1,a2,a3,a4);
	
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
	
	var codmoAntigo = $("#CODMO").val()
	
	// SE O OPERADOR SELECIONADO NÃO É O MESMO ALOCADO
	if(!(codmo==codmoAntigo)){
		
		var ret = true
		var dataProg = $("#NOVA_DATA_REAL2").val()
		var soma = 0
		var codAtividade = ""
		
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
		
		console.log("codmo: "+codmo+", dataProg: "+dataProg+", codAtividade: "+codAtividade)
		
		// FAZER BUSCA E PREENCHER A TABELA
		var a1 = DatasetFactory.createConstraint("CODMO", codmo, codmo, ConstraintType.MUST);
		var a2 = DatasetFactory.createConstraint("DATA_DE", dataProg, dataProg, ConstraintType.MUST);
		var a3 = DatasetFactory.createConstraint("CODATIVIDADE", codAtividade, codAtividade, ConstraintType.MUST);
		var a4 = DatasetFactory.createConstraint("DATA_ATE", dataProg, dataProg, ConstraintType.MUST);
		
		var constraint = new Array(a1,a2,a3,a4);
		
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
	var codAtividade = ""
	
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
	
	console.log("codmo: "+codmo+", dataProg: "+dataProg+", codAtividade: "+codAtividade+", dataProg: "+dataProg)
	
	// FAZER BUSCA E PREENCHER A TABELA
	var a1 = DatasetFactory.createConstraint("CODMO", codmo, codmo, ConstraintType.MUST);
	var a2 = DatasetFactory.createConstraint("DATA_DE", dataProg, dataProg, ConstraintType.MUST);
	var a3 = DatasetFactory.createConstraint("CODATIVIDADE", codAtividade, codAtividade, ConstraintType.MUST);
	var a4 = DatasetFactory.createConstraint("DATA_ATE", dataProg, dataProg, ConstraintType.MUST);
	
	var constraint = new Array(a1,a2,a3,a4);
	
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
	var codAtividade = ""
	
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
	
	console.log("codmo: "+codmo+", dataProg: "+dataProg+", codAtividade: "+codAtividade+", dataProg: "+dataProg)
	
	// FAZER BUSCA E PREENCHER A TABELA
	var a1 = DatasetFactory.createConstraint("CODMO", codmo, codmo, ConstraintType.MUST);
	var a2 = DatasetFactory.createConstraint("DATA_DE", dataProg, dataProg, ConstraintType.MUST);
	var a3 = DatasetFactory.createConstraint("CODATIVIDADE", codAtividade, codAtividade, ConstraintType.MUST);
	var a4 = DatasetFactory.createConstraint("DATA_ATE", dataProg, dataProg, ConstraintType.MUST);
	
	var constraint = new Array(a1,a2,a3,a4);
	
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
	$("input[id^='OSATV___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		// SE ATIVIDADE FOI SELECIONADA
		if($("#SELECAO___"+seq).is(":checked")){
			
			ret = true
			
		}
			
	})
	
	console.log("ret: "+ret)
	
	return ret
	
}

// VERIFICA A DISPONIBILIDADE DO FUNCIONÁRIO NA NOVA DATA SELECIONDA E SALVA A NOVA DATA REAL
function verificaNovaData(){
	
	console.log("vou verificar se o funcionário pode ser alocado na nova data e salvar a nova data real")
	
	var novaData = $("#NOVA_DATA").val()
	var dataProg = $("#DATA_PROGRAMADA").val()
	
	console.log("novaData: "+novaData+", dataProg: "+dataProg)
	
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
					
					var codmo = $("#CODMO").val()
					
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
					  buscar()
					  
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
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSATV___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		// SE ATIVIDADE FOI SELECIONADA
		if($("#SELECAO___"+seq).is(":checked")){
			
			var codColigada = $("#CODCOLIGADAATV___"+seq).val()
			var codFilial = $("#CODFILIALATV___"+seq).val()
			var codEstrutura = $("#CODESTRUTURA___"+seq).val()
			var codmo = $("#CODMO").val() 
			var codOrdem = $("#OPATV___"+seq).val()
			var idAtvOrdem = $("#IDATIVIDADE___"+seq).val()
			var codAtividade = $("#CODATIVIDADE___"+seq).val()
			var dia = $("#DATA_PROGRAMADA_REAL").val()
			var usuario = $("#USUARIOATUAL").val()
			
			console.log("codColigada: "+codColigada+", codFilial: "+codFilial+", codmo: "+codmo+", codOrdem: "+codOrdem+", codEstrutura: "+codEstrutura+
					", idAtvOrdem: "+idAtvOrdem+", codAtividade: "+codAtividade+", dia: "+dia+", usuario: "+usuario)
			
			// EXECUTA A PROCEDURE DA DESPROGRAMAÇÃO
			execProcedureDesprogramar(codColigada,codFilial,codmo,codOrdem,codEstrutura,idAtvOrdem,codAtividade,dia,usuario,codInterno)
			
		}
			
	})	
		
}

// EXECUTA A PROCEDURE PARA DESPROGRAMAR
function execProcedureDesprogramar(codColigada,codFilial,codMo,codOrdem,codEstrutura,idAtvOrdem,codAtividade,dia,usuario,codInterno){
	
	console.log("vou executar a procedure para desprogramar")
	console.log("codColigada: "+codColigada+", codFilial: "+codFilial+", codMo: "+codMo+", codOrdem: "+codOrdem+", codEstrutura: "+codEstrutura+", idAtvOrdem: "+idAtvOrdem+
			", codAtividade: "+codAtividade+", dia: "+dia+", usuario: "+usuario)
	
	// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
	var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("CODESTRUTURA",codEstrutura,codEstrutura,ConstraintType.MUST)
	var a4 = DatasetFactory.createConstraint("IDATVORDEM",idAtvOrdem,idAtvOrdem,ConstraintType.MUST)
	var a5 = DatasetFactory.createConstraint("CODMO",codMo,codMo,ConstraintType.MUST)
	var a6 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
	var a7 = DatasetFactory.createConstraint("DIA",dia,dia,ConstraintType.MUST)
	var a8 = DatasetFactory.createConstraint("CODATIVIDADE",codAtividade,codAtividade,ConstraintType.MUST)
	var a9 = DatasetFactory.createConstraint("USUARIOATUAL",usuario,usuario,ConstraintType.MUST)
	var a10 = DatasetFactory.createConstraint("CODINTERNO",codInterno,codInterno,ConstraintType.MUST)
	
	var constraints = new Array(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10)
	
	var dataset = DatasetFactory.getDataset("dsDeleteProgramacao",null,constraints,null)
	
	console.log("deletei a programação")
	
}

// CONFIRMA TROCA DO FUNCIONÁRIO
function confirmaTrocaFunc(){
	
	console.log("confirma a troca de funcionário")
	
	var codmo = $("#CODMO_NOVO").val()
	var dataProg = $("#DATA_PROGRAMADA_REAL").val()
	var saldo = $("#SALDO").val()
	var codInterno = $("#CODINTERNO1").val()
	
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
		if(verificaSaldo(codmo,dataProg)){
			
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
						  	desprogramarAtvs(codInterno)
						  
						  	// PROGRAMAR ATIVIDADES SELECIONADAS
						  	programarAtvs()
						  	
						  	// LIMPA A TABELA PRINCIPAL
						  	limpaTabela()

						  	// ATUALIZA A BUSCA
						  	buscar()
						  	
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
		if(verificaSaldo(codmo,novaData)){
			
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
						  	desprogramarAtvs(codInterno)
						  
						  	// PROGRAMAR ATIVIDADES SELECIONADAS PARA A NOVA DATA SELECIONADA
						  	programarAtvsNovaDataFunc()
						  	
						  	// LIMPA A TABELA PRINCIPAL
						  	limpaTabela()
						  	
						  	// ATUALIZA A BUSCA
						  	buscar()
						  	
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
						  	desprogramarAtvs(codInterno)
						  
						  	// PROGRAMAR ATIVIDADES SELECIONADAS PARA A NOVA DATA SELECIONADA
						  	programarAtvsNovaData()
						  	
						  	// LIMPA A TABELA PRINCIPAL
						  	limpaTabela()
						  	
						  	// ATUALIZA A BUSCA
						  	buscar()
						  	
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
function programarAtvsNovaDataFunc(){
		
	console.log("vou programar todas as atividades selecionadas para o novo funcionário e a nova data selecionados")
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSATV___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		// SE ATIVIDADE FOI SELECIONADA
		if($("#SELECAO___"+seq).is(":checked")){
			
			var codColigada = $("#CODCOLIGADAATV___"+seq).val()
			var codFilial = $("#CODFILIALATV___"+seq).val()
			var codEstrutura = $("#CODESTRUTURA___"+seq).val()
			var codmo = $("#CODMO_NOVO2").val() 
			var codOrdem = $("#OPATV___"+seq).val()
			var idAtvOrdem = $("#IDATIVIDADE___"+seq).val()
			var codAtividade = $("#CODATIVIDADE___"+seq).val()
			var horasProgramadas = $("#HORASPROGRAMADASREAL___"+seq).val()
			var dataProgramada = $("#NOVA_DATA_REAL2").val()
			
			console.log("codColigada: "+codColigada+", codFilial: "+codFilial+", codmo: "+codmo+", codOrdem: "+codOrdem+", codEstrutura: "+codEstrutura+
					", idAtvOrdem: "+idAtvOrdem+", codAtividade: "+codAtividade+", dataProgramada: "+dataProgramada+", horasProgramadas: "+horasProgramadas)
					
			// EXECUTA A PROCEDURE
			execProcedure(codColigada,codFilial,codOrdem,codAtividade,codmo,dataProgramada,horasProgramadas)
			
		}
		
	})	
	
}

// PROGRAMAR ATIVIDADES SELECIONADAS PARA A NOVA DATA SELECIONADA
function programarAtvsNovaData(){
		
	console.log("vou programar todas as atividades selecionadas para a nova data selecionada")
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSATV___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		// SE ATIVIDADE FOI SELECIONADA
		if($("#SELECAO___"+seq).is(":checked")){
			
			var codColigada = $("#CODCOLIGADAATV___"+seq).val()
			var codFilial = $("#CODFILIALATV___"+seq).val()
			var codEstrutura = $("#CODESTRUTURA___"+seq).val()
			var codmo = $("#CODMO").val() 
			var codOrdem = $("#OPATV___"+seq).val()
			var idAtvOrdem = $("#IDATIVIDADE___"+seq).val()
			var codAtividade = $("#CODATIVIDADE___"+seq).val()
			var horasProgramadas = $("#HORASPROGRAMADASREAL___"+seq).val()
			var dataProgramada = $("#NOVA_DATA_REAL").val()
			
			console.log("codColigada: "+codColigada+", codFilial: "+codFilial+", codmo: "+codmo+", codOrdem: "+codOrdem+", codEstrutura: "+codEstrutura+
					", idAtvOrdem: "+idAtvOrdem+", codAtividade: "+codAtividade+", dataProgramada: "+dataProgramada+", horasProgramadas: "+horasProgramadas)
					
			// EXECUTA A PROCEDURE
			execProcedure(codColigada,codFilial,codOrdem,codAtividade,codmo,dataProgramada,horasProgramadas)
			
		}
		
	})	
	
}

// PROGRAMAR ATIVIDADES SELECIONADAS
function programarAtvs(){
	
	console.log("vou programar todas as atividades selecionadas")
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSATV___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		// SE ATIVIDADE FOI SELECIONADA
		if($("#SELECAO___"+seq).is(":checked")){
			
			var codColigada = $("#CODCOLIGADAATV___"+seq).val()
			var codFilial = $("#CODFILIALATV___"+seq).val()
			var codEstrutura = $("#CODESTRUTURA___"+seq).val()
			var codmo = $("#CODMO_NOVO").val() 
			var codOrdem = $("#OPATV___"+seq).val()
			var idAtvOrdem = $("#IDATIVIDADE___"+seq).val()
			var codAtividade = $("#CODATIVIDADE___"+seq).val()
			var horasProgramadas = $("#HORASPROGRAMADASREAL___"+seq).val()
			var dataProgramada = $("#DATA_PROGRAMADA_REAL").val()
			
			console.log("codColigada: "+codColigada+", codFilial: "+codFilial+", codmo: "+codmo+", codOrdem: "+codOrdem+", codEstrutura: "+codEstrutura+
					", idAtvOrdem: "+idAtvOrdem+", codAtividade: "+codAtividade+", dataProgramada: "+dataProgramada+", horasProgramadas: "+horasProgramadas)
					
			// EXECUTA A PROCEDURE
			execProcedure(codColigada,codFilial,codOrdem,codAtividade,codmo,dataProgramada,horasProgramadas)
			
		}
		
	})
	
}

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

	var usuario = $("#USUARIOATUAL").val()
	var c8 = DatasetFactory.createConstraint("USUARIOATUAL", usuario, usuario, ConstraintType.MUST);
   
	var constraints = new Array(c1,c2,c3,c4,c5,c6,c7,c8);
    
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

// LIMPA A TABELA PRINCIPAL
function limpaTabela(){
		
	console.log("vou limpar a tabela principal")	
		
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OSATV___']").each(function(){
		
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

function procurarTABELA(){
    
		var filial;
		var codmo;
	
		filial = $("#CODFILIAL_delp").val()
	
		codmo = $("#CODREG").val()
	
		if( filial == "" || filial==null || filial==undefined || codmo == "" || codmo==null || codmo==undefined ){
	
			// EXIBE ALERTA
			Swal.fire({
				icon: 'error',
				title: 'Campos Obrigatórios não preenchidos',
				text: 'Verifique os campos obrigatórios(*)'


			})
		}
		else{


			removeTabelaHAB()
			carregarHAB(filial, codmo)
			$("#TABELAHABADD").show()

	
		}

}

// CARREGA AS HABILIDADES QUE A PESSOA JA POSSUI

 function carregarHAB(filial, codmo){
 
	var B1 = DatasetFactory.createConstraint("CODFILIAL", filial, filial, ConstraintType.MUST);
	var B2 = DatasetFactory.createConstraint("CODREG", codmo, codmo, ConstraintType.MUST);

	var constraints = new Array(B1,B2)
	var dataset = DatasetFactory.getDataset("dsHabilidadeOperador", null, constraints, null);
	
	var row = dataset.values
	
	console.log("Retorno do dsHabilidadeOperador ")
	console.log(row)

	var i;
	var ret;
	var seq;

	if(row!="" && row!=undefined && row!=null){

		for(i=0;i<row.length;i++){
			
			ret = row[i];

			seq = addHabilidadeSelecionada()

			setZoomData("tabelaHAB___"+seq,ret['DESCRICAOHABIL'])
			$("#CODHABIL___"+seq).val(ret['CODHABILIDADE'])

		}

	}




}

function verificaHABILIDADE(valor){

	var ret = 1

	$("input[id^='CODHABIL___']").each(function(){

		console.log($(this).val()+" e "+valor)

		if($(this).val()==valor){

			ret = 0;

		}


	})

		return ret;


}


function removeTabelaHAB(){

		$("span[id^='REMOVEHABILDADE___']").each(function(){

			$(this).parent().parent().remove();


		}

	)

			$("#TABELAHABADD").hide()

}

