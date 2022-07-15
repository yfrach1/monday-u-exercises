import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getSortType } from "../../app/selectors/items-view-selectors";
// import {
//   getItemsAmount,
//   selectResult,
// } from "../../app/selectors/items-entities-selectors";
// import {
//   fetchDataAction,
//   newInputAction,
// } from "../../app/actions/items-entities-actions";
import {
  setSortAction,
  toggleSortTypeAction,
} from "../../app/actions/items-view-actions";
import Sort from "./Sort";

const mapStateToProps = (state, ownProps) => {
  const sortType = getSortType(state);
  return { sortType };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({ setSortAction, toggleSortTypeAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Sort);
