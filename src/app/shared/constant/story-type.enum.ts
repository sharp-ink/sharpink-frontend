export enum StoryTypeEnum {
    FANTASY = 'Fantasy',
    ROMANCE = 'Romance',
    SCI_FI = 'Science-Fiction',
    UNDETERMINED = 'Aucun genre applicable'
}

// simulate methods in enum (not possible in Typescript)
export namespace StoryTypeEnum {
    export function getTypesForDropdown(): Array<{ name: string, label: string }> {
        const types = new Array<{ name: string, label: string }>();
        for (const prop in Object.getOwnPropertyDescriptors(StoryTypeEnum)) {
            // excludes functions to keep only the strings (which are the values of the enum)
            if (typeof StoryTypeEnum[prop] === 'string') {
                types.push({ name: prop, label: StoryTypeEnum[prop] });
            }
        }
        return types;
    }
}
