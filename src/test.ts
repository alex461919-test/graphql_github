import { resolve } from "path";

export default () => {};

/*
console.log(null == 0);
console.log(null < 1);
console.log(null > -1);

console.log(null == null);
console.log(undefined == undefined);

*/
const id = Symbol("id");
let user = {
  name: "John",
  money: 1000,
  _share: 1,
  [id]: "1",
  get share() {
    return this._share;
  },
  set share(value: any) {
    this._share = value;
  },
  /*
  [Symbol.toPrimitive](hint: string) {
    console.log(`hint: ${hint}`);
    return hint === "string" ? `{name: "${this.name}"}` : this.money;
  },
  */
};

console.dir(user);
console.dir(Object.assign({}, user));

/*
class Animal {
  speed: number;
  name: string;

  constructor(name: string, speed: number) {
    this.speed = speed;
    this.name = name;
  }

  run(speed = 0) {
    this.speed += speed;
    alert(`${this.name} бежит со скоростью ${this.speed}.`);
  }

  static compare(animalA: Animal, animalB: Animal) {
    return animalA.speed - animalB.speed;
  }
}

// Наследует от Animal
class Rabbit extends Animal {
  #hide() {
    alert(`${this.name} прячется!`);
  }
  _hide() {
    alert(`${this.name} прячется!`);
  }
  TestProps = 3;
}
console.dir(Animal);

console.dir(new Rabbit("asd", 5));
console.dir(Rabbit);

class Sample extends Animal {
  property = 1;
  #simpleMethod() {
    return 1;
  }
}
class aaa extends Array {}
console.dir(Sample);
console.log(Sample.prototype.constructor.toString());
console.dir(new Sample("1", 2));
console.dir(Array);
console.dir(aaa);
console.dir(new aaa());

/*
let animal = {
  eats: true,
  walk() {   
  },
};

let rabbit = {
  __proto__: animal,
};

function fn() {
  this.a = 1;
}
const fn_obj = new fn();
console.log(fn.prototype.constructor === fn);
console.dir(fn);
console.dir(fn_obj);

/* 
const man = {
  ago: 10,
};
/*
const objectSymbols = Object.getOwnPropertySymbols(user);

console.dir(Object.getOwnPropertyDescriptor(user, objectSymbols[0]));

Object.defineProperty(user, "prop", { enumerable: true, get: () => "prop", set: () => {}, configurable: false });

user.__proto__ = man;

console.log(Object.getOwnPropertyDescriptors(user));
//user.prop = "prop2";
console.dir(user);

/*
const fn = function localFn(a: any, b: any) {
  console.log("function", dd);
  console.dir(this);
  console.dir(fn_2);
  function fn_2() {
    return 1;
  }
  return fn_2;
};

console.dir(fn);
dd = 2;
console.log(dd);
let dd = 1;

new fn();

while( false){}

//fn.call({}, 1, 2);

//const ar = [null];
//console.log(ar.toString());

/*
console.dir(user);
console.dir(user);
const res = user + 500;
console.log(res);

/*
console.dir(Object.getOwnPropertyDescriptors(user));

console.log([null].toString());
let n = -1;
console.log(!!~n); // (~n) == (n != -1)

for (let i of [1, 2, 3].values()) {
  console.log(i);
}
console.dir([]);
console.log("1" + NaN);

const someString = new Number("1"); // need to construct a String object explicitly to avoid auto-boxing
console.dir(someString);
/*
console.log("----------");
someString[Symbol.iterator] = function () {
  let first = true;
  console.log("1 ", this);
  return {
    next: function () {
      console.log("2 ", this);
      if (first) {
        first = false;
        return { value: "bye", done: false };
      } else {
        return { done: true };
      }
    },
  } as IterableIterator<string>;
};
/*
(someString as {})[Symbol.iterator] = function () {
  this._first = true;
  return {
    // this is the iterator object, returning a single element, the string "bye"
    // _first: true,
    next: function () {
      console.dir(this);
      if (this._first) {
        this._first = false;
        return { value: "bye", done: false };
      } else {
        return { done: true };
      }
    },
  };
};

console.log([...someString]);
*/
