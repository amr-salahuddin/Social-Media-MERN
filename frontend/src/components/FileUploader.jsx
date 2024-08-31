function FileUploader({fileUploadRef,fileUploadHandler}) {
    return (
        <input type="file"

               accept='*'
               ref={fileUploadRef}
               multiple
               style={{display: 'none', position: 'absolute'}}
               onChange={fileUploadHandler}
        >
        </input>
    );
}

export default FileUploader