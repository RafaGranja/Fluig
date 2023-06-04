var idMovBaixa = new Array()
var idMovEntrada = new Array()

function beforeTaskSave(colleagueId,nextSequenceId,userList){
		
	log.info("beforeTaskSave - PROCESSO DE APONTAMENTO");
	
	var ativAtual = getValue("WKNumState");
	var numProcess = getValue("WKNumProces");
	var WKUser = getValue("WKUser");
	var exclusivo = hAPI.getCardValue("EXCLUSIVO1");
	var indexes = hAPI.getChildrenIndexes("ATIVIDADES");
	
	log.info("Solicitação: "+numProcess)
	
	log.info("vou percorrer todos os itens da tabela de atividades")
	
	log.info("a tabela tem "+indexes.length+" itens")
	
	log.info("nextSequenceId: "+nextSequenceId)
	
	// SE A PRÓXIMA ATIVIDADE É O EXCLUSIVO
	if(nextSequenceId=="5" && exclusivo=="FINALIZAR"){
		
		log.info("atividade vai ser finalizada")
	
		var idmovbx = ""
		var idmovt = ""
		var idmov = ""
			
		// PERCORRE TODOS OS REGISTROS DA TABELA DE APONTAMENTO
		for (var i = 0; i < indexes.length; i++) {
		    
			log.info("estou no item "+(i+1))
			
			// SALVA AS INFORMAÇÕES 
			var numOS = hAPI.getCardValue("OSATV___" + indexes[i])
			var ultimaAtvOp = hAPI.getCardValue("ULTIMAATVOP___" + indexes[i])
			var qtdReal = hAPI.getCardValue("QTDREALIZADA___" + indexes[i])
			var horaInicio = hAPI.getCardValue("HORAINICIOATV___" + indexes[i])
			var horaFim = hAPI.getCardValue("HORAFIMATV___" + indexes[i])
			//var saldo = hAPI.getCardValue("SALDOTRABALHADO___" + indexes[i])
			var saldo = hAPI.getCardValue("SALDOTRABALHADOTOTAL___" + indexes[i])
			var avanco = hAPI.getCardValue("AVANCO___" + indexes[i])
			var dataApont = hAPI.getCardValue("DATAAPONTAMENTO___" + indexes[i])
			var idAtv = hAPI.getCardValue("IDATIVIDADE___" + indexes[i])
			var codColigada = hAPI.getCardValue("CODCOLIGADAATV___" + indexes[i])
			var codFilial = hAPI.getCardValue("CODFILIALATV___" + indexes[i])
			//var seqAtv = indexes[i]
			var seqAtv = hAPI.getCardValue("SEQ___" + indexes[i])
			var codigoPrd = hAPI.getCardValue("CODIGOPRD___" + indexes[i])
			var idprd = hAPI.getCardValue("IDPRD___" + indexes[i])
			var idAtv = hAPI.getCardValue("IDATIVIDADE___" + indexes[i])
			var codOrdem = hAPI.getCardValue("OP___" + indexes[i])
			var codEstrutura = hAPI.getCardValue("CODESTRUTURAATV___" + indexes[i])
			var custoPosto = hAPI.getCardValue("CUSTOPOSTO___" + indexes[i])
			
			log.info("ultimaAtvOp: "+ultimaAtvOp+", qtdReal: "+qtdReal+", saldo: "+saldo+", horaInicio: "+horaInicio+", horaFim: "+horaFim+", avanco: "+avanco+
					", dataApont: "+dataApont+", idAtv: "+idAtv+", codColigada: "+codColigada+", codFilial: "+codFilial+
					", seqAtv: "+seqAtv+", codigoPrd: "+codigoPrd+", idprd: "+idprd+", idAtv: "+idAtv+", codOrdem: "+
					codOrdem+", codEstrutura: "+codEstrutura+", numOS: "+numOS+", custoPosto: "+custoPosto)
			
			var codAux = codigoPrd.substr(0,2)	
			var codloc 
			
			// SE É UM SEMIACABADO
			if(codAux=="03"){
				
				codloc = "25"
				
			}
			
			// SE É UM PRODUTO ACABADO
			if(codAux=="04"){
				
				codloc = "27"
					
			}
			
			log.info("coloc: "+codloc)
			
			// SE SALDO DAS HORAS TRABALHADAS FOI PREENCHIDO
			//if( ! ( (saldo=="" || saldo==null || saldo==undefined) || (avanco=="" || avanco==null || avanco==undefined) ) ){
			if( ! ( (saldo=="" || saldo==null || saldo==undefined) ) ){
					
				log.info("saldo e avanço foram informados")
				
				if(saldo.indexOf(",")!=-1){
					
					saldo = saldo.replace(",",".")
					
					log.info("saldo após replace: "+saldo)
					
				}
				
				if(custoPosto.indexOf(",")!=-1){
					
					custoPosto = custoPosto.replace(",",".")
					
					log.info("custoPosto após replace: "+custoPosto)
					
				}
				
				log.info("saldo: "+saldo+", custoPosto: "+custoPosto)
				
				saldo = parseFloat(saldo).toFixed(4)
				
				custoPosto = parseFloat(custoPosto)
				
				log.info("saldo trabalhado: "+saldo)
				log.info("custo posto: "+custoPosto)

				// BUSCA O SALDO QUE JÁ FOI APONTADO
				saldoApont = buscaSaldoApontado(codColigada,codFilial,codOrdem,idAtv)
				
				log.info("soma saldo "+saldo+" + saldoApont "+saldoApont+" total: "+(parseFloat(saldo) + parseFloat(saldoApont)))
				
				custoPosto = ( parseFloat(saldo) + parseFloat(saldoApont) ) * custoPosto
				
				log.info("custoPosto calculado: "+custoPosto)
				
				// SE É A ULTIMA ATIVIDADE DA OP E AVANÇO FOI INFORMADO
				//if(ultimaAtvOp=="SIM" && !(avanco=="" || avanco==null || avanco==undefined) ){
				if(ultimaAtvOp=="SIM"){
						
					log.info("é a última atividade da OP e avanço foi informado")
					
					// TEM SALDO PARA SUBIR
					if( ! (qtdReal=="" || qtdReal==null || qtdReal==undefined) ){
						
						log.info("o item "+(i+1)+" tem saldo e avanço")
						
						log.info("vou gerar o movimento de baixa dos componentes do item "+(i+1))
						
						// GERA O MOVIMENTO DE BAIXA DO ESTOQUE
						idmovbx = geraMovBaixa(numProcess, codColigada, codFilial, WKUser, codOrdem, idAtv, seqAtv, saldo, custoPosto, numOS)
						
						// GERA O MOVIMENTO DE TRANSFERÊNCIA PARA OS ITENS 01.020
						//idmovt = geraMovTransferencia(numProcess, codColigada, codFilial, WKUser, codOrdem, idAtv, seqAtv, saldo, custoPosto, numOS)
						
						log.info("vou gerar o movimento de entrada do item "+(i+1))
						
						// GERA O MOVIMENTO DE ENTRADA DO ESTOQUE
						idmov = geraMovEntrada(numProcess, codColigada, codFilial, codloc, WKUser, codOrdem, idAtv, idprd, qtdReal, custoPosto, seqAtv, numOS, saldo)
						idmov   = idmov.split(";")[1];
						
						log.info("idmov de entrada: "+idmov)
						
						// SALVA O IDMOV ENTRADA
						hAPI.setCardValue("IDMOVENTRADA___"+indexes[i],idmov)
						
					} else {
						// SE NÃO
						
						log.info("não tem saldo para subir")
						
						log.info("o item "+(i+1)+" tem avanço")
						
						log.info("vou gerar o movimento de baixa dos componentes do item "+(i+1))
						
						// GERA O MOVIMENTO DE BAIXA DO ESTOQUE
						idmovbx = geraMovBaixa(numProcess, codColigada, codFilial, WKUser, codOrdem, idAtv, seqAtv, saldo, custoPosto, numOS)
						
						// GERA O MOVIMENTO DE TRANSFERÊNCIA PARA OS ITENS 01.020
						//idmovt = geraMovTransferencia(numProcess, codColigada, codFilial, WKUser, codOrdem, idAtv, seqAtv, saldo, custoPosto, numOS)
						
						log.info("vou gerar o movimento de entrada do item "+(i+1))
						
					}
					
				} else {
					// SE NÃO 
					
					log.info("não é a última atividade")
					
					log.info("vou gerar o movimento de baixa dos componentes do item "+indexes[i])
					
					// GERA O MOVIMENTO DE BAIXA DO ESTOQUE
					idmovbx = geraMovBaixa(numProcess, codColigada, codFilial, WKUser, codOrdem, idAtv, seqAtv, saldo, custoPosto, numOS)
					
					// GERA O MOVIMENTO DE TRANSFERÊNCIA PARA OS ITENS 01.020
					//idmovt = geraMovTransferencia(numProcess, codColigada, codFilial, WKUser, codOrdem, idAtv, seqAtv, saldo, custoPosto, numOS)
					
					//log.info("vou gerar o movimento de entrada do item "+(i+1))
					
					// GERA O MOVIMENTO DE ENTRADA DO ESTOQUE
					//idmov = geraMovEntrada(numProcess, codColigada, codFilial, codloc, WKUser, codOrdem, idprd, saldo);
					//idmov   = idmov.split(";")[1];
					
					//log.info("idmov de entrada: "+idmov)
					
					// SALVA O IDMOV ENTRADA
					//hAPI.setCardValue("IDMOVENTRADA___"+indexes[i],idmov)
					
				}
				
			}
			
			// SE IDMOV E IDMOVBX FORAM GERADOS
			//if(!(idmovbx==""||idmovbx==null || idmovbx==undefined) && !(idmov=="" || idmov==null || idmov==undefined)){
				
				
				/*log.infog("vou executar a procedure do apontamento")
				
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

	}
	
}

// BUSCA O SALDO QUE JÁ FOI APONTADO
function buscaSaldoApontado(codColigada,codFilial,codOrdem,idAtvOrdem){
	
	log.info("vou buscar o saldo Apontado")
	log.info("codOrdem: "+codOrdem+", codColigada: "+codColigada+", codFilial: "+codFilial+", idAtvOrdem: "+idAtvOrdem)
	
	var a1 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST);
	var a2 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST);
	var a3 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST);
	var a4 = DatasetFactory.createConstraint("IDATVORDEM",idAtvOrdem,idAtvOrdem,ConstraintType.MUST);
	
	var constraints = new Array(a1,a2,a3,a4);

 	var dataset = DatasetFactory.getDataset("dsBuscaSaldoApontAtvOP",null,constraints,null);
 	var saldo = dataset.getValue(0, "HORAS_APONTADAS")
 	
 	log.info("saldo: "+saldo)
 	
 	// SE SALDO NÃO FOI PREENCHIDO
 	if(saldo=="" || saldo==null || saldo==undefined || saldo=="null"){
 		
 		saldo = 0
 		
 	} else {
 		
 		saldo = parseFloat(saldo)
 		
 	}
 	
 	return saldo
 	
}

// GERA O MOVIMENTO DE TRANSFERÊNCIA PARA OS ITENS 01.020
function geraMovTransferencia(numProcess, codColigada, codFilial, WKUser, codOrdem, idAtv, seqAtv, saldo, custoPosto, numOS){
	
	log.info("MOVIMENTO DE TRANSFERÊNCIA (3.1.06)")
	
	log.info("Parâmetros: numProcess: "+numProcess+", codColigada: "+codColigada+", codFilial: "+codFilial+", WKUser: "+WKUser+", idAtv: "+idAtv+", seqAtv: "+seqAtv+
			" saldo: "+saldo+", custoPosto: "+custoPosto+", numOS: "+numOS+", codOrdem: "+codOrdem)
	
	var NOME_DATASERVER = "MovMovimentoTBCData" 
	//var usuario = "luiz.lunardi" 
    //var senha = "@Pg24221717"  	
	var usuario         = "fluig"
	var senha           = "zaq12wsxZAQ!@WSX" 	
	var authService = getWebService(usuario, senha) 
	var context = "CodUsuario=fluig;CodSistema=T;CodColigada="+codColigada
	var nseq = 0
	var ret  = ""
	
	var indexesComp = hAPI.getChildrenIndexes("COMPONENTESGERAL")
	
	log.info("vou percorrer todos os itens da tabela de componentes")
	
	log.info("a tabela tem "+indexesComp.length+" itens")
	
	var produtosLote = new Array()
	var codLocGeral = new Array()

	log.info("vou buscar todos os componentes")

	// PERCORRE TODOS OS REGISTROS DA TABELA DE COMPONENTES GERAL
	for (var i = 0; i < indexesComp.length; i++){
		
		var qtde = hAPI.getCardValue("QTDEUTG___" + indexesComp[i])
		var idprd = hAPI.getCardValue("IDPRDCOMPG___"+indexesComp[i])
		var codigoPrd = hAPI.getCardValue("CODIGOCOMPG___"+indexesComp[i])
		var seqAtvComp = hAPI.getCardValue("SEQATV___" + indexesComp[i])
		var codLocComp = hAPI.getCardValue("CODLOCCOMPG___" + indexesComp[i])
		var seqComp = hAPI.getCardValue("SEQCOMP___" + indexesComp[i])
		var idLote = hAPI.getCardValue("IDLOTECOMPG___" + indexesComp[i])
		var custoMedio = hAPI.getCardValue("CUSTOMEDIOCOMPG___" + indexesComp[i])

		log.info("estou no item "+indexesComp[i]+" dos componentes e na atividade "+seqAtv)
		
		log.info("qtde: "+qtde+", codigoPrd: "+codigoPrd+", idprd: "+idprd+", seqAtvComp: "+seqAtvComp+", codLocComp: "+codLocComp+", seqComp: "+seqComp+", idLote: "+idLote+", custoMedio: "+custoMedio)
		
		// SE ITEM PERTENCE A ATIVIDADE QUE ESTÁ SENDO APONTADA
		if(seqAtv==seqAtvComp){
			
			log.info("achei componente da atividade")
			
			var codPrdAux = codigoPrd.toString().substring(0,6)
			log.info("codPrdAux: "+codPrdAux)
			
			if(codPrdAux=="01.020"){
			
				log.info("vou fazer a transferência")
				
				// SE QUANTIDADE DO COMPONENTE FOI INFORMADA
				if(!(qtde=="" || qtde==null || qtde==undefined || qtde=="null")){
					
					log.info("achei componente do item na tabela de componentes gerais que tem quantidade apontada")
					
					log.info("IDPRD componente: "+idprd+", qtde: "+qtde)
					
					// SE QTDE TEM PONTO
					if(qtde.indexOf(".")!=-1){
						
						qtde = qtde.replace(".",",")
						
					}
					
					//
					if(custoMedio.indexOf(".")!=-1){
						
						custoMedio = custoMedio.replace(".",",")
						
					}
					
					
					log.info("vou dar baixa nos componentes de codloc "+codLocComp)
					
					var XML =
				    "<MovMovimento >" +   
					"  <TMOV>" +   
					"    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" +   
					"    <IDMOV>-1</IDMOV>" +   
					"    <CODFILIAL>" + codFilial + "</CODFILIAL>" +   
					"    <CODLOC>" + codLocComp + "</CODLOC>" +   
					"    <CODLOCENTREGA>" + codLocComp + "</CODLOCENTREGA>" +   
					"    <CODLOCDESTINO>20</CODLOCDESTINO>" +   
					"    <CODTMV>3.1.06</CODTMV>" +
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
					"  </TMOVFISCAL> " 

					
					XML = XML +    
					"  <TITMMOV>" +   
					"    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" +   
					"    <IDMOV>-1</IDMOV>" +   
					"    <NSEQITMMOV>1</NSEQITMMOV>" +   
					"    <CODFILIAL>" + codFilial + "</CODFILIAL>" +   
					"    <NUMEROSEQUENCIAL>1</NUMEROSEQUENCIAL>" +   
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
				    "    <NSEQITMMOV>1</NSEQITMMOV>" +
				    "    <IDLOTE>"+idLote+"</IDLOTE>" +    
				    "	 <QUANTIDADE2>"+qtde+"</QUANTIDADE2>" + 
				    "  </TITMLOTEPRD>"
			
					XML = XML +   
					"  <TITMMOVCOMPL>"+
					"    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" +   
					"    <IDMOV>-1</IDMOV>" +  
					"    <NSEQITMMOV>1</NSEQITMMOV>" +   
					"    <IDATIVIDADE>"+idAtv+"</IDATIVIDADE>"+
					"  </TITMMOVCOMPL> "
					
					
					XML = XML +    
					   "  <TMOVCOMPL>" +   
					   "    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" +      
					   "    <IDMOV>-1</IDMOV>" +   
					   "    <NUMFLUIG>"+numProcess+"</NUMFLUIG>" +
					   "    <USERFLUIG>"+WKUser+"</USERFLUIG>" +		   
					   "  </TMOVCOMPL> "+   
					   "</MovMovimento> "
					   
					log.info( "Fluig "+numProcess+" Gerar Movimento de Transferência")
					log.info( "Contexto do movimento: "+context)	
					log.info( "XML do movimento de Transferência de codloc "+codLocComp+" é: "+XML)
					
					try{
						
						var result = new String(authService.saveRecord(NOME_DATASERVER, XML, context))
						log.info("Fluig "+numProcess+". Integração com RM - TRANSFERÊNCIA DE MATERIAL (3.1.06) - resultado "+result)
						ret = result
						log.info("result da baixa: "+result)
						
						result = result.split(";")[1]
						
						// SALVA O IDMOVBAIXA GERADO PARA TODOS OS COMPONENTES
						salvaIdMovBaixa(indexesComp,seqAtv,codLocComp,result,idLote,idprd,qtde,seqComp)
						
						
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
				        var mensagemErro = "Ocorreu um erro ao salvar dados no RM (geraMovTransf coligada "+codColigada+" ): " + e  
				        
				        throw mensagemErro;  
				        
				    }
				
				}
				
			}
			
		}
		
	}
	
	return ret
	
}

// GERA O MOVIMENTO DE BAIXA DO ESTOQUE
function geraMovBaixa(numProcess, codColigada, codFilial, WKUser, codOrdem, idAtv, seqAtv, saldo, custoPosto, numOS){
	
	log.info("MOVIMENTO DE BAIXA DO ESTOQUE")
	
	log.info("Parâmetros: numProcess: "+numProcess+", codColigada: "+codColigada+", codFilial: "+codFilial+", WKUser: "+WKUser+", idAtv: "+idAtv+", seqAtv: "+seqAtv+
			" saldo: "+saldo+", custoPosto: "+custoPosto+", numOS: "+numOS+", codOrdem: "+codOrdem)
	
	var NOME_DATASERVER = "MovMovimentoTBCData" 
	//var usuario = "luiz.lunardi" 
    //var senha = "@Pg24221717"  	
	var usuario         = "fluig"
	var senha           = "zaq12wsxZAQ!@WSX" 	
	var authService = getWebService(usuario, senha) 
	var context = "CodUsuario=fluig;CodSistema=T;CodColigada="+codColigada
	var nseq = 0
	var ret  = ""
	
	var indexesComp = hAPI.getChildrenIndexes("COMPONENTESGERAL")
	
	log.info("vou percorrer todos os itens da tabela de componentes")
	
	log.info("a tabela tem "+indexesComp.length+" itens")
	
	var produtosLote = new Array()
	var codLocGeral = new Array()

	log.info("vou buscar todos os componentes")

	// PERCORRE TODOS OS REGISTROS DA TABELA DE COMPONENTES GERAL
	for (var i = 0; i < indexesComp.length; i++){
		
		var qtde = hAPI.getCardValue("QTDEUTG___" + indexesComp[i])
		var idprd = hAPI.getCardValue("IDPRDCOMPG___"+indexesComp[i])
		var seqAtvComp = hAPI.getCardValue("SEQATV___" + indexesComp[i])
		var codLocComp = hAPI.getCardValue("CODLOCCOMPG___" + indexesComp[i])
		var codigoPrd = hAPI.getCardValue("CODIGOCOMPG___" + indexesComp[i])
		var seqComp = hAPI.getCardValue("SEQCOMP___" + indexesComp[i])
		var idLote = hAPI.getCardValue("IDLOTECOMPG___" + indexesComp[i])
		var custoMedio = hAPI.getCardValue("CUSTOMEDIOCOMPG___" + indexesComp[i])

		log.info("estou no item "+indexesComp[i]+" dos componentes e na atividade "+seqAtv)
		
		log.info("qtde: "+qtde+", idprd: "+idprd+", seqAtvComp: "+seqAtvComp+", codLocComp: "+codLocComp+", seqComp: "+seqComp+", idLote: "+idLote+", custoMedio: "+custoMedio+", codigoPrd: "+codigoPrd)
		
		// SE ITEM PERTENCE A ATIVIDADE QUE ESTÁ SENDO APONTADA
		if(seqAtv==seqAtvComp){
			
			log.info("achei componente da atividade")
			
			var codPrdAux = codigoPrd.toString().substring(0,6)
			log.info("codPrdAux: "+codPrdAux)
			
			// SE NÃO É UM COMPONENTE DE TERCEIROS
			if(!(codPrdAux=="01.020")){
			
			// VERIFICA SE COMPONENTE JÁ TEVE BAIXA
			//if(verificaBaixaComp(idprd,idLote,seqComp,seqAtvComp)){
				
				//log.info("componente não foi baixado")
				
				// SE QUANTIDADE DO COMPONENTE FOI INFORMADA
				if(!(qtde=="" || qtde==null || qtde==undefined || qtde=="null")){
					
					log.info("achei componente do item na tabela de componentes gerais que tem quantidade apontada")
					
					log.info("IDPRD componente: "+idprd+", qtde: "+qtde)
					
					// SE QTDE TEM PONTO
					if(qtde.indexOf(".")!=-1){
						
						qtde = qtde.replace(".",",")
						
					}
					
					//
					if(custoMedio.indexOf(".")!=-1){
						
						custoMedio = custoMedio.replace(".",",")
						
					}
					
					// SE LOCAL DE ESTOQUE AINDA NÃO FOI AGRUPADO
					//if(!(codLocGeral.includes(codLocComp))){
					
					if(codLocGeral.indexOf(codLocComp)==-1){
						
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
						"  </TMOVFISCAL> " 

						//var auxXML = componentesCodLoc(codColigada, codFilial, indexesComp, seqAtv, idAtv, codLocComp, saldo, custoPosto, numOS)
						
						//XML = XML +""+auxXML 
						
						XML = XML +    
						"  <TITMMOV>" +   
						"    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" +   
						"    <IDMOV>-1</IDMOV>" +   
						"    <NSEQITMMOV>1</NSEQITMMOV>" +   
						"    <CODFILIAL>" + codFilial + "</CODFILIAL>" +   
						"    <NUMEROSEQUENCIAL>1</NUMEROSEQUENCIAL>" +   
						"    <IDPRD>" + idprd + "</IDPRD>" +
						"    <QUANTIDADE>" + qtde + "</QUANTIDADE>" +   
						//"    <PRECOUNITARIO>"+precoUnit+"</PRECOUNITARIO>" +
						"    <PRECOUNITARIO>"+custoMedio+"</PRECOUNITARIO>" +
						"    <DATAEMISSAO>"+dataAtualFormatada()+"</DATAEMISSAO>" +   
						"    <CODLOC>" + codLocComp + "</CODLOC>" +   
						"	 <CODCCUSTO>"+numOS+"</CODCCUSTO> "+
						"  </TITMMOV>"
						
						XML = XML +
					    "  <TITMLOTEPRD>" + 
					    "    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" + 
					    "    <IDMOV>-1</IDMOV>" +   
					    "    <NSEQITMMOV>1</NSEQITMMOV>" +
					    "    <IDLOTE>"+idLote+"</IDLOTE>" +    
					    "	 <QUANTIDADE2>"+qtde+"</QUANTIDADE2>" + 
					    "  </TITMLOTEPRD>"
						
						// BUSCA TODOS OS LOTES DO PRODUTO E QUANTIDADES CONSUMIDAS
						//XML = XML + montarXmlLotes(idprd, indexes, indexes.length, codColigada, nseq, seqAtv)
						
						XML = XML +   
						"  <TITMMOVCOMPL>"+
						"    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" +   
						"    <IDMOV>-1</IDMOV>" +  
						"    <NSEQITMMOV>1</NSEQITMMOV>" +   
						"    <IDATIVIDADE>"+idAtv+"</IDATIVIDADE>"+
						"  </TITMMOVCOMPL> "
						
						
						XML = XML +    
						   "  <TMOVCOMPL>" +   
						   "    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" +      
						   "    <IDMOV>-1</IDMOV>" +   
						   "    <NUMFLUIG>"+numProcess+"</NUMFLUIG>" +
						   "    <USERFLUIG>"+WKUser+"</USERFLUIG>" +		   
						   "  </TMOVCOMPL> "+   
						   "</MovMovimento> "
						   
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
							salvaIdMovBaixa(indexesComp,seqAtv,codLocComp,result,idLote,idprd,qtde,seqComp)
							
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
						codLocGeral.push(codLocComp)
							
					}
				
				}
				
			}
			
		}
		
	}
	
	return ret
  
}

// BUSCA TODOS OS COMPONENTES DA ATIVIDADE EM QUESTÃO QUE FORAM APONTADOS E QUE TEM O MESMO CODLOC
function componentesCodLoc(codColigada, codFilial, indexes, seqAtv, idAtv, codLocCompAux, saldo, custoPosto, numOS){
	
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
		var seqComp = hAPI.getCardValue("SEQCOMP___" + indexes[k])
		
		log.info("idprd: "+idprd+", seqAtvComp: "+seqAtvComp+", codLocComp: "+codLocComp+", qtde: "+qtde+", idLote: "+idLote+", custoMedio: "+custoMedio+", seqComp: "+seqComp)
		
		// SE ITEM PERTENCE A ATIVIDADE QUE ESTÁ SENDO APONTADA
		if(seqAtv==seqAtvComp){
			
			log.info("seqAtv "+seqAtv+" é igual a seqAtvComp "+seqAtvComp)
			
			// VERIFICA SE COMPONENTE JÁ TEVE BAIXA
			if(verificaBaixaComp(idprd,idLote,seqComp,seqAtvComp)){
				
				// SE QUANTIDADE DO COMPONENTE FOI INFORMADA
				if(!(qtde=="" || qtde==null || qtde==undefined || qtde=="null")){
		  	
					log.info("qtde foi apontada: "+qtde)
					
					// SE O CODLOC É IGUAL
					if(codLocComp==codLocCompAux){
						
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
						
						precoUnit = precoUnit.toFixed(4).toString()
						
						if(precoUnit.indexOf(".")!=-1){
							
							precoUnit = precoUnit.replace(".",",")
							
						}
						
						log.info("precoUnit para o XML: "+precoUnit)*/
						
						// SE QTDE TEM PONTO
						if(qtde.indexOf(".")!=-1){
							
							qtde = qtde.replace(".",",")
							
						}
						
						log.info("qtde para o XML: "+qtde)
						
						nseq = nseq + 1
						
						custoMedio = parseFloat(custoMedio).toFixed(4).toString()
						
						log.info("custoMedio: "+custoMedio)
						
						if(custoMedio.indexOf(".")!=-1){
							
							custoMedio = custoMedio.replace(".",",")
							
						}
						
						log.info("qtde: "+qtde+", custoMedio: "+custoMedio)
						
			    		XML = XML +    
						"  <TITMMOV>" +   
						"    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" +   
						"    <IDMOV>-1</IDMOV>" +   
						"    <NSEQITMMOV>"+nseq+"</NSEQITMMOV>" +   
						"    <CODFILIAL>" + codFilial + "</CODFILIAL>" +   
						"    <NUMEROSEQUENCIAL>"+nseq+"</NUMEROSEQUENCIAL>" +   
						"    <IDPRD>" + idprd + "</IDPRD>" +
						"    <QUANTIDADE>" + qtde + "</QUANTIDADE>" +   
						//"    <PRECOUNITARIO>"+precoUnit+"</PRECOUNITARIO>" +
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
						
					}
								
				}
				
			}
		
		}
		
	}
	
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
	
	log.info("vou deletar todos os movimentos que foram gerados devido ao erro em algum movimento de baixa ou entrada")
	
	var indexesMovBaixa = hAPI.getChildrenIndexes("IDMOVCOMPONENTES")
	var indexesMovEntrada = hAPI.getChildrenIndexes("ATIVIDADES");
	var movimentos = new Array()
	
	log.info("vou percorrer todos os itens da tabela de movimentos de baixa")
	
	log.info("a tabela tem "+indexesMovBaixa.length+" itens")
	
	log.info("vou buscar todos os movimentos de baixa")

	// PERCORRE TODOS OS REGISTROS DOS MOVIMENTOS DE BAIXA
	/*for (var i = 0; i < indexesMovBaixa.length; i++){
		
		var idmov = hAPI.getCardValue("IMIDMOV___" + indexesMovBaixa[i])
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
		var codColigada = "1"
		
		log.info("idmov entrada: "+idmov)
		
		// SE IDMOV EXISTE E AINDA NÃO FOI DELETADO
		if( !(idmov=="" || idmov==null || idmov==undefined) && (movimentos.indexOf(idmov)==-1) ){
			
			log.info("vou deletar o idmov "+idmov)
			
			// DELETA O IDMOV	
			deletaIdMov(idmov,codColigada)
			
			log.info("idmov de entrada "+idmov+" deletado com sucesso")
			
			// SALVA MOVIMENTO DELETADO
			movimentos.push(idmov)
			
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
	var pk = ""+codColigada+";"+idmov
	var numProcess = getValue("WKNumProces");

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
function salvaIdMovBaixa(indexes,seqAtv,codLocCompAux,idMov,idLote,idprd,qtde,seqCompAtv){
	
	log.info("vou salvar o idMov "+idMov+" no componentes de codLoc "+codLocCompAux+" da atividade "+seqAtv)

	idMov = idMov.toString()
	
	log.info("antes do parser")
	log.info("idprd: "+idprd+", idLote: "+idLote+", qtde: "+qtde+", seqAtv: "+seqAtv+", seqCompAtv: "+seqCompAtv+", idMov: "+idMov)
	
	idprd = idprd.toString()
	idLote = idLote.toString()
	qtde = qtde.toString()
	seqAtv = seqAtv.toString()
	seqCompAtv = seqCompAtv.toString()
	idMov = idMov.toString()
	
	log.info("idprd: "+idprd+", idLote: "+idLote+", qtde: "+qtde+", seqAtv: "+seqAtv+", seqCompAtv: "+seqCompAtv+", idMov: "+idMov)
	
	var childData = new java.util.HashMap()
	
	log.info("criei o HashMap")
	
    childData.put("IMIDPRDCOMP",idprd)
    childData.put("IMIDLOTE", idLote)
    childData.put("IMQTDEUT", qtde)
    childData.put("IMSEQATV", seqAtv)
    childData.put("IMSEQCOMP", seqCompAtv)
    childData.put("IMIDMOV", idMov)
    
    log.info("vou salvar na tabela")
    
    hAPI.addCardChild("IDMOVCOMPONENTES", childData)
    
    idMovBaixa.push(idMov)
	
	// PERCORRE TODOS OS COMPONENTE
	/*for(var j=0; j<indexes.length; j++){
		
		var idprd = hAPI.getCardValue("IDPRDCOMPG___"+indexes[j])
		var idLote = hAPI.getCardValue("IDLOTECOMPG___"+indexes[j])
		var seqAtvComp = hAPI.getCardValue("SEQATV___" + indexes[j])
		var codLocComp = hAPI.getCardValue("CODLOCCOMPG___" + indexes[j])
		var qtde = hAPI.getCardValue("QTDEUTG___" + indexes[j])
		var seqCompAtv = hAPI.getCardValue("SEQCOMP___" + indexes[j])
		var seqCompGeral = hAPI.getCardValue("SEQCOMPGERAL___" + indexes[j])
		
		log.info("idprd: "+idprd+", seqAtvComp: "+seqAtvComp+", codLocComp: "+codLocComp+", qtde: "+qtde+", seqCompAtv: "+seqCompAtv+", seqCompGeral: "+seqCompGeral+", idLote: "+idLote)
		
		log.info("idprd: "+idprd+" ainda não foi dado baixa")
		
		// SE ITEM PERTENCE A ATIVIDADE QUE ESTÁ SENDO APONTADA
		if(seqAtv==seqAtvComp){
				
			log.info("seqAtv "+seqAtv+" é igual a seqAtvComp "+seqAtvComp)
			log.info("idprd: "+idprd+" pertence a seqAtv "+seqAtv)
			
			// SE QUANTIDADE DO COMPONENTE FOI INFORMADA
			if(!(qtde=="" || qtde==null || qtde==undefined || qtde=="null")){
				
				log.info("qtde foi informada "+qtde)
				
				log.info("seqCompAtv: "+seqCompAtv+" tem quantidade apontada")
				
				// SE O CODLOC É IGUAL
				if(codLocComp==codLocCompAux){
					
					log.info("vou salvar o idmov "+idMov+" no item "+indexes[j]+" da tabela componentes da atividade "+seqAtvComp+" no seqCompGeral "+seqCompGeral)
					
					log.info("IDMOVBAIXA___"+seqCompGeral)
					log.info("IDMOVBAIXA___"+indexes[j])
					
					seqCompGeral = seqCompGeral.toString()
					
					idMov = idMov.toString()
					
					/*log.info("campo que vou salvar IDMOVBAIXA___"+seqCompGeral)
					
					log.info("o camp seqAtvComp é "+hAPI.getCardValue("SEQATV___" + seqCompGeral))
					
					// SALVA O IDMOV GERADO
					hAPI.setCardValue("IDMOVBAIXA___"+seqCompGeral, idMov)
					hAPI.setCardValue("BAIXAID___"+seqCompGeral, idMov)
					
					log.info("IDMOV salvo: "+hAPI.getCardValue("IDMOVBAIXA___"+seqCompGeral))
					
					log.info("salvei o idMov "+idMov+" no campo IDMOVBAIXA___"+seqCompGeral)*/
					
					/*log.info("antes do parser")
					log.info("idprd: "+idprd+", idLote: "+idLote+", qtde: "+qtde+", seqAtv: "+seqAtv+", seqCompAtv: "+seqCompAtv+", idMov: "+idMov)
					
					idprd = idprd.toString()
					idLote = idLote.toString()
					qtde = qtde.toString()
					seqAtv = seqAtv.toString()
					seqCompAtv = seqCompAtv.toString()
					idMov = idMov.toString()
					
					log.info("idprd: "+idprd+", idLote: "+idLote+", qtde: "+qtde+", seqAtv: "+seqAtv+", seqCompAtv: "+seqCompAtv+", idMov: "+idMov)
					
					var childData = new java.util.HashMap()
					
					log.info("criei o HashMap")
					
			        childData.put("IMIDPRDCOMP",idprd)
			        childData.put("IMIDLOTE", idLote)
			        childData.put("IMQTDEUT", qtde)
			        childData.put("IMSEQATV", seqAtv)
			        childData.put("IMSEQCOMP", seqCompAtv)
			        childData.put("IMIDMOV", idMov)
			        
			        log.info("vou salvar na tabela")
			        
			        hAPI.addCardChild("IDMOVCOMPONENTES", childData)
					
				}
				
			}
			
		}
		
	}*/
	
}

