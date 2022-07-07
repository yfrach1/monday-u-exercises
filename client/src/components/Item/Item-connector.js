import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  deleteItemByIdAction,
  toggleStatusAction,
  updateItemNameAction,
} from "../../app/actions/items-entities-actions";
import Item from "./Item";

const mapStateToProps = (state, ownProps) => {
  // const items = getItems(state);
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators(
    { deleteItemByIdAction, toggleStatusAction, updateItemNameAction },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
