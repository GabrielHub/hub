const MessageQueue = require('./pubsub');

test('can publish something to nobody', () => {
  const simpleMessageQueue = new MessageQueue();
  expect(() => simpleMessageQueue.publish('something')).not.toThrow();
});

test('can do simple pub / sub', () => {
  const queue = new MessageQueue();
  const last = {};

  queue.subscribe('foo', (data) => {
    last.data = data;
    return data;
  });

  queue.publish('foo', 42);

  expect(last.data).toBe(42);
});

test('gives you values in order', () => {
  const queue = new MessageQueue();
  const values = [];

  queue.subscribe('foo', (data) => {
    values.push(data);
  });

  queue.publish('foo', 1);
  queue.publish('foo', 2);
  queue.publish('foo', 3);

  expect(values).toStrictEqual([1, 2, 3]);
});

test('supports multiple event types', () => {
  const queue = new MessageQueue();

  let evens = 0;
  let odds = 0;

  queue.subscribe('even', () => {
    evens += 1;
  });

  queue.subscribe('odd', () => {
    odds += 1;
  });

  [1, 2, 5, 6, 9, 14, 7].forEach((i) => {
    const type = i % 2 === 0 ? 'even' : 'odd';
    queue.publish(type, i);
  });

  expect(evens).toBe(3);
  expect(odds).toBe(4);
});

test('supports multiple receivers to the same event', () => {
  const queue = new MessageQueue();

  let n = 0;

  queue.subscribe('number', (i) => {
    n += i;
  });

  queue.subscribe('number', (i) => {
    n *= i;
  });

  queue.publish('number', 5);

  expect(n).toBe(25);
});

test('should allow other receivers to process even if one fails', () => {
  const queue = new MessageQueue();
  let n = 0;

  queue.subscribe('foo', () => {
    throw new Error('I did something bad');
  });

  queue.subscribe('foo', () => {
    n += 1;
  });

  Array(3)
    .fill()
    .forEach(() => {
      queue.publish('foo');
    });

  expect(n).toBe(3);
});

test('allows subscribing to multiple types on the same handler', () => {
  const queue = new MessageQueue();

  const a = [];
  queue.subscribe(['number', 'string'], (data) => {
    a.push(data);
  });

  queue.publish('number', 1);
  queue.publish('string', 'foo');
  queue.publish('number', 2);

  // ! There wasn't a test here (no assert in the ruby code), so I made one up
  expect(a).toStrictEqual([1, 'foo', 2]);
});
