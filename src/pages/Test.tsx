import FileDropzone from "@/components/FileDropzone";

const Test = () => {
  return (
    <div>
      <FileDropzone
        onChange={() => {}}
        showPreview
        maxFileUploads={3}
        maxFileSize={5}
        allowedFileExtensions={["jpg", "jpeg", "png"]}
      />
    </div>
  );
};

export default Test;
