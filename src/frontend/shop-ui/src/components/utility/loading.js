import {Loader} from "semantic-ui-react";

function Loading() {
  return (
    <div className="loading">
      <Loader active inline="centered" content="Loading" />
    </div>
  );
}

export default Loading;