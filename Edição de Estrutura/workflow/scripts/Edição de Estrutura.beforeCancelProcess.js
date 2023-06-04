// ANTES DE FINALIZAR A SOLICITAÇÃO
function beforeCancelProcess(colleagueId,processId){
	
	log.info("Entrei no beforeCancelProcess Processo de Edição de Estrutura");
	
	// SALVA A FLAG DO PROCESSO QUE A SOLICITAÇÃO FOI CANCELADA
	hAPI.setCardValue("EXCLUSIVO1","CANCELADA");
	
}