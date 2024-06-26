/* eslint-disable react/prop-types */
import styles from "./styles.module.css";

const MemberComponent = ({ name, about, img }) => {
  return (
    <div className={styles.member}>
      <h2 className={styles.aboutName}>{name}</h2>
      <p className={styles.aboutP}>{about}</p>
      <img className={styles.staffPic} src={img} alt="Member Picture" />
    </div>
  );
};

export default MemberComponent;
