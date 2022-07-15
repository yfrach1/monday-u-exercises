import harelImg from "../../assets/images/Harel.JPG";
import styles from "./AboutUs.module.css";
const AboutUs = () => {
  return (
    <div className={styles.contentPlacement}>
      <img style={{ width: "300px", padding: "0 10px" }} src={harelImg} />
      <div>
        <div style={{ fontSize: "40px" }}>
          Hey, my name is Harel, and I'm proud to present to you my Todo app.
        </div>
        <div style={{ fontSize: "20px" }}>
          <br />
          <br />
          <div> No more excuses and delaying things;</div>
          <div>
            with this app, you will be tracking the tasks you have, both pending
            and done.
          </div>

          <div>
            so let's go and try to add one; let's say.. wash the dishes 😆😆
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
