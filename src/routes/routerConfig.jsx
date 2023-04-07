import { ErrorBoundary } from 'components/ErrorBoundary';
import { Root } from './Root/root';
import { ImageCarousel } from './ImageCarousel';
import { GM } from './GM';
import { UploadStats } from './UploadStats';

export const routerConfig = [
  {
    path: '/hub',
    element: <Root />,
    errorElement: <ErrorBoundary />,
    children: [
      // * StartPlaying Technical Demo
      {
        path: '/hub/carousel',
        element: <ImageCarousel />
      },
      {
        path: '/hub/gm',
        element: <GM />
      },
      // * 2K Stat Uploader
      {
        path: '/hub/upload',
        element: <UploadStats />
      }
    ]
  }
];

export default {};
