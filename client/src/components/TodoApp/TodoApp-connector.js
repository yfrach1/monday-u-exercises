import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getShowLoader,
  getShowToast,
  getToastParam,
  getItemsFilter,
  getViewItemsAmount,
  getAllItemsAmount,
} from "../../app/selectors/items-view-selectors";
import {
  newInputAction,
} from "../../app/actions/items-entities-actions";

import { hideToastAction } from "../../app/actions/items-view-actions";
import TodoApp from "./TodoApp";

const mapStateToProps = (state, ownProps) => {
  const showLoader = getShowLoader(state);
  const showToast = getShowToast(state);
  const toastParam = getToastParam(state);
  const viewItemsAmount = getViewItemsAmount(state);
  const allItemsAmount = getAllItemsAmount(state);
  const filter = getItemsFilter(state);
  return {
    showLoader,
    showToast,
    toastParam,
    viewItemsAmount,
    allItemsAmount,
    filter,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({ hideToastAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);
