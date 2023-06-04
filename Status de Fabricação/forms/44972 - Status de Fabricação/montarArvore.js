// MONTA A VIEW DA ESTRUTURA
function montarView(){
	
	var indices = new Array()
	var indicesOrdenados = new Array()
	
	var numOS = $("#NUM_OS").val()
	
	// SALVA O ARRAY DOS ÍNDICES GERADOS
	indices = retornaArrayIndices()

	// SALVA O ARRAY DOS ÍNDICES ORDENADOS
	indicesOrdenados = montarEstrutura(indices)
	
	// IMPRIME ARRAY
	console.log(indices)
	console.log(indicesOrdenados)
	
}

// RETORNA O ARRAY DE INDICES
function retornaArrayIndices(){
	
	var numOS = $("#NUM_OS").val()
	
	// CONSULTA BANCO
	var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	var constraints = new Array(c1)
	
	//dataset = DatasetFactory.getDataset("dsBuscaEstruturaIntegrada",null,constraints,null)
	dataset = DatasetFactory.getDataset("dsBuscaEstrutura",null,constraints,null)
	
	var row = dataset.values
	console.log("ROW: "+row)
	var count = dataset.values.length
	
	console.log("COUNT: "+count)
	
	// SALVA O ARRAY DOS ÍNDICES GERADOS
	indices = arrayIndices(row,count)
	
	return indices
	
}

// MONTA ARRAY COM OS ÍNDICES DA ESTRUTURA
function arrayIndices(row,count){
	
	var indices = new Array() 
	
	//var count = dataset.values.length;
	//console.log("row "+row)
	
	//console.log("Valor de count "+count)
	
	// SE ENCONTROU
	if(!(row=="" || row==null || row==undefined)){
		
		for(var i=0; i<count; i++){
			
			var rep = row[i]
			
			// VARIÁVEL PARA GUARDAR O ÍNDICE DO ITEM
			var indice = rep["INDICE"]
			
			indices.push(indice)
		
		}
	
	}
	
	// PERCORRE A TABELA E ADICIONA OS ÍNDICES NO ARRAY
	/*$("input[id^=NIVEL___]").each(function(index,value){
		
		// VARIÁVL PARA GUARDAR P SEQ DO ITEM NA TABELA
		var seq = $(this).attr("id").split("___")[1]
		
		// VARIÁVEL PARA GUARDAR O ÍNDICE DO ITEM
		var indice = $("#INDICE___"+seq).val()
		
		indices.push(indice)
		
	})*/
	
	console.log("entrei para montar array de índices")
	console.log(indices)
	
	return indices
	
}

// MONTA A ESTRUTURA DA ÁRVORE DE ACORDO COM OS ÍNDICES
function montarEstrutura(indices){
	
	// ARRAY PARA SALVAR A ORDENAÇÃO
	var salvos = new Array()
	
	// ENQUANTO O ARRAY NÃO ESTIVER VAZIO
	while(indices.length>0){
		
		console.log("array não está vazio")
		
		// MONTAR PAI
		novaMontarPai(indices[0],indices,salvos)
		//novaMontarPai(indices[0],indices,salvos)
		
	}
	
	return salvos
	
}

// FUNÇÃO PARA CONSTRUIR A ESTRUTURA DA ÁRVORE
function novaMontarPai(indice,indices,salvos){
	
	console.log("entrei para montar Pai")
	
	// ENQUANTO INDICE TEM PAI
	while(idTemPai(indice,indices,0)){
		
		// VARIÁVEL PARA O PAI
		var pai = idTemPai(indice,indices,1)
		
		console.log(indice+" tem Pai: "+pai)
		
		// MONTA O PAI
		novaMontarPai(pai,indices,salvos)
		
	}
	
	console.log(indice+" não tem pai")
	
	// ENQUANTO ÍNDICE TEM IRMÃO À ESQUERDA
	while(idTemIrmaoEsq(indice,indices,0)){
		
		// VARIÁVEL PARA O IRMÃO À ESQUERDA
		var irmaoEsq = idTemIrmaoEsq(indice,indices,1)
		
		console.log(indice+" tem IrmãoEsq: "+irmaoEsq)
		
		// MONTA O PAI
		novaMontarPai(irmaoEsq,indices,salvos)
		
	}
	
	console.log(indice+" não tem Irmao esquerda")
	
	// SE SALVOS NÃO CONTÉM ÍNDICE
	if(salvos.indexOf(indice)==-1){
		
		console.log("salvos não contém "+indice)
		
		// SALVA O ÍNDICE
		salvos.push(indice)
		
		console.log("salvei "+indice)
		console.log(salvos)
		
		// REMOVE O ELEMENTO DO ARRAY
		indices.splice(indices.indexOf(indice),1)
		
		console.log("vou remover "+indice)
		console.log(indices)
		
	}
	
	// ENQUANTO ÍNDICE TEM FILHO
	while(idTemFilho(indice,indices,0)){
				
		// VARIÁVEL PARA O FILHO
		var filho = idTemFilho(indice,indices,1)
	
		console.log(indice+" tem Filho: "+filho)

		// MONTA O PAI
		novaMontarPai(filho,indices,salvos)
		
	}
	
	console.log(indice+" não tem filho")

}

// MONTA PAI DA ESTRUTURA
/*function montarPai(indice,indices,salvos){
	
	console.log("entrei para montar Pai")
	
	// ENQUANTO INDICE TEM PAI
	while(idTemPai(indice,indices,0)){
		
		// VARIÁVEL PARA O PAI
		var pai = idTemPai(indice,indices,1)
		
		console.log(indice+" tem Pai: "+pai)
		
		// MONTA O PAI
		montarPai(pai,indices,salvos)
		
	}
	
	console.log(indice+" não tem pai")
	
	// ENQUANTO ÍNDICE TEM IRMÃO À ESQUERDA
	while(idTemIrmaoEsq(indice,indices,0)){
		
		// VARIÁVEL PARA O IRMÃO À ESQUERDA
		var irmaoEsq = idTemIrmaoEsq(indice,indices,1)
		
		console.log(indice+" tem IrmãoEsq: "+irmaoEsq)
		
		// MONTA O PAI
		montarPai(irmaoEsq,indices,salvos)
		
	}
	
	console.log(indice+" não tem Irmao esquerda")
	
	// SALVA O ÍNDICE
	salvos.push(indice)
	console.log("salvei "+indice)
	console.log(salvos)
	// REMOVE O ELEMENTO DO ARRAY
	indices.splice(indices.indexOf(indice),1)
	console.log("vou remover "+indice)
	
	// ENQUANTO ÍNDICE TEM FILHO
	while(idTemFilho(indice,indices,0)){
				
		// VARIÁVEL PARA O FILHO
		var filho = idTemFilho(indice,indices,1)
	
		console.log(indice+" tem Filho: "+filho)

		// MONTA O PAI
		montarFilho(filho,indices,salvos)
		
	}
	console.log(indice+" não tem filho")
	
	
}

// MONTA FILHO DA ESTRUTURA
function montarFilho(index,indexes,saves){
	
	console.log("entrei para montar filho")
	
	// ENQUANTO ÍNDICE TEM IRMÃO À ESQUERDA
	while(idTemIrmaoEsq(index,indexes,0)){
		
		// VARIÁVEL PARA O IRMÃO À ESQUERDA
		var irmaoEsquerda = idTemIrmaoEsq(index,indexes,1)
		
		//console.log(index+" tem IrmãoEsq: "+irmaoEsquerda)
		
		// MONTA O PAI
		montarFilho(irmaoEsquerda,indexes,saves)
		
	}
	//console.log(index+" não tem irmão a esquerda")
	
	// SALVA O ÍNDICE
	saves.push(index)
	//console.log("salvei "+index)
	
	// REMOVE O ELEMENTO DO ARRAY
	indexes.splice(indexes.indexOf(index),1)
	console.log("vou remover "+index)
	
	// ENQUANTO ÍNDICE TEM FILHO
	while(idTemFilho(index,indexes,0)){
		
		// VARIÁVEL PARA O FILHO
		var filho = idTemFilho(index,indexes,1)
		
		//console.log(index+" tem Filho: "+filho)
		
		// MONTA O PAI
		montarFilho(filho,indexes,saves)
		
	}
	
	console.log(index+" não tem filho")
	
}*/

// BUSCA SE TEM PAI E RETORNA DE ACORDO COM A CHAMADA  
function idTemPai(indice,indices,op){
	
	// FLAG PARA CONTROLE
	var temPai = true
	
	// VARIÁVEL PARA GUARDAR O PAI
	var pai = indice.substr(0,indice.lastIndexOf("."))
	
	// SE NÃO EXISTE PAI NA ESTRUTURA
	if(indices.indexOf(pai)==-1){
		
		temPai = false
		
	}
	
	// SE CHAMADA É 0
	if(op==0){
		
		return temPai
		
	}
	
	// SE CHAMADA É 1
	if(op==1){
		
		return pai
		
	}
	
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
		
		if(!(indices.indexOf(irmaoEsq)==-1)){
			
			//console.log("encontrei o irmao esquerda de "+indice+" é o "+irmaoEsq)
			flag = false	
			
		} 
		
		//posicao = parseInt(posicao)
		
	}
	
	//console.log("sai do loop irmao e o irmao esquerda encontrado é o "+irmaoEsq)
	
	// SE NÃO EXISTE IRMÃO À ESQUERDA
	if(indices.indexOf(irmaoEsq)==-1){
		
		temIrmaoEsquerda = false
		
	}
	
	// SE CHAMADA É 0
	if(op==0){
		
		return temIrmaoEsquerda
		
	}
	
	// SE CHAMADA É 1
	if(op==1){
		
		return irmaoEsq
		
	}
	
}

// BUSCA SE TEM IRMÃO À DIREITA DE ACORDO COM A CHAMADA
function idTemIrmaoDir(indice,indices,op){
	
	// FLAG PARA CONTROLE
	var temIrmaoDireita = true
	var flag = true
	
	// VARIÁVEL PARA GUARDAR O IRMÃO À ESQUERDA
	var irmaoDir = ""
	var nivel = indice.substr(0,indice.lastIndexOf("."))
	var posicao = ""
	
	// SE NÍVEL É VAZIO
	if(nivel==""){
		
		posicao = indice
		
	} else {
		
		posicao = indice.substr(indice.lastIndexOf(".")+1,indice.length)
		//posicao = parseInt(posicao)
		
	}
	
	posicao = parseInt(posicao)
	
	posicao = posicao + 1
	posicao = posicao.toString()
	
	if(nivel==""){
		
		irmaoDir = posicao
		//console.log("irmaoEsq "+irmaoEsq)
		
	}else{
		
		irmaoDir = nivel+"."+posicao
	}
	
	// SE NÃO EXISTE IRMÃO À ESQUERDA
	if(indices.indexOf(irmaoDir)==-1){
		
		temIrmaoDireita = false
		
	}
	
	// SE CHAMADA É 0
	if(op==0){
		
		return temIrmaoDireita
		
	}
	
	// SE CHAMADA É 1
	if(op==1){
		
		return irmaoDir
		
	}
	
}

