// FUNÇÃO PARA CARREGAR O FORMULÁRIO NA TELA
$(document).ready(function(){

	// VARIÁVEL PARA GUARDAR ATIVIDADE ATUAL
	var atv = $("#ATIVIDADE").val();
		
	console.log("Sim, entrei no documentReady na atv: "+atv)

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
	
	// SE ATIVIDADE FOR A INICIAL
	if(atv==0 || atv==4) {
		
		// MOSTRA/ESCONDE CAMPOS DO FORMULÁRIO
		$(".TABELAS").hide()
		$("#loader").hide();
		$(".VOLTAR_OS").hide()

		$(".PRODUTO_RM").hide()
		$(".ABAS_GERAL").hide()
		$("#loader").hide();
		$("#EXCLUSIVO1").val("")
		$("#EXCLUSIVO").val("")
		$(".SALVOS").hide()

		// PERCORRE TODOS AS LINHAS DA TABELA
		$("input[id^='EXCLUIRSALVOS___']").each(function(){
	
			var seq = $(this).attr("id").split("___")[1]
			
			$("#CODIFICADOSALVOS___"+seq).attr("disabled",true)
			
		})

		var slider = FLUIGC.slider.init('#ZOOM_SLIDER',options);

		slider.onSlide('#ZOOM_SLIDER', function(slideEvent){

			console.log(this); // DOM element
			console.log(slideEvent); // Slide stop event

			$(".RASTREABILIDADE").children("div").css("zoom","100%");

		});
		
	}
	
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
