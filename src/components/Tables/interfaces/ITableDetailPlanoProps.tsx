import Plano from "@/app/models/Planos";
import PlanoDetalhes from "@/app/models/PlanosDetalhes";

interface ITableDetailsPlanoProps {
    plano?: Plano | null;
    detalhes?: PlanoDetalhes| null;
}

export default ITableDetailsPlanoProps;
