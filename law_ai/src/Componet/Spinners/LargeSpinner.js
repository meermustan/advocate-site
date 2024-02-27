import Spinner from 'react-bootstrap/Spinner';
const LargeSpinner = () => {
    return (
        <div className="text-center my-5 py-3">
            <Spinner animation="border" role="status">
            </Spinner>
            <p>Loading...</p>
        </div>
    )
}
export default LargeSpinner