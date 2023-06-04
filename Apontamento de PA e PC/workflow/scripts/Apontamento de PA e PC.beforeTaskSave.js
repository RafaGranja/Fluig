var idMovBaixa = new Array()
var idMovEntrada = new Array()

// ANTES DE SALVAR A SOLICITAÇÃO 
function beforeTaskSave(colleagueId,nextSequenceId,userList){
		
	log.info("beforeTaskSave - PROCESSO DE APONTAMENTO DE PA E PC");
	
	var ativAtual = getValue("WKNumState");
	var numProcess = getValue("WKNumProces");
	var WKUser = getValue("WKUser");
	var exclusivo = hAPI.getCardValue("EXCLUSIVO1");
	var indexes = hAPI.getChildrenIndexes("ATIVIDADES");
	//var temApont = hAPI.getCardValue("TEMAPONTAMENTO")
	
	
	log.info("Solicitação: "+numProcess)
	
	log.info("vou percorrer todos os itens da tabela de atividades")
	
	log.info("a tabela tem "+indexes.length+" itens")
	
	log.info("nextSequenceId: "+nextSequenceId)
	
	//log.info("Plano já teve apontamento? "+temApont)
	
	// SE A PRÓXIMA ATIVIDADE É O EXCLUSIVO
	if(nextSequenceId=="5" && exclusivo=="FINALIZAR"){
		
		log.info("atividade vai ser finalizada")
	
		var idmovbx = ""
		var idmovSucata = ""
		var idmov = ""
			
		// PERCORRE TODOS OS REGISTROS DA TABELA DE APONTAMENTO
		for (var i = 0; i < indexes.length; i++) {
		    
			log.info("estou no item "+(i+1))
			
			var numOS = hAPI.getCardValue("OSATV___" + indexes[i])
			var ultimaAtvOp = hAPI.getCardValue("ULTIMAATVOP___" + indexes[i])
			var qtdReal = hAPI.getCardValue("QTDREALIZADA___" + indexes[i])
			var horaInicio = hAPI.getCardValue("HORAINICIOATV___" + indexes[i])
			var horaFim = hAPI.getCardValue("HORAFIMATV___" + indexes[i])
			var saldo = hAPI.getCardValue("SALDOTRABALHADO___" + indexes[i])
			var avanco = hAPI.getCardValue("AVANCO___" + indexes[i])
			var dataApont = hAPI.getCardValue("DATAAPONTAMENTO___" + indexes[i])
			var idAtv = hAPI.getCardValue("IDATIVIDADE___" + indexes[i])
			var codColigada = hAPI.getCardValue("CODCOLIGADAATV___" + indexes[i])
			var codFilial = hAPI.getCardValue("CODFILIALATV___" + indexes[i])
			var seqAtv = indexes[i]
			var codigoPrd = hAPI.getCardValue("CODIGOPRD___" + indexes[i])
			var idprd = hAPI.getCardValue("IDPRD___" + indexes[i])
			var idAtv = hAPI.getCardValue("IDATIVIDADE___" + indexes[i])
			var codOrdem = hAPI.getCardValue("OP___" + indexes[i])
			var codEstrutura = hAPI.getCardValue("CODESTRUTURAATV___" + indexes[i])
			var custoPosto = hAPI.getCardValue("CUSTOPOSTO___" + indexes[i])
			var temApont = hAPI.getCardValue("TEMAPONTAMENTO")
			var entraHoras = hAPI.getCardValue("ENTRADAHORAS")
			//var temApont = hAPI.getCardValue("HORASAPONTADAS___"+ indexes[i])
			var seqFluig = hAPI.getCardValue("SEQ___"+ indexes[i])
			var planoCorte = hAPI.getCardValue("NUMPLANOCORTE")
			
			if(temApont.indexOf(",")!=-1){
				
				temApont = temApont.toString().replace(",",".")
				temApont = parseFloat(temApont)
				
			}
			
			log.info("planoCorte: "+planoCorte+", ultimaAtvOp: "+ultimaAtvOp+", qtdReal: "+qtdReal+", saldo: "+saldo+", horaInicio: "+horaInicio+", horaFim: "+horaFim+", avanco: "+avanco+
					", dataApont: "+dataApont+", idAtv: "+idAtv+", codColigada: "+codColigada+", codFilial: "+codFilial+
					", seqAtv: "+seqAtv+", codigoPrd: "+codigoPrd+", idprd: "+idprd+", idAtv: "+idAtv+", codOrdem: "+
					codOrdem+", codEstrutura: "+codEstrutura+", numOS: "+numOS+", temApont: "+temApont+", seqFluig: "+seqFluig)
			
			var codAux = codigoPrd.substr(0,2)	
			var codloc 
			
			if(codAux=="03"){
				
				codloc = "25"
				
			}
			
			if(codAux=="04"){
				
				codloc = "27"
					
			}
			
			log.info("coloc: "+codloc)
			
			// SE SALDO E AVANCO FORAM PREENCHIDOS
			//if(!((saldo=="" || saldo==null || saldo==undefined) || (avanco=="" || avanco==null || avanco==undefined))){
				
				//log.info("saldo e avanço foram informados")
				
				if(saldo.indexOf(",")!=-1){
					
					saldo = saldo.replace(",",".")
					
					log.info("saldo após replace: "+saldo)
					
				}
				
				saldo = parseFloat(saldo).toFixed(4)
				
				custoPosto = parseFloat(custoPosto)
				
				log.info("saldo trabalhado: "+saldo)
				log.info("custo posto: "+custoPosto)
				
				custoPosto = saldo * custoPosto
				
				log.info("custoPosto calculado: "+custoPosto)
				
				/*if(ultimaAtvOp=="SIM"){
					
					log.info("é a última atividade da OP")
					
					if(!(qtdReal=="" || qtdReal==null || qtdReal==undefined)){
						
						log.info("o item "+(i+1)+" tem saldo e avanço")
						
						log.info("vou gerar o movimento de baixa dos componentes do item "+(i+1))
						
						// GERA O MOVIMENTO DE BAIXA DO ESTOQUE
						idmovbx = geraMovBaixa(numProcess, codColigada, codFilial, WKUser, idAtv, seqAtv, saldo, custoPosto, numOS, seqFluig)
									
						log.info("vou gerar o movimento de entrada do item "+(i+1))
						
						// GERA O MOVIMENTO DE ENTRADA DO ESTOQUE
						idmov = geraMovEntrada(numProcess, codColigada, codFilial, codloc, WKUser, codOrdem, idprd, qtdReal, custoPosto, seqAtv, numOS,seqFluig)
						idmov   = idmov.split(";")[1];
						
						log.info("idmov de entrada: "+idmov)
						
						// SALVA O IDMOV ENTRADA
						hAPI.setCardValue("IDMOVENTRADA___"+indexes[i],idmov)
						
					}
					
				} else {*/
					
					//log.info("não é a última atividade")
					
					//SE VAI GERAR MOVIMENTOS
					if(Number(entraHoras)==0){

						// SE NÃO TEVE APONTAMENTO AINDA
						log.info("vou gerar o movimento de baixa dos componentes do item "+(i+1))
							
						// GERA O MOVIMENTO DE BAIXA DO ESTOQUE
						idmovbx = geraMovBaixa(numProcess, codColigada, codFilial, WKUser, idAtv, seqAtv, saldo, custoPosto, numOS, seqFluig,codOrdem)
						
						log.info("vou gerar o movimento de baixa dos componentes do item "+(i+1))
						

						if(temApont=="" || temApont==null || temApont==undefined || temApont==0 || temApont=="0"){
							
							log.info("não teve apontamento")
							
							// SE É O PRIMEIRO ITEM
							if(i==0){
								
								// GERA O MOVIMENTO DE ENTRADA DE SUCATA
								idmovSucata = geraMovEntradaSucata(numProcess, codColigada, codFilial, WKUser, idAtv, seqAtv, saldo, custoPosto, numOS, seqFluig)
								
							}
							
						}

					}
					//idmov   = idmov.split(";")[1];
					
					//log.info("idmov de entrada: "+idmov)
					
					// SALVA O IDMOV ENTRADA
					//hAPI.setCardValue("IDMOVENTRADA___"+indexes[i],idmov)
				
					//log.info("vou gerar o movimento de entrada do item "+(i+1))
					
					// GERA O MOVIMENTO DE ENTRADA DO ESTOQUE
					//idmov = geraMovEntrada(numProcess, codColigada, codFilial, codloc, WKUser, codOrdem, idprd, saldo);
					//idmov   = idmov.split(";")[1];
					
					//log.info("idmov de entrada: "+idmov)
					
					// SALVA O IDMOV ENTRADA
					//hAPI.setCardValue("IDMOVENTRADA___"+indexes[i],idmov)
					
				//}
				
			//}
			
			// SE IDMOV E IDMOVBX FORAM GERADOS
			//if(!(idmovbx==""||idmovbx==null || idmovbx==undefined) && !(idmov=="" || idmov==null || idmov==undefined)){
				
				
				/*log.info("vou executar a procedure do apontamento")
				
				idmov   = idmov.split(";")[1];
				idmovbx = idmovbx.split(";")[1];
				
				var encerra  = hAPI.getCardValue("ENCERRA___" + indexes[i]);
				
				if (encerra == ""){ 
					
					encerra = "N"
					
				} else {
					
					encerra = "S"
					
				}
				
				log.info("a baixa é completa? "+encerra)
				
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
				
				*/
				
				 	
			//}
		
		}
		
		//SE VAI GERAR MOVIMENTOS
		if(Number(entraHoras)==0){
			// GERA O MOVIMENTO DE ENTRADA DO ESTOQUE
			geraMovEntrada(numProcess,WKUser)
		}

	}
	
}

