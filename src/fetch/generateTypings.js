/**
 * This is really basic, but the MediaWiki language data is also really basic.
 * @param {*} value
 * @param {string} name
 * @returns {string}
 */
// if name is provided, this is the root interface (not a result of recursion)
function generateTypings(value, name = null) {
    if (value === null) {
        return "unknown"
    } else if (!(value instanceof Object)) {
        return typeof value
    } else if (Array.isArray(value)) {
        if (
            typeof value[0] === "number" &&
            value.slice(1).filter(item => typeof item !== "string").length === 0
        ) {
            return `[number, ...string[]]`
        } else {
            const union = generateUnion(value, true)
            return `${union}[]`
        }
    } else if (value instanceof Object) {
        const entryTypes = {}
        for (const [k, v] of Object.entries(value)) {
            let vType = k === "fallback" ? "string" : generateTypings(v)
            entryTypes[k] = vType
        }

        const valueTypes = Object.values(entryTypes)
        const sameType = valueTypes[0]
        if (valueTypes.every(type => type === sameType) && !name) {
            const keyUnion = Object.keys(value)
                .map(name => `"${name}"`)
                .join(" | ")
            return `Record<${keyUnion}, ${sameType}>`
        } else {
            // make all keys except callback optional, on root
            // also quote non-root properties
            const transform = k =>
                name ? `${k}${k === "fallback" ? "" : "?"}` : `"${k}"`
            const sep = name ? "\n    " : " "
            let type = name ? `interface ${name} {` : "{"
            type += sep
            type += Object.entries(entryTypes)
                .map(([k, v]) => `${transform(k)}: ${v};`)
                .join(sep)
            type += name ? "\n}" : " }"
            return type
        }
    }
}

/**
 * @param {*[]} values
 */
function generateUnion(values, enclose = false) {
    const types = []
    for (const item of values.filter(value => value !== null)) {
        const type = generateTypings(item)
        if (!types.includes(type)) types.push(type)
    }

    if (types.length === 0) types.push("unknown")
    let union = types.join(" | ")
    if (enclose && types.length > 1) union = `(${union})`

    return union
}

module.exports = generateTypings
