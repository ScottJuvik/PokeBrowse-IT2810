interface DoubleChevronRightProps {
    size?: number;
}

const DoubleChevronRight = ({ size = 24 }: DoubleChevronRightProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        width={size}
        height={size}
        className="size-6"
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
    </svg>
);

export default DoubleChevronRight;
