import React from 'react';
import {AppState} from "../redux/reducers";
import {connect} from "react-redux";
import GameNavBar from "../component/GameNavBar";
import RoleUpdateModal from "../component/RoleUpdateModal";
import {Container} from "@material-ui/core";
import RoleSelector from '../component/RoleSelector';

interface GameManagerProps {

}

const GameManager: React.FC<GameManagerProps> = (props) => {
  return (
    <>
      <GameNavBar />
      <RoleUpdateModal />
      <Container disableGutters>
        <RoleSelector />
      </Container>
    </>
  );
}

const mapStateToProps = (state: AppState) => {
  return {

  }
}

export default connect(mapStateToProps)(GameManager)