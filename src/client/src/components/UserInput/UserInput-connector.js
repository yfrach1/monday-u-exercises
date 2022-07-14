import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { newInputAction } from "../../app/actions/items-entities-actions";
import UserInput from "./UserInput";

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({ newInputAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInput);
