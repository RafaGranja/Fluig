function displayFields(form,customHTML){ 
	
	// PEGA O VALOR DA ATIVIDADE ATUAL E COLOCA NO CAMPO ATIVIDADE
	var atv = getValue("WKNumState");
	form.setValue("ATIVIDADE", atv);
		
	// PEGA O NÚMERO DA SOLICITAÇÃO E COLOCA NO CAMPO NUMPROCESSO
	var processo = getValue("WKNumProces");
	form.setValue("NUMPROCESSO",processo);
	
	// PEGA O NOME DO USUÁRIO ATUAL
	//var usuario = fluigAPI.getUserService().getCurrent().getFullName();
	var usuario = fluigAPI.getUserService().getCurrent().getCode();
	form.setValue("USUARIOATUAL",usuario);
	
	var atv = getValue("ATIVIDADE")
	
	// EXIBIR NA VIEW 
    if( form.getFormMode() == "VIEW" ) {
		 
    	form.setShowDisabledFields(true);

    }
		
}