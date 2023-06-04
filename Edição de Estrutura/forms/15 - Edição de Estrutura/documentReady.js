// CARREGA O FORMULÁRIO
$(document).ready(function(){

	// VARIÁVEL PARA GUARDAR ATIVIDADE ATUAL
	var atv = $("#ATIVIDADE").val();
	var numProcesso = $("#NUMPROCESSO").val();
	var user

	// DESATIVA LOAD
	desativaSpinner()

	var pesquisa=document.getElementById("pesquisa");
	pesquisa.style.display='none';
	$("#TEMPESQUISA").val(0)

	var calculadora=document.getElementById("calculadora");
	calculadora.style.display='none';
	$("#TEMCALCULADORA").val(0)
	
	console.log("Sim, entrei no documentReady na atv atual: "+atv)

	console.log("numProcesso: "+numProcesso)

	// SE O NÚMERO DA SOLICITAÇÃO JÁ FOI CRIADO
	if(!(numProcesso=="" || numProcesso==null || numProcesso==undefined)){
	    
	    console.log("já salvou processo, vou verificar usuário")
	    
	    // VERIFICA SE USUÁRIO ASSUMIU O PROCESSO
	    user = usuarioAssumiuProcesso(numProcesso)
	    
	} else {
	    // SE NÃO
	    
	    console.log("não salvou processo")
	    
	    user = true
	    
	}

	// SE USUÁRIO JÁ ASSUMIU A TAREFA
	if(user){
		
		// SE ATIVIDADE FOR A INICIAL
		if(atv==0) {
			
			// MOSTRA/ESCONDE CAMPOS DO FORMULÁRIO
			$("#EXCLUSIVO1").val("")
			$(".OS_COPIA").hide()
			$(".VIEW").hide()
			$(".BOTOES_CAB").hide()
			$(".FORMULARIO").hide()
			$(".RADIO_CAB").hide()
			$(".APROVACAO").hide()
			$(".INFO_INDICE_PAI").hide()
			$(".INFO_TAREFA").hide()
			$(".VOLTAR_OS").hide()
			$(".ALTERAR_OS").hide()
			$("#loader").hide()
			$(".SOLABERTAS").hide()
			$("#DIV_FINALIZAREDICAO").hide()
			$(".VOLTARAFETADOS").hide()
			
		}
		
		// SE ATIVIDADE FOR A INICIAL DEPOIS DE SALVAR OU A DE EDITAR ESTRUTURA
		if(atv==4 || atv==11){
			
			// ATUALIZA OS SEQ's
			//atualizaSeq()
			
			// SALVA O NUMERO DO PROCESSO
			salvaNumProcesso()
			
			// LIMPA OS ITENS DA LISTA DA TABELA COMPONENTES
			//limpaItensComponentesLista()
		
			// MOSTRA/ESCONDE CAMPOS DO FORMULÁRIO
			$("#EXCLUSIVO1").val("")
			$(".OS_COPIA").hide()
			$(".INFO_INDICE_PAI").hide()
			$(".FORMULARIO").hide()
			$(".RADIO_CAB").hide()
			$(".INFO_OS").hide()
			$(".APROVACAO").hide()
			$(".INFO_TAREFA").hide()
			$(".INCLUIR_CAB").show()
			$(".INFO_INDICE").show()
			$(".VOLTARAFETADOS").hide()
			$(".BOTOES_CAB").hide()
			$("#DIV_FINALIZAREDICAO").hide()
			$("#loader").hide();
			
			// SE JÁ TEM ITENS NA TABELA, NÃO É O PAI
			if(tabelaTemItens()){
			
				//$(".BOTOES_CAB").show()
				//$("#DIV_FINALIZAREDICAO").show()
				$(".SOLABERTAS").show()
			
			} else {
				// SE NÃO
			
				//$(".BOTOES_CAB").hide()
				//$("#DIV_FINALIZAREDICAO").hide()
				$(".SOLABERTAS").hide()
				
			}
			
			console.log("atualizar Novo")
			
			// ATUALIZA O CONTEÚDO DA VIEW
			atualizar()
			
			// APAGA OS ITENS DA LISTA DE MATERIAIS E ATUALIZA
			//limpaItensComponentesLista()
			//buscaComponentes()
			
			var radio3 = $("#VALOR_RADIO3").val()
			
			// SE CAMPO RADIO4 JÁ FOI PREENCHIDO
			if(radio3=="ALTERAR"){
				
				// MOSTRA/ESCONDE CAMPOS
				$(".RADIO3").show()
				$(".OBSERVACOES").hide()
				$(".MOTIVO").show()
				$(".APROVACAO").show()
				
				// DESABILITA OS CAMPOS DO RADIO
				$("#MOTIVO").prop("readonly",true)
				$("#RAD3_SIM").prop("disabled",true)
				$("#RAD3_NAO").prop("disabled",true)
				$("#RAD3_ALTERAR").prop("disabled",true)
				
			}
			
			$(".os").prop("onclick", null);
			
		}
		
		// SE A ATIVIDADE FOR A DE APROVAR ESTRUTURA
		if(atv==28) {
			
			// ESCONDE O LOAD
			$("#loader").hide();
			
			// ATUALIZA OS SEQ's
			//atualizaSeq()
			
			// ESCONDE MENU DE ALTERAÇÕES
			$(".BOTOES_CAB").hide()
			
			// APAGA OS ITENS DA LISTA DE MATERIAIS E ATUALIZA
			//limpaItensComponentesLista()
			//buscaComponentes()
			
			//
			var radio3 = $("#VALOR_RADIO3").val()
			console.log("radio3 "+radio3)
			
			//
			if(!(radio3=="" || radio3==undefined || radio3==null)){
				
				$("#RAD3_ALTERAR").prop("checked",true)
				$(".MOTIVO").show()
				$(".OBSERVACOES").hide()
				
				
			} else {
				
				$(".MOTIVO").hide()
				
			}
					
			// MOSTRA/ESCONDE CAMPOS DO FORMULÁRIO
			$("#EXCLUSIVO1").val("")
			//$(".VIEW").hide()
			$(".OS_COPIA").hide()
			$(".BOTOES_CAB").hide()
			$(".INFO_INDICE").show()
			$(".VOLTAR_OS").hide()
			$(".FORMULARIO").hide()
			$(".RADIO_CAB").hide()
			$(".INFO_OS").hide()
			$(".INCLUIR_CAB").show()
			$(".INFO_INDICE_PAI").hide()
			$(".INFO_TAREFA").hide()
			$(".VOLTARAFETADOS").hide()
			//$(".MOTIVO").hide()
			
			// ATUALIZA O CONTEÚDO DA VIEW
			atualizar()
			
			//$("a").hide()
			$(".os").prop("onclick", null);
			
		}
		
	}
	
	// SE ATIVIDADE FOR A DE FINALIZAR
	if(atv==25){
		
		console.log("entrei na atv 25")
		
		// ESCONDE O LOAD
		$("#loader").hide();
		
		// ATUALIZA OS SEQ's
		//atualizaSeq()
		
		// ESCONDE MENU DE ALTERAÇÕES
		$(".BOTOES_CAB").hide()
		
		// APAGA OS ITENS DA LISTA DE MATERIAIS E ATUALIZA
		//limpaItensComponentesLista()
		//buscaComponentes()
		
		//
		var radio3 = $("#VALOR_RADIO3").val()
		console.log("radio3 "+radio3)
		
		//
		if(!(radio3=="" || radio3==undefined || radio3==null)){
			
			$("#RAD3_ALTERAR").prop("checked",true)
			$(".MOTIVO").show()
			$(".OBSERVACOES").hide()
			
			
		} else {
			
			$(".MOTIVO").hide()
			
		}
		
		// MOSTRA/ESCONDE CAMPOS DO FORMULÁRIO
		$("#EXCLUSIVO1").val("")
		//$(".VIEW").hide()
		$(".BOTOES_CAB").hide()
		$(".OS_COPIA").hide()
		$(".INFO_INDICE").show()
		$(".FORMULARIO").hide()
		$(".RADIO_CAB").hide()
		$(".INFO_OS").hide()
		$(".INCLUIR_CAB").show()
		$(".INFO_INDICE_PAI").hide()
		$(".INFO_TAREFA").hide()
		//$(".MOTIVO").hide()
		
		// SALVA O IDCRIACAO DO PAI PARA TODOS OS ITENS DA ESTRUTURA
		salvaIdCriacaoPai()
		
		// ATUALIZA O CONTEÚDO DA VIEW
		atualizar()
		
		//$("a").hide()
		$(".os").prop("onclick", null);
		
	}
	
	// FORMATA CAMPOS COM VALIDAÇÃO VISUAL
	//formataCampos()
	//formataReload()
	
});
	
