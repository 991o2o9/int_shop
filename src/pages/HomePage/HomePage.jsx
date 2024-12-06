import { HeroBlock } from "../../modules/HomeModule/HeroBlock/HeroBlock";
import { ProductBlock } from "../../modules/HomeModule/ProductBlock/ProductBlock";

export const HomePage = () => {
  return (
    <div className="container">
      <HeroBlock />
      <ProductBlock />
    </div>
  );
};
