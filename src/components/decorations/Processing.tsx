import styled from "styled-components";

const W1 = styled.div`
  --i: 1;
`

const W2 = styled.div`
  --i: 2;
`

export const Processing = () => {
  return (
    <div className="container-processing">
      <W1 className="box-processing"></W1>
      <W2 className="box-processing"></W2>
    </div>
  );
};
