import { FC, useState, useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';
import { useSelector } from '../../services/store';
import { selectIngredientState } from '../../services/slices/ingredients'; 

export const BurgerIngredients: FC = () => {
  // Получаем ингредиенты из состояния Redux
  const { buns, mains, sauces } = useSelector(selectIngredientState);

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');

  // Рефы для заголовков секций
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  // Хуки наблюдения за видимостью секций
  const [bunsRef, inViewBuns] = useInView({ threshold: 0 });
  const [mainsRef, inViewMains] = useInView({ threshold: 0 });
  const [saucesRef, inViewSauces] = useInView({ threshold: 0 });

  // Обновляем текущую вкладку в зависимости от видимости
  useEffect(() => {
    if (inViewBuns) setCurrentTab('bun');
    else if (inViewSauces) setCurrentTab('sauce');
    else if (inViewMains) setCurrentTab('main');
  }, [inViewBuns, inViewMains, inViewSauces]);

  // Обработчик клика по вкладке — плавно прокручиваем к секции
  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    if (tab === 'bun') titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'main') titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce') titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
    />
  );
};
