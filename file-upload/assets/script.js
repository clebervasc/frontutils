const uploadContainer = document.getElementsByClassName("upload-container")[0];

const fileInputs = document.querySelectorAll(".upload-area input[type='file']");

const fileElement = fileInputs[0];

const uploadAreaElement = fileElement.closest(".upload-area");

fileElement.addEventListener("change", (e) => {
  if (fileElement.files.length) {
    updateUploadFileList(uploadAreaElement, fileElement.files[0]);
  }
});

uploadAreaElement.addEventListener("dragover", (e) => {
  e.preventDefault();
  uploadAreaElement.classList.add("upload--hover");
});

["dragleave", "dragend"].forEach((type) => {
  uploadAreaElement.addEventListener(type, (e) => {
    uploadAreaElement.classList.remove("upload--hover");
  });
});

uploadAreaElement.addEventListener("drop", (e) => {
  e.preventDefault();

  if (e.dataTransfer.files.length) {
    fileElement.files = e.dataTransfer.files;

    updateUploadFileList(uploadAreaElement, e.dataTransfer.files[0]);
  }

  uploadAreaElement.classList.remove("upload--hover");
});

const updateUploadFileList = (uploadAreaElement, file) => {
  let fileMessage = uploadAreaElement.querySelector(".file-status");

  fileMessage.innerHTML = `
    ${file.name}, ${file.size} bytes
`;
};

uploadContainer.addEventListener("reset", (e) => {
  let fileMessage = uploadAreaElement.querySelector(".file-status");

  fileMessage.innerHTML = "Nenhum arquivo selecionado";
});

uploadContainer.addEventListener("submit", (e) => {
  e.preventDefault();
  const selectedFile = document.getElementById("file-upload");
  console.log(selectedFile.files[0]);
});