// GERA O MOVIMENTO DE ENTRADA DE SUCATA
function geraMovEntradaSucata(numProcess, codColigada, codFilial, WKUser, idAtv, seqAtv, saldo, custoPosto, numOS, seqFluig){
	
	log.info("MOVIMENTO DE ENTRADA DA SUCATA")
	
	log.info("Parâmetros: numProcess: "+numProcess+", codColigada: "+codColigada+", codFilial: "+codFilial+", WKUser: "+WKUser+", idAtv: "+idAtv+", seqAtv: "+seqAtv+
			" saldo: "+saldo+", custoPosto: "+custoPosto+", numOS: "+numOS+", seqFluig: "+seqFluig)
	
	var NOME_DATASERVER = "MovMovimentoTBCData" 	  
	var usuario = "fluig"
	var senha = "zaq12wsxZAQ!@WSX" 
	var authService = getWebService(usuario, senha) 
	var context = "CodUsuario=fluig;CodSistema=T;CodColigada="+codColigada
	var nseq = 0
	var ret  = ""
	
	var indexes = hAPI.getChildrenIndexes("ATIVIDADES")
	
	log.info("vou percorrer todos os itens da tabela de componentes")
	
	log.info("a tabela tem "+indexes.length+" itens")
	
	var produtosLote = new Array()
	var codLocGeral = new Array()

	var codloc = "26"
	
	log.info("vou buscar todos os atividades")
	
	// PERCORRE TODOS OS REGISTROS DA TABELA DAS ATIVIDADES
	for (var i = 0; i < indexes.length; i++){
		
		/*var qtde = hAPI.getCardValue("QTDEUTG___" + indexes[i])
		var idprd = hAPI.getCardValue("IDPRDCOMPG___"+indexes[i])
		var seqAtvComp = hAPI.getCardValue("SEQATV___" + indexes[i])
		var codLocComp = hAPI.getCardValue("CODLOCCOMPG___" + indexes[i])
		var seqComp = hAPI.getCardValue("SEQCOMP___" + indexes[i])*/
		
		var seqAtvComp = hAPI.getCardValue("SEQATV___" + indexes[i])
		var qtde = hAPI.getCardValue("QTDESUCATA___" + indexes[i])
		var idprd = hAPI.getCardValue("IDPRDSUCATA___"+indexes[i])
		var copia = hAPI.getCardValue("COPIA___" + indexes[i])
		
		log.info("qtde: "+qtde)
		
		// SE FOI PREENCHIDA
		if(!(qtde=="" || qtde==null || qtde==undefined)){
			
			if(qtde.indexOf(",")!=-1){
				
				qtde = qtde.toString().replace(",",".")
				
			}
			
			qtde = parseFloat(qtde)
			
			log.info("qtde após parse: "+qtde)
			
			if(i==0 && !(qtde==0)){
			
			// SE ITEM PERTENCE A ATIVIDADE QUE ESTÁ SENDO APONTADA
			//if(seqAtv==seqAtvComp && !(copia=="S") && !(qtde=="" || qtde==null || qtde==undefined)){
				
				log.info("achei sucata na atividade")
				
				//log.info("vou dar baixa nos componentes de codloc "+codLocComp)
				
				var XML = 
				    "<MovMovimento >" +   
					"  <TMOV>" +   
					"	 <CODUSUARIO>"+usuario+"</CODUSUARIO> "+
					"    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" +   
					"    <IDMOV>-1</IDMOV>" +   
					"    <CODFILIAL>" + codFilial + "</CODFILIAL>" +   
					"    <CODLOC>" + codloc + "</CODLOC>" +   
					"    <CODLOCENTREGA>" + codloc + "</CODLOCENTREGA>" +   
					"    <CODLOCDESTINO>" + codloc + "</CODLOCDESTINO>" +   
					"    <CODTMV>1.2.29</CODTMV>" +   
					"    <TIPO>A</TIPO>" +   
					"    <DATAEMISSAO>"+dataAtualFormatada()+"</DATAEMISSAO>" +   
					"    <DATABASEMOV>"+dataAtualFormatada()+"</DATABASEMOV>" +   
					"    <DATAMOVIMENTO>"+dataAtualFormatada()+"</DATAMOVIMENTO>" +   
					"    <CODFILIALDESTINO>" + codFilial + "</CODFILIALDESTINO>" +   
					"    <DATALANCAMENTO>"+dataAtualFormatada()+"</DATALANCAMENTO>" +
					"	 <CODCCUSTO>"+numOS+"</CODCCUSTO> "+
					"  </TMOV>" +  
					
					"  <TNFE>" +   
					"    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" +   
					"    <IDMOV>-1</IDMOV>" +   
					"  </TNFE>" +   
					"  <TMOVFISCAL>" +   
					"    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" +   
					"    <IDMOV>-1</IDMOV>" +   
					"  </TMOVFISCAL>" 
		
				qtde = parseFloat(qtde)
				qtde = qtde.toFixed(4)
				
				// CALCULA O PREÇO UNITÁRIO DO PRODUTO
				var precoUnit = hAPI.getCardValue("CUSTOSUCATA___"+indexes[i])
				
				var valorTotal = precoUnit * qtde
				valorTotal = valorTotal.toFixed(4)
				
				log.info("(antes do replace) valor total item: "+valorTotal)
				log.info("(antes do replace) preco unit: "+precoUnit)
				log.info("(antes do replace) qtde: "+qtde)
				
				precoUnit = precoUnit.toString().replace(".",",")
				valorTotal = valorTotal.toString().replace(".",",")
				qtde = qtde.toString().replace(".",",")
				
				log.info("preco unit: "+precoUnit)
				log.info("valor total: "+valorTotal)
				log.info("qtde: "+qtde)
				
				XML = XML +    
					"  <TITMMOV>" +   
					"    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" +   
					"    <IDMOV>-1</IDMOV>" +   
					"    <NSEQITMMOV>1</NSEQITMMOV>" +   
					"    <CODFILIAL>" + codFilial + "</CODFILIAL>" +   
					"    <NUMEROSEQUENCIAL>1</NUMEROSEQUENCIAL>" +   
					"    <IDPRD>"+idprd+"</IDPRD>" +
					"    <QUANTIDADE>"+qtde+"</QUANTIDADE>" +   
					"    <PRECOUNITARIO>"+precoUnit+"</PRECOUNITARIO>" +   
					"    <DATAEMISSAO>"+dataAtualFormatada()+"</DATAEMISSAO>" +   
					"    <CODLOC>" + codloc + "</CODLOC>" +
					"	 <VALORTOTALITEM>"+valorTotal+"</VALORTOTALITEM> "+
					"	 <CODCCUSTO>"+numOS+"</CODCCUSTO> "+
					"  </TITMMOV>"
			
					// GERAR LOTE  
					//var idLote = geraLote(codColigada, idprd, codOrdem)
					
					// APONTAR A ENTRADA NO LOTE
					/*XML = XML +
				      "  <TITMLOTEPRD>" + 
				      "    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" + 
				      "    <IDMOV>-1</IDMOV>" +   
				      "    <NSEQITMMOV>1</NSEQITMMOV>" +
				      "    <IDLOTE>"+idLote+"</IDLOTE>" +    
				      "	 	<QUANTIDADE2>"+qtde+"</QUANTIDADE2>" + 
				      "  </TITMLOTEPRD>"*/
				      
					XML = XML +    
					   "  <TMOVCOMPL>" +   
					   "    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" +      
					   "    <IDMOV>-1</IDMOV>" +   
					   "    <NUMFLUIG>"+numProcess+"</NUMFLUIG>" +
					   "    <USERFLUIG>"+WKUser+"</USERFLUIG>" +		   
					   "  </TMOVCOMPL>"+   
					   "</MovMovimento>"
				   
				log.info("Fluig "+numProcess+" Gerar Movimento de Entrada de Sucata.")
				log.info("Contexto do movimento: "+context)	
				
			    log.info("XML do movimnto é "+XML)
			   
			    try{
					   
				    var result = new String(authService.saveRecord(NOME_DATASERVER, XML, context))
			
				    log.info("Fluig "+numProcess+".integracao com RM resultado "+result)
				   				   
				    ret = result
				   
				    ret = result
					log.info("result da baixa: "+result)
					
					result = result.split(";")[1]
					
					// SALVA O IDMOVBAIXA GERADO PARA TODOS OS COMPONENTES
					//salvaIdMovBaixa(indexes,seqAtv,codLocComp,result)
					
				    hAPI.setCardValue("IDMOVSUCATA___"+indexes[i],result)
				    
					log.info("salvei o IDMOV: "+result)
				   			
				    if (result.length > 50){
				    	
				    	// DELETA TODOS OS MOVIMENTOS QUE FORAM GERADOS
				    	deletaMovimentos()
					   
				    	var mensagemErro = result 
				    	throw mensagemErro
					 
				    }
					   
			    } catch(e){
				    	
			    	// DELETA TODOS OS MOVIMENTOS QUE FORAM GERADOS
			    	deletaMovimentos()
			    	
			        if (e == null)  e = "Erro desconhecido!" 
			        
			        var mensagemErro = "Ocorreu um erro ao salvar dados no RM (geraMovEntrada - coligada "+codColigada+" ): " + e
			        
			        throw mensagemErro  
				    
			    }
			
			}
			
		}
		
	}
	
	return ret
	
}

