// BUSCA OS COMPONENTES PENDENTES DE UM ITEM
function createDataset(fields, constraints, sortFields) {

	var dsComponentesPendentes = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/FluigDSRM";
    //var dataSource = "/jdbc/FluigDSRM";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;
    
    var os = ""
    var codtrf = ""
    var exec = ""
    var indice = ""
    var codordem = ""
    var papc = ""
    var categoria = ""
    var codColigada = ""
    var codFilial = ""
       
    log.info("Entrei no dataset dsComponentesPendentes")	
    
    log.info("constraints")
    
    if (constraints != null) {
    	
        for (var i = 0; i < constraints.length; i++) {
        	
        	if(constraints[i].fieldName == "NUM_OS"){
        		
        		os = " AND OS='"+constraints[i].initialValue+"' "
        		
        	}
			if(constraints[i].fieldName == "CODTRFEX"){
			        		
			    codtrf = " AND EX1.CODTRFPAI ='"+constraints[i].initialValue+"' "
			        		
			}
			        	
			if(constraints[i].fieldName == "EXECUCAO"){
				
				exec = " AND EX1.EXECUCAO="+constraints[i].initialValue
				
			}
			if(constraints[i].fieldName == "INDICE"){
				
				indice = " AND EX1.IDCRIACAO="+constraints[i].initialValue
				
			}
			if(constraints[i].fieldName == "CODORDEM"){
				
				codordem = " AND K.CODORDEM='"+constraints[i].initialValue+"'"
				
			}
			if(constraints[i].fieldName == "PAPC"){
				
				papc = constraints[i].initialValue
				
				if(papc=="0"){
					
					papc=" AND C.PAPC='0'"
					
				}
				else if(papc=="1"){
					
					papc = " AND C.PAPC!='0'"
					
				}
				
			}
			if(constraints[i].fieldName == "CATEGORIA"){
				
				categoria = constraints[i].initialValue
				
				
			}
			if(constraints[i].fieldName == "CODFILIAL"){
				
				codFilial = " AND K.CODFILIAL="+constraints[i].initialValue+" "
				
				
			}
			if(constraints[i].fieldName == "CODCOLIGADA"){
				
				codColigada = " AND K.CODCOLIGADA="+constraints[i].initialValue+" "
				
				
			}

        }
        
    }
    
    var myQuery = 	" WITH CTE AS ( "+
				    " 	SELECT EXECUCAO,CODCOLIGADA,CODFILIAL,INDICE,STATUS_ATV,STATUS_OP,CODESTRUTURA,CODORDEM,IDATVORDEM,CODATIVIDADE,SALDOPAPC,PAPC,SUBSTITUTO IDPRODUTO,GRUPO,MASKPRD,SUM(PREVISTO) PREVISTO,SUM(APONTADO) APONTADO,NOMEFANTASIA FROM ( "+
				    " 		SELECT * "+
				    " 		,CASE WHEN PREVISTO = 0 THEN 'SUBSTITUTO' ELSE 'PRINCIPAL' END AS POSICAO, "+
				    " 		CASE WHEN PREVISTO = 0 THEN " +
				    "			CASE WHEN COALESCE((SELECT IDPRDORIGEM FROM KCOMPSUBSTITUTO WHERE IDPRD=IDPRODUTO AND CODESTRUTURA=R2.CODESTRUTURA AND CODATIVIDADE=R2.CODATIVIDADE),0) = 0 "+
				    "				THEN (SELECT TOP 1 IDPRODUTO "+
                    "                                               FROM   KATVORDEMMP "+
                    "                                              WHERE  CODCOLIGADA=R2.CODCOLIGADA "+
					"											   AND	  CODORDEM=R2.CODORDEM "+
					"											   AND    IDATIVIDADE=R2.IDATVORDEM "+
					"											   AND	EFETIVADO=0 "+
					"											   AND IDPRODUTO IN (SELECT DISTINCT IDPRD FROM TPRODUTO WHERE CODCOLPRD=R2.CODCOLIGADA AND NOMEFANTASIA=R2.NOMEFANTASIA AND INATIVO=0 AND CODIGOPRD LIKE '03.023%')) " +
				    "				ELSE (SELECT IDPRDORIGEM FROM KCOMPSUBSTITUTO WHERE IDPRD=IDPRODUTO AND CODESTRUTURA=R2.CODESTRUTURA AND CODATIVIDADE=R2.CODATIVIDADE) END " +
				    "		ELSE R2.IDPRODUTO END AS SUBSTITUTO "+
				    " 		 FROM ( "+
				    " 			SELECT EXECUCAO,CODCOLIGADA,CODFILIAL,INDICE,CODESTRUTURA,CODORDEM,IDATVORDEM,CODATIVIDADE,SALDOPAPC,PAPC,IDPRODUTO,SUM(PREVISTO) PREVISTO,SUM(APONTADO) APONTADO,CODTB2FAT GRUPO,MASKPRD,CODIGOPRD,STATUS_ATV,STATUS_OP,NOMEFANTASIA FROM ( "+ 
				    " 				SELECT EX1.EXECUCAO,KA.CODCOLIGADA,KA.CODFILIAL,EX1.INDICE,KA.CODESTRUTURA,K.CODORDEM,KA.IDATVORDEM,KA.CODATIVIDADE,CASE WHEN PAPC.NUMPLANOCORTE IS NULL  "+
				    " 					THEN 0  "+
				    " 					ELSE  "+
				    " 						CASE WHEN PAPC.QTDEAPONTADA IS NULL  "+
				    " 							THEN  CASE WHEN PAPC.QUANTIDADE-KA.QUANTIDADE < 0   "+
				    " 										THEN 0 "+
				    " 										ELSE PAPC.QUANTIDADE-KA.QUANTIDADE "+
				    " 										END "+
				    " 							ELSE PAPC.QUANTIDADE-PAPC.QTDEAPONTADA "+
				    " 							END			 "+
				    " 					END AS SALDOPAPC, "+
				    " 				CASE WHEN PAPC.NUMPLANOCORTE IS NULL THEN '0' ELSE PAPC.NUMPLANOCORTE END AS PAPC, "+
				    " 				KMA.IDPRODUTO, "+
				    " 				CASE WHEN KMA.EFETIVADO=0 THEN KMA.QUANTIDADE ELSE 0 END AS PREVISTO, "+
				    " 				CASE WHEN KMA.EFETIVADO=1 THEN KMA.QUANTIDADE ELSE 0 END AS APONTADO, "+
				    " 				(SELECT CODTB2FAT FROM TPRODUTODEF WHERE CODCOLIGADA=KA.CODCOLIGADA AND IDPRD=KMA.IDPRODUTO) CODTB2FAT, "+
				    " 				LEFT(P.CODIGOPRD,6) MASKPRD,P.CODIGOPRD,P.NOMEFANTASIA,KA.STATUS STATUS_ATV,K.STATUS STATUS_OP "+
				    " 				FROM FLUIG.DBO.Z_CRM_EX001005 (NOLOCK) EX1 "+
				    " 					INNER JOIN KORDEM (NOLOCK) K ON  "+
				    " 					K.CODCOLIGADA=EX1.CODCOLIGADA "+
				    " 					AND K.CODFILIAL=EX1.CODFILIAL "+
				    " 					AND K.CODCCUSTO=EX1.OS COLLATE SQL_Latin1_General_CP1_CI_AI "+
				    " 					INNER JOIN KATVORDEM (NOLOCK) KA ON "+
				    " 					KA.CODCOLIGADA=K.CODCOLIGADA "+
				    " 					AND KA.CODFILIAL=K.CODFILIAL "+
				    " 					AND KA.CODORDEM=K.CODORDEM "+
				    " 					AND KA.CODESTRUTURA=EX1.CODIGOPRD COLLATE SQL_Latin1_General_CP1_CI_AI "+
				    " 					LEFT JOIN ZMDPLANOAPROVEITAMENTOCORTE (NOLOCK) PAPC ON "+
				    " 					PAPC.CODCOLIGADA=KA.CODCOLIGADA "+
				    " 					AND PAPC.CODFILIAL=KA.CODFILIAL "+
				    " 					AND PAPC.CODORDEM=KA.CODORDEM "+
				    " 					AND PAPC.CODATIVIDADE=KA.CODATIVIDADE "+
				    " 					INNER JOIN KORDEMCOMPL (NOLOCK) KL ON "+
				    " 					KL.CODCOLIGADA=KA.CODCOLIGADA "+
				    " 					AND KL.CODFILIAL=KA.CODFILIAL "+
				    " 					AND KL.CODORDEM=KA.CODORDEM "+
				    " 					AND KL.NUMEXEC=EX1.EXECUCAO "+
				    " 					INNER JOIN KATVORDEMMP (NOLOCK) KMA ON "+
				    " 					KMA.CODCOLIGADA=KA.CODCOLIGADA "+
				    " 					AND KMA.CODFILIAL=KA.CODFILIAL "+
				    " 					AND KMA.CODORDEM=KA.CODORDEM "+
				    " 					AND KMA.IDATIVIDADE=KA.IDATVORDEM "+
				    " 					INNER JOIN TPRD (NOLOCK) P ON          "+
				    " 					KMA.CODCOLIGADA = P.CODCOLIGADA  "+
				    " 					AND KMA.IDPRODUTO = P.IDPRD "+
				    " 				WHERE EX1.ITEMEXCLUSIVO<>2  "+
				    " 				"+os+" "+exec+" "+codtrf+" "+indice+" "+codordem+" "+codFilial+" "+codColigada+" AND K.STATUS NOT IN (6) AND KA.STATUS NOT IN (6) AND COALESCE(K.REPROCESSAMENTO,0)=0 "+
				    " 				) R  "+
				    //" 				WHERE (CODTB2FAT = 0184 OR MASKPRD NOT IN ('01.053','01.019','01.020')) AND  "+
				    " 				WHERE ( CODTB2FAT != 0184 OR CODTB2FAT IS NULL ) AND MASKPRD NOT IN ('01.053','01.019','01.020') AND  "+
				    " 				( PAPC='0' OR SALDOPAPC>0) "+
				    " 				GROUP BY EXECUCAO,CODCOLIGADA,CODFILIAL,INDICE,CODORDEM,IDATVORDEM,SALDOPAPC,PAPC,IDPRODUTO,CODTB2FAT,MASKPRD,CODATIVIDADE,CODESTRUTURA,CODIGOPRD,STATUS_ATV,STATUS_OP,NOMEFANTASIA "+
				    " 			) R2  "+
				    " 		) R3 GROUP BY EXECUCAO,CODCOLIGADA,CODFILIAL,INDICE,CODESTRUTURA,CODORDEM,IDATVORDEM,CODATIVIDADE,SALDOPAPC,PAPC,SUBSTITUTO,GRUPO,MASKPRD,STATUS_ATV,STATUS_OP,NOMEFANTASIA ) "+
				    " , CTE2 AS ( SELECT CODCOLIGADA,CODFILIAL,INDICE,CODESTRUTURA,CODORDEM,IDATVORDEM,CODATIVIDADE,SALDOPAPC,PAPC,IDPRODUTO,NOMEFANTASIA,GRUPO,MASKPRD,CODIGOPRD,PREVISTO,APONTADO,STATUS_ATV,STATUS_OP, "+
				    " 				CASE WHEN GRUPO='0184'  "+
				    " 					THEN  "+
				    " 						CASE WHEN SALDO23 > 0 THEN 1 ELSE 0 END "+
				    " 					ELSE "+
				    " 						CASE WHEN SALDO23 >= R.PREVISTO THEN 1 ELSE 0 END "+
				    " 				END AS SALDO23, "+
				    " 				CASE WHEN GRUPO='0184'  "+
				    " 					THEN  "+
				    " 						CASE WHEN SALDO23LIBERADO > 0 THEN 1 ELSE 0 END "+
				    " 					ELSE "+
				    " 						CASE WHEN SALDO23LIBERADO >= R.PREVISTO THEN 1 ELSE 0 END  "+
				    " 				END AS SALDO23LIBERADO, "+
				    " 				CASE WHEN GRUPO='0184'  "+
				    " 					THEN  "+
				    " 						CASE WHEN SALDOTOTAL > 0 THEN 1 ELSE 0 END  "+
				    " 					ELSE "+
				    " 						CASE WHEN SALDOTOTAL >= R.PREVISTO THEN 1 ELSE 0 END  "+
				    " 				END AS SALDOTOTAL, "+
				    " 				CASE WHEN GRUPO='0184'  "+
				    " 					THEN  "+
				    " 						CASE WHEN SALDOTOTALLIBERADO > 0 THEN 1 ELSE 0 END "+
				    " 					ELSE "+
				    " 						CASE WHEN SALDOTOTALLIBERADO >= R.PREVISTO THEN 1 ELSE 0 END "+
				    " 				END AS SALDOTOTALLIBERADO,RAABERTA,RAPAPC FROM( "+
				    " 				 SELECT *,( SELECT SUM(SALDO) FROM (SELECT (TC.SALDOFISICO1 +  "+
				    " 						TC.SALDOFISICO2 +  "+
				    " 						TC.SALDOFISICO3 +  "+
				    " 						TC.SALDOFISICO4 +  "+
				    " 						TC.SALDOFISICO5 +  "+
				    " 						TC.SALDOFISICO6 +  "+
				    " 						TC.SALDOFISICO7 +  "+
				    " 						TC.SALDOFISICO8 +  "+
				    " 						TC.SALDOFISICO9 + "+
				    " 						TC.SALDOFISICO10) SALDO,TC.IDLOTE,CODLOC,TC.IDPRD,TC.CODFILIAL,TC.CODCOLIGADA,TL.IDSTATUS,TL.NUMLOTE FROM TLOTEPRDLOC (NOLOCK) TC "+
				    " 						INNER JOIN TLOTEPRD (NOLOCK) TL ON "+
				    " 						TL.CODCOLIGADA=TC.CODCOLIGADA "+
				    " 						AND TL.IDLOTE=TC.IDLOTE "+
				    " 						AND TL.IDPRD=TC.IDPRD  "+
				    " 						) S WHERE(IDPRD=C.IDPRODUTO OR (IDPRD IN (SELECT DISTINCT IDPRD FROM TPRODUTO WHERE CODCOLPRD=C.CODCOLIGADA AND NOMEFANTASIA = C.NOMEFANTASIA AND INATIVO=0 AND CODIGOPRD LIKE '03.023%') AND C.MASKPRD='03.023' )  " +
				    "						 OR IDPRD IN (SELECT DISTINCT IDPRD FROM KCOMPSUBSTITUTO (NOLOCK) WHERE IDPRDORIGEM=C.IDPRODUTO AND CODESTRUTURA=C.CODESTRUTURA AND CODATIVIDADE=C.CODATIVIDADE)) "+
				    " 						 AND CODFILIAL=C.CODFILIAL AND CODCOLIGADA=C.CODCOLIGADA AND CODLOC=23 ) SALDO23, "+
				    " 			( SELECT SUM(SALDO) FROM (SELECT (TC.SALDOFISICO1 +  "+
				    " 						TC.SALDOFISICO2 +  "+
				    " 						TC.SALDOFISICO3 +  "+
				    " 						TC.SALDOFISICO4 +  "+
				    " 						TC.SALDOFISICO5 +  "+
				    " 						TC.SALDOFISICO6 +  "+
				    " 						TC.SALDOFISICO7 +  "+
				    " 						TC.SALDOFISICO8 +  "+
				    " 						TC.SALDOFISICO9 + "+
				    " 						TC.SALDOFISICO10) SALDO,TC.IDLOTE,CODLOC,TC.IDPRD,TC.CODFILIAL,TC.CODCOLIGADA,TL.IDSTATUS,TL.NUMLOTE FROM TLOTEPRDLOC (NOLOCK) TC "+
				    " 						INNER JOIN TLOTEPRD (NOLOCK) TL ON "+
				    " 						TL.CODCOLIGADA=TC.CODCOLIGADA "+
				    " 						AND TL.IDLOTE=TC.IDLOTE "+
				    " 						AND TL.IDPRD=TC.IDPRD  "+
				    " 						) S WHERE (IDPRD=C.IDPRODUTO OR (IDPRD IN (SELECT DISTINCT IDPRD FROM TPRODUTO WHERE CODCOLPRD=C.CODCOLIGADA AND NOMEFANTASIA = C.NOMEFANTASIA AND INATIVO=0 AND CODIGOPRD LIKE '03.023%') AND C.MASKPRD='03.023' )  " +
				    "							OR IDPRD IN (SELECT DISTINCT IDPRD FROM KCOMPSUBSTITUTO (NOLOCK) WHERE IDPRDORIGEM=C.IDPRODUTO AND CODESTRUTURA=C.CODESTRUTURA AND CODATIVIDADE=C.CODATIVIDADE)) "+
				    " 						 AND CODFILIAL=C.CODFILIAL AND CODCOLIGADA=C.CODCOLIGADA AND CODLOC=23 AND IDSTATUS=6 ) SALDO23LIBERADO, "+
				    " 			CASE WHEN (SELECT TOP 1 NUMEROMOV FROM TMOV T (NOLOCK) INNER JOIN TITMMOV TI ON TI.CODCOLIGADA=T.CODCOLIGADA AND TI.IDMOV=T.IDMOV " +
				    "				 WHERE T.CODTMV='1.1.05' AND T.CODCOLIGADA=C.CODCOLIGADA AND T.STATUS='A' AND T.CODFILIAL=C.CODFILIAL  "+
				    " 						AND ((T.CAMPOLIVRE1=C.CODORDEM AND T.CAMPOLIVRE2=C.IDATVORDEM) OR T.CAMPOLIVRE3=C.PAPC ) "+
				    " 						AND (TI.IDPRD = C.IDPRODUTO OR TI.IDPRD IN (SELECT DISTINCT IDPRD FROM KCOMPSUBSTITUTO (NOLOCK) WHERE IDPRDORIGEM=C.IDPRODUTO AND CODESTRUTURA=C.CODESTRUTURA AND CODATIVIDADE=C.CODATIVIDADE))) IS NOT NULL "+
				    " 				 THEN (SELECT TOP 1 NUMEROMOV FROM TMOV T (NOLOCK) INNER JOIN TITMMOV TI ON TI.CODCOLIGADA=T.CODCOLIGADA AND TI.IDMOV=T.IDMOV " +
				    "				 WHERE T.CODTMV='1.1.05' AND T.CODCOLIGADA=C.CODCOLIGADA AND T.STATUS='A' AND T.CODFILIAL=C.CODFILIAL  "+
				    " 						AND ((T.CAMPOLIVRE1=C.CODORDEM AND T.CAMPOLIVRE2=C.IDATVORDEM) OR T.CAMPOLIVRE3=C.PAPC )  "+
				    " 						AND (TI.IDPRD = C.IDPRODUTO OR TI.IDPRD IN (SELECT DISTINCT IDPRD FROM KCOMPSUBSTITUTO (NOLOCK) WHERE IDPRDORIGEM=C.IDPRODUTO AND CODESTRUTURA=C.CODESTRUTURA AND CODATIVIDADE=C.CODATIVIDADE))) "+
				    " 				ELSE '0' "+
				    " 			END AS RAABERTA,ISNULL((SELECT TOP 1 NUMEROMOV FROM TMOV WHERE CODCOLIGADA=C.CODCOLIGADA AND CAMPOLIVRE3=C.PAPC AND STATUS!='C' ORDER BY IDMOV) ,'0') RAPAPC, "+
				    " 			( SELECT SUM(SALDO) FROM (SELECT (TC.SALDOFISICO1 +  "+
				    " 						TC.SALDOFISICO2 +  "+
				    " 						TC.SALDOFISICO3 +  "+
				    " 						TC.SALDOFISICO4 +  "+
				    " 						TC.SALDOFISICO5 +  "+
				    " 						TC.SALDOFISICO6 +  "+
				    " 						TC.SALDOFISICO7 +  "+
				    " 						TC.SALDOFISICO8 +  "+
				    " 						TC.SALDOFISICO9 + "+
				    " 						TC.SALDOFISICO10) SALDO,TC.IDLOTE,CODLOC,TC.IDPRD,TC.CODFILIAL,TC.CODCOLIGADA,TL.IDSTATUS,TL.NUMLOTE FROM TLOTEPRDLOC (NOLOCK) TC "+
				    " 						INNER JOIN TLOTEPRD (NOLOCK) TL ON "+
				    " 						TL.CODCOLIGADA=TC.CODCOLIGADA "+
				    " 						AND TL.IDLOTE=TC.IDLOTE "+
				    " 						AND TL.IDPRD=TC.IDPRD  "+
				    " 						) S WHERE (IDPRD=C.IDPRODUTO OR (IDPRD IN (SELECT DISTINCT IDPRD FROM TPRODUTO WHERE CODCOLPRD=C.CODCOLIGADA AND NOMEFANTASIA = C.NOMEFANTASIA AND INATIVO=0 AND CODIGOPRD LIKE '03.023%') AND C.MASKPRD='03.023' )  " +
				    "							OR IDPRD IN (SELECT DISTINCT IDPRD FROM KCOMPSUBSTITUTO (NOLOCK) WHERE IDPRDORIGEM=C.IDPRODUTO AND CODESTRUTURA=C.CODESTRUTURA AND CODATIVIDADE=C.CODATIVIDADE)) "+
				    " 							 AND CODFILIAL=C.CODFILIAL AND CODCOLIGADA=C.CODCOLIGADA) SALDOTOTAL, "+
				    " 			( SELECT SUM(SALDO) FROM (SELECT (TC.SALDOFISICO1 +  "+
				    " 						TC.SALDOFISICO2 +  "+
				    " 						TC.SALDOFISICO3 +  "+
				    " 						TC.SALDOFISICO4 +  "+
				    " 						TC.SALDOFISICO5 +  "+
				    " 						TC.SALDOFISICO6 +  "+
				    " 						TC.SALDOFISICO7 +  "+
				    " 						TC.SALDOFISICO8 +  "+
				    " 						TC.SALDOFISICO9 + "+
				    " 						TC.SALDOFISICO10) SALDO,TC.IDLOTE,CODLOC,TC.IDPRD,TC.CODFILIAL,TC.CODCOLIGADA,TL.IDSTATUS,TL.NUMLOTE FROM TLOTEPRDLOC (NOLOCK) TC "+
				    " 						INNER JOIN TLOTEPRD (NOLOCK) TL ON "+
				    " 						TL.CODCOLIGADA=TC.CODCOLIGADA "+
				    " 						AND TL.IDLOTE=TC.IDLOTE "+
				    " 						AND TL.IDPRD=TC.IDPRD  "+
				    " 						) S WHERE (IDPRD=C.IDPRODUTO OR (IDPRD IN (SELECT DISTINCT IDPRD FROM TPRODUTO WHERE CODCOLPRD=C.CODCOLIGADA AND NOMEFANTASIA = C.NOMEFANTASIA AND INATIVO=0 AND CODIGOPRD LIKE '03.023%') AND C.MASKPRD='03.023' )  " +
				    "							OR IDPRD IN (SELECT DISTINCT IDPRD FROM KCOMPSUBSTITUTO (NOLOCK) WHERE IDPRDORIGEM=C.IDPRODUTO AND CODESTRUTURA=C.CODESTRUTURA AND CODATIVIDADE=C.CODATIVIDADE)) "+
				    " 							AND CODFILIAL=C.CODFILIAL AND CODCOLIGADA=C.CODCOLIGADA AND IDSTATUS=6) SALDOTOTALLIBERADO,( SELECT CODIGOPRD FROM TPRODUTO WHERE CODCOLPRD=C.CODCOLIGADA AND INATIVO=0 AND IDPRD=C.IDPRODUTO ) CODIGOPRD "+
				    " 																						 FROM CTE C "+
				    " 							WHERE ((PREVISTO - APONTADO) > 0 AND (GRUPO!='0184' OR GRUPO IS NULL))  OR (APONTADO <= 0 AND GRUPO='0184') ) R ) "+
				    " SELECT C.INDICE,C.CODORDEM,KS2.DSCSTATUS STATUS_OP,C.IDATVORDEM,KA.DSCATIVIDADE,KS.DSCSTATUS STATUS_ATV,C.CODIGOPRD,C.NOMEFANTASIA NOMEFANTASIA,CASE WHEN C.GRUPO='0184'  "+
				    " 			THEN  "+
				    " 				CASE WHEN C.APONTADO > 0  "+
				    " 					THEN  "+
				    " 						'OK' "+
				    " 					ELSE  "+
				    " 						CASE WHEN C.SALDO23 = 1  "+
				    " 							THEN  "+
				    " 								CASE WHEN C.SALDO23LIBERADO = 1   "+
				    " 									THEN  "+
				    " 									CONCAT('Apontar Componente ',C.CODIGOPRD,' ou substituto "+(categoria==1 ? '___APONTAR' : "")+"') "+
				    " 									ELSE  "+
				    " 									'Liberar lotes do local 23 para apontamento do componente principal ou substituto  "+(categoria==1 ? '___ALMOX' : "")+"' "+
				    " 								END "+
				    " 							ELSE  "+
				    " 								CASE WHEN C.RAABERTA != '0'  "+
				    " 									THEN  "+
				    " 									CONCAT('Atender RA ',C.RAABERTA "+(categoria==1 ? ",'___ALMOX'" : "")+") "+
				    " 									ELSE  "+
				    " 										CASE WHEN C.SALDOTOTAL = 1  "+
				    " 											THEN  "+
				    " 												CASE WHEN C.SALDOTOTALLIBERADO = 1  "+
				    " 													THEN  "+
				    " 													'Gerar RA para componente principal ou substituto "+(categoria==1 ? '___PCP' : "")+"' "+
				    " 													ELSE  "+
				    " 													'Liberar estoque fora do local 23 para posterior geração de RA "+(categoria==1 ? '___ALMOX' : "")+"' "+
				    " 												END "+
				    " 											ELSE "+
				    " 											'Pendente entrada de nota, ou chegada do material "+(categoria==1 ? '___OUTROS' : "")+"' "+
				    " 										END "+
				    " 								END "+
				    " 						END "+
				    " 				END "+
				    " 			ELSE  "+
				    " 				CASE WHEN C.PAPC !='0' "+
				    " 					THEN "+
				    " 						CASE WHEN C.SALDOPAPC > 0 "+
				    " 							THEN  "+
				    "								CASE WHEN C.RAABERTA = '0' AND C.RAPAPC = '0' "+
     				"									THEN  "+
    				"                                    CONCAT('Gerar RA do plano ',C.PAPC "+(categoria==1 ? ",'___PCP'" : "")+") "+
    				"									ELSE "+
    				"										CASE WHEN C.RAABERTA != '0' AND  C.RAPAPC != '0'   " +
    				"											THEN" +
    				"											 	CONCAT('Atender RA ',C.RAPAPC "+(categoria==1 ? ",'___ALMOX'" : "")+") "+
    				"                                           ELSE "+
    				"												CASE WHEN C.SALDO23 = 1  "+
				    " 														THEN  "+
				    " 															CASE WHEN C.SALDO23LIBERADO = 1   "+
				    " 																THEN   "+
				    " 																CONCAT('Apontar plano ',C.PAPC,' para completar baixa do material cadastrado "+(categoria==1 ? '___APONTAR' : "")+"') "+
				    " 																ELSE  "+
				    " 																'Liberar lote do local 23 para apontamento do plano "+(categoria==1 ? '___ALMOX' : "")+"' "+
				    " 															END "+
				    " 														ELSE  "+
				    " 															CASE WHEN C.SALDOTOTAL = 1  "+
				    "																THEN  "+
				    "																	CASE WHEN C.SALDOTOTALLIBERADO = 1  "+
				    "																		THEN  "+
				    "																			CONCAT('Houve erro na traneferência de material, consulte a RA ',C.RAPAPC"+(categoria==1 ? ",' ___ALMOX'" : "")+") "+
				    "																		ELSE  "+
				    "																			'Entrar em contato com o suporte "+(categoria==1 ? '___APONTAR' : "")+"' "+
				    "																	END "+
				    "																ELSE "+
				    "																'Pendente entrada de nota, ou chegada do material "+(categoria==1 ? '___OUTROS' : "")+"' "+
				    " 															END "+
				    " 													END "+
    				"                                        END "+
    				"									END "+ 
				    " 							ELSE "+
				    " 							'OK' "+
				    " 						END "+
				    " 					ELSE  "+
				    " 						CASE WHEN C.MASKPRD IN ('01.053','01.019','01.020')  "+
				    " 							THEN  "+
				    " 							'OK' "+
				    " 							ELSE "+
				    " 								CASE WHEN C.APONTADO >= C.PREVISTO "+
				    " 									THEN  "+
				    " 										'OK' "+
				    " 									ELSE  "+
				    " 										CASE WHEN C.MASKPRD IN ('03.023','04.024')  "+
				    " 											THEN  "+
				    " 												CASE WHEN C.SALDOTOTAL = 1  "+
				    " 													THEN  "+
				    " 													CONCAT('Apontar Componente ',C.CODIGOPRD,' ou substituto "+(categoria==1 ? '___APONTAR' : "")+"') "+
				    " 													ELSE "+
				    " 													CONCAT('Subir saldo do produto ',C.CODIGOPRD "+(categoria==1 ? ",'___PCP'" : "")+") "+
				    "  "+
				    " 												END "+
				    " 											ELSE  "+
				    " 													CASE WHEN C.SALDO23 = 1  "+
				    " 														THEN  "+
				    " 															CASE WHEN C.SALDO23LIBERADO = 1   "+
				    " 																THEN   "+
				    " 																CONCAT('Apontar Componente ',C.CODIGOPRD,' ou substituto "+(categoria==1 ? '___APONTAR' : "")+"') "+
				    " 																ELSE  "+
				    " 																'Liberar lotes do local 23 para apontamento do componente principal ou substituto "+(categoria==1 ? '___ALMOX' : "")+"' "+
				    " 															END "+
				    " 														ELSE  "+
				    " 															CASE WHEN C.RAABERTA != '0'  "+
				    " 																THEN  "+
				    " 																CONCAT('Atender RA ',C.RAABERTA "+(categoria==1 ? ",'___ALMOX'" : "")+") "+
				    " 																ELSE  "+
				    " 																	CASE WHEN C.SALDOTOTAL = 1  "+
				    " 																		THEN  "+
				    " 																			CASE WHEN C.SALDOTOTALLIBERADO = 1  "+
				    " 																				THEN  "+
				    " 																				'Gerar RA "+(categoria==1 ? '___PCP' : "")+"' "+
				    " 																				ELSE  "+
				    " 																				'Liberar estoque fora do local 23 para posterior geração de RA "+(categoria==1 ? '___ALMOX' : "")+"' "+
				    " 																			END "+
				    " 																		ELSE "+
				    " 																		'Pendente entrada de nota, ou chegada do material "+(categoria==1 ? '___OUTROS' : "")+"' "+
				    " 																	END "+
				    " 															END "+
				    " 													END "+
				    " 											END "+
				    " 								END "+
				    " 						END "+
				    " 				END "+
				    " 		END AS ACAO,C.PAPC NUMPLANOCORTE, CONCAT(CODIGOPRD , ' - ' , NOMEFANTASIA) COMPONENTE "+
				    " FROM CTE2 C  "+
				    " INNER JOIN KSTATUS (NOLOCK) KS ON "+
				    " KS.CODCOLIGADA=C.CODCOLIGADA "+
				    " AND KS.CODSTATUS=C.STATUS_ATV "+
				    " INNER JOIN KSTATUS (NOLOCK) KS2 ON "+
				    " KS2.CODCOLIGADA=C.CODCOLIGADA "+
				    " AND KS2.CODSTATUS=C.STATUS_OP "+
				    " INNER JOIN KATIVIDADE (NOLOCK) KA ON "+
				    " KA.CODCOLIGADA=C.CODCOLIGADA "+
				    " AND KA.CODFILIAL=C.CODFILIAL "+
				    " AND KA.CODATIVIDADE=C.CODATIVIDADE "+
				    " WHERE C.INDICE IS NOT NULL "+papc
				    " ORDER BY LEN(INDICE) DESC,CAST('/'+REPLACE(INDICE,'.','/')+'/' AS hierarchyid),CODORDEM,IDATVORDEM "

    
    log.info("QUERY dsComponentesPendentes: " + myQuery);
    
    try {
    	
        var conn = ds.getConnection();
        var stmt = conn.createStatement();
        var rs = stmt.executeQuery(myQuery);
        var columnCount = rs.getMetaData().getColumnCount();
        
        while (rs.next()) {
        	
            if (!created) {
            	
                for (var i = 1; i <= columnCount; i++) {
                	
                	dsComponentesPendentes.addColumn(rs.getMetaData().getColumnName(i));
                	
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
            
            dsComponentesPendentes.addRow(Arr);
            
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
    
    return dsComponentesPendentes;
	
}