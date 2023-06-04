

function expandir(){

    $("#ICONEXPANDIR").hide()
    $(".filtros").show()
    $("#ICONREDUZIR").show()

}

function reduzir(){

    $("#ICONEXPANDIR").show()
    $(".filtros").hide()
    $("#ICONREDUZIR").hide()

}

function buscatabela(){

    var filial = $("#CODFILIAL_FILTRO").val()
    var celula = $("#CODCELULA").val()
    var os = $("#CODPRJ").val()
    var codordem = $("#CODORDEM").val()
    var datade = $("#DATA_DE").val()
    var dataate = $("#ATE").val()

    if(filial=="" || filial==null || filial==undefined){

        // EXIBE ALERTA
        Swal.fire({
            icon: 'error',
            title: 'Valor de filial não preenchido',
            message: 'Verifique e tente novamente.'
        })

    }
    else{

        if(codordem=="" || codordem==null || codordem==undefined){

            if((datade=="" || datade==null || datade==undefined) || 
            (dataate=="" || dataate==null || dataate==undefined)){

                // EXIBE ALERTA
                Swal.fire({
                    icon: 'error',
                    title: 'Intervalo de data não preenchido',
                    message: 'Verifique e tente novamente.'
                })

            }
            else{

                var os_if = os==undefined || os==null || os=="";
                var celula_if = celula==undefined || celula==null || celula=="";

                if(os_if && celula_if){

                    // EXIBE ALERTA
                    Swal.fire({
                        icon: 'error',
                        title: 'Prencha o valor da Celula ou da Os',
                        message: 'Verifique e tente novamente.'
                    })

                }
                else{

                    RetornaConsulta()

                }

            }

        }
        else{


            RetornaConsulta()


        }

    }



}

function RetornaConsulta(){

    var myLoading2 = FLUIGC.loading(window)

    myLoading2.show()

    setTimeout(function(){

        var filial = $("#CODFILIAL_FILTRO").val()
        var celula = $("#CODCELULA").val()
        var os = $("#CODPRJ").val()
        var codordem = $("#CODORDEM").val()
		codordem = codordem.replace(",",";")
        var datade = $("#DATA_DE").val()
        var dataate = $("#ATE").val()

		if(datade != undefined && datade != null && datade != "" && dataate != null && dataate!=undefined && dataate!=""){

			datade = formataDataBanco(datade)
			dataate = formataDataBanco(dataate)

		}

        var a1 = DatasetFactory.createConstraint("OS",os,os,ConstraintType.MUST)
        var a2 = DatasetFactory.createConstraint("FILIAL",filial,filial,ConstraintType.MUST)
        var a3 = DatasetFactory.createConstraint("CELULA",celula,celula,ConstraintType.MUST)
        var a4 = DatasetFactory.createConstraint("OP",codordem,codordem,ConstraintType.MUST)

		var constraints = new Array(a1,a2,a3,a4)

		if(datade != undefined && datade != null && datade != "" && dataate != null && dataate!=undefined && dataate!=""){
			var a5 = DatasetFactory.createConstraint("DATADE",datade,datade,ConstraintType.MUST)
			var a6 = DatasetFactory.createConstraint("DATAATE",dataate,dataate,ConstraintType.MUST)

			constraints.push(a5)
			constraints.push(a6)
		}
        
        var dataset = DatasetFactory.getDataset("dsBuscaAtividadesAvanco",null,constraints,null)
        var row = dataset.values
        console.log(row)

        if(row != "" && row!=null && row!=undefined){

            $(".CABECALHO_PLAN").parent().show()

            limpaTabela()

            for(var i = 0; i < row.length; i++) {
            
                var rep = row[i]
                var seq = wdkAddChild('ATIVIDADES')

                $("#OS___"+seq).val(rep['CODCCUSTO'])
                $("#CODORDEMATV___"+seq).val(rep['CODORDEM'])
                $("#TAG___"+seq).val(rep['TAG'])
                $("#DESCITEM___"+seq).val(rep['DSCORDEM'])
                $("#DESCATV___"+seq).val(rep['DSCATIVIDADE'])
				$("#CODESTRUTURA___"+seq).val(rep['CODESTRUTURA'])
				$("#ATV_STATUS___"+seq).val(rep['ATV_STATUS'])
				$("#OP_STATUS___"+seq).val(rep['OP_STATUS'])
                $("#CODATIVIDADE___"+seq).val(rep['CODATIVIDADE'])
                $("#PRIORIDADE___"+seq).val(rep['PRIORIDADE'])
                $("#IDATVORDEM___"+seq).val(rep['IDATVORDEM'])
				$("#PLANODECORTE___"+seq).val(rep['PLANODECORTE'])
				$("#CELULAATV___"+seq).val(rep['CELULA'])
				$("#CODCOLIGADA___"+seq).val(rep['CODCOLIGADA'])
                $("#SPANAVANCOATV___"+seq).text(rep['PERCENTUAL'] + '%')
				$("#SPANAVANCOATV___"+seq).attr('aria-valuenow',rep['PERCENTUAL'])
				$("#SPANAVANCOATV___"+seq).css("width",rep['PERCENTUAL']+"%")
				$("#PREVISTO___"+seq).val(rep['TEMPO'])
                $("#AVANCO___"+seq).val(rep['PERCENTUAL'])
				$("#ULTIMAATVOP___"+seq).val(rep['ULTIMAATVOP'])
            
            
            }

            // SE TABELA DOS FILTROS PARA A TABELA DE CADASTRO NÃO FOI CRIADA
            if(!(temTabelaFiltros())){
                
                console.log("vou incluir linha dos filtros")
                
                // ADICIONA LINHA PARA O FILTRO DA TELA DO CADASTRO
                addFiltro()
				constroiFiltros()

            } else {
                // SE NÃO
                
                // LIMPA OS FILTROS
                limpaFiltros()
				reconstroiFiltros()
                
            }

        }else{

            $(".CABECALHO_PLAN").parent().hide()

            // LIMPA OS FILTROS
            limpaFiltros()

            myLoading2.hide()
            // EXIBE ALERTA
            Swal.fire({
                icon: 'error',
                title: 'Valores não encontrados',
                message: 'Verifique e tente novamente.'
            })

            

        }

        myLoading2.hide()

    },1000)

    


}