// GERA O MOVIMENTO DE BAIXA DO ESTOQUE
function geraMovBaixa(numProcess, codColigada, codFilial, WKUser, idAtv, seqAtv, saldo, custoPosto, numOS, seqFluig,codOrdem){
	
	log.info("MOVIMENTO DE BAIXA DO ESTOQUE")
	
	log.info("Parâmetros: numProcess: "+numProcess+", codColigada: "+codColigada+", codFilial: "+codFilial+", WKUser: "+WKUser+", idAtv: "+idAtv+", seqAtv: "+seqAtv+
			" saldo: "+saldo+", custoPosto: "+custoPosto+", numOS: "+numOS+", seqFluig: "+seqFluig+", codOrdem: "+codOrdem)
	
	var NOME_DATASERVER = "MovMovimentoTBCData" 
	//var usuario = "luiz.lunardi" 
    //var senha = "@Pg24221717"  		   
	var usuario = "fluig"
	var senha = "zaq12wsxZAQ!@WSX" 
	var authService = getWebService(usuario, senha) 
	var context = "CodUsuario=fluig;CodSistema=T;CodColigada="+codColigada
	var nseq = 0
	var ret  = ""
	
	var indexes = hAPI.getChildrenIndexes("COMPONENTESGERAL")
	
	log.info("vou percorrer todos os itens da tabela de componentes")
	
	log.info("a tabela tem "+indexes.length+" itens")
	
	var produtosLote = new Array()
	var codLocGeral = new Array()

	log.info("vou buscar todos os componentes")

	// PERCORRE TODOS OS REGISTROS DA TABELA DE COMPONENTES GERAL
	for (var i = 0; i < indexes.length; i++){
		
		var qtde = hAPI.getCardValue("QTDEUTG___" + indexes[i])
		var idprd = hAPI.getCardValue("IDPRDCOMPG___"+indexes[i])
		var seqAtvComp = hAPI.getCardValue("SEQATV___" + indexes[i])
		var codLocComp = hAPI.getCardValue("CODLOCCOMPG___" + indexes[i])
		var seqComp = hAPI.getCardValue("SEQCOMP___" + indexes[i])
			
		// SE ITEM PERTENCE A ATIVIDADE QUE ESTÁ SENDO APONTADA
		//if(seqAtv==seqAtvComp){
		if(seqFluig==seqAtvComp){
		
			log.info("achei componente da atividade")
			
			// SE QUANTIDADE DO COMPONENTE FOI INFORMADA
			//if(!(qtde=="" || qtde==null || qtde==undefined || qtde=="null")){
				
				log.info("achei componente do item na tabela de componentes gerais que tem quantidade apontada")
				
				log.info("IDPRD componente: "+idprd+", qtde: "+qtde)
				
				// SE LOCAL DE ESTOQUE AINDA NÃO FOI AGRUPADO
				//if(!(codLocGeral.includes(codLocComp))){
				
				//if(codLocGeral.indexOf(codLocComp)==-1){
					
					log.info("vou dar baixa nos componentes de codloc "+codLocComp)
					
					var XML =
				    "<MovMovimento >" +   
					"  <TMOV>" +   
					"    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" +   
					"    <IDMOV>-1</IDMOV>" +   
					"    <CODFILIAL>" + codFilial + "</CODFILIAL>" +   
					"    <CODLOC>" + codLocComp + "</CODLOC>" +   
					"    <CODLOCENTREGA>" + codLocComp + "</CODLOCENTREGA>" +   
					"    <CODLOCDESTINO>" + codLocComp + "</CODLOCDESTINO>" +   
					//"    <CODTMV>2.2.46</CODTMV>" +
					"    <CODTMV>2.2.18</CODTMV>" +
					"    <TIPO>A</TIPO>" +   
					"    <DATAEMISSAO>"+dataAtualFormatada()+"</DATAEMISSAO>" +   
					"    <DATABASEMOV>"+dataAtualFormatada()+"</DATABASEMOV>" +   
					"    <DATAMOVIMENTO>"+dataAtualFormatada()+"</DATAMOVIMENTO>" +   
					"    <CODFILIALDESTINO>" + codFilial + "</CODFILIALDESTINO>" +   
					"    <DATALANCAMENTO>"+dataAtualFormatada()+"</DATALANCAMENTO>" + 
					"	 <CODCCUSTO>"+numOS+"</CODCCUSTO> "+
					"	 <CAMPOLIVRE1>"+codOrdem+"</CAMPOLIVRE1>"+
					"	 <CAMPOLIVRE2>"+idAtv+"</CAMPOLIVRE2>"+
					"  </TMOV>" +  
					
					"  <TNFE>" +   
					"    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" +   
					"    <IDMOV>-1</IDMOV>" +   
					"  </TNFE>" +   
					"  <TMOVFISCAL>" +   
					"    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" +   
					"    <IDMOV>-1</IDMOV>" +   
					"  </TMOVFISCAL>" 

					var auxXML = componentesCodLoc(codColigada, codFilial, indexes, seqAtv, idAtv, codLocComp, saldo, custoPosto, numOS, seqFluig)
					
					XML = XML +""+auxXML 
					
					XML = XML +    
					   "  <TMOVCOMPL>" +   
					   "    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" +      
					   "    <IDMOV>-1</IDMOV>" +   
					   "    <NUMFLUIG>"+numProcess+"</NUMFLUIG>" +
					   "    <USERFLUIG>"+WKUser+"</USERFLUIG>" +		   
					   "  </TMOVCOMPL>"+   
					   "</MovMovimento>"
					   
					log.info( "Fluig "+numProcess+" Gerar Movimento Baixa Atualizada.")
					log.info( "Contexto do movimento: "+context)	
					log.info( "XML do movimento de BAIXA do codloc "+codLocComp+" é: "+XML)
					
					try{
						
						var result = new String(authService.saveRecord(NOME_DATASERVER, XML, context))
						log.info("Fluig "+numProcess+". Integração com RM - BAIXA DE MATERIAL - resultado "+result)
						ret = result
						log.info("result da baixa: "+result)
						
						result = result.split(";")[1]
						
						// SALVA O IDMOVBAIXA GERADO PARA TODOS OS COMPONENTES
						salvaIdMovBaixa(indexes,seqAtv,codLocComp,result,seqFluig)
						
						log.info("salvei o IDMOV: "+result)
						
						//hAPI.setCardValue("IDMOVBAIXA",result);
						
					   	if (result.length > 50){
					   		
					   		// DELETA TODOS OS MOVIMENTOS QUE FORAM GERADOS
					    	deletaMovimentos()
					    	
					   		var mensagemErro = result
					   		throw mensagemErro
					   		
					   	}
					   	
				    } catch (e){  
				    	
				    	// DELETA TODOS OS MOVIMENTOS QUE FORAM GERADOS
				    	deletaMovimentos()
				    	
				        if (e == null)  e = "Erro desconhecido!"  
				        var mensagemErro = "Ocorreu um erro ao salvar dados no RM (geraMovBaixa coligada "+codColigada+" ): " + e  
				        
				        throw mensagemErro;  
				        
				    }
					
					// SALVA O CODLOC QUE FOI USADO
					//codLocGeral.push(codLocComp)
						
				//}
			
			//}
			
		}
		
	}
	
	return ret
  
}

