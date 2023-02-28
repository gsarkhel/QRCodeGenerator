import '../css/style.scss';
import QRCode from 'qrcode';

class Main {
  constructor() {
    const imageDiv = document.createElement('img');
    document.body.appendChild(imageDiv);
    QRCode.toDataURL('https://www.dohnaglobal.com', function (err, url) {
        imageDiv.src = url;
      })
  }
}

window.addEventListener('load', () => {
  var mainObj = new Main();
});
