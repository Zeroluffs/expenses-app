export function EditBudgetModal(props) {
  const ShowModal = () => {
    if (!props.show) {
      return null;
    }
    return (
      <div
        className="bg-gray-100 bg-opacity-400 absolute mx-60 flex   
      w-96 h-44 justify-center align-middle" onClick={props.onClose}
      >
        <div
          className=" flex justify-items-center items-center "
          
        >
          <div className="m-auto ">
            <div
              onClick={(e) => e.stopPropagation()}
              className=" text-2xl mb-3"
            >
              New Amount
            </div>
            <input
              type="number"
              className="rounded-lg h-11 text-lg p-3"
            ></input>
            <button
              onClick={props.onClose}
              className="bg-green-500 text-lg ml-4"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  };

  return <ShowModal />;
}
