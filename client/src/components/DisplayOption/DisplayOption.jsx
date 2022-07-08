import { useMemo } from "react";
import SortConnector from "../sort/Sort-connector";
import { Dropdown, Search } from "monday-ui-react-core";
import styles from "./DisplayOption.module.css";

const DisplayOption = ({ setFilterAction, setSearchKeyAction }) => {
  const options = useMemo(
    () => [
      {
        value: "done",
        label: "Done",
      },
      {
        value: "pending",
        label: "Pending",
      },
    ],
    []
  );
  return (
    <div className={styles.displayOptionBar}>
      <div className={styles.sortAndFilterCOntrol}>
        <div style={{ width: "30%" }}>
          <Dropdown
            placeholder="Filter tasks"
            style={{ width: 60 }}
            size={Dropdown.size.SMALL}
            options={options}
            className="dropdown-stories-styles_spacing"
            onChange={(e) => (e !== null ? setFilterAction(e.value) : null)}
            onClear={() => setFilterAction("all")}
          />
        </div>

        <div style={{ width: "60%", paddingLeft: "5px" }}>
          <div className="monday-storybook-search_box">
            <Search
              placeholder="Search items by name"
              style={{ width: "70px" }}
              size={Search.sizes.SMALL}
              onChange={(e) => {
                setSearchKeyAction(e);
              }}
            />
          </div>
        </div>
        <SortConnector />
      </div>
    </div>
  );
};

export default DisplayOption;