// BUSCA TODOS OS COMPONENTES DA ATIVIDADE EM QUESTÃO QUE FORAM APONTADOS E QUE TEM O MESMO CODLOC
function componentesCodLoc(codColigada, codFilial, indexes, seqAtv, idAtv, codLocCompAux, saldo, custoPosto, numOS, seqFluig){
	
	var nseq = 0
	var XML = ""
		
	log.info("vou buscar todos os componentes que foram apontados da atividade seq "+seqAtv+" e com codLoc "+codLocCompAux)
	
	log.info("codColigada: "+codColigada+", codFilial: "+codFilial+", idAtv: "+idAtv+", codLocCompAux: "+codLocCompAux+", saldo: "+saldo+", custoPosto: "+custoPosto+", numOS: "+numOS)
	
	log.info("vou percorrer todos os componentes")
	
	// PERCORRE TODOS OS COMPONENTES
	for(var k=0; k<indexes.length; k++){
		
		var idprd = hAPI.getCardValue("IDPRDCOMPG___"+indexes[k])
		var seqAtvComp = hAPI.getCardValue("SEQATV___" + indexes[k])
		var codLocComp = hAPI.getCardValue("CODLOCCOMPG___" + indexes[k])
		var qtde = hAPI.getCardValue("QTDEUTG___" + indexes[k])
		var idLote = hAPI.getCardValue("IDLOTECOMPG___" + indexes[k])
		var custoMedio = hAPI.getCardValue("CUSTOMEDIOCOMPG___" + indexes[k])
		
		log.info("idprd: "+idprd+", seqAtvComp: "+seqAtvComp+", codLocComp: "+codLocComp+", qtde: "+qtde+", idLote: "+idLote+", custoMedio: "+custoMedio)
		
		// SE ITEM PERTENCE A ATIVIDADE QUE ESTÁ SENDO APONTADA
		//if(seqAtv==seqAtvComp){
		if(seqFluig==seqAtvComp){
		
			log.info("seqAtv "+seqAtv+" é igual a seqAtvComp "+seqAtvComp)
			
			// SE QUANTIDADE DO COMPONENTE FOI INFORMADA
			//if(!(qtde=="" || qtde==null || qtde==undefined || qtde=="null")){
	  	
				log.info("qtde foi apontada: "+qtde)
				
				// SE O CODLOC É IGUAL
				//if(codLocComp==codLocCompAux){
					
					log.info("codLocComp "+codLocComp+" é igual a codLocCompAux "+codLocCompAux)
					
					log.info("idprd: "+idprd+" é um componente da atividade "+seqAtv+" que está sendo apontada e tem quantidade informada "+qtde)
					
					// BUSCA O TOTAL DA QUANTIDADE DO COMPONENTE QUE ESTÁ SENDO APONTADO
					//var qtde = buscaQtdeTotal(idprd,indexes, indexes.length, seqAtv) 
					//var qtde = hAPI.getCardValue("QTDEUTG___" + indexes[k])
					
					// SE QUANTIDADE TEM VÍRGULA
					/*if(qtde.indexOf(",")!=-1){
						
						qtde = qtde.toString().replace(",",".")
						
					}
					
					qtde = parseFloat(qtde)
					
					*/
					
					
					/*var precoUnit = calculaPrecoComp(custoMedio,qtde,saldo,custoPosto)
					
					var precoUnit = custoMedio * qtde
					
					precoUnit = precoUnit.toFixed(4).toString()
					
					if(precoUnit.indexOf(".")!=-1){
						
						precoUnit = precoUnit.replace(".",",")
						
					}
					
					log.info("precoUnit para o XML: "+precoUnit)*/
					
					// SE QTDE TEM PONTO
					if(qtde.indexOf(".")!=-1){
						
						qtde = qtde.replace(".",",")
						
					}
					
					custoMedio = parseFloat(custoMedio).toFixed(4).toString()
					
					if(custoMedio.indexOf(".")!=-1){
						
						log.info("custoMedio: "+custoMedio)
						
						custoMedio = custoMedio.replace(".",",")
						
						log.info("custoMedio após replace: "+custoMedio)
						
					}
			
					log.info("qtde para o XML: "+qtde)
					
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
					"    <PRECOUNITARIO>"+custoMedio+"</PRECOUNITARIO>" +   
					"    <DATAEMISSAO>"+dataAtualFormatada()+"</DATAEMISSAO>" +   
					"    <CODLOC>" + codLocComp + "</CODLOC>" +   
					"	 <CODCCUSTO>"+numOS+"</CODCCUSTO> "+
					"  </TITMMOV>"
					
					XML = XML +
				    "  <TITMLOTEPRD>" + 
				    "    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" + 
				    "    <IDMOV>-1</IDMOV>" +   
				    "    <NSEQITMMOV>"+nseq+"</NSEQITMMOV>" +
				    "    <IDLOTE>"+idLote+"</IDLOTE>" +    
				    "	 <QUANTIDADE2>"+qtde+"</QUANTIDADE2>" + 
				    "  </TITMLOTEPRD>"
					
					// BUSCA TODOS OS LOTES DO PRODUTO E QUANTIDADES CONSUMIDAS
					//XML = XML + montarXmlLotes(idprd, indexes, indexes.length, codColigada, nseq, seqAtv)
					
					XML = XML +   
					"  <TITMMOVCOMPL>"+
					"    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" +   
					"    <IDMOV>-1</IDMOV>" +  
					"    <NSEQITMMOV>"+nseq+"</NSEQITMMOV>" +   
					"    <IDATIVIDADE>"+idAtv+"</IDATIVIDADE>"+
					"  </TITMMOVCOMPL>"
					
					// INCLUI O IDPRD NO ARRAY DOS PRODUTOS
					//produtosLote.push(idprd)
					
				//}
							
			}
		
		//}
		
	}
	
	console.log("XML da TITMOV: "+XML)
	
	return XML
	
}

// CALCULA O PRECO UNITARIO DO COMPONENTE
function calculaPrecoComp(custoMedio,qtde,saldo,custoPosto){
	
	log.info("vou calcular o preço do componente")
	log.info("custoMedio: "+custoMedio+", qtde: "+qtde+", saldo: "+saldo+", custoPosto: "+custoPosto)
	
	if(qtde.indexOf(",")!=-1){
		
		qtde = qtde.replace(",",".")
		
	}
	
	qtde = parseFloat(qtde)
	
	var precoUnit = (saldo * custoPosto) + (qtde * custoMedio)
	
	log.info("precoUnit: "+precoUnit)
	
	return precoUnit
	
}

