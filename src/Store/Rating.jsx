export default function Rating({rate, count}) {
    return (
        <>
            <span className="badge bg-primary">{rate}/{count}</span>
        </>
    )
}