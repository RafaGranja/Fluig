function beforeTaskSave(colleagueId,nextSequenceId,userList){
	
	var numProcess = getValue("WKNumProces");
	var activity   = getValue('WKNumState');
	var coligada 	= '1'
	var codfilial 	= '7'
	
	var exclusivo1 = hAPI.getCardValue("EXCLUSIVO1")
		
    log.info("Entrei no beforeTaskSave do Processo de Edição de Execução de Estrutura");
	
	log.info("activity: "+activity+" e exclusivo1: "+exclusivo1)
	
	// SE ATIVIDADE É DE APROVAR EDIÇÃO
	if(activity==28){
		
		log.info("entrei na atividade 28")
		
		log.info("exclusivo1: "+exclusivo1)
		
		// SE A SOLICITAÇÃO FOI APROVADA PARA INTEGRAÇÃO
	    if (exclusivo1 == "FINALIZAR" ){
	    	
	    	log.info("Solicitação vai ser finalizada")
	    	
	    	// REPLICA AS ALETRAÇÕES PARA TODAS AS EXECUÇÕES 
	    	//replicaExecucoes()
	    	
	    	// CADASTRA OS NOVOS PRODUTOS
	    	CadastraProduto (coligada, codfilial, numProcess);
	    	
            // ATUALIZA CAMPO INTEGRADO
	    	salvaIntegrado()
	    	
	    	var revisao = hAPI.getCardValue("REVISAO")
	    	log.info("revisão: "+revisao)
	    	
	    	// SE HOUVE ALTERAÇÕES QUE GERA A NECESSIDADE REVISÃO DA ESTRUTURA
	    	if(revisao=="SIM"){
	    		
	    		log.info("teve alterações na estrutura para gerar revisão do projeto")
	    		
	    		// EXECUTA A FÓRMULA VISUAL
		    	executaFormulaVisualEdicao(coligada)
		    	
		    	log.info("executei a fórmula visual")
		    	
	    	}
	    	
	    	// EXECUTA A PROCEDURE DA EDIÇÃO
	    	//executaProcedureEdicao()
	    	
			log.info("Integração foi efetuada");
			
	    }else {
	    	
	    	log.info("Solicitação ainda está sendo editada");
	    	
	    }
		
	}
	
    log.info("finalizei o beforeTaskSave do Processo de Edição de Execução de Estrutura")
    
}

// SALVA INTEGRADO NA ESTRUTURA
function salvaIntegrado(){
	
	var numOS = hAPI.getCardValue("NUM_OS")
	var execucao = hAPI.getCardValue("EXECUCAO_INFO")
	
	var a1 = DatasetFactory.createConstraint("OS", numOS, numOS, ConstraintType.MUST);
	var a2 = DatasetFactory.createConstraint("EXECUCAO", execucao, execucao, ConstraintType.MUST);
	
    var constraints = new Array(a1,a2);

    log.info("Vou salvar o campo INTEGRADO")
    
    var dataset = DatasetFactory.getDataset("dsEXSalvaIntegradoOS", null, constraints, null);

}

// REPLICA AS ALETRAÇÕES PARA TODAS AS EXECUÇÕES 
function replicaExecucoes(){
	
	log.info("Replica as alterações para todas as execuções")
	
	var execucoes = hAPI.getCardValue("EXECUCOES_INT")
	var codTrfEx = hAPI.getCardValue("CODTRFEX")
	var numOS = hAPI.getCardValue("NUM_OS")
	var execRef = hAPI.getCardValue("EXECUCAO_INFO")
	
	log.info("execucoes: "+execucoes+", codTrfEx: "+codTrfEx+", numOS: "+numOS+", execRef: "+execRef)
	
	//execucoes = execucoes.toString().split("|")
	execucoes = execucoes.toString().split(";")
	
	log.info("execuções selecionadas: "+execucoes.length)
	
	// PERCORRE TODAS AS EXECUÇÕES SELECIONADAS
	for(var i=0; i<execucoes.length; i++){
		
		//var exec = execucoes[i].toString().split("-")
		var exec = execucoes[i].toString().trim()
		//exec = exec[0].toString().trim()
		
		log.info("execução: "+exec)
		
		// SE NÃO É A EXECUÇÃO DE REFERÊNCIA 
		if(!(exec==execRef)){
			
			log.info("vou executar a procedure para execução: "+exec+", codTrfEx: "+codTrfEx+", OS: "+numOS+", exec Ref: "+execRef)	
		
			var a1 = DatasetFactory.createConstraint("OS", numOS, numOS, ConstraintType.MUST);
			var a2 = DatasetFactory.createConstraint("EXECUCAO_REF", execRef, execRef, ConstraintType.MUST);
			var a3 = DatasetFactory.createConstraint("EXECUCAO", exec, exec, ConstraintType.MUST);
			var a4 = DatasetFactory.createConstraint("CODTRFEX", codTrfEx, codTrfEx, ConstraintType.MUST);
			
		    var constraints = new Array(a1,a2,a3,a4);

		    var dataset = DatasetFactory.getDataset("dsEXProcReplicaEdicao", null, constraints, null);
			
		    log.info("repliquei as alterações para a execução "+exec)
		    
		}
		
	}
	
}

