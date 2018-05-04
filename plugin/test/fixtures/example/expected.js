let foo = { foo: 'bar' };
let bar = [1, 2, 3];

UniSharp.Helpers.collection('map', UniSharp.Helpers.collection('map', foo, value => value), value => value);
UniSharp.Helpers.collection('map', UniSharp.Helpers.collection('map', { foo: 'bar' }, value => value), value => value);
UniSharp.Helpers.collection('map', UniSharp.Helpers.collection('map', bar, value => value), value => value);
UniSharp.Helpers.collection('map', UniSharp.Helpers.collection('map', [1, 2, 3], value => value), value => value);

foo.xxx();
({ foo: 'bar' }).xxx();
bar.xxx();
[1, 2, 3].xxx();
