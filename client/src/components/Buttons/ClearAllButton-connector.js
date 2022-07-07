import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { deleteAllItemsAction } from "../../app/actions/items-entities-actions";
import ClearAllButton from "./ClearAllButton";

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({ deleteAllItemsAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ClearAllButton);
