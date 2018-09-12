# TFG Sistema de telemedicina
Repositorio para sistema de telemedicina - Trabajo de Fin de Grado en Ingeniería Informática 2018 UA

![Alt text](logo.png?raw=true "Logo")

### Descripción del sistema

OneHealth es una plataformma e-Health que fomenta la comunicación médico-paciente de manera segura. Tiene el objetivo de facilitar toda la gestión referente a un centro de salud, aportando un sistema en entornos web, el cual puede ser accesible desde diferentes dispositivos.

Esta desarrollado con diversas tecnologías actuales como React, Nodejs, WebRTC y Socket.io. Además, esta implementado varios métodos o procolos seguros como HTTPS, STRP, DTLS.

### Funcionalidades principales
- Registro de usuarios
- Sistema de identificación de usuarios
- Creación de citas
- Ver historias de citas
- Crear consultas
- Ver historial clínico
- Ver consultas de pacientes
- Mensajes entre paciente-médico
- Videollamada médico-paciente
- Grabación de videollamada (solo parte del paciente)
- Chat de texto en videollamada
- Ver información de una videollamada realizada


### Guía de instalación

Para la instalación del sistema, se tiene que clonar el repositorio:
```
git clone https://github.com/bap17/TFG.git
```
Instalamos todas las dependencias del proyecto tanto para el servidor:
```
cd TFG/server
```
```
npm install
```
Instalamos todas las dependencias del proyecto tanto para el cliente:
```
cd TFG/cliente
```
```
npm install
```
### Guía de Despliegue
###### Servidor

Para poner en marcha la plataforma iremos a la carpeta del servidor y ejecutaremos los siguientes comandos:
```
cd TFG/server
```
```
nodemon api.js
```
o 
```
node api.js
```

###### Cliente
Para poner en marcha el cliente ejecutaremos los siguientes comandos:

```
cd TFG/cliente
```

```
/node_modules/.bin/webpack-dev-server --port 8443
```




