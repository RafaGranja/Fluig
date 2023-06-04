// TRANSFORMA CONTEÚDO DO IMPUT EM CAIXA ALTA
function caixaAlta(obj){
	
	// SALVA O CONTEÚDO DO INPUT
	var cx = $(obj).val()
	
	// TRANSFORMA EM CAIXA ALTA
	var cx = cx.toUpperCase()
	
	// SALVA O CONTEÚDO EM CAIXA ALTA NO CAMPO INPUT
	$(obj).val(cx)
	
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
		
		negado = false
	
	} else {
		// SE NÃO
		
		console.log("row")
		console.log(row)
		
		var count = dataset.values.length
		
		// PERCORRE TODOS OS REGISTROS
		for(var i=0; i<count; i++){
		
			var rep = row[i]
			
			// SE É NÃO MANUFATURADO E TEM PROCESSO
			if( (rep["TIPODESENHO"]=="NAOMANUFATURADO" || rep["TIPODESENHO"]=="INDUSTRIALIZACAO")  && 
					!(rep["IDCRIACAOPROCESSO"]=="" || rep["IDCRIACAOPROCESSO"]==null || rep["IDCRIACAOPROCESSO"]==undefined || rep["IDCRIACAOPROCESSO"]=="null" ) 
					&& (rep["IDCRIACAOSALVOS"]=="" || rep["IDCRIACAOSALVOS"]==null || rep["IDCRIACAOSALVOS"]==undefined || rep["IDCRIACAOSALVOS"]=="null" ) ){
				
				negado = true
				
			} else {
				
				if(rep["IDCRIACAOSALVOS"]=="" || rep["IDCRIACAOSALVOS"]==null || rep["IDCRIACAOSALVOS"]=="null" || rep["IDCRIACAOSALVOS"]==undefined){
					
					negado = true
					
				}
				
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

// PERCORRE A VIEW DE PROCESSOS E VERIFICA SE EXISTE ALGUMA PRIORIDADE DUPLICADA
function prioridadeDuplicada(){
	
	var ret = false
	
	// PERCORRE A TABELA E COLETA TODOS OS REGISTROS
	$('input[id^="VIEWPRIORIDADE___"]').each(function(index, value){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var prioridade = $("#VIEWPRIORIDADE___"+seq).val()
		
		// PERCORRE A TABELA E COLETA TODOS OS REGISTROS
		$('input[id^="VIEWPRIORIDADE___"]').each(function(index, value){
		
			var seqAux = $(this).attr("id").split("___")[1]
		
			var prioridadeAux = $("#VIEWPRIORIDADE___"+seqAux).val()
	
			// SE NÃO É A MESMA ATIVIDADE
			if(!(seq==seqAux)){
				
				// SE TEM A MESMA PRIORIDADE
				if(prioridade==prioridadeAux){
					
					ret = true
					
				}
				
			}
			
		})
	
	})
	
	return ret
	
}

// SALVA OS COMPONENTES DA LISTA DE MATERIAIS
function salvaComponentesLista(){

	console.log("VOU SALVAR LISTA DOS MATERIAIS NA TABELA COMPONENTES")

	var numOS = $("#NUM_OS").val()
	
	var recmodifiedby = $("#SOLICITANTE").val()
	var reccreatedby = $("#SOLICITANTE").val()
	
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
				var c12 = DatasetFactory.createConstraint("RECCREATEDBY",reccreatedby,reccreatedby,ConstraintType.MUST);
				var c13 = DatasetFactory.createConstraint("RECMODIFIEDBY",recmodifiedby,recmodifiedby,ConstraintType.MUST);
				//var c12 = DatasetFactory.createConstraint("IDCOMPONENTES",idCompo,idComp,ConstraintType.MUST);
				
				var constraints = new Array(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13);
				
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
				var c12 = DatasetFactory.createConstraint("RECCREATEDBY",reccreatedby,reccreatedby,ConstraintType.MUST);
				var c13 = DatasetFactory.createConstraint("RECMODIFIEDBY",recmodifiedby,recmodifiedby,ConstraintType.MUST);
				//var c12 = DatasetFactory.createConstraint("IDCOMPONENTES",idCompo,idComp,ConstraintType.MUST);
				
				var constraints = new Array(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13);
				
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
				var c12 = DatasetFactory.createConstraint("RECCREATEDBY",reccreatedby,reccreatedby,ConstraintType.MUST);
				var c13 = DatasetFactory.createConstraint("RECMODIFIEDBY",recmodifiedby,recmodifiedby,ConstraintType.MUST);
				//var c12 = DatasetFactory.createConstraint("IDCOMPONENTES",idCompo,idComp,ConstraintType.MUST);
				
				var constraints = new Array(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13);
				
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
				var c12 = DatasetFactory.createConstraint("RECCREATEDBY",reccreatedby,reccreatedby,ConstraintType.MUST);
				var c13 = DatasetFactory.createConstraint("RECMODIFIEDBY",recmodifiedby,recmodifiedby,ConstraintType.MUST);
				//var c12 = DatasetFactory.createConstraint("IDCOMPONENTES",idCompo,idComp,ConstraintType.MUST);
				
				var constraints = new Array(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13);
				
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
				var c12 = DatasetFactory.createConstraint("RECCREATEDBY",reccreatedby,reccreatedby,ConstraintType.MUST);
				var c13 = DatasetFactory.createConstraint("RECMODIFIEDBY",recmodifiedby,recmodifiedby,ConstraintType.MUST);
				//var c12 = DatasetFactory.createConstraint("IDCOMPONENTES",idCompo,idComp,ConstraintType.MUST);
				
				var constraints = new Array(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13);
				
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
				var c12 = DatasetFactory.createConstraint("RECCREATEDBY",reccreatedby,reccreatedby,ConstraintType.MUST);
				var c13 = DatasetFactory.createConstraint("RECMODIFIEDBY",recmodifiedby,recmodifiedby,ConstraintType.MUST);
				//var c12 = DatasetFactory.createConstraint("IDCOMPONENTES",idCompo,idComp,ConstraintType.MUST);
				
				var constraints = new Array(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13);
				
				dataset = DatasetFactory.getDataset("dsInsertItemComponentesOS",null,constraints,null);
				
			}
			
		}
		
	}

}

// CONTA OS CARACETRES DO TEXTAREA E ATUALIZA O SPAN
function contaCaracteres(obj){
	
	console.log("vou contar os caracteres da descrição do processo")
	
	var limite = 3999
	var caracteresDigitados = $(this).val().length     
	caracteresDigitados = parseInt(caracteresDigitados)
	
	console.log("caracteres digitados: "+caracteresDigitados)
	
	var caracteresRestantes = limite - caracteresDigitados  
	
	console.log("caracteresRestantes: "+caracteresRestantes)
	
	$("#VIEWSPANCONTCARAC___"+seq).parent("span").text("Restam "+caracteresRestantes+" caracteres")
	
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

//VERIFICA SE O CODIGO DA DE TAREFA DA MANUFATURA JA FOI SELECIONADO EM OUTRO ITEM
function verificaCodTarefa(codtrfpai){

	var ret = true;

	var os = $("#NUM_OS").val()

	var a1 = DatasetFactory.createConstraint("OS",os,os,ConstraintType.MUST)

	var constraints = new Array(a1);

	var dataset = DatasetFactory.getDataset("dsVerificaCodTrfPai",null,constraints,null);

	var rows = dataset.values

	var count = rows.length;

	if(count > 0){

		for(var i=0;i<count;i++){

			var rep = rows[i]
			
			if(rep["CODTRFPAI"]==codtrfpai){

				ret = false;
				break;

			}

		}


	}

	return ret;

}

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
	$("#F_PESOUNITARIO").val("")
	$("#F_PESOUNLIQUIDO").val("")
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
	$("#VALOR_RADIO4").val("")
	$("#F_SEQ").val("")
	$("#F_AREASECAO").val("")
	$("#F_ALTURA").val("")
	$("#F_LARGURAABA").val("")
	$("#F_ESPALMA").val("")
	$("#F_ESPABA").val("")
	
	//$("#F_CODIGOTAREFA>option").remove()
	$("#F_CODIGOTAREFA").val("")
	$("#F_CODTRFITEM").val("")
	$("#F_IDTRFITEM").val("")
	$("#F_NOMETRFITEM").val("")
	
	//$("#CHECK_MATERIAL").prop("checked",false)
	
	// TIRA A SELEÇÃO DO CAMPO RADIO 1
	$("#RAD2_ACABADO").prop("checked",false)
	$("#RAD2_SEMI").prop("checked",false)
	$("#RAD2_NAOMANUF").prop("checked",false)
	$("#RAD2_INDUSTR").prop("checked",false)
	$("#RAD4_DESENHO").prop("checked",false)
	$("#RAD4_PESOUN").prop("checked",false)
	
}

// LIMPA OS CAMPOS DO FORMULÁRIO
function limparForm() {
	
	//console.log("Entrei para limpar formulário")
	
	// LIMPA OS CAMPOS DO FORMULÁRIO
	//$("#F_TITULOITEM").val("")
	//$("#F_MATERIAL_ZOOM>option").remove();
	//$("#F_NOVOMATERIAL").val("")
	//$("#F_IDMATERIAL").val("")
	//$("#F_CODIGOPRD").val("")
	//$("#F_CATEGORIA").val("")
	//$("#F_QUANTIDADEMATERIAL").val("")
	//$("#F_POSICAOCOMPLETA").val("")
	$("#F_NUMDOCDELP").val("")
	$("#F_REVISAODOCDELP").val("")
	$("#F_OS").val("")
	$("#F_DATAREVISAO").val("")
	$("#F_OBSERVACOESDESENHO").val("")
	$("#F_PESOUNITARIO").val("")
	$("#F_PESOUNLIQUIDO").val("")
	$("#F_PESOBRUTO").val("")
	$("#F_PESOLIQUIDO").val("")
	$("#F_AREAPINTURA").val("")
	$("#F_PERIMETROCORTE").val("")
	$("#F_OBSPROCESSO").val("")
	$("#F_OBSGERAL").val("")
	$("#F_NIVEL").val("")
	$("#F_UNDMEDIDA").val("")
	$("#F_POSICAOINDICE").val("")
	$("#F_INDICEANTIGO").val("")
	$("#F_POSICAODESENHO").val("")
	$("#F_NUMDBI").val("")
	$("#F_REVISAODBI").val("")
	$("#F_NUMDESENHO").val("")
	$("#F_REVISAODESENHO").val("")
	$("#F_DESQTDE").val("")
	$("#F_TOTALQTDE").val("")
	$("#F_DESCRICAO").val("")
	$("#F_BITOLA").val("")
	$("#F_ESPESSURA").val("")
	$("#F_LARGURA").val("")
	$("#F_MASSALINEAR").val("")
	$("#F_DIAMETROEXTERNO").val("")
	$("#F_DIAMETROINTERNO").val("")
	$("#F_DIAMETROEXTERNODISCO").val("")
	$("#F_DIAMETROINTERNODISCO").val("")
	$("#F_ESPROSCA").val("")
	$("#F_COMPRIMENTO").val("")
	$("#F_MATERIAL").val("")
	$("#F_PRODUTO_RM").val("")
	$("#F_IDPRD").val("")
	$("#F_CODIGOPRD").val("")
	$("#F_IDCRIACAO").val("")
	$("#F_OBSERVACOESDESENHO").val("")
	$("#VALOR_RADIO1").val("")
	$("#VALOR_RADIO2").val("")
	$("#VALOR_RADIO4").val("")
	$("#F_SEQ").val("")
	$("#F_AREASECAO").val("")
	$("#F_ALTURA").val("")
	$("#F_LARGURAABA").val("")
	$("#F_ESPALMA").val("")
	$("#F_ESPABA").val("")
	//$("#F_CODIGOTAREFA>option").remove()
	$("#F_CODIGOTAREFA").val("")
	$("#F_CODTRFITEM").val("")
	$("#F_IDTRFITEM").val("")
	$("#F_NOMETRFITEM").val("")
	
	// LIMPA TODO O CONTEÚDO DA TABELA DE COMPONENTES
	limparTabelaComponentes()
	
	// LIMPA TODO O CONTEÚDO DA TABELA DE COMPONENTES
	limparTabelaProcessos()
	
	//$("#F_CHECK_MATERIAL").prop("checked",false)
	
	console.log("vou limpar os campos radio")
	
	// TIRA A SELEÇÃO DO CAMPO RADIO 1
	$("#RAD2_ACABADO").prop("checked",false)
	$("#RAD2_SEMI").prop("checked",false)
	$("#RAD2_NAOMANUF").prop("checked",false)
	$("#RAD2_INDUSTR").prop("checked",false)
	$("#RAD4_DESENHO").prop("checked",false)
	$("#RAD4_PESOUN").prop("checked",false)
	
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

// SE TEM ALGUM ITEM PAI SEM CÓDIGO DA TAREFA
function temPaiSemCodTrf(){

	var str = ""
	var ret = true
	
	var numOS = $("#NUM_OS").val()
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
	var constraints = new Array(c1);
	
	var dataset = DatasetFactory.getDataset("dsVerificaCodTrfPai",null,constraints,null);
	var row = dataset.values
	
	// SE RETORNO NÃO É NULO OU VAZIO	
	if(!(row=="" || row==null || row==undefined || row=="null")){
		
		// PERCORRE TODOS OS ITENS DO RETORNO
		for(var i=0; i<row.length; i++){
			
			var rep = row[i]
			
			// SE ITEM É UM PAI E NÃO TEM CÓDIGO DE TAREFA INFORMADO
			if((rep["CODTRFPAI"]=="" || rep["CODTRFPAI"]==null || rep["CODTRFPAI"]=="null" || rep["CODTRFPAI"]==undefined)){
				
				ret = false
				
			}
			
		}
		
		// SE STRING FOI PREENCHIDO 
		if(!ret){
			
			// EXIBE ALERTA
			Swal.fire({
				  icon:  'error',
				  title: 'Há itens Pai que não possuem o código da tarefa',
				  text: 'Verifique e tente novamente'
			})
			
			return true
			
			
		} else {
			// SE NÃO
			
			return false
			
		}
		
	} else {
		// SE NÃO
		
		return false
		
	}
	
}

// VERIFICA SE TEM ALGUM ITEM SEM CÓDIGO DE TAREFA
function temItemSemCodTrf(){

	var str = ""
	var ret = true
	
	var numOS = $("#NUM_OS").val()
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
	var constraints = new Array(c1);
	
	var dataset = DatasetFactory.getDataset("dsVerificaCodTrfItem",null,constraints,null);
	var row = dataset.values
	
	// SE RETORNO NÃO É NULO OU VAZIO	
	if(!(row=="" || row==null || row==undefined || row=="null")){
		
		// PERCORRE TODOS OS ITENS DO RETORNO
		for(var i=0; i<row.length; i++){
			
			var rep = row[i]
			
			// SE É O ÚLTIMO ITEM
			if(i+1==row.length){
			
				str = str + rep["INDICE"]
				
			} else {
				// SE NÃO 
				
				str = str + rep["INDICE"]+", "
				
			}
			
		}
		
		// EXIBE ALERTA
		Swal.fire({
			  icon:  'error',
			  title: 'Há itens que não possuem o Código da Tarefa Preliminar',
			  text: 'Verifique: '+str
		})
			
		return true
		
	} else {
		// SE NÃO
		
		return false
		
	}
	
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
				title: 'Foram identificados alguns itens "Não Manufaturado" ou "Industrializados" que possuem filhos cadastrados',
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
	
	console.log("vou verificar se item é não manufaturado")
	
	var numOS = $("#NUM_OS").val()
	
	console.log("OS: "+numOS+", indice: "+indice)
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("INDICE",indice,indice,ConstraintType.MUST);
	var constraints = new Array(c1,c2);
	
	var dataset = DatasetFactory.getDataset("dsItemNaoManufaturadoOS",null,constraints,null);
	
	// QUANTIDADE DE REGISTROS DA CONSULTA
	var row = dataset.values;
	
	console.log("row")
	console.log(row)
	
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
	
	// SE TEM FALHA NA INDEXAÇÃO
	if(temFalhaIndexacao(numOS)){
		
		// ESCONDE O CORPO DO FORMULÁRIO
		$(".panel-body").hide()
		
	} else {
		// SE NÃO
		
		// MOSTRA O CORPO DO FORMULÁRIO
		$(".panel-body").show()
	
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
			
			/*
			// CRIA E RETORNA UM ARRAY COM AS POSIÇÕES PARA A ESTRUTURA
			var indices = arrayIndices(row,count)
			
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

			var coresOrd = coresOrdenadas("")
			
			// SE TEM ALGUM ITEM QUE ESTÁ SENDO DETALHADO
			if(temItemDetalhado()){
				
				console.log("vou montar o croqui sem operações")
				
				// MONTA O CROQUI COM OS DADOS INSERIDOS NA TABELA SEM OFERECER A OPÇÃO DE ALTERAÇÕES
				//montarCroquiSemOperacoesNivel(sumario,arrayIdCriacao,indicesOrdenados,niveis,idCriacao,coresOrd)
				montarCroquiSemOperacoesNivel(idCriacao,row,coresOrd)
				
				// ESCONDE OS BOTÕES
				$(".BOTOES_CAB").hide()
				$("#DIV_FINALIZAREDICAO").hide()
				
			} else {
				// SE NÃO, MONTA O CROQUI TRADICIONAL 
				
				console.log("vou montar o croqui com operações")
				
				// MONTA O CROQUI COM OS DADOS INSERIDOS NA TABELA
				montarCroquiNivel(idCriacao,row,coresOrd)
				
				// ESCONDE OS BOTÕES
				$(".BOTOES_CAB").show()
				//$("#DIV_FINALIZAREDICAO").show()
				
			}
			
			$("#TEXTOVIEW").show()
			
			//$(".CONFIRMARAFETADOS").hide()
			
			// PERCORRE TODOS OS ITENS DO CROQUI(VIEW) E IMPLEMENTA OS EXPANSORES
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
		
	}
	
	//$(".REDUZIRTODOS").show()
	//$(".EXPANDIRTODOS").hide()
			
}

// OPERAÇÃO PARA ATUALIZAR OS DADOS
/*function atualizarNivel(idCriacao) {
	
	//console.log("Entrei para atualizar a estrutura")
	
	var numOS = $("#NUM_OS").val()
	
	// SE TEM FALHA NA INDEXAÇÃO
	if(temFalhaIndexacao(numOS)){
		
		// ESCONDE O CORPO DO FORMULÁRIO
		$(".panel-body").hide()
		
	} else {
		// SE NÃO
		
		// MOSTRA O CORPO DO FORMULÁRIO
		$(".panel-body").show()
	
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
			var indices = arrayIndices(row,count)
			
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
			console.log(expansores)

			var coresOrd = coresOrdenadas("")
			
			// SE TEM ALGUM ITEM QUE ESTÁ SENDO DETALHADO
			if(temItemDetalhado()){
				
				console.log("vou montar o croqui sem operações")
				
				// MONTA O CROQUI COM OS DADOS INSERIDOS NA TABELA SEM OFERECER A OPÇÃO DE ALTERAÇÕES
				montarCroquiSemOperacoesNivel(sumario,arrayIdCriacao,indicesOrdenados,niveis,idCriacao,coresOrd)
				
				// ESCONDE OS BOTÕES
				$(".BOTOES_CAB").hide()
				$("#DIV_FINALIZAREDICAO").hide()
				
			} else {
				// SE NÃO, MONTA O CROQUI TRADICIONAL 
				
				console.log("vou montar o croqui com operações")
				
				// MONTA O CROQUI COM OS DADOS INSERIDOS NA TABELA
				montarCroquiNivel(sumario,arrayIdCriacao,indicesOrdenados,niveis,idCriacao,coresOrd)
				
				// ESCONDE OS BOTÕES
				$(".BOTOES_CAB").show()
				//$("#DIV_FINALIZAREDICAO").show()
				
			}
			
			$("#TEXTOVIEW").show()
			
			//$(".CONFIRMARAFETADOS").hide()
			
			// PERCORRE TODOS OS ITENS DO CROQUI(VIEW) E IMPLEMENTA OS EXPANSORES
			implementaExpansores(expansores, indicesOrdenados, arrayIdCriacao)
			
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
		
	}
			
}*/

// TEM FALHA NA INDEXAÇÃO DOS ITENS DA ESTRUTURA
function temFalhaIndexacao(numOS){
	
	console.log("verifica se tem falha na indexação dos itens da estrutura da OS "+numOS)
	
	// CONSULTA BANCO
	var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
	var constraints = new Array(a1);
	
	var dataset = DatasetFactory.getDataset("dsVerificaFalhaIndexacao",null,constraints,null);
	var row = dataset.values;
	
	console.log("row "+row)
	console.log(row)
	
	// SE RETORNO NÃO É NULO OU VAZIO
	if(!(row=="" || row==null || row==undefined)){
		
		console.log("tem falha")
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'warning',
			  title: 'A Estrutura não pode ser carregada pois existe falha na indexação da estrutura.',
			  text: 'Clique em Salvar e Editar depois e comunique a equipe de TI'
		})
		
		return true
		
	} else {
		
		console.log("não tem falha")
		
		return false
		
	}
	
}

// VERIFICA SE USUÁRIO ASSUMIU O PROCESSO
function usuarioAssumiuProcesso(numProcesso){
	
	console.log("vou verificar se usuário já assumiu o processo")
	
	// CONSULTA BANCO
	var a1 = DatasetFactory.createConstraint("NUMPROCESSO",numProcesso,numProcesso,ConstraintType.MUST);
	var constraints = new Array(a1);
	
	var dataset = DatasetFactory.getDataset("dsUsuarioAssumiuProcesso",null,constraints,null);
	
	// QUANTIDADE DE REGISTROS DA CONSULTA
	var row = dataset.values;
	
	console.log("row")
	console.log(row)
	
	// SE RETORNO NÃO É NULO OU VAZIO
	if(!(row=="" || row==undefined || row==null)){
		
		console.log("user não assumiu")
		
		return false
		
	} else {
		
		console.log("user assumiu")

		return true
		
	}
	
}

/*function atualizarNovo(){
	
	//console.log("Entrei para atualizar a estrutura")
	
	var numOS = $("#NUM_OS").val()
	
	// SE TEM FALHA NA INDEXAÇÃO
	if(temFalhaIndexacao(numOS)){
		
		// ESCONDE O CORPO DO FORMULÁRIO
		$(".panel-body").hide()
		
	} else {
		// SE NÃO
		
		// MOSTRA O CORPO DO FORMULÁRIO
		$(".panel-body").show()
		
		// CONSULTA BANCO
		var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
		var constraints = new Array(c1);
		
		//dataset = DatasetFactory.getDataset("dsBuscaEstruturaIntegrada",null,constraints,null);
		dataset = DatasetFactory.getDataset("dsBuscaEstrutura",null,constraints,null);
		
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
			var indices = arrayIndices(row,count)
			
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
			console.log(expansores)

			var coresOrd = coresOrdenadas("")
			
			// SE TEM ALGUM ITEM QUE ESTÁ SENDO DETALHADO
			if(temItemDetalhado()){
				
				console.log("vou montar o croqui sem operações")
				
				// MONTA O CROQUI COM OS DADOS INSERIDOS NA TABELA SEM OFERECER A OPÇÃO DE ALTERAÇÕES
				montarCroquiSemOperacoes(sumario,arrayIdCriacao,indicesOrdenados,niveis,coresOrd)
				
				// ESCONDE OS BOTÕES
				$(".BOTOES_CAB").hide()
				
			} else {
				// SE NÃO, MONTA O CROQUI TRADICIONAL 
				
				console.log("vou montar o croqui com operações")
				
				// MONTA O CROQUI COM OS DADOS INSERIDOS NA TABELA
				montarCroqui(sumario,arrayIdCriacao,indicesOrdenados,niveis,coresOrd)
				
				// ESCONDE OS BOTÕES
				$(".BOTOES_CAB").show()
				
			}
			
			$(".SOLABERTAS").show()
			$("#TEXTOVIEW").show()
			
			// PERCORRE TODOS OS ITENS DO CROQUI(VIEW) E IMPLEMENTA OS EXPANSORES
			implementaExpansores(expansores, indicesOrdenados, arrayIdCriacao)
			
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
				
				//$('.croqui').append('<span class="os" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="mudarOS()"><strong>OS '+os+'</strong></span>&nbsp; - &nbsp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirTarefa()"><strong>Incluir Tarefa</strong></span></span><br><br><a id="INCLUIRPAI_LINK" href="#abrirModalIndice"><span class="click" onclick="incluirPai();" title="Incluir primeiro item" id="INCLUIRPAI_ITEM" name="INCLUIRPAI_ITEM"><i onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" class="fluigicon fluigicon-plus-sign icon-md"></i></span></a>')
				$('.croqui').append('<span class="os" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="mudarOS()"><strong>OS '+os+'</strong></span><br><br><a id="INCLUIRPAI_LINK" href="#abrirModalIndice"><span class="click" onclick="incluirPai();" title="Incluir primeiro item" id="INCLUIRPAI_ITEM" name="INCLUIRPAI_ITEM"><i onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" class="fluigicon fluigicon-plus-sign icon-md"></i></span></a>')
				
			} else {
				
				//$('.croqui').append('<span class="os" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="mudarOS()"><strong>OS '+os+'</strong></span>&nbsp; - &nbsp; <span class="tarefa" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirTarefa()"><strong>Cód. Tarefa: '+codTarefa+'</strong></span></span><br><br><a id="INCLUIRPAI_LINK" href="#abrirModalIndice"><span class="click" onclick="incluirPai();" title="Incluir primeiro item" id="INCLUIRPAI_ITEM" name="INCLUIRPAI_ITEM"><i onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" class="fluigicon fluigicon-plus-sign icon-md"></i></span></a>')
				$('.croqui').append('<span class="os" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="mudarOS()"><strong>OS '+os+'</strong></span><br><br><a id="INCLUIRPAI_LINK" href="#abrirModalIndice"><span class="click" onclick="incluirPai();" title="Incluir primeiro item" id="INCLUIRPAI_ITEM" name="INCLUIRPAI_ITEM"><i onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" class="fluigicon fluigicon-plus-sign icon-md"></i></span></a>')
				
			}

		}
		
	}
	
}*/

function atualizarNovo(){
	
	//console.log("Entrei para atualizar a estrutura")
	
	var numOS = $("#NUM_OS").val()
	
	// SE TEM FALHA NA INDEXAÇÃO
	if(temFalhaIndexacao(numOS)){
		
		// ESCONDE O CORPO DO FORMULÁRIO
		$(".panel-body").hide()
		
	} else {
		// SE NÃO
		
		// MOSTRA O CORPO DO FORMULÁRIO
		$(".panel-body").show()
		
		// CONSULTA BANCO
		var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
		var constraints = new Array(c1);
		
		//dataset = DatasetFactory.getDataset("dsBuscaEstruturaIntegrada",null,constraints,null);
		var dataset = DatasetFactory.getDataset("dsBuscaEstrutura",null,constraints,null);
		
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

			var coresOrd = coresOrdenadas("")
			
			// SE TEM ALGUM ITEM QUE ESTÁ SENDO DETALHADO
			if(temItemDetalhado()){
				
				console.log("vou montar o croqui sem operações")
				
				// MONTA O CROQUI COM OS DADOS INSERIDOS NA TABELA SEM OFERECER A OPÇÃO DE ALTERAÇÕES
				montarCroquiSemOperacoes(row,coresOrd)
				
				// ESCONDE OS BOTÕES
				$(".BOTOES_CAB").hide()
				
			} else {
				// SE NÃO, MONTA O CROQUI TRADICIONAL 
				
				console.log("vou montar o croqui com operações")
				
				// MONTA O CROQUI COM OS DADOS INSERIDOS NA TABELA
				montarCroqui(row,coresOrd)
				
				// ESCONDE OS BOTÕES
				$(".BOTOES_CAB").show()
				
			}
			
			$(".SOLABERTAS").show()
			$("#TEXTOVIEW").show()
			
			// PERCORRE TODOS OS ITENS DO CROQUI(VIEW) E IMPLEMENTA OS EXPANSORES
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
				
				//$('.croqui').append('<span class="os" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="mudarOS()"><strong>OS '+os+'</strong></span>&nbsp; - &nbsp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirTarefa()"><strong>Incluir Tarefa</strong></span></span><br><br><a id="INCLUIRPAI_LINK" href="#abrirModalIndice"><span class="click" onclick="incluirPai();" title="Incluir primeiro item" id="INCLUIRPAI_ITEM" name="INCLUIRPAI_ITEM"><i onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" class="fluigicon fluigicon-plus-sign icon-md"></i></span></a>')
				$('.croqui').append('<span class="os" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="mudarOS()"><strong>OS '+os+'</strong></span><br><br><a id="INCLUIRPAI_LINK" href="#abrirModalIndice"><span class="click" onclick="incluirPai();" title="Incluir primeiro item" id="INCLUIRPAI_ITEM" name="INCLUIRPAI_ITEM"><i onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" class="fluigicon fluigicon-plus-sign icon-md"></i></span></a>')
				
			} else {
				
				//$('.croqui').append('<span class="os" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="mudarOS()"><strong>OS '+os+'</strong></span>&nbsp; - &nbsp; <span class="tarefa" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirTarefa()"><strong>Cód. Tarefa: '+codTarefa+'</strong></span></span><br><br><a id="INCLUIRPAI_LINK" href="#abrirModalIndice"><span class="click" onclick="incluirPai();" title="Incluir primeiro item" id="INCLUIRPAI_ITEM" name="INCLUIRPAI_ITEM"><i onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" class="fluigicon fluigicon-plus-sign icon-md"></i></span></a>')
				$('.croqui').append('<span class="os" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="mudarOS()"><strong>OS '+os+'</strong></span><br><br><a id="INCLUIRPAI_LINK" href="#abrirModalIndice"><span class="click" onclick="incluirPai();" title="Incluir primeiro item" id="INCLUIRPAI_ITEM" name="INCLUIRPAI_ITEM"><i onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" class="fluigicon fluigicon-plus-sign icon-md"></i></span></a>')
				
			}

		}
		
	}
	
	//$(".REDUZIRTODOS").show()
	//$(".EXPANDIRTODOS").hide()
	
}

