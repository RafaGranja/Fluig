// FUNÇÃO PARA CARREGAR O FORMULÁRIO NA TELA
$(document).ready(function(){

	// VARIÁVEL PARA GUARDAR ATIVIDADE ATUAL
	var atv = $("#ATIVIDADE").val();
		
	$("#loader").hide();

	var options = {
		min: 0,
		max: 200,
		value: 100,
		step: 1,
		range: false,
		formatter: function(value) {
			console.log('valor slide :'+value)
			$(".RASTREABILIDADE").children("table").css("zoom",Number(Number(value)+1)+"%");
			return value + '%'
		}
	};

	$("[data-send]",window.parent.document).next().prop("disabled",true)
	
	console.log("Sim, entrei no documentReady na atv: "+atv)
	
	// SE ATIVIDADE FOR A INICIAL
	if(atv==0 || atv==4) {
		
		// MOSTRA/ESCONDE CAMPOS DO FORMULÁRIO
		$(".tituloTabela").hide()
		$(".table-responsive").hide()
		$(".PRODUTO_RM").hide()
		$(".ABAS_GERAL").hide()
		$("#loader").hide();
		$("#EXCLUSIVO1").val("")
		$("#EXCLUSIVO").val("")
		$(".SALVOS").show()
		
		var tabela = $("#TABELASALVOS").val()
		
		console.log("tabela: "+tabela)
		
		// SE TABELA SALVOS AINDA NÃO FOI PREENCHIDA
		if(tabela=="" || tabela==undefined){
			
			console.log("vou esconder salvos")
			
			$(".SALVOS").hide()
			
		} else {
			// SE NÃO
			
			console.log("vou buscar a lista de materiais")
			
			// ATUALIZA A TABELA SALVOS
			preencheTabelaSalvos()
			//verificaExclusaoTabelaSalvos()
			atualizaTabelaSalvos()

			agrupaTabelaSalvos()

			calculaComprimento(1)
			calculaPeso(1)
			calculaQtdOrigem1()
			calculaQtdOrigem2()
			
			//incluiFiltros()
	
			reconstroiFiltros()
			retiraSelecaoFiltrosSalvos()
			reconstroiFiltrosSalvos()
			
		}

		// PERCORRE TODOS AS LINHAS DA TABELA
		$("input[id^='EXCLUIRSALVOS___']").each(function(){
	
			var seq = $(this).attr("id").split("___")[1]
			
			$("#CODIFICADOSALVOS___"+seq).attr("disabled",true)
			
		})

		var pesquisa=document.getElementById("produto");
		pesquisa.style.display='none';
		$("#TEMCADASTRO").val(0)

		var slider = FLUIGC.slider.init('#ZOOM_SLIDER',options);

		FLUIGC.slider.onSlide('#ZOOM_SLIDER', function(slideEvent){

			console.log(this); // DOM element
			console.log(slideEvent); // Slide stop event

		});

		// setInterval(function(){

		// 	FLUIGC.toast({

		// 		title: 'Recarregue a página: ',
		// 		message: 'Lembre de recarregar a página, podem haver novos itens em revisão ',
		// 		type: 'warning',
		// 		timeout : 4000,

		// 	});

		// },120000)
		
	}
	
	// SE ATIVIDADE FOR A INICIAL SALVA
	if(atv==4){
		
		$(".panel-body").hide()
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'Atenção, essa solicitação foi salva incorretamente',
			  text: 'Clique no botão "Enviar" e depois na opção "Salvar e Editar depois" para poder visualizar a lista novamente'
		})	
		
	}
	
	// SE ATIVIDADE É A DE EDITAR
	if(atv==11){
		
		// SE LISTA PODE SER EDITADA, OU SEJA, TEM UM PROCESSO DE CADASTRO OU DE EDIÇÃO ABERTA PARA A OS
		//if(listaEditavel()){
			
			console.log("lista editável")
			
			$("#loader").hide();
			
			// DESABILITA CAMPO ZOOM DA OS
			$("#OS_INFO").prop("readonly",true)
			$("#OS_INFO").css("background-color","white")
			$("#EXCLUSIVO1").val("")
			$("#EXCLUSIVO").val("")
			
			// ATUALIZA A TABELA SALVOS
			preencheTabelaSalvos()
			//verificaExclusaoTabelaSalvos()
			atualizaTabelaSalvos()

			agrupaTabelaSalvos()

			calculaComprimento(1)
			calculaPeso(1)
			calculaQtdOrigem1()
			calculaQtdOrigem2()
			
			// APAGA A LISTA INICIAL
			//apagaLista()
			
			// CONSTRÓI TODOS OS FILTROS
			//apagaListaFiltros()
			//apagaListaFiltrosSalvos()
			
			//childAdd2()
			incluiFiltros()
			
			// BUSCA OS MATERIAIS REFERENTES A OS SELECIONADA
			//buscaMateriaisOS()
			
			//reconstroiFiltros()
			retiraSelecaoFiltrosSalvos()
			reconstroiFiltrosSalvos()
			//constroiFiltros()
			//constroiFiltrosSalvos()
		
		// } else {
		// 	// SE NÃO
			
		// 	$("#PRODUTO_RM").hide()
		// 	$(".EXCLUIR").hide()
			
			// PERCORRE TODOS AS LINHAS DA TABELA
			$("input[id^='EXCLUIRSALVOS___']").each(function(){
				
				var seq = $(this).attr("id").split("___")[1]
				
				$("#CODIFICADOSALVOS___"+seq).attr("disabled",true)
				
			})

			var pesquisa=document.getElementById("produto");
			pesquisa.style.display='none';
			$("#TEMCADASTRO").val(0);
	
			var slider = FLUIGC.slider.init('#ZOOM_SLIDER',options);
	
			FLUIGC.slider.onSlide('#ZOOM_SLIDER', function(slideEvent){
	
				console.log(this); // DOM element
				console.log(slideEvent); // Slide stop event
	
				$(".RASTREABILIDADE").children("div").css("zoom","100%");
	
			});
			
		//}


		// setInterval(function(){

		// 	FLUIGC.toast({

		// 		title: 'Recarregue a página: ',
		// 		message: 'Lembre de recarregar a página, podem haver novos itens em revisão ',
		// 		type: 'warning',
		// 		timeout : 4000,

		// 	});

		// },120000)
		
	}
	
	// SE ATIVIDADE É A DE FIM
	if(atv==13){
		
		$("#loader").hide();

		var pesquisa=document.getElementById("divproduto");
		pesquisa.style.display='none';
		
	}
	
	
	// FORMATA CAMPOS COM VALIDAÇÃO VISUAL
	//formataCampos()
	//formataReload()
	
});

$(window).scroll(function() { 

    var scroll = $(window).scrollTop();

    if (scroll > 450) {
        $('.dash').addClass('dashlateral');
    } else {
        $('.dash').removeClass('dashlateral');
    }
});

function selecionaQuadro(obj){

	$(".square").removeClass("square2");
	$(obj).addClass("square2");
	console.log(this);

}


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




