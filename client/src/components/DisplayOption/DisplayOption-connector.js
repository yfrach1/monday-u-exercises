import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  setFilterAction,
  setSearchKeyAction,
} from "../../app/actions/items-view-actions";
import DisplayOption from "./DisplayOption";

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({ setFilterAction, setSearchKeyAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayOption);