// PEGA A DATA DO FORMULÁRIO E SALVA EM FORMATO PARA BANCO
function formataDataBanco(strData) {
    
	// ARRAY PARA PEGAR A STRING APENAS DO VALOR DA DATA
	var arrayString = strData.split(" ")
	console.log("data[0]: "+arrayString[0]+", data[1]: "+arrayString[1])
	
	console.log("vou formatar a data "+arrayString[0])
	
	// ARRAY PARA OS VALORES DE DIA/MÊS/ANO
	var arrayData = arrayString[0].split("/")
	
	var ano = arrayData[2]
	var mes = arrayData[1]
	var dia = arrayData[0]
	
	// MONTA A DATA NO PADRÃO BRASILEIRO
	var novaData = ano + '-' + mes + '-' + dia;
    
	console.log("data formatada "+novaData)
	
	// RETORNA O VALOR DA NOVA DATA
    return novaData;
    
}

// HABILITA O CALENDÁRIO "ATÉ" PARA A SELEÇÃO DE ATÉ 10 DIAS DA DATA SELECIONADA NO CAMPO "DE"
function habilitaDataAte(){
	
	var dataDe = $("#DATA_DE").val()
	
	console.log("VOU COLOCAR DATA NO 'ATÉ'")
	
	// SE DATA É VÁLIDA
	//if(dataDe.length==10){
		
		// SE DATA FOI INFORMADA
		if(!(dataDe=="" || dataDe==null || dataDe==undefined)){
			
			console.log("dataDe: "+dataDe)
			dataDe = dataDe.split("/")
			console.log("dataDe: "+dataDe)
			
			var dia = dataDe[0]
			var mes = dataDe[1]
			var ano = dataDe[2]
			
			console.log("dia: "+dia+", mes: "+mes+", ano: "+ano)
			
			//$("#DATA_ATE").prop("readonly",false)
			
			//var mySimpleCalendar = FLUIGC.calendar('#DATA_ATE');
			console.log("dataDe: "+dataDe)
			
			var dataMin = new Date(ano,mes-1,dia)
			//var dataMin = new Date(dataDe[2],dataDe[1],dataDe[0])
			//var dataMin = new Date()
			
			var dataMax = new Date(ano,mes-1,dia)
			//var dataMax = new Date(dataDe[2],dataDe[1],dataDe[0])
			//var dataMax = new Date()
			
			dataMax.setDate(dataMin.getDate() + 9)
			
			console.log("dataMin: "+dataMin+", dataMax: "+dataMax)
			
			//mySimpleCalendar.setMinDate(new Date(dataMin[1]+" "+dataMin[0]+", "+dataMin[2]));
			//mySimpleCalendar.setMaxDate(new Date(dataMax[1]+" "+dataMax[0]+", "+dataMax[2]));
			
			//if(!($("#ATE").val()=="" || $("#ATE").val()==null || $("#ATE").val()==undefined)){
				console.log("vou remover o ATE")
				$("#ATE").remove()
				$("#SPANATE").remove()
				$("#PERIODO2").append("<input type='text' class='form-control' id='ATE' name='ATE' onchange='limpaDataAte()'><span class='input-group-addon' id='SPANATE' name='SPANATE'><span class='fluigicon fluigicon-calendar'></span></span>")
			//}
			
			var mySimpleCalendar2 = FLUIGC.calendar("#ATE", { language: 'pt-br', minDate: dataMin, pickDate: true, pickTime: false });
			
			var dataForm = formataDataDate(dataMax)
			
			console.log("dataForm: "+dataForm)
			
			mySimpleCalendar2.setDate(dataForm);
			
			//mySimpleCalendar2.setDate(""+dia+"/"+mes+"/"+ano+"");
			
			
			//mySimpleCalendar.setMinDate(dataMin);
			//mySimpleCalendar.setMaxDate(dataMax)
			
		}
		
	/*} else {
		// SE NÃO
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'É necessário informar a data no padrão correto',
			  text: 'Verifique e tente novamente.'
		})
		
		$("#DATA_DE").val("")
		$("#ATE").val("")
		
	}*/
		
}


// LIMPA O CAMPO DA DATA "ATÉ"
function limpaDataAte(){
	
	console.log("VOU LIMPAR A DATA ATÉ")
	
	var dataAte = $("#ATE").val()
	var dataMin = $("#DATA_DE").val()
	
	console.log("click na data de")
	
	// SE DATA INFORMADA É VÁLIDA
	if(dataMin.length==10){
		
		console.log("dataAte: "+dataAte+", dataMin: "+dataMin)
		
		dataMin = dataMin.split("/")
		var diaMin = dataMin[0]
		var mesMin = dataMin[1]
		var anoMin = dataMin[2]
		
		dataAte = dataAte.split("/")
		var dia = dataAte[0]
		var mes = dataAte[1]
		var ano = dataAte[2]
		
		var dataAte = new Date(ano,mes-1,dia)
		var dataMin = new Date(anoMin,mesMin-1,diaMin)
		var dataMax = new Date(ano,mes-1,dia)
		
		console.log("dataAte: "+dataAte+", dataMin: "+dataMin+", dataMax: "+dataMax)
		
		dataMax.setDate(dataMin.getDate() + 9)
		
		console.log("dataAte: "+dataAte+", dataMin: "+dataMin+", dataMax: "+dataMax)
		
		if(dataAte<dataMin || dataAte>dataMax){
			
			/*$("#ATE").val("")
			
			$("#ATE").remove()
			$("#SPANATE").remove()
			$("#PERIODO2").append("<input type='text' class='form-control' id='ATE' name='ATE' readonly><span class='input-group-addon' id='SPANATE' name='SPANATE'><span class='fluigicon fluigicon-calendar'></span></span>")
			
			var mySimpleCalendar2 = FLUIGC.calendar("#ATE", { language: 'pt-br', minDate: dataMin, maxDate: dataMax, pickDate: true, pickTime: false });*/
			
		}
		
		console.log("vou clicar no de")
		//$("#DATA_DE").focus()
		//$("#DATA_DE")[0].click()
		
	} else {
		// SE NÃO
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'É necessário informar a data no padrão correto',
			  text: 'Verifique e tente novamente.'
		})
		
		$("#DATA_DE").val("")
		$("#ATE").val("")
		
	}
	
}

