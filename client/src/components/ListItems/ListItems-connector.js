import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getItems } from "../../app/selectors/items-entities-selectors";
import ListItems from "./ListItems";

const mapStateToProps = (state, ownProps) => {
  const items = getItems(state);
  return { items };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ListItems);
