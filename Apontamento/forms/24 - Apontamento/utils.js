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
	
	//var mySimpleCalendar1 = FLUIGC.calendar('#DATAAPONTAMENTO___'+row);
	
	var mySimpleCalendar2 = FLUIGC.calendar('#HORAINICIOATV___'+row, {
		pickDate: false,
	    pickTime: true
	})
	var mySimpleCalendar3 = FLUIGC.calendar('#HORAFIMATV___'+row, {
		pickDate: false,
	    pickTime: true
	})
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
	$("#HORAFIMIMPRO5___"+row).prop("disabled",true)
	
	// CRIA OS CAMPOS HORAS PRODUTIVAS
	criaCamposProdHoras(row)
	
	return row
	
}

// SE TEM ATIVIDADES ANTERIORES DA OP QUE AINDA NÃO FORAM APONTADASs
function temAtvAntSemApont(seq){
	
	var codColigada = $("#CODCOLIGADAATV___"+seq).val()
	var codFilial = $("#CODFILIALATV___"+seq).val()
	var codOrdem = $("#OP___"+seq).val()
	var prioridade = $("#OPERACAO___"+seq).val()
	
	console.log("codColigada: "+codColigada+", codFilial: "+codFilial+", codOrdem: "+codOrdem)
	
	// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
	var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
	var a4 = DatasetFactory.createConstraint("PRIORIDADE",prioridade,prioridade,ConstraintType.MUST)

	var constraints = new Array(a1,a2,a3,a4)
	
	var dataset = DatasetFactory.getDataset("dsVerificaApontAtvAntOP",null,constraints,null)
	var row = dataset.values
	
	console.log("row")
	console.log(row)
	
	// SE RETORNO NÃO É NULO OU VAZIO
	if(!(row=="" || row==null || row==undefined)){
		
		console.log("tem atividades sem apontamento")
		
		return true
		
	} else {
		
		console.log("não tem atividades sem apontamento")
		
		return false
		
	}
	
}

// VERIFICA OS COMPONENTES PENDENTES DE TODAS AS OP'S
function verificaCompOS(seq){
	
	console.log("verifica os componentes pendentes de todas as OPS DA OS foram consumidos")
	
	var componentes = ""
	var codColigada = $("#CODCOLIGADAATV___"+seq).val() 
	var codFilial = $("#CODFILIALATV___"+seq).val()
	var codOrdem = $("#OP___"+seq).val()
	var idAtvOrdem = $("#IDATIVIDADE___"+seq).val()
	var numOS = $("#OSATV___"+seq).val()
	
	console.log("codColigada: "+codColigada+", codFilial: "+codFilial+", codOrdem: "+codOrdem+", idAtvOrdem: "+idAtvOrdem+", numOS: "+numOS)
	
	// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
	var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
	//var a4 = DatasetFactory.createConstraint("IDATVORDEM",idAtvOrdem,idAtvOrdem,ConstraintType.MUST)
	//var a5 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	
	var constraints = new Array(a1,a2,a3)
	
	var dataset = DatasetFactory.getDataset("dsVerificaCompPendOS",null,constraints,null)
	var row = dataset.values
	
	console.log("row")
	console.log(row)
	
	// SE RETORNO NÃO É NULO OU VAZIO
	if(!(row=="" || row==null || row==undefined)){
		
		var count = row.length
		
		// PERCORRE TODOS OS REGISTROS
		for(var i=0;i<count;i++){
			
			componentes = componentes + " "+rep["COMPONENTE"]+" ,"
			
		}
		
	}
	
	console.log("componentes: "+componentes)
	
	return componentes
	
}

// VERIFICA SE TEM ATIVIDADES DAS OPS FILHAS COM APONTAMENTO PENDENTE 
function temAtvsApontPendentes(codOrdem){
	
	console.log("vou buscar se tem atividades das OPS filhas com apontamento pendente da OP: "+codOrdem)
	
	var ops = ""
	
	// RETORNA OS DADOS DA MONTAGEM E DO MONTADOR COM A MENOR DURAÇÃO DE ROTA PARA REALIZAR O SERVIÇO
	//var a1 = DatasetFactory.createConstraint("CODORDEM", idRoteirizacao, idRoteirizacao, ConstraintType.MUST);
	var a1 = DatasetFactory.createConstraint("CODORDEM", codOrdem, codOrdem, ConstraintType.MUST);
	var constraint = new Array(a1);
	
	var dataset = DatasetFactory.getDataset("dsOPAtvsApontPendentes", null, constraint, null);
	var row = dataset.values;
	
	// SE RETORNO NÃO É NULO OU VAZIO
	if(!(row=="" || row==null || row==undefined)){
		
		var count = row.length
		
		// PERCORRE TODOS OS REGISTROS 
		for(var i=0; i<count;i++){
			
			var rep = row[i]
			
			// SE É O PRIMEIRO ITEM
			if(i==0){
				
				ops = rep["CODORDEM"]
				
			} else {
				// SE NÃO
				
				// SE OP NÃO FOI SALVA
				if(!(ops.includes(rep["CODORDEM"]) ) ){
					
					ops = ops +", "+ rep["CODORDEM"]
					
				}
			
			}
			
		}
		
	}
	
	console.log("ops: "+ops)
	
	return ops
	
}

// VERIFICA SE TEM OPS FILHAS QUE ESTÃO COM SALDO PENDENTE PARA SUBIR 
function temOPsPendentesSaldo(codOrdem){
	
	console.log("vou buscar se tem OPS filhas que estão com saldo pendente para subir da OP: "+codOrdem)

	var ops = ""
	var qtdeEfet = 0
		
	// RETORNA OS DADOS DA MONTAGEM E DO MONTADOR COM A MENOR DURAÇÃO DE ROTA PARA REALIZAR O SERVIÇO
	var a1 = DatasetFactory.createConstraint("CODORDEM", codOrdem, codOrdem, ConstraintType.MUST);
	var a2 = DatasetFactory.createConstraint("QTDEFETIVADA", qtdeEfet, qtdeEfet, ConstraintType.MUST);
	
	var constraint = new Array(a1,a2);
	
	var dataset = DatasetFactory.getDataset("dsOPAtvsApontPendentes", null, constraint, null);
	var row = dataset.values;
	
	console.log("row")
	console.log(row)
	
	// SE RETORNO NÃO É NULO OU VAZIO
	if(!(row=="" || row==null || row==undefined)){
		
		var count = row.length
		
		// PERCORRE TODOS OS REGISTROS 
		for(var i=0; i<count;i++){
			
			var rep = row[i]
			
			// SE É O PRIMEIRO ITEM
			if(i==0){
				
				ops = rep["CODORDEM"]
				
			} else {
				// SE NÃO
				
				// SE OP NÃO FOI SALVA
				if(!(ops.includes(rep["CODORDEM"]) ) ){
					
					ops = ops +", "+ rep["CODORDEM"]
					
				}
			
			}
			
		}
		
	}
	
	console.log("ops: "+ops)
	
	return ops
	
}

// VERIFICA SE O SALDO QUE ESTÁ SENDO SUBIDO É SUPERIOR AO SALDO DAS ATIVIDADES DA OP
function verificaValorSaldo(obj){
	
	console.log("verifica se o saldo que está sendo subido é superior ao saldo das atividades da OP")
	
	var saldo = $(obj).val()
	var seq = $(obj).attr("id").split("___")[1]
	var codEstrutura = $("#CODESTRUTURAATV___"+seq).val()
	var codOrdem = $("#OP___"+seq).val()
	var codColigada = $("#CODCOLIGADAATV___"+seq).val()
	var codFilial = $("#CODFILIALATV___"+seq).val()
	var idAtvOrdem = $("#IDATIVIDADE___"+seq).val()
	var saldoRealizado = $("#SALDOREALIZADO___"+seq).val()
	var qtdeRealizada = $("#QTDREALIZADA___"+seq).val()
	var qtdeSaldoOP = $("#QTDSALDO___"+seq).val()
	var qtdeAvanco = $("#QTDEAVANCO___"+seq).val()
	var qtdePrev = $("#QTDEPREV___"+seq).val()
	var qtdeSaldo = $("#QTDESALDO___"+seq).val()
	var avanco = $("#AVANCO___"+seq).val()
	
	console.log("codOrdem: "+codOrdem+", codEstrutura: "+codEstrutura)
	
	// SE ITEM É UM PAI
	if(codEstrutura.includes("04.")){
		
		console.log("é um item pai")
		
		var ops = temAtvsApontPendentes(codOrdem)
		
		console.log("ops: "+ops)
		
		// SE NÃO TEM ATVS DAS OP'S FILHAS PENDENTES
		if(ops=="" || ops==null || ops==undefined){
			
			var opsSaldo = temOPsPendentesSaldo(codOrdem)
			
			console.log("opsSaldo: "+opsSaldo)
			
			// SE NÃO TEM OPS QUE ESTÃO PENDENTES DE SUBIR SALDO
			if(opsSaldo=="" || opsSaldo==null || opsSaldo==undefined){
				
				var saldoAux
				
				console.log("saldo: "+saldo)
				
				// SE SALDO TEM ","
				if(saldo.includes(",")){
					
					saldoAux = saldo
					saldoAux = saldoAux.toString().replace(",",".")
					
				}
				
				saldoAux = saldo
				
				saldoAux = parseFloat(saldoAux)
				
				console.log("saldoAux: "+saldoAux)
				
				var qtdeSaldo = $("#QTDSALDO___"+seq).val()
				
				// SE QTDE DO SALDO TEM ","
				if(qtdeSaldo.includes(",")){
					
					qtdeSaldo = qtdeSaldo.toString().replace(",",".")
					
				}
				
				qtdeSaldo = parseFloat(qtdeSaldo)
				
				console.log("qtdeSaldo: "+qtdeSaldo)
				
				// SE VAI FINALIZAR A OP
				if(saldoAux==qtdeSaldo){					
					
					if(!(avanco=="" || avanco==null || avanco==undefined)){
						
						avanco = parseInt(avanco)
						
					}
					
					// SE AVANÇO NÃO FOI INFORMADO OU ESTÁ COM VALOR 0
					if((avanco=="" || avanco==null || avanco==undefined) || (avanco==0 || avanco<100)){
						
						$(obj).val("")
						
						// EXIBE ALERTA
						Swal.fire({
							  icon: 'error',
							  title: 'Para subir o saldo restante da OP e finalizá-la é necessário informar o avanço total',
							  text: 'Verifique e tente novamente.'
						})
						
					} else {
						// SE NÃO
						
						if(avanco==100 || avancoAtual==100){
							
							// SE TEM ATIVIDADES ANTERIORES DA OP QUE AINDA NÃO FORAM APONTADAS
							if(temAtvAntSemApont(seq)){
								
								// LIMPA O CAMPO
								$(obj).val("")
								
								// EXIBE ALERTA
								Swal.fire({
									  icon: 'error',
									  title: 'Essa atividade não pode subir saldo restante pois ainda existem atividades da OP que não foram apontadas',
									  text: 'Verifique e tente novamente'
								})
								
							} else {
								// SE NÃO
								
								// VERIFICA OS COMPONENTES PENDENTES DE TODAS AS OP'S
								comps = verificaCompOS(seq)

								// SE TODOS OS COMPONENTES DAS OPS FILHAS FORAM CONSUMIDOS
								if(!(comps=="" || comps==null || comps==undefined)){
									
									ret = false

									$(obj).val("")
									
									// EXIBE ALERTA
									Swal.fire({
										  icon: 'error',
										  title: 'Há componentes de OPs filhas que ainda não foram consumidos',
										  text: 'Verifique e tente novamente'
									})
									
								} else {
									// SE NÃO
									
									// VERIFICA OS COMPONENTES PENDENTES DA OP
									var compPendentes = temCompPendentes(codColigada,codFilial,codOrdem,idAtvOrdem)
									
									// SE TEM COMPONENTES QUE ESTÃO PENDENTES DE LANÇAMENTOS
									if(!(compPendentes=="" || compPendentes==null || compPendentes==undefined)){
								
										// LIMPA O CAMPO
										$(obj).val("")
										
										// EXIBE ALERTA
										Swal.fire({
											  icon: 'error',
											  title: "Existem componentes vinculados a essa OP que não foram consumidos",
											  text: 'Verifique a baixa do(s) componente(s): '+compPendentes
										})
										
									}
									
									
								}
								
							}
							
						}
						
					}
					
				} else {
					// SE NÃO
					
					// SE O SALDO PARA SUBIR FOR MAIOR QUE A QUANTIDADE DO SALDO
					if(saldoAux>qtdeSaldo){
						
						$(obj).val("")
						
						// EXIBE ALERTA
						Swal.fire({
							  icon: 'error',
							  title: 'O valor a ser subido não pode ser maior que a quantidade do saldo',
							  text: 'Verifique e tente novamente'
						})
						
					}
					
					if(saldoAux<qtdeSaldo && avanco==100){
						
						$(obj).val("")
						
						// EXIBE ALERTA
						Swal.fire({
							  icon: 'error',
							  title: 'O valor a ser subido não pode ser menor que a quantidade do saldo se o avanço for 100%',
							  text: 'Verifique e tente novamente'
						})
						
					}
					
				}
				
			} else{
				// SE NÃO
				$(obj).val("")
				// EXIBE ALERTA
				Swal.fire({
					  icon: 'error',
					  title: "As OP's: "+opSaldo+" estão pendente de subir saldo",
					  text: 'Verifique e tente novamente'
				})
				
			}
			
		} else {
			// SE NÃO
			$(obj).val("")
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: "Existem atividades das OP's: "+ops+" , que estão em aberto",
				  text: 'Verifique e tente novamente'
			})
			
		}
		
	} else {
		// SE NÃO
		
		console.log("não é um item pai")
		
			
			var saldoAux
			
			console.log("saldo: "+saldo)
			
			// SE SALDO TEM ","
			if(saldo.includes(",")){
				
				saldoAux = saldo
				saldoAux = saldoAux.toString().replace(",",".")
				
			}
			
			saldoAux = saldo
			
			saldoAux = parseFloat(saldoAux)
			
			console.log("saldoAux: "+saldoAux)
			
			var qtdeSaldo = $("#QTDSALDO___"+seq).val()
			
			// SE QTDE DO SALDO TEM ","
			if(qtdeSaldo.includes(",")){
				
				qtdeSaldo = qtdeSaldo.toString().replace(",",".")
				
			}
			
			qtdeSaldo = parseFloat(qtdeSaldo)
			
			console.log("qtdeSaldo: "+qtdeSaldo)
			
			// SE VAI FINALIZAR A OP
			if(saldoAux==qtdeSaldo){
				
				var avanco = $("#AVANCO___"+seq).val()
				
				if(!(avanco=="" || avanco==null || avanco==undefined)){
					
					avanco = parseInt(avanco)
					
				}
				
				// SE AVANÇO NÃO FOI INFORMADO OU ESTÁ COM VALOR 0
				if((avanco=="" || avanco==null || avanco==undefined) || (avanco==0 || avanco<100)){
					
					$(obj).val("")
					
					// EXIBE ALERTA
					Swal.fire({
						  icon: 'error',
						  title: 'Para subir o saldo restante da OP e finalizá-la é necessário informar o avanço total',
						  text: 'Verifique e tente novamente.'
					})
					
				} else {
					// SE NÃO
					
					console.log("avanco: "+avanco)
					
					if(avanco==100 || avancoAtual==100){
						
						// SE TEM ATIVIDADES ANTERIORES DA OP QUE AINDA NÃO FORAM APONTADAS
						if(temAtvAntSemApont(seq)){
							
							// LIMPA O CAMPO
							$(obj).val("")
							
							// EXIBE ALERTA
							Swal.fire({
								  icon: 'error',
								  title: 'Essa atividade não pode subir saldo restante pois ainda existem atividades da OP que não foram apontadas',
								  text: 'Verifique e tente novamente'
							})
							
						} else {
							
							// VERIFICA OS COMPONENTES PENDENTES DE TODAS AS OP'S
							var compPendentes = temCompPendentes(codColigada,codFilial,codOrdem,idAtvOrdem)
							
							// SE TEM COMPONENTES QUE ESTÃO PENDENTES DE LANÇAMENTOS
							if(!(compPendentes=="" || compPendentes==null || compPendentes==undefined)){
						
								// LIMPA O CAMPO
								$(obj).val("")
								
								// EXIBE ALERTA
								Swal.fire({
									  icon: 'error',
									  title: "Existem componentes vinculados a essa OP que não foram consumidos",
									  text: 'Verifique a baixa do(s) componente(s): '+compPendentes
								})
								
							}
							
						}
						
					}
					
				}
				
			}
			
			if(saldoAux>qtdeSaldo){
				
				$(obj).val("")
				
				// EXIBE ALERTA
				Swal.fire({
					  icon: 'error',
					  title: 'O valor a ser subido não pode ser maior que a quantidade do saldo',
					  text: 'Verifique e tente novamente'
				})
				
			}
			
			if(saldoAux<qtdeSaldo && avanco==100){
				
				$(obj).val("")
				
				// EXIBE ALERTA
				Swal.fire({
					  icon: 'error',
					  title: 'O valor a ser subido não pode ser menor que a quantidade do saldo se o avanço for 100%',
					  text: 'Verifique e tente novamente'
				})
				
			}
		
		//}
		
	}
			
}

