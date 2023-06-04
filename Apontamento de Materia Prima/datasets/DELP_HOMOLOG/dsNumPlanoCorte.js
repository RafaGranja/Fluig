function createDataset(fields, constraints, sortFields) {

	log.info("Entrei no dsNumPlanoCorte")
	
	var dsNumPlanoCorte = DatasetBuilder.newDataset()
    var dataSource = "/jdbc/FluigDSRM"
    var ic = new javax.naming.InitialContext()
    var ds = ic.lookup(dataSource)
    var created = false;
    
    var codFilial = ""
    var codColigada = ""
    var codCCusto = ""
    
    	
	if (constraints != null) {
    	
        for (var i = 0; i < constraints.length; i++) {
        	
        	if (constraints[i].fieldName == "CODFILIAL"){
        		
        		codFilial = " AND Z.CODFILIAL="+constraints[i].initialValue
        		
        	}
        	if (constraints[i].fieldName == "CODCOLIGADA"){
        		
        		codColigada = " AND Z.CODCOLIGADA="+constraints[i].initialValue
        		
        	}
        	if (constraints[i].fieldName == "CODCCUSTO"){
        		
        		codCCusto = " AND K.CODCCUSTO='"+constraints[i].initialValue+"' "
        		
        	}
        	
        }
        
    }
    
    var myQuery =   "SELECT DISTINCT Z.NUMPLANOCORTE, Z.IDLOTE, Z.NUMLOTE, Z.CODCOLIGADA, Z.CODFILIAL, T.NOMEFANTASIA,T.IDPRD,T.CODIGOPRD, " +
    				" ( SELECT CASE WHEN SUM(ISNULL(QUANTIDADE,0))!=SUM(ISNULL(QTDEAPONTADA,0)) THEN 0 ELSE 1 END AS CONCLUIDO FROM ZMDPLANOAPROVEITAMENTOCORTE WHERE CODCOLIGADA=Z.CODCOLIGADA AND CODFILIAL=Z.CODFILIAL AND NUMPLANOCORTE=Z.NUMPLANOCORTE ) CONCLUIDO"+
    				" FROM ZMDPLANOAPROVEITAMENTOCORTE Z " +
    				" INNER JOIN TPRD T ON T.CODCOLIGADA=Z.CODCOLIGADA AND T.CODIGOPRD=Z.CODIGOMP " +
    				" INNER JOIN KORDEM K ON K.CODCOLIGADA=Z.CODCOLIGADA AND K.CODFILIAL=Z.CODFILIAL AND K.CODORDEM=Z.CODORDEM " +
    				" WHERE Z.NUMPLANOCORTE IS NOT NULL "+codFilial+codColigada+codCCusto
    
    log.info("QUERY dsNumPlanoCorte: " + myQuery)
    
    try {
    	
        var conn = ds.getConnection()
        var stmt = conn.createStatement()
        var rs = stmt.executeQuery(myQuery)
        var columnCount = rs.getMetaData().getColumnCount()
        
        while (rs.next()) {
        	
            if (!created) {
            	
                for (var i = 1; i <= columnCount; i++) {
                	
                	dsNumPlanoCorte.addColumn(rs.getMetaData().getColumnName(i))
                	
                }
                
                created = true
                
            }
            
            var Arr = new Array();
            
            for (var i = 1; i <= columnCount; i++) {
            	
                var obj = rs.getObject(rs.getMetaData().getColumnName(i))
                
                if (null != obj) {
                	
                    Arr[i - 1] = rs.getObject(rs.getMetaData().getColumnName(i)).toString()
                    
                } else {
                	
                    Arr[i - 1] = "null"
                    
                }
                
            }
            
            dsNumPlanoCorte.addRow(Arr)
            
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
    
    return dsNumPlanoCorte
	
}