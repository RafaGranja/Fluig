// ANTES DE FINALIZAR A SOLICITAÇÃO
function beforeCancelProcess(colleagueId,processId){
	
	log.info("Entrei no beforeCancelProcess Processo de Edição de Estrutura");
	
	// BUSCA O NÚMERO DA OS DA LISTA DE MATERIAIS
	var numOS = hAPI.getCardValue("NUM_OS")
	
	var a1 = DatasetFactory.createConstraint("NUM_OS",numOS,numOS,ConstraintType.MUST);
	
	var constraints = new Array(a1);
	
	var dataset = DatasetFactory.getDataset("dsCancelaListaMateriais",null,constraints,null);
	
}