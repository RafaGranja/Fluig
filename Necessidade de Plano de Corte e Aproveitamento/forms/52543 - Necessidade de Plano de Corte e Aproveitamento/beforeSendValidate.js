var beforeSendValidate = function(numState,nextState){
	
	console.log("Entrei no before")
	
	// VARIÁVEL PARA ATIVIDADE
    var atv = numState
    
    // VARIÁVEL PARA USUÁRIO ATUAL
    var usuario = $("#USUARIOATUAL").val()
    
    console.log("atv: "+atv)
    console.log("usuario: "+usuario)
    
    // SE ATV É A INICIAL 
    if(atv==0 || atv==4){
    	
    	// FAZ A INTEGRAÇÃO DE ITENS QUE NÃO FORAM INTEGRADOS
    	integrar()
    	
    }
    
    console.log("final do before")
    
}