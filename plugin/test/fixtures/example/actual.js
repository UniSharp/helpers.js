let foo = { foo: 'bar' };
let bar = [1, 2, 3];

foo.map(value => value).map(value => value);
({ foo: 'bar' }).map(value => value).map(value => value);
bar.map(value => value).map(value => value);
[1, 2, 3].map(value => value).map(value => value);

foo.xxx();
({ foo: 'bar' }).xxx();
bar.xxx();
[1, 2, 3].xxx();
