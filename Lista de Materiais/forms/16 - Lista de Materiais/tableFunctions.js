// INCLUI UM NOVO ITEM NA TABELA DE MATERIAIS
function childAdd(){
	
	console.log("Entrei para adicionar um item na tabela MATERIAIS")
	
	var row = wdkAddChild('MATERIAIS')
	
	//$("#ICONRtxtHistoricoITMMOV___"+row).hide();
	//$("#SECUNDARIO___"+row).hide()
	
	//formataCampos()
	 
	return row
	 
}

// INCLUI UM NOVO ITEM NA TABELA DOS FILTROS 
function childAdd2(){
	
	console.log("Entrei para adicionar um item na tabela FILTROS")
	
	var row = wdkAddChild('MATERIAIS_INFO')
	
	$("#TABELA").val("SIM")
	
	return row
	 
}

// INCLUI UM NOVO ITEM NA TABELA DE MATERIAIS SALVOS
function childAdd3(){
	
	var row = wdkAddChild('LISTA_MATERIAIS_SALVOS')

	//$("#EXCLUIRITEM").prop('id','EXCLUIRITEM'+row)
	
	return row
	 
}

// INCLUI UM NOVO ITEM NA TABELA DAS SOMAS 
function childAdd4(){
	
	console.log("Entrei para adicionar um item na tabela das SOMAS")
	
	var row = wdkAddChild('SOMA_MATERIAIS')
	
	return row
	 
}

// INCLUI UM NOVO ITEM NA TABELA DOS FILTROS DOS ITENS SALVOS 
function childAdd5(){
	
	console.log("Entrei para adicionar um item na tabela dO FILTRO DOS SALVOS")
	
	var row = wdkAddChild('MATERIAIS_INFO_SALVOS')
	
	return row
	 
}

// INCLUI UM NOVO ITEM NA TABELA DOS FILTROS DOS ITENS SALVOS 
function childAdd6(){
	
	console.log("Entrei para adicionar um item na tabela das SOMA SALVOS")
	
	var row = wdkAddChild('SOMA_MATERIAIS_SALVOS')
	
	return row
	 
}

