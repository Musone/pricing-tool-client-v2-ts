export default function DeleteButton(props: { disabled: boolean, onClick: () => void }) {
    return <button
        disabled={props.disabled}
        onClick={props.onClick}
        className={`bg-red-600 hover:bg-red-500/80 shadow px-3 py-2 rounded max-w-fit text-offWhite font-semibold`}>Delete
    </button>;
}