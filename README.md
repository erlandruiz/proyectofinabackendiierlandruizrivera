
# INSTALAR 
npm i bcrypt cookie-parser dotenv express express-handlebars express-session jsonwebtoken mongoose mongoose-paginate-v2 passport nodemon passport-google-oauth20 passport-jwt passport-local socket.io uuid nodemailer twilio cors

# INICIAR

>"Para sembrar la data de products.json ejecutar  🔥"
npm run seed
>"Luego 🔥"
npm run dev

# USER
## Creación de usuarios
>"Se crearon los siguientes usuarios 🔥"
[En Postman colocar POST y digitar ](http://localhost:8080/api/sessions/register)
http://localhost:8080/api/sessions/register

  ~~~
{
    "first_name":"Maria",
    "last_name":"Rivera",
    "password":"123",
    "email":"maria@test.com",
    "age":73,
    "role": "admin"
}
~~~

  ~~~
{
    "first_name":"Karen",
    "last_name":"Castro",
    "password":"123",
    "email":"karen@test.com",
    "age":38
}
~~~
  ~~~
{
    "first_name":"Pedro",
    "last_name":"Ruiz",
    "password":"123",
    "email":"pedro@test.com",
    "age":72
}
~~~

## Login  de usuarios
>"Para hacer lo login de los  usuarios 🔥"
[En Postman colocar POST y digitar ](http://localhost:8080/api/sessions/login)
http://localhost:8080/api/sessions/login


  ~~~
{
    "email":"maria@test.com",
    "password":"123"
}
~~~

  ~~~
{
    "password":"123",
    "email":"karen@test.com"
}
~~~
  ~~~
{
    "password":"123",
    "email":"pedro@test.com"
}
~~~
  ~~~
{
    "password":"123",
    "email":"erlandruizdevelopver@gmail.com"
}
~~~



# PRODUCTS
## Agregar productos primero se hace login como administrador ("email":"maria@test.com")
>"Se crearon los siguientes productos 🔥"
[En Postman colocar POST y digitar ](http://localhost:8080/api/products)
http://localhost:8080/api/products

  ~~~
 {
        "title": "Guantes Amarillos",
        "description": "Guantes amarillos de cuero  ",
        "code": "abc001",
        "price": 300,
        "stock": 35,
        "category": "guantes",
        "thumbnail": ["https://res.cloudinary.com/erlandruiz/image/upload/v1690362937/wax5qmwgjl1wtv2rzohp.jpg"]
    }
~~~

  ~~~
 {
        "title": "Casco Blanco",
        "description": "Casco 3M color blanco  ",
        "code": "abc002",
        "price": 100,
        "stock": 15,
        "category": "casco",
        "thumbnail": ["https://res.cloudinary.com/erlandruiz/image/upload/v1690362415/ydxpnvcq0jguzvgg6b5e.jpg"]
    }
~~~
  ~~~
 {
        "title": "Lentes Transparentes",
        "description": "Lentes de seguridad color sport",
        "code": "abc003",
        "price": 80,
        "stock": 27,
        "category": "lentes",
        "thumbnail": ["https://res.cloudinary.com/erlandruiz/image/upload/v1690362557/ma2onvjuy0sfpjwmowhm.jpg"]
    }
~~~
  ~~~
 {
        "title": "Guantes de Blancos",
        "description": "Guantes de hilo blancos",
        "code": "abc004",
        "price": 100,
        "stock": 25,
        "category": "guantes",
        "thumbnail": ["https://res.cloudinary.com/erlandruiz/image/upload/v1690362784/woobxvzsx3cellnniykm.jpg"]
    }
~~~

## Trabajar con los productos
>"Obtener todos los productos primero se hace login como administrador ("email":"maria@test.com") 🔥"
[En Postman colocar GET y digitar ](http://localhost:8080/api/products/)
http://localhost:8080/api/products/


>"Obtener productos por id  solo usuarios como ejemplo "email":"karen@test.com" 🔥"
[En Postman colocar GET y digitar como ejemplo ](http://localhost:8080/api/products/673f804692bdd48efe270638)
http://localhost:8080/api/products/673f804692bdd48efe270638

>"Eliminar un producto primero se hace login como administrador ("email":"maria@test.com") 🔥"
[En Postman colocar DELETE y digitar como ejemplo ](http://localhost:8080/api/products/673fa3e9982a0face155baad)
http://localhost:8080/api/products/673fa3e9982a0face155baad


>"Actualizar un producto primero se hace login como administrador ("email":"maria@test.com") 🔥"
[En Postman colocar PUT y digitar como ejemplo ](localhost:8080/api/products/673fa3e9982a0face155baad)
localhost:8080/api/products/673fa3e9982a0face155baad
  ~~~
  {

            "title": "Casco Safari nuevo" ,
            "description": "Casco Safari color amarillo  ",
            "code": "abc004",
            "price": 800,
            "status": true,
            "stock": 15,
            "category": "casco",
            "thumbnail": [],
            "__v": 0
        }
~~~



# CARTS
## Trabajar con los productos
>"Obtener todos los carts primero se hace login como administrador ("email":"maria@test.com") 🔥"
[En Postman colocar GET y digitar ](http://localhost:8080/api/carts/)
http://localhost:8080/api/carts/


>"Obtener cart por id  solo usuarios como ejemplo "email":"karen@test.com" 🔥"
[En Postman colocar GET y digitar como ejemplo ](localhost:8080/api/carts/673f7d6b92bdd48efe270609)
localhost:8080/api/carts/673f7d6b92bdd48efe270609

>"Agregar un producto a un carro  solo usuarios como ejemplo "email":"karen@test.com" 🔥"
[En Postman colocar POST y digitar como ejemplo ](http://localhost:8080/api/carts/673f7d6892bdd48efe270604/product/673fa3e0982a0face155baa1)
http://localhost:8080/api/carts/673f7d6892bdd48efe270604/product/673fa3e0982a0face155baa1

>"Eliminar un producto de un  Carrito solo usuarios como ejemplo "email":"karen@test.com" 🔥"
[En Postman colocar DELETE y digitar como ejemplo ](http://localhost:8080/api/carts/673f7d6892bdd48efe270604/product/673fa3e9982a0face155baad)
http://localhost:8080/api/carts/673f7d6892bdd48efe270604/product/673fa3e9982a0face155baad

>"Actualizar la cantidad de  un producto un  Carrito solo usuarios como ejemplo "email":"karen@test.com" 🔥"
[En Postman colocar DELETE y digitar como ejemplo ](http://localhost:8080/api/carts/673f7d6892bdd48efe270604/product/673fa3e0982a0face155baa1)
http://localhost:8080/api/carts/673f7d6892bdd48efe270604/product/673fa3e0982a0face155baa1
~~~
{
    "quantity": 200
    }
      
~~~

>"Para hacer la compra (PURCHASE)  solo usuarios como ejemplo "email":"karen@test.com" 🔥"
[En Postman colocar post y digitar como ejemplo ](http://localhost:8080/api/carts/675f3c9b24d075c988b83707/purchase)
http://localhost:8080/api/carts/675f3c9b24d075c988b83707/purchase

>"Para hacer la compra (PURCHASE) con envio de ticket al correo  usar el usuario con email  "erlandruizdeveloper@gmail.com" 🔥"
[En Postman colocar post y digitar como ejemplo ](http://localhost:8080/api/carts/6760abd1aa628a481f7f94a3/purchase)
http://localhost:8080/api/carts/6760abd1aa628a481f7f94a3/purchase


# EMAIL
>"Para hacer envio de un email  escribir el body similar al ejemplo" 🔥"
[En Postman colocar post  y digitar  ](http://localhost:8080/api/email)
http://localhost:8080/api/email
~~~
{
    "name": "Karen",
    "subject": "Solicitud de productos",
    "to": "erlandruizdeveloper@gmail.com"
}
~~~

# EMAIL 
>"Para hacer envio de un SMS  escribir el body similar al ejemplo" (Ojo solo lo probe una vez por que cobran) 🔥"
[En Postman colocar get  y digitar  ](http://localhost:8080/api/email)
http://localhost:8080/api/email