function HabilitaEdicao(obj){

	var seq = $(obj).attr("id").split("___")[1]

	if($("#REVISAOSALVOS___"+seq).val() == 0){

		$("#SELECTORIGEMMP1SALVOS___"+seq).attr("disabled",false)
		$("#SELECTORIGEMMP2SALVOS___"+seq).attr("disabled",false)
		$("#QTDORIGEM1SALVOS___"+seq).attr("readonly",false)
		$("#QTDORIGEM2SALVOS___"+seq).attr("readonly",false)
		$("#PEDIDOCOMPRASALVOS___"+seq).attr("readonly",false)

		// $("#PRODUTORM1SALVOS___"+seq).attr("readonly",false)

		// if( $("#CODIGOPRD1SALVOS___"+seq).val() != "" && $("#CODIGOPRD1SALVOS___"+seq).val() != null && $("#CODIGOPRD1SALVOS___"+seq).val() != undefined){

		// 	$("#PRODUTORM2SALVOS___"+seq).attr("readonly",false)
		// 	$("#PRODUTORM3SALVOS___"+seq).attr("readonly",false)
		// 	$("#PRODUTORM4SALVOS___"+seq).attr("readonly",false)
		// 	$("#PRODUTORM5SALVOS___"+seq).attr("readonly",false)
		// 	$("#PRODUTORM6SALVOS___"+seq).attr("readonly",false)

		// }

		$("#OBSGERAISSALVOS___"+seq).attr("readonly",false)
		$(obj).parent().parent().parent().addClass("linha_selecionada")
		$("#CODIFICADOSALVOS___"+seq).parent().removeClass()
		$("#CODIFICADOSALVOS___"+seq).parent().addClass("custom-checkbox")
		$("#CODIFICADOSALVOS___"+seq).parent().addClass("custom-checkbox-warning")
		$("#CODIFICADOSALVOS___"+seq).parent().addClass("custom-checkbox-lg")
		$("#CODIFICADOSALVOS___"+seq).parent().attr("title","Necessita de Revisão")
		$("#REVISAOSALVOS___"+seq).val(1)

	}else if($(obj).parent().parent().parent().hasClass("linha_selecionada")){

		$("#SELECTORIGEMMP1SALVOS___"+seq).attr("disabled",true)
		$("#SELECTORIGEMMP2SALVOS___"+seq).attr("disabled",true)
		$("#QTDORIGEM1SALVOS___"+seq).attr("readonly",true)
		$("#QTDORIGEM2SALVOS___"+seq).attr("readonly",true)
		$("#PEDIDOCOMPRASALVOS___"+seq).attr("readonly",true)
		// $("#PRODUTORM1SALVOS___"+seq).attr("readonly",true)
		// $("#PRODUTORM2SALVOS___"+seq).attr("readonly",true)
		// $("#PRODUTORM3SALVOS___"+seq).attr("readonly",true)
		// $("#PRODUTORM4SALVOS___"+seq).attr("readonly",true)
		// $("#PRODUTORM5SALVOS___"+seq).attr("readonly",true)
		// $("#PRODUTORM6SALVOS___"+seq).attr("readonly",true)
		$("#OBSGERAISSALVOS___"+seq).attr("readonly",true)
		$(obj).parent().parent().parent().removeClass("linha_selecionada")
		$("#CODIFICADOSALVOS___"+seq).parent().removeClass()
		$("#CODIFICADOSALVOS___"+seq).parent().addClass("custom-checkbox")
		$("#CODIFICADOSALVOS___"+seq).parent().addClass("custom-checkbox-lg")

		if( $("#CODIGOPRD1SALVOS___"+seq).val() != "" && $("#CODIGOPRD1SALVOS___"+seq).val() != null && $("#CODIGOPRD1SALVOS___"+seq).val() != undefined){

			$("#CODIFICADOSALVOS___"+seq).parent().addClass("custom-checkbox-success")
			$("#CODIFICADOSALVOS___"+seq).parent().attr("title","OK")

		}
		else{

			$("#CODIFICADOSALVOS___"+seq).parent().addClass("custom-checkbox-danger")
			$("#CODIFICADOSALVOS___"+seq).parent().attr("title","Não codifcado")

		}
		$("#REVISAOSALVOS___"+seq).val(0)

	}
	else{

		$("#SELECTORIGEMMP1SALVOS___"+seq).attr("disabled",false)
		$("#SELECTORIGEMMP2SALVOS___"+seq).attr("disabled",false)
		$("#QTDORIGEM1SALVOS___"+seq).attr("readonly",false)
		$("#QTDORIGEM2SALVOS___"+seq).attr("readonly",false)
		$("#PEDIDOCOMPRASALVOS___"+seq).attr("readonly",false)

		// $("#PRODUTORM1SALVOS___"+seq).attr("readonly",false)

		// if( $("#CODIGOPRD1SALVOS___"+seq).val() != "" && $("#CODIGOPRD1SALVOS___"+seq).val() != null && $("#CODIGOPRD1SALVOS___"+seq).val() != undefined){

		// 	$("#PRODUTORM2SALVOS___"+seq).attr("readonly",false)
		// 	$("#PRODUTORM3SALVOS___"+seq).attr("readonly",false)
		// 	$("#PRODUTORM4SALVOS___"+seq).attr("readonly",false)
		// 	$("#PRODUTORM5SALVOS___"+seq).attr("readonly",false)
		// 	$("#PRODUTORM6SALVOS___"+seq).attr("readonly",false)

		// }

		$("#OBSGERAISSALVOS___"+seq).attr("readonly",false)
		$(obj).parent().parent().parent().addClass("linha_selecionada")
		$("#CODIFICADOSALVOS___"+seq).parent().removeClass()
		$("#CODIFICADOSALVOS___"+seq).parent().addClass("custom-checkbox")
		$("#CODIFICADOSALVOS___"+seq).parent().addClass("custom-checkbox-warning")
		$("#CODIFICADOSALVOS___"+seq).parent().addClass("custom-checkbox-lg")
		$("#CODIFICADOSALVOS___"+seq).parent().attr("title","Necessita de Revisão")
		$("#REVISAOSALVOS___"+seq).val(1)

	}

	AtualizaDash()



}