// SE BOTÃO PARA CÓPIA DOS FILHOS FOI SELECIONADO
$(document).on('click', '#RECUARFILHOS', function(e) {
	
	var myLoading2 = FLUIGC.loading(window);
	
	myLoading2.show();
	
	setTimeout(function(){
	
		console.log("vou reucar apenas os filhos")
	
		var indiceSelecionado = $("#INDICE_INFO").val()
		
		var indicesFilhos = buscaIndicesFilhos(indiceSelecionado)
		
		// PERCORRE TODOS OS REGISTROS 
		for(var i=0; i<indicesFilhos.length; i++){
			
			var indice = indicesFilhos[i]
			
			var indices = retornaArrayIndices()
				
			// RECUA O INDICE
			indice = recuaIndice(indice,indices)
		
		}
		
		// ATUALIZA A VIEW
		atualizar()
		
		console.log("indiceSelecionado: "+indiceSelecionado)
		
		indiceSelecionado = indiceSelecionado.replace(/\./g,"P")
		
		$("#SPANINTERNO"+indiceSelecionado+"").click()
		$(".fluigicon-circle-arrow-left").mouseout()
	
		// FAZ A ALTERAÇÃO DO CÁLCULO DA QUANTIDADE TOTAL
		alteraDesQtdeGeral()
		
		Swal.hideLoading() 
		
	},500)
	
	// DESATIVA O LOAD
	setTimeout(function(){
			
		myLoading2.hide();
			
	}, 500)
		
})

