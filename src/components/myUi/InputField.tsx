type InputFieldProps = {
    label?: string;
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
    type?: string;
}

const InputField: React.FC<InputFieldProps> = ({label, value, onChange, placeholder, type}) => {
    return (
        <div className="flex flex-col gap-1 w-100 rounded-md border border-stone-300 px-2">
            {label && 
                (<label className="text-start text-sm font-semibold pt-1">{label}</label>)
            }
            <input 
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="pb-1 text-lg outline-none focus:font-semibold"
            />
        </div>
    )
}

export default InputField