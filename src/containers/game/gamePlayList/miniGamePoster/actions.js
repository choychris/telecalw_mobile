export function toSlides(navigator){
  navigator.push({
    screen : 'app.SlideShow',
    navigatorStyle : {
      navBarHidden : true
    }
  });
}