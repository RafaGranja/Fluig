//VERIFICA SE O PAPC JÁ FOI CONCLUÍDO
function createDataset(fields, constraints, sortFields) {

	var dsConcluidoPAPC = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/FluigDSRM";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;
    
    var numplano =""
    	
    log.info("Entrei no dataset dsConcluidoPAPC")
    	
	if (constraints != null) {
    	
        for (var i = 0; i < constraints.length; i++) {
        	
        	if (constraints[i].fieldName == "NUMPLANOCORTE"){
        		
        		numplano = constraints[i].initialValue
        		
        	}
        
    }
    
    var myQuery = "SELECT R.QUANTIDADE, R.QTD FROM ( "+
						" SELECT QUANTIDADE,CASE WHEN QTDEAPONTADA IS NULL THEN 0 ELSE QTDEAPONTADA END AS QTD FROM ZMDPLANOAPROVEITAMENTOCORTE WHERE NUMPLANOCORTE='"+numplano+"' "+ 
						" ) R "+
						" WHERE R.QTD < R.QUANTIDADE "
    
    log.info("QUERY dsConcluidoPAPC: " + myQuery);
    
    try {
    	
        var conn = ds.getConnection();
        var stmt = conn.createStatement();
        var rs = stmt.executeQuery(myQuery);
        var columnCount = rs.getMetaData().getColumnCount();
        
        while (rs.next()) {
        	
            if (!created) {
            	
                for (var i = 1; i <= columnCount; i++) {
                	
                	dsConcluidoPAPC.addColumn(rs.getMetaData().getColumnName(i));
                	
                }
                
                created = true;
                
            }
            
            var Arr = new Array();
            
            for (var i = 1; i <= columnCount; i++) {
            	
                var obj = rs.getObject(rs.getMetaData().getColumnName(i));
                
                if (null != obj) {
                	
                    Arr[i - 1] = rs.getObject(rs.getMetaData().getColumnName(i)).toString();
                    
                } else {
                	
                    Arr[i - 1] = "null";
                    
                }
                
            }
            
            dsConcluidoPAPC.addRow(Arr);
            
        }
        
    } catch (e) {
        
    	log.error("ERRO==============> " + e.message);
    
    } finally {
    	
        if (stmt != null) {
        	
            stmt.close();
            
        }
        
        if (conn != null) {
        	
            conn.close();
            
        }
        
    }
 
    return dsConcluidoPAPC;
    
	}
}