import BarChartIcon from '@assets/icons/bar_chart.png';
import BoxesIcon from '@assets/icons/boxes.png';
import MoneyIcon from '@assets/icons/money.png';
import TractorIcon from '@assets/icons/tractor.png';

export const MENU_ITEMS = [
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
];
