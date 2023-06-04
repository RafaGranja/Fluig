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
	
	var numOS = getValue("NUM_OS")
	
	log.info("numOS: "+numOS)
	
	if(!(numOS=="" || numOS==null || numOS==undefined)){
		
		log.info("solicitação já foi finalizada")
		
		form.getElementByClass("beforeCroqui").remove
		form.getElementByClass("divCroqui").remove
		
	}
	
	// EXIBIR NA VIEW 
    if( form.getFormMode() == "VIEW" ) {
		 
	   //form.setValue('RNC_colab_abertura', new java.lang.Integer(1));
    	form.setShowDisabledFields(true);
    	
    	//form.getElementById('INCLUIR').disabled = true;
    		
    	 //if(atv==25){
   		 
   	 	 //} else {
    		form.setVisibleById("loader", false);
   	 		form.setVisibleById("BOTOES_CAB", false);
   	 		form.setVisibleById("APROVACAO", false);
      	 	form.setVisibleById("FORMULARIO", false);
	       	form.setVisibleById("CABECALHO", false);
	       	form.setVisibleById("INCLUIR", false);
	       	form.setVisibleById("EDITAR", false);
	       	//form.setVisibleById("CANCELAR", false);
	       	form.setVisibleById("ALTERAR_CAB", false);
	       	form.setVisibleById("REMOVER_CAB", false);
	       	form.setVisibleById("CANCELAR_CAB", false);
	       	form.setVisibleById("SALVAR", false);
	       	form.setVisibleById("REMOVER", false);
   	 		 
   	 	 //}

    }
		
}