// FORMATA A DATA DO TIPO DATE PARA PADRÃO DE FORMULÁRIO
function formataDataDate(dataDe){
	
	console.log("dataDe: "+dataDe)
	
	var dataForm
	
	dataForm = dataDe.toString()
	dataForm = dataForm.split(" ")
	
	var diaForm = dataForm[2]
	var anoForm = dataForm[3]
	
	var mesForm = dataForm[1]
	
	if(mesForm=="Jan"){
		mesForm="01"
	}
	if(mesForm=="Feb"){
		mesForm="02"
	}
	if(mesForm=="Mar"){
		mesForm="03"
	}
	if(mesForm=="Apr"){
		mesForm="04"
	}
	if(mesForm=="May"){
		mesForm="05"
	}
	if(mesForm=="Jun"){
		mesForm="06"
	}
	if(mesForm=="Jul"){
		mesForm="07"
	}
	if(mesForm=="Aug"){
		mesForm="08"
	}
	if(mesForm=="Sep"){
		mesForm="09"
	}
	if(mesForm=="Oct"){
		mesForm="10"
	}
	if(mesForm=="Nov"){
		mesForm="11"
	}
	if(mesForm=="Dec"){
		mesForm="12"
	}
	
	console.log("diaForm: "+diaForm)
	console.log("anoForm: "+anoForm)
	console.log("mesForm: "+mesForm)
	
	dataForm = diaForm+"/"+mesForm+"/"+anoForm
	
	console.log("dataForm: "+dataForm)
	
	return dataForm 
	
}

// ONMOUSEOVER DO ITEM DA TABELA
function sobreLinhaTabela(e){
	
	console.log("estou sobre a linha")
	
	//$(e).prop("style", "background-color: #E8E8E8;");
	//$(e).prop("style", "cursor:pointer;")
	
	$(e).addClass("onmouseover")
	
}

// ONMOUSEOUT DO ITEM DA TABELA
function foraLinhaTabela(e){
	
	console.log("estou fora da linha")
	
	//$(e).prop("style", "background-color: #F9F9F9 !important;");
	//$(e).prop("style", "cursor:default;")

	$(e).removeClass("onmouseover")
	
}

// EXIBE UM BALÃO COM O TEXTO COMPLETO DO CAMPO AO PASSAR O MOUSE SOBRE ELE
function mouse(e) {
	
	// PEGA O VALOR COMPLETO PREENCHIDO NO CAMPO
	var valCampo = $(e).val()
	
	// SE CAMPO NÃO FOI PREENCHIDO
	if(valCampo == "" || valCampo == null){
		
		return false
		
	}
	// SE CAMPO FOI PREENCHIDO
	else{
		
		// CARREGA EM "TITLE" O VALOR DO CAMPO PREENCHIDO
		$(e).prop("title", valCampo)
		
		return true
		
	}
	
}

function limpaTabela(){

    $("input[id^='OS___']").each(function(){

        $(this).parent().parent().remove();

    })


}

// RECONSTRÓI TODOS OS FILTROS
function reconstroiFiltros(){
		
	console.log("vou reconstruir filtros")
	
	var myLoading2 = FLUIGC.loading(window);
	
	myLoading2.show();
	
	// TIMEOUT PARA EXECUÇÃO DA FUNÇÃO
	setTimeout(function (){
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOOS___1").val()=="" || $("#INFOOS___1").val()==null){
			
			console.log("filtro OS está vazio")
			
			$('#INFOOS___1').children('option:not(:first)').remove();
			$("#INFOOS___1").css("border-color","#d1d3d4")
			$("#INFOOS___1").css("background-color","#fff")
			
		} else {
			
			console.log("filtro OS não está vazio")
			
			$("#INFOOS___1").css("border-color","#b92113")
			$("#INFOOS___1").css("background-color","#f2dede")
			
		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOOP___1").val()=="" || $("#INFOOP___1").val()==null){
			
			console.log("filtro OP está vazio")
			
			$('#INFOOP___1').children('option:not(:first)').remove();
			$("#INFOOP___1").css("border-color","#d1d3d4")
			$("#INFOOP___1").css("background-color","#fff")

		} else {
			
			console.log("filtro OP não está vazio")
			
			$("#INFOOP___1").css("border-color","#b92113")
			$("#INFOOP___1").css("background-color","#f2dede")
			
		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOTAG___1").val()=="" || $("#INFOTAG___1").val()==null){
			
			console.log("filtro OP está vazio")
			
			$('#INFOTAG___1').children('option:not(:first)').remove();
			$("#INFOTAG___1").css("border-color","#d1d3d4")
			$("#INFOTAG___1").css("background-color","#fff")

		} else {
			
			console.log("filtro TAG não está vazio")
			
			$("#INFOTAG___1").css("border-color","#b92113")
			$("#INFOTAG___1").css("background-color","#f2dede")
			
		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOITEM___1").val()=="" || $("#INFOITEM___1").val()==null){
		
			console.log("filtro ITEM está vazio")
			
			$('#INFOITEM___1').children('option:not(:first)').remove();
			$("#INFOITEM___1").css("border-color","#d1d3d4")
			$("#INFOITEM___1").css("background-color","#fff")

		} else {
			
			console.log("filtro ITEM não está vazio")
			
			$("#INFOITEM___1").css("border-color","#b92113")
			$("#INFOITEM___1").css("background-color","#f2dede")

		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOATIVIDADE___1").val()=="" || $("#INFOATIVIDADE___1").val()==null){
			
			console.log("filtro ATIVIDADE está vazio")
			
			$('#INFOATIVIDADE___1').children('option:not(:first)').remove();
			$("#INFOATIVIDADE___1").css("border-color","#d1d3d4")
			$("#INFOATIVIDADE___1").css("background-color","#fff")
			
		} else {
			
			console.log("filtro ATIVIDADE não está vazio")
			
			$("#INFOATIVIDADE___1").css("border-color","#b92113")
			$("#INFOATIVIDADE___1").css("background-color","#f2dede")
			
		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOPRIORIDADE___1").val()=="" || $("#INFOPRIORIDADE___1").val()==null){
			
			console.log("filtro PRIORIDADE está vazio")
			
			$('#INFOPRIORIDADE___1').children('option:not(:first)').remove();
			$("#INFOPRIORIDADE___1").css("border-color","#d1d3d4")
			$("#INFOPRIORIDADE___1").css("background-color","#fff")
			
		} else {
			
			console.log("filtro PRIORIDADE não está vazio")
			
			$("#INFOPRIORIDADE___1").css("border-color","#b92113")
			$("#INFOPRIORIDADE___1").css("background-color","#f2dede")
			
		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOIDATV___1").val()=="" || $("#INFOIDATV___1").val()==null){
			
			console.log("filtro IDATV está vazio")
			
			$('#INFOIDATV___1').children('option:not(:first)').remove();
			$("#INFOIDATV___1").css("border-color","#d1d3d4")
			$("#INFOIDATV___1").css("background-color","#fff")
			
		} else {
			
			console.log("filtro IDATV não está vazio")
			
			$("#INFOIDATV___1").css("border-color","#b92113")
			$("#INFOIDATV___1").css("background-color","#f2dede")
			
		}

		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOPREV___1").val()=="" || $("#INFOPREV___1").val()==null){
			
			console.log("filtro IDATV está vazio")
			
			$('#INFOPREV___1').children('option:not(:first)').remove();
			$("#INFOPREV___1").css("border-color","#d1d3d4")
			$("#INFOPREV___1").css("background-color","#fff")
			
		} else {
			
			console.log("filtro IDATV não está vazio")
			
			$("#INFOPREV___1").css("border-color","#b92113")
			$("#INFOPREV___1").css("background-color","#f2dede")
			
		}
		
		// SE FILTRO ESTÁ VAZIO, REMOVE O CONTEÚDO
		if($("#INFOAVANCO___1").val()=="" || $("#INFOAVANCO___1").val()==null){
			
			console.log("filtro INFOAVANCO está vazio")
			
			$('#INFOAVANCO___1').children('option:not(:first)').remove();
			$("#INFOAVANCO___1").css("border-color","#d1d3d4")
			$("#INFOAVANCO___1").css("background-color","#fff")
				
		} else {
			
			console.log("filtro INFOAVANCO não está vazio")
			
			$("#INFOAVANCO___1").css("border-color","#b92113")
			$("#INFOAVANCO___1").css("background-color","#f2dede")

		}
		
		// APAGA A LISTA ATUAL
		//apagaLista()
	

        // CARREGA UMA NOVA LISTA
		carregaLista()

        // CONSTRÓI OS FILTROS
		constroiFiltros()
		
		// SE TEM ITEM SELECIONADO
		/*if(temItemSelecionado()){
			
			// ESCONDE ITENS QUE NÃO ESTÃO SELECIONADOS
			escondeItemNaoselecionado()
			
		}*/
		
	},1000)
		
	// DESATIVA O LOAD
	setTimeout(function(){
		
		myLoading2.hide();
		
	},500)
	
}


