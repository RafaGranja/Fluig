// BUSCA AS INFORMAÇÕES DAS ATIVIDADES QUE PODEM SER CADASTRADAS EM UM PLANO DE CORTE DE UM DETERMINADO PROJETO
function createDataset(fields, constraints, sortFields) {

	var dsAtualizaPendenciaNecessidade = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/FluigDS";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;
    
    log.info("entrei no dataset dsAtualizaPendenciaNecessidade")
    
    var pedido = ""
    var lognecessidade = ""
    var user = ""
    var pendencia = ""

			
    if (constraints != null) {
    	
        for (var i = 0; i < constraints.length; i++) {
        	
        	if (constraints[i].fieldName == "NSEQPEDIDO") {
            	
        		pedido = constraints[i].initialValue
        		
            }
        	if (constraints[i].fieldName == "LOGNECESSIDADE") {
            	
        		lognecessidade = constraints[i].initialValue
        		
            }
        	if (constraints[i].fieldName == "USER") {
            	
        		user = constraints[i].initialValue
        		
            }
        	if (constraints[i].fieldName == "PENDENCIA") {
            	
        		pendencia = constraints[i].initialValue
        		
            }
        	      	
        }
        
	}
    
    var myQuery =  " UPDATE Z_DELP_NECESSIDADEPAPC SET PENDENCIA="+pendencia+",LOGNECESSIDADE='"+lognecessidade+"' WHERE NSEQPEDIDO="+pedido
	    
    log.info("QUERY dsAtualizaPendenciaNecessidade: " + myQuery);
    
    try {
    	
        var conn = ds.getConnection();
        var stmt = conn.createStatement();
        var rs = stmt.executeQuery(myQuery);
        var columnCount = rs.getMetaData().getColumnCount();
        
        while (rs.next()) {
        	
            if (!created) {
            	
                for (var i = 1; i <= columnCount; i++) {
                	
                	dsAtualizaPendenciaNecessidade.addColumn(rs.getMetaData().getColumnName(i));
                	
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
            
            dsAtualizaPendenciaNecessidade.addRow(Arr);
            
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
    
    return dsAtualizaPendenciaNecessidade;
	
}