// SALVA O PRODUTO CRIADO PARA TODAS AS EXECUÇÕES
function salvaProdutoExecucoes(result,codigoprd,produtoRM,numOS,idCriacao,execucao){
	
	log.info("Replica as alterações para todas as execuções")
	
	var execucoes = hAPI.getCardValue("EXECUCOES_INT")
	var codTrfEx = hAPI.getCardValue("CODTRFEX")
	var numOS = hAPI.getCardValue("NUM_OS")
	var execRef = hAPI.getCardValue("EXECUCAO_INFO")
	
	//execucoes = execucoes.toString().split("|")
	execucoes = execucoes.toString().split(";")
	
	// PERCORRE TODAS AS EXECUÇÕES SELECIONADAS
	for(var i=0; i<execucoes.length; i++){
	
		//var exec = execucoes[i].toString().split("-")
		var exec = execucoes[i].toString().trim()
		
		log.info("exec: "+exec+", execucao: "+execucao)
		
		// SE NÃO É A EXECUÇÃO DE REFERÊNCIA 
		if(!(exec==execucao)){
			
			  log.info("entrei para salvar o IDPRD")
  	 		  
	 		  log.info("IDPRD: "+result)
	 		  log.info("codigoprd: "+codigoprd)
	 		  log.info("idCriacao: "+idCriacao)
	 		  log.info("numOS: "+numOS)
	 		  log.info("produtoRM: "+produtoRM)
	 		  log.info("execução: "+exec)
	 		  
	 		  // SALVA OS PRODUTOS CRIADOS
			  var c1 = DatasetFactory.createConstraint("IDPRD",result,result,ConstraintType.MUST) 
			  var c2 = DatasetFactory.createConstraint("CODIGOPRD",codigoprd,codigoprd,ConstraintType.MUST) 
			  var c3 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST) 
			  var c4 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
			  var c5 = DatasetFactory.createConstraint("PRODUTORM",produtoRM,produtoRM,ConstraintType.MUST)
		  	  var c6 = DatasetFactory.createConstraint("EXECUCAO",exec,exec,ConstraintType.MUST)
			  	
			  var constraints2 = new Array(c1,c2,c3,c4,c5,c6)
			  var dataset2 = DatasetFactory.getDataset("dsEXSalvaProdutoOS", null, constraints2, null)
	 		
			  log.info("Salvei IDPRD e codigoprd")
			 
			
		}

	}
	
}

// VERIFICA SE UM ITEM DA ESTRUTURA TEM PROCESSO CADASTRADO
function temProcesso(idCriacao){
	
	console.log("verifica se um item da estrutura tem processo cadastrado")
	
	var numOS = hAPI.getCardValue("NUM_OS")
	var execucao = hAPI.getCardValue("EXECUCAO_INFO")

	console.log("numOS: "+numOS+", execucao: "+execucao)
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	var c2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
	var c3 = DatasetFactory.createConstraint("EXECUCAO",execucao,execucao,ConstraintType.MUST)

	var constraints = new Array(c1,c2,c3)
	
	var dataset = DatasetFactory.getDataset("dsEXTemProcesso",null,constraints,null)
    
    var count = dataset.rowsCount
    
    log.info("count:" +count)
		
	// SE RETORNO DA CONSULTA NÃO É VAZIO
	if(!(count==null || count=="" || count==undefined || count=="null" || count==0)){
		
		return true
		
	} else {
		// SE NÃO
		
		return false
		
	}
	
}