// VERIFICA SE COMPONENTE JÁ TEVE BAIXA
function verificaBaixaComp(idprd,idLote,seqComp,seqAtv){
	
	var indicesBaixa = hAPI.getChildrenIndexes("IDMOVCOMPONENTES")
	var ret = true
	
	log.info("idprd: "+idprd+", idLote: "+idLote+", seqComp: "+seqComp+", seqAtv: "+seqAtv)
	log.info("vou verificar se já teve baixa desse componente nessa atividade")
	log.info("tamanho tabela: "+indicesBaixa.length)
	
	// PERCORRE OS REGISTROS DA TABELA DE MOVIMENTOS
	for(var i=0;i<indicesBaixa.length;i++){
		
		var idprdAux = hAPI.getCardValue("IMIDPRDCOMP___" + indicesBaixa[i])
		var idLoteAux = hAPI.getCardValue("IMIDLOTE___" + indicesBaixa[i])
		var seqCompAux = hAPI.getCardValue("IMSEQCOMP___" + indicesBaixa[i])
		var seqAtvAux = hAPI.getCardValue("IMSEQATV___" + indicesBaixa[i])
		
		log.info("idprdAux: "+idprdAux+", idLoteAux: "+idLoteAux+", seqCompAux: "+seqCompAux+", seqAtvAux: "+seqAtvAux)
		
		// SE É O MESMO COMPONENTE
		if(idprd==idprdAux && idLote==idLoteAux && seqComp==seqCompAux && seqAtv==seqAtvAux){
			
			log.info("componente já teve baixa")
			
			ret = false
			
		}
		
	}
	
	log.info("achei o componente? "+ret)
	
	return ret
	
}

