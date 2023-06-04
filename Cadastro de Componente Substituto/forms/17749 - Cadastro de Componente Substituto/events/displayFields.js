function displayFields(form,customHTML){ 

	//var tabela = parseInt(form.getElementById("TEMTABELA").value);

	//PEGA O VALOR DA ATIVI
	var atv = getValue("WKNumState");
	form.setValue("ATIVIDADE", atv);

	// PEGA O NÚMERO DA SOLICITAÇÃO E COLOCA NO CAMPO NUMPROCESSO
	var processo = getValue("WKNumProces");
	form.setValue("NUMPROCESSO",processo);

	//PEGA O MODO DE VISUALIZAÇÃO DO FORMULÁRIO
	var formmode = form.getFormMode();
	form.setValue("FORMMODE",formmode);
	
	// PEGA O NOME DO USUÁRIO ATUAL
	//var usuario = fluigAPI.getUserService().getCurrent().getFullName();
	var usuario = fluigAPI.getUserService().getCurrent().getCode();
	form.setValue("USUARIOATUAL",usuario);

	var qtdrows= form.getValue("QTDROWSAUX");
	var qtdprincipal = form.getValue("CONTADORPRINCIPAIS");

	


	// EXIBIR NA VIEW 
    if( form.getFormMode() == "VIEW" ) {
		 
		form.setValue("NUMPROCESSO",processo);
	   //form.setValue('RNC_colab_abertura', new java.lang.Integer(1));

    	form.setShowDisabledFields(true);
    	form.setHideDeleteButton(false);
		form.setVisibleById("TABELAAUX",true);
		form.setVisibleById("DATACRIACAO",true);
    	form.setVisibleById("BUSCARCOMPPRINC",false);
		form.setVisibleById("DIVFILTRAPRINCIPAL",false);

		form.setValue("DATACRIACAO",form.getValue("DATAORIGINAL"));

    	for(var i=0; i<qtdrows ;i++){
    		
    		form.setVisibleById("CODFILIALAUX___"+i,true);
    		form.setVisibleById("COLIGADAAUX___"+i,true);
    		form.setVisibleById("ESTRUTURAAUX___"+i,true);
    		form.setVisibleById("CODATIVIDADEAUX___"+i,true);
    		form.setVisibleById("PRODORIGEMAUX___"+i,true);
    		form.setVisibleById("PRODUTOAUX___"+i,true);
    		form.setVisibleById("QTDUSADAAUX___"+i,true);
			form.setVisibleById("UNIDAUX___"+i,true);
    		
    		
    	}

    }
	//else if(atv == "0"){
	//	form.setVisibleById("form", false);
	//}
	//else{
	//	form.setVisibleById("form", true);
	//}


}

function formataValorVirgula(obj){
	
	var valor = obj.value
	console.log("valor: "+valor)
	
	// SE VALOR NÃO É NÚMERO
	if(isNaN(valor)){
		
		$(obj).val("")
		
		// EXIBE ALERTA 
		var Toast = Swal.mixin({
			toast: true,
			position: 'center',
			showConfirmButton: false,
			timer: 4000,
			timerProgressBar: true,
		})
	
		Toast.fire({
			icon: 'warning',
			title: 'Digite um valor correto!\n Use apenas vírgulas e números para expressar as quantidades',			
			stopOnFocus: true,
		})
		
	} else {

		valor=parseFloat(valor).toFixed(4)
		valor = valor.replace(".",",")
		console.log("novo valor: "+valor)
		$(obj).val(valor);
		
	}
	
}