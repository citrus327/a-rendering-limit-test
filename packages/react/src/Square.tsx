import { useEffect, useMemo } from "react";
import { Struct } from "utils";

interface SquareProps {
  value: Struct;
  onChange: () => void;
  enableChildrenEvent: boolean;
  time: number;
}

export function Square(props: SquareProps) {
  const { enableChildrenEvent, value, onChange, time } = props;
  const _onChange = useMemo(() => onChange, []);

  useEffect(() => {
    if (!enableChildrenEvent) return;
    const timerId = setInterval(() => {
      _onChange();
    }, time);

    return () => {
      clearInterval(timerId);
    };
  }, [enableChildrenEvent, time, _onChange]);

  return (
    <div
      style={{
        display: "inline-flex",
        width: "40px",
        height: `40px`,
        background: "gray",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
      }}
    >
      {value.count}
    </div>
  );
}
