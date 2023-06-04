// CARREGA O FORMULÁRIO DE ACORDO COM AS REGRAS 
$(document).ready(function(){

	// VARIÁVEL PARA GUARDAR ATIVIDADE ATUAL
	var atv = $("#ATIVIDADE").val();
	
	var mySimpleCalendar = FLUIGC.calendar('#DATA_DE');
	$("#ALERTASUBIRSALDO").val("")
	 
	console.log("Sim, entrei no documentReady na atv: "+atv)
	
	// SE ATIVIDADE FOR A INICIAL
	if(atv==0) {
		
		// MOSTRA/ESCONDE CAMPOS DO FORMULÁRIO
		$(".ITENS_INFO").hide()
		$("#ICONEXPANDIR").hide()
		$(".HORASIMPRODUTIVASDIA1").hide()
		$(".HORASIMPRODUTIVASDIA2").hide()
		$(".HORASIMPRODUTIVASDIA3").hide()
		
		// PREENCHE O DEFAULT DAS HORAS IMPRODUTIVAS
		//preencheHorasImprodutivas()
		
		setTimeout(function(){
			
			window["FILIAL"].setValue("7 - Delp Engenharia Mecanica S/A")
			$("#CODFILIAL").val("7")
			
			// HABILITA O CAMPO DA MATRÍCULA
			//$("#MATRICULA").prop("disabled",true)
		
			// FAZ UM RELOAD NAS ORDENS DE ACORDO COM A FILIAL SELECIONADA
			//reloadZoomFilterValues("ORDEMPRODUCAO","CODFILIAL,"+$("#CODFILIAL").val())
			
		},500)
		
	}
	
	// SE ATIVIDADE INICIAL SALVA
	if(atv==3 || atv==4){
		
		$("#EXCLUSIVO1").val("")
		
		// FAZ O AJUSTE DOS ID'S DA TABELA E EXPANSORES
		//ajustaTabela()
		ajustaTabelaAtv()
		
		// REDUZ O FILTRO DA BUSCA
		reduzirFiltro()
		
	}
	
	// SE ATIVIDADE FOR A INICIAL DEPOIS DE SALVAR OU A DE EDITAR ESTRUTURA
	if(atv==7){
		
		$("#EXCLUSIVO1").val("")
		
		// FAZ O AJUSTE DOS ID'S DA TABELA E EXPANSORES
		//ajustaTabela()
		ajustaTabelaAtv()
		
		// REDUZ O FILTRO DA BUSCA
		reduzirFiltro()
		
		
	}
	
	// SE ATIVIDADE FOR A FINAL
	if(atv==6){
		
		$("#EXCLUSIVO1").val("")
		
		// FAZ O AJUSTE DOS ID'S DA TABELA E EXPANSORES
		//ajustaTabela()
		ajustaTabelaAtv()
		
		// REDUZ O FILTRO DA BUSCA
		reduzirFiltro()
		
		// PERCORRE TODOS OS REGISTROS DA TABELA DE ATIVIDADES DE APONTAMENTO
		$("input[id^='CODIGOPRD___']").each(function(){
			
			var seq = $(this).attr("id").split("___")[1]
			
			$("#COMP___"+seq).val("D")
			
		})
		
	}
	
	// FORMATA CAMPOS COM VALIDAÇÃO VISUAL
	//formataCampos()
	//formataReload()
	
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


