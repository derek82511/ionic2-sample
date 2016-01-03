'use strict';

module.exports = function (babel, assertName) {
  var t = babel.types;

  return {
    primitive: primitive,
    genericType: genericType,
    arrayOf: arrayOf,
    structure: structure,
    typeForAnnotation: typeForAnnotation
  };

  function primitive(typeName) {
    return t.memberExpression(
      t.memberExpression(t.identifier(assertName), t.identifier('type')),
      t.identifier(typeName)
    );
  }

  function genericType(typeId, arg) {
    return t.callExpression(
      t.memberExpression(t.identifier(assertName), t.identifier('genericType')),
      [typeId, arg]
    );
  }

  function arrayOf(arg) {
    return t.callExpression(
      t.memberExpression(t.identifier(assertName), t.identifier('arrayOf')),
      [arg]
    );
  }

  function structure(definitionProperties) {
    var properties = definitionProperties.map(function (property) {
      return t.property(
        'init',
        property.key,
        typeForAnnotation(property.value)
      );
    });
    var definition = t.objectExpression(properties);
    return t.callExpression(
      t.memberExpression(t.identifier(assertName), t.identifier('structure')),
      [definition]
    );
  }

  function typeForAnnotation(annotation) {
    if (!annotation) {
      return primitive('any');
    }
    switch (annotation.type) {
      case 'StringTypeAnnotation':
        return primitive('string');
      case 'NumberTypeAnnotation':
        return primitive('number');
      case 'BooleanTypeAnnotation':
        return primitive('boolean');
      case 'VoidTypeAnnotation':
        return primitive('void');
      case 'GenericTypeAnnotation':
        if (annotation.typeParameters) {
          var childType = typeForAnnotation(annotation.typeParameters.params[0]);
          if (annotation.id.name === 'Array') {
            return arrayOf(childType);
          } else {
            return genericType(annotation.id, childType);
          }
        }
        return annotation.id;
      case 'ObjectTypeAnnotation':
        return structure(annotation.properties);
      case 'FunctionTypeAnnotation':
        return t.identifier('Function');
      // TODO: Union and Intersection.
      // TODO: Any other types?
      default:
        return primitive('any');
    }
  }
};
