function afterProcessFinish(processId){
	
	log.info("Entrei no afterProcessFinish")
	
	var numProcess = getValue("WKNumProces");
	
	log.info("Vou salvar o número do processo "+numProcess)
	
	hAPI.setCardValue("NUMPROCESSO",numProcess)
		
	log.info("vou executar a procedure do apontamento")
	
	var a1 = DatasetFactory.createConstraint("PROCESSO",numProcess,numProcess,ConstraintType.MUST);
	
	var constraints = new Array(a1);
	
 	var dataset = DatasetFactory.getDataset("dsProcedureApontamento",null,constraints,null);

 	log.info("executei a procedure do apontamento")
	
}