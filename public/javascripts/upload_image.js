const fileUploadBtn = document.getElementById('fileUpload');
const uploadBtn = document.getElementById('upload_button');

uploadBtn.addEventListener("click", function () {
    fileUploadBtn.click();
});

// fileUploadBtn.addEventListener("change", function() {
//     if(fileUploadBtn.value) {
//         document.getElementById('text_file_name').value = fileUploadBtn.value.match(/[\/\\]([\w\d\s\. \-\(\)]+)$/)[1];
//     }
// });