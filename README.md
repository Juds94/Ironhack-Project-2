# Ironhack-Project-2


| Method | URL    | Description                | Protected |
| :-------- | :------- | :------------------------- | :------- |
| GET | `/register`| Registro en la web (render)| No|
GET|    `/register/:role`| Registro como Dueño de perro o como cuidador(render) |No
POST| `/register/:role`|Registro como Dueño de perro o como cuidador (handler)| Yes
GET| `/login`| Inicio Sesion(render)| No
POST| `/login`| Inicio Sesion(handler)| Yes
GET| `/search`| Buscar razas de perro| Yes
GET|`/profile`| Acceder a tu perfil| Yes
GET|`/profile/:id/edit`| Editar tu perfil| Yes
POST|`/profile/:id/edit`| Editar  tu perfil| Yes
GET|`/dog/create`| Crear perfil a tu perro| Yes
POST| `/dog/create`| Crear perfil a tu perro| Yes
GET|`/profile/:id/edit/dog/:dog_id`| Editar el perfil de tu perro| Yes
POST| `/profile/:id/edit/dog/:dog_id`| Editar el perfil de tu perro| Yes
ET|`/logout`| Cerrar sesión| Yes
POST|`/profile/:id/delete`| Eliminar un perfil| Yes
GET|`/care`| Ver la lista de todos los cuidadores| Yes
GET|`/profile/contact/:id`| Ver los detalles de un cuidador| Yes
GET| `/create/:careId`| Crear una reseña a un cuidador| Yes
POST|`/create/:careId`| Crear una reseña a un cuidador| Yes
GET| `/:careId`| Buscar las reseñas de un cuidador en particular| Yes  

