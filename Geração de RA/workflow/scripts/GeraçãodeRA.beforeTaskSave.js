// TAREFA DE SERVIÇO PARA INTEGRAÇÃO DO MOVIMENTO DE TRANSFERÊNCIA
function beforeTaskSave(colleagueId,nextSequenceId,userList){
	
	// VERIFICA SE JÁ TEM MOVIMENTO DE TRANSFERÊNCIA, SE NÃO TEM, GERA
	movimentoTransferencia()
	
}

// VERIFICA SE JÁ TEM MOVIMENTO DE TRANSFERÊNCIA, SE NÃO TEM, GERA
function movimentoTransferencia(){
	
	log.info("vou criar o movimento de transferência")
	
	var NOME_DATASERVER = "MovMovimentoTBCData" 	  
	var usuario = "fluig"
	var usuarioAtual = hAPI.getCardValue("USUARIOATUAL")

	log.info("Vou salvar o número do processo "+numProcess)
	var numProcess = getValue("WKNumProces");
	hAPI.setCardValue("NUMPROCESSO",numProcess)
	
	var senha = "zaq12wsxZAQ!@WSX" 
	var authService = getWebService(usuario, senha)
	var ret  = ""
			
	var indexes = hAPI.getChildrenIndexes("COMPONENTES");
	
	log.info("tam indexes: "+indexes.length)
	
	// PERCORRE TODOS OS REGISTROS DA TABELA DOS COMPONENTES
	for(var i = 0; i < indexes.length; i++){
		
		// SALVA AS INFORMAÇÕES 
		var idprd = hAPI.getCardValue("IDPRDREQ___" + indexes[i])
		var codigoPrd = hAPI.getCardValue("COMPONENTEREQ___" + indexes[i])
		var qtde = hAPI.getCardValue("QTDEREQ___" + indexes[i])
		var precoUnit = hAPI.getCardValue("CUSTOMEDIOREQ___" + indexes[i])
		var codloc = hAPI.getCardValue("CODLOCREQ___" + indexes[i])
		var requisitando = hAPI.getCardValue("REQUISITANDO___" + indexes[i])
		var codColigada = hAPI.getCardValue("CODCOLIGADAREQ___" + indexes[i])
		var codFilial = hAPI.getCardValue("CODFILIALREQ___" + indexes[i])
		var codlocDestino = "23" 
		var numOS = hAPI.getCardValue("OSREQ___" + indexes[i])
		var codOrdem = hAPI.getCardValue("OPREQ___" + indexes[i])
		var idAtvOrdem = hAPI.getCardValue("IDATVREQ___" + indexes[i])
		var context = "CodUsuario=fluig;CodSistema=T;CodColigada="+codColigada
		
		log.info("idprd: "+idprd+", codigoPrd: "+codigoPrd+", qtde: "+qtde+", precoUnit: "+precoUnit+", " +
				"codloc: "+codloc+", requisitando: "+requisitando+", codColigada: "+codColigada+", " +
				"codFilial: "+codFilial+", codlocDestino: "+codlocDestino+", numOS: "+numOS+", codOrdem: " +
				codOrdem+", idAtvOrdem: "+idAtvOrdem)
				
		// SE ESTÁ SELECIONADO
		if(requisitando=="1"){
			
			log.info("vou requisitar")
			
			log.info("idprd: "+idprd+", qtde: "+qtde+", codigoPrd: "+codigoPrd+", precoUnit: "+precoUnit+", codloc: "+codloc)
			
			// SE MOVIMENTO DE TRANSFERÊNCIA AINDA NÃO FOI GERADO PARA O COMPONENTE PARA A ATIVIDADE DA OP
			//if( !(temMovTransferencia(codColigada,codFilial,codOrdem,idAtvOrdem,idprd) ) ){

				// SE QUANTIDADE DO CONSUMO PLANEJADO NÃO É NULO
				if( !( (qtde=="" || qtde==null || qtde==undefined || qtde=="null") && (precoUnit=="" || precoUnit==null || precoUnit==undefined || precoUnit=="null") ) ){
					
					// SE QTDE TEM PONTO
					if(qtde.indexOf(".")!=-1){
						
						qtde = qtde.replace(".",",")
						
					}
					
					// SE QTDE TEM PONTO
					if(precoUnit.indexOf(".")!=-1){
						
						precoUnit = precoUnit.replace(".",",")
						
					}
					
					//RA DEVE SER GERADA SEMPRE NO LOCAL DO LOCAL 22 PARA O 23
					codloc = "22"
					
					log.info("idprd: "+idprd+", qtde: "+qtde+", precoUnit: "+precoUnit+", codloc: "+codloc)
					
					var XML = "<MovMovimento >" +   
						"  <TMOV>" +   
						"	 <CODUSUARIO>" + usuario + "</CODUSUARIO>" +
						"    <CODCOLIGADA>" + codColigada + "</CODCOLIGADA>" +   
						"    <IDMOV>-1</IDMOV>" +   
						"    <CODFILIAL>" + codFilial + "</CODFILIAL>" +   
						"    <CODLOC>" + codloc + "</CODLOC>" +   
						"    <CODLOCENTREGA>" + codloc + "</CODLOCENTREGA>" +   
						"    <CODLOCDESTINO>" + codlocDestino + "</CODLOCDESTINO>" +   
						"    <CODTMV>1.1.05</CODTMV>" +   
						"    <TIPO>A</TIPO>" +   
						"    <DATAEMISSAO>" + dataAtualFormatada() + "</DATAEMISSAO>" +   
						"    <DATABASEMOV>" + dataAtualFormatada() + "</DATABASEMOV>" +   
						"    <DATAMOVIMENTO>" + dataAtualFormatada() + "</DATAMOVIMENTO>" +   
						"    <CODFILIALDESTINO>" + codFilial + "</CODFILIALDESTINO>" +   
						"    <DATALANCAMENTO>" + dataAtualFormatada() + "</DATALANCAMENTO>" +
						"	 <CODCCUSTO>" + numOS + "</CODCCUSTO>" +
						"	 <CAMPOLIVRE1>" + codOrdem + "</CAMPOLIVRE1>" +
						"	 <CAMPOLIVRE2>" + idAtvOrdem + "</CAMPOLIVRE2>" +
						"  </TMOV>" +
						"  <TNFE>" +   
						"    <CODCOLIGADA>" + codColigada + "</CODCOLIGADA>" +   
						"    <IDMOV>-1</IDMOV>" +   
						"  </TNFE>" +   
						"  <TMOVFISCAL>" +   
						"    <CODCOLIGADA>" + codColigada + "</CODCOLIGADA>" +   
						"    <IDMOV>-1</IDMOV>" +   
						"  </TMOVFISCAL>" 
					
					XML = XML +    
						"  <TITMMOV>" +   
						"    <CODCOLIGADA>" + codColigada + "</CODCOLIGADA>" +   
						"    <IDMOV>-1</IDMOV>" +   
						"    <NSEQITMMOV>1</NSEQITMMOV>" +   
						"    <CODFILIAL>" + codFilial + "</CODFILIAL>" +   
						"    <NUMEROSEQUENCIAL>1</NUMEROSEQUENCIAL>" +   
						"    <IDPRD>" + idprd + "</IDPRD>" +
						"    <QUANTIDADE>" + qtde + "</QUANTIDADE>" +   
						"    <PRECOUNITARIO>" + precoUnit + "</PRECOUNITARIO>" +   
						"    <DATAEMISSAO>" + dataAtualFormatada() + "</DATAEMISSAO>" +   
						"    <CODLOC>" + codloc + "</CODLOC>" +
						//"	 <VALORTOTALITEM>" + valorTotal + "</VALORTOTALITEM> "+
						"	 <CODCCUSTO>" + numOS + "</CODCCUSTO> "+
						"  </TITMMOV>"
						
					XML = XML +    
					   "  <TMOVCOMPL>" +   
					   "    <CODCOLIGADA>" + codColigada + "</CODCOLIGADA>" +      
					   "    <IDMOV>-1</IDMOV>" +   
					   //"    <NUMFLUIG>" + numProcess + "</NUMFLUIG>" +
					   "    <USERFLUIG>" + usuarioAtual + "</USERFLUIG>" +		   
					   "  </TMOVCOMPL>"+   
					   "</MovMovimento>"
							   
						log.info("Vou Gerar Movimento de Entrada de Sucata")
						log.info("Contexto do movimento: "+context)	
						
					    log.info("XML do movimnto é "+XML)
						
					    /*
					    
					    // RETORNA DADOS DOS CLIENTES A PARTIR DA DATA DE MONTAGEM FILTRADA
						var a1 = DatasetFactory.createConstraint("XML", XML, XML, ConstraintType.MUST);
						
						var constraint = new Array(a1);
						
						var dataset = DatasetFactory.getDataset("dsGeraMovTransferencia", null, constraint, null);
						
						var retorno = dataset
						
						log.info("retorno: ")
						log.info(retorno)
						
						*/
					    
				    try{
		        	       
		        	 	  var result = new String(authService.saveRecord(NOME_DATASERVER, XML, context));
		        	 	   
		        	 	  if ((result != null) && (result.indexOf("===") != -1)){
		        	 		  
		        	 		  log.info("erro")
		        	 		  
			        	 	  var mensagemErro = result;  
			        	      throw mensagemErro; 
		        	         	 
		        		  } else {
		        				
		        			  var idmov = result.substring(result.search(";") + 1, result.length);
			        	 		  
			        	 	  log.info("idmov gerado: "+idmov+", indexes[i]: "+ indexes[i])
			        	 	  
			        	 	  hAPI.setCardValue("IDMOVREQ___"+indexes[i],idmov)
			        	 	  
			        	 	  // SALVA O NÚMERO DO MOVIMENTO
			        	 	  salvaNumeroMov(idmov,idprd,codColigada,codFilial,codOrdem,idAtvOrdem)
			        	 	  
		        		  }
		        			
		        	 	  log.info("acabei o try")
		        	 	   
	        	    }
		            	
	        	    catch (e){
	        	    	
	        	        if (e == null) e = "*** CRM *** Erro desconhecido!";  
	        	        
	        	        var mensagemErro = "*** Ocorreu um erro ao gerar o movimento: " + e;  
	        	        log.info(e); 
	        	        throw mensagemErro; 

	        	    }
					
				}
				
			//}
			
		}
				
	}
	
}

