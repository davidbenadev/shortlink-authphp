export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-gray-700 bg-gray-900 text-indigo-600 shadow-sm focus:ring-indigo-500 focus:ring-offset-gray-900 ' +
                className
            }
        />
    );
}