// VERIFICA SE TEM COMPONENTES QUE ESTÃO PENDENTES DE SEREM CONSUMIDOS NA OP 
function temCompPendentes(codColigada,codFilial,codOrdem,idAtvOrdem){
	
	console.log("vou buscar se tem componentes que estão pendentes de serem consumidos para a OP "+codOrdem)
	console.log("codColigada: "+codColigada+", codFilial: "+codFilial+", idAtvOrdem: "+idAtvOrdem)

	var comp = ""
		
	var a1 = DatasetFactory.createConstraint("CODCOLIGADA", codColigada, codColigada, ConstraintType.MUST);
	var a2 = DatasetFactory.createConstraint("CODFILIAL", codFilial, codFilial, ConstraintType.MUST);
	var a3 = DatasetFactory.createConstraint("CODORDEM", codOrdem, codOrdem, ConstraintType.MUST);
	var a4 = DatasetFactory.createConstraint("IDATVORDEM", idAtvOrdem, idAtvOrdem, ConstraintType.MUST);
	
	var constraint = new Array(a1,a2,a3,a4);
	
	var dataset = DatasetFactory.getDataset("dsVerificaCompPendentes", null, constraint, null);
	var row = dataset.values;
	
	console.log("row")
	console.log(row)
	
	// SE RETORNO NÃO É NULO OU VAZIO
	if(!(row=="" || row==null || row==undefined)){
		
		var count = row.length
		
		// PERCORRE TODOS OS REGISTROS 
		for(var i=0; i<count;i++){
			
			var rep = row[i]
			
			// SE É O PRIMEIRO ITEM
			if(i==0){
				
				comp = rep["COMPONENTE"]
				
			} else {
				// SE NÃO
				
				// SE COMPONENTE NÃO FOI SALVO
				if(!(comp.includes(rep["COMPONENTE"]) ) ){
					
					comp = comp +", "+ rep["COMPONENTE"]
					
				}
			
			}
			
		}
		
	}
	
	console.log("comp: "+comp)
	
	return comp
	
}

// CRIA OS CAMPOS HORAS PRODUTIVAS
function criaCamposProdHoras(row){
	
	// PERCORRE TODOS OS REGISTROS DAS HORAS PRODUTIVAS
	for(var i=1; i<11;i++){
		
		var mySimpleCalendar12 = FLUIGC.calendar("#HORAINICIOATV"+i+"___"+row, {
			pickDate: false,
		    pickTime: true
		})
		var mySimpleCalendar13 = FLUIGC.calendar("#HORAFIMATV"+i+"___"+row, {
			pickDate: false,
		    pickTime: true
		})
		//$("#HORAINICIOATV"+i+"___"+row).prop("disabled",true)
		$("#HORAFIMATV"+i+"___"+row).prop("disabled",true)
		
		// SE NÃO É O PRIMEIRO ITEM
		if(!(i==1)){
			
			// ESCONDE A LINHA DO PERÍODO
			$("#HORAINICIOATV"+i+"___"+row).parent("div").parent("div").parent("div").hide()
			
		}else{
			
			$("#HORAINICIOATV"+i+"___"+row).parent("div").parent("div").parent("div").addClass("HPVISIVEL")

		}
		
	}
	
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
	
	$("#SEQCOMPGERAL___"+row).val(row)
	
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

// FAZ A CÓPIA DA ATIVIDADE
function copiarAtv(obj){
	
	var seq = $(obj).attr("id").split("___")[1]
	
	var row = addAtvCopia()
	
	var strHTML = "<tr style='display: table-row;' id='LINHAATV___"+row+"' detail='true' detailname='ATIVIDADES' class='linhaVermelha'> "
	
	strHTML = strHTML + $("#LINHAATV___"+row).html() + " </tr>"
	
	$("#LINHAATV___"+row).remove()
	$("#LINHAATV___"+seq).after(strHTML)
	
	var mySimpleCalendar2 = FLUIGC.calendar('#HORAINICIOATV___'+row, {
		pickDate: false,
	    pickTime: true
	})
	
	var mySimpleCalendar3 = FLUIGC.calendar('#HORAFIMATV___'+row, {
		pickDate: false,
	    pickTime: true
	})
	$("#HORAFIMATV___"+row).prop("disabled",true)
	
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
	// if($("#ULTIMAATVOP___"+seq).val()=="SIM"){
		
	// 	$("#QTDREALIZADA___"+row).prop("readonly",false)
		
	// } else {
		// SE NÃO, DESABILITA O CAMPO QTDEREALIZADA E ESCONDE O CHECKBOX
		
		$("#OPCONCLUIDA___"+row).parent("div").hide()
		$("#QTDREALIZADA___"+row).prop("readonly",true)
		
	//}
	
	// ESCONDE O BOTÃO DE EXCLUIR
	$("#EXCLUIRATV___"+row).show()
	
	// COPIA OS COMPONENTES DA ATIVIDADE
	copiaComponentes($("#SEQ___"+seq).val(),row)
	
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

// VERIFICA SE TODOS AS ATIVIDADES DAS ATIVIDADES ANTERIORES FORAM APONTADAS E SE TODOS OS COMPONENTES DELAS FORAM CONSUMIDOS
function verificaApontCompOP(obj){
	
	console.log("vou verificar se OP pode ser concluída")
	
	var seq = $(obj).attr("id").split("___")[1]
	
	var codColigada = $("#CODCOLIGADAATV___"+seq).val()
	var codFilial = $("#CODFILIALATV___"+seq).val()
	var codEstrutura = $("#CODESTRUTURAATV___"+seq).val()
	var idAtvOrdem = $("#IDATIVIDADE___"+seq).val()
	var codOrdem = $("#OP___"+seq).val()
	
	var faltaApont = false
	var faltaApontMP = false
	var ret = false
	
	// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
	var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
	var a4 = DatasetFactory.createConstraint("IDATVORDEM",idAtvOrdem,idAtvOrdem,ConstraintType.MUST)
	var a5 = DatasetFactory.createConstraint("CODESTRUTURA",codEstrutura,codEstrutura,ConstraintType.MUST)

	var constraints = new Array(a1,a2,a3,a4,a5)
	
	var dataset = DatasetFactory.getDataset("dsVerificaApontCompOP",null,constraints,null)
	var row = dataset.values
	
	console.log("row")
	console.log(row)
	
	// SE RETORNO NÃO É NULO OU VAZIO
	if(!(row=="" || row==null || row==undefined)){
		
		var count = row.length
		
		// PERCORRE TODOS OS REGISTROS DO DATASET
		for(var i=0; i<count; i++){
			
			var rep = row[i]
			
			// SE AINDA FALTA APONTAMENTO
			if(!(rep["FALTA_APONTAMENTO"]=="" || rep["FALTA_APONTAMENTO"]==null || rep["FALTA_APONTAMENTO"]==undefined)){
				
				faltaApont = true
				
			}
			
			// SE AINDA FALTA APONTAMENTO DA MP DAS ATIVIDADES ANTERIORES
			if(!(rep["FALTA_APONT_MP"]=="" || rep["FALTA_APONT_MP"]==null || rep["FALTA_APONT_MP"]==undefined)){
				
				faltaApontMP = true
				
			}

		}
		
	}
	
	// SE AINDA FALTA APONTAMENTO DAS ATIVIDADES DA OP
	if(faltaApont){
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'Essa OP não pode ser concluída pois ainda há atividades anteriores que não foram apontadas',
			  text: 'Verifique e tente novamente.'
		})
		
		$("#OPCONCLUIDA___"+seq).prop("checked",false)
		
	}
	
	// SE AINDA FALTA APONTAMENTO DAS MP'S DAS ATIVIDADES ANTERIORES DA OP
	if(faltaApontMP){
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'Essa OP não pode ser concluída pois ainda há componentes das atividades anteriores que não foram baixados',
			  text: 'Verifique e tente novamente.'
		})
		
		$("#OPCONCLUIDA___"+seq).prop("checked",false)
		
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

// LIMPA A TABELA DE ATIVIDADES
function limpaAtividades(){
	
	// PERCORRE A TABELA E LIMPA OS REGISTROS
	$("input[id^='CODIGOPRD___']").each(function(){
	
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
		
	var dataAux = dataDe.split("/")
	var dia = dataAux[0]
	var mes = dataAux[1]
	var ano = dataAux[2]
	
	console.log("dia: "+dia+", mes: "+mes+", ano: "+ano)
	
	var dataMax = new Date(ano,mes-1,dia)
	
	dataMax.setDate(dataMax.getDate() + 2)
	
	dataAte = geraDataAte(dataMax)
		
	// SE CAMPOS OBRIGATÓRIOS FORAM PREENCHIDOS
	if(!((codmo=="" || codmo==null || codmo==undefined) || (codFilial=="" || codFilial==null || codFilial==undefined)
			|| (dataDe=="" || dataDe==null || dataDe==undefined))){
		
		// LIMPA A TABELA DE ATIVIDADES
		limpaAtividades()
		
		// FORMATA A DATA PREENCHIDA NO PADRÃO PARA O BANCO
		dataDe = formataDataBanco(dataDe)
		dataAte = formataDataBanco(dataAte)

		console.log("codmo: "+codmo+", codFilial: "+codFilial+", dataDe: "+dataDe+", dataAte: "+dataAte)
		
		var myLoading2 = FLUIGC.loading(window);
	
		myLoading2.show();
	
		// INICIA A OPERAÇÃO DEPOIS DE CARREGAR O LOAD
		setTimeout(function(){
		
			// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
			var a1 = DatasetFactory.createConstraint("CODMO",codmo,codmo,ConstraintType.MUST)
			var a2 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
			//var a3 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
			var a4 = DatasetFactory.createConstraint("DATA_DE",dataDe,dataDe,ConstraintType.MUST)
			var a5 = DatasetFactory.createConstraint("DATA_ATE",dataAte,dataAte,ConstraintType.MUST)
			
			var constraints = new Array(a1,a2,a4,a5)
			
			var dataset = DatasetFactory.getDataset("dsBuscaHistAtvProgOperador",null,constraints,null)
			var row = dataset.values
			
			console.log("row")
			console.log(row)
			
			// SE RETORNO NÃO É NULO OU VAZIO
			if(!(row=="" || row==null || row==undefined || row=="null")){
				
				var count = row.length
				
				// PERCORRE TODOS OS REGISTROS DO RETORNO DA CONSULTA
				for(var i=0; i<count; i++){
					
					// ADICIONA UMA LINHA NA TABELA DE ATIVIDADES
					var seq = addAtv()
					var rep = row[i]
					
					// SALVA OS REGISTROS NOS CAMPOS DA TABELA 
					$("#CODCOLIGADAATV___"+seq).val(rep["CODCOLIGADA"])
					$("#CODFILIALATV___"+seq).val(rep["CODFILIAL"])
					$("#CODESTRUTURAATV___"+seq).val(rep["CODESTRUTURA"])
					$("#OSATV___"+seq).val(rep["OS"])
					$("#SEQ___"+seq).val(seq)
					$("#IDATVORDEMPROGRAMACAO___"+seq).val(rep["IDATVORDEMPROGRAMACAO"])
					$("#IDPRJATV___"+seq).val(rep["IDPRJ"])
					$("#DESCRICAO___"+seq).val(rep["DSCITEM"])
					$("#CODIGOPRD___"+seq).val(rep["CODIGOPRD"])
					$("#IDPRD___"+seq).val(rep["IDPRD"])
					$("#UNDOP___"+seq).val(rep["CODUNDCONTROLE"])
					$("#OP___"+seq).val(rep["OP"])
					$("#EXECUCAO___"+seq).val(rep["EXECUCAO"])
					
					// SE É UMA OP DE RETRABALHO
					if(parseInt(rep["RETRABALHO"])==1){
						
						$("#OPERACAO___"+seq).val(rep["VIEWPRIORIDADE"])
						
					} else {
						// SE NÃO
						
						$("#OPERACAO___"+seq).val(rep["PRIORIDADE"])
						
					}
					
					$("#DSCATIVIDADE___"+seq).val(rep["DSCATIVIDADE"])
					$("#CODATIVIDADE___"+seq).val(rep["CODATIVIDADE"])
					$("#CELULA___"+seq).val(rep["CELULA"])
					$("#DATAPROGRAMADA___"+seq).val(formataData(rep["DATA_PROGRAMADA"]))
					$("#PROCESSO___"+seq).val(rep["DETALHE"])
					$("#IDATIVIDADE___"+seq).val(rep["IDATVORDEM"])
					$("#AVANCOREALIZADO___"+seq).val(rep["AVANCO_REALIZADO"])
					$("#CUSTOPOSTO___"+seq).val(rep["CUSTO_POSTO"])
					$("#AVANCOATUALATV___"+seq).val(rep["AVANCO_ATUAL"])
					
					if(!(rep["APONTADO"]=="" || rep["APONTADO"]==null || rep["APONTADO"]==undefined || rep["APONTADO"]=="null")){
						$("#SALDOREALIZADO___"+seq).val(rep["APONTADO"].toString().replace(".",","))	
					}
					
					if(!(rep["TEM_APONTAMENTO"]=="" || rep["TEM_APONTAMENTO"]==null || rep["TEM_APONTAMENTO"]==undefined || rep["TEM_APONTAMENTO"]=="null")){
						$("#HORASAPONTADAS___"+seq).val(rep["TEM_APONTAMENTO"].toString().replace(".",","))	
					}
					
					if(!(rep["QTDEPLANEJADA"]=="" || rep["QTDEPLANEJADA"]==null || rep["QTDEPLANEJADA"]==undefined || rep["QTDEPLANEJADA"]=="null")){
						$("#QTDOP___"+seq).val(rep["QTDEPLANEJADA"].toString().replace(".",","))
					}
					
					if(!(rep["ALOCADO"]=="" || rep["ALOCADO"]==null || rep["ALOCADO"]==undefined || rep["ALOCADO"]=="null")){
						$("#SALDOPROGRAMADO___"+seq).val(rep["ALOCADO"].toString().replace(".",","))
					}
					
					if(!(rep["SALDO"]=="" || rep["SALDO"]==null || rep["SALDO"]==undefined || rep["SALDO"]=="null")){
						$("#QTDSALDO___"+seq).val(rep["SALDO"].toString().replace(".",","))
					}
					
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
					// if(rep["ATV_POSTERIOR"]=="ULTIMA" && (!(rep["RETRABALHO"]==1) || ( (rep["RETRABALHO"]==1) && (rep["ITEMAPONTADO"]=="ON" || rep["ITEMAPONTADO"]=="ON") ) ) ){
						
					// 	//$("#OPCONCLUIDA___"+seq).parent("div").show()
					// 	$("#QTDREALIZADA___"+seq).parent("div").show()
					// 	$("#QTDREALIZADA___"+seq).prop("readonly",false)
					// 	$("#AVANCO___"+seq).parent("div").show()
					// 	$("#AVANCO___"+seq).prop("readonly",false)
					// 	$("#ULTIMAATVOP___"+seq).val("SIM")
						
					// } else {
						// SE NÃO É A ULTIMA ATIVIDADE DA OP, ESCONDE O CHECKBOX E DESABILITA O CAMPO DA QTDE REALIZADA
						
						console.log("não é a ultima atividade da ordem, vou esconder checkbox")
						
						//$("#OPCONCLUIDA___"+seq).parent("div").hide()
						$("#QTDREALIZADA___"+seq).parent("div").hide()
						$("#QTDREALIZADA___"+seq).prop("readonly",true)
						$("#AVANCO___"+seq).parent("div").hide()
						$("#AVANCO___"+seq).prop("readonly",true)
						
						// SE APONTAMENTO JÁ FOI REALIZADO
						/*if(!(rep["APONTADO"]=="" || rep["APONTADO"]==null || rep["APONTADO"]==undefined || rep["APONTADO"]=="null")){
							
							console.log("tem apontamento, vou preencher as horas apontadas: "+rep["APONTADO"])
							
							var apontamento = rep["APONTADO"].toString().replace(".",",")
							
							console.log("após replace: "+apontamento+" e seq "+seq)
							
							$("#QTDREALIZADA___"+seq).val(apontamento)
							
						}*/
						
					//}
					
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
					//verificaApontAtv(seq,rep["TEM_APONTAMENTO"])
					
					// VERIFICA SE TODOS OS COMPONENTES VINCULADOS NA ATIVIDADE TEM SALDO
					//verificaComponentes(seq)
					
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
				
			} else {
			// SE NÃO
				
				myLoading2.hide();
				
				// EXIBE ALERTA
				Swal.fire({
					  icon: 'error',
					  title: 'Não foram localizados registros para serem apontados',
					  text: 'Verifique os filtros preenchidos e tente novamente.'
				})
			
			}
			
		},500)
		
		// DESATIVA O LOAD
		setTimeout(function(){
			
			myLoading2.hide();
			
		}, 500)
		
	} else {
		// SE NÃO
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'Os campos obrigatórios não foram preenchidos',
			  text: 'Verifique e tente novamente.'
		})
		
	}
	
}

// CALCULA O AVANÇO DA ATIVIDADE
function calculaNovoAvanco(obj){
	
	console.log("vou calcular o avanço")
	
	var seq = $(obj).attr("id").split("___")[1]
	
	var avanco = $("#AVANCO___"+seq).val()
	var saldo = $("#QTDREALIZADA___"+seq).val()
	var qtdeSaldo = $("#QTDSALDO___"+seq).val()

	if(!(avanco=="" || avanco==null || avanco==undefined)){
		
		avanco = parseInt(avanco)
		
	}
	
	if(!(saldo=="" || saldo==null || saldo==undefined)){
		
		saldo = parseInt(saldo)
		
	}
	
	if(!(qtdeSaldo=="" || qtdeSaldo==null || qtdeSaldo==undefined)){
		
		qtdeSaldo = parseInt(qtdeSaldo)
		
	}
	
	// SE AVANÇO FOI INFORMADO E É DIFERENTE DE 0
	if(!(avanco=="" || avanco==null || avanco==undefined) && !(avanco==0) ){
		
		// VAI ENCERRAR A OP
		if(avanco==100){
			
			// VERIFICA SE TODAS AS ATIVIDADES ANTERIORES DA OP FORAM APONTADAS
			
			
		}
		
	}
	
}

// CALCULA O AVANÇO DA ATIVIDADE
function calculaAvanco(obj){
	
	console.log("vou calcular o avanço")
	
	var seq = $(obj).attr("id").split("___")[1]
	
	var saldoRealizado = $("#SALDOREALIZADO___"+seq).val()
	var qtdeOP = $("#QTDOP___"+seq).val()
	var saldo = $(obj).val()
	
	var qtdeReal = $("#QTDREALIZADA___"+seq).val()
	
	if(saldo.toString().includes(",")){
		
		saldo = saldo.replace(",",".")

	}
	
	if(!(qtdeReal=="" || qtdeReal==undefined || qtdeReal==null)){
		
		if(qtdeReal.toString().includes(",")){
			
			qtdeReal = qtdeReal.replace(",",".")

		}
		
		qtdeReal = parseFloat(qtdeReal)
		
	} else {
		
		qtdeReal = 0
		
	}
	
	saldo = parseFloat(saldo)
	
	console.log("saldoRealizado: "+saldoRealizado+", qtdeOP: "+qtdeOP+", saldo: "+saldo+", qtdeReal: "+qtdeReal)
	
	// SE SALDO REALIZADO FOI PREENCHIDO E É UM VALOR NUMÉRICO VÁLIDO 
	//if(!(saldoRealizado=="" || saldoRealizado==null || saldoRealizado==undefined) && !(isNaN(saldoRealizado))){
	if(!(saldo=="" || saldo==null || saldo==undefined) && !(isNaN(saldo)) && (saldo>0 && saldo<=100)){
		
		/*if(saldoRealizado.toString().includes(",")){
			
			saldoRealizado = saldoRealizado.replace(",",".")
			
		}
		saldoRealizado = parseFloat(saldoRealizado)
		
		if(qtdeOP.toString().includes(",")){
			
			qtdeOP = qtdeOP.replace(",",".")
			
		}
		qtdeOP = parseFloat(qtdeOP)

		console.log("saldoRealizado: "+saldoRealizado+", qtdeOP: "+qtdeOP+", saldo: "+saldo)
		
		saldo = saldo + saldoRealizado
		
		var avanco = (saldo/qtdeOP) * 100
		
		avanco = avanco.toFixed(2)*/
		
		/*
		var codColigada = $("#CODCOLIGADAATV___"+seq).val()
		var codFilial = $("#CODFILIALATV___"+seq).val()
		var codOrdem = $("#OP___"+seq).val()
		var idAtvOrdem = $("#IDATIVIDADE___"+seq).val()
		
		// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
		var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST)
		var a2 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
		var a3 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
		var a4 = DatasetFactory.createConstraint("IDATVORDEM",idAtvOrdem,idAtvOrdem,ConstraintType.MUST)
		
		var constraints = new Array(a1,a2,a3,a4)
		
		var dataset = DatasetFactory.getDataset("dsInfoAtvOrdem",null,constraints,null)
		var row = dataset.values
		
		var rep = row[0]
		
		console.log("row")
		console.log(row)
		
		var qtdeAtv = parseFloat(rep["QUANTIDADE"])
		var qtdePrev = parseFloat(rep["QTPREVISTA"])
		
		console.log("qtdeAtv: "+qtdeAtv+", qtdePrev: "+qtdePrev)
		
		var avanco = ((qtdeAtv + saldo) * 100) / qtdePrev
		
		console.log("avanco: "+avanco)
		
		$("#AVANCO___"+seq).val(avanco)
		
		*/
		
		/*if(avanco>100){
			
			$("#AVANCO___"+seq).val(100)
			
		} else {
			
			$("#AVANCO___"+seq).val(avanco)
			
		}*/
		
		var saldoAux
		
		console.log("qtdeReal: "+qtdeReal)
		
		var qtdeSaldo = $("#QTDSALDO___"+seq).val()
		
		// SE QTDE DO SALDO TEM ","
		if(qtdeSaldo.includes(",")){
			
			qtdeSaldo = qtdeSaldo.toString().replace(",",".")
			
		}
		
		qtdeSaldo = parseFloat(qtdeSaldo)
		
		console.log("qtdeSaldo: "+qtdeSaldo)
		
		// SE VAI FINALIZAR A OP
		if(qtdeReal==qtdeSaldo){
		
			// SE O SALDO NÃO É 100
			if(!(saldo==100)){
				
				$("#QTDEAVANCO___"+seq).val(100)
				$("#AVANCO___"+seq).val("100")
				
				// EXIBE ALERTA
				Swal.fire({
					  icon: 'error',
					  title: 'O saldo informado irá concluir a OP, logo, o avanço precisa ser 100%',
					  text: 'Verifique e tente novamente.'
				}) 
				
			}
			
		}
		
	} else {
		// SE NÃO, INFORMA O ERRO AO USER
		//saldoRealizado = 0
		
		$("#QTDEAVANCO___"+seq).val("")
		$("#AVANCO___"+seq).val("")
		
		console.log("saldo: "+saldo)
		
		// SE SALDO FOI PREENCHIDO COM ALGUM VALOR
		if(!(saldo=="" || saldo==null || saldo==undefined)){
			
			console.log("vou exibir alerta")
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'O valor informado não é válido!',
				  text: 'Verifique e tente novamente.'
			}) 
			
		}
		
	}
	
}