// REALIZA O CADASTRO DO PRODUTO NO RM
function CadastraProduto (codcoligada, codfilial, numProcess){
    
    var NOME_DATASERVER = "EstPrdDataBR"  
    //var usuario         = "luiz.lunardi" 
    //var senha           = "@Pg24221717"          
    //var senha 			= "@Pg242217"
	var usuario         = "fluig"
	var senha           = "zaq12wsxZAQ!@WSX"   
    var authService     = getWebService(usuario, senha)  
    //var context         = "CodUsuario=mestre;CodSistema=T;CodColigada="+codcoligada;
    var context         = "CodUsuario=fluig;CodSistema=T;CodColigada="+codcoligada
    var codigoprd       = ""
  
    log.info("beforeTaskSave - CadastraProduto -  Inclusão de novo produto - Edição de Execução de Estrutura")
    
    // CHECA O ÚLTIMO CÓDIGO DO PRODUTO
    var dataset = DatasetFactory.getDataset("dsUltimoCodPrd", null, null, null)
    var codigofinal = dataset.getValue(0, "VALAUTOINC")
    codigofinal = parseInt(codigofinal)
    log.info("retorno do dataset "+codigofinal)
    
    var numOS = hAPI.getCardValue("NUM_OS")
    //var indexes = hAPI.getChildrenIndexes("ESTRUTURA")
    var total = 0;
    var XML = ""
	var codfat = ""
	var grupo = ""
	var subgrupo = ""
	var execucao = hAPI.getCardValue("EXECUCAO_INFO")
	var indicePai = hAPI.getCardValue("INDICEPAI")
		
	log.info("OS: "+numOS+", execucao: "+execucao+", indicePai: "+indicePai)
	
	// BUSCA A ESTRUTURA QUE SERÁ INTEGRADA
	var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST) 	
	var a2 = DatasetFactory.createConstraint("EXECUCAO",execucao,execucao,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("INDICEPAI",indicePai,indicePai,ConstraintType.MUST)
	
	var constraints = new Array(a1,a2,a3)
	var dataset = DatasetFactory.getDataset("dsEXBuscaEstrutura", null, constraints, null)
    
    var count = dataset.rowsCount
    
    log.info("count:" +count)
      	
    // PERCORRE TODOS OS REGISTROS DA TABELA DA ESTRUTURA
    for (var i=0; i < dataset.rowsCount; i++){
    
    	log.info("entrei no laço "+i)
    	
    	var nivel = dataset.getValue(i, "NIVEL")
    	var idprd = dataset.getValue(i, "IDPRD")
    	var idCriacao = dataset.getValue(i, "IDCRIACAO")
    	var tipo = dataset.getValue(i, "TIPODESENHO")
    	var descricao = dataset.getValue(i, "DESCRICAO")
    	var und = dataset.getValue(i, "UNDMEDIDA")
    	
    	log.info("nivel: "+nivel+", idprd: "+idprd+", idCriacao: "+idCriacao)
    		
    	// SE IDPRD NÃO FOI INFORMADO E TIPO NÃO É NÃO MANUFATURADO
    	//if((idprd=="" || idprd==null || idprd==undefined || idprd=="null") && !(tipo=="NAOMANUFATURADO") && temProcesso(idCriacao)){
    	if((idprd=="" || idprd==null || idprd==undefined || idprd=="null") && !(tipo=="NAOMANUFATURADO")){
    		
    		log.info("item "+idCriacao+" não foi cadastrado e é não manufaturado. Vou cadastrar")
    		
    		log.info("tipo: "+tipo+", und: "+und)
    		
    		// SE O TIPO E A UNIDADE FORAM INFORMADOS
    		if(!(tipo=="" || tipo==null || tipo==undefined) && !(und=="" || und==null || und==undefined)){
    			
    			log.info("item vai ser cadastrado como produto")
    			
    			// SE NÍVEL É VAZIO OU O TIPO É ACABADO, É REFERENTE AO PAI PRINCIPAL
            	if(tipo=="ACABADO"){
            		
            		log.info("item pai ou tipo acabado")
            		
            		codigofinal = codigofinal + 1
                	codigoprd = '04.024' + ".0"+codigofinal;
            		grupo = "400"
            		subgrupo = "400.001"
            		codfat = "024"
            			
            		log.info("codigo gerado para o pai: "+codigoprd)
            		
            	} 
            	
        		// SE É UM ITEM DO TIPO INDUSTRIALIZADO
            	else if(tipo=="INDUSTRIALIZACAO"){
            		
            		codigofinal = codigofinal + 1
            		codigoprd = '01.051' + '.0'+codigofinal;
            		grupo = '300'
            		subgrupo = '300.001' 
            		codfat = '051'
            			
            		log.info("codigo gerado: "+codigoprd)
            		
            	} else {

            		log.info("item não é pai ou tipo semiacabado")
            		
                    codigofinal = codigofinal + 1
                	codigoprd = '03.023' + ".0"+codigofinal;
                    grupo = "300"
                    subgrupo = "300.001"
                    codfat = "023"
                	
                	log.info("codigo gerado: "+codigoprd)	
                    
            	}
            
            	XML = 
            	"<EstPrdDataBR >"+
            	"<TPRODUTO>"+
        	    	"<CODCOLPRD>1</CODCOLPRD>"+
        	        "<CODCOLIGADA>1</CODCOLIGADA>"+
        	        "<IDPRD>-1</IDPRD>"+
        	        "<CODIGOPRD>"+codigoprd+"</CODIGOPRD>"+
        	        "<NOMEFANTASIA>"+dataset.getValue(i, "DESCRICAO")+" "+dataset.getValue(i, "POSICAODESENHO")+" "+dataset.getValue(i, "NUMDESENHO")+"</NOMEFANTASIA>"+
        	        "<CODIGOREDUZIDO></CODIGOREDUZIDO>"+
        	        "<TIPO>P</TIPO>"+
        	        "<INATIVO>0</INATIVO>"+
        	        "<DESCRICAO>"+dataset.getValue(i, "DESCRICAO")+" "+dataset.getValue(i, "POSICAODESENHO")+" "+dataset.getValue(i, "NUMDESENHO")+"</DESCRICAO>"+
        	        "<CODUNDCONTROLE>"+und+"</CODUNDCONTROLE>"+
        	        "<CODUNDCOMPRA>"+und+"</CODUNDCOMPRA>"+
        	        "<CODUNDVENDA>"+und+"</CODUNDVENDA>"+
        	        "<CUSTOMEDIO>0.0000</CUSTOMEDIO>"+
        	        "<CUSTOUNITARIO>0.0000</CUSTOUNITARIO>"+
        	        "<CUSTOREPOSICAO>0.0000</CUSTOREPOSICAO>"+
        	        "<CUSTOREPOSICAOB>0.0000</CUSTOREPOSICAOB>"+
        	        "<CODTB3FAT>"+codfat+"</CODTB3FAT>"+
        	        "<SALDOGERALFISICO>0.0000</SALDOGERALFISICO>"+
        	        "<SALDOGERALFINANC>0.0000</SALDOGERALFINANC>"+
        	        "<CONTROLADOPORLOTE>1</CONTROLADOPORLOTE>"+
        	        "<NUMEROCCF>73269000</NUMEROCCF>"+
        	        "<PRODVISIVELCLICBUSINESS>1</PRODVISIVELCLICBUSINESS>"+
        	        "<PRDISENTOFUNRURAL>0</PRDISENTOFUNRURAL>"+
        	        "<TIPOTRIBUTACAO>0</TIPOTRIBUTACAO>"+
        	    	"<SITUACAOMERCADORIA>03</SITUACAOMERCADORIA>"+
        	    	"<INVENTARIOFISCAL>03</INVENTARIOFISCAL>"+
        	    	"<CODCONTA>1.1.3.01.0017</CODCONTA>"+
                "</TPRODUTO>"+
                "<TPRDCOMPL>"+
        	        "  <CODCOLIGADA>1</CODCOLIGADA>"+
        	        "  <IDPRD>-1</IDPRD>"+
        	    	"  <GRUPO1>"+grupo+"</GRUPO1>"+
        	    	"  <SUBGRUPO1>"+subgrupo+"</SUBGRUPO1>"+
        	        "  <NIVEL_FLUIG>"+dataset.getValue(i, "NIVEL")+"</NIVEL_FLUIG>"+
        	        "  <INDICE_FLUIG>"+dataset.getValue(i, "INDICE")+"</INDICE_FLUIG>"+
        	    "</TPRDCOMPL>"+
        	    
        	    "<TPRDFIL>" +
                "  <CODCOLIGADA>1</CODCOLIGADA>" +
                "  <IDPRD>-1</IDPRD>" +
                "  <CODFILIAL>1</CODFILIAL>" +
                "  <ESTOCAVEL>0</ESTOCAVEL>" +
                "  <CONSIGNADO>0</CONSIGNADO>" +
                "</TPRDFIL>" +
                "<TPRDFIL>" +
                "  <CODCOLIGADA>1</CODCOLIGADA>" +
                "  <IDPRD>-1</IDPRD>" +
                "  <CODFILIAL>2</CODFILIAL>" +
                "  <ESTOCAVEL>0</ESTOCAVEL>" +
                "  <CONSIGNADO>0</CONSIGNADO>" +
                "</TPRDFIL>" +
                "<TPRDFIL>" +
                "  <CODCOLIGADA>1</CODCOLIGADA>" +
                "  <IDPRD>-1</IDPRD>" +
                "  <CODFILIAL>3</CODFILIAL>" +
                "  <ESTOCAVEL>0</ESTOCAVEL>" +
                "  <CONSIGNADO>0</CONSIGNADO>" +
                "</TPRDFIL>" +
                "<TPRDFIL>" +
                "  <CODCOLIGADA>1</CODCOLIGADA>" +
                "  <IDPRD>-1</IDPRD>" +
                "  <CODFILIAL>4</CODFILIAL>" +
                "  <ESTOCAVEL>0</ESTOCAVEL>" +
                "  <CONSIGNADO>0</CONSIGNADO>" +
                "</TPRDFIL>" +
                "<TPRDFIL>" +
                "  <CODCOLIGADA>1</CODCOLIGADA>" +
                "  <IDPRD>-1</IDPRD>" +
                "  <CODFILIAL>5</CODFILIAL>" +
                "  <ESTOCAVEL>0</ESTOCAVEL>" +
                "  <CONSIGNADO>0</CONSIGNADO>" +
                "</TPRDFIL>" +
                "<TPRDFIL>" +
                "  <CODCOLIGADA>1</CODCOLIGADA>" +
                "  <IDPRD>-1</IDPRD>" +
                "  <CODFILIAL>6</CODFILIAL>" +
                "  <ESTOCAVEL>0</ESTOCAVEL>" +
                "  <CONSIGNADO>0</CONSIGNADO>" +
                "</TPRDFIL>" +
                "<TPRDFIL>" +
                "  <CODCOLIGADA>1</CODCOLIGADA>" +
                "  <IDPRD>-1</IDPRD>" +
                "  <CODFILIAL>7</CODFILIAL>" +
                "  <ESTOCAVEL>1</ESTOCAVEL>" +
                "  <CONSIGNADO>0</CONSIGNADO>" +
                "</TPRDFIL>" +
                "<TPRDFIL>" +
                "  <CODCOLIGADA>1</CODCOLIGADA>" +
                "  <IDPRD>-1</IDPRD>" +
                "  <CODFILIAL>8</CODFILIAL>" +
                "  <ESTOCAVEL>1</ESTOCAVEL>" +
                "  <CONSIGNADO>0</CONSIGNADO>" +
                "</TPRDFIL> " +
        	    
                "</EstPrdDataBR >"
            
        	    try{
        	       
        	       log.info("entrei no try")
        	    	
        	 	   log.info("*** CRM *** Fluig "+numProcess+" XML Produto:  "+XML);
        	 	   
        	 	   log.info("Vou fazer a autenticação")
        	 	   
        	 	   var result = new String(authService.saveRecord(NOME_DATASERVER, XML, context));
        	 	   
        	 	   log.info("finalizei a autenticação")
        	 	   
        	 	   log.info("*** CRM *** Fluig "+numProcess+" Inclusão de Produto - Resultado:  "+result);
        	 	   
        	 	   // SE A INTEGRAÇÃO NÃO FOI CONCLUÍDA COM SUCESSO
        	 	   if (result.length > 15){
        	     	  
        	         var mensagemErro = result;  
        	         throw mensagemErro; 
        	         
        	 	   }
        	 	   else {
        	 		   
        	 		  result = result.substring(result.search(";") + 1, result.length);
        	     	  
        	 		 var produtoRM = ""+dataset.getValue(i, "DESCRICAO")+" "+dataset.getValue(i, "POSICAODESENHO")+" "+dataset.getValue(i, "NUMDESENHO")+""
       	 		  	 var execucao = hAPI.getCardValue("EXECUCAO_INFO")

        	 		 log.info("entrei para salvar o IDPRD")
    	   	 		  
    	   	 		  log.info("IDPRD: "+result)
    	   	 		  log.info("codigoprd: "+codigoprd)
    	   	 		  log.info("idCriacao: "+idCriacao)
    	   	 		  log.info("numOS: "+numOS)
    	   	 		  log.info("produtoRM: "+produtoRM)
    	   	 		  
    	   	 		  // SALVA OS PRODUTOS CRIADOS
    				  var c1 = DatasetFactory.createConstraint("IDPRD",result,result,ConstraintType.MUST) 
    				  var c2 = DatasetFactory.createConstraint("CODIGOPRD",codigoprd,codigoprd,ConstraintType.MUST) 
    				  var c3 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST) 
    				  var c4 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
    				  var c5 = DatasetFactory.createConstraint("PRODUTORM",produtoRM,produtoRM,ConstraintType.MUST)
    			  	  var c6 = DatasetFactory.createConstraint("EXECUCAO",execucao,execucao,ConstraintType.MUST)
    				  	
    				  var constraints2 = new Array(c1,c2,c3,c4,c5,c6)
    				  var dataset2 = DatasetFactory.getDataset("dsEXSalvaProdutoOS", null, constraints2, null)
       	 		
    				  log.info("Salvei IDPRD e codigoprd")
    				  
    				  // SALVA O PRODUTO PARA TODAS AS EXECUÇÕES
    				  salvaProdutoExecucoes(result,codigoprd,produtoRM,numOS,idCriacao,execucao)
    				  
    				  // SE É UM PRODUTO ACABADO
    				  if(codfat=="024"){
    					 
    					  log.info("É um produto acabado, vou enviar e-mail para o fiscal")
    					  
    					// ENVIA O E-MAIL PARA O FISCAL DE QUE O PRODUTO FOI CRIADO
    					
    					var destinatario = "marcelar@delp.com.br"
    					enviaEmail(codigoprd,descricao,und,numOS,destinatario)
    					
    					destinatario = "miryan.assis@delp.com.br"
    					enviaEmail(codigoprd,descricao,und,numOS,destinatario)  
    					  
    				  }
        	     	  
        	 	   }
        	       
        	 	   log.info("acabei o try")
        	 	   
        	    }
            	
        	    catch (e)   
        	    {
        	    	
        	        if (e == null) e = "*** CRM *** Erro desconhecido!";  
        	        
        	        var mensagemErro = "*** Ocorreu um erro ao incluir produto no RM (coligada "+codcoligada+" ): " + e;  
        	        log.info(e); 
        	        throw mensagemErro; 

        	    }
    			
    		}
    	
    	}    	
    	log.info("terminei o laço "+i+" e o laço tem tamanho "+dataset.rowsCount)
    	
    }
    
    log.info("acabei o laço")

}    	

