// BUSCA INFORMAÇÕES DAs BAIXAS DE MATERIAL
function createDataset(fields, constraints, sortFields) {

	var newDataset = DatasetBuilder.newDataset()
    var dataSource = "/jdbc/FluigDSRM"
	//var dataSource = "/jdbc/FluigDSRM
    var ic = new javax.naming.InitialContext()
    var ds = ic.lookup(dataSource)
    var created = false
    
    log.info("Entrei no dataset dsBaixaPAPC")
    
    var myQuery = ""

    var numplano = ""
    var tipo = ""

		
    if (constraints != null) {
    	
        for (var i = 0; i < constraints.length; i++){
            
            if (constraints[i].fieldName == "NUMPLANOCORTE") {
            	
            	numplano = "'"+constraints[i].initialValue+"'"
            	
            }
        
	        if (constraints[i].fieldName == "TIPO") {
	        	
	        	tipo = constraints[i].initialValue
	        	
	        }
            
        }
        
    }
	
	if(tipo=="BAIXA"){
		
		myQuery = 	" SELECT Z.NSEQPLANOCORTE,Z.CODCOLIGADA,Z.CODFILIAL,K.CODCCUSTO,Z.CODORDEM,Z.QUANTIDADE,Z.CODESTRUTURA, "+
		" KA.IDATVORDEM,Z.NUMPLANOCORTE,T.CODIGOPRD,T.IDPRD,Z.IDLOTE,Z.NUMLOTE,Z.QTDEMP,Z.QTDEAPONTADA,T.CUSTOMEDIO, "+
		" ROUND((CASE WHEN Z.NSEQPLANOCORTE=( SELECT MAX(NSEQPLANOCORTE) FROM ZMDPLANOAPROVEITAMENTOCORTE WHERE NUMPLANOCORTE=Z.NUMPLANOCORTE AND ISNULL(QTDEAPONTADA,0)!=QUANTIDADE) THEN "+ 
		" ( Z.QTDEMP - ( ( SELECT SUM(QTDMPFINAL) FROM ZMDPLANOAPROVEITAMENTOCORTE WHERE NUMPLANOCORTE=Z.NUMPLANOCORTE ) - Z.QTDMPFINAL) - ( CAST(ISNULL(Z.QTDEAPONTADA,0) AS FLOAT) * "+
				"  ( CAST(Z.QTDMPFINAL AS FLOAT) / CAST(Z.QUANTIDADE AS FLOAT) ) )) "+
		" ELSE ( Z.QTDMPFINAL - ( CAST(ISNULL(Z.QTDEAPONTADA,0) AS FLOAT) * ( CAST(Z.QTDMPFINAL AS FLOAT) / CAST(Z.QUANTIDADE AS FLOAT) ) )  ) END),4)  QTDMPFINAL "+
		" FROM ZMDPLANOAPROVEITAMENTOCORTE Z "+
		" INNER JOIN TPRD T ON  "+
		" T.CODCOLIGADA=Z.CODCOLIGADA "+
		" AND T.CODIGOPRD=Z.CODIGOMP "+
		" INNER JOIN KATVORDEM KA  "+
		" ON KA.CODCOLIGADA=Z.CODCOLIGADA "+
		" AND KA.CODFILIAL=Z.CODFILIAL "+
		" AND KA.CODORDEM=Z.CODORDEM "+
		" AND KA.CODATIVIDADE=Z.CODATIVIDADE "+
		" INNER JOIN KORDEM K "+
		" ON K.CODCOLIGADA=Z.CODCOLIGADA "+
		" AND K.CODFILIAL=Z.CODFILIAL "+
		" AND K.CODORDEM=Z.CODORDEM "+
		" WHERE NUMPLANOCORTE="+numplano
		
	}
	else if(tipo=="SUCATA"){
		
		myQuery = " SELECT TOP 1 Z.NSEQPLANOCORTE,Z.CODCOLIGADA,Z.CODFILIAL,K.CODCCUSTO,Z.CODORDEM,Z.QUANTIDADE, "+
			" Z.CODESTRUTURA,KA.IDATVORDEM,Z.NUMPLANOCORTE,T.CODIGOPRD,T.IDPRD,Z.IDLOTE,Z.NUMLOTE,Z.QTDESUCATA,T.CUSTOMEDIO "+
			" FROM ZMDPLANOAPROVEITAMENTOCORTE Z "+
			" INNER JOIN TPRD T ON  "+
			" T.CODCOLIGADA=Z.CODCOLIGADA "+
			" AND T.CODIGOPRD=Z.CODSUCATA "+
			" INNER JOIN KATVORDEM KA  "+
			" ON KA.CODCOLIGADA=Z.CODCOLIGADA "+
			" AND KA.CODFILIAL=Z.CODFILIAL "+
			" AND KA.CODORDEM=Z.CODORDEM "+
			" AND KA.CODATIVIDADE=Z.CODATIVIDADE "+
			" INNER JOIN KORDEM K "+
			" ON K.CODCOLIGADA=Z.CODCOLIGADA "+
			" AND K.CODFILIAL=Z.CODFILIAL "+
			" AND K.CODORDEM=Z.CODORDEM "+
			" WHERE NUMPLANOCORTE="+numplano+" AND Z.QTDESUCATA >=0.01  AND (SELECT SUM(ISNULL(QTDEAPONTADA,0)) FROM ZMDPLANOAPROVEITAMENTOCORTE WHERE NUMPLANOCORTE="+numplano+")=0 "+
			" ORDER BY NSEQPLANOCORTE "
					
	}
	else if(tipo=="CONSULTA"){
		
		myQuery = 	" SELECT Z.NSEQPLANOCORTE,Z.CODCOLIGADA,Z.CODFILIAL,K.CODCCUSTO,Z.CODORDEM,Z.QUANTIDADE,Z.CODESTRUTURA,( SELECT SALDOFISICO2 FROM TLOTEPRDLOC WHERE IDLOTE=Z.IDLOTE AND CODLOC=23 ) QTD_LOTE, "+
		" KA.IDATVORDEM,Z.NUMPLANOCORTE,T.CODIGOPRD,T.IDPRD,Z.IDLOTE,Z.NUMLOTE,Z.QTDEMP,Z.QTDEAPONTADA,T.CUSTOMEDIO, "+
		" ROUND((CASE WHEN Z.NSEQPLANOCORTE=( SELECT MAX(NSEQPLANOCORTE) FROM ZMDPLANOAPROVEITAMENTOCORTE WHERE NUMPLANOCORTE=Z.NUMPLANOCORTE AND ISNULL(QTDEAPONTADA,0)!=QUANTIDADE) THEN "+ 
		" ( Z.QTDEMP - ( ( SELECT SUM(QTDMPFINAL) FROM ZMDPLANOAPROVEITAMENTOCORTE WHERE NUMPLANOCORTE=Z.NUMPLANOCORTE ) - Z.QTDMPFINAL) - ( CAST(ISNULL(Z.QTDEAPONTADA,0) AS FLOAT) * "+
				"  ( CAST(Z.QTDMPFINAL AS FLOAT) / CAST(Z.QUANTIDADE AS FLOAT) ) )) "+
		" ELSE ( Z.QTDMPFINAL - ( CAST(ISNULL(Z.QTDEAPONTADA,0) AS FLOAT) * ( CAST(Z.QTDMPFINAL AS FLOAT) / CAST(Z.QUANTIDADE AS FLOAT) ) )  ) END),4)  QTDMPFINAL "+
		" FROM ZMDPLANOAPROVEITAMENTOCORTE Z "+
		" INNER JOIN TPRD T ON  "+
		" T.CODCOLIGADA=Z.CODCOLIGADA "+
		" AND T.CODIGOPRD=Z.CODIGOMP "+
		" INNER JOIN KATVORDEM KA  "+
		" ON KA.CODCOLIGADA=Z.CODCOLIGADA "+
		" AND KA.CODFILIAL=Z.CODFILIAL "+
		" AND KA.CODORDEM=Z.CODORDEM "+
		" AND KA.CODATIVIDADE=Z.CODATIVIDADE "+
		" INNER JOIN KORDEM K "+
		" ON K.CODCOLIGADA=Z.CODCOLIGADA "+
		" AND K.CODFILIAL=Z.CODFILIAL "+
		" AND K.CODORDEM=Z.CODORDEM "+
		" WHERE NUMPLANOCORTE="+numplano

	}
	
	
	 
	
    log.info("dsBaixaPAPC MY QUERY: " + myQuery)
    
    try {
    	
        var conn = ds.getConnection()
        var stmt = conn.createStatement()
        var rs = stmt.executeQuery(myQuery)
        var columnCount = rs.getMetaData().getColumnCount()
        
        while (rs.next()) {
        	
            if (!created) {
            	
                for (var i = 1; i <= columnCount; i++) {
                	
                    newDataset.addColumn(rs.getMetaData().getColumnName(i))
                    
                }
                
                created = true
                
            }
            
            var Arr = new Array()
            
            for (var i = 1; i <= columnCount; i++) {
            	
                var obj = rs.getObject(rs.getMetaData().getColumnName(i))
                
                if (null != obj) {
                	
                    Arr[i - 1] = rs.getObject(rs.getMetaData().getColumnName(i)).toString()
                    
                } else {
                	
                    Arr[i - 1] = "null"
                    	
                }
                
            }
            
            newDataset.addRow(Arr)
            
        }
        
    } catch (e) {
    	
        log.error("ERRO==============> " + e.message)
        
    } finally {
    	
        if (stmt != null) {
        	
            stmt.close()
            
        }
        
        if (conn != null) {
        	
            conn.close()
        }
        
    }
    
    return newDataset
	
}