<template>
  <header class="menu-bar">
    <div class="menu-container">
      <nav class="menu"> 
          <ul> 
            <li><img src="./../assets/SM_logo.png" alt="Method Study Logo" class="logo" /></li>
            <li><h1 class="logo-text">Method Study</h1></li>
            <li><router-link to="/">Inicio</router-link></li>
            <li><router-link to="/about">Acerca de </router-link></li>
            <li><a href="#contacto">Contacto</a></li> 
            <div class="auth-buttons"> 
              <ul>                
                <li><button @click="handleLogin">Iniciar Sesión</button> </li>
                <li><button @click="handleRegister">Registrarse</button></li> 
              </ul>
            </div>
        </ul>
      </nav>

    </div>
  </header>
</template>
<script lang="ts">

export default {
  name: "NavBar",
  methods:{
      handleLogin() {
    // Aquí puedes redirigir al formulario de inicio de sesión
    this.$router.push("/login");
  },
  handleRegister() {
    // Aquí puedes redirigir al formulario de registro
    this.$router.push("/register");
  }
  }
};
</script>

<style scoped>
.menu-bar {
  background-color: #344E41;
  color: rgba(7, 255, 139, 0.308);
  padding: 10px 20px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
}

.menu {
  display: flex;

}

.menu-container {
  display: flex;
  height: 60px;
  justify-content: space-between;
  align-items: center;
}

.menu ul {
  list-style: none;
  margin: 0;
  padding: 10;
  display: flex;
}

.menu ul li img.logo {
margin-right: 10px; /* Ajusta el espacio entre el logo y el texto */
}

.logo{
  height: auto; /* Mantén la proporción */
  width: 50px;  /* Ajusta el tamaño según lo necesario */
  object-fit: contain; /* Evita que el logo se distorsione */
  margin-top: 10;
}

.menu ul li h1{
  margin-top: -6px;
}
.menu ul li {
  margin-left: 30px; /* Reduce el espacio entre los elementos si es necesario */
  margin-top: 0; /* Elimina cualquier desplazamiento vertical */
  height: 60px; /* Asegúrate de que tengan la misma altura que el navbar */
  display: flex;
  align-items: center;
}  
.menu ul li a {
  text-decoration: none;
  color: white;
  font-weight: bold;
  line-height: 60px; /* Ajusta la altura del texto al mismo que el navbar */
}

.menu ul li a:hover {
  color: #A3B18A;
  margin-top: 4px;
}


.auth-buttons button {
background-color: #507757;
color: white;
border: none;
padding: 6px 10px;
border-radius: 20px;
cursor: pointer;
transition: background-color 0.4s;
font-size: 0.9rem;
}

.auth-buttons{
  margin-left: 100px;
}

.auth-buttons button:hover {
  background-color: #23352c;
  margin-top: 2px;
}

</style>