// VERIFICA SE UM ITEM DA ESTRUTURA TEM PROCESSO CADASTRADO
function temProcesso(idCriacao){
	
	console.log("verifica se um item da estrutura tem processo cadastrado")
	
	var numOS = hAPI.getCardValue("NUM_OS")
	var execucao = hAPI.getCardValue("EXECUCAO_INFO")
	//var execucao = hAPI.getCardValue("EXECUCAO_INFO")

	console.log("numOS: "+numOS)
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	var c2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
	var c3 = DatasetFactory.createConstraint("EXECUCAO",execucao,execucao,ConstraintType.MUST)
	
	var constraints = new Array(c1,c2,c3)
	
	var dataset = DatasetFactory.getDataset("dsEXTemProcesso",null,constraints,null)
    
    var count = dataset.rowsCount
    
    log.info("count:" +count)
		
	// SE RETORNO DA CONSULTA NÃO É VAZIO
	if(!(count==null || count=="" || count==undefined || count=="null" || count==0)){
		
		return true
		
	} else {
		// SE NÃO
		
		return false
		
	}
	
}

// EXECUTA A PROCEDURE DA EDIÇÃO
/*function executaProcedureEdicao(){
	
	var numProcesso = hAPI.getCardValue("NUMPROCESSO")
	var execucao = hAPI.getCardValue("EXECUCAO")
	
	log.info("vou executar a procedure de integração da edição da solicitação "+numProcesso)
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("NUMPROCESSO",numProcesso,numProcesso,ConstraintType.MUST)
	var c2 = DatasetFactory.createConstraint("EXECUCAO",execucao,execucao,ConstraintType.MUST)
	
	var constraints = new Array(c1,c2)
	
	var dataset = DatasetFactory.getDataset("dsEXProcedureEstruturaEdicao",null,constraints,null)
	
	log.info("executei a procedure de integração da edição")
	
}*/

