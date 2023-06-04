console.log("arquivo do documentReady")

// CARREGA O FORMULÁRIO
$(document).ready(function(){

	// VARIÁVEL PARA GUARDAR ATIVIDADE ATUAL
	var atv = $("#ATIVIDADE").val();
	
	var mySimpleCalendar = FLUIGC.calendar('#DATA_DE');
	var mySimpleCalendar = FLUIGC.calendar('#DATA_DE_RESALOC');
	var mySimpleCalendar = FLUIGC.calendar('#ATE');
	var mySimpleCalendar = FLUIGC.calendar('#ATE_RESALOC');

	var data = new Date()

	$("#DATA_ATUAL").val(formataDataDate(data))
	
	console.log("Sim, entrei no documentReady na atv da prog.: "+atv)
	
	// SE ATIVIDADE FOR A INICIAL
	if(atv==0 || atv==4) {

		//ESCONDE TABELA DE ADIÇÂO DE HABILIDADE
		$("#TABELAADDHAB").hide()
		
		
		// MOSTRA/ESCONDE CAMPOS DO FORMULÁRIO
		$(".ALOCRECURSON3RESUMOEQ").hide()
		$(".ALOCRECURSON3RESUMOPES").hide()
		$(".PLANEJAMENTO").hide()
		$(".TABELARESUMO").hide()
		$(".GRUPORECURSON3").hide()
		$(".PLANOCORTE").hide()
		$(".RAD").hide()
		$(".INTEGRAR").hide()
		
		// ESCONDE/MOSTRA OS ÍCONES
		$(".filtrosResAloc").hide()
		$(".expansor1").show()
		$(".expansor2").hide()
		$("#ICONREDUZIR").show()
		$("#ICONEXPANDIR").hide()

		$(".filtrosHab").hide()
		$(".expansor3").hide()
		$("#ICONREDUZIR3").hide()
		$("#ICONEXPANDIR3").hide()
		
		console.log("Vou desabilitar o campo OP")
		
		console.log("Desabilitei o campo OP")
		
		// PREENCHE A DATA "DE" COM A DATA ATUAL E LIMITA A SELEÇÃO DO DIA
		//preencheDeLimitaSelecao()
		
		console.log("terminei de preencher")
		
		setTimeout(function() {
			$("#registro").prop("disabled",true)
		},500)
	}
	
	console.log("acabei o documentReady")
	
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