// VERIFICA SE JÁ HOUVE APONTAMENTO PARA AS ATIVIDADES PROGRAMADAS
function verificaApontAtv(seq,temApontamento){
	
	// SE TEVE APONTAMENTO
	if(!(temApontamento==0)){
		
		$("#QTDREALIZADA___"+seq).prop("readonly",true)
		$("#SALDOTRABALHADO___"+seq).prop("readonly",true)
		$("#AVANCO___"+seq).prop("readonly",true)
		$("#OPCONCLUIDA___"+seq).prop("disabled",true)
		$("#QTDEAVANCO___"+seq).prop("readonly",true)
		$("#SALDOTRABALHADOTOTAL___"+seq).parent("div").hide()
		$("#BTADDHORAPROD___"+seq).parent("div").parent("div").hide()
		
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
    
	console.log("vou formatar no formato para o banco")
	
	// ARRAY PARA PEGAR A STRING APENAS DO VALOR DA DATA
	var arrayString = strData.toString().split(" ")
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
			
			// SE NÃO É UM PRODUTO SUBSTITUTO
			if(rep["IDPRD"]==rep["IDSUBSTITUTO"]){
				
				console.log("não é um item substituto")
				
				$("#IDPRDCOMPG___"+seqComp).val(rep["IDPRD"])
				
			} else {
				// SE NÃO
				
				console.log("é um item substituto")
				
				$("#IDPRDCOMPG___"+seqComp).val(rep["IDSUBSTITUTO"])
				$("#IDPRDORIGEM___"+seqComp).val(rep["IDPRD"])
				
			}
			
			$("#DESCRICAOCOMPG___"+seqComp).val(rep["DESCRICAO"])
			$("#CODIGOCOMPG___"+seqComp).val(rep["CODIGOPRD"])
			$("#UNDCOMPG___"+seqComp).val(rep["CODUNDCONTROLE"])
			//$("#QTDEUTG___"+seqComp).val()
			$("#SEQATV___"+seqComp).val(seq)
			$("#SEQCOMP___"+seqComp).val(i+1)
			$("#NUMLOTECOMPG___"+seqComp).val(rep["NUMLOTE"])
			$("#IDLOTECOMPG___"+seqComp).val(rep["IDLOTE"])
			$("#CUSTOMEDIOCOMPG___"+seqComp).val(rep["CUSTOMEDIO"])
			$("#STATUSLOTE___"+seqComp).val(rep["IDSTATUS"])
			$("#CODTB2FAT___"+seqComp).val(rep["CODTB2FAT"])
			
			
			/*if(!(rep["ESTOQUE_ALOCADO"]=="" || rep["ESTOQUE_ALOCADO"]==null || rep["ESTOQUE_ALOCADO"]==undefined || rep["ESTOQUE_ALOCADO"]=="null")){
				
				$("#QTDECOMPG___"+seqComp).val(rep["ESTOQUE_ALOCADO"].toString().replace(".",","))
			
			}*/
			
			if(rep["NUMLOTE"]=="" || rep["NUMLOTE"]==undefined || rep["NUMLOTE"]==null || rep["NUMLOTE"]=="null"){
				
				$("#NUMLOTECOMPG___"+seqComp).val("Sem Lote")
				
			}else{
				
				$("#NUMLOTECOMPG___"+seqComp).val(rep["NUMLOTE"])
				
			}
			
			if(!(rep["CONSUMO_PLANEJADO"]=="" || rep["CONSUMO_PLANEJADO"]==null || rep["CONSUMO_PLANEJADO"]==undefined || rep["CONSUMO_PLANEJADO"]=="null")){
				
				$("#QTDECOMPG___"+seqComp).val(rep["CONSUMO_PLANEJADO"].toString().replace(".",","))
			
			}
			
			if(!(rep["CONSUMO_SALDO"]=="" || rep["CONSUMO_SALDO"]==null || rep["CONSUMO_SALDO"]==undefined || rep["CONSUMO_PLANEJADO"]=="null")){
				
				$("#SALDOCOMPG___"+seqComp).val(rep["CONSUMO_SALDO"].toString().replace(".",","))
			
			}else{
				
				$("#SALDOCOMPG___"+seqComp).val(0)
				
			}
			
			/*if(!(rep["ESTOQUE_ATUAL"]=="" || rep["ESTOQUE_ATUAL"]==null || rep["ESTOQUE_ATUAL"]==undefined || rep["ESTOQUE_ATUAL"]=="null")){
				
				$("#ESTOOQUEATUALCOMPG___"+seqComp).val(rep["ESTOQUE_ATUAL"].toString().replace(".",","))
			
			}else {
				
				$("#ESTOOQUEATUALCOMPG___"+seqComp).val(0)
				
			}*/
			
			if(!(rep["DISPONIVEL"]=="" || rep["DISPONIVEL"]==null || rep["DISPONIVEL"]==undefined || rep["DISPONIVEL"]=="null")){
				
				$("#ESTOOQUEATUALCOMPG___"+seqComp).val(rep["DISPONIVEL"].toString().replace(".",","))
			
			}else {
				
				$("#ESTOOQUEATUALCOMPG___"+seqComp).val(0)
				
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
		// if(ultimaAtv=="SIM"){
			
		// 	$("#OPCONCLUIDA___"+seq).parent("div").show()
		// 	$("#QTDREALIZADA___"+seq).parent("div").show()
		// 	$("#QTDREALIZADA___"+seq).prop("readonly",false)
			
		// } else {
			// SE NÃO É A ULTIMA ATIVIDADE DA OP, ESCONDE O CHECKBOX E DESABILITA O CAMPO DA QTDE REALIZADA
			
			console.log("não é a ultima atividade da ordem, vou esconder checkbox")
			
			$("#OPCONCLUIDA___"+seq).parent("div").hide()
			$("#QTDREALIZADA___"+seq).parent("div").hide()
			$("#QTDREALIZADA___"+seq).prop("readonly",true)
			
		//}

	})
	
	// AJUSTA PARA EXIBIR AS HORAS QUE FORAM LANÇADAS
	ajustaHorasProd()
	
}

