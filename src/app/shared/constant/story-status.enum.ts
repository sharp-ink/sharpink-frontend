
export enum StoryStatusEnum {
    PROGRESS = 'En cours',
    STAND_BY = 'En pause',
    COMPLETE = 'Terminée'
}

// simulate methods in enum (not possible in Typescript)
export namespace StoryStatusEnum {
    export function getTypesForRadioGroup(): Array<{ name: string, label: string }> {
        const types = new Array<{ name: string, label: string }>();
        for (const prop in Object.getOwnPropertyDescriptors(StoryStatusEnum)) {
            // excludes functions to keep only the strings (which are the values of the enum)
            if (typeof StoryStatusEnum[prop] === 'string') {
                types.push({ name: prop, label: StoryStatusEnum[prop] });
            }
        }
        return types;
    }
}
