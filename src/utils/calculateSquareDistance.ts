const calculateSquareDistance = (ax: number, ay: number, bx: number, by: number) => {
    const base = bx - ax;
    const height = by - ay;
    return base * base + height * height
}

export default calculateSquareDistance;