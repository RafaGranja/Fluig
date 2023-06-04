// ANTES DE FINALIZAR A SOLICITAÇÃO
function beforeCancelProcess(colleagueId,processId){
	
	log.info("Entrei no beforeCancelProcess Processo Cadastro de Subconjunto de Estrutura");

	var numOS = hAPI.getCardValue("NUM_OS")
	var processoPai = hAPI.getCardValue("PROCESSOPAI")
	var numProcesso = hAPI.getCardValue("NUMPROCESSO")
	var idCriacao = hAPI.getCardValue("IDCRIACAOPAI")
	var indicePai = hAPI.getCardValue("INDICEPAI")
	
	// SALVA A FLAG DO PROCESSO QUE A SOLICITAÇÃO FOI CANCELADA
	hAPI.setCardValue("EXCLUSIVO1","CANCELADA");
	
	// ATUALIZA OS CAMPOS DETALHADOS
    liberaDetalhadosOS(numOS,idCriacao)
    
    // ATUALIZA STATUS DA SOLICITAÇÃO NA TABELA AUXILIAR
    atualizaSolicitacaoTabelaAuxiliar(processoPai,numProcesso,numOS)
	
}

// LIBERA ITENS DA OS QUE FORAM DETALHADOS
function liberaDetalhadosOS(numOS,idCriacao){
	
	log.info("vou liberar os itens filhos do indicePai")
	
	console.log("numOS: "+numOS+", idCriacao: "+idCriacao)
	
	var b1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	var b2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
	var constraints = new Array(b1,b2)
	
	var dataset = DatasetFactory.getDataset("dsLiberaDetalhadoOS",null,constraints,null)
			      
}

// ATUALIZA O STATUS DA SOLICITAÇÃO NA TABELA AUXILIAR
function atualizaSolicitacaoTabelaAuxiliar(processoPai,numProcesso,numOS){
	
	log.info("processoPai: "+processoPai+", solicitacao: "+numProcesso+", numOS: "+numOS)
	
	var a1 = DatasetFactory.createConstraint("PROCESSO",numProcesso,numProcesso,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("PROCESSOPAI",processoPai,processoPai,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	
	var constraints = new Array(a1,a2,a3)
	
	var dataset = DatasetFactory.getDataset("dsUpdateSolicitacaoCadastroTabelaAux",null,constraints,null)
	
}



