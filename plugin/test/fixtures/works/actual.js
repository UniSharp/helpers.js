foo.map(value => value);
foo.map(value => value).map(value => value);

foo.bar.map(value => value);
foo.bar.map(value => value).map(value => value);

foo.bar.baz.map(value => value);
foo.bar.baz.map(value => value).map(value => value);

[1, 2, 3].map(value => value);
[1, 2, 3].map(value => value).map(value => value);

({ foo: 'bar' }).map(value => value);
({ foo: 'bar' }).map(value => value).map(value => value);

foo[0].map(value => value);
foo[0].map(value => value).map(value => value);

foo.xxx();
[1, 2, 3].xxx();
({ foo: 'bar' }).xxx();
