import * as React from "react"



export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={`px-3 py-2 border rounded focus:ring focus:border-blue-500 ${className}`}
      {...props}
    />
  );
};

Input.displayName = "Input"

export { Input }
