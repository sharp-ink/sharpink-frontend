
export interface JsonPatchOperation {
    op: 'add' | 'remove' | 'replace', // support other operations if needed (see https://datatracker.ietf.org/doc/html/rfc6902)
    path: string, // uses "slash notation => for example use '/field1/subField' to patch the property field1.subField of an object"
    value: string,
}