// BUSCA TODOS OS LOTES DOS COMPONENTES E QUANTIDADES CONSUMIDAS
function montarXmlLotes(idprd, indexes,indexesTam, codColigada, nseq, seqAtv){
	
	var XML = ""
	
	log.info("Vou monntar XML para os lotes")
		
	// PERCORRE TODOS OS REGISTROS DA TABELA DE COMPONENTES
	for(var i=0; i<indexesTam; i++){
		
		var idLote = hAPI.getCardValue("IDLOTECOMPG___" + indexes[i])
		var qtde = hAPI.getCardValue("QTDEUTG___" + indexes[i])
		var idPrdComp = hAPI.getCardValue("IDPRDCOMPG___" + indexes[i]) 
		var seqAtvComp = hAPI.getCardValue("SEQATV___" + indexes[i])

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
 	
 	// SE RETORNO DA SOMA NÃO É INVÁLIDO OU NULO
 	if( !(soma=="" || soma==null || soma==undefined || soma=="null") ){
 		
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
 	 	
 	}
 	
 	return valores
 	
}

// BUSCA O TOTAL DA QUANTIDADE DO COMPONENTE QUE ESTÁ SENDO APONTADO
function buscaQtdeTotal(idprd, indexes,indexesTam, seqAtv){
	
	var qtdeTotal = 0
	
	log.info("Vou buscar a qtdeTotal do item idprd: "+idprd)
	
	// PERCORRE TODOS OS REGISTROS DA TABELA DE COMPONENTES
	for(var i=0; i<indexesTam; i++){
		
		var idprdComp = hAPI.getCardValue("IDPRDCOMPG___" + indexes[i])
		var qtdeComp = hAPI.getCardValue("QTDEUTG___" + indexes[i])
		var seqAtvComp = hAPI.getCardValue("SEQATV___" + indexes[i])

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
			
	}
	
	log.info("a qtdeTotal de idprd: "+idprd+" é "+qtdeTotal)
	
	return qtdeTotal
	
} 

// GERA O MOVIMENTO DE ENTRADA DE ESTOQUE
function geraMovEntrada(numProcess, codColigada, codFilial, codloc, WKUser, codOrdem, idAtv, idprd, qtde, custoPosto, seqAtv, numOS, saldo){
	
	log.info("MOVIMENTO DE ENTRADA DO ESTOQUE")
	
	log.info("Parâmetros: numProcess: "+numProcess+", codColigada: "+codColigada+", codFilial: "+codFilial+", codloc: "+codloc+", WKUser: "+WKUser+
			", codOrdem: "+codOrdem+", idprd: "+idprd+", qtde: "+qtde+", custoPosto: "+custoPosto+", seqAtv: "+seqAtv+", numOS: "+numOS+", idAtv: "+idAtv+", saldo: "+saldo)
	
	var NOME_DATASERVER = "MovMovimentoTBCData"  
	//var usuario = "luiz.lunardi" 
    //var senha = "@Pg24221717"  		   
	var usuario         = "fluig"
	var senha           = "zaq12wsxZAQ!@WSX" 
	var authService = getWebService(usuario, senha) 
	var context = "CodUsuario=fluig;CodSistema=T;CodColigada="+codColigada
	var nseq = 0
	var ret  = ""
	
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
			"	 <CAMPOLIVRE2>" +idAtv+ "</CAMPOLIVRE2>" +
			"  </TMOV>" +  
			
			"  <TNFE>" +   
			"    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" +   
			"    <IDMOV>-1</IDMOV>" +   
			"  </TNFE>" +   
			"  <TMOVFISCAL>" +   
			"    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" +   
			"    <IDMOV>-1</IDMOV>" +   
			"  </TMOVFISCAL> " 
	
		qtde = parseFloat(qtde)
		
		// CALCULA O PREÇO UNITÁRIO DO PRODUTO
		/*var valores = calculaPreco(codOrdem,codColigada,codFilial,qtde)
		
		var precoUnit = parseFloat(valores[2])
		
		var valorTotal = parseFloat(valores[0])*/
		
		// CALCULA O PREÇO UNITÁRIO DO PRODUTO
		var valores = calculaPreco(codOrdem,codColigada,codFilial,qtde)
		var anterior = 0
		var precoUnit = 0
		
		// CALCULA O CUSTO DOS COMPONENTES APONTADOS
		var custoComponentes = calculaCustoComponentes(seqAtv)
		
		log.info("custoPosto: "+custoPosto+", custoComponentes: "+custoComponentes+", qtde: "+qtde)
		
		log.info("vou calcular o preço unitário")
		
		// SE TEVE RETORNO
		if(!(valores.length==0) ){
			
			log.info("tem saldo já apontado")
			
			anterior = parseFloat(valores[0])
			
			log.info("custo efetivado: "+anterior)
			log.info("qtde já efetivada: "+ parseFloat(valores[1]))
			
			//precoUnit = (anterior + custoPosto + custoComponentes) / ( parseFloat(valores[1]) + qtde)
			precoUnit = (anterior + (custoPosto * saldo) + custoComponentes) / parseFloat(valores[1])
			
			log.info("precoUnit: "+precoUnit)
			
		} else {

			precoUnit = ( (custoPosto * saldo) + custoComponentes) / qtde
		
			log.info("precoUnit: "+precoUnit)
			
		}
		
		var valorTotal = precoUnit * qtde
		
		var valorServico = buscaValorServico(codOrdem,codColigada,codFilial)
		
		valorServico = valorServico.toString()
	
		if(valorServico.indexOf(",")!='-1'){
			
			valorServico = valorServico.replace(",",".")
			
		}
		
		valorServico = parseFloat(valorServico)
		
		custoPosto = parseFloat(custoPosto)
		
		valorServico = valorServico + (saldo * custoPosto)
		
		valorServico = parseFloat(valorServico).toFixed(2)
		
		log.info("(antes do replace) valorServico: "+valorServico)
		log.info("(antes do replace) valor total item: "+valorTotal)
		log.info("(antes do replace) preco unit: "+precoUnit)
		log.info("(antes do replace) qtde: "+qtde)
		
		qtde = qtde.toString().replace(".",",")
		valorServico = valorServico.toString().replace(".",",")
		precoUnit = precoUnit.toString().replace(".",",")
		valorTotal = valorTotal.toString().replace(".",",")
		
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
 	var soma = dataset.getValue(0,"SOMACUSTO")
 	
 	log.info("soma: "+soma)
 	
 	return soma
 	
}

// CALCULA O CUSTO DOS COMPONENTES APONTADOS
function calculaCustoComponentes(seqAtv){
	
	var indexes = hAPI.getChildrenIndexes("COMPONENTESGERAL")
	
	var custoTotal = 0
	
	// PERCORRE TODOS OS COMPONENTES GERAIS
	for(var i=0; i<indexes.length; i++){
		
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
		if(seqAtv==seqAtvComp){
				
			log.info("seqAtv "+seqAtv+" é igual a seqAtvComp "+seqAtvComp)
			log.info("idprd: "+idprd+" pertence a seqAtv "+seqAtv)
			
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
