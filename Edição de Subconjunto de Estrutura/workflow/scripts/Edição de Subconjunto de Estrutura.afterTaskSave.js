// DEPOIS DE SALVAR A TAREFA
function afterTaskSave(colleagueId,nextSequenceId,userList){
	
	log.info("AfterTaskSave - Edição de Subconjutno de Estrutura")
	
	// SALVA O NÚMERO DA SOLICITAÇÃO 
	hAPI.setCardValue('NUMPROCESSO', getValue('WKNumProces')); 
	hAPI.setCardValue('ATIVIDADE', nextSequenceId); 
	
}