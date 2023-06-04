function displayFields(form,customHTML){ 
	
	log.info("entrei no displayFields")
	
	// PEGA O VALOR DA ATIVIDADE ATUAL E COLOCA NO CAMPO ATIVIDADE
	var atv = getValue("WKNumState");
	form.setValue("ATIVIDADE", atv);
		
	// PEGA O NÚMERO DA SOLICITAÇÃO E COLOCA NO CAMPO NUMPROCESSO
	var processo = getValue("WKNumProces");
	form.setValue("NUMPROCESSO",processo);
	
	// PEGA O NOME DO USUÁRIO ATUAL
	var usuario = fluigAPI.getUserService().getCurrent().getLogin();
	//var usuario = fluigAPI.getUserService().getCurrent().getCode();
	form.setValue("USUARIOATUAL",usuario);
	
	var atv = getValue("ATIVIDADE")
	
	
	// EXIBIR NA VIEW 
    if( form.getFormMode() == "VIEW" ) {
		 
	   //form.setValue('RNC_colab_abertura', new java.lang.Integer(1));
    	form.setShowDisabledFields(true);


    	form.setValue("FORMVIEW",1);

    }
	else{

		form.setValue("FORMVIEW",0);

	}
		
}