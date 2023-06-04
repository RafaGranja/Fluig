// EXECUTA A FÓRMULA VISUAL DA EDIÇÃO DE ESTRUTURA PARA REVISÃO DO PROJETO
function createDataset(fields, constraints, sortFields) {

    log.info("DATASET INTEGRAÇÃO FORMUAL VISUAL DA EDIÇÃO DE ESTRUTURA");
	
	var dataset =  DatasetBuilder.newDataset();
	var nomeServico = "WSFORMULAVISUAL";
	var caminhoServico = "com.totvs.WsFormulaVisual"
		
	try {
		
		//var connect = DatasetFactory.getDataset('ds_connector', null, null, null);
		//var user = connect.getValue(0, 'luiz.lunardi');
		//var password = connect.getValue(0, '@Pg24221717');
		
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

		log.info("constraints.length : "+constraints.length);
	    
		for(var i =0;constraints.length>i;i++)
		{ 
			
			if(constraints[i].fieldName == "CODCOLIGADA"){
		    	codcoligada = constraints[i].initialValue;
		    	log.info("codcoligada: "+codcoligada);
			}
			if(constraints[i].fieldName == "IDPRJ"){
		    	idprj = constraints[i].initialValue;
		    	log.info("idprj: "+idprj);
			}
			
		}
		
		var context = "CODCOLIGADA=0;CODSISTEMA=G;CODUSUARIO='fluig'";
		
		var parametros =	"	<PARAMETRO> "+
							"       <CODCOLIGADA>"+codcoligada+"</CODCOLIGADA> "+
							"       <IDPRJ>"+idprj+"</IDPRJ> "+
							"	</PARAMETRO>";
        					

	    log.info("PARAMETROS: " + parametros);
	    
	    var result = autenticar.execute(0,23,"CODCOLIGADA=1;CODSISTEMA=G;CODUSUARIO='fluig'","",parametros,"");
	    
        //var result = autenticar.execute(0,16,"CODCOLIGADA=1;CODSISTEMA=G;CODUSUARIO='luiz.lunardi'","",parametros,"");
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