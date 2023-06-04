function afterTaskComplete(colleagueId,nextSequenceId,userList){
	 
	 
	 /*
	  * 
	  * Variáveis principais
	  * 
	  * */
	var atv = getValue("WKNumState");
	var num_processo = getValue ("WKNumProces");     
	var usuario = getValue ("WKUser");
	var texto = hAPI.getCardValue("VALOR_RADIO3")
	     
	//var sequenceId = getValue("WKNumState");
	     if(texto == "SIM"){
	    	 texto = "APROVADO"
	     }
	  	if(texto == "NÃO"){
		  texto = "REPROVADO"
	  }
	  	if(texto == "REPROVADO"){
	  		texto = "ALTERAR"
	  	}
	  

	     //  Atividade Reprovada pelo fiscal
	     if(atv == 6){
		   if(nextSequenceId==4 || nextSequenceId == 7){     
				 hAPI.setTaskComments(usuario, num_processo, 0, texto); 
				 
				 } 
	   }  
	   
	     
	
	 
	 
	 
	 //  Atividade Aprovado pela diretoria
	// if(nextSequenceId==15){     
	// hAPI.setTaskComments(usuario, processId, 0, "Aguardando aprovação do gerente."); 
	// }
	 
	 
	 
}function afterTaskComplete(colleagueId,nextSequenceId,userList){}