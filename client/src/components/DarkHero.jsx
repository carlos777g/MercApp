const DarkHero = () => {
  return (
    <div
      style={{
        backgroundColor: '#111',
        color: '#fff',
        minHeight: '100vh',
        width: '100vw',             // 👈 esto lo hace ocupar TODO el ancho de la ventana
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem',
        margin: '0',                // 👈 elimina márgenes si los hay
        boxSizing: 'border-box',    // 👈 asegura que el padding no rompa el ancho
      }}
    >
      <h1 className="display-4">UPIITA Store</h1>
      <p className="lead">Tienda de artículos exclusivos de artistas independientes</p>
      <div className="d-flex gap-3 justify-content-center mt-3">
        <a href="/login" className="btn btn-outline-info btn-lg fw-bold">
          Iniciar sesión
        </a>
        <a href="/registro" className="btn btn-outline-light btn-lg">
          Registrarse
        </a>
      </div>
    </div>
  );
};

export default DarkHero;
