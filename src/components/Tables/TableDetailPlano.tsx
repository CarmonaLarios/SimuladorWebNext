import * as React from "react";
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import ITableDetailsPlanoProps from "./interfaces/ITableDetailPlanoProps";
import { useSimulacao } from "@/app/hooks/simulacao";

const columns = [
  {
    field: 'id',
    flex: 1,
    minWidth: 200,
    cellClassName: 'info-cell',

    renderCell: ({row} :any) => {
      return (
        <Box sx={{align:'left',mb:2, mt:2}}>
            <Typography sx={{mb:{xs:'3px', sm:'1'}, mt:2,fontSize:'.9rem', lineHeight:{xs:'1', sm:'1.5'} }}>{row.info.name}</Typography>
            <Typography sx={{fontSize:{xs:'.55rem', sm:'.63rem'}, lineHeight:{xs:'1', sm:'1.2'},pb:2}}>{row.info.observacao}</Typography>
        </Box>
      );
    }
  },
  
  {
    field: 'InfoValor',
    minWidth: 150,
    cellClassName: 'valor-cell',
  },

];

const montarLinhasDadosPlano = (planoDetalhes: ITableDetailsPlanoProps) => {
  const rows = [
    {
      info: {
        name: "Valor Parcelas",
        observacao: "",
      },
      id: 1,
      InfoValor: planoDetalhes?.plano?.PlanoValorParcelaLabel,
    },
    // {
    //   info: {
    //     name: "Grupo",
    //     observacao: "",
    //   },
    //   id: 2,
    //   InfoValor: "2078",
    // },
    {
      info: {
        name: "Participantes",
        observacao: "",
      },
      id: 3,
      InfoValor: "999",
    },
    {
      info: {
        name: "Taxa de Administração",
        observacao: "Custeio da formação, organização e administração do grupo de consórcio",
      },
      id: 4,
      InfoValor: `${planoDetalhes?.detalhes?.TaxaAdmTotal} %`,
    },
    {
      info: {
        name: "Taxa Fundo de Reserva",
        observacao: "Garantia em casos de inadimplência ou desistencia de participantes do grupo",
      },
      id: 5,
      InfoValor: `${planoDetalhes?.detalhes?.TaxaFundoReserva} %`,
    },
    {
      info: {
        name: "Plano",
        observacao: "",
      },
      id: 6,
      InfoValor: `${planoDetalhes?.detalhes?.Descricao}`,
    },
    {
      info: {
        name: "Reajuste Anual",
        observacao: "",
      },
      id: 7,
      InfoValor: "IPCA",
    },
    {
      info: {
        name: "Seguro",
        observacao: "Cobrado somente após a contemplação sobre o saldo devedor.",
      },
      id: 8,
      InfoValor: `${planoDetalhes?.detalhes?.TaxaSeguroQuebra} %`,
    },
  ];
  return rows;
}




export default function TableDetailPlano() {
  const {planoEscolhido, planoDetalhes, produtoSelecionado} = useSimulacao();
  const data : ITableDetailsPlanoProps = { plano: planoEscolhido, detalhes: planoDetalhes}

  return (
    <Box sx={{width: "100%", height:"100%"}} >
      <DataGrid
        rows={montarLinhasDadosPlano(data)}
        columns={columns}
        disableRowSelectionOnClick
        hideFooterPagination
        hideFooter
        rowHeight={70}

        sx={{border:'none',
        width:'100%',
        height:{xs:'560px',sm:'560px', md:'100%'},
        flex:1,
        '& .MuiDataGrid-detailPanels': {
          position: 'relative'
        },
        "& .MuiDataGrid-virtualScrollerContent":{
          width:'100%!important'
      },
        "& .MuiDataGrid-columnHeaders":{
            display: "none"
        },
        "& .MuiDataGrid-cell":{
            whiteSpace:'normal !important',
            padding:'10px 0',
        },
        "& .info-cell": {
          textAlign:'left',
          '@media only screen and (max-width: 414px)': {
            minWidth:'187px!important'
          },
          '@media only screen and (max-width: 393px)': {
            minWidth:'160px!important'
          },
          '@media only screen and (max-width: 375px)': {
            minWidth:'150px!important'
          },
          '@media only screen and (max-width: 360px)': {
            minWidth:'168px!important'
          },
          '@media only screen and (max-width: 320px)': {
            minWidth:'120px!important'
          },
        },
        "& .valor-cell": {
          justifyContent: 'right',
          fontWeight: '600',
          textAlign:'right',
          '@media only screen and (max-width: 1280px)': {
            minWidth:'108px!important'
          },
          '@media only screen and (max-width: 430px)': {
            minWidth:'128px!important'
          },
          '@media only screen and (max-width: 360px)': {
            minWidth:'96px!important'
          },
          '@media only screen and (max-width: 320px)': {
            minWidth:'98px!important'
          },
        },
        "& .MuiDataGrid-row:last-child .MuiDataGrid-cell": {
            borderColor:'rgba(224, 224, 224, 0)',
        },
        "& .MuiDataGrid-row": {
          '@media only screen and (max-width: 430px)': {
            minHeight:'80px!important'
          },
          '@media only screen and (max-width: 320px)': {
            minHeight:'86px!important'
          },
          },
        
          
        }}
      />

    </Box>
  );
}