function carregaLista(){
	
	console.log("entrei para carregar lista")

	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OS___']").each(function (){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var os = $("#INFOOS___1").val()
		var op = $("#INFOOP___1").val()
		var tag = $("#INFOTAG___1").val()
		var item = $("#INFOITEM___1").val()
		var atv = $("#INFOATIVIDADE___1").val()
		var prioridade = $("#INFOPRIORIDADE___1").val()
		var idAtv = $("#INFOIDATV___1").val()
		var previsto = $("#INFOPREV___1").val()
		var avanco = $("#INFOAVANCO___1").val()
		
		var osLista = $("#OS___"+seq).val()
		var opLista = $("#CODORDEMATV___"+seq).val()
		var tagLista = $("#TAG___"+seq).val()
		var itemLista = $("#DESCITEM___"+seq).val()
		var atvLista = $("#DESCATV___"+seq).val()
		var prioridadeLista = $("#PRIORIDADE___"+seq).val()
		var idAtvLista = $("#IDATVORDEM___"+seq).val()
		var previstoLista = $("#PREVISTO___"+seq).val()
		var avancoLista = $("#AVANCO___"+seq).val()
		
		console.log("os: "+os+", op: "+op+", item: "+item+", atv: "+
				atv+", prioridade: "+prioridade+", idAtv: "+idAtv+", avanco: "+avanco+", tag: "+tag
				)
		
		if(os=="" || os==null){
			console.log("filtro os esta vazio")
			os = osLista
		}
		if(op=="" || op==null){
			console.log("filtro op esta vazio")
			op = opLista
		}
		if(tag=="" || tag==null){
			console.log("filtro tag esta vazio")
			tag = tagLista
		}
		if(item=="" || item==null){
			console.log("filtro item esta vazio")
			item = itemLista
		}
		if(atv=="" || atv==null){
			console.log("filtro atv esta vazio")
			atv = atvLista
		}
		if(prioridade=="" || prioridade==null){
			console.log("filtro prioridade esta vazio")
			prioridade = prioridadeLista
		}
		if(idAtv=="" || idAtv==null){
			console.log("filtro idAtv esta vazio")
			idAtv = idAtvLista
		}
		if(previsto=="" || previsto==null){
			console.log("filtro previsto esta vazio")
			previsto = previstoLista
		}
		if(avanco=="" || avanco==null){
			console.log("filtro avanco esta vazio")
			avanco = avancoLista
		}

		
		// SE FILTROS NÃO COINCIDE COM TODOS OS CAMPOS DO ITEM
		if(!(os==osLista && op==opLista && tag==tagLista && item==itemLista && 
				atv==atvLista && prioridade==prioridadeLista  && idAtv==idAtvLista && avanco==avancoLista  && previsto==previstoLista)){
		
			console.log("vou esconder LINHAPLAN___"+seq)
			
			$("#LINHAPLAN___"+seq).hide()
			$("#LINHAPLAN___"+seq).addClass("invisivel")
			
		} else {
			
			console.log("vou exibir LINHAPLAN___"+seq)
			
			$("#LINHAPLAN___"+seq).show()
			$("#LINHAPLAN___"+seq).removeClass("invisivel")
			
		}
		
	})
	
	console.log("terminei de carregar lista")
	
} 

