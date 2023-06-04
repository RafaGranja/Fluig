// ANTES DE FINALIZAR A SOLICITAÇÃO
function beforeCancelProcess(colleagueId,processId){
	
	log.info("Entrei no beforeCancelProcess Processo Edição de Execução de Subconjunto de Estrutura");
	
	var numOS = hAPI.getCardValue("NUM_OS")
	var processoPai = hAPI.getCardValue("PROCESSOPAI")
	var numProcesso = hAPI.getCardValue("NUMPROCESSO")
	var idCriacao = hAPI.getCardValue("IDCRIACAOPAI")
	var indicePai = hAPI.getCardValue("INDICEPAI")
	var execucao = hAPI.getCardValue("EXECUCAO_INFO")
	
	// SALVA A FLAG DO PROCESSO QUE A SOLICITAÇÃO FOI CANCELADA
	hAPI.setCardValue("EXCLUSIVO1","CANCELADA");
	
	// ATUALIZA OS CAMPOS DETALHADOS
    liberaDetalhadosOS(numOS,idCriacao,indicePai,execucao)
    
    // ATUALIZA STATUS DA SOLICITAÇÃO NA TABELA AUXILIAR
    atualizaSolicitacaoTabelaAuxiliar(processoPai,numProcesso,numOS,execucao)
	
}

// LIBERA ITENS DA OS QUE FORAM DETALHADOS
function liberaDetalhadosOS(numOS,idCriacao,indicePai,execucao){
	
	log.info("vou liberar os itens filhos do indicePai")
	
	log.info("numOS: "+numOS+", idCriacao: "+idCriacao+", execucao: "+execucao)
	
	var b1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	var b2 = DatasetFactory.createConstraint("IDCRIACAO",idCriacao,idCriacao,ConstraintType.MUST)
	var b3 = DatasetFactory.createConstraint("EXECUCAO",execucao,execucao,ConstraintType.MUST)
	
	var constraints = new Array(b1,b2,b3)
	
	var dataset = DatasetFactory.getDataset("dsEXLiberaDetalhadoOS",null,constraints,null)
			      
}

// ATUALIZA O STATUS DA SOLICITAÇÃO NA TABELA AUXILIAR
function atualizaSolicitacaoTabelaAuxiliar(processoPai,numProcesso,numOS,execucao){
	
	log.info("processoPai: "+processoPai+", solicitacao: "+numProcesso+", numOS: "+numOS+", execucao: "+execucao)
		
	var a1 = DatasetFactory.createConstraint("PROCESSO",numProcesso,numProcesso,ConstraintType.MUST)
	var a2 = DatasetFactory.createConstraint("PROCESSOPAI",processoPai,processoPai,ConstraintType.MUST)
	var a3 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST)
	var a4 = DatasetFactory.createConstraint("EXECUCAO",execucao,execucao,ConstraintType.MUST)
	
	var constraints = new Array(a1,a2,a3,a4)
	
	var dataset = DatasetFactory.getDataset("dsEXUpdateSolicitacaoEdicaoTabelaAux",null,constraints,null)
	
}