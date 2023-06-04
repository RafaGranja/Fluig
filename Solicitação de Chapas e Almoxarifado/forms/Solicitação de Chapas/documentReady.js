var loading = FLUIGC.loading(window)
// var datainicio = FLUIGC.calendar('#DATA_DE');
// var datafim = FLUIGC.calendar('#DATA_ATE');
 

var stringsBR2 = {

    cancel : 'Cancelar',
    clear : 'Limpar',
    done : 'Pronto'

}


var stringsBR = {

    cancel : 'Cancelar',
    clear : 'Limpar',
    done : 'Pronto',
    months : ['Janeiro', 'Fevereiro', 'Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
    monthsShort : ['Jan', 'Fev', 'Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
    weekdays : ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
    weekdaysShort : ['Dom', 'Seg', 'Ter','Qua','Qui','Sex','Sáb'],
    weekdaysAbbrev : ['D','S','T','Q','Q','S','S']

}

$(document).ready(function(){

	// VARIÁVEL PARA GUARDAR ATIVIDADE ATUAL
	var atv = $("#ATIVIDADE").val();

	if($("#DATAABERTUTA").val() == "" || $("#DATAABERTUTA").val() == null || $("#DATAABERTUTA").val() == undefined){

		$("#DATAABERTUTA").val(new Date().toLocaleDateString())

	}

	loading.show();
		
	console.log("Sim, entrei no documentReady na atv: "+atv)
	
	// SE ATIVIDADE FOR A INICIAL
	if(atv==0 || atv==4) {
		
		console.log("Estou na atividade "+atv)
		
	}

	loading.hide();

	$('#DATA_DE').datepicker({format:'dd/mm/yyyy',autoClose:true,showDaysInNextAndPreviousMonths:true,i18n:stringsBR});
	$('#DATA_ATE').datepicker({format:'dd/mm/yyyy',autoClose:true,showDaysInNextAndPreviousMonths:true,i18n:stringsBR});

	$("#SERVER").val(window.parent.location.host);

	carregaTabela();

});

$('.filtros-tabela').click(function(){

	var icon = $(this).find('.filter-toggle').text()
	icon = icon.split("_")
	$(this).find('.filter-toggle').text(icon[2]=='down' ? 'arrow_drop_up' : 'arrow_drop_down')
	var asc = icon[2]=='down' ? false : true;
	var table = $(this).parents('table').eq(0)
	var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
	asc = !asc
	if (!asc){rows = rows.reverse()}
	for (var i = 0; i < rows.length; i++){table.append(rows[i])}
})

function comparer(index) {
	return function(a, b) {
		var valA = getCellValue(a, index), valB = getCellValue(b, index)
		return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB);
	}
}
function getCellValue(row, index){ 
	//console.log($(row).children('td').eq(index).find('a').text())
	return $(row).find('.filtrar').eq(index).text() == "" ? $(row).find('.filtrar').eq(index).val(): $(row).find('.filtrar').eq(index).text();
}

$(document).on('DOMNodeInserted', function(e) {

	$("input,td,th,p").hover(function(){ 

		if($(this).prop("type")=="text"){

			$(this).prop("title",$(this).val()) 

		}
		else{
			$(this).prop("title",$(this).text()) 
		}

	})

})

// $("input:not([id*='PESQUISA'],[type='checkbox'])").on("focusin",function(e){

// 	$("label.active:not([for*='PESQUISA'])").removeClass("active")

// 	if(!$(this).prop("disabled") && !$(this).prop("readonly")){

// 		$(this).parents("div").first().find("label").eq(0).addClass("active")
// 		//$("label[for='"+$(this).attr("id")+"']").addClass("active")

// 	}

// })

// $("input:not([id*='PESQUISA'],[type='checkbox'])").on("focusout",function(e){

// 	$("label.active:not([for*='PESQUISA'])").removeClass("active")

// })

// $("select").on('focusin',function(e){

// 	$("label.active:not([for*='PESQUISA'])").removeClass('active')

// 	if(!$(this).prop('disabled') && !$(this).prop('readonly')){

// 		$(this).parents('div').first().find('label').eq(0).addClass('active')
// 		//$("label[for='"+$(this).attr("id")+"']").addClass("active")

// 	}

// })

// $("select").on('focusout',function(e){

// 	$("label.active:not([for*='PESQUISA'])").removeClass('active')

// })


$(window).resize(function(){

	$("#lateral_menu").draggable({ axis: "x",containment: [$(document).width()-Number($("#lateral_menu").width()),0,$(document).width()-(Number($("#lateral_menu").width())/3),0] });
	$("#lateral_menu").css('left','93%')

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