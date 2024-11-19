<template>
  <div class="login-container">
    <form class="login-form" @submit.prevent="handleSubmit">
      <h2>Iniciar Sesión</h2>
      <div class="form-group">
        <label for="email">Correo Electrónico</label>
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="Escribe tu correo"
        />
      </div>
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Escribe tu contraseña"
        />
      </div>
      <button type="submit">Iniciar seción</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    handleSubmit() {
      alert(`Iniciando sesión con: ${this.email}`);;
    },
  },
};
</script>

<style scoped>
/* Estilo básico del cuerpo */
body {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center; /* Centrar horizontalmente */
  align-items: center;    /* Centrar verticalmente */
  height: 100vh;          /* Altura de la pantalla completa */
  background-color: #f4f4f4; /* Color de fondo */
  font-family: Arial, sans-serif;
}

/* Contenedor principal */
.login-container {
  
  background-color: #fff; /* Fondo blanco */
  padding: 30px;          /* Espaciado interno */
  border: 1px solid #ccc; /* Borde gris claro */
  border-radius: 10px;    /* Bordes redondeados */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra sutil */
  width: 50vh;           /* Ancho fijo */
}

/* Encabezado del formulario */
.login-form h2 {
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

/* Estilo de los grupos de formulario */
.form-group {
  margin-bottom: 15px;
}

/* Etiquetas */
.form-group label {
  display: block;         /* Asegura que esté encima del input */
  margin-bottom: 5px;
  font-size: 14px;
  color: #555;
}

/* Campos de entrada */
.form-group input {
  width: 100%;            /* Ocupa todo el ancho del contenedor */
  padding: 10px;          /* Espaciado interno */
  font-size: 14px;        /* Tamaño de fuente */
  border: 1px solid #ccc; /* Borde gris claro */
  border-radius: 5px;     /* Bordes redondeados */
  box-sizing: border-box; /* Incluye padding y border en el ancho */
}

/* Botón de envío */
button {
  width: 100%;            /* Ocupa todo el ancho del contenedor */
  padding: 10px;          /* Espaciado interno */
  background-color: #007bff; /* Azul */
  color: #fff;            /* Texto blanco */
  border: none;           /* Sin borde */
  border-radius: 5px;     /* Bordes redondeados */
  font-size: 16px;        /* Tamaño de fuente */
  cursor: pointer;        /* Cambia el cursor al pasar sobre el botón */
  transition: background-color 0.3s; /* Transición suave al hover */
}

button:hover {
  background-color: #0056b3; /* Azul más oscuro al pasar el mouse */
}
</style>
