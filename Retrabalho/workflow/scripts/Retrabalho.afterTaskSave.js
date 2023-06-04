function afterTaskSave(colleagueId,nextSequenceId,userList){
	
	var numProcess = getValue("WKNumProces");
	var activity   = getValue('WKNumState');
	var coligada 	= hAPI.getCardValue("CODCOLIGADA")
	var codfilial 	= hAPI.getCardValue("CODFILIAL")
	
    log.info("Entrei no AfterTaskSave Processo Retrabalho");
	
	log.info("solicitação: "+numProcess)
	
	log.info("codcoligada: "+coligada+", codfilial: "+codfilial)
	
	log.info("atividade "+activity)
	
	// SE É ATIVIDADE DE EDITAR
	/*if(activity==11){
		
		log.info("entrei na atividade "+activity)
		
    	// EXECUTA PROCEDURE PARA INTEGRAR A ORDEM DE RETRABALHO
    	execProcedure()
		
    }*/
	
}

// EXECUTA A PROCEDURE
function execProcedure(){
	
    var numProcesso = getValue("WKNumProces");

    var c1 = DatasetFactory.createConstraint("NUMPROCESSO", numProcesso, numProcesso, ConstraintType.MUST);

    var constraints = new Array(c1);

    log.info("Vou executar o dataset da PROCEDURE DE RETRABALHO")
    
    var dataset = DatasetFactory.getDataset("dsProcedureRetrabalho", null, constraints, null);

    /*log.info("dataset")
    log.info(dataset)
    
    var opGerada = dataset.getValue(0, "OPGERADA")
    
    hAPI.setCardValue("OPGERADA",opGerada)
    
    log.info("Opgerada: "+opGerada)*/
    
    log.info("Executei o dataset da PROCEDURE")
    
}