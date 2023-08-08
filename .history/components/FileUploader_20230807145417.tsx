function FileUploader({ onFileSelected }) {
    function FileUploader({ onFileSelected }) {
        return (
          <div>
            <input type="file" accept=".xlsx, .csv" onChange={onFileSelected} />
          </div>
        );
      }
      
  }
  
  export default FileUploader;
  