// SE BOTÃO PARA CÓPIA DOS FILHOS FOI SELECIONADO
$(document).on('click', '#TFILHOS', function(e) {
	
	console.log("vou fechar o sweet alert")

	Swal.close()

	var myLoading2 = FLUIGC.loading(window);
	
	myLoading2.show();
	
	setTimeout(function(){
		
		console.log("------ VOU EXECUTAR A FUNÇÃO DE COPIAR TODOS OS FILHOS ------")
		
		// SE NÃO, TODOS OS FILHOS SERÃO COPIADOS
		  
	  	console.log("opção de copiar todos os filhos")
	  	
	  	var indice = $("#INDICE_INFO").val()
	  	
	  	/*var numOS = $("#NUM_OS").val()
							
		// CONSULTA BANCO
		var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
		var constraints = new Array(c1)
		
		dataset = DatasetFactory.getDataset("dsBuscaEstruturaIntegrada",null,constraints,null)
		
		var row = dataset.values
		var count = dataset.values.length
	  	
	  	var indices = arrayIndices(row, count)*/
	  	var indices = retornaArrayIndices()
	  	
	  	var novoIndice = copiaIndice(indice)
	  	
	  	// SE ÍNDICE TEM IRMÃO À DIREITA
		if(idTemIrmaoDir(indice,indices,0)){
			
			var irmaoDireita = idTemIrmaoDir(indice,indices,1)
			
			// INCREMENTA TODOS OS ÍNDICES À DIREITA
			incrementaIndice(irmaoDireita,indices)
			
		}
	  	
		var idCriacao = buscaIdCriacao(indice)

  		var numOS = $("#NUM_OS").val()
	
		// CONSTRÓI A CONSULTA DO DATASET
		var a1 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
		var a2 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
		
		var constraints = new Array(a1,a2)
		//var dataset = DatasetFactory.getDataset("dsCabecalhoEstruturaOS",null,constraints,null)
  		var dataset = DatasetFactory.getDataset("dsBuscaItemEstruturaOS",null,constraints,null)
  		
  		// PREENCHE O INDICE NO CABEÇALHO
  		//$("#INDICE_INFO").val(novoIndice)
  		
  		var row = dataset.values
  		var rep = row[0]
  		
  		$("#NUMDESENHO_INFO").val(rep["NUMDESENHO"])
  		$("#POSICAO_INFO").val(rep["POSICAODESENHO"])
  		$("#DESCRICAO_INFO").val(rep["DESCRICAO"])
	  	$("#INDICE_INFO").val(novoIndice)
	  	
	  	// INCLUIR ITEM NA ESTRUTURA
	  	incluirItem(1)
	  	
	  	//var seq = buscaSeqIrmao(indice)
	  	var idCriacao = buscaIdCriacao(indice)
	  	
	  	//var seqCopia = buscaSeqIrmao(novoIndice)
	  	var idCriacaoCopia = buscaIdCriacao(novoIndice)
	  	
	  	// COPIA DOS DADOS DO ITEM SELECIONADO PARA O ITEM COPIADO
	  	copiaDados(idCriacao, idCriacaoCopia)
	  	
	  	// COPIA OS PROCESSO DO ITEM COPIADO PARA A CÓPIA
		copiaProcessoOS(idCriacao,idCriacaoCopia)
	  	
	  	var salvos = new Array()
	  	//var indices = retornaArrayIndices()
	  	
	  	// COPIA TODOS OS FILHOS DOS INDICES
	  	copiaFilhos(novoIndice,indice,indices,salvos)
	  	
	  	novoIndice = novoIndice.toString()
	  	
	  	// SE O NOVO INDICE CONTEM PONTOS
	  	if(novoIndice.includes(".")){
	  		console.log("ENTREI PARA TROCAR O PONTO POR P")
	  		novoIndice = novoIndice.replace(/\./g,"P")
	  		
	  	}
		
		var nivel = indice.substr(0,indice.lastIndexOf("."))
		var idCriacaoPai = buscaIdCriacao(nivel)
		
		atualizarNivel(idCriacaoPai)
	  	
		$("#SPANINTERNO"+novoIndice+"").click()
		$(".fluigicon-copy").mouseout()
		//$(".fluigicon-copy").mouseover()
		//e.preventDefault();

		//console.log('Some action triggered.');
		
		console.log("------ FINALIZEI A FUNÇÃO DE COPIAR TODOS OS FILHOS ------")
		Swal.hideLoading() 
		
	},500)
	
	// DESATIVA O LOAD
	setTimeout(function(){
			
		myLoading2.hide();
			
	}, 500)
	
});



