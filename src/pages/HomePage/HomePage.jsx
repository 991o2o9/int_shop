import { HeroBlock } from "../../modules/HomeModule/HeroBlock/HeroBlock";
import { InfoAbComp } from "../../modules/HomeModule/InfoAbComp/InfoAbComp";
import { ProductBlock } from "../../modules/HomeModule/ProductBlock/ProductBlock";

export const HomePage = () => {
  return (
    <div>
      <HeroBlock />
      <InfoAbComp />
      <ProductBlock />
    </div>
  );
};
