import Pusher from 'pusher';

export const pusher = new Pusher({
  appId: '1994768',
  key: '160d1673434507dddb18',
  secret: 'd0df96b25741cd710e2f',
  cluster: 'us2',
  useTLS: true,
});
