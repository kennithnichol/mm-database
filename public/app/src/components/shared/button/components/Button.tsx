import React from 'react';
import '../styles/Button.scss';

interface ButtonProps {
    text: string;
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = (props) => (
    <button onClick={() => props.onClick()}>{props.text}</button>
)

export default Button;