import BarChartIcon from '@assets/icons/bar_chart.png';
import BoxesIcon from '@assets/icons/boxes.png';
import MoneyIcon from '@assets/icons/money.png';
import TractorIcon from '@assets/icons/tractor.png';
import WheatSackIcon from '@assets/icons/wheat_sack.png';
import FieldIcon from '@assets/icons/field.png';

export const MENU_ITEMS = [
  {
    label: 'Produtos',
    url: '/produtos',
    description: 'Administre os produtos: adicione, atualize, consulte ou remova conforme necessário.',
    icon: WheatSackIcon,
  },
  {
    label: 'Fazendas',
    url: '/fazendas',
    description: 'Gerencie as fazendas cadastradas com facilidade: crie, edite ou exclua registros.',
    icon: FieldIcon,
  },
  {
    label: 'Estoque',
    url: '/estoque',
    description: 'Gestão eficiente do estoque com foco na organização e vendas dos produtos.',
    icon: BoxesIcon,
  },
  {
    label: 'Metas',
    url: '/metas',
    description: 'Monitoramento contínuo das metas estabelecidas, avaliando desempenho e resultados.',
    icon: BarChartIcon,
  },
  {
    label: 'Vendas',
    url: '/vendas',
    description: 'Análise completa de vendas, focando nos produtos mais rentáveis e lucrativos.',
    icon: MoneyIcon,
  },
  {
    label: 'Produção',
    url: '/producao',
    description: 'Acompanhamento das culturas: aguardando plantio, em produção ou já colhidas.',
    icon: TractorIcon,
  },
];