//SCRIPT PARA BLOQUEAR USO DO INSPECIONAR PARA USUÀRIOS QUE NÂO SÂO ADMIN
/**
* Retorna as roles do usuário logado atualmente
* @param cod O código do usuário
* @returns O nome do usuário logado que está cadastrado no Fluig
*/
function retornaArrayRole(){

	var array = new Array();

 	var usuario = $("#CODUSUARIOATUAL").val();
	if(usuario==null || usuario == "" || usuario == undefined){

		usuario = window.parent.window.WCMAPI.userCode
		console.log(window.parent.window.WCMAPI.userCode)
	}
	console.log(usuario)
	var c1 = DatasetFactory.createConstraint("CODIGO", usuario, usuario, ConstraintType.MUST);
	var constraints = new Array(c1);
	var dataset = DatasetFactory.getDataset("dsRoleUsuario", null, constraints, null);

	var row = dataset.values
	var count = row.length

	for (var i = 0; i < count; i++) {
		
		var rep = row[i]
		
		array.push(rep["ROLE_CODE"])
		
	}

	return array;

}
window.parent.window.addEventListener("contextmenu", function(e) {
	console.log("Tentou inspecionar")
	var roles = retornaArrayRole()
	if(!roles.includes("admin")){
		e.preventDefault();
		return false;
	}
});

