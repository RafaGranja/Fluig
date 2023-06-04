// SE ITEM É SELECIONADO NO CAMPO ZOOM
function setSelectedZoomItem(selectedItem) {        
	
	var input = selectedItem.inputId;
	
	console.log("entrei no setSelectedZoomItem")
	
	// SE A OS É SELECIONADA
	//if(selectedItem.inputId.indexOf("PROJETO")!="-1"){
	if(selectedItem.inputId == "PROJETO"){
			
		console.log("entrei no projeto")
		
		// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
		$("#CODPRJ").val(selectedItem['CODPRJ'])
		$("#CODCOLIGADA").val(selectedItem['CODCOLIGADA'])
		$("#CODFILIAL").val(selectedItem['CODFILIAL'])
		$("#DESCRICAOPRJ").val(selectedItem['DESCRICAO'])
		$("#IDPRJ").val(selectedItem['IDPRJ'])
		
		console.log("NUM OS: "+selectedItem['CODPRJ']+", DESCRIÇÃO: "+selectedItem["DESCRICAO"]+", IDPRJ: "+selectedItem["IDPRJ"])
	
		// RELOAD ZOOM FILTER VALUES NAS OP'S DO PROJETO
		reloadZoomFilterValues("PLANOCORTE","CODCCUSTO,"+selectedItem['CODPRJ']+",CODCOLIGADA,"+selectedItem['CODCOLIGADA'])
				
		// DESABILITA O CAMPO DO PLANO DE CORTE
		$("#PLANOCORTE").prop("disabled",false)
		
	}
	
	// SE O PLANO DE CORTE FOR SELECIONADO
	//if(selectedItem.inputId.indexOf("PLANOCORTE")!="-1"){
	if(selectedItem.inputId == "PLANOCORTE"){
		
		// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
		$("#NUMPLANOCORTEREAL").val(selectedItem['NUMPLANOCORTE'])
				
		$("#CODCOLIGADA").val(selectedItem['CODCOLIGADA'])
		$("#CODFILIAL").val(selectedItem['CODFILIAL'])
		
		window['PROJETO'].setValue(selectedItem['CODCCUSTO'])
		$("#CODPRJ").val(selectedItem['CODCCUSTO'])
		
	}
	
	// SE A OS É SELECIONADA
	//if(selectedItem.inputId.indexOf("DESPPROJETO")!="-1"){
	if(selectedItem.inputId == "PROJETODESP"){
		
		console.log("entrei no projetoDesp")
		
		// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
		$("#CODPRJDESP").val(selectedItem['CODPRJ'])
		$("#CODCOLIGADADESP").val(selectedItem['CODCOLIGADA'])
		$("#CODFILIALDESP").val(selectedItem['CODFILIAL'])
		$("#DESCRICAOPRJDESP").val(selectedItem['DESCRICAO'])
		$("#IDPRJDESP").val(selectedItem['IDPRJ'])
		
		console.log("NUM OS: "+selectedItem['CODPRJ']+", DESCRIÇÃO: "+selectedItem["DESCRICAO"]+", IDPRJ: "+selectedItem["IDPRJ"])
	
		// RELOAD ZOOM FILTER VALUES NAS OP'S DO PROJETO
		reloadZoomFilterValues("PLANOCORTEDESP","CODCCUSTO,"+selectedItem['CODPRJ']+",CODCOLIGADA,"+selectedItem['CODCOLIGADA'])
				
		// DESABILITA O CAMPO DO PLANO DE CORTE
		$("#PLANOCORTEDESP").prop("disabled",false)
		
	}
	
	// SE O PLANO DE CORTE FOR SELECIONADO
	//if(selectedItem.inputId.indexOf("CORTEDESP")!="-1"){
	if(selectedItem.inputId == "PLANOCORTEDESP"){
		
		// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
		$("#NUMPLANOCORTEREALDESP").val(selectedItem['NUMPLANOCORTE'])
			
		$("#CODCOLIGADADESP").val(selectedItem['CODCOLIGADA'])
		$("#CODFILIALDESP").val(selectedItem['CODFILIAL'])
		
		window['PROJETODESP'].setValue(selectedItem['CODCCUSTO'])
		$("#CODPRJDESP").val(selectedItem['CODCCUSTO'])
		
	}
	//FUNÇÃO HABILITA CAMPO DE OPERADOR SE O CAMPO FILIAL FOR PREENCHIDO - ADRIELLY E DIEGO

    if(selectedItem.inputId == "filialprog"){

        $("#filial_cod").val(selectedItem['CODFILIAL'])
        $("#registro").prop("disabled",false)

    }


    //SE O OPERADOR É SELECIONADO

    if(selectedItem.inputId == "registro"){

        $("#CODregistro").val(selectedItem['CODMO'])


    }

	//SE UMA HABILIDADE É SELECIONADA - ADRIELLY E DIEGO 

    if(selectedItem.inputId.split("___")[0]=="novaTABELA"){

        var seq = selectedItem.inputId.split("___")[1]

        console.log(seq)

        var a = verificaHabilidade(selectedItem['CODHABILIDADE'])

        console.log(a)


        if(a==0){

            console.log("remove")

            $("#novaTABELA___"+String(seq)+">option").remove()

            // EXIBE ALERTA

            Swal.fire({

                icon: 'error',

                title: 'Habilidade já selecionada'

            })

        }else{

            $("#CODHAB___"+seq).val(selectedItem['CODHABILIDADE'])

        }
    }


    //SE O OPERADOR É SELECIONADO

    if(selectedItem.inputId == "registro"){

        $("#CODregistro").val(selectedItem['CODMO'])

    }
	
	// SE O MOTIVO FOR SELECIONADO
	if(selectedItem.inputId == "MOTDESPROG"){
		
		// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
		$("#CODINTERNO").val(selectedItem["CODINTERNO"])
				
	}
	
	// SE O RECURSO FOR SELECIONADO
	if(selectedItem.inputId == "RECURSO"){
		
		var codmo = $("#CODMORECURSO").val()
		
		if(codmo=="" || codmo==null || codmo==undefined){
			
			$("#CODMORECURSO").val(selectedItem['CODMO'])
			
		} else {
			
			$("#CODMORECURSO").val(codmo+","+selectedItem['CODMO'])
			
		}
		
		/*codmo = $("#CODMORECURSO").val()
		codmo = codmo.split(",")
		
		$("#RECURSO>option").remove()
		
		console.log("codmo")

		console.log(codmo)
		
		for(var i=0; i<codmo.length;i++){
			
			console.log("vou inserir "+codmo[i])
			
			window["RECURSO"].setValue(codmo[i])
			
		}*/
		
		// FILTRA RECURSO NA TABELA RAD
		filtraRecursoRAD()
				
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
				//if(verificaOperador(selectedItem["CODMO"])){
					
					// BUSCA E SALVA AS HORAS PROGRAMADAS PARA UM DETERMINADO OPERADOR
					buscaHorasProgramadas(selectedItem["CODMO"])
					
				//}  
				
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
					//if(verificaOperador2(selectedItem["CODMO"])){
						
						// BUSCA E SALVA AS HORAS PROGRAMADAS PARA UM DETERMINADO OPERADOR
						buscaHorasProgramadas2(selectedItem["CODMO"])
						
					//}
					
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
	
	// SE O MOTIVO É SELECIONADO
	if(selectedItem.inputId=="MOTDESPROG1"){
		
		// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
		$("#CODINTERNO1").val(selectedItem['CODINTERNO'])
		
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
	
}

// SE ITEM É REMOVIDO DO CAMPO ZOOM
function removedZoomItem(removedItem)
{
	var input = removedItem.inputId;
	
	// SE A OS É REMOVIDA
	//if(removedItem.inputId.indexOf("PROJETO")!="-1"){
	
	if(removedItem.inputId == "PROJETO"){
		
		console.log("entrei no projeto")
		
		// LIMPA OS CAMPOS NECESSÁRIOS DE ACORDO COM A REMOÇÃO
		$("#CODPRJ").val("")
		$("#CODCOLIGADA").val("")
		$("#CODFILIAL").val("")
		$("#DESCRICAOIDPRJ").val("")
		$("#IDPRJ").val("")
				
		// DESABILITA O CAMPO DO PLANO DE CORTE
		$("#PLANOCORTE>option").remove()
		//$("#PLANOCORTE").prop("disabled",true)
		
		// RELOAD ZOOM FILTER VALUES NAS OP'S DO PROJETO
		reloadZoomFilterValues("PLANOCORTE","")
		
		// LIMPA A TABELA RAD DE PROGRAMAÇÃO E ESCONDE OS CAMPOS 
		limpaEscondeRAD()
		
	}

	// FUNÇÃO DESABILITADA OPERADOR QUANDO O CAMPO FILIAL É RETIRADO - ADRIELLY E DIEGO

    if(removedItem.inputId == "filialprog"){

    
        // LIMPA OS CAMPOS NECESSÁRIOS DE ACORDO COM A REMOÇÃO

        $("#registro").prop("disabled",true)
        $("#filial_cod").val("")
        $("#registro>option").remove()


        limparTabelaHab()

    }

	// FUNÇÃO DESABILITADA TABELA QUANDO O CAMPO OPERADOR É RETIRADO - ADRIELLY E DIEGO

    if(removedItem.inputId == "registro"){


        $("#novaTABELA").val("")
        $("#ADICIONAHAB>option").remove()
        $("#CODregistro").val("")


        limparTabelaHab()

    
    }

	// SE A habilidade É REMOVIDA

    if(removedItem.inputId.split("___")[0]=="novaTABELA"){

        var seq = removedItem.inputId.split("___")[1]

        // LIMPA O VALOR DO CAMPO DE ACORDO COM A REMOÇÃO

        $("#CODHAB___"+seq).val("")

    }
	
	// SE O PLANO DE CORTE É REMOVIDO
	//if(removedItem.inputId.indexOf("PLANOCORTE")!="-1"){
	if(removedItem.inputId == "PLANOCORTE"){
		
		// LIMPA OS CAMPOS NECESSÁRIOS DE ACORDO COM A REMOÇÃO
		$("#NUMPLANOCORTEREAL").val("")
		$("#CODCOLIGADA").val("")
		$("#CODFILIAL").val("")
		
		$("#PROJETO>option").remove()
		$("#CODPRJ").val("")
		
		// LIMPA A TABELA RAD DE PROGRAMAÇÃO E ESCONDE OS CAMPOS 
		limpaEscondeRAD()
		
	}
	
	// SE A OS É REMOVIDA
	//if(removedItem.inputId.indexOf("DESPPROJETO")!="-1"){
	if(removedItem.inputId == "PROJETODESP"){
		
		console.log("entrei no projetoDesp")
		
		// LIMPA OS CAMPOS NECESSÁRIOS DE ACORDO COM A REMOÇÃO
		$("#CODPRJDESP").val("")
		$("#CODCOLIGADADESP").val("")
		$("#CODFILIALDESP").val("")
		$("#DESCRICAOIDPRJDESP").val("")
		$("#IDPRJDESP").val("")
				
		// DESABILITA O CAMPO DO PLANO DE CORTE
		$("#PLANOCORTEDESP>option").remove()
		//$("#PLANOCORTEDESP").prop("disabled",true)
		
		// RELOAD ZOOM FILTER VALUES NAS OP'S DO PROJETO
		reloadZoomFilterValues("PLANOCORTEDESP","")
		
		// LIMPA A TABELA RAD DE DESPROGRAMAÇÃO E ESCONDE OS CAMPOS 
		limpaEscondeRADDesp()
		
	}

	
	// SE O PLANO DE CORTE É REMOVIDO
	//if(removedItem.inputId.indexOf("CORTEDESP")!="-1"){
	if(removedItem.inputId == "PLANOCORTEDESP"){
		
		// LIMPA OS CAMPOS NECESSÁRIOS DE ACORDO COM A REMOÇÃO
		$("#NUMPLANOCORTEREALDESP").val("")
		$("#CODCOLIGADADESP").val("")
		$("#CODFILIALDESP").val("")
		
		$("#PROJETODESP>option").remove()
		$("#CODPRJDESP").val("")
		
		// LIMPA A TABELA RAD DE DESPROGRAMAÇÃO E ESCONDE OS CAMPOS 
		limpaEscondeRADDesp()
				
	}
	
	// SE O MOTIVO FOR REMOVIDO
	if(removedItem.inputId == "MOTDESPROG"){
		
		// PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
		$("#CODINTERNO").val("")
				
	}
	
	// SE O RECURSO FOR REMOVIDO
	if(removedItem.inputId == "RECURSO"){
		
		var codmo = $("#CODMORECURSO").val()
		
		console.log("codmo: "+codmo)
		
		if(codmo=="" || codmo==null || codmo==undefined){
			
			$("#CODMORECURSO").val("")
			
		} else {
			
			$("#CODMORECURSO").val("")
			
			if(codmo.includes(",")){
				
				codmo = codmo.split(",")
				
				for(var i=0; i<codmo.length;i++){
					
					var codmoAux = $("#CODMORECURSO").val()
					
					console.log("codmo: "+codmo[i])
					
					if(!(codmo[i]==removedItem["CODMO"])){
						
						if(codmoAux=="" || codmoAux==null || codmoAux==undefined){
							
							$("#CODMORECURSO").val(codmo[i])
							
						} else{
							
							$("#CODMORECURSO").val(codmoAux+","+codmo[i])
								
						}
						
					}
					
				}
				
			} else {
				
				$("#CODMORECURSO").val("")
				
			}
						
		}
		
		codmo = $("#CODMORECURSO").val()
		
		console.log("codmo: "+codmo)
		
		/*
		codmo = $("#CODMORECURSO").val()
		
		console.log("codmo: "+codmo)
		
		if(codmo.includes(",")){
			
			codmo = codmo.split(",")
			
			$("#RECURSO>option").remove()
			
			for(var i=0; i<codmo.length;i++){
				
				window["RECURSO"].setValue(codmo[i])
				
			}
			
		}*/
		
		// FILTRA RECURSO NA TABELA RAD
		filtraRecursoRAD()
				
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
	
}

// SETAR UM VALOR NO ZOOM
function setZoomData(instance, value){ 
	
	window[instance].setValue(value); 
	
}