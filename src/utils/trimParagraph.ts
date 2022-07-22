export default function trimParagraph(paragraph: string): string {
    const maxLength = 650;
    return paragraph.length > maxLength
        ? paragraph.slice(0, maxLength) + "..."
        : paragraph;
}