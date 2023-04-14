type Props = {
    showWhen: boolean,
    children: React.ReactElement | React.ReactElement[]
}

const Conditional = ({ showWhen, children }: Props): React.ReactElement => {
    if (showWhen) return <>{children}</>;
    return <></>;
};

export default Conditional;