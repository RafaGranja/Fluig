// DEPOIS DE SALVAR A TAREFA
function afterTaskSave(colleagueId,nextSequenceId,userList){
	
	log.info("AfterTaskSave - Edição de Execução de Estrutura")
	
	// SALVA O NÚMERO DA SOLICITAÇÃO 
	hAPI.setCardValue('NUMPROCESSO', getValue('WKNumProces')); 
	hAPI.setCardValue('ATIVIDADE', nextSequenceId); 
	
}