import { expect, test } from 'vitest';

import { PJSSingleAccountV3Schema } from './PJSSingleAccount';

test('Throws on empty object', () => {
  expect(() => PJSSingleAccountV3Schema.parse({})).toThrowError();
  expect(() => PJSSingleAccountV3Schema.parse(undefined)).toThrowError();
});

test('Parses complete export of pjs extension ', () => {
  const string = `{"encoded":"mF5P0MtWoSmXkazUzkoKuugBOgAu29J4rumXUsYsgFkAgAAAAQAAAAgAAACntTd8kFJfxji19gkG3sILiqZnIzssyFbuLgT7gor+xTLbG1RmBo/f0mrprXoqMPE4nylyR1pA4eIs3U9oObWaMl6rBEJ3Qouh2B36WNVl+ovaPatr3kDRXHnQxcJPS7a5W+4JLMLc1KrfZmNAbGG+PTb7DyRzPtM6eH/0lOJiot83lqR8WM0PgFvYOFQNQHaR0vLBdyX986cmPWT4","encoding":{"content":["pkcs8","sr25519"],"type":["scrypt","xsalsa20-poly1305"],"version":"3"},"address":"5F6xV4iouEKWRLHjAh1DsJjYxC8yLpp9nkcR6HGFQ9aEQizC","meta":{"genesisHash":"","name":"deleteme","whenCreated":1693830309980}}`;
  const obj = JSON.parse(string);

  expect(() => PJSSingleAccountV3Schema.parse(obj)).not.toThrowError();
  expect(PJSSingleAccountV3Schema.parse(obj)).toBeTruthy();
});
