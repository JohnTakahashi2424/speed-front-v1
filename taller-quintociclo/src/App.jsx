import './App.css';

function App() {
  return (
    <>
      <main className="main__container">
        <div className="login__container">
          
          <header>
            <h2>Bienvenido</h2>
            <p>Ingresa con tus credenciales para continuar</p>
          </header>

          <div className="login__form">
            
            <div className="input__container">
              <label htmlFor="username">Usuario</label>
              <input type="text" id="username" name="username" required />
            </div>
            
            <div className="input__container">
              <label htmlFor="password">Contraseña</label>
              <input type="password" id="password" name="password" required />
            </div>
            
            <div className="link__container">
              <a href="#">¿Olvidaste tu contraseña?</a>
            </div>
            
            <div className="btn__container">
              <button type="submit">Iniciar Sesión</button>
            </div> 
            
            <div className="register-link__container">
              <span>¿No tienes cuenta? </span>
              <a href="/register">Regístrate</a>
            </div>

          </div>

        </div>      
      </main>
    </>         
  );  
}   

export default App;