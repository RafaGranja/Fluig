// SE ITEM É REMOVIDO DO CAMPO ZOOM
function setSelectedZoomItem(selectedItem) {        
	
	var input = selectedItem.inputId;
	
	console.log("entrei no setSelectedZoomItem")
	
	// SE A FILIAL É SELECIONADA
	if(selectedItem.inputId=="FILIAL"){
		
		// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
		$("#CODFILIAL").val(selectedItem['CODFILIAL'])
		
	}
	
	// SE A MATRICULA É SELECIONADA
	if(selectedItem.inputId=="MATRICULA"){
		
		// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
		$("#CODMO").val(selectedItem['CODMO'])
		$("#TURNO_NOVO").val(selectedItem['TURNO'])
		$("#CODCOLIGADA").val(selectedItem["CODCOLIGADA"])
		$("#RECPJ").val(selectedItem["RECPJ"])
		
	}
	
		//ESSA HABILITA O CAMPO NOME/REGISTRO QUANDO A FILIAL E PREENCHIDA//
			// DIEGO RODRIGUES //
	if(selectedItem.inputId == "FILIAL_delp"){
		$("#registro").prop("disabled",false)
		$("#CODFILIAL_delp").val(selectedItem['CODFILIAL'])


	}
	if(selectedItem.inputId == "registro"){
		$("#CODREG").val(selectedItem['CODMO'])
	}
	// SE O MOTIVO É SELECIONADO
	if(selectedItem.inputId=="MOTDESPROG1"){
		
		// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
		$("#CODINTERNO1").val(selectedItem['CODINTERNO'])
		
	}
	
	// SE A OS É SELECIONADA
	if(selectedItem.inputId.indexOf("PROJETOREPROG___")!=-1){
		
		var seq = selectedItem.inputId.split("___")[1]
		
		$("#CODPRJ___"+seq).val(selectedItem["CODPRJ"])
		$("#DESCRICAOPRJ___"+seq).val(selectedItem["DESCRICAO"])
		$("#IDPRJ___"+seq).val(selectedItem["IDPRJ"])
		
		// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
		$("#OSREPROG___"+seq).val(selectedItem['CODPRJ'])
		$("#CODCOLIGADAREPROG___"+seq).val(selectedItem['CODCOLIGADA'])
		$("#CODFILIALREPROG___"+seq).val(selectedItem['CODFILIAL'])
		$("#IDPRJREPROG___"+seq).val(selectedItem['IDPRJ'])
		
		// HABILITA O CAMPO DA CÉLULA
		$("#CODCELULAREPROG___"+seq).prop("disabled",false)
		
		// RELOAD ZOOM NO CAMPO DAS OPS DO PROJETO
		//reloadZoomFilterValues("ORDEMREPROG___"+seq,"CODCCUSTO,"+numOS+",CELULA,"+selectedItem["CODCLIENTE"])
		reloadZoomFilterValues("ORDEMREPROG___"+seq,"CODCCUSTO,"+selectedItem['CODPRJ'])
		
		// HABILITA O CAMPO DAS OPS
		$("#ORDEMREPROG___"+seq).prop("disabled",false)
	
	}
	
	// SE A CÉLULA É SELECIONADA
	if(selectedItem.inputId.indexOf("CODCELULAREPROG___")!=-1){
		
		var seq = selectedItem.inputId.split("___")[1]
		var numOS = $("#PROJETOREPROG___"+seq).val()
		
		// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
		$("#CELULAREPROG___"+seq).val(selectedItem['CODCLIENTE'])
		
		// RELOAD ZOOM NO CAMPO DAS OPS DO PROJETO
		reloadZoomFilterValues("ORDEMREPROG___"+seq,"CODCCUSTO,"+numOS+",CELULA,"+selectedItem["CODCLIENTE"])
		
		// HABILITA O CAMPO DAS OPS
		$("#ORDEMREPROG___"+seq).prop("disabled",false)
		
	}
	
	// SE A OP É SELECIONADA
	if(selectedItem.inputId.indexOf("ORDEMREPROG___")!=-1){
		
		var seq = selectedItem.inputId.split("___")[1]
		var codFilial = $("#CODFILIAL").val()
		var codmo = $("#CODMO").val()	
		
		// SE STATUS DA OP É CANCELADA OU APONTADO
		if(selectedItem["STATUS_OP"]=="5" || selectedItem["STATUS_OP"]=="6"){
			
			// REMOVE A SELEÇÃO
			$("#ORDEMREPROG___"+seq+">option").remove()
			
			console.log("status da OP: "+selectedItem["STATUS_OP"])
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'Essa OP não pode ser selecionada pois já foi apontada ou cancelada',
				  text: 'Verifique e tente novamente'
			})
			
		} else {
			
			// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
			$("#OPREPROG___"+seq).val(selectedItem['CODORDEM'])
			$("#CODESTRUTURAREPROG___"+seq).val(selectedItem['CODESTRUTURA'])

			// RELOAD ZOOM NO CAMPO DOS ID'S DAS ATIVIDADES
			reloadZoomFilterValues("ATIVIDADEREPROG___"+seq,"CODORDEM,"+selectedItem["CODORDEM"]+",CODFILIAL,"+codFilial+",CODMO,"+codmo)
			reloadZoomFilterValues("PRIORIDADEATVSREPROG___"+seq,"CODORDEM,"+selectedItem["CODORDEM"]+",CODFILIAL,"+codFilial+",CODMO,"+codmo)

			// HABILITA O CAMPO DAS ATIVIDADES
			$("#ATIVIDADEREPROG___"+seq).prop("disabled",false)
			$("#PRIORIDADEATVSREPROG___"+seq).prop("disabled",false)

		}
				
	}
	
	// SE A ATIVIDADE É SELECIONADA
	if(selectedItem.inputId.indexOf("ATIVIDADEREPROG___")!=-1){
		
		var seq = selectedItem.inputId.split("___")[1]
		
		var codColigada = $("#CODCOLIGADAREPROG___"+seq).val()
		var codFilial = $("#CODFILIALREPROG___"+seq).val()
		var codEstrutura = $("#CODESTRUTURAREPROG___"+seq).val()
		var codOrdem = $("#OPREPROG___"+seq).val()
		var idAtvOrdem = selectedItem['IDATVORDEM']
		
		if(selectedItem["STATUS_ATV"]=="5" || selectedItem["STATUS_ATV"]=="6"){

			$("#ATIVIDADEREPROG___"+seq+">option").remove()
			
			console.log("status da Atividade: "+selectedItem["STATUS_ATV"])

			Swal.fire({
				icon: 'error',
				title: 'Essa atividade não pode ser selecionada pois já foi apontada ou cancelada',
				text: 'Verifique e tente novamente'
		  })
			
		}
		else{
			// VERIFICA SE ATIVIDADE TEM PLANO DE CORTE
			if(atvTemPlanoCorte(codColigada,codFilial,codOrdem,idAtvOrdem,codEstrutura)){
				
				// REMOVE A ATIVIDADE SELECIONADA
				$("#ATIVIDADEREPROG___"+seq+">option").remove()
				
				// EXIBE ALERTA
				Swal.fire({
					icon: 'error',
					title: 'Essa OP e atividade não pode ser selecionada pois pertence a um plano de corte.',
					text: 'Verifique e tente novamente'
				})
				
			} else {
				// SE NÃO
				g
				// VERIFICA A DUPLICIDADE DA ATIVIDADE DA OP
				if(verificaDuplicidadeOpAtv(seq)){
					
					// REMOVE A ATIVIDADE SELECIONADA
					$("#ATIVIDADEREPROG___"+seq+">option").remove()
					
					// EXIBE ALERTA
					Swal.fire({
						icon: 'error',
						title: 'Essa OP e atividade já foram selecionadas na tabela de troca.',
						text: 'Verifique e tente novamente'
					})
					
				} else {
					// SE NÃO
					
					// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
					$("#IDATVREPROG___"+seq).val(selectedItem['IDATVORDEM'])
					
					window["PRIORIDADEATVSREPROG___"+seq].setValue(selectedItem['PRIORIDADE']); 
					$("#PRIORIDADEREPROG___"+seq).val(selectedItem['PRIORIDADE'])
					$("#DSCATIVIDADEREPROG___"+seq).val(selectedItem['DSCATIVIDADE'])
					$("#CODATIVIDADEREPROG___"+seq).val(selectedItem['CODATIVIDADE'])
					
					$("#HORASPROGRAMADASREPROG___"+seq).prop("disabled",false)
					
				}
				
			}
		}
		
	}
	
	// SE A PRIORIDADE É SELECIONADA
	if(selectedItem.inputId.indexOf("PRIORIDADEATVSREPROG___")!=-1){
		
		var seq = selectedItem.inputId.split("___")[1]
		
		var codColigada = $("#CODCOLIGADAREPROG___"+seq).val()
		var codFilial = $("#CODFILIALREPROG___"+seq).val()
		var codEstrutura = $("#CODESTRUTURAREPROG___"+seq).val()
		var codOrdem = $("#OPREPROG___"+seq).val()
		var idAtvOrdem = selectedItem['IDATVORDEM']
		
		// VERIFICA SE ATIVIDADE TEM PLANO DE CORTE
		if(atvTemPlanoCorte(codColigada,codFilial,codOrdem,idAtvOrdem,codEstrutura)){
			
			// REMOVE A ATIVIDADE SELECIONADA
			$("#PRIORIDADEATVSREPROG___"+seq+">option").remove()
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'Essa OP e atividade não pode ser selecionada pois pertence a um plano de corte.',
				  text: 'Verifique e tente novamente'
			})
			
		} else {
			// SE NÃO
		
			// VERIFICA A DUPLICIDADE DA ATIVIDADE DA OP
			if(verificaDuplicidadeOpAtv(seq)){
				
				// REMOVE A ATIVIDADE SELECIONADA
				$("#PRIORIDADEATVSREPROG___"+seq+">option").remove()
				
				// EXIBE ALERTA
				Swal.fire({
					  icon: 'error',
					  title: 'Essa OP e atividade já foram selecionadas na tabela de troca.',
					  text: 'Verifique e tente novamente'
				})
				
			} else {
				// SE NÃO
			
				// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
				$("#PRIORIDADEREPROG___"+seq).val(selectedItem['PRIORIDADE'])
		
				window["ATIVIDADEREPROG___"+seq].setValue(selectedItem['IDATVORDEM']); 
				$("#IDATVREPROG___"+seq).val(selectedItem['IDATVORDEM'])
				$("#DSCATIVIDADEREPROG___"+seq).val(selectedItem['DSCATIVIDADE'])
				$("#CODATIVIDADEREPROG___"+seq).val(selectedItem['CODATIVIDADE'])
		
				$("#HORASPROGRAMADASREPROG___"+seq).prop("disabled",false)
				
			}
			
		}
		
	}
	
	// SE O MOTIVO É SELECIONADO
	if(selectedItem.inputId=="MOTDESPROG2"){
		
		// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
		$("#CODINTERNO2").val(selectedItem['CODINTERNO'])
		
	}
	
	// SE O MOTIVO É SELECIONADO
	if(selectedItem.inputId=="MOTDESPROG3"){
		
		// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
		$("#CODINTERNO3").val(selectedItem['CODINTERNO'])
		
	}
	
	// SE O MOTIVO É SELECIONADO
	if(selectedItem.inputId=="MOTDESPROG4"){
		
		// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
		$("#CODINTERNO4").val(selectedItem['CODINTERNO'])
		
	}
	
	// SE O MOTIVO DA DESPROGRAMAÇÃO É SELECIONADO
	if(selectedItem.inputId=="MOTDESPROG5"){
	
		$("#CODINTERNO5").val(selectedItem["CODINTERNO"])
		
	}
	// QUANDO HABILIDADE FOR SELECIONADA 2 VEZES, EXIBIR MENSAGEM - DIEGO RODRIGUES 

	if(selectedItem.inputId.split("___")[0] =="tabelaHAB"){

		var seq = selectedItem.inputId.split("___")[1]
		console.log(seq)
		var a = verificaHABILIDADE(selectedItem['CODHABILIDADE'])
		console.log(a)

		if(a==0){

			console.log("remove")
			$("#tabelaHAB___"+String(seq)+">option").remove()

			// EXIBE ALERTA 
			Swal.fire({

				icon: 'error',
				title: 'Habilidade ja selecionada'
			
			})

		}else{

			
			$("#CODHABIL___"+seq).val(selectedItem['CODHABILIDADE'])
		
		}

	}

	// SE A MATRÍCULA NOVA É SELECIONADA
	if(selectedItem.inputId=="NOVA_MATRICULA"){
		
		// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
		$("#CODMO_NOVO").val(selectedItem['CODMO'])
		
		var myLoading2 = FLUIGC.loading(window);
		myLoading2.show();
		
		setTimeout(function(){
			
			// VERIFICA SE EXISTE PELO MENOS UMA ATIVIDADE SELECIONADA
			if(verificaSelecaoAtvs()){
				
				// VERIFICA SE O OPERADOR PODE SER ALOCADO PARA AS ATIVIDADES SELECIONADAS
				if(verificaOperador(selectedItem["CODMO"])){
					
					// BUSCA E SALVA AS HORAS PROGRAMADAS PARA UM DETERMINADO OPERADOR
					buscaHorasProgramadas(selectedItem["CODMO"])
					
				}  
				
			} else {
			
				// LIMPA A SELEÇÃO
				$("#NOVA_MATRICULA>option").remove()
				$("#CODMO_NOVO").val("")
				
				// EXIBE ALERTA
				Swal.fire({
					  icon: 'error',
					  title: 'Não há atividades selecionadas para que a troca de funcionário seja realizada',
					  text: 'Verifique e tente novamente'
				})
				
			}
			
		},500)
		
		setTimeout(function(){
					
			myLoading2.hide();
					  
	    },500)
		
	}
	
	// SE A MATRÍCULA NOVA2 É SELECIONADA
	if(selectedItem.inputId=="NOVA_MATRICULA2"){
		
		var dataProg = $("#NOVA_DATA_REAL2").val()
		
		// SE DATA PARA PROGRAMAR FOI INFORMADA
		if( !(dataProg=="" || dataProg==null || dataProg==undefined)){
			
			// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
			$("#CODMO_NOVO2").val(selectedItem['CODMO'])
			
			var myLoading2 = FLUIGC.loading(window);
			myLoading2.show();
			
			setTimeout(function(){
				
				// VERIFICA SE EXISTE PELO MENOS UMA ATIVIDADE SELECIONADA
				if(verificaSelecaoAtvs()){
					
					// VERIFICA SE O OPERADOR PODE SER ALOCADO PARA AS ATIVIDADES SELECIONADAS
					if(verificaOperador2(selectedItem["CODMO"])){
						
						// BUSCA E SALVA AS HORAS PROGRAMADAS PARA UM DETERMINADO OPERADOR
						buscaHorasProgramadas2(selectedItem["CODMO"])
						
					}
					
				} else {
				
					// LIMPA A SELEÇÃO
					$("#NOVA_MATRICULA2>option").remove()
					$("#CODMO_NOVO2").val("")
					
					// EXIBE ALERTA
					Swal.fire({
						  icon: 'error',
						  title: 'Não há atividades selecionadas para que a troca de funcionário e data sejam realizadas',
						  text: 'Verifique e tente novamente'
					})
					
				}
				
			},500)
			
			setTimeout(function(){
						
				myLoading2.hide();
						  
		    },500)
				
		}else{
			// SE NÃO
	
			// LIMPA A SELEÇÃO
			$("#NOVA_MATRICULA2>option").remove()
			$("#CODMO_NOVO2").val("")
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'É necessário informar a data antes do funcionário',
				  text: 'Verifique e tente novamente'
			})
			
		}
				
	}
	
}

