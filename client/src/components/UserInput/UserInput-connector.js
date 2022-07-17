import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { newInputAction } from "../../app/actions/items-entities-actions";
import { setInputAction } from "../../app/actions/items-view-actions";
import { getInputValue } from "../../app/selectors/items-view-selectors";
import UserInput from "./UserInput";

const mapStateToProps = (state, ownProps) => {
  const inputValue = getInputValue(state);
  return { inputValue };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({ newInputAction, setInputAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInput);
