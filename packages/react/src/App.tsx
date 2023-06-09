import { Suspense, useEffect, useState } from "react";
import { generate2DArray, Struct } from "utils";
import { produce } from "immer";
import _ from "lodash";

const SIZE = 100;
const INTERVAL = 100;

interface SquareProps {
  value: Struct;
  onChange: () => void;
  enableChildrenEvent: boolean;
}

function Square(props: SquareProps) {
  const { enableChildrenEvent, value, onChange } = props;

  useEffect(() => {
    if (!enableChildrenEvent) return;
    const timerId = setInterval(() => {
      onChange();
    }, INTERVAL);

    return () => {
      clearInterval(timerId);
    };
  }, [enableChildrenEvent]);

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

const SubComp = () => {
  const [data, setData] = useState(generate2DArray(SIZE));
  const [enableChildrenEvent, setEnableChildrenEvent] = useState(false);

  useEffect(() => {
    if (enableChildrenEvent) return;
    const timerId = setInterval(() => {
      setData(generate2DArray(SIZE));
    }, INTERVAL);

    return () => {
      clearInterval(timerId);
    };
  }, [enableChildrenEvent]);

  return (
    <div style={{ display: "flex", flexFlow: "column", alignItems: "center" }}>
      <div
        style={{
          padding: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <label htmlFor="input">使用输入框检测用户输入卡顿情况 </label>
        <input id="input" style={{ marginLeft: "12px" }} />
        <button onClick={() => setEnableChildrenEvent((v) => !v)}>
          {`当前是${
            enableChildrenEvent ? "子组件调用" : "父组件调用"
          }，点击切换`}
        </button>
      </div>
      <div
        style={{
          width: "80vw",
          height: "80vh",
          display: "flex",
          gap: "2px",
          flexFlow: "column",
          overflow: "auto",
        }}
      >
        {data.map((o, i) => {
          return (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "2px 2px",
              }}
            >
              {o.map((v, j) => {
                return (
                  <Square
                    value={v}
                    enableChildrenEvent={enableChildrenEvent}
                    onChange={() => {
                      setData((v) => {
                        return produce(v, (draft) => {
                          draft[i][j].count = (Math.random() * 100).toFixed();
                        });
                        // return generate2DArray(SIZE);
                      });
                    }}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

function App() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <SubComp />
    </Suspense>
  );
}

export default App;
