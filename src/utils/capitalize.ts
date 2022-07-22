/**
 * Capitalizes all the words in a string that are seperated by a space.
 * This was originally made to capitalize names and titles, however tailwindcss has a class called 'capitalize' which
 * provides the same outcome.
 * @param str
 */
export default function capitalize(str: string): string {
    let temp = str.split(' ');
    temp = temp.map((str) => str.substring(0, 1).toUpperCase() + str.substring(1, str.length).toLowerCase());
    return temp.join(' ');
}