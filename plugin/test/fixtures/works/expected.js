UniSharp.Helpers.collection('map', foo, value => value);
UniSharp.Helpers.collection('map', UniSharp.Helpers.collection('map', foo, value => value), value => value);

UniSharp.Helpers.collection('map', foo.bar, value => value);
UniSharp.Helpers.collection('map', UniSharp.Helpers.collection('map', foo.bar, value => value), value => value);

UniSharp.Helpers.collection('map', foo.bar.baz, value => value);
UniSharp.Helpers.collection('map', UniSharp.Helpers.collection('map', foo.bar.baz, value => value), value => value);

UniSharp.Helpers.collection('map', [1, 2, 3], value => value);
UniSharp.Helpers.collection('map', UniSharp.Helpers.collection('map', [1, 2, 3], value => value), value => value);

UniSharp.Helpers.collection('map', { foo: 'bar' }, value => value);
UniSharp.Helpers.collection('map', UniSharp.Helpers.collection('map', { foo: 'bar' }, value => value), value => value);

UniSharp.Helpers.collection('map', foo[0], value => value);
UniSharp.Helpers.collection('map', UniSharp.Helpers.collection('map', foo[0], value => value), value => value);

foo.xxx();
[1, 2, 3].xxx();
({ foo: 'bar' }).xxx();
