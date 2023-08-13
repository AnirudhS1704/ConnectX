export default function Card({children, padding}) {
    let classes = "bg-white shadow-md shadow-gray-400 rounded-lg mb-4";
    if (padding) {
        classes = "bg-white shadow-md shadow-gray-400 rounded-lg p-4 mb-4";
    }
    return (
        <div className={classes}>
            {children}
        </div>
    )
}