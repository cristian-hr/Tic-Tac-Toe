import "./Square.css"

function Square(props) {

    const square = {}

    if (props.p === "cc") {
        square.borderStyle = "solid"
        square.borderWidth = "3.5px"
    }

    if (props.p === "tc") {
        square.borderLeftWidth = "3.5px"
        square.borderLeftStyle = "solid"
        square.borderRightWidth = "3.5px"
        square.borderRightStyle = "solid"
    }

    if (props.p === "lc") {
        square.borderTopWidth = "3.5px"
        square.borderTopStyle = "solid"
        square.borderBottomWidth = "3.5px"
        square.borderBottomStyle = "solid"
    }

    if (props.p === "rc") {
        square.borderTopWidth = "3.5px"
        square.borderTopStyle = "solid"
        square.borderBottomWidth = "3.5px"
        square.borderBottomStyle = "solid"
    }

    if (props.p === "bc") {
        square.borderLeftWidth = "3.5px"
        square.borderLeftStyle = "solid"
        square.borderRightWidth = "3.5px"
        square.borderRightStyle = "solid"
    }

    return (
        <div className="square" style={square}>
            <div className="squareData">
                {props.data}
            </div>
        </div>
    )
}

export default Square