interface ICardResultadoProps {
    planoID: number;
    titulo : string;
    parcela : string;
    meses : string;
    credito : string;
    prazo: string;
    onClick: (planoID: number) => void;
}

export default ICardResultadoProps;
