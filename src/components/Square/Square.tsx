import { FC } from "react";
import "./square.css"

interface SquareProps {
    value: string;
    onClick: () => void;
};

export const Square: FC<SquareProps> = (props) => {
    return (
        <button
            className="square"
            onClick={props.onClick}>
            {props.value}
        </button>
    );
}