// EXECUTA A FÓRMULA VISUAL
function executaFormulaVisualEdicao(codcoligada){
	
	var idprj = hAPI.getCardValue("IDPRJ_OS")
	//var codcoligada = hAPI.getCardValue("CODCOLIGADA")
	
	log.info("vou executar a fórmula visual do idprj "+idprj+" e da coligada "+codcoligada)
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("IDPRJ",idprj,idprj,ConstraintType.MUST)
	var c2 = DatasetFactory.createConstraint("CODCOLIGADA",codcoligada,codcoligada,ConstraintType.MUST)
	var constraints = new Array(c1,c2)
	
	var dataset = DatasetFactory.getDataset("dsEXFVEdicaoEstrutura",null,constraints,null)
	
	log.info("executei a fórmula visual")
	
}

// ENVIA O E-MAIL PARA SER
function enviaEmail(codigoPrd,descricao,und,numOS,destinatario){
	
    log.info('função email para '+destinatario)
    
	var nome = hAPI.getCardValue("SOLICITANTE")

    var obj = new com.fluig.foundation.mail.service.EMailServiceBean();
    var subject = "FLUIG - Cadastro de Produto Acabado";
    var emailSolic = destinatario
    var mensagem   = "O usuário "+nome+" integrou uma estrutura que gerou um cadastro de produto acabado.<br><br>Produto: <b>"+descricao+"</b><br>Unidade: <b>"+und+"</b><br>OS: <b>"+numOS+"</b><br>Código: <b>"+codigoPrd+"</b>";
    var mailFluig  = "naoresponda@delp.com.br"

    obj.simpleEmail(1,subject, mailFluig, emailSolic, mensagem, "text/html");
    
}

