import React from 'react';
import {TransitionProps} from "@material-ui/core/transitions";
import {Fade, Slide} from "@material-ui/core";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Fade ref={ref} {...props} />;
});

export default Transition;