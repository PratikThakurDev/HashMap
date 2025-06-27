const HashMap = (initialCapacity = 16, loadFactor = 0.75) => {
  let capacity = initialCapacity;
  let count = 0;
  let buckets = Array.from({ length: capacity }, () => []);

  function hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i) ;
    }

    return hashCode % capacity;
  }

  function resize() {
    const oldBuckets = buckets;
    capacity *= 2;
    buckets = Array.from({ length: capacity }, () => []);
    count = 0;
    for (let bucket of oldBuckets) {
      for (let [key, value] of bucket) {
        set(key, value);
      }
    }
  }

  function set(key, value) {
    const index = hash(key);
    const bucket = buckets[index];

    for (let entry of bucket) {
      if (entry[0] === key) {
        entry[1] = value;
        return;
      }
    }
    bucket.push([key, value]);
    count++;
  }

  function get(key) {
    const index = hash(key);
    const bucket = buckets[index];
    for (let entry of bucket) {
      if (entry[0] === key) {
        return entry[1];
      }
    }
    return null;
  }

  function has(key) {
    const index = hash(key);
    const bucket = buckets[index];
    for (let entry of bucket) {
      if (entry[0] === key) {
        return true;
      }
    }
    return false;
  }

  function remove(key) {
    const index = hash(key);
    const bucket = buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        count--;
        return true;
      }
    }

    return false;
  }

  function length() {
    return count;
  }

  function clear() {
    buckets = Array.from({ length: capacity }, () => []);
    count = 0;
  }

  function keys() {
    const keys = [];
    for (let bucket of buckets) {
      for (let [key] of bucket) {
        keys.push([key]);
      }
    }
    return keys;
  }

  function values() {
    const values = [];
    for (let bucket of buckets) {
      for (let [, value] of bucket) {
        values.push([value]);
      }
    }
    return values;
  }

  function entries() {
    const entries = [];
    for (let bucket of buckets) {
      for (let entry of bucket) {
        entries.push([...entry]);
      }
    }
    return entries;
  }

  return {
    set,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
    entries,
    _debug: () => ({ capacity, count, buckets }),
  };
};

const test = HashMap();

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

console.log('Before resizing:');
console.log('Length:', test.length());
console.log('Debug:', test._debug());

// Trigger resize
test.set('moon', 'silver');

console.log('After resizing:');
console.log('Length:', test.length());
console.log('Debug:', test._debug());

// Overwrite
test.set('apple', 'green');
test.set('kite', 'orange');

console.log('Get apple:', test.get('apple'));
console.log('Has dog:', test.has('dog'));
console.log('Remove frog:', test.remove('frog'));
console.log('Has frog:', test.has('frog'));

console.log('Keys:', test.keys());
console.log('Values:', test.values());
console.log('Entries:', test.entries());

test.clear();
console.log('After clear():', test.length());