// EXCLUI ITEM NA TABELA DE MATERIAIS SALVOS
function fnCustomDelete(oElement){
	
	// EXIBE ALERTA
	Swal.fire({
	
		  title: 'Tem certeza que deseja remover este item?',
		  text: "Atenção, essa ação não poderá ser desfeita.",
		  icon: 'warning',
		  showCancelButton: true,
		  allowEscapeKey: true,
		  allowOutsideClick: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Sim',
		  cancelButtonText: 'Cancelar',
		
	}).then(function(result){
		
		  // SE SIM
		  if (result.value) {
			  
		    // ATIVA O LOAD
		    ativaSpinner()
		    //$("#PANEL1").css("opacity","0.2")
		    //$("#loader").show();
		    
		    var seq = $(oElement).attr("id").split("___")[1]
		    
		    var idCriacao = $("#IDCRIACAOSALVOS___"+seq).val()
		    
		    var numOS = $("#NUM_OS").val()
		    
		    console.log("seq: "+seq+", idCriacao: "+idCriacao+", numOS: "+numOS)
		    
		    // APAGA O ITEM DA TABELA DOS COMPONENTES
		    //removeItemComponente(numOS,idCriacao)
		    
		    fnWdkRemoveChild(oElement)
			
		    // APAGA A LISTA
		    // apagaLista()
		    //apagaListaSalvos()
		    
		    // APAGA OS FILTORS
		    apagaListaFiltros()
		    apagaListaFiltrosSalvos()

		    // CARREGA A LISTA
		    carregaLista()
		    carregaListaSalvos()
		    
		    // CONSTRÓI OS FILTROS
		    reconstroiFiltros()
		    reconstroiFiltrosSalvos()
		    
		    // DESATIVA O LOAD
		    desativaSpinner()
		    
		    // EXIBE ALERTA DA REMOÇÃO 
		    Swal.fire(
		      'Item removido!',
		      'success'
		    )
		    
		  } 
	  
	})
    
}

// APAGA O ITEM DA TABELA DOS COMPONENTES
function removeItemComponente(numOS,idCriacao){
	
	console.log("vou remover o item de idCriacao: "+idCriacao+", numOS: "+numOS)
		
	var a1 = DatasetFactory.createConstraint("IDCRIACAOCOMPONENTES",idCriacao,idCriacao,ConstraintType.MUST);
	var a2 = DatasetFactory.createConstraint("OSCOMPONENTES",numOS,numOS,ConstraintType.MUST);

	var constraints = new Array(a1,a2);
	
	var dataset = DatasetFactory.getDataset("dsDeleteItemCompOS",null,constraints,null);
	
}

// VERIFICA SE A TABELA JÁ TEM ITENS
function tabelaTemItens(){
	
	// VARIÁVEL PARA CONTROLE
	var itens = false;
	
	// PERCORRE A TABELA E VERIFICA SE TEM ITENS
	$('input[id^="DESCRICAO___"]').each(function(index, value){
		
		itens = true
		
	})
	
	return itens
	
}

// LIMPA A TABELA DE MATERIAIS
function limpaTabela(){
	
	// PERCORRE OS ITENS DA TABELA E REMOVE O SEU CONTEÚDO
	$("input[id^='DESCRICAO___']").each(function(index, value){
		
		$(this).parents("tr").remove();
		
	});

	// ESCONDE TÍTULO DA TABELA
	$(".tituloTabela").hide()
	
}