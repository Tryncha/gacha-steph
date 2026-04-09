import { Html } from '@react-three/drei';

const Loader = () => {
  return (
    <Html center>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          color: '#ff6eb4',
          fontFamily: 'monospace'
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            border: '3px solid rgba(255,110,180,0.2)',
            borderTop: '3px solid #ff6eb4',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}
        />
        <p style={{ fontSize: '11px', letterSpacing: '0.3em', margin: 0, opacity: 0.7 }}>CARGANDO...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </Html>
  );
};

export default Loader;
