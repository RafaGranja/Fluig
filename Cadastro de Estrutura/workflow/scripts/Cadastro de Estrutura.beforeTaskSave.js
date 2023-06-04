function beforeTaskSave(colleagueId,nextSequenceId,userList){
	
	var numProcess = getValue("WKNumProces");
	var activity   = getValue('WKNumState');
	//var NUMNCM     = hAPI.getCardValue("NUMNCM");
	//var controle   = hAPI.getCardValue("CONTROLEMARC");
	//var coligada   = hAPI.getCardValue("CampoColigada");
	var coligada 	= '1'
	var codfilial 	= '7'
	
    log.info("Entrei no beforeTaskSave Processo Estrutura");
	
	var indexes = hAPI.getChildrenIndexes("ESTRUTURA");
	 
	// PERCORRE TODOS OS REGISTROS DA TABELA ESTRUTURA
	/*for (var i = 0; i < indexes.length; i++) {
	    	
		hAPI.setCardValue("SOLICITACAO___" + indexes[i],numProcess)
	    	
	}
   
	var indexesComp = hAPI.getChildrenIndexes("TABELACOMPONENTES");
   
	// PERCORRE TODOS OS REGISTROS DA TABELA ESTRUTURA
	for (var j = 0; j < indexesComp.length; j++) {
	    	
		hAPI.setCardValue("SOLICITACAOCOMPONENTES___" + indexesComp[j],numProcess)
	    	
	}
   
	var indexesProc = hAPI.getChildrenIndexes("TABELAPROCESSO");
   
	// PERCORRE TODOS OS REGISTROS DA TABELA ESTRUTURA
	for (var k = 0; k < indexesProc.length; k++) {
	    	
		hAPI.setCardValue("SOLICITACAOPROCESSO___" + indexesProc[k],numProcess)
	    	
	}*/
	
	// SE É ATIVIDADE DE APROVAR CADASTRO
	if(activity==14){
		
		// SE A SOLICITAÇÃO FOI APROVADA PARA INTEGRAÇÃO
	    if ( hAPI.getCardValue("VALOR_RADIO3")== "SIM" ){
	    	
			CadastraProduto (coligada, codfilial, numProcess);
			
			log.info("Integração foi efetuada");
			
	    }else {
	    	
	    	log.info("Solicitação foi reprovada ou encaminhada para alteração");
	    	
	    }
		
	}
	
}