//OBTER O SERVIÇO WEB 
function getWebService(Usuario, Senha){

 var Nome_Servico = "WSRM";
 var Caminho_Servico = "br.com.totvs.WsDataServer";
 //var Caminho_Servico = "com.totvs.WSRM";
 
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
    	
    	log.info("erro na autenticação")
        throw "Instancia do auth service invalida: " + Nome_Servico + " - " + Caminho_Servico;
    }
    
    return authService;
}


function dcReadView(dataservername, context, usuario, senha, filtro)
{    
   // carrega o webservice...
      var authService = getWebService(usuario, senha);
      
   // lê os dados da visão respeitando o filtro passado
      var viewData = new String(authService.readView(dataservername, filtro, context));

      return viewData;
}


function dcReadRecord(dataservername, context, usuario, senha, primaryKey)
{    
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


function dcSaveRecord(dataservername, context, usuario, senha, xml)
{    
   // carrega o webservice...
      var authService = getWebService(usuario, senha);

   // salva o registro de acordo com o xml passado
      var pk = new String(authService.readRecord(dataservername, xml, context));
          
      return pk;
}


//Transforma o conceito de constraints do Fluig para o Filtro do TBC.
function parseConstraints(constraints, filterRequired)
{
    // inicializa o resultado...
    var result = [];
    result.context = "";
    
    // inicializa o filtro...
    var filter = "";
    
    // varre as contraints...
 for    (con in constraints) {
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

function isEmpty(str) {
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



function getXMLFromString(xmlString) {
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

function ChekExist(result)
{
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


function isEmpty(str) {
 return (!str || 0 === str.length);
}

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


function dataentrega(){
    
    var data = new Date();
    data.setDate(data.getDate()+ 15 );
    var dia = data.getDate();
    if (dia.toString().length == 1)
      dia = "0"+dia;
    var mes = data.getMonth()+1;
    if (mes.toString().length == 1)
      mes = "0"+mes;
    var ano = data.getFullYear();  
    return ano+"-"+mes+"-"+dia;
}
