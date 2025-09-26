const inputFile = document.getElementById('inputFile');
const formatSelect = document.getElementById('format');
const convertBtn = document.getElementById('convertBtn');
const downloadLink = document.getElementById('downloadLink');
const previewImg = document.getElementById('previewImg');

convertBtn.addEventListener('click', () => {
    const file = inputFile.files[0];
    if (!file) {
        alert('Please select an image first!');
        return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function(e) {
        const img = new Image();
        img.src = e.target.result;

        img.onload = function() {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            const format = formatSelect.value;
            const dataURL = canvas.toDataURL(`image/${format}`);
            previewImg.src = dataURL;

            downloadLink.href = dataURL;
            downloadLink.download = `converted.${format}`;
            downloadLink.style.display = 'inline-block';
            downloadLink.textContent = 'Download Converted Image';
        }
    }
});
