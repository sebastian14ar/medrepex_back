MedRep_Back
===========

Descripción
-----------
Proyecto Node.js v12.13.1 desarrollado para MedRep Express.
API que se encarga de enviar los correos de las secciones CONTACT US, REQUEST SAMPLES, REQUEST PRODUCT INFO y SHOPPING CART a partir del llenado de los formularios del FrontEnd.

NOTA:
Por cuestiones de hosting se decidio utilizar este proyecto para agregar las APIs de otros proyecto, que de igual manera envian correos de contacto. Las APIs de los proyectos soportadas aquí por el momento son:
indecmexico.com
moreval.net

Ejecución en productivo
-----------------------
Es necesario conectarse al servidor "mandalore", donde Miguel de STX (contacto: 33 3809 7643) es el proveedor.

Para realizar la conexión al servidor se pueden seguir los pasos del apartado "Conexión al servidor" de este texto.

En el servidor se debe acceder a la ruta del proyecto 'home/desarrollo/repositorios/medrepexpress_back', donde se encuentran todos los archivos del mismo. Se puede hacer ingresando el comando:
	cd ../home/desarrollo/repositorios/medrepexpress_back

Si hay algún cambio en el proyecto este se debe actualizar mediante git utilizando el comando:
	git pull origin master
Considerar si es necesario ejecutar el comando 'npm install' para instalar depencias nuevas que se hayan agregado al package.json

El proyecto se ejecuta utilizando pm2, para ver el proceso corriendo se puede revisar la lista de los procesos de pm2, con el comando:
	pm2 list
y buscar el proceso que se llama "MedRep-Back".

Para detener algún proceso pm2 en ejecución se debe ingresar el comando 'pm2 stop 'nombre-del-proceso'', en este caso para detener el proyecto el comando sería:
	pm2 stop MedRep-Back

Para eliminar algún proceso pm2, primero se debe detener el mismo, y después se debe ingresar el comando 'pm2 delete 'nombre-del-proceso'', en este caso para eliminar el proceso del proyecto el comando sería:
	pm2 delete MedRep-Back

Para arrancar nuevamente el proceso del proyecto se debe utilizar el comando:
	pm2 start npm --name MedRep-Back -- start


Conexión al servidor
--------------------

Para acceder a él es necesario generar llaves (publica y privada) tipo Ed25519. Desde Windows estas llaves se pueden generar desde PuTTY Key Generator, para generarlas, seguir los pasos del apartado "Generar llaves tipo Ed25519 desde PuTTYgen" de este texto.

Si ya se cuenta con las llaves y sus respectivos permisos, desde Windows se puede obtener una conexión remota al servidor ingresando al programa PuTTY y siguiendo los siguientes pasos:
1.- Ingresar la IP del servidor (167.114.96.25) en la categoría "Session" en el campo "Host Name (or IP address), el puerto es el 22 (normalmente seleccionado por default).
2.- En la categoría "Connection", buscar y seleccionar el apartado "SSH", seguido del apartado "Auth".
3.- Una vez dentro de Auth dar click en el botón "Browse" y se debe seleccionar la llave privada generada anteriormente junto con la llave pública, esta llave es un archivo de extensión ppk.
4.- Regresar a la categoría "Session", y aquí recomiendo guardar las configuraciones, ingresando un nombre de la Sesión en el campo "Saved Sessions" y dando click en el botón Save, esto para evitar hacer los pasos anteriores cada que se requiera la conexión al servidor.
5.- Abrir la conexión dando click al botón "Open".
6.- Si no hubo ningún problema con abrir la conexión debio aparecer una consola con el mensaje "login as:" aquí se debe teclear el usuario de la conexión, para este servidor el usuario es: root.
7.- Si al generar la llave privada colocaste una contraseña, aquí se te solicitará para finalizar la conexión.


Generar llaves tipo Ed25519 desde PuTTYgen
------------------------------------------

1.- Abrir PuTTY Key Generator.
2.- Seleccionar Ed25519 en la casilla "Parameters".
3.- Dar click al botón "Generate".
4.- Después de seguir las instrucciones aparecera un recuadro con texto aleatorio, 4 campos mas y dos botones: "Save public key" y "Save private key".
5.- Generar la llave pública dando click en el botón "Save public key" y enviarsela a Miguel de STX para que de acceso a esa llave.
6.- Generar la llave privada dando click en el botón "Save private key". Se puede agregar una contraseña de acceso para esta llave llenando los dos campos en blanco que debieron aparecer en el paso 4.
7.- Para tener acceso al servidor, Miguel de STX debe autorizar el permiso de la llave pública y se debe ingresar seleccionando la llave privada al iniciar la conexión.


Autor
-----
Miguel Angel Valdés.
