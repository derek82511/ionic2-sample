'use strict';

var babel = require('babel-core');
var test = require('tape');
var types = require('./index')(babel, 'assert');

test('primitive string', function (t) {
  var primitive = types.primitive('string');

  assertPrimitive(primitive, 'string', t);
  t.end();
});

test('primitive number', function (t) {
  var primitive = types.primitive('number');

  assertPrimitive(primitive, 'number', t);
  t.end();
});

test('primitive boolean', function (t) {
  var primitive = types.primitive('boolean');

  assertPrimitive(primitive, 'boolean', t);
  t.end();
});

test('primitive void', function (t) {
  var primitive = types.primitive('void');

  assertPrimitive(primitive, 'void', t);
  t.end();
});

test('genericType', function (t) {
  var container = createIdentifier('List');
  var content = types.primitive('string');
  var generic = types.genericType(container, content);

  t.equals(generic.type, 'CallExpression');
  t.equals(generic.callee.type, 'MemberExpression');
  assertIdentifier(generic.callee.object, 'assert', t);
  assertIdentifier(generic.callee.property, 'genericType', t);
  t.deepEquals(generic.arguments, [container, content]);
  t.end();
});

test('arrayOf', function (t) {
  var content = types.primitive('string');
  var array = types.arrayOf(content);

  t.equals(array.type, 'CallExpression');
  t.equals(array.callee.type, 'MemberExpression');
  assertIdentifier(array.callee.object, 'assert', t);
  assertIdentifier(array.callee.property, 'arrayOf', t);
  t.deepEquals(array.arguments, [content]);
  t.end();
});

test('structure', function (t) {
  var properties = [
    {
      key: createIdentifier('foo'),
      value: { type: 'StringTypeAnnotation' }
    }
  ];
  var structure = types.structure(properties);

  t.equals(structure.type, 'CallExpression');
  t.equals(structure.callee.type, 'MemberExpression');
  assertIdentifier(structure.callee.object, 'assert', t);
  assertIdentifier(structure.callee.property, 'structure', t);
  t.equals(structure.arguments.length, 1);
  var obj = structure.arguments[0];
  t.equals(obj.type, 'ObjectExpression');
  t.equals(obj.properties.length, 1);
  var prop = obj.properties[0];
  t.equals(prop.type, 'Property');
  t.equals(prop.kind, 'init');
  t.equals(prop.key, properties[0].key);
  assertPrimitive(prop.value, 'string', t);
  t.end();
});

test('typeForAnnotation null', function (t) {
  var type = types.typeForAnnotation(null);

  assertPrimitive(type, 'any', t);
  t.end();
});

test('typeForAnnotation string', function (t) {
  var type = types.typeForAnnotation({ type: 'StringTypeAnnotation' });

  assertPrimitive(type, 'string', t);
  t.end();
});

test('typeForAnnotation number', function (t) {
  var type = types.typeForAnnotation({ type: 'NumberTypeAnnotation' });

  assertPrimitive(type, 'number', t);
  t.end();
});

test('typeForAnnotation boolean', function (t) {
  var type = types.typeForAnnotation({ type: 'BooleanTypeAnnotation' });

  assertPrimitive(type, 'boolean', t);
  t.end();
});

test('typeForAnnotation void', function (t) {
  var type = types.typeForAnnotation({ type: 'VoidTypeAnnotation' });

  assertPrimitive(type, 'void', t);
  t.end();
});

test('typeForAnnotation custom type', function (t) {
  var type = types.typeForAnnotation({
    type: 'GenericTypeAnnotation',
    id: {
      type: 'Identifier',
      name: 'Foo'
    }
  });

  assertIdentifier(type, 'Foo', t);
  t.end();
});

test('typeForAnnotation function', function (t) {
  var type = types.typeForAnnotation({ type: 'FunctionTypeAnnotation' });

  assertIdentifier(type, 'Function', t);
  t.end();
});

function createIdentifier(name) {
  return { type: 'Identifier', name: name };
}

function assertPrimitive(type, name, t) {
  t.equals(type.type, 'MemberExpression');
  assertIdentifier(type.property, name, t);
  var object = type.object;
  t.equals(object.type, 'MemberExpression');
  assertIdentifier(object.object, 'assert', t);
  assertIdentifier(object.property, 'type', t);
}

function assertIdentifier(target, name, t) {
  t.equals(target.type, 'Identifier');
  t.equals(target.name, name);
}