// AJUSTA PARA EXIBIR AS HORAS QUE FORAM LANÇADAS
function ajustaHorasProd(){
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='CODIGOPRD___']").each(function(){
	
		var seq = $(this).attr("id").split("___")[1]
		
		// PERCORRE TODOS OS REGISTROS  
		for(var i=1; i<11;i++){
			
			var saldoTrabalhado = $("#SALDOTRABALHADO"+i+"___"+seq).val()
			var tipo = $("#TIPO"+i+"___"+seq).val()
			
			// SE SALDO FOI CALCULADO OU TIPO FOI INFORMADO
			if(!(saldoTrabalhado=="" || saldoTrabalhado==null || saldoTrabalhado==undefined) || !(tipo=="" || tipo==null || tipo==undefined)){
				
				$("#TIPO"+i+"___"+seq).parent("div").parent("div").show()
				
			} else {
				// SE NÃO
				
				$("#TIPO"+i+"___"+seq).parent("div").parent("div").hide()
				
			}
				
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

// CARREGA TABELA DE HORAS PRODUTIVAS
function carregaHorasProd(seq){
	
	console.log("Entrei para carregar as horas Produtivas")
	
	var myLoading2 = FLUIGC.loading(window);
	
	myLoading2.show();
	
	// INICIA A OPERAÇÃO DEPOIS DE CARREGAR O LOAD
	setTimeout(function(){
			
		console.log("seq: "+seq)
		
		var strHTML = ""
		var achei = false
		
		// PERCORRE TODOS OS REGISTROS DA TABELA DE COMPONENTES GERAL
		$("input[id^='___']").each(function(){
			
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
/*function constroiCabecalhoTabela(){
	
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
				  
}*/

// CONSTROI O CABEÇALHO DA TABELA
function constroiCabecalhoTabela(){
	
	var strHTML = /*"<div class='table-responsive ScrollWrapper'> "+ 
                  "   <div style='width:120%'> "+*/
				  "		<table tablename='COMPONENTES' id='COMPONENTES' name='COMPONENTES' style='border:0' class='table table-bordered' nodeletebutton='true' noaddbutton='true'> "+
				  "	    	<thead> "+
				  "	        	<tr> "+
				  //"				<th class='form-group col-md-2'><label class='info'><strong>Descrição</strong></label></th> "+
				  //"					<th class='form-group' style='width:50%'><label class='info'><strong>Cód.</strong></label></th> "+
				 // "					<th class='form-group' style='width:25%'><label class='info'><strong>Lote</strong></label></th> "+
				 // "					<th class='form-group' style='width:15%'><label class='info'><strong>Und</strong></label></th> "+
				  //"				<th class='form-group col-md-1'><label class='info'><strong>Codloc</strong></label></th> "+
				  //"				<th class='form-group col-md-2'><label class='info'><strong>Est. Atual</strong></label></th> "+
				  //"				<th class='form-group col-md-2'><label class='info'><strong>Qtde</strong></label></th> "+
				 // "					<th class='form-group' style='width:30%'><label class='info'><strong>Qtde Util.</strong></label></th> "+
				  "	        	</tr> "+
				  "	    	</thead> "+
				  "	    	<tbody> "
	
	return strHTML
				  
}

//CONSTROI O CORPO DA TABELA
function constroiCorpoTabela(seqComp,seqLinha,seq){
	
	var strHTML = ""
	
	var comp = $("#COMP___"+seq).val()	
	var status = $("#STATUSLOTE___"+seqComp).val()
	var estoqueLote = $("#ESTOOQUEATUALCOMPG___"+seqComp).val()
	var saldoComp = $("#SALDOCOMPG___"+seqComp).val()
	
	if(estoqueLote.includes(",")){
		
		estoqueLote = estoqueLote.toString().replace(",",".")
		
	}
	
	if(saldoComp.includes(",")){
		
		saldoComp = saldoComp.toString().replace(",",".")
		
	}
	
	saldoComp = parseFloat(saldoComp)
	estoqueLote = parseFloat(estoqueLote)
	
	console.log("saldoComp: "+saldoComp)
	console.log("estoqueLote: "+estoqueLote)
	console.log("status: "+status)
	console.log("comp: "+comp)
	
	// SE COMPONENTES PRECISAM ESTAR DESABILITADOS
	if(comp=="D" || !(status=="6") /*|| (estoqueLote<saldoComp)*/){
		
		strHTML = strHTML +   "  <tr id='LINHAATV_"+seq+"___"+seqLinha+"' class='linhaVermelhaFina'> "+
		  "		<td> "+
		  "		 <div class='row form-group col-md-12'> "+
		  "		  <div class='form-group col-md-6'> "+
		  "		   <label class='info'>Código</label> "+
		  "		   <input type='text' class='form-control' id='CODIGOCOMP_"+seq+"___"+seqLinha+"' name='CODIGOCOMP_"+seq+"___"+seqLinha+"' value='"+$("#CODIGOCOMPG___"+seqComp).val()+"' readonly> "+
		  "		   </div> "+
		  "		  <div class='form-group col-md-6'> "+
		  "		   <label class='info'>Descrição</label> "+
		  "		   <input type='text' class='form-control' id='DESCCOMP_"+seq+"___"+seqLinha+"' name='DESCCOMP_"+seq+"___"+seqLinha+"' value='"+$("#DESCRICAOCOMPG___"+seqComp).val()+"' readonly> "+
		  "		   </div> "+
		  "      </div> "+
		  //"		</td> "+  
		  //"		<td> "+
		  "		 <div class='row form-group col-md-12 pb-15'> "+
		  "		  <div class='form-group col-md-6'> "+	
		  "		   <label class='info'>Lote</label> "+
		  "		   <input type='text' class='form-control' id='LOTECOMP_"+seq+"___"+seqLinha+"' name='LOTECOMP_"+seq+"___"+seqLinha+"' value='"+$("#NUMLOTECOMPG___"+seqComp).val()+"' readonly> "+
		  //"		</td> "+
		  //"		<td> "+
		  "		</div> "+
		  "		  <div class='form-group col-md-3'> "+
		  "		   <label class='info'>Und</label> "+
		  "		   <input type='text' class='form-control' id='UNDCOMP_"+seq+"___"+seqLinha+"' name='UNDCOMP_"+seq+"___"+seqLinha+"' value='"+$("#UNDCOMPG___"+seqComp).val()+"' readonly> "+
		  //"		</td> "+
		  //"		<td> "+
		  "		</div> "+
		  "		  <div class='form-group col-md-3'> "+	
		  "		   <label class='info'>Qtd Ut</label> "+
		  "		   <input type='text' class='form-control' id='QTDEUTILCOMP_"+seq+"___"+seqLinha+"' name='QTDEUTILCOMP_"+seq+"___"+seqLinha+"' value='"+$("#QTDEUTG___"+seqComp).val()+"' onchange='salvaQtdeUtilComp(this)' onclick='exibeAlertaLote(this)' readonly> "+
		  "		   <input type='hidden' class='form-control' id='ESTOQUEATUALCOMP_"+seq+"___"+seqLinha+"' name='ESTOQUEATUALCOMP_"+seq+"___"+seqLinha+"' value='"+$("#ESTOOQUEATUALCOMPG___"+seqComp).val()+"' readonly> "+
		  "		   <input type='hidden' class='form-control' id='SALDOATUALCOMP_"+seq+"___"+seqLinha+"' name='SALDOATUALCOMP_"+seq+"___"+seqLinha+"' value='"+$("#SALDOCOMPG___"+seqComp).val()+"' readonly> "+
		  "		   <input type='hidden' class='form-control' id='QTDECOMP_"+seq+"___"+seqLinha+"' name='QTDECOMP_"+seq+"___"+seqLinha+"' value='"+$("#QTDECOMPG___"+seqComp).val()+"' readonly> "+
		  "		   <input type='hidden' class='form-control' id='IDPRDORIGEMCOMP_"+seq+"___"+seqLinha+"' name='IDPRDORIGEMCOMP_"+seq+"___"+seqLinha+"' value='"+$("#IDPRDORIGEM___"+seqComp).val()+"' readonly> "+
		  "        <input type='hidden' class='form-control' id='CODTB2FAT_"+seq+"___"+seqLinha+"' name='CODTB2FAT_"+seq+"___"+seqLinha+"' value='"+$("#CODTB2FAT___"+seqComp).val()+"' readonly> "+
		  "		   </div></div> "+
		  "	    </td> "+
		  "	 </tr> "
		
	}else{
		// SE NÃO, PODEM SER LANÇADOS
		
		strHTML = strHTML +   "  <tr id='LINHAATV_"+seq+"___"+seqLinha+"' class='linhaVermelhaFina'> "+
		  "		<td> "+
		  "		 <div class='row form-group col-md-12'> "+
		  "		  <div class='form-group col-md-6'> "+	
		  "		   <label class='info'>Código</label> "+
		  "		   <input type='text' class='form-control' id='CODIGOCOMP_"+seq+"___"+seqLinha+"' name='CODIGOCOMP_"+seq+"___"+seqLinha+"' value='"+$("#CODIGOCOMPG___"+seqComp).val()+"' readonly> "+
		  "		   </div> "+
		  "		  <div class='form-group col-md-6'> "+
		  "		   <label class='info'>Descrição</label> "+
		  "		   <input type='text' class='form-control' id='DESCCOMP_"+seq+"___"+seqLinha+"' name='DESCCOMP_"+seq+"___"+seqLinha+"' value='"+$("#DESCRICAOCOMPG___"+seqComp).val()+"' readonly> "+
		  "		   </div> "+
		  "      </div> "+
		  //"		</td> "+
		  //"		<td> "+
		  "		 <div class='row form-group col-md-12 pb-15'> "+
		  "		  <div class='form-group col-md-6'> "+	
		  "		   <label class='info'>Lote</label> "+
		  "		   <input type='text' class='form-control' id='LOTECOMP_"+seq+"___"+seqLinha+"' name='LOTECOMP_"+seq+"___"+seqLinha+"' value='"+$("#NUMLOTECOMPG___"+seqComp).val()+"' readonly> "+
		  //"		</td> "+
		  //"		<td> "+
		  "		</div> "+
		  "		  <div class='form-group col-md-3'> "+	
		  "		   <label class='info'>Und</label> "+
		  "		   <input type='text' class='form-control' id='UNDCOMP_"+seq+"___"+seqLinha+"' name='UNDCOMP_"+seq+"___"+seqLinha+"' value='"+$("#UNDCOMPG___"+seqComp).val()+"' readonly> "+
		  //"		</td> "+
		  //"		<td> "+
		  "		</div> "+
		  "		  <div class='form-group col-md-3'> "+	
		  "		   <label class='info'>Qtd Ut</label> "+
		  "		   <input type='text' class='form-control' id='QTDEUTILCOMP_"+seq+"___"+seqLinha+"' name='QTDEUTILCOMP_"+seq+"___"+seqLinha+"' value='"+$("#QTDEUTG___"+seqComp).val()+"' onchange='salvaQtdeUtilComp(this)'> "+
		  "		   <input type='hidden' class='form-control' id='SALDOATUALCOMP_"+seq+"___"+seqLinha+"' name='SALDOATUALCOMP_"+seq+"___"+seqLinha+"' value='"+$("#SALDOCOMPG___"+seqComp).val()+"' readonly> "+
		  "		   <input type='hidden' class='form-control' id='ESTOQUEATUALCOMP_"+seq+"___"+seqLinha+"' name='ESTOQUEATUALCOMP_"+seq+"___"+seqLinha+"' value='"+$("#ESTOOQUEATUALCOMPG___"+seqComp).val()+"' readonly> "+
		  "		   <input type='hidden' class='form-control' id='QTDECOMP_"+seq+"___"+seqLinha+"' name='QTDECOMP_"+seq+"___"+seqLinha+"' value='"+$("#QTDECOMPG___"+seqComp).val()+"' readonly> "+
		  "		   <input type='hidden' class='form-control' id='IDPRDORIGEMCOMP_"+seq+"___"+seqLinha+"' name='IDPRDORIGEMCOMP_"+seq+"___"+seqLinha+"' value='"+$("#IDPRDORIGEM___"+seqComp).val()+"' readonly> "+
		  "        <input type='hidden' class='form-control' id='CODTB2FAT_"+seq+"___"+seqLinha+"' name='CODTB2FAT_"+seq+"___"+seqLinha+"' value='"+$("#CODTB2FAT___"+seqComp).val()+"' readonly> "+
		  "		   </div></div> "+
		  "	    </td> "+
		  "	 </tr> "
		
	}
	
    return strHTML
    
}

// EXIBE ALERTA PARA O LOTE
function exibeAlertaLote(obj){
	
	// EXIBE ALERTA
	Swal.fire({
		  icon: 'error',
		  title: 'Este lote não está liberado!',
		  text: 'Verifique e tente novamente'
	})
	
}

// VERIFICA SE TEM ATIVIDADES QUE SEJAM ÚLTIMA DA OP E NÃO TEM SALDO
function temAtvSemSaldo(){
	
	var ret = false
	
	console.log("verifica se tem atividades que sejam última da OP e não tem saldo")
	
	// PERCORRE TODOS OS REGISTROS DA TABELA DE APONTAMENTO
	$("input[id^='CODIGOPRD___']").each(function(){
		  		
		var seq = $(this).attr("id").split("___")[1]
		
		var subirSaldo = $("#QTDREALIZADA___"+seq).val()
		var ultimaAtv = $("#ULTIMAATVOP___"+seq).val()
		
		console.log("estou no item "+seq)
		
		// SE É ULTIMA ATIVIDADE DA OP
		if(ultimaAtv=="ULTIMA"){
			
			// SE SALDO PARA SUBIR NÃO FOI INFORMADO
			if(subirSaldo=="" || subirSaldo==null || subirSaldo==undefined){
				
				ret = true
				
			}
			
		}
		
	})

	return ret
	
}

// CONSTROI O CORPO DA TABELA
/*function constroiCorpoTabela(seqComp,seqLinha,seq){
	
	var strHTML = ""
	
	var comp = $("#COMP___"+seq).val()	
		
	console.log("comp: "+comp)
	
	
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
	
    return strHTML
    
}*/


// TERMINA O FINAL DA TABELA
function constroiFinalTabela(){
	
	var strHTML = "	    </tbody> "+
				  "   </table> "+
				  "  </div> "+
				  "</div> "
	
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

// VERIFICA SE OS COMPONENTES DA ATIVIDADE FORAM APONTADOS DE ACORDO COM AS REGRAS
function verificaCompApontados(codOrdem,idprd,codigoPrd,seq,consumoPlanejado,saldo){
	
	console.log("verifica se o componente da atividade foi apontado de acordo com as regras")
	
	var qtde = 0
	var ops = ""
	var tem = false
	var comps = ""
		
	// PERCORRE A TABELA DE TODOS OS COMPONENTES
	$("input[id^='CODIGOPRD___']").each(function(){
	
		var seq = $(this).attr("id").split("___")[1]
		
		console.log("seq: "+seq)
		
		var ultimaAtvOP = $("#ULTIMAATVOP___"+seq).val()
		
		// SE É A ÚLTIMA ATIVIDADE DA OP
		if(ultimaAtvOP=="SIM"){
			
			var qtdeSaldo = $("#QTDESALDO___"+seq).val()
			var qtdeRealizada = $("#QTDREALIZADA___"+seq).val()
			var codOrdem = $("#OP___"+seq).val()
			var idAtvOrdem = $("#IDATIVIDADE___"+seq).val()
			
			// PREPARAR PARA FAZER O PARSE DA QUANTIDADE
			if(qtdeSaldo.includes(",")){
				
				qtdeSaldo = qtdeSaldo.replace(",",".")
				
			}
			
			// PREPARAR PARA FAZER O PARSE DA QUANTIDADE
			if(qtdeRealizada.includes(",")){
				
				qtdeRealizada = qtdeRealizada.replace(",",".")
				
			}
			
			qtdeSaldo = parseFloat(qtdeSaldo)
			qtdeRealizada = parseFloat(qtdeRealizada)
			
			// SE A OP SERÁ FINALIZADA
			if(qtdeSaldo==qtdeRealizada){
				
				console.log("tem OP que irá subir saldo e finalizar a mesma")
				
				// BUSCA OS COMPONENTES QUE JÁ FORAM CONSUMIDOS NA ATIVIDADE E SOMA COM O COMPONENTE QUE ESTÁ SENDO CONSUMIDO
				comps = buscaCompAtvOP(seq,1)
				
				// SE RETORNO NÃO É NULO OU VAZIO
				if(!(comps=="" || comps==null || comps==undefined)){
					
					ops = ops + " "+codOrdem+", "
					
				}
				
			} /*else {
				// SE NÃO
				
				console.log("tem OP que irá subir saldo parcial")
				
				// BUSCA OS COMPONENTES CONSUMIDOS DA ATIVIDADE E SOMA COM O COMPONENTE QUE ESTÁ SENDO CONSUMIDO
				comps = buscaCompAtvOP(seq,2)
				
				// SE RETORNO NÃO É NULO OU VAZIO
				if(!(comps=="" || comps==null || comps==undefined)){
					
					ops = ops + " "+codOrdem+","
					
				}
				
			}*/
			
		}
		
	})
	
	console.log("ops: "+ops)
	
	// SE NÃO ENCONTROU OP'S QUE IRÃO SUBIR SALDO SEM PENDÊNCIAS
	if(ops=="" || ops==null || ops==undefined){
		
		// PERCORRE A TABELA DE TODOS OS COMPONENTES
		/*$("input[id^='CODIGOCOMPG___']").each(function(){
			
			var seqComp = $(this).attr("id").split("___")[1]
			var seqAtv = $("#SEQATV___"+seqComp).val()
			var codigoComp = $("#CODIGOCOMPG___"+seqComp).val()
			var idprdComp = $("#IDPRDCOMPG___"+seqComp).val()
			var idprdPrincipal = $("#IDPRDPRINCIPALCOMPG___"+seqComp).val()
			var qtdeUt = $("#QTDEUTG___"+seqComp).val()
			
			if(!(qtdeUt=="" || qtdeUt==null || qtde==undefined)){
				
				qtdeUt = parseFloat(qtdeUt)

			}
			
			var codAux = codigoComp.toString().substring(0,6)
			console.log("codAux: "+codAux)
			
			console.log("codigoComp: "+codigoComp+", codigoPrd: "+codigoPrd+", idprdPrincipal: "+idprdPrincipal+", idprd: "+idprd+", idprdComp: "+idprdComp+", seq: "+seq+", seqAtv: "+seqAtv+", qtdeUt: "+qtdeUt)
			
			if((idprdPrincipal==idprd || idprdComp==idprd) && seq==seqAtv && !(qtdeUt=="" || qtdeUt==null || qtdeUt==undefined)){
				
				console.log("é o mesmo componente da mesma atividade e teve qtde informada")
				
				// SE O CÓDIGO DA MP É DIFERENTE DE UMA DAS INCIAIS ABAIXO 
				if(!(codAux=="01.018" ||  codAux=="01.051") && !(codAux=="03.023" || codAux=="04.024")){
				
					console.log("é diferente de '01.018' ou '01.019' ou '01.053 ou 01.051'")
					
					tem = true
					qtde = qtde + qtdeUt	
					
				}
				
			}
			
		})
		
		// || codAux=="01.019" | codAux=="01.053" ||
		
		console.log("qtde: "+qtde+" e tem: "+tem)

		// SE QUANTIDADE UTILIZADA DE ALGUNS DOS ITENS FOI LANÇADA
		if(qtde>0 && tem){
			
			console.log("qtde: "+qtde+", consumoPlanejado: "+consumoPlanejado)
			
			console.log("vou verificar")
			
			// SE A QUANTIDADE NÃO É O QUE FOI PREVISTO
			//if(!(qtde==consumoPlanejado)){
			if(!(qtde==consumoPlanejado)){
				
				console.log("tem um componente diferente de '01.018' ou '01.019' ou '01.053' e qtde apontada é diferente da prevista")
				
				ops = ops + " a OP "+codOrdem+" possui componente "+codigoPrd+" ou seu(s) substituto(s) com quantidade abaixo da prevista, "
				
			}
			
		} else if(qtde==0 && tem){
			
			ops = ops + " a OP "+codOrdem+" possui componente "+codigoPrd+" ou seu(s) substituto(s) com quantidade abaixo da prevista, "
			
		}*/
			
		var qtde2 = 0
		var tem2 = false
		
		// PERCORRE A TABELA DE TODOS OS COMPONENTES
		$("input[id^='CODIGOCOMPG___']").each(function(){
			
			var seqComp = $(this).attr("id").split("___")[1]
			var seqAtv = $("#SEQATV___"+seqComp).val()
			var codigoComp = $("#CODIGOCOMPG___"+seqComp).val()
			var idprdComp = $("#IDPRDCOMPG___"+seqComp).val()
			var idprdPrincipal = $("#IDPRDPRINCIPALCOMPG___"+seqComp).val()
			var qtdeUt = $("#QTDEUTG___"+seqComp).val()
			
			if(!(qtdeUt=="" || qtdeUt==null || qtde==undefined)){
				
				qtdeUt = parseFloat(qtdeUt)

			}else{
				
				qtdeUt = 0
				
			}
			
			var codAux = codigoComp.toString().substring(0,6)

			console.log("codAux: "+codAux)
			
			console.log("codigoComp: "+codigoComp+", codigoPrd: "+codigoPrd+", idprdPrincipal: "+idprdPrincipal+", idprd: "+idprd+", idprdComp: "+idprdComp+", seq: "+seq+", seqAtv: "+seqAtv+", qtdeUt: "+qtdeUt)

			if((idprdPrincipal==idprd || idprdComp==idprd) && seq==seqAtv){

				console.log("é o mesmo componente da mesma atividade")

				// SE O CÓDIGO DA MP TEM UMA DAS INCIAIS ABAIXO
				if(codAux=="01.019" || codAux=="01.053"){
					
					console.log("é '01.019' ou '01.053'")
					
					tem2 = true
					
					qtde2 = qtde2 + qtdeUt
					
				}
				
			}
			
		})
		
		console.log("qtde2: "+qtde2+", tem2: "+tem2)

		// SE QUANTIDADE UTILIZADA DE ALGUNS DOS ITENS FOI LANÇADA
		if(qtde2==0 && tem2){
			
			console.log("tem um componente '01.019' ou '01.053' e não teve qtde apontada")
			
			//ops = ops + " a OP "+codOrdem+" possui componente "+codigoPrd+" ou seu(s) substituto(s) com quantidade 0, "
			ops = ops + " "+codOrdem+", "
			
		}
		
		// SE SALDO AINDA É MAIOR QUE 0
		if(saldo>0){
			
			console.log("saldo é maior que 0")
			
			var qtde3 = 0
			var tem3 = false
			
			// PERCORRE A TABELA DE TODOS OS COMPONENTES
			$("input[id^='CODIGOCOMPG___']").each(function(){
				
				var seqComp = $(this).attr("id").split("___")[1]
				var seqAtv = $("#SEQATV___"+seqComp).val()
				var codigoComp = $("#CODIGOCOMPG___"+seqComp).val()
				var idprdComp = $("#IDPRDCOMPG___"+seqComp).val()
				var idprdPrincipal = $("#IDPRDPRINCIPALCOMPG___"+seqComp).val()
				var qtdeUt = $("#QTDEUTG___"+seqComp).val()
				
				if(!(qtdeUt=="" || qtdeUt==null || qtde==undefined)){
					
					qtdeUt = parseFloat(qtdeUt)

				}else{
					
					qtdeUt = 0
					
				}
				
				var codAux = codigoComp.toString().substring(0,6)
				console.log("codAux: "+codAux)
				
				console.log("codigoComp: "+codigoComp+", codigoPrd: "+codigoPrd+", idprdPrincipal: "+idprdPrincipal+", idprd: "+idprd+", idprdComp: "+idprdComp+", seq: "+seq+", seqAtv: "+seqAtv+", qtdeUt: "+qtdeUt)

				if((idprdPrincipal==idprd || idprdComp==idprd) && seq==seqAtv){
					
					console.log("é o mesmo componente da mesma atividade")

					// SE O CÓDIGO DA MP TEM UMA DAS INICIAIS ABAIXO
					if(codAux=="01.018" || codAux=="01.051" || codAux=="01.052"){
						
						console.log("componente tem inicial "+codAux)

						tem3 = true
						
						qtde3 = qtde3 + qtdeUt
						
					}
					
				}
				
			})
			
			console.log("qtde3: "+qtde3+", tem3: "+tem3)

			// SE QUANTIDADE UTILIZADA DE ALGUNS DOS ITENS NÃO FOI LANÇADA
			if(qtde3==0 && tem3){
				
				console.log("tem um componente com inicial '01.018' ou '01.051' ou '01.052' e não teve qtde apontada, mesmo saldo apontado ainda maior que 0")
				
				//ops = ops + " a OP "+codOrdem+" possui componente "+codigoPrd+" ou seu(s) substituto(s) com quantidade 0, "
				ops = ops + " "+codOrdem+", "
				
			} else{
				
				// SE A QUANTIDADE NÃO É O QUE FOI PREVISTO
				//if(tem3 && !(qtde3==consumoPlanejado)){
				if(tem3 && qtde3>saldo){
					
					console.log("tem um componente com inicial '01.018' ou '01.051' e qtde apontada é diferente da prevista")
					
					//ops = ops + " a OP "+codOrdem+" possui componente "+codigoPrd+" ou seu(s) substituto(s) com quantidade diferente da prevista, "
					ops = ops + " "+codOrdem+", "
					
				}
				
			}
			
			/*var qtde4 = 0
			var tem4 = false
			
			// PERCORRE A TABELA DE TODOS OS COMPONENTES
			$("input[id^='CODIGOCOMPG___']").each(function(){
				
				var seqComp = $(this).attr("id").split("___")[1]
				var seqAtv = $("#SEQATV___"+seqComp).val()
				var codigoComp = $("#CODIGOCOMPG___"+seqComp).val()
				var idprdComp = $("#IDPRDCOMPG___"+seqComp).val()
				var idprdPrincipal = $("#IDPRDPRINCIPALCOMPG___"+seqComp).val()
				var qtdeUt = $("#QTDEUTG___"+seqComp).val()
				
				if(!(qtdeUt=="" || qtdeUt==null || qtde==undefined)){
					
					qtdeUt = parseFloat(qtdeUt)

				}
				
				var codAux = codigoComp.toString().substring(0,6)
				console.log("codAux: "+codAux)
				
				console.log("codigoComp: "+codigoComp+", codigoPrd: "+codigoPrd+", idprdPrincipal: "+idprdPrincipal+", idprd: "+idprd+", idprdComp: "+idprdComp+", seq: "+seq+", seqAtv: "+seqAtv+", qtdeUt: "+qtdeUt)
				
				if((idprdPrincipal==idprd || idprdComp==idprd) && seq==seqAtv){
					
					console.log("é o mesmo componente da mesma atividade e teve qtde informada")
					
					// SE O CÓDIGO DA MP É IGUAL A UMA DAS INCIAIS ABAIXO
					if(codAux=="03.023" || codAux=="04.024"){
					
						console.log("é igual a '03.023' ou '04.024' ")
						
						tem4 = true
						
						if(!(qtdeUt=="" || qtdeUt==null || qtdeUt==undefined)){
							
							qtde4 = qtde4 + qtdeUt	
						
						}
						
					}
					
				}
				
			})
			
			console.log("qtde4: "+qtde4+" e tem: "+tem4)

			console.log("vou verificar")
			
			// SE TEM COMPONENTE 
			if(qtde4==0 && tem4){
				
				console.log("tem um componente diferente de '04.024' ou '03.023' e qtde apontada é diferente da prevista")
				
				//ops = ops + " a OP "+codOrdem+" possui componente "+codigoPrd+" ou seu(s) substituto(s) com quantidade abaixo da prevista, "
				ops = ops + " "+codOrdem+", "
				
			} else{
				
				// SE A QUANTIDADE NÃO É O QUE FOI PREVISTO
				//if(tem4 && !(qtde4==consumoPlanejado)){
				//if(tem4 && !(qtde4==saldo)){
				if(tem4 && qtde4>saldo){
					
					console.log("tem um componente igual a '03.023' ou '04.024")
					
					//ops = ops + " a OP "+codOrdem+" possui componente "+codigoPrd+" ou seu(s) substituto(s) com quantidade diferente da prevista, "
					ops = ops + " "+codOrdem+", "
					
				}
				
			}*/
			
		}
				
		console.log("Ops: "+ops)
		
		return ops 
		
	} else {
		// SE NÃO
		
		console.log("Ops: "+ops)
		
		return ops
		
	}
	
}

// VERIFICA SE TODOS OS APONTAMENTOS ATENDEM AS REGRAS
function verificaApontamentos(){
	
	console.log("verifica se todos os apontamentos que foram lançados atendem as regras")
	
	var compApont = new Array()
	var ret = true
	var ops = ""
		
	// PERCORRE TODAS AS ATIVIDADES
	$("input[id^='CODIGOPRD___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var saldoTrab = $("#SALDOTRABALHADOTOTAL___"+seq).val()
		saldoTrab = parseFloat(saldoTrab)
		var avanco = $("#AVANCO___"+seq).val()
		var temLancamento = false
		var saldoTotal = 0
		var temDiferente = false
		
		console.log("saldoTrab: "+saldoTrab+", avanco: "+avanco)
		
		// SE SALDO TRABALHADO FOI INFORMADO
		if(!(saldoTrab=="" || saldoTrab==null || saldoTrab==undefined || saldoTrab==0 || saldoTrab=="0" || isNaN(saldoTrab) || saldoTrab=="NaN") /*&& !(avanco=="" || avanco==null || avanco==undefined)*/){
			 
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
		 	//var dataset = DatasetFactory.getDataset("dsComponentesAtvOS",null,constraints,null);
		 	
		 	var dataset = DatasetFactory.getDataset("dsCompAtvApontOS",null,constraints,null);
		 	var row = dataset.values
		 	
		 	console.log("row: ")
		 	console.log(row)
		 	
		 	// SE RETORNO NÃO É NULO OU VAZIO
		 	if(!(row=="" || row==null || row==undefined)){
		 		
		 		var count = row.length
		 		
		 		// PERCORRE TODOS OS COMPONENTES DA ATIVIDADE
		 		for(var i=0;i<count;i++){
		 			
		 			var rep = row[i]
		 			
		 			var codigoPrd = rep["CODIGOPRD"]
		 			var idprd = rep["IDPRD"]
		 			var consumoPlanejado = rep["CONSUMO_PLANEJADO"]
			 		var saldo = rep["CONSUMO_SALDO"]
		 			var opsAux = ""
					var codtb2fat = rep["CODTB2FAT"]
		 			
					saldo = Number(saldo)
					consumoPlanejado = Number(consumoPlanejado)
					
					if(codtb2fat!="0184" && codigoPrd.substr(0,6)!="03.023" && codtb2fat!="0185"){

						temDiferente = true
						
					}
		 			
		 			console.log("saldo: "+saldo)
					console.log("saldoTotal: "+saldoTotal)
		 				
		 			// VERIFICA SE OS COMPONENTES DA ATIVIDADE FORAM APONTADOS DE ACORDO COM AS REGRAS
		 			//opsAux = verificaCompApontados(codOrdem,idprd,codigoPrd,seq,consumoPlanejado,saldo)	
		 			
		 			// SE SALDO É MAIOR QUE 0
		 			if((saldo>0 && codtb2fat!="0184") || (saldo==consumoPlanejado && codtb2fat=="0184" )){
		 				
		 				// SE PRODUTO POSSUI UMA DAS INICIAS
		 				if(codigoPrd.substr(0,6)=="01.018" || codigoPrd.substr(0,6)=="01.051" || codigoPrd.substr(0,6)=="01.052"){ 
			 			//	|| codigoPrd.substr(0,6)=="03.023" || codigoPrd.substr(0,6)=="04.024"){
			 				
			 				console.log("produto tem inicial "+codigoPrd.substr(0,6))
			 				
			 				// SE TEM AO MENOS UM LANÇAMENTO DO PRODUTO PARA A ATIVIDADE
				 			if(temLancamentoComp(codOrdem,idprd,codigoPrd.substr(0,6),seq,consumoPlanejado,saldo)){
				 				
				 				temLancamento = true
				 				
				 			}

							if(codtb2fat!="0184" && codtb2fat!="0185"){

								console.log("vou considerar produto "+codigoPrd)
								saldoTotal = saldoTotal + saldo
		
							}
			 				
			 			}
		 				
		 			} 
		 				
		 			
		 		}

				console.log("Tem lancamento: " +temLancamento)
				console.log("saldoTotal: "+saldoTotal)
				console.log("tem diferente: " + temDiferente)
		 		
		 		// SE NÃO TEVE LANÇAMENTO E TINHA SALDO A SER CONSUMIDO
	 			if(!temLancamento && saldoTotal>0 && temDiferente){
	 				
	 				console.log("não teve lançamento")
	 				
	 				if(!(ops.includes(codOrdem))){
		 				
		 				ops = ops + codOrdem
		 				
		 			}
	 				
	 			}
		 		
		 	}
		 	
		}
		
	})
	
	return ops
	
}

// SE TEM AO MENOS UM LANÇAMENTO DO PRODUTO PARA A ATIVIDADE
function temLancamentoComp(codOrdem,idprd,codigoPrd,seqAtv,consumoPlanejado,saldo){
	
	console.log("vou verificar se tem ao menos um lançamento do produto para a atividade")
	
	var ret = false
	
	// PERCORRE TODOS OS LANÇAMENTOS DE COMPONENTES
	$("input[id^='CODIGOCOMPG___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var codigoPrdAux = $("#CODIGOCOMPG___"+seq).val()
		var seqAtvAux = $("#SEQATV___"+seq).val()
		var qtdeUtAux = $("#QTDEUTG___"+seq).val()
		
		// SE QTDE UTILIZADA FOI INFORMADA E É O MESMO COMPONENTE E ATIVIDADE
		if(!(qtdeUtAux=="" || qtdeUtAux==null || qtdeUtAux==undefined || qtdeUtAux==0 || qtdeUtAux=="0") && codigoPrd==codigoPrdAux.substr(0,6) && seqAtv==seqAtvAux){
			
			ret = true
			
		}
		
	})
	
	console.log("tem ao menos um lançamento do produto para a atividade? "+ret)
	
	return ret
	
}

// VERIFICA SE TODOS OS APONTAMENTOS ATENDEM AS REGRAS
function verificaApontamentos(){
	
	console.log("verifica se todos os apontamentos que foram lançados atendem as regras")
	
	var compApont = new Array()
	var ret = true
	var ops = ""
		
	// PERCORRE TODAS AS ATIVIDADES
	/*$("input[id^='CODIGOPRD___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var saldoTrab = $("#SALDOTRABALHADOTOTAL___"+seq).val()
		var avanco = $("#AVANCO___"+seq).val()
		
		console.log("saldoTrab: "+saldoTrab+", avanco: "+avanco)
		
		// SE SALDO TRABALHADO OU AVANCO FORAM INFORMADOS
		//if(!(saldoTrab=="" || saldoTrab==null || saldoTrab==undefined) && !(avanco=="" || avanco==null || avanco==undefined)){
		if( !(saldoTrab=="" || saldoTrab==null || saldoTrab==undefined) ){
				 
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
		 	//var dataset = DatasetFactory.getDataset("dsComponentesAtvOS",null,constraints,null);
		 	
		 	var dataset = DatasetFactory.getDataset("dsCompAtvApontOS",null,constraints,null);
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
		 				if(codigoComp==codigoPrd && seq==seqAtv && !(qtdeUt=="" || qtdeUt==null || qtdeUt==undefined)){
		 					
		 					// SALVA O COMPONENTE QUE FOI APONTADO E AINDA NÃO FOI INCLUÍDO NO ARRAY
		 					if(!(compApont.includes(codigoPrd))){

			 					compApont.push(codigoPrd)	
		 						
		 					}
		 					
		 				}
		 				
		 			})
		 			
		 		}
		 		
		 		// SE A QUANTIDADE DE COMPONENTES DA ATIVIDADE É MAIOR DO QUE OS COMPONENTES QUE FORAM APONTADOS
		 		if(count>compApont.length){
		 			
		 			ops = ops + descAtv + " - " + codOrdem + ", "
		 			
		 			/*console.log("Há componentes sem apontamento da atividade "+descAtv+" da Ordem "+codOrdem)
		 			
		 			// EXIBE ALERTA
					Swal.fire({
						  icon: 'error',
						  title: 'Há componentes sem apontamento da atividade '+descAtv+" da Ordem "+codOrdem,
						  text: 'Verifique e tente novamente.'
					})
		 			
					ret = false*/
					
		 		/*} 
		 		
		 	}
		 	
		}
		
	})
	*/
	return ops
	
}

// SE CAMPOS OBRIGATÓRIOS FORAM PREENCHIDOS
function camposObrigatorios(){
	
	var ret = true
	//var normal = false
	
	console.log("entrei para verificar os campos obrigatórios")
	
	// PERCORRE TODOS OS REGISTROS DAS ATIVIDADES
	$("input[id^='AVANCO___']").each(function(){
	
		var seq = $(this).attr("id").split("___")[1]
	
		console.log("vou ver registro "+seq)
		
		var avanco = $("#AVANCO___"+seq).val()
		var ultimaAtvOp = $("#ULTIMAATVOP___"+seq).val()

		// SE É A ÚLTIMA ATIVIDADE DA OP
		if(ultimaAtvOp=="SIM"){
			
			console.log("é a última atividade da OP")
			
			// SE AVANÇO FOI INFORMADO
			if(!(avanco=="" || avanco==null || avanco==undefined)){
				
				console.log("avanço foi informado")
				
				// SE TEM HORAS LANÇADAS
				if(temHoraProd(seq)){
					
					console.log("tem horas lançadas")
					
					//ret = true
					
				}else {
					
					ret = false
					
				}	
				
			} else {
				
				console.log("avanço não foi informado")
				
				// SE TEM HORAS LANÇADAS
				if(temHoraProd(seq)){
					
					console.log("tem horas lançadas")
					
					ret = false
					
				} else {
					
					//ret = true
					
				}	
				
			}
			
		} 

	})
	
	console.log("ret: "+ret)
	
	// SE CAMPOS OBRIGATÓRIOS NÃO FORAM PREENCHIDOS
	if(!(ret)){
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'Há campos obrigatórios nas atividades que não foram preenchidos para realizar o apontamento!',
			  text: "Verifique as Horas lançadas, e/ou, se for última atividade da OP, o avanço" 
		})
	
	}
	
	return ret
	
}

// VERIFICA SE TEM HORAS LANÇADAS
function temHoraProd(seq){
	
	var ret = false
	
	// PERCORRE TODAS AS HORAS
	for(var i=1; i<11;i++){
		
		var saldoTrabalhado = $("#SALDOTRABALHADO"+i+"___"+seq).val()
		var tipo = $("#TIPO"+i+"___"+seq).val()
		
		// SE SALDO TRABALHADO FOI PREENCHIDO OU TIPO DE HORA INFORMADO
		if(!(saldoTrabalhado=="" || saldoTrabalhado==undefined || saldoTrabalhado==null) || !(tipo=="" || tipo==null || tipo==undefined)){
			
			ret = true
			
		}
		
	}
	
	return ret
	
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

// BUSCA O SALDO TOTAL CONSUMIDO DO LOTE NO FORMULÁRIO
function buscaSaldoTotalConsumidoLote(seqAtv,codigoComp,numLoteComp){
	
	console.log("vou buscar o saldo total consumido do lote no formulário")
	
	console.log("seqAtv: "+seqAtv+", codigoComp: "+codigoComp+", numLoteComp: "+numLoteComp)
	
	var qtdeAcumulada = 0
	
	// PERCORRE TODOS OS COMPONENTES LANÇADOS
	$("input[id^='CODIGOCOMPG___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var seqAtvAux = $("#SEQATV___"+seq).val()
		var codigoCompAux = $("#CODIGOCOMPG___"+seq).val()
		var numLoteCompAux = $("#NUMLOTECOMPG___"+seq).val()
		var qtdeUt = $("#QTDEUTG___"+seq).val()
		
		console.log("seqAtvAux: "+seqAtvAux+", codigoCompAux: "+codigoCompAux+", numLoteCompAux: "+numLoteCompAux+", qtdeUt: "+qtdeUt)
		
		// SE NÃO É DA MESMA ATIVIDADE E É O MESMO PRODUTO E LOTE
		if(!(seqAtvAux==seqAtv) && codigoComp==codigoCompAux && numLoteComp==numLoteCompAux){
			
			// SE A QUANTIDADE UTILIZADA FOI INFORMADA
			if(!(qtdeUt=="" || qtdeUt==null || qtdeUt==undefined)){
				
				if(qtdeUt.includes(",")){
					
					qtdeUt = qtdeUt.replace(",",".")
					
				}
				
				qtdeAcumulada = parseFloat(qtdeAcumulada) + parseFloat(qtdeUt)
				
			}
			
		}
		
	})
	
	qtdeAcumulada = qtdeAcumulada.toFixed(2)
	
	console.log("qtdeAcumulada: "+qtdeAcumulada)
	
	return qtdeAcumulada
	
}

// VERIFICA SALDO DE TODOS OS LOTES QUE SERÃO CONSUMIDOS
function verificaSaldoLotes(){
	
	console.log("verifica o saldo dos lotes")
	
	var ret = false
	var lotes = ""
	
	// PERCORRE TODOS OS COMPONENTES LANÇADOS
	$("input[id^='CODIGOCOMPG___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var seqAtv = $("#SEQATV___"+seq).val()
		var codigoComp = $("#CODIGOCOMPG___"+seq).val()
		var numLoteComp = $("#NUMLOTECOMPG___"+seq).val()
		var idLoteComp = $("#IDLOTECOMPG___"+seq).val()
		var codLocComp = $("#CODLOCCOMPG___"+seq).val()
		var qtdeUt = $("#QTDEUTG___"+seq).val()
		
		var qtdeTotal = 0
		
		// SE A QUANTIDADE UTILIZADA FOI INFORMADA
		if(!(qtdeUt=="" || qtdeUt==null || qtdeUt==undefined || qtdeUt==0 || qtdeUt=="0")){
			
			// SE TEM VÍRGULA
			if(qtdeUt.includes(",")){
				
				qtdeUt = qtdeUt.replace(",",".")
				
			}
			
			qtdeUt = parseFloat(qtdeUt)
			
			qtdeTotal = qtdeTotal + qtdeUt
			
			// PERCORRE TODOS OS COMPONENTES LANÇADOS
			$("input[id^='CODIGOCOMPG___']").each(function(){
				
				var seq = $(this).attr("id").split("___")[1]
				
				var seqAtvAux = $("#SEQATV___"+seq).val()
				var codigoCompAux = $("#CODIGOCOMPG___"+seq).val()
				var numLoteCompAux = $("#NUMLOTECOMPG___"+seq).val()
				var qtdeUtAux = $("#QTDEUTG___"+seq).val()
				
				console.log("seqAtvAux: "+seqAtvAux+", codigoCompAux: "+codigoCompAux+", numLoteCompAux: "+numLoteCompAux+", qtdeUt: "+qtdeUt)
			
				// SE A QUANTIDADE FOI INFORMADA E É O MESMO LOTE E NÃO É A MESMA ATIVIDADE
				if(!(qtdeUtAux=="" || qtdeUtAux==null || qtdeUtAux==undefined || qtdeUtAux==0 || qtdeUtAux=="0") && numLoteComp==numLoteCompAux && codigoComp==codigoComp && !seqAtv==seqAtvAux){
					
					if(qtdeUtAux.includes(",")){
						
						qtdeUtAux = qtdeUtAux.replace(",",".")
						
					}
					
					qtdeUtAux = parseFloat(qtdeUtAux)
					
					qtdeTotal = qtdeTotal + qtdeUtAux
				
				}
				
			})
		
		}
		
		// QUANTIDADE MAIOR QUE 0
		if(qtdeTotal>0){
			
			// VERIFICA SE UM DETERMINADO LOTE TEM SALDO
			if(loteSemSaldo(idLoteComp,qtdeTotal,codLocComp)){
				
				ret = true
				
				if(lotes==""){
					
					lotes = numLoteComp
					
				} else {
					
					lotes = lotes +", "+numLoteComp
					
				}
				
			}
			
		}
		
	})
	
	// SE TEM LOTES QUE NÃO PODEM SER BAIXADOS
	if(!(lotes=="" || lotes==null || lotes==undefined)){
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'Há lote(s) que não tem mais saldo suficiente para ser baixado!',
			  text: 'Verifique o(s) lançamento(s) do(s) lotes(s): '+lotes
		})
		
	}
	
	return lotes
	
}

