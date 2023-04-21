const navConfig = [
  {
    title: 'HOME',
    path: '/hub'
  },
  {
    title: 'RANKING',
    path: '/hub/ranking'
  },
  {
    title: 'PLAYERS',
    path: '/hub/players'
  },
  {
    title: 'UPLOAD',
    multi: true,
    paths: [
      {
        title: 'UPLOAD IMAGE',
        path: '/hub/imageUpload'
      },

      {
        title: 'MANUAL',
        path: '/hub/manualUpload'
      }
    ]
  }
];

export default navConfig;
