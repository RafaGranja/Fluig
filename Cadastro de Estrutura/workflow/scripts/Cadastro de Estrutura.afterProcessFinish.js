function afterProcessFinish(processId){
	
	var numProcess = getValue("WKNumProces");
	var activity   = getValue('WKNumState');
	//var NUMNCM     = hAPI.getCardValue("NUMNCM");
	//var controle   = hAPI.getCardValue("CONTROLEMARC");
	//var coligada   = hAPI.getCardValue("CampoColigada");
	//var coligada 	= '1'
	//var codfilial 	= '7'
	
    log.info("Entrei no afterProcessFinish - Processo Estrutura");
	
	// EXECUTA A FÓRMULA VISUAL
	//execFV()
	
	log.info("Vou executar a PROCEDURE")
	
	// EXECUTA A PROCEDURE
	execProcedure()
	
	log.info("Executei a PROCEDURE")
	
	// ATUALIZA CAMPO INTEGRADO
	//salvaIntegrado()
	
	log.info("Finalizei o afterProcessFinish - Processo Estrutura")
	
}

// SALVA INTEGRADO NA ESTRUTURA
function salvaIntegrado(){
	
	var numOS = hAPI.getCardValue("NUM_OS")
	
	var a1 = DatasetFactory.createConstraint("OS", numOS, numOS, ConstraintType.MUST);

    var constraints = new Array(a1);

    log.info("Vou salvar o campo INTEGRADO da OS "+numOS)
    
    var dataset = DatasetFactory.getDataset("dsSalvaIntegradoOS", null, constraints, null);
    
    log.info("Terminei de salvar INTEGRADO")

}

// EXECUTA FORMULA VISUAL
function execFV(){
	
	log.info("afterFinishProcess - Formula Visual");
   
    var numProcesso = getValue("WKNumProces");

    var c1 = DatasetFactory.createConstraint("NUMPROCESSO", numProcesso, numProcesso, ConstraintType.MUST);

    var constraints = new Array(c1);

    var dataset = DatasetFactory.getDataset("dsFormulaVisual", null, constraints, null);

}

// EXECUTA A PROCEDURE
function execProcedure(){
	
	log.info("afterFinishProcess - PROCEDURE");
   
    var numProcesso = getValue("WKNumProces");

    var c1 = DatasetFactory.createConstraint("NUMPROCESSO", numProcesso, numProcesso, ConstraintType.MUST);

    var constraints = new Array(c1);

    log.info("Vou executar o dataset da PROCEDURE")
    
    var dataset = DatasetFactory.getDataset("dsProcedureEstrutura", null, constraints, null);

    log.info("Executei o dataset da PROCEDURE")
    
}