// VERIFICA SE UM DETERMINADO LOTE TEM SALDO
function loteSemSaldo(idLoteComp,qtdeTotal,codLocComp){
	
	console.log("verifica se o lote de id "+idLoteComp+" tem saldo suficiente para baixar a qtde "+qtdeTotal+" para o codloc "+codLocComp)

 	var a1 = DatasetFactory.createConstraint("IDLOTE",idLoteComp,idLoteComp,ConstraintType.MUST);
 	var a2 = DatasetFactory.createConstraint("QTDE",qtdeTotal,qtdeTotal,ConstraintType.MUST);
 	var a3 = DatasetFactory.createConstraint("CODLOC",codLocComp,codLocComp,ConstraintType.MUST);
 	
 	var constraints = new Array(a1,a2,a3);
 	var dataset = DatasetFactory.getDataset("dsVerificaSaldoLote",null,constraints,null);
 	var row = dataset.values
 	
 	// SE LOTE TEM SALDO
	if(!(row=="" || row==undefined || row==null)){
		
		console.log("tem saldo")
		
		return false
		
	} else {
		// SE NÃO
		
		console.log("não tem saldo")
		
		return true
		
	}
	
}

// SALVA A QUANTIDADE UTILIZADA DO COMPONENTE
function salvaQtdeUtilComp(obj){

	console.log("vou verificar se a qtde pode ser consumida e salvá-la")
	
	var qtdeUt = $(obj).val()
	console.log("qtdeUt: "+qtdeUt)
	
	var seqAtv = $(obj).attr("id").split("_")[1]
	var seqComp = $(obj).attr("id").split("___")[1]
	console.log("seqAtv: "+seqAtv+", seqComp: "+seqComp)
	
	var codigoComp = $("#CODIGOCOMP_"+seqAtv+"___"+seqComp).val()
	var numLoteComp = $("#LOTECOMP_"+seqAtv+"___"+seqComp).val()
	var estoqueLote = $("#ESTOQUEATUALCOMP_"+seqAtv+"___"+seqComp).val()
	var saldoComp = $("#SALDOATUALCOMP_"+seqAtv+"___"+seqComp).val()
	var produto = $("#CODIGOCOMP_"+seqAtv+"___"+seqComp).val()
	var idprdOrigem = $("#IDPRDORIGEMCOMP_"+seqAtv+"___"+seqComp).val()
	var codtb2fat = $("#CODTB2FAT_"+seqAtv+"___"+seqComp).val()

	if(estoqueLote.includes(",")){
		
		estoqueLote = estoqueLote.replace(",",".")
		
	}
	
	estoqueLote = parseFloat(estoqueLote)
	
	console.log("estoqueLote: "+estoqueLote)
	
	estoqueLote = estoqueLote - buscaSaldoTotalConsumidoLote(seqAtv,codigoComp,numLoteComp)
	
	console.log("estoqueLoteFinal: "+estoqueLote)
	
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
		
		qtdeUt = Number(qtdeUt)
		
		// SE QUANTIDE UTILIZADA INFORMADA NÃO É UM VALOR VÁLIDO
		if(isNaN(qtdeUt) || qtdeUt==0){
			
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
			
		} else if(qtdeUt>estoqueLote){
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
				  text: 'Verifique o saldo do lote e se o mesmo já não está sendo baixado em outra atividade.'
			})
			
		} else {
			// SE NÃO, SE É UM VALOR VÁLIDO E NÃO É MAIOR QUE O ESTOQUE DO LOTE
			
			qtdeUt = parseFloat(qtdeUt)
			
			var seqAtv = $(obj).attr("id").split("_")[1]
			
			var seqComp = $(obj).attr("id").split("___")[1]
			console.log("seqAtv: "+seqAtv+", seqComp: "+seqComp)
			var qtdeSoma = 0
			
			console.log("idprdOrigem: "+idprdOrigem)
			
			// PERCORRE TODOS OS REGISTROS
			$("input[id^='CODIGOCOMPG___']").each(function(){
				
				var seq = $(this).attr("id").split("___")[1]
				
				var seqAtvLinha = $("#SEQATV___"+seq).val()
				var seqCompLinha = $("#SEQCOMP___"+seq).val()
				var codigoComp = $("#CODIGOCOMPG___"+seq).val()
				var qtde = $("#QTDEUTG___"+seq).val()
				var idprd = $("#IDPRDCOMPG___"+seq).val()
				
				// SE É O MESMO REGISTRO
				if(seqAtv==seqAtvLinha && !(seqComp==seqCompLinha) && (produto==codigoComp || idprdOrigem==idprd) && !(qtde=="" || qtde==null || qtde==undefined)){
					
					qtdeSoma = qtdeSoma + parseFloat(qtde)
					
				}
				
			})
			
			console.log("qtdeSoma: "+qtdeSoma)
			console.log("qtdeUt: "+qtdeUt)
			console.log("saldoComp: "+saldoComp)
			console.log("total: "+(qtdeSoma+qtdeUt))
			
			if(saldoComp.includes(",")){
				
				saldoComp = saldoComp.replace(",",".")
				
			}
			
			saldoComp = parseFloat(saldoComp)
			
			// SE O SALDO A SER BAIXADO É MAIOR QUE O SALDO DO COMPONENTE
			if(parseFloat(qtdeSoma+qtdeUt)>saldoComp && codtb2fat!='0184'){
			
				console.log("o saldo a ser baixado é maior que o saldo do componente")
				
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
					  title: 'A quantidade informada ultrapassa o saldo previsto do componente',
					  text: 'Verifique todas as baixas desse produto nessa atividade'
				})
				
			} else {
				
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
			
			/*log.info("o item "+(i+1)+" tem saldo e avanço")
			
			log.info("vou gerar o movimento de baixa dos componentes do item "+(i+1))*/
			
			console.log("o item "+seq+" tem saldo e avanço")
			
			console.log("vou gerar o movimento de baixa dos componentes do item "+seq)
			
			// GERA O MOVIMENTO DE BAIXA DO ESTOQUE
			idmovbx = geraMovBaixa(numProcess, codColigada, codFilial, codloc, WKUser, idAtv, seqAtv);
			
			//log.info("vou gerar o movimento de entrada do item "+(i+1))
			console.log("vou gerar o movimento de entrada do item "+seq)
			
			// GERA O MOVIMENTO DE ENTRADA DO ESTOQUE
			idmov = geraMovEntrada(numProcess, codColigada, codFilial, codloc, WKUser, codOrdem, idprd, saldo);
			
		}
		
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