// DELETA TODOS OS MOVIMENTOS QUE FORAM GERADOS
function deletaMovimentos(){
	
	log.info("vou deletar todos os movimentos que foram gerados devido ao erro em algum movimento de baixa, entrada e sucata")
	
	var indexesMovBaixa = hAPI.getChildrenIndexes("COMPONENTESGERAL")
	var indexesMovEntrada = hAPI.getChildrenIndexes("ATIVIDADES");
	var movimentos = new Array()
	
	log.info("vou percorrer todos os itens da tabela de movimentos de baixa")
	
	log.info("a tabela tem "+indexesMovBaixa.length+" itens")
	
	log.info("vou buscar todos os movimentos de baixa")

	// PERCORRE TODOS OS REGISTROS DOS MOVIMENTOS DE BAIXA
	/*for (var i = 0; i < indexesMovBaixa.length; i++){

		var idmov = hAPI.getCardValue("IDMOVBAIXA___" + indexesMovBaixa[i])
		var codColigada = "1"
		
		log.info("idmov baixa: "+idmov)
		
		// SE IDMOV DE BAIXA EXISTE E AINDA NÃO FOI DELETADO
		if( !(idmov=="" || idmov==null || idmov==undefined) && (movimentos.indexOf(idmov)==-1) ){
			
			log.info("vou deletar o idmov "+idmov)
			
			// DELETA O IDMOV	
			deletaIdMov(idmov,codColigada)
			
			log.info("idmov de baixa "+idmov+" deletado com sucesso")
			
			// SALVA MOVIMENTO DELETADO
			movimentos.push(idmov)
			
		}
		
	}*/
	
	log.info("idMovBaixa: "+idMovBaixa)
	
	// PERCORRE TODOS OS REGISTROS DOS MOVIMENTOS DE BAIXA
	for (var i = 0; i < idMovBaixa.length; i++){
		
		var idmov = idMovBaixa[i]
		var codColigada = "1"
		
		log.info("idmov baixa: "+idmov)
		
		// SE IDMOV EXISTE E AINDA NÃO FOI DELETADO
		if( !(idmov=="" || idmov==null || idmov==undefined) && (movimentos.indexOf(idmov)==-1) ){
			
			log.info("vou deletar o idmov "+idmov)
			
			// DELETA O IDMOV	
			deletaIdMov(idmov,codColigada)
			
			log.info("idmov de baixa "+idmov+" deletado com sucesso")
			
			// SALVA MOVIMENTO DELETADO
			movimentos.push(idmov)
			
		}
		
	}
	
	log.info("a tabela tem "+indexesMovEntrada.length+" itens")
	
	log.info("vou buscar todos os movimentos de entrada que foram gerados")
	
	// PERCORRE TODOS OS REGISTROS DOS MOVIMENTOS DE ENTRADA
	for (var i = 0; i < indexesMovEntrada.length; i++){
		
		var idmov = hAPI.getCardValue("IDMOVENTRADA___" + indexesMovEntrada[i])
		var idmovSucata = hAPI.getCardValue("IDMOVSUCATA___" + indexesMovEntrada[i])
		
		var codColigada = "1"
		
		log.info("idmov de entrada: "+idmov)
		log.info("idmov de sucata: "+idmovSucata)
		
		// SE IDMOV DE ENTRADA EXISTE E AINDA NÃO FOI DELETADO
		if( !(idmov=="" || idmov==null || idmov==undefined) && (movimentos.indexOf(idmov)==-1) ){
			
			log.info("vou deletar o idmov "+idmov)
			
			// DELETA O IDMOV	
			deletaIdMov(idmov,codColigada)
			
			log.info("idmov de entrada "+idmov+" deletado com sucesso")
			
			// SALVA MOVIMENTO DELETADO
			movimentos.push(idmov)
			
		}
		
		// SE IDMOV DE SUCATA EXISTE E AINDA NÃO FOI DELETADO
		if( !(idmovSucata=="" || idmovSucata==null || idmovSucata==undefined) && (movimentos.indexOf(idmovSucata)==-1) ){
			
			log.info("vou deletar o idmov "+idmovSucata)
			
			// DELETA O IDMOV	
			deletaIdMov(idmovSucata,codColigada)
			
			log.info("idmov de sucata "+idmovSucata+" deletado com sucesso")
			
			// SALVA MOVIMENTO DELETADO
			movimentos.push(idmovSucata)
			
		}
		
	}
	
}

// DELETA O IDMOV
function deletaIdMov(idmov,codColigada){
	
	log.info("vou executar o webservice para deletar o idmov "+idmov+" da coligada "+codColigada)
	
	var NOME_DATASERVER = "MovMovimentoTBCData" 	
	var usuario         = "fluig"
	var senha           = "zaq12wsxZAQ!@WSX" 	
	var authService = getWebService(usuario, senha) 
	var context = "CodUsuario=fluig;CodSistema=T;CodColigada="+codColigada
	var numProcess = getValue("WKNumProces");
	var pk = ""+codColigada+";"+idmov
	
	log.info("pk: "+pk)
	
	try{
		
		var result = new String(authService.deleteRecordByKey(NOME_DATASERVER, pk, context))
		log.info("Fluig "+numProcess+". Movimento "+idmov+" deletado. "+result)
				
	   	if (result.length > 50){
	   		
	   		var mensagemErro = result
	   		throw mensagemErro
	   		
	   	}
	   	
    } catch (e){  
    
        if (e == null)  e = "Erro desconhecido!"  
        var mensagemErro = "Ocorreu um erro ao deletar o movimento (deletaIdMov coligada "+codColigada+" ): " + e  
        
        throw mensagemErro;  
        
    }
	
}

// SALVA O IDMOVBAIXA GERADO PARA TODOS OS COMPONENTES
function salvaIdMovBaixa(indexes,seqAtv,codLocCompAux,idMov,seqFluig){
	
	log.info("vou salvar o idMov "+idMov+" no componentes de codLoc "+codLocCompAux+" da atividade "+seqAtv)
	
	// PERCORRE TODOS OS COMPONENTE
	for(var j=0; j<indexes.length; j++){
		
		var idprd = hAPI.getCardValue("IDPRDCOMPG___"+indexes[j])
		var idLote = hAPI.getCardValue("IDLOTECOMPG___"+indexes[j])
		var seqAtvComp = hAPI.getCardValue("SEQATV___" + indexes[j])
		var codLocComp = hAPI.getCardValue("CODLOCCOMPG___" + indexes[j])
		var qtde = hAPI.getCardValue("QTDEUTG___" + indexes[j])
		//var seqCompAtv = hAPI.getCardValue("SEQCOMP___" + indexes[j])
		//var seqCompGeral = hAPI.getCardValue("SEQCOMPGERAL___" + indexes[j])
		
		log.info("idprd: "+idprd+", seqAtvComp: "+seqAtvComp+", codLocComp: "+codLocComp+", qtde: "+qtde+", idLote: "+idLote)
		
		log.info("idprd: "+idprd+" ainda não foi dado baixa")
		
		// SE ITEM PERTENCE A ATIVIDADE QUE ESTÁ SENDO APONTADA
		//if(seqAtv==seqAtvComp){
		if(seqFluig==seqAtvComp){
					
			log.info("seqAtv "+seqFluig+" é igual a seqAtvComp "+seqAtvComp)
			log.info("idprd: "+idprd+" pertence a seqAtv "+seqFluig)
			
			// SE QUANTIDADE DO COMPONENTE FOI INFORMADA
			if(!(qtde=="" || qtde==null || qtde==undefined || qtde=="null")){
				
				log.info("qtde foi informada "+qtde)
				
				//log.info("seqCompAtv: "+seqCompAtv+" tem quantidade apontada")
				
				// SE O CODLOC É IGUAL
				//if(codLocComp==codLocCompAux){
					
					log.info("vou salvar o idmov "+idMov+" no item "+indexes[j]+" da tabela componentes da atividade "+seqAtvComp)
					
					//log.info("IDMOVBAIXA___"+seqCompGeral)
					//log.info("IDMOVBAIXA___"+indexes[j])
					
					//seqCompGeral = seqCompGeral.toString()
					
					idMov = idMov.toString()
					
					//log.info("campo que vou salvar IDMOVBAIXA___"+seqCompGeral)
					
					//log.info("o camp seqAtvComp é "+hAPI.getCardValue("SEQATV___" + seqCompGeral))
					
					// SALVA O IDMOV GERADO
					hAPI.setCardValue("IDMOVBAIXA___"+indexes[j], idMov)
					hAPI.setCardValue("BAIXAID___"+indexes[j], idMov)
					
					//log.info("IDMOV salvo: "+hAPI.getCardValue("IDMOVBAIXA___"+seqCompGeral))
					
					log.info("salvei o idMov "+idMov+" no campo IDMOVBAIXA___"+indexes[j])
					
				    idMovBaixa.push(idMov)

					/*log.info("vou gerar a tabela")
					
					var childData = new java.util.HashMap()
					
					log.info("vou salvar os registros")
					
			        childData.put("IMIDPRDCOMP",idprd)
			        childData.put("IMIDLOTE", idLote)
			        childData.put("IMQTDEUT", qtde)
			        childData.put("IMSEQATV", seqAtv)
			        childData.put("IMSEQCOMP", '')
			        childData.put("IMIDMOV", idMov)
			        
			        log.info("vou salvar tudo")
			        
			        //hAPI.addCardChild("IDMOVCOMPONENTESPAPC", childData)
			        
			        log.info("salvei o idmov na tabela de IDMOVCOMPONENTES")*/
					
				//}
				
			}
			
		}
		
	}
	
}

