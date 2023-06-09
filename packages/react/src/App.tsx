import { Suspense, useEffect, useState } from "react";
import { generate2DArray, Struct } from "utils";
import { produce } from "immer";
import _ from "lodash";

const SIZE = 100;

interface SquareProps {
  value: Struct;
  onChange: () => void;
}

function Square(props: SquareProps) {
  useEffect(() => {
    const timerId = setInterval(() => {
      props.onChange();
    }, 10);

    return () => {
      clearInterval(timerId);
    };
  }, []);

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
      {props.value.count}
    </div>
  );
}

const SubComp = () => {
  const [data, setData] = useState(generate2DArray(SIZE));

  // useEffect(() => {
  //   const timerId = setInterval(() => {
  //     setData((v) => {
  //       return produce(v, (draft) => {
  //         return _.shuffle(draft).map((row) => {
  //           return _.shuffle(row);
  //         });
  //       });
  //     });
  //   }, 100);

  //   return () => {
  //     clearInterval(timerId);
  //   };
  // }, []);

  return (
    <div style={{ display: "flex", gap: "2px", flexFlow: "column" }}>
      <input />
      {data.map((o, i) => {
        return (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "2px 2px" }}>
            {o.map((v, j) => {
              return (
                <Square
                  value={v}
                  onChange={() => {
                    setData((v) => {
                      return produce(v, (draft) => {
                        draft[i][j].count = (Math.random() * 100).toFixed();
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