// BUSCA QUAL O ITEM DA TABELA FOI SELECIONADO
function buscaSeqZoomTipo6(){
	
	var seqRet = ""
	
	console.log("vou buscar o zoom selecionado")
	
	// PERCORRE A TABELA E COLETA TODOS OS ITENS
	$('input[id^="TIPO6___"]').each(function(index, value){
		
		// VARIÁVEL PARA O ÍNDICE DA TABELA
		var seq = $(this).attr("id").split("___")[1]
		
		// SE O ZOOM É O SELECIONADO
		if($("#TIPO6___"+seq).hasClass("selecionadoZoom")){
			
			seqRet = seq
			
		}
		
	})
	
	console.log("seq selecionado: "+seqRet)
	return seqRet
	
}

// BUSCA QUAL O ITEM DA TABELA FOI SELECIONADO
function buscaSeqZoomTipo7(){
	
	var seqRet = ""
	
	console.log("vou buscar o zoom selecionado")
	
	// PERCORRE A TABELA E COLETA TODOS OS ITENS
	$('input[id^="TIPO7___"]').each(function(index, value){
		
		// VARIÁVEL PARA O ÍNDICE DA TABELA
		var seq = $(this).attr("id").split("___")[1]
		
		// SE O ZOOM É O SELECIONADO
		if($("#TIPO7___"+seq).hasClass("selecionadoZoom")){
			
			seqRet = seq
			
		}
		
	})
	
	console.log("seq selecionado: "+seqRet)
	return seqRet
	
}

// BUSCA QUAL O ITEM DA TABELA FOI SELECIONADO
function buscaSeqZoomTipo8(){
	
	var seqRet = ""
	
	console.log("vou buscar o zoom selecionado")
	
	// PERCORRE A TABELA E COLETA TODOS OS ITENS
	$('input[id^="TIPO8___"]').each(function(index, value){
		
		// VARIÁVEL PARA O ÍNDICE DA TABELA
		var seq = $(this).attr("id").split("___")[1]
		
		// SE O ZOOM É O SELECIONADO
		if($("#TIPO8___"+seq).hasClass("selecionadoZoom")){
			
			seqRet = seq
			
		}
		
	})
	
	console.log("seq selecionado: "+seqRet)
	return seqRet
	
}

// BUSCA QUAL O ITEM DA TABELA FOI SELECIONADO
function buscaSeqZoomTipo9(){
	
	var seqRet = ""
	
	console.log("vou buscar o zoom selecionado")
	
	// PERCORRE A TABELA E COLETA TODOS OS ITENS
	$('input[id^="TIPO9___"]').each(function(index, value){
		
		// VARIÁVEL PARA O ÍNDICE DA TABELA
		var seq = $(this).attr("id").split("___")[1]
		
		// SE O ZOOM É O SELECIONADO
		if($("#TIPO9___"+seq).hasClass("selecionadoZoom")){
			
			seqRet = seq
			
		}
		
	})
	
	console.log("seq selecionado: "+seqRet)
	return seqRet
	
}

// BUSCA QUAL O ITEM DA TABELA FOI SELECIONADO
function buscaSeqZoomTipo10(){
	
	var seqRet = ""
	
	console.log("vou buscar o zoom selecionado")
	
	// PERCORRE A TABELA E COLETA TODOS OS ITENS
	$('input[id^="TIPO10___"]').each(function(index, value){
		
		// VARIÁVEL PARA O ÍNDICE DA TABELA
		var seq = $(this).attr("id").split("___")[1]
		
		// SE O ZOOM É O SELECIONADO
		if($("#TIPO10___"+seq).hasClass("selecionadoZoom")){
			
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
	
	//$("#HORAINICIOIMPRO1___"+seq).val("").prop("disabled",true)
	//$("#HORAFIMIMPRO1___"+seq).val("").prop("disabled",true)

}

// LIMPA O CONTEÚDO DO ZOOM
function limparZoomTipo2(obj){

	console.log("vou limpar o zoom")
	console.log(obj)
	
	var seq = $(obj).attr("id").split("___")[1]
		
	$("#CODTIPO2___"+seq).val("")
	$("#DESCRICAOTIPO2___"+seq).val("")
	$("#TIPO2___"+seq).val("")

	//$("#HORAINICIOIMPRO2___"+seq).val("").prop("disabled",true)
	//$("#HORAFIMIMPRO2___"+seq).val("").prop("disabled",true)
	
}

// LIMPA O CONTEÚDO DO ZOOM
function limparZoomTipo3(obj){

	console.log("vou limpar o zoom")
	console.log(obj)
	
	var seq = $(obj).attr("id").split("___")[1]
		
	$("#CODTIPO3___"+seq).val("")
	$("#DESCRICAOTIPO3___"+seq).val("")
	$("#TIPO3___"+seq).val("")
	
	//$("#HORAINICIOIMPRO3___"+seq).val("").prop("disabled",true)
	//$("#HORAFIMIMPRO3___"+seq).val("").prop("disabled",true)
	
}

// LIMPA O CONTEÚDO DO ZOOM
function limparZoomTipo4(obj){

	console.log("vou limpar o zoom")
	console.log(obj)
	
	var seq = $(obj).attr("id").split("___")[1]
		
	$("#CODTIPO4___"+seq).val("")
	$("#DESCRICAOTIPO4___"+seq).val("")
	$("#TIPO4___"+seq).val("")

	//$("#HORAINICIOIMPRO4___"+seq).val("").prop("disabled",true)
	//$("#HORAFIMIMPRO4___"+seq).val("").prop("disabled",true)
	
}

// LIMPA O CONTEÚDO DO ZOOM
function limparZoomTipo5(obj){

	console.log("vou limpar o zoom")
	console.log(obj)
	
	var seq = $(obj).attr("id").split("___")[1]
		
	$("#CODTIPO5___"+seq).val("")
	$("#DESCRICAOTIPO5___"+seq).val("")
	$("#TIPO5___"+seq).val("")
	
	//$("#HORAINICIOIMPRO5___"+seq).val("").prop("disabled",true)
	//$("#HORAFIMIMPRO5___"+seq).val("").prop("disabled",true)

}

// LIMPA O CONTEÚDO DO ZOOM
function limparZoomTipo6(obj){

	console.log("vou limpar o zoom")
	console.log(obj)
	
	var seq = $(obj).attr("id").split("___")[1]
		
	$("#CODTIPO6___"+seq).val("")
	$("#DESCRICAOTIPO6___"+seq).val("")
	$("#TIPO6___"+seq).val("")
	
	//$("#HORAINICIOIMPRO6___"+seq).val("").prop("disabled",true)
	//$("#HORAFIMIMPRO5___"+seq).val("").prop("disabled",true)

}

// LIMPA O CONTEÚDO DO ZOOM
function limparZoomTipo7(obj){

	console.log("vou limpar o zoom")
	console.log(obj)
	
	var seq = $(obj).attr("id").split("___")[1]
		
	$("#CODTIPO7___"+seq).val("")
	$("#DESCRICAOTIPO7___"+seq).val("")
	$("#TIPO7___"+seq).val("")
	
	//$("#HORAINICIOIMPRO6___"+seq).val("").prop("disabled",true)
	//$("#HORAFIMIMPRO5___"+seq).val("").prop("disabled",true)

}

// LIMPA O CONTEÚDO DO ZOOM
function limparZoomTipo8(obj){

	console.log("vou limpar o zoom")
	console.log(obj)
	
	var seq = $(obj).attr("id").split("___")[1]
		
	$("#CODTIPO8___"+seq).val("")
	$("#DESCRICAOTIPO8___"+seq).val("")
	$("#TIPO8___"+seq).val("")
	
	//$("#HORAINICIOIMPRO6___"+seq).val("").prop("disabled",true)
	//$("#HORAFIMIMPRO5___"+seq).val("").prop("disabled",true)

}

// LIMPA O CONTEÚDO DO ZOOM
function limparZoomTipo9(obj){

	console.log("vou limpar o zoom")
	console.log(obj)
	
	var seq = $(obj).attr("id").split("___")[1]
		
	$("#CODTIPO9___"+seq).val("")
	$("#DESCRICAOTIPO9___"+seq).val("")
	$("#TIPO9___"+seq).val("")
	
	//$("#HORAINICIOIMPRO6___"+seq).val("").prop("disabled",true)
	//$("#HORAFIMIMPRO5___"+seq).val("").prop("disabled",true)

}

// LIMPA O CONTEÚDO DO ZOOM
function limparZoomTipo10(obj){

	console.log("vou limpar o zoom")
	console.log(obj)
	
	var seq = $(obj).attr("id").split("___")[1]
		
	$("#CODTIPO10___"+seq).val("")
	$("#DESCRICAOTIPO10___"+seq).val("")
	$("#TIPO10___"+seq).val("")
	
	//$("#HORAINICIOIMPRO6___"+seq).val("").prop("disabled",true)
	//$("#HORAFIMIMPRO5___"+seq).val("").prop("disabled",true)

}

// HABILITA O CAMPO HORA FIM ATIVIDADE
/*function habilitaHoraFimAtv(obj){
	
	console.log("habilita a hora fim")
	
	var seq = $(obj).attr("id").split("___")[1]
	
	var horaInicio = $("#HORAINICIOATV___"+seq).val()
	var op = $("#OP___"+seq).val()
	var idAtv = $("#IDATIVIDADE___"+seq).val()
	
	// SE HORA INÍCIO FOI PREENCHIDO
	if(!(horaInicio=="" || horaInicio==null || horaInicio==undefined)){
		
		console.log("hora início foi preenchido")
		
		// VERIFICA SE HORAS INFORMADAS ESTÃO EM CONFLITOS COM OUTRAS DA MESMA ATIVIDADEp@12
		//if(horasInicioAtividade(op,idAtv,horaInicio,seq)){
			
			//console.log("horas estão em conflito com outras da mesma atividade")
			
			//$("#HORAFIMATV___"+seq).prop("disabled",true)	
			//$("#HORAINICIOATV___"+seq).val("")
			
			// EXIBE ALERTA
			//Swal.fire({
				//  icon: 'error',
			    //	title: 'O intervalo de horas informado está em conflito com as horas já lançadas da mesma atividade',
				//  text: 'Verifique os campos preenchidos e tente novamente.'
			//})
			
		//}
		
		$("#HORAFIMATV___"+seq).prop("disabled",false)
		//$("#HORAFIMATV___"+seq).val("00:00")
		
	} else {
		// SE HORA INÍCIO NÃO FOI PREENCHIDA
		
		$("#HORAFIMATV___"+seq).val("").prop("disabled",true)
		
	}
	
}*/

// HABILITA O CAMPO HORA FIM ATIVIDADE
function habilitaHoraFimAtv(obj){
	
	console.log("habilita a hora fim")
	
	var seq = $(obj).attr("id").split("___")[1]

	var index = $(obj).attr("id").toString().split("V")[1].split("___")[0]
	console.log("Index: "+index)
	
	var horaInicio = $("#HORAINICIOATV"+index+"___"+seq).val()
	var op = $("#OP___"+seq).val()
	var idAtv = $("#IDATIVIDADE___"+seq).val()
	
	// SE HORA INÍCIO FOI PREENCHIDO
	if(!(horaInicio=="" || horaInicio==null || horaInicio==undefined)){
		
		console.log("hora início foi preenchido")
	
		$("#HORAFIMATV"+index+"___"+seq).prop("disabled",false)
		
	} else {
		// SE HORA INÍCIO NÃO FOI PREENCHIDA
		
		$("#HORAFIMATV"+index+"___"+seq).val("").prop("disabled",true)
		$("#SALDOTRABALHADO"+index+"___"+seq).val("")
		
	}
	
}

// ESCONDE E APAGA A LINHA DA HORA PRODUTIVA
function excluirHoraProd(obj){
	
	console.log("vou esconder a linha 1")
	
	var seq = $(obj).parent("div").parent("div").parent("div").children("input").attr("id").split("___")[1]
	
	var index = $(obj).attr("id").toString().split("D")[1].split("___")[0]
	console.log("Index: "+index)
	
	$("#HORAINICIOATV"+index+"___"+seq).val("")
	$("#HORAFIMATV"+index+"___"+seq).val("")
	$("#SALDOTRABALHADO"+index+"___"+seq).val("")
	$("#TIPO"+index+"___"+seq).val("")
	$("#CODTIPO"+index+"___"+seq).val("")
	$("#DESCRICAOTIPO"+index+"___"+seq).val("")
	
	$("#TIPO"+index+"___"+seq+">option").remove()
	
	$("#HORAINICIOATV"+index+"___"+seq).parent("div").parent("div").parent("div").hide()
	$("#HORAINICIOATV"+index+"___"+seq).parent("div").parent("div").parent("div").removeClass("HPVISIVEL")
	
	// CALCULA E SOMA TODOS OS SALDOS TRABALHADOS
	calculaSomaSaldo(seq)
	
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
			
		} 
		
	}
	
}

// FAZ A VALIDAÇÃO DA HORA FIM DA ATIVIDADE
/*function limpaHoraFimAtv(obj){
	
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
	
}*/

// EXIBE A HORA PRODUTIVA
function addHoraProd(obj){
	
	var seq = $(obj).parent("div").children("input").attr("id").split("___")[1]
	
	console.log("vou adicionar hora Prod")
	
	console.log("seq: "+seq)
	
	// PERCORRE TODOS OS REGISTROS
	for(var i=1;i<11;i++){
		
		console.log("i: "+i)
		
		// SE LINHA PERÍODO NÃO ESTÁ VISÍVEL
		if(!($("#HORAINICIOATV"+i+"___"+seq).parent("div").parent("div").parent("div").hasClass("HPVISIVEL"))){
			
			console.log("achei hora que não está visível")
			
			$("#HORAINICIOATV"+i+"___"+seq).parent("div").parent("div").parent("div").show()
			$("#HORAINICIOATV"+i+"___"+seq).parent("div").parent("div").parent("div").addClass("HPVISIVEL")
			
			break
			
		}	
		
	}
	
}

// FAZ A VALIDAÇÃO DA HORA FIM DA ATIVIDADE
function limpaHoraFimAtv(obj){
	
	var seq = $(obj).attr("id").split("___")[1]
	
	var index = $(obj).attr("id").toString().split("V")[1].split("___")[0]
	console.log("Index: "+index)
	
	var hoje = new Date()
	var horaInicio = $("#HORAINICIOATV"+index+"___"+seq).val()
	var horaFim = $("#HORAFIMATV"+index+"___"+seq).val()
	var idAtv = $("#IDATIVIDADE___"+seq).val()
	var op = $("#OP___"+seq).val()
	var dataProg = $("#DATAPROGRAMADA___"+seq).val()
	var tipo = $("#TIPO"+index+"___"+seq).val()

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
			
			$("#HORAFIMATV"+index+"___"+seq).val("")
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'A hora Fim não pode ser menor ou igual que a hora início',
				  text: 'Verifique os campos preenchidos e tente novamente.'
			})
		
		}
		
		// VERIFICA SE HORAS INFORMADAS ESTÃO EM CONFLITOS COM OUTRAS DA MESMA ATIVIDADE
		else if(horasAtividade(op,idAtv,horaInicio,horaFim,seq,index)){
			
			console.log("horas estão em conflito com outras da mesma atividade")
			
			$("#HORAFIMATV"+index+"___"+seq).val("").prop("disabled",true)
			$("#HORAINICIOATV"+index+"___"+seq).val("")
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'O intervalo de horas informado está em conflito com as horas já lançadas neste dia',
				  text: 'Verifique os campos preenchidos e tente novamente.'
			})
			
		}
		else {
			// SE NÃO, HORAS ESTÃO APROVADAS
			
			horaInicio = $("#HORAINICIOATV"+index+"___"+seq).val()
			horaFim = $("#HORAFIMATV"+index+"___"+seq).val()
			
			console.log("hoje: "+hoje)
			console.log("horaInicio: "+horaInicio)
			console.log("horaFim: "+horaFim)
			
			var data1 = new Date(hoje+' '+horaInicio)
			var data2 = new Date(hoje+' '+horaFim)
			
			console.log("data1: "+data1+", data2: "+data2)
			
			var diff = Math.abs(data1.getTime() - data2.getTime())/3600000
			
			console.log("diff: "+diff)
			
			$("#SALDOTRABALHADO"+index+"___"+seq).val(diff.toFixed(4))
			
			// CALCULA E SOMA TODOS OS SALDOS TRABALHADOS
			calculaSomaSaldo(seq)
			
			// SETA A HORA MÍNIMA DE INÍCIO DA PRÓXIMA HORA PRODUTIVA/IMPRODUTIVA
			//horaInicioMin(seq,index,hoje,horaFim)
			
		}
		
	} else {
		// SE HORA FIM NÃO FOI PREENCHIDO OU FOI LIMPO
		
		$("#SALDOTRABALHADO"+index+"___"+seq).val("")
		
	}
	
}

