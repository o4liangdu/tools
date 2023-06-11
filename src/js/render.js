// console.log(window.api);
// window.api.saveFile();
// window.api.addValue((val)=>{
//     console.log('add', val)
// })

// const saveBtn = document.querySelector('.btn-save')
// saveBtn.addEventListener('click', () => {
//     // window.api.saveFile();
//     window.api.upload();
// })

function getUserMedia(constraints, success, error) {
  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({
        audio: { echoCancellation: false },
        video: { facingMode: "user" }, //调用前置摄像头，后置摄像头使用video: { facingMode: { exact: "environment" } }
      })
      .then(success)
      .catch(error);
  }
}

let video = document.querySelector(".camera-wrapper");
let hideBg = false;

function success(stream) {
  let CompatibleURL = window.URL;
  //将视频流设置为video元素的源
  console.log(stream);

  video.srcObject = stream;
  video.play();
}

function error(error) {
  console.log(`访问用户媒体设备失败${error.name}, ${error.message}`);
}

if (navigator.mediaDevices.getUserMedia) {
  //调用用户媒体设备, 访问摄像头
  getUserMedia({ video: { width: 300, height: 300 } }, success, error);
}

document.querySelector(".btn-close").addEventListener("click", function () {
  window.api.close();
});

// 摄像头角度
let deg = 0;
document.querySelector(".btn-rotate").addEventListener("click", function (e) {
  e.stopPropagation();
  deg += 90;
  if (deg >= 360) deg = 0;
  video.style.transform = `rotate(${deg}deg)`;
});
// 去除背景
document.querySelector(".btn-bg").addEventListener("click", function (e) {
  hideBg = !hideBg;
  let canvas = document.querySelector(".canvas-wrapper");
  if (hideBg) {
    let model = null;
    video.style.visibility = "hidden";
    canvas.style.visibility = "visible";
    let context = canvas.getContext("2d");
    let canvasTmp = document.createElement("canvas");
    canvasTmp.width = 300;
    canvasTmp.height = 300;
    let contextTmp = canvasTmp.getContext("2d", { willReadFrequently: true });
    const annimate = () => {
      contextTmp.drawImage(video, 0, 0, 300, 300);
      const frame = contextTmp.getImageData(0, 0, 300, 300);

      // 处理数据
      model.segmentPerson(canvasTmp).then((segmentation) => {
        for (let i = 0; i < segmentation.data.length; i++) {
          if (segmentation.data[i] === 0) {
            frame.data[i * 4 + 3] = 0;
          }
        }
        // console.log(frame)
        context.putImageData(frame, 0, 0);
        requestAnimationFrame(annimate);
      });
    };
    bodyPix.load().then((mod) => {
      model = mod;
      console.info(model);
      annimate();
    });
  } else {
    video.style.visibility = "visible";
    canvas.style.visibility = "hidden";
  }
  canvas.style.transform = `rotate(${deg}deg)`;
});

document.querySelector("body").addEventListener("mouseenter", () => {
  document.querySelectorAll("button").forEach((e) => {
    e.style.opacity = "1";
  });
});
document.querySelector("body").addEventListener("mouseleave", () => {
  document.querySelectorAll("button").forEach((e) => {
    e.style.opacity = "0";
  });
});
