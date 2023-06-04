function beforeTaskSave(colleagueId,nextSequenceId,userList){
	
	var hoje = new Date().toISOString().split('T')[0];
	
	hoje = hoje.split("-");
	
	hoje = hoje[2]+"/"+hoje[1]+"/"+hoje[0];
	
	hAPI.setCardValue('DATAATUAL',hoje);
	 
	var atividade = getValue('WKCurrentState');
	 
	if(atividade==25){
		 
		hAPI.setCardValue('DATAABERTURA',hoje);

		var usuario = fluigAPI.getUserService().getCurrent().getLogin();

		hAPI.setCardValue("SOLICITANTE",usuario);
		 
	}
	
	var today = new Date()
	
	var fechamento = hAPI.getCardValue('DATAFECHAMENTO');
	
	fechamento = fechamento.split("/")

	var horaFechamento = hAPI.getCardValue('HORAFECHAMENTO')

	horaFechamento = horaFechamento.split(":")
	
	fechamento = new Date(fechamento[2],Number(fechamento[1])-1,fechamento[0],Number(horaFechamento[0]),Number(horaFechamento[1]))

	log.info('Fechamento :'+fechamento.toLocaleString())
	log.info('Hoje :'+today.toLocaleString())
	
	if(today>=fechamento){
		
		hAPI.setCardValue('EXCLUSIVO3',1);

		log.info("Não está no prazo - EXCLUSIVO1 = 1")
		
	}
	else{
		
		hAPI.setCardValue('EXCLUSIVO3',0);
		
		log.info("Está no prazo - EXCLUSIVO1 = 0")

	}
	

	
}

