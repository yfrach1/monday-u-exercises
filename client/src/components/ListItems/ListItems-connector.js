import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getFilteredItems } from "../../app/selectors/items-view-selectors";
import ListItems from "./ListItems";

const mapStateToProps = (state, ownProps) => {
  const items = getFilteredItems(state);
  return { items };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ListItems);
