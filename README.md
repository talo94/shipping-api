# Shipping App API

Esta es una APP para realizar un seguimiento preciso de envíos de documentos. Permite consultar su estado, detalle y localización de cada paquete.

## Stack
 Express- Mongoose - Socket.io 
 Se requiere Node en versión 18.16.0
 
## Pruebas:
APP: https://shipping-app-p.vercel.app/
API: https://shipping-api-talo.herokuapp.com

## Características

- Consulta de paquetes.
- Notificación del estado de los paquetes.
- Registro de eventos de seguimiento.
- Geolocalización de paquetes.
- Comunicación en tiempo real utilizando WebSockets.

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/talo94/shipping-api.git

   ```

2. Instala las dependencias:
  ```bash
   npm install
```
3. Configuración:
  Crea un archivo .env en la raíz del proyecto y configura las variables de entorno necesarias:
    -DB_USER=
    -DB_PASSWORD=
    -DB_NAME=
    -PORT=
   

4.Iniciar el servidor:
```bash
  node server
```   
   
## Uso
 Abre en el navegador la siguiente url: http://localhost:3000
   Consultar los paquetes
   - URL: /api/package
   - Método: GET
   - Respuesta exitosa: Código de estado: 200 (OK)
   - Cuerpo de respuesta: 
      Objeto JSON con los detalles del paquete consultado:
      ```
       {
         "data": [
        {
            "_id": "6472b2d962a3e7c261ed7d5c",
            "guideNumber": "123213",
            "origin": "cali",
            "destination": "medellin",
            "weight": 1,
            "date": "2023-05-28T01:48:09.341Z",
            "statusList": [
                {
                    "location": {
                        "lat": 19.429995,
                        "lng": -99.215664
                    },
                    "type": "En sucursal",
                    "date": "2023-05-28T01:48:09.341Z",
                    "_id": "6472b2d962a3e7c261ed7d5d"
                }
            ]
          }
        ]
      }

  Crear el estado de un paquete
   - URL: /api/package
   - Método: POST
   - Cuerpo de la solicitud: Nuevo estado del paquete:
  ```
   {
    "guideNumber": "224321",
    "origin": "Wall Aparments",
    "destination": "Altos de mayorca",
    "weight": 1,
    "statusList": {
        "lat": 6.190815, 
        "lng": -75.563298
    }
}
  ```
   - Respuesta exitosa: Código de estado: 201 (OK)
   - Cuerpo de respuesta: Objeto JSON con los detalles actualizados del paquete.
   --  Si no se envia la lat y lng se pondrá una por defecto
      
   Actualizar el estado de un paquete
   - URL: /api/package/${guideNumber}
   - Método: PATCH
   - Parámetros de ruta: guideNumber (string): GuideNumber del paquete a actualizar.
   - Cuerpo de la solicitud: Nuevo estado del paquete:
  ```
   {
    "lat": 6.162399, 
    "lng": -75.603183,
    "type": "En reparto"
    }
  ```
   - Respuesta exitosa: Código de estado: 200 (OK)
   - Cuerpo de respuesta: Objeto JSON con los detalles actualizados del paquete
   -- Al actualizar el package se manda un evento socket al front.

## WebSocket

La API también utiliza WebSockets para enviar actualizaciones en tiempo real sobre los paquetes. Al recibir una actualización del paquete que está seleccionado, se actualizará el detalle junto con el mapa y se mostrará una Notificación para informar este cambio.

## Contribuciones

Las contribuciones son bienvenidas. Si encuentras algún error, tienes ideas para nuevas características o mejoras, por favor, abre un issue o envía un pull request.