// BUSCA TODOS OS LOTES DOS COMPONENTES E QUANTIDADES CONSUMIDAS
function montarXmlLotes(idprd, indexes,indexesTam, codColigada, nseq, seqAtv, seqFluig){
	
	var XML = ""
	
	log.info("Vou monntar XML para os lotes")
		
	// PERCORRE TODOS OS REGISTROS DA TABELA DE COMPONENTES
	for(var i=0; i<indexesTam; i++){
		
		var idLote = hAPI.getCardValue("IDLOTECOMPG___" + indexes[i])
		var qtde = hAPI.getCardValue("QTDEUTG___" + indexes[i])
		var idPrdComp = hAPI.getCardValue("IDPRDCOMPG___" + indexes[i]) 
		var seqAtvComp = hAPI.getCardValue("SEQATV___" + indexes[i])

		// SE ITEM PERTENCE A ATIVIDADE QUE ESTÁ SENDO APONTADA
		//if(seqAtv==seqAtvComp){
		if(seqFluig==seqAtvComp){
			
			// SE É O MESMO PRODUTO E QUANTIDADE FOI CONSUMIDA
			if(idprd==idPrdComp && !(qtde=="" || qtde==null || qtde==undefined)){
				
				// SE QUANTIDADE TEM VÍRGULA
				/*if(qtde.indexOf(",")!=-1){
					
					qtde = qtde.toString().replace(",",".")
					
				}*/
				
				// SE QUANTIDADE TEM VÍRGULA
				if(qtde.indexOf(".")!=-1){
					
					qtde = parseFloat(qtde)
					
					qtde = qtde.toString().replace(".",",")
					
				}
				
				//qtde = parseFloat(qtde)
				
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
		
	}
	
	log.info("XML após para os lotes: ")
	log.info(XML)
	
	return XML
	
}

// CALCULA O PREÇO UNITÁRIO DO PRODUTO
function calculaPreco(codOrdem,codColigada,codFilial,qtde){
	
	log.info("vou calcular o preço unitário")
	
	log.info("codOrdem: "+codOrdem+", codColigada: "+codColigada+", codFilial: "+codFilial)
	
	var valores = new Array()
	
	var a1 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST);
 	var a2 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST);
 	var a3 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST);
 	
	var constraints = new Array(a1,a2,a3);
	
 	var dataset = DatasetFactory.getDataset("dsCalculaPrecoUnitarioOP",null,constraints,null);
 	var soma = dataset.getValue(0, "SOMA_CUSTO")
 	var qtdeEfetivada = dataset.getValue(0, "QTDE")
 	
 	valores.push(soma)
	
	var precoUnit = valores[0]
	
	log.info("soma consulta: "+precoUnit)
	
	//var qtdeEfetivada = valores[1]
	
	log.info("qtdeEfetivada consulta: "+qtdeEfetivada)
	
 	qtdeEfetivada = parseFloat(qtdeEfetivada)
 	
 	//precoUnit = parseFloat(precoUnit)
 	
 	qtde = qtde + qtdeEfetivada
 	
 	valores.push(qtde)
 	
 	log.info("qtde (Efetivada e apontada): "+qtde)
 	
 	//precoUnit = precoUnit/qtde
 	
 	//log.info("preço unitário calculado: "+precoUnit)
 	
 	//valores.push(precoUnit)
 	
 	return valores
 	
}

