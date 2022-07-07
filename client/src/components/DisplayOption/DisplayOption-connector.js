import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import {
//   getShowLoader,
//   getShowToast,
//   getToastParam,
// } from "../../app/selectors/items-view-selectors";
// import {
//   getItemsAmount,
//   selectResult,
// } from "../../app/selectors/items-entities-selectors";
// import {
//   fetchDataAction,
//   newInputAction,
// } from "../../app/actions/items-entities-actions";
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
