const Parser = require("php-parser")
const parser = new Parser({ ast: { withPositions: false, withSource: false } })

/**
 * @param {string} source
 */
module.exports = function deserializePHP(source) {
    const ast = parser.parseEval(source.replace(/^<\?php/, ""))
    const output = {}

    const assignments = ast.children.filter(
        token =>
            token.kind === "expressionstatement" && token.expression.kind === "assign"
    )

    for (const assignment of assignments) {
        const name = assignment.expression.left.name
        output[name] = deserializeValue(assignment.expression.right)
    }

    return output
}

function deserializeValue(value) {
    if (value.kind === "array") {
        if (value.items[0] && value.items[0].key) {
            const object = {}
            for (const entry of value.items)
                object[deserializeValue(entry.key)] = deserializeValue(entry.value)
            return object
        } else {
            return value.items.map(deserializeValue)
        }
    } else if (value.kind === "entry") {
        return deserializeValue(value.value)
    } else if (value.kind === "number") {
        return Number(value.value)
    } else if (value.kind === "boolean") {
        return Boolean(value.value)
    } else if (value.kind === "nullkeyword") {
        return null
    } else if (value.kind === "name") {
        return value.name
    } else {
        return value.value
    }
}
