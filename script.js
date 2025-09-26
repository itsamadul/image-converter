const inputFile = document.getElementById('inputFile');
const formatSelect = document.getElementById('format');
const convertBtn = document.getElementById('convertBtn');
const downloadLink = document.getElementById('downloadLink');
const previewImg = document.getElementById('previewImg');
const filenameInput = document.getElementById('filename');
const widthInput = document.getElementById('width');
const heightInput = document.getElementById('height');

convertBtn.addEventListener('click', () => {
    const file = inputFile.files[0];
    if(!file){ alert('Please select an image'); return; }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e){
        const img = new Image();
        img.src = e.target.result;
        img.onload = function(){
            const canvas = document.createElement('canvas');
            const w = widthInput.value ? parseInt(widthInput.value) : img.width;
            const h = heightInput.value ? parseInt(heightInput.value) : img.height;
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, w, h);
            const format = formatSelect.value;
            const dataURL = canvas.toDataURL('image/'+format);
            previewImg.src = dataURL;
            const fname = filenameInput.value ? filenameInput.value : 'converted';
            downloadLink.href = dataURL;
            downloadLink.download = fname + '.' + format;
            downloadLink.style.display = 'block';
        }
    }
});