// REALIZA O CADASTRO DO PRODUTO NO RM
function CadastraProduto (codcoligada, codfilial, numProcess){
    
    var NOME_DATASERVER = "EstPrdDataBR"  
    //var usuario         = "luiz.lunardi"
	//var senha           = "@Pg24221717"
	var usuario         = "fluig"
	var senha           = "zaq12wsxZAQ!@WSX"          
    var authService     = getWebService(usuario, senha)  
    //var context         = "CodUsuario=mestre;CodSistema=T;CodColigada="+codcoligada;
    var context         = "CodUsuario=fluig;CodSistema=T;CodColigada="+codcoligada
    var codigoprd       = ""
  
    log.info("beforeTaskSave - CadastraProduto -  Inclusão de novo produto")
    
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
	
	log.info("OS: "+numOS)
	
	// BUSCA A ESTRUTURA QUE SERÁ INTEGRADA
	var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST) 	
	var constraints = new Array(a1)
	var dataset = DatasetFactory.getDataset("dsBuscaEstrutura", null, constraints, null)
    
    var count = dataset.rowsCount
    
    log.info("count:" +count)
      	
    // PERCORRE TODOS OS REGISTROS DA TABELA DA ESTRUTURA
    for (var i=0; i < dataset.rowsCount; i++){
    
    	log.info("entrei no laço "+i)
    	
    	var nivel = dataset.getValue(i, "NIVEL")
    	var idprd = dataset.getValue(i, "IDPRD")
    	var idCriacao = dataset.getValue(i, "IDCRIACAO")
    	var tipo = dataset.getValue(i, "TIPODESENHO")
    	var und = dataset.getValue(i, "UNDMEDIDA")
    	var descricao = dataset.getValue(i, "DESCRICAO")
    	var ncm = ""
    	
    	log.info("nivel: "+nivel+", idprd: "+idprd+", idCriacao: "+idCriacao)
    		
    	// SE IDPRD NÃO FOI INFORMADO E TIPO NÃO É NÃO MANUFATURADO
    	//if((idprd=="" || idprd==null || idprd==undefined || idprd=="null") && !(tipo=="NAOMANUFATURADO") && temProcesso(idCriacao)){
		if((idprd=="" || idprd==null || idprd==undefined || idprd=="null") && !(tipo=="NAOMANUFATURADO")){
    			
    		log.info("item "+idCriacao+" não foi cadastrado e não é não manufaturado. Vou cadastrar")
    		
			log.info("tipo: "+tipo+", und: "+und)
    			
    		// SE O TIPO E A UNIDADE FORAM INFORMADOS
    		if(!(tipo=="" || tipo==null || tipo==undefined) && !(und=="" || und==null || und==undefined)){
    		
    			log.info("item vai ser cadastrado como produto")

    			// SE NÍVEL É VAZIO, É REFERENTE AO PAI PRINCIPAL
            	if(tipo=="ACABADO"){
            		
            		codigofinal = codigofinal + 1
                	codigoprd = '04.024' + ".0"+codigofinal;
            		grupo = "400"
            		subgrupo = "400.001"
            		codfat = "024"
            		ncm = ""
            			
            		log.info("codigo gerado para o pai: "+codigoprd)
            		
            	} 
            	
        		// SE É UM ITEM DO TIPO INDUSTRIALIZADO
            	else if(tipo=="INDUSTRIALIZACAO"){
            		
            		codigofinal = codigofinal + 1
            		codigoprd = '03.051' + '.0'+codigofinal;
            		grupo = '300'
            		subgrupo = '300.001' 
            		codfat = '051'
            		ncm = ""
            			
            		log.info("codigo gerado: "+codigoprd)
            		
            	} else {

                    codigofinal = codigofinal + 1
                	codigoprd = '03.023' + ".0"+codigofinal;
                    grupo = "300"
                    subgrupo = "300.001"
                    codfat = "023"
                	ncm = ""
                		
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
    				  	
    				  var constraints2 = new Array(c1,c2,c3,c4,c5)
    				  var dataset2 = DatasetFactory.getDataset("dsSalvaProdutoOS", null, constraints2, null)
       	 		
    				  log.info("Salvei IDPRD e codigoprd")
    				  
    				  // SE É UM PRODUTO ACABADO
    				  if(codfat=="024"){
    					 
    					  log.info("É um produto acabado, vou enviar e-mail para o fiscal")
    					  
    					// ENVIA O E-MAIL PARA O FISCAL DE QUE O PRODUTO FOI CRIADO
    					
    					var destinatario = "marcelar@delp.com.br"
    					enviaEmail(codigoprd,descricao,und,numOS,destinatario)
    					
    					var destinatario = "miryan.assis@delp.com.br"
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
    
	//execFV()
    
    // EXECUTA A PROCEDURE
	//execProcedure() 
	
	// ATUALIZA CAMPO INTEGRADO
	salvaIntegrado()
	

}    	

// VERIFICA SE UM ITEM DA ESTRUTURA TEM PROCESSO CADASTRADO
function temProcesso(idCriacao){
	
	console.log("verifica se um item da estrutura tem processo cadastrado")
	
	var numOS = hAPI.getCardValue("NUM_OS")
	//var execucao = hAPI.getCardValue("EXECUCAO_INFO")

	console.log("numOS: "+numOS)
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	var c2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)

	var constraints = new Array(c1,c2)
	
	var dataset = DatasetFactory.getDataset("dsTemProcesso",null,constraints,null)
    
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

// EXECUTA A PROCEDURE
function execProcedure(){
	
	log.info("Vou executar a Procedure");
   
    var numProcesso = getValue("WKNumProces");

    var c1 = DatasetFactory.createConstraint("NUMPROCESSO", numProcesso, numProcesso, ConstraintType.MUST);

    var constraints = new Array(c1);

    log.info("Vou executar o dataset da PROCEDURE")
    
    var dataset = DatasetFactory.getDataset("dsProcedureEstrutura", null, constraints, null);

    log.info("Executei o dataset da PROCEDURE")
    
}

// SALVA INTEGRADO NA ESTRUTURA
function salvaIntegrado(){
	
	var numOS = hAPI.getCardValue("NUM_OS")
	
	var a1 = DatasetFactory.createConstraint("OS", numOS, numOS, ConstraintType.MUST);

    var constraints = new Array(a1);

    log.info("Vou salvar o campo INTEGRADO")
    
    var dataset = DatasetFactory.getDataset("dsSalvaIntegradoOS", null, constraints, null);

	
}

// IMPLEMENTA A FÓRMULA VISUAL (** FUNÇÃO NÃO UTILIZADA **)
function formulaVisual (codcoligada, codfilial, numProcess){
    
    var NOME_DATASERVER = "IwsFormulaVisual";  
    //var usuario         = "luiz.lunardi"; 
    //var senha           = "@Pg24221717";
    var usuario         = "fluig"
	var senha           = "zaq12wsxZAQ!@WSX"  
    var authService     = getWebService(usuario, senha);  
    var context         = "CodUsuario=fluig;CodSistema=T;CodColigada="+codcoligada;
    var codigoprd       = ""
  
    log.info("beforeTaskSave - CadastraProduto -  Inclusão de novo produto");
    
    var indexes = hAPI.getChildrenIndexes("ESTRUTURA");
    var total = 0;
    var XML = ""
    
    //codigoprd += 1
    
    // PERCORRE TODOS OS REGISTROS DA TABELA ESTRUTURA
 
    for (var i = 0; i < indexes.length; i++) {
    
    	XML = 
    		"<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:tot='http://www.totvs.com/'>"+
    	   "<soapenv:Header/>"+
    	   "<soapenv:Body>"+
    	      "<tot:Execute>"+
    	         "<tot:codColigada>0</tot:codColigada>"+
    	         "<tot:idFormula>10</tot:idFormula>"+
    	         "<tot:context></tot:context>"+
    	         "<tot:dataSetXML></tot:dataSetXML>"+
    	         "<tot:parametersXML></tot:parametersXML>"+
    	         "<tot:ownerData></tot:ownerData>"+
    	      "</tot:Execute>"+
    	  "</soapenv:Body>"+
    	"</soapenv:Envelope>"
    	
	    try{
	        
	 	   log.info("*** CRM *** Fluig "+numProcess+" XML Produto:  "+XML);
	    
	 	   var result = new String(authService.Execute(NOME_DATASERVER, XML, context));

	 	   log.info("*** CRM *** Fluig "+numProcess+" Inclusão de Produto - Resultado:  "+result);
	 	   
	 	   // SE A INTEGRAÇÃO FOI CONCLUÍDA COM SUCESSO
	 	   if (result.length > 15){
	     	  
	         var mensagemErro = result;  
	         throw mensagemErro; 
	         
	 	   }
	 	   else {
	 		   
	 		   console.log("Fórmula visual - sucesso!")
	     	  
	 	   }
	       
	    }  
	    catch (e)   
	    {  
	        if (e == null) e = "*** CRM *** Erro desconhecido!";  
	        
	        var mensagemErro = "*** Ocorreu um erro ao incluir produto no RM (coligada "+codcoligada+" ): " + e;  
	        log.info(mensagemErro); 
	        throw mensagemErro; 

	    }
    	
    }
  
}

// EXECUTA FORMULA VISUAL (** FUNÇÃO NÃO UTILIZADA **)
function execFV(){
	
	log.info("beforeTaskSave - Formula Visual");
   
    var numProcesso = getValue("WKNumProces");

    var c1 = DatasetFactory.createConstraint("NUMPROCESSO", numProcesso, numProcesso, ConstraintType.MUST);

    var constraints = new Array(c1);

    var dataset = DatasetFactory.getDataset("dsFormulaVisual", null, constraints, null);

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

/**'
* A API de autenticação da Totvs baseia no "Basic access authentication" do HTTP.
* Código Java para autenticação 
* Programa responsável por integrar com os Webservices do RM 
*  Exemplo dev valores para os parâmetros 
*       @param string Usuario = "mestre";
*       @param string Senha = "totvs";
*/

// OBTER O SERVIÇO WEB 
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