// SETA A HORA MÍNIMA DE INÍCIO DA PRÓXIMA HORA PRODUTIVA/IMPRODUTIVA
function horaInicioMin(seq,index,hoje,horaFim){
	
	console.log("setar a horaInicioMin da próxima")
	
	var d1 = new Date(hoje+" "+horaFim)
	d1.setMinutes(d1.getMinutes()+1) 

	console.log("#resultado: " + " " + d1)

	var str = d1.toString().split(" ")

	var horaFim = str[4]
	horaFim = str[4].split(":")
	horaFim = horaFim[0]+":"+horaFim[1]
	
	index = parseInt(index)
	
	index = index + 1
	
	console.log("index: "+index)
	
	$('#HORAINICIOATV'+index+'___'+seq).val(horaFim)
	
	habilitaHoraFimAtv($('#HORAINICIOATV'+index+'___'+seq))
	
	/*var minimaData = new Date(hoje+' '+horaFim)
	var maximaData = new Date(hoje+' 23:59:00')
	
	console.log("minimaData: "+minimaData)
	
	console.log("HORAINICIOATV"+index+"___"+seq)
	
	$('#HORAINICIOATV'+index+'___'+seq).parent("div").empty().append('<input type="text" class="form-control" id="HORAINICIOATV'+index+'___'+seq+'" name="HORAINICIOATV'+index+'___'+seq+'" onblur="habilitaHoraFimAtv(this);" mask="00:00"><span class="input-group-addon"><span class="fluigicon fluigicon-time"></span></span>')
	
	var mySimpleCalendar = FLUIGC.calendar('#HORAINICIOATV'+index+'___'+seq, {
		pickDate: false,
	    pickTime: true,
	    language: 'pt-br', 
	    minDate: minimaData,
	    maxDate: maximaData
	})*/
	
}

// PREENCHE A HORA INICIO DA PRÓXIMA HORA PRODUTIVA/IMPRODUTIVA
function preencheHoraInicio(index,obj){
	
	var indexMin = index - 1
	
	//index = index + 1
	
	var hoje = new Date()
	hoje = geraDataBanco(hoje)
	
	var seq = $(obj).attr("id").split("___")[1]
	
	var horaFim = $("#HORAFIMATV"+indexMin+"___"+seq).val()
	
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
		
		// SE NÃO É O MAIOR ÍNDEX
		if(index<=10){
			
			console.log("HORAINICIOATV"+index+"___"+seq)
			
			$("#HORAINICIOATV"+index+"___"+seq).val(horaFim)	
			
		}
		
	}
	
}

// CALCULA E SOMA TODOS OS SALDOS TRABALHADOS
function calculaSomaSaldo(seq){
	
	console.log("vou calcular a soma")
	
	var soma = 0
	
	// PERCORRE TODOS OS REGISTROS
	for(var i=1;i<11;i++){
		
		var saldo = $("#SALDOTRABALHADO"+i+"___"+seq).val()
		var tipo = $("#TIPO"+i+"___"+seq).val()
		
		console.log("saldo: "+saldo)
		console.log("soma: "+soma)
		
		// SE TIPO NÃO FOI INFORMADO E SALDO NÃO É VAZIO OU NULO
		if((tipo=="" || tipo==null || tipo==undefined) && !(saldo==null || saldo==undefined || saldo=="" )){
			
			console.log("vou somar!")
			console.log("saldo: "+saldo+", soma: "+soma)
			
			saldo = parseFloat(saldo)
			soma = parseFloat(soma)
			soma = soma + saldo
			
			console.log("após a soma: "+soma)
			
		}
		
	}
	
	console.log("Saldo total calculado "+soma)
	
	$("#SALDOTRABALHADOTOTAL___"+seq).val(soma.toFixed(4))
	
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

// VERIFICA SE HORAS INFORMADAS ESTÃO EM CONFLITOS COM OUTRAS DA MESMA ATIVIDADE
/*function horasAtividade(op,idAtv,horaInicio,horaFim,seqAtv){
	
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
	
}*/

// VERIFICA SE HORAS INFORMADAS ESTÃO EM CONFLITOS COM OUTRAS DAS DEMAIS ATIVIDADES
function horasAtividadesGeral(seqAtv,op,idAtv,horaInicio,horaFim){
	
	console.log("vou verificar se atividades tem horas conflitantes")
	
	console.log("op: "+op+", idAtv: "+idAtv+", horaInicio: "+horaInicio+", horaFim: "+horaFim+", seq: "+seqAtv)
	
	var ret = false
	
	// PERCORRE TODOS OS REGISTROS DA TABELA DE ATIVIDADES
	$("input[id^='CODIGOPRD___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var idAtvAux = $("#IDATIVIDADE___"+seq).val()
		var opAux = $("#OP___"+seq).val()
		var dataProgAux = $("#DATAPROGRAMADA___"+seq).val()
		
		// SE NÃO É A MESMA ATIVIDADE
		if(!(seq==seqAtv)){
			
			// PERCORRE TODOS OS REGISTROS
			for(var i=1; i<11;i++){
				
				var horaInicioAux = $("#HORAINICIOATV"+i+"___"+seq).val()
				var horaFimAux = $("#HORAFIMATV"+i+"___"+seq).val()
				var seqAux = $("#SEQ___"+seq).val()	
				
				// SE NÃO É O MESMO ÍNDICE
				//if(!(i==index)){
				
					// SE HORA INÍCIO E FIM FORAM PREENCHIDAS
					if(!(horaInicioAux=="" || horaInicioAux==null || horaInicioAux==undefined) && !(horaFimAux=="" || horaFimAux==null || horaFimAux==undefined)){
						
						// SE É A MESMA ATIVIDADE E OP E MESMA DATA E NÃO É A ATIVIDADE PRINCIPAL
						//if(!(seqAtv==seqAux)){
							
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
								
								return ret
								
							}
							
						//}
						
					}
					
				//}
				
			}
			
		}
		
	})
	
	return ret
	
}

