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
		
    	console.log("entrei no display Fields")
    	
	   //form.setValue('RNC_colab_abertura', new java.lang.Integer(1));
    	form.setShowDisabledFields(true);
    	form.setHideDeleteButton(true);
    	
    	form.setVisibleById("EXCLUIR", false);
    	form.setVisibleById("SALVAR", false);
		form.setVisibleById("SALVOS_BLANK", false);
    	//form.setVisible("span",false)
    	
    	//form.setVisibleById("ITEM", false)//.style.visibility = "hidden";
    	
    	    	
    	 var indexes = form.getChildrenIndexes("LISTA_MATERIAIS_SALVOS");
    	 
    	 if (indexes.length > 0) {
    		 
    	        for (var i = 0; i < indexes.length; i++) {
    	            
    	        	form.setVisibleById('EXCLUIRITEM', false) 
    	            
    	        }
    	        
    	 }
    	
    	 form.setVisibleById("loader", false)
    	
    	/*var indexes = form.getChildrenIndexes("LISTA_MATERIAIS_SALVOS");
    	
        if (indexes.length > 0) {
            for (var i = 0; i < indexes.length; i++) { // percorre os campos Pai x Filho
                
            	form.setVisibleById("EXCLUIRITEM___"+(i+1),false)
            	
            }
        }*/

    	/*var cells = table.getElementsByClassName("EXCLUIR_ITEM"); 
    	for (var i = 0; i < cells.length; i++) { 
    	    cells[i].disabled = true;
    	}*/
    	
    	//form.getElementsByClassName("EXCLUIR_ITEM").disabled = true;
    	//form.setVisibleByClass("EXCLUIR_ITEM", false);
    	
    	//form.getElementById('INCLUIR').disabled = true;
    	
   	 	 //form.setVisibleById("BOTOES_CAB", false);
    	 //form.setVisibleById("APROVACAO", false);
   	 	 //form.setVisibleById("FORMULARIO", false);
    	 //form.setVisibleById("CABECALHO", false);
    	 //form.setVisibleById("INCLUIR", false);
    	 //form.setVisibleById("EDITAR", false);
    	 //form.setVisibleById("CANCELAR", false);
    	 //form.setVisibleById("ALTERAR_CAB", false);
    	 //form.setVisibleById("REMOVER_CAB", false);
    	 //form.setVisibleById("CANCELAR_CAB", false);
    	 //form.setVisibleById("CANCELAR", false);
    	 //form.setVisibleById("EXCLUIRITEM___1", false);
    	

    }
		
}