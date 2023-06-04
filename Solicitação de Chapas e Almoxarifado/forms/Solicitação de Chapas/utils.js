console.log("entrei no utils")

var myLoading = FLUIGC.loading(window);

var table;

// FUNÇÃO PARA ESCONDER A OPÇÃO DE INICIAR SOLICITAÇÃO COM BASE NA ATUAL
parent.$('.wcm-all-content').bind('DOMNodeInserted', function(e){

	
   // QUANDO APARECER A TELA DE "SOLICITAÇÃO INICIADA COM SUCESSO" IRÁ ENTRAR NESSE IF
   if (e.target.id == 'message-page') {
	  
    // ESCONDE A OPÇÃO DE "INICIAR SOLICITAÇÃO COM BASE NESTA"
    parent.$('[data-reset-process-instance-id]').hide()
    
  }	
  
})

// TRANSFORMA CONTEÚDO DO IMPUT EM CAIXA ALTA
function caixaAlta(obj){
	
	// SALVA O CONTEÚDO DO INPUT
	var cx = $(obj).val()
	
	// TRANSFORMA EM CAIXA ALTA
	var cx = cx.toUpperCase()
	
	// SALVA O CONTEÚDO EM CAIXA ALTA NO CAMPO INPUT
	$(obj).val(cx)
	
}

// CONFIRMA A OS SELECIONADA E CARREGA A VIEW DA ESTRUTURA
function confirmaOS(){
	
	var numOS = $("#NUM_OS").val()
	var execucao = $("#EXECUCAO_INFO").val()
	var codTrfEx = $("#CODTRFEX").val()
	
	console.log("numOS: "+numOS+", execucao: "+execucao+", codTrfEx: "+codTrfEx)
	
	// SE A OS FOI INFORMADA
	if( ! (numOS=="" || numOS==null || numOS==undefined) ){
		
		console.log("OS foi informada")
		
		// SE A EXECUÇÃO FOI INFORMADA
		if( ! (execucao=="" || execucao==null || execucao==undefined) ){
			
			console.log("execução foi informada")
			
			// SE O CÓDIGO DA TAREFA FOI INFORMADO
			if( ! (codTrfEx=="" || codTrfEx==null || codTrfEx==undefined) ){
			
				console.log("codTrfEx foi informado")

				// BUSCA E CARREGA A ESTRUTURA
				buscaEstruturaOS(numOS,execucao,codTrfEx)
								
			} else {
				// SE NÃO
				
				// EXIBE ALERTA
				Swal.fire({
					icon: 'error',
					title: 'É necessário selecionar a OS,o Código de Tarefa e a Execução a ser buscada!',
					text: 'Verifique e tente novamente'
				})
				
			}
			
		} else {
			// SE NÃO
			
			// EXIBE ALERTA
				Swal.fire({
					icon: 'error',
					title: 'É necessário selecionar a OS,o Código de Tarefa e a Execução a ser buscada!',
					text: 'Verifique e tente novamente'
			})
			
		}
		
	} else {
		// SE NÃO
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'É necessário selecionar a OS,o Código de Tarefa e a Execução a ser buscada!',
			  text: 'Verifique e tente novamente'
		})
		
	}
	
}

// EXPORTAR A LISTA DE MATERIAIS PARA A PLANILHA EXCEL
function exportarLista() {
	
	console.log("Entrei para exportar a Lista de Materiais para o Excel")
	
	// MONTA A TABELA COM OS DADOS INSERIDOS NA LISTA DE MATERIAIS
	var strExcel = montarTabelaExportar()
	
	console.log("strExcel: ")
	console.log(strExcel)
	
	// SE RETORNO É VAZIO OU NULO
	if(strExcel=="" || strExcel==null || strExcel==undefined){

		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'Não foi localizada uma Lista de Materiais para a OS informada',
			  text: 'Verifique e tente novamente'
		})
		
	} else {

		//window.open('data:application/vnd.ms-excel,' + strExcel);
		window.open('data:application/vnd.ms-excel,' + '\uFEFF' + encodeURIComponent(strExcel));
		
	}
	
}

// MONTA A TABELA COM OS DADOS INSERIDOS NA LISTA DE MATERIAIS
function montarTabelaExportar(){
	
	var strExcel = ""	
	var somaComp = 0
	var somaPeso = 0
	var numOS = $("#NUM_OS").val()
	
	var c1 = DatasetFactory.createConstraint("NUMOSSALVOS",numOS,numOS,ConstraintType.MUST)

	var constraints = new Array(c1)
	var dataset = DatasetFactory.getDataset("dsBuscaComponentesListaOS",null,constraints,null)
	var row = dataset.values
	
	console.log("row "+row)
	
	// SE RETORNO NÃO É NULO OU VAZIO
	if(!(row=="" || row==null || row==undefined)){
		
		strExcel = "<table tablename='LISTA_MATERIAIS_SALVOS' class='table table-sm table-bordered table-layout-fixed' border='1' nodeletebutton='true' noaddbutton='true'> "+
        
        "<thead> "+
            "<tr> "+
                
                "<th class='col-md-2 text-center'>Desenho</th> "+
                "<th class='col-md-2 text-center'>Posição</th> "+
                "<th class='col-md-2 text-center'>Quantidade</th> "+
                "<th class='col-md-3 text-center'>Descrição</th> "+
                "<th class='col-md-2 text-center'>Bitola(mm)</th> "+
                "<th class='col-md-2 text-center'>Largura(mm)</th> "+
                "<th class='col-md-2 text-center'>Comprimento(mm)</th> "+
                "<th class='col-md-2 text-center'>Esp Rosca</th> "+
                "<th class='col-md-5 text-center'>Material</th> "+
                "<th class='col-md-2 text-center'>Peso Bruto(Kg)</th> "+
                "<th class='col-md-4 text-center'>Origem de MP</th> "+
                "<th class='col-md-5 text-center'>Principal</th> "+
                "<th class='col-md-5 text-center'>Substituto 1</th> "+
                "<th class='col-md-5 text-center'>Substituto 2</th> "+
                "<th class='col-md-5 text-center'>Substituto 3</th> "+
                "<th class='col-md-5 text-center'>Substituto 4</th> "+
                "<th class='col-md-5 text-center'>Substituto 5</th> "+
                
            "</tr> "+

        "</thead> "+
        
        "<tbody> "

        // PERCORRE OS REGISTROS DA LISTA
        for(var i=0; i<row.length; i++){
        	
        	var rep = row[i]
        	
        	var numDesenho = rep["NUMDESENHOSALVOS"]
    		var posicao = rep["POSICAOSALVOS"]
    		var qtde = rep["QUANTIDADESALVOS"]
    		var descricao = rep["DESCRICAOSALVOS"]
    		var bitola = rep["BITOLASALVOS"]
    		var largura = rep["LARGURASALVOS"]
    		var comprimento = rep["COMPRIMENTOSALVOS"]
    		var espRosca = rep["ESPROSCASALVOS"]
    		var material = rep["MATERIALSALVOS"]
    		var peso = rep["PESOBRUTOSALVOS"]
    		var origemMp = rep["ORIGEMMPSALVOS"]
    		var produtoRM1 = rep["PRODUTORM1SALVOS"]
    		var produtoRM2 = rep["PRODUTORM2SALVOS"]
    		var produtoRM3 = rep["PRODUTORM3SALVOS"]
    		var produtoRM4 = rep["PRODUTORM4SALVOS"]
    		var produtoRM5 = rep["PRODUTORM5SALVOS"]
    		var produtoRM6 = rep["PRODUTORM6SALVOS"]
    		var pesoPlan = peso
			var qtdePlan = qtde
        	
    		console.log("peso: "+peso)
        	
    		console.log("pesoPlan: "+pesoPlan)
        	
        	if(peso.includes(".")){
        		
        		pesoPlan = peso.replace(".",",")
        		
        	}
        	
        	if(qtde.includes(".")){
        		
        		qtdePlan = qtde.replace(".",",")
        		
        	}
        	
        	console.log("pesoPlan: "+pesoPlan)
        	
    		strExcel = strExcel + "<tr> "+
    		
    		                "<td> "+numDesenho+" "+"</td> "+
    		
    		                "<td> "+posicao+" "+"</td> "+
    		
    		                "<td> "+qtdePlan+" "+"</td> "+
    		
    		                "<td> "+descricao+" "+"</td> "+
    		                
    		                "<td> "+bitola+" "+"</td> "+
    		                
    		                "<td> "+largura+" "+"</td> "+
    		                
    		                "<td> "+comprimento+" "+"</td> "+
    		                    
    		                "<td> "+espRosca+" "+"</td> "+
    		                
    		                "<td> "+material+" "+"</td> "+
    		
    		                //"<td> "+peso+" "+"</td> "+
    		
    		                "<td> "+pesoPlan+" "+"</td> "+
    		                
    		                "<td> "+origemMp+" "+"</td> "+
    		                
    		                "<td> "+produtoRM1+" "+"</td> "+
    		
    		                "<td> "+produtoRM2+" "+"</td> "+
    		
    		                "<td> "+produtoRM3+" "+"</td> "+
    		
    		                "<td> "+produtoRM4+" "+"</td> "+
    		
    		                "<td> "+produtoRM5+" "+"</td> "+
    		
    		                "<td> "+produtoRM6+" "+"</td> "+
    		
    		            "</tr> "
    		
            if(comprimento.includes(",")){
        		
        		comprimento = comprimento.replace(",",".")
        		
        	}
        	
        	if(peso.includes(",")){
        		
        		peso = peso.replace(",",".")
        		
        	}
        	
        	comprimento = parseFloat(comprimento)
        	peso = parseFloat(peso)
        	
        	console.log("peso após parse: "+peso)
        	
        	if(!(comprimento=="" || comprimento==null || comprimento==undefined || isNaN(comprimento))){
        		
        		somaComp = somaComp + comprimento
        		
        	}
        	
        	if(!(peso=="" || peso==null || peso==undefined || isNaN(peso))){
        		
        		somaPeso = somaPeso + peso  
            	
        	}
        	              
        }
		
		somaComp = somaComp.toString()
		somaPeso = somaPeso.toString()
		
		if(somaComp.includes(".")){
			
			somaComp = somaComp.replace(".",",")
			
		}
		
		if(somaPeso.includes(".")){
			
			somaPeso = somaPeso.replace(".",",")
			
		}
    	
		strExcel = strExcel + "<tr> "+
		
		                "<td></td> "+
		
		                "<td></td> "+
		
		                "<td></td> "+
		
		                "<td></td> "+
		                
		                "<td></td> "+
		                
		                "<td></td> "+
		                
		                "<td> "+somaComp+" "+"</td> "+
		                    
		                "<td></td> "+
		                
		                "<td></td> "+
		
		                "<td> "+somaPeso+" "+"</td> "+
		
		                "<td></td> "+
		                
		                "<td></td> "+
		
		                "<td></td> "+
		
		                "<td></td> "+
		
		                "<td></td> "+
		
		                "<td></td> "+
		
		                "<td></td> "+
		
		            "</tr> "
		
		strExcel = strExcel+ "	</tbody> "+
		
				"</table> "
		
		console.log("strExcel:")
		console.log(strExcel)
		
	}
	
	return strExcel
    
}

// BUSCA OS ÍNDICES FILHOS
function buscaIndicesFilhos(indice){

	var numOS = $("#NUM_OS").val()
	var indices = new Array()	
	
	var b1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	var b2 = DatasetFactory.createConstraint("INDICE",indice,indice,ConstraintType.MUST)
	
	var constraints = new Array(b1,b2)
	
	var dataset = DatasetFactory.getDataset("dsBuscaIndicesFilhosOS",null,constraints,null)
	console.log("dataset: "+dataset)
	console.log(dataset)
	var row = dataset.values
	
	console.log("row")
	console.log(row)
	
	var count = dataset.values.length
	
	// PERCORRE TODOS OS REGISTROS E SALVA NO ARRAY
	for(var i=0; i<count; i++){
		
		var rep = row[0]
		var indice = rep["INDICE"]
		
		indices.push(indice)	
		
	}
	
	return indices

}

// VERIFICA SE EXISTEM ITENS QUE AINDA NÃO FORAM SALVOS NA TABELA DA LISTA DE MATERIAIS
function verificaLista(){
	
	var numOS = $("#NUM_OS").val()
	//var indices = new Array()	
	
	var negado = false
	
	var b1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	//var b2 = DatasetFactory.createConstraint("INDICE",indice,indice,ConstraintType.MUST)
	
	var constraints = new Array(b1)
	
	var dataset = DatasetFactory.getDataset("dsVerificaListaSalvosOS",null,constraints,null)
	console.log("dataset: "+dataset)
	console.log(dataset)
	var row = dataset.values
	
	// SE RETORNO É VAZIO OU NULO
	if(row=="" || row==null || row==undefined){
		
		return false
	
	} else {
		// SE NÃO
		
		console.log("row")
		console.log(row)
		
		var count = dataset.values.length
		
		// PERCORRE TODOS OS REGISTROS
		for(var i=0; i<count; i++){
		
			var rep = row[i]
			
			if(rep["IDCRIACAOSALVOS"]=="" || rep["IDCRIACAOSALVOS"]==null || rep["IDCRIACAOSALVOS"]=="null" || rep["IDCRIACAOSALVOS"]==undefined){
				
				negado = true
				
			}
			
		}
	
	}
	
	// SE ENCONTROU ALGUM IDCRIACAO QUE AINDA NÃO FOI SALVO NA LISTA DE MATERIAIS
	if(negado){
		
		console.log("foram encontrados itens que não foram salvos na lista de materiais")
		
		return true
		
	} else {
		// SE NÃO 
		
		console.log("não há itens que não foram salvos na lista de materiais")
		
		return false
		
	}
	
}

// ATIVA ABA DESENHO COMO PRINCIAPL
function ativaAbaDesenho(){
	
	// REMOVE A CLASS ACTIVE DE TODAS AS ABAS
	$("#ABA_DESENHO").removeClass("active")
	$("#ABA_POSICOES").removeClass("active")
	$("#ABA_PROCESSO").removeClass("active")
	$("#ABA_COMPONENTES").removeClass("active")
	$("#DESENHO_BLANK").removeClass("active")
	$("#POSICOES_BLANK").removeClass("active")
	$("#PROCESSO_BLANK").removeClass("active")
	$("#COMPONENTES_BLANK").removeClass("active")
	
	// COLOCA A CLASS ACTIVE NA ABA DESENHO
	$("#ABA_DESENHO").addClass("active")
	$("#DESENHO_BLANK").addClass("active")

}

// SALVA O NÚMERO DA SOLICITAÇÃO NA TABELA PROCESSO
function salvaSolicitacaoProcesso(){
	
	// SALVA O NÚMERO DA SOLICITAÇÃO
	var solicitacao = $("#NUMPROCESSO").val()
	var numOS = $("#NUM_OS").val()
	
	var a1 = DatasetFactory.createConstraint("SOLICITACAO",solicitacao,solicitacao,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	
	var constraints = new Array(a1,a2)
	
	var dataset = DatasetFactory.getDataset("dsSalvaSolicitacaoProcesso",null,constraints,null)
	
}

// SALVA O NÚMERO DA SOLICITAÇÃO NA TABELA COMPONENTES
function salvaSolicitacaoComponentes(){
	
	// SALVA O NÚMERO DA SOLICITAÇÃO
	var solicitacao = $("#NUMPROCESSO").val()
	var numOS = $("#NUM_OS").val()
	
	var a1 = DatasetFactory.createConstraint("SOLICITACAO",solicitacao,solicitacao,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	
	var constraints = new Array(a1,a2)
	
	var dataset = DatasetFactory.getDataset("dsSalvaSolicitacaoComponentes",null,constraints,null)
	
}

// SALVA O NÚMERO DA SOLICITAÇÃO DA ESTRUTURA
function salvaSolicitacaoEstrutura(){
	
	// SALVA O NÚMERO DA SOLICITAÇÃO
	var solicitacao = $("#NUMPROCESSO").val()
	var numOS = $("#NUM_OS").val()
	
	var a1 = DatasetFactory.createConstraint("SOLICITACAO",solicitacao,solicitacao,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	
	var constraints = new Array(a1,a2)
	
	var dataset = DatasetFactory.getDataset("dsSalvaSolicitacaoEstrutura",null,constraints,null)
	
}

// SALVA OS COMPONENTES DA LISTA DE MATERIAIS
function salvaComponentesLista(){

	console.log("VOU SALVAR LISTA DOS MATERIAIS NA TABELA COMPONENTES")

	var numOS = $("#NUM_OS").val()
	
	var a1 = DatasetFactory.createConstraint("NUMOSSALVOS",numOS,numOS,ConstraintType.MUST)
	
	var constraints = new Array(a1)
	var dataset = DatasetFactory.getDataset("dsBuscaComponentesListaOS",null,constraints,null)
	var row = dataset.values

	console.log("row")
	console.log(row)

	// SE RETORNO NÃO É VAZIO OU NULO
	if(!(row=="" || row==null || row==undefined || row=="null")){
	
		var count = dataset.values.length 
		
		// PERCORRE TODOS OS REGISTROS
		for(var i=0; i<count; i++){
		
			var rep = row[i]
			
			console.log(rep)
			
			var idprd1 = ""
			var idprd2 = ""
			var idprd3 = ""
			var idprd4 = ""
			var idprd5 = ""
			var idprd6 = ""
			
			// SE PRODUTO PRINCIPAL FOI INFORMADO
			if(!(rep["IDPRD1SALVOS"]=="" || rep["IDPRD1SALVOS"]==null || rep["IDPRD1SALVOS"]==undefined)){
				idprd1 = rep["IDPRD1SALVOS"]
			}
			
			// SE PRODUTO SUBSTITUTO2 FOI INFORMADO
			if(!(rep["IDPRD2SALVOS"]=="" || rep["IDPRD2SALVOS"]==null || rep["IDPRD2SALVOS"]==undefined)){
				idprd2 = rep["IDPRD2SALVOS"]
			}
			
			// SE PRODUTO SUBSTITUTO3 FOI INFORMADO
			if(!(rep["IDPRD3SALVOS"]=="" || rep["IDPRD3SALVOS"]==null || rep["IDPRD3SALVOS"]==undefined)){
				idprd3 = rep["IDPRD3SALVOS"]
			}
			
			// SE PRODUTO SUBSTITUTO4 FOI INFORMADO
			if(!(rep["IDPRD4SALVOS"]=="" || rep["IDPRD4SALVOS"]==null || rep["IDPRD4SALVOS"]==undefined)){
				idprd4 = rep["IDPRD4SALVOS"]
			}
			
			// SE PRODUTO SUBSTITUTO5 FOI INFORMADO
			if(!(rep["IDPRD5SALVOS"]=="" || rep["IDPRD5SALVOS"]==null || rep["IDPRD5SALVOS"]==undefined)){
				idprd5 = rep["IDPRD5SALVOS"]
			}
			
			// SE PRODUTO SUBSTITUTO6 FOI INFORMADO
			if(!(rep["IDPRD6SALVOS"]=="" || rep["IDPRD6SALVOS"]==null || rep["IDPRD6SALVOS"]==undefined)){
				idprd6 = rep["IDPRD62SALVOS"]
			}
			
			console.log("idprd1: "+idprd1+", idprd2: "+idprd2+", idprd3: "+idprd3+", idprd4: "+idprd4+
					", idprd5: "+idprd5+", idprd6: "+idprd6)
			
			// SE PRODUTO PRINCIPAL FOI INFORMADO
			if(!(idprd1=="" || idprd1==null || idprd1=="null")){
				
				var idPrdComponentes = rep["IDPRD1SALVOS"]
				var produtoComp = rep["PRODUTORM1SALVOS"]
				var codPrdComponentes = rep["CODIGOPRD1SALVOS"]
				var codUndComponentes = rep["UNDPRD1SALVOS"]
				var idCriacaoComp = rep["IDCRIACAOSALVOS"] 
				var insumoComp = rep["DESCRICAOSALVOS"]+" "+rep["MATERIALSALVOS"]+" "+rep["BITOLASALVOS"]
				var listaComp = "L"
				var substitutoComp = ""
				var osComp = numOS
			
				console.log("idPrdComponentes: "+idPrdComponentes+", produtoComp: "+produtoComp+", codPrdComponentes: "+codPrdComponentes+", codUndComponentes: "+codUndComponentes+", idCriacaoComp: "+
				idCriacaoComp+", insumoComp: "+insumoComp+", listaComp: "+listaComp+", substitutoComp: "+substitutoComp+", osComp: "+osComp)
			
				// BUSCA OS VALORES DAS QUANTIDADES DOS ITENS E FAZ OS CÁLCULOS PARA SEREM SALVOS NA TABELA DE COMPONENTES
				var qtdes = buscaQtdeComponentesLista(idCriacaoComp)
				
				var qtdeUnit = qtdes[0].QTDEUNIT
				var qtdeTotal = qtdes[0].QTDETOTAL
				
				console.log("qtdeUnit: "+qtdeUnit+", qtdeTotal: "+qtdeTotal)
				
				console.log("vou construir as constraints")
				
				// CONSTRÓI AS CONSTRAINTS PARA REALIZAR O INSERT DO COMPONENTE
				var c1 = DatasetFactory.createConstraint("PRODUTOCOMPONENTES",produtoComp,produtoComp,ConstraintType.MUST);
				var c2 = DatasetFactory.createConstraint("IDPRDCOMPONENTES",idPrdComponentes,idPrdComponentes,ConstraintType.MUST);
				var c3 = DatasetFactory.createConstraint("CODIGOPRDCOMPONENTES",codPrdComponentes,codPrdComponentes,ConstraintType.MUST);
				var c4 = DatasetFactory.createConstraint("CODUNDCOMPONENTES",codUndComponentes,codUndComponentes,ConstraintType.MUST);
				var c5 = DatasetFactory.createConstraint("IDCRIACAOCOMPONENTES",idCriacaoComp,idCriacaoComp,ConstraintType.MUST);
				var c6 = DatasetFactory.createConstraint("QTDEUNCOMPONENTES",qtdeUnit,qtdeUnit,ConstraintType.MUST);
				var c7 = DatasetFactory.createConstraint("QTDETOTALCOMPONENTES",qtdeTotal,qtdeTotal,ConstraintType.MUST);
				var c8 = DatasetFactory.createConstraint("LISTACOMPONENTES",listaComp,listaComp,ConstraintType.MUST);
				var c9 = DatasetFactory.createConstraint("INSUMOCOMPONENTES",insumoComp,insumoComp,ConstraintType.MUST);
				var c10 = DatasetFactory.createConstraint("SUBSTITUTOCOMPONENTES",substitutoComp,substitutoComp,ConstraintType.MUST);
				var c11 = DatasetFactory.createConstraint("OSCOMPONENTES",osComp,osComp,ConstraintType.MUST);
				//var c12 = DatasetFactory.createConstraint("IDCOMPONENTES",idCompo,idComp,ConstraintType.MUST);
				
				var constraints = new Array(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11);
				
				console.log("vou chmar o dataset")
				
				dataset = DatasetFactory.getDataset("dsInsertItemComponentesOS",null,constraints,null);
				
				console.log("fiz a inserção do componente")
				
			}
			
			// SE PRODUTO 2 FOI INFORMADO
			if(!(idprd2=="" || idprd2==null || idprd2=="null")){
				
				var idPrdComponentes = rep["IDPRD2SALVOS"]
				var produtoComp = rep["PRODUTORM2SALVOS"]
				var codPrdComponentes = rep["CODIGOPRD2SALVOS"]
				var codUndComponentes = rep["UNDPRD2SALVOS"]
				var idCriacaoComp = rep["IDCRIACAOSALVOS"] 
				var insumoComp = rep["DESCRICAOSALVOS"]+" "+rep["MATERIALSALVOS"]+" "+rep["BITOLASALVOS"]
				var listaComp = "L"
				var substitutoComp = rep["CODIGOPRD1SALVOS"]
				var osComp = numOS
				var qtdeUnit = ""
				var qtdeTotal = ""
				
				console.log("idPrdComponentes: "+idPrdComponentes+", produtoComp: "+produtoComp+", codPrdComponentes: "+codPrdComponentes+", codUndComponentes: "+codUndComponentes+", idCriacaoComp: "+
				idCriacaoComp+", insumoComp: "+insumoComp+", listaComp: "+listaComp+", substitutoComp: "+substitutoComp+", osComp: "+osComp+", qtdeUnit: "+qtdeUnit+", qtdeTotal: "+qtdeTotal)
				
				// CONSTRÓI AS CONSTRAINTS PARA REALIZAR O INSERT DO COMPONENTE
				var c1 = DatasetFactory.createConstraint("PRODUTOCOMPONENTES",produtoComp,produtoComp,ConstraintType.MUST);
				var c2 = DatasetFactory.createConstraint("IDPRDCOMPONENTES",idPrdComponentes,idPrdComponentes,ConstraintType.MUST);
				var c3 = DatasetFactory.createConstraint("CODIGOPRDCOMPONENTES",codPrdComponentes,codPrdComponentes,ConstraintType.MUST);
				var c4 = DatasetFactory.createConstraint("CODUNDCOMPONENTES",codUndComponentes,codUndComponentes,ConstraintType.MUST);
				var c5 = DatasetFactory.createConstraint("IDCRIACAOCOMPONENTES",idCriacaoComp,idCriacaoComp,ConstraintType.MUST);
				var c6 = DatasetFactory.createConstraint("QTDEUNCOMPONENTES",qtdeUnit,qtdeUnit,ConstraintType.MUST);
				var c7 = DatasetFactory.createConstraint("QTDETOTALCOMPONENTES",qtdeTotal,qtdeTotal,ConstraintType.MUST);
				var c8 = DatasetFactory.createConstraint("LISTACOMPONENTES",listaComp,listaComp,ConstraintType.MUST);
				var c9 = DatasetFactory.createConstraint("INSUMOCOMPONENTES",insumoComp,insumoComp,ConstraintType.MUST);
				var c10 = DatasetFactory.createConstraint("SUBSTITUTOCOMPONENTES",substitutoComp,substitutoComp,ConstraintType.MUST);
				var c11 = DatasetFactory.createConstraint("OSCOMPONENTES",osComp,osComp,ConstraintType.MUST);
				//var c12 = DatasetFactory.createConstraint("IDCOMPONENTES",idCompo,idComp,ConstraintType.MUST);
				
				var constraints = new Array(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11);
				
				dataset = DatasetFactory.getDataset("dsInsertItemComponentesOS",null,constraints,null);
				
			}
			
			// SE PRODUTO 3 FOI INFORMADO
			if(!(idprd3=="" || idprd3==null || idprd3=="null")){
				
				var idPrdComponentes = rep["IDPRD3SALVOS"]
				var produtoComp = rep["PRODUTORM3SALVOS"]
				var codPrdComponentes = rep["CODIGOPRD3SALVOS"]
				var codUndComponentes = rep["UNDPRD3SALVOS"]
				var idCriacaoComp = rep["IDCRIACAOSALVOS"] 
				var insumoComp = rep["DESCRICAOSALVOS"]+" "+rep["MATERIALSALVOS"]+" "+rep["BITOLASALVOS"]
				var listaComp = "L"
				var substitutoComp = rep["CODIGOPRD1SALVOS"]
				var osComp = numOS
				var qtdeUnit = ""
				var qtdeTotal = ""
				
				console.log("idPrdComponentes: "+idPrdComponentes+", produtoComp: "+produtoComp+", codPrdComponentes: "+codPrdComponentes+", codUndComponentes: "+codUndComponentes+", idCriacaoComp: "+
				idCriacaoComp+", insumoComp: "+insumoComp+", listaComp: "+listaComp+", substitutoComp: "+substitutoComp+", osComp: "+osComp+", qtdeUnit: "+qtdeUnit+", qtdeTotal: "+qtdeTotal)
				
				// CONSTRÓI AS CONSTRAINTS PARA REALIZAR O INSERT DO COMPONENTE
				var c1 = DatasetFactory.createConstraint("PRODUTOCOMPONENTES",produtoComp,produtoComp,ConstraintType.MUST);
				var c2 = DatasetFactory.createConstraint("IDPRDCOMPONENTES",idPrdComponentes,idPrdComponentes,ConstraintType.MUST);
				var c3 = DatasetFactory.createConstraint("CODIGOPRDCOMPONENTES",codPrdComponentes,codPrdComponentes,ConstraintType.MUST);
				var c4 = DatasetFactory.createConstraint("CODUNDCOMPONENTES",codUndComponentes,codUndComponentes,ConstraintType.MUST);
				var c5 = DatasetFactory.createConstraint("IDCRIACAOCOMPONENTES",idCriacaoComp,idCriacaoComp,ConstraintType.MUST);
				var c6 = DatasetFactory.createConstraint("QTDEUNCOMPONENTES",qtdeUnit,qtdeUnit,ConstraintType.MUST);
				var c7 = DatasetFactory.createConstraint("QTDETOTALCOMPONENTES",qtdeTotal,qtdeTotal,ConstraintType.MUST);
				var c8 = DatasetFactory.createConstraint("LISTACOMPONENTES",listaComp,listaComp,ConstraintType.MUST);
				var c9 = DatasetFactory.createConstraint("INSUMOCOMPONENTES",insumoComp,insumoComp,ConstraintType.MUST);
				var c10 = DatasetFactory.createConstraint("SUBSTITUTOCOMPONENTES",substitutoComp,substitutoComp,ConstraintType.MUST);
				var c11 = DatasetFactory.createConstraint("OSCOMPONENTES",osComp,osComp,ConstraintType.MUST);
				//var c12 = DatasetFactory.createConstraint("IDCOMPONENTES",idCompo,idComp,ConstraintType.MUST);
				
				var constraints = new Array(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11);
				
				dataset = DatasetFactory.getDataset("dsInsertItemComponentesOS",null,constraints,null);
				
			}
			
			// SE PRODUTO 4 FOI INFORMADO
			if(!(idprd4=="" || idprd4==null || idprd4=="null")){
				
				var idPrdComponentes = rep["IDPRD4SALVOS"]
				var produtoComp = rep["PRODUTORM4SALVOS"]
				var codPrdComponentes = rep["CODIGOPRD4SALVOS"]
				var codUndComponentes = rep["UNDPRD4SALVOS"]
				var idCriacaoComp = rep["IDCRIACAOSALVOS"] 
				var insumoComp = rep["DESCRICAOSALVOS"]+" "+rep["MATERIALSALVOS"]+" "+rep["BITOLASALVOS"]
				var listaComp = "L"
				var substitutoComp = rep["CODIGOPRD1SALVOS"]
				var osComp = numOS
				var qtdeUnit = ""
				var qtdeTotal = ""
				
				console.log("idPrdComponentes: "+idPrdComponentes+", produtoComp: "+produtoComp+", codPrdComponentes: "+codPrdComponentes+", codUndComponentes: "+codUndComponentes+", idCriacaoComp: "+
				idCriacaoComp+", insumoComp: "+insumoComp+", listaComp: "+listaComp+", substitutoComp: "+substitutoComp+", osComp: "+osComp+", qtdeUnit: "+qtdeUnit+", qtdeTotal: "+qtdeTotal)
				
				// CONSTRÓI AS CONSTRAINTS PARA REALIZAR O INSERT DO COMPONENTE
				var c1 = DatasetFactory.createConstraint("PRODUTOCOMPONENTES",produtoComp,produtoComp,ConstraintType.MUST);
				var c2 = DatasetFactory.createConstraint("IDPRDCOMPONENTES",idPrdComponentes,idPrdComponentes,ConstraintType.MUST);
				var c3 = DatasetFactory.createConstraint("CODIGOPRDCOMPONENTES",codPrdComponentes,codPrdComponentes,ConstraintType.MUST);
				var c4 = DatasetFactory.createConstraint("CODUNDCOMPONENTES",codUndComponentes,codUndComponentes,ConstraintType.MUST);
				var c5 = DatasetFactory.createConstraint("IDCRIACAOCOMPONENTES",idCriacaoComp,idCriacaoComp,ConstraintType.MUST);
				var c6 = DatasetFactory.createConstraint("QTDEUNCOMPONENTES",qtdeUnit,qtdeUnit,ConstraintType.MUST);
				var c7 = DatasetFactory.createConstraint("QTDETOTALCOMPONENTES",qtdeTotal,qtdeTotal,ConstraintType.MUST);
				var c8 = DatasetFactory.createConstraint("LISTACOMPONENTES",listaComp,listaComp,ConstraintType.MUST);
				var c9 = DatasetFactory.createConstraint("INSUMOCOMPONENTES",insumoComp,insumoComp,ConstraintType.MUST);
				var c10 = DatasetFactory.createConstraint("SUBSTITUTOCOMPONENTES",substitutoComp,substitutoComp,ConstraintType.MUST);
				var c11 = DatasetFactory.createConstraint("OSCOMPONENTES",osComp,osComp,ConstraintType.MUST);
				//var c12 = DatasetFactory.createConstraint("IDCOMPONENTES",idCompo,idComp,ConstraintType.MUST);
				
				var constraints = new Array(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11);
				
				dataset = DatasetFactory.getDataset("dsInsertItemComponentesOS",null,constraints,null);
				
			}
			
			// SE PRODUTO 5 FOI INFORMADO
			if(!(idprd5=="" || idprd5==null || idprd5=="null")){
				
				var idPrdComponentes = rep["IDPRD5SALVOS"]
				var produtoComp = rep["PRODUTORM5SALVOS"]
				var codPrdComponentes = rep["CODIGOPRD5SALVOS"]
				var codUndComponentes = rep["UNDPRD5SALVOS"]
				var idCriacaoComp = rep["IDCRIACAOSALVOS"] 
				var insumoComp = rep["DESCRICAOSALVOS"]+" "+rep["MATERIALSALVOS"]+" "+rep["BITOLASALVOS"]
				var listaComp = "L"
				var substitutoComp = rep["CODIGOPRD1SALVOS"]
				var osComp = numOS
				var qtdeUnit = ""
				var qtdeTotal = ""
				
				console.log("idPrdComponentes: "+idPrdComponentes+", produtoComp: "+produtoComp+", codPrdComponentes: "+codPrdComponentes+", codUndComponentes: "+codUndComponentes+", idCriacaoComp: "+
				idCriacaoComp+", insumoComp: "+insumoComp+", listaComp: "+listaComp+", substitutoComp: "+substitutoComp+", osComp: "+osComp+", qtdeUnit: "+qtdeUnit+", qtdeTotal: "+qtdeTotal)
				
				// CONSTRÓI AS CONSTRAINTS PARA REALIZAR O INSERT DO COMPONENTE
				var c1 = DatasetFactory.createConstraint("PRODUTOCOMPONENTES",produtoComp,produtoComp,ConstraintType.MUST);
				var c2 = DatasetFactory.createConstraint("IDPRDCOMPONENTES",idPrdComponentes,idPrdComponentes,ConstraintType.MUST);
				var c3 = DatasetFactory.createConstraint("CODIGOPRDCOMPONENTES",codPrdComponentes,codPrdComponentes,ConstraintType.MUST);
				var c4 = DatasetFactory.createConstraint("CODUNDCOMPONENTES",codUndComponentes,codUndComponentes,ConstraintType.MUST);
				var c5 = DatasetFactory.createConstraint("IDCRIACAOCOMPONENTES",idCriacaoComp,idCriacaoComp,ConstraintType.MUST);
				var c6 = DatasetFactory.createConstraint("QTDEUNCOMPONENTES",qtdeUnit,qtdeUnit,ConstraintType.MUST);
				var c7 = DatasetFactory.createConstraint("QTDETOTALCOMPONENTES",qtdeTotal,qtdeTotal,ConstraintType.MUST);
				var c8 = DatasetFactory.createConstraint("LISTACOMPONENTES",listaComp,listaComp,ConstraintType.MUST);
				var c9 = DatasetFactory.createConstraint("INSUMOCOMPONENTES",insumoComp,insumoComp,ConstraintType.MUST);
				var c10 = DatasetFactory.createConstraint("SUBSTITUTOCOMPONENTES",substitutoComp,substitutoComp,ConstraintType.MUST);
				var c11 = DatasetFactory.createConstraint("OSCOMPONENTES",osComp,osComp,ConstraintType.MUST);
				//var c12 = DatasetFactory.createConstraint("IDCOMPONENTES",idCompo,idComp,ConstraintType.MUST);
				
				var constraints = new Array(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11);
				
				dataset = DatasetFactory.getDataset("dsInsertItemComponentesOS",null,constraints,null);
				
			}
			
			// SE PRODUTO 6 FOI INFORMADO
			if(!(idprd6=="" || idprd6==null || idprd6=="null")){
				
				var idPrdComponentes = rep["IDPRD6SALVOS"]
				var produtoComp = rep["PRODUTORM6SALVOS"]
				var codPrdComponentes = rep["CODIGOPRD6SALVOS"]
				var codUndComponentes = rep["UNDPRD6SALVOS"]
				var idCriacaoComp = rep["IDCRIACAOSALVOS"] 
				var insumoComp = rep["DESCRICAOSALVOS"]+" "+rep["MATERIALSALVOS"]+" "+rep["BITOLASALVOS"]
				var listaComp = "L"
				var substitutoComp = rep["CODIGOPRD1SALVOS"]
				var osComp = numOS
				var qtdeUnit = ""
				var qtdeTotal = ""
				
				console.log("idPrdComponentes: "+idPrdComponentes+", produtoComp: "+produtoComp+", codPrdComponentes: "+codPrdComponentes+", codUndComponentes: "+codUndComponentes+", idCriacaoComp: "+
				idCriacaoComp+", insumoComp: "+insumoComp+", listaComp: "+listaComp+", substitutoComp: "+substitutoComp+", osComp: "+osComp+", qtdeUnit: "+qtdeUnit+", qtdeTotal: "+qtdeTotal)
				
				// CONSTRÓI AS CONSTRAINTS PARA REALIZAR O INSERT DO COMPONENTE
				var c1 = DatasetFactory.createConstraint("PRODUTOCOMPONENTES",produtoComp,produtoComp,ConstraintType.MUST);
				var c2 = DatasetFactory.createConstraint("IDPRDCOMPONENTES",idPrdComponentes,idPrdComponentes,ConstraintType.MUST);
				var c3 = DatasetFactory.createConstraint("CODIGOPRDCOMPONENTES",codPrdComponentes,codPrdComponentes,ConstraintType.MUST);
				var c4 = DatasetFactory.createConstraint("CODUNDCOMPONENTES",codUndComponentes,codUndComponentes,ConstraintType.MUST);
				var c5 = DatasetFactory.createConstraint("IDCRIACAOCOMPONENTES",idCriacaoComp,idCriacaoComp,ConstraintType.MUST);
				var c6 = DatasetFactory.createConstraint("QTDEUNCOMPONENTES",qtdeUnit,qtdeUnit,ConstraintType.MUST);
				var c7 = DatasetFactory.createConstraint("QTDETOTALCOMPONENTES",qtdeTotal,qtdeTotal,ConstraintType.MUST);
				var c8 = DatasetFactory.createConstraint("LISTACOMPONENTES",listaComp,listaComp,ConstraintType.MUST);
				var c9 = DatasetFactory.createConstraint("INSUMOCOMPONENTES",insumoComp,insumoComp,ConstraintType.MUST);
				var c10 = DatasetFactory.createConstraint("SUBSTITUTOCOMPONENTES",substitutoComp,substitutoComp,ConstraintType.MUST);
				var c11 = DatasetFactory.createConstraint("OSCOMPONENTES",osComp,osComp,ConstraintType.MUST);
				//var c12 = DatasetFactory.createConstraint("IDCOMPONENTES",idCompo,idComp,ConstraintType.MUST);
				
				var constraints = new Array(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11);
				
				dataset = DatasetFactory.getDataset("dsInsertItemComponentesOS",null,constraints,null);
				
			}
			
		}
		
	}

}

// EXPANDE O CONTEÚDO DO DETALHAMENTO DO ITEM
function expandirItemProcesso(e) {
	
	console.log("Vou expandir o item")

	var id = $(e).attr("id").split("___")[1];
    console.log("id: "+id)

    // ESCONDE/MOSTRA OS ÍCONES
    $("#EXPANDIR___" + id).hide();
    $("#REDUZIR___" + id).show();
    
    // EXIBE A ABA DOS ITENS
    //$("#LINHA1___"+id).show()
    $("#LINHA2___"+id).show()
    $("#LINHA3___"+id).show()
    $("#LINHA4___"+id).show()

}

// REDUZ O CONTEÚDO DO DETALHAMENTO DO ITEM
function reduzirItemProcesso(e) {
	
	console.log("Vou reduzir o item")
	
    var id = $(e).attr("id").split("___")[1];
    console.log("id: "+id)
    
    // ESCONDE/MOSTRA OS ÍCONES
    $("#EXPANDIR___" + id).show();
    $("#REDUZIR___" + id).hide();
    
    // EXIBE A ABA DOS ITENS
    //$("#LINHA1___"+id).hide()
    $("#LINHA2___"+id).hide()
    $("#LINHA3___"+id).hide()
    $("#LINHA4___"+id).hide()
    
}



function buscarConsulta(){

	var pesquisa = $("#PESQUISACONSULTA").val()
	var datade = $("#DATA_DE").val()
	if(datade != "" && datade!=null && datade!=undefined && datade!=" "){
		datade = formataDataBanco(datade)
	}
	else{
		datade=""
	}
	var dataate = $("#DATA_ATE").val()
	if(dataate != "" && dataate!=null && dataate!=undefined && dataate!=" "){
		dataate = formataDataBanco(dataate)
	}
	else{
		dataate=""
	}
	var myLoading2 = FLUIGC.loading(window);

	myLoading2.show();

	setTimeout(function(){
		
		$("#CONSULTARA").show()

		var c14 = DatasetFactory.createConstraint("DATADE", datade, datade, ConstraintType.MUST);
		var c15 = DatasetFactory.createConstraint("DATAATE", dataate, dataate, ConstraintType.MUST);

			
		var constraints = new Array(c14,c15);
								
		var dataset = DatasetFactory.getDataset("dsRelatorioRaChapas", null, constraints, null);
				
		var row = dataset.values

		var dados = new Array();

		var cell_array = new Array();

		if(row!=null && row!=undefined && row!=""){

			// limpaTabelaConsulta()

			for (var i=0; i<row.length; i++){

				var rep = row[i];

				dados.push(new Array(
					rep["CODIGOPRD"],
					rep["NOMEFANTASIA"],
					rep["NUMLOTE"],
					rep["NUMEROMOV"],
					rep["RETALHO"],
					rep["NUMPLANOCORTE"],
					' ',
					' ',
					rep["OC"],
					rep["CODCCUSTO"],
					rep["CODTMV"],
					'',
					rep["GEDLINK"]=="ARQUIVO NÃO ENCONTRADO" ? rep["GEDLINK"] : '<a href="'+rep["GEDLINK"]+'" target="_blank">'+rep["NUMPLANOCORTE"]+'</a>'
					));

				if(rep["NUMPLANOCORTE"]=="SEM PLANO"){

					cell_array.push({row:i,col:5,readOnly:false})

				}
				if(rep["OC"]=="NÃO ENCONTRADA"){

					cell_array.push({row:i,col:8,readOnly:false})

				}
				if(rep["NUMLOTE"]=="NÃO PREVISTO"){

					cell_array.push({row:i,col:2,readOnly:false})

				}
				if(rep["GEDLINK"]=="ARQUIVO NÃO ENCONTRADO"){

					cell_array.push({row:i,col:12,readOnly:false})
		
				}

			}
			// 
			// 
			const container = document.querySelector('#TABELARA');

			console.log(dados)

			table = new Handsontable(container, {
				data: dados,
				licenseKey: "non-commercial-and-evaluation",
				colHeaders: ['Produto', 'Material', 'Lote','RA', 'Retalho','Plano','Máquina', 'Endereço', 'OC','OS','Tipo - Mov','Observação','GED'],
				width: '90%',
				height: '40rem',
				rowHeaders: true,
				contextMenu: ['remove_row','row_above','row_below'],
				customBorders: true,
				multiColumnSorting: true,
				manualRowMove: true,
				manualColumnResize: true,
				language: 'pt-BR',
				columns:[{
					readOnly: true,
					
				},{
					readOnly: true,
					
				},{
					readOnly: true,
					
				},{
					readOnly: true,
					 
				},{
					readOnly: false,
					 
				},{
					readOnly: true, 
					
				}
				,{
					type: 'dropdown',
					source: [' ', 'Plasma', 'Oxicorte'],
					readOnly: false,
					 
					 // Máquina
				},{
	
					type: 'dropdown',
					source: [' ','B00', 'B01', 'B02', 'B03', 'B04', 'B05', 'B06', 'B07', 'B08', 'B09', 'B10', 'B11', 'B12', 'B13', 'B14', 'B15', 'B16', 'B17', 'B18', 'B19', 'B20', 'B21', 'B22', 'B23', 'B24', 'B25', 'B26', 'B27'],
					readOnly: false,
					 
				
				},{
					readOnly: true, // OC
					 
				},{
					readOnly: true,
					 
				},{
					readOnly: true,
					
				},{
					readOnly: false,
					
				},{
					readOnly: true,
					renderer: 'html'
				}],
				//className : "customFilterButtonExample1",
				filters: true,
				dropdownMenu: ['filter_by_condition','filter_by_condition2','filter_operators','filter_by_value','filter_action_bar'],
				cell:cell_array,
			});

			var exportPlugin = table.getPlugin('exportFile');

			table.addHook('afterCreateRow',function(index, amount,source){
				
				for(var i=index;i<index+amount;i++){

					for(var j=0;j<dados[0].length;j++){

						cell_array.push({row:i,col:j,readOnly:false});

					}

				}

				table.updateSettings({

					cell:cell_array,

				})
			
			})

			document.getElementById("EXPORTARCON").addEventListener('click', function(){
				exportPlugin.downloadFile('csv', {
				  bom: false,
				  columnDelimiter: ',',
				  columnHeaders: true,
				  exportHiddenColumns: true,
				  exportHiddenRows: true,
				  fileExtension: 'csv',
				  filename: 'RequisicoesChapas[YYYY]-[MM]-[DD]',
				  mimeType: 'text/csv',
				  rowDelimiter: '\r\n',
				  rowHeaders: true
				});
			})

		}
		else{

			Swal.fire({
				icon: 'error',
				title: 'Sem dados encontrados para busca',
				text: 'Verifique o preenchimento do campo e tente novamente'
		  	})
		}

		myLoading2.hide();

	},500)

}


function salvaDados(){
	
	if(table!=null && table!=undefined && table!=""){

		var dados = table.getData();
	
		if(dados!=undefined){
	
			$("#LISTASALVA").find("tbody").find("[id^='CODIGOPRD___']").parents("tr").remove()
	
			for (var i=0; i<dados.length; i++){
	
				var rep = dados[i];
	
				var seq = wdkAddChild("LISTASALVA")
	
				$("#CODIGOPRD___"+seq).val(rep[0])
				$("#NOMEFANTASIA___"+seq).val(rep[1])
				$("#NUMLOTE___"+seq).val(rep[2])
				$("#NUMEROMOV___"+seq).val(rep[3])
				$("#RETALHO___"+seq).val(rep[4])
				$("#PLANO___"+seq).val(rep[5])
				$("#MAQUINA___"+seq).val(rep[6])
				$("#ENDERECO___"+seq).val(rep[7])
				$("#OC___"+seq).val(rep[8])
				$("#OS___"+seq).val(rep[9])
				$("#TIPOMOV___"+seq).val(rep[10])
				$("#OBS___"+seq).val(rep[11])
				$("#GEDLINK___"+seq).val(rep[12])

			}
	
		}
		
	}

}

function retornaEmails(){

	var ret = new Object();

	var dataset = DatasetFactory.getDataset("dsEmailsRM",null,null,null)

	var rows = dataset.values

	for(var i=0;i<rows.length;i++){

		ret[rows[i]["EMAIL"]]=null;

	}


	console.log(ret)

	return ret;


}

function carregaTabela(){

	if($("#LISTASALVA").find("tbody").find("[id^='CODIGOPRD___']").length > 0){

		var dados = retornaDados();

		const container = document.querySelector('#TABELARA');

		console.log(dados)

		table = new Handsontable(container, {
			data: dados.dados,
			licenseKey: "non-commercial-and-evaluation",
			colHeaders: ['Produto', 'Material', 'Lote','RA', 'Retalho','Plano','Máquina', 'Endereço', 'OC','OS','Tipo - Mov','Observação','GED'],
			width: '90%',
			height: '40rem',
			rowHeaders: true,
			contextMenu: ['remove_row','row_above','row_below'],
			customBorders: true,
			multiColumnSorting: $("#FORMVIEW").val() == 1 ? false : true,
			manualRowMove: $("#FORMVIEW").val() == 1 ? false : true,
			manualColumnResize: true,
			language: 'pt-BR',
			columns:[{
				readOnly: true,
				
			},{
				readOnly: true,
				
			},{
				readOnly: true,
				
			},{
				readOnly: true,
				 
			},{
				readOnly: $("#FORMVIEW").val() == 1 ? true : false,
				 
			},{
				readOnly: true,
				 
			},{
				type: 'dropdown',
				source: [' ', 'Plasma', 'Oxicorte'],
				readOnly: $("#FORMVIEW").val() == 1 ? true : false,
				 
				 // Máquina
			},{

				type: 'dropdown',
				source: [' ','B00', 'B01', 'B02', 'B03', 'B04', 'B05', 'B06', 'B07', 'B08', 'B09', 'B10', 'B11', 'B12', 'B13', 'B14', 'B15', 'B16', 'B17', 'B18', 'B19', 'B20', 'B21', 'B22', 'B23', 'B24', 'B25', 'B26', 'B27'],
				readOnly: $("#FORMVIEW").val() == 1 ? true : false,
				 
			
			},{
				readOnly: true , // OC
				 
			},{
				readOnly: true,
				 
			},{
				readOnly: true,
				
			},{
				readOnly: false,
				
			}
			,{
				readOnly: true,
				renderer: 'html'
			}],
			//className : "customFilterButtonExample1",
			filters: true,
			dropdownMenu: ['filter_by_condition','filter_by_condition2','filter_operators','filter_by_value','filter_action_bar'],
			cell:dados.cell_array,
		});

		table.addHook('afterCreateRow',function(index, amount,source){
				
			for(var i=index;i<index+amount;i++){

				for(var j=0;j<dados[0].length;j++){

					dados.cell_array.push({row:i,col:j,readOnly:false});

				}

			}

			table.updateSettings({

				cell:dados.cell_array,

			})
		
		})


		var exportPlugin = table.getPlugin('exportFile');

		document.getElementById("EXPORTARCON").addEventListener('click', function(){
			exportPlugin.downloadFile('csv', {
			  bom: false,
			  columnDelimiter: ',',
			  columnHeaders: true,
			  exportHiddenColumns: true,
			  exportHiddenRows: true,
			  fileExtension: 'csv',
			  filename: 'RequisicoesChapas[YYYY]-[MM]-[DD]',
			  mimeType: 'text/csv',
			  rowDelimiter: '\r\n',
			  rowHeaders: true
			});
		})

	}



}

function retornaDados(){

	var dados = new Array();

	var i=0;

	var cell_array = new Array();

	$("#LISTASALVA").find("tbody").find("[id^='CODIGOPRD___']").each(function(){

		var linha = new Array();

		var seq = $(this).attr("id").split("___")[1]

		linha.push(
		$("#CODIGOPRD___"+seq).val(),
		$("#NOMEFANTASIA___"+seq).val(),
		$("#NUMLOTE___"+seq).val(),
		$("#NUMEROMOV___"+seq).val(),
		$("#RETALHO___"+seq).val(),
		$("#PLANO___"+seq).val(),
		$("#MAQUINA___"+seq).val(),
		$("#ENDERECO___"+seq).val(),
		$("#OC___"+seq).val(),
		$("#OS___"+seq).val(),
		$("#TIPOMOV___"+seq).val(),
		$("#OBS___"+seq).val(),
		$("#GEDLINK___"+seq).val()
		)

		if($("#PLANO___"+seq).val()=="SEM PLANO"){

			cell_array.push({row:i,col:5,readOnly:false})

		}
		if($("#OC___"+seq).val()=="NÃO ENCONTRADA"){

			cell_array.push({row:i,col:8,readOnly:false})

		}
		if($("#NUMLOTE___"+seq).val()=="NÃO PREVISTO"){

			cell_array.push({row:i,col:2,readOnly:false})

		}
		if($("#GEDLINK___"+seq).val()=="ARQUIVO NÃO ENCONTRADO"){

			cell_array.push({row:i,col:12,readOnly:false})

		}


		dados.push(linha)

		i++;

	})

	return {dados:dados,cell_array:cell_array};


}

document.getElementById("PESQUISACONSULTA").addEventListener("keydown", function(event) {

	if (event.key === "Enter") {
		// Cancel the default action, if needed
		event.preventDefault();
		// Trigger the button element with a click
		buscarConsulta()
	}

});

// BUSCA O CODIGO DA TAREFA DO PAI
function buscaCodTarefaPai(nivel){
	
	console.log("Vou buscar o código da tarefa do Pai")
	
	var numOS = $("#NUM_OS").val()
	var codigoTarefaDesc = ""
	var nomeTrfItem = ""
	var idTrfItem = ""
	var codTrfItem = ""
	var retorno = new Array()
		
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	var c2 = DatasetFactory.createConstraint("INDICE",nivel,nivel,ConstraintType.MUST)

	var constraints = new Array(c1,c2)
	var dataset = DatasetFactory.getDataset("dsBuscaCodTarefaPaiOS",null,constraints,null)
	var row = dataset.values
	console.log("row "+row)
	
	// SE RETORNO DA CONSULTA NÃO É VAZIO
	if(!(row==null || row=="" || row==undefined || row=="null")){
	
		var rep = row[0]
		
		console.log(rep)
		
		if(!(rep["CODIGOTAREFADESC"]==null || rep["CODIGOTAREFADESC"]==undefined || rep["CODIGOTAREFADESC"]=="" || rep["CODIGOTAREFADESC"]=="null")){
			
			codigoTarefaDesc = rep["CODIGOTAREFADESC"]
			
		}
		
		if(!(rep["NOMETRFITEM"]==null || rep["NOMETRFITEM"]==undefined || rep["NOMETRFITEM"]=="" || rep["NOMETRFITEM"]=="null")){
			
			nomeTrfItem = rep["NOMETRFITEM"]
			
		}
		
		if(!(rep["IDTRFITEM"]==null || rep["IDTRFITEM"]==undefined || rep["IDTRFITEM"]=="" || rep["IDTRFITEM"]=="null")){
			
			idTrfItem = rep["IDTRFITEM"]
			
		}
		
		if(!(rep["CODTRFITEM"]==null || rep["CODTRFITEM"]==undefined || rep["CODTRFITEM"]=="" || rep["CODTRFITEM"]=="null")){
			
			codTrfItem = rep["CODTRFITEM"]
			
		}
		
	} 
	
	retorno.push(TAREFA={CODIGOTAREFADESC:codigoTarefaDesc,NOMETRFITEM:nomeTrfItem, IDTRFITEM:idTrfItem,CODTRFITEM:codTrfItem})
	
	console.log("retorno")
	console.log(retorno)
	
	return retorno
	
}

// ÍNDICE JÁ FOI INCLUÍDO NA ESTRUTURA
function temIndice(indice){
	
	// VARIÁVEL PARA CONTROLE
	var temIndice = false
	
	// PERCORRE A TABELA E COLETA TODOS OS ÍNDICES
	$('input[id^="NIVEL___"]').each(function(index, value){
		
		// VARIÁVEL PARA O ÍNDICE DA TABELA
		var seq = $(this).attr("id").split("___")[1]
		
		var posicao = $("#POSICAOCOMPLETA___"+seq).val()
		
		// SE ÍNDICE É IGUAL A POSIÇÃO
		if(indice == posicao){
			
			temIndice = true
			
		}
		
	})
	
	// RETORNA SE ÍNDICE JÁ EXISTE NA TABELA
	return temIndice
	
}

// LIMPA OS CAMPOS DO FORMULÁRIO DA ABA POSIÇÕES E MANTÉM ALGUNS DADOS DA ABA DESENHO
function limparFormPosicao() {
	
	//console.log("Entrei para limpar formulário")
	
	// LIMPA OS CAMPOS DO FORMULÁRIO
	//$("#F_TITULOITEM").val("")
	//$("#F_OS").val("")
	//$("#F_DATAREVISAO").val("")
	//$("#F_OBSERVACOESDESENHO").val("")
	//$("#F_NUMDBI").val("")
	//$("#F_REVISAODBI").val("")
	//$("#F_NUMDESENHO").val("")
	//$("#F_REVISAODESENHO").val("")
	//$("#F_DESQTDE").val("")
	//$("#F_TOTALQTDE").val("")
	//$("#F_POSICAOCOMPLETA").val("")
	//$("#F_QUANTIDADEMATERIAL").val("")
	//$("#F_OBSERVACOESDESENHO").val("")
	//$("#F_MATERIAL_ZOOM>option").remove();
	//$("#F_NOVOMATERIAL").val("")
	//$("#F_IDMATERIAL").val("")
	//$("#F_CODIGOPRD").val("")
	//$("#F_CATEGORIA").val("")
	$("#F_PESOBRUTO").val("")
	$("#F_PESOLIQUIDO").val("")
	$("#F_AREAPINTURA").val("")
	$("#F_PERIMETROCORTE").val("")
	$("#F_OBSPROCESSO").val("")
	$("#F_OBSGERAL").val("")
	$("#F_NIVEL").val("")
	$("#F_POSICAOINDICE").val("")
	$("#F_INDICEANTIGO").val("")
	$("#F_POSICAODESENHO").val("")
	$("#F_DESCRICAO").val("")
	$("#F_BITOLA").val("")
	$("#F_UNDMEDIDA").val("")
	$("#F_ESPESSURA").val("")
	$("#F_LARGURA").val("")
	$("#F_MASSALINEAR").val("")
	$("#F_DIAMETROEXTERNO").val("")
	$("#F_DIAMETROINTERNO").val("")
	$("#F_ESPROSCA").val("")
	$("#F_COMPRIMENTO").val("")
	$("#F_MATERIAL").val("")
	$("#F_PRODUTO_RM").val("")
	$("#F_IDPRD").val("")
	$("#F_CODIGOPRD").val("")
	$("#F_IDCRIACAO").val("")
	$("#VALOR_RADIO1").val("")
	$("#VALOR_RADIO2").val("")
	$("#F_SEQ").val("")
	$("#F_AREASECAO").val("")
	$("#F_ALTURA").val("")
	$("#F_LARGURAABA").val("")
	$("#F_ESPALMA").val("")
	$("#F_ESPABA").val("")
	$("#F_OP").val("")
	
	//$("#F_CODIGOTAREFA>option").remove()
	$("#F_CODIGOTAREFA").val("")
	$("#F_CODTRFITEM").val("")
	$("#F_IDTRFITEM").val("")
	$("#F_NOMETRFITEM").val("")
	
	//$("#CHECK_MATERIAL").prop("checked",false)
	
	// TIRA A SELEÇÃO DO CAMPO RADIO 1
	$("#RAD2_ACABADO").prop("checked",false)
	$("#RAD2_SEMI").prop("checked",false)
	$("#RAD2_NAOMANUF").prop("disabled",false)
	//$("#RAD_MP").prop("checked",false)
	$("#RAD2_ACABADO").prop("checked",false)
	$("#RAD2_SEMI").prop("checked",false)
	$("#RAD2_NAOMANUF").prop("disabled",false)
	//$("#RAD2_MP").prop("checked",false)
	
}

// LIMPA OS CAMPOS DO FORMULÁRIO
function limparForm() {
	
	
}

// EXIBE ALERTA DE ITENS DA ESTRUTURA QUE ESTÃO SENDO DETALHADOS
function exibeAlertaDetalhado(){

	// EXIBE ALERTA
	Swal.fire({
		  icon: 'error',
		  title: 'Não é possível enviar para aprovação pois existem itens sendo detalhados em outras solicitações!',
		  text: 'Finalize as solicitações abertas para o cadastro dos subconjuntos e tente novamente.'
	})

}

// EXIBE ALERTA DE ITENS QUE TEM FILHOS E QUE SÃO MANUFATURADOS
function temNaoManufComFilhos(){

	var str = ""
	
	var numOS = $("#NUM_OS").val()
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
	var constraints = new Array(c1);
	
	var dataset = DatasetFactory.getDataset("dsNaoManufTemFilhosOS",null,constraints,null);
	var row = dataset.values
	
	// SE RETORNO NÃO É NULO OU VAZIO	
	if(!(row=="" || row==null || row==undefined || row=="null")){
		
		// PERCORRE TODOS OS ITENS DO RETORNO
		for(var i=0; i<row.length; i++){
			
			var rep = row[i]
			
			// SE ITEM NÃO MANUFATURADO TEM FILHO
			if(!(rep["FILHO"]=="" || rep["FILHO"]==null || rep["FILHO"]=="null" || rep["FILHO"]==undefined)){
				
				str = str +" "+rep["INDICE"]+";"
				
			}
			
		}
		
		// SE STRING FOI PREENCHIDO 
		if(str==""){
			
			return false
			
		} else {
			// SE NÃO
			
			// EXIBE ALERTA
			Swal.fire({
				  icon:  'error',
				  title: 'Foram identificados alguns itens "Não Manufaturado" que possuem filhos cadastrados',
				  text: 'Para prosseguir com a aprovação verifique os itens: '+str
			})
			
			return true
			
		}
		
	} else {
		// SE NÃO
		
		return false
		
	}
	
}

// VERIFICA SE ITEM É NÃO MANUFATURADO
function itemNaoManufaturado(indice){
	
	var numOS = $("#NUM_OS").val()
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("INDICE",indice,indice,ConstraintType.MUST);
	var constraints = new Array(c1,c2);
	
	var dataset = DatasetFactory.getDataset("dsItemNaoManufaturadoOS",null,constraints,null);
	
	// QUANTIDADE DE REGISTROS DA CONSULTA
	var row = dataset.values;
	
	// SE RETORNO É VAZIO OU NULO
	if(row=="" || row==null || row==undefined || row=="null"){
		
		return false
		
	} else {
		// SE NÃO
		
		return true
		
	}
	
}

// SE TEM ALGUM ITEM QUE ESTÁ SENDO DETALHADO
function temItemDetalhado(){
	
	var numOS = $("#NUM_OS").val()
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
	var constraints = new Array(c1);
	
	dataset = DatasetFactory.getDataset("dsTemFilhoDetalhadoOS",null,constraints,null);
	
	// QUANTIDADE DE REGISTROS DA CONSULTA
	var row = dataset.values;
	
	console.log("row:")
	console.log(row)
	
	// SE RETORNO NÃO É NULO E NEM VAZIO
	if(!(row=="" || row==null || row==undefined || row=="null")){
		
		console.log("tem filho que está sendo detalhado")
		
		return true
		
	} else {
		// SE NÃO
		
		console.log("não tem filho que está sendo detalhado")
		
		return false
		
	}
	
}

// OPERAÇÃO PARA ATUALIZAR OS DADOS
function atualizarNivel(idCriacao) {
	
	//console.log("Entrei para atualizar a estrutura")
	
	var numOS = $("#NUM_OS").val()
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST);
	var constraints = new Array(c1,c2);
	
	//dataset = DatasetFactory.getDataset("dsBuscaEstruturaIntegrada",null,constraints,null);
	var dataset = DatasetFactory.getDataset("dsBuscaEstruturaSubconjOS",null,constraints,null);
	
	// QUANTIDADE DE REGISTROS DA CONSULTA
	var row = dataset.values;
	console.log("row "+row)
	console.log(row)
	
	var count = dataset.values.length
	
	// SE RETORNO NÃO É NULO E NEM VAZIO
	if(!(row=="" || row==null || row==undefined || row=="null")){
		
		var count = dataset.values.length;
		
		console.log("Valor de count "+count);
		
		var atv = $("#ATIVIDADE").val()
		
		// LIMPA O CONTEÚDO DO FORMULÁRIO 
		limparFormPosicao()
			
		// CRIA E RETORNA UM ARRAY COM AS POSIÇÕES PARA A ESTRUTURA
		/*var indices = arrayIndices(row,count)
		
		var indicesOrdenados = montarEstrutura(indices)
		
		console.log("INDICES ORDENADOS")
		console.log(indicesOrdenados)
		
		// CRIA E RETORNA UM ARRAY COM O SUMÁRIO PARA O CROQUI
		var sumario = criarSumario(indicesOrdenados,row)
		
		var arrayIdCriacao = criaArrayIdCriacao(indicesOrdenados,row)
		console.log("IDCRIACAO ORDENADOS")
		console.log(arrayIdCriacao)
		
		// CRIA OS NÍVEIS DE ACORDO COM A ORDEM DOS ÍNDICES
		var niveis = criarNiveis(indicesOrdenados,row)
		
		// CRIA OS EXPANSORES DE ACORDO COM A ORDEM DOS ÍNDICES
		var expansores = criarExpansores(indicesOrdenados,row)
		
		console.log("Expansores ordenados")
		console.log(expansores)*/

		var indicesPend = IndicesPendentes("",row)
		
		// SE TEM ALGUM ITEM QUE ESTÁ SENDO DETALHADO
		if(temItemDetalhado()){
			
			console.log("vou montar o croqui sem operações")
			
			montarCroquiSemOperacoes(row,indicesPend)
			
			// MONTA O CROQUI COM OS DADOS INSERIDOS NA TABELA SEM OFERECER A OPÇÃO DE ALTERAÇÕES
			//montarCroquiSemOperacoesNivel(sumario,arrayIdCriacao,indicesOrdenados,niveis,idCriacao,indicesPend)
			
			// ESCONDE OS BOTÕES
			$(".BOTOES_CAB").hide()
			$("#DIV_FINALIZAREDICAO").hide()
			
		} 
		
		$("#TEXTOVIEW").show()
		
		//$(".CONFIRMARAFETADOS").hide()
		
		// PERCORRE TODOS OS ITENS DO CROQUI(VIEW) E IMPLEMENTA OS EXPANSORES
		//implementaExpansores(expansores, indicesOrdenados, arrayIdCriacao)
		implementaExpansores(row)

		// FAZ A ALTERAÇÃO DO CÁLCULO DA QUANTIDADE TOTAL
		//alteraDesQtdeGeral()
		
		// SE ATV FOR DE APROVAÇÃO
		if(atv==14 || atv==4 || atv==11 || atv==25){
			
			$(".os").prop("onclick", null);
			
		}
			
	} else {
		// SE NÃO TEM
		
		// REMOVE A DIV DO CROQUI PARA ATUALIZAR
		$('.divCroqui').remove()
		
		//$("#TEXTOVIEW").hide()
		
		var os = $("#OS_INFO").val()
		var codTarefa = $("#CODIGOTAREFA").val()
		
		// CRIA UMA NOVA DIV PARA O CROQUI
		$('.beforeCroqui').after('<div class="form-group col-md-12 divCroqui croqui espaco"></div>')
		
		// SE O CÓDIGO DA TAREFA NÃO FOI INCLUÍDO
		if(codTarefa==null || codTarefa==undefined || codTarefa==""){
			
			$('.croqui').append('<span class="os" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="mudarOS()"><strong>OS '+os+'</strong></span>&nbsp;</span><br><br><a id="INCLUIRPAI_LINK" href="#abrirModalIndice"><span class="click" onclick="incluirPai();" title="Incluir primeiro item" id="INCLUIRPAI_ITEM" name="INCLUIRPAI_ITEM"><i onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" class="fluigicon fluigicon-plus-sign icon-md"></i></span></a>')
			
		} else {
			
			$('.croqui').append('<span class="os" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="mudarOS()"><strong>OS '+os+'</strong></span>&nbsp;</span><br><br><a id="INCLUIRPAI_LINK" href="#abrirModalIndice"><span class="click" onclick="incluirPai();" title="Incluir primeiro item" id="INCLUIRPAI_ITEM" name="INCLUIRPAI_ITEM"><i onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" class="fluigicon fluigicon-plus-sign icon-md"></i></span></a>')
		}

	}
			
	// $(".REDUZIRTODOS").show()
	// $(".EXPANDIRTODOS").hide()
	
}

// EXPORTAR A ESTRUTURA PARA A PLANILHA EXCEL
function exportarEstrutura() {
	
	console.log("Entrei para exportar a estrutura para o Excel")
		
	var numOS = $("#NUM_OS").val()
	var execucao = $("#EXECUCAO_INFO").val()
	var codTrfEx = $("#CODTRFEX").val()
	var row
	
	console.log("numOS: "+numOS+", execucao: "+execucao+", codTrfEx: "+codTrfEx)
	
	 var myLoading2 = FLUIGC.loading(window);
		
	 myLoading2.show();
		
	 setTimeout(function(){
	
		// SE A EXECUÇÃO FOI INFORMADA
			if( ! (execucao=="" || execucao==null || execucao==undefined) ){
				
				console.log("execução foi informada")
				
				// SE O CÓDIGO DA TAREFA FOI INFORMADO
				if( ! (codTrfEx=="" || codTrfEx==null || codTrfEx==undefined) ){
				
					console.log("codTrfEx foi informado")
					
					// CONSULTA BANCO
					var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
					var c2 = DatasetFactory.createConstraint("EXECUCAO",execucao,execucao,ConstraintType.MUST);
					var c3 = DatasetFactory.createConstraint("CODTRFEX",codTrfEx,codTrfEx,ConstraintType.MUST);

					var constraints = new Array(c1,c2,c3);
					
					var dataset = DatasetFactory.getDataset("dsConsultaEstruturaExecucao",null,constraints,null);
					
					row = dataset.values;
					
				} else {
					// SE NÃO
					
					// CONSULTA BANCO
					var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
					var c2 = DatasetFactory.createConstraint("EXECUCAO",execucao,execucao,ConstraintType.MUST);

					var constraints = new Array(c1,c2);
					
					var dataset = DatasetFactory.getDataset("dsConsultaEstruturaExecucao",null,constraints,null);
					
					row = dataset.values;
					
				}
				
			} else {
				// SE NÃO
				
				// CONSULTA BANCO
				var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
				var constraints = new Array(c1);
				
				var dataset = DatasetFactory.getDataset("dsConsultaEstruturaPrincipal",null,constraints,null);
				
				row = dataset.values;
				
			}
			
			/*
			// CONSULTA BANCO
			var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
			var constraints = new Array(c1);
			
			//dataset = DatasetFactory.getDataset("dsBuscaEstruturaIntegrada",null,constraints,null);
			var dataset = DatasetFactory.getDataset("dsBuscaEstrutura",null,constraints,null);
			
			// QUANTIDADE DE REGISTROS DA CONSULTA
			var row = dataset.values;
			console.log("row "+row)
			console.log(row)*/
			
			var count = row.length
			
			// SE RETORNO NÃO É NULO E NEM VAZIO
			if(!(row=="" || row==null || row==undefined || row=="null")){
				
				var count = dataset.values.length;
				
				console.log("Valor de count "+count);
				
				var atv = $("#ATIVIDADE").val()
				
				// CRIA E RETORNA UM ARRAY COM AS POSIÇÕES PARA A ESTRUTURA
				var indices = arrayIndices(row,count)
				
				var indicesOrdenados = montarEstrutura(indices)
				
				console.log("INDICES ORDENADOS")
				console.log(indicesOrdenados)
				
				// CRIA E RETORNA UM ARRAY COM O SUMÁRIO PARA O CROQUI
				var sumario = criarSumarioExcel(indicesOrdenados,row)

				var arrayIdCriacao = criaArrayIdCriacao(indicesOrdenados,row)
				console.log("IDCRIACAO ORDENADOS")
				console.log(arrayIdCriacao)
				
				// CRIA OS NÍVEIS DE ACORDO COM A ORDEM DOS ÍNDICES
				var niveis = criarNiveis(indicesOrdenados,row)
				
				// CRIA OS EXPANSORES DE ACORDO COM A ORDEM DOS ÍNDICES
				var expansores = criarExpansores(indicesOrdenados,row)
				
				console.log("Expansores ordenados")
				console.log(expansores)
				console.log("sumario")
				console.log(sumario)
				
				// MONTA O CROQUI COM OS DADOS INSERIDOS NA TABELA SEM OFERECER A OPÇÃO DE ALTERAÇÕES
				var strExcel = montarCroquiExportar(sumario,arrayIdCriacao,indicesOrdenados,niveis)
				
				console.log("strExcel: ")
				console.log(strExcel)
				
				//window.open('data:application/vnd.ms-excel,' + strExcel);
				window.open('data:application/vnd.ms-excel,' + '\uFEFF' + encodeURIComponent(strExcel));
				
				setTimeout(function(){
					
					window.open('data:application/msword,' + '\uFEFF' + encodeURIComponent(strExcel));
					
				},500)
				
			} 
			
			/*html = $(".divCroqui").html()
		    
		    console.log("html: "+html)

		    //html = html.outerHTML;
			
			//console.log("html outer: "+html)
			
		    window.open('data:application/msword,' + '\uFEFF' + encodeURIComponent(html));
		    
		    var html, link, blob, url, css;

		    css = (
		     '<style>' +
		     '@page WordSection1{size: 841.95pt 595.35pt;mso-page-orientation: landscape;}' +
		     'div.WordSection1 {page: WordSection1;}' +
		     '</style>'
		    )

		    //html = element.innerHTML
		    
		  
		    
		    blob = new Blob(['\ufeff', css + html], {
		    	
		      type: 'application/msword'
		    
		    })
		    
		    url = URL.createObjectURL(blob)
		    link = document.createElement('A')
		    link.href = url
		    link.download = 'Document'  // default name without extension 
		    
		    document.body.appendChild(link)
		    
		    if (navigator.msSaveOrOpenBlob ) navigator.msSaveOrOpenBlob( blob, 'Document.doc'); // IE10-11
		       else link.click();  // other browsers
		    
		    document.body.removeChild(link);*/
		 
	 },500)
	
	 // DESATIVA O LOAD
	 setTimeout(function(){
			
		myLoading2.hide();
			
	 }, 500)

}

// EXIBE UMA LISTA DE OP'S
function exibirOPS(){
	
	console.log("exibir a lista de OP's")
	
	var idprd = $("#F_IDPRD").val()
	var numOS = $("#NUM_OS").val()

	console.log("numOS: "+numOS+", idprd: "+idprd)
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("IDPRD",idprd,idprd,ConstraintType.MUST);

	var constraints = new Array(c1,c2);
	
	var dataset = DatasetFactory.getDataset("dsEXItemTemOP",null,constraints,null);
	
	var row = dataset.values;
	
	// SE RETORNO NÃO VAZIO
	if(!(row=="" || row==null || row==undefined)){
		
		var execucaoAtual = ""
		
		// PERCORRE TODOS OS REGISTROS
		for(var i=0; i<row.length; i++){
			
			if(row[i]["NUMEXEC"]==execucaoAtual){
				
				$("#NUMOPLISTAOPS___"+seq).val($("#NUMOPLISTAOPS___"+seq).val()+" , "+row[i]["CODORDEM"])
				
			} else {
				
				var seq = addListaOPS()
				
				$("#NUMOPLISTAOPS___"+seq).val(row[i]["CODORDEM"])
				$("#EXECUCAOLISTAOPS___"+seq).val(row[i]["NUMEXEC"])
					
			}
			
			execucaoAtual = row[i]["NUMEXEC"]
			
		}
		
	}
	
}

// LIMPAR AS OP'S
function limparOPS(){
	
	console.log("limpar a tabela da lista das OP's")
	
	// PERCORRE TODOS OS REGISTROS DA TABELA DE LISTA DE OP'S
	$("textarea[id^='NUMOPLISTAOPS___']").each(function(){
	
		$(this).parents("tr").remove()
		
	})
	
}

// OPERAÇÃO PARA ATUALIZAR OS DADOS
function atualizar() {
	
	console.log("Entrei para atualizar a estrutura")
	
	var numOS = $("#NUM_OS").val()
	var execucao = $("#EXECUCAO_INFO").val()
	var codTrfEx = $("#CODTRFEX").val()
	var row
	var falhaInd
	
	console.log("numOS: "+numOS+", execucao: "+execucao+", codTrfEx: "+codTrfEx)

		
	console.log("codTrfEx foi informado")
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("EXECUCAO",execucao,execucao,ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("CODTRFEX",codTrfEx,codTrfEx,ConstraintType.MUST);

	var constraints = new Array(c1,c2,c3);
	
	var dataset = DatasetFactory.getDataset("dsConsultaEstruturaExecucao",null,constraints,null);
	
	row = dataset.values;
	
	// TEM FALHA NA INDEXAÇÃO
	falhaInd = temFalhaIndexacao(numOS,execucao,codTrfEx)
	
	console.log("row "+row)
	console.log(row)
	
	// SE TEM FALHA NA INDEXAÇÃO
	if(falhaInd){
		
		// ESCONDE OS CAMPOS
		$(".CONFIRMAR_OS").hide()
		$(".CONFIRMAR_LISTA").hide()
		$(".VOLTAR_OS").hide()
		
		// LIMPA TODOS OS CAMPOS
		/*$("#OS_INFO>option").remove()
		$("#NUM_OS").val("")
		$("#DESCRICAO_OS_INFO").val("")
		$("#IDPRJ_OS").val("")
		$("#NUM_OS_ANTIGA").val("")
		$("#CODCOLIGADA").val("")
		$("#CODFILIAL").val("")
		$("#CODTRFPAI>option").remove()
		$("#CODTRFEX").val("")
		$("#INDICEPAI").val("")
		$("#EXECUCOES_OS>option").remove()
		$("#EXECUCAO_INFO").val("")*/
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'warning',
			  title: 'A Estrutura não pode ser carregada pois existe falha na indexação da estrutura',
			  text: 'Feche a solicitação e comunique a equipe de TI'
		})
		
	} else {
		// SE NÃO
		
		// SE RETORNO NÃO É NULO E NEM VAZIO
		if(!(row=="" || row==null || row==undefined || row=="null")){
			
			var count = dataset.values.length;
			
			console.log("Valor de count "+count);
			
			var atv = $("#ATIVIDADE").val()
			
			// CRIA E RETORNA UM ARRAY COM AS POSIÇÕES PARA A ESTRUTURA
			/*var indices = arrayIndices(row,count)
			
			var indicesOrdenados = montarEstrutura(indices)
			
			console.log("INDICES ORDENADOS")
			console.log(indicesOrdenados)
			
			// CRIA E RETORNA UM ARRAY COM O SUMÁRIO PARA O CROQUI
			var sumario = criarSumario(indicesOrdenados,row)

			var arrayIdCriacao = criaArrayIdCriacao(indicesOrdenados,row)
			console.log("IDCRIACAO ORDENADOS")
			console.log(arrayIdCriacao)
			
			// CRIA OS NÍVEIS DE ACORDO COM A ORDEM DOS ÍNDICES
			var niveis = criarNiveis(indicesOrdenados,row)
			
			// CRIA OS EXPANSORES DE ACORDO COM A ORDEM DOS ÍNDICES
			var expansores = criarExpansores(indicesOrdenados,row)
			
			console.log("Expansores ordenados")
			console.log(expansores)*/

			var indicesPend = IndicesPendentes("",row)
				
			// MONTA O CROQUI COM OS DADOS INSERIDOS NA TABELA SEM OFERECER A OPÇÃO DE ALTERAÇÕES
			//montarCroquiSemOperacoes(sumario,arrayIdCriacao,indicesOrdenados,niveis,numOS,execucao,codTrfEx,indicesPend)
			montarCroquiSemOperacoes(row,indicesPend)
			
			$("#TEXTOVIEW").show()
			$(".INFO_OS").hide()
			
			// PERCORRE TODOS OS ITENS DO CROQUI(VIEW) E IMPLEMENTA OS EXPANSORES
			//implementaExpansores(expansores, indicesOrdenados, arrayIdCriacao)
			implementaExpansores(row)
		
		} 
		
	}
	
	// $(".REDUZIRTODOS").show()
	// $(".EXPANDIRTODOS").hide()
			
}

// TEM FALHA NA INDEXAÇÃO DOS ITENS DA ESTRUTURA
function temFalhaIndexacao(numOS,execucao,codTrfEx){
	
	console.log("verifica se tem falha na indexação dos itens da estrutura da OS "+numOS)
	
	console.log("execucao: "+execucao+", codTrfEx: "+codTrfEx)
	
	var row
	
	// SE É ESTRUTURA PRINCIPAL
	if(!(numOS=="") && execucao=="" && codTrfEx==""){
		
		console.log("consulta apenas da principal")
		
		// CONSULTA BANCO
		var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
		var constraints = new Array(a1);
		
		var dataset = DatasetFactory.getDataset("dsVerificaFalhaIndexacao",null,constraints,null);
		row = dataset.values;
		
	}
	
	// SE É UMA DETERMINADA EXECUÇÃO
	if(!(numOS=="") && !(execucao=="") && codTrfEx==""){
		
		console.log("consulta de uma determinada execução")

		// CONSULTA BANCO
		var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
		var a2 = DatasetFactory.createConstraint("EXECUCAO",execucao,execucao,ConstraintType.MUST);
		var constraints = new Array(a1,a2);
		
		var dataset = DatasetFactory.getDataset("dsEXVerificaFalhaIndexacao",null,constraints,null);
		row = dataset.values;
		
	}
	
	// SE É UMA DETERMINADA EXECUÇÃO E UM PAI ESPECÍFICO
	if(!(numOS=="") && !(execucao=="") && !(codTrfEx=="")){
		
		console.log("consulta de uma determinada execução e pai")
		
		// CONSULTA BANCO
		var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
		var a2 = DatasetFactory.createConstraint("EXECUCAO",execucao,execucao,ConstraintType.MUST);
		var a3 = DatasetFactory.createConstraint("CODTRFEX",codTrfEx,codTrfEx,ConstraintType.MUST);
		var constraints = new Array(a1,a2,a3);
		
		var dataset = DatasetFactory.getDataset("dsEXVerificaFalhaIndexacao",null,constraints,null);
		row = dataset.values;
		
	}
	
	console.log("row "+row)
	console.log(row)
	
	// SE RETORNO NÃO É NULO OU VAZIO
	if(!(row=="" || row==null || row==undefined)){
		
		console.log("tem falha")
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'warning',
			  title: 'A Estrutura não pode ser carregada pois existe falha na indexação da estrutura.',
			  text: 'Feche essa solicitação e comunique a equipe de TI'
		})
		
		return true
		
	} else {
		
		console.log("não tem falha")
		
		return false
		
	}
	
}

// SALVA O NÚMERO REFERENTE A ORDEM DOS ÍNDICES ORDENADOS
function salvaOrdem(indicesOrdenados){
	
	// PERCORRE O ARRAY DOS ÍNDICES ORDENADOS
	for(var i=0; i<indicesOrdenados.length;i++){
		
		// PERCORRE A TABELA E COLETA TODOS AS POSICOES
		$('input[id^="ORDEM___"]').each(function(index, value){
			
			// VARIÁVEL PARA O ÍNDICE DA TABELA
			var seq = $(this).attr("id").split("___")[1]
			
			var indice = $("#INDICE___"+seq).val()
			
			// SE O ÍNDICE DA TABELA É IGUAL AO INDICE DO ARRAY
			if(indice==indicesOrdenados[i]){
				
				// SALVA O ÍNDICE NO CAMPO ORDEM
				$("#ORDEM___"+seq).val(i)
				
			}
			
		})
		
	}
	
}

// PERCORRE O ARRAY ORDENADO E CRIA UM ARRAY COM OS IDCRIACAO RESPECTIVOS DOS ITENS ORDENADOS
function criaArrayIdCriacao(indicesOrdenados,row){
	
	var count = row.length
	
	// ARRAY PARA GUARDAR AS POSIÇÕES
	var arrayIdCriacao = new Array()
	
	// PERCORRE O ARRAY DOS ÍNDICES ORDENADOS
	for(var t=0; t < indicesOrdenados.length; t++){
		
		// PERCORRE O ARRAY DOS ITENS DA ESTRUTURA
		for(var p=0; p < count; p++){
			
			var rep = row[p]
			
			var idCriacao = rep["IDCRIACAO"]
			var indice = rep["INDICE"]
			
			// SE O ÍNDICE ORDENADO É IGUAL AO ÍNDICE ATUAL DA TABELA
			if(indicesOrdenados[t]==indice){
			
				// INCLUI O SUMÁRIO NO ARRAY
				arrayIdCriacao.push(idCriacao)
				
			}
			
		}
		
	}
	
	return arrayIdCriacao
	
}

// SE ITEM TEM OP
function temOP(idCriacao){
	
	console.log("vou buscar se item da estrutura tem OP")
	
	var numOS = $("#NUM_OS").val()
	var execucao = $("#EXECUCAO_INFO").val() 
	
	console.log("idCriacao: "+idCriacao+", numOS: "+numOS)
	
	// CONSULTA BANCO
	var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
	var a2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST);
	var a3 = DatasetFactory.createConstraint("EXECUCAO",execucao,execucao,ConstraintType.MUST);
	
	var constraints = new Array(a1,a2,a3);
	
	var dataset = DatasetFactory.getDataset("dsEXVerificaItemTemOP",null,constraints,null);

	var row = dataset.values
	
	console.log("row: "+row)
	
	// SE ITEM TEM OP CRIADA
	if(!(row=="" || row==null || row==undefined)){
		
		console.log("item tem OP")
		
		return true
		
	} else {
		// SE NÃO
		
		console.log("item não tem OP")
		
		return false
		
	}
	
}

// BUSCA AS OP'S DE UM DETERMINADO ITEM DA ESTRUTURA
function carregaOP(indice){
	
	console.log("buscaOP")
	
	var ops = ""
	var numOS = $("#NUM_OS").val()
	var execucao = $("#EXECUCAO_INFO").val()
	var codTrfEx = $("#CODTRFEX").val()
	var row
	var falhaInd
	
	console.log("numOS: "+numOS+", execucao: "+execucao+", codTrfEx: "+codTrfEx)
	
	// SE A EXECUÇÃO FOI INFORMADA
	if( ! (execucao=="" || execucao==null || execucao==undefined) ){
		
		var idCriacao = buscaIdCriacaoEX(indice)
		
		// CONSTRÓI A CONSULTA DO DATASET
		var a1 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
		var a2 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
		var a3 = DatasetFactory.createConstraint("EXECUCAO",execucao,execucao,ConstraintType.MUST)
		
		var constraints = new Array(a1,a2,a3)
		var dataset = DatasetFactory.getDataset("dsEXBuscaItemEstruturaOS",null,constraints,null)
	
		var row = dataset.values
		
		console.log("row")
		console.log(row)
		
		var idprd = row[0]["IDPRD"]
		
		// SE PRODUTO FOI INTEGRADO
		if( !(idprd=="" || idprd==null || idprd==undefined) ){
			
			console.log("vou buscar a OP do Produto")
			console.log("idprd: "+idprd+", numOS: "+numOS+", execucao: "+execucao)
			
			var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
			var a2 = DatasetFactory.createConstraint("IDPRD",idprd,idprd,ConstraintType.MUST)
			var a3 = DatasetFactory.createConstraint("EXECUCAO",execucao,execucao,ConstraintType.MUST)
			
			var constraints = new Array(a1,a2,a3)
			
			var dataset = DatasetFactory.getDataset("dsEXItemTemOP",null,constraints,null)
			
			var row = dataset.values
			
			console.log("row")
			console.log(row)
			
			// SE RETORNO NÃO É NULO OU VAZIO
			if(!(row=="" || row==null || row==undefined)){
				
				var count = row.length
				
				for(var i=0; i<count; i++){

					var rep = row[i]
					
					if(i==0){
						
						ops = rep["CODORDEM"]
						
					} else {
						
						ops = ops +", "+rep["CODORDEM"]
							
					}
					
				}
				
			}
			
			
		}
				
	} 
	
	console.log("ops: "+ops)
	
	return ops
	
}

// PERCORRE A TABELA E CRIA UM ARRAY COM OS ÍNDICES RESPECTIVOS DOS ITENS DA TABELA
function criarSumarioExcel(indicesOrdenados,row){
	
	console.log("CRIAR SUMÁRIO EXCEL")
	
	var count = row.length
	
	console.log("count: "+count)
	
	console.log("tamanho indicesOrdenados: "+indicesOrdenados.length)
	
	// ARRAY PARA GUARDAR AS POSIÇÕES
	var sumario = new Array()
	
	console.log("row")
	console.log(row)
	
	// PERCORRE O ARRAY DOS ÍNDICES ORDENADOS
	for(var t=0; t < indicesOrdenados.length; t++){
		
		for(var k=0; k<count;k++){
		
			var rep = row[k]
			
			var indice = rep["INDICE"]
			var numDesenho = rep["NUMDESENHO"] 
			var descricao = rep["DESCRICAO"]
			var posicaoDesenho = rep["POSICAODESENHO"]
			var qtde = rep["DESQTDE"]
			var codTrfPai = rep["CODTRFPAI"]
			var nomeTrfPai = rep["NOMETRFPAI"]
			var nivel = rep["NIVEL"]
			var sumarioCompleto = ""
			
			console.log("indicesOrdenados["+t+"]: "+indicesOrdenados[t])
			console.log("indice row: "+indice)
			
			// SE O ÍNDICE ORDENADO É IGUAL AO ÍNDICE ATUAL DA TABELA
			if(indicesOrdenados[t]==indice){
				
				/*
				var ops = carregaOP(indice)
				console.log("ops: "+ops)
				
				// SE OPS FORAM ENCONTRADAS
				if(!(ops=="")){
					
					// SE TEM CODTRFPAI E É UM PAI
					if(!(codTrfPai=="" || codTrfPai==null || codTrfPai==undefined || codTrfPai=="null") && (nivel=="" || nivel==null || nivel==undefined || nivel=="null")){
						
						// CRIA A STRING DO SUMÁRIO
						sumarioCompleto = ' -> '+indice+' - '+numDesenho+' - Pos. '+posicaoDesenho+' - '+descricao+' - Qtd. '+qtde+' - Cód. Tarefa '+codTrfPai+' - '+nomeTrfPai+' </td> <td>OP: '+ops+'</td></tr>'         
						
					} else {
						// SE NÃO
						
						// CRIA A STRING DO SUMÁRIO
						sumarioCompleto = ' -> '+indice+' - '+numDesenho+' - Pos. '+posicaoDesenho+' - '+descricao+' - Qtd. '+qtde+' </td> <td>OP: '+ops+'</td></tr>'
						
					}
					
				} else {
					// SE NÃO
					
					// SE TEM CODTRFPAI E É UM PAI
					if(!(codTrfPai=="" || codTrfPai==null || codTrfPai==undefined || codTrfPai=="null") && (nivel=="" || nivel==null || nivel==undefined || nivel=="null")){
						
						// CRIA A STRING DO SUMÁRIO
						sumarioCompleto = ' -> '+indice+' - '+numDesenho+' - Pos. '+posicaoDesenho+' - '+descricao+' - Qtd. '+qtde+' - Cód. Tarefa '+codTrfPai+' - '+nomeTrfPai+'</td><td></td></tr>'  
						
					} else {
						// SE NÃO
						
						// CRIA A STRING DO SUMÁRIO
						sumarioCompleto = ' -> '+indice+' - '+numDesenho+' - Pos. '+posicaoDesenho+' - '+descricao+' - Qtd. '+qtde+'</td><td></td></tr>'  
						
					}
					
				}*/
				
				
				// SE TEM CODTRFPAI E É UM PAI
				if(!(codTrfPai=="" || codTrfPai==null || codTrfPai==undefined || codTrfPai=="null") && (nivel=="" || nivel==null || nivel==undefined || nivel=="null")){
					
					// CRIA A STRING DO SUMÁRIO
					sumarioCompleto = ' -> '+indice+' - '+numDesenho+' - Pos. '+posicaoDesenho+' - '+descricao+' - Qtd. '+qtde+' - Cód. Tarefa '+codTrfPai+' - '+nomeTrfPai+'</td></tr>'  
					
				} else {
					// SE NÃO
					
					// CRIA A STRING DO SUMÁRIO
					sumarioCompleto = ' -> '+indice+' - '+numDesenho+' - Pos. '+posicaoDesenho+' - '+descricao+' - Qtd. '+qtde+'</td></tr>'  
					
				}
				
				//console.log("indice: "+indice)
				
				console.log("sumario: "+sumarioCompleto)
				
				// INCLUI O SUMÁRIO NO ARRAY
				sumario.push(sumarioCompleto)
				
			}
		
		}
		
	}
	
	console.log("sumario Final")
	console.log(sumario)
	
	// RETORNA O ARRAY DO SUMÁRIO
	return sumario
	
}

// PERCORRE A TABELA E CRIA UM ARRAY COM OS ÍNDICES RESPECTIVOS DOS ITENS DA TABELA
function criarSumario(indicesOrdenados,row){
	
	var count = row.length
	
	// ARRAY PARA GUARDAR AS POSIÇÕES
	var sumario = new Array()
	
	// PERCORRE O ARRAY DOS ÍNDICES ORDENADOS
	for(var t=0; t < indicesOrdenados.length; t++){
		
		// PERCORRE O ARRAY DOS ITENS DA ESTRUTURA
		for(var p=0; p < count; p++){
			
			var rep = row[p]
			
			var indice = rep["INDICE"]
			var numDesenho = rep["NUMDESENHO"] 
			var descricao = rep["DESCRICAO"]
			var posicaoDesenho = rep["POSICAODESENHO"]
			var qtde = rep["DESQTDE"]
			var codTrfPai = rep["CODTRFPAI"]
			var nomeTrfPai = rep["NOMETRFPAI"]
			var execucoes = rep["EXECUCOES"]
			var nivel = rep["NIVEL"]
			var sumarioCompleto = ""
			
			// SE O ÍNDICE ORDENADO É IGUAL AO ÍNDICE ATUAL DA TABELA
			if(indicesOrdenados[t]==indice){
			
				// SE TEM CODTRFPAI E É UM PAI
				if(!(codTrfPai=="" || codTrfPai==null || codTrfPai==undefined || codTrfPai=="null") && (nivel=="" || nivel==null || nivel==undefined || nivel=="null")){
					
					// CRIA A STRING DO SUMÁRIO
					sumarioCompleto = ' → '+indice+' - '+numDesenho+' - Pos. '+posicaoDesenho+' - '+descricao+' - Qtd. '+qtde+' - Cód. Tarefa '+codTrfPai+' - '+nomeTrfPai+ ' - Exec. '+execucoes
					
				} else {
					// SE NÃO
					
					if(nivel=="" || nivel==null || nivel==undefined || nivel=="null"){
						
						// CRIA A STRING DO SUMÁRIO
						sumarioCompleto = ' → '+indice+' - '+numDesenho+' - Pos. '+posicaoDesenho+' - '+descricao+' - Qtd. '+qtde+ ' - Exec. '+execucoes
						
					} else {
						
						// CRIA A STRING DO SUMÁRIO
						sumarioCompleto = ' → '+indice+' - '+numDesenho+' - Pos. '+posicaoDesenho+' - '+descricao+' - Qtd. '+qtde
						
					}
					
				}
				
				//console.log("indice: "+indice)
				
				// INCLUI O SUMÁRIO NO ARRAY
				sumario.push(sumarioCompleto)
				
			}
				
		}
		
	}
	
	// RETORNA O ARRAY DO SUMÁRIO
	return sumario
	
	
	/*
	
	var count = row.length
	
	// ARRAY PARA GUARDAR AS POSIÇÕES
	var sumario = new Array()
	
	// PERCORRE O ARRAY DOS ÍNDICES ORDENADOS
	for(var t=0; t < indicesOrdenados.length; t++){
		
		// PERCORRE O ARRAY DOS ITENS DA ESTRUTURA
		for(var p=0; p < count; p++){
			
			var rep = row[p]
			
			var indice = rep["INDICE"]
			var numDesenho = rep["NUMDESENHO"] 
			var descricao = rep["DESCRICAO"]
			var posicaoDesenho = rep["POSICAODESENHO"]
			var qtde = rep["DESQTDE"]
			var codTrfPai = rep["CODTRFPAI"]
			var nomeTrfPai = rep["NOMETRFPAI"]
			var nivel = rep["NIVEL"]
			var sumarioCompleto = ""
			
			// SE O ÍNDICE ORDENADO É IGUAL AO ÍNDICE ATUAL DA TABELA
			if(indicesOrdenados[t]==indice){
			
				// SE TEM CODTRFPAI E É UM PAI
				if(!(codTrfPai=="" || codTrfPai==null || codTrfPai==undefined || codTrfPai=="null") && (nivel=="" || nivel==null || nivel==undefined || nivel=="null")){
					
					// CRIA A STRING DO SUMÁRIO
					sumarioCompleto = ' → '+indice+' - '+numDesenho+' - Pos. '+posicaoDesenho+' - '+descricao+' - Qtd. '+qtde+' - Cód. Tarefa '+codTrfPai+' - '+nomeTrfPai
					
				} else {
					// SE NÃO
					
					// CRIA A STRING DO SUMÁRIO
					sumarioCompleto = ' → '+indice+' - '+numDesenho+' - Pos. '+posicaoDesenho+' - '+descricao+' - Qtd. '+qtde
					
				}
				
				//console.log("indice: "+indice)
				
				// INCLUI O SUMÁRIO NO ARRAY
				sumario.push(sumarioCompleto)
				
			}
		
		}
	}
	
	// RETORNA O ARRAY DO SUMÁRIO
	return sumario*/
	
}

// PERCORRE A TABELA E CRIA UM ARRAY COM OS SEQS DA TABELA DE ACORDO COM OS ÍNDICES ORDENADOS
function criarSeqs(indicesOrdenados){
	
	// ARRAY PARA GUARDAR OS SEQS DOS ITENS DA TABELA
	var seqs = new Array()
	
	// PERCORRE A TABELA E GUARDAR OS SEQS DE ACORDO COM OS ÍNDICES ORDENADOS
	for(k=0; k<indicesOrdenados.length;k++){
		
		// PERCORRE A TABELA E COLETA TODOS OS ÍNDICES
		$('input[id^="NIVEL___"]').each(function(index, value){
		
			// VARIÁVEL PARA O ÍNDICE DA TABELA
			var seq = $(this).attr("id").split("___")[1]
	
			// SE O ÍNDICE DA TABELA É IGUAL AO ÍNDICE DO ARRAY ORDENADO
			if($("#INDICE___"+seq).val()==indicesOrdenados[k]){
				
				//console.log("o "+k+" seq "+seq)
				seqs.push(seq)
				
			}
			
		})
		
	}
	
	// RETORNA O ARRAY DOS SEQS GERADOS
	return seqs
	
}

// PERCORRE A TABELA E CRIA UM ARRAY COM OS SEQS DA TABELA DE ACORDO COM OS ÍNDICES ORDENADOS
function criarExpansores(indicesOrdenados,row){
	
	// ARRAY PARA GUARDAR OS EXPANSORES DOS ITENS DA TABELA
	var expansores = new Array()
	
	var count = row.length
	console.log("count dos itens da estrutura: "+count)
	console.log("count dos indices ordenados: "+indicesOrdenados.length)
	
	// PERCORRE A TABELA E GUARDA OS EXPANSORES DE ACORDO COM OS ÍNDICES ORDENADOS
	for(k=0; k<indicesOrdenados.length; k++){
		
		// PERCORRE O ARRAY DOS ITENS DA ESTRUTURA
		for(p=0; p < count; p++){
			
			var rep = row[p]
			
			// SE O ÍNDICE DA TABELA É IGUAL AO ÍNDICE DO ARRAY ORDENADO
			if(rep["INDICE"]==indicesOrdenados[k]){
				
				var exp = rep["EXPANSOR"]
				
				expansores.push(exp)
				
			}
			
		}
		
	}
	
	// RETORNA O ARRAY DOS EXPANSORES GERADOS
	return expansores
	
}

// PERCORRE TODOS OS ITENS DA VIEW E IMPLEMENTA OS EXPANSORES
/*function implementaExpansores(expansores, indicesOrdenados, arrayIdCriacao){
	
	// PERCORRE TODOS OS REGISTROS DOS EXPANSORES
	for(var i=0; i<expansores.length; i++){
		
		var indice = indicesOrdenados[i]
		console.log("indice: "+indice)
		
		// SE ITEM ESTAVA EXPANDIDO
		if(expansores[i]=="EXPANDIDO"){
			
			indice = indice.toString()
			indice = indice.replace(/\./g,"P")
			
			expandir(indice,arrayIdCriacao[i])
			
		}
		
		// SE ITEM ESTAVA REDUZIDO
		if(expansores[i]=="REDUZIDO"){
			
			indice = indice.toString()
			indice = indice.replace(/\./g,"P")
			
			reduzir(indice,arrayIdCriacao[i])
			
		}
		
	}
	
}*/

//PERCORRE TODOS OS ITENS DA VIEW E IMPLEMENTA OS EXPANSORES
function implementaExpansores(row){
	
	// PERCORRE TODOS OS REGISTROS DOS EXPANSORES
	for(var i=0; i<row.length; i++){
		
		var indice = row[i]["INDICE"]
		console.log("indice: "+indice)
		
		// SE ITEM ESTAVA EXPANDIDO
		if(row[i]["EXPANSOR"]=="EXPANDIDO"){
			
			indice = indice.toString()
			indice = indice.replace(/\./g,"P")
			
			expandir(indice,row[i]["IDCRIACAO"])
			
		}
		
		// SE ITEM ESTAVA REDUZIDO
		if(row[i]["EXPANSOR"]=="REDUZIDO"){
			
			indice = indice.toString()
			indice = indice.replace(/\./g,"P")
			
			reduzir(indice,row[i]["IDCRIACAO"])
			
		}
		
	}
	
}

// SALVA A SOLICITAÇÃO CRIADA NA TABELA AUXILIAR
function salvaSolicitacaoTabelaAuxiliar(processoPai,solicitacao,numOS){
	
	var a1 = DatasetFactory.createConstraint("PROCESSO",solicitacao,solicitacao,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("PROCESSOPAI",processoPai,processoPai,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	
	var constraints = new Array(a1,a2,a3)
	
	var dataset = DatasetFactory.getDataset("dsInsertSolicitacaoCadastroTabelaAux",null,constraints,null)
	
}

// CARREGA SOLICITAÇÕES QUE ESTÃO ABERTAS E PERTENCEM A ESTRUTURA QUE ESTÁ SENDO EDITADA
function carregaSolicitacoes(){
	
	var numOS = $("#NUM_OS").val()
	var abertas = ""
	var processoPai = $("#NUMPROCESSO").val()
		
	var a1 = DatasetFactory.createConstraint("PROCESSOPAI",processoPai,processoPai,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	
	var constraints = new Array(a1,a2)
	
	var dataset = DatasetFactory.getDataset("dsVerificaSolicitacaoCadastro",null,constraints,null)
	
	var row = dataset.values
	
	console.log("row")
	console.log(row)
	
	// SE RETORNO NÃO É VAZIO OU NULO
	if(!(row=="" || row==undefined || row==null || row=="null")){
		
		// PERCORRE TODOS OS REGISTROS DO DATASET
		for(var i=0; i<dataset.values.length; i++){
			
			var rep = row[i]
			
			// SE STATUS É 1, OU SEJA, SOLICITAÇÃO ESTÁ ABERTA
			if(rep["STATUS"]==1){
				
				console.log("status é 1")
				
				// SE É O PRIMEIRO ITEM
				if(abertas==""){
					
					console.log("primeiro item")
				
					abertas = "<a href='http://10.0.3.51:8080/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID="+rep["PROCESSO"]+"' target='_blank' >"+rep["PROCESSO"]+"</a> "
					
					console.log("salvei "+rep["PROCESSO"])
					console.log("abertas: "+abertas)
					
				} else {
				// SE NÃO É O PRIMEIRO ITEM
					
					console.log("não é o primeiro item")
					
					// SE ABERTAS AINDA NÃO FOI PREENCHIDA E STATUS É 1
					/*if(abertas==""){
					
						console.log("se abertas é vazio e status é 1")
						
						abertas = rep["PROCESSO"]
						
						console.log("salvei "+rep["PROCESSO"])
						console.log("abertas: "+abertas)
						
					} else {*/
						
						console.log("se abertas não é vazio e status é 1")

						abertas = abertas + ", "+"&nbsp;<a href='http://10.0.3.51:8080/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID="+rep["PROCESSO"]+"' target='_blank'>"+rep["PROCESSO"]+"</a> "
					
						console.log("salvei "+rep["PROCESSO"])
						console.log("abertas: "+abertas)
						
					//}
				
				}
				
			}
			
		}
		
	} 
	
	console.log("abertas: "+abertas)
	
	var el = document.createElement('div')
	el.innerHTML = abertas
	
	// SE NÃO HÁ SOLICITAÇÕES ABERTAS
	if(abertas==""){
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'warning',
			  title: 'Não há solicitações abertas e que precisam ser finalizadas',
			  text: 'Essa solicitação pode ser finalizada'
		})
		
	} else {
		// SE NÃO, SE HÁ SOLICITAÇÕES ABERTAS
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'warning',
			  title: 'Existem solicitações abertas e que precisam ser finalizadas.',
			  footer: '<span class="solicitacoes">Solicitações: &nbsp;'+abertas+'</span>'
		})
		
	}
	
}

// PERCORRE A TABELA E CRIA UM ARRAY COM OS NÍVEIS DE ACORDO COM OS ÍNDICES ORDENADOS
function criarNiveis(indicesOrdenados,row){
	
	console.log("entrei para criar o array de níveis")

	var count = row.length
	
	// ARRAY PARA GUARDAR OS NÍVEIS DOS ÍNDICES DA TABELA
	var niveis = new Array()
	
	// PERCORRE A TABELA E GUARDA OS NÍVEIS DE ACORDO COM O ÍNDICE
	for(k=0; k<indicesOrdenados.length;k++){
		
		// PERCORRE O ARRAY DOS ITENS DA ESTRUTURA
		for(j=0; j < count; j++){
			
			var rep = row[j]
			
			// SE O ÍNDICE DA TABELA É IGUAL AO ÍNDICE ORDENADO DO ARRAY
			if(rep["INDICE"]==indicesOrdenados[k]){
				
				var nivel = rep["NIVEL"]
				
				nivel = nivel.toString()
				
				nivel = nivel.replace(/\./g,"P")
				
				niveis.push(nivel)
				
			}
			
		}
		
	}

	return niveis
	
}

// VERIFICA SE O NÚMERO DO DESENHO FOI INFORMADO
function verificaNumDesenho(){
	
	// VARIÁVEL PARA O NÚMERO DO DESENHO
	var numDesenho = $("#F_NUMDESENHO").val()
	
	// SE NENHUM NÚMERO FOI INFORMADO
	if(numDesenho=="" || numDesenho==null || numDesenho==undefined){
				
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'O número do desenho precisa ser informado!',
			  text: 'Verifique e tente novamente.'
		})
		
	}
	
}

// CRIA STRING DOS ESPAÇOS PARA O SUMÁRIO
function esp(pontos) {
	
	var espaco = "";
	
	// SE TEM PONTOS
	if(pontos>0){
		
		// CALCULA O EXPONENCIAL
		pontos = pontos*pontos
		//espaco = "&ensp;"
		//espaco = "&emsp;"
		espaco = "&nbsp;"	
		
		// INCREMENTA A STRING DOS ESPAÇOS
		for(j=0;j<pontos;j++){
			
			//espaco = ""+espaco+"&ensp;";
			//espaco = ""+espaco+"&emsp;";
			espaco = ""+espaco+"&nbsp;";
			
		}
		
	}
	console.log("espaços: "+espaco)
	return espaco;
	
}

// CRIA STRING DOS ESPAÇOS PARA O SUMÁRIO
function espExcel(pontos) {
	
	var espaco = "";
	var espacos = ""
		
	// SE TEM PONTOS
	if(pontos>0){
		
		// CALCULA O EXPONENCIAL
		pontos = pontos*pontos
		espaco = "&ensp;"
		//espaco = "&emsp;"
		//espaco = " "	
		
		
			
		// INCREMENTA A STRING DOS ESPAÇOS
		for(j=0;j<pontos;j++){
			
			//espaco = ""+espaco+"&ensp;";
			//espaco = ""+espaco+"&emsp;";
			espacos = espacos+""+espaco+"";
			
		}
		
	}
	
	console.log("espaços: "+espacos+".")
	
	return espacos;
	
}

// VERIFICA SE O ITEM ESTÁ DISPONÍVEL PARA INICIAR O PROCESSO DE CADASTRO DE SUBCONJUNTO
function verificaDispItem(idCriacao){
	
	var numOS = $("#NUM_OS").val()
	
	console.log("numOS: "+numOS+", idCriacao: "+idCriacao)
	
	var b1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	var b2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
	var constraints = new Array(b1,b2)
	
	var dataset = DatasetFactory.getDataset("dsVerificaDispItemOS",null,constraints,null)
	console.log("dataset: "+dataset)
	console.log(dataset)
	var row = dataset.values
	
	// SE RETORNO NÃO É NULO OU VAZIO
	if(!(row=="" || row==null || row==undefined || row=="null")){
		
		var rep = row[0]
		
		if(rep["NIVEL"]=="" || rep["NIVEL"]==null || rep["NIVEL"]==undefined || rep["NIVEL"]=="null"){
		
			return 1
		
		} else if(rep["COMPORLISTA"]=="SIM"){
			// SE NÃO, SE COMPORLISTA É SIM, É UMA POSIÇÃO
			
			console.log("compor lista é sim, é uma posição")
			
			return 2
			
		}
		else if(rep["DETALHADO"]=="SIM"){
			// SE NÃO, SE DETALHADO ESTÁ SETADO EM "SIM", O SUBCONJUNTO JÁ ESTÁ SENDO CADASTRADO
			
			console.log("item já foi detalhado")
			
			return 3
			
		}
		else if(temHerdeirosDetalhados(idCriacao)){
			// SE NÃO, SE ITEM TEM HERDEIROS QUE ESTÃO SENDO DETALHADOS
			
			console.log("item tem herdeiros que estão sendo detalhados")
			
			return 4
			
		}
		else {//if(!(rep["POSICAODESENHO"]=="0") && !(rep["DETALHADO"]=="SIM")){
			// SE NÃO, O ITEM ESTÁ LIBERADO
			
			console.log("item está liberado")
			
			return 0
			
		}
		
	}
	
}

// SE ITEM TEM HERDEIROS DETALHADOS
function temHerdeirosDetalhados(idCriacao){
	
	var numOS = $("#NUM_OS").val()
	
	var b1 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
	var b2 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	
	var constraints = new Array(b1,b2)
	
	var dataset = DatasetFactory.getDataset("dsBuscaItemEstruturaOS",null,constraints,null)
	
	var row = dataset.values
	var rep = row[0]
	
	var indice = rep["INDICE"]
	
	var a1 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("INDICE",indice,indice,ConstraintType.MUST)
	
	var constraints = new Array(a1,a2,a3)
	
	var dataset = DatasetFactory.getDataset("dsHerdeirosDetalhadosOS",null,constraints,null)
	
	var row = dataset.values
	
	// SE RETORNO NÃO É VAZIO OU NULO
	if(!(row=="" || row==null || row==undefined || row=="null")){
		
		return true
		
	} else {
		// SE NÃO
		
		return false
		
	}
	
}

// VERIFICA SE ITEM TEM FILHO
function itemTemFilho(idCriacao){
	
	var numOS = $("#NUM_OS").val()
	
	console.log("numOS: "+numOS+", idCriacao: "+idCriacao)
	
	var b1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	var b2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
	var constraints = new Array(b1,b2)
	
	var dataset = DatasetFactory.getDataset("dsItemTemFilhoOS",null,constraints,null)
	
	console.log("dataset: "+dataset)
	console.log(dataset)
	var row = dataset.values
	
	// SE RETORNO NÃO É NULO OU VAZIO
	if(!(row=="" || row==null || row==undefined || row=="null")){
		
		console.log("item tem filho")
		return true
	
	} else {
		
		console.log("item não tem filho")
		return false
		
	}
	
}

// ATUALIZA CAMPO DETALHADO DO ITEM
function atualizaDetalhado(idCriacao){
	
	var numOS = $("#NUM_OS").val()
	
	console.log("numOS: "+numOS+", idCriacao: "+idCriacao)
	
	var b1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	var b2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
	var constraints = new Array(b1,b2)
	
	var dataset = DatasetFactory.getDataset("dsUpdateDetalhadoOS",null,constraints,null)

}

// INICIAR A SOLICITAÇÃO DESSE ITEM NO PROCESSO DE CADASTRO DE SUBCONJUNTO
function iniciarSolicitacao(idCriacao){
	
	// VERIFICA SE ITEM ESTÁ DISPONÍVEL PARA TER UM PROCESSO DO CADASTRO DE SUBCONJUNTO INICIADO 
	var op = verificaDispItem(idCriacao)
	
	// SE ITEM ESTÁ DISPONÍVEL PARA INICIAR O PROCESSO DE CADASTRO DE SUBCONJUNTO
	if(op==0){
		
		console.log("Item está disponível, vou iniciar solicitação")
		
		// EXIBE ALERTA
		Swal.fire({
			
			  title: 'Deseja iniciar uma solicitação para cadastro desse subconjunto?',
			  icon: 'warning',
			  showCancelButton: true,
			  allowEscapeKey: true,
			  allowOutsideClick: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#F08E8E',
			  confirmButtonText: 'Sim',
			  cancelButtonText: 'Cancelar',
			  
			}).then(function(result){
			
			  // SE SIM
			  if (result.value) {
				
				// ATIVA O LOAD
				ativaSpinner()
					
				setTimeout(function(){
						
					var numOS = $("#NUM_OS").val()
					var descOS = $("#DESCRICAO_OS_INFO").val()
					var idprj = $("#IDPRJ_OS").val()
					//var codigoTarefa = $("#CODIGOTAREFA").val()
					var codigoTarefa = $("#CODTRF").val()+" - "+$("#NOMETRF").val()
					var codTrf = $("#CODTRF").val()
					var idTrf = $("#IDTRF").val()
					var nomeTrf = $("#NOMETRF").val()
					var exclusivo1 = "EDITAR"
					var processoPai = $("#NUMPROCESSO").val()
					var codColigada = $("#CODCOLIGADA").val()
					var codFilial = $("#CODFILIAL").val()
					
					var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
					var a2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
					
					var constraints = new Array(a1,a2)
					
					var dataset = DatasetFactory.getDataset("dsBuscaItemEstruturaOS",null,constraints,null)
					console.log("dataset: "+dataset)
					console.log(dataset)
					var row = dataset.values
					var rep = row[0]
					var processoPai = $("#NUMPROCESSO").val()
					console.log("processoPai "+processoPai)
					
					var indicePai = rep["INDICE"]
					
					console.log("numOS: "+numOS+", idCriacao: "+idCriacao+", descOS: "+descOS+", idprj: "+idprj+", codigoTarefa: "+codigoTarefa+", codTrf: "+codTrf+", idTrf: "+idTrf+
							", nomeTrf: "+nomeTrf+", indicePai: "+indicePai)
					
					var b1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
					var b2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
					var b3 = DatasetFactory.createConstraint("DESCRICAO_OS_INFO",descOS,descOS,ConstraintType.MUST)
					var b4 = DatasetFactory.createConstraint("IDPRJ_OS",idprj,idprj,ConstraintType.MUST)
					var b5 = DatasetFactory.createConstraint("CODIGOTAREFA",codigoTarefa,codigoTarefa,ConstraintType.MUST)
					var b6 = DatasetFactory.createConstraint("CODTRF",codTrf,codTrf,ConstraintType.MUST)
					var b7 = DatasetFactory.createConstraint("IDTRF",idTrf,idTrf,ConstraintType.MUST)
					var b8 = DatasetFactory.createConstraint("NOMETRF",nomeTrf,nomeTrf,ConstraintType.MUST)
					var b9 = DatasetFactory.createConstraint("EXCLUSIVO1",exclusivo1,exclusivo1,ConstraintType.MUST)
					var b10 = DatasetFactory.createConstraint("INDICEPAI",indicePai,indicePai,ConstraintType.MUST)
					var b11 = DatasetFactory.createConstraint("PROCESSOPAI",processoPai,processoPai,ConstraintType.MUST)
					var b12 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST)
					var b13 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
					
					var constraints = new Array(b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,b11,b12,b13)
					
					var dataset = DatasetFactory.getDataset("dsIniciaProcessoOS",null,constraints,null)
					console.log("dataset: "+dataset)
					console.log(dataset)
					var row = dataset.values
					
					console.log("row")
					console.log(row)
					
					var rep = row[0]
					
					var solicitacao = rep["SOLICITACAO"]
					
					// SALVA A SOLICITAÇÃO CRIADA NA TABELA AUXILIAR
					salvaSolicitacaoTabelaAuxiliar(processoPai,solicitacao,numOS)
					
					console.log("Solicitação: "+solicitacao)
					
					$("a#LINKSOLICITACAO").prop('href', 'http://10.0.3.206:8080/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID='+solicitacao);
					$("#LINKSOLICITACAO")[0].click();
					
					// ATUALIZA CAMPO DETALHADO DO ITEM
					atualizaDetalhado(idCriacao)
					
					setTimeout(function(){
						
						// ATUALIZA O CROQUI
						atualizar()
						
					},200)
					
				},500)
				
				// DESATIVA SPINER
				desativaSpinner()
				
			  }
			  
		})
		
	} else {
		// SE NÃO, EXIBE ALERTA
		
		// SE ITEM JÁ TEM FILHO NA ESTRUTURA
		if(op==1){
		
			//Este item já tem um filho na estrutura e não pode ser cadastrado em outra solicitação
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'Este item não pode ser cadastrado em outra solicitação',
				  text: 'Verifique e tente novamente.'
			})
			
		}
		
		// SE ITEM É UMA POSIÇÃO
		if(op==2){
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'Este item é uma posição e não pode ser cadastrado em outra solicitação',
				  text: 'Verifique se o checkbox "Compor Lista de Materiais" está marcado.'
			})
			
		}
		
		// SE ITEM JÁ TEM UMA SOLICITAÇÃO ABERTA SENDO CADASTRADA
		if(op==3){
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'Este item já tem uma solicitação aberta para cadastro do subconjunto',
				  text: 'Verifique e tente novamente.'
			})
			
		}
		
		// SE ITEM TEM HERDEIROS QUE ESTÃO SENDO DETALHADOS
		if(op==4){
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'Este item têm subconjuntos que estão sendo detalhados em outra solicitação',
				  text: 'Verifique as solicitações que estão abertas do processo de cadastro de subconjuntos'
			})
			
		}
		
	}
	
}

// VERIFICA SE FUNÇÃO ATUALIZAR PODE SER CHAMADA
function verificaAtualizar(){

	// SE NÃO TEM ITEM QUE ESTÁ SENDO DETALHADO
	if(!(temItemDetalhado())){
		
		// ATUALIZA 
		atualizar()
		
	}
	
}

// ALETRAR OS
function mudarOS(){
	
	console.log("entrei para mudar a OS")
	
	// SALVA AS INFORMAÇÕES DA OS ATUAL
	$("#NUM_OS_ANTIGA").val($("#NUM_OS").val())
	
	// ESCONDE CAMPOS NECESSÁRIOS
	$(".INFO_OS").show()
	$(".INFO_INDICE_PAI").hide()
	$(".VIEW").hide()
	$(".BOTOES_CAB").hide()
	$(".ALTERAR_OS").show()
	$(".VOLTAR_OS").show()
	$(".INCLUIR_OS").hide()
	
}

// ALTERAR A OS DOS ITENS
function alterarOSItens(){
	
	var numOS = $("#NUM_OS").val()
	var codTarefa = $("#CODTRF").val()
	
	// SE TABELA JÁ TEM ITENS INCLUIÍDOS
	if(tabelaTemItens()){
		
		// PERCORRE A TABELA E COLETA TODOS OS NÍVEIS
		$('input[id^="NIVEL___"]').each(function(index, value){
			
			console.log("vou alterar o indice "+seq)
			
			// VARIÁVEL PARA O ÍNDICE DA TABELA
			var seq = $(this).attr("id").split("___")[1]
			
			// ATUALIZA A OS
			$("#OS___"+seq).val(numOS)
			$("#CODTRFOS___"+seq).val(codTarefa)
			
		})
		
		// PERCORRE A TABELA E COLETA TODOS OS REGISTROS
		$('input[id^="PRIORIDADE___"]').each(function(index, value){
			
			console.log("vou alterar o indice "+seq)
			
			// VARIÁVEL PARA O ÍNDICE DA TABELA
			var seq = $(this).attr("id").split("___")[1]
			
			// ATUALIZA A OS
			$("#OSPROCESSO___"+seq).val(numOS)
			
		})
		
		// PERCORRE A TABELA E COLETA TODOS OS REGISTROS
		$('input[id^="PRODUTOCOMPONENTES___"]').each(function(index, value){
			
			console.log("vou alterar o indice "+seq)
			
			// VARIÁVEL PARA O ÍNDICE DA TABELA
			var seq = $(this).attr("id").split("___")[1]
			
			// ATUALIZA A OS
			$("#OSCOMPONENTES___"+seq).val(numOS)
			
		})
		
	}
	
	// ATUALIZA A VIEW
	atualizar()
	
}

// MONTA O CROQUI COM OS DADOS INSERIDOS NA TABELA SEM OFERECER A OPÇÃO DE ALTERAÇÕES
function montarCroquiSemOperacoesNivel(idCriacao,row,indicesPend){
//function montarCroquiSemOperacoesNivel(sumario,arrayIdCriacao,indicesOrdenados,niveis,idCriacao, indicesPend){
	
	// VARIÁVEL PARA CONTROLAR SE A TABELA ESTÁ VAZIA
	var tabela = $("#TABELA").val()
	
	// BUSCA O ÍNDICE DA ESTRUTURA DE ACORDO COM O IDCRIACAO 
	var indicePaiNivel = buscaIndiceEstrutura(idCriacao)
	
	// SE A TABELA JÁ TEM PELO MENOS UM ITEM INCLUSO
	/*if(tabelaTemItens()){
		
		// REMOVE A DIV DO CROQUI PARA ATUALIZAR
		$('.divCroqui').remove()
		
	}*/
	
	// SE O TAMANHO DO SUMÁRIO É 0
	/*if(sumario.length==0) {
	
		// MOSTRA/ESCONDE CAMPOS
		$(".beforeCroqui").hide()
		$(".VIEW").hide()
		$(".EXIBIRVIEW").show()
		$(".FECHARVIEW").hide()
		
	}*/ 
	
	// SE NÃO
	//else {
		
		var os = $("#OS_INFO").val()
		var codTarefa = $("#CODIGOTAREFA").val()
		
		// CRIA UMA NOVA DIV PARA O CROQUI
		//$('.beforeCroqui').after('<div class="form-group col-md-12 divCroqui croqui espaco"></div>')
		
		// SE O CÓDIGO DA TAREFA NÃO FOI INCLUÍDO
		/*if(codTarefa==null || codTarefa==undefined || codTarefa==""){
			
			$('.croqui').append('<span class="os" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="mudarOS()"><strong>OS '+os+'</strong></span>&nbsp;</span><br><br>')
			
		} else {
			
			$('.croqui').append('<span class="os" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="mudarOS()"><strong>OS '+os+'</strong></span>&nbsp; - &nbsp; <span class="tarefa" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirTarefa()"><strong>Cód. Tarefa: '+codTarefa+'</strong></span></span><br><br>')
		}*/

		// CRIA O CROQUI DA ESTRUTURA DE ACORDO COM AS POSIÇÕES CADASTRADAS
		for(i=0;i<row.length;i++){
			
			var numOS = $("#NUM_OS").val()
			var idCriacaoPai = idCriacao
			
			var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
			var a2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacaoPai,idCriacaoPai,ConstraintType.MUST)

			var constraints = new Array(a1,a2)	
			var dataset = DatasetFactory.getDataset("dsBuscaItemEstruturaOS",null,constraints,null)
			
			var rowPai = dataset.values
			var repPai = rowPai[0]
			
			var indicePai = repPai["INDICE"]
			var pontosPai = indicePai.replace(/[^.]/g, "").length
			
			///////
			var indexIndicePai = indicePai.replace(/\./g,"P")
			
			$('#SPAN'+indexIndicePai+'').empty()
			
			var string = row[i]["INDICE"]
			
			var pontos = string.replace(/[^.]/g, "").length
			console.log("pontos: "+pontos)
				
			var espaco = esp(pontos)
			
			console.log("nivel: "+row[i]["NIVEL"])
			console.log("indicesOrdenados: "+row[i]["INDICE"])
			var indexNivel = niveis[i]
			
			indexNivel = indexNivel.replace(/\./g,"P")
			console.log("indexNivel: "+indexNivel)
			
			var convert = row[i]["INDICE"].toString()
			
			// ACRESCENTEI ESSA LINHA (SOLICITAÇÃO 1831)
			var indexIndice = convert.replace(/\./g,"P")
			
			console.log("indexIndice: "+indexIndice)
			
			var temFilho = idTemFilho(string,row,0)
			
			// SE É O PRIMEIRO ITEM DO CROQUI
			if(pontos==pontosPai){  
			
				// SE A POSIÇÃO TEM FILHO
				if(temFilho){
					
					//$('.divCroqui').append('<br><div id="SPAN'+indexIndice+'" class="'+indexNivel+'"><span><i class="fluigicon fluigicon-plus-circle icon-xs EXPANDIR" onclick="expandir(\''+indexIndice+'\','+arrayIdCriacao[i]+')" id="EXPANDIR'+indexIndice+'"></i><i class="fluigicon fluigicon-minus-circle icon-xs REDUZIR" onclick="reduzir(\''+indexIndice+'\','+arrayIdCriacao[i]+')" id="REDUZIR'+indexIndice+'"></i></span>&ensp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheForm('+arrayIdCriacao[i]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs"></i></span>&ensp;<span id="SPANINTERNO'+indexIndice+'" class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheCab('+arrayIdCriacao[i]+');preencheFormSemView('+arrayIdCriacao[i]+');colocaSelecao(this)"><strong>'+sumario[i]+'</strong></span>&emsp;&emsp;<span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="iniciarSolicitacao('+arrayIdCriacao[i]+')" id="SUBCONJUNTO_LINK" name="SUBCONJUNTO_LINK" title="Cadastrar esse subconjunto em outra solicitação"><i class="fluigicon fluigicon-export icon-sm"></i></span></div>')
					$('#SPAN'+indexIndicePai+'').append('<br><div id="SPAN'+indexIndice+'" class="'+indexNivel+'"><span><i class="fluigicon fluigicon-plus-circle icon-xs EXPANDIR" onclick="expandir(\''+indexIndice+'\','+arrayIdCriacao[i]+')" id="EXPANDIR'+indexIndice+'"></i><i class="fluigicon fluigicon-minus-circle icon-xs REDUZIR" onclick="reduzir(\''+indexIndice+'\','+arrayIdCriacao[i]+')" id="REDUZIR'+indexIndice+'"></i></span>&ensp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheForm('+arrayIdCriacao[i]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs" '+indicesPend[i]+'></i></span>&ensp;<span id="SPANINTERNO'+indexIndice+'" class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheCab('+arrayIdCriacao[i]+');preencheFormSemView('+arrayIdCriacao[i]+');colocaSelecao(this)"><strong>'+sumario[i]+'</strong></span>&emsp;&emsp;<span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="iniciarSolicitacao('+arrayIdCriacao[i]+')" id="SUBCONJUNTO_LINK" name="SUBCONJUNTO_LINK" title="Editar esse subconjunto em outra solicitação"><i class="fluigicon fluigicon-export icon-sm"></i></span></div>')
					
				} else {
					// SE NÃO TEM FILHO
					
					//$('.divCroqui').append('<br><div id="SPAN'+indexIndice+'" class="'+indexNivel+'"><span>&emsp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)"  onclick="preencheForm('+arrayIdCriacao[i]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs"></i></span>&ensp;<span class="click" id="SPANINTERNO'+indexIndice+'" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheCab('+arrayIdCriacao[i]+');preencheFormSemView('+arrayIdCriacao[i]+');colocaSelecao(this)" ><strong>'+sumario[i]+'</strong></span></span>&emsp;&emsp;<span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="iniciarSolicitacao('+arrayIdCriacao[i]+')" id="SUBCONJUNTO_LINK" name="SUBCONJUNTO_LINK" title="Cadastrar esse subconjunto em outra solicitação"><i class="fluigicon fluigicon-export icon-sm"></i></span></div>')
					
				}
				
			}
			
			// SE NÃO É O PRIMEIRO ITEM
			if(pontos>0) {

				// SE ITEM TEM FILHO
				if(temFilho){
					
					$('#SPAN'+indexNivel+'').append('<div id="SPAN'+indexIndice+'" class="SPAN'+indexNivel+'"><span>'+espaco+'</span><span><i class="fluigicon fluigicon-plus-circle icon-xs EXPANDIR" onclick="expandir(\''+indexIndice+'\','+arrayIdCriacao[i]+')" id="EXPANDIR'+indexIndice+'"></i><i class="fluigicon fluigicon-minus-circle icon-xs REDUZIR" onclick="reduzir(\''+indexIndice+'\','+arrayIdCriacao[i]+')" id="REDUZIR'+indexIndice+'"></i></span>&ensp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheForm('+arrayIdCriacao[i]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs" '+indicesPend[i]+'></i></span>&ensp;<span id="SPANINTERNO'+indexIndice+'" class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheCab('+arrayIdCriacao[i]+');preencheFormSemView('+arrayIdCriacao[i]+');colocaSelecao(this)"><strong>'+sumario[i]+'</strong></span>&emsp;&emsp;<span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="iniciarSolicitacao('+arrayIdCriacao[i]+')" id="SUBCONJUNTO_LINK" name="SUBCONJUNTO_LINK" title="Editar esse subconjunto em outra solicitação"><i class="fluigicon fluigicon-export icon-sm"></i></span></div>')
					
				} else {
					
					$('#SPAN'+indexNivel+'').append('<div id="SPAN'+indexIndice+'" class="SPAN'+indexNivel+'"><span>'+espaco+'&emsp;&ensp;</span><span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheForm('+arrayIdCriacao[i]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs" '+indicesPend[i]+'></i></span>&ensp;<span id="SPANINTERNO'+indexIndice+'" class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheCab('+arrayIdCriacao[i]+');preencheFormSemView('+arrayIdCriacao[i]+');colocaSelecao(this)"><strong>'+sumario[i]+'</strong></span>&emsp;&emsp;<span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="iniciarSolicitacao('+arrayIdCriacao[i]+')" id="SUBCONJUNTO_LINK" name="SUBCONJUNTO_LINK" title="Editar esse subconjunto em outra solicitação"><i class="fluigicon fluigicon-export icon-sm"></i></span></div>')
					
				}
				
			}
			
			//console.log("finalizei o for de i: "+i)
			
		}
		
		//console.log("Finalizei a função montarCroqui")
		
	//}
	
	// ESCONDER SPAN REDUZIR
	$(".EXPANDIR").hide()
	
}

// MONTA O CROQUI COM OS DADOS INSERIDOS NA TABELA SEM OFERECER A OPÇÃO DE ALTERAÇÕES
function montarCroquiSemOperacoes(row,indicesPend){
//function montarCroquiSemOperacoes(sumario,arrayIdCriacao,indicesOrdenados,niveis,numOS,execucao,codTrfEx,indicesPend){
	
	console.log(">>> montarCroquiSemOperacoes <<<")
	
	// VARIÁVEL PARA CONTROLAR SE A TABELA ESTÁ VAZIA
	var tabela = $("#TABELA").val()
		
	var numOS = $("#NUM_OS").val()
	var execucao = $("#EXECUCAO_INFO").val()
	var codTrfEx = $("#CODTRFEX").val()
	
	// SE A TABELA JÁ TEM PELO MENOS UM ITEM INCLUSO
	if(tabelaTemItens()){
		
		// REMOVE A DIV DO CROQUI PARA ATUALIZAR
		$('.divCroqui').remove()
		
	}
	
	// SE O TAMANHO DO SUMÁRIO É 0
	if(row.length==0) {
	
		// MOSTRA/ESCONDE CAMPOS
		$(".beforeCroqui").hide()
		$(".VIEW").hide()
		$(".EXIBIRVIEW").show()
		$(".FECHARVIEW").hide()
		
	} 
	
	// SE NÃO
	else {
		
		var os = $("#OS_INFO").val()
		var codTarefa = $("#CODIGOTAREFA").val()
		
		// CRIA UMA NOVA DIV PARA O CROQUI
		$('.beforeCroqui').after('<div class="form-group col-md-12 divCroqui croqui espaco"></div>')
		
		// SE A EXECUÇÃO ESTÁ LIBERADA PARA SUBIR SALDO
		var osLiberada = osExecucaoLiberada(numOS,execucao,codTrfEx)
		
		// SE A OS FOI INFORMADA
		if(!(os=="" || os==null || os==undefined)){
			
			// SE A EXECUÇÃO FOI INFORMADA
			if(!(execucao=="" || execucao==null || execucao==undefined)){
				
				// SE A CODTRFEX FOI INFORMADA
				if(!(codTrfEx=="" || codTrfEx==null || codTrfEx==undefined)){
					
					$('.croqui').append('<span class="os" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)"><strong>OS '+os+' - ESTRUTURA DA EXECUÇÃO: '+execucao+' - CÓD. TAREFA: '+codTrfEx+'</strong></span>&nbsp;</span><br><br><div id="SPANEXPANSORES"><span><i class="fluigicon fluigicon-plus-circle icon-xs EXPANDIRTODOS" onclick="expandirTodos()" title="Expandir toda a árvore" onmouseover="mouse(this)" id="EXPANDIR"><span class="EXPANSORESGERAIS">&ensp;Expandir&emsp;</span></i><i class="fluigicon fluigicon-minus-circle icon-xs REDUZIRTODOS" title="Reduzir toda a árvore" onmouseover="mouse(this)" onclick="reduzirTodos()" id="REDUZIR"><span class="EXPANSORESGERAIS">&ensp;Reduzir</span></i></span></div><br>')
					
				} else {
					// SE NÃO
					
					$('.croqui').append('<span class="os" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)"><strong>OS '+os+' - ESTRUTURA DA EXECUCÃO: '+execucao+'</strong></span>&nbsp;</span><br><br><div id="SPANEXPANSORES"><span><i class="fluigicon fluigicon-plus-circle icon-xs EXPANDIRTODOS" onclick="expandirTodos()" title="Expandir toda a árvore" onmouseover="mouse(this)" id="EXPANDIR"><span class="EXPANSORESGERAIS">&ensp;Expandir&emsp;</span></i><i class="fluigicon fluigicon-minus-circle icon-xs REDUZIRTODOS" title="Reduzir toda a árvore" onmouseover="mouse(this)" onclick="reduzirTodos()" id="REDUZIR"><span class="EXPANSORESGERAIS">&ensp;Reduzir</span></i></span></div><br>')
					
				}
				
			} else {
				// SE NÃO
				
				$('.croqui').append('<span class="os" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)"><strong>OS '+os+' - ESTRUTURA PRINCIPAL</strong></span>&nbsp;</span><br><br><div id="SPANEXPANSORES"><span><i class="fluigicon fluigicon-plus-circle icon-xs EXPANDIRTODOS" onclick="expandirTodos()" title="Expandir toda a árvore" onmouseover="mouse(this)" id="EXPANDIR"><span class="EXPANSORESGERAIS">&ensp;Expandir&emsp;</span></i><i class="fluigicon fluigicon-minus-circle icon-xs REDUZIRTODOS" title="Reduzir toda a árvore" onmouseover="mouse(this)" onclick="reduzirTodos()" id="REDUZIR"><span class="EXPANSORESGERAIS">&ensp;Reduzir</span></i></span></div><br>')
				
			}
			
		}
		
		// SE O CÓDIGO DA TAREFA NÃO FOI INCLUÍDO
		/*if(codTarefa==null || codTarefa==undefined || codTarefa==""){
			
			$('.croqui').append('<span class="os" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="mudarOS()"><strong>OS '+os+'</strong></span>&nbsp; - &nbsp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirTarefa()"><strong>Incluir Tarefa</strong></span></span><br><br>')
			
		} else {
			
			$('.croqui').append('<span class="os" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="mudarOS()"><strong>OS '+os+'</strong></span>&nbsp; - &nbsp; <span class="tarefa" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirTarefa()"><strong>Cód. Tarefa: '+codTarefa+'</strong></span></span><br><br>')
		}*/

		// CRIA O CROQUI DA ESTRUTURA DE ACORDO COM AS POSIÇÕES CADASTRADAS
		for(i=0;i<row.length;i++){
			
			var string = row[i]["INDICE"]
			var iconeSubirSaldo = ""
			var pontos = string.replace(/[^.]/g, "").length
			console.log("pontos: "+pontos)
				
			var espaco = esp(pontos)
			
			console.log("nivel: "+row[i]["NIVEL"])
			console.log("indicesOrdenados: "+row[i]["INDICE"])
			var indexNivel = row[i]["NIVEL"]
			
			indexNivel = indexNivel.replace(/\./g,"P")
			console.log("indexNivel: "+indexNivel)
			
			var convert = row[i]["INDICE"].toString()
			
			// ACRESCENTEI ESSA LINHA (SOLICITAÇÃO 1831)
			var indexIndice = convert.replace(/\./g,"P")
			
			console.log("indexIndice: "+indexIndice)
			
			var temFilho = idTemFilhoRow2(string,row,0)
			
			var sumario = ""
			
			var indice = row[i]["INDICE"]
			var numDesenho = row[i]["NUMDESENHO"] 
			var descricao = row[i]["DESCRICAO"]
			var posicaoDesenho = row[i]["POSICAODESENHO"]
			var qtde = row[i]["DESQTDE"]
			var codTrfPai = row[i]["CODTRFPAI"]
			var nomeTrfPai = row[i]["NOMETRFPAI"]
			var execucoes = row[i]["EXECUCOES"]
			var nivel = row[i]["NIVEL"]
			
			// SE TEM CODTRFPAI E É UM PAI
			if(!(codTrfPai=="" || codTrfPai==null || codTrfPai==undefined || codTrfPai=="null") && (nivel=="" || nivel==null || nivel==undefined || nivel=="null")){
				
				// CRIA A STRING DO SUMÁRIO
				sumario = ' → '+indice+' - '+numDesenho+' - Pos. '+posicaoDesenho+' - '+descricao+' - Qtd. '+qtde+' - Cód. Tarefa '+codTrfPai+' - '+nomeTrfPai+ ' - Exec. '+execucoes
				
			} else {
				// SE NÃO
				
				if(nivel=="" || nivel==null || nivel==undefined || nivel=="null"){
					
					// CRIA A STRING DO SUMÁRIO
					sumario = ' → '+indice+' - '+numDesenho+' - Pos. '+posicaoDesenho+' - '+descricao+' - Qtd. '+qtde+ ' - Exec. '+execucoes
					
				} else {
					
					// CRIA A STRING DO SUMÁRIO
					sumario = ' → '+indice+' - '+numDesenho+' - Pos. '+posicaoDesenho+' - '+descricao+' - Qtd. '+qtde
					
				}
				
			}
			
			// SE A EXECUÇÃO ESTÁ LIBERADA E NÃO É UMA POSIÇÃO PARA SUBIR SALDO
			if(osLiberada && (temFilho || (row[i]["NIVEL"]=="" || row[i]["NIVEL"]=="NULL" || row[i]["NIVEL"]==null))){
				
				iconeSubirSaldo = '&emsp;-&emsp;<span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="subirSaldo('+row[i]["IDCRIACAO"]+');" id="SUBIR_SALDO" name="SUBIR_SALDO" title="Subir saldo dessa OP e as demais da hierarquia abaixo"><i class="flaticon flaticon-upload icon-sm" aria-hidden="true"></i></span>'
				
			} 
			
			// SE É O PRIMEIRO ITEM DO CROQUI
			if(pontos==0){  
			
				// SE A POSIÇÃO TEM FILHO
				if(temFilho){
					
					$('.divCroqui').append('<br><div id="SPAN'+indexIndice+'" class="'+indexNivel+'"><span><i class="fluigicon fluigicon-plus-circle icon-xs EXPANDIR" onclick="expandir(\''+indexIndice+'\','+row[i]["IDCRIACAO"]+')" id="EXPANDIR'+indexIndice+'"></i><i class="fluigicon fluigicon-minus-circle icon-xs REDUZIR" onclick="reduzir(\''+indexIndice+'\','+row[i]["IDCRIACAO"]+')" id="REDUZIR'+indexIndice+'"></i></span>&ensp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheForm('+row[i]["IDCRIACAO"]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs" '+indicesPend[i]+'></i></span>&ensp;<span id="SPANINTERNO'+indexIndice+'" class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheFormSemView('+row[i]["IDCRIACAO"]+');colocaSelecao(this)"><strong>'+sumario+'</strong></span>'+iconeSubirSaldo+'</div>')

				} else {
					// SE NÃO TEM FILHO
					
					$('.divCroqui').append('<br><div id="SPAN'+indexIndice+'" class="'+indexNivel+'"><span>&ensp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheForm('+row[i]["IDCRIACAO"]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs" '+indicesPend[i]+'></i></span>&ensp;<span class="click" id="SPANINTERNO'+indexIndice+'" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheFormSemView('+row[i]["IDCRIACAO"]+');colocaSelecao(this)" ><strong>'+sumario+'</strong></span></span>'+iconeSubirSaldo+'</div>')
					
				}
				
			}
			
			// SE NÃO É O PRIMEIRO ITEM
			if(pontos>0) {

				// SE ITEM TEM FILHO
				if(temFilho){
					
					$('#SPAN'+indexNivel+'').append('<div id="SPAN'+indexIndice+'" class="SPAN'+indexNivel+'"><span>'+espaco+'</span><span><i class="fluigicon fluigicon-plus-circle icon-xs EXPANDIR" onclick="expandir(\''+indexIndice+'\','+row[i]["IDCRIACAO"]+')" id="EXPANDIR'+indexIndice+'"></i><i class="fluigicon fluigicon-minus-circle icon-xs REDUZIR" onclick="reduzir(\''+indexIndice+'\','+row[i]["IDCRIACAO"]+')" id="REDUZIR'+indexIndice+'"></i></span>&ensp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheForm('+row[i]["IDCRIACAO"]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs" '+indicesPend[i]+'></i></span>&ensp;<span id="SPANINTERNO'+indexIndice+'" class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheFormSemView('+row[i]["IDCRIACAO"]+');colocaSelecao(this)"><strong>'+sumario+'</strong></span>'+iconeSubirSaldo+'</div>')
					
				} else {
					
					$('#SPAN'+indexNivel+'').append('<div id="SPAN'+indexIndice+'" class="SPAN'+indexNivel+'"><span>'+espaco+'&nbsp;</span>&emsp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheForm('+row[i]["IDCRIACAO"]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs" '+indicesPend[i]+'></i></span></span>&ensp;<span id="SPANINTERNO'+indexIndice+'" class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheFormSemView('+row[i]["IDCRIACAO"]+');colocaSelecao(this)"><strong>'+sumario+'</strong></span>'+iconeSubirSaldo+'</div>')
					
				}
				
			}
			
			//console.log("finalizei o for de i: "+i)
			
		}
		
		//console.log("Finalizei a função montarCroqui")
		
	}
	
	// ESCONDER SPAN REDUZIR
	//$(".EXPANDIR").hide()
	
}

// VOLTA PARA A TELA INICIAL DA SELEÇÃO DA OS
function voltarTela(){
	
	console.log("vou voltar a tela da OS")
	
	// REMOVE A DIV DO CROQUI PARA ATUALIZAR
	$('.divCroqui').remove()
	
	// MOSTRA/ESCONDE CAMPOS
	$(".VIEW").hide()
	$(".INFO_OS").show()
	$(".CABECALHO").show()
	
	// LIMPA OS CAMPOS
	$("#OS_INFO>option").remove()
	$("#NUM_OS").val("")
	$("#DESCRICAO_OS_INFO").val("")
	$("#IDPRJ_OS").val("")
	$("#NUM_OS_ANTIGA").val("")
	$("#CODCOLIGADA").val("")
	$("#CODFILIAL").val("")
	$("#EXECUCOES_OS>option").remove()
	$("#EXECUCAO_INFO").val("")
	$("#CODTRFPAI>option").remove()
	$("#CODTRFEX").val("")
	$("#INDICEPAI").val("")
	
	// DESABILITA OS CAMPOS
	$("#EXECUCOES_OS").prop("disabled",true)
	$("#CODTRFPAI").prop("disabled",true)
	
}

// MONTAR O CROQUI DA ESTRUTURA PARA EXPORTAR
function montarCroquiExportar(sumario,arrayIdCriacao,indicesOrdenados,niveis){
	
	// VARIÁVEL PARA CONTROLAR SE A TABELA ESTÁ VAZIA
	var tabela = $("#TABELA").val()
		
	var os = $("#OS_INFO").val()
		
	// CRIA UMA NOVA DIV PARA O CROQUI
	var strExcel = "OS "+os+" \n\n<table><tr><th></th><th></th></tr>"
	
	// CRIA O CROQUI DA ESTRUTURA DE ACORDO COM AS POSIÇÕES CADASTRADAS
	for(i=0;i<sumario.length;i++){
		
		var string = indicesOrdenados[i]
		
		var pontos = string.replace(/[^.]/g, "").length
		console.log("pontos: "+pontos)
			
		var espaco = espExcel(pontos)
		//var espaco = esp(pontos)
		
		console.log("nivel: "+niveis[i])
		console.log("indicesOrdenados: "+indicesOrdenados[i])
		
		var indexNivel = niveis[i]
		
		indexNivel = indexNivel.replace(/\./g,"P")
		console.log("indexNivel: "+indexNivel)
		
		var convert = indicesOrdenados[i].toString()
		
		// ACRESCENTEI ESSA LINHA (SOLICITAÇÃO 1831)
		var indexIndice = convert.replace(/\./g,"P")
		
		console.log("indexIndice: "+indexIndice)
		
		var temFilho = idTemFilho(string,indicesOrdenados,0)
		
		var ops = carregaOP(indicesOrdenados[i])
		
		// SE É O PRIMEIRO ITEM DO CROQUI
		//if(pontos==0){  
		
			if(!(ops=="")){
				
				// SE A POSIÇÃO TEM FILHO
				if(temFilho){
					
					strExcel = strExcel  +"<tr><td>OP: "+ops+"</td><td>"+ espaco +""+ sumario[i]//+"\n"

				} else {
					// SE NÃO TEM FILHO
					
					strExcel = strExcel  +"<tr><td>OP: "+ops+"</td><td>"+ espaco +""+ sumario[i]//+"\n"
					
				}
				
			} else {
				
				// SE A POSIÇÃO TEM FILHO
				if(temFilho){
					
					strExcel = strExcel  +"<tr><td>OP: NÃO MANUFATURADO</td><td>"+ espaco +""+ sumario[i]//+"\n"

				} else {
					// SE NÃO TEM FILHO
					
					strExcel = strExcel  +"<tr><td>OP: NÃO MANUFATURADO</td><td>"+ espaco +""+ sumario[i]//+"\n"
					
				}
				
			}
			
		//}
		
		/*
		// SE NÃO É O PRIMEIRO ITEM
		if(pontos>0) {

			// SE ITEM TEM FILHO
			if(temFilho){
				
				strExcel = strExcel  + "<tr><td>"+  espaco + ""+ sumario[i]//+"\n"
				
			} else {
				
				strExcel = strExcel  + "<tr><td>"+ espaco + ""+ sumario[i]//+"\n"
				
			}
			
		}*/
				
	}
		
	strExcel = strExcel + "</table>"
	
	console.log("strExcel: ")
	console.log(strExcel)
	
	return strExcel
	
}

// MONTA E EXIBE O CROQUI DA ESTRUTURA 
function montarCroquiNivel(sumario,arrayIdCriacao,indicesOrdenados,niveis,idCriacaoPai, indicesPend) {
	
	//console.log("Entrei na função montarCroqui")
	
	// VARIÁVEL PARA CONTROLAR SE A TABELA ESTÁ VAZIA
	var tabela = $("#TABELA").val()
	
	// SE A TABELA JÁ TEM PELO MENOS UM ITEM INCLUSO
	/*if(tabelaTemItens()){
		
		// REMOVE A DIV DO CROQUI PARA ATUALIZAR
		$('.divCroqui').remove()
		
	}
	
	// SE O TAMANHO DO SUMÁRIO É 0
	if(sumario.length==0) {
	
		// MOSTRA/ESCONDE CAMPOS
		$(".beforeCroqui").hide()
		$(".VIEW").hide()
		$(".EXIBIRVIEW").show()
		$(".FECHARVIEW").hide()
		
	} 
	
	// SE NÃO
	else {*/
		
		var os = $("#OS_INFO").val()
		var codTarefa = $("#CODIGOTAREFA").val()
		
		// CRIA UMA NOVA DIV PARA O CROQUI
		/*$('.beforeCroqui').after('<div class="form-group col-md-12 divCroqui croqui espaco"></div>')
		
		// SE O CÓDIGO DA TAREFA NÃO FOI INCLUÍDO
		if(codTarefa==null || codTarefa==undefined || codTarefa==""){
			
			$('.croqui').append('<span class="os" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="mudarOS()"><strong>OS '+os+'</strong></span>&nbsp;</span><br><br>')
			
		} else {
			
			$('.croqui').append('<span class="os" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="mudarOS()"><strong>OS '+os+'</strong></span>&nbsp; - &nbsp; <span class="tarefa" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirTarefa()"><strong>Cód. Tarefa: '+codTarefa+'</strong></span></span><br><br>')
		}*/

		// CRIA O CROQUI DA ESTRUTURA DE ACORDO COM AS POSIÇÕES CADASTRADAS
		for(i=0;i<sumario.length;i++){
			
			var numOS = $("#NUM_OS").val()
			
			var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
			var a2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacaoPai,idCriacaoPai,ConstraintType.MUST)

			var constraints = new Array(a1,a2)	
			var dataset = DatasetFactory.getDataset("dsBuscaItemEstruturaOS",null,constraints,null)
			
			var rowPai = dataset.values
			var repPai = rowPai[0]
			
			var indicePai = repPai["INDICE"]
			console.log("indicePai: "+indicePai)
			
			var pontosPai = indicePai.replace(/[^.]/g, "").length
			
			///////
			var indexIndicePai = indicePai.replace(/\./g,"P")
			
			console.log("indexIndicePai: "+indexIndicePai)
			
			if(i==0){
				
				$('#SPAN'+indexIndicePai+'').children("div").remove()
				
			}
			
			console.log("#SPAN"+indexIndicePai+"")
			
			var string = indicesOrdenados[i]
			
			var pontos = string.replace(/[^.]/g, "").length
			console.log("pontos: "+pontos)
				
			var espaco = esp(pontos)
			
			console.log("nivel: "+niveis[i])
			console.log("indicesOrdenados: "+indicesOrdenados[i])
			var indexNivel = niveis[i]
			
			indexNivel = indexNivel.replace(/\./g,"P")
			console.log("indexNivel: "+indexNivel)
			
			var convert = indicesOrdenados[i].toString()
			
			// ACRESCENTEI ESSA LINHA (SOLICITAÇÃO 1831)
			var indexIndice = convert.replace(/\./g,"P")
			
			console.log("indexIndice: "+indexIndice)
			
			var temFilho = idTemFilho(string,indicesOrdenados,0)
			
			var check = buscaCheckUsinCald(arrayIdCriacao[i])
			var checkUsin = check.split(";")[0]
			var checkCald = check.split(";")[1]
			
			// SE CHECKBOX DA USINAGEM ESTÁ SELECIONADO
			if(checkUsin=="S"){
				
				checkUsin = 'U&nbsp;<input type="checkbox" class="checkModalUsin" id="CHECKUSINAGEM'+indexIndice+'" value="'+arrayIdCriacao[i]+'" class="form-control" onclick="checkUsinagem(this,'+arrayIdCriacao[i]+')" title="Usinagem" checked>'
				
			} else {
				// SE NÃO
				
				checkUsin = 'U&nbsp;<input type="checkbox" class="checkModalUsin" id="CHECKUSINAGEM'+indexIndice+'" value="'+arrayIdCriacao[i]+'" class="form-control" onclick="checkUsinagem(this,'+arrayIdCriacao[i]+')" title="Usinagem">'
				
			}
			
			// SE CHECKBOX DA CALDERARIA ESTÁ SELECIONADO
			if(checkCald=="S"){
				
				checkCald = 'C&nbsp;<input type="checkbox" class="checkModalCald" id="CHECKCALDERARIA'+indexIndice+'" value="'+arrayIdCriacao[i]+'" class="form-control" onclick="checkCalderaria(this,'+arrayIdCriacao[i]+')" title="Calderaria" checked>'
				
			} else {
				// SE NÃO
				
				checkCald = 'C&nbsp;<input type="checkbox" class="checkModalCald" id="CHECKCALDERARIA'+indexIndice+'" value="'+arrayIdCriacao[i]+'" class="form-control" onclick="checkCalderaria(this,'+arrayIdCriacao[i]+')" title="Calderaria">'
				
			}
			
			// SE É O PRIMEIRO ITEM DO CROQUI
			if(pontos==pontosPai){  
				
				console.log("pontos "+pontos+" e pontosPai "+pontosPai)
				
				// SE A POSIÇÃO TEM FILHO
				/*if(temFilho){
					
					console.log("tem filho")
					console.log("indexIndicePai: "+indexIndicePai+", indexNivel: "+indexNivel)
					
					//$('.divCroqui').append('<br><div id="SPAN'+indexIndice+'" class="'+indexNivel+'"><span><i class="fluigicon fluigicon-plus-circle icon-xs EXPANDIR" onclick="expandir(\''+indexIndice+'\','+arrayIdCriacao[i]+')" id="EXPANDIR'+indexIndice+'"></i><i class="fluigicon fluigicon-minus-circle icon-xs REDUZIR" onclick="reduzir(\''+indexIndice+'\','+arrayIdCriacao[i]+')" id="REDUZIR'+indexIndice+'"></i></span>&ensp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheForm('+arrayIdCriacao[i]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs"></i></span>&ensp;<span id="SPANINTERNO'+indexIndice+'" class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheCab('+arrayIdCriacao[i]+');preencheFormSemView('+arrayIdCriacao[i]+');colocaSelecao(this)"><strong>'+sumario[i]+'</strong></span>&emsp;&emsp;<a id="ALTERAR_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="alterarItem(\''+indicesOrdenados[i]+'\','+arrayIdCriacao[i]+');" id="ALTERAR_ITEM" name="ALTERAR_ITEM" title="Alterar"><i class="fluigicon fluigicon-pencil icon-xs"></i></span></a>&emsp;<a id="IRMAO_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirIrmao(\''+indicesOrdenados[i]+'\');" id="INCLUIR_IRMAO" name="INCLUIR_IRMAO" title="Incluir irmão abaixo"><i class="fluigicon fluigicon-circle-arrow-down icon-sm"></i></span></a>&emsp;<a id="FILHO_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirFilho(\''+indicesOrdenados[i]+'\');" id="INCLUIR_FILHO" name="INCLUIR_FILHO" title="Incluir filho abaixo"><i class="fluigicon fluigicon-circle-arrow-bottom-right icon-sm"></i></span></a>&emsp;<span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="iniciarSolicitacao('+arrayIdCriacao[i]+')" id="SUBCONJUNTO_LINK" name="SUBCONJUNTO_LINK" title="Cadastrar esse subconjunto em outra solicitação"><i class="fluigicon fluigicon-export icon-sm"></i></span></div>')
					$('#SPAN'+indexNivel+'').append('<br><div id="SPAN'+indexIndice+'" class="'+indexNivel+'"><span><i class="fluigicon fluigicon-plus-circle icon-xs EXPANDIR" onclick="expandir(\''+indexIndice+'\','+arrayIdCriacao[i]+')" id="EXPANDIR'+indexIndice+'"></i><i class="fluigicon fluigicon-minus-circle icon-xs REDUZIR" onclick="reduzir(\''+indexIndice+'\','+arrayIdCriacao[i]+')" id="REDUZIR'+indexIndice+'"></i></span>&ensp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheForm('+arrayIdCriacao[i]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs"></i></span>&ensp;<span id="SPANINTERNO'+indexIndice+'" class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheCab('+arrayIdCriacao[i]+');preencheFormSemView('+arrayIdCriacao[i]+');colocaSelecao(this)"><strong>'+sumario[i]+'</strong></span>&emsp;&emsp;<a id="ALTERAR_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="alterarItem(\''+indicesOrdenados[i]+'\','+arrayIdCriacao[i]+');" id="ALTERAR_ITEM" name="ALTERAR_ITEM" title="Alterar"><i class="fluigicon fluigicon-pencil icon-xs"></i></span></a>&emsp;<a id="IRMAO_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirIrmao(\''+indicesOrdenados[i]+'\');" id="INCLUIR_IRMAO" name="INCLUIR_IRMAO" title="Incluir irmão abaixo"><i class="fluigicon fluigicon-circle-arrow-down icon-sm"></i></span></a>&emsp;<a id="FILHO_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirFilho(\''+indicesOrdenados[i]+'\');" id="INCLUIR_FILHO" name="INCLUIR_FILHO" title="Incluir filho abaixo"><i class="fluigicon fluigicon-circle-arrow-bottom-right icon-sm"></i></span></a>&emsp;<span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="iniciarSolicitacao('+arrayIdCriacao[i]+')" id="SUBCONJUNTO_LINK" name="SUBCONJUNTO_LINK" title="Cadastrar esse subconjunto em outra solicitação"><i class="fluigicon fluigicon-export icon-sm"></i></span></div>')
					
				} else {
					// SE NÃO TEM FILHO
					
					//$('.divCroqui').append('<br><div id="SPAN'+indexIndice+'" class="'+indexNivel+'"><span>&emsp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)"  onclick="preencheForm('+arrayIdCriacao[i]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs"></i></span>&ensp;<span class="click" id="SPANINTERNO'+indexIndice+'" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheCab('+arrayIdCriacao[i]+');preencheFormSemView('+arrayIdCriacao[i]+');colocaSelecao(this)" ><strong>'+sumario[i]+'</strong></span></span>&emsp;&emsp;<a id="ALTERAR_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="alterarItem(\''+indicesOrdenados[i]+'\','+arrayIdCriacao[i]+');" id="ALTERAR_ITEM" name="ALTERAR_ITEM" title="Alterar"><i class="fluigicon fluigicon-pencil icon-xs"></i></span></a>&emsp;<a id="IRMAO_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirIrmao(\''+indicesOrdenados[i]+'\');" id="INCLUIR_IRMAO" name="INCLUIR_IRMAO" title="Incluir irmão abaixo"><i class="fluigicon fluigicon-circle-arrow-down icon-sm"></i></span></a>&emsp;<a id="FILHO_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)"  onclick="incluirFilho(\''+indicesOrdenados[i]+'\');" id="INCLUIR_FILHO" name="INCLUIR_FILHO" title="Incluir filho abaixo"><i class="fluigicon fluigicon-circle-arrow-bottom-right icon-sm"></i></span></a>&emsp;<span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="iniciarSolicitacao('+arrayIdCriacao[i]+')" id="SUBCONJUNTO_LINK" name="SUBCONJUNTO_LINK" title="Cadastrar esse subconjunto em outra solicitação"><i class="fluigicon fluigicon-export icon-sm"></i></span></div>')
					
				}*/
				
			}
			
			// SE NÃO É O PRIMEIRO ITEM
			//if(pontos>0) {
			else {
				
				console.log("pontos é diferente do pontos pai")
				
				// SE A POSIÇÃO TEM FILHO
				if(temFilho){
					
					console.log("tem filho")
					console.log("indexNivel: "+indexNivel)
					
					$('#SPAN'+indexNivel+'').append('<div id="SPAN'+indexIndice+'" class="SPAN'+indexNivel+'"><span>'+espaco+'</span><span><i class="fluigicon fluigicon-plus-circle icon-xs EXPANDIR" onclick="expandir(\''+indexIndice+'\','+arrayIdCriacao[i]+')" id="EXPANDIR'+indexIndice+'"></i><i class="fluigicon fluigicon-minus-circle icon-xs REDUZIR" onclick="reduzir(\''+indexIndice+'\','+arrayIdCriacao[i]+')" id="REDUZIR'+indexIndice+'"></i></span>&ensp;'+checkUsin+'&ensp;'+checkCald+'&ensp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheForm('+arrayIdCriacao[i]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs" '+indicesPend[i]+'></i></span>&ensp;<span id="SPANINTERNO'+indexIndice+'" class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheCab('+arrayIdCriacao[i]+');preencheFormSemView('+arrayIdCriacao[i]+');colocaSelecao(this)"><strong>'+sumario[i]+'</strong></span>&emsp;&emsp;<a id="ALTERAR_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="alterarItem(\''+indicesOrdenados[i]+'\','+arrayIdCriacao[i]+');" id="ALTERAR_ITEM" name="ALTERAR_ITEM" title="Alterar"><i class="fluigicon fluigicon-pencil icon-xs"></i></span></a>&emsp;<a id="IRMAO_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirIrmao(\''+indicesOrdenados[i]+'\');" id="INCLUIR_IRMAO" name="INCLUIR_IRMAO" title="Incluir irmão abaixo"><i class="fluigicon fluigicon-circle-arrow-down icon-sm"></i></span></a>&emsp;<a id="FILHO_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirFilho(\''+indicesOrdenados[i]+'\');" id="INCLUIR_FILHO" name="INCLUIR_FILHO" title="Incluir filho abaixo"><i class="fluigicon fluigicon-circle-arrow-bottom-right icon-sm"></i></span></a>&emsp;<span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="iniciarSolicitacao('+arrayIdCriacao[i]+')" id="SUBCONJUNTO_LINK" name="SUBCONJUNTO_LINK" title="Editar esse subconjunto em outra solicitação"><i class="fluigicon fluigicon-export icon-sm"></i></span></div>')
					
				} else {
					// SE NÃO TEM FILHO
					
					console.log("não tem filho")
					
					$('#SPAN'+indexNivel+'').append('<div id="SPAN'+indexIndice+'" class="SPAN'+indexNivel+'"><span>'+espaco+'&emsp;&ensp;</span>&ensp;'+checkUsin+'&ensp;'+checkCald+'&ensp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheForm('+arrayIdCriacao[i]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs" '+indicesPend[i]+'></i></span>&ensp;<span id="SPANINTERNO'+indexIndice+'" class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheCab('+arrayIdCriacao[i]+');preencheFormSemView('+arrayIdCriacao[i]+');colocaSelecao(this)"><strong>'+sumario[i]+'</strong></span>&emsp;&emsp;<a id="ALTERAR_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="alterarItem(\''+indicesOrdenados[i]+'\','+arrayIdCriacao[i]+');" id="ALTERAR_ITEM" name="ALTERAR_ITEM" title="Alterar"><i class="fluigicon fluigicon-pencil icon-xs"></i></span></a>&emsp;<a id="IRMAO_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirIrmao(\''+indicesOrdenados[i]+'\');" id="INCLUIR_IRMAO" name="INCLUIR_IRMAO" title="Incluir irmão abaixo"><i class="fluigicon fluigicon-circle-arrow-down icon-sm"></i></span></a>&emsp;<a id="FILHO_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirFilho(\''+indicesOrdenados[i]+'\');" id="INCLUIR_FILHO" name="INCLUIR_FILHO" title="Incluir filho abaixo"><i class="fluigicon fluigicon-circle-arrow-bottom-right icon-sm"></i></span></a>&emsp;<span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="iniciarSolicitacao('+arrayIdCriacao[i]+')" id="SUBCONJUNTO_LINK" name="SUBCONJUNTO_LINK" title="Editar esse subconjunto em outra solicitação"><i class="fluigicon fluigicon-export icon-sm"></i></span></div>')
					
				}
				
			}
			
			//console.log("finalizei o for de i: "+i)
			
		}
		
		//console.log("Finalizei a função montarCroqui")
		
	//}
	
	// ESCONDER SPAN REDUZIR
	$(".EXPANDIR").hide()
	
}

// BUSCA O CHECKBOX DA USINAGEM
function buscaCheckUsinCald(idCriacao){
	
	var numOS = $("#NUM_OS").val()
			
	var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)

	var constraints = new Array(a1,a2)	
	var dataset = DatasetFactory.getDataset("dsBuscaItemEstruturaOS",null,constraints,null)
	
	var row = dataset.values
	var rep = row[0]
	
	var check = rep["CHECKUSINAGEM"]+";"+rep["CHECKCALDERARIA"]
	
	return check
	
}

// BUSCA O CHECKBOX DA CALDERARIA
/*function buscaCheckCald(idCriacao){
	
	var numOS = $("#NUM_OS").val()
			
	var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)

	var constraints = new Array(a1,a2)	
	var dataset = DatasetFactory.getDataset("dsBuscaItemEstruturaOS",null,constraints,null)
	
	var row = dataset.values
	var rep = row[0]
	
	var checkCald = rep["CHECKCALDERARIA"]
	
	return checkCald
	
}*/

// MONTA E EXIBE O CROQUI DA ESTRUTURA 
function montarCroqui(sumario,arrayIdCriacao,indicesOrdenados,niveis, indicesPend) {
	
	//console.log("Entrei na função montarCroqui")
	
	// VARIÁVEL PARA CONTROLAR SE A TABELA ESTÁ VAZIA
	var tabela = $("#TABELA").val()
	
	// SE A TABELA JÁ TEM PELO MENOS UM ITEM INCLUSO
	if(tabelaTemItens()){
		
		// REMOVE A DIV DO CROQUI PARA ATUALIZAR
		$('.divCroqui').remove()
		
	}
	
	// SE O TAMANHO DO SUMÁRIO É 0
	if(sumario.length==0) {
	
		// MOSTRA/ESCONDE CAMPOS
		$(".beforeCroqui").hide()
		$(".VIEW").hide()
		$(".EXIBIRVIEW").show()
		$(".FECHARVIEW").hide()
		
	} 
	
	// SE NÃO
	else {
		
		var os = $("#OS_INFO").val()
		var codTarefa = $("#CODIGOTAREFA").val()
		var atividade = $("#ATIVIDADE").val()
		
		// CRIA UMA NOVA DIV PARA O CROQUI
		$('.beforeCroqui').after('<div class="form-group col-md-12 divCroqui croqui espaco"></div>')
		
		// SE O CÓDIGO DA TAREFA NÃO FOI INCLUÍDO
		if(codTarefa==null || codTarefa==undefined || codTarefa==""){
			
			// SE FOR ATIVIDADE DE APROVAÇÃO
			if(atividade==14){
				
				$('.croqui').append('<span class="os" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)"><strong>OS '+os+'</strong></span>&nbsp; - &nbsp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)"><strong>Incluir Tarefa</strong></span></span><br><br><div id="SPANEXPANSORES"><span><i class="fluigicon fluigicon-plus-circle icon-xs EXPANDIRTODOS" onclick="expandirTodos()" title="Expandir toda a árvore" onmouseover="mouse(this)" id="EXPANDIR"><span class="EXPANSORESGERAIS">&ensp;Expandir&emsp;</span></i><i class="fluigicon fluigicon-minus-circle icon-xs REDUZIRTODOS" title="Reduzir toda a árvore" onmouseover="mouse(this)" onclick="reduzirTodos()" id="REDUZIR"><span class="EXPANSORESGERAIS">&ensp;Reduzir</span></i></span></div><br>')
				
			} else {
				// SE NÃO 
				
				$('.croqui').append('<span class="os" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="mudarOS()"><strong>OS '+os+'</strong></span>&nbsp; - &nbsp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirTarefa();"><strong>Incluir Tarefa</strong></span></span><br><br><div id="SPANEXPANSORES"><span><i class="fluigicon fluigicon-plus-circle icon-xs EXPANDIRTODOS" onclick="expandirTodos()" title="Expandir toda a árvore" onmouseover="mouse(this)" id="EXPANDIR"><span class="EXPANSORESGERAIS">&ensp;Expandir&emsp;</span></i><i class="fluigicon fluigicon-minus-circle icon-xs REDUZIRTODOS" title="Reduzir toda a árvore" onmouseover="mouse(this)" onclick="reduzirTodos()" id="REDUZIR"><span class="EXPANSORESGERAIS">&ensp;Reduzir</span></i></span></div><br>')
				
			}
			
		} else {
			
			// SE FOR ATIVIDADE DE APROVAÇÃO
			if(atividade==14){
				
				$('.croqui').append('<span class="os" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)"><strong>OS '+os+'</strong></span>&nbsp; - &nbsp; <span class="tarefa" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)"><strong>Cód. Tarefa: '+codTarefa+'</strong></span></span><br><br><div id="SPANEXPANSORES"><span><i class="fluigicon fluigicon-plus-circle icon-xs EXPANDIRTODOS" onclick="expandirTodos()" title="Expandir toda a árvore" onmouseover="mouse(this)" id="EXPANDIR"><span class="EXPANSORESGERAIS">&ensp;Expandir&emsp;</span></i><i class="fluigicon fluigicon-minus-circle icon-xs REDUZIRTODOS" title="Reduzir toda a árvore" onmouseover="mouse(this)" onclick="reduzirTodos()" id="REDUZIR"><span class="EXPANSORESGERAIS">&ensp;Reduzir</span></i></span></div><br>')
				
			} else {
				
				$('.croqui').append('<span class="os" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="mudarOS()"><strong>OS '+os+'</strong></span>&nbsp; - &nbsp; <span class="tarefa" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirTarefa();"><strong>Cód. Tarefa: '+codTarefa+'</strong></span></span><br><br><div id="SPANEXPANSORES"><span><i class="fluigicon fluigicon-plus-circle icon-xs EXPANDIRTODOS" onclick="expandirTodos()" title="Expandir toda a árvore" onmouseover="mouse(this)" id="EXPANDIR"><span class="EXPANSORESGERAIS">&ensp;Expandir&emsp;</span></i><i class="fluigicon fluigicon-minus-circle icon-xs REDUZIRTODOS" title="Reduzir toda a árvore" onmouseover="mouse(this)" onclick="reduzirTodos()" id="REDUZIR"><span class="EXPANSORESGERAIS">&ensp;Reduzir</span></i></span></div><br>')
				
			}
		
		}

		// CRIA O CROQUI DA ESTRUTURA DE ACORDO COM AS POSIÇÕES CADASTRADAS
		for(i=0;i<sumario.length;i++){
			
			var string = indicesOrdenados[i]
			
			var pontos = string.replace(/[^.]/g, "").length
			console.log("pontos: "+pontos)
				
			var espaco = esp(pontos)
			
			console.log("nivel: "+niveis[i])
			console.log("indicesOrdenados: "+indicesOrdenados[i])
			var indexNivel = niveis[i]
			
			indexNivel = indexNivel.replace(/\./g,"P")
			console.log("indexNivel: "+indexNivel)
			
			var convert = indicesOrdenados[i].toString()
			
			// ACRESCENTEI ESSA LINHA (SOLICITAÇÃO 1831)
			var indexIndice = convert.replace(/\./g,"P")
			
			console.log("indexIndice: "+indexIndice)
			
			var temFilho = idTemFilho(string,indicesOrdenados,0)
			
			var check = buscaCheckUsinCald(arrayIdCriacao[i])
			var checkUsin = check.split(";")[0]
			var checkCald = check.split(";")[1]
			
			// SE CHECKBOX DA USINAGEM ESTÁ SELECIONADO
			if(checkUsin=="S"){
				
				checkUsin = 'U&nbsp;<input type="checkbox" class="checkModalUsin" id="CHECKUSINAGEM'+indexIndice+'" value="'+arrayIdCriacao[i]+'" class="form-control" onclick="checkUsinagem(this,'+arrayIdCriacao[i]+')" title="Usinagem" checked>'
				
			} else {
				// SE NÃO
				 
				checkUsin = 'U&nbsp;<input type="checkbox" class="checkModalUsin" id="CHECKUSINAGEM'+indexIndice+'" value="'+arrayIdCriacao[i]+'" class="form-control" onclick="checkUsinagem(this,'+arrayIdCriacao[i]+')" title="Usinagem">'
				
			}
			
			// SE CHECKBOX DA CALDERARIA ESTÁ SELECIONADO
			if(checkCald=="S"){
				
				checkCald = 'C&nbsp;<input type="checkbox" class="checkModalCald" id="CHECKCALDERARIA'+indexIndice+'" value="'+arrayIdCriacao[i]+'" class="form-control" onclick="checkCalderaria(this,'+arrayIdCriacao[i]+')" title="Calderaria" checked>'
				
			} else {
				// SE NÃO
				
				checkCald = 'C&nbsp;<input type="checkbox" class="checkModalCald" id="CHECKCALDERARIA'+indexIndice+'" value="'+arrayIdCriacao[i]+'" class="form-control" onclick="checkCalderaria(this,'+arrayIdCriacao[i]+')" title="Calderaria">'
				
			}
			
			// SE É O PRIMEIRO ITEM DO CROQUI
			if(pontos==0){  
			
				// SE A POSIÇÃO TEM FILHO
				if(temFilho){
					
					$('.divCroqui').append('<br><div id="SPAN'+indexIndice+'" class="'+indexNivel+'"><span><i class="fluigicon fluigicon-plus-circle icon-xs EXPANDIR" onclick="expandir(\''+indexIndice+'\','+arrayIdCriacao[i]+')" id="EXPANDIR'+indexIndice+'"></i><i class="fluigicon fluigicon-minus-circle icon-xs REDUZIR" onclick="reduzir(\''+indexIndice+'\','+arrayIdCriacao[i]+')" id="REDUZIR'+indexIndice+'"></i></span>&ensp;'+checkUsin+'&ensp;'+checkCald+'&ensp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheForm('+arrayIdCriacao[i]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs" '+indicesPend[i]+'></i></span>&ensp;<span id="SPANINTERNO'+indexIndice+'" class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheCab('+arrayIdCriacao[i]+');preencheFormSemView('+arrayIdCriacao[i]+');colocaSelecao(this)"><strong>'+sumario[i]+'</strong></span>&emsp;&emsp;<a id="ALTERAR_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="alterarItem(\''+indicesOrdenados[i]+'\','+arrayIdCriacao[i]+');" id="ALTERAR_ITEM" name="ALTERAR_ITEM" title="Alterar"><i class="fluigicon fluigicon-pencil icon-xs"></i></span></a>&emsp;<a id="IRMAO_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirIrmao(\''+indicesOrdenados[i]+'\');" id="INCLUIR_IRMAO" name="INCLUIR_IRMAO" title="Incluir irmão abaixo"><i class="fluigicon fluigicon-circle-arrow-down icon-sm"></i></span></a>&emsp;<a id="FILHO_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirFilho(\''+indicesOrdenados[i]+'\');" id="INCLUIR_FILHO" name="INCLUIR_FILHO" title="Incluir filho abaixo"><i class="fluigicon fluigicon-circle-arrow-bottom-right icon-sm"></i></span></a>&emsp;<span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="iniciarSolicitacao('+arrayIdCriacao[i]+')" id="SUBCONJUNTO_LINK" name="SUBCONJUNTO_LINK" title="Cadastrar esse subconjunto em outra solicitação"><i class="fluigicon fluigicon-export icon-sm"></i></span></div>')

				} else {
					// SE NÃO TEM FILHO
					
					$('.divCroqui').append('<br><div id="SPAN'+indexIndice+'" class="'+indexNivel+'"><span>&ensp;'+checkUsin+'&ensp;'+checkCald+'&ensp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)"  onclick="preencheForm('+arrayIdCriacao[i]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs" '+indicesPend[i]+'></i></span>&ensp;<span class="click" id="SPANINTERNO'+indexIndice+'" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheCab('+arrayIdCriacao[i]+');preencheFormSemView('+arrayIdCriacao[i]+');colocaSelecao(this)" ><strong>'+sumario[i]+'</strong></span></span>&emsp;&emsp;<a id="ALTERAR_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="alterarItem(\''+indicesOrdenados[i]+'\','+arrayIdCriacao[i]+');" id="ALTERAR_ITEM" name="ALTERAR_ITEM" title="Alterar"><i class="fluigicon fluigicon-pencil icon-xs"></i></span></a>&emsp;<a id="IRMAO_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirIrmao(\''+indicesOrdenados[i]+'\');" id="INCLUIR_IRMAO" name="INCLUIR_IRMAO" title="Incluir irmão abaixo"><i class="fluigicon fluigicon-circle-arrow-down icon-sm"></i></span></a>&emsp;<a id="FILHO_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)"  onclick="incluirFilho(\''+indicesOrdenados[i]+'\');" id="INCLUIR_FILHO" name="INCLUIR_FILHO" title="Incluir filho abaixo"><i class="fluigicon fluigicon-circle-arrow-bottom-right icon-sm"></i></span></a>&emsp;<span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="iniciarSolicitacao('+arrayIdCriacao[i]+')" id="SUBCONJUNTO_LINK" name="SUBCONJUNTO_LINK" title="Cadastrar esse subconjunto em outra solicitação"><i class="fluigicon fluigicon-export icon-sm"></i></span></div>')
					
				}
				
			}
			
			// SE NÃO É O PRIMEIRO ITEM
			if(pontos>0) {

				// SE A POSIÇÃO TEM FILHO
				if(temFilho){
					
					$('#SPAN'+indexNivel+'').append('<div id="SPAN'+indexIndice+'" class="SPAN'+indexNivel+'"><span>'+espaco+'</span><span><i class="fluigicon fluigicon-plus-circle icon-xs EXPANDIR" onclick="expandir(\''+indexIndice+'\','+arrayIdCriacao[i]+')" id="EXPANDIR'+indexIndice+'"></i><i class="fluigicon fluigicon-minus-circle icon-xs REDUZIR" onclick="reduzir(\''+indexIndice+'\','+arrayIdCriacao[i]+')" id="REDUZIR'+indexIndice+'"></i></span>&ensp;'+checkUsin+'&ensp;'+checkCald+'&ensp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheForm('+arrayIdCriacao[i]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs" '+indicesPend[i]+'></i></span>&ensp;<span id="SPANINTERNO'+indexIndice+'" class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheCab('+arrayIdCriacao[i]+');preencheFormSemView('+arrayIdCriacao[i]+');colocaSelecao(this)"><strong>'+sumario[i]+'</strong></span>&emsp;&emsp;<a id="ALTERAR_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="alterarItem(\''+indicesOrdenados[i]+'\','+arrayIdCriacao[i]+');" id="ALTERAR_ITEM" name="ALTERAR_ITEM" title="Alterar"><i class="fluigicon fluigicon-pencil icon-xs"></i></span></a>&emsp;<a id="IRMAO_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirIrmao(\''+indicesOrdenados[i]+'\');" id="INCLUIR_IRMAO" name="INCLUIR_IRMAO" title="Incluir irmão abaixo"><i class="fluigicon fluigicon-circle-arrow-down icon-sm"></i></span></a>&emsp;<a id="FILHO_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirFilho(\''+indicesOrdenados[i]+'\');" id="INCLUIR_FILHO" name="INCLUIR_FILHO" title="Incluir filho abaixo"><i class="fluigicon fluigicon-circle-arrow-bottom-right icon-sm"></i></span></a>&emsp;<span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="iniciarSolicitacao('+arrayIdCriacao[i]+')" id="SUBCONJUNTO_LINK" name="SUBCONJUNTO_LINK" title="Cadastrar esse subconjunto em outra solicitação"><i class="fluigicon fluigicon-export icon-sm"></i></span></div>')
					
				} else {
					// SE NÃO TEM FILHO
					
					$('#SPAN'+indexNivel+'').append('<div id="SPAN'+indexIndice+'" class="SPAN'+indexNivel+'"><span>'+espaco+'&emsp;&ensp;</span>&ensp;'+checkUsin+'&ensp;'+checkCald+'&ensp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheForm('+arrayIdCriacao[i]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs" '+indicesPend[i]+'></i></span>&ensp;<span id="SPANINTERNO'+indexIndice+'" class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheCab('+arrayIdCriacao[i]+');preencheFormSemView('+arrayIdCriacao[i]+');colocaSelecao(this)"><strong>'+sumario[i]+'</strong></span>&emsp;&emsp;<a id="ALTERAR_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="alterarItem(\''+indicesOrdenados[i]+'\','+arrayIdCriacao[i]+');" id="ALTERAR_ITEM" name="ALTERAR_ITEM" title="Alterar"><i class="fluigicon fluigicon-pencil icon-xs"></i></span></a>&emsp;<a id="IRMAO_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirIrmao(\''+indicesOrdenados[i]+'\');" id="INCLUIR_IRMAO" name="INCLUIR_IRMAO" title="Incluir irmão abaixo"><i class="fluigicon fluigicon-circle-arrow-down icon-sm"></i></span></a>&emsp;<a id="FILHO_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirFilho(\''+indicesOrdenados[i]+'\');" id="INCLUIR_FILHO" name="INCLUIR_FILHO" title="Incluir filho abaixo"><i class="fluigicon fluigicon-circle-arrow-bottom-right icon-sm"></i></span></a>&emsp;<span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="iniciarSolicitacao('+arrayIdCriacao[i]+')" id="SUBCONJUNTO_LINK" name="SUBCONJUNTO_LINK" title="Cadastrar esse subconjunto em outra solicitação"><i class="fluigicon fluigicon-export icon-sm"></i></span></div>')
					
				}
				
			}
			
			//console.log("finalizei o for de i: "+i)
			
		}
		
		//console.log("Finalizei a função montarCroqui")
		
	}
	
	// ESCONDER SPAN REDUZIR
	//$(".EXPANDIR").hide()
	
}

// SE O CÓDIGO DA TAREFA FOI INFORMADO OU É VÁLIDO
function codTarefaValido(){
	
	var codtrf = $("#CODTRF").val()
	
	// SE O CÓDIGO DA TAREFA NÃO FOI INFORMADO
	if(codtrf=="" || codtrf==null || codtrf==undefined || codtrf=="null"){
		
		console.log("códgio na foi informado")
		
		return false
		
	} else {
		// SE NÃO
		
		var idprj = $("#IDPRJ_OS").val()
		var numProcesso = $("#NUMPROCESSO").val()
		
		var a1 = DatasetFactory.createConstraint("IDPRJ",idprj,idprj,ConstraintType.MUST)
		var a2 = DatasetFactory.createConstraint("NUMPROCESSO",numProcesso,numProcesso,ConstraintType.MUST)
		
		var constraints = new Array(a1,a2)
		
		console.log("Entrei aqui para Verificar")
		var dataset = DatasetFactory.getDataset("dsVerificaCodTarefaSolumOS",null,constraints,null)
		console.log("passei sim")
		
		var row = dataset.values
		
		console.log("row")
		console.log(row)
		
		// SE RETORNO É VAZIO OU NULO
		if(row=="" || row==null || row==undefined || row=="null"){
		
			console.log("vou retornar false")
			
			return false
			
		} else {
			// SE NÃO, COD TAREFA É VÁLIDO
			
			console.log("vou retornar true")
			
			return true
			
		}
			
	}
	
}

// MARCA EDITADO PARA OS COMPONENTES DO ITEM
function marcarEditadoComponentes(idCriacao){
	
	var numOS = $("#NUM_OS").val()
	
	var a1 = DatasetFactory.createConstraint("OSCOMPONENTES",numOS,numOS,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("IDCRIACAOCOMPONENTES",idCriacao,idCriacao,ConstraintType.MUST)
	
	var constraints = new Array(a1,a2)	
	var dataset = DatasetFactory.getDataset("dsUpdateEditadoComponentesOS",null,constraints,null)
	
}

// MARCA EDITADO PARA AS ATIVIDADES DO PROCESSO DO ITEM
function marcarEditadoProcesso(idCriacao){
	
	var numOS = $("#NUM_OS").val()
		
	var a1 = DatasetFactory.createConstraint("OSPROCESSO",numOS,numOS,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("IDCRIACAOPROCESSO",idCriacao,idCriacao,ConstraintType.MUST)
	
	var constraints = new Array(a1,a2)	
	var dataset = DatasetFactory.getDataset("dsUpdateEditadoProcessoOS",null,constraints,null)
	
}

// UPDATE NOS ITENS DA TABELA DE ESTRUTURA
function atualizaEstrutura(){
	
	var numOS = $("#NUM_OS").val()
	
	var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	var constraints = new Array(a1)	
	var dataset = DatasetFactory.getDataset("dsInfoEstruturaOS",null,constraints,null)
	var row = dataset.values
	var rep = row[0]
	
	var companyid = rep["companyid"]
	var cardid = rep["cardid"]
	var documentid = rep["documentid"]
	var version = rep["version"]
	var tableid = rep["tableid"]
	
	var dataset = DatasetFactory.getDataset("dsMaxIdEstruturaOS",null,null,null)
	var row = dataset.values
	var rep = row[0]
	
	var id = rep["IDMAX"]
	id = parseInt(id)
	
	console.log("companyid: "+companyid+", cardid: "+cardid+", documentid: "+documentid+", version: "+version+", tableid:"+tableid+", MaxIdEstrutura: "+id)
	
	// PERCORRE A TABELA E COLETA TODOS OS REGISTROS
	$('input[id^="NIVEL___"]').each(function(index, value){
	
		console.log("companyid: "+companyid+", cardid: "+cardid+", documentid: "+documentid+", version: "+version+", tableid:"+tableid+", MaxIdEstrutura: "+id)

		// VARIÁVEL PARA O ÍNDICE DA TABELA
		var seq = $(this).attr("id").split("___")[1]
		
		var nivel = $("#NIVEL___"+seq).val()
		var idCriacao = $("#IDCRIACAO___"+seq).val()
		var integrado = $("#INTEGRADO___"+seq).val()
		var incluido = $("#INCLUIDO___"+seq).val()
		var posicaoIndice = $("#POSICAOINDICE___"+seq).val()
		var dscTrfOS = $("#DSCTRFOS___"+seq).val()
		var indiceAntigo = $("#INDICEANTIGO___"+seq).val()
		var posicaoDesenho = $("#POSICAODESENHO___"+seq).val()
		var codTrfOS = $("#CODTRFOS___"+seq).val()
		var descricao = $("#DESCRICAO___"+seq).val()
		var numDesenho = $("#NUMDESENHO___"+seq).val()
		var revisaoDesenho = $("#REVISAODESENHO___"+seq).val()
		var numDbi = $("#NUMDBI___"+seq).val()
		var revisaoDbi = $("#REVISAODBI___"+seq).val()
		var desQtde = $("#DESQTDE___"+seq).val()
		var totalQtde = $("#TOTALQTDE___"+seq).val()
		var espessura = $("#ESPESSURA___"+seq).val()
		var ordem = $("#ORDEM___"+seq).val()
		var bitola = $("#BITOLA___"+seq).val()
		var solicitacao = $("#SOLICITACAO___"+seq).val()
		var largura = $("#LARGURA___"+seq).val()
		var paiDetalhado = $("#PAIDETALHADO___"+seq).val()
		var massaLinear = $("#MASSALINEAR___"+seq).val()
		var comporLista = $("#COMPORLISTA___"+seq).val()
		var diametroExt = $("#DIAMETROEXTERNO___"+seq).val()
		var diametroInt = $("#DIAMETROINTERNO___"+seq).val()
		var espRosca = $("#ESPROSCA___"+seq).val()
		var comprimento = $("#COMPRIMENTO___"+seq).val()
		var material = $("#MATERIAL___"+seq).val()
		var idMaterial = $("#IDMATERIAL___"+seq).val()
		var codPrdMaterial = $("#CODIGOPRDMATERIAL___"+seq).val()
		var areaSecao = $("#AREASECAO___"+seq).val()
		var tipoDesenho = $("#TIPODESENHO___"+seq).val()
		var undMedida = $("#UNDMEDIDA___"+seq).val()
		var seqOS = $("#SEQ___"+seq).val()
		var numOS = $("#OS___"+seq).val()
		var dataRevisao = $("#DATAREVISAO___"+seq).val()
		var pesoBruto = $("#PESOBRUTO___"+seq).val()
		var pesoLiquido = $("#PESOLIQUIDO___"+seq).val()
		var obsDesenho = $("#OBSERVACOESDESENHO___"+seq).val()
		var perimetroCorte = $("#PERIMETROCORTE___"+seq).val()
		var areaPintura = $("#AREAPINTURA___"+seq).val()
		var indice = $("#INDICE___"+seq).val()
		var altura = $("#ALTURA___"+seq).val()
		var larguraAba = $("#LARGURAABA___"+seq).val()
		var espAlma = $("#ESPALMA___"+seq).val()
		var espAba = $("#ESPABA___"+seq).val()
		var produtoRM = $("#PRODUTORM___"+seq).val()
		var idPrd = $("#IDPRD___"+seq).val()
		var codigoPrd = $("#CODIGOPRD___"+seq).val()
		var expansor = $("#EXPANSOR___"+seq).val()
		var obsProcesso = $("#OBSPROCESSO___"+seq).val()
		var obsGeral = $("#OBSGERAL___"+seq).val()
		var editado = $("#EDITADO___"+seq).val()
		
		console.log("integrado: "+integrado+", incluido: "+incluido+", editado: "+editado)
		
		// CONSTRÓI AS CONSTRAINTS
		var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
		var c2 = DatasetFactory.createConstraint("NIVEL",nivel,nivel,ConstraintType.MUST)
		var c3 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
		var c4 = DatasetFactory.createConstraint("INTEGRADO",integrado,integrado,ConstraintType.MUST)
		var c5 = DatasetFactory.createConstraint("POSICAOINDICE",posicaoIndice,posicaoIndice,ConstraintType.MUST)
		var c6 = DatasetFactory.createConstraint("DSCTRFOS",dscTrfOS,dscTrfOS,ConstraintType.MUST)
		var c7 = DatasetFactory.createConstraint("INDICEANTIGO",indiceAntigo,indiceAntigo,ConstraintType.MUST)
		var c8 = DatasetFactory.createConstraint("POSICAODESENHO",posicaoDesenho,posicaoDesenho,ConstraintType.MUST)
		var c9 = DatasetFactory.createConstraint("CODTRFOS",codTrfOS,codTrfOS,ConstraintType.MUST)
		var c10 = DatasetFactory.createConstraint("DESCRICAO",descricao,descricao,ConstraintType.MUST)
		var c11 = DatasetFactory.createConstraint("NUMDESENHO",numDesenho,numDesenho,ConstraintType.MUST)
		var c12 = DatasetFactory.createConstraint("REVISAODESENHO",revisaoDesenho,revisaoDesenho,ConstraintType.MUST)
		var c13 = DatasetFactory.createConstraint("NUMDBI",numDbi,numDbi,ConstraintType.MUST)
		var c14 = DatasetFactory.createConstraint("REVISAODBI",revisaoDbi,revisaoDbi,ConstraintType.MUST)
		var c15 = DatasetFactory.createConstraint("DESQTDE",desQtde,desQtde,ConstraintType.MUST)
		var c16 = DatasetFactory.createConstraint("TOTALQTDE",totalQtde,totalQtde,ConstraintType.MUST)
		var c17 = DatasetFactory.createConstraint("ESPESSURA",espessura,espessura,ConstraintType.MUST)
		var c18 = DatasetFactory.createConstraint("ORDEM",ordem,ordem,ConstraintType.MUST)
		var c19 = DatasetFactory.createConstraint("BITOLA",bitola,bitola,ConstraintType.MUST)
		var c20 = DatasetFactory.createConstraint("SOLICITACAO",solicitacao,solicitacao,ConstraintType.MUST)
		var c21 = DatasetFactory.createConstraint("LARGURA",largura,largura,ConstraintType.MUST)
		var c22 = DatasetFactory.createConstraint("PAIDETALHADO",paiDetalhado,paiDetalhado,ConstraintType.MUST)
		var c23 = DatasetFactory.createConstraint("MASSALINEAR",massaLinear,massaLinear,ConstraintType.MUST)
		var c24 = DatasetFactory.createConstraint("COMPORLISTA",comporLista,comporLista,ConstraintType.MUST)
		var c25 = DatasetFactory.createConstraint("DIAMETROEXTERNO",diametroExt,diametroExt,ConstraintType.MUST)
		var c26 = DatasetFactory.createConstraint("DIAMETROINTERNO",diametroInt,diametroInt,ConstraintType.MUST)
		var c27 = DatasetFactory.createConstraint("ESPROSCA",espRosca,espRosca,ConstraintType.MUST)
		var c28 = DatasetFactory.createConstraint("COMPRIMENTO",comprimento,comprimento,ConstraintType.MUST)
		var c29 = DatasetFactory.createConstraint("MATERIAL",material,material,ConstraintType.MUST)
		var c30 = DatasetFactory.createConstraint("IDMATERIAL",idMaterial,idMaterial,ConstraintType.MUST)
		var c31 = DatasetFactory.createConstraint("CODIGOPRDMATERIAL",codPrdMaterial,codPrdMaterial,ConstraintType.MUST)
		var c32 = DatasetFactory.createConstraint("AREASECAO",areaSecao,areaSecao,ConstraintType.MUST)
		var c33 = DatasetFactory.createConstraint("TIPODESENHO",tipoDesenho,tipoDesenho,ConstraintType.MUST)
		var c34 = DatasetFactory.createConstraint("UNDMEDIDA",undMedida,undMedida,ConstraintType.MUST)
		var c35 = DatasetFactory.createConstraint("SEQ",seqOS,seqOS,ConstraintType.MUST)
		var c36 = DatasetFactory.createConstraint("DATAREVISAO",dataRevisao,dataRevisao,ConstraintType.MUST)
		var c37 = DatasetFactory.createConstraint("PESOBRUTO",pesoBruto,pesoBruto,ConstraintType.MUST)
		var c38 = DatasetFactory.createConstraint("PESOLIQUIDO",pesoLiquido,pesoLiquido,ConstraintType.MUST)
		var c39 = DatasetFactory.createConstraint("OBSERVACOESDESENHO",obsDesenho,obsDesenho,ConstraintType.MUST)
		var c40 = DatasetFactory.createConstraint("PERIMETROCORTE",perimetroCorte,perimetroCorte,ConstraintType.MUST)
		var c41 = DatasetFactory.createConstraint("AREAPINTURA",areaPintura,areaPintura,ConstraintType.MUST)
		var c42 = DatasetFactory.createConstraint("INDICE",indice,indice,ConstraintType.MUST)
		var c43 = DatasetFactory.createConstraint("ALTURA",altura,altura,ConstraintType.MUST)
		var c44 = DatasetFactory.createConstraint("LARGURAABA",larguraAba,larguraAba,ConstraintType.MUST)
		var c45 = DatasetFactory.createConstraint("ESPALMA",espAlma,espAlma,ConstraintType.MUST)
		var c46 = DatasetFactory.createConstraint("ESPABA",espAba,espAba,ConstraintType.MUST)
		var c47 = DatasetFactory.createConstraint("PRODUTORM",produtoRM,produtoRM,ConstraintType.MUST)
		var c48 = DatasetFactory.createConstraint("IDPRD",idPrd,idPrd,ConstraintType.MUST)
		var c49 = DatasetFactory.createConstraint("CODIGOPRD",codigoPrd,codigoPrd,ConstraintType.MUST)
		var c50 = DatasetFactory.createConstraint("EXPANSOR",expansor,expansor,ConstraintType.MUST)
		var c51 = DatasetFactory.createConstraint("OBSPROCESSO",obsProcesso,obsProcesso,ConstraintType.MUST)
		var c52 = DatasetFactory.createConstraint("OBSGERAL",obsGeral,obsGeral,ConstraintType.MUST)
		var c53 = DatasetFactory.createConstraint("companyid",companyid,companyid,ConstraintType.MUST)
		var c54 = DatasetFactory.createConstraint("cardid",cardid,cardid,ConstraintType.MUST)
		var c55 = DatasetFactory.createConstraint("documentid",documentid,documentid,ConstraintType.MUST)
		var c56 = DatasetFactory.createConstraint("version",version,version,ConstraintType.MUST)
		var c57 = DatasetFactory.createConstraint("tableid",tableid,tableid,ConstraintType.MUST)
		
		var constraints = new Array(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c14,c15,c16,c17,c18,c19,c20,c21,c22,c23,c24,c25,c26,c27,c28,c29,c30,c31,c32,c33,c34,c35,c36,c37,c38,c39,c40,c41,c42,c43,c44,c45,c46,c47,c48,c49,c50,c51,c52,c53,c54,c55,c56,c57)

		// SE ITEM JÁ FOI INTEGRADO OU JÁ FOI INCLUÍDO E FOI EDITADO
		if((integrado=='SIM' || incluido=='SIM') && editado=="SIM"){
			
			console.log("VOU ATUALIZAR A ESTRUTURA do IDCRIACAO: "+idCriacao+", NA OS: "+numOS)
			
			var dataset = DatasetFactory.getDataset("dsUpdateItemOS",null,constraints,null)
			
			// LIMPA O CAMPO DE EDIÇÃO DA ESTRUTURA
			$("#EDITADO___"+seq).val("")
			
		} 
		
		// SE NÃO FOI INTEGRADO E AINDA NÃO FOI INCLUÍDO
		if((integrado=="" || integrado==null || integrado==undefined) && (incluido=="" || incluido==null || incluido==undefined)){
			
			id +=1
			var c58 = DatasetFactory.createConstraint("ID",id,id,ConstraintType.MUST)
			
			constraints = new Array(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c14,c15,c16,c17,c18,c19,c20,c21,c22,c23,c24,c25,c26,c27,c28,c29,c30,c31,c32,c33,c34,c35,c36,c37,c38,c39,c40,c41,c42,c43,c44,c45,c46,c47,c48,c49,c50,c51,c52,c53,c54,c55,c56,c57,c58)
			
			console.log("VOU INSERIR ITEM NA ESTRUTURA COM O IDCRIACAO: "+idCriacao+", NA OS: "+numOS)
			
			var dataset = DatasetFactory.getDataset("dsInsertItemOS",null,constraints,null)
			
			// SALVO NA TABELA QUE JÁ FOI INCLUÍDO
			$("#INCLUIDO___"+seq).val("SIM")
			
		}
		
	})
	
}

// UPDATE NOS ITENS DA TABELA DE COMPONENTES
function atualizaComponentes(){
	
	var numOS = $("#NUM_OS").val()
	
	var a1 = DatasetFactory.createConstraint("OSCOMPONENTES",numOS,numOS,ConstraintType.MUST)
	var constraints = new Array(a1)	
	var dataset = DatasetFactory.getDataset("dsInfoComponentesOS",null,constraints,null)
	var row = dataset.values
	var rep = row[0]
	
	var companyid = rep["companyid"]
	var cardid = rep["cardid"]
	var documentid = rep["documentid"]
	var version = rep["version"]
	var tableid = rep["tableid"]
	
	var dataset = DatasetFactory.getDataset("dsMaxIdComponentesOS",null,null,null)
	var row = dataset.values
	var rep = row[0]
	
	var id = rep["IDMAX"]
	id = parseInt(id)
	
	console.log("companyid: "+companyid+", cardid: "+cardid+", documentid: "+documentid+", version: "+version+", tableid:"+tableid+", MaxIdComponentes: "+id)
	
	// PERCORRE A TABELA E COLETA TODOS OS REGISTROS
	$('input[id^="PRODUTOCOMPONENTES___"]').each(function(index, value){
		
		console.log("companyid: "+companyid+", cardid: "+cardid+", documentid: "+documentid+", version: "+version+", tableid:"+tableid+", MaxIdComponentes: "+id)
		
		// VARIÁVEL PARA O ÍNDICE DA TABELA
		var seq = $(this).attr("id").split("___")[1]
		
		var produtoComp = $("#PRODUTOCOMPONENTES___"+seq).val()
		var incluidoComp = $("#INCLUIDOCOMPONENTES___"+seq).val()
		var idComponentes = $("#IDCOMPONENTES___"+seq).val()
		var idPrdComponentes = $("#IDPRDCOMPONENTES___"+seq).val()
		var codPrdComponentes = $("#CODIGOPRDCOMPONENTES___"+seq).val()
		var codUndComponentes = $("#CODUNDCOMPONENTES___"+seq).val()
		var idCriacaoComp = $("#IDCRIACAOCOMPONENTES___"+seq).val()
		var solicitacaoComp = $("#SOLICITACAOCOMPONENTES___"+seq).val()
		var qtdeUnComp = $("#QTDEUNCOMPONENTES___"+seq).val()
		var qtdeTotalComp = $("#QTDETOTALCOMPONENTES___"+seq).val()
		var substitutoComp = $("#SUBSTITUTOCOMPONENTES___"+seq).val()
		var insumoComp = $("#INSUMOCOMPONENTES___"+seq).val()
		var osComp = $("#OSCOMPONENTES___"+seq).val()
		var listaComp = $("#LISTACOMPONENTES___"+seq).val()
		var integradoComp = $("#INTEGRADOCOMPONENTES___"+seq).val()
		var editadoComp = $("#EDITADOCOMPONENTES___"+seq).val()
		
		console.log("integradoComp: "+integradoComp+", incluidoComp: "+incluidoComp+", editadoComp: "+editadoComp)
		
		// CONSTRÓI AS CONSTRAINTS
		var c1 = DatasetFactory.createConstraint("PRODUTOCOMPONENTES",produtoComp,produtoComp,ConstraintType.MUST)
		var c2 = DatasetFactory.createConstraint("IDCOMPONENTES",idComponentes,idComponentes,ConstraintType.MUST)
		var c3 = DatasetFactory.createConstraint("IDPRDCOMPONENTES",idPrdComponentes,idPrdComponentes,ConstraintType.MUST)
		var c4 = DatasetFactory.createConstraint("CODIGOPRDCOMPONENTES",codPrdComponentes,codPrdComponentes,ConstraintType.MUST)
		var c5 = DatasetFactory.createConstraint("CODUNDCOMPONENTES",codUndComponentes,codUndComponentes,ConstraintType.MUST)
		var c6 = DatasetFactory.createConstraint("IDCRIACAOCOMPONENTES",idCriacaoComp,idCriacaoComp,ConstraintType.MUST)
		var c7 = DatasetFactory.createConstraint("SOLICITACAOCOMPONENTES",solicitacaoComp,solicitacaoComp,ConstraintType.MUST)
		var c8 = DatasetFactory.createConstraint("QTDEUNCOMPONENTES",qtdeUnComp,qtdeUnComp,ConstraintType.MUST)
		var c9 = DatasetFactory.createConstraint("QTDETOTALCOMPONENTES",qtdeTotalComp,qtdeTotalComp,ConstraintType.MUST)
		var c10 = DatasetFactory.createConstraint("SUBSTITUTOCOMPONENTES",substitutoComp,substitutoComp,ConstraintType.MUST)
		var c11 = DatasetFactory.createConstraint("INSUMOCOMPONENTES",insumoComp,insumoComp,ConstraintType.MUST)
		var c12 = DatasetFactory.createConstraint("OSCOMPONENTES",osComp,osComp,ConstraintType.MUST)
		var c13 = DatasetFactory.createConstraint("LISTACOMPONENTES",listaComp,listaComp,ConstraintType.MUST)
		var c14 = DatasetFactory.createConstraint("INTEGRADOCOMPONENTES",integradoComp,integradoComp,ConstraintType.MUST)
		var c15 = DatasetFactory.createConstraint("companyid",companyid,companyid,ConstraintType.MUST)
		var c16 = DatasetFactory.createConstraint("cardid",cardid,cardid,ConstraintType.MUST)
		var c17 = DatasetFactory.createConstraint("documentid",documentid,documentid,ConstraintType.MUST)
		var c18 = DatasetFactory.createConstraint("version",version,version,ConstraintType.MUST)
		var c19 = DatasetFactory.createConstraint("tableid",tableid,tableid,ConstraintType.MUST)
		
		var constraints = new Array(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c14,c15,c16,c17,c18,c19)

		// SE COMPONENTE FOI INTEGRADO OU NÃO FOI INCLUÍDO AINDA, ATUALIZA
		if((integradoComp=="SIM" || incluidoComp=="SIM") && editadoComp=="SIM"){
			
			console.log("VOU ATUALIZAR ITEM NA TABELA DE COMPONENTES COM O IDCRIACAO: "+idCriacaoComp+", NA OS: "+osComp)
			
			var dataset = DatasetFactory.getDataset("dsUpdateComponentesOS",null,constraints,null)
			
			// LIMPA O CAMPO DE EDIÇÃO DO COMPONENTE
			$("#EDITADOCOMPONENTES___"+seq).val("")
			
		} 
		
		// SE NÃO FOI INTEGRADO E AINDA NÃO FOI INCLUÍDO
		if((integradoComp=="" || integradoComp==null || integradoComp==undefined) && (incluidoComp=="" || incluidoComp==null || incluidoComp==undefined)){
			
			console.log("VOU INSERIR ITEM NA TABELA DE COMPONENTES COM O IDCRIACAO: "+idCriacaoComp+", NA OS: "+osComp)
			
			id +=1
			var c20 = DatasetFactory.createConstraint("ID",id,id,ConstraintType.MUST)
			constraints = new Array(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c14,c15,c16,c17,c18,c19,c20)
			
			var dataset = DatasetFactory.getDataset("dsInsertComponentesOS",null,constraints,null)
			
			// SALVO NA TABELA QUE JÁ FOI INCLUÍDO
			$("#INCLUIDOCOMPONENTES___"+seq).val("SIM")
			
		}
		
	})
	
}

// UPDATE NOS ITENS DA TABELA DE PROCESSO
function atualizaProcesso(){
	
	var numOS = $("#NUM_OS").val()
	
	var a1 = DatasetFactory.createConstraint("OSPROCESSO",numOS,numOS,ConstraintType.MUST)
	var constraints = new Array(a1)	
	var dataset = DatasetFactory.getDataset("dsInfoProcessoOS",null,constraints,null)
	var row = dataset.values
	var rep = row[0]
	
	var companyid = rep["companyid"]
	var cardid = rep["cardid"]
	var documentid = rep["documentid"]
	var version = rep["version"]
	var tableid = rep["tableid"]
	
	var dataset = DatasetFactory.getDataset("dsMaxIdProcessoOS",null,null,null)
	var row = dataset.values
	var rep = row[0]
	
	var id = rep["IDMAX"]
	id = parseInt(id)
	
	console.log("companyid: "+companyid+", cardid: "+cardid+", documentid: "+documentid+", version: "+version+", tableid:"+tableid+", MaxIdProcesso: "+id)

	// PERCORRE A TABELA E COLETA TODOS OS REGISTROS
	$('input[id^="PRIORIDADE___"]').each(function(index, value){
	
		// VARIÁVEL PARA O ÍNDICE DA TABELA
		var seq = $(this).attr("id").split("___")[1]
			
		var prioridade = $("#PRIORIDADE___"+seq).val()
		var incluidoProc = $("#INCLUIDOPROCESSO___"+seq).val()
		var idCriacaoProc = $("#IDCRIACAOPROCESSO___"+seq).val()
		var solicitacaoProc = $("#SOLICITACAOPROCESSO___"+seq).val()
		var codAtividade = $("#CODATIVIDADE___"+seq).val()
		var osProcesso = $("#OSPROCESSO___"+seq).val()
		var idProcesso = $("#IDPROCESSO___"+seq).val()
		var descAtividade = $("#DESCATIVIDADE___"+seq).val()
		var habilidade = $("#HABILIDADEREQUERIDA___"+seq).val()
		var codHabilidade = $("#CODHABILIDADE___"+seq).val()
		var codPosto = $("#CODPOSTO___"+seq).val()
		var descPosto = $("#DESCPOSTO___"+seq).val()
		var fila = $("#FILA___"+seq).val()
		var configuracao = $("#CONFIGURACAO___"+seq).val()
		var processamento = $("#PROCESSAMENTO___"+seq).val()
		var desagregacao = $("#DESAGREGACAO___"+seq).val()
		var espera = $("#ESPERA___"+seq).val()
		var movimentacao = $("#MOVIMENTACAO___"+seq).val()
		var minutosGastos = $("#MINUTOSGASTOS___"+seq).val()
		var descProcesso = $("#DESCPROCESSO___"+seq).val()
		var docApoioAtv1 = $("#DOCAPOIOATV1___"+seq).val()
		var docApoioAtv2 = $("#DOCAPOIOATV2___"+seq).val()
		var docApoioAtv3 = $("#DOCAPOIOATV3___"+seq).val()
		var docApoioAtv4 = $("#DOCAPOIOATV4___"+seq).val()
		var fornPara = $("#FORNPARA___"+seq).val()
		var integradoProc = $("#INTEGRADOPROCESSO___"+seq).val()
		var editadoProc = $("#EDITADOPROCESSO___"+seq).val()
		
		console.log("integradoProc: "+integradoProc+", incluidoProc: "+incluidoProc+", editadoProc: "+editadoProc)
		
		// CONSTRÓI AS CONSTRAINTS
		var c1 = DatasetFactory.createConstraint("PRIORIDADE",prioridade,prioridade,ConstraintType.MUST)
		var c2 = DatasetFactory.createConstraint("IDCRIACAOPROCESSO",idCriacaoProc,idCriacaoProc,ConstraintType.MUST)
		var c3 = DatasetFactory.createConstraint("SOLICITACAOPROCESSO",solicitacaoProc,solicitacaoProc,ConstraintType.MUST)
		var c4 = DatasetFactory.createConstraint("CODATIVIDADE",codAtividade,codAtividade,ConstraintType.MUST)
		var c5 = DatasetFactory.createConstraint("OSPROCESSO",osProcesso,osProcesso,ConstraintType.MUST)
		var c6 = DatasetFactory.createConstraint("IDPROCESSO",idProcesso,idProcesso,ConstraintType.MUST)
		var c7 = DatasetFactory.createConstraint("DESCATIVIDADE",descAtividade,descAtividade,ConstraintType.MUST)
		var c8 = DatasetFactory.createConstraint("HABILIDADEREQUERIDA",habilidade,habilidade,ConstraintType.MUST)
		var c9 = DatasetFactory.createConstraint("CODHABILIDADE",codHabilidade,codHabilidade,ConstraintType.MUST)
		var c10 = DatasetFactory.createConstraint("CODPOSTO",codPosto,codPosto,ConstraintType.MUST)
		var c11 = DatasetFactory.createConstraint("DESCPOSTO",descPosto,descPosto,ConstraintType.MUST)
		var c12 = DatasetFactory.createConstraint("FILA",fila,fila,ConstraintType.MUST)
		var c13 = DatasetFactory.createConstraint("CONFIGURACAO",configuracao,configuracao,ConstraintType.MUST)
		var c14 = DatasetFactory.createConstraint("PROCESSAMENTO",processamento,processamento,ConstraintType.MUST)
		var c15 = DatasetFactory.createConstraint("DESAGREGACAO",desagregacao,desagregacao,ConstraintType.MUST)
		var c16 = DatasetFactory.createConstraint("ESPERA",espera,espera,ConstraintType.MUST)
		var c17 = DatasetFactory.createConstraint("MOVIMENTACAO",movimentacao,movimentacao,ConstraintType.MUST)
		var c18 = DatasetFactory.createConstraint("MINUTOSGASTOS",minutosGastos,minutosGastos,ConstraintType.MUST)
		var c19 = DatasetFactory.createConstraint("DESCPROCESSO",descProcesso,descProcesso,ConstraintType.MUST)
		var c20 = DatasetFactory.createConstraint("DOCAPOIOATV1",docApoioAtv1,docApoioAtv1,ConstraintType.MUST)
		var c21 = DatasetFactory.createConstraint("DOCAPOIOATV2",docApoioAtv2,docApoioAtv2,ConstraintType.MUST)
		var c22 = DatasetFactory.createConstraint("DOCAPOIOATV3",docApoioAtv3,docApoioAtv3,ConstraintType.MUST)
		var c23 = DatasetFactory.createConstraint("DOCAPOIOATV4",docApoioAtv4,docApoioAtv4,ConstraintType.MUST)
		var c24 = DatasetFactory.createConstraint("FORNPARA",fornPara,fornPara,ConstraintType.MUST)
		var c25 = DatasetFactory.createConstraint("INTEGRADOPROCESSO",integradoProc,integradoProc,ConstraintType.MUST)
		var c26 = DatasetFactory.createConstraint("companyid",companyid,companyid,ConstraintType.MUST)
		var c27 = DatasetFactory.createConstraint("cardid",cardid,cardid,ConstraintType.MUST)
		var c28 = DatasetFactory.createConstraint("documentid",documentid,documentid,ConstraintType.MUST)
		var c29 = DatasetFactory.createConstraint("version",version,version,ConstraintType.MUST)
		var c30 = DatasetFactory.createConstraint("tableid",tableid,tableid,ConstraintType.MUST)
		
		var constraints = new Array(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c14,c15,c16,c17,c18,c19,c20,c21,c22,c23,c24,c25,c26,c27,c28,c29,c30)

		// SE COMPONENTE FOI INTEGRADO OU JÁ FOI INCLUÍDO, ATUALIZA
		if((integradoProc=="SIM" || incluidoProc=="SIM") && editadoProc=="SIM"){
			
			console.log("VOU ATUALIZAR ITEM NA TABELA DE PROCESSO COM O IDCRIACAO: "+idCriacaoProc+", NA OS: "+osProcesso)
			
			var dataset = DatasetFactory.getDataset("dsUpdateProcessoOS",null,constraints,null)
			
			// LIMPA O CAMPO DE EDIÇÃO DO PROCESSO
			$("#EDITADOPROCESSO___"+seq).val("")
			
			
		} 
		
		// SE NÃO FOI INTEGRADO E NÃO FOI INCLUÍDO
		if((integradoProc=="" || integradoProc==null || integradoProc==undefined) && (incluidoProc=="" || incluidoProc==null || incluidoProc==undefined)){
		
			console.log("VOU INSERIR ITEM NA TABELA DE PROCESSO COM O IDCRIACAO: "+idCriacaoProc+", NA OS: "+osProcesso)
			
			id +=1
			var c31 = DatasetFactory.createConstraint("ID",id,id,ConstraintType.MUST)
			constraints = new Array(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c14,c15,c16,c17,c18,c19,c20,c21,c22,c23,c24,c25,c26,c27,c28,c29,c30,c31)
			
			var dataset = DatasetFactory.getDataset("dsInsertProcessoOS",null,constraints,null)
			
			// SALVO NA TABELA QUE JÁ FOI INCLUÍDO
			$("#INCLUIDOPROCESSO___"+seq).val("SIM")
			
		}
		
	})
	
}

// BUSCA SE O ÍNDICE TEM FILHOS
function filhoIndice(indice){
	
	var filho = false
	
	// PERCORRE A TABELA E COLETA TODOS OS NÍVEIS
	$('input[id^="NIVEL___"]').each(function(index, value){
	
		// VARIÁVEL PARA O ÍNDICE DA TABELA
		var seq = $(this).attr("id").split("___")[1]

		// SE O NÍVEL DA TABELA É IGUAL AO ÍNDICE DO ARRAY
		if($("#NIVEL___"+seq).val()==indice){
			
			console.log("tem filho")
			
			filho = true
			
		}
		
	})
	
	return filho
	
}

// INCLUIR TAREFA
function incluirTarefa(){
	
	// MOSTRA/ESCONDE CAMPOS
	$(".INFO_TAREFA").show()
	$(".divCroqui").hide()
	$(".BOTOES_CAB").hide()
	$(".SOLABERTAS").hide()
	
	var idprj = $("#IDPRJ_OS").val()
	
	// RELOAD ZOOM NO CÓDIGO DA TAREFA
	reloadZoomFilterValues("CODIGOTAREFA", "IDPRJ,"+idprj);
	
	console.log("fiz o reload com o IDPRJ: "+idprj)
	
}

// VOLTA PARA A VIEW
function voltarTarefa(){
	
	$(".INFO_TAREFA").hide()
	$(".VIEW").show()
	$(".divCroqui").show()
	
	// LIMPA OS CAMPOS DA TAREFA
	$("#CODIGOTAREFA>option").remove()
	$("#CODTRF").val("")
	$("#IDTRF").val("")
	$("#NOMETRF").val("")
		
	// SE TABELA TEM ITENS E NÃO TEM ITEM DETALHADO
	if(tabelaTemItens()){// && !temItemDetalhado()){
		
		//$(".BOTOES_CAB").show()
		
		// ATIVA O LOAD
		ativaSpinner()
		
		setTimeout(function(){
			
			atualizar()
			
		},200)
		
		// DESATIVA O LOAD
		desativaSpinner()
		
	} else {
		
		$(".BOTOES_CAB").hide()
		
	}
	
}

// SALVAR A TAREFA SELECIONADA
function salvarTarefa(){
	
	$(".INFO_TAREFA").hide()
	$(".divCroqui").show()
	$(".SOLABERTAS").show()
	
	ativaSpinner()
	
	setTimeout(function(){
	
		// SE TABELA TEM ITENS E NÃO TEM ITEM DETALHADO
		if(tabelaTemItens()){
			
			// SE NÃO TEM ITEM SENDO DETALHADO EM OUTRA SOLICITAÇÃO
			if(!temItemDetalhado()){
			
				// ATIVA O LOAD
				ativaSpinner()
				
				setTimeout(function(){
					
					atualizar()
					
				},200)
				
				// DESATIVA O LOAD
				desativaSpinner()
				
			} else {
				
				$(".BOTOES_CAB").hide()
				
			}
			
			// SALVAR A TAREFA EM TODOS OS ITENS DA TABELA
			salvarTarefaTabela()
			
		}
		
		// ATUALIZAR VIEW
		atualizar()
		
	},500)
	
	setTimeout(function(){
	
		desativaSpinner()
	
	},500)
		
}

// SALVAR A TAREFA EM TODOS OS ITENS DA TABELA
function salvarTarefaTabela(){
	
	var codTarefa = $("#CODTRF").val()
	var descTarefa = $("#NOMETRF").val()
	var idTrf = $("#IDTRF").val()
	var numOS = $("#NUM_OS").val()
	
	var a1 = DatasetFactory.createConstraint("CODTRFOS",codTarefa,codTarefa,ConstraintType.MUST);
	var a2 = DatasetFactory.createConstraint("NOMETRFOS",descTarefa,descTarefa,ConstraintType.MUST);
	var a3 = DatasetFactory.createConstraint("IDTRFOS",idTrf,idTrf,ConstraintType.MUST);
	var a4 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
	
	var constraints = new Array(a1,a2,a3,a4);
	
	dataset = DatasetFactory.getDataset("dsUpdateCodTarefaGeralOS",null,constraints,null);
	
}

// CANCELA A TELA DA COPIA DA OS
function cancelarCopia(){
	
	console.log("entrei para cancelar a copia da OS")
	
	$(".OS_COPIA").hide()
	$(".VIEW").show()
	$(".divCroqui").show()
	
	// SE TABELA TEM ITENS E NÃO TEM ITEM DETALHADO
	if(tabelaTemItens() && !temItemDetalhado()){
	
		// ATIVA O LOAD
		ativaSpinner()
		
		setTimeout(function(){
			
			atualizar()
			
		},200)
		
		// DESATIVA O LOAD
		desativaSpinner()
		
	} else {
		
		$(".BOTOES_CAB").hide()
		
	}
	
	// SALVO INFORMAÇÃO DO EXCLUSIVO1 PARA EDITAR
	$("#EXCLUSIVO1").val("EDITAR")
	
	// MOVIMENTA A SOLICITAÇÃO PARA SALVAR A NUMERAÇÃO DELA
	$("#workflowActions > button:first-child", window.parent.document).click();
	
}

// FAZ A EXPANSÃO DOS FILHOS DO ITEM
function expandir(idIndice, arrayIdCriacao){

	console.log("entrei para expandir SPAN"+idIndice)
	
	var numOS = $("#NUM_OS").val()
	var execucao = $("#EXECUCAO_INFO").val()
	
	var idCriacao = arrayIdCriacao
	
	console.log("numOS: "+numOS+", execucao: "+execucao+", idCriacao: "+idCriacao)
	
	// SE A EXECUÇÃO FOI INFORMADA
	/*if( !(execucao=="" || execucao==null || execucao==undefined) ){
		
		var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
		var c2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
		var c3 = DatasetFactory.createConstraint("EXECUCAO",execucao,execucao,ConstraintType.MUST)
	
		var constraints = new Array(c1,c2,c3)
		var dataset = DatasetFactory.getDataset("dsEXSalvaExpandido",null,constraints,null)
		
	} else {
		// SE NÃO
		
		var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
		var c2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
		
		var constraints = new Array(c1,c2)
		var dataset = DatasetFactory.getDataset("dsSalvaExpandido",null,constraints,null)
		
	}*/
		
	$(".SPAN"+idIndice).show()
		
	$("#EXPANDIR"+idIndice+"").hide()
	$("#REDUZIR"+idIndice+"").show()
	
}

// FAZ A REDUÇÃO DOS FILHOS DO ITEM
function reduzir(idIndice,arrayIdCriacao){
	
	console.log("entrei para reduzir SPAN"+idIndice)
	
	var numOS = $("#NUM_OS").val()
	var execucao = $("#EXECUCAO_INFO").val()
	var idCriacao = arrayIdCriacao
	
	console.log("numOS: "+numOS+", execucao: "+execucao+", idCriacao: "+idCriacao)
	
	/*
	// SE A EXECUÇÃO FOI INFORMADA
	if( !(execucao=="" || execucao==null || execucao==undefined) ){
		
		var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
		var c2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
		var c3 = DatasetFactory.createConstraint("EXECUCAO",execucao,execucao,ConstraintType.MUST)
	
		var constraints = new Array(c1,c2,c3)
		var dataset = DatasetFactory.getDataset("dsEXSalvaReduzido",null,constraints,null)
		
	} else {
		// SE NÃO
		
		var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
		var c2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
		
		var constraints = new Array(c1,c2)
		var dataset = DatasetFactory.getDataset("dsSalvaReduzido",null,constraints,null)
		
	}*/
		
	$(".SPAN"+idIndice).hide()
		
	$("#EXPANDIR"+idIndice+"").show()
	$("#REDUZIR"+idIndice+"").hide()
	
}

// FAZ A REDUÇÃO DE TODOS OS ITENS
function reduzirTodos(){
	
	var myLoading2 = FLUIGC.loading(window);
	
	myLoading2.show();
	
	setTimeout(function(){
		
		var indices = retornaArrayIndices()
		
		console.log("vou reduzir")
		
		for(var i=0;i<indices.length;i++){
			
			console.log("indice: "+indices[i])
			
			var indiceAux = indices[i].replace(/\./g,"P")
			var indice = "SPAN"+indiceAux
			//var indice = "SPAN"+(indices[i].replace(/\./g,"P"))
			console.log("span: "+indice)
			
			//$("#"+indice).children("span").children(".REDUZIR").click()
			
			$(".SPAN"+indiceAux).hide()
		
			$("#EXPANDIR"+indiceAux+"").show()
			$("#REDUZIR"+indiceAux+"").hide()
			
		}
		
		// $(".REDUZIRTODOS").hide()
		// $(".EXPANDIRTODOS").show()
	
	},500)
	
	// DESATIVA O LOAD
	setTimeout(function(){
			
		myLoading2.hide();
			
	}, 500)
	
}

// FAZ A EXPANSÃO DE TODOS OS ITENS
function expandirTodos(){
	
	var myLoading2 = FLUIGC.loading(window);
	
	myLoading2.show();
	
	setTimeout(function(){
		
		var indices = retornaArrayIndices()
		
		for(var i=0;i<indices.length;i++){
			
			console.log("indice: "+indices[i])

			var indiceAux = indices[i].replace(/\./g,"P")
			var indice = "SPAN"+indiceAux
			
			//var indice = "SPAN"+(indices[i].replace(/\./g,"P"))
			console.log("span: "+indice)
			
			//$("#"+indice).children("span").children(".EXPANDIR").click()
			
			$(".SPAN"+indiceAux).show()
				
			$("#EXPANDIR"+indiceAux+"").hide()
			$("#REDUZIR"+indiceAux+"").show()
			
		}
		
		// $(".REDUZIRTODOS").show()
		// $(".EXPANDIRTODOS").hide()
	
	},500)
	
	// DESATIVA O LOAD
	setTimeout(function(){
			
		myLoading2.hide();
			
	}, 500)
	
}

// COLOCA A BORDA NA SELEÇÃO DO ONMOUSEOVER
function colocaBordaSelecao(obj){
	
	console.log("vou colocar a borda na seleção")
	
	$(obj).css("border-style","dotted")
	$(obj).css("border-width","1px")
	$(obj).css("background","#c8c8c8")
}

// TIRA A SELEÇÃO CSS DO TEXTO ONMOUSEOUT
function tiraSelecao(obj) {
	
	console.log("vou tirar a seleção do texto")
	
	$(obj).css("border","none")
	$(obj).css("background","#f0f0f0")
	
	// COLOCA A SELEÇÃO NO SPAN
	colocaSelecaoSpan()
	
}

// COLOCA A SELEÇÃO CSS NO TEXTO NO ONCLICK
function colocaSelecao(obj) {
	
	//console.log("entrei para colocar a seleção"
	
	//var ret = $(obj).hasClass("selecionado")
	var ret = $(obj).attr("class");
	
	// ITEM ESTÁ SELECIONADO
	if(ret == "selecionado"){
		
		console.log("item está selecionado, vou retirar a seleção")
		$(obj).removeClass("selecionado")
		$(obj).addClass("click")
		
		// LIMPA OS DADOS DO ÍNDICE
		limpaCabIndice()
		
	}
	else if(ret == "click"){
		// SE NÃO, SE ITEM NÃO ESTÁ SELECIONADO
		
		// PERCORRE TODOS OS SPANS E TIRA SELECAO
		tiraSelecaoSpan()
		
		console.log("item não estava selecionado, vou colocar seleção")
		$(obj).addClass("selecionado")
		$(obj).removeClass("click")
		
	}
	
}

// COLOCA A SELECAO NO ITEM QUE FOI ALTERADO O NÍVEL
function colocaSelecaoItem(indice){
	
	console.log("entrei para colocar a seleção no item "+indice)
	
	indice = indice.toString()
	
	indice = indice.replace(/\./g,"P")
	
	var ret = $("#SPANINTERNO"+indice+"").attr("class");
	console.log("ret: "+ret)
	
	// ITEM ESTÁ SELECIONADO
	if(ret == "selecionado"){
		
		console.log("item está selecionado, vou retirar a seleção")
		$("#SPANINTERNO"+indice+"").removeClass("selecionado")
		$("#SPANINTERNO"+indice+"").addClass("click")
		
		// LIMPA OS DADOS DO ÍNDICE
		limpaCabIndice()
		
	}
	else if(ret == "click"){
		// SE NÃO, SE ITEM NÃO ESTÁ SELECIONADO
		
		// PERCORRE TODOS OS SPANS E TIRA SELECAO
		tiraSelecaoSpan()
		
		console.log("item não estava selecionado, vou colocar seleção")
		$("#SPANINTERNO"+indice+"").addClass("selecionado")
		$("#SPANINTERNO"+indice+"").removeClass("click")
		
		// SIMULA CLIQUE DA SELEÇÃO
		//$("#SPANINTERNO"+indice+"").click()
		
	}
	
}

// TIRA A SELECAO DE TODOS OS SPAN'S DA VIEW
function tiraSelecaoSpan(){
	
	// PERCORRE TODOS SPAN'S DA VIEW E RETIRA SELEÇÕES
	$("span[class^='selecionado']").each(function(index,value){
		
		$(this).removeClass("selecionado")
		$(this).addClass("click")
		$(this).css("background","#f0f0f0")
		$(this).css("border","none")
		//$(this).css("background","#f0f0f0")
		
	})
	
}

// PERCORRE A VIEW E COLOCA BACKGROUND NOS ITENS SELECIONADOS
function colocaSelecaoSpan(){
	
	// PERCORRE TODOS SPAN'S DA VIEW
	$("span[class^='selecionado']").each(function(index,value){
		
		$(this).css("background","#c8c8c8")
		$(this).css("border-style","dotted")
		$(this).css("border-width","1px")
		
	})
	
}

// PREENCHE CABEÇALHO COM AS INFORMAÇÕES DO ITEM
function preencheCab(arrayIdCriacao){
	
	var atv = $("#ATIVIDADE").val()
	
	var numOS = $("#NUM_OS").val()
	var idCriacao = arrayIdCriacao	
	
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	var c2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
	
	var constraints = new Array(c1,c2)
	var dataset = DatasetFactory.getDataset("dsBuscaItemEstruturaOS",null,constraints,null)
	var row = dataset.values
	
	// SE RETORNO NÃO É NULO E NEM VAZIO
	if(!(row=="" || row==null || row==undefined || row=="null")){
		
		var rep = row[0]
		
		// SALVA AS INFORMAÇÕES NO CABEÇALHO
		$("#INDICE_INFO").val(rep["INDICE"])
		$("#NUMDESENHO_INFO").val(rep["NUMDESENHO"])
		$("#DESCRICAO_INFO").val(rep["DESCRICAO"])
		$("#POSICAO_INFO").val(rep["POSICAODESENHO"])
		$("#SEQ_INFO").val(rep["SEQ"])
		
		// COLOCA O FOCO NO CAMPO INDICE
		//$("#INDICE_INFO").focus()
		
		var indice = $("#INDICE_INFO").val()
		console.log("indice: "+indice)
		
		if(!(indice=="")){
			
			// SE INDICE NÃO É O PAI
			if(indice.includes(".")){
				
				// SE TABELA TEM ITENS E NÃO TEM ITEM DETALHADO
				if(tabelaTemItens()){//&& !temItemDetalhado()){
					
					//$(".BOTOES_CAB").show()
					
					// ATIVA O LOAD
					/*ativaSpinner()
					
					setTimeout(function(){
						
						atualizar()
						
					},200)
					
					// DESATIVA O LOAD
					desativaSpinner()*/
				
				} else {
					
					$(".BOTOES_CAB").hide()
					
				}
				
				// EXIBE CAMPOS
				$(".OUTROS_BOTOES").show()
				$(".INCLUIR_IRMAO").show()
				$(".INCLUIR_FILHO").show()
				$(".SOBE_INDICE").show()
				$(".DESCE_INDICE").show()
				$(".AVANCA_INDICE").show()
				$(".RECUA_INDICE").show()
				
				$('#IRMAO_LINK').attr("href", "#abrirModalIndice");
				$('#FILHO_LINK').attr("href", "#abrirModalIndice");
				
			} else {
				// SE É O PAI
				
				// ESCONDE/EXIBE CAMPOS NECESSÁRIOS
				
				// SE TABELA TEM ITENS E NÃO TEM ITEM DETALHADO
				if(tabelaTemItens()){ // && !temItemDetalhado()){
					
					//$(".BOTOES_CAB").show()
					
					// ATIVA O LOAD
					/*ativaSpinner()
					
					setTimeout(function(){
						
						atualizar()
						
					},200)
					
					// DESATIVA O LOAD
					desativaSpinner()*/
					
				} else {
					
					$(".BOTOES_CAB").hide()
					
				}
				
				$(".INFO_INDICE").show()
					
				//$('#IRMAO_LINK').removeAttr('href');
				
			}
			
		} else {
			// SE ESTÁ VAZIO
			
			console.log("indice vazio, vou remover o link")
			
			$('#IRMAO_LINK').removeAttr('href');
			$('#FILHO_LINK').removeAttr('href');
			
		}
		
		if(atv==14){
			
			$(".BOTOES_CAB").hide()
			//$("a").hide()
			
		}
		
	} 
		
}

// PREENCHE FORM SEM VISUALIZAR
function preencheFormSemView(arrayIdCriacao){
	
	// NÃO UTILIZADA
		
}

// REMOVE A SELEÇÃO DO ZOOM ATIVIDADE
function removeSelecaoAtividade(){
	
	// PERCORRE A TABELA E COLETA TODOS OS ITENS
	$('input[id^="VIEWATIVIDADE___"]').each(function(index, value){
		
		// VARIÁVEL PARA O ÍNDICE DA TABELA
		var seq = $(this).attr("id").split("___")[1]
		
		// SE O ZOOM É O SELECIONADO
		if($("#VIEWATIVIDADE___"+seq).hasClass("selecionadoZoom")){
			
			$("#VIEWATIVIDADE___"+seq).removeClass("selecionadoZoom")
			
		}
		
	})
	
}

// REMOVE A SELEÇÃO DO ZOOM ATIVIDADE
function removeSelecaoPosto(){
	
	// PERCORRE A TABELA E COLETA TODOS OS ITENS
	$('input[id^="VIEWPOSTO___"]').each(function(index, value){
		
		// VARIÁVEL PARA O ÍNDICE DA TABELA
		var seq = $(this).attr("id").split("___")[1]
		
		// SE O ZOOM É O SELECIONADO
		if($("#VIEWPOSTO___"+seq).hasClass("selecionadoZoom")){
			
			$("#VIEWPOSTO___"+seq).removeClass("selecionadoZoom")
			
		}
		
	})
	
}

// VERIFICA SE PRIORIDADE JÁ FOI PREENCHIDA NA TABELA
function verificaPrioridade(obj){
	
	console.log("entrei para verificar a prioridade")
	// NÃO UTILIZADA
	
	var prioridadeComp = $(obj).val()
	
	console.log("prioridadeComp: "+prioridadeComp)
	
	var ret = false
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$('input[id^="VIEWPRIORIDADE___"]').each(function(index, value){
		
		var seq = $(this).attr("id").split("___")[1]
	
		var prioridade = $("#VIEWPRIORIDADE___"+seq).val()
		
		// SE PRIORIDADE INSERIDA ESTÁ CONTIDA NA TABELA DOS PROCESSOS
		if(prioridade==prioridadeComp){
			
			ret = true
		
		}
		
	})
	
	if(!ret){
		
		$(obj).val("")
		
		// EXIBE ALERTA
		Swal.fire({
				  icon: 'error',
				  title: 'Essa prioridade não existe na tabela de processos!',
				  text: 'Verifique e tente novamente.'
		})
		
	}
	
}

// CONVERTE PRIORIDADE PARA VALOR INTEIRO
function converteInteiro(obj){
	
	console.log("entrei para vonverter inteiro")
	
	var ret = false
	var seq = $(obj).attr("id").split("___")[1]
	
	var prioridade = $("#VIEWPRIORIDADE___"+seq).val() 
	
	$("#VIEWPRIORIDADE___"+seq).val("")
	
	prioridade = parseInt(prioridade)
	console.log("prioridade "+prioridade)
	
	console.log("vou buscar ela")
	
	// PERCORRE TODOS OS REGISTROS DA TABELA
	$('input[id^="VIEWPRIORIDADE___"]').each(function(index, value){
		
		var seq2 = $(this).attr("id").split("___")[1]
	
		var prioridadeTabela = $("#VIEWPRIORIDADE___"+seq2).val()
		
		prioridadeTabela = parseInt(prioridadeTabela)
		console.log("prioridadeTabela "+prioridadeTabela)
		
		// SE PRIORIDADE QUE ESTÁ SENDO INSERIDA É A MESMA DA LINHA ATUAL
		if(prioridade==prioridadeTabela){
			
			console.log("encontrei")
			ret = true
			
		}
		
	})
	
	// SE PRIORIDADE JÁ FOI INSERIDA NA TABELA
	if(ret){
		
		// EXIBE ALERTA
		Swal.fire({
				  icon: 'error',
				  title: 'Essa prioridade já foi inserida!',
				  text: 'Verifique e tente novamente.'
		})
		
		$("#VIEWPRIORIDADE___"+seq).val("")
		$("#VIEWPRIORIDADE___"+seq).focus()
		
	} else {
		// SE NÃO, SALVA A PRIORIDADE
		
		$("#VIEWPRIORIDADE___"+seq).val(prioridade)
		
	}
	
}

// PREENCHE A TABELA PROCESSOS DO ITEM EM QUESTÃO
function preencheTabelaProcessos(idCriacao){
	
	console.log("entrei para preencher a VIEW de processos")
	
	var numOS = $("#NUM_OS").val()
		
	var c1 = DatasetFactory.createConstraint("OSPROCESSO",numOS,numOS,ConstraintType.MUST)
	var c2 = DatasetFactory.createConstraint("IDCRIACAOPROCESSO",idCriacao,idCriacao,ConstraintType.MUST)
	
	var constraints = new Array(c1,c2)
	var dataset = DatasetFactory.getDataset("dsItensProcessoOS",null,constraints,null)
	var row = dataset.values
	
	// SE RETORNO NÃO É NULO E NEM VAZIO
	if(!(row=="" || row==null || row==undefined || row=="null")){
		
		var count = row.length
		
		// PERCORRE TODOS OS REGISTROS
		for(var i=0; i < count; i++){
			
			var rep = row[i]
			
			var seq = addViewProcesso()
			
			console.log("vou carregar o i tem "+seq)
			
			// SALVA AS INFORMAÇÕES DO PROCESSO NA TABELA DE VISUALIZAÇÃO
			$("#VIEWOSPROCESSO___"+seq).val(rep["OSPROCESSO"])
			$("#VIEWPRIORIDADE___"+seq).val(rep["PRIORIDADE"])
			$("#VIEWIDCRIACAOPROCESSO___"+seq).val(rep["IDCRIACAOPROCESSO"])
			$("#VIEWATIVIDADE___"+seq).val(rep["CODATIVIDADE"]+" - "+rep["DESCATIVIDADE"])
			$("#VIEWCODATIVIDADE___"+seq).val(rep["CODATIVIDADE"])
			$("#VIEWDESCATIVIDADE___"+seq).val(rep["DESCATIVIDADE"])
			$("#VIEWHABILIDADEREQUERIDA___"+seq).val(rep["HABILIDADEREQUERIDA"])
			$("#VIEWCODHABILIDADE___"+seq).val(rep["CODHABILIDADE"])
			$("#VIEWPOSTO___"+seq).val(""+rep["CODPOSTO"]+" - "+rep["DESCPOSTO"])
			$("#VIEWCODPOSTO___"+seq).val(rep["CODPOSTO"])
			$("#VIEWDESCPOSTO___"+seq).val(rep["DESCPOSTO"])
			$("#VIEWFILA___"+seq).val(rep["FILA"])
			$("#VIEWCONFIGURACAO___"+seq).val(rep["CONFIGURACAO"])
			$("#VIEWPROCESSAMENTO___"+seq).val(rep["PROCESSAMENTO"])
			$("#VIEWDESAGREGACAO___"+seq).val(rep["DESAGREGACAO"])
			$("#VIEWESPERA___"+seq).val(rep["ESPERA"])
			$("#VIEWMOVIMENTACAO___"+seq).val(rep["MOVIMENTACAO"])
			$("#VIEWMINUTOSGASTOS___"+seq).val(rep["MINUTOSGASTOS"])
			$("#VIEWDESCPROCESSO___"+seq).val(rep["DESCPROCESSO"])
			$("#VIEWDOCAPOIOATV1___"+seq).val(rep["DOCAPOIOATV1"])
			$("#VIEWDOCAPOIOATV2___"+seq).val(rep["DOCAPOIOATV2"])
			$("#VIEWDOCAPOIOATV3___"+seq).val(rep["DOCAPOIOATV3"])
			$("#VIEWDOCAPOIOATV4___"+seq).val(rep["DOCAPOIOATV4"])
			$("#VIEWFORNPARA___"+seq).val(rep["FORNPARA"])
			$("#VIEWEDITADOPROCESSO___"+seq).val(rep["EDITADOPROCESSO"])
			$("#VIEWINCLUIDOPROCESSO___"+seq).val(rep["INCLUIDOPROCESSO"])
			$("#VIEWINTEGRADOPROCESSO___"+seq).val(rep["INTEGRADOPROCESSO"])
			
		    // ESCONDE/MOSTRA OS ÍCONES
		    $("#EXPANDIR___" + seq).show();
		    $("#REDUZIR___" + seq).hide();
		    
		    // EXIBE A ABA DOS ITENS
		    //$("#LINHA1___"+id).hide()
		    $("#LINHA2___"+seq).hide()
		    $("#LINHA3___"+seq).hide()
		    $("#LINHA4___"+seq).hide()
			
		}
		
	}
	
}

// PREENCHE A TABELA PROCESSOS DO ITEM EM QUESTÃO
function preencheTabelaProcessosEX(idCriacao){
	
	console.log("entrei para preencher a VIEW de processos")
	
	var numOS = $("#NUM_OS").val()
	var execucao = $("#EXECUCAO_INFO").val()	
	
	var c1 = DatasetFactory.createConstraint("OSPROCESSO",numOS,numOS,ConstraintType.MUST)
	var c2 = DatasetFactory.createConstraint("IDCRIACAOPROCESSO",idCriacao,idCriacao,ConstraintType.MUST)
	var c3 = DatasetFactory.createConstraint("EXECUCAO",execucao,execucao,ConstraintType.MUST)
	
	var constraints = new Array(c1,c2,c3)
	var dataset = DatasetFactory.getDataset("dsEXItensProcessoOS",null,constraints,null)
	var row = dataset.values
	
	// SE RETORNO NÃO É NULO E NEM VAZIO
	if(!(row=="" || row==null || row==undefined || row=="null")){
		
		var count = row.length
		
		// PERCORRE TODOS OS REGISTROS
		for(var i=0; i < count; i++){
			
			var rep = row[i]
			
			var seq = addViewProcesso()
			
			console.log("vou carregar o i tem "+seq)
			
			// SALVA AS INFORMAÇÕES DO PROCESSO NA TABELA DE VISUALIZAÇÃO
			$("#VIEWOSPROCESSO___"+seq).val(rep["OSPROCESSO"])
			$("#VIEWPRIORIDADE___"+seq).val(rep["PRIORIDADE"])
			$("#VIEWIDCRIACAOPROCESSO___"+seq).val(rep["IDCRIACAOPROCESSO"])
			$("#VIEWATIVIDADE___"+seq).val(rep["CODATIVIDADE"]+" - "+rep["DESCATIVIDADE"])
			$("#VIEWCODATIVIDADE___"+seq).val(rep["CODATIVIDADE"])
			$("#VIEWDESCATIVIDADE___"+seq).val(rep["DESCATIVIDADE"])
			$("#VIEWHABILIDADEREQUERIDA___"+seq).val(rep["HABILIDADEREQUERIDA"])
			$("#VIEWCODHABILIDADE___"+seq).val(rep["CODHABILIDADE"])
			$("#VIEWPOSTO___"+seq).val(""+rep["CODPOSTO"]+" - "+rep["DESCPOSTO"])
			$("#VIEWCODPOSTO___"+seq).val(rep["CODPOSTO"])
			$("#VIEWDESCPOSTO___"+seq).val(rep["DESCPOSTO"])
			$("#VIEWFILA___"+seq).val(rep["FILA"])
			$("#VIEWCONFIGURACAO___"+seq).val(rep["CONFIGURACAO"])
			$("#VIEWPROCESSAMENTO___"+seq).val(rep["PROCESSAMENTO"])
			$("#VIEWDESAGREGACAO___"+seq).val(rep["DESAGREGACAO"])
			$("#VIEWESPERA___"+seq).val(rep["ESPERA"])
			$("#VIEWMOVIMENTACAO___"+seq).val(rep["MOVIMENTACAO"])
			$("#VIEWMINUTOSGASTOS___"+seq).val(rep["MINUTOSGASTOS"])
			$("#VIEWDESCPROCESSO___"+seq).val(rep["DESCPROCESSO"])
			$("#VIEWDOCAPOIOATV1___"+seq).val(rep["DOCAPOIOATV1"])
			$("#VIEWDOCAPOIOATV2___"+seq).val(rep["DOCAPOIOATV2"])
			$("#VIEWDOCAPOIOATV3___"+seq).val(rep["DOCAPOIOATV3"])
			$("#VIEWDOCAPOIOATV4___"+seq).val(rep["DOCAPOIOATV4"])
			$("#VIEWFORNPARA___"+seq).val(rep["FORNPARA"])
			$("#VIEWEDITADOPROCESSO___"+seq).val(rep["EDITADOPROCESSO"])
			$("#VIEWINCLUIDOPROCESSO___"+seq).val(rep["INCLUIDOPROCESSO"])
			$("#VIEWINTEGRADOPROCESSO___"+seq).val(rep["INTEGRADOPROCESSO"])
			
		    // ESCONDE/MOSTRA OS ÍCONES
		    $("#EXPANDIR___" + seq).show();
		    $("#REDUZIR___" + seq).hide();
		    
		    // EXIBE A ABA DOS ITENS
		    //$("#LINHA1___"+id).hide()
		    $("#LINHA2___"+seq).hide()
		    $("#LINHA3___"+seq).hide()
		    $("#LINHA4___"+seq).hide()
			
		}
		
	}
	
}

// BUSCA QUAL O ITEM DA TABELA FOI SELECIONADO
function buscaSeqZoomAtividade(){
	
	var seqRet = ""
	
	console.log("vou buscar o zoom selecionado")
	
	// PERCORRE A TABELA E COLETA TODOS OS ITENS
	$('input[id^="VIEWATIVIDADE___"]').each(function(index, value){
		
		// VARIÁVEL PARA O ÍNDICE DA TABELA
		var seq = $(this).attr("id").split("___")[1]
		
		// SE O ZOOM É O SELECIONADO
		if($("#VIEWATIVIDADE___"+seq).hasClass("selecionadoZoom")){
			
			seqRet = seq
			
		}
		
	})
	
	console.log("seq selecionado: "+seqRet)
	return seqRet
	
}

// BUSCA QUAL O ITEM DA TABELA FOI SELECIONADO
function buscaSeqZoomPosto(){
	
	var seqRet = ""
	
	console.log("vou buscar o zoom selecionado")
	
	// PERCORRE A TABELA E COLETA TODOS OS ITENS
	$('input[id^="VIEWPOSTO___"]').each(function(index, value){
		
		// VARIÁVEL PARA O ÍNDICE DA TABELA
		var seq = $(this).attr("id").split("___")[1]
		
		// SE O ZOOM É O SELECIONADO
		if($("#VIEWPOSTO___"+seq).hasClass("selecionadoZoom")){
			
			seqRet = seq
			
		}
		
	})
	
	console.log("seq selecionado: "+seqRet)
	return seqRet
	
}

// PREENCHE A TABELA COMPONENTES DO ITEM SELECIONADO QUE ESTÃO NA LISTA DE MATERIAIS
function preencheTabelaComponentesListaMateriais(idCriacao){
	
	console.log("entrei para preencher a VIEW de componentes")
	
	var numOS = $("#NUM_OS").val()
	//var idCriacao = ""
	
	console.log("vou buscar os materiais que foram salvos na lista")
	console.log("idCriacao: "+idCriacao)
	
	var c1 = DatasetFactory.createConstraint("NUMOSSALVOS",numOS,numOS,ConstraintType.MUST)
	var c2 = DatasetFactory.createConstraint("IDCRIACAOSALVOS",idCriacao,idCriacao,ConstraintType.MUST)
	
	var constraints = new Array(c1,c2)
	var dataset = DatasetFactory.getDataset("dsBuscaComponentesListaOS",null,constraints,null)
	var row = dataset.values
	console.log("row "+row)
	
	// SE RETORNO DA CONSULTA NÃO É VAZIO
	if(!(row==null || row=="" || row==undefined || row=="null")){
		
		console.log("ENCONTREI")
		
		var count = dataset.values.length
		
		// PERCORRE TODOS OS REGISTROS ENCONTRADOS
		for(var i=0; i<count; i++){
			
			var rep = row[i]
			
			console.log(rep)
			
			var idprd1 = ""
			var idprd2 = ""
			var idprd3 = ""
			var idprd4 = ""
			var idprd5 = ""
			var idprd6 = ""
			
			// SE INFORMAÇÕES FORAM PREENCHIDAS NA LISTA, SALVA NAS VARIÁVEIS
				
			if(!(rep["IDPRD1SALVOS"]=="" || rep["IDPRD1SALVOS"]==null || rep["IDPRD1SALVOS"]==undefined)){
				idprd1 = rep["IDPRD1SALVOS"]
			}
			
			if(!(rep["IDPRD2SALVOS"]=="" || rep["IDPRD2SALVOS"]==null || rep["IDPRD2SALVOS"]==undefined)){
				idprd2 = rep["IDPRD2SALVOS"]
			}
			
			if(!(rep["IDPRD3SALVOS"]=="" || rep["IDPRD3SALVOS"]==null || rep["IDPRD3SALVOS"]==undefined)){
				idprd3 = rep["IDPRD3SALVOS"]
			}
			
			if(!(rep["IDPRD4SALVOS"]=="" || rep["IDPRD4SALVOS"]==null || rep["IDPRD4SALVOS"]==undefined)){
				idprd4 = rep["IDPRD4SALVOS"]
			}
			
			if(!(rep["IDPRD5SALVOS"]=="" || rep["IDPRD5SALVOS"]==null || rep["IDPRD5SALVOS"]==undefined)){
				idprd5 = rep["IDPRD5SALVOS"]
			}
			
			if(!(rep["IDPRD6SALVOS"]=="" || rep["IDPRD6SALVOS"]==null || rep["IDPRD6SALVOS"]==undefined)){
				idprd6 = rep["IDPRD62SALVOS"]
			}
			
			console.log("idprd1: "+idprd1+", idprd2: "+idprd2+", idprd3: "+idprd3+", idprd4: "+idprd4+
					", idprd5: "+idprd5+", idprd6: "+idprd6)
			
			// SE INFORMAÇÃO FOI PREENCHIDA
			if(!(idprd1=="" || idprd1==null || idprd1=="null")){
				
				//var rowNova = addComponente(rep["IDCRIACAOSALVOS"])
				var rowNova = addViewComponente()
				console.log("criei item tabela componentes "+rowNova)
				
				// SALVA AS INFORMAÇÕES NA TABELA
				$("#VIEWIDPRDCOMPONENTES___"+rowNova).val(idprd1)
				$("#VIEWPRODUTOCOMPONENTES___"+rowNova).val(rep["PRODUTORM1SALVOS"])
				$("#VIEWCODIGOPRDCOMPONENTES___"+rowNova).val(rep["CODIGOPRD1SALVOS"])
				$("#VIEWCODUNDCOMPONENTES___"+rowNova).val(rep["UNDPRD1SALVOS"])
				$("#VIEWIDCRIACAOCOMPONENTES___"+rowNova).val(rep["IDCRIACAOSALVOS"])
				console.log("insumo: "+rep["DESCRICAOSALVOS"]+" "+rep["MATERIALSALVOS"]+" "+rep["BITOLASALVOS"])
				var insumo = ""+rep["DESCRICAOSALVOS"]+" "+rep["MATERIALSALVOS"]+" "+rep["BITOLASALVOS"]+""
				$("#VIEWINSUMOCOMPONENTES___"+rowNova).val(insumo)
				$("#VIEWLISTACOMPONENTES___"+rowNova).val("L")
				$("#VIEWPRIORIDADEATVCOMPONENTES___"+rowNova).prop("readonly",true)
				
				// BUSCA QUANTIDADES DOS COMPONENTES
				buscaQtdeComponentes(rep["IDCRIACAOSALVOS"], rowNova)
				
			}
			
			// SE INFORMAÇÃO FOI PREENCHIDA
			if(!(idprd2=="" || idprd2==null || idprd2=="null")){
				
				//var rowNova = addComponente(rep["IDCRIACAOSALVOS"])
				var rowNova = addViewComponente()
				console.log("criei item tabela componentes "+rowNova)
				
				console.log("idprd2: "+idprd2+", produtorm2salvos: "+rep["PRODUTORM2SALVOS"]+", codigoprd2salvos: "+rep["CODIGOPRD2SALVOS"]+", undprd2salvos: "+rep["UNDPRD2SALVOS"]+", idcriacaosalvos: "+
					rep["IDCRIACAOSALVOS"]+", descricaosalvos: "+rep["DESCRICAOSALVOS"]+", materialsalvos: "+rep["MATERIALSALVOS"]+", bitolasalvos: "+rep["BITOLASALVOS"]+", insumo: "+
					insumo+", substituto: "+rep["CODIGOPRD1SALVOS"])
				
				$("#VIEWIDPRDCOMPONENTES___"+rowNova).val(idprd2)
				$("#VIEWPRODUTOCOMPONENTES___"+rowNova).val(rep["PRODUTORM2SALVOS"])
				$("#VIEWCODIGOPRDCOMPONENTES___"+rowNova).val(rep["CODIGOPRD2SALVOS"])
				$("#VIEWCODUNDCOMPONENTES___"+rowNova).val(rep["UNDPRD2SALVOS"])
				$("#VIEWIDCRIACAOCOMPONENTES___"+rowNova).val(rep["IDCRIACAOSALVOS"])
				console.log("insumo: "+rep["DESCRICAOSALVOS"]+" "+rep["MATERIALSALVOS"]+" "+rep["BITOLASALVOS"])
				var insumo = ""+rep["DESCRICAOSALVOS"]+" "+rep["MATERIALSALVOS"]+" "+rep["BITOLASALVOS"]+""
				$("#VIEWINSUMOCOMPONENTES___"+rowNova).val(insumo)
				$("#VIEWLISTACOMPONENTES___"+rowNova).val("L")
				$("#VIEWPRIORIDADEATVCOMPONENTES___"+rowNova).prop("readonly",true)
				
				// PREENCHE O SELECT COM OS DADOS
				$('#VIEWSUBSTITUTOCOMPONENTES___'+rowNova).append($("<option class='info'>"+rep["CODIGOPRD1SALVOS"]+"</option>").attr("value", rep["CODIGOPRD1SALVOS"]));
				
				$("#VIEWSUBSTITUTOCOMPONENTES___"+rowNova).val(rep["CODIGOPRD1SALVOS"])
				
				//buscaQtdeComponentes(idCriacao, idprd2, seq, row)
				
			}
			
			// SE INFORMAÇÃO FOI PREENCHIDA
			if(!(idprd3=="" || idprd3==null || idprd3=="null")){
				
				//var rowNova = addComponente(rep["IDCRIACAOSALVOS"])
				var rowNova = addViewComponente()
				console.log("criei item tabela componentes "+rowNova)
				
				$("#VIEWIDPRDCOMPONENTES___"+rowNova).val(idprd3)
				$("#VIEWPRODUTOCOMPONENTES___"+rowNova).val(rep["PRODUTORM3SALVOS"])
				$("#VIEWCODIGOPRDCOMPONENTES___"+rowNova).val(rep["CODIGOPRD3SALVOS"])
				$("#VIEWCODUNDCOMPONENTES___"+rowNova).val(rep["UNDPRD3SALVOS"])
				$("#VIEWIDCRIACAOCOMPONENTES___"+rowNova).val(rep["IDCRIACAOSALVOS"])
				console.log("insumo: "+rep["DESCRICAOSALVOS"]+" "+rep["MATERIALSALVOS"]+" "+rep["BITOLASALVOS"])
				var insumo = ""+rep["DESCRICAOSALVOS"]+" "+rep["MATERIALSALVOS"]+" "+rep["BITOLASALVOS"]+""
				$("#VIEWINSUMOCOMPONENTES___"+rowNova).val(insumo)
				$("#VIEWLISTACOMPONENTES___"+rowNova).val("L")
				$("#VIEWPRIORIDADEATVCOMPONENTES___"+rowNova).prop("readonly",true)
				
				// PREENCHE O SELECT COM OS DADOS
				$('#VIEWSUBSTITUTOCOMPONENTES___'+rowNova).append($("<option class='info'>"+rep["CODIGOPRD1SALVOS"]+"</option>").attr("value", rep["CODIGOPRD1SALVOS"]));
				
				$("#VIEWSUBSTITUTOCOMPONENTES___"+rowNova).val(rep["CODIGOPRD1SALVOS"])
				
				//buscaQtdeComponentes(idCriacao, idprd3, seq, row)
			
			}
			
			// SE INFORMAÇÃO FOI PREENCHIDA
			if(!(idprd4=="" || idprd4==null || idprd4=="null")){
				
				//var rowNova = addComponente(rep["IDCRIACAOSALVOS"])
				var rowNova = addViewComponente()
				console.log("criei item tabela componentes "+rowNova)
				
				$("#VIEWIDPRDCOMPONENTES___"+rowNova).val(idprd4)
				$("#VIEWPRODUTOCOMPONENTES___"+rowNova).val(rep["PRODUTORM4SALVOS"])
				$("#VIEWCODIGOPRDCOMPONENTES___"+rowNova).val(rep["CODIGOPRD4SALVOS"])
				$("#VIEWCODUNDCOMPONENTES___"+rowNova).val(rep["UNDPRD4SALVOS"])
				$("#VIEWIDCRIACAOCOMPONENTES___"+rowNova).val(rep["IDCRIACAOSALVOS"])
				console.log("insumo: "+rep["DESCRICAOSALVOS"]+" "+rep["MATERIALSALVOS"]+" "+rep["BITOLASALVOS"])
				var insumo = ""+rep["DESCRICAOSALVOS"]+" "+rep["MATERIALSALVOS"]+" "+rep["BITOLASALVOS"]+""
				$("#VIEWINSUMOCOMPONENTES___"+rowNova).val(insumo)
				$("#VIEWLISTACOMPONENTES___"+rowNova).val("L")
				$("#VIEWPRIORIDADEATVCOMPONENTES___"+rowNova).prop("readonly",true)
				
				// PREENCHE O SELECT COM OS DADOS
				$('#VIEWSUBSTITUTOCOMPONENTES___'+rowNova).append($("<option class='info'>"+rep["CODIGOPRD1SALVOS"]+"</option>").attr("value", rep["CODIGOPRD1SALVOS"]));
				
				$("#VIEWSUBSTITUTOCOMPONENTES___"+rowNova).val(rep["CODIGOPRD1SALVOS"])
				
				//buscaQtdeComponentes(idCriacao, idprd4, seq, row)
				
			}
			
			// SE INFORMAÇÃO FOI PREENCHIDA
			if(!(idprd5=="" || idprd5==null || idprd5=="null")){
				
				//var rowNova = addComponente(rep["IDCRIACAOSALVOS"])
				var rowNova = addViewComponente()
				console.log("criei item tabela componentes "+rowNova)
				
				$("#VIEWIDPRDCOMPONENTES___"+rowNova).val(idprd5)
				$("#VIEWPRODUTOCOMPONENTES___"+rowNova).val(rep["PRODUTORM5SALVOS"])
				$("#VIEWCODIGOPRDCOMPONENTES___"+rowNova).val(rep["CODIGOPRD5SALVOS"])
				$("#VIEWCODUNDCOMPONENTES___"+rowNova).val(rep["UNDPRD5SALVOS"])
				$("#VIEWIDCRIACAOCOMPONENTES___"+rowNova).val(rep["IDCRIACAOSALVOS"])
				console.log("insumo: "+rep["DESCRICAOSALVOS"]+" "+rep["MATERIALSALVOS"]+" "+rep["BITOLASALVOS"])
				var insumo = ""+rep["DESCRICAOSALVOS"]+" "+rep["MATERIALSALVOS"]+" "+rep["BITOLASALVOS"]+""
				$("#VIEWINSUMOCOMPONENTES___"+rowNova).val(insumo)
				$("#VIEWLISTACOMPONENTES___"+rowNova).val("L")
				$("#VIEWPRIORIDADEATVCOMPONENTES___"+rowNova).prop("readonly",true)
				
				// PREENCHE O SELECT COM OS DADOS
				$('#VIEWSUBSTITUTOCOMPONENTES___'+rowNova).append($("<option class='info'>"+rep["CODIGOPRD1SALVOS"]+"</option>").attr("value", rep["CODIGOPRD1SALVOS"]));
				
				$("#VIEWSUBSTITUTOCOMPONENTES___"+rowNova).val(rep["CODIGOPRD1SALVOS"])
				
				//buscaQtdeComponentes(idCriacao, idprd6, seq, row)
				
			}
			
			// SE INFORMAÇÃO FOI PREENCHIDA
			if(!(idprd6=="" || idprd6==null || idprd6=="null")){
				
				//var rowNova = addComponente(rep["IDCRIACAOSALVOS"])
				var rowNova = addViewComponente()
				console.log("criei item tabela componentes "+rowNova)
				
				$("#VIEWIDPRDCOMPONENTES___"+rowNova).val(idprd6)
				$("#VIEWPRODUTOCOMPONENTES___"+rowNova).val(rep["PRODUTORM6SALVOS"])
				$("#VIEWCODIGOPRDCOMPONENTES___"+rowNova).val(rep["CODIGOPRD6SALVOS"])
				$("#VIEWCODUNDCOMPONENTES___"+rowNova).val(rep["UNDPRD6SALVOS"])
				$("#VIEWIDCRIACAOCOMPONENTES___"+rowNova).val(rep["IDCRIACAOSALVOS"])
				console.log("insumo: "+rep["DESCRICAOSALVOS"]+" "+rep["MATERIALSALVOS"]+" "+rep["BITOLASALVOS"])
				var insumo = ""+rep["DESCRICAOSALVOS"]+" "+rep["MATERIALSALVOS"]+" "+rep["BITOLASALVOS"]+""
				$("#VIEWINSUMOCOMPONENTES___"+rowNova).val(insumo)
				$("#VIEWLISTACOMPONENTES___"+rowNova).val("L")
				$("#VIEWPRIORIDADEATVCOMPONENTES___"+rowNova).prop("readonly",true)
				
				// PREENCHE O SELECT COM OS DADOS
				$('#VIEWSUBSTITUTOCOMPONENTES___'+rowNova).append($("<option class='info'>"+rep["CODIGOPRD1SALVOS"]+"</option>").attr("value", rep["CODIGOPRD1SALVOS"]));
				
				$("#VIEWSUBSTITUTOCOMPONENTES___"+rowNova).val(rep["CODIGOPRD1SALVOS"])
				
				//buscaQtdeComponentes(idCriacao, idprd6, seq, row)
				
			}
			
		}
		
		// CARREGA CONTEÚDO DO SELECT DOS SUBSTITUTOS
		//carregaSubstitutosGeral()
		
	}
	
	/*var numOS = $("#NUM_OS").val()
	console.log("numOS "+numOS+", idCriacao "+idCriacao)
		
	var c1 = DatasetFactory.createConstraint("OSCOMPONENTES",numOS,numOS,ConstraintType.MUST)
	var c2 = DatasetFactory.createConstraint("IDCRIACAOCOMPONENTES",idCriacao,idCriacao,ConstraintType.MUST)
	
	var constraints = new Array(c1,c2)
	var dataset = DatasetFactory.getDataset("dsBuscaItensListaMateriaisOS",null,constraints,null)
	var row = dataset.values
	
	console.log("row "+row)
	
	// SE RETORNO NÃO É NULO E NEM VAZIO
	if(!(row=="" || row==null || row==undefined || row=="null")){
		
		var count = row.length
		
		// PERCORRE TODOS OS REGISTROS
		for(var i=0; i < count; i++){
			
			var rep = row[i]
			   
			var seq = addViewComponente()
			
			console.log("vou carregar o i tem "+seq)
			
			$("#VIEWPRODUTOCOMPONENTES___"+seq).val(rep["PRODUTOCOMPONENTES"])
			$("#VIEWIDPRDCOMPONENTES___"+seq).val(rep["IDPRDCOMPONENTES"])
			$("#VIEWCODIGOPRDCOMPONENTES___"+seq).val(rep["CODIGOPRDCOMPONENTES"])
			$("#VIEWCODUNDCOMPONENTES___"+seq).val(rep["CODUNDCOMPONENTES"])
			$("#VIEWIDCRIACAOCOMPONENTES___"+seq).val(rep["IDCRIACAOCOMPONENTES"])
			$("#VIEWQTDEUNCOMPONENTES___"+seq).val(rep["QTDEUNCOMPONENTES"])
			$("#VIEWQTDETOTALCOMPONENTES___"+seq).val(rep["QTDETOTALCOMPONENTES"])
			$("#VIEWINSUMOCOMPONENTES___"+seq).val(rep["INSUMOCOMPONENTES"])
			$("#VIEWLISTACOMPONENTES___"+seq).val(rep["LISTACOMPONENTES"])
			$("#VIEWOSCOMPONENTES___"+seq).val(rep["OSCOMPONENTES"])
			$("#VIEWINCLUIDOCOMPONENTES___"+seq).val(rep["INCLUIDOCOMPONENTES"])
			$("#VIEWEDITADOCOMPONENTES___"+seq).val(rep["EDITADOCOMPONENTES"])
			$("#VIEWINTEGRADOCOMPONENTES___"+seq).val(rep["INTEGRADOCOMPONENTES"])
			$("#VIEWSUBSTITUTOCOMPONENTES___"+seq).val(rep["SUBSTITUTOCOMPONENTES"])
			
		}
		
		// CARREGA CONTEÚDO DO SELECT DOS SUBSTITUTOS
		carregaSubstitutosGeral()
		
	}
	
	// CALCULA AS QUANTIDADES DOS COMPONENTES
	calculaQtdesComponentes(idCriacao,row)*/
	
}

// PREENCHE A TABELA COMPONENTES DO ITEM EM QUESTÃO
function preencheTabelaComponentes(idCriacao){
	
	console.log("entrei para preencher a VIEW de componentes")
	
	var numOS = $("#NUM_OS").val()
	console.log("numOS "+numOS+", idCriacao "+idCriacao)
		
	var c1 = DatasetFactory.createConstraint("OSCOMPONENTES",numOS,numOS,ConstraintType.MUST)
	var c2 = DatasetFactory.createConstraint("IDCRIACAOCOMPONENTES",idCriacao,idCriacao,ConstraintType.MUST)
	
	var constraints = new Array(c1,c2)
	var dataset = DatasetFactory.getDataset("dsItensComponentesOS",null,constraints,null)
	var row = dataset.values
	
	console.log("row "+row)
	
	// SE RETORNO NÃO É NULO E NEM VAZIO
	if(!(row=="" || row==null || row==undefined || row=="null")){
		
		var count = row.length
		
		// PERCORRE TODOS OS REGISTROS
		for(var i=0; i < count; i++){
			
			var rep = row[i]
			 
			// SE NÃO PERTENCE A LISTA DE MATERIAIS
			//if(!(rep["LISTACOMPONENTES"]=="L")){
				
				var seq = addViewComponente()
				
				// CARREGA CONTEÚDO DO SELECT DOS SUBSTITUTOS
				//apagaSubstitutosGeral()
				//carregaSubstitutosGeral()
			
				console.log("vou carregar o i tem "+seq)
				
				// SALVA AS INFORMAÇÕES NA TABELA
				$("#VIEWPRODUTOCOMPONENTES___"+seq).val(rep["PRODUTOCOMPONENTES"])
				$("#VIEWIDPRDCOMPONENTES___"+seq).val(rep["IDPRDCOMPONENTES"])
				$("#VIEWCODIGOPRDCOMPONENTES___"+seq).val(rep["CODIGOPRDCOMPONENTES"])
				$("#VIEWCODUNDCOMPONENTES___"+seq).val(rep["CODUNDCOMPONENTES"])
				$("#VIEWIDCRIACAOCOMPONENTES___"+seq).val(rep["IDCRIACAOCOMPONENTES"])
				$("#VIEWQTDEUNCOMPONENTES___"+seq).val(rep["QTDEUNCOMPONENTES"])
				$("#VIEWQTDETOTALCOMPONENTES___"+seq).val(rep["QTDETOTALCOMPONENTES"])
				$("#VIEWINSUMOCOMPONENTES___"+seq).val(rep["INSUMOCOMPONENTES"])
				$("#VIEWLISTACOMPONENTES___"+seq).val(rep["LISTACOMPONENTES"])
				$("#VIEWOSCOMPONENTES___"+seq).val(rep["OSCOMPONENTES"])
				$("#VIEWINCLUIDOCOMPONENTES___"+seq).val(rep["INCLUIDOCOMPONENTES"])
				$("#VIEWEDITADOCOMPONENTES___"+seq).val(rep["EDITADOCOMPONENTES"])
				$("#VIEWINTEGRADOCOMPONENTES___"+seq).val(rep["INTEGRADOCOMPONENTES"])
				//$("#VIEWSUBSTITUTOCOMPONENTES___"+seq).val(rep["SUBSTITUTOCOMPONENTES"])
				$("#VIEWPRIORIDADEATVCOMPONENTES___"+seq).val(rep["PRIORIDADEATVCOMPONENTES"])
				$("#VIEWPRODUTOCOMPONENTES___"+seq).parent().parent().parent().css({"background-color":" rgb(240, 240, 240) !important"})
			
			//}
				
		}
		
		// CARREGA CONTEÚDO DO SELECT DOS SUBSTITUTOS
		carregaSubstitutosGeral()
		
		// PERCORRE TODOS OS REGISTROS
		for(var i=0; i < count; i++){
			
			var rep = row[i]
			
			console.log("vou carregar o i tem "+seq)
			
			var codigoPrd = rep["CODIGOPRDCOMPONENTES"]
			var idCriacao = rep["IDCRIACAOCOMPONENTES"]
			var substituto = rep["SUBSTITUTOCOMPONENTES"]
			var listaComp = rep["LISTACOMPONENTES"]
			var prioridade = rep["PRIORIDADEATVCOMPONENTES"]
			console.log("substituto: "+rep["SUBSTITUTOCOMPONENTES"])
			
			// PERCORRE TODOS OS REGISTROS
			$('input[id^="VIEWPRODUTOCOMPONENTES___"]').each(function(index, value){
		
				var seq = $(this).attr("id").split("___")[1]	
				
				var codigoPrdAux = $("#VIEWCODIGOPRDCOMPONENTES___"+seq).val()
				var idCriacaoAux = $("#VIEWIDCRIACAOCOMPONENTES___"+seq).val()
				var prioridadeAux = $("#VIEWPRIORIDADEATVCOMPONENTES___"+seq).val()
				var listaCompAux = $("#VIEWLISTACOMPONENTES___"+seq).val()
				
				// SE É O MESMO ITEM
				if(codigoPrd==codigoPrdAux && idCriacao==idCriacaoAux && prioridadeAux==prioridade && listaComp==listaCompAux
					&& !(substituto=="" || substituto==null || substituto==undefined)){
					
					$("#VIEWSUBSTITUTOCOMPONENTES___"+seq).val(substituto.toString().trim())
					if(rep["SUBSTITUTOCOMPONENTES"]!=null && rep["SUBSTITUTOCOMPONENTES"]!=undefined && rep["SUBSTITUTOCOMPONENTES"]!=""){
						$("#VIEWPRODUTOCOMPONENTES___"+seq).parent().css({"padding-left":"5%"})
					}
					$("#VIEWPRODUTOCOMPONENTES___"+seq).parent().parent().parent().css({"background-color":" rgb(240, 240, 240) !important"})
			
				}
			
			})
		
		}
		
	}
	
	// CALCULA AS QUANTIDADES DOS COMPONENTES
	calculaQtdesComponentes(idCriacao)
	
}

// PREENCHE A TABELA COMPONENTES DO ITEM EM QUESTÃO
function preencheTabelaComponentesEX(idCriacao){
	
	console.log("entrei para preencher a VIEW de componentes")
	
	var numOS = $("#NUM_OS").val()
	var execucao = $("#EXECUCAO_INFO").val()
	
	console.log("numOS "+numOS+", idCriacao "+idCriacao)
		
	var c1 = DatasetFactory.createConstraint("OSCOMPONENTES",numOS,numOS,ConstraintType.MUST)
	var c2 = DatasetFactory.createConstraint("IDCRIACAOCOMPONENTES",idCriacao,idCriacao,ConstraintType.MUST)
	var c3 = DatasetFactory.createConstraint("EXECUCAO",execucao,execucao,ConstraintType.MUST)
	
	var constraints = new Array(c1,c2,c3)
	var dataset = DatasetFactory.getDataset("dsEXItensComponentesOS",null,constraints,null)
	var row = dataset.values
	
	console.log("row "+row)
	
	// SE RETORNO NÃO É NULO E NEM VAZIO
	if(!(row=="" || row==null || row==undefined || row=="null")){
		
		var count = row.length
		
		// PERCORRE TODOS OS REGISTROS
		for(var i=0; i < count; i++){
			
			var rep = row[i]
			 
			// SE NÃO PERTENCE A LISTA DE MATERIAIS
			//if(!(rep["LISTACOMPONENTES"]=="L")){
				
				var seq = addViewComponente()
				
				// CARREGA CONTEÚDO DO SELECT DOS SUBSTITUTOS
				//apagaSubstitutosGeral()
				//carregaSubstitutosGeral()
			
				console.log("vou carregar o i tem "+seq)
				
				// SALVA AS INFORMAÇÕES NA TABELA
				$("#VIEWPRODUTOCOMPONENTES___"+seq).val(rep["PRODUTOCOMPONENTES"])
				$("#VIEWIDPRDCOMPONENTES___"+seq).val(rep["IDPRDCOMPONENTES"])
				$("#VIEWCODIGOPRDCOMPONENTES___"+seq).val(rep["CODIGOPRDCOMPONENTES"])
				$("#VIEWCODUNDCOMPONENTES___"+seq).val(rep["CODUNDCOMPONENTES"])
				$("#VIEWIDCRIACAOCOMPONENTES___"+seq).val(rep["IDCRIACAOCOMPONENTES"])
				$("#VIEWQTDEUNCOMPONENTES___"+seq).val(rep["QTDEUNCOMPONENTES"])
				$("#VIEWQTDETOTALCOMPONENTES___"+seq).val(rep["QTDETOTALCOMPONENTES"])
				$("#VIEWINSUMOCOMPONENTES___"+seq).val(rep["INSUMOCOMPONENTES"])
				$("#VIEWLISTACOMPONENTES___"+seq).val(rep["LISTACOMPONENTES"])
				$("#VIEWOSCOMPONENTES___"+seq).val(rep["OSCOMPONENTES"])
				$("#VIEWINCLUIDOCOMPONENTES___"+seq).val(rep["INCLUIDOCOMPONENTES"])
				$("#VIEWEDITADOCOMPONENTES___"+seq).val(rep["EDITADOCOMPONENTES"])
				$("#VIEWINTEGRADOCOMPONENTES___"+seq).val(rep["INTEGRADOCOMPONENTES"])
				$("#VIEWSUBSTITUTOCOMPONENTES___"+seq).val(rep["SUBSTITUTOCOMPONENTES"])
				if(rep["SUBSTITUTOCOMPONENTES"]!=null && rep["SUBSTITUTOCOMPONENTES"]!=undefined && rep["SUBSTITUTOCOMPONENTES"]!=""){
					$("#VIEWPRODUTOCOMPONENTES___"+seq).parent().css({"padding-left":"5%"})
				}
				$("#VIEWPRODUTOCOMPONENTES___"+seq).parent().parent().parent().css({"background-color":" rgb(240, 240, 240) !important"})
				$("#VIEWPRIORIDADEATVCOMPONENTES___"+seq).val(rep["PRIORIDADEATVCOMPONENTES"])
			
			//}
				
		}
		
		// CARREGA CONTEÚDO DO SELECT DOS SUBSTITUTOS
		carregaSubstitutosGeral()
		
		// PERCORRE TODOS OS REGISTROS
		for(var i=0; i < count; i++){
			
			var rep = row[i]
			
			console.log("vou carregar o i tem "+seq)
			
			var codigoPrd = rep["CODIGOPRDCOMPONENTES"]
			var idCriacao = rep["IDCRIACAOCOMPONENTES"]
			var substituto = rep["SUBSTITUTOCOMPONENTES"]
			var listaComp = rep["LISTACOMPONENTES"]
			var prioridade = rep["PRIORIDADEATVCOMPONENTES"]
			
			console.log("substituto: "+rep["SUBSTITUTOCOMPONENTES"])
			
			// PERCORRE TODOS OS REGISTROS
			$('input[id^="VIEWPRODUTOCOMPONENTES___"]').each(function(index, value){
		
				var seq = $(this).attr("id").split("___")[1]	
				
				var codigoPrdAux = $("#VIEWCODIGOPRDCOMPONENTES___"+seq).val()
				var idCriacaoAux = $("#VIEWIDCRIACAOCOMPONENTES___"+seq).val()
				var prioridadeAux = $("#VIEWPRIORIDADEATVCOMPONENTES___"+seq).val()
				var listaCompAux = $("#VIEWLISTACOMPONENTES___"+seq).val()
				
				// SE É O MESMO ITEM
				if(codigoPrd==codigoPrdAux && idCriacao==idCriacaoAux && prioridadeAux==prioridade && listaComp==listaCompAux 
						&& !(substituto=="" || substituto==null || substituto==undefined)){
				
					$("#VIEWSUBSTITUTOCOMPONENTES___"+seq).val(substituto.toString().trim())
					if(rep["SUBSTITUTOCOMPONENTES"]!=null && rep["SUBSTITUTOCOMPONENTES"]!=undefined && rep["SUBSTITUTOCOMPONENTES"]!=""){
						$("#VIEWPRODUTOCOMPONENTES___"+seq).parent().css({"padding-left":"5%"})
					}
					$("#VIEWPRODUTOCOMPONENTES___"+seq).parent().parent().parent().css({"background-color":" rgb(240, 240, 240) !important"})
			
				}
			
			})
		
		}
		
	}
	
	// CALCULA AS QUANTIDADES DOS COMPONENTES
	calculaQtdesComponentes(idCriacao)
	
}

// APAGA TODOS OS SELECTS DOS SUBSTITUTOS
function apagaSubstitutos(){

	// PERCORRE A TABELA E COLETA TODOS OS REGISTROS
	$('input[id^="VIEWPRODUTOCOMPONENTES___"]').each(function(index, value){
		
		var seq = $(this).attr("id").split("___")[1]	
		var lista = $("#VIEWLISTACOMPONENTES___"+seq).val()
		
		// SE NÃO É UM COMPONENTE QUE VEIO DA LISTA DE MATERIAIS
		if(!(lista=="L")){
			
			$('#VIEWSUBSTITUTOCOMPONENTES___'+seq).children('option:not(:first)').remove();
			
		}
		
	})
	
}

// APAGA TODOS OS SELECTS DOS SUBSTITUTOS
function apagaSubstitutosGeral(){

	// PERCORRE A TABELA E COLETA TODOS OS REGISTROS
	$('input[id^="VIEWPRODUTOCOMPONENTES___"]').each(function(index, value){
		
		var seq = $(this).attr("id").split("___")[1]	
		
		$('#VIEWSUBSTITUTOCOMPONENTES___'+seq).children('option:not(:first)').remove();
		
	})
	
}

// BUSCA OS VALORES DAS QUANTIDADES DOS ITENS E FAZ OS CÁLCULOS PARA SEREM SALVOS NA TABELA DE COMPONENTES
function buscaQtdeComponentesLista(idCriacao){
	
	console.log("vou buscar as quantidades dos componentes")

	var numOS = $("#NUM_OS").val()
	
	var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
	var a2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST);
	
	var constraints = new Array(a1,a2);
	
	dataset = DatasetFactory.getDataset("dsBuscaQtdeItemOS",null,constraints,null);
	
	var valor = dataset.values
	
	console.log("row")
	console.log(valor)
	
	var rep = valor[0]
	
	pesoBruto = rep["PESOBRUTO"]
	totalQtde = rep["TOTALQTDE"]
	
	totalQtde = parseInt(totalQtde)
	pesoBruto = parseFloat(pesoBruto)
	pesoBruto = pesoBruto.toFixed(4)
	
	qtdeUnit = pesoBruto/totalQtde
	qtdeUnit = parseFloat(qtdeUnit)
	qtdeUnit = qtdeUnit.toFixed(4)
	qtdeUnit = qtdeUnit.toString()
	qtdeUnit = qtdeUnit.replace(".",",")
	qtdeTotal = pesoBruto
	
	var qtdes = new Array()
	 
	qtdes.push({QTDEUNIT:qtdeUnit,QTDETOTAL:qtdeTotal})
	
	console.log(qtdes)
	
	console.log("vou retornar qtdes")
	
	return qtdes

}

// BUSCA OS VALORES DAS QUANTIDADES DOS ITENS E FAZ OS CALCULOS
function buscaQtdeComponentes(idCriacao,row){
	
	var numOS = $("#NUM_OS").val()
	
	var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
	var a2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST);
	
	var constraints = new Array(a1,a2);
	
	dataset = DatasetFactory.getDataset("dsBuscaQtdeItemOS",null,constraints,null);
	
	var valor = dataset.values
	
	var rep = valor[0]
	
	pesoBruto = rep["PESOBRUTO"]
	totalQtde = rep["TOTALQTDE"]
	
	totalQtde = parseInt(totalQtde)
	pesoBruto = parseFloat(pesoBruto)
	pesoBruto = pesoBruto.toFixed(4)
	
	qtdeUnit = pesoBruto/totalQtde
	qtdeUnit = parseFloat(qtdeUnit)
	qtdeUnit = qtdeUnit.toFixed(4)
	qtdeUnit = qtdeUnit.toString()
	qtdeUnit = qtdeUnit.replace(".",",")
	qtdeTotal = pesoBruto
	
	$("#VIEWQTDEUNCOMPONENTES___"+row).val(qtdeUnit)
	$("#VIEWQTDETOTALCOMPONENTES___"+row).val(qtdeTotal)
	
}

// CARREGA SELECT DOS SUBSTITUTOS
function carregaSubstitutosGeral(){
	
	var arraySubstitutos = new Array()
	var arraySubLista = new Array()
	
	console.log("entrei para carregar substitutos")
	
	// PERCORRE A TABELA E COLETA TODOS OS REGISTROS
	$('input[id^="VIEWPRODUTOCOMPONENTES___"]').each(function(index, value){
		
		var seq = $(this).attr("id").split("___")[1]	
		
		var produto = $("#VIEWCODIGOPRDCOMPONENTES___"+seq).val()
		var lista = $("#VIEWLISTACOMPONENTES___"+seq).val()
		//var substituto = $("#VIEWSUBSTITUTOCOMPONENTES___"+seq).val()
		
		//console.log("substituto "+substituto)
		
		if(!(lista=="L")){

			arraySubstitutos.push(produto)
			
		} else {
			
			arraySubLista.push(produto)
			
		}
		
	})
	
	console.log("Substitutos: "+arraySubstitutos)
	console.log("Substitutos dos itens da Lista: "+arraySubLista)
	
	// PERCORRE A TABELA E COLETA TODOS OS REGISTROS
	$('input[id^="VIEWPRODUTOCOMPONENTES___"]').each(function(index, value){
		
		var seq = $(this).attr("id").split("___")[1]	
		var produto = $("#VIEWCODIGOPRDCOMPONENTES___"+seq).val()
		var lista = $("#VIEWLISTACOMPONENTES___"+seq).val()
		//var substituto = $("#VIEWSUBSTITUTOCOMPONENTES___"+seq).val()
		
		//console.log("vou apendar o "+substituto)
		
		//if(!(lista=="L")){
			
		if(!(lista=="L")){
			
			// PERCORRE TODOS OS ITENS DO ARRAY
			for(var i=0; i<arraySubstitutos.length; i++){
	
				if(!(produto==arraySubstitutos[i])){
					
					// PREENCHE O SELECT COM OS DADOS
					$('#VIEWSUBSTITUTOCOMPONENTES___'+seq).append($("<option class='info'></option>").attr("value", arraySubstitutos[i]).text(arraySubstitutos[i]));
					
				}
				
			}
		
		}
		
		if(lista=="L"){
		
			// PERCORRE TODOS OS ITENS DO ARRAY
			for(var i=0; i<arraySubLista.length; i++){
				
				if(!(produto==arraySubLista[i])){
					
					// PREENCHE O SELECT COM OS DADOS
					$('#VIEWSUBSTITUTOCOMPONENTES___'+seq).append($("<option class='info'></option>").attr("value", arraySubLista[i]).text(arraySubLista[i]));
					
				}
				
			}
		
		}
		
	})
	
}

// CARREGA SELECT DOS SUBSTITUTOS
function carregaSubstitutos(){
	
	var arraySubstitutos = new Array()
	
	console.log("entrei para carregar substitutos")
	
	// PERCORRE A TABELA E COLETA TODOS OS REGISTROS
	$('input[id^="VIEWPRODUTOCOMPONENTES___"]').each(function(index, value){
		
		var seq = $(this).attr("id").split("___")[1]	
		
		var produto = $("#VIEWCODIGOPRDCOMPONENTES___"+seq).val()
		var lista = $("#VIEWLISTACOMPONENTES___"+seq).val()
		var substituto = $("#VIEWSUBSTITUTOCOMPONENTES___"+seq).val()
		
		console.log("substituto "+substituto)
		
		// SE NÃO É UM COMPONENTE DA LISTA DE MATERIAIS
		if(!(lista=="L")){

			arraySubstitutos.push(produto)
			
		} 
		
	})
	
	console.log("Substitutos: "+arraySubstitutos)
	//console.log("Substitutos dos itens da Lista: "+arraySubLista)
	
	// PERCORRE A TABELA E COLETA TODOS OS REGISTROS
	$('input[id^="VIEWPRODUTOCOMPONENTES___"]').each(function(index, value){
		
		var seq = $(this).attr("id").split("___")[1]	
		var produto = $("#VIEWCODIGOPRDCOMPONENTES___"+seq).val()
		var lista = $("#VIEWLISTACOMPONENTES___"+seq).val()
		//var substituto = $("#VIEWSUBSTITUTOCOMPONENTES___"+seq).val()
			
		if(!(lista=="L")){
			
			// PERCORRE TODOS OS ITENS DO ARRAY
			for(var i=0; i<arraySubstitutos.length; i++){
	
				if(!(produto==arraySubstitutos[i])){
					
					// PREENCHE O SELECT COM OS DADOS
					$('#VIEWSUBSTITUTOCOMPONENTES___'+seq).append($("<option class='info'></option>").attr("value", arraySubstitutos[i]).text(arraySubstitutos[i]));
					
				}
				
			}
		
		}
	
	})
	
}

// VERIFICA SE TODOS OS ITENS POSSUEM AO MENOS UMA ATIVIDADE NA TABELA DE PROCESSOS
function verificaProcessoItens(){
	
	console.log("entrei para verificar os processos de cada item")
	
	var indicesErros = new Array()
	var idCriacaoProcesso = ""
	var mensagem = ""
	
	var numOS = $("#NUM_OS").val()
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OSPROCESSO",numOS,numOS,ConstraintType.MUST)
	var constraints = new Array(c1)
	
	var dataset = DatasetFactory.getDataset("dsVerificaProcessoItemOS",null,constraints,null)
	
	var row = dataset.values
	console.log("ROW: ")
	
	console.log(row)
	
	// SE RETORNO NÃO É VAZIO OU NULO
	if(!(row=="" || row==undefined || row==null || row=="null")){
		
		var count = dataset.values.length
		
		console.log("retorno não é vazio, COUNT: "+count)
		
		// PERCORRE TODOS OS REGISTROS
		for(var i=0; i<count; i++){
			
			var rep = row[i]
			
			if(rep["IDCRIACAOPROCESSO"]=="" || rep["IDCRIACAOPROCESSO"]==undefined || rep["IDCRIACAOPROCESSO"]==null || rep["IDCRIACAOPROCESSO"]=="null"){
		
				indicesErros.push(rep["INDICE"])
				
			}
			
		}
		
	}
	
	// SE ARRAY DE INDICES NÃO ESTÁ VAZIO
	if(indicesErros.length>0){
		
		// PERCORRE O ARRAY E SALVA OS ÍNDICES ENCONTRADOS
		for(var k=0;k<indicesErros.length;k++){
			
			if(k==0){
				
				mensagem = indicesErros[k]
				
			} else {
				
				mensagem = mensagem +", "+indicesErros[k]
				
			}
			
		}
		
	}
	
	return mensagem
	
}

// CALCULA A QUANTIDADE DA TABELA DE COMPONENTES
function calculaQtdesComponentesGeral(idCriacao){
	
	console.log("entrei para calcular as quantidades dos componentes geral do item")
	
	var numOS = $("#NUM_OS").val()
	
	var a1 = DatasetFactory.createConstraint("IDCRIACAOCOMPONENTES",idCriacao,idCriacao,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("OSCOMPONENTES",numOS,numOS,ConstraintType.MUST)
	
	var constraints = new Array(a1,a2)
	
	var dataset = DatasetFactory.getDataset("dsBuscaComponentesItemOS",null,constraints,null)
	
	var row = dataset.values
	console.log("row: ")
	console.log(row)
	
	var b1 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
	var b2 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	
	var constraints2 = new Array(b1,b2)
	
	var dataset2 = DatasetFactory.getDataset("dsBuscaItemEstruturaOS",null,constraints2,null)
	
	var row2 = dataset2.values
	console.log("row2: ")
	console.log(row2)
	
	var rep = row2[0]
	
	var pesoBruto = rep["PESOBRUTO"]
	console.log("PESOBRUTO: "+pesoBruto)
	
	var totalQtde = rep["TOTALQTDE"]
	console.log("PESOBRUTO: "+pesoBruto)
	
	totalQtde = parseInt(totalQtde)
	console.log("TOTALQTDE: "+totalQtde)
	
	if(pesoBruto.includes(",")){
		
		pesoBruto = pesoBruto.replace(",",".")
		
	}
	
	//
	pesoBruto = parseFloat(pesoBruto)
	console.log("PESOBRUTO: "+pesoBruto)
	
	var qtdeUnit = pesoBruto/totalQtde
	console.log("QTDEUNIT "+qtdeUnit)
	//qtdeUnit = parseFloat(qtdeUnit)
	
	qtdeUnit = qtdeUnit.toFixed(4)
	console.log("QTDEUNIT "+qtdeUnit)
	qtdeUnit = qtdeUnit.toString()
	qtdeUnit = qtdeUnit.replace(".",",")
	var qtdeTotal = pesoBruto

	if(qtdeTotal=="NaN" || qtdeTotal==NaN){
		
		qtdeTotal = ""
		
	}
	
	if(qtdeUnit=="NaN" || qtdeUnit==NaN){
		
		qtdeUnit = ""
		
	}
	
	// SE RETORNO DOS COMPONENTES NÃO É VAZIO OU NULO
	if(!(row=="" || row==null || row==undefined || row=="null")){
			
		var count = row.length
		
		// PERCORRE TODOS OS REGISTROS DO DATASET DOS COMPONENTES
		for(var i=0; i<count; i++){
			
			var substituto = rep["SUBSTITUTOCOMPONENTES"]
			var lista = rep["LISTACOMPONENTES"]
			
			// SE SUBSTITUTO NÃO FOI SELECIONADO E VEIO DA LISTA
			if((substituto=="" || substituto==null || substituto==undefined) && (lista=="L")){
			
				console.log("SUBSTITUTO VAZIO E VEIO DA LISTA")
				console.log("VOU INCLUIR QTDEUNIT "+qtdeUnit+" E QTDETOTAL "+qtdeTotal)
				
				var c1 = DatasetFactory.createConstraint("OSCOMPONENTES",numOS,numOS,ConstraintType.MUST)
				var c2 = DatasetFactory.createConstraint("IDCRIACAOCOMPONENTES",idCriacao,idCriacao,ConstraintType.MUST)
				var c3 = DatasetFactory.createConstraint("QTDEUNCOMPONENTES",qtdeUnit,qtdeUnit,ConstraintType.MUST)
				var c4 = DatasetFactory.createConstraint("QTDETOTALCOMPONENTES",qtdeTotal,qtdeTotal,ConstraintType.MUST)
				
				var constraints = new Array(c1,c2,c3,c4)
				
				var dataset = DatasetFactory.getDataset("dsUpdateQtdeComponentesOS",null,constraints,null)
			
			}
			
		}
		
	}
		
}

//CALCULA A QUANTIDADE DA TABELA DE COMPONENTES
function calculaQtdesComponentes(idCriacao){
	
	console.log("entrei para calcular as quantidades dos componentes")
	
	var totalQtde = $("#F_TOTALQTDE").val()
	var desQtde = $("#F_DESQTDE").val()
	var pesoBruto = $("#F_PESOBRUTO").val()
	var pesoUnit = $("#F_PESOUNITARIO").val()

	console.log("pesoBruto: "+pesoBruto)
	console.log("totalQtde: "+totalQtde)
	console.log("desQtde: "+desQtde)
	console.log("pesoUnit: "+pesoUnit)
	
	var qtdeUnComp = $("#VALOR_RADIO4").val()
	var qtdeUnit
	var qtdeTotal
	
	
	console.log("qtdeUnComp: "+qtdeUnComp)
	
	/*totalQtde = parseInt(totalQtde)
	console.log("TOTALQTDE: "+totalQtde)
	pesoBruto = pesoBruto.replace(",",".")
	//pesoBruto = parseFloat(pesoBruto)
	console.log("PESOBRUTO: "+pesoBruto)
	
	var qtdeUnit = pesoBruto/totalQtde
	console.log("QTDEUNIT "+qtdeUnit)
	//qtdeUnit = parseFloat(qtdeUnit)
	qtdeUnit = qtdeUnit.toFixed(4)
	console.log("QTDEUNIT "+qtdeUnit)
	qtdeUnit = qtdeUnit.toString()
	qtdeUnit = qtdeUnit.replace(".",",")
	var qtdeTotal = pesoBruto*/

	
	// SE QTDE UN COMP É DESENHO
	if(qtdeUnComp=="DESENHO"){
		
		qtdeUnit = desQtde
		qtdeTotal = totalQtde
			
	}
	
	// SE QTDE UN COMP É PESOUNITARIO
	if(qtdeUnComp=="PESOUNITARIO"){
		
		qtdeUnit = pesoUnit
		qtdeTotal = pesoBruto
			
	}
	
	// SE QTDE TOTAL É UM NaN
	/*if(qtdeTotal=="NaN" || qtdeTotal==NaN){
		
		qtdeTotal = ""
		
	}
	
	// SE QTDE UNIT É UM NaN
	if(qtdeUnit=="NaN" || qtdeUnit==NaN){
		
		qtdeUnit = ""
		
	}*/
	
	// PERCORRE A TABELA E COLETA TODOS OS REGISTROS
	$('input[id^="VIEWPRODUTOCOMPONENTES___"]').each(function(index, value){
		
		console.log("ENTREI PARA PERCORRER A TABELA")
		
		var seq = $(this).attr("id").split("___")[1]	
		
		var substituto = $("#VIEWSUBSTITUTOCOMPONENTES___"+seq).val()
		var lista = $("#VIEWLISTACOMPONENTES___"+seq).val()
		
		if(!(substituto=="" || substituto==null || substituto==undefined) && !(lista=="L")){
			
			console.log("SUBSTITUTO NÃO ESTÁ VAZIO E NÃO VEIO DA LISTA")
			
			$("#VIEWQTDEUNCOMPONENTES___"+seq).val("")
			$("#VIEWQTDETOTALCOMPONENTES___"+seq).val("")
			$("#VIEWQTDEUNCOMPONENTES___"+seq).prop("readonly",true)
			$("#VIEWQTDETOTALCOMPONENTES___"+seq).prop("readonly",true)
			
		}
		
		if((substituto=="" || substituto==null || substituto==undefined) && !(lista=="L")){
			
			console.log("SUBSTITUTO VAZIO E NÃO VEIO DA LISTA")
			
			$("#VIEWQTDEUNCOMPONENTES___"+seq).prop("readonly",false)
			$("#VIEWQTDETOTALCOMPONENTES___"+seq).prop("readonly",false)
			
		}
		
		// SE SUBSTITUTO NÃO FOI SELECIONADO E VEIO DA LISTA
		if((substituto=="" || substituto==null || substituto==undefined) && (lista=="L")){
		
			console.log("SUBSTITUTO VAZIO E VEIO DA LISTA")
			console.log("VOU INCLUIR QTDEUNIT "+qtdeUnit+" E QTDETOTAL "+qtdeTotal)
			$("#VIEWQTDEUNCOMPONENTES___"+seq).val(qtdeUnit)
			$("#VIEWQTDETOTALCOMPONENTES___"+seq).val(qtdeTotal)
		
		}
		
	})

}

// CARREGA SELECT DOS SUBSTITUTOS
function carregaSubstitutos(){
	
	var arraySubstitutos = new Array()
	
	console.log("entrei para carregar substitutos")
	
	// PERCORRE A TABELA E COLETA TODOS OS REGISTROS
	$('input[id^="VIEWPRODUTOCOMPONENTES___"]').each(function(index, value){
		
		var seq = $(this).attr("id").split("___")[1]	
		
		var produto = $("#VIEWCODIGOPRDCOMPONENTES___"+seq).val()
		var lista = $("#VIEWLISTACOMPONENTES___"+seq).val()
		var substituto = $("#VIEWSUBSTITUTOCOMPONENTES___"+seq).val()
		
		console.log("substituto "+substituto)
		
		if(!(lista=="L")){

			arraySubstitutos.push(produto)
			
		} 
		
	})
	
	console.log("Substitutos: "+arraySubstitutos)
	//console.log("Substitutos dos itens da Lista: "+arraySubLista)
	
	// PERCORRE A TABELA E COLETA TODOS OS REGISTROS
	$('input[id^="VIEWPRODUTOCOMPONENTES___"]').each(function(index, value){
		
		var seq = $(this).attr("id").split("___")[1]	
		var produto = $("#VIEWCODIGOPRDCOMPONENTES___"+seq).val()
		var lista = $("#VIEWLISTACOMPONENTES___"+seq).val()
		//var substituto = $("#VIEWSUBSTITUTOCOMPONENTES___"+seq).val()
			
		if(!(lista=="L")){
			
			// PERCORRE TODOS OS ITENS DO ARRAY
			for(var i=0; i<arraySubstitutos.length; i++){
	
				if(!(produto==arraySubstitutos[i])){
					
					// PREENCHE O SELECT COM OS DADOS
					$('#VIEWSUBSTITUTOCOMPONENTES___'+seq).append($("<option class='info'></option>").attr("value", arraySubstitutos[i]).text(arraySubstitutos[i]));
					
				}
				
			}
		
		}
	
	})
	
}

// APAGA TODOS OS ITENS DA TABELA COMPONENTES QUE VIERAM DA LISTA
function apagaItensListaComponentes(){
	
	// PERCORRE A TABELA E COLETA TODOS OS REGISTROS
	$('input[id^="PRODUTOCOMPONENTES___"]').each(function(index, value){
		
		var seq = $(this).attr("id").split("___")[1]	
		var lista = $("#LISTACOMPONENTES___"+seq).val()
		
		// SE ITEM VEIO DA LISTA
		if(lista=="L"){
			  
			// APAGA REGISTRO
			$("#LINHACOMPONENTES___"+seq).remove();
			
		}
		
	})
	
}

// LIMPA OS ITENS QUE VIERAM DA LISTA
function limpaItensComponentesLista(){
	
	// PERCORRE A TABELA E COLETA TODOS OS REGISTROS
	$('input[id^="PRODUTOCOMPONENTES___"]').each(function(index, value){
		
		var seq = $(this).attr("id").split("___")[1]	
		var lista = $("#LISTACOMPONENTES___"+seq).val()
		
		// SE ITEM VEIO DA LISTA
		if(lista=="L"){
			
			// APAGA REGISTRO
			$("#LINHACOMPONENTES___"+seq).remove();
			
		}
		
	})
	
}

// REMOVE COMPONENTES QUE VIERAM DA LISTA NA TABELA PRINCIPAL
/*function removeComponentesLista(){
	
	var numOS = $("#NUM_OS").val()
		
	var c1 = DatasetFactory.createConstraint("OSCOMPONENTES",numOS,numOS,ConstraintType.MUST)
		
	var constraints = new Array(c1)
	var dataset = DatasetFactory.getDataset("dsDeleteListaComponentes",null,constraints,null)
	
}*/

// BUSCA TODOS OS COMPONENTES QUE JÁ FORAM SALVOS
function buscaComponentes(numOS){

	console.log("vou buscar os materiais que foram salvos na lista da OS "+numOS)	
	
	var c1 = DatasetFactory.createConstraint("NUMOSSALVOS",numOS,numOS,ConstraintType.MUST)
		
	var constraints = new Array(c1)
	var dataset = DatasetFactory.getDataset("dsComponentesSalvos",null,constraints,null)
	var row = dataset.values
	console.log("row "+row)
	
	// SE RETORNO DA CONSULTA NÃO É VAZIO
	if(!(row==null || row=="" || row==undefined || row=="null")){
		
		console.log("ENCONTREI")
		
		var count = dataset.values.length
		
		// PERCORRE TODOS OS REGISTROS ENCONTRADOS
		for(var i=0; i<count; i++){
			
			var rep = row[i]
			
			console.log(rep)
			
			var linhaSalvos = rep["LINHASALVOS"]
			var excluirItem = rep["EXCLUIRITEM"]
			var numDesenhoSalvos = rep["NUMDESENHOSALVOS"]
			var idCriacaoSalvos = rep["IDCRIACAOSALVOS"]
			var numOsSalvos = $("#NUM_OS").val()
			var posicaoSalvos = rep["POSICAOSALVOS"]
			var quantidadeSalvos = rep["QUANTIDADESALVOS"]
			var descricaoSalvos = rep["DESCRICAOSALVOS"]
			var bitolaSalvos = rep["BITOLASALVOS"]
			var larguraSalvos = rep["LARGURASALVOS"]
			var comprimentoSalvos = rep["COMPRIMENTOSALVOS"]
			var espRoscaSalvos = rep["ESPROSCASALVOS"]
			var materialSalvos = rep["MATERIALSALVOS"]
			var pesoBrutoSalvos = rep["PESOBRUTOSALVOS"]
			var origemMpSalvos = rep["ORIGEMMPSALVOS"]
			var produtoRm1Salvos = rep["PRODUTORM1SALVOS"]
			var idPrd1Salvos = rep["IDPRD1SALVOS"]
			var codigoPrd1Salvos = rep["CODIGOPRD1SALVOS"]
			var idMl1Salvos = rep["IDML1SALVOS"]
			var indice1Salvos = rep["INDICE1SALVOS"]
			var produtoRm2Salvos = rep["PRODUTORM2SALVOS"]
			var idPrd2Salvos = rep["IDPRD2SALVOS"]
			var codigoPrd2Salvos = rep["CODIGOPRD2SALVOS"]
			var idMl2Salvos = rep["IDML2SALVOS"]
			var indice2Salvos = rep["INDICE2SALVOS"]
			var produtoRm3Salvos = rep["PRODUTORM3SALVOS"]
			var idPrd3Salvos = rep["IDPRD3SALVOS"]
			var codigoPrd3Salvos = rep["CODIGOPRD3SALVOS"]
			var idMl3Salvos = rep["IDML3SALVOS"]
			var indice3Salvos = rep["INDICE3SALVOS"]
			var produtoRm4Salvos = rep["PRODUTORM4SALVOS"]
			var idPrd4Salvos = rep["IDPRD4SALVOS"]
			var codigoPrd4Salvos = rep["CODIGOPRD4SALVOS"]
			var idMl4Salvos = rep["IDML4SALVOS"]
			var indice4Salvos = rep["INDICE4SALVOS"]
			var produtoRm5Salvos = rep["PRODUTORM5SALVOS"]
			var idPrd5Salvos = rep["IDPRD5SALVOS"]
			var codigoPrd5Salvos = rep["CODIGOPRD5SALVOS"]
			var idMl5Salvos = rep["IDML5SALVOS"]
			var indice5Salvos = rep["INDICE5SALVOS"]
			var produtoRm6Salvos = rep["PRODUTORM6SALVOS"]
			var idPrd6Salvos = rep["IDPRD6SALVOS"]
			var codigoPrd6Salvos = rep["CODIGOPRD6SALVOS"]
			var idMl6Salvos = rep["IDML6SALVOS"]
			var indice6Salvos = rep["INDICE6SALVOS"]
			var undPrd1Salvos = rep["UNDPRD1SALVOS"]
			var undPrd2Salvos = rep["UNDPRD2SALVOS"]
			var undPrd3Salvos = rep["UNDPRD3SALVOS"]
			var undPrd4Salvos = rep["UNDPRD4SALVOS"]
			var undPrd5Salvos = rep["UNDPRD5SALVOS"]
			var undPrd6Salvos = rep["UNDPRD6SALVOS"]
			
			// CONSTRÓI AS CONSTRAINTS PARA REALIZAR O UPDATE DAS INFORMAÇÕES
			var c1 = DatasetFactory.createConstraint("LINHASALVOS",linhaSalvos,linhaSalvos,ConstraintType.MUST);
			var c2 = DatasetFactory.createConstraint("EXCLUIRITEM",excluirItem,excluirItem,ConstraintType.MUST);
			var c3 = DatasetFactory.createConstraint("NUMDESENHOSALVOS",numDesenhoSalvos,numDesenhoSalvos,ConstraintType.MUST);
			var c4 = DatasetFactory.createConstraint("IDCRIACAOSALVOS",idCriacaoSalvos,idCriacaoSalvos,ConstraintType.MUST);
			var c5 = DatasetFactory.createConstraint("NUMOSSALVOS",numOsSalvos,numOsSalvos,ConstraintType.MUST);
			var c6 = DatasetFactory.createConstraint("POSICAOSALVOS",posicaoSalvos,posicaoSalvos,ConstraintType.MUST);
			var c7 = DatasetFactory.createConstraint("QUANTIDADESALVOS",quantidadeSalvos,quantidadeSalvos,ConstraintType.MUST);
			var c8 = DatasetFactory.createConstraint("DESCRICAOSALVOS",descricaoSalvos,descricaoSalvos,ConstraintType.MUST);
			var c9 = DatasetFactory.createConstraint("BITOLASALVOS",bitolaSalvos,bitolaSalvos,ConstraintType.MUST);
			var c10 = DatasetFactory.createConstraint("LARGURASALVOS",larguraSalvos,larguraSalvos,ConstraintType.MUST);
			var c11 = DatasetFactory.createConstraint("COMPRIMENTOSALVOS",comprimentoSalvos,comprimentoSalvos,ConstraintType.MUST);
			var c12 = DatasetFactory.createConstraint("ESPROSCASALVOS",espRoscaSalvos,espRoscaSalvos,ConstraintType.MUST);
			var c13 = DatasetFactory.createConstraint("MATERIALSALVOS",materialSalvos,materialSalvos,ConstraintType.MUST);
			var c14 = DatasetFactory.createConstraint("PESOBRUTOSALVOS",pesoBrutoSalvos,pesoBrutoSalvos,ConstraintType.MUST);
			var c15 = DatasetFactory.createConstraint("ORIGEMMPSALVOS",origemMpSalvos,origemMpSalvos,ConstraintType.MUST);
			var c16 = DatasetFactory.createConstraint("PRODUTORM1SALVOS",produtoRm1Salvos,produtoRm1Salvos,ConstraintType.MUST);
			var c17 = DatasetFactory.createConstraint("IDPRD1SALVOS",idPrd1Salvos,idPrd1Salvos,ConstraintType.MUST);
			var c18 = DatasetFactory.createConstraint("CODIGOPRD1SALVOS",codigoPrd1Salvos,codigoPrd1Salvos,ConstraintType.MUST);
			var c19 = DatasetFactory.createConstraint("IDML1SALVOS",idMl1Salvos,idMl1Salvos,ConstraintType.MUST);
			var c20 = DatasetFactory.createConstraint("INDICE1SALVOS",indice1Salvos,indice1Salvos,ConstraintType.MUST);
			var c21 = DatasetFactory.createConstraint("PRODUTORM2SALVOS",produtoRm2Salvos,produtoRm2Salvos,ConstraintType.MUST);
			var c22 = DatasetFactory.createConstraint("IDPRD2SALVOS",idPrd2Salvos,idPrd2Salvos,ConstraintType.MUST);
			var c23 = DatasetFactory.createConstraint("CODIGOPRD2SALVOS",codigoPrd2Salvos,codigoPrd2Salvos,ConstraintType.MUST);
			var c24 = DatasetFactory.createConstraint("IDML2SALVOS",idMl2Salvos,idMl2Salvos,ConstraintType.MUST);
			var c25 = DatasetFactory.createConstraint("INDICE2SALVOS",indice2Salvos,indice2Salvos,ConstraintType.MUST);
			var c26 = DatasetFactory.createConstraint("PRODUTORM3SALVOS",produtoRm3Salvos,produtoRm3Salvos,ConstraintType.MUST);
			var c27 = DatasetFactory.createConstraint("IDPRD3SALVOS",idPrd3Salvos,idPrd3Salvos,ConstraintType.MUST);
			var c28 = DatasetFactory.createConstraint("CODIGOPRD3SALVOS",codigoPrd3Salvos,codigoPrd3Salvos,ConstraintType.MUST);
			var c29 = DatasetFactory.createConstraint("IDML3SALVOS",idMl3Salvos,idMl3Salvos,ConstraintType.MUST);
			var c30 = DatasetFactory.createConstraint("INDICE3SALVOS",indice3Salvos,indice3Salvos,ConstraintType.MUST);
			var c31 = DatasetFactory.createConstraint("PRODUTORM4SALVOS",produtoRm4Salvos,produtoRm4Salvos,ConstraintType.MUST);
			var c32 = DatasetFactory.createConstraint("IDPRD4SALVOS",idPrd4Salvos,idPrd4Salvos,ConstraintType.MUST);
			var c33 = DatasetFactory.createConstraint("CODIGOPRD4SALVOS",codigoPrd4Salvos,codigoPrd4Salvos,ConstraintType.MUST);
			var c34 = DatasetFactory.createConstraint("IDML4SALVOS",idMl4Salvos,idMl4Salvos,ConstraintType.MUST);
			var c35 = DatasetFactory.createConstraint("INDICE4SALVOS",indice4Salvos,indice4Salvos,ConstraintType.MUST);
			var c36 = DatasetFactory.createConstraint("PRODUTORM5SALVOS",produtoRm5Salvos,produtoRm5Salvos,ConstraintType.MUST);
			var c37 = DatasetFactory.createConstraint("IDPRD5SALVOS",idPrd5Salvos,idPrd5Salvos,ConstraintType.MUST);
			var c38 = DatasetFactory.createConstraint("CODIGOPRD5SALVOS",codigoPrd5Salvos,codigoPrd5Salvos,ConstraintType.MUST);
			var c39 = DatasetFactory.createConstraint("IDML5SALVOS",idMl5Salvos,idMl5Salvos,ConstraintType.MUST);
			var c40 = DatasetFactory.createConstraint("INDICE5SALVOS",indice5Salvos,indice5Salvos,ConstraintType.MUST);
			var c41 = DatasetFactory.createConstraint("PRODUTORM6SALVOS",produtoRm6Salvos,produtoRm6Salvos,ConstraintType.MUST);
			var c42 = DatasetFactory.createConstraint("IDPRD6SALVOS",idPrd6Salvos,idPrd6Salvos,ConstraintType.MUST);
			var c43 = DatasetFactory.createConstraint("CODIGOPRD6SALVOS",codigoPrd6Salvos,codigoPrd6Salvos,ConstraintType.MUST);
			var c44 = DatasetFactory.createConstraint("IDML6SALVOS",idMl6Salvos,idMl6Salvos,ConstraintType.MUST);
			var c45 = DatasetFactory.createConstraint("INDICE6SALVOS",indice6Salvos,indice6Salvos,ConstraintType.MUST);
			var c46 = DatasetFactory.createConstraint("UNDPRD1SALVOS",undPrd1Salvos,undPrd1Salvos,ConstraintType.MUST);
			var c47 = DatasetFactory.createConstraint("UNDPRD2SALVOS",undPrd2Salvos,undPrd2Salvos,ConstraintType.MUST);
			var c48 = DatasetFactory.createConstraint("UNDPRD3SALVOS",undPrd3Salvos,undPrd3Salvos,ConstraintType.MUST);
			var c49 = DatasetFactory.createConstraint("UNDPRD4SALVOS",undPrd4Salvos,undPrd4Salvos,ConstraintType.MUST);
			var c50 = DatasetFactory.createConstraint("UNDPRD5SALVOS",undPrd5Salvos,undPrd5Salvos,ConstraintType.MUST);
			var c51 = DatasetFactory.createConstraint("UNDPRD6SALVOS",undPrd6Salvos,undPrd6Salvos,ConstraintType.MUST);
			
			var constraints = new Array(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c14,c15,c16,c17,c18,c19,c20,c21,c22,c23,c24,c25,c26,c27,c28,c29,c30,c31,c32,c33,c34,c35,c36,c37,c38,c39,c40,c41,c42,c43,c44,c45,c46,c47,c48,c49,c50,c51);
			
			dataset = DatasetFactory.getDataset("dsInsertItemListaMateriaisOS",null,constraints,null);
			
			console.log("INSERI NO BANCO LISTA DE MATERIAIS")
			
			
		}
		
	}
	
}

// VERIFICA SE EXISTEM ITENS CRIADOS NA VIEW DA TABELA DE PROCESSOS
function tabelaProcessoExiste(){
	
	var ret = false
	
	// PERCORRE A TABELA E COLETA TODOS OS REGISTROS
	$('input[id^="VIEWPRIORIDADE___"]').each(function(index, value){
		
		ret = true
		
	})
	
	return ret
	
}

// VERIFICA SE EXISTEM ITENS CRIADOS NA VIEW DA TABELA DE COMPONENTES
function tabelaComponentesExiste(){
	
	var ret = false
	
	// PERCORRE A TABELA E COLETA TODOS OS REGISTROS
	$('input[id^="VIEWPRODUTOCOMPONENTES___"]').each(function(index, value){
		
		ret = true
		
	})
	
	return ret
	
}

// CARREGA TABELA DE COMPONENTES
function carregaTabelaComponentes(){
	
	console.log("vou salvar os itens de componentes")
	
	// PERCORRE A TABELA E COLETA TODOS OS REGISTROS
	$('input[id^="VIEWPRODUTOCOMPONENTES___"]').each(function(index, value){
		
		var seq = $(this).attr("id").split("___")[1]	
		
		//var row = addComponente(idCriacao)
		
		console.log("VOU INSERIR UM ITEM NA TABELA DE COMPONENTES")
		
		var produtoComp = $("#VIEWPRODUTOCOMPONENTES___"+seq).val()
		var idPrdComp = $("#VIEWIDPRDCOMPONENTES___"+seq).val()
		var codigoPrdComp = $("#VIEWCODIGOPRDCOMPONENTES___"+seq).val()
		var codUndComp = $("#VIEWCODUNDCOMPONENTES___"+seq).val()
		var idCriacaoComp = $("#VIEWIDCRIACAOCOMPONENTES___"+seq).val()
		var qtdeUnComp = $("#VIEWQTDEUNCOMPONENTES___"+seq).val()
		var qtdeTotalComp = $("#VIEWQTDETOTALCOMPONENTES___"+seq).val()
		var listaComp = $("#VIEWLISTACOMPONENTES___"+seq).val()
		var insumoComp = $("#VIEWINSUMOCOMPONENTES___"+seq).val()
		var substitutoComp = $("#VIEWSUBSTITUTOCOMPONENTES___"+seq).val()
		var prioridadeAtv = $("#VIEWPRIORIDADEATVCOMPONENTES___"+seq).val()
		var osComp = $("#VIEWOSCOMPONENTES___"+seq).val()
		var idComp = $("#VIEWIDCOMPONENTES___"+seq).val()
		
		// SE ITEM NÃO VEIO DA LISTA DE MATERIAIS
		if(!(listaComp=="L")){
			
			console.log("produtoComp: "+produtoComp+", idPrdComp: "+idPrdComp+", codigoPrdComp: "+codigoPrdComp+", codUndComp: "+codUndComp+", idCriacaoComp: "+idCriacaoComp+
					", qtdeUnComp: "+qtdeUnComp+", qtdeTotalComp: "+qtdeTotalComp+", listaComp: "+listaComp+", insumoComp: "+insumoComp+", substitutoComp: "+substitutoComp+
					", osComp: "+osComp+", idComp: "+idComp+", prioridadeAtv: "+prioridadeAtv)
			
			// CONSTRÓI AS CONSTRAINTS PARA REALIZAR O UPDATE DAS INFORMAÇÕES
			var c1 = DatasetFactory.createConstraint("PRODUTOCOMPONENTES",produtoComp,produtoComp,ConstraintType.MUST);
			var c2 = DatasetFactory.createConstraint("IDPRDCOMPONENTES",idPrdComp,idPrdComp,ConstraintType.MUST);
			var c3 = DatasetFactory.createConstraint("CODIGOPRDCOMPONENTES",codigoPrdComp,codigoPrdComp,ConstraintType.MUST);
			var c4 = DatasetFactory.createConstraint("CODUNDCOMPONENTES",codUndComp,codUndComp,ConstraintType.MUST);
			var c5 = DatasetFactory.createConstraint("IDCRIACAOCOMPONENTES",idCriacaoComp,idCriacaoComp,ConstraintType.MUST);
			var c6 = DatasetFactory.createConstraint("QTDEUNCOMPONENTES",qtdeUnComp,qtdeUnComp,ConstraintType.MUST);
			var c7 = DatasetFactory.createConstraint("QTDETOTALCOMPONENTES",qtdeTotalComp,qtdeTotalComp,ConstraintType.MUST);
			var c8 = DatasetFactory.createConstraint("LISTACOMPONENTES",listaComp,listaComp,ConstraintType.MUST);
			var c9 = DatasetFactory.createConstraint("INSUMOCOMPONENTES",insumoComp,insumoComp,ConstraintType.MUST);
			var c10 = DatasetFactory.createConstraint("SUBSTITUTOCOMPONENTES",substitutoComp,substitutoComp,ConstraintType.MUST);
			var c11 = DatasetFactory.createConstraint("OSCOMPONENTES",osComp,osComp,ConstraintType.MUST);
			var c12 = DatasetFactory.createConstraint("IDCOMPONENTES",idComp,idComp,ConstraintType.MUST);
			var c13 = DatasetFactory.createConstraint("PRIORIDADEATVCOMPONENTES",prioridadeAtv,prioridadeAtv,ConstraintType.MUST);
			
			var constraints = new Array(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13);
			
			var dataset = DatasetFactory.getDataset("dsInsertItemComponentesOS",null,constraints,null);
			
			console.log("INSERI NO BANCO O COMPONENTE")
			
		}
		
	})
		
}

// BUSCA O MÁXIMO ID DA TABELA COMPONENTES
function maxIdComponentes(){
	
	dataset = DatasetFactory.getDataset("dsMaxIdComponentesOS", null,null,null);
	var row = dataset.values;
	var rep = row[0];
	var id = rep["IDMAX"];
	
	return id

} 

// BUSCA O MÁXIMO ID DA TABELA PROCESSOS
function maxIdProcesso(){
	
	dataset = DatasetFactory.getDataset("dsMaxIdProcessoOS", null,null,null);
	var row = dataset.values;
	var rep = row[0];
	var id = rep["IDMAX"];
	
	return id

} 

// CARREGA TABELA DE PROCESSOS
function carregaTabelaProcessos(){
	
	console.log("vou salvar os itens de processos")
	
	// PERCORRE A TABELA E COLETA TODOS OS REGISTROS
	$('input[id^="VIEWPRIORIDADE___"]').each(function(index, value){
		
		var seq = $(this).attr("id").split("___")[1]	
		
		var idProcesso = $("#VIEWIDPROCESSO___"+seq).val()
		var osProcesso = $("#VIEWOSPROCESSO___"+seq).val()
		var idCriacaoProcesso = $("#VIEWIDCRIACAOPROCESSO___"+seq).val()
		var prioridade = $("#VIEWPRIORIDADE___"+seq).val()
		var codAtividade = $("#VIEWCODATIVIDADE___"+seq).val()
		var descAtividade = $("#VIEWDESCATIVIDADE___"+seq).val()
		var habilidadeRequerida = $("#VIEWHABILIDADEREQUERIDA___"+seq).val()
		var codHabilidade = $("#VIEWHABILIDADEREQUERIDA___"+seq).val()
		var codPosto = $("#VIEWCODPOSTO___"+seq).val()
		var descPosto = $("#VIEWDESCPOSTO___"+seq).val()
		var fila = $("#VIEWFILA___"+seq).val()
		var configuracao = $("#VIEWCONFIGURACAO___"+seq).val()
		var processamento = $("#VIEWPROCESSAMENTO___"+seq).val()
		var desagregacao = $("#VIEWDESAGREGACAO___"+seq).val()
		var espera = $("#VIEWESPERA___"+seq).val()
		var movimentacao = $("#VIEWMOVIMENTACAO___"+seq).val()
		var minutosGastos = $("#VIEWMINUTOSGASTOS___"+seq).val()
		var descProcesso = $("#VIEWDESCPROCESSO___"+seq).val()
		var docApoioAtv1 = $("#VIEWDOCAPOIOATV1___"+seq).val()
		var docApoioAtv2 = $("#VIEWDOCAPOIOATV2___"+seq).val()
		var docApoioAtv3 = $("#VIEWDOCAPOIOATV3___"+seq).val()
		var docApoioAtv4 = $("#VIEWDOCAPOIOATV4___"+seq).val()
		var fornPara = $("#VIEWFORNPARA___"+seq).val()
		
		console.log("idProcesso: "+idProcesso+", osProcesso: "+osProcesso+", idCriacaoProcesso: "+idCriacaoProcesso+", prioridade: "+prioridade+", codAtividade: "+codAtividade+
				", descAtividade: "+descAtividade+", habilidadeRequerida: "+habilidadeRequerida+", codHabilidade: "+codHabilidade+", codPosto: "+codPosto+", descPosto: "+descPosto+
				", fila: "+fila+", configuracao: "+configuracao+", processamento: "+processamento+", desagregacao: "+desagregacao+", espera: "+espera+", movimentacao: "+movimentacao+
				", minutosGastos: "+minutosGastos+", descProcesso: "+descProcesso+", docApoioAtv1: "+docApoioAtv1+", docApoioAtv2: "+docApoioAtv2+", docApoioAtv3: "+docApoioAtv3+
				", docApoioAtv4: "+docApoioAtv4+", fornPara: "+fornPara)
		
		// CONSTRÓI AS CONSTRAINTS PARA REALIZAR O UPDATE DAS INFORMAÇÕES
		var c1 = DatasetFactory.createConstraint("IDPROCESSO",idProcesso,idProcesso,ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("OSPROCESSO",osProcesso,osProcesso,ConstraintType.MUST);
		var c3 = DatasetFactory.createConstraint("IDCRIACAOPROCESSO",idCriacaoProcesso,idCriacaoProcesso,ConstraintType.MUST);
		var c4 = DatasetFactory.createConstraint("PRIORIDADE",prioridade,prioridade,ConstraintType.MUST);
		var c5 = DatasetFactory.createConstraint("CODATIVIDADE",codAtividade,codAtividade,ConstraintType.MUST);
		var c6 = DatasetFactory.createConstraint("DESCATIVIDADE",descAtividade,descAtividade,ConstraintType.MUST);
		var c7 = DatasetFactory.createConstraint("HABILIDADEREQUERIDA",habilidadeRequerida,habilidadeRequerida,ConstraintType.MUST);
		var c8 = DatasetFactory.createConstraint("CODHABILIDADE",codHabilidade,codHabilidade,ConstraintType.MUST);
		var c9 = DatasetFactory.createConstraint("CODPOSTO",codPosto,codPosto,ConstraintType.MUST);
		var c10 = DatasetFactory.createConstraint("DESCPOSTO",descPosto,descPosto,ConstraintType.MUST);
		var c11 = DatasetFactory.createConstraint("FILA",fila,fila,ConstraintType.MUST);
		var c12 = DatasetFactory.createConstraint("CONFIGURACAO",configuracao,configuracao,ConstraintType.MUST);
		var c13 = DatasetFactory.createConstraint("PROCESSAMENTO",processamento,processamento,ConstraintType.MUST);
		var c14 = DatasetFactory.createConstraint("DESAGREGACAO",desagregacao,desagregacao,ConstraintType.MUST);
		var c15 = DatasetFactory.createConstraint("ESPERA",espera,espera,ConstraintType.MUST);
		var c16 = DatasetFactory.createConstraint("MOVIMENTACAO",movimentacao,movimentacao,ConstraintType.MUST);
		var c17 = DatasetFactory.createConstraint("MINUTOSGASTOS",minutosGastos,minutosGastos,ConstraintType.MUST);
		var c18 = DatasetFactory.createConstraint("DESCPROCESSO",descProcesso,descProcesso,ConstraintType.MUST);
		var c19 = DatasetFactory.createConstraint("DOCAPOIOATV1",docApoioAtv1,docApoioAtv1,ConstraintType.MUST);
		var c20 = DatasetFactory.createConstraint("DOCAPOIOATV2",docApoioAtv2,docApoioAtv2,ConstraintType.MUST);
		var c21 = DatasetFactory.createConstraint("DOCAPOIOATV3",docApoioAtv3,docApoioAtv3,ConstraintType.MUST);
		var c22 = DatasetFactory.createConstraint("DOCAPOIOATV4",docApoioAtv4,docApoioAtv4,ConstraintType.MUST);
		var c23 = DatasetFactory.createConstraint("FORNPARA",fornPara,fornPara,ConstraintType.MUST);

		var constraints = new Array(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c14,c15,c16,c17,c18,c19,c20,c21,c22,c23);
		
		dataset = DatasetFactory.getDataset("dsInsertItemProcessoOS",null,constraints,null);
		
		console.log("INSERI NO BANCO O PROCESSO")
		
	})
	
}

// VERIFICA SE TEM ITEM NA TABELA COMPONENTE
function temItemComponente(idCriacao, idprd){
	
	var ret = false
	
	// PERCORRE A TABELA E COLETA TODOS OS REGISTROS
	$('input[id^="PRODUTOCOMPONENTES___"]').each(function(index, value){
		
		var seq = $(this).attr("id").split("___")[1]	
		
		var idCriacaoTabela = $("#IDCRIACAOCOMPONENTES___"+seq).val()
		var idprdTabela = $("#IDPRDCOMPONENTES___"+seq).val()
		
		// SE IDCRIAÇÃO E IDPRD JÁ FORAM SALVOS NA TABELA, O ITEM JÁ FOI SALVO
		if(idCriacaoTabela==idCriacao && idprdTabela==idprd){
			
			ret = true
			
		}
		
	})
	
	return ret
	
}

// LIMPA A TABELA DE COMPONENTES
function limparTabelaComponentes(){
	
	// PERCORRE A TABELA E COLETA TODOS OS NÍVEIS
	$('input[id^="VIEWPRODUTOCOMPONENTES___"]').each(function(index, value){
		
		$(this).parents("tr").remove();
		
	})
	
}

// LIMPA A TABELA DE PROCESSOS
function limparTabelaProcessos(){
	
	// PERCORRE A TABELA E COLETA TODOS OS NÍVEIS
	$('input[id^="VIEWPRIORIDADE___"]').each(function(index, value){
		
		$(this).parents("tr").remove();
		
	})
	
}

// LIMPA CAMPOS DO CABEÇALHO
function limpaCabIndice(){
	
	//$("#INC_1").val("")
	$("#INDICE_INFO").val("")
	$("#SEQ_INFO").val("")
	$("#NUMDESENHO_INFO").val("")
	$("#DESCRICAO_INFO").val("")
	$("#POSICAO_INFO").val()
	
	// TIRA A SELECAO DO ITEM
	tiraSelecao()
	
}

function LimpaFormulario(){

	Swal.fire({
		title: '<strong>Confirme o cancelamento</strong>',
		html: 'Ao cancelar <strong> TODOS </strong>os dados  do formulário serão limpos ',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: '<strong>Sim, limpar preenchimento!</strong>',
		cancelButtonText: '<strong>Manter Preenchimento!</strong>',
		allowOutsideClick : false,
		allowEscapeKey : false,
	}).then(function(result){

		if (result.isConfirmed) {

			var myLoading = FLUIGC.loading(window,
				{textMessage:  'Limpando dados...',title: 'Aguarde!',
				css: {
					padding:        0,
					margin:         0,
					width:          '15%',
					top:            '40%',
					left:           '42.5%',
					textAlign:      'center',
					cursor:         'wait',
					border: 'none',
					backgroundColor: 'transparent',
				},
				overlayCSS:  { 
					opacity:         0.6, 
					cursor:          'wait'
				}, 
			})
			myLoading.show()

			setTimeout(function(){

				window.location.reload();

			},2000)
		
		}

	})

}

function carregaModalLotes(seq){

	var coligada = $("#CODCOLIGADAPEND").val() == "" ? $("#CODCOLIGADAPENDPAPC").val() : $("#CODCOLIGADAPEND").val()

	var prod = $("#CODIGOPRDCOMP___"+seq).val()

	var c1 = DatasetFactory.createConstraint("COLIGADA",coligada,coligada,ConstraintType.MUST)
	var c2 = DatasetFactory.createConstraint("PRODUTO",prod,prod,ConstraintType.MUST)

	var constraints = new Array(c1,c2);
	
	dataset = DatasetFactory.getDataset("dsRelatorioLoteProduto",null,constraints,null);

	var rows = dataset.values
	var count = rows.length
	var rep;
	var seq2;

	$("#LOTESBLANK").find("tbody").empty()

	for(var i=0;i < count; i++){

		rep = rows[i]

		seq2 = adicionaLinhaLote()

		$("#MODALLOTESID___"+seq2).val(rep["IDLOTE"])
		$("#MODALLOTESNUMERO___"+seq2).val(rep["NUMLOTE"])
		$("#MODALLOTESSALDOTOTAL___"+seq2).val(rep["SALDOTOTAL"])
		$("#MODALLOTESSTATUS___"+seq2).val(rep["STATUS"])
		$("#MODALLOTESLOCALDEESTOQUE___"+seq2).val(rep["CODLOC"])

	}

	window.location.href="#LOTESBLANK"

}

// PREENCHE O FORMULÁRIO COM OS DADOS DO ITEM DO CROQUI SELECIONADO
function preencheForm(arrayIdCriacao) {
	
	ativaSpinner()
	
	setTimeout(function(){
		
		console.log("vou preencher o form")
		
		// LIMPA O FORMULÁRIO
		limparForm()
		
		console.log("entrei para preencher o formulário do idCriacao: "+arrayIdCriacao)
	
		var atv = $("#ATIVIDADE").val()
		var numOS = $("#NUM_OS").val()
		var idCriacao = arrayIdCriacao

		// PREENCHE O FORMULÁRIO COM OS DADOS DO ITEM SELECIONADO NA TABELA
		// CONSTRÓI A CONSULTA DO DATASET
		var a1 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
		var a2 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
		
		var constraints = new Array(a1,a2)
		var dataset = DatasetFactory.getDataset("dsBuscaItemEstruturaOS",null,constraints,null)
	
		var row = dataset.values

		// SE O RETORNO NÃO É NULO E NEM VAZIO
		if(!(row=="" || row==null || row==undefined || row=="null")){

			var rep = row[0]

			var indice = rep["INDICE"]

			if(!(indice=="" || indice==null || indice==undefined || indice=="null")){
				$("#F_INDICE").val(indice)
			}
		
		}

		limpaView();

		preenchePendApontamento(idCriacao)
		preenchePendSaldo(idCriacao)
		preenchePendComponentes(idCriacao)

		
		$(".FORMULARIO").show()
		$(".CABECALHO").hide()
		$(".VIEW").hide()
		$(".SOLABERTAS").hide()
			
		// ESCONDE/MOSTRA OS BOTÕES
		$(".INCLUIR").hide()
		$(".CANCELAR").show()
		
		$(".SALVAR2").hide()
		$(".SALVAR").hide()
		$(".REMOVER").hide()
		$("#DIV_INDICECOPIA").hide()
		$(".EDITAR").hide()
		$(".APROVACAO").hide()

		$("#F_INDICE").val($("[onclick='preencheForm("+arrayIdCriacao+")']").parent().attr("id").split("SPAN")[1].replace(/P/g,'.'))
		
		// COLOCA O FOCO NO INÍCIO DO FORMULÁRIO
		//$("#F_OS").focus();

		
	},500)
	
	setTimeout(function(){
	
		desativaSpinner()
	
	},500)
		
}

// BUSCA A OP REFERENTE AO PRODUTO
function buscaOPdoProduto(idprd){

	var numOS = $("#NUM_OS").val()
	var execucao = $("#EXECUCAO_INFO").val()
	var ops = ""
	
	console.log("vou buscar a OP do Produto")
	console.log("idprd: "+idprd+", numOS: "+numOS+", execucao: "+execucao)
	
	var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("IDPRD",idprd,idprd,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("EXECUCAO",execucao,execucao,ConstraintType.MUST)
	
	var constraints = new Array(a1,a2,a3)
	
	var dataset = DatasetFactory.getDataset("dsEXItemTemOP",null,constraints,null)
	
	var row = dataset.values
	
	console.log("row")
	console.log(row)
	
	// SE RETORNO NÃO É NULO OU VAZIO
	if(!(row=="" || row==null || row==undefined)){
		
		var count = row.length
		
		for(var i=0; i<count; i++){

			var rep = row[i]
			
			if(i==0){
				
				ops = rep["CODORDEM"]
				
			} else {
				
				ops = ops +", "+rep["CODORDEM"]
					
			}
			
		}
		
	}
	
	console.log("ops: "+ops)
	
	// SALVA AS OP'S
	$("#F_OP").val(ops)
	
}

// MOSTRA/ESCONDE A DIV DA CÓPIA DO PROCESSO
function mostraDivCopiaProc(){
	
	if(!($("#F_BITOLA").prop("readonly"))){
		
		// SE A DIV TEM A CLASSE VISÍVEL
		if($("#DIV_INDICECOPIA").hasClass("visivel")){
			
			$("#DIV_INDICECOPIA").removeClass("visivel")
			$("#DIV_INDICECOPIA").hide()
			$("#INDICE_PROCESSO").val("")
			
		} else {
			// SE NÃO 
			
			$("#DIV_INDICECOPIA").addClass("visivel")
			$("#DIV_INDICECOPIA").show()
			$("#INDICE_PROCESSO").val("")
			
		}
		
	}
	
}


// BUSCA TODOS OS CÓDIGOS DAS ATIVIDADES INSERIDAS NO PROCESSO
function buscaCodAtvsProc(){
	
	var atividades = ""
	
	// PERCORRE TODOS OS REGISTROS DA TABELA DE PROCESSO
	$("input[id^='VIEWPRIORIDADE___']").each(function(index,value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var codAtv = $("#VIEWCODATIVIDADE___"+seq).val()
		
		if(atividades==""){
			
			atividades = codAtv
		
		} else{
			
			atividades = atividades+";"+codAtv
			
		}
		
	})
	
	var index = atividades.lastIndexOf(";")
	
	atividades = atividades.substr(0,index)
	
	console.log("atividades: "+atividades)
	
	return atividades
	
}

// SE ITEM ESTÁ SENDO DETALHADO EM OUTRA SOLICITAÇÃO
function itemEstaDetalhado(idCriacao){

	var numOS = $("#NUM_OS").val()
	
	var b1 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
	var b2 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	
	var constraints = new Array(b1,b2)
	
	var dataset = DatasetFactory.getDataset("dsBuscaItemEstruturaOS",null,constraints,null)
	
	var row = dataset.values
	var rep = row[0]
	
	var detalhado = rep["DETALHADO"]
	
	// SE ITEM ESTÁ SENDO DETALHADO
	if(detalhado=="SIM"){
		
		return true
		
	} else {
		// SE NÃO ESTÁ
		
		return false
		
	}
	
}

// PERCORRE OS CAMPOS DO FORMULÁRIO E DESABILITA-OS
function desabilitaCampos() {
	
	//console.log("entrei para desabilitar campos")
	
	// PREENCHE O FORMULÁRIO COM OS DADOS DO ITEM SELECIONADO NA TABELA
	
	//$("#F_TITULOITEM").prop("readonly",true)
	//$("#F_OS").prop("readonly",true)
	//$("#F_POSICAOCOMPLETA").prop("readonly",true)
	//$("#F_QUANTIDADEMATERIAL").prop("readonly",true)
	//$("#F_TOTALQTDE").prop("readonly",true)
	//$("#F_SEQ").prop("readonly",true)
	//var tipo = $("#VALOR_RADIO1").val()
	//$("#F_CATEGORIA").prop("readonly",true)
	$("#F_NIVEL").prop("readonly",true)
	$("#F_DATAREVISAO").prop("readonly",true)
	$("#F_POSICAOINDICE").prop("readonly",true)
	$("#F_INDICEANTIGO").prop("readonly",true)
	$("#F_POSICAODESENHO").prop("readonly",true)
	$("#F_OBSERVACOESDESENHO").prop("readonly",true)
	$("#F_PESOUNITARIO").prop("readonly",true)
	$("#F_PESOBRUTO").prop("readonly",true)
	$("#F_PESOLIQUIDO").prop("readonly",true)
	$("#F_PERIMETROCORTE").prop("readonly",true)
	$("#F_AREAPINTURA").prop("readonly",true)
	$("#F_OBSPROCESSO").prop("readonly",true)
	$("#F_OBSGERAL").prop("readonly",true)
	$("#F_NUMDBI").prop("readonly",true)
	$("#F_REVISAODBI").prop("readonly",true)
	$("#F_NUMDESENHO").prop("readonly",true)
	$("#F_REVISAODESENHO").prop("readonly",true)
	$("#F_DESQTDE").prop("readonly",true)
	$("#F_DESCRICAO").prop("readonly",true)
	$("#F_BITOLA").prop("readonly",true)
	$("#F_ESPESSURA").prop("readonly",true)
	$("#F_LARGURA").prop("readonly",true)
	$("#F_MASSALINEAR").prop("readonly",true)
	$("#F_ESPROSCA").prop("readonly",true)
	$("#F_COMPRIMENTO").prop("readonly",true)
	$("#F_MATERIAL").prop("readonly",true)
	$("#ABRIR_ZOOM").prop("disabled",true)
	$("#LIMPAR_ZOOM").prop("disabled",true)
	$("#F_UNDMEDIDA").prop("disabled",true)
	$("#F_DIAMETROEXTERNO").prop("readonly",true)
	$("#F_DIAMETROINTERNO").prop("readonly",true)
	$("#F_OBSERVACOES").prop("readonly",true)
	$("#F_AREASECAO").prop("readonly",true)
	$("#F_ALTURA").prop("readonly",true)
	$("#F_LARGURAABA").prop("readonly",true)
	$("#F_ESPALMA").prop("readonly",true)
	$("#F_ESPABA").prop("readonly",true)
	$("#F_COMPORLISTA").prop("disabled",true)
	$("#F_OPSUNITARIAS").prop("disabled",true)
	$("#F_NUMDOCDELP").prop("readonly",true)
	$("#F_REVISAODOCDELP").prop("readonly",true)
	$("#F_DIAMETROEXTERNODISCO").prop("readonly",true)
	$("#F_DIAMETROINTERNODISCO").prop("readonly",true)
	
	$("#F_CODIGOTAREFA").prop("disabled",true)
	$("#F_CODTRFITEM").prop("readonly",true)
	$("#F_IDTRFITEM").prop("readonly",true)
	$("#F_NOMETRFITEM").prop("readonly",true)
	
	//$("#F_CODIGOTRFPAI").prop("disabled",true)
	//$("#F_CODTRFPAI").prop("readonly",true)
	//$("#F_IDTRFPAI").prop("readonly",true)
	//$("#F_NOMETRFPAI").prop("readonly",true)
	
	var tipoDesenho = $("#VALOR_RADIO2").val()
	var qtdeUnComp = $("#VALOR_RADIO4").val()
	
	//var produtoRM = $("#F_PRODUTO_RM").val()
	
	//if(produtoRM=="" || produtoRM==null){
		
	$("#F_PRODUTO_RM").prop("readonly",true)
	$("#F_PRODUTO_RM").attr("onclick",null)
	$("#ABRIR_ZOOM").attr("onclick",null)
	$("#LIMPAR_ZOOM").attr("onclick",null)
	
	$("#F_CODIGOTAREFA").attr("onclick",null)
	$("#ABRIR_ZOOM_TAREFA").attr("onclick",null)
	$("#LIMPAR_ZOOM_TAREFA").attr("onclick",null)
	
	$("#F_CODIGOTRFPAI").attr("onclick",null)
	$("#ABRIR_ZOOM_TAREFA_PAI").attr("onclick",null)
	$("#LIMPAR_ZOOM_TAREFA_PAI").attr("onclick",null)
	
	//}
	
	$("#ADICIONARCOMPONENTE").hide()
	
	// PERCORRE A TABELA COMPONENTES E DESABILITA AS FUNCIONALIDADES  
	$("input[id^='VIEWPRODUTOCOMPONENTES___']").each(function(index,value){
	
		var seq = $(this).attr("id").split("___")[1]
		
		$("#VIEWPRODUTOCOMPONENTES___"+seq).attr("onclick",null)
		$("#ABRIRZOOM___"+seq).attr("onclick",null)
		$("#LIMPARZOOM___"+seq).attr("onclick",null)
		$("#ICONLIMPAR___"+seq).hide()
		$("#ICONZOOM___"+seq).hide()
		$("#EXCLUIRCOMPONENTE___"+seq).hide()
		$("#VIEWQTDEUNCOMPONENTES___"+seq).prop("readonly",true)
		$("#VIEWQTDETOTALCOMPONENTES___"+seq).prop("readonly",true)
		$("#VIEWSUBSTITUTOCOMPONENTES___"+seq).prop("disabled",true)
		$("#VIEWPRIORIDADEATVCOMPONENTES___"+seq).prop("readonly",true)
		
	})
	
	$("#ADICIONARPROCESSO").hide()
	
	// PERCORRE A TABELA PROCESSO E DESABILITA AS FUNCIONALIDADES  
	$("input[id^='VIEWPRIORIDADE___']").each(function(index,value){
	
		var seq = $(this).attr("id").split("___")[1]
		
		$("#VIEWATIVIDADE___"+seq).attr("onclick",null)
		$("#ABRIRZOOMATV___"+seq).attr("onclick",null)
		$("#LIMPARZOOMATV___"+seq).attr("onclick",null)
		$("#ICONLIMPARATV___"+seq).hide()
		$("#ICONZOOMATV___"+seq).hide()
		
		$("#VIEWPOSTO___"+seq).attr("onclick",null)
		$("#ABRIRZOOMPOSTO___"+seq).attr("onclick",null)
		$("#LIMPARZOOMPOSTO___"+seq).attr("onclick",null)
		$("#ICONLIMPARPOSTO___"+seq).hide()
		$("#ICONZOOMPOSTO___"+seq).hide()
		
		$("#EXCLUIRPROCESSO___"+seq).hide()
		$("#COPIARPROCESSO___"+seq).hide()
		$("#VIEWPRIORIDADE___"+seq).prop("readonly",true)
		$("#VIEWFILA___"+seq).prop("readonly",true)
		$("#VIEWCONFIGURACAO___"+seq).prop("readonly",true)
		$("#VIEWPROCESSAMENTO___"+seq).prop("readonly",true)
		$("#VIEWDESAGREGACAO___"+seq).prop("readonly",true)
		$("#VIEWESPERA___"+seq).prop("readonly",true)
		$("#VIEWMOVIMENTACAO___"+seq).prop("readonly",true)
		//$("#VIEWMINUTOSGASTOS___"+seq).prop("readonly",true)
		$("#VIEWDESCPROCESSO___"+seq).prop("readonly",true)
		$("#VIEWDOCAPOIOATV1___"+seq).prop("readonly",true)
		$("#VIEWDOCAPOIOATV2___"+seq).prop("readonly",true)
		$("#VIEWDOCAPOIOATV3___"+seq).prop("readonly",true)
		$("#VIEWDOCAPOIOATV4___"+seq).prop("readonly",true)
		$("#VIEWFORNPARA___"+seq).prop("readonly",true)
		
	})
	
	// SE TIPO DO DESENHO FOR ACABADO
	if(tipoDesenho=='ACABADO'){
	
		$("#RAD2_ACABADO").prop("checked",true)
		
	}
	
	// SE TIPO DO DESENHO FOR SEMIACABADO
	if(tipoDesenho=='SEMIACABADO'){
		
		$("#RAD2_SEMI").prop("checked",true)
		
	}
	
	// SE TIPO DO DESENHO FOR NAOMANUFATURADO
	if(tipoDesenho=='NAOMANUFATURADO'){
		
		$("#RAD2_NAOMANUF").prop("checked",true)
		
	}
	
	// SE TIPO DO DESENHO FOR INDUSTRIALIZACAO
	if(tipoDesenho=='INDUSTRIALIZACAO'){
		
		$("#RAD2_INDUSTR").prop("checked",true)
		
	}
	
	console.log("qtdeUnComp: "+qtdeUnComp)
	
	// SE QTDE UN COMP É DESENHO
	if(qtdeUnComp=="DESENHO"){
		
		$("#RAD4_DESENHO").prop("checked",true)
		
	}
	
	// SE QTDE UN COMP É PESO UNITÁRIO
	if(qtdeUnComp=="PESOUNITARIO"){
		
		$("#RAD4_PESOUN").prop("checked",true)
		
	}

	// DESABILITA OS RADIOS
	$("#RAD2_ACABADO").prop("disabled",true)
	$("#RAD2_SEMI").prop("disabled",true)
	$("#RAD2_NAOMANUF").prop("disabled",true)
	$("#RAD2_INDUSTR").prop("disabled",true)
	$("#RAD4_DESENHO").prop("disabled",true)
	$("#RAD4_PESOUN").prop("disabled",true)
	
}

//PERCORRE OS CAMPOS DO FORMULÁRIO E HABILITA-OS
function habilitaCampos() {
	
	$("#F_NIVEL").prop("readonly",false)
	$("#F_POSICAOINDICE").prop("readonly",false)
	//$("#F_POSICAODESENHO").prop("readonly",false)
	$("#F_INDICEANTIGO").prop("readonly",false)
	$("#F_NUMDBI").prop("readonly",false)
	$("#F_REVISAODBI").prop("readonly",false)
	//$("#F_NUMDESENHO").prop("readonly",false)
	$("#F_REVISAODESENHO").prop("readonly",false)
	//$("#F_DESQTDE").prop("readonly",false)
	//$("#F_DESCRICAO").prop("readonly",false)
	$("#F_ESPESSURA").prop("readonly",false)
	$("#F_BITOLA").prop("readonly",false)
	$("#F_LARGURA").prop("readonly",false)
	$("#F_MASSALINEAR").prop("readonly",false)
	$("#F_ESPROSCA").prop("readonly",false)
	$("#F_DIAMETROEXTERNO").prop("readonly",false)
	$("#F_DIAMETROINTERNO").prop("readonly",false)
	$("#F_COMPRIMENTO").prop("readonly",false)
	$("#F_MATERIAL").prop("readonly",false)
	$("#ABRIR_ZOOM").prop("disabled",false)
	$("#LIMPAR_ZOOM").prop("disabled",false)
	$("#F_UNDMEDIDA").prop("disabled",false)
	$("#F_DATAREVISAO").prop("readonly",false)
	$("#F_OBSERVACOESDESENHO").prop("readonly",false)
	$("#F_PESOUNITARIO").prop("readonly",false)
	//$("#F_PESOBRUTO").prop("readonly",false)
	//$("#F_PESOLIQUIDO").prop("readonly",false)
	$("#F_PERIMETROCORTE").prop("readonly",false)
	$("#F_AREAPINTURA").prop("readonly",false)
	$("#F_OBSPROCESSO").prop("readonly",false)
	$("#F_OBSGERAL").prop("readonly",false)
	$("#F_AREASECAO").prop("readonly",false)
	$("#F_ALTURA").prop("readonly",false)
	$("#F_LARGURAABA").prop("readonly",false)
	$("#F_ESPALMA").prop("readonly",false)
	$("#F_ESPABA").prop("readonly",false)
	$("#F_NUMDOCDELP").prop("readonly",false)
	$("#F_REVISAODOCDELP").prop("readonly",false)
	$("#F_COMPORLISTA").prop("disabled",false)
	$("#F_OPSUNITARIAS").prop("disabled",false)
	//$("#F_POSICAOCOMPLETA").prop("readonly",false)
	//$("#F_TOTALQTDE").prop("readonly",false)
	//$("#F_CATEGORIA").prop("readonly",false)
	//$("#F_TITULOITEM").prop("readonly",false)
	//$("#F_QUANTIDADEMATERIAL").prop("readonly",false)
	//$("#F_SEQ").prop("readonly",false)
	//$("#F_OS").prop("readonly",false)
	$("#F_CODIGOTAREFA").prop("disabled",false)
	$("#F_CODTRFITEM").prop("readonly",false)
	$("#F_IDTRFITEM").prop("readonly",false)
	$("#F_NOMETRFITEM").prop("readonly",false)
	$("#F_DIAMETROEXTERNODISCO").prop("readonly",false)
	$("#F_DIAMETROINTERNODISCO").prop("readonly",false)
	//$("#F_CODIGOTRFPAI").prop("disabled",false)
	//$("#F_CODTRFPAI").prop("readonly",false)
	//$("#F_IDTRFPAI").prop("readonly",false)
	//$("#F_NOMETRFPAI").prop("readonly",false)
	
	$("#F_PRODUTO_RM").attr("onclick","zoomMaterial('material');")
	$("#ABRIR_ZOOM").attr("onclick","zoomMaterial('material');")
	$("#LIMPAR_ZOOM").attr("onclick","limparZoomProduto();")
	
	$("#F_CODIGOTAREFA").attr("onclick","zoomTarefa('tarefa');")
	$("#ABRIR_ZOOM_TAREFA").attr("onclick","zoomTarefa('tarefa');")
	$("#LIMPAR_ZOOM_TAREFA").attr("onclick","limparZoomTarefa();")
	
	$("#F_CODIGOTRFPAI").attr("onclick","zoomTarefaPai('tarefaPai');")
	$("#ABRIR_ZOOM_TAREFA_PAI").attr("onclick","zoomTarefaPai('tarefaPai');")
	$("#LIMPAR_ZOOM_TAREFA_PAI").attr("onclick","limparZoomTarefaPai();")
	
	$("#ADICIONARCOMPONENTE").show()
	
	// PERCORRE A TABELA COMPONENTES E DESABILITA AS FUNCIONALIDADES  
	$("input[id^='VIEWPRODUTOCOMPONENTES___']").each(function(index,value){
	
		var seq = $(this).attr("id").split("___")[1]
		var lista = $("#VIEWLISTACOMPONENTES___"+seq).val()
		var substituto = $("#VIEWSUBSTITUTOCOMPONENTES___"+seq).val()
		
		console.log("lista "+lista)
		
		// SE O ITEM NÃO VEIO DA LISTA
		if(!(lista=="L")){
		
			$("#VIEWPRODUTOCOMPONENTES___"+seq).attr("onclick","zoomComponentes('componentes',this);")
			$("#ABRIRZOOM___"+seq).attr("onclick","zoomComponentes('componentes',this);")
			$("#LIMPARZOOM___"+seq).attr("onclick","limparZoom(this);")
			//$("#EXCLUIRCOMPONENTE___"+seq).prop("disabled",false)
			$("#EXCLUIRCOMPONENTE___"+seq).show()
			$("#ICONLIMPAR___"+seq).show()
			$("#ICONZOOM___"+seq).show()
			$("#VIEWSUBSTITUTOCOMPONENTES___"+seq).prop("disabled",false)
			$("#VIEWPRIORIDADEATVCOMPONENTES___"+seq).prop("readonly",false)
			
			if(substituto=="" || substituto==null || substituto==undefined){
				
				$("#VIEWQTDEUNCOMPONENTES___"+seq).prop("readonly",false)
				$("#VIEWQTDETOTALCOMPONENTES___"+seq).prop("readonly",false)
				
			} 
			
		} else {
			
			$("#VIEWPRIORIDADEATVCOMPONENTES___"+seq).prop("readonly",true)
			
		}
	
	})
	
	$("#ADICIONARPROCESSO").show()
	
	// PERCORRE A TABELA PROCESSO E DESABILITA AS FUNCIONALIDADES  
	$("input[id^='VIEWPRIORIDADE___']").each(function(index,value){
	
		var seq = $(this).attr("id").split("___")[1]
		
		$("#VIEWATIVIDADE___"+seq).attr("onclick","zoomAtividade('atividade',this);")
		$("#ABRIRZOOMATV___"+seq).attr("onclick","zoomAtividade('atividade',this);")
		$("#LIMPARZOOMATV___"+seq).attr("onclick","limparZoomAtv(this);")
		$("#ICONLIMPARATV___"+seq).show()
		$("#ICONZOOMATV___"+seq).show()
		
		$("#VIEWPOSTO___"+seq).attr("onclick","zoomPosto('posto',this);")
		$("#ABRIRZOOMPOSTO___"+seq).attr("onclick","zoomPosto('posto',this);")
		$("#LIMPARZOOMPOSTO___"+seq).attr("onclick","limparZoomPosto(this);")
		$("#ICONLIMPARPOSTO___"+seq).show()
		$("#ICONZOOMPOSTO___"+seq).show()
		
		$("#EXCLUIRPROCESSO___"+seq).show()
		$("#COPIARPROCESSO___"+seq).show()
		$("#VIEWPRIORIDADE___"+seq).prop("readonly",false)
		$("#VIEWFILA___"+seq).prop("readonly",false)
		$("#VIEWCONFIGURACAO___"+seq).prop("readonly",false)
		$("#VIEWPROCESSAMENTO___"+seq).prop("readonly",false)
		$("#VIEWDESAGREGACAO___"+seq).prop("readonly",false)
		$("#VIEWESPERA___"+seq).prop("readonly",false)
		$("#VIEWMOVIMENTACAO___"+seq).prop("readonly",false)
		//$("#VIEWMINUTOSGASTOS___"+seq).prop("readonly",false)
		$("#VIEWDESCPROCESSO___"+seq).prop("readonly",false)
		$("#VIEWDOCAPOIOATV1___"+seq).prop("readonly",false)
		$("#VIEWDOCAPOIOATV2___"+seq).prop("readonly",false)
		$("#VIEWDOCAPOIOATV3___"+seq).prop("readonly",false)
		$("#VIEWDOCAPOIOATV4___"+seq).prop("readonly",false)
		$("#VIEWFORNPARA___"+seq).prop("readonly",false)
		
	})
	
	var tipoDesenho = $("#VALOR_RADIO2").val()
	
	console.log("--------------------- TIPO DESENHO: "+tipoDesenho)
	
	// SE TIPO DO DESENHO FOR ACABADO
	if(tipoDesenho=='ACABADO'){
	
		$("#RAD2_ACABADO").prop("checked",true)
		
	}
	
	// SE TIPO DO DESENHO FOR SEMIACABADO
	if(tipoDesenho=='SEMIACABADO'){
		
		$("#RAD2_SEMI").prop("checked",true)
		
	}
	
	// SE TIPO DO DESENHO FOR NAOMANUFATURADO
	if(tipoDesenho=='NAOMANUFATURADO'){
		
		console.log("vou checar MANUFATURADO")
		
		$("#RAD2_NAOMANUF").prop("checked",true)
		
	}
	
	// SE TIPO DO DESENHO FOR INDUSTRIALIZAÇÃO
	if(tipoDesenho=='INDUSTRIALIZACAO'){
		
		console.log("vou checar INDUSTRIALIZACAO")
		
		$("#RAD2_INDUSTR").prop("checked",true)
		
	}

	// HABILITA RADIOS
	$("#RAD2_ACABADO").prop("disabled",false)
	$("#RAD2_SEMI").prop("disabled",false)
	$("#RAD2_NAOMANUF").prop("disabled",false)
	$("#RAD2_INDUSTR").prop("disabled",false)
	//$("#RAD_MP").prop("disabled",false)
	$("#RAD2_ACABADO").prop("disabled",false)
	$("#RAD2_SEMI").prop("disabled",false)
	$("#RAD2_NAOMANUF").prop("disabled",false)
	$("#RAD2_INDUSTR").prop("disabled",false)
	//$("#RAD2_MP").prop("disabled",false)
	
}

// APAGA O ITEM DA TABELA DE COMPONENTES
function apagaItemComponentes(idCriacao,idComponentes){
	
	var ret = false
	
	// PERCORRE A TABELA E BUSCA O MAIOR ID CRIAÇÃO
	$('input[id^="PRODUTOCOMPONENTES___"]').each(function(index, value){
		
		var seq = $(this).attr("id").split("___")[1]
		var idComponentesTab = $("#IDCOMPONENTES___"+seq).val()
		var idCriacaoTab = $("#IDCRIACAOCOMPONENTES___"+seq).val()
		
		if(idCriacao==idCriacaoTab && idComponentesTab==idComponentes){
			
			$("#LINHAPROCESSO___"+seq).remove()
			ret = true
			
		}
		
	})
	
	return ret
	
}

//FAZ UMA CÓPIA DO ITEM NA TABELA DE PROCESSOS
function copiarProcesso(obj){
	
	// EXIBE ALERTA
	Swal.fire({
	
		  title: 'Tem certeza que deseja copiar este item?',
		  text: "Atenção, o item copiado será inserido no final da tabela.",
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
			  
			// EXIBE ALERTA DA CÓPIA
			var Toast = Swal.mixin({
				  toast: true,
				  position: 'center',
				  showConfirmButton: false,
				  timer: 1000,
				  timerProgressBar: true,
			})
		
			Toast.fire({
				  icon: 'success',
				  title: 'Item copiado!'
			})
	    
		    // ATIVA O LOADING
		    ativaSpinner()
		  
		    var seq = $(obj).attr("id").split("___")[1]
	
			//var atividade = $("#VIEWATIVIDADE___"+seq).val()
			//var codAtividade = $("#VIEWCODATIVIDADE___"+seq).val()
			//var descAtividade = $("#VIEWDESCATIVIDADE___"+seq).val()
			//var habilidade = $("#VIEWHABILIDADEREQUERIDA___"+seq).val()
			//var codHabilidade = $("#VIEWCODHABILIDADE___"+seq).val()
			var posto = $("#VIEWPOSTO___"+seq).val()
			var codPosto = $("#VIEWCODPOSTO___"+seq).val()
			var descPosto = $("#VIEWDESCPOSTO___"+seq).val()
			var fila = $("#VIEWFILA___"+seq).val()
			var configuracao = $("#VIEWCONFIGURACAO___"+seq).val()
			var processamento = $("#VIEWPROCESSAMENTO___"+seq).val()
			var desagregacao = $("#VIEWDESAGREGACAO___"+seq).val()
			var espera = $("#VIEWESPERA___"+seq).val()
			var movimentacao = $("#VIEWMOVIMENTACAO___"+seq).val()
			var minutos = $("#VIEWMINUTOSGASTOS___"+seq).val()
			var descProcesso = $("#VIEWDESCPROCESSO___"+seq).val()
			var docApoioAtv1 = $("#VIEWDOCAPOIOATV1___"+seq).val()
			var docApoioAtv2 = $("#VIEWDOCAPOIOATV2___"+seq).val()
			var docApoioAtv3 = $("#VIEWDOCAPOIOATV3___"+seq).val()
			var docApoioAtv4 = $("#VIEWDOCAPOIOATV4___"+seq).val()
			var fornPara = $("#VIEWFORNPARA___"+seq).val()
			
			var row = addViewProcesso()
			
			//$("#VIEWATIVIDADE___"+row).val(atividade)
			//$("#VIEWCODATIVIDADE___"+row).val(codAtividade)
			//$("#VIEWDESCATIVIDADE___"+row).val(descAtividade)
			//$("#VIEWHABILIDADEREQUERIDA___"+row).val(habilidade)
			//$("#VIEWCODHABILIDADE___"+row).val(codHabilidade)
			$("#VIEWPOSTO___"+row).val(posto)
			$("#VIEWCODPOSTO___"+row).val(codPosto)
			$("#VIEWDESCPOSTO___"+row).val(descPosto)
			$("#VIEWFILA___"+row).val(fila)
			$("#VIEWCONFIGURACAO___"+row).val(configuracao)
			$("#VIEWPROCESSAMENTO___"+row).val(processamento)
			$("#VIEWDESAGREGACAO___"+row).val(desagregacao)
			$("#VIEWESPERA___"+row).val(espera)
			$("#VIEWMOVIMENTACAO___"+row).val(movimentacao)
			$("#VIEWMINUTOSGASTOS___"+row).val(minutos)
			$("#VIEWDESCPROCESSO___"+row).val(descProcesso)
			$("#VIEWDOCAPOIOATV1___"+row).val(docApoioAtv1)
			$("#VIEWDOCAPOIOATV2___"+row).val(docApoioAtv2)
			$("#VIEWDOCAPOIOATV3___"+row).val(docApoioAtv3)
			$("#VIEWDOCAPOIOATV4___"+row).val(docApoioAtv4)
			$("#VIEWFORNPARA___"+row).val(fornPara)
		    
		    // DESATIVA O LOADING
		    desativaSpinner()
		    
		  } /*else {
			  
			  
			  
		  }*/
	  
	})
	
}

//VERIFICA SE O ÍNDICE FOI ALTERADO
function verificaAlteracaoIndice(novaIndice,indiceAntigo,seq){
	
	console.log("estou na função de verifica alteração do índice")
	console.log("indiceAntigo: "+indiceAntigo)
	
	// SE ÍNDICE ANTIGO NÃO ESTÁ VAZIO
	if(!(indiceAntigo=="")){
		
		console.log("entrei para exibir alerta da mudança da árvore")
		// SE A POSIÇÃO FOI ALTERADA
		//if(!(novaPosicaoCompleta==posicaoCompletaAntiga)){
			
		// EXIBE ALERTA
		Swal.fire({
			
			  title: 'O índice foi alterado. A mudança afetará todos os eventuais filhos deste item. Deseja continuar?',
			  text: "Não será possível desfazer essa ação.",
			  icon: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#B0C4DE',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Sim',
			  cancelButtonText: 'Cancelar'
				  
			}).then(function(result){
			
			  // SE ALTERAÇÃO FOR CONFIRMADA
			  if (result.value) {
				  
				  var novoNivel = novoIndice.substring(0,novoIndice.lastIndexOf("."))
				  var novaPosicao = novoIndice.substring(novoIndice.lastIndexOf("."),novoIndice.length)
				  novaPosicao = novaPosicao.replace(".","")
				  
				  console.log("novoNivel: "+novoNivel+", novaPosicao: "+novaPosicao)
				  
					// FAZ A ALTERAÇÃO DO ATUAL E DE TODOS OS FILHOS
					alteraIndice(novoIndice,indiceAntigo,seq,novoNivel,novaPosicao,0)
					
					  
				// SALVA AS NOVAS INFORMAÇÕES 
				//var posAnt = $("#POSICAOCOMPLETA___"+seq).val()
				$("#INDICEANTIGO___"+seq).val(indiceAntigo)
				//$("#POSICAOCOMPLETA___"+seq).val(novaPosicaoCompleta)
				$("#POSICAOINDICE___"+seq).val(novaPosicao)
				$("#NIVEL___"+seq).val(novoNivel)
				$("#INDICE___"+seq).val(novoIndice)
				  
				// FINALIZA A OPERAÇÃO DE SALVAR
				finalizarSalvar(2)
				
				var numOS = $("#NUM_OS").val()
	
				// CONSULTA BANCO
				var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
				var constraints = new Array(c1);
				
				//dataset = DatasetFactory.getDataset("dsBuscaEstruturaIntegrada",null,constraints,null);
				dataset = DatasetFactory.getDataset("dsBuscaEstrutura",null,constraints,null);
				
				// QUANTIDADE DE REGISTROS DA CONSULTA
				var row = dataset.values;
				
				// FAZ A ALTERAÇÃO DO CÁLCULO DAS QUANTIDADES 
				alteraDesQtdeGeral()
					
				// EXIBE ALERTA
			    Swal.fire(
			      'Posição alterada!',
			      'success'
			    )
			    
			  //}
			      
			 }

			  
		})
	
		console.log("finalizei a função da alteração da posição")
		
	}
	
}

// PERCORRE A TABELA E REMOVE TODOS OS EVENTUAIS FILHOS
function removeFilhos(indice,id,indices){
	
	console.log("entrei para remover Filhos")
	
	// ENQUANTO TEM FILHOS
	while(idTemFilho(indice,indices,0)){
		
		console.log("tem filho")
		
		filho = idTemFilho(indice,indices,1)
		
		console.log("vou buscar filhos de: "+filho)
		
		removeFilhos(filho,id+1,indices)
		
	}
	
	// SE NÃO FOR A PRIMEIRA RECURSÃO
	if(!(id==0)){
		
		// ENQUANTO TEM IRMÃO 
		while(idTemIrmaoEsq(indice,indices,0)){
			
			var irmao = idTemIrmaoEsq(indice,indices,1)
			
			console.log("tem irmão")
			
			console.log("vou buscar irmãos de: "+irmao)
			
			removeFilhos(irmao,id+1,indices)
			
		}
		
	}
	
	console.log("vou remover "+indice+" e salvar")
	
	// BUSCA O IDCRIAÇÃO
	var idCriacao = buscaIdCriacao(indice)
	
	indices.splice(indices.indexOf(indice),1)	
	
	// REMOVE ÍNDICE DA TABELA
	removeItem(idCriacao)
	
}

// REMOVE O ITEM
function removeItem(idCriacao){
	
	var numOS = $("#NUM_OS").val()
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	var c2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
	var constraints = new Array(c1,c2)
	
	dataset = DatasetFactory.getDataset("dsDeleteEstruturaOS",null,constraints,null)
	
	// REMOVE OS COMPONENTES DOS ITENS
	removeItensComponentes(idCriacao)
	
	// REMOVE OS PROCESSOS DOS ITENS
	removeItensProcesso(idCriacao)
	
}

// REMOVE ITENS DA ESTRUTURA PRINCIPAL
function removeEstruturaOS(){
	
	var numOS = $("#NUM_OS").val()
	var deletados = $("#DELETADOS").val()
	var removidos = ""
	
	console.log("IDCRIACAO dos itens que foram deletados: "+deletados)
		
	// SE HOUVE DELETADOS 
	if(!(deletados=="" || deletados==null || deletados==undefined)){
	
		deletados = deletados.toString()
		
		// SE DELETADOS CONTÉM ","
		if(deletados.includes(",")){
			
			removidos = deletados.split(',')
			
		} else {
			
			removidos = deletados.split("")
			
		}
		
		// PERCORRE TODOS OS ITENS QUE FORAM REMOVIDOS
		for(var i=0; i<removidos.length; i++){
			
			var idCriacao = removidos[i]
			
			console.log("Vou remover da estrutura principal o idCriacao: "+idCriacao)
			
			// CONSTRÓI A CONSULTA DO DATASET
			var a1 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
			var a2 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
			
			var constraints = new Array(a1,a2)
			var dataset = DatasetFactory.getDataset("dsDeleteEstruturaOS",null,constraints,null)
			
		}
		
	}
		
}

// REMOVE ITENS DA TABELA DE COMPONENTES
function removeComponentesOS(){
	
	var numOS = $("#NUM_OS").val()
	var deletados = $("#DELETADOS").val()
	var removidos = ""

	console.log("IDCRIACAO dos itens que foram deletados: "+deletados)
		
	// SE HOUVE DELETADOS 
	if(!(deletados=="" || deletados==null || deletados==undefined)){
		
		deletados = deletados.toString()
		
		// SE DELETADOS CONTÉM ","
		if(deletados.includes(",")){
			
			removidos = deletados.split(',')
			
		} else {
			
			removidos = deletados.split("")
			
		}
		
		// PERCORRE TODOS OS ITENS QUE FORAM REMOVIDOS
		for(var i=0; i<removidos.length; i++){
			
			var idCriacao = removidos[i]
	
			console.log("Vou remover da tabela componentes o idCriacao: "+idCriacao)
			
			// CONSTRÓI A CONSULTA DO DATASET
			var a1 = DatasetFactory.createConstraint("IDCRIACAOCOMPONENTES",idCriacao,idCriacao,ConstraintType.MUST)
			var a2 = DatasetFactory.createConstraint("OSCOMPONENTES",numOS,numOS,ConstraintType.MUST)
			var constraints = new Array(a1,a2)
			var dataset = DatasetFactory.getDataset("dsDeleteComponentesOS",null,constraints,null)
	
		}
		
	}
	
}

// REMOVE ITENS DA TABELA DE PROCESSO
function removeProcessoOS(){
	
	var numOS = $("#NUM_OS").val()
	var deletados = $("#DELETADOS").val()
	var removidos = ""
	
	console.log("IDCRIACAO dos itens que foram deletados: "+deletados)
		
	// SE HOUVE DELETADOS 
	if(!(deletados=="" || deletados==null || deletados==undefined)){
	
		deletados = deletados.toString()
		
		// SE DELETADOS CONTÉM ","
		if(deletados.includes(",")){
			
			removidos = deletados.split(',')
			
		} else {
			
			removidos = deletados.split("")
			
		}
		
		// PERCORRE TODOS OS ITENS QUE FORAM REMOVIDOS
		for(var i=0; i<removidos.length; i++){
			
			var idCriacao = removidos[i]
	
			console.log("Vou remover da tabela processo o idCriacao: "+idCriacao)
			
			// CONSTRÓI A CONSULTA DO DATASET
			var a1 = DatasetFactory.createConstraint("IDCRIACAOPROCESSO",idCriacao,idCriacao,ConstraintType.MUST)
			var a2 = DatasetFactory.createConstraint("OSPROCESSO",numOS,numOS,ConstraintType.MUST)
			var constraints = new Array(a1,a2)
			var dataset = DatasetFactory.getDataset("dsDeleteProcessoOS",null,constraints,null)
	
		}
		
	}

}

// REMOVE OS PROCESSOS DOS ITENS
function removeItensProcesso(idCriacao){
	
	var numOS = $("#NUM_OS").val()
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OSPROCESSO",numOS,numOS,ConstraintType.MUST)
	var c2 = DatasetFactory.createConstraint("IDCRIACAOPROCESSO",idCriacao,idCriacao,ConstraintType.MUST)
	var constraints = new Array(c1,c2)
	
	dataset = DatasetFactory.getDataset("dsDeleteProcessoOS",null,constraints,null)
	
}

// REMOVE OS COMPONENTES DOS ITENS
function removeItensComponentes(idCriacao){
	
	console.log("Vou remover componentes ")
	
	var numOS = $("#NUM_OS").val()
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OSCOMPONENTES",numOS,numOS,ConstraintType.MUST)
	var c2 = DatasetFactory.createConstraint("IDCRIACAOCOMPONENTES",idCriacao,idCriacao,ConstraintType.MUST)
	var constraints = new Array(c1,c2)
	
	dataset = DatasetFactory.getDataset("dsDeleteComponentesOS",null,constraints,null)
	
}

// ATUALIZA OS SEQ'S DA TABELA
function atualizaSeq(){
	
	console.log("vou atualizar seq's")
	
	// PERCORRE A TABELA E CORRIGE OS SEQ'S DE ACORDO COM A ALTERAÇÃO
	$('input[id^="NIVEL___"]').each(function(index, value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var seqTabela = $("#SEQ___"+seq).val()
		
		console.log("seq: "+seq+", seqTabela: "+seqTabela)
		
		// SE O SEQ ESTÁ DIFERENTE, ALTERA
		if(!(seq==seqTabela)){
			console.log("seqs diferentes, vou alterar")
			// FAZ A ALTERAÇÃO DO SEQ
			$("#SEQ___"+seq).val(seq)
			
		}
		
	})
	
}

//BUSCA SE O IDCRIACAO DO BANCO
function buscaIdCriacaoTab(){
	
	var maxIdCriacao = 0
	
	var numOS = $("#NUM_OS").val()
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	var constraints = new Array(c1)
	
	dataset = DatasetFactory.getDataset("dsBuscaMaxIdCriacaoEstruturaOS",null,constraints,null)
	
	var row = dataset.values
	var rep = row[0]
	
	maxIdCriacao = rep["IDMAX"]
	console.log("IDMAX do banco: "+maxIdCriacao)
	
	return maxIdCriacao
	
}

// BUSCA O MAIOR ID
function buscaIdComponentes(idCriacao){
	
	console.log("vou buscar o ID Componentes")
	
	var maxIdCriacao = 0
	
	// PERCORRE A TABELA E BUSCA O MAIOR ID COMPONENTES
	$('input[id^="VIEWPRODUTOCOMPONENTES___"]').each(function(index, value){
		
		var seq = $(this).attr("id").split("___")[1]
		var idCriacaoTab = $("#VIEWIDCRIACAOCOMPONENTES___"+seq).val()
		var idCriacaoComp = $("#VIEWIDCOMPONENTES___"+seq).val()
		
		idCriacaoComp = parseInt(idCriacaoComp)
	
		if(idCriacaoTab==idCriacao){
			console.log("achei um item com o mesmo idCriacao")
			if(idCriacaoComp>=maxIdCriacao){
				console.log("o idCriacaoComp "+idCriacaoComp+" é maior ou igual ao maxIdCriacao "+maxIdCriacao)
				maxIdCriacao = idCriacaoComp
				
			}
			
		}
		
	})
	
	console.log("o maxIdCriacao encontrado foi "+maxIdCriacao)
	
	maxIdCriacao += 1
	
	console.log("vou retornar o "+maxIdCriacao)
	
	return maxIdCriacao++
	
}

// BUSCA O MAIOR ID
function buscaIdProcesso(idCriacao){
	
	console.log("vou buscar o ID Processo")

	var maxIdCriacao = 0
	
	// PERCORRE A TABELA E BUSCA O MAIOR ID CRIAÇÃO
	$('input[id^="VIEWPRIORIDADE___"]').each(function(index, value){
		
		var seq = $(this).attr("id").split("___")[1]
		var idCriacaoTab = $("#VIEWIDCRIACAOPROCESSO___"+seq).val()
		var idCriacaoProc = $("#VIEWIDPROCESSO___"+seq).val()
		
		idCriacaoProc = parseInt(idCriacaoProc)
	
		if(idCriacaoTab==idCriacao){
			console.log("achei um item com o mesmo idCriacao")
			if(idCriacaoProc>=maxIdCriacao){
				console.log("o idCriacaoProc "+idCriacaoProc+" é maior ou igual ao maxIdCriacao "+maxIdCriacao)
				maxIdCriacao = idCriacaoProc
				
			}
			
		}
		
	})
	
	console.log("o maxIdCriacao encontrado foi "+maxIdCriacao)
	
	maxIdCriacao += 1
	
	console.log("vou retornar o "+maxIdCriacao)
	
	return maxIdCriacao
	
}

// APAGA O ITEM DA TABELA PROCESSO QUE FOI EXCLUÍDO
function apagaItemProcesso(idCriacao,idProcesso){
	
	var ret = false
	
	// PERCORRE A TABELA E BUSCA O MAIOR ID CRIAÇÃO
	$('input[id^="PRIORIDADE___"]').each(function(index, value){
		
		var seq = $(this).attr("id").split("___")[1]
		var idProcessoTab = $("#IDPROCESSO___"+seq).val()
		var idCriacaoTab = $("#IDCRIACAOPROCESSO___"+seq).val()
		
		if(idCriacao==idCriacaoTab && idProcessoTab==idProcesso){
			
			$("#LINHAPROCESSO___"+seq).remove()
			ret = true
			
		}
		
	})
	
	return ret
	
}

// BUSCA O IDCRIACAO DE UM INDICE
function buscaIdCriacaoEX(indice){
	
	var idCriacao = ""
	var numOS = $("#NUM_OS").val()
	var execucao = $("#EXECUCAO_INFO").val()
	
	console.log("vou buscar o idCriacao do indice "+indice)
	
	// CONSTRÓI A CONSTRAINT DO BANCO
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("INDICE",indice,indice,ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("EXECUCAO",execucao,execucao,ConstraintType.MUST);
	
	var constraints = new Array(c1,c2,c3);
	
	var dataset = DatasetFactory.getDataset("dsEXBuscaIdCriacaoItemOS",null,constraints,null);
	
	var row = dataset.values;
	console.log("row")
	console.log(row)
	
	// SE RETORNO NÃO É NULO
	if(!(row=="" || row==undefined || row==null || row=="null")){
		
		var rep = row[0]
		idCriacao = rep["IDCRIACAO"]
		
	}
	
	console.log("O indice "+indice+" tem o idCriacao "+idCriacao)
	
	return idCriacao
	
}

// BUSCA O IDCRIACAO DE UM INDICE
function buscaIdCriacao(indice){
	
	var numOS = $("#NUM_OS").val()
	var idCriacao = ""
	
	console.log("vou buscar o idCriacao do indice "+indice)
	
	// CONSTRÓI A CONSTRAINT DO BANCO
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("INDICE",indice,indice,ConstraintType.MUST);
	var constraints = new Array(c1,c2);
	
	dataset = DatasetFactory.getDataset("dsBuscaIdCriacaoItemOS",null,constraints,null);
	
	var row = dataset.values;
	console.log("row")
	console.log(row)
	
	// SE RETORNO NÃO É NULO
	if(!(row=="" || row==undefined || row==null || row=="null")){
		
		var rep = row[0]
		idCriacao = rep["IDCRIACAO"]
		
	}
	
	console.log("O indice "+indice+" tem o idCriacao "+idCriacao)
	
	return idCriacao
	
}

// BUSCA O IDCRIACAO DE UM INDICE
/*function buscaIdCriacaoIndAnt(indice){
	
	var numOS = $("#NUM_OS").val()
	
	console.log("vou buscar o idCriacao do indice "+indice)
	
	// CONSTRÓI A CONSTRAINT DO BANCO
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("INDICEANTIGO",indice,indice,ConstraintType.MUST);
	var constraints = new Array(c1,c2);
	
	dataset = DatasetFactory.getDataset("dsBuscaIdCriacaoIndAntOS",null,constraints,null);
	
	var row = dataset.values;
	console.log("row")
	console.log(row)
	
	var rep = row[0]
	
	var idCriacao = rep["IDCRIACAO"]
	
	return idCriacao
	
}*/

// FAZ A ALTERAÇÃO DE TODOS OS ÍNDICES DOS FILHOS
function alteraIndice(novoIndice,indiceAntigo,idCriacao,novoNivel,novaPosicao,id,indices){
	
	var numOS = $("#NUM_OS").val()
	var arrayAntigos = new Array()
	var arrayNovos = new Array()
	var indiceAntigoFilho = ""
	var novoNivelFilho = ""
	var posicaoFilho = ""
	var novoIndiceFilho = ""	
		
	// ENQUANTO TEM FILHOS
	while(idTemFilho(indiceAntigo,indices,0)){
		
		console.log(indiceAntigo+" tem filho")
		
		filho = idTemFilho(indiceAntigo,indices,1)
		
		console.log("o filho de "+indiceAntigo+" é o "+filho)
		var idCriacaoFilho = buscaIdCriacao(filho)
		
		posicaoFilho = filho.substr(filho.lastIndexOf(".")+1,filho.length)
		
		novoNivelFilho = novoIndice
		novoIndiceFilho = novoIndice+"."+posicaoFilho
		
		console.log("filho: "+filho+", novoFilho: "+novoIndiceFilho)
		
		// CHAMA FUNÇÃO PARA ALTERAR OS ÍNDICES
		alteraIndice(novoIndiceFilho,filho,idCriacaoFilho,novoNivelFilho,posicaoFilho,id+1,indices)
		
		arrayAntigos.push(indiceAntigoFilho)
		arrayNovos.push(novoIndiceFilho)
		
	} 
	
	// SE NÃO É O PRIMEIRO DA RECURSÃO
	if(!(id==0)){
		
		// ENQUANTO TEM IRMÃO 
		while(idTemIrmaoDir(indiceAntigo,indices,0)){
			
			console.log(indiceAntigo+" tem irmão")
			// VARIÁVIES PARA SALVAR INFORMAÇÕES NECESSÁRIAS
			
			var irmao = idTemIrmaoDir(indiceAntigo,indices,1)
			//var novaPosicaoCompletaFilho = ""
			
			var idCriacaoIrmao = ""	
			var novoNivelIrmao = ""
			var novoIndiceIrmao = ""
			var posicaoIrmao = ""
				
			var idCriacaoIrmao = buscaIdCriacao(irmao)
			
			posicaoIrmao = irmao.substring(irmao.lastIndexOf(".")+1,irmao.length)
			
			novoIndiceIrmao = novoNivel+"."+posicaoIrmao
			
			console.log("irmão: "+irmao+", novoIrmao: "+novoIndiceIrmao)
			
			// CHAMA FUNÇÃO PARA ALTERAR OS ÍNDICES
			alteraIndice(novoIndiceIrmao,irmao,idCriacaoIrmao,novoNivel,posicaoIrmao,id+1,indices)
			
			arrayAntigos.push(irmao)
			arrayNovos.push(novoIndiceIrmao)
		
		}
		
	}
	 
	console.log("vou salvar a alteração da "+novoIndice+", que tem o nível: "+novoNivel+" que antes era "+indiceAntigo+" e novaPosição: "+novaPosicao)
	
	// SALVA AS NOVAS INFORMAÇÕES 
	
	// CONSTRÓI A CONSULTA DO DATASET
	var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("INDICEANTIGO",indiceAntigo,indiceAntigo,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("INDICE",novoIndice,novoIndice,ConstraintType.MUST)
	var a4 = DatasetFactory.createConstraint("POSICAOINDICE",novaPosicao,novaPosicao,ConstraintType.MUST)
	var a5 = DatasetFactory.createConstraint("NIVEL",novoNivel,novoNivel,ConstraintType.MUST)
	var a6 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
	var constraints = new Array(a1,a2,a3,a4,a5,a6)
	
	var dataset = DatasetFactory.getDataset("dsAlteraIndiceOS",null,constraints,null)
	
	indices.splice(indices.indexOf(indiceAntigo),1)
	
	arrayAntigos = arrayAntigos.concat(arrayNovos)
	
	return arrayAntigos
	
}

// SALVA O INDICE ANTIGO
function salvaIndiceAntigo(indice,idCriacao){
	
	var numOS = $("#NUM_OS").val()
	
	// CONSTRÓI A CONSULTA DO DATASET
	var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("INDICEANTIGO",indice,indice,ConstraintType.MUST)
	var constraints = new Array(a1,a2,a3)
	
	var dataset = DatasetFactory.getDataset("dsUpdateIndiceAntigoOS",null,constraints,null)
	
}

// PERCORRE A TABELA E REFAZ OS CÁLCULOS TOTAIS DA QUANTIDADE
function alteraDesQtdeGeral(){

	console.log("vou alterar a desQtde de todos os itens")

	var numOS = $("#NUM_OS").val()
	var totalQtde 
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
	var constraints = new Array(c1);
	
	//dataset = DatasetFactory.getDataset("dsBuscaEstruturaIntegrada",null,constraints,null);
	dataset = DatasetFactory.getDataset("dsBuscaEstrutura",null,constraints,null);
	
	// QUANTIDADE DE REGISTROS DA CONSULTA
	var row = dataset.values;		
	var count = dataset.values.length
	
	// CRIA E RETORNA UM ARRAY COM AS POSIÇÕES PARA A ESTRUTURA
	var indices = arrayIndices(row,count)
	
	var indicesOrdenados = montarEstrutura(indices)
	
	console.log("INDICES ORDENADOS")
	console.log(indicesOrdenados)
	
	// ORDENA OS IDCRIACAO
	var arrayIdCriacao = criaArrayIdCriacao(indicesOrdenados,row)
	
	// PERCORRE TODOS OS REGISTROS
	for(var i=0; i<indicesOrdenados.length; i++){
		
		//var rep = row[i]
		//var idCriacao = rep["IDCRIACAO"]
		
		var idCriacao = arrayIdCriacao[i]
		console.log("idCriacao: "+idCriacao)
		//var nivel = rep["NIVEL"]
		var nivel = indicesOrdenados[i].substring(0,indicesOrdenados[i].lastIndexOf("."))
	
		var totalPai
		
		// SE NÍVEL NÃO É VAZIO OU NULO
		if(!(nivel=="" || nivel==null || nivel==undefined || nivel=="null")){
		
			console.log("nivel: "+nivel)
			
			// CONSTRÓI A CONSULTA DO DATASET
			var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
			var a2 = DatasetFactory.createConstraint("NIVEL",nivel,nivel,ConstraintType.MUST)
			var constraints = new Array(a1,a2)
			var dataset = DatasetFactory.getDataset("dsBuscaQtdePaiOS",null,constraints,null)
			
			var row = dataset.values
			var rep = row[0]
			totalPai = rep["TOTALQTDE"]
		
		} else {
			// SE NÃO
			
			totalPai = 1
			
		}
		
		// CONSTRÓI A CONSULTA DO DATASET
		var b1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
		var b2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
		var constraints = new Array(b1,b2)
		var dataset = DatasetFactory.getDataset("dsBuscaQtdeItemOS",null,constraints,null)
		
		var row = dataset.values
		var rep2 = row[0]
		
		var desQtde = rep2["DESQTDE"]
		
		if(!(desQtde=="null" || desQtde==null || desQtde==undefined || desQtde==NaN || desQtde=="NaN")){
			
			desQtde = parseInt(desQtde)
			
		} else {
			
			desQtde = 0
			
		}
		
		console.log("desQtde "+desQtde)
		console.log("totalPai "+totalPai)
		console.log("nivel "+nivel)
		console.log("idCriacao "+idCriacao)
		
		// SE TOTAL PAI É VAZIO OU NULO
		if(totalPai=="" || totalPai==undefined || totalPai=="NaN" || totalPai==NaN || totalPai==null){
			
			totalPai = 1
			
		} else{
			// SE NÃO
			
			totalPai = parseInt(totalPai)
			
		}
		
		// SE NÍVEL É VAZIO
		if(nivel=="" || nivel==null || nivel==undefined || nivel=="null"){
			
			totalQtde = desQtde
			
		}
		else{
			// SE NÃO
			
			totalQtde = totalPai * desQtde
			
		}
		
		console.log("Vou atualizar o totalQtde "+totalQtde+", da OS "+numOS+" e idCriacao "+idCriacao)
		
		// SE TOTALQTDE CALCULADO NÃO É INVÁLIDO
		if(!(totalQtde=="" || totalQtde==undefined || totalQtde=="NaN" || totalQtde==NaN || totalQtde==null || totalQtde=="null")){
			
			console.log("entrei para construir as constraints e chamar o dataset do cálculo do total")
			
			// CONSTRÓI A CONSULTA DO DATASET
			var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
			var a2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
			var a3 = DatasetFactory.createConstraint("TOTALQTDE",totalQtde,totalQtde,ConstraintType.MUST)
			var constraints = new Array(a1,a2,a3)
			var dataset = DatasetFactory.getDataset("dsUpdateQtdesOS",null,constraints,null)
			
			console.log("calculei "+totalQtde)
			
		}
		
	}
	
}

// PERCORRE O NÍVEL QUE SOFREU ALTERAÇÃO E ATUALIZA OS CÁLCULOS TOTAIS DA QUANTIDADE
function alteraDesQtdeNivel(idCriacaoPai){
	
	console.log("vou alterar a desQtde de todos os itens do nivel alterado")
	
	var numOS = $("#NUM_OS").val()
	var totalQtde 
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacaoPai,idCriacaoPai,ConstraintType.MUST);
	var constraints = new Array(c1,c2);
	
	//dataset = DatasetFactory.getDataset("dsBuscaEstruturaIntegrada",null,constraints,null);
	var dataset = DatasetFactory.getDataset("dsBuscaEstruturaSubconjOS",null,constraints,null);
	
	// QUANTIDADE DE REGISTROS DA CONSULTA
	var row = dataset.values;		
	var count = dataset.values.length
	
	// CRIA E RETORNA UM ARRAY COM AS POSIÇÕES PARA A ESTRUTURA
	var indices = arrayIndices(row,count)
	
	var indicesOrdenados = montarEstrutura(indices)
	
	console.log("INDICES ORDENADOS")
	console.log(indicesOrdenados)
	
	// ORDENA OS IDCRIACAO
	var arrayIdCriacao = criaArrayIdCriacao(indicesOrdenados,row)
	
	// PERCORRE TODOS OS REGISTROS
	for(var i=0; i<indicesOrdenados.length; i++){
		
		//var rep = row[i]
		//var idCriacao = rep["IDCRIACAO"]
		
		var idCriacao = arrayIdCriacao[i]
		console.log("idCriacao: "+idCriacao)
		//var nivel = rep["NIVEL"]
		var nivel = indicesOrdenados[i].substring(0,indicesOrdenados[i].lastIndexOf("."))
	
		var totalPai
		
		// SE NÍVEL NÃO É VAZIO OU NULO
		if(!(nivel=="" || nivel==null || nivel==undefined || nivel=="null")){
		
			console.log("nivel: "+nivel)
			
			// CONSTRÓI A CONSULTA DO DATASET
			var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
			var a2 = DatasetFactory.createConstraint("NIVEL",nivel,nivel,ConstraintType.MUST)
			var constraints = new Array(a1,a2)
			var dataset = DatasetFactory.getDataset("dsBuscaQtdePaiOS",null,constraints,null)
			
			var row = dataset.values
			var rep = row[0]
			totalPai = rep["TOTALQTDE"]
		
		} else {
			// SE NÃO
			
			totalPai = 1
			
		}
		
		// CONSTRÓI A CONSULTA DO DATASET
		var b1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
		var b2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
		var constraints = new Array(b1,b2)
		var dataset = DatasetFactory.getDataset("dsBuscaQtdeItemOS",null,constraints,null)
		
		var row = dataset.values
		var rep2 = row[0]
		
		var desQtde = rep2["DESQTDE"]
		
		if(!(desQtde=="null" || desQtde==null || desQtde==undefined || desQtde==NaN || desQtde=="NaN")){
			
			desQtde = parseInt(desQtde)
			
		} else {
			
			desQtde = 0
			
		}
		
		console.log("desQtde "+desQtde)
		console.log("totalPai "+totalPai)
		console.log("nivel "+nivel)
		console.log("idCriacao "+idCriacao)
		
		// SE TOTAL PAI É VAZIO OU NULO
		if(totalPai=="" || totalPai==undefined || totalPai=="NaN" || totalPai==NaN || totalPai==null){
			
			totalPai = 1
			
		} else{
			// SE NÃO
			
			totalPai = parseInt(totalPai)
			
		}
		
		// SE NÍVEL É VAZIO
		if(nivel=="" || nivel==null || nivel==undefined || nivel=="null"){
			
			totalQtde = desQtde
			
		}
		else{
			// SE NÃO
			
			totalQtde = totalPai * desQtde
			
		}
		
		console.log("Vou atualizar o totalQtde "+totalQtde+", da OS "+numOS+" e idCriacao "+idCriacao)
		
		// SE TOTALQTDE CALCULADO NÃO É INVÁLIDO
		if(!(totalQtde=="" || totalQtde==undefined || totalQtde=="NaN" || totalQtde==NaN || totalQtde==null || totalQtde=="null")){
			
			console.log("entrei para construir as constraints e chamar o dataset")
			
			// CONSTRÓI A CONSULTA DO DATASET
			var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
			var a2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
			var a3 = DatasetFactory.createConstraint("TOTALQTDE",totalQtde,totalQtde,ConstraintType.MUST)
			var constraints = new Array(a1,a2,a3)
			var dataset = DatasetFactory.getDataset("dsUpdateQtdesOS",null,constraints,null)
			
			console.log("calculei "+totalQtde)
			
		}
		
	}
	
}

// REALIZA NOVO CÁLCULO DA QUANTIDADE TOTAL, LEVANDO EM CONSIDERAÇÃO O ÍNDICE ATUAL E O NÍVEL
function alteraDesQtde(idCriacao,nivel,totalPai,desQtde){
	
	// SE TOTAL PAI NÃO FOI PREENCHIDO OU INFORMADO
	if(totalPai=="" || totalPai==undefined || totalPai=="NaN" || totalPai==NaN || totalPai==null){
		
		totalPai = 1
		
	} else{
		
		totalPai = parseInt(totalPai)
		
	}
	
	// SE NÍVEL É VAZIO
	if(nivel==""){
		
		totalQtde = desQtde
		
	}
	else{
		// SE NÃO
		
		totalQtde = totalPai * desQtde
		
	}
	
	// SE TOTALQTDE CALCULADO NÃO É INVÁLIDO
	if(!(totalQtde=="" || totalQtde==undefined || totalQtde=="NaN" || totalQtde==NaN || totalQtde==null)){
		
		$("#TOTALQTDE___"+seq).val(totalQtde)
		console.log("calculei "+totalQtde)
		
	}
	
}

// ALTERA A QTDE DE TODOS OS COMPONENTES
function alteraQtdeComponentes(seq,totalQtde,idCriacao){
	
	var idCriacao = $("#IDCRIACAOCOMPONENTES___"+seq).val()
	var pesoBruto = $("#PESOBRUTO___"+seq).val()
	pesoBruto = parseFloat(pesoBruto)
	totalQtde = parseInt(totalQtde)
	
	var qtdeUnit = pesoBruto/totalQtde
	qtdeUnit = qtdeUnit.toFixed(4)
	
	// PERCORRE A TABELA E COLETA TODOS OS ÍNDICES
	$('input[id^="PRODUTOCOMPONENTES___"]').each(function(index, value){
		
		// VARIÁVEL PARA O ÍNDICE DA TABELA
		var seq2 = $(this).attr("id").split("___")[1]
		
		var lista = $("#LISTACOMPONENTES___"+seq2).val()
		var substituto = $("#SUBSTITUTOCOMPONENTES___"+seq2).val() 
		var idCriacaoComp = $("#IDCRIACAOCOMPONENTES___"+seq2).val()
		
		// SE ITEM VEIO DA LISTA OU SUBSTITUTO ESTÁ VAZIO
		if(lista=="L" && idCriacaoComp==idCriacao && (substituto=="" || substituto==null || substituto==undefined)){
			
			$("#QTDETOTALCOMPONENTES___"+seq2).val(pesoBruto)
			$("#QTDEUNCOMPONENTES___"+seq2).val(qtdeUnit)
			
		}
		
	})
	
} 

// ALTERA A QTDE DE TODOS OS COMPONENTES DA LISTA
function alteraQtdeComponentesPeso(){
	
	console.log("vou alterar a qtde peso")
	
	var idCriacao = $("#F_IDCRIACAO").val()
	
	var totalQtde = $("#F_TOTALQTDE").val()
	var pesoBruto = $("#F_PESOBRUTO").val()
	
	pesoBruto = parseFloat(pesoBruto)
	totalQtde = parseInt(totalQtde)
	
	var qtdeUnit = pesoBruto/totalQtde
	qtdeUnit = qtdeUnit.toFixed(4)
	
	// PERCORRE A TABELA E COLETA TODOS OS ÍNDICES
	$('input[id^="PRODUTOCOMPONENTES___"]').each(function(index, value){
		
		// VARIÁVEL PARA O ÍNDICE DA TABELA
		var seq = $(this).attr("id").split("___")[1]
		var idCriacaoComp = $("#IDCRIACAOCOMPONENTES___"+seq).val()
		
		var lista = $("#LISTACOMPONENTES___"+seq).val()
		var substituto = $("#SUBSTITUTOCOMPONENTES___"+seq).val() 
		
		// SE ITEM VEIO DA LISTA OU SUBSTITUTO ESTÁ VAZIO
		if(idCriacao==idCriacaoComp && lista=="L" && (substituto=="" || substituto==null || substituto==undefined)){
			
			$("#QTDETOTALCOMPONENTES___"+seq).val(pesoBruto)
			$("#QTDEUNCOMPONENTES___"+seq).val(qtdeUnit)
			
		}
		
	})
	
	// PERCORRE A TABELA E COLETA TODOS OS ÍNDICES
	$('input[id^="VIEWPRODUTOCOMPONENTES___"]').each(function(index, value){
		
		// VARIÁVEL PARA O ÍNDICE DA TABELA
		var seq = $(this).attr("id").split("___")[1]
		var idCriacaoComp = $("#VIEWIDCRIACAOCOMPONENTES___"+seq).val()
		
		var lista = $("#VIEWLISTACOMPONENTES___"+seq).val()
		var substituto = $("#VIEWSUBSTITUTOCOMPONENTES___"+seq).val() 
		
		// SE ITEM VEIO DA LISTA OU SUBSTITUTO ESTÁ VAZIO
		if(idCriacao==idCriacaoComp && lista=="L" && (substituto=="" || substituto==null || substituto==undefined)){
			
			$("#VIEWQTDETOTALCOMPONENTES___"+seq).val(pesoBruto)
			$("#VIEWQTDEUNCOMPONENTES___"+seq).val(qtdeUnit)
			
		}
		
	})
	
} 

//BUSCA O SEQ DO IRMÃO
function buscaSeqIrmao(irmao){
	
	var seqIrmao = ""
	console.log("vou buscar o seq de "+irmao)
	
	return seqIrmao
	
}

// BUSCA O ÍNDICE ANTIGO DO FILHO
/*function buscaIndiceAntigoFilho(indiceAntigo){
	
	var indiceAntigoFilho = ""
	var numOS = $("#NUM_OS").val()
		
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("NIVEL",indiceAntigo,indiceAntigo,ConstraintType.MUST);
	
	var constraints = new Array(c1,c2);
	
	dataset = DatasetFactory.getDataset("dsBuscaPosIndiceOS",null,constraints,null);
	
	var row = dataset.values;	
	
	var rep = row[0]
	
	indiceAntigoFilho = rep["INDICE"]

	return indiceAntigoFilho
		
}*/

// BUSCA A POSIÇÃO DO FILHO
function buscaPosicaoFilho(indiceAntigo){
	
	var posicaoFilho = ""
	
	var numOS = $("#NUM_OS").val()
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("INDICE",indiceAntigo,indiceAntigo,ConstraintType.MUST);
	
	var constraints = new Array(c1,c2);
	
	dataset = DatasetFactory.getDataset("dsBuscaPosIndiceOS",null,constraints,null);
	
	var row = dataset.values;	
	
	var rep = row[0]
	
	posicaoFilho = rep["POSICAOINDICE"]
	
	//console.log("posicaoFilho: "+posicaoFilho)
	return posicaoFilho
	
}

// BUSCA SE EXISTE UM IRMÃO À ESQUERDA
function temIrmao(indiceAntigo){
	
	var irmao = false
	var testeIrmao = ""
	
	var index = indiceAntigo.lastIndexOf(".")
	var nivel = indiceAntigo.substr(0,index)
	var posicao = indiceAntigo.substr(index+1,indiceAntigo.length)
	posicao = parseInt(posicao)
	posicao = posicao - 1
	posicao = posicao.toString()
	
	// SE NÍVEL NÃO É VAZIO
	if(!(nivel=="")){
		
		testeIrmao = nivel+"."+posicao
		
	} else {
		// SE NÃO
		
		testeIrmao = posicao
		
	}
	
	// PERCORRE A TABELA E COLETA TODOS OS ÍNDICES
	$('input[id^="NIVEL___"]').each(function(index, value){
		
		// VARIÁVEL PARA O ÍNDICE DA TABELA
		var seq = $(this).attr("id").split("___")[1]
		var indice = $("#INDICE___"+seq).val()
		
		// VERIFICA SE EXISTE UM IRMÃO À DIREITA
		if(testeIrmao==indice){
			
			irmao = true
			
		} 
		
	})
	
	console.log("temIrmao: "+irmao)
	return irmao
	
}

// BUSCA SE EXISTE UM IRMÃO À DIREITA
function temIrmaoDireita(indiceAntigo){
	
	var irmao = false
	var testeIrmao = ""
	
	var index = indiceAntigo.lastIndexOf(".")
	var nivel = indiceAntigo.substr(0,index)
	var posicao = indiceAntigo.substr(index+1,indiceAntigo.length)
	posicao = parseInt(posicao)
	posicao = posicao + 1
	posicao = posicao.toString()
	
	// SE NÍVEL NÃO É VAZIO
	if(!(nivel=="")){
		
		testeIrmao = nivel+"."+posicao
		
	} else {
		// SE NÃO
		
		testeIrmao = posicao
		
	}
	
	// PERCORRE A TABELA E COLETA TODOS OS ÍNDICES
	$('input[id^="NIVEL___"]').each(function(index, value){
		
		// VARIÁVEL PARA O ÍNDICE DA TABELA
		var seq = $(this).attr("id").split("___")[1]
		var indice = $("#INDICE___"+seq).val()
		
		// VERIFICA SE EXISTE UM IRMÃO À DIREITA
		if(testeIrmao==indice){
			
			irmao = true
			
		} 
		
	})
	
	console.log("temIrmao: "+irmao)
	return irmao
	
}

// VERIFICA SE O CÓDIGO DA ATIVIDADE JÁ FOI UTILIZADO NA TABELA
function verificaAtividade(codAtividade){
	
	var ret = true
	
	// PERCORRE A TABELA
	$('input[id^="VIEWPRIORIDADE___"]').each(function(index, value){
		
		var seq = $(this).attr("id").split("___")[1]
	
		var codAtividadeTabela = $("#VIEWCODATIVIDADE___"+seq).val()
		
		if(codAtividade==codAtividadeTabela){
			
			ret = false
			
		}
		
	})
	
	return ret
	
}

// BUSCA SE EXISTE UM IRMÃO À ESQUERDA
function buscaIrmao(indiceAntigo){
	
	var irmao = ""
	var testeIrmao = ""
	
	var index = indiceAntigo.lastIndexOf(".")
	var nivel = indiceAntigo.substr(0,index)
	var posicao = indiceAntigo.substr(index+1,indiceAntigo.length)
	posicao = parseInt(posicao)
	posicao = posicao - 1
	posicao = posicao.toString()
	
	// SE NÍVEL NÃO É VAZIO
	if(!(nivel=="")){
		
		testeIrmao = nivel+"."+posicao
		
	} else {
		// SE NÃO
		
		testeIrmao = posicao
		
	}
	
	// PERCORRE A TABELA E COLETA TODOS OS ÍNDICES
	$('input[id^="NIVEL___"]').each(function(index, value){
		
		// VARIÁVEL PARA O ÍNDICE DA TABELA
		var seq = $(this).attr("id").split("___")[1]
		var indice = $("#INDICE___"+seq).val()
		
		// VERIFICA SE EXISTE UM IRMÃO À DIREITA
		if(testeIrmao==indice){
			
			irmao = testeIrmao
			
		} 
		
	})
	
	console.log("irmao: "+irmao)
	return irmao
	
}

// BUSCA SE EXISTE UM IRMÃO À DIREITA
function buscaIrmaoDireita(indiceAntigo){
	
	var irmao = ""
	var testeIrmao = ""
	
	var index = indiceAntigo.lastIndexOf(".")
	var nivel = indiceAntigo.substr(0,index)
	var posicao = indiceAntigo.substr(index+1,indiceAntigo.length)
	posicao = parseInt(posicao)
	posicao = posicao + 1
	posicao = posicao.toString()

	// SE NÍVEL NÃO É VAZIO
	if(!(nivel=="")){
		
		testeIrmao = nivel+"."+posicao
		
	} else {
		// SE NÃO
		
		testeIrmao = posicao
		
	}
	
	// PERCORRE A TABELA E COLETA TODOS OS ÍNDICES
	$('input[id^="NIVEL___"]').each(function(index, value){
		
		// VARIÁVEL PARA O ÍNDICE DA TABELA
		var seq = $(this).attr("id").split("___")[1]
		var indice = $("#INDICE___"+seq).val()
		
		// VERIFICA SE EXISTE UM IRMÃO À DIREITA
		if(testeIrmao==indice){
			
			irmao = testeIrmao
			
		} 
		
	})
	
	console.log("irmao: "+irmao)
	return irmao
	
}

// VERIFICA SE O ÍNDICE TEM FILHO
function temFilho(indiceAntigo){
	
	var temFilho = false
	
	// PERCORRE A TABELA E COLETA TODOS OS ÍNDICES
	$('input[id^="NIVEL___"]').each(function(index, value){
		
		// VARIÁVEL PARA O ÍNDICE DA TABELA
		var seq = $(this).attr("id").split("___")[1]
		var nivel = $("#NIVEL___"+seq).val()
		
		// SE NÍVEL É IGUAL AO ÍNDICE ANTIGO, É UM FILHO
		if(nivel==indiceAntigo){
			
			temFilho = true
			
		}
		
	})
	
	console.log("temFilho: "+temFilho)
	return temFilho
	
}

// PERCORRE TABELA E RETORNA O ÚLTIMO FILHO QUE ENCONTRAR
function buscaFilho(indiceAntigo){
	
	var filho = ""
	
	// PERCORRE A TABELA E COLETA TODOS OS ÍNDICES
	$('input[id^="NIVEL___"]').each(function(index, value){
		
		// VARIÁVEL PARA O ÍNDICE DA TABELA
		var seq = $(this).attr("id").split("___")[1]
		var nivel = $("#NIVEL___"+seq).val()
		
		// SE NÍVEL É IGUAL AO ÍNDICE ANTIGO, É UM FILHO
		if(nivel==indiceAntigo){
			
			filho = $("#INDICE___"+seq).val()
			
		}
		
	})
	
	console.log("temFilho: "+filho)
	return filho
	
}

// RETORNA O SEQ DO FILHO
function buscaSeqFilho(indiceAntigo){
	
	var seqFilho = ""
		
	// PERCORRE A TABELA E COLETA TODOS OS ÍNDICES
	$('input[id^="NIVEL___"]').each(function(index, value){
		
		// VARIÁVEL PARA O ÍNDICE DA TABELA
		var seq = $(this).attr("id").split("___")[1]
		var nivel = $("#NIVEL___"+seq).val()
		
		// SE NÍVEL É IGUAL AO ÍNDICE ANTIGO, É UM FILHO
		if(nivel==indiceAntigo){
			
			seqFilho = seq
			
		}
		
	})
	
	return seqFilho
	
}

//ALTERA TODOS OS IRMÃOS DA DIREITA
function alteraIrmaoDireita(indice){
	
	// SE TEM IRMÃO À DIREITA
	while(temIrmaoDireita(indice)){
		
		var irmaoDireita = buscaIrmaoDireita(indice)
		
		console.log(indice+" tem irmao a direita e é o "+irmaoDireita)
		
		// ALTERA O IRMÃO DA DIREITA
		alteraIrmaoDireita(irmaoDireita)
		
	} 
	
	console.log(indice+" não tem irmao a direita")
	// SE NÃO TEM IRMÃO À DIREITA
		
	var novoIrmao = geraNovoIrmao(indice)
	var seq = buscaSeqIrmao(indice)
	var novoNivel = indice.substring(0,indice.lastIndexOf("."))
	var novaPosicao = novoIrmao.substring(novoIrmao.lastIndexOf(".")+1,novoIrmao.length)
	//novaPosicao = novaPosicao.replace(".","")
	
	console.log("vou alterar a posicao de "+indice+" e todos os seus filhos")
	// ALTERA A POSIÇÃO DO ITEM E DOS FILHOS
	alteraPosicao(novoIrmao, indice, seq, novoNivel, novaPosicao, 0)
	
} 

// GERA NOVO IRMÃO
function geraNovoIrmao(indice){
	
	var index = indice.lastIndexOf(".")
	var nivel = indice.substr(0,index)
	var posicao = indice.substr(index+1,indice.length)
	posicao = parseInt(posicao)
	posicao = posicao + 1
	posicao = posicao.toString()
	testeIrmao = nivel+"."+posicao
	
	return testeIrmao
	
}

// VERIFICA VALOR SETADO NO RADIO4 E PREENCHE CONTEÚDO DO EXCLUSIVO 
function radio4(){
	
	// VARIÁVEL PARA O VALOR DO RADIO1
	var radio4 = $("input[name='RADIO4']:checked").val()
	
	// GUARDA O VALOR DO RADIO4
	$("#VALOR_RADIO4").val(radio4)
	
	// SE O CADASTRO FOI APROVADO
	if(radio4=="SIM"){
		
		// SETA CAMPO PARA CONTROLE DO EXCLUSIVO DO WORKFLOW EM "SIM" 
		$("#EXCLUSIVO2").val("SIM");
		$("#OBSERVACOES").val("")
		$(".OBSERVACOES").show()
		$(".MOTIVO").hide()
	
	}
	
	// SE O CADASTRO FOI REPROVADO
	if(radio4=="NAO"){
		
		// SETA CAMPO PARA CONTROLE DO EXCLUSIVO DO WORKFLOW EM "NÃO" 
		$("#EXCLUSIVO2").val("NAO");
		$(".OBSERVACOES").hide()
		$(".MOTIVO").show()
		$("#MOTIVO").val("")
		
	}
	
	// SE O CADASTRO PRECISA SER ALTERADO
	if(radio4=="ALTERAR"){
		
		// SETA CAMPO PARA CONTROLE DO EXCLUSIVO DO WORKFLOW EM "ALTERAR" 
		$("#EXCLUSIVO2").val("ALTERAR");
		$(".OBSERVACOES").hide()
		$(".MOTIVO").show()
		$("#MOTIVO").val("")
		
	}
	
	formataCampos()
	
}

// BUSCA SE O DESENHO INFORMADO OU JÁ FOI INCLUÍDO NA ESTRUTURA, E SE SIM, PREENCHE AS INFORMAÇÕES
function buscaDesenho(numDesenho){
	
	console.log("entrei para buscar o número de desenho na tabela")
	
	var numOS = $("#NUM_OS").val()
	
	//var numDesenho = $("#NUMDESENHO_INFO").val()
	console.log("numDesenho: "+numDesenho)
	
	// CONSTRÓI A CONSULTA DO DATASET
	var b1 = DatasetFactory.createConstraint("NUMDESENHO",numDesenho,numDesenho,ConstraintType.MUST)
	var constraints = new Array(b1)
	var dataset = DatasetFactory.getDataset("dsDesenho",null,constraints,null)
	var row = dataset.values
	
	var retornoDesenho = new Array()
	var numDesenho = ""
	var revisaoDesenho = ""
	var dataRevisao = ""
	var numDbi = ""
	var revisaoDbi = ""
	
	// SE RETORNO NÃO É VAZIO OU NULO
	if(!(row=="" || row==undefined || row==null || row=="null")){
		
		console.log("localizei no banco")
		
		novoDesenho = false
		
		var rep = row[0]
		
		//var os = rep["OS"]
		numDesenho = rep["NUMDESENHO"]
		revisaoDesenho = rep["REVISAODESENHO"]
		dataRevisao = rep["DATAREVISAO"]
		numDbi = rep["NUMDBI"]
		revisaoDbi = rep["REVISAODBI"]
		
		// EXIBE ALERTA
		var Toast = Swal.mixin({
			  toast: true,
			  position: 'center',
			  showConfirmButton: false,
			  timer: 2000,
			  timerProgressBar: true,
		})
	
		Toast.fire({
			  icon: 'success',
			  title: 'Desenho localizado!'
		})
		
	}
	
	retornoDesenho.push(DESENHO={NUMDESENHO:numDesenho,REVISAODESENHO:revisaoDesenho, DATAREVISAO:dataRevisao,NUMDBI:numDbi,REVISAODBI:revisaoDbi})
	
	return retornoDesenho
	
}

// VERIFICA O TEMPO INFORMADO E FORMATA VALOR
function verificaFormataValor(obj){

	var valor = $(obj).val()
	console.log("valor: "+valor)
	
	var campo = $(obj).attr("id")
	console.log("campo: "+campo)
	
	// SE VALOR NÃO É NÚMERO
	if(isNaN(valor)){
		
		$("#"+campo).val("")
		
		// EXIBE ALERTA 
		var Toast = Swal.mixin({
			  toast: true,
			  position: 'center',
			  showConfirmButton: false,
			  timer: 1000,
			  timerProgressBar: true,
		})
	
		Toast.fire({
			  icon: 'warning',
			  title: 'Digite um valor correto!'
		})
		
	} else {

		if(valor.includes(",")){
	
			valor = valor.replace(",",".")
			
		}
		
		valor = parseFloat(valor)
		
		var resto = valor % 15
		
		// SE É UM VALOR VÁLIDO
		if((resto==0)){
		
			valor = valor.toString()
			valor = valor.replace(".",",")
			console.log("novo valor: "+valor)
			$("#"+campo).val(valor)
			
		} else {
		// SE NÃO
		
			$(obj).val("")
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'Esse não é um valor válido!',
				  text: 'Verifique se o valor informado é múltiplo de 15 e tente novamente'
			})
		
		}

	}
	
}

// FORMATA VALORES TROCANDO PONTO POR VÍRGULA
function formataValor(obj){
	
	var valor = $(obj).val()
	console.log("valor: "+valor)
	
	var campo = $(obj).attr("id")
	console.log("campo: "+campo)
	valor = valor.replace(",",".")
	
	// SE VALOR NÃO É NÚMERO
	if(isNaN(valor)){
		
		$("#"+campo).val("")
		
		// EXIBE ALERTA 
		var Toast = Swal.mixin({
			  toast: true,
			  position: 'center',
			  showConfirmButton: false,
			  timer: 1000,
			  timerProgressBar: true,
		})
	
		Toast.fire({
			  icon: 'warning',
			  title: 'Digite um valor correto!'
		})
		
	} else {

		valor = valor.replace(".",",")
		console.log("novo valor: "+valor)
		$("#"+campo).val(valor)
		
	}
	
}

// FORMATA
function formValBanco(campo,valor){
	
	valor = valor.toString()
	
	valor = valor.replace(".",",")
	console.log("novo valor: "+valor)
	$("#"+campo).val(valor)
	
}

// FORMATA A DATA EM PADRÃO BRASILEIRO	
function formataData(data){
	
	var resultado = data.split("-");
	var ano = resultado[0];
	var mes = resultado[1];
	var dia = resultado[2];
	
	var novaData = dia+"/"+mes+"/"+ano;
	
	return novaData;
	
}

// VERIFICA SE A REMOÇÃO ESTÁ LIBERADA PARAO ITEM SELECIONADO E SEUS HERDEIROS
function removerLiberado(){
	
	// ATIVA O LOADING
    //ativaSpinner()
    
	//setTimeout(function(){
	
		var indice = $("#INDICE_INFO").val()
		
		var herdeiros = ""
		
		var idCriacao = buscaIdCriacao(indice)
		var numOS = $("#NUM_OS").val()
		
		var a1 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
		var a2 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
		
		var constraints = new Array(a1,a2)
		
		var dataset = DatasetFactory.getDataset("dsBuscaEstruturaSubconjOS",null,constraints,null)
		var row = dataset.values
		var count = dataset.values.length
		
		// PERCORRE TODOS OS HERDEIROS ENCONTRADOS
		for(var i=0; i<count; i++){
			
			var rep = row[i]
			
			// SE É O PRIMEIRO ITEM
			if(i==0){
				
				herdeiros = rep["IDCRIACAO"]	
				
			} else {
				
				herdeiros = herdeiros +";"+rep["IDCRIACAO"]
				
			}
			
		}
		
		var b1 = DatasetFactory.createConstraint("IDCRIACAO",herdeiros,herdeiros,ConstraintType.MUST)
		var b2 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
		
		var constraints = new Array(b1,b2)
		
		var dataset = DatasetFactory.getDataset("dsVerificaItemSalvosListaMateriais",null,constraints,null)
		var row = dataset.values
		
		// SE RETORNO VAZIO OU NULO
		if(row=="" || row==undefined || row==null || row=="null"){
			
			console.log("não há itens herdeiros que foram salvos na lista de materiais")
			
			return true
			
		} else {
			// SE NÃO
			
			console.log("há itens herdeiros que foram salvos na lista de materiais")
			
			return false
			
		}
		
	//}, 500)
	
	/*setTimeout(function(){
					
		// DESATIVA O LOADING
    	desativaSpinner()
			    
	},500)
	*/
}

// ALERTA PARA REMOVER ITEM
function alertaRemover(){
	
	// SE REMOÇÃO ESTÁ LIBERADA
	if(removerLiberado()){
		
		// EXIBE ALERTA
		Swal.fire({
		
			  title: 'Tem certeza que deseja remover este item?',
			  text: "Atenção, todos os eventuais filhos também serão removidos e não será possível desfazer a operação.",
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
				
				// ATIVA O LOADING
			    ativaSpinner()
			    
				setTimeout(function(){
				
				    var indice = $("#INDICE_INFO").val()
				    
				    // FAZ A REMOÇÃO SOMENTE DO ITEM SELECIONADO
				    remover()
				    
				    var numOS = $("#NUM_OS").val()
			
					// CONSULTA BANCO
					var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
					var constraints = new Array(c1);
					
					//dataset = DatasetFactory.getDataset("dsBuscaEstruturaIntegrada",null,constraints,null);
					dataset = DatasetFactory.getDataset("dsBuscaEstrutura",null,constraints,null);
					
					// QUANTIDADE DE REGISTROS DA CONSULTA
					var row = dataset.values;
				    
				    // FAZ A ALTERAÇÃO DO CÁLCULO DA QUANTIDADE TOTAL
				    alteraDesQtdeGeral()
				    
				    // EXIBE ALERTA DA REMOÇÃO 
					var Toast = Swal.mixin({
						  toast: true,
						  position: 'center',
						  showConfirmButton: false,
						  timer: 1000,
						  timerProgressBar: true,
					})
				
					Toast.fire({
						  icon: 'success',
						  title: 'Item removido!'
					})
			        
				},500)
				
				setTimeout(function(){
					
					// DESATIVA O LOADING
			    	desativaSpinner()
			    
				},500)
				
			  } else {
				  
				  // TIRA A SELEÇÃO DE TODOS OS SPAN'S DA VIEW
				  tiraSelecaoSpan()
				  
				  // LIMPA OS CAMPOS DO MODAL
				  limpaCabIndice()
				  
			  }
		  
		})
		
	} else {
		// SE REMOÇÃO NÃO ESTÁ LIBERADA
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'Não é possível remover o item selecionado!',
			  text: 'Verifique se esse item ou um dos seus herdeiros foram salvos na lista de materiais'
		})
		
	}
			
}

// LIMPA O ÍNDICE DO PROCESSO
function limpaIndiceProcesso(){
	
	$("#INDICE_PROCESSO").val("")
	
}

// PEGA VALOR SETADO DO CAMPO RADIO2 (TIPO DO DESENHO)
function pegaTipo2() {
	
	// PEGA O VALOR SELECIONADO DO RADIO2
	var tipo = $("input[name='RADIO2']:checked").val();
	var radio2 = $("#VALOR_RADIO2").val()

	// SE O TIPO É NÃO MANUFATURADO
	if(tipo=="NAOMANUFATURADO"){
		
		console.log("seleção do NÃOMANUFATURADO")
		
		var idCriacao = $("#F_IDCRIACAO").val()
		
		// SE ITEM TEM FILHO
		if(itemTemFilho(idCriacao)){
			
			console.log("item tem filhos")
			
			// SE ERA UM ITEM SEMIACABADO
			if(radio2=="SEMIACABADO"){
				
				console.log("radio2 é SEMIACABADO")
				
				tipo = "SEMIACABADO"
				
				$("#RAD2_ACABADO").prop("checked",false)
				$("#RAD2_SEMI").prop("checked",true)
				$("#RAD2_NAOMANUF").prop("checked",false)
				
			}
			
			// SE ERA UM ITEM ACABADO
			if(radio2=="ACABADO"){
				
				tipo = "ACABADO"
				
				console.log("radio2 é ACABADO")
					
				$("#RAD2_ACABADO").prop("checked",true)
				$("#RAD2_SEMI").prop("checked",false)
				$("#RAD2_NAOMANUF").prop("checked",false)
					
			}
			
			// SE ERA UM ITEM NÃO MANUFATURADO OU VAZIO
			if(radio2=="NAOMANUFATURADO" || (radio2=="" || radio2==undefined || radio2==null)){
				
				tipo = ""
					
				console.log("radio2 é VAZIO OU NAO MANUFATURADO")
					
				$("#RAD2_ACABADO").prop("checked",false)
				$("#RAD2_SEMI").prop("checked",false)
				$("#RAD2_NAOMANUF").prop("checked",false)
				
			}
			
			console.log("vou salvar tipo: "+tipo)
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'warning',
				  title: 'Esse item tem filhos cadastrados e não pode se tornar um item "Não Manufaturado"!'
			})
			
		}else{
			// SE NÃO TEM FILHO
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'warning',
				  title: 'Esse item não deve ter atividades cadastradas!'
			})
			
		}
				
	}
	
	// SALVA VALOR DO RADIO2 NO CAMPO OCULTO
	$("#VALOR_RADIO2").val(tipo)
	
}

// PEGA O VALOR DE RADIO3 
function radio3(){
	
	// VARIÁVEL PARA O VALOR DO RADIO1
	var radio3 = $("input[name='RADIO3']:checked").val()
	
	// GUARDA O VALOR DO RADIO1
	$("#VALOR_RADIO3").val(radio3)
	$("#EXCLUSIVO2").val(radio3)
	
	// SE PEDIDO DE COMPRA SERÁ UTILIZADO
	if(radio3=="SIM"){
		
		// EXIBE OS CAMPOS DE CONSULTA PARA PEDIDO DE COMPRA
		$(".OBSERVACOES").show()
		$(".MOTIVO").hide()
		
	}
	
	// SE SOMENTE A NFE SERÁ UTILIZADA
	if(radio3=="NAO" || radio3=="ALTERAR"){
		
		// ESCONDE OS CAMPOS DE CONSULTA DO PEDIDO DE COMPRA
		$(".OBSERVACOES").hide()
		$(".MOTIVO").show()
		
	}
	
}

// VERIFICA SE A OS ESTÁ LIBERADA PARA SER EDITADA
function verificaOS(){
	
	var numOS = $("#NUM_OS").val()
	var ret = true
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("NUM_OS",numOS,numOS,ConstraintType.MUST);
	var constraints = new Array(c1);
	
	dataset = DatasetFactory.getDataset("dsVerificaOS",null,constraints,null);
	
	var row = dataset.values;
	var count = dataset.values.length;
	console.log("row "+row)
	
	console.log("Valor de count "+row);
	
	// SE RETORNO É VAZIO
	if(row=="" || row==undefined || row==null || row=="null"){

		return false
		
	} else {
		// SE NÃO, OS JÁ ESTÁ NO BANCO
		
		return true
	
	}
	
	return ret
	
}

// BUSCA SE A EXECUÇÃO DA OS ESTÁ CONTIDA NA TABELA DE EXCEÇÕES
function osExecucaoLiberada(numOS,execucao,codTrfEx){
	
	console.log(">>>>>>> osExecucaoLiberada")
	console.log("execucao: "+execucao+", codTrfEx: "+codTrfEx)
			
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("EXECUCAO",execucao,execucao,ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("CODTRFPAI",codTrfEx,codTrfEx,ConstraintType.MUST);

	var constraints = new Array(c1,c2,c3);
	
	var dataset = DatasetFactory.getDataset("dsVerificaExecucaoOS",null,constraints,null);
		
	var row = dataset.values
	
	if(!(row=="" || row==undefined || row==null)){
		
		console.log("OS não está liberada")
		return false
		
	} else {
		
		console.log("OS liberada")
		return true
	}
	
}

// BUSCA A OS E CARREGA OS DADOS NO FORMULÁRIO
function buscaEstruturaOS(numOS,execucao,codTrfEx){
	
	// ATIVA O LOAD
	ativaSpinner()
	
	setTimeout(function(){
			
		console.log("execucao: "+execucao+", codTrfEx: "+codTrfEx)
		
		var row
				
		// CONSULTA BANCO
		var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("EXECUCAO",execucao,execucao,ConstraintType.MUST);
		var c3 = DatasetFactory.createConstraint("CODTRFEX",codTrfEx,codTrfEx,ConstraintType.MUST);

		var constraints = new Array(c1,c2,c3);
		
		var dataset = DatasetFactory.getDataset("dsConsultaEstruturaExecucao",null,constraints,null);
		
		row = dataset.values;
				
		
		// SE NÃO ENCONTROU
		if(row=="" || row==null || row==undefined){
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'Não existe estrutura para as informações informadas!',
				  text: 'Verifique e tente novamente'
			})
			
		} else {
			// SE NÃO
	
			// ATUALIZAR A VIEW
			atualizar()
			
			// MOSTRA ESCONDE CAMPOS
			$(".VIEW").show()
			//$(".OS_COPIA").hide()
			//$(".INFO_OS").hide()
			
		}
			
	},500)
	
	// DESATIVA O LOAD
	desativaSpinner()
	
}

// BUSCA TODOS OS PROCESSOS DA OS
function buscaComponentesOS(numOS){
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OSCOMPONENTES",numOS,numOS,ConstraintType.MUST);
	var constraints = new Array(c1);
	
	dataset = DatasetFactory.getDataset("dsBuscaComponentesOS",null,constraints,null);
	
	var row = dataset.values;
	var count = dataset.values.length;
	
	console.log("Valor de count "+row);
	console.log("row "+row)
	
	// PERCORRE TODOS OS REGISTROS ENCONTRADOS E PREENCHE A TABELA COM OS DADOS
	for(var i=0; i < count; i++){
		
		console.log("Entrei no for");
		var rep = row[i];
		
		// SE COMPONENTE NÃO VEIO DA LISTA
		if(!(rep["LISTACOMPONENTES"]=="L")){
			
			var os = $("#NUM_OS").val()
			
			var produtoComp = rep["PRODUTOCOMPONENTES"]
			var idComp = rep["IDCOMPONENTES"]
			var idPrdComp = rep["IDPRDCOMPONENTES"]
			var codigoPrdComp = rep["CODIGOPRDCOMPONENTES"]
			var codUndComp = rep["CODUNDCOMPONENTES"]
			var idCriacaoComp = rep["IDCRIACAOCOMPONENTES"]
			var qtdeUnComp = rep["QTDEUNCOMPONENTES"]
			var qtdeTotalComp = rep["QTDETOTALCOMPONENTES"]
			var substitutoComp = rep["SUBSTITUTOCOMPONENTES"]
			var insumoComp = rep["INSUMOCOMPONENTES"]
			var listaComp = rep["LISTACOMPONENTES"]
			
			console.log("produtoComp: "+produtoComp+", idPrdComp: "+idPrdComp+", codigoPrdComp: "+codigoPrdComp+", codUndComp: "+codUndComp+", idCriacaoComp: "+idCriacaoComp+
					", qtdeUnComp: "+qtdeUnComp+", qtdeTotalComp: "+qtdeTotalComp+", listaComp: "+listaComp+", insumoComp: "+insumoComp+", substitutoComp: "+substitutoComp+
					", os: "+os+", idComp: "+idComp)
			
			// CONSTRÓI AS CONSTRAINTS PARA REALIZAR O UPDATE DAS INFORMAÇÕES
			var c1 = DatasetFactory.createConstraint("PRODUTOCOMPONENTES",produtoComp,produtoComp,ConstraintType.MUST);
			var c2 = DatasetFactory.createConstraint("IDPRDCOMPONENTES",idPrdComp,idPrdComp,ConstraintType.MUST);
			var c3 = DatasetFactory.createConstraint("CODIGOPRDCOMPONENTES",codigoPrdComp,codigoPrdComp,ConstraintType.MUST);
			var c4 = DatasetFactory.createConstraint("CODUNDCOMPONENTES",codUndComp,codUndComp,ConstraintType.MUST);
			var c5 = DatasetFactory.createConstraint("IDCRIACAOCOMPONENTES",idCriacaoComp,idCriacaoComp,ConstraintType.MUST);
			var c6 = DatasetFactory.createConstraint("QTDEUNCOMPONENTES",qtdeUnComp,qtdeUnComp,ConstraintType.MUST);
			var c7 = DatasetFactory.createConstraint("QTDETOTALCOMPONENTES",qtdeTotalComp,qtdeTotalComp,ConstraintType.MUST);
			var c8 = DatasetFactory.createConstraint("LISTACOMPONENTES",listaComp,listaComp,ConstraintType.MUST);
			var c9 = DatasetFactory.createConstraint("INSUMOCOMPONENTES",insumoComp,insumoComp,ConstraintType.MUST);
			var c10 = DatasetFactory.createConstraint("SUBSTITUTOCOMPONENTES",substitutoComp,substitutoComp,ConstraintType.MUST);
			var c11 = DatasetFactory.createConstraint("OSCOMPONENTES",os,os,ConstraintType.MUST);
			var c12 = DatasetFactory.createConstraint("IDCOMPONENTES",idComp,idComp,ConstraintType.MUST);
			
			var constraints = new Array(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12);
			
			dataset = DatasetFactory.getDataset("dsInsertItemComponentesOS",null,constraints,null);
			
			console.log("INSERI NO BANCO O COMPONENTE")
			
		}
				
	}
	
}

// BUSCA TODOS OS PROCESSOS DA OS
function buscaProcessoOS(numOS){
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OSPROCESSO",numOS,numOS,ConstraintType.MUST);
	var constraints = new Array(c1);
	
	dataset = DatasetFactory.getDataset("dsBuscaProcessoOS",null,constraints,null);
	
	var row = dataset.values;
	var count = dataset.values.length;
	
	console.log("Valor de count "+row);
	console.log("row "+row)
	
	// PERCORRE TODOS OS REGISTROS ENCONTRADOS E PREENCHE A TABELA COM OS DADOS
	for(var i=0; i < count; i++){
		
		console.log("Entrei no for");
		var rep = row[i];
		
		var os = $("#NUM_OS").val()
		
		var prioridade = rep["PRIORIDADE"]
		var idCriacaoProcesso = rep["IDCRIACAOPROCESSO"]
		var codAtividade = rep["CODATIVIDADE"]
		var idProcesso = rep["IDPROCESSO"]
		var descAtividade = rep["DESCATIVIDADE"]
		var habilidadeRequerida = rep["HABILIDADEREQUERIDA"]
		var codHabilidade = rep["CODHABILIDADE"]
		var codPosto = rep["CODPOSTO"]
		var descPosto = rep["DESCPOSTO"]
		var fila = rep["FILA"]
		var configuracao = rep["CONFIGURACAO"]
		var processamento = rep["PROCESSAMENTO"]
		var desagregacao = rep["DESAGREGACAO"]
		var espera = rep["ESPERA"]
		var movimentacao = rep["MOVIMENTACAO"]
		var minutosGastos = rep["MINUTOSGASTOS"]
		var descProcesso = rep["DESCPROCESSO"]
		var docApoioAtv1 = rep["DOCAPOIOATV1"]
		var docApoioAtv2 = rep["DOCAPOIOATV2"]
		var docApoioAtv3 = rep["DOCAPOIOATV3"]
		var docApoioAtv4 = rep["DOCAPOIOATV4"]
		var fornPara = rep["FORNPARA"]
		var idProcesso = rep["IDPROCESSO"]
		
		console.log("idProcesso: "+idProcesso+", os: "+os+", idCriacaoProcesso: "+idCriacaoProcesso+", prioridade: "+prioridade+", codAtividade: "+codAtividade+
				", descAtividade: "+descAtividade+", habilidadeRequerida: "+habilidadeRequerida+", codHabilidade: "+codHabilidade+", codPosto: "+codPosto+", descPosto: "+descPosto+
				", fila: "+fila+", configuracao: "+configuracao+", processamento: "+processamento+", desagregacao: "+desagregacao+", espera: "+espera+", movimentacao: "+movimentacao+
				", minutosGastos: "+minutosGastos+", descProcesso: "+descProcesso+", docApoioAtv1: "+docApoioAtv1+", docApoioAtv2: "+docApoioAtv2+", docApoioAtv3: "+docApoioAtv3+
				", docApoioAtv4: "+docApoioAtv4+", fornPara: "+fornPara)
		
		// CONSTRÓI AS CONSTRAINTS PARA REALIZAR O UPDATE DAS INFORMAÇÕES
		var c1 = DatasetFactory.createConstraint("IDPROCESSO",idProcesso,idProcesso,ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("OSPROCESSO",os,os,ConstraintType.MUST);
		var c3 = DatasetFactory.createConstraint("IDCRIACAOPROCESSO",idCriacaoProcesso,idCriacaoProcesso,ConstraintType.MUST);
		var c4 = DatasetFactory.createConstraint("PRIORIDADE",prioridade,prioridade,ConstraintType.MUST);
		var c5 = DatasetFactory.createConstraint("CODATIVIDADE",codAtividade,codAtividade,ConstraintType.MUST);
		var c6 = DatasetFactory.createConstraint("DESCATIVIDADE",descAtividade,descAtividade,ConstraintType.MUST);
		var c7 = DatasetFactory.createConstraint("HABILIDADEREQUERIDA",habilidadeRequerida,habilidadeRequerida,ConstraintType.MUST);
		var c8 = DatasetFactory.createConstraint("CODHABILIDADE",codHabilidade,codHabilidade,ConstraintType.MUST);
		var c9 = DatasetFactory.createConstraint("CODPOSTO",codPosto,codPosto,ConstraintType.MUST);
		var c10 = DatasetFactory.createConstraint("DESCPOSTO",descPosto,descPosto,ConstraintType.MUST);
		var c11 = DatasetFactory.createConstraint("FILA",fila,fila,ConstraintType.MUST);
		var c12 = DatasetFactory.createConstraint("CONFIGURACAO",configuracao,configuracao,ConstraintType.MUST);
		var c13 = DatasetFactory.createConstraint("PROCESSAMENTO",processamento,processamento,ConstraintType.MUST);
		var c14 = DatasetFactory.createConstraint("DESAGREGACAO",desagregacao,desagregacao,ConstraintType.MUST);
		var c15 = DatasetFactory.createConstraint("ESPERA",espera,espera,ConstraintType.MUST);
		var c16 = DatasetFactory.createConstraint("MOVIMENTACAO",movimentacao,movimentacao,ConstraintType.MUST);
		var c17 = DatasetFactory.createConstraint("MINUTOSGASTOS",minutosGastos,minutosGastos,ConstraintType.MUST);
		var c18 = DatasetFactory.createConstraint("DESCPROCESSO",descProcesso,descProcesso,ConstraintType.MUST);
		var c19 = DatasetFactory.createConstraint("DOCAPOIOATV1",docApoioAtv1,docApoioAtv1,ConstraintType.MUST);
		var c20 = DatasetFactory.createConstraint("DOCAPOIOATV2",docApoioAtv2,docApoioAtv2,ConstraintType.MUST);
		var c21 = DatasetFactory.createConstraint("DOCAPOIOATV3",docApoioAtv3,docApoioAtv3,ConstraintType.MUST);
		var c22 = DatasetFactory.createConstraint("DOCAPOIOATV4",docApoioAtv4,docApoioAtv4,ConstraintType.MUST);
		var c23 = DatasetFactory.createConstraint("FORNPARA",fornPara,fornPara,ConstraintType.MUST);

		var constraints = new Array(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c14,c15,c16,c17,c18,c19,c20,c21,c22,c23);
		
		dataset = DatasetFactory.getDataset("dsInsertItemProcessoOS",null,constraints,null);
		
		console.log("INSERI NO BANCO O COMPONENTE")
		
	}
	
}

// SE FOR NECESSÁRIO, FUNÇÃO PARA ATUALIZAR CAMPO SELECT COM NOVA OPÇÃO
function atualiza(p_indice, p_combo){

	// SE O VALOR DO ITEM SELECIONADO NO SELECT É IGUAL A 1, QUE CORRESPONDE A OPÇÃO 'OUTROS'
	if(p_indice == 1) {
		
		// PEDE AO USUÁRIO QUE INFORME A OPÇÃO A SER UTILIZADA
		var strOpcao = prompt('Digite a opção a ser inserida','');

		// SE A OPÇÃO INFORMADA É VAZIA
		if(strOpcao == '') {

			alert('Digite um valor para a opção');
			
			// SELECIONA O ITEM DEFAULT
			p_combo.options[0].selected = true;

		} else {
			// SE A OPÇÃO FOI INFORMADA
			
			// ACRESCENTA NOVA OPÇÃO
			var intTamanho = p_combo.length;

			p_combo.length = intTamanho + 1;
		
			p_combo.options[intTamanho].text = strOpcao;
		
			p_combo.options[intTamanho].value = intTamanho;
		
			// DEIXA A NOVA OPÇÃO SELECIONADA
			p_combo.options[intTamanho].selected = true;

		}

	}

}

// EXIBE UM BALÃO COM O TEXTO COMPLETO DO CAMPO AO PASSAR O MOUSE SOBRE ELE
function mouse(e){
	
	console.log("entrei para exibir conteúdo")
	
	// PEGA O VALOR COMPLETO PREENCHIDO NO CAMPO
	var valCampo = $(e).val();
	
	console.log("valCampo: "+valCampo)
	
	// SE CAMPO NÃO FOI PREENCHIDO
	if(valCampo == "" || valCampo == null){
		
		return false;
		
	}
	// SE CAMPO FOI PREENCHIDO
	else{
		
		// CARREGA EM "TITLE" O VALOR DO CAMPO PREENCHIDO
		$(e).prop("title", valCampo);
		return true;
		
	}
	
}

// CALCULA A QUANTIDADE TOTAL PARA O CAMPO MODAL
function calculaTotalQtde(){
	
	console.log("entrei para calcular total qtde")
	
	var indice = $("#INDICE_INFO").val()
	var nivel = indice.substr(0,indice.lastIndexOf("."))
	//var idCriacao = buscaIdCriacao(indice)
	
	var numOS = $("#NUM_OS").val()
	
	// CONSTRÓI A CONSULTA DO DATASET
	/*var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("NIVEL",nivel,nivel,ConstraintType.MUST)
	
	var constraints = new Array(a1,a2)
	
	var dataset = DatasetFactory.getDataset("dsBuscaItemEstruturaOS",null,constraints,null)
	var row = dataset.values
	
	var rep = row[0]
	
	var nivel = rep["NIVEL"]*/
	
	var totalPai = ""
		
	// SE NÍVEL NÃO É VAZIO OU NULO
	if(!(nivel=="" || nivel==null || nivel==undefined || nivel=="null")){
	
		// CONSTRÓI A CONSULTA DO DATASET
		var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
		var a2 = DatasetFactory.createConstraint("NIVEL",nivel,nivel,ConstraintType.MUST)
		var constraints = new Array(a1,a2)
		var dataset = DatasetFactory.getDataset("dsBuscaQtdePaiOS",null,constraints,null)
		
		var row2 = dataset.values
		var rep2 = row2[0]
		totalPai = rep2["TOTALQTDE"]
		
	} else {
	
		totalPai = 1
		
	}
	
	var desQtde = $("#QTDE_INFO").val()
	
	if(desQtde=="" || desQtde==null || desQtde==undefined){
		
		desQtde = $("#QTDE_INFO_ALT").val()
		
	}
	
	var totalQtde = ""
		
	desQtde = parseInt(desQtde)
	
	console.log("desQtde "+desQtde)
	console.log("totalPai "+totalPai)
	
	//
	if(totalPai=="" || totalPai==undefined || totalPai==null || totalPai=="NaN" || totalPai==NaN){
		
		totalPai = 1
		
	} else{
		
		totalPai = parseInt(totalPai)
		
	}
	
	// SE NÍVEL É VAZIO
	if(nivel==""){
		
		totalQtde = desQtde
		
	}
	else{
		// SE NÃO
		
		totalQtde = totalPai * desQtde
		
	}
	
	console.log("calculei "+totalQtde)
	
	// SALVA A QUANTIDADE TOTAL
	$("#QTDETOTAL_INFO").val(totalQtde)
	
}

// CALCULA A QUANTIDADE TOTAL
function calculaTotal(){
	
	var numOS = $("#NUM_OS").val()
	var nivel = $("#F_NIVEL").val()
	console.log("nivel "+nivel)
	var idCriacao = $("#F_IDCRIACAO").val()
	var totalPai = ""
	
	// SE NÍVEL NÃO É VAZIO OU NULO
	if(!(nivel=="" || nivel==null || nivel==undefined || nivel=="null")){
	
		// CONSTRÓI A CONSULTA DO DATASET
		var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
		var a2 = DatasetFactory.createConstraint("NIVEL",nivel,nivel,ConstraintType.MUST)
		var constraints = new Array(a1,a2)
		var dataset = DatasetFactory.getDataset("dsBuscaQtdePaiOS",null,constraints,null)
		
		var row2 = dataset.values
		var rep2 = row2[0]
		totalPai = rep2["TOTALQTDE"]
		
	} else {
	
		totalPai = 1
		
	}
	
	var desQtde = $("#F_DESQTDE").val()
	var totalQtde = ""
		
	desQtde = parseInt(desQtde)
	
	console.log("desQtde "+desQtde)
	console.log("totalPai "+totalPai)
	
	//
	if(totalPai=="" || totalPai==undefined || totalPai==null || totalPai=="NaN" || totalPai==NaN){
		
		totalPai = 1
		
	} else{
		
		totalPai = parseInt(totalPai)
		
	}
	
	// SE NÍVEL É VAZIO
	if(nivel==""){
		
		totalQtde = desQtde
		
	}
	else{
		// SE NÃO
		
		totalQtde = totalPai * desQtde
		
	}
	
	console.log("calculei "+totalQtde)
	
	// SALVA A QUANTIDADE TOTAL
	$("#F_TOTALQTDE").val(totalQtde)
	
	// CALCULA A QUANTIDADE DOS COMPONENTES
	calculaQtdesComponentes(idCriacao)
	
}

// COPIA OS PROCESSOS DO ITEM COPIADO PARA A CÓPIA
function copiaProcessoOS(idCriacao,idCriacaoCopia){
	
	console.log("ENTREI PARA COPIAR OS PROCESSOS")
	
	console.log("IdCriacao: "+idCriacao+", idCriacaoCopia: "+idCriacaoCopia)
	
	var numOS = $("#NUM_OS").val()
	
	// COPIA PROCESSOS DO ITEM QUE SERÁ COPIADO PARA A CÓPIA
	
	var b1 = DatasetFactory.createConstraint("OSPROCESSO",numOS,numOS,ConstraintType.MUST)
	var b2 = DatasetFactory.createConstraint("IDCRIACAOPROCESSO",idCriacao,idCriacao,ConstraintType.MUST)

	var constraints = new Array(b1,b2)
	var dataset = DatasetFactory.getDataset("dsBuscaItensProcessoOS",null,constraints,null)
	var row = dataset.values
	
	console.log("Localizei os processos para o idCriacao "+idCriacao)
	console.log(row)
	
	// SE RETORNO É NULO OU VAZIO
	if(!(row=="" || row==null || row==undefined || row=="null")){
	
		var count = dataset.values.length
		
		// PERCORRE TODOS OS REGISTROS ENCONTRADOS
		for(var i=0; i<count; i++){
			
			var rep = row[i]
		
			var prioridade = rep["PRIORIDADE"]
			var solicitacaoProcesso = rep["SOLICITACAOPROCESSO"]
			var codAtividade = rep["CODATIVIDADE"]
			var descAtividade = rep["DESCATIVIDADE"]
			var habilidade = rep["HABILIDADEREQUERIDA"]
			var codHabilidade = rep["CODHABILIDADE"]
			var codPosto = rep["CODPOSTO"]
			var descPosto = rep["DESCPOSTO"]
			var fila = rep["FILA"]
			var configuracao = rep["CONFIGURACAO"]
			var processamento = rep["PROCESSAMENTO"]
			var desagregacao = rep["DESAGREGACAO"]
			var espera = rep["ESPERA"]
			var movimentacao = rep["MOVIMENTACAO"]
			var minutosGastos = rep["MINUTOSGASTOS"]
			var descProcesso = rep["DESCPROCESSO"]
			var docApoioAtv1 = rep["DOCAPOIOATV1"]
			var docApoioAtv2 = rep["DOCAPOIOATV2"]
			var docApoioAtv3 = rep["DOCAPOIOATV3"]
			var docApoioAtv4 = rep["DOCAPOIOATV4"]
			var fornPara = rep["FORNPARA"]
			var integradoProc = rep["INTEGRADOPROCESSO"]
			
			// CRIAR ESSES ITENS NA TABELA DE PROCESSO, USANDO O IDCRIACAOCOPIA
			var a1 = DatasetFactory.createConstraint("OSPROCESSO",numOS,numOS,ConstraintType.MUST)
			var a2 = DatasetFactory.createConstraint("IDCRIACAOPROCESSO",idCriacaoCopia,idCriacaoCopia,ConstraintType.MUST)
			var a3 = DatasetFactory.createConstraint("PRIORIDADE",prioridade,prioridade,ConstraintType.MUST)
			var a4 = DatasetFactory.createConstraint("SOLICITACAOPROCESSO",solicitacaoProcesso,solicitacaoProcesso,ConstraintType.MUST)
			var a5 = DatasetFactory.createConstraint("CODATIVIDADE",codAtividade,codAtividade,ConstraintType.MUST)
			var a6 = DatasetFactory.createConstraint("DESCATIVIDADE",descAtividade,descAtividade,ConstraintType.MUST)
			var a7 = DatasetFactory.createConstraint("HABILIDADEREQUERIDA",habilidade,habilidade,ConstraintType.MUST)
			var a8 = DatasetFactory.createConstraint("CODHABILIDADE",codHabilidade,codHabilidade,ConstraintType.MUST)
			var a9 = DatasetFactory.createConstraint("CODPOSTO",codPosto,codPosto,ConstraintType.MUST)
			var a10 = DatasetFactory.createConstraint("DESCPOSTO",descPosto,descPosto,ConstraintType.MUST)
			var a11 = DatasetFactory.createConstraint("FILA",fila,fila,ConstraintType.MUST)
			var a12 = DatasetFactory.createConstraint("CONFIGURACAO",configuracao,configuracao,ConstraintType.MUST)
			var a13 = DatasetFactory.createConstraint("PROCESSAMENTO",processamento,processamento,ConstraintType.MUST)
			var a14 = DatasetFactory.createConstraint("DESAGREGACAO",desagregacao,desagregacao,ConstraintType.MUST)
			var a15 = DatasetFactory.createConstraint("ESPERA",espera,espera,ConstraintType.MUST)
			var a16 = DatasetFactory.createConstraint("MOVIMENTACAO",movimentacao,movimentacao,ConstraintType.MUST)
			var a17 = DatasetFactory.createConstraint("MINUTOSGASTOS",minutosGastos,minutosGastos,ConstraintType.MUST)
			var a18 = DatasetFactory.createConstraint("DESCPROCESSO",descProcesso,descProcesso,ConstraintType.MUST)
			var a19 = DatasetFactory.createConstraint("DOCAPOIOATV1",docApoioAtv1,docApoioAtv1,ConstraintType.MUST)
			var a20 = DatasetFactory.createConstraint("DOCAPOIOATV2",docApoioAtv2,docApoioAtv2,ConstraintType.MUST)
			var a21 = DatasetFactory.createConstraint("DOCAPOIOATV3",docApoioAtv3,docApoioAtv3,ConstraintType.MUST)
			var a22 = DatasetFactory.createConstraint("DOCAPOIOATV4",docApoioAtv4,docApoioAtv4,ConstraintType.MUST)
			var a23 = DatasetFactory.createConstraint("FORNPARA",fornPara,fornPara,ConstraintType.MUST)
			var a24 = DatasetFactory.createConstraint("INTEGRADOPROCESSO",integradoProc,integradoProc,ConstraintType.MUST)
			//var a25 = DatasetFactory.createConstraint("EDITADOPROCESSO",editadoProc,editadoProc,ConstraintType.MUST)
			
			//var a27 = DatasetFactory.createConstraint("companyid",companyid,companyid,ConstraintType.MUST)
			//var a28 = DatasetFactory.createConstraint("cardid",cardid,cardid,ConstraintType.MUST)
			//var a29 = DatasetFactory.createConstraint("documentid",documentid,documentid,ConstraintType.MUST)
			//var a30 = DatasetFactory.createConstraint("version",version,version,ConstraintType.MUST)
			//var a31 = DatasetFactory.createConstraint("tableid",tableid,tableid,ConstraintType.MUST)
			
			//var constraints = new Array(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,a21,a22,a23,a24,a25,a26,a27,a28,a29,a30,a31)
			var constraints = new Array(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,a21,a22,a23,a24)
			
			var dataset = DatasetFactory.getDataset("dsInsertItemProcessoOS",null,constraints,null)
		
			console.log("Inserido")
			
		}
		
	}
	
}

// COPIA OS DADOS DE UM ITEM PARA OUTRO
function copiaDados(idCriacao,idCriacaoCopia){

	console.log("entrei para fazer a cópia do item de idCriacao "+idCriacao+" para o de idCriacao "+idCriacaoCopia)
	
	var numOS = $("#NUM_OS").val()
	
	var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)

	var constraints = new Array(a1,a2)
	var dataset = DatasetFactory.getDataset("dsBuscaItemEstruturaOS",null,constraints,null)
	var row = dataset.values
	
	var rep = row[0]
	
	console.log("Row abaixo")
	console.log(row)
	
	// SALVA OS DADOS DO ITEM COPIADO 
	var numDbi = rep["NUMDBI"]
	var undMedida = rep["UNDMEDIDA"]
	var revisaoDbi = rep["REVISAODBI"]
	var revisaoDesenho = rep["REVISAODESENHO"]
	var bitola = rep["BITOLA"]
	var espessura = rep["ESPESSURA"]
	var largura = rep["LARGURA"]
	var massaLinear = rep["MASSALINEAR"]
	var espRosca = rep["ESPROSCA"]
	var comprimento = rep["COMPRIMENTO"]
	var observacoes = rep["OBSERVACOES"]
	var diametroExt = rep["DIAMETROEXTERNO"]
	var diametroInt = rep["DIAMETROINTERNO"]
	var dataRevisao = rep["DATAREVISAO"]
	var observacoesDesenho = rep["OBSERVACOESDESENHO"]
	var perimetroCorte = rep["PERIMETROCORTE"]
	var areaPintura = rep["AREAPINTURA"]
	var obsProcesso = rep["OBSPROCESSO"]
	var obsGeral = rep["OBSGERAL"]
	var material = rep["MATERIAL"]
	var areaSecao = rep["AREASECAO"]
	var altura = rep["ALTURA"]
	var larguraAba = rep["LARGURAABA"]
	var espAlma = rep["ESPALMA"]
	var espAba = rep["ESPABA"]
	var tipoDesenho = rep["TIPODESENHO"]
	//var produtoRM = rep["PRODUTORM"]
	//var idprd = rep["IDPRD"]
	//var codigoprd = rep["CODIGOPRD"]
	var comporLista = rep["COMPORLISTA"]
	var codigoTarefaDesc = rep["CODIGOTAREFADESC"]
	var codTrfItem = rep["CODTRFITEM"]
	var idTrfItem = rep["IDTRFITEM"]
	var nomeTrfItem = rep["NOMETRFITEM"]
	var numDocDelp = rep["NUMDOCDELP"]
	var diametroExtDisco = rep["DIAMETROEXTERNODISCO"]
	var diametroIntDisco = rep["DIAMETROINTERNODISCO"]
	var revisaoDocDelp = rep["REVISAODOCDELP"]
	
	/*console.log("numDbi: "+numDbi+", undMedida: "+undMedida+", revisaoDbi: "+revisaoDbi+", revisaoDesenho: "+revisaoDesenho+", bitola: "+bitola+", espessura: "+espessura+", largura: "+largura+", massaLinear: "+
	massaLinear+", espRosca: "+espRosca+", comprimento: "+comprimento+", observacoes: "+observacoes+", diametroExt: "+diametroExt+", diametroInt: "+diametroInt+", dataRevisao: "+dataRevisao+", observacoesDesenho: "+
	observacoesDesenho+", perimetroCorte: "+perimetroCorte+", areaPintura: "+areaPintura+", obsProcesso: "+obsProcesso+", obsGeral: "+obsGeral+", material: "+material+", areaSecao: "+areaSecao+", altura: "+
	altura+", larguraAba: "+larguraAba+", espAlma: "+espAlma+", espAba: "+espAba+", tipoDesenho: "+tipoDesenho+", produtoRM: "+produtoRM+", idprd: "+idprd+", codigoprd: "+codigoprd+", comporLista: "+comporLista+
	", codigoTarefaDesc: "+codigoTarefaDesc+", codTrfItem: "+codTrfItem+", idTrfItem: "+idTrfItem+", nomeTrfItem: "+nomeTrfItem)*/
	
	
	var b1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	var b2 = DatasetFactory.createConstraint("NUMDBI",numDbi,numDbi,ConstraintType.MUST)
	var b3 = DatasetFactory.createConstraint("REVISAODBI",revisaoDbi,revisaoDbi,ConstraintType.MUST)
	var b4 = DatasetFactory.createConstraint("REVISAODESENHO",revisaoDesenho,revisaoDesenho,ConstraintType.MUST)
	var b5 = DatasetFactory.createConstraint("BITOLA",bitola,bitola,ConstraintType.MUST)
	var b6 = DatasetFactory.createConstraint("ESPESSURA",espessura,espessura,ConstraintType.MUST)
	var b7 = DatasetFactory.createConstraint("LARGURA",largura,largura,ConstraintType.MUST)
	var b8 = DatasetFactory.createConstraint("MASSALINEAR",massaLinear,massaLinear,ConstraintType.MUST)
	var b9 = DatasetFactory.createConstraint("ESPROSCA",espRosca,espRosca,ConstraintType.MUST)
	var b10 = DatasetFactory.createConstraint("COMPRIMENTO",comprimento,comprimento,ConstraintType.MUST)
	var b11 = DatasetFactory.createConstraint("OBSERVACOES",observacoes,observacoes,ConstraintType.MUST)
	var b12 = DatasetFactory.createConstraint("DIAMETROEXTERNO",diametroExt,diametroExt,ConstraintType.MUST)
	var b13 = DatasetFactory.createConstraint("DIAMETROINTERNO",diametroInt,diametroInt,ConstraintType.MUST)
	var b14 = DatasetFactory.createConstraint("DATAREVISAO",dataRevisao,dataRevisao,ConstraintType.MUST)
	var b15 = DatasetFactory.createConstraint("OBSERVACOESDESENHO",observacoesDesenho,observacoesDesenho,ConstraintType.MUST)
	var b16 = DatasetFactory.createConstraint("PERIMETROCORTE",perimetroCorte,perimetroCorte,ConstraintType.MUST)
	var b17 = DatasetFactory.createConstraint("AREAPINTURA",areaPintura,areaPintura,ConstraintType.MUST)
	var b18 = DatasetFactory.createConstraint("OBSPROCESSO",obsProcesso,obsProcesso,ConstraintType.MUST)
	var b19 = DatasetFactory.createConstraint("OBSGERAL",obsGeral,obsGeral,ConstraintType.MUST)
	var b20 = DatasetFactory.createConstraint("MATERIAL",material,material,ConstraintType.MUST)
	var b21 = DatasetFactory.createConstraint("AREASECAO",areaSecao,areaSecao,ConstraintType.MUST)
	var b22 = DatasetFactory.createConstraint("ALTURA",altura,altura,ConstraintType.MUST)
	var b23 = DatasetFactory.createConstraint("LARGURAABA",larguraAba,larguraAba,ConstraintType.MUST)
	var b24 = DatasetFactory.createConstraint("ESPALMA",espAlma,espAlma,ConstraintType.MUST)
	var b25 = DatasetFactory.createConstraint("ESPABA",espAba,espAba,ConstraintType.MUST)
	var b26 = DatasetFactory.createConstraint("TIPODESENHO",tipoDesenho,tipoDesenho,ConstraintType.MUST)
	//var b27 = DatasetFactory.createConstraint("PRODUTORM",produtoRM,produtoRM,ConstraintType.MUST)
	//var b28 = DatasetFactory.createConstraint("IDPRD",idprd,idprd,ConstraintType.MUST)
	//var b29 = DatasetFactory.createConstraint("CODIGOPRD",codigoprd,codigoprd,ConstraintType.MUST)
	var b30 = DatasetFactory.createConstraint("IDCRIACAO",idCriacaoCopia,idCriacaoCopia,ConstraintType.MUST)
	var b31 = DatasetFactory.createConstraint("COMPORLISTA",comporLista,comporLista,ConstraintType.MUST)
	var b32 = DatasetFactory.createConstraint("UNDMEDIDA",undMedida,undMedida,ConstraintType.MUST)
	var b33 = DatasetFactory.createConstraint("CODIGOTAREFADESC",codigoTarefaDesc,codigoTarefaDesc,ConstraintType.MUST)
	var b34 = DatasetFactory.createConstraint("CODTRFITEM",codTrfItem,codTrfItem,ConstraintType.MUST)
	var b35 = DatasetFactory.createConstraint("IDTRFITEM",idTrfItem,idTrfItem,ConstraintType.MUST)
	var b36 = DatasetFactory.createConstraint("NOMETRFITEM",nomeTrfItem,nomeTrfItem,ConstraintType.MUST)
	var b37 = DatasetFactory.createConstraint("NUMDOCDELP",numDocDelp,numDocDelp,ConstraintType.MUST)
	var b38 = DatasetFactory.createConstraint("REVISAODOCDELP",revisaoDocDelp,revisaoDocDelp,ConstraintType.MUST)
	var b39 = DatasetFactory.createConstraint("DIAMETROEXTERNODISCO",diametroExtDisco,diametroExtDisco,ConstraintType.MUST)
	var b40 = DatasetFactory.createConstraint("DIAMETROINTERNODISCO",diametroIntDisco,diametroIntDisco,ConstraintType.MUST)
	
	var constraints = new Array(b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,b11,b12,b13,b14,b15,b16,b17,b18,b19,b20,b21,b22,b23,b24,b25,b26,b30,b31,b32,b33,b34,b35,b36,b37,b38,b39,b40)
	
	var dataset = DatasetFactory.getDataset("dsUpdateItemEstruturaOS",null,constraints,null)
	
}

// VERIFICA A MUDANÇA DE ÍNDICES
function verificaMudancaIndice(arrayIndices, novoIndice){
	
	console.log("vou verificar a mudança de índice do novoíndice "+novoIndice)
	
	var arrayAntigos = new Array()
	var arrayNovos = new Array()
	
	arrayAntigos = arrayIndices.slice(0,arrayIndices.length/2)
	arrayNovos = arrayIndices.slice(arrayIndices.length/2,arrayIndices.length)
	
	console.log("arrayAntigos: ")
	console.log(arrayAntigos)
	console.log("arrayNovos: ")
	console.log(arrayNovos)
	
	console.log("vou verificar se novoIndice "+novoIndice+" está contido no arrayAntigos "+arrayAntigos)
	
	console.log(arrayAntigos.includes(novoIndice))
	
	arrayAntigos = arrayAntigos.toString()
	arrayNovos = arrayNovos.toString()
	
	// SE NOVO INDICE FOI ALTERADO
	if(arrayAntigos.indexOf(novoIndice)>-1){
		
		console.log("novoIndice foi alterado")
		
		var indexInicio = arrayAntigos.indexOf(novoIndice)
		var indexFim = novoIndice.length
		
		indexFim = indexInicio + indexFim
		
		console.log("index: "+indexInicio)
		console.log("index: "+indexFim)
		
		novoIndice = arrayNovos.substring(indexInicio,indexFim)
		
	}
	
	console.log("o novoIndice foi alterado para "+novoIndice)
	return novoIndice
	
}

// BUSCA O INDICE ANTIGO
function buscaIndiceAntigo(indice){
	
	console.log("vou buscar o indice antigo de "+indice)
	
	var indiceRet = ""
	
	// PERCORRE A TABELA
	$('input[id^="NIVEL___"]').each(function(index, value){
	
		var seq = $(this).attr("id").split("___")[1]
		
		var indiceAntigo = $("#INDICEANTIGO___"+seq).val()
		console.log("indiceAntigo "+indiceAntigo)
		if(indiceAntigo==indice){
			
			indiceRet = $("#INDICE___"+seq).val()
			
		}
		
	})
	
	console.log("o indice antigo era "+indiceRet)
	
	return indiceRet
	
}

// INDICE EXISTE NA TABELA
function existe(indice){
	
	var existe = false
	var testeExiste = ""
	
		
	var numOS = $("#NUM_OS").val()
	
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	var c2 = DatasetFactory.createConstraint("INDICE",indice,indice,ConstraintType.MUST)

	var constraints = new Array(c1,c2)
	var dataset = DatasetFactory.getDataset("dsBuscaIndiceExisteOS",null,constraints,null)
	var row = dataset.values
	console.log("row "+row)
	
	// SE RETORNO DA CONSULTA NÃO É VAZIO
	if(!(row==null || row=="" || row==undefined || row=="null")){
	
		existe = true
	
	}
	
	return existe
	
}

// LIMPA O CONTEÚDO DO ZOOM
function limparZoomProduto(){
	
	console.log("vou limpar o zoom")
		
	$("#F_PRODUTO_RM").val("")
	$("#F_IDPRD").val("")
	$("#F_CODIGOPRD").val("")
	//$("#F_PRODUTO_RM").prop("readonly",false)
	
}

// LIMPA O CONTEÚDO DO ZOOM
function limparZoom(obj){

	console.log("vou limpar o zoom")
	console.log(obj)
	
	var seq = $(obj).attr("id").split("___")[1]
		
	$("#VIEWPRODUTOCOMPONENTES___"+seq).val("")
	$("#VIEWIDPRDCOMPONENTES___"+seq).val("")
	$("#VIEWCODIGOPRDCOMPONENTES___"+seq).val("")
	$("#VIEWCODUNDCOMPONENTES___"+seq).val("")

}

// LIMPA O CONTEÚDO DO ZOOM
function limparZoomTarefa(){

	console.log("vou limpar o zoom da Tarefa")
	
	$("#F_CODIGOTAREFA").val("")
	$("#F_CODTRFITEM").val("")
	$("#F_IDTRFITEM").val("")
	$("#F_NOMETRFITEM").val("")

}


// LIMPA O CONTEÚDO DO ZOOM DA ATIVIDADE
function limparZoomAtv(obj){

	console.log("vou limpar o zoom da atividade")
	console.log(obj)
	
	var seq = $(obj).attr("id").split("___")[1]
		
	$("#VIEWATIVIDADE___"+seq).val("")
	$("#VIEWCODATIVIDADE___"+seq).val("")
	$("#VIEWDESCATIVIDADE___"+seq).val("")
	$("#VIEWHABILIDADEREQUERIDA___"+seq).val("")

}

// LIMPA O CONTEÚDO DO ZOOM DA ATIVIDADE
function limparZoomPosto(obj){

	console.log("vou limpar o zoom da atividade")
	console.log(obj)
	
	var seq = $(obj).attr("id").split("___")[1]
		
	$("#VIEWPOSTO___"+seq).val("")
	$("#VIEWCODPOSTO___"+seq).val("")
	$("#VIEWDESCPOSTO___"+seq).val("")

}

// CALCULA TOTAL DOS MINUTOS
function calculaTotalMinutos(obj){
	
	// VARIÁVEL PARA O SEQ DA TABELA
	var seq = $(obj).attr("id").split("___")[1]
	
	var fila = $("#VIEWFILA___"+seq).val()
	console.log("fila: "+fila)
	
	// SE FOI PREENCHIDO
	if(fila=="" || fila==null || fila==undefined){
		
		fila = 0
	
	}else{
		// SE NÃO
		
		fila = fila.replace(",",".")
		
		fila = parseFloat(fila)
	
	}
	
	var configuracao = $("#VIEWCONFIGURACAO___"+seq).val()
	console.log("configuracao: "+configuracao)
	
	// SE FOI PREENCHIDO
	if(configuracao=="" || configuracao==null || configuracao==undefined){
		
		configuracao = 0
		
	}else{
		// SE NÃO
		
		configuracao = configuracao.replace(",",".")
		
		configuracao = parseFloat(configuracao)
		
	}
	
	var processamento = $("#VIEWPROCESSAMENTO___"+seq).val()
	console.log("processamento: "+processamento)
	
	// SE FOI PREENCHIDO
	if(processamento=="" || processamento==null || processamento==undefined){
		
		processamento = 0
		
	}else{
		// SE NÃO
		
		processamento = processamento.replace(",",".")
		
		processamento = parseFloat(processamento)
		
	}
	
	var desagregacao = $("#VIEWDESAGREGACAO___"+seq).val()
	console.log("desagregacao: "+desagregacao)
	
	// SE FOI PREENCHIDO
	if(desagregacao=="" || desagregacao==null || desagregacao==undefined){
		
		desagregacao = 0
		
	}else{
		// SE NÃO

		desagregacao = desagregacao.replace(",",".")
		
		desagregacao = parseFloat(desagregacao)
		
	}
	
	var espera = $("#VIEWESPERA___"+seq).val()
	console.log("espera: "+espera)
	
	// SE FOI PREENCHIDO
	if(espera=="" || espera==null || espera==undefined){
		
		espera = 0
		
	}else{
		// SE NÃO
		
		espera = espera.replace(",",".")
		
		espera = parseFloat(espera)
		
	}
	
	var movimentacao = $("#VIEWMOVIMENTACAO___"+seq).val()
	console.log("movimentacao: "+movimentacao)
	
	// SE FOI PREENCHIDO
	if(movimentacao=="" || movimentacao==null || movimentacao==undefined){
		
		movimentacao = 0
		
	}else{
		// SE NÃO
		
		movimentacao = movimentacao.replace(",",".")
		
		movimentacao = parseFloat(movimentacao)
		
	}
	
	var soma = fila + configuracao + processamento + desagregacao + espera + movimentacao
	
	soma = soma.toString()
	
	soma = soma.replace(".",",")
	
	$("#VIEWMINUTOSGASTOS___"+seq).val(soma)
	
}

// BUSCA QUAL O ITEM DA TABELA FOI SELECIONADO
function buscaSelecionadoZoom(){
	
	var seqRet = ""
	
	console.log("vou buscar o zoom selecionado")
	
	// PERCORRE A TABELA E COLETA TODOS OS ITENS
	$('input[id^="VIEWPRODUTOCOMPONENTES___"]').each(function(index, value){
		
		// VARIÁVEL PARA O ÍNDICE DA TABELA
		var seq = $(this).attr("id").split("___")[1]
		
		// SE O ZOOM É O SELECIONADO
		if($("#VIEWPRODUTOCOMPONENTES___"+seq).hasClass("selecionadoZoom")){
			
			seqRet = seq
			
		}
		
	})
	
	console.log("seq selecionado: "+seqRet)
	return seqRet
	
}

// APAGA TODOS OS ITENS DA TABELA PROCESSOS REFERENTES AO IDCRIAÇÃO
function apagaItensTabelaProcessos(idCriacao){
	
	var numOS = $("#NUM_OS").val()
	
	var a1 = DatasetFactory.createConstraint("IDCRIACAOPROCESSO",idCriacao,idCriacao,ConstraintType.MUST);
	var a2 = DatasetFactory.createConstraint("OSPROCESSO",numOS,numOS,ConstraintType.MUST);

	var constraints = new Array(a1,a2);
	
	dataset = DatasetFactory.getDataset("dsDeleteItemProcOS",null,constraints,null);
	
}

// APAGA TODOS OS ITENS DA TABELA COMPONENTES REFERENTES AO IDCRIAÇÃO
function apagaItensTabelaComponentes(idCriacao){
	
	var numOS = $("#NUM_OS").val()
	
	var a1 = DatasetFactory.createConstraint("IDCRIACAOCOMPONENTES",idCriacao,idCriacao,ConstraintType.MUST);
	var a2 = DatasetFactory.createConstraint("OSCOMPONENTES",numOS,numOS,ConstraintType.MUST);

	var constraints = new Array(a1,a2);
	
	dataset = DatasetFactory.getDataset("dsDeleteItemCompOS",null,constraints,null);
	
}

//EXPORTA A VIEW DA ESTRUTURA PARA O ARQUIVO EXCEL
/*$("#EXPORTAR").click(function (e) {
	
    window.open('data:application/vnd.ms-excel,' + $('.divCroqui').html());
    e.preventDefault();
    
});*/

// EXPORTA A VIEW DA ESTRUTURA PARA O ARQUIVO EXCEL
/*function exportarEstrutura(){
	
    window.open('data:application/vnd.ms-excel,' + $('#beforeCroqui').html());
    //e.preventDefault();
    
}*/

// ATIVA O LOAD
function ativaSpinner() {
	
	//var myLoading = FLUIGC.loading(window);
	//myLoading.show();
	
	$("#PANEL1").css("opacity","0.2")
	$("#loader").show();
	  
}

// DESATIVA O LOAD
function desativaSpinner() {
	
	setTimeout(function(){
		$("#PANEL1").css("opacity","1.0")
		$("#loader").hide();
	},500)
	
	/*setTimeout(function(){
		
		myLoading2.hide();
		
	}, 500)*/
	
}

function IndicesPendentes(indice,row){

	var numOS = $("#NUM_OS").val()
	var execucao = $("#EXECUCAO_INFO").val()
	var codTrfEx = $("#CODTRFEX").val()
	var coresOrd= new Array()
	var indices = new Array()
	var rep;

	var verde = "#018b17"
	var amarelo = "#dccc00"
	var vermelho = "#b92113"
	var azul = "#0925ca"

	var c1 = DatasetFactory.createConstraint("NUM_OS",numOS,numOS,ConstraintType.MUST)
	var c2 = DatasetFactory.createConstraint("EXECUCAO",execucao,execucao,ConstraintType.MUST)
	var c3 = DatasetFactory.createConstraint("CODTRFEX",codTrfEx,codTrfEx,ConstraintType.MUST)
	var c4 = DatasetFactory.createConstraint("INDICE",indice,indice,ConstraintType.MUST)
	
	// BUSCA E CARREGA A ESTRUTURA
	var constraints = new Array(c1,c2,c3)

	if( ! (indice=="" || indice==null || indice==undefined) ){

		constraints.push(c4)

	}
		
	// BUSCA E CARREGA A ESTRUTURA
	var dataset = DatasetFactory.getDataset("dsIndicesPendentes",null,constraints,null)
	var row2 = dataset.values

	for(var i=0; i<row2.length; i++){

		rep = row2[i]

		indices.push(rep['INDICE'])

	}
	for(var i=0; i<row.length; i++){

		if(indices.includes(row[i]["INDICE"])){
			coresOrd.push("style='color:"+vermelho+" !important;'")
		}
		else{
			coresOrd.push("style='color:"+verde+" !important;'")
		}

		
	}

	return coresOrd;

}


/*function IndicesPendentes(indice,arrayIdCriacao){

	var numOS = $("#NUM_OS").val()
	var execucao = $("#EXECUCAO_INFO").val()
	var codTrfEx = $("#CODTRFEX").val()
	var coresOrd= new Array()
	var indices = new Array()
	var rep;

	var verde = "#018b17"
	var amarelo = "#dccc00"
	var vermelho = "#b92113"
	var azul = "#0925ca"

	var c1 = DatasetFactory.createConstraint("NUM_OS",numOS,numOS,ConstraintType.MUST)
	var c2 = DatasetFactory.createConstraint("EXECUCAO",execucao,execucao,ConstraintType.MUST)
	var c3 = DatasetFactory.createConstraint("CODTRFEX",codTrfEx,codTrfEx,ConstraintType.MUST)
	var c4 = DatasetFactory.createConstraint("INDICE",indice,indice,ConstraintType.MUST)
	
	// BUSCA E CARREGA A ESTRUTURA
	var constraints = new Array(c1,c2,c3)

	if( ! (indice=="" || indice==null || indice==undefined) ){

		constraints.push(c4)

	}
		
	// BUSCA E CARREGA A ESTRUTURA
	var dataset = DatasetFactory.getDataset("dsIndicesPendentes",null,constraints,null)
	var row = dataset.values

	for(var i=0; i<row.length; i++){

		rep = row[i]

		indices.push(rep['INDICE'])

	}
	for(var i=0; i<arrayIdCriacao.length; i++){

		if(indices.includes(arrayIdCriacao[i])){
			coresOrd.push("style='color:"+vermelho+" !important;'")
		}
		else{
			coresOrd.push("style='color:"+verde+" !important;'")
		}

		
	}

	return coresOrd;


}*/

function BuscaPesquisa(){

	console.log("Função Busca Pesquisa")

	var campo = $("#campospesquisa option:selected").val();
	console.log("🚀 ~ file: utils.js ~ line 11632 ~ BuscaPesquisa ~ campo", campo)
	var valor = $("#VALORPESQUISA").val();
	var os = $("#NUM_OS").val();
	var exec = $("#EXECUCAO_INFO").val();
	var codtrfpai = $("#CODTRFEX").val()

	var arraypesquisa = new Array();
	var rep;

	var c1 = DatasetFactory.createConstraint("CAMPO",campo,campo,ConstraintType.MUST)
	var c2 = DatasetFactory.createConstraint("VALOR",valor,valor,ConstraintType.MUST)
	var c3 = DatasetFactory.createConstraint("OS",os,os,ConstraintType.MUST)
	var c4 = DatasetFactory.createConstraint("EXEC",exec,exec,ConstraintType.MUST)
	var c5 = DatasetFactory.createConstraint("CODTRFPAI",codtrfpai,codtrfpai,ConstraintType.MUST)

	var constraints = new Array(c1,c2,c3,c4,c5)
	var dataset = DatasetFactory.getDataset("dsBuscaPesquisa",null,constraints,null)
	var row = dataset.values

	if(row!= null && row!="" && row!=undefined){
	
		for(var i=0;i<row.length;i++){
			rep = row[i]
			arraypesquisa.push(rep["INDICE"])
			console.log(arraypesquisa[i])
		}
		var array = $("#ARRAYPESQUISA").val()
		if(array!="" && array!=null && array!=undefined){	

			array = array.split(",")
			var atual = Number($("#ARRAYPESQUISAINDICE").val())
			var atualaux;
			atualaux=array[atual]
			tiraSelecao($("#SPANINTERNO"+atualaux.replace(/\./g,"P")));

		}
		$("#ARRAYPESQUISA").val("")
		$("#ARRAYPESQUISA").val(arraypesquisa) 
		console.log("🚀 ~ file: utils.js ~ line 11649 ~ BuscaPesquisa ~ row ", arraypesquisa)
		$("#ARRAYPESQUISAINDICE").val(0)
		console.log("🚀 ~ file: utils.js ~ line 11651 ~ BuscaPesquisa ~ $('#ARRAYPESQUISAINDICE').val(0) ", $('#ARRAYPESQUISAINDICE').val())
		$("#ARRAYPESQUISAINDICEMAX").val(row.length-1)
		console.log("🚀 ~ file: utils.js ~ line 11653 ~ BuscaPesquisa ~ $('#ARRAYPESQUISAINDICEMAX').val(row.length) ", row.length)
		// colocaBordaSelecao
		// tiraSelecao
		//expandir("indice")
		//reduzir("indice")
		var indice = arraypesquisa[0]
		mostraItemPesquisa(indice,0)

	}
	else{

		var Toast = Swal.mixin({
			toast: true,
			position: 'center',
			showConfirmButton: false,
			timer: 1000,
			timerProgressBar: true,
	  	})

		Toast.fire({
			icon: 'warning',
			title: 'Valor não encontrado!'
		})

	}	

	

}

function Anterior(){

	console.log("Função Anterior")
	var array = $("#ARRAYPESQUISA").val()
	array = array.split(",")
	var atual = Number($("#ARRAYPESQUISAINDICE").val())
	var atualaux;
	var prox = Number($("#ARRAYPESQUISAINDICE").val())-1
	prox=array[prox]
	if(atual!=0){
		atualaux=array[atual]
		tiraSelecao($("#SPANINTERNO"+atualaux.replace(/\./g,"P")));
		$("#ARRAYPESQUISAINDICE").val(atual-1)
		mostraItemPesquisa(prox,atual);
	}
	else{
		var Toast = Swal.mixin({
			toast: true,
			position: 'center',
			showConfirmButton: false,
			timer: 1000,
			timerProgressBar: true,
	  	})

		Toast.fire({
			icon: 'warning',
			title: 'Primeiro valor!'
		})
	}

}

function Proximo(){
	
	console.log("Função Proximo")
	var array = $("#ARRAYPESQUISA").val()
	array = array.split(",")
	var atual = Number($("#ARRAYPESQUISAINDICE").val())
	var atualaux;
	var prox = Number($("#ARRAYPESQUISAINDICE").val())+1
	var max = Number($("#ARRAYPESQUISAINDICEMAX").val())
	prox=array[prox]
	if(atual!=max){
		atualaux=array[atual]
		tiraSelecao($("#SPANINTERNO"+atualaux.replace(/\./g,"P")));
		$("#ARRAYPESQUISAINDICE").val(atual+1)
		mostraItemPesquisa(prox,atual);
	}
	else{

		var Toast = Swal.mixin({
			toast: true,
			position: 'center',
			showConfirmButton: false,
			timer: 1000,
			timerProgressBar: true,
	  	})

		Toast.fire({
			icon: 'warning',
			title: 'Último valor!'
		})
	}

}

function mostraItemPesquisa(id,atual_){

	console.log("🚀 ~ file: utils.js ~ line 11729 ~ mostraItemPesquisa ~ id", id)

	var array = $("#ARRAYPESQUISA").val()
	array = array.split(",")
	var atual = atual_
	var atualaux;
	atualaux=array[atual]
	tiraSelecao($("#SPANINTERNO"+atualaux.replace(/\./g,"P")));

	var indice = "SPAN"+id.replace(/\./g,"P")
	var indiceaux="SPAN"+id.replace(/\./g,"P")
	var indicepai;

	while($("#"+indice).is(":visible")==false){

		$("#"+indiceaux).parent().children().children()[0].click();
		indicepai=$("#"+indiceaux).parent().attr('id')
		indiceaux=indicepai;

	}

	document.getElementById("SPANINTERNO"+id.replace(/\./g,"P")).scrollIntoView({behavior: "smooth", block: "center", inline: "center"});

	colocaBordaSelecao($("#SPANINTERNO"+id.replace(/\./g,"P")));
	colocaSelecao($("#SPANINTERNO"+id.replace(/\./g,"P")));

	$("#INDICADOR").text((Number($("#ARRAYPESQUISAINDICE").val())+1) + "/" + (Number($("#ARRAYPESQUISAINDICEMAX").val())+1))

}


document.getElementById("VALORPESQUISA").addEventListener("keydown", function(event) {

	if (event.key === "Enter") {
		// Cancel the default action, if needed
		event.preventDefault();
		// Trigger the button element with a click
		BuscaPesquisa()
	}

});

document.getElementById("divpesquisa").addEventListener("keydown", function(event) {
	
	if (event.key === "ArrowDown") {
		// Cancel the default action, if needed
		event.preventDefault();
		// Trigger the button element with a click
		Proximo();
	}
	else if (event.key === "ArrowUp") {
		// Cancel the default action, if needed
		event.preventDefault();
		// Trigger the button element with a click
		Anterior();
	}

});

window.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.key === 'f') {
		// Cancel the default action, if needed
		event.preventDefault();
        // do something here
		Pesquisa();
		$("#VALORPESQUISA").focus()
    }
});


function insert(num)
{
    var numero = document.getElementById('resultado').innerHTML;
    document.getElementById('resultado').innerHTML = numero + num;
	console.log((document.getElementById('resultado').length))
}
function clean()
{
    document.getElementById('resultado').innerHTML = "";
}
function back()
{
    var resultado = document.getElementById('resultado').innerHTML;
    document.getElementById('resultado').innerHTML = resultado.substring(0, resultado.length -1);
}
function calcular()
{
    var resultado = document.getElementById('resultado').innerHTML;
    if(resultado)
    {
        document.getElementById('resultado').innerHTML = eval(resultado);
    }
    else
    {
        document.getElementById('resultado').innerHTML = "Nada..."
    }
}


function Calculadora(){

	var calculadora=document.getElementById("calculadora");

	if($("#TEMCALCULADORA").val()==0){
		calculadora.style.display='block';
		$("#TEMCALCULADORA").val(1)
	}
	else if($("#TEMCALCULADORA").val()==1) {
    	calculadora.style.display='none';
		$("#TEMCALCULADORA").val(0)
	}

}

function fechaCalculadora(){
	var calculadora=document.getElementById("calculadora");
	calculadora.style.display='none';
	$("#TEMCALCULADORA").val(0)
}

function Pesquisa(){

	var pesquisa=document.getElementById("pesquisa");
	fechaCalculadora();

	if($("#TEMPESQUISA").val()==0){
		pesquisa.style.display='block';
		$("#TEMPESQUISA").val(1)
	}
	else if($("#TEMPESQUISA").val()==1) {
    	pesquisa.style.display='none';
		$("#TEMPESQUISA").val(0)
	}

}

function resizer(){

	var largura =  (Number(Number($("#resizer").css("left").split('px')[0])+10)/ $(document).width())*100

	$("#lateral_menu").css("left",Number(parseInt(largura)+1)+'%')

}


function fechaPesquisa(){
	var pesquisa=document.getElementById("pesquisa");
	pesquisa.style.display='none';
	$("#TEMPESQUISA").val(0)
}

window.addEventListener('keydown', function (event) {

    if (event.key == 'Escape') {

        // Cancel the default action, if needed

        event.preventDefault();

        // do something here

        cancelar();

    }

});

// SUBIR SALDO DA OP DE UM ITEM DA ESTRUTURA E DAS OP'S DA HIERARQUIA ABAIXO DELA
async function subirSaldo(idCriacao){
	
	console.log("subir saldo das OP's do item de idCriacao: "+idCriacao+" e das OP's da hierarquia abaixo")
	
	myLoading.show();

	setTimeout(function(){

		var itens = subirSaldoOP(idCriacao)
		
		myLoading.hide();
		
	},500)
		
}

// SUBIR SALDO DA OP DE UM ITEM DA ESTRUTURA E DAS OP'S DA HIERARQUIA ABAIXO DELA
async function subirSaldoOP(idCriacao){
	
	/*var opsSaldo = await verificaOpsSaldo(idCriacao)
	
	// SE NÃO TEM OPS QUE JÁ TIVERAM ENTRADA DE SALDO 
	if(opsSaldo=="" || opsSaldo==null || opsSaldo==undefined){*/
		
		var pendencias = await verificaPendencias(idCriacao)
		var salvos = new Array()
		
		console.log("pendencias: "+pendencias)
		
		// SE TEM PENDÊNCIAS
		if(!(pendencias=="" || pendencias==null || pendencias==undefined)){
		
			myLoading.hide();
			
			// EXIBE ALERTA
			Swal.fire({
				icon: 'error',
				title: 'Não é possível subir o saldo da OP selecionada e/ou das demais da hierarquia abaixo',
				text: 'Verifique as pendências da(s) OP(s): '+pendencias
			})
						
		} else {
			// SE NÃO
			
			console.log("vou entrar na função recursiva")

			// SOBE O SALDO E GERA AS BAIXAS 
			var itens = await atualizaSaldo(idCriacao,salvos)
			
			console.log("Ordem das OP's para fazer a baixa e subir o saldo")
			
			console.log(itens)
			
			console.log(">>> VOU INICIAR AS BAIXAS E ENTRADAS DA(S) OP(S)")
			
			// PERCORRE TODOS OS ITENS
			for(var i=0; i<itens.length; i++){
				
				var baixa = await geraBaixa(itens[i])
				
				if(!baixa){
					
					console.log("deu erro nas baixas da(s) OP(s) do item "+itens[i]["INDICE"]+" de idCriacao "+itens[i]["IDCRIACAO"])
					
					myLoading.hide()
					
					// EXIBE ALERTA
					Swal.fire({
						icon: 'error',
						title: 'Ocorreu erro para gerar o movimento de baixa',
						text: 'Verifique a(s) pendência(s) da OP do item de indice '+itens[i]["INDICE"]+''
					})
					
					break;
					
				}
				
				console.log("todas as baixas pendentes realizadas para a(s) op(s) do Indice "+itens[i]["INDICE"]+" e idCriacao "+itens[i]["IDCRIACAO"])
				
				var entrada = await geraEntrada(itens[i])
				
				if(!entrada){
					
					console.log("deu erro na entrada da(s) OP(s) do item "+itens[i]["INDICE"]+" de idCriacao "+itens[i]["IDCRIACAO"])
					
					myLoading.hide()

					// EXIBE ALERTA
					Swal.fire({
						icon: 'error',
						title: 'Ocorreu erro para gerar o movimento de entrada',
						text: 'Verifique a(s) pendência(s) da OP do item de indice '+itens[i]["INDICE"]+', custo do posto da última atividade e consitência das demais informações.'
					})
					
					break;
					
				}
				
				console.log("entrada para a(s) op(s) do Indice "+itens[i]["INDICE"]+" e idCriacao "+itens[i]["IDCRIACAO"])
				
			}
			
			confirmaOS()

		}
		
	/*} else {
	// SE NÃO
		
		// EXIBE ALERTA
		Swal.fire({
			icon: 'error',
			title: 'Já ocorreu entrada de estoque da OP do item selecionado ou das demais da hierarquia abaixo',
			text: 'Verifique a(s) OP(s): '+opsSaldo
		})
		
	}*/
		
	return salvos
	
}

// BUSCA O ITEM OS RESPECTIVOS FILHOS DE ACORDO COM A SELEÇÃO
function buscaItens(idCriacao){
	
	console.log("busca os itens de acordo com a seleção")
	
	var numOS = $("#NUM_OS").val()
	var execucao = $("#EXECUCAO_INFO").val()
	var codTrfPai = $("#CODTRFEX").val()
	var indices
	
	console.log("numOS: "+numOS+", execucao: "+execucao+", codTrfPai: "+codTrfPai)
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	var c2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
	var c3 = DatasetFactory.createConstraint("EXECUCAO",execucao,execucao,ConstraintType.MUST)
	
	var constraints = new Array(c1,c2,c3)

	var dataset = DatasetFactory.getDataset("dsEXBuscaEstruturaSubconjOS",null,constraints,null)
	
	var count = dataset.values.length
 
 	console.log("count: "+count)
 	
 	// SE RETORNO NÃO É VAZIO OU NULO
 	if(!(count=="" || count==null || count==undefined || count==0)){
 		
 		indices = dataset.values	
 	
 	}
 	
 	console.log(indices)
 	
 	return indices
	
}

function removeItemArray(indice,indices){
	
	for(var i=0;i<indices.length;i++){
		 
		if(indices[i]["INDICE"]==indice){
	    			
	        console.log("tem elemento")	
	        
	        console.log("vou remover elemento "+indices[i]["INDICE"])
	        
	        indices.splice(i,1)
	        
	    }
		
	}
	
}

// SOBE O SALDO E GERA AS BAIXAS
async function atualizaSaldo(idCriacao,salvos){
	
	console.log("atualiza saldo")
		
	// BUSCA TODOS OS ITENS QUE SERÃO PERCORRIDOS A PARTIR DO ITEM SELECIONADO
	var indices = await buscaItens(idCriacao)
	
	// ENQUANTO O ARRAY NÃO ESTIVER VAZIO
	while(indices.length>0){
		
		console.log("array não está vazio")
		
		// SE ÍNDICE TEM FILHO
		while(idTemFilhoRow(indices[0]["INDICE"],indices,0)){
			
			var filho = idTemFilhoRow(indices[0]["INDICE"],indices,1)
			
			// PERCORRE OS ITENS DA ÁRVORE DE FORMA RECURSIVA
			var percorre = await percorreItens(filho,indices,salvos)
			
			flag = true
			
		}

		console.log("item para realizar baixa e subir saldo: "+indices[0]["IDCRIACAO"])

		// FAZ A BAIXA DA MP E FAZ O VINCULO DO MATERIAL COM A OP
		//var movimento1 = await geraBaixa(indices[0], function (baixa){
		
		/*var baixa = geraBaixa(indices[0])
			
		console.log("baixa principal: "+baixa)
			
		var entrada = geraEntrada(indices[0])
		
		console.log("entrada principal: "+entrada)*/

		console.log("recursão para o pai "+indices[0]["INDICE"]+" finalizado")

		salvos.push(indices[0])
		
		removeItemArray(indices[0]["INDICE"],indices)
		
			//var vinculaMat = vinculaMaterial(indices[0],baixa)
			
			// SOBE O SALDO E FAZ O VINCULO DO MATERIAL
			/*var movimento2 = await geraEntrada(indices[0], function(entrada){
				
				console.log("entrada principal: "+entrada)
				
				//var vinculaMat = vinculaMaterial(indices[0],entrada)

				//removeItemArray(indices[0]["INDICE"],indices)
				
			})*/

		//})
		
	}
	
	console.log("salvos")
	console.log(salvos)
	
	console.log("atualiza saldo finalizado")
		
	//myLoading.hide();
		
	return salvos
	
}

// FUNÇÃO PARA PERCORRER OS ITENS DA ÁRVORE DE FORMA RECURSIVA
async function percorreItens(indice,indices,salvos){
	
	console.log("entrei para montar Pai")
	
	var item
	
	// ENQUANTO ÍNDICE TEM IRMÃO À ESQUERDA
	while(idTemIrmaoEsqRow(indice["INDICE"],indices,0)){
		
		// VARIÁVEL PARA O IRMÃO À ESQUERDA
		var irmaoEsq = idTemIrmaoEsqRow(indice["INDICE"],indices,1)
		
		console.log(indice["INDICE"]+" tem IrmãoEsq: "+irmaoEsq["INDICE"])
		
		// MONTA O PAI
		percorreItens(irmaoEsq,indices,salvos)
		
	}
	
	console.log(indice+" não tem Irmao esquerda")
	
	// ENQUANTO ÍNDICE TEM FILHO
	while(idTemFilhoRow(indice["INDICE"],indices,0)){
				
		// VARIÁVEL PARA O FILHO
		var filho = idTemFilhoRow(indice["INDICE"],indices,1)
	
		console.log(indice["INDICE"]+" tem Filho: "+filho["INDICE"])

		// MONTA O PAI
		percorreItens(filho,indices,salvos)
		
	}

	console.log(indice["INDICE"]+" não tem filho")
	
	console.log("item para realizar baixa e subir saldo: "+indice["IDCRIACAO"])
	
	// FAZ A BAIXA DA MP E FAZ O VINCULO DO MATERIAL COM A OP
	//var movimento1 = await geraBaixa(indice, function(baixa){
	
	/*var baixa = geraBaixa(indice)
		
	console.log("baixa: "+baixa)
	
	var entrada = geraEntrada(indice)
	
	console.log("entrada: "+entrada)*/
	
	//var vinculaMat = vinculaMaterial(indice,baixa)
	
	// SOBE O SALDO E FAZ O VINCULO DO MATERIAL COM A OP
	/*var movimento2 = geraEntrada(indice, function(entrada){
		
		console.log("entrada: "+entrada)
		
		//var vinculaMat = vinculaMaterial(indice,entrada)
		
		removeItemArray(indice["INDICE"],indices)

	})*/
	
	salvos.push(indice)
	
	removeItemArray(indice["INDICE"],indices)
	
	//})

}

// GERA O MOVIMENTO DE ENTRADA
async function geraEntrada(item){
	
	console.log("geraEntrada para o idCriacao: "+item["IDCRIACAO"])
	
	var NOME_DATASERVER = "MovMovimentoTBCData"  
	var codColigada = item["CODCOLIGADA"]
	var codFilial = item["CODFILIAL"]
	var usuario = $("#USUARIOATUAL").val()
	var idprd = item["IDPRD"]
	var numOS = item["OS"]
	var execucao = item["EXECUCAO"]
	var codigoPrd = item["CODIGOPRD"]
	var idCriacao = item["IDCRIACAO"]
	var codTrfPai = item["CODTRFPAI"]
	var ret = true
	
	var ops = buscaOpsItem(numOS,execucao,idCriacao,codTrfPai)
		
	var context = "CodUsuario=fluig;CodSistema=T;CodColigada="+codColigada
	var nseq = 0

	// PERCORRE TODAS AS OPS
	for(var i=0;i<ops.length;i++){
		
		var idAtv = ops[i]["IDATVORDEM"]
		var saldo = ops[i]["SALDO"]
		var custoPosto = ops[i]["CUSTO_POSTO"]
		var codOrdem = ops[i]["CODORDEM"]
		
		var codAux = codigoPrd.substr(0,2)	
		var codloc 
		
		// SE É UM SEMIACABADO
		if(codAux=="03"){
			
			codloc = "25"
			
		}
		
		// SE É UM PRODUTO ACABADO
		if(codAux=="04"){
			
			codloc = "27"
				
		}
		
		var XML = 
		    "<MovMovimento >" +   
			"  <TMOV>" +   
			"	 <CODUSUARIO>"+usuario+"</CODUSUARIO> "+
			"    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" +   
			"    <IDMOV>-1</IDMOV>" +   
			"    <CODFILIAL>" + codFilial + "</CODFILIAL>" +   
			"    <CODLOC>" + codloc + "</CODLOC>" +   
			"    <CODLOCENTREGA>" + codloc + "</CODLOCENTREGA>" +   
			"    <CODLOCDESTINO>" + codloc + "</CODLOCDESTINO>" +  
			"    <CODTMV>1.2.90</CODTMV>" +
			"    <TIPO>A</TIPO>" +   
			"    <DATAEMISSAO>"+dataAtualFormatada()+"</DATAEMISSAO>" +   
			"    <DATABASEMOV>"+dataAtualFormatada()+"</DATABASEMOV>" +   
			"    <DATAMOVIMENTO>"+dataAtualFormatada()+"</DATAMOVIMENTO>" +   
			"    <CODFILIALDESTINO>" + codFilial + "</CODFILIALDESTINO>" +   
			"    <DATALANCAMENTO>"+dataAtualFormatada()+"</DATALANCAMENTO>" +
			"	 <CODCCUSTO>"+numOS+"</CODCCUSTO> "+
			"	 <CAMPOLIVRE1>" +codOrdem+ "</CAMPOLIVRE1>"+
			"	 <CAMPOLIVRE2>" +idAtv+ "</CAMPOLIVRE2>" +
			"  </TMOV>" +  
			
			"  <TNFE>" +   
			"    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" +   
			"    <IDMOV>-1</IDMOV>" +   
			"  </TNFE>" +   
			"  <TMOVFISCAL>" +   
			"    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" +   
			"    <IDMOV>-1</IDMOV>" +   
			"  </TMOVFISCAL> " 
	
		var qtde = saldo
		qtde = parseFloat(qtde)
		
		// SE A QUANTIDADE É MAIOR QUE 0
		if(qtde>0){
			
			// CALCULA O PREÇO UNITÁRIO DO PRODUTO
			var valores = calculaPreco(codOrdem,codColigada,codFilial,qtde)
			var anterior = 0
			var precoUnit = 0
			
			// CALCULA O CUSTO DOS COMPONENTES APONTADOS
			//var custoComponentes = calculaCustoComponentes(codColigada,codFilial,codOrdem)
			
			//console.log("custoPosto: "+custoPosto+", custoComponentes: "+custoComponentes+", qtde: "+qtde)
			console.log("custoPosto: "+custoPosto+", qtde: "+qtde)
			
			console.log("vou calcular o preço unitário")
			
			// SE TEVE RETORNO
			if(!(valores.length==0) ){
				
				console.log("tem saldo já apontado")
				
				anterior = parseFloat(valores[0])
				
				console.log("custo efetivado: "+anterior)
				console.log("qtde já efetivada: "+ parseFloat(valores[1]))
				
				//precoUnit = (anterior + (custoPosto * saldo) + custoComponentes) / parseFloat(valores[1])
				precoUnit = (anterior + (custoPosto * saldo) ) / parseFloat(valores[1])
				
				console.log("precoUnit: "+precoUnit)
				
			} else {

				//precoUnit = ( (custoPosto * saldo) + custoComponentes) / qtde
				precoUnit = (custoPosto * saldo) / qtde
				
				console.log("precoUnit: "+precoUnit)
				
			}
			
			var valorTotal = precoUnit * qtde
			
			var valorServico = buscaValorServico(codOrdem,codColigada,codFilial)
			
			valorServico = valorServico.toString()
		
			if(valorServico.indexOf(",")!='-1'){
				
				valorServico = valorServico.replace(",",".")
				
			}
			
			valorServico = parseFloat(valorServico)
			
			custoPosto = parseFloat(custoPosto)
			
			valorServico = valorServico + (saldo * custoPosto)
			
			valorServico = parseFloat(valorServico).toFixed(2)
			
			console.log("(antes do replace) valorServico: "+valorServico)
			console.log("(antes do replace) valor total item: "+valorTotal)
			console.log("(antes do replace) preco unit: "+precoUnit)
			console.log("(antes do replace) qtde: "+qtde)
			
			qtde = qtde.toString().replace(".",",")
			valorServico = valorServico.toString().replace(".",",")
			precoUnit = precoUnit.toString().replace(".",",")
			valorTotal = valorTotal.toString().replace(".",",")
			
			console.log("valorServico: "+valorServico)
			console.log("preco unit: "+precoUnit)
			console.log("valor total: "+valorTotal)
			console.log("qtde: "+qtde)
			
			var idLote = await geraLote(codColigada, idprd, codOrdem)
				
				// GERAR LOTE  
				//var idLote = await geraLote(codColigada, idprd, codOrdem).then(function(idLote){
						
						XML = XML +    
						"  <TITMMOV>" +   
						"    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" +   
						"    <IDMOV>-1</IDMOV>" +   
						"    <NSEQITMMOV>1</NSEQITMMOV>" +   
						"    <CODFILIAL>" + codFilial + "</CODFILIAL>" +   
						"    <NUMEROSEQUENCIAL>1</NUMEROSEQUENCIAL>" +   
						"    <IDPRD>"+idprd+"</IDPRD>" +
						"    <QUANTIDADE>"+qtde+"</QUANTIDADE>" +   
						"    <PRECOUNITARIO>"+precoUnit+"</PRECOUNITARIO>" +   
						"    <DATAEMISSAO>"+dataAtualFormatada()+"</DATAEMISSAO>" +   
						"    <CODLOC>" + codloc + "</CODLOC>" +
						"	 <VALORTOTALITEM>"+valorTotal+"</VALORTOTALITEM> "+
						"	 <CODCCUSTO>"+numOS+"</CODCCUSTO> "+
						"	 <CAMPOLIVRE>"+valorServico+"</CAMPOLIVRE> "+
						"  </TITMMOV>"
				
						// APONTAR A ENTRADA NO LOTE
						XML = XML +
					      "  <TITMLOTEPRD>" + 
					      "    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" + 
					      "    <IDMOV>-1</IDMOV>" +   
					      "    <NSEQITMMOV>1</NSEQITMMOV>" +
					      "    <IDLOTE>"+idLote+"</IDLOTE>" +    
					      "	 	<QUANTIDADE2>"+qtde+"</QUANTIDADE2>" + 
					      "  </TITMLOTEPRD>"
					      
						XML = XML +    
						   "  <TMOVCOMPL>" +   
						   "    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" +      
						   "    <IDMOV>-1</IDMOV>" +   
						   "    <NUMFLUIG></NUMFLUIG>" +
						   "    <USERFLUIG>"+usuario+"</USERFLUIG>" +		   
						   "  </TMOVCOMPL>"+   
						   "</MovMovimento>"
						   
						console.log("Contexto do movimento: "+context)	
						
					    console.log("XML do movimnto é "+XML)
						
					    
					    try{
							   
							   var a1 = DatasetFactory.createConstraint("XML",XML,XML,ConstraintType.MUST);
							   var a2 = DatasetFactory.createConstraint("CONTEXT",context,context,ConstraintType.MUST);
							   var a3 = DatasetFactory.createConstraint("DATASERVER",NOME_DATASERVER,NOME_DATASERVER,ConstraintType.MUST);
							   var a4 = DatasetFactory.createConstraint("USUARIOATUAL",window.parent.window.WCMAPI.userLogin,window.parent.window.WCMAPI.userLogin,ConstraintType.MUST);

							   var constraints = new Array(a1,a2,a3,a4);

							   console.log("vou gerar entrada")
							   
							   var dataset = DatasetFactory.getDataset("dsGeraMovimento",null,constraints,null);
							
							   console.log("dataset.values.length: "+dataset.values.length)
							   
							   if(dataset.values.length>0){
								   
								   if(dataset.values[0]["STATUS"]=="SUCESSO"){
									   
									   var result = dataset.values[0]["RESULTADO"]
										
									   console.log("Integracao com RM resultado "+result)
									   
									    if(result.length>15){
									    	
									    	ret = false
											break;
									    	
									    } else {
									    	
									    	ret = result.split(";")[1]
											
											var vincula = vinculaMaterial(codColigada,codFilial,codOrdem,idAtv,ret)
										
									    }
									   	   
								   } else {
									   
									   ret = false
									   break;
									   
								   }
								   
							   }
							   	   
						    } catch(e){
						    	
						    	if (e == null)  e = "Erro desconhecido!" 
						            
					            var mensagemErro = "Ocorreu um erro ao salvar dados no RM (geraEntrada - coligada "+codColigada+" ): " + e
					            
					            console.log(mensagemErro)
					            
					            myLoading.hide();
						    	
						    	throw mensagemErro  
							    
						    	ret = false
							    break;
						    
						    }	
						    
				//})

			
		}
		
	}

    return ret
	
	//})
		
}

// GERAR LOTE
async function geraLote(codColigada, idprd, codOrdem){

	console.log("função para gerar lote")
	
	var NOME_DATASERVER = "EstPrdLoteData";
	var numProcess 
	
	var context = "CodUsuario=fluig;CodSistema=T;CodColigada="+codColigada
	var XML	= "";
    var result 
    
    // VERIFICA SE O LOTE COM ESSE NÚMERO JÁ EXISTE
    result = temLote(codOrdem,idprd,codColigada)
    
    console.log("result após verificar se lote já existe: "+result)
    
    if(result=="" || result==null || result==undefined){
    	
    	try{
        	
        	// SE LOTE NÃO EXISTE
        	if(result=="" || result==null || result==undefined){
        		
        		var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST);
        	 	
        		var constraints = new Array(a1);
        		
        	 	var dataset2 = DatasetFactory.getDataset("dsUltimoIdLotePrd",null,constraints,null);
        	 	var idLote = dataset2.values[0]["IDLOTE"];
        		
        		console.log("vou criar um novo lote")
        		
        		XML = 	"<EstPrdLote> ";
                
        	    XML = XML +
        	        	"    <TLotePrd>  " +
        	            "      <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>  " +
        	            "      <IDLOTE>"+idLote+"</IDLOTE>  " +
        	            "      <IDSTATUS>6</IDSTATUS>  " +
        	            "      <IDPRD>"+idprd+"</IDPRD>  " +
        	            "      <NUMLOTE>"+codOrdem+"</NUMLOTE>  " +
        	            "      <DATAFABRICACAO>"+dataAtualFormatada()+"</DATAFABRICACAO>  " +
        	            "	   <CODCOLCFO>1</CODCOLCFO> "+
        	            "	   <CODCFO>F02585</CODCFO> "+
        	            "      <DATAENTRADA>"+dataAtualFormatada()+"</DATAENTRADA>  " +
        	            "      <DATAVALIDADE></DATAVALIDADE>  " +
        	            "    </TLotePrd>  " ;
        	            
        	    console.log("*** CRM *** Passei pela criação do Lote.");

        	   	XML = XML + "  </EstPrdLote> ";
        	    
        	   	console.log("*** CRM *** contexto "+context+" - Nome dataserver "+NOME_DATASERVER);

        	   	console.log("*** CRM *** Lote será criado com esse XML "+XML);
        	    
        	    var a1 = DatasetFactory.createConstraint("XML",XML,XML,ConstraintType.MUST);
        	 	var a2 = DatasetFactory.createConstraint("CONTEXT",context,context,ConstraintType.MUST);
        	 	var a3 = DatasetFactory.createConstraint("DATASERVER",NOME_DATASERVER,NOME_DATASERVER,ConstraintType.MUST);
				var a4 = DatasetFactory.createConstraint("USUARIOATUAL",window.parent.window.WCMAPI.userLogin,window.parent.window.WCMAPI.userLogin,ConstraintType.MUST);

				var constraints = new Array(a1,a2,a3,a4);
        		
        	 	var dataset = DatasetFactory.getDataset("dsGeraMovimento",null,constraints,null);
        	     
        	 	var result = dataset.values[0]["RESULTADO"]
        	 		    
        	 	console.log("result: "+result)
        	    
        	    result = result.split(";")[1]
        		
        	} 
            
            console.log("idLote: "+result)
        	
        } catch(e){

            if (e == null)  e = "Erro desconhecido!" 
            
            var mensagemErro = "Ocorreu um erro ao salvar dados no RM (geraLote - coligada "+codColigada+" ): " + e
            
            console.log(mensagemErro)
            
            myLoading2.hide();

        	throw mensagemErro
        	
        }
    	
    }
    
    return result

}

// VERIFICA SE O LOTE COM ESSE NÚMERO JÁ EXISTE
function temLote(codOrdem,idprd,codColigada){
	
	console.log("temLote")
	
	var idLote = ""
	
	var a1 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST);
 	var a2 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST);
 	var a3 = DatasetFactory.createConstraint("IDPRD",idprd,idprd,ConstraintType.MUST);
 	
	var constraints = new Array(a1,a2,a3);
	
 	var dataset = DatasetFactory.getDataset("dsVerificaLote",null,constraints,null);
 	var count = dataset.values.length
 
 	console.log("count: "+count)
 	
 	// SE RETORNO NÃO É VAZIO OU NULO
 	if(!(count=="" || count==null || count==undefined || count==0)){
 		
 		idLote = dataset.values[0]["IDLOTE"]
 	
 		console.log("idLote: "+idLote)
 		
 	}
 	
 	return idLote
 	
}

// BUSCA O VALOR DO SERVIÇO
function buscaValorServico(codOrdem,codColigada,codFilial){
	
	console.log("busca o valor do serviço")
	
	var a1 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST);
 	var a2 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST);
 	var a3 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST);
 	
	var constraints = new Array(a1,a2,a3);
	
 	var dataset = DatasetFactory.getDataset("dsBuscaValorServico",null,constraints,null);
 	var soma = dataset.values[0]["SOMACUSTO"]
 	
 	console.log("soma: "+soma)
 	
 	return soma
 	
}

// CALCULA O CUSTO DOS COMPONENTES APONTADOS
async function calculaCustoComponentes(codColigada,codFilial,codOrdem){
	
	var componentes = buscaComponentesOP(codColigada,codFilial,codOrdem)
	
	var custoTotal = 0
	
	// PERCORRE TODOS OS COMPONENTES GERAIS
	for(var i=0; i<componentes.length; i++){
		
		var qtde = componentes[i]["QTDE"]
		var custoMedio = componentes[i]["CUSTOMEDIO"]
		var idprd = componentes[i]["IDPRD"]
		
		console.log("idprd: "+idprd+", qtde: "+qtde+", custoMedio: "+custoMedio)
				
		if(qtde.indexOf(",")!=-1){
					
			qtde = qtde.replace(",",".")
			
		}
				
		qtde = parseFloat(qtde)
		
		custoMedio = parseFloat(custoMedio)
		
		console.log("custoMedio: "+custoMedio)
		
		custoTotal = custoTotal + (custoMedio * qtde)
		
		console.log("custoTotal acumulado: "+custoTotal)
		
	}
	
	console.log("custoTotal final calculado dos componentes: "+custoTotal)
	
	return custoTotal
	
}

// BUSCA O LOTE DO COMPONENTE DE UMA DETERMINADA OP
function buscaComponenteLoteOP(codColigada,codFilial,codOrdem,codigoprd,opsUnit){
	
	console.log("busca o lote para baixar do componente "+codigoprd+" e da OP "+codOrdem+", codColigada: "+codColigada+", codFilial: "+codFilial+", opsUnit: "+opsUnit)
	
	var a1 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST);
 	var a2 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST);
 	var a3 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST);
 	var a4 = DatasetFactory.createConstraint("CODIGOPRD",codigoprd,codigoprd,ConstraintType.MUST);
 	var a5 = DatasetFactory.createConstraint("OPSUNITARIAS",opsUnit,opsUnit,ConstraintType.MUST);
 	
	var constraints = new Array(a1,a2,a3,a4,a5);
	
 	var dataset = DatasetFactory.getDataset("dsBuscaLoteComponenteOP",null,constraints,null);
 	var componentes = dataset.values
 	
 	console.log("componentes")
 	console.log(componentes)
 	
 	return componentes
 	
}

// CALCULA O PRECO UNITARIO DO COMPONENTE
function calculaPrecoComp(custoMedio,qtde,saldo,custoPosto){
	
	console.log("vou calcular o preço do componente")
	console.log("custoMedio: "+custoMedio+", qtde: "+qtde+", saldo: "+saldo+", custoPosto: "+custoPosto)
	
	if(qtde.indexOf(",")!=-1){
		
		qtde = qtde.replace(",",".")
		
	}
	
	qtde = parseFloat(qtde)
	
	var precoUnit = (saldo * custoPosto) + (qtde * custoMedio)
	
	console.log("precoUnit: "+precoUnit)
	
	return precoUnit
	
}

// CALCULA O PREÇO UNITÁRIO DO PRODUTO
function calculaPreco(codOrdem,codColigada,codFilial,qtde){
	
	console.log("vou calcular o preço unitário")
	
	console.log("codOrdem: "+codOrdem+", codColigada: "+codColigada+", codFilial: "+codFilial)
	
	var valores = new Array()
	
	var a1 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST);
 	var a2 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST);
 	var a3 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST);
 	
	var constraints = new Array(a1,a2,a3);
	
 	var dataset = DatasetFactory.getDataset("dsCalculaPrecoUnitarioOP",null,constraints,null);
 	var soma = dataset.values[0]["SOMA_CUSTO"]
 	var qtdeEfetivada = dataset.values[0]["QTDE"]
 	
 	// SE RETORNO DA SOMA NÃO É INVÁLIDO OU NULO
 	if( !(soma=="" || soma==null || soma==undefined || soma=="null") ){
 		
 		valores.push(soma)
 		
 		var precoUnit = valores[0]
 		
 		console.log("soma consulta: "+precoUnit)
 		
 		console.log("qtdeEfetivada consulta: "+qtdeEfetivada)
 		
 	 	qtdeEfetivada = parseFloat(qtdeEfetivada)
 	 	
 	 	qtde = qtde + qtdeEfetivada
 	 	
 	 	valores.push(qtde)
 	 	
 	 	console.log("qtde (Efetivada e apontada): "+qtde)
 	 	
 	}
 	
 	return valores
 	
}

// GERA O MOVIMENTO DE ENTRADA
function vinculaMaterial(codColigada,codFilial,codOrdem,idAtv,idmov){
	
	console.log("vinculaMaterial")

	var dataAtual = dataAtualFormatadaCompleta()

	console.log("OP "+codOrdem+" e idmov "+idmov+", codColigada "+codColigada+", codFilial "+codFilial+", idAtvOrdem "+idAtv+", dataAtual "+dataAtual)
	
	var a1 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST);
 	var a2 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST);
 	var a3 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST);
 	var a4 = DatasetFactory.createConstraint("IDATVORDEM",idAtv,idAtv,ConstraintType.MUST);
 	var a5 = DatasetFactory.createConstraint("IDMOV",idmov,idmov,ConstraintType.MUST);
 	var a6 = DatasetFactory.createConstraint("DATAMOVIMENTO",dataAtual,dataAtual,ConstraintType.MUST);
	var a7 = DatasetFactory.createConstraint("USUARIOATUAL",window.parent.window.WCMAPI.userLogin,window.parent.window.WCMAPI.userLogin,ConstraintType.MUST);
 	
	var constraints = new Array(a1,a2,a3,a4,a5,a6,a7);
	
 	var dataset = DatasetFactory.getDataset("dsVinculaMaterialOP",null,constraints,null);
 	
 	console.log("vinculo de material realizado")
 	
}

// BUSCA AS OPS DE UM DETERMINADO ITEM DA ESTRUTURA
function buscaOpsItem(numOS,execucao,idCriacao,codTrfPai){
	
	console.log("buscaOpsItem")
	
	console.log("numOS: "+numOS+", execucao: "+execucao+", idCriacao: "+idCriacao+", codTrfPai: "+codTrfPai)
	
	var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
 	var a2 = DatasetFactory.createConstraint("EXECUCAO",execucao,execucao,ConstraintType.MUST);
 	var a3 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST);
 	var a4 = DatasetFactory.createConstraint("CODTRFPAI",codTrfPai,codTrfPai,ConstraintType.MUST);

	var constraints = new Array(a1,a2,a3,a4);
	
 	var dataset = DatasetFactory.getDataset("dsBuscaOPsItemEstrutura",null,constraints,null);
 	var ops = dataset.values

 	console.log("ops:")
 	console.log(ops)
 	
 	return ops
 	
}

// BUSCA AS OPS DE DETERMINADOS ITENS DA ESTRUTURA
function buscaOpsItens(numOS,execucao,idCriacao,codTrfPai){
	
	console.log("buscaOpsItem")
	
	console.log("numOS: "+numOS+", execucao: "+execucao+", idCriacao: "+idCriacao+", codTrfPai: "+codTrfPai)
	
	var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
 	var a2 = DatasetFactory.createConstraint("EXECUCAO",execucao,execucao,ConstraintType.MUST);
 	var a3 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST);
 	var a4 = DatasetFactory.createConstraint("CODTRFPAI",codTrfPai,codTrfPai,ConstraintType.MUST);

	var constraints = new Array(a1,a2,a3,a4);
	
 	var dataset = DatasetFactory.getDataset("dsBuscaOPsItensEstrutura",null,constraints,null);
 	var ops = dataset.values

 	console.log("ops:")
 	console.log(ops)
 	
 	return ops
 	
}

// BUSCA OS COMPONENTES DE UMA DETERMINADA OP DA ESTRUTURA
function buscaCompGeralOP(codColigada,codFilial,codOrdem){
	
	console.log("buscaCompGeralOP")
	
	var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST);
 	var a2 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST);
 	var a3 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST);
 	
	var constraints = new Array(a1,a2,a3);
	
 	var dataset = DatasetFactory.getDataset("dsBuscaCompSubconjOP",null,constraints,null);
 	var componentes = dataset.values
 	
 	console.log("componentes:")
 	console.log(componentes)
 	
 	return componentes
 	
}

// GERA O MOVIMENTO DE BAIXA
async function geraBaixa(item){
	
	console.log("geraBaixa")

	var codColigada = item["CODCOLIGADA"]
	var codFilial =  item["CODFILIAL"]
	var numOS = item["OS"]
	var execucao = item["EXECUCAO"]
	var idCriacao = item["IDCRIACAO"]
	var codTrfPai = item["CODTRFPAI"]

	var ret = true
	
	console.log("antes de buscar as OPs do item")
		
	//var consulta1 = await buscaOpsItem(numOS,execucao,idCriacao,codTrfPai, function(ops){
		
	var ops = buscaOpsItem(numOS,execucao,idCriacao,codTrfPai)
	
		console.log("depois de buscar as OPs do item")
		
		console.log("o item tem "+ops.length+" ops")
		
		var produtosLote = new Array()
		var codLocGeral = new Array()

		// PERCORRE TODOS AS OP'S REFERENTES AO ITEM
		for(var k=0; k < ops.length; k++){
			
			var saldo = ops[k]["SALDO"]
			var custoPosto = ops[k]["CUSTOPOSTO"]
			var codOrdem = ops[k]["CODORDEM"]
			var idAtv = ops[k]["IDATVORDEM"]
			
			console.log("vou buscar todos os componentes")
			
			var comp = buscaCompGeralOP(codColigada,codFilial,codOrdem)
				
			if(!(comp=="" || comp==null || comp==undefined)){
				
				var percComp = await percorreComponentes(codColigada,codFilial,codOrdem,comp)
				
				if(!percComp){
					
					ret = false
					break;
					
				}
				
				
			} else {
				
				console.log("não tem componentes para realizar a baixa")
				
			}
			
			//})
					
		}
		
		//return ret
		
	//})
	
	return ret
	
}

async function percorreComponentes(codColigada,codFilial,codOrdem,comp){
	
	var ret = true
	
	// PERCORRE TODOS OS COMPONENTES DA OP
	for(var l=0; l<comp.length; l++){
	
		var codigoprd = comp[l]["CODIGOPRD"]
		var saldo = parseInt(comp[l]["SALDO"])
		
		console.log("codigoprd: "+codigoprd)
		
		// SE É OP UNITÁRIA
		if(comp[l]["OPSUNITARIAS"]=="SIM"){
			
			console.log("opsUnitarias")
			
			// REALIZA TODAS AS BAIXAS UMA A UMA
			for(var z=0; z<saldo; z++){
				
				var baixa = await baixaComponente(codColigada,codFilial,codOrdem,codigoprd,1,1)
				
				if(!baixa){
					
					ret = false
					break;
					
				}
				
			}
			
		} else {
			// SE NÃO
			
			console.log("Não é opsUnitárias")
			
			// SE SALDO É MAIOR QUE 0
			if(saldo>0){
				
				var baixa = await baixaComponente(codColigada,codFilial,codOrdem,codigoprd,saldo,0)
				
				if(!baixa){
					
					ret = false
					break;
					
				}
				
			}
			
		}
		
	}
	
	return ret
	
}

async function baixaComponente(codColigada,codFilial,codOrdem,codigoprd,qtde,opsUnit){
	
	var componentes = buscaComponenteLoteOP(codColigada,codFilial,codOrdem,codigoprd,opsUnit)

	var NOME_DATASERVER = "MovMovimentoTBCData" 
	var context = "CodUsuario=fluig;CodSistema=T;CodColigada="+codColigada
	
	var ret
	
	console.log("vou fazer a baixa")
	
	// SE TEM LOTE DISPONÍVEL DO COMPONENTE
	if(!(componentes=="" || componentes==null || componentes==undefined)){
		
		var i = 0
		
		// PERCORRE TODOS OS REGISTROS DA TABELA DE COMPONENTES GERAL
		//for (var i = 0; i < componentes.length; i++){
			
			//var qtde = componentes[i]["QTDE"]
			var idprd = componentes[i]["IDPRD"]
			var codLocComp = componentes[i]["CODLOC"]
			var codigoPrd = componentes[i]["CODIGOPRD"]
			var idLote = componentes[i]["IDLOTE"]
			var custoMedio = componentes[i]["CUSTOMEDIO"]
			var idAtv = componentes[i]["IDATVORDEM"]
			var numOS = componentes[i]["CODCCUSTO"]
			var usuario = $("#USUARIOATUAL").val()
			
			console.log("qtde: "+qtde+", idprd: "+idprd+", codLocComp: "+codLocComp+", idLote: "+idLote+", custoMedio: "+custoMedio+", codigoPrd: "+codigoPrd)
		
			// SE QUANTIDADE DO COMPONENTE FOI INFORMADA
			if(!(qtde=="" || qtde==null || qtde==undefined || qtde=="null")){
				
				console.log("achei componente do item na tabela de componentes gerais que tem quantidade apontada")
				
				console.log("IDPRD componente: "+idprd+", qtde: "+qtde)
				
				// SE QTDE TEM PONTO
				if(qtde.toString().indexOf(".")!=-1){
					
					qtde = qtde.replace(".",",")
					
				}
				
				//
				if(custoMedio.toString().indexOf(".")!=-1){
					
					custoMedio = custoMedio.replace(".",",")
					
				}
				
				console.log("vou dar baixa nos componentes de codloc "+codLocComp)
				
				var XML =
			    "<MovMovimento >" +   
				"  <TMOV>" +   
				"    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" +   
				"    <IDMOV>-1</IDMOV>" +   
				"    <CODFILIAL>" + codFilial + "</CODFILIAL>" +   
				"    <CODLOC>" + codLocComp + "</CODLOC>" +   
				"    <CODLOCENTREGA>" + codLocComp + "</CODLOCENTREGA>" +   
				"    <CODLOCDESTINO>" + codLocComp + "</CODLOCDESTINO>" +   
				"    <CODTMV>2.2.18</CODTMV>" +
				"    <TIPO>A</TIPO>" +   
				"    <DATAEMISSAO>"+dataAtualFormatada()+"</DATAEMISSAO>" +   
				"    <DATABASEMOV>"+dataAtualFormatada()+"</DATABASEMOV>" +   
				"    <DATAMOVIMENTO>"+dataAtualFormatada()+"</DATAMOVIMENTO>" +   
				"    <CODFILIALDESTINO>" + codFilial + "</CODFILIALDESTINO>" +   
				"    <DATALANCAMENTO>"+dataAtualFormatada()+"</DATALANCAMENTO>" + 
				"	 <CODCCUSTO>"+numOS+"</CODCCUSTO> "+
				"	 <CAMPOLIVRE1>"+codOrdem+"</CAMPOLIVRE1>"+
				"	 <CAMPOLIVRE2>"+idAtv+"</CAMPOLIVRE2>"+
				"  </TMOV>" +  
				
				"  <TNFE>" +   
				"    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" +   
				"    <IDMOV>-1</IDMOV>" +   
				"  </TNFE>" +   
				"  <TMOVFISCAL>" +   
				"    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" +   
				"    <IDMOV>-1</IDMOV>" +   
				"  </TMOVFISCAL> " 

				XML = XML +    
				"  <TITMMOV>" +   
				"    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" +   
				"    <IDMOV>-1</IDMOV>" +   
				"    <NSEQITMMOV>1</NSEQITMMOV>" +   
				"    <CODFILIAL>" + codFilial + "</CODFILIAL>" +   
				"    <NUMEROSEQUENCIAL>1</NUMEROSEQUENCIAL>" +   
				"    <IDPRD>" + idprd + "</IDPRD>" +
				"    <QUANTIDADE>" + qtde + "</QUANTIDADE>" +   
				"    <PRECOUNITARIO>"+custoMedio+"</PRECOUNITARIO>" +
				"    <DATAEMISSAO>"+dataAtualFormatada()+"</DATAEMISSAO>" +   
				"    <CODLOC>" + codLocComp + "</CODLOC>" +   
				"	 <CODCCUSTO>"+numOS+"</CODCCUSTO> "+
				"  </TITMMOV>"
				
				XML = XML +
			    "  <TITMLOTEPRD>" + 
			    "    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" + 
			    "    <IDMOV>-1</IDMOV>" +   
			    "    <NSEQITMMOV>1</NSEQITMMOV>" +
			    "    <IDLOTE>"+idLote+"</IDLOTE>" +    
			    "	 <QUANTIDADE2>"+qtde+"</QUANTIDADE2>" + 
			    "  </TITMLOTEPRD>"
				
				XML = XML +   
				"  <TITMMOVCOMPL>"+
				"    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" +   
				"    <IDMOV>-1</IDMOV>" +  
				"    <NSEQITMMOV>1</NSEQITMMOV>" +   
				"    <IDATIVIDADE>"+idAtv+"</IDATIVIDADE>"+
				"  </TITMMOVCOMPL> "
				
				
				XML = XML +    
				   "  <TMOVCOMPL>" +   
				   "    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" +      
				   "    <IDMOV>-1</IDMOV>" +   
				   "    <NUMFLUIG></NUMFLUIG>" +
				   "    <USERFLUIG>"+usuario+"</USERFLUIG>" +		   
				   "  </TMOVCOMPL> "+   
				   "</MovMovimento> "
				   
				console.log( "Contexto do movimento: "+context)	
				
				console.log( "XML do movimento: "+XML)	
				
			   try{
				   
				   var a1 = DatasetFactory.createConstraint("XML",XML,XML,ConstraintType.MUST);
				   var a2 = DatasetFactory.createConstraint("CONTEXT",context,context,ConstraintType.MUST);
				   var a3 = DatasetFactory.createConstraint("DATASERVER",NOME_DATASERVER,NOME_DATASERVER,ConstraintType.MUST);
				   var a4 = DatasetFactory.createConstraint("USUARIOATUAL",window.parent.window.WCMAPI.userLogin,window.parent.window.WCMAPI.userLogin,ConstraintType.MUST);

				   var constraints = new Array(a1,a2,a3,a4);
				
				   var dataset = DatasetFactory.getDataset("dsGeraMovimento",null,constraints,null);
				
				   console.log("dataset.values.length: "+dataset.values.length)
				   
				   if(dataset.values.length>0){
					   
					   if(dataset.values[0]["STATUS"]=="SUCESSO"){
						   
						   var result = dataset.values[0]["RESULTADO"]
							
						   console.log("Integracao com RM resultado "+result)
						   
						   ret = result.split(";")[1]
						   
						   if(!(ret=="" || ret==null || ret==undefined))
								var vinculaMat = vinculaMaterial(codColigada,codFilial,codOrdem,idAtv,ret)

						   ret = true
					
					   } else {
						   
					       myLoading.hide();

					       ret = false
					       
						   throw  "Ocorreu um erro desconhecido ao salvar dados no RM (geraBaixa - coligada "+codColigada+" ): "
						   
					   }
					   
				   }
				   
				   console.log("vou gerar a baixa")
				   	   
			    } catch(e){
			    	
			        if (e == null)  e = "Erro desconhecido!" 
			        
			        var mensagemErro = "Ocorreu um erro ao salvar dados no RM (geraBaixa - coligada "+codColigada+" ): " + e
			        
			        console.log(mensagemErro)
			        
			        myLoading.hide();
			        
			        ret = false
			        
			        throw mensagemErro
			    
			    }
				
			}
			
		//}
		
	}
	
	return ret
	
} 

// VERIFICA SE TODOS OS ITENS A PARTIR DO SELECIONADO TEM PENDÊNCIAS NAS OP'S
async function verificaPendencias(idCriacao){
	
	var ops = ""
	
	var numOS = $("#NUM_OS").val()
	var execucao = $("#EXECUCAO_INFO").val()
	var codTrfPai = $("#CODTRFEX").val()
	
	var opsRet = await buscaOpsItens(numOS,execucao,idCriacao,codTrfPai)
	
	/*var itens = buscaItens(idCriacao)
	
	for(var k=0;k<itens.length;k++){
	
		var ops = await buscaOpsItem(numOS,execucao,itens[k]["IDCRIACAO"],codTrfPai)
		
		for(var j=0; j<ops.length;j++)
			opsRet.push(ops[j])
		
	}*/
	
	console.log("opsRet: "+opsRet)
	
	// PERCORRE TODAS AS OPS DO BLOCO
	for(var i=0;i<opsRet.length;i++){
		
		// SE TEM ALGUMA PENDÊNCIA
		if(verificaPendOp(opsRet[i])){
			
			console.log("tem pendencia na OP vou, inserir")
			
			ops = ops=="" ? opsRet[i]["CODORDEM"] : ops+", "+opsRet[i]["CODORDEM"]
			
		}
		
		// SE OP TEM PLANO DE CORTE
		if(opsRet[i]["PLANOCORTE"]=="SIM" && opsRet[i]["STATUS"]!="5"){
	
			console.log("tem plano de corte")
			
			// SE LOTE DO PLANO NÃO TEM SALDO SUFICIENTE
			if((buscaSaldoPlano(opsRet[i]["CODCOLIGADA"],opsRet[i]["CODFILIAL"],opsRet[i]['NUMPLANOCORTE'])==0)){
				
				if(!(ops.includes(opsRet[i]["CODORDEM"]))){
					
					ops = ops=="" ? opsRet[i]["CODORDEM"] : ops+", "+opsRet[i]["CODORDEM"]
						
				}
				
			}
			
		}
		
	}
	
	return ops
	
}

// VERIFICA SE TODOS OS ITENS A PARTIR DO SELECIONADO TEM PENDÊNCIAS NAS OP'S
function verificaOpsSaldo(idCriacao){
	
	var ops = ""
		
	var numOS = $("#NUM_OS").val()
	var execucao = $("#EXECUCAO_INFO").val()
	
	var a1 = DatasetFactory.createConstraint("OS", numOS, numOS, ConstraintType.MUST);
	var a2 = DatasetFactory.createConstraint("EXECUCAO", execucao, execucao, ConstraintType.MUST);
	var a3 = DatasetFactory.createConstraint("IDCRIACAO", idCriacao, idCriacao, ConstraintType.MUST);
	
	var constraint = new Array(a1,a2,a3);
	
	var dataset = DatasetFactory.getDataset("dsVerificaSaldoOpsEstrutura", null, constraint, null);
	var row = dataset.values;
	
	console.log("row")
	console.log(row)
	
	ops = row.toString()
	
	console.log("ops: "+ops)
	
	return ops
	
}

// VERIFICA SE O SALDO QUE ESTÁ SENDO SUBIDO É SUPERIOR AO SALDO DAS ATIVIDADES DA OP
function verificaPendOp(obj){
	
	console.log("verifica se o saldo que está sendo subido é superior ao saldo das atividades da OP")

	var codOrdem = obj["CODORDEM"]
	var codColigada = obj["CODCOLIGADA"]
	var codFilial = obj["CODFILIAL"]
	var idAtvOrdem = obj["IDATIVIDADE"]
	var prioridade = obj["PRIORIDADE"]
	var numOS = obj["CODCCUSTO"]
	var codEstrutura = obj["CODESTRUTURA"]

	console.log("codOrdem: "+codOrdem+", codEstrutura: "+codEstrutura)
	
	// SE ITEM É UM PAI
	if(codEstrutura.includes("04.")){
		
		console.log("é um item pai")
		
		var ops = temAtvsApontPendentes(codOrdem)
		
		console.log("ops: "+ops)
		
		// SE NÃO TEM ATVS DAS OP'S FILHAS PENDENTES
		if(ops=="" || ops==null || ops==undefined){
									
			// SE TEM ATIVIDADES DA OP QUE AINDA NÃO FORAM APONTADAS
			if(temAtvAntSemApont(codColigada,codFilial,codOrdem)){
				
				return true
				
			} else {
				// SE NÃO
		
				// VERIFICA OS COMPONENTES PENDENTES DA OP
				var compPendentes = temCompPendentes(codColigada,codFilial,codOrdem)
				
				// SE TEM COMPONENTES QUE ESTÃO PENDENTES DE LANÇAMENTOS
				if(!(compPendentes=="" || compPendentes==null || compPendentes==undefined)){
			
					console.log("tem componentes pendentes")
					
					return true
										
				}  else if(codEstrutura.includes("04.")){
						
						// VERIFICA OS COMPONENTES PENDENTES DE TODAS AS OP'S
						//comps = verificaCompOS(codColigada,codFilial,codOrdem)

						comps = temCompPendentes(codColigada,codFilial,codOrdem)
						
						// SE TODOS OS COMPONENTES DAS OPS FILHAS NÃO FORAM CONSUMIDOS
						if(!(comps=="" || comps==null || comps==undefined)){

							console.log("tem componentes pendentes")
							
							return true
							
						} 
						
				}

			
			} 
			
		} else {
			// SE NÃO
			
			return true
			
		}
		
	} else {
		// SE NÃO
		
		console.log("não é um item pai")
		
		// SE TEM ATIVIDADES DA OP QUE AINDA NÃO FORAM APONTADAS
		if(temAtvAntSemApont(codColigada,codFilial,codOrdem)){
			
			console.log("tem atividades pendentes")
			
			return true
			
			
		} else {
			
			// VERIFICA OS COMPONENTES PENDENTES DA OP
			var compPendentes = temCompPendentes(codColigada,codFilial,codOrdem)
			
			// SE TEM COMPONENTES QUE ESTÃO PENDENTES DE LANÇAMENTOS
			if(!(compPendentes=="" || compPendentes==null || compPendentes==undefined)){
		
				console.log("tem componentes pendentes")
				
				return true
				
			}
			
		}
		
	}
	
	return false
			
}

// VERIFICA SE TEM COMPONENTES QUE ESTÃO PENDENTES DE SEREM CONSUMIDOS NA OP 
function temCompPendentes(codColigada,codFilial,codOrdem){
	
	console.log("vou buscar se tem componentes que estão pendentes de serem consumidos para a OP "+codOrdem)
	console.log("codColigada: "+codColigada+", codFilial: "+codFilial)

	var comp = ""
		
	var a1 = DatasetFactory.createConstraint("CODCOLIGADA", codColigada, codColigada, ConstraintType.MUST);
	var a2 = DatasetFactory.createConstraint("CODFILIAL", codFilial, codFilial, ConstraintType.MUST);
	var a3 = DatasetFactory.createConstraint("CODORDEM", codOrdem, codOrdem, ConstraintType.MUST);
	//var a4 = DatasetFactory.createConstraint("IDATVORDEM", idAtvOrdem, idAtvOrdem, ConstraintType.MUST);
	
	var constraint = new Array(a1,a2,a3);
	
	var dataset = DatasetFactory.getDataset("dsVerificaCompPendSF", null, constraint, null);
	var row = dataset.values;
	
	console.log("row")
	console.log(row)
	
	// SE RETORNO NÃO É NULO OU VAZIO
	if(!(row=="" || row==null || row==undefined)){
		
		var count = row.length
		
		console.log("count: "+count)
		
		if(count>0){
			
			// PERCORRE TODOS OS REGISTROS 
			for(var i=0; i<count;i++){
				
				var rep = row[i]
				
				// SE É O PRIMEIRO ITEM
				if(i==0){
					
					comp = rep["COMPONENTE"]
					
				} else {
					// SE NÃO
					
					// SE COMPONENTE NÃO FOI SALVO
					if(!(comp.includes(rep["COMPONENTE"]) ) ){
						
						comp = comp +", "+ rep["COMPONENTE"]
						
					}
				
				}
				
			}
			
		}
		
	}
	
	console.log("comp: "+comp)
	
	return comp
	
}

// SE TEM ATIVIDADES ANTERIORES DA OP QUE AINDA NÃO FORAM APONTADASs
function temAtvAntSemApont(codColigada,codFilial,codOrdem,prioridade){
	
	console.log("codColigada: "+codColigada+", codFilial: "+codFilial+", codOrdem: "+codOrdem)
	
	// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
	var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
	//var a4 = DatasetFactory.createConstraint("PRIORIDADE",prioridade,prioridade,ConstraintType.MUST)

	var constraints = new Array(a1,a2,a3)
	
	var dataset = DatasetFactory.getDataset("dsVerificaAtvsPendOP",null,constraints,null)
	var row = dataset.values
	
	console.log("row")
	console.log(row)
	
	// SE RETORNO NÃO É NULO OU VAZIO
	if(!(row=="" || row==null || row==undefined)){
		
		console.log("tem atividades sem apontamento")
		
		return true
		
	} else {
		
		console.log("não tem atividades sem apontamento")
		
		return false
		
	}
	
}

/*
// VERIFICA OS COMPONENTES PENDENTES DE TODAS AS OP'S
function verificaCompOS(codColigada,codFilial,codOrdem){
	
	console.log("verifica os componentes pendentes de todas as OPS DA OS foram consumidos")
	
	var componentes = ""
	
	console.log("codColigada: "+codColigada+", codFilial: "+codFilial+", codOrdem: "+codOrdem)
	
	// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
	var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
	//var a4 = DatasetFactory.createConstraint("IDATVORDEM",idAtvOrdem,idAtvOrdem,ConstraintType.MUST)
	//var a5 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	
	var constraints = new Array(a1,a2,a3)
	
	var dataset = DatasetFactory.getDataset("dsVerificaCompPendOS",null,constraints,null)
	var row = dataset.values
	
	console.log("row")
	console.log(row)
	
	// SE RETORNO NÃO É NULO OU VAZIO
	if(!(row=="" || row==null || row==undefined)){
		
		var count = row.length
		
		// PERCORRE TODOS OS REGISTROS
		for(var i=0;i<count;i++){
			
			componentes = componentes + " "+rep["COMPONENTE"]+" ,"
			
		}
		
	}
	
	console.log("componentes: "+componentes)
	
	return componentes
	
}*/

// VERIFICA SE TEM ATIVIDADES DAS OPS FILHAS COM APONTAMENTO PENDENTE 
function temAtvsApontPendentes(codOrdem){
	
	console.log("vou buscar se tem atividades das OPS filhas com apontamento pendente da OP: "+codOrdem)
	
	var ops = ""
	
	// RETORNA OS DADOS DA MONTAGEM E DO MONTADOR COM A MENOR DURAÇÃO DE ROTA PARA REALIZAR O SERVIÇO
	var a1 = DatasetFactory.createConstraint("CODORDEM", codOrdem, codOrdem, ConstraintType.MUST);
	var constraint = new Array(a1);
	
	var dataset = DatasetFactory.getDataset("dsOPAtvsApontPendentes", null, constraint, null);
	var row = dataset.values;
	
	// SE RETORNO NÃO É NULO OU VAZIO
	if(!(row=="" || row==null || row==undefined)){
		
		var count = row.length
		
		// PERCORRE TODOS OS REGISTROS 
		for(var i=0; i<count;i++){
			
			var rep = row[i]
			
			// SE É O PRIMEIRO ITEM
			if(i==0){
				
				ops = rep["CODORDEM"]
				
			} else {
				// SE NÃO
				
				// SE OP NÃO FOI SALVA
				if(!(ops.includes(rep["CODORDEM"]) ) ){
					
					ops = ops +", "+ rep["CODORDEM"]
					
				}
			
			}
			
		}
		
	}
	
	console.log("ops: "+ops)
	
	return ops
	
}

// VERIFICA SE TEM OPS FILHAS QUE ESTÃO COM SALDO PENDENTE PARA SUBIR 
function temOPsPendentesSaldo(codOrdem){
	
	console.log("vou buscar se tem OPS filhas que estão com saldo pendente para subir da OP: "+codOrdem)

	var ops = ""
	var qtdeEfet = 0
		
	// RETORNA OS DADOS DA MONTAGEM E DO MONTADOR COM A MENOR DURAÇÃO DE ROTA PARA REALIZAR O SERVIÇO
	var a1 = DatasetFactory.createConstraint("CODORDEM", codOrdem, codOrdem, ConstraintType.MUST);
	var a2 = DatasetFactory.createConstraint("QTDEFETIVADA", qtdeEfet, qtdeEfet, ConstraintType.MUST);
	
	var constraint = new Array(a1,a2);
	
	var dataset = DatasetFactory.getDataset("dsOPAtvsApontPendentes", null, constraint, null);
	var row = dataset.values;
	
	console.log("row")
	console.log(row)
	
	// SE RETORNO NÃO É NULO OU VAZIO
	if(!(row=="" || row==null || row==undefined)){
		
		var count = row.length
		
		// PERCORRE TODOS OS REGISTROS 
		for(var i=0; i<count;i++){
			
			var rep = row[i]
			
			// SE É O PRIMEIRO ITEM
			if(i==0){
				
				ops = rep["CODORDEM"]
				
			} else {
				// SE NÃO
				
				// SE OP NÃO FOI SALVA
				if(!(ops.includes(rep["CODORDEM"]) ) ){
					
					ops = ops +", "+ rep["CODORDEM"]
					
				}
			
			}
			
		}
		
	}
	
	console.log("ops: "+ops)
	
	return ops
	
}

// BUSCA SE TEM IRMÃO À ESQUERDA DE ACORDO COM A CHAMADA
function idTemIrmaoEsq(indice,indices,op){
	
	// FLAG PARA CONTROLE
	var temIrmaoEsquerda = true
	var flag = true
	
	// VARIÁVEL PARA GUARDAR O IRMÃO À ESQUERDA
	var irmaoEsq = ""
	var nivel = indice.substr(0,indice.lastIndexOf("."))
	var posicao = ""
	
	// SE NÍVEL É VAZIO
	if(nivel==""){
		
		posicao = indice
		
	} else {
		
		posicao = indice.substr(indice.lastIndexOf(".")+1,indice.length)
		posicao = parseInt(posicao)
		
	}
	
	//console.log(nivel+" é o pai de "+indice)
	
	// ENQUANTO POSIÇÃO É MAIOR OU IGUAL A 0 E NÃO CONTIDA NO ARRAY
	while(posicao>=0 && flag){
	
		posicao = posicao-1
		posicao = posicao.toString()
		//posicao = posicao.toString()
		
		if(nivel==""){
			
			irmaoEsq = posicao
			//console.log("irmaoEsq "+irmaoEsq)
			
		}else{
			
			irmaoEsq = nivel+"."+posicao
			//console.log("irmaoEsq "+irmaoEsq)
		}
		
		//console.log(indice+" tem irmão a esquerda "+irmaoEsq)
		
		/*
		if(!(indices.indexOf(irmaoEsq)==-1)){
			
			//console.log("encontrei o irmao esquerda de "+indice+" é o "+irmaoEsq)
			flag = false	
			
		} */
		
		for(var i=0;i<indices.length;i++){
			
		    if(indices[i]["INDICE"]==irmaoEsq){
		    			
		    	flag = false
		        
		    }
		    
		}
		
		//posicao = parseInt(posicao)
		
	}

	flag = false
	
	//console.log("sai do loop irmao e o irmao esquerda encontrado é o "+irmaoEsq)
	
	// SE NÃO EXISTE IRMÃO À ESQUERDA
	for(var j=0;j<indices.length;j++){
		
	    if(indices[j]["INDICE"]==irmaoEsq){
	    			
	    	flag = true
	        
	    }
	    
	}
	
	if(flag){
		
		temIrmaoEsquerda = false
		
	}
	
	/*
	// SE NÃO EXISTE IRMÃO À ESQUERDA
	if(indices.indexOf(irmaoEsq)==-1){
		
		temIrmaoEsquerda = false
		
	}*/
	
	// SE CHAMADA É 0
	if(op==0){
		
		return temIrmaoEsquerda
		
	}
	
	// SE CHAMADA É 1
	if(op==1){
		
		return irmaoEsq
		
	}
	
}

//BUSCA SE TEM IRMÃO À ESQUERDA DE ACORDO COM A CHAMADA
function idTemIrmaoEsqRow(indice,indices,op){
	
	// FLAG PARA CONTROLE
	var temIrmaoEsquerda = false
	var flag = true
	
	// VARIÁVEL PARA GUARDAR O IRMÃO À ESQUERDA
	var irmaoEsq = ""
	var nivel = indice.substr(0,indice.lastIndexOf("."))
	var posicao = ""
	
	// SE NÍVEL É VAZIO
	if(nivel==""){
		
		posicao = indice
		
	} else {
		
		posicao = indice.substr(indice.lastIndexOf(".")+1,indice.length)
		posicao = parseInt(posicao)
		
	}
	
	//console.log(nivel+" é o pai de "+indice)
	
	// ENQUANTO POSIÇÃO É MAIOR OU IGUAL A 0 E NÃO CONTIDA NO ARRAY
	while(posicao>=0 && flag){
	
		posicao = posicao-1
		posicao = posicao.toString()
		//posicao = posicao.toString()
		
		if(nivel==""){
			
			irmaoEsq = posicao
			//console.log("irmaoEsq "+irmaoEsq)
			
		}else{
			
			irmaoEsq = nivel+"."+posicao
			//console.log("irmaoEsq "+irmaoEsq)
		}
		
		//console.log(indice+" tem irmão a esquerda "+irmaoEsq)
		
		/*
		if(!(indices.indexOf(irmaoEsq)==-1)){
			
			//console.log("encontrei o irmao esquerda de "+indice+" é o "+irmaoEsq)
			flag = false	
			
		} */
		
		for(var i=0;i<indices.length;i++){
			
		    if(indices[i]["INDICE"]==irmaoEsq){
		    			
		    	flag = false
		        
		    }
		    
		}
		
		//posicao = parseInt(posicao)
		
	}

	flag = false
	
	//console.log("sai do loop irmao e o irmao esquerda encontrado é o "+irmaoEsq)
	
	// SE NÃO EXISTE IRMÃO À ESQUERDA
	for(var j=0;j<indices.length;j++){
		
	    if(indices[j]["INDICE"]==irmaoEsq){
	    			
	    	flag = true
	        
	    	irmaoEsq = indices[j]
	    	
	    }
	    
	}
	
	if(flag){
		
		temIrmaoEsquerda = true
		
	}
	
	/*
	// SE NÃO EXISTE IRMÃO À ESQUERDA
	if(indices.indexOf(irmaoEsq)==-1){
		
		temIrmaoEsquerda = false
		
	}*/
	
	// SE CHAMADA É 0
	if(op==0){
		
		return temIrmaoEsquerda
		
	}
	
	// SE CHAMADA É 1
	if(op==1){
		
		return irmaoEsq
		
	}
	
}

// BUSCA SE TEM FILHO DE ACORDO COM A CHAMADA
function idTemFilhoRow(indice,indices,op){
	
	// FLAG PARA CONTROLE
	var temFilho = false
	var filho = ""
		
	console.log("VOU VERIFICAR SE "+indice+" TEM FILHO")
	console.log(indices)
	
	var pontos = indice.replace(/[^.]/g, "").length
	pontos = pontos + 1
	//console.log("pontos: "+pontos)
	
	// PERCORRE O ARRAY DE ÍNDICES
	for(var k=0; k < indices.length; k++){
		
		var pontosAr = indices[k]["INDICE"].replace(/[^.]/g, "").length
		//console.log("pontosAr: "+pontosAr)
		
		// SE QUANTIDADE DE PONTOS É IGUAL AO DO FILHO
		if(pontosAr==pontos){
			
			var paiIndice = indices[k]["INDICE"].substr(0,indices[k]["INDICE"].lastIndexOf("."))
			//console.log("indices[k]: "+indices[k])
			
			// VERIFICA SE ÍNDICE PODE SER FILHO DO ÍNDICE ATUAL
			if(paiIndice==indice){
				
				filho = indices[k]["INDICE"]
				//console.log("filho: "+filho)
				
			}
			
		}
		
	}
	
	for(var i=0; i<indices.length; i++) {
		
	    if(indices[i]["INDICE"] == filho) {

	    	temFilho = true
	    	
	    	filho = indices[i]
	    	
	    }
	    
	}
	
	// SE CHAMADA É 0
	if(op==0){
		
		return temFilho
		
	}
	
	// SE CHAMADA É 1
	if(op==1){
		
		console.log("filho é "+filho["INDICE"])
		return filho
		
	}
	
}

//BUSCA SE TEM FILHO DE ACORDO COM A CHAMADA
function idTemFilhoRow2(indice,indices,op){
	
	// FLAG PARA CONTROLE
	var temFilho = false
	var filho = ""
		
	console.log("VOU VERIFICAR SE "+indice+" TEM FILHO")
	console.log(indices)
	
	var pontos = indice.replace(/[^.]/g, "").length
	pontos = pontos + 1
	//console.log("pontos: "+pontos)
	// PERCORRE O ARRAY DE ÍNDICES
	
	for(var k=0; k < indices.length; k++){
		
		var pontosAr = indices[k]["INDICE"].replace(/[^.]/g, "").length
		//console.log("pontosAr: "+pontosAr)
		
		// SE QUANTIDADE DE PONTOS É IGUAL AO DO FILHO
		if(pontosAr==pontos){
			
			var paiIndice = indices[k]["INDICE"].substr(0,indices[k]["INDICE"].lastIndexOf("."))
			//console.log("indices[k]: "+indices[k])
			
			// VERIFICA SE ÍNDICE PODE SER FILHO DO ÍNDICE ATUAL
			if(paiIndice==indice){
				
				filho = indices[k]["INDICE"]
				//console.log("filho: "+filho)
				
			}
			
		}
		
	}
	
	for(var i=0; i<indices.length; i++) {
		
	    if(indices[i]["INDICE"] == filho) {

	    	temFilho = true
	    	
	    }
	    
	}
	
	// SE CHAMADA É 0
	if(op==0){
		
		return temFilho
		
	}
	
	// SE CHAMADA É 1
	if(op==1){
		
		console.log("filho é "+filho)
		return filho
		
	}
	
}

// GERA A DATA ATUAL FORMATADA PARA O XML
function dataAtualFormatada(){
		
    var data = new Date();
    
    var dia = data.getDate();
    
    if (dia.toString().length == 1)
      dia = "0"+dia;
    
    var mes = data.getMonth()+1;
    
    if (mes.toString().length == 1)
      mes = "0"+mes;
    
    var ano = data.getFullYear();  
    
    return ano+"-"+mes+"-"+dia;
    
}

// GERA A DATA ATUAL FORMATADA PARA O XML
function dataAtualFormatadaCompleta(){
		
    var data = new Date();
    
    var dia = data.getDate();
    var hora = data.toString().split(" ")[4]
    
    if (dia.toString().length == 1)
      dia = "0"+dia;
    
    var mes = data.getMonth()+1;
    
    if (mes.toString().length == 1)
      mes = "0"+mes;
    
    var ano = data.getFullYear();  
    
    return ano+"-"+mes+"-"+dia;
    
}

// SCRIPT PARA ALTERAR AS VERIFICAÇÕES DE IRMÃO E FILHO PASSANDO O ARRAY DE OBJETOS COM TODAS AS INFORMAÇÕES
/*
 * var indices = [ { INDICE:"1.1", IDCRIACAO:"1389", CODORDEM:"2844/22"}, { INDICE:"1.1.1", IDCRIACAO:"1529", CODORDEM:"39029/22"}]
var irmaoEsq = "1.1.1"

console.dir(indices)
for(var i=0;i<indices.length;i++){
    if(indices[i]["INDICE"]==irmaoEsq){
    			
        console.log("tem elemento")	
        indices.splice(i,1)
    }
}
*/




function EditPAPC(){

	var comp = "PAPC"

	var ret = validate("EDIT"+comp)

	if(ret.VER){

		var codFilial = $("#EDIT"+"CODFILIAL"+comp).val()
		var codColigada = $("#EDIT"+"CODCOLIGADA"+comp).val()
		var codPrj = $("#EDIT"+"CODPRJ"+comp).val()
		var numPlanoCorte = $("#EDIT"+"NUMPLANOCORTE"+comp).val()
		var numLote = $("#EDIT"+"NUMLOTE"+comp).val()
		var idLote = $("#EDIT"+"IDLOTE"+comp).val()
		var idPrd = $("#EDIT"+"IDPRD"+comp).val()
		var codigoPrd = $("#EDIT"+"CODIGOPRODUTO"+comp).val()
		var descPrd = $("#EDIT"+"DESCPROD"+comp).val()

		var input = $("#LISTABAIXAS").find("tbody").find("input[type=checkbox]:checked")

		var id = $(input).parents("tr").first().children("td").eq(0).text()

		var row = $("#LISTABAIXASAUX_"+comp).find("tbody").find("[id^='SEQAUX"+comp+"___']").filter(function(){return $(this).val()==id}).parents('tr')

		var cols = $(row).find('input:not([id*="SEQ"],[id*="TIPO"])')

		for (var i = 0; i <cols.length; i++) {

			var input_id = $(cols[i]).attr('id').split('AUX')

			$(cols[i]).val($("#EDIT"+input_id[0]+comp).val())

		}

		var linha = $("#LINHA___"+id).children('td')

		$(linha).eq(1).find('a').text(codPrj)
		$(linha).eq(2).find('a').text(numPlanoCorte)
		$(linha).eq(3).find('a').text(numLote)
		$(linha).eq(4).find('a').text(codigoPrd)
		$(linha).eq(5).find('a').text(descPrd)

	}
	else{

		// EXIBE ALERTA DA CÓPIA
		var Toast = Swal.mixin({
			toast: true,
			position: 'center',
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
		})

		Toast.fire({
			icon: 'error',
			title: ret.MSG
		})

	}


}

function EditApont(){

	var comp = "APONT"

	var ret = validate("EDIT"+comp)

	if(ret.VER){

		var codFilial = $("#EDIT"+"CODFILIAL"+comp).val()
		var codColigada = $("#EDIT"+"CODCOLIGADA"+comp).val()
		var codPrj = $("#EDIT"+"CODPRJ"+comp).val()
		var codOrdem = $("#EDIT"+"OP"+comp).val()
		var exec = $("#EDIT"+"EXEC"+comp).val()
		var codEstrutura = $("#EDIT"+"CODESTRUTURAOP"+comp).val()
		var idAtv = $("#EDIT"+"IDATV"+comp).val()
		var codAtv = $("#EDIT"+"CODATV"+comp).val()
		var idPrd = $("#EDIT"+"IDPRD"+comp).val()
		var codigoPrd = $("#EDIT"+"CODIGOPRODUTO"+comp).val()
		var descPrd = $("#EDIT"+"DESCPROD"+comp).val()

		var input = $("#LISTABAIXAS").find("tbody").find("input[type=checkbox]:checked")

		var id = $(input).parents("tr").first().children("td").eq(0).text()

		LimpaTabelaLote(id)

		var row = $("#LISTABAIXASAUX_"+comp).find("tbody").find("[id^='SEQAUX"+comp+"___']").filter(function(){return $(this).val()==id}).parents('tr')

		var cols = $(row).find('input:not([id*="SEQ"],[id*="TIPO"])')

		for (var i = 0; i <cols.length; i++) {

			var input_id = $(cols[i]).attr('id').split('AUX')

			$(cols[i]).val($("#EDIT"+input_id[0]+comp).val())

		}

		var linha = $("#LINHA___"+id).children('td')

		$(linha).eq(1).find('a').text(codPrj)
		$(linha).eq(2).find('a').text(codOrdem)
		$(linha).eq(3).find('a').text(codAtv)
		$(linha).eq(4).find('a').text(codigoPrd)
		$(linha).eq(5).find('a').text(descPrd) 

		$("#LINHA___"+id).removeClass("lotependente")
		$("#LINHA___"+id).addClass("lotependente")

	}
	else{

		// EXIBE ALERTA DA CÓPIA
		var Toast = Swal.mixin({
			toast: true,
			position: 'center',
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
		})

		Toast.fire({
			icon: 'error',
			title: ret.MSG
		})

	}	


}

function PreencheModalEdicao(){

	if($("#LISTABAIXAS").find("tbody").find("input[type=checkbox]:checked").length>1){

		// EXIBE ALERTA DA CÓPIA
		var Toast = Swal.mixin({
			toast: true,
			position: 'center',
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
		})
	
		Toast.fire({
			icon: 'error',
			title: 'Selecione apenas um registro!'
		})

	}
	else if($("#LISTABAIXAS").find("tbody").find("input[type=checkbox]:checked").length<1){

		// EXIBE ALERTA DA CÓPIA
		var Toast = Swal.mixin({
			toast: true,
			position: 'center',
			showConfirmButton: false,
			timer: 2000,
			timerProgressBar: true,
		})
	
		Toast.fire({
			icon: 'error',
			title: 'Selecione pelo menos um registro!'
		})

	}
	else{

		var input = $("#LISTABAIXAS").find("tbody").find("input[type=checkbox]:checked")

		var id = $(input).parents("tr").first().children("td").eq(0).text()

		var tipo = $(input).parents("tr").first().attr("tipo")

		var row = $("#LISTABAIXASAUX_"+tipo).find("tbody").find("[id^='SEQAUX"+tipo+"___']").filter(function(){return $(this).val()==id}).parents('tr')

		var cols = $(row).find('input:not([id*="SEQ"],[id*="TIPO"])')

		var seq = $(cols).eq(0).attr('id').split("___")[1]

		for (var i = 0; i <cols.length; i++) {

			var input_id = $(cols[i]).attr('id').split('AUX')

			$("#EDIT"+input_id[0]+tipo).val($(cols[i]).val())

		}

		if(tipo=="APONT"){

			setZoomData("EDITFILIALAPONT",$("#CODFILIALAUXAPONT___"+seq).val())
			setZoomData("EDITCODCCUSTOAPONT",$("#CODPRJAUXAPONT___"+seq).val())
			setZoomData("EDITCODORDEMAPONT",$("#OPAUXAPONT___"+seq).val())
			setZoomData("EDITIDATVORDEMAPONT",$("#CODATVAUXAPONT___"+seq).val())
			setZoomData("EDITCODIGOPRDAPONT",$("#CODIGOPRODUTOAUXAPONT___"+seq).val()+" - "+$("#DESCPRODAUXAPONT___"+seq).val())

			$("select[id*='EDIT'][id*='APONT']").prop("disabled",false)

			
			$(".modalapont").show()
			$(".modalapontpapc").hide()

			var codFilial = $("#EDIT"+"CODFILIAL"+tipo).val()
			var codColigada = $("#EDIT"+"CODCOLIGADA"+tipo).val()
			var codPrj = $("#EDIT"+"CODPRJ"+tipo).val()
			var codOrdem = $("#EDIT"+"OP"+tipo).val()


			input = new Array("EDIT",tipo)

			reloadZoomFilterValues(input[0]+"CODCCUSTO"+input[1],"CODFILIAL,"+codFilial)
			reloadZoomFilterValues(input[0]+"CODORDEM"+input[1],"CODCCUSTO,"+codPrj+",TIRARMPRJ,1")
			reloadZoomFilterValues(input[0]+"IDATVORDEM"+input[1],"CODORDEM,"+codOrdem+",CODFILIAL,"+codFilial)
	
			reloadZoomFilterValues( input[0]+"CODIGOPRD"+input[1],"CODORDEM,"+$("#"+input[0]+"OP"+input[1]).val()+",CODFILIAL,"+$("#"+input[0]+"CODFILIAL"+input[1]).val()+
					",CODCOLIGADA,"+$("#"+input[0]+"CODCOLIGADA"+input[1]).val()+",IDATVORDEM,"+$("#"+input[0]+"IDATV"+input[1]).val()+",CODESTRUTURA,"+$("#"+input[0]+"CODESTRUTURAOP"+input[1]).val())
			
		}
		else{

			setZoomData("EDITFILIALPAPC",$("#CODFILIALAUXPAPC___"+seq).val())
			setZoomData("EDITCODCCUSTOPAPC",$("#CODPRJAUXPAPC___"+seq).val())
			setZoomData("EDITNUMPLANOPAPC",$("#PLANOAUXPAPC___"+seq).val())
			setZoomData("EDITCODIGOPRDPAPC",$("#CODIGOPRODUTOAUXPAPC___"+seq).val()+" - "+$("#DESCPRODAUXPAPC___"+seq).val())
			setZoomData("EDITLOTEPRDPAPC",$("#NUMLOTEAUXPAPC___"+seq).val())

			$("select[id*='EDIT'][id*='PAPC']:not([id*='PRD'])").prop("disabled",false)

			$(".modalapont").hide()
			$(".modalapontpapc").show()

			var codFilial = $("#EDIT"+"CODFILIAL"+tipo).val()
			var codColigada = $("#EDIT"+"CODCOLIGADA"+tipo).val()
			var codPrj = $("#EDIT"+"CODPRJ"+tipo).val()

			input = new Array("EDIT",tipo)

			reloadZoomFilterValues(input[0]+"CODCCUSTO"+input[1],"CODFILIAL,"+codFilial)
			reloadZoomFilterValues(input[0]+"NUMPLANO"+input[1],"CODCCUSTO,"+codPrj+",CODCOLIGADA,"+codColigada+",CODFILIAL,"+codFilial)


		}

		window.location.href="#EDITARAPONT"

	}


}

function verificaRA(codColigada,codFilial,numPlano) {
	console.log("ENTREI NO VERIFICA RA")

var codcoligada = $("#CODCOLIGADA").val()
var codfilial = $("#CODFILIAL").val()
var numPlanoCorte = $("#NUMPLANOCORTE").val()
var status = ""
var ret= ret = {STATUS:"Atenção, a RA deste plano ainda não foi gerada ",TEXT:"Verifique com o programador do plano",VERIFICA:false};

var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST)
var a2 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
var a3 = DatasetFactory.createConstraint("NUMPLANOCORTE",numPlano,numPlano,ConstraintType.MUST)


var constraints = new Array(a1,a2,a3)

var dataset = DatasetFactory.getDataset("dsConsultaRaPAPC",null,constraints,null)
var rep = dataset.values

if(!(rep=="" || rep==null || rep==undefined)){
		
	var row = rep[0]		
	var st = row["STATUS"]
	var ret = true;

	switch (st) {

		case 'A':

			status="A Faturar"
			break;

		case 'C':
			status="Cancelado"
			break;

		case 'F':
			status="Faturado"
			break;

		default:
			status="Em Faturamento"
			break;

	}

	var status = "Atenção, a RA deste plano ainda não foi atendida, está em status de " + status
	var text = "Verifique a RA gerada, número "+ row["NUMEROMOV"]

	if(st!='F'){

		ret = {STATUS:status,TEXT:text,VERIFICA:false};

	}
	else{
		ret = {STATUS:status,TEXT:text,VERIFICA:true};
	}
}

return ret;

}

function AddPAPC(){
	
	var comp = "PAPC"

	var ret = validate(comp)
	if(ret.VER){

		var codFilial = $("#"+"CODFILIAL"+comp).val()
		var codColigada = $("#"+"CODCOLIGADA"+comp).val()
		var codPrj = $("#"+"CODPRJ"+comp).val()
		var numPlanoCorte = $("#"+"NUMPLANOCORTE"+comp).val()
		var numLote = $("#"+"NUMLOTE"+comp).val()
		var idLote = $("#"+"IDLOTE"+comp).val()
		var idPrd = $("#"+"IDPRD"+comp).val()
		var codigoPrd = $("#"+"CODIGOPRODUTO"+comp).val()
		var descPrd = $("#"+"DESCPROD"+comp).val()

		if(PlanoComOpsAbertas(numPlanoCorte)){

			var ver_ra = verificaRA(codColigada,codFilial,numPlanoCorte)

			if(ver_ra.VERIFICA){

				if(!PlanoConcluido(numPlanoCorte)){

					saldoPlano = buscaSaldoPlano(codColigada, codFilial,numPlanoCorte)

					// SE TEM LOTE DISPONÍVEL
					if(!(saldoPlano==0)){

						var c1 = DatasetFactory.createConstraint("TIPO","CONSULTA","CONSULTA",ConstraintType.MUST)
						var c2 = DatasetFactory.createConstraint("NUMPLANOCORTE",numPlanoCorte,numPlanoCorte,ConstraintType.MUST)
					
						var constraints = new Array(c1,c2)
						var dataset = DatasetFactory.getDataset("dsBaixaPAPC",null,constraints,null)

						var saldoLote = Number(dataset.values[0]["QTD_LOTE"])
						var apontar = Number(dataset.values.reduce(function (acc, val) {return Number(acc) + Number(val["QTDMPFINAL"])},0))

						console.log("apontar",apontar)

						saldoLote -= RetornaQtdLote(idLote)

						if(saldoLote >= apontar){

							var seq = ListaBaixasTr(new Array(comp,codPrj,numPlanoCorte,numLote,codigoPrd,descPrd))

							addLinhaBaixasAux(new Array(seq,
								comp,
								codFilial,
								codColigada,
								codPrj,
								numPlanoCorte,
								numLote,
								idLote,  
								idPrd, 
								codigoPrd, 
								descPrd,
								saldoLote,
								apontar
							),new Array(
								"SEQ",
								"TIPO",
								"CODFILIAL",
								"CODCOLIGADA",
								"CODPRJ",
								"PLANO",
								"NUMLOTE",
								"IDLOTE",
								"IDPRD",
								"CODIGOPRODUTO",
								"DESCPROD",
								"SALDOLOTE",
								"SALDOPLANO"
							))

						}
						else{

							// EXIBE ALERTA DA CÓPIA
							var Toast = Swal.mixin({
								toast: true,
								position: 'center',
								showConfirmButton: false,
								timer: 2000,
								timerProgressBar: true,
							})
						
							Toast.fire({
								icon: 'error',
								title: 'Sem saldo suficiente para realizar a baixa'
							})

						}

					}
					else{
						
						// EXIBE ALERTA
						Swal.fire({
							icon: 'error',
							title: 'O Lote cadastrado no plano de corte não está disponível ou com estoque igual a 0',
							text: 'Verifique e tente novamente.'
						})

					}

				}
				else{

					// EXIBE ALERTA DA CÓPIA
					var Toast = Swal.mixin({
						toast: true,
						position: 'center',
						showConfirmButton: false,
						timer: 3000,
						timerProgressBar: true,
					})

					Toast.fire({
						icon: 'error',
						title: 'Este plano já está concluído'
					})

				}

			}
			else{


				Swal.fire({

					icon: 'error',
					title: ver_ra.STATUS,
					text: ver_ra.TEXT

				})

			}

		}
		else{

			Swal.fire({

				icon: 'error',
				title: "Todas OP's concluidas no plano, entre em contato com o suporte"

			})

		}

	}
	else{

		// EXIBE ALERTA DA CÓPIA
		var Toast = Swal.mixin({
			toast: true,
			position: 'center',
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
		})

		Toast.fire({
			icon: 'error',
			title: ret.MSG
		})

	}	


}

// VERIFICA SE O PLANO DE CORTE JÀ FOI TOTALMENTE APONTADO
function PlanoConcluido(input){
	
	var ret = false
	
	var numPlanoCorte = input
	
	var a1 = DatasetFactory.createConstraint("NUMPLANOCORTE",numPlanoCorte,numPlanoCorte,ConstraintType.MUST)
	
	var constraints = new Array(a1)
	
	var dataset = DatasetFactory.getDataset("dsConcluidoPAPC",null,constraints,null)
	var row = dataset.values
	
	// SE RETORNO É NULO OU VAZIO
	if(row=="" || row==null || row==undefined){
		
		ret = true
		
	}
	
	return ret
		
}

function AddApontAuto(seq){

	var codOrdem = $(".COMPONENTESPEND").find("#CODORDEMCOMP___"+seq).val()
	var idAtv = $(".COMPONENTESPEND").find("#IDATVCOMP___"+seq).val()
	var codigoprd = $(".COMPONENTESPEND").find("#CODIGOPRDCOMP___"+seq).val()
	var CodColigada = $("#CODCOLIGADAPEND").val()
	var codFilial = $("#CODFILIALPEND").val()

	var c1 = DatasetFactory.createConstraint("CODORDEM", codOrdem, codOrdem,ConstraintType.MUST)
	var c2 = DatasetFactory.createConstraint("IDATVORDEM", idAtv, idAtv,ConstraintType.MUST)
	var c3 = DatasetFactory.createConstraint("CODIGOPRD", codigoprd, codigoprd,ConstraintType.MUST)
	var c4 = DatasetFactory.createConstraint("CODCOLIGADA", CodColigada, CodColigada,ConstraintType.MUST)
	var c5 = DatasetFactory.createConstraint("CODFILIAL", codFilial, codFilial,ConstraintType.MUST)

	var constraints = new Array(c1,c2,c3,c4,c5)

	var dataset = DatasetFactory.getDataset("dsInformacoesPendencia",null,constraints,null)
	var row = dataset.values
	var ret = row[0]

	var comp = "APONT"

	var ret2 = validate2({CODORDEM:codOrdem,IDATVORDEM:idAtv,CODIGOPRD:codigoprd,CODCOLIGADA:CodColigada,CODFILIAL:codFilial,TIPO:comp})

	console.log(ret)
	console.log(ret2)

	var status_atv = ret["STATUS_ATV"]
	var retrabalho = ret["RETRABALHO"]
	var descatv = ret["DSCATIVIDADE"]

	if(ret2.VER 

		&& 

		(((retrabalho!=null && retrabalho!=undefined && retrabalho!="" && retrabalho!="null") 
			|| ((retrabalho==null || retrabalho==undefined || retrabalho=="" || retrabalho=="null") && descatv=="CONTROLAR"))
			||  ( status_atv!=1 && status_atv!=6)
			)

		){

		var codFilial = ret["CODFILIAL"]
		var codColigada = ret["CODCOLIGADA"]
		var codPrj = ret["CODCCUSTO"]
		var codOrdem = ret["CODORDEM"]
		var exec = ret["NUMEXEC"]
		var codEstrutura = ret["CODESTRUTURA"]
		var idAtv = ret["IDATVORDEM"]
		var codAtv = ret["CODATIVIDADE"]
		var idPrd = ret["IDPRD"]
		var codigoPrd = ret["CODIGOPRD"]
		var descPrd = ret["NOMEFANTASIA"]

		var seq = ListaBaixasTr(new Array(comp,codPrj,codOrdem,codAtv,codigoPrd,descPrd))

		addLinhaBaixasAux(new Array(seq,
			comp,
			codFilial,
			codColigada,
			codPrj,
			codOrdem,
			exec,
			codEstrutura, 
			idAtv, 
			codAtv, 
			idPrd, 
			codigoPrd, 
			descPrd,
			"PRINCIPAL"
		),new Array(
			"SEQ",
			"TIPO",
			"CODFILIAL",
			"CODCOLIGADA",
			"CODPRJ",
			"OP",
			"EXEC",
			"CODESTRUTURAOP",
			"IDATV",
			"CODATV",
			"IDPRD",
			"CODIGOPRODUTO",
			"DESCPROD",
			"TIPOPROD"
		))

		// EXIBE ALERTA DA CÓPIA
		var Toast = Swal.mixin({
			toast: true,
			position: 'center',
			showConfirmButton: false,
			timer: 2000,
			timerProgressBar: true,
		})
	
		Toast.fire({
			icon: 'success',
			title: 'Registro adicionado'
		})
		

	}
	else if(!ret2.VER){

		// EXIBE ALERTA DA CÓPIA
		var Toast = Swal.mixin({
			toast: true,
			position: 'center',
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
		})
	
		Toast.fire({
			icon: 'error',
			title: ret2.MSG
		})

	}
	else{

		// EXIBE ALERTA
		Swal.fire({
			icon: "error",
			title: "Atividade deve estar ao menos programada!",
			text: "Para apontar é necessário ou ter programado a atividade, ou a OP deve ser de retrabalho, ou ser uma atividade de CONTROLE"
		})

	}

}


function AddApontPAPCAuto(seq){

	var numplano = $(".COMPONENTESPENDPAPC").find("#NUMPLANOCOMP___"+seq).val()

	var c1 = DatasetFactory.createConstraint("NUMPLANOCORTE", numplano, numplano,ConstraintType.MUST)
	

	var constraints = new Array(c1)

	var dataset = DatasetFactory.getDataset("dsBuscaInfoPAPC",null,constraints,null)
	var row = dataset.values
	var ret = row[0]

	var comp = "PAPC"

	var ret2 = validate3({NUMPLANOCORTE:numplano,TIPO:comp})

	console.log(ret)
	console.log(ret2)

	if(ret2.VER){

		if(PlanoComOpsAbertas(numplano)){

			
			var codFilial = ret["CODFILIAL"]
			var codColigada = ret["CODCOLIGADA"]
			var numPlanoCorte = ret["NUMPLANOCORTE"]

			var ver_ra = verificaRA(codColigada,codFilial,numPlanoCorte)

			if(ver_ra.VERIFICA){

				if(!PlanoConcluido(numplano)){

					saldoPlano = buscaSaldoPlano(ret["CODCOLIGADA"], ret["CODFILIAL"],ret['NUMPLANOCORTE'])

					// SE TEM LOTE DISPONÍVEL
					if(!(saldoPlano==0)){

						var c1 = DatasetFactory.createConstraint("TIPO","CONSULTA","CONSULTA",ConstraintType.MUST)
						var c2 = DatasetFactory.createConstraint("NUMPLANOCORTE",numplano,numplano,ConstraintType.MUST)
					
						var constraints = new Array(c1,c2)
						var dataset = DatasetFactory.getDataset("dsBaixaPAPC",null,constraints,null)

						var codPrj = ret["OS"]
						var numLote = ret["NUMLOTE"]
						var idLote = ret["IDLOTE"]
						var idPrd = ret["IDPRD"]
						var codigoPrd = ret["CODIGOPRD"]
						var descPrd = ret["DESCPROD"]
						var saldoLote = Number(dataset.values[0]["QTD_LOTE"])
						var apontar = Number(dataset.values.reduce(function (acc, val) {return Number(acc) + Number(val["QTDMPFINAL"])},0))
						console.log("apontar",apontar)

						saldoLote -= RetornaQtdLote(idLote)

						if(saldoLote >= apontar){

							var seq = ListaBaixasTr(new Array(comp,codPrj,numPlanoCorte,numLote,codigoPrd,descPrd))

							addLinhaBaixasAux(new Array(seq,
								comp,
								codFilial,
								codColigada,
								codPrj,
								numPlanoCorte,
								numLote,
								idLote,  
								idPrd, 
								codigoPrd, 
								descPrd,
								saldoLote,
								apontar
							),new Array(
								"SEQ",
								"TIPO",
								"CODFILIAL",
								"CODCOLIGADA",
								"CODPRJ",
								"PLANO",
								"NUMLOTE",
								"IDLOTE",
								"IDPRD",
								"CODIGOPRODUTO",
								"DESCPROD",
								"SALDOLOTE",
								"SALDOPLANO"
							))

							// EXIBE ALERTA DA CÓPIA
							var Toast = Swal.mixin({
								toast: true,
								position: 'center',
								showConfirmButton: false,
								timer: 2000,
								timerProgressBar: true,
							})
						
							Toast.fire({
								icon: 'success',
								title: 'Registro adicionado'
							})

						}
						else{

							// EXIBE ALERTA DA CÓPIA
							var Toast = Swal.mixin({
								toast: true,
								position: 'center',
								showConfirmButton: false,
								timer: 2000,
								timerProgressBar: true,
							})
						
							Toast.fire({

								icon: 'error',
								title: 'Sem saldo suficiente para realizar a baixa'

							})

						}

					}
					else{
						
						// EXIBE ALERTA
						Swal.fire({
							icon: 'error',
							title: 'O Lote cadastrado no plano de corte não está disponível ou com estoque igual a 0',
							text: 'Verifique e tente novamente.'
						})

					}
				}
				else{

					// EXIBE ALERTA DA CÓPIA
					var Toast = Swal.mixin({
						toast: true,
						position: 'center',
						showConfirmButton: false,
						timer: 3000,
						timerProgressBar: true,
					})

					Toast.fire({
						icon: 'error',
						title: 'Este plano já está concluído'
					})

				}

			}
			else{


				Swal.fire({

					icon: 'error',
					title: ver_ra.STATUS,
					text: ver_ra.TEXT

				})

			}

		}
		else{

			Swal.fire({

				icon: 'error',
				title: "Todas OP's concluidas no plano, entre em contato com o suporte"

			})

		}

	}
	else{

		// EXIBE ALERTA DA CÓPIA
		var Toast = Swal.mixin({
			toast: true,
			position: 'center',
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
		})
	
		Toast.fire({
			icon: 'error',
			title: ret2.MSG
		})

	}

}

function RetornaQtdLote(idLote){
	
	var qtd = 0 

	$("#LISTALOTESAUX_APONT").find("input[id*='IDLOTEAUXLOTE___']").filter(function(){return $(this).val()==idLote}).parents('tr').find("input[id^='QTDAPONTAAUXLOTE___']").each(

		function(){

			qtd += Number($(this).val())

		}

	)

	$("#LISTABAIXASAUX_PAPC").find("input[id*='IDLOTEAUXPAPC___']").filter(function(){return $(this).val()==idLote}).parents('tr').find("input[id^='SALDOPLANOAUXPAPC___']").each(

		function(){

			qtd += Number($(this).val())

		}

	)

	return qtd;

}

function retornaRegraOs(os,execucao,codtrfpai){

	// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
	var a1 = DatasetFactory.createConstraint("OS",os,os,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("EXECUCAO",execucao,execucao,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("CODTRFPAI",codtrfpai,codtrfpai,ConstraintType.MUST)

	var constraints = new Array(a1,a2,a3)
	
	var dataset = DatasetFactory.getDataset("dsVerificaExecucaoOS",null,constraints,null)
	var row = dataset.values
	
	console.log("row")
	console.log(row)
	
	// SE RETORNO É NULO OU VAZIO
	if(row=="" || row==undefined || row==null){
		
		return "SIM"
		
	} else {
		
		return "NAO"

	}



}

// BUSCA SALDO DO PLANO
function buscaSaldoPlano(codColigada,codFilial,planoCorte){
	
	console.log("codColigada: "+codColigada+", codFilial: "+codFilial+", planoCorte: "+planoCorte)
	
	// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
	var a1 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("NUMPLANOCORTE",planoCorte,planoCorte,ConstraintType.MUST)

	var constraints = new Array(a1,a2,a3)
	
	var dataset = DatasetFactory.getDataset("dsPlanoCorteMP",null,constraints,null)
	var row = dataset.values
	
	console.log("row")
	console.log(row)
	
	// SE RETORNO É NULO OU VAZIO
	if(row=="" || row==undefined || row==null){
		
		return 0
		
	} else {
		
		var rep = row[0]
		
		return rep["TOTAL_PLANO"]
			
	}
	
}

function PlanoComOpsAbertas(numPlanoCorte){
	
	var ret = false
	
	var a1 = DatasetFactory.createConstraint("NUMPLANOCORTE",numPlanoCorte,numPlanoCorte,ConstraintType.MUST)
	
	var constraints = new Array(a1)
	
	var dataset = DatasetFactory.getDataset("dsOpsConcluidasPAPC",null,constraints,null)
	var row = dataset.values
	
	// SE RETORNO NÃO É NULO OU VAZIO
	if(row!="" && row!=null && row!=undefined){

		ret = true

		
	}
	
	return ret
		
}


function AddApont(){

	var comp = "APONT"

	var ret = validate(comp)

	if(ret.VER){

		var codFilial = $("#"+"CODFILIAL"+comp).val()
		var codColigada = $("#"+"CODCOLIGADA"+comp).val()
		var codPrj = $("#"+"CODPRJ"+comp).val()
		var codOrdem = $("#"+"OP"+comp).val()
		var exec = $("#"+"EXEC"+comp).val()
		var codEstrutura = $("#"+"CODESTRUTURAOP"+comp).val()
		var idAtv = $("#"+"IDATV"+comp).val()
		var codAtv = $("#"+"CODATV"+comp).val()
		var idPrd = $("#"+"IDPRD"+comp).val()
		var codigoPrd = $("#"+"CODIGOPRODUTO"+comp).val()
		var descPrd = $("#"+"DESCPROD"+comp).val()
		var tipoProd = $("#"+"TIPOPROD"+comp).val()

		var seq = ListaBaixasTr(new Array(comp,codPrj,codOrdem,codAtv,codigoPrd,descPrd))

		addLinhaBaixasAux(new Array(seq,
			comp,
			codFilial,
			codColigada,
			codPrj,
			codOrdem,
			exec,
			codEstrutura, 
			idAtv, 
			codAtv, 
			idPrd, 
			codigoPrd, 
			descPrd,
			tipoProd
			
		),new Array(
			"SEQ",
			"TIPO",
			"CODFILIAL",
			"CODCOLIGADA",
			"CODPRJ",
			"OP",
			"EXEC",
			"CODESTRUTURAOP",
			"IDATV",
			"CODATV",
			"IDPRD",
			"CODIGOPRODUTO",
			"DESCPROD",
			"TIPOPROD"
		))

	}
	else{

		// EXIBE ALERTA DA CÓPIA
		var Toast = Swal.mixin({
			toast: true,
			position: 'center',
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
		})
	
		Toast.fire({
			icon: 'error',
			title: ret.MSG
		})

	}	

}

function validate(input){

	var a = $("input[validate='"+input+"']")

	for(var i=0;i<a.length;i++){

		if($(a[i]).val() == "" || $(a[i]).val()==null || $(a[i]).val()==undefined){

			return {VER:false, MSG:"Existem campos vazios que devem ser peenchidos"};

		}

	}

	if(procuraRepetido(input)){

		return {VER:false, MSG:"Não é possível inserir informações duplicadas"};

	}

	window.location.href = "#!"

	return {VER:true, MSG:""};

}


function validate2(input){

	var rows = $("#LISTABAIXASAUX_"+input.TIPO).find("tbody").find("[id^='SEQAUX"+input.TIPO+"___']").parents('tr')

	console.log("linhas",rows.length)

	for(var i = 0; i <rows.length; i++){

		var codordem = $(rows).eq(i).find("input[id*='OPAUXAPONT___']").val()
		var idatv = $(rows).eq(i).find("input[id*='IDATVAUXAPONT___']").val()
		var codigoprd = $(rows).eq(i).find("input[id*='CODIGOPRODUTOAUXAPONT___']").val()
		var codcoligada = $(rows).eq(i).find("input[id*='CODCOLIGADAAUXAPONT___']").val()
		var codfilial = $(rows).eq(i).find("input[id*='CODFILIALAUXAPONT___']").val()

		if(codordem == input.CODORDEM &&
			idatv == input.IDATVORDEM &&
			codigoprd == input.CODIGOPRD &&
			codcoligada == input.CODCOLIGADA &&
			codfilial == input.CODFILIAL
			){

				return {VER:false, MSG:"Não é possível inserir informações duplicadas"};


			}

	}


	return {VER:true, MSG:""};

}

function validate3(input){

	var rows = $("#LISTABAIXASAUX_"+input.TIPO).find("tbody").find("[id^='SEQAUX"+input.TIPO+"___']").parents('tr')

	console.log("linhas",rows.length)

	for(var i = 0; i <rows.length; i++){

		var numplano = $(rows).eq(i).find("input[id*='PLANOAUXPAPC___']").val()

		if(numplano == input.NUMPLANOCORTE ){

			return {VER:false, MSG:"Não é possível inserir informações duplicadas"};

		}

	}


	return {VER:true, MSG:""};

}

function procuraRepetido(input){

	console.log(input)

	if(input.indexOf("EDIT")!=-1){

		var check = $("#LISTABAIXAS").find("tbody").find("input[type=checkbox]:checked")
		
		var id = $(check).parents("tr").first().children("td").eq(0).text()

		var tipo = $(check).parents("tr").first().attr("tipo")

		var rows = $("#LISTABAIXASAUX_"+tipo).find("tbody").find("[id^='SEQAUX"+tipo+"___']").filter(function(){return $(this).val()!=id}).parents('tr')

		console.log("linhas",rows.length)

		for(var i = 0; i <rows.length; i++){

			var cols = $(rows).eq(i).find('input:not([id*="SEQ"],[id*="TIPO"])')

			var verifica = 0;

			console.log("colunas",cols.length)

			for (var j = 0; j <cols.length; j++) {

				var input_id = $(cols[j]).attr('id').split('AUX')

				if($("#EDIT"+input_id[0]+tipo).val()==$(cols[j]).val()){

					verifica++;

				}

			}

			console.log("verifica",verifica)

			if(verifica==cols.length){

				return true;

			}

		}

	}
	else{

		var tipo =  input

		console.log("tipo",tipo)

		var rows = $("#LISTABAIXASAUX_"+tipo).find("tbody").find("[id^='SEQAUX"+tipo+"___']").parents('tr')

		console.log("linhas",rows.length)

		for(var i = 0; i <rows.length; i++){

			var cols = $(rows).eq(i).find('input:not([id*="SEQ"],[id*="TIPO"])')

			var verifica = 0;

			console.log("colunas",cols.length)

			for (var j = 0; j <cols.length; j++) {

				var input_id = $(cols[j]).attr('id').split('AUX')

				if($("#"+input_id[0]+tipo).val()==$(cols[j]).val()){

					verifica++;

				}

			}

			console.log("verifica",verifica)

			if(verifica==cols.length){

				return true;

			}

		}

	}

	return false;


}

function addLinhaBaixasAux(array1,array2){

	var seq = wdkAddChild('LISTABAIXASAUX_'+array1[1])

	for(var i=0; i<array1.length; i++){

		$("#"+array2[i]+"AUX"+array1[1]+"___"+seq).val(array1[i])

	}

	$("#TOTALAPONTAUXAPONT___"+seq).val(0)

}

function preencheCheckBox(tableId){

	$("#"+tableId).find("tbody").find("input[type=checkbox]:visible").prop("checked",$("#"+tableId).find("thead").find("input[type=checkbox]").eq(0).prop("checked"))

}


function ListaBaixasTr(props){

	var seq = $('#LISTABAIXAS').find('tbody').children()

	var max = 0

	$(seq).each(function(){

		var id = Number($(this).attr("id").split("___")[1])

		if(id>max){

			max = id;

		}

	})

	seq = Number(max) + 1;

	var lotependente = props[0]=="PAPC" ? "" : "lotependente"

	var str = ' <tr id="LINHA___'+seq+'" name="LINHA___'+seq+'" class="LINHABAIXAS '+lotependente+'" tipo="'+props[0]+'"> '+
	' <td><p><input type="checkbox" name="CHECKBOX_LINE___'+seq+'" id="CHECKBOX_LINE___'+seq+'" class="filled-in"/><label for="CHECKBOX_LINE___'+seq+'"></label></p><a href="#PREENCHELOTEMODAL" onclick="PreencheLoteModal('+seq+')" class="filtrar">'+seq+'</a></td>'+
	' <td><a href="#PREENCHELOTEMODAL" onclick="PreencheLoteModal('+seq+')" class="filtrar">'+props[1]+'</a></td> '+
	' <td><a href="#PREENCHELOTEMODAL" onclick="PreencheLoteModal('+seq+')" class="filtrar">'+props[2]+'</a></td> '+
	' <td><a href="#PREENCHELOTEMODAL" onclick="PreencheLoteModal('+seq+')" class="filtrar">'+props[3]+'</a></td> '+
	' <td><a href="#PREENCHELOTEMODAL" onclick="PreencheLoteModal('+seq+')" class="filtrar">'+props[4]+'</a></td> '+
	' <td><a href="#PREENCHELOTEMODAL" onclick="PreencheLoteModal('+seq+')" class="filtrar">'+props[5]+'</a></td> '+ 
	' </tr> '

	$('#LISTABAIXAS').find('tbody').append(str)

	return seq;

}

function PreencheLoteModal(seq){

	var linha = $("#LINHA___"+seq)

	var tipo = $(linha).attr("tipo")

	console.log('tipo',tipo)

	if(tipo=="PAPC"){

		$("#LOTEAPONT").hide()
		$("#LOTEPAPC").show()

		var papc = $("#LINHA___"+seq).children('td').eq(2).find("a").text()

		ConstroiRelatorioPAPC(papc)

	}
	else{

		$("#LOTEAPONT").show()
		$("#LOTEPAPC").hide()

		var id = $("#LINHA___"+seq).children('td').eq(0).find("a").text()

		var row = $("#LISTABAIXASAUX_"+tipo).find("tbody").find("[id^='SEQAUX"+tipo+"___']").filter(function(){return $(this).val()==id}).parents('tr')

		codColigada   = $(row).find("input[id*='CODCOLIGADAAUXAPONT']").val()
		codFilial   = $(row).find("input[id*='CODFILIALAUXAPONT']").val()
		codOrdem   = $(row).find("input[id*='OPAUXAPONT']").val()
		idAtividade   = $(row).find("input[id*='IDATVAUXAPONT']").val()
		idPrd = $(row).find("input[id*='IDPRDAUXAPONT']").val()

		ConstroirelatorioLotes(codColigada,codFilial,codOrdem,idAtividade,idPrd,seq)

	}

}

function ConstroiRelatorioPAPC(numplano){

	var c1 = DatasetFactory.createConstraint("NUMPLANOCORTE",numplano,numplano,ConstraintType.MUST)
	var c2 = DatasetFactory.createConstraint("TIPO","PAPC","PAPC",ConstraintType.MUST)

	var constraints = new Array(c1,c2)
	var dataset = DatasetFactory.getDataset("dsRelatorioBaixa",null,constraints,null)
	var row = dataset.values

	$('#RELATORIOPAPC').find('tbody').empty()

	for(var i=0; i<row.length; i++){

		ListaRelatorioPAPC(row[i])

	}

}

function ConstroirelatorioLotes(codColigada,codFilial,codOrdem,idAtividade,idPrd,seq){

	var c1 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST)
	var c2 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST)
	var c3 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
	var c4 = DatasetFactory.createConstraint("IDATVORDEM",idAtividade,idAtividade,ConstraintType.MUST)
	var c5 = DatasetFactory.createConstraint("IDPRD",idPrd,idPrd,ConstraintType.MUST)
	var c6 = DatasetFactory.createConstraint("TIPO","APONT","APONT",ConstraintType.MUST)

	var constraints = new Array(c1,c2,c3,c4,c5,c6)
	var dataset = DatasetFactory.getDataset("dsRelatorioBaixa",null,constraints,null)
	var row = dataset.values

	var rep;

	if(row.length > 0 ){

		var seq_verifica = $("#LISTALOTESAUX_APONT").find("input[id*='SEQAUXLOTE___']").filter(function(){return $(this).val()==seq}).val()

		if(seq_verifica==undefined || seq_verifica==null || seq_verifica==""){
	
			$("#LOTEAPONTAMENTO").prop("disabled",false)

			window["LOTEAPONTAMENTO"].setValue(""); 

			$('#RELATORIOAPONT').find('tbody').empty()

			$("#TABELA_APONT_PESQUISA").val("")

			$("#LOTEAPONTAMENTO").attr("seqBaixa",seq)

			reloadZoomFilterValues("LOTEAPONTAMENTO","CODCOLIGADA,"+codColigada+",CODFILIAL,"+codFilial+",CODORDEM,"+codOrdem+",IDATVORDEM,"+idAtividade+",IDPRD,"+idPrd+",TIPO,"+"APONT")

			campoLabel()

			for(var i = 0; i < row.length; i++){
				
				rep = row[i];

				var seq2 = wdkAddChild("LISTALOTESAUX_APONT")

				$("#SEQAUXLOTE___"+seq2).val(seq)
				$("#TIPOAUXLOTE___"+seq2).val("APONT")
				$("#CODFILIALAUXLOTE___"+seq2).val(rep["CODFILIAL"])
				$("#CODCOLIGADAAUXLOTE___"+seq2).val(rep["CODCOLIGADA"])
				$("#IDPRODUTOAUXLOTE___"+seq2).val(rep["IDPRODUTO"])
				$("#CODPRODUTOAUXLOTE___"+seq2).val(rep["CODIGOPRD"])
				$("#CUSTOMEDIOAUXLOTE___"+seq2).val(rep["CUSTOMEDIO"])
				$("#PREVISTOAUXLOTE___"+seq2).val(rep["PREVISTO"])
				$("#RELLOTEPREV").val(rep["PREVISTO"])
				$("#APONTADOAUXLOTE___"+seq2).val(rep["APONTADO"])
				$("#RELLOTEAPONT").val(rep["APONTADO"])
				$("#RELLOTESELEC").val("0")
				$("#GRUPOAUXLOTE___"+seq2).val(rep["GRUPO"])
				$("#MASKPRDAUXLOTE___"+seq2).val(rep["MASKPRD"])
				$("#SUBSTITUTOAUXLOTE___"+seq2).val(rep["SUBSTITUTO"])
				$("#NUMLOTEAUXLOTE___"+seq2).val(rep["NUMLOTE"])
				$("#IDLOTEAUXLOTE___"+seq2).val(rep["IDLOTE"])
				$("#SALDOFISICO2AUXLOTE___"+seq2).val(rep["SALDOFISICO2"])
				$("#IDSTATUSAUXLOTE___"+seq2).val(rep["IDSTATUS"])
				$("#DESCRICAOSATUSAUXLOTE___"+seq2).val(rep["DESCRICAO"])
				$("#CODLOCAUXLOTE___"+seq2).val(rep["CODLOC"])
				$("#QTDAPONTAAUXLOTE___"+seq2).val(0)
				$("#SELECIONADOAUXLOTE___"+seq2).val("N")
				$("#CODUNDAUXLOTE___"+seq2).val(rep["CODUNDCONTROLE"])
			
			}
			
		}
		else{

			$("#LOTEAPONTAMENTO").prop("disabled",false)

			window["LOTEAPONTAMENTO"].setValue(""); 

			$('#RELATORIOAPONT').find('tbody').empty()

			$("#TABELA_APONT_PESQUISA").val("")

			$("#LOTEAPONTAMENTO").attr("seqBaixa",seq)

			reloadZoomFilterValues("LOTEAPONTAMENTO","CODCOLIGADA,"+codColigada+",CODFILIAL,"+codFilial+",CODORDEM,"+codOrdem+",IDATVORDEM,"+idAtividade+",IDPRD,"+idPrd+",TIPO,"+"APONT")

			var linhas = $("#LISTALOTESAUX_APONT").find("input[id*='SEQAUXLOTE___']").filter(function(){return $(this).val()==seq}).parents('tr').filter(function(){return $(this).find("input[id*='SELECIONADOAUXLOTE___']").val()=="S"})

			var linhas2 = $("#LISTALOTESAUX_APONT").find("input[id*='SEQAUXLOTE___']").filter(function(){return $(this).val()==seq}).parents('tr').filter(function(){return $(this).find("input[id*='SELECIONADOAUXLOTE___']").val()=="N"})

			$(linhas).each(function(){ $(this).find("input[id*='SELECIONADOAUXLOTE___']").val("Y") })

			$(linhas2).each(function(){ $(this).find("input[id*='SELECIONADOAUXLOTE___']").val("M") })

			$("#RELLOTESELEC").val("0")

			for (var i = 0; i < row.length; i++){
				
				rep = row[i];

				var reg = $(linhas).filter( function(){ return $(this).find("input[id*='IDLOTEAUXLOTE___']").val()==rep["IDLOTE"] })

				var reg2 = $(linhas2).filter( function(){ return $(this).find("input[id*='IDLOTEAUXLOTE___']").val()==rep["IDLOTE"] })

				if(reg.length>=1){

					AdicionaLinha(rep["IDLOTE"])

					$(reg).find("input[id*='PREVISTOAUXLOTE___']").val(rep["PREVISTO"])
					$("#RELLOTEPREV").val(rep["PREVISTO"])
					$(reg).find("input[id*='APONTADOAUXLOTE___']").val(rep["APONTADO"])
					$("#RELLOTEAPONT").val(rep["APONTADO"])

				}

				if(reg2.length>=1){

					$(reg).find("input[id*='SELECIONADOAUXLOTE___']").val("N")

				}
				
			}

			$("#LISTALOTESAUX_APONT").find("input[id*='SEQAUXLOTE___']").filter(function(){return $(this).val()==seq}).parents('tr').filter(function(){return $(this).find("input[id*='SELECIONADOAUXLOTE___']").val()=="Y"}).remove()
			$("#LISTALOTESAUX_APONT").find("input[id*='SEQAUXLOTE___']").filter(function(){return $(this).val()==seq}).parents('tr').filter(function(){return $(this).find("input[id*='SELECIONADOAUXLOTE___']").val()=="M"}).remove()

		}

		
	}
	else{


		$("#LOTEAPONTAMENTO").prop("disabled",false)

		window["LOTEAPONTAMENTO"].setValue(""); 

		$('#RELATORIOAPONT').find('tbody').empty()

		$("#TABELA_APONT_PESQUISA").val("")

		$("#RELLOTESELEC").val("")
		$("#RELLOTEAPONT").val("")
		$("#RELLOTEPREV").val("")
	
		Swal.fire({
			icon: 'error',
			title: '<strong>Não foi possível encontrar dados!</strong>',
			text: 'Verifique se existe algum lote deste produto disponível no local de estoque correto para baixa',
			allowOutsideClick : false,
			allowEscapeKey : false
		}).then(function(){window.location.href="#!"})

	}


}

function AddLote(e,chip){

	console.log(e)
	console.log(chip)

}

function RemoveLote(e,chip){

	console.log(e)
	console.log(chip)

}

function FiltraLote(e,chip){

	console.log(e)
	console.log(chip)

}

function CancelaApontLote(){

	Swal.fire({
		title: '<strong>Confirme o cancelamento</strong>',
		html: 'Ao cancelar <strong> TODOS </strong>os dados informados não serão limpos',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: '<strong>Sim, limpar preenchimento!</strong>',
		cancelButtonText: '<strong>Manter Preenchimento!</strong>',
		allowOutsideClick : false,
		allowEscapeKey : false,
	}).then(function(result){

		if (result.isConfirmed) {

			var seqBaixa = $("#LOTEAPONTAMENTO").attr("seqBaixa")

			$("#LINHA___"+seqBaixa).addClass("lotependente")

			$("#LISTALOTESAUX_APONT").find("input[id*='SEQAUXLOTE___']").filter(function(){return $(this).val()==seqBaixa}).parents('tr').find("input[id^='SELECIONADOAUXLOTE___']").val("N")
			$("#LISTALOTESAUX_APONT").find("input[id*='SEQAUXLOTE___']").filter(function(){return $(this).val()==seqBaixa}).parents('tr').find("input[id^='QTDAPONTAAUXLOTE']").val("0")
		
		
			window.location.href="#!"
		
		}

	})

}

function ConcluirLote(){

	var seqBaixa = $("#LOTEAPONTAMENTO").attr("seqBaixa")

	if($("#RELLOTESELEC").val()!="" && $("#RELLOTESELEC").val()!=undefined && $("#RELLOTESELEC").val()!=null && Number($("#RELLOTESELEC").val())>0){

		$("#LINHA___"+seqBaixa).removeClass("lotependente")

	}
	else{

		$("#LINHA___"+seqBaixa).removeClass("lotependente")
		$("#LINHA___"+seqBaixa).addClass("lotependente")

	}

	window.location.href="#!"

}


function PesquisaTabela(tabela,valor){

	var pesquisa = $(valor).val();

	if(tabela.indexOf("PEND")==-1){

		var verifica = 0;

		var rows = $("#"+tabela).find("tbody").children()

		for(var i=0; i<rows.length; i++){

			verifica = 0;

			var cols = $(rows[i]).children("td")

			cols = cols == null || cols.length == 0 || cols==undefined || cols == "" ? $(rows[i]).find("td").children() : $(rows[i]).children("td");

			for(var j=0; j<cols.length; j++){

				var input = $(cols[j]).text()

				console.log(input)

				if(input.toUpperCase().indexOf(pesquisa.toUpperCase())!=-1){

					verifica=1;

				}

			}

			if(verifica==0){

				$(rows[i]).hide()

			}
			else{

				$(rows[i]).show()

			}

		}

	}
	else if(tabela=="PEND"){

		var verifica = 0;

		$(".COMPONENTESPEND").find(".ROWCOMPONENTE").hide("slow")
		
		$(".COMPONENTESPEND").find(".ROWCOMPONENTE").find("input").filter(function(){ return $(this).val().toUpperCase().indexOf(pesquisa.toUpperCase())!=-1 }).parents(".ROWCOMPONENTE").show("slow")

	}
	else if(tabela=="PENDPAPC"){

		var verifica = 0;

		$(".COMPONENTESPENDPAPC").find(".ROWCOMPONENTE").hide("slow")
		
		$(".COMPONENTESPENDPAPC").find(".ROWCOMPONENTE").find("input").filter(function(){ return $(this).val().toUpperCase().indexOf(pesquisa.toUpperCase())!=-1 }).parents(".ROWCOMPONENTE").show("slow")

	}

}

function filtrosRapidos(op,tabela){


	if(op==1 && tabela=="LISTABAIXAS"){
		$("#"+tabela).find('tbody').find("tr:not(.lotependente)").hide()
		$("#"+tabela).find('tbody').find("tr.lotependente").show()
	}
	else if(op==2 && tabela=="LISTABAIXAS"){
		$("#"+tabela).find('tbody').find("tr:not(.lotependente)").show()
		$("#"+tabela).find('tbody').find("tr.lotependente").hide()
	}
	else if(op==3 && tabela=="LISTABAIXAS"){

		$("#"+tabela).find('tbody').find("tr").show()

	}
	else if(op==1 && tabela=="RELATORIOPAPC"){

		$("#"+tabela).find('tbody').find("tr:not(.baixapendente)").hide()
		$("#"+tabela).find('tbody').find("tr.baixapendente").show()

	}
	else if(op==2 && tabela=="RELATORIOPAPC"){

		$("#"+tabela).find('tbody').find("tr:not(.baixapendente)").show()
		$("#"+tabela).find('tbody').find("tr.baixapendente").hide()

	}
	else if(op==3 && tabela=="RELATORIOPAPC"){

		$("#"+tabela).find('tbody').find("tr").show()

	}
	else if(op==1 && tabela=="RELATORIOAPONT"){

		$("#"+tabela).find('tbody').find("tr").hide()

		$("#"+tabela).find('tbody').find("tr").each(function(){

			var idlote = $(this).find('#IDLOTE').text()

			var totalLote = 0

			var saldoLote = retornaRegistroLote($("#LOTEAPONTAMENTO").attr("seqBaixa"),idlote)["SALDOFISICO2AUXLOTE"]

			$("#LISTALOTESAUX_APONT").find("input[id*='IDLOTEAUXLOTE___']").filter(function(){return $(this).val()==idlote}).parents('tr').find("input[id^='QTDAPONTAAUXLOTE___']").each(

				function(){
		
					totalLote += Number($(this).val())
		
				}
		
			)

			if( ( Number(saldoLote)-Number(totalLote) ) >= 0){

				$(this).show()

			}

		})

	}
	else if(op==2 && tabela=="RELATORIOAPONT"){

		$("#"+tabela).find('tbody').find("tr").hide()

		$("#"+tabela).find('tbody').find("tr").each(function(){

			var idlote = $(this).find('#IDLOTE').text()

			var totalLote = 0

			var saldoLote = retornaRegistroLote($("#LOTEAPONTAMENTO").attr("seqBaixa"),idlote)["SALDOFISICO2AUXLOTE"]

			$("#LISTALOTESAUX_APONT").find("input[id*='IDLOTEAUXLOTE___']").filter(function(){return $(this).val()==idlote}).parents('tr').find("input[id^='QTDAPONTAAUXLOTE___']").each(

				function(){
		
					totalLote += Number($(this).val())
		
				}
		
			)

			if( ( Number(saldoLote)-Number(totalLote) ) <= 0){

				$(this).show()

			}

		})

	}
	else if(op==3 && tabela=="RELATORIOAPONT"){

		$("#"+tabela).find('tbody').find("tr").show()

	}
	else if(op==1 && tabela=="PEND"){

		$(".COMPONENTESPEND").find(".ROWCOMPONENTE").hide("slow")

		$(".COMPONENTESPEND").find(".ROWCOMPONENTE.APONTAR").show("slow")

	}
	else if(op==2 && tabela=="PEND"){

		$(".COMPONENTESPEND").find(".ROWCOMPONENTE").hide("slow")

		$(".COMPONENTESPEND").find(".ROWCOMPONENTE.ALMOX").show("slow")

	}
	else if(op==3 && tabela=="PEND"){

		$(".COMPONENTESPEND").find(".ROWCOMPONENTE").hide("slow")

		$(".COMPONENTESPEND").find(".ROWCOMPONENTE.PCP").show("slow")

	}
	else if(op==4 && tabela=="PEND"){

		$(".COMPONENTESPEND").find(".ROWCOMPONENTE").hide("slow")

		$(".COMPONENTESPEND").find(".ROWCOMPONENTE.OUTROS").show("slow")

	}
	else if(op==5 && tabela=="PEND"){

		$(".COMPONENTESPEND").find(".ROWCOMPONENTE").show("slow")
	}
	else if(op==1 && tabela=="PENDPAPC"){

		$(".COMPONENTESPENDPAPC").find(".ROWCOMPONENTE").hide("slow")

		$(".COMPONENTESPENDPAPC").find(".ROWCOMPONENTE.APONTAR").show("slow")

	}
	else if(op==2 && tabela=="PENDPAPC"){

		$(".COMPONENTESPENDPAPC").find(".ROWCOMPONENTE").hide("slow")

		$(".COMPONENTESPENDPAPC").find(".ROWCOMPONENTE.ALMOX").show("slow")

	}
	else if(op==3 && tabela=="PENDPAPC"){

		$(".COMPONENTESPENDPAPC").find(".ROWCOMPONENTE").hide("slow")

		$(".COMPONENTESPENDPAPC").find(".ROWCOMPONENTE.PCP").show("slow")

	}
	else if(op==4 && tabela=="PENDPAPC"){

		$(".COMPONENTESPENDPAPC").find(".ROWCOMPONENTE").hide("slow")

		$(".COMPONENTESPENDPAPC").find(".ROWCOMPONENTE.OUTROS").show("slow")

	}
	else if(op==5 && tabela=="PENDPAPC"){

		$(".COMPONENTESPENDPAPC").find(".ROWCOMPONENTE").show("slow")
	}

}

function ExcluirRegistros(){

	if($("#LISTABAIXAS").find("tbody").find("input[type=checkbox]:checked").length<1){

		// EXIBE ALERTA DA CÓPIA
		var Toast = Swal.mixin({
			toast: true,
			position: 'center',
			showConfirmButton: false,
			timer: 2000,
			timerProgressBar: true,
		})
	
		Toast.fire({
			icon: 'error',
			title: 'Selecione pelo menos um registro!'
		})

	}
	else{

		$("#LISTABAIXAS").find("tbody").find("input[type=checkbox]:checked").each(

			function(){

				var input =  $(this).parents("tr").first()

				var id = $(input).children("td").eq(0).text()

				var tipo = $(input).attr("tipo")

				var row = $("#LISTABAIXASAUX_"+tipo).find("tbody").find("[id^='SEQAUX"+tipo+"___']").filter(function(){return $(this).val()==id}).parents('tr')

				LimpaTabelaLote(id)

				$(row).remove()

				$(input).hide('slow', function(){ $(input).remove(); });

			}

		)

		// EXIBE ALERTA DA CÓPIA
		var Toast = Swal.mixin({
			toast: true,
			position: 'center',
			showConfirmButton: false,
			timer: 2000,
			timerProgressBar: true,
		})
	
		Toast.fire({
			icon: 'success',
			title: 'Registros excluídos com sucesso!'
		})

	}



}

function ListaRelatorioPAPC(props){

	var baixapendente = props['PENDENTE'] == "1" ? "baixapendente" : "";

	var str = ' <tr class="'+baixapendente+'">'+
	' <td class="filtrar">'+props["ID"]+'</td>'+
	' <td class="filtrar">'+props["CODCCUSTO"]+'</td>'+
	' <td class="filtrar">'+props["CODORDEM"]+'</td>'+
	' <td class="filtrar">'+props["NUMEXEC"]+'</td>'+
	' <td class="filtrar">'+props["QUANTIDADE"]+'</td>'+
	' <td class="filtrar">'+props["CODESTRUTURA"]+'</td> '+ 
	' <td class="filtrar">'+props["NOMEFANTASIA1"]+'</td>'+
	' <td class="filtrar">'+props["CODIGOMP"]+'</td>'+
	' <td class="filtrar">'+props["NOMEFANTASIA2"]+'</td>'+
	' <td class="filtrar">'+props["QTDEMP"]+'</td>'+
	' <td class="filtrar">'+props["QTDMPFINAL"]+'</td>'+
	' <td class="filtrar">'+props["CODSUCATA"]+'</td> '+
	' <td class="filtrar">'+props["NOMEFANTASIA3"]+'</td>'+ 
	' <td class="filtrar">'+props["QTDESUCATA"]+'</td>'+
	' <td class="filtrar">'+props["QTDEAPONTADA"]+'</td>'+
	' </tr> '


	$('#RELATORIOPAPC').find('tbody').append(str)

}




function preenchePendComponentes(){

	var numOS = $("#CODPRJPEND").val()
	var codOrdem = $("#OPPEND").val()
	var exec = $("#EXECPEND").val()

	var c1 = DatasetFactory.createConstraint("NUM_OS",numOS,numOS,ConstraintType.MUST)
	var c2 = DatasetFactory.createConstraint("EXECUCAO",exec,exec,ConstraintType.MUST)
	var c3 = DatasetFactory.createConstraint("CODORDEM",codOrdem,codOrdem,ConstraintType.MUST)
	var c4 = DatasetFactory.createConstraint("PAPC","0","0",ConstraintType.MUST)
	var c4 = DatasetFactory.createConstraint("CATEGORIA","1","1",ConstraintType.MUST)
	
	// BUSCA E CARREGA A ESTRUTURA
	var constraints = new Array(c1,c2,c3,c4)
		
	// BUSCA E CARREGA A ESTRUTURA
	var dataset = DatasetFactory.getDataset("dsComponentesPendentes",null,constraints,null)
	var row = dataset.values

	if(row != null && row!="" && row!=undefined){

		$(".COMPONENTESPEND").empty()

		for(var i=0; i<row.length; i++){

			var seq = addLinhaComponentes()

			var rep = row[i]

			// $("#TITULOCOMP___"+seq).append("Ordem: "+rep['CODORDEM']+" &nbsp;&nbsp; Status da Ordem: "+rep['STATUS_OP']+" &nbsp;&nbsp; ID: "+rep['IDATVORDEM']+" &nbsp;&nbsp; Atividade: "+rep['DSCATIVIDADE']
			// +" &nbsp;&nbsp; Status da Atividade: "+rep['STATUS_ATV']+" &nbsp;&nbsp; Produto: "+rep['CODIGOPRD'] )

			$("#TEXTOCOMP___"+seq).children().append(rep['ACAO'].split("___")[0])

			$("#TITULOCOMP___"+seq).parents(".ROWCOMPONENTE").addClass(rep['ACAO'].split("___")[1])
			
			$("#CODORDEMCOMP___"+seq).val(rep['CODORDEM'])
			$("#STATUSOPCOMP___"+seq).val(rep['STATUS_OP'])
			$("#IDATVCOMP___"+seq).val(rep['IDATVORDEM'])
			$("#DESCATVCOMP___"+seq).val(rep['DSCATIVIDADE'])
			$("#STATUSATVCOMP___"+seq).val(rep['STATUS_ATV'])
			$("#CODIGOPRDCOMP___"+seq).val(rep['CODIGOPRD'])
			$("#DESCPRDCOMP___"+seq).val(rep['NOMEFANTASIA'])

		}

	}
	else{

		$(".COMPONENTESPEND").empty()

		var seq = addLinhaComponentes()
		$("#TITULOCOMP___"+seq).append("Este item não possui pendências relacionadas a apontamentos de componentes")
		$("#TITULOCOMP___"+seq).attr('style','height : 10% !important')
		$("#CODORDEMCOMP___"+seq).parent().parent().hide()
		$("#DESCPRDCOMP___"+seq).parent().parent().hide()

	}

}


function preenchePendComponentesPAPC(){

	myLoading.show()

	setTimeout(function(){

		var numOS = $("#CODPRJPENDPAPC").val()

		var c1 = DatasetFactory.createConstraint("NUM_OS",numOS,numOS,ConstraintType.MUST)
		var c2 = DatasetFactory.createConstraint("PAPC","1","1",ConstraintType.MUST)
		var c3 = DatasetFactory.createConstraint("CATEGORIA","1","1",ConstraintType.MUST)
		
		// BUSCA E CARREGA A ESTRUTURA
		var constraints = new Array(c1,c2,c3)
			
		// BUSCA E CARREGA A ESTRUTURA
		var dataset = DatasetFactory.getDataset("dsComponentesPendentes",null,constraints,null)
		var row = dataset.values

		if(row != null && row!="" && row!=undefined){

			$(".COMPONENTESPENDPAPC").empty()

			for(var i=0; i<row.length; i++){

				var seq = addLinhaComponentesPAPC()

				var rep = row[i]

				// $("#TITULOCOMP___"+seq).append("Ordem: "+rep['CODORDEM']+" &nbsp;&nbsp; Status da Ordem: "+rep['STATUS_OP']+" &nbsp;&nbsp; ID: "+rep['IDATVORDEM']+" &nbsp;&nbsp; Atividade: "+rep['DSCATIVIDADE']
				// +" &nbsp;&nbsp; Status da Atividade: "+rep['STATUS_ATV']+" &nbsp;&nbsp; Produto: "+rep['CODIGOPRD'] )

				$("#TEXTOCOMP___"+seq).children().append(rep['ACAO'].split("___")[0])

				$("#TITULOCOMP___"+seq).parents(".ROWCOMPONENTE").addClass(rep['ACAO'].split("___")[1])
				
				$("#CODORDEMCOMP___"+seq).val(rep['CODORDEM'])
				$("#STATUSOPCOMP___"+seq).val(rep['STATUS_OP'])
				$("#IDATVCOMP___"+seq).val(rep['IDATVORDEM'])
				$("#DESCATVCOMP___"+seq).val(rep['DSCATIVIDADE'])
				$("#STATUSATVCOMP___"+seq).val(rep['STATUS_ATV'])
				$("#CODIGOPRDCOMP___"+seq).val(rep['CODIGOPRD'])
				$("#DESCPRDCOMP___"+seq).val(rep['NOMEFANTASIA'])
				$("#NUMPLANOCOMP___"+seq).val(rep['NUMPLANOCORTE'])

			}

		}
		else{

			$(".COMPONENTESPENDPAPC").empty()

			var seq = addLinhaComponentesPAPC()
			$("#TITULOCOMP___"+seq).append("Este item não possui pendências relacionadas a apontamentos de componentes")
			$("#TITULOCOMP___"+seq).attr('style','height : 10% !important')
			$("#CODORDEMCOMP___"+seq).parent().parent().hide()
			$("#DESCPRDCOMP___"+seq).parent().parent().hide()

		}

		myLoading.hide()

	},1000)

}


function addLinhaComponentes(){

	var seq = $(".COMPONENTESPEND").children().length + 1

	var str = " <div class='ROWCOMPONENTE'> "+
	" <div class='panel panel-default'> "+
    "    <div class='row panel-heading' style='background-image: linear-gradient(white, white) !important;margin-left:0%;margin-right:0%;'> "+
    "        <h4 class='panel-title'> "+
    "            <a class='collapse-icon collapsed COMPONENTE' data-toggle='collapse' data-parent='#accordionApont' href='#TEXTOCOMP___"+seq+"' id='TITULOCOMP___"+seq+"' aria-expanded='false'> "+
	"				<div class='col-md-12'> "+
	"					<div class='col-md-2'>  "+
	"						<label class='info'>OP</label> "+
	"						<input type='text' readonly class='form-control' id='CODORDEMCOMP___"+seq+"' name='CODORDEMCOMP___"+seq+"' > "+
	"					</div> "+
	"					<div class='col-md-2'> "+
	"						<label class='info'>Status da OP</label> "+
	"						<input type='text' readonly  class='form-control' id='STATUSOPCOMP___"+seq+"' name='STATUSOP___"+seq+"' > "+
	"					</div> "+
	"					<div class='col-md-1'> "+
	"						<label class='info'>ID</label> "+
	"						<input type='text'  readonly class='form-control' id='IDATVCOMP___"+seq+"' name='IDATV___"+seq+"' > "+
	"					</div> "+
	"					<div class='col-md-2'> "+
	"						<label class='info'>Atividade</label> "+
	"						<input type='text'  readonly class='form-control' id='DESCATVCOMP___"+seq+"'  name='DESCATVCOMP___"+seq+"' > "+
	"					</div> "+
	"					<div class='col-md-3'> "+
	"						<label class='info'>Status Atv.</label> "+
	"						<input type='text'  readonly class='form-control' id='STATUSATVCOMP___"+seq+"' name='STATUSATVCOMP___"+seq+"' > "+
	"					</div> "+
	"					<div class='col-md-2 botao-collapse waves-effect' onclick='carregaModalLotes("+seq+")'> "+
	"						<label class='info'>Lotes do Produto</label> "+	
	"						<button><i class='fluigicon fluigicon-test-settings icon-xl'></i></button> "+
	"					</div> "+
	" 				</div> "+
	"				<div class='col-md-12'> "+
	"					<div class='col-md-5'> "+
	"						<label class='info'>Produto</label> "+
	"						<input type='text'  readonly class='form-control' id='CODIGOPRDCOMP___"+seq+"' name='CODIGOPRDCOMP___"+seq+"' > "+
	"					</div> "+
	"					<div class='col-md-5'> "+
	"						<label class='info'>Descrição</label> "+
	"						<input type='text' readonly class='form-control' id='DESCPRDCOMP___"+seq+"' name='DESCPRDCOMP___"+seq+"' > "+
	"					</div> "+
	"					<div class='col-md-2 botao-collapse waves-effect' onclick='AddApontAuto("+seq+")'> "+
	"						<label class='info'>Adicionar Produto</label> "+	
	"						<button><i class='flaticon flaticon-check-circle icon-xl'></i></button> "+
	"					</div> "+
	" 				</div> "+
    "            </a> "+
    "        </h4> "+
    "    </div> "+
    "    <div id='TEXTOCOMP___"+seq+"' aria-expanded='false' class='panel-collapse collapse'> "+
    "        <div class='panel-body' style='background-image: linear-gradient(white, white) !important;' > "+
    "        </div> "+
    "    </div> "+ 
	"  </div> "+
    " </div> "

	$(".COMPONENTESPEND").append(str)

	return seq;

}


function addLinhaComponentesPAPC(){

	var seq = $(".COMPONENTESPENDPAPC").children().length + 1

	var str = " <div class='ROWCOMPONENTE'> "+
	" <div class='panel panel-default'> "+
    "    <div class='row panel-heading' style='background-image: linear-gradient(white, white) !important;margin-left:0%;margin-right:0%;'> "+
    "        <h4 class='panel-title'> "+
    "            <a class='collapse-icon collapsed COMPONENTE' data-toggle='collapse' data-parent='#accordionApont' href='#TEXTOCOMP___"+seq+"' id='TITULOCOMP___"+seq+"' aria-expanded='false'> "+
	"				<div class='col-md-12'> "+
	"					<div class='col-md-2'>  "+
	"						<label class='info'>OP</label> "+
	"						<input type='text' readonly class='form-control' id='CODORDEMCOMP___"+seq+"' name='CODORDEMCOMP___"+seq+"' > "+
	"					</div> "+
	"					<div class='col-md-2'> "+
	"						<label class='info'>Status da OP</label> "+
	"						<input type='text' readonly  class='form-control' id='STATUSOPCOMP___"+seq+"' name='STATUSOP___"+seq+"' > "+
	"					</div> "+
	"					<div class='col-md-1'> "+
	"						<label class='info'>ID</label> "+
	"						<input type='text'  readonly class='form-control' id='IDATVCOMP___"+seq+"' name='IDATV___"+seq+"' > "+
	"					</div> "+
	"					<div class='col-md-2'> "+
	"						<label class='info'>Atividade</label> "+
	"						<input type='text'  readonly class='form-control' id='DESCATVCOMP___"+seq+"'  name='DESCATVCOMP___"+seq+"' > "+
	"					</div> "+
	"					<div class='col-md-3'> "+
	"						<label class='info'>Status Atv.</label> "+
	"						<input type='text'  readonly class='form-control' id='STATUSATVCOMP___"+seq+"' name='STATUSATVCOMP___"+seq+"' > "+
	"					</div> "+
	"					<div class='col-md-2 botao-collapse waves-effect' onclick='carregaModalLotes("+seq+")'> "+
	"						<label class='info'>Lotes do Produto</label> "+	
	"						<button><i class='fluigicon fluigicon-test-settings icon-xl'></i></button> "+
	"					</div> "+
	" 				</div> "+
	"				<div class='col-md-12'> "+
	"					<div class='col-md-5'> "+
	"						<label class='info'>Produto</label> "+
	"						<input type='text'  readonly class='form-control' id='CODIGOPRDCOMP___"+seq+"' name='CODIGOPRDCOMP___"+seq+"' > "+
	"					</div> "+
	"					<div class='col-md-5'> "+
	"						<label class='info'>Descrição</label> "+
	"						<input type='text' readonly class='form-control' id='DESCPRDCOMP___"+seq+"' name='DESCPRDCOMP___"+seq+"' > "+
	"						<input type='hidden' readonly class='form-control' id='NUMPLANOCOMP___"+seq+"' name='NUMPLANOCOMP___"+seq+"' > "+
	"					</div> "+
	"					<div class='col-md-2 botao-collapse waves-effect' onclick='AddApontPAPCAuto("+seq+")'> "+
	"						<label class='info'>Adicionar Produto</label> "+	
	"						<button><i class='flaticon flaticon-check-circle icon-xl'></i></button> "+
	"					</div> "+
	" 				</div> "+
    "            </a> "+
    "        </h4> "+
    "    </div> "+
    "    <div id='TEXTOCOMP___"+seq+"' aria-expanded='false' class='panel-collapse collapse'> "+
    "        <div class='panel-body' style='background-image: linear-gradient(white, white) !important;' > "+
    "        </div> "+
    "    </div> "+ 
	"  </div> "+
    " </div> "

	$(".COMPONENTESPENDPAPC").append(str)

	return seq;

}


function adicionaLinhaLote(){

	var seq = Number($("#LOTESBLANK").find("tbody").children().length) + 1;

	var str = '<tr> '+                                             
	'	<td> '+
	'		<input type="text" title="" onmouseover="mouse(this);" id="MODALLOTESID___'+seq+'" name="MODALLOTESID___'+seq+'" class="form-control filtrar" readonly> '+
	'	</td> '+
	'	<td> '+
	'		<input type="text" title="" onmouseover="mouse(this);" id="MODALLOTESNUMERO___'+seq+'" name="MODALLOTESNUMERO___'+seq+'" class="form-control filtrar" readonly> '+
	'	</td> '+
	'	<td> '+
	'		<input type="text" title="" onmouseover="mouse(this);" id="MODALLOTESSALDOTOTAL___'+seq+'" name="MODALLOTESSALDOTOTAL___'+seq+'" class="form-control filtrar" readonly> '+
	'	</td> '+
	'	<td> '+
	'		<input type="text" title="" onmouseover="mouse(this);" id="MODALLOTESSTATUS___'+seq+'" name="MODALLOTESSTATUS___'+seq+'" class="form-control filtrar" readonly> '+
	'	</td> '+
	'	<td> '+
	'		<input type="text" title="" onmouseover="mouse(this);" id="MODALLOTESLOCALDEESTOQUE___'+seq+'" name="MODALLOTESLOCALDEESTOQUE___'+seq+'" class="form-control filtrar" readonly> '+
	'	</td> '+
	'</tr> '

	$("#LOTESBLANK").find("tbody").append(str)

	return seq;

}


// VERIFICA SE A REGERAÇÃO DE SALDOS E CUSTOS ESTÁ SENDO FEITA
function regSaldosCustos(){

	console.log("vou verificar se a regeração de saldos e custos está sendo feita")

	var dia = new Date()
	
	console.log("dia: "+dia)
	
	console.log("vou formatar a data")
	
	//dia = formataDataDate(dia)
	var diaAux = formataDataBanco(dia)
	
	console.log("diaAux: "+diaAux)
	
	// MONTA O ARRAY DOS CONTEÚDOS DO SELECT
	var a1 = DatasetFactory.createConstraint("DIA",diaAux,diaAux,ConstraintType.MUST)
	
	var constraints = new Array(a1)
	
	var dataset = DatasetFactory.getDataset("dsVerificaRegSaldosCustos",null,constraints,null)
	var row = dataset.values
	
	// SE RETORNO NÃO É NULO OU VAZIO
	if(!(row=="" || row==null || row==undefined)){
		
		console.log("está gerando")
		
		return true
		
	} else {
		// SE NÃO	
		
		console.log("não está gerando")
		
		return false
		
	}
	
}

// PEGA A DATA DO FORMULÁRIO E SALVA EM FORMATO PARA BANCO
function formataDataBanco(strData){
    
	console.log("entrei na formataDataBanco")
	
	console.log("strData: "+strData)
	
	// ARRAY PARA PEGAR A STRING APENAS DO VALOR DA DATA
	var arrayString = strData.toString().split(" ")
	
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