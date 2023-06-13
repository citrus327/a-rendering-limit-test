import { Suspense, useEffect, useState } from "react";
import { generate2DArray, Struct, rng } from "utils";
import { produce } from "immer";
import { Square } from "./Square";

const SubComp = () => {
  const [enableChildrenEvent, setEnableChildrenEvent] = useState(false);
  const [size, setSize] = useState(100);
  const [time, setTime] = useState(100);
  const [data, setData] = useState<Struct[][]>(generate2DArray(size));

  useEffect(() => {
    if (enableChildrenEvent) return;
    const timerId = setInterval(() => {
      setData(generate2DArray(size));
    }, time);

    return () => {
      clearInterval(timerId);
    };
  }, [enableChildrenEvent, size, time]);

  return (
    <div style={{ display: "flex", flexFlow: "column", alignItems: "center" }}>
      <div
        style={{
          padding: 20,
          display: "flex",
          flexFlow: "column",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <div>
          <label htmlFor="input">使用输入框检测用户输入卡顿情况 </label>
          <input id="input" style={{ marginLeft: "12px" }} />
        </div>
        <div>
          <label htmlFor="size">渲染数量n(实际结果为n * n的2D array)</label>
          <input
            id="size"
            type="number"
            style={{ marginLeft: "12px" }}
            value={size}
            onChange={(e) => {
              setSize(
                Number.isNaN(parseInt(e.target.value))
                  ? 1
                  : parseInt(e.target.value)
              );
            }}
          />
        </div>
        <div>
          <label htmlFor="time">更新的间隔时间</label>
          <input
            id="time"
            type="number"
            style={{ marginLeft: "12px" }}
            value={time}
            onChange={(e) => {
              setTime(
                Number.isNaN(parseInt(e.target.value))
                  ? 1000
                  : parseInt(e.target.value)
              );
            }}
          />
        </div>
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
              key={i}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "2px 2px",
              }}
            >
              {o.map((v, j) => {
                return (
                  <Square
                    key={j}
                    time={time}
                    value={v}
                    enableChildrenEvent={enableChildrenEvent}
                    onChange={() => {
                      setData((v) => {
                        return produce(v, (draft) => {
                          draft[i][j].count = rng();
                        });
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
