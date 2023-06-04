// BUSCA INFORMAÇÔES DE UM PLANO DE CORTE 
function createDataset(fields, constraints, sortFields) {

	var dsBuscaInfoPAPC = DatasetBuilder.newDataset()
    var dataSource = "/jdbc/FluigDSRM"
    var ic = new javax.naming.InitialContext()
    var ds = ic.lookup(dataSource)
    var created = false
    
    log.info("dsBuscaInfoPAPC")
    
    var myQuery = ""
    
	var codColigada = ""
    var codFilial = ""
    var nuPlano = ""
    
	
    if (constraints != null) {
    	
        for (var i = 0; i < constraints.length; i++) {
        	
            if (constraints[i].fieldName == "CODCOLIGADA") {
            	
            	codColigada = " AND Z.CODCOLIGADA="+constraints[i].initialValue;
            	
            }
			if (constraints[i].fieldName == "CODFILIAL") {
			            	
			    codFilial = " AND Z.CODFILIAL="+constraints[i].initialValue;
			            	
			            }
			if (constraints[i].fieldName == "NUMPLANOCORTE") {
				
				numPlano = " Z.NUMPLANOCORTE = '"+constraints[i].initialValue+"' "
				
			}
           
            
        }
        
    }
	
	myQuery =   " SELECT K.CODCCUSTO OS,K.CODORDEM CODORDEM,KE.CAMDESENHO DESENHO,KA.IDATVORDEM IDATV, KATV.DSCATIVIDADE DESCATV,Z.CODATIVIDADE CODATV,Z.QUANTIDADE,Z.QTDEMP QTD"+
				" ,T.CODUNDCONTROLE CODUND,Z.NUMLOTE NUMLOTE ,Z.IDLOTE IDLOTE, T.NOMEFANTASIA DESCPROD, T.IDPRD,Z.CODFILIAL,Z.CODCOLIGADA,Z.NUMPLANOCORTE,T.CODIGOPRD "+
				" FROM ZMDPLANOAPROVEITAMENTOCORTE Z "+
				" INNER JOIN KORDEM K ON "+
				" K.CODCOLIGADA=Z.CODCOLIGADA "+
				" AND K.CODFILIAL=Z.CODFILIAL "+
				" AND K.CODORDEM=Z.CODORDEM "+
				" INNER JOIN KATVORDEM KA ON "+
				" KA.CODCOLIGADA=Z.CODCOLIGADA "+
				" AND KA.CODFILIAL=Z.CODFILIAL "+
				" AND KA.CODORDEM=Z.CODORDEM "+
				" AND KA.CODATIVIDADE=Z.CODATIVIDADE "+
				" INNER JOIN KESTRUTURACOMPL KE ON "+
				" KE.CODCOLIGADA=Z.CODCOLIGADA "+
				" AND KE.CODFILIAL=Z.CODFILIAL "+
				" AND KE.CODESTRUTURA=Z.CODESTRUTURA "+
				" INNER JOIN KATIVIDADE KATV ON "+
				" KATV.CODCOLIGADA=Z.CODCOLIGADA "+
				" AND KATV.CODFILIAL=Z.CODFILIAL "+
				" AND KATV.CODATIVIDADE=Z.CODATIVIDADE "+
				" INNER JOIN TPRD T ON "+
				" T.CODCOLIGADA=Z.CODCOLIGADA "+
				" AND T.CODIGOPRD=Z.CODIGOMP "+
				" WHERE "+numPlano+" "+codFilial+" "+codColigada
					  
				
    log.info("dsBuscaInfoPAPC MY QUERY: " + myQuery)
    
    try {
    	
        var conn = ds.getConnection()
        var stmt = conn.createStatement()
        var rs = stmt.executeQuery(myQuery)
        var columnCount = rs.getMetaData().getColumnCount()
        
        while (rs.next()) {
        	
            if (!created) {
            	
                for (var i = 1; i <= columnCount; i++) {
                	
                	dsBuscaInfoPAPC.addColumn(rs.getMetaData().getColumnName(i))
                    
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
            
            dsBuscaInfoPAPC.addRow(Arr)
            
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
    
    return dsBuscaInfoPAPC
	
}