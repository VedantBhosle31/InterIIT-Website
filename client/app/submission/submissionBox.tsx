interface SubmissionBoxProps {
  description: string;
  setDescription: (e: string) => void;
  handleFileUpload: (e: any) => void;
  isuploaded: boolean;
  handleSubmit: () => void;
  submissionType: "MID" | "FINAL" | "";
}

const SubmissionBox = ({
  description,
  setDescription,
  handleFileUpload,
  isuploaded,
  handleSubmit,
  submissionType,
}: SubmissionBoxProps) => {
  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center">
        Add Submission{submissionType !== "" ? ` - ${submissionType}` : ""}
      </h1>
      <form className="space-y-4" encType="multipart/form-data">
        <div>
          <label htmlFor="description" className=" py-5 text-l font-medium">
            Description{" "}
            <span className="text-xs text-grey">{"(Optional)"}</span>
          </label>
          <textarea
            id="description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mt-4 border rounded-md shadow-lg resize-none"
          />
        </div>
        <div>
          <label
            htmlFor="file"
            className="bg-slate-800 hover:bg-slate-700 font-bold inline-block text-white py-2 px-4 rounded-md"
          >
            Upload file
          </label>
          <input
            id="file"
            type="file"
            accept=".zip, .arj, , .7z, .bz2 ,.gz, .lzh, .rar "
            className=" hidden "
            onChange={handleFileUpload}
          />
          {isuploaded ? <span className="pl-4 text-bold">Uploaded✅</span> : ""}
          <button
            className="bg-slate-800 hover:bg-slate-700 font-bold text-white ml-2 mt-2 py-2 px-4 rounded-md"
            type="button"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
      <div className="text-center text-md font-bold text-slate-700 pt-2">
        The maximum size of the file that can be uploaded is 50MB
      </div>
    </div>
  );
};

export default SubmissionBox;
