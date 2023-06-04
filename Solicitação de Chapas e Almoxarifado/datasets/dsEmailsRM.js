// BUSCA TODOS OS DADOS DAS RA'S GERADAS
function createDataset(fields, constraints, sortFields) {

	var dsEmailsRM = DatasetBuilder.newDataset()
    var dataSource = "/jdbc/FluigDSRM"
    var ic = new javax.naming.InitialContext()
    var ds = ic.lookup(dataSource)
    var created = false
    
    log.info("dsEmailsRM")
   
    
	
	myQuery =   " SELECT DISTINCT EMAIL FROM GUSUARIO WHERE EMAIL IS NOT NULL AND STATUS=1 AND EMAIL LIKE '%DELP%' "
					  
				
    log.info("dsEmailsRM MY QUERY: " + myQuery)
    
    try {
    	
        var conn = ds.getConnection()
        var stmt = conn.createStatement()
        var rs = stmt.executeQuery(myQuery)
        var columnCount = rs.getMetaData().getColumnCount()
        
        while (rs.next()) {
        	
            if (!created) {
            	
                for (var i = 1; i <= columnCount; i++) {
                	
                	dsEmailsRM.addColumn(rs.getMetaData().getColumnName(i))
                    
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
            
            dsEmailsRM.addRow(Arr)
            
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
    
    return dsEmailsRM;
	
}