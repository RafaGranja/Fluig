// CARREGA O FORMULÁRIO DE ACORDO COM AS REGRAS 
$(document).ready(function(){

	// VARIÁVEL PARA GUARDAR ATIVIDADE ATUAL
	var atv = $("#ATIVIDADE").val();
	
	var mySimpleCalendar = FLUIGC.calendar('#DATA_DE');
	
	console.log("Sim, entrei no documentReady na atv ATTT: "+atv)

	var calculadora=document.getElementById("calculadora");
	calculadora.style.display='none';
	$("#TEMCALCULADORA").val(0)


	
	
	// SE ATIVIDADE FOR A INICIAL
	if(atv==0) {
		
		// MOSTRA/ESCONDE CAMPOS DO FORMULÁRIO
		$(".ITENS_INFO").hide()
		$("#ICONEXPANDIR").hide()
		$("#QTDE_LINK").css("display","none");
		
		setTimeout(function(){
			
			// DESABILITA O CAMPO DO LOTE DA MP
			$("#LOTEMP").prop("disabled",true)
			$("#MATRICULA").prop("disabled",true)
			$("#AVANCOPLANO").prop("disabled",true)
			$("#PCCONCLUIDO").prop("disabled",true)
			$("#DATA_DE").prop("disabled",true)
			$("#PLANOCORTE").prop("disabled",true)
			
		},500)
		
	}
	
	// SE ATIVIDADE INICIAL SALVA
	if(atv==3 || atv==4){
		
		$("#EXCLUSIVO1").val("")
		
		// FAZ O AJUSTE DOS ID'S DA TABELA E EXPANSORES
		ajustaTabelaAtv()
		
		// REDUZ O FILTRO DA BUSCA
		reduzirFiltro()
		
		// DESABILITA TODOS OS CAMPOS DA TABELA DE ATIVIDADES
		//desabilitaCamposAtv()
		
	}
	
	// SE ATIVIDADE FOR A INICIAL DEPOIS DE SALVAR OU A DE EDITAR ESTRUTURA
	if(atv==7){
		
		$("#EXCLUSIVO1").val("")
		
		// FAZ O AJUSTE DOS ID'S DA TABELA E EXPANSORES
		ajustaTabelaAtv()
		
		// REDUZ O FILTRO DA BUSCA
		reduzirFiltro()
		
		// DESABILITA TODOS OS CAMPOS DA TABELA DE ATIVIDADES
		//desabilitaCamposAtv()
		
	}
	
	// SE ATIVIDADE FOR A FINAL
	if(atv==6){
		
		$("#EXCLUSIVO1").val("")
		
		setTimeout(function(){
			
			// DESABILITA O CAMPO DO LOTE DA MP
			$("#LOTEMP").prop("disabled",true)
			$("#MATRICULA").prop("disabled",true)
			$("#AVANCOPLANO").prop("disabled",true)
			$("#PCCONCLUIDO").prop("disabled",true)
			
		},500)
		
		
		// FAZ O AJUSTE DOS ID'S DA TABELA E EXPANSORES
		ajustaTabelaAtv()
		
		// REDUZ O FILTRO DA BUSCA
		reduzirFiltro()
		
		// COLOCA O LINK NO MODAL E DESABILITA O CAMPO DAS QUANTIDADES
		ajustaModal()
		
		// DESABILITA TODOS OS CAMPOS DA TABELA DE ATIVIDADES
		//desabilitaCamposAtv()

		
		var dataDe = $("#DATA_DE").val()
		
		dataDe = dataDe.toString()
		
		if(dataDe.includes("-")){
			
			dataDe = formataData(dataDe)
			
			$("#DATA_DE").val(dataDe)
			
		}
		
	}
	
})


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