// CONSTRÓI FILTROS PARA A TABELA
function constroiFiltros(){

	console.log("entrei para construir filtros")
	
	var os = $("#INFOOS___1").val()
	var op = $("#INFOOP___1").val()
	var tag = $("#INFOTAG___1").val()
	var item = $("#INFOITEM___1").val()
	var atv = $("#INFOATIVIDADE___1").val()
	var idAtv = $("#INFOIDATV___1").val()
	var previsto = $("#INFOPREV___1").val()
	var prioridade = $("#INFOPRIORIDADE___1").val()
	var avanco = $("#INFOAVANCO___1").val()
	
	console.log("os: "+os+", op: "+op+", item: "+item+", atv: "+
				atv+", prioridade: "+prioridade+", idAtv: "+idAtv+", avanco: "+avanco+", tag: "+tag
				)

	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if(os=="" || os==null || os==undefined){
		
		constroiSelectOs()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if(op=="" || op==null || op==undefined){
		
		constroiSelectOp()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if(tag=="" || tag==null || tag==undefined){
		
		constroiSelectTag()
	
	}
	
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if(item=="" || item==null || item==undefined){
	
		constroiSelectItem()
		
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if(atv=="" || atv==null || atv==undefined){
	
		constroiSelectAtv()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if(prioridade=="" || prioridade==null || prioridade==undefined){
	
		constroiSelectPrioridade()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if(idAtv=="" || idAtv==null || idAtv==undefined){
	
		constroiSelectIdAtv()
	
	}

	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if(previsto=="" || previsto==null || previsto==undefined){
	
		constroiSelectPrevisto()
	
	}
	
	// SE FILTRO NÃO ESTÁ PREENCHIDO
	if(avanco=="" || avanco==null || avanco==undefined){
	
		constroiSelectAvanco()
	
	}
	
	console.log("terminei de construir filtros")
	
}
// CONSTRÓI SELECT DO PREVISTO
function constroiSelectOs(){
	
	console.log("vou construir select da OS")
	var arrayOs = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OS___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		console.log("osatv, seq "+seq)
		
		var os = $("#OS___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHAPLAN___"+seq).hasClass("invisivel"))){
		
			console.log("linha não está invisível")
			
			// SE OS NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayOs.includes(os)) && !(os=="")){
				
				console.log("vou incluir os "+os)
				
				arrayOs.push(os)
				
			}
			
		}
		
	})
	
	console.log("arrayOs")
	console.log(arrayOs)
	
	arrayOs = arrayOs.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayOs.length; i++){
		
		console.log("vou incluir opção "+arrayOs[i])
		
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOOS___1').append($("<option class='info'></option>").attr("value", arrayOs[i]).text(arrayOs[i]));
		
	}
	
}

// CONSTRÓI SELECT DA OS
function constroiSelectPrevisto(){
	
	console.log("vou construir select do previsto")
	var arrayPrev = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OS___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		console.log("prev, seq "+seq)
		
		var prev = $("#PREVISTO___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHAPLAN___"+seq).hasClass("invisivel"))){
		
			console.log("linha não está invisível")
			
			// SE OS NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayPrev.includes(prev)) && !(prev=="")){
				
				console.log("vou incluir previsto "+prev)
				
				arrayPrev.push(prev)
				
			}
			
		}
		
	})
	
	console.log("arrayPrev")
	console.log(arrayPrev)
	
	arrayPrev = arrayPrev.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayPrev.length; i++){
		
		console.log("vou incluir opção "+arrayPrev[i])
		
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOPREV___1').append($("<option class='info'></option>").attr("value", arrayPrev[i]).text(arrayPrev[i]));
		
	}
	
}

// CONSTRÓI SELECT DA OP
function constroiSelectOp(){
	
	console.log("vou construir select da OP")
	var arrayOp = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OS___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var op = $("#CODORDEMATV___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHAPLAN___"+seq).hasClass("invisivel"))){
		
			// SE OP NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayOp.includes(op)) && !(op=="")){
				
				arrayOp.push(op)
				
			}
			
		}
		
	})
	
	arrayOp = arrayOp.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayOp.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOOP___1').append($("<option class='info'></option>").attr("value", arrayOp[i]).text(arrayOp[i]));
 
	}
	
}

// CONSTRÓI SELECT DA TAG
function constroiSelectTag(){
	
	console.log("vou construir select da Tag")
	var arrayTag = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OS___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var tag = $("#TAG___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHAPLAN___"+seq).hasClass("invisivel"))){
		
			// SE OP NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayTag.includes(tag)) && !(tag=="")){
				
				arrayTag.push(tag)
				
			}
			
		}
		
	})
	
	arrayTag = arrayTag.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayTag.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOTAG___1').append($("<option class='info'></option>").attr("value", arrayTag[i]).text(arrayTag[i]));
 
	}
	
}


// CONSTRÓI SELECT DO STATUS ITEM
function constroiSelectItem(){
	
	console.log("vou construir select do Item")
	var arrayItem = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OS___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var item = $("#DESCITEM___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHAPLAN___"+seq).hasClass("invisivel"))){
		
			// SE ITEM NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayItem.includes(item)) && !(item=="")){
				
				arrayItem.push(item)
				
			}
			
		}
		
	})
	
	arrayItem = arrayItem.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayItem.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOITEM___1').append($("<option class='info'></option>").attr("value", arrayItem[i]).text(arrayItem[i]));
 
	}
	
}

// CONSTRÓI SELECT DA ATIVIDADE
function constroiSelectAtv(){
	
	console.log("vou construir select da Atividade")
	var arrayAtv = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OS___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var atv = $("#DESCATV___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHAPLAN___"+seq).hasClass("invisivel"))){
		
			// SE ATIVIDADE NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayAtv.includes(atv)) && !(atv=="")){
				
				arrayAtv.push(atv)
				
			}
			
		}
		
	})
	
	arrayAtv = arrayAtv.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayAtv.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOATIVIDADE___1').append($("<option class='info'></option>").attr("value", arrayAtv[i]).text(arrayAtv[i]));
 
	}
	
}

// CONSTRÓI SELECT DA PRIORIDADE
function constroiSelectPrioridade(){
	
	console.log("vou construir select da Prioridade")
	var arrayPrioridade = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OS___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var prioridade = $("#PRIORIDADE___"+seq).val()
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHAPLAN___"+seq).hasClass("invisivel"))){
		
			// SE PRIORIDADE NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayPrioridade.includes(prioridade)) && !(prioridade=="")){
				
				arrayPrioridade.push(prioridade)
				
			}
			
		}
		
	})
	
	arrayPrioridade = arrayPrioridade.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayPrioridade.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOPRIORIDADE___1').append($("<option class='info'></option>").attr("value", arrayPrioridade[i]).text(arrayPrioridade[i]));
 
	}
	
}