// BUSCA O TOTAL DA QUANTIDADE DO COMPONENTE QUE ESTÁ SENDO APONTADO
function buscaQtdeTotal(idprd, indexes,indexesTam, seqAtv, seqFluig){
	
	var qtdeTotal = 0
	
	log.info("Vou buscar a qtdeTotal do item idprd: "+idprd)
	
	// PERCORRE TODOS OS REGISTROS DA TABELA DE COMPONENTES
	for(var i=0; i<indexesTam; i++){
		
		var idprdComp = hAPI.getCardValue("IDPRDCOMPG___" + indexes[i])
		var qtdeComp = hAPI.getCardValue("QTDEUTG___" + indexes[i])
		var seqAtvComp = hAPI.getCardValue("SEQATV___" + indexes[i])

		// SE ITEM PERTENCE A ATIVIDADE QUE ESTÁ SENDO APONTADA
		//if(seqAtv==seqAtvComp){
		if(seqFluig==seqAtvComp){
				
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
			
	}
	
	log.info("a qtdeTotal de idprd: "+idprd+" é "+qtdeTotal)
	
	return qtdeTotal
	
} 

// GERA O MOVIMENTO DE ENTRADA DE ESTOQUE
//function geraMovEntrada(numProcess, codColigada, codFilial, codloc, WKUser, codOrdem, idprd, qtde, custoPosto, seqAtv, numOS, seqFluig){
function geraMovEntrada(numProcess, WKUser){
	
	log.info("MOVIMENTO DE ENTRADA DO ESTOQUE")
	
	log.info("Parâmetros: numProcess: "+numProcess+", WKUser: "+WKUser)
	
	var NOME_DATASERVER = "MovMovimentoTBCData"  
	//var usuario = "luiz.lunardi" 
    //var senha = "@Pg24221717"  		
	var usuario = "fluig"
	var senha = "zaq12wsxZAQ!@WSX" 
	var authService = getWebService(usuario, senha) 
	var nseq = 0
	var ret  = ""
	
	var indexes = hAPI.getChildrenIndexes("MODAL_OPS")
	
	log.info("a tabela tem "+indexes.length+" itens")
	
	log.info("vou percorrer as OP's do plano")
	
	// PERCORRE TODOS OS REGISTROS DA TABELA DAS ATIVIDADES
	for (var i = 0; i < indexes.length; i++){
		
		var codColigada = hAPI.getCardValue("CODCOLIGADA_MODAL___"+indexes[i])
		var codFilial = hAPI.getCardValue("CODFILIAL_MODAL___"+indexes[i])
		var codOrdem = hAPI.getCardValue("OP_MODAL___"+indexes[i])
		var idAtvOrdem = hAPI.getCardValue("IDATV_MODAL___"+indexes[i])
		var numOS = hAPI.getCardValue("OS_MODAL___"+indexes[i])
		var qtde = hAPI.getCardValue("QTDEFABRICADA_MODAL___"+indexes[i])
		var codigoprd = hAPI.getCardValue("CODIGOPRD_MODAL___"+indexes[i])
		var idprd = hAPI.getCardValue("IDPRD_MODAL___"+indexes[i])
		var seqAtv = hAPI.getCardValue("SEQATV_MODAL___"+indexes[i])
		var custoPosto = hAPI.getCardValue("CUSTOPOSTO_MODAL___"+indexes[i])
		var codloc = hAPI.getCardValue("CUSTOPOSTO_MODAL___"+indexes[i])
		var ultimaAtv = hAPI.getCardValue("ULTIMAATV_MODAL___"+indexes[i])
		var saldo = hAPI.getCardValue("SALDOTRABALHADO_MODAL___"+indexes[i])
		var context = "CodUsuario=fluig;CodSistema=T;CodColigada="+codColigada
		
		var codAux = codigoprd.substr(0,2)	

		var indexes2 = hAPI.getChildrenIndexes("TABLESOBESALDOPAPC")
		var index2 = 0

		for( var j=0; j < indexes2.length; j++){

			var op = hAPI.getCardValue("SSOP___"+indexes2[j])
			var filial = hAPI.getCardValue("SSCODFILIAL___"+indexes2[j])
			var coligada = hAPI.getCardValue("SSCODCOLIGADA___"+indexes2[j])
			var qtd = hAPI.getCardValue("SSQTDSUBIRSALDO___"+indexes2[j])
			log.info("vou verificar op: " + op +" e codOrdem : "+ codOrdem )
			log.info("vou verificar filial: " + filial +" e codfilial : "+ codFilial )
			log.info("vou verificar coligada: " + coligada +" e codcoligada : "+ codColigada )


			if( op == codOrdem && codColigada == coligada && codFilial==filial ){

				index2 = indexes2[j]
				qtde=Number(qtd)

			}

		}
		qtde = Number(qtde)
		
		log.info("codAux: "+codAux)
		log.info("ultimaAtv: "+ultimaAtv)
		log.info("qtde: "+qtde)
		
		// SE É ÚLTIMA ATIVIDADE DA OP
		if(ultimaAtv=="ULTIMA" && Number(qtde)>=1){
			
			log.info("é última atividade e qtde é maior ou igual a 1, vou subir saldo")
			
			// SE É UM SUBCONJUNTO
			if(codAux=="03"){
				
				codloc = "25"
				
			}
			
			// SE É UM PRODUTO ACABADO
			if(codAux=="04"){
				
				codloc = "27"
					
			}
			
			log.info("coloc: "+codloc)
				
			log.info("codColigada: "+codColigada+", codFilial: "+codFilial+", codOrdem: "+codOrdem+", idAtvOrdem: "+idAtvOrdem+", numOS: "+numOS+", qtde: "+qtde+", idprd: "+idprd+", codigoprd: "+codigoprd+", seqAtv: "+seqAtv+", saldo: "+saldo)
			
			var XML = 
			    "<MovMovimento >" +   
				"  <TMOV>" +   
				"	 <CODUSUARIO>"+usuario+"</CODUSUARIO> "+
				"    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" +   
				"    <IDMOV>-1</IDMOV>" +   
				"    <CODFILIAL>" + codFilial + "</CODFILIAL>" +   
				"    <CODLOC>" + codloc + "</CODLOC>" +   
				"    <CODLOCENTREGA>" + codloc + "</CODLOCENTREGA>" +   
				"    <CODLOCDESTINO>" + codloc + "</CODLOCDESTINO>" +   
				//"    <CODTMV>1.2.37</CODTMV>" +
				"    <CODTMV>1.2.90</CODTMV>" +
				"    <TIPO>A</TIPO>" +   
				"    <DATAEMISSAO>"+dataAtualFormatada()+"</DATAEMISSAO>" +   
				"    <DATABASEMOV>"+dataAtualFormatada()+"</DATABASEMOV>" +   
				"    <DATAMOVIMENTO>"+dataAtualFormatada()+"</DATAMOVIMENTO>" +   
				"    <CODFILIALDESTINO>" + codFilial + "</CODFILIALDESTINO>" +   
				"    <DATALANCAMENTO>"+dataAtualFormatada()+"</DATALANCAMENTO>" +
				"	 <CODCCUSTO>"+numOS+"</CODCCUSTO> "+
				"	 <CAMPOLIVRE1>" +codOrdem+ "</CAMPOLIVRE1>"+
				"	 <CAMPOLIVRE2>" +idAtvOrdem+ "</CAMPOLIVRE2>" +
				"  </TMOV>" +  
				
				"  <TNFE>" +   
				"    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" +   
				"    <IDMOV>-1</IDMOV>" +   
				"  </TNFE>" +   
				"  <TMOVFISCAL>" +   
				"    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" +   
				"    <IDMOV>-1</IDMOV>" +   
				"  </TMOVFISCAL>" 
		
			qtde = parseInt(qtde)
			custoPosto = parseFloat(custoPosto)
			saldo = parseFloat(saldo)
			
			// CALCULA O PREÇO UNITÁRIO DO PRODUTO
			/*var valores = calculaPreco(codOrdem,codColigada,codFilial,qtde)
			
			var precoUnit = parseFloat(valores[2])
			
			var valorTotal = parseFloat(valores[0])*/
			
			// CALCULA O PREÇO UNITÁRIO DO PRODUTO
			var valores = calculaPreco(codOrdem,codColigada,codFilial,qtde)
			
			var anterior = parseFloat(valores[0])
			
			// CALCULA O CUSTO DOS COMPONENTES APONTADOS
			var custoComponentes = calculaCustoComponentes(seqAtv,seqAtv,codColigada,codFilial,codOrdem,idAtvOrdem)
			
			log.info("custoPosto: "+custoPosto)
			log.info("saldo: "+saldo)
			log.info("custoComponentes: "+custoComponentes)
			
			var precoUnit = (anterior + (saldo * custoPosto) + custoComponentes) / parseFloat(valores[1])
			
			var valorTotal = precoUnit * qtde
			
			var valorServico = buscaValorServico(codOrdem,codColigada,codFilial)
			
			valorServico = parseFloat(valorServico)
			log.info("valorServico: "+valorServico)
			
			valorServico = valorServico + (saldo * custoPosto)
			
			valorServico = valorServico.toFixed(4)
			precoUnit = precoUnit.toFixed(4)
			log.info("valorServico após arredondamento: "+valorServico)
			log.info("precoUnit após arredondamento: "+precoUnit)
			
			log.info("(antes do replace) valorServico: "+valorServico)
			log.info("(antes do replace) valor total item: "+valorTotal)
			log.info("(antes do replace) preco unit: "+precoUnit)
			log.info("(antes do replace) qtde: "+qtde)
			
			valorServico = valorServico.toString().replace(".",",")
			precoUnit = precoUnit.toString().replace(".",",")
			valorTotal = valorTotal.toString().replace(".",",")
			qtde = qtde.toString().replace(".",",")
			
			log.info("valorServico: "+valorServico)
			log.info("preco unit: "+precoUnit)
			log.info("valor total: "+valorTotal)
			log.info("qtde: "+qtde)
			
			XML = XML +    
				"  <TITMMOV>" +   
				"    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" +   
				"    <IDMOV>-1</IDMOV>" +   
				"    <NSEQITMMOV>1</NSEQITMMOV>" +   
				"    <CODFILIAL>" + codFilial + "</CODFILIAL>" +   
				"    <NUMEROSEQUENCIAL>1</NUMEROSEQUENCIAL>" +   
				"    <IDPRD>"+idprd+"</IDPRD>" +
				"    <QUANTIDADE>"+qtde+"</QUANTIDADE>" +   
				"    <PRECOUNITARIO>"+precoUnit+"</PRECOUNITARIO>" +   
				"    <DATAEMISSAO>"+dataAtualFormatada()+"</DATAEMISSAO>" +   
				"    <CODLOC>" + codloc + "</CODLOC>" +
				"	 <VALORTOTALITEM>"+valorTotal+"</VALORTOTALITEM> "+
				"	 <CODCCUSTO>"+numOS+"</CODCCUSTO> "+
				"	 <CAMPOLIVRE>"+valorServico+"</CAMPOLIVRE> "+
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
			      "	 	<QUANTIDADE2>"+qtde+"</QUANTIDADE2>" + 
			      "  </TITMLOTEPRD>"
			      
				XML = XML +    
				   "  <TMOVCOMPL>" +   
				   "    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" +      
				   "    <IDMOV>-1</IDMOV>" +   
				   "    <NUMFLUIG>"+numProcess+"</NUMFLUIG>" +
				   "    <USERFLUIG>"+WKUser+"</USERFLUIG>" +		   
				   "  </TMOVCOMPL>"+   
				   "</MovMovimento>"
				   
				log.info("Fluig "+numProcess+" Gerar Movimento.")
				log.info("Contexto do movimento: "+context)	
				
			    log.info("XML do movimnto é "+XML)
			   
		   try{
			   
			   var result = new String(authService.saveRecord(NOME_DATASERVER, XML, context))
		
			   log.info("Fluig "+numProcess+".integracao com RM resultado "+result)
			   
			   //hAPI.setCardValue("IDMOV",result)
			   
			   ret = result
			   var idmov = ret.split(";")[1];
				
			   log.info("idmov de entrada: "+idmov)
				
			   // SALVA O IDMOV ENTRADA
			   hAPI.setCardValue("IDMOV_MODAL___"+indexes[i], idmov)
			   hAPI.setCardValue("SSIDMOV___"+index2, idmov)
			   
			   //hAPI.setCardValue("NUMPROCESSO",numProcess)
		
			   if (result.length > 50){
				 
				// DELETA TODOS OS MOVIMENTOS QUE FORAM GERADOS
		    	deletaMovimentos()
				   
				 var mensagemErro = result 
				 throw mensagemErro
				 
			   }
			   
		    } catch(e){
		    	
		    	// DELETA TODOS OS MOVIMENTOS QUE FORAM GERADOS
		    	deletaMovimentos()
		    	
		        if (e == null)  e = "Erro desconhecido!" 
		        
		        var mensagemErro = "Ocorreu um erro ao salvar dados no RM (geraMovEntrada - coligada "+codColigada+" ): " + e
		        
		        throw mensagemErro  
		    
		    }	
			
		}
	
	}
	
    return ret

}

// BUSCA O VALOR DO SERVIÇO
function buscaValorServico(codOrdem,codColigada,codFilial){
	
	log.info("busca o valor do serviço")
	
	var a1 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST);
 	var a2 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST);
 	var a3 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST);
 	
	var constraints = new Array(a1,a2,a3);
	
 	var dataset = DatasetFactory.getDataset("dsBuscaValorServico",null,constraints,null);
 	var soma = dataset.getValue(0, "SOMACUSTO")
 	
 	log.info("soma: "+soma)
 	
 	return soma
 	
}

