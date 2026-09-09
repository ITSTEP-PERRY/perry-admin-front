
declare global {
    interface String {
        /**
         * Converts an Ant Design FieldError array into a key-value error object.
         * Only callable on FieldError[] lists.
         */
        hideRest(this: String, countToShow?: number, rest?: string): String
    }
}



String.prototype.hideRest = function (this: string, countToShow=25, rest="..."): string {
    return this.slice(0, countToShow) + rest;
}
// er.forEach(error => {
//     hasErrors[error.name[0]] = error.errors.length > 0
//     setHasErrors({
//         ...hasErrors,
//     });
// })