// CONSTRÓI SELECT DO IDATV
function constroiSelectIdAtv(){
	
	console.log("vou construir select da idAtv")
	var arrayIdAtv = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OS___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var idAtv = $("#IDATVORDEM___"+seq).val()
		
		idAtv = parseInt(idAtv)
		
		// SE LINHA NÃO ESTÁ INVISÍVEL
		if(!($("#LINHAPLAN___"+seq).hasClass("invisivel"))){
		
			// SE PRIORIDADE NÃO ESTÁ CONTIDO NO ARRAY, SALVA
			if(!(arrayIdAtv.includes(idAtv)) && !(idAtv=="")){
				
				arrayIdAtv.push(idAtv)
				
			}
			
		}
		
	})
	
	arrayIdAtv = arrayIdAtv.sort(function(a,b){ if(a>b) return 1; if(a<b) return -1; return 0; })
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayIdAtv.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOIDATV___1').append($("<option class='info'></option>").attr("value", arrayIdAtv[i]).text(arrayIdAtv[i]));
 
	}
	
}

// CONSTRÓI SELECT DO AVANCO
function constroiSelectAvanco(){
	
	console.log("vou construir select do AVANCO")
	var arrayAvanco = new Array()
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("input[id^='OS___']").each(function (index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var avanco = $("#AVANCO___"+seq).val()
		
		if( !(avanco=="" || avanco==null || avanco==undefined) ){
			
			console.log("avanco: "+avanco)
			
			// SE LINHA NÃO ESTÁ INVISÍVEL
			if(!($("#LINHAPLAN___"+seq).hasClass("invisivel"))){
			
				// SE AVANCO NÃO ESTÁ CONTIDO NO ARRAY, SALVA
				if(!(arrayAvanco.includes(avanco)) && !(avanco=="")){
					
					arrayAvanco.push(avanco)
					
				}
				
			}
			
		}
		
	})
	
	//arrayAvanco = arrayAvanco.sort()
	
	// PERCORRE TODOS OS REGISTROS DO ARRAY
	for(var i=0; i < arrayAvanco.length; i++){
	
		// PREENCHE O SELECT COM OS DADOS
		$('#INFOAVANCO___1').append($("<option class='info'></option>").attr("value", arrayAvanco[i]).text(arrayAvanco[i]));
 
	}
	
}

// SE TABELA DOS FILTROS PARA A TABELA NÃO FOI CRIADA
function temTabelaFiltros(){
	
	var tem = false
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$("select[id^='INFOOS___']").each(function(){
		
		tem = true
		
	})
	
	return tem
	
}

// LIMPA OS FILTROS DA TABELA DE CADASTRO
function limpaFiltros(){
	
	$('#INFOOS___1').children('option:not(:first)').remove();
	$('#INFOOP___1').children('option:not(:first)').remove();
	$('#INFOTAG___1').children('option:not(:first)').remove();
	$('#INFOITEM___1').children('option:not(:first)').remove();
	$('#INFOATIVIDADE___1').children('option:not(:first)').remove();
	$('#INFOPRIORIDADE___1').children('option:not(:first)').remove();
	$('#INFOAVANCO___1').children('option:not(:first)').remove();
	$('#INFOIDATV___1').children('option:not(:first)').remove();
	$('#INFOPREV___1').children('option:not(:first)').remove();
	$('#INFOAVANCO___1').children('option:not(:first)').remove();

}

// ADICIONA LINHA NA TABELA DOS FILTROS PARA A TABELA
function addFiltro(){
	
	var row = wdkAddChild('CABECALHO_PLAN')
	 
	return row
	
}

// COLOCA A SELEÇÃO NO CAMPO AVANÇO
function colocaSelecaoAvanco(obj){
	
	console.log("coloca seleção no avanço")
	
	var seq = $(obj).parent("tr").attr("id").split("___")[1]
	
	var codcoligada = $("#CODCOLIGADA___"+seq).val()
	var codfilial = $("#CODFILIAL_FILTRO").val()
	var codOrdem = $("#OPATV___"+seq).val()
	var idAtvOrdem = $("#IDATIVIDADEATV___"+seq).val()
	var codEstrutura = $("#CODESTRUTURAATV___"+seq).val()
	var codStatus = $("#ATV_STATUS___"+seq).val()
	var ultimaAtv = $("#ULTIMAATVOP___"+seq).val()
	var avanco = $("#AVANCO___"+seq).val()
	var planocorte = $("#PLANODECORTE___"+seq).val()

	console.log("codStatus: "+codStatus+", ultimaAtv: "+ultimaAtv+", avanco: "+avanco+", codcoligada: "+codcoligada+", codfilial: "+codfilial+", codOrdem: "+codOrdem+
			", idAtvOrdem: "+idAtvOrdem+", codEstrutura: "+codEstrutura)

	// SE O AVANÇO JÁ FOI SELECIONADO
	if($(obj).hasClass("avancoSelecionado")){
		
		// TIRA A SELEÇÃO
		$(obj).removeClass("avancoSelecionado")
		
	} else {
			
		// SE NÃO
		
		// SE ATIVIDADE TEM PLANO DE CORTE CADASTRADO
		if(planocorte!=0){
		
			Swal.fire({
				  icon: 'warning',
				  title: 'Essa atividade não pode ter avanço alterado, pois pertence ao plano de corte '+planocorte+'!',
				  text: "Verifique e tente novamente"
			})
			
			// TIRA A SELEÇÃO
			$(obj).removeClass("avancoSelecionado")
			
		}
		
		// SE NÃO ESTÁ PROGRAMADO OU PARCIALMENTE APONTADO
		else if(!(codStatus==2 || codStatus==3 || codStatus==5) || ultimaAtv=="ULTIMA"){
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'warning',
				  title: 'Essa atividade não pode ter avanço alterado',
				  text: "Verifique e tente novamente"
			})
			
			// TIRA A SELEÇÃO
			$(obj).removeClass("avancoSelecionado")
			
		} else if(ultimaAtv==1){
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'O avanço da última atividade da OP deve ser feito ao subir saldo no processo de Apontamento',
				  text: 'Verifique e tente novamente.'
			})
			
			// TIRA A SELEÇÃO
			$(obj).removeClass("avancoSelecionado")
			
		} else {
			// SE NÃO
			
			// COLOCA A SELEÇÃO
			$(obj).addClass("avancoSelecionado")
			
		}
	
	}
	
}

