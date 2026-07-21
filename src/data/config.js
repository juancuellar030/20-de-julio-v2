export const BACKGROUND_IMAGES = [
  'https://images.unsplash.com/photo-1714686495394-73e2bb1bbd39?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://caracol.com.co/resizer/v2/2MUKDSYJT5GQFEZEGL4D377PBY.jpg?auth=d8c65fe198d8615f2fcb01df74ca95721c71dac5378ccf71ff2e2738415993de',
  'https://images.pexels.com/photos/4011450/pexels-photo-4011450.jpeg',
  'https://images.pexels.com/photos/38238660/pexels-photo-38238660.jpeg',
  'https://images.pexels.com/photos/17413264/pexels-photo-17413264.jpeg',
];

export const VIDEOS = {
  anthem: 'https://www.youtube.com/embed/oBtJ--lICJg',
  history: {
    '1-3': 'https://www.youtube.com/embed/8DaNSJifI60',
    '4-5': 'https://www.youtube.com/embed/qjIiUdCGcrI',
  },
};

export const WETRANSFER_URL = 'https://we.tl/t-eBE6kuL8CifgpSWF';

const assetUrl = (filename) =>
  `${import.meta.env.BASE_URL}assets/${filename.split('/').map(encodeURIComponent).join('/')}`;

export const SCHOOL_LOGO = assetUrl('school-logo.png');
export const ANTHEM_AUDIO = assetUrl('Himno Nacional de la Republica de Colombia.mp3');
export const INVITATION_CARD = assetUrl('invitation-card.jpeg');
export const QUIZ_MUSIC = assetUrl('Carmentea (Instrumental).mp3');
export const INVITATION_MUSIC = assetUrl('invitation-music.mp3');

export const COLORS = {
  red: '#C41E3A',
  navy: '#1A2B5F',
  cream: '#F5F0E1',
  yellow: '#F5C518',
  green: '#2E8B3C',
};

export const QUIZ_TIMER_SECONDS = 45;
