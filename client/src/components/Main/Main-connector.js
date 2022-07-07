import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getShowLoader,
  getShowToast,
  getToastParam,
} from "../../app/selectors/items-view-selectors";
import { getItemsAmount } from "../../app/selectors/items-entities-selectors";
import {
  fetchDataAction,
  newInputAction,
} from "../../app/actions/items-entities-actions";
import { hideToastAction } from "../../app/actions/items-view-actions";
import Main from "./Main";

const mapStateToProps = (state, ownProps) => {
  const showLoader = getShowLoader(state);
  const showToast = getShowToast(state);
  const toastParam = getToastParam(state);

  const itemsAmount = getItemsAmount(state);
  return { showLoader, showToast, toastParam, itemsAmount };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators(
    { fetchDataAction, hideToastAction, newInputAction },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
