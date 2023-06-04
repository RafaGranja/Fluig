function afterProcessFinish(processId){
	
	log.info("Entrei no afterProcessFinish")
	
	var numProcess = getValue("WKNumProces");
	
	log.info("Vou salvar o número do processo "+numProcess)
	
	hAPI.setCardValue("NUMPROCESSO",numProcess)

	var c1 = DatasetFactory.createConstraint("NUMPROCESSO",numProcess,numProcess,ConstraintType.MUST)
	
	log.info("Vou vincular os movimentos ")

	var constraints = new Array(c1)
	var dataset = DatasetFactory.getDataset("dsProcedureApontMP",null,constraints,null)

	log.info("executei a procedure do apontamento de materia prima")

}