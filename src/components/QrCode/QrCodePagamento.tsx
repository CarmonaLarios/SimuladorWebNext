import Image from 'next/image';


interface QrCodePagamentoProps {
    value: string;
}

const QrCodePagamento: React.FC<QrCodePagamentoProps> = ({ value }) => {

  const encodePixURL = (url: string) => {
    return url.replace(/ /g, '%20');
  };

    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", maxWidth: 256, margin: "0 auto" }}>
        <Image alt="Qr-Code" src={encodePixURL(value)} height={256} width={256} />
      </div>
    );
};

export default QrCodePagamento;
