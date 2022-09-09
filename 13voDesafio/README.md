con "tasklist" desde la cmd, veo todos los procesos
a) Ejecutar el servidor (modos FORK y CLUSTER) con nodemon verificando el numero de procesos tomados por node

---- FORK
$ node index.js -p=8080 -m=FORK (1 proceso)
(por sistema operativo)
Nombre de imagen PID Nombre de sesión Núm. de ses Uso de memor
========================= ======== ================ =========== ============
node.exe 17392 Console 4 57.604 KB

$ npm nodemon index.js -p=8080 -m=FORK (3 procesos)
(por sistema operativo)
Nombre de imagen PID Nombre de sesión Núm. de ses Uso de memor
========================= ======== ================ =========== ============
node.exe 16140 Console 4 44.060 KB
node.exe 13144 Console 4 32.872 KB
node.exe 15356 Console 4 60.280 KB

---- CLUSTER
$ node index.js -p=8080 -m=CLUSTER (13 procesos)
(por sistema operativo)
Nombre de imagen PID Nombre de sesión Núm. de ses Uso de memor
========================= ======== ================ =========== ============
node.exe 9696 Console 4 58.956 KB
node.exe 3772 Console 4 56.828 KB
node.exe 6356 Console 4 59.108 KB
node.exe 5424 Console 4 59.336 KB
node.exe 12040 Console 4 56.768 KB
node.exe 13648 Console 4 59.180 KB
node.exe 11984 Console 4 56.684 KB
node.exe 10172 Console 4 56.940 KB
node.exe 3892 Console 4 59.140 KB
node.exe 9904 Console 4 59.084 KB
node.exe 1144 Console 4 59.024 KB
node.exe 12952 Console 4 58.832 KB
node.exe 12748 Console 4 57.584 KB

$ npm nodemon index.js -p=8080 -m=CLUSTER (15 procesos)
(por sistema operativo)
Nombre de imagen PID Nombre de sesión Núm. de ses Uso de memor
========================= ======== ================ =========== ============
node.exe 14188 Console 4 44.152 KB
node.exe 1648 Console 4 33.104 KB
node.exe 11852 Console 4 60.756 KB
node.exe 4384 Console 4 57.956 KB
node.exe 15408 Console 4 59.204 KB
node.exe 9360 Console 4 60.364 KB
node.exe 18352 Console 4 60.044 KB
node.exe 14088 Console 4 57.992 KB
node.exe 12792 Console 4 60.236 KB
node.exe 15672 Console 4 60.236 KB
node.exe 3564 Console 4 60.116 KB
node.exe 12628 Console 4 58.912 KB
node.exe 9036 Console 4 57.948 KB
node.exe 9096 Console 4 60.432 KB
node.exe 7336 Console 4 60.284 KB

b) Ejecutar el servidor (con los parametros adecuados) utilizando Forever, verificando su correcta operacion. Listar los procesos por Forever y por sistema operativo

---- FOREVER (proceso forever)
[0]
uid : 5eoI
command : "C:\Program Files\nodejs\node.exe"
script : C:\Users\Usuario\Desktop\Back-End\13voDesafio\server\index.js
forever : 17172  
pid : 9228 (el que utilizo para matar el procesos forever)
logfile : C:\Users\Usuario\.forever\5eoI.log
uptime : 0:0:1:38.409000000000006

(procesos por el cluster)
(por sistema operativo)
Nombre de imagen PID Nombre de sesión Núm. de ses Uso de memor
========================= ======== ================ =========== ============
node.exe 17172 Console 4 33.204 KB
node.exe 9228 Console 4 44.420 KB
node.exe 6500 Console 4 43.344 KB
node.exe 5440 Console 4 43.316 KB
node.exe 15508 Console 4 43.856 KB
node.exe 1660 Console 4 43.344 KB
node.exe 3816 Console 4 43.288 KB
node.exe 15608 Console 4 43.420 KB
node.exe 6452 Console 4 43.908 KB
node.exe 11508 Console 4 44.048 KB
node.exe 1016 Console 4 44.084 KB
node.exe 17912 Console 4 43.560 KB
node.exe 18292 Console 4 44.060 KB
node.exe 16540 Console 4 44.184 KB

c) Ejecutar el servidor (con los parametros adecuados: modo FORK) utilizando PM2 en sus modos FORK y CLUSTER. Listar los procesos por PM2 y por sistema operativo

---- FORK
┌─────┬──────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id │ name │ namespace │ version │ mode │ pid │ uptime │ ↺ │ status │ cpu │ mem │ user │ watching │
├─────┼──────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0 │ index │ default │ 1.0.0 │ fork │ 15064 │ 0s │ 0 │ online │ 0% │ 42.3mb │ Usuario │ disabled │
└─────┴──────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘

