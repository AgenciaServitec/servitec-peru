export const FooterLayout = () => {
  return (
    <>
      <style>
        {`
          .footer{
            display: flex;
            flex-direction: column;
            background-color: #000000;
            color: white;
            text-align: center;
            padding: 20px 0;
            font-family: Arial, Helvetica, sans-serif;
            gap: 15px;
            padding: 35px 0;
          }
          
          .footer__content {
          display: flex;
          justify-content: center;
          font-size: 0.95rem;
          line-height: 1.6;
          gap: 10px;
          }
          
          .footer__content p{
          margin: 5px, 0;
          }  
      `}
      </style>

      <footer className="footer">
        <div className="footer__content">
          <p><strong>ServiTec-Perú</strong> © 2018.</p>
          <p>📞 941 801 827 / 972 252 744</p>
          <p>✉️ contactos@servitec-peru.com</p>
        </div>
        <p>Vargas 179 Piso 1 - Chorrillos - Lima</p>
        <p>Términos y condiciones</p>
      </footer>
    </>



  );
};
