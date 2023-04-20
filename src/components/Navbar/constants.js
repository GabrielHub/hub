const navConfig = [
  {
    title: 'Home',
    path: '/hub'
  },
  {
    title: 'Ranking',
    path: '/hub/ranking'
  },
  {
    title: 'Players',
    path: '/hub/players'
  },
  {
    title: 'Upload',
    multi: true,
    paths: [
      {
        title: 'Upload Image',
        path: '/hub/imageUpload'
      },

      {
        title: 'Manual',
        path: '/hub/manualUpload'
      }
    ]
  }
];

export default navConfig;
