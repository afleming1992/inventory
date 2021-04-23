import React from 'react';
import {Button} from "@material-ui/core";

interface UsesLeftButtonProps {
  maxUsages: number,
  timesUsed: number
}

const UsesLeftButton: React.FC<UsesLeftButtonProps> = ({maxUsages, timesUsed}) => {
  const usesLeft = maxUsages - timesUsed;

  return (
    <Button color="secondary">{usesLeft}/{maxUsages} Uses</Button>
  )
}

export default UsesLeftButton