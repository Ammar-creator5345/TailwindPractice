const SaveButton = ({ isSaving }) => {
  return (
    <>
      <hr className="my-4" />
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-green-300 px-4 py-2 rounded-2xl hover:bg-green-400"
        >
          {!isSaving ? "Save" : "Saving..."}
        </button>
      </div>
    </>
  );
};

export default SaveButton;
