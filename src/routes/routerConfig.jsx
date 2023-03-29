import { ErrorBoundary } from 'components/ErrorBoundary';
import { Root } from './Root/root';
import { ImageCarousel } from './ImageCarousel';
import { GM } from './GM';

export const routerConfig = [
  {
    path: '/hub',
    element: <Root />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/hub/carousel',
        element: <ImageCarousel />
      },
      {
        path: '/hub/gm',
        element: <GM />
      }
    ]
  }
];

export default {};
