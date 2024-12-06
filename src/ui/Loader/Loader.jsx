import style from "./Loader.module.scss";
export const Loader = () => {
  return (
    <div className={style.loaderForWebSite}>
      <div className={style.loading}></div>
    </div>
  );
};
