function displayFields(form,customHTML){ 
	
	// PEGA O VALOR DA ATIVIDADE ATUAL E COLOCA NO CAMPO ATIVIDADE
	var atv = getValue("WKNumState");
	form.setValue("ATIVIDADE", atv);
		
	// PEGA O NÚMERO DA SOLICITAÇÃO E COLOCA NO CAMPO NUMPROCESSO
	var processo = getValue("WKNumProces");
	form.setValue("NUMPROCESSO",processo);
	
	// PEGA O NOME DO USUÁRIO ATUAL
	//var usuario = fluigAPI.getUserService().getCurrent().getFullName();
	var usuario2 = fluigAPI.getUserService().getCurrent().getCode();
	var usuario = fluigAPI.getUserService().getCurrent().getLogin();

	form.setValue("CODUSUARIOATUAL",usuario2)
	
	form.setValue("USUARIOATUAL",usuario);
	
	var atv = getValue("ATIVIDADE")
	
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