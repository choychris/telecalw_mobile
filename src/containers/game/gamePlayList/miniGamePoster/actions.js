import Request from '../../../../utils/fetch';

const serverlessUrl = 'https://miwfhlx21k.execute-api.ap-southeast-1.amazonaws.com/dev/vote/';

export function toSlides(navigator) {
  navigator.push({
    screen: 'app.SlideShow',
    navigatorStyle: {
      navBarHidden: true,
    },
  });
}

export function vote(yes) {
  if (yes) {
    Request(`${serverlessUrl}yes`, 'GET');
  } else {
    Request(`${serverlessUrl}no`, 'GET');
  }
}