Nombre de imagen PID Nombre de sesión Núm. de ses Uso de memor
========================= ======== ================ =========== ============
node.exe 4748 Console 4 32.952 KB
node.exe 15064 Console 4 48.224 KB

---- CLUSTER (para usar modo cluster en PM2 usar el comando "pm2 start index.js -i max")
(con "pm2 stop <id>" para un proceso y con "pm2 kill" mato a todos los procesos)
┌─────┬──────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id │ name │ namespace │ version │ mode │ pid │ uptime │ ↺ │ status │ cpu │ mem │ user │ watching │
├─────┼──────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0 │ index │ default │ 1.0.0 │ cluster │ 16140 │ 60s │ 0 │ online │ 0% │ 48.7mb │ Usuario │ disabled │
│ 1 │ index │ default │ 1.0.0 │ cluster │ 9044 │ 60s │ 0 │ online │ 0% │ 47.3mb │ Usuario │ disabled │
│ 2 │ index │ default │ 1.0.0 │ cluster │ 2408 │ 60s │ 0 │ online │ 0% │ 48.3mb │ Usuario │ disabled │
│ 3 │ index │ default │ 1.0.0 │ cluster │ 16260 │ 59s │ 0 │ online │ 0% │ 48.6mb │ Usuario │ disabled │
│ 4 │ index │ default │ 1.0.0 │ cluster │ 3320 │ 59s │ 0 │ online │ 0% │ 48.3mb │ Usuario │ disabled │
│ 5 │ index │ default │ 1.0.0 │ cluster │ 3680 │ 59s │ 0 │ online │ 0% │ 48.5mb │ Usuario │ disabled │
│ 6 │ index │ default │ 1.0.0 │ cluster │ 11352 │ 59s │ 0 │ online │ 0% │ 48.5mb │ Usuario │ disabled │
│ 7 │ index │ default │ 1.0.0 │ cluster │ 17840 │ 59s │ 0 │ online │ 0% │ 48.5mb │ Usuario │ disabled │
│ 8 │ index │ default │ 1.0.0 │ cluster │ 6376 │ 59s │ 0 │ online │ 0% │ 47.8mb │ Usuario │ disabled │
│ 9 │ index │ default │ 1.0.0 │ cluster │ 6456 │ 59s │ 0 │ online │ 0% │ 48.2mb │ Usuario │ disabled │
│ 10 │ index │ default │ 1.0.0 │ cluster │ 15156 │ 58s │ 0 │ online │ 0% │ 48.3mb │ Usuario │ disabled │
│ 11 │ index │ default │ 1.0.0 │ cluster │ 12252 │ 23s │ 1 │ online │ 0% │ 48.1mb │ Usuario │ disabled │
└─────┴──────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘

(por sistema operativo)
Nombre de imagen PID Nombre de sesión Núm. de ses Uso de memor
========================= ======== ================ =========== ============
node.exe 4748 Console 4 36.676 KB
node.exe 16140 Console 4 48.932 KB
node.exe 9044 Console 4 48.788 KB
node.exe 2408 Console 4 48.508 KB
node.exe 16260 Console 4 49.256 KB
node.exe 3320 Console 4 48.480 KB
node.exe 3680 Console 4 48.828 KB
node.exe 11352 Console 4 49.548 KB
node.exe 17840 Console 4 48.836 KB
node.exe 6376 Console 4 47.936 KB
node.exe 6456 Console 4 48.488 KB
node.exe 15156 Console 4 49.120 KB
node.exe 12252 Console 4 49.416 KB

d) Tanto en Forever como en PM2 permitir el mofo escucha, para que la actualizacion del codigo del servidor se vea reflejado enmediatamente en todos los procesos

---- comandos
pm2 start index.js --watch
forever start index.js -w, --watch Watch for file changes

e) Hacer pruebas de finalizacion de procesos FORK y CLUSTER en los casos que corresponda

---- comandos
FOREVER --> forever stop Stop the daemon SCRIPT by Id|Uid|Pid|Index|Script
forever stopall Stop all running forever scripts
PM2 --> "pm2 stop <id>" para un proceso y con "pm2 kill" mato a todos los procesos

para listar los procesos desde la carpeta en la que este ejecutando el node

tasklist /fi "imagename eq node.exe"

---- NGINX

pm2 start index.js -p=8081 fork
pm2 start index 2-1.js -p=8082 fork
pm2 start index 2-2.js -p=8083 fork
pm2 start index 2-3.js -p=8084 fork
pm2 start index 2-4.js -p=8085 fork
