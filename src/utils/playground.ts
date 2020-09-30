import produce from 'immer';

interface Action {
  alpha: number;
}

const producer = produce((draft, action: Action) => {
  draft.newProp = action.alpha;
});

const Obj = {
  alpha: 1,
  beta: 2,
};

const newObj = producer(Obj, { alpha: 5 });

console.log(Obj); // { alpha: 1, beta: 2 }
console.log(newObj); // { alpha: 1, beta: 2, newProp: 5 }
console.log(Obj === newObj); // false
