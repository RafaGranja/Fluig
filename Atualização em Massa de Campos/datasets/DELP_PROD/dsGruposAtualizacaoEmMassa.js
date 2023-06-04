function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();
       
    //Cria as colunas
    dataset.addColumn("GRUPO");
	dataset.addColumn("CAMPOS");
	dataset.addColumn("CAMPOSDESCRICAO");
      
    //Cria os registros
    dataset.addRow(new Array("1","NUMDESENHO","N° do Desenho"));
    dataset.addRow(new Array("2","NUMDESENHO;POSICAODESENHO","N° do Desenho;N° da Posição"));
    dataset.addRow(new Array("3","NUMDESENHO;POSICAODESENHO;DESCRICAO","N° do Desenho;N° da Posição;Descrição do item"));
    dataset.addRow(new Array("4","NUMDESENHO;REVISAODESENHO","N° do Desenho;N° da Revisão do Desenho"));
    dataset.addRow(new Array("5","NUMDESENHO;NUMDBI","N° do Desenho;N° do DBI"));
    dataset.addRow(new Array("6","NUMDBI","N° do DBI"));
    dataset.addRow(new Array("7","NUMDESENHO;NUMDOCDELP","N° do Desenho;N° do Doc. Delp"));
    dataset.addRow(new Array("8","NUMDOCDELP","N° do Doc. Delp"));
    dataset.addRow(new Array("9","NUMDESENHO;POSICAODESENHO;DESCRICAO;CODIGOPRDCOMPONENTES;PRIORIDADEATVCOMPONENTES","N° do Desenho;N° da Posição;Descrição do item;Código do Produto Principal;Prioridade do Componente"));
    dataset.addRow(new Array("10","NUMDESENHO;POSICAODESENHO;DESCRICAO;CODIGOPRDCOMPONENTES;SUBSTITUTOCOMPONENTES;PRIORIDADEATVCOMPONENTES","N° do Desenho;N° da Posição;Descrição do item;Código do Produto Principal;Código do Produto Substituto;Prioridade do Componente"));
    dataset.addRow(new Array("11","NUMDESENHO;POSICAODESENHO;DESCRICAO;PRIORIDADE","N° do Desenho;N° da Posição;Descrição do item;Prioridade da Atividade"));

    
     
    return dataset;
}