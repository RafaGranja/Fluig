// EXECUTA A PROCEDURE DO PROCESSO DE EDIÇÃO DE ESTRUTURA
/*function createDataset(fields, constraints, sortFields) {

	var dsProcedureEstruturaEdicao = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/FluigDSRM";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;
    
    var numProcesso = ""
    
    if (constraints != null) {
    	
        for (var i = 0; i < constraints.length; i++) {
        	
        	if(constraints[i].fieldName == "NUMPROCESSO"){
        		
        		numProcesso = constraints[i].initialValue; ;
        		
        	} 
        	
        }
        
    }  
    
    var myQuery = "EXEC SP_CRM_EDICAOESTRUTURA "+numProcesso;

    log.info("QUERY dsProcedureEstruturaEdicao: " + myQuery);
    
    try {
    	
        var conn = ds.getConnection();
        var stmt = conn.createStatement();
        var rs = stmt.execute(myQuery);
        
        
    } catch (e) {
        
    	log.error("ERRO==============> " + e.message);
    
    } finally {
    	
        if (stmt != null) {
        	
            stmt.close();
            
        }
        
        if (conn != null) {
        	
            conn.close();
            
        }
        
    }
    
    return dsProcedureEstruturaEdicao;

}*/


// EXECUTA FORMULA VISUAL PARA INTEGRAÇÃO DA EDIÇÃO PRINCIPAL
function createDataset(fields, constraints, sortFields) {
	
	log.info("DATASET INTEGRAÇÃO EDIÇÃO PRINCIPAL PELA FÓRMULA VISUAL");
	
	var dataset =  DatasetBuilder.newDataset();
	var nomeServico = "WSFORMULAVISUAL";
	var caminhoServico = "com.totvs.WsFormulaVisual"
		
	try {
		
		var servico = ServiceManager.getServiceInstance(nomeServico);
		log.info("Serviço : "+servico);
		var instancia = servico.instantiate(caminhoServico);
		log.info("Instancia do serviço : "+instancia);
		var ws = instancia.getRMIwsFormulaVisual();
		log.info("WS : "+ws);
		var help = servico.getBean();
		log.info("Help : "+help);
		var autenticar = help.getBasicAuthenticatedClient(ws,"com.totvs.IwsFormulaVisual","fluig","zaq12wsxZAQ!@WSX");
		log.info("Autenticar: " + autenticar);
		
		var numProcesso = "";
		var tipo = "";

		log.info("constraints.length : "+constraints.length);
	    
		for(var i =0;constraints.length>i;i++)
		{ 
			
			if(constraints[i].fieldName == "NUMPROCESSO"){
		    	numProcesso = constraints[i].initialValue;
		    	log.info("numProcesso: "+numProcesso);
			}
			if(constraints[i].fieldName == "TIPO"){
		    	tipo = constraints[i].initialValue;
		    	log.info("tipo: "+tipo);
			}
			
		}
		
		var context = "CODCOLIGADA=0;CODSISTEMA=G;CODUSUARIO=fluig";
		
		var parametros =	"	<PARAMETRO>"+
        					"		<NUMFLUIG>"+numProcesso+"</NUMFLUIG>"+
        					"		<TIPO>"+tipo+"</TIPO>"+
        					"		<CODTRFPAI></CODTRFPAI>"+
        					"		<EXECUCAO></EXECUCAO>"+
        					"	</PARAMETRO>";
        					

	    log.info("PARAMETROS: " + parametros);
	    
        var result = autenticar.execute(0,57,context,"",parametros,"");
        log.info("Result : " + result.toString());
        log.dir(result);
	        
	} catch (e) {
		// TODO: handle exception
		
		if (e == null) {
			
        	e = "Erro desconhecido; verifique o log do AppServer";
        
		}
		
        var mensagemErro = "Erro na comunicação com o Progress OpenEdge (linha: " + e.lineNumber + "): " + e;
        log.error(mensagemErro);
        log.info(mensagemErro);
        
	}
	
	return dataset;
	
}