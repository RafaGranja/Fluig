// ANTES DE FINALIZAR A SOLICITAÇÃO
function beforeCancelProcess(colleagueId,processId){
    
    log.info("Entrei no beforeCancelProcess Processo Cadastro de Estrutura");

   // SE NÃO TEM NENHUM ITEM QUE ESTÁ SENDO DETALHADO EM OUTRA SOLICITAÇÃO
    if(!temItemDetalhado()){

       // SALVA A FLAG DO PROCESSO QUE A SOLICITAÇÃO FOI CANCELADA
        hAPI.setCardValue("EXCLUSIVO1","CANCELADA");
        
        // EXCLUI ESTRUTURA DO BANCO DE DADOS
        excluiEstrutura()
        
    } else {
        // SE NÃO
        
        throw "Essa solicitação não pode ser cancelada, pois existem solicitações de subconjuntos que estão abertas. Clique no link das solicitações abertas."
        
    }
    
}



// EXCLUI ESTRUTURA DO BANCO DE DADOS
function excluiEstrutura(){
    
    var numOS = hAPI.getCardValue("NUM_OS")
    
    // CONSULTA BANCO
    var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
    var constraints = new Array(c1);
    
    var dataset = DatasetFactory.getDataset("dsExcluiEstrutura",null,constraints,null);
    
}



// SE TEM ALGUM ITEM QUE ESTÁ SENDO DETALHADO
function temItemDetalhado(){
    
    var numOS = hAPI.getCardValue("NUM_OS")
    
    // CONSULTA BANCO
    var c1 = DatasetFactory.createConstraint("OS",numOS,numOS,ConstraintType.MUST);
    var constraints = new Array(c1);
    
    var dataset = DatasetFactory.getDataset("dsTemFilhoDetalhadoOS",null,constraints,null);
    
    // QUANTIDADE DE REGISTROS DA CONSULTA
    var count = dataset.rowsCount
    
    // SE RETORNO NÃO É NULO E NEM VAZIO
    if(count>0){
        
        return true
        
    } else {
        // SE NÃO
        
        return false
        
    }
    
}