// OPERAÇÃO PARA ATUALIZAR OS DADOS
function atualizar() {
	
	//console.log("Entrei para atualizar a estrutura")
	
	var numOS = $("#NUM_OS").val()
	
	// SE TEM FALHA NA INDEXAÇÃO
	if(temFalhaIndexacao(numOS)){
		
		// ESCONDE O CORPO DO FORMULÁRIO
		$(".panel-body").hide()
		
		
	} else {
		// SE NÃO
		
		// MOSTRA O CORPO DO FORMULÁRIO
		$(".panel-body").show()
		
		// CONSULTA BANCO
		var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
		var constraints = new Array(c1);
		
		//dataset = DatasetFactory.getDataset("dsBuscaEstruturaIntegrada",null,constraints,null);
		var dataset = DatasetFactory.getDataset("dsBuscaEstrutura",null,constraints,null);
		
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
				
			/*
			// CRIA E RETORNA UM ARRAY COM AS POSIÇÕES PARA A ESTRUTURA
			var indices = arrayIndices(row,count)
			
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
			console.log(expansores)
			*/
			
			var coresOrd = coresOrdenadas("")
			var atv = $("#ATIVIDADE").val();

			// SE É ATIVIDADE DE APROVAÇÃO
			if(atv=="14"){
				
				// MONTA O CROQUI COM OS DADOS INSERIDOS NA TABELA SEM OFERECER A OPÇÃO DE ALTERAÇÕES
				montarCroquiSemOperacoesAprov(row,coresOrd)
				
				// ESCONDE OS BOTÕES
				$(".BOTOES_CAB").hide()
				
			} else {
			// SE NÃO
				
				// SE TEM ALGUM ITEM QUE ESTÁ SENDO DETALHADO
				if(temItemDetalhado()){
					
					console.log("vou montar o croqui sem operações")
					
					// MONTA O CROQUI COM OS DADOS INSERIDOS NA TABELA SEM OFERECER A OPÇÃO DE ALTERAÇÕES
					//montarCroquiSemOperacoes(sumario,arrayIdCriacao,indicesOrdenados,niveis,coresOrd)
					montarCroquiSemOperacoes(row,coresOrd)
					
					// ESCONDE OS BOTÕES
					$(".BOTOES_CAB").hide()
					
				} else {
					// SE NÃO, MONTA O CROQUI TRADICIONAL 
					
					console.log("vou montar o croqui com operações")
					
					// MONTA O CROQUI COM OS DADOS INSERIDOS NA TABELA
					//montarCroqui(sumario,arrayIdCriacao,indicesOrdenados,niveis,coresOrd)
					montarCroqui(row,coresOrd)
					
					// ESCONDE OS BOTÕES
					$(".BOTOES_CAB").show()
					
				}
				
			}
			
			$(".SOLABERTAS").show()
			$("#TEXTOVIEW").show()
			
			// PERCORRE TODOS OS ITENS DO CROQUI(VIEW) E IMPLEMENTA OS EXPANSORES
			//implementaExpansores(expansores, indicesOrdenados, arrayIdCriacao)
			implementaExpansores(row)
			
			// FAZ A ALTERAÇÃO DO CÁLCULO DA QUANTIDADE TOTAL
			alteraDesQtdeGeral()
			
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
				
				//$('.croqui').append('<span class="os" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="mudarOS()"><strong>OS '+os+'</strong></span>&nbsp; - &nbsp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirTarefa()"><strong>Incluir Tarefa</strong></span></span><br><br><a id="INCLUIRPAI_LINK" href="#abrirModalIndice"><span class="click" onclick="incluirPai();" title="Incluir primeiro item" id="INCLUIRPAI_ITEM" name="INCLUIRPAI_ITEM"><i onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" class="fluigicon fluigicon-plus-sign icon-md"></i></span></a>')
				$('.croqui').append('<span class="os" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="mudarOS()"><strong>OS '+os+'</strong></span><br><br><a id="INCLUIRPAI_LINK" href="#abrirModalIndice"><span class="click" onclick="incluirPai();" title="Incluir primeiro item" id="INCLUIRPAI_ITEM" name="INCLUIRPAI_ITEM"><i onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" class="fluigicon fluigicon-plus-sign icon-md"></i></span></a>')
				
			} else {
				
				//$('.croqui').append('<span class="os" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="mudarOS()"><strong>OS '+os+'</strong></span>&nbsp; - &nbsp; <span class="tarefa" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirTarefa()"><strong>Cód. Tarefa: '+codTarefa+'</strong></span></span><br><br><a id="INCLUIRPAI_LINK" href="#abrirModalIndice"><span class="click" onclick="incluirPai();" title="Incluir primeiro item" id="INCLUIRPAI_ITEM" name="INCLUIRPAI_ITEM"><i onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" class="fluigicon fluigicon-plus-sign icon-md"></i></span></a>')
				$('.croqui').append('<span class="os" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="mudarOS()"><strong>OS '+os+'</strong></span><br><br><a id="INCLUIRPAI_LINK" href="#abrirModalIndice"><span class="click" onclick="incluirPai();" title="Incluir primeiro item" id="INCLUIRPAI_ITEM" name="INCLUIRPAI_ITEM"><i onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" class="fluigicon fluigicon-plus-sign icon-md"></i></span></a>')
				
			}

		}
		
	}
		
	//$(".REDUZIRTODOS").show()
	//$(".EXPANDIRTODOS").hide()
	
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

