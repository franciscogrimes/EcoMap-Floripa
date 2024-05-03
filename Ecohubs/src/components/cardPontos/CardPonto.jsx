function CardPonto({ nomeLocal, descricao, residuos }) {
  return (
    <div>
      <div>
        <h2>{nomeLocal}</h2>
      </div>
      <div>
        <p>Descrição:</p>
        <p>{descricao}</p>
      </div>
      <div>
        <p>Tipo de resíduo: {residuos}</p>
      </div>
    </div>
  );
}

export default CardPonto;
