// BUSCA TODOS OS COMPONENTES DE UMA DETERMINADA ATIVIDADE DE UMA OP
function createDataset(fields, constraints, sortFields) {

	var newDataset = DatasetBuilder.newDataset()
    var dataSource = "/jdbc/FluigDSRM"
	//var dataSource = "/jdbc/FluigDSRM
    var ic = new javax.naming.InitialContext()
    var ds = ic.lookup(dataSource)
    var created = false
    
    log.info("Entrei no dataset dsComponentesOrdemProducao novo")
    
    var myQuery = ""
    
	var codcoligada = ""
    var codfilial = ""
    var codestrutura = ""
    var codatividade = ""
    var codordem = ""
    var idAtvOrdem = ""
    var exec = ""
		
    if (constraints != null) {
    	
        for (var i = 0; i < constraints.length; i++) {
        	
            if (constraints[i].fieldName == "CODCOLIGADA") {
            	
            	codcoligada = constraints[i].initialValue
            	
            }
            
            if (constraints[i].fieldName == "CODFILIAL") {
            	
            	codfilial =  constraints[i].initialValue
            	
            }
            
            if (constraints[i].fieldName == "CODESTRUTURA") {
            	
            	codestrutura = "'"+constraints[i].initialValue+"'"
            	
            }
            
            if (constraints[i].fieldName == "CODATIVIDADE") {
            	
            	codatividade = "'"+constraints[i].initialValue+"'"
            	
            }
            
            if (constraints[i].fieldName == "CODORDEM") {
            	
            	codordem = "'"+constraints[i].initialValue+"'"
            	
            }
            
            if (constraints[i].fieldName == "IDATVORDEM") {
            	
            	idAtvOrdem = constraints[i].initialValue
            	
            }
            if (constraints[i].fieldName == "EXCECAO") {
            	
            	if(constraints[i].initialValue=="SIM"){
            		
            			exec = " AND P.CODIGOPRD NOT LIKE '03.023.%'  AND P.CODIGOPRD NOT LIKE '04.024.%' "
            		
            	}
            	
            }
            
        }
        
    }
	
	
	
	myQuery = 		"	SELECT P.IDPRD,P.CODIGOPRD,P.DESCRICAO,CONCAT(P.CODIGOPRD,' - ',P.NOMEFANTASIA) NOMEPRODUTO,'PRINCIPAL' TIPO,P.SALDOGERALFISICO   "+
					"	FROM TPRD P "+
					"	INNER JOIN KORDEM K ON "+
					"	K.CODCOLIGADA=P.CODCOLIGADA "+
					"	INNER JOIN KATVORDEM KA ON "+
					"	KA.CODCOLIGADA=K.CODCOLIGADA "+
					"	AND KA.CODFILIAL=K.CODFILIAL "+
					"	AND KA.CODORDEM=K.CODORDEM "+
					"	INNER JOIN KATVORDEMMP KM ON  "+
					"	KM.CODCOLIGADA=KA.CODCOLIGADA "+
					"	AND KM.CODFILIAL=KA.CODFILIAL "+
					"	AND KM.CODORDEM=KA.CODORDEM "+
					"	AND KM.IDATIVIDADE=KA.IDATVORDEM  "+
					"	AND KM.IDPRODUTO=P.IDPRD "+
					"	LEFT JOIN ZMDPLANOAPROVEITAMENTOCORTE Z ON "+
					"	Z.CODCOLIGADA=KA.CODCOLIGADA "+
					"	AND Z.CODFILIAL=KA.CODFILIAL "+
					"	AND Z.CODESTRUTURA=KA.CODESTRUTURA "+
					"	AND Z.CODATIVIDADE=KA.CODATIVIDADE "+
					"	AND Z.CODIGOMP=P.CODIGOPRD "+
					"	AND Z.CODORDEM=KA.CODORDEM "+
					"	WHERE		K.CODCOLIGADA = "+codcoligada+" "+ 
					"		AND		K.CODFILIAL = "+codfilial+" "+
					"		AND		K.CODORDEM = "+codordem+" "+
					"		AND     KA.IDATVORDEM = "+idAtvOrdem+" "+
					"		AND     P.CODIGOPRD NOT LIKE '01.053.%' AND P.CODIGOPRD NOT LIKE '01.019.%' AND P.CODIGOPRD NOT LIKE '01.020.%' "+
					"   AND Z.NSEQPLANOCORTE IS NULL "+
					"	UNION  "+
					"	SELECT P.IDPRD,P.CODIGOPRD,P.DESCRICAO,CONCAT(P.CODIGOPRD,' - ',P.NOMEFANTASIA) NOMEPRODUTO,CONCAT('SUBSTITUTO DO ',KC.IDPRDORIGEM) TIPO,P.SALDOGERALFISICO   "+ 
					"	FROM TPRD P "+
					"	INNER JOIN KORDEM K ON "+
					"	K.CODCOLIGADA=P.CODCOLIGADA "+
					"	INNER JOIN KATVORDEM KA ON "+
					"	KA.CODCOLIGADA=K.CODCOLIGADA "+
					"	AND KA.CODFILIAL=K.CODFILIAL "+
					"	AND KA.CODORDEM=K.CODORDEM "+
					"	INNER JOIN KATVORDEMMP KM ON  "+
					"	KM.CODCOLIGADA=KA.CODCOLIGADA "+
					"	AND KM.CODFILIAL=KA.CODFILIAL "+
					"	AND KM.CODORDEM=KA.CODORDEM "+
					"	AND KM.IDATIVIDADE=KA.IDATVORDEM  "+
					"	AND KM.IDPRODUTO=P.IDPRD "+
					"	INNER JOIN KCOMPSUBSTITUTO KC ON "+
					"	KC.CODCOLIGADA=KA.CODCOLIGADA "+
					"	AND KC.CODFILIAL=KA.CODFILIAL "+
					"	AND KC.CODESTRUTURA=KA.CODESTRUTURA "+
					"	AND KC.CODATIVIDADE=KA.CODATIVIDADE "+
					"	AND KC.IDPRDORIGEM=KM.IDPRODUTO "+
					"	LEFT JOIN ZMDPLANOAPROVEITAMENTOCORTE Z ON "+
					"	Z.CODCOLIGADA=KA.CODCOLIGADA "+
					"	AND Z.CODFILIAL=KA.CODFILIAL "+
					"	AND Z.CODESTRUTURA=KA.CODESTRUTURA "+
					"	AND Z.CODATIVIDADE=KA.CODATIVIDADE "+
					"	AND Z.CODIGOMP=P.CODIGOPRD "+
					"	AND Z.CODORDEM=KA.CODORDEM "+
					"	WHERE		K.CODCOLIGADA = "+codcoligada+" "+ 
					"		AND		K.CODFILIAL = "+codfilial+" "+
					"		AND		K.CODORDEM = "+codordem+" "+
					"		AND     KA.IDATVORDEM = "+idAtvOrdem+" "+
					"		AND     P.CODIGOPRD NOT LIKE '01.053.%' AND P.CODIGOPRD NOT LIKE '01.019.%' AND P.CODIGOPRD NOT LIKE '01.020.%' "+
					"   AND Z.NSEQPLANOCORTE IS NULL "
	 
	
    log.info("dsComponentesOrdemProducao MY QUERY: " + myQuery)
    
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