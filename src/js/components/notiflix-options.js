import Notiflix from 'notiflix';

Notiflix.Notify.init({
  width: '280px',
  messageMaxLength: 110,
  position: 'right-top', // 'right-top' - 'right-bottom' - 'left-top' - 'left-bottom' - 'center-top' - 'center-bottom' - 'center-center'
  distance: '10px',
  opacity: 1,
  timeout: 2000,
  fontSize: '14px',
  cssAnimationDuration: 450,
  cssAnimationStyle: 'from-top', // 'fade' - 'zoom' - 'from-right' - 'from-top' - 'from-bottom' - 'from-left'
  useIcon: false,
});

Notiflix.Loading.init({
  backgroundColor: 'rgba(0,0,0,0.2)',
  cssAnimationDuration: 450,
  svgSize: '80px',
  svgColor: '#188ce8',
});
