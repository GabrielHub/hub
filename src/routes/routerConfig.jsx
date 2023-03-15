import { ErrorBoundary } from 'components/ErrorBoundary';
import { Root } from './root';

export const routerConfig = [
  {
    path: '/hub',
    element: <Root />,
    errorElement: <ErrorBoundary />
  }
];

export default {};