// BUSCA SE TEM FILHO DE ACORDO COM A CHAMADA
function idTemFilho(indice,indices,op){
	
	// FLAG PARA CONTROLE
	var temFilho = true
	var filho = ""
		
	console.log("VOU VERIFICAR SE "+indice+" TEM FILHO")
	console.log(indices)
	
	var pontos = indice.replace(/[^.]/g, "").length
	pontos = pontos + 1
	//console.log("pontos: "+pontos)
	// PERCORRE O ARRAY DE ÍNDICES
	
	for(var k=0; k < indices.length; k++){
		
		var pontosAr = indices[k].replace(/[^.]/g, "").length
		//console.log("pontosAr: "+pontosAr)
		
		// SE QUANTIDADE DE PONTOS É IGUAL AO DO FILHO
		if(pontosAr==pontos){
			
			var paiIndice = indices[k].substr(0,indices[k].lastIndexOf("."))
			//console.log("indices[k]: "+indices[k])
			// VERIFICA SE ÍNDICE PODE SER FILHO DO ÍNDICE ATUAL
			if(paiIndice==indice){
				
				filho = indices[k]
				//console.log("filho: "+filho)
				
			}
			
		}
		
	}
	
	// SE NÃO EXISTE FILHO
	if(indices.indexOf(filho)==-1){
		
		console.log("não tem filho")
		temFilho = false
		
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

// INCREMENTA O ÍNDICE ATUAL E DE TODOS OS IRMÃOS A DIREITA
function incrementaIndice(indice,indices){
	
	// ENQUANTO TEM IRMÃO A DIREITA
	while(idTemIrmaoDir(indice,indices,0)){
		
		// RECEBE IRMÃO A DIREITA
		//var irmaoDireita = buscaIrmaoDireita(indice)
		var irmaoDireita = idTemIrmaoDir(indice,indices,1)
		
		// AVANÇA ÍNDICE DO IRMÃO
		incrementaIndice(irmaoDireita,indices)
		
	}
	
	// GERA NOVO NIVEL
	var nivel = indice.substr(0,indice.lastIndexOf("."))
	var novaPosicao = indice.substr(indice.lastIndexOf(".")+1,indice.length)
	novaPosicao = parseInt(novaPosicao)
	novaPosicao = novaPosicao + 1
	var novoIndice = ""
	
	// SE NÍVEL É VAZIO
	if(nivel==""){
		
		novoIndice = novaPosicao
		
	}else{
		// SE NÃO
		
		novoIndice = nivel+"."+novaPosicao
		
	}
	
	//var seq = buscaSeqIrmao(indice)
	var idCriacao = buscaIdCriacao(indice)
	
	// ALTERA O ÍNDICE ATUAL E DOS FILHOS PARA O NOVO GERADO
	alteraIndice(novoIndice, indice, idCriacao, nivel, novaPosicao, 0, indices)
	
}

// DECREMENTA O ÍNDICE ATUAL E TODOS A DIREITA
function decrementaIndice(indice,indices){
	
	console.log("vou decrementar indice "+indice)
	
	var arrayAntigos = new Array()
	var arrayNovos = new Array()
	var arrayAntigosGeral = new Array()
	var arrayNovosGeral = new Array()
	var arrayIndices = new Array()
	
	// ENQUANTO TEM IRMÃO A DIREITA
	while(idTemIrmaoDir(indice,indices,0)){
		
		// RECEBE IRMÃO A DIREITA
		var irmaoDireita = idTemIrmaoDir(indice,indices,1)
		var novoIndice = ""
		
		//console.log(indice+" tem irmao a direita e é o "+irmaoDireita)
		
		// GERA NOVO NIVEL
		var nivel = irmaoDireita.substr(0,irmaoDireita.lastIndexOf("."))
		var novaPosicao = irmaoDireita.substr(irmaoDireita.lastIndexOf(".")+1,irmaoDireita.length)
		novaPosicao = parseInt(novaPosicao)
		novaPosicao = novaPosicao - 1
		
		// SE NÍVEL É VAZIO
		if(nivel==""){
			
			novoIndice = novaPosicao
			
		}else{
			// SE NÃO
			
			novoIndice = nivel+"."+novaPosicao
			
		}
		
		//var seq = buscaSeqIrmao(irmaoDireita)
		var idCriacao = buscaIdCriacao(irmaoDireita)
		
		// ALTERA O ÍNDICE ATUAL E DOS FILHOS PARA O NOVO GERADO
		arrayIndices = alteraIndice(novoIndice, irmaoDireita, idCriacao, nivel, novaPosicao, 0, indices)
		
		arrayAntigos = arrayIndices.slice(0,arrayIndices.length/2)
		arrayNovos = arrayIndices.slice(arrayIndices.length/2,arrayIndices.length)
		
		arrayAntigosGeral.push(arrayAntigos)
		arrayNovosGeral.push(arrayNovos)
		
		indice = irmaoDireita
		
		// DEC ÍNDICE DO IRMÃO
		//decrementaIndice(irmaoDireita)
		
	}
		
	console.log("finalizei decremento")
	
	console.log("arrayAntigos "+arrayAntigosGeral)
	console.log("arrayNovos "+arrayNovosGeral)
	
	arrayAntigosGeral = arrayAntigosGeral.concat(arrayNovosGeral)
	
	return arrayAntigosGeral;
	
}

// BOTÃO PARA SUBIR O ÍNDICE
function btnSobeIndice(){
	
	var indice = $("#INDICE_INFO").val()

	// ATIVA O LOADING
	ativaSpinner()
	
	// TIMEOUT PARA EXECUÇÃO DA FUNÇÃO
	setTimeout(function (){
		
		// SE TABELA JÁ TEM ITENS
		//if(tabelaTemItens()){

			var nivel = indice.substr(0,indice.lastIndexOf("."))
			
			var idCriacao = buscaIdCriacao(nivel)
			
			// MONTA UM ARRAY COM TODOS OS ÍNDICES
			var indices =  retornaArrayIndices()
			
			console.log("indice: "+indice)
			console.log("indices: "+indices)
			
			// SOBE O INDICE
			indice = sobeIndice(indice,indices)
			
			$("#INDICE_INFO").val(indice)
			
			// ATUALIZA A VIEW
			//atualizar()
			atualizarNivel(idCriacao)
			
			// COLOCA A SELEÇÃO NO ITEM
			//colocaSelecaoItem(indice)
			// TRANSFORMA ÍNDICE EM ID DO SPAN 
			//indice = indice.replace(/\D+/g, '');
			/*var tamPai = indice.substr(0,indice.lastIndexOf("."))
			tamPai = tamPai.length
			indice = indice.replace(/\D+/g, '');
			indice = indice+""+tamPai*/
			
			indice = indice.replace(/\./g,"P")
			
			$("#SPANINTERNO"+indice+"").click()
			
			//$("#SPANINTERNO"+indice+"").focus()
			//$(".divCroqui").focus()
			//colocaSelecaoItem(indice)
			
			$(".fluigicon-circle-arrow-up").mouseout()
			//$(".fluigicon-circle-arrow-up").mouseover()
			
			// FAZ A ALTERAÇÃO DO CÁLCULO DA QUANTIDADE TOTAL
			alteraDesQtdeGeral()
	
		//}
		
	},500)
	
	setTimeout(function(){
		
		// DESATIVA O LOADING
		desativaSpinner()
		
		// SE ÍNDICE NÃO SUBIU
		if(indice==""){
			
			// EXIBE ALERTA
			var Toast = Swal.mixin({
				  toast: true,
				  position: 'center',
				  showConfirmButton: false,
				  timer: 2000,
				  timerProgressBar: true,
			})
		
			Toast.fire({
				  icon: 'error',
				  title: 'Não é possível subir!'
			})
			
		}
	
	},500)
	
}

// BOTÃO PARA DESCER O ÍNDICE
function btnDesceIndice(){

	var indice = $("#INDICE_INFO").val()

	// ATIVA O LOADING
	ativaSpinner()
	
	// TIMEOUT PARA EXECUÇÃO DA FUNÇÃO
	setTimeout(function (){
		
		// SE TABELA JÁ TEM ITENS
		//if(tabelaTemItens()){
			
			var nivel = indice.substr(0,indice.lastIndexOf("."))
			
			var idCriacao = buscaIdCriacao(nivel)
			
			// MONTA UM ARRAY COM TODOS OS ÍNDICES
			var indices =  retornaArrayIndices()
			
			// DESCE O INDICE
			indice = desceIndice(indice,indices)
			
			$("#INDICE_INFO").val(indice)
			
			// ATUALIZA A VIEW
			//atualizar()
			atualizarNivel(idCriacao)
			
			// COLOCA A SELEÇÃO NO ITEM
			//colocaSelecaoItem(indice)
			// TRANSFORMA ÍNDICE EM ID DO SPAN 
			/*var tamPai = indice.substr(0,indice.lastIndexOf("."))
			tamPai = tamPai.length
			indice = indice.replace(/\D+/g, '');
			indice = indice+""+tamPai*/
			
			indice = indice.replace(/\./g,"P")
			
			$("#SPANINTERNO"+indice+"").click()
			$(".DESCE_INDICE i").mouseout()
			//$(".DESCE_INDICE i").mouseover()
			
			// FAZ A ALTERAÇÃO DO CÁLCULO DA QUANTIDADE TOTAL
			alteraDesQtdeGeral()
		
		//}
		
	},500)

	setTimeout(function(){
		
		// DESATIVA O LOADING
		desativaSpinner()
		
		// SE NÃO FOI POSSÍVEL AVANÇAR
		if(indice==""){
			
			// EXIBE ALERTA
			var Toast = Swal.mixin({
				  toast: true,
				  position: 'center',
				  showConfirmButton: false,
				  timer: 2000,
				  timerProgressBar: true,
			})
		
			Toast.fire({
				  icon: 'error',
				  title: 'Não é possível descer!'
			})
			
		}
	
	},500)
	
}

// BOTÃO PARA AVANÇAR O ÍNDICE
function btnAvancaIndice(){
	
	var indice = $("#INDICE_INFO").val()

	// ATIVA O LOADING
	ativaSpinner()
	
	// TIMEOUT PARA EXECUÇÃO DA FUNÇÃO
	setTimeout(function (){
	
		// SE TABELA JÁ TEM ITENS
		//if(tabelaTemItens()){

			var nivel = indice.substr(0,indice.lastIndexOf("."))
			
			if(nivel.includes(".")){
				
				var idCriacao = buscaIdCriacao(nivel)
				
				// MONTA UM ARRAY COM TODOS OS ÍNDICES
				var indices =  retornaArrayIndices()
				
				console.log("vou avançar o indice "+indice)
				
				// AVANÇA O INDICE
				indice = avancaIndice(indice,indices)
				console.log("RETORNEI O INDICE "+indice)
				
				// SE ÍNDICE AVANÇOU
				if(!(indice=="")){
					
					$("#INDICE_INFO").val(indice)
					
					// ATUALIZA A VIEW
					//atualizar()
					atualizarNivel(idCriacao)
					
				}
				
			} else {
				
				//var idCriacao = buscaIdCriacao(nivel)
				
				// MONTA UM ARRAY COM TODOS OS ÍNDICES
				var indices =  retornaArrayIndices()
				
				console.log("vou avançar o indice "+indice)
				
				// AVANÇA O INDICE
				indice = avancaIndice(indice,indices)
				console.log("RETORNEI O INDICE "+indice)
				
				// SE ÍNDICE AVANÇOU
				if(!(indice=="")){
					
					$("#INDICE_INFO").val(indice)
					
					// ATUALIZA A VIEW
					atualizar()
					//atualizarNivel(idCriacao)
					
				}
				
			}
			
			// COLOCA A SELEÇÃO NO ITEM
			//colocaSelecaoItem(indice)
			// TRANSFORMA ÍNDICE EM ID DO SPAN 
			/*var tamPai = indice.substr(0,indice.lastIndexOf("."))
			tamPai = tamPai.length
			indice = indice.replace(/\D+/g, '');
			indice = indice+""+tamPai*/
			
			//indice = buscaIndiceAntigo(indice)
			
			indice = indice.replace(/\./g,"P")
			console.log("a seleção vai ser no SPANINTERNO"+indice)
			$("#SPANINTERNO"+indice+"").click()
			$(".fluigicon-circle-arrow-right").mouseout()
			//$(".fluigicon-circle-arrow-right").mouseover()
			
			// FAZ A ALTERAÇÃO DO CÁLCULO DA QUANTIDADE TOTAL
			//alteraDesQtdeGeral()
			alteraDesQtdeNivel(idCriacao)
	
		//}
		
	},500)
	
	setTimeout(function(){
		
		// DESATIVA O LOADING
		desativaSpinner()
		
		// SE NÃO FOI POSSÍVEL AVANÇAR
		if(indice==""){
			
			// EXIBE ALERTA
			var Toast = Swal.mixin({
				  toast: true,
				  position: 'center',
				  showConfirmButton: false,
				  timer: 2000,
				  timerProgressBar: true,
			})
		
			Toast.fire({
				  icon: 'error',
				  title: 'Não é possível avançar!'
			})
			
		}
	
	},500)
	
}

// BOTÃO PARA RECUAR O ÍNDICE
function btnRecuaIndice(){
	
	var indice = $("#INDICE_INFO").val()

	// ATIVA O LOADING
	ativaSpinner()
	
	// TIMEOUT PARA EXECUÇÃO DA FUNÇÃO
	setTimeout(function (){
	
		// SE TABELA JÁ TEM ITENS
		//if(tabelaTemItens()){
		
		var indices = retornaArrayIndices()
		var nivel = indice.substr(0,indice.lastIndexOf("."))
		
		if(nivel.includes(".")){
			
			var nivel2 = nivel.substr(0,nivel.lastIndexOf("."))
			var idCriacao = buscaIdCriacao(nivel2)
			indice = recuaIndice(indice,indices)
			
			// SE NOVO ÍNDICE FOI CRIADO
			if(!(indice=="")){
				
				atualizarNivel(idCriacao)
				alteraDesQtdeNivel(idCriacao)
				
			}
			
			$("#INDICE_INFO").val(indice)
			
			
			// FAZ A ALTERAÇÃO DO CÁLCULO DA QUANTIDADE TOTAL
			//alteraDesQtdeGeral()
			//alteraDesQtdeNivel(idCriacao)
			
		} else {
			
			// RECUA O INDICE
			indice = recuaIndice(indice,indices)
			
			$("#INDICE_INFO").val(indice)
			
			// ATUALIZA A VIEW
			atualizar()
			//atualizarNivelCompleta(idCriacao)
			//atualizarNivelCompleta(idCriacao)
			
			console.log("indice: "+indice)
			
			// FAZ A ALTERAÇÃO DO CÁLCULO DA QUANTIDADE TOTAL
			alteraDesQtdeGeral()
			
		}
		
		//var idCriacao = buscaIdCriacao(nivel)
		
		// COLOCA A SELEÇÃO NO ITEM
		//colocaSelecaoItem(indice)
		// TRANSFORMA ÍNDICE EM ID DO SPAN 
		/*var tamPai = indice.substr(0,indice.lastIndexOf("."))
		tamPai = tamPai.length
		indice = indice.replace(/\D+/g, '');
		indice = indice+""+tamPai*/
		
		indice = indice.replace(/\./g,"P")
		
		$("#SPANINTERNO"+indice+"").click()
		$(".fluigicon-circle-arrow-left").mouseout()
		//$(".fluigicon-circle-arrow-left").mouseover()
	
	//}
		
	},500)
	
	setTimeout(function(){
		
		// DESATIVA O LOADING
		desativaSpinner()
		
		// SE NÃO FOI POSSÍVEL AVANÇAR
		if(indice==""){
			
			// EXIBE ALERTA
			var Toast = Swal.mixin({
				  toast: true,
				  position: 'center',
				  showConfirmButton: false,
				  timer: 2000,
				  timerProgressBar: true,
			})
		
			Toast.fire({
				  icon: 'error',
				  title: 'Não é possível recuar!'
			})
			
		}
		
	},500)	      
  
	
	// EXIBE ALERTA
	/*Swal.fire({
		
		  title: 'Qual a forma do recuo?',
		  icon: 'warning',
		  showCancelButton: true,
		  allowEscapeKey: true,
		  allowOutsideClick: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#F08E8E',
		  confirmButtonText: 'Padrão',
		  cancelButtonText: 'Cancelar',
		  //footer: '<a href="#!" id="APROVAR">Enviar para Aprovação</a>'
		  footer: '<button type="button" role="button" tabindex="0" class="RECUARFILHOS" id="RECUARFILHOS">' + 'Apenas os filhos' + '</button>'

		}).then(function(result){
		
		  // SE RECUO FOR O PADRÃO
		  if (result.value) {
				
				// ATIVA O LOADING
				ativaSpinner()
				
				// TIMEOUT PARA EXECUÇÃO DA FUNÇÃO
				setTimeout(function (){
				
					// SE TABELA JÁ TEM ITENS
					//if(tabelaTemItens()){
					
						var indice = $("#INDICE_INFO").val()
						
						var indices = retornaArrayIndices()
						
						// RECUA O INDICE
						indice = recuaIndice(indice,indices)
						
						$("#INDICE_INFO").val(indice)
						
						// ATUALIZA A VIEW
						atualizar()
						
						console.log("indice: "+indice)
						
						// COLOCA A SELEÇÃO NO ITEM
						//colocaSelecaoItem(indice)
						// TRANSFORMA ÍNDICE EM ID DO SPAN 
						//var tamPai = indice.substr(0,indice.lastIndexOf("."))
						//tamPai = tamPai.length
						//indice = indice.replace(/\D+/g, '');
						//indice = indice+""+tamPai
						
						indice = indice.replace(/\./g,"P")
						
						$("#SPANINTERNO"+indice+"").click()
						$(".fluigicon-circle-arrow-left").mouseout()
						//$(".fluigicon-circle-arrow-left").mouseover()
					
						// FAZ A ALTERAÇÃO DO CÁLCULO DA QUANTIDADE TOTAL
						alteraDesQtdeGeral()
					
					//}
					
				},500)
				
				setTimeout(function(){
					
					// DESATIVA O LOADING
					desativaSpinner()
				
				},500)	      
		      
		  } 				  
		  
	})*/
		
}

// FAZ UMA CÓPIA DO ITEM SELECIONADO E ADICIONA ABAIXO
function btnCopiaIndice(){
	
	// ATIVA O LOADING
	/*ativaSpinner()
	
	// TIMEOUT PARA EXECUÇÃO DA FUNÇÃO
	setTimeout(function (){
	
		// SE TABELA JÁ TEM ITENS
		if(tabelaTemItens()){
		
			var indice = $("#INDICE_INFO").val()

			// SE ÍNDICE NÃO ESTÁ PREENCHIDO
			if(indice==""){
				
				// EXIBE ALERTA
				var Toast = Swal.mixin({
					  toast: true,
					  position: 'center',
					  showConfirmButton: false,
					  timer: 2000,
					  timerProgressBar: true,
				})
			
				Toast.fire({
					  icon: 'error',
					  title: 'Não é possível copiar!'
				})
				
			} else {
				
									      
		      	// CRIA NOVO ÍNDICE COMO IRMÃO E RETORNA NOVO ÍNDICE
		      	var novoIndice = copiaIndice(indice)
				
				// SE ÍNDICE TEM IRMÃO À DIREITA
				if(temIrmaoDireita(indice)){
					
					var irmaoDireita = buscaIrmaoDireita(indice)
						
					// INCREMENTA TODOS OS ÍNDICES À DIREITA
					incrementaIndice(irmaoDireita)
					
				}
				
				$("#INDICE_INFO").val(novoIndice)
				
				// INCLUI ITEM NA ESTRUTURA
				incluirItem()	
				
				var seq = buscaSeqIrmao(indice)
				var seqCopia = buscaSeqIrmao(novoIndice)
				
				console.log("seq: "+seq+", seqCopia: "+seqCopia)
				
				// COPIA OS DADOS ITEM COPIADO PARA A CÓPIA
				copiaDados(seq,seqCopia)
				
				novoIndice = novoIndice.toString()
				
				novoIndice = novoIndice.replace(/\./g,"P")
				
				$("#SPANINTERNO"+novoIndice+"").click()
				$(".fluigicon-copy").mouseout()
		
		
			}		
					
		}
		
	},500)
	
	// DESATIVA O LOADING
	desativaSpinner()*/
	
	
	
	// ------------------ NOVA FUNÇÃO COPIAR COMEÇA AQUI -----------------
	
	// ATIVA O LOADING
	//ativaSpinner()
	
	// TIMEOUT PARA EXECUÇÃO DA FUNÇÃO
	//setTimeout(function (){
	
		// SE TABELA JÁ TEM ITENS
		//if(tabelaTemItens()){
		
			var indice = $("#INDICE_INFO").val()

			// SE ÍNDICE NÃO ESTÁ PREENCHIDO
			if(indice==""){
				
				// EXIBE ALERTA
				var Toast = Swal.mixin({
					  toast: true,
					  position: 'center',
					  showConfirmButton: false,
					  timer: 2000,
					  timerProgressBar: true,
				})
			
				Toast.fire({
					  icon: 'error',
					  title: 'Não é possível copiar!'
				})
				
			} else {
				
				
				//ativaSpinner()
		      	//console.log("opção pontual")
		      
		      	// CRIA NOVO ÍNDICE COMO IRMÃO E RETORNA NOVO ÍNDICE
		      	/*var novoIndice = copiaIndice(indice)
				
				// SE ÍNDICE TEM IRMÃO À DIREITA
				if(temIrmaoDireita(indice)){
					
					var irmaoDireita = buscaIrmaoDireita(indice)
						
					// INCREMENTA TODOS OS ÍNDICES À DIREITA
					incrementaIndice(irmaoDireita)
					
				}
				
				$("#INDICE_INFO").val(novoIndice)
				
				// INCLUI ITEM NA ESTRUTURA
				incluirItem()	
				
				var seq = buscaSeqIrmao(indice)
				var seqCopia = buscaSeqIrmao(novoIndice)
				
				console.log("seq: "+seq+", seqCopia: "+seqCopia)
				
				// COPIA OS DADOS ITEM COPIADO PARA A CÓPIA
				copiaDados(seq,seqCopia)
				
				// ATUALIZA A VIEW
				atualizar()
				
				// COLOCA A SELEÇÃO NO ITEM
				colocaSelecaoItem(indice)
				// TRANSFORMA ÍNDICE EM ID DO SPAN
				/*var tamPai = novoIndice.substr(0,novoIndice.lastIndexOf("."))
				tamPai = tamPai.length
				novoIndice = novoIndice.replace(/\D+/g, '');
				novoIndice = novoIndice+""+tamPai*/
				
				/*novoIndice = novoIndice.replace(/\./g,"P")
				
				$("#SPANINTERNO"+novoIndice+"").click()
				$(".fluigicon-copy").mouseout()*/
				//$(".fluigicon-copy").mouseover()
				
				//desativaSpinner()
				
				
				// EXIBE ALERTA
				Swal.fire({
					
					  title: 'Como deseja fazer a cópia?',
					  icon: 'warning',
					  showCancelButton: true,
					  allowEscapeKey: true,
					  allowOutsideClick: true,
					  confirmButtonColor: '#3085d6',
					  cancelButtonColor: '#F08E8E',
					  confirmButtonText: 'Pontual',
					  cancelButtonText: 'Cancelar',
					  footer: '<button type="button" role="button" tabindex="0" class="TFILHOS" id="TFILHOS">' + 'Todos os filhos' + '</button>'

					}).then(function(result){
					
					  //ativaSpinner()
						
					  // SE A OPÇÃO FOR PONTUAL
					  if (result.value) {
					      	
					      	// ATIVA O LOADING
							ativaSpinner()
					      	
					      	setTimeout(function(){
					      	
					      		var numOS = $("#NUM_OS").val()
								
							  	var indices = retornaArrayIndices()
							  	
							  	// CRIA NOVO ÍNDICE COMO IRMÃO E RETORNA NOVO ÍNDICE
						      	var novoIndice = copiaIndice(indice)
								
								// SE ÍNDICE TEM IRMÃO À DIREITA
								//if(temIrmaoDireita(indice)){
								if(idTemIrmaoDir(indice,indices,0)){	
						      	
									//var irmaoDireita = buscaIrmaoDireita(indice)
									var irmaoDireita = idTemIrmaoDir(indice,indices,1)	
									
									// INCREMENTA TODOS OS ÍNDICES À DIREITA
									incrementaIndice(irmaoDireita,indices)
									
								}
								
								$("#INDICE_INFO").val(novoIndice)
								
								var idCriacao = buscaIdCriacao(indice)
	
								var nivel = indice.substr(0,indice.lastIndexOf("."))
								var idCriacaoPai = buscaIdCriacao(nivel)
								
								// CONSTRÓI A CONSULTA DO DATASET
								var a1 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
								var a2 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
								
								var constraints = new Array(a1,a2)
								
								//var dataset = DatasetFactory.getDataset("dsCabecalhoEstruturaOS",null,constraints,null)
						  		
								var dataset = DatasetFactory.getDataset("dsBuscaItemEstruturaOS",null,constraints,null)
						  		
						  		// PREENCHE O INDICE NO CABEÇALHO
						  		//$("#INDICE_INFO").val(novoFilho)
						  		
						  		var row = dataset.values
						  		var rep = row[0]
						  		
						  		$("#NUMDESENHO_INFO").val(rep["NUMDESENHO"])
						  		$("#POSICAO_INFO").val(rep["POSICAODESENHO"])
						  		$("#DESCRICAO_INFO").val(rep["DESCRICAO"])
													
								// INCLUI ITEM NA ESTRUTURA
								incluirItem(1)	
								
								//var seq = buscaSeqIrmao(indice)
								var idCriacao = buscaIdCriacao(indice)
								//var seqCopia = buscaSeqIrmao(novoIndice)
								var idCriacaoCopia = buscaIdCriacao(novoIndice)
								
								console.log("idCriacao: "+idCriacao+", idCriacaoCopia: "+idCriacaoCopia)
								
								// COPIA OS DADOS DO ITEM COPIADO PARA A CÓPIA
								copiaDados(idCriacao,idCriacaoCopia)
								
								// COPIA OS PROCESSO DO ITEM COPIADO PARA A CÓPIA
								copiaProcessoOS(idCriacao,idCriacaoCopia)
								
								novoIndice = novoIndice.toString()
								
								// SE NOVO INDICE CONTÉM "."
								if(novoIndice.includes(".")){
									
									novoIndice = novoIndice.replace(/\./g,"P")
									
								}
								
								atualizarNivel(idCriacaoPai)
								
								$("#SPANINTERNO"+novoIndice+"").click()
								$(".fluigicon-copy").mouseout()
							  
							  
							 /* ativaSpinner()
						      	console.log("opção pontual")
						      
						      	// CRIA NOVO ÍNDICE COMO IRMÃO E RETORNA NOVO ÍNDICE
						      	var novoIndice = copiaIndice(indice)
								
								// SE ÍNDICE TEM IRMÃO À DIREITA
								if(temIrmaoDireita(indice)){
									
									var irmaoDireita = buscaIrmaoDireita(indice)
										
									// INCREMENTA TODOS OS ÍNDICES À DIREITA
									incrementaIndice(irmaoDireita)
									
								}
								
								$("#INDICE_INFO").val(novoIndice)
								
								// INCLUI ITEM NA ESTRUTURA
								incluirItem()	
								
								var seq = buscaSeqIrmao(indice)
								var seqCopia = buscaSeqIrmao(novoIndice)
								
								console.log("seq: "+seq+", seqCopia: "+seqCopia)
								
								// COPIA OS DADOS ITEM COPIADO PARA A CÓPIA
								copiaDados(seq,seqCopia)
								
								// ATUALIZA A VIEW
								//atualizar()
								
								// COLOCA A SELEÇÃO NO ITEM
								//colocaSelecaoItem(indice)
								// TRANSFORMA ÍNDICE EM ID DO SPAN
								var tamPai = novoIndice.substr(0,novoIndice.lastIndexOf("."))
								tamPai = tamPai.length
								novoIndice = novoIndice.replace(/\D+/g, '');
								novoIndice = novoIndice+""+tamPai
								
								novoIndice = novoIndice.replace(/\./g,"P")
								
								$("#SPANINTERNO"+novoIndice+"").click()
								$(".fluigicon-copy").mouseout()
								//$(".fluigicon-copy").mouseover()
								
								desativaSpinner()*/
						    	
						    	// DESATIVA O LOAD
						  	
							  	setTimeout(function(){
									
									desativaSpinner()
									  	
							  	},500)
							
					      	},500)
						  						
					  }/* else {
						  console.log("vou fechar o sweet alert")
						  Swal.getCancelButton()
						  
					  }*/
					
						//
					
					  
					  //swal.close()
					  
					  /*else {
						  	
						  	
					  }*/
					  
				})
		
			}
			
		//}
	
		
	//},500)
	
	// DESATIVA O LOADING
	desativaSpinner()
	
}

// FAZ A CÓPIA DE TODOS OS FILHOS
function copiaFilhos(novoIndice,indice,indices,salvos){
	
	var filho = ""
	var posicao = ""
	var novoFilho = ""
		
	console.log("FUNÇÃO DE COPIAR FILHOS - novoIndice: "+novoIndice+", indice: "+indice)
	console.log(indices)
	
	// ENQUANTO INDICE TEM FILHO
  	while(idTemFilho(indice, indices, 0)){
  		
  		filho = idTemFilho(indice, indices, 1)
 
  		console.log("INDICE "+indice+" tem filho "+filho)
  		
  		// ENQUANTO NÃO É O FILHO MAIS A ESQUERDA
  		while(idTemIrmaoEsq(filho,indices,0)){
  			
  			filho = idTemIrmaoEsq(filho,indices,1)
  			
  		}
  		
  		console.log("filho antigo: "+filho)
  		posicao = filho.substr(filho.lastIndexOf(".")+1,filho.length)
  		console.log("posicao "+posicao)
  		novoFilho = ""+novoIndice+"."+posicao
  		console.log("novo filho: "+novoFilho)
  		
  		//var seq = buscaSeqIrmao(filho)
  		var idCriacao = buscaIdCriacao(filho)

  		var numOS = $("#NUM_OS").val()
	
		// CONSTRÓI A CONSULTA DO DATASET
		var a1 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
		var a2 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
		
		var constraints = new Array(a1,a2)
		//var dataset = DatasetFactory.getDataset("dsCabecalhoEstruturaOS",null,constraints,null)
  		var dataset = DatasetFactory.getDataset("dsBuscaItemEstruturaOS",null,constraints,null)
  		
  		// PREENCHE O INDICE NO CABEÇALHO
  		$("#INDICE_INFO").val(novoFilho)
  		
  		var row = dataset.values
  		var rep = row[0]
  		
  		$("#NUMDESENHO_INFO").val(rep["NUMDESENHO"])
  		$("#POSICAO_INFO").val(rep["POSICAODESENHO"])
  		$("#DESCRICAO_INFO").val(rep["DESCRICAO"])
  		
	  	// INCLUIR ITEM NA ESTRUTURA
	  	incluirItem(1)
  		
	  	//var seq = buscaSeqIrmao(indice)
	  	//var idCriacao = buscaIdCriacao(filho)
	  	//var seqCopia = buscaSeqIrmao(novoFilho)
	  	var idCriacaoCopia = buscaIdCriacao(novoFilho)
	  	
	  	//var filhoAntigo = filho
	  	
	  	// COPIA OS DADOS DO ITEM SELECIONADO PARA O COPIADO
	  	copiaDados(idCriacao,idCriacaoCopia)
  	
	  	// COPIA OS PROCESSO DO ITEM COPIADO PARA A CÓPIA
		copiaProcessoOS(idCriacao,idCriacaoCopia)					
	  	
  		// COPIA OS FILHOS DO FILHO
	  	copiaFilhos(novoFilho,filho,indices,salvos)
  		
  	}
  	
	// ENQUANTO INDICE TEM IRMAO A ESQUERDA
  	/*while(idTemIrmaoEsq(indice, indices, 0)){
  		
  		irmaoEsq = idTemIrmaoEsq(indice, indices, 1)
  		
  		console.log("irmaoEsq antigo: "+irmaoEsq)
  		posicao = irmaoEsq.substr(irmaoEsq.lastIndexOf(".")+1,irmaoEsq.length)
  		console.log("posição "+posicao)
  		novoIndice = novoIndice.substr(0,novoIndice.lastIndexOf("."))
  		novoIndice = ""+novoIndice+"."+posicao
  		console.log("novo irmaoEsq: "+novoIndice)
  		
  			
  		copiaFilhos(novoIndice,irmaoEsq,indices,salvos)
  		
  	}*/
  	
	// SALVA O ÍNDICE
	salvos.push(indice)
	
	console.log("salvei "+indice)
	console.log(salvos)
	
	// REMOVE O ELEMENTO DO ARRAY
	indices.splice(indices.indexOf(indice),1)
	
	console.log("vou remover "+indice)
	console.log(indices)
	
}

// SOBE O ÍNDICE ATUAL E DESCE DO IRMÃO À ESQUERDA
function sobeIndice(indice,indices){
	
	console.log("VOU SUBIR O INDICE "+indice)
	console.log("Indices: "+indices)
	
	var novoIndice = ""
	
	// SE TEM IRMÃO À ESQUERDA
	if(idTemIrmaoEsq(indice,indices,0)){
		
		console.log(indice+" tem irmao a esquerda")
		
		var idCriacao = buscaIdCriacao(indice)
		// buscar o idCriacao do indice
		//var seq = buscaSeqIrmao(indice)
		
		console.log("vou salvar "+indice+" em uma posição temporária X.1")
		
		// ALTERA A POSICAO DO ÍNDICE ATUAL PARA INDICE TEMPORÁRIO
		alteraIndice('X.1', indice, idCriacao, 'X', '1', 0, indices)
		
		var irmaoEsquerda = idTemIrmaoEsq(indice,indices,1)
		var novoNivel = irmaoEsquerda.substr(0,irmaoEsquerda.lastIndexOf("."))
		var novaPosicao = indice.substr(indice.lastIndexOf(".")+1,indice.length)
		
		var idCriacaoIrmaoEsq = buscaIdCriacao(irmaoEsquerda)
		//var seq2 = buscaSeqIrmao(irmaoEsquerda)
		// busca o idCriacaoIrmaoEsq do irmao Esquerda (passar OS e o indice do irmaoEsquerda)
		
		console.log("o irmao a esquerda é o "+irmaoEsquerda)
		
		console.log("vou alterar "+irmaoEsquerda+" para "+indice)
		
		// ALTERA O ÍNDICE ATUAL E DOS FILHOS
		alteraIndice(indice, irmaoEsquerda, idCriacaoIrmaoEsq, novoNivel, novaPosicao, 0, indices)
		
		novaPosicao = irmaoEsquerda.substr(irmaoEsquerda.lastIndexOf(".")+1,irmaoEsquerda.length)

		console.log("agora vou salvar "+irmaoEsquerda)
		
		indices = retornaArrayIndices()
		
		// ALTERA A POSICAO DO ÍNDICE TEMPORÁRIO
		alteraIndice(irmaoEsquerda, 'X.1', idCriacao, novoNivel, novaPosicao, 0, indices)
	
		novoIndice = irmaoEsquerda
		
		// SALVA O ÍNDICE ANTIGO DO ÍNDICE ALTERADO COM O IDCRIACAO  
		salvaIndiceAntigo(indice, idCriacao)
		
		//$("#INDICEANTIGO___"+seq).val(indice)
		
	} else{
		
		// EXIBE ALERTA
		var Toast = Swal.mixin({
			  toast: true,
			  position: 'center',
			  showConfirmButton: false,
			  timer: 2000,
			  timerProgressBar: true,
		})
	
		Toast.fire({
			  icon: 'error',
			  title: 'Não é possível subir!'
		})
		
	}
	
	// LIMPA OS CAMPOS DO CABEÇALHO DO INDICE
	limpaCabIndice()
	
	novoIndice = novoIndice.toString()
	
	console.log("Novo indice: "+novoIndice)
	
	return novoIndice
	
}

// DESCE O ÍNDICE ATUAL E SOBE DO IRMÃO À DIREITA
function desceIndice(indice,indices){
	
	var novoIndice = ""
	
	// SE TEM IRMÃO À DIREITA
	if(idTemIrmaoDir(indice,indices,0)){
		
		console.log(indice+" tem irmao a direita")

		//var seq = buscaSeqIrmao(indice)
		var idCriacao = buscaIdCriacao(indice)
		
		console.log("vou salvar "+indice+" em uma posição temporária X.1")

		// ALTERA A POSICAO DO ÍNDICE ATUAL PARA INDICE TEMPORÁRIO
		alteraIndice('X.1', indice, idCriacao, 'X', '1', 0,indices)
		
		var irmaoDireita = idTemIrmaoDir(indice,indices,1)
		var novoNivel = irmaoDireita.substr(0,(irmaoDireita.lastIndexOf(".")))
		console.log("nivel: "+novoNivel)
		var novaPosicao = indice.substr(indice.lastIndexOf(".")+1,indice.length)
		//var seq2 = buscaSeqIrmao(irmaoDireita)
		var idCriacaoIrmao = buscaIdCriacao(irmaoDireita)
		
		console.log("o irmao a direita é o "+irmaoDireita)
		
		console.log("vou alterar "+irmaoDireita+" para "+indice)
		
		// ALTERA O ÍNDICE ATUAL E DOS FILHOS
		alteraIndice(indice, irmaoDireita, idCriacaoIrmao, novoNivel, novaPosicao, 0, indices)
		
		novaPosicao = irmaoDireita.substr(irmaoDireita.lastIndexOf(".")+1,irmaoDireita.length)

		console.log("agora vou salvar X.1 que será convertido para "+irmaoDireita+" que tem nível "+novoNivel)
		
		indices = retornaArrayIndices()
		
		// ALTERA A POSICAO DO ÍNDICE TEMPORÁRIO
		alteraIndice(irmaoDireita, 'X.1', idCriacao, novoNivel, novaPosicao, 0, indices)
	
		novoIndice = irmaoDireita
		
		// SALVA O ÍNDICE ANTIGO
		salvaIndiceAntigo(indice,idCriacao)
		
		//$("#INDICEANTIGO___"+seq).val(indice)
		
	} else {
		
		// EXIBE ALERTA
		var Toast = Swal.mixin({
			  toast: true,
			  position: 'center',
			  showConfirmButton: false,
			  timer: 2000,
			  timerProgressBar: true,
		})
	
		Toast.fire({
			  icon: 'error',
			  title: 'Não é possível descer!'
		})
		
	}
		
	// LIMPA OS CAMPOS DO CABEÇALHO DO INDICE
	limpaCabIndice()
	
	novoIndice = novoIndice.toString()
	return novoIndice
	
}

// AVANÇA O NÍVEL PARA O IRMÃO À ESQUERDA, APENDANDO COMO ÚLTIMO FILHO
function avancaIndice(indice,indices){

	var novoIndice = ""
	var filho = ""
	var maisVelho = ""
	var irmaoDireita = ""
	var arrayIndices = new Array()
	
	console.log("INDICE que avançará: "+indice)
	console.log("INDICES: "+indices)
	
	// TEM IRMAO A ESQUERDA
	if(idTemIrmaoEsq(indice,indices,0)){
		
		//var irmaoEsquerda = buscaIrmao(indice)
		var irmaoEsquerda = idTemIrmaoEsq(indice,indices,1)
		
		console.log(indice+" tem irmao a esquerda e é o "+irmaoEsquerda)
		
		// SE IRMÃO TEM FILHO, PROCURA O MAIS À ESQUERDA
		if(idTemFilho(irmaoEsquerda,indices,0)){
		
			//filho = buscaFilho(irmaoEsquerda)
			filho = idTemFilho(irmaoEsquerda,indices,1)
			
			console.log(irmaoEsquerda+" tem filho e é o "+filho)
			
			// SE TEM IRMÃO A DIREITA
			if(idTemIrmaoDir(filho,indices,0)){
				
				// ENQUANTO TEM IRMÃO À DIREITA
				while(idTemIrmaoDir(filho,indices,0)){
					
					//irmaoDireita = buscaIrmaoDireita(filho)
					irmaoDireita = idTemIrmaoDir(filho,indices,1)
					
					console.log(filho+" tem irmao a direita e é o "+irmaoDireita)
					
					var novoNivel = irmaoDireita.substr(0,irmaoDireita.lastIndexOf("."))
					var novaPosicao = irmaoDireita.substr(irmaoDireita.lastIndexOf(".")+1,irmaoDireita.length)
					novaPosicao = parseInt(novaPosicao)
					novaPosicao = novaPosicao + 1
					
					filho = novoNivel+"."+novaPosicao
					
					// SE FILHO EXITE
					if(existe(filho)){
						
						maisVelho = filho
						
					} else {
						// SE NÃO
						
						maisVelho = irmaoDireita
						
					}
					
				}
				
				//irmaoDireita = filho
				
			} else {
				
				maisVelho = filho
				
			} 
			
			// GERA NOVO ÍNDICE
			//var seq = buscaSeqIrmao(indice)
			var idCriacao = buscaIdCriacao(indice)
			var novoNivel = maisVelho.substr(0,maisVelho.lastIndexOf("."))
			var novaPosicao = maisVelho.substr(maisVelho.lastIndexOf(".")+1,maisVelho.length)
			novaPosicao = parseInt(novaPosicao)
			novaPosicao = novaPosicao + 1
			novoIndice = novoNivel+"."+novaPosicao
			
			console.log("o filho mais velho é o "+maisVelho)
			console.log("vou salvar o "+indice+" no novo índice "+novoIndice)
			
			// ALTERA O ÍNDICE ATUAL E DOS FILHOS
			alteraIndice(novoIndice, indice, idCriacao, novoNivel, novaPosicao, 0, indices)
					
		} else {
			// SE IRMÃO À ESQUERDA NÃO TEM FILHO
			
			// GERA NOVO ÍNDICE
			//var seq = buscaSeqIrmao(indice)
			var idCriacao = buscaIdCriacao(indice)
			var novoNivel = irmaoEsquerda
			var novaPosicao = '1'
			novoIndice = novoNivel+"."+novaPosicao
			
			console.log(irmaoEsquerda+" não tem filho mais velho")
			console.log("vou salvar o "+indice+" no novo índice "+novoIndice)
			
			// ALTERA O ÍNDICE ATUAL E DOS FILHOS
			alteraIndice(novoIndice, indice, idCriacao, novoNivel, novaPosicao, 0, indices)
					
		}

		console.log("vou decrementar os irmaos a direita de "+irmaoEsquerda)
		
		// DECREMENTA ÍNDICES DE TODOS OS IRMÃOS À DIREITA
		arrayIndices = decrementaIndice(indice,indices)
		
		novoIndice = verificaMudancaIndice(arrayIndices, novoIndice)
			
	} /*else if(idTemIrmaoDir(indice,indices,0)){
		// SE NÃO, SE TEM IRMÃO À DIREITA
		
		//irmaoDireita = buscaIrmaoDireita(indice)
		irmaoDireita = idTemIrmaoDir(indice,indices,1)
		
		console.log(indice+" tem irmao a direita e é o "+irmaoDireita)
		
		// SE IRMÃO TEM FILHO, PROCURA O MAIS À ESQUERDA
		if(idTemFilho(irmaoDireita,indices,0)){
		
			//filho = buscaFilho(irmaoDireita)
			filho = idTemFilho(irmaoDireita,indices,1)
			
			console.log(irmaoDireita+" tem filho e é o "+filho)
			
			// SE TEM IRMÃO A DIREITA
			if(idTemIrmaoDir(filho,indices,0)){
				
				// ENQUANTO TEM IRMÃO À DIREITA
				while(idTemIrmaoDir(filho,indices,0)){
					
					//irmaoDireita = buscaIrmaoDireita(filho)
					irmaoDireita = idTemIrmaoDir(filho,indices,1)
					
					console.log(filho+" tem irmao a direita e é o "+irmaoDireita)
					
					var novoNivel = irmaoDireita.substr(0,irmaoDireita.lastIndexOf("."))
					var novaPosicao = irmaoDireita.substr(irmaoDireita.lastIndexOf(".")+1,irmaoDireita.length)
					novaPosicao = parseInt(novaPosicao)
					novaPosicao = novaPosicao + 1
					
					filho = novoNivel+"."+novaPosicao
					
					// SE FILHO EXITE
					if(existe(filho)){
						
						maisVelho = filho
						
					} else {
						// SE NÃO
						
						maisVelho = irmaoDireita
						
					}
					
				}
				
				//irmaoDireita = filho
				
			}else {
				
				maisVelho = filho
				
			}
			
			// GERA NOVO ÍNDICE
			//var seq = buscaSeqIrmao(indice)
			var idCriacao = buscaIdCriacao(indice)
			var novoNivel = maisVelho.substr(0,maisVelho.lastIndexOf("."))
			var novaPosicao = maisVelho.substr(maisVelho.lastIndexOf(".")+1,maisVelho.length)
			novaPosicao = parseInt(novaPosicao)
			novaPosicao = novaPosicao + 1
			novoIndice = novoNivel+"."+novaPosicao
			
			console.log("o filho mais velho é o "+maisVelho)
			console.log("vou salvar o "+indice+" no novo índice "+novoIndice)
			
			// ALTERA O ÍNDICE ATUAL E DOS FILHOS
			alteraIndice(novoIndice, indice, idCriacao, novoNivel, novaPosicao, 0, indices)
			
						
		} else {
			// SE IRMÃO À DIREITA NÃO TEM FILHO
			
			// GERA NOVO ÍNDICE
			//var seq = buscaSeqIrmao(indice)
			var idCriacao = buscaIdCriacao(indice)
			var novoNivel = irmaoDireita
			var novaPosicao = '1'
			novoIndice = novoNivel+"."+novaPosicao
			
			console.log("o filho mais velho é o "+filho)
			console.log("vou salvar o "+indice+" na nova posição "+novoIndice)
			
			// ALTERA O ÍNDICE ATUAL E DOS FILHOS
			alteraIndice(novoIndice, indice, idCriacao, novoNivel, novaPosicao, 0, indices)
			
		}

		console.log("vou decrementar os irmaos a direita de "+irmaoDireita)
		
		// DECREMENTA ÍNDICES DE TODOS OS IRMÃOS À DIREITA
		arrayIndices = decrementaIndice(indice,indices)
		
		novoIndice = verificaMudancaIndice(arrayIndices, novoIndice)
		
	}*/ else {
		
		// EXIBE ALERTA
		var Toast = Swal.mixin({
			  toast: true,
			  position: 'center',
			  showConfirmButton: false,
			  timer: 2000,
			  timerProgressBar: true,
		})
	
		Toast.fire({
			  icon: 'error',
			  title: 'Não é possível avançar!'
		})
		
	}
	
	// LIMPA OS CAMPOS DO CABEÇALHO DO INDICE
	limpaCabIndice()
	console.log("VOU RETORNAR O novoIndice "+novoIndice)
	
	novoIndice = novoIndice.toString()
	
	/*var indiceRet = buscaIndiceAntigo(novoIndice)
	
	if(indiceRet==""){
		
		novoIndice = novoIndice.toString()
		
	}else {
		
		novoIndice = indiceRet
		
	}*/
	
	console.log("FIZ O PARSER E VOU RETORNAR O novoIndice "+novoIndice)
	
	return novoIndice
	
}

// RECUA O NÍVEL PARA O IRMÃO À ESQUERDA, APENDANDO COMO ÚLTIMO FILHO
function recuaIndice(indice,indices){
	
	var pai = indice.substr(0,indice.lastIndexOf("."))
	var novoIndice = ""
	
	console.log("o pai do "+indice+" é o "+pai)
	
	//if((pai.includes("."))){
		
	// SE O PAI NÃO É O PRINCIPAL 
	if(!(pai=="")){
		
		// SE O PAI TEM IRMAO À DIREITA
		if(idTemIrmaoDir(pai,indices,0)){
			
			var irmaoDireita = idTemIrmaoDir(pai,indices,1)
			
			console.log(pai+" tem irmao a direita e é o "+irmaoDireita)
			
			console.log("vou incrementar "+irmaoDireita+" e todos os seus irmãos a direita")
			
			// INCREMENTA ÍNDICE PAI E SEUS IRMÃOS
			incrementaIndice(irmaoDireita,indices)
			
			// SALVA OS DADOS PARA O ÍNDICE
			//var seq = buscaSeqIrmao(indice)
			var idCriacao = buscaIdCriacao(indice)
			var novoNivel = irmaoDireita.substr(0,irmaoDireita.lastIndexOf("."))
			var novaPosicao = irmaoDireita.substr(irmaoDireita.lastIndexOf(".")+1,irmaoDireita.length)
			
			console.log("vou salvar o "+indice+" no novo índice "+irmaoDireita)
			
			// ALTERA O ÍNDICE ATUAL PARA O NOVO ÍNDICE
			alteraIndice(irmaoDireita, indice, idCriacao, novoNivel, novaPosicao, 0,indices)
				
			novoIndice = irmaoDireita
			
		} else {
			// SE O PAI NÃO TEM IRMAO A DIREITA
			
			console.log(pai+" não tem irmão a direita")
			
			// SALVA OS DADOS PARA O ÍNDICE
			//var seq = buscaSeqIrmao(indice)
			var idCriacao = buscaIdCriacao(indice)
			var novoNivel = pai.substr(0,pai.lastIndexOf("."))
			var novaPosicao = pai.substr(pai.lastIndexOf(".")+1,pai.length)
			novaPosicao = parseInt(novaPosicao)
			novaPosicao = novaPosicao + 1

			// SE NOVO NÍVEK É VAZIO
			if(novoNivel==""){
				
				novoIndice = novaPosicao
				
			} else{
				// SE NÃO
				
				novoIndice = novoNivel+"."+novaPosicao
				
			}
			
			console.log("vou salvar o "+indice+" no novo índice que é "+novoIndice)
			
			// ALTERA O ÍNDICE ATUAL PARA O NOVO ÍNDICE
			alteraIndice(novoIndice, indice, idCriacao, novoNivel, novaPosicao, 0, indices)
						
		}
		
		// DECREMENTA TODOS OS IRMÃOS À DIREITA DO ÍNDICE
		decrementaIndice(indice,indices)
	
	} else {
		
		// EXIBE ALERTA
		var Toast = Swal.mixin({
			  toast: true,
			  position: 'center',
			  showConfirmButton: false,
			  timer: 2000,
			  timerProgressBar: true,
		})
	
		Toast.fire({
			  icon: 'error',
			  title: 'Não é possível recuar!'
		})
		
	}
	
	// LIMPA OS CAMPOS DO CABEÇALHO DO INDICE
	limpaCabIndice()
	
	novoIndice = novoIndice.toString()
	return novoIndice
		
}

// COPIA O ÍNDICE SELECIONADO
function copiaIndiceFilho(pai, indice){
	
	console.log("entrei para incluir irmão")
	console.log("indice "+indice)
	
	indice = indice.toString()
	
	var nivel = pai
	var novoIndice = ""
		
	// SALVA OS DADOS DO ÍNDICE
	var posicao = indice.substr(indice.lastIndexOf(".")+1,indice.length)
	novoIndice = nivel+"."+posicao
	//var novoIndice = nivel+"."+posicao

	return novoIndice
	
}

// COPIA O ÍNDICE SELECIONADO
function copiaIndice(indice){
	
	console.log("entrei para incluir irmão")
	console.log("indice "+indice)
	
	indice = indice.toString()
	
	var nivel = indice.substr(0,indice.lastIndexOf("."))
	var novoIndice = ""
	
	// SE O PAI É O PRINCIPAL
	if(nivel==""){
		
		// SALVA OS DADOS DO ÍNDICE
		novoIndice = parseInt(indice)
		novoIndice = novoIndice + 1
		//novoIndice = indice
		
	} else {
		
		// SALVA OS DADOS DO ÍNDICE
		var posicao = indice.substr(indice.lastIndexOf(".")+1,indice.length)
		posicao = parseInt(posicao)
		posicao = posicao + 1
		posicao = posicao.toString()
		novoIndice = nivel+"."+posicao
		//var novoIndice = nivel+"."+posicao
		
	}
	
	return novoIndice
	
}

// INCLUI FILHO PARA O ITEM
function incluirFilho(indice){
	
	console.log("entrei para incluir filho")
	//var indice = $("#INDICE_INFO").val()	
	
	indice = indice.toString()

	console.log("indice "+indice)
	
	// SE ITEM É NÃO MANUFATURADO
	if(itemNaoManufaturado(indice)){
		
		// SIMULAR CLICK NO BOTÃO FECHAR
		$("#fechar")[0].click()
		
		// EXIBE ALERTA
		Swal.fire({
			  icon: 'error',
			  title: 'Este é um item Não Manufaturado e não pode ter filhos',
			  text: 'Verifique e tente novamente.'
		})
		
	}else{
		// SE NÃO
		
		// SE TABELA JÁ TEM PAI
		if(tabelaTemItens()){
				
			var novoIndice = indice+".1"
			
			// LIMPA OS CAMPOS E SALVA O NOVO ÍNDICE GERADO
			$("#INDICE_INFO").val(novoIndice)
			$("#NUMDESENHO_INFO").val("")
			$("#DESCRICAO_INFO").val("")
			$("#POSICAO_INFO").val("")
			$("#SEQ_INFO").val("")
			$("#QTDE_INFO").val("")
			$("#QTDE_INFO_ALT").val("")
			$("#QTDETOTAL_INFO").val("")
				
			// ESCONDE/MOSTRA BOTÕES
			$(".CONFIRMA_INCLUIR_FILHO").show()
			$(".CONFIRMA_INCLUIR_IRMAO").hide()
			$(".CONFIRMA_ALTERACAO").hide()
			$(".CONFIRMA_INCLUIR_PAI").hide()
			$(".QTDE_INFO_ALT").hide()
			$(".QTDE_INFO").show()

		}
		
	}
		
}

// INCLUI IRMÃO À DIREITA PARA O ITEM
function incluirIrmao(indice){
	
	console.log("entrei para incluir irmão")
	console.log("indice "+indice)
	
	indice = indice.toString()
	
	// ESCONDE/MOSTRA BOTÕES
	$(".CONFIRMA_INCLUIR_IRMAO").show()
	$(".CONFIRMA_INCLUIR_FILHO").hide()
	$(".CONFIRMA_ALTERACAO").hide()
	$(".CONFIRMA_INCLUIR_PAI").hide()
	$(".QTDE_INFO_ALT").hide()
	$(".QTDE_INFO").show()
	//var indice = $("#INDICE_INFO").val()	
	
	var nivel = indice.substr(0,indice.lastIndexOf("."))
	var novoIndice = ""
	
	// SE O PAI É O PRINCIPAL
	if(nivel==""){
		
		// SALVA OS DADOS DO ÍNDICE
		novoIndice = parseInt(indice)
		novoIndice = novoIndice + 1
		//novoIndice = indice
		
	} else {
		
		// SALVA OS DADOS DO ÍNDICE
		var posicao = indice.substr(indice.lastIndexOf(".")+1,indice.length)
		posicao = parseInt(posicao)
		posicao = posicao + 1
		posicao = posicao.toString()
		novoIndice = nivel+"."+posicao
		//var novoIndice = nivel+"."+posicao
		
	}
	
	// LIMPA OS CAMPOS E SALVA O NOVO ÍNDICE GERADO
	$("#INDICE_INFO").val(novoIndice)
	$("#NUMDESENHO_INFO").val("")
	$("#DESCRICAO_INFO").val("")
	$("#POSICAO_INFO").val("")
	$("#SEQ_INFO").val("")
	$("#QTDE_INFO").val("")
	$("#QTDE_INFO_ALT").val("")
	$("#QTDETOTAL_INFO").val("")
		
}

// INCLUIR PAI
function incluirPai(){
	
	// LIMPA OS CAMPOS
	$("#NUMDESENHO_INFO").val("")
	$("#POSICAO_INFO").val("")
	$("#DESCRICAO_INFO").val("")
	$("#INDICE_INFO").val("")
	$("#SEQ_INFO").val("")
	$("#QTDE_INFO").val("")
	$("#QTDE_INFO_ALT").val("")
	$("#QTDETOTAL_INFO").val("")
	
	// ESCONDE/MOSTRA BOTÕES
	$(".CONFIRMA_INCLUIR_IRMAO").hide()
	$(".CONFIRMA_INCLUIR_FILHO").hide()
	$(".CONFIRMA_ALTERACAO").hide()
	$(".CONFIRMA_INCLUIR_PAI").show()
	$(".QTDE_INFO_ALT").hide()
	$(".QTDE_INFO").show()
		
}

// INCLUIR PRIMEIRO ITEM
function confirmaIncluirPai(){
	
	// ATIVA O LOADING
	ativaSpinner()
	
	var numDesenho = $("#NUMDESENHO_INFO").val()
	var descricao = $("#DESCRICAO_INFO").val()
	var posicao = $("#POSICAO_INFO").val()
	var quantidade = $("#QTDE_INFO").val()
	
	//var indices = retornaArrayIndices()
	
	// SE NÚMERO DO DESENHO OU DESCRIÇÃO NÃO FORAM INFORMADOS
	if(numDesenho=="" || descricao=="" || posicao=="" || quantidade==""){
		
		// EXIBE ALERTA
		var Toast = Swal.mixin({
			  toast: true,
			  position: 'center',
			  showConfirmButton: false,
			  timer: 2000,
			  timerProgressBar: true,
		})
	
		Toast.fire({
			  icon: 'error',
			  title: 'Existem campos sem preencher!'
		})
		
	} else {
		
		// INCLUI O PAI NA TABELA
		incluirItem()
		
		// MOSTRA/ESCONDE CAMPOS NECESSÁRIOS
		$(".VIEW").show()
		$(".BOTOES_CAB").show()

		// LIMPA OS CAMPOS
		$("#NUMDESENHO_INFO").val("")
		$("#DESCRICAO_INFO").val("")
		$("#POSICAO_INFO").val("")
		$("#SEQ_INFO").val("")
		$("#INDICE_INFO").val("")
		
		// SIMULAR CLICK NO BOTÃO FECHAR
		$("#fechar")[0].click()
		
	}
	
	// DESATIVA O LOADING
	desativaSpinner()
	
}

// CONFIRMA A INCLUSÃO DO FILHO
function confirmaIncluirFilho(){
	
	// ATIVA O LOADING
	ativaSpinner()
	
	setTimeout(function(){
	
		// SALVA OS DADOS DO ÍNDICE
		var indice = $("#INDICE_INFO").val()
		var numDesenho = $("#NUMDESENHO_INFO").val()
		var descricao = $("#DESCRICAO_INFO").val()
		var posicao = $("#POSICAO_INFO").val()
		var quantidade = $("#QTDE_INFO").val()
		
		var irmaoEsquerda = ""	
		indice = indice.toString()
		var pai = indice.substr(0,indice.lastIndexOf("."))
		
		var indices = retornaArrayIndices()
		
		// SE NUM DESENHO OU DESCRIÇÃO NÃO FOI PREENCHID
		if(numDesenho=="" || descricao=="" || posicao=="" || quantidade==""){
			
			// EXIBE ALERTA
			var Toast = Swal.mixin({
				  toast: true,
				  position: 'center',
				  showConfirmButton: false,
				  timer: 2000,
				  timerProgressBar: true,
			})
		
			Toast.fire({
				  icon: 'error',
				  title: 'Existem campos sem preencher!'
			})
			
		} else {
			// SE TODOS OS DADOS FORAM INFORMADOS
			
			// SE ITEM NÃO É O PAI
			if(tabelaTemItens()){
				
				// SE ÍNDICE TEM FILHO
				if(idTemFilho(pai,indices,0)){
					
					// BUSCA FILHO
					var filho = idTemFilho(pai,indices,1)
					
					console.log(pai+" é o pai de "+indice+" e tem filho "+filho)
					irmaoEsquerda = filho
					
					// ENQUANTO FILHO TIVER IRMÃO À ESQUERDA
					while(idTemIrmaoEsq(filho,indices,0)){
						
						// SALVA O IRMÃO À ESQUERDA
						irmaoEsquerda = idTemIrmaoEsq(filho,indices,1)
						
						console.log(filho+" tem irmao a esquerda "+irmaoEsquerda)
						
						filho = irmaoEsquerda
						
						
					}
					
					console.log(irmaoEsquerda+" é o filho mais a esquerda de "+pai)
					console.log("vou incrementar "+irmaoEsquerda+" e todos os seus irmãos")
					
					// INCREMENTA TODOS OS IRMÃOS À DIREITA DO IRMÃO MAIS À ESQUERDA
					incrementaIndice(irmaoEsquerda,indices)
					
				} 	
				
			} 
			
			// INCLUI ITEM NA ESTRUTURA
			incluirItem()
			
			// LIMPA DADOS DO CABEÇALHO
			limpaCabIndice()
			
			// SIMULAR CLICK NO BOTÃO FECHAR
			$("#fechar")[0].click()
			
		}
	
	},500)
	
	setTimeout(function(){
		
		// DESATIVA O LOADINGc
		desativaSpinner()
	
	},500)
	
}

// CONFIRMA A INCLUSÃO DO IRMÃO À DIREITA
function confirmaIncluirIrmao(){
	
	// ATIVA O LOADING
	ativaSpinner()
	
	setTimeout(function(){
	
		var indices = retornaArrayIndices()
	
		// SALVA OS DADOS 
		var indice = $("#INDICE_INFO").val()
		indice = indice.toString()
		var irmaoEsquerda = idTemIrmaoEsq(indice,indices,1)
		var numDesenho = $("#NUMDESENHO_INFO").val()
		var descricao = $("#DESCRICAO_INFO").val()
		var posicao = $("#POSICAO_INFO").val()
		var quantidade = $("#QTDE_INFO").val()
		
		// SE NUM DESENHO OU DESCRIÇÃO NÃO FOI PREENCHID
		if(numDesenho=="" || descricao=="" || posicao=="" || quantidade==""){
			
			// EXIBE ALERTA
			var Toast = Swal.mixin({
				  toast: true,
				  position: 'center',
				  showConfirmButton: false,
				  timer: 2000,
				  timerProgressBar: true,
			})
		
			Toast.fire({
				  icon: 'error',
				  title: 'Existem campos sem preencher!'
			})
			
		} else {
			// SE TODOS OS DADOS FORAM INFORMADOS
			
			// SE NÃO É O PAI
			if(tabelaTemItens()){
				
				// SE ÍNDICE TEM IRMÃO À DIREITA
				if(idTemIrmaoDir(irmaoEsquerda,indices,0)){
					
					var irmaoDireita = idTemIrmaoDir(irmaoEsquerda,indices,1)
					
					// INCREMENTA TODOS OS ÍNDICES À DIREITA
					incrementaIndice(irmaoDireita,indices)
					
				}
					
			} 
				
			// INCLUI ITEM NA ESTRUTURA
			incluirItem()
			
			// LIMPAR DADOS DO CABEÇALHO
			limpaCabIndice()
			
			// SIMULAR CLICK NO BOTÃO FECHAR
			$("#fechar")[0].click()
			
		}
	
	},500)
	
	setTimeout(function(){
		
		// DESATIVA O LOADING
		desativaSpinner()
	
	},500)	
	
}

// EXIBE MODAL PARA QUE ALTERAÇÃO DO ITEM POSSA SER FEITA
function alterarItem(indice,arrayIdCriacao){
	
	console.log("entrei para alterar item")
	//console.log("indice "+indice+" e seq "+seq)
	
	indice = indice.toString()
	var idCriacao = arrayIdCriacao
	var numOS = $("#NUM_OS").val()
	
	// CONSTRÓI A CONSULTA DO DATASET
	var a1 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	
	var constraints = new Array(a1,a2)
	var dataset = DatasetFactory.getDataset("dsBuscaItemEstruturaOS",null,constraints,null)

	var row = dataset.values
	
	// SE O RETORNO NÃO É NULO E NEM VAZIO
	if(!(row=="" || row==null || row==undefined || row=="null")){
		
		var rep = row[0]
	
		var numDesenho = rep["NUMDESENHO"]
		var descricao = rep["DESCRICAO"]
		var posicao = rep["POSICAODESENHO"]
		
		// ESCONDE/MOSTRA BOTÕES
		$(".CONFIRMA_INCLUIR_IRMAO").hide()
		$(".CONFIRMA_INCLUIR_FILHO").hide()
		$(".CONFIRMA_ALTERACAO").show()
		$(".CONFIRMA_INCLUIR_PAI").hide()
		$(".QTDE_INFO_ALT").show()
		$(".QTDE_INFO").hide()

		// SALVA OS DADOS NOS CAMPOS 
		$("#INDICE_INFO").val(indice)
		$("#NUMDESENHO_INFO").val(numDesenho)
		$("#DESCRICAO_INFO").val(descricao)
		$("#POSICAO_INFO").val(posicao)
		$("#QTDE_INFO").val("")
		$("#QTDE_INFO_ALT").val(rep["DESQTDE"])
		$("#QTDETOTAL_INFO").val(rep["TOTALQTDE"])
		//$("#SEQ_INFO").val(seq)
		
	}
		
}

// CONFIRMA A ALTERAÇÃO NA TABELA E NA VIEW
function confirmaAlteracao(){
	
	// ATIVA O LOADING
	ativaSpinner()
	
	setTimeout(function(){
	
		// VARIÁVEIS PARA SALVAR OS DADOS
		var indice = $("#INDICE_INFO").val()
		var numDesenho = $("#NUMDESENHO_INFO").val()
		var descricao = $("#DESCRICAO_INFO").val()
		var posicao = $("#POSICAO_INFO").val()
		var desQtde = $("#QTDE_INFO_ALT").val()
		var totalQtde = $("#QTDETOTAL_INFO").val()
		
		var seq = $("#SEQ_INFO").val()
		
		// SE NUMDESENHO OU DESCRICAO ESTÃO VAZIOS
		if(numDesenho=="" || descricao=="" || posicao=="" || desQtde==""){
			
			// EXIBE ALERTA
			var Toast = Swal.mixin({
				  toast: true,
				  position: 'center',
				  showConfirmButton: false,
				  timer: 2000,
				  timerProgressBar: true,
			})
		
			Toast.fire({
				  icon: 'error',
				  title: 'Existem campos sem preencher!'
			})
			
		} else{
			// SE NÃO, PODE SALVAR ALTERAÇÕES
			
			//$("#INDICE___"+seq).val()
			/*$("#NUMDESENHO___"+seq).val(numDesenho)
			$("#DESCRICAO___"+seq).val(descricao)
			$("#POSICAODESENHO___"+seq).val(posicao)
			$("#EDITADO___"+seq).val("SIM")*/
			
			//var idCriacao = $("#IDCRIACAO___"+seq).val()
			var idCriacao = buscaIdCriacao(indice)
			
			var numOS = $("#NUM_OS").val()
		
			// CONSTRÓI A CONSULTA DO DATASET
			var a1 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
			var a2 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
			var a3 = DatasetFactory.createConstraint("NUMDESENHO",numDesenho,numDesenho,ConstraintType.MUST)
			var a4 = DatasetFactory.createConstraint("DESCRICAO",descricao,descricao,ConstraintType.MUST)
			var a5 = DatasetFactory.createConstraint("POSICAODESENHO",posicao,posicao,ConstraintType.MUST)
			var a6 = DatasetFactory.createConstraint("DESQTDE",desQtde,desQtde,ConstraintType.MUST)
			var a7 = DatasetFactory.createConstraint("TOTALQTDE",totalQtde,totalQtde,ConstraintType.MUST)
			
			var constraints = new Array(a1,a2,a3,a4,a5,a6,a7)
			var dataset = DatasetFactory.getDataset("dsUpdateCabecalhoEstruturaOS",null,constraints,null)
			
			// MARCA EDITADO PARA OS COMPONENTES DO ITEM
			//marcarEditadoComponentes(idCriacao)
			
			// MARCA EDITADO PARA O PROCESSO DO ITEM
			//marcarEditadoProcesso(idCriacao)
			
			// ATUALIZA AS ALTERAÇÕES NA VIEW
			atualizar()
			
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
				  title: 'Alterações salvas com sucesso'
			})
			
			// LIMPA DADOS DO CABEÇALHO
			limpaCabIndice()
			
			// SIMULAR CLICK NO BOTÃO FECHAR
			$("#fechar")[0].click()
			
		}
	
	},500)
	
	setTimeout(function(){
		
		// DESATIVA O LOADING
		desativaSpinner()
	
	},500)		
	
}

