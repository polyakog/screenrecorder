import scss from "./ProgressBar.module.scss";

export const ProgressBar = ({ percentage=80 }: {percentage?: number | null}) => {
  if (!percentage) {
    return null;
  }

  return (
    <div className={scss.ProgressBar}>
      <span>{Math.floor(percentage)}%</span>
      <div
        style={{ width: percentage + "%" }}
        className={scss.percentage}
      ></div>
    </div>
  );
};