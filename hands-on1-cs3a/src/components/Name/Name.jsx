import './Name.css';

function Name({firstName, middleName, lastName}) {
    return (
        <div className="name">
            <h1>
                {firstName} {middleName} {lastName}
            </h1>
        </div>
    )
}

export default Name;