import { FC } from "react";
interface MoveHistoryProps {
    history: { squares: string[] }[];
    jumpTo: (step: number) => void;
};

export const MoveHistory: FC<MoveHistoryProps> = ({ history, jumpTo }) => {

    return (
        <>
            <ol>
                {history.map((_, move) => {
                    const desc = move ?
                        'Go to move #' + move :
                        'Go to game start';

                    return (
                        <li key={move}>
                            <button onClick={() => jumpTo(move)}>{desc}</button>
                        </li>
                    );
                })}
            </ol>
        </>
    );
}
