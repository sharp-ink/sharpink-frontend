/**
 * Represents a modification that we want to do on a specific preference among all user's preferences.
 * See {@link UserPreferences }
 */
export interface UserPreferenceModification {
    propertyPath: string, // the path of the property within the UserPreferences object (uses "dot notation")
    value: string | number, // the value to give to the property (overrides an existing value)
}
