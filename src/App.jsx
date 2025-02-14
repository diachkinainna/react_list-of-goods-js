import cn from 'classnames';
import { useState } from 'react';

import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const BUTTON_SORT_ALPHABETICALLY = 'Sort alphabetically';
const BUTTON_SORT_BY_LENGTH = 'Sort by length';
const BUTTON_REVERSE = 'Reverse';
const BUTTON_RESET = 'Reset';

export const App = () => {
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [reversed, setReversed] = useState(false);
  const [sortField, setSortField] = useState('');

  function updateGoods(buttonName) {
    switch (buttonName) {
      case BUTTON_SORT_ALPHABETICALLY:
        setSortField(buttonName);

        if (reversed) {
          return setGoods(
            [...goods]
              .sort((good1, good2) => good1.localeCompare(good2))
              .toReversed(),
          );
        }

        return setGoods(
          [...goods].sort((good1, good2) => good1.localeCompare(good2)),
        );

      case BUTTON_SORT_BY_LENGTH:
        setSortField(buttonName);

        if (reversed) {
          return setGoods(
            [...goods].sort((good1, good2) => good2.length - good1.length),
          );
        }

        return setGoods(
          [...goods].sort((good1, good2) => good1.length - good2.length),
        );

      case BUTTON_REVERSE:
        return setGoods([...goods].toReversed());

      default:
        return '';
    }
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => updateGoods(BUTTON_SORT_ALPHABETICALLY)}
          className={cn('button', 'is-info', {
            'is-light': sortField !== BUTTON_SORT_ALPHABETICALLY,
          })}
        >
          {BUTTON_SORT_ALPHABETICALLY}
        </button>

        <button
          type="button"
          onClick={() => updateGoods(BUTTON_SORT_BY_LENGTH)}
          className={cn('button', 'is-success', {
            'is-light': sortField !== BUTTON_SORT_BY_LENGTH,
          })}
        >
          {BUTTON_SORT_BY_LENGTH}
        </button>

        <button
          type="button"
          onClick={() => {
            updateGoods(BUTTON_REVERSE);
            setReversed(!reversed);
          }}
          className={cn('button', 'is-warning', { 'is-light': !reversed })}
        >
          {BUTTON_REVERSE}
        </button>

        {(sortField !== '' || reversed) && (
          <button
            type="button"
            onClick={() => {
              setGoods([...goodsFromServer]);
              setSortField('');
              setReversed(false);
            }}
            className="button is-danger is-light"
          >
            {BUTTON_RESET}
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