// FAZ A REMOÇÃO DO PONTUAL DO ITEM E INCREMENTA OS FILHOS
function removerPontual(indice){
	
	 // ATIVA O LOADING
	 ativaSpinner()
	
	 var idCriacao = buscaIdCriacao(indice)
	 var indices = retornaArrayIndices()
	
	 // REMOVE O ITEM DA TABELA
	 removeItem(idCriacao)
	 
	 var atv = $("#ATIVIDADE").val()
	 var radio4 = $("#VALOR_RADIO4").val()
	 //var indice = $("#INDICE_INFO").val()
	 var filho = ""
	 var irmaoEsquerda = ""
	 var irmaoDireita = ""
	 var nivel = ""
	 var posicao = ""
	 var novoFilho = ""
	 var seq = ""
	 var irmaoDireitaIndice = ""
		 
	 // ÍNDICE TEM FILHO
	 if(idTemFilho(indice,indices,0)){
		 
		 // BUSCA O FILHO DO ÍNDICE
		 filho = idTemFilho(indice,indices,1)
		 
		 // ENQUANTO FILHO TEM IRMÃO À DIREITA
		 while(idTemIrmaoDir(filho,indices,0)){
			 
			 irmaoDireita = idTemIrmaoDir(filho,indices,1)
			 
			 filho = irmaoDireita
			 
		 }
		 
		 console.log("o filho mais a direita é o "+filho)
		 
		 // ENQUANTO FILHO MAIS À DIREITA TEM IRMÃO À ESQUERDA
		 while(idTemIrmaoEsq(filho,indices,0)){
			 
			 irmaoEsquerda = idTemIrmaoEsq(filho,indices,1)
			 
			 console.log("o filho "+filho+" tem irmão à esquerda e é o "+irmaoEsquerda)
			 
			 // SALVA O SEQ DO FILHO
			 //seq = buscaSeqIrmao(filho)
			 var idCriacao = buscaIdCriacao(filho)
			 
			 nivel = indice.substr(0,indice.lastIndexOf("."))
			 posicao = indice.substr(indice.lastIndexOf(".")+1,indice.length)
			 posicao = parseInt(posicao)
			 posicao = posicao + 1
			 
			 // SE NÍVEL É O PRINCIPAL
			 if(nivel==""){
				 
				 novoFilho = posicao
				 
			 }else{
				 
				 novoFilho = nivel+"."+posicao
				 
			 }
			 
			 console.log("vou incrementar os irmãos a direita de "+indice)
			 
			 irmaoDireitaIndice = idTemIrmaoDir(indice,indices,1)
			 
			 // INCREMENTA OS ÍNDICES À DIREITA DE ÍNDICE
			 incrementaIndice(irmaoDireitaIndice,indices)
			 
			 console.log("vou alterar o "+filho+" para "+novoFilho+" e atualizar seus filhos")
			 
			 // FAZ A ALTERAÇÃO DO FILHO PARA O NOVO INDICE
			 alteraIndice(novoFilho, filho, idCriacao, nivel, posicao, 0, indices)
			 
			 filho = irmaoEsquerda
			 
		 } 
		 
		 // SE FILHO NÃO TEM IRMÃO À ESQUERDA
		 
		 console.log("o filho "+filho+" não tem irmão à esquerda")
		 
		 nivel = indice.substr(0,indice.lastIndexOf("."))
		// posicao = indice.substr(indice.lastIndexOf("."),indice.length)
		 posicao = indice.substr(indice.lastIndexOf(".")+1,indice.length)
		 
		 //seq = buscaSeqIrmao(filho)
		 var idCriacao = buscaIdCriacao(filho)
		 novoFilho = indice
		 
		 console.log("vou alterar o "+filho+" para "+novoFilho+" e atualizar seus filhos")
		 
		 // FAZ A ALTERAÇÃO DO FILHO PARA O NOVO INDICE
		 alteraIndice(novoFilho, filho, idCriacao, nivel, posicao, 0, indices)
		 
	 } else {
		 
		 // FAZ A REMOÇÃO APENAS DO ITEM NA TABELA
		 removeItem(idCriacao)
		 
		 // DECREMENTA OS IRMAOS À DIREITA
		 decrementaIndice(indice,indices)
		 
	 }
	 
	// ATUALIZA AS INFORMAÇÕES
	atualizar()
		
	// LIMPA OS CAMPOS DO CABEÇALHO
	$("#INDICE_INFO").val("")
	$("#NUMDESENHO_INFO").val("")
	$("#DESCRICAO_INFO").val("")
	$("#POSICAO_INFO").val("")
	$("#SEQ_INFO").val("")
	
	// SE ATV
	if(atv==0 || atv==4 || atv==11){
		
		// SE RADIO4 JÁ FOI SELECIONADO
		if(!(radio4=="" || radio4==undefined || radio4==null)){
			
			$(".RADIO4").show()
			
		}
		
	}
	
	// SE TABELA NÃO TEM ITENS
	if(!(tabelaTemItens())){
		
		$(".BOTOES_CAB").hide()
		$(".INFO_INDICE_PAI").show()
		
	}
	
	// DESATIVA O LOADING
	desativaSpinner()
	
}