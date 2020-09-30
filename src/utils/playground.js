function tag(strings, ...values) {
  console.log('--- strings ---');
  console.log(strings);
  console.log('--- values ---');
  console.log(values);
  return 'whatever';
}

// two functionaly identical calls
let result = tag`alpha ${true}`;
result = tag([`alpha`], true);
