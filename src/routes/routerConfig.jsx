import { ErrorBoundary } from 'components/ErrorBoundary';
import { Root } from './Root/root';

export const routerConfig = [
  {
    path: '/hub',
    element: <Root />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/carousel',
    element: <Root />,
    errorElement: <ErrorBoundary />
  }
];

export default {};