// VERIFICA SE EXISTEM APONTAMENTOS QUE JÁ FORAM APONTADOS (DUPLICIDADE)
function duplicidadeApontamento(){
	
	console.log("verifica se existem apontamentos duplicados")
	
	var apontamentos = ""
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='CODIGOPRD___']").each(function(){
	
		var seq = $(this).attr("id").split("___")[1]
		
		var codColigada = $("#CODCOLIGADAATV___"+seq).val()
		var codFilial = $("#CODFILIALATV___"+seq).val()
		var codEstrutura = $("#CODESTRUTURAATV___"+seq).val()
		var codOrdem = $("#OP___"+seq).val()
		var idAtvOrdem = $("#IDATIVIDADE___"+seq).val()
		//var codmo = $("#CODMO___"+seq).val()
		var codmo = $("#CODMO").val()
		var descAtividade = $("#DSCATIVIDADE___"+seq).val()
		var descAp = " a OP "+codOrdem+" e ID "+idAtvOrdem+" "
		
		console.log("codColigada: "+codColigada+", codFilial: "+codFilial+", codEstrutura: "+codEstrutura+", codOrdem: "+codOrdem+", codmo: "+codmo)
		
		// HORAS PRODUTIVAS
		var tipo1 = $("#CODTIPO1___"+seq).val()
		var dataInicial1 = $("#HORAINICIOATV1___"+seq).val()
		var dataFinal1 = $("#HORAFIMATV1___"+seq).val()
		var saldo1 = $("#SALDOTRABALHADO1___"+seq).val()
		var tipo2 = $("#CODTIPO2___"+seq).val()
		var dataInicial2 = $("#HORAINICIOATV2___"+seq).val()
		var dataFinal2 = $("#HORAFIMATV2___"+seq).val()
		var saldo2 = $("#SALDOTRABALHADO2___"+seq).val()
		var tipo3 = $("#CODTIPO3___"+seq).val()
		var dataInicial3 = $("#HORAINICIOATV3___"+seq).val()
		var dataFinal3 = $("#HORAFIMATV3___"+seq).val()
		var saldo3 = $("#SALDOTRABALHADO3___"+seq).val()
		var tipo4 = $("#CODTIPO4___"+seq).val()
		var dataInicial4 = $("#HORAINICIOATV4___"+seq).val()
		var dataFinal4 = $("#HORAFIMATV4___"+seq).val()
		var saldo4 = $("#SALDOTRABALHADO4___"+seq).val()
		var tipo5 = $("#CODTIPO5___"+seq).val()
		var dataInicial5 = $("#HORAINICIOATV5___"+seq).val()
		var dataFinal5 = $("#HORAFIMATV5___"+seq).val()
		var saldo5 = $("#SALDOTRABALHADO5___"+seq).val()
		var tipo6 = $("#CODTIPO6___"+seq).val()
		var dataInicial6 = $("#HORAINICIOATV6___"+seq).val()
		var dataFinal6 = $("#HORAFIMATV6___"+seq).val()
		var saldo6 = $("#SALDOTRABALHADO6___"+seq).val()
		var tipo7 = $("#CODTIPO7___"+seq).val()
		var dataInicial7 = $("#HORAINICIOATV7___"+seq).val()
		var dataFinal7 = $("#HORAFIMATV7___"+seq).val()
		var saldo7 = $("#SALDOTRABALHADO7___"+seq).val()
		var tipo8 = $("#CODTIPO8___"+seq).val()
		var dataInicial8 = $("#HORAINICIOATV8___"+seq).val()
		var dataFinal8 = $("#HORAFIMATV8___"+seq).val()
		var saldo8 = $("#SALDOTRABALHADO8___"+seq).val()
		var tipo9 = $("#CODTIPO9___"+seq).val()
		var dataInicial9 = $("#HORAINICIOATV9___"+seq).val()
		var dataFinal9 = $("#HORAFIMATV9___"+seq).val()
		var saldo9 = $("#SALDOTRABALHADO9___"+seq).val()
		var tipo10 = $("#CODTIPO10___"+seq).val()
		var dataInicial10 = $("#HORAINICIOATV10___"+seq).val()
		var dataFinal10 = $("#HORAFIMATV10___"+seq).val()
		var saldo10 = $("#SALDOTRABALHADO10___"+seq).val()
		
		console.log("tipo1: "+tipo1+", dataInicial1: "+dataInicial1+", dataFinal1: "+dataFinal1+", saldo1: "+saldo1+
					", tipo2: "+tipo2+", dataInicial2: "+dataInicial2+", dataFinal2: "+dataFinal2+", saldo2: "+saldo2+
					", tipo3: "+tipo3+", dataInicial3: "+dataInicial3+", dataFinal3: "+dataFinal3+", saldo3: "+saldo3+
					", tipo4: "+tipo4+", dataInicial4: "+dataInicial4+", dataFinal4: "+dataFinal4+", saldo4: "+saldo4+
					", tipo5: "+tipo5+", dataInicial5: "+dataInicial5+", dataFinal5: "+dataFinal5+", saldo5: "+saldo5+
					", tipo6: "+tipo6+", dataInicial6: "+dataInicial6+", dataFinal6: "+dataFinal6+", saldo6: "+saldo6+
					", tipo7: "+tipo7+", dataInicial7: "+dataInicial7+", dataFinal7: "+dataFinal7+", saldo7: "+saldo7+
					", tipo8: "+tipo8+", dataInicial8: "+dataInicial8+", dataFinal8: "+dataFinal8+", saldo8: "+saldo8+
					", tipo9: "+tipo9+", dataInicial9: "+dataInicial9+", dataFinal9: "+dataFinal9+", saldo9: "+saldo9+
					", tipo10: "+tipo10+", dataInicial10: "+dataInicial10+", dataFinal10: "+dataFinal10+", saldo10: "+saldo10)
		
		// SE É UMA HORA PRODUTIVA COM HORAS LANÇADAS
		if((tipo1=="" || tipo1==null || tipo1==undefined) && !(saldo1=="" || saldo1==null || saldo1==undefined)){
			
			// BUSCA SE JÁ EXISTE APONTAMENTO
			if(buscaDupliciadeApont(codColigada,codFilial,codOrdem,codEstrutura,codmo,dataInicial1,dataFinal1)){
				
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
			
		} else if((!tipo1=="" || tipo1==null || tipo1==undefined) && !(saldo1=="" || saldo1==null || saldo1==undefined)){
			
			// BUSCA SE JÁ EXISTE APONTAMENTO DA PARADA
			if(buscaDupliciadeApontParada(codColigada,codFilial,codOrdem,codEstrutura,codmo,tipo1,dataInicial1,dataFinal1)){
				
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
		
		// SE É UMA HORA PRODUTIVA COM HORAS LANÇADAS
		if((tipo2=="" || tipo2==null || tipo2==undefined) && !(saldo2=="" || saldo2==null || saldo2==undefined)){
			
			// BUSCA SE JÁ EXISTE APONTAMENTO
			if(buscaDupliciadeApont(codColigada,codFilial,codOrdem,codEstrutura,codmo,dataInicial2,dataFinal2)){
				
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
			
		} else if((!tipo2=="" || tipo2==null || tipo2==undefined) && !(saldo2=="" || saldo2==null || saldo2==undefined)){
			
			// BUSCA SE JÁ EXISTE APONTAMENTO DA PARADA
			if(buscaDupliciadeApontParada(codColigada,codFilial,codOrdem,codEstrutura,codmo,tipo2,dataInicial2,dataFinal2)){
				
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
		
		// SE É UMA HORA PRODUTIVA COM HORAS LANÇADAS
		if((tipo3=="" || tipo3==null || tipo3==undefined) && !(saldo3=="" || saldo3==null || saldo3==undefined)){
			
			// BUSCA SE JÁ EXISTE APONTAMENTO
			if(buscaDupliciadeApont(codColigada,codFilial,codOrdem,codEstrutura,codmo,dataInicial3,dataFinal3)){
				
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
			
		} else if((!tipo3=="" || tipo3==null || tipo3==undefined) && !(saldo3=="" || saldo3==null || saldo3==undefined)){
			
			// BUSCA SE JÁ EXISTE APONTAMENTO DA PARADA
			if(buscaDupliciadeApontParada(codColigada,codFilial,codOrdem,codEstrutura,codmo,tipo3,dataInicial3,dataFinal3)){
				
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
		
		// SE É UMA HORA PRODUTIVA COM HORAS LANÇADAS
		if((tipo4=="" || tipo4==null || tipo4==undefined) && !(saldo4=="" || saldo4==null || saldo4==undefined)){
			
			// BUSCA SE JÁ EXISTE APONTAMENTO
			if(buscaDupliciadeApont(codColigada,codFilial,codOrdem,codEstrutura,codmo,dataInicial4,dataFinal4)){
				
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
			
		} else if((!tipo4=="" || tipo4==null || tipo4==undefined) && !(saldo4=="" || saldo4==null || saldo4==undefined)){
			
			// BUSCA SE JÁ EXISTE APONTAMENTO DA PARADA
			if(buscaDupliciadeApontParada(codColigada,codFilial,codOrdem,codEstrutura,codmo,tipo4,dataInicial4,dataFinal4)){
				
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
		
		// SE É UMA HORA PRODUTIVA COM HORAS LANÇADAS
		if((tipo5=="" || tipo5==null || tipo5==undefined) && !(saldo5=="" || saldo5==null || saldo5==undefined)){
			
			// BUSCA SE JÁ EXISTE APONTAMENTO
			if(buscaDupliciadeApont(codColigada,codFilial,codOrdem,codEstrutura,codmo,dataInicial5,dataFinal5)){
				
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
			
		} else if((!tipo5=="" || tipo5==null || tipo5==undefined) && !(saldo5=="" || saldo5==null || saldo5==undefined)){
			
			// BUSCA SE JÁ EXISTE APONTAMENTO DA PARADA
			if(buscaDupliciadeApontParada(codColigada,codFilial,codOrdem,codEstrutura,codmo,tipo5,dataInicial5,dataFinal5)){
				
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
		
		// SE É UMA HORA PRODUTIVA COM HORAS LANÇADAS
		if((tipo6=="" || tipo6==null || tipo6==undefined) && !(saldo6=="" || saldo6==null || saldo6==undefined)){
			
			// BUSCA SE JÁ EXISTE APONTAMENTO
			if(buscaDupliciadeApont(codColigada,codFilial,codOrdem,codEstrutura,codmo,dataInicial6,dataFinal6)){
				
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
			
		} else if((!tipo6=="" || tipo6==null || tipo6==undefined) && !(saldo6=="" || saldo6==null || saldo6==undefined)){
			
			// BUSCA SE JÁ EXISTE APONTAMENTO DA PARADA
			if(buscaDupliciadeApontParada(codColigada,codFilial,codOrdem,codEstrutura,codmo,tipo6,dataInicial6,dataFinal6)){
				
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
		
		// SE É UMA HORA PRODUTIVA COM HORAS LANÇADAS
		if((tipo7=="" || tipo7==null || tipo7==undefined) && !(saldo7=="" || saldo7==null || saldo7==undefined)){
			
			// BUSCA SE JÁ EXISTE APONTAMENTO
			if(buscaDupliciadeApont(codColigada,codFilial,codOrdem,codEstrutura,codmo,dataInicial7,dataFinal7)){
				
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
			
		} else if((!tipo7=="" || tipo7==null || tipo7==undefined) && !(saldo7=="" || saldo7==null || saldo7==undefined)){
			
			// BUSCA SE JÁ EXISTE APONTAMENTO DA PARADA
			if(buscaDupliciadeApontParada(codColigada,codFilial,codOrdem,codEstrutura,codmo,tipo7,dataInicial7,dataFinal7)){
				
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
		
		// SE É UMA HORA PRODUTIVA COM HORAS LANÇADAS
		if((tipo8=="" || tipo8==null || tipo8==undefined) && !(saldo8=="" || saldo8==null || saldo8==undefined)){
			
			// BUSCA SE JÁ EXISTE APONTAMENTO
			if(buscaDupliciadeApont(codColigada,codFilial,codOrdem,codEstrutura,codmo,dataInicial8,dataFinal8)){
				
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
			
		} else if((!tipo8=="" || tipo8==null || tipo8==undefined) && !(saldo8=="" || saldo8==null || saldo8==undefined)){
			
			// BUSCA SE JÁ EXISTE APONTAMENTO DA PARADA
			if(buscaDupliciadeApontParada(codColigada,codFilial,codOrdem,codEstrutura,codmo,tipo8,dataInicial8,dataFinal8)){
				
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
		
		// SE É UMA HORA PRODUTIVA COM HORAS LANÇADAS
		if((tipo9=="" || tipo9==null || tipo9==undefined) && !(saldo9=="" || saldo9==null || saldo9==undefined)){
			
			// BUSCA SE JÁ EXISTE APONTAMENTO
			if(buscaDupliciadeApont(codColigada,codFilial,codOrdem,codEstrutura,codmo,dataInicial9,dataFinal9)){
				
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
			
		}  else if((!tipo9=="" || tipo9==null || tipo9==undefined) && !(saldo9=="" || saldo9==null || saldo9==undefined)){
			
			// BUSCA SE JÁ EXISTE APONTAMENTO DA PARADA
			if(buscaDupliciadeApontParada(codColigada,codFilial,codOrdem,codEstrutura,codmo,tipo9,dataInicial9,dataFinal9)){
				
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
		
		// SE É UMA HORA PRODUTIVA COM HORAS LANÇADAS
		if((tipo10=="" || tipo10==null || tipo10==undefined) && !(saldo10=="" || saldo10==null || saldo10==undefined)){
			
			// BUSCA SE JÁ EXISTE APONTAMENTO
			if(buscaDupliciadeApont(codColigada,codFilial,codOrdem,codEstrutura,codmo,dataInicial10,dataFinal10)){
				
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
			
		} else if((!tipo10=="" || tipo10==null || tipo10==undefined) && !(saldo10=="" || saldo10==null || saldo10==undefined)){
			
			// BUSCA SE JÁ EXISTE APONTAMENTO DA PARADA
			if(buscaDupliciadeApontParada(codColigada,codFilial,codOrdem,codEstrutura,codmo,tipo10,dataInicial10,dataFinal10)){
				
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

// BUSCA SE JÁ EXISTE APONTAMENTO DA PARADA
function buscaDupliciadeApontParada(codColigada,codFilial,codOrdem,codEstrutura,codmo,tipo,dataInicial,dataFinal){

	console.log("vou buscar os apontamentos que foram duplicados da parada")
	
	var apontamentos = ""
		
	// MONTA O ARRAY DAS CONSTRAINTS
	var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
	var a4 = DatasetFactory.createConstraint("CODESTRUTURA",codEstrutura,codEstrutura,ConstraintType.MUST)
	var a5 = DatasetFactory.createConstraint("CODMO",codmo,codmo,ConstraintType.MUST)
	var a6 = DatasetFactory.createConstraint("DTHRINICIAL",dataInicial,dataInicial,ConstraintType.MUST)
	var a7 = DatasetFactory.createConstraint("DTHRFINAL",dataFinal,dataFinal,ConstraintType.MUST)
	var a8 = DatasetFactory.createConstraint("TIPO",tipo,tipo,ConstraintType.MUST)

	var constraints = new Array(a1,a2,a3,a4,a5,a6,a7,a8)
	
	var dataset = DatasetFactory.getDataset("dsDuplicidadeApontamentoParada",null,constraints,null)
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

// BUSCA APONTAMENTOS QUE FORAM DUPLICADOS
function buscaDupliciadeApont(codColigada,codFilial,codOrdem,codEstrutura,codmo,dataInicial1,dataFinal1){

	console.log("vou buscar os apontamentos que foram duplicados")
	
	var apontamentos = ""
	var dataDe = $("#DATA_DE").val()
	dataDe = formataDataBanco(dataDe)
	
	// MONTA O ARRAY DAS CONSTRAINTS
	var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
	var a4 = DatasetFactory.createConstraint("CODESTRUTURA",codEstrutura,codEstrutura,ConstraintType.MUST)
	var a5 = DatasetFactory.createConstraint("CODMO",codmo,codmo,ConstraintType.MUST)
	var a6 = DatasetFactory.createConstraint("DTHRINICIAL",dataInicial1,dataInicial1,ConstraintType.MUST)
	var a7 = DatasetFactory.createConstraint("DTHRFINAL",dataFinal1,dataFinal1,ConstraintType.MUST)
	var a8 = DatasetFactory.createConstraint("DATA_DE",dataDe,dataDe,ConstraintType.MUST)

	var constraints = new Array(a1,a2,a3,a4,a5,a6,a7,a8)
	
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

// VERIFICA SE A DATA SELECIONADA É MENOR OU IGUAL A DATA ATUAL
function verificaData(){
	
	console.log("vou verificar a data selecionada")
	
	var dataApont = $("#DATA_DE").val()
	dataApont = dataApont.toString() + " ;"
	console.log("data: "+dataApont)
	
	dataApont = formataDataBanco(dataApont)
	
	var dataAtual = new Date()
	//dataAtual.setDate(dataAtual.getDate()+5)
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
		
	}
	
}

// VERIFICA SE HORAS INFORMADAS ESTÃO EM CONFLITOS COM OUTRAS DA MESMA ATIVIDADE
function horasAtividade(op,idAtv,horaInicio,horaFim,seqAtv,index){
	
	console.log("op: "+op+", idAtv: "+idAtv+", horaInicio: "+horaInicio+", horaFim: "+horaFim+", seq: "+seqAtv)
	
	var ret = false
	var retAtvs = false
	
	// PERCORRE TODOS OS REGISTROS DA TABELA DE ATIVIDADES
	//$("input[id^='CODIGOPRD___']").each(function(){
		
		//var seq = $(this).attr("id").split("___")[1]
		
		var idAtvAux = $("#IDATIVIDADE___"+seqAtv).val()
		var opAux = $("#OP___"+seqAtv).val()
		var dataProgAux = $("#DATAPROGRAMADA___"+seqAtv).val()
		
		// PERCORRE TODOS OS REGISTROS
		for(var i=1; i<11;i++){
			
			var horaInicioAux = $("#HORAINICIOATV"+i+"___"+seqAtv).val()
			var horaFimAux = $("#HORAFIMATV"+i+"___"+seqAtv).val()
			var seqAux = $("#SEQ___"+seqAtv).val()	
			
			// SE NÃO É O MESMO ÍNDICE
			if(!(i==index)){
				
				console.log("não é o mesmo item da atividade")
				
				// SE HORA INÍCIO E FIM FORAM PREENCHIDAS
				if(!(horaInicioAux=="" || horaInicioAux==null || horaInicioAux==undefined) && !(horaFimAux=="" || horaFimAux==null || horaFimAux==undefined)){
					
					// SE É A MESMA ATIVIDADE E OP E MESMA DATA E NÃO É A ATIVIDADE PRINCIPAL
					//if(!(seqAtv==seqAux)){
						
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
							
							// VERIFICA SE HORAS INFORMADAS ESTÃO EM CONFLITOS COM OUTRAS DAS DEMAIS ATIVIDADES
							/*if(horasAtividadesGeral(seq,op,idAtv,horaInicio,horaFim)){
								
								console.log("horas são conflitantes com outras atividades")
								
								ret = true
								
							} else{
								// SE NÃO

								console.log("horas não são conflitantes")
								
								ret = false
								
							}*/
							
							console.log("horas não são conflitantes")
							
							ret = false
							
						} else {
							// SE NÃO, HORAS SÃO CONFLITANTES
							
							console.log("horas são conflitantes")
							
							ret = true
							
						}
						
					//}
					
				}
				
			}  
			
		}
		
	//})
	
	// SE HORAS ESTÃO EM CONFLITOS COM OUTRAS ATIVIDADES
	if(horasAtividadesGeral(seqAtv,op,idAtv,horaInicio,horaFim)){
				
		console.log("horas são conflitantes com outras atividades")
			
		retAtvs = true
				
	} else{
		// SE NÃO

		console.log("horas não são conflitantes")
		
		retAtvs = false

	}
	
	if(!(ret==false && retAtvs==false)){
		
		ret = true
		
	}
	
	return ret
	
}

// VERIFICA SE A REGERAÇÃO DE SALDOS E CUSTOS ESTÁ SENDO FEITA
function regSaldosCustos(){

	console.log("vou verificar se a regeração de saldos e custos está sendo feita")

	var dia = new Date()
	
	dia = formataDataDate(dia)
	dia = formataDataBanco(dia)
	
	console.log("dia: "+dia)
	
	// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
	var a1 = DatasetFactory.createConstraint("DIA",dia,dia,ConstraintType.MUST)
	
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

// FUNÇÃO PARA ESCONDER A OPÇÃO DE INICIAR SOLICITAÇÃO COM BASE NA ATUAL
parent.$('.wcm-all-content').bind('DOMNodeInserted', function(e){
	
   // QUANDO APARECER A TELA DE "SOLICITAÇÃO INICIADA COM SUCESSO" IRÁ ENTRAR NESSE IF
   if (e.target.id == 'message-page') {
	  
    // ESCONDE A OPÇÃO DE "INICIAR SOLICITAÇÃO COM BASE NESTA"
    parent.$('[data-reset-process-instance-id]').hide()
    
  }	
  
})

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
	
	// PERCORRE TODAS AS ATIVIDADES
	$("input[id^='CODIGOPRD___']").each(function(){
	
		var seq = $(this).attr('id').split("___")[1]

		// PERCORRE TODOS OS INTERVALOS PRODUTIVOS
		for(var i=1;i<11;i++){

			horainicio = $("#HORAINICIOATV"+i+"___"+seq).val()
			console.log(horainicio)
			horafim = $("#HORAFIMATV"+i+"___"+seq).val()
			console.log(horafim)

			var hora1 = (horainicio=="" || horainicio==" " || horainicio==null || horainicio==undefined)
			var hora2 = (horafim=="" || horafim==" " || horafim==null || horafim==undefined)
			
			console.log(hora1)
			console.log(hora2)
			
			// SE HORA INÍCIO E FIM FORAM INFORMADADS
			if( (!hora1 && !hora2)){

				var saldo = $("#SALDOTRABALHADO"+i+"___"+seq).val()
				
				saldo = parseFloat(saldo)
				soma = parseFloat(soma)
				soma = soma + saldo

			}

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
		
	// PERCORRE TODOS OS INTERVALOS PRODUTIVOS
	for(var i=1;i<11;i++){

		// PERCORRE OS HORÁRIOS PRODUTIVOS
		$("input[id^='HORAINICIOATV"+i+"___']").each(function(){
			
			var seq = $(this).attr('id').split("___")[1]
			console.log(seq)
			horainicio = $("#HORAINICIOATV"+i+"___"+seq).val()
			console.log(horainicio)
			horafim = $("#HORAFIMATV"+i+"___"+seq).val()
			console.log(horafim)

			var hora1 = (horainicio=="" || horainicio==" " || horainicio==null || horainicio==undefined)
			var hora2 = (horafim=="" || horafim==" " || horafim==null || horafim==undefined)
			
			console.log(hora1)
			console.log(hora2)
			
			if( (hora1 && !hora2) || (!hora1 && hora2 )){

				ret = false;

			}

		})

	}
	
	console.log("sem horas vazias? "+ret)
	
	return ret;

}