// CALCULA A QUANTIDADE TOTAL DO ITEM PAI
function calculaTotalQtdePai(){
	
	var qtde = $("#QTDE_INFO").val()
	var qtdeAlt = $("#QTDETOTAL_INFO").val()
	var execucoes = $("#EXECUCOES").val()
	var total = 0
	
	// SE A QUANTIDADE NÃO FOI INFORMADA
	/*if(qtde=="" || qtde==null || qtde==undefined){
		
		qtdeAlt = parseInt(qtdeAlt)
		
		total = qtdeAlt * execucoes
		
		$("#QTDETOTAL_INFO").val(total)
		
	} else {
		
		qtde = parseInt(qtde)
		
		total = qtde * execucoes
		
		$("#QTDETOTAL_INFO").val(total)
		
	}*/
	
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

// PERCORRE TODOS OS ITENS DA VIEW E IMPLEMENTA OS EXPANSORES
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
function salvaSolicitacaoTabelaAuxiliar(processoPai,solicitacao,numOS,indicePai){
	
	var a1 = DatasetFactory.createConstraint("PROCESSO",solicitacao,solicitacao,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("PROCESSOPAI",processoPai,processoPai,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	var a4 = DatasetFactory.createConstraint("INDICEPAI",indicePai,indicePai,ConstraintType.MUST)
	
	var constraints = new Array(a1,a2,a3,a4)
	
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
				
				var indicePai = ""
					
				// SE INDICE PAI FOI SALVO
				if(!(rep["INDICEPAI"]=="" || rep["INDICEPAI"]==null || rep["INDICEPAI"]==undefined)){
					
					indicePai = " - "+rep["INDICEPAI"]
					
				}
				
				// SE É O PRIMEIRO ITEM
				if(abertas==""){
					
					console.log("primeiro item")
				
					abertas = "<a href='"+parent.window.WCMAPI.serverURL+"/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID="+rep["PROCESSO"]+"' target='_blank' >"+rep["PROCESSO"]+""+indicePai+"</a> "
					
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

						abertas = abertas + ", "+"&nbsp;<a href='"+parent.window.WCMAPI.serverURL+"/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID="+rep["PROCESSO"]+"' target='_blank'>"+rep["PROCESSO"]+""+indicePai+"</a> "
					
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
		espaco = "&ensp;"
			
		// INCREMENTA A STRING DOS ESPAÇOS
		for(j=0;j<pontos;j++){
			
			espaco = ""+espaco+"&ensp;";
			
		}
		
	}
	console.log("espaços: "+espaco)
	return espaco;
	
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
		
		/*if(rep["NIVEL"]=="" || rep["NIVEL"]==null || rep["NIVEL"]==undefined || rep["NIVEL"]=="null"){
		
			return 1
		
		} else*/ if(rep["COMPORLISTA"]=="SIM"){
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
				
				  var myLoading2 = FLUIGC.loading(window);
					
				  myLoading2.show();
					
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
					salvaSolicitacaoTabelaAuxiliar(processoPai,solicitacao,numOS,indicePai)
					
					console.log("Solicitação: "+solicitacao)
					
					$("a#LINKSOLICITACAO").prop('href', parent.window.WCMAPI.serverURL+'/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID='+solicitacao);
					$("#LINKSOLICITACAO")[0].click();
					
					// ATUALIZA CAMPO DETALHADO DO ITEM
					atualizaDetalhado(idCriacao)
					
					setTimeout(function(){
						
						// ATUALIZA O CROQUI
						atualizar()
						
					},200)
					
				},500)
				
				// DESATIVA O LOAD
				setTimeout(function(){
						
					myLoading2.hide();
						
				}, 500)
				
			  }
			  
		})
		
	} else {
		// SE NÃO, EXIBE ALERTA
		
		// SE ITEM JÁ TEM FILHO NA ESTRUTURA
		/*if(op==1){
		
			//Este item já tem um filho na estrutura e não pode ser cadastrado em outra solicitação
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'Este item não pode ser cadastrado em outra solicitação',
				  text: 'Verifique e tente novamente.'
			})
			
		}*/
		
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
/*function montarCroquiSemOperacoesNivel(sumario,arrayIdCriacao,indicesOrdenados,niveis,idCriacao,coresOrd){
	
	// VARIÁVEL PARA CONTROLAR SE A TABELA ESTÁ VAZIA
	var tabela = $("#TABELA").val()
	
	// BUSCA O ÍNDICE DA ESTRUTURA DE ACORDO COM O IDCRIACAO 
	var indicePaiNivel = buscaIndiceEstrutura(idCriacao)
	
		
		var os = $("#OS_INFO").val()
		var codTarefa = $("#CODIGOTAREFA").val()

		// CRIA O CROQUI DA ESTRUTURA DE ACORDO COM AS POSIÇÕES CADASTRADAS
		for(i=0;i<sumario.length;i++){
			
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
			
			// SE É O PRIMEIRO ITEM DO CROQUI
			if(pontos==pontosPai){  
			
				// SE A POSIÇÃO TEM FILHO
				if(temFilho){
					
					//$('.divCroqui').append('<br><div id="SPAN'+indexIndice+'" class="'+indexNivel+'"><span><i class="fluigicon fluigicon-plus-circle icon-xs EXPANDIR" onclick="expandir(\''+indexIndice+'\','+arrayIdCriacao[i]+')" id="EXPANDIR'+indexIndice+'"></i><i class="fluigicon fluigicon-minus-circle icon-xs REDUZIR" onclick="reduzir(\''+indexIndice+'\','+arrayIdCriacao[i]+')" id="REDUZIR'+indexIndice+'"></i></span>&ensp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheForm('+arrayIdCriacao[i]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs"></i></span>&ensp;<span id="SPANINTERNO'+indexIndice+'" class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheCab('+arrayIdCriacao[i]+');preencheFormSemView('+arrayIdCriacao[i]+');colocaSelecao(this)"><strong>'+sumario[i]+'</strong></span>&emsp;&emsp;<span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="iniciarSolicitacao('+arrayIdCriacao[i]+')" id="SUBCONJUNTO_LINK" name="SUBCONJUNTO_LINK" title="Cadastrar esse subconjunto em outra solicitação"><i class="fluigicon fluigicon-export icon-sm"></i></span></div>')
					$('#SPAN'+indexIndicePai+'').append('<br><div id="SPAN'+indexIndice+'" class="'+indexNivel+'"><span><i class="fluigicon fluigicon-plus-circle icon-xs EXPANDIR" onclick="expandir(\''+indexIndice+'\','+arrayIdCriacao[i]+')" id="EXPANDIR'+indexIndice+'"></i><i class="fluigicon fluigicon-minus-circle icon-xs REDUZIR" onclick="reduzir(\''+indexIndice+'\','+arrayIdCriacao[i]+')" id="REDUZIR'+indexIndice+'"></i></span>&ensp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheForm('+arrayIdCriacao[i]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs" '+coresOrd[i]+'></i></span>&ensp;<span id="SPANINTERNO'+indexIndice+'" class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheCab('+arrayIdCriacao[i]+');preencheFormSemView('+arrayIdCriacao[i]+');colocaSelecao(this)"><strong>'+sumario[i]+'</strong></span>&emsp;&emsp;<span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="iniciarSolicitacao('+arrayIdCriacao[i]+')" id="SUBCONJUNTO_LINK" name="SUBCONJUNTO_LINK" title="Editar esse subconjunto em outra solicitação"><i class="fluigicon fluigicon-export icon-sm"></i></span></div>')
					
				} else {
					// SE NÃO TEM FILHO
					
					//$('.divCroqui').append('<br><div id="SPAN'+indexIndice+'" class="'+indexNivel+'"><span>&emsp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)"  onclick="preencheForm('+arrayIdCriacao[i]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs"></i></span>&ensp;<span class="click" id="SPANINTERNO'+indexIndice+'" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheCab('+arrayIdCriacao[i]+');preencheFormSemView('+arrayIdCriacao[i]+');colocaSelecao(this)" ><strong>'+sumario[i]+'</strong></span></span>&emsp;&emsp;<span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="iniciarSolicitacao('+arrayIdCriacao[i]+')" id="SUBCONJUNTO_LINK" name="SUBCONJUNTO_LINK" title="Cadastrar esse subconjunto em outra solicitação"><i class="fluigicon fluigicon-export icon-sm"></i></span></div>')
					
				}
				
			}
			
			// SE NÃO É O PRIMEIRO ITEM
			if(pontos>0) {

				// SE ITEM TEM FILHO
				if(temFilho){
					
					$('#SPAN'+indexNivel+'').append('<div id="SPAN'+indexIndice+'" class="SPAN'+indexNivel+'"><span>'+espaco+'</span><span><i class="fluigicon fluigicon-plus-circle icon-xs EXPANDIR" onclick="expandir(\''+indexIndice+'\','+arrayIdCriacao[i]+')" id="EXPANDIR'+indexIndice+'"></i><i class="fluigicon fluigicon-minus-circle icon-xs REDUZIR" onclick="reduzir(\''+indexIndice+'\','+arrayIdCriacao[i]+')" id="REDUZIR'+indexIndice+'"></i></span>&ensp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheForm('+arrayIdCriacao[i]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs" '+coresOrd[i]+'></i></span>&ensp;<span id="SPANINTERNO'+indexIndice+'" class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheCab('+arrayIdCriacao[i]+');preencheFormSemView('+arrayIdCriacao[i]+');colocaSelecao(this)"><strong>'+sumario[i]+'</strong></span>&emsp;&emsp;<span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="iniciarSolicitacao('+arrayIdCriacao[i]+')" id="SUBCONJUNTO_LINK" name="SUBCONJUNTO_LINK" title="Editar esse subconjunto em outra solicitação"><i class="fluigicon fluigicon-export icon-sm"></i></span></div>')
					
				} else {
					
					$('#SPAN'+indexNivel+'').append('<div id="SPAN'+indexIndice+'" class="SPAN'+indexNivel+'"><span>'+espaco+'&emsp;&ensp;</span><span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheForm('+arrayIdCriacao[i]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs" '+coresOrd[i]+'></i></span>&ensp;<span id="SPANINTERNO'+indexIndice+'" class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheCab('+arrayIdCriacao[i]+');preencheFormSemView('+arrayIdCriacao[i]+');colocaSelecao(this)"><strong>'+sumario[i]+'</strong></span>&emsp;&emsp;<span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="iniciarSolicitacao('+arrayIdCriacao[i]+')" id="SUBCONJUNTO_LINK" name="SUBCONJUNTO_LINK" title="Editar esse subconjunto em outra solicitação"><i class="fluigicon fluigicon-export icon-sm"></i></span></div>')
					
				}
				
			}
			
			//console.log("finalizei o for de i: "+i)
			
		}
		
		//console.log("Finalizei a função montarCroqui")
		
	//}
	
	// ESCONDER SPAN REDUZIR
	$(".EXPANDIR").hide()
	
}*/

// MONTA O CROQUI COM OS DADOS INSERIDOS NA TABELA SEM OFERECER A OPÇÃO DE ALTERAÇÕES
function montarCroquiSemOperacoesNivel(idCriacao,row,coresOrd){
	
	// VARIÁVEL PARA CONTROLAR SE A TABELA ESTÁ VAZIA
	var tabela = $("#TABELA").val()
	
	// BUSCA O ÍNDICE DA ESTRUTURA DE ACORDO COM O IDCRIACAO 
	var indicePaiNivel = buscaIndiceEstrutura(idCriacao)
	
		var os = $("#OS_INFO").val()
		var codTarefa = $("#CODIGOTAREFA").val()

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
			var indexNivel = row[i]["NIVEL"]
			
			indexNivel = indexNivel.replace(/\./g,"P")
			console.log("indexNivel: "+indexNivel)
			
			var convert = row[i]["INDICE"].toString()
			
			// ACRESCENTEI ESSA LINHA (SOLICITAÇÃO 1831)
			var indexIndice = convert.replace(/\./g,"P")
			
			console.log("indexIndice: "+indexIndice)
			
			var temFilho = idTemFilhoRow(string,row,0)
			
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
			
			// SE É O PRIMEIRO ITEM DO CROQUI
			if(pontos==pontosPai){  
			
				// SE A POSIÇÃO TEM FILHO
				if(temFilho){
					
					//$('.divCroqui').append('<br><div id="SPAN'+indexIndice+'" class="'+indexNivel+'"><span><i class="fluigicon fluigicon-plus-circle icon-xs EXPANDIR" onclick="expandir(\''+indexIndice+'\','+arrayIdCriacao[i]+')" id="EXPANDIR'+indexIndice+'"></i><i class="fluigicon fluigicon-minus-circle icon-xs REDUZIR" onclick="reduzir(\''+indexIndice+'\','+arrayIdCriacao[i]+')" id="REDUZIR'+indexIndice+'"></i></span>&ensp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheForm('+arrayIdCriacao[i]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs"></i></span>&ensp;<span id="SPANINTERNO'+indexIndice+'" class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheCab('+arrayIdCriacao[i]+');preencheFormSemView('+arrayIdCriacao[i]+');colocaSelecao(this)"><strong>'+sumario[i]+'</strong></span>&emsp;&emsp;<span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="iniciarSolicitacao('+arrayIdCriacao[i]+')" id="SUBCONJUNTO_LINK" name="SUBCONJUNTO_LINK" title="Cadastrar esse subconjunto em outra solicitação"><i class="fluigicon fluigicon-export icon-sm"></i></span></div>')
					$('#SPAN'+indexIndicePai+'').append('<br><div id="SPAN'+indexIndice+'" class="'+indexNivel+'"><span><i class="fluigicon fluigicon-plus-circle icon-xs EXPANDIR" onclick="expandir(\''+indexIndice+'\','+row[i]["IDCRIACAO"]+')" id="EXPANDIR'+indexIndice+'"></i><i class="fluigicon fluigicon-minus-circle icon-xs REDUZIR" onclick="reduzir(\''+indexIndice+'\','+row[i]["IDCRIACAO"]+')" id="REDUZIR'+indexIndice+'"></i></span>&ensp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheForm('+row[i]["IDCRIACAO"]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs" '+coresOrd[i]+'></i></span>&ensp;<span id="SPANINTERNO'+indexIndice+'" class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheCab('+row[i]["IDCRIACAO"]+');preencheFormSemView('+row[i]["IDCRIACAO"]+');colocaSelecao(this)"><strong>'+sumario+'</strong></span>&emsp;&emsp;<span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="iniciarSolicitacao('+row[i]["IDCRIACAO"]+')" id="SUBCONJUNTO_LINK" name="SUBCONJUNTO_LINK" title="Editar esse subconjunto em outra solicitação"><i class="fluigicon fluigicon-export icon-sm"></i></span></div>')
					
				} else {
					// SE NÃO TEM FILHO
					
					//$('.divCroqui').append('<br><div id="SPAN'+indexIndice+'" class="'+indexNivel+'"><span>&emsp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)"  onclick="preencheForm('+arrayIdCriacao[i]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs"></i></span>&ensp;<span class="click" id="SPANINTERNO'+indexIndice+'" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheCab('+arrayIdCriacao[i]+');preencheFormSemView('+arrayIdCriacao[i]+');colocaSelecao(this)" ><strong>'+sumario[i]+'</strong></span></span>&emsp;&emsp;<span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="iniciarSolicitacao('+arrayIdCriacao[i]+')" id="SUBCONJUNTO_LINK" name="SUBCONJUNTO_LINK" title="Cadastrar esse subconjunto em outra solicitação"><i class="fluigicon fluigicon-export icon-sm"></i></span></div>')
					
				}
				
			}
			
			// SE NÃO É O PRIMEIRO ITEM
			else if(pontos>0) {

				// SE ITEM TEM FILHO
				if(temFilho){
					
					$('#SPAN'+indexNivel+'').append('<div id="SPAN'+indexIndice+'" class="SPAN'+indexNivel+'"><span>'+espaco+'</span><span><i class="fluigicon fluigicon-plus-circle icon-xs EXPANDIR" onclick="expandir(\''+indexIndice+'\','+row[i]["IDCRIACAO"]+')" id="EXPANDIR'+indexIndice+'"></i><i class="fluigicon fluigicon-minus-circle icon-xs REDUZIR" onclick="reduzir(\''+indexIndice+'\','+row[i]["IDCRIACAO"]+')" id="REDUZIR'+indexIndice+'"></i></span>&ensp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheForm('+row[i]["IDCRIACAO"]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs" '+coresOrd[i]+'></i></span>&ensp;<span id="SPANINTERNO'+indexIndice+'" class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheCab('+row[i]["IDCRIACAO"]+');preencheFormSemView('+row[i]["IDCRIACAO"]+');colocaSelecao(this)"><strong>'+sumario+'</strong></span>&emsp;&emsp;<span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="iniciarSolicitacao('+row[i]["IDCRIACAO"]+')" id="SUBCONJUNTO_LINK" name="SUBCONJUNTO_LINK" title="Editar esse subconjunto em outra solicitação"><i class="fluigicon fluigicon-export icon-sm"></i></span></div>')
					
				} else {
					
					$('#SPAN'+indexNivel+'').append('<div id="SPAN'+indexIndice+'" class="SPAN'+indexNivel+'"><span>'+espaco+'&emsp;&ensp;</span><span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheForm('+row[i]["IDCRIACAO"]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs" '+coresOrd[i]+'></i></span>&ensp;<span id="SPANINTERNO'+indexIndice+'" class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheCab('+row[i]["IDCRIACAO"]+');preencheFormSemView('+row[i]["IDCRIACAO"]+');colocaSelecao(this)"><strong>'+sumario+'</strong></span>&emsp;&emsp;<span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="iniciarSolicitacao('+row[i]["IDCRIACAO"]+')" id="SUBCONJUNTO_LINK" name="SUBCONJUNTO_LINK" title="Editar esse subconjunto em outra solicitação"><i class="fluigicon fluigicon-export icon-sm"></i></span></div>')
					
				}
				
			}
			
			//console.log("finalizei o for de i: "+i)
			
		}
		
		//console.log("Finalizei a função montarCroqui")
		
	//}
	
	// ESCONDER SPAN REDUZIR
	//$(".EXPANDIR").hide()
	
}

// MONTA O CROQUI COM OS DADOS INSERIDOS NA TABELA SEM OFERECER A OPÇÃO DE ALTERAÇÕES
function montarCroquiSemOperacoes(row,coresOrd){
	
	console.log("<-------------------- MONTAR CROQUI SEM OPERACOES ----------------->")
	
	// VARIÁVEL PARA CONTROLAR SE A TABELA ESTÁ VAZIA
	var tabela = $("#TABELA").val()
	
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
		//$('.croqui').append('<span class="os" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="mudarOS()"><strong>OS '+os+'</strong></span><br><br>')
		$('.croqui').append('<span class="os" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="mudarOS()"><strong>OS '+os+'</strong></span><br><br><div id="SPANEXPANSORES"><span><i class="fluigicon fluigicon-plus-circle icon-xs EXPANDIRTODOS" onclick="expandirTodos()" title="Expandir toda a árvore" onmouseover="mouse(this)" id="EXPANDIR"><span class="EXPANSORESGERAIS">&ensp;Expandir&emsp;</span></i><i class="fluigicon fluigicon-minus-circle icon-xs REDUZIRTODOS" title="Reduzir toda a árvore" onmouseover="mouse(this)" onclick="reduzirTodos()" id="REDUZIR"><span class="EXPANSORESGERAIS">&ensp;Reduzir</span></i></span></div><br>')
		
		// CRIA O CROQUI DA ESTRUTURA DE ACORDO COM AS POSIÇÕES CADASTRADAS
		for(i=0;i<row.length;i++){
			
			var string = row[i]["INDICE"]
			
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
			
			var temFilho = idTemFilhoRow(string,row,0)
			
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
			
			console.log("sumario: "+sumario+", pontos: "+pontos)
			
			// SE É O PRIMEIRO ITEM DO CROQUI
			if(pontos==0){  
			
				// SE A POSIÇÃO TEM FILHO
				if(temFilho){
					
					$('.divCroqui').append('<br><div id="SPAN'+indexIndice+'" class="'+indexNivel+'"><span><i class="fluigicon fluigicon-plus-circle icon-xs EXPANDIR" onclick="expandir(\''+indexIndice+'\','+row[i]["IDCRIACAO"]+')" id="EXPANDIR'+indexIndice+'"></i><i class="fluigicon fluigicon-minus-circle icon-xs REDUZIR" onclick="reduzir(\''+indexIndice+'\','+row[i]["IDCRIACAO"]+')" id="REDUZIR'+indexIndice+'"></i></span>&ensp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheForm('+row[i]["IDCRIACAO"]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs" '+coresOrd[i]+'></i></span>&ensp;<span id="SPANINTERNO'+indexIndice+'" class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheCab('+row[i]["IDCRIACAO"]+');preencheFormSemView('+row[i]["IDCRIACAO"]+');colocaSelecao(this)"><strong>'+sumario+'</strong></span>&emsp;&emsp;<span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="iniciarSolicitacao('+row[i]["IDCRIACAO"]+')" id="SUBCONJUNTO_LINK" name="SUBCONJUNTO_LINK" title="Cadastrar esse subconjunto em outra solicitação"><i class="fluigicon fluigicon-export icon-sm"></i></span></div>')

				} else {
					// SE NÃO TEM FILHO
					
					$('.divCroqui').append('<br><div id="SPAN'+indexIndice+'" class="'+indexNivel+'"><span>&emsp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)"  onclick="preencheForm('+row[i]["IDCRIACAO"]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs" '+coresOrd[i]+'></i></span>&ensp;<span class="click" id="SPANINTERNO'+indexIndice+'" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheCab('+row[i]["IDCRIACAO"]+');preencheFormSemView('+row[i]["IDCRIACAO"]+');colocaSelecao(this)" ><strong>'+sumario+'</strong></span></span>&emsp;&emsp;<span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="iniciarSolicitacao('+row[i]["IDCRIACAO"]+')" id="SUBCONJUNTO_LINK" name="SUBCONJUNTO_LINK" title="Cadastrar esse subconjunto em outra solicitação"><i class="fluigicon fluigicon-export icon-sm"></i></span></div>')
					
				}
				
			}
			
			// SE NÃO É O PRIMEIRO ITEM
			if(pontos>0) {

				// SE ITEM TEM FILHO
				if(temFilho){
					
					$('#SPAN'+indexNivel+'').append('<div id="SPAN'+indexIndice+'" class="SPAN'+indexNivel+'"><span>'+espaco+'</span><span><i class="fluigicon fluigicon-plus-circle icon-xs EXPANDIR" onclick="expandir(\''+indexIndice+'\','+row[i]["IDCRIACAO"]+')" id="EXPANDIR'+indexIndice+'"></i><i class="fluigicon fluigicon-minus-circle icon-xs REDUZIR" onclick="reduzir(\''+indexIndice+'\','+row[i]["IDCRIACAO"]+')" id="REDUZIR'+indexIndice+'"></i></span>&ensp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheForm('+row[i]["IDCRIACAO"]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs" '+coresOrd[i]+'></i></span>&ensp;<span id="SPANINTERNO'+indexIndice+'" class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheCab('+row[i]["IDCRIACAO"]+');preencheFormSemView('+row[i]["IDCRIACAO"]+');colocaSelecao(this)"><strong>'+sumario+'</strong></span>&emsp;&emsp;<span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="iniciarSolicitacao('+row[i]["IDCRIACAO"]+')" id="SUBCONJUNTO_LINK" name="SUBCONJUNTO_LINK" title="Cadastrar esse subconjunto em outra solicitação"><i class="fluigicon fluigicon-export icon-sm"></i></span></div>')
					
				} else {
					
					$('#SPAN'+indexNivel+'').append('<div id="SPAN'+indexIndice+'" class="SPAN'+indexNivel+'"><span>'+espaco+'&emsp;&ensp;</span><span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheForm('+row[i]["IDCRIACAO"]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs" '+coresOrd[i]+'></i></span>&ensp;<span id="SPANINTERNO'+indexIndice+'" class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheCab('+row[i]["IDCRIACAO"]+');preencheFormSemView('+row[i]["IDCRIACAO"]+');colocaSelecao(this)"><strong>'+sumario+'</strong></span>&emsp;&emsp;<span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="iniciarSolicitacao('+row[i]["IDCRIACAO"]+')" id="SUBCONJUNTO_LINK" name="SUBCONJUNTO_LINK" title="Cadastrar esse subconjunto em outra solicitação"><i class="fluigicon fluigicon-export icon-sm"></i></span></div>')
					
				}
				
			}
			
			//console.log("finalizei o for de i: "+i)
			
		}
		
		//console.log("Finalizei a função montarCroqui")
		
	}
	
	// ESCONDER SPAN REDUZIR
	//$(".EXPANDIR").hide()
	
}

//MONTA O CROQUI COM OS DADOS INSERIDOS NA TABELA SEM OFERECER A OPÇÃO DE ALTERAÇÕES
function montarCroquiSemOperacoesAprov(row,coresOrd){
	
	console.log("<-------------------- MONTAR CROQUI SEM OPERACOES ----------------->")
	
	// VARIÁVEL PARA CONTROLAR SE A TABELA ESTÁ VAZIA
	var tabela = $("#TABELA").val()
	
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
		//$('.croqui').append('<span class="os" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="mudarOS()"><strong>OS '+os+'</strong></span><br><br>')
		$('.croqui').append('<span class="os" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="mudarOS()"><strong>OS '+os+'</strong></span><br><br><div id="SPANEXPANSORES"><span><i class="fluigicon fluigicon-plus-circle icon-xs EXPANDIRTODOS" onclick="expandirTodos()" title="Expandir toda a árvore" onmouseover="mouse(this)" id="EXPANDIR"><span class="EXPANSORESGERAIS">&ensp;Expandir&emsp;</span></i><i class="fluigicon fluigicon-minus-circle icon-xs REDUZIRTODOS" title="Reduzir toda a árvore" onmouseover="mouse(this)" onclick="reduzirTodos()" id="REDUZIR"><span class="EXPANSORESGERAIS">&ensp;Reduzir</span></i></span></div><br>')
		
		// CRIA O CROQUI DA ESTRUTURA DE ACORDO COM AS POSIÇÕES CADASTRADAS
		for(i=0;i<row.length;i++){
			
			var string = row[i]["INDICE"]
			
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
			
			var temFilho = idTemFilhoRow(string,row,0)
			
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
			
			console.log("sumario: "+sumario+", pontos: "+pontos)
			
			// SE É O PRIMEIRO ITEM DO CROQUI
			if(pontos==0){  
			
				// SE A POSIÇÃO TEM FILHO
				if(temFilho){
					
					$('.divCroqui').append('<br><div id="SPAN'+indexIndice+'" class="'+indexNivel+'"><span><i class="fluigicon fluigicon-plus-circle icon-xs EXPANDIR" onclick="expandir(\''+indexIndice+'\','+row[i]["IDCRIACAO"]+')" id="EXPANDIR'+indexIndice+'"></i><i class="fluigicon fluigicon-minus-circle icon-xs REDUZIR" onclick="reduzir(\''+indexIndice+'\','+row[i]["IDCRIACAO"]+')" id="REDUZIR'+indexIndice+'"></i></span>&ensp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheForm('+row[i]["IDCRIACAO"]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs" '+coresOrd[i]+'></i></span>&ensp;<span id="SPANINTERNO'+indexIndice+'" class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheCab('+row[i]["IDCRIACAO"]+');preencheFormSemView('+row[i]["IDCRIACAO"]+');colocaSelecao(this)"><strong>'+sumario+'</strong></span>&emsp;&emsp;</div>')

				} else {
					// SE NÃO TEM FILHO
					
					$('.divCroqui').append('<br><div id="SPAN'+indexIndice+'" class="'+indexNivel+'"><span>&emsp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)"  onclick="preencheForm('+row[i]["IDCRIACAO"]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs" '+coresOrd[i]+'></i></span>&ensp;<span class="click" id="SPANINTERNO'+indexIndice+'" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheCab('+row[i]["IDCRIACAO"]+');preencheFormSemView('+row[i]["IDCRIACAO"]+');colocaSelecao(this)" ><strong>'+sumario+'</strong></span></span>&emsp;&emsp;</div>')
					
				}
				
			}
			
			// SE NÃO É O PRIMEIRO ITEM
			if(pontos>0) {

				// SE ITEM TEM FILHO
				if(temFilho){
					
					$('#SPAN'+indexNivel+'').append('<div id="SPAN'+indexIndice+'" class="SPAN'+indexNivel+'"><span>'+espaco+'</span><span><i class="fluigicon fluigicon-plus-circle icon-xs EXPANDIR" onclick="expandir(\''+indexIndice+'\','+row[i]["IDCRIACAO"]+')" id="EXPANDIR'+indexIndice+'"></i><i class="fluigicon fluigicon-minus-circle icon-xs REDUZIR" onclick="reduzir(\''+indexIndice+'\','+row[i]["IDCRIACAO"]+')" id="REDUZIR'+indexIndice+'"></i></span>&ensp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheForm('+row[i]["IDCRIACAO"]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs" '+coresOrd[i]+'></i></span>&ensp;<span id="SPANINTERNO'+indexIndice+'" class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheCab('+row[i]["IDCRIACAO"]+');preencheFormSemView('+row[i]["IDCRIACAO"]+');colocaSelecao(this)"><strong>'+sumario+'</strong></span>&emsp;&emsp;</div>')
					
				} else {
					
					$('#SPAN'+indexNivel+'').append('<div id="SPAN'+indexIndice+'" class="SPAN'+indexNivel+'"><span>'+espaco+'&emsp;&ensp;</span><span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheForm('+row[i]["IDCRIACAO"]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs" '+coresOrd[i]+'></i></span>&ensp;<span id="SPANINTERNO'+indexIndice+'" class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheCab('+row[i]["IDCRIACAO"]+');preencheFormSemView('+row[i]["IDCRIACAO"]+');colocaSelecao(this)"><strong>'+sumario+'</strong></span>&emsp;&emsp;</div>')
					
				}
				
			}
			
			//console.log("finalizei o for de i: "+i)
			
		}
		
		//console.log("Finalizei a função montarCroqui")
		
	}
	
	// ESCONDER SPAN REDUZIR
	//$(".EXPANDIR").hide()
	
}

// MONTA O CROQUI COM OS DADOS INSERIDOS NA TABELA SEM OFERECER A OPÇÃO DE ALTERAÇÕES
/*function montarCroquiSemOperacoes(sumario,arrayIdCriacao,indicesOrdenados,niveis,coresOrd){
	
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
		
		// CRIA UMA NOVA DIV PARA O CROQUI
		$('.beforeCroqui').after('<div class="form-group col-md-12 divCroqui croqui espaco"></div>')
		$('.croqui').append('<span class="os" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="mudarOS()"><strong>OS '+os+'</strong></span><br><br>')
		
		//<div id="SPANEXPANSORES"><span><i class="fluigicon fluigicon-plus-circle icon-xs EXPANDIR" onclick="expandirTodos()" title="Expandir toda a árvore" onmouseover="mouse(this)" id="EXPANDIR"><span class="EXPANSORESGERAIS">&ensp;Expandir</span></i><i class="fluigicon fluigicon-minus-circle icon-xs REDUZIR" onclick="reduzirTodos()" title="Reduzir toda a árvore" onmouseover="mouse(this)" id="REDUZIR"><span class="EXPANSORESGERAIS">&ensp;Reduzir</span></i></span></div><br>

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
			
			// SE É O PRIMEIRO ITEM DO CROQUI
			if(pontos==0){  
			
				// SE A POSIÇÃO TEM FILHO
				if(temFilho){
					
					$('.divCroqui').append('<br><div id="SPAN'+indexIndice+'" class="'+indexNivel+'"><span><i class="fluigicon fluigicon-plus-circle icon-xs EXPANDIR" onclick="expandir(\''+indexIndice+'\','+arrayIdCriacao[i]+')" id="EXPANDIR'+indexIndice+'"></i><i class="fluigicon fluigicon-minus-circle icon-xs REDUZIR" onclick="reduzir(\''+indexIndice+'\','+arrayIdCriacao[i]+')" id="REDUZIR'+indexIndice+'"></i></span>&ensp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheForm('+arrayIdCriacao[i]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs" '+coresOrd[i]+'></i></span>&ensp;<span id="SPANINTERNO'+indexIndice+'" class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheCab('+arrayIdCriacao[i]+');preencheFormSemView('+arrayIdCriacao[i]+');colocaSelecao(this)"><strong>'+sumario[i]+'</strong></span>&emsp;&emsp;<span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="iniciarSolicitacao('+arrayIdCriacao[i]+')" id="SUBCONJUNTO_LINK" name="SUBCONJUNTO_LINK" title="Cadastrar esse subconjunto em outra solicitação"><i class="fluigicon fluigicon-export icon-sm"></i></span></div>')

				} else {
					// SE NÃO TEM FILHO
					
					$('.divCroqui').append('<br><div id="SPAN'+indexIndice+'" class="'+indexNivel+'"><span>&emsp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)"  onclick="preencheForm('+arrayIdCriacao[i]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs" '+coresOrd[i]+'></i></span>&ensp;<span class="click" id="SPANINTERNO'+indexIndice+'" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheCab('+arrayIdCriacao[i]+');preencheFormSemView('+arrayIdCriacao[i]+');colocaSelecao(this)" ><strong>'+sumario[i]+'</strong></span></span>&emsp;&emsp;<span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="iniciarSolicitacao('+arrayIdCriacao[i]+')" id="SUBCONJUNTO_LINK" name="SUBCONJUNTO_LINK" title="Cadastrar esse subconjunto em outra solicitação"><i class="fluigicon fluigicon-export icon-sm"></i></span></div>')
					
				}
				
			}
			
			// SE NÃO É O PRIMEIRO ITEM
			if(pontos>0) {

				// SE ITEM TEM FILHO
				if(temFilho){
					
					$('#SPAN'+indexNivel+'').append('<div id="SPAN'+indexIndice+'" class="SPAN'+indexNivel+'"><span>'+espaco+'</span><span><i class="fluigicon fluigicon-plus-circle icon-xs EXPANDIR" onclick="expandir(\''+indexIndice+'\','+arrayIdCriacao[i]+')" id="EXPANDIR'+indexIndice+'"></i><i class="fluigicon fluigicon-minus-circle icon-xs REDUZIR" onclick="reduzir(\''+indexIndice+'\','+arrayIdCriacao[i]+')" id="REDUZIR'+indexIndice+'"></i></span>&ensp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheForm('+arrayIdCriacao[i]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs"'+coresOrd[i]+'></i></span>&ensp;<span id="SPANINTERNO'+indexIndice+'" class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheCab('+arrayIdCriacao[i]+');preencheFormSemView('+arrayIdCriacao[i]+');colocaSelecao(this)"><strong>'+sumario[i]+'</strong></span>&emsp;&emsp;<span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="iniciarSolicitacao('+arrayIdCriacao[i]+')" id="SUBCONJUNTO_LINK" name="SUBCONJUNTO_LINK" title="Cadastrar esse subconjunto em outra solicitação"><i class="fluigicon fluigicon-export icon-sm"></i></span></div>')
					
				} else {
					
					$('#SPAN'+indexNivel+'').append('<div id="SPAN'+indexIndice+'" class="SPAN'+indexNivel+'"><span>'+espaco+'&emsp;&ensp;</span><span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheForm('+arrayIdCriacao[i]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs"'+coresOrd[i]+'></i></span>&ensp;<span id="SPANINTERNO'+indexIndice+'" class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheCab('+arrayIdCriacao[i]+');preencheFormSemView('+arrayIdCriacao[i]+');colocaSelecao(this)"><strong>'+sumario[i]+'</strong></span>&emsp;&emsp;<span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="iniciarSolicitacao('+arrayIdCriacao[i]+')" id="SUBCONJUNTO_LINK" name="SUBCONJUNTO_LINK" title="Cadastrar esse subconjunto em outra solicitação"><i class="fluigicon fluigicon-export icon-sm"></i></span></div>')
					
				}
				
			}
			
			//console.log("finalizei o for de i: "+i)
			
		}
		
		//console.log("Finalizei a função montarCroqui")
		
	}
	
	// ESCONDER SPAN REDUZIR
	$(".EXPANDIR").hide()
	
}*/

// MONTA E EXIBE O CROQUI DA ESTRUTURA 
/*function montarCroquiNivel(sumario,arrayIdCriacao,indicesOrdenados,niveis,idCriacaoPai,coresOrd) {
	
	//console.log("Entrei na função montarCroqui")
	
	// VARIÁVEL PARA CONTROLAR SE A TABELA ESTÁ VAZIA
	var tabela = $("#TABELA").val()
		
		var os = $("#OS_INFO").val()
		var codTarefa = $("#CODIGOTAREFA").val()
	
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
				
			}
			
			// SE NÃO É O PRIMEIRO ITEM
			//if(pontos>0) {
			else {
				
				console.log("pontos é diferente do pontos pai")
				
				// SE A POSIÇÃO TEM FILHO
				if(temFilho){
					
					console.log("tem filho")
					console.log("indexNivel: "+indexNivel)
					
					$('#SPAN'+indexNivel+'').append('<div id="SPAN'+indexIndice+'" class="SPAN'+indexNivel+'"><span>'+espaco+'</span><span><i class="fluigicon fluigicon-plus-circle icon-xs EXPANDIR" onclick="expandir(\''+indexIndice+'\','+arrayIdCriacao[i]+')" id="EXPANDIR'+indexIndice+'"></i><i class="fluigicon fluigicon-minus-circle icon-xs REDUZIR" onclick="reduzir(\''+indexIndice+'\','+arrayIdCriacao[i]+')" id="REDUZIR'+indexIndice+'"></i></span>&ensp;'+checkUsin+'&ensp;'+checkCald+'&ensp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheForm('+arrayIdCriacao[i]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs" '+coresOrd[i]+'></i></span>&ensp;<span id="SPANINTERNO'+indexIndice+'" class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheCab('+arrayIdCriacao[i]+');preencheFormSemView('+arrayIdCriacao[i]+');colocaSelecao(this)"><strong>'+sumario[i]+'</strong></span>&emsp;&emsp;<a id="ALTERAR_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="alterarItem(\''+indicesOrdenados[i]+'\','+arrayIdCriacao[i]+');" id="ALTERAR_ITEM" name="ALTERAR_ITEM" title="Alterar"><i class="fluigicon fluigicon-pencil icon-xs"></i></span></a>&emsp;<a id="IRMAO_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirIrmao(\''+indicesOrdenados[i]+'\');" id="INCLUIR_IRMAO" name="INCLUIR_IRMAO" title="Incluir irmão abaixo"><i class="fluigicon fluigicon-circle-arrow-down icon-sm"></i></span></a>&emsp;<a id="FILHO_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirFilho(\''+indicesOrdenados[i]+'\');" id="INCLUIR_FILHO" name="INCLUIR_FILHO" title="Incluir filho abaixo"><i class="fluigicon fluigicon-circle-arrow-bottom-right icon-sm"></i></span></a>&emsp;<a id="TROCAINDICE_LINK" href="#abrirModalTrocaIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="trocaIndice(\''+indicesOrdenados[i]+'\','+arrayIdCriacao[i]+');" id="TROCA_INDICE" name="TROCA_INDICE" title="Trocar posição do item"><i class="flaticon flaticon-import-export icon-sm" aria-hidden="true"></i></span></a>&emsp;<span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="iniciarSolicitacao('+arrayIdCriacao[i]+')" id="SUBCONJUNTO_LINK" name="SUBCONJUNTO_LINK" title="Editar esse subconjunto em outra solicitação"><i class="fluigicon fluigicon-export icon-sm"></i></span></div>')
					
				} else {
					// SE NÃO TEM FILHO
					
					console.log("não tem filho")
					
					$('#SPAN'+indexNivel+'').append('<div id="SPAN'+indexIndice+'" class="SPAN'+indexNivel+'"><span>'+espaco+'&ensp;&nbsp;</span>&ensp;'+checkUsin+'&ensp;'+checkCald+'&ensp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheForm('+arrayIdCriacao[i]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs" '+coresOrd[i]+'></i></span>&ensp;<span id="SPANINTERNO'+indexIndice+'" class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheCab('+arrayIdCriacao[i]+');preencheFormSemView('+arrayIdCriacao[i]+');colocaSelecao(this)"><strong>'+sumario[i]+'</strong></span>&emsp;&emsp;<a id="ALTERAR_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="alterarItem(\''+indicesOrdenados[i]+'\','+arrayIdCriacao[i]+');" id="ALTERAR_ITEM" name="ALTERAR_ITEM" title="Alterar"><i class="fluigicon fluigicon-pencil icon-xs"></i></span></a>&emsp;<a id="IRMAO_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirIrmao(\''+indicesOrdenados[i]+'\');" id="INCLUIR_IRMAO" name="INCLUIR_IRMAO" title="Incluir irmão abaixo"><i class="fluigicon fluigicon-circle-arrow-down icon-sm"></i></span></a>&emsp;<a id="FILHO_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirFilho(\''+indicesOrdenados[i]+'\');" id="INCLUIR_FILHO" name="INCLUIR_FILHO" title="Incluir filho abaixo"><i class="fluigicon fluigicon-circle-arrow-bottom-right icon-sm"></i></span></a>&emsp;<a id="TROCAINDICE_LINK" href="#abrirModalTrocaIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="trocaIndice(\''+indicesOrdenados[i]+'\','+arrayIdCriacao[i]+');" id="TROCA_INDICE" name="TROCA_INDICE" title="Trocar posição do item"><i class="flaticon flaticon-import-export icon-sm" aria-hidden="true"></i></span></a>&emsp;<span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="iniciarSolicitacao('+arrayIdCriacao[i]+')" id="SUBCONJUNTO_LINK" name="SUBCONJUNTO_LINK" title="Editar esse subconjunto em outra solicitação"><i class="fluigicon fluigicon-export icon-sm"></i></span></div>')
					
				}
				
			}
			
			//console.log("finalizei o for de i: "+i)
			
		}
		
		//console.log("Finalizei a função montarCroqui")
		
	//}
	
	// ESCONDER SPAN REDUZIR
	$(".EXPANDIR").hide()
	
}*/

// MONTA E EXIBE O CROQUI DA ESTRUTURA 
function montarCroquiNivel(idCriacaoPai,row,coresOrd) {
	
	//console.log("Entrei na função montarCroqui")
	
	console.log("<<-------------------- MONTAR CROQUI NIVEL -------------------------->>")
	
	// VARIÁVEL PARA CONTROLAR SE A TABELA ESTÁ VAZIA
	var tabela = $("#TABELA").val()
		
		var os = $("#OS_INFO").val()
		var codTarefa = $("#CODIGOTAREFA").val()
	
		// CRIA O CROQUI DA ESTRUTURA DE ACORDO COM AS POSIÇÕES CADASTRADAS
		for(i=0;i<row.length;i++){
			
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
			
			var string = row[i]["INDICE"]
			
			var pontos = string.replace(/[^.]/g, "").length
			console.log("pontos: "+pontos)
				
			var espaco = esp(pontos)
			
			console.log("nivel: "+row[i]["INDICE"])
			console.log("indicesOrdenados: "+row[i]["INDICE"])
			var indexNivel = row[i]["NIVEL"]
			
			indexNivel = indexNivel.replace(/\./g,"P")
			console.log("indexNivel: "+indexNivel)
			
			var convert = row[i]["INDICE"].toString()
			
			// ACRESCENTEI ESSA LINHA (SOLICITAÇÃO 1831)
			var indexIndice = convert.replace(/\./g,"P")
			
			console.log("indexIndice: "+indexIndice)
			
			var temFilho = idTemFilhoRow(string,row,0)
			
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

			var check = buscaCheckUsinCald(row[i]["IDCRIACAO"])
			var checkUsin = check.split(";")[0]
			var checkCald = check.split(";")[1]
			
			// SE CHECKBOX DA USINAGEM ESTÁ SELECIONADO
			if(checkUsin=="S"){
				
				checkUsin = 'U&nbsp;<input type="checkbox" class="checkModalUsin" id="CHECKUSINAGEM'+indexIndice+'" value="'+row[i]["IDCRIACAO"]+'" class="form-control" onclick="checkUsinagem(this,'+row[i]["IDCRIACAO"]+')" title="Usinagem" checked>'
				
			} else {
				// SE NÃO
				 
				checkUsin = 'U&nbsp;<input type="checkbox" class="checkModalUsin" id="CHECKUSINAGEM'+indexIndice+'" value="'+row[i]["IDCRIACAO"]+'" class="form-control" onclick="checkUsinagem(this,'+row[i]["IDCRIACAO"]+')" title="Usinagem">'
				
			}
			
			// SE CHECKBOX DA CALDERARIA ESTÁ SELECIONADO
			if(checkCald=="S"){
				
				checkCald = 'C&nbsp;<input type="checkbox" class="checkModalCald" id="CHECKCALDERARIA'+indexIndice+'" value="'+row[i]["IDCRIACAO"]+'" class="form-control" onclick="checkCalderaria(this,'+row[i]["IDCRIACAO"]+')" title="Calderaria" checked>'
				
			} else {
				// SE NÃO
				
				checkCald = 'C&nbsp;<input type="checkbox" class="checkModalCald" id="CHECKCALDERARIA'+indexIndice+'" value="'+row[i]["IDCRIACAO"]+'" class="form-control" onclick="checkCalderaria(this,'+row[i]["IDCRIACAO"]+')" title="Calderaria">'
				
			}

			
			// SE É O PRIMEIRO ITEM DO CROQUI
			if(pontos==pontosPai){  
				
				console.log("pontos "+pontos+" e pontosPai "+pontosPai)
				
			}
			
			// SE NÃO É O PRIMEIRO ITEM
			//if(pontos>0) {
			else {
				
				console.log("pontos é diferente do pontos pai")
				
				
				// SE A POSIÇÃO TEM FILHO
				if(temFilho){
					
					console.log("tem filho")
					console.log("indexNivel: "+indexNivel)
					
					$('#SPAN'+indexNivel+'').append('<div id="SPAN'+indexIndice+'" class="SPAN'+indexNivel+'"><span>'+espaco+'</span><span><i class="fluigicon fluigicon-plus-circle icon-xs EXPANDIR" onclick="expandir(\''+indexIndice+'\','+row[i]["IDCRIACAO"]+')" id="EXPANDIR'+indexIndice+'"></i><i class="fluigicon fluigicon-minus-circle icon-xs REDUZIR" onclick="reduzir(\''+indexIndice+'\','+row[i]["IDCRIACAO"]+')" id="REDUZIR'+indexIndice+'"></i></span>&ensp;'+checkUsin+'&ensp;'+checkCald+'&ensp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheForm('+row[i]["IDCRIACAO"]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs" '+coresOrd[i]+'></i></span>&ensp;<span id="SPANINTERNO'+indexIndice+'" class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheCab('+row[i]["IDCRIACAO"]+');preencheFormSemView('+row[i]["IDCRIACAO"]+');colocaSelecao(this)"><strong>'+sumario+'</strong></span>&emsp;&emsp;<a id="ALTERAR_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="alterarItem(\''+row[i]["INDICE"]+'\','+row[i]["IDCRIACAO"]+');" id="ALTERAR_ITEM" name="ALTERAR_ITEM" title="Alterar"><i class="fluigicon fluigicon-pencil icon-xs"></i></span></a>&emsp;<a id="IRMAO_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirIrmao(\''+row[i]["INDICE"]+'\');" id="INCLUIR_IRMAO" name="INCLUIR_IRMAO" title="Incluir irmão abaixo"><i class="fluigicon fluigicon-circle-arrow-down icon-sm"></i></span></a>&emsp;<a id="FILHO_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirFilho(\''+row[i]["INDICE"]+'\');" id="INCLUIR_FILHO" name="INCLUIR_FILHO" title="Incluir filho abaixo"><i class="fluigicon fluigicon-circle-arrow-bottom-right icon-sm"></i></span></a>&emsp;<a id="TROCAINDICE_LINK" href="#abrirModalTrocaIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="trocaIndice(\''+row[i]["INDICE"]+'\','+row[i]["IDCRIACAO"]+');" id="TROCA_INDICE" name="TROCA_INDICE" title="Trocar posição do item"><i class="flaticon flaticon-import-export icon-sm" aria-hidden="true"></i></span></a>&emsp;<span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="iniciarSolicitacao('+row[i]["IDCRIACAO"]+')" id="SUBCONJUNTO_LINK" name="SUBCONJUNTO_LINK" title="Editar esse subconjunto em outra solicitação"><i class="fluigicon fluigicon-export icon-sm"></i></span></div>')
					
				} else {
					// SE NÃO TEM FILHO
					
					console.log("não tem filho")
					
					$('#SPAN'+indexNivel+'').append('<div id="SPAN'+indexIndice+'" class="SPAN'+indexNivel+'"><span>'+espaco+'&ensp;&nbsp;</span>&ensp;'+checkUsin+'&ensp;'+checkCald+'&ensp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheForm('+row[i]["IDCRIACAO"]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs" '+coresOrd[i]+'></i></span>&ensp;<span id="SPANINTERNO'+indexIndice+'" class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheCab('+row[i]["IDCRIACAO"]+');preencheFormSemView('+row[i]["IDCRIACAO"]+');colocaSelecao(this)"><strong>'+sumario+'</strong></span>&emsp;&emsp;<a id="ALTERAR_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="alterarItem(\''+row[i]["INDICE"]+'\','+row[i]["IDCRIACAO"]+');" id="ALTERAR_ITEM" name="ALTERAR_ITEM" title="Alterar"><i class="fluigicon fluigicon-pencil icon-xs"></i></span></a>&emsp;<a id="IRMAO_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirIrmao(\''+row[i]["INDICE"]+'\');" id="INCLUIR_IRMAO" name="INCLUIR_IRMAO" title="Incluir irmão abaixo"><i class="fluigicon fluigicon-circle-arrow-down icon-sm"></i></span></a>&emsp;<a id="FILHO_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirFilho(\''+row[i]["INDICE"]+'\');" id="INCLUIR_FILHO" name="INCLUIR_FILHO" title="Incluir filho abaixo"><i class="fluigicon fluigicon-circle-arrow-bottom-right icon-sm"></i></span></a>&emsp;<a id="TROCAINDICE_LINK" href="#abrirModalTrocaIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="trocaIndice(\''+row[i]["INDICE"]+'\','+row[i]["IDCRIACAO"]+');" id="TROCA_INDICE" name="TROCA_INDICE" title="Trocar posição do item"><i class="flaticon flaticon-import-export icon-sm" aria-hidden="true"></i></span></a>&emsp;<span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="iniciarSolicitacao('+row[i]["IDCRIACAO"]+')" id="SUBCONJUNTO_LINK" name="SUBCONJUNTO_LINK" title="Editar esse subconjunto em outra solicitação"><i class="fluigicon fluigicon-export icon-sm"></i></span></div>')
					
				}
				
			}
			
			//console.log("finalizei o for de i: "+i)
			
		}
		
		//console.log("Finalizei a função montarCroqui")
		
	//}
	
	// ESCONDER SPAN REDUZIR
	//$(".EXPANDIR").hide()
	
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
function montarCroqui(row,coresOrd) {
	
	//console.log("Entrei na função montarCroqui")
	
	// VARIÁVEL PARA CONTROLAR SE A TABELA ESTÁ VAZIA
	var tabela = $("#TABELA").val()
	
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
		var atividade = $("#ATIVIDADE").val()
		
		// CRIA UMA NOVA DIV PARA O CROQUI
		$('.beforeCroqui').after('<div class="form-group col-md-12 divCroqui croqui espaco"></div>')
		
		$('.croqui').append('<span class="os" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)"><strong>OS '+os+'</strong></span><br><br><div id="SPANEXPANSORES"><span><i class="fluigicon fluigicon-plus-circle icon-xs EXPANDIRTODOS" onclick="expandirTodos()" title="Expandir toda a árvore" onmouseover="mouse(this)" id="EXPANDIR"><span class="EXPANSORESGERAIS">&ensp;Expandir&emsp;</span></i><i class="fluigicon fluigicon-minus-circle icon-xs REDUZIRTODOS" title="Reduzir toda a árvore" onmouseover="mouse(this)" onclick="reduzirTodos()" id="REDUZIR"><span class="EXPANSORESGERAIS">&ensp;Reduzir</span></i></span></div><br>')
		//<div id="SPANEXPANSORES"><span><i class="fluigicon fluigicon-plus-circle icon-xs EXPANDIR" onclick="expandirTodos()" title="Expandir toda a árvore" onmouseover="mouse(this)" id="EXPANDIR"><span class="EXPANSORESGERAIS">&ensp;Expandir</span></i><i class="fluigicon fluigicon-minus-circle icon-xs REDUZIR" title="Reduzir toda a árvore" onmouseover="mouse(this)" onclick="reduzirTodos()" id="REDUZIR"><span class="EXPANSORESGERAIS">&ensp;Reduzir</span></i></span></div><br>
		
		// CRIA O CROQUI DA ESTRUTURA DE ACORDO COM AS POSIÇÕES CADASTRADAS
		for(i=0;i<row.length;i++){
			
			var string = row[i]["INDICE"]
			
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
			
			var temFilho = idTemFilhoRow(string,row,0)
			
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

			var check = buscaCheckUsinCald(row[i]["IDCRIACAO"])
			var checkUsin = check.split(";")[0]
			var checkCald = check.split(";")[1]
			
			// SE CHECKBOX DA USINAGEM ESTÁ SELECIONADO
			if(checkUsin=="S"){
				
				checkUsin = 'U&nbsp;<input type="checkbox" class="checkModalUsin" id="CHECKUSINAGEM'+indexIndice+'" value="'+row[i]["IDCRIACAO"]+'" class="form-control" onclick="checkUsinagem(this,'+row[i]["IDCRIACAO"]+')" title="Usinagem" checked>'
				
			} else {
				// SE NÃO
				 
				checkUsin = 'U&nbsp;<input type="checkbox" class="checkModalUsin" id="CHECKUSINAGEM'+indexIndice+'" value="'+row[i]["IDCRIACAO"]+'" class="form-control" onclick="checkUsinagem(this,'+row[i]["IDCRIACAO"]+')" title="Usinagem">'
				
			}
			
			// SE CHECKBOX DA CALDERARIA ESTÁ SELECIONADO
			if(checkCald=="S"){
				
				checkCald = 'C&nbsp;<input type="checkbox" class="checkModalCald" id="CHECKCALDERARIA'+indexIndice+'" value="'+row[i]["IDCRIACAO"]+'" class="form-control" onclick="checkCalderaria(this,'+row[i]["IDCRIACAO"]+')" title="Calderaria" checked>'
				
			} else {
				// SE NÃO
				
				checkCald = 'C&nbsp;<input type="checkbox" class="checkModalCald" id="CHECKCALDERARIA'+indexIndice+'" value="'+row[i]["IDCRIACAO"]+'" class="form-control" onclick="checkCalderaria(this,'+row[i]["IDCRIACAO"]+')" title="Calderaria">'
				
			}
			
			// SE É O PRIMEIRO ITEM DO CROQUI
			if(pontos==0){  
			
				// SE A POSIÇÃO TEM FILHO
				if(temFilho){
					
					$('.divCroqui').append('<br><div id="SPAN'+indexIndice+'" class="'+indexNivel+'"><span><i class="fluigicon fluigicon-plus-circle icon-xs EXPANDIR" onclick="expandir(\''+indexIndice+'\','+row[i]["IDCRIACAO"]+')" id="EXPANDIR'+indexIndice+'"></i><i class="fluigicon fluigicon-minus-circle icon-xs REDUZIR" onclick="reduzir(\''+indexIndice+'\','+row[i]["IDCRIACAO"]+')" id="REDUZIR'+indexIndice+'"></i></span>&ensp;'+checkUsin+'&ensp;'+checkCald+'&ensp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheForm('+row[i]["IDCRIACAO"]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs" '+coresOrd[i]+'></i></span>&ensp;<span id="SPANINTERNO'+indexIndice+'" class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheCab('+row[i]["IDCRIACAO"]+');preencheFormSemView('+row[i]["IDCRIACAO"]+');colocaSelecao(this)"><strong>'+sumario+'</strong></span>&emsp;&emsp;<a id="ALTERAR_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="alterarItem(\''+row[i]["INDICE"]+'\','+row[i]["IDCRIACAO"]+');" id="ALTERAR_ITEM" name="ALTERAR_ITEM" title="Alterar"><i class="fluigicon fluigicon-pencil icon-xs"></i></span></a>&emsp;<a id="IRMAO_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirIrmao(\''+row[i]["INDICE"]+'\');" id="INCLUIR_IRMAO" name="INCLUIR_IRMAO" title="Incluir irmão abaixo"><i class="fluigicon fluigicon-circle-arrow-down icon-sm"></i></span></a>&emsp;<a id="FILHO_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirFilho(\''+row[i]["INDICE"]+'\');" id="INCLUIR_FILHO" name="INCLUIR_FILHO" title="Incluir filho abaixo"><i class="fluigicon fluigicon-circle-arrow-bottom-right icon-sm"></i></span></a>&emsp;<a id="TROCAINDICE_LINK" href="#abrirModalTrocaIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="trocaIndice(\''+row[i]["INDICE"]+'\','+row[i]["IDCRIACAO"]+');" id="TROCA_INDICE" name="TROCA_INDICE" title="Trocar posição do item"><i class="flaticon flaticon-import-export icon-sm" aria-hidden="true"></i></span></a>&emsp;<span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="iniciarSolicitacao('+row[i]["IDCRIACAO"]+')" id="SUBCONJUNTO_LINK" name="SUBCONJUNTO_LINK" title="Cadastrar esse subconjunto em outra solicitação"><i class="fluigicon fluigicon-export icon-sm"></i></span></div>')

				} else {
					// SE NÃO TEM FILHO
					
					$('.divCroqui').append('<br><div id="SPAN'+indexIndice+'" class="'+indexNivel+'"><span>&ensp;'+checkUsin+'&ensp;'+checkCald+'&ensp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)"  onclick="preencheForm('+row[i]["IDCRIACAO"]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs" '+coresOrd[i]+'></i></span>&ensp;<span class="click" id="SPANINTERNO'+indexIndice+'" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheCab('+row[i]["IDCRIACAO"]+');preencheFormSemView('+row[i]["IDCRIACAO"]+');colocaSelecao(this)" ><strong>'+sumario+'</strong></span></span>&emsp;&emsp;<a id="ALTERAR_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="alterarItem(\''+row[i]["INDICE"]+'\','+row[i]["IDCRIACAO"]+');" id="ALTERAR_ITEM" name="ALTERAR_ITEM" title="Alterar"><i class="fluigicon fluigicon-pencil icon-xs"></i></span></a>&emsp;<a id="IRMAO_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirIrmao(\''+row[i]["INDICE"]+'\');" id="INCLUIR_IRMAO" name="INCLUIR_IRMAO" title="Incluir irmão abaixo"><i class="fluigicon fluigicon-circle-arrow-down icon-sm"></i></span></a>&emsp;<a id="FILHO_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)"  onclick="incluirFilho(\''+row[i]["INDICE"]+'\');" id="INCLUIR_FILHO" name="INCLUIR_FILHO" title="Incluir filho abaixo"><i class="fluigicon fluigicon-circle-arrow-bottom-right icon-sm"></i></span></a>&emsp;<a id="TROCAINDICE_LINK" href="#abrirModalTrocaIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="trocaIndice(\''+row[i]["INDICE"]+'\','+row[i]["IDCRIACAO"]+');" id="TROCA_INDICE" name="TROCA_INDICE" title="Trocar posição do item"><i class="flaticon flaticon-import-export icon-sm" aria-hidden="true"></i></span></a>&emsp;<span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="iniciarSolicitacao('+row[i]["IDCRIACAO"]+')" id="SUBCONJUNTO_LINK" name="SUBCONJUNTO_LINK" title="Cadastrar esse subconjunto em outra solicitação"><i class="fluigicon fluigicon-export icon-sm"></i></span></div>')
					
				}
				
			}
			
			// SE NÃO É O PRIMEIRO ITEM
			if(pontos>0){

				// SE A POSIÇÃO TEM FILHO
				if(temFilho){
					
					$('#SPAN'+indexNivel+'').append('<div id="SPAN'+indexIndice+'" class="SPAN'+indexNivel+'"><span>'+espaco+'</span><span><i class="fluigicon fluigicon-plus-circle icon-xs EXPANDIR" onclick="expandir(\''+indexIndice+'\','+row[i]["IDCRIACAO"]+')" id="EXPANDIR'+indexIndice+'"></i><i class="fluigicon fluigicon-minus-circle icon-xs REDUZIR" onclick="reduzir(\''+indexIndice+'\','+row[i]["IDCRIACAO"]+')" id="REDUZIR'+indexIndice+'"></i></span>&ensp;'+checkUsin+'&ensp;'+checkCald+'&ensp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheForm('+row[i]["IDCRIACAO"]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs" '+coresOrd[i]+'></i></span>&ensp;<span id="SPANINTERNO'+indexIndice+'" class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheCab('+row[i]["IDCRIACAO"]+');preencheFormSemView('+row[i]["IDCRIACAO"]+');colocaSelecao(this)"><strong>'+sumario+'</strong></span>&emsp;&emsp;<a id="ALTERAR_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="alterarItem(\''+row[i]["INDICE"]+'\','+row[i]["IDCRIACAO"]+');" id="ALTERAR_ITEM" name="ALTERAR_ITEM" title="Alterar"><i class="fluigicon fluigicon-pencil icon-xs"></i></span></a>&emsp;<a id="IRMAO_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirIrmao(\''+row[i]["INDICE"]+'\');" id="INCLUIR_IRMAO" name="INCLUIR_IRMAO" title="Incluir irmão abaixo"><i class="fluigicon fluigicon-circle-arrow-down icon-sm"></i></span></a>&emsp;<a id="FILHO_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirFilho(\''+row[i]["INDICE"]+'\');" id="INCLUIR_FILHO" name="INCLUIR_FILHO" title="Incluir filho abaixo"><i class="fluigicon fluigicon-circle-arrow-bottom-right icon-sm"></i></span></a>&emsp;<a id="TROCAINDICE_LINK" href="#abrirModalTrocaIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="trocaIndice(\''+row[i]["INDICE"]+'\','+row[i]["IDCRIACAO"]+');" id="TROCA_INDICE" name="TROCA_INDICE" title="Trocar posição do item"><i class="flaticon flaticon-import-export icon-sm" aria-hidden="true"></i></span></a>&emsp;<span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="iniciarSolicitacao('+row[i]["IDCRIACAO"]+')" id="SUBCONJUNTO_LINK" name="SUBCONJUNTO_LINK" title="Cadastrar esse subconjunto em outra solicitação"><i class="fluigicon fluigicon-export icon-sm"></i></span></div>')
					
				} else {
					// SE NÃO TEM FILHO
					
					$('#SPAN'+indexNivel+'').append('<div id="SPAN'+indexIndice+'" class="SPAN'+indexNivel+'"><span>'+espaco+'&ensp;&nbsp;</span>&ensp;'+checkUsin+'&ensp;'+checkCald+'&ensp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheForm('+row[i]["IDCRIACAO"]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs" '+coresOrd[i]+'></i></span>&ensp;<span id="SPANINTERNO'+indexIndice+'" class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheCab('+row[i]["IDCRIACAO"]+');preencheFormSemView('+row[i]["IDCRIACAO"]+');colocaSelecao(this)"><strong>'+sumario+'</strong></span>&emsp;&emsp;<a id="ALTERAR_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="alterarItem(\''+row[i]["INDICE"]+'\','+row[i]["IDCRIACAO"]+');" id="ALTERAR_ITEM" name="ALTERAR_ITEM" title="Alterar"><i class="fluigicon fluigicon-pencil icon-xs"></i></span></a>&emsp;<a id="IRMAO_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirIrmao(\''+row[i]["INDICE"]+'\');" id="INCLUIR_IRMAO" name="INCLUIR_IRMAO" title="Incluir irmão abaixo"><i class="fluigicon fluigicon-circle-arrow-down icon-sm"></i></span></a>&emsp;<a id="FILHO_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirFilho(\''+row[i]["INDICE"]+'\');" id="INCLUIR_FILHO" name="INCLUIR_FILHO" title="Incluir filho abaixo"><i class="fluigicon fluigicon-circle-arrow-bottom-right icon-sm"></i></span></a>&emsp;<a id="TROCAINDICE_LINK" href="#abrirModalTrocaIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="trocaIndice(\''+row[i]["INDICE"]+'\','+row[i]["IDCRIACAO"]+');" id="TROCA_INDICE" name="TROCA_INDICE" title="Trocar posição do item"><i class="flaticon flaticon-import-export icon-sm" aria-hidden="true"></i></span></a>&emsp;<span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="iniciarSolicitacao('+row[i]["IDCRIACAO"]+')" id="SUBCONJUNTO_LINK" name="SUBCONJUNTO_LINK" title="Cadastrar esse subconjunto em outra solicitação"><i class="fluigicon fluigicon-export icon-sm"></i></span></div>')
					
				}
				
			}
			
			//console.log("finalizei o for de i: "+i)
			
		}
		
		//console.log("Finalizei a função montarCroqui")
		
	}
	
	// ESCONDER SPAN REDUZIR
	$(".EXPANDIR").hide()
	
}


// MONTA E EXIBE O CROQUI DA ESTRUTURA 
/*function montarCroqui(sumario,arrayIdCriacao,indicesOrdenados,niveis,coresOrd) {
	
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
		
		$('.croqui').append('<span class="os" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)"><strong>OS '+os+'</strong></span><br><br>')
		//<div id="SPANEXPANSORES"><span><i class="fluigicon fluigicon-plus-circle icon-xs EXPANDIR" onclick="expandirTodos()" title="Expandir toda a árvore" onmouseover="mouse(this)" id="EXPANDIR"><span class="EXPANSORESGERAIS">&ensp;Expandir</span></i><i class="fluigicon fluigicon-minus-circle icon-xs REDUZIR" title="Reduzir toda a árvore" onmouseover="mouse(this)" onclick="reduzirTodos()" id="REDUZIR"><span class="EXPANSORESGERAIS">&ensp;Reduzir</span></i></span></div><br>

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
					
					$('.divCroqui').append('<br><div id="SPAN'+indexIndice+'" class="'+indexNivel+'"><span><i class="fluigicon fluigicon-plus-circle icon-xs EXPANDIR" onclick="expandir(\''+indexIndice+'\','+arrayIdCriacao[i]+')" id="EXPANDIR'+indexIndice+'"></i><i class="fluigicon fluigicon-minus-circle icon-xs REDUZIR" onclick="reduzir(\''+indexIndice+'\','+arrayIdCriacao[i]+')" id="REDUZIR'+indexIndice+'"></i></span>&ensp;'+checkUsin+'&ensp;'+checkCald+'&ensp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheForm('+arrayIdCriacao[i]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs" '+coresOrd[i]+'></i></span>&ensp;<span id="SPANINTERNO'+indexIndice+'" class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheCab('+arrayIdCriacao[i]+');preencheFormSemView('+arrayIdCriacao[i]+');colocaSelecao(this)"><strong>'+sumario[i]+'</strong></span>&emsp;&emsp;<a id="ALTERAR_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="alterarItem(\''+indicesOrdenados[i]+'\','+arrayIdCriacao[i]+');" id="ALTERAR_ITEM" name="ALTERAR_ITEM" title="Alterar"><i class="fluigicon fluigicon-pencil icon-xs"></i></span></a>&emsp;<a id="IRMAO_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirIrmao(\''+indicesOrdenados[i]+'\');" id="INCLUIR_IRMAO" name="INCLUIR_IRMAO" title="Incluir irmão abaixo"><i class="fluigicon fluigicon-circle-arrow-down icon-sm"></i></span></a>&emsp;<a id="FILHO_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirFilho(\''+indicesOrdenados[i]+'\');" id="INCLUIR_FILHO" name="INCLUIR_FILHO" title="Incluir filho abaixo"><i class="fluigicon fluigicon-circle-arrow-bottom-right icon-sm"></i></span></a>&emsp;<a id="TROCAINDICE_LINK" href="#abrirModalTrocaIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="trocaIndice(\''+indicesOrdenados[i]+'\','+arrayIdCriacao[i]+');" id="TROCA_INDICE" name="TROCA_INDICE" title="Trocar posição do item"><i class="flaticon flaticon-import-export icon-sm" aria-hidden="true"></i></span></a>&emsp;<span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="iniciarSolicitacao('+arrayIdCriacao[i]+')" id="SUBCONJUNTO_LINK" name="SUBCONJUNTO_LINK" title="Cadastrar esse subconjunto em outra solicitação"><i class="fluigicon fluigicon-export icon-sm"></i></span></div>')

				} else {
					// SE NÃO TEM FILHO
					
					$('.divCroqui').append('<br><div id="SPAN'+indexIndice+'" class="'+indexNivel+'"><span>&ensp;'+checkUsin+'&ensp;'+checkCald+'&ensp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)"  onclick="preencheForm('+arrayIdCriacao[i]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs" '+coresOrd[i]+'></i></span>&ensp;<span class="click" id="SPANINTERNO'+indexIndice+'" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheCab('+arrayIdCriacao[i]+');preencheFormSemView('+arrayIdCriacao[i]+');colocaSelecao(this)" ><strong>'+sumario[i]+'</strong></span></span>&emsp;&emsp;<a id="ALTERAR_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="alterarItem(\''+indicesOrdenados[i]+'\','+arrayIdCriacao[i]+');" id="ALTERAR_ITEM" name="ALTERAR_ITEM" title="Alterar"><i class="fluigicon fluigicon-pencil icon-xs"></i></span></a>&emsp;<a id="IRMAO_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirIrmao(\''+indicesOrdenados[i]+'\');" id="INCLUIR_IRMAO" name="INCLUIR_IRMAO" title="Incluir irmão abaixo"><i class="fluigicon fluigicon-circle-arrow-down icon-sm"></i></span></a>&emsp;<a id="FILHO_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)"  onclick="incluirFilho(\''+indicesOrdenados[i]+'\');" id="INCLUIR_FILHO" name="INCLUIR_FILHO" title="Incluir filho abaixo"><i class="fluigicon fluigicon-circle-arrow-bottom-right icon-sm"></i></span></a>&emsp;<a id="TROCAINDICE_LINK" href="#abrirModalTrocaIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="trocaIndice(\''+indicesOrdenados[i]+'\','+arrayIdCriacao[i]+');" id="TROCA_INDICE" name="TROCA_INDICE" title="Trocar posição do item"><i class="flaticon flaticon-import-export icon-sm" aria-hidden="true"></i></span></a>&emsp;<span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="iniciarSolicitacao('+arrayIdCriacao[i]+')" id="SUBCONJUNTO_LINK" name="SUBCONJUNTO_LINK" title="Cadastrar esse subconjunto em outra solicitação"><i class="fluigicon fluigicon-export icon-sm"></i></span></div>')
					
				}
				
			}
			
			// SE NÃO É O PRIMEIRO ITEM
			if(pontos>0){

				// SE A POSIÇÃO TEM FILHO
				if(temFilho){
					
					$('#SPAN'+indexNivel+'').append('<div id="SPAN'+indexIndice+'" class="SPAN'+indexNivel+'"><span>'+espaco+'</span><span><i class="fluigicon fluigicon-plus-circle icon-xs EXPANDIR" onclick="expandir(\''+indexIndice+'\','+arrayIdCriacao[i]+')" id="EXPANDIR'+indexIndice+'"></i><i class="fluigicon fluigicon-minus-circle icon-xs REDUZIR" onclick="reduzir(\''+indexIndice+'\','+arrayIdCriacao[i]+')" id="REDUZIR'+indexIndice+'"></i></span>&ensp;'+checkUsin+'&ensp;'+checkCald+'&ensp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheForm('+arrayIdCriacao[i]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs" '+coresOrd[i]+'></i></span>&ensp;<span id="SPANINTERNO'+indexIndice+'" class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheCab('+arrayIdCriacao[i]+');preencheFormSemView('+arrayIdCriacao[i]+');colocaSelecao(this)"><strong>'+sumario[i]+'</strong></span>&emsp;&emsp;<a id="ALTERAR_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="alterarItem(\''+indicesOrdenados[i]+'\','+arrayIdCriacao[i]+');" id="ALTERAR_ITEM" name="ALTERAR_ITEM" title="Alterar"><i class="fluigicon fluigicon-pencil icon-xs"></i></span></a>&emsp;<a id="IRMAO_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirIrmao(\''+indicesOrdenados[i]+'\');" id="INCLUIR_IRMAO" name="INCLUIR_IRMAO" title="Incluir irmão abaixo"><i class="fluigicon fluigicon-circle-arrow-down icon-sm"></i></span></a>&emsp;<a id="FILHO_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirFilho(\''+indicesOrdenados[i]+'\');" id="INCLUIR_FILHO" name="INCLUIR_FILHO" title="Incluir filho abaixo"><i class="fluigicon fluigicon-circle-arrow-bottom-right icon-sm"></i></span></a>&emsp;<a id="TROCAINDICE_LINK" href="#abrirModalTrocaIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="trocaIndice(\''+indicesOrdenados[i]+'\','+arrayIdCriacao[i]+');" id="TROCA_INDICE" name="TROCA_INDICE" title="Trocar posição do item"><i class="flaticon flaticon-import-export icon-sm" aria-hidden="true"></i></span></a>&emsp;<span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="iniciarSolicitacao('+arrayIdCriacao[i]+')" id="SUBCONJUNTO_LINK" name="SUBCONJUNTO_LINK" title="Cadastrar esse subconjunto em outra solicitação"><i class="fluigicon fluigicon-export icon-sm"></i></span></div>')
					
				} else {
					// SE NÃO TEM FILHO
					
					$('#SPAN'+indexNivel+'').append('<div id="SPAN'+indexIndice+'" class="SPAN'+indexNivel+'"><span>'+espaco+'&ensp;&nbsp;</span>&ensp;'+checkUsin+'&ensp;'+checkCald+'&ensp;<span onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheForm('+arrayIdCriacao[i]+')" title="Detalhamento do item"><i class="fluigicon fluigicon-folder-open icon-xs" '+coresOrd[i]+'></i></span>&ensp;<span id="SPANINTERNO'+indexIndice+'" class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="preencheCab('+arrayIdCriacao[i]+');preencheFormSemView('+arrayIdCriacao[i]+');colocaSelecao(this)"><strong>'+sumario[i]+'</strong></span>&emsp;&emsp;<a id="ALTERAR_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="alterarItem(\''+indicesOrdenados[i]+'\','+arrayIdCriacao[i]+');" id="ALTERAR_ITEM" name="ALTERAR_ITEM" title="Alterar"><i class="fluigicon fluigicon-pencil icon-xs"></i></span></a>&emsp;<a id="IRMAO_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirIrmao(\''+indicesOrdenados[i]+'\');" id="INCLUIR_IRMAO" name="INCLUIR_IRMAO" title="Incluir irmão abaixo"><i class="fluigicon fluigicon-circle-arrow-down icon-sm"></i></span></a>&emsp;<a id="FILHO_LINK" href="#abrirModalIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="incluirFilho(\''+indicesOrdenados[i]+'\');" id="INCLUIR_FILHO" name="INCLUIR_FILHO" title="Incluir filho abaixo"><i class="fluigicon fluigicon-circle-arrow-bottom-right icon-sm"></i></span></a>&emsp;<a id="TROCAINDICE_LINK" href="#abrirModalTrocaIndice"><span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="trocaIndice(\''+indicesOrdenados[i]+'\','+arrayIdCriacao[i]+');" id="TROCA_INDICE" name="TROCA_INDICE" title="Trocar posição do item"><i class="flaticon flaticon-import-export icon-sm" aria-hidden="true"></i></span></a>&emsp;<span class="click" onmouseover="colocaBordaSelecao(this)" onmouseout="tiraSelecao(this)" onclick="iniciarSolicitacao('+arrayIdCriacao[i]+')" id="SUBCONJUNTO_LINK" name="SUBCONJUNTO_LINK" title="Cadastrar esse subconjunto em outra solicitação"><i class="fluigicon fluigicon-export icon-sm"></i></span></div>')
					
				}
				
			}
			
			//console.log("finalizei o for de i: "+i)
			
		}
		
		//console.log("Finalizei a função montarCroqui")
		
	}
	
	// ESCONDER SPAN REDUZIR
	$(".EXPANDIR").hide()
	
}*/
   
// SE O CÓDIGO DA TAREFA FOI INFORMADO OU É VÁLIDO
function codTarefaValido(){
	
	var codtrf = $("#CODTRF").val()
	
	// SE O CÓDIGO DA TAREFA NÃO FOI INFORMADO
	/*if(codtrf=="" || codtrf==null || codtrf==undefined || codtrf=="null"){
		
		console.log("códgio na foi informado")
		
		return false
		
	} else {*/
		// SE NÃO
		
		var idprj = $("#IDPRJ_OS").val()
		var numOS = $("#NUM_OS").val()
		//var numProcesso = $("#NUMPROCESSO").val()
		
		var a1 = DatasetFactory.createConstraint("IDPRJ",idprj,idprj,ConstraintType.MUST)
		var a2 = DatasetFactory.createConstraint("NUM_OS",numOS,numOS,ConstraintType.MUST)
		
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
			
			var count = row.length
			
			// PERCORRE TODOS OS REGISTROS DA CONSULTA
			for(var i=0;i<count;i++){
				
				var rep = row[i]
				
				// SE EXISTE ALGUM CÓDIGO QUE NÃO FOI LOCALIZADO NO SOLUM
				if(rep["CODTRF"]=="" || rep["CODTRF"]==null || rep["CODTRF"]==undefined || rep["CODTRF"]=="null"){
					
					return false
					
				}
				
			}
			
			return true
			
		}
			
	//}
	
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
	//$(".SOLABERTAS").hide()
	
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
		
		var myLoading2 = FLUIGC.loading(window);
		
		myLoading2.show();
		
		setTimeout(function(){
			
			atualizar()
			
		},200)
		
		// DESATIVA O LOAD
		setTimeout(function(){
				
			myLoading2.hide();
				
		}, 500)
		
	} else {
		
		$(".BOTOES_CAB").hide()
		
	}
	
}

// SALVAR A TAREFA SELECIONADA
function salvarTarefa(){
	
	$(".INFO_TAREFA").hide()
	$(".divCroqui").show()
	$(".SOLABERTAS").show()
	
	var myLoading2 = FLUIGC.loading(window);
	
	myLoading2.show();
	
	setTimeout(function(){
	
		// SE TABELA TEM ITENS E NÃO TEM ITEM DETALHADO
		if(tabelaTemItens()){
			
			// SE NÃO TEM ITEM SENDO DETALHADO EM OUTRA SOLICITAÇÃO
			if(!temItemDetalhado()){
			
				var myLoading2 = FLUIGC.loading(window);
				
				myLoading2.show();
				
				setTimeout(function(){
					
					atualizar()
					
				},200)
				
				// DESATIVA O LOAD
				setTimeout(function(){
						
					myLoading2.hide();
						
				}, 500)
				
			} else {
				
				$(".BOTOES_CAB").hide()
				
			}
			
			// SALVAR A TAREFA EM TODOS OS ITENS DA TABELA
			salvarTarefaTabela()
			
		}
		
		// ATUALIZAR VIEW
		atualizar()
		
	},500)
	
	// DESATIVA O LOAD
	setTimeout(function(){
			
		myLoading2.hide();
			
	}, 500)
		
}

// SALVAR A TAREFA EM TODOS OS ITENS DA TABELA
function salvarTarefaTabela(){
	
	var codTarefa = $("#CODTRF").val()
	var descTarefa = $("#NOMETRF").val()
	var idTrf = $("#IDTRF").val()
	var numOS = $("#NUM_OS").val()
	var reccreatedby = $("#SOLICITANTE").val()
	var recmodifiedby = $("#SOLICITANTE").val()
	
	var a1 = DatasetFactory.createConstraint("CODTRFOS",codTarefa,codTarefa,ConstraintType.MUST);
	var a2 = DatasetFactory.createConstraint("NOMETRFOS",descTarefa,descTarefa,ConstraintType.MUST);
	var a3 = DatasetFactory.createConstraint("IDTRFOS",idTrf,idTrf,ConstraintType.MUST);
	var a4 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
	var a5 = DatasetFactory.createConstraint("RECCREATEDBY",reccreatedby,reccreatedby,ConstraintType.MUST);
	var a6 = DatasetFactory.createConstraint("RECMODIFIEDBY",recmodifiedby,recmodifiedby,ConstraintType.MUST);
	
	var constraints = new Array(a1,a2,a3,a4,a5);
	
	dataset = DatasetFactory.getDataset("dsUpdateCodTarefaGeralOS",null,constraints,null);
	
}

// CANCELA A TELA DA COPIA DA OS
function cancelarCopia(){
	
	console.log("entrei para cancelar a copia da OS")
	
	// MOSTRA/ESCONDE CAMPOS DO FORMULÁRIO
	$(".OS_COPIA").hide()
	$(".INFO_OS").show()
	
	/*
	$(".OS_COPIA").hide()
	$(".VIEW").show()
	$(".divCroqui").show()
	
	// SE TABELA TEM ITENS E NÃO TEM ITEM DETALHADO
	if(tabelaTemItens() && !temItemDetalhado()){
	
		var myLoading2 = FLUIGC.loading(window);
		
		myLoading2.show();
		
		setTimeout(function(){
			
			atualizar()
			
		},200)
		
		// DESATIVA O LOAD
		setTimeout(function(){
				
			myLoading2.hide();
				
		}, 500)
		
	} else {
		
		$(".BOTOES_CAB").hide()
		
	}
	
	// SALVO INFORMAÇÃO DO EXCLUSIVO1 PARA EDITAR
	$("#EXCLUSIVO1").val("EDITAR")
	
	// MOVIMENTA A SOLICITAÇÃO PARA SALVAR A NUMERAÇÃO DELA
	$("#workflowActions > button:first-child", window.parent.document).click();
	*/
	
}

// FAZ A EXPANSÃO DOS FILHOS DO ITEM
function expandir(idIndice, arrayIdCriacao){

	console.log("entrei para expandir SPAN"+idIndice)
	
	var numOS = $("#NUM_OS").val()
	var idCriacao = arrayIdCriacao
	
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	var c2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
	
	var constraints = new Array(c1,c2)
	var dataset = DatasetFactory.getDataset("dsSalvaExpandido",null,constraints,null)
		
	$(".SPAN"+idIndice).show()
		
	$("#EXPANDIR"+idIndice+"").hide()
	$("#REDUZIR"+idIndice+"").show()
	
}

// FAZ A REDUÇÃO DOS FILHOS DO ITEM
function reduzir(idIndice,arrayIdCriacao){
	
	console.log("entrei para reduzir SPAN"+idIndice)
	
	var numOS = $("#NUM_OS").val()
	var idCriacao = arrayIdCriacao
	
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	var c2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
	
	var constraints = new Array(c1,c2)
	var dataset = DatasetFactory.getDataset("dsSalvaReduzido",null,constraints,null)
		
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
		
		//$(".REDUZIRTODOS").hide()
		//$(".EXPANDIRTODOS").show()
		
		/*var indice = "SPAN"+id.replace(/\./g,"P")
		var indiceaux="SPAN"+id.replace(/\./g,"P")
		var indicepai;

		while($("#"+indice).is(":visible")==false){

			$("#"+indiceaux).parent().children().children()[0].click();
			indicepai=$("#"+indiceaux).parent().attr('id')
			indiceaux=indicepai;

		}*/

		/*
		var numOS = $("#NUM_OS").val()
		
		var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
		
		var constraints = new Array(c1)
		var dataset = DatasetFactory.getDataset("dsSalvaReduzido",null,constraints,null)
		
		atualizar()
		
		$(".REDUZIR").hide()
		$(".EXPANDIR").show()*/
	
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
		
		//$(".REDUZIRTODOS").show()
		//$(".EXPANDIRTODOS").hide()
	
	},500)
	
	
	/*setTimeout(function(){
	
		var numOS = $("#NUM_OS").val()
		
		var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
		
		var constraints = new Array(c1)
		var dataset = DatasetFactory.getDataset("dsSalvaExpandido",null,constraints,null)
			
		atualizar()
		
		$(".EXPANDIR").hide()
		$(".REDUZIR").show()
		
	},500)*/
	
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
	
	var idCampo = $(obj).attr("id").split("___")[0]
	
	// SE É A PRIORIDADE DO PROCESSO
	if(idCampo=="VIEWPRIORIDADE"){
		
		var prioridadeAux = $(obj).val()
		var tem = false
		var seqAux = $(obj).attr("id").split("___")[1]
		
		// PERCORRE A TABELA DA ABA PROCESSO
		$('input[id^="VIEWPRIORIDADE___"]').each(function(index, value){
			
			var seq = $(this).attr("id").split("___")[1]	
		
			var prioridade = $("#VIEWPRIORIDADE___"+seq).val()
			
			// SE PRIORIDADE JÁ FOI CADASTRADA
			if(prioridade==prioridadeAux && !(seq==seqAux)){
				
				tem = true
				
			}
			
		})
		
		console.log("tem: "+tem)
		
		// SE TEM PRIORIDADE
		if(tem){
			
			// LIMPA O CAMPO
			$(obj).val("")
			
			// EXIBE ALERTA
			Swal.fire({
				  icon:  'error',
				  title: 'A prioridade informada já foi cadastrada em outra atividade!',
				  text: 'Verifique e tente novamente'
			})
			
		}
		
	} else {
		// SE NÃO, É DOS COMPONENTES
		
		var seqAux = $(obj).attr("id").split("___")[1]
		
		var substitutoAux = $("#VIEWSUBSTITUTOCOMPONENTES___"+seqAux).val()
		var idprdAux = $("#VIEWIDPRDCOMPONENTES___"+seqAux).val()
		var prioridadeAux = $("#VIEWPRIORIDADEATVCOMPONENTES___"+seqAux).val()
		var tem = false
		
		console.log("substitutoAux: "+substitutoAux+", idprdAux: "+idprdAux+", prioridadeAux: "+prioridadeAux)
		
		// SE PRIORIDADE FOI INFORMADA
		if( !(prioridadeAux=="" || prioridadeAux==null || prioridadeAux==undefined) ){
			
			// PERCORRE A TABELA DA ABA PROCESSO
			$('input[id^="VIEWPRIORIDADE___"]').each(function(index, value){
				
				var seq = $(this).attr("id").split("___")[1]	
			
				var prioridade = $("#VIEWPRIORIDADE___"+seq).val()
				
				// SE PRIORIDADE JÁ FOI CADASTRADA
				if(prioridade==prioridadeAux){
					
					tem = true
					
				}
				
			})
			
			// SE PRIORIDADE JÁ EXISTE
			if(tem){
				
				tem = false
				
				// PERCORRE A TABELA E COLETA TODOS OS REGISTROS
				$('input[id^="VIEWPRODUTOCOMPONENTES___"]').each(function(index, value){
					
					var seq = $(this).attr("id").split("___")[1]	
					
					var substituto = $("#VIEWSUBSTITUTOCOMPONENTES___"+seq).val()
					var idprd = $("#VIEWIDPRDCOMPONENTES___"+seq).val()
					var prioridade = $("#VIEWPRIORIDADEATVCOMPONENTES___"+seq).val()
					
					if(!(seq==seqAux) && idprdAux==idprd && prioridadeAux==prioridade){
						
						tem = true
						
					}
					
				})
				
				// SE TEM PRIORIDADE PARA O MESMO COMPONENTE
				if(tem){
					
					// LIMPA O CAMPO
					$(obj).val("")
					
					// EXIBE ALERTA
					Swal.fire({
						  icon:  'error',
						  title: 'Já existe o mesmo componente vinculado a prioridade informada!',
						  text: 'Verifique e tente novamente'
					})
					
				}
				
			} else {
				// SE NÃO
				
				// LIMPA O CAMPO
				$(obj).val("")
				
				// EXIBE ALERTA
				Swal.fire({
					  icon:  'error',
					  title: 'A prioridade informada ainda não foi cadastrada na aba Processo!',
					  text: 'Verifique e tente novamente'
				})
				
			}
			
		}
		
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
	
	var pesoBruto = rep["PESOBRUTO"]
	var totalQtde = rep["TOTALQTDE"]
	var pesoUnit = rep["PESOUNITARIO"]
	var desQtde = rep["DESQTDE"]
	
	var qtdeUn = rep["QTDEUNCOMP"]
	
	/*var qtdeUnit = pesoBruto/totalQtde
	var qtdeTotal = pesoBruto*/
	
	var qtdeUnit
	var qtdeTotal
	
	if(qtdeUn=="PESOUNITARIO"){
		
		pesoUnit = pesoUnit.toString()
		pesoBruto = pesoBruto.toString()
		
		if(pesoUnit.includes(",")){
			
			pesoUnit = pesoUnit.replace(",",".")
			
		}
		
		if(pesoBruto.includes(",")){
			
			pesoBruto = pesoBruto.replace(",",".")
			
		}
		
		pesoUnit = parseFloat(pesoUnit).toFixed(4)
		pesoBruto = parseFloat(pesoBruto).toFixed(4)
		
		pesoBruto = parseFloat(pesoBruto)
		pesoBruto = pesoBruto.toFixed(4)
		
		qtdeUnit = pesoUnit.toString()
		qtdeUnit = pesoUnit.replace(".",",")
		qtdeTotal = pesoBruto.toString()
		qtdeTotal = pesoBruto.replace(".",",")
		
	}
	
	else if(qtdeUn=="DESENHO"){
		
		qtdeUnit =  parseInt(desQtde)
		qtdeTotal = parseInt(totalQtde)
		
	} 
	
	else {
		
		pesoUnit = pesoUnit.toString()
		pesoBruto = pesoBruto.toString()
		
		if(pesoUnit.includes(",")){
			
			pesoUnit = pesoUnit.replace(",",".")
			
		}
		
		if(pesoBruto.includes(",")){
			
			pesoBruto = pesoBruto.replace(",",".")
			
		}
		
		pesoUnit = parseFloat(pesoUnit).toFixed(4)
		pesoBruto = parseFloat(pesoBruto).toFixed(4)
		
		pesoBruto = parseFloat(pesoBruto)
		pesoBruto = pesoBruto.toFixed(4)
		
		qtdeUnit = pesoUnit.toString()
		qtdeUnit = pesoUnit.replace(".",",")
		qtdeTotal = pesoBruto.toString()
		qtdeTotal = pesoBruto.replace(".",",")
		
	}
	
	/*totalQtde = parseInt(totalQtde)
	pesoBruto = parseFloat(pesoBruto)
	pesoBruto = pesoBruto.toFixed(4)
	
	qtdeUnit = pesoBruto/totalQtde
	qtdeUnit = parseFloat(qtdeUnit)
	qtdeUnit = qtdeUnit.toFixed(4)
	qtdeUnit = qtdeUnit.toString()
	qtdeUnit = qtdeUnit.replace(".",",")
	qtdeTotal = pesoBruto*/
	
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
	
	var qtdeUnit = pesoBruto/totalQtde
	var qtdeTotal = pesoBruto
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
			
		} /*else {
			
			arraySubLista.push(produto)
			
		}*/
		
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
		
		/*if(lista=="L"){
		
			// PERCORRE TODOS OS ITENS DO ARRAY
			for(var i=0; i<arraySubLista.length; i++){
				
				if(!(produto==arraySubLista[i])){
					
					// PREENCHE O SELECT COM OS DADOS
					$('#VIEWSUBSTITUTOCOMPONENTES___'+seq).append($("<option class='info'></option>").attr("value", arraySubLista[i]).text(arraySubLista[i]));
					
				}
				
			}
		
		}*/
		
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
	var reccreatedby = $("#SOLICITANTE").val()
	var recmodifiedby = $("#SOLICITANTE").val()

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
	
	var pesoUnit = rep["PESOUNITARIO"]
	console.log("pesoUnit: "+pesoUnit)

	var totalQtde = rep["TOTALQTDE"]
	console.log("PESOBRUTO: "+pesoBruto)
		
	var desQtde = rep["DESQTDE"]
	desQtde = parseInt(desQtde)
	console.log("desQtde: "+desQtde)
	
	totalQtde = parseInt(totalQtde)
	console.log("TOTALQTDE: "+totalQtde)
	
	var qtdeUnComp = rep["QTDEUNCOMP"]

	/*
	var qtdeUnit = pesoBruto/totalQtde
	var qtdeTotal = pesoBruto*/
	
	var qtdeUnit
	var qtdeTotal
	
	if(qtdeUnComp=="DESENHO"){
		
		qtdeUnit = desQtde
		qtdeTotal = totalQtde
			
	}
	
	if(qtdeUnComp=="PESOUNCOMP"){
		
		qtdeUnit = pesoUnit * desQtde
		qtdeTotal = pesoBruto
			
	}
	
	/*if(pesoBruto.includes(",")){
		
		pesoBruto = pesoBruto.replace(",",".")
		
	}
	
	if(pesoUnit.includes(",")){
		
		pesoUnit = pesoUnit.replace(",",".")
		
	}
	
	if(totalQtde.includes(",")){
		
		totalQtde = totalQtde.replace(",",".")
		
	}
	
	if(desQtde.includes(",")){
		
		desQtde = desQtde.replace(",",".")
		
	}*/
	
	//
	/*pesoBruto = parseFloat(pesoBruto)
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
		
	}*/
	
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
				var c5 = DatasetFactory.createConstraint("RECCREATEDBY",reccreatedby,reccreatedby,ConstraintType.MUST);
				var c6 = DatasetFactory.createConstraint("RECMODIFIEDBY",recmodifiedby,recmodifiedby,ConstraintType.MUST);

				var constraints = new Array(c1,c2,c3,c4,c5,c6)
				
				var dataset = DatasetFactory.getDataset("dsUpdateQtdeComponentesOS",null,constraints,null)
			
			}
			
		}
		
	}
		
}

// CALCULA A QUANTIDADE DA TABELA DE COMPONENTES
function calculaQtdesComponentes(idCriacao){
	
	console.log("entrei para calcular as quantidades dos componentes")
	
	var totalQtde = $("#F_TOTALQTDE").val()
	var desQtde = $("#F_DESQTDE").val()
	var pesoBruto = $("#F_PESOBRUTO").val()
	var pesoUnit = $("#F_PESOUNITARIO").val()
	var pesoUnitLiq = $("#F_PESOUNLIQUIDO").val()

	console.log("pesoBruto: "+pesoBruto)
	console.log("totalQtde: "+totalQtde)
	console.log("desQtde: "+desQtde)
	console.log("pesoUnit: "+pesoUnit)	
	console.log("pesoUnitLiq: "+pesoUnitLiq)
	
	var qtdeUnComp = $("#VALOR_RADIO4").val()
	
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
	var qtdeTotal = pesoBruto
	
	var qtdeUnit = pesoBruto/totalQtde
	var qtdeTotal = pesoBruto */
	
	var qtdeUnit
	var qtdeTotal

	// SE QTDE UN COMP É DESENHO
	if(qtdeUnComp=="DESENHO"){
		
		qtdeUnit = desQtde
		qtdeTotal = totalQtde
			
	}
	
	// SE QTDE UN COMP É PESOUNITARIO
	if(qtdeUnComp=="PESOUNITARIO"){
		
		if(totalQtde.includes(",")){
			
			totalQtde = totalQtde.replace(",",".")
		
		}
		totalQtde = parseInt(totalQtde)
		
		if(desQtde.includes(",")){
			
			desQtde = desQtde.replace(",",".")
		
		}
		desQtde = parseInt(desQtde)
		
		if(pesoBruto.includes(",")){
			
			pesoBruto = pesoBruto.replace(",",".")
		
		}
		pesoBruto = parseFloat(pesoBruto)
		
		if(pesoUnit.includes(",")){
			
			pesoUnit = pesoUnit.replace(",",".")
		
		}
		pesoUnit = parseFloat(pesoUnit)
		
		qtdeUnit = pesoUnit * desQtde
		
		qtdeUnit = qtdeUnit.toString().replace(".",",")
		
		qtdeTotal = pesoBruto.toString().replace(".",",") 
			
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
	
	// CALCULA A QUANTIDADE DA TABELA DE COMPONENTES
	calculaQtdesComponentesGeral(idCriacao)

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
	
	var reccreatedby = $("#SOLICITANTE").val()
	var recmodifiedby = $("#SOLICITANTE").val()
	
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
			var c14 = DatasetFactory.createConstraint("RECCREATEDBY",reccreatedby,reccreatedby,ConstraintType.MUST);
			var c15 = DatasetFactory.createConstraint("RECMODIFIEDBY",recmodifiedby,recmodifiedby,ConstraintType.MUST);
			
			var constraints = new Array(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c14,c15);
			
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
	
	var reccreatedby = $("#SOLICITANTE").val()
	var recmodifiedby = $("#SOLICITANTE").val()

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
		var c24 = DatasetFactory.createConstraint("RECCREATEDBY",reccreatedby,reccreatedby,ConstraintType.MUST);
		var c25 = DatasetFactory.createConstraint("RECMODIFIEDBY",recmodifiedby,recmodifiedby,ConstraintType.MUST);
		
		var constraints = new Array(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c14,c15,c16,c17,c18,c19,c20,c21,c22,c23,c24,c25);
		
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
	$("#F_CODIGOTRFPAI").val("")
	$("#F_CODTRFPAI").val("")
	$("#F_IDTRFPAI").val("")
	$("#F_NOMETRFPAI").val("")
	$("#EXECUCOES").val("")
	
	// TIRA A SELECAO DO ITEM
	tiraSelecao()
	
}

// PREENCHE O FORMULÁRIO COM OS DADOS DO ITEM DO CROQUI SELECIONADO
function preencheForm(arrayIdCriacao) {
	
	var myLoading2 = FLUIGC.loading(window);
	
	myLoading2.show();
	
	setTimeout(function(){
		
		console.log("entrei para preencher o formulário do idCriacao: "+arrayIdCriacao)
	
		var atv = $("#ATIVIDADE").val()
		var numOS = $("#NUM_OS").val()
		var idCriacao = arrayIdCriacao
		
		$(".FORMULARIO").show()
		$(".CABECALHO").hide()
		$(".VIEW").hide()
		//$(".SOLABERTAS").hide()
		
		// LIMPA O FORMULÁRIO
		limparForm()
		
		// PREENCHE O FORMULÁRIO COM OS DADOS DO ITEM SELECIONADO NA TABELA
		// CONSTRÓI A CONSULTA DO DATASET
		var a1 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
		var a2 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
		
		var constraints = new Array(a1,a2)
		var dataset = DatasetFactory.getDataset("dsBuscaItemEstruturaOS",null,constraints,null)
	
		var row = dataset.values
		
		reloadZoomFilterValues("ITEM_DE_RETORNO", "IDCRIACAO,"+idCriacao+",OS,"+numOS);
		
		// SE O RETORNO NÃO É NULO E NEM VAZIO
		if(!(row=="" || row==null || row==undefined || row=="null")){
			
			var rep = row[0]
			
			// PEGA OS DADOS
			var posicaoIndice = rep["POSICAOINDICE"]
			var posicaoDesenho = rep["POSICAODESENHO"]
			var indiceAntigo = rep["INDICEANTIGO"]
			var nivel = rep["NIVEL"]
			var numdbi = rep["NUMDBI"]
			var revisaodbi = rep["REVISAODBI"]
			var numdesenho = rep["NUMDESENHO"]
			var revisaodesenho = rep["REVISAODESENHO"]
			var desqtde = rep["DESQTDE"]
			var totalqtde = rep["TOTALQTDE"]
			var descricao = rep["DESCRICAO"]
			var codTarefa = rep["CODTRFOS"]
			var dscTarefa = rep["DSCTRFOS"]
			var comporLista = rep["COMPORLISTA"]
			var opsUnitarias = rep["OPSUNITARIAS"]
			var tipoDesenho = rep["TIPODESENHO"]
			var comporLista = rep["COMPORLISTA"]
			var qtdeUnComp = rep["QTDEUNCOMP"]

			console.log("compor lista: "+comporLista)
			
			var bitola = rep["BITOLA"]
			bitola = bitola.toString()
			bitola = bitola.replace(".",",")
			
			var espessura = rep["ESPESSURA"]
			espessura = espessura.toString()
			espessura = espessura.replace(".",",")
			
			var largura = rep["LARGURA"]
			largura = largura.toString()
			largura = largura.replace(".",",")
			
			var massaLinear = rep["MASSALINEAR"]
			massaLinear = massaLinear.toString()
			massaLinear = massaLinear.replace(".",",")
			
			var esprosca = rep["ESPROSCA"]
			esprosca = esprosca.toString()
			esprosca = esprosca.replace(".",",")
			
			var diametroExterno = rep["DIAMETROEXTERNO"]
			diametroExterno = diametroExterno.toString()
			diametroExterno = diametroExterno.replace(".",",")
			
			var diametroInterno = rep["DIAMETROINTERNO"]
			diametroInterno = diametroInterno.toString()
			diametroInterno = diametroInterno.replace(".",",")
			
			var comprimento = rep["COMPRIMENTO"]
			comprimento = comprimento.toString()
			comprimento = comprimento.replace(".",",")
			
			var dataRevisao = rep["DATAREVISAO"]
			var obsDesenho = rep["OBSERVACOESDESENHO"]
			
			var pesoBruto = rep["PESOBRUTO"]
			pesoBruto = pesoBruto.toString()
			pesoBruto = pesoBruto.replace(".",",")
			
			var pesoUnit = rep["PESOUNITARIO"]
			pesoUnit = pesoUnit.toString()
			pesoUnit = pesoUnit.replace(".",",")
			
			var pesoUnitLiq = rep["PESOUNLIQUIDO"]
			pesoUnitLiq = pesoUnitLiq.toString()
			pesoUnitLiq = pesoUnitLiq.replace(".",",")
			
			var pesoLiquido = rep["PESOLIQUIDO"]
			pesoLiquido = pesoLiquido.toString()
			pesoLiquido = pesoLiquido.replace(".",",")
			
			var perimetroCorte = rep["PERIMETROCORTE"]
			perimetroCorte = perimetroCorte.toString()
			perimetroCorte = perimetroCorte.replace(".",",")
			
			var areaPintura = rep["AREAPINTURA"]
			areaPintura = areaPintura.toString()
			areaPintura = areaPintura.replace(".",",")
			
			var obsProcesso = rep["OBSPROCESSO"]
			var obsGeral = rep["OBSGERAL"]
			var tipoDesenho = rep["TIPODESENHO"]
			
			var areaSecao = rep["AREASECAO"]
			areaSecao = areaSecao.toString()
			areaSecao = areaSecao.replace(".",",")
			
			var altura = rep["ALTURA"]
			altura = altura.toString()
			altura = altura.replace(".",",")
			
			var larguraAba = rep["LARGURAABA"]
			larguraAba = larguraAba.toString()
			larguraAba = larguraAba.replace(".",",")
			
			var espAlma = rep["ESPALMA"]
			espAlma = espAlma.toString()
			espAlma = espAlma.replace(".",",")
			
			var espAba = rep["ESPABA"]
			espAba = espAba.toString()
			espAba = espAba.replace(".",",")
			
			var material = rep["MATERIAL"]
			var indice = rep["INDICE"]
			var produtoRM = rep['PRODUTORM']
			var idCriacao = rep["IDCRIACAO"]
			var ordem = rep["ORDEM"]
			var undMedida = rep["UNDMEDIDA"]
			var idPrd = rep["IDPRD"]
			var codigoPrd = rep["CODIGOPRD"]
			var integrado = rep["INTEGRADO"]
			var observacoes = rep["OBSERVACOES"]
			var seq = rep["SEQ"]
			var codigoTarefa = rep["CODIGOTAREFADESC"]
			var nomeTrfItem = rep["NOMETRFITEM"]
			var codTrfItem = rep["CODTRFITEM"]
			var idTrfItem = rep["IDTRFITEM"]
			var numDocDelp = rep["NUMDOCDELP"]
			var revisaoDocDelp = rep["REVISAODOCDELP"]
			var diametroExtDisco = rep["DIAMETROEXTERNODISCO"]
			var diametroIntDisco = rep["DIAMETROINTERNODISCO"]
			var codcoligada = rep["CODCOLIGADA"]
			var itemRetorno = rep["ITEMDERETORNO"]
			
			if(!(idPrd=="" || idPrd==null || idPrd==undefined || idPrd=="null")){
				
				// CONSTRÓI A CONSULTA DO DATASET
				var d1 = DatasetFactory.createConstraint("IDPRD",idPrd,idPrd,ConstraintType.MUST)
				var d2 = DatasetFactory.createConstraint("CODCOLIGADA",codcoligada,codcoligada,ConstraintType.MUST)
				
				var constraints2 = new Array(d1,d2)
				var dataset2 = DatasetFactory.getDataset("dsBuscaProdutoRM",null,constraints2,null)
			
				var row2 = dataset2.values[0]
				
				if(!(row2["PRODUTO"]=="" || row2["PRODUTO"]==null || row2["PRODUTO"]==undefined || row2["PRODUTO"]=="null")){
					$("#F_PRODUTO_RM").val(row2["PRODUTO"])
				}
				
			} 
			
			if(!(numDocDelp=="" || numDocDelp==null || numDocDelp==undefined || numDocDelp=="null")){
				$("#F_NUMDOCDELP").val(numDocDelp)
			}
			if(!(revisaoDocDelp=="" || revisaoDocDelp==null || revisaoDocDelp==undefined || revisaoDocDelp=="null")){
				$("#F_REVISAODOCDELP").val(revisaoDocDelp)
			}
			if(!(nivel=="" || nivel==null || nivel==undefined || nivel=="null")){
				$("#F_NIVEL").val(nivel)
			}
			if(!(undMedida=="" || undMedida==null || undMedida==undefined || undMedida=="null")){
				$("#F_UNDMEDIDA").val(undMedida)
			}
			if(!(posicaoIndice=="" || posicaoIndice==null || posicaoIndice==undefined || posicaoIndice=="null")){
				$("#F_POSICAOINDICE").val(posicaoIndice)
			}
			if(!(indiceAntigo=="" || indiceAntigo==null || indiceAntigo==undefined || indiceAntigo=="null")){
				$("#F_INDICEANTIGO").val(indiceAntigo)
			}
			if(!(indice=="" || indice==null || indice==undefined || indice=="null")){
				$("#F_INDICE").val(indice)
			}
			if(!(posicaoDesenho=="" || posicaoDesenho==null || posicaoDesenho==undefined || posicaoDesenho=="null")){
				$("#F_POSICAODESENHO").val(posicaoDesenho)
			}
			if(!(numdbi=="" || numdbi==null || numdbi==undefined || numdbi=="null")){
				$("#F_NUMDBI").val(numdbi)
			}
			if(!(revisaodbi=="" || revisaodbi==null || revisaodbi==undefined || revisaodbi=="null")){
				$("#F_REVISAODBI").val(revisaodbi)
			}
			if(!(numdesenho=="" || numdesenho==null || numdesenho==undefined || numdesenho=="null")){
				$("#F_NUMDESENHO").val(numdesenho)
			}
			if(!(revisaodesenho=="" || revisaodesenho==null || revisaodesenho==undefined || revisaodesenho=="null")){
				$("#F_REVISAODESENHO").val(revisaodesenho)
			}
			if(!(desqtde=="" || desqtde==null || desqtde==undefined || desqtde=="null")){
				$("#F_DESQTDE").val(desqtde)
			}
			if(!(totalqtde=="" || totalqtde==null || totalqtde==undefined || totalqtde=="null")){
				$("#F_TOTALQTDE").val(totalqtde)	
			}
			if(!(descricao=="" || descricao==null || descricao==undefined || descricao=="null")){
				$("#F_DESCRICAO").val(descricao)	
			}
			if(!(bitola=="" || bitola==null || bitola==undefined || bitola=="null")){
				$("#F_BITOLA").val(bitola)	
			}
			if(!(espessura=="" || espessura==null || espessura==undefined || espessura=="null")){
				$("#F_ESPESSURA").val(espessura)	
			}
			if(!(largura=="" || largura==null || largura==undefined || largura=="null")){
				$("#F_LARGURA").val(largura)	
			}
			if(!(massaLinear=="" || massaLinear==null || massaLinear==undefined || massaLinear=="null")){
				$("#F_MASSALINEAR").val(massaLinear)	
			}
			if(!(esprosca=="" || esprosca==null || esprosca==undefined || esprosca=="null")){
				$("#F_ESPROSCA").val(esprosca)	
			}
			if(!(comprimento=="" || comprimento==null || comprimento==undefined || comprimento=="null")){
				$("#F_COMPRIMENTO").val(comprimento)	
			}
			if(!(material=="" || material==null || material==undefined || material=="null")){
				$("#F_MATERIAL").val(material)	
			}
			/*if(!(produtoRM=="" || produtoRM==null || produtoRM==undefined || produtoRM=="null")){
				$("#F_PRODUTO_RM").val(produtoRM)	
			}*/
			if(!(idPrd=="" || idPrd==null || idPrd==undefined || idPrd=="null")){
				$("#F_IDPRD").val(idPrd)	
			}
			if(!(codigoPrd=="" || codigoPrd==null || codigoPrd==undefined || codigoPrd=="null")){
				$("#F_CODIGOPRD").val(codigoPrd)	
			}
			if(!(idCriacao=="" || idCriacao==null || idCriacao==undefined || idCriacao=="null")){
				$("#F_IDCRIACAO").val(idCriacao)	
			}
			if(!(observacoes=="" || observacoes==null || observacoes==undefined || observacoes=="null")){
				$("#F_OBSERVACOES").val(observacoes)	
			}
			if(!(seq=="" || seq==null || seq==undefined || seq=="null")){
				$("#F_SEQ").val(seq)	
			}
			if(!(numOS=="" || numOS==null || numOS==undefined || numOS=="null")){
				$("#F_OS").val(numOS)	
			}
			if(!(diametroInterno=="" || diametroInterno==null || diametroInterno==undefined || diametroInterno=="null")){
				$("#F_DIAMETROINTERNO").val(diametroInterno)	
			}
			if(!(diametroExterno=="" || diametroExterno==null || diametroExterno==undefined || diametroExterno=="null")){
				$("#F_DIAMETROEXTERNO").val(diametroExterno)	
			}
			if(!(dataRevisao=="" || dataRevisao==null || dataRevisao==undefined || dataRevisao=="null")){
				$("#F_DATAREVISAO").val(dataRevisao)	
			}
			if(!(obsDesenho=="" || obsDesenho==null || obsDesenho==undefined || obsDesenho=="null")){
				$("#F_OBSERVACOESDESENHO").val(obsDesenho)	
			}
			if(!(pesoBruto=="" || pesoBruto==null || pesoBruto==undefined || pesoBruto=="null")){
				$("#F_PESOBRUTO").val(pesoBruto)	
			}
			if(!(pesoUnit=="" || pesoUnit==null || pesoUnit==undefined || pesoUnit=="null")){
				$("#F_PESOUNITARIO").val(pesoUnit)	
			}
			if(!(pesoUnitLiq=="" || pesoUnitLiq==null || pesoUnitLiq==undefined || pesoUnitLiq=="null")){
				$("#F_PESOUNLIQUIDO").val(pesoUnitLiq)	
			}
			if(!(pesoLiquido=="" || pesoLiquido==null || pesoLiquido==undefined || pesoLiquido=="null")){
				$("#F_PESOLIQUIDO").val(pesoLiquido)	
			}
			if(!(perimetroCorte=="" || perimetroCorte==null || perimetroCorte==undefined || perimetroCorte=="null")){
				$("#F_PERIMETROCORTE").val(perimetroCorte)	
			}
			if(!(areaPintura=="" || areaPintura==null || areaPintura==undefined || areaPintura=="null")){
				$("#F_AREAPINTURA").val(areaPintura)	
			}
			if(!(obsProcesso=="" || obsProcesso==null || obsProcesso==undefined || obsProcesso=="null")){
				$("#F_OBSPROCESSO").val(obsProcesso)	
			}
			if(!(obsGeral=="" || obsGeral==null || obsGeral==undefined || obsGeral=="null")){
				$("#F_OBSGERAL").val(obsGeral)	
			}
			if(!(tipoDesenho=="" || tipoDesenho==null || tipoDesenho==undefined || tipoDesenho=="null")){
				$("#VALOR_RADIO2").val(tipoDesenho)
			}
			if(!(qtdeUnComp=="" || qtdeUnComp==null || qtdeUnComp==undefined || qtdeUnComp=="null")){
				$("#VALOR_RADIO4").val(qtdeUnComp)
			}
			if(!(areaSecao=="" || areaSecao==null || areaSecao==undefined || areaSecao=="null")){
				$("#F_AREASECAO").val(areaSecao)	
			}
			if(!(altura=="" || altura==null || altura==undefined || altura=="null")){
				$("#F_ALTURA").val(altura)	
			}
			if(!(larguraAba=="" || larguraAba==null || larguraAba==undefined || larguraAba=="null")){
				$("#F_LARGURAABA").val(larguraAba)	
			}
			if(!(espAlma=="" || espAlma==null || espAlma==undefined || espAlma=="null")){
				$("#F_ESPALMA").val(espAlma)	
			}
			if(!(espAba=="" || espAba==null || espAba==undefined || espAba=="null")){
				$("#F_ESPABA").val(espAba)	
			}
			if(!(codigoTarefa=="" || codigoTarefa==null || codigoTarefa==undefined || codigoTarefa=="null")){
				$("#F_CODIGOTAREFA").val(codigoTarefa)	
			}
			if(!(nomeTrfItem=="" || nomeTrfItem==null || nomeTrfItem==undefined || nomeTrfItem=="null")){
				$("#F_NOMETRFITEM").val(nomeTrfItem)	
			}
			if(!(codTrfItem=="" || codTrfItem==null || codTrfItem==undefined || codTrfItem=="null")){
				$("#F_CODTRFITEM").val(codTrfItem)	
			}
			if(!(idTrfItem=="" || idTrfItem==null || idTrfItem==undefined || idTrfItem=="null")){
				$("#F_IDTRFITEM").val(idTrfItem)	
			}
			if(!(diametroExtDisco=="" || diametroExtDisco==null || diametroExtDisco==undefined || diametroExtDisco=="null")){
				$("#F_DIAMETROEXTERNODISCO").val(diametroExtDisco)	
			}
			if(!(diametroIntDisco=="" || diametroIntDisco==null || diametroIntDisco==undefined || diametroIntDisco=="null")){
				$("#F_DIAMETROINTERNODISCO").val(diametroIntDisco)	
			}
			if(!(itemRetorno=="" || itemRetorno==null || itemRetorno==undefined || itemRetorno=="null")){

				$("#F_ITEMRETORNO").val(itemRetorno)	

				var z1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
				var z2 = DatasetFactory.createConstraint("IDCRIACAO",itemRetorno,itemRetorno,ConstraintType.MUST)
				
				var constraints = new Array(z1,z2)
				var dataset = DatasetFactory.getDataset("dsBuscaItemEstruturaOS",null,constraints,null)
				var row_z = dataset.values

				setZoomData("ITEM_DE_RETORNO",row_z[0]["INDICE"] + " - " + row_z[0]["DESCRICAO"])

			}
			
			// SE ITEM IRÁ COMPOR A LISTA
			if(comporLista=="SIM"){
				
				 $("#F_COMPORLISTA").prop("checked", true);
				
			} else {
				
				 $("#F_COMPORLISTA").prop("checked", false);
				
			}
			
			// SE ITEM TEM OPSUNITARIAS
			if(opsUnitarias=="SIM"){
				
				 $("#F_OPSUNITARIAS").prop("checked", true);
				
			} else {
				
				 $("#F_OPSUNITARIAS").prop("checked", false);
				
			}
			
			console.log("----------- TIPO DESENHO: "+tipoDesenho)
		
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
				
				console.log("vou checar o NAOMANUFATURADO")
				
				$("#RAD2_NAOMANUF").prop("checked",true)
				
			}

			// SE TIPO DO DESENHO FOR INDUSTRIALIZACAO
			if(tipoDesenho=='INDUSTRIALIZACAO'){
	
				console.log("vou checar o INDUSTRIALIZACAO")
				
				$("#RAD2_INDUSTR").prop("checked",true)
				
			}
			
			console.log("qtdeUnComp: "+qtdeUnComp)

			// SE QTDE UN COMPONENTES É DESENHO
			if(qtdeUnComp=="DESENHO"){
				
				console.log("vou checar a opção DESENHO")
				
				$("#RAD4_DESENHO").prop("checked",true)
				
			}
			
			// SE QTDE UN COMPONENTES É PESOUNITÁRIO
			if(qtdeUnComp=="PESOUNITARIO"){
				
				console.log("vou checar a opção PESOUNITARIO")

				$("#RAD4_PESOUN").prop("checked",true)
				
			}
			
		}
		
		var atv = $("#ATIVIDADE").val()
		var atv = parseInt(atv)
		
		// SE ESTRUTURA JÁ FOI INTEGRADA
		/*if(!(atv==25)){
		
			// PREENCHE A TABELA COMPONENTES DO ITEM SELECIONADO QUE ESTÃO NA LISTA DE MATERIAIS
			preencheTabelaComponentesListaMateriais(idCriacao)
		
		}*/
		
		// PREENCHE A TABELA COMPONENTES DO ITEM SELECIONADO
		preencheTabelaComponentes(idCriacao)
		
		// PREENCHE A TABELA COMPONENTES DO ITEM SELECIONADO
		preencheTabelaProcessos(idCriacao)
		
		// ESCONDE/MOSTRA OS BOTÕES
		$(".INCLUIR").hide()
		$(".CANCELAR").show()
		
		$(".SALVAR2").hide()
		$(".SALVAR").hide()
		$(".REMOVER").hide()
		$("#DIV_INDICECOPIA").hide()
		
		// VERIFICA SE TEM REGISTROS PARA LIBERAR OU NÃO FUNCIONALIDADE DE CÓPIA
		//verificaItensCopia()
		
		if(atv==14){
			
			$(".EDITAR").hide()
			
		} else {

			// SE ITEM ESTÁ SENDO DETALHADO EM OUTRA SOLICITAÇÃO
			if(itemEstaDetalhado(idCriacao)){
				
				$(".EDITAR").hide()
				
			} else {
				
				$(".EDITAR").show()
				
			}
		
		}
		
		// DESABILITA OS CAMPOS PREENCHIDOS
		desabilitaCampos()
		
		// ATIVA A ABA DESENHO
		ativaAbaDesenho()
		
		// COLOCA O FOCO NO INÍCIO DO FORMULÁRIO
		$("#F_OS").focus();
		
		// SE ATIVIDADE É IGUAL A DE APROVAÇÃO
		if(atv==14){
			
			$(".APROVACAO").hide()
			
		}
		
		// MOSTRA OS CAMPOS NECESSÁRIOS
		/*$("#DIV_INDICECOPIA").parent("div").show()
		$("#ID_ADICIONARPROCESSO").show()*/
		
		// DESABILITAR TEMPORARIAMENTE O RADIO DE INDUSTRIALIZAÇÃO
		// $("#RAD2_INDUSTR").prop("disabled",true)
		
	},500)
	
	// DESATIVA O LOAD
	setTimeout(function(){
			
		myLoading2.hide();
			
	}, 500)
		
}

// VERIFICA SE PRODUTO TEM ESTRUTURA CRIADA
function temEstrutura(idprd){

	console.log("verifica se o produto já teve estrutura criada")
	
	var numOS = $("#NUM_OS").val()
	var codColigada = $("#CODCOLIGADA").val()
	var codFilial = $("#CODFILIAL").val()
	
	console.log("numOS: "+numOS+", codColigada: "+codColigada+", codFilial: "+codFilial+", idprd: "+idprd)
	
	var ret = true
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("IDPRD",idprd,idprd,ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("CODCOLIGADA",codColigada,codColigada,ConstraintType.MUST);
	var c4 = DatasetFactory.createConstraint("CODFILIAL",codFilial,codFilial,ConstraintType.MUST);
	
	var constraints = new Array(c1,c2,c3,c4);
	
	var dataset = DatasetFactory.getDataset("dsTemEstrutura",null,constraints,null);
	
	var row = dataset.values;
	
	console.log("row")
	console.log(row)
	
	// SE RETORNO NÃO É VAZIO
	if(!(row=="" || row==undefined || row==null || row=="null")){
		
		return true
		
	} else {
		// SE NÃO
		
		return false
		
	}
	
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
	$("#F_PESOUNLIQUIDO").prop("readonly",true)
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

	$("#ITEM_DE_RETORNO").prop("disabled",true)
	
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
	$("#DIV_INDICECOPIA").parent("div").hide()
	
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

// PERCORRE OS CAMPOS DO FORMULÁRIO E HABILITA-OS
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
	$("#F_PESOUNLIQUIDO").prop("readonly",false)
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
	
	if($("#F_COMPORLISTA").prop("checked")){

		$("#ADICIONARCOMPONENTE").hide()

	}
	
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
	
	//$("#ADICIONARPROCESSO").show()
	
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
	var qtdeUnComp = $("#VALOR_RADIO4").val()
	
	console.log("--------------------- TIPO DESENHO: "+tipoDesenho+", qtdeUnComp: "+qtdeUnComp)
	
	$("#ITEM_DE_RETORNO").prop("disabled",false)

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

		$("#ITEM_DE_RETORNO").prop("disabled",true)
		
	}
	
	// SE TIPO DO DESENHO FOR INDUSTRIALIZAÇÃO
	if(tipoDesenho=='INDUSTRIALIZACAO'){
		
		console.log("vou checar INDUSTRIALIZACAO")
		
		$("#RAD2_INDUSTR").prop("checked",true)

		$("#ITEM_DE_RETORNO").prop("disabled",true)
		
	}

	if($("#F_NIVEL").val()=="" || $("#F_NIVEL").val()=="null"  || $("#F_NIVEL").val()==null || $("#F_NIVEL").val()==undefined  ){

		$("#ITEM_DE_RETORNO").prop("disabled",true)

	}
	
	// SE QTDE UN COMP É DESENHO
	if(qtdeUnComp=="DESENHO"){
		
		$("#RAD4_DESENHO").prop("checked",true)
		
	}
	
	// SE QTDE UN COMP É PESO UNITÁRIO
	if(qtdeUnComp=="PESOUNITARIO"){
		
		$("#RAD4_PESOUN").prop("checked",true)
		
	}
	
	// HABILITA OS RADIOS
	$("#RAD2_ACABADO").prop("disabled",false)
	$("#RAD2_SEMI").prop("disabled",false)
	$("#RAD2_NAOMANUF").prop("disabled",false)
	$("#RAD2_INDUSTR").prop("disabled",false)
	$("#RAD4_DESENHO").prop("disabled",false)
	$("#RAD4_PESOUN").prop("disabled",false)
	
	// DESABILITAR TEMPORARIAMENTE O RADIO DE INDUSTRIALIZAÇÃO
	// $("#RAD2_INDUSTR").prop("disabled",true)
	
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
	    
		   var myLoading2 = FLUIGC.loading(window);
	
			myLoading2.show();
	
			// INICIA A OPERAÇÃO DEPOIS DE CARREGAR O LOAD
			setTimeout(function(){
		  
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
		    
			},500)
			
			// DESATIVA O LOAD
			setTimeout(function(){
					
				myLoading2.hide();
					
			}, 500)
			
				
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

// PERCORRE A VIEW DOS COMPONENTES E LIMPA A INFORMAÇÃO DA PRIORIDADE DESSA ATIVIDADE
function verificaPrioridadeComp(prioridade){
	
	console.log("percorre a view dos componentes e limpa a informação da prioridade da atividade removida com prioridade "+prioridade)
	
	// PERCORRE TODOS OS COMPONENTES
	$("input[id^='VIEWCODUNDCOMPONENTES___']").each(function(){
		
		var seq = $(this).attr("id").split("___")[1]
		
		var prioridadeAux = $("#VIEWPRIORIDADEATVCOMPONENTES___"+seq).val()
		var listaComp = $("#VIEWLISTACOMPONENTES___"+seq).val()
		
		console.log("prioridade: "+prioridade+", prioridadeAux: "+prioridadeAux+", listaComp: "+listaComp)
		
		// SE NÃO É UM ITEM DA LISTA DE MATERIAIS
		if(!(listaComp=="L")){
			
			// SE É A MESMA PRIORIDADE
			if(prioridadeAux==prioridade){
				
				// LIMPA A PRIORIDADE
				$("#VIEWPRIORIDADEATVCOMPONENTES___"+seq).val("")
				
			}
			
		}
		
	})
	
}

// VERIFICA SE ITEM JÁ FOI SALVO NA LISTA DE MATERIAIS E EXIBE ALERTA
function verificaItemLista(){
	
	console.log("vou verificar se o tem foi salvo na lista de materiais")
	
	var numOS = $("#NUM_OS").val()
	var idCriacao = $("#F_IDCRIACAO").val()	
	
	console.log("numOS: "+numOS+", idCriacao: "+idCriacao)
	
	var b1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	var b2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
	
	var constraints = new Array(b1,b2)
	
	var dataset = DatasetFactory.getDataset("dsVerificaListaSalvosOS",null,constraints,null)
	
	var row = dataset.values
	
	console.log("row")
	console.log(row)
	
	var rep = row[0]
	
	// SE ITEM FOI SALVO NA LISTA DE MATERIAIS
	if(!(rep["IDCRIACAOSALVOS"]=="" || rep["IDCRIACAOSALVOS"]=="null" || rep["IDCRIACAOSALVOS"]==null || rep["IDCRIACAOSALVOS"]==undefined)){
		
		// EXIBE ALERTA
		Swal.fire({
			
			  title: 'Este item já foi salvo na Lista de Materiais. Deseja removê-lo da aba salvos?',
			  icon: 'warning',
			  showCancelButton: true,
			  allowEscapeKey: true,
			  allowOutsideClick: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#F08E8E',
			  confirmButtonText: 'Sim',
			  cancelButtonText: 'Não',

		}).then(function(result){
			
		  // SE SIM
		  if(result.value){
			  
			  console.log("vou remover o item da aba salvos da Lista de Materiais")
			  
			  console.log("numOS: "+numOS+", idCriacao: "+idCriacao)
				
			  var b1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
			  var b2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
				
			  var constraints = new Array(b1,b2)
				
			  var dataset = DatasetFactory.getDataset("dsDeleteItemListaSalvos",null,constraints,null)
				
		  } 
		
		})
			
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

// REMOVE ITENS DA TABELA DE PROCESSO DE UM DETERMINADO ITEM
function removeProcesso(idCriacao){
	
	var numOS = $("#NUM_OS").val()

	console.log("numOS: "+numOS+", idCriacao: "+idCriacao)
	
	console.log("Vou remover da tabela processo o idCriacao: "+idCriacao)
	
	// SE IDCRIACAO FOI PREENCHIDO
	if(!(idCriacao=="" || idCriacao==null || idCriacao==undefined)){
		
		// CONSTRÓI A CONSULTA DO DATASET
		var a1 = DatasetFactory.createConstraint("IDCRIACAOPROCESSO",idCriacao,idCriacao,ConstraintType.MUST)
		var a2 = DatasetFactory.createConstraint("OSPROCESSO",numOS,numOS,ConstraintType.MUST)
		
		var constraints = new Array(a1,a2)
		
		var dataset = DatasetFactory.getDataset("dsDeleteProcessoOS",null,constraints,null)
		
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
	var reccreatedby = $("#SOLICITANTE").val()
	var recmodifiedby = $("#SOLICITANTE").val()
		
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
	var a7 = DatasetFactory.createConstraint("RECCREATEDBY",reccreatedby,reccreatedby,ConstraintType.MUST);
	var a8 = DatasetFactory.createConstraint("RECMODIFIEDBY",recmodifiedby,recmodifiedby,ConstraintType.MUST);

	var constraints = new Array(a1,a2,a3,a4,a5,a6,a7,a8)
	
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
	var reccreatedby = $("#SOLICITANTE").val()
	var recmodifiedby = $("#SOLICITANTE").val()
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
	//var c2 = DatasetFactory.createConstraint("RECCREATEDBY",reccreatedby,reccreatedby,ConstraintType.MUST);
	//var c3 = DatasetFactory.createConstraint("RECMODIFIEDBY",recmodifiedby,recmodifiedby,ConstraintType.MUST);

	var constraints = new Array(c1);
	
	var dataset = DatasetFactory.getDataset("dsAtualizaQtdesEstrutura",null,constraints,null);
	
	/*
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
		var pesoUnit = rep2["PESOUNITARIO"]
		
		console.log("pesoUnitario do idcriacao "+idCriacao+" é "+rep2["PESOUNITARIO"])
		
		if(!(desQtde=="null" || desQtde==null || desQtde==undefined || desQtde==NaN || desQtde=="NaN")){
			
			desQtde = parseInt(desQtde)
			
		} else {
			
			desQtde = 0
			
		}
		
		if(!(pesoUnit=="null" || pesoUnit==null || pesoUnit==undefined || pesoUnit==NaN || pesoUnit=="NaN")){
			
			pesoUnit = pesoUnit.toString().replace(",",".")
			pesoUnit = parseFloat(pesoUnit)
			pesoUnit = pesoUnit.toFixed(4)
			
		} else {
			
			pesoUnit = 0
			
		}
		
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
		
		totalQtde = totalPai * desQtde
		
		var totalPeso = totalQtde * pesoUnit
		
		console.log("totalPai: "+totalPai+", pesoUnit: "+pesoUnit+", totalPeso: "+totalPeso)
		console.log("calculei "+totalQtde)
		
		console.log("Vou atualizar o totalQtde "+totalQtde+", da OS "+numOS+" e idCriacao "+idCriacao)
		
		// SE TOTALQTDE CALCULADO NÃO É INVÁLIDO
		if(!(totalQtde=="" || totalQtde==undefined || totalQtde=="NaN" || totalQtde==NaN || totalQtde==null || totalQtde=="null")){
			
			console.log("entrei para construir as constraints e chamar o dataset do cálculo do total")
			
			totalQtde = totalQtde.toFixed(4)
			totalPeso = totalPeso.toFixed(4)
			
			// CONSTRÓI A CONSULTA DO DATASET
			var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
			var a2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
			var a3 = DatasetFactory.createConstraint("TOTALQTDE",totalQtde,totalQtde,ConstraintType.MUST)
			var a4 = DatasetFactory.createConstraint("PESOBRUTO",totalPeso,totalPeso,ConstraintType.MUST)
			var a5 = DatasetFactory.createConstraint("PESOLIQUIDO",totalPeso,totalPeso,ConstraintType.MUST)
			
			var constraints = new Array(a1,a2,a3,a4,a5)
			var dataset = DatasetFactory.getDataset("dsUpdateQtdesOS",null,constraints,null)
			
			console.log("calculei "+totalQtde)
			
		}
		
	}
	*/
	
}

// PERCORRE O NÍVEL QUE SOFREU ALTERAÇÃO E ATUALIZA OS CÁLCULOS TOTAIS DA QUANTIDADE
function alteraDesQtdeNivel(idCriacaoPai){
	
	console.log("vou alterar a desQtde de todos os itens do nivel alterado")
	
	var numOS = $("#NUM_OS").val()
	var reccreatedby = $("#SOLICITANTE").val()
	var recmodifiedby = $("#SOLICITANTE").val()
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
	var indicesOrdenados = arrayIndices(row,count)
	
	//var indicesOrdenados = montarEstrutura(indices)
	
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
		
		/*if(!(nivel=="")){
			
			// CONSTRÓI A CONSULTA DO DATASET
			var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
			var a2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
			
			var constraints = new Array(a1,a2)
			
			var dataset = DatasetFactory.getDataset("dsBuscaExecPaiOS",null,constraints,null)
			
			var row = dataset.values
			var rep = row[0]
			totalPai = parseInt(rep["EXECUCOES"])
			
		} else {
			
			totalPai = 1
			
		}*/
		
		
		// SE TOTAL PAI É VAZIO OU NULO
		if(totalPai=="" || totalPai==undefined || totalPai=="NaN" || totalPai==NaN || totalPai==null){
			
			totalPai = 1
			
		} else{
			// SE NÃO
			
			totalPai = parseInt(totalPai)
			
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
		/*if(totalPai=="" || totalPai==undefined || totalPai=="NaN" || totalPai==NaN || totalPai==null){
			
			totalPai = 1
			
		} else{
			// SE NÃO
			
			totalPai = parseInt(totalPai)
			
		}*/
		
		// SE NÍVEL É VAZIO
		if(nivel=="" || nivel==null || nivel==undefined || nivel=="null"){
			
			totalQtde = desQtde
			
		}
		else{
			// SE NÃO
			
			totalQtde = totalPai * desQtde
			
		}
		
		totalQtde = totalPai * desQtde
		
		console.log("Vou atualizar o totalQtde "+totalQtde+", da OS "+numOS+" e idCriacao "+idCriacao)
		
		// SE TOTALQTDE CALCULADO NÃO É INVÁLIDO
		if(!(totalQtde=="" || totalQtde==undefined || totalQtde=="NaN" || totalQtde==NaN || totalQtde==null || totalQtde=="null")){
			
			console.log("entrei para construir as constraints e chamar o dataset")
			
			// CONSTRÓI A CONSULTA DO DATASET
			var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
			var a2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
			var a3 = DatasetFactory.createConstraint("TOTALQTDE",totalQtde,totalQtde,ConstraintType.MUST)
			var a4 = DatasetFactory.createConstraint("RECCREATEDBY",reccreatedby,reccreatedby,ConstraintType.MUST);
			var a5 = DatasetFactory.createConstraint("RECMODIFIEDBY",recmodifiedby,recmodifiedby,ConstraintType.MUST);

			var constraints = new Array(a1,a2,a3,a4,a5)
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
	pesoBruto = pesoBruto.toString().replace(",",".")
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

// ALTERA A QTDE DE TODOS OS COMPONENTES DA LISTA
function alteraQtdeComponentesPeso(){
	
	console.log("vou alterar a qtde peso")
	
	var pesoUnit = isNaN($("#F_PESOUNITARIO").val().replace(",",".")) || $("#F_PESOUNITARIO").val()==0  ? 0 : $("#F_PESOUNITARIO").val()
	var totalQtde = isNaN($("#F_TOTALQTDE").val().replace(",",".")) || $("#F_TOTALQTDE").val()==0 ? 0 : $("#F_TOTALQTDE").val()
	var pesoUnLiq = isNaN($("#F_PESOUNLIQUIDO").val().replace(",",".")) || $("#F_PESOUNLIQUIDO").val()==0? 0 : $("#F_PESOUNLIQUIDO").val()
			
	pesoUnit = pesoUnit.toString().replace(",",".")
	pesoUnit = parseFloat(pesoUnit)
	pesoUnLiq = pesoUnLiq.toString().replace(",",".")
	pesoUnLiq = parseFloat(pesoUnLiq)
	totalQtde = parseInt(totalQtde)
	
	var pesoBruto = totalQtde * pesoUnit
	var pesoLiquido = totalQtde * pesoUnLiq
	
	var idCriacao = $("#F_IDCRIACAO").val()
	
	$("#F_PESOBRUTO").val(pesoBruto.toFixed(4).toString().replace(".",","))
	$("#F_PESOLIQUIDO").val(pesoLiquido.toFixed(4).toString().replace(".",","))
	
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
	
	//formataCampos()
	
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
		
		var resto = valor % 3
		
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
				  text: 'Verifique se o valor informado é múltiplo de 3 e tente novamente'
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
				
				  var myLoading2 = FLUIGC.loading(window);
					
				  myLoading2.show();
				
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
				    //alteraDesQtdeGeral()
				    
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
				
				// DESATIVA O LOAD
				setTimeout(function(){
						
					myLoading2.hide();
						
				}, 500)
				
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

// PEGA VALOR SETADO DO CAMPO RADIO4 (QUANTIDADE UNITÁRIA DO COMPONENTE)
function pegaTipo4() {
	
	// PEGA O VALOR SELECIONADO DO RADIO2
	var tipo = $("input[name='RADIO4']:checked").val();
	var radio4 = $("#VALOR_RADIO4").val()
	var idCriacao = $("#F_IDCRIACAO").val()
	
	console.log("opção selecionada: "+tipo+", idCriacao: "+idCriacao)
	
	// SALVA VALOR DO RADIO4 NO CAMPO OCULTO
	$("#VALOR_RADIO4").val(tipo)
	
	// CALCULA A QUANTIDADE DA TABELA DE COMPONENTE
	calculaQtdesComponentes(idCriacao)
	
}

// VOLTA O VALOR ANTERIOR DO RADIO2
function voltaRadio2(radio2,tipo){
	
	// SE ERA UM ITEM SEMIACABADO
	if(radio2=="SEMIACABADO"){
		
		console.log("radio2 é SEMIACABADO")
		
		tipo = "SEMIACABADO"
		
		$("#RAD2_ACABADO").prop("checked",false)
		$("#RAD2_SEMI").prop("checked",true)
		$("#RAD2_NAOMANUF").prop("checked",false)
		$("#RAD2_INDUSTR").prop("checked",false)
		
	}
	
	// SE ERA UM ITEM ACABADO
	if(radio2=="ACABADO"){
		
		tipo = "ACABADO"
		
		console.log("radio2 é ACABADO")
			
		$("#RAD2_ACABADO").prop("checked",true)
		$("#RAD2_SEMI").prop("checked",false)
		$("#RAD2_NAOMANUF").prop("checked",false)
		$("#RAD2_INDUSTR").prop("checked",false)
			
	}
	
	// SE ERA UM ITEM ACABADO
	if(radio2=="INDUSTRIALIZACAO"){
		
		tipo = "INDUSTRIALIZACAO"
		
		console.log("radio2 é INDUSTRIALIZACAO")
			
		$("#RAD2_ACABADO").prop("checked",false)
		$("#RAD2_SEMI").prop("checked",false)
		$("#RAD2_NAOMANUF").prop("checked",false)
		$("#RAD2_INDUSTR").prop("checked",true)
			
	}
	
	// SE ERA UM ITEM NÃO MANUFATURADO OU VAZIO
	if(radio2=="NAOMANUFATURADO" || (radio2=="" || radio2==undefined || radio2==null)){
		
		tipo = ""
			
		console.log("radio2 é VAZIO OU NAO MANUFATURADO")
			
		$("#RAD2_ACABADO").prop("checked",false)
		$("#RAD2_SEMI").prop("checked",false)
		$("#RAD2_NAOMANUF").prop("checked",false)
		$("#RAD2_INDUSTR").prop("checked",false)
		
	}
	
	return tipo
	
}

// PEGA VALOR SETADO DO CAMPO RADIO2 (TIPO DO DESENHO)
function pegaTipo2() {
	
	// PEGA O VALOR SELECIONADO DO RADIO2
	var tipo = $("input[name='RADIO2']:checked").val();
	var radio2 = $("#VALOR_RADIO2").val()
	var idCriacao = $("#F_IDCRIACAO").val()
	var idprd = $("#F_IDPRD").val()
		
	var tipoaux =""

	if(tipo=="ACABADO"){

		tipoaux = "Acabado"

	}
	else if(tipo=="SEMIACABADO"){

		tipoaux = "Semi-acabado"

	}
	else if(tipo=="NAOMANUFATURADO"){

		tipoaux = "Não Manufaturado"

	}
	else if(tipo=="INDUSTRIALIZACAO"){

		tipoaux = "Industrializado"

	}

	console.log("tipo: "+tipo+", radio2: "+radio2+", idCriacao: "+idCriacao+", idprd: "+idprd)
	
	// SE TIPO JÁ HAVIA SIDO INFORMADO E PRODUTO JÁ FOI CRIADO
	if(!(radio2=="" || radio2==null || radio2==undefined) && !(idprd=="" || idprd==null || idprd==undefined)){
		
		console.log("radio2 foi informado e item já teve produto cadastrado")
		
		// SE PRODUTO TEM ESTRUTURA CRIADA
		if(temEstrutura(idprd)){
			
			console.log("item tem estrutura criada")
			
			// EXIBE ALERTA
			Swal.fire({
				
				  title: 'Este item já teve estrutura e OP criadas. Se o tipo for alterado, a OP e o produto serão cancelados e isso não poderá ser desfeito. Deseja continuar?',
				  icon: 'warning',
				  showCancelButton: true,
				  allowEscapeKey: true,
				  allowOutsideClick: true,
				  confirmButtonColor: '#3085d6',
				  cancelButtonColor: '#F08E8E',
				  confirmButtonText: 'Sim',
				  cancelButtonText: 'Não'

				}).then(function(result){
				
				  // SE SIM
				  if (result.value) {
					
					console.log("item será excluído")
					  
					// SALVA ITEM QUE FOI REMOVIDO NA TABELA AUXILIAR DOS EXCLUÍDOS
					salvaItemExcluidos(idCriacao)
					
					// LIMPA OS CAMPOS DO PRODUTO
					$("#F_CODIGPRD").val("")
					$("#F_IDPRD").val("")
					$("#F_PRODUTO_RM").val("")

					
					// SE O TIPO É NÃO MANUFATURADO
					if(tipo=="NAOMANUFATURADO" || tipo=="INDUSTRIALIZACAO" || ($("#F_NIVEL").val()=="" || $("#F_NIVEL").val()=="null"  || $("#F_NIVEL").val()==null || $("#F_NIVEL").val()==undefined  )){

						limpaItemRetorno()

						desabiltaItemRetorno()

					}
					  
				  } else {
					  // SE NÃO
					  
					  console.log("item não será excluído e o tipo voltará")
						
					  // VOLTA O VALOR ANTERIOR DO RADIO2
					  tipo = voltaRadio2(radio2,tipo)
					  
				  }
				  
				})
			
		} else {
			// SE NÃO
			
			console.log("item não tem estrutura criada")
			
			// SALVA ITEM QUE FOI REMOVIDO NA TABELA AUXILIAR DOS EXCLUÍDOS
			salvaItemExcluidos(idCriacao)
			
			// LIMPA OS CAMPOS DO PRODUTO
			$("#F_CODIGPRD").val("")
			$("#F_IDPRD").val("")
			$("#F_PRODUTO_RM").val("")
			
			// SE O TIPO É NÃO MANUFATURADO
			if(tipo=="NAOMANUFATURADO" || tipo=="INDUSTRIALIZACAO"){
				
				console.log("seleção do NÃOMANUFATURADO")
				
				// SE ITEM TEM FILHO
				if(itemTemFilho(idCriacao)){
					
					console.log("item tem filhos")
					
					// VOLTA O VALOR ANTERIOR DO RADIO2
					tipo = voltaRadio2(radio2,tipo)
					
					console.log("vou salvar tipo: "+tipo)
					
					// SALVA VALOR DO RADIO2 NO CAMPO OCULTO
					$("#VALOR_RADIO2").val(tipo)
					
					// EXIBE ALERTA
					Swal.fire({
						icon: 'warning',
						title: 'Esse item tem filhos cadastrados e não pode se tornar um item "'+tipoaux+'"!'
				 	})
					
				}else{
					// SE NÃO TEM FILHO
					
					console.log("não é não manufaturado")
					
					// SE ITEM TEM PROCESSO
					if(temProcesso(idCriacao)){
						
						console.log("item tem processo criado")
						
						// EXIBE ALERTA
						Swal.fire({
							
							title: 'Se este item for alterado para "'+tipoaux+'" as atividades do processo serão removidas. Deseja continuar?',
							  showCancelButton: true,
							  allowEscapeKey: true,
							  allowOutsideClick: true,
							  confirmButtonColor: '#3085d6',
							  cancelButtonColor: '#F08E8E',
							  confirmButtonText: 'Sim',
							  cancelButtonText: 'Não'

							}).then(function(result){
							
							  // SE SIM
							  if (result.value) {
							  
								console.log("vou remover os processos")
								  
								// REMOVE AS ATIVIDADES DO PROCESSO
								removeProcesso(idCriacao)
								  
								// LIMPA AS ATIVIDADES
								limpaAtividades()
								
								// SALVA VALOR DO RADIO2 NO CAMPO OCULTO
								$("#VALOR_RADIO2").val(tipo)
								  
								// ESCONDE OS CAMPOS NECESSÁRIOS
								$("#SPAN_DIV_INDICECOPIA").hide()
								$("#DIV_INDICECOPIA").hide()
								$("#DIV_INDICECOPIA").parent("div").hide()	
								
								//$("#ID_ADICIONARPROCESSO").hide()
								$("#ADICIONARPROCESSO").hide()
								
								// LIMPA O CAMPO DA UNIDADE DE MEDIDA E DESABILITA O CAMPO
								$("#F_UNDMEDIDA").val("")
								$("#F_UNDMEDIDA").prop("disabled",true)
									
								limpaItemRetorno()

								desabiltaItemRetorno()

							  } else {
								// SE NÃO
								  
								console.log("vou voltar o tipo")  
								
								// VOLTA O VALOR ANTERIOR DO RADIO2
								tipo = voltaRadio2(radio2,tipo)
								
								// SALVA VALOR DO RADIO2 NO CAMPO OCULTO
								$("#VALOR_RADIO2").val(tipo)
									
							  }
							  
							})
						
					} else {
						// SE NÃO
						
						console.log("item não tem processo")
						
						// LIMPA O CAMPO DA UNIDADE DE MEDIDA E DESABILITA O CAMPO
						$("#F_UNDMEDIDA").val("")
						$("#F_UNDMEDIDA").prop("disabled",true)
						
						// ESCONDE OS CAMPOS NECESSÁRIOS
						$("#SPAN_DIV_INDICECOPIA").hide()
						$("#DIV_INDICECOPIA").hide()
						$("#DIV_INDICECOPIA").parent("div").hide()	
						//$("#ID_ADICIONARPROCESSO").hide()
						$("#ADICIONARPROCESSO").hide()
								
						// SALVA VALOR DO RADIO2 NO CAMPO OCULTO
						$("#VALOR_RADIO2").val(tipo)

						limpaItemRetorno()

						desabiltaItemRetorno()
						
						// EXIBE ALERTA
						Swal.fire({
							  icon: 'warning',
							  title: 'Esse item não deve ter atividades cadastradas!'
						})

					}
					
				}
						
			} else {
				// SE NÃO É MANUFATURADO
				
				console.log("item não é não manufaturado")
				
				// HABILITA O CAMPO DE UNIDADE DE MEDIDA
				$("#F_UNDMEDIDA").prop("disabled",false)
				
				var idCriacao = $("#F_IDCRIACAO").val()
				
				// SE ITEM NÃO TEM PROCESSO
				if(!(temProcesso(idCriacao))){
					
					// MOSTRA OS CAMPOS NECESSÁRIOS
					$("#SPAN_DIV_INDICECOPIA").show()
					$("#DIV_INDICECOPIA").show()
					$("#DIV_INDICECOPIA").parent("div").show()	
					//$("#ID_ADICIONARPROCESSO").show()
					
				}
				
				// MOSTRA OS CAMPOS NECESSÁRIOS
				$("#ADICIONARPROCESSO").show()
								
				// SALVA VALOR DO RADIO2 NO CAMPO OCULTO
				$("#VALOR_RADIO2").val(tipo)
				
				if($("#F_NIVEL").val()=="" || $("#F_NIVEL").val()=="null"  || $("#F_NIVEL").val()==null || $("#F_NIVEL").val()==undefined  ){

					limpaItemRetorno()

					desabiltaItemRetorno()
			
				}
				
			}
			
		}
		
	} else {
		// SE NÃO
		
		console.log("radio2: "+radio2+", idprd: "+idprd)
		
		console.log("não teve produto cadastrado ainda")
		
		// SE O TIPO É NÃO MANUFATURADO
		if(tipo=="NAOMANUFATURADO" || tipo=="INDUSTRIALIZACAO"){
			
			console.log("seleção do "+tipo)
			
			// SE ITEM TEM FILHO
			if(itemTemFilho(idCriacao)){
				
				console.log("item tem filhos")
				
				// VOLTA O VALOR ANTERIOR DO RADIO2
				tipo = voltaRadio2(radio2,tipo)
				
				console.log("vou salvar tipo: "+tipo)
				
				// SALVA VALOR DO RADIO2 NO CAMPO OCULTO
				$("#VALOR_RADIO2").val(tipo)
				
				// EXIBE ALERTA
				Swal.fire({
					icon: 'warning',
					title: 'Esse item tem filhos cadastrados e não pode se tornar um item "'+tipoaux+'"!'
			  	})
				
			}else{
				// SE NÃO TEM FILHO
				
				console.log("item não tem filhos")
				
				// SE ITEM TEM PROCESSO
				if(temProcesso(idCriacao)){
					
					console.log("item tem processo")
					
					// EXIBE ALERTA
					Swal.fire({
						
						title: 'Se este item for alterado para "'+tipoaux+'" as atividades do processo serão removidas. Deseja continuar?',
						  icon: 'warning',
						  showCancelButton: true,
						  allowEscapeKey: true,
						  allowOutsideClick: true,
						  confirmButtonColor: '#3085d6',
						  cancelButtonColor: '#F08E8E',
						  confirmButtonText: 'Sim',
						  cancelButtonText: 'Não'

						}).then(function(result){
						
						  // SE SIM
						  if (result.value) {
						  
							 console.log("vou remover o processo")
							  
							// REMOVE AS ATIVIDADES DO PROCESSO
							removeProcesso(idCriacao)
							  
							// LIMPA AS ATIVIDADES
							limpaAtividades()
							
							// SALVA VALOR DO RADIO2 NO CAMPO OCULTO
							$("#VALOR_RADIO2").val(tipo)
							  
							// ESCONDE OS CAMPOS NECESSÁRIOS
							$("#SPAN_DIV_INDICECOPIA").hide()
							$("#DIV_INDICECOPIA").hide()
							$("#DIV_INDICECOPIA").parent("div").hide()	
							//$("#ID_ADICIONARPROCESSO").hide()
							$("#ADICIONARPROCESSO").hide()
								
							// LIMPA O CAMPO DA UNIDADE DE MEDIDA E DESABILITA O CAMPO
							$("#F_UNDMEDIDA").val("")
							$("#F_UNDMEDIDA").prop("disabled",true)
								
						  } else {
							// SE NÃO
							  
							 console.log("vou voltar o tipo")
							  
							// VOLTA O VALOR ANTERIOR DO RADIO2
							tipo = voltaRadio2(radio2,tipo)
							
							// SALVA VALOR DO RADIO2 NO CAMPO OCULTO
							$("#VALOR_RADIO2").val(tipo)
								
						  }
						  
						})
					
				} else {
					// SE NÃO
					
					console.log("item não tem processo")
					
					// LIMPA O CAMPO DA UNIDADE DE MEDIDA E DESABILITA O CAMPO
					$("#F_UNDMEDIDA").val("")
					$("#F_UNDMEDIDA").prop("disabled",true)
					
					// ESCONDE OS CAMPOS NECESSÁRIOS
					$("#SPAN_DIV_INDICECOPIA").hide()
					$("#DIV_INDICECOPIA").hide()
					$("#DIV_INDICECOPIA").parent("div").hide()			
					//$("#ID_ADICIONARPROCESSO").hide()
					$("#ADICIONARPROCESSO").hide()
								
					// SALVA VALOR DO RADIO2 NO CAMPO OCULTO
					$("#VALOR_RADIO2").val(tipo)
					
					// EXIBE ALERTA
					Swal.fire({
						  icon: 'warning',
						  title: 'Esse item não deve ter atividades cadastradas!'
					})

				}
				
			}

			limpaItemRetorno()

			desabiltaItemRetorno()
					
		} else {
			// SE NÃO É MANUFATURADO
			
			console.log("item não é não manufaturado")
			
			// HABILITA O CAMPO DE UNIDADE DE MEDIDA
			$("#F_UNDMEDIDA").prop("disabled",false)
			
			var idCriacao = $("#F_IDCRIACAO").val()
			
			// SE ITEM NÃO TEM PROCESSO
			if(!(temProcesso(idCriacao))){
				
				// MOSTRA OS CAMPOS NECESSÁRIOS
				$("#SPAN_DIV_INDICECOPIA").show()
				$("#DIV_INDICECOPIA").show()
				$("#DIV_INDICECOPIA").parent("div").show()
				//$("#ID_ADICIONARPROCESSO").show()
				
			}
			
			//$("#ID_ADICIONARPROCESSO").show()
			$("#ADICIONARPROCESSO").show()
			
			// SALVA VALOR DO RADIO2 NO CAMPO OCULTO
			$("#VALOR_RADIO2").val(tipo)

			if($("#F_NIVEL").val()=="" || $("#F_NIVEL").val()=="null"  || $("#F_NIVEL").val()==null || $("#F_NIVEL").val()==undefined  ){

				limpaItemRetorno()

				desabiltaItemRetorno()
		
			}
			
		}
		
	}
	
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
    
    console.log("vou verificar a OS")
    
    var numOS = $("#NUM_OS").val()
    var ret = true
    var solicitacao = ""
    
    // CONSULTA BANCO
    var c1 = DatasetFactory.createConstraint("NUM_OS",numOS,numOS,ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("OPCAO","1","1",ConstraintType.MUST);



   var constraints = new Array(c1,c2);
    
    dataset = DatasetFactory.getDataset("dsVerificaOS",null,constraints,null);
    
    var row = dataset.values;
    var count = dataset.values.length;
    console.log("row "+row)
    
    console.log("Valor de count "+count);
    
    // SE RETORNO É VAZIO
    if(row=="" || row==undefined || row==null || row=="null"){



       return solicitacao
        
    } else {
        // SE NÃO, OS JÁ ESTÁ NO BANCO
        
        solicitacao = row[0]["NUMPROCESSO"]
        
        return solicitacao
    
    }
    
    return ret
    
}

// BUSCA A OS E CARREGA OS DADOS NO FORMULÁRIO
function buscaEstruturaOS(){
	
	var myLoading2 = FLUIGC.loading(window);
	var reccreatedby = $("#SOLICITANTE").val()
	
	myLoading2.show();
	
	setTimeout(function(){
		
		var os = $("#INFOCOPIA").val()
		var numOS = $("#NUM_OS").val()
		
		// SE PELO MENOS UMA OS FOI SELECIONADA
		if(!(os=="" || os==null || os==undefined)){
		
			// PERCORRE TODOS OS REGISTROS 
			for(var i=0;i<os.length;i++){
				
				var osCopia = os[i] 
				//var index = i+1
				
				console.log("vou executar a procedure de cópia da OS "+osCopia+" para a OS "+numOS+" ")
				
				// CONSTRAINTS PARA A EXECUÇÃO DA PROCEDURE
				var a1 = DatasetFactory.createConstraint("OSPRINCIPAL",numOS,numOS,ConstraintType.MUST);
				var a2 = DatasetFactory.createConstraint("OSCOPIA",osCopia,osCopia,ConstraintType.MUST);
				var a3 = DatasetFactory.createConstraint("RECCREATEDBY",reccreatedby,reccreatedby,ConstraintType.MUST);
				//var a3 = DatasetFactory.createConstraint("INDEX",index,index,ConstraintType.MUST);
				
				var constraints = new Array(a1,a2,a3);
				
				var dataset = DatasetFactory.getDataset("dsProcCopiaEstrutura",null,constraints,null);
				
			}
			
		}
		
		// ATUALIZAR A VIEW
		atualizar()
		
		// MOSTRA ESCONDE CAMPOS
		$(".VIEW").show()
		$(".OS_COPIA").hide()
		$(".INFO_OS").hide()
		
		// SE TABELA TEM ITENS E NÃO TEM ITEM DETALHADO
		if(tabelaTemItens() && !temItemDetalhado()){

			//$(".BOTOES_CAB").show()
			
			var myLoading2 = FLUIGC.loading(window);
			
			myLoading2.show();
			
			setTimeout(function(){
				
				atualizar()
				
			},200)
			
			// DESATIVA O LOAD
			setTimeout(function(){
					
				myLoading2.hide();
					
			}, 500)
			
		} else {
			
			$(".BOTOES_CAB").hide()
			
		}
		
		console.log("VOU MOVIMENTAR A SOLICITAÇÃO!!!")
		
		// SALVO INFORMAÇÃO DO EXCLUSIVO1 PARA EDITAR
		$("#EXCLUSIVO1").val("EDITAR")
		
		// MOVIMENTA A SOLICITAÇÃO PARA SALVAR A NUMERAÇÃO DELA
		$("#workflowActions > button:first-child", window.parent.document).click();
		
		/*var numOS = $("#OSCOPIA").val()
		
		console.log("VOU COPIAR A OS "+numOS)
		
		// CONSULTA BANCO
		var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
		var constraints = new Array(c1);
		
		//dataset = DatasetFactory.getDataset("dsBuscaEstruturaIntegrada",null,constraints,null);
		dataset = DatasetFactory.getDataset("dsBuscaEstrutura",null,constraints,null);
		
		var row = dataset.values;
		var count = dataset.values.length;
		
		console.log("row "+row)
		
		console.log("Valor de count "+count);
		
		// SE NÃO ENCONTROU
		if(row=="" || row==null || row==undefined){
			
			// EXIBE ALERTA
			Swal.fire({
				  icon: 'error',
				  title: 'Não existe estrutura para a OS informada!',
				  text: 'Verifique e tente novamente'
			})
			
		} else {
			// SE NÃO
			
			// PERCORRE TODOS OS REGISTROS ENCONTRADOS E PREENCHE A TABELA COM OS DADOS
			for(var i=0; i < count; i++){
				
				console.log("Entrei no for");
				var rep = row[i];
				
				var novaOS = $("#NUM_OS").val()
				var idprj = $("#IDPRJ_OS").val()
				
				console.log("VOU SALVAR A OS "+novaOS)
				
				var numDbi = rep["NUMDBI"]
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
				//var produtoRM = rep['PRODUTORM']
				var idPrd = rep["IDPRD"]
				var codigoPrd = rep["CODIGOPRD"]
				var idCriacao = rep["IDCRIACAO"]
				var comporLista = rep["COMPORLISTA"]
				var undMedida = rep["UNDMEDIDA"]
				var codigoTarefaDesc = rep["CODIGOTAREFADESC"]
				var codTrfItem = rep["CODTRFITEM"]
				var idTrfItem = rep["IDTRFITEM"]
				var nomeTrfItem = rep["NOMETRFITEM"]
				var posicaoIndice = rep["POSICAOINDICE"]
				var posicaoDesenho = rep["POSICAODESENHO"]
				var indiceAntigo = rep["INDICEANTIGO"]
				var nivel = rep["NIVEL"]
				var numDesenho = rep["NUMDESENHO"]
				var desQtde = rep["DESQTDE"]
				var totalQtde = rep["TOTALQTDE"]
				var descricao = rep["DESCRICAO"]
				var codTarefa = rep["CODTRFOS"]
				var dscTarefa = rep["DSCTRFOS"]
				var pesoBruto = rep["PESOBRUTO"]
				var pesoLiquido = rep["PESOLIQUIDO"]
				var indice = rep["INDICE"]
				var ordem = rep["ORDEM"]
				var integrado = rep["INTEGRADO"]
				var numDocDelp = rep["NUMDOCDELP"]
				var revisaoDocDelp = rep["REVISAODOCDELP"]
				var codcoligada = rep["CODCOLIGADA"]
				var codfilial = rep["CODFILIAL"]
				var codTrfPai = rep["CODTRFPAI"]
				var idtrfPao = rep["IDTRFPAI"]
				var nomeTrfPai = rep["NOMETRFPAI"]
				
				var b1 = DatasetFactory.createConstraint("OS",novaOS,novaOS,ConstraintType.MUST)
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
				//var b28 = DatasetFactory.createConstraint("IDPRD",idPrd,idPrd,ConstraintType.MUST)
				//var b29 = DatasetFactory.createConstraint("CODIGOPRD",codigoPrd,codigoPrd,ConstraintType.MUST)
				var b30 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
				var b31 = DatasetFactory.createConstraint("COMPORLISTA",comporLista,comporLista,ConstraintType.MUST)
				var b32 = DatasetFactory.createConstraint("UNDMEDIDA",undMedida,undMedida,ConstraintType.MUST)
				var b33 = DatasetFactory.createConstraint("CODIGOTAREFADESC",codigoTarefaDesc,codigoTarefaDesc,ConstraintType.MUST)
				var b34 = DatasetFactory.createConstraint("CODTRFITEM",codTrfItem,codTrfItem,ConstraintType.MUST)
				var b35 = DatasetFactory.createConstraint("IDTRFITEM",idTrfItem,idTrfItem,ConstraintType.MUST)
				var b36 = DatasetFactory.createConstraint("NOMETRFITEM",nomeTrfItem,nomeTrfItem,ConstraintType.MUST)
				var b37 = DatasetFactory.createConstraint("POSICAOINDICE",posicaoIndice,posicaoIndice,ConstraintType.MUST)
				var b38 = DatasetFactory.createConstraint("POSICAODESENHO",posicaoDesenho,posicaoDesenho,ConstraintType.MUST)	
				var b39 = DatasetFactory.createConstraint("INDICEANTIGO",indiceAntigo,indiceAntigo,ConstraintType.MUST)
				var b40 = DatasetFactory.createConstraint("NIVEL",nivel,nivel,ConstraintType.MUST)
				var b41 = DatasetFactory.createConstraint("NUMDESENHO",numDesenho,numDesenho,ConstraintType.MUST)
				var b42 = DatasetFactory.createConstraint("DESQTDE",desQtde,desQtde,ConstraintType.MUST)
				var b43 = DatasetFactory.createConstraint("TOTALQTDE",totalQtde,totalQtde,ConstraintType.MUST)
				var b44 = DatasetFactory.createConstraint("DESCRICAO",descricao,descricao,ConstraintType.MUST)
				var b45 = DatasetFactory.createConstraint("CODTRFOS",codTarefa,codTarefa,ConstraintType.MUST)
				var b46 = DatasetFactory.createConstraint("DSCTRFOS",dscTarefa,dscTarefa,ConstraintType.MUST)
				var b47 = DatasetFactory.createConstraint("PESOBRUTO",pesoBruto,pesoBruto,ConstraintType.MUST)
				var b48 = DatasetFactory.createConstraint("PESOLIQUIDO",pesoLiquido,pesoLiquido,ConstraintType.MUST)
				var b49 = DatasetFactory.createConstraint("INDICE",indice,indice,ConstraintType.MUST)
				var b50 = DatasetFactory.createConstraint("ORDEM",ordem,ordem,ConstraintType.MUST)
				var b51 = DatasetFactory.createConstraint("INTEGRADO",integrado,integrado,ConstraintType.MUST)
				var b52 = DatasetFactory.createConstraint("IDPRJOS",idprj,idprj,ConstraintType.MUST)
				var b53 = DatasetFactory.createConstraint("NUMDOCDELP",numDocDelp,numDocDelp,ConstraintType.MUST)
				var b54 = DatasetFactory.createConstraint("REVISAODOCDELP",revisaoDocDelp,revisaoDocDelp,ConstraintType.MUST)
				var b55 = DatasetFactory.createConstraint("CODCOLIGADA",codcoligada,codcoligada,ConstraintType.MUST)
				var b56 = DatasetFactory.createConstraint("CODFILIAL",codfilial,codfilial,ConstraintType.MUST)
				var b57 = DatasetFactory.createConstraint("CODTRFPAI",codTrfPai,codTrfPai,ConstraintType.MUST)
				var b58 = DatasetFactory.createConstraint("IDTRFPAI",idtrfPai,idtrfPai,ConstraintType.MUST)
				var b59 = DatasetFactory.createConstraint("NOMETRFPAI",nomeTrfPai,nomeTrfPai,ConstraintType.MUST)
				
				var constraints = new Array(b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,b11,b12,b13,b14,b15,b16,b17,b18,b19,b20,b21,b22,b23,b24,b25,b26,b30,b31,b32,b33,b34,b35,b36,b37,b38,b39,b40,b41,b42,b43,b44,b45,b46,b47,b48,b49,b50,b51,b52,b53,b54,b55,b56,b57,b58,b59)
				
				var dataset = DatasetFactory.getDataset("dsInsertItemCopiaEstruturaOS",null,constraints,null)
	
			}
			
			// BUSCA TODOS OS PROCESSOS DA OS
			buscaProcessoOS(numOS)
			
			// BUSCA TODOS OS COMPONENTES DA OS
			buscaComponentesOS(numOS)
			
			// BUSCA TODOS OS COMPONENTES DA LISTA DE MATERIAL
			//buscaComponentes(numOS)
			
			// ATUALIZAR A VIEW
			atualizar()
			
			// MOSTRA ESCONDE CAMPOS
			$(".VIEW").show()
			$(".OS_COPIA").hide()
			$(".INFO_OS").hide()
			
			// SE TABELA TEM ITENS E NÃO TEM ITEM DETALHADO
			if(tabelaTemItens() && !temItemDetalhado()){

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
			
			console.log("VOU MOVIMENTAR A SOLICITAÇÃO!!!")
			
			// SALVO INFORMAÇÃO DO EXCLUSIVO1 PARA EDITAR
			$("#EXCLUSIVO1").val("EDITAR")
			
			// MOVIMENTA A SOLICITAÇÃO PARA SALVAR A NUMERAÇÃO DELA
			$("#workflowActions > button:first-child", window.parent.document).click();
			
		} */  
			
	},500)
	
	// DESATIVA O LOAD
	setTimeout(function(){
			
		myLoading2.hide();
			
	}, 500)
	
}

// BUSCA TODOS OS PROCESSOS DA OS
function buscaComponentesOS(numOS){
	
	var reccreatedby = $("#SOLICITANTE").val()
	var recmodifiedby = $("#SOLICITANTE").val()
	
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
			var c13 = DatasetFactory.createConstraint("RECCREATEDBY",reccreatedby,reccreatedby,ConstraintType.MUST);
			var c14 = DatasetFactory.createConstraint("RECMODIFIEDBY",recmodifiedby,recmodifiedby,ConstraintType.MUST);
			
			var constraints = new Array(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c14);
			
			dataset = DatasetFactory.getDataset("dsInsertItemComponentesOS",null,constraints,null);
			
			console.log("INSERI NO BANCO O COMPONENTE")
			
		}
				
	}
	
}

// BUSCA TODOS OS PROCESSOS DA OS
function buscaProcessoOS(numOS){
	
	var reccreatedby = $("#SOLICITANTE").val()
	var recmodifiedby = $("#SOLICITANTE").val()
	
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
		var c24 = DatasetFactory.createConstraint("RECCREATEDBY",reccreatedby,reccreatedby,ConstraintType.MUST);
		var c25 = DatasetFactory.createConstraint("RECMODIFIEDBY",recmodifiedby,recmodifiedby,ConstraintType.MUST);

		var constraints = new Array(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c14,c15,c16,c17,c18,c19,c20,c21,c22,c23,c24,c25);
		
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
	var idCriacao = buscaIdCriacao(indice)
	
	var numOS = $("#NUM_OS").val()
	
	if(idCriacao=="" || idCriacao==null || idCriacao==undefined){
		
		idCriacao = buscaIdCriacao(nivel)
		
	}
	console.log("indice: "+indice+", nivel: "+nivel+", idCriacao: "+idCriacao+", numOS: "+numOS)
	
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
	
	
	/*
	//if(!(nivel=="")){
	
	if(!(idCriacao=="" || idCriacao==null || idCriacao==undefined)){
		
		// CONSTRÓI A CONSULTA DO DATASET
		var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
		var a2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
		
		var constraints = new Array(a1,a2)
		
		var dataset = DatasetFactory.getDataset("dsBuscaExecPaiOS",null,constraints,null)
		
		var row = dataset.values
		var rep = row[0]
		totalPai = parseInt(rep["EXECUCOES"])
		
	} else {
		
		totalPai = 1
		
	}	*/
		
	var desQtde = $("#QTDE_INFO").val()
	
	if(desQtde=="" || desQtde==null || desQtde==undefined){
		
		desQtde = $("#QTDE_INFO_ALT").val()
		
	}
	
	var totalQtde = ""
		
	desQtde = parseInt(desQtde)
	
	console.log("desQtde "+desQtde)
	console.log("totalPai "+totalPai)
	
	// TOTAL PAI FOI INFORMADO
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
	
	totalQtde = totalPai * desQtde
	
	console.log("calculei "+totalQtde)
	
	// SALVA A QUANTIDADE TOTAL
	$("#QTDETOTAL_INFO").val(totalQtde)
	$("#QTDEALT_INFO").val("SIM")
	
	
}

// CALCULA A QUANTIDADE TOTAL
function calculaTotal(){
	
	var numOS = $("#NUM_OS").val()
	var nivel = $("#F_NIVEL").val()
	console.log("nivel "+nivel)
	var idCriacao = $("#F_IDCRIACAO").val()
	var totalPai = ""
	var desQtde = $("#F_DESQTDE").val()
	var totalQtde = ""
			
	desQtde = parseInt(desQtde)
	
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
	
	/*
	if(!(nivel=="")){
	
		// CONSTRÓI A CONSULTA DO DATASET
		var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
		var a2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
		
		var constraints = new Array(a1,a2)
		
		var dataset = DatasetFactory.getDataset("dsBuscaExecPaiOS",null,constraints,null)
		
		var row = dataset.values
		var rep = row[0]
		totalPai = parseInt(rep["EXECUCOES"])
		
	} else {
		
		totalPai = 1
		
	}*/
		
	totalQtde = totalPai * desQtde
		
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
	var reccreatedby = $("#SOLICITANTE").val()
	var recmodifiedby = $("#SOLICITANTE").val()

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
			var a25 = DatasetFactory.createConstraint("RECCREATEDBY",reccreatedby,reccreatedby,ConstraintType.MUST);
			var a26 = DatasetFactory.createConstraint("RECMODIFIEDBY",recmodifiedby,recmodifiedby,ConstraintType.MUST);
		
			//var a25 = DatasetFactory.createConstraint("EDITADOPROCESSO",editadoProc,editadoProc,ConstraintType.MUST)
			
			//var a27 = DatasetFactory.createConstraint("companyid",companyid,companyid,ConstraintType.MUST)
			//var a28 = DatasetFactory.createConstraint("cardid",cardid,cardid,ConstraintType.MUST)
			//var a29 = DatasetFactory.createConstraint("documentid",documentid,documentid,ConstraintType.MUST)
			//var a30 = DatasetFactory.createConstraint("version",version,version,ConstraintType.MUST)
			//var a31 = DatasetFactory.createConstraint("tableid",tableid,tableid,ConstraintType.MUST)
			
			//var constraints = new Array(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,a21,a22,a23,a24,a25,a26,a27,a28,a29,a30,a31)
			var constraints = new Array(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,a21,a22,a23,a24,a25,a26)
			
			var dataset = DatasetFactory.getDataset("dsInsertItemProcessoOS",null,constraints,null)
		
			console.log("Inserido")
			
		}
		
	}
	
}

// COPIA OS DADOS DE UM ITEM PARA OUTRO
function copiaDados(idCriacao,idCriacaoCopia){

	console.log("entrei para fazer a cópia do item de idCriacao "+idCriacao+" para o de idCriacao "+idCriacaoCopia)
	
	var numOS = $("#NUM_OS").val()
	var reccreatedby = $("#SOLICITANTE").val()
	var recmodifiedby = $("#SOLICITANTE").val()

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
	var qtdeUnComp = rep["QTDEUNCOMP"]
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
	//var codTrfPai = rep["CODTRFPAI"]
	//var idtrfPai = rep["IDTRFPAI"]
	//var nomeTrfPai = rep["NOMETRFPAI"]
	var opsUnitarias = rep["OPSUNITARIAS"]
	var pesoBruto = rep["PESOBRUTO"]
	var pesoUn = rep["PESOUNITARIO"]
	var pesoUnitLiq = rep["PESOUNLIQUIDO"]
	var pesoLiquido = rep["PESOLIQUIDO"]
	
	console.log("pesoUn: "+pesoUn+", pesoBruto: "+pesoBruto+", pesoLiquido: "+pesoLiquido)
	
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
	//var b41 = DatasetFactory.createConstraint("CODTRFPAI",codTrfPai,codTrfPai,ConstraintType.MUST)
	//var b42 = DatasetFactory.createConstraint("IDTRFPAI",idtrfPai,idtrfPai,ConstraintType.MUST)
	//var b43 = DatasetFactory.createConstraint("NOMETRFPAI",nomeTrfPai,nomeTrfPai,ConstraintType.MUST)
	var b44 = DatasetFactory.createConstraint("OPSUNITARIAS",opsUnitarias,opsUnitarias,ConstraintType.MUST)
	var b45 = DatasetFactory.createConstraint("QTDEUNCOMP",qtdeUnComp,qtdeUnComp,ConstraintType.MUST)
	var b46 = DatasetFactory.createConstraint("PESOBRUTO",pesoBruto,pesoBruto,ConstraintType.MUST)
	var b47 = DatasetFactory.createConstraint("PESOLIQUIDO",pesoLiquido,pesoLiquido,ConstraintType.MUST)
	var b48 = DatasetFactory.createConstraint("UNITARIOPESO",pesoUn,pesoUn,ConstraintType.MUST)
	var b49 = DatasetFactory.createConstraint("RECCREATEDBY",reccreatedby,reccreatedby,ConstraintType.MUST);
	var b50 = DatasetFactory.createConstraint("RECMODIFIEDBY",recmodifiedby,recmodifiedby,ConstraintType.MUST);
	var b51 = DatasetFactory.createConstraint("PESOUNLIQUIDO",pesoUnitLiq,pesoUnitLiq,ConstraintType.MUST);

	var constraints = new Array(b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,b11,b12,b13,b14,b15,b16,b17,b18,b19,b20,b21,b22,b23,b24,b25,b26,b30,b31,b32,b33,b34,b35,b36,b37,b38,b39,b40,b44,b45,b46,b47,b48,b49,b50,b51)
	
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

// LIMPA O CONTEÚDO DO ZOOM TAREFA PAI
function limparZoomTarefaPai(){

	console.log("vou limpar o zoom da Tarefa Pai")
	
	$("#F_CODIGOTRFPAI").val("")
	$("#F_CODTRFPAI").val("")
	$("#F_IDTRFPAI").val("")
	$("#F_NOMETRFPAI").val("")

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

// BUSCA E EXIBE UM MODAL COM OS ITENS QUE POSSUEM INFORMAÇÕES OBRIGATÓRIAS QUE AINDA NÃO FORAM SALVAS
function exibeItensPendentes(){
	
	console.log("vou exibir os itens pendentes")
	
	// LIMPA O CONTEÚDO DA DIV
	//$("#INFO_PENDENTES").addClass("fundoModal")
	$("#INFO_PENDENTES").empty()

	$(".INFO_PENDENTES").draggable();

	if($(".INFO_PENDENTES").width() < 100){

		$(".INFO_PENDENTES").width($(document).width()/3);

	}

	var html = ""
	var numOS = $("#NUM_OS").val()
	
	var myLoading2 = FLUIGC.loading(window);
	
	myLoading2.show();
	
	setTimeout(function(){
		
		var numOS = $("#NUM_OS").val()
		
		// CONSULTA BANCO
		var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
		var constraints = new Array(c1)
		
		//var dataset = DatasetFactory.getDataset("dsBuscaEstrutura",null,constraints,null)
		var dataset = DatasetFactory.getDataset("dsPendenciasEstrutura",null,constraints,null)
		
		var row = dataset.values
		
		console.log("row:")
		console.log(row)
		
		// SE NÃO TEVE NENHUM RETORNO 
		if(!(row=="" || row==undefined || row==null)){
			
			var count = row.length
			
			console.log("count: "+count)
			
			html = html + "<br><span><strong>&emsp;&emsp;Itens que possuem campos obrigatórios não preenchidos:</strong></span><br><br>"
			
			// PERCORRE TODOS OS REGISTROS
			for(var i=0; i<count; i++){
				
				var rep = row[i]
				
				var tem = false
				var temCampos = false
				var indice = rep["INDICE"]
				var descricao = rep["DESCRICAO"]
				var tipoDesenho = rep["TIPODESENHO"]
				var desQtde = rep["DESQTDE"]
				var pesoUnitario = rep["PESOUNITARIO"]
				var pesoBruto = rep["PESOBRUTO"]
				var undMedida = rep["UNDMEDIDA"]
				var codTrfItem = rep["CODTRFITEM"]
				var nivel = rep["NIVEL"]
				var codTrfPai = rep["CODTRFPAI"]
				var qtdeUnComp = rep["QTDEUNCOMP"]
				var comporLista = rep["COMPORLISTA"]
				var htmlAux = ""
				var temProcesso = rep["TEMPROCESSO"]
				var temComponentes = rep["TEMCOMPONENTES"] 
				var temFilhos = rep["TEMFILHOS"]
				var regraIndustrializado = rep["REGRA_INDUSTRIALIZADO"]
				var regraNaoManufaturado = rep["REGRA_NAOMANUFATURADO"]
					
				console.log("tipoDesenho: "+tipoDesenho+", desQtde: "+desQtde+", pesoBruto: "+pesoBruto+", undMedida: "+undMedida+", codTrfItem: "+codTrfItem+", nivel: "+nivel+", codTrfPai: "+codTrfPai+", pesoUnitario: "+pesoUnitario+", qtdeUnComp: "+qtdeUnComp+", comporLista: "+comporLista+", temProcesso: "+temProcesso+", temComponentes: "+temComponentes+", temFilhos: "+temFilhos)
				
				//html = html + "<br><span><strong>&emsp;&emsp;→ "+indice+" - "+descricao+":</strong> "
				htmlAux = "<br><span><strong>&emsp;&emsp;→ "+indice+" - "+descricao+":</strong> "
				
				
				if((nivel=="" || nivel==undefined || nivel==null || nivel=="null" || nivel==undefined) && (codTrfPai=="" || codTrfPai==null || codTrfPai==undefined || codTrfPai=="null" || codTrfPai==undefined)){
					
					//html = html + " código da tarefa manufatura "
					htmlAux = htmlAux + " código da tarefa manufatura "
					tem = true
					temCampos = true
					
				}
				if(tipoDesenho=="" || tipoDesenho==null || tipoDesenho==undefined || tipoDesenho=="null"){
					
					temCampos = true

					if(tem){
						
						//html = html + ", tipo do desenho"
						htmlAux = htmlAux + ", tipo do desenho"
						
					} else{
						                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
						//html = html + " tipo do desenho"
						htmlAux = htmlAux + " tipo do desenho"
						tem = true
					}
					
				}
				if(desQtde=="" || desQtde==null || desQtde==undefined || desQtde=="null"){
					
					temCampos = true

					if(tem){
						
						//html = html + ", quantidade do desenho"
						htmlAux = htmlAux + ", quantidade do desenho"
						
					} else{
						
						//html = html + " quantidade do desenho"
						htmlAux = htmlAux + " quantidade do desenho"
						tem = true
					
					}
					
				}	
				
				pesoUnitario = parseFloat(pesoUnitario.toString().replace(",","."))
				
				console.log("pesoUnitario: "+pesoUnitario)
				
				if(pesoUnitario=="" || pesoUnitario==null || pesoUnitario==undefined || pesoUnitario=="0" || pesoUnitario=="null" || isNaN(pesoUnitario) ){
					
					temCampos = true

					if(tem){
					
						//html = html + ", peso unitário"
						htmlAux = htmlAux + ", peso unitário"
						
					} else{
						
						//html = html + " peso unitário"
						htmlAux = htmlAux + " peso unitário"
						tem = true
						
					}
					
				}
				
				pesoBruto = parseFloat(pesoBruto.toString().replace(",","."))
				
				console.log("pesoBruto: "+pesoBruto)
				
				if(pesoBruto=="" || pesoBruto==null || pesoBruto==undefined || pesoBruto=="0" || pesoBruto=="null" || isNaN(pesoBruto) ){
					
					temCampos = true

					if(tem){
					
						//html = html + ", peso unitário"
						htmlAux = htmlAux + ", peso bruto"
						
					} else{
						
						//html = html + " peso unitário"
						htmlAux = htmlAux + " peso bruto"
						tem = true
						
					}
					
				}
				if((undMedida=="" || undMedida==null || undMedida==undefined || undMedida=="null") && !(tipoDesenho=="NAOMANUFATURADO" || tipoDesenho=="INDUSTRIALIZACAO")){
					
					temCampos = true

					if(tem){
						
						//html = html + ", unidade de medida"
						htmlAux = htmlAux + ", unidade de medida"
						
					} else{
						
						//html = html + " unidade de medida"
						htmlAux = htmlAux + " unidade de medida"
						tem = true
					
					}
					
				}
				if(comporLista=="SIM" && !(tipoDesenho=="NAOMANUFATURADO" || tipoDesenho=="INDUSTRIALIZACAO")){
					
					if(qtdeUnComp=="" || qtdeUnComp==null || qtdeUnComp==undefined || qtdeUnComp=="null"){
						
						temCampos = true

						if(tem){
							
							//html = html + ", quantidade unitária do componente"
							htmlAux = htmlAux + ", quantidade unitária do componente"
							
						} else{
							
							//html = html + " quantidade unitária do componente"
							htmlAux = htmlAux + " quantidade unitária do componente"
							tem = true
						
						}
						
					}
					
				}

				if(tipoDesenho=="NAOMANUFATURADO" || tipoDesenho=="INDUSTRIALIZACAO"){
					
					if(regraIndustrializado!="null"){
						
						temCampos = true

						if(tem){
							
							//html = html + ", quantidade unitária do componente"
							htmlAux = htmlAux +", "+ regraIndustrializado
							
						} else{
							
							//html = html + " quantidade unitária do componente"
							htmlAux = htmlAux + regraIndustrializado
							tem = true
						
						}
						
					}

					if(regraNaoManufaturado!="null"){
						
						temCampos = true

						if(tem){
							
							//html = html + ", quantidade unitária do componente"
							htmlAux = htmlAux +", "+ regraNaoManufaturado
							
						} else{
							
							//html = html + " quantidade unitária do componente"
							htmlAux = htmlAux + regraNaoManufaturado
							tem = true
						
						}
						
					}
					
				}

				if(codTrfItem=="" || codTrfItem==null || codTrfItem==undefined || codTrfItem=="null"){
					
					temCampos = true

					if(tem){
						
						//html = html +", código da tarefa preliminar"	
						htmlAux = htmlAux +", código da tarefa preliminar"
						
					} else{
						
						//html = html +" código da tarefa preliminar"
						htmlAux = htmlAux +" código da tarefa preliminar"
						
					}
					
				}

				if( (tipoDesenho=="ACABADO" || tipoDesenho=="SEMIACABADO") && temProcesso=="SIM" && temComponentes=="NAO" && temFilhos=="NAO"){
					
					temCampos = true

					if(tem){
						
						//html = html +", código da tarefa preliminar"	
						htmlAux = htmlAux +", tem processo mas não tem componentes e nem filhos"
						
					} else{
						
						//html = html +" código da tarefa preliminar"
						htmlAux = htmlAux +" tem processo mas não tem componentes e nem filhos"
						
					}
					
				}

				if(temCampos){
					
					html = html +""+htmlAux+"</span>"
					
				}
				
			}
			
			html = html + "<br><br>"
			
		}
		
		console.log("html:")
		console.log(html)

		$("#INFO_PENDENTES").append(html)
		
	},500)
	
	// DESATIVA O LOAD
	setTimeout(function(){
			
		myLoading2.hide();
			
	}, 500)
		
}

// SALVA OS SUBSTITUTOS EM UM ARRAY   
function salvaArraySubstitutos(){
	
	var substitutos = new Array()
	
	// PERCORRE A TABELA E COLETA TODOS OS REGISTROS
	$('input[id^="VIEWPRODUTOCOMPONENTES___"]').each(function(index, value){
		
		var seq = $(this).attr("id").split("___")[1]	
		
		var produto = $("#VIEWCODIGOPRDCOMPONENTES___"+seq).val()
		var lista = $("#VIEWLISTACOMPONENTES___"+seq).val()
		var substituto = $("#VIEWSUBSTITUTOCOMPONENTES___"+seq).val()
		var idprd = $("#VIEWIDPRDCOMPONENTES___"+seq).val()
		var prioridade = $("#VIEWPRIORIDADEATVCOMPONENTES___"+seq).val()

		console.log("substituto "+substituto)
		
		if(!(lista=="L") && !(substituto=="" || substituto==null || substituto==undefined)){

			var sub = {IDPRD:idprd,SUBSTITUTO:substituto,PRIORIDADE:prioridade};
			
			substitutos.push(sub)
			
		} 
		
	})
	
	console.log("substitutos")
	console.log(substitutos)
	
	return substitutos	
	
}

// PREENCHE OS SUBSTITUTOS JÁ SALVOS
function preencheSubstitutos(substitutos){
	
	console.log("preenche os substitutos que já foram salvos")
	
	console.log("tam: "+substitutos.length)
	
	// PERCORRE OS SUBSTITUTOS SALVOS
	for(var i=0; i<substitutos.length; i++) {
     	
      var idprdAux = substitutos[i].IDPRD
      var substituto = substitutos[i].SUBSTITUTO
      var prioridadeAux = substitutos[i].PRIORIDADE
     
      console.log("idprdAux: "+idprdAux+", substituto: "+substituto+", prioridadeAux: "+prioridadeAux)
      
      // PERCORRE OS REGISTROS DOS COMPONENTES
      $("input[id^='VIEWPRODUTOCOMPONENTES___']").each(function(){
    	  
    	  var seq = $(this).attr("id").split("___")[1]
    	  
    	  var produto = $("#VIEWCODIGOPRDCOMPONENTES___"+seq).val()
  		  var lista = $("#VIEWLISTACOMPONENTES___"+seq).val()
  	 	  var idprd = $("#VIEWIDPRDCOMPONENTES___"+seq).val()
  		  var prioridade = $("#VIEWPRIORIDADEATVCOMPONENTES___"+seq).val()
    	  
  		  console.log("lista: "+lista+", idprd: "+idprd+", prioridade: "+prioridade)
  		  
		  // É O PRODUTO VINCULADO A MESMA ATIVIDADE
		  if(idprd==idprdAux && prioridade==prioridadeAux && !(lista=="L")){
  				  
	  		  $("#VIEWSUBSTITUTOCOMPONENTES___"+seq).val(substituto)
  				
  		  }
  		  
      })
      
	}
    
}

// VERIFICA SE TODOS OS CAMPOS OBRIGATÓRIOS FORAM PREENCHIDOS PARA QUE A SOLICITAÇÃO POSSA SER FINALIZADA
function camposObrigatorios(){
	
	console.log("verifica se todos os campos obrigatórios foram preenchidos")
	
	var numOS = $("#NUM_OS").val()
	
	console.log("numOS: "+numOS)
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	
	var constraints = new Array(c1)
	
	var dataset = DatasetFactory.getDataset("dsBuscaEstrutura",null,constraints,null)
	var row = dataset.values

	var indices = ""
	
	console.log("row "+row)
	
	// SE RETORNO DA CONSULTA NÃO É VAZIO
	if(!(row==null || row=="" || row==undefined || row=="null")){
	
		var count = row.length
		
		console.log("count: "+count)
		
		// PERCORRE TODOS OS REGISTROS DO RETORNO DA CONSULTA
		for(var i=0; i<count; i++){
			
			var rep = row[i]
			
			var tipoDesenho = rep["TIPODESENHO"]
			var desQtde = rep["DESQTDE"]
			var pesoBruto = rep["PESOBRUTO"]
			var undMedida = rep["UNDMEDIDA"]
			var codTarefa = rep["CODTRFITEM"]
			var qtdeUnComp = rep["QTDEUNCOMP"]
			var comporLista = rep["COMPORLISTA"]
	
			pesoBruto = pesoBruto.toString().replace(",",".")
			pesoBruto = parseFloat(pesoBruto)
			
			var condicao
			
			// SE É UM NÃO MANUFATURADO
			if(tipoDesenho=="NAOMANUFATURADO" || tipoDesenho=="INDUSTRIALIZACAO"){
				
				if(comporLista){
					
					condicao = (desQtde=="" || desQtde==null || desQtde==undefined) || 
					(pesoBruto=="" || pesoBruto==null || pesoBruto==undefined || pesoBruto=="0" || pesoBruto=="NaN" || isNaN(pesoBruto)) || 
					(codTarefa=="" || codTarefa==null || codTarefa==undefined) ||
					(tipoDesenho=="" || tipoDesenho==null || tipoDesenho==undefined) || (qtdeUnComp=="" || qtdeUnComp==null || qtdeUnComp==undefined)
					
				} else {
					
					condicao = (desQtde=="" || desQtde==null || desQtde==undefined) || 
					(pesoBruto=="" || pesoBruto==null || pesoBruto==undefined || pesoBruto=="0" || pesoBruto=="NaN" || isNaN(pesoBruto)) || 
					(codTarefa=="" || codTarefa==null || codTarefa==undefined) ||
					(tipoDesenho=="" || tipoDesenho==null || tipoDesenho==undefined)
					
				}
						
			}else{
				// SE NÃO
				
				if(comporLista){
					
					condicao = (desQtde=="" || desQtde==null || desQtde==undefined) || 
					(pesoBruto=="" || pesoBruto==null || pesoBruto==undefined || pesoBruto=="0" || pesoBruto=="NaN" || isNaN(pesoBruto)) || 
					(undMedida=="" || undMedida==null || undMedida==undefined) || (codTarefa=="" || codTarefa==null || codTarefa==undefined) ||
					(tipoDesenho=="" || tipoDesenho==null || tipoDesenho==undefined) || (qtdeUnComp=="" || qtdeUnComp==null || qtdeUnComp==undefined) 
						
				}else{
					
					condicao = (desQtde=="" || desQtde==null || desQtde==undefined) || 
					(pesoBruto=="" || pesoBruto==null || pesoBruto==undefined || pesoBruto=="0" || pesoBruto=="NaN" || isNaN(pesoBruto)) || 
					(undMedida=="" || undMedida==null || undMedida==undefined) || (codTarefa=="" || codTarefa==null || codTarefa==undefined) ||
					(tipoDesenho=="" || tipoDesenho==null || tipoDesenho==undefined)  
							
				}
						
			}
		
			console.log("condição: "+condicao)
				
			// SE OS CAMPOS OBRIGATÓRIOS NÃO FORAM PREENCHIDOS
			if( condicao ){
				
				console.log("campos obrigatórios não preenchidos")
				
				// SE É O PRIMEIRO
				if(indices=="" || indices==null || indices==undefined){
					
					indices = rep["INDICE"]
					
				} 
				
				// SE NÃO
				else {
					
					indices = indices + " , "+rep["INDICE"]
					
				}
				
			}
			
		}
		
	}
	
	console.log("indices: "+indices)
	
	return indices 
	
}

// VERIFICA SE EXISTEM ITENS COM PROCESSOS, MAS SEM COMPONENTES E SEM FILHOS
function verificaRegraComp(){
	
	var numOS = $("#NUM_OS").val()
	var indices = new Array()
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	var constraints = new Array(c1)
	
	var dataset = DatasetFactory.getDataset("dsPendenciasEstrutura",null,constraints,null)
	
	var row = dataset.values
	
	console.log("row:")
	console.log(row)
	
	// SE NÃO TEVE NENHUM RETORNO 
	if(!(row=="" || row==undefined || row==null)){
		
		var count = row.length
		
		console.log("count: "+count)
				
		// PERCORRE TODOS OS REGISTROS
		for(var i=0; i<count; i++){
			
			var rep = row[i]
			
			var indice = rep["INDICE"]
			var tipoDesenho = rep["TIPODESENHO"]
			var temProcesso = rep["TEMPROCESSO"]
			var temComponentes = rep["TEMCOMPONENTES"] 
			var temFilhos = rep["TEMFILHOS"]

			if( (tipoDesenho=="ACABADO" || tipoDesenho=="SEMIACABADO") && temProcesso=="SIM" && temComponentes=="NAO" && temFilhos=="NAO"){
				
				temCampos = true

				indices.push(indice)
				
			}
		}
		
	}
	
	indices = indices.toString()

	console.log("Indices: "+indices)
	
	return indices
	
}

// VERIFICA SE OS ITENS NÃO MANUFATURADOS ATENDEM AS REGRAS
function verificaNaoManufaturados(){
	
	console.log("verifica se os itens não manufaturados atendem as regras")
	
	var numOS = $("#NUM_OS").val()
	
	console.log("numOS: "+numOS)
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	
	var constraints = new Array(c1)
	
	var dataset = DatasetFactory.getDataset("dsBuscaEstrutura",null,constraints,null)
	var row = dataset.values

	var indices = ""
	
	console.log("row "+row)
	
	// SE RETORNO DA CONSULTA NÃO É VAZIO
	if(!(row==null || row=="" || row==undefined || row=="null")){
	
		var count = row.length
		
		console.log("count: "+count)
		
		// PERCORRE TODOS OS REGISTROS DO RETORNO DA CONSULTA
		for(var i=0; i<count; i++){
			
			var rep = row[i]
			
			var tipoDesenho = rep["TIPODESENHO"]
			var idCriacao = rep["IDCRIACAO"]
			var indice = rep["INDICE"]
			var nivel = rep["NIVEL"]
	
			// SE É UM NÃO MANUFATURADO
			if(tipoDesenho=="NAOMANUFATURADO" || tipoDesenho=="INDUSTRIALIZACAO"){
				
				console.log("É NAOMANUFATURADO")
				
				// SE NÃO TEM COMPONENTE 
				if( ! (temComponente(idCriacao)) ){
					
					console.log("ITEM NÃO TEM COMPONENTE")
					
					// BUSCA O IDCRIACAO DO PAI
					var idCriacao = buscaIdCriacao(nivel)
					
					// SE O PAI TEM PROCESSO
					if(temProcesso(idCriacao)){
						
						console.log("ITEM TEM PAI COM PROCESSO")
						
						// SE É O PRIMEIRO ITEM
						if(indices=="" || indices==null || indices==undefined){
							
							console.log(">>>>>> INDICE "+indice+" é nao manufaturado e não atende as regras")
							
							indices = indice
							
						} else {
							// SE NÃO
							
							console.log(">>>>>> INDICE "+indice+" é nao manufaturado e não atende as regras")
							
							indices = indices + " , "+indice
							 
						}
						
					}
					
				}

			}
		
		}
		
	}
	
	return indices
	
}

// VERIFICA SE UM ITEM DA ESTRUTURA TEM COMPONENTE NA TABELA DOS COMPONENTES E NA LISTA DE MATERIAIS
function temComponente(idCriacao){
	
	console.log("verifica se um item da estrutura tem componente na tabela dos componentes e na lista de materiais")
	
	var numOS = $("#NUM_OS").val()
	
	console.log("numOS: "+numOS+", idCriacao: "+idCriacao)
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	var c2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
	
	var constraints = new Array(c1,c2)
	
	var dataset = DatasetFactory.getDataset("dsTemComponentes",null,constraints,null)
	var row = dataset.values

	console.log("row "+row)
	
	// SE RETORNO DA CONSULTA NÃO É VAZIO
	if(!(row==null || row=="" || row==undefined || row=="null")){
		
		console.log("tem componente")
		
		return true
		
	} else {
		// SE NÃO
		
		console.log("não tem componente")

		return false
		
	}
	
}

// VERIFICA SE UM ITEM DA ESTRUTURA TEM PROCESSO CADASTRADO
function temProcesso(idCriacao){
	
	console.log("verifica se um item da estrutura tem processo cadastrado")
	
	var numOS = $("#NUM_OS").val()
	
	console.log("numOS: "+numOS+", idCriacao: "+idCriacao)
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	var c2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
	
	var constraints = new Array(c1,c2)
	
	var dataset = DatasetFactory.getDataset("dsTemProcesso",null,constraints,null)
	var row = dataset.values

	console.log("row "+row)
	
	// SE RETORNO DA CONSULTA NÃO É VAZIO
	if(!(row==null || row=="" || row==undefined || row=="null")){
		
		console.log("tem processo")

		return true
		
	} else {
		// SE NÃO
		
		console.log("não tem processo")

		return false
		
	}
	
}

// SALVA O IDCRIACAO DO PAI PARA TODOS OS ITENS DA ESTRUTURA
function salvaIdCriacaoPai(){
	
	var numOS = $("#NUM_OS").val()
	
	console.log("vou salvar os IDCRIACAOPAI para todos os itens da estrutura da OS "+numOS)

	// CONSULTA BANCO
	var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	
	var constraints = new Array(a1)
	
	var dataset = DatasetFactory.getDataset("dsSalvaIdCriacaoPai",null,constraints,null)

}

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

// FUNÇÃO PARA ESCONDER A OPÇÃO DE INICIAR SOLICITAÇÃO COM BASE NA ATUAL
parent.$('.wcm-all-content').bind('DOMNodeInserted', function(e){
	

   // QUANDO APARECER A TELA DE "SOLICITAÇÃO INICIADA COM SUCESSO" IRÁ ENTRAR NESSE IF
   if (e.target.id == 'message-page') {
	  
    // ESCONDE A OPÇÃO DE "INICIAR SOLICITAÇÃO COM BASE NESTA"
    parent.$('[data-reset-process-instance-id]').hide()
    
  }	
  
})

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
	fechaPesquisa();

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

function fechaPesquisa(){
	var pesquisa=document.getElementById("pesquisa");
	pesquisa.style.display='none';
	$("#TEMPESQUISA").val(0)
}

function BuscaPesquisa(){

	console.log("Função Busca Pesquisa")

	var campo = $("#campospesquisa option:selected").val();
	console.log("🚀 ~ file: utils.js ~ line 11632 ~ BuscaPesquisa ~ campo", campo)
	var valor = $("#VALORPESQUISA").val();
	var os = $("#NUM_OS").val();
	//var exec = $("#EXECUCAO_INFO").val(); //OLHAR SE O CAMPO EXISTE 
	//var codtrfpai = $("#CODTRFEX").val()  //OLHAR SE O CAMPO EXISTE 

	var arraypesquisa = new Array();
	var rep;

	var c1 = DatasetFactory.createConstraint("CAMPO",campo,campo,ConstraintType.MUST)
	var c2 = DatasetFactory.createConstraint("VALOR",valor,valor,ConstraintType.MUST)
	var c3 = DatasetFactory.createConstraint("OS",os,os,ConstraintType.MUST)
	//var c4 = DatasetFactory.createConstraint("EXEC",exec,exec,ConstraintType.MUST)
	//var c5 = DatasetFactory.createConstraint("CODTRFPAI",codtrfpai,codtrfpai,ConstraintType.MUST)

	var constraints = new Array(c1,c2,c3)
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
    }
});

// RETORNA CORES DOS ITENS ORDENADOS
function coresOrdenadas(indice){

	var numOS = $("#NUM_OS").val()
	var execucao = $("#EXECUCAO_INFO").val()
	var codTrfEx = $("#CODTRFEX").val()
	var indicepai = $("#INDICEPAI").val()
	var coresOrd= new Array()
	var tipo;
	var L;
	var C;
	var P;
	var F;
	var CC;
	var rep;
	var verde = "#018b17"
	var amarelo = "#dccc00"
	var vermelho = "#b92113"
	var azul = "#0925ca"
	var laranja = "#ff5e00 "

	var c1 = DatasetFactory.createConstraint("NUM_OS",numOS,numOS,ConstraintType.MUST)
	var c2 = DatasetFactory.createConstraint("EXECUCAO",execucao,execucao,ConstraintType.MUST)
	var c3 = DatasetFactory.createConstraint("CODTRFEX",codTrfEx,codTrfEx,ConstraintType.MUST)
	var c4 = DatasetFactory.createConstraint("INDICE",indice,indice,ConstraintType.MUST)
	var c5 = DatasetFactory.createConstraint("INDICEPAI",indicepai,indicepai,ConstraintType.MUST)
	

	if( ! (numOS=="" || numOS==null || numOS==undefined) ){
		
		
		// SE A EXECUÇÃO FOI INFORMADA
		if( ! (execucao=="" || execucao==null || execucao==undefined) ){
			
			
			// SE O CÓDIGO DA TAREFA FOI INFORMADO
			if( ! (codTrfEx=="" || codTrfEx==null || codTrfEx==undefined) ){
			
				
				// BUSCA E CARREGA A ESTRUTURA
				var constraints = new Array(c1,c2,c3)
				
				
			} else {
				// SE NÃO
				
				// BUSCA E CARREGA A ESTRUTURA
				var constraints = new Array(c1,c2)
				
				
			}
			
		} else {
			// SE NÃO
			
			// BUSCA E CARREGA A ESTRUTURA
			var constraints = new Array(c1)
			
			
		}
		
	}

	if( ! (indice=="" || indice==null || indice==undefined) ){

		constraints.push(c4)

	}
	if( ! (indicepai=="" || indicepai==null || indicepai==undefined)){

		constraints.push(c5)

	}

	console.log("Constraints")
	console.log(constraints)
	// SE A EXECUÇÃO FOI INFORMADA
	if( ! (execucao=="" || execucao==null || execucao==undefined) ){
			
		var dataset = DatasetFactory.getDataset("dsSituacaoItemOsEX",null,constraints,null)
		var row = dataset.values
		
	} else {
		// SE NÃO
		
		// BUSCA E CARREGA A ESTRUTURA
		var dataset = DatasetFactory.getDataset("dsSituacaoItemOs",null,constraints,null)
		var row = dataset.values
		
	}

	for(var i=0; i<row.length; i++){

		rep = row[i]

		tipo=rep["TIPODESENHO"]
		console.log(i+" T", tipo)
		C=Number(rep["COMPONENTE"]) 
		console.log(i+" C", C)
		P=Number(rep["PROCESSO"])
		console.log(i+" P", P)
		L=Number(rep["LISTA"])
		console.log(i+" L", L)
		CC=Number(rep["COMPORLISTA"])
		console.log(i+" CC", CC)
		F=Number(rep["TEMFILHOS"])
		console.log(i+" F", F)

		if(tipo=="NAOMANUFATURADO"){

			if(!C){
				coresOrd.push("style='color:"+vermelho+" !important; border-color: "+vermelho+" !important; border-left: 2px solid; padding: 2;'")
			}
			else if(( C && !L )){
				coresOrd.push("style='color:"+amarelo+" !important; border-color: "+amarelo+" !important; border-left: 2px solid; padding: 2;'")
			}
			else{
				coresOrd.push("style='color:"+verde+" !important; border-color: "+verde+" !important; border-left: 2px solid; padding: 2;'")
			}

		}
		else if(tipo=="INDUSTRIALIZACAO"){

			if(!C){
				coresOrd.push("style='color:"+vermelho+" !important; border-color: "+vermelho+" !important; border-left: 2px solid; border-right: 2px solid; padding: 2;'")
			}
			else if(( C && !L )){
				coresOrd.push("style='color:"+amarelo+" !important; border-color: "+amarelo+" !important; border-left: 2px solid; border-right: 2px solid; padding: 2;'")
			}
			else{
				coresOrd.push("style='color:"+verde+" !important; border-color: "+verde+" !important; border-left: 2px solid; border-right: 2px solid; padding: 2;'")
			}

		}
		else{

			if(( CC && !P && !L )){
				coresOrd.push("style='color:"+azul+" !important;'")
			}
			else if((!P && !CC) || (  !P && L )){
				coresOrd.push("style='color:"+vermelho+" !important;'")
			}
			else if(( CC && P && !L )){
				coresOrd.push("style='color:"+amarelo+" !important;'")
			}
			else if(!C && P && !F){
				coresOrd.push("style='color:"+laranja+" !important;'")
			}
			else{
				coresOrd.push("style='color:"+verde+" !important;'")
			}

		}

		console.log(coresOrd[i])

	}

	return coresOrd;


}

// VERIFICA SE EXISTEM ITENS DA LISTA DE MATERIAIS QUE TEM UNCOMP INFORMADA INCORRETA
function unCompIncorreta(){
	
	console.log("verifica se existem itens da lista de materiais que tem uncomp informada incorreta")
	
	var numOS = $("#NUM_OS").val()
	var indices = ""	
	
	var a1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	
	var constraints = new Array(a1)
	
	var dataset = DatasetFactory.getDataset("dsUnCompIncorreta",null,constraints,null)
	
	console.log("dataset: "+dataset)
	console.log(dataset)
	
	var row = dataset.values
	
	console.log("row")
	console.log(row)
	
	// SE RETORNO NÃO É VAZIO E NEM NULO
	if(!(row=="" || row==null || row==undefined)){
		
		var count = dataset.values.length
		
		// PERCORRE TODOS OS REGISTROS E SALVA NO ARRAY
		for(var i=0; i<count; i++){
			
			var rep = row[i]
			var indice = rep["INDICE"]
			   
			if(i==0){
				
				indices = indice
				
			} else {
				
				indices = indices +", "+ indice	
				
			}
			
		}
			
	}
	
	console.log("indices: "+indices)
	
	return indices
	
}

//SE CAMPO DO NUMERO DO DESENHO FOI ALTERADO
$("#NUMDESENHO_INFO").on("keydown",function(){
	
	contadorCarecteres()
	
})

// SE CAMPO POSIÇÃO FOI ALTERADO
$("#POSICAO_INFO").on("keydown",function(){
	
	contadorCarecteres()
	
})

// SE CAMPO DO DESCRIÇÃO FOI ALTERADO
$("#DESCRICAO_INFO").on("keydown",function(){
	
	contadorCarecteres()
	
})

// CONTADOR DE CARACTERES PARA OS CAMPOS QUE COMPÕEM A DESCRIÇÃO DO PRODUTO
function contadorCarecteres(){
	
	$("#CONTADOR").remove()
	var contador = 119

	var soma = 0

	soma = $("#NUMDESENHO_INFO").val().length 
	soma = soma  + $("#POSICAO_INFO").val().length
	soma = soma + $("#DESCRICAO_INFO").val().length
	 
	console.log("soma: "+soma)

	$("#NUMDESENHO_INFO").parent("div").parent("div").after("<div class='row form-group' id='CONTADOR' style='padding-left:30px;padding-top:10px;'><span>Caracteres restantes: "+(contador - soma)+"</span></div>")
	
}

// VERIFICA CONTEÚDO DOS CAMPOS INPUT E TEXTAREA
$("input, textarea").on("blur",function(){

	console.log("tirou foca de um input ou textarea")
		
	if($(this).val().toString().includes("'") || $(this).val().toString().includes("\"")){
		
		var self = this
		
		//$(this).val().toString().replace(/[',"]/g," ")
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'warning',
			  title: "Não é permitido utilizar (') ou (\") nos campos do tipo texto",
			  text: 'Corrija o conteúdo inserido e tente novamente'
				  
		}).then(function(result) {
			
			console.log("botão ok")
			
			$(self).focus()
			
		})
		
	}
	
})

// SIMULA O CLIQUE DO BOTÃO CANCELAR AO PRESSIONAR A TECLA "ESC"
window.addEventListener('keydown', function (event) {

    if (event.key == 'Escape') {

        // Cancel the default action, if needed

        event.preventDefault();

        // do something here

        cancelar();

    }

});

function PreparaAviso(obj){

	var a = $(obj).val();

	if($("#F_COMPORLISTA").prop("checked")){

		console.log("preparei com valor :"+a)
		$("#F_PESOUNITARIO").change(function(e){AvisoListaMateriais(a,obj)})
	
	}
	else{

		$("#F_PESOUNITARIO").change(function(e){formataValor(obj);alteraQtdeComponentesPeso();})
		
	}

}

function PreparaAvisoAoSalvar()
{

	if($("#F_COMPORLISTA").prop("checked")){

		$("#SALVAR2").attr("onclick",'AvisoListaMateriais2(2)')
		$("#SALVAR").attr("onclick",'AvisoListaMateriais2(1)')
	
	}

}

function AvisoListaMateriais2(op){

	Swal.fire({
		title: 'Este item deve ser revisado na Lista de Materiais?',
		showDenyButton: true,
		showCancelButton: false,
		confirmButtonText: 'Sim',
		denyButtonText: 'Não',
		icon: 'warning',
		confirmButtonColor : '#3085d6'
	  }).then(function(result){
		/* Read more about isConfirmed, isDenied below */
		if (result.isConfirmed) {

			var myLoading = FLUIGC.loading(window)

			myLoading.show()

			setTimeout(function(){

				RevisaoItemNaLista($("#F_NUMDESENHO").val(), $("#F_OS").val(), $("#F_DESCRICAO").val(), $("#F_POSICAODESENHO").val())

				myLoading.hide()

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
					title: 'Decisao salva'
				})

			},500)

		} else if (result.isDenied) {

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
				title: 'Decisao salva'
			})

		}

		if(op==2){
			salvar2('f')
		}
		else{
			salvar('f')
		}

		$("#SALVAR2").attr("onclick","salvar2('f')")
		$("#SALVAR").attr("onclick","salvar('f')")

	  })

}
// AVISO GERADO QUANDO O CAMPO PESO UNITÁRIO BRUTO É ALTERADO
function AvisoListaMateriais(e,obj){

	var valor = e;

	Swal.fire({
		title: 'Este item deve ser revisado na Lista de Materiais?',
		showDenyButton: true,
		showCancelButton: true,
		confirmButtonText: 'Sim',
		denyButtonText: 'Não',
		icon: 'warning',
		cancelButtonText : 'Cancelar',
		confirmButtonColor : '#3085d6'
	  }).then(function(result){
		/* Read more about isConfirmed, isDenied below */
		if (result.isConfirmed) {

			var myLoading = FLUIGC.loading(window)

			myLoading.show()

			setTimeout(function(){

				formataValor(obj);
				alteraQtdeComponentesPeso();

				RevisaoItemNaLista($("#F_NUMDESENHO").val(), $("#F_OS").val(), $("#F_DESCRICAO").val(), $("#F_POSICAODESENHO").val())

				myLoading.hide()

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
					title: 'Decisao salva'
				})

			},500)

		} else if (result.isDenied) {

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
				title: 'Decisao salva'
			})
		  	formataValor(obj);
		  	alteraQtdeComponentesPeso();

		}
		else{

			$("#F_PESOUNITARIO").val(valor)

		}

	  })

}

function RevisaoItemNaLista(numdesenho,numos,descricao,posicao){

	var a1 = DatasetFactory.createConstraint("NUMDESENHO",numdesenho,numdesenho,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("NUMOS",numos,numos,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("DESCRICAO",descricao,descricao,ConstraintType.MUST)
	var a4 = DatasetFactory.createConstraint("POSICAO",posicao,posicao,ConstraintType.MUST)

	var constraints = new Array(a1,a2,a3,a4)

	console.log("executar dataset com filtros:"+numdesenho+","+numos+","+descricao+","+posicao)

	var dataset = DatasetFactory.getDataset("dsRevisarItemListaMateriais",null,constraints,null)



}

function verificaListaRevisao(){
	
	var numOS = $("#NUM_OS").val()
	//var indices = new Array()	
	
	var negado = false
	
	var b1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	//var b2 = DatasetFactory.createConstraint("INDICE",indice,indice,ConstraintType.MUST)
	
	var constraints = new Array(b1)
	
	var dataset = DatasetFactory.getDataset("dsVerificaListaRevisaoOS",null,constraints,null)
	console.log("dataset: "+dataset)
	console.log(dataset)
	var row = dataset.values
	
	// SE RETORNO É VAZIO OU NULO
	if(row=="" || row==null || row==undefined){
		
		negado = false
	
	} else {
		// SE NÃO
		
		console.log("row")
		console.log(row)
		
		var count = dataset.values.length
		
		if(count > 0 ){

			negado = true;

		}
		else{

			negado = false;

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


// VERIFICA SE ITEM É INDUSTRIALIZADO
function itemIndustrializado(indice){
	
	var numOS = $("#NUM_OS").val()
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("INDICE",indice,indice,ConstraintType.MUST);
	var constraints = new Array(c1,c2);
	
	var dataset = DatasetFactory.getDataset("dsItemIndustrializadoOS",null,constraints,null);
	
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


function validaItemDeRetorno(idCriacao,numOS){

	var c1 = DatasetFactory.createConstraint("OSCOMPONENTES",numOS,numOS,ConstraintType.MUST)
	var c2 = DatasetFactory.createConstraint("IDCRIACAOCOMPONENTES",idCriacao,idCriacao,ConstraintType.MUST)

	var constraint = new Array(c1,c2)

	var dataset = DatasetFactory.getDataset("dsBuscaComponentesItemOS",null,constraint,null)

	var row = dataset.values

	if(row.count > 1){

		return {VER:false,TEXT:'Item possui mais de um componente e não atende requisitos'}

	}
	else{

		var codigoprd = row[0]["CODIGOPRDCOMPONENTES"]

		if(codigoPrd.search("01.051")==-1){

			return {VER:false,TEXT:'Item possui componente diferente de 01.051 e não atende requisitos'}

		}
		else{

			return {VER:true,TEXT:''}

		}

	}

}

function verificaItensIguaisTipo(){

	var numOS = $("#NUM_OS").val()

	var str = ""

	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)

	var constraint = new Array(c1)

	var dataset = DatasetFactory.getDataset("dsBuscaItensTiposDiferenteOS",null,constraint,null)

	var row = dataset.values

	if(row!=null && row!="null" && row!="" && row!=undefined){

		for (var i = 0; i < row.length; i++) {
			 
			str += row[i]["INDICE"]+"; ";
			
		}

		return {VER:false,TEXT:str}

	}
	else{



		return {VER:true,TEXT:''}


	}

}

function regrasNaoManufaturado(){

	var numOS = $("#NUM_OS").val()


	var str = ""

	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)

	var constraint = new Array(c1)

	var dataset = DatasetFactory.getDataset("dsBuscaPendenciasNaoManufaturado",null,constraint,null)

	var row = dataset.values

	if(row!=null && row!="null" && row!="" && row!=undefined){

		for (var i = 0; i < row.length; i++) {
			 
			str += row[i]["INDICE"]+"; ";
			
		}

		return {VER:false,TEXT:str}

	}
	else{



		return {VER:true,TEXT:''}


	}



}

function regrasIndustrializado(){

	var numOS = $("#NUM_OS").val()

	var str = ""

	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)

	var constraint = new Array(c1)

	var dataset = DatasetFactory.getDataset("dsBuscaPendenciasIndustrializado",null,constraint,null)

	var row = dataset.values

	if(row!=null && row!="null" && row!="" && row!=undefined){

		for (var i = 0; i < row.length; i++) {
			 
			str += row[i]["INDICE"]+"; ";
			
		}

		return {VER:false,TEXT:str}

	}
	else{



		return {VER:true,TEXT:''}


	}


}


function limpaItemRetorno(){

	$("#ITEM_DE_RETORNO>option").remove()
	$("#F_ITEMRETORNO").val("")

}

function desabiltaItemRetorno(){

	$("#ITEM_DE_RETORNO").prop("disabled",true)
}