// SE ITEM É REMOVIDO DO CAMPO ZOOM
function removedZoomItem(removedItem){
	
	console.log("entrei no removed Zoom")
	
	var input = removedItem.inputId;
	
	console.log("input :"+input)
	
	// SE A FILIAL É SELECIONADA
	if(removedItem.inputId=="FILIAL"){
		
		// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
		$("#CODFILIAL").val("")
		
		$("#DATA_PROGRAMADA").val("")
		$("#DATA_PROGRAMADA_REAL").val("")
		
		$("#MATRICULA>option").remove()
		$("#CODMO").val("")
		$("#RECPJ").val("")
		$("#CODCOLIGADA").val("")
		$("#TURNO_NOVO").val("")

		// LIMPA A TABELA DE ATIVIDADES
		limpaTabelaAtvs()
		
		// LIMPA TODOS OS CAMPOS DAS ABAS
		limpaCamposAbas()
	
		// ESCONDE AS ABAS 
		$(".ABAS").hide()
		
	}
		// FUNÇÃO DESABILITA O CAMPO DE NOME/REGISTRO QUANDO O FILIAL E RETIRADO//
			// DIEGO RODRIGUES// 
	if(removedItem.inputId =="FILIAL_delp"
	){
		$("#registro").prop("disabled",true)
		$("#CODFILIAL_delp").val("")
		$("#registro>option").remove()

		removeTabelaHAB()
	}
	if(removedItem.inputId =="registro")
	{
		$("#CODREG").val("")

		removeTabelaHAB()
	}

	// SE A HABILIDADE É REMOVIDA
	if(removedItem.inputId.split("___")[0]=="tabelaHAB"){

		var seq = removedItem.inputId.split("___")[1]

		//LIMPA O VALOR DO CAMPO DE ACORDO COM A REMOÇÃO
		$("#CODHABIL___"+seq).val("")


	}

	
	// SE A MATRICULA É SELECIONADA
	if(removedItem.inputId=="MATRICULA"){
		
		// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
		$("#CODMO").val("")
		$("#TURNO_NOVO").val("")

		// LIMPA A TABELA DE ATIVIDADES
		limpaTabelaAtvs()
		
		// LIMPA TODOS OS CAMPOS DAS ABAS
		limpaCamposAbas()
	
		// ESCONDE AS ABAS 
		$(".ABAS").hide()
		
	}
	
	// SE O MOTIVO É REMOVIDO
	if(removedItem.inputId=="MOTDESPROG1"){
		
		// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
		$("#CODINTERNO1").val("")
		
	}
	
	// SE O MOTIVO É REMOVIDO
	if(removedItem.inputId=="MOTDESPROG2"){
		
		// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
		$("#CODINTERNO2").val("")
		
	}
	
	// SE O MOTIVO É REMOVIDO
	if(removedItem.inputId=="MOTDESPROG3"){
		
		// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
		$("#CODINTERNO3").val("")
		
	}
	
	// SE O MOTIVO É REMOVIDO
	if(removedItem.inputId=="MOTDESPROG4"){
		
		// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
		$("#CODINTERNO4").val("")
		
	}
	
	// SE O MOTIVO É REMOVIDO
	if(removedItem.inputId=="MOTDESPROG5"){
	
		$("#CODINTERNO5").val("")


	}
		
	
	// SE A MATRÍCULA NOVA É SELECIONADA
	if(removedItem.inputId=="NOVA_MATRICULA"){
		
		// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
		$("#CODMO_NOVO").val("")
		$("#HORAS_DISPONIVEIS").val("")
		$("#SALDO").val("")
		
	}
	
	// SE A MATRÍCULA NOVA É SELECIONADA
	if(removedItem.inputId=="NOVA_MATRICULA2"){
		
		// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
		$("#CODMO_NOVO2").val("")
		$("#HORAS_DISPONIVEIS2").val("")
		$("#SALDO2").val("")
		
	}

	// SE A MATRÍCULA NOVA É SELECIONADA
	if(removedItem.inputId.indexOf("PROJETOREPROG___")!=-1){
	
		var seq = removedItem.inputId.split("___")[1]

		$("#OSREPROG___"+seq).val("")
		$("#CODCELULAREPROG___"+seq+">option").remove(); 
		$("#CODCELULAREPROG___"+seq).prop("disabled",true)
		$("#CELULAREPROG___"+seq).val("")
		$("#ORDEMREPROG___"+seq+">option").remove(); 
		$("#ORDEMREPROG___"+seq).prop("disabled",true)
		$("#OPREPROG___"+seq).val("")
		$("#PRIORIDADEATVSREPROG___"+seq+">option").remove(); 
		$("#PRIORIDADEATVSREPROG___"+seq).prop("disabled",true)
		$("#ATIVIDADEREPROG___"+seq+">option").remove() 
		$("#ATIVIDADEREPROG___"+seq).prop("disabled",true)
		$("#PRIORIDADEREPROG___"+seq).val("")
		$("#DSCATIVIDADEREPROG___"+seq).val("")
		$("#CODATIVIDADEREPROG___"+seq).val("")
		$("#IDATVREPROG___"+seq).val("")
		$("#HORASPROGRAMADASREPROG___"+seq).prop("disabled",true)

	}
	
	// SE A MATRÍCULA NOVA É SELECIONADA
	if(removedItem.inputId.indexOf("CODCELULAREPROG___")!=-1){
	
		var seq = removedItem.inputId.split("___")[1]

		$("#CELULAREPROG___"+seq).val("")
		
		$("#ORDEMREPROG___"+seq+">option").remove(); 
		$("#ORDEMREPROG___"+seq).prop("disabled",true)
		$("#OPREPROG___"+seq).val("")
		$("#PRIORIDADEATVSREPROG___"+seq+">option").remove();
		$("#PRIORIDADEATVSREPROG___"+seq).prop("disabled",true)
		$("#ATIVIDADEREPROG___"+seq+">option").remove() 
		$("#ATIVIDADEREPROG___"+seq).prop("disabled",true)
		$("#PRIORIDADEREPROG___"+seq).val("")
		$("#DSCATIVIDADEREPROG___"+seq).val("")
		$("#CODATIVIDADEREPROG___"+seq).val("")
		$("#IDATVREPROG___"+seq).val("")
		$("#HORASPROGRAMADASREPROG___"+seq).prop("disabled",true)

	}
	
	// SE A MATRÍCULA NOVA É SELECIONADA
	if(removedItem.inputId.indexOf("ORDEMREPROG___")!=-1){
	
		var seq = removedItem.inputId.split("___")[1]

		$("#OPREPROG___"+seq).val("")
		
		$("#PRIORIDADEATVSREPROG___"+seq+">option").remove(); 
		$("#PRIORIDADEATVSREPROG___"+seq).prop("disabled",true)
		$("#ATIVIDADEREPROG___"+seq+">option").remove() 
		$("#ATIVIDADEREPROG___"+seq).prop("disabled",true)
		$("#PRIORIDADEREPROG___"+seq).val("")
		$("#DSCATIVIDADEREPROG___"+seq).val("")
		$("#CODATIVIDADEREPROG___"+seq).val("")
		$("#IDATVREPROG___"+seq).val("")
		$("#HORASPROGRAMADASREPROG___"+seq).prop("disabled",true)
		
	}
	
	// SE A MATRÍCULA NOVA É SELECIONADA
	if(removedItem.inputId.indexOf("PRIORIDADEATVSREPROG___")!=-1){
		
		var seq = removedItem.inputId.split("___")[1]

		$("#ATIVIDADEREPROG___"+seq+">option").remove() 
		$("#PRIORIDADEREPROG___"+seq).val("")
		$("#DSCATIVIDADEREPROG___"+seq).val("")
		$("#CODATIVIDADEREPROG___"+seq).val("")
		$("#IDATVREPROG___"+seq).val("")
		$("#HORASPROGRAMADASREPROG___"+seq).prop("disabled",true)

	}
	
	// SE A MATRÍCULA NOVA É SELECIONADA
	if(removedItem.inputId.indexOf("ATIVIDADEREPROG___")!=-1){

		var seq = removedItem.inputId.split("___")[1]

		$("#PRIORIDADEATVSREPROG___"+seq+">option").remove(); 
		$("#IDATVREPROG___"+seq).val("")
		$("#PRIORIDADEREPROG___"+seq).val("")
		$("#DSCATIVIDADEREPROG___"+seq).val("")
		$("#CODATIVIDADEREPROG___"+seq).val("")
		$("#HORASPROGRAMADASREPROG___"+seq).prop("disabled",true)

	}

}

// SETAR UM VALOR NO ZOOM
function setZoomData(instance, value){ 
	
	window[instance].setValue(value); 

}