// COLOCA A SELEÇÃO NO CAMPO AVANÇO
function colocaSelecaoAvancoSemAviso(){

	$("input[id^='AVANCO___']").each(function(){

		console.log("coloca seleção no avanço")
	
		var seq = $(this).attr("id").split("___")[1]
		
		// var codcoligada = $("#CODCOLIGADA___"+seq).val()
		// var codfilial = $("#CODFILIAL_FILTRO").val()
		// var codOrdem = $("#OPATV___"+seq).val()
		// var idAtvOrdem = $("#IDATIVIDADEATV___"+seq).val()
		// var codEstrutura = $("#CODESTRUTURAATV___"+seq).val()
		var codStatus = $("#ATV_STATUS___"+seq).val()
		var ultimaAtv = $("#ULTIMAATVOP___"+seq).val()
		//var avanco = $("#AVANCO___"+seq).val()
		var planocorte = $("#PLANODECORTE___"+seq).val()

		// SE O AVANÇO JÁ FOI SELECIONADO
		if($(this).parent().hasClass("avancoSelecionado")){
			
			return;
			
		} else {

			if($(this).parent().is(':visible')){
				// SE NÃO
			
				// SE ATIVIDADE TEM PLANO DE CORTE CADASTRADO
				if(planocorte!=0){
					
					// TIRA A SELEÇÃO
					$(this).parent().removeClass("avancoSelecionado")
					
				}
				
				// SE NÃO ESTÁ PROGRAMADO OU PARCIALMENTE APONTADO
				else if(!(codStatus==2 || codStatus==3 || codStatus==5) || ultimaAtv=="ULTIMA"){
					
					// TIRA A SELEÇÃO
					$(this).parent().removeClass("avancoSelecionado")
					
				} else if(ultimaAtv==1){
					
					// TIRA A SELEÇÃO
					$(this).parent().removeClass("avancoSelecionado")
					
				} else {
					// SE NÃO
					
					// COLOCA A SELEÇÃO
					$(this).parent().addClass("avancoSelecionado")
					
				}

			}
		
		}

	})
	
}

// COLOCA A SELEÇÃO NO CAMPO AVANÇO
function tiraSelecaoAvancoSemAviso(){

	$("input[id^='AVANCO___']").each(function(){

		if($(this).parent().is(':visible')){

			// TIRA A SELEÇÃO
			$(this).parent().removeClass("avancoSelecionado")
		
		}

	})
	
}

window.addEventListener('keydown', function (event) {
    if (event.ctrlKey && (event.key === 'a' || event.key === 'A')) {
		// Cancel the default action, if needed
		event.preventDefault();
        // do something here
		colocaSelecaoAvancoSemAviso();
    }
});

window.addEventListener('keydown', function (event) {
    if (event.ctrlKey && (event.key === 'z'|| event.key === 'Z')) {
		// Cancel the default action, if needed
		event.preventDefault();
        // do something here
		tiraSelecaoAvancoSemAviso();
    }
});

function carregaRecAlocadoAtv(obj){

	var seq = $(obj).attr("id").split("___")[1]

	var codcoligada = $("#CODCOLIGADA___"+seq).val()
	var codfilial = $("#CODFILIAL_FILTRO").val()
	var codOrdem = $("#CODORDEMATV___"+seq).val()
	var idAtvOrdem = $("#IDATVORDEM___"+seq).val()


	// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
	var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codcoligada,codcoligada,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("CODFILIAL",codfilial,codfilial,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
	var a4 = DatasetFactory.createConstraint("IDATVORDEM",idAtvOrdem,idAtvOrdem,ConstraintType.MUST)
	
	constraints = new Array(a1,a2,a3,a4)
	
	var dataset = DatasetFactory.getDataset("dsResumoProgramacao",null,constraints,null)
	var row = dataset.values

	if(row!= null && row!="" && row!=undefined){

		limpaRecAlocAtv()

		for(var i=0; i<row.length; i++){

			var seq = wdkAddChild('SOMA_RECALOCADOATV')
			var rep = row[i]

			$("#DATAPROGRAMACAOALOC___"+seq).val(rep['DATA'])
			$("#CODMOALOC___"+seq).val(rep['CODMO'])
			$("#NOMEALOC___"+seq).val(rep['NOME'])
			$("#PROGRAMADOALOC___"+seq).val(Math.round(Number(rep['QTDHORASPROGRAMADO'])*100)/100)
			$("#APONTADOALOC___"+seq).val(Math.round(Number(rep['QTDHORASAPONTADO'])*100)/100)

		}

	}

}


function limpaRecAlocAtv(){

	$("input[id^='DATAPROGRAMACAOALOC___']").each(function(){

		$(this).parent().parent().remove();

	})


}


// CARREGA AS INFORMAÇÕES DO AVANÇO ATUAL
function carregaAvanco(obj){
	
	//var seq = $(obj).parent("a").parent("td").children("input").attr("id").split("___")[1]

	//console.log("seq: "+seq)
	
	// SE TEM ALGUN AVANÇO SELECIONADO
	if(temAvancoSelecionado()){
		
		// COLOCA O LINK E SIMULA O CLICK
		$("#SPANAVANCOATVTITULO").parent("a").attr("href","#AVANCOBLANK")
		$("#SPANAVANCOATVTITULO").parent("a").click()[0]
		
		// SALVA O SEQ E O AVANÇO ATUAL
		//$("#SEQAVANCO").val(seq)
		//$("#AVANCOATUAL").val($("#AVANCOATV___"+seq).val())
		
	} else {
		// SE NÃO
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'Não há atividades com o avanço selecionado',
			  text: 'Verifique e tente novamente.'
		})
		
	}
		
}

// SE TEM ALGUN AVANÇO SELECIONADO
function temAvancoSelecionado(){
	
	console.log("verifica se tem algum avanço selecionado")
	
	var ret = false
	
	// PERCORRE TODOS OS REGISTROS DAS ATIVIDADES
	$("input[id^='OS___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		// SE AVANÇO FOI SELECIONADO
		if($("#AVANCO___"+seq).parent("td").hasClass("avancoSelecionado")){
			
			ret = true
			
		}
		
	})
	
	console.log("tem algum avanço selecionado? "+ret)
	
	return ret
	
}

