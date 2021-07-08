import "./Square.css"

function Square (props) {

    return (
        <div className="square">
            <div className="squareData">
                {props.data}
            </div>
        </div>
    )
}

export default Square