window.addEventListener("contextmenu", function(e) {
	console.log("Tentou inspecionar")
	var roles = retornaArrayRole()
	if(!roles.includes("admin")){
		e.preventDefault();
		return false;
	}
});


window.parent.window.addEventListener('keydown', function(event){

	console.log("Tentou inspecionar")

	event = event || window.event;
	var code = (event.key==null || event.key==undefined || event.key=="" ) ? event.which : event.key;
	if (
		(event.ctrlKey &&
		(code === 'u' || code === 'U' || code === 's' || code === 'S')) || code==='F12' 
	) {

		var roles = retornaArrayRole()
		if(!roles.includes("admin")){

			if (event.preventDefault) {
				event.preventDefault();
			} else {
				event.returnValue = false;
			}
			return false;

		}
	}
	

});

window.addEventListener('keydown', function(event){

	console.log("Tentou inspecionar")

	event = event || window.event;
	var code = (event.key==null || event.key==undefined || event.key=="" ) ? event.which : event.key;
	if (
		(event.ctrlKey &&
		(code === 'u' || code === 'U' || code === 's' || code === 'S')) || code==='F12' 
	) {

		var roles = retornaArrayRole()
		if(!roles.includes("admin")){

			if (event.preventDefault) {
				event.preventDefault();
			} else {
				event.returnValue = false;
			}
			return false;

		}
	}
	

});

window.parent.window.attachEvent("oncontextmenu", function(e) {
	console.log("Tentou inspecionar")
	var roles = retornaArrayRole()
	if(!roles.includes("admin")){
		e = e || window.event;
		e.returnValue = false;
		return false;
	}
});

window.attachEvent("oncontextmenu", function(e) {
	console.log("Tentou inspecionar")
	var roles = retornaArrayRole()
	if(!roles.includes("admin")){
		e = e || window.event;
		e.returnValue = false;
		return false;
	}
});

window.parent.window.attachEvent('onkeydown', function(event){

	console.log("Tentou inspecionar")
	event = event || window.event;
	var code = (event.key==null || event.key==undefined || event.key=="" ) ? event.which : event.key;
	if (
		(event.ctrlKey &&
		(code === 'u' || code === 'U' || code === 's' || code === 'S')) || code==='F12' //83 = S, 85 = U
	) {
		var roles = retornaArrayRole()
		if(!roles.includes("admin")){
			if (event.preventDefault) {
				event.preventDefault();
			} else {
				event.returnValue = false;
			}
			return false;
		}
	}

});


window.attachEvent('onkeydown', function(event){

	console.log("Tentou inspecionar")
	event = event || window.event;
	var code = (event.key==null || event.key==undefined || event.key=="" ) ? event.which : event.key;
	if (
		(event.ctrlKey &&
		(code === 'u' || code === 'U' || code === 's' || code === 'S')) || code==='F12' //83 = S, 85 = U
	) {
		var roles = retornaArrayRole()
		if(!roles.includes("admin")){
			if (event.preventDefault) {
				event.preventDefault();
			} else {
				event.returnValue = false;
			}
			return false;
		}
	}

});