// VALIDA E ATUALIZA O AVANCO
function atualizaAvanco(){
	
	console.log("vou validar e atualizar o avanço")
	
	var avanco = $("#NOVOAVANCO option:selected").val()
	
	console.log("avanco: "+avanco)
	
	// SE O AVANÇO NÃO FOI INFORMADO
	if(avanco=="" || avanco==null || avanco==undefined){
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'O novo avanço precisa ser preenchido',
			  text: 'Verifique e tente novamente.'
		})
		
	} else {
		// SE NÃO
		
		// PERCORRE TODOS OS REGISTROS DAS ATIVIDADES
		$("input[id^='OS___']").each(function(){
		
			var seq = $(this).attr("id").split("___")[1]
			
			// SE AVANÇO FOI SELECIONADO
			if($("#AVANCO___"+seq).parent("td").hasClass("avancoSelecionado")){
				
				var codOrdem = $("#CODORDEMATV___"+seq).val()
				var idAtvOrdem = $("#IDATVORDEM___"+seq).val()
				var codColigada = $("#CODCOLIGADA___"+seq).val()
				var codFilial = $("#CODFILIAL_FILTRO").val()
				var codEstrutura = $("#CODESTRUTURA___"+seq).val()
				var codAtividade = $("#CODATIVIDADE___"+seq).val()
				var celula = $("#CELULAATV___"+seq).val()
				
				console.log("codOrdem: "+codOrdem+", idAtvOrdem: "+idAtvOrdem+", codColigada: "+codColigada+", codFilial: "+codFilial+", codEstrutura: "+codEstrutura+
						", avanco: "+avanco+", codAtividade: "+codAtividade+", celula: "+celula+", seq: "+seq)
				
				// SE TODAS AS INFORMAÇÕES FORAM PREENCHIDAS
				if ( !( (codOrdem=="" || codOrdem==null || codOrdem==undefined) || (idAtvOrdem=="" || idAtvOrdem==null || idAtvOrdem==undefined) || 
				(codColigada=="" || codColigada==null || codColigada==undefined) || (codFilial=="" || codFilial==null || codFilial==undefined) ||
				(codEstrutura=="" || codEstrutura==null || codEstrutura==undefined) || (avanco=="" || avanco==null || avanco==undefined) ) ){
					
					// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
					var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST)
					var a2 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
					var a3 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
					var a4 = DatasetFactory.createConstraint("IDATVORDEM",idAtvOrdem,idAtvOrdem,ConstraintType.MUST)
					var a5 = DatasetFactory.createConstraint("CODESTRUTURA",codEstrutura,codEstrutura,ConstraintType.MUST)
					var a6 = DatasetFactory.createConstraint("AVANCO",avanco,avanco,ConstraintType.MUST)
					
					constraints = new Array(a1,a2,a3,a4,a5,a6)
					
					var dataset = DatasetFactory.getDataset("dsAtualizaAvancoOP",null,constraints,null)
					
					// LIMPA OS CAMPOS DO MODAL
					$("#AVANCOATUAL").val("")
					$("#SEQAVANCO").val("")
					$("#NOVOAVANCO").val("")
					
					// ATUALIZA AS INFORMAÇÕES DA ATIVIDADE DA OP
					//atualizaProgAtv(codColigada, codFilial, codOrdem, codAtividade, celula, codigoPrd, idPrd, codPosto, codPrj, dataDe, dataAte, seq)
					
					// RETIRA O LINK
					$("#SPANAVANCOATVTITULO").parent("a").removeAttr("href")

					RetornaConsulta();
					
				} else {
					// SE NÃO
					
					// EXIBE ALERTA
					Swal.fire({
						  icon: 'error',
						  title: 'A atualização não pode ser realizada',
						  text: 'Verifique as informações dessa atividade'
					})
					
				}
				
			}
			
		})
		
		// REMOVE A SELEÇÃO DO AVANÇO
		removeSelecaoAvanco()
		
		// FECHA O MODAL
		$("#fechar")[0].click()
		
	}
	
}

// REMOVE A SELEÇÃO DO AVANÇO
function removeSelecaoAvanco(){
	
	console.log("vou remover a seleção do avanço")
	
	// PERCORRE TODOS OS REGISTROS DAS ATIVIDADES
	$("input[id^='OS___']").each(function(){
	
		var seq = $(this).attr("id").split("___")[1]
		
		// SE AVANÇO FOI SELECIONADO
		if($("#AVANCO___"+seq).parent("td").hasClass("avancoSelecionado")){

			// REMOVE A SELEÇÃO
			$("#AVANCO___"+seq).parent("td").removeClass("avancoSelecionado")
			
		}
		
	})
}

// LIMPA OS CAMPOS DO MODAL DO AVANÇO
function limpaAvanco(){
	
	// RETIRA O LINK
	$("#SPANAVANCOATVTITULO").parent("a").removeAttr("href")
	
	// LIMPA OS CAMPOS DO MODAL
	$("#AVANCOATUAL").val("")
	$("#SEQAVANCO").val("")
	$("#NOVOAVANCO").val("")

}


function verificaAvanco(obj){
	
	console.log("verifica se o avanço informado é válido")
	
	var avanco = $(obj).val()
	
	console.log("avanco: "+avanco)
	
	// SE O AVANÇO É UM DECIMAL
	if(avanco.includes(",") || avanco.includes(".")){
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'O avanço não pode ser um valor decimal',
			  text: 'Verifique e tente novamente'
		})
		
		// LIMPA O CAMPO
		$(obj).val("")
		
	}else{
		// SE NÃO
		
		console.log("type avanco "+typeof(avanco))
		
		// SE É UM VALOR NÃO NUMÉRICO
		if(isNaN(avanco)){
			
			console.log("é um NaN")
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'O avanço informado não é um valor válido',
				  text: 'Verifique e tente novamente'
			})
			
			// LIMPA O CAMPO
			$(obj).val("")
			
		} else {
			// SE NÃO
			
			console.log("é um valor válido")
			
			avanco = parseInt(avanco)
			
			// SE AVANÇO É MENOR QUE 0 OU MAIOR QUE 100
			if(avanco<0 || avanco>100){
				
				// EXIBE ALERTA
				Swal.fire({
					  icon: 'error',
					  title: 'O valor do avanço não pode ser menor que 0 e maior que 100',
					  text: 'Verifique e tente novamente'
				})
				
				// LIMPA O CAMPO
				$(obj).val("")
				
			} else {
				
				if(avanco.toString().includes("-")){
					
					avanco = avanco.toString().replace("-","")
					
				}
				
				$(obj).val(avanco)
				
			}
			
		}
		
	}
	
}