export function EditBudgetModal(props) {
  const ShowModal = () => {
    if (!props.show) {
      return null;
    }
    return (
      <div
        className="bg-gray-500 flex justify-items-center items-center fixed  w-96 h-96"
        onClick={props.onClose}
      ></div>
    );
  };
}
