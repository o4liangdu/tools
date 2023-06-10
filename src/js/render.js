// console.log(window.api);
// window.api.saveFile();
// window.api.addValue((val)=>{
//     console.log('add', val)
// })

const saveBtn = document.querySelector('.btn-save')
saveBtn.addEventListener('click', () => {
    // window.api.saveFile();
    window.api.upload();
})