// CALCULA O CUSTO DOS COMPONENTES APONTADOS
function calculaCustoComponentes(seqAtv,seqFluig,codColigada,codFilial,codOrdem,idAtvOrdem){
	
	log.info("vou calcular o custo dos componentes")
	
	log.info("seqAtv: "+seqAtv+", seqFluig: "+seqFluig+", codColigada: "+codColigada+", codFilial: "+codFilial+", codOrdem: "+codOrdem+", idAtvOrdem: "+idAtvOrdem)
	
	var indexes = hAPI.getChildrenIndexes("COMPONENTESGERAL")
	
	var custoTotal = 0

	var ret = true 
	
	// PERCORRE TODOS OS COMPONENTES GERAIS
	for(var i=0; i<indexes.length; i++){
		
		ret = false
		
		log.info("tem tabela de componentes")
		
		var seqAtvComp = hAPI.getCardValue("SEQATV___" + indexes[i])
		var qtde = hAPI.getCardValue("QTDEUTG___" + indexes[i])
		var custoMedio = hAPI.getCardValue("CUSTOMEDIOCOMPG___" + indexes[i])
		var idprd = hAPI.getCardValue("IDPRDCOMPG___"+indexes[i])
		var seqCompAtv = hAPI.getCardValue("SEQCOMP___" + indexes[i])
		//var seqCompAtv = hAPI.getCardValue("SEQCOMP___" + indexes[i])
		//var codLocComp = hAPI.getCardValue("CODLOCCOMPG___" + indexes[i])
		
		log.info("idprd: "+idprd+", seqAtvComp: "+seqAtvComp+", qtde: "+qtde+", custoMedio: "+custoMedio+", seqCompAtv: "+seqCompAtv)
		
		log.info("idprd: "+idprd+" ainda não foi dado baixa")
		
		// SE ITEM PERTENCE A ATIVIDADE QUE ESTÁ SENDO APONTADA
		//if(seqAtv==seqAtvComp){
		if(seqFluig==seqAtvComp){
			
			log.info("seqAtv "+seqFluig+" é igual a seqAtvComp "+seqAtvComp)
			log.info("idprd: "+idprd+" pertence a seqAtv "+seqFluig)
			
			// SE QUANTIDADE DO COMPONENTE FOI INFORMADA
			if(!(qtde=="" || qtde==null || qtde==undefined || qtde=="null")){
				
				log.info("qtde foi informada "+qtde)
				
				log.info("seqCompAtv: "+seqCompAtv+" tem quantidade apontada")
				
				if(qtde.indexOf(",")!=-1){
					
					qtde = qtde.replace(",",".")
					
				}
				
				qtde = parseFloat(qtde)
				
				custoMedio = parseFloat(custoMedio)
				
				log.info("custoMedio: "+custoMedio)
				
				custoTotal = custoTotal + (custoMedio * qtde)
				
				log.info("custoTotal acumulado: "+custoTotal)
				
			}
			
		}
		
	}
	
	// SE COMPONENTES JÁ FORAM BAIXADOS
	if(ret){
		
		log.info("não há componentes na tabela do Fluig, já foram baixados")
		
		var a1 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST);
	 	var a2 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST);
	 	var a3 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST);
	 	var a4 = DatasetFactory.createConstraint("IDATVORDEM",idAtvOrdem,idAtvOrdem,ConstraintType.MUST);

		var constraints = new Array(a1,a2,a3,a4);
		
	 	var dataset = DatasetFactory.getDataset("dsCompEfetivadoPAPC",null,constraints,null);
	 	
	 	log.info("dataset: "+dataset)
	 	
	 	// SE RETORNO NÃO É VAZIO OU NULO
	 	if(!(dataset=="" || dataset==null || dataset==undefined)){
	 		
	 		var qtde = dataset.getValue(0, "QUANTIDADE")
		 	var custoMedio = dataset.getValue(0, "CUSTOMEDIO")
		
		 	log.info("qtde: "+qtde+", custoMedio: "+custoMedio)
		 	
		 	qtde = parseFloat(qtde)
		 	custoMedio = parseFloat(custoMedio)
		 	
		 	custoTotal = custoMedio * qtde
	 		
	 	}
	 	
	}
	
	log.info("custoTotal final calculado dos componentes: "+custoTotal)
	
	return custoTotal
	
}

// GERAR LOTE
function geraLote(codColigada, idprd, codOrdem){

	log.info("função para gerar lote")
	
	var NOME_DATASERVER = "EstPrdLoteData";
	var numProcess = getValue("WKNumProces");
	//var usuario = "luiz.lunardi" 
    //var senha = "@Pg24221717"  		   
	var usuario         = "fluig"
	var senha           = "zaq12wsxZAQ!@WSX"  
	var authService = getWebService(usuario, senha) 
	var context = "CodUsuario=fluig;CodSistema=T;CodColigada="+codColigada
	var XML	= "";
    var result 
    
    // VERIFICA SE O LOTE COM ESSE NÚMERO JÁ EXISTE
    result = temLote(codOrdem,idprd,codColigada)
    
    log.info("result após verificar se lote já existe: "+result)
    
	// SE LOTE NÃO EXISTE
	if(result=="" || result==null || result==undefined){
		
		var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST);
	 	
		var constraints = new Array(a1);
		
	 	var dataset2 = DatasetFactory.getDataset("dsUltimoIdLotePrd",null,constraints,null);
	 	var idLote = dataset2.getValue(0, "IDLOTE")
		
		log.info("vou criar um novo lote")
		
		XML = 	"<EstPrdLote> ";
        
	    XML = XML +
	        	"    <TLotePrd>  " +
	            "      <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>  " +
	            "      <IDLOTE>"+idLote+"</IDLOTE>  " +
	            "      <IDSTATUS>6</IDSTATUS>  " +
	            "      <IDPRD>"+idprd+"</IDPRD>  " +
	            "      <NUMLOTE>"+codOrdem+"</NUMLOTE>  " +
	            "      <DATAFABRICACAO>"+dataAtualFormatada()+"</DATAFABRICACAO>  " +
	            "	   <CODCOLCFO>1</CODCOLCFO> "+
	            "	   <CODCFO>F02585</CODCFO> "+
	            "      <DATAENTRADA>"+dataAtualFormatada()+"</DATAENTRADA>  " +
	            "      <DATAVALIDADE></DATAVALIDADE>  " +
	            "    </TLotePrd>  " ;
	            
	    log.info("*** CRM *** Passei pela criação do Lote.");

	   	XML = XML + "  </EstPrdLote> ";
	    
	    log.info("*** CRM *** contexto "+context+" - Nome dataserver "+NOME_DATASERVER);

	    log.info("*** CRM *** Lote será criado com esse XML "+XML);
	     
	    var result = new String(authService.saveRecord(NOME_DATASERVER, XML, context));
	    
	    log.info("result: "+result)
	    
	    result = result.split(";")[1]
		
	} 
    
    log.info("idLote: "+result)
    
    return result

}

// VERIFICA SE O LOTE COM ESSE NÚMERO JÁ EXISTE
function temLote(codOrdem,idprd,codColigada){
	
	var idLote = ""
	
	var a1 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST);
 	var a2 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST);
 	var a3 = DatasetFactory.createConstraint("IDPRD",idprd,idprd,ConstraintType.MUST);
 	
	var constraints = new Array(a1,a2,a3);
	
 	var dataset = DatasetFactory.getDataset("dsVerificaLote",null,constraints,null);
 	var count = dataset.rowsCount
 
 	log.info("count: "+count)
 	
 	// SE RETORNO NÃO É VAZIO OU NULO
 	if(!(count=="" || count==null || count==undefined || count==0)){
 		
 		idLote = dataset.getValue(0, "IDLOTE")
 	
 		log.info("idLote: "+idLote)
 		
 	}
 	
 	return idLote
 	
}

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
