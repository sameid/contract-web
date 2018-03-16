#nohup http-server ./dist/ -p 443 --ssl --cert ./cert/portal_srjca_com.crt --key ./cert/portal_srjca_com.key & 
nohup http-server ./dist/ -p 8080 & 