// VERIFICA SE MOVIMENTO DE TRANSFERÊNCIA AINDA NÃO FOI GERADO PARA A ATIVIDADE DA OP
function temMovTransferencia(codcoligada,codfilial,codOrdem,idAtvOrdem,idprd){
	
	log.info("vou verificar se já existe o movimento de transferência")
	
	log.info("codcoligada: "+codcoligada+", codfilial: "+codfilial+", codOrdem: "+codOrdem+", idAtvOrdem: "+idAtvOrdem+", idprd: "+idprd)
	
	var ret = false
	
	var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codcoligada,codcoligada,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("CODFILIAL",codfilial,codfilial,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
	var a4 = DatasetFactory.createConstraint("IDATVORDEM",idAtvOrdem,idAtvOrdem,ConstraintType.MUST)
	var a5 = DatasetFactory.createConstraint("IDPRD",idprd,idprd,ConstraintType.MUST)

	var constraints = new Array(a1,a2,a3,a4,a5)
	
	var dataset = DatasetFactory.getDataset("dsBuscaMovTransferencia",null,constraints,null)
 	var row = dataset.getValue(0, "IDMOV")

	log.info("row")
	log.info(row)
	
	// SE RETORNO NÃO É NULO OU VAZIO
	if( !(row=="" || row==null || row==undefined || row=="null" || row=="NULL") ){
		
		ret = true 
		
	}
	
	log.info("retorno: "+ret)
	
	return ret
	
}

// SALVA O NÚMERO DO MOVIMENTO
function salvaNumeroMov(idmov,idprd,codColigada,codFilial,codOrdem,idAtvOrdem){
	 
	log.info("vou salvar o numero do idmov")
	
	log.info("idmov: "+idmov+", idprd: "+idprd+", codOrdem: "+codOrdem+", idAtvOrdem: "+idAtvOrdem)

	var codTmv = "1.1.05"
	
	var c1 = DatasetFactory.createConstraint("CODCOLIGADA", codColigada, codColigada, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("CODFILIAL", codFilial, codFilial, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("IDMOV", idmov, idmov, ConstraintType.MUST);
	var c4 = DatasetFactory.createConstraint("CODTMV", codTmv, codTmv, ConstraintType.MUST);

	var constraints = new Array(c1,c2,c3,c4);
    			    
    var dataset = DatasetFactory.getDataset("dsInfoMovimento", null, constraints, null);

 	var numeroMov = dataset.getValue(0, "NUMEROMOV")

 	log.info("numeroMov: "+numeroMov)
 	
	var indexes = hAPI.getChildrenIndexes("TABELA_RA");
	
	log.info("tam indexes: "+indexes.length)
 	
	// PERCORRE TODOS OS REGISTROS DA TABELA
 	for(var k=0; k<indexes.length; k++){
 		
 		var codColigadaAux = hAPI.getCardValue("CODCOLIGADARA___"+indexes[k])
 		var codFilialAux = hAPI.getCardValue("CODFILIALRA___"+indexes[k])
 		var idprdAux = hAPI.getCardValue("IDPRDRA___"+indexes[k])
 		var codOrdemAux = hAPI.getCardValue("CODORDEMRA___"+indexes[k])
 		var idAtvOrdemAux = hAPI.getCardValue("IDATVORDEMRA___"+indexes[k])
 	
 		// SE É O MESMO REGISTRO
 		if(codColigadaAux == codColigada && codFilialAux == codFilial && idprd == idprdAux && codOrdemAux == codOrdem && idAtvOrdemAux == idAtvOrdem){
 			
 			log.info("achei o registro")
 			
 			// SALVA O NÚMERO DO MOVIMENTO
 			hAPI.setCardValue("NUMERORA___"+indexes[k],numeroMov)
 			
 		}
 		
 	}
	
}

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
