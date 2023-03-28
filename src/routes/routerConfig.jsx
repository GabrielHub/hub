import { ErrorBoundary } from 'components/ErrorBoundary';
import { Root } from './Root/root';
import { ImageCarousel } from './ImageCarousel';

export const routerConfig = [
  {
    path: '/hub',
    element: <Root />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/hub/carousel',
        element: <ImageCarousel />
      }
    ]
  }
];

export default {};
