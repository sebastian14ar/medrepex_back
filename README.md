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



Autor
-----
Miguel Angel Valdés.
