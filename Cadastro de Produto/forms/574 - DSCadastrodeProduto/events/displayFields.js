function displayFields(form,customHTML){ 
	
	// PEGA O VALOR DA ATIVIDADE ATUAL E COLOCA NO CAMPO ATIVIDADE
	var atv = getValue("WKNumState");
	form.setValue("ATIVIDADE", atv);
		
	// PEGA O NÚMERO DA SOLICITAÇÃO E COLOCA NO CAMPO NUMPROCESSO
	var processo = getValue("WKNumProces");
	form.setValue("NUMPROCESSO",processo);
	
	// PEGA O NOME DO USUÁRIO ATUAL
	//var usuario = fluigAPI.getUserService().getCurrent().getFullName();
	var nome = fluigAPI.getUserService().getCurrent().getFullName();
	var usuario = fluigAPI.getUserService().getCurrent().getLogin()
	var matricula = fluigAPI.getUserService().getCurrent().getCode();
	form.setValue("USUARIOATUAL",usuario);
	form.setValue("SOLICITANTE",matricula);
	
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
    console.log("ATV: " + atv);
	if(atv == "7"){
		form.setVisibleById("divCODPRODUTO", true);
	}
	else{
		form.setVisibleById("divCODPRODUTO", false